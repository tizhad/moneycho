import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import type { Receipt, LineItem } from '@/lib/receipt';

const PROMPT = `You are a receipt parser. Extract structured data from this receipt image and return ONLY valid JSON with no extra text, no markdown, no code blocks.

Return this exact shape:
{
  "storeName": "string (store/supermarket name, e.g. Albert Heijn, Dirk, Jumbo, Lidl)",
  "date": "string (YYYY-MM-DD format, or today's date if not visible)",
  "total": number (total amount paid in euros),
  "items": [
    {
      "name": "string (exact name as printed on receipt)",
      "canonicalName": "string (normalized Dutch product name, e.g. 'Bananen', 'Volle Melk 1L', 'Kipfilet')",
      "category": "string (one of: Groente & Fruit, Zuivel, Vlees & Vis, Brood & Bakkerij, Dranken, Diepvries, Huishouden, Persoonlijke Verzorging, Snacks, Overig)",
      "quantity": number (default 1),
      "price": number (price per unit in euros, e.g. 1.29 not 129)
    }
  ]
}

Rules:
- canonicalName must be clean and generic so similar items match across stores (remove store brand prefixes like "AH", "Jumbo", "Dirk")
- Skip statiegeld, tas/bag charges, and discount lines as separate items
- price is always per-unit in euros
- Return ONLY the JSON object, nothing else`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not set. Add it to your .env.local file.' },
        { status: 500 },
      );
    }

    const formData = await req.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const mimeType = file.type || 'image/jpeg';

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent([
      PROMPT,
      { inlineData: { data: base64, mimeType } },
    ]);

    const text = result.response.text().trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Could not parse receipt' }, { status: 422 });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const receiptId = crypto.randomUUID();

    const receipt: Receipt = {
      id: receiptId,
      storeName: parsed.storeName ?? 'Unknown Store',
      date: parsed.date ?? new Date().toISOString().slice(0, 10),
      total: parsed.total ?? 0,
      createdAt: new Date().toISOString(),
      items: (parsed.items ?? []).map((item: Omit<LineItem, 'id' | 'receiptId'>) => ({
        id: crypto.randomUUID(),
        receiptId,
        name: item.name ?? '',
        canonicalName: item.canonicalName ?? item.name ?? '',
        category: item.category ?? 'Overig',
        quantity: item.quantity ?? 1,
        price: item.price ?? 0,
      })),
    };

    return NextResponse.json(receipt);
  } catch (err) {
    console.error('parse-receipt error:', err);
    return NextResponse.json({ error: 'Failed to parse receipt' }, { status: 500 });
  }
}

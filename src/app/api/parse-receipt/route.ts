import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import type { Receipt, LineItem } from '@/lib/receipt';

const client = new Anthropic();

const SYSTEM = `You are a receipt parser. Given a receipt image, extract structured data and return ONLY valid JSON with no extra text.

Return this exact shape:
{
  "storeName": "string (store/supermarket name, e.g. Albert Heijn, Dirk, Jumbo, Lidl)",
  "date": "string (YYYY-MM-DD format, or today if not visible)",
  "total": number (total amount paid),
  "items": [
    {
      "name": "string (exact name as printed on receipt)",
      "canonicalName": "string (normalized Dutch product name, e.g. 'Bananen', 'Volle Melk 1L', 'Kipfilet')",
      "category": "string (one of: Groente & Fruit, Zuivel, Vlees & Vis, Brood & Bakkerij, Dranken, Diepvries, Huishouden, Persoonlijke Verzorging, Snacks, Overig)",
      "quantity": number (default 1),
      "price": number (price per unit in euros)
    }
  ]
}

Rules:
- canonicalName must be clean and generic so similar items across stores match (no store brand prefixes like "AH", "Jumbo")
- Skip deposit (statiegeld), bag charges, discounts as separate items
- price is per-unit price in euros (e.g. 1.29 not 129)
- If quantity > 1, still record unit price`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const mediaType = (file.type || 'image/jpeg') as
      | 'image/jpeg'
      | 'image/png'
      | 'image/gif'
      | 'image/webp';

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      system: SYSTEM,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 },
            },
            { type: 'text', text: 'Parse this receipt and return JSON only.' },
          ],
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Could not parse receipt' }, { status: 422 });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const receiptId = nanoid();

    const receipt: Receipt = {
      id: receiptId,
      storeName: parsed.storeName ?? 'Unknown Store',
      date: parsed.date ?? new Date().toISOString().slice(0, 10),
      total: parsed.total ?? 0,
      createdAt: new Date().toISOString(),
      items: (parsed.items ?? []).map((item: Omit<LineItem, 'id' | 'receiptId'>) => ({
        id: nanoid(),
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

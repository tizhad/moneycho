import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import { CATEGORY_SEEDS, blobKey, type DailySnapshot, type KeywordData, type Category } from '@/lib/keywords';

export const runtime = 'nodejs';
export const maxDuration = 60;

async function fetchSuggestions(seed: string): Promise<string[]> {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=nl&gl=nl&q=${encodeURIComponent(seed)}`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MoneyCho/1.0)' },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    const data = await res.json() as [string, string[]];
    return Array.isArray(data[1]) ? data[1].slice(0, 8) : [];
  } catch {
    return [];
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function GET(req: NextRequest) {
  // Check Blob store is configured
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error: 'BLOB_READ_WRITE_TOKEN is not set.',
        setup: 'Go to Vercel Dashboard → Storage → Create Blob store → Connect to project.',
      },
      { status: 503 },
    );
  }

  // Protect against unauthorised calls (Vercel sets this automatically for cron jobs)
  const auth = req.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);

  // Fetch autocomplete suggestions for every seed term
  const raw = new Map<string, { category: Category; rawScore: number }>();

  for (const { seed, category } of CATEGORY_SEEDS) {
    const suggestions = await fetchSuggestions(seed);
    suggestions.forEach((kw, idx) => {
      const key = kw.toLowerCase().trim();
      const incoming = 8 - idx; // position 1 → 8 points, position 8 → 1 point
      const existing = raw.get(key);
      if (!existing || incoming > existing.rawScore) {
        raw.set(key, { category, rawScore: incoming });
      }
    });
    await sleep(250);
  }

  if (raw.size === 0) {
    return NextResponse.json(
      { error: 'No suggestions returned. Google may be rate-limiting; try again in a few minutes.' },
      { status: 502 },
    );
  }

  // Normalise rawScore (1–8) → 0–100
  const entries = Array.from(raw.entries()).map(([keyword, { category, rawScore }]) => ({
    keyword,
    category,
    score: Math.round((rawScore / 8) * 100),
  }));
  entries.sort((a, b) => b.score - a.score);

  // Load yesterday's snapshot for rank-change computation
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  let prevRankMap = new Map<string, number>();
  try {
    const { blobs } = await list({ prefix: blobKey(yesterday) });
    if (blobs.length > 0) {
      const prevRes = await fetch(blobs[0].url);
      const prevSnap = await prevRes.json() as DailySnapshot;
      prevRankMap = new Map(prevSnap.keywords.map((k) => [k.keyword, k.rank]));
    }
  } catch {
    // first run — no previous data, that is fine
  }

  const keywords: KeywordData[] = entries.map((e, i) => ({
    keyword: e.keyword,
    category: e.category,
    score: e.score,
    rank: i + 1,
    prevRank: prevRankMap.get(e.keyword) ?? null,
  }));

  const snapshot: DailySnapshot = {
    date: today,
    fetchedAt: new Date().toISOString(),
    keywords,
  };

  // Store today's snapshot
  await put(blobKey(today), JSON.stringify(snapshot), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });

  return NextResponse.json({ ok: true, date: today, count: keywords.length });
}

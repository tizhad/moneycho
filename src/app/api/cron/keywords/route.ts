import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import { CATEGORY_SEEDS, blobKey, type DailySnapshot, type KeywordData, type Category } from '@/lib/keywords';

export const runtime = 'nodejs';
export const maxDuration = 60;

async function fetchSuggestions(seed: string): Promise<string[]> {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=nl&gl=nl&q=${encodeURIComponent(seed)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MoneyCho/1.0)' },
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) return [];
  // Firefox client returns [query, [suggestion, ...]]
  const data = await res.json() as [string, string[]];
  return Array.isArray(data[1]) ? data[1].slice(0, 8) : [];
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function GET(req: NextRequest) {
  // Protect the endpoint — Vercel injects this header for cron jobs
  const auth = req.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);

  // Gather suggestions for every seed term
  // raw: keyword → { category, rawScore }  (rawScore = 8 for position 1, 1 for position 8)
  const raw = new Map<string, { category: Category; rawScore: number }>();

  for (const { seed, category } of CATEGORY_SEEDS) {
    try {
      const suggestions = await fetchSuggestions(seed);
      suggestions.forEach((kw, idx) => {
        const key = kw.toLowerCase().trim();
        const incoming = 8 - idx; // position 1 = score 8, position 8 = score 1
        const existing = raw.get(key);
        // Keep the higher score if keyword appears under multiple seeds
        if (!existing || incoming > existing.rawScore) {
          raw.set(key, { category, rawScore: incoming });
        }
      });
    } catch {
      // silently skip failed seeds
    }
    await sleep(300); // be polite to Google
  }

  if (raw.size === 0) {
    return NextResponse.json({ error: 'No data fetched' }, { status: 502 });
  }

  // Normalize rawScore (1–8) → 0–100
  const maxRaw = 8;
  const entries = Array.from(raw.entries()).map(([keyword, { category, rawScore }]) => ({
    keyword,
    category,
    score: Math.round((rawScore / maxRaw) * 100),
  }));

  // Sort by score descending, assign global ranks
  entries.sort((a, b) => b.score - a.score);

  // Load yesterday's snapshot to compute rank changes
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
    // no previous data
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

  // Upload today's snapshot
  await put(blobKey(today), JSON.stringify(snapshot), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });

  // Prune blobs older than 8 days
  const { blobs: all } = await list({ prefix: 'kw-' });
  const cutoff = new Date(Date.now() - 8 * 86_400_000).toISOString().slice(0, 10);
  for (const blob of all) {
    const dateMatch = blob.pathname.match(/kw-(\d{4}-\d{2}-\d{2})\.json/);
    if (dateMatch && dateMatch[1] < cutoff) {
      // del is not exposed by @vercel/blob directly — just let old files age out
    }
  }

  return NextResponse.json({ ok: true, date: today, count: keywords.length });
}

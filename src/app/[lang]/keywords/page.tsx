import type { Metadata } from 'next';
import { list } from '@vercel/blob';
import { CATEGORY_META, type DailySnapshot, type KeywordData, type Category } from '@/lib/keywords';

export const metadata: Metadata = {
  title: 'Finance Keyword Trends | MoneyCho',
  description: 'Daily trending finance keywords in the Netherlands, ranked by relative search interest.',
  robots: { index: false },
};

export const revalidate = 3600; // re-fetch blob URLs at most once per hour

async function loadSnapshots(): Promise<DailySnapshot[]> {
  try {
    const { blobs } = await list({ prefix: 'kw-' });
    if (blobs.length === 0) return [];

    // Sort newest first, take last 7 days
    const sorted = blobs
      .filter((b) => /kw-\d{4}-\d{2}-\d{2}\.json/.test(b.pathname))
      .sort((a, b) => b.pathname.localeCompare(a.pathname))
      .slice(0, 7);

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const snapshots = await Promise.all(
      sorted.map(async (blob) => {
        const res = await fetch(blob.url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          next: { revalidate: 3600 },
        });
        return res.json() as Promise<DailySnapshot>;
      }),
    );
    return snapshots;
  } catch {
    return [];
  }
}

function trendIndicator(kw: KeywordData) {
  if (kw.prevRank === null) return { icon: '—', label: 'New', color: 'text-emerald-deep/30' };
  const diff = kw.prevRank - kw.rank; // positive = moved up
  if (diff > 2) return { icon: '↑', label: `+${diff}`, color: 'text-emerald-600' };
  if (diff < -2) return { icon: '↓', label: `${diff}`, color: 'text-red-500' };
  return { icon: '→', label: 'Stable', color: 'text-emerald-deep/40' };
}

export default async function KeywordsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isNL = lang === 'nl';
  const snapshots = await loadSnapshots();
  const latest = snapshots[0] ?? null;

  const categories = Object.keys(CATEGORY_META) as Category[];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      {/* Header */}
      <div className="mb-12">
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          {isNL ? 'Dagelijks bijgewerkt' : 'Updated daily'}
        </span>
        <h1 className="font-serif font-black text-[clamp(2rem,3vw,2.8rem)] leading-[1.1] text-emerald-deep mb-4">
          {isNL ? 'Finance Zoekwoorden Trends' : 'Finance Keyword Trends'}
        </h1>
        <p className="text-sm text-emerald-deep/60 max-w-2xl leading-relaxed">
          {isNL
            ? 'Dagelijks ophalen van trending zoekwoorden in de Nederlandse financiële sector, gescoord op relatief zoekinteresse (0–100). Elke ochtend bijgewerkt via Google autocomplete.'
            : 'Daily snapshot of trending finance keywords in the Netherlands, scored by relative search interest (0–100). Refreshed every morning via Google autocomplete.'}
        </p>
        {latest && (
          <p className="text-xs text-emerald-deep/30 mt-3">
            {isNL ? 'Laatste update:' : 'Last updated:'}{' '}
            {new Date(latest.fetchedAt).toLocaleString(isNL ? 'nl-NL' : 'en-NL', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
            {' · '}
            {latest.keywords.length} {isNL ? 'zoekwoorden' : 'keywords'}
          </p>
        )}
      </div>

      {!latest ? (
        /* No data yet */
        <div className="border border-emerald-deep/10 p-16 text-center">
          <p className="text-sm font-semibold text-emerald-deep mb-2">
            {isNL ? 'Nog geen data beschikbaar' : 'No data yet'}
          </p>
          <p className="text-xs text-emerald-deep/50 max-w-sm mx-auto">
            {isNL
              ? 'De eerste snapshot wordt morgenochtend om 5:00 aangemaakt. Je kunt het ook handmatig triggeren via /api/cron/keywords.'
              : 'The first snapshot will be created tomorrow at 5:00 AM. You can also trigger it manually via /api/cron/keywords.'}
          </p>
        </div>
      ) : (
        <>
          {/* Week summary strip */}
          {snapshots.length > 1 && (
            <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
              {snapshots.map((snap, i) => (
                <div
                  key={snap.date}
                  className={`shrink-0 px-4 py-2 text-xs border ${i === 0 ? 'bg-emerald-deep text-paper border-emerald-deep' : 'border-emerald-deep/10 text-emerald-deep/50'}`}
                >
                  <span className="font-bold block">
                    {new Date(snap.date).toLocaleDateString(isNL ? 'nl-NL' : 'en-NL', { weekday: 'short', day: 'numeric' })}
                  </span>
                  <span>{snap.keywords.length} {isNL ? 'kww.' : 'kws.'}</span>
                </div>
              ))}
            </div>
          )}

          {/* Keywords by category */}
          <div className="space-y-12">
            {categories.map((cat) => {
              const catKeywords = latest.keywords
                .filter((k) => k.category === cat)
                .slice(0, 10);
              if (catKeywords.length === 0) return null;
              const meta = CATEGORY_META[cat];
              return (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`text-xs font-bold px-3 py-1 rounded-sm ${meta.color}`}>
                      {meta.label}
                    </span>
                    <span className="text-xs text-emerald-deep/30">
                      {catKeywords.length} {isNL ? 'zoekwoorden' : 'keywords'}
                    </span>
                  </div>

                  <div className="divide-y divide-emerald-deep/[0.06] border border-emerald-deep/[0.08]">
                    {/* Column headers */}
                    <div className="grid grid-cols-[2rem_1fr_6rem_3rem_3rem] items-center gap-4 px-5 py-2 bg-emerald-deep/[0.03]">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep/30 text-right">#</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep/30">{isNL ? 'Zoekwoord' : 'Keyword'}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep/30">{isNL ? 'Score' : 'Score'}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep/30 text-center">{isNL ? 'Trend' : 'Trend'}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep/30 text-center">{isNL ? 'Wijziging' : 'Change'}</span>
                    </div>
                    {catKeywords.map((kw) => {
                      const trend = trendIndicator(kw);
                      return (
                        <div
                          key={kw.keyword}
                          className="grid grid-cols-[2rem_1fr_6rem_3rem_3rem] items-center gap-4 px-5 py-4 bg-paper hover:bg-emerald-deep/[0.02] transition-colors"
                        >
                          {/* Rank */}
                          <span className="font-serif text-lg text-gold/60 leading-none text-right">
                            {kw.rank}
                          </span>

                          {/* Keyword */}
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-emerald-deep truncate capitalize">
                              {kw.keyword}
                            </p>
                          </div>

                          {/* Score bar */}
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-emerald-deep/[0.06] h-1.5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-deep rounded-full"
                                style={{ width: `${kw.score}%` }}
                              />
                            </div>
                            <span className="text-xs text-emerald-deep/50 w-7 text-right shrink-0">
                              {kw.score}
                            </span>
                          </div>

                          {/* Trend */}
                          <div className={`text-sm font-bold text-center ${trend.color}`}>
                            {trend.icon}
                          </div>

                          {/* Delta */}
                          <div className={`text-xs text-center ${trend.color}`}>
                            {trend.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 7-day top 10 table */}
          {snapshots.length > 1 && (
            <div className="mt-16">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-6">
                {isNL ? 'Top 10 afgelopen 7 dagen' : 'Top 10 last 7 days'}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-emerald-deep/10">
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-emerald-deep/40">
                        {isNL ? 'Zoekwoord' : 'Keyword'}
                      </th>
                      {snapshots.map((s) => (
                        <th key={s.date} className="text-center py-3 px-3 text-xs text-emerald-deep/40 font-normal whitespace-nowrap">
                          {new Date(s.date).toLocaleDateString(isNL ? 'nl-NL' : 'en-NL', { weekday: 'short', day: 'numeric' })}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-deep/[0.06]">
                    {latest.keywords.slice(0, 10).map((kw) => (
                      <tr key={kw.keyword} className="hover:bg-emerald-deep/[0.02] transition-colors">
                        <td className="py-3 px-4 font-medium text-emerald-deep capitalize">
                          {kw.keyword}
                        </td>
                        {snapshots.map((snap) => {
                          const entry = snap.keywords.find((k) => k.keyword === kw.keyword);
                          return (
                            <td key={snap.date} className="py-3 px-3 text-center">
                              {entry ? (
                                <span className="inline-flex items-center justify-center w-10 h-6 text-xs font-bold rounded text-emerald-deep bg-emerald-deep/10">
                                  {entry.score}
                                </span>
                              ) : (
                                <span className="text-emerald-deep/20 text-xs">—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="mt-12 pt-8 border-t border-emerald-deep/10">
            <p className="text-xs text-emerald-deep/30 max-w-prose leading-relaxed">
              {isNL
                ? 'Score (0–100): relatieve zoekinteresse op basis van positie in Google autocomplete-suggesties voor NL. Hogere score = meer mensen zoeken hierop. Dit is geen absoluut zoekvolume. Trend: ↑ gestegen, ↓ gedaald, → stabiel vergeleken met gisteren.'
                : 'Score (0–100): relative search interest based on position in Google autocomplete suggestions for NL. Higher score = more people searching. This is not absolute search volume. Trend: ↑ rising, ↓ falling, → stable compared to yesterday.'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

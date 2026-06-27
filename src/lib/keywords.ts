export type Category =
  | 'hypotheek'
  | 'sparen'
  | 'beleggen'
  | 'schulden'
  | 'belasting'
  | 'pensioen'
  | 'verzekering'
  | 'budget'
  | 'inkomen';

export interface KeywordData {
  keyword: string;
  category: Category;
  score: number;      // 0–100 relative interest
  rank: number;       // 1-based global rank
  prevRank: number | null; // rank in yesterday's snapshot
}

export interface DailySnapshot {
  date: string;       // YYYY-MM-DD
  fetchedAt: string;  // ISO datetime
  keywords: KeywordData[];
}

// One or two seed terms per category trigger the autocomplete suggestions
export const CATEGORY_SEEDS: { seed: string; category: Category }[] = [
  { seed: 'hypotheek',              category: 'hypotheek' },
  { seed: 'hypotheekrente',         category: 'hypotheek' },
  { seed: 'hypotheek berekenen',    category: 'hypotheek' },
  { seed: 'spaarrekening',          category: 'sparen' },
  { seed: 'vakantiegeld',           category: 'sparen' },
  { seed: 'beleggen',               category: 'beleggen' },
  { seed: 'ETF kopen',              category: 'beleggen' },
  { seed: 'schulden aflossen',      category: 'schulden' },
  { seed: 'persoonlijke lening',    category: 'schulden' },
  { seed: 'belastingaangifte',      category: 'belasting' },
  { seed: 'box 3 belasting',        category: 'belasting' },
  { seed: 'toeslagen aanvragen',    category: 'belasting' },
  { seed: 'pensioen opbouwen',      category: 'pensioen' },
  { seed: 'eerder stoppen met werken', category: 'pensioen' },
  { seed: 'zorgverzekering',        category: 'verzekering' },
  { seed: 'verzekering vergelijken', category: 'verzekering' },
  { seed: 'maandbudget maken',      category: 'budget' },
  { seed: 'nettoloon berekenen',    category: 'inkomen' },
  { seed: 'minimumloon',            category: 'inkomen' },
];

export const CATEGORY_META: Record<Category, { label: string; color: string }> = {
  hypotheek:   { label: 'Hypotheek',   color: 'bg-blue-50 text-blue-700 border border-blue-200' },
  sparen:      { label: 'Sparen',      color: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  beleggen:    { label: 'Beleggen',    color: 'bg-purple-50 text-purple-700 border border-purple-200' },
  schulden:    { label: 'Schulden',    color: 'bg-red-50 text-red-700 border border-red-200' },
  belasting:   { label: 'Belasting',   color: 'bg-orange-50 text-orange-700 border border-orange-200' },
  pensioen:    { label: 'Pensioen',    color: 'bg-amber-50 text-amber-700 border border-amber-200' },
  verzekering: { label: 'Verzekering', color: 'bg-pink-50 text-pink-700 border border-pink-200' },
  budget:      { label: 'Budget',      color: 'bg-teal-50 text-teal-700 border border-teal-200' },
  inkomen:     { label: 'Inkomen',     color: 'bg-indigo-50 text-indigo-700 border border-indigo-200' },
};

export function blobKey(date: string) {
  return `kw-${date}.json`;
}

export function todayKey() {
  return blobKey(new Date().toISOString().slice(0, 10));
}

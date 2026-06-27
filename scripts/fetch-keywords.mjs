/**
 * Fetches trending Dutch finance keywords from Google Autocomplete.
 * Run: node scripts/fetch-keywords.mjs
 * Output: keywords-YYYY-MM-DD.md in the project root
 */

import { writeFileSync } from 'fs';

const SEEDS = [
  { seed: 'hypotheek',                category: 'Hypotheek' },
  { seed: 'hypotheekrente',           category: 'Hypotheek' },
  { seed: 'hypotheek berekenen',      category: 'Hypotheek' },
  { seed: 'spaarrekening',            category: 'Sparen' },
  { seed: 'vakantiegeld',             category: 'Sparen' },
  { seed: 'beleggen',                 category: 'Beleggen' },
  { seed: 'ETF kopen',                category: 'Beleggen' },
  { seed: 'schulden aflossen',        category: 'Schulden' },
  { seed: 'persoonlijke lening',      category: 'Schulden' },
  { seed: 'belastingaangifte',        category: 'Belasting' },
  { seed: 'box 3 belasting',          category: 'Belasting' },
  { seed: 'toeslagen aanvragen',      category: 'Belasting' },
  { seed: 'pensioen opbouwen',        category: 'Pensioen' },
  { seed: 'eerder stoppen met werken',category: 'Pensioen' },
  { seed: 'zorgverzekering',          category: 'Verzekering' },
  { seed: 'verzekering vergelijken',  category: 'Verzekering' },
  { seed: 'maandbudget maken',        category: 'Budget' },
  { seed: 'nettoloon berekenen',      category: 'Inkomen' },
  { seed: 'minimumloon',              category: 'Inkomen' },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchSuggestions(seed) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=nl&gl=nl&q=${encodeURIComponent(seed)}`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MoneyCho-script/1.0)' },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data[1]) ? data[1].slice(0, 8) : [];
  } catch {
    return [];
  }
}

const raw = new Map();

console.log('Fetching suggestions for', SEEDS.length, 'seed terms...\n');

for (const { seed, category } of SEEDS) {
  process.stdout.write(`  ${seed}... `);
  const suggestions = await fetchSuggestions(seed);
  suggestions.forEach((kw, idx) => {
    const key = kw.toLowerCase().trim();
    const score = 8 - idx;
    const existing = raw.get(key);
    if (!existing || score > existing.score) {
      raw.set(key, { category, score });
    }
  });
  console.log(`${suggestions.length} results`);
  await sleep(250);
}

// Sort by score descending
const sorted = Array.from(raw.entries())
  .map(([keyword, { category, score }]) => ({
    keyword,
    category,
    score: Math.round((score / 8) * 100),
  }))
  .sort((a, b) => b.score - a.score);

// Group by category
const byCategory = {};
for (const item of sorted) {
  if (!byCategory[item.category]) byCategory[item.category] = [];
  byCategory[item.category].push(item);
}

// Build markdown
const today = new Date().toISOString().slice(0, 10);
const lines = [
  `# Finance Keyword Trends — ${today}`,
  '',
  `> Fetched ${sorted.length} keywords via Google Autocomplete (NL). Score = relative search interest (0–100).`,
  '',
];

for (const [category, keywords] of Object.entries(byCategory)) {
  lines.push(`## ${category}`, '');
  lines.push('| # | Keyword | Score |');
  lines.push('|---|---------|-------|');
  keywords.slice(0, 15).forEach((kw, i) => {
    lines.push(`| ${i + 1} | ${kw.keyword} | ${kw.score} |`);
  });
  lines.push('');
}

lines.push('---');
lines.push(`_Generated: ${new Date().toISOString()}_`);

const filename = `keywords-${today}.md`;
writeFileSync(filename, lines.join('\n'));
console.log(`\nSaved → ${filename} (${sorted.length} keywords)`);

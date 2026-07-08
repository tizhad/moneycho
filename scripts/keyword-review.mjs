/**
 * Keyword Review — moneycho.com
 *
 * Fetches keyword data from DataForSEO, clusters by topic,
 * cross-references with the latest GSC log, and writes docs/seo/keyword-map.md.
 *
 * Run: node scripts/keyword-review.mjs
 * Cost: ~$0.05–0.10 per run (two DataForSEO API calls — slim mode)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ---------- Load credentials ----------

function loadEnv() {
  const envPath = join(ROOT, '.env.local');
  if (!existsSync(envPath)) throw new Error('.env.local not found');
  const lines = readFileSync(envPath, 'utf-8').split('\n');
  const env = {};
  for (const line of lines) {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return env;
}

const env = loadEnv();
const DFS_LOGIN = env.DATAFORSEO_LOGIN;
const DFS_PASS = env.DATAFORSEO_PASSWORD;
if (!DFS_LOGIN || !DFS_PASS) throw new Error('DataForSEO credentials missing from .env.local');

const AUTH = Buffer.from(`${DFS_LOGIN}:${DFS_PASS}`).toString('base64');

// ---------- DataForSEO helpers ----------

async function dfsPost(endpoint, body) {
  const res = await fetch(`https://api.dataforseo.com/v3/${endpoint}`, {
    method: 'POST',
    headers: { Authorization: `Basic ${AUTH}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(`DFS error: ${json.status_message}`);
  const task = json.tasks[0];
  if (task.status_code !== 20000) throw new Error(`DFS task error (${task.status_code}): ${task.status_message}`);
  return task.result ?? [];
}

// ---------- Fetch keyword universe ----------

async function fetchKeywordsForSite(lang) {
  console.log(`  → keywords_for_site (${lang})...`);
  const results = await dfsPost('keywords_data/google_ads/keywords_for_site/live', [
    {
      target: 'moneycho.com',
      language_code: lang,
      location_code: 2528, // Netherlands
      limit: 1000,
    },
  ]);
  return results;
}

async function fetchKeywordsForKeywords(seeds, lang) {
  console.log(`  → keywords_for_keywords (${lang}, ${seeds.length} seeds)...`);
  const results = await dfsPost('keywords_data/google_ads/keywords_for_keywords/live', [
    {
      keywords: seeds,
      language_code: lang,
      location_code: 2528,
      limit: 1000,
    },
  ]);
  return results;
}

// ---------- Topic cluster definitions ----------

const CLUSTERS = [
  {
    id: 'mortgage',
    label: 'Hypotheek / Mortgage',
    pages: [
      '/nl/calculators/mortgage',
      '/en/calculators/mortgage',
      '/nl/guides/hypotheek-berekenen',
      '/en/guides/calculating-dutch-mortgage',
    ],
    seeds: ['hypotheek berekenen', 'hypotheek calculator', 'dutch mortgage calculator', 'mortgage netherlands'],
    match: ['hypotheek', 'mortgage', 'lening woning', 'nhg', 'maximale hypotheek'],
  },
  {
    id: 'credit-card-payoff',
    label: 'Creditcard Aflossen / Credit Card Payoff',
    pages: [
      '/nl/calculators/credit-card-payoff',
      '/en/calculators/credit-card-payoff',
      '/nl/guides/slim-lenen',
      '/en/guides/debt-and-borrowing',
    ],
    seeds: ['creditcard aflossen', 'credit card payoff calculator', 'creditcard rente berekenen'],
    match: ['creditcard', 'credit card', 'kredietkaart', 'lening aflossen', 'lening rente', 'persoonlijke lening'],
  },
  {
    id: 'compound-interest',
    label: 'Rente op Rente / Compound Interest',
    pages: [
      '/nl/calculators/compound-interest',
      '/en/calculators/compound-interest',
      '/nl/guides/rente-op-rente-uitgelegd',
      '/en/guides/compound-interest-explained',
    ],
    seeds: ['rente op rente calculator', 'compound interest calculator', 'compound interest netherlands'],
    match: ['rente op rente', 'compound interest', 'samengestelde rente', 'compounding', 'rente berekenen formule', 'rente berekenen per maand', 'rentekosten'],
  },
  {
    id: 'savings-goal',
    label: 'Spaardoel / Savings Goal',
    pages: ['/nl/calculators/savings-goal', '/en/calculators/savings-goal'],
    seeds: ['spaardoel calculator', 'savings goal calculator', 'hoeveel sparen per maand'],
    match: ['spaardoel', 'savings goal', 'sparen per maand', 'sparen calculator', 'hoeveel sparen', 'spaarrekening rente'],
  },
  {
    id: 'budget',
    label: 'Budget Planner',
    pages: ['/nl/calculators/budget-planner', '/en/calculators/budget-planner'],
    seeds: ['budget planner', 'maandbudget berekenen', 'huishoudboekje'],
    match: ['budget planner', 'maandbudget', 'huishoudboekje', 'budgetteren', 'financieel overzicht', 'inkomsten uitgaven'],
  },
  {
    id: 'debt-payoff',
    label: 'Schulden Aflossen / Debt Payoff',
    pages: ['/nl/calculators/debt-payoff', '/en/calculators/debt-payoff'],
    seeds: ['schulden aflossen calculator', 'debt payoff calculator', 'schulden overzicht'],
    match: ['schulden aflossen', 'debt payoff', 'schuldsanering', 'schulden calculator', 'schulden', 'aflossen'],
  },
  {
    id: 'inflation',
    label: 'Inflatie / Inflation',
    pages: ['/nl/guides/wat-is-inflatie', '/en/guides/what-is-inflation'],
    seeds: ['inflatie nederland', 'wat is inflatie', 'inflation netherlands'],
    match: ['inflatie', 'inflation', 'koopkracht', 'prijsstijging'],
  },
  {
    id: 'investing',
    label: 'Beleggen / Investing',
    pages: ['/nl/guides/risicotolerantie-begrijpen', '/en/guides/understanding-risk-tolerance'],
    seeds: ['beleggen beginners nederland', 'ETF beleggen nederland', 'index fund netherlands'],
    match: ['beleggen', 'belegg', 'investing', 'etf', 'index fund', 'aandelen', 'vermogen opbouwen'],
  },
  {
    id: 'financial-advice',
    label: 'Financieel Advies / Financial Planning',
    pages: ['/nl/guides/financieel-adviseur-kiezen', '/en/guides/how-to-choose-financial-advisor'],
    seeds: ['financieel adviseur nederland', 'financieel planner kosten'],
    match: ['financieel advi', 'financieel plann', 'financial advi', 'financiële scan', 'financiele toekomst', 'vermogensbeheer'],
  },
  {
    id: 'tax',
    label: 'Belasting / Tax (future)',
    pages: [],
    seeds: ['belasting berekenen', 'inkomstenbelasting calculator', 'tax calculator netherlands'],
    match: ['belasting', 'inkomstenbelasting', 'tax netherlands', 'box 3', 'toeslagen', 'belastingaangifte'],
  },
];

function assignCluster(keyword) {
  const kw = keyword.toLowerCase();
  for (const cluster of CLUSTERS) {
    if (cluster.match.some((m) => kw.includes(m))) return cluster.id;
  }
  return 'other';
}

// ---------- Parse GSC log for cross-reference ----------

function parseGscQueries() {
  const logPath = join(ROOT, 'docs/seo/gsc-log.md');
  if (!existsSync(logPath)) return new Map();

  const src = readFileSync(logPath, 'utf-8');
  // Find the last review's Queries table
  const blocks = src.split(/^## Review #/m);
  const lastBlock = blocks[blocks.length - 1];

  const queries = new Map();
  const tableMatch = lastBlock.match(/### Queries[\s\S]*?\n((?:\|.*\n)+)/);
  if (!tableMatch) return queries;

  for (const row of tableMatch[1].split('\n')) {
    const cells = row.split('|').map((c) => c.trim()).filter(Boolean);
    if (cells.length < 4 || cells[0] === 'Query') continue;
    const [query, , , position] = cells;
    const pos = parseFloat(position);
    if (!isNaN(pos)) queries.set(query.toLowerCase(), pos);
  }

  return queries;
}

// ---------- Format helpers ----------

function fmtVol(n) {
  if (!n) return '—';
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return String(n);
}

function gscStatus(keyword, gscMap) {
  const pos = gscMap.get(keyword.toLowerCase());
  if (pos === undefined) return { status: '❌ Gap', position: '—' };
  if (pos <= 20) return { status: '✅ Ranking', position: pos.toFixed(1) };
  if (pos <= 50) return { status: '🟡 Weak', position: pos.toFixed(1) };
  return { status: '👁️ Visible', position: pos.toFixed(1) };
}

function priorityScore(item) {
  const compFactor = item.competition === 'LOW' ? 1.0 : item.competition === 'MEDIUM' ? 1.5 : 3.0;
  return Math.round((item.search_volume || 0) / compFactor);
}

// ---------- Main ----------

async function main() {
  console.log('\n🔍 Keyword Review — moneycho.com\n');

  // 1. Fetch keyword universe (2 calls to stay within budget)
  console.log('Fetching keyword data from DataForSEO...');
  const topSeeds = [
    'hypotheek berekenen', 'hypotheek calculator',
    'creditcard aflossen', 'rente op rente calculator',
    'spaardoel calculator', 'hoeveel sparen per maand',
    'schulden aflossen calculator', 'budget planner',
    'compound interest calculator', 'dutch mortgage calculator',
  ];
  const [siteNL, seedResults] = await Promise.all([
    fetchKeywordsForSite('nl'),
    fetchKeywordsForKeywords(topSeeds, 'nl'),
  ]);

  // 2. Merge + deduplicate
  const seen = new Set();
  const all = [];
  for (const item of [...siteNL, ...seedResults]) {
    if (!item.keyword || seen.has(item.keyword)) continue;
    seen.add(item.keyword);
    all.push(item);
  }
  console.log(`\nTotal unique keywords: ${all.length}`);

  // 3. Load GSC cross-reference
  const gscMap = parseGscQueries();
  console.log(`GSC queries loaded: ${gscMap.size}`);

  // 4. Cluster keywords
  const clustered = {};
  for (const cluster of CLUSTERS) clustered[cluster.id] = [];
  clustered.other = [];

  for (const item of all) {
    const clusterId = assignCluster(item.keyword);
    clustered[clusterId].push(item);
  }

  // 5. Build keyword-map.md
  const today = new Date().toISOString().slice(0, 10);
  mkdirSync(join(ROOT, 'docs/seo'), { recursive: true });

  const lines = [
    `# Keyword Map — moneycho.com`,
    `**Last updated:** ${today}`,
    `**Total keywords:** ${all.length}`,
    `**GSC queries tracked:** ${gscMap.size}`,
    '',
    '---',
    '',
  ];

  const topGaps = [];

  for (const cluster of [...CLUSTERS, { id: 'other', label: 'Uncategorised', pages: [] }]) {
    const items = (clustered[cluster.id] || []).sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0));
    if (items.length === 0) continue;

    const gaps = items.filter((i) => gscStatus(i.keyword, gscMap).status === '❌ Gap');
    const ranking = items.filter((i) => gscStatus(i.keyword, gscMap).status !== '❌ Gap');

    lines.push(`## ${cluster.label}`);
    if (cluster.pages.length > 0) {
      lines.push(`**Target pages:** ${cluster.pages.join(', ')}`);
    }
    lines.push(`**Keywords:** ${items.length} total · ${ranking.length} visible in GSC · ${gaps.length} gaps`);
    lines.push('');
    lines.push('| Keyword | Volume | Competition | GSC Status | Position |');
    lines.push('|---|---|---|---|---|');

    for (const item of items.slice(0, 20)) {
      const { status, position } = gscStatus(item.keyword, gscMap);
      lines.push(
        `| ${item.keyword} | ${fmtVol(item.search_volume)} | ${item.competition || '—'} | ${status} | ${position} |`
      );
    }

    if (items.length > 20) lines.push(`| _...and ${items.length - 20} more_ | | | | |`);
    lines.push('');

    // Top gap actions for this cluster
    const topClusterGaps = gaps
      .filter((i) => (i.search_volume || 0) > 0)
      .sort((a, b) => priorityScore(b) - priorityScore(a))
      .slice(0, 3);

    if (topClusterGaps.length > 0) {
      lines.push('**Top gap opportunities:**');
      for (const g of topClusterGaps) {
        const action = cluster.pages.length > 0
          ? `Add to ${cluster.pages[0]}`
          : 'Create new page';
        lines.push(`- **${g.keyword}** (${fmtVol(g.search_volume)}/mo, ${g.competition}) — ${action}`);
        topGaps.push({ ...g, cluster: cluster.label, action });
      }
      lines.push('');
    }

    lines.push('---', '');
  }

  // 6. Priority summary at top
  const summaryLines = [
    '## Priority Gap Summary',
    '',
    '| Keyword | Volume | Competition | Cluster | Action |',
    '|---|---|---|---|---|',
    ...topGaps
      .sort((a, b) => priorityScore(b) - priorityScore(a))
      .slice(0, 10)
      .map((g) => `| ${g.keyword} | ${fmtVol(g.search_volume)} | ${g.competition} | ${g.cluster} | ${g.action} |`),
    '',
    '---',
    '',
  ];

  // Insert summary after header
  const insertAt = lines.indexOf('---') + 2;
  lines.splice(insertAt, 0, ...summaryLines);

  const output = lines.join('\n');
  const outPath = join(ROOT, 'docs/seo/keyword-map.md');
  writeFileSync(outPath, output);
  console.log(`\n✅ Written → docs/seo/keyword-map.md`);

  // 7. Console summary
  console.log('\n📊 Coverage by cluster:');
  for (const cluster of CLUSTERS) {
    const items = clustered[cluster.id] || [];
    const gaps = items.filter((i) => gscStatus(i.keyword, gscMap).status === '❌ Gap').length;
    if (items.length > 0) {
      console.log(`  ${cluster.label}: ${items.length} keywords, ${gaps} gaps`);
    }
  }

  console.log('\n🎯 Top 5 priority gaps:');
  topGaps
    .sort((a, b) => priorityScore(b) - priorityScore(a))
    .slice(0, 5)
    .forEach((g, i) => {
      console.log(`  ${i + 1}. "${g.keyword}" — ${fmtVol(g.search_volume)}/mo (${g.competition}) [${g.cluster}]`);
    });

  console.log('');
}

main().catch((e) => { console.error(e); process.exit(1); });

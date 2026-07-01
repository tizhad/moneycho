import fs from 'fs';
import path from 'path';
import type { Locale } from '@/lib/i18n';

export type Guide = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  author?: string;
};

function parseMetadata(src: string): Record<string, string> {
  // Extract the export const metadata = { ... } block from MDX
  const match = src.match(/export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\};/);
  if (!match) return {};

  const block = match[1];
  const result: Record<string, string> = {};

  // Match key: 'value' or key: "value" pairs
  const pairs = block.matchAll(/(\w+)\s*:\s*['"`]([\s\S]*?)['"`]\s*(?:,|$)/gm);
  for (const [, key, value] of pairs) {
    result[key] = value.trim();
  }

  return result;
}

function loadGuides(locale: Locale): Guide[] {
  const dir = path.join(process.cwd(), 'src', 'content', locale);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(
    (f) => f.endsWith('.mdx') && !f.startsWith('_')
  );

  const guides: Guide[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const src = fs.readFileSync(path.join(dir, file), 'utf-8');
    const meta = parseMetadata(src);

    if (!meta.title) continue;

    guides.push({
      slug,
      title: meta.title,
      description: meta.description ?? '',
      tag: meta.tag ?? '',
      date: meta.date ?? '',
      author: meta.author,
    });
  }

  // Sort by date: parse "June 30, 2026" (EN) and "30 juni 2026" (NL)
  const NL_MONTHS: Record<string, number> = {
    januari: 0, februari: 1, maart: 2, april: 3, mei: 4, juni: 5,
    juli: 6, augustus: 7, september: 8, oktober: 9, november: 10, december: 11,
  };

  function parseDate(date: string): number {
    if (!date) return 0;
    // EN: "June 30, 2026"
    const en = new Date(date);
    if (!isNaN(en.getTime())) return en.getTime();
    // NL: "30 juni 2026"
    const nl = date.match(/(\d+)\s+(\w+)\s+(\d{4})/);
    if (nl) {
      const month = NL_MONTHS[nl[2].toLowerCase()];
      if (month !== undefined) return new Date(+nl[3], month, +nl[1]).getTime();
    }
    return 0;
  }

  guides.sort((a, b) => parseDate(a.date) - parseDate(b.date));

  return guides;
}

// Cache at module level (evaluated once per build/server start)
const _cache: Partial<Record<Locale, Guide[]>> = {};

function getGuides(locale: Locale): Guide[] {
  if (!_cache[locale]) _cache[locale] = loadGuides(locale);
  return _cache[locale]!;
}

export const guides: Record<Locale, Guide[]> = new Proxy({} as Record<Locale, Guide[]>, {
  get(_target, prop: string) {
    return getGuides(prop as Locale);
  },
});

import Link from 'next/link';
import type { RelatedItem } from '@/lib/related';

export function RelatedTools({
  items,
  lang,
  heading,
}: {
  items: RelatedItem[];
  lang: string;
  heading?: string;
}) {
  if (!items.length) return null;
  const label = heading ?? (lang === 'nl' ? 'Probeer ook deze tools' : 'Try These Next');

  return (
    <div className="border-t border-emerald-deep/10 mt-16 pt-12">
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-6">
        {label}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={`/${lang}${item.href}`}
            className="group flex items-center gap-4 p-5 border border-emerald-deep/10 rounded hover:border-gold hover:bg-gold/5 transition-all no-underline"
          >
            <span className="font-serif text-2xl text-gold leading-none shrink-0">{item.n}</span>
            <div className="min-w-0">
              <span className="text-sm font-bold text-emerald-deep block group-hover:text-emerald-mid transition-colors">
                {item.label}
              </span>
              <span className="text-xs text-emerald-deep/50 leading-snug">{item.desc}</span>
            </div>
            <span className="ml-auto text-emerald-deep/20 group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

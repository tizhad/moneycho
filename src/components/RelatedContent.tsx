import Link from 'next/link';
import { guides } from '@/lib/guides';
import { getRelatedItems } from '@/lib/related-content';
import type { Locale } from '@/lib/i18n';

const LABELS: Record<Locale, { heading: string; calculator: string; article: string }> = {
  en: { heading: 'Keep exploring', calculator: 'Calculator', article: 'Guide' },
  nl: { heading: 'Lees ook', calculator: 'Calculator', article: 'Artikel' },
};

export function RelatedContent({ lang, slug }: { lang: string; slug: string }) {
  const locale = (lang === 'nl' ? 'nl' : 'en') as Locale;
  const guideList = guides[locale];
  const items = getRelatedItems(slug, locale, guideList);
  const labels = LABELS[locale];

  if (items.length === 0) return null;

  return (
    <section className="mt-16 border-t border-emerald-deep/10 pt-12">
      <h2 className="font-serif text-[1.4rem] font-bold text-emerald-deep mb-8">
        {labels.heading}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col gap-3 p-6 bg-white-card border border-border-light rounded-lg hover:border-gold-muted hover:bg-cream-deep transition-all no-underline"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[0.6rem] font-semibold tracking-[0.08em] uppercase text-gold bg-gold/10 px-2 py-0.5 rounded-sm">
                {item.tag}
              </span>
              <span className="text-[0.6rem] font-semibold tracking-[0.08em] uppercase text-emerald-deep/30">
                {item.type === 'calculator' ? labels.calculator : labels.article}
              </span>
            </div>
            <h3 className="font-serif text-[0.95rem] font-semibold text-emerald-deep leading-snug group-hover:text-emerald-deep/80 transition-colors">
              {item.title}
            </h3>
            <p className="text-[0.8rem] text-text-secondary leading-relaxed line-clamp-2">
              {item.description}
            </p>
            <span className="text-[0.75rem] font-semibold text-emerald-deep/40 group-hover:text-gold transition-colors mt-auto">
              {item.type === 'calculator' ? '→ Open calculator' : '→ Read article'}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

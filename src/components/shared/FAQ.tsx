'use client';

import { useState } from 'react';
import type { FAQItem } from '@/lib/related';

export function FAQ({ items, lang }: { items: FAQItem[]; lang?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  if (!items.length) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const heading = lang === 'nl' ? 'Veelgestelde vragen' : 'Frequently Asked Questions';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="border-t border-emerald-deep/10 mt-16 pt-12">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-6">
          {heading}
        </p>
        <div className="space-y-px">
          {items.map((item, i) => (
            <div key={i} className="border border-emerald-deep/10">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-emerald-deep/[0.02] transition-colors"
              >
                <span className="text-sm font-semibold text-emerald-deep pr-4">{item.q}</span>
                <span
                  className="text-emerald-deep/30 shrink-0 text-lg leading-none transition-transform duration-200"
                  style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-emerald-deep/60 leading-relaxed border-t border-emerald-deep/10 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

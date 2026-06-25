'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { relatedForGuide } from '@/lib/related';
import { RelatedTools } from '@/components/shared/RelatedTools';

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const lang = segments[0] ?? 'nl';
  const slug = segments[2]; // e.g. "compound-interest-explained"

  const related = relatedForGuide[slug] ?? [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <Link
        href={`/${lang}/guides`}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-deep/40 hover:text-emerald-deep transition-colors mb-12"
      >
        ← {lang === 'nl' ? 'Alle Gidsen' : 'All Guides'}
      </Link>
      <div className="max-w-2xl mx-auto">{children}</div>
      {related.length > 0 && (
        <div className="max-w-2xl mx-auto">
          <RelatedTools items={related} lang={lang} />
        </div>
      )}
    </div>
  );
}

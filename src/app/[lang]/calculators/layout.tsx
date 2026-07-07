'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { relatedTools, faqsBySlug } from '@/lib/related';
import { RelatedTools } from '@/components/shared/RelatedTools';
import { FAQ } from '@/components/shared/FAQ';
import { MethodologyNote } from '@/components/shared/MethodologyNote';

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const isIndex = segments.length === 2; // ["en", "calculators"]
  const lang = segments[0] ?? 'nl';
  const slug = segments[2]; // e.g. "mortgage", "compound-interest"

  const related = slug ? (relatedTools[slug] ?? []) : [];
  const faqs = slug ? (faqsBySlug[slug] ?? []) : [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <Link
        href={isIndex ? `/${lang}` : `/${lang}/calculators`}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-deep/40 hover:text-emerald-deep transition-colors mb-12"
      >
        ← {isIndex ? (lang === 'nl' ? 'Home' : 'Home') : lang === 'nl' ? 'Alle Calculators' : 'All Calculators'}
      </Link>
      {children}
      {!isIndex && (
        <>
          {faqs.length > 0 && <FAQ items={faqs} lang={lang} />}
          {slug && <MethodologyNote slug={slug} lang={lang} />}
          {related.length > 0 && <RelatedTools items={related} lang={lang} />}
        </>
      )}
    </div>
  );
}

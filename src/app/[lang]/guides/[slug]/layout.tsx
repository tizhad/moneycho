'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const lang = segments[0] ?? 'nl';

  return (
    <div className="max-w-7xl mx-auto px-6 pt-8 md:pt-12 pb-16 md:pb-24">
      <Link
        href={`/${lang}/guides`}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-deep/40 hover:text-emerald-deep transition-colors mb-12"
      >
        ← {lang === 'nl' ? 'Alle Gidsen' : 'All Guides'}
      </Link>
      <div className="max-w-2xl mx-auto">{children}</div>
    </div>
  );
}

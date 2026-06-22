"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // pathname is now /{lang}/calculators or /{lang}/calculators/...
  const segments = pathname.split("/").filter(Boolean);
  const isIndex = segments.length === 2; // ["en", "calculators"]
  const lang = segments[0] ?? "en";

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <Link
        href={isIndex ? `/${lang}` : `/${lang}/calculators`}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-deep/40 hover:text-emerald-deep transition-colors mb-12"
      >
        ← {isIndex ? "Home" : "All Calculators"}
      </Link>
      {children}
    </div>
  );
}

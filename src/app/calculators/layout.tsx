"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isIndex = pathname === "/calculators";

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <Link
        href={isIndex ? "/" : "/calculators"}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-deep/40 hover:text-emerald-deep transition-colors mb-12"
      >
        ← {isIndex ? "Home" : "All Calculators"}
      </Link>
      {children}
    </div>
  );
}

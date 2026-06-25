"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

type Nav = {
  calculators: string;
  guides: string;
  articles: string;
  taxEngines: string;
  about: string;
  allTools: string;
};

export function Header({ lang, nav }: { lang: Locale; nav: Nav }) {
  const [open, setOpen] = useState(false);
  const p = (path: string) => `/${lang}${path}`;

  const links = [
    { label: nav.calculators, href: p("/calculators") },
    { label: nav.guides, href: p("/guides") },
    { label: nav.about, href: p("/about") },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-paper border-b border-border-light">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-16">
        <Link
          href={p("/")}
          className="font-sans font-bold text-[1.1rem] tracking-[0.06em] uppercase text-emerald-deep flex items-center gap-2 no-underline"
        >
          <span className="w-3.5 h-3.5 bg-emerald-deep rounded-sm flex-shrink-0" aria-hidden />
          MoneyCho
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-emerald-deep tracking-[0.02em] transition-colors no-underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher lang={lang} />
          <Link
            href={p("/calculators")}
            className="hidden md:inline-flex text-[0.8rem] font-semibold tracking-[0.06em] uppercase px-5 py-2.5 border-[1.5px] border-emerald-deep rounded text-emerald-deep hover:bg-emerald-deep hover:text-paper transition-all no-underline"
          >
            {nav.allTools}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 -mr-2 text-emerald-deep"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-paper border-t border-border-light">
          <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[0.95rem] font-medium text-emerald-deep no-underline py-3 border-b border-border-light last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={p("/calculators")}
              onClick={() => setOpen(false)}
              className="mt-3 text-center text-[0.82rem] font-semibold tracking-[0.06em] uppercase px-5 py-3 border-[1.5px] border-emerald-deep rounded text-emerald-deep hover:bg-emerald-deep hover:text-paper transition-all no-underline"
            >
              {nav.allTools}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

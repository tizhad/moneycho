import Link from "next/link";
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
  const p = (path: string) => `/${lang}${path}`;

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

        <ul className="hidden md:flex items-center gap-8 list-none">
          {[
            { label: nav.calculators, href: p("/calculators") },
            { label: nav.guides, href: p("/guides") },
            { label: nav.articles, href: p("/articles") },
            { label: nav.taxEngines, href: p("/tools") },
            { label: nav.about, href: p("/about") },
          ].map((link) => (
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
            className="text-[0.8rem] font-semibold tracking-[0.06em] uppercase px-5 py-2.5 border-[1.5px] border-emerald-deep rounded text-emerald-deep hover:bg-emerald-deep hover:text-paper transition-all no-underline"
          >
            {nav.allTools}
          </Link>
        </div>
      </div>
    </nav>
  );
}

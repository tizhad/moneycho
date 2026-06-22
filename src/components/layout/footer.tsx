import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type FooterDict = {
  tagline: string;
  columns: { calculators: string; learn: string; company: string };
  links: Record<string, string>;
  copyright: string;
  disclaimer: string;
};

export function Footer({ lang, dict }: { lang: Locale; dict: FooterDict }) {
  const p = (path: string) => `/${lang}${path}`;

  const columns = [
    {
      heading: dict.columns.calculators,
      links: [
        { label: dict.links.budget, href: p("/calculators/budget") },
        { label: dict.links.compoundInterest, href: p("/calculators/compound-interest") },
        { label: dict.links.debtPayoff, href: p("/calculators/debt-payoff") },
        { label: dict.links.mortgage, href: p("/calculators/mortgage") },
        { label: dict.links.savingsGoal, href: p("/calculators/savings-goal") },
        { label: dict.links.creditCard, href: p("/calculators/credit-card-payoff") },
      ],
    },
    {
      heading: dict.columns.learn,
      links: [
        { label: dict.links.allGuides, href: p("/guides") },
        { label: dict.links.journal, href: p("/journal") },
        { label: dict.links.whitepapers, href: p("/whitepapers") },
        { label: dict.links.annualReports, href: p("/annual-reports") },
        { label: dict.links.taxEngines, href: p("/tools") },
      ],
    },
    {
      heading: dict.columns.company,
      links: [
        { label: dict.links.mandate, href: p("/about") },
        { label: dict.links.methodology, href: p("/methodology") },
        { label: dict.links.careers, href: p("/careers") },
        { label: dict.links.legal, href: p("/legal") },
        { label: dict.links.contact, href: p("/contact") },
      ],
    },
  ];

  return (
    <footer className="bg-emerald-deep pt-16 pb-8 text-paper">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          <div>
            <div className="font-sans font-bold text-[1.1rem] tracking-[0.06em] uppercase text-paper flex items-center gap-2 mb-4">
              <span className="w-3.5 h-3.5 bg-paper rounded-sm flex-shrink-0" aria-hidden />
              MoneyCho
            </div>
            <p className="text-sm text-paper/70 leading-relaxed max-w-[30ch]">
              {dict.tagline}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-gold-bright mb-4">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/70 hover:text-paper transition-colors no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-paper/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-[0.75rem] text-paper/50">© {new Date().getFullYear()} MoneyCho. {dict.copyright}</span>
          <span className="text-[0.75rem] text-paper/50">{dict.disclaimer}</span>
        </div>
      </div>
    </footer>
  );
}

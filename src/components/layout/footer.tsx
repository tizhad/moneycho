import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type FooterDict = {
  tagline: string;
  columns: {
    calculators: string;
    wonen: string;
    inkomen: string;
    sparen: string;
    schulden: string;
    learn: string;
    company: string;
  };
  links: Record<string, string>;
  copyright: string;
  disclaimer: string;
};

export function Footer({ lang, dict }: { lang: Locale; dict: FooterDict }) {
  const p = (path: string) => `/${lang}${path}`;

  const calculatorGroups = [
    {
      heading: dict.columns.wonen,
      links: [
        { label: dict.links.mortgage, href: p("/calculators/mortgage") },
        { label: dict.links.kostenKoper, href: p("/calculators/kosten-koper") },
        { label: dict.links.rentVsBuy, href: p("/calculators/rent-vs-buy") },
        { label: dict.links.borrowingCapacity, href: p("/calculators/borrowing-capacity") },
        { label: dict.links.annuiteit, href: p("/calculators/annuiteit") },
      ],
    },
    {
      heading: dict.columns.inkomen,
      links: [
        { label: dict.links.takeHomePay, href: p("/calculators/take-home-pay") },
        { label: dict.links.cashFlow, href: p("/calculators/cash-flow") },
        { label: dict.links.budget, href: p("/calculators/budget") },
        { label: dict.links.budgetPlanner, href: p("/calculators/budget-planner") },
      ],
    },
    {
      heading: dict.columns.sparen,
      links: [
        { label: dict.links.compoundInterest, href: p("/calculators/compound-interest") },
        { label: dict.links.savingsGoal, href: p("/calculators/savings-goal") },
      ],
    },
    {
      heading: dict.columns.schulden,
      links: [
        { label: dict.links.debtPayoff, href: p("/calculators/debt-payoff") },
        { label: dict.links.creditCard, href: p("/calculators/credit-card-payoff") },
      ],
    },
  ];

  const columns = [
    {
      heading: dict.columns.learn,
      links: [
        { label: dict.links.allGuides, href: p("/guides") },
        { label: dict.links.insights, href: p("/guides") },
      ],
    },
    {
      heading: dict.columns.company,
      links: [
        { label: dict.links.about, href: p("/about") },
        { label: dict.links.contact, href: p("/contact") },
        { label: dict.links.privacy, href: p("/privacy") },
      ],
    },
  ];

  return (
    <footer className="bg-emerald-deep pt-16 pb-8 text-paper">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_2.6fr] gap-12 mb-12">
          <div>
            <div className="font-sans font-bold text-[1.1rem] tracking-[0.06em] uppercase text-paper flex items-center gap-2 mb-4">
              <span className="w-3.5 h-3.5 bg-paper rounded-sm flex-shrink-0" aria-hidden />
              MoneyCho
            </div>
            <p className="text-sm text-paper/70 leading-relaxed max-w-[30ch]">
              {dict.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-gold-bright mb-4">
              {dict.columns.calculators}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {calculatorGroups.map((group) => (
                <div key={group.heading}>
                  <h5 className="text-[0.7rem] font-semibold tracking-[0.06em] uppercase text-paper/50 mb-3">
                    {group.heading}
                  </h5>
                  <ul className="flex flex-col gap-2.5">
                    {group.links.map((link) => (
                      <li key={link.href + link.label}>
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
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12">
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-gold-bright mb-4">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
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
          <span className="text-sm text-paper/50">© {new Date().getFullYear()} MoneyCho. {dict.copyright}</span>
          <span className="text-sm text-paper/50">{dict.disclaimer}</span>
        </div>
      </div>
    </footer>
  );
}

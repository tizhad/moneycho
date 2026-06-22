import Link from "next/link";

const columns = [
  {
    heading: "Calculators",
    links: [
      { label: "Budget Calculator", href: "/calculators/budget" },
      { label: "Compound Interest", href: "/calculators/compound-interest" },
      { label: "Debt Payoff", href: "/calculators/debt-payoff" },
      { label: "Mortgage Calculator", href: "/calculators/mortgage" },
      { label: "Savings Goal", href: "/calculators/savings-goal" },
      { label: "Credit Card Payoff", href: "/calculators/credit-card-payoff" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "All Guides", href: "/guides" },
      { label: "Journal & Analysis", href: "/journal" },
      { label: "Whitepapers", href: "/whitepapers" },
      { label: "Annual Reports", href: "/annual-reports" },
      { label: "Tax Engines", href: "/tools" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our Mandate", href: "/about" },
      { label: "Methodology", href: "/methodology" },
      { label: "Careers", href: "/careers" },
      { label: "Legal", href: "/legal" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-emerald-deep pt-16 pb-8 text-paper">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-sans font-bold text-[1.1rem] tracking-[0.06em] uppercase text-paper flex items-center gap-2 mb-4">
              <span className="w-3.5 h-3.5 bg-paper rounded-sm flex-shrink-0" aria-hidden />
              MoneyCho
            </div>
            <p className="text-sm text-paper/70 leading-relaxed max-w-[30ch]">
              Free financial calculators, guides, and tools helping people make smarter money decisions. No sign-up required.
            </p>
          </div>

          {/* Columns */}
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
          <span className="text-[0.75rem] text-paper/50">© {new Date().getFullYear()} MoneyCho. All rights reserved.</span>
          <span className="text-[0.75rem] text-paper/50">No financial advice. Use at your own discretion.</span>
        </div>
      </div>
    </footer>
  );
}

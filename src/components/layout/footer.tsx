import Link from "next/link";

const columns = [
  {
    heading: "Instruments",
    links: [
      { label: "Calculators", href: "/calculators" },
      { label: "Tax Engines", href: "/calculators/tax" },
      { label: "Lending Models", href: "/calculators/lending" },
    ],
  },
  {
    heading: "Intelligence",
    links: [
      { label: "The Journal", href: "/insights" },
      { label: "Annual Reports", href: "/insights/reports" },
      { label: "Whitepapers", href: "/insights/whitepapers" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our Mandate", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Legal", href: "/legal" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-paper border-t border-emerald-deep/10 pt-20 pb-10 text-emerald-deep">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
            <div className="font-display text-2xl font-bold tracking-tight uppercase mb-6 flex items-center gap-2">
              <span className="size-4 bg-emerald-deep" aria-hidden />
              Moneycho
            </div>
            <p className="text-emerald-deep/60 max-w-xs">
              Quantitative tools for the qualitative future. Free financial clarity for everyone.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h5 className="font-bold uppercase tracking-widest text-[10px] mb-6 text-gold">
                {col.heading}
              </h5>
              <ul className="grid gap-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-emerald-deep/5 gap-4">
          <p className="text-[10px] uppercase tracking-widest opacity-50">
            © {new Date().getFullYear()} Moneycho. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-widest opacity-50">
            No financial advice. Use at your own discretion.
          </p>
        </div>
      </div>
    </footer>
  );
}

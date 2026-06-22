import Link from "next/link";

const navLinks = [
  { label: "Calculators", href: "/calculators" },
  { label: "Guides", href: "/guides" },
  { label: "Articles", href: "/articles" },
  { label: "Tax Engines", href: "/tools" },
  { label: "About", href: "/about" },
];

export function Header() {
  return (
    <nav className="sticky top-0 z-50 bg-paper border-b border-border-light">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-sans font-bold text-[1.1rem] tracking-[0.06em] uppercase text-emerald-deep flex items-center gap-2 no-underline"
        >
          <span className="w-3.5 h-3.5 bg-emerald-deep rounded-sm flex-shrink-0" aria-hidden />
          MoneyCho
        </Link>

        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
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

        <Link
          href="/calculators"
          className="text-[0.8rem] font-semibold tracking-[0.06em] uppercase px-5 py-2.5 border-[1.5px] border-emerald-deep rounded text-emerald-deep hover:bg-emerald-deep hover:text-paper transition-all no-underline"
        >
          All Tools
        </Link>
      </div>
    </nav>
  );
}

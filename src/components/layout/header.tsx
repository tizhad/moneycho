import Link from "next/link";

const navLinks = [
  { label: "Calculators", href: "/calculators" },
  { label: "Guides", href: "/guides" },
  { label: "Advisory", href: "/advisory" },
];

export function Header() {
  return (
    <nav className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md border-b border-emerald-deep/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight uppercase flex items-center gap-2 text-emerald-deep"
        >
          <span className="size-3 bg-gold" aria-hidden />
          Moneycho
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-emerald-deep">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-emerald-mid transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/calculators"
          className="px-5 py-2 bg-emerald-deep text-paper text-xs font-bold uppercase tracking-widest hover:bg-emerald-mid transition-all active:scale-95"
        >
          All Tools
        </Link>
      </div>
    </nav>
  );
}

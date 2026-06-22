import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MoneyCho — Free Financial Calculators, Budget Tools & Money Guides',
  description:
    'Use free calculators to plan your budget, calculate compound interest, compare rent vs buy, and build your emergency fund. Step-by-step guides and expert analysis. No sign-up required.',
};

const heroGrid = [
  {
    icon: '📊',
    label: 'Budget Calculator',
    desc: '50/30/20 rule, custom allocation',
    href: '/calculators/budget',
  },
  {
    icon: '📈',
    label: 'Compound Interest',
    desc: 'Visualise growth over time',
    href: '/calculators/compound-interest',
  },
  {
    icon: '⚖️',
    label: 'Debt Payoff',
    desc: 'Avalanche vs snowball comparison',
    href: '/calculators/debt-payoff',
  },
  {
    icon: '🏠',
    label: 'Mortgage Calculator',
    desc: 'Monthly payments & true cost',
    href: '/calculators/mortgage',
  },
];

const trustStats = [
  { number: '6+', label: 'Free financial calculators, always updated' },
  { number: '100%', label: 'Free, no sign-up, no data selling' },
  { number: '2026', label: 'Models updated with latest rates and data' },
  { number: 'Global', label: 'Works in 37 currencies worldwide' },
];

const categories = [
  {
    icon: '💰',
    name: 'Budgeting',
    count: '2 calculators · 2 guides',
    href: '/calculators/budget',
  },
  {
    icon: '📈',
    name: 'Investing',
    count: '1 calculator · 2 guides',
    href: '/calculators/compound-interest',
  },
  {
    icon: '⚖️',
    name: 'Debt Payoff',
    count: '2 calculators · 1 guide',
    href: '/calculators/debt-payoff',
  },
  {
    icon: '🌅',
    name: 'Retirement',
    count: 'Coming soon',
    href: '/calculators',
  },
  {
    icon: '🏠',
    name: 'Housing & Mortgage',
    count: '1 calculator · 1 guide',
    href: '/calculators/mortgage',
  },
  {
    icon: '🧾',
    name: 'Tax Planning',
    count: 'Coming soon',
    href: '/calculators',
  },
];

const calculators = [
  {
    n: '01',
    name: '50/30/20 Budget Calculator',
    desc: 'Model your monthly cash flow. Allocate capital across needs, wants, and savings with precision.',
    action: 'Build Budget →',
    href: '/calculators/budget',
  },
  {
    n: '02',
    name: 'Compound Interest Calculator',
    desc: 'Visualise the velocity of capital. Monthly contributions compounded across any time horizon.',
    action: 'Run Analysis →',
    href: '/calculators/compound-interest',
  },
  {
    n: '03',
    name: 'Debt Payoff Calculator',
    desc: 'Snowball vs avalanche comparison. See exactly how much interest each strategy saves.',
    action: 'Compare Rates →',
    href: '/calculators/debt-payoff',
  },
  {
    n: '04',
    name: 'Mortgage Calculator',
    desc: 'Monthly payments, total interest, and the true cost of your home loan across any term.',
    action: 'Calculate →',
    href: '/calculators/mortgage',
  },
  {
    n: '05',
    name: 'Savings Goal Calculator',
    desc: 'How long to reach any target — or how much to save each month to get there.',
    action: 'Plan Goal →',
    href: '/calculators/savings-goal',
  },
  {
    n: '06',
    name: 'Credit Card Payoff',
    desc: "See how long to pay off your balance and how much interest you'll pay at any payment level.",
    action: 'Calculate Now →',
    href: '/calculators/credit-card-payoff',
  },
];

const guides = [
  {
    tag: 'Foundations',
    title: 'Personal Finance 101: Budgeting, Saving & Investing Explained',
    desc: 'The foundational principles every person should know before making any financial decision. Start here.',
    href: '/guides/introduction-to-personal-finance',
  },
  {
    tag: 'Investing',
    title: 'How to Start Investing with €500 or Less',
    desc: 'Index funds, fractional shares, and compound growth: your first portfolio in under an hour.',
    href: '/guides',
  },
  {
    tag: 'Debt',
    title: 'Debt Payoff Strategies: Snowball vs Avalanche Compared',
    desc: 'Which method saves more money? Which keeps you motivated? The math and psychology, side by side.',
    href: '/guides',
  },
  {
    tag: 'Safety Net',
    title: 'How Much Emergency Fund Do You Actually Need?',
    desc: "The 3–6 month rule is too simple. Here's a framework based on your real risk profile.",
    href: '/guides',
  },
];

const journal = [
  {
    featured: true,
    tag: 'Fiscal Policy // June 2026',
    title:
      'The Inverted Yield Curve Paradox: Strategies for Extended Volatility',
    desc: 'An exploration of historical precedence and modern risk mitigation in high-interest environments.',
    href: '/guides',
  },
  {
    tag: 'Equities',
    title: 'Architecture of a Private Family Office: Lessons from the 1%',
    desc: 'Structural requirements for multi-generational wealth preservation and governance.',
    date: 'Updated June 14, 2026',
    href: '/guides',
  },
  {
    tag: 'Macro',
    title: 'Real Assets as Inflation Hedge: What the Data Actually Shows',
    desc: 'Gold, real estate, TIPS, and commodities: historical performance during inflationary periods since 1970.',
    date: 'Updated June 8, 2026',
    href: '/guides',
  },
];

const eeat = [
  {
    icon: '🔬',
    title: 'Methodology First',
    desc: 'Every calculator shows its formula. Every model cites its data source. Full transparency, always.',
  },
  {
    icon: '🔄',
    title: 'Updated Monthly',
    desc: 'Interest rates, tax brackets, and market data refreshed with every economic cycle shift.',
  },
  {
    icon: '🛡️',
    title: 'No Conflicts',
    desc: "We don't sell financial products. No affiliate bias. Tools built purely for user accuracy.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="max-w-[1280px] mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-gold mb-4">
            Free Financial Calculators & Tools
          </p>
          <h1 className="font-serif font-black text-[clamp(2.8rem,5vw,4rem)] leading-[1.1] text-emerald-deep mb-6">
            Smart Money Starts
            <br />
            with <em className="text-gold">Better Math.</em>
          </h1>
          <p className="text-[1.1rem] leading-[1.7] text-text-secondary max-w-[50ch] mb-9">
            Free calculators, step-by-step guides, and expert analysis to help
            you budget, invest, save, and plan for retirement. Built on
            transparency and technical rigour. No sign-up, no fees.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-deep text-paper text-[0.9rem] font-semibold rounded hover:bg-emerald-mid hover:-translate-y-px transition-all no-underline"
            >
              Try Our Calculators →
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-[1.5px] border-emerald-deep text-emerald-deep text-[0.9rem] font-semibold rounded hover:bg-emerald-deep hover:text-paper transition-all no-underline"
            >
              Read Free Guides
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {heroGrid.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="p-5 bg-white-card rounded-lg border border-border-light hover:-translate-y-0.5 hover:border-gold-muted transition-all no-underline group"
            >
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <span className="text-[0.82rem] font-semibold text-emerald-deep block mb-1">
                {item.label}
              </span>
              <span className="text-[0.75rem] text-text-tertiary leading-snug">
                {item.desc}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bg-emerald-deep py-5 px-6">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-6">
          {trustStats.map((s) => (
            <div key={s.number} className="flex items-center gap-3 text-paper">
              <span className="font-serif font-normal text-[1.4rem] text-gold-bright">
                {s.number}
              </span>
              <span className="text-[0.8rem] opacity-85 leading-snug max-w-[18ch]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY HUBS */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-10 flex-wrap gap-3">
          <h2 className="font-serif font-black text-[clamp(1.8rem,3vw,2.4rem)] text-emerald-deep">
            Explore by Topic
          </h2>
          <Link
            href="/calculators"
            className="text-[0.82rem] font-semibold text-gold hover:text-emerald-deep uppercase tracking-[0.04em] transition-colors no-underline"
          >
            View All Topics →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="relative p-7 bg-white-card border border-border-light rounded-lg hover:-translate-y-0.5 transition-all no-underline overflow-hidden group"
            >
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <span className="text-[1.6rem] mb-3 block">{cat.icon}</span>
              <span className="text-[0.9rem] font-semibold text-emerald-deep block mb-1">
                {cat.name}
              </span>
              <span className="text-[0.75rem] text-text-tertiary">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CALCULATORS */}
      <section className="max-w-[1280px] mx-auto px-6 pb-20">
        <div className="flex items-baseline justify-between mb-10 flex-wrap gap-3">
          <h2 className="font-serif font-black text-[clamp(1.8rem,3vw,2.4rem)] text-emerald-deep">
            Financial Calculators
          </h2>
          <Link
            href="/calculators"
            className="text-[0.82rem] font-semibold text-gold hover:text-emerald-deep uppercase tracking-[0.04em] transition-colors no-underline"
          >
            All Calculators →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-light rounded-lg overflow-hidden">
          {calculators.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="bg-white-card p-9 hover:bg-cream-deep transition-colors no-underline group"
            >
              <span className="font-serif font-normal text-[2.2rem] text-gold leading-none block mb-4">
                {c.n}
              </span>
              <span className="text-[0.95rem] font-bold text-emerald-deep uppercase tracking-[0.03em] block mb-2">
                {c.name}
              </span>
              <p className="text-[0.85rem] text-text-secondary leading-relaxed mb-4 max-w-[35ch]">
                {c.desc}
              </p>
              <span className="text-[0.82rem] font-semibold text-emerald-deep uppercase tracking-[0.04em] group-hover:text-gold transition-colors">
                {c.action}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* GUIDES */}
      <section className="bg-cream-deep py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-baseline justify-between mb-10 flex-wrap gap-3">
            <h2 className="font-serif font-black text-[clamp(1.8rem,3vw,2.4rem)] text-emerald-deep">
              Step-by-Step Guides
            </h2>
            <Link
              href="/guides"
              className="text-[0.82rem] font-semibold text-gold hover:text-emerald-deep uppercase tracking-[0.04em] transition-colors no-underline"
            >
              All Guides →
            </Link>
          </div>
          <div className="flex flex-col gap-px bg-border-light rounded-lg overflow-hidden">
            {guides.map((g) => (
              <Link
                key={g.title}
                href={g.href}
                className="grid grid-cols-[auto_1fr_auto] gap-6 items-center px-8 py-7 bg-white-card hover:bg-cream-deep transition-colors no-underline group"
              >
                <span className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-gold bg-gold/10 px-2.5 py-1 rounded-sm whitespace-nowrap">
                  {g.tag}
                </span>
                <div>
                  <h3 className="font-serif font-normal text-[1.2rem] text-emerald-deep mb-1">
                    {g.title}
                  </h3>
                  <p className="text-[0.84rem] text-text-secondary max-w-[60ch]">
                    {g.desc}
                  </p>
                </div>
                <span className="text-[1.2rem] text-emerald-deep opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-10 flex-wrap gap-3">
          <h2 className="font-serif font-black text-[clamp(1.8rem,3vw,2.4rem)] text-emerald-deep">
            Financial Insights & Analysis
          </h2>
          <Link
            href="/guides"
            className="text-[0.82rem] font-semibold text-gold hover:text-emerald-deep uppercase tracking-[0.04em] transition-colors no-underline"
          >
            Browse Archives →
          </Link>
        </div>
        <div className="grid min-[930px]:grid-cols-2 gap-8">
          <Link
            href={journal[0].href}
            className="min-[930px]:row-span-2 p-10 bg-emerald-deep rounded-lg flex flex-col justify-end min-h-[360px] hover:-translate-y-0.5 transition-all no-underline"
          >
            <span className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-gold-bright mb-3 block">
              {journal[0].tag}
            </span>
            <h3 className="font-serif font-black text-[1.6rem] text-paper leading-[1.3] mb-3">
              {journal[0].title}
            </h3>
            <p className="text-[0.85rem] text-paper/70 leading-relaxed max-w-[40ch]">
              {journal[0].desc}
            </p>
          </Link>
          {journal.slice(1).map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="p-7 border border-border-light rounded-lg flex flex-col justify-center hover:border-gold-muted hover:-translate-y-px transition-all no-underline"
            >
              <span className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-gold mb-2 block">
                {item.tag}
              </span>
              <h3 className="font-serif font-black text-[1.15rem] text-emerald-deep leading-[1.3] mb-2">
                {item.title}
              </h3>
              <p className="text-[0.82rem] text-text-secondary leading-relaxed">
                {item.desc}
              </p>
              {item.date && (
                <span className="text-[0.72rem] text-text-tertiary mt-3">
                  {item.date}
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* E-E-A-T */}
      <section className="bg-cream-deep py-16 px-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {eeat.map((item) => (
            <div key={item.title} className="text-center py-8 px-6">
              <span className="text-[2rem] mb-4 block">{item.icon}</span>
              <h3 className="text-[0.9rem] font-bold text-emerald-deep uppercase tracking-[0.04em] mb-2">
                {item.title}
              </h3>
              <p className="text-[0.84rem] text-text-secondary leading-relaxed max-w-[30ch] mx-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';

const calculators = [
  {
    index: '01',
    title: 'Budget Architect',
    description:
      'Model your monthly cash flow using the 50/30/20 rule. Allocate capital across needs, wants, and savings with precision.',
    href: '/calculators/budget',
    action: 'Build Budget',
  },
  {
    index: '02',
    title: 'Yield Projection',
    description:
      'Visualise the velocity of capital. Compound interest modelling with inflation-adjusted real-return targets.',
    href: '/calculators/compound-interest',
    action: 'Run Analysis',
  },
  {
    index: '03',
    title: 'Debt Arbitrage',
    description:
      'Comparison matrix for avalanche and snowball strategies. Real-time cost-of-capital optimisation.',
    href: '/calculators/debt-payoff',
    action: 'Compare Rates',
  },
  {
    index: '04',
    title: 'Wealth Longevity',
    description:
      'Monte Carlo simulations for retirement withdrawal rates across multiple economic cycles.',
    href: '/calculators/retirement',
    action: 'Stress Test',
  },
  {
    index: '05',
    title: 'Rent vs Own',
    description:
      'Dynamic net-worth modelling across renting and ownership scenarios. Factor in opportunity cost.',
    href: '/calculators/rent-vs-buy',
    action: 'Model Scenario',
  },
  {
    index: '06',
    title: 'Liquidity Shield',
    description:
      'Calculate your optimal emergency reserve across income volatility, dependants, and risk tolerance.',
    href: '/calculators/emergency-fund',
    action: 'Calculate Now',
  },
];

const articles = [
  {
    eyebrow: 'FISCAL POLICY // 06·21',
    title:
      'The Inverted Yield Curve Paradox: Strategies for Extended Volatility',
    excerpt:
      'An exploration of historical precedence and modern risk mitigation in high-interest environments.',
    href: '/guides/yield-curve',
  },
  {
    eyebrow: 'EQUITIES // 06·14',
    title: 'Architecture of a Private Family Office: Lessons from the 1%',
    excerpt:
      'Defining the structural requirements for multi-generational wealth preservation and governance.',
    href: '/guides/family-office',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <span className="block text-gold font-display font-medium uppercase tracking-[0.3em] text-sm mb-6">
            Institutional Intelligence
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter text-emerald-deep mb-8">
            Precision in <br />
            <span className="text-emerald-mid italic font-body font-normal">
              Every Decimal.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-emerald-deep/80 max-w-xl mb-10 leading-relaxed">
            A suite of high-fidelity financial instruments and analytical
            intelligence for the modern individual. Built on the principles of
            transparency and technical rigour.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/calculators"
              className="px-8 py-4 bg-emerald-deep text-paper font-bold uppercase tracking-widest text-xs hover:bg-emerald-mid transition-all"
            >
              Explore Toolkit
            </Link>
            <Link
              href="/guides"
              className="px-8 py-4 border border-emerald-deep text-emerald-deep font-bold uppercase tracking-widest text-xs hover:bg-emerald-deep/5 transition-colors"
            >
              View Insights
            </Link>
          </div>
        </div>
      </header>

      {/* Analytical Engines */}
      <section id="tools" className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex justify-between items-end mb-12 border-b border-emerald-deep/20 pb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-emerald-deep tracking-tight">
            Articles
          </h2>
          {/* <span className="text-xs font-medium uppercase tracking-widest text-emerald-deep/50">
            V0.6 // Stable
          </span> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-emerald-deep/10 border border-emerald-deep/10">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group bg-paper p-8 hover:bg-emerald-deep/[0.03] transition-colors"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="font-display text-4xl font-bold text-gold group-hover:text-emerald-mid transition-colors">
                  {calc.index}
                </span>
                <span className="size-2 bg-emerald-deep/20" aria-hidden />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3 uppercase text-emerald-deep tracking-tight">
                {calc.title}
              </h3>
              <p className="text-emerald-deep/70 text-sm leading-relaxed mb-8">
                {calc.description}
              </p>
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-transparent group-hover:border-gold pb-1 text-emerald-deep transition-all">
                {calc.action} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Journal */}
      <section id="journal" className="bg-emerald-deep text-paper py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                The Moneycho Journal
              </h2>
              <p className="text-paper/60 leading-relaxed mb-8">
                Deep technical analysis on market dynamics, fiscal policy, and
                the architecture of wealth.
              </p>
              <Link
                href="/guides"
                className="text-gold font-bold uppercase tracking-widest text-xs border-b border-gold pb-1 hover:text-paper hover:border-paper transition-all"
              >
                Browse Archives
              </Link>
            </div>

            <div className="lg:col-span-8 grid gap-12">
              {articles.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group border-b border-paper/10 pb-12 last:border-0 last:pb-0"
                >
                  <span className="text-xs font-bold text-gold tracking-[0.2em] mb-4 block">
                    {article.eyebrow}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold group-hover:text-gold transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <div className="mt-6 flex justify-between items-center gap-6">
                    <p className="text-paper/50 max-w-lg">{article.excerpt}</p>
                    <span className="text-2xl font-display shrink-0">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

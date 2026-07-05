import Link from 'next/link';
import type { Metadata } from 'next';

const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Free Personal Finance Calculators',
    description: 'Free calculators for budgeting, compound interest, mortgage, credit card payoff, debt, investing, and retirement planning.',
  },
  nl: {
    title: 'Gratis Financiële Calculators',
    description: 'Gratis calculators voor budget, samengestelde rente, hypotheek, creditcard aflossen, schulden en beleggen.',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === 'nl' ? 'nl' : 'en';
  const { title, description } = COPY[l];
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE}/${lang}/calculators`,
      languages: {
        en: `${BASE}/en/calculators`,
        nl: `${BASE}/nl/calculators`,
        'x-default': `${BASE}/nl/calculators`,
      },
    },
    openGraph: { title: `${title} | MoneyCho`, description, type: 'website', url: `${BASE}/${lang}/calculators` },
    twitter: { card: 'summary', title: `${title} | MoneyCho`, description },
  };
}

const calculators = [
  {
    index: '01',
    title: 'Budget Planner',
    description:
      'Split your income using the 50/30/20 rule: needs, wants, and savings.',
    href: '/calculators/budget',
    action: 'Build Budget',
    tag: 'Budgeting',
  },
  {
    index: '02',
    title: 'Compound Interest',
    description:
      'See how your money grows over time with contributions and compounding.',
    href: '/calculators/compound-interest',
    action: 'Run Analysis',
    tag: 'Savings',
  },
  {
    index: '03',
    title: 'Mortgage Calculator',
    description:
      'Calculate monthly payments, total interest, and true cost of your home.',
    href: '/calculators/mortgage',
    action: 'Calculate',
    tag: 'Real Estate',
  },
  {
    index: '04',
    title: 'Credit Card Payoff',
    description:
      "See how long to pay off your balance and how much interest you'll pay.",
    href: '/calculators/credit-card-payoff',
    action: 'Calculate',
    tag: 'Debt',
  },
  {
    index: '05',
    title: 'Savings Goal',
    description:
      'Find out how long it takes to reach any savings target, or how much to save each month.',
    href: '/calculators/savings-goal',
    action: 'Plan Goal',
    tag: 'Savings',
  },
  {
    index: '06',
    title: 'Debt Payoff',
    description:
      'Compare avalanche vs snowball strategies across all your debts. See which saves more and pays off faster.',
    href: '/calculators/debt-payoff',
    action: 'Compare Strategies',
    tag: 'Debt',
  },
  {
    index: '07',
    title: 'Take-Home Pay',
    description:
      'Calculate your Dutch net salary after income tax and tax credits. NL 2025 tax brackets included.',
    href: '/calculators/take-home-pay',
    action: 'Calculate',
    tag: 'Income',
  },
  {
    index: '08',
    title: 'Monthly Cash Flow',
    description:
      'Enter your real income and expenses to see your actual surplus or shortfall. Not a plan, just a snapshot.',
    href: '/calculators/cash-flow',
    action: 'See Cash Flow',
    tag: 'Budgeting',
  },
  {
    index: '09',
    title: 'Borrowing Capacity',
    description:
      'How much can you borrow? Based on VFN / Nibud norms used by Dutch lenders. Accounts for income, housing costs, and existing debts.',
    href: '/calculators/borrowing-capacity',
    action: 'Calculate',
    tag: 'Borrowing',
  },
  {
    index: '10',
    title: 'Comprehensive Budget Planner',
    description:
      'Step-by-step budget builder: enter every income source and expense category, then see your full breakdown and a personalised tip.',
    href: '/calculators/budget-planner',
    action: 'Build My Budget',
    tag: 'Budgeting',
  },
  {
    index: '11',
    title: 'Annuiteit Berekenen',
    description:
      'Bereken de vaste maandlast van een lening. Vul leenbedrag, rente en looptijd in en zie het volledige aflossingsschema.',
    href: '/calculators/annuiteit',
    action: 'Bereken',
    tag: 'Lenen',
  },
  {
    index: '12',
    title: 'Kosten Koper Calculator',
    description:
      'Bereken alle bijkomende kosten bij het kopen van een huis: overdrachtsbelasting, notariskosten, NHG en hypotheekadvies.',
    href: '/calculators/kosten-koper',
    action: 'Bereken kosten',
    tag: 'Eigen woning',
  },
];

const comingSoon = [
  { title: 'Net Worth', tag: 'Planning', href: '#' },
  { title: 'Rent vs Buy', tag: 'Real Estate', href: '#' },
  { title: 'Investment Growth', tag: 'Investing', href: '#' },
  { title: 'FIRE Number', tag: 'Retirement', href: '#' },
  { title: 'Loan Calculator', tag: 'Debt', href: '#' },
];

export default async function CalculatorsIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  await params;
  return (
    <div className="max-w-7xl mx-auto px-6 md:py-24">
      <div className="mb-16 border-b border-emerald-deep/20 pb-8">
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          Free Tools
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight">
          Financial Calculators
        </h1>
      </div>

      {/* Live calculators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-emerald-deep/10 border border-emerald-deep/10 mb-20">
        {calculators.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="group bg-paper p-8 hover:bg-emerald-deep/[0.03] transition-colors"
          >
            <div className="flex justify-between items-start mb-10">
              <span className="font-display text-4xl font-bold text-gold group-hover:text-emerald-mid transition-colors">
                {calc.index}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-deep/30 border border-emerald-deep/10 px-2 py-1">
                {calc.tag}
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold mb-3 uppercase text-emerald-deep tracking-tight">
              {calc.title}
            </h3>
            <p className="text-emerald-deep/60 text-sm leading-relaxed mb-8">
              {calc.description}
            </p>
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-transparent group-hover:border-gold pb-1 text-emerald-deep transition-all">
              {calc.action} →
            </span>
          </Link>
        ))}
      </div>

      {/* Coming soon */}
      <div>
        <h2 className="font-display text-lg font-bold uppercase tracking-widest text-emerald-deep/30 mb-6">
          Coming Soon
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-emerald-deep/5 border border-emerald-deep/5">
          {comingSoon.map((c) => (
            <div key={c.title} className="bg-paper p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep/25 block mb-2">
                {c.tag}
              </span>
              <p className="font-display font-bold text-emerald-deep/30 text-sm uppercase tracking-tight">
                {c.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

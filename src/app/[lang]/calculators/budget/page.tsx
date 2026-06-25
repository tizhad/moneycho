import type { Metadata } from 'next';
import BudgetCalculator from './BudgetCalculator';

const SLUG = 'budget';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: '50/30/20 Budget Planner',
    description:
      'Split your after-tax income into needs, wants and savings with the 50/30/20 rule. Free calculator with instant visual breakdown.',
  },
  nl: {
    title: 'Budget Planner 50/30/20',
    description:
      'Verdeel je netto inkomen in behoeften, wensen en spaargeld met de 50/30/20 regel. Gratis calculator met direct visueel overzicht.',
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
      canonical: `${BASE}/${lang}/calculators/${SLUG}`,
      languages: {
        en: `${BASE}/en/calculators/${SLUG}`,
        nl: `${BASE}/nl/calculators/${SLUG}`,
        'x-default': `${BASE}/nl/calculators/${SLUG}`,
      },
    },
    openGraph: {
      title: `${title} | MoneyCho`,
      description,
      type: 'website',
      url: `${BASE}/${lang}/calculators/${SLUG}`,
    },
    twitter: { card: 'summary', title: `${title} | MoneyCho`, description },
  };
}

const NEEDS_EXAMPLES = [
  'Rent or mortgage payment',
  'Basic groceries',
  'Utilities — gas, water, electricity',
  'Health insurance (verplichte basisverzekering)',
  'Minimum loan or credit card payments',
  'Essential transport to work',
];

const WANTS_EXAMPLES = [
  'Restaurant meals and takeaway',
  'Netflix, Spotify, and streaming subscriptions',
  'Gym membership',
  'Clothing beyond basics',
  'Weekend trips and holidays',
  'Hobbies and entertainment',
];

const ADJUSTMENTS = [
  {
    situation: 'High housing costs',
    example: 'Amsterdam, Utrecht',
    fix: 'Adjust to 60/20/20 or 65/15/20. Protect the savings percentage as much as possible.',
  },
  {
    situation: 'Carrying high-interest debt',
    example: 'Credit cards, personal loans',
    fix: 'Temporarily shift to 50/20/30 — redirect the wants budget to debt until it\'s cleared.',
  },
  {
    situation: 'Lower income',
    example: 'Starting out, part-time',
    fix: 'Start with 50/40/10 and increase the savings rate gradually as income grows. Any savings percentage beats zero.',
  },
];

export default function BudgetPage() {
  return (
    <>
      <BudgetCalculator />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        {/* What is 50/30/20 */}
        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            What is the 50/30/20 rule?
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            The 50/30/20 rule is a budgeting framework that divides your after-tax income into three categories: 50% for needs, 30% for wants, and 20% for savings and debt repayment. It was popularised by US Senator Elizabeth Warren in her book <em>All Your Worth</em> (2005) and is now one of the most widely recommended personal finance frameworks.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            The rule works because it is simple enough to stick to. You do not need to track every euro — just know which bucket your spending falls into.
          </p>
        </section>

        {/* Worked example */}
        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            Worked example
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">
            €3,500 monthly take-home pay
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">
                Needs — 50%
              </p>
              <p className="font-display text-3xl font-bold text-emerald-deep">€1,750</p>
              <p className="text-xs text-emerald-deep/50 mt-2">Rent, food, utilities, insurance</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">
                Wants — 30%
              </p>
              <p className="font-display text-3xl font-bold text-emerald-deep">€1,050</p>
              <p className="text-xs text-emerald-deep/50 mt-2">Dining, subscriptions, leisure</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">
                Savings — 20%
              </p>
              <p className="font-display text-3xl font-bold text-emerald-deep">€700</p>
              <p className="text-xs text-emerald-deep/50 mt-2">€8,400 saved per year</p>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/60 mt-8 border-t border-emerald-deep/10 pt-6">
            Not sure of your take-home? Use the{' '}
            <a href="../take-home-pay" className="text-emerald-deep font-semibold underline underline-offset-2">
              Take-Home Pay Calculator
            </a>{' '}
            first, then come back here.
          </p>
        </section>

        {/* Needs vs wants */}
        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Needs vs wants — where does each expense go?
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            The most common source of confusion. A need is something you cannot reasonably live or work without. A want improves your life but you could cut it if necessary.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep mb-4">
                Needs (50%)
              </p>
              <ul className="space-y-2">
                {NEEDS_EXAMPLES.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-emerald-deep/70">
                    <span className="text-emerald-deep/30 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
                Wants (30%)
              </p>
              <ul className="space-y-2">
                {WANTS_EXAMPLES.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-emerald-deep/70">
                    <span className="text-emerald-deep/30 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/50 mt-6 border-t border-emerald-deep/10 pt-5">
            Grey areas exist. A car is a need in a rural area but a want in central Amsterdam. A smartphone is a need; an expensive model is partly a want. Use your judgement — the goal is awareness, not punishment.
          </p>
        </section>

        {/* What the 20% should do */}
        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            What should the 20% savings go toward?
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            In order of priority:
          </p>
          <ol className="space-y-5">
            {[
              ['Emergency fund first', 'Build 3–6 months of essential expenses in a liquid savings account before investing. This prevents any short-term crisis from forcing you into debt.'],
              ['Clear high-interest debt', 'Credit card debt at 15–25% interest costs more than almost any investment earns. Pay it off before investing.'],
              ['Pension contributions', 'Take advantage of any employer match first — it is an immediate 100% return. Then top up an IRA/pension (lijfrente in NL) for the tax benefit.'],
              ['Invest the rest', 'Index funds are the default for most people. Use the Compound Interest calculator to see what €700/month at 7% for 20 years becomes.'],
            ].map(([label, desc], i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display text-sm font-bold text-gold w-5 shrink-0 pt-0.5">
                  {i + 1}.
                </span>
                <p className="text-sm text-emerald-deep/70 leading-relaxed">
                  <strong className="text-emerald-deep font-semibold">{label}</strong>
                  {' — '}{desc}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* When 50/30/20 doesn't fit */}
        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-6">
            When 50/30/20 does not fit — how to adjust
          </h2>
          <div className="divide-y divide-emerald-deep/10 border-t border-emerald-deep/10">
            {ADJUSTMENTS.map(({ situation, example, fix }) => (
              <div key={situation} className="py-5">
                <div className="flex items-baseline gap-3 mb-2">
                  <p className="text-sm font-bold text-emerald-deep">{situation}</p>
                  <p className="text-xs text-emerald-deep/40">{example}</p>
                </div>
                <p className="text-sm text-emerald-deep/70 leading-relaxed">{fix}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-emerald-deep/50 mt-4">
            The rule is a starting point, not a constraint. The real goal is spending less than you earn and saving something consistently.
          </p>
        </section>

      </div>
    </>
  );
}

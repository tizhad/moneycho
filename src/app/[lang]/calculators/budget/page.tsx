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

const NEEDS = [
  'Rent or mortgage payment',
  'Basic groceries',
  'Utilities: gas, water, electricity',
  'Health insurance (verplichte basisverzekering)',
  'Minimum loan and credit card payments',
  'Essential transport to work',
];

const WANTS = [
  'Restaurant meals and takeaway',
  'Netflix, Spotify and other subscriptions',
  'Gym membership',
  'Clothing beyond the basics',
  'Weekend trips and holidays',
  'Hobbies and entertainment',
];

const ADJUSTMENTS = [
  {
    situation: 'High housing costs',
    example: 'Amsterdam, Utrecht and other expensive cities',
    fix: 'Shift to 60/20/20 or even 65/15/20. Protect the savings percentage as much as you can. If rent is eating 40% of your income, that is a housing problem, not a budgeting problem.',
  },
  {
    situation: 'Carrying high-interest debt',
    example: 'Credit cards, personal loans above 10%',
    fix: 'Temporarily go to 50/20/30. Redirect that extra 10% from wants to debt repayment. Once the debt is cleared, move back to 50/30/20 and redirect the old payment to savings.',
  },
  {
    situation: 'Lower income or just starting out',
    example: 'Early career, part-time work, student income',
    fix: 'Start with 50/40/10 or even 50/45/5. Any savings habit is better than none. Build the savings rate gradually as income grows.',
  },
];

export default function BudgetPage() {
  return (
    <>
      <BudgetCalculator />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            What is the 50/30/20 rule?
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            The 50/30/20 rule splits your after-tax income into three buckets: 50% for needs, 30% for wants, and 20% for savings and debt. US Senator Elizabeth Warren popularised it in her book <em>All Your Worth</em> in 2005. It has stuck around because it is simple enough that people actually follow it.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            You do not track every coffee or grocery receipt. You just know which bucket each spending category falls into, and you check the totals once a month.
          </p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            Worked example
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">
            Monthly take-home pay: 3,500 euros
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Needs, 50%</p>
              <p className="font-display text-3xl font-bold text-emerald-deep">1,750 euros</p>
              <p className="text-xs text-emerald-deep/50 mt-2">Rent, groceries, utilities, insurance</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Wants, 30%</p>
              <p className="font-display text-3xl font-bold text-emerald-deep">1,050 euros</p>
              <p className="text-xs text-emerald-deep/50 mt-2">Dining, subscriptions, leisure</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Savings, 20%</p>
              <p className="font-display text-3xl font-bold text-emerald-deep">700 euros</p>
              <p className="text-xs text-emerald-deep/50 mt-2">8,400 euros saved in a year</p>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/60 mt-8 border-t border-emerald-deep/10 pt-6">
            Not sure what your take-home is?{' '}
            <a href="../take-home-pay" className="text-emerald-deep font-semibold underline underline-offset-2">
              Calculate your net salary first
            </a>
            , then come back here.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Needs vs wants: where does each expense go?
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            This is where most people get stuck. A need is something you cannot reasonably live or work without. A want improves your life but you could cut it if you had to.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep mb-4">Needs (50%)</p>
              <ul className="space-y-2">
                {NEEDS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-emerald-deep/70">
                    <span className="text-emerald-deep/30 mt-0.5 shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Wants (30%)</p>
              <ul className="space-y-2">
                {WANTS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-emerald-deep/70">
                    <span className="text-emerald-deep/30 mt-0.5 shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/50 mt-6 border-t border-emerald-deep/10 pt-5">
            Grey areas exist everywhere. A car is a need in a rural area and a want in central Amsterdam. A smartphone is a need; an expensive model is partly a want. Use your judgement. The goal is awareness, not punishment.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            What should the 20% savings actually do?
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            In this order:
          </p>
          <ol className="space-y-5">
            {[
              ['Emergency fund first', "Build three to six months of essential expenses in a liquid savings account. Do this before anything else. Without it, any unexpected cost turns into debt."],
              ['Clear high-interest debt', "Credit card debt at 20% costs more than almost any investment earns. Pay it off before you invest a single euro."],
              ['Pension contributions', "If your employer matches pension contributions, take the full match. That is an instant 100% return. Nothing comes close."],
              ['Invest the rest', "Index funds tracking global markets are the default choice for most people. Use the Compound Interest calculator to see what 700 euros per month becomes at 7% over 20 years."],
            ].map(([label, desc], i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display text-sm font-bold text-gold w-5 shrink-0 pt-0.5">{i + 1}.</span>
                <p className="text-sm text-emerald-deep/70 leading-relaxed">
                  <strong className="text-emerald-deep font-semibold">{label}:</strong>{' '}{desc}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-6">
            When 50/30/20 does not fit your situation
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
          <p className="text-sm text-emerald-deep/50 mt-5">
            The exact percentages matter less than the habit. Spend less than you earn, save something every month, and increase the savings rate when you can.
          </p>
        </section>

      </div>
    </>
  );
}

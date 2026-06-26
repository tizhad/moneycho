import type { Metadata } from 'next';
import BorrowingCapacityCalculator from './BorrowingCapacityCalculator';

const SLUG = 'borrowing-capacity';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Borrowing Capacity Calculator (Netherlands)',
    description:
      'Estimate how much you can borrow for a Dutch mortgage based on income, existing debts, and Nibud norms. Free and instant.',
  },
  nl: {
    title: 'Maximale Hypotheek Calculator Nederland',
    description:
      'Bereken hoeveel je kunt lenen voor een hypotheek op basis van je inkomen, bestaande schulden en Nibud-normen. Gratis en direct.',
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

const REDUCERS = [
  {
    factor: 'Existing loans and credit cards',
    impact: 'Significant',
    detail: 'Each euro of monthly debt repayment reduces your maximum mortgage payment by roughly the same amount. A 350 euro car payment can cut your borrowing capacity by 70,000 euros or more.',
  },
  {
    factor: 'Unused credit card limits',
    impact: 'Moderate',
    detail: 'Dutch lenders count a portion of your unused credit card limit as potential debt. Closing cards you do not use can modestly increase your borrowing capacity.',
  },
  {
    factor: 'Self-employment income',
    impact: 'Material',
    detail: 'For ZZP and self-employed income, lenders typically use 70% of the average of the last three years. Irregular income or recent business losses can reduce what you qualify for significantly.',
  },
  {
    factor: 'Toetsrente (stress test rate)',
    impact: 'Always applies',
    detail: 'Lenders must use a minimum calculation rate (toetsrente) set by the AFM, currently around 5%, even if actual rates are lower. This ensures you can still afford repayments if rates rise.',
  },
];

export default function BorrowingCapacityPage() {
  return (
    <>
      <BorrowingCapacityCalculator />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            How Dutch mortgage limits are set
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            In the Netherlands, your maximum mortgage is primarily determined by your income, not the property you want to buy. Lenders use income norms published by Nibud (Nationaal Instituut voor Budgetvoorlichting) and the VFN to set a maximum monthly payment as a percentage of your gross income.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            At lower incomes (around 1,500 euros per month gross), about 20% of income can go toward housing costs. As income rises, this percentage increases gradually to around 35% for incomes above 4,000 euros per month. The table shifts slightly each year.
          </p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            Worked example
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">
            60,000 euros gross annual salary, one existing loan of 350 euros/month
          </p>
          <div className="grid sm:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Gross income</p>
              <p className="font-display text-xl font-bold text-emerald-deep">60,000</p>
              <p className="text-xs text-emerald-deep/50 mt-1">per year</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Max housing cost</p>
              <p className="font-display text-xl font-bold text-emerald-deep">~1,750</p>
              <p className="text-xs text-emerald-deep/50 mt-1">euros/month (≈35%)</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Minus car loan</p>
              <p className="font-display text-xl font-bold text-emerald-deep">1,400</p>
              <p className="text-xs text-emerald-deep/50 mt-1">euros/month available for mortgage</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Max mortgage</p>
              <p className="font-display text-xl font-bold text-emerald-deep">~270,000</p>
              <p className="text-xs text-emerald-deep/50 mt-1">euros at 4%, 25 years</p>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/60 border-t border-emerald-deep/10 pt-5">
            Without the car loan, the same income qualifies for roughly 337,000 euros. That 350 euro monthly payment reduces borrowing capacity by about 67,000 euros.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            What reduces your borrowing capacity
          </h2>
          <div className="divide-y divide-emerald-deep/10 border-t border-emerald-deep/10">
            {REDUCERS.map(({ factor, impact, detail }) => (
              <div key={factor} className="py-5">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-bold text-emerald-deep">{factor}</p>
                  <span className="text-xs font-semibold text-emerald-deep/50 bg-emerald-deep/5 px-2 py-0.5 rounded">{impact}</span>
                </div>
                <p className="text-sm text-emerald-deep/70 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Maximum is a ceiling, not a target
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            Lenders will approve you for the maximum their model allows. That does not mean you should borrow it. The Nibud norms are designed so that at the maximum amount, you can afford the payment if rates rise to around 5% and your income stays flat.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            Most financial advisors suggest staying 10 to 20% below the maximum if possible. That buffer gives you room for an unexpected expense, a period of reduced income, or a rising rate environment.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            Also worth considering: how does the monthly payment fit into your actual budget? Use the Mortgage Calculator to see the monthly cost, then plug that into the Cash Flow Calculator to see what is left. Affordability on paper and affordability in real life are sometimes different numbers.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Buying with a partner
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            When two people buy together, lenders typically take 100% of the higher income and 90% of the lower income to calculate the maximum mortgage. The exact rules vary by lender, but combining incomes almost always increases borrowing capacity significantly.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            Keep in mind that both incomes need to be sustainable. If one partner plans to reduce working hours in the next few years, factor that into your calculations now rather than after you have committed to the mortgage.
          </p>
        </section>

      </div>
    </>
  );
}

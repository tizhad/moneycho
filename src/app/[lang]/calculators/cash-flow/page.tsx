import type { Metadata } from 'next';
import CashFlowCalculator from './CashFlowCalculator';

const SLUG = 'cash-flow';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Personal Cash Flow Calculator',
    description:
      'Track your monthly income and expenses to find out where your money actually goes. See your surplus or deficit at a glance.',
  },
  nl: {
    title: 'Persoonlijke Cashflow Calculator',
    description:
      'Volg je maandelijkse inkomsten en uitgaven om te zien waar je geld naartoe gaat. Bekijk je overschot of tekort in een oogopslag.',
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

const SURPLUS_STEPS = [
  ['Top up your emergency fund', 'If you do not have three to six months of expenses in a liquid account, this comes first. Every time.'],
  ['Clear high-interest debt', 'Any debt above 5 to 6% APR costs more than a safe investment earns. Pay it down before investing.'],
  ['Maximise pension contributions', 'If your employer matches contributions, get the full match before putting money anywhere else. Free money.'],
  ['Invest what remains', 'A global index fund in a beleggingsrekening is the default for most people. Simple, diversified, low fees.'],
];

const DEFICIT_DIAGNOSIS = [
  ['Temporary shortfall', 'Unexpected car repair, medical cost, or seasonal spending spike. Cover it from your emergency fund and rebuild. No action needed on regular expenses.'],
  ['Structural deficit', 'Your monthly expenses consistently exceed income. This requires cutting spending, increasing income, or both. Start by finding the largest discretionary categories.'],
];

export default function CashFlowPage() {
  return (
    <>
      <CashFlowCalculator />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Budget vs cash flow: what is the difference?
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            A budget is a plan. Cash flow is what actually happened. A lot of people confuse the two. They set up a budget, feel good about it, and then wonder why they still run out of money at the end of the month.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            Cash flow tracking is about real numbers. What did you actually earn this month? What did you actually spend? The gap between those two figures tells you more about your finances than any plan on paper.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            How to use this calculator
          </h2>
          <ol className="space-y-5">
            {[
              ['Enter your income', "Use your net take-home pay, not your gross salary. Include all regular sources: salary, freelance income, side income, rental income. If you are unsure of your net, use the Take-Home Pay calculator first."],
              ['Enter fixed expenses', "These do not change month to month. Rent or mortgage, insurance, subscriptions, loan minimums, pension contributions. Total these accurately, they are your baseline."],
              ['Enter variable expenses', "Food, transport, clothing, eating out, entertainment. If you are not sure, check your bank statements for the last two or three months and average them. Be honest."],
              ['Read the result', "A positive number means you have money left over. A negative number means you are spending more than you earn. Both tell you something important."],
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
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            What to do with a surplus
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            A surplus is not money to spend. It is the raw material for financial progress. Here is the priority order:
          </p>
          <ol className="space-y-4">
            {SURPLUS_STEPS.map(([label, desc], i) => (
              <li key={i} className="flex gap-4 border-b border-emerald-deep/10 pb-4">
                <span className="font-display text-sm font-bold text-gold w-5 shrink-0 pt-0.5">{i + 1}.</span>
                <p className="text-sm text-emerald-deep/70 leading-relaxed">
                  <strong className="text-emerald-deep font-semibold">{label}:</strong>{' '}{desc}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            What to do with a deficit
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            First, figure out whether it is temporary or structural:
          </p>
          <div className="space-y-4">
            {DEFICIT_DIAGNOSIS.map(([label, desc]) => (
              <div key={label} className="border-l-2 border-emerald-deep/20 pl-5 py-1">
                <p className="text-sm font-bold text-emerald-deep mb-1.5">{label}</p>
                <p className="text-sm text-emerald-deep/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-emerald-deep/60 mt-6 bg-emerald-deep/[0.04] border border-emerald-deep/15 p-5">
            The most common structural deficits in the Netherlands come from housing costs exceeding 30 to 35% of take-home pay. If rent is your problem, adjust the rent or adjust the income. Trimming the grocery budget will not fix a housing cost issue.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Making cash flow a monthly habit
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            The most effective approach is to review your actual income and spending once a month, on the same day. Set aside 20 minutes on the last day of the month. Pull up your bank statements, update the calculator, and see how close reality was to the plan.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            Over three to six months you will spot patterns you never noticed before. A category that always runs over. A month where spending reliably spikes. An expense you keep forgetting to account for. That awareness is the entire point.
          </p>
        </section>

      </div>
    </>
  );
}

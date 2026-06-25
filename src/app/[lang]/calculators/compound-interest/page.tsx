import type { Metadata } from 'next';
import CompoundInterestCalculator from './CompoundInterestCalculator';

const SLUG = 'compound-interest';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Compound Interest Calculator',
    description:
      'See how monthly contributions compound over any time horizon. Visualise the power of compounding and project your future balance.',
  },
  nl: {
    title: 'Samengestelde Rente Calculator',
    description:
      'Bereken hoe je geld groeit met maandelijkse inleg. Visualiseer de kracht van samengestelde rente over elke tijdshorizon.',
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

const RATES = [
  { label: 'Dutch high-yield savings account', rate: '2–3%', note: '2025 rates, low risk' },
  { label: 'Government bonds (NL / EU)', rate: '3–4%', note: 'Low risk, fixed income' },
  { label: 'Balanced fund (60/40 stocks/bonds)', rate: '5–6%', note: 'Moderate risk' },
  { label: 'Global equity index fund', rate: '7–8%', note: 'Higher risk — historical average before inflation' },
];

const STEPS = [
  ['Starting amount', 'Enter what you have to invest today. Zero works fine — monthly contributions alone compound powerfully.'],
  ['Monthly contribution', 'The amount you add each month. Consistency here matters more than the starting amount.'],
  ['Annual interest rate', 'Use your savings account rate, or a long-term average for investments. See the rate guide below.'],
  ['Time period', 'How many years to let the money grow. Even a few extra years at the end make a large difference.'],
  ['Compound frequency', 'How often interest is added to your balance. Monthly is standard for savings accounts and most ETFs.'],
];

export default function CompoundInterestPage() {
  return (
    <>
      <CompoundInterestCalculator />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        {/* What is compound interest */}
        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            What is compound interest?
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            Compound interest is interest earned on both your original deposit and the interest already accumulated. Unlike simple interest — which only grows on the starting amount — compound interest snowballs: each period, your interest earns interest, and the effect accelerates over time.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            The growth starts slowly and then curves sharply upward. The first decade feels modest. The last decade is dramatic. This is why the advice is always the same: start early, and stay consistent.
          </p>
        </section>

        {/* Worked example */}
        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            Worked example
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">
            $10,000 starting · $500/month · 7% annual rate · 20 years
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">You contributed</p>
              <p className="font-display text-3xl font-bold text-emerald-deep">$130,000</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Interest earned</p>
              <p className="font-display text-3xl font-bold text-emerald-deep">$171,000</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Final balance</p>
              <p className="font-display text-3xl font-bold text-emerald-deep">$301,000</p>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/60 mt-8 border-t border-emerald-deep/10 pt-6">
            More than half the final balance came from compound growth — not from money you deposited. That $171,000 of interest is what people mean when they talk about &ldquo;making money work for you.&rdquo;
          </p>
        </section>

        {/* How to use */}
        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-6">
            How to use this calculator
          </h2>
          <ol className="space-y-5">
            {STEPS.map(([label, desc], i) => (
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

        {/* Compound vs simple */}
        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Compound interest vs simple interest
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            Simple interest is calculated only on your original principal — the same fixed amount each year. Compound interest is calculated on your growing balance, so it accelerates. On $10,000 at 7% for 20 years, principal only:
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-emerald-deep/10 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">Simple interest</p>
              <p className="font-display text-2xl font-bold text-emerald-deep">$24,000</p>
              <p className="text-xs text-emerald-deep/50 mt-2">$10K + $14K interest</p>
            </div>
            <div className="border border-emerald-deep bg-emerald-deep/[0.03] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">Compound interest</p>
              <p className="font-display text-2xl font-bold text-emerald-deep">$38,700</p>
              <p className="text-xs text-emerald-deep/50 mt-2">$10K + $28.7K interest</p>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/50 mt-4">
            No monthly contributions — principal only. The gap doubles at 30 years and triples at 40.
          </p>
        </section>

        {/* Rate guide */}
        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-6">
            What annual return rate should I enter?
          </h2>
          <div className="divide-y divide-emerald-deep/10 border-t border-emerald-deep/10">
            {RATES.map(({ label, rate, note }) => (
              <div key={label} className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-deep">{label}</p>
                  <p className="text-xs text-emerald-deep/50 mt-0.5">{note}</p>
                </div>
                <p className="font-display font-bold text-emerald-deep text-lg ml-6 shrink-0">{rate}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-emerald-deep/40 mt-4">
            Past returns do not guarantee future results. Higher rates come with higher volatility and risk.
          </p>
        </section>

        {/* Rule of 72 */}
        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-4">
            The Rule of 72
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            A useful mental shortcut: divide 72 by your annual interest rate to estimate how many years it takes to double your money.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[['3%', '24 yrs'], ['6%', '12 yrs'], ['8%', '9 yrs'], ['12%', '6 yrs']].map(([rate, years]) => (
              <div key={rate} className="text-center p-5 border border-emerald-deep/10">
                <p className="font-display text-xl font-bold text-gold">{rate}</p>
                <p className="text-xs text-emerald-deep/60 mt-1.5">{years} to double</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}

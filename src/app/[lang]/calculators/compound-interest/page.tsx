import type { Metadata } from 'next';
import CompoundInterestCalculator from './CompoundInterestCalculator';
import { RelatedContent } from '@/components/RelatedContent';

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
  { label: 'Dutch high-yield savings account', rate: '2 to 3%', note: '2025 rates, easy to access, low risk' },
  { label: 'Government bonds (NL / EU)', rate: '3 to 4%', note: 'Low risk, fixed income, predictable' },
  { label: 'Balanced fund (60/40 stocks and bonds)', rate: '5 to 6%', note: 'Moderate risk, suitable for 5+ year horizons' },
  { label: 'Global equity index fund', rate: '7 to 8%', note: 'Higher volatility, historical average before inflation' },
];

export default async function CompoundInterestPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <>
      <CompoundInterestCalculator />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            What is compound interest?
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            Compound interest is interest earned on both your original deposit and the interest you have already collected. Simple interest only grows on the starting amount. Compound interest grows on the whole balance, so each period adds a little more than the last.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            The result is a curve, not a straight line. Growth feels slow in the early years and then accelerates sharply. That is not magic. It is just the math catching up with itself.
          </p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            Worked example
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">
            $10,000 starting amount, $500 per month, 7% annual rate, 20 years
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">You put in</p>
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
            More than half came from interest, not from your deposits. You contributed $130,000 over 20 years. The other $171,000 showed up on its own because the interest had time to compound.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-6">
            How to use this calculator
          </h2>
          <ol className="space-y-5">
            {[
              ['Starting amount', "What you have today. Zero is fine. Monthly contributions alone grow significantly when given enough time."],
              ['Monthly contribution', "How much you add each month. Consistency here matters more than the size of your initial deposit."],
              ['Annual interest rate', "The expected return per year. Use your savings account rate for safe goals. For long-term investing, see the rate guide below."],
              ['Time period', "Years to let the money grow. Even a few extra years at the end make a surprisingly large difference."],
              ['Compound frequency', "How often interest is added to your balance. Monthly is standard for most savings accounts and funds."],
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
            Compound vs simple interest, side by side
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            Same numbers, different math. $10,000 at 7% for 20 years, principal only (no monthly contributions):
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-emerald-deep/10 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">Simple interest</p>
              <p className="font-display text-2xl font-bold text-emerald-deep">$24,000</p>
              <p className="text-xs text-emerald-deep/50 mt-2">$10K + $14K interest (7% x 20 years x $10K)</p>
            </div>
            <div className="border border-emerald-deep bg-emerald-deep/[0.03] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">Compound interest</p>
              <p className="font-display text-2xl font-bold text-emerald-deep">$38,700</p>
              <p className="text-xs text-emerald-deep/50 mt-2">$10K growing at 7% compounded annually</p>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/50 mt-4">
            At 30 years the gap becomes $131,000 (simple) vs $76,000... wait, actually at 30 years: simple = $31K, compound = $76K. By 40 years: simple = $38K, compound = $149K. Time is doing the work.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-6">
            What rate should you enter?
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            Use a realistic number for your situation. Here are common benchmarks:
          </p>
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
            Past returns are not a guarantee of future results. Higher expected returns always come with more risk and more volatility along the way.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-4">
            The Rule of 72
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            A useful shortcut: divide 72 by your annual return to estimate how many years it takes to double your money.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[['3%', '24 yrs'], ['6%', '12 yrs'], ['8%', '9 yrs'], ['12%', '6 yrs']].map(([rate, years]) => (
              <div key={rate} className="text-center p-5 border border-emerald-deep/10">
                <p className="font-display text-xl font-bold text-gold">{rate}</p>
                <p className="text-xs text-emerald-deep/60 mt-1.5">{years} to double</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-emerald-deep/50 mt-5">
            This is why starting at 25 instead of 35 can mean retiring with twice as much money, even with identical contributions.
          </p>
        </section>

      </div>
      <RelatedContent lang={lang} slug="calculator:compound-interest" />
    </>
  );
}

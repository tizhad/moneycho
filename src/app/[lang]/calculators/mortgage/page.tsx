import type { Metadata } from 'next';
import MortgageCalculator from './MortgageCalculator';

const SLUG = 'mortgage';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Mortgage Calculator',
    description:
      'Calculate your monthly mortgage payment, total interest cost, and full amortization schedule. Free and instant.',
  },
  nl: {
    title: 'Hypotheek Calculator',
    description:
      'Bereken je maandelijkse hypotheekbetaling, totale rentekosten en het volledige aflossingsschema. Gratis en direct.',
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

const TERM_COMPARISON = [
  { term: '15 years', monthly: '2,219', totalInterest: '99,420', note: 'Higher monthly cost, much less total interest' },
  { term: '20 years', monthly: '1,818', totalInterest: '136,320', note: 'Common choice in the Netherlands' },
  { term: '25 years', monthly: '1,582', totalInterest: '174,600', note: 'Lower monthly payment, more interest over time' },
  { term: '30 years', monthly: '1,432', totalInterest: '215,520', note: 'Lowest payment, highest total cost' },
];

export default function MortgagePage() {
  return (
    <>
      <MortgageCalculator />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            How your mortgage payment is calculated
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            Your monthly payment is determined by three things: the loan amount, the interest rate, and the term. Change any one of them and the payment shifts. The calculation uses the annuity formula, which ensures that each payment covers the interest for that month plus a portion of the principal.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            In the early years, most of your payment goes to interest. As the balance drops, more goes to principal. This is why making extra payments early in the loan saves a disproportionate amount of interest.
          </p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            Worked example
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">
            300,000 euro loan at 4% annual interest rate
          </p>
          <div className="divide-y divide-emerald-deep/10">
            {TERM_COMPARISON.map(({ term, monthly, totalInterest, note }) => (
              <div key={term} className="py-4 grid grid-cols-[80px_1fr_1fr] gap-4 items-center">
                <p className="font-display font-bold text-emerald-deep">{term}</p>
                <div>
                  <p className="text-sm font-semibold text-emerald-deep">{monthly} euros/month</p>
                  <p className="text-xs text-emerald-deep/50">{note}</p>
                </div>
                <p className="text-sm text-right text-emerald-deep/60">{totalInterest} euros total interest</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-emerald-deep/60 mt-6 border-t border-emerald-deep/10 pt-5">
            Choosing a 15-year term over 30 years saves roughly 116,000 euros in interest on this loan. The monthly payment is 787 euros higher, but the total cost is dramatically lower.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Shorter term vs longer term: what actually matters
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            A shorter term means a higher monthly payment but far less interest paid over the life of the loan. A longer term means breathing room each month but you pay for that comfort in interest.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            The right answer depends on your cash flow. If you can comfortably afford the higher payment on a shorter term, it almost always makes financial sense to choose it. If you need the lower payment to keep your budget healthy, the longer term is the safer choice.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            A middle path: take the longer term for the lower payment, but make extra principal payments when your finances allow. Check with your lender first because some mortgages limit early repayment.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            What counts as a good mortgage rate in 2025?
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            In the Netherlands, fixed rates for a 10-year term currently sit between roughly 3.5% and 5%, depending on your lender, loan-to-value ratio, and whether you qualify for NHG (Nationale Hypotheek Garantie).
          </p>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            NHG is worth getting if your loan falls below the threshold (430,000 euros in 2025). It reduces your interest rate by roughly 0.5 to 0.7 percentage points and protects you if you are forced to sell at a loss.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            Always compare at least three lenders. A 0.5% difference in rate on a 300,000 euro loan over 25 years is about 23,000 euros in extra interest. A mortgage advisor (hypotheekadviseur) can often find better rates than going directly to a bank, and the fee is usually worth it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Key terms this calculator uses
          </h2>
          <div className="space-y-4">
            {[
              ['Loan amount', 'The total you borrow. In the Netherlands you can typically borrow up to 100% of the property value (loan-to-value ratio of 1.0). Most advisors recommend keeping it lower if you can.'],
              ['Annual interest rate', 'The rate your lender charges each year on the outstanding balance. This is fixed for the duration of your fixed-rate period, then renegotiated.'],
              ['Loan term', 'How many years to repay the loan. Most Dutch mortgages run 20 to 30 years. The tax deductibility of mortgage interest (hypotheekrenteaftrek) applies for up to 30 years.'],
              ['Monthly payment', 'Principal plus interest. Does not include home insurance, property tax (OZB), or maintenance. Budget separately for those.'],
            ].map(([term, def]) => (
              <div key={term} className="border-b border-emerald-deep/10 pb-4">
                <p className="text-sm font-bold text-emerald-deep mb-1">{term}</p>
                <p className="text-sm text-emerald-deep/65 leading-relaxed">{def}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}

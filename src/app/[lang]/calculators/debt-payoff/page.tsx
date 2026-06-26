import type { Metadata } from 'next';
import DebtPayoffCalculator from './DebtPayoffCalculator';

const SLUG = 'debt-payoff';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Debt Payoff Calculator',
    description:
      'Compare the avalanche and snowball methods to find the fastest, cheapest way to pay off your debts. Free calculator with month-by-month breakdown.',
  },
  nl: {
    title: 'Schulden Aflossen Calculator',
    description:
      'Vergelijk de lawine- en sneeuwbalmethode om de snelste en goedkoopste manier te vinden om je schulden af te lossen. Gratis calculator.',
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

export default function DebtPayoffPage() {
  return (
    <>
      <DebtPayoffCalculator />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Two ways to pay off debt: avalanche vs snowball
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            The avalanche method pays off the highest-interest debt first. The snowball method pays off the smallest balance first. Both work. The one you stick with is the right one for you.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            If you want to minimise total interest paid, use avalanche. If you need early wins to stay motivated, use snowball. The difference in total cost between the two methods is usually smaller than people expect.
          </p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            Worked example
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">
            Two debts, 200 euros extra available each month
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="border border-emerald-deep/15 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-3">Debt A</p>
              <p className="font-display text-2xl font-bold text-emerald-deep mb-1">8,000 euros</p>
              <p className="text-sm text-emerald-deep/60">Credit card at 22% APR</p>
            </div>
            <div className="border border-emerald-deep/15 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-3">Debt B</p>
              <p className="font-display text-2xl font-bold text-emerald-deep mb-1">2,000 euros</p>
              <p className="text-sm text-emerald-deep/60">Store card at 10% APR</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/60 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-3">Avalanche method</p>
              <p className="text-sm text-emerald-deep font-semibold mb-1">Target Debt A first (22% rate)</p>
              <p className="text-xs text-emerald-deep/60 leading-relaxed">Pay minimum on Debt B, throw everything at the credit card. Saves the most money because the 22% rate is costing you the most.</p>
            </div>
            <div className="bg-white/60 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-3">Snowball method</p>
              <p className="text-sm text-emerald-deep font-semibold mb-1">Target Debt B first (2,000 balance)</p>
              <p className="text-xs text-emerald-deep/60 leading-relaxed">Clear the smaller debt faster, get a win, then pile that freed-up payment onto the credit card. Costs a bit more but builds momentum.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            How the calculator works
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            Enter each debt with its balance, interest rate, and minimum monthly payment. Then add any extra amount you can put toward debt each month. The calculator shows you the payoff date and total interest for both methods side by side.
          </p>
          <ol className="space-y-4">
            {[
              ['Add all your debts', 'Include credit cards, personal loans, buy-now-pay-later balances, and any other revolving debt. Student loans and mortgages can be included too, though most people handle those separately.'],
              ['Enter the correct rates', 'Use the APR (annual percentage rate), not the monthly rate. Most credit card statements show the APR somewhere. If in doubt, check your card agreement.'],
              ['Set your extra payment', 'Even 50 euros per month makes a significant difference over 12 to 24 months. You can see exactly how much each extra euro saves by adjusting this number.'],
              ['Pick your method', 'Try both. If the total interest difference is small, pick the one that motivates you. If the difference is large, avalanche is worth the discipline.'],
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
            What to do after you pay off a debt
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            When a debt is paid off, do not absorb that monthly payment back into your spending. Move it to the next debt on your list. This is called a debt avalanche or snowball roll, and it is what makes these methods so effective over time.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            Once all debts are gone, take the full combined payment and redirect it to savings or investments. You have already proven you can live without that money. Put it to work.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            One thing worth knowing about Dutch debt
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            In the Netherlands, personal loan interest is not tax-deductible (unlike mortgage interest). Credit card interest rates typically run between 14% and 22% APR. Buying on krediet (installment credit) through retailers often charges 10% to 18%.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            If you have multiple high-interest debts, a persoonlijke lening (personal loan) through your bank at a lower fixed rate can consolidate them and reduce total interest. Ask your bank to compare the APR and total cost before signing anything.
          </p>
        </section>

      </div>
    </>
  );
}

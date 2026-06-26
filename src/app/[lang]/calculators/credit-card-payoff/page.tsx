import type { Metadata } from 'next';
import CreditCardPayoffCalculator from './CreditCardPayoffCalculator';

const SLUG = 'credit-card-payoff';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Credit Card Payoff Calculator',
    description:
      'See how long it really takes to pay off your credit card balance, and how much interest you will pay. Compare minimum payments vs fixed amounts.',
  },
  nl: {
    title: 'Creditcard Aflossen Calculator',
    description:
      'Zie hoe lang het echt duurt om je creditcardschuld af te lossen en hoeveel rente je betaalt. Vergelijk minimumbetalingen met vaste bedragen.',
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

export default function CreditCardPayoffPage() {
  return (
    <>
      <CreditCardPayoffCalculator />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            The minimum payment trap
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            Credit card companies set minimum payments low on purpose. A 3,000 euro balance at 20% APR with a minimum payment of roughly 60 euros per month takes over 14 years to pay off. You end up paying more than 2,400 euros in interest on top of the original 3,000 euros you borrowed.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            Pay a fixed 100 euros per month instead and you are done in about 42 months and pay around 1,200 euros in interest. That single change saves you over a decade and more than 1,200 euros.
          </p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            Worked example
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">
            3,000 euro balance at 20% APR
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Minimum only (~2% of balance)</p>
              <p className="font-display text-2xl font-bold text-emerald-deep">14+ years</p>
              <p className="text-xs text-emerald-deep/60 mt-2">2,400+ euros interest</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Fixed 100 euros/month</p>
              <p className="font-display text-2xl font-bold text-emerald-deep">3.5 years</p>
              <p className="text-xs text-emerald-deep/60 mt-2">~1,200 euros interest</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Fixed 200 euros/month</p>
              <p className="font-display text-2xl font-bold text-emerald-deep">18 months</p>
              <p className="text-xs text-emerald-deep/60 mt-2">~500 euros interest</p>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/60 mt-8 border-t border-emerald-deep/10 pt-5">
            Each extra euro you pay each month has an outsized impact on total interest because high-rate debt compounds quickly. The 200 euros/month scenario saves nearly 2,000 euros compared to minimum payments.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Four steps to clear the balance
          </h2>
          <ol className="space-y-5">
            {[
              ['Stop adding to it', "Do not use the card while you are paying it down. Put it in a drawer if you have to. Charging new purchases while paying it off is like bailing a boat without plugging the leak."],
              ['Pay more than the minimum every month', "Decide on a fixed amount that hurts a little but is sustainable. Set up an automatic payment so you do not have to think about it. Even 20 euros above the minimum makes a real difference over time."],
              ['Consider a balance transfer', "Some banks offer 0% or low interest on transferred balances for 12 to 18 months. If you can pay off the balance in that window, this is worth exploring. Watch out for the transfer fee (usually 1 to 3%) and what rate kicks in after the promotional period."],
              ['Pay in full once it is cleared', "Once you are out of debt, change your habit. Credit cards are not a problem if the balance goes to zero each month. The interest charge disappears entirely if you pay in full by the due date."],
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
            Credit cards in the Netherlands
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            Credit card use in the Netherlands is much lower than in the UK or US, but it is growing. Dutch credit cards typically charge between 14% and 22% APR. Some cards from premium providers go lower, around 10 to 13%, but these often have annual fees.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            Achteraf betalen services (BNPL products like Klarna or Riverty) are common in Dutch online shopping. These are often marketed as interest-free but charge late fees and can switch to interest-bearing installments. Treat them the same as credit card debt when calculating your total outstanding balances.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            If you have a balance that you cannot clear quickly, a persoonlijke lening at 5 to 9% APR from your bank can replace the card balance and cut your interest cost significantly. Run the numbers before you sign.
          </p>
        </section>

      </div>
    </>
  );
}

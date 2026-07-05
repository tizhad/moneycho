import type { Metadata } from 'next';
import CreditCardPayoffCalculator from './CreditCardPayoffCalculator';
import { RelatedContent } from '@/components/RelatedContent';

const SLUG = 'credit-card-payoff';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Credit Card Payoff Calculator',
    description:
      'Free credit card payoff calculator — enter your balance, APR, and monthly payment to see your exact debt-free date and total interest instantly. See how much the minimum payment trap costs you.',
  },
  nl: {
    title: 'Creditcard Aflossen Calculator',
    description:
      'Gratis creditcard aflossen calculator — vul saldo, rente en maandbedrag in en zie direct wanneer je schuldenvrij bent en hoeveel rente je betaalt. Bereken ook wat alleen het minimum betalen je kost.',
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

const EDITORIAL = {
  en: {
    trapTitle: 'The minimum payment trap',
    trapP1:
      'Credit card companies set minimum payments low on purpose. A 3,000 euro balance at 20% APR with a minimum payment of roughly 60 euros per month takes over 14 years to pay off. You end up paying more than 2,400 euros in interest on top of the original 3,000 euros you borrowed.',
    trapP2:
      'Pay a fixed 100 euros per month instead and you are done in about 42 months and pay around 1,200 euros in interest. That single change saves you over a decade and more than 1,200 euros.',
    exampleTitle: 'Worked example',
    exampleSubtitle: '3,000 euro balance at 20% APR',
    col1Label: 'Minimum only (~2% of balance)',
    col1Value: '14+ years',
    col1Note: '2,400+ euros interest',
    col2Label: 'Fixed 100 euros/month',
    col2Value: '3.5 years',
    col2Note: '~1,200 euros interest',
    col3Label: 'Fixed 200 euros/month',
    col3Value: '18 months',
    col3Note: '~500 euros interest',
    exampleFooter:
      'Each extra euro you pay each month has an outsized impact on total interest because high-rate debt compounds quickly. The 200 euros/month scenario saves nearly 2,000 euros compared to minimum payments.',
    stepsTitle: 'Four steps to clear the balance',
    steps: [
      ['Stop adding to it', "Do not use the card while you are paying it down. Put it in a drawer if you have to. Charging new purchases while paying it off is like bailing a boat without plugging the leak."],
      ['Pay more than the minimum every month', "Decide on a fixed amount that hurts a little but is sustainable. Set up an automatic payment so you do not have to think about it. Even 20 euros above the minimum makes a real difference over time."],
      ['Consider a balance transfer', "Some banks offer 0% or low interest on transferred balances for 12 to 18 months. If you can pay off the balance in that window, this is worth exploring. Watch out for the transfer fee (usually 1 to 3%) and what rate kicks in after the promotional period."],
      ['Pay in full once it is cleared', "Once you are out of debt, change your habit. Credit cards are not a problem if the balance goes to zero each month. The interest charge disappears entirely if you pay in full by the due date."],
    ] as [string, string][],
    nlTitle: 'Credit cards in the Netherlands',
    nlP1:
      'Credit card use in the Netherlands is much lower than in the UK or US, but it is growing. Dutch credit cards typically charge between 14% and 22% APR. Some cards from premium providers go lower, around 10 to 13%, but these often have annual fees.',
    nlP2:
      'Achteraf betalen services (BNPL products like Klarna or Riverty) are common in Dutch online shopping. These are often marketed as interest-free but charge late fees and can switch to interest-bearing installments. Treat them the same as credit card debt when calculating your total outstanding balances.',
    nlP3:
      'If you have a balance that you cannot clear quickly, a persoonlijke lening at 5 to 9% APR from your bank can replace the card balance and cut your interest cost significantly. Run the numbers before you sign.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      [
        'How long does it take to pay off a credit card?',
        'It depends on your balance, your APR, and what you pay each month. A 3,000 euro balance at 20% APR takes over 14 years paying only the 2% minimum — but just 42 months at a fixed 100 euros per month. Use the calculator above to see your exact payoff date.',
      ],
      [
        'Should I pay more than the minimum on my credit card?',
        'Yes, always. The minimum payment is designed to maximize the interest you pay, not to help you get out of debt. Even an extra 20 to 50 euros per month dramatically cuts your payoff time and total interest. Set a fixed payment you can sustain and automate it.',
      ],
      [
        'What is the minimum payment trap?',
        "Credit card minimum payments (typically 2% of the balance) barely cover the monthly interest. Most of your payment goes to interest rather than reducing the principal, so your balance barely moves. You end up paying interest on roughly the same amount month after month for years — often more in interest than the original debt.",
      ],
      [
        'Is it better to pay off credit card debt or save?',
        'If your credit card APR (typically 14–22%) is higher than your savings rate — which it almost always is — pay off the card first. Paying down 20% APR debt is equivalent to earning a guaranteed 20% return. Build a small emergency buffer first (one to two months of expenses), then attack the card balance aggressively.',
      ],
      [
        'Can I consolidate my credit card debt into a personal loan?',
        'Yes, and it is often worth it. Dutch personal loans (persoonlijke lening) typically charge 5 to 9% APR — far less than the 14 to 22% on most credit cards. Transferring the balance to a lower-rate loan and committing to a fixed repayment plan can save hundreds of euros in interest. Compare the total cost including any closing fees before switching.',
      ],
    ] as [string, string][],
  },
  nl: {
    trapTitle: 'De minimumbetaling val',
    trapP1:
      'Creditcardmaatschappijen stellen minimumbetalingen bewust laag in. Een saldo van € 3.000 bij 20% rente per jaar met een minimumbedrag van circa € 60 per maand duurt meer dan 14 jaar om af te lossen. Je betaalt dan meer dan € 2.400 aan rente bovenop het originele bedrag van € 3.000.',
    trapP2:
      'Betaal in plaats daarvan een vast bedrag van € 100 per maand en je bent klaar in ongeveer 42 maanden en betaalt circa € 1.200 aan rente. Die ene wijziging scheelt je meer dan tien jaar en meer dan € 1.200.',
    exampleTitle: 'Rekenvoorbeeld',
    exampleSubtitle: 'Saldo van € 3.000 bij 20% rente per jaar',
    col1Label: 'Alleen minimum (~2% van saldo)',
    col1Value: '14+ jaar',
    col1Note: '€ 2.400+ rente',
    col2Label: 'Vast € 100/maand',
    col2Value: '3,5 jaar',
    col2Note: '~€ 1.200 rente',
    col3Label: 'Vast € 200/maand',
    col3Value: '18 maanden',
    col3Note: '~€ 500 rente',
    exampleFooter:
      'Elke extra euro die je per maand betaalt, heeft een groot effect op de totale rente, omdat schuld met hoge rente snel oploopt. Het scenario van € 200/maand bespaart je bijna € 2.000 ten opzichte van alleen het minimum betalen.',
    stepsTitle: 'Vier stappen om je creditcard af te lossen',
    steps: [
      ['Stop met nieuwe aankopen', 'Gebruik de kaart niet meer terwijl je aan het aflossen bent. Stop hem in een la als dat moet. Nieuwe aankopen doen terwijl je aflost is als een boot leeg scheppen zonder het lek te dichten.'],
      ['Betaal elke maand meer dan het minimum', 'Kies een vast bedrag dat net iets pijn doet, maar vol te houden is. Stel een automatische incasso in zodat je er niet aan hoeft te denken. Zelfs € 20 extra per maand maakt op de lange termijn een groot verschil.'],
      ['Overweeg saldo overzetten naar persoonlijke lening', 'Sommige banken bieden 0% of lage rente op overgeheveld saldo voor 12 tot 18 maanden. Als je het saldo binnen die periode kunt aflossen, is dit zeker de moeite waard. Let op de overboekingskosten (meestal 1 tot 3%) en het tarief dat na de actieperiode geldt.'],
      ['Betaal voortaan altijd volledig af', 'Zodra je schuldenvrij bent, verander je gewoontes. Creditcards zijn geen probleem als het saldo elke maand naar nul gaat. Als je voor de vervaldatum volledig betaalt, betaal je helemaal geen rente.'],
    ] as [string, string][],
    nlTitle: 'Creditcard aflossen in Nederland',
    nlP1:
      'Creditcardgebruik in Nederland is veel lager dan in het VK of de VS, maar groeit wel. Nederlandse creditcards rekenen doorgaans 14% tot 22% rente per jaar (APR). Kaarten van premiumaanbieders kunnen lager uitkomen, rond de 10 tot 13%, maar hebben vaak een jaarlijkse vergoeding.',
    nlP2:
      'Achteraf betalen diensten (BNPL zoals Klarna of Riverty) zijn populair in de Nederlandse online winkels. Deze worden vaak als rentevrij gepresenteerd, maar rekenen te late betalingstarieven en kunnen overgaan op rentedragende termijnen. Behandel ze als creditcardschuld als je je totale uitstaande saldo berekent.',
    nlP3:
      'Als je een saldo hebt dat je niet snel kunt afbetalen, kan een persoonlijke lening van je bank met 5 tot 9% rente per jaar de creditcardschuld vervangen en je rentekosten aanzienlijk verlagen. Reken dit goed door voordat je tekent.',
    faqTitle: 'Veelgestelde vragen over creditcard aflossen',
    faqs: [
      [
        'Hoe lang duurt het om mijn creditcard af te lossen?',
        'Dat hangt af van je saldo, je rentetarief en wat je elke maand betaalt. Met de calculator hierboven zie je het direct. Als vuistregel: bij een saldo van € 2.000 en een APR van 20%, duurt het met een vast bedrag van € 100 per maand ongeveer 24 maanden. Betaal je alleen het minimum, dan kan het meer dan 10 jaar duren.',
      ],
      [
        'Hoeveel moet ik per maand betalen om mijn creditcard af te lossen?',
        'Minimaal genoeg om de maandelijkse rente te dekken én de hoofdsom te verlagen. De minimumbetaling van je kaartmaatschappij dekt dit nauwelijks. Een vuistregel: betaal minstens 1% van je saldo plus de opgebouwde rente. Beter is een vast bedrag dat je comfortabel kunt missen, zodat je een duidelijke einddatum hebt.',
      ],
      [
        'Is het slim om mijn creditcardschuld over te zetten naar een persoonlijke lening?',
        'Vaak wel, als de rente van de persoonlijke lening lager is dan je creditcardtarief. Nederlandse creditcards rekenen 14–22% APR; persoonlijke leningen liggen vaak op 5–9%. Het verschil kan honderden euro\'s per jaar schelen. Vergelijk wel de looptijd en eventuele afsluitkosten voordat je de overstap maakt.',
      ],
      [
        'Wat gebeurt er als ik alleen het minimum betaal?',
        'Je betaalt wel, maar lost bijna niets af. Het grootste deel van je minimumbedrag gaat naar rente, niet naar de hoofdsom. Je saldo daalt dus nauwelijks, en je betaalt maand na maand rente over vrijwel hetzelfde bedrag. Op een saldo van € 3.000 bij 20% APR kan dit resulteren in meer dan € 2.400 aan totale rente over de looptijd.',
      ],
    ] as [string, string][],
  },
};

export default async function CreditCardPayoffPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = lang === 'nl' ? 'nl' : 'en';
  const c = EDITORIAL[l];

  return (
    <>
      <CreditCardPayoffCalculator lang={lang} />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            {c.trapTitle}
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.trapP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.trapP2}</p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            {c.exampleTitle}
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">{c.exampleSubtitle}</p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">{c.col1Label}</p>
              <p className="font-display text-2xl font-bold text-emerald-deep">{c.col1Value}</p>
              <p className="text-xs text-emerald-deep/60 mt-2">{c.col1Note}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">{c.col2Label}</p>
              <p className="font-display text-2xl font-bold text-emerald-deep">{c.col2Value}</p>
              <p className="text-xs text-emerald-deep/60 mt-2">{c.col2Note}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{c.col3Label}</p>
              <p className="font-display text-2xl font-bold text-emerald-deep">{c.col3Value}</p>
              <p className="text-xs text-emerald-deep/60 mt-2">{c.col3Note}</p>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/60 mt-8 border-t border-emerald-deep/10 pt-5">
            {c.exampleFooter}
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            {c.stepsTitle}
          </h2>
          <ol className="space-y-5">
            {c.steps.map(([label, desc], i) => (
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
            {c.nlTitle}
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.nlP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.nlP2}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.nlP3}</p>
        </section>

        {c.faqs.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-emerald-deep mb-8">
              {c.faqTitle}
            </h2>
            <div className="space-y-2">
              {c.faqs.map(([q, a], i) => (
                <details key={i} className="group border border-emerald-deep/10 bg-paper">
                  <summary className="flex justify-between items-center gap-4 cursor-pointer px-6 py-5 font-semibold text-emerald-deep list-none hover:bg-emerald-deep/[0.03] transition-colors">
                    {q}
                    <span className="text-emerald-deep/30 shrink-0 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-6 pb-5 text-sm text-emerald-deep/70 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

      </div>
      <RelatedContent lang={lang} slug="calculator:credit-card-payoff" />
    </>
  );
}

import type { Metadata } from 'next';
import AnnuiteitCalculator from './AnnuiteitCalculator';
import { RelatedContent } from '@/components/RelatedContent';

const SLUG = 'annuiteit';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Annuity Calculator — Fixed Monthly Loan Payment',
    description:
      'Calculate the fixed monthly payment for any loan using the annuity formula. Enter loan amount, interest rate, and term. Includes full amortization schedule.',
  },
  nl: {
    title: 'Annuiteit Berekenen — Vaste Maandlast Calculator',
    description:
      'Bereken de vaste maandlast van een lening met de annuïteitsformule. Vul leenbedrag, rente en looptijd in. Inclusief volledig aflossingsschema.',
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
    whatTitle: 'What is an annuity payment?',
    whatP1: 'An annuity payment is a fixed amount paid at regular intervals — in this case, monthly — that covers both the interest due and a portion of the original loan. The word comes from the Latin "annus" (year), but the concept applies to any fixed periodic payment.',
    whatP2: 'The defining feature is that the payment never changes. In month one, most of it goes to interest because the balance is high. In month 240 of a 20-year loan, almost all of it goes to principal because the balance is nearly gone. The total payment stays the same throughout.',
    formulaTitle: 'The annuity formula',
    formulaIntro: 'The monthly payment M is calculated as:',
    formulaDesc: 'Where P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments (years × 12). If the interest rate is zero, M simply equals P ÷ n.',
    formulaNote: 'This calculator uses this exact formula. Enter your numbers above and the result is instant.',
    exampleTitle: 'Worked example',
    exampleSubtitle: '€250,000 loan · 4.5% annual rate · 20 years',
    col1Label: 'Monthly payment', col1Value: '€1,583', col1Note: 'fixed for 240 months',
    col2Label: 'Total paid', col2Value: '€379,800', col2Note: 'over 20 years',
    col3Label: 'Total interest', col3Value: '€129,800', col3Note: '52% of the principal',
    exampleNote: 'Choosing a 15-year term instead reduces total interest to about €85,000 — saving €44,800 — but raises the monthly payment to roughly €1,912.',
    vsTitle: 'Annuity vs linear repayment',
    vsP1: 'There are two main ways to repay a loan: annuity (annuïteit) and linear (lineair). Most Dutch mortgages and personal loans use the annuity method.',
    vsRows: [
      ['Monthly payment', 'Fixed throughout', 'Decreasing over time'],
      ['Early months', 'Mostly interest', 'Equal split of principal'],
      ['Total interest', 'Higher', 'Lower'],
      ['Predictability', 'Easy to budget', 'Harder to budget early on'],
      ['Common use', 'Mortgages, personal loans', 'Some Dutch mortgages'],
    ] as [string, string, string][],
    vsNote: 'Neither method is strictly better. Annuity gives you a predictable fixed payment. Linear costs less total interest but the payments start higher.',
    faqTitle: 'Frequently asked questions',
    faqs: [
      ['What is the annuity formula?', 'The annuity formula calculates a fixed periodic payment given a principal, interest rate, and number of periods. Monthly payment = P × [r(1+r)^n] / [(1+r)^n − 1], where P is principal, r is the monthly rate (annual rate ÷ 12), and n is total months. When r = 0, the payment is simply P ÷ n.'],
      ['What is the difference between annuity and linear repayment?', 'With an annuity, the monthly payment is the same every month — interest-heavy at the start, principal-heavy at the end. With linear repayment, you pay the same principal amount each month, so the total payment decreases over time as interest falls. Linear costs less total interest but starts with higher payments.'],
      ['Does my Dutch mortgage use annuity repayment?', 'Most Dutch mortgages taken after 2013 must use annuity or linear repayment to qualify for hypotheekrenteaftrek (mortgage interest tax deduction). The annuity method is more common because the fixed payment is easier to budget. Check your mortgage deed (hypotheekakte) if you are not sure.'],
      ['Can I use this calculator for a personal loan?', 'Yes. The annuity formula is the same regardless of whether the loan is a mortgage, personal loan (persoonlijke lening), car loan, or any other fixed-term loan. Just enter the loan amount, annual interest rate, and term.'],
      ['What happens if I make extra repayments?', 'Extra payments reduce the outstanding principal faster, which reduces the interest component of future payments. On an annuity loan, this means you pay off the loan sooner than the original term. Many Dutch lenders allow boetevrije extra aflossingen (penalty-free extra repayments) of up to 10–20% of the original loan per year — check your loan terms.'],
    ] as [string, string][],
  },
  nl: {
    whatTitle: 'Wat is een annuïteit?',
    whatP1: 'Een annuïteit is een vast bedrag dat je elke maand betaalt om een lening af te lossen. Het bestaat altijd uit twee delen: de rente over het nog uitstaande saldo, en een deel aflossing van de hoofdsom. Samen vormen ze een vast maandbedrag dat gedurende de hele looptijd gelijk blijft.',
    whatP2: 'In de eerste maanden gaat het grootste deel van je betaling naar rente, omdat de schuld nog hoog is. Naarmate je meer aflost, neemt de rente af en stijgt het aflossingsgedeelte — maar je totale maandlast blijft gelijk. Dit maakt de annuïteit voorspelbaar en makkelijk te budgetteren.',
    formulaTitle: 'De annuïteitsformule',
    formulaIntro: 'De maandelijkse betaling M wordt als volgt berekend:',
    formulaDesc: 'Waarbij P de hoofdsom is, r de maandelijkse rente (jaarrente ÷ 12) en n het totale aantal betalingen (jaren × 12). Als de rente nul is, is M simpelweg P ÷ n.',
    formulaNote: 'De calculator hierboven gebruikt precies deze formule. Vul je gegevens in en het resultaat verschijnt direct.',
    exampleTitle: 'Rekenvoorbeeld',
    exampleSubtitle: '€ 250.000 lening · 4,5% rente · 20 jaar looptijd',
    col1Label: 'Maandlast', col1Value: '€ 1.583', col1Note: 'vast voor 240 maanden',
    col2Label: 'Totaal betaald', col2Value: '€ 379.800', col2Note: 'over 20 jaar',
    col3Label: 'Totale rente', col3Value: '€ 129.800', col3Note: '52% van de hoofdsom',
    exampleNote: 'Een looptijd van 15 jaar in plaats van 20 jaar verlaagt de totale rente naar circa € 85.000 — een besparing van € 44.800 — maar verhoogt de maandlast naar ongeveer € 1.912.',
    vsTitle: 'Annuïteit vs lineair aflossen',
    vsP1: 'Er zijn twee gangbare manieren om een lening af te lossen: annuïtair en lineair. De meeste Nederlandse hypotheken en persoonlijke leningen gebruiken de annuïteitsmethode.',
    vsRows: [
      ['Maandlast', 'Vast gedurende hele looptijd', 'Daalt naarmate rente afneemt'],
      ['Eerste maanden', 'Grotendeels rente', 'Gelijke aflossing, minder rente'],
      ['Totale rente', 'Hoger', 'Lager'],
      ['Voorspelbaarheid', 'Makkelijk te budgetteren', 'Hogere startlasten'],
      ['Gebruik', 'Hypotheken, persoonlijke leningen', 'Sommige Nederlandse hypotheken'],
    ] as [string, string, string][],
    vsNote: 'Geen van beide methoden is per definitie beter. Annuïteit geeft een vaste, voorspelbare betaling. Lineair kost minder totale rente maar begint met hogere maandlasten.',
    faqTitle: 'Veelgestelde vragen over annuïteiten',
    faqs: [
      ['Wat is de annuïteitsformule?', 'De annuïteitsformule berekent een vaste periodieke betaling op basis van een hoofdsom, rente en looptijd. Maandlast = P × [r(1+r)^n] / [(1+r)^n − 1], waarbij P de hoofdsom is, r de maandrente (jaarrente ÷ 12) en n het totale aantal maanden. Als de rente nul is, is de betaling simpelweg P ÷ n.'],
      ['Wat is het verschil tussen annuïtair en lineair aflossen?', 'Bij een annuïteitslening is de maandlast altijd gelijk — in het begin bestaat die grotendeels uit rente, aan het einde bijna volledig uit aflossing. Bij lineair aflossen betaal je elke maand hetzelfde bedrag aan hoofdsom, waardoor de totale betaling daalt naarmate de rente afneemt. Lineair kost minder totale rente, maar de maandlasten beginnen hoger.'],
      ['Gebruik ik een annuïteitshypotheek?', 'De meeste Nederlandse hypotheken afgesloten na 2013 zijn verplicht annuïtair of lineair om in aanmerking te komen voor hypotheekrenteaftrek. Annuïtair is het meest gekozen vanwege de vaste maandlast. Kijk in je hypotheekakte of neem contact op met je geldverstrekker als je het niet zeker weet.'],
      ['Kan ik deze calculator ook gebruiken voor een persoonlijke lening?', 'Ja. De annuïteitsformule is hetzelfde voor een hypotheek, persoonlijke lening, autolening of andere lening met vaste looptijd. Vul gewoon het leenbedrag, de jaarrente en de looptijd in.'],
      ['Wat gebeurt er als ik extra aflost?', 'Extra aflossingen verlagen de resterende hoofdsom sneller, waardoor het rentedeel van toekomstige betalingen afneemt. Op een annuïteitslening betekent dit dat je de lening eerder aflost dan de oorspronkelijke looptijd. Veel Nederlandse geldverstrekkers staan boetevrije extra aflossingen toe van 10–20% van de oorspronkelijke lening per jaar. Check altijd je leningsvoorwaarden.'],
    ] as [string, string][],
  },
};

export default async function AnnuiteitPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = lang === 'nl' ? 'nl' : 'en';
  const c = EDITORIAL[l];

  return (
    <>
      <AnnuiteitCalculator lang={lang} />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{c.whatTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.whatP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.whatP2}</p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-3">{c.formulaTitle}</h2>
          <p className="text-sm text-emerald-deep/60 mb-4">{c.formulaIntro}</p>
          <div className="bg-paper border border-emerald-deep/15 px-6 py-4 mb-4 font-display text-emerald-deep font-bold text-base tracking-tight">
            M = P × [r(1+r)^n] / [(1+r)^n − 1]
          </div>
          <p className="text-sm text-emerald-deep/60 mb-3">{c.formulaDesc}</p>
          <p className="text-xs text-emerald-deep/40">{c.formulaNote}</p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">{c.exampleTitle}</h2>
          <p className="text-sm text-emerald-deep/50 mb-8">{c.exampleSubtitle}</p>
          <div className="grid sm:grid-cols-3 gap-6 mb-6">
            {[
              { label: c.col1Label, value: c.col1Value, note: c.col1Note, gold: true },
              { label: c.col2Label, value: c.col2Value, note: c.col2Note, gold: false },
              { label: c.col3Label, value: c.col3Value, note: c.col3Note, gold: false },
            ].map(({ label, value, note, gold }) => (
              <div key={label}>
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${gold ? 'text-gold' : 'text-emerald-deep/40'}`}>{label}</p>
                <p className="font-display text-3xl font-bold text-emerald-deep">{value}</p>
                <p className="text-xs text-emerald-deep/50 mt-1">{note}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-emerald-deep/60 border-t border-emerald-deep/10 pt-5">{c.exampleNote}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{c.vsTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">{c.vsP1}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-emerald-deep/15">
                  <th className="text-left py-3 pr-4 text-xs font-bold uppercase tracking-widest text-emerald-deep/40"></th>
                  <th className="text-left py-3 pr-4 text-xs font-bold uppercase tracking-widest text-emerald-deep">
                    {l === 'nl' ? 'Annuïteit' : 'Annuity'}
                  </th>
                  <th className="text-left py-3 text-xs font-bold uppercase tracking-widest text-emerald-deep/60">
                    {l === 'nl' ? 'Lineair' : 'Linear'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-deep/8">
                {c.vsRows.map(([label, annuity, linear]) => (
                  <tr key={label}>
                    <td className="py-3 pr-4 text-emerald-deep/50 text-xs font-semibold uppercase tracking-wide">{label}</td>
                    <td className="py-3 pr-4 text-emerald-deep">{annuity}</td>
                    <td className="py-3 text-emerald-deep/60">{linear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-emerald-deep/50 mt-5 border-t border-emerald-deep/10 pt-5">{c.vsNote}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-8">{c.faqTitle}</h2>
          <div className="space-y-6">
            {c.faqs.map(([q, a]) => (
              <div key={q} className="border-b border-emerald-deep/10 pb-6 last:border-0 last:pb-0">
                <h3 className="font-semibold text-emerald-deep mb-2">{q}</h3>
                <p className="text-sm text-emerald-deep/70 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      <RelatedContent lang={lang} slug="calculator:annuiteit" />
    </>
  );
}

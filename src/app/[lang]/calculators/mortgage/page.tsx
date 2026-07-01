import type { Metadata } from 'next';
import MortgageCalculator from './MortgageCalculator';
import { RelatedContent } from '@/components/RelatedContent';

const SLUG = 'mortgage';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Dutch Mortgage Calculator',
    description:
      'Calculate your Dutch mortgage payments with Netherlands-specific rates, NHG guarantee, LTI norms, and hypotheekrenteaftrek. Free mortgage calculator for the Netherlands.',
  },
  nl: {
    title: 'Hypotheek Berekenen Calculator',
    description:
      'Bereken je maandelijkse hypotheeklasten, totale rentekosten en aflossingsschema. Met Nederlandse normen, NHG en hypotheekrenteaftrek. Gratis en direct.',
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
    calcSection: 'How your mortgage payment is calculated',
    calcP1: 'Your monthly payment is determined by three things: the loan amount, the interest rate, and the term. Change any one and the payment shifts. The calculation uses the annuity formula, which ensures each payment covers that month\'s interest plus a portion of the principal.',
    calcP2: 'In the early years, most of your payment goes to interest. As the balance drops, more goes to principal. This is why making extra payments early saves a disproportionate amount of interest.',
    exampleTitle: 'Worked example',
    exampleSubtitle: '€300,000 loan at 4% annual interest rate',
    terms: [
      { term: '15 years', monthly: '€2,219', interest: '€99,420', note: 'Higher monthly cost, much less total interest' },
      { term: '20 years', monthly: '€1,818', interest: '€136,320', note: 'Common choice in the Netherlands' },
      { term: '25 years', monthly: '€1,582', interest: '€174,600', note: 'Lower monthly payment, more interest over time' },
      { term: '30 years', monthly: '€1,432', interest: '€215,520', note: 'Lowest payment, highest total cost' },
    ],
    exampleNote: 'Choosing a 15-year term over 30 years saves roughly €116,000 in interest. The monthly payment is €787 higher, but the total cost is dramatically lower.',
    termTitle: 'Shorter term vs longer term: what actually matters',
    termP1: 'A shorter term means a higher monthly payment but far less interest over the life of the loan. A longer term means breathing room each month, but you pay for that comfort in interest.',
    termP2: 'The right answer depends on your cash flow. If you can comfortably afford the higher payment, it almost always makes financial sense to choose the shorter term.',
    termP3: 'A middle path: take the longer term for the lower payment, but make extra principal payments when your finances allow. Check with your lender first — some Dutch mortgages limit early repayment.',
    nlRatesTitle: 'Dutch mortgage rates in 2026',
    nlRatesP1: 'Fixed rates in the Netherlands for a 10-year term currently sit between roughly 3.5% and 5%, depending on your lender, loan-to-value ratio, and whether you qualify for NHG (Nationale Hypotheek Garantie).',
    nlRatesP2: 'NHG is worth getting if your loan falls below the threshold (€435,000 in 2026). It reduces your interest rate by roughly 0.5 to 0.7 percentage points and protects you if you are forced to sell at a loss.',
    nlRatesP3: 'Always compare at least three lenders. A 0.5% difference in rate on a €300,000 loan over 25 years is about €23,000 in extra interest. A hypotheekadviseur can often find better rates than going directly to a bank — the fee is usually worth it.',
    glossaryTitle: 'Key terms this calculator uses',
    glossary: [
      ['Loan amount', 'The total you borrow. In the Netherlands you can typically borrow up to 100% of the property value. Most advisors recommend keeping it lower if you can.'],
      ['Annual interest rate', 'The rate your lender charges per year on the outstanding balance. Fixed for your fixed-rate period, then renegotiated.'],
      ['Loan term', 'How many years to repay. Most Dutch mortgages run 20–30 years. Hypotheekrenteaftrek (tax deductibility of interest) applies for up to 30 years.'],
      ['Monthly payment', 'Principal plus interest. Does not include home insurance, OZB, or maintenance. Budget separately for those.'],
    ] as [string, string][],
    faqTitle: 'Frequently asked questions',
    faqs: [
      ['How much can I borrow for a Dutch mortgage?', 'In the Netherlands your maximum mortgage is determined by your income (LTI — loan-to-income ratio) and the property value (LTV). As of 2026, you can generally borrow up to 4.5× your gross annual income. Two-income households can often borrow more. Use this calculator to see what the monthly payments look like at different amounts.'],
      ['What is NHG and do I qualify?', 'NHG (Nationale Hypotheek Garantie) is a government-backed guarantee on mortgages below €435,000 (2026 limit). It lowers your interest rate by 0.5–0.7% and protects you if you must sell at a loss. Most first-time buyers in the Netherlands qualify. Your lender or hypotheekadviseur can confirm eligibility.'],
      ['What is hypotheekrenteaftrek?', 'Hypotheekrenteaftrek is Dutch mortgage interest tax deductibility. You can deduct the interest you pay on your mortgage from your taxable income, which reduces your effective interest cost. It applies for up to 30 years and only to your primary residence. The deduction rate has been gradually reduced and currently sits around 37%.'],
      ['What is a typical Dutch mortgage interest rate?', 'In 2026, Dutch fixed rates for a 10-year term run roughly 3.5%–5% depending on your LTV and NHG status. A lower LTV (more equity) and NHG eligibility both push rates down. Variable rates exist but most Dutch buyers prefer fixed-rate periods of 10–20 years for certainty.'],
    ] as [string, string][],
  },
  nl: {
    calcSection: 'Zo worden je hypotheeklasten berekend',
    calcP1: 'Je maandlasten worden bepaald door drie dingen: het hypotheekbedrag, de rente en de looptijd. Verander er één en de betaling verandert mee. De berekening gebruikt de annuïteitsformule: elke maand betaal je de rente over het resterende saldo plus een deel van de hoofdsom.',
    calcP2: 'In de eerste jaren gaat het grootste deel van je betaling naar rente. Naarmate het saldo daalt, gaat meer naar de aflossing van de hoofdsom. Daarom bespaar je onevenredig veel rente als je vroeg extra aflost.',
    exampleTitle: 'Rekenvoorbeeld',
    exampleSubtitle: '€ 300.000 hypotheek bij 4% rente per jaar',
    terms: [
      { term: '15 jaar', monthly: '€ 2.219', interest: '€ 99.420', note: 'Hogere maandlasten, veel minder totale rente' },
      { term: '20 jaar', monthly: '€ 1.818', interest: '€ 136.320', note: 'Veelgekozen looptijd in Nederland' },
      { term: '25 jaar', monthly: '€ 1.582', interest: '€ 174.600', note: 'Lagere maandlasten, meer rente totaal' },
      { term: '30 jaar', monthly: '€ 1.432', interest: '€ 215.520', note: 'Laagste maandlasten, hoogste totale kosten' },
    ],
    exampleNote: 'Een looptijd van 15 jaar in plaats van 30 jaar scheelt circa € 116.000 aan rente. De maandlasten zijn € 787 hoger, maar de totale kosten zijn aanzienlijk lager.',
    termTitle: 'Kortere of langere looptijd: wat telt echt?',
    termP1: 'Een kortere looptijd betekent hogere maandlasten maar veel minder rente over de gehele looptijd. Een langere looptijd geeft ruimte in je maandbudget, maar je betaalt daarvoor in de vorm van extra rente.',
    termP2: 'Het juiste antwoord hangt af van je cashflow. Als je de hogere betaling comfortabel kunt dragen, is de kortere looptijd bijna altijd de financieel slimmere keuze.',
    termP3: 'Een middenweg: kies de langere looptijd voor de lagere betaling, maar doe extra aflossingen wanneer je financiën dat toelaten. Check eerst bij je geldverstrekker — sommige hypotheken beperken de hoogte van boetevrije extra aflossingen.',
    nlRatesTitle: 'Hypotheekrente in Nederland 2026',
    nlRatesP1: 'Vaste hypotheekrentes in Nederland voor een rentevaste periode van 10 jaar liggen momenteel ruwweg tussen de 3,5% en 5%, afhankelijk van je geldverstrekker, loan-to-value en of je in aanmerking komt voor NHG.',
    nlRatesP2: 'NHG (Nationale Hypotheek Garantie) is de moeite waard als je hypotheek onder de kostengrens van € 435.000 valt (2026). Het verlaagt je rente met circa 0,5 tot 0,7 procentpunt en beschermt je bij een gedwongen verkoop met restschuld.',
    nlRatesP3: 'Vergelijk altijd minstens drie geldverstrekkers. Een renteverschil van 0,5% op een hypotheek van € 300.000 over 25 jaar scheelt circa € 23.000 aan rente. Een hypotheekadviseur vindt vaak betere rentes dan direct naar de bank gaan — de advieskosten verdien je doorgaans ruimschoots terug.',
    glossaryTitle: 'Begrippen in deze calculator',
    glossary: [
      ['Woningwaarde', 'De koopprijs of getaxeerde waarde van de woning. In Nederland mag je in de meeste gevallen maximaal 100% van de woningwaarde lenen (loan-to-value van 1,0).'],
      ['Eigen inbreng', 'Het bedrag dat je zelf inbrengt. Bijkomende kosten (overdrachtsbelasting, notariskosten, makelaarskosten) moet je altijd zelf betalen — die zijn niet meefinancieerbaar.'],
      ['Jaarlijkse rente', 'Het rentepercentage dat je geldverstrekker per jaar berekent over het uitstaande saldo. Vast voor de gekozen rentevaste periode, daarna opnieuw onderhandeld.'],
      ['Looptijd', 'Het aantal jaar om de hypotheek volledig af te lossen. De meeste Nederlandse hypotheken hebben een looptijd van 20 tot 30 jaar. Hypotheekrenteaftrek geldt voor maximaal 30 jaar.'],
    ] as [string, string][],
    faqTitle: 'Veelgestelde vragen over hypotheek berekenen',
    faqs: [
      ['Hoeveel kan ik lenen voor een hypotheek?', 'Je maximale hypotheek in Nederland wordt bepaald door je inkomen (loan-to-income norm) en de woningwaarde (loan-to-value). In 2026 kun je doorgaans maximaal 4,5 keer je bruto jaarsalaris lenen. Bij twee inkomens kan dat meer zijn. Gebruik deze calculator om te zien hoe de maandlasten eruitzien bij verschillende bedragen.'],
      ['Wat is NHG en kom ik in aanmerking?', 'NHG (Nationale Hypotheek Garantie) is een overheidsgarantie op hypotheken tot € 435.000 (grens 2026). Het verlaagt je rente met 0,5–0,7% en beschermt je bij gedwongen verkoop met restschuld. De meeste starters in Nederland komen in aanmerking. Je hypotheekadviseur of geldverstrekker bevestigt de voorwaarden.'],
      ['Hoe werkt hypotheekrenteaftrek?', 'Met hypotheekrenteaftrek mag je de rente die je betaalt op je hypotheek aftrekken van je belastbaar inkomen, waardoor je effectieve rentekosten lager uitvallen. Dit geldt voor je eigen woning, maximaal 30 jaar, en alleen voor annuïteits- of lineaire hypotheken. Het aftrekpercentage is de afgelopen jaren verlaagd en staat momenteel op circa 37%.'],
      ['Wat is een normale hypotheekrente in Nederland?', 'In 2026 liggen vaste rentes voor een rentevaste periode van 10 jaar ruwweg op 3,5%–5%, afhankelijk van je loan-to-value en NHG. Een lagere LTV en NHG-garantie drukken de rente. Variabele rentes bestaan, maar de meeste Nederlandse kopers kiezen voor een rentevaste periode van 10 tot 20 jaar.'],
      ['Wat zijn bijkomende kosten bij het kopen van een huis?', 'Naast de koopprijs betaal je bij aankoop van een bestaand huis 2% overdrachtsbelasting (starters tot 35 jaar met woning ≤ € 510.000 betalen 0%), notariskosten (ca. € 1.000–2.000), taxatiekosten (ca. € 500–800) en eventueel makelaarskosten. Reken op 3%–6% kosten koper bovenop de koopprijs.'],
    ] as [string, string][],
  },
};

export default async function MortgagePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = lang === 'nl' ? 'nl' : 'en';
  const c = EDITORIAL[l];

  return (
    <>
      <MortgageCalculator lang={lang} />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{c.calcSection}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.calcP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.calcP2}</p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">{c.exampleTitle}</h2>
          <p className="text-sm text-emerald-deep/50 mb-8">{c.exampleSubtitle}</p>
          <div className="divide-y divide-emerald-deep/10">
            {c.terms.map(({ term, monthly, interest, note }) => (
              <div key={term} className="py-4 grid grid-cols-[80px_1fr_1fr] gap-4 items-center">
                <p className="font-display font-bold text-emerald-deep">{term}</p>
                <div>
                  <p className="text-sm font-semibold text-emerald-deep">{monthly}/mo</p>
                  <p className="text-xs text-emerald-deep/50">{note}</p>
                </div>
                <p className="text-sm text-right text-emerald-deep/60">{interest} rente</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-emerald-deep/60 mt-6 border-t border-emerald-deep/10 pt-5">{c.exampleNote}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{c.termTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.termP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.termP2}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.termP3}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{c.nlRatesTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.nlRatesP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.nlRatesP2}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.nlRatesP3}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{c.glossaryTitle}</h2>
          <div className="space-y-4">
            {c.glossary.map(([term, def]) => (
              <div key={term} className="border-b border-emerald-deep/10 pb-4">
                <p className="text-sm font-bold text-emerald-deep mb-1">{term}</p>
                <p className="text-sm text-emerald-deep/65 leading-relaxed">{def}</p>
              </div>
            ))}
          </div>
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
      <RelatedContent lang={lang} slug="calculator:mortgage" />
    </>
  );
}

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
    title: 'Hypotheek Berekenen & Maximale Hypotheek Calculator',
    description:
      'Bereken je maximale hypotheek en maandelijkse lasten. NIBUD-normen 2026, NHG, hypotheekrenteaftrek en inkomenstafel. Gratis en direct.',
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

// NIBUD-indicative max mortgage at ~4% fixed rate, single applicant, 2026
// Source: NIBUD woonquote tables. Updated annually; these are approximations.
const MAX_TABLE = [
  ['€ 30.000', '± €123.000', '4,1×'],
  ['€ 40.000', '± €167.000', '4,2×'],
  ['€ 50.000', '± €214.000', '4,3×'],
  ['€ 60.000', '± €261.000', '4,4×'],
  ['€ 75.000', '± €334.000', '4,5×'],
  ['€ 100.000', '± €458.000', '4,6×'],
] as const;

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
    bankTitle: 'Dutch mortgage rates by lender — 2026',
    bankIntro: 'Indicative rates from major Dutch lenders for a 10-year fixed-rate period (July 2026). Exact rates depend on your loan-to-value and NHG eligibility.',
    banks: [
      { name: 'ING', nhg: '3.6–4.0%', nonNhg: '4.1–4.7%', note: 'Apply directly or via a mortgage advisor' },
      { name: 'Rabobank', nhg: '3.7–4.1%', nonNhg: '4.2–4.8%', note: 'Discounts for low LTV (< 60%)' },
      { name: 'ABN AMRO', nhg: '3.7–4.1%', nonNhg: '4.1–4.8%', note: 'Online discount via Florius label' },
      { name: 'Nationale Nederlanden', nhg: '3.6–4.0%', nonNhg: '4.0–4.6%', note: 'Advisor-only, no direct applications' },
      { name: 'NIBC', nhg: '3.5–3.9%', nonNhg: '3.9–4.5%', note: 'Online mortgage, often competitive' },
      { name: 'Florius (ABN AMRO)', nhg: '3.6–4.0%', nonNhg: '4.0–4.6%', note: 'ABN AMRO\'s online mortgage label' },
    ] as { name: string; nhg: string; nonNhg: string; note: string }[],
    bankNote: 'Rates are indicative based on publicly available market data (July 2026) for 10-year fixed terms. Always request quotes from at least three lenders before committing.',
    bankCta: 'Enter any rate into the calculator above to see your exact monthly payment.',
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
    maxTitle: 'How much can you borrow? Maximum Dutch mortgage (2026)',
    maxP1: 'Your maximum Dutch mortgage is determined by two independent limits: your income (LTI norm, via NIBUD tables) and the property value (LTV norm). Both apply simultaneously — you cannot exceed either one.',
    maxLtiTitle: 'Income limit (LTI) — NIBUD tables',
    maxLtiP1: 'At a fixed rate of approximately 4% (10-year term), the indicative maximum mortgage for a single applicant in the Netherlands is:',
    maxTableIncome: 'Gross annual income',
    maxTableMax: 'Max. mortgage',
    maxTableMult: 'Multiplier',
    maxTableNote: 'Indicative at ~4% fixed rate (10 yr), no other debts. NIBUD norms are revised annually and shift with interest rate levels. Your lender or mortgage advisor will apply the exact current tables.',
    maxLtvTitle: 'Property value limit (LTV)',
    maxLtvP1: 'In the Netherlands you can borrow up to 100% of the appraised property value. Closing costs — transfer tax (2%), notary fees, and appraisal — must come from your own savings. Budget 3%–6% in buyer\'s costs on top of the purchase price.',
    maxTwoTitle: 'Two incomes: how much more can you borrow?',
    maxTwoP1: 'Since 2020, both incomes are counted at 100% in Dutch mortgage calculations. Two partners each earning €40,000 can borrow approximately what someone earning €80,000 would — around €340,000–€360,000 indicatively. Check the NIBUD tables for your exact combined income.',
    maxReduceTitle: 'What reduces your maximum mortgage?',
    maxReduceItems: [
      ['Student debt (DUO)', 'Every €10,000 of your original student loan reduces your maximum mortgage by roughly €20,000–€25,000 — even if the loan is largely repaid. Lenders use the original amount.'],
      ['Other loans & credit', 'BKR-registered debts (personal loans, credit cards, overdraft facilities) reduce your borrowing capacity directly. Pay these down before applying if possible.'],
      ['Alimony obligations', 'Partner or child support counts as a fixed monthly obligation and reduces the room available for mortgage payments.'],
    ] as [string, string][],
    maxCta: 'Want your exact borrowing capacity? Try our Borrowing Capacity Calculator',
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
    bankTitle: 'Hypotheekrente per geldverstrekker — 2026',
    bankIntro: 'Indicatieve rentes van grote Nederlandse geldverstrekkers voor een rentevaste periode van 10 jaar (juli 2026). Exacte tarieven zijn afhankelijk van je loan-to-value en NHG-status.',
    banks: [
      { name: 'ING', nhg: '3,6–4,0%', nonNhg: '4,1–4,7%', note: 'Direct of via hypotheekadviseur' },
      { name: 'Rabobank', nhg: '3,7–4,1%', nonNhg: '4,2–4,8%', note: 'Korting bij lage LTV (< 60%)' },
      { name: 'ABN AMRO', nhg: '3,7–4,1%', nonNhg: '4,1–4,8%', note: 'Online korting via Florius' },
      { name: 'Nationale Nederlanden', nhg: '3,6–4,0%', nonNhg: '4,0–4,6%', note: 'Alleen via adviseur, geen directe aanvraag' },
      { name: 'NIBC', nhg: '3,5–3,9%', nonNhg: '3,9–4,5%', note: 'Online hypotheek, vaak scherpe tarieven' },
      { name: 'Florius (ABN AMRO)', nhg: '3,6–4,0%', nonNhg: '4,0–4,6%', note: 'Online label van ABN AMRO' },
    ] as { name: string; nhg: string; nonNhg: string; note: string }[],
    bankNote: 'Tarieven zijn indicatief op basis van openbaar beschikbare marktdata (juli 2026) voor 10 jaar rentevast. Vraag altijd offertes bij minstens drie geldverstrekkers voordat je een keuze maakt.',
    bankCta: 'Vul jouw rente in de calculator hierboven in om je exacte maandlasten te berekenen.',
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
    maxTitle: 'Maximale hypotheek berekenen in 2026',
    maxP1: 'Je maximale hypotheek wordt bepaald door twee onafhankelijke normen: je inkomen (LTI-norm, via NIBUD-tabellen) en de woningwaarde (LTV-norm). Beide gelden tegelijk — je kunt niet meer lenen dan de laagste norm toestaat.',
    maxLtiTitle: 'Inkomensnorm (LTI) — NIBUD-tabellen',
    maxLtiP1: 'Bij een vaste rente van circa 4% (10 jaar rentevast) zijn onderstaande bedragen indicatief voor een alleenstaande aanvrager:',
    maxTableIncome: 'Bruto jaarsalaris',
    maxTableMax: 'Max. hypotheek',
    maxTableMult: 'Factor',
    maxTableNote: 'Indicatief bij ~4% vaste rente (10 jr), zonder overige schulden. NIBUD-normen worden jaarlijks bijgesteld en variëren met het renteniveau. Je geldverstrekker of hypotheekadviseur past de actuele tabellen toe.',
    maxLtvTitle: 'Woningwaardenorm (LTV)',
    maxLtvP1: 'In Nederland mag je maximaal 100% van de getaxeerde woningwaarde lenen. Bijkomende kosten — overdrachtsbelasting (2%), notariskosten en taxatiekosten — moet je altijd zelf betalen. Reken op 3%–6% kosten koper boven op de koopprijs.',
    maxTwoTitle: 'Twee inkomens: hoeveel meer kun je lenen?',
    maxTwoP1: 'Sinds 2020 wordt het tweede inkomen voor 100% meegeteld bij de hypotheekberekening. Twee partners die elk € 40.000 verdienen kunnen indicatief lenen wat iemand met een inkomen van € 80.000 zou kunnen — circa € 340.000–€ 360.000. Raadpleeg de NIBUD-tabellen voor jouw exacte gecombineerde inkomen.',
    maxReduceTitle: 'Wat verlaagt je maximale hypotheek?',
    maxReduceItems: [
      ['Studieschuld (DUO)', 'Elke € 10.000 oorspronkelijke studieschuld verlaagt je maximale hypotheek met circa € 20.000–€ 25.000 — ook als de schuld grotendeels is afgelost. Geldverstrekkers gebruiken het oorspronkelijke leenbedrag.'],
      ['Andere leningen en kredieten', 'BKR-geregistreerde schulden (persoonlijke lening, creditcard, roodstand) tellen direct mee en verlagen je leencapaciteit. Los deze zo mogelijk af vóór je hypotheekaanvraag.'],
      ['Alimentatieverplichtingen', 'Partner- of kinderalimentatie telt als vaste maandlast en vermindert de ruimte die overblijft voor hypotheeklasten.'],
    ] as [string, string][],
    maxCta: 'Wil je je exacte leencapaciteit berekenen? Gebruik onze Maximale Hypotheek Calculator',
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
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-3">{c.bankTitle}</h2>
          <p className="text-sm text-emerald-deep/50 mb-6">{c.bankIntro}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-emerald-deep/15">
                  <th className="text-left py-3 pr-4 text-xs font-bold uppercase tracking-widest text-emerald-deep/40">
                    {l === 'nl' ? 'Geldverstrekker' : 'Lender'}
                  </th>
                  <th className="text-left py-3 pr-4 text-xs font-bold uppercase tracking-widest text-emerald-deep">
                    {l === 'nl' ? 'Met NHG' : 'With NHG'}
                  </th>
                  <th className="text-left py-3 pr-4 text-xs font-bold uppercase tracking-widest text-emerald-deep/60">
                    {l === 'nl' ? 'Zonder NHG' : 'Without NHG'}
                  </th>
                  <th className="text-left py-3 text-xs font-bold uppercase tracking-widest text-emerald-deep/30 hidden sm:table-cell">
                    {l === 'nl' ? 'Opmerking' : 'Note'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-deep/8">
                {c.banks.map((bank) => (
                  <tr key={bank.name} className="hover:bg-emerald-deep/[0.02] transition-colors">
                    <td className="py-3.5 pr-4 font-bold text-emerald-deep">{bank.name}</td>
                    <td className="py-3.5 pr-4 font-display font-bold text-emerald-deep">{bank.nhg}</td>
                    <td className="py-3.5 pr-4 text-emerald-deep/60">{bank.nonNhg}</td>
                    <td className="py-3.5 text-xs text-emerald-deep/40 hidden sm:table-cell">{bank.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-emerald-deep/35 mt-4 border-t border-emerald-deep/8 pt-4">{c.bankNote}</p>
          <p className="text-sm text-emerald-deep/60 mt-3 font-medium">{c.bankCta}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{c.maxTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-8">{c.maxP1}</p>

          <h3 className="font-display text-lg font-semibold text-emerald-deep mb-3">{c.maxLtiTitle}</h3>
          <p className="text-emerald-deep/70 leading-relaxed mb-5">{c.maxLtiP1}</p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-emerald-deep/15">
                  <th className="text-left py-3 pr-4 text-xs font-bold uppercase tracking-widest text-emerald-deep/40">{c.maxTableIncome}</th>
                  <th className="text-left py-3 pr-4 text-xs font-bold uppercase tracking-widest text-emerald-deep">{c.maxTableMax}</th>
                  <th className="text-left py-3 text-xs font-bold uppercase tracking-widest text-emerald-deep/40">{c.maxTableMult}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-deep/8">
                {MAX_TABLE.map(([income, max, mult]) => (
                  <tr key={income} className="hover:bg-emerald-deep/[0.02] transition-colors">
                    <td className="py-3 pr-4 font-semibold text-emerald-deep">{income}</td>
                    <td className="py-3 pr-4 font-display font-bold text-emerald-deep">{max}</td>
                    <td className="py-3 text-emerald-deep/50">{mult}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-emerald-deep/40 mb-8">{c.maxTableNote}</p>

          <h3 className="font-display text-lg font-semibold text-emerald-deep mb-3">{c.maxLtvTitle}</h3>
          <p className="text-emerald-deep/70 leading-relaxed mb-8">{c.maxLtvP1}</p>

          <h3 className="font-display text-lg font-semibold text-emerald-deep mb-3">{c.maxTwoTitle}</h3>
          <p className="text-emerald-deep/70 leading-relaxed mb-8">{c.maxTwoP1}</p>

          <h3 className="font-display text-lg font-semibold text-emerald-deep mb-4">{c.maxReduceTitle}</h3>
          <div className="space-y-3 mb-8">
            {c.maxReduceItems.map(([label, desc]) => (
              <div key={label} className="border-l-2 border-emerald-deep/20 pl-4">
                <p className="text-sm font-semibold text-emerald-deep mb-1">{label}</p>
                <p className="text-sm text-emerald-deep/65 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <a
            href={`/${lang}/calculators/borrowing-capacity`}
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-deep border-b border-emerald-deep/30 hover:border-emerald-deep transition-colors pb-0.5"
          >
            {c.maxCta} →
          </a>
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

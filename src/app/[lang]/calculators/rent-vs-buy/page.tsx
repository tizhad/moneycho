import type { Metadata } from 'next';
import RentVsBuyCalculator from './RentVsBuyCalculator';
import { RelatedContent } from '@/components/RelatedContent';

const SLUG = 'rent-vs-buy';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Rent vs Buy Calculator Netherlands — Which Builds More Wealth?',
    description:
      'Compare renting vs buying a home in the Netherlands over time, including overdrachtsbelasting, NHG, and eigenwoningforfait. See your breakeven year and net worth chart.',
  },
  nl: {
    title: 'Huren vs Kopen Calculator — Wat Levert Meer Op?',
    description:
      'Vergelijk huren en kopen in Nederland over tijd, inclusief overdrachtsbelasting, NHG en eigenwoningforfait. Zie je break-even jaar en vermogensgrafiek.',
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
    whatTitle: 'How this calculator compares renting and buying',
    whatP1:
      'This calculator projects the net worth of two paths: buying a home with a mortgage, or renting the equivalent home and investing what you would otherwise have spent on a down payment and buying costs. Whichever option costs less in a given year, the difference is invested — so the comparison stays fair in both directions.',
    whatP2:
      'The result is a breakeven year: the point at which the equity you have built by owning overtakes what you would have if you had rented and invested instead. Before that year, renting and investing the difference tends to leave you ahead. After it, owning usually does.',
    taxTitle: 'The two NL-specific tax effects: eigenwoningforfait and hypotheekrenteaftrek',
    taxP1:
      'Owning a home in the Netherlands has a tax dimension renting does not. Hypotheekrenteaftrek lets you deduct mortgage interest from taxable income, currently capped at 37.56% since 2023 regardless of your actual tax bracket. But owner-occupiers also pay tax on eigenwoningforfait — an imputed rental value added to your taxable income, because the tax office treats living in your own home as a form of income.',
    taxP2:
      'This calculator nets the two effects together each year: mortgage interest deduction minus the eigenwoningforfait tax cost. Eigenwoningforfait is modelled here as a simplified flat rate of the home\'s current value — the real system has tiers and a separate "Wet Hillen" phase-out for near-mortgage-free homes that this calculator does not attempt to replicate exactly. Treat the net tax effect as indicative, not a substitute for a tax advisor.',
    oneTimeTitle: 'One-time buying costs modelled',
    oneTimeP1:
      'Overdrachtsbelasting (transfer tax) is 2% of the purchase price for owner-occupiers, 0% for first-time buyers under 35 on homes up to €555,000 (2026), and 8% for investors and second homes (2026 rate). NHG (Nationale Hypotheek Garantie), when your mortgage is €470,000 or less, costs a 0.4% one-time guarantee fee but typically lowers your mortgage rate. Notary, appraisal, and advisor fees are estimated as a flat amount here — use the Kosten Koper Calculator for the exact itemised breakdown.',
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'What is a good breakeven year for buying a home?',
        a: 'It depends entirely on your assumptions — home appreciation, rent increases, and investment returns all shift it. A shorter breakeven (3-5 years) means buying wins quickly; a longer one (10+ years) means you need to be fairly confident you will stay put that long for buying to pay off. If you might move within a few years, a long breakeven is a real risk factor, not just a number.',
      },
      {
        q: 'What is eigenwoningforfait?',
        a: 'Eigenwoningforfait is an imputed taxable income the Dutch tax office adds to your income for owning your home, since living rent-free in your own property is treated as a form of benefit. It is taxed at your marginal rate, partially offsetting the mortgage interest deduction (hypotheekrenteaftrek). This calculator models it as a simplified flat percentage of your home\'s value — the real rules have several tiers and exceptions.',
      },
      {
        q: 'Why would renting ever beat buying?',
        a: 'If you invest the money you did not spend on a down payment and buying costs, and that investment earns a healthy return, renting can outpace buying for years — especially early on, when transfer tax and closing costs are a sunk cost you have not yet recovered through equity or appreciation. The math flips over time as your mortgage balance shrinks and home value grows.',
      },
      {
        q: 'Does this include overdrachtsbelasting (transfer tax)?',
        a: 'Yes. The calculator applies 2% for owner-occupiers, 0% for eligible first-time buyers under 35 (homes up to €555,000 in 2026), and 8% for investors or second homes — the corrected 2026 investor rate. This is charged once, at purchase, and is included in the one-time buying costs shown above the chart.',
      },
      {
        q: 'What if I plan to sell before the mortgage term ends?',
        a: 'The chart shows net worth at every year within your comparison horizon, not just the end — look at the year you actually expect to sell or move, not the final year. Selling costs (estate agent fees, remaining mortgage penalties) are not modelled here; treat the result as an estimate of equity plus appreciation minus remaining debt, before any sale-specific costs.',
      },
    ],
  },
  nl: {
    whatTitle: 'Hoe deze calculator huren en kopen vergelijkt',
    whatP1:
      'Deze calculator berekent het vermogen van twee paden: een huis kopen met een hypotheek, of een vergelijkbare woning huren en beleggen wat je anders aan eigen inbreng en koopkosten had besteed. Welke optie in een bepaald jaar goedkoper is, dat verschil wordt belegd — zo blijft de vergelijking eerlijk in beide richtingen.',
    whatP2:
      'Het resultaat is een break-even jaar: het punt waarop het vermogen dat je opbouwt door te kopen groter wordt dan wat je zou hebben als je had gehuurd en het verschil had belegd. Vóór dat jaar levert huren en beleggen meestal meer op. Erna levert kopen meestal meer op.',
    taxTitle: 'De twee NL-specifieke belastingeffecten: eigenwoningforfait en hypotheekrenteaftrek',
    taxP1:
      'Een huis bezitten in Nederland heeft een fiscale kant die huren niet heeft. Met hypotheekrenteaftrek trek je hypotheekrente af van je belastbaar inkomen, sinds 2023 gemaximeerd op 37,56% ongeacht je werkelijke belastingschijf. Maar eigenaar-bewoners betalen ook belasting over het eigenwoningforfait — een fictief huurinkomen dat bij je belastbaar inkomen wordt opgeteld, omdat de Belastingdienst wonen in je eigen huis als een vorm van inkomen beschouwt.',
    taxP2:
      'Deze calculator verrekent beide effecten elk jaar: hypotheekrenteaftrek min de belasting over het eigenwoningforfait. Het eigenwoningforfait is hier gemodelleerd als een vereenvoudigd vast percentage van de actuele woningwaarde — het echte systeem kent schijven en een aparte "Wet Hillen"-afbouw voor woningen die (bijna) hypotheekvrij zijn, die deze calculator niet exact nabootst. Zie het netto belastingeffect als indicatief, geen vervanging voor een belastingadviseur.',
    oneTimeTitle: 'Gemodelleerde eenmalige koopkosten',
    oneTimeP1:
      'Overdrachtsbelasting is 2% van de koopprijs voor eigenaar-bewoners, 0% voor starters jonger dan 35 jaar bij woningen tot € 555.000 (2026), en 8% voor beleggers en tweede woningen (tarief 2026). NHG (Nationale Hypotheek Garantie) kost bij een hypotheek tot € 470.000 een eenmalige borgtochtprovisie van 0,4%, maar levert doorgaans een lagere hypotheekrente op. Notaris-, taxatie- en advieskosten zijn hier geschat als vast bedrag — gebruik de Kosten Koper Calculator voor de exacte gespecificeerde kosten.',
    faqTitle: 'Veelgestelde vragen',
    faqs: [
      {
        q: 'Wat is een goed break-even jaar bij het kopen van een huis?',
        a: 'Dat hangt volledig af van je aannames — waardestijging, huurstijging en beleggingsrendement verschuiven het allemaal. Een kort break-even punt (3-5 jaar) betekent dat kopen snel wint; een lang punt (10+ jaar) betekent dat je vrij zeker moet zijn dat je zo lang blijft wonen wil kopen zich terugbetalen. Als je binnen enkele jaren zou kunnen verhuizen, is een lang break-even punt een echt risico, niet zomaar een getal.',
      },
      {
        q: 'Wat is het eigenwoningforfait?',
        a: 'Het eigenwoningforfait is een fictief belastbaar inkomen dat de Belastingdienst bij je inkomen optelt omdat je in je eigen woning woont, wat wordt gezien als een vorm van voordeel. Het wordt belast tegen je marginale tarief en compenseert deels de hypotheekrenteaftrek. Deze calculator modelleert het als een vereenvoudigd vast percentage van je woningwaarde — de echte regels kennen meerdere schijven en uitzonderingen.',
      },
      {
        q: 'Waarom zou huren ooit beter zijn dan kopen?',
        a: 'Als je het geld dat je niet aan eigen inbreng en koopkosten besteedt belegt, en dat rendement is gezond, kan huren jarenlang beter uitpakken dan kopen — zeker in het begin, wanneer overdrachtsbelasting en koopkosten nog niet zijn terugverdiend via vermogen of waardestijging. De rekensom kantelt na verloop van tijd, naarmate je hypotheeksaldo daalt en de woningwaarde stijgt.',
      },
      {
        q: 'Wordt overdrachtsbelasting meegenomen?',
        a: 'Ja. De calculator rekent 2% voor eigenaar-bewoners, 0% voor starters jonger dan 35 jaar (woningen tot € 555.000 in 2026), en 8% voor beleggers of tweede woningen — het gecorrigeerde 2026-tarief voor beleggers. Dit wordt eenmalig geheven bij aankoop en zit in de eenmalige koopkosten hierboven.',
      },
      {
        q: 'Wat als ik van plan ben te verkopen voordat de hypotheek afloopt?',
        a: 'De grafiek toont het vermogen op elk jaar binnen je vergelijkingsperiode, niet alleen het laatste jaar — kijk naar het jaar waarin je verwacht te verkopen of verhuizen. Verkoopkosten (makelaarskosten, eventuele boeterente) zijn hier niet meegenomen; zie het resultaat als een schatting van vermogen plus waardestijging minus resterende schuld, vóór verkoopspecifieke kosten.',
      },
    ],
  },
} as const;

export default async function RentVsBuyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = lang === 'nl' ? 'nl' : 'en';
  const ed = EDITORIAL[l];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ed.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <RentVsBuyCalculator lang={lang} />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{ed.whatTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{ed.whatP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{ed.whatP2}</p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-3">{ed.taxTitle}</h2>
          <p className="text-sm text-emerald-deep/60 mb-3">{ed.taxP1}</p>
          <p className="text-sm text-emerald-deep/60">{ed.taxP2}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{ed.oneTimeTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed">{ed.oneTimeP1}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-8">{ed.faqTitle}</h2>
          <div className="divide-y divide-emerald-deep/10 border-t border-emerald-deep/10">
            {ed.faqs.map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                  <h3 className="font-semibold text-emerald-deep text-sm leading-snug">{q}</h3>
                  <span className="text-emerald-deep/30 text-lg shrink-0 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-emerald-deep/70 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

      </div>
      <RelatedContent lang={lang} slug="calculator:rent-vs-buy" />
    </>
  );
}

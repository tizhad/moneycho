import type { Metadata } from 'next';
import BorrowingCapacityCalculator from './BorrowingCapacityCalculator';

const SLUG = 'borrowing-capacity';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'How Much Can I Borrow? Loan Calculator Netherlands 2026',
    description:
      'Calculate your maximum personal loan in the Netherlands based on net income, housing costs, and existing debts. Nibud/VFN norms, free and instant — no signup.',
  },
  nl: {
    title: 'Hoeveel Kan Ik Lenen? Bereken je Maximale Lening 2026',
    description:
      'Bereken direct hoeveel je kunt lenen op basis van je netto inkomen, woonlasten en bestaande schulden. Volgens Nibud/VFN-normen. Gratis, zonder account.',
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
    limitsTitle: 'How Dutch lending limits are set',
    limitsP1:
      'In the Netherlands, your maximum loan is primarily determined by your income, not by what you want to buy. Lenders use income norms published by Nibud (Nationaal Instituut voor Budgetvoorlichting) and the VFN to set a maximum monthly payment as a percentage of your net income.',
    limitsP2:
      'At lower incomes (around 1,500 euros per month net), about 20% of income can go toward financial obligations. As income rises, this percentage increases gradually to around 35% for incomes above 4,000 euros per month. The tables shift slightly each year.',
    exampleTitle: 'Worked example',
    exampleSubtitle: '60,000 euros gross annual salary, one existing loan of 350 euros/month',
    exampleGross: 'Gross income',
    exampleGrossUnit: 'per year',
    exampleMaxCost: 'Max housing cost',
    exampleMaxCostUnit: 'euros/month (≈35%)',
    exampleMinusLoan: 'Minus car loan',
    exampleMinusLoanUnit: 'euros/month available for mortgage',
    exampleMax: 'Max mortgage',
    exampleMaxUnit: 'euros at 4%, 25 years',
    exampleNote:
      'Without the car loan, the same income qualifies for roughly 337,000 euros. That 350 euro monthly payment reduces borrowing capacity by about 67,000 euros.',
    reducersTitle: 'What reduces your borrowing capacity',
    reducers: [
      {
        factor: 'Existing loans and credit cards',
        impact: 'Significant',
        detail:
          'Each euro of monthly debt repayment reduces your maximum loan payment by roughly the same amount. A 350 euro car payment can cut your borrowing capacity by 70,000 euros or more.',
      },
      {
        factor: 'Unused credit card limits',
        impact: 'Moderate',
        detail:
          'Dutch lenders count a portion of your unused credit card limit as potential debt. Closing cards you do not use can modestly increase your borrowing capacity.',
      },
      {
        factor: 'Self-employment income',
        impact: 'Material',
        detail:
          'For ZZP and self-employed income, lenders typically use 70% of the average of the last three years. Irregular income or recent business losses can reduce what you qualify for significantly.',
      },
      {
        factor: 'Toetsrente (stress test rate)',
        impact: 'Always applies',
        detail:
          'Lenders must use a minimum calculation rate (toetsrente) set by the AFM, currently around 5%, even if actual rates are lower. This ensures you can still afford repayments if rates rise.',
      },
    ],
    ceilingTitle: 'Maximum is a ceiling, not a target',
    ceilingP1:
      'Lenders will approve you for the maximum their model allows. That does not mean you should borrow it. The Nibud norms are designed so that at the maximum amount, you can afford the payment if rates rise to around 5% and your income stays flat.',
    ceilingP2:
      'Most financial advisors suggest staying 10 to 20% below the maximum if possible. That buffer gives you room for an unexpected expense, a period of reduced income, or a rising rate environment.',
    ceilingP3pre: 'Also worth considering: how does the monthly payment fit into your actual budget? Use the ',
    ceilingLink1: 'Mortgage Calculator',
    ceilingP3mid: ' to see the monthly cost, then plug that into the ',
    ceilingLink2: 'Cash Flow Calculator',
    ceilingP3post:
      ' to see what is left. Affordability on paper and affordability in real life are sometimes different numbers.',
    partnerTitle: 'Buying with a partner',
    partnerP1:
      'When two people borrow together, lenders typically take 100% of the higher income and 90% of the lower income to calculate the maximum. The exact rules vary by lender, but combining incomes almost always increases borrowing capacity significantly.',
    partnerP2:
      'Keep in mind that both incomes need to be sustainable. If one partner plans to reduce working hours in the next few years, factor that into your calculations now rather than after you have committed to the loan.',
    mortgageCtaTitle: 'Looking for your maximum mortgage instead?',
    mortgageCtaText:
      'This calculator estimates personal loan capacity. For buying a home, your maximum works differently — up to 4.5× your gross annual income via the NIBUD tables.',
    mortgageCtaLink: 'Mortgage Calculator Netherlands',
    faqTitle: 'Frequently asked questions',
    faqs: [
      [
        'How much can I borrow with my salary?',
        'Dutch lenders allow 20–35% of your net monthly income to go toward all financial obligations combined (housing, existing loans, and the new loan). With a net income of €3,000/month and €900 rent, roughly €0–€150/month is available at the 30% tier — while at €4,000+ net the 35% tier applies. Enter your numbers in the calculator above for your exact estimate.',
      ],
      [
        'How much can I borrow for a mortgage in the Netherlands?',
        'Mortgages follow different rules than personal loans: your maximum mortgage is up to about 4.5× your gross annual income (2026 NIBUD norms), adjusted for student debt, other loans, and the property. Use our Mortgage Calculator Netherlands for the mortgage-specific calculation.',
      ],
      [
        'What counts against my borrowing capacity?',
        'Existing loan payments, credit card limits (even unused ones), your BKR credit registration, student debt (DUO), alimony obligations, and your housing costs all reduce the room lenders will give you. Paying off small loans before applying can meaningfully increase your maximum.',
      ],
      [
        'Does a partner increase how much I can borrow?',
        'Yes. Lenders typically count 100% of the higher income and 90% of the lower income for personal loans, and both incomes fully for mortgages since 2023. Two incomes almost always increase the maximum significantly.',
      ],
    ] as [string, string][],
  },
  nl: {
    limitsTitle: 'Zo bepalen Nederlandse kredietverstrekkers je leenruimte',
    limitsP1:
      'In Nederland wordt je maximale lening vooral bepaald door je inkomen, niet door wat je wilt kopen. Kredietverstrekkers gebruiken de inkomensnormen van het Nibud (Nationaal Instituut voor Budgetvoorlichting) en de VFN om een maximale maandlast vast te stellen als percentage van je netto inkomen.',
    limitsP2:
      'Bij lagere inkomens (rond € 1.500 netto per maand) mag ongeveer 20% van je inkomen naar financiële verplichtingen. Naarmate je inkomen stijgt, loopt dat percentage geleidelijk op tot circa 35% bij inkomens boven € 4.000 per maand. De tabellen verschuiven elk jaar iets.',
    exampleTitle: 'Rekenvoorbeeld',
    exampleSubtitle: '€ 60.000 bruto jaarsalaris, één bestaande lening van € 350/maand',
    exampleGross: 'Bruto inkomen',
    exampleGrossUnit: 'per jaar',
    exampleMaxCost: 'Max. woonlasten',
    exampleMaxCostUnit: 'euro/maand (≈35%)',
    exampleMinusLoan: 'Minus autolening',
    exampleMinusLoanUnit: 'euro/maand beschikbaar voor hypotheek',
    exampleMax: 'Max. hypotheek',
    exampleMaxUnit: 'euro bij 4%, 25 jaar',
    exampleNote:
      'Zonder de autolening kom je met hetzelfde inkomen uit op circa € 337.000. Die maandlast van € 350 verlaagt je leencapaciteit dus met ongeveer € 67.000.',
    reducersTitle: 'Wat verlaagt je leencapaciteit',
    reducers: [
      {
        factor: 'Bestaande leningen en creditcards',
        impact: 'Groot',
        detail:
          'Elke euro maandelijkse aflossing verlaagt je maximale maandlast voor een nieuwe lening met ongeveer hetzelfde bedrag. Een autolening van € 350 per maand kan je leencapaciteit met € 70.000 of meer verlagen.',
      },
      {
        factor: 'Ongebruikte creditcardlimieten',
        impact: 'Gemiddeld',
        detail:
          'Nederlandse kredietverstrekkers tellen een deel van je ongebruikte creditcardlimiet mee als potentiële schuld. Het opzeggen van kaarten die je niet gebruikt kan je leenruimte iets vergroten.',
      },
      {
        factor: 'Inkomen als zzp\'er',
        impact: 'Substantieel',
        detail:
          'Voor zzp- en ondernemersinkomen rekenen kredietverstrekkers doorgaans met 70% van het gemiddelde van de laatste drie jaar. Wisselend inkomen of recente verliezen kunnen je maximum flink verlagen.',
      },
      {
        factor: 'Toetsrente',
        impact: 'Geldt altijd',
        detail:
          'Kredietverstrekkers moeten rekenen met een minimale toetsrente die de AFM vaststelt, momenteel rond de 5%, ook als de werkelijke rente lager is. Zo blijft de lening betaalbaar als de rente stijgt.',
      },
    ],
    ceilingTitle: 'Het maximum is een plafond, geen doel',
    ceilingP1:
      'Kredietverstrekkers keuren je goed voor het maximum dat hun model toestaat. Dat betekent niet dat je dat bedrag moet lenen. De Nibud-normen zijn zo opgezet dat je de maandlast bij het maximum nog kunt dragen als de rente naar circa 5% stijgt en je inkomen gelijk blijft.',
    ceilingP2:
      'De meeste financieel adviseurs raden aan om zo mogelijk 10 tot 20% onder het maximum te blijven. Die buffer geeft ruimte voor onverwachte uitgaven, een periode met minder inkomen of stijgende rentes.',
    ceilingP3pre: 'Ook belangrijk: past de maandlast in je werkelijke budget? Gebruik de ',
    ceilingLink1: 'Hypotheek Calculator',
    ceilingP3mid: ' om de maandlasten te zien en vul die daarna in bij de ',
    ceilingLink2: 'Cashflow Calculator',
    ceilingP3post:
      ' om te zien wat er overblijft. Betaalbaar op papier en betaalbaar in het echt zijn soms verschillende getallen.',
    partnerTitle: 'Samen lenen met een partner',
    partnerP1:
      'Als twee mensen samen lenen, rekenen kredietverstrekkers doorgaans met 100% van het hoogste inkomen en 90% van het laagste inkomen. De exacte regels verschillen per verstrekker, maar samen lenen verhoogt de leencapaciteit vrijwel altijd aanzienlijk.',
    partnerP2:
      'Bedenk wel dat beide inkomens houdbaar moeten zijn. Als één partner de komende jaren minder wil gaan werken, neem dat dan nu mee in je berekening — niet pas nadat je de lening hebt afgesloten.',
    mortgageCtaTitle: 'Zoek je je maximale hypotheek?',
    mortgageCtaText:
      'Deze calculator berekent je leencapaciteit voor een persoonlijke lening. Voor een woning werkt je maximum anders — tot 4,5× je bruto jaarinkomen volgens de NIBUD-tabellen.',
    mortgageCtaLink: 'Hypotheek Berekenen',
    faqTitle: 'Veelgestelde vragen over hoeveel je kunt lenen',
    faqs: [
      [
        'Hoeveel kan ik lenen met mijn salaris?',
        'Nederlandse kredietverstrekkers laten 20–35% van je netto maandinkomen naar al je financiële verplichtingen samen gaan (wonen, bestaande leningen en de nieuwe lening). Bij een netto inkomen van € 3.000 per maand geldt de 30%-norm; boven € 4.000 netto de 35%-norm. Vul je gegevens in de calculator hierboven in voor jouw exacte indicatie.',
      ],
      [
        'Hoeveel kan ik lenen voor een hypotheek?',
        'Voor een hypotheek gelden andere regels dan voor een persoonlijke lening: je maximale hypotheek is circa 4,5 keer je bruto jaarinkomen (NIBUD-normen 2026), gecorrigeerd voor studieschuld, andere leningen en de woning. Gebruik onze Hypotheek Calculator voor de hypotheekspecifieke berekening.',
      ],
      [
        'Wat telt mee bij mijn leencapaciteit?',
        'Bestaande aflossingen, creditcardlimieten (ook ongebruikte), je BKR-registratie, studieschuld (DUO), alimentatieverplichtingen en je woonlasten verlagen allemaal de ruimte die kredietverstrekkers je geven. Kleine leningen aflossen vóór je aanvraag kan je maximum merkbaar verhogen.',
      ],
      [
        'Kan ik meer lenen met een partner?',
        'Ja. Voor persoonlijke leningen rekenen verstrekkers doorgaans met 100% van het hoogste en 90% van het laagste inkomen; voor hypotheken tellen sinds 2023 beide inkomens volledig mee. Twee inkomens verhogen het maximum vrijwel altijd aanzienlijk.',
      ],
    ] as [string, string][],
  },
};

export default async function BorrowingCapacityPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = lang === 'nl' ? 'nl' : 'en';
  const c = EDITORIAL[l];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map(([q, a]) => ({
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
      <BorrowingCapacityCalculator lang={lang} />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            {c.limitsTitle}
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.limitsP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.limitsP2}</p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            {c.exampleTitle}
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">{c.exampleSubtitle}</p>
          <div className="grid sm:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">{c.exampleGross}</p>
              <p className="font-display text-xl font-bold text-emerald-deep">60.000</p>
              <p className="text-xs text-emerald-deep/50 mt-1">{c.exampleGrossUnit}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">{c.exampleMaxCost}</p>
              <p className="font-display text-xl font-bold text-emerald-deep">~1.750</p>
              <p className="text-xs text-emerald-deep/50 mt-1">{c.exampleMaxCostUnit}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">{c.exampleMinusLoan}</p>
              <p className="font-display text-xl font-bold text-emerald-deep">1.400</p>
              <p className="text-xs text-emerald-deep/50 mt-1">{c.exampleMinusLoanUnit}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{c.exampleMax}</p>
              <p className="font-display text-xl font-bold text-emerald-deep">~270.000</p>
              <p className="text-xs text-emerald-deep/50 mt-1">{c.exampleMaxUnit}</p>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/60 border-t border-emerald-deep/10 pt-5">
            {c.exampleNote}
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            {c.reducersTitle}
          </h2>
          <div className="divide-y divide-emerald-deep/10 border-t border-emerald-deep/10">
            {c.reducers.map(({ factor, impact, detail }) => (
              <div key={factor} className="py-5">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-bold text-emerald-deep">{factor}</p>
                  <span className="text-xs font-semibold text-emerald-deep/50 bg-emerald-deep/5 px-2 py-0.5 rounded">{impact}</span>
                </div>
                <p className="text-sm text-emerald-deep/70 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            {c.ceilingTitle}
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.ceilingP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.ceilingP2}</p>
          <p className="text-emerald-deep/70 leading-relaxed">
            {c.ceilingP3pre}
            <a href={`/${lang}/calculators/mortgage`} className="font-semibold text-emerald-deep underline decoration-emerald-deep/30 hover:decoration-emerald-deep transition-colors">
              {c.ceilingLink1}
            </a>
            {c.ceilingP3mid}
            <a href={`/${lang}/calculators/cash-flow`} className="font-semibold text-emerald-deep underline decoration-emerald-deep/30 hover:decoration-emerald-deep transition-colors">
              {c.ceilingLink2}
            </a>
            {c.ceilingP3post}
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            {c.partnerTitle}
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.partnerP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.partnerP2}</p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-2">
            {c.mortgageCtaTitle}
          </h2>
          <p className="text-sm text-emerald-deep/60 leading-relaxed mb-4">{c.mortgageCtaText}</p>
          <a
            href={`/${lang}/calculators/mortgage`}
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-deep border-b border-emerald-deep/30 hover:border-emerald-deep transition-colors pb-0.5"
          >
            {c.mortgageCtaLink} →
          </a>
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
    </>
  );
}

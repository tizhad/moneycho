import type { Metadata } from 'next';
import CompoundInterestCalculator from './CompoundInterestCalculator';
import { RelatedContent } from '@/components/RelatedContent';

const SLUG = 'compound-interest';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Compound Interest Calculator — Free, Instant',
    description:
      'Free compound interest calculator — enter any starting balance, monthly contribution, and annual rate to project your future balance instantly. See how compounding accelerates growth.',
  },
  nl: {
    title: 'Rente op Rente Calculator — Gratis & Direct',
    description:
      'Gratis rente op rente calculator — vul startbedrag, maandelijkse inleg en rente in en zie je eindwaarde direct. Ontdek de kracht van samengestelde rente.',
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

const RATES = {
  en: [
    { label: 'Dutch high-yield savings account', rate: '2–3%', note: '2025 rates, easy to access, low risk' },
    { label: 'Government bonds (NL / EU)', rate: '3–4%', note: 'Low risk, fixed income, predictable' },
    { label: 'Balanced fund (60/40 stocks & bonds)', rate: '5–6%', note: 'Moderate risk, suitable for 5+ year horizons' },
    { label: 'Global equity index fund', rate: '7–8%', note: 'Higher volatility, historical average before inflation' },
  ],
  nl: [
    { label: 'Nederlandse spaarrekening (hoge rente)', rate: '2–3%', note: 'Tarieven 2025, gemakkelijk toegankelijk, laag risico' },
    { label: 'Staatsobligaties (NL / EU)', rate: '3–4%', note: 'Laag risico, vaste inkomsten, voorspelbaar' },
    { label: 'Gemengd fonds (60/40 aandelen & obligaties)', rate: '5–6%', note: 'Gematigd risico, geschikt voor horizons van 5+ jaar' },
    { label: 'Wereldwijd aandelen indexfonds', rate: '7–8%', note: 'Hogere volatiliteit, historisch gemiddelde vóór inflatie' },
  ],
} as const;

const RULE72 = [
  ['3%', '24 jr', '24 yrs'],
  ['6%', '12 jr', '12 yrs'],
  ['8%', '9 jr', '9 yrs'],
  ['12%', '6 jr', '6 yrs'],
] as const;

const EDITORIAL = {
  en: {
    whatTitle: 'What is compound interest?',
    whatP1:
      'Compound interest is interest earned on both your original deposit and the interest you have already collected. Simple interest only grows on the starting amount. Compound interest grows on the whole balance, so each period adds a little more than the last.',
    whatP2:
      'The result is a curve, not a straight line. Growth feels slow in the early years and then accelerates sharply. That is not magic — it is just the math catching up with itself.',
    exampleTitle: 'Worked example',
    exampleSub: '$10,000 starting amount · $500/month · 7% annual rate · 20 years',
    examplePutIn: 'You put in',
    exampleInterest: 'Interest earned',
    exampleFinal: 'Final balance',
    exampleNote:
      'More than half came from interest, not from your deposits. You contributed $130,000 over 20 years — the other $171,000 showed up because the interest had time to compound.',
    howTitle: 'How to use this compound interest calculator',
    steps: [
      ['Starting amount', 'What you have today. Zero is fine — monthly contributions alone grow significantly given enough time.'],
      ['Monthly contribution', 'How much you add each month. Consistency matters more than the size of your initial deposit.'],
      ['Annual interest rate', 'The expected return per year. Use your savings rate for safe goals; see the rate guide below for investing benchmarks.'],
      ['Time period', 'Years to let the money grow. Even a few extra years at the end make a surprisingly large difference.'],
      ['Compound frequency', 'How often interest is added to your balance. Monthly is standard for most savings accounts and funds.'],
    ] as [string, string][],
    vsTitle: 'Compound vs simple interest, side by side',
    vsP1: 'Same numbers, different math. $10,000 at 7% for 20 years, no monthly contributions:',
    vsSimple: 'Simple interest',
    vsSimpleAmt: '$24,000',
    vsSimpleNote: '$10K + $14K interest (7% × 20 years × $10K)',
    vsCompound: 'Compound interest',
    vsCompoundAmt: '$38,700',
    vsCompoundNote: '$10K growing at 7% compounded annually',
    vsFootnote:
      'At 30 years: simple $31K vs compound $76K. At 40 years: simple $38K vs compound $149K. Time is doing the work.',
    ratesTitle: 'What rate should you enter?',
    ratesP1: 'Use a realistic number for your situation. Here are common benchmarks:',
    ratesDisclaimer:
      'Past returns are not a guarantee of future results. Higher expected returns always come with more risk and more volatility along the way.',
    rule72Title: 'The Rule of 72',
    rule72P1:
      'A useful shortcut: divide 72 by your annual return to estimate how many years it takes to double your money.',
    rule72Suffix: 'to double',
    rule72Note:
      'This is why starting at 25 instead of 35 can mean retiring with twice as much money, even with identical contributions.',
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'How does compound interest work?',
        a: 'Compound interest calculates interest on both the principal and the accumulated interest from prior periods. Each period your balance grows slightly larger, so the next interest payment is slightly larger too. Over time this creates exponential rather than linear growth.',
      },
      {
        q: 'What is the compound interest formula?',
        a: 'A = P(1 + r/n)^(nt), where P is the principal, r is the annual interest rate (as a decimal), n is the number of compounding periods per year, and t is the number of years. This calculator also adds monthly contributions to the formula for a realistic savings projection.',
      },
      {
        q: 'How often does compound interest compound?',
        a: 'Monthly compounding is most common for savings accounts and investment funds. Daily compounding is slightly more generous than monthly, but the practical difference is small. This calculator lets you compare monthly, quarterly, and annual compounding.',
      },
      {
        q: 'What is the difference between compound and simple interest?',
        a: 'Simple interest is calculated only on the original principal — it grows in a straight line. Compound interest is calculated on the principal plus all accumulated interest — it grows exponentially. On $10,000 at 7% over 20 years: simple interest gives $24,000; compound gives $38,700.',
      },
      {
        q: 'What is the Rule of 72?',
        a: 'Divide 72 by your annual return percentage to get the approximate number of years it takes to double your money. At 8% annual return: 72 ÷ 8 = 9 years to double. It works because ln(2) ≈ 0.693, and 72/r ≈ ln(2)/(ln(1+r)) for small r.',
      },
    ],
  },
  nl: {
    whatTitle: 'Wat is rente op rente?',
    whatP1:
      'Rente op rente betekent dat je rente verdient over zowel je oorspronkelijke inleg als over de rente die je al hebt opgebouwd. Gewone rente groeit alleen over het startbedrag. Bij rente op rente groeit het over het totale saldo, zodat elke periode iets meer oplevert dan de vorige.',
    whatP2:
      'Het resultaat is een groeicurve, geen rechte lijn. In de eerste jaren lijkt de groei traag, daarna versnelt het sterk. Dat is geen magie — het is gewoon de wiskunde die zijn werk doet.',
    exampleTitle: 'Rekenvoorbeeld',
    exampleSub: '€10.000 startbedrag · €500/maand · 7% rente · 20 jaar',
    examplePutIn: 'Jij legt in',
    exampleInterest: 'Rente verdiend',
    exampleFinal: 'Eindwaarde',
    exampleNote:
      'Meer dan de helft komt van rente, niet van je eigen inleg. Je hebt €130.000 ingelegd over 20 jaar — de andere €171.000 is er vanzelf bijgekomen doordat de rente tijd had om te groeien.',
    howTitle: 'Hoe gebruik je deze rente op rente calculator?',
    steps: [
      ['Startbedrag', 'Wat je vandaag hebt. Nul is prima — maandelijkse inleg groeit significant als je genoeg tijd geeft.'],
      ['Maandelijkse inleg', 'Hoeveel je elke maand toevoegt. Consistentie telt zwaarder dan de grootte van je startbedrag.'],
      ['Jaarlijkse rente', 'Het verwachte rendement per jaar. Gebruik je spaarrente voor veilige doelen; zie de rentegids hieronder voor beleggingsbenchmarks.'],
      ['Looptijd', 'Jaren om je geld te laten groeien. Zelfs een paar jaar extra aan het einde maakt een verrassend groot verschil.'],
      ['Aanrente-frequentie', 'Hoe vaak rente aan je saldo wordt toegevoegd. Maandelijks is standaard voor de meeste spaarrekeningen en fondsen.'],
    ] as [string, string][],
    vsTitle: 'Rente op rente vs enkelvoudige rente, naast elkaar',
    vsP1: 'Dezelfde getallen, andere rekenmethode. €10.000 bij 7% voor 20 jaar, zonder maandelijkse inleg:',
    vsSimple: 'Enkelvoudige rente',
    vsSimpleAmt: '€24.000',
    vsSimpleNote: '€10K + €14K rente (7% × 20 jaar × €10K)',
    vsCompound: 'Rente op rente',
    vsCompoundAmt: '€38.700',
    vsCompoundNote: '€10K dat groeit bij 7% samengesteld per jaar',
    vsFootnote:
      'Na 30 jaar: enkelvoudig €31K vs rente op rente €76K. Na 40 jaar: enkelvoudig €38K vs rente op rente €149K. De tijd doet het werk.',
    ratesTitle: 'Welk percentage moet je invoeren?',
    ratesP1: 'Gebruik een realistisch getal voor jouw situatie. Hier zijn veelgebruikte benchmarks:',
    ratesDisclaimer:
      'Rendementen uit het verleden zijn geen garantie voor de toekomst. Een hoger verwacht rendement gaat altijd gepaard met meer risico en meer volatiliteit.',
    rule72Title: 'De Vuistregel van 72',
    rule72P1:
      'Een handige vuistregel: deel 72 door je jaarlijks rendement om te schatten hoeveel jaar het duurt om je geld te verdubbelen.',
    rule72Suffix: 'om te verdubbelen',
    rule72Note:
      'Daarom kan op je 25e beginnen in plaats van op je 35e betekenen dat je met het dubbele pensioen gaat, zelfs bij gelijke inleg.',
    faqTitle: 'Veelgestelde vragen',
    faqs: [
      {
        q: 'Hoe werkt rente op rente?',
        a: 'Rente op rente berekent rente over zowel het startbedrag als de opgebouwde rente uit eerdere periodes. Elke periode groeit je saldo iets meer, waardoor de volgende rentebetaling ook iets hoger is. Dit leidt in de loop van de tijd tot exponentiële in plaats van lineaire groei.',
      },
      {
        q: 'Wat is de formule voor rente op rente?',
        a: 'A = P(1 + r/n)^(nt), waarbij P het startbedrag is, r de jaarlijkse rente (als decimaal), n het aantal keren aanrenteren per jaar, en t het aantal jaren. Deze calculator voegt ook maandelijkse inleg toe aan de formule voor een realistische spaarberekening.',
      },
      {
        q: 'Hoe vaak wordt rente op rente berekend?',
        a: 'Maandelijks aanrenteren is het meest gebruikelijk bij spaarrekeningen en beleggingsfondsen. Dagelijks aanrenteren is iets gunstiger dan maandelijks, maar het praktische verschil is klein. Deze calculator laat je maandelijks, kwartaal en jaarlijks vergelijken.',
      },
      {
        q: 'Wat is het verschil tussen rente op rente en enkelvoudige rente?',
        a: 'Enkelvoudige rente wordt alleen berekend over het startbedrag — het groeit in een rechte lijn. Rente op rente wordt berekend over het startbedrag plus alle opgebouwde rente — het groeit exponentieel. Bij €10.000 tegen 7% over 20 jaar: enkelvoudige rente geeft €24.000; rente op rente geeft €38.700.',
      },
      {
        q: 'Wat is de Vuistregel van 72?',
        a: 'Deel 72 door je jaarlijkse rentepercentage om het aantal jaren te schatten dat het kost om je geld te verdubbelen. Bij 8% jaarlijks rendement: 72 ÷ 8 = 9 jaar om te verdubbelen. Dit werkt omdat ln(2) ≈ 0,693, en 72/r ≈ ln(2)/(ln(1+r)) voor kleine r.',
      },
    ],
  },
} as const;

export default async function CompoundInterestPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = lang === 'nl' ? 'nl' : 'en';
  const ed = EDITORIAL[l];
  const rates = RATES[l];

  return (
    <>
      <CompoundInterestCalculator lang={lang} />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            {ed.whatTitle}
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{ed.whatP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{ed.whatP2}</p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            {ed.exampleTitle}
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">{ed.exampleSub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">
                {ed.examplePutIn}
              </p>
              <p className="font-display text-3xl font-bold text-emerald-deep">
                {l === 'nl' ? '€130.000' : '$130,000'}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">
                {ed.exampleInterest}
              </p>
              <p className="font-display text-3xl font-bold text-emerald-deep">
                {l === 'nl' ? '€171.000' : '$171,000'}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">
                {ed.exampleFinal}
              </p>
              <p className="font-display text-3xl font-bold text-emerald-deep">
                {l === 'nl' ? '€301.000' : '$301,000'}
              </p>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/60 mt-8 border-t border-emerald-deep/10 pt-6">
            {ed.exampleNote}
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-6">
            {ed.howTitle}
          </h2>
          <ol className="space-y-5">
            {ed.steps.map(([label, desc], i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display text-sm font-bold text-gold w-5 shrink-0 pt-0.5">
                  {i + 1}.
                </span>
                <p className="text-sm text-emerald-deep/70 leading-relaxed">
                  <strong className="text-emerald-deep font-semibold">{label}:</strong>{' '}
                  {desc}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            {ed.vsTitle}
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">{ed.vsP1}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-emerald-deep/10 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
                {ed.vsSimple}
              </p>
              <p className="font-display text-2xl font-bold text-emerald-deep">{ed.vsSimpleAmt}</p>
              <p className="text-xs text-emerald-deep/50 mt-2">{ed.vsSimpleNote}</p>
            </div>
            <div className="border border-emerald-deep bg-emerald-deep/[0.03] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
                {ed.vsCompound}
              </p>
              <p className="font-display text-2xl font-bold text-emerald-deep">{ed.vsCompoundAmt}</p>
              <p className="text-xs text-emerald-deep/50 mt-2">{ed.vsCompoundNote}</p>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/50 mt-4">{ed.vsFootnote}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-6">
            {ed.ratesTitle}
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">{ed.ratesP1}</p>
          <div className="divide-y divide-emerald-deep/10 border-t border-emerald-deep/10">
            {rates.map(({ label, rate, note }) => (
              <div key={label} className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-deep">{label}</p>
                  <p className="text-xs text-emerald-deep/50 mt-0.5">{note}</p>
                </div>
                <p className="font-display font-bold text-emerald-deep text-lg ml-6 shrink-0">
                  {rate}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-emerald-deep/40 mt-4">{ed.ratesDisclaimer}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-4">
            {ed.rule72Title}
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">{ed.rule72P1}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {RULE72.map(([rate, nlYrs, enYrs]) => (
              <div key={rate} className="text-center p-5 border border-emerald-deep/10">
                <p className="font-display text-xl font-bold text-gold">{rate}</p>
                <p className="text-xs text-emerald-deep/60 mt-1.5">
                  {l === 'nl' ? nlYrs : enYrs} {ed.rule72Suffix}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-emerald-deep/50 mt-5">{ed.rule72Note}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-8">
            {ed.faqTitle}
          </h2>
          <div className="space-y-0 divide-y divide-emerald-deep/10 border-t border-emerald-deep/10">
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
      <RelatedContent lang={lang} slug="calculator:compound-interest" />
    </>
  );
}

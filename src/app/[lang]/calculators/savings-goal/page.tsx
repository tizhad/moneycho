import type { Metadata } from 'next';
import SavingsGoalCalculator from './SavingsGoalCalculator';

const SLUG = 'savings-goal';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Savings Goal Calculator — How Much to Save Per Month',
    description:
      'Enter your savings target and deadline, and get the exact monthly amount you need to save. Includes interest projections. Free and instant.',
  },
  nl: {
    title: 'Spaardoel Calculator — Hoeveel Per Maand Sparen?',
    description:
      'Vul je spaardoel en deadline in en bereken precies hoeveel je per maand moet sparen. Met renteprojectie. Gratis en direct.',
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
    reverseTitle: 'Working backwards from your goal',
    reverseP1: 'Most savings calculators tell you what a monthly contribution will grow to. This one does the reverse: you tell it what you want to end up with and when you need it, and it tells you exactly how much to set aside each month.',
    reverseP2: 'That makes planning much easier. Instead of saving randomly and hoping it adds up, you start with the target and work the math backwards.',
    exampleTitle: 'Worked example',
    exampleSubtitle: '€15,000 goal · €2,000 already saved · 3% annual return',
    col1Label: 'Goal', col1Value: '€15,000', col1Note: 'target amount',
    col2Label: 'Already saved', col2Value: '€2,000', col2Note: 'starting balance',
    col3Label: 'Monthly needed', col3Value: '~€400', col3Note: 'for ~30 months',
    fasterLabel: 'Need it faster?',
    faster2y: 'Reach goal in 2 years', faster2yDesc: 'You need to save about €535 per month',
    faster4y: 'Reach goal in 4 years', faster4yDesc: 'You need to save about €265 per month',
    rateTitle: 'Choosing the right interest rate for your goal',
    rateIntro: 'The rate you use matters a lot over long horizons but very little over short ones. For a goal in the next two years, the difference between 2% and 4% is small. For a goal 20 years away, the difference is enormous.',
    goals: [
      { goal: 'Emergency fund', amount: '3–6 months of expenses', rate: '2–3%', note: 'Keep in a high-yield savings account, not invested' },
      { goal: 'New car', amount: '€5,000–25,000', rate: '2–3%', note: 'Short horizon — savings account is fine' },
      { goal: 'Home down payment', amount: '10–30% of purchase price', rate: '2–4%', note: 'At least 10% recommended in the NL market' },
      { goal: 'Long-term goal (5+ years)', amount: 'Any amount', rate: '5–8%', note: 'Only if you can tolerate short-term volatility' },
    ] as { goal: string; amount: string; rate: string; note: string }[],
    termTitle: 'Short-term vs long-term goals',
    termP1: 'For money you need within three years, keep it in a savings account or spaardeposito. The interest rate is lower but the money is there when you need it and will not drop 30% the week before you spend it.',
    termP2: 'For goals five or more years away, you have the option of investing instead. An index fund returning 6–7% per year means you need to save significantly less each month to hit the same target. The trade-off is that returns are not guaranteed and the balance will fluctuate.',
    termP3: 'Rule of thumb: if you cannot afford to see your balance drop 25% for a year without panicking or needing the money, keep it in savings.',
    automateTitle: 'Automate it or it will not happen',
    automateP1: 'The single most reliable thing you can do is set up an automatic transfer to a separate savings account on the day your salary arrives. Before you see the money, it is already moved.',
    automateP2: 'Most Dutch banks — ING, Rabobank, ABN AMRO, Bunq — let you create named savings pots with automatic transfers. Name the pot after the goal. Seeing "Holiday 2027" at €4,800 of €6,000 is more motivating than a number on a spreadsheet.',
    faqTitle: 'Frequently asked questions',
    faqs: [
      ['How do I calculate how much to save per month?', 'Divide the remaining amount you need (goal minus what you already have) by the number of months you have. Then adjust slightly upward to account for compound interest working in your favour. The calculator above does this automatically — just switch to "How much per month?" mode.'],
      ['How much should I have in an emergency fund?', 'The standard recommendation is 3–6 months of essential expenses (rent, food, utilities, insurance). If your income is variable or your job is less stable, aim for 6 months. Keep it in a separate, easily accessible savings account — not invested.'],
      ['Is it better to save or invest for a long-term goal?', 'If your goal is 5+ years away, investing in a low-cost index fund typically beats a savings account. Dutch savings rates currently run 2–3%, while a global index fund has historically returned 6–8% per year over long periods. But never invest money you might need within 3 years.'],
      ['What interest rate should I use in the savings calculator?', 'For a savings account: use 2–3% (current Dutch rates). For a beleggersrekening (investment account): use 5–7% for long-term projections, but understand this is an estimate based on historical returns — actual returns vary.'],
    ] as [string, string][],
  },
  nl: {
    reverseTitle: 'Terugrekenen vanuit je doel',
    reverseP1: 'De meeste spaarcalculators vertellen je wat een maandelijkse inleg over tijd groeit. Deze doet het omgekeerde: je geeft op wat je wilt sparen en wanneer je het nodig hebt, en de calculator vertelt precies hoeveel je elke maand opzij moet zetten.',
    reverseP2: 'Zo is plannen veel makkelijker. In plaats van lukraak sparen en hopen dat het genoeg is, begin je met het doel en reken je terug.',
    exampleTitle: 'Rekenvoorbeeld',
    exampleSubtitle: 'Spaardoel € 15.000 · al gespaard € 2.000 · 3% rendement per jaar',
    col1Label: 'Doel', col1Value: '€ 15.000', col1Note: 'doelbedrag',
    col2Label: 'Al gespaard', col2Value: '€ 2.000', col2Note: 'startsaldo',
    col3Label: 'Per maand nodig', col3Value: '~€ 400', col3Note: 'voor ~30 maanden',
    fasterLabel: 'Sneller sparen?',
    faster2y: 'Doel in 2 jaar', faster2yDesc: 'Je moet circa € 535 per maand sparen',
    faster4y: 'Doel in 4 jaar', faster4yDesc: 'Je moet circa € 265 per maand sparen',
    rateTitle: 'Het juiste rendement kiezen voor je spaardoel',
    rateIntro: 'Het rendement dat je invult maakt veel uit over lange periodes, maar weinig over korte. Voor een doel dat je over twee jaar nodig hebt, is het verschil tussen 2% en 4% klein. Voor een doel over 20 jaar is het enorm.',
    goals: [
      { goal: 'Noodfonds', amount: '3–6 maanden vaste lasten', rate: '2–3%', note: 'Op een spaarrekening, niet belegd' },
      { goal: 'Nieuwe auto', amount: '€ 5.000–25.000', rate: '2–3%', note: 'Korte horizon — gewone spaarrekening volstaat' },
      { goal: 'Eigen inbreng woning', amount: '10–30% van de koopprijs', rate: '2–4%', note: 'Minimaal 10% is sterk aanbevolen op de Nederlandse markt' },
      { goal: 'Langetermijndoel (5+ jaar)', amount: 'Elk bedrag', rate: '5–8%', note: 'Alleen als je kortetermijnschommelingen kunt verdragen' },
    ] as { goal: string; amount: string; rate: string; note: string }[],
    termTitle: 'Kortetermijn vs langetermijn spaardoelen',
    termP1: 'Geld dat je binnen drie jaar nodig hebt, bewaar je op een spaarrekening of spaardeposito. De rente is lager, maar het geld is beschikbaar wanneer je het nodig hebt en daalt niet 30% vlak voor je het wilt gebruiken.',
    termP2: 'Voor doelen van vijf jaar of langer heb je de optie om te beleggen. Een indexfonds dat 6–7% per jaar rendeert betekent dat je aanzienlijk minder per maand hoeft in te leggen om hetzelfde doel te bereiken. De afweging: rendement is niet gegarandeerd en het saldo schommelt.',
    termP3: 'Vuistregel: als je het je niet kunt veroorloven om je saldo een jaar lang 25% te zien dalen zonder in paniek te raken of het geld nodig te hebben, kies dan voor sparen.',
    automateTitle: 'Automatiseer het, anders lukt het niet',
    automateP1: 'De meest betrouwbare aanpak is een automatische overschrijving instellen naar een aparte spaarrekening op de dag dat je salaris binnenkomt. Voordat je het geld ziet, staat het al apart.',
    automateP2: 'De meeste Nederlandse banken — ING, Rabobank, ABN AMRO, Bunq — laten je spaarpotjes aanmaken met een naam en automatische overboekingen. Noem het potje naar je doel. "Vakantie 2027" op € 4.800 van € 6.000 is veel motiverender dan een getal op een spreadsheet.',
    faqTitle: 'Veelgestelde vragen over sparen',
    faqs: [
      ['Hoeveel moet ik per maand sparen voor mijn spaardoel?', 'Deel het resterende bedrag (doel min wat je al hebt) door het aantal maanden dat je hebt. Reken iets hoger om rekening te houden met rente. De calculator hierboven doet dit automatisch — zet hem op "Hoeveel per maand?" en vul je gegevens in.'],
      ['Hoeveel moet er in mijn noodfonds zitten?', 'De standaardaanbeveling is 3–6 maanden aan vaste lasten (huur, boodschappen, energie, verzekeringen). Is je inkomen variabel of is je baan minder zeker, ga dan voor 6 maanden. Bewaar het op een aparte, direct opvraagbare spaarrekening — niet belegd.'],
      ['Is sparen of beleggen beter voor een langetermijndoel?', 'Als je doel 5 jaar of meer weg is, levert beleggen in een goedkoop indexfonds doorgaans meer op dan een spaarrekening. Nederlandse spaarrentes liggen momenteel op 2–3%, terwijl een wereldwijd indexfonds historisch 6–8% per jaar heeft behaald over lange periodes. Beleg nooit geld dat je binnen 3 jaar nodig kunt hebben.'],
      ['Welk rendement moet ik invullen in de spaardoel calculator?', 'Voor een spaarrekening: gebruik 2–3% (huidige Nederlandse rentes). Voor een beleggersrekening: gebruik 5–7% voor langetermijnprojecties, maar begrijp dat dit een schatting is op basis van historische rendementen — werkelijke rendementen variëren per jaar.'],
      ['Wat is een goed spaardoel om mee te beginnen?', 'Een noodfonds van 3 maanden vaste lasten is het eerste en belangrijkste doel voor iedereen. Daarna: een eigen inbreng voor een woning (als dat je plan is) of een doelbedrag voor grote aankopen. Concrete, benoemde doelen werken beter dan "zoveel mogelijk sparen".'],
    ] as [string, string][],
  },
};

export default async function SavingsGoalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = lang === 'nl' ? 'nl' : 'en';
  const c = EDITORIAL[l];

  return (
    <>
      <SavingsGoalCalculator lang={lang} />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{c.reverseTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.reverseP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.reverseP2}</p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">{c.exampleTitle}</h2>
          <p className="text-sm text-emerald-deep/50 mb-8">{c.exampleSubtitle}</p>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              { label: c.col1Label, value: c.col1Value, note: c.col1Note, gold: false },
              { label: c.col2Label, value: c.col2Value, note: c.col2Note, gold: false },
              { label: c.col3Label, value: c.col3Value, note: c.col3Note, gold: true },
            ].map(({ label, value, note, gold }) => (
              <div key={label}>
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${gold ? 'text-gold' : 'text-emerald-deep/40'}`}>{label}</p>
                <p className="font-display text-3xl font-bold text-emerald-deep">{value}</p>
                <p className="text-xs text-emerald-deep/50 mt-1">{note}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-emerald-deep/10 pt-5">
            <p className="text-sm text-emerald-deep/60 mb-3">{c.fasterLabel}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/50 p-4">
                <p className="text-xs font-bold text-emerald-deep mb-1">{c.faster2y}</p>
                <p className="text-sm text-emerald-deep/70">{c.faster2yDesc}</p>
              </div>
              <div className="bg-white/50 p-4">
                <p className="text-xs font-bold text-emerald-deep mb-1">{c.faster4y}</p>
                <p className="text-sm text-emerald-deep/70">{c.faster4yDesc}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{c.rateTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">{c.rateIntro}</p>
          <div className="divide-y divide-emerald-deep/10 border-t border-emerald-deep/10">
            {c.goals.map(({ goal, amount, rate, note }) => (
              <div key={goal} className="py-4">
                <div className="flex justify-between items-start mb-1.5">
                  <p className="text-sm font-semibold text-emerald-deep">{goal}</p>
                  <p className="font-display font-bold text-emerald-deep text-base ml-4 shrink-0">{rate}</p>
                </div>
                <p className="text-xs text-emerald-deep/50">{amount} · {note}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{c.termTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.termP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.termP2}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.termP3}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{c.automateTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.automateP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.automateP2}</p>
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

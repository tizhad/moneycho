import type { Metadata } from 'next';
import TakeHomePayCalculator from './TakeHomePayCalculator';

const SLUG = 'take-home-pay';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Take-Home Pay Calculator Netherlands 2026 — Net Salary',
    description:
      'Calculate your Dutch net salary after income tax, social contributions, and tax credits. Official 2026 Box 1 rates, vakantiegeld included. Free, no signup.',
  },
  nl: {
    title: 'Nettoloon Berekenen 2026 — Netto Salaris Calculator',
    description:
      'Bereken je netto salaris uit je bruto loon. Officiële Box 1-tarieven 2026, algemene heffingskorting, arbeidskorting en vakantiegeld. Gratis en direct.',
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
    howTitle: 'How Dutch income tax works in 2026',
    howP1:
      'The Netherlands uses a three-bracket system for employment income (Box 1). Up to €38,883 you pay 35.75%. From €38,883 to €78,426 you pay 37.56%. Everything above €78,426 is taxed at 49.50%. The brackets include both income tax and national insurance contributions, so the percentages already reflect your total obligation to the state, not just the tax portion.',
    howP2:
      'On paper those rates look high. In practice, tax credits bring your effective rate down considerably. Most employees pay an effective rate of 20 to 30% on their total gross income, not the marginal rate.',
    exampleTitle: 'Worked example',
    exampleSubtitle: '€50,000 gross annual salary (excl. holiday pay), single, no deductions',
    exampleCols: [
      ['Gross annual', '50,000'],
      ['Tax after credits', '~10,900'],
      ['Net annual', '~39,100'],
      ['Net monthly', '~3,260'],
    ] as [string, string][],
    exampleNote:
      'Vakantiegeld (holiday allowance) of 8% is paid on top of this, usually in May or June. That adds €4,000 gross in a year, which nets to roughly €2,000 after tax — at this income the marginal rate on extra income is around 50% once the phase-out of both tax credits is included.',
    creditsTitle: 'Tax credits that reduce what you actually pay',
    creditsIntro:
      'Two credits apply to most employees. They reduce your tax bill directly, not just your taxable income, so they matter more than most deductions.',
    credits: [
      [
        'Algemene heffingskorting (general tax credit)',
        'Up to €3,115 per year in 2026. This phases out at 6.398% as income rises above €29,736 and is gone entirely at €78,426. At €50,000 gross you still receive roughly €1,800.',
      ],
      [
        'Arbeidskorting (employment tax credit)',
        'Up to €5,685 per year in 2026. This credit rewards employment: it builds up as your income rises to €45,592, then phases out at 6.51%, disappearing around €132,920. Most people earning between €25,000 and €80,000 receive a substantial credit.',
      ],
    ] as [string, string][],
    vgTitle: 'Vakantiegeld: what it is and when you get it',
    vgP1:
      'Vakantiegeld is an 8% holiday allowance that Dutch law requires employers to pay on top of regular salary. It accrues each month (8% of that month\'s gross pay) and is typically paid out as a lump sum in May or June.',
    vgP2:
      'Because it is paid all at once, it is taxed at your highest marginal rate (the payroll "bijzonder tarief"), so the net amount is noticeably less than 8% of your net salary. Your employer handles the withholding, so you do not need to do anything, but it is worth knowing so the amount in your account does not surprise you.',
    vgP3:
      'Some employers spread it across monthly payments instead of paying it in a lump sum. Both approaches are legal. If you are unsure how your employer handles it, check your arbeidsovereenkomst (employment contract) or ask HR.',
    payslipTitle: 'Why your payslip might look different',
    payslipP1:
      'This calculator gives you a reliable estimate, but your actual take-home can differ for a few reasons. Company pension contributions (pensioenpremie) reduce your taxable gross. Benefits like a lease car, reiskostenvergoeding (travel allowance), or a company phone affect the calculation. Partner income changes the optimal tax filing strategy.',
    payslipP2:
      'For an authoritative number, use the Belastingdienst online tool or speak with a salaris specialist. This calculator is most useful for quick comparisons: does a €5,000 raise actually change your net by €5,000? No. Does it change it by roughly €2,500? Yes.',
  },
  nl: {
    howTitle: 'Zo werkt de inkomstenbelasting in 2026',
    howP1:
      'Nederland gebruikt drie belastingschijven voor inkomen uit werk (Box 1). Tot € 38.883 betaal je 35,75%. Van € 38.883 tot € 78.426 betaal je 37,56%. Alles boven € 78.426 wordt belast tegen 49,50%. De schijven omvatten zowel inkomstenbelasting als premies volksverzekeringen — de percentages zijn dus je totale afdracht, niet alleen het belastingdeel.',
    howP2:
      'Op papier ogen die tarieven hoog. In de praktijk drukken de heffingskortingen je effectieve belastingdruk flink. De meeste werknemers betalen effectief 20 tot 30% over hun totale bruto inkomen, niet het marginale tarief.',
    exampleTitle: 'Rekenvoorbeeld',
    exampleSubtitle: '€ 50.000 bruto jaarsalaris (excl. vakantiegeld), alleenstaand, geen aftrekposten',
    exampleCols: [
      ['Bruto per jaar', '50.000'],
      ['Belasting na kortingen', '~10.900'],
      ['Netto per jaar', '~39.100'],
      ['Netto per maand', '~3.260'],
    ] as [string, string][],
    exampleNote:
      'Hier komt nog 8% vakantiegeld bovenop, meestal uitbetaald in mei of juni. Dat is € 4.000 bruto per jaar, waarvan netto circa € 2.000 overblijft — bij dit inkomen is het marginale tarief op extra inkomen ongeveer 50% door de afbouw van beide heffingskortingen.',
    creditsTitle: 'Heffingskortingen: wat je werkelijk minder betaalt',
    creditsIntro:
      'Twee kortingen gelden voor de meeste werknemers. Ze verlagen je belasting direct — niet alleen je belastbaar inkomen — en zijn daarmee belangrijker dan de meeste aftrekposten.',
    credits: [
      [
        'Algemene heffingskorting',
        'Maximaal € 3.115 per jaar in 2026. De korting bouwt af met 6,398% naarmate je inkomen boven € 29.736 stijgt en is volledig verdwenen bij € 78.426. Bij € 50.000 bruto ontvang je nog circa € 1.800.',
      ],
      [
        'Arbeidskorting',
        'Maximaal € 5.685 per jaar in 2026. Deze korting beloont werken: hij loopt op tot een inkomen van € 45.592 en bouwt daarna af met 6,51%, tot nul rond € 132.920. De meeste mensen met een inkomen tussen € 25.000 en € 80.000 ontvangen een substantiële korting.',
      ],
    ] as [string, string][],
    vgTitle: 'Vakantiegeld: wat het is en wanneer je het krijgt',
    vgP1:
      'Vakantiegeld is de wettelijke vakantiebijslag van 8% die werkgevers bovenop het reguliere salaris moeten betalen. Het bouwt maandelijks op (8% van het bruto maandloon) en wordt doorgaans in mei of juni als één bedrag uitbetaald.',
    vgP2:
      'Omdat het in één keer wordt uitbetaald, wordt het belast tegen je hoogste marginale tarief (het "bijzonder tarief" op de loonstrook). Netto houd je er dus merkbaar minder aan over dan 8% van je netto salaris. Je werkgever regelt de inhouding — je hoeft zelf niets te doen, maar zo weet je waarom het bedrag lager uitvalt dan verwacht.',
    vgP3:
      'Sommige werkgevers spreiden het vakantiegeld over de maandelijkse betalingen. Beide vormen zijn toegestaan. Twijfel je hoe jouw werkgever het regelt? Check je arbeidsovereenkomst of vraag het HR.',
    payslipTitle: 'Waarom je loonstrook kan afwijken',
    payslipP1:
      'Deze calculator geeft een betrouwbare indicatie, maar je werkelijke nettoloon kan om een paar redenen afwijken. Pensioenpremie verlaagt je belastbaar bruto. Een leaseauto, reiskostenvergoeding of telefoon van de zaak beïnvloedt de berekening. En partnerinkomen verandert de optimale aangiftestrategie.',
    payslipP2:
      'Voor een officieel getal gebruik je de tool van de Belastingdienst of een salarisspecialist. Deze calculator is vooral handig voor snelle vergelijkingen: levert € 5.000 loonsverhoging netto € 5.000 op? Nee. Ongeveer € 2.500? Ja.',
  },
} as const;

export default async function TakeHomePayPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = lang === 'nl' ? 'nl' : 'en';
  const c = EDITORIAL[l];

  return (
    <>
      <TakeHomePayCalculator lang={lang} />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            {c.howTitle}
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.howP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.howP2}</p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            {c.exampleTitle}
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">{c.exampleSubtitle}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {c.exampleCols.map(([label, value], i) => (
              <div key={label}>
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${i >= 2 ? 'text-gold' : 'text-emerald-deep/40'}`}>{label}</p>
                <p className="font-display text-xl font-bold text-emerald-deep">{value}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-emerald-deep/60 border-t border-emerald-deep/10 pt-5">
            {c.exampleNote}
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            {c.creditsTitle}
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">{c.creditsIntro}</p>
          <div className="space-y-4">
            {c.credits.map(([label, desc]) => (
              <div key={label} className="border-b border-emerald-deep/10 pb-4">
                <p className="text-sm font-bold text-emerald-deep mb-1">{label}</p>
                <p className="text-sm text-emerald-deep/65 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            {c.vgTitle}
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.vgP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.vgP2}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.vgP3}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            {c.payslipTitle}
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{c.payslipP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{c.payslipP2}</p>
        </section>

      </div>
    </>
  );
}

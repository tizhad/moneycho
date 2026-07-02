import type { Metadata } from 'next';
import KostenKoperCalculator from './KostenKoperCalculator';
import { RelatedContent } from '@/components/RelatedContent';

const SLUG = 'kosten-koper';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: "Dutch Buyer's Costs Calculator (Kosten Koper) — 2026",
    description:
      "Calculate all closing costs when buying a home in the Netherlands: transfer tax, notary fees, NHG, and mortgage advisor. Free kosten koper calculator for 2026.",
  },
  nl: {
    title: 'Kosten Koper Calculator 2026 — Bereken Bijkomende Kosten',
    description:
      'Bereken alle kosten koper bij het kopen van een huis: overdrachtsbelasting, notariskosten, NHG en hypotheekadvies. Gratis en direct voor 2026.',
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

const COSTS_TABLE = {
  en: [
    { item: 'Transfer tax (overdrachtsbelasting)', who: 'Fixed', amount: '2% of purchase price (0% starter < 35 yr, ≤ €510K)' },
    { item: 'Notary — transfer deed', who: 'Variable', amount: '€900 – €1,500' },
    { item: 'Notary — mortgage deed', who: 'Variable', amount: '€450 – €900 (if mortgage)' },
    { item: 'Appraisal (taxatie)', who: 'Variable', amount: '€500 – €800' },
    { item: 'NHG guarantee fee', who: 'Fixed', amount: '0.6% of mortgage (if ≤ €435K)' },
    { item: 'Mortgage advisor', who: 'Variable', amount: '€1,500 – €3,500' },
    { item: 'Building inspection', who: 'Optional', amount: '€300 – €600' },
    { item: "Buyer's agent (aankoopmakelaar)", who: 'Optional', amount: '1.0 – 1.5% of purchase price' },
  ],
  nl: [
    { item: 'Overdrachtsbelasting', who: 'Vast', amount: '2% van koopprijs (0% starter < 35 jr, ≤ € 510K)' },
    { item: 'Notaris — leveringsakte', who: 'Variabel', amount: '€ 900 – € 1.500' },
    { item: 'Notaris — hypotheekakte', who: 'Variabel', amount: '€ 450 – € 900 (bij hypotheek)' },
    { item: 'Taxatiekosten', who: 'Variabel', amount: '€ 500 – € 800' },
    { item: 'NHG borgtochtprovisie', who: 'Vast', amount: '0,6% van hypotheek (bij ≤ € 435K)' },
    { item: 'Hypotheekadvies & bemiddeling', who: 'Variabel', amount: '€ 1.500 – € 3.500' },
    { item: 'Bouwkundige keuring', who: 'Optioneel', amount: '€ 300 – € 600' },
    { item: 'Aankoopmakelaar', who: 'Optioneel', amount: '1,0 – 1,5% van koopprijs' },
  ],
} as const;

const EDITORIAL = {
  en: {
    whatTitle: "What are buyer's closing costs in the Netherlands?",
    whatP1:
      "When you buy a home in the Netherlands, you pay more than the purchase price. The additional costs — called kosten koper — typically run 3%–6% of the purchase price on top. These are paid at completion and must come from your own savings, not from your mortgage.",
    whatP2:
      "The single largest cost is usually transfer tax (overdrachtsbelasting) at 2%. First-time buyers under 35 purchasing a home up to €510,000 are exempt — a saving that can be worth €7,000–€10,200 at typical Amsterdam prices.",
    costsTitle: "Overview of all buyer's costs",
    costsNote: "* Column type: Fixed = exact percentage; Variable = ranges depend on your notary/provider; Optional = your choice.",
    costsHeader: ['Cost item', 'Type', 'Amount (2026)'],
    starterTitle: "Starter exemption (startersvrijstelling) explained",
    starterP1:
      "First-time buyers under 35 pay 0% transfer tax on homes up to €510,000 (2026 limit). On a €350,000 home, that saves you €7,000. On a home at the limit, it saves €10,200.",
    starterP2:
      "You can only use the exemption once. Both conditions must be met at the time of signing the notarial transfer deed: you must be under 35, and the purchase price must not exceed the limit. The limit is revised annually.",
    nhgTitle: "NHG — worth it for most buyers",
    nhgP1:
      "NHG (Nationale Hypotheek Garantie) is a government-backed guarantee on mortgages up to €435,000 (2026). It has two benefits: lenders typically offer 0.4–0.7% lower rates to NHG borrowers, and if you are ever forced to sell at a loss, NHG covers the residual debt.",
    nhgP2:
      "The one-off fee is 0.6% of your mortgage amount. On a €350,000 mortgage that costs €2,100 — usually recouped within a year through the lower interest rate.",
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'How much are buyer\'s costs in the Netherlands?',
        a: 'Typically 3%–6% of the purchase price, depending on whether you qualify for the starter exemption (0% transfer tax) and which optional services you use. The main fixed cost is 2% transfer tax. Notary, appraisal, and advisor fees are variable. Use the calculator above for your specific situation.',
      },
      {
        q: 'What is the starter exemption (startersvrijstelling)?',
        a: 'First-time buyers under 35 pay 0% transfer tax instead of 2%, but only if the purchase price does not exceed €510,000 (2026 limit). You can only use this exemption once in your life. The saving equals 2% of the purchase price — up to €10,200 at the limit.',
      },
      {
        q: 'Can I include buyer\'s costs in my mortgage?',
        a: 'No. In the Netherlands, the maximum mortgage is 100% of the appraised property value. Buyer\'s costs must be paid from your own savings. This is often why lenders and advisors suggest having at least 5%–10% of the purchase price in savings before buying.',
      },
      {
        q: 'Do I need a mortgage advisor (hypotheekadviseur)?',
        a: 'It is not legally required, but strongly recommended. Dutch mortgage products are complex, and an advisor has access to rates from multiple lenders. The fee of €1,500–€3,500 is often recouped through a better rate. Advisors are legally required to give you independent advice.',
      },
      {
        q: 'What is NHG and do I need it?',
        a: 'NHG (Nationale Hypotheek Garantie) is a government guarantee on mortgages up to €435,000. It lowers your interest rate by roughly 0.4–0.7% and protects you if you must sell at a loss. The one-off fee is 0.6% of your mortgage. For most buyers under the limit, NHG is worth it.',
      },
    ],
  },
  nl: {
    whatTitle: 'Wat zijn kosten koper?',
    whatP1:
      'Bij het kopen van een huis in Nederland betaal je meer dan de koopprijs. De bijkomende kosten — de kosten koper — bedragen doorgaans 3%–6% van de koopprijs. Deze kosten worden betaald bij de overdracht en moeten uit eigen middelen komen; ze zijn niet meefinancieerbaar in je hypotheek.',
    whatP2:
      'De grootste eenmalige kostenpost is doorgaans de overdrachtsbelasting van 2%. Starters jonger dan 35 jaar die een woning kopen tot € 510.000 zijn hiervan vrijgesteld — bij een woning van € 350.000 scheelt dat € 7.000.',
    costsTitle: 'Overzicht van alle kosten koper',
    costsNote: '* Kolom type: Vast = exact percentage; Variabel = afhankelijk van notaris/aanbieder; Optioneel = eigen keuze.',
    costsHeader: ['Kostenpost', 'Type', 'Bedrag (2026)'],
    starterTitle: 'Startersvrijstelling uitgelegd',
    starterP1:
      'Starters jonger dan 35 jaar betalen 0% overdrachtsbelasting op woningen tot € 510.000 (grens 2026). Op een woning van € 350.000 bespaar je daarmee € 7.000. Op een woning aan de grens bespaar je maximaal € 10.200.',
    starterP2:
      'Je kunt de vrijstelling maar één keer gebruiken. Op het moment van de notariële leveringsakte moet je jonger zijn dan 35 jaar én mag de koopprijs de grens niet overschrijden. De grens wordt jaarlijks herzien.',
    nhgTitle: 'NHG — de moeite waard voor de meeste kopers',
    nhgP1:
      'NHG (Nationale Hypotheek Garantie) is een overheidsgarantie op hypotheken tot € 435.000 (grens 2026). Het heeft twee voordelen: geldverstrekkers bieden NHG-hypotheken doorgaans 0,4–0,7% lagere rente, en bij gedwongen verkoop met restschuld wordt die schuld door NHG kwijtgescholden.',
    nhgP2:
      'De eenmalige borgtochtprovisie bedraagt 0,6% van de hypotheek. Op een hypotheek van € 350.000 is dat € 2.100 — meestal terugverdiend binnen een jaar dankzij de lagere rente.',
    faqTitle: 'Veelgestelde vragen over kosten koper',
    faqs: [
      {
        q: 'Hoeveel procent zijn kosten koper in Nederland?',
        a: 'Doorgaans 3%–6% van de koopprijs, afhankelijk van of je recht hebt op de startersvrijstelling (0% overdrachtsbelasting) en welke optionele diensten je afneemt. De grootste vaste kostenpost is 2% overdrachtsbelasting. Notariskosten, taxatiekosten en advieskosten zijn variabel. Gebruik de calculator hierboven voor jouw situatie.',
      },
      {
        q: 'Wat is de startersvrijstelling?',
        a: 'Starters jonger dan 35 jaar betalen 0% overdrachtsbelasting in plaats van 2%, maar alleen als de koopprijs niet hoger is dan € 510.000 (grens 2026). Je kunt de vrijstelling maar één keer in je leven gebruiken. De besparing is gelijk aan 2% van de koopprijs — maximaal € 10.200 aan de grens.',
      },
      {
        q: 'Kan ik kosten koper meefinancieren in mijn hypotheek?',
        a: 'Nee. In Nederland mag je maximaal 100% van de taxatiewaarde lenen. Kosten koper moeten uit eigen middelen betaald worden. Daarom adviseren geldverstrekkers en hypotheekadviseurs om bij aankoop van een woning minimaal 5%–10% van de koopprijs aan eigen spaargeld achter de hand te hebben.',
      },
      {
        q: 'Heb ik een hypotheekadviseur nodig?',
        a: 'Het is niet wettelijk verplicht, maar wel sterk aan te raden. Nederlandse hypotheekproducten zijn complex en een adviseur heeft toegang tot tarieven van meerdere geldverstrekkers. De advieskosten van € 1.500–€ 3.500 worden vaak terugverdiend via een betere rente. Adviseurs zijn wettelijk verplicht tot onafhankelijk advies.',
      },
      {
        q: 'Wat is NHG en heb ik er recht op?',
        a: 'NHG (Nationale Hypotheek Garantie) is een overheidsgarantie op hypotheken tot € 435.000 (grens 2026). Het verlaagt je rente met circa 0,4–0,7% en beschermt je bij gedwongen verkoop met restschuld. De eenmalige borgtochtprovisie is 0,6% van de hypotheek. Voor de meeste kopers onder de grens is NHG de moeite waard.',
      },
    ],
  },
} as const;

export default async function KostenKoperPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = lang === 'nl' ? 'nl' : 'en';
  const ed = EDITORIAL[l];
  const costs = COSTS_TABLE[l];

  return (
    <>
      <KostenKoperCalculator lang={lang} />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{ed.whatTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{ed.whatP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{ed.whatP2}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{ed.costsTitle}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-emerald-deep/15">
                  {ed.costsHeader.map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 pr-6 text-xs font-bold uppercase tracking-widest text-emerald-deep/40"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-deep/8">
                {costs.map(({ item, who, amount }) => (
                  <tr key={item} className="hover:bg-emerald-deep/[0.02] transition-colors">
                    <td className="py-3.5 pr-6 font-medium text-emerald-deep">{item}</td>
                    <td className="py-3.5 pr-6 text-emerald-deep/50">{who}</td>
                    <td className="py-3.5 text-emerald-deep/70">{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-emerald-deep/35 mt-3">{ed.costsNote}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{ed.starterTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{ed.starterP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{ed.starterP2}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">{ed.nhgTitle}</h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">{ed.nhgP1}</p>
          <p className="text-emerald-deep/70 leading-relaxed">{ed.nhgP2}</p>
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
      <RelatedContent lang={lang} slug="calculator:kosten-koper" />
    </>
  );
}

import Link from 'next/link';

export const DISCLOSURE_PATHS = {
  nl: '/nl/verdienmodel',
  en: '/en/how-we-make-money',
} as const;

const COPY = {
  en: {
    updated: 'Last updated: July 7, 2026',
    h1: 'How does MoneyCho make money?',
    intro:
      'Short answer: today, it does not. Everything on MoneyCho is free, without ads and without signup. This page explains how that will change, and which rules will never change.',
    sections: [
      {
        h: 'Today: no revenue',
        p: 'MoneyCho currently earns nothing. There are no ads, no partner links, no paid placements, and we do not sell data. We are building the tools and the trust first.',
      },
      {
        h: 'Soon: labeled partner links',
        p: 'To keep the calculators free, we plan to add partner links: when you open a financial product (such as a savings account or a mortgage consultation) through certain outbound links, the provider may pay us a commission. You never pay more because of this — the commission comes out of the provider\'s marketing budget.',
      },
      {
        h: 'The rules that never change',
        list: [
          'Calculator results never contain paid placement. No provider can buy a position in any result, table, or comparison.',
          'A commission never changes a number. The math is the math, whether a partner pays us or not.',
          'Partner links are always labeled before you click — visibly, not hidden behind a hover or a footnote.',
          'We do not promote consumer credit. Products that make people poorer have no place here.',
          'We do not sell or share your data. See the privacy policy for what little we process.',
        ],
      },
      {
        h: 'Why we tell you this',
        p: 'A finance site asking for your trust should show its incentives. If you ever see anything on MoneyCho that seems to conflict with these rules, tell us via the contact page — we will fix it or explain it.',
      },
    ],
    privacyLink: 'Read the privacy policy',
    aboutLink: 'About MoneyCho',
  },
  nl: {
    updated: 'Laatst bijgewerkt: 7 juli 2026',
    h1: 'Hoe verdient MoneyCho geld?',
    intro:
      'Het korte antwoord: op dit moment nog niet. Alles op MoneyCho is gratis, zonder advertenties en zonder account. Op deze pagina lees je hoe dat gaat veranderen — en welke regels nooit veranderen.',
    sections: [
      {
        h: 'Vandaag: geen inkomsten',
        p: 'MoneyCho verdient op dit moment niets. Er zijn geen advertenties, geen partnerlinks, geen betaalde plaatsingen, en we verkopen geen gegevens. We bouwen eerst de tools en het vertrouwen.',
      },
      {
        h: 'Binnenkort: gelabelde partnerlinks',
        p: 'Om de calculators gratis te houden, willen we partnerlinks toevoegen: open je via bepaalde uitgaande links een financieel product (zoals een spaarrekening of een hypotheekgesprek), dan kan de aanbieder ons een commissie betalen. Jij betaalt daardoor nooit meer — de commissie komt uit het marketingbudget van de aanbieder.',
      },
      {
        h: 'De regels die nooit veranderen',
        list: [
          'Calculatorresultaten bevatten nooit betaalde plaatsing. Geen enkele aanbieder kan een positie kopen in een resultaat, tabel of vergelijking.',
          'Een commissie verandert nooit een getal. De berekening is de berekening, of een partner ons nu betaalt of niet.',
          'Partnerlinks zijn altijd gelabeld vóórdat je klikt — zichtbaar, niet verstopt achter een hover of voetnoot.',
          'We promoten geen consumptief krediet. Producten die mensen armer maken horen hier niet thuis.',
          'We verkopen of delen je gegevens niet. Zie het privacybeleid voor het weinige dat we verwerken.',
        ],
      },
      {
        h: 'Waarom we dit vertellen',
        p: 'Een financiële site die om je vertrouwen vraagt, hoort zijn belangen te laten zien. Zie je ooit iets op MoneyCho dat met deze regels lijkt te botsen? Meld het via de contactpagina — we lossen het op of leggen het uit.',
      },
    ],
    privacyLink: 'Lees het privacybeleid',
    aboutLink: 'Over MoneyCho',
  },
} as const;

export function DisclosureContent({ lang }: { lang: 'en' | 'nl' }) {
  const c = COPY[lang];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">{c.updated}</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-6">
        {c.h1}
      </h1>
      <p className="text-emerald-deep/70 leading-relaxed mb-12">{c.intro}</p>

      <div className="space-y-10">
        {c.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-xl font-bold text-emerald-deep mb-3">{s.h}</h2>
            {'p' in s && s.p && (
              <p className="text-emerald-deep/70 leading-relaxed">{s.p}</p>
            )}
            {'list' in s && s.list && (
              <ul className="space-y-3">
                {s.list.map((item) => (
                  <li key={item.slice(0, 40)} className="border-l-2 border-gold pl-4 text-emerald-deep/70 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-14 pt-8 border-t border-emerald-deep/10 flex flex-wrap gap-6">
        <Link
          href={`/${lang}/privacy`}
          className="text-sm font-bold text-emerald-deep border-b border-emerald-deep/30 hover:border-emerald-deep transition-colors pb-0.5 no-underline"
        >
          {c.privacyLink} →
        </Link>
        <Link
          href={`/${lang}/about`}
          className="text-sm font-bold text-emerald-deep border-b border-emerald-deep/30 hover:border-emerald-deep transition-colors pb-0.5 no-underline"
        >
          {c.aboutLink} →
        </Link>
      </div>
    </div>
  );
}

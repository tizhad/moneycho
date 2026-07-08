import type { Metadata } from 'next';

const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Privacy & Cookie Policy',
    description:
      'How MoneyCho handles your data: calculators run in your browser, one functional cookie, cookieless analytics, no data sold. Read the full policy.',
    updated: 'Last updated: July 7, 2026',
    h1: 'Privacy & Cookie Policy',
    intro:
      'MoneyCho is built to need as little of your data as possible. This page describes exactly what we process, why, and what your rights are. No legal maze — if anything is unclear, ask us via the contact page.',
    sections: [
      {
        h: 'Who we are',
        p: [
          'MoneyCho (moneycho.com) provides free financial calculators and guides for the Netherlands. MoneyCho is currently operated as a personal project without a registered business entity; a legal entity will be added here once registered. For all privacy questions or requests, use the contact page.',
        ],
      },
      {
        h: 'Calculators: everything stays in your browser',
        p: [
          'All calculator inputs (income, mortgage amounts, debts, savings) are processed entirely in your browser. They are never sent to our servers, never stored by us, and disappear when you close the page.',
        ],
      },
      {
        h: 'Receipt scanner',
        p: [
          'If you use the receipt scanner tool, the photo you upload is sent to Google\'s Gemini API to extract the line items, and the result is returned to your browser. We do not store the image or the extracted data on our servers. Do not upload receipts containing information you do not want processed by Google; see Google\'s privacy policy for how they handle API data.',
        ],
      },
      {
        h: 'Cookies and local storage',
        p: [
          'We use one functional cookie: moneycho_locale, which remembers your language choice (EN/NL). Your currency preference is stored in your browser\'s localStorage and never leaves your device. We do not use advertising or tracking cookies, which is why you do not see a cookie banner.',
        ],
      },
      {
        h: 'Analytics',
        p: [
          'We use Vercel Analytics to count page visits. It is cookieless and aggregated: we see that a page was visited, not who visited it. No cross-site tracking, no advertising profiles.',
        ],
      },
      {
        h: 'Contact',
        p: [
          'If you contact us, we use the information you provide (such as your email address and message) only to respond to you. We do not add you to any mailing list.',
        ],
      },
      {
        h: 'Hosting',
        p: [
          'The site is hosted on Vercel. Like any web host, Vercel processes technical request data (such as IP addresses) to serve the site securely; see Vercel\'s privacy policy for details.',
        ],
      },
      {
        h: 'Your rights (GDPR/AVG)',
        p: [
          'Because we store almost nothing, most requests are simple. You still have the full set of GDPR rights: access, correction, deletion, restriction, portability, and objection. Contact us and we will respond within 30 days. You can also lodge a complaint with the Dutch supervisory authority, the Autoriteit Persoonsgegevens.',
        ],
      },
      {
        h: 'Changes to this policy',
        p: [
          'When our data practices change (for example, when we add a newsletter or partner links), we update this page and the date at the top before the change goes live.',
        ],
      },
    ],
  },
  nl: {
    title: 'Privacy- & Cookiebeleid',
    description:
      'Hoe MoneyCho met je gegevens omgaat: calculators draaien in je browser, één functionele cookie, cookieloze statistieken, geen dataverkoop. Lees het beleid.',
    updated: 'Laatst bijgewerkt: 7 juli 2026',
    h1: 'Privacy- & Cookiebeleid',
    intro:
      'MoneyCho is zo gebouwd dat we zo min mogelijk gegevens van je nodig hebben. Op deze pagina lees je precies wat we verwerken, waarom, en wat je rechten zijn. Geen juridisch doolhof — is iets onduidelijk, stel je vraag via de contactpagina.',
    sections: [
      {
        h: 'Wie wij zijn',
        p: [
          'MoneyCho (moneycho.com) biedt gratis financiële calculators en gidsen voor Nederland. MoneyCho wordt momenteel beheerd als persoonlijk project zonder geregistreerde onderneming; zodra er een rechtsvorm is, vermelden we die hier. Voor alle privacyvragen of -verzoeken gebruik je de contactpagina.',
        ],
      },
      {
        h: 'Calculators: alles blijft in je browser',
        p: [
          'Alle invoer in de calculators (inkomen, hypotheekbedragen, schulden, spaargeld) wordt volledig in je browser verwerkt. Deze gegevens worden nooit naar onze servers gestuurd, nooit door ons opgeslagen, en verdwijnen zodra je de pagina sluit.',
        ],
      },
      {
        h: 'Bonnetjesscanner',
        p: [
          'Gebruik je de bonnetjesscanner, dan wordt de foto die je uploadt naar de Gemini API van Google gestuurd om de artikelen uit te lezen; het resultaat komt terug in je browser. Wij slaan de foto en de uitgelezen gegevens niet op onze servers op. Upload geen bonnen met informatie die je niet door Google wilt laten verwerken; zie het privacybeleid van Google voor hun omgang met API-data.',
        ],
      },
      {
        h: 'Cookies en lokale opslag',
        p: [
          'We gebruiken één functionele cookie: moneycho_locale, die je taalkeuze (EN/NL) onthoudt. Je valutavoorkeur staat in de localStorage van je browser en verlaat je apparaat nooit. We gebruiken geen advertentie- of trackingcookies — daarom zie je ook geen cookiebanner.',
        ],
      },
      {
        h: 'Statistieken',
        p: [
          'We gebruiken Vercel Analytics om paginabezoeken te tellen. Dit werkt zonder cookies en is geaggregeerd: we zien dát een pagina is bezocht, niet wie hem bezocht. Geen cross-site tracking, geen advertentieprofielen.',
        ],
      },
      {
        h: 'Contact',
        p: [
          'Neem je contact met ons op, dan gebruiken we de gegevens die je verstrekt (zoals je e-mailadres en bericht) uitsluitend om je te antwoorden. We zetten je op geen enkele mailinglijst.',
        ],
      },
      {
        h: 'Hosting',
        p: [
          'De site wordt gehost op Vercel. Zoals elke webhost verwerkt Vercel technische verzoekgegevens (zoals IP-adressen) om de site veilig te kunnen leveren; zie het privacybeleid van Vercel voor details.',
        ],
      },
      {
        h: 'Jouw rechten (AVG)',
        p: [
          'Omdat we vrijwel niets opslaan, zijn de meeste verzoeken eenvoudig. Je hebt uiteraard alle AVG-rechten: inzage, correctie, verwijdering, beperking, overdraagbaarheid en bezwaar. Neem contact op en we reageren binnen 30 dagen. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.',
        ],
      },
      {
        h: 'Wijzigingen in dit beleid',
        p: [
          'Als onze gegevensverwerking verandert (bijvoorbeeld wanneer we een nieuwsbrief of partnerlinks toevoegen), werken we deze pagina en de datum bovenaan bij vóórdat de wijziging live gaat.',
        ],
      },
    ],
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
      canonical: `${BASE}/${lang}/privacy`,
      languages: {
        en: `${BASE}/en/privacy`,
        nl: `${BASE}/nl/privacy`,
        'x-default': `${BASE}/nl/privacy`,
      },
    },
    openGraph: { title: `${title} | MoneyCho`, description, type: 'website', url: `${BASE}/${lang}/privacy` },
    twitter: { card: 'summary', title: `${title} | MoneyCho`, description },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const c = COPY[lang === 'nl' ? 'nl' : 'en'];

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
            {s.p.map((para) => (
              <p key={para.slice(0, 40)} className="text-emerald-deep/70 leading-relaxed mb-3">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'About MoneyCho',
    description:
      'The story behind MoneyCho — built by a finance graduate and software developer who learned the hard way what European personal finance actually looks like.',
    eyebrow: 'About',
    h1: 'From financial confusion to smart choices.',
    intro:
      'If you have ever felt overwhelmed, confused, or even a bit terrified by the financial system in Europe, I want you to know that you are definitely not alone. I have been exactly where you are right now.',
    sections: [
      {
        heading: 'An unusual background',
        body: "I hold a Bachelor's degree in Financial Management, but for the past several years I have been working as a Software Developer. You would think that having a background in finance combined with a career in tech would make navigating life after moving to Europe a breeze. But the truth is, it was incredibly stressful.",
      },
      {
        heading: 'The gap nobody warned me about',
        body: "When I first arrived, the gap between academic finance and real-world European bureaucracy hit me hard. Despite my degree, I found myself completely lost in a sea of unknown terms and complex rules. I did not have a BSN number on my first day and had no idea which banks would let me open an account without it. Later on, I remember being genuinely terrified of dividing a simple dinner bill with friends via bank transfer, because I was scared the bank might flag the transaction and question where the money came from.",
      },
      {
        heading: 'Learning the hard way',
        body: "The tax systems felt like a foreign language, especially municipal costs like the waste tax. In my first year, I paid an expensive agency to file my annual tax return, only to realize later that it is actually simple enough for anyone to do themselves. Dealing with healthcare bills, understanding how Infomedics works, and figuring out what my insurance covers versus what I have to pay out of pocket for a hospital visit felt like total guesswork. I did not even know where to shop for the best prices or how to safely park my savings to earn a decent interest rate. For a long time, the fear of making a mistake kept me from investing in stocks or ETFs, even though I knew all the theory behind it.",
      },
      {
        heading: 'Why I built MoneyCho',
        body: "I finally decided that enough was enough. To conquer these fears, I went back to the books. I started taking advanced personal finance and investment courses from top global universities. I spent hundreds of hours reading government websites, analyzing tax codes, and testing financial tools. And honestly, I am still learning every single day. I created MoneyCho to build the platform I desperately needed when I first moved here. This website is a bridge between my financial background, my developer skills, and my real-life struggles as an expat. Everything you find here — from our interactive calculators to our honest guides — is built on a mix of academic accuracy and real, raw experience.",
      },
      {
        heading: 'What we do differently',
        body: "At MoneyCho, we do not do boring, rigid financial lectures. We break down the complex world of European and Dutch finance into simple, actionable, and honest steps. My goal is to help you bypass the long, stressful learning curve I had to go through, so you can make confident financial choices much faster. Thank you for being here, and let's grow our wealth and our peace of mind together.",
      },
    ],
    principles: [
      { n: '01', title: 'Show the math', body: 'Every calculator shows the formula behind the result. No black boxes. You should be able to verify every number we give you.' },
      { n: '02', title: 'No conflicts of interest', body: 'We do not sell financial products. We do not take referral fees. Our tools are built to give you accurate answers, not to steer you toward a product.' },
      { n: '03', title: 'Always free', body: 'Core calculators and guides are free, forever. Financial literacy should not have a paywall.' },
      { n: '04', title: 'Updated regularly', body: 'Tax brackets, interest rates, and regulatory figures change. We update our models when they do and show the source.' },
    ],
    ctaHeading: 'Questions or corrections?',
    ctaBody: 'Found an error in a calculation or a tax figure that needs updating? Let us know.',
    ctaButton: 'Contact us',
  },
  nl: {
    title: 'Over MoneyCho',
    description:
      'Het verhaal achter MoneyCho — gebouwd door een afgestudeerde financieel manager en software developer die de harde weg leerde wat Europese persoonlijke financiën echt betekenen.',
    eyebrow: 'Over ons',
    h1: 'Van financiële chaos naar slimme keuzes.',
    intro:
      'Als je je ooit overweldigd, in de war of zelfs een beetje bang hebt gevoeld door het financiële systeem in Europa, dan wil ik dat je één ding weet: je bent absoluut niet alleen. Ik stond ooit precies waar jij nu staat.',
    sections: [
      {
        heading: 'Een bijzondere achtergrond',
        body: "Ik heb een bacheloropleiding in Financieel Management afgerond, maar ik werk inmiddels al jaren als Software Developer. Je zou denken dat met een achtergrond in financiën en een carrière in de IT, het regelen van je geldzaken na een verhuizing naar Europa een eitje zou zijn. Maar de realiteit was dat het ontzettend stressvol was.",
      },
      {
        heading: 'De kloof die niemand noemde',
        body: "Toen ik hier net aankwam, werd ik hard geconfronteerd met de kloof tussen academische financiën en de Nederlandse bureaucratie. Ondanks mijn diploma raakte ik de weg kwijt in een doolhof van onbekende termen en ingewikkelde systemen. Op dag één had ik nog geen BSN-nummer en ik had geen idee welke banken me zonder dit nummer een rekening lieten openen. Later was ik serieus bang om een simpele restaurantrekening met vrienden te delen via een bankoverschrijving, uit angst dat de bank de transactie als verdacht zou markeren.",
      },
      {
        heading: 'Leren op de harde manier',
        body: "Lokale belastingen, zoals de beruchte afvalstoffenheffing, voelden als een vreemde taal. In mijn eerste jaar betaalde ik een duur kantoor om mijn belastingaangifte te doen, om er later pas achter te komen dat het eigenlijk zo eenvoudig is dat iedereen het zelf kan. Ook het omgaan met medische rekeningen, begrijpen hoe Infomedics werkt en uitzoeken wat mijn zorgverzekering wel of niet dekt voor een ziekenhuisbezoek voelde als puur gokwerk. Door de angst om fouten te maken, durfde ik lange tijd niet te beginnen met beleggen in aandelen of ETF's, hoewel ik de theorie erachter door en door kende.",
      },
      {
        heading: 'Waarom ik MoneyCho heb gebouwd',
        body: "Ik besloot dat het genoeg was. Om deze angsten te overwinnen, ben ik weer in de boeken gedoken. Ik begon geavanceerde cursussen over persoonlijke financiën en beleggen te volgen aan internationale topuniversiteiten. Ik bracht honderden uren door op overheidswebsites, analyseerde de belastingwetgeving en testte financiële tools. En eerlijk gezegd leer ik nog steeds elke dag bij. Ik heb MoneyCho opgericht om het platform te bouwen dat ik zelf zo hard nodig had toen ik hier net kwam wonen. Deze website is de brug tussen mijn financiële achtergrond, mijn vaardigheden als developer en mijn eigen praktijkervaringen als expat.",
      },
      {
        heading: 'Wat wij anders doen',
        body: "Bij MoneyCho doen we niet aan saaie, rigide financiële colleges. We breken de complexe wereld van Europese en Nederlandse financiën op in begrijpelijke, praktische en eerlijke stappen. Mijn doel is om jou te helpen die lange, stressvolle leercurve over te slaan, zodat je veel sneller zelfverzekerde financiële keuzes kunt maken. Bedankt dat je er bent, en laten we samen bouwen aan jouw vermogen én je gemoedsrust.",
      },
    ],
    principles: [
      { n: '01', title: 'Laat de berekening zien', body: 'Elke calculator toont de formule achter het resultaat. Geen zwarte dozen. Je kunt elk getal dat we je geven zelf verifiëren.' },
      { n: '02', title: 'Geen belangenconflicten', body: 'We verkopen geen financiële producten. We ontvangen geen verwijzingsvergoedingen. Onze tools zijn gebouwd om nauwkeurige antwoorden te geven, niet om je naar een product te sturen.' },
      { n: '03', title: 'Altijd gratis', body: 'Onze calculators en gidsen zijn gratis, voor altijd. Financiële kennis mag geen prijskaartje hebben.' },
      { n: '04', title: 'Regelmatig bijgewerkt', body: 'Belastingschijven, rentetarieven en wettelijke cijfers veranderen. We werken onze modellen bij wanneer dat nodig is en vermelden de bron.' },
    ],
    ctaHeading: 'Vragen of correcties?',
    ctaBody: 'Een fout gevonden in een berekening of een belastingcijfer dat bijgewerkt moet worden? Laat het ons weten.',
    ctaButton: 'Neem contact op',
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
      canonical: `${BASE}/${lang}/about`,
      languages: {
        en: `${BASE}/en/about`,
        nl: `${BASE}/nl/about`,
        'x-default': `${BASE}/nl/about`,
      },
    },
    openGraph: { title: `${title} | MoneyCho`, description, type: 'website', url: `${BASE}/${lang}/about` },
    twitter: { card: 'summary', title: `${title} | MoneyCho`, description },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const c = COPY[lang === 'nl' ? 'nl' : 'en'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">

      {/* Hero */}
      <div className="max-w-2xl mb-20">
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          {c.eyebrow}
        </span>
        <h1 className="font-serif font-black text-[clamp(2.4rem,4vw,3.2rem)] leading-[1.1] text-emerald-deep mb-6">
          {c.h1}
        </h1>
        <p className="text-[1.05rem] leading-[1.7] text-emerald-deep/70">
          {c.intro}
        </p>
      </div>

      {/* Hero image */}
      <div className="relative w-full h-[320px] md:h-[480px] mb-24 overflow-hidden">
        <Image
          src="/about-img.png"
          alt="Person arriving in Amsterdam with a suitcase, standing on a canal bridge at sunset"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Story */}
      <div className="grid md:grid-cols-[1fr_2px_1fr] gap-0 mb-24">
        <div className="space-y-12 md:pr-16">
          {c.sections.slice(0, 3).map((s) => (
            <div key={s.heading}>
              <h2 className="font-serif font-bold text-lg text-emerald-deep mb-3">{s.heading}</h2>
              <p className="text-[0.95rem] leading-[1.8] text-emerald-deep/65">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="hidden md:block bg-emerald-deep/10" />
        <div className="space-y-12 md:pl-16 mt-12 md:mt-0">
          {c.sections.slice(3).map((s) => (
            <div key={s.heading}>
              <h2 className="font-serif font-bold text-lg text-emerald-deep mb-3">{s.heading}</h2>
              <p className="text-[0.95rem] leading-[1.8] text-emerald-deep/65">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Principles */}
      <div className="mb-24">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-10">
          How we work
        </p>
        <div className="grid sm:grid-cols-2 gap-px bg-emerald-deep/10 border border-emerald-deep/10">
          {c.principles.map((p) => (
            <div key={p.n} className="bg-paper p-10">
              <span className="font-serif text-3xl text-gold block mb-4">{p.n}</span>
              <h3 className="font-serif text-xl text-emerald-deep mb-3">{p.title}</h3>
              <p className="text-sm text-emerald-deep/60 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-cream-deep border border-emerald-deep/10 p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-serif text-2xl text-emerald-deep mb-2">{c.ctaHeading}</p>
          <p className="text-sm text-emerald-deep/60">{c.ctaBody}</p>
        </div>
        <Link
          href={`/${lang}/contact`}
          className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-deep text-paper text-xs font-bold uppercase tracking-widest hover:bg-emerald-mid transition-colors no-underline"
        >
          {c.ctaButton}
        </Link>
      </div>

    </div>
  );
}

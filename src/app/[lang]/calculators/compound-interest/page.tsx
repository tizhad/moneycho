import type { Metadata } from 'next';
import CompoundInterestCalculator from './CompoundInterestCalculator';

const SLUG = 'compound-interest';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Compound Interest Calculator',
    description:
      'See how monthly contributions compound over any time horizon. Visualise the power of compounding and project your future balance.',
  },
  nl: {
    title: 'Samengestelde Rente Calculator',
    description:
      'Bereken hoe je geld groeit met maandelijkse inleg. Visualiseer de kracht van samengestelde rente over elke tijdshorizon.',
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

export default function CompoundInterestPage() {
  return <CompoundInterestCalculator />;
}

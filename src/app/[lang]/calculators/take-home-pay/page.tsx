import type { Metadata } from 'next';
import TakeHomePayCalculator from './TakeHomePayCalculator';

const SLUG = 'take-home-pay';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Take-Home Pay Calculator',
    description:
      'Calculate your net salary after tax and social contributions. Supports multiple countries and currencies.',
  },
  nl: {
    title: 'Netto Salaris Calculator',
    description:
      'Bereken je netto salaris na belastingen en sociale premies. Ondersteunt meerdere landen en valuta.',
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

export default function TakeHomePayPage() {
  return <TakeHomePayCalculator />;
}

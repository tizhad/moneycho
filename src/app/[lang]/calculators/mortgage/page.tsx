import type { Metadata } from 'next';
import MortgageCalculator from './MortgageCalculator';

const SLUG = 'mortgage';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Mortgage Calculator',
    description:
      'Calculate your monthly mortgage payment, total interest cost, and full amortization schedule. Free and instant.',
  },
  nl: {
    title: 'Hypotheek Calculator',
    description:
      'Bereken je maandelijkse hypotheekbetaling, totale rentekosten en het volledige aflossingsschema. Gratis en direct.',
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

export default function MortgagePage() {
  return <MortgageCalculator />;
}

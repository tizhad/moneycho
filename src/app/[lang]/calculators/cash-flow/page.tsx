import type { Metadata } from 'next';
import CashFlowCalculator from './CashFlowCalculator';

const SLUG = 'cash-flow';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Cash Flow Calculator',
    description:
      'Track monthly income versus expenses to understand your true financial position. Free personal finance tool.',
  },
  nl: {
    title: 'Cashflow Calculator',
    description:
      'Houd maandelijkse inkomsten en uitgaven bij voor een helder financieel overzicht. Gratis persoonlijke financiële tool.',
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

export default function CashFlowPage() {
  return <CashFlowCalculator />;
}

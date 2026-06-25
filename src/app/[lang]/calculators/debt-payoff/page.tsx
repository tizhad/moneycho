import type { Metadata } from 'next';
import DebtPayoffCalculator from './DebtPayoffCalculator';

const SLUG = 'debt-payoff';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Debt Payoff Calculator',
    description:
      'Compare avalanche vs snowball debt payoff strategies. Find the fastest and cheapest path to becoming debt-free.',
  },
  nl: {
    title: 'Schulden Aflossen Calculator',
    description:
      'Vergelijk de lawine- en sneeuwbalmethode voor schuldaflossing. Vind de snelste en goedkoopste weg naar schuldenvrij leven.',
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

export default function DebtPayoffPage() {
  return <DebtPayoffCalculator />;
}

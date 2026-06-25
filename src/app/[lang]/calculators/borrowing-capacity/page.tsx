import type { Metadata } from 'next';
import BorrowingCapacityCalculator from './BorrowingCapacityCalculator';

const SLUG = 'borrowing-capacity';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Borrowing Capacity Calculator',
    description:
      'Find out how much you can borrow based on your income, expenses, and existing debt. Free and instant.',
  },
  nl: {
    title: 'Leencapaciteit Calculator',
    description:
      'Bereken hoeveel je kunt lenen op basis van je inkomen, uitgaven en bestaande schulden. Gratis en direct.',
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

export default function BorrowingCapacityPage() {
  return <BorrowingCapacityCalculator />;
}

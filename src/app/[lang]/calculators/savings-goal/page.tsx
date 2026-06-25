import type { Metadata } from 'next';
import SavingsGoalCalculator from './SavingsGoalCalculator';

const SLUG = 'savings-goal';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Savings Goal Calculator',
    description:
      'Work backwards from your savings target. Find out exactly how much to save each month to hit your goal by your deadline.',
  },
  nl: {
    title: 'Spaar Doel Calculator',
    description:
      'Bereken hoeveel je maandelijks moet sparen om je spaardoel op tijd te bereiken. Gratis en direct resultaat.',
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

export default function SavingsGoalPage() {
  return <SavingsGoalCalculator />;
}

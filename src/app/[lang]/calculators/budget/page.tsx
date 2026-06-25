import type { Metadata } from 'next';
import BudgetCalculator from './BudgetCalculator';

const SLUG = 'budget';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: '50/30/20 Budget Planner',
    description:
      'Split your after-tax income into needs, wants and savings with the 50/30/20 rule. Free calculator with instant visual breakdown.',
  },
  nl: {
    title: 'Budget Planner 50/30/20',
    description:
      'Verdeel je netto inkomen in behoeften, wensen en spaargeld met de 50/30/20 regel. Gratis calculator met direct visueel overzicht.',
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

export default function BudgetPage() {
  return <BudgetCalculator />;
}

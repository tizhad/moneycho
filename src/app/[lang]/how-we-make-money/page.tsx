import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { DisclosureContent, DISCLOSURE_PATHS } from '@/components/shared/DisclosureContent';

const BASE = 'https://moneycho.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  await params;
  return {
    title: 'How Does MoneyCho Make Money? — Full Disclosure',
    description:
      'Full transparency about our revenue model: free calculators, labeled partner links coming, and the rules that never change — no paid placement, ever.',
    alternates: {
      canonical: `${BASE}${DISCLOSURE_PATHS.en}`,
      languages: {
        nl: `${BASE}${DISCLOSURE_PATHS.nl}`,
        en: `${BASE}${DISCLOSURE_PATHS.en}`,
        'x-default': `${BASE}${DISCLOSURE_PATHS.nl}`,
      },
    },
  };
}

export default async function HowWeMakeMoneyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang === 'nl') redirect(DISCLOSURE_PATHS.nl);
  return <DisclosureContent lang="en" />;
}

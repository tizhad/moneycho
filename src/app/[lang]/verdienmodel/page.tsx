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
    title: 'Hoe Verdient MoneyCho Geld? — Verdienmodel',
    description:
      'Volledige transparantie over ons verdienmodel: gratis calculators, binnenkort gelabelde partnerlinks, en de regels die nooit veranderen — geen betaalde plaatsing, ooit.',
    alternates: {
      canonical: `${BASE}${DISCLOSURE_PATHS.nl}`,
      languages: {
        nl: `${BASE}${DISCLOSURE_PATHS.nl}`,
        en: `${BASE}${DISCLOSURE_PATHS.en}`,
        'x-default': `${BASE}${DISCLOSURE_PATHS.nl}`,
      },
    },
  };
}

export default async function VerdienmodelPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== 'nl') redirect(DISCLOSURE_PATHS.en);
  return <DisclosureContent lang="nl" />;
}

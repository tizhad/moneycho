import type { Metadata } from 'next';
import ReceiptScanner from './ReceiptScanner';

const BASE = 'https://moneycho.com';
const SLUG = 'tools/receipt-scanner';

const COPY = {
  en: {
    title: 'Supermarket Receipt Scanner & Price Comparer',
    description:
      'Upload receipts from Albert Heijn, Dirk, Jumbo, Lidl and more. See which store is cheapest for each product and where your money goes.',
  },
  nl: {
    title: 'Supermarkt Bonnetjes Scanner & Prijsvergelijker',
    description:
      'Upload bonnetjes van Albert Heijn, Dirk, Jumbo, Lidl en meer. Zie welke winkel het goedkoopst is per product en waar je geld naartoe gaat.',
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
      canonical: `${BASE}/${lang}/${SLUG}`,
      languages: {
        en: `${BASE}/en/${SLUG}`,
        nl: `${BASE}/nl/${SLUG}`,
        'x-default': `${BASE}/nl/${SLUG}`,
      },
    },
    openGraph: { title: `${title} | MoneyCho`, description, type: 'website', url: `${BASE}/${lang}/${SLUG}` },
    twitter: { card: 'summary', title: `${title} | MoneyCho`, description },
  };
}

export default async function ReceiptScannerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isNL = lang === 'nl';

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-12">
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          {isNL ? 'Slimmer boodschappen doen' : 'Smart grocery shopping'}
        </span>
        <h1 className="font-serif font-black text-[clamp(2rem,3vw,2.8rem)] leading-[1.1] text-emerald-deep mb-4">
          {isNL ? 'Vergelijk je supermarktbonnetjes' : 'Compare your supermarket receipts'}
        </h1>
        <p className="text-[0.95rem] leading-[1.7] text-emerald-deep/60 max-w-2xl">
          {isNL
            ? 'Upload een foto van je bonnetje. Wij lezen het automatisch uit en laten je zien welke winkel goedkoper is per product. Je gegevens blijven in je browser.'
            : 'Upload a photo of your receipt. We read it automatically and show you which store is cheaper per product. Your data stays in your browser.'}
        </p>
        <p className="text-xs text-emerald-deep/30 mt-3">
          {isNL
            ? '🔒 Geen account nodig. Alles wordt lokaal opgeslagen en verdwijnt als je je browsergeschiedenis wist.'
            : '🔒 No account needed. Everything is stored locally and disappears when you clear your browser.'}
        </p>
      </div>

      <ReceiptScanner lang={lang} />
    </div>
  );
}

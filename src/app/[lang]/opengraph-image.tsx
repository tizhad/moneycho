import { ImageResponse } from 'next/og';

export const alt = 'MoneyCho — Free Financial Calculators & Money Guides';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const COPY = {
  en: {
    tagline: 'Free Financial Calculators & Money Guides',
    sub: 'Budget · Debt · Savings · Mortgage · Retirement',
  },
  nl: {
    tagline: 'Gratis Financiële Calculators & Geldgidsen',
    sub: 'Budget · Schulden · Sparen · Hypotheek · Pensioen',
  },
} as const;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const c = lang === 'nl' ? COPY.nl : COPY.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#1a3d2f',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: '#c9a230', display: 'flex' }} />
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#f5f0e6',
            }}
          >
            MoneyCho
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#f5f0e6',
            lineHeight: 1.15,
            maxWidth: 920,
            display: 'flex',
          }}
        >
          {c.tagline}
        </div>
        <div style={{ fontSize: 30, color: '#c9a230', marginTop: 28, display: 'flex' }}>
          {c.sub}
        </div>
      </div>
    ),
    { ...size }
  );
}

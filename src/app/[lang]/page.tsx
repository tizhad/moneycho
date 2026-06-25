import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, getDictionary, type Locale } from '@/lib/i18n';
import { EmailSection } from '@/components/home/EmailSection';
import { CompoundPreview } from '@/components/home/CompoundPreview';
import { BudgetPreview } from '@/components/home/BudgetPreview';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const BASE = 'https://moneycho.com';
  const isNL = lang === 'nl';
  const title = isNL
    ? 'Gratis Financiële Calculators & Geldgidsen | MoneyCho'
    : 'Free Financial Calculators & Money Guides | MoneyCho';
  const description = isNL
    ? 'Gratis calculators voor budget, schulden, sparen, hypotheek en pensioen. Stap-voor-stap gidsen. Geen aanmelding vereist.'
    : 'Free calculators for budget, debt, savings, mortgage, and retirement. Step-by-step guides and expert analysis. No sign-up, no fees.';
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE}/${lang}`,
      languages: {
        en: `${BASE}/en`,
        nl: `${BASE}/nl`,
        'x-default': `${BASE}/nl`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE}/${lang}`,
    },
    twitter: { card: 'summary', title, description },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const t = dict.home;
  const p = (path: string) => `/${lang}${path}`;

  const journal = t.journal.items as Array<{
    featured?: boolean;
    tag: string;
    title: string;
    desc: string;
    date?: string;
    href: string;
  }>;

  return (
    <>
      {/* HERO */}
      <section className="bg-emerald-deep min-h-[400px] flex flex-col justify-center px-8 py-16 lg:px-20 xl:px-28">
        <div className="max-w-[700px]">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold-bright mb-5">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-serif font-bold text-[clamp(2rem,3vw,2.8rem)] leading-[1.12] text-paper mb-5">
            {t.hero.h1_1}
            <br />
            {t.hero.h1_2}{' '}
            <em className="text-gold not-italic">{t.hero.h1_em}</em>
          </h1>
          <p className="text-[0.95rem] leading-[1.7] text-paper/70 mb-9">
            {t.hero.body}
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href={p('/calculators')}
              className="inline-flex items-center px-6 py-3 bg-paper text-emerald-deep text-[0.85rem] font-semibold rounded-md hover:bg-gold hover:text-paper transition-all no-underline"
            >
              {t.hero.cta_primary}
            </Link>
            <Link
              href={p('/guides')}
              className="inline-flex items-center px-6 py-3 border border-paper/30 text-paper text-[0.85rem] font-semibold rounded-md hover:bg-paper/10 transition-all no-underline"
            >
              {t.hero.cta_secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="hidden md:block bg-emerald-deep py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          {t.trust.map((s) => (
            <div key={s.number} className="flex items-center gap-3 text-paper">
              <span className="font-serif font-normal text-[1.4rem] text-gold-bright">
                {s.number}
              </span>
              <span className="text-[0.8rem] opacity-85 leading-snug max-w-[18ch]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED CALCULATORS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-10 flex-wrap gap-3">
          <h2 className="font-serif font-black text-[clamp(1.8rem,3vw,2.4rem)] text-emerald-deep">
            See Them in Action
          </h2>
          <Link
            href={p('/calculators')}
            className="text-[0.82rem] font-semibold text-gold hover:text-emerald-deep uppercase tracking-[0.04em] transition-colors no-underline"
          >
            View All Tools →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <CompoundPreview href={p('/calculators/compound-interest')} />
          <BudgetPreview href={p('/calculators/budget')} />
        </div>
      </section>

      {/* CALCULATORS */}
      <section className="max-w-[1280px] mx-auto px-6 pb-20">
        <div className="flex items-baseline justify-between mb-10 flex-wrap gap-3">
          <h2 className="font-serif font-black text-[clamp(1.8rem,3vw,2.4rem)] text-emerald-deep">
            {t.calculators.heading}
          </h2>
          <Link
            href={p('/calculators')}
            className="text-[0.82rem] font-semibold text-gold hover:text-emerald-deep uppercase tracking-[0.04em] transition-colors no-underline"
          >
            {t.calculators.viewAll}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-light rounded-lg overflow-hidden">
          {t.calculators.items.map((c, idx) => {
            const mobilePos = [0, 1, 3].indexOf(idx);
            const showOnMobile = mobilePos !== -1;
            const mobileN = String(mobilePos + 1).padStart(2, '0');
            return (
              <Link
                key={c.href}
                href={p(c.href)}
                className={`bg-white-card p-9 hover:bg-cream-deep transition-colors no-underline group${!showOnMobile ? ' hidden md:block' : ''}`}
              >
                <span className="font-serif font-normal text-[2.2rem] text-gold leading-none block mb-4">
                  {showOnMobile ? (
                    <>
                      <span className="md:hidden">{mobileN}</span>
                      <span className="hidden md:inline">{c.n}</span>
                    </>
                  ) : (
                    c.n
                  )}
                </span>
                <span className="text-[0.95rem] font-bold text-emerald-deep uppercase tracking-[0.03em] block mb-2">
                  {c.name}
                </span>
                <p className="text-[0.85rem] text-text-secondary leading-relaxed mb-4 max-w-[35ch]">
                  {c.desc}
                </p>
                <span className="text-[0.82rem] font-semibold text-emerald-deep uppercase tracking-[0.04em] group-hover:text-gold transition-colors">
                  {c.action}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-6 md:hidden">
          <Link
            href={p('/calculators')}
            className="flex items-center justify-center w-full py-3.5 bg-emerald-deep text-paper text-[0.85rem] font-semibold rounded-md hover:bg-emerald-mid transition-colors no-underline"
          >
            View All Calculators &amp; Tools →
          </Link>
        </div>
      </section>

      {/* GUIDES */}
      <section className="bg-cream-deep py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-baseline justify-between mb-10 flex-wrap gap-3">
            <h2 className="font-serif font-black text-[clamp(1.8rem,3vw,2.4rem)] text-emerald-deep">
              {t.guides.heading}
            </h2>
            <Link
              href={p('/guides')}
              className="text-[0.82rem] font-semibold text-gold hover:text-emerald-deep uppercase tracking-[0.04em] transition-colors no-underline"
            >
              {t.guides.viewAll}
            </Link>
          </div>
          <div className="flex flex-col gap-px bg-border-light rounded-lg overflow-hidden">
            {t.guides.items.map((g) => (
              <Link
                key={g.title}
                href={p(g.href)}
                className="grid grid-cols-[auto_1fr_auto] gap-6 items-center px-8 py-7 bg-white-card hover:bg-cream-deep transition-colors no-underline group"
              >
                <span className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-gold bg-gold/10 px-2.5 py-1 rounded-sm whitespace-nowrap">
                  {g.tag}
                </span>
                <div>
                  <h3 className="font-serif font-normal text-[1.2rem] text-emerald-deep mb-1">
                    {g.title}
                  </h3>
                  <p className="text-[0.84rem] text-text-secondary max-w-[60ch]">
                    {g.desc}
                  </p>
                </div>
                <span className="text-[1.2rem] text-emerald-deep opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-10 flex-wrap gap-3">
          <h2 className="font-serif font-black text-[clamp(1.8rem,3vw,2.4rem)] text-emerald-deep">
            {t.journal.heading}
          </h2>
          <Link
            href={p('/guides')}
            className="text-[0.82rem] font-semibold text-gold hover:text-emerald-deep uppercase tracking-[0.04em] transition-colors no-underline"
          >
            {t.journal.viewAll}
          </Link>
        </div>
        <div className="grid min-[930px]:grid-cols-2 gap-8">
          <Link
            href={p(journal[0].href)}
            className="min-[930px]:row-span-2 p-10 bg-emerald-deep rounded-lg flex flex-col justify-end min-h-[360px] hover:-translate-y-0.5 transition-all no-underline"
          >
            <span className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-gold-bright mb-3 block">
              {journal[0].tag}
            </span>
            <h3 className="font-serif font-black text-[1.6rem] text-paper leading-[1.3] mb-3">
              {journal[0].title}
            </h3>
            <p className="text-[0.85rem] text-paper/70 leading-relaxed max-w-[40ch]">
              {journal[0].desc}
            </p>
          </Link>
          {journal.slice(1).map((item) => (
            <Link
              key={item.title}
              href={p(item.href)}
              className="p-7 border border-border-light rounded-lg flex flex-col justify-center hover:border-gold-muted hover:-translate-y-px transition-all no-underline"
            >
              <span className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-gold mb-2 block">
                {item.tag}
              </span>
              <h3 className="font-serif font-black text-[1.15rem] text-emerald-deep leading-[1.3] mb-2">
                {item.title}
              </h3>
              <p className="text-[0.82rem] text-text-secondary leading-relaxed">
                {item.desc}
              </p>
              {item.date && (
                <span className="text-[0.72rem] text-text-tertiary mt-3">
                  {item.date}
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <EmailSection lang={lang} />

      {/* E-E-A-T */}
      <section className="bg-cream-deep py-16 px-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {t.eeat.map((item) => (
            <div key={item.title} className="text-center py-8 px-6">
              <span className="text-[2rem] mb-4 block">{item.icon}</span>
              <h3 className="text-[0.9rem] font-bold text-emerald-deep uppercase tracking-[0.04em] mb-2">
                {item.title}
              </h3>
              <p className="text-[0.84rem] text-text-secondary leading-relaxed max-w-[30ch] mx-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

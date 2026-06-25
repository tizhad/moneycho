import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About MoneyCho',
  description: 'MoneyCho builds free, transparent financial calculators and guides. No sign-up, no ads, no conflicts of interest.',
};

const PRINCIPLES = [
  {
    n: '01',
    title: 'Show the math',
    body: 'Every calculator shows the formula behind the result. No black boxes. You should be able to verify every number we give you.',
  },
  {
    n: '02',
    title: 'No conflicts of interest',
    body: 'We do not sell financial products. We do not take referral fees. Our tools are built to give you accurate answers, not to steer you toward a product.',
  },
  {
    n: '03',
    title: 'Always free',
    body: 'Core calculators and guides are free, forever. Financial literacy should not have a paywall.',
  },
  {
    n: '04',
    title: 'Updated regularly',
    body: 'Tax brackets, interest rates, and regulatory figures change. We update our models when they do and show the source.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-32">
      {/* Hero */}
      <div className="max-w-2xl mb-24">
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          About
        </span>
        <h1 className="font-serif font-black text-[clamp(2.4rem,4vw,3.2rem)] leading-[1.1] text-emerald-deep mb-6">
          Financial tools built on honesty.
        </h1>
        <p className="text-[1.05rem] leading-[1.7] text-emerald-deep/60">
          MoneyCho is a free resource for people who want to understand their money. We build calculators, guides, and analysis tools that show every step of the math and never sell anything.
        </p>
      </div>

      {/* Principles */}
      <div className="mb-24">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-10">
          How we work
        </p>
        <div className="grid sm:grid-cols-2 gap-px bg-emerald-deep/10 border border-emerald-deep/10">
          {PRINCIPLES.map((p) => (
            <div key={p.n} className="bg-paper p-10">
              <span className="font-serif text-3xl text-gold block mb-4">{p.n}</span>
              <h3 className="font-serif text-xl text-emerald-deep mb-3">{p.title}</h3>
              <p className="text-sm text-emerald-deep/60 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-cream-deep border border-emerald-deep/10 p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-serif text-2xl text-emerald-deep mb-2">Questions or corrections?</p>
          <p className="text-sm text-emerald-deep/60">
            Found an error in a calculation or a tax figure that needs updating? Let us know.
          </p>
        </div>
        <Link
          href="./contact"
          className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-deep text-paper text-xs font-bold uppercase tracking-widest hover:bg-emerald-mid transition-colors no-underline"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}

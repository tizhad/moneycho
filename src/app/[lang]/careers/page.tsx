import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Job opportunities at MoneyCho and curated fintech and finance roles.',
};

const AREAS = [
  { title: 'Engineering', desc: 'Full-stack, data, and infrastructure roles at fintech companies building the next generation of financial tools.' },
  { title: 'Product & Design', desc: 'Product managers and designers shaping how people interact with money, budgeting, and investing.' },
  { title: 'Finance & Analysis', desc: 'Analyst, FP&A, and quantitative roles at banks, fintechs, and investment firms.' },
  { title: 'Growth & Marketing', desc: 'Growth, content, and marketing roles focused on financial products and services.' },
];

export default function CareersPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-32">
      {/* Hero */}
      <div className="max-w-2xl mb-20">
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          Careers
        </span>
        <h1 className="font-serif font-black text-[clamp(2.4rem,4vw,3.2rem)] leading-[1.1] text-emerald-deep mb-6">
          Work in Finance and Fintech
        </h1>
        <p className="text-[1.05rem] leading-[1.7] text-emerald-deep/60">
          We are building a curated job board for fintech and finance roles. Engineers, analysts, product managers, and designers working at the intersection of money and technology.
        </p>
      </div>

      {/* Coming soon notice */}
      <div className="bg-emerald-deep text-paper p-10 mb-20 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-widest text-gold-bright mb-3">Coming Soon</p>
        <p className="font-serif text-2xl mb-4">Job board launching later this year.</p>
        <p className="text-paper/70 text-sm leading-relaxed mb-6">
          We are partnering with fintech companies, banks, and investment firms to bring high-quality, vetted roles directly to our audience. No recruiter spam, no generic listings.
        </p>
        <Link
          href="./contact"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-bright border border-gold-bright/40 px-5 py-3 hover:bg-gold-bright/10 transition-colors no-underline"
        >
          Get notified when it launches
        </Link>
      </div>

      {/* Areas */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-8">
          Roles we will cover
        </p>
        <div className="grid sm:grid-cols-2 gap-px bg-emerald-deep/10 border border-emerald-deep/10">
          {AREAS.map((area) => (
            <div key={area.title} className="bg-paper p-8">
              <h3 className="font-serif text-xl text-emerald-deep mb-3">{area.title}</h3>
              <p className="text-sm text-emerald-deep/60 leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

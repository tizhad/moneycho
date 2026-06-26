import type { Metadata } from 'next';
import TakeHomePayCalculator from './TakeHomePayCalculator';

const SLUG = 'take-home-pay';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Take-Home Pay Calculator (Netherlands)',
    description:
      'Calculate your Dutch net salary after income tax, social contributions, and tax credits. Includes vakantiegeld and 2025 Box 1 rates.',
  },
  nl: {
    title: 'Netto Salaris Calculator Nederland',
    description:
      'Bereken je netto salaris na inkomstenbelasting, sociale premies en heffingskortingen. Inclusief vakantiegeld en 2025 Box 1-tarieven.',
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

export default function TakeHomePayPage() {
  return (
    <>
      <TakeHomePayCalculator />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            How Dutch income tax works in 2025
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            The Netherlands uses a two-bracket system for employment income (Box 1). Up to 38,441 euros you pay 35.82%. Everything above that rate is 49.50%. The brackets include both income tax and national insurance contributions, so the percentages already reflect your total obligation to the state, not just the tax portion.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            On paper those rates look high. In practice, tax credits bring your effective rate down considerably. Most employees pay an effective rate of 25 to 35% on their total gross income, not the marginal rate.
          </p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            Worked example
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">
            50,000 euros gross annual salary, single, no deductions
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Gross annual</p>
              <p className="font-display text-xl font-bold text-emerald-deep">50,000</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Tax + social</p>
              <p className="font-display text-xl font-bold text-emerald-deep">~14,200</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Net annual</p>
              <p className="font-display text-xl font-bold text-emerald-deep">~35,800</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Net monthly</p>
              <p className="font-display text-xl font-bold text-emerald-deep">~2,980</p>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/60 border-t border-emerald-deep/10 pt-5">
            Vakantiegeld (holiday allowance) of 8% is paid on top of this, usually in May or June. That adds roughly 3,333 euros gross in a year, which nets to around 2,000 euros after tax. Most people receive it as a lump sum.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Tax credits that reduce what you actually pay
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            Two credits apply to most employees. They reduce your tax bill directly, not just your taxable income, so they matter more than most deductions.
          </p>
          <div className="space-y-4">
            {[
              ['Algemene heffingskorting (general tax credit)', 'Up to 3,362 euros per year in 2025. This phases out as income rises above 24,812 euros. At 50,000 euros gross, you still receive a partial credit. At very high incomes it disappears entirely.'],
              ['Arbeidskorting (employment tax credit)', 'Up to 5,158 euros per year in 2025. This credit rewards employment: it increases as your income rises up to about 40,000 euros, then phases out. Most people earning between 25,000 and 70,000 euros receive a meaningful credit.'],
            ].map(([label, desc]) => (
              <div key={label} className="border-b border-emerald-deep/10 pb-4">
                <p className="text-sm font-bold text-emerald-deep mb-1">{label}</p>
                <p className="text-sm text-emerald-deep/65 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Vakantiegeld: what it is and when you get it
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            Vakantiegeld is an 8% holiday allowance that Dutch law requires employers to pay on top of regular salary. It accrues each month (8% of that month&apos;s gross pay) and is typically paid out as a lump sum in May or June.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            Because it is paid all at once, it pushes your income up in May or June, which can mean a slightly higher marginal rate for that month. Your employer handles the withholding, so you do not need to do anything, but it is worth knowing so the larger net amount in your account does not surprise you.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            Some employers spread it across monthly payments instead of paying it in a lump sum. Both approaches are legal. If you are unsure how your employer handles it, check your arbeidsovereenkomst (employment contract) or ask HR.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Why your payslip might look different
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            This calculator gives you a reliable estimate, but your actual take-home can differ for a few reasons. Company pension contributions (pensioenpremie) reduce your taxable gross. Benefits like a lease car, reiskostenvergoeding (travel allowance), or a company phone affect the calculation. Partner income changes the optimal tax filing strategy.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            For an authoritative number, use the Belastingdienst online tool or speak with a salaris specialist. This calculator is most useful for quick comparisons: does a 5,000 euro raise actually change your net by 5,000? No. Does it change it by 2,500? Roughly, yes.
          </p>
        </section>

      </div>
    </>
  );
}

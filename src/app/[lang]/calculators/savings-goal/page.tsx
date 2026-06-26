import type { Metadata } from 'next';
import SavingsGoalCalculator from './SavingsGoalCalculator';

const SLUG = 'savings-goal';
const BASE = 'https://moneycho.com';

const COPY = {
  en: {
    title: 'Savings Goal Calculator',
    description:
      'Work backwards from your savings target to find out how much to save each month. Free calculator with timeline and interest projections.',
  },
  nl: {
    title: 'Spaardoel Calculator',
    description:
      'Reken terug vanuit je spaardoel om te weten hoeveel je elke maand moet sparen. Gratis calculator met tijdlijn en renteprojecties.',
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

const GOALS = [
  { goal: 'Emergency fund', amount: '3 to 6 months of expenses', rate: '2 to 3%', note: 'Keep this in a high-yield savings account, not invested' },
  { goal: 'New car', amount: '5,000 to 25,000 euros', rate: '2 to 3%', note: 'Short horizon means low risk, savings account is fine' },
  { goal: 'Home down payment', amount: '10 to 30% of purchase price', rate: '2 to 4%', note: 'At least 10% is strongly recommended in the NL market' },
  { goal: 'Long-term investment', amount: 'Any amount, any timeline', rate: '5 to 8%', note: 'Only if you have 5+ years and can tolerate volatility' },
];

export default function SavingsGoalPage() {
  return (
    <>
      <SavingsGoalCalculator />

      <div className="mt-16 space-y-14 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Working backwards from your goal
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            Most savings calculators tell you what a monthly contribution will grow to. This one does the reverse. You tell it what you want to end up with and when you need it, and it tells you how much to put aside each month.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            That makes it much easier to plan. Instead of saving randomly and hoping it adds up, you start with the target and work the math backwards.
          </p>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            Worked example
          </h2>
          <p className="text-sm text-emerald-deep/50 mb-8">
            15,000 euro savings goal, 2,000 euros already saved, 3% annual rate
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Goal</p>
              <p className="font-display text-3xl font-bold text-emerald-deep">15,000</p>
              <p className="text-xs text-emerald-deep/50 mt-1">euros target</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Already saved</p>
              <p className="font-display text-3xl font-bold text-emerald-deep">2,000</p>
              <p className="text-xs text-emerald-deep/50 mt-1">euros starting balance</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Monthly needed</p>
              <p className="font-display text-3xl font-bold text-emerald-deep">~400</p>
              <p className="text-xs text-emerald-deep/50 mt-1">euros/month for ~30 months</p>
            </div>
          </div>
          <div className="border-t border-emerald-deep/10 pt-5">
            <p className="text-sm text-emerald-deep/60 mb-3">Need it faster?</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/50 p-4">
                <p className="text-xs font-bold text-emerald-deep mb-1">Reach goal in 2 years</p>
                <p className="text-sm text-emerald-deep/70">You would need to save about 535 euros per month</p>
              </div>
              <div className="bg-white/50 p-4">
                <p className="text-xs font-bold text-emerald-deep mb-1">Reach goal in 4 years</p>
                <p className="text-sm text-emerald-deep/70">You would need to save about 265 euros per month</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Choosing the right interest rate for your goal
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-6">
            The rate you use matters a lot over long horizons but very little over short ones. For a goal you need in the next two years, the difference between 2% and 4% is small. For a goal 20 years away, the difference is enormous.
          </p>
          <div className="divide-y divide-emerald-deep/10 border-t border-emerald-deep/10">
            {GOALS.map(({ goal, amount, rate, note }) => (
              <div key={goal} className="py-4">
                <div className="flex justify-between items-start mb-1.5">
                  <p className="text-sm font-semibold text-emerald-deep">{goal}</p>
                  <p className="font-display font-bold text-emerald-deep text-base ml-4 shrink-0">{rate}</p>
                </div>
                <p className="text-xs text-emerald-deep/50">{amount} · {note}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Short-term goals vs long-term goals
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            For money you need within three years, keep it in a savings account or spaardeposito. The interest rate is lower but the money is there when you need it and it will not drop 30% right before you need to spend it.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            For goals five or more years away, you have the option of investing instead. An index fund returning 6 to 7% per year means you need to save significantly less per month to hit the same target. The trade-off is that returns are not guaranteed and the balance will go up and down.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            A good rule of thumb: if you cannot afford to see your balance drop by 25% for a year without panicking or needing the money, keep it in savings rather than investing it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            Automate it or it will not happen
          </h2>
          <p className="text-emerald-deep/70 leading-relaxed mb-4">
            The single most reliable thing you can do is set up an automatic transfer to a separate savings account on the day your salary arrives. Before you see the money, it is already moved.
          </p>
          <p className="text-emerald-deep/70 leading-relaxed">
            Most Dutch banks (ING, Rabobank, ABN AMRO, Bunq) let you create savings pots or goals linked to automatic transfers. Name the pot after the goal. Seeing &quot;Holiday 2026&quot; at 4,800 out of 6,000 is more motivating than watching a number on a spreadsheet.
          </p>
        </section>

      </div>
    </>
  );
}

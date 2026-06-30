import type { Metadata } from 'next';
import BudgetPlannerCalculator from './BudgetPlannerCalculator';

const BASE = 'https://moneycho.com';
const SLUG = 'budget-planner';

const COPY = {
  en: {
    title: 'Comprehensive Budget Planner — Step by Step',
    description:
      'Build a detailed personal budget in 4 steps. Enter every income source and expense category, see your full breakdown, and get a personalised tip.',
  },
  nl: {
    title: 'Uitgebreide Budgetplanner — Stap voor Stap',
    description:
      'Bouw in 4 stappen een gedetailleerd persoonlijk budget. Voer alle inkomsten en uitgavencategorieën in en krijg een persoonlijk advies.',
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

export default function BudgetPlannerPage() {
  return (
    <>
      <BudgetPlannerCalculator />

      <div className="mt-16 space-y-12 border-t border-emerald-deep/10 pt-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-4">
            How this planner works
          </h2>
          <p className="text-emerald-deep/65 leading-relaxed mb-4">
            Unlike a simple percentage-based calculator, this planner asks you to enter your real income and real expenses — line by line. That friction is intentional. The act of assigning a number to every category is where most people find their first insight.
          </p>
          <p className="text-emerald-deep/65 leading-relaxed">
            The 50/30/20 analysis at the end is a reference point, not a rule. Your actual numbers tell you where to look. The personalised tip adjusts based on your profile and goal.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            What counts as a need vs a want?
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep mb-4">Needs (target: 50%)</p>
              <ul className="space-y-2">
                {[
                  'Rent or mortgage payment',
                  'Basic groceries',
                  'Utilities: gas, water, electricity',
                  'Health insurance',
                  'Minimum debt payments',
                  'Essential transport to work',
                  'Childcare required to keep working',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-emerald-deep/65">
                    <span className="text-emerald-deep/25 mt-0.5 shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Wants (target: 30%)</p>
              <ul className="space-y-2">
                {[
                  'Restaurant meals and takeaway',
                  'Streaming services and subscriptions',
                  'Gym membership (if not medically required)',
                  'Clothing beyond the basics',
                  'Holidays and weekend trips',
                  'Hobbies and entertainment',
                  'Upgraded phone or car beyond what you need',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-emerald-deep/65">
                    <span className="text-emerald-deep/25 mt-0.5 shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-sm text-emerald-deep/45 mt-6 border-t border-emerald-deep/08 pt-5">
            Grey areas are normal. A car is a need in a rural area and a want in central Amsterdam. The goal is awareness, not perfection.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-emerald-deep mb-5">
            What to do with your results
          </h2>
          <ol className="space-y-5">
            {[
              ['Look at the biggest slice', 'Open the expense breakdown. The largest category is where cuts have the most impact. Small trims on a large category beat eliminating a small one entirely.'],
              ['Check your savings rate first', 'Before cutting expenses, see your savings rate. Under 10% is a warning sign. Under 5% means the emergency fund conversation is urgent.'],
              ['Fix the leak, not the symptom', 'If housing is above 35%, that is a housing problem — not a budgeting problem. No amount of cancelled subscriptions fixes a rent that is too high for your income.'],
              ['Automate what you decide', 'Every spending decision you make manually, you will eventually unmake. Set up standing orders for savings on payday, before you can see the money.'],
              ['Review monthly, adjust quarterly', 'A budget is not a contract. Revisit it when something changes — new job, new rent, new debt — and tweak the inputs. The numbers should reflect reality.'],
            ].map(([label, body], i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display text-sm font-bold text-gold w-5 shrink-0 pt-0.5">{i + 1}.</span>
                <p className="text-sm text-emerald-deep/65 leading-relaxed">
                  <strong className="text-emerald-deep font-semibold">{label}: </strong>{body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-emerald-deep/[0.04] border border-emerald-deep/12 p-8">
          <h2 className="font-display text-lg font-bold text-emerald-deep mb-1">
            Not sure what your take-home is?
          </h2>
          <p className="text-sm text-emerald-deep/55 mb-4">
            Your budget starts with net income — what actually lands in your account after tax. If you are entering a gross salary, you will overestimate your income.
          </p>
          <a
            href="../take-home-pay"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-deep border-b border-emerald-deep pb-0.5 hover:text-gold hover:border-gold transition-colors"
          >
            Calculate your Dutch net salary →
          </a>
        </section>

      </div>
    </>
  );
}

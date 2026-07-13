export type RelatedItem = {
  n: string;
  label: string;
  desc: string;
  href: string; // relative to /{lang}
};

export type FAQItem = {
  q: string;
  a: string;
};

// Slugs rendered here don't have their own <RelatedContent> block (they
// pre-date that system, or are otherwise not yet migrated) and so still
// need this legacy cross-link list. mortgage, credit-card-payoff,
// compound-interest, savings-goal, and debt-payoff all now render their own
// <RelatedContent> (backed by src/lib/related-content.ts) — deliberately
// absent here to avoid a duplicate related-tools block.
export const relatedTools: Record<string, RelatedItem[]> = {
  'take-home-pay': [
    { n: '08', label: 'Monthly Cash Flow', desc: 'See where your net pay actually goes.', href: '/calculators/cash-flow' },
    { n: '01', label: 'Budget Planner', desc: 'Build a budget based on your net salary.', href: '/calculators/budget' },
  ],
  'cash-flow': [
    { n: '01', label: 'Budget Planner', desc: 'Apply the 50/30/20 rule to your surplus.', href: '/calculators/budget' },
    { n: '05', label: 'Savings Goal', desc: 'Put your surplus to work toward a goal.', href: '/calculators/savings-goal' },
  ],
  'borrowing-capacity': [
    { n: '03', label: 'Mortgage Calculator', desc: 'Calculate exact monthly payments.', href: '/calculators/mortgage' },
    { n: '07', label: 'Take-Home Pay', desc: 'Know your net income before borrowing.', href: '/calculators/take-home-pay' },
  ],
  budget: [
    { n: '02', label: 'Compound Interest', desc: 'See how your savings grow over time.', href: '/calculators/compound-interest' },
    { n: '05', label: 'Savings Goal', desc: 'Calculate how long to reach any target.', href: '/calculators/savings-goal' },
  ],
};

// Slugs whose page.tsx renders its own bilingual FAQ + FAQPage JSON-LD are
// intentionally absent here (mortgage, compound-interest, savings-goal,
// borrowing-capacity, take-home-pay, annuiteit, kosten-koper, rent-vs-buy,
// credit-card-payoff) — a second FAQ block would duplicate the schema.
// debt-payoff has no FAQ of its own, so it stays here as its only source.
export const faqsBySlug: Record<string, FAQItem[]> = {
  budget: [
    {
      q: 'What is the 50/30/20 rule?',
      a: 'A simple budgeting guideline: allocate 50% of after-tax income to needs (housing, food, utilities), 30% to wants (dining out, subscriptions, entertainment), and 20% to savings and debt repayment. Adjust percentages to fit your situation.',
    },
    {
      q: 'Should I budget on gross or net income?',
      a: 'Net income (after tax, what lands in your account). The 50/30/20 rule is designed around take-home pay. If you\'re unsure what your net is, use the Take-Home Pay calculator first.',
    },
    {
      q: 'What if I can\'t reach 20% savings?',
      a: 'Start where you are. Even 5–10% is vastly better than nothing, because compound growth rewards consistency. The goal is to gradually increase the savings percentage as income rises or discretionary spending falls.',
    },
  ],
  'debt-payoff': [
    {
      q: 'What\'s the difference between avalanche and snowball?',
      a: 'Avalanche pays minimum payments on all debts, then puts extra cash toward the highest-interest debt first. This saves the most money mathematically. Snowball pays the smallest balance first for an early psychological win. Both work; the best method is the one you\'ll stick to.',
    },
    {
      q: 'How much extra should I pay per month?',
      a: 'Even €50–100 extra per month can cut years off a debt and save thousands in interest. The calculator shows exactly what any extra payment amount does to your payoff date and total interest paid.',
    },
  ],
  'cash-flow': [
    {
      q: 'What\'s the difference between cash flow and a budget?',
      a: 'A budget is a plan. Cash flow is reality. This calculator captures your actual income and spending so you can see your real surplus or shortfall: not what you intended, but what\'s actually happening month to month.',
    },
    {
      q: 'What should I do with a monthly surplus?',
      a: 'First, build an emergency fund of 3–6 months\' expenses. Then split any surplus between accelerating debt repayment and investing. The Savings Goal and Budget calculators can help you model exactly where extra money should go.',
    },
  ],
};

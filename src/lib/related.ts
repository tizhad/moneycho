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

export const relatedTools: Record<string, RelatedItem[]> = {
  budget: [
    { n: '02', label: 'Compound Interest', desc: 'See how your savings grow over time.', href: '/calculators/compound-interest' },
    { n: '05', label: 'Savings Goal', desc: 'Calculate how long to reach any target.', href: '/calculators/savings-goal' },
  ],
  'compound-interest': [
    { n: '01', label: 'Budget Planner', desc: 'Find how much you can invest each month.', href: '/calculators/budget' },
    { n: '05', label: 'Savings Goal', desc: 'Set a goal and see when you\'ll reach it.', href: '/calculators/savings-goal' },
  ],
  mortgage: [
    { n: '09', label: 'Borrowing Capacity', desc: 'How much can you safely borrow?', href: '/calculators/borrowing-capacity' },
    { n: '01', label: 'Budget Planner', desc: 'Make sure you can afford the monthly payment.', href: '/calculators/budget' },
  ],
  'credit-card-payoff': [
    { n: '06', label: 'Debt Payoff', desc: 'Avalanche vs snowball: which saves more?', href: '/calculators/debt-payoff' },
    { n: '01', label: 'Budget Planner', desc: 'Free up cash to pay off debt faster.', href: '/calculators/budget' },
  ],
  'savings-goal': [
    { n: '02', label: 'Compound Interest', desc: 'See how compounding accelerates your goal.', href: '/calculators/compound-interest' },
    { n: '01', label: 'Budget Planner', desc: 'Find exactly how much you can save per month.', href: '/calculators/budget' },
  ],
  'debt-payoff': [
    { n: '04', label: 'Credit Card Payoff', desc: 'Calculate payoff for a single card.', href: '/calculators/credit-card-payoff' },
    { n: '01', label: 'Budget Planner', desc: 'Find money to put toward debt faster.', href: '/calculators/budget' },
  ],
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
};

export const faqsBySlug: Record<string, FAQItem[]> = {
  'compound-interest': [
    {
      q: 'What is compound interest?',
      a: 'Compound interest is interest earned on both your original deposit and any interest already accumulated. Unlike simple interest (which only earns on the principal), compound interest snowballs: the longer you wait, the faster it grows.',
    },
    {
      q: 'How does compounding frequency affect my returns?',
      a: 'The more frequently interest compounds, the more you earn. Monthly compounding produces higher returns than annual compounding because interest is added to your balance more often, giving each addition more time to earn. Daily compounding is marginally better still.',
    },
    {
      q: 'What is the Rule of 72?',
      a: 'Divide 72 by your annual interest rate to estimate how many years it takes to double your money. At 4%, money doubles in roughly 18 years. At 8%, roughly 9 years. It\'s a quick mental check on the power of compounding.',
    },
  ],
  mortgage: [
    {
      q: 'How is my monthly mortgage payment calculated?',
      a: 'Using the annuity formula: M = L × [r(1+r)^n] / [(1+r)^n − 1], where L is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments. Every euro paid early reduces the outstanding principal and the interest charged on it.',
    },
    {
      q: 'Should I choose a shorter loan term?',
      a: 'A shorter term means higher monthly payments but far less total interest. On a €300,000 loan at 4%, a 15-year term saves roughly €80,000 in interest compared to 30 years, though monthly payments are about €600 higher. Use the calculator to find the term that fits your cash flow.',
    },
    {
      q: 'What counts as a good mortgage rate?',
      a: 'It depends on the market and your lender. In the Netherlands, fixed rates for 10-year terms currently range from roughly 3–5%. Compare at least three lenders and factor in all fees, not just the headline rate, before committing.',
    },
  ],
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
  'take-home-pay': [
    {
      q: 'What tax brackets apply in the Netherlands in 2025?',
      a: 'Box 1 (wages) is taxed at 35.82% on income up to €38,441, and 49.50% above that. These rates include national insurance contributions (volksverzekeringen); not just income tax.',
    },
    {
      q: 'What is the Arbeidskorting?',
      a: 'The Arbeidskorting (employment tax credit) directly reduces the tax you owe as an employee. In 2025, the maximum credit is approximately €5,159, reached at an income of around €39,957. Above that threshold, it phases out at 6.51% per euro.',
    },
    {
      q: 'Is vakantiegeld included in the calculation?',
      a: 'Yes. Dutch employers are legally required to pay 8% vakantiegeld (holiday pay) on top of gross salary. This calculator adds it to your annual gross before computing net pay, which is how most payslips work.',
    },
  ],
  'savings-goal': [
    {
      q: 'How does this calculator find how long it takes?',
      a: 'It solves the future value formula for time: given your starting balance, monthly contribution, and interest rate, it finds the number of months until your balance reaches the target. It compounds monthly.',
    },
    {
      q: 'What interest rate should I enter?',
      a: 'Use the actual rate on your savings account or investment portfolio. Dutch high-yield savings accounts currently offer around 2–3%. For long-term equity investments, historical average returns are roughly 7% before inflation, though past returns don\'t guarantee future results.',
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
  'borrowing-capacity': [
    {
      q: 'What are VFN/Nibud norms?',
      a: 'These are the borrowing standards set by Dutch consumer finance regulators (VFN) and the National Institute for Budget Information (Nibud). They cap monthly obligations (housing + loan payments) as a percentage of gross income: 20% for income below €1,500, rising to 35% above €4,000. Banks use these same norms when assessing applications.',
    },
    {
      q: 'Does this include my partner\'s income?',
      a: 'Yes. Enter both incomes and the calculator determines joint borrowing capacity. Dutch lenders typically count 100% of the primary earner\'s income and, for mortgages, a weighted portion of the secondary income.',
    },
  ],
  'credit-card-payoff': [
    {
      q: 'Why does it take so long to pay off my credit card?',
      a: 'Credit cards typically charge 15–25% annual interest, compounded monthly on the unpaid balance. When you only pay the minimum, most of the payment covers interest, barely touching the principal. This calculator shows the real timeline and total interest cost.',
    },
    {
      q: 'What happens if I double my monthly payment?',
      a: 'Doubling your payment often more than halves the payoff time, because less interest accrues each month. Try different payment amounts in the calculator; the interest savings are usually significant enough to change behaviour.',
    },
  ],
};

export const relatedForGuide: Record<string, RelatedItem[]> = {
  'saving-and-budgeting': [
    { n: '01', label: 'Budget Planner', desc: 'Apply the 50/30/20 rule to your income.', href: '/calculators/budget' },
    { n: '05', label: 'Savings Goal', desc: 'Calculate how long to reach your target.', href: '/calculators/savings-goal' },
  ],
  'what-is-inflation': [
    { n: '02', label: 'Compound Interest', desc: 'See if your savings outpace inflation.', href: '/calculators/compound-interest' },
    { n: '05', label: 'Savings Goal', desc: 'Plan with real purchasing power in mind.', href: '/calculators/savings-goal' },
  ],
  'compound-interest-explained': [
    { n: '02', label: 'Compound Interest', desc: 'Try the calculator from this guide.', href: '/calculators/compound-interest' },
    { n: '05', label: 'Savings Goal', desc: 'Put compounding to work on a real goal.', href: '/calculators/savings-goal' },
  ],
  'understanding-risk-tolerance': [
    { n: '02', label: 'Compound Interest', desc: 'Model how risk-adjusted returns grow over time.', href: '/calculators/compound-interest' },
    { n: '05', label: 'Savings Goal', desc: 'Plan your investment timeline.', href: '/calculators/savings-goal' },
  ],
  'how-to-choose-financial-advisor': [
    { n: '01', label: 'Budget Planner', desc: 'Know your numbers before the meeting.', href: '/calculators/budget' },
    { n: '07', label: 'Take-Home Pay', desc: 'Calculate your net income accurately.', href: '/calculators/take-home-pay' },
  ],
  'sparen-en-budgetteren': [
    { n: '01', label: 'Budgetcalculator', desc: 'Pas de 50/30/20-regel toe op jouw inkomen.', href: '/calculators/budget' },
    { n: '05', label: 'Spaardoel Calculator', desc: 'Bereken hoe lang je nodig hebt voor je doel.', href: '/calculators/savings-goal' },
  ],
  'wat-is-inflatie': [
    { n: '02', label: 'Samengestelde Rente', desc: 'Groeit je spaargeld sneller dan inflatie?', href: '/calculators/compound-interest' },
    { n: '05', label: 'Spaardoel Calculator', desc: 'Plan met reële koopkracht in gedachten.', href: '/calculators/savings-goal' },
  ],
  'rente-op-rente-uitgelegd': [
    { n: '02', label: 'Samengestelde Rente', desc: 'Probeer de calculator uit deze gids.', href: '/calculators/compound-interest' },
    { n: '05', label: 'Spaardoel Calculator', desc: 'Zet rente op rente in voor een echt doel.', href: '/calculators/savings-goal' },
  ],
  'risicotolerantie-begrijpen': [
    { n: '02', label: 'Samengestelde Rente', desc: 'Modelleer hoe rendement groeit over tijd.', href: '/calculators/compound-interest' },
    { n: '07', label: 'Nettoloon Calculator', desc: 'Weet wat je netto verdient vóór je belegt.', href: '/calculators/take-home-pay' },
  ],
  'financieel-adviseur-kiezen': [
    { n: '01', label: 'Budgetcalculator', desc: 'Ken je cijfers vóór het gesprek.', href: '/calculators/budget' },
    { n: '07', label: 'Nettoloon Calculator', desc: 'Bereken je nettosalaris nauwkeurig.', href: '/calculators/take-home-pay' },
  ],
};

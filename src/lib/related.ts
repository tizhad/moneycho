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

// Slugs whose page.tsx renders its own bilingual FAQ + FAQPage JSON-LD are
// intentionally absent here (mortgage, compound-interest, savings-goal,
// borrowing-capacity) — a second FAQ block would duplicate the schema.
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
  'take-home-pay': [
    {
      q: 'What tax brackets apply in the Netherlands in 2026?',
      a: 'Box 1 (wages) is taxed at 35.75% on income up to €38,883, 37.56% from €38,883 to €78,426, and 49.50% above that. These rates include national insurance contributions (volksverzekeringen), not just income tax.',
    },
    {
      q: 'What is the Arbeidskorting?',
      a: 'The Arbeidskorting (employment tax credit) directly reduces the tax you owe as an employee. In 2026, the maximum credit is €5,685, reached at an income of €45,592. Above that threshold, it phases out at 6.51% per euro, disappearing around €132,920.',
    },
    {
      q: 'Is vakantiegeld included in the calculation?',
      a: 'Yes. Dutch employers are legally required to pay 8% vakantiegeld (holiday pay) on top of gross salary. This calculator adds it to your annual gross before computing net pay, which is how most payslips work.',
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
  'schulden-en-lenen': [
    { n: '06', label: 'Creditcard Aflossing', desc: 'Bereken hoeveel de minimale betaling je echt kost.', href: '/calculators/credit-card-payoff' },
    { n: '04', label: 'Schulden Aflossen', desc: 'Avalanche vs sneeuwbal: welke methode wint?', href: '/calculators/debt-payoff' },
    { n: '03', label: 'Hypotheekcalculator', desc: 'Bereken je maandlasten en totale rente.', href: '/calculators/mortgage' },
  ],
  'debt-and-borrowing': [
    { n: '06', label: 'Credit Card Payoff', desc: 'See exactly what minimum payments actually cost you.', href: '/calculators/credit-card-payoff' },
    { n: '04', label: 'Debt Payoff', desc: 'Avalanche vs snowball: which method wins?', href: '/calculators/debt-payoff' },
    { n: '03', label: 'Mortgage Calculator', desc: 'Calculate monthly payments and total interest.', href: '/calculators/mortgage' },
  ],
  'vakantiegeld-slim-besteden': [
    { n: '05', label: 'Spaardoel Calculator', desc: 'Bereken hoe snel je noodfonds op peil is.', href: '/calculators/savings-goal' },
    { n: '04', label: 'Schulden Aflossen', desc: 'Vergelijk avalanche vs sneeuwbal methode.', href: '/calculators/debt-payoff' },
    { n: '02', label: 'Samengestelde Rente', desc: 'Zie wat je vakantiegeld over 20 jaar oplevert.', href: '/calculators/compound-interest' },
  ],
  'calculating-dutch-mortgage': [
    { n: '03', label: 'Mortgage Calculator', desc: 'Calculate monthly payments and total interest over any term.', href: '/calculators/mortgage' },
    { n: '09', label: 'Borrowing Capacity', desc: 'See your real ceiling based on Dutch Nibud norms.', href: '/calculators/borrowing-capacity' },
    { n: '07', label: 'Take-Home Pay', desc: 'Know your net income before you commit to a monthly payment.', href: '/calculators/take-home-pay' },
  ],
  'hypotheek-berekenen': [
    { n: '03', label: 'Hypotheekcalculator', desc: 'Bereken maandlasten en totale rente over elke looptijd.', href: '/calculators/mortgage' },
    { n: '09', label: 'Leencapaciteit', desc: 'Zie je echte plafond op basis van de Nederlandse Nibud-normen.', href: '/calculators/borrowing-capacity' },
    { n: '07', label: 'Nettoloon Calculator', desc: 'Weet wat je netto verdient vóórdat je een maandlast aangaat.', href: '/calculators/take-home-pay' },
  ],
  'holiday-pay-smart-spending': [
    { n: '05', label: 'Savings Goal', desc: 'Calculate how quickly you can build your emergency fund.', href: '/calculators/savings-goal' },
    { n: '04', label: 'Debt Payoff', desc: 'Compare the avalanche and snowball methods.', href: '/calculators/debt-payoff' },
    { n: '02', label: 'Compound Interest', desc: 'See what your holiday pay turns into over 20 years.', href: '/calculators/compound-interest' },
  ],
};

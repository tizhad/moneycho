import type { Locale } from '@/lib/i18n';

export type RelatedItem = {
  type: 'article' | 'calculator';
  slug: string;
  title: string;
  description: string;
  tag: string;
  href: string;
};

// Calculator metadata (title/description per locale)
const CALCULATORS: Record<string, Record<Locale, { title: string; description: string; tag: string }>> = {
  'credit-card-payoff': {
    en: { title: 'Credit Card Payoff Calculator', description: 'See exactly how long it takes to pay off your balance and how much interest you\'ll pay.', tag: 'Debt' },
    nl: { title: 'Creditcard Aflossen Calculator', description: 'Bereken precies hoe lang het duurt om je creditcard af te lossen en hoeveel rente je betaalt.', tag: 'Schuld' },
  },
  'debt-payoff': {
    en: { title: 'Debt Payoff Calculator', description: 'Build a clear payoff plan for all your debts and see your debt-free date.', tag: 'Debt' },
    nl: { title: 'Schulden Aflossen Calculator', description: 'Maak een duidelijk aflossingsplan voor al je schulden en zie wanneer je schuldenvrij bent.', tag: 'Schulden' },
  },
  'mortgage': {
    en: { title: 'Dutch Mortgage Calculator', description: 'Calculate your monthly mortgage payment, total interest, and amortization schedule.', tag: 'Mortgage' },
    nl: { title: 'Hypotheek Berekenen Calculator', description: 'Bereken je maandlasten, totale rentekosten en aflossingsschema voor je hypotheek.', tag: 'Hypotheek' },
  },
  'compound-interest': {
    en: { title: 'Compound Interest Calculator', description: 'See how your money grows over time with the power of compound interest.', tag: 'Investing' },
    nl: { title: 'Rente op Rente Calculator', description: 'Zie hoe je geld groeit door de kracht van samengestelde rente.', tag: 'Beleggen' },
  },
  'savings-goal': {
    en: { title: 'Savings Goal Calculator', description: 'Work backwards from your savings target to find out how much to save each month.', tag: 'Savings' },
    nl: { title: 'Spaardoel Calculator', description: 'Reken terug vanuit je spaardoel om te weten hoeveel je elke maand moet sparen.', tag: 'Sparen' },
  },
  'budget-planner': {
    en: { title: 'Budget Planner', description: 'Map your income and expenses to find out where your money goes each month.', tag: 'Budget' },
    nl: { title: 'Budget Planner', description: 'Breng je inkomsten en uitgaven in kaart en zie waar je geld naartoe gaat.', tag: 'Budget' },
  },
  'borrowing-capacity': {
    en: { title: 'Borrowing Capacity Calculator', description: 'Find out the maximum mortgage you can qualify for based on your income.', tag: 'Mortgage' },
    nl: { title: 'Maximale Hypotheek Calculator', description: 'Bereken hoeveel hypotheek je kunt krijgen op basis van je inkomen.', tag: 'Hypotheek' },
  },
  'annuiteit': {
    en: { title: 'Annuity Calculator', description: 'Calculate the fixed monthly payment for any loan using the annuity formula. Includes full amortization schedule.', tag: 'Loans' },
    nl: { title: 'Annuiteit Berekenen', description: 'Bereken de vaste maandlast van een lening met de annuïteitsformule. Inclusief volledig aflossingsschema.', tag: 'Lenen' },
  },
  'take-home-pay': {
    en: { title: 'Take-Home Pay Calculator', description: 'Calculate your net salary after Dutch taxes and social contributions.', tag: 'Income' },
    nl: { title: 'Nettoloon Calculator', description: 'Bereken je nettosalaris na Nederlandse belastingen en premies.', tag: 'Inkomen' },
  },
  'kosten-koper': {
    en: { title: "Dutch Buyer's Costs Calculator", description: 'Calculate all closing costs when buying a home in the Netherlands: transfer tax, notary, NHG, and more.', tag: 'Real Estate' },
    nl: { title: 'Kosten Koper Calculator', description: 'Bereken alle bijkomende kosten bij het kopen van een huis: overdrachtsbelasting, notariskosten, NHG en meer.', tag: 'Eigen woning' },
  },
  'rent-vs-buy': {
    en: { title: 'Rent vs Buy Calculator', description: 'Compare the long-term net worth of renting vs buying, including overdrachtsbelasting, NHG, and eigenwoningforfait.', tag: 'Real Estate' },
    nl: { title: 'Huren vs Kopen Calculator', description: 'Vergelijk het vermogen van huren en kopen op lange termijn, inclusief overdrachtsbelasting, NHG en eigenwoningforfait.', tag: 'Eigen woning' },
  },
};

// Related content map: article/calculator slug → related slugs (type:slug format)
// Order matters — first items are shown first
const RELATED_MAP: Record<string, string[]> = {
  // ── NL articles ──────────────────────────────────────────────
  'slim-lenen': [
    'calculator:credit-card-payoff',
    'calculator:debt-payoff',
    'article:schulden-en-lenen',
    'article:financieel-adviseur-kiezen',
  ],
  'schulden-en-lenen': [
    'calculator:credit-card-payoff',
    'calculator:debt-payoff',
    'article:slim-lenen',
    'article:financieel-adviseur-kiezen',
  ],
  'hypotheek-berekenen': [
    'calculator:mortgage',
    'calculator:borrowing-capacity',
    'article:financieel-adviseur-kiezen',
    'article:sparen-en-budgetteren',
  ],
  'rente-op-rente-uitgelegd': [
    'calculator:compound-interest',
    'calculator:savings-goal',
    'article:wat-is-inflatie',
    'article:risicotolerantie-begrijpen',
  ],
  'risicotolerantie-begrijpen': [
    'calculator:compound-interest',
    'calculator:savings-goal',
    'article:rente-op-rente-uitgelegd',
    'article:wat-is-inflatie',
  ],
  'financieel-adviseur-kiezen': [
    'calculator:savings-goal',
    'calculator:budget-planner',
    'article:sparen-en-budgetteren',
    'article:slim-lenen',
  ],
  'sparen-en-budgetteren': [
    'calculator:savings-goal',
    'calculator:budget-planner',
    'article:wat-is-inflatie',
    'article:vakantiegeld-slim-besteden',
  ],
  'wat-is-inflatie': [
    'calculator:savings-goal',
    'calculator:compound-interest',
    'article:sparen-en-budgetteren',
    'article:risicotolerantie-begrijpen',
  ],
  'vakantiegeld-slim-besteden': [
    'calculator:savings-goal',
    'calculator:compound-interest',
    'article:sparen-en-budgetteren',
    'article:wat-is-inflatie',
  ],

  // ── EN articles ───────────────────────────────────────────────
  'rules-for-borrowing': [
    'calculator:credit-card-payoff',
    'calculator:debt-payoff',
    'article:debt-and-borrowing',
    'article:how-to-choose-financial-advisor',
  ],
  'debt-and-borrowing': [
    'calculator:debt-payoff',
    'calculator:credit-card-payoff',
    'article:rules-for-borrowing',
    'article:how-to-choose-financial-advisor',
  ],
  'calculating-dutch-mortgage': [
    'calculator:mortgage',
    'calculator:borrowing-capacity',
    'article:how-to-choose-financial-advisor',
    'article:saving-and-budgeting',
  ],
  'compound-interest-explained': [
    'calculator:compound-interest',
    'calculator:savings-goal',
    'article:what-is-inflation',
    'article:understanding-risk-tolerance',
  ],
  'understanding-risk-tolerance': [
    'calculator:compound-interest',
    'calculator:savings-goal',
    'article:what-is-inflation',
    'article:saving-and-budgeting',
  ],
  'how-to-choose-financial-advisor': [
    'calculator:savings-goal',
    'calculator:budget-planner',
    'article:saving-and-budgeting',
    'article:rules-for-borrowing',
  ],
  'saving-and-budgeting': [
    'calculator:savings-goal',
    'calculator:budget-planner',
    'article:what-is-inflation',
    'article:holiday-pay-smart-spending',
  ],
  'what-is-inflation': [
    'calculator:savings-goal',
    'calculator:compound-interest',
    'article:saving-and-budgeting',
    'article:understanding-risk-tolerance',
  ],
  'holiday-pay-smart-spending': [
    'calculator:savings-goal',
    'calculator:compound-interest',
    'article:saving-and-budgeting',
    'article:what-is-inflation',
  ],

  // ── NL calculators ────────────────────────────────────────────
  'calculator:mortgage': [
    'calculator:kosten-koper',
    'calculator:borrowing-capacity',
    'calculator:rent-vs-buy',
    'article:overdrachtsbelasting-2026',
    'article:transfer-tax-netherlands-2026',
    'article:hypotheek-berekenen',
    'calculator:annuiteit',
  ],
  'calculator:credit-card-payoff': [
    'article:slim-lenen',
    'calculator:debt-payoff',
    'article:schulden-en-lenen',
    'article:financieel-adviseur-kiezen',
  ],
  'calculator:compound-interest': [
    'article:rente-op-rente-uitgelegd',
    'calculator:savings-goal',
    'article:wat-is-inflatie',
    'article:risicotolerantie-begrijpen',
  ],
  'calculator:savings-goal': [
    'article:sparen-en-budgetteren',
    'calculator:compound-interest',
    'article:vakantiegeld-slim-besteden',
    'article:wat-is-inflatie',
  ],
  'calculator:debt-payoff': [
    'article:schulden-en-lenen',
    'calculator:credit-card-payoff',
    'article:slim-lenen',
    'article:financieel-adviseur-kiezen',
  ],
  'calculator:annuiteit': [
    'calculator:mortgage',
    'calculator:debt-payoff',
    'article:hypotheek-berekenen',
    'article:schulden-en-lenen',
  ],
  'calculator:budget-planner': [
    'article:sparen-en-budgetteren',
    'calculator:savings-goal',
    'article:vakantiegeld-slim-besteden',
    'article:financieel-adviseur-kiezen',
  ],
  'calculator:kosten-koper': [
    'article:overdrachtsbelasting-2026',
    'article:transfer-tax-netherlands-2026',
    'calculator:mortgage',
    'calculator:rent-vs-buy',
    'calculator:borrowing-capacity',
    'article:hypotheek-berekenen',
  ],
  'calculator:rent-vs-buy': [
    'calculator:mortgage',
    'calculator:kosten-koper',
    'calculator:borrowing-capacity',
    'article:hypotheek-berekenen',
    'article:calculating-dutch-mortgage',
  ],

  // ── Transfer tax guides (NL + EN) ─────────────────────────────
  'overdrachtsbelasting-2026': [
    'calculator:kosten-koper',
    'calculator:mortgage',
    'article:hypotheek-berekenen',
    'calculator:borrowing-capacity',
  ],
  'transfer-tax-netherlands-2026': [
    'calculator:kosten-koper',
    'calculator:mortgage',
    'article:calculating-dutch-mortgage',
    'calculator:borrowing-capacity',
  ],
};

// Default fallback items when a slug has no mapping
const FALLBACK: Record<Locale, string[]> = {
  nl: [
    'calculator:savings-goal',
    'calculator:credit-card-payoff',
    'article:sparen-en-budgetteren',
    'article:slim-lenen',
  ],
  en: [
    'calculator:savings-goal',
    'calculator:credit-card-payoff',
    'article:saving-and-budgeting',
    'article:rules-for-borrowing',
  ],
};

export function getRelatedItems(
  slug: string,
  lang: Locale,
  guideList: { slug: string; title: string; description: string; tag: string }[],
  limit = 4
): RelatedItem[] {
  const key = slug.startsWith('calculator:') ? slug : slug;
  const refs = RELATED_MAP[key] ?? FALLBACK[lang];

  const items: RelatedItem[] = [];

  for (const ref of refs) {
    if (items.length >= limit) break;
    const [type, itemSlug] = ref.split(':') as ['article' | 'calculator', string];

    if (type === 'calculator') {
      const calc = CALCULATORS[itemSlug]?.[lang];
      if (!calc) continue;
      items.push({
        type: 'calculator',
        slug: itemSlug,
        title: calc.title,
        description: calc.description,
        tag: calc.tag,
        href: `/${lang}/calculators/${itemSlug}`,
      });
    } else {
      const guide = guideList.find((g) => g.slug === itemSlug);
      if (!guide) continue;
      items.push({
        type: 'article',
        slug: itemSlug,
        title: guide.title,
        description: guide.description,
        tag: guide.tag,
        href: `/${lang}/guides/${itemSlug}`,
      });
    }
  }

  return items;
}

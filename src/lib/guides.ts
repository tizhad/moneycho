import type { Locale } from '@/lib/i18n';

export type Guide = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  author?: string;
};

export const guides: Record<Locale, Guide[]> = {
  en: [
    {
      slug: 'saving-and-budgeting',
      title: 'Saving and Budgeting: How to Take Control of Your Financial Future',
      description:
        'Learn why budgeting matters more than you think, how to protect yourself from financial disruption, and the simple first step to taking control of your money.',
      tag: 'saving',
      date: 'June 24, 2026',
      author: 'Moneycho Editorial',
    },
    {
      slug: 'what-is-inflation',
      title: "What Is Inflation and Why It's Quietly Eroding Your Savings",
      description:
        'Learn what inflation really means, why keeping money in a savings account can cost you, and how to make sure your money grows faster than prices rise.',
      tag: 'saving',
      date: 'June 24, 2026',
      author: 'Moneycho Editorial',
    },
    {
      slug: 'compound-interest-explained',
      title: 'Compound Interest Explained: How Your Money Grows Over Time',
      description:
        'Understand the power of compound interest, the formula behind it, why starting early matters, and how to use compounding in your everyday financial decisions.',
      tag: 'investing',
      date: 'June 24, 2026',
      author: 'Moneycho Editorial',
    },
    {
      slug: 'understanding-risk-tolerance',
      title: 'Understanding Your Risk Tolerance: How to Invest Without Losing Sleep',
      description:
        'Figure out how much investment risk is right for you, avoid common psychological mistakes, and build a strategy that matches your goals and temperament.',
      tag: 'investing',
      date: 'June 24, 2026',
      author: 'Moneycho Editorial',
    },
    {
      slug: 'how-to-choose-financial-advisor',
      title: 'How to Choose a Financial Advisor You Can Actually Trust',
      description:
        'Learn how financial advisors get paid, what to look for, red flags to watch out for, and how to find an advisor who truly acts in your best interest.',
      tag: 'planning',
      date: 'June 24, 2026',
      author: 'Moneycho Editorial',
    },
  ],
  nl: [
    {
      slug: 'sparen-en-budgetteren',
      title: 'Sparen en Budgetteren: Hoe Je Grip Krijgt op Je Financiële Toekomst',
      description:
        'Ontdek waarom budgetteren belangrijker is dan je denkt, hoe je jezelf beschermt tegen financiële tegenslag, en de eerste simpele stap naar grip op je geld.',
      tag: 'sparen',
      date: '24 juni 2026',
      author: 'Moneycho Redactie',
    },
    {
      slug: 'wat-is-inflatie',
      title: 'Wat Is Inflatie en Waarom Het Stilletjes Je Spaargeld Uitholt',
      description:
        'Leer wat inflatie echt betekent, waarom geld op een spaarrekening je geld kost, en hoe je zorgt dat je vermogen sneller groeit dan de prijzen stijgen.',
      tag: 'sparen',
      date: '24 juni 2026',
      author: 'Moneycho Redactie',
    },
    {
      slug: 'rente-op-rente-uitgelegd',
      title: 'Rente op Rente Uitgelegd: Zo Groeit Je Geld Vanzelf',
      description:
        'Begrijp de kracht van rente op rente, de formule erachter, waarom vroeg beginnen cruciaal is, en hoe je compounding gebruikt in je dagelijkse financiële beslissingen.',
      tag: 'beleggen',
      date: '24 juni 2026',
      author: 'Moneycho Redactie',
    },
    {
      slug: 'risicotolerantie-begrijpen',
      title: 'Risicotolerantie Begrijpen: Beleggen Zonder Wakker Te Liggen',
      description:
        'Ontdek hoeveel beleggingsrisico bij jou past, vermijd veelgemaakte psychologische fouten, en bouw een strategie die past bij je doelen en karakter.',
      tag: 'beleggen',
      date: '24 juni 2026',
      author: 'Moneycho Redactie',
    },
    {
      slug: 'financieel-adviseur-kiezen',
      title: 'Hoe Kies Je een Financieel Adviseur Die Je Kunt Vertrouwen',
      description:
        'Leer hoe financieel adviseurs betaald worden, waar je op moet letten, rode vlaggen om op te passen, en hoe je een adviseur vindt die echt in jouw belang handelt.',
      tag: 'planning',
      date: '24 juni 2026',
      author: 'Moneycho Redactie',
    },
  ],
};

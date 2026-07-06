const LAST_VERIFIED = { en: 'July 2026', nl: 'juli 2026' } as const;

// Per-calculator data sources shown in the methodology block. Slugs without
// an entry fall back to the generic formula line.
const SOURCES: Record<string, { en: string; nl: string }> = {
  mortgage: {
    en: 'NIBUD loan-to-income tables 2026 · NHG cost limit €435,000 (2026) · Belastingdienst (hypotheekrenteaftrek) · indicative lender rates from public market data',
    nl: 'NIBUD-leennormen 2026 · NHG-kostengrens € 435.000 (2026) · Belastingdienst (hypotheekrenteaftrek) · indicatieve rentes op basis van openbare marktdata',
  },
  'borrowing-capacity': {
    en: 'VFN Gedragscode Consumptief Krediet · Nibud lending norms · AFM toetsrente',
    nl: 'VFN Gedragscode Consumptief Krediet · Nibud-leennormen · AFM-toetsrente',
  },
  'take-home-pay': {
    en: 'Belastingdienst Box 1 rates · arbeidskorting and algemene heffingskorting tables · statutory 8% vakantiegeld',
    nl: 'Belastingdienst Box 1-tarieven · tabellen arbeidskorting en algemene heffingskorting · wettelijk 8% vakantiegeld',
  },
  'kosten-koper': {
    en: 'Belastingdienst transfer tax (overdrachtsbelasting) 2026 incl. starter exemption · indicative notary and appraisal fees',
    nl: 'Belastingdienst overdrachtsbelasting 2026 incl. startersvrijstelling · indicatieve notaris- en taxatiekosten',
  },
  'budget-planner': {
    en: '50/30/20 budgeting method · Nibud reference budgets',
    nl: '50/30/20-budgetmethode · Nibud-referentiebudgetten',
  },
  budget: {
    en: '50/30/20 budgeting method (needs / wants / savings)',
    nl: '50/30/20-budgetmethode (vaste lasten / wensen / sparen)',
  },
};

const GENERIC = {
  en: 'Standard financial mathematics (annuity and compound interest formulas); no external data feeds',
  nl: 'Standaard financiële wiskunde (annuïteiten- en samengestelde-renteformules); geen externe databronnen',
} as const;

const COPY = {
  en: {
    heading: 'Sources & methodology',
    verified: 'Last verified:',
    disclaimer:
      'MoneyCho calculators are educational tools. Results are indicative and do not constitute financial advice.',
  },
  nl: {
    heading: 'Bronnen & methode',
    verified: 'Laatst gecontroleerd:',
    disclaimer:
      'MoneyCho-calculators zijn educatieve tools. Uitkomsten zijn indicatief en vormen geen financieel advies.',
  },
} as const;

export function MethodologyNote({ slug, lang }: { slug: string; lang?: string }) {
  const l = lang === 'nl' ? 'nl' : 'en';
  const c = COPY[l];
  const sources = SOURCES[slug]?.[l] ?? GENERIC[l];

  return (
    <div className="border-t border-emerald-deep/10 mt-16 pt-8">
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-3">
        {c.heading}
      </p>
      <p className="text-xs text-emerald-deep/50 leading-relaxed mb-2">
        {sources} · <span className="font-semibold">{c.verified}</span> {LAST_VERIFIED[l]}
      </p>
      <p className="text-xs text-emerald-deep/35 leading-relaxed">{c.disclaimer}</p>
    </div>
  );
}

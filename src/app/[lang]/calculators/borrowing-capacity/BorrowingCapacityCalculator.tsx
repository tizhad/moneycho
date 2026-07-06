"use client";

import { useState, useMemo } from "react";

// ── NL lending norms (VFN Gedragscode Consumptief Krediet) ────────
// The fraction of net monthly income that may go toward ALL financial
// obligations (housing + existing loans + new loan).
// Lenders use Nibud tables per household type; we use the standard
// tiered approximation that NL comparison sites apply.
function maxObligationFraction(netMonthlyIncome: number): number {
  if (netMonthlyIncome < 1500) return 0.20;
  if (netMonthlyIncome < 2500) return 0.25;
  if (netMonthlyIncome < 4000) return 0.30;
  return 0.35;
}
// ─────────────────────────────────────────────────────────────────

const TERMS = [12, 24, 36, 48, 60, 72, 84];

const T = {
  en: {
    tag: 'Borrowing · Netherlands',
    h1: 'How Much Can I Borrow?',
    intro:
      'Calculate the maximum personal loan you can take based on your net income and existing obligations. Based on VFN Gedragscode / Nibud norms used by Dutch lenders.',
    ownIncome: 'Your Net Monthly Income',
    ownIncomeHint: 'after tax · use the Take-Home Pay calculator if unsure',
    partnerIncome: "Partner's Net Monthly Income",
    partnerIncomeHint: 'leave 0 if not applicable',
    housing: 'Monthly Housing Costs',
    housingHint: 'rent or mortgage payment',
    existingLoans: 'Other Monthly Loan Payments',
    existingLoansHint: 'total of all existing loan repayments',
    term: 'Loan Term',
    months: 'months',
    yearAbbr: 'yr',
    rateLabel: (rate: string) => `Interest Rate: ${rate}% per year`,
    rateHint: 'Current NL personal loan rates: ~5–9%',
    estimateBold: 'Estimate only.',
    estimateRest:
      " Actual capacity depends on your credit history (BKR), employer type, and the individual lender's assessment. Compare live rates at geld.nl before applying.",
    heroLabel: 'Maximum Loan Amount',
    heroOverLimit: 'existing obligations exceed your borrowing limit',
    heroSummary: (term: number, rate: number, payment: string) =>
      `${term / 12 < 1 ? `${term} months` : `${term / 12} year`} · ${rate}% · ${payment}/mo`,
    statMonthly: 'Monthly payment',
    statTotal: 'Total repayment',
    statInterest: 'Total interest',
    allocation: 'Income allocation',
    overCommitted: (committed: string, limit: string, pct: string) =>
      `Your existing obligations (${committed}/mo) already exceed the lending limit (${limit}/mo at ${pct}% of income). Reducing housing costs or paying off existing loans increases capacity.`,
    segHousing: 'Housing',
    segLoans: 'Existing loans',
    segNewLoan: 'New loan',
    segFree: 'Free',
    breakdown: "How it's calculated",
    rowIncome: 'Total net income',
    rowLimit: 'Obligation limit',
    rowLimitPct: (pct: string) => `(${pct}% of income)`,
    rowHousing: 'Housing costs',
    rowLoans: 'Existing loan payments',
    rowAvailable: 'Available for new loan',
    rowTerm: 'Loan term',
    rowTermValue: (m: number) => `${m} months`,
    rowRate: 'Interest rate',
    rowRateValue: (r: number) => `${r}% / year`,
    rowMax: 'Max loan amount',
    perMo: '/mo',
  },
  nl: {
    tag: 'Lenen · Nederland',
    h1: 'Hoeveel Kan Ik Lenen?',
    intro:
      'Bereken direct het maximale bedrag dat je kunt lenen op basis van je netto inkomen en bestaande verplichtingen. Gebaseerd op de VFN Gedragscode en Nibud-normen die Nederlandse kredietverstrekkers gebruiken.',
    ownIncome: 'Jouw Netto Maandinkomen',
    ownIncomeHint: 'na belasting · gebruik de Nettoloon Calculator als je het niet weet',
    partnerIncome: 'Netto Maandinkomen Partner',
    partnerIncomeHint: 'laat 0 staan indien niet van toepassing',
    housing: 'Maandelijkse Woonlasten',
    housingHint: 'huur of hypotheeklasten',
    existingLoans: 'Overige Maandelijkse Aflossingen',
    existingLoansHint: 'totaal van al je bestaande leningen',
    term: 'Looptijd',
    months: 'maanden',
    yearAbbr: 'jr',
    rateLabel: (rate: string) => `Rente: ${rate}% per jaar`,
    rateHint: 'Actuele NL rentes persoonlijke lening: ~5–9%',
    estimateBold: 'Indicatie.',
    estimateRest:
      ' De werkelijke leencapaciteit hangt af van je BKR-registratie, type dienstverband en de beoordeling van de kredietverstrekker. Vergelijk actuele rentes voordat je een lening aanvraagt.',
    heroLabel: 'Maximaal Leenbedrag',
    heroOverLimit: 'je bestaande verplichtingen overschrijden je leenruimte',
    heroSummary: (term: number, rate: number, payment: string) =>
      `${term / 12 < 1 ? `${term} maanden` : `${term / 12} jaar`} · ${rate}% · ${payment}/mnd`,
    statMonthly: 'Maandlasten',
    statTotal: 'Totaal terugbetaald',
    statInterest: 'Totale rente',
    allocation: 'Inkomensverdeling',
    overCommitted: (committed: string, limit: string, pct: string) =>
      `Je bestaande verplichtingen (${committed}/mnd) overschrijden de leennorm (${limit}/mnd bij ${pct}% van je inkomen). Lagere woonlasten of het aflossen van bestaande leningen vergroot je leenruimte.`,
    segHousing: 'Wonen',
    segLoans: 'Bestaande leningen',
    segNewLoan: 'Nieuwe lening',
    segFree: 'Vrij',
    breakdown: 'Zo is het berekend',
    rowIncome: 'Totaal netto inkomen',
    rowLimit: 'Verplichtingennorm',
    rowLimitPct: (pct: string) => `(${pct}% van inkomen)`,
    rowHousing: 'Woonlasten',
    rowLoans: 'Bestaande aflossingen',
    rowAvailable: 'Beschikbaar voor nieuwe lening',
    rowTerm: 'Looptijd',
    rowTermValue: (m: number) => `${m} maanden`,
    rowRate: 'Rente',
    rowRateValue: (r: number) => `${r}% / jaar`,
    rowMax: 'Maximaal leenbedrag',
    perMo: '/mnd',
  },
} as const;

const fmt = (n: number) =>
  "€ " + Math.round(n).toLocaleString("nl-NL");

const fmtPrecise = (n: number) =>
  "€ " +
  n.toLocaleString("nl-NL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep mb-2">
        {label}
        {hint && (
          <span className="ml-2 font-normal normal-case tracking-normal text-emerald-deep/40 text-[11px]">
            {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  prefix,
}: {
  value: number | "";
  onChange: (v: number | "") => void;
  prefix?: string;
}) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 font-display font-bold pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        type="number"
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))
        }
        onFocus={(e) => e.target.select()}
        placeholder="0"
        className={`w-full bg-paper border border-emerald-deep/20 py-3 font-display text-lg font-bold text-emerald-deep focus:outline-none focus:border-emerald-deep transition-colors ${prefix ? "pl-8" : "pl-4"} pr-4`}
      />
    </div>
  );
}

function SegmentBar({
  segments,
}: {
  segments: { pct: number; color: string; label: string }[];
}) {
  return (
    <div>
      <div className="flex h-4 overflow-hidden bg-emerald-deep/5 mb-4">
        {segments.map((s) => (
          <div
            key={s.label}
            className={`h-full transition-all duration-300 ${s.color}`}
            style={{ width: `${Math.max(0, s.pct)}%` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-emerald-deep/55">
        {segments.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5">
            <span
              className={`inline-block w-2 h-2 rounded-sm shrink-0 ${s.color}`}
            />
            {s.label} {s.pct.toFixed(0)}%
          </span>
        ))}
      </div>
    </div>
  );
}

export default function BorrowingCapacityCalculator({ lang }: { lang?: string }) {
  const t = T[lang === 'nl' ? 'nl' : 'en'];
  const [ownIncome, setOwnIncome] = useState<number | "">(3000);
  const [partnerIncome, setPartnerIncome] = useState<number | "">(0);
  const [housing, setHousing] = useState<number | "">(900);
  const [existingLoans, setExistingLoans] = useState<number | "">(0);
  const [termMonths, setTermMonths] = useState(60);
  const [annualRate, setAnnualRate] = useState(6.5);

  const r = useMemo(() => {
    const own = typeof ownIncome === "number" ? ownIncome : 0;
    const partner = typeof partnerIncome === "number" ? partnerIncome : 0;
    const housingCost = typeof housing === "number" ? housing : 0;
    const loans = typeof existingLoans === "number" ? existingLoans : 0;

    const totalIncome = own + partner;
    const fraction = maxObligationFraction(totalIncome);
    const maxObligations = totalIncome * fraction;

    const alreadyCommitted = housingCost + loans;
    const availablePayment = Math.max(0, maxObligations - alreadyCommitted);

    // Annuity loan: max principal given a monthly payment
    const monthlyRate = annualRate / 100 / 12;
    const maxLoan =
      monthlyRate === 0
        ? availablePayment * termMonths
        : (availablePayment * (1 - Math.pow(1 + monthlyRate, -termMonths))) /
          monthlyRate;

    const totalRepayment = availablePayment * termMonths;
    const totalInterest = Math.max(0, totalRepayment - maxLoan);

    // Bar percentages relative to total income
    const pctHousing = totalIncome > 0 ? (housingCost / totalIncome) * 100 : 0;
    const pctLoans = totalIncome > 0 ? (loans / totalIncome) * 100 : 0;
    const pctNewLoan =
      totalIncome > 0 ? (availablePayment / totalIncome) * 100 : 0;
    const pctFree = Math.max(0, 100 - pctHousing - pctLoans - pctNewLoan);
    const overCommitted = alreadyCommitted > maxObligations;

    return {
      totalIncome,
      maxObligations,
      alreadyCommitted,
      availablePayment,
      maxLoan,
      totalRepayment,
      totalInterest,
      fraction,
      pctHousing,
      pctLoans,
      pctNewLoan,
      pctFree,
      overCommitted,
    };
  }, [ownIncome, partnerIncome, housing, existingLoans, termMonths, annualRate]);

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* ── Left: Inputs ── */}
      <div>
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          {t.tag}
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-4">
          {t.h1}
        </h1>
        <p className="text-emerald-deep/60 leading-relaxed mb-12">
          {t.intro}
        </p>

        <div className="space-y-6">
          <Field label={t.ownIncome} hint={t.ownIncomeHint}>
            <NumberInput value={ownIncome} onChange={setOwnIncome} prefix="€" />
          </Field>

          <Field label={t.partnerIncome} hint={t.partnerIncomeHint}>
            <NumberInput value={partnerIncome} onChange={setPartnerIncome} prefix="€" />
          </Field>

          <Field label={t.housing} hint={t.housingHint}>
            <NumberInput value={housing} onChange={setHousing} prefix="€" />
          </Field>

          <Field label={t.existingLoans} hint={t.existingLoansHint}>
            <NumberInput value={existingLoans} onChange={setExistingLoans} prefix="€" />
          </Field>

          <Field label={t.term}>
            <div className="flex gap-2 flex-wrap">
              {TERMS.map((m) => (
                <button
                  key={m}
                  onClick={() => setTermMonths(m)}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-widest border transition-colors cursor-pointer ${
                    termMonths === m
                      ? "bg-emerald-deep text-paper border-emerald-deep"
                      : "bg-paper text-emerald-deep border-emerald-deep/20 hover:border-emerald-deep"
                  }`}
                >
                  {m < 12 ? `${m}m` : `${m / 12}${t.yearAbbr}`}
                </button>
              ))}
            </div>
          </Field>

          <Field label={t.rateLabel(annualRate.toFixed(1))}>
            <input
              type="range"
              min={4}
              max={12}
              step={0.5}
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full accent-emerald-deep h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-emerald-deep/40 mt-1.5">
              <span>4%</span>
              <span className="text-emerald-deep/60 font-medium">
                {t.rateHint}
              </span>
              <span>12%</span>
            </div>
          </Field>

          <div className="border border-emerald-deep/10 p-4 bg-emerald-deep/[0.02]">
            <p className="text-xs text-emerald-deep/50 leading-relaxed">
              <span className="font-bold text-emerald-deep/70">
                {t.estimateBold}
              </span>
              {t.estimateRest}
            </p>
          </div>
        </div>
      </div>

      {/* ── Right: Results (sticky) ── */}
      <div className="space-y-4 lg:sticky lg:top-24">
        {/* Hero */}
        <div
          className={`p-8 ${
            r.maxLoan <= 0
              ? "bg-[oklch(28%_0.09_25)]"
              : "bg-emerald-deep"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">
            {t.heroLabel}
          </p>
          <p className="font-display text-5xl font-bold text-paper">
            {r.maxLoan <= 0 ? "€ 0" : fmtPrecise(r.maxLoan)}
          </p>
          <p className="text-paper/50 text-sm mt-2">
            {r.maxLoan <= 0
              ? t.heroOverLimit
              : t.heroSummary(termMonths, annualRate, fmt(r.availablePayment))}
          </p>
        </div>

        {/* 3 stats */}
        <div className="grid grid-cols-3 gap-px bg-emerald-deep/10 border border-emerald-deep/10">
          {[
            { label: t.statMonthly, value: fmt(r.availablePayment) },
            { label: t.statTotal, value: fmt(r.totalRepayment) },
            { label: t.statInterest, value: fmt(r.totalInterest) },
          ].map((stat) => (
            <div key={stat.label} className="bg-paper p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep/40 mb-1">
                {stat.label}
              </p>
              <p className="font-display font-bold text-emerald-deep text-sm tabular-nums">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Income allocation bar */}
        <div className="bg-paper border border-emerald-deep/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            {t.allocation}
          </p>
          {r.overCommitted ? (
            <div className="text-xs text-red-600 font-medium bg-red-50 border border-red-200 p-3 mb-4">
              {t.overCommitted(
                fmt(r.alreadyCommitted),
                fmt(r.maxObligations),
                (r.fraction * 100).toFixed(0),
              )}
            </div>
          ) : null}
          <SegmentBar
            segments={[
              {
                pct: Math.min(r.pctHousing, 100),
                color: "bg-emerald-mid",
                label: t.segHousing,
              },
              {
                pct: Math.min(r.pctLoans, 100),
                color: "bg-gold",
                label: t.segLoans,
              },
              {
                pct: r.pctNewLoan,
                color: "bg-emerald-deep",
                label: t.segNewLoan,
              },
              {
                pct: r.pctFree,
                color: "bg-gold-bright",
                label: t.segFree,
              },
            ]}
          />
        </div>

        {/* Breakdown */}
        <div className="bg-paper border border-emerald-deep/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            {t.breakdown}
          </p>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-emerald-deep/5">
              <tr>
                <td className="py-2.5 text-emerald-deep/70">{t.rowIncome}</td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep tabular-nums">
                  {fmt(r.totalIncome)}{t.perMo}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-deep/55 pl-3">
                  {t.rowLimit}{" "}
                  <span className="text-emerald-deep/35 text-xs">
                    {t.rowLimitPct((r.fraction * 100).toFixed(0))}
                  </span>
                </td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep/70 tabular-nums">
                  {fmt(r.maxObligations)}{t.perMo}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-deep/55 pl-3">{t.rowHousing}</td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep/70 tabular-nums">
                  −{fmt(typeof housing === "number" ? housing : 0)}{t.perMo}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-deep/55 pl-3">{t.rowLoans}</td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep/70 tabular-nums">
                  −{fmt(typeof existingLoans === "number" ? existingLoans : 0)}{t.perMo}
                </td>
              </tr>
              <tr className="bg-emerald-deep/[0.02]">
                <td className="py-2.5 font-bold text-emerald-deep">
                  {t.rowAvailable}
                </td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep tabular-nums">
                  {fmt(r.availablePayment)}{t.perMo}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-deep/55 pl-3">
                  {t.rowTerm}
                </td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep/70 tabular-nums">
                  {t.rowTermValue(termMonths)}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-deep/55 pl-3">
                  {t.rowRate}
                </td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep/70 tabular-nums">
                  {t.rowRateValue(annualRate)}
                </td>
              </tr>
              <tr className="bg-emerald-deep/[0.02]">
                <td className="py-3 font-bold text-emerald-deep">
                  {t.rowMax}
                </td>
                <td className="py-3 text-right font-display font-bold text-base text-emerald-deep tabular-nums">
                  {r.maxLoan <= 0 ? "€ 0" : fmtPrecise(r.maxLoan)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

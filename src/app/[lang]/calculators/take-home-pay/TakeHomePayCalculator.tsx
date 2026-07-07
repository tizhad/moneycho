"use client";

import { useState, useMemo } from "react";

// ── NL 2026 Box 1 tax engine (below AOW age) ──────────────────────
// Source: Belastingdienst voorlopige aanslag 2026 parameters.
// Schijf 1: ≤ €38.883 → 35,75% · Schijf 2: ≤ €78.426 → 37,56% ·
// Schijf 3: > €78.426 → 49,50%
function box1Tax(income: number): number {
  if (income <= 0) return 0;
  const B1 = 38883;
  const B2 = 78426;
  if (income <= B1) return income * 0.3575;
  if (income <= B2) return B1 * 0.3575 + (income - B1) * 0.3756;
  return B1 * 0.3575 + (B2 - B1) * 0.3756 + (income - B2) * 0.495;
}

// Algemene heffingskorting 2026 — max €3.115, afbouw 6,398% vanaf €29.736
function ahk(income: number): number {
  const max = 3115;
  const phase = Math.max(0, (income - 29736) * 0.06398);
  return Math.max(0, max - phase);
}

// Arbeidskorting 2026 — max €5.685, afbouw 6,510% vanaf €45.592
function arbeidskorting(income: number): number {
  if (income <= 0) return 0;
  if (income <= 11965) return income * 0.08324;
  if (income <= 25845) return 996 + (income - 11965) * 0.31009;
  if (income <= 45592) return 5300 + (income - 25845) * 0.0195;
  return Math.max(0, 5685 - (income - 45592) * 0.0651);
}
// ─────────────────────────────────────────────────────────────────

const T = {
  en: {
    tag: 'Income · Netherlands',
    h1: 'Take-Home Pay Calculator',
    intro:
      'Calculate your Dutch net salary after income tax, algemene heffingskorting, and arbeidskorting. Official NL 2026 rates.',
    periodLabel: 'Salary Period',
    monthly: 'Monthly',
    annual: 'Annual',
    grossLabel: 'Gross Salary',
    grossHintMonthly: 'per month, excl. holiday pay',
    grossHintAnnual: 'per year, excl. holiday pay',
    infoBold: 'Netherlands 2026',
    infoRest:
      ' · Box 1: 35.75% up to €38,883 · 37.56% up to €78,426 · 49.50% above. Includes algemene heffingskorting and arbeidskorting. Assumes employed (loondienst), below AOW age.',
    heroLabel: 'Net Monthly Take-Home',
    heroSub: (annual: string, rate: string) => `${annual} / year · ${rate}% effective rate`,
    splitLabel: 'How your gross is split',
    netPct: 'Net',
    taxPct: 'Tax',
    breakdown: 'Breakdown',
    rowGross: 'Gross salary (annual)',
    rowVakantiegeld: 'Holiday pay',
    rowVakantiegeldSub: '(vakantiegeld 8%)',
    rowTaxable: 'Total taxable income',
    rowBox1: 'Box 1 income tax',
    rowAhk: 'AHK',
    rowAhkSub: '(algemene heffingskorting)',
    rowAk: 'Arbeidskorting',
    rowNetTax: 'Net tax paid',
    rowNetAnnual: 'Net income (annual)',
    rowNetMonthly: 'Net income (monthly)',
  },
  nl: {
    tag: 'Inkomen · Nederland',
    h1: 'Nettoloon Berekenen',
    intro:
      'Bereken je netto salaris na inkomstenbelasting, algemene heffingskorting en arbeidskorting. Officiële NL-tarieven 2026.',
    periodLabel: 'Salarisperiode',
    monthly: 'Per maand',
    annual: 'Per jaar',
    grossLabel: 'Bruto Salaris',
    grossHintMonthly: 'per maand, excl. vakantiegeld',
    grossHintAnnual: 'per jaar, excl. vakantiegeld',
    infoBold: 'Nederland 2026',
    infoRest:
      ' · Box 1: 35,75% tot € 38.883 · 37,56% tot € 78.426 · 49,50% daarboven. Inclusief algemene heffingskorting en arbeidskorting. Uitgangspunt: loondienst, onder AOW-leeftijd.',
    heroLabel: 'Netto Per Maand',
    heroSub: (annual: string, rate: string) => `${annual} / jaar · ${rate}% effectieve druk`,
    splitLabel: 'Zo wordt je bruto verdeeld',
    netPct: 'Netto',
    taxPct: 'Belasting',
    breakdown: 'Specificatie',
    rowGross: 'Bruto salaris (jaar)',
    rowVakantiegeld: 'Vakantiegeld',
    rowVakantiegeldSub: '(8%)',
    rowTaxable: 'Totaal belastbaar inkomen',
    rowBox1: 'Box 1 inkomstenbelasting',
    rowAhk: 'AHK',
    rowAhkSub: '(algemene heffingskorting)',
    rowAk: 'Arbeidskorting',
    rowNetTax: 'Betaalde belasting',
    rowNetAnnual: 'Netto inkomen (jaar)',
    rowNetMonthly: 'Netto inkomen (maand)',
  },
} as const;

const fmt = (n: number) =>
  "€ " + Math.round(n).toLocaleString("nl-NL");

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
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 font-display font-bold">
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

function Row({
  label,
  value,
  sub,
  bold,
  positive,
  negative,
}: {
  label: React.ReactNode;
  value: string;
  sub?: boolean;
  bold?: boolean;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <tr className={bold ? "bg-emerald-deep/[0.02]" : ""}>
      <td className={`py-2.5 ${bold ? "font-bold text-emerald-deep" : sub ? "text-emerald-deep/50 pl-3" : "text-emerald-deep/70"}`}>
        {label}
      </td>
      <td
        className={`py-2.5 text-right font-display font-bold tabular-nums ${
          positive
            ? "text-emerald-mid"
            : negative
            ? "text-red-500"
            : "text-emerald-deep"
        } ${bold ? "text-base" : "text-sm"}`}
      >
        {value}
      </td>
    </tr>
  );
}

type Period = "monthly" | "annual";

export default function TakeHomePayCalculator({ lang }: { lang?: string }) {
  const t = T[lang === 'nl' ? 'nl' : 'en'];
  const [gross, setGross] = useState<number | "">(4000);
  const [period, setPeriod] = useState<Period>("monthly");

  const grossAnnual = useMemo(() => {
    const g = typeof gross === "number" ? gross : 0;
    return period === "monthly" ? g * 12 : g;
  }, [gross, period]);

  const r = useMemo(() => {
    const vakantiegeld = grossAnnual * 0.08;
    const totalGross = grossAnnual + vakantiegeld;
    const taxBefore = box1Tax(totalGross);
    const creditAHK = ahk(totalGross);
    const creditAC = arbeidskorting(totalGross);
    const credits = Math.min(taxBefore, creditAHK + creditAC);
    const incomeTax = taxBefore - credits;
    const netAnnual = totalGross - incomeTax;
    const netMonthly = netAnnual / 12;
    const effectiveRate = totalGross > 0 ? (incomeTax / totalGross) * 100 : 0;
    const netPct = totalGross > 0 ? (netAnnual / totalGross) * 100 : 100;
    return {
      vakantiegeld,
      totalGross,
      taxBefore,
      creditAHK,
      creditAC,
      incomeTax,
      netAnnual,
      netMonthly,
      effectiveRate,
      netPct,
    };
  }, [grossAnnual]);

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* ── Inputs ── */}
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
          <Field label={t.periodLabel}>
            <div className="flex gap-2">
              {(["monthly", "annual"] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest border transition-colors cursor-pointer ${
                    period === p
                      ? "bg-emerald-deep text-paper border-emerald-deep"
                      : "bg-paper text-emerald-deep border-emerald-deep/20 hover:border-emerald-deep"
                  }`}
                >
                  {p === "monthly" ? t.monthly : t.annual}
                </button>
              ))}
            </div>
          </Field>

          <Field
            label={t.grossLabel}
            hint={period === "monthly" ? t.grossHintMonthly : t.grossHintAnnual}
          >
            <NumberInput value={gross} onChange={setGross} prefix="€" />
          </Field>

          <div className="border border-emerald-deep/10 p-4 bg-emerald-deep/[0.02]">
            <p className="text-xs text-emerald-deep/50 leading-relaxed">
              <span className="font-bold text-emerald-deep/70">
                {t.infoBold}
              </span>
              {t.infoRest}
            </p>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="space-y-4">
        {/* Hero number */}
        <div className="bg-emerald-deep text-paper p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">
            {t.heroLabel}
          </p>
          <p className="font-display text-5xl font-bold">
            {fmt(r.netMonthly)}
          </p>
          <p className="text-paper/50 text-sm mt-2">
            {t.heroSub(fmt(r.netAnnual), r.effectiveRate.toFixed(1))}
          </p>
        </div>

        {/* Breakdown bar */}
        <div className="bg-paper border border-emerald-deep/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            {t.splitLabel}
          </p>
          <div className="flex h-4 overflow-hidden mb-3">
            <div
              className="bg-emerald-deep h-full transition-all duration-300"
              style={{ width: `${r.netPct}%` }}
            />
            <div className="bg-gold h-full flex-1" />
          </div>
          <div className="flex justify-between text-xs text-emerald-deep/50">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 bg-emerald-deep rounded-sm" />
              {t.netPct} {r.netPct.toFixed(0)}%
            </span>
            <span className="flex items-center gap-1.5">
              {t.taxPct} {(100 - r.netPct).toFixed(0)}%
              <span className="inline-block w-2.5 h-2.5 bg-gold rounded-sm" />
            </span>
          </div>
        </div>

        {/* Detailed breakdown */}
        <div className="bg-paper border border-emerald-deep/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            {t.breakdown}
          </p>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-emerald-deep/5">
              <Row label={t.rowGross} value={fmt(grossAnnual)} />
              <Row
                label={
                  <>
                    {t.rowVakantiegeld}{" "}
                    <span className="text-emerald-deep/40 text-xs">
                      {t.rowVakantiegeldSub}
                    </span>
                  </>
                }
                value={`+${fmt(r.vakantiegeld)}`}
              />
              <Row
                label={t.rowTaxable}
                value={fmt(r.totalGross)}
                bold
              />
              <Row
                label={t.rowBox1}
                value={`−${fmt(r.taxBefore)}`}
                negative
              />
              <Row
                label={
                  <>
                    {t.rowAhk}{" "}
                    <span className="text-emerald-deep/40 text-xs">
                      {t.rowAhkSub}
                    </span>
                  </>
                }
                value={`+${fmt(r.creditAHK)}`}
                sub
                positive
              />
              <Row
                label={t.rowAk}
                value={`+${fmt(r.creditAC)}`}
                sub
                positive
              />
              <Row
                label={t.rowNetTax}
                value={`−${fmt(r.incomeTax)}`}
                negative
                bold
              />
              <Row
                label={t.rowNetAnnual}
                value={fmt(r.netAnnual)}
                bold
              />
              <Row
                label={t.rowNetMonthly}
                value={fmt(r.netMonthly)}
                bold
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

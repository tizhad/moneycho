"use client";

import { useState, useMemo } from "react";

// ── NL 2025 Box 1 tax engine ──────────────────────────────────────
function box1Tax(income: number): number {
  if (income <= 0) return 0;
  const B1 = 38441;
  if (income <= B1) return income * 0.3582;
  return B1 * 0.3582 + (income - B1) * 0.495;
}

// Algemene heffingskorting — general tax credit
function ahk(income: number): number {
  const max = 3362;
  const phase = Math.max(0, (income - 24813) * 0.06095);
  return Math.max(0, max - phase);
}

// Arbeidskorting — labour tax credit (employed only)
function arbeidskorting(income: number): number {
  if (income <= 0) return 0;
  if (income <= 11491) return income * 0.08231;
  if (income <= 24820) return 945 + (income - 11491) * 0.3003;
  if (income <= 39957) return 4947 + (income - 24820) * 0.014;
  return Math.max(0, 5159 - (income - 39957) * 0.0651);
}
// ─────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  "€ " + Math.round(n).toLocaleString("nl-NL");

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

export default function TakeHomePayPage() {
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
          Income · Netherlands
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-4">
          Take-Home Pay
        </h1>
        <p className="text-emerald-deep/60 leading-relaxed mb-12">
          Calculate your Dutch net salary after income tax, algemene
          heffingskorting, and arbeidskorting. NL 2025 rates.
        </p>

        <div className="space-y-6">
          <Field label="Salary Period">
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
                  {p === "monthly" ? "Monthly" : "Annual"}
                </button>
              ))}
            </div>
          </Field>

          <Field
            label="Gross Salary"
            hint={
              period === "monthly"
                ? "per month, excl. holiday pay"
                : "per year, excl. holiday pay"
            }
          >
            <NumberInput value={gross} onChange={setGross} prefix="€" />
          </Field>

          <div className="border border-emerald-deep/10 p-4 bg-emerald-deep/[0.02]">
            <p className="text-xs text-emerald-deep/50 leading-relaxed">
              <span className="font-bold text-emerald-deep/70">
                Netherlands 2025
              </span>{" "}
              — Box 1: 35.82% up to €38,441 · 49.50% above. Includes
              algemene heffingskorting and arbeidskorting. Assumes
              employed (loondienst).
            </p>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="space-y-4">
        {/* Hero number */}
        <div className="bg-emerald-deep text-paper p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">
            Net Monthly Take-Home
          </p>
          <p className="font-display text-5xl font-bold">
            {fmt(r.netMonthly)}
          </p>
          <p className="text-paper/50 text-sm mt-2">
            {fmt(r.netAnnual)} / year · {r.effectiveRate.toFixed(1)}%
            effective rate
          </p>
        </div>

        {/* Breakdown bar */}
        <div className="bg-paper border border-emerald-deep/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            How your gross is split
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
              Net {r.netPct.toFixed(0)}%
            </span>
            <span className="flex items-center gap-1.5">
              Tax {(100 - r.netPct).toFixed(0)}%
              <span className="inline-block w-2.5 h-2.5 bg-gold rounded-sm" />
            </span>
          </div>
        </div>

        {/* Detailed breakdown */}
        <div className="bg-paper border border-emerald-deep/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            Breakdown
          </p>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-emerald-deep/5">
              <Row label="Gross salary (annual)" value={fmt(grossAnnual)} />
              <Row
                label={
                  <>
                    Holiday pay{" "}
                    <span className="text-emerald-deep/40 text-xs">
                      (vakantiegeld 8%)
                    </span>
                  </>
                }
                value={`+${fmt(r.vakantiegeld)}`}
              />
              <Row
                label="Total taxable income"
                value={fmt(r.totalGross)}
                bold
              />
              <Row
                label="Box 1 income tax"
                value={`−${fmt(r.taxBefore)}`}
                negative
              />
              <Row
                label={
                  <>
                    AHK{" "}
                    <span className="text-emerald-deep/40 text-xs">
                      (algemene heffingskorting)
                    </span>
                  </>
                }
                value={`+${fmt(r.creditAHK)}`}
                sub
                positive
              />
              <Row
                label="Arbeidskorting"
                value={`+${fmt(r.creditAC)}`}
                sub
                positive
              />
              <Row
                label="Net tax paid"
                value={`−${fmt(r.incomeTax)}`}
                negative
                bold
              />
              <Row
                label="Net income (annual)"
                value={fmt(r.netAnnual)}
                bold
              />
              <Row
                label="Net income (monthly)"
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

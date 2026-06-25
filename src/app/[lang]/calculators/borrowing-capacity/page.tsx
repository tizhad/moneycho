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
const RATES = [4, 5, 6, 7, 8, 9, 10, 11, 12];

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

export default function BorrowingCapacityPage() {
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
          Borrowing · Netherlands
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-4">
          Borrowing Capacity
        </h1>
        <p className="text-emerald-deep/60 leading-relaxed mb-12">
          Calculate the maximum personal loan you can take based on your net
          income and existing obligations. Based on VFN Gedragscode / Nibud
          norms used by Dutch lenders.
        </p>

        <div className="space-y-6">
          <Field label="Your Net Monthly Income" hint="after tax · use Take-Home Pay #07 if unsure">
            <NumberInput value={ownIncome} onChange={setOwnIncome} prefix="€" />
          </Field>

          <Field label="Partner's Net Monthly Income" hint="leave 0 if not applicable">
            <NumberInput value={partnerIncome} onChange={setPartnerIncome} prefix="€" />
          </Field>

          <Field label="Monthly Housing Costs" hint="rent or mortgage payment">
            <NumberInput value={housing} onChange={setHousing} prefix="€" />
          </Field>

          <Field label="Other Monthly Loan Payments" hint="total of all existing loan repayments">
            <NumberInput value={existingLoans} onChange={setExistingLoans} prefix="€" />
          </Field>

          <Field label="Loan Term">
            <div className="flex gap-2 flex-wrap">
              {TERMS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTermMonths(t)}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-widest border transition-colors cursor-pointer ${
                    termMonths === t
                      ? "bg-emerald-deep text-paper border-emerald-deep"
                      : "bg-paper text-emerald-deep border-emerald-deep/20 hover:border-emerald-deep"
                  }`}
                >
                  {t < 12 ? `${t}m` : `${t / 12}yr`}
                </button>
              ))}
            </div>
          </Field>

          <Field label={`Interest Rate: ${annualRate.toFixed(1)}% per year`}>
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
                Current NL personal loan rates: ~5–9%
              </span>
              <span>12%</span>
            </div>
          </Field>

          <div className="border border-emerald-deep/10 p-4 bg-emerald-deep/[0.02]">
            <p className="text-xs text-emerald-deep/50 leading-relaxed">
              <span className="font-bold text-emerald-deep/70">
                Estimate only.
              </span>{" "}
              Actual capacity depends on your credit history (BKR), employer
              type, and the individual lender's assessment. Compare live
              rates at geld.nl before applying.
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
            Maximum Loan Amount
          </p>
          <p className="font-display text-5xl font-bold text-paper">
            {r.maxLoan <= 0 ? "€ 0" : fmtPrecise(r.maxLoan)}
          </p>
          <p className="text-paper/50 text-sm mt-2">
            {r.maxLoan <= 0
              ? "existing obligations exceed your borrowing limit"
              : `${termMonths / 12 < 1 ? `${termMonths} months` : `${termMonths / 12} year`} · ${annualRate}% · ${fmt(r.availablePayment)}/mo`}
          </p>
        </div>

        {/* 3 stats */}
        <div className="grid grid-cols-3 gap-px bg-emerald-deep/10 border border-emerald-deep/10">
          {[
            { label: "Monthly payment", value: fmt(r.availablePayment) },
            { label: "Total repayment", value: fmt(r.totalRepayment) },
            { label: "Total interest", value: fmt(r.totalInterest) },
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
            Income allocation
          </p>
          {r.overCommitted ? (
            <div className="text-xs text-red-600 font-medium bg-red-50 border border-red-200 p-3 mb-4">
              Your existing obligations ({fmt(r.alreadyCommitted)}/mo) already
              exceed the lending limit ({fmt(r.maxObligations)}/mo at{" "}
              {(r.fraction * 100).toFixed(0)}% of income). Reducing housing
              costs or paying off existing loans increases capacity.
            </div>
          ) : null}
          <SegmentBar
            segments={[
              {
                pct: Math.min(r.pctHousing, 100),
                color: "bg-emerald-mid",
                label: "Housing",
              },
              {
                pct: Math.min(r.pctLoans, 100),
                color: "bg-gold",
                label: "Existing loans",
              },
              {
                pct: r.pctNewLoan,
                color: "bg-emerald-deep",
                label: "New loan",
              },
              {
                pct: r.pctFree,
                color: "bg-gold-bright",
                label: "Free",
              },
            ]}
          />
        </div>

        {/* Breakdown */}
        <div className="bg-paper border border-emerald-deep/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            How it's calculated
          </p>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-emerald-deep/5">
              <tr>
                <td className="py-2.5 text-emerald-deep/70">Total net income</td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep tabular-nums">
                  {fmt(r.totalIncome)}/mo
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-deep/55 pl-3">
                  Obligation limit{" "}
                  <span className="text-emerald-deep/35 text-xs">
                    ({(r.fraction * 100).toFixed(0)}% of income)
                  </span>
                </td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep/70 tabular-nums">
                  {fmt(r.maxObligations)}/mo
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-deep/55 pl-3">Housing costs</td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep/70 tabular-nums">
                  −{fmt(typeof housing === "number" ? housing : 0)}/mo
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-deep/55 pl-3">Existing loan payments</td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep/70 tabular-nums">
                  −{fmt(typeof existingLoans === "number" ? existingLoans : 0)}/mo
                </td>
              </tr>
              <tr className="bg-emerald-deep/[0.02]">
                <td className="py-2.5 font-bold text-emerald-deep">
                  Available for new loan
                </td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep tabular-nums">
                  {fmt(r.availablePayment)}/mo
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-deep/55 pl-3">
                  Loan term
                </td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep/70 tabular-nums">
                  {termMonths} months
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-deep/55 pl-3">
                  Interest rate
                </td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep/70 tabular-nums">
                  {annualRate}% / year
                </td>
              </tr>
              <tr className="bg-emerald-deep/[0.02]">
                <td className="py-3 font-bold text-emerald-deep">
                  Max loan amount
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

"use client";

import { useState, useMemo, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { detectCurrency, saveCurrency, formatCurrency, CURRENCIES } from "@/lib/currency";

// ── field definitions ─────────────────────────────────────────────
type Fields = Record<string, number | "">;

const INCOME_FIELDS = [
  { key: "salary", label: "Net monthly salary (after tax)" },
  { key: "freelance", label: "Freelance / side income" },
  { key: "rental", label: "Rental income" },
  { key: "other", label: "Other income" },
];
const FIXED_FIELDS = [
  { key: "housing", label: "Rent / Mortgage" },
  { key: "utilities", label: "Utilities" },
  { key: "insurance", label: "Insurance" },
  { key: "subscriptions", label: "Subscriptions" },
  { key: "loans", label: "Loan payments" },
  { key: "childcare", label: "Childcare" },
  { key: "phone", label: "Phone / Internet" },
];
const VARIABLE_FIELDS = [
  { key: "groceries", label: "Groceries" },
  { key: "transport", label: "Transportation" },
  { key: "dining", label: "Dining & takeout" },
  { key: "entertainment", label: "Entertainment" },
  { key: "personalCare", label: "Personal care" },
  { key: "clothing", label: "Clothing" },
  { key: "healthcare", label: "Healthcare" },
  { key: "other", label: "Other variable" },
];
const SAVINGS_FIELDS = [
  { key: "retirement", label: "Pension / Retirement" },
  { key: "emergency", label: "Emergency fund" },
  { key: "investments", label: "Investments" },
];
// ─────────────────────────────────────────────────────────────────

function initFields(
  fields: { key: string }[],
  defaults: Record<string, number> = {}
): Fields {
  return Object.fromEntries(fields.map(({ key }) => [key, defaults[key] ?? 0]));
}

function sumFields(fields: Fields): number {
  return Object.values(fields).reduce<number>(
    (acc, v) => acc + (typeof v === "number" ? v : 0),
    0
  );
}

function patch(setter: Dispatch<SetStateAction<Fields>>) {
  return (key: string, v: number | "") =>
    setter((prev) => ({ ...prev, [key]: v }));
}

// ── sub-components ────────────────────────────────────────────────
function InlineInput({
  value,
  onChange,
  symbol,
}: {
  value: number | "";
  onChange: (v: number | "") => void;
  symbol: string;
}) {
  return (
    <div className="relative w-32 shrink-0">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-deep/35 text-sm pointer-events-none">
        {symbol}
      </span>
      <input
        type="number"
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))
        }
        onFocus={(e) => e.target.select()}
        placeholder="0"
        className="w-full bg-paper border border-emerald-deep/15 py-2 pl-7 pr-2 text-sm font-bold text-emerald-deep focus:outline-none focus:border-emerald-deep transition-colors text-right"
      />
    </div>
  );
}

function Section({
  title,
  dot,
  fields,
  values,
  onChange,
  symbol,
}: {
  title: string;
  dot: string;
  fields: { key: string; label: string }[];
  values: Fields;
  onChange: (key: string, v: number | "") => void;
  symbol: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-deep/10">
        <span className={`w-2 h-2 rounded-sm shrink-0 ${dot}`} />
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-deep">
          {title}
        </span>
      </div>
      <div className="space-y-2.5">
        {fields.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <span className="text-sm text-emerald-deep/60">{label}</span>
            <InlineInput
              value={values[key] ?? 0}
              onChange={(v) => onChange(key, v)}
              symbol={symbol}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────

export default function CashFlowPage() {
  const [currency, setCurrency] = useState("EUR");
  const [showSwitcher, setShowSwitcher] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  const [income, setIncome] = useState<Fields>(() =>
    initFields(INCOME_FIELDS, { salary: 3000 })
  );
  const [fixed, setFixed] = useState<Fields>(() =>
    initFields(FIXED_FIELDS, { housing: 900, utilities: 100, insurance: 80, subscriptions: 40, phone: 30 })
  );
  const [variable, setVariable] = useState<Fields>(() =>
    initFields(VARIABLE_FIELDS, { groceries: 300, transport: 100, dining: 80, entertainment: 50 })
  );
  const [savings, setSavings] = useState<Fields>(() =>
    initFields(SAVINGS_FIELDS, { retirement: 150, emergency: 50 })
  );

  useEffect(() => {
    setCurrency(detectCurrency());
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node))
        setShowSwitcher(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const selected = CURRENCIES.find((c) => c.code === currency);
  const symbol = selected?.symbol ?? "€";
  const fmt = useMemo(() => (n: number) => formatCurrency(n, currency), [currency]);

  const t = useMemo(() => {
    const totalIncome = sumFields(income);
    const totalFixed = sumFields(fixed);
    const totalVariable = sumFields(variable);
    const totalSavings = sumFields(savings);
    const totalExpenses = totalFixed + totalVariable + totalSavings;
    const cashFlow = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;
    const fixedPct = totalIncome > 0 ? Math.min(100, (totalFixed / totalIncome) * 100) : 0;
    const variablePct = totalIncome > 0 ? Math.min(100, (totalVariable / totalIncome) * 100) : 0;
    const savingsPct = totalIncome > 0 ? Math.min(100, (totalSavings / totalIncome) * 100) : 0;
    const surplusPct = Math.max(0, 100 - fixedPct - variablePct - savingsPct);
    return {
      totalIncome, totalFixed, totalVariable, totalSavings,
      totalExpenses, cashFlow, savingsRate,
      fixedPct, variablePct, savingsPct, surplusPct,
    };
  }, [income, fixed, variable, savings]);

  const isPositive = t.cashFlow >= 0;

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* ── Left: Inputs ── */}
      <div>
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          Budgeting
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-4">
          Monthly Cash Flow
        </h1>
        <p className="text-emerald-deep/60 leading-relaxed mb-8">
          Enter your real income and expenses to see your actual monthly
          surplus or shortfall. Not a plan, just a snapshot.
        </p>

        {/* Compact currency selector */}
        <div className="relative mb-8" ref={switcherRef}>
          <button
            onClick={() => setShowSwitcher(!showSwitcher)}
            className="flex items-center gap-2 text-xs font-bold text-emerald-deep/50 hover:text-emerald-deep transition-colors border border-emerald-deep/15 px-3 py-1.5 cursor-pointer"
          >
            <span>{selected?.code} · {selected?.name}</span>
            <span className="text-emerald-deep/30">{showSwitcher ? "▲" : "▼"}</span>
          </button>
          {showSwitcher && (
            <div className="absolute z-20 top-full left-0 mt-1 w-56 bg-paper border border-emerald-deep/20 max-h-64 overflow-y-auto shadow-lg">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrency(c.code);
                    saveCurrency(c.code);
                    setShowSwitcher(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-emerald-deep/5 transition-colors cursor-pointer ${
                    c.code === currency ? "bg-emerald-deep/5" : ""
                  }`}
                >
                  <span className="text-sm font-bold text-emerald-deep">{c.code}</span>
                  <span className="text-xs text-emerald-deep/50">{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <Section
            title="Income"
            dot="bg-emerald-deep"
            fields={INCOME_FIELDS}
            values={income}
            onChange={patch(setIncome)}
            symbol={symbol}
          />
          <Section
            title="Fixed Expenses"
            dot="bg-emerald-mid"
            fields={FIXED_FIELDS}
            values={fixed}
            onChange={patch(setFixed)}
            symbol={symbol}
          />
          <Section
            title="Variable Expenses"
            dot="bg-gold"
            fields={VARIABLE_FIELDS}
            values={variable}
            onChange={patch(setVariable)}
            symbol={symbol}
          />
          <Section
            title="Savings & Investments"
            dot="bg-gold-bright"
            fields={SAVINGS_FIELDS}
            values={savings}
            onChange={patch(setSavings)}
            symbol={symbol}
          />
        </div>
      </div>

      {/* ── Right: Results (sticky) ── */}
      <div className="space-y-4 lg:sticky lg:top-24">
        {/* Hero */}
        <div
          className={`p-8 ${
            isPositive ? "bg-emerald-deep" : "bg-[oklch(28%_0.09_25)]"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">
            Monthly Cash Flow
          </p>
          <p className="font-display text-5xl font-bold text-paper">
            {isPositive ? "+" : ""}
            {fmt(t.cashFlow)}
          </p>
          <p className="text-paper/50 text-sm mt-2">
            {isPositive
              ? "surplus: unallocated money at month end"
              : "shortfall: expenses exceed income"}
          </p>
        </div>

        {/* 3 stats */}
        <div className="grid grid-cols-3 gap-px bg-emerald-deep/10 border border-emerald-deep/10">
          {[
            { label: "Income", value: fmt(t.totalIncome) },
            { label: "Expenses", value: fmt(t.totalExpenses) },
            { label: "Savings rate", value: `${t.savingsRate.toFixed(0)}%` },
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

        {/* Stacked allocation bar */}
        <div className="bg-paper border border-emerald-deep/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            Where your income goes
          </p>
          <div className="flex h-4 overflow-hidden mb-4 bg-emerald-deep/5">
            <div
              className="bg-emerald-mid h-full transition-all duration-300"
              style={{ width: `${t.fixedPct}%` }}
            />
            <div
              className="bg-gold h-full transition-all duration-300"
              style={{ width: `${t.variablePct}%` }}
            />
            <div
              className="bg-gold-bright h-full transition-all duration-300"
              style={{ width: `${t.savingsPct}%` }}
            />
            <div
              className="bg-emerald-deep h-full transition-all duration-300"
              style={{ width: `${t.surplusPct}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-emerald-deep/55">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 bg-emerald-mid rounded-sm shrink-0" />
              Fixed {t.fixedPct.toFixed(0)}%
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 bg-gold rounded-sm shrink-0" />
              Variable {t.variablePct.toFixed(0)}%
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 bg-gold-bright rounded-sm shrink-0" />
              Savings {t.savingsPct.toFixed(0)}%
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 bg-emerald-deep rounded-sm shrink-0" />
              {isPositive ? "Surplus" : "Unallocated"} {t.surplusPct.toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Summary table */}
        <div className="bg-paper border border-emerald-deep/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            Summary
          </p>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-emerald-deep/5">
              <tr>
                <td className="py-2.5 text-emerald-deep/70">Total income</td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep tabular-nums">
                  {fmt(t.totalIncome)}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-deep/55 pl-3">Fixed expenses</td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep/70 tabular-nums">
                  −{fmt(t.totalFixed)}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-deep/55 pl-3">Variable expenses</td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-deep/70 tabular-nums">
                  −{fmt(t.totalVariable)}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-deep/55 pl-3">Savings & investments</td>
                <td className="py-2.5 text-right font-display font-bold text-emerald-mid tabular-nums">
                  −{fmt(t.totalSavings)}
                </td>
              </tr>
              <tr className="bg-emerald-deep/[0.02]">
                <td
                  className={`py-3 font-bold ${
                    isPositive ? "text-emerald-deep" : "text-red-600"
                  }`}
                >
                  {isPositive ? "Monthly surplus" : "Monthly shortfall"}
                </td>
                <td
                  className={`py-3 text-right font-display font-bold text-base tabular-nums ${
                    isPositive ? "text-emerald-deep" : "text-red-600"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {fmt(t.cashFlow)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

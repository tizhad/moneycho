"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { detectCurrency, saveCurrency, formatCurrency, CURRENCIES } from "@/lib/currency";

type Debt = {
  id: string;
  name: string;
  balance: number | "";
  rate: number | "";
  minPayment: number | "";
};

const DEFAULT_DEBTS: Debt[] = [
  { id: "1", name: "Credit Card", balance: 3000, rate: 22, minPayment: 60 },
  { id: "2", name: "Car Loan", balance: 8000, rate: 6.5, minPayment: 200 },
  { id: "3", name: "Student Loan", balance: 15000, rate: 5, minPayment: 150 },
];

let nextId = 4;

type SimResult = {
  months: number;
  totalInterest: number;
  payoffOrder: string[];
};

function simulate(debts: Debt[], monthlyBudget: number, strategy: "avalanche" | "snowball"): SimResult | null {
  const active = debts.filter(
    (d) => typeof d.balance === "number" && d.balance > 0 &&
           typeof d.rate === "number" && d.rate >= 0 &&
           typeof d.minPayment === "number" && d.minPayment >= 0
  );
  if (active.length === 0) return null;

  const state = active.map((d) => ({
    id: d.id,
    name: d.name,
    remaining: d.balance as number,
    rate: (d.rate as number) / 100 / 12,
    minPayment: d.minPayment as number,
  }));

  // Priority order is fixed at start
  const priority = [...state].sort((a, b) =>
    strategy === "avalanche"
      ? b.rate - a.rate       // highest interest first
      : a.remaining - b.remaining  // lowest balance first
  );

  let months = 0;
  let totalInterest = 0;
  const payoffOrder: string[] = [];

  while (state.some((d) => d.remaining > 0.01) && months < 600) {
    months++;

    // Apply monthly interest
    for (const d of state) {
      if (d.remaining > 0.01) {
        const interest = d.remaining * d.rate;
        totalInterest += interest;
        d.remaining += interest;
      }
    }

    // Apply minimum payments to all active debts
    let budgetLeft = monthlyBudget;
    for (const d of state) {
      if (d.remaining > 0.01) {
        const pay = Math.min(d.minPayment, d.remaining, budgetLeft);
        d.remaining -= pay;
        budgetLeft -= pay;
        if (d.remaining <= 0.01) {
          d.remaining = 0;
          if (!payoffOrder.includes(d.name)) payoffOrder.push(d.name);
        }
      }
    }

    // Apply remaining budget to priority target (snowball/avalanche rollover)
    for (const p of priority) {
      if (budgetLeft <= 0.01) break;
      const d = state.find((s) => s.id === p.id);
      if (!d || d.remaining <= 0.01) continue;
      const pay = Math.min(budgetLeft, d.remaining);
      d.remaining -= pay;
      budgetLeft -= pay;
      if (d.remaining <= 0.01) {
        d.remaining = 0;
        if (!payoffOrder.includes(d.name)) payoffOrder.push(d.name);
      }
    }
  }

  return { months, totalInterest, payoffOrder };
}

function formatMonths(n: number) {
  const y = Math.floor(n / 12);
  const m = n % 12;
  if (y === 0) return `${m}mo`;
  if (m === 0) return `${y}yr`;
  return `${y}yr ${m}mo`;
}

function CellInput({
  value, onChange, placeholder, prefix, suffix, type = "number",
}: {
  value: string | number; onChange: (v: string) => void; placeholder?: string; prefix?: string; suffix?: string; type?: string;
}) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-deep/40 text-sm font-bold">{prefix}</span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => e.target.select()}
        placeholder={placeholder ?? "0"}
        className={`w-full bg-paper border border-emerald-deep/20 py-2.5 text-sm font-bold text-emerald-deep focus:outline-none focus:border-emerald-deep transition-colors ${prefix ? "pl-7" : "pl-3"} ${suffix ? "pr-8" : "pr-3"}`}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-deep/40 text-sm font-bold">{suffix}</span>
      )}
    </div>
  );
}

export default function DebtPayoffPage() {
  const [debts, setDebts] = useState<Debt[]>(DEFAULT_DEBTS);
  const [extraPayment, setExtraPayment] = useState<number | "">(100);
  const [currency, setCurrency] = useState("USD");
  const [showSwitcher, setShowSwitcher] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setCurrency(detectCurrency()); }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setShowSwitcher(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleCurrencyChange(code: string) {
    setCurrency(code);
    saveCurrency(code);
    setShowSwitcher(false);
  }

  const selected = CURRENCIES.find((c) => c.code === currency);
  const fmt = useMemo(() => (n: number) => formatCurrency(n, currency), [currency]);
  const symbol = selected?.symbol ?? "$";

  function updateDebt(id: string, field: keyof Debt, raw: string) {
    setDebts((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        if (field === "name") return { ...d, name: raw };
        const num = raw === "" ? "" : Math.max(0, Number(raw));
        return { ...d, [field]: num };
      })
    );
  }

  function addDebt() {
    setDebts((prev) => [
      ...prev,
      { id: String(nextId++), name: "New Debt", balance: "", rate: "", minPayment: "" },
    ]);
  }

  function removeDebt(id: string) {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  }

  const totalMinimums = debts.reduce(
    (sum, d) => sum + (typeof d.minPayment === "number" ? d.minPayment : 0),
    0
  );
  const extra = typeof extraPayment === "number" ? extraPayment : 0;
  const monthlyBudget = totalMinimums + extra;

  const avalanche = useMemo(() => simulate(debts, monthlyBudget, "avalanche"), [debts, monthlyBudget]);
  const snowball = useMemo(() => simulate(debts, monthlyBudget, "snowball"), [debts, monthlyBudget]);

  const interestSaved = avalanche && snowball ? snowball.totalInterest - avalanche.totalInterest : 0;
  const monthsFaster = avalanche && snowball ? snowball.months - avalanche.months : 0;

  return (
    <div className="space-y-12">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Inputs */}
        <div>
          <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">Debt</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-4">
            Debt Payoff
          </h1>
          <p className="text-emerald-deep/60 leading-relaxed mb-10">
            Compare avalanche (highest interest first) vs snowball (smallest balance first). Both work — the best strategy is the one you stick with.
          </p>

          {/* Debt list */}
          <div className="mb-6 space-y-3">
            {debts.map((d) => (
              <div key={d.id} className="border border-emerald-deep/15 p-3 space-y-2">
                {/* Row 1: name + remove */}
                <div className="flex items-center gap-2">
                  <CellInput
                    type="text"
                    value={d.name}
                    onChange={(v) => updateDebt(d.id, "name", v)}
                    placeholder="Debt name"
                  />
                  <button
                    onClick={() => removeDebt(d.id)}
                    className="flex-shrink-0 flex items-center justify-center w-8 h-9 text-emerald-deep/25 hover:text-emerald-deep/60 transition-colors text-xl leading-none"
                    aria-label="Remove debt"
                  >
                    ×
                  </button>
                </div>
                {/* Row 2: balance, rate, min payment */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep/40 mb-1">Balance</p>
                    <CellInput value={d.balance} onChange={(v) => updateDebt(d.id, "balance", v)} prefix={symbol} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep/40 mb-1">Rate</p>
                    <CellInput value={d.rate} onChange={(v) => updateDebt(d.id, "rate", v)} suffix="%" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep/40 mb-1">Min / mo</p>
                    <CellInput value={d.minPayment} onChange={(v) => updateDebt(d.id, "minPayment", v)} prefix={symbol} />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addDebt}
              className="text-xs font-bold uppercase tracking-widest text-emerald-mid hover:text-emerald-deep transition-colors"
            >
              + Add Debt
            </button>
          </div>

          <div className="space-y-6">
            {/* Extra payment */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep mb-1">
                Extra Monthly Payment
              </label>
              <p className="text-xs text-emerald-deep/40 mb-2">
                Above your minimums ({fmt(totalMinimums)}/mo) — total budget: {fmt(monthlyBudget)}/mo
              </p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 font-display font-bold">{symbol}</span>
                <input
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
                  onFocus={(e) => e.target.select()}
                  placeholder="0"
                  className="w-full bg-paper border border-emerald-deep/20 pl-8 pr-4 py-3 font-display text-lg font-bold text-emerald-deep focus:outline-none focus:border-emerald-deep transition-colors"
                />
              </div>
            </div>

            {/* Currency */}
            <div className="relative" ref={switcherRef}>
              <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep mb-2">Currency</label>
              <button
                onClick={() => setShowSwitcher(!showSwitcher)}
                className="w-full flex items-center justify-between bg-paper border border-emerald-deep/20 px-4 py-3 hover:border-emerald-deep transition-colors"
              >
                <span className="font-display font-bold text-emerald-deep">
                  {selected?.code}{" "}
                  <span className="font-normal text-emerald-deep/50">— {selected?.name}</span>
                </span>
                <span className="text-emerald-deep/40 text-sm">{showSwitcher ? "▲" : "▼"}</span>
              </button>
              {showSwitcher && (
                <div className="absolute z-20 top-full left-0 right-0 bg-paper border border-emerald-deep/20 border-t-0 max-h-64 overflow-y-auto shadow-lg">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => handleCurrencyChange(c.code)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-emerald-deep/5 transition-colors ${c.code === currency ? "bg-emerald-deep/5" : ""}`}
                    >
                      <span className="text-sm font-bold text-emerald-deep">{c.code}</span>
                      <span className="text-xs text-emerald-deep/50">{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
              <p className="text-xs text-emerald-deep/30 mt-2">Auto-detected · change if incorrect</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {!avalanche || !snowball ? (
            <div className="bg-paper border border-emerald-deep/10 p-8 text-center">
              <p className="text-emerald-deep/50 text-sm">Add at least one debt with a balance, rate, and minimum payment.</p>
            </div>
          ) : (
            <>
              {/* Strategy comparison */}
              <div className="grid grid-cols-2 gap-4">
                {/* Avalanche */}
                <div className="bg-emerald-deep text-paper p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-paper/50 mb-1">Avalanche</p>
                  <p className="text-xs text-paper/40 mb-4">Highest rate first</p>
                  <p className="font-display text-3xl font-bold mb-1">{formatMonths(avalanche.months)}</p>
                  <p className="text-paper/50 text-xs mb-4">to debt-free</p>
                  <p className="font-display text-xl font-bold">{fmt(avalanche.totalInterest)}</p>
                  <p className="text-paper/50 text-xs">total interest</p>
                </div>

                {/* Snowball */}
                <div className="bg-paper border border-emerald-deep/10 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep/40 mb-1">Snowball</p>
                  <p className="text-xs text-emerald-deep/30 mb-4">Lowest balance first</p>
                  <p className="font-display text-3xl font-bold text-emerald-deep mb-1">{formatMonths(snowball.months)}</p>
                  <p className="text-emerald-deep/40 text-xs mb-4">to debt-free</p>
                  <p className="font-display text-xl font-bold text-emerald-deep">{fmt(snowball.totalInterest)}</p>
                  <p className="text-emerald-deep/40 text-xs">total interest</p>
                </div>
              </div>

              {/* Insight */}
              {(interestSaved !== 0 || monthsFaster !== 0) && (
                <div className="bg-paper border border-gold/40 p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Avalanche Advantage</p>
                  <p className="text-sm text-emerald-deep/70 leading-relaxed">
                    {interestSaved > 0 && (
                      <>Saves <strong className="text-emerald-deep">{fmt(interestSaved)}</strong> in interest</>
                    )}
                    {interestSaved > 0 && monthsFaster > 0 && " and "}
                    {monthsFaster > 0 && (
                      <>pays off <strong className="text-emerald-deep">{formatMonths(monthsFaster)}</strong> sooner</>
                    )}
                    {interestSaved === 0 && monthsFaster === 0 && "Both strategies give the same result for your debts."}
                    {interestSaved > 0 && ". Snowball wins on motivation — paying off a small debt fast builds momentum."}
                  </p>
                </div>
              )}

              {/* Payoff order */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Avalanche order", result: avalanche },
                  { label: "Snowball order", result: snowball },
                ].map(({ label, result }) => (
                  <div key={label} className="bg-paper border border-emerald-deep/10 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep/40 mb-3">{label}</p>
                    <ol className="space-y-1.5">
                      {result.payoffOrder.map((name, i) => (
                        <li key={name} className="flex items-center gap-2 text-sm">
                          <span className="font-display font-bold text-gold text-xs w-4">{i + 1}</span>
                          <span className="text-emerald-deep/70">{name}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { detectCurrency, saveCurrency, formatCurrency, CURRENCIES } from "@/lib/currency";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const BUCKET_COLORS = ["#1a3d2f", "#2d5040", "#c9a230"];

const buckets = [
  { label: "Needs", pct: 50, desc: "Rent, groceries, utilities, minimum debt payments", color: "bg-emerald-deep" },
  { label: "Wants", pct: 30, desc: "Dining out, subscriptions, entertainment, travel", color: "bg-emerald-mid" },
  { label: "Savings & Debt", pct: 20, desc: "Emergency fund, investments, extra debt payments", color: "bg-gold" },
];

export default function BudgetPage() {
  const [income, setIncome] = useState<number | "">("");
  const [currency, setCurrency] = useState("USD");
  const [showSwitcher, setShowSwitcher] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrency(detectCurrency());
    setIncome(5000);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setShowSwitcher(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleCurrencyChange(code: string) {
    setCurrency(code);
    saveCurrency(code);
    setShowSwitcher(false);
  }

  const fmt = useMemo(
    () => (n: number) => formatCurrency(n, currency),
    [currency]
  );

  const numericIncome = typeof income === "number" ? income : 0;
  const selected = CURRENCIES.find((c) => c.code === currency);

  const pieData = buckets.map((b, i) => ({
    name: b.label,
    value: numericIncome * (b.pct / 100),
    pct: b.pct,
    color: BUCKET_COLORS[i],
  }));

  return (
    <>
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Left — inputs */}
      <div>
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          Budgeting
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-4">
          Budget Planner
        </h1>
        <p className="text-emerald-deep/60 leading-relaxed mb-12">
          The 50/30/20 rule splits your after-tax income into needs, wants, and savings. Adjust your income to see the recommended allocation.
        </p>

        <div className="space-y-6">
          {/* Income input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep mb-2">
              Monthly After-Tax Income
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 font-display font-bold text-sm">
                {selected?.symbol ?? "$"}
              </span>
              <input
                type="number"
                value={income}
                onChange={(e) =>
                  setIncome(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))
                }
                onFocus={(e) => e.target.select()}
                placeholder="0"
                className="w-full bg-paper border border-emerald-deep/20 pl-8 pr-4 py-3 font-display text-lg font-bold text-emerald-deep focus:outline-none focus:border-emerald-deep transition-colors"
              />
            </div>
          </div>

          {/* Currency switcher */}
          <div className="relative" ref={switcherRef}>
            <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep mb-2">
              Currency
            </label>
            <button
              onClick={() => setShowSwitcher(!showSwitcher)}
              className="w-full flex items-center justify-between bg-paper border border-emerald-deep/20 px-4 py-3 hover:border-emerald-deep transition-colors"
            >
              <span className="font-display font-bold text-emerald-deep">
                {selected?.code}{" "}
                <span className="font-normal text-emerald-deep/50">· {selected?.name}</span>
              </span>
              <span className="text-emerald-deep/40 text-sm">{showSwitcher ? "▲" : "▼"}</span>
            </button>

            {showSwitcher && (
              <div className="absolute z-20 top-full left-0 right-0 bg-paper border border-emerald-deep/20 border-t-0 max-h-64 overflow-y-auto shadow-lg">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => handleCurrencyChange(c.code)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-emerald-deep/5 transition-colors ${
                      c.code === currency ? "bg-emerald-deep/5" : ""
                    }`}
                  >
                    <span className="text-sm font-bold text-emerald-deep">{c.code}</span>
                    <span className="text-xs text-emerald-deep/50">{c.name}</span>
                  </button>
                ))}
              </div>
            )}

            <p className="text-xs text-emerald-deep/30 mt-2">
              Auto-detected · change if incorrect
            </p>
          </div>
        </div>
      </div>

      {/* Right — results */}
      <div className="space-y-4">
        {buckets.map((b) => {
          const amount = numericIncome * (b.pct / 100);
          return (
            <div key={b.label} className="bg-paper border border-emerald-deep/10 p-6">
              <div className="flex justify-between items-baseline mb-3">
                <div>
                  <span className="font-display text-sm font-bold uppercase tracking-widest text-emerald-deep">
                    {b.label}
                  </span>
                  <span className="ml-2 text-xs text-emerald-deep/40">{b.pct}%</span>
                </div>
                <span className="font-display text-2xl font-bold text-emerald-deep">
                  {fmt(amount)}
                </span>
              </div>
              <div className="h-1.5 bg-emerald-deep/10 mb-3">
                <div className={`h-full ${b.color}`} style={{ width: `${b.pct}%` }} />
              </div>
              <p className="text-xs text-emerald-deep/50 leading-relaxed">{b.desc}</p>
            </div>
          );
        })}

        <div className="border-t border-emerald-deep/10 pt-4 flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40">
            Total
          </span>
          <span className="font-display text-xl font-bold text-emerald-deep">
            {fmt(numericIncome)}
          </span>
        </div>
      </div>
    </div>

    {/* Allocation Donut */}
    {numericIncome > 0 && (
      <div className="mt-10 bg-paper border border-emerald-deep/10 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-6">
          Allocation Breakdown
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="w-full sm:w-[220px] flex-shrink-0">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius="52%"
                  outerRadius="72%"
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as typeof pieData[0];
                    return (
                      <div className="bg-emerald-deep text-paper text-xs p-2.5 rounded shadow-lg">
                        <p className="font-bold mb-0.5">{d.name}</p>
                        <p className="text-paper/70">{d.pct}% · {fmt(d.value)}</p>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 flex flex-col gap-3 w-full">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-sm font-semibold text-emerald-deep">{d.name}</span>
                  <span className="text-xs text-emerald-deep/40">{d.pct}%</span>
                </div>
                <span className="font-display font-bold text-emerald-deep">{fmt(d.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
    </>
  );
}

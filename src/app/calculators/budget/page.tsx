"use client";

import { useState } from "react";
import type { Metadata } from "next";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const buckets = [
  { label: "Needs", pct: 50, desc: "Rent, groceries, utilities, minimum debt payments", color: "bg-emerald-deep" },
  { label: "Wants", pct: 30, desc: "Dining out, subscriptions, entertainment, travel", color: "bg-emerald-mid" },
  { label: "Savings & Debt", pct: 20, desc: "Emergency fund, investments, extra debt payments", color: "bg-gold" },
];

export default function BudgetPage() {
  const [income, setIncome] = useState(5000);

  return (
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
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep mb-2">
              Monthly After-Tax Income
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 font-display font-bold">$</span>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(Math.max(0, Number(e.target.value)))}
                className="w-full bg-paper border border-emerald-deep/20 pl-8 pr-4 py-3 font-display text-lg font-bold text-emerald-deep focus:outline-none focus:border-emerald-deep transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right — results */}
      <div className="space-y-4">
        {buckets.map((b) => {
          const amount = income * (b.pct / 100);
          const width = b.pct;
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
                <div className={`h-full ${b.color}`} style={{ width: `${width}%` }} />
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
            {fmt(income)}
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const SLICE_COLORS = ["#1a3d2f", "#2d5040", "#c9a230"];
const INCOME = 5000;

const BUCKETS = [
  { name: "Needs", pct: 50, color: SLICE_COLORS[0] },
  { name: "Wants", pct: 30, color: SLICE_COLORS[1] },
  { name: "Savings & Debt", pct: 20, color: SLICE_COLORS[2] },
].map((b) => ({ ...b, value: INCOME * (b.pct / 100) }));

export function BudgetPreview({ href }: { href: string }) {
  return (
    <div className="bg-white-card border border-border-light rounded-2xl overflow-hidden flex flex-col">
      <div className="px-7 pt-5 pb-3">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold mb-1">
          Budgeting
        </p>
      </div>

      <div className="bg-cream-deep px-5 pt-4 pb-4">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={BUCKETS}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={82}
              dataKey="value"
              strokeWidth={0}
              animationBegin={0}
              animationDuration={800}
            >
              {BUCKETS.map((b, i) => (
                <Cell key={i} fill={b.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-2">
          {BUCKETS.map((b) => (
            <div key={b.name} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-sm inline-block"
                style={{ background: b.color }}
              />
              <span className="text-[0.72rem] text-text-tertiary">
                {b.name}{" "}
                <span className="font-semibold text-emerald-deep">{b.pct}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-7 py-5 flex flex-col flex-1">
        <h3 className="font-serif font-bold text-[1.15rem] text-emerald-deep mb-2">
          50/30/20 Budget Planner
        </h3>
        <p className="text-[0.84rem] text-text-secondary leading-relaxed mb-4 flex-1">
          Enter your income and instantly see where every dollar should go — needs, wants, and savings, broken down to the cent.
        </p>
        <Link
          href={href}
          className="inline-flex items-center justify-center w-full py-3 bg-emerald-deep text-paper text-[0.84rem] font-semibold rounded-md hover:bg-emerald-mid transition-colors no-underline"
        >
          Try the Calculator →
        </Link>
      </div>
    </div>
  );
}

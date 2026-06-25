"use client";

import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = { emerald: "#1a3d2f", gold: "#c9a230" };
const R = 0.07 / 12;

const DATA = Array.from({ length: 21 }, (_, yr) => {
  const n = yr * 12;
  const growth = Math.pow(1 + R, n);
  const balance = yr === 0 ? 10000 : 10000 * growth + 500 * (growth - 1) / R;
  const contributions = 10000 + 500 * 12 * yr;
  return {
    year: yr,
    contributions: Math.round(Math.max(0, contributions)),
    interest: Math.round(Math.max(0, balance - contributions)),
  };
});

const FINAL = DATA[20].contributions + DATA[20].interest;

function fmtK(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${Math.round(v / 1_000)}K`;
  return `$${Math.round(v)}`;
}

export function CompoundPreview({ href }: { href: string }) {
  return (
    <div className="bg-white-card border border-border-light rounded-2xl overflow-hidden flex flex-col">
      <div className="px-7 pt-7 pb-5">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold mb-1">
          Savings &amp; Investing
        </p>
        <p className="text-[0.8rem] text-text-tertiary">
          $10K start · $500/mo · 7% annual · 20 years
        </p>
      </div>

      <div className="bg-cream-deep px-5 pt-4 pb-2">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="cpv-c" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.emerald} stopOpacity="0.22" />
                <stop offset="100%" stopColor={COLORS.emerald} stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="cpv-i" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.gold} stopOpacity="0.55" />
                <stop offset="100%" stopColor={COLORS.gold} stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={COLORS.emerald}
              strokeOpacity={0.07}
              vertical={false}
            />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 10, fill: "#7a9080" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}y`}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#7a9080" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={fmtK}
              width={42}
            />
            <Area
              type="monotone"
              dataKey="contributions"
              stackId="1"
              stroke={COLORS.emerald}
              strokeWidth={1.5}
              fill="url(#cpv-c)"
              animationDuration={900}
            />
            <Area
              type="monotone"
              dataKey="interest"
              stackId="1"
              stroke={COLORS.gold}
              strokeWidth={2}
              fill="url(#cpv-i)"
              animationDuration={900}
              animationBegin={200}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex gap-5 mt-1 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded-sm inline-block opacity-60" style={{ background: COLORS.emerald }} />
            <span className="text-[0.7rem] text-text-tertiary">Contributions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded-sm inline-block opacity-70" style={{ background: COLORS.gold }} />
            <span className="text-[0.7rem] text-text-tertiary">Interest earned</span>
          </div>
        </div>
      </div>

      <div className="px-7 py-6 flex flex-col flex-1">
        <p className="font-serif font-bold text-[2.2rem] text-emerald-deep leading-none">
          {fmtK(FINAL)}
        </p>
        <p className="text-[0.74rem] text-text-tertiary mt-1 mb-5">
          projected after 20 years
        </p>
        <h3 className="font-serif font-bold text-[1.15rem] text-emerald-deep mb-2">
          Compound Interest Calculator
        </h3>
        <p className="text-[0.84rem] text-text-secondary leading-relaxed mb-6 flex-1">
          Watch how monthly deposits and compounding growth build wealth — adjust any variable and see the curve shift in real time.
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

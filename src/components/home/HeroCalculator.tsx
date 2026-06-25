"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const RATE = 0.07;
const MONTHS = 120; // 10 years

// Approximate hex for oklch-based palette
const C = {
  emerald: "#1a3d2f",
  emeraldMid: "#2d5040",
  gold: "#c9a230",
  paper: "#f5f2ea",
  textLight: "#7a9080",
};

function toPath(vals: number[], max: number, W: number, H: number, pad = 10): string {
  if (max === 0) return "";
  const coords = vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * W;
    const y = H - pad - (v / max) * (H - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return `M ${coords.join(" L ")}`;
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n)}`;
}

export function HeroCalculator({ lang }: { lang: string }) {
  const [monthly, setMonthly] = useState(500);

  const { balancePath, contributedPath, areaBalance, areaContributed, finalBalance, totalContributed } =
    useMemo(() => {
      const rMonthly = Math.pow(1 + RATE, 1 / 12) - 1;
      const W = 400;
      const H = 130;

      const balances = Array.from({ length: MONTHS + 1 }, (_, i) =>
        monthly * (Math.pow(1 + rMonthly, i) - 1) / rMonthly
      );
      const contributions = Array.from({ length: MONTHS + 1 }, (_, i) => monthly * i);

      const max = balances[MONTHS];
      if (max === 0) {
        return { balancePath: "", contributedPath: "", areaBalance: "", areaContributed: "", finalBalance: 0, totalContributed: 0 };
      }

      const bPath = toPath(balances, max, W, H);
      const cPath = toPath(contributions, max, W, H);

      return {
        balancePath: bPath,
        contributedPath: cPath,
        areaBalance: `${bPath} L ${W},${H} L 0,${H} Z`,
        areaContributed: `${cPath} L ${W},${H} L 0,${H} Z`,
        finalBalance: balances[MONTHS],
        totalContributed: contributions[MONTHS],
      };
    }, [monthly]);

  const interestEarned = finalBalance - totalContributed;

  return (
    <div className="bg-white-card border border-border-light rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 pt-5 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-gold">
            Live Preview · 7% annual return
          </span>
          <Link
            href={`/${lang}/calculators/compound-interest`}
            className="text-[0.72rem] text-text-tertiary hover:text-emerald-deep transition-colors no-underline"
          >
            Full calculator →
          </Link>
        </div>

        <p className="font-display text-[2.4rem] font-bold text-emerald-deep leading-none mb-1">
          {fmt(finalBalance)}
        </p>
        <p className="text-[0.78rem] text-text-secondary">
          after 10 years ·{" "}
          <span className="text-gold font-semibold">{fmt(interestEarned)} in interest</span>
        </p>
      </div>

      {/* SVG Growth Chart */}
      <div className="relative">
        <svg viewBox="0 0 400 130" className="w-full" preserveAspectRatio="none" height="90">
          <defs>
            <linearGradient id="hc-grad-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.gold} stopOpacity="0.22" />
              <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hc-grad-c" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.emerald} stopOpacity="0.12" />
              <stop offset="100%" stopColor={C.emerald} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaBalance} fill="url(#hc-grad-b)" />
          <path d={areaContributed} fill="url(#hc-grad-c)" />
          <path d={balancePath} fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" />
          <path
            d={contributedPath}
            fill="none"
            stroke={C.emerald}
            strokeWidth="1.5"
            strokeDasharray="5,3"
            strokeLinecap="round"
          />
        </svg>
        {/* Year labels */}
        <div className="flex justify-between px-2 -mt-1 mb-1">
          {["Now", "2y", "4y", "6y", "8y", "10y"].map((label) => (
            <span key={label} className="text-[0.6rem] text-text-tertiary">{label}</span>
          ))}
        </div>
      </div>

      <div className="px-6 pb-5">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4 pt-1">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-text-tertiary mb-0.5">
              You put in
            </p>
            <p className="font-display text-[1.05rem] font-bold text-emerald-deep">
              {fmt(totalContributed)}
            </p>
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gold mb-0.5">
              Interest earned
            </p>
            <p className="font-display text-[1.05rem] font-bold text-emerald-deep">
              {fmt(interestEarned)}
            </p>
          </div>
        </div>

        {/* Slider */}
        <div>
          <div className="flex justify-between mb-1.5">
            <span className="text-[0.7rem] font-bold uppercase tracking-widest text-emerald-deep">
              Monthly savings
            </span>
            <span className="font-display font-bold text-emerald-deep text-sm">
              ${monthly.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={100}
            max={3000}
            step={50}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full h-1.5 appearance-none bg-border-light rounded-full cursor-pointer accent-emerald-deep"
          />
          <div className="flex justify-between text-[0.65rem] text-text-tertiary mt-1">
            <span>$100</span>
            <span>$3,000/mo</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-5 mt-3 pt-3 border-t border-border-light">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-[2px] bg-gold rounded" />
            <span className="text-[0.65rem] text-text-secondary">Total balance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-[2px] border-t-2 border-dashed border-emerald-deep opacity-60" />
            <span className="text-[0.65rem] text-text-secondary">Contributions</span>
          </div>
        </div>
      </div>
    </div>
  );
}

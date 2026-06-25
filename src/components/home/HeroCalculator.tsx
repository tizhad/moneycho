"use client";

import { useMemo, useState } from "react";
import { compoundInterest, formatCurrency } from "@/lib/finance";
import { GrowthChart } from "./GrowthChart";
import { CountUp } from "./CountUp";

const RATE = 0.07;

export function HeroCalculator({ lang }: { lang: string }) {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [years, setYears] = useState(25);

  const result = useMemo(
    () => compoundInterest({ initial, monthly, years, annualRate: RATE }),
    [initial, monthly, years]
  );

  return (
    <div className="bg-white-card border border-border-light rounded-2xl shadow-[0_30px_60px_-30px_rgba(26,61,47,0.18)] overflow-hidden">
      {/* Header row */}
      <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-border-light">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
            Live preview · Compound interest · 7% annual
          </p>
          <h3 className="font-serif text-base font-bold text-emerald-deep mt-0.5">
            Projected balance after {years} years
          </h3>
        </div>
        <div className="text-right shrink-0 ml-4">
          <p className="font-serif font-bold text-3xl text-emerald-deep tracking-tight leading-none">
            <CountUp
              value={result.finalBalance}
              format={(n) => formatCurrency(n, { compact: true })}
            />
          </p>
          <p className="text-[10px] font-mono text-text-tertiary mt-0.5">
            of which{" "}
            {formatCurrency(result.totalInterest, { compact: true })} interest
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="px-6 pt-4">
        <GrowthChart schedule={result.schedule} height={180} />
      </div>

      {/* Sliders */}
      <div className="px-6 py-5 space-y-4 bg-cream-deep border-t border-border-light">
        <Slider
          label="Initial investment"
          value={initial}
          min={0}
          max={100000}
          step={500}
          onChange={setInitial}
          format={(v) => formatCurrency(v, { compact: true })}
        />
        <Slider
          label="Monthly contribution"
          value={monthly}
          min={0}
          max={3000}
          step={50}
          onChange={setMonthly}
          format={(v) => formatCurrency(v)}
        />
        <Slider
          label="Years"
          value={years}
          min={1}
          max={40}
          step={1}
          onChange={setYears}
          format={(v) => `${v} yrs`}
        />
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
          {label}
        </label>
        <span className="font-mono text-sm font-semibold text-emerald-deep tabular-nums">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 rounded-full appearance-none bg-border-light accent-emerald-deep cursor-pointer"
        aria-label={label}
      />
    </div>
  );
}

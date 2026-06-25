"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { detectCurrency, saveCurrency, formatCurrency, CURRENCIES } from "@/lib/currency";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CHART_COLORS = { emerald: "#1a3d2f", gold: "#c9a230" };

const frequencies: { label: string; value: number }[] = [
  { label: "Monthly", value: 12 },
  { label: "Quarterly", value: 4 },
  { label: "Annually", value: 1 },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function NumberInput({ value, onChange, prefix, suffix }: { value: number | ""; onChange: (v: number | "") => void; prefix?: string; suffix?: string }) {
  return (
    <div className="relative">
      {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 font-display font-bold">{prefix}</span>}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
        onFocus={(e) => e.target.select()}
        placeholder="0"
        className={`w-full bg-paper border border-emerald-deep/20 py-3 font-display text-lg font-bold text-emerald-deep focus:outline-none focus:border-emerald-deep transition-colors ${prefix ? "pl-8" : "pl-4"} ${suffix ? "pr-10" : "pr-4"}`}
      />
      {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 font-display font-bold">{suffix}</span>}
    </div>
  );
}

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState<number | "">(10000);
  const [monthly, setMonthly] = useState<number | "">(500);
  const [rate, setRate] = useState<number | "">(7);
  const [years, setYears] = useState<number | "">(20);
  const [freq, setFreq] = useState(12);
  const [currency, setCurrency] = useState("USD");
  const [showSwitcher, setShowSwitcher] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrency(detectCurrency());
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

  const selected = CURRENCIES.find((c) => c.code === currency);
  const fmt = useMemo(() => (n: number) => formatCurrency(n, currency), [currency]);

  const p = typeof principal === "number" ? principal : 0;
  const m = typeof monthly === "number" ? monthly : 0;
  const r_ = typeof rate === "number" ? rate : 0;
  const y = typeof years === "number" ? years : 0;

  const rMonthly = r_ === 0 ? 0 : Math.pow(1 + r_ / 100 / freq, freq / 12) - 1;

  const result = useMemo(() => {
    // Always step monthly so contributions are deposited every month regardless
    // of compounding frequency. Convert the periodic rate to its monthly
    // equivalent: (1 + annual/freq)^(freq/12) - 1
    const n = y * 12;
    const futureValue = rMonthly === 0
      ? p + m * n
      : p * Math.pow(1 + rMonthly, n) + m * (Math.pow(1 + rMonthly, n) - 1) / rMonthly;
    const totalContributions = p + m * 12 * y;
    const totalInterest = futureValue - totalContributions;
    return { futureValue, totalContributions, totalInterest };
  }, [p, m, r_, y, freq, rMonthly]);

  const chartData = useMemo(() => {
    const len = Math.min(Math.max(y, 1), 50);
    return Array.from({ length: len + 1 }, (_, yr) => {
      const n = yr * 12;
      const balance = rMonthly === 0
        ? p + m * n
        : p * Math.pow(1 + rMonthly, n) + m * ((Math.pow(1 + rMonthly, n) - 1) / rMonthly);
      const contributions = p + m * 12 * yr;
      return {
        year: yr,
        contributions: Math.round(Math.max(0, contributions)),
        interest: Math.round(Math.max(0, balance - contributions)),
      };
    });
  }, [p, m, rMonthly, y]);

  function fmtCompact(v: number) {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${Math.round(v / 1_000)}K`;
    return String(Math.round(v));
  }

  return (
    <>
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Inputs */}
      <div>
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          Savings & Investing
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-4">
          Compound Interest
        </h1>
        <p className="text-emerald-deep/60 leading-relaxed mb-12">
          See how your money grows over time. The longer your timeline, the more compounding works in your favour.
        </p>

        <div className="space-y-6">
          <Field label="Starting Amount">
            <NumberInput value={principal} onChange={setPrincipal} prefix={selected?.symbol ?? "$"} />
          </Field>
          <Field label="Monthly Contribution">
            <NumberInput value={monthly} onChange={setMonthly} prefix={selected?.symbol ?? "$"} />
          </Field>
          <Field label="Annual Interest Rate">
            <NumberInput value={rate} onChange={(v) => setRate(v === "" ? "" : Math.min(100, v as number))} suffix="%" />
          </Field>
          <Field label="Time Period">
            <NumberInput value={years} onChange={setYears} suffix="yrs" />
          </Field>
          <Field label="Compound Frequency">
            <div className="flex gap-2">
              {frequencies.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFreq(f.value)}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest border transition-colors ${
                    freq === f.value
                      ? "bg-emerald-deep text-paper border-emerald-deep"
                      : "bg-paper text-emerald-deep border-emerald-deep/20 hover:border-emerald-deep"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Field>

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
            <p className="text-xs text-emerald-deep/30 mt-2">Auto-detected · change if incorrect</p>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="bg-emerald-deep text-paper p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">
            Future Value
          </p>
          <p className="font-display text-5xl font-bold">{fmt(result.futureValue)}</p>
          <p className="text-paper/50 text-sm mt-2">after {y} years</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-paper border border-emerald-deep/10 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">
              Total Contributed
            </p>
            <p className="font-display text-2xl font-bold text-emerald-deep">
              {fmt(result.totalContributions)}
            </p>
          </div>
          <div className="bg-paper border border-emerald-deep/10 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">
              Interest Earned
            </p>
            <p className="font-display text-2xl font-bold text-emerald-deep">
              {fmt(result.totalInterest)}
            </p>
          </div>
        </div>

        {/* Bar */}
        <div className="bg-paper border border-emerald-deep/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40">
              Breakdown
            </p>
            <div className="relative group">
              <span className="flex items-center justify-center w-4 h-4 rounded-full border border-emerald-deep/30 text-emerald-deep/40 text-[10px] font-bold cursor-default select-none">
                ?
              </span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-emerald-deep text-paper text-xs leading-relaxed p-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10">
                This bar shows where your future value comes from. The green portion is money you actually deposited; the gold portion is interest earned by compounding. The longer you invest, the larger the gold section grows.
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-emerald-deep" />
              </div>
            </div>
          </div>
          <div className="flex h-3 overflow-hidden mb-3">
            <div
              className="bg-emerald-deep h-full transition-all"
              style={{ width: `${(result.totalContributions / result.futureValue) * 100}%` }}
            />
            <div className="bg-gold h-full flex-1" />
          </div>
          <div className="flex justify-between text-xs text-emerald-deep/50">
            <span>● Contributions {Math.round((result.totalContributions / result.futureValue) * 100)}%</span>
            <span>● Interest {Math.round((result.totalInterest / result.futureValue) * 100)}%</span>
          </div>
        </div>
      </div>
    </div>

    {/* Growth Chart */}
    {y > 0 && (
      <div className="mt-10 bg-paper border border-emerald-deep/10 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-6">
          Growth Over Time
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="ci-grad-contributions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.emerald} stopOpacity="0.25" />
                <stop offset="100%" stopColor={CHART_COLORS.emerald} stopOpacity="0.03" />
              </linearGradient>
              <linearGradient id="ci-grad-interest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.gold} stopOpacity="0.5" />
                <stop offset="100%" stopColor={CHART_COLORS.gold} stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_COLORS.emerald}
              strokeOpacity={0.06}
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
              tickFormatter={fmtCompact}
              width={44}
            />
            <Tooltip
              cursor={{ stroke: CHART_COLORS.emerald, strokeWidth: 1, strokeOpacity: 0.2 }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const contrib = (payload.find((p) => p.dataKey === "contributions")?.value as number) ?? 0;
                const interest = (payload.find((p) => p.dataKey === "interest")?.value as number) ?? 0;
                return (
                  <div className="bg-emerald-deep text-paper text-xs p-3 rounded shadow-lg">
                    <p className="font-bold mb-1.5">Year {label}</p>
                    <p className="text-paper/70">Total: {fmt(contrib + interest)}</p>
                    <p className="text-paper/70">Contributed: {fmt(contrib)}</p>
                    <p className="text-gold font-semibold">Interest: {fmt(interest)}</p>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="contributions"
              stackId="1"
              stroke={CHART_COLORS.emerald}
              strokeWidth={1.5}
              fill="url(#ci-grad-contributions)"
            />
            <Area
              type="monotone"
              dataKey="interest"
              stackId="1"
              stroke={CHART_COLORS.gold}
              strokeWidth={2}
              fill="url(#ci-grad-interest)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 rounded-sm" style={{ background: `${CHART_COLORS.emerald}55` }} />
            <span className="text-xs text-emerald-deep/50">Contributions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 rounded-sm" style={{ background: `${CHART_COLORS.gold}88` }} />
            <span className="text-xs text-emerald-deep/50">Interest Earned</span>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

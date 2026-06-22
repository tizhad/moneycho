"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { detectCurrency, saveCurrency, formatCurrency, CURRENCIES } from "@/lib/currency";

type Mode = "time" | "monthly";

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

function NumberInput({
  value, onChange, prefix, suffix,
}: {
  value: number | ""; onChange: (v: number | "") => void; prefix?: string; suffix?: string;
}) {
  return (
    <div className="relative">
      {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 font-display font-bold">{prefix}</span>}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
        onFocus={(e) => e.target.select()}
        placeholder="0"
        className={`w-full bg-paper border border-emerald-deep/20 py-3 font-display text-lg font-bold text-emerald-deep focus:outline-none focus:border-emerald-deep transition-colors ${prefix ? "pl-8" : "pl-4"} ${suffix ? "pr-12" : "pr-4"}`}
      />
      {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 font-display font-bold text-sm">{suffix}</span>}
    </div>
  );
}

// How long to reach goal given monthly savings
function calcTime(goal: number, current: number, monthly: number, annualRate: number) {
  if (goal <= 0 || monthly <= 0) return null;
  if (current >= goal) return { months: 0, totalContributed: current, interest: 0 };
  const r = annualRate / 100 / 12;
  let n: number;
  if (r === 0) {
    n = Math.ceil((goal - current) / monthly);
  } else {
    // n = ln((G*r + m) / (P*r + m)) / ln(1+r)
    const num = goal * r + monthly;
    const den = current * r + monthly;
    if (den <= 0 || num / den <= 0) return null;
    n = Math.ceil(Math.log(num / den) / Math.log(1 + r));
  }
  if (n <= 0 || !isFinite(n)) return null;
  const totalContributed = current + monthly * n;
  const fv = r === 0
    ? current + monthly * n
    : current * Math.pow(1 + r, n) + monthly * (Math.pow(1 + r, n) - 1) / r;
  return { months: n, totalContributed, interest: fv - totalContributed };
}

// Required monthly savings to reach goal in given months
function calcMonthly(goal: number, current: number, months: number, annualRate: number) {
  if (goal <= 0 || months <= 0) return null;
  if (current >= goal) return { monthly: 0, totalContributed: current, interest: 0 };
  const r = annualRate / 100 / 12;
  let m: number;
  if (r === 0) {
    m = (goal - current) / months;
  } else {
    const factor = Math.pow(1 + r, months);
    m = (goal - current * factor) * r / (factor - 1);
  }
  if (m < 0 || !isFinite(m)) return null;
  const totalContributed = current + m * months;
  return { monthly: m, totalContributed, interest: goal - totalContributed };
}

function formatMonths(n: number) {
  const y = Math.floor(n / 12);
  const m = n % 12;
  if (y === 0) return `${m}mo`;
  if (m === 0) return `${y}yr`;
  return `${y}yr ${m}mo`;
}

export default function SavingsGoalPage() {
  const [mode, setMode] = useState<Mode>("time");
  const [goal, setGoal] = useState<number | "">(10000);
  const [current, setCurrent] = useState<number | "">(0);
  const [monthly, setMonthly] = useState<number | "">(300);
  const [years, setYears] = useState<number | "">(3);
  const [rate, setRate] = useState<number | "">(4);
  const [currency, setCurrency] = useState("USD");
  const [showSwitcher, setShowSwitcher] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setCurrency(detectCurrency()); }, []);

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
  const symbol = selected?.symbol ?? "$";

  const g = typeof goal === "number" ? goal : 0;
  const c = typeof current === "number" ? current : 0;
  const m = typeof monthly === "number" ? monthly : 0;
  const y = typeof years === "number" ? years : 0;
  const r = typeof rate === "number" ? rate : 0;

  const timeResult = useMemo(
    () => mode === "time" ? calcTime(g, c, m, r) : null,
    [mode, g, c, m, r]
  );

  const monthlyResult = useMemo(
    () => mode === "monthly" ? calcMonthly(g, c, y * 12, r) : null,
    [mode, g, c, y, r]
  );

  const progressPct = g > 0 ? Math.min(100, (c / g) * 100) : 0;

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Inputs */}
      <div>
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          Savings
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-4">
          Savings Goal
        </h1>
        <p className="text-emerald-deep/60 leading-relaxed mb-10">
          Plan your path to any financial goal — a house deposit, emergency fund, holiday, or anything else.
        </p>

        {/* Mode toggle */}
        <div className="flex mb-10 border border-emerald-deep/20">
          {([
            { key: "time", label: "How long will it take?" },
            { key: "monthly", label: "How much per month?" },
          ] as { key: Mode; label: string }[]).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setMode(opt.key)}
              className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                mode === opt.key
                  ? "bg-emerald-deep text-paper"
                  : "bg-paper text-emerald-deep/50 hover:text-emerald-deep"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <Field label="Goal Amount">
            <NumberInput value={goal} onChange={setGoal} prefix={symbol} />
          </Field>
          <Field label="Current Savings">
            <NumberInput value={current} onChange={setCurrent} prefix={symbol} />
          </Field>

          {mode === "time" ? (
            <Field label="Monthly Contribution">
              <NumberInput value={monthly} onChange={setMonthly} prefix={symbol} />
            </Field>
          ) : (
            <Field label="Time to Reach Goal">
              <NumberInput value={years} onChange={setYears} suffix="yrs" />
            </Field>
          )}

          <Field label="Annual Return">
            <NumberInput value={rate} onChange={(v) => setRate(v === "" ? "" : Math.min(50, v as number))} suffix="%" />
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
                <span className="font-normal text-emerald-deep/50">— {selected?.name}</span>
              </span>
              <span className="text-emerald-deep/40 text-sm">{showSwitcher ? "▲" : "▼"}</span>
            </button>
            {showSwitcher && (
              <div className="absolute z-20 top-full left-0 right-0 bg-paper border border-emerald-deep/20 border-t-0 max-h-64 overflow-y-auto shadow-lg">
                {CURRENCIES.map((cur) => (
                  <button
                    key={cur.code}
                    onClick={() => handleCurrencyChange(cur.code)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-emerald-deep/5 transition-colors ${
                      cur.code === currency ? "bg-emerald-deep/5" : ""
                    }`}
                  >
                    <span className="text-sm font-bold text-emerald-deep">{cur.code}</span>
                    <span className="text-xs text-emerald-deep/50">{cur.name}</span>
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
        {mode === "time" && (
          <>
            {!timeResult ? (
              <div className="bg-paper border border-emerald-deep/10 p-8 text-center">
                <p className="text-emerald-deep/50 text-sm">Enter a goal amount and monthly contribution to see your timeline.</p>
              </div>
            ) : timeResult.months === 0 ? (
              <div className="bg-emerald-deep text-paper p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">Status</p>
                <p className="font-display text-4xl font-bold">Already there!</p>
                <p className="text-paper/50 text-sm mt-2">Your current savings meet your goal.</p>
              </div>
            ) : (
              <>
                <div className="bg-emerald-deep text-paper p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">Time to Goal</p>
                  <p className="font-display text-5xl font-bold">{formatMonths(timeResult.months)}</p>
                  <p className="text-paper/50 text-sm mt-2">saving {fmt(m)}/month at {r}% return</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-paper border border-emerald-deep/10 p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Total Contributed</p>
                    <p className="font-display text-2xl font-bold text-emerald-deep">{fmt(timeResult.totalContributed)}</p>
                  </div>
                  <div className="bg-paper border border-emerald-deep/10 p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Interest Earned</p>
                    <p className="font-display text-2xl font-bold text-emerald-deep">{fmt(timeResult.interest)}</p>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {mode === "monthly" && (
          <>
            {!monthlyResult ? (
              <div className="bg-paper border border-emerald-deep/10 p-8 text-center">
                <p className="text-emerald-deep/50 text-sm">Enter a goal amount and time period to see your required savings.</p>
              </div>
            ) : monthlyResult.monthly === 0 ? (
              <div className="bg-emerald-deep text-paper p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">Status</p>
                <p className="font-display text-4xl font-bold">Already there!</p>
                <p className="text-paper/50 text-sm mt-2">Your current savings meet your goal.</p>
              </div>
            ) : (
              <>
                <div className="bg-emerald-deep text-paper p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">Monthly Savings Needed</p>
                  <p className="font-display text-5xl font-bold">{fmt(monthlyResult.monthly)}</p>
                  <p className="text-paper/50 text-sm mt-2">to reach {fmt(g)} in {formatMonths(y * 12)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-paper border border-emerald-deep/10 p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">Total Contributed</p>
                    <p className="font-display text-2xl font-bold text-emerald-deep">{fmt(monthlyResult.totalContributed)}</p>
                  </div>
                  <div className="bg-paper border border-emerald-deep/10 p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Interest Earned</p>
                    <p className="font-display text-2xl font-bold text-emerald-deep">{fmt(monthlyResult.interest)}</p>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Progress bar — always shown */}
        {g > 0 && (
          <div className="bg-paper border border-emerald-deep/10 p-6">
            <div className="flex justify-between items-baseline mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40">Current Progress</p>
              <p className="text-xs font-bold text-emerald-deep/40">{fmt(c)} of {fmt(g)}</p>
            </div>
            <div className="h-3 bg-emerald-deep/10 overflow-hidden mb-2">
              <div
                className="h-full bg-emerald-deep transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-xs text-emerald-deep/40">{progressPct.toFixed(1)}% saved</p>
          </div>
        )}
      </div>
    </div>
  );
}

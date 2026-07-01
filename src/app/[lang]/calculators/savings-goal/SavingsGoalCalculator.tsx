"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { detectCurrency, saveCurrency, formatCurrency, CURRENCIES } from "@/lib/currency";

type Mode = "time" | "monthly";

const T = {
  en: {
    tag: 'Savings',
    h1: 'Savings Goal Calculator',
    intro: 'Work backwards from your target: enter what you want to save and when, and find out exactly how much to set aside each month.',
    modeTime: 'How long will it take?',
    modeMonthly: 'How much per month?',
    goalAmount: 'Goal Amount',
    currentSavings: 'Current Savings',
    monthlyContrib: 'Monthly Contribution',
    timeToGoal: 'Time to Reach Goal',
    annualReturn: 'Annual Return',
    currency: 'Currency',
    autoDetect: 'Auto-detected · change if incorrect',
    timeToGoalLabel: 'Time to Goal',
    savingAt: (amt: string, r: number) => `saving ${amt}/month at ${r}% return`,
    monthlySavingsNeeded: 'Monthly Savings Needed',
    toReachIn: (goal: string, time: string) => `to reach ${goal} in ${time}`,
    totalContributed: 'Total Contributed',
    interestEarned: 'Interest Earned',
    currentProgress: 'Current Progress',
    alreadyThere: 'Already there!',
    alreadyThereDesc: 'Your current savings meet your goal.',
    noResultTime: 'Enter a goal amount and monthly contribution to see your timeline.',
    noResultMonthly: 'Enter a goal amount and time period to see your required savings.',
    pctSaved: (pct: string) => `${pct}% saved`,
    of: 'of',
    yearsLabel: 'yrs',
  },
  nl: {
    tag: 'Sparen',
    h1: 'Spaardoel Calculator',
    intro: 'Reken terug vanuit je spaardoel: vul in wat je wilt sparen en wanneer, en zie precies hoeveel je elke maand opzij moet zetten.',
    modeTime: 'Hoe lang duurt het?',
    modeMonthly: 'Hoeveel per maand?',
    goalAmount: 'Doelbedrag',
    currentSavings: 'Huidig Spaarsaldo',
    monthlyContrib: 'Maandelijkse Inleg',
    timeToGoal: 'Tijdsduur (jaren)',
    annualReturn: 'Jaarlijks Rendement',
    currency: 'Valuta',
    autoDetect: 'Automatisch gedetecteerd · aanpassen indien nodig',
    timeToGoalLabel: 'Tijd tot Doel',
    savingAt: (amt: string, r: number) => `bij ${amt}/maand en ${r}% rendement`,
    monthlySavingsNeeded: 'Maandelijkse Inleg Nodig',
    toReachIn: (goal: string, time: string) => `om ${goal} te bereiken in ${time}`,
    totalContributed: 'Totaal Ingelegd',
    interestEarned: 'Rente Verdiend',
    currentProgress: 'Huidige Voortgang',
    alreadyThere: 'Doel bereikt!',
    alreadyThereDesc: 'Je huidige spaarsaldo haalt al je doel.',
    noResultTime: 'Voer een doelbedrag en maandelijkse inleg in om je tijdlijn te zien.',
    noResultMonthly: 'Voer een doelbedrag en tijdsduur in om je benodigde spaarbedrag te zien.',
    pctSaved: (pct: string) => `${pct}% gespaard`,
    of: 'van',
    yearsLabel: 'jaar',
  },
} as const;

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

function calcTime(goal: number, current: number, monthly: number, annualRate: number) {
  if (goal <= 0 || monthly <= 0) return null;
  if (current >= goal) return { months: 0, totalContributed: current, interest: 0 };
  const r = annualRate / 100 / 12;
  let n: number;
  if (r === 0) {
    n = Math.ceil((goal - current) / monthly);
  } else {
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

function formatMonths(n: number, lang: string) {
  const y = Math.floor(n / 12);
  const mo = n % 12;
  if (lang === 'nl') {
    if (y === 0) return `${mo} mnd`;
    if (mo === 0) return `${y} jr`;
    return `${y} jr ${mo} mnd`;
  }
  if (y === 0) return `${mo}mo`;
  if (mo === 0) return `${y}yr`;
  return `${y}yr ${mo}mo`;
}

export default function SavingsGoalCalculator({ lang = 'en' }: { lang?: string }) {
  const t = lang === 'nl' ? T.nl : T.en;
  const [mode, setMode] = useState<Mode>("time");
  const [goal, setGoal] = useState<number | "">(10000);
  const [current, setCurrent] = useState<number | "">(0);
  const [monthly, setMonthly] = useState<number | "">(300);
  const [years, setYears] = useState<number | "">(3);
  const [rate, setRate] = useState<number | "">(4);
  const [currency, setCurrency] = useState("EUR");
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
  const symbol = selected?.symbol ?? "€";

  const g = typeof goal === "number" ? goal : 0;
  const cur = typeof current === "number" ? current : 0;
  const m = typeof monthly === "number" ? monthly : 0;
  const y = typeof years === "number" ? years : 0;
  const r = typeof rate === "number" ? rate : 0;

  const timeResult = useMemo(
    () => mode === "time" ? calcTime(g, cur, m, r) : null,
    [mode, g, cur, m, r]
  );

  const monthlyResult = useMemo(
    () => mode === "monthly" ? calcMonthly(g, cur, y * 12, r) : null,
    [mode, g, cur, y, r]
  );

  const progressPct = g > 0 ? Math.min(100, (cur / g) * 100) : 0;

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Inputs */}
      <div>
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          {t.tag}
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-4">
          {t.h1}
        </h1>
        <p className="text-emerald-deep/60 leading-relaxed mb-10">
          {t.intro}
        </p>

        {/* Mode toggle */}
        <div className="flex mb-10 border border-emerald-deep/20">
          {([
            { key: "time" as Mode, label: t.modeTime },
            { key: "monthly" as Mode, label: t.modeMonthly },
          ]).map((opt) => (
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
          <Field label={t.goalAmount}>
            <NumberInput value={goal} onChange={setGoal} prefix={symbol} />
          </Field>
          <Field label={t.currentSavings}>
            <NumberInput value={current} onChange={setCurrent} prefix={symbol} />
          </Field>

          {mode === "time" ? (
            <Field label={t.monthlyContrib}>
              <NumberInput value={monthly} onChange={setMonthly} prefix={symbol} />
            </Field>
          ) : (
            <Field label={t.timeToGoal}>
              <NumberInput value={years} onChange={setYears} suffix={t.yearsLabel} />
            </Field>
          )}

          <Field label={t.annualReturn}>
            <NumberInput value={rate} onChange={(v) => setRate(v === "" ? "" : Math.min(50, v as number))} suffix="%" />
          </Field>

          {/* Currency switcher */}
          <div className="relative" ref={switcherRef}>
            <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep mb-2">
              {t.currency}
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
            <p className="text-xs text-emerald-deep/30 mt-2" suppressHydrationWarning>{t.autoDetect}</p>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {mode === "time" && (
          <>
            {!timeResult ? (
              <div className="bg-paper border border-emerald-deep/10 p-8 text-center">
                <p className="text-emerald-deep/50 text-sm">{t.noResultTime}</p>
              </div>
            ) : timeResult.months === 0 ? (
              <div className="bg-emerald-deep text-paper p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">Status</p>
                <p className="font-display text-4xl font-bold">{t.alreadyThere}</p>
                <p className="text-paper/50 text-sm mt-2">{t.alreadyThereDesc}</p>
              </div>
            ) : (
              <>
                <div className="bg-emerald-deep text-paper p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">{t.timeToGoalLabel}</p>
                  <p className="font-display text-5xl font-bold">{formatMonths(timeResult.months, lang)}</p>
                  <p className="text-paper/50 text-sm mt-2">{t.savingAt(fmt(m), r)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-paper border border-emerald-deep/10 p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">{t.totalContributed}</p>
                    <p className="font-display text-2xl font-bold text-emerald-deep" suppressHydrationWarning>{fmt(timeResult.totalContributed)}</p>
                  </div>
                  <div className="bg-paper border border-emerald-deep/10 p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{t.interestEarned}</p>
                    <p className="font-display text-2xl font-bold text-emerald-deep" suppressHydrationWarning>{fmt(timeResult.interest)}</p>
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
                <p className="text-emerald-deep/50 text-sm">{t.noResultMonthly}</p>
              </div>
            ) : monthlyResult.monthly === 0 ? (
              <div className="bg-emerald-deep text-paper p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">Status</p>
                <p className="font-display text-4xl font-bold">{t.alreadyThere}</p>
                <p className="text-paper/50 text-sm mt-2">{t.alreadyThereDesc}</p>
              </div>
            ) : (
              <>
                <div className="bg-emerald-deep text-paper p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">{t.monthlySavingsNeeded}</p>
                  <p className="font-display text-5xl font-bold" suppressHydrationWarning>{fmt(monthlyResult.monthly)}</p>
                  <p className="text-paper/50 text-sm mt-2">{t.toReachIn(fmt(g), formatMonths(y * 12, lang))}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-paper border border-emerald-deep/10 p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">{t.totalContributed}</p>
                    <p className="font-display text-2xl font-bold text-emerald-deep" suppressHydrationWarning>{fmt(monthlyResult.totalContributed)}</p>
                  </div>
                  <div className="bg-paper border border-emerald-deep/10 p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{t.interestEarned}</p>
                    <p className="font-display text-2xl font-bold text-emerald-deep" suppressHydrationWarning>{fmt(monthlyResult.interest)}</p>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Progress bar */}
        {g > 0 && (
          <div className="bg-paper border border-emerald-deep/10 p-6">
            <div className="flex justify-between items-baseline mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40">{t.currentProgress}</p>
              <p className="text-xs font-bold text-emerald-deep/40" suppressHydrationWarning>{fmt(cur)} {t.of} {fmt(g)}</p>
            </div>
            <div className="h-3 bg-emerald-deep/10 overflow-hidden mb-2">
              <div className="h-full bg-emerald-deep transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            <p className="text-xs text-emerald-deep/40">{t.pctSaved(progressPct.toFixed(1))}</p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { detectCurrency, saveCurrency, formatCurrency, CURRENCIES } from "@/lib/currency";

const TERMS = [10, 15, 20, 25, 30];

const T = {
  en: {
    tag: 'Real Estate',
    h1: 'Dutch Mortgage Calculator',
    intro: 'Calculate your monthly mortgage payment, total interest, and the true cost of your home loan. Built for Dutch mortgages.',
    homePrice: 'Home Price',
    downPayment: 'Down Payment',
    rate: 'Annual Interest Rate',
    term: 'Loan Term',
    currency: 'Currency',
    autoDetect: 'Auto-detected · change if incorrect',
    monthlyPayment: 'Monthly Payment',
    onLoan: (amt: string) => `on a ${amt} loan`,
    totalPayment: 'Total Payment',
    totalInterest: 'Total Interest',
    costBreakdown: 'Cost Breakdown',
    homePriceLabel: 'Home Price',
    downPaymentLabel: 'Down Payment',
    loanAmountLabel: 'Loan Amount',
    totalCostLabel: 'Total Cost of Home',
    defaults: { homePrice: 400000, downPayment: 40000, rate: 4.0, term: 20 },
  },
  nl: {
    tag: 'Hypotheek',
    h1: 'Hypotheek Berekenen',
    intro: 'Bereken je maandelijkse hypotheeklasten, totale rentekosten en de werkelijke kosten van je woning. Inclusief annuïteitenhypotheek.',
    homePrice: 'Woningwaarde',
    downPayment: 'Eigen Inbreng',
    rate: 'Jaarlijkse Rente',
    term: 'Looptijd',
    currency: 'Valuta',
    autoDetect: 'Automatisch gedetecteerd · aanpassen indien nodig',
    monthlyPayment: 'Maandlasten',
    onLoan: (amt: string) => `op een hypotheek van ${amt}`,
    totalPayment: 'Totaal Betaald',
    totalInterest: 'Totale Rente',
    costBreakdown: 'Kostenopbouw',
    homePriceLabel: 'Woningwaarde',
    downPaymentLabel: 'Eigen Inbreng',
    loanAmountLabel: 'Hypotheekbedrag',
    totalCostLabel: 'Totale Kosten Woning',
    defaults: { homePrice: 400000, downPayment: 40000, rate: 4.0, term: 20 },
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

export default function MortgageCalculator({ lang = 'en' }: { lang?: string }) {
  const t = lang === 'nl' ? T.nl : T.en;
  const [homePrice, setHomePrice] = useState<number | "">(t.defaults.homePrice);
  const [downPayment, setDownPayment] = useState<number | "">(t.defaults.downPayment);
  const [rate, setRate] = useState<number | "">(t.defaults.rate);
  const [term, setTerm] = useState<number>(t.defaults.term);
  const [currency, setCurrency] = useState("EUR");
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
  const symbol = selected?.symbol ?? "€";

  const hp = typeof homePrice === "number" ? homePrice : 0;
  const dp = typeof downPayment === "number" ? downPayment : 0;
  const r_ = typeof rate === "number" ? rate : 0;

  const result = useMemo(() => {
    const loanAmount = Math.max(0, hp - dp);
    const monthlyRate = r_ / 100 / 12;
    const payments = term * 12;
    const monthlyPayment =
      monthlyRate === 0
        ? loanAmount / payments
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, payments)) /
          (Math.pow(1 + monthlyRate, payments) - 1);
    const totalPayment = monthlyPayment * payments;
    const totalInterest = totalPayment - loanAmount;
    const downPct = hp > 0 ? (dp / hp) * 100 : 0;
    return { loanAmount, monthlyPayment, totalPayment, totalInterest, downPct };
  }, [hp, dp, r_, term]);

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
        <p className="text-emerald-deep/60 leading-relaxed mb-12">
          {t.intro}
        </p>

        <div className="space-y-6">
          <Field label={t.homePrice}>
            <NumberInput value={homePrice} onChange={setHomePrice} prefix={symbol} />
          </Field>
          <Field label={`${t.downPayment} (${result.downPct.toFixed(1)}%)`}>
            <NumberInput value={downPayment} onChange={(v) => setDownPayment(v === "" ? "" : Math.min(hp, v))} prefix={symbol} />
          </Field>
          <Field label={t.rate}>
            <NumberInput value={rate} onChange={(v) => setRate(v === "" ? "" : Math.min(30, v as number))} suffix="%" />
          </Field>
          <Field label={t.term}>
            <div className="flex gap-2">
              {TERMS.map((t_) => (
                <button
                  key={t_}
                  onClick={() => setTerm(t_)}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest border transition-colors ${
                    term === t_
                      ? "bg-emerald-deep text-paper border-emerald-deep"
                      : "bg-paper text-emerald-deep border-emerald-deep/20 hover:border-emerald-deep"
                  }`}
                >
                  {t_}yr
                </button>
              ))}
            </div>
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
        <div className="bg-emerald-deep text-paper p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">
            {t.monthlyPayment}
          </p>
          <p className="font-display text-5xl font-bold" suppressHydrationWarning>{fmt(result.monthlyPayment)}</p>
          <p className="text-paper/50 text-sm mt-2" suppressHydrationWarning>
            {t.onLoan(fmt(result.loanAmount))}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-paper border border-emerald-deep/10 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">
              {t.totalPayment}
            </p>
            <p className="font-display text-2xl font-bold text-emerald-deep" suppressHydrationWarning>
              {fmt(result.totalPayment)}
            </p>
          </div>
          <div className="bg-paper border border-emerald-deep/10 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">
              {t.totalInterest}
            </p>
            <p className="font-display text-2xl font-bold text-emerald-deep" suppressHydrationWarning>
              {fmt(result.totalInterest)}
            </p>
          </div>
        </div>

        <div className="bg-paper border border-emerald-deep/10 p-6 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            {t.costBreakdown}
          </p>
          {[
            { label: t.homePriceLabel, value: fmt(hp) },
            { label: t.downPaymentLabel, value: fmt(dp) },
            { label: t.loanAmountLabel, value: fmt(result.loanAmount) },
            { label: t.totalInterest, value: fmt(result.totalInterest) },
            { label: t.totalCostLabel, value: fmt(dp + result.totalPayment), bold: true },
          ].map((row) => (
            <div key={row.label} className={`flex justify-between items-center ${row.bold ? "border-t border-emerald-deep/10 pt-3" : ""}`}>
              <span className={`text-sm ${row.bold ? "font-bold text-emerald-deep" : "text-emerald-deep/60"}`}>{row.label}</span>
              <span className={`font-display font-bold ${row.bold ? "text-emerald-deep text-lg" : "text-emerald-deep/80"}`} suppressHydrationWarning>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { detectCurrency, saveCurrency, formatCurrency, CURRENCIES } from "@/lib/currency";

const TERMS = [5, 10, 15, 20, 25, 30];

const T = {
  en: {
    tag: 'Loans',
    h1: 'Annuity Calculator',
    intro: 'Calculate the fixed monthly payment for any loan. Enter the amount, interest rate, and term — and see the full cost breakdown.',
    loanAmount: 'Loan Amount',
    rate: 'Annual Interest Rate',
    term: 'Loan Term',
    currency: 'Currency',
    autoDetect: 'Auto-detected · change if incorrect',
    monthlyPayment: 'Monthly Payment',
    onLoan: (amt: string) => `fixed payment on a ${amt} loan`,
    totalPayment: 'Total Payment',
    totalInterest: 'Total Interest',
    breakdown: 'Cost Breakdown',
    principal: 'Principal',
    interest: 'Total Interest',
    totalCost: 'Total Cost',
    amortTable: 'Amortization Schedule',
    showTable: 'Show amortization schedule',
    hideTable: 'Hide amortization schedule',
    month: 'Month',
    payment: 'Payment',
    interestCol: 'Interest',
    principalCol: 'Principal',
    balance: 'Balance',
    andMore: (n: number) => `…and ${n} more months`,
  },
  nl: {
    tag: 'Lenen',
    h1: 'Annuiteit Berekenen',
    intro: 'Bereken de vaste maandlast voor elke lening. Vul het bedrag, de rente en de looptijd in — en zie de volledige kostenopbouw.',
    loanAmount: 'Leenbedrag',
    rate: 'Jaarlijkse Rente',
    term: 'Looptijd',
    currency: 'Valuta',
    autoDetect: 'Automatisch gedetecteerd · aanpassen indien nodig',
    monthlyPayment: 'Maandlast (Annuïteit)',
    onLoan: (amt: string) => `vaste betaling op een lening van ${amt}`,
    totalPayment: 'Totaal Betaald',
    totalInterest: 'Totale Rente',
    breakdown: 'Kostenopbouw',
    principal: 'Hoofdsom',
    interest: 'Totale Rente',
    totalCost: 'Totale Kosten',
    amortTable: 'Aflossingsschema',
    showTable: 'Toon aflossingsschema',
    hideTable: 'Verberg aflossingsschema',
    month: 'Maand',
    payment: 'Betaling',
    interestCol: 'Rente',
    principalCol: 'Aflossing',
    balance: 'Restschuld',
    andMore: (n: number) => `…en nog ${n} maanden`,
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

function NumberInput({ value, onChange, prefix, suffix }: {
  value: number | "";
  onChange: (v: number | "") => void;
  prefix?: string;
  suffix?: string;
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

type AmortRow = { month: number; payment: number; interest: number; principal: number; balance: number };

function calcAnnuity(principal: number, annualRate: number, years: number) {
  const n = years * 12;
  const r = annualRate / 100 / 12;
  if (n <= 0 || principal <= 0) return null;
  const monthly = r === 0
    ? principal / n
    : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = monthly * n;
  const totalInterest = totalPayment - principal;

  const rows: AmortRow[] = [];
  let balance = principal;
  for (let i = 1; i <= n; i++) {
    const interestPart = balance * r;
    const principalPart = monthly - interestPart;
    balance = Math.max(0, balance - principalPart);
    rows.push({ month: i, payment: monthly, interest: interestPart, principal: principalPart, balance });
  }

  return { monthly, totalPayment, totalInterest, rows };
}

export default function AnnuiteitCalculator({ lang = 'en' }: { lang?: string }) {
  const t = lang === 'nl' ? T.nl : T.en;
  const [loanAmount, setLoanAmount] = useState<number | "">(250000);
  const [rate, setRate] = useState<number | "">(4.5);
  const [term, setTerm] = useState<number>(20);
  const [currency, setCurrency] = useState("EUR");
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [showTable, setShowTable] = useState(false);
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

  const p = typeof loanAmount === "number" ? loanAmount : 0;
  const r = typeof rate === "number" ? rate : 0;

  const result = useMemo(() => calcAnnuity(p, r, term), [p, r, term]);

  const PREVIEW_ROWS = 12;

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
          <Field label={t.loanAmount}>
            <NumberInput value={loanAmount} onChange={setLoanAmount} prefix={symbol} />
          </Field>

          <Field label={t.rate}>
            <NumberInput
              value={rate}
              onChange={(v) => setRate(v === "" ? "" : Math.min(30, v as number))}
              suffix="%"
            />
          </Field>

          <Field label={t.term}>
            <div className="flex gap-2 flex-wrap">
              {TERMS.map((t_) => (
                <button
                  key={t_}
                  onClick={() => setTerm(t_)}
                  className={`flex-1 min-w-[60px] py-3 text-xs font-bold uppercase tracking-widest border transition-colors ${
                    term === t_
                      ? "bg-emerald-deep text-paper border-emerald-deep"
                      : "bg-paper text-emerald-deep border-emerald-deep/20 hover:border-emerald-deep"
                  }`}
                >
                  {t_}{lang === 'nl' ? 'jr' : 'yr'}
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
            <p className="text-xs text-emerald-deep/30 mt-2" suppressHydrationWarning>
              {t.autoDetect}
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {result ? (
          <>
            <div className="bg-emerald-deep text-paper p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">
                {t.monthlyPayment}
              </p>
              <p className="font-display text-5xl font-bold" suppressHydrationWarning>
                {fmt(result.monthly)}
              </p>
              <p className="text-paper/50 text-sm mt-2" suppressHydrationWarning>
                {t.onLoan(fmt(p))}
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
                {t.breakdown}
              </p>
              {[
                { label: t.principal, value: fmt(p) },
                { label: t.interest, value: fmt(result.totalInterest) },
                { label: t.totalCost, value: fmt(result.totalPayment), bold: true },
              ].map((row) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-center ${row.bold ? "border-t border-emerald-deep/10 pt-3" : ""}`}
                >
                  <span className={`text-sm ${row.bold ? "font-bold text-emerald-deep" : "text-emerald-deep/60"}`}>
                    {row.label}
                  </span>
                  <span
                    className={`font-display font-bold ${row.bold ? "text-emerald-deep text-lg" : "text-emerald-deep/80"}`}
                    suppressHydrationWarning
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Amortization table */}
            <div className="bg-paper border border-emerald-deep/10">
              <button
                onClick={() => setShowTable(!showTable)}
                className="w-full flex items-center justify-between px-6 py-4 text-xs font-bold uppercase tracking-widest text-emerald-deep hover:bg-emerald-deep/5 transition-colors"
              >
                <span>{showTable ? t.hideTable : t.showTable}</span>
                <span className="text-emerald-deep/40">{showTable ? "▲" : "▼"}</span>
              </button>

              {showTable && (
                <div className="overflow-x-auto border-t border-emerald-deep/10">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-emerald-deep/5 border-b border-emerald-deep/10">
                        {[t.month, t.payment, t.interestCol, t.principalCol, t.balance].map((h) => (
                          <th key={h} className="px-4 py-3 text-left font-bold uppercase tracking-widest text-emerald-deep/50">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.slice(0, PREVIEW_ROWS).map((row) => (
                        <tr key={row.month} className="border-b border-emerald-deep/5 hover:bg-emerald-deep/[0.02]">
                          <td className="px-4 py-2.5 font-bold text-emerald-deep">{row.month}</td>
                          <td className="px-4 py-2.5 text-emerald-deep/80" suppressHydrationWarning>{fmt(row.payment)}</td>
                          <td className="px-4 py-2.5 text-gold" suppressHydrationWarning>{fmt(row.interest)}</td>
                          <td className="px-4 py-2.5 text-emerald-deep/80" suppressHydrationWarning>{fmt(row.principal)}</td>
                          <td className="px-4 py-2.5 text-emerald-deep/60" suppressHydrationWarning>{fmt(row.balance)}</td>
                        </tr>
                      ))}
                      {result.rows.length > PREVIEW_ROWS && (
                        <tr>
                          <td colSpan={5} className="px-4 py-3 text-emerald-deep/30 italic">
                            {t.andMore(result.rows.length - PREVIEW_ROWS)}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-paper border border-emerald-deep/10 p-8 text-center">
            <p className="text-emerald-deep/50 text-sm">
              {lang === 'nl' ? 'Vul het leenbedrag en de rente in om de berekening te zien.' : 'Enter a loan amount and interest rate to see the calculation.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

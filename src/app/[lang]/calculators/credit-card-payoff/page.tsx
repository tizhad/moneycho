"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { detectCurrency, saveCurrency, formatCurrency, CURRENCIES } from "@/lib/currency";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep">
          {label}
        </label>
        {hint && <span className="text-xs text-emerald-deep/40">{hint}</span>}
      </div>
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

function calcPayoff(balance: number, apr: number, payment: number) {
  if (payment <= 0 || balance <= 0) return null;
  const monthlyRate = apr / 100 / 12;
  if (payment <= balance * monthlyRate) return null;

  let remaining = balance;
  let months = 0;
  let totalInterest = 0;

  while (remaining > 0.01 && months < 600) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;
    remaining = remaining + interest - Math.min(payment, remaining + interest);
    months++;
  }

  const minMonths = (() => {
    let r = balance;
    let m = 0;
    let ti = 0;
    while (r > 0.01 && m < 600) {
      const mp = Math.max(r * 0.02, 25);
      const interest = r * monthlyRate;
      ti += interest;
      r = r + interest - mp;
      m++;
    }
    return { months: m, totalInterest: ti };
  })();

  return { months, totalInterest, totalPaid: balance + totalInterest, minMonths };
}

export default function CreditCardPayoffPage() {
  const [balance, setBalance] = useState<number | "">(5000);
  const [apr, setApr] = useState<number | "">(22);
  const [payment, setPayment] = useState<number | "">(200);
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
  const symbol = selected?.symbol ?? "$";

  const b = typeof balance === "number" ? balance : 0;
  const a = typeof apr === "number" ? apr : 0;
  const pmt = typeof payment === "number" ? payment : 0;

  const result = useMemo(() => calcPayoff(b, a, pmt), [b, a, pmt]);

  const years = result ? Math.floor(result.months / 12) : 0;
  const months = result ? result.months % 12 : 0;

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Inputs */}
      <div>
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          Debt
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-4">
          Credit Card Payoff
        </h1>
        <p className="text-emerald-deep/60 leading-relaxed mb-12">
          See exactly how long it takes to pay off your balance and how much interest you'll pay. Increase your monthly payment to see the impact.
        </p>

        <div className="space-y-6">
          <Field label="Current Balance">
            <NumberInput value={balance} onChange={setBalance} prefix={symbol} />
          </Field>
          <Field label="Annual Interest Rate (APR)">
            <NumberInput value={apr} onChange={(v) => setApr(v === "" ? "" : Math.min(100, v as number))} suffix="%" />
          </Field>
          <Field label="Monthly Payment" hint={`Min ~${fmt(b * 0.02)}/mo`}>
            <NumberInput value={payment} onChange={setPayment} prefix={symbol} />
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
        {!result ? (
          <div className="bg-paper border border-emerald-deep/10 p-8 text-center">
            <p className="text-emerald-deep/50 text-sm">
              Your payment doesn't cover the monthly interest. Increase your monthly payment.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-emerald-deep text-paper p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">
                Debt-Free In
              </p>
              <p className="font-display text-5xl font-bold">
                {years > 0 ? `${years}y ` : ""}{months}mo
              </p>
              <p className="text-paper/50 text-sm mt-2">
                paying {fmt(pmt)}/month
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-paper border border-emerald-deep/10 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">
                  Total Interest
                </p>
                <p className="font-display text-2xl font-bold text-emerald-deep">
                  {fmt(result.totalInterest)}
                </p>
              </div>
              <div className="bg-paper border border-emerald-deep/10 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">
                  Total Paid
                </p>
                <p className="font-display text-2xl font-bold text-emerald-deep">
                  {fmt(result.totalPaid)}
                </p>
              </div>
            </div>

            {/* Minimum payment warning */}
            <div className="bg-paper border border-gold/40 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-3">
                Minimum Payment Warning
              </p>
              <p className="text-sm text-emerald-deep/70 leading-relaxed">
                Paying only the minimum (2%) would take{" "}
                <strong className="text-emerald-deep">
                  {Math.floor(result.minMonths.months / 12)} years {result.minMonths.months % 12} months
                </strong>{" "}
                and cost{" "}
                <strong className="text-emerald-deep">
                  {fmt(result.minMonths.totalInterest)}
                </strong>{" "}
                in interest, {fmt(result.minMonths.totalInterest - result.totalInterest)} more than your current plan.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

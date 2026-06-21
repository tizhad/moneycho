"use client";

import { useState, useMemo } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const TERMS = [10, 15, 20, 25, 30];

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

function NumberInput({ value, onChange, prefix, suffix }: { value: number; onChange: (v: number) => void; prefix?: string; suffix?: string }) {
  return (
    <div className="relative">
      {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 font-display font-bold">{prefix}</span>}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className={`w-full bg-paper border border-emerald-deep/20 py-3 font-display text-lg font-bold text-emerald-deep focus:outline-none focus:border-emerald-deep transition-colors ${prefix ? "pl-8" : "pl-4"} ${suffix ? "pr-10" : "pr-4"}`}
      />
      {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 font-display font-bold">{suffix}</span>}
    </div>
  );
}

export default function MortgagePage() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const result = useMemo(() => {
    const loanAmount = Math.max(0, homePrice - downPayment);
    const monthlyRate = rate / 100 / 12;
    const payments = term * 12;
    const monthlyPayment =
      monthlyRate === 0
        ? loanAmount / payments
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, payments)) /
          (Math.pow(1 + monthlyRate, payments) - 1);
    const totalPayment = monthlyPayment * payments;
    const totalInterest = totalPayment - loanAmount;
    const downPct = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
    return { loanAmount, monthlyPayment, totalPayment, totalInterest, downPct };
  }, [homePrice, downPayment, rate, term]);

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Inputs */}
      <div>
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          Real Estate
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-4">
          Mortgage Calculator
        </h1>
        <p className="text-emerald-deep/60 leading-relaxed mb-12">
          Calculate your monthly payment, total interest, and the true cost of your home loan.
        </p>

        <div className="space-y-6">
          <Field label="Home Price">
            <NumberInput value={homePrice} onChange={setHomePrice} prefix="$" />
          </Field>
          <Field label={`Down Payment — ${result.downPct.toFixed(1)}%`}>
            <NumberInput value={downPayment} onChange={(v) => setDownPayment(Math.min(homePrice, v))} prefix="$" />
          </Field>
          <Field label="Annual Interest Rate">
            <NumberInput value={rate} onChange={(v) => setRate(Math.min(30, v))} suffix="%" />
          </Field>
          <Field label="Loan Term">
            <div className="flex gap-2">
              {TERMS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTerm(t)}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest border transition-colors ${
                    term === t
                      ? "bg-emerald-deep text-paper border-emerald-deep"
                      : "bg-paper text-emerald-deep border-emerald-deep/20 hover:border-emerald-deep"
                  }`}
                >
                  {t}yr
                </button>
              ))}
            </div>
          </Field>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="bg-emerald-deep text-paper p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">
            Monthly Payment
          </p>
          <p className="font-display text-5xl font-bold">{fmt(result.monthlyPayment)}</p>
          <p className="text-paper/50 text-sm mt-2">
            on a {fmt(result.loanAmount)} loan
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-paper border border-emerald-deep/10 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">
              Total Payment
            </p>
            <p className="font-display text-2xl font-bold text-emerald-deep">
              {fmt(result.totalPayment)}
            </p>
          </div>
          <div className="bg-paper border border-emerald-deep/10 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">
              Total Interest
            </p>
            <p className="font-display text-2xl font-bold text-emerald-deep">
              {fmt(result.totalInterest)}
            </p>
          </div>
        </div>

        <div className="bg-paper border border-emerald-deep/10 p-6 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            Cost Breakdown
          </p>
          {[
            { label: "Home Price", value: fmt(homePrice) },
            { label: "Down Payment", value: fmt(downPayment) },
            { label: "Loan Amount", value: fmt(result.loanAmount) },
            { label: "Total Interest", value: fmt(result.totalInterest) },
            { label: "Total Cost of Home", value: fmt(downPayment + result.totalPayment), bold: true },
          ].map((row) => (
            <div key={row.label} className={`flex justify-between items-center ${row.bold ? "border-t border-emerald-deep/10 pt-3" : ""}`}>
              <span className={`text-sm ${row.bold ? "font-bold text-emerald-deep" : "text-emerald-deep/60"}`}>{row.label}</span>
              <span className={`font-display font-bold ${row.bold ? "text-emerald-deep text-lg" : "text-emerald-deep/80"}`}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

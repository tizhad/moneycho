"use client";

import { useState, useMemo } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

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

function calcPayoff(balance: number, apr: number, payment: number) {
  if (payment <= 0 || balance <= 0) return null;
  const monthlyRate = apr / 100 / 12;
  const minPayment = balance * 0.02; // 2% minimum
  if (payment <= balance * monthlyRate) return null; // payment doesn't cover interest

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
  const [balance, setBalance] = useState(5000);
  const [apr, setApr] = useState(22);
  const [payment, setPayment] = useState(200);

  const result = useMemo(() => calcPayoff(balance, apr, payment), [balance, apr, payment]);

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
            <NumberInput value={balance} onChange={setBalance} prefix="$" />
          </Field>
          <Field label="Annual Interest Rate (APR)">
            <NumberInput value={apr} onChange={(v) => setApr(Math.min(100, v))} suffix="%" />
          </Field>
          <Field
            label="Monthly Payment"
            hint={`Min ~${fmt(balance * 0.02)}/mo`}
          >
            <NumberInput value={payment} onChange={setPayment} prefix="$" />
          </Field>
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
                paying {fmt(payment)}/month
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
                in interest — {fmt(result.minMonths.totalInterest - result.totalInterest)} more than your current plan.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

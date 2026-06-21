"use client";

import { useState, useMemo } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

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

  const p = typeof principal === "number" ? principal : 0;
  const m = typeof monthly === "number" ? monthly : 0;
  const r_ = typeof rate === "number" ? rate : 0;
  const y = typeof years === "number" ? years : 0;

  const result = useMemo(() => {
    const r = r_ / 100 / freq;
    const n = y * freq;
    const mPerPeriod = m * 12 / freq; // convert monthly → per compounding period
    const futureValue = r === 0
      ? p + m * 12 * y
      : p * Math.pow(1 + r, n) + mPerPeriod * (Math.pow(1 + r, n) - 1) / r;
    const totalContributions = p + m * 12 * y;
    const totalInterest = futureValue - totalContributions;
    return { futureValue, totalContributions, totalInterest };
  }, [p, m, r_, y, freq]);

  return (
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
            <NumberInput value={principal} onChange={setPrincipal} prefix="$" />
          </Field>
          <Field label="Monthly Contribution">
            <NumberInput value={monthly} onChange={setMonthly} prefix="$" />
          </Field>
          <Field label="Annual Interest Rate">
            <NumberInput value={rate} onChange={(v) => setRate(v === "" ? "" : Math.min(100, v))} suffix="%" />
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
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            Breakdown
          </p>
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
  );
}

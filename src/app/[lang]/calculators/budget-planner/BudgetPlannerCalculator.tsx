"use client";

import { useState, useMemo, useEffect } from "react";
import { detectCurrency, formatCurrency, CURRENCIES } from "@/lib/currency";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronDown, ChevronUp } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4;
type Situation = "single" | "couple" | "single-kids" | "couple-kids";
type Housing = "owner" | "renter";
type Goal = "save-more" | "cut-expenses" | "reduce-debt" | "first-budget" | "on-track";
type Period = "monthly" | "annually";

type Profile = { situation: Situation | null; housing: Housing | null; goal: Goal | null };

type IncomeKey = "salary" | "freelance" | "benefits" | "investmentIncome" | "rental" | "other";
type ExpenseKey =
  | "rentMortgage" | "utilities" | "homeInsurance" | "maintenance"
  | "groceries" | "diningOut"
  | "carPayment" | "fuel" | "carInsurance" | "publicTransport"
  | "healthInsurance" | "medical" | "gym"
  | "clothing" | "subscriptions" | "entertainment"
  | "childcare" | "education"
  | "creditCard" | "personalLoan"
  | "emergencyFund" | "pensionExtra" | "investmentSavings";

type Income   = Record<IncomeKey, number>;
type Expenses = Record<ExpenseKey, number>;

// ── Constants ─────────────────────────────────────────────────────────────────

const INCOME_FIELDS: { key: IncomeKey; label: string }[] = [
  { key: "salary",          label: "Employment (after tax)" },
  { key: "freelance",       label: "Freelance / Self-employment" },
  { key: "benefits",        label: "Government benefits" },
  { key: "investmentIncome",label: "Investment & Dividend income" },
  { key: "rental",          label: "Rental income" },
  { key: "other",           label: "Other income" },
];

type Category = {
  key: string;
  label: string;
  color: string;
  fields: { key: ExpenseKey; label: string }[];
};

const CATEGORIES: Category[] = [
  {
    key: "housing", label: "Housing", color: "#1a3d2f",
    fields: [
      { key: "rentMortgage",  label: "Rent / Mortgage" },
      { key: "utilities",     label: "Utilities (gas, water, electricity)" },
      { key: "homeInsurance", label: "Home Insurance" },
      { key: "maintenance",   label: "Maintenance & Repairs" },
    ],
  },
  {
    key: "food", label: "Food", color: "#c9a230",
    fields: [
      { key: "groceries", label: "Groceries" },
      { key: "diningOut", label: "Dining Out & Takeaway" },
    ],
  },
  {
    key: "transport", label: "Transport", color: "#2a6b5a",
    fields: [
      { key: "carPayment",      label: "Car Payment / Lease" },
      { key: "fuel",            label: "Fuel" },
      { key: "carInsurance",    label: "Car Insurance" },
      { key: "publicTransport", label: "Public Transport" },
    ],
  },
  {
    key: "health", label: "Health & Wellbeing", color: "#4a7a6a",
    fields: [
      { key: "healthInsurance", label: "Health Insurance" },
      { key: "medical",         label: "Medical & Pharmacy" },
      { key: "gym",             label: "Gym & Sport" },
    ],
  },
  {
    key: "personal", label: "Personal & Lifestyle", color: "#8a6a2a",
    fields: [
      { key: "clothing",      label: "Clothing & Personal Care" },
      { key: "subscriptions", label: "Subscriptions (streaming, apps)" },
      { key: "entertainment", label: "Entertainment & Hobbies" },
    ],
  },
  {
    key: "family", label: "Family", color: "#3a6a5a",
    fields: [
      { key: "childcare",  label: "Childcare & School" },
      { key: "education",  label: "Education & Courses" },
    ],
  },
  {
    key: "debt", label: "Debt Payments", color: "#7a3a2a",
    fields: [
      { key: "creditCard",   label: "Credit Card (minimum)" },
      { key: "personalLoan", label: "Personal Loan" },
    ],
  },
  {
    key: "savings", label: "Savings & Investments", color: "#2d5040",
    fields: [
      { key: "emergencyFund",     label: "Emergency Fund" },
      { key: "pensionExtra",      label: "Extra Pension" },
      { key: "investmentSavings", label: "Investments" },
    ],
  },
];

function zeroRecord<T extends string>(keys: T[]): Record<T, number> {
  return Object.fromEntries(keys.map((k) => [k, 0])) as Record<T, number>;
}

const INIT_INCOME   = zeroRecord(INCOME_FIELDS.map((f) => f.key));
const INIT_EXPENSES = zeroRecord(CATEGORIES.flatMap((c) => c.fields.map((f) => f.key)));

// ── Tip logic ─────────────────────────────────────────────────────────────────

function getTip(
  profile: Profile,
  totalIncome: number,
  totalExpenses: number,
  byCat: Record<string, number>,
): { title: string; body: string } {
  const housing = byCat.housing ?? 0;
  const debt    = byCat.debt    ?? 0;
  const savings = byCat.savings ?? 0;
  const balance = totalIncome - totalExpenses;

  if (balance < 0) return {
    title: "You're spending more than you earn",
    body: "Start with fixed costs: housing, insurance, subscriptions. Cancel anything unused. A €50/month subscription is €600/year — small cuts compound quickly.",
  };
  if (profile.goal === "reduce-debt" || (totalIncome > 0 && debt / totalIncome > 0.2)) return {
    title: "Tackle debt with the avalanche method",
    body: "Pay minimums on all debts, then put every extra euro toward the highest-interest one. Once cleared, redirect that payment to the next. You pay less total interest than any other approach.",
  };
  if (totalIncome > 0 && housing / totalIncome > 0.35) return {
    title: "Housing is taking more than a third of your income",
    body: "The rule of thumb is 30%. If you rent, a flatmate or shorter commute can free up hundreds per month. If you own, explore refinancing options.",
  };
  if (totalIncome > 0 && savings / totalIncome < 0.1 && balance > 0) return {
    title: "Your savings rate has room to grow",
    body: "Try increasing savings by 1% each month until you reach 20% of income. Use the Compound Interest calculator to see what that becomes over 20 years.",
  };
  if (profile.goal === "first-budget") return {
    title: "The hardest part is already done",
    body: "Most people never put numbers on paper. Now that you have, review it once a month. You don't need to be perfect — just directionally right.",
  };
  return {
    title: "You're in good shape — now optimise",
    body: "You have a surplus and no obvious red flags. Consider setting up a standing order on payday so savings leave before you see them. Automate the habit.",
  };
}

// ── Small components ──────────────────────────────────────────────────────────

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-300 ${
            i + 1 === current ? "w-6 bg-emerald-deep" :
            i + 1 < current  ? "w-1.5 bg-emerald-deep/40" :
                                "w-1.5 bg-emerald-deep/15"
          }`}
        />
      ))}
    </div>
  );
}

function OptionCard<T extends string>({
  value, current, onSelect, label, sub, icon,
}: {
  value: T; current: T | null; onSelect: (v: T) => void;
  label: string; sub?: string; icon: string;
}) {
  const active = current === value;
  return (
    <button
      onClick={() => onSelect(value)}
      className={`relative w-full text-left p-4 border transition-all duration-150 ${
        active
          ? "border-emerald-deep bg-emerald-deep"
          : "border-emerald-deep/15 bg-paper hover:border-emerald-deep/40"
      }`}
    >
      <span className="text-xl block mb-2">{icon}</span>
      <p className={`font-display font-bold text-sm ${active ? "text-paper" : "text-emerald-deep"}`}>
        {label}
      </p>
      {sub && (
        <p className={`text-xs mt-0.5 ${active ? "text-paper/65" : "text-emerald-deep/40"}`}>{sub}</p>
      )}
      {active && (
        <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-gold rounded-full flex items-center justify-center">
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3l2 2 4-4" stroke="#1a3d2f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  );
}

function NumField({
  label, value, onChange, prefix, period, note,
}: {
  label: string; value: number; onChange: (v: number) => void;
  prefix: string; period: Period; note?: string;
}) {
  const displayed = period === "annually" ? value * 12 : value;
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep/45 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-deep/30 font-display font-bold text-sm select-none">
          {prefix}
        </span>
        <input
          type="number"
          value={displayed || ""}
          min={0}
          onChange={(e) => {
            const raw = Math.max(0, Number(e.target.value) || 0);
            onChange(period === "annually" ? raw / 12 : raw);
          }}
          onFocus={(e) => e.target.select()}
          placeholder="0"
          className="w-full bg-paper border border-emerald-deep/15 pl-8 pr-4 py-2.5 font-display font-bold text-emerald-deep text-sm focus:outline-none focus:border-emerald-deep transition-colors"
        />
      </div>
      {note && <p className="text-xs text-emerald-deep/30 mt-1">{note}</p>}
    </div>
  );
}

function PeriodToggle({ period, onChange }: { period: Period; onChange: (p: Period) => void }) {
  return (
    <div className="inline-flex border border-emerald-deep/15 overflow-hidden">
      {(["monthly", "annually"] as Period[]).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
            period === p
              ? "bg-emerald-deep text-paper"
              : "bg-paper text-emerald-deep/40 hover:text-emerald-deep"
          }`}
        >
          {p === "monthly" ? "Monthly" : "Annual"}
        </button>
      ))}
    </div>
  );
}

function CategorySection({
  cat, expenses, onChange, prefix, period, totalIncome, defaultOpen = false,
}: {
  cat: Category; expenses: Expenses; onChange: (k: ExpenseKey, v: number) => void;
  prefix: string; period: Period; totalIncome: number; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const catTotal  = cat.fields.reduce((s, f) => s + expenses[f.key], 0);
  const displayed = period === "annually" ? catTotal * 12 : catTotal;
  const pct       = totalIncome > 0 ? (catTotal / totalIncome) * 100 : 0;

  return (
    <div className="border border-emerald-deep/10 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 bg-paper hover:bg-emerald-deep/[0.025] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
          <span className="font-display font-bold text-sm text-emerald-deep">{cat.label}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="font-display font-bold text-sm text-emerald-deep">
              {prefix}{displayed.toLocaleString("en", { maximumFractionDigits: 0 })}
            </span>
            {totalIncome > 0 && catTotal > 0 && (
              <span className="text-xs text-emerald-deep/30 ml-1.5">{pct.toFixed(0)}%</span>
            )}
          </div>
          {open
            ? <ChevronUp size={13} className="text-emerald-deep/30 flex-shrink-0" />
            : <ChevronDown size={13} className="text-emerald-deep/30 flex-shrink-0" />}
        </div>
      </button>
      {open && (
        <div className="border-t border-emerald-deep/[0.07] p-4 pt-3 grid gap-3 bg-emerald-deep/[0.015]">
          {cat.fields.map((f) => (
            <NumField
              key={f.key}
              label={f.label}
              value={expenses[f.key]}
              onChange={(v) => onChange(f.key, v)}
              prefix={prefix}
              period={period}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function BudgetPlannerCalculator() {
  const [step,     setStep]     = useState<Step>(1);
  const [period,   setPeriod]   = useState<Period>("monthly");
  const [currency, setCurrency] = useState("EUR");
  const [profile,  setProfile]  = useState<Profile>({ situation: null, housing: null, goal: null });
  const [income,   setIncome]   = useState<Income>(INIT_INCOME as Income);
  const [expenses, setExpenses] = useState<Expenses>(INIT_EXPENSES as Expenses);

  useEffect(() => { setCurrency(detectCurrency()); }, []);

  const sym = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "€";
  const fmt = (n: number) => formatCurrency(n, currency);
  const mult = period === "annually" ? 12 : 1;

  const totalIncome = useMemo(() => Object.values(income).reduce((s, v) => s + v, 0), [income]);

  const byCat = useMemo(() => {
    const out: Record<string, number> = {};
    for (const cat of CATEGORIES) out[cat.key] = cat.fields.reduce((s, f) => s + expenses[f.key], 0);
    return out;
  }, [expenses]);

  const totalExpenses = useMemo(() => Object.values(byCat).reduce((s, v) => s + v, 0), [byCat]);
  const balance       = totalIncome - totalExpenses;
  const surplus       = balance >= 0;

  const pieData = useMemo(
    () => CATEGORIES.filter((c) => byCat[c.key] > 0).map((c) => ({
      name: c.label, value: byCat[c.key], color: c.color,
    })),
    [byCat],
  );

  const tip = useMemo(() => getTip(profile, totalIncome, totalExpenses, byCat), [profile, totalIncome, totalExpenses, byCat]);

  function setInc(key: IncomeKey, val: number) { setIncome((p) => ({ ...p, [key]: val })); }
  function setExp(key: ExpenseKey, val: number) { setExpenses((p) => ({ ...p, [key]: val })); }
  const profileComplete = profile.situation && profile.housing && profile.goal;

  // ─ Step 1: Profile ────────────────────────────────────────────────────────
  if (step === 1) return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <StepDots current={1} total={4} />
        <span className="text-xs text-emerald-deep/30 font-bold uppercase tracking-widest">Profile</span>
      </div>

      <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-3">Step-by-step</span>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-3">
        Comprehensive Budget Planner
      </h1>
      <p className="text-emerald-deep/55 leading-relaxed mb-12 max-w-xl">
        Build a detailed personal budget in 4 steps — income, every expense category, and a full breakdown. Takes about 5 minutes.
      </p>

      <div className="space-y-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep mb-3">
            Household situation
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <OptionCard value="single"      current={profile.situation} onSelect={(v) => setProfile((p) => ({ ...p, situation: v }))} label="Single"        icon="👤" />
            <OptionCard value="couple"      current={profile.situation} onSelect={(v) => setProfile((p) => ({ ...p, situation: v }))} label="Couple"        sub="No children" icon="👫" />
            <OptionCard value="single-kids" current={profile.situation} onSelect={(v) => setProfile((p) => ({ ...p, situation: v }))} label="Single parent" sub="With children" icon="🧑‍👧" />
            <OptionCard value="couple-kids" current={profile.situation} onSelect={(v) => setProfile((p) => ({ ...p, situation: v }))} label="Family"        sub="Couple with children" icon="👨‍👩‍👧" />
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep mb-3">
            Housing
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <OptionCard value="owner"  current={profile.housing} onSelect={(v) => setProfile((p) => ({ ...p, housing: v }))} label="Homeowner" sub="Mortgage or outright" icon="🏠" />
            <OptionCard value="renter" current={profile.housing} onSelect={(v) => setProfile((p) => ({ ...p, housing: v }))} label="Renting"   sub="Private or social" icon="🔑" />
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep mb-3">
            Main budget goal
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <OptionCard value="save-more"    current={profile.goal} onSelect={(v) => setProfile((p) => ({ ...p, goal: v }))} label="Save more"     icon="💰" />
            <OptionCard value="cut-expenses" current={profile.goal} onSelect={(v) => setProfile((p) => ({ ...p, goal: v }))} label="Cut expenses"  icon="✂️" />
            <OptionCard value="reduce-debt"  current={profile.goal} onSelect={(v) => setProfile((p) => ({ ...p, goal: v }))} label="Reduce debt"   icon="📉" />
            <OptionCard value="first-budget" current={profile.goal} onSelect={(v) => setProfile((p) => ({ ...p, goal: v }))} label="First budget"  icon="📋" />
            <OptionCard value="on-track"     current={profile.goal} onSelect={(v) => setProfile((p) => ({ ...p, goal: v }))} label="Stay on track" icon="🎯" />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={() => setStep(2)}
          disabled={!profileComplete}
          className="bg-emerald-deep text-paper px-8 py-3 font-bold text-sm uppercase tracking-widest disabled:opacity-25 hover:opacity-90 transition-opacity"
        >
          Income →
        </button>
      </div>
    </div>
  );

  // ─ Step 2: Income ─────────────────────────────────────────────────────────
  if (step === 2) return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <StepDots current={2} total={4} />
        <span className="text-xs text-emerald-deep/30 font-bold uppercase tracking-widest">Income</span>
      </div>

      <div className="flex items-end justify-between mb-8">
        <h2 className="font-display text-3xl font-bold text-emerald-deep">Your Income</h2>
        <PeriodToggle period={period} onChange={setPeriod} />
      </div>

      <div className="bg-paper border border-emerald-deep/10 p-6 space-y-4 mb-4">
        {INCOME_FIELDS.map((f) => (
          <NumField
            key={f.key}
            label={f.label}
            value={income[f.key]}
            onChange={(v) => setInc(f.key, v)}
            prefix={sym}
            period={period}
          />
        ))}
      </div>

      <div className="bg-emerald-deep p-5 flex justify-between items-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-paper/45">
          Total / {period === "monthly" ? "month" : "year"}
        </span>
        <span className="font-display text-2xl font-bold text-paper">{fmt(totalIncome * mult)}</span>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setStep(1)} className="text-xs font-bold uppercase tracking-widest text-emerald-deep/35 hover:text-emerald-deep transition-colors">
          ← Back
        </button>
        <button onClick={() => setStep(3)} className="bg-emerald-deep text-paper px-8 py-3 font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
          Expenses →
        </button>
      </div>
    </div>
  );

  // ─ Step 3: Expenses ───────────────────────────────────────────────────────
  if (step === 3) return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <StepDots current={3} total={4} />
        <span className="text-xs text-emerald-deep/30 font-bold uppercase tracking-widest">Expenses</span>
      </div>

      <div className="flex items-end justify-between mb-3">
        <h2 className="font-display text-3xl font-bold text-emerald-deep">Your Expenses</h2>
        <PeriodToggle period={period} onChange={setPeriod} />
      </div>
      <p className="text-sm text-emerald-deep/45 mb-6">
        Tap any category to expand it. Leave fields at 0 if they don't apply to you.
      </p>

      <div className="space-y-1.5 mb-4">
        {CATEGORIES.map((cat, i) => (
          <CategorySection
            key={cat.key}
            cat={cat}
            expenses={expenses}
            onChange={setExp}
            prefix={sym}
            period={period}
            totalIncome={totalIncome}
            defaultOpen={i === 0}
          />
        ))}
      </div>

      <div className="border border-emerald-deep/10 p-4 flex justify-between items-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40">
          Total / {period === "monthly" ? "month" : "year"}
        </span>
        <span className="font-display text-xl font-bold text-emerald-deep">{fmt(totalExpenses * mult)}</span>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setStep(2)} className="text-xs font-bold uppercase tracking-widest text-emerald-deep/35 hover:text-emerald-deep transition-colors">
          ← Back
        </button>
        <button onClick={() => setStep(4)} className="bg-emerald-deep text-paper px-8 py-3 font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
          See Results →
        </button>
      </div>
    </div>
  );

  // ─ Step 4: Results ────────────────────────────────────────────────────────
  const needsTotal   = (byCat.housing ?? 0) + (byCat.food ?? 0) + (byCat.transport ?? 0) + (byCat.health ?? 0);
  const wantsTotal   = (byCat.personal ?? 0) + (byCat.family ?? 0);
  const savingsTotal = byCat.savings ?? 0;
  const debtTotal    = byCat.debt    ?? 0;

  const toPct = (v: number) => totalIncome > 0 ? (v / totalIncome) * 100 : 0;

  const bands = [
    { label: "Needs",    pct: toPct(needsTotal),   target: 50, color: "#1a3d2f" },
    { label: "Wants",    pct: toPct(wantsTotal),    target: 30, color: "#c9a230" },
    { label: "Savings",  pct: toPct(savingsTotal),  target: 20, color: "#2d5040" },
    ...(debtTotal > 0 ? [{ label: "Debt", pct: toPct(debtTotal), target: 0, color: "#7a3a2a" }] : []),
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <StepDots current={4} total={4} />
        <span className="text-xs text-emerald-deep/30 font-bold uppercase tracking-widest">Results</span>
      </div>

      <div className="flex items-end justify-between mb-6">
        <h2 className="font-display text-3xl font-bold text-emerald-deep">Your Budget</h2>
        <PeriodToggle period={period} onChange={setPeriod} />
      </div>

      {/* Hero */}
      <div className={`p-8 mb-4 ${surplus ? "bg-emerald-deep" : "bg-[#6b2a1a]"}`}>
        <p className="text-xs font-bold uppercase tracking-widest text-paper/40 mb-1">
          {surplus ? "Monthly Surplus" : "Monthly Shortfall"}
        </p>
        <p className="font-display text-5xl md:text-6xl font-bold text-paper tracking-tight">
          {surplus ? "+" : "−"}{fmt(Math.abs(balance) * mult)}
        </p>
        <div className="flex gap-8 mt-5 pt-5 border-t border-paper/10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-paper/35 mb-1">Income</p>
            <p className="font-display font-bold text-paper text-lg">{fmt(totalIncome * mult)}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-paper/35 mb-1">Expenses</p>
            <p className="font-display font-bold text-paper text-lg">{fmt(totalExpenses * mult)}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-paper/35 mb-1">Savings rate</p>
            <p className="font-display font-bold text-paper text-lg">
              {totalIncome > 0 ? `${toPct(savingsTotal).toFixed(0)}%` : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {/* Donut */}
        <div className="bg-paper border border-emerald-deep/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            Expense Breakdown
          </p>
          {pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius="48%" outerRadius="70%"
                    paddingAngle={2} dataKey="value" startAngle={90} endAngle={450}>
                    {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as typeof pieData[0];
                    const pct = totalExpenses > 0 ? ((d.value / totalExpenses) * 100).toFixed(0) : "0";
                    return (
                      <div className="bg-emerald-deep text-paper text-xs p-2.5 rounded shadow-lg">
                        <p className="font-bold mb-0.5">{d.name}</p>
                        <p className="text-paper/65">{pct}% · {fmt(d.value * mult)}</p>
                      </div>
                    );
                  }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 space-y-2">
                {pieData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                      <span className="text-xs text-emerald-deep/60">{d.name}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-deep">{fmt(d.value * mult)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-[160px] flex items-center justify-center text-sm text-emerald-deep/25">
              No expenses entered
            </div>
          )}
        </div>

        {/* 50/30/20 */}
        <div className="bg-paper border border-emerald-deep/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-5">
            50 / 30 / 20 Analysis
          </p>
          <div className="space-y-5">
            {bands.map(({ label, pct, target, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-emerald-deep">{label}</span>
                  <span className="text-emerald-deep/45">
                    {pct.toFixed(0)}%
                    {target > 0 && (
                      <span className={pct > target + 5 ? " text-red-600/70" : " text-emerald-deep/30"}>
                        {" "}/ {target}%
                      </span>
                    )}
                  </span>
                </div>
                <div className="h-1.5 bg-emerald-deep/[0.07] relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full transition-all duration-500"
                    style={{ width: `${Math.min(pct, 100)}%`, background: color }}
                  />
                  {target > 0 && (
                    <div className="absolute top-0 h-full w-px bg-emerald-deep/20" style={{ left: `${target}%` }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Category amounts */}
          <div className="mt-6 pt-5 border-t border-emerald-deep/08 space-y-2">
            {[
              { label: "Needs",   amount: needsTotal,   color: "#1a3d2f" },
              { label: "Wants",   amount: wantsTotal,   color: "#c9a230" },
              { label: "Savings", amount: savingsTotal,  color: "#2d5040" },
              ...(debtTotal > 0 ? [{ label: "Debt", amount: debtTotal, color: "#7a3a2a" }] : []),
            ].map(({ label, amount, color }) => (
              <div key={label} className="flex justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                  <span className="text-emerald-deep/55">{label}</span>
                </div>
                <span className="font-bold text-emerald-deep">{fmt(amount * mult)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="border-l-4 border-gold bg-gold/[0.06] p-5 mb-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2">
          Personalised tip — based on your profile
        </p>
        <p className="font-display font-bold text-emerald-deep mb-1.5">{tip.title}</p>
        <p className="text-sm text-emerald-deep/60 leading-relaxed">{tip.body}</p>
      </div>

      {/* Nav */}
      <div className="mt-8 flex justify-between items-center">
        <button onClick={() => setStep(3)} className="text-xs font-bold uppercase tracking-widest text-emerald-deep/35 hover:text-emerald-deep transition-colors">
          ← Edit Expenses
        </button>
        <button
          onClick={() => {
            setStep(1);
            setIncome(INIT_INCOME as Income);
            setExpenses(INIT_EXPENSES as Expenses);
            setProfile({ situation: null, housing: null, goal: null });
          }}
          className="text-xs font-bold text-emerald-deep/25 hover:text-emerald-deep/50 transition-colors uppercase tracking-widest"
        >
          Start over
        </button>
      </div>
    </div>
  );
}

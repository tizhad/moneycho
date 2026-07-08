"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

const NHG_LIMIT = 470_000;
const STARTER_LIMIT = 555_000;
const TRANSFER_RATE = 0.02;
const INVESTOR_RATE = 0.08; // 2026 rate (dropped from 10.4% in prior years)
const NHG_RATE = 0.004;
const OTHER_CLOSING_COSTS = 4_000; // notary + appraisal + advisor, midpoint estimate — see Kosten Koper for the exact breakdown
const HRA_CAP = 0.3756; // hypotheekrenteaftrek capped at 37.56% since 2023, regardless of your bracket
const EWF_RATE = 0.0035; // eigenwoningforfait, simplified flat rate (indicative — see methodology)

type BuyerType = "starter" | "owner" | "investor";

const CHART_COLORS = { emerald: "#1a3d2f", gold: "#c9a230" };

const TAX_BRACKETS = [35.75, 37.56, 49.5] as const;

const T = {
  en: {
    category: "Real Estate",
    h1: "Rent vs Buy Calculator",
    desc: "Compare the long-term net worth of renting vs buying a home in the Netherlands — including overdrachtsbelasting, NHG, and eigenwoningforfait.",
    yourNumbers: "Your numbers",
    homePrice: "Home price",
    downPayment: "Down payment",
    mortgageRate: "Mortgage rate",
    mortgageTerm: "Mortgage term",
    monthlyRent: "Monthly rent (comparable home)",
    years: "Years to compare",
    assumptions: "Assumptions",
    buyerType: "Buyer type",
    buyerTypes: [
      { value: "starter" as BuyerType, label: "First-time buyer (under 35)" },
      { value: "owner" as BuyerType, label: "Owner-occupier" },
      { value: "investor" as BuyerType, label: "Investor / second home" },
    ],
    appreciation: "Home appreciation (per year)",
    rentIncrease: "Rent increase (per year)",
    investmentReturn: "Investment return on savings",
    maintenance: "Maintenance + insurance (per year)",
    taxBracket: "Your marginal tax bracket",
    resultTitle: "After {y} years",
    buyAhead: "Buying leaves you ahead by",
    rentAhead: "Renting leaves you ahead by",
    breakeven: "Breakeven at year {n}",
    noBreakeven: "Buying doesn't break even within this timeframe",
    buyNetWorth: "Buy net worth",
    rentNetWorth: "Rent net worth",
    oneTimeCosts: "One-time buying costs",
    transferTax: "Transfer tax (overdrachtsbelasting)",
    transferTaxExempt: "€0 — starter exemption",
    nhgFee: "NHG guarantee fee",
    closingCosts: "Notary, appraisal, advisor (est.)",
    closingCostsNote: "Want the exact breakdown?",
    closingCostsLink: "Use the Kosten Koper Calculator →",
    chartTitle: "Net worth over time",
    yearTick: (v: number) => `${v}y`,
    starterWarning: "Starter exemption does not apply above €555,000 purchase price",
    nhgWarning: "NHG not available — mortgage exceeds €470,000 limit",
  },
  nl: {
    category: "Eigen woning",
    h1: "Huren vs Kopen Calculator",
    desc: "Vergelijk het vermogen op lange termijn van huren versus een huis kopen in Nederland — inclusief overdrachtsbelasting, NHG en eigenwoningforfait.",
    yourNumbers: "Jouw gegevens",
    homePrice: "Koopprijs",
    downPayment: "Eigen inbreng",
    mortgageRate: "Hypotheekrente",
    mortgageTerm: "Looptijd hypotheek",
    monthlyRent: "Maandhuur (vergelijkbare woning)",
    years: "Aantal jaar vergelijken",
    assumptions: "Aannames",
    buyerType: "Kopertype",
    buyerTypes: [
      { value: "starter" as BuyerType, label: "Starter (jonger dan 35 jaar)" },
      { value: "owner" as BuyerType, label: "Eigenaar-bewoner" },
      { value: "investor" as BuyerType, label: "Belegger / tweede woning" },
    ],
    appreciation: "Waardestijging woning (per jaar)",
    rentIncrease: "Huurstijging (per jaar)",
    investmentReturn: "Rendement op belegd vermogen",
    maintenance: "Onderhoud + verzekering (per jaar)",
    taxBracket: "Jouw marginale belastingschijf",
    resultTitle: "Na {y} jaar",
    buyAhead: "Kopen levert je meer op:",
    rentAhead: "Huren levert je meer op:",
    breakeven: "Break-even in jaar {n}",
    noBreakeven: "Kopen breekt niet even binnen deze periode",
    buyNetWorth: "Vermogen bij kopen",
    rentNetWorth: "Vermogen bij huren",
    oneTimeCosts: "Eenmalige koopkosten",
    transferTax: "Overdrachtsbelasting",
    transferTaxExempt: "€ 0 — startersvrijstelling",
    nhgFee: "NHG borgtochtprovisie",
    closingCosts: "Notaris, taxatie, advies (schatting)",
    closingCostsNote: "Wil je de exacte kosten?",
    closingCostsLink: "Gebruik de Kosten Koper Calculator →",
    chartTitle: "Vermogen in de tijd",
    yearTick: (v: number) => `${v}j`,
    starterWarning: "Startersvrijstelling geldt niet boven € 555.000 koopprijs",
    nhgWarning: "NHG niet beschikbaar — hypotheek overschrijdt grens van € 470.000",
  },
} as const;

function fmtEur(n: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtCompact(v: number) {
  const sign = v < 0 ? "-" : "";
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}${Math.round(abs / 1_000)}K`;
  return `${sign}${Math.round(abs)}`;
}

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
  value,
  onChange,
  prefix,
  suffix,
}: {
  value: number | "";
  onChange: (v: number | "") => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 font-display font-bold">
          {prefix}
        </span>
      )}
      <input
        type="number"
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))
        }
        onFocus={(e) => e.target.select()}
        placeholder="0"
        className={`w-full bg-paper border border-emerald-deep/20 py-3 font-display text-lg font-bold text-emerald-deep focus:outline-none focus:border-emerald-deep transition-colors ${prefix ? "pl-8" : "pl-4"} ${suffix ? "pr-10" : "pr-4"}`}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 font-display font-bold">
          {suffix}
        </span>
      )}
    </div>
  );
}

// Standard annuity monthly payment
function monthlyPayment(loanAmount: number, annualRate: number, termYears: number) {
  const n = termYears * 12;
  const r = annualRate / 100 / 12;
  if (n <= 0) return 0;
  if (r === 0) return loanAmount / n;
  return (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// Remaining balance after k months of an amortizing loan
function remainingBalance(loanAmount: number, annualRate: number, termYears: number, k: number) {
  const n = termYears * 12;
  const r = annualRate / 100 / 12;
  const kk = Math.min(k, n);
  if (loanAmount <= 0 || n <= 0) return 0;
  if (r === 0) return Math.max(0, loanAmount * (1 - kk / n));
  return (loanAmount * (Math.pow(1 + r, n) - Math.pow(1 + r, kk))) / (Math.pow(1 + r, n) - 1);
}

export default function RentVsBuyCalculator({ lang }: { lang?: string }) {
  const l = lang === "nl" ? "nl" : "en";
  const t = T[l];
  const locale = l === "nl" ? "nl-NL" : "en-US";
  const fmt = (n: number) => fmtEur(n, locale);

  const [homePrice, setHomePrice] = useState<number | "">(400_000);
  const [downPayment, setDownPayment] = useState<number | "">(40_000);
  const [mortgageRate, setMortgageRate] = useState<number | "">(4.0);
  const [mortgageTerm, setMortgageTerm] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState<number | "">(1_500);
  const [years, setYears] = useState<number | "">(10);
  const [buyerType, setBuyerType] = useState<BuyerType>("owner");
  const [appreciation, setAppreciation] = useState<number | "">(3);
  const [rentIncrease, setRentIncrease] = useState<number | "">(3);
  const [investmentReturn, setInvestmentReturn] = useState<number | "">(5);
  const [maintenance, setMaintenance] = useState<number | "">(1);
  const [taxBracket, setTaxBracket] = useState<number>(37.56);

  const hp = typeof homePrice === "number" ? homePrice : 0;
  const dp = typeof downPayment === "number" ? downPayment : 0;
  const mRate = typeof mortgageRate === "number" ? mortgageRate : 0;
  const rent = typeof monthlyRent === "number" ? monthlyRent : 0;
  const y = typeof years === "number" ? years : 0;
  const appr = typeof appreciation === "number" ? appreciation : 0;
  const rentIncr = typeof rentIncrease === "number" ? rentIncrease : 0;
  const invReturn = typeof investmentReturn === "number" ? investmentReturn : 0;
  const maint = typeof maintenance === "number" ? maintenance : 0;

  const loanAmount = Math.max(0, hp - dp);
  const starterEligible = buyerType === "starter" && hp <= STARTER_LIMIT;
  const nhgEligible = loanAmount > 0 && loanAmount <= NHG_LIMIT;

  const oneTime = useMemo(() => {
    const transferTax = starterEligible
      ? 0
      : buyerType === "investor"
      ? hp * INVESTOR_RATE
      : hp * TRANSFER_RATE;
    const nhgFee = nhgEligible ? loanAmount * NHG_RATE : 0;
    const closingCosts = OTHER_CLOSING_COSTS;
    return { transferTax, nhgFee, closingCosts, total: transferTax + nhgFee + closingCosts };
  }, [hp, buyerType, starterEligible, nhgEligible, loanAmount]);

  const series = useMemo(() => {
    const horizon = Math.min(Math.max(y, 1), 40);
    const pmt = monthlyPayment(loanAmount, mRate, mortgageTerm);
    const initialInvestment = dp + oneTime.total;

    let buyInvestments = 0;
    let rentInvestments = initialInvestment;
    const rows: {
      year: number;
      buyNetWorth: number;
      rentNetWorth: number;
    }[] = [];

    for (let yr = 0; yr <= horizon; yr++) {
      const homeValue = hp * Math.pow(1 + appr / 100, yr);
      const balanceStart = remainingBalance(loanAmount, mRate, mortgageTerm, (yr - 1) * 12);
      const balanceEnd = remainingBalance(loanAmount, mRate, mortgageTerm, yr * 12);

      if (yr > 0) {
        const monthsThisYear = Math.max(0, Math.min(12, mortgageTerm * 12 - (yr - 1) * 12));
        const totalPaidThisYear = pmt * monthsThisYear;
        const principalReduction = Math.max(0, balanceStart - balanceEnd);
        const interestThisYear = Math.max(0, totalPaidThisYear - principalReduction);

        const maintenanceThisYear = (maint / 100) * homeValue;
        const ewfThisYear = EWF_RATE * homeValue;
        const hra = interestThisYear * Math.min(taxBracket / 100, HRA_CAP);
        const ewfTaxCost = ewfThisYear * (taxBracket / 100);
        const netTaxEffect = Math.max(0, hra - ewfTaxCost);

        const annualBuyCost = totalPaidThisYear + maintenanceThisYear - netTaxEffect;
        const rentThisYear = rent * Math.pow(1 + rentIncr / 100, yr - 1);
        const annualRentCost = rentThisYear * 12;

        const costDiff = annualBuyCost - annualRentCost;

        rentInvestments =
          rentInvestments * (1 + invReturn / 100) + (costDiff > 0 ? costDiff : 0);
        buyInvestments =
          buyInvestments * (1 + invReturn / 100) + (costDiff < 0 ? -costDiff : 0);
      }

      rows.push({
        year: yr,
        buyNetWorth: Math.round(homeValue - balanceEnd + buyInvestments),
        rentNetWorth: Math.round(rentInvestments),
      });
    }

    return rows;
  }, [hp, dp, mRate, mortgageTerm, rent, appr, rentIncr, invReturn, maint, taxBracket, oneTime.total, y, loanAmount]);

  const final = series[series.length - 1] ?? { buyNetWorth: 0, rentNetWorth: 0 };
  const diff = final.buyNetWorth - final.rentNetWorth;
  const breakevenYear = series.find((r) => r.buyNetWorth >= r.rentNetWorth && r.year > 0)?.year;

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Inputs */}
        <div>
          <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
            {t.category}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-4">
            {t.h1}
          </h1>
          <p className="text-emerald-deep/60 leading-relaxed mb-12">{t.desc}</p>

          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            {t.yourNumbers}
          </p>
          <div className="space-y-6 mb-10">
            <Field label={t.homePrice}>
              <NumberInput value={homePrice} onChange={setHomePrice} prefix="€" />
            </Field>
            <Field label={t.downPayment}>
              <NumberInput value={downPayment} onChange={setDownPayment} prefix="€" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label={t.mortgageRate}>
                <NumberInput
                  value={mortgageRate}
                  onChange={(v) => setMortgageRate(v === "" ? "" : Math.min(20, v as number))}
                  suffix="%"
                />
              </Field>
              <Field label={t.mortgageTerm}>
                <div className="flex gap-2">
                  {[20, 30].map((term) => (
                    <button
                      key={term}
                      onClick={() => setMortgageTerm(term)}
                      className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest border transition-colors ${
                        mortgageTerm === term
                          ? "bg-emerald-deep text-paper border-emerald-deep"
                          : "bg-paper text-emerald-deep border-emerald-deep/20 hover:border-emerald-deep"
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
            <Field label={t.monthlyRent}>
              <NumberInput value={monthlyRent} onChange={setMonthlyRent} prefix="€" />
            </Field>
            <Field label={t.years}>
              <NumberInput value={years} onChange={setYears} suffix={l === "nl" ? "jr" : "yrs"} />
            </Field>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
            {t.assumptions}
          </p>
          <div className="space-y-6">
            <Field label={t.buyerType}>
              <div className="space-y-2.5">
                {t.buyerTypes.map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${
                        buyerType === value
                          ? "border-emerald-deep bg-emerald-deep"
                          : "border-emerald-deep/30 group-hover:border-emerald-deep/60"
                      }`}
                      onClick={() => setBuyerType(value)}
                    >
                      {buyerType === value && (
                        <div className="w-1.5 h-1.5 rounded-full bg-paper mx-auto mt-0.5" />
                      )}
                    </div>
                    <span
                      className="text-sm text-emerald-deep cursor-pointer"
                      onClick={() => setBuyerType(value)}
                    >
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </Field>

            {buyerType === "starter" && hp > STARTER_LIMIT && hp > 0 && (
              <div className="bg-gold/10 border border-gold/40 px-4 py-3 text-xs text-emerald-deep/80">
                {t.starterWarning}
              </div>
            )}
            {loanAmount > NHG_LIMIT && (
              <div className="bg-gold/10 border border-gold/40 px-4 py-3 text-xs text-emerald-deep/80">
                {t.nhgWarning}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Field label={t.appreciation}>
                <NumberInput
                  value={appreciation}
                  onChange={(v) => setAppreciation(v === "" ? "" : Math.min(20, v as number))}
                  suffix="%"
                />
              </Field>
              <Field label={t.rentIncrease}>
                <NumberInput
                  value={rentIncrease}
                  onChange={(v) => setRentIncrease(v === "" ? "" : Math.min(20, v as number))}
                  suffix="%"
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label={t.investmentReturn}>
                <NumberInput
                  value={investmentReturn}
                  onChange={(v) => setInvestmentReturn(v === "" ? "" : Math.min(20, v as number))}
                  suffix="%"
                />
              </Field>
              <Field label={t.maintenance}>
                <NumberInput
                  value={maintenance}
                  onChange={(v) => setMaintenance(v === "" ? "" : Math.min(10, v as number))}
                  suffix="%"
                />
              </Field>
            </div>
            <Field label={t.taxBracket}>
              <div className="flex gap-2">
                {TAX_BRACKETS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setTaxBracket(b)}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest border transition-colors ${
                      taxBracket === b
                        ? "bg-emerald-deep text-paper border-emerald-deep"
                        : "bg-paper text-emerald-deep border-emerald-deep/20 hover:border-emerald-deep"
                    }`}
                  >
                    {b}%
                  </button>
                ))}
              </div>
            </Field>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="bg-emerald-deep text-paper p-8 mb-px">
            <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">
              {t.resultTitle.replace("{y}", String(y))}
            </p>
            <p className="font-display text-4xl font-bold leading-tight" suppressHydrationWarning>
              {fmt(Math.abs(diff))}
            </p>
            <p className="text-paper/50 text-sm mt-2" suppressHydrationWarning>
              {diff >= 0 ? t.buyAhead : t.rentAhead}
            </p>
            <p className="text-paper/50 text-sm mt-1">
              {breakevenYear !== undefined
                ? t.breakeven.replace("{n}", String(breakevenYear))
                : t.noBreakeven}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px mb-px">
            <div className="bg-paper border border-emerald-deep/10 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">
                {t.buyNetWorth}
              </p>
              <p className="font-display text-xl font-bold text-emerald-deep" suppressHydrationWarning>
                {fmt(final.buyNetWorth)}
              </p>
            </div>
            <div className="bg-paper border border-emerald-deep/10 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">
                {t.rentNetWorth}
              </p>
              <p className="font-display text-xl font-bold text-emerald-deep" suppressHydrationWarning>
                {fmt(final.rentNetWorth)}
              </p>
            </div>
          </div>

          <div className="border border-emerald-deep/10 divide-y divide-emerald-deep/8">
            <div className="px-5 py-3.5">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40">
                {t.oneTimeCosts}
              </p>
            </div>
            <div className="flex items-start justify-between py-3.5 px-5 gap-4">
              <p className="text-sm text-emerald-deep font-medium">
                {t.transferTax}
                {!starterEligible && (
                  <span className="block text-xs text-emerald-deep/40 mt-0.5">
                    {buyerType === "investor" ? `${INVESTOR_RATE * 100}%` : `${TRANSFER_RATE * 100}%`}
                  </span>
                )}
              </p>
              <p className="text-sm font-display font-bold text-emerald-deep shrink-0" suppressHydrationWarning>
                {starterEligible ? t.transferTaxExempt : fmt(oneTime.transferTax)}
              </p>
            </div>
            {nhgEligible && (
              <div className="flex items-start justify-between py-3.5 px-5 gap-4">
                <p className="text-sm text-emerald-deep font-medium">{t.nhgFee}</p>
                <p className="text-sm font-display font-bold text-emerald-deep shrink-0" suppressHydrationWarning>
                  {fmt(oneTime.nhgFee)}
                </p>
              </div>
            )}
            <div className="flex items-start justify-between py-3.5 px-5 gap-4">
              <p className="text-sm text-emerald-deep font-medium">{t.closingCosts}</p>
              <p className="text-sm font-display font-bold text-emerald-deep shrink-0" suppressHydrationWarning>
                {fmt(oneTime.closingCosts)}
              </p>
            </div>
          </div>
          <p className="text-xs text-emerald-deep/40 mt-3">
            {t.closingCostsNote}{" "}
            <Link href={`/${l}/calculators/kosten-koper`} className="text-emerald-deep underline hover:no-underline">
              {t.closingCostsLink}
            </Link>
          </p>
        </div>
      </div>

      {/* Chart */}
      {y > 0 && (
        <div className="mt-10 bg-paper border border-emerald-deep/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-6">
            {t.chartTitle}
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={series} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="rvb-grad-buy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.emerald} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={CHART_COLORS.emerald} stopOpacity="0.03" />
                </linearGradient>
                <linearGradient id="rvb-grad-rent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.gold} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={CHART_COLORS.gold} stopOpacity="0.03" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.emerald} strokeOpacity={0.06} vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 10, fill: "#7a9080" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={t.yearTick}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#7a9080" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={fmtCompact}
                width={48}
              />
              <Tooltip
                cursor={{ stroke: CHART_COLORS.emerald, strokeWidth: 1, strokeOpacity: 0.2 }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const buy = (payload.find((p) => p.dataKey === "buyNetWorth")?.value as number) ?? 0;
                  const rentVal = (payload.find((p) => p.dataKey === "rentNetWorth")?.value as number) ?? 0;
                  return (
                    <div className="bg-emerald-deep text-paper text-xs p-3 rounded shadow-lg">
                      <p className="font-bold mb-1.5">
                        {l === "nl" ? "Jaar" : "Year"} {label}
                      </p>
                      <p className="text-paper/70">{t.buyNetWorth}: {fmt(buy)}</p>
                      <p className="text-gold font-semibold">{t.rentNetWorth}: {fmt(rentVal)}</p>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="buyNetWorth"
                stroke={CHART_COLORS.emerald}
                strokeWidth={2}
                fill="url(#rvb-grad-buy)"
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="rentNetWorth"
                stroke={CHART_COLORS.gold}
                strokeWidth={2}
                fill="url(#rvb-grad-rent)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 rounded-sm" style={{ background: `${CHART_COLORS.emerald}55` }} />
              <span className="text-xs text-emerald-deep/50">{t.buyNetWorth}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 rounded-sm" style={{ background: `${CHART_COLORS.gold}88` }} />
              <span className="text-xs text-emerald-deep/50">{t.rentNetWorth}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

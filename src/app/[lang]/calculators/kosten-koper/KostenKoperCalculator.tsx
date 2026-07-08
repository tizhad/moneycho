"use client";

import { useState, useMemo } from "react";

const NHG_LIMIT = 470_000;
const STARTER_LIMIT = 555_000;
const TRANSFER_RATE = 0.02;
const INVESTOR_RATE = 0.08; // 2026 rate (dropped from 10.4% in prior years)
const NHG_RATE = 0.004;

type BuyerType = "starter" | "owner" | "investor";

const T = {
  en: {
    category: "Real Estate",
    h1: "Dutch Buyer's Costs Calculator",
    desc: "Calculate all closing costs when buying a home in the Netherlands (kosten koper). Enter the purchase price and see the full breakdown instantly.",
    purchasePrice: "Purchase price",
    mortgageAmount: "Mortgage amount",
    mortgageHint: "Leave at 0 if buying without a mortgage",
    buyerType: "Buyer type",
    buyerTypes: [
      { value: "starter" as BuyerType, label: "First-time buyer (under 35)" },
      { value: "owner" as BuyerType, label: "Owner-occupier" },
      { value: "investor" as BuyerType, label: "Investor / second home" },
    ],
    options: "Optional costs to include",
    nhg: "NHG guarantee fee (borgtochtprovisie)",
    advisor: "Mortgage advisor fee",
    inspection: "Building inspection (bouwkundige keuring)",
    buyersAgent: "Buyer's agent (aankoopmakelaar)",
    totalLabel: "Total buyer's costs",
    ofPurchasePrice: "of purchase price",
    transferTax: "Transfer tax (overdrachtsbelasting)",
    transferTaxExempt: "€0 — starter exemption",
    notary: "Notary — transfer deed",
    mortgageDeed: "Notary — mortgage deed",
    valuation: "Appraisal (taxatie)",
    nhgFee: "NHG guarantee fee",
    advisorFee: "Mortgage advisor",
    inspectionFee: "Building inspection",
    agentFee: "Buyer's agent",
    est: "estimate",
    nhgWarning: "NHG not available — mortgage exceeds €470,000 limit",
    starterWarning: "Starter exemption does not apply above €555,000 purchase price",
    disclaimer:
      "Ranges are estimates. Exact notary and advisor fees vary by provider. Always request itemised quotes.",
  },
  nl: {
    category: "Eigen woning",
    h1: "Kosten Koper Calculator",
    desc: "Bereken alle bijkomende kosten bij het kopen van een huis in Nederland. Vul de koopprijs in en zie direct de volledige kosten koper.",
    purchasePrice: "Koopprijs",
    mortgageAmount: "Hypotheekbedrag",
    mortgageHint: "Laat op 0 staan als je zonder hypotheek koopt",
    buyerType: "Kopertype",
    buyerTypes: [
      { value: "starter" as BuyerType, label: "Starter (jonger dan 35 jaar)" },
      { value: "owner" as BuyerType, label: "Eigenaar-bewoner" },
      { value: "investor" as BuyerType, label: "Belegger / tweede woning" },
    ],
    options: "Optionele kosten meenemen",
    nhg: "NHG borgtochtprovisie",
    advisor: "Hypotheekadvies & bemiddeling",
    inspection: "Bouwkundige keuring",
    buyersAgent: "Aankoopmakelaar",
    totalLabel: "Totale kosten koper",
    ofPurchasePrice: "van de koopprijs",
    transferTax: "Overdrachtsbelasting",
    transferTaxExempt: "€ 0 — startersvrijstelling",
    notary: "Notaris — leveringsakte",
    mortgageDeed: "Notaris — hypotheekakte",
    valuation: "Taxatiekosten",
    nhgFee: "NHG borgtochtprovisie",
    advisorFee: "Hypotheekadvies & bemiddeling",
    inspectionFee: "Bouwkundige keuring",
    agentFee: "Aankoopmakelaar",
    est: "schatting",
    nhgWarning: "NHG niet beschikbaar — hypotheek overschrijdt grens van € 470.000",
    starterWarning: "Startersvrijstelling geldt niet boven € 555.000 koopprijs",
    disclaimer:
      "Schattingen. Exacte notaris- en advieskosten verschillen per aanbieder. Vraag altijd gespecificeerde offertes op.",
  },
} as const;

function fmtEur(n: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
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
}: {
  value: number | "";
  onChange: (v: number | "") => void;
  prefix?: string;
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
        className="w-full bg-paper border border-emerald-deep/20 py-3 pl-8 pr-4 font-display text-lg font-bold text-emerald-deep focus:outline-none focus:border-emerald-deep transition-colors"
      />
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${
          checked ? "bg-emerald-deep" : "bg-emerald-deep/20"
        }`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-paper transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </div>
      <span className="text-sm text-emerald-deep group-hover:text-emerald-deep/80 transition-colors">
        {label}
      </span>
    </label>
  );
}

function CostRow({
  label,
  fixed,
  low,
  high,
  fmt,
  est,
  note,
  zero,
  zeroLabel,
}: {
  label: string;
  fixed?: number;
  low?: number;
  high?: number;
  fmt: (n: number) => string;
  est: string;
  note?: string;
  zero?: boolean;
  zeroLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between py-3.5 px-5 gap-4">
      <div className="min-w-0">
        <p className="text-sm text-emerald-deep font-medium">{label}</p>
        {note && <p className="text-xs text-emerald-deep/40 mt-0.5">{note}</p>}
      </div>
      <p
        className={`text-sm font-display font-bold shrink-0 text-right ${
          zero ? "text-emerald-deep/40" : "text-emerald-deep"
        }`}
        suppressHydrationWarning
      >
        {zero && zeroLabel ? (
          zeroLabel
        ) : fixed !== undefined ? (
          fmt(fixed)
        ) : (
          <>
            {fmt(low ?? 0)}
            <span className="font-normal text-emerald-deep/40"> – {fmt(high ?? 0)}</span>
            <span className="block text-[10px] font-normal text-emerald-deep/35 text-right">
              {est}
            </span>
          </>
        )}
      </p>
    </div>
  );
}

export default function KostenKoperCalculator({ lang }: { lang?: string }) {
  const l = lang === "nl" ? "nl" : "en";
  const t = T[l];
  const locale = l === "nl" ? "nl-NL" : "en-US";
  const fmt = (n: number) => fmtEur(n, locale);

  const [price, setPrice] = useState<number | "">(350_000);
  const [mortgage, setMortgage] = useState<number | "">(315_000);
  const [buyerType, setBuyerType] = useState<BuyerType>("owner");
  const [withNhg, setWithNhg] = useState(false);
  const [withAdvisor, setWithAdvisor] = useState(true);
  const [withInspection, setWithInspection] = useState(false);
  const [withBuyersAgent, setWithBuyersAgent] = useState(false);

  const p = typeof price === "number" ? price : 0;
  const m = typeof mortgage === "number" ? mortgage : 0;

  const starterEligible = buyerType === "starter" && p <= STARTER_LIMIT;
  const nhgEligible = withNhg && m > 0 && m <= NHG_LIMIT;
  const nhgBlocked = withNhg && m > NHG_LIMIT;

  const costs = useMemo(() => {
    const transferTax =
      starterEligible
        ? 0
        : buyerType === "investor"
        ? p * INVESTOR_RATE
        : p * TRANSFER_RATE;

    const nhgFee = nhgEligible ? m * NHG_RATE : 0;

    const notaryLow = 900;
    const notaryHigh = 1_500;
    const deedLow = m > 0 ? 450 : 0;
    const deedHigh = m > 0 ? 900 : 0;
    const valLow = 500;
    const valHigh = 800;
    const advLow = withAdvisor ? 1_500 : 0;
    const advHigh = withAdvisor ? 3_500 : 0;
    const inspLow = withInspection ? 300 : 0;
    const inspHigh = withInspection ? 600 : 0;
    const agentLow = withBuyersAgent ? Math.round(p * 0.01) : 0;
    const agentHigh = withBuyersAgent ? Math.round(p * 0.015) : 0;

    const totalLow =
      transferTax + nhgFee + notaryLow + deedLow + valLow + advLow + inspLow + agentLow;
    const totalHigh =
      transferTax + nhgFee + notaryHigh + deedHigh + valHigh + advHigh + inspHigh + agentHigh;

    return {
      transferTax,
      nhgFee,
      notary: [notaryLow, notaryHigh] as [number, number],
      deed: [deedLow, deedHigh] as [number, number],
      val: [valLow, valHigh] as [number, number],
      adv: [advLow, advHigh] as [number, number],
      insp: [inspLow, inspHigh] as [number, number],
      agent: [agentLow, agentHigh] as [number, number],
      totalLow,
      totalHigh,
    };
  }, [
    p,
    m,
    buyerType,
    starterEligible,
    nhgEligible,
    withAdvisor,
    withInspection,
    withBuyersAgent,
  ]);

  const pctLow = p > 0 ? ((costs.totalLow / p) * 100).toFixed(1) : "0.0";
  const pctHigh = p > 0 ? ((costs.totalHigh / p) * 100).toFixed(1) : "0.0";

  return (
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

        <div className="space-y-7">
          <Field label={t.purchasePrice}>
            <NumberInput value={price} onChange={setPrice} prefix="€" />
          </Field>

          <Field label={t.mortgageAmount}>
            <NumberInput value={mortgage} onChange={setMortgage} prefix="€" />
            <p className="text-xs text-emerald-deep/30 mt-1.5">{t.mortgageHint}</p>
          </Field>

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

          {buyerType === "starter" && p > STARTER_LIMIT && p > 0 && (
            <div className="bg-gold/10 border border-gold/40 px-4 py-3 text-xs text-emerald-deep/80">
              {t.starterWarning}
            </div>
          )}

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep mb-3">
              {t.options}
            </p>
            <div className="space-y-3.5">
              {m > 0 && (
                <Toggle checked={withNhg} onChange={setWithNhg} label={t.nhg} />
              )}
              <Toggle checked={withAdvisor} onChange={setWithAdvisor} label={t.advisor} />
              <Toggle
                checked={withInspection}
                onChange={setWithInspection}
                label={t.inspection}
              />
              <Toggle
                checked={withBuyersAgent}
                onChange={setWithBuyersAgent}
                label={t.buyersAgent}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        {/* Total */}
        <div className="bg-emerald-deep text-paper p-8 mb-px">
          <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">
            {t.totalLabel}
          </p>
          <p className="font-display text-4xl font-bold leading-tight" suppressHydrationWarning>
            {fmt(costs.totalLow)}
            <span className="text-paper/50"> – {fmt(costs.totalHigh)}</span>
          </p>
          <p className="text-paper/50 text-sm mt-2" suppressHydrationWarning>
            {pctLow}%–{pctHigh}% {t.ofPurchasePrice}
          </p>
        </div>

        {/* Itemized */}
        <div className="border border-emerald-deep/10 border-t-0 divide-y divide-emerald-deep/8">
          <CostRow
            label={t.transferTax}
            fixed={costs.transferTax}
            zero={starterEligible}
            zeroLabel={t.transferTaxExempt}
            fmt={fmt}
            est={t.est}
            note={
              buyerType === "investor"
                ? `${(INVESTOR_RATE * 100).toFixed(1)}%`
                : starterEligible
                ? undefined
                : `${(TRANSFER_RATE * 100).toFixed(0)}%`
            }
          />
          <CostRow
            label={t.notary}
            low={costs.notary[0]}
            high={costs.notary[1]}
            fmt={fmt}
            est={t.est}
          />
          {m > 0 && (
            <CostRow
              label={t.mortgageDeed}
              low={costs.deed[0]}
              high={costs.deed[1]}
              fmt={fmt}
              est={t.est}
            />
          )}
          <CostRow
            label={t.valuation}
            low={costs.val[0]}
            high={costs.val[1]}
            fmt={fmt}
            est={t.est}
          />
          {nhgEligible && (
            <CostRow
              label={t.nhgFee}
              fixed={costs.nhgFee}
              fmt={fmt}
              est={t.est}
              note={`${(NHG_RATE * 100).toFixed(1)}% × hypotheek`}
            />
          )}
          {nhgBlocked && (
            <div className="px-5 py-3 text-xs text-gold/80 bg-gold/5">{t.nhgWarning}</div>
          )}
          {withAdvisor && (
            <CostRow
              label={t.advisorFee}
              low={costs.adv[0]}
              high={costs.adv[1]}
              fmt={fmt}
              est={t.est}
            />
          )}
          {withInspection && (
            <CostRow
              label={t.inspectionFee}
              low={costs.insp[0]}
              high={costs.insp[1]}
              fmt={fmt}
              est={t.est}
            />
          )}
          {withBuyersAgent && (
            <CostRow
              label={t.agentFee}
              low={costs.agent[0]}
              high={costs.agent[1]}
              fmt={fmt}
              est={t.est}
              note="1.0–1.5%"
            />
          )}
        </div>

        <p className="text-xs text-emerald-deep/35 mt-4 leading-relaxed">{t.disclaimer}</p>
      </div>
    </div>
  );
}

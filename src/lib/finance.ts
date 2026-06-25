export interface YearRow {
  year: number;
  balance: number;
  contributions: number;
  interest: number;
}

export interface CompoundResult {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  schedule: YearRow[];
}

export function compoundInterest({
  initial,
  monthly,
  years,
  annualRate,
}: {
  initial: number;
  monthly: number;
  years: number;
  annualRate: number;
}): CompoundResult {
  const rMonthly = annualRate === 0 ? 0 : Math.pow(1 + annualRate, 1 / 12) - 1;
  const schedule: YearRow[] = [];

  for (let yr = 0; yr <= years; yr++) {
    const n = yr * 12;
    const balance =
      rMonthly === 0
        ? initial + monthly * n
        : initial * Math.pow(1 + rMonthly, n) +
          monthly * ((Math.pow(1 + rMonthly, n) - 1) / rMonthly);
    const contributions = initial + monthly * 12 * yr;
    schedule.push({
      year: yr,
      balance: Math.max(0, balance),
      contributions: Math.max(0, contributions),
      interest: Math.max(0, balance - contributions),
    });
  }

  const last = schedule[schedule.length - 1];
  return {
    finalBalance: last.balance,
    totalContributions: last.contributions,
    totalInterest: last.interest,
    schedule,
  };
}

export function formatCurrency(n: number, opts?: { compact?: boolean }): string {
  if (opts?.compact) {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 10_000) return `$${Math.round(n / 1_000)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

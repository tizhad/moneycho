"use client";

import { motion } from "framer-motion";
import type { YearRow } from "@/lib/finance";

// Hex approximations for our oklch palette tokens (safe for SVG attributes)
const COLOR = {
  primary: "#1a3d2f",   // --emerald-deep
  rule: "#e0ddd6",      // --border-light
  muted: "#7a9080",     // --text-tertiary
};

interface Props {
  schedule: YearRow[];
  height?: number;
}

export function GrowthChart({ schedule, height = 220 }: Props) {
  if (schedule.length < 2) return null;

  const width = 600;
  const padL = 40;
  const padR = 12;
  const padT = 12;
  const padB = 24;
  const w = width - padL - padR;
  const h = height - padT - padB;

  const maxBal = Math.max(...schedule.map((r) => r.balance));
  const lastYear = schedule[schedule.length - 1].year;

  const x = (yr: number) => padL + (yr / lastYear) * w;
  const y = (v: number) => padT + h - (v / maxBal) * h;

  const balancePath = schedule
    .map((r, i) => `${i === 0 ? "M" : "L"} ${x(r.year).toFixed(1)} ${y(r.balance).toFixed(1)}`)
    .join(" ");
  const contribPath = schedule
    .map((r, i) => `${i === 0 ? "M" : "L"} ${x(r.year).toFixed(1)} ${y(r.contributions).toFixed(1)}`)
    .join(" ");
  const fillPath =
    balancePath +
    ` L ${x(lastYear).toFixed(1)} ${(padT + h).toFixed(1)} L ${padL} ${(padT + h).toFixed(1)} Z`;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (maxBal * i) / yTicks);
  const xTickCount = Math.min(6, lastYear);
  const xLabels = Array.from({ length: xTickCount + 1 }, (_, i) =>
    Math.round((lastYear * i) / xTickCount)
  );

  // Key changes so motion paths re-animate when data changes
  const animKey = `${lastYear}-${Math.round(maxBal)}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label="Projected balance over time"
    >
      <defs>
        <linearGradient id="gc-balFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLOR.primary} stopOpacity="0.18" />
          <stop offset="100%" stopColor={COLOR.primary} stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map((t, i) => (
        <g key={i}>
          <line
            x1={padL}
            x2={width - padR}
            y1={y(t)}
            y2={y(t)}
            stroke={COLOR.rule}
            strokeDasharray={i === 0 ? "0" : "2 4"}
          />
          <text
            x={padL - 6}
            y={y(t) + 3}
            textAnchor="end"
            fill={COLOR.muted}
            fontSize="10"
            fontFamily="var(--font-mono, monospace)"
          >
            {t >= 1000 ? `$${Math.round(t / 1000)}k` : `$${Math.round(t)}`}
          </text>
        </g>
      ))}

      {xLabels.map((yr) => (
        <text
          key={yr}
          x={x(yr)}
          y={height - 6}
          textAnchor="middle"
          fontSize="10"
          fontFamily="var(--font-mono, monospace)"
          fill={COLOR.muted}
        >
          {yr}y
        </text>
      ))}

      <motion.path
        key={`fill-${animKey}`}
        d={fillPath}
        fill="url(#gc-balFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        key={`contrib-${animKey}`}
        d={contribPath}
        fill="none"
        stroke={COLOR.muted}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.path
        key={`balance-${animKey}`}
        d={balancePath}
        fill="none"
        stroke={COLOR.primary}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      />
    </svg>
  );
}

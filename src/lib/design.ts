/**
 * Moneycho design tokens.
 * Single source of truth for colors, fonts, and reusable class patterns.
 * All values map directly to globals.css CSS variables and Tailwind utilities.
 *
 * Usage:
 *   import { colors, fonts, cx } from "@/lib/design"
 *   <h1 className={cx(fonts.display, colors.text.deep, "text-4xl")} />
 */

// ─── Colors ──────────────────────────────────────────────────────────────────

export const colors = {
  /** #064e3b — primary brand green, headings, CTAs */
  text: {
    deep: "text-emerald-deep",
    mid: "text-emerald-mid",
    paper: "text-paper",
    gold: "text-gold",
    muted: "text-emerald-deep/60",
    subtle: "text-emerald-deep/40",
  },
  bg: {
    /** Warm cream — page background, cards */
    paper: "bg-paper",
    /** Deep forest green — hero banners, journal section, dark CTAs */
    deep: "bg-emerald-deep",
    /** Mid green — hover states */
    mid: "bg-emerald-mid",
    gold: "bg-gold",
  },
  border: {
    default: "border-emerald-deep/10",
    subtle: "border-emerald-deep/5",
    medium: "border-emerald-deep/20",
    paper: "border-paper/10",
  },
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────

export const fonts = {
  /** Space Grotesk — headings, labels, numbers */
  display: "font-display",
  /** DM Sans — body copy, descriptions, inputs */
  body: "font-body",
} as const;

// ─── Reusable class patterns ─────────────────────────────────────────────────

export const text = {
  eyebrow: "text-xs font-bold uppercase tracking-[0.2em] text-gold",
  sectionLabel: "text-xs font-medium uppercase tracking-widest text-emerald-deep/50",
  heroHeading: "font-display font-bold leading-[0.9] tracking-tighter text-emerald-deep",
  sectionHeading: "font-display font-bold tracking-tight text-emerald-deep",
  cardTitle: "font-display font-bold uppercase tracking-tight text-emerald-deep",
  body: "font-body text-emerald-deep/80 leading-relaxed",
  muted: "font-body text-emerald-deep/60",
} as const;

export const buttons = {
  primary: "px-8 py-4 bg-emerald-deep text-paper font-bold uppercase tracking-widest text-xs hover:bg-emerald-mid transition-all active:scale-95",
  outline: "px-8 py-4 border border-emerald-deep text-emerald-deep font-bold uppercase tracking-widest text-xs hover:bg-emerald-deep/5 transition-colors",
  ghost: "text-gold font-bold uppercase tracking-widest text-xs border-b border-gold pb-1 hover:text-paper hover:border-paper transition-all",
  nav: "px-5 py-2 bg-emerald-deep text-paper text-xs font-bold uppercase tracking-widest hover:bg-emerald-mid transition-all active:scale-95",
} as const;

export const layout = {
  container: "max-w-7xl mx-auto px-6",
  section: "max-w-7xl mx-auto px-6 py-24",
  sectionHeader: "flex justify-between items-end mb-12 border-b border-emerald-deep/20 pb-8",
} as const;

// ─── Helper ───────────────────────────────────────────────────────────────────

/** Joins class strings, filtering falsy values. Lightweight cx() without a dep. */
export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

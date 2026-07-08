---
description: Pull fresh GSC performance data via API, refresh keyword research, and cross-reference with build state into a prioritised 3-6 month growth plan
---

# Growth Plan Skill — moneycho.com

Run this skill to produce (or refresh) `docs/seo/growth-plan.md` — a forward-looking, phased plan for what to fix, what to build, and what to target next. This is different from `/gsc-review`: that skill maintains a historical log of what happened each cycle; this skill looks at everything currently known and decides what to do next, phased over 3-6 months.

---

## Step 1 — Pull fresh GSC performance data (live API, no manual export needed)

```bash
cd docs/seo/gsc-api
./venv/bin/python fetch.py --days 90 --dimensions query,page,country,date --out /tmp/gsc-fresh.json
```

Auth is via the service account at `docs/seo/gsc-api/credentials/service-account.json` (Restricted user on the `sc-domain:moneycho.com` property). Data lags ~2 days — the last 2-3 days of any window will be incomplete, don't read those as a drop.

Note: this API covers **Performance** data only (clicks/impressions/CTR/position by query/page/country/date). It does not cover the **Index Coverage** report (indexed/not-indexed counts) — that still requires a manual export dropped in `docs/seo/reports/` and a `/gsc-review` pass, or a per-URL check via the URL Inspection API if a specific page's indexing status is in question.

---

## Step 2 — Keyword research (do not spend money here by default)

The user has no ongoing DataForSEO budget. Do **not** run `node scripts/keyword-review.mjs` (or any paid DataForSEO call) unless the user explicitly asks for a refresh in that conversation. Treat `docs/seo/keyword-map.md` as a static reference snapshot — check its `Last updated` date and note it's aging in the report, but don't refresh it automatically.

Instead, mine keyword opportunities from the free GSC data pulled in Step 1: the "new queries" that appear each cycle are real demand signals (this is how the compound-interest/samengestelde rente cluster and the take-home-pay debut were both found, at zero cost).

---

## Step 3 — Gather build-state and history context

Read:
- `docs/BUSINESS.md` — roadmap, competitive positioning, monetization phase triggers
- `docs/seo/gsc-log.md` — what's already been tried each cycle and what happened as a result
- `docs/seo/keyword-map.md` — full keyword gap analysis with priority scores
- Actual built calculators — `ls src/app/[lang]/calculators` (source of truth; `docs/CALCULATORS.md` goes stale and should not be trusted over the real directory listing)

---

## Step 4 — Cross-reference and prioritise

Build the plan from these inputs, in this order of leverage:

1. **Pages with real impressions but poor position/CTR** — the biggest impression cluster is usually the fastest win, because Google is already showing the page, it just isn't converting. Check `docs/seo/gsc-log.md` history for pages that already spiked in impressions.
2. **Keyword gaps scored by `volume / competition_factor`** (LOW=1.0, MEDIUM=1.5, HIGH=3.0) from the keyword-map priority summary — target LOW/MEDIUM gaps on pages that already exist before chasing HIGH-competition head terms.
3. **Calculators not yet built** that correspond to a keyword cluster with 5+ gaps and no page — that's a whole topic Google has demand for and the site has zero presence on.
4. **Technical/indexing debt** still open as unchecked items in `gsc-log.md` — a content fix is wasted if the page isn't indexed.
5. **Distribution/authority** — if the domain is several months in with still near-zero backlinks/impressions on HIGH-competition terms, that's a signal no amount of on-page work will fix alone; flag it explicitly rather than pretending more copy will solve it.

Assemble into three phases:

- **Month 1** — cheapest, fastest: technical fixes + on-page optimisation of pages that already have impressions. No new build required.
- **Month 2-3** — content expansion: new calculator(s)/guide(s) for the highest-scoring uncovered keyword clusters, internal linking pass, first backlink/distribution push (directories, relevant subreddits, expat sites — see BUSINESS.md competitive notes).
- **Month 4-6** — scale: revisit HIGH-competition head terms now that some authority exists, check monetization readiness against BUSINESS.md's Phase 2 trigger (~10k monthly visits), decide next calculator batch from BUSINESS.md's planned list.

---

## Step 5 — Write `docs/seo/growth-plan.md`

This file is **overwritten each run** — it's a living plan, not an append-only log (that's what `gsc-log.md` is for). Structure:

```markdown
# Growth Plan — moneycho.com
**Generated:** YYYY-MM-DD
**Current state:** [headline totals + trajectory in one line]

## Phase 1 — Month 1: Fix what's already working
| Page/Item | Current state | Action | Why |
|---|---|---|---|

## Phase 2 — Month 2-3: Expand coverage
| Page/Item | Opportunity | Action | Why |
|---|---|---|---|

## Phase 3 — Month 4-6: Scale + monetize
| Item | Action | Why |
|---|---|---|

## Risks / things that won't fix themselves
[explicit callouts — e.g. zero backlinks, HIGH-competition terms that need authority not copy]
```

---

## Step 6 — Report to user

1. Headline number (impressions/clicks trajectory)
2. Top 3 priorities across all phases, each tied to a specific page/keyword with a number behind it
3. Confirm `docs/seo/growth-plan.md` is written

---

## Related skills

- `/gsc-review` — historical log, run after each new data pull to record what happened
- `/keyword-review` — called directly in Step 2

---

## Notes

- Re-run every 2-4 weeks, or after a major site change (new calculator shipped, big content push).
- Don't let this skill re-litigate settled facts already in `gsc-log.md` — pull from it, don't repeat its analysis.
- The site's age matters: a 2-4 week old domain and a 6-month old domain need different plans even with identical keyword data. Always state the domain's age and adjust expectations (HIGH-competition terms are a multi-month game regardless of content quality).

---
description: Fetch keyword data from DataForSEO, cluster by topic, cross-reference with GSC data, and write docs/seo/keyword-map.md with gap analysis and prioritised actions
---

# Keyword Review Skill — moneycho.com

Run this skill to refresh the keyword map. It queries DataForSEO automatically (no manual exports), clusters all keywords by topic, cross-references against the latest GSC log, and outputs a prioritised gap analysis.

---

## How to run

```bash
node scripts/keyword-review.mjs
```

Cost: ~$0.15–0.25 per run (three DataForSEO API calls: keywords_for_site ×2 + keywords_for_keywords).

Credentials are stored in `.env.local` as `DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD`.

Run this every time you run `/gsc-review` — the two skills feed each other:
- GSC tells you what you rank for and at what position
- keyword-map tells you what the full universe looks like and where the gaps are

---

## What the script does

1. **Calls DataForSEO `keywords_for_site`** with `moneycho.com` (NL + EN, Netherlands geo)
   → returns all keywords Google associates with the site, with real search volumes

2. **Calls `keywords_for_keywords`** with seed terms from each topic cluster
   → expands coverage into keywords the site doesn't rank for yet

3. **Deduplicates** across all three responses (~240 keywords typical)

4. **Clusters** each keyword into a topic (mortgage, credit-card-payoff, compound-interest, etc.)
   using substring matching — see `CLUSTERS` array in the script

5. **Cross-references** against the latest GSC log (`docs/seo/gsc-log.md`)
   → tags each keyword as ✅ Ranking / 🟡 Weak / 👁️ Visible / ❌ Gap

6. **Writes `docs/seo/keyword-map.md`** with:
   - Priority gap summary table (top 10 gaps by volume/competition score)
   - Per-cluster breakdown with full keyword table
   - Top 3 gap actions per cluster

---

## Reading the output

After running, open `docs/seo/keyword-map.md`. Start from the **Priority Gap Summary** at the top.

### Gap priority score
```
score = volume / competition_factor
competition_factor: LOW=1.0, MEDIUM=1.5, HIGH=3.0
```

A 1K/month LOW competition keyword scores the same as a 3K/month HIGH competition keyword. Target LOW and MEDIUM gaps first.

### Status definitions

| Status | Meaning |
|---|---|
| ✅ Ranking | In GSC, position ≤ 20 |
| 🟡 Weak | In GSC, position 21–50 |
| 👁️ Visible | In GSC, position > 50 |
| ❌ Gap | Not in GSC at all — Google doesn't associate us with this query |

---

## Acting on gaps

| Gap type | Action |
|---|---|
| HIGH volume gap, existing page | The page exists but needs the keyword in H1, intro paragraph, and/or FAQ |
| MEDIUM volume gap, existing page | Add an FAQ item or a sentence mentioning the keyword naturally |
| Any gap, no page exists | Flag as content opportunity — needs a new calculator or article |
| Cluster with 5+ gaps but no page | New page opportunity — that whole topic is uncovered |

---

## Cluster definitions

Clusters are defined in `scripts/keyword-review.mjs` in the `CLUSTERS` array. Each cluster has:
- `id` — internal key
- `label` — display name
- `pages` — target pages on the site
- `seeds` — keywords sent to DataForSEO `keywords_for_keywords`
- `match` — substrings used to assign keywords to this cluster

To add a new topic cluster (e.g. pension calculator), add an entry to the `CLUSTERS` array.

---

## Notes

- DataForSEO `keywords_for_site` only returns keywords Google already associates with the domain. For a new site, this is dominated by whatever content has the most signals (currently: hypotheek/mortgage). This is correct and expected.
- The keyword universe grows as the site gains more content and authority. Re-run every 2–4 weeks to see new keywords appearing.
- NL keywords dominate because the site's primary audience is Dutch. English keywords will appear more as EN content grows.
- `keywords_for_keywords` fills the gap — it returns the full universe for a topic even if the site doesn't rank for it yet. This is where content opportunities come from.
- Volumes are Google Ads estimates, lagged 1–2 months. Treat them as order-of-magnitude.

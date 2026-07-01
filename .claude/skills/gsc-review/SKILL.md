---
description: Analyse a new Google Search Console export, diff against the previous review, and output a prioritised action list
---

# GSC Review Skill — moneycho.com

Run this skill when the user drops a new GSC export. It reads the file, diffs against the last log entry, classifies queries into tiers, and updates `docs/seo/gsc-log.md` with the new review.

---

## Step 1 — Find the new report

Reports live in `docs/seo/reports/`. The newest file (by filename date `gsc-YYYY-MM-DD.xlsx`) is always the current report.

```bash
ls docs/seo/reports/ | sort | tail -5
```

If there are multiple new files since the last log entry, process the most recent one.

---

## Step 2 — Extract all sheets

Run this Python script to pull every sheet:

```python
import zipfile, xml.etree.ElementTree as ET

xlsx = 'docs/seo/reports/gsc-YYYY-MM-DD.xlsx'  # replace with actual filename
with zipfile.ZipFile(xlsx) as z:
    ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
    ss = ET.fromstring(z.read('xl/sharedStrings.xml'))
    strings = [t.text or '' for t in ss.findall('.//ns:t', ns)]

    wb = ET.fromstring(z.read('xl/workbook.xml'))
    sheets = [(s.get('name'), s.get('sheetId')) for s in wb.findall('.//ns:sheet', ns)]

    for sheet_name, sheet_id in sheets:
        try:
            ws = ET.fromstring(z.read(f'xl/worksheets/sheet{sheet_id}.xml'))
            rows = []
            for row in ws.findall('.//ns:row', ns):
                cells = []
                for c in row.findall('ns:c', ns):
                    v = c.find('ns:v', ns)
                    cells.append(strings[int(v.text)] if v is not None and c.get('t')=='s' else (v.text if v is not None else ''))
                rows.append(cells)
            print(f'\n=== {sheet_name} ===')
            for r in rows:
                print(r)
        except Exception as e:
            print(f'Error: {sheet_name} — {e}')
```

Sheets to extract and analyse:
- **Chart** — date-by-date totals (clicks, impressions, CTR, position)
- **Queries** — top queries with clicks, impressions, CTR, position
- **Pages** — top pages with clicks, impressions, CTR, position
- **Countries** — traffic split by country
- **Devices** — desktop vs mobile split

---

## Step 3 — Read the previous review from the log

Read `docs/seo/gsc-log.md` and extract:
- The most recent review's query positions table
- The most recent review's pages table
- Any open (unchecked) action items

---

## Step 4 — Classify all queries into tiers

For every query in the new report:

| Tier | Position range | Label | What it means |
|---|---|---|---|
| 🔴 Urgent | Was ranked, now gone | Dropped | Something broke — investigate immediately |
| 🟡 Quick Win | 11–20 | Quick Win | One optimisation push can reach page 1 |
| 🟠 Almost | 21–50 | Almost | Needs content depth or internal links |
| 🔵 Climbing | 51–80 | Climbing | Indexed and moving, keep publishing |
| ⚪ Buried | 80+ | Buried | Needs authority, backlinks, or content rewrite |
| 🆕 New | Not in previous log | New | First appearance — note and watch |

For every query also calculate **Δ position** vs the previous review (negative = improved, positive = dropped).

---

## Step 5 — Identify priority actions

Apply these rules to generate the action list:

### Automatic actions to flag

**🟡 Quick Win queries (pos 11–20):**
- Check which page is ranking for this query
- Suggest: tighten H1 to match query exactly, add FAQ targeting the query as a question, add internal links from related articles/calculators

**🟠 Almost queries (pos 21–50):**
- Suggest: expand the ranking page (add 300–500 words of depth), improve internal linking, add the query to the page's meta description

**🔴 Dropped queries:**
- Check if the page still exists and is indexed
- Check if a recent code change could have affected it
- Flag as urgent — investigate before any other work

**Pages with high impressions but low CTR (< 5%):**
- Suggest: rewrite meta title to be more compelling, add a number or benefit ("Free", "2026", "in 5 minutes")

**Pages ranking 3–10 with decent impressions:**
- These are close to featured snippets — suggest adding a concise definition or summary paragraph at the top

**New queries not previously seen:**
- Note them — they reveal what Google thinks the site is about, which may differ from the intended topics

### Priority order for action list
1. 🔴 Dropped pages (fix before anything)
2. 🟡 Quick Wins with highest impressions
3. Pages with high impressions + low CTR
4. 🟠 Almost queries with 3+ impressions
5. Pages already in top 5 — push to top 3

---

## Step 6 — Write the new log entry

Append a new review block to `docs/seo/gsc-log.md` following this exact format:

```markdown
## Review #N — YYYY-MM-DD
**Export covers:** [date range from Filters sheet]
**Report file:** `docs/seo/reports/gsc-YYYY-MM-DD.xlsx`

### Totals
| Metric | Value | Δ vs prev |
|---|---|---|
| Total clicks | X | +/- X |
| Total impressions | X | +/- X |
| Avg CTR | X% | +/- X% |

### Queries
| Query | Clicks | Impressions | Position | Tier | Δ vs prev |
|---|---|---|---|---|---|
| ... | | | | | |

### Pages
| Page | Clicks | Impressions | Position | Δ vs prev |
|---|---|---|---|---|
| ... | | | | |

### Action list this cycle
- [ ] **P1** [highest priority action]
- [ ] **P2** ...
- [ ] **P3** ...

### Carried over from last cycle (not yet done)
- [ ] [any unchecked items from previous review]
```

Mark previous cycle's completed actions as `[x]` in their original review block.

---

## Step 7 — Report to user

Output a short summary:
1. **Headline number**: total impressions and clicks vs last review (e.g. "14 → 38 impressions, +171%")
2. **Biggest mover**: which query improved or dropped the most
3. **Top 3 actions** from the priority list, with the specific page and what to change
4. Confirm the log has been updated

---

## Related skills

- `/keyword-review` — cross-references GSC data with a GKP export to map keyword clusters and find content gaps. Run after a new GKP export is dropped in `docs/seo/keywords/`.

---

## Notes

- GSC data has a 2–3 day lag — the most recent 2–3 days in the export are incomplete. Don't panic over drops in the last 2 days.
- Position numbers are averages across all queries and dates — a single impression at position 90 doesn't mean the page is buried if another impression was at position 3.
- The site is new (launched June 2026) — expect impressions to grow slowly for the first 3 months as Google builds trust. The trajectory matters more than the absolute numbers at this stage.
- NL queries are the priority — 100% of clicks come from the Netherlands. Always fix NL pages before EN equivalents.

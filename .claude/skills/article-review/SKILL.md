---
description: Review new MoneyCho articles for quality, SEO, and publication readiness
---

# Article Review Skill — MoneyCho

Use this skill when the user asks to check, review, or audit a new article (MDX file in `src/content/en/` or `src/content/nl/`) before publishing.

## What to read first

1. The article file itself
2. The existing template at `src/content/en/_template.mdx` (canonical MDX format)
3. Any existing article on the same topic (to check for duplicate content)

---

## Checklist: run every item, report pass / fail / fix

### 1. Frontmatter (fatal if missing)

```
export const metadata = {
  title: '...',       // exact H1 title, ends with a strong noun or benefit
  description: '...', // 140-160 chars, includes target keyword, no quotes/colons at start
  tag: '...',         // one of: saving | investing | borrowing | budgeting | income | mortgage | retirement
  date: 'Month DD, YYYY',
  author: 'Moneycho Editorial',
};
```

- [ ] All five fields present and non-empty
- [ ] `description` is 140–160 characters
- [ ] `tag` is one of the allowed values
- [ ] `date` format matches `Month DD, YYYY`

### 2. Title and H1

- [ ] Article body does NOT start with its own `# Title` line — the H1 is rendered by the page shell from `metadata.title` (avoids a duplicate H1)
- [ ] Title contains the primary keyword (ideally near the start)
- [ ] Title is 50–65 characters (fits Google's title display)
- [ ] No clickbait; title delivers on what the article actually covers

### 3. Structure and readability

- [ ] Opening paragraph hooks the reader without being vague — first sentence answers "why does this matter to me?"
- [ ] H2 subheadings every 200–400 words (not longer walls of text)
- [ ] Subheadings are meaningful (not "Introduction", "Overview", "Conclusion")
- [ ] Lists/bullets used for 3+ parallel items — not inline comma lists
- [ ] Article ends with a clear takeaway or call to action

### 4. SEO

- [ ] Primary keyword appears in H1, first 100 words, and at least 2–3 H2s or body paragraphs
- [ ] No keyword stuffing (keyword density below ~2%, reads naturally)
- [ ] At least one internal link to a relevant MoneyCho calculator or guide
  - Calculators at `/calculators/budget`, `/calculators/compound-interest`, `/calculators/mortgage`, `/calculators/debt-payoff`, `/calculators/savings-goal`, `/calculators/credit-card-payoff`, `/calculators/take-home-pay`, `/calculators/cash-flow`, `/calculators/borrowing-capacity`, `/calculators/budget-planner`
- [ ] No broken or external-only links where an internal link would serve the same purpose
- [ ] Word count: 600–2000 words. Under 500 = too thin. Over 3000 = consider splitting.

### 5. Locale accuracy (CRITICAL for Dutch-first site)

**For EN articles:**
- [ ] No Canadian-specific references unless explicitly about Canada (no "Statistics Canada", "Bank of Canada", "RRSP", "TFSA", "Government of Canada" without context)
- [ ] General EN can use "we", "us", "most people" instead of country-specific
- [ ] Currency: use € as primary for NL-adjacent topics; $ when topic is genuinely global
- [ ] Retirement age: use 65–68 range, not a fixed 65 (NL is 67)

**For NL articles:**
- [ ] Written in Dutch (not machine-translated — should feel native)
- [ ] Uses Dutch financial terms: `jaarruimte`, `box 3`, `NHG`, `eigen risico`, `vermogensbelasting`, etc.
- [ ] References Dutch institutions: ECB (not Bank of Canada), Nibud, AFM, DNB where appropriate
- [ ] Retirement: use `AOW-leeftijd` (67 in 2026), not generic 65
- [ ] Currency always €, Dutch decimal notation (€1.234,56)
- [ ] Credit score section: Dutch system is BKR (not 300–900 range — that's Canadian)
- [ ] No references to Canadian programs (RRSP, TFSA, RBC, etc.)

### 6. Factual accuracy

- [ ] All statistics cited are plausible and current (within 2 years)
- [ ] Interest rates, tax rates, thresholds match the current year if mentioned
- [ ] No guarantees about investment returns ("you will earn X%")
- [ ] No specific financial advice ("you should buy ETF X") — use educational framing
- [ ] A disclaimer at the bottom if the article covers investing, tax, or borrowing:
  - EN: `_This article is for educational purposes. Always speak with a qualified financial advisor before making major financial decisions._`
  - NL: `_Dit artikel is bedoeld als educatieve informatie. Raadpleeg altijd een gekwalificeerd financieel adviseur voordat je grote financiële beslissingen neemt._`

### 7. Copyright / originality

- [ ] Content is original — not verbatim copied from any course, book, or third-party website
- [ ] If inspired by or adapted from a source, it's been substantially rewritten and the angle is MoneyCho's own
- [ ] No McGill/RBC/university course transcript text (this has come up before — raw lecture transcripts are not articles)
- [ ] External links do not point to ClickUp attachments or internal planning URLs

### 8. MDX format

- [ ] File is saved as `.mdx` (not `.md`)
- [ ] File is in the correct locale folder: `src/content/en/` or `src/content/nl/`
- [ ] Slug (filename without `.mdx`) is lowercase, hyphen-separated, matches the primary keyword
- [ ] No raw HTML — use markdown equivalents
- [ ] `export const metadata = { ... }` is at the very top (line 1)
- [ ] Both EN and NL versions exist (or note which is missing)

### 9. Sitemap

- [ ] If this is a new article series or a new route (not just a regular guide), check `src/app/sitemap.ts` — guides are auto-included via `guides` lib, but calculators and standalone pages must be manually added

---

## How to report

For each article, output a table:

| Check | Status | Note |
|---|---|---|
| Frontmatter complete | ✅ | |
| Title SEO | ✅ | |
| Structure | ⚠️ | No internal links |
| Locale accuracy | ❌ | Says "Bank of Canada" — should be ECB |
| Factual accuracy | ✅ | |
| Copyright | ✅ | |
| MDX format | ✅ | |

Then a short **verdict**: `Ready to publish` / `Needs fixes` / `Do not publish`.

List any required fixes with the exact line or section and what to change.

---

## Common issues seen before

- Raw McGill University course transcripts dropped into `src/content/` — **not publishable**
- EN articles saying "Canadians", "Statistics Canada", "Bank of Canada" — fix to generic "many people" / "ECB" / "central banks"
- Articles too short (< 500 words) — flag as thin content
- No internal calculator links — always add at least one
- Dutch credit score described as 300–900 (Canadian BKR system is different — no numeric score)
- Files saved as `.md` instead of `.mdx`

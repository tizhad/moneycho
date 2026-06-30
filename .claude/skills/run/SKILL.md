---
description: Launch the moneycho Next.js dev server and verify a route is live
---

# Run skill — moneycho

## Launch

```bash
# Kill any existing server on port 3000, then start fresh
kill $(lsof -ti:3000) 2>/dev/null; sleep 1
npm run dev > /tmp/nextjs-dev.log 2>&1 &
echo "PID: $!"
```

Wait **8 seconds** for Turbopack to compile, then confirm it's ready:

```bash
sleep 8 && grep "Ready in" /tmp/nextjs-dev.log
```

Expected output: `✓ Ready in 310ms`

## Verify a route

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/en/calculators/budget-planner
```

Expected: `200`

## Check for errors

```bash
cat /tmp/nextjs-dev.log | grep -E "Error|error|failed" | grep -v "^>" | head -10
```

## Key facts

- **Framework**: Next.js 16.2.9 with Turbopack
- **Port**: 3000
- **Start command**: `npm run dev`
- **Locales**: `/en/` and `/nl/` prefix on all routes
- **New route gotcha**: After adding new files, Turbopack needs a **full restart** (not just a save). The first request after restart may take ~500ms to compile — subsequent requests are fast.
- **Log file**: `/tmp/nextjs-dev.log`
- **Test URLs**:
  - Home: `http://localhost:3000/en`
  - Calculators index: `http://localhost:3000/en/calculators`
  - Budget planner (new): `http://localhost:3000/en/calculators/budget-planner`
  - Budget 50/30/20: `http://localhost:3000/en/calculators/budget`

# LoanLens — EMI Calculator

A small, single-page EMI calculator with live results, a principal-vs-interest donut,
and a year-by-year repayment table.

**Stack:** Vite, React 18, Tailwind CSS, Framer Motion

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run test:math  # verifies the EMI and amortization formulas
```

## Structure
- `src/utils/emi.js` — `calcEmi`, `buildYearlySchedule`, `formatINR` (pure functions)
- `src/utils/emi.check.mjs` — quick assertions against a known reference (₹10L @ 8.5% / 20 yrs ≈ ₹8,678)
- `src/components/` — SliderField (slider + synced number input), Donut, ScheduleTable
- `src/App.jsx` — state and layout; tenure can be switched between years and months

Uses the standard reducing-balance formula. Real loans may differ with processing fees and rounding.

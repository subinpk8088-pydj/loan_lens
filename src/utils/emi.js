export const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.round(n));

/** Monthly EMI for a reducing-balance loan. Handles 0% interest. */
export function calcEmi(principal, annualRatePct, months) {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 12 / 100;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}

/** Month-by-month amortization, rolled up into per-year rows. */
export function buildYearlySchedule(principal, annualRatePct, months) {
  const emi = calcEmi(principal, annualRatePct, months);
  const r = annualRatePct / 12 / 100;
  let balance = principal;
  const years = [];

  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    const principalPaid = Math.min(emi - interest, balance);
    balance = Math.max(balance - principalPaid, 0);

    const yearIdx = Math.ceil(m / 12) - 1;
    if (!years[yearIdx]) years[yearIdx] = { year: yearIdx + 1, principal: 0, interest: 0, balance: 0 };
    years[yearIdx].principal += principalPaid;
    years[yearIdx].interest += interest;
    years[yearIdx].balance = balance;
  }
  return years;
}

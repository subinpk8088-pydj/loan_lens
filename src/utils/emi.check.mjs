import { calcEmi, buildYearlySchedule } from "./emi.js";

const assert = (cond, msg) => {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
  console.log("ok  :", msg);
};

// Known reference: ₹10,00,000 at 8.5% for 20 years ≈ ₹8,678/month
const emi = calcEmi(1_000_000, 8.5, 240);
assert(Math.abs(emi - 8678) < 2, `EMI 10L @8.5% 20y ≈ 8678 (got ${emi.toFixed(2)})`);

assert(Math.abs(calcEmi(120000, 0, 12) - 10000) < 1e-9, "0% interest splits evenly");
assert(calcEmi(0, 8, 12) === 0, "zero principal gives zero EMI");

const sched = buildYearlySchedule(1_000_000, 8.5, 240);
assert(sched.length === 20, "20-year loan has 20 yearly rows");
assert(sched.at(-1).balance < 1, "balance reaches zero at the end");
const totalPrincipal = sched.reduce((s, y) => s + y.principal, 0);
assert(Math.abs(totalPrincipal - 1_000_000) < 1, "principal repaid sums to loan amount");

const partial = buildYearlySchedule(500000, 10, 18);
assert(partial.length === 2, "18-month loan spans 2 yearly rows");

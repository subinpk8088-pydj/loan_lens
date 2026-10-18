import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SliderField from "./components/SliderField";
import Donut from "./components/Donut";
import ScheduleTable from "./components/ScheduleTable";
import { buildYearlySchedule, calcEmi, formatINR } from "./utils/emi";

export default function App() {
  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20); // in the selected unit
  const [unit, setUnit] = useState("years");

  const months = unit === "years" ? tenure * 12 : tenure;

  const { emi, total, interest, schedule } = useMemo(() => {
    const emi = calcEmi(amount, rate, months);
    const total = emi * months;
    return { emi, total, interest: total - amount, schedule: buildYearlySchedule(amount, rate, months) };
  }, [amount, rate, months]);

  const switchUnit = (next) => {
    if (next === unit) return;
    setTenure(next === "months" ? tenure * 12 : Math.min(30, Math.max(1, Math.round(tenure / 12))));
    setUnit(next);
  };

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <span className="text-xl font-extrabold tracking-tight text-indigo-700">LoanLens</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">EMI Calculator</span>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl"
        >
          Know your monthly payment before you borrow.
        </motion.h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <section className="space-y-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 md:p-8 lg:col-span-3">
            <SliderField
              label="Loan amount"
              prefix="₹"
              value={amount}
              min={100000}
              max={10000000}
              step={50000}
              onChange={setAmount}
              hint={(n) => formatINR(n)}
            />
            <SliderField
              label="Interest rate (p.a.)"
              suffix="%"
              value={rate}
              min={1}
              max={20}
              step={0.1}
              onChange={(n) => setRate(Math.round(n * 10) / 10)}
              hint={(n) => `${n}%`}
            />
            <div>
              <div className="mb-3 flex justify-end">
                <div className="inline-flex rounded-full bg-indigo-50 p-1 text-xs font-bold ring-1 ring-indigo-100">
                  {["years", "months"].map((u) => (
                    <button
                      key={u}
                      onClick={() => switchUnit(u)}
                      className={`rounded-full px-4 py-1.5 capitalize transition ${unit === u ? "bg-indigo-600 text-white" : "text-indigo-700"}`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
              <SliderField
                label="Loan tenure"
                suffix={unit === "years" ? "yrs" : "mo"}
                value={tenure}
                min={unit === "years" ? 1 : 6}
                max={unit === "years" ? 30 : 360}
                step={1}
                onChange={setTenure}
                hint={(n) => `${n} ${unit === "years" ? "yr" : "mo"}`}
              />
            </div>
          </section>

          <section className="rounded-3xl bg-ink p-6 text-white shadow-xl md:p-8 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Monthly EMI</p>
            <motion.p key={Math.round(emi)} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-4xl font-extrabold">
              {formatINR(emi)}
            </motion.p>

            <div className="mt-6">
              <Donut principal={amount} interest={Math.max(interest, 0)} />
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-white/70">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" /> Principal
                </dt>
                <dd className="font-bold">{formatINR(amount)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-white/70">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Total interest
                </dt>
                <dd className="font-bold">{formatINR(Math.max(interest, 0))}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <dt className="text-white/70">Total payable</dt>
                <dd className="text-lg font-extrabold">{formatINR(total)}</dd>
              </div>
            </dl>
          </section>
        </div>

        <ScheduleTable rows={schedule} />

        <p className="mt-8 text-center text-xs text-slate-400">
          Estimates use the standard reducing-balance formula. Actual EMI may vary with lender fees and rounding.
        </p>
      </main>
    </div>
  );
}

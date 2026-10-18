import { useState } from "react";
import { formatINR } from "../utils/emi";

const PREVIEW_ROWS = 5;

export default function ScheduleTable({ rows }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? rows : rows.slice(0, PREVIEW_ROWS);

  return (
    <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 md:p-8">
      <h2 className="text-lg font-extrabold">Year-by-year repayment</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wider text-slate-400">
              <th className="py-3 font-semibold">Year</th>
              <th className="py-3 text-right font-semibold">Principal paid</th>
              <th className="py-3 text-right font-semibold">Interest paid</th>
              <th className="py-3 text-right font-semibold">Balance</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.year} className="border-b border-slate-50 last:border-0">
                <td className="py-3 font-bold">{r.year}</td>
                <td className="py-3 text-right text-indigo-700">{formatINR(r.principal)}</td>
                <td className="py-3 text-right text-amber-600">{formatINR(r.interest)}</td>
                <td className="py-3 text-right font-semibold">{formatINR(r.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > PREVIEW_ROWS && (
        <button onClick={() => setShowAll((v) => !v)} className="mt-4 text-sm font-bold text-indigo-600 hover:text-indigo-800">
          {showAll ? "Show fewer years" : `Show all ${rows.length} years`}
        </button>
      )}
    </section>
  );
}

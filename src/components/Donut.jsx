import { motion } from "framer-motion";

const R = 70;
const C = 2 * Math.PI * R;

/** Principal vs interest split, drawn as two stacked SVG arcs. */
export default function Donut({ principal, interest }) {
  const total = principal + interest;
  const principalShare = total > 0 ? principal / total : 1;
  const principalLen = C * principalShare;

  return (
    <div className="relative mx-auto h-52 w-52">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={R} fill="none" stroke="#f59e0b" strokeWidth="22" />
        <motion.circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="22"
          strokeDasharray={C}
          initial={false}
          animate={{ strokeDashoffset: C - principalLen }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Interest</span>
        <span className="text-2xl font-extrabold text-amber-500">{Math.round((1 - principalShare) * 100)}%</span>
      </div>
    </div>
  );
}

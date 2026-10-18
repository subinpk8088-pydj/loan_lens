import { useEffect, useState } from "react";

/** Labelled slider with a synced numeric input. */
export default function SliderField({ label, value, min, max, step = 1, onChange, prefix = "", suffix = "", hint }) {
  const [text, setText] = useState(String(value));

  useEffect(() => setText(String(value)), [value]);

  const commit = (raw) => {
    const n = Number(raw);
    if (Number.isNaN(n)) return setText(String(value));
    onChange(Math.min(max, Math.max(min, n)));
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-semibold text-slate-600">{label}</label>
        <div className="flex items-center rounded-xl bg-indigo-50 px-3 py-1.5 ring-1 ring-indigo-100 focus-within:ring-2 focus-within:ring-indigo-500">
          {prefix && <span className="mr-1 text-sm font-bold text-indigo-700">{prefix}</span>}
          <input
            inputMode="decimal"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={(e) => commit(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            className="w-24 bg-transparent text-right text-sm font-bold text-indigo-700 outline-none"
            aria-label={label}
          />
          {suffix && <span className="ml-1 text-sm font-bold text-indigo-700">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        className="mt-4"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`${label} slider`}
      />
      <div className="mt-1.5 flex justify-between text-xs text-slate-400">
        <span>{hint ? hint(min) : min}</span>
        <span>{hint ? hint(max) : max}</span>
      </div>
    </div>
  );
}

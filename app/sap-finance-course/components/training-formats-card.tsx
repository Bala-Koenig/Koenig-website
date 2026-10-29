"use client";

export const SELECT_FORMAT_EVENT = "koenig:select-format";

interface FormatOption {
  mode: string;
  price: string;
  desc: string;
  badge?: string;
  badgeColor?: string;
  /** Batch "format" value this row should filter the scheduler to when clicked (e.g. "1-on-1", "Online"). */
  targetFormat?: string;
}

interface TrainingFormatsCardProps {
  formats: FormatOption[];
  trust?: string;
}

function selectFormatAndScroll(targetFormat?: string) {
  if (targetFormat) {
    window.dispatchEvent(new CustomEvent(SELECT_FORMAT_EVENT, { detail: targetFormat }));
  }
  document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Banner-side card listing available training formats with pricing — each row jumps to and filters the Schedule section. */
export function TrainingFormatsCard({ formats, trust }: TrainingFormatsCardProps) {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-white/80">
        Training Formats &amp; Pricing
      </h3>

      <div className="space-y-5">
        {formats.map((opt, i) => (
          <button
            type="button"
            key={opt.mode}
            onClick={() => selectFormatAndScroll(opt.targetFormat)}
            className={`block w-full text-left transition hover:opacity-80 ${i > 0 ? "border-t border-dashed border-white/15 pt-5" : ""}`}
          >
            <div className="mb-1.5 flex items-start justify-between gap-3">
              <span className="text-base font-bold text-white">{opt.mode}</span>
              <span className="text-xl font-extrabold leading-none text-white">{opt.price}</span>
            </div>
            <div className="flex items-end justify-between gap-3">
              <p className="text-sm leading-snug text-white/50">
                {opt.desc.split("\n").map((line, j) => (
                  <span key={j} className="block">{line}</span>
                ))}
              </p>
              {opt.badge && (
                <span className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold ${opt.badgeColor}`}>
                  {opt.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {trust && (
        <p className="mt-5 border-t border-white/10 pt-4 text-center text-xs text-white/50">{trust}</p>
      )}
    </div>
  );
}

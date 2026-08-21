import type { ReactNode } from "react";

interface FormatOption {
  mode: string;
  icon: ReactNode;
  points: string[];
  badge?: string;
  badgeColor?: string;
}

interface TrainingFormatsCardProps {
  formats: FormatOption[];
}

/** Banner-side card listing available training formats — no pricing shown here; see #schedule for that. */
export function TrainingFormatsCard({ formats }: TrainingFormatsCardProps) {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">
          Training Formats
        </h3>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </div>

      <div className="space-y-4">
        {formats.map((opt, i) => (
          <div key={opt.mode} className={i > 0 ? "border-t border-dashed border-white/15 pt-4" : ""}>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="text-white/60">{opt.icon}</span>
              <span className="text-sm font-semibold text-white">{opt.mode}</span>
              {opt.badge && (
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${opt.badgeColor}`}>
                  {opt.badge}
                </span>
              )}
            </div>
            <p className="w-full text-sm text-white/50">{opt.points.join(" · ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

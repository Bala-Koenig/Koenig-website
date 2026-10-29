interface FormatOption {
  mode: string;
  price: string;
  priceINR?: string | null;
  desc: string;
  badge: string;
  badgeColor: string;
}

interface PricingCardProps {
  formats: FormatOption[];
  defaultSelected?: string;
}

export function PricingCard({ formats }: PricingCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:self-start">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/80">
        Training Formats &amp; Pricing
      </h3>

      <div className="space-y-3">
        {formats.map((opt) => (
          <div
            key={opt.mode}
            className="w-full rounded-lg border border-white/10 p-4 text-left"
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">{opt.mode}</span>
              <span className="text-lg font-bold text-white">{opt.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50">
                {opt.desc}
                {opt.priceINR && <span className="ml-1">({opt.priceINR})</span>}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${opt.badgeColor}`}>
                {opt.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-[11px] text-white/40">
        100% Happiness Guarantee &middot; Free Rescheduling &middot; Secure Payment
      </p>
    </div>
  );
}

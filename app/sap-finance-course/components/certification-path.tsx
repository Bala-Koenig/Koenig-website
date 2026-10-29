"use client";

import { useEffect, useRef, useState } from "react";

interface Cert {
  code: string;
  name: string;
  current?: boolean;
  note?: string;
  duration?: string;
  vendor?: string;
}
interface Tier {
  tier: string;
  certs: Cert[];
}
interface Pt {
  l: number; r: number; y: number;
  t: number; b: number; x: number;
}
interface Wire {
  d: string;
  arrow: boolean;
}

const TIER_STYLES = [
  {
    bubble: "from-sky-400 to-cyan-400", shadow: "shadow-sky-400/25", pill: "bg-sky-50 text-sky-700 border-sky-200",
    cardBorder: "border-sky-100", cardHover: "hover:border-sky-300/60 hover:shadow-sky-400/8",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
  },
  {
    bubble: "from-koenig-blue to-cyan-500", shadow: "shadow-koenig-blue/25", pill: "bg-koenig-blue/8 text-koenig-blue border-koenig-blue/20",
    cardBorder: "border-koenig-blue/20", cardHover: "hover:border-koenig-blue/40 hover:shadow-koenig-blue/10",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  },
  {
    bubble: "from-cyan-600 to-blue-500", shadow: "shadow-cyan-600/25", pill: "bg-cyan-50 text-cyan-700 border-cyan-200",
    cardBorder: "border-cyan-100", cardHover: "hover:border-cyan-300/60 hover:shadow-cyan-500/8",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  },
  {
    bubble: "from-teal-500 to-cyan-400", shadow: "shadow-teal-500/25", pill: "bg-teal-50 text-teal-700 border-teal-200",
    cardBorder: "border-teal-100", cardHover: "hover:border-teal-300/60 hover:shadow-teal-500/8",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>,
  },
];

function rectOf(el: HTMLElement, containerRect: DOMRect): Pt {
  const r = el.getBoundingClientRect();
  return {
    l: r.left - containerRect.left, r: r.right - containerRect.left, y: r.top - containerRect.top + r.height / 2,
    t: r.top - containerRect.top, b: r.bottom - containerRect.top, x: r.left - containerRect.left + r.width / 2,
  };
}

export function CertificationPath({ certPath }: { certPath: Tier[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wires, setWires] = useState<Wire[]>([]);

  useEffect(() => {
    let frame = 0;
    const draw = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const vertical = window.matchMedia("(max-width: 767px)").matches;
      const next: Wire[] = [];

      for (let t = 0; t < certPath.length - 1; t++) {
        const L = Array.from(container.querySelectorAll<HTMLElement>(`[data-tier="${t}"]`));
        const R = Array.from(container.querySelectorAll<HTMLElement>(`[data-tier="${t + 1}"]`));
        if (!L.length || !R.length) continue;
        const Lp = L.map((el) => rectOf(el, rect));
        const Rp = R.map((el) => rectOf(el, rect));

        if (vertical) {
          // stacked columns: straight vertical feeders into one straight horizontal trunk, then straight vertical arrows out
          const yb = Math.max(...Lp.map((o) => o.b));
          const yt = Math.min(...Rp.map((o) => o.t));
          const jy = (yb + yt) / 2;
          const jx = [...Lp, ...Rp].reduce((s, o) => s + o.x, 0) / (Lp.length + Rp.length);
          const xs = [...Lp, ...Rp].map((o) => o.x), xMin = Math.min(...xs), xMax = Math.max(...xs);
          Lp.forEach((o) => { next.push({ d: `M${o.x},${o.b} L${o.x},${jy}`, arrow: false }); });
          if (xMax - xMin > 1) next.push({ d: `M${xMin},${jy} L${xMax},${jy}`, arrow: false });
          Rp.forEach((o) => { next.push({ d: `M${o.x},${jy} L${o.x},${o.t - 1}`, arrow: true }); });
        } else {
          // side-by-side columns: straight horizontal feeders into one straight vertical trunk, then straight horizontal arrows out
          const xr = Math.max(...Lp.map((o) => o.r));
          const xl = Math.min(...Rp.map((o) => o.l));
          const jx = (xr + xl) / 2;
          const ys = [...Lp, ...Rp].map((o) => o.y), yMin = Math.min(...ys), yMax = Math.max(...ys);
          Lp.forEach((o) => { next.push({ d: `M${o.r},${o.y} L${jx},${o.y}`, arrow: false }); });
          if (yMax - yMin > 1) next.push({ d: `M${jx},${yMin} L${jx},${yMax}`, arrow: false });
          Rp.forEach((o) => { next.push({ d: `M${jx},${o.y} L${o.l - 1},${o.y}`, arrow: true }); });
        }
      }
      setWires(next);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); };
    schedule();
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    if (containerRef.current) ro.observe(containerRef.current);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
    };
  }, [certPath]);

  return (
    <div ref={containerRef} className="relative">
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <marker id="cp-arrow" orient="auto" markerWidth="6" markerHeight="6" refX="5" refY="3">
            <path d="M0 0L6 3L0 6Z" fill="#0694D1" />
          </marker>
        </defs>
        {wires.map((w, i) => (
          <path key={i} d={w.d} fill="none" stroke="#0694D1" strokeWidth={2} strokeLinecap="butt" markerEnd={w.arrow ? "url(#cp-arrow)" : undefined} />
        ))}
      </svg>

      <div className="grid items-start gap-4 md:grid-cols-4">
        {certPath.map((tier, tierIdx) => {
          const tierStyles = TIER_STYLES[tierIdx];
          return (
            <div key={tier.tier} className="flex flex-col gap-3">
              <div className="flex flex-col items-center gap-2">
                <div className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${tierStyles.bubble} shadow-md ${tierStyles.shadow} ring-4 ring-white`}>
                  {tierStyles.icon}
                </div>
                <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${tierStyles.pill}`}>
                  {tier.tier}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {tier.certs.map((cert) => (
                  <div
                    key={cert.code}
                    data-tier={tierIdx}
                    className={`group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      cert.current
                        ? "border-koenig-blue/40 shadow-[0_4px_20px_rgba(6,148,209,0.15)] ring-2 ring-koenig-blue/15"
                        : `${tierStyles.cardBorder} ${tierStyles.cardHover}`
                    }`}
                  >
                    <div className={`text-sm font-black ${cert.current ? "bg-gradient-to-r from-koenig-blue to-cyan-500 bg-clip-text text-transparent" : "text-koenig-dark"}`}>
                      {cert.code}
                    </div>
                    <div className="mt-0.5 text-[11px] text-koenig-muted">{cert.name}</div>

                    {(cert.duration || cert.vendor) && (
                      <div className="mt-2 flex items-center gap-1.5">
                        {cert.duration && <span className="text-[10px] font-medium text-koenig-muted">{cert.duration}</span>}
                        {cert.vendor && (
                          <span className="rounded-full bg-koenig-dark px-2 py-0.5 text-[9px] font-bold text-white">
                            {cert.vendor}
                          </span>
                        )}
                      </div>
                    )}

                    {cert.current && (
                      <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-koenig-blue to-cyan-500 px-3 py-1 text-[10px] font-bold text-white shadow-sm shadow-koenig-blue/30">
                        <svg width="6" height="6" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                        Current Course
                      </span>
                    )}
                    {"note" in cert && cert.note && (
                      <p className="mt-2 text-[10px] leading-snug text-sky-600 font-medium">
                        {cert.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF", bg: "#041825" };

const personas = [
  { role: "Developers", tag: "Technical", bullets: ["Custom connectors", "Plugin dev", "ALM"],
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M8 6l-6 6 6 6M16 6l6 6-6 6" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { role: "Business Analysts", tag: "Strategy", bullets: ["Process mapping", "Automate flows", "Data modeling"],
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#0694D1" strokeWidth="1.8" /><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#0694D1" strokeWidth="1.8" /><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#0694D1" strokeWidth="1.8" /><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#0694D1" strokeWidth="1.8" /></svg> },
  { role: "IT Managers", tag: "Governance", bullets: ["DLP policies", "CoE toolkit", "Env strategy"],
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 2L3 7v6c0 5.25 3.83 10.15 9 11.25 5.17-1.1 9-6 9-11.25V7l-9-5z" stroke="#0694D1" strokeWidth="1.8" /><path d="M9 12l2 2 4-4" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { role: "Data Analysts", tag: "Analytics", bullets: ["DAX formulas", "Power BI", "Dataflows"],
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M4 20V10M9 20V6M14 20V12M19 20V8" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" /><path d="M2 20h20" stroke="#0694D1" strokeWidth="1.5" /></svg> },
  { role: "Project Managers", tag: "Delivery", bullets: ["Architecture", "Demos", "Deployment"],
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#0694D1" strokeWidth="1.8" /><path d="M3 10h18" stroke="#0694D1" strokeWidth="1.8" /><path d="M8 14h4M8 17h6" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" /></svg> },
  { role: "Students", tag: "Beginners", bullets: ["Fundamentals", "Portfolio", "Cert prep"],
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 3L1 9l11 6 9-4.91V17" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 13.18v4.26C5 19.82 8.13 22 12 22s7-2.18 7-4.56v-4.26" stroke="#0694D1" strokeWidth="1.8" /></svg> },
];

export default function WhoShouldAttend() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-[60px]"
      style={{ backgroundColor: "#fff" }}
      aria-labelledby="who-heading"
    >
      {/* subtle top divider */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(6,148,209,0.2), transparent)" }} />

      <div className="relative max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px]">

        {/* Header — compact */}
        <div className="animate-on-scroll flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[16px] mb-[36px]">
          <div>
            <span className="inline-flex items-center gap-[6px] text-[12px] font-heading font-medium uppercase tracking-[0.1em] px-[14px] py-[5px] rounded-full mb-[12px]"
              style={{ backgroundColor: "rgba(6,148,209,0.08)", color: C.accent, border: "1px solid rgba(6,148,209,0.2)" }}>
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{display:'inline',verticalAlign:'middle'}}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="#0694D1" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> Who Is This For?
            </span>
            <h2 id="who-heading" className="font-heading font-medium text-[28px] sm:text-[34px] leading-tight" style={{ color: C.dark }}>
              Built for <span className="text-shimmer-dark">Every Professional</span>
            </h2>
          </div>
          <p className="font-body text-[15px] max-w-[400px]" style={{ color: "#6B7280" }}>
            Technical or non-technical — there&apos;s a path designed for you.
          </p>
        </div>

        {/* Compact 6-card grid — 3x2 on desktop, less height per card */}
        <div className="animate-on-scroll grid grid-cols-2 lg:grid-cols-3 gap-[14px]" style={{ transitionDelay: "0.06s" }}>
          {personas.map((p, i) => (
            <div
              key={p.role}
              className="group relative rounded-[14px] p-[20px] border overflow-hidden transition-all duration-300 hover:-translate-y-[3px]"
              style={{
                backgroundColor: "#FAFCFF",
                borderColor: "#E8EDF2",
                transitionDelay: `${0.04 * i}s`,
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at 30% 30%, rgba(6,148,209,0.06) 0%, transparent 70%)" }} />

              {/* Top row: icon + role + tag */}
              <div className="relative flex items-center gap-[12px] mb-[14px]">
                <div className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 border"
                  style={{ backgroundColor: "rgba(6,148,209,0.1)", borderColor: "rgba(6,148,209,0.25)" }}>
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-medium text-[15px] leading-tight truncate" style={{ color: C.dark }}>{p.role}</h3>
                  <span className="text-[11px] font-body" style={{ color: "#94A3B8" }}>{p.tag}</span>
                </div>
              </div>

              {/* Inline bullet chips */}
              <div className="relative flex flex-wrap gap-[6px]">
                {p.bullets.map((b) => (
                  <span key={b} className="text-[11px] font-body px-[10px] py-[4px] rounded-full border"
                    style={{ backgroundColor: "rgba(6,148,209,0.06)", borderColor: "rgba(6,148,209,0.15)", color: "#64748B" }}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

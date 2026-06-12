"use client";
import { useEffect, useRef, useState } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF", bg: "#041825" };

const technologies = [
  { name: "Azure",            courses: "45+", paths: ["Fundamentals", "Administrator", "Architect"] },
  { name: "AI & Copilot",     courses: "12+", paths: ["AI Engineer", "Data Scientist", "Copilot"] },
  { name: "Microsoft Fabric", courses: "9+",  paths: ["Data Engineering", "Data Science", "Analytics"] },
  { name: "Security",         courses: "15+", paths: ["Identity", "SIEM & SOAR", "Compliance"] },
  { name: "Microsoft 365",    courses: "18+", paths: ["Administrator", "Teams", "Collaboration"] },
  { name: "Dynamics 365",     courses: "14+", paths: ["CRM", "ERP", "Business Apps"] },
  { name: "Data & Analytics", courses: "8+",  paths: ["Data Engineer", "Database Admin", "BI"] },
  { name: "DevOps & Dev",     courses: "12+", paths: ["DevOps", "Developer", "GitHub"] },
];

function TechCard({ name, courses, paths }: { name: string; courses: string; paths: string[] }) {
  return (
    <div
      className="group relative flex flex-col p-[20px] rounded-[14px] transition-all duration-300 hover:-translate-y-[2px] cursor-pointer tech-card"
      style={{ background: "rgba(10,28,46,0.85)", border: "1px solid rgba(6,148,209,0.18)", backdropFilter: "blur(8px)" }}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-[14px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(6,148,209,0.6), transparent)" }} />

      <div className="flex items-start justify-between gap-[8px] mb-[8px]">
        <h3 className="font-heading font-medium text-[16px] leading-tight" style={{ color: "#ffffff" }}>{name}</h3>
        <div className="flex-shrink-0 w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
          style={{ background: "transparent", border: "1px solid rgba(6,148,209,0.35)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
          </svg>
        </div>
      </div>

      <p className="font-heading font-medium text-[13px] mb-[18px]" style={{ color: C.accent }}>{courses} Courses</p>
      <div style={{ height: 1, background: "rgba(6,148,209,0.1)", marginBottom: 14 }} />
      <p className="font-body text-[11px] mb-[10px]" style={{ color: "rgba(228,247,255,0.35)", letterSpacing: "0.03em" }}>Learning Paths</p>

      <div className="flex flex-wrap gap-[8px]">
        {paths.map((path) => (
          <span key={path} className="font-heading font-medium text-[11px] px-[10px] py-[5px] rounded-full"
            style={{ background: "rgba(6,148,209,0.08)", border: "1px solid rgba(6,148,209,0.3)", color: "#60CEFA" }}>
            {path}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RelatedTech() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const total = technologies.length;
  const dragStart = useRef<number | null>(null);
  const isDragging = useRef(false);

  const onDragStart = (x: number) => { dragStart.current = x; isDragging.current = false; };
  const onDragMove  = (x: number) => { if (dragStart.current !== null && Math.abs(x - dragStart.current) > 5) isDragging.current = true; };
  const onDragEnd   = (x: number) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - x;
    if (Math.abs(diff) > 40) setSlide(s => diff > 0 ? Math.min(s + 1, total - 1) : Math.max(s - 1, 0));
    dragStart.current = null;
    isDragging.current = false;
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-[30px] overflow-hidden" style={{ backgroundColor: C.bg }} aria-labelledby="related-tech-heading">
      <style suppressHydrationWarning>{`
        .rt-mobile-carousel { display: none; }
        .rt-desktop-grid { display: grid; }

        @media(max-width: 700px) {
          .rt-desktop-grid { display: none; }
          .rt-mobile-carousel { display: block; }

          .rt-track-wrap { overflow: hidden; }
          .rt-track { display: flex; align-items: stretch; transition: transform 0.35s cubic-bezier(0.25,1,0.5,1); }
          .rt-slide { flex: 0 0 88%; max-width: 88%; padding-right: 12px; box-sizing: border-box; display: flex; }
          .rt-slide > div { flex: 1; }

          .rt-nav { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 24px; }
          .rt-nav-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(6,148,209,0.35); background: rgba(6,148,209,0.08); color: ${C.accent}; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
          .rt-nav-btn:hover { background: rgba(6,148,209,0.2); }
          .rt-nav-btn:disabled { opacity: 0.35; cursor: default; }
          .rt-nav-count { font-size: 13px; font-weight: 700; color: rgba(228,247,255,0.6); min-width: 40px; text-align: center; }
          .tech-card { padding: 16px !important; }
        }
        @media(max-width: 375px) {
          .rt-slide { flex: 0 0 92%; max-width: 92%; }
          .tech-card { padding: 14px !important; }
        }
      `}</style>

      {/* Grid lines background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(6,148,209,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(6,148,209,0.07) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute -top-[80px] -right-[80px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute -bottom-[60px] -left-[60px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,148,209,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px]">

        {/* Header */}
        <div className="animate-on-scroll text-center mb-[36px]">
          <span className="inline-flex items-center gap-[6px] text-[12px] font-heading font-medium uppercase tracking-[0.1em] px-[14px] py-[5px] rounded-full mb-[14px]"
            style={{ backgroundColor: "rgba(6,148,209,0.12)", color: "#60CEFA", border: "1px solid rgba(6,148,209,0.25)" }}>
            Microsoft Technologies
          </span>
          <h2 id="related-tech-heading" className="font-heading font-medium leading-tight mb-[12px]" style={{ color: "#fff", fontSize: "clamp(22px, 2.8vw, 36px)" }}>
            Top Microsoft <span style={{ color: C.accent }}>Technology Areas</span>
          </h2>
          <p className="font-body text-[16px] max-w-[600px] mx-auto" style={{ color: "rgba(228,247,255,0.5)" }}>
            Explore official Microsoft certification paths across cloud, security, data, and productivity.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="animate-on-scroll rt-desktop-grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px]" style={{ transitionDelay: "0.06s" }}>
          {technologies.map((t) => (
            <TechCard key={t.name} {...t} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="rt-mobile-carousel animate-on-scroll" style={{ transitionDelay: "0.06s" }}>
          <div className="rt-track-wrap"
            onTouchStart={e => onDragStart(e.touches[0].clientX)}
            onTouchMove={e => onDragMove(e.touches[0].clientX)}
            onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}
            onMouseDown={e => onDragStart(e.clientX)}
            onMouseMove={e => onDragMove(e.clientX)}
            onMouseUp={e => onDragEnd(e.clientX)}
            onMouseLeave={e => { if (dragStart.current !== null) onDragEnd(e.clientX); }}
            style={{ userSelect: "none", cursor: "grab" }}>
            <div className="rt-track" style={{ transform: `translateX(calc(-${slide * 88}% - ${slide * 12}px))` }}>
              {technologies.map((t, i) => (
                <div key={t.name} className="rt-slide">
                  <TechCard {...t} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="rt-nav">
            <button className="rt-nav-btn" disabled={slide === 0} onClick={() => setSlide(s => s - 1)} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span className="rt-nav-count">{slide + 1} / {total}</span>
            <button className="rt-nav-btn" disabled={slide === total - 1} onClick={() => setSlide(s => s + 1)} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

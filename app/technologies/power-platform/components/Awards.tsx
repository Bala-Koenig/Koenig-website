"use client";
import { useEffect, useRef, useState } from "react";

const MS_AWARDS = [
  { vendorLogo: "/images/partners/microsoft-cloud-t.png", awardImg: "/images/awards/MS-Partner-of-the-year-2025-popup.webp", title: "Winner of Microsoft Training Services Partner of the Year Award", year: "2025" },
  { vendorLogo: "/images/partners/microsoft-cloud-t.png", awardImg: "/images/awards/Microsoft-FY2024-Superstar-Award.webp", title: "Winner of Microsoft's ANZ Superstar Campaign", year: "2024" },
  { vendorLogo: "/images/partners/microsoft-cloud-t.png", awardImg: "/images/awards/Microsoft-Superstar-Award-2022.webp", title: "Winner of Microsoft's Asia Superstar Campaign", year: "2022" },
  { vendorLogo: "/images/partners/amazon-authorized.png", awardImg: "/images/awards/Finalist–AWS-Partner-of-the-Year-2024.webp", title: "Finalist – AWS Partner of the Year", year: "2024" },
  { vendorLogo: "/images/partners/EC-Council-logo.png", awardImg: "/images/awards/Winner-of-EC-Council-ATC-of-the-Year-Award-2024.webp", title: "Winner of EC-Council ATC of the Year Award", year: "2024" },
  { vendorLogo: "GPTW", awardImg: "/images/awards/Certified-as-great-place-to-work.webp", title: "Certified as a Great Place to Work", year: "2011–2025" },
  { vendorLogo: "/images/partners/Redvendorlogo.png", awardImg: "/images/awards/RED-25.png", title: "Winner of RedHat Gold Partner of the Year – Non-Retail (GLS India)", year: "2025" },
  { vendorLogo: "/images/partners/Redvendorlogo.png", awardImg: "/images/awards/RED-24.png", title: "Winner of RedHat Gold Partner of the Year – Non-Retail (GLS India)", year: "2024" },
  { vendorLogo: "/images/partners/Redvendorlogo.png", awardImg: "/images/awards/Redhat-23.png", title: "Winner of the Red Hat Partner of the Year Award", year: "2023" },
];

const doubled = [...MS_AWARDS, ...MS_AWARDS];

const AWARD_STATS = [
  { value: "10+", label: "Awards & Certifications", color: "#0694d1", iconPath: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  { value: "6+", label: "Global Partners", color: "#0694d1", iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { value: "15 Yrs", label: "Great Place to Work", color: "#f59e0b", iconPath: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
  { value: "3x", label: "Microsoft Partner of Year", color: "#0694d1", iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];

export default function Awards() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const [cursor, setCursor] = useState("grab");
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const tick = () => {
      if (!dragging.current) posRef.current -= 0.8;
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        if (posRef.current <= -halfWidth) posRef.current += halfWidth;
        if (posRef.current > 0) posRef.current -= halfWidth;
      }
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const startDrag = (x: number) => { dragging.current = true; lastX.current = x; setCursor("grabbing"); };
  const moveDrag = (x: number) => { if (!dragging.current) return; posRef.current += x - lastX.current; lastX.current = x; };
  const endDrag = () => { dragging.current = false; setCursor("grab"); };

  return (
    <section
      aria-labelledby="awards-heading"
      style={{ position: "relative", overflow: "hidden", background: "#fff", borderTop: "1px solid #CAEFFF", borderBottom: "1px solid #CAEFFF", padding: "30px 16px" }}
    >
      {/* Radial blobs */}
      <div style={{ pointerEvents: "none", position: "absolute", left: -128, top: 0, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)" }} />
      <div style={{ pointerEvents: "none", position: "absolute", right: -80, bottom: 0, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(77,191,239,0.18) 0%, transparent 70%)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 20, opacity: 0, transform: "translateY(28px)", transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}>
          <span style={{ display: "inline-block", background: "rgba(6,148,209,0.1)", color: "#0694D1", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 18px", borderRadius: 999, marginBottom: 10 }}>
            Recognition
          </span>
          <h2 id="awards-heading" style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 800, color: "#0f1f3d", marginBottom: 8, lineHeight: 1.3 }}>
            Awards &amp;{" "}
            <span style={{ background: "linear-gradient(to right,#0694d1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Recognition
            </span>
          </h2>
          <p style={{ fontSize: 14, color: "#6b8499", margin: 0 }}>
            Recognized by global vendors and quality bodies for training excellence
          </p>
        </div>

        {/* Stats — desktop: 4-col row | mobile: single card 2×2 with dividers */}
        <div className="award-stats-wrap" style={{ margin: "0 auto 20px" }}>
          <div className="award-stats-grid">
            {AWARD_STATS.map(({ value, label, iconPath, color }, i) => (
              <div key={label} className="award-stat-cell" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "20px 16px", textAlign: "center" }}>
                <svg style={{ width: 24, height: 24 }} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d={iconPath} />
                </svg>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#0f1f3d", lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#6b8499", lineHeight: 1.3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Draggable marquee */}
      <div
        style={{ overflowX: "clip", padding: "14px 0", cursor, userSelect: "none", maskImage: "linear-gradient(to right,transparent 0,#000 80px,#000 calc(100% - 80px),transparent 100%)", WebkitMaskImage: "linear-gradient(to right,transparent 0,#000 80px,#000 calc(100% - 80px),transparent 100%)" }}
        onMouseDown={(e) => { startDrag(e.clientX); e.preventDefault(); }}
        onMouseMove={(e) => moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e) => { e.preventDefault(); moveDrag(e.touches[0].clientX); }}
        onTouchEnd={endDrag}
      >
        <div ref={trackRef} style={{ display: "flex", gap: 20, paddingLeft: 20, paddingRight: 20, width: "max-content", willChange: "transform" }}>
          {doubled.map((a, i) => (
            <div
              key={i}
              style={{ flexShrink: 0, width: "min(380px, calc(100vw - 32px))", height: 280, background: "#fff", borderRadius: 18, border: "1.5px solid #CAEFFF", overflow: "hidden", display: "flex", boxShadow: "0 2px 12px rgba(0,0,0,0.07), 0 4px 16px rgba(6,148,209,0.10)", transition: "transform 0.25s ease, box-shadow 0.25s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(7,109,157,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07), 0 4px 16px rgba(6,148,209,0.10)"; }}
            >
              {/* Left — award image */}
              <div style={{ width: 150, flexShrink: 0, background: "#F0FAFF", borderRight: "1.5px solid #CAEFFF", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 8 }}>
                <img
                  decoding="async"
                  src={a.awardImg}
                  alt={a.title}
                  style={{ width: "90%", height: "90%", objectFit: "contain" }}
                  loading="lazy"
                  draggable={false}
                />
              </div>
              {/* Right — vendor logo + title + year */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "20px 12px", textAlign: "center" }}>
                <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {a.vendorLogo === "GPTW"
                    ? <img decoding="async" loading="lazy" src={a.awardImg} alt="Great Place to Work" style={{ maxHeight: 64, maxWidth: 140, objectFit: "contain" }} draggable={false} />
                    : <img decoding="async" src={a.vendorLogo} alt="" style={{ maxHeight: 64, maxWidth: 140, objectFit: "contain" }} loading="lazy" draggable={false} />
                  }
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0f1f3d", lineHeight: 1.35, margin: 0 }}>{a.title}</p>
                <span style={{ border: "1px solid #CAEFFF", borderRadius: 20, padding: "2px 12px", fontSize: 13, fontWeight: 600, color: "#7a9ab0" }}>{a.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style suppressHydrationWarning>{`
        /* Desktop: 4-col single row */
        .award-stats-wrap { max-width: 680px; }
        .award-stats-grid { display: grid; grid-template-columns: repeat(4,1fr); background: #fff; border-radius: 16px; border: 1px solid #e8f4fb; box-shadow: 0 2px 16px rgba(6,148,209,0.08); overflow: hidden; }
        .award-stat-cell { border-right: 1px solid #e8f4fb; }
        .award-stat-cell:last-child { border-right: none; }

        /* Mobile: single card 2×2 with dividers */
        @media (max-width: 600px) {
          .award-stats-wrap { max-width: 400px; }
          .award-stats-grid { grid-template-columns: repeat(2,1fr); border: 1.5px solid #D5EEF9; }
          .award-stat-cell { border-right: none; border-bottom: none; }
          .award-stat-cell:nth-child(odd)  { border-right: 1px solid #e8f4fb; }
          .award-stat-cell:nth-child(-n+2) { border-bottom: 1px solid #e8f4fb; }
        }
        @media (max-width: 700px) {
          section[aria-labelledby="awards-heading"] { padding: 24px 16px !important; }
        }
        @media (max-width: 375px) {
          section[aria-labelledby="awards-heading"] { padding: 24px 16px !important; }
        }
      `}</style>
    </section>
  );
}

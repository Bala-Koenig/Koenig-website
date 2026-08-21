"use client";
import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  { quote: "Passed AZ-104 on first attempt. The MCT knew the exact exam patterns and the labs were exactly what Microsoft tests. Worth every penny.", name: "Rahul M.", role: "Azure Administrator", cert: "AZ-104 Certified", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "We put our entire infrastructure team through AZ-104 as a group. Koenig's on-site delivery was seamless and all 12 of us passed within 2 months.", name: "Sarah K.", role: "IT Infrastructure Manager, Financial Services", cert: "AZ-104 Team Training", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "The 1-on-1 format was a game changer for AZ-104. My trainer adjusted the pace to my schedule and I cleared the exam while working full-time.", name: "Ahmed R.", role: "Systems Administrator", cert: "AZ-104 Certified", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "Started as an on-prem admin with zero cloud experience. AZ-104's structured labs got me confidently managing Azure environments in 6 weeks.", name: "Priya S.", role: "Cloud Administrator", cert: "AZ-104 Certified", photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "As an L&D head I've used 5 training vendors for our Azure upskilling. Koenig's AZ-104 curriculum, MCT quality, and ESI compliance is in a different league.", name: "James T.", role: "Head of L&D, UK Enterprise", cert: "AZ-104 Cohort Trained", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "Cleared AZ-104 in 4 weeks alongside my day job. The virtual networking and identity modules were explained better than any course I'd tried before.", name: "Aisha N.", role: "Cloud Support Engineer", cert: "AZ-104 Certified", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "AZ-104's storage and VM labs felt exactly like the real exam environment. My trainer's real-world Azure project stories made the concepts stick.", name: "David L.", role: "Infrastructure Engineer", cert: "AZ-104 Certified", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "Switched careers from on-prem sysadmin to Azure Administrator through AZ-104. The customised schedule around my timezone was a lifesaver.", name: "Mei W.", role: "Azure Administrator", cert: "AZ-104 Certified", photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "Our whole ops team got AZ-104 certified through Koenig's corporate training. Smooth logistics and top-tier MCTs throughout.", name: "Carlos R.", role: "Engineering Manager", cert: "AZ-104 Team Training", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face&auto=format" },
];

function TestimonialsColumn({ testimonials, duration = 15, className = "" }: { testimonials: typeof TESTIMONIALS; duration?: number; className?: string }) {
  const doubled = [...testimonials, ...testimonials];
  return (
    <div className={`overflow-hidden ${className}`}>
      <ul
        style={{
          display: "flex", flexDirection: "column", gap: 20, margin: 0, padding: 0, listStyle: "none",
          animation: `courseScrollCol ${duration}s linear infinite`,
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
      >
        {doubled.map((t, i) => (
          <li key={i} style={{ width: 280, flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: 16, background: "#fff", border: "1px solid #DCEEFB", boxShadow: "0 2px 12px rgba(6,148,209,0.07)" }}>
              <div style={{ flex: 1, padding: "18px 18px 14px" }}>
                <div style={{ marginBottom: 8, fontSize: 13, color: "#FBBF24" }}>★★★★★</div>
                <p style={{ margin: "0 0 14px", fontSize: 13, lineHeight: 1.7, color: "#2d4a6a" }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={t.photo} alt={t.name} loading="lazy" style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #DCEEFB", flexShrink: 0, objectFit: "cover" }} />
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0d1b2a", lineHeight: 1.3 }}>{t.name}</p>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#0694D1" }}>{t.role}</p>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #E8F4FA", background: "#F8FCFF", padding: "10px 18px" }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#0d1b2a" }}>{t.cert}</p>
                <span style={{ background: "#E8F4FA", color: "#0569a8", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>✓ Verified</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileTestimonialRow({ testimonials }: { testimonials: typeof TESTIMONIALS }) {
  const doubled = [...testimonials, ...testimonials];
  const trackRef = useRef<HTMLUListElement>(null);
  const posRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startPos: 0 });
  const rafRef = useRef<number | null>(null);
  const [popup, setPopup] = useState<(typeof TESTIMONIALS)[number] | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const loop = () => {
      if (!dragRef.current.active) {
        posRef.current += 0.5;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current -= half;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className="overflow-hidden md:hidden" style={{ touchAction: "pan-y" }}
      onTouchStart={(e) => { dragRef.current = { active: true, startX: e.touches[0].clientX, startPos: posRef.current }; }}
      onTouchMove={(e) => {
        if (!dragRef.current.active || !trackRef.current) return;
        const delta = dragRef.current.startX - e.touches[0].clientX;
        const half = trackRef.current.scrollWidth / 2;
        posRef.current = ((dragRef.current.startPos + delta) % half + half) % half;
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }}
      onTouchEnd={() => { dragRef.current.active = false; }}
    >
      <ul ref={trackRef} style={{ listStyle: "none", margin: 0, padding: "4px 0", display: "flex", gap: 16, width: "max-content" }}>
        {doubled.map((t, i) => (
          <li key={i} style={{ width: 280, flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: 16, background: "#fff", border: "1px solid #DCEEFB", boxShadow: "0 2px 12px rgba(6,148,209,0.07)" }}>
              <div style={{ flex: 1, padding: "18px 18px 14px" }}>
                <div style={{ marginBottom: 8, fontSize: 13, color: "#FBBF24" }}>★★★★★</div>
                <p style={{ margin: "0 0 6px", fontSize: 13, lineHeight: 1.7, color: "#2d4a6a", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>"{t.quote}"</p>
                <button onClick={() => setPopup(t)} style={{ background: "none", border: "none", color: "#0694D1", fontSize: 11, fontWeight: 700, cursor: "pointer", padding: "0 0 12px", display: "block" }}>Show more →</button>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={t.photo} alt={t.name} loading="lazy" style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #DCEEFB", flexShrink: 0, objectFit: "cover" }} />
                  <div><p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0d1b2a", lineHeight: 1.3 }}>{t.name}</p><p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#0694D1" }}>{t.role}</p></div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #E8F4FA", background: "#F8FCFF", padding: "10px 18px" }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#0d1b2a" }}>{t.cert}</p>
                <span style={{ background: "#E8F4FA", color: "#0569a8", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>✓ Verified</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {popup && (
        <div onClick={() => setPopup(null)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(7,30,46,0.70)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: "28px 24px 40px", width: "100%", maxWidth: 480, maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ marginBottom: 12, fontSize: 14, color: "#FBBF24" }}>★★★★★</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#2d4a6a", marginBottom: 20 }}>"{popup.quote}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src={popup.photo} alt={popup.name} style={{ width: 48, height: 48, borderRadius: "50%", border: "2px solid #DCEEFB", objectFit: "cover" }} />
              <div><p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0d1b2a" }}>{popup.name}</p><p style={{ margin: 0, fontSize: 12, color: "#0694D1", fontWeight: 600 }}>{popup.role}</p></div>
            </div>
            <div style={{ marginTop: 16, display: "inline-flex", background: "#E8F4FA", color: "#0569a8", borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 700 }}>✓ {popup.cert}</div>
          </div>
        </div>
      )}
    </div>
  );
}

const STATS = [
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, val: "18,400+", label: "Verified Reviews" },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, val: "4.9 / 5", label: "Average Rating" },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, val: "95%", label: "Would Recommend" },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, val: "1M+", label: "Professionals Trained" },
];

export function CourseTestimonials() {
  return (
    <>
      <style>{`
        @keyframes courseScrollCol { from { transform: translateY(0); } to { transform: translateY(-50%); } }
      `}</style>
      <section className="px-[15px] sm:px-6 py-[15px] sm:py-12" style={{ background: "#E8F4FA", overflow: "hidden", position: "relative", borderTop: "1px solid #CAEFFF" }}>
        {/* Blobs */}
        <div style={{ pointerEvents: "none", position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 65%)" }} />
        <div style={{ pointerEvents: "none", position: "absolute", right: -96, bottom: 0, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,216,0.15) 0%, transparent 70%)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 0 }}>
            <span style={{ display: "inline-block", marginBottom: 12, borderRadius: 999, background: "rgba(6,148,209,0.10)", padding: "6px 18px", fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#0694D1" }}>
              Real Transformations
            </span>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 800, color: "#071e2e", margin: "0 0 12px", lineHeight: 1.3, letterSpacing: "-0.015em" }}>
              Course{" "}
              <span style={{ background: "linear-gradient(90deg,#0694D1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Student Reviews
              </span>
            </h2>
            <p style={{ textAlign: "center", maxWidth: 480, margin: "0 auto", color: "#4a6a8a", fontSize: 15, lineHeight: 1.65 }}>
              Real results from IT professionals who trained with Koenig — rated 4.9/5 from 18,400+ verified reviews.
            </p>
          </div>

          {/* Stats bar */}
          <div style={{ margin: "16px auto 15px", maxWidth: 760 }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: "12px 8px", boxShadow: "0 4px 20px rgba(6,148,209,0.10)", border: "1px solid #DCEEFB" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
                {STATS.map((s, i) => (
                  <div key={s.label} style={{ textAlign: "center", padding: "6px 4px", borderRight: i < STATS.length - 1 ? "1px solid #CAEFFF" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
                      {/* Smaller icon on mobile */}
                      <span className="sm:hidden" style={{ transform: "scale(0.75)", display: "inline-flex" }}>{s.icon}</span>
                      <span className="hidden sm:inline-flex">{s.icon}</span>
                    </div>
                    <div className="text-[15px] sm:text-[22px]" style={{ fontWeight: 800, color: "#093148", lineHeight: 1.2 }}>{s.val}</div>
                    <div className="text-[12px]" style={{ marginTop: 2, color: "#666", lineHeight: 1.3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile horizontal marquee */}
          <MobileTestimonialRow testimonials={TESTIMONIALS} />

          {/* Desktop scrolling columns */}
          <div className="hidden md:flex" style={{ justifyContent: "center", gap: 24, marginTop: 48, maxHeight: 740, overflow: "hidden", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
            <TestimonialsColumn testimonials={TESTIMONIALS.slice(0, 3)} duration={15} />
            <TestimonialsColumn testimonials={TESTIMONIALS.slice(3, 6)} duration={19} className="hidden md:block" />
            <TestimonialsColumn testimonials={TESTIMONIALS.slice(6, 9)} duration={17} className="hidden lg:block" />
          </div>
        </div>
      </section>
    </>
  );
}

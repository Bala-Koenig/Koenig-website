"use client";
import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  { quote: "Passed AZ-104 on first attempt. The MCT knew the exact exam patterns and the labs were exactly what Microsoft tests. Worth every penny.", name: "Rahul M.", role: "Azure Administrator", cert: "AZ-104 Certified", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "I trained 15 of my team members for SC-200. Koenig's on-site delivery was seamless and all 15 passed within 3 months.", name: "Sarah K.", role: "CISO, Financial Services", cert: "Enterprise Client", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "The 1-on-1 format was a game changer. My trainer adjusted the pace to my schedule and I cleared PL-300 while working full-time.", name: "Ahmed R.", role: "Business Intelligence Lead", cert: "PL-300 Certified", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "From AZ-900 to AZ-305 in 6 months. Koenig's structured roadmap and MCT mentoring made the expert level achievable.", name: "Priya S.", role: "Cloud Solutions Architect", cert: "AZ-305 Expert", photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "As an L&D head I've used 5 training vendors. Koenig's MCT quality, MOC materials, and ESI compliance is in a different league.", name: "James T.", role: "Head of L&D, UK Enterprise", cert: "100+ Learners Trained", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "SC-900 and SC-300 back to back — both cleared first try. The security curriculum at Koenig is incredibly thorough and up to date.", name: "Aisha N.", role: "Security Analyst", cert: "SC-300 Certified", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "AI-102 was daunting but the trainer broke it down perfectly. Real Azure OpenAI labs made the difference. Highly recommend.", name: "David L.", role: "AI Engineer", cert: "AI-102 Certified", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "DP-600 Fabric certification done in 3 weeks of part-time study. The customised schedule around my timezone was a lifesaver.", name: "Mei W.", role: "Data Platform Engineer", cert: "DP-600 Certified", photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face&auto=format" },
  { quote: "Our whole DevOps team got AZ-400 certified through Koenig's corporate training. Smooth logistics and top-tier MCTs throughout.", name: "Carlos R.", role: "Engineering Manager", cert: "AZ-400 Team Training", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face&auto=format" },
];

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: 16, background: "#fff", border: "1px solid #DCEEFB", boxShadow: "0 2px 12px rgba(6,148,209,0.07)" }}>
      <div style={{ flex: 1, padding: "18px 18px 14px" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#FBBF24" }}>★★★★★</div>
        <p style={{ margin: "0 0 14px", fontSize: 13, lineHeight: 1.7, color: "#2d4a6a" }}>&ldquo;{t.quote}&rdquo;</p>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={t.photo} alt={t.name} loading="lazy"
            style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #DCEEFB", flexShrink: 0, objectFit: "cover" }}
          />
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
  );
}

function TestimonialsColumn({ testimonials, duration = 15, className = "" }: { testimonials: typeof TESTIMONIALS; duration?: number; className?: string }) {
  const doubled = [...testimonials, ...testimonials];
  return (
    <div className={`test-col-scroll-wrap${className ? " " + className : ""}`}>
      <ul className="test-col-track" style={{ animationDuration: `${duration}s`, listStyle: "none", margin: 0, padding: 0 }}>
        {doubled.map((t, i) => (
          <li key={i} style={{ width: "min(280px, calc(100vw - 32px))", flexShrink: 0 }}>
            <TestimonialCard t={t} />
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
  const rafRef = useRef<number>(0);
  const [popup, setPopup] = useState<typeof TESTIMONIALS[0] | null>(null);

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
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    dragRef.current = { active: true, startX: e.touches[0].clientX, startPos: posRef.current };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current.active || !trackRef.current) return;
    const delta = dragRef.current.startX - e.touches[0].clientX;
    const half = trackRef.current.scrollWidth / 2;
    posRef.current = ((dragRef.current.startPos + delta) % half + half) % half;
    trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
  };
  const onTouchEnd = () => { dragRef.current.active = false; };

  return (
    <div className="test-mobile-row" style={{ overflow: "hidden", marginTop: 28 }} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <ul ref={trackRef} style={{ listStyle: "none", margin: 0, padding: "4px 0", display: "flex", gap: 16, width: "max-content" }}>
        {doubled.map((t, i) => (
          <li key={i} style={{ width: "min(280px, calc(100vw - 32px))", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: 16, background: "#fff", border: "1px solid #DCEEFB", boxShadow: "0 2px 12px rgba(6,148,209,0.07)" }}>
              <div style={{ flex: 1, padding: "18px 18px 14px" }}>
                <div style={{ marginBottom: 8, fontSize: 13, color: "#FBBF24" }}>★★★★★</div>
                <p style={{ margin: "0 0 6px", fontSize: 13, lineHeight: 1.7, color: "#2d4a6a", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>&ldquo;{t.quote}&rdquo;</p>
                <button onClick={(e) => { e.stopPropagation(); setPopup(t); }} style={{ background: "none", border: "none", color: "#0694D1", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", padding: "0 0 12px", display: "block" }}>Show more →</button>
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

      {popup && (
        <div onClick={() => setPopup(null)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(7,30,46,0.70)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: "28px 24px 40px", width: "100%", maxWidth: 480, maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 16, color: "#FBBF24", letterSpacing: 2 }}>★★★★★</span>
              <button onClick={() => setPopup(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b8299" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#2d4a6a", margin: "0 0 24px" }}>&ldquo;{popup.quote}&rdquo;</p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <img loading="lazy" src={popup.photo} alt={popup.name} style={{ width: 52, height: 52, borderRadius: "50%", border: "2px solid #DCEEFB", objectFit: "cover", flexShrink: 0 }} />
              <div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0d1b2a" }}>{popup.name}</p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0694D1" }}>{popup.role}</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #E8F4FA", paddingTop: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0d1b2a" }}>{popup.cert}</span>
              <span style={{ background: "#E8F4FA", color: "#0569a8", borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 700 }}>✓ Verified</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const STATS = [
  { val: "18,400+", label: "Verified Reviews", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { val: "4.9 / 5", label: "Average Rating", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { val: "95%", label: "Would Recommend", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
  { val: "1M+", label: "Professionals Trained", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
];

export default function Testimonials() {
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

  return (
    <section
      aria-labelledby="testimonials-heading"
      style={{ background: "#E8F4FA", padding: "30px 16px", overflow: "hidden", position: "relative", borderTop: "1px solid #CAEFFF" }}
    >
      {/* Radial blobs */}
      <div style={{ pointerEvents: "none", position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,148,209,0.20) 0%, transparent 65%)" }} />
      <div style={{ pointerEvents: "none", position: "absolute", right: -128, bottom: 0, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,216,0.18) 0%, transparent 70%)" }} />
      <div style={{ pointerEvents: "none", position: "absolute", left: -80, top: "50%", transform: "translateY(-50%)", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(77,191,239,0.16) 0%, transparent 70%)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 0, opacity: 0, transform: "translateY(40px)", transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          <span style={{ display: "inline-block", marginBottom: 12, borderRadius: 999, background: "rgba(6,148,209,0.10)", padding: "6px 18px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0694D1" }}>
            Real Transformations
          </span>
          <h2 id="testimonials-heading" style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 800, color: "#071e2e", margin: "0 0 12px", lineHeight: 1.3, letterSpacing: "-0.015em" }}>
            Microsoft Certification{" "}
            <span style={{ background: "linear-gradient(90deg,#0694D1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Student Reviews
            </span>
          </h2>
          <p style={{ textAlign: "center", maxWidth: 480, margin: "0 auto", color: "#4a6375", fontSize: 15, lineHeight: 1.65 }}>
            Real results from IT professionals who passed AZ-104, AI-102, SC-300 and other Microsoft exams with Koenig — rated 4.9/5 from 18,400+ verified reviews.
          </p>
        </div>

        {/* Stats bar — desktop: 4-col row | mobile: single card 2×2 with dividers */}
        <div className="rev-stats-wrap" style={{ margin: "28px auto 0" }}>
          <div className="rev-stats-grid">
            {STATS.map((s, i) => (
              <div key={s.label} className="rev-stat-cell" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#093148", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#6b8499", lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile horizontal marquee */}
        <MobileTestimonialRow testimonials={TESTIMONIALS} />

        {/* Desktop scrolling columns */}
        <div className="test-cols-outer" style={{ marginTop: 48 }}>
          <TestimonialsColumn testimonials={TESTIMONIALS.slice(0, 3)} duration={15} />
          <TestimonialsColumn testimonials={TESTIMONIALS.slice(3, 6)} duration={19} className="test-col-md" />
          <TestimonialsColumn testimonials={TESTIMONIALS.slice(6, 9)} duration={17} className="test-col-lg" />
        </div>
      </div>

      <style suppressHydrationWarning>{`
        @keyframes scrollCol { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        .test-cols-outer { display: flex; justify-content: center; gap: 24px; max-height: 740px; overflow: hidden; -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent); mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent); }
        .test-cols-outer:hover .test-col-track { animation-play-state: paused; }
        .test-col-scroll-wrap { overflow: hidden; }
        .test-col-track { display: flex; flex-direction: column; gap: 20px; animation: scrollCol linear infinite; }
        .test-col-scroll-wrap.test-col-md { display: none; }
        .test-col-scroll-wrap.test-col-lg { display: none; }
        @media (min-width: 768px) { .test-col-scroll-wrap.test-col-md { display: block; } }
        @media (min-width: 1024px) { .test-col-scroll-wrap.test-col-lg { display: block; } }
        .test-mobile-row { display: none; }

        /* Reviews stats — desktop 4-col, mobile 2×2 card */
        .rev-stats-wrap { max-width: 760px; }
        .rev-stats-grid { display: grid; grid-template-columns: repeat(4,1fr); background: #fff; border-radius: 16px; border: 1px solid #e8f4fb; box-shadow: 0 4px 20px rgba(6,148,209,0.10); overflow: hidden; padding: 4px 8px; }
        .rev-stat-cell { border-right: 1px solid #e8f4fb; }
        .rev-stat-cell:last-child { border-right: none; }

        @media (max-width: 600px) {
          .rev-stats-wrap { max-width: 400px; }
          .rev-stats-grid { grid-template-columns: repeat(2,1fr); border: 1.5px solid #D5EEF9; padding: 0; }
          .rev-stat-cell { border-right: none; border-bottom: none; }
          .rev-stat-cell:nth-child(odd)  { border-right: 1px solid #e8f4fb; }
          .rev-stat-cell:nth-child(-n+2) { border-bottom: 1px solid #e8f4fb; }
        }
        @media (max-width: 700px) {
          section[aria-labelledby="testimonials-heading"] { padding: 24px 16px !important; }
        }
        @media (max-width: 375px) {
          section[aria-labelledby="testimonials-heading"] { padding: 24px 12px !important; }
          .test-cols-outer { display: none !important; }
          .test-mobile-row { display: block !important; }
          .review-stats-grid { grid-template-columns: 1fr !important; }
          .review-stats-grid > div { border-right: none !important; border-bottom: 1px solid #CAEFFF; }
          .review-stats-grid > div:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}

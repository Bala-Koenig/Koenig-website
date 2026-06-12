"use client";
import { useEffect, useRef, useState } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF", bg: "#041825", bgDeep: "#020F18" };

const stats = [
  { value: "500K+", label: "Professionals Trained" },
  { value: "98%",  label: "Exam Pass Rate"         },
  { value: "150+", label: "Countries Reached"      },
  { value: "4.9★", label: "Learner Rating"         },
];

const MedalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px]" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <circle cx="12" cy="9" r="6" stroke="#0694D1" strokeWidth="1.5"/>
    <path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CheckShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px]" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path d="M12 2L3 7v6c0 5.25 3.83 10.15 9 11.25 5.17-1.1 9-6 9-11.25V7l-9-5z" stroke="#0694D1" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px]" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <circle cx="12" cy="12" r="10" stroke="#0694D1" strokeWidth="1.5"/>
    <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#0694D1" strokeWidth="1.5"/>
    <path d="M2 12h20" stroke="#0694D1" strokeWidth="1.5"/>
  </svg>
);

const badges = [
  { icon: <MedalIcon />, text: "Microsoft Authorized Partner" },
  { icon: <CheckShieldIcon />, text: "ISO 9001 Certified"           },
  { icon: <GlobeIcon />, text: "Live Online & Onsite"         },
];

const PARTNER_SLIDES = [
  {
    img: "/images/banner/microsoft-cloud-t (1).png",
    alt: "Microsoft Cloud Training Partner Badge",
    specialty: "Security",
    sub: "Training Services",
  },
  {
    img: "/images/banner/microsoft-data-ai-tsp-badge.png",
    alt: "Microsoft Data & AI TSP Badge",
    specialty: "Data & AI",
    sub: "Training Services",
  },
];

function PartnerCarousel() {
  const [idx, setIdx] = useState(0);
  const total = PARTNER_SLIDES.length;
  const prev = () => setIdx(i => (i - 1 + total) % total);
  const next = () => setIdx(i => (i + 1) % total);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % total), 3500);
    return () => clearInterval(t);
  }, [total]);

  const slide = PARTNER_SLIDES[idx];

  return (
    <div className="animate-on-scroll flex flex-col items-center justify-center gap-6 partner-carousel-wrap" style={{ transitionDelay: "0.25s" }}>
      <style suppressHydrationWarning>{`
        @media (max-width: 1024px) {
          .partner-carousel-wrap .partner-img-box { width: 180px !important; height: 130px !important; }
          .partner-carousel-wrap img { width: 180px !important; height: 130px !important; }
        }
      `}</style>
      {/* Image with left/right arrows overlaid */}
      <div className="partner-img-box" style={{ width: 300, height: 220, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src={slide.img}
          alt={slide.alt}
          width={300}
          height={220}
          style={{ width: 300, height: 220, objectFit: "contain", display: "block" }}
        />
        {/* Left arrow */}
        <button onClick={prev} style={{ position: "absolute", left: -50, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(6,20,40,0.7)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, backdropFilter: "blur(4px)", transition: "background 0.18s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(6,148,209,0.6)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(6,20,40,0.7)")}
        >‹</button>
        {/* Right arrow */}
        <button onClick={next} style={{ position: "absolute", right: -50, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(6,20,40,0.7)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, backdropFilter: "blur(4px)", transition: "background 0.18s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(6,148,209,0.6)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(6,20,40,0.7)")}
        >›</button>
      </div>

    </div>
  );
}

export default function Hero() {
  const heroRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    heroRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${C.bgDeep} 0%, ${C.bg} 55%, ${C.dark} 100%)` }}
      aria-label="Hero Section"
    >
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-bg" />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] rounded-full blur-[130px] pointer-events-none" style={{ backgroundColor: "rgba(6,148,209,0.1)" }} />
      <div className="absolute bottom-1/4 right-1/5 w-[360px] h-[360px] rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: "rgba(9,49,72,0.5)" }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ backgroundColor: "rgba(6,148,209,0.06)" }} />

      {/* Top line */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`, opacity: 0.4 }} />

      {/* Corner brackets */}
      <div className="absolute top-20 left-8 w-14 h-14 border-l-2 border-t-2 rounded-tl-lg" style={{ borderColor: "rgba(6,148,209,0.2)" }} />
      <div className="absolute bottom-20 right-8 w-14 h-14 border-r-2 border-b-2 rounded-br-lg" style={{ borderColor: "rgba(6,148,209,0.15)" }} />


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: 30, paddingBottom: 30 }}>

        {/* ── Top: 2-column main area ─────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — headline + CTA */}
          <div className="space-y-8">


            <div className="animate-on-scroll" style={{ transitionDelay: "0.1s" }}>
              <h1 className="font-heading font-medium leading-[1.07] tracking-tight hero-h1" style={{ color: C.light, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800 }}>
                Master <span className="text-shimmer">Microsoft Power Platform Certification</span>
              </h1>
            </div>

            <p className="animate-on-scroll font-body leading-relaxed max-w-xl" style={{ color: "rgba(228,247,255,0.6)", transitionDelay: "0.2s", fontSize: "15px", fontWeight: 500, marginTop: 12 }}>
              Build powerful business applications, automate workflows, and unlock deep data insights.
              Get certified by Microsoft-authorized trainers with hands-on labs and real-world projects.
            </p>

            {/* CTAs */}
            <div className="animate-on-scroll hero-cta-row" style={{ transitionDelay: "0.25s" }} id="enroll">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("openContactModal", { detail: { type: "individual" } }))}
                className="hero-cta-btn"
                style={{ padding: "12px 28px", borderRadius: 8, background: "#1AABDD", border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "background 0.18s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#0694D1")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1AABDD")}
              >
                Request More Info
              </button>
              <a href="#cert"
                className="hero-cta-btn"
                style={{ padding: "12px 28px", borderRadius: 8, background: "#093148", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "background 0.18s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#0a3d58")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#093148")}
              >
                Browse Courses
              </a>
            </div>
            <style suppressHydrationWarning>{`
              .hero-cta-row { display: flex; flex-wrap: wrap; gap: 12px; padding-top: 4px; }
              @media (max-width: 700px) {
                .hero-cta-row { flex-direction: column; gap: 10px; }
                .hero-cta-btn { width: 100% !important; text-align: center; justify-content: center; }
              }
            `}</style>

            {/* Social proof */}
            <div className="animate-on-scroll flex items-center gap-3 pt-1" style={{ transitionDelay: "0.3s" }}>
              {/* Overlapping avatars */}
              <div style={{ display: "flex" }}>
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
                ].map((src, i) => (
                  <img key={i} src={src} alt="certified professional" width={34} height={34}
                    style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid #0a1628", objectFit: "cover", marginLeft: i === 0 ? 0 : -10, position: "relative", zIndex: 5 - i }} />
                ))}
              </div>
              {/* Stars + text */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 3 }}>
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} style={{ color: "#F59E0B", fontSize: 15, lineHeight: 1 }}>{s}</span>
                  ))}
                </div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1AABDD" }}>
                  500K+ <span style={{ color: "rgba(228,247,255,0.7)", fontWeight: 400 }}>certified professionals</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right — Microsoft Solutions Partner carousel */}
          <PartnerCarousel />
        </div>


      </div>
    </section>
  );
}

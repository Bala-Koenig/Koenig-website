"use client";
import { useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF", bg: "#041825", bgDeep: "#020F18" };

const stats = [
  { value: "40K+", label: "Professionals Trained" },
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
      className="relative overflow-hidden pt-16"
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

      {/* Floating nodes */}
      {[
        { id: "lightning", icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M13 2L4 14h7v8l9-12h-7L13 2z" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, top: "130px", right: "64px", delay: "0s" },
        { id: "chart", icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M3 20h18M6 16v4M10 12v8M14 8v12M18 4v16" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round"/></svg>, top: "260px", right: "160px", delay: "1.5s" },
        { id: "cog", icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><circle cx="12" cy="12" r="3" stroke="#0694D1" strokeWidth="1.5"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001.08 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1.08z" stroke="#0694D1" strokeWidth="1.5"/></svg>, bottom: "160px", left: "80px", delay: "3s" },
      ].map((node) => (
        <div key={node.id} className="absolute animate-float hidden xl:block"
          style={{ top: node.top, right: node.right, bottom: node.bottom, left: node.left, animationDelay: node.delay }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg border"
            style={{ backgroundColor: "rgba(9,49,72,0.8)", borderColor: "rgba(6,148,209,0.2)", backdropFilter: "blur(8px)" }}>
            {node.icon}
          </div>
        </div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

        {/* ── Top: 2-column main area ─────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — headline + CTA */}
          <div className="space-y-8">
            <div className="animate-on-scroll flex flex-wrap gap-2">
              {badges.map((b) => (
                <span key={b.text} className="section-badge gap-1.5"><span>{b.icon}</span>{b.text}</span>
              ))}
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: "0.1s" }}>
              <h1 className="font-heading font-medium text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-6xl leading-[1.07] tracking-tight" style={{ color: C.light }}>
                Master{" "}
                <span className="text-shimmer">Microsoft<br />Power Platform</span>
                <br />
                <span style={{ color: "rgba(228,247,255,0.65)" }}>Certification</span>
              </h1>
            </div>

            <p className="animate-on-scroll font-body text-lg leading-relaxed max-w-xl" style={{ color: "rgba(228,247,255,0.6)", transitionDelay: "0.2s" }}>
              Build powerful business applications, automate workflows, and unlock deep data insights.
              Get certified by Microsoft-authorized trainers with hands-on labs and real-world projects.
            </p>

            {/* CTAs */}
            <div className="animate-on-scroll flex flex-wrap gap-3 pt-1" style={{ transitionDelay: "0.25s" }} id="enroll">
              <a href="#contact" className="btn-primary">
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="relative z-10">Enroll Now</span>
                <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact" className="btn-outline">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: C.accent }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Talk to Expert
              </a>
            </div>

            {/* Social proof */}
            <div className="animate-on-scroll flex items-center gap-4 pt-1" style={{ transitionDelay: "0.3s" }}>
              <div className="flex -space-x-2">
                {["A","B","C","D","E"].map((letter, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-heading font-medium"
                    style={{ backgroundColor: C.dark, borderColor: C.bg, color: C.accent }}>{letter}</div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {"★★★★★".split("").map((s, i) => <span key={i} className="text-sm" style={{ color: "#F59E0B" }}>{s}</span>)}
                  <span className="ml-1 text-sm font-heading font-medium" style={{ color: C.light }}>4.9</span>
                </div>
                <p className="text-xs font-body" style={{ color: "rgba(228,247,255,0.4)" }}>from 3,200+ verified reviews</p>
              </div>
            </div>
          </div>

          {/* Right — Tech illustration */}
          <div className="relative animate-on-scroll hidden lg:flex items-center justify-center" style={{ transitionDelay: "0.25s" }}>
            <div className="relative w-full max-w-[520px]">
              {/* Glow behind image */}
              <div className="absolute inset-0 rounded-[28px] blur-[60px] opacity-40" style={{ background: `radial-gradient(circle, ${C.accent}, transparent 70%)` }} />

              {/* Main image container with animated border */}
              <div className="relative rounded-[24px] p-[2px] overflow-hidden" style={{ boxShadow: "0 8px 48px rgba(2,15,24,0.6)" }}>
                {/* Animated rotating border */}
                <div
                  className="absolute inset-[-50%] animate-spin-slow"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0%, ${C.accent} 10%, #60CEFA 20%, #E4F7FF 30%, transparent 40%, transparent 60%, ${C.accent} 70%, #2BB8F0 80%, transparent 90%)`,
                  }}
                />
                {/* Inner container */}
                <div className="relative rounded-[22px] overflow-hidden" style={{ backgroundColor: C.bg }}>
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=450&fit=crop&q=80"
                  alt="Online Technology Training - Microsoft Power Platform Certification"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(4,24,37,0.05) 0%, rgba(4,24,37,0.7) 100%)" }} />

                {/* Overlay content */}
                <div className="absolute bottom-0 inset-x-0 p-[24px]">
                  <p className="font-heading font-medium text-[20px] leading-tight mb-[8px]" style={{ color: "#fff" }}>
                    Learn Technology. Get Certified.
                  </p>
                  <p className="font-body text-[13px] mb-[12px]" style={{ color: "rgba(228,247,255,0.65)" }}>
                    Expert-led training with hands-on labs, real-world projects, and globally recognized certifications
                  </p>
                  <div className="flex gap-[6px]">
                    {["Live Online", "1-on-1 Training", "Hands-on Labs", "Certified"].map((tag) => (
                      <span key={tag} className="text-[10px] font-heading font-medium px-[8px] py-[3px] rounded-full" style={{ backgroundColor: "rgba(6,148,209,0.2)", color: "rgba(228,247,255,0.7)", border: "1px solid rgba(6,148,209,0.25)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                </div>
              </div>

              {/* Floating orbit elements */}
              <div className="absolute -top-[16px] -right-[16px] animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center border"
                  style={{ backgroundColor: "rgba(9,49,72,0.92)", backdropFilter: "blur(12px)", borderColor: "rgba(6,148,209,0.3)", boxShadow: "0 4px 20px rgba(2,15,24,0.5)" }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-[28px] h-[28px]">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" fill="#FFB800" opacity="0.9" />
                  </svg>
                </div>
              </div>

              <div className="absolute -bottom-[12px] -left-[12px] animate-float" style={{ animationDelay: "2s" }}>
                <div className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center border"
                  style={{ backgroundColor: "rgba(9,49,72,0.92)", backdropFilter: "blur(12px)", borderColor: "rgba(74,222,128,0.3)", boxShadow: "0 4px 20px rgba(2,15,24,0.5)" }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]">
                    <path d="M9 12l2 2 4-4" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" stroke="#4ADE80" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              <div className="absolute top-[40%] -left-[20px] animate-float" style={{ animationDelay: "1.2s" }}>
                <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center border"
                  style={{ backgroundColor: "rgba(9,49,72,0.92)", backdropFilter: "blur(12px)", borderColor: "rgba(6,148,209,0.3)", boxShadow: "0 4px 20px rgba(2,15,24,0.5)" }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" fill={C.accent} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

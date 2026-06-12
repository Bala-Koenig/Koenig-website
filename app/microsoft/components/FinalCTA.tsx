"use client";
import { useState, useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF", bg: "#041825", bg2: "#051E2D" };

const inclusions = [
  "40+ hours of instructor-led training",
  "15+ hands-on lab exercises",
  "90-day access to recorded sessions",
  "Practice exam with 500+ questions",
  "Digital certification on completion",
  "Lifetime alumni community access",
  "Exam guarantee (free re-training)",
  "Corporate invoice & training letter",
];

const upcomingBatches = [
  { date: "March 25, 2026",  format: "Live Online",       seats: 3,  tag: "Filling Fast", urgent: true  },
  { date: "April 7, 2026",   format: "Live Online",       seats: 8,  tag: "Open",         urgent: false },
  { date: "April 21, 2026",  format: "Bootcamp Weekend",  seats: 12, tag: "Open",         urgent: false },
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formType, setFormType] = useState<"individual" | "enterprise">("individual");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: C.bg }}
        aria-labelledby="cta-heading"
      >
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ backgroundColor: "rgba(6,148,209,0.07)" }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: "rgba(9,49,72,0.5)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero CTA block */}
          <div
            className="animate-on-scroll relative rounded-3xl overflow-hidden border mb-12"
            style={{
              backgroundColor: "rgba(9,49,72,0.5)",
              backdropFilter: "blur(16px)",
              borderColor: "rgba(6,148,209,0.22)",
            }}
          >
            {/* Animated top accent */}
            <div
              className="absolute inset-x-0 top-0 h-0.5"
              style={{
                background: `linear-gradient(90deg, ${C.dark}, ${C.accent}, ${C.light}, ${C.accent}, ${C.dark})`,
                backgroundSize: "300% 100%",
                animation: "borderSlide 4s ease infinite",
              }}
            />

            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(6,148,209,0.05) 0%, transparent 50%, rgba(228,247,255,0.02) 100%)" }}
            />

            <div className="relative p-8 sm:p-12 lg:p-16 grid lg:grid-cols-2 gap-12 items-center">

              {/* Left */}
              <div>
                <span className="section-badge mb-6 inline-flex"><svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px]" style={{ display: "inline-block", verticalAlign: "middle" }}><path d="M12 2C12 2 7 6 7 12c0 2.5.8 4.8 2 6.5L7 22h10l-2-3.5c1.2-1.7 2-4 2-6.5 0-6-5-10-5-10z" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2v6M9 22l1-3M15 22l-1-3" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round"/></svg> Limited Offer — Save 28%</span>
                <h2 id="cta-heading" className="font-heading font-medium text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5" style={{ color: C.light }}>
                  Start Your{" "}
                  <span className="text-shimmer">Power Platform</span>{" "}
                  Journey Today
                </h2>
                <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "rgba(228,247,255,0.58)" }}>
                  Join 40,000+ certified professionals. Get personalized guidance from
                  our course advisors and choose the learning format that fits your schedule.
                </p>

                {/* Inclusions */}
                <div className="grid sm:grid-cols-2 gap-2 mb-8">
                  {inclusions.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm font-body" style={{ color: "rgba(228,247,255,0.7)" }}>
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4ADE80" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="#" className="btn-primary">
                    <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="relative z-10">Enroll Now — Save 28%</span>
                  </a>
                  <a href="#" className="btn-outline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: C.accent }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Talk to an Advisor
                  </a>
                </div>
              </div>

              {/* Right */}
              <div className="space-y-5">
                {/* Upcoming batches */}
                <div>
                  <p className="font-heading font-medium text-base mb-3 flex items-center gap-2" style={{ color: C.light }}>
                    <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#0694D1" strokeWidth="1.5"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round"/></svg> Upcoming Batches
                  </p>
                  <div className="space-y-2.5">
                    {upcomingBatches.map((batch) => (
                      <div
                        key={batch.date}
                        className="flex items-center justify-between p-4 rounded-xl border transition-all duration-200"
                        style={{
                          backgroundColor: "rgba(228,247,255,0.03)",
                          borderColor: batch.urgent ? "rgba(248,113,113,0.2)" : "rgba(6,148,209,0.1)",
                        }}
                      >
                        <div>
                          <p className="font-heading font-medium text-sm" style={{ color: C.light }}>{batch.date}</p>
                          <p className="text-xs font-body" style={{ color: "rgba(228,247,255,0.4)" }}>
                            {batch.format} · {batch.seats} seats left
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-heading font-medium px-2.5 py-1 rounded-full border"
                            style={
                              batch.urgent
                                ? { backgroundColor: "rgba(248,113,113,0.1)", borderColor: "rgba(248,113,113,0.25)", color: "#F87171" }
                                : { backgroundColor: "rgba(74,222,128,0.08)", borderColor: "rgba(74,222,128,0.2)", color: "#4ADE80" }
                            }
                          >
                            {batch.tag}
                          </span>
                          <a href="#" className="text-xs font-heading font-medium transition-colors" style={{ color: C.accent }}>
                            Book →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry form — white card on dark */}
                <div className="rounded-[20px] p-[28px] overflow-hidden" style={{ backgroundColor: "#fff", boxShadow: "0 8px 40px rgba(2,15,24,0.3)" }}>
                  {/* Header */}
                  <div className="text-center mb-[20px]">
                    <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center mx-auto mb-[12px]" style={{ backgroundColor: "rgba(6,148,209,0.1)" }}>
                      <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke={C.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p className="font-heading font-medium text-[18px]" style={{ color: C.dark }}>Get a Free Callback</p>
                    <p className="font-body text-[13px] mt-[4px]" style={{ color: "#94A3B8" }}>We&apos;ll get back to you within 2 hours</p>
                  </div>

                  {/* Individual / Enterprise toggle */}
                  <div className="flex rounded-[10px] p-[3px] mb-[18px]" style={{ backgroundColor: "#F1F5F9" }}>
                    {(["individual", "enterprise"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setFormType(t)}
                        className="flex-1 py-[9px] rounded-[8px] text-[13px] font-heading font-medium transition-all duration-200 capitalize"
                        style={formType === t
                          ? { backgroundColor: C.accent, color: "#fff", boxShadow: "0 2px 8px rgba(6,148,209,0.25)" }
                          : { backgroundColor: "transparent", color: "#64748B" }
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <form className="space-y-[12px]" onSubmit={(e) => e.preventDefault()}>
                    {/* 2-col name + email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                      <input type="text" placeholder="Full Name *"
                        className="w-full px-[14px] py-[12px] rounded-[10px] text-[14px] font-body outline-none transition-all duration-200"
                        style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", color: C.dark }}
                        onFocus={(e) => { e.target.style.borderColor = C.accent; e.target.style.boxShadow = "0 0 0 3px rgba(6,148,209,0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
                      />
                      <input type="email" placeholder="Work Email *"
                        className="w-full px-[14px] py-[12px] rounded-[10px] text-[14px] font-body outline-none transition-all duration-200"
                        style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", color: C.dark }}
                        onFocus={(e) => { e.target.style.borderColor = C.accent; e.target.style.boxShadow = "0 0 0 3px rgba(6,148,209,0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>

                    <input type="tel" placeholder="Phone (with country code) *"
                      className="w-full px-[14px] py-[12px] rounded-[10px] text-[14px] font-body outline-none transition-all duration-200"
                      style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", color: C.dark }}
                      onFocus={(e) => { e.target.style.borderColor = C.accent; e.target.style.boxShadow = "0 0 0 3px rgba(6,148,209,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
                    />

                    {formType === "enterprise" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                        <input type="text" placeholder="Company Name *"
                          className="w-full px-[14px] py-[12px] rounded-[10px] text-[14px] font-body outline-none transition-all duration-200"
                          style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", color: C.dark }}
                          onFocus={(e) => { e.target.style.borderColor = C.accent; e.target.style.boxShadow = "0 0 0 3px rgba(6,148,209,0.1)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
                        />
                        <input type="number" placeholder="No. of Trainees"
                          className="w-full px-[14px] py-[12px] rounded-[10px] text-[14px] font-body outline-none transition-all duration-200"
                          style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", color: C.dark }}
                          onFocus={(e) => { e.target.style.borderColor = C.accent; e.target.style.boxShadow = "0 0 0 3px rgba(6,148,209,0.1)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                    ) : (
                      <select
                        className="w-full px-[14px] py-[12px] rounded-[10px] text-[14px] font-body outline-none transition-all duration-200"
                        style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", color: "#64748B" }}
                        onFocus={(e) => { e.target.style.borderColor = C.accent; e.target.style.boxShadow = "0 0 0 3px rgba(6,148,209,0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
                      >
                        <option value="">Select Certification Track</option>
                        <option>PL-900 — Fundamentals</option>
                        <option>PL-200 — Functional Consultant</option>
                        <option>PL-300 — Data Analyst (Power BI)</option>
                        <option>PL-400 — Developer</option>
                        <option>PL-600 — Solution Architect</option>
                        <option>Full Bundle (All Certifications)</option>
                      </select>
                    )}

                    <button type="submit"
                      className="w-full py-[13px] rounded-[12px] text-[14px] font-heading font-medium text-white transition-all duration-200 hover:-translate-y-[1px]"
                      style={{ backgroundColor: C.accent, boxShadow: "0 4px 16px rgba(6,148,209,0.35)" }}>
                      {formType === "enterprise" ? "Request Enterprise Quote" : "Request Free Callback →"}
                    </button>
                  </form>

                  {/* Trust line */}
                  <div className="flex items-center justify-center gap-[16px] mt-[16px] pt-[14px]" style={{ borderTop: "1px solid #F1F5F9" }}>
                    <div className="flex items-center gap-[6px]">
                      <svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px]"><path d="M12 2L3 7v6c0 5.25 3.83 10.15 9 11.25 5.17-1.1 9-6 9-11.25V7l-9-5z" stroke="#4ADE80" strokeWidth="1.6"/><path d="M9 12l2 2 4-4" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="font-body text-[11px]" style={{ color: "#94A3B8" }}>SSL Secured</span>
                    </div>
                    <div className="w-[1px] h-[12px]" style={{ backgroundColor: "#E2E8F0" }} />
                    <span className="font-body text-[11px]" style={{ color: "#94A3B8" }}>No spam, ever</span>
                    <div className="w-[1px] h-[12px]" style={{ backgroundColor: "#E2E8F0" }} />
                    <span className="font-body text-[11px]" style={{ color: "#94A3B8" }}>2hr response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust line */}
          <div className="animate-on-scroll flex items-center justify-center gap-[10px] mt-[20px]" style={{ transitionDelay: "0.1s" }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]">
              <path d="M12 2L3 7v6c0 5.25 3.83 10.15 9 11.25 5.17-1.1 9-6 9-11.25V7l-9-5z" stroke="#4ADE80" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M9 12l2 2 4-4" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="font-body text-[13px]" style={{ color: "rgba(228,247,255,0.45)" }}>
              Your data is secure with us. We respect your privacy — no spam, ever.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(6,148,209,0.12)" }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${C.accent}, #2BB8F0)` }}
                >
                  <span className="font-heading font-medium text-sm" style={{ color: C.light }}>K</span>
                </div>
                <span className="font-heading font-medium text-lg" style={{ color: C.light }}>Koenig Solutions</span>
              </div>
              <p className="text-sm font-body leading-relaxed max-w-sm" style={{ color: "rgba(228,247,255,0.45)" }}>
                Microsoft Authorized Learning Partner with 25+ years of IT training excellence.
                Trusted by 40,000+ professionals across 150+ countries.
              </p>
            </div>
            <div>
              <p className="font-heading font-medium text-sm mb-4" style={{ color: C.light }}>Quick Links</p>
              <ul className="space-y-2">
                {["Course Overview","Curriculum","Certifications","Corporate Training","FAQ"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm font-body transition-colors" style={{ color: "rgba(228,247,255,0.45)" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.light)}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(228,247,255,0.45)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-heading font-medium text-sm mb-4" style={{ color: C.light }}>Contact</p>
              <ul className="space-y-2 text-sm font-body" style={{ color: "rgba(228,247,255,0.45)" }}>
                <li className="flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px] flex-shrink-0"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#0694D1" strokeWidth="1.5"/><path d="M3 7l9 5 9-5" stroke="#0694D1" strokeWidth="1.5"/></svg> info@koenig-solutions.com</li>
                <li className="flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px] flex-shrink-0"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="#0694D1" strokeWidth="1.5"/></svg> +1 (800) KOENIG-1</li>
                <li className="flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px] flex-shrink-0"><circle cx="12" cy="12" r="10" stroke="#0694D1" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="4" ry="10" stroke="#0694D1" strokeWidth="1.5"/><path d="M2 12h20" stroke="#0694D1" strokeWidth="1.5"/></svg> www.koenig-solutions.com</li>
                <li className="flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px] flex-shrink-0"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#0694D1" strokeWidth="1.5"/><circle cx="12" cy="9" r="2.5" stroke="#0694D1" strokeWidth="1.5"/></svg> Delhi · Dubai · UK · USA</li>
              </ul>
            </div>
          </div>
          <div className="cosmos-divider mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body" style={{ color: "rgba(228,247,255,0.35)" }}>
            <p>© 2026 Koenig Solutions Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-5">
              {["Privacy Policy","Terms of Service","Refund Policy"].map((l) => (
                <a key={l} href="#" className="transition-colors hover:text-white">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

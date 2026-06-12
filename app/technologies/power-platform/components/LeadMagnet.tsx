"use client";
import { useEffect, useRef, useState } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Argentina","Australia","Austria","Bahrain","Bangladesh",
  "Belgium","Brazil","Canada","Chile","China","Colombia","Croatia","Czech Republic","Denmark",
  "Egypt","Ethiopia","Finland","France","Germany","Ghana","Greece","Hong Kong","Hungary",
  "India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Japan","Jordan","Kazakhstan",
  "Kenya","Kuwait","Lebanon","Malaysia","Mexico","Morocco","Netherlands","New Zealand",
  "Nigeria","Norway","Oman","Pakistan","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Saudi Arabia","Singapore","South Africa","South Korea","Spain","Sri Lanka",
  "Sweden","Switzerland","Taiwan","Thailand","Turkey","Ukraine","United Arab Emirates",
  "United Kingdom","United States","Venezuela","Vietnam","Zimbabwe",
];

const cards = [
  {
    title: "Free Demo Class",
    desc: "Experience our teaching methodology with a free 30-minute live demo session led by Microsoft Certified Trainers.",
    cta: "Book Free Demo",
    ctaIcon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-[32px] h-[32px]">
        <rect x="4" y="6" width="32" height="22" rx="3" stroke={C.accent} strokeWidth="1.8" />
        <path d="M4 12h32" stroke={C.accent} strokeWidth="1.8" />
        <circle cx="20" cy="22" r="3" stroke={C.accent} strokeWidth="1.5" />
        <path d="M18.5 21l2 2 2-2" stroke={C.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 32h16" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 28v4M24 28v4" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: C.accent,
    tag: "Live Session",
  },
  {
    title: "Download Syllabus",
    desc: "Get the complete course outline with module details, certification paths, lab exercises, and learning objectives.",
    cta: "Download PDF",
    ctaIcon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-[32px] h-[32px]">
        <path d="M10 6h14l8 8v20a2 2 0 01-2 2H10a2 2 0 01-2-2V8a2 2 0 012-2z" stroke={C.accent} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M24 6v8h8" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 20h12M14 25h8M14 30h10" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "#16A34A",
    tag: "PDF Guide",
  },
  {
    title: "Upcoming Webinar",
    desc: "Join our free Power Platform webinar — live Q&A with Microsoft certified trainers and real-world demos.",
    cta: "Register Free",
    ctaIcon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-[32px] h-[32px]">
        <circle cx="20" cy="20" r="14" stroke={C.accent} strokeWidth="1.8" />
        <path d="M16 15l10 5-10 5V15z" stroke={C.accent} strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="18" stroke={C.accent} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      </svg>
    ),
    accent: "#7C3AED",
    tag: "Live Event",
  },
];

export default function LeadMagnet() {
  const sectionRef = useRef<HTMLElement>(null);
  const [dlForm, setDlForm] = useState({ name: "", email: "", phone: "", country: "" });
  const [dlSubmitted, setDlSubmitted] = useState(false);

  const setDl = (k: keyof typeof dlForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setDlForm(f => ({ ...f, [k]: e.target.value }));

  const fieldStyle: React.CSSProperties = {
    width: "100%", boxSizing: "border-box",
    background: "#F8FBFF", border: "1.5px solid #E0ECF5",
    borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "#374151",
    outline: "none", fontFamily: "inherit", transition: "border-color 0.2s",
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 700, letterSpacing: 0.6,
    color: "#6B7280", textTransform: "uppercase", marginBottom: 4, display: "block",
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
    <section ref={sectionRef} className="py-[60px] bg-white" aria-labelledby="lead-magnet-heading">
      <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px]">

        {/* Header */}
        <div className="animate-on-scroll text-center mb-[40px]">
          <span className="inline-flex items-center gap-[6px] text-[12px] font-heading font-medium uppercase tracking-[0.1em] px-[14px] py-[5px] rounded-full mb-[14px]"
            style={{ backgroundColor: "rgba(6,148,209,0.08)", color: C.accent, border: "1px solid rgba(6,148,209,0.2)" }}>
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{display:'inline',verticalAlign:'middle'}}><rect x="3" y="8" width="18" height="13" rx="2" stroke="#0694D1" strokeWidth="1.8"/><path d="M12 8v13M3 12h18M7.5 8C6.12 8 5 6.88 5 5.5S6.12 3 7.5 3c1.96 0 3.5 2 4.5 5M16.5 8C17.88 8 19 6.88 19 5.5S17.88 3 16.5 3c-1.96 0-3.5 2-4.5 5" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> Free Resources
          </span>
          <h2 id="lead-magnet-heading" className="font-heading font-medium text-[28px] sm:text-[34px] leading-tight mb-[12px]" style={{ color: C.dark }}>
            Get Started with <span className="text-shimmer-dark">Free Resources</span>
          </h2>
          <p className="font-body text-[16px] max-w-[520px] mx-auto" style={{ color: "#6B7280" }}>
            Explore free tools and sessions to begin your certification journey with confidence.
          </p>
        </div>

        {/* Cards */}
        <div className="animate-on-scroll grid sm:grid-cols-3 gap-[20px]" style={{ transitionDelay: "0.06s" }}>
          {cards.map((card, i) => {
            const isDownload = card.title === "Download Syllabus";
            return (
              <div
                key={card.title}
                className="group relative rounded-[18px] p-[28px] border overflow-hidden transition-all duration-300 hover:-translate-y-[4px] flex flex-col"
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#E8EDF2",
                  transitionDelay: `${0.05 * i}s`,
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 20%, ${card.accent}08 0%, transparent 70%)` }} />

                {/* Top: tag + icon */}
                <div className="relative flex items-start justify-between mb-[22px]">
                  <div className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center border group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: "rgba(6,148,209,0.06)", borderColor: "rgba(6,148,209,0.15)" }}>
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-heading font-medium px-[10px] py-[4px] rounded-full"
                    style={{ backgroundColor: `${card.accent}10`, color: card.accent, border: `1px solid ${card.accent}25` }}>
                    {card.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="relative font-heading font-medium text-[18px] mb-[10px]" style={{ color: C.dark }}>
                  {card.title}
                </h3>

                {/* Description */}
                <p className="relative font-body text-[14px] leading-[1.65] mb-[20px]" style={{ color: "#6B7280", flex: isDownload ? "none" : "1" }}>
                  {card.desc}
                </p>

                {/* Download Syllabus inline form */}
                {isDownload ? (
                  dlSubmitted ? (
                    <div className="relative flex flex-col items-center justify-center flex-1 py-[16px] gap-[10px]">
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <p className="font-heading font-medium text-[15px] text-center" style={{ color: C.dark }}>Syllabus Sent!</p>
                      <p className="font-body text-[13px] text-center" style={{ color: "#6B7280" }}>Check your inbox for the PDF.</p>
                      <button onClick={() => { setDlSubmitted(false); setDlForm({ name: "", email: "", phone: "", country: "" }); }}
                        className="font-body text-[12px] underline" style={{ color: C.accent, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                        Submit again
                      </button>
                    </div>
                  ) : (
                    <form
                      className="relative flex flex-col gap-[10px] flex-1"
                      onSubmit={e => { e.preventDefault(); setDlSubmitted(true); }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <div>
                          <label style={fieldLabelStyle}>Name <span style={{ color: "#ef4444" }}>*</span></label>
                          <input style={fieldStyle} type="text" placeholder="John" required value={dlForm.name} onChange={setDl("name")}
                            onFocus={e => (e.target.style.borderColor = C.accent)} onBlur={e => (e.target.style.borderColor = "#E0ECF5")} />
                        </div>
                        <div>
                          <label style={fieldLabelStyle}>Email <span style={{ color: "#ef4444" }}>*</span></label>
                          <input style={fieldStyle} type="email" placeholder="you@email.com" required value={dlForm.email} onChange={setDl("email")}
                            onFocus={e => (e.target.style.borderColor = C.accent)} onBlur={e => (e.target.style.borderColor = "#E0ECF5")} />
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <div>
                          <label style={fieldLabelStyle}>Phone</label>
                          <input style={fieldStyle} type="tel" placeholder="+1 234 567 890" value={dlForm.phone} onChange={setDl("phone")}
                            onFocus={e => (e.target.style.borderColor = C.accent)} onBlur={e => (e.target.style.borderColor = "#E0ECF5")} />
                        </div>
                        <div>
                          <label style={fieldLabelStyle}>Country <span style={{ color: "#ef4444" }}>*</span></label>
                          <select style={{ ...fieldStyle, color: dlForm.country ? "#374151" : "#9CA3AF" }} required value={dlForm.country} onChange={setDl("country")}
                            onFocus={e => (e.target.style.borderColor = C.accent)} onBlur={e => (e.target.style.borderColor = "#E0ECF5")}>
                            <option value="" disabled>Select Country</option>
                            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                      <button type="submit"
                        className="relative inline-flex items-center justify-center gap-[8px] px-[20px] py-[11px] rounded-[10px] text-[13px] font-heading font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-[1px] mt-[4px]"
                        style={{ backgroundColor: card.accent, color: "#fff", border: "none", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 10px rgba(22,163,74,0.2)" }}>
                        {card.ctaIcon}
                        {card.cta}
                        <svg className="w-[12px] h-[12px] ml-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </form>
                  )
                ) : (
                  <>
                    {/* CTA for non-download cards */}
                    <div className="flex-1" />
                    <a
                      href="#contact"
                      className="relative inline-flex items-center gap-[8px] px-[20px] py-[11px] rounded-[10px] text-[13px] font-heading font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-[1px]"
                      style={{ backgroundColor: C.accent, color: "#fff", boxShadow: "0 2px 10px rgba(6,148,209,0.2)" }}
                    >
                      {card.ctaIcon}
                      {card.cta}
                      <svg className="w-[12px] h-[12px] ml-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </>
                )}

                {/* Bottom accent line on hover */}
                <div className="absolute inset-x-0 bottom-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${card.accent}, ${C.accent})` }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

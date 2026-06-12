"use client";
import { useState } from "react";

const COURSES = [
  "PL-900: Power Platform Fundamentals",
  "PL-200: Power Platform Functional Consultant",
  "PL-300: Power BI Data Analyst",
  "PL-400: Power Platform Developer",
  "PL-600: Power Platform Solution Architect",
  "PL-100: Power Apps App Maker",
  "AZ-900: Azure Fundamentals",
  "AZ-104: Azure Administrator",
  "DP-900: Azure Data Fundamentals",
  "AI-900: Azure AI Fundamentals",
  "MS-900: Microsoft 365 Fundamentals",
  "SC-900: Security, Compliance & Identity Fundamentals",
];

export default function CourseLeadForm() {
  const [tab,       setTab]       = useState<"individual" | "enterprise">("individual");
  const [captcha,   setCaptcha]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", trainees: "", source: "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle: React.CSSProperties = {
    width: "100%", boxSizing: "border-box",
    background: "rgba(6,148,209,0.07)", border: "1.5px solid rgba(6,148,209,0.25)",
    borderRadius: 10, padding: "11px 14px", fontSize: 13.5, color: "#fff",
    outline: "none", fontFamily: "inherit", transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 10, fontWeight: 800, letterSpacing: 0.8,
    color: "rgba(255,255,255,0.55)", textTransform: "uppercase",
    marginBottom: 5, display: "block",
  };

  return (
    <section style={{ background: "#070d14", padding: "30px 16px" }}>
      <style>{`
        .clf-container { padding: 40px 48px; }
        .clf-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .clf-contact-row { display: flex; gap: 10px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap; }
        @media (max-width: 700px) {
          .clf-container { padding: 24px 16px; max-width: 100% !important; }
          .clf-form-grid { grid-template-columns: 1fr; }
          .clf-contact-row { flex-direction: row; justify-content: center; gap: 8px; flex-wrap: nowrap; }
          .clf-contact-row button { justify-content: center; flex: 1; white-space: nowrap; padding: 9px 14px; font-size: 13px; }
        }
        @media (max-width: 375px) {
          .clf-container { padding: 18px 16px; }
        }
      `}</style>
      <div className="clf-container" style={{ maxWidth: 760, margin: "0 auto", background: "linear-gradient(160deg,#0d1f2e 0%,#091525 100%)", border: "1px solid rgba(6,148,209,0.22)", borderRadius: 20, boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(6,148,209,0.18)", border: "1px solid rgba(6,148,209,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Request Received!</h3>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
              {tab === "enterprise" ? "Our enterprise team will reach out within 1 business day." : "Your certification advisor will be in touch within 2 hours."}
            </p>
            <button onClick={() => { setSubmitted(false); setCaptcha(false); setForm({ name: "", email: "", phone: "", course: "", trainees: "", source: "", message: "" }); }}
              style={{ background: "rgba(6,148,209,0.25)", border: "1px solid rgba(6,148,209,0.4)", borderRadius: 12, padding: "10px 32px", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>
              Submit Another
            </button>
          </div>
        ) : (
          <>
            {/* Badge */}
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <span style={{ display: "inline-block", padding: "5px 18px", borderRadius: 999, border: "1.5px solid rgba(6,148,209,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#4DBFEF", textTransform: "uppercase" }}>
                Let&apos;s Talk
              </span>
            </div>

            {/* Title */}
            <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 800, textAlign: "center", margin: "0 0 6px", lineHeight: 1.3 }}>
              Request for more <span style={{ color: "#0694D1" }}>information</span>
            </h2>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 20 }}>
              Microsoft Certification Training with Koenig Solutions
            </p>

            {/* Contact shortcuts */}
            <div className="clf-contact-row">
              {[
                { label: "WhatsApp us", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
                { label: "Email us", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
              ].map(btn => (
                <button key={btn.label} type="button" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 20px", borderRadius: 8, border: "1px solid rgba(6,148,209,0.35)", background: "rgba(6,148,209,0.1)", color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  {btn.icon}{btn.label}
                </button>
              ))}
            </div>

            {/* Individual / Enterprise toggle */}
            <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 10, padding: 4, gap: 4, marginBottom: 20 }}>
              {(["individual", "enterprise"] as const).map(t => (
                <button key={t} type="button" onClick={() => setTab(t)} style={{ flex: 1, padding: "10px 0", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .2s", background: tab === t ? "#0694D1" : "transparent", color: tab === t ? "#fff" : "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                  {t === "individual"
                    ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Individual</>
                    : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>Enterprise</>
                  }
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={e => { e.preventDefault(); if (!captcha) return; setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="clf-form-grid">
                <div>
                  <label style={labelStyle}>Full Name <span style={{ color: "#ef4444" }}>*</span></label>
                  <input style={inputStyle} type="text" placeholder="John" required value={form.name} onChange={set("name")}
                    onFocus={e => (e.target.style.borderColor = "#0694D1")} onBlur={e => (e.target.style.borderColor = "rgba(6,148,209,0.25)")} />
                </div>
                <div>
                  <label style={labelStyle}>{tab === "enterprise" ? "Business Email" : "Personal Email"} <span style={{ color: "#ef4444" }}>*</span></label>
                  <input style={inputStyle} type="email" placeholder={tab === "enterprise" ? "john@example.com" : "you@example.com"} required value={form.email} onChange={set("email")}
                    onFocus={e => (e.target.style.borderColor = "#0694D1")} onBlur={e => (e.target.style.borderColor = "rgba(6,148,209,0.25)")} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input style={inputStyle} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")}
                    onFocus={e => (e.target.style.borderColor = "#0694D1")} onBlur={e => (e.target.style.borderColor = "rgba(6,148,209,0.25)")} />
                </div>
                <div>
                  {tab === "enterprise" ? (
                    <>
                      <label style={labelStyle}>Number of Trainees</label>
                      <input style={inputStyle} type="number" min="1" placeholder="e.g. 25" value={form.trainees} onChange={set("trainees")}
                        onFocus={e => (e.target.style.borderColor = "#0694D1")} onBlur={e => (e.target.style.borderColor = "rgba(6,148,209,0.25)")} />
                    </>
                  ) : (
                    <>
                      <label style={labelStyle}>Select Course Name</label>
                      <select style={{ ...inputStyle, color: form.course ? "#fff" : "rgba(255,255,255,0.4)" }} value={form.course} onChange={set("course")}
                        onFocus={e => (e.target.style.borderColor = "#0694D1")} onBlur={e => (e.target.style.borderColor = "rgba(6,148,209,0.25)")}>
                        <option value="" style={{ background: "#0d2d47", color: "#c8d8e8" }}>Microsoft Certification Training</option>
                        {COURSES.map(c => <option key={c} value={c} style={{ background: "#0d2d47", color: "#c8d8e8" }}>{c}</option>)}
                      </select>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label style={labelStyle}>How did you hear about us?</label>
                <select style={{ ...inputStyle, width: "100%", color: form.source ? "#fff" : "rgba(255,255,255,0.4)" }} value={form.source} onChange={set("source")}
                  onFocus={e => (e.target.style.borderColor = "#0694D1")} onBlur={e => (e.target.style.borderColor = "rgba(6,148,209,0.25)")}>
                  <option value="" style={{ background: "#0d2d47" }}>Select Option</option>
                  {["Google Search","Social Media","LinkedIn","Colleague / Referral","Email Newsletter","Microsoft Event","Other"].map(o => (
                    <option key={o} value={o} style={{ background: "#0d2d47", color: "#c8d8e8" }}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Tell us about your Training Needs</label>
                <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                  placeholder="Share your training goals, preferred schedule, team size, or any specific topics you'd like us to cover..."
                  value={form.message}
                  onChange={set("message")}
                  onFocus={e => (e.target.style.borderColor = "#0694D1")}
                  onBlur={e => (e.target.style.borderColor = "rgba(6,148,209,0.25)")}
                />
              </div>

              {/* reCAPTCHA */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div onClick={() => setCaptcha(c => !c)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 4, border: `1.5px solid ${captcha ? "#0694D1" : "rgba(255,255,255,0.18)"}`, background: "rgba(255,255,255,0.04)", width: 220, height: 44, cursor: "pointer" }}>
                  <div style={{ width: 18, height: 18, borderRadius: 3, border: `2px solid ${captcha ? "#0694D1" : "rgba(255,255,255,0.55)"}`, background: captcha ? "#0694D1" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}>
                    {captcha && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500, flex: 1 }}>I&apos;m not a robot</span>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, flexShrink: 0 }}>
                    <img decoding="async" loading="lazy" src="https://www.gstatic.com/recaptcha/api2/logo_48.png" width="24" height="24" alt="reCAPTCHA" style={{ display: "block" }} />
                    <span style={{ fontSize: 7, color: "rgba(255,255,255,0.4)", letterSpacing: "0.03em", lineHeight: 1 }}>reCAPTCHA</span>
                    <span style={{ fontSize: 6, color: "rgba(255,255,255,0.25)", lineHeight: 1 }}>Privacy - Terms</span>
                  </div>
                </div>
              </div>

              <button type="submit" style={{ width: "100%", padding: "14px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#0694D1,#076D9D)", border: "none", cursor: captcha ? "pointer" : "not-allowed", fontFamily: "inherit", boxShadow: "0 4px 20px rgba(6,148,209,0.40)", opacity: captcha ? 1 : 0.6, transition: "opacity .2s" }}>
                Submit — Get a Free Consultation
              </button>

              <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.30)", margin: 0 }}>
                We&apos;ll respond within 1 business day · No spam, ever.
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

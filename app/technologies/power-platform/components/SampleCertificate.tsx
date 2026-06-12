"use client";
import { useState, useRef, useEffect } from "react";

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

const BADGES = [
  { code: "AZ-900", name: "Azure Fundamentals",         img: "https://images.credly.com/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",  fallback: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg" },
  { code: "AZ-104", name: "Azure Administrator",        img: "https://images.credly.com/images/336eebfc-0ac3-4583-8d47-fb19e3b81b3b/image.png",  fallback: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg" },
  { code: "AI-102", name: "Azure AI Engineer",          img: "https://images.credly.com/images/61f56aa4-16fd-403c-90bc-1d90dba1fa99/image.png",  fallback: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg" },
  { code: "SC-300", name: "Identity & Access Admin",    img: "https://images.credly.com/images/91295436-0704-4b98-8e1a-ef5f937bda21/image.png",  fallback: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg" },
  { code: "AZ-305", name: "Solutions Architect Expert", img: "https://images.credly.com/images/987adb7e-49be-4e24-b67e-55986bd3fe66/image.png",  fallback: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-expert-badge.svg" },
  { code: "PL-300", name: "Power BI Data Analyst",      img: "https://images.credly.com/images/7d2c174d-e86d-4cb3-9aea-e41b74a2d1ba/image.png",  fallback: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg" },
];

export default function SampleCertificate() {
  const [modalOpen,  setModalOpen]  = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [name,       setName]       = useState("");
  const [email,      setEmail]      = useState("");
  const [country,    setCountry]    = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCountryOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const close = () => { setModalOpen(false); setSubmitted(false); setName(""); setEmail(""); setCountry(""); setCountryOpen(false); };

  return (
    <>
      <style suppressHydrationWarning>{`
        .sc-sec { background:#EBF8FE; padding:30px 16px; position:relative; overflow:hidden; border-top:1px solid #CAEFFF; border-bottom:1px solid #CAEFFF; }
        .sc-sec::before { content:''; position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse 800px 500px at 65% 50%, rgba(6,148,209,0.08), transparent 60%); }
        .sc-inner { max-width:1200px; margin:0 auto; display:flex; align-items:center; gap:64px; position:relative; z-index:1; }
        .sc-left { flex:1; min-width:0; }
        .sc-right { flex-shrink:0; width:min(480px,100%); display:flex; align-items:center; justify-content:center; }

        .sc-label { font-size:12px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:${C.accent}; margin-bottom:15px; display:flex; align-items:center; gap:6px; }
        .sc-title { font-family:'GTWalsheimPro-Medium',sans-serif; font-size:clamp(22px,2.4vw,32px); color:${C.dark}; line-height:1.3; margin-bottom:15px; }
        .sc-title em { font-style:normal; color:${C.accent}; }
        .sc-desc { font-size:16px; color:#4B5563; line-height:1.7; margin-bottom:15px; max-width:460px; }

        .sc-badges-label { font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#6B7280; margin-bottom:15px; }
        .sc-badges-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:15px; }
        .sc-badge-item { display:flex; flex-direction:column; align-items:center; gap:7px; background:#fff; border:1px solid rgba(6,148,209,0.15); border-radius:12px; padding:14px 8px 10px; transition:transform 0.2s,box-shadow 0.2s,border-color 0.2s; text-decoration:none; cursor:pointer; }
        .sc-badge-item:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(6,148,209,0.15); border-color:rgba(6,148,209,0.35); }
        .sc-badge-img { width:64px; height:64px; object-fit:contain; display:block; }
        .sc-badge-code { font-size:10px; font-weight:700; color:${C.accent}; letter-spacing:0.5px; text-align:center; }
        .sc-badge-name { font-size:9.5px; color:#6B7280; text-align:center; line-height:1.3; }
        .sc-linkedin-note { margin-top:10px; font-size:11px; color:#6B7280; display:flex; align-items:center; gap:6px; }

        /* Certificate preview */
        .sc-cert-wrap { position:relative; width:100%; }
        .sc-cert-wrap::before { content:''; position:absolute; inset:-4px; border-radius:17px; background:linear-gradient(135deg,rgba(6,148,209,0.35),rgba(6,148,209,0.05)); z-index:-1; }
        .sc-cert-real-img { width:100%; display:block; border-radius:14px; box-shadow:0 24px 64px rgba(6,148,209,0.18),0 4px 16px rgba(0,0,0,0.12); border:1px solid rgba(6,148,209,0.2); }

        .sc-blur-overlay { position:absolute; inset:0; border-radius:14px; background:rgba(4,14,24,0.52); backdrop-filter:blur(5px); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; }
        .sc-unlock-lbl { font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.4); }
        .sc-unlock-btn { display:inline-flex; align-items:center; gap:10px; background:${C.accent}; color:#fff; font-family:inherit; font-size:14px; font-weight:700; padding:13px 28px; border-radius:10px; border:none; cursor:pointer; box-shadow:0 4px 16px rgba(6,148,209,0.35); transition:background 0.2s,transform 0.2s,box-shadow 0.2s; }
        .sc-unlock-btn:hover { background:#057ab5; transform:translateY(-1px); box-shadow:0 8px 24px rgba(6,148,209,0.45); }
        .sc-unlock-note { font-size:11px; color:rgba(255,255,255,0.28); text-align:center; }

        /* Modal */
        .sc-overlay { position:fixed; inset:0; background:rgba(4,24,37,0.65); backdrop-filter:blur(4px); z-index:9998; }
        .sc-modal-wrap { position:fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center; padding:16px; }

        @media(max-width:992px) {
          .sc-inner { gap:40px; }
          .sc-right { width:min(420px,100%); }
          .sc-title { font-size:clamp(20px,2.2vw,28px); }
        }
        @media(max-width:900px) {
          .sc-sec { padding:18px 16px; }
          .sc-inner { flex-direction:column; gap:40px; }
          .sc-right { width:100%; }
        }
        @media(max-width:768px) {
          .sc-sec { padding:18px 16px; }
          .sc-inner { flex-direction:column; gap:32px; }
          .sc-right { width:100%; }
          .sc-title { font-size:clamp(18px,4vw,24px); }
          .sc-desc { font-size:15px; }
        }
        @media(max-width:700px) {
          .sc-badges-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media(max-width:600px) {
          .sc-sec { padding:40px 16px; }
        }
        @media(max-width:375px) {
          .sc-badges-grid { grid-template-columns:repeat(auto-fit,minmax(100px,1fr)); }
          .sc-title { font-size:18px; }
          .sc-desc { font-size:14px; }
        }
      `}</style>

      <section className="sc-sec" aria-labelledby="sc-heading">
        <div className="sc-inner">

          {/* LEFT */}
          <div className="sc-left">
            <div className="sc-label">
              <svg width="10" height="10" viewBox="0 0 24 24" fill={C.accent}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Sample Certificate
            </div>
            <h2 id="sc-heading" className="sc-title">
              Your Microsoft <em>Certification</em> Awaits
            </h2>
            <p className="sc-desc">
              See what your official Microsoft certification looks like. Download a sample — then let our advisors map the fastest path to earning the real one.
            </p>

            <p className="sc-badges-label">Earn these official Credly badges</p>
            <div className="sc-badges-grid">
              {BADGES.map(b => (
                <a key={b.code} className="sc-badge-item" href="https://learn.microsoft.com/en-us/credentials/certifications/" target="_blank" rel="noopener noreferrer" title={`${b.code} — ${b.name}`}>
                  <img src={b.img} alt={`Microsoft ${b.name} (${b.code}) badge`} className="sc-badge-img" loading="lazy" decoding="async"
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = b.fallback; }} />
                  <span className="sc-badge-code">{b.code}</span>
                  <span className="sc-badge-name">{b.name}</span>
                </a>
              ))}
            </div>

            <div className="sc-linkedin-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Official Microsoft credential badges — shareable on LinkedIn
            </div>
          </div>

          {/* RIGHT — real certificate image */}
          <div className="sc-right">
            <div className="sc-cert-wrap">
              <img
                src="/koenig-sample-cert.webp"
                alt="Sample Microsoft Power Platform certification issued by Koenig Solutions"
                className="sc-cert-real-img"
                loading="lazy"
                decoding="async"
              />

              {/* Blur overlay */}
              <div className="sc-blur-overlay">
                <div className="sc-unlock-lbl">🔒 Fill your details to unlock</div>
                <button className="sc-unlock-btn" onClick={() => setModalOpen(true)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Sample Certificate
                </button>
                <div className="sc-unlock-note">Free · No credit card · Instant download</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <>
          <div className="sc-overlay" onClick={close} />
          <div className="sc-modal-wrap">
            <div style={{ background:"linear-gradient(160deg,#062238 0%,#093148 100%)", borderRadius:20, padding:"32px 28px 28px", width:"100%", maxWidth:440, position:"relative", boxShadow:"0 24px 60px rgba(0,0,0,0.5)", fontFamily:"inherit", animation:"sylSlideIn 0.3s cubic-bezier(0.25,1,0.5,1)" }}>
              <button onClick={close} style={{ position:"absolute", top:14, right:14, width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"none", color:"#fff", fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>

              {submitted ? (
                <div style={{ textAlign:"center", padding:"12px 0 4px" }}>
                  <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(6,148,209,0.15)", border:"1.5px solid rgba(6,148,209,0.4)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ fontSize:19, fontWeight:800, color:"#fff", marginBottom:8, lineHeight:1.25 }}>You&apos;re all set, {name.split(" ")[0]}!</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", lineHeight:1.65, marginBottom:20 }}>
                    Your sample certificate will be sent to <strong style={{ color:"#fff" }}>{email}</strong> shortly.
                  </div>
                  <div style={{ background:"rgba(6,148,209,0.08)", border:"1px solid rgba(6,148,209,0.2)", borderRadius:10, padding:"10px 14px", fontSize:12, color:"rgba(255,255,255,0.5)", display:"flex", alignItems:"center", gap:8, justifyContent:"center", marginBottom:16 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Check your inbox — usually arrives within 2 minutes
                  </div>
                  <button onClick={close} style={{ width:"100%", padding:11, borderRadius:10, border:"1px solid rgba(6,148,209,0.35)", background:"transparent", color:C.accent, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                    <span style={{ width:7, height:7, borderRadius:"50%", background:C.accent, display:"inline-block", flexShrink:0 }}/>
                    <span style={{ fontSize:10, fontWeight:800, letterSpacing:1.2, color:C.accent, textTransform:"uppercase" }}>Download Certificate</span>
                  </div>
                  <div style={{ fontSize:22, fontWeight:800, color:"#fff", lineHeight:1.2, marginBottom:6 }}>Get the Sample Certificate</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:22 }}>Fill in your details and we&apos;ll send it straight to your inbox.</div>

                  <form onSubmit={e => { e.preventDefault(); if (!country) return; setSubmitted(true); }} style={{ display:"flex", flexDirection:"column", gap:14 }}>
                    <div>
                      <label style={{ fontSize:10, fontWeight:800, letterSpacing:0.8, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", marginBottom:5, display:"block" }}>Full Name <span style={{ color:"#ef4444" }}>*</span></label>
                      <input required placeholder="John" value={name} onChange={e => setName(e.target.value)}
                        style={{ width:"100%", boxSizing:"border-box", background:"rgba(6,148,209,0.08)", border:"1.5px solid rgba(6,148,209,0.3)", borderRadius:10, padding:"11px 14px", fontSize:13.5, color:"#fff", outline:"none", fontFamily:"inherit", transition:"border-color 0.2s" }}
                        onFocus={e => (e.target.style.borderColor=C.accent)} onBlur={e => (e.target.style.borderColor="rgba(6,148,209,0.3)")} />
                    </div>
                    <div>
                      <label style={{ fontSize:10, fontWeight:800, letterSpacing:0.8, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", marginBottom:5, display:"block" }}>Email Address <span style={{ color:"#ef4444" }}>*</span></label>
                      <input required type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
                        style={{ width:"100%", boxSizing:"border-box", background:"rgba(6,148,209,0.08)", border:"1.5px solid rgba(6,148,209,0.3)", borderRadius:10, padding:"11px 14px", fontSize:13.5, color:"#fff", outline:"none", fontFamily:"inherit", transition:"border-color 0.2s" }}
                        onFocus={e => (e.target.style.borderColor=C.accent)} onBlur={e => (e.target.style.borderColor="rgba(6,148,209,0.3)")} />
                    </div>
                    <div>
                      <label style={{ fontSize:10, fontWeight:800, letterSpacing:0.8, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", marginBottom:5, display:"block" }}>Country <span style={{ color:"#ef4444" }}>*</span></label>
                      <div ref={countryRef} style={{ position:"relative" }}>
                        <button type="button" onClick={() => setCountryOpen(o => !o)}
                          style={{ width:"100%", boxSizing:"border-box", display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(6,148,209,0.08)", border:`1.5px solid ${countryOpen ? C.accent : "rgba(6,148,209,0.3)"}`, borderRadius:10, padding:"11px 14px", fontSize:13.5, color: country ? "#fff" : "rgba(255,255,255,0.4)", cursor:"pointer", fontFamily:"inherit", outline:"none" }}>
                          {country || "Select your country"}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: countryOpen ? "rotate(180deg)" : "none", transition:"transform 0.2s", flexShrink:0 }}><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                        {countryOpen && (
                          <div style={{ position:"absolute", bottom:"calc(100% + 4px)", left:0, right:0, zIndex:10000, background:"#0d2535", border:"1.5px solid rgba(6,148,209,0.35)", borderRadius:10, maxHeight:420, overflowY:"auto", overscrollBehavior:"contain", boxShadow:"0 -8px 32px rgba(0,0,0,0.6)" }}>
                            <div style={{ padding:"9px 14px", fontSize:13.5, color:"rgba(255,255,255,0.35)", cursor:"default", borderBottom:"1px solid rgba(6,148,209,0.15)" }}>Select your country</div>
                            {COUNTRIES.map(c => (
                              <div key={c} onClick={() => { setCountry(c); setCountryOpen(false); }}
                                style={{ padding:"9px 14px", fontSize:13.5, cursor:"pointer", color: country === c ? "#fff" : "#c8dce9", background: country === c ? "#1a5fa8" : "transparent", transition:"background 0.12s" }}
                                onMouseEnter={e => { if (country !== c) e.currentTarget.style.background="rgba(6,148,209,0.18)"; }}
                                onMouseLeave={e => { if (country !== c) e.currentTarget.style.background="transparent"; }}>
                                {c}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      <span style={{ fontSize:12, color:"rgba(255,255,255,0.45)" }}>Sample certificate will be sent to your email ID</span>
                    </div>

                    <button type="submit" style={{ width:"100%", padding:13, borderRadius:10, border:"none", cursor:"pointer", background:`linear-gradient(135deg,${C.accent},#0577ab)`, color:"#fff", fontSize:14, fontWeight:700, fontFamily:"inherit", letterSpacing:0.2, boxShadow:"0 4px 18px rgba(6,148,209,0.4)", marginTop:2, transition:"filter 0.18s" }}
                      onMouseEnter={e => (e.currentTarget.style.filter="brightness(1.12)")} onMouseLeave={e => (e.currentTarget.style.filter="none")}>
                      Download Sample Certificate →
                    </button>
                    <div style={{ textAlign:"center", fontSize:11, color:"rgba(255,255,255,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      Free · No credit card · Instant download
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

"use client";
import { useState, useEffect, useRef } from "react";

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

const BATCHES = [
  { name: "Power Platform Fundamentals",          code: "PL-900", level: "fund",   date: "Mar 17, 2026", days: 2, seats: 4, hot: true  },
  { name: "Power Platform Functional Consultant", code: "PL-200", level: "assoc",  date: "Mar 24, 2026", days: 5, seats: 6, hot: false },
  { name: "Power BI Data Analyst",                code: "PL-300", level: "assoc",  date: "Mar 31, 2026", days: 4, seats: 2, hot: true  },
  { name: "Power Platform Developer",             code: "PL-400", level: "assoc",  date: "Apr 7, 2026",  days: 5, seats: 8, hot: true  },
  { name: "Power Platform Solution Architect",    code: "PL-600", level: "expert", date: "Apr 14, 2026", days: 5, seats: 3, hot: false },
  { name: "Power Apps App Maker Associate",       code: "PL-100", level: "assoc",  date: "Apr 21, 2026", days: 3, seats: 7, hot: false },
];

const LEVEL_ICON: Record<string, JSX.Element> = {
  fund:   <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M5 3a7 7 0 0 0 7 7 7 7 0 0 0 7-7"/></svg>,
  assoc:  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
  expert: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7l4 9h12l4-9-6 4-4-6-4 6z"/></svg>,
};

const LEVEL_LABEL: Record<string, string> = {
  fund: "Fundamentals",
  assoc: "Associate",
  expert: "Expert",
};

function BatchCard({ b, onSyllabus }: { b: typeof BATCHES[0]; onSyllabus: () => void }) {
  const urgent = b.seats <= 3;
  return (
    <div className="ub-batch-card">
      {b.hot && (
        <span className="ub-cert-hot-badge">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 2c0 0-5.5 6-5.5 10.5a5.5 5.5 0 0 0 11 0C17.5 8 12 2 12 2zm0 14a3 3 0 0 1-3-3c0-2.5 3-6 3-6s3 3.5 3 6a3 3 0 0 1-3 3z" />
          </svg>
          Popular
        </span>
      )}

      {/* Level badge — absolute top left, seats — absolute top center */}
      <span className={`ub-cert-badge ${b.level}`} style={{ position: "absolute", top: 12, left: 12 }}>
        {LEVEL_ICON[b.level]}&nbsp;{LEVEL_LABEL[b.level]}
      </span>
      <span
        className={`ub-batch-seats ${urgent ? "ub-batch-seats-low" : "ub-batch-seats-ok"}`}
        style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", ...(urgent ? { animation: "ub-pulse 1.5s infinite" } : {}) }}
      >
        {b.seats} seats left
      </span>

      <div className="ub-batch-name" style={{ marginTop: 28 }}>{b.name}</div>

      <div className="ub-batch-meta">
        <span className="ub-batch-meta-item">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {b.date}
        </span>
        <span>·</span>
        <span className="ub-batch-meta-item">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          {b.days * 8} Hrs ({b.days} days)
        </span>
      </div>

      <div className="ub-batch-footer">
        <button className="ub-btn-syllabus" onClick={onSyllabus}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Syllabus
        </button>
        <span className="ub-btn-view-course">View Course</span>
      </div>
    </div>
  );
}

const INITIAL_SHOW = 4;

export default function UpcomingBatches() {
  const [showAll,      setShowAll]      = useState(false);
  const [sylOpen,      setSylOpen]      = useState(false);
  const [sylSubmitted, setSylSubmitted] = useState(false);
  const [sylName,      setSylName]      = useState("");
  const [sylEmail,     setSylEmail]     = useState("");
  const [sylCourse,    setSylCourse]    = useState("");
  const [sylCountry,     setSylCountry]     = useState("");
  const [sylCountryOpen, setSylCountryOpen] = useState(false);
  const sylCountryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sylCountryRef.current && !sylCountryRef.current.contains(e.target as Node)) {
        setSylCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openSyl  = (course: string) => { setSylCourse(course); setSylOpen(true); };
  const closeSyl = () => { setSylOpen(false); setSylSubmitted(false); setSylName(""); setSylEmail(""); setSylCourse(""); setSylCountry(""); };

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes ub-pulse { 0%,100%{opacity:1} 50%{opacity:0.55} }
        @keyframes ub-sylSlideIn { from{opacity:0;transform:translate(-50%,-48%) scale(0.96)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }

        .ub-batches-sec { background:#EBF8FE; padding:30px 16px; border-top:1px solid #CAEFFF; position:relative; overflow:hidden; }
        .ub-batches-sec::before { content:''; position:absolute; top:-100px; right:-80px; width:380px; height:380px; background:radial-gradient(circle,rgba(6,148,209,0.2) 0%,transparent 70%); border-radius:50%; pointer-events:none; }
        .ub-batches-sec::after  { content:''; position:absolute; bottom:-64px; left:25%; width:300px; height:300px; background:radial-gradient(circle,rgba(77,191,239,0.18) 0%,transparent 70%); border-radius:50%; pointer-events:none; }
        .ub-batches-inner { max-width:1120px; margin:0 auto; position:relative; z-index:1; }
        .ub-batches-hd { display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:15px; margin-bottom:15px; }
        .ub-batches-eyebrow { display:inline-block; background:rgba(6,148,209,0.1); color:#0694D1; font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; padding:6px 16px; border-radius:20px; margin-bottom:15px; }
        .ub-batches-h2 { font-size:clamp(20px,2.4vw,30px); font-weight:800; color:#071e2e; line-height:1.2; margin:0 0 15px; }
        .ub-batches-h2 em { font-style:normal; background:linear-gradient(90deg,#0694D1,#38bdf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .ub-batches-sub { font-size:13px; color:#5a7a90; margin:0; }
        .ub-batches-view-all { display:inline-flex; align-items:center; gap:10px; padding:12px 24px; background:linear-gradient(135deg,#093148,#076D9D); border:none; border-radius:14px; color:#fff; font-size:13px; font-weight:700; cursor:pointer; font-family:inherit; transition:transform 0.2s,box-shadow 0.2s; align-self:flex-end; flex-shrink:0; }
        .ub-batches-view-all:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(9,49,72,0.3); }
        .ub-batches-view-all-arrow { width:24px; height:24px; border-radius:50%; background:rgba(255,255,255,0.18); display:flex; align-items:center; justify-content:center; font-size:13px; transition:transform 0.2s; }
        .ub-batches-view-all:hover .ub-batches-view-all-arrow { transform:translateX(3px); }
        .ub-batches-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:15px; }

        .ub-batch-card { background:#fff; border:1px solid #CAEFFF; border-radius:12px; padding:20px; cursor:pointer; transition:transform 0.3s,box-shadow 0.3s; box-shadow:0 4px 16px rgba(0,164,239,0.10); position:relative; }
        .ub-batch-card:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(6,148,209,0.15); }
        .ub-batch-card-row1 { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
        .ub-batch-badges { display:flex; align-items:center; gap:8px; }

        .ub-cert-hot-badge { position:absolute; top:0; right:0; display:inline-flex; align-items:center; gap:4px; height:20px; font-size:9px; font-weight:800; letter-spacing:0.5px; text-transform:uppercase; padding:0 10px 0 8px; border-radius:0 12px 0 10px; background:linear-gradient(135deg,#0694D1,#22d3ee); color:#fff; border:none; flex-shrink:0; box-shadow:-2px 2px 8px rgba(6,148,209,0.28); z-index:2; }

        .ub-cert-badge { display:inline-flex; align-items:center; gap:3px; font-size:10px; font-weight:800; letter-spacing:0.6px; text-transform:uppercase; padding:3px 9px 3px 7px; border-radius:20px; width:fit-content; border:none; line-height:1; }
        .ub-cert-badge.fund   { background:linear-gradient(135deg,#4DBFEF,#0694D1); color:#fff; box-shadow:0 2px 8px rgba(6,148,209,0.25); }
        .ub-cert-badge.assoc  { background:linear-gradient(135deg,#0694D1,#076D9D); color:#fff; box-shadow:0 2px 8px rgba(6,108,157,0.3); }
        .ub-cert-badge.expert { background:linear-gradient(135deg,#076D9D,#062238); color:#fff; box-shadow:0 2px 8px rgba(6,34,56,0.35); }

        .ub-batch-seats { font-size:11px; font-weight:500; padding:2px 8px; border-radius:20px; }
        .ub-batch-seats-low { background:rgba(239,68,68,0.06); color:#dc2626; }
        .ub-batch-seats-ok  { background:rgba(34,197,94,0.08); color:#16a34a; }

        .ub-batch-name { font-size:14px; font-weight:600; color:#071e2e; margin-bottom:6px; line-height:1.35; transition:color 0.2s; }
        .ub-batch-card:hover .ub-batch-name { color:#0694D1; }

        .ub-batch-meta { display:flex; align-items:center; gap:6px; flex-wrap:wrap; font-size:12px; color:#5a7a90; margin-bottom:12px; }
        .ub-batch-meta-item { display:flex; align-items:center; gap:3px; }

        .ub-batch-footer { display:flex; align-items:center; gap:8px; border-top:1px solid #CAEFFF; padding-top:12px; }
        .ub-btn-syllabus { flex:1; display:inline-flex; align-items:center; justify-content:center; gap:4px; padding:8px 12px; border-radius:8px; font-size:12px; font-weight:700; background:transparent; color:#0694D1; border:1.5px solid #0694D1; cursor:pointer; transition:background 0.18s; white-space:nowrap; font-family:inherit; }
        .ub-btn-syllabus:hover { background:rgba(6,148,209,0.07); }
        .ub-btn-view-course { flex:1; display:inline-flex; align-items:center; justify-content:center; padding:8px 12px; border-radius:8px; font-size:12px; font-weight:700; background:linear-gradient(135deg,#076D9D,#062238); color:#fff; border:none; cursor:pointer; transition:filter 0.2s,box-shadow 0.2s; white-space:nowrap; font-family:inherit; box-shadow:0 2px 8px rgba(9,49,72,0.3); }
        .ub-btn-view-course:hover { filter:brightness(1.12); box-shadow:0 4px 14px rgba(9,49,72,0.35); }

        .ub-view-more-btn { display:flex; align-items:center; justify-content:center; gap:6px; margin:24px auto 0; padding:0; background:none; border:none; color:#0694D1; font-size:14px; font-weight:600; cursor:pointer; font-family:inherit; text-decoration:underline; text-underline-offset:3px; transition:color 0.18s; }
        .ub-view-more-btn:hover { color:#046fa3; }
        @media(max-width:1100px) { .ub-batches-grid{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:700px) { .ub-batches-sec{padding:18px 16px} }
        @media(max-width:600px) { .ub-batches-sec{padding:18px 16px} .ub-batches-grid{grid-template-columns:1fr} .ub-batches-hd{flex-direction:column;gap:15px} .ub-batch-footer{flex-wrap:wrap} }
      `}</style>

      <section className="ub-batches-sec">
        <div className="ub-batches-inner">
          <div className="ub-batches-hd">
            <div>
              <div className="ub-batches-eyebrow">Guaranteed Schedules</div>
              <h2 className="ub-batches-h2">Upcoming Batches — <em>March 2026</em></h2>
              <p className="ub-batches-sub">Every batch listed here is guaranteed to run. No cancellations.</p>
            </div>
            <button className="ub-batches-view-all">
              View Full Schedule
              <span className="ub-batches-view-all-arrow">→</span>
            </button>
          </div>
          <div className="ub-batches-grid">
            {(showAll ? BATCHES : BATCHES.slice(0, INITIAL_SHOW)).map((b, i) => (
              <BatchCard key={i} b={b} onSyllabus={() => openSyl(b.name)} />
            ))}
          </div>
          {BATCHES.length > INITIAL_SHOW && (
            <button className="ub-view-more-btn" onClick={() => setShowAll(v => !v)}>
              {showAll ? "Show Less Courses" : "View More Courses"}
              {showAll
                ? <svg width="16" height="18" viewBox="0 0 24 26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 13 12 7 7 13"/><polyline points="17 20 12 14 7 20"/></svg>
                : <svg width="16" height="18" viewBox="0 0 24 26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 6 12 12 7 6"/><polyline points="17 13 12 19 7 13"/></svg>
              }
            </button>
          )}
        </div>
      </section>

      {sylOpen && (
        <div onClick={e => { if (e.target === e.currentTarget) closeSyl(); }}
          style={{ position:"fixed", inset:0, zIndex:9999, background:"rgba(4,24,37,0.65)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div style={{ background:"linear-gradient(160deg,#062238 0%,#093148 100%)", borderRadius:20, padding:"32px 28px 28px", width:"100%", maxWidth:440, position:"relative", boxShadow:"0 24px 60px rgba(0,0,0,0.5)", fontFamily:"inherit", animation:"ub-sylSlideIn 0.3s cubic-bezier(0.25,1,0.5,1)" }}>
            <button onClick={closeSyl} style={{ position:"absolute", top:14, right:14, width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"none", color:"#fff", fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>

            {sylSubmitted ? (
              <div style={{ textAlign:"center", padding:"12px 0 4px" }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(6,148,209,0.15)", border:"1.5px solid rgba(6,148,209,0.4)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ fontSize:19, fontWeight:800, color:"#fff", marginBottom:8, lineHeight:1.25 }}>You&apos;re all set, {sylName.split(" ")[0]}!</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", lineHeight:1.65, marginBottom:20 }}>
                  The course content for <strong style={{ color:"#0694D1" }}>{sylCourse || "Microsoft Power Platform Certification"}</strong> will be sent to <strong style={{ color:"#fff" }}>{sylEmail}</strong> shortly.
                </div>
                <div style={{ background:"rgba(6,148,209,0.08)", border:"1px solid rgba(6,148,209,0.2)", borderRadius:10, padding:"10px 14px", fontSize:12, color:"rgba(255,255,255,0.5)", display:"flex", alignItems:"center", gap:8, justifyContent:"center", marginBottom:16 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Check your inbox — usually arrives within 2 minutes
                </div>
                <button onClick={closeSyl} style={{ width:"100%", padding:11, borderRadius:10, border:"1px solid rgba(6,148,209,0.35)", background:"transparent", color:"#0694D1", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Close</button>
              </div>
            ) : (
              <>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:"#0694D1", display:"inline-block", flexShrink:0 }}/>
                  <span style={{ fontSize:10, fontWeight:800, letterSpacing:1.2, color:"#0694D1", textTransform:"uppercase" }}>Download Syllabus</span>
                </div>
                {sylCourse && (
                  <div style={{ border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"10px 14px", marginBottom:18, background:"rgba(255,255,255,0.05)" }}>
                    <div style={{ fontSize:10, fontWeight:800, letterSpacing:1.2, color:"rgba(255,255,255,0.45)", textTransform:"uppercase", marginBottom:5 }}>Course</div>
                    <div style={{ fontSize:14, fontWeight:700, color:"#0694D1", lineHeight:1.4 }}>{sylCourse}</div>
                  </div>
                )}
                <div style={{ fontSize:22, fontWeight:800, color:"#fff", lineHeight:1.2, marginBottom:6 }}>Get the Course Content</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:22 }}>Fill in your details and we&apos;ll send it straight to your inbox.</div>
                <form onSubmit={e => { e.preventDefault(); if (!sylCountry) return; setSylSubmitted(true); }} style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  <div>
                    <label style={{ fontSize:10, fontWeight:800, letterSpacing:0.8, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", marginBottom:5, display:"block" }}>Full Name <span style={{ color:"#ef4444" }}>*</span></label>
                    <input required placeholder="John" value={sylName} onChange={e => setSylName(e.target.value)}
                      style={{ width:"100%", boxSizing:"border-box", background:"rgba(6,148,209,0.08)", border:"1.5px solid rgba(6,148,209,0.3)", borderRadius:10, padding:"11px 14px", fontSize:13.5, color:"#fff", outline:"none", fontFamily:"inherit", transition:"border-color 0.2s" }}
                      onFocus={e => (e.target.style.borderColor="#0694D1")} onBlur={e => (e.target.style.borderColor="rgba(6,148,209,0.3)")} />
                  </div>
                  <div>
                    <label style={{ fontSize:10, fontWeight:800, letterSpacing:0.8, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", marginBottom:5, display:"block" }}>Email Address <span style={{ color:"#ef4444" }}>*</span></label>
                    <input required type="email" placeholder="you@example.com" value={sylEmail} onChange={e => setSylEmail(e.target.value)}
                      style={{ width:"100%", boxSizing:"border-box", background:"rgba(6,148,209,0.08)", border:"1.5px solid rgba(6,148,209,0.3)", borderRadius:10, padding:"11px 14px", fontSize:13.5, color:"#fff", outline:"none", fontFamily:"inherit", transition:"border-color 0.2s" }}
                      onFocus={e => (e.target.style.borderColor="#0694D1")} onBlur={e => (e.target.style.borderColor="rgba(6,148,209,0.3)")} />
                  </div>
                  <div>
                    <label style={{ fontSize:10, fontWeight:800, letterSpacing:0.8, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", marginBottom:5, display:"block" }}>Country <span style={{ color:"#ef4444" }}>*</span></label>
                    <div ref={sylCountryRef} style={{ position:"relative" }}>
                      <button type="button" onClick={() => setSylCountryOpen(o => !o)}
                        style={{ width:"100%", boxSizing:"border-box", display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(6,148,209,0.08)", border:`1.5px solid ${sylCountryOpen ? "#0694D1" : "rgba(6,148,209,0.3)"}`, borderRadius:10, padding:"11px 14px", fontSize:13.5, color: sylCountry ? "#fff" : "rgba(255,255,255,0.4)", cursor:"pointer", fontFamily:"inherit", outline:"none" }}>
                        {sylCountry || "Select your country"}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: sylCountryOpen ? "rotate(180deg)" : "none", transition:"transform 0.2s", flexShrink:0 }}><polyline points="6 9 12 15 18 9"/></svg>
                      </button>
                      {sylCountryOpen && (
                        <div style={{ position:"absolute", bottom:"calc(100% + 4px)", left:0, right:0, zIndex:10000, background:"#0d2535", border:"1.5px solid rgba(6,148,209,0.35)", borderRadius:10, maxHeight:420, overflowY:"auto", overscrollBehavior:"contain", boxShadow:"0 -8px 32px rgba(0,0,0,0.6)" }}>
                          <div style={{ padding:"9px 14px", fontSize:13.5, color:"rgba(255,255,255,0.35)", cursor:"default", borderBottom:"1px solid rgba(6,148,209,0.15)" }}>Select your country</div>
                          {COUNTRIES.map(c => (
                            <div key={c} onClick={() => { setSylCountry(c); setSylCountryOpen(false); }}
                              style={{ padding:"9px 14px", fontSize:13.5, cursor:"pointer", color: sylCountry === c ? "#fff" : "#c8dce9", background: sylCountry === c ? "#1a5fa8" : "transparent", transition:"background 0.12s" }}
                              onMouseEnter={e => { if (sylCountry !== c) e.currentTarget.style.background="rgba(6,148,209,0.18)"; }}
                              onMouseLeave={e => { if (sylCountry !== c) e.currentTarget.style.background="transparent"; }}>
                              {c}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <span style={{ fontSize:12, color:"rgba(255,255,255,0.45)" }}>Course content will be sent to your email ID</span>
                  </div>
                  <button type="submit" style={{ width:"100%", padding:13, borderRadius:10, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#0694D1,#0577ab)", color:"#fff", fontSize:14, fontWeight:700, fontFamily:"inherit", letterSpacing:0.2, boxShadow:"0 4px 18px rgba(6,148,209,0.4)", marginTop:2, transition:"filter 0.18s" }}
                    onMouseEnter={e => (e.currentTarget.style.filter="brightness(1.12)")} onMouseLeave={e => (e.currentTarget.style.filter="none")}>
                    Send Course Content →
                  </button>
                  <div style={{ textAlign:"center", fontSize:11, color:"rgba(255,255,255,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    No spam, ever. Unsubscribe anytime.
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

/* ── Brochure Form ── */
function BrochureForm({ onClose, courseName }: { onClose: () => void; courseName: string }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%", boxSizing: "border-box",
    background: "rgba(6,148,209,0.08)", border: "1.5px solid rgba(6,148,209,0.3)",
    borderRadius: 10, padding: "11px 14px", fontSize: 13.5, color: "#fff",
    outline: "none", fontFamily: "inherit", transition: "border-color 0.2s",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 10, fontWeight: 800, letterSpacing: 0.8,
    color: "rgba(255,255,255,0.55)", textTransform: "uppercase",
    marginBottom: 5, display: "block",
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "12px 0 4px" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(6,148,209,0.15)", border: "1.5px solid rgba(6,148,209,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{ fontSize: 19, fontWeight: 800, color: "#fff", marginBottom: 8, lineHeight: 1.25 }}>You&apos;re all set, {fullName.split(" ")[0]}!</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: 20 }}>
          The course content for <strong style={{ color: "#0694D1" }}>{courseName}</strong> will be sent to <strong style={{ color: "#fff" }}>{email}</strong> shortly.
        </div>
        <div style={{ background: "rgba(6,148,209,0.08)", border: "1px solid rgba(6,148,209,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 16 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Check your inbox — usually arrives within 2 minutes
        </div>
        <button onClick={onClose} style={{ width: "100%", padding: 11, borderRadius: 10, border: "1px solid rgba(6,148,209,0.35)", background: "transparent", color: "#0694D1", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <label style={labelStyle}>Full Name <span style={{ color: "#ef4444" }}>*</span></label>
        <input required style={inputStyle} placeholder="Rahul Sharma" value={fullName} onChange={e => setFullName(e.target.value)}
          onFocus={e => (e.target.style.borderColor = "#0694D1")} onBlur={e => (e.target.style.borderColor = "rgba(6,148,209,0.3)")} />
      </div>
      <div>
        <label style={labelStyle}>Email Address <span style={{ color: "#ef4444" }}>*</span></label>
        <input required type="email" style={inputStyle} placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)}
          onFocus={e => (e.target.style.borderColor = "#0694D1")} onBlur={e => (e.target.style.borderColor = "rgba(6,148,209,0.3)")} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>Course content will be sent to your email ID</span>
      </div>
      <button type="submit" style={{ width: "100%", padding: 13, borderRadius: 10, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#0694D1,#0577ab)", color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "inherit", letterSpacing: 0.2, boxShadow: "0 4px 18px rgba(6,148,209,0.4)", marginTop: 2 }}>
        Send Course Content →
      </button>
      <div style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        No spam, ever. Unsubscribe anytime.
      </div>
    </form>
  );
}

interface RelatedCourse {
  code: string;
  title: string;
  vendor: string;
  level: string;
  duration: string;
  price: string;
  nextDate: string;
}

const PER_PAGE = 4;

export function RelatedCourses({ courses }: { courses: RelatedCourse[] }) {
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);
  const [brochureCourse, setBrochureCourse] = useState<string | null>(null);
  const hasMore = visibleCount < courses.length;

  return (
    <>
      {/* Mobile: paginated single column */}
      <div className="flex flex-col gap-4 sm:hidden">
        {courses.slice(0, visibleCount).map((c) => (
          <CourseCard key={c.code} c={c} onBrochure={setBrochureCourse} />
        ))}
        {hasMore ? (
          <button
            onClick={() => setVisibleCount(v => v + PER_PAGE)}
            className="flex items-center justify-center gap-1.5 w-full mt-1 text-sm font-semibold text-koenig-blue hover:text-koenig-navy transition underline underline-offset-4"
          >
            View More Courses
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="7 13 12 18 17 13"/>
              <polyline points="7 7 12 12 17 7"/>
            </svg>
          </button>
        ) : visibleCount > PER_PAGE && (
          <button
            onClick={() => setVisibleCount(PER_PAGE)}
            className="flex items-center justify-center gap-1.5 w-full mt-1 text-sm font-semibold text-koenig-blue hover:text-koenig-navy transition underline underline-offset-4"
          >
            View Less Courses
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="7 11 12 6 17 11"/>
              <polyline points="7 17 12 12 17 17"/>
            </svg>
          </button>
        )}
      </div>

      {/* Desktop: full grid */}
      <div className="hidden sm:grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <CourseCard key={c.code} c={c} onBrochure={setBrochureCourse} />
        ))}
      </div>

      {/* Brochure modal — portal */}
      {brochureCourse && createPortal(
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(7,30,46,0.7)", backdropFilter: "blur(3px)" }} onClick={() => setBrochureCourse(null)} />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 9999, width: "calc(100vw - 32px)", maxWidth: 440, background: "linear-gradient(160deg,#062238 0%,#093148 100%)", borderRadius: 20, padding: "32px 28px 28px", boxShadow: "0 24px 60px rgba(0,0,0,0.5)", fontFamily: "inherit" }}>
            <button onClick={() => setBrochureCourse(null)} style={{ position: "absolute", top: 14, right: 14, width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0694D1", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, color: "#0694D1", textTransform: "uppercase" }}>Download Syllabus</span>
            </div>
            <div style={{ marginBottom: 16, padding: "10px 14px", background: "rgba(6,148,209,0.1)", border: "1px solid rgba(6,148,209,0.25)", borderRadius: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 3 }}>Course</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.35 }}>{brochureCourse}</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>Get the Course Content</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 22 }}>Fill in your details and we&apos;ll send it straight to your inbox.</div>
            <BrochureForm onClose={() => setBrochureCourse(null)} courseName={brochureCourse} />
          </div>
        </>,
        document.body
      )}
    </>
  );
}

const ENROLLED: Record<string, { count: string; rating: string }> = {
  "AZ-900": { count: "4,200+", rating: "4.9" },
  "AZ-305": { count: "2,100+", rating: "4.9" },
  "AZ-400": { count: "1,800+", rating: "4.8" },
  "AZ-500": { count: "2,600+", rating: "4.7" },
  "AZ-204": { count: "1,500+", rating: "4.8" },
  "SC-200": { count: "1,100+", rating: "4.7" },
};

function LevelBadge({ level }: { level: string }) {
  const styles: Record<string, { bg: string; icon: React.ReactNode }> = {
    Fundamentals: {
      bg: "linear-gradient(135deg,#4DBFEF,#0694D1)",
      icon: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M5 3a7 7 0 0 0 7 7 7 7 0 0 0 7-7"/></svg>,
    },
    Associate: {
      bg: "linear-gradient(135deg,#0694D1,#076D9D)",
      icon: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
    },
    Expert: {
      bg: "linear-gradient(135deg,#076D9D,#062238)",
      icon: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7l4 9h12l4-9-6 4-4-6-4 6z"/></svg>,
    },
  };
  const s = styles[level] ?? styles.Associate;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, fontSize:9, fontWeight:800, letterSpacing:"0.6px", textTransform:"uppercase", padding:"3px 9px 3px 7px", borderRadius:20, background:s.bg, color:"#fff", boxShadow:"0 2px 8px rgba(6,148,209,0.25)", lineHeight:1 }}>
      {s.icon}{level}
    </span>
  );
}

function CourseCard({ c, onBrochure }: { c: RelatedCourse; onBrochure: (name: string) => void }) {
  const meta = ENROLLED[c.code];
  return (
    <div style={{ background:"#fff", border:"1.5px solid rgba(6,148,209,0.12)", borderRadius:14, padding:"16px 16px 14px", display:"flex", flexDirection:"column", position:"relative", minHeight:250, boxShadow:"0 2px 10px rgba(6,148,209,0.07)", transition:"box-shadow 0.25s", cursor:"pointer" }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow="0 8px 32px rgba(6,148,209,0.18),0 2px 8px rgba(0,0,0,0.06)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow="0 2px 10px rgba(6,148,209,0.07)"}
    >
      {/* Popular badge — top-right corner */}
      <span style={{ position:"absolute", top:0, right:0, display:"inline-flex", alignItems:"center", gap:4, height:20, fontSize:9, fontWeight:800, letterSpacing:"0.5px", textTransform:"uppercase", padding:"0 10px 0 8px", borderRadius:"0 14px 0 10px", background:"linear-gradient(135deg,#0694D1,#22d3ee)", color:"#fff", boxShadow:"-2px 2px 8px rgba(6,148,209,0.28)", zIndex:2 }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c0 0-5.5 6-5.5 10.5a5.5 5.5 0 0 0 11 0C17.5 8 12 2 12 2zm0 14a3 3 0 0 1-3-3c0-2.5 3-6 3-6s3 3.5 3 6a3 3 0 0 1-3 3z"/></svg>
        Popular
      </span>

      {/* Level badge */}
      <div style={{ marginBottom:6, marginTop:-8 }}>
        <LevelBadge level={c.level} />
      </div>

      {/* Title */}
      <div style={{ flex:1, marginTop:10 }}>
        <div style={{ fontSize:14, fontWeight:800, color:"#071e2e", lineHeight:1.4, letterSpacing:"-0.01em", display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden", minHeight:59 }}>
          {c.title}
        </div>
      </div>

      {/* Code + Duration */}
      <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:10, flexWrap:"wrap" }}>
        <span style={{ fontSize:12, fontFamily:"'SFMono-Regular','Consolas',monospace", color:"#0694D1", background:"rgba(6,148,209,0.10)", border:"1px solid rgba(6,148,209,0.28)", padding:"2px 7px", borderRadius:4, fontWeight:700, letterSpacing:"0.4px" }}>
          {c.code}
        </span>
        <span style={{ display:"inline-flex", alignItems:"center", gap:3, fontSize:12, fontFamily:"'SFMono-Regular','Consolas',monospace", color:"#5a7a90", background:"rgba(6,148,209,0.05)", border:"1px solid rgba(6,148,209,0.14)", padding:"2px 7px", borderRadius:4, fontWeight:600, letterSpacing:"0.3px" }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {c.duration}
        </span>
      </div>

      {/* Footer */}
      <div style={{ marginTop:"auto", borderTop:"1px solid rgba(6,148,209,0.08)", paddingTop:10, display:"flex", flexDirection:"column", gap:8 }}>
        {/* Enrolled + Rating + Price */}
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          {meta && (
            <>
              <span style={{ fontSize:10, color:"#5a7a90", fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                {meta.count}
              </span>
              <span style={{ fontSize:10, fontWeight:700, color:"#d97706", display:"flex", alignItems:"center", gap:2 }}>
                <span style={{ fontSize:10 }}>★</span>{meta.rating}
              </span>
            </>
          )}
          <span style={{ marginLeft:"auto", display:"flex", alignItems:"baseline", gap:1 }}>
            <span style={{ fontSize:12, fontWeight:600, color:"#0694D1", opacity:0.8 }}>₹</span>
            <span style={{ fontSize:15, fontWeight:700, color:"#0694D1", letterSpacing:"-0.3px", lineHeight:1 }}>{c.price.replace("$","")}</span>
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display:"flex", gap:7 }}>
          <button onClick={() => onBrochure(c.title)} style={{ flex:1, display:"inline-flex", alignItems:"center", justifyContent:"center", gap:4, padding:"7px 8px", borderRadius:8, fontSize:12, fontWeight:700, background:"transparent", color:"#0694D1", border:"1.5px solid #0694D1", cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Syllabus
          </button>
          <button style={{ flex:1, display:"inline-flex", alignItems:"center", justifyContent:"center", padding:"7px 8px", borderRadius:8, fontSize:12, fontWeight:700, background:"linear-gradient(135deg,#093148 0%,#0d5280 100%)", color:"#fff", border:"none", cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit", boxShadow:"0 2px 8px rgba(9,49,72,0.3)" }}>
            View Course
          </button>
        </div>
      </div>
    </div>
  );
}

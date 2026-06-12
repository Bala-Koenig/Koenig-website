"use client";
import { useState, useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

/* ── Content (tech page data, unchanged) ────────────────── */
const prerequisites = [
  "Basic understanding of Power Platform components (Power BI, Power Apps, Power Automate)",
  "Familiarity with Power Platform capabilities and features",
  "Basic knowledge of the development environment",
  "Understanding of security and governance features",
  "Awareness of data sources and connectors",
  "Basic knowledge of integration and deployment options",
];

const whoShouldAttend = [
  { role: "IT Professionals", desc: "System admins, IT managers and support staff looking to automate workflows and integrate Microsoft services." },
  { role: "Business Analysts", desc: "Professionals who want to build data-driven reports, dashboards and apps without heavy coding." },
  { role: "Citizen Developers", desc: "Non-technical employees who want to create business apps and automate repetitive tasks using low-code tools." },
  { role: "Data Analysts", desc: "Analysts seeking Power BI certification (PL-300) to build advanced analytics solutions for their organisations." },
  { role: "Project Managers", desc: "PMs who want to leverage Power Automate and Power Apps to streamline project tracking and reporting." },
  { role: "Solution Architects", desc: "Architects targeting PL-600 who need deep knowledge of the full Power Platform stack and governance." },
];

const TABS = [
  {
    label: "Prerequisites", sub: "Requirements",
    icon: (active: boolean) => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        <path d="M9 14l2 2 4-4" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    label: "Who Should Attend", sub: "Target Audience",
    icon: (active: boolean) => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
];

/* ── FAQ accordion item ──────────────────────────────────── */
function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{
      borderRadius: 14, overflow: "hidden",
      border: `1.5px solid ${isOpen ? "rgba(6,148,209,0.4)" : "#E2ECF5"}`,
      background: isOpen ? "#F8FCFF" : "#fff",
      transition: "border-color 0.25s, background 0.25s",
    }}>
      <button onClick={onToggle} className="ai-faq-btn" style={{
        width: "100%", display: "flex", alignItems: "flex-start", gap: 14,
        padding: "16px 20px", background: "transparent", border: "none",
        cursor: "pointer", textAlign: "left", fontFamily: "inherit",
      }}>
        <div style={{
          flexShrink: 0, width: 28, height: 28, borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isOpen ? C.accent : "rgba(6,148,209,0.08)",
          border: isOpen ? "none" : "1px solid rgba(6,148,209,0.15)",
          transition: "background 0.25s",
        }}>
          <svg width="12" height="12" fill="none" stroke={isOpen ? "#fff" : C.accent} viewBox="0 0 24 24"
            style={{ transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.25s" }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/>
          </svg>
        </div>
        <span style={{ flex: 1, fontSize: 14, fontWeight: 600, lineHeight: 1.5, color: isOpen ? C.accent : C.dark, transition: "color 0.25s" }}>
          {q}
        </span>
      </button>
      <div style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 0.38s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ overflow: "hidden" }}>
          <p className="ai-faq-answer" style={{ padding: "0 20px 18px 62px", fontSize: 14, color: "#6B7280", lineHeight: 1.7, borderTop: "1px solid #EBF5FD" }}>
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function AdditionalInfo() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes tab-shimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .ai-shimmer-border {
          padding: 2.5px;
          border-radius: 22px;
          background: linear-gradient(120deg, #0694D1, #22d3ee, #a8d8ff, #50e6ff, #0694D1);
          background-size: 300% 300%;
          animation: tab-shimmer 2.8s ease infinite;
          box-shadow: 0 0 22px rgba(6,148,209,0.32), 0 6px 28px rgba(6,148,209,0.14);
          display: inline-flex;
        }
        .ai-shimmer-inner {
          display: inline-flex;
          background: white;
          border-radius: 20px;
          padding: 6px;
          gap: 4px;
        }
        .ai-tab-btn {
          position: relative;
          border: none;
          background: transparent;
          padding: 10px 18px;
          border-radius: 15px;
          font-size: 13px;
          font-weight: 700;
          color: #64748B;
          cursor: pointer;
          transition: color 0.22s;
          white-space: nowrap;
          overflow: hidden;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          gap: 9px;
        }
        .ai-tab-btn.active { color: #fff; }
        .ai-tab-btn:not(.active):hover { color: #093148; background: rgba(6,148,209,0.05); }
        .ai-tab-active-bg {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          background: linear-gradient(135deg, #0694D1 0%, #046fa3 100%);
          box-shadow: 0 6px 20px rgba(6,148,209,0.45), inset 0 1px 0 rgba(255,255,255,0.15);
          z-index: 0;
        }
        .ai-tab-icon {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 7px; flex-shrink: 0;
          transition: all 0.22s; position: relative; z-index: 1;
        }
        .ai-tab-btn:not(.active) .ai-tab-icon { background: rgba(6,148,209,0.09); }
        .ai-tab-btn.active .ai-tab-icon { background: rgba(255,255,255,0.18); }
        .ai-tab-text { display: flex; flex-direction: column; align-items: flex-start; gap: 1px; position: relative; z-index: 1; }
        .ai-tab-main { font-size: 13px; font-weight: 700; line-height: 1; }
        .ai-tab-sub  { font-size: 10px; font-weight: 500; opacity: 0.72; line-height: 1; }
        .ai-tab-divider { width: 1px; background: rgba(6,148,209,0.15); align-self: stretch; margin: 4px 0; flex-shrink: 0; }
        @media(max-width:700px){
          .ai-shimmer-border { display: flex; width: 100%; border-radius: 18px; }
          .ai-shimmer-inner  { width: 100%; border-radius: 16px; }
          .ai-tab-btn        { flex: 1; justify-content: center; padding: 10px 8px; }
          .ai-tab-sub        { display: none; }
        }
        @media(max-width:480px){
          .ai-tab-icon { display: none; }
          .ai-tab-main { font-size: 12px; }
        }
        @media(max-width:375px){
          .ai-faq-btn { padding: 10px 12px !important; }
          .ai-faq-answer { padding-bottom: 12px !important; padding-left: 44px !important; }
        }
      `}</style>

      <section ref={sectionRef} style={{ padding: "30px 0", background: "#fff" }} aria-labelledby="addinfo-heading">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px,3vw,32px)" }}>

          {/* ── Tab bar ─────────────────────────────────── */}
          <div className="animate-on-scroll" style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
            <div className="ai-shimmer-border">
              <div className="ai-shimmer-inner">
                {TABS.map((tab, i) => (
                  <>
                    {i > 0 && <div key={`div-${i}`} className="ai-tab-divider" />}
                    <button
                      key={tab.label}
                      className={`ai-tab-btn${activeTab === i ? " active" : ""}`}
                      onClick={() => setActiveTab(i)}
                    >
                      {activeTab === i && <span className="ai-tab-active-bg" />}
                      <span className="ai-tab-icon">{tab.icon(activeTab === i)}</span>
                      <span className="ai-tab-text">
                        <span className="ai-tab-main">{tab.label}</span>
                        <span className="ai-tab-sub">{tab.sub}</span>
                      </span>
                    </button>
                  </>
                ))}
              </div>
            </div>
          </div>

          {/* ── Tab 0: Prerequisites ─────────────────────── */}
          {activeTab === 0 && (
            <div className="animate-on-scroll" style={{ maxWidth: 900, margin: "0 auto" }}>
              <h2 style={{ fontSize: "clamp(18px, 1.8vw, 22px)", fontWeight: 800, color: C.dark, marginBottom: 24, fontFamily: "'GTWalsheimPro', sans-serif" }}>
                Prerequisites for{" "}
                <span style={{ background: "linear-gradient(to right, #0694D1, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Certification
                </span>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 10 }}>
                {prerequisites.map((p, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "14px 16px", borderRadius: 12,
                    background: "#FAFCFF", border: "1.5px solid #E2ECF5",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(6,148,209,0.35)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 14px rgba(6,148,209,0.08)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E2ECF5"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                  >
                    <div style={{
                      flexShrink: 0, width: 22, height: 22, borderRadius: 6,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(6,148,209,0.10)", marginTop: 1,
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.55, margin: 0 }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Tab 1: Who Should Attend ─────────────────── */}
          {activeTab === 1 && (
            <div className="animate-on-scroll" style={{ maxWidth: 900, margin: "0 auto" }}>
              <h2 style={{ fontSize: "clamp(18px, 1.8vw, 22px)", fontWeight: 800, color: C.dark, marginBottom: 24, fontFamily: "'GTWalsheimPro', sans-serif" }}>
                Who Should Take{" "}
                <span style={{ background: "linear-gradient(to right, #0694D1, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  This Course?
                </span>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 10 }}>
                {whoShouldAttend.map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "16px 16px", borderRadius: 12,
                    background: "#FAFCFF", border: "1.5px solid #E2ECF5",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(6,148,209,0.35)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 14px rgba(6,148,209,0.08)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E2ECF5"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                  >
                    <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(6,148,209,0.10)", marginTop: 2 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: C.dark, margin: "0 0 4px" }}>{item.role}</p>
                      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}

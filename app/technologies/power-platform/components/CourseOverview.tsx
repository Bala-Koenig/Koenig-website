"use client";
import { useState, useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };



const coreComponents = [
  { name: "Power Apps", desc: "A low-code application development platform that allows users to build custom web and mobile apps tailored to specific business needs — from simple data-entry tools to complex multi-screen line-of-business applications.", bestFor: "Digitizing manual processes like inspections, expense approvals, or inventory management." },
  { name: "Power Automate", desc: "An intelligent workflow automation engine that connects apps and services to eliminate repetitive tasks. It supports everything from simple approval flows to complex, multi-step business process automations with conditional logic.", bestFor: "Routing approvals, syncing data between systems, and automating notifications across Microsoft 365 and third-party services." },
  { name: "Power BI", desc: "A business analytics and data visualization platform for creating interactive dashboards and reports from virtually any data source — transforming raw data into actionable insights.", bestFor: "Transforming raw data from multiple sources into interactive dashboards, KPI reports, and self-service analytics." },
  { name: "Power Pages", desc: "A low-code platform for creating secure, data-rich, external-facing business websites and portals — ideal for extending Dataverse data to external users.", bestFor: "Customer self-service portals, partner portals, community forums, and secure data-sharing sites." },
  { name: "Copilot Studio", desc: "An AI-driven platform for building intelligent copilots and chatbots using a no-code graphical interface — powered by large language models and deeply integrated with Microsoft services.", bestFor: "Internal helpdesk bots, customer service agents, guided sales assistants, and knowledge-base retrieval systems." },
  { name: "AI Builder", desc: "A built-in AI capability layer for the Power Platform that enables users to add intelligence to apps and workflows — without needing data science expertise. It includes pre-built and custom AI models for document processing, prediction, and object detection.", bestFor: "Automating invoice processing, predicting business outcomes, extracting data from forms, and classifying text in Power Automate flows." },
];

export default function CourseOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"core" | "dataverse">("core");
  const [whoTab, setWhoTab] = useState<"prereq" | "who">("prereq");
  const [cardPage, setCardPage] = useState(0);
  const [prereqPage, setPrereqPage] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const [coSlide, setCoSlide] = useState(0);
  const coDragStart = useRef<number | null>(null);
  const coOnDragStart = (x: number) => { coDragStart.current = x; };
  const coOnDragEnd   = (x: number) => {
    if (coDragStart.current === null) return;
    const diff = coDragStart.current - x;
    if (Math.abs(diff) > 40) setCoSlide(s => diff > 0 ? Math.min(s + 1, 2) : Math.max(s - 1, 0));
    coDragStart.current = null;
  };
  const whoDragStart    = useRef<number | null>(null);
  const prereqDragStart = useRef<number | null>(null);

  const whoSwipeStart = (x: number) => { whoDragStart.current = x; };
  const whoSwipeEnd   = (x: number, total: number) => {
    if (whoDragStart.current === null) return;
    const diff = whoDragStart.current - x;
    if (Math.abs(diff) > 40) setCardPage(p => diff > 0 ? Math.min(p + 1, total - 1) : Math.max(p - 1, 0));
    whoDragStart.current = null;
  };

  const prereqSwipeStart = (x: number) => { prereqDragStart.current = x; };
  const prereqSwipeEnd   = (x: number, total: number) => {
    if (prereqDragStart.current === null) return;
    const diff = prereqDragStart.current - x;
    if (Math.abs(diff) > 40) setPrereqPage(p => diff > 0 ? Math.min(p + 1, total - 1) : Math.max(p - 1, 0));
    prereqDragStart.current = null;
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes co-tab-shimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .co-tab-shimmer-border {
          padding: 2.5px;
          border-radius: 22px;
          background: linear-gradient(120deg, #0694D1, #22d3ee, #a8d8ff, #50e6ff, #0694D1);
          background-size: 300% 300%;
          animation: co-tab-shimmer 2.8s ease infinite;
          box-shadow: 0 0 22px rgba(6,148,209,0.32), 0 6px 28px rgba(6,148,209,0.14);
          display: inline-flex;
        }
        .co-tab-shimmer-inner {
          display: inline-flex;
          background: white;
          border-radius: 20px;
          padding: 6px;
          gap: 6px;
        }
        .who-mobile-view { display: none; }
        .who-desktop-grid { display: grid; }
        @media(max-width: 700px) {
          .who-desktop-grid { display: none !important; }
          .who-mobile-view { display: block; }
        }
      `}</style>

      {/* ── Main white section ── */}
      <section id="overview" ref={sectionRef} className="relative py-[30px] bg-white" aria-labelledby="overview-heading">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(6,148,209,0.2), transparent)` }} />

        <div className="max-w-[1280px] mx-auto px-[16px]">

          {/* ── Two-col: Content left + Image right ── */}
          <div className="grid lg:grid-cols-5 gap-[40px] lg:gap-[60px] items-start mb-[18px]">

            {/* Left — content (3/5) */}
            <div className="lg:col-span-3 animate-on-scroll">
              <span className="section-badge mb-[16px] inline-flex" style={{ backgroundColor: "rgba(6,148,209,0.08)", borderColor: "rgba(6,148,209,0.2)", color: C.accent }}>
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{display:'inline',verticalAlign:'middle'}}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {" "}Course Overview
              </span>
              <h2 id="overview-heading" className="font-heading font-medium leading-tight mb-[20px]" style={{ color: C.dark, fontSize: "clamp(22px, 2.8vw, 36px)" }}>
                What is{" "}
                <span className="text-shimmer-dark">Microsoft Power Platform?</span>
              </h2>

              <style suppressHydrationWarning>{`
                .co-text-wrap { position: relative; }
                .co-text-clamp { overflow: hidden; }
                .co-read-more-btn { display: none; }
                @media(max-width: 700px) {
                  .co-text-clamp:not(.expanded) { display: -webkit-box; -webkit-line-clamp: 7; -webkit-box-orient: vertical; overflow: hidden; }
                  .co-read-more-btn { display: inline; color: #0694D1; font-weight: 700; font-size: 14px; cursor: pointer; background: none; border: none; padding: 4px 0 0; font-family: inherit; }
                }
              `}</style>
              <div className="co-text-wrap">
                <div className={`co-text-clamp font-body text-[16px] leading-[1.8] space-y-[14px]${readMore ? " expanded" : ""}`} style={{ color: "#374151" }}>
                  <p>
                    Microsoft Power Platform is a suite of five powerful low-code tools designed to help organizations analyze data, build solutions, automate processes, and create virtual agents — all with minimal coding required.
                  </p>
                  <p>
                    From building custom business apps with <strong style={{ color: C.dark }}>Power Apps</strong>, automating workflows with <strong style={{ color: C.dark }}>Power Automate</strong>, to visualizing data with <strong style={{ color: C.dark }}>Power BI</strong> — this platform empowers every professional to become a digital creator without extensive development expertise.
                  </p>
                  <p style={{ color: C.accent }}>
                    The platform&apos;s primary goal is to empower &ldquo;citizen developers&rdquo; — business users with deep process knowledge but little coding background — to create solutions for their own teams.
                  </p>
                </div>
                <button className="co-read-more-btn" onClick={() => setReadMore(r => !r)}>
                  {readMore ? "Read less ↑" : "Read more ↓"}
                </button>
              </div>

              {/* Prerequisites / Who Should Take — 2 tabs */}
              <div className="pt-[15px]">
                {/* Tab switcher — shimmer border matching Core Components style */}
                <div className="co-tab-shimmer-border" style={{ marginBottom: 15 }}>
                  <div className="co-tab-shimmer-inner">
                    {([{ key: "prereq", label: "Prerequisites" }, { key: "who", label: "Who Should Attend" }] as const).map(t => (
                      <button key={t.key} onClick={() => setWhoTab(t.key)} style={{
                        padding: "9px 20px", borderRadius: 16, border: "none", cursor: "pointer", fontFamily: "inherit",
                        fontSize: 13, fontWeight: 700, transition: "background 0.22s, box-shadow 0.22s, color 0.22s",
                        background: whoTab === t.key ? "linear-gradient(135deg,#0694D1 0%,#22d3ee 100%)" : "transparent",
                        color: whoTab === t.key ? "#fff" : "#4a6375",
                        boxShadow: whoTab === t.key ? "0 4px 18px rgba(6,148,209,0.38)" : "none",
                      }}>{t.label}</button>
                    ))}
                  </div>
                </div>

                {/* Tab 1 — Prerequisites */}
                {whoTab === "prereq" && (() => {
                  const PREREQ_CARDS = [
                    { label: "Power Platform Basics",    text: "Basic understanding of Power Platform components (Power BI, Power Apps, Power Automate)" },
                    { label: "Platform Capabilities",    text: "Familiarity with Power Platform capabilities and features" },
                    { label: "Development Environment",  text: "Basic knowledge of the development environment" },
                    { label: "Security & Governance",    text: "Understanding of security and governance features" },
                    { label: "Data Sources",             text: "Awareness of data sources and connectors" },
                    { label: "Integration & Deployment", text: "Basic knowledge of integration and deployment options" },
                  ];
                  const prereqCheckIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
                  const PrereqCard = ({ item }: { item: typeof PREREQ_CARDS[0] }) => (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 10, background: "rgba(6,148,209,0.04)", border: "1px solid rgba(6,148,209,0.1)" }}>
                      <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: "rgba(6,148,209,0.1)", border: "1px solid rgba(6,148,209,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: C.accent, marginTop: 1 }}>{prereqCheckIcon}</span>
                      <div>
                        <p className="font-heading font-medium" style={{ fontSize: 13, color: C.dark, marginBottom: 2, lineHeight: 1.3 }}>{item.label}</p>
                        <p className="font-body" style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.5 }}>{item.text}</p>
                      </div>
                    </div>
                  );
                  const totalPrereqPages = Math.ceil(PREREQ_CARDS.length / 2);
                  const visiblePrereq = PREREQ_CARDS.slice(prereqPage * 2, prereqPage * 2 + 2);
                  return (
                    <>
                      {/* Desktop: 2-col grid */}
                      <div className="who-desktop-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
                        {PREREQ_CARDS.map(item => <PrereqCard key={item.label} item={item} />)}
                      </div>
                      {/* Mobile: 2 cards + arrows */}
                      <div className="who-mobile-view"
                        onTouchStart={e => prereqSwipeStart(e.touches[0].clientX)}
                        onTouchEnd={e => prereqSwipeEnd(e.changedTouches[0].clientX, totalPrereqPages)}
                        onMouseDown={e => prereqSwipeStart(e.clientX)}
                        onMouseUp={e => prereqSwipeEnd(e.clientX, totalPrereqPages)}
                        onMouseLeave={e => { if (prereqDragStart.current !== null) prereqSwipeEnd(e.clientX, totalPrereqPages); }}
                        style={{ userSelect: "none", cursor: "grab" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, pointerEvents: "none" }}>
                          {visiblePrereq.map(item => <PrereqCard key={item.label} item={item} />)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 14 }}>
                          <button onClick={() => setPrereqPage(p => p - 1)} disabled={prereqPage === 0}
                            style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid rgba(6,148,209,${prereqPage === 0 ? "0.2" : "0.4"})`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: prereqPage === 0 ? "not-allowed" : "pointer", opacity: prereqPage === 0 ? 0.4 : 1, color: C.accent }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                          </button>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#6B7280" }}>{prereqPage + 1} / {totalPrereqPages}</span>
                          <button onClick={() => setPrereqPage(p => p + 1)} disabled={prereqPage === totalPrereqPages - 1}
                            style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid rgba(6,148,209,${prereqPage === totalPrereqPages - 1 ? "0.2" : "0.4"})`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: prereqPage === totalPrereqPages - 1 ? "not-allowed" : "pointer", opacity: prereqPage === totalPrereqPages - 1 ? 0.4 : 1, color: C.accent }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })()}

                {/* Tab 2 — Who Should Attend */}
                {whoTab === "who" && (
                  <div>
                    <h3 className="font-heading font-medium mb-[14px]" style={{ color: C.dark, fontSize: "clamp(16px, 1.6vw, 20px)" }}>Who Should Take This Course?</h3>
                {(() => {
                  const WHO_CARDS = [
                    { label: "IT Professionals",   text: "Build and govern enterprise Power Platform solutions",              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
                    { label: "Business Analysts",  text: "Digitise workflows and automate reporting with no-code tools",    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
                    { label: "Data Analysts",      text: "Create Power BI dashboards and data-driven insights",             icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg> },
                    { label: "Project Managers",   text: "Automate status reporting and streamline project workflows",       icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg> },
                    { label: "Citizen Developers", text: "Turn process knowledge into apps without deep coding skills",      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                    { label: "Solution Architects",text: "Design scalable, secure, enterprise-grade Power Platform solutions",icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> },
                  ];
                  const CardItem = ({ item }: { item: typeof WHO_CARDS[0] }) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 10, background: "rgba(6,148,209,0.04)", border: "1px solid rgba(6,148,209,0.1)" }}>
                      <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: "rgba(6,148,209,0.1)", border: "1px solid rgba(6,148,209,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: C.accent, marginTop: 1 }}>{item.icon}</span>
                      <div>
                        <p className="font-heading font-medium" style={{ fontSize: 13, color: C.dark, marginBottom: 2, lineHeight: 1.3 }}>{item.label}</p>
                        <p className="font-body" style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.5 }}>{item.text}</p>
                      </div>
                    </div>
                  );
                  const totalPages = Math.ceil(WHO_CARDS.length / 2);
                  const visibleCards = WHO_CARDS.slice(cardPage * 2, cardPage * 2 + 2);
                  return (
                    <>
                      {/* Desktop: 2-col grid */}
                      <div className="who-desktop-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        {WHO_CARDS.map(item => <CardItem key={item.label} item={item} />)}
                      </div>
                      {/* Mobile: 2 cards + arrows */}
                      <div className="who-mobile-view"
                        onTouchStart={e => whoSwipeStart(e.touches[0].clientX)}
                        onTouchEnd={e => whoSwipeEnd(e.changedTouches[0].clientX, totalPages)}
                        onMouseDown={e => whoSwipeStart(e.clientX)}
                        onMouseUp={e => whoSwipeEnd(e.clientX, totalPages)}
                        onMouseLeave={e => { if (whoDragStart.current !== null) whoSwipeEnd(e.clientX, totalPages); }}
                        style={{ userSelect: "none", cursor: "grab" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, pointerEvents: "none" }}>
                          {visibleCards.map(item => <CardItem key={item.label} item={item} />)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 14 }}>
                          <button onClick={() => setCardPage(p => p - 1)} disabled={cardPage === 0}
                            style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid rgba(6,148,209,${cardPage === 0 ? "0.2" : "0.4"})`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: cardPage === 0 ? "not-allowed" : "pointer", opacity: cardPage === 0 ? 0.4 : 1, color: C.accent }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                          </button>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#6B7280" }}>{cardPage + 1} / {totalPages}</span>
                          <button onClick={() => setCardPage(p => p + 1)} disabled={cardPage === totalPages - 1}
                            style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid rgba(6,148,209,${cardPage === totalPages - 1 ? "0.2" : "0.4"})`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: cardPage === totalPages - 1 ? "not-allowed" : "pointer", opacity: cardPage === totalPages - 1 ? 0.4 : 1, color: C.accent }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                          </button>
                        </div>
                      </div>
                      <style suppressHydrationWarning>{`
                      `}</style>
                    </>
                  );
                })()}
                  </div>
                )}
              </div>
            </div>

            {/* Right — Image + quick stats (2/5) */}
            <div className="lg:col-span-2 hidden lg:block" style={{ position: "sticky", top: "90px", alignSelf: "start" }}>
              <div style={{ background: "#fff", border: "1.5px solid #C8E9F8", borderRadius: 20, padding: 20, boxShadow: "0 4px 24px rgba(6,148,209,0.10)" }}>
                {/* Title above stats */}
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 6px" }}>Trusted Worldwide</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: C.dark, margin: 0, lineHeight: 1.3 }}>Our Impact in Numbers</p>
                </div>
                {/* 2×2 stats grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
                  {[
                    { value: "500K+", label: "Professionals Trained", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="#0694D1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> },
                    { value: "98%",  label: "Exam Pass Rate",        icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="#0694D1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L3 7v6c0 5.25 3.83 10.15 9 11.25 5.17-1.1 9-6 9-11.25V7l-9-5z"/><path d="M9 12l2 2 4-4" strokeWidth="2.2"/></svg> },
                    { value: "150+", label: "Countries Reached",     icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="#0694D1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/></svg> },
                    { value: "4.9★", label: "Learner Rating",        icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="#0694D1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
                  ].map((s) => (
                    <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10, background: "#F4FBFF", border: "1px solid #D6EEF9", borderLeft: "3.5px solid #0694D1", borderRadius: 10, padding: "12px 14px" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(6,148,209,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {s.icon}
                      </div>
                      <div>
                        <p style={{ fontSize: 18, fontWeight: 800, color: C.accent, lineHeight: 1.1, margin: 0 }}>{s.value}</p>
                        <p style={{ fontSize: 12, color: "#6B8499", marginTop: 2, margin: 0 }}>{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training 5+ employees CTA */}
              <div style={{ marginTop: 12, border: "1.5px solid #B8DDEF", borderRadius: 12, padding: "22px 20px", background: "#EBF8FE", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <p style={{ fontSize: 14, color: "#6B8499", margin: 0, textAlign: "center", fontWeight: 500 }}>Training 5 or more employees?</p>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("openContactModal", { detail: { type: "enterprise" } }))}
                  style={{ border: "1.5px solid #0694D1", borderRadius: 8, padding: "9px 24px", background: "transparent", color: "#0694D1", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "inherit", transition: "background 0.18s, color 0.18s", whiteSpace: "nowrap" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0694D1"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#0694D1"; }}
                >
                  Request More Info →
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Career Outcomes — full-width sky blue glow section ── */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #dff3fc 0%, #e8f7ff 40%, #cceeff 100%)", padding: "30px 0", borderTop: "1px solid rgba(6,148,209,0.15)", borderBottom: "1px solid rgba(6,148,209,0.15)" }}>
        {/* glow blobs */}
        <div style={{ pointerEvents: "none", position: "absolute", top: "-80px", right: "-80px", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,148,209,0.22) 0%, transparent 65%)", filter: "blur(30px)" }} />
        <div style={{ pointerEvents: "none", position: "absolute", bottom: "-60px", left: "-60px", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,148,209,0.16) 0%, transparent 65%)", filter: "blur(24px)" }} />
        <div style={{ pointerEvents: "none", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(34,211,238,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
          {/* Section header */}
          <div style={{ marginBottom: 32, display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 8, textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, borderRadius: 999, border: "1px solid rgba(6,148,209,0.25)", background: "#fff", padding: "6px 16px", fontSize: 12, fontWeight: 700, color: C.accent, boxShadow: "0 2px 8px rgba(6,148,209,0.12)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
              </svg>
              Career Outcomes
            </div>
            <h2 className="font-heading font-medium" style={{ fontSize: "clamp(20px, 2.2vw, 28px)", color: C.dark }}>
              What{" "}
              <span style={{ background: "linear-gradient(to right, #0694D1, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Power Platform Certification
              </span>{" "}
              Opens Up For You
            </h2>
            <p className="font-body" style={{ fontSize: 14, color: "#4a6375" }}>Based on industry data from certified Power Platform professionals worldwide</p>
          </div>

          {/* Hero stat banner */}
          <div style={{ position: "relative", overflow: "hidden", borderRadius: 18, padding: "32px", textAlign: "center", marginBottom: 24, background: "radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 55%, #040C18 100%)" }}>
            <div style={{ pointerEvents: "none", position: "absolute", right: -32, top: -32, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,148,209,0.25) 0%, transparent 70%)" }} />
            <div style={{ pointerEvents: "none", position: "absolute", left: -32, bottom: 0, width: 130, height: 130, borderRadius: "50%", background: "radial-gradient(circle, rgba(77,191,239,0.15) 0%, transparent 70%)" }} />
            <div style={{ position: "relative" }}>
              <div className="font-heading font-medium" style={{ fontSize: 52, lineHeight: 1, marginBottom: 6, background: "linear-gradient(to right,#0694D1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>72%</div>
              <p className="font-body" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>of Power Platform certified professionals report career advancement within 6 months</p>
            </div>
          </div>

          <style suppressHydrationWarning>{`
            .co-cards-desktop { display: grid; }
            .co-cards-mobile { display: none; }
            @media(max-width:700px) {
              .co-cards-desktop { display: none !important; }
              .co-cards-mobile { display: block; }
              .co-cards-track-wrap { overflow: hidden; user-select: none; cursor: grab; }
              .co-cards-track { display: flex; align-items: stretch; transition: transform 0.35s cubic-bezier(0.25,1,0.5,1); }
              .co-cards-slide { flex: 0 0 100%; width: 100%; box-sizing: border-box; display: flex; }
              .co-cards-slide > div { flex: 1; }
              .co-cards-nav { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 16px; }
              .co-cards-nav-btn { width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid rgba(6,148,209,0.35); background: #fff; color: #0694D1; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
              .co-cards-nav-btn:hover { background: rgba(6,148,209,0.08); }
              .co-cards-nav-btn:disabled { opacity: 0.35; cursor: default; }
              .co-cards-nav-count { font-size: 13px; font-weight: 700; color: #6B7280; min-width: 40px; text-align: center; }
            }
          `}</style>

          {/* 3 cards — desktop grid */}
          <div className="co-cards-desktop" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>

            {/* Salary Impact */}
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 16, border: "1px solid #d1fae5", background: "#fff", padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ position: "absolute", inset: "0 0 auto", height: 2, background: "linear-gradient(to right,rgba(52,211,153,0.6),rgba(16,185,129,0.8),rgba(52,211,153,0.3))" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#10b981,#34d399)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 12px rgba(16,185,129,0.3)", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <span className="font-heading font-medium" style={{ fontSize: 14, color: C.dark }}>Salary Impact</span>
                </div>
                <span className="font-heading font-medium" style={{ fontSize: 18, color: "#10b981" }}>+24%</span>
              </div>
              <p className="font-body" style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6, marginBottom: 14 }}>Average salary increase reported after obtaining a Power Platform certification</p>
              <div style={{ borderRadius: 10, background: "rgba(16,185,129,0.05)", padding: "12px 14px", border: "1px solid rgba(16,185,129,0.18)" }}>
                <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "rgba(5,150,105,0.65)", marginBottom: 10 }}>Typical Salary Range (India)</div>
                {[
                  { level: "Entry",  range: "₹6–10 LPA"  },
                  { level: "Mid",    range: "₹10–18 LPA" },
                  { level: "Senior", range: "₹18–28 LPA" },
                ].map((row, i) => (
                  <div key={row.level} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < 2 ? 8 : 4 }}>
                    <span className="font-body" style={{ fontSize: 12, color: "#374151", width: 44, flexShrink: 0 }}>{row.level}</span>
                    <div style={{ flex: 1, borderBottom: "1.5px dashed rgba(16,185,129,0.35)" }} />
                    <span className="font-heading font-medium" style={{ fontSize: 12, color: "#065f46", flexShrink: 0 }}>{row.range}</span>
                  </div>
                ))}
                <p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 8 }}>*Source: Glassdoor / LinkedIn / AmbitionBox 2025</p>
              </div>
            </div>

            {/* Job Roles */}
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 16, border: "1px solid rgba(6,148,209,0.18)", background: "#fff", padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ position: "absolute", inset: "0 0 auto", height: 2, background: "linear-gradient(to right,rgba(6,148,209,0.6),rgba(34,211,238,0.8),rgba(6,148,209,0.3))" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#0694D1,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 12px rgba(6,148,209,0.3)", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </div>
                <span className="font-heading font-medium" style={{ fontSize: 14, color: C.dark }}>Job Roles</span>
              </div>
              <ul style={{ display: "flex", flexDirection: "column" as const, gap: 7 }}>
                {["Power Platform Developer","Business Analyst","Solution Architect","Low-Code Developer","Automation Consultant","D365 Functional Consultant","Power BI Developer","RPA Developer","Enterprise Architect","CoE Admin"].map((role) => (
                  <li key={role} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#4a6375" }}>
                    <span style={{ flexShrink: 0, width: 16, height: 16, borderRadius: "50%", background: "rgba(6,148,209,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: C.accent }}>
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {role}
                  </li>
                ))}
              </ul>
            </div>

            {/* Companies Hiring */}
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 16, border: "1px solid #cffafe", background: "#fff", padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column" as const }}>
              <div style={{ position: "absolute", inset: "0 0 auto", height: 2, background: "linear-gradient(to right,rgba(34,211,238,0.6),rgba(56,189,248,0.8),rgba(34,211,238,0.3))" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#06b6d4,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 12px rgba(6,182,212,0.3)", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <span className="font-heading font-medium" style={{ fontSize: 14, color: C.dark }}>Companies Hiring</span>
              </div>
              <div style={{ flex: 1, display: "flex", flexWrap: "wrap" as const, gap: 8, alignContent: "flex-start" }}>
                {["Microsoft","Accenture","Deloitte","Infosys","TCS","Wipro","Capgemini","IBM","HCL","Cognizant","EY","PwC","KPMG","SAP","Oracle"].map((co) => (
                  <span key={co} style={{ fontSize: 11, fontWeight: 500, padding: "5px 12px", borderRadius: 999, background: "#ecfeff", border: "1px solid #a5f3fc", color: "#0e7490" }}>{co}</span>
                ))}
              </div>
              <p style={{ marginTop: 14, fontSize: 10, color: "#9CA3AF" }}>and 5,000+ organisations worldwide seeking Power Platform certified professionals</p>
            </div>

          </div>

          {/* 3 cards — mobile carousel */}
          <div className="co-cards-mobile">
            <div className="co-cards-track-wrap"
              onTouchStart={e => coOnDragStart(e.touches[0].clientX)}
              onTouchEnd={e => coOnDragEnd(e.changedTouches[0].clientX)}
              onMouseDown={e => coOnDragStart(e.clientX)}
              onMouseUp={e => coOnDragEnd(e.clientX)}
              onMouseLeave={e => { if (coDragStart.current !== null) coOnDragEnd(e.clientX); }}>
              <div className="co-cards-track" style={{ transform: `translateX(-${coSlide * 100}%)` }}>

                {/* Slide 1 — Salary Impact */}
                <div className="co-cards-slide">
                  <div style={{ position: "relative", overflow: "hidden", borderRadius: 16, border: "1px solid #d1fae5", background: "#fff", padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                    <div style={{ position: "absolute", inset: "0 0 auto", height: 2, background: "linear-gradient(to right,rgba(52,211,153,0.6),rgba(16,185,129,0.8),rgba(52,211,153,0.3))" }} />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#10b981,#34d399)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 12px rgba(16,185,129,0.3)", flexShrink: 0 }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </div>
                        <span className="font-heading font-medium" style={{ fontSize: 14, color: C.dark }}>Salary Impact</span>
                      </div>
                      <span className="font-heading font-medium" style={{ fontSize: 18, color: "#10b981" }}>+24%</span>
                    </div>
                    <p className="font-body" style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6, marginBottom: 14 }}>Average salary increase reported after obtaining a Power Platform certification</p>
                    <div style={{ borderRadius: 10, background: "rgba(16,185,129,0.05)", padding: "12px 14px", border: "1px solid rgba(16,185,129,0.18)" }}>
                      <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "rgba(5,150,105,0.65)", marginBottom: 10 }}>Typical Salary Range (India)</div>
                      {[{ level: "Entry", range: "₹6–10 LPA" }, { level: "Mid", range: "₹10–18 LPA" }, { level: "Senior", range: "₹18–28 LPA" }].map((row, i) => (
                        <div key={row.level} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < 2 ? 8 : 4 }}>
                          <span className="font-body" style={{ fontSize: 12, color: "#374151", width: 44, flexShrink: 0 }}>{row.level}</span>
                          <div style={{ flex: 1, borderBottom: "1.5px dashed rgba(16,185,129,0.35)" }} />
                          <span className="font-heading font-medium" style={{ fontSize: 12, color: "#065f46", flexShrink: 0 }}>{row.range}</span>
                        </div>
                      ))}
                      <p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 8 }}>*Source: Glassdoor / LinkedIn / AmbitionBox 2025</p>
                    </div>
                  </div>
                </div>

                {/* Slide 2 — Job Roles */}
                <div className="co-cards-slide">
                  <div style={{ position: "relative", overflow: "hidden", borderRadius: 16, border: "1px solid rgba(6,148,209,0.18)", background: "#fff", padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                    <div style={{ position: "absolute", inset: "0 0 auto", height: 2, background: "linear-gradient(to right,rgba(6,148,209,0.6),rgba(34,211,238,0.8),rgba(6,148,209,0.3))" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#0694D1,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 12px rgba(6,148,209,0.3)", flexShrink: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                      </div>
                      <span className="font-heading font-medium" style={{ fontSize: 14, color: C.dark }}>Job Roles</span>
                    </div>
                    <ul style={{ display: "flex", flexDirection: "column" as const, gap: 7 }}>
                      {["Power Platform Developer","Business Analyst","Solution Architect","Low-Code Developer","Automation Consultant","D365 Functional Consultant","Power BI Developer","RPA Developer","Enterprise Architect","CoE Admin"].map(role => (
                        <li key={role} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#4a6375" }}>
                          <span style={{ flexShrink: 0, width: 16, height: 16, borderRadius: "50%", background: "rgba(6,148,209,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: C.accent }}>
                            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </span>
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Slide 3 — Companies Hiring */}
                <div className="co-cards-slide">
                  <div style={{ position: "relative", overflow: "hidden", borderRadius: 16, border: "1px solid #cffafe", background: "#fff", padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                    <div style={{ position: "absolute", inset: "0 0 auto", height: 2, background: "linear-gradient(to right,rgba(34,211,238,0.6),rgba(56,189,248,0.8),rgba(34,211,238,0.3))" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#06b6d4,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 12px rgba(6,182,212,0.3)", flexShrink: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                      </div>
                      <span className="font-heading font-medium" style={{ fontSize: 14, color: C.dark }}>Companies Hiring</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
                      {["Microsoft","Accenture","Deloitte","Infosys","TCS","Wipro","Capgemini","IBM","HCL","Cognizant","EY","PwC","KPMG","SAP","Oracle"].map(co => (
                        <span key={co} style={{ fontSize: 11, fontWeight: 500, padding: "5px 12px", borderRadius: 999, background: "#ecfeff", border: "1px solid #a5f3fc", color: "#0e7490" }}>{co}</span>
                      ))}
                    </div>
                    <p style={{ marginTop: 14, fontSize: 10, color: "#9CA3AF" }}>and 5,000+ organisations worldwide seeking Power Platform certified professionals</p>
                  </div>
                </div>

              </div>
            </div>
            <div className="co-cards-nav">
              <button className="co-cards-nav-btn" disabled={coSlide === 0} onClick={() => setCoSlide(s => s - 1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <span className="co-cards-nav-count">{coSlide + 1} / 3</span>
              <button className="co-cards-nav-btn" disabled={coSlide === 2} onClick={() => setCoSlide(s => s + 1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── Core Components / Dataverse & Connectors — always visible tabbed section ── */}
      <div>
        {/* Tab switcher bar — #f0f5fb bg matches vendor page exactly */}
        <div style={{ background: '#f0f5fb', borderTop: '1px solid rgba(6,148,209,0.1)', padding: '30px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div className="co-tab-shimmer-border">
            <div className="co-tab-shimmer-inner">
              <button
                onClick={() => setActiveTab("core")}
                style={{
                  padding: '11px 28px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 700, transition: 'all 0.22s',
                  background: activeTab === "core" ? 'linear-gradient(135deg,#0694D1 0%,#22d3ee 100%)' : 'rgba(6,148,209,0.07)',
                  color: activeTab === "core" ? '#fff' : '#4a6375',
                  boxShadow: activeTab === "core" ? '0 4px 18px rgba(6,148,209,0.38)' : 'none',
                }}
              >
                Core Components
              </button>
              <button
                onClick={() => setActiveTab("dataverse")}
                style={{
                  padding: '11px 28px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 700, transition: 'all 0.22s',
                  background: activeTab === "dataverse" ? 'linear-gradient(135deg,#0694D1 0%,#22d3ee 100%)' : 'rgba(6,148,209,0.07)',
                  color: activeTab === "dataverse" ? '#fff' : '#4a6375',
                  boxShadow: activeTab === "dataverse" ? '0 4px 18px rgba(6,148,209,0.38)' : 'none',
                }}
              >
                Dataverse &amp; Connectors
              </button>
            </div>
          </div>
          <p style={{ fontSize: 13.5, color: '#6b8299', margin: 0 }}>
            {activeTab === "core"
              ? "The five tools that power every low-code solution on the platform"
              : "The data backbone and integration layer that connects everything"}
          </p>
        </div>

        {/* Tab content — dark navy bg matching edge-sec exactly */}
        <div style={{ background: '#001523', padding: '15px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
            {activeTab === "core" && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 15 }}>
                {coreComponents.map((comp, i) => (
                  <div key={comp.name} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '15px', borderRadius: 10, border: '1px solid transparent', background: 'transparent', transition: 'border-color 0.2s, background 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(58,182,235,0.18)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(58,182,235,0.04)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'transparent'; (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                  >
                    <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.3)' }}>
                      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(58,182,235,0.8)' }}>0{i + 1}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 15, lineHeight: 1.3 }}>{comp.name}</div>
                      <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{comp.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "dataverse" && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 2 }}>
                {[
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3AB6EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>,
                    title: "Microsoft Dataverse",
                    desc: "Cloud-based data platform providing standardized schema, row-level security, and business logic — the shared data layer for all Power Platform apps and Dynamics 365.",
                    tags: ["Standardized Schema", "Row-level Security", "Business Rules", "Custom APIs", "Dual-write with D365"],
                  },
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3AB6EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
                    title: "400+ Pre-built Connectors",
                    desc: "Bridge Power Platform with Salesforce, SAP, SQL Server, SharePoint, and hundreds more enterprise systems — no custom middleware needed.",
                    tags: ["Microsoft 365", "Salesforce", "SAP", "SQL Server", "SharePoint", "Custom Connectors"],
                  },
                ].map((item) => (
                  <div key={item.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 18px', borderRadius: 10, border: '1px solid transparent', background: 'transparent', transition: 'border-color 0.2s, background 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(58,182,235,0.18)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(58,182,235,0.04)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'transparent'; (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                  >
                    <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.3)' }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 5, lineHeight: 1.3 }}>{item.title}</div>
                      <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{item.desc}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
                        {item.tags.map(tag => (
                          <span key={tag} style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: 'rgba(58,182,235,0.1)', color: '#3AB6EB', border: '1px solid rgba(58,182,235,0.2)' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

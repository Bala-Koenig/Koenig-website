"use client";
import { useEffect, useRef, useState } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF", bg: "#041825" };

const IconCodeBrackets = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>);
const IconBarChart = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>);
const IconUsers = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const IconLightning = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>);
const IconLayers = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>);
const IconGear = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>);
const IconBriefcase = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>);

const careers = [
  {
    role: "Power Platform Developer",    icon: <IconCodeBrackets />,
    salaryRange: "$85K – $130K",  demand: "Very High", growth: "+28% YoY",
    skills: ["Power Apps","Power Automate","PCF","Dataverse"],
    desc: "Build custom enterprise apps, automations, and integrations. High demand in digital transformation projects.",
  },
  {
    role: "Power BI Data Analyst",       icon: <IconBarChart />,
    salaryRange: "$75K – $115K",  demand: "Very High", growth: "+35% YoY",
    skills: ["Power BI","DAX","SQL","Azure Synapse"],
    desc: "Transform raw data into compelling visualizations and insights. Critical role in every data-driven organization.",
  },
  {
    role: "Power Platform Consultant",   icon: <IconUsers />,
    salaryRange: "$90K – $140K",  demand: "High",      growth: "+22% YoY",
    skills: ["Solution Design","PL-200","Dynamics 365","Change Mgmt"],
    desc: "Guide enterprises in Power Platform adoption, architecture, and best practices implementation.",
  },
  {
    role: "RPA / Automation Engineer",   icon: <IconLightning />,
    salaryRange: "$80K – $120K",  demand: "High",      growth: "+40% YoY",
    skills: ["Power Automate","Desktop Flows","RPA","Process Mining"],
    desc: "Design and deploy robotic process automation solutions to eliminate manual, repetitive business tasks.",
  },
  {
    role: "Solution Architect",          icon: <IconLayers />,
    salaryRange: "$120K – $170K", demand: "High",      growth: "+18% YoY",
    skills: ["PL-600","Azure","Dataverse","ALM & DevOps"],
    desc: "Design end-to-end enterprise solutions on the Power Platform. Senior leadership role with premium compensation.",
  },
  {
    role: "Microsoft 365 Admin",         icon: <IconGear />,
    salaryRange: "$70K – $105K",  demand: "Steady",    growth: "+15% YoY",
    skills: ["Admin Center","Security","Governance","CoE Toolkit"],
    desc: "Manage Power Platform environments, licensing, security, and governance across the organization.",
  },
];

const certifications = [
  { code: "PL-900", name: "Fundamentals",          level: "Entry"     },
  { code: "PL-100", name: "App Maker",              level: "Associate" },
  { code: "PL-200", name: "Functional Consultant",  level: "Associate" },
  { code: "PL-300", name: "Data Analyst",           level: "Associate" },
  { code: "PL-400", name: "Developer",              level: "Associate" },
  { code: "PL-600", name: "Solution Architect",     level: "Expert"    },
];

export default function CareerPaths() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const dragStart = useRef<number | null>(null);
  const total = careers.length;

  const onDragStart = (x: number) => { dragStart.current = x; };
  const onDragEnd   = (x: number) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - x;
    if (Math.abs(diff) > 40) setSlide(s => diff > 0 ? Math.min(s + 1, total - 1) : Math.max(s - 1, 0));
    dragStart.current = null;
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
    <section
      id="careers"
      ref={sectionRef}
      className="relative py-[30px] overflow-hidden"
      style={{ backgroundColor: C.bg }}
      aria-labelledby="careers-heading"
    >
      <div className="absolute inset-0 blueprint-bg opacity-40" />
      <div className="absolute top-0 left-0 w-1/2 h-full radial-glow-accent opacity-12 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-[16px]">

        {/* Header */}
        <div className="animate-on-scroll text-center max-w-3xl mx-auto mb-14">
          <span className="section-badge mb-5 inline-flex"><IconBriefcase /> Career Paths</span>
          <h2 id="careers-heading" className="font-heading font-bold leading-tight mb-5" style={{ color: C.light, fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.4 }}>
            High-Demand{" "}
            <span className="text-shimmer">Career Opportunities</span>
          </h2>
          <p className="font-body text-lg leading-relaxed" style={{ color: "rgba(228,247,255,0.55)" }}>
            Power Platform certifications unlock well-paid, future-proof roles across industries.
          </p>
        </div>

        <style suppressHydrationWarning>{`
          .cp-desktop-grid { display: grid; }
          .cp-mobile-carousel { display: none; }
          @media(max-width:700px) {
            .cp-desktop-grid { display: none !important; }
            .cp-mobile-carousel { display: block; margin-bottom: 40px; }
            .cp-track-wrap { overflow: hidden; }
            .cp-track { display: flex; transition: transform 0.35s cubic-bezier(0.25,1,0.5,1); }
            .cp-slide { flex: 0 0 100%; width: 100%; box-sizing: border-box; }
            .cp-nav { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 16px; }
            .cp-nav-btn { width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid rgba(6,148,209,0.35); background: rgba(6,148,209,0.08); color: #0694D1; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
            .cp-nav-btn:hover { background: rgba(6,148,209,0.2); }
            .cp-nav-btn:disabled { opacity: 0.35; cursor: default; }
            .cp-nav-count { font-size: 13px; font-weight: 700; color: rgba(228,247,255,0.6); min-width: 40px; text-align: center; }
          }
        `}</style>

        {/* Career cards — Desktop grid */}
        <div className="animate-on-scroll cp-desktop-grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {careers.map((career, i) => (
            <div key={career.role} className="group rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden"
              style={{ backgroundColor: "rgba(9,49,72,0.45)", backdropFilter: "blur(12px)", borderColor: "rgba(6,148,209,0.12)", transitionDelay: `${0.05 * i}s` }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(6,148,209,0.06) 0%, rgba(228,247,255,0.01) 100%)" }} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span>{career.icon}</span>
                  <span className="text-xs font-heading font-medium px-2.5 py-1 rounded-full border" style={{ backgroundColor: "rgba(6,148,209,0.1)", borderColor: "rgba(6,148,209,0.22)", color: "#60CEFA" }}>{career.demand}</span>
                </div>
                <h3 className="font-heading font-medium text-base mb-1" style={{ color: C.light }}>{career.role}</h3>
                <p className="text-sm font-body mb-4 leading-relaxed" style={{ color: "rgba(228,247,255,0.55)" }}>{career.desc}</p>
                <div className="flex items-center justify-between mb-4 p-3 rounded-xl" style={{ backgroundColor: "rgba(6,148,209,0.07)", border: "1px solid rgba(6,148,209,0.12)" }}>
                  <div><p className="text-xs font-body" style={{ color: "rgba(228,247,255,0.4)" }}>Avg. Salary</p><p className="font-heading font-medium text-sm" style={{ color: "#4ADE80" }}>{career.salaryRange}</p></div>
                  <div className="text-right"><p className="text-xs font-body" style={{ color: "rgba(228,247,255,0.4)" }}>Job Growth</p><p className="font-heading font-medium text-sm" style={{ color: C.accent }}>{career.growth}</p></div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {career.skills.map(skill => <span key={skill} className="text-xs font-body px-2 py-0.5 rounded-lg border" style={{ backgroundColor: "rgba(228,247,255,0.04)", borderColor: "rgba(228,247,255,0.08)", color: "rgba(228,247,255,0.55)" }}>{skill}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Career cards — Mobile carousel */}
        <div className="animate-on-scroll cp-mobile-carousel">
          <div className="cp-track-wrap" style={{ userSelect: "none", cursor: "grab" }}
            onTouchStart={e => onDragStart(e.touches[0].clientX)}
            onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}
            onMouseDown={e => onDragStart(e.clientX)}
            onMouseUp={e => onDragEnd(e.clientX)}
            onMouseLeave={e => { if (dragStart.current !== null) onDragEnd(e.clientX); }}>
            <div className="cp-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
              {careers.map((career) => (
                <div key={career.role} className="cp-slide">
                  <div className="rounded-2xl p-6 border relative overflow-hidden" style={{ backgroundColor: "rgba(9,49,72,0.45)", backdropFilter: "blur(12px)", borderColor: "rgba(6,148,209,0.12)" }}>
                    <div className="flex items-start justify-between mb-4">
                      <span>{career.icon}</span>
                      <span className="text-xs font-heading font-medium px-2.5 py-1 rounded-full border" style={{ backgroundColor: "rgba(6,148,209,0.1)", borderColor: "rgba(6,148,209,0.22)", color: "#60CEFA" }}>{career.demand}</span>
                    </div>
                    <h3 className="font-heading font-medium text-base mb-1" style={{ color: C.light }}>{career.role}</h3>
                    <p className="text-sm font-body mb-4 leading-relaxed" style={{ color: "rgba(228,247,255,0.55)" }}>{career.desc}</p>
                    <div className="flex items-center justify-between mb-4 p-3 rounded-xl" style={{ backgroundColor: "rgba(6,148,209,0.07)", border: "1px solid rgba(6,148,209,0.12)" }}>
                      <div><p className="text-xs font-body" style={{ color: "rgba(228,247,255,0.4)" }}>Avg. Salary</p><p className="font-heading font-medium text-sm" style={{ color: "#4ADE80" }}>{career.salaryRange}</p></div>
                      <div className="text-right"><p className="text-xs font-body" style={{ color: "rgba(228,247,255,0.4)" }}>Job Growth</p><p className="font-heading font-medium text-sm" style={{ color: C.accent }}>{career.growth}</p></div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {career.skills.map(skill => <span key={skill} className="text-xs font-body px-2 py-0.5 rounded-lg border" style={{ backgroundColor: "rgba(228,247,255,0.04)", borderColor: "rgba(228,247,255,0.08)", color: "rgba(228,247,255,0.55)" }}>{skill}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cp-nav">
            <button className="cp-nav-btn" disabled={slide === 0} onClick={() => setSlide(s => s - 1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span className="cp-nav-count">{slide + 1} / {total}</span>
            <button className="cp-nav-btn" disabled={slide === total - 1} onClick={() => setSlide(s => s + 1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        {/* Cert roadmap */}
        <div className="animate-on-scroll" style={{ transitionDelay: "0.15s" }}>
          <div className="text-center mb-10">
            <h2 className="font-heading font-medium text-2xl" style={{ color: C.light }}>
              Certification <span className="text-shimmer">Roadmap</span>
            </h2>
            <p className="text-sm font-body mt-1" style={{ color: "rgba(228,247,255,0.4)" }}>All certifications covered in this program</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, i) => (
              <div
                key={cert.code}
                className="group text-center rounded-2xl p-4 border transition-all duration-300"
                style={{
                  backgroundColor: "rgba(9,49,72,0.4)",
                  backdropFilter: "blur(10px)",
                  borderColor: "rgba(6,148,209,0.12)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: i === 5
                      ? `linear-gradient(135deg, ${C.accent}, #2BB8F0)`
                      : `linear-gradient(135deg, ${C.dark}, ${C.accent})`,
                    boxShadow: "0 4px 14px rgba(6,148,209,0.2)",
                  }}
                >
                  <span className="font-heading font-medium text-white text-xs">{cert.code.slice(3)}</span>
                </div>
                <p className="font-heading font-medium text-sm mb-1" style={{ color: C.accent }}>{cert.code}</p>
                <p className="text-xs font-body leading-snug" style={{ color: "rgba(228,247,255,0.55)" }}>{cert.name}</p>
                <span className="mt-1.5 inline-block text-xs font-body" style={{ color: "rgba(228,247,255,0.3)" }}>{cert.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

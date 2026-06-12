"use client";
import { useState, useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const modules = [
  { id: 1, title: "Module 1: Power Platform Fundamentals (PL-900)", duration: "1 Day • 8 Hours", tag: "Foundation", topics: ["Introduction to Microsoft Power Platform ecosystem","Power Apps: Canvas apps vs. Model-driven apps","Power Automate: Flows, connectors, and triggers","Power BI: Reports, dashboards, and datasets","Power Virtual Agents: Chatbot fundamentals","Dataverse: Common data model and tables","AI Builder: Pre-built and custom AI models","Security, compliance, and governance in Power Platform"] },
  { id: 2, title: "Module 2: Power Apps — Building Business Applications (PL-100 / PL-200)", duration: "2 Days • 16 Hours", tag: "Intermediate", topics: ["Canvas App design: Screens, controls, and navigation","Working with data sources and connectors","Formulas, functions, and expressions in Power Apps","Model-driven app configuration and customization","Dataverse: Advanced tables, relationships, and views","Business rules, calculated columns, and rollup fields","Publishing, sharing, and managing apps","Integration with Microsoft Teams and SharePoint"] },
  { id: 3, title: "Module 3: Power Automate — Workflow & RPA (PL-200)", duration: "1 Day • 8 Hours", tag: "Intermediate", topics: ["Cloud flows: Automated, scheduled, and instant","Using 400+ connectors and premium actions","Approval workflows and human-in-the-loop patterns","Exception handling and error management","Desktop flows and Robotic Process Automation (RPA)","UI automation and screen scraping techniques","Process Advisor: Mining and optimizing workflows","Business Process Flows in Dataverse"] },
  { id: 4, title: "Module 4: Power BI — Data Analytics & Visualization (PL-300)", duration: "1.5 Days • 12 Hours", tag: "Analytics", topics: ["Power BI Desktop: Importing and transforming data","Power Query M language for data transformation","DAX fundamentals: Measures, calculated columns, KPIs","Advanced DAX: Time intelligence and filter context","Interactive reports: Charts, slicers, and bookmarks","Power BI Service: Publishing and collaboration","Row-level security and data governance","Embedding Power BI in apps and Teams"] },
  { id: 5, title: "Module 5: Power Virtual Agents & Copilot Studio", duration: "0.5 Day • 4 Hours", tag: "AI & Bots", topics: ["Copilot Studio: Building AI-powered chatbots","Topics, entities, and conversation design","Integrating chatbots with Power Automate","Natural Language Processing (NLP) configuration","Deploying bots to Teams, websites, and mobile","Analytics and performance monitoring for bots"] },
  { id: 6, title: "Module 6: Advanced Development & DevOps (PL-400)", duration: "1 Day • 8 Hours", tag: "Advanced", topics: ["Custom connectors: Building and deploying APIs","PCF (PowerApps Component Framework) controls","Plugins, custom workflow activities, and Web API","Solution management, ALM, and source control","Azure DevOps pipelines for Power Platform","Power Platform CLI and automation tools","Performance optimization and capacity planning","Enterprise architecture patterns and governance models"] },
];

export default function Curriculum() {
  const [openId, setOpenId] = useState<number | null>(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="curriculum" ref={sectionRef} className="py-24 bg-white overflow-hidden" aria-labelledby="curriculum-heading">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(6,148,209,0.15), transparent)` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-on-scroll text-center max-w-3xl mx-auto mb-12">
          <span className="section-badge mb-5 inline-flex"><svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{display:'inline',verticalAlign:'middle'}}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><rect x="9" y="3" width="6" height="4" rx="1" stroke="#0694D1" strokeWidth="1.8"/><path d="M9 14l2 2 4-4" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> Curriculum</span>
          <h2 id="curriculum-heading" className="font-heading font-medium text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight mb-5" style={{ color: C.dark }}>
            Comprehensive{" "}
            <span className="text-shimmer-dark">Course Curriculum</span>
          </h2>
          <p className="font-body text-base leading-relaxed" style={{ color: "#6B7280" }}>
            A structured learning path from fundamentals to advanced enterprise development, covering all five Microsoft Power Platform certification tracks.
          </p>
        </div>

        {/* Summary pills */}
        <div className="animate-on-scroll grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[{ v: "6", l: "Core Modules" },{ v: "56+", l: "Training Hours" },{ v: "6", l: "Certifications" },{ v: "15+", l: "Hands-on Labs" }].map((s) => (
            <div key={s.l} className="rounded-xl p-4 text-center border" style={{ backgroundColor: C.light + "40", borderColor: "rgba(6,148,209,0.2)" }}>
              <p className="font-heading font-medium text-2xl mb-1" style={{ color: C.dark }}>{s.v}</p>
              <p className="text-xs font-body" style={{ color: "#64748B" }}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div className="animate-on-scroll space-y-3" style={{ transitionDelay: "0.08s" }}>
          {modules.map((mod, i) => {
            const isOpen = openId === mod.id;
            return (
              <div
                key={mod.id}
                className="rounded-2xl border overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: isOpen ? "#F0F9FF" : "#fff",
                  borderColor: isOpen ? "rgba(6,148,209,0.4)" : "#E5E7EB",
                  boxShadow: isOpen ? "0 4px 20px rgba(6,148,209,0.08)" : "none",
                }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : mod.id)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-heading font-medium text-sm transition-all duration-300"
                    style={isOpen ? { background: `linear-gradient(135deg, ${C.dark}, ${C.accent})`, color: "#fff" } : { backgroundColor: C.light, color: C.dark }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-medium text-sm sm:text-base leading-snug mb-1" style={{ color: C.dark }}>{mod.title}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-heading font-medium px-2.5 py-0.5 rounded-full border" style={{ backgroundColor: C.light, borderColor: "rgba(6,148,209,0.3)", color: C.accent }}>{mod.tag}</span>
                      <span className="text-xs font-body flex items-center gap-1" style={{ color: "#94A3B8" }}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {mod.duration}
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: isOpen ? "rgba(6,148,209,0.1)" : "#F8FAFC", color: isOpen ? C.accent : "#94A3B8", transform: isOpen ? "rotate(180deg)" : "none" }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>

                <div className="accordion-content" style={{ maxHeight: isOpen ? "600px" : "0" }}>
                  <div className="px-6 pb-6">
                    <div className="pl-4" style={{ borderLeft: `2px solid rgba(6,148,209,0.3)` }}>
                      <ul className="space-y-2.5">
                        {mod.topics.map((topic, ti) => (
                          <li key={ti} className="flex items-start gap-3 text-sm font-body" style={{ color: "#374151" }}>
                            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: C.accent }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Syllabus CTA */}
        <div
          className="animate-on-scroll mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 p-6 rounded-2xl border text-center"
          style={{ backgroundColor: "#F0F9FF", borderColor: "rgba(6,148,209,0.2)", borderStyle: "dashed", transitionDelay: "0.15s" }}
          id="syllabus"
        >
          <div>
            <p className="font-heading font-medium mb-1" style={{ color: C.dark }}>Want the complete detailed syllabus?</p>
            <p className="text-sm font-body" style={{ color: "#64748B" }}>Download the full PDF with lab exercises, prerequisites, and exam objectives.</p>
          </div>
          <a href="#contact" className="btn-primary flex-shrink-0 text-sm px-5 py-2.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download Full Syllabus
          </a>
        </div>
      </div>
    </section>
  );
}

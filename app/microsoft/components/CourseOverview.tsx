"use client";
import { useState, useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };


const personas = [
  { role: "Developers", tag: "Technical", bullets: ["Custom connectors", "Plugin dev", "ALM"],
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M8 6l-6 6 6 6M16 6l6 6-6 6" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { role: "Business Analysts", tag: "Strategy", bullets: ["Process mapping", "Automate flows", "Data modeling"],
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#0694D1" strokeWidth="1.8" /><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#0694D1" strokeWidth="1.8" /><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#0694D1" strokeWidth="1.8" /><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#0694D1" strokeWidth="1.8" /></svg> },
  { role: "IT Managers", tag: "Governance", bullets: ["DLP policies", "CoE toolkit", "Env strategy"],
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 2L3 7v6c0 5.25 3.83 10.15 9 11.25 5.17-1.1 9-6 9-11.25V7l-9-5z" stroke="#0694D1" strokeWidth="1.8" /><path d="M9 12l2 2 4-4" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { role: "Data Analysts", tag: "Analytics", bullets: ["DAX formulas", "Power BI", "Dataflows"],
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M4 20V10M9 20V6M14 20V12M19 20V8" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" /><path d="M2 20h20" stroke="#0694D1" strokeWidth="1.5" /></svg> },
  { role: "Project Managers", tag: "Delivery", bullets: ["Architecture", "Demos", "Deployment"],
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#0694D1" strokeWidth="1.8" /><path d="M3 10h18" stroke="#0694D1" strokeWidth="1.8" /><path d="M8 14h4M8 17h6" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" /></svg> },
  { role: "Students", tag: "Beginners", bullets: ["Fundamentals", "Portfolio", "Cert prep"],
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 3L1 9l11 6 9-4.91V17" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 13.18v4.26C5 19.82 8.13 22 12 22s7-2.18 7-4.56v-4.26" stroke="#0694D1" strokeWidth="1.8" /></svg> },
];

const coreComponents = [
  { name: "Power Apps", desc: "A low-code application development platform that allows users to build custom web and mobile apps tailored to specific business needs — from simple data-entry tools to complex multi-screen line-of-business applications.", bestFor: "Digitizing manual processes like inspections, expense approvals, or inventory management.", caveat: "Caveat:", caveatText: "Canvas apps can become difficult to maintain at scale without proper naming conventions and architecture planning." },
  { name: "Power Automate", desc: "An intelligent workflow automation engine that connects apps and services to eliminate repetitive tasks. It supports everything from simple approval flows to complex, multi-step business process automations with conditional logic.", bestFor: "Routing approvals, syncing data between systems, and automating notifications across Microsoft 365 and third-party services.", caveat: "Risk:", caveatText: "Poorly designed flows can create unintended loops or excessive API calls, potentially hitting service limits." },
  { name: "Power BI", desc: "A business analytics and data visualization platform for creating interactive dashboards and reports from virtually any data source — transforming raw data into actionable insights.", bestFor: "Transforming raw data from multiple sources into interactive dashboards, KPI reports, and self-service analytics.", caveat: "Caveat:", caveatText: "Complex DAX calculations and large data models require careful optimization to avoid slow report performance." },
  { name: "Power Pages", desc: "A low-code platform for creating secure, data-rich, external-facing business websites and portals — ideal for extending Dataverse data to external users.", bestFor: "Customer self-service portals, partner portals, community forums, and secure data-sharing sites.", caveat: "Risk:", caveatText: "Security misconfiguration can expose internal data to external users if table permissions are not carefully designed." },
  { name: "Copilot Studio", desc: "An AI-driven platform for building intelligent copilots and chatbots using a no-code graphical interface — powered by large language models and deeply integrated with Microsoft services.", bestFor: "Internal helpdesk bots, customer service agents, guided sales assistants, and knowledge-base retrieval systems.", caveat: "Caveat:", caveatText: "AI-generated responses require careful monitoring and guardrails to prevent hallucinations in production environments." },
];

export default function CourseOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="overview" ref={sectionRef} className="relative py-[60px] bg-white" aria-labelledby="overview-heading">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(6,148,209,0.2), transparent)` }} />


      <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px]">

        {/* ── Two-col: Content left + Image right ──────────── */}
        <div className="grid lg:grid-cols-5 gap-[40px] lg:gap-[60px] items-start mb-[48px]">

          {/* Left — content (3/5) */}
          <div className="lg:col-span-3 animate-on-scroll">
            <span className="section-badge mb-[16px] inline-flex" style={{ backgroundColor: "rgba(6,148,209,0.08)", borderColor: "rgba(6,148,209,0.2)", color: C.accent }}><svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{display:'inline',verticalAlign:'middle'}}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> Course Overview</span>
            <h2 id="overview-heading" className="font-heading font-medium text-[28px] sm:text-[34px] leading-tight mb-[20px]" style={{ color: C.dark }}>
              What is{" "}
              <span className="text-shimmer-dark">Microsoft Power Platform?</span>
            </h2>

            {/* Dynamic content area — designed for backend data */}
            <div className="font-body text-[16px] leading-[1.8] space-y-[14px]" style={{ color: "#374151" }}>
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

            {/* Expandable content */}
            <div className="overflow-hidden transition-all duration-700 ease-in-out" style={{ maxHeight: expanded ? "3000px" : "0" }}>
              <div className="space-y-[24px] pt-[20px]">

                {/* Core Components */}
                <h3 className="font-heading font-medium text-[20px]" style={{ color: C.dark }}>Core Components</h3>
                <div className="space-y-[12px]">
                  {coreComponents.map((comp) => (
                    <div key={comp.name} className="rounded-[12px] p-[18px] border" style={{ backgroundColor: "#FAFCFF", borderColor: "#E8EDF2" }}>
                      <h4 className="font-heading font-medium text-[15px] mb-[6px]" style={{ color: C.dark }}>{comp.name}</h4>
                      <p className="font-body text-[14px] leading-[1.6] mb-[8px]" style={{ color: "#374151" }}>{comp.desc}</p>
                      <div className="flex flex-wrap gap-[8px]">
                        <span className="text-[12px] font-heading font-medium px-[10px] py-[3px] rounded-full" style={{ backgroundColor: "rgba(6,148,209,0.08)", color: C.accent }}>Best for: {comp.bestFor.split(".")[0]}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dataverse */}
                <div>
                  <h3 className="font-heading font-medium text-[20px] mb-[10px]" style={{ color: C.dark }}>Dataverse & Connectors</h3>
                  <p className="font-body text-[16px] leading-[1.7] mb-[10px]" style={{ color: "#374151" }}>
                    <strong style={{ color: C.dark }}>Microsoft Dataverse</strong> is a cloud-based data platform providing standardized schema, security, and business logic. <strong style={{ color: C.dark }}>400+ pre-built connectors</strong> bridge Power Platform with Salesforce, SAP, SQL Server, SharePoint and more.
                  </p>
                </div>

                {/* Why Training */}
                <div>
                  <h3 className="font-heading font-medium text-[20px] mb-[12px]" style={{ color: C.dark }}>Why Formal Training?</h3>
                  <div className="space-y-[10px]" style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: "18px" }}>
                    {[
                      { label: "Navigating Complexity", text: "Enterprise-wide solutions require deep architecture, optimization, and ALM knowledge." },
                      { label: "Governance & Security", text: "Training instills DLP policies, CoE practices, and secure development guardrails." },
                      { label: "Maximizing ROI", text: "Expert-led training unlocks the full feature set for significantly higher returns." },
                      { label: "Fusion Development", text: "Bridges business users and IT developers with a common language and skillset." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-[12px]">
                        <span className="flex-shrink-0 w-[24px] h-[24px] rounded-full flex items-center justify-center text-[11px] font-heading font-medium text-white mt-[2px]" style={{ backgroundColor: C.accent }}>{i + 1}</span>
                        <div>
                          <p className="font-heading font-medium text-[14px]" style={{ color: C.dark }}>{item.label}</p>
                          <p className="font-body text-[13px] leading-[1.5]" style={{ color: "#6B7280" }}>{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Show More / Less */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-[18px] flex items-center gap-[8px] px-[18px] py-[9px] rounded-full border text-[13px] font-heading font-medium transition-all duration-300 hover:shadow-sm"
              style={{ borderColor: "rgba(6,148,209,0.3)", color: C.accent, backgroundColor: "rgba(6,148,209,0.04)" }}
            >
              {expanded ? "Show Less" : "Show More"}
              <svg className="w-[14px] h-[14px] transition-transform duration-300" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Right — Image + quick info (2/5) */}
          <div className="lg:col-span-2 hidden lg:block" style={{ position: "sticky", top: "90px", alignSelf: "start" }}>
            {/* Tech image */}
            <div className="rounded-[18px] overflow-hidden border mb-[20px]" style={{ borderColor: "#E8EDF2", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=560&h=380&fit=crop&q=80"
                alt="Technology training — Microsoft Power Platform certification"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "3/2" }}
              />
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-[10px] mb-[16px]">
              {[
                { value: "40K+", label: "Professionals Trained", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#0694D1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="#0694D1" strokeWidth="1.6"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#0694D1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { value: "98%", label: "Exam Pass Rate", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><path d="M12 2L3 7v6c0 5.25 3.83 10.15 9 11.25 5.17-1.1 9-6 9-11.25V7l-9-5z" stroke="#0694D1" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { value: "150+", label: "Countries Reached", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><circle cx="12" cy="12" r="10" stroke="#0694D1" strokeWidth="1.6"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="#0694D1" strokeWidth="1.6"/></svg> },
                { value: "4.9★", label: "Learner Rating", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" stroke="#0694D1" strokeWidth="1.6" strokeLinejoin="round"/></svg> },
              ].map((s) => (
                <div key={s.label} className="group flex items-center gap-[12px] px-[16px] py-[14px] rounded-[14px] border transition-all duration-200 hover:shadow-sm hover:-translate-y-[1px]" style={{ backgroundColor: "#fff", borderColor: "#E2E8F0" }}>
                  <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: "rgba(6,148,209,0.08)", border: "1px solid rgba(6,148,209,0.15)" }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="font-heading font-medium text-[18px] leading-none" style={{ color: C.dark }}>{s.value}</p>
                    <p className="font-body text-[12px] mt-[3px]" style={{ color: "#94A3B8" }}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="#contact" className="flex items-center justify-center gap-[8px] w-full py-[13px] rounded-[12px] text-[14px] font-heading font-medium text-white transition-all duration-200 hover:-translate-y-[1px]"
              style={{ backgroundColor: C.accent, boxShadow: "0 4px 16px rgba(6,148,209,0.3)" }}>
              <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Talk to an Expert
            </a>
          </div>
        </div>

        {/* ── Why Learn + Who Should Attend — merged ───── */}
        <div className="animate-on-scroll text-center mb-[36px]">
          <span className="section-badge mb-[14px] inline-flex" style={{ backgroundColor: "rgba(6,148,209,0.08)", borderColor: "rgba(6,148,209,0.2)", color: C.accent }}><svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{display:'inline',verticalAlign:'middle'}}><path d="M9 18h6M10 22h4M12 2a7 7 0 015 11.9V16a1 1 0 01-1 1H8a1 1 0 01-1-1v-2.1A7 7 0 0112 2z" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> Why Learn & Who Is This For?</span>
          <h2 className="font-heading font-medium text-[28px] sm:text-[32px]" style={{ color: C.dark }}>
            Power Platform is a <span className="text-shimmer-dark">Career Game-Changer</span>
          </h2>
          <p className="font-body text-[15px] mt-[8px] max-w-[520px] mx-auto" style={{ color: "#6B7280" }}>
            Whether you&apos;re technical or non-technical — unlock new career paths with globally recognized certifications.
          </p>
        </div>

        {/* Why Learn — compact horizontal pills */}
        <div className="animate-on-scroll flex flex-wrap justify-center gap-[10px] mb-[32px]" style={{ transitionDelay: "0.04s" }}>
          {[
            { icon: <svg viewBox="0 0 20 20" fill="none" className="w-[14px] h-[14px]"><path d="M3 14l5-5 3 3 6-6" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: "High Market Demand" },
            { icon: <svg viewBox="0 0 20 20" fill="none" className="w-[14px] h-[14px]"><path d="M8 14h4M10 3v1m5 1.5l-.6.6M16 10h1M3 10h1M5.5 5.5l.6.6M7 13a4 4 0 116 0" stroke="#0694D1" strokeWidth="1.6" strokeLinecap="round"/></svg>, text: "Low-Code Revolution" },
            { icon: <svg viewBox="0 0 20 20" fill="none" className="w-[14px] h-[14px]"><path d="M3 14l5-5 3 3 6-6M14 6h3v3" stroke="#0694D1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: "40-70% Cost Reduction" },
            { icon: <svg viewBox="0 0 20 20" fill="none" className="w-[14px] h-[14px]"><circle cx="10" cy="10" r="3" stroke="#0694D1" strokeWidth="1.6"/><path d="M10 2v3M10 15v3M2 10h3M15 10h3" stroke="#0694D1" strokeWidth="1.4" strokeLinecap="round"/></svg>, text: "5 Tools, 1 Platform" },
            { icon: <svg viewBox="0 0 20 20" fill="none" className="w-[14px] h-[14px]"><circle cx="10" cy="8" r="5" stroke="#0694D1" strokeWidth="1.6"/><path d="M7.5 12.5V17l2.5-1.5L12.5 17v-4.5" stroke="#0694D1" strokeWidth="1.4" strokeLinejoin="round"/></svg>, text: "Microsoft-Backed Certs" },
            { icon: <svg viewBox="0 0 20 20" fill="none" className="w-[14px] h-[14px]"><path d="M14 17v-1.5a3 3 0 00-3-3H5.5a3 3 0 00-3 3V17M8.25 9a3 3 0 100-6 3 3 0 000 6zM18 17v-1.5a3 3 0 00-2.25-2.9M13 3.1a3 3 0 010 5.8" stroke="#0694D1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: "400+ Integrations" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-[8px] px-[14px] py-[8px] rounded-full border transition-all duration-200 hover:-translate-y-[1px] hover:shadow-sm"
              style={{ backgroundColor: "#fff", borderColor: "#E2E8F0" }}>
              <div className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center" style={{ backgroundColor: "rgba(6,148,209,0.08)" }}>
                {item.icon}
              </div>
              <span className="font-heading font-medium text-[12px]" style={{ color: C.dark }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Who Should Attend — persona cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[14px]">
          {personas.map((p, i) => (
            <div
              key={p.role}
              className="animate-on-scroll group relative rounded-[14px] p-[20px] border overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:shadow-md"
              style={{ backgroundColor: "#FAFCFF", borderColor: "#E8EDF2", transitionDelay: `${0.04 * i}s` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at 30% 30%, rgba(6,148,209,0.06) 0%, transparent 70%)" }} />
              <div className="relative flex items-center gap-[12px] mb-[14px]">
                <div className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 border"
                  style={{ backgroundColor: "rgba(6,148,209,0.1)", borderColor: "rgba(6,148,209,0.25)" }}>
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-medium text-[15px] leading-tight truncate" style={{ color: C.dark }}>{p.role}</h3>
                  <span className="text-[11px] font-body" style={{ color: "#94A3B8" }}>{p.tag}</span>
                </div>
              </div>
              <div className="relative flex flex-wrap gap-[6px]">
                {p.bullets.map((b) => (
                  <span key={b} className="text-[11px] font-body px-[10px] py-[4px] rounded-full border"
                    style={{ backgroundColor: "rgba(6,148,209,0.06)", borderColor: "rgba(6,148,209,0.15)", color: "#64748B" }}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

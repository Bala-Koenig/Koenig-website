"use client";
import { useState, useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const components = [
  {
    name: "Power Apps",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><rect x="5" y="2" width="14" height="20" rx="3" stroke="#0694D1" strokeWidth="1.8"/><path d="M10 18h4" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    desc: "Power Apps is a low-code application development environment that allows users to build custom web and mobile apps for internal business needs.",
    bestFor: "Creating apps to digitize manual processes like inspections, expense approvals, or inventory management.",
    caveat: "While its \"low-code\" nature accelerates development, building enterprise-grade applications that are scalable, secure, and maintainable requires a solid understanding of data architecture, UI/UX principles, and governance. Without proper training, organizations risk creating a portfolio of poorly built or insecure apps.",
    caveatLabel: "Caveat:",
  },
  {
    name: "Power Automate",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    desc: "Power Automate is a workflow automation engine that connects disparate apps and services to automate repetitive tasks.",
    bestFor: "Automating processes like sending notifications when a file is updated, syncing data between systems, or routing approvals.",
    caveat: "Creating a simple, two-step flow is straightforward. However, building complex, resilient automations with advanced conditional logic, error handling, and API integrations demands a higher level of expertise that can only be gained through dedicated training.",
    caveatLabel: "Tradeoff:",
  },
  {
    name: "Power BI",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M4 20V10M9 20V6M14 20V12M19 20V8" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round"/><path d="M2 20h20" stroke="#0694D1" strokeWidth="1.5"/></svg>,
    desc: "Power BI is the business analytics and data visualization component of the platform, used to create interactive dashboards and reports.",
    bestFor: "Transforming raw data from multiple sources into rich, actionable insights.",
    caveat: "The biggest risk with any BI tool is generating misleading information from poorly structured data. In Power BI, this can happen through incorrect data modeling or flawed DAX formulas. Quality training ensures analysts build reports that are not just visually appealing but also accurate and trustworthy.",
    caveatLabel: "Risk:",
  },
  {
    name: "Power Pages",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="10" stroke="#0694D1" strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="#0694D1" strokeWidth="1.8"/></svg>,
    desc: "Power Pages is a low-code platform for creating, hosting, and administering modern, secure, external-facing business websites.",
    bestFor: "Building sites for customer self-service, partner portals, or community forums.",
    caveat: "Because these websites are public-facing and often handle sensitive data, security is paramount. An untrained developer could easily misconfigure permissions or expose data, creating significant compliance and reputational risks.",
    caveatLabel: "Caveat:",
  },
  {
    name: "Copilot Studio",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><rect x="4" y="8" width="16" height="12" rx="3" stroke="#0694D1" strokeWidth="1.8"/><path d="M9 13h.01M15 13h.01M9 16h6" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 8V5M8 5h8" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    desc: "Formerly known as Power Virtual Agents, Copilot Studio allows users to create powerful AI-driven copilots and chatbots using a no-code graphical interface.",
    bestFor: "Building internal helpdesk bots, customer service agents, or guided sales assistants.",
    caveat: "A poorly designed bot can lead to immense user frustration. Effective chatbot development requires knowledge of conversation design, topic management, and gracefully handing off complex queries to human agents — skills that are honed in specialized training programs.",
    caveatLabel: "Risk:",
  },
];

const whyTraining = [
  { label: "Navigating Complexity:", text: "Moving beyond simple, single-user apps to building enterprise-wide solutions requires a deep understanding of solution architecture, performance optimization, and application lifecycle management (ALM)." },
  { label: "Ensuring Governance and Security:", text: 'Without a guiding framework, the rise of citizen development can lead to "app sprawl," data silos, and security vulnerabilities. Professional training instills the best practices needed to establish strong governance, ensuring that innovation happens within safe and manageable guardrails.' },
  { label: "Maximizing ROI:", text: "Untrained users often only use a fraction of the platform's capabilities. Expert-led training programs are designed to unlock the full feature set, helping organizations achieve a significantly higher return on their cloud technology investment." },
  { label: "Fostering True Collaboration:", text: 'The most successful Power Platform implementations involve a "fusion development" model, where business users and professional IT developers collaborate effectively. Training provides a common language and skill set, bridging the gap between these two groups.' },
];

export default function CourseContent() {
  const [expanded, setExpanded] = useState(false);
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
    <section ref={sectionRef} className="relative py-16 bg-white" aria-labelledby="course-content-heading">
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid lg:grid-cols-3 gap-12 items-start">

          {/* ── Left — article content (2/3 width) ─ */}
          <div className="lg:col-span-2 animate-on-scroll">
            <h2 id="course-content-heading" className="font-heading font-medium text-3xl sm:text-4xl mb-4" style={{ color: C.dark }}>
              Microsoft Power Platform Training
            </h2>

            <p className="font-body text-base leading-relaxed mb-4" style={{ color: "#374151" }}>
              In today's fast-paced digital landscape, businesses are constantly seeking ways to innovate, automate, and become more data-driven. The Microsoft Power Platform has emerged as a game-changing suite of tools that empowers organizations to achieve these goals. However, unlocking its full potential isn't as simple as just turning it on. Effective, structured training is the bridge between purchasing a powerful tool and achieving a true return on investment.
            </p>

            <p className="font-body text-base leading-relaxed mb-6" style={{ color: C.accent }}>
              This article will explore the core components of the Microsoft Power Platform, discuss the tangible risks and tradeoffs of its low-code approach, and explain why formal training is an essential ingredient for success.
            </p>

            <h2 className="font-heading font-medium text-2xl mb-3" style={{ color: C.dark }}>What is the Microsoft Power Platform?</h2>
            <p className="font-body text-base leading-relaxed mb-4" style={{ color: "#374151" }}>
              The Microsoft Power Platform is a unified suite of low-code applications and services designed to help users build custom applications, automate workflows, and analyze data with minimal to no traditional coding experience. It is built to work seamlessly with other Microsoft products like Microsoft 365, Dynamics 365, and Azure, creating a deeply integrated ecosystem for business transformation.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: "#374151" }}>
              The platform's primary goal is to empower "citizen developers" — business users with deep process knowledge but little coding background — to create solutions for their own teams, fostering innovation from the ground up.
            </p>

            {/* Expandable content */}
            <div
              className="overflow-hidden transition-all duration-700"
              style={{ maxHeight: expanded ? "3000px" : "0" }}
            >
              {/* Core Components */}
              <h2 className="font-heading font-medium text-2xl mb-4" style={{ color: C.dark }}>The Core Components of the Power Platform</h2>
              <p className="font-body text-base leading-relaxed mb-6" style={{ color: "#374151" }}>
                The platform is comprised of several key applications, each serving a distinct purpose but designed to work together. Understanding these components is the first step in mastering the suite.
              </p>

              <div className="space-y-6 mb-8">
                {components.map((comp) => (
                  <div key={comp.name} className="pl-4" style={{ borderLeft: `3px solid ${C.accent}` }}>
                    <h3 className="font-heading font-medium text-xl mb-2" style={{ color: C.dark }}>{comp.name}</h3>
                    <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "#374151" }}>{comp.desc}</p>
                    <ul className="space-y-2 text-sm font-body" style={{ color: "#374151" }}>
                      <li>
                        <span className="font-600" style={{ color: C.accent }}>Best For: </span>
                        {comp.bestFor}
                      </li>
                      <li>
                        <span className="font-600" style={{ color: C.accent }}>{comp.caveatLabel} </span>
                        {comp.caveat}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>

              {/* Dataverse & Connectors */}
              <h2 className="font-heading font-medium text-2xl mb-4" style={{ color: C.dark }}>The Foundation: Dataverse and Connectors</h2>
              <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "#374151" }}>Supporting these applications are two foundational elements:</p>
              <ul className="space-y-3 text-sm font-body mb-8 pl-4" style={{ color: "#374151", borderLeft: `3px solid ${C.accent}` }}>
                <li><strong style={{ color: C.dark }}>Microsoft Dataverse:</strong> A scalable and secure cloud-based data service that acts as the primary data backbone for the Power Platform. It provides robust security, rich business logic, and data management capabilities, going far beyond a simple database.</li>
                <li><strong style={{ color: C.dark }}>Data Connectors:</strong> These are the pre-built "bridges" that allow Power Platform components to connect to hundreds of data sources and services, including both Microsoft and third-party applications.</li>
              </ul>

              {/* Why Training */}
              <h2 className="font-heading font-medium text-2xl mb-4" style={{ color: C.dark }}>Why is Formal Power Platform Training Essential?</h2>
              <p className="font-body text-sm leading-relaxed mb-5" style={{ color: C.accent }}>
                The promise of low-code is alluring, but it is not a substitute for expertise. To truly leverage the platform and mitigate its inherent risks, a strategic investment in training is non-negotiable.
              </p>
              <ol className="space-y-4 text-sm font-body mb-6" style={{ color: "#374151" }}>
                {whyTraining.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-heading font-medium text-white mt-0.5" style={{ backgroundColor: C.accent }}>{i + 1}</span>
                    <span><strong style={{ color: C.dark }}>{item.label}</strong> {item.text}</span>
                  </li>
                ))}
              </ol>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#374151" }}>
                At Koenig Solutions, we believe that empowerment comes from knowledge. Our Microsoft Power Platform training courses are built to take your teams from foundational understanding to advanced application. We focus not just on the "how" but on the "why," emphasizing best practices in governance, security, and scalable architecture. Empower your team to build with confidence.
              </p>
            </div>

            {/* Show More/Less */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border-2 font-heading font-medium text-sm transition-all duration-300 hover:shadow-md"
                style={{
                  borderColor: C.accent,
                  color: C.accent,
                  backgroundColor: "transparent",
                }}
              >
                {expanded ? "Show Less" : "Show More"}
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white transition-transform duration-300"
                  style={{
                    backgroundColor: C.accent,
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={expanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </span>
              </button>
            </div>

            {/* Google rating */}
            <div className="mt-8 pt-6 flex items-center gap-4 flex-wrap" style={{ borderTop: "1px solid #E5E7EB" }}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border" style={{ borderColor: "#E5E7EB" }}>
                <span className="font-heading font-medium text-sm" style={{ color: "#4285F4" }}>G</span>
                <div className="flex gap-0.5">
                  {"★★★★".split("").map((s, i) => <span key={i} className="text-sm" style={{ color: "#FBBC04" }}>{s}</span>)}
                  <span className="text-xs" style={{ color: "#FBBC04" }}>★</span>
                </div>
                <span className="font-heading font-medium text-sm" style={{ color: C.dark }}>4.7</span>
              </div>
              <a
                href="#contact"
                className="px-6 py-2.5 rounded-xl text-sm font-heading font-medium text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: C.accent }}
              >
                Request a Quote
              </a>
            </div>
          </div>

          {/* ── Right — circular image ─────────── */}
          <div className="animate-on-scroll hidden lg:flex flex-col items-center gap-8 sticky top-24" style={{ transitionDelay: "0.15s" }}>
            {/* Circular image placeholder */}
            <div className="relative">
              <div
                className="w-72 h-72 rounded-full overflow-hidden border-4"
                style={{ borderColor: C.accent, boxShadow: `0 0 0 8px ${C.light}` }}
              >
                <div
                  className="w-full h-full flex items-center justify-center text-center"
                  style={{ background: `linear-gradient(135deg, ${C.light}, #C8EFFF)` }}
                >
                  <div>
                    <span className="block mb-3"><svg viewBox="0 0 24 24" fill="none" width="60" height="60"><path d="M3 21h18M5 21V7l7-4 7 4v14" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><rect x="9" y="13" width="6" height="8" rx="1" stroke="#0694D1" strokeWidth="1.8"/><path d="M9 10h6" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round"/></svg></span>
                    <p className="font-heading font-medium text-sm" style={{ color: C.dark }}>Expert-Led Training</p>
                    <p className="font-body text-xs mt-1" style={{ color: "#64748B" }}>Live Online & Onsite</p>
                  </div>
                </div>
              </div>
              {/* Orbit dots */}
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-2" style={{ backgroundColor: C.accent, borderColor: "#fff" }} />
              <div className="absolute -bottom-2 left-8 w-4 h-4 rounded-full border-2" style={{ backgroundColor: C.light, borderColor: C.accent }} />
            </div>

            {/* Quick info cards */}
            <div className="w-full space-y-3">
              {[
                { label: "Duration", value: "40+ Hours", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="12" cy="12" r="10" stroke="#0694D1" strokeWidth="1.8"/><path d="M12 6v6l4 2" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { label: "Format",   value: "Online / Onsite", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="12" cy="12" r="10" stroke="#0694D1" strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="#0694D1" strokeWidth="1.8"/></svg> },
                { label: "Level",    value: "All Levels", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M4 20V10M9 20V6M14 20V12M19 20V8" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round"/><path d="M2 20h20" stroke="#0694D1" strokeWidth="1.5"/></svg> },
                { label: "Next Batch", value: "March 25, 2026", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#0694D1" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round"/></svg> },
              ].map((info) => (
                <div
                  key={info.label}
                  className="flex items-center gap-3 p-3 rounded-xl border"
                  style={{ backgroundColor: C.light + "40", borderColor: `rgba(6,148,209,0.2)` }}
                >
                  <span className="flex items-center justify-center">{info.icon}</span>
                  <div>
                    <p className="text-xs font-body" style={{ color: "#64748B" }}>{info.label}</p>
                    <p className="text-sm font-heading font-medium" style={{ color: C.dark }}>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

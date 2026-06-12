"use client";
import { useState, useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

/* ── Sidebar SVG icons per technology ─────────────────── */
const techIcons: Record<string, JSX.Element> = {
  Azure: <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><path d="M13.05 4.24L7.56 18.51h2.77l1.05-2.76h5.24l1.05 2.76h2.77L15.95 4.24h-2.9zM12.24 13.5l1.76-4.63 1.76 4.63h-3.52z" fill="#0078D4"/></svg>,
  "AI & Copilot": <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><circle cx="12" cy="8" r="3" stroke="#7B61FF" strokeWidth="1.8"/><path d="M6 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#7B61FF" strokeWidth="1.8" strokeLinecap="round"/><path d="M16 5l2-2M18 7h2" stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  "Power Platform": <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><rect x="4" y="4" width="7" height="7" rx="1.5" fill="#742774" opacity="0.8"/><rect x="13" y="4" width="7" height="7" rx="1.5" fill="#0078D4" opacity="0.8"/><rect x="4" y="13" width="7" height="7" rx="1.5" fill="#0078D4" opacity="0.8"/><rect x="13" y="13" width="7" height="7" rx="1.5" fill="#742774" opacity="0.8"/></svg>,
  Security: <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" stroke="#D83B01" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#D83B01" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "Microsoft 365": <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><rect x="3" y="3" width="8" height="8" rx="1" fill="#0078D4" opacity="0.85"/><rect x="13" y="3" width="8" height="8" rx="1" fill="#E3008C" opacity="0.85"/><rect x="3" y="13" width="8" height="8" rx="1" fill="#FFB900" opacity="0.85"/><rect x="13" y="13" width="8" height="8" rx="1" fill="#107C10" opacity="0.85"/></svg>,
  "Dynamics 365": <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><path d="M6 4l12 4v8l-12 4V4z" fill="#002050" opacity="0.85"/><path d="M6 4l6 2v12l-6 2V4z" fill="#0078D4" opacity="0.6"/></svg>,
  "Data & Analytics": <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><rect x="3" y="14" width="4" height="7" rx="1" fill="#217346"/><rect x="10" y="10" width="4" height="11" rx="1" fill="#217346" opacity="0.7"/><rect x="17" y="6" width="4" height="15" rx="1" fill="#217346" opacity="0.5"/></svg>,
  "DevOps & Dev": <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><path d="M8 17l-4-4 4-4M16 7l4 4-4 4" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 4l-4 16" stroke="#0078D4" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  GitHub: <svg viewBox="0 0 24 24" fill="#24292E" className="w-[20px] h-[20px]"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.7.11 2.5.34 1.9-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.59.67.5A10.003 10.003 0 0022 12c0-5.523-4.477-10-10-10z" fillRule="evenodd"/></svg>,
  "Windows Server": <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><rect x="3" y="3" width="8.5" height="8.5" fill="#0078D4"/><rect x="12.5" y="3" width="8.5" height="8.5" fill="#0078D4" opacity="0.8"/><rect x="3" y="12.5" width="8.5" height="8.5" fill="#0078D4" opacity="0.8"/><rect x="12.5" y="12.5" width="8.5" height="8.5" fill="#0078D4" opacity="0.6"/></svg>,
};

/* ── Technology data ──────────────────────────────────── */
const technologies = [
  { name: "Azure", count: 15, color: "#0078D4", desc: "Master Microsoft's cloud platform — from core IaaS/PaaS fundamentals to advanced architecture, networking, security, and DevOps pipelines.", tags: ["15 Courses", "AZ-900 → AZ-305", "Cloud Roles"], levels: { All: 15, Fundamentals: 3, Associate: 9, Expert: 3 }, courses: [
    { title: "Microsoft Azure Fundamentals", code: "AZ-900", level: "FUNDAMENTALS", price: 597, days: 3 },
    { title: "Microsoft Azure Data Fundamentals", code: "DP-900", level: "FUNDAMENTALS", price: 398, days: 2 },
    { title: "Microsoft Azure AI Fundamentals", code: "AI-900", level: "FUNDAMENTALS", price: 398, days: 2 },
    { title: "Microsoft Azure Administrator", code: "AZ-104", level: "ASSOCIATE", price: 1245, days: 5 },
    { title: "Azure Virtual Desktop Specialty", code: "AZ-140", level: "ASSOCIATE", price: 996, days: 4 },
    { title: "Azure Network Engineer Associate", code: "AZ-700", level: "ASSOCIATE", price: 747, days: 3 },
    { title: "Azure Security Technologies", code: "AZ-500", level: "ASSOCIATE", price: 996, days: 4 },
    { title: "Azure Database Administrator Associate", code: "DP-300", level: "ASSOCIATE", price: 996, days: 4 },
    { title: "Azure IoT Developer Specialty", code: "AZ-220", level: "ASSOCIATE", price: 996, days: 4 },
  ]},
  { name: "AI & Copilot", count: 12, color: "#7B61FF", desc: "Build intelligent solutions with Azure AI services, Copilot integrations, and machine learning operations.", tags: ["12 Courses", "AI-102 → AI-900", "AI Roles"], levels: { All: 12, Fundamentals: 2, Associate: 7, Expert: 3 }, courses: [
    { title: "Azure AI Fundamentals", code: "AI-900", level: "FUNDAMENTALS", price: 398, days: 2 },
    { title: "Azure AI Engineer Associate", code: "AI-102", level: "ASSOCIATE", price: 1245, days: 5 },
    { title: "Azure Data Scientist Associate", code: "DP-100", level: "ASSOCIATE", price: 1245, days: 5 },
  ]},
  { name: "Power Platform", count: 12, color: "#742774", desc: "Build apps, automate workflows, analyze data, and create chatbots with Microsoft's low-code platform suite.", tags: ["12 Courses", "PL-900 → PL-600", "Platform Roles"], levels: { All: 12, Fundamentals: 1, Associate: 7, Expert: 4 }, courses: [
    { title: "Power Platform Fundamentals", code: "PL-900", level: "FUNDAMENTALS", price: 398, days: 2 },
    { title: "Power Platform Functional Consultant", code: "PL-200", level: "ASSOCIATE", price: 1245, days: 5 },
    { title: "Power Platform Developer", code: "PL-400", level: "ASSOCIATE", price: 1245, days: 5 },
    { title: "Power BI Data Analyst", code: "PL-300", level: "ASSOCIATE", price: 996, days: 4 },
    { title: "Power Platform Solution Architect", code: "PL-600", level: "EXPERT", price: 1494, days: 5 },
    { title: "Power Automate RPA Developer", code: "PL-500", level: "ASSOCIATE", price: 996, days: 4 },
  ]},
  { name: "Security", count: 13, color: "#D83B01", desc: "Protect identities, networks, and data across Microsoft 365, Azure, and hybrid environments.", tags: ["13 Courses", "SC-100 → SC-900", "Security Roles"], levels: { All: 13, Fundamentals: 1, Associate: 9, Expert: 3 }, courses: [
    { title: "Security, Compliance, Identity Fundamentals", code: "SC-900", level: "FUNDAMENTALS", price: 398, days: 2 },
    { title: "Identity and Access Administrator", code: "SC-300", level: "ASSOCIATE", price: 996, days: 4 },
    { title: "Information Protection Administrator", code: "SC-400", level: "ASSOCIATE", price: 996, days: 4 },
  ]},
  { name: "Microsoft 365", count: 12, color: "#0078D4", desc: "Deploy, manage, and secure Microsoft 365 services across enterprise environments.", tags: ["12 Courses", "MS-100 → MS-900", "M365 Roles"], levels: { All: 12, Fundamentals: 1, Associate: 8, Expert: 3 }, courses: [
    { title: "Microsoft 365 Fundamentals", code: "MS-900", level: "FUNDAMENTALS", price: 398, days: 2 },
    { title: "Microsoft 365 Administrator", code: "MS-102", level: "ASSOCIATE", price: 1245, days: 5 },
    { title: "Teams Administrator Associate", code: "MS-700", level: "ASSOCIATE", price: 996, days: 4 },
  ]},
  { name: "Dynamics 365", count: 12, color: "#002050", desc: "Configure and extend Dynamics 365 apps for sales, customer service, finance, and supply chain.", tags: ["12 Courses", "MB-210 → MB-920", "Dynamics Roles"], levels: { All: 12, Fundamentals: 2, Associate: 8, Expert: 2 }, courses: [
    { title: "Dynamics 365 Fundamentals (CRM)", code: "MB-910", level: "FUNDAMENTALS", price: 398, days: 2 },
    { title: "Dynamics 365 Sales Functional Consultant", code: "MB-210", level: "ASSOCIATE", price: 1245, days: 5 },
    { title: "Dynamics 365 Customer Service", code: "MB-230", level: "ASSOCIATE", price: 1245, days: 5 },
  ]},
  { name: "Data & Analytics", count: 12, color: "#217346", desc: "Design data solutions with Azure Synapse, Fabric, Cosmos DB, and advanced analytics tools.", tags: ["12 Courses", "DP-100 → DP-900", "Data Roles"], levels: { All: 12, Fundamentals: 1, Associate: 8, Expert: 3 }, courses: [
    { title: "Azure Data Fundamentals", code: "DP-900", level: "FUNDAMENTALS", price: 398, days: 2 },
    { title: "Data Engineering on Azure", code: "DP-203", level: "ASSOCIATE", price: 1245, days: 5 },
    { title: "Fabric Analytics Engineer", code: "DP-600", level: "ASSOCIATE", price: 996, days: 4 },
  ]},
  { name: "DevOps & Dev", count: 12, color: "#0078D4", desc: "Build CI/CD pipelines, manage repos, and implement DevOps practices with Azure DevOps and GitHub.", tags: ["12 Courses", "AZ-400 → AZ-204", "Dev Roles"], levels: { All: 12, Fundamentals: 1, Associate: 8, Expert: 3 }, courses: [
    { title: "DevOps Engineer Expert", code: "AZ-400", level: "EXPERT", price: 1494, days: 5 },
    { title: "Azure Developer Associate", code: "AZ-204", level: "ASSOCIATE", price: 1245, days: 5 },
    { title: "Azure Solutions Architect Expert", code: "AZ-305", level: "EXPERT", price: 1494, days: 5 },
  ]},
  { name: "GitHub", count: 8, color: "#24292E", desc: "Master GitHub administration, Actions workflows, advanced security, and Copilot enterprise rollout.", tags: ["8 Courses", "GitHub Certifications", "DevOps"], levels: { All: 8, Fundamentals: 2, Associate: 4, Expert: 2 }, courses: [
    { title: "GitHub Foundations", code: "GH-001", level: "FUNDAMENTALS", price: 398, days: 2 },
    { title: "GitHub Actions", code: "GH-002", level: "ASSOCIATE", price: 747, days: 3 },
    { title: "GitHub Advanced Security", code: "GH-003", level: "ASSOCIATE", price: 747, days: 3 },
  ]},
  { name: "Windows Server", count: 8, color: "#0078D4", desc: "Deploy, manage, and secure Windows Server environments including hybrid configurations with Azure.", tags: ["8 Courses", "AZ-800 → AZ-801", "Infra Roles"], levels: { All: 8, Fundamentals: 1, Associate: 5, Expert: 2 }, courses: [
    { title: "Windows Server Hybrid Administrator", code: "AZ-800", level: "ASSOCIATE", price: 1245, days: 5 },
    { title: "Windows Server Hybrid Advanced Services", code: "AZ-801", level: "ASSOCIATE", price: 1245, days: 5 },
  ]},
];

const levelColors: Record<string, { bg: string; text: string; border: string }> = {
  FUNDAMENTALS: { bg: "#EFF6FF", text: "#0078D4", border: "#BFDBFE" },
  ASSOCIATE:    { bg: "#F0FDF4", text: "#16A34A", border: "#BBF7D0" },
  EXPERT:       { bg: "#FFF7ED", text: "#EA580C", border: "#FED7AA" },
};

export default function CourseListings() {
  const [activeTech, setActiveTech] = useState(0);
  const [activeLevel, setActiveLevel] = useState("All");
  const [search, setSearch] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => { setActiveLevel("All"); }, [activeTech]);

  const tech = technologies[activeTech];
  const filteredCourses = tech.courses.filter((c) => {
    const matchLevel = activeLevel === "All" || c.level === activeLevel.toUpperCase();
    const matchSearch = search === "" || c.title.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  return (
    <section ref={sectionRef} className="py-[60px]" style={{ backgroundColor: "#F0F4F8" }} aria-labelledby="explorer-heading">
      <div className="max-w-[1340px] mx-auto px-[16px] sm:px-[24px] lg:px-[40px]">

        {/* ── Title ──────────────────────────────────────────── */}
        <div className="animate-on-scroll mb-[10px]">
          <h2 id="explorer-heading" className="font-heading font-medium text-[32px] sm:text-[40px] leading-tight mb-[8px]" style={{ color: C.dark }}>
            Microsoft <span className="text-shimmer-dark">Certification Explorer</span>
          </h2>
          <p className="font-body text-[16px] max-w-[620px]" style={{ color: "#6B7280" }}>
            Browse 100+ official Microsoft courses across Azure, AI, Security, Power Platform, M365 and more — or dive into exam details, skills breakdown and certification paths.
          </p>
        </div>

        {/* ── Search bar — full width, prominent ─────────────── */}
        <div className="animate-on-scroll my-[24px]" style={{ transitionDelay: "0.04s" }}>
          <div
            className="flex items-center gap-[14px] px-[24px] py-[16px] rounded-[16px] bg-white"
            style={{ border: "2px solid rgba(6,148,209,0.35)", boxShadow: "0 2px 12px rgba(6,148,209,0.08)" }}
          >
            <svg className="w-[20px] h-[20px] flex-shrink-0" fill="none" stroke={C.accent} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search certifications or exam codes... e.g. AZ-900, Copilot, Security"
              className="flex-1 text-[15px] font-body outline-none bg-transparent"
              style={{ color: C.dark }}
            />
            {search ? (
              <button onClick={() => setSearch("")} className="text-[12px] font-heading font-medium px-[12px] py-[5px] rounded-[8px] transition-colors hover:bg-gray-100" style={{ backgroundColor: "#F1F5F9", color: "#64748B" }}>
                Esc to clear
              </button>
            ) : (
              <span className="text-[12px] font-body px-[12px] py-[5px] rounded-[8px]" style={{ backgroundColor: "#F1F5F9", color: "#94A3B8" }}>
                Esc to clear
              </span>
            )}
          </div>
        </div>

        {/* ── Main layout: sidebar + content ──────────────────── */}
        <div className="animate-on-scroll flex flex-col lg:flex-row gap-[20px]" style={{ transitionDelay: "0.06s" }}>

          {/* ── Left sidebar ──────────────────────────────────── */}
          <div className="lg:w-[250px] flex-shrink-0">
            <div className="bg-white rounded-[16px] overflow-hidden sticky top-[80px]" style={{ border: "1px solid #E2E8F0" }}>
              <p className="px-[20px] pt-[20px] pb-[10px] text-[11px] font-heading font-medium uppercase tracking-[0.12em]" style={{ color: "#94A3B8" }}>
                Technologies
              </p>
              <div className="pb-[10px]">
                {technologies.map((t, i) => {
                  const isActive = i === activeTech;
                  return (
                    <button
                      key={t.name}
                      onClick={() => setActiveTech(i)}
                      className="w-full flex items-center gap-[12px] px-[16px] py-[11px] text-left transition-all duration-200"
                      style={{
                        backgroundColor: isActive ? "rgba(6,148,209,0.06)" : "transparent",
                        borderLeft: isActive ? `3px solid ${C.accent}` : "3px solid transparent",
                      }}
                    >
                      {/* Colored icon box */}
                      <div
                        className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform duration-200"
                        style={{
                          backgroundColor: isActive ? `${t.color}18` : "#F5F7FA",
                          border: `1px solid ${isActive ? `${t.color}30` : "#E8ECF0"}`,
                        }}
                      >
                        {techIcons[t.name]}
                      </div>
                      <span className="flex-1 text-[14px] font-heading font-medium truncate" style={{ color: isActive ? C.accent : C.dark }}>
                        {t.name}
                      </span>
                      <span
                        className="text-[11px] font-heading font-medium w-[28px] h-[28px] rounded-full flex items-center justify-center flex-shrink-0"
                        style={isActive ? { backgroundColor: C.accent, color: "#fff" } : { backgroundColor: "#F1F5F9", color: "#64748B" }}
                      >
                        {t.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sidebar CTAs */}
              <div className="px-[14px] pb-[14px] space-y-[8px]" style={{ borderTop: "1px solid #F1F5F9" }}>
                <button className="w-full flex items-center justify-center gap-[8px] py-[11px] rounded-[10px] border text-[13px] font-heading font-medium transition-all duration-200 hover:bg-gray-50 mt-[10px]" style={{ borderColor: "#D1D9E0", color: "#64748B" }}>
                  <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Download Brochure
                </button>
                <a href="#contact" className="w-full flex items-center justify-center gap-[8px] py-[11px] rounded-[10px] text-[13px] font-heading font-medium text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: C.accent, boxShadow: "0 2px 10px rgba(6,148,209,0.25)" }}>
                  <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  Enquire Now
                </a>
              </div>
            </div>
          </div>

          {/* ── Right content ─────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Tech header */}
            <div className="bg-white rounded-[16px] p-[24px] mb-[16px]" style={{ border: "1px solid #E2E8F0" }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] mb-[18px]">
                <div className="flex items-start gap-[16px]">
                  <div
                    className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${tech.color}12`, border: `1.5px solid ${tech.color}28` }}
                  >
                    {techIcons[tech.name]}
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-[24px] mb-[4px]" style={{ color: C.dark }}>{tech.name}</h3>
                    <p className="font-body text-[14px] max-w-[520px] leading-[1.5]" style={{ color: "#6B7280" }}>{tech.desc}</p>
                  </div>
                </div>
                <a href="#contact" className="flex items-center gap-[8px] px-[28px] py-[13px] rounded-[12px] text-[14px] font-heading font-medium text-white flex-shrink-0 transition-all duration-200 hover:-translate-y-[1px]" style={{ backgroundColor: C.accent, boxShadow: "0 4px 16px rgba(6,148,209,0.3)" }}>
                  Enquire Now →
                </a>
              </div>

              {/* Tags + Level filters row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[12px]">
                <div className="flex flex-wrap gap-[8px]">
                  {tech.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-[5px] px-[14px] py-[5px] rounded-full text-[12px] font-heading font-medium" style={{ backgroundColor: "rgba(6,148,209,0.07)", color: C.accent, border: "1px solid rgba(6,148,209,0.18)" }}>
                      <svg className="w-[10px] h-[10px]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-[6px] flex-shrink-0">
                  {Object.entries(tech.levels).map(([level, count]) => (
                    <button
                      key={level}
                      onClick={() => setActiveLevel(level)}
                      className="flex items-center gap-[5px] px-[14px] py-[7px] rounded-full text-[12px] font-heading font-medium transition-all duration-200"
                      style={activeLevel === level
                        ? { backgroundColor: C.dark, color: "#fff" }
                        : { backgroundColor: "#fff", color: "#64748B", border: "1px solid #E2E8F0" }
                      }
                    >
                      {level}
                      <span className="text-[10px] opacity-75">{count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Course count bar */}
            <div className="flex items-center justify-between mb-[14px] px-[4px]">
              <div className="flex items-center gap-[10px]">
                <span className="inline-flex items-center px-[14px] py-[5px] rounded-full text-[12px] font-heading font-medium" style={{ backgroundColor: "rgba(6,148,209,0.08)", color: C.accent, border: "1px solid rgba(6,148,209,0.2)" }}>
                  {filteredCourses.length} All Courses
                </span>
                <span className="text-[14px] font-heading font-medium" style={{ color: C.dark }}>{tech.name}</span>
              </div>
              {filteredCourses.length > 3 && (
                <span className="hidden sm:flex items-center gap-[6px] px-[14px] py-[5px] rounded-full text-[12px] font-heading font-medium" style={{ border: "1px solid #E2E8F0", color: "#64748B" }}>
                  ↓ Scroll for more
                </span>
              )}
            </div>

            {/* Course cards */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-[14px] max-h-[720px] overflow-y-auto pr-[4px]" style={{ scrollbarWidth: "thin" }}>
              {filteredCourses.map((course) => {
                const lc = levelColors[course.level] || levelColors.ASSOCIATE;
                return (
                  <div key={course.code} className="bg-white rounded-[14px] p-[20px] flex flex-col transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg" style={{ border: "1px solid #E8EDF2" }}>
                    {/* Level + cert */}
                    <div className="flex items-center justify-between mb-[14px]">
                      <span className="text-[11px] font-heading font-medium px-[10px] py-[3px] rounded-[6px]" style={{ backgroundColor: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}>
                        {course.level}
                      </span>
                      <a href="#" className="text-[12px] font-heading font-medium flex items-center gap-[4px]" style={{ color: C.accent }}>
                        Cert Details →
                      </a>
                    </div>

                    {/* Title */}
                    <h4 className="font-heading font-medium text-[15px] leading-[1.4] mb-[12px]" style={{ color: C.dark, minHeight: "42px" }}>
                      {course.title}
                    </h4>

                    {/* Exam code with underline */}
                    <div className="mb-[16px] pb-[14px]" style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <span className="inline-block text-[13px] font-heading font-medium tracking-[0.02em]" style={{ color: "#64748B" }}>
                        {course.code}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline justify-between mb-[4px]">
                      <div>
                        <span className="text-[13px] font-body" style={{ color: C.accent }}>$</span>
                        <span className="font-heading font-medium text-[24px] ml-[2px]" style={{ color: C.accent }}>{course.price.toLocaleString()}</span>
                        <span className="text-[12px] font-body ml-[8px]" style={{ color: "#94A3B8" }}>per person · USD</span>
                      </div>
                    </div>

                    {/* Duration */}
                    <p className="text-[12px] font-body flex items-center gap-[5px] mb-[18px]" style={{ color: "#94A3B8" }}>
                      <svg className="w-[13px] h-[13px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {course.days} days
                    </p>

                    <div className="flex-1" />

                    {/* CTAs */}
                    <div className="flex gap-[8px]">
                      <button className="flex-1 py-[10px] rounded-[10px] border text-[13px] font-heading font-medium transition-all duration-200 hover:bg-gray-50" style={{ borderColor: "#D1D9E0", color: "#64748B" }}>
                        Download Brochure
                      </button>
                      <a href="#contact" className="flex-1 py-[10px] rounded-[10px] text-[13px] font-heading font-medium text-white text-center transition-all duration-200 hover:opacity-90" style={{ backgroundColor: C.accent }}>
                        Enroll Now
                      </a>
                    </div>
                  </div>
                );
              })}

              {filteredCourses.length === 0 && (
                <div className="col-span-full text-center py-[40px]">
                  <p className="text-[14px] font-body" style={{ color: "#94A3B8" }}>No courses found{search ? ` for "${search}"` : ""}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

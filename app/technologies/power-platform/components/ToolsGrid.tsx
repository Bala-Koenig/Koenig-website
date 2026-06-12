"use client";
import { useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const SvgMobile = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>);
const SvgLightning = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>);
const SvgChart = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>);
const SvgCpu = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>);
const SvgGlobe = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>);
const SvgDatabase = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>);
const SvgBrain = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/><line x1="9" y1="21" x2="15" y2="21"/><line x1="10" y1="17" x2="10" y2="21"/><line x1="14" y1="17" x2="14" y2="21"/></svg>);
const SvgRefresh = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>);
const SvgChat = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>);
const SvgFolder = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>);
const SvgTerminal = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>);
const SvgStar = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);
const SvgLink = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>);
const SvgSearch = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const SvgShield = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const SvgWrench = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>);

const tools = [
  { name: "Power Apps",             icon: <SvgMobile />, category: "Build",                  badge: "Core"       },
  { name: "Power Automate",         icon: <SvgLightning />, category: "Automate",               badge: "Core"       },
  { name: "Power BI",               icon: <SvgChart />, category: "Analyze",                badge: "Core"       },
  { name: "Power Virtual Agents",   icon: <SvgCpu />, category: "AI Bots",                badge: "Core"       },
  { name: "Power Pages",            icon: <SvgGlobe />, category: "Web Portals",            badge: "Core"       },
  { name: "Microsoft Dataverse",    icon: <SvgDatabase />, category: "Data Layer",             badge: "Platform"   },
  { name: "AI Builder",             icon: <SvgBrain />, category: "AI & ML",                badge: "AI"         },
  { name: "Azure DevOps",           icon: <SvgRefresh />, category: "DevOps",                 badge: "DevOps"     },
  { name: "Microsoft Teams",        icon: <SvgChat />, category: "Collaboration",          badge: "Integration"},
  { name: "SharePoint",             icon: <SvgFolder />, category: "Document Mgmt",          badge: "Integration"},
  { name: "Power Platform CLI",     icon: <SvgTerminal />, category: "Developer Tools",        badge: "Dev"        },
  { name: "Copilot Studio",         icon: <SvgStar />, category: "Gen AI",                 badge: "New ✦"      },
  { name: "Azure Logic Apps",       icon: <SvgLink />, category: "Enterprise Integration", badge: "Azure"      },
  { name: "Process Advisor",        icon: <SvgSearch />, category: "Process Mining",         badge: "Analytics"  },
  { name: "Managed Environments",   icon: <SvgShield />, category: "Governance",             badge: "Enterprise" },
  { name: "Power Fx",               icon: "{ }", category: "Low-Code Language",     badge: "Language"   },
];

export default function ToolsGrid() {
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
    <section id="tools" ref={sectionRef} className="py-24 overflow-hidden" style={{ backgroundColor: "#F0F9FF" }} aria-labelledby="tools-heading">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(6,148,209,0.2), transparent)` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-on-scroll text-center max-w-3xl mx-auto mb-14">
          <span className="section-badge mb-5 inline-flex"><SvgWrench /> Technologies</span>
          <h2 id="tools-heading" className="font-heading font-bold leading-tight mb-5" style={{ color: C.dark, fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.4 }}>
            Tools & Technologies{" "}
            <span className="text-shimmer-dark">You Will Master</span>
          </h2>
          <p className="font-body text-base leading-relaxed" style={{ color: "#6B7280" }}>
            Get hands-on with every core component of the Microsoft Power Platform ecosystem — from foundational tools to enterprise-grade development.
          </p>
        </div>

        <div className="animate-on-scroll grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <div
              key={tool.name}
              className="group relative bg-white rounded-2xl p-5 border transition-all duration-300 cursor-default overflow-hidden hover:shadow-md hover:-translate-y-0.5"
              style={{ borderColor: "#E5E7EB", transitionDelay: `${0.025 * i}s` }}
            >
              {/* Left hover accent */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" style={{ backgroundColor: C.accent }} />

              <span className="inline-block text-xs font-heading font-medium px-2 py-0.5 rounded-full border mb-3" style={{ backgroundColor: C.light, borderColor: "rgba(6,148,209,0.25)", color: C.accent }}>
                {tool.badge}
              </span>
              <div className="mb-3 group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
              <h3 className="font-heading font-medium text-sm leading-tight mb-1" style={{ color: C.dark }}>{tool.name}</h3>
              <p className="text-xs font-body" style={{ color: "#94A3B8" }}>{tool.category}</p>
            </div>
          ))}
        </div>

        <div className="animate-on-scroll mt-8 text-center" style={{ transitionDelay: "0.18s" }}>
          <p className="text-sm font-body" style={{ color: "#94A3B8" }}>
            Plus integration with{" "}
            <span className="font-heading font-medium" style={{ color: C.accent }}>400+ connectors</span>
            {" "}including Salesforce, SAP, ServiceNow, SQL Server, and more.
          </p>
        </div>
      </div>
    </section>
  );
}

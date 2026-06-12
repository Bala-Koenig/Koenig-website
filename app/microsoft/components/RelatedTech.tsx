"use client";
import { useEffect, useRef, useState } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF", bg: "#041825" };

/* ── SVG line icons per technology ──────────────────────── */
const icons: Record<string, JSX.Element> = {
  "Microsoft 365":   <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/></svg>,
  Azure:             <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><path d="M7 20L13 4h4l-2 6h4L9 20h-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  "Dynamics 365":    <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><path d="M12 2v10l8.5 5M12 12L3.5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/></svg>,
  SharePoint:        <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><path d="M3 6h18v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="1.6"/><path d="M3 6l9 6 9-6" stroke="currentColor" strokeWidth="1.6"/></svg>,
  "Microsoft Teams": <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><rect x="2" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 8h4M8 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="19" cy="7" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M16 14h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  "Azure DevOps":    <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  "Copilot Studio":  <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  "SQL Server":      <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.6"/><path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="currentColor" strokeWidth="1.6"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="currentColor" strokeWidth="1.6"/></svg>,
  Salesforce:        <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><path d="M5 16a4 4 0 01-.5-7.97A5.5 5.5 0 0115.9 6 4.5 4.5 0 0119 14.5H19a3.5 3.5 0 01-.5 6.96H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  SAP:               <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6"/><path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  ServiceNow:        <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Stripe:            <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M2 10h20" stroke="currentColor" strokeWidth="1.6"/><path d="M6 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  DocuSign:          <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 15l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Zendesk:           <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><path d="M4 18h16M8 6v8M12 10v4M16 8v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  Slack:             <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><path d="M14.5 10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2s-2 .9-2 2v4c0 1.1.9 2 2 2zM20 10h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M9.5 14c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2zM4 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 14.5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2s.9 2 2 2h4c1.1 0 2-.9 2-2zM14 20v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 9.5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2s-.9-2-2-2h-4c-1.1 0-2 .9-2 2zM10 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  "Google Sheets":   <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]"><rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
};

const microsoft = [
  { name: "Microsoft 365",   tag: "Productivity Suite",  color: "#0078D4" },
  { name: "Azure",           tag: "Cloud Platform",      color: "#0089D6" },
  { name: "Dynamics 365",    tag: "CRM & ERP",           color: "#002050" },
  { name: "SharePoint",      tag: "Document Mgmt",       color: "#038387" },
  { name: "Microsoft Teams", tag: "Collaboration",       color: "#6264A7" },
  { name: "Azure DevOps",    tag: "CI/CD & ALM",         color: "#0078D4" },
  { name: "Copilot Studio",  tag: "Gen AI",              color: "#7B61FF" },
  { name: "SQL Server",      tag: "Database",            color: "#CC2131" },
];

const thirdParty = [
  { name: "Salesforce",      tag: "CRM",          color: "#00A1E0" },
  { name: "SAP",             tag: "ERP",          color: "#0FAAFF" },
  { name: "ServiceNow",      tag: "ITSM",         color: "#81B5A1" },
  { name: "Stripe",          tag: "Payments",     color: "#635BFF" },
  { name: "DocuSign",        tag: "eSignature",   color: "#FFCD00" },
  { name: "Zendesk",         tag: "Support",      color: "#03363D" },
  { name: "Slack",           tag: "Messaging",    color: "#4A154B" },
  { name: "Google Sheets",   tag: "Spreadsheets", color: "#34A853" },
];

function TechCard({ name, tag, color, index }: { name: string; tag: string; color: string; index: number }) {
  return (
    <div
      className="group relative flex items-center gap-[14px] px-[18px] py-[14px] rounded-[12px] overflow-hidden transition-all duration-300 hover:-translate-y-[2px] cursor-default"
      style={{
        backgroundColor: "rgba(9,49,72,0.5)",
        border: "1px solid rgba(6,148,209,0.12)",
        backdropFilter: "blur(8px)",
        transitionDelay: `${0.03 * index}s`,
      }}
    >
      {/* Animated left accent on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
      />
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 15% 50%, ${color}15 0%, transparent 60%)` }} />

      {/* Icon */}
      <div
        className="relative w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40`, color: "#60CEFA" }}
      >
        {icons[name]}
      </div>

      {/* Text */}
      <div className="relative min-w-0">
        <p className="font-heading font-medium text-[14px] leading-tight truncate" style={{ color: "#fff" }}>{name}</p>
        <p className="font-body text-[11px] mt-[2px]" style={{ color: "rgba(228,247,255,0.4)" }}>{tag}</p>
      </div>
    </div>
  );
}

export default function RelatedTech() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"microsoft" | "third-party">("microsoft");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const activeData = activeTab === "microsoft" ? microsoft : thirdParty;

  return (
    <section ref={sectionRef} className="relative py-[60px] overflow-hidden" style={{ backgroundColor: C.bg }} aria-labelledby="related-tech-heading">
      {/* Grid lines background — visible */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(6,148,209,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,148,209,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Animated gradient orb — top right */}
      <div className="absolute -top-[80px] -right-[80px] w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,148,209,0.2) 0%, rgba(6,148,209,0.06) 40%, transparent 70%)", filter: "blur(40px)", animation: "rtOrb1 12s ease-in-out infinite" }} />

      {/* Animated gradient orb — bottom left */}
      <div className="absolute -bottom-[60px] -left-[60px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,148,209,0.15) 0%, rgba(9,49,72,0.1) 40%, transparent 70%)", filter: "blur(40px)", animation: "rtOrb2 15s ease-in-out infinite" }} />

      {/* Animated gradient orb — center accent */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,148,209,0.1) 0%, transparent 65%)", filter: "blur(50px)", animation: "rtOrb1 10s ease-in-out infinite reverse" }} />

      {/* Floating accent dots */}
      <div className="absolute top-[18%] left-[22%] w-[10px] h-[10px] rounded-full pointer-events-none" style={{ backgroundColor: "rgba(6,148,209,0.25)", filter: "blur(1px)", animation: "rtOrb1 7s ease-in-out infinite" }} />
      <div className="absolute top-[55%] right-[12%] w-[8px] h-[8px] rounded-full pointer-events-none" style={{ backgroundColor: "rgba(6,148,209,0.2)", filter: "blur(1px)", animation: "rtOrb2 9s ease-in-out infinite" }} />
      <div className="absolute bottom-[25%] left-[45%] w-[6px] h-[6px] rounded-full pointer-events-none" style={{ backgroundColor: "rgba(6,148,209,0.18)", filter: "blur(1px)", animation: "rtOrb1 6s ease-in-out infinite reverse" }} />
      <div className="absolute top-[70%] left-[8%] w-[7px] h-[7px] rounded-full pointer-events-none" style={{ backgroundColor: "rgba(6,148,209,0.15)", filter: "blur(1px)", animation: "rtOrb2 8s ease-in-out infinite" }} />

      <style jsx>{`
        @keyframes rtOrb1 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-35px) scale(1.06); }
        }
        @keyframes rtOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -25px) scale(1.04); }
          66% { transform: translate(-12px, -12px) scale(0.96); }
        }
      `}</style>

      <div className="relative max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px]">

        {/* Header */}
        <div className="animate-on-scroll text-center mb-[36px]">
          <span className="inline-flex items-center gap-[6px] text-[12px] font-heading font-medium uppercase tracking-[0.1em] px-[14px] py-[5px] rounded-full mb-[14px]"
            style={{ backgroundColor: "rgba(6,148,209,0.12)", color: "#60CEFA", border: "1px solid rgba(6,148,209,0.25)" }}>
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{display:'inline',verticalAlign:'middle'}}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#60CEFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#60CEFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> Integrations
          </span>
          <h2 id="related-tech-heading" className="font-heading font-medium text-[28px] sm:text-[34px] leading-tight mb-[12px]" style={{ color: "#fff" }}>
            Related Technologies by <span className="text-shimmer">Industry Experts</span>
          </h2>
          <p className="font-body text-[16px] max-w-[600px] mx-auto" style={{ color: "rgba(228,247,255,0.5)" }}>
            Power Platform connects natively with the entire Microsoft ecosystem and hundreds of third-party services via pre-built connectors.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="animate-on-scroll flex justify-center mb-[28px]" style={{ transitionDelay: "0.05s" }}>
          <div className="inline-flex rounded-[12px] p-[3px]"
            style={{ backgroundColor: "rgba(9,49,72,0.6)", border: "1px solid rgba(6,148,209,0.15)" }}>
            {[
              { key: "microsoft" as const, label: "Microsoft Ecosystem" },
              { key: "third-party" as const, label: "Third-Party" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-[22px] py-[10px] rounded-[10px] text-[13px] font-heading font-medium transition-all duration-300"
                style={
                  activeTab === tab.key
                    ? { backgroundColor: C.accent, color: "#fff", boxShadow: "0 2px 10px rgba(6,148,209,0.3)" }
                    : { backgroundColor: "transparent", color: "rgba(228,247,255,0.5)" }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="animate-on-scroll" style={{ transitionDelay: "0.08s" }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[12px]">
            {activeData.map((t, i) => (
              <TechCard key={t.name} {...t} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

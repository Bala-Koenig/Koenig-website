"use client";
import { useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF", bg: "#041825" };

const GreenCheck = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill="#16A34A"/></svg>
);
const RedX = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fill="#EF4444"/></svg>
);
const AmberWarning = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]"><path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" fill="#F59E0B"/></svg>
);

const rows = [
  { feature: "1-on-1 Live Training",       koenig: "Yes",              others: "No",               koenigIcon: <GreenCheck />, othersIcon: <RedX /> },
  { feature: "Flexible Schedule",           koenig: "Any timezone",     others: "Fixed batches",     koenigIcon: <GreenCheck />, othersIcon: <RedX /> },
  { feature: "Microsoft Certified Trainers",koenig: "MCT Certified",    others: "Varies",            koenigIcon: <GreenCheck />, othersIcon: <AmberWarning /> },
  { feature: "Hands-on Labs",              koenig: "15+ projects",     others: "Theory only",       koenigIcon: <GreenCheck />, othersIcon: <RedX /> },
  { feature: "Exam Guarantee",             koenig: "Free retake",      others: "No guarantee",      koenigIcon: <GreenCheck />, othersIcon: <RedX /> },
  { feature: "Post-Training Support",      koenig: "90-day access",    others: "None",              koenigIcon: <GreenCheck />, othersIcon: <RedX /> },
  { feature: "Custom Curriculum",          koenig: "Tailored",         others: "One-size-fits-all", koenigIcon: <GreenCheck />, othersIcon: <RedX /> },
  { feature: "Destination Training",       koenig: "Global locations", others: "Online only",       koenigIcon: <GreenCheck />, othersIcon: <RedX /> },
];

export default function Comparison() {
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
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-white"
      aria-labelledby="comparison-heading"
    >

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="animate-on-scroll text-center max-w-3xl mx-auto" style={{ marginBottom: "48px" }}>
          <span className="section-badge mb-5 inline-flex" style={{ background: "rgba(6,148,209,0.1)", color: C.accent, border: "1px solid rgba(6,148,209,0.2)" }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px]" style={{ display: "inline-block", verticalAlign: "middle" }}><path d="M13 2L4 14h7v8l9-12h-7L13 2z" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Why Koenig?
          </span>
          <h2
            id="comparison-heading"
            className="font-heading font-medium leading-tight"
            style={{ color: C.dark, fontSize: "42px", marginBottom: "20px" }}
          >
            See the{" "}
            <span className="text-shimmer-dark">Difference</span>
          </h2>
          <p className="font-body" style={{ color: "#6B7280", fontSize: "16px", lineHeight: "1.7" }}>
            Compare Koenig&apos;s Power Platform training with other providers and see why thousands of professionals trust us for their certification journey.
          </p>
        </div>

        {/* Table */}
        <div className="animate-on-scroll" style={{ transitionDelay: "0.1s" }}>
          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #E2E8F0",
              backgroundColor: "#fff",
              boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    className="font-heading font-medium"
                    style={{
                      textAlign: "left",
                      padding: "20px 28px",
                      color: "#64748B",
                      fontSize: "14px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      borderBottom: "1px solid #E2E8F0",
                      backgroundColor: "#F8FAFC",
                    }}
                  >
                    Feature
                  </th>
                  <th
                    className="font-heading font-medium"
                    style={{
                      textAlign: "center",
                      padding: "20px 28px",
                      fontSize: "16px",
                      borderBottom: "1px solid #E2E8F0",
                      background: "linear-gradient(135deg, rgba(6,148,209,0.08) 0%, rgba(6,148,209,0.03) 100%)",
                      color: C.accent,
                      position: "relative",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><path d="M6 9H4V4h16v5h-2" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15a5 5 0 005-5V4H7v6a5 5 0 005 5z" stroke="#0694D1" strokeWidth="1.5"/><path d="M8 21h8M12 15v6" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round"/></svg> Koenig Solutions
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        bottom: "0",
                        left: "10%",
                        right: "10%",
                        height: "2px",
                        background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`,
                      }}
                    />
                  </th>
                  <th
                    className="font-heading font-medium"
                    style={{
                      textAlign: "center",
                      padding: "20px 28px",
                      color: "#64748B",
                      fontSize: "16px",
                      borderBottom: "1px solid #E2E8F0",
                      backgroundColor: "#F8FAFC",
                    }}
                  >
                    Other Providers
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    style={{
                      borderBottom: i < rows.length - 1 ? "1px solid #F1F5F9" : "none",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8FAFC")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td
                      className="font-body"
                      style={{
                        padding: "18px 28px",
                        color: C.dark,
                        fontSize: "16px",
                        fontWeight: 500,
                      }}
                    >
                      {row.feature}
                    </td>
                    <td
                      className="font-body"
                      style={{
                        padding: "18px 28px",
                        textAlign: "center",
                        fontSize: "16px",
                        background: "rgba(6,148,209,0.02)",
                      }}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                        {row.koenigIcon}
                        <span style={{ color: "#34D399", fontWeight: 500 }}>{row.koenig}</span>
                      </span>
                    </td>
                    <td
                      className="font-body"
                      style={{
                        padding: "18px 28px",
                        textAlign: "center",
                        fontSize: "16px",
                      }}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                        {row.othersIcon}
                        <span style={{ color: row.feature === "Microsoft Certified Trainers" ? "#FBBF24" : "#F87171", fontWeight: 400 }}>
                          {row.others}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </div>
    </section>
  );
}

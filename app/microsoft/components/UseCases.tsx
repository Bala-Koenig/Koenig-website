"use client";
import { useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const useCases = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#E4F7FF" />
        <path d="M20 12c-4.42 0-8 2.24-8 5s3.58 5 8 5 8-2.24 8-5-3.58-5-8-5zm0 14c-4.42 0-8-2.24-8-5v2c0 2.76 3.58 5 8 5s8-2.24 8-5v-2c0 2.76-3.58 5-8 5zm0 4c-4.42 0-8-2.24-8-5v2c0 2.76 3.58 5 8 5s8-2.24 8-5v-2c0 2.76-3.58 5-8 5z" fill="#0694D1" />
      </svg>
    ),
    tag: "Human Resources",
    title: "Automate Employee Onboarding",
    description:
      "Build self-service leave requests, automated offer letters, and onboarding checklists with Power Automate + Power Apps.",
    bullets: [
      "Self-service leave & attendance requests",
      "Automated offer letter generation",
      "Digital onboarding checklists & task tracking",
      "Employee document collection workflows",
    ],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#E4F7FF" />
        <path d="M12 28h3v-8h-3v8zm5 0h3V14h-3v14zm5 0h3v-5h-3v5zm5 0h3v-10h-3v10z" fill="#0694D1" />
      </svg>
    ),
    tag: "Analytics",
    title: "Executive Dashboards with Power BI",
    description:
      "Create real-time sales dashboards, financial reports, and KPI trackers that refresh automatically from multiple data sources.",
    bullets: [
      "Real-time sales & revenue dashboards",
      "Automated financial reporting pipelines",
      "Cross-department KPI tracking boards",
      "Multi-source data integration & refresh",
    ],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#E4F7FF" />
        <path d="M14 14h12v2H14v-2zm0 4h12v2H14v-2zm0 4h8v2h-8v-2zm-2-10v14a2 2 0 002 2h12a2 2 0 002-2V12a2 2 0 00-2-2H14a2 2 0 00-2 2z" fill="#0694D1" />
      </svg>
    ),
    tag: "Operations",
    title: "Custom Business Apps in Days",
    description:
      "Build inventory management, expense tracking, and field inspection apps using Power Apps without writing a single line of code.",
    bullets: [
      "Inventory & asset management systems",
      "Expense tracking & approval workflows",
      "Field inspection & audit mobile apps",
      "No-code internal tools & portals",
    ],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#E4F7FF" />
        <path d="M28 14H12a2 2 0 00-2 2v8a2 2 0 002 2h2l2 3 2-3h10a2 2 0 002-2v-8a2 2 0 00-2-2zm-10 9h-4v-2h4v2zm6-3H16v-2h8v2z" fill="#0694D1" />
      </svg>
    ),
    tag: "AI & Automation",
    title: "Intelligent Assistants with Copilot",
    description:
      "Deploy AI-powered helpdesk bots, customer service agents, and knowledge-base assistants using Copilot Studio.",
    bullets: [
      "AI-powered IT helpdesk chatbots",
      "Customer service virtual agents",
      "Knowledge-base search assistants",
      "Automated ticket routing & escalation",
    ],
  },
];

export default function UseCases() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current
      ?.querySelectorAll(".animate-on-scroll")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="use-cases"
      ref={sectionRef}
      style={{ backgroundColor: "#F0F9FF" }}
      className="py-24"
      aria-labelledby="use-cases-heading"
    >
      <div className="max-w-7xl mx-auto px-16 sm:px-24 lg:px-32">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <span className="section-badge mb-5 inline-flex">
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{display:'inline',verticalAlign:'middle'}}><rect x="2" y="7" width="20" height="14" rx="2" stroke="#0694D1" strokeWidth="1.8"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> Real-World Impact
          </span>
          <h2
            id="use-cases-heading"
            className="font-heading font-medium text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight mb-5"
            style={{ color: C.dark }}
          >
            How This Course Helps in{" "}
            <span className="text-shimmer-dark">Real Jobs</span>
          </h2>
          <p
            className="font-body text-base max-w-2xl mx-auto"
            style={{ color: "#6B7280", fontSize: "16px" }}
          >
            Our training is designed around real workplace scenarios. Here are
            some of the practical projects you will be able to build after
            completing this course.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((uc, i) => (
            <div
              key={i}
              className="animate-on-scroll group"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div
                className="h-full rounded-[16px] p-8 transition-all duration-300"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8EDF2",
                  borderLeft: "4px solid transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                    C.accent;
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 30px rgba(6,148,209,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                    "transparent";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Icon + Tag row */}
                <div className="flex items-center gap-4 mb-6">
                  {uc.icon}
                  <span
                    className="font-heading font-medium text-xs px-10 py-4 rounded-full"
                    style={{
                      backgroundColor: C.light,
                      color: C.accent,
                      fontSize: "12px",
                    }}
                  >
                    {uc.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-heading font-medium text-xl mb-3"
                  style={{ color: C.dark, fontSize: "20px" }}
                >
                  {uc.title}
                </h3>

                {/* Description */}
                <p
                  className="font-body mb-5"
                  style={{ color: "#374151", fontSize: "16px", lineHeight: 1.7 }}
                >
                  {uc.description}
                </p>

                {/* Bullet points */}
                <ul className="space-y-2">
                  {uc.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 block shrink-0"
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: C.accent,
                        }}
                      />
                      <span
                        className="font-body"
                        style={{ color: "#6B7280", fontSize: "14px" }}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

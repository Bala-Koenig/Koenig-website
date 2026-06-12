"use client";
import { useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const outcomes = [
  {
    title: "Build Apps Without Coding",
    desc: "Create custom web and mobile apps using Power Apps with drag-and-drop simplicity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#0694D1" strokeWidth="1.5" />
        <rect x="7" y="7" width="4" height="4" rx="1" stroke="#0694D1" strokeWidth="1.5" />
        <rect x="13" y="7" width="4" height="4" rx="1" stroke="#0694D1" strokeWidth="1.5" />
        <rect x="7" y="13" width="4" height="4" rx="1" stroke="#0694D1" strokeWidth="1.5" />
        <rect x="13" y="13" width="4" height="4" rx="1" stroke="#0694D1" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Automate Complex Workflows",
    desc: "Eliminate repetitive tasks with Power Automate — from approvals to data sync.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <path d="M12 3v4M12 17v4" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" stroke="#0694D1" strokeWidth="1.5" />
        <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 12h4M17 12h4" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Master AI Copilot",
    desc: "Use Microsoft Copilot in real scenarios to boost productivity by 40%.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" stroke="#0694D1" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Create Executive Dashboards",
    desc: "Build interactive Power BI reports that drive data-driven decisions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <rect x="3" y="13" width="4" height="8" rx="1" stroke="#0694D1" strokeWidth="1.5" />
        <rect x="10" y="9" width="4" height="12" rx="1" stroke="#0694D1" strokeWidth="1.5" />
        <rect x="17" y="3" width="4" height="18" rx="1" stroke="#0694D1" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Earn Microsoft Certifications",
    desc: "Prepare for PL-900 through PL-600 exams with hands-on practice.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <circle cx="12" cy="9" r="6" stroke="#0694D1" strokeWidth="1.5" />
        <path d="M8 21l4-3 4 3" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 15v6M16 15v6" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 7l1.5 1.5L14.5 6" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Increase Your Salary 35%+",
    desc: "Certified Power Platform professionals earn significantly more.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <path d="M12 2v20" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 6h5.5a3.5 3.5 0 010 7H8" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 13h6.5a3.5 3.5 0 010 7H8" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Outcomes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current
      ?.querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "#ffffff", padding: "80px 0" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Badge */}
        <div className="animate-on-scroll" style={{ textAlign: "center", marginBottom: "12px" }}>
          <span className="section-badge"><svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{display:'inline',verticalAlign:'middle'}}><circle cx="12" cy="12" r="10" stroke="#0694D1" strokeWidth="1.8"/><circle cx="12" cy="12" r="6" stroke="#0694D1" strokeWidth="1.8"/><circle cx="12" cy="12" r="2" stroke="#0694D1" strokeWidth="1.8"/></svg> Outcomes</span>
        </div>

        {/* Heading */}
        <h2
          className="animate-on-scroll"
          style={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: 500,
            color: C.dark,
            marginBottom: "48px",
            lineHeight: 1.3,
          }}
        >
          What You Will{" "}
          <span className="text-shimmer-dark">Achieve</span>
        </h2>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="outcomes-grid"
        >
          {outcomes.map((item, i) => (
            <div
              key={i}
              className="animate-on-scroll outcomes-card"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #E8EDF2",
                borderRadius: "12px",
                padding: "32px 28px",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
                cursor: "default",
                animationDelay: `${i * 80}ms`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "0 12px 32px rgba(6, 148, 209, 0.12)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: C.light,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: C.dark,
                  marginBottom: "8px",
                  lineHeight: 1.4,
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "#374151",
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        .outcomes-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 992px) {
          .outcomes-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 700px) {
          .outcomes-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

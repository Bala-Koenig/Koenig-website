"use client";
import { useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const plans = [
  {
    name: "Self-Paced",
    price: "$599",
    original: null,
    badge: null,
    highlighted: false,
    features: [
      "Recorded sessions",
      "Lab access (30 days)",
      "Email support",
      "1 certification prep",
      "Course materials",
    ],
    cta: "Get Started",
    ctaStyle: "outline" as const,
  },
  {
    name: "Live Online",
    price: "$1,799",
    original: "$2,499",
    badge: "Most Popular",
    highlighted: true,
    prefix: "Everything in Self-Paced PLUS:",
    features: [
      "Live 1-on-1 instructor",
      "Flexible scheduling",
      "90-day lab access",
      "All 6 cert preps",
      "Priority support",
      "Exam guarantee",
    ],
    cta: "Enroll Now",
    ctaStyle: "solid" as const,
  },
  {
    name: "Enterprise",
    price: "Custom",
    original: null,
    badge: null,
    highlighted: false,
    prefix: "Everything in Live PLUS:",
    features: [
      "Team training (5+)",
      "Custom curriculum",
      "Dedicated account manager",
      "On-site option",
      "Volume discounts",
      "Fly-Me-A-Trainer",
    ],
    cta: "Contact Sales",
    ctaStyle: "outline" as const,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      id="pricing"
      ref={sectionRef}
      className="py-24 bg-white"
      aria-labelledby="pricing-heading"
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "1200px", paddingLeft: "16px", paddingRight: "16px" }}
      >
        {/* Header */}
        <div className="animate-on-scroll text-center" style={{ marginBottom: "48px" }}>
          <span className="section-badge inline-flex" style={{ marginBottom: "20px" }}>
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{display:'inline',verticalAlign:'middle'}}><circle cx="12" cy="12" r="10" stroke="#0694D1" strokeWidth="1.8"/><path d="M12 6v12M8 9.5h5a2.5 2.5 0 010 5H8" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> Pricing
          </span>
          <h2
            id="pricing-heading"
            className="font-heading font-medium leading-tight"
            style={{
              color: C.dark,
              fontSize: "2.6rem",
              marginBottom: "20px",
            }}
          >
            Invest in Your{" "}
            <span className="text-shimmer-dark">Future</span>
          </h2>
          <p
            className="font-body"
            style={{ color: "#6B7280", fontSize: "16px" }}
          >
            Choose the plan that fits your learning style
          </p>
        </div>

        {/* Cards */}
        <div
          className="animate-on-scroll"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
            alignItems: "center",
            transitionDelay: "0.1s",
          }}
        >
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              style={{
                borderRadius: "16px",
                border: plan.highlighted
                  ? `2px solid ${C.accent}`
                  : "1px solid #E5E7EB",
                backgroundColor: plan.highlighted ? "#FAFCFF" : "#FFFFFF",
                padding: "40px 32px",
                position: "relative",
                transform: plan.highlighted ? "translateY(-8px)" : "none",
                boxShadow: plan.highlighted
                  ? `0 20px 60px rgba(6, 148, 209, 0.15), 0 4px 20px rgba(6, 148, 209, 0.1)`
                  : "0 1px 3px rgba(0,0,0,0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                display: "flex",
                flexDirection: "column" as const,
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: C.accent,
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "4px 16px",
                    borderRadius: "20px",
                    whiteSpace: "nowrap" as const,
                  }}
                  className="font-body"
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <h3
                className="font-heading font-medium"
                style={{
                  color: C.dark,
                  fontSize: "22px",
                  marginBottom: "8px",
                }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div style={{ marginBottom: "24px" }}>
                <span
                  className="font-heading font-medium"
                  style={{
                    color: C.dark,
                    fontSize: plan.highlighted ? "48px" : "42px",
                    lineHeight: 1.1,
                  }}
                >
                  {plan.price}
                </span>
                {plan.original && (
                  <span
                    className="font-body"
                    style={{
                      color: "#9CA3AF",
                      fontSize: "16px",
                      textDecoration: "line-through",
                      marginLeft: "10px",
                    }}
                  >
                    {plan.original}
                  </span>
                )}
                {plan.price !== "Custom" && (
                  <span
                    className="font-body"
                    style={{
                      color: "#6B7280",
                      fontSize: "14px",
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    per person
                  </span>
                )}
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#E5E7EB",
                  marginBottom: "24px",
                }}
              />

              {/* Features */}
              <div style={{ flex: 1, marginBottom: "32px" }}>
                {plan.prefix && (
                  <p
                    className="font-body"
                    style={{
                      color: C.dark,
                      fontSize: "14px",
                      fontWeight: 600,
                      marginBottom: "12px",
                    }}
                  >
                    {plan.prefix}
                  </p>
                )}
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="font-body"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontSize: "16px",
                        color: "#374151",
                        marginBottom: "12px",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        style={{ flexShrink: 0, marginTop: "2px" }}
                      >
                        <circle cx="10" cy="10" r="10" fill={plan.highlighted ? C.accent : C.light} />
                        <path
                          d="M6 10.5L8.5 13L14 7.5"
                          stroke={plan.highlighted ? "#FFFFFF" : C.accent}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="font-body"
                style={{
                  display: "block",
                  textAlign: "center" as const,
                  padding: plan.highlighted ? "16px 32px" : "14px 28px",
                  borderRadius: "12px",
                  fontSize: plan.highlighted ? "17px" : "16px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  ...(plan.ctaStyle === "solid"
                    ? {
                        backgroundColor: C.accent,
                        color: "#FFFFFF",
                        border: "none",
                        boxShadow: `0 4px 14px rgba(6, 148, 209, 0.35)`,
                      }
                    : {
                        backgroundColor: "transparent",
                        color: C.accent,
                        border: `2px solid ${C.accent}`,
                      }),
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Urgency strip */}
        <div
          className="animate-on-scroll"
          style={{
            marginTop: "48px",
            textAlign: "center" as const,
            transitionDelay: "0.2s",
          }}
        >
          <div
            className="font-body"
            style={{
              display: "inline-block",
              backgroundColor: "#FEF3C7",
              color: "#92400E",
              fontSize: "16px",
              fontWeight: 600,
              padding: "12px 28px",
              borderRadius: "12px",
              border: "1px solid #FDE68A",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16" style={{display:'inline',verticalAlign:'middle',marginRight:'6px'}}><circle cx="12" cy="12" r="10" stroke="#92400E" strokeWidth="1.8"/><path d="M12 6v6l4 2" stroke="#92400E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Limited seats available for March batch — 3 spots remaining
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 992px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
            max-width: 480px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          div[style*="grid-template-columns: repeat(3"] > div {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

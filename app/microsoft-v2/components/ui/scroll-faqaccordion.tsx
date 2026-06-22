"use client";

import * as React from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

interface ScrollFAQAccordionProps {
  data: FAQItem[];
  className?: string;
  onCTA?: () => void;
}

const CATEGORIES = ["All", "Certifications", "Training", "Pricing", "Enterprise"];

const CATEGORY_MAP: Record<number, string> = {
  1: "Certifications", 2: "Certifications", 3: "Certifications",
  4: "Training", 5: "Training",
  6: "Pricing", 7: "Pricing", 8: "Enterprise",
  9: "Certifications", 10: "Training",
};

export default function ScrollFAQAccordion({ data = [], onCTA }: ScrollFAQAccordionProps) {
  const [openItem, setOpenItem] = React.useState<number | null>(1);
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filtered = activeCategory === "All"
    ? data
    : data.filter(item => CATEGORY_MAP[item.id] === activeCategory);

  const half = Math.ceil(filtered.length / 2);
  const col1 = filtered.slice(0, half);
  const col2 = filtered.slice(half);

  return (
    <section className="faq-chatbot-sec" style={{ position: "relative", overflow: "hidden", background: "#F0FAFF", padding: "40px clamp(16px,4vw,48px) 0" }}>

      {/* Dot-grid background */}
      <div style={{
        pointerEvents: "none", position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, #c7e9f7 1px, transparent 1px)",
        backgroundSize: "28px 28px", opacity: 0.45,
      }} />
      {/* Radial blobs */}
      <div style={{
        pointerEvents: "none", position: "absolute", left: -128, top: 0,
        width: 520, height: 520, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6,148,209,0.10) 0%, transparent 70%)",
      }} />
      <div style={{
        pointerEvents: "none", position: "absolute", bottom: -80, right: -80,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(77,191,239,0.10) 0%, transparent 70%)",
      }} />

      <style>{`
        @keyframes gradText {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 40px; }
        .faq-cta-bottom {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 20px;
          background: linear-gradient(135deg,#071e2e 0%,#093148 100%);
          border-radius: 20px; padding: 28px 36px;
          box-shadow: 0 8px 32px rgba(6,148,209,0.15);
        }
        .faq-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        @media(max-width:768px){
          .faq-grid { grid-template-columns: 1fr; }
          .faq-cta-bottom { flex-direction: column; align-items: stretch; padding: 20px; border-radius: 14px; }
          .faq-cta-btns { flex-direction: column; }
          .faq-cta-btns a, .faq-cta-btns button { width: 100%; justify-content: center; box-sizing: border-box; }
        }
        @media(max-width:600px){
          .faq-cat-filters { display: none; }
          .faq-grid { margin-bottom: 28px; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16,
            fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#0694D1",
            background: "#EBF8FE", border: "1px solid #CAEFFF",
            padding: "6px 14px", borderRadius: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0694D1", display: "inline-block" }} />
            FAQs
          </span>
          <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#071e2e", margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.25 }}>
            Got Questions?{" "}
            <span style={{
              background: "linear-gradient(90deg, #0694D1 0%, #50e6ff 45%, #a8d8ff 65%, #0694D1 100%)",
              backgroundSize: "250% 100%",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              animation: "gradText 5s ease infinite",
            }}>
              We&apos;ve Got Answers.
            </span>
          </h2>
          <p style={{ fontSize: 15, color: "#6b8299", lineHeight: 1.65, margin: "0 auto", maxWidth: 500 }}>
            Everything you need to know about Microsoft certification training with Koenig Solutions.
          </p>
        </div>

        {/* Category filters */}
        <div className="faq-cat-filters" style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenItem(null); }}
              style={{
                padding: "7px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
                background: activeCategory === cat ? "#0694D1" : "#fff",
                color: activeCategory === cat ? "#fff" : "#4a6375",
                border: `1.5px solid ${activeCategory === cat ? "#0694D1" : "rgba(6,148,209,0.15)"}`,
                boxShadow: activeCategory === cat ? "0 4px 12px rgba(6,148,209,0.25)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Two-column FAQ grid */}
        <div className="faq-grid">
          {[col1, col2].map((col, ci) => (
            <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {col.map(item => {
                const isOpen = openItem === item.id;
                return (
                  <div
                    key={item.id}
                    style={{
                      position: "relative", overflow: "hidden",
                      borderRadius: 16, background: "#fff",
                      border: `1.5px solid ${isOpen ? "#0694d1" : "#CAEFFF"}`,
                      boxShadow: isOpen ? "0 8px 28px rgba(6,148,209,0.13)" : "0 2px 8px rgba(0,0,0,0.04)",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                  >
                    {/* Left accent bar */}
                    <div style={{
                      position: "absolute", left: 0, top: 0, bottom: 0, width: 3, borderRadius: "16px 0 0 16px",
                      background: isOpen ? "linear-gradient(180deg,#0694d1 0%,#4DBFEF 100%)" : "transparent",
                      transition: "background 0.3s",
                    }} />

                    <button
                      onClick={() => setOpenItem(isOpen ? null : item.id)}
                      style={{
                        width: "100%", display: "flex", alignItems: "flex-start", gap: 12,
                        paddingLeft: 20, paddingRight: 16, paddingTop: 18, paddingBottom: 18,
                        background: "transparent", border: "none", cursor: "pointer",
                        textAlign: "left", fontFamily: "inherit",
                      }}
                    >
                      {/* Question — no number, matches homepage font weight & colour */}
                      <span style={{
                        flex: 1, fontSize: 14, fontWeight: 600, lineHeight: 1.45,
                        color: isOpen ? "#0694D1" : "#22262a",
                        transition: "color 0.3s",
                      }}>
                        {item.question}
                      </span>
                      {/* Chevron */}
                      <span style={{
                        flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: isOpen ? "linear-gradient(135deg,#0694d1,#076d9d)" : "#EBF8FE",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s",
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                          stroke={isOpen ? "white" : "#0694d1"}
                          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>

                    {/* Answer — grid-template-rows animation matching homepage */}
                    <div style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)",
                    }}>
                      <div style={{ overflow: "hidden" }}>
                        <div style={{
                          paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 18,
                          fontSize: 13.5, color: "#94A3B8", lineHeight: 1.75,
                          borderTop: "1px solid #EBF8FE",
                        }}>
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom CTA strip — data unchanged */}
        <div className="faq-cta-bottom">
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
              Still have questions?
            </div>
            <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)" }}>
              Talk to a Microsoft certification advisor — free, no obligation.
            </div>
          </div>
          <div className="faq-cta-btns">
            <a
              href="https://wa.me/18005551234"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "11px 22px", borderRadius: 10,
                border: "1.5px solid rgba(37,211,102,0.35)",
                color: "#fff", fontSize: 13.5, fontWeight: 600,
                textDecoration: "none", background: "rgba(37,211,102,0.12)",
                transition: "background 0.2s",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{color:"#25D366"}}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
            <button
              onClick={() => { if (onCTA) onCTA(); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "11px 22px", borderRadius: 10,
                background: "#0694D1", border: "none",
                color: "#fff", fontSize: 13.5, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 4px 16px rgba(6,148,209,0.35)",
                transition: "background 0.2s, transform 0.15s",
              }}
            >
              Request More Info →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

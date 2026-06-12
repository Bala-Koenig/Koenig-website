"use client";
import { useState, useEffect, useRef } from "react";

/* ── Power Platform FAQ data (tech page content) ─────────── */
const FAQ_DATA = [
  { id: 1,  question: "What is Microsoft Power Platform?",                              answer: "Microsoft Power Platform is a suite of five powerful low-code/no-code tools: Power Apps, Power Automate, Power BI, Copilot Studio, and Power Pages — deeply integrated with Microsoft 365, Azure, and Dynamics 365." },
  { id: 2,  question: "Who should take this Power Platform training?",                  answer: "IT professionals, business analysts, citizen developers, data analysts, project managers, and anyone seeking foundational to expert-level Microsoft Power Platform certification." },
  { id: 3,  question: "What certifications does this course prepare me for?",           answer: "PL-900 (Fundamentals), PL-100 (App Maker), PL-200 (Functional Consultant), PL-300 (Power BI Data Analyst), PL-400 (Developer), and PL-600 (Solution Architect)." },
  { id: 4,  question: "How long is the training and what formats are available?",       answer: "The complete bundle spans 40+ hours across 5 days. Formats: Live Online (instructor-led), Self-Paced (90-day access), On-Site Corporate, and Bootcamp Weekend." },
  { id: 5,  question: "Do I get access to lab environments?",                           answer: "Yes — every student gets a dedicated Microsoft 365 tenant with full Power Platform capabilities. 15+ real lab exercises with 30-day post-training access." },
  { id: 6,  question: "What is the exam pass rate?",                                    answer: "Our current pass rate is 98% across all Power Platform certifications, achieved through intensive practice exams and real-world lab scenarios." },
  { id: 7,  question: "Is there post-training support?",                                answer: "Yes — lifetime alumni community (40,000+ members), 90-day recorded session access, dedicated Q&A forum, monthly live webinars, and support email." },
  { id: 8,  question: "What if I don't pass the certification exam?",                   answer: "We offer an Exam Guarantee — free re-training session covering weak areas plus additional practice exam access at no extra cost." },
  { id: 9,  question: "What is the passing score for Power Platform certifications?",   answer: "Microsoft sets the passing score at 700 out of 1000. This threshold applies to PL-900, PL-100, PL-200, PL-300, and PL-400 exams." },
  { id: 10, question: "How long is a Power Platform certification valid?",               answer: "Associate and Expert level certifications are valid for one year from the date of passing. Renew annually for free via Microsoft Learn. Foundational certifications (PL-900) do not expire." },
  { id: 11, question: "Can I take the Power Platform exam online from home?",            answer: "Yes. All Power Platform certification exams can be taken online via OnVUE (Pearson VUE) from your home or office with remote proctoring." },
  { id: 12, question: "What is the exam fee for Power Platform certifications?",         answer: "The standard exam fee is approximately USD 165 per exam (prices vary by country). Our training bundles often include exam vouchers at no additional cost." },
];

const CATEGORIES = ["All", "Platform", "Training", "Certifications", "Pricing"];

const CATEGORY_MAP: Record<number, string> = {
  1: "Platform",
  2: "Training",
  3: "Certifications",
  4: "Training",
  5: "Training",
  6: "Certifications",
  7: "Training",
  8: "Certifications",
  9: "Certifications",
  10: "Certifications",
  11: "Certifications",
  12: "Pricing",
};

const INITIAL_FAQ = 6;

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(() =>
    typeof window !== "undefined" && window.innerWidth <= 700 ? null : 1
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const handleCategory = (cat: string) => { setActiveCategory(cat); setShowAllFaq(false); };
  const [showAllFaq, setShowAllFaq] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = activeCategory === "All"
    ? FAQ_DATA
    : FAQ_DATA.filter(item => CATEGORY_MAP[item.id] === activeCategory);

  const visible = showAllFaq ? filtered : filtered.slice(0, INITIAL_FAQ);
  const half = Math.ceil(visible.length / 2);
  const col1 = visible.slice(0, half);
  const col2 = visible.slice(half);

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes gradText {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        .faq-pp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 15px; }
        .faq-pp-accordion-col { display: flex; flex-direction: column; gap: 15px; }
        .faq-pp-cta-bottom {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 20px;
          background: linear-gradient(135deg,#071e2e 0%,#093148 100%);
          border-radius: 20px; padding: 28px 36px;
          box-shadow: 0 8px 32px rgba(6,148,209,0.15);
        }
        .faq-pp-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        @media(max-width:768px){
          .faq-pp-grid { grid-template-columns: 1fr; }
          .faq-pp-cta-bottom { flex-direction: column; align-items: stretch; padding: 20px; border-radius: 14px; }
          .faq-pp-cta-btns { flex-direction: column; }
          .faq-pp-cta-btns a, .faq-pp-cta-btns button { width: 100%; justify-content: center; box-sizing: border-box; }
        }
        @media(max-width:700px){
          .faq-pp-cta-btns a, .faq-pp-cta-btns button { width: 100%; justify-content: center; box-sizing: border-box; }
          .faq-pp-accordion-btn { padding-left: 14px !important; padding-right: 10px !important; padding-top: 13px !important; padding-bottom: 13px !important; }
          .faq-pp-answer-body { padding-left: 14px !important; padding-right: 14px !important; }
          .faq-pp-grid { margin-bottom: 28px; }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{ position: "relative", overflow: "hidden", background: "#F0FAFF", padding: "30px 16px" }}
      >
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

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

          {/* Header */}
          <div className="animate-on-scroll" style={{ textAlign: "center", marginBottom: 15 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 15,
              fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#0694D1",
              background: "#EBF8FE", border: "1px solid #CAEFFF",
              padding: "6px 14px", borderRadius: 20,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0694D1", display: "inline-block" }} />
              FAQs
            </span>
            <h2 style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 800, color: "#071e2e", margin: "0 0 15px", letterSpacing: "-0.02em", lineHeight: 1.25, fontFamily: "'GTWalsheimPro', sans-serif" }}>
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
              Everything you need to know about Microsoft Power Platform certification training with Koenig Solutions.
            </p>
          </div>

          {/* Category filters */}
          <div className="faq-pp-cat-filters animate-on-scroll" style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 15, transitionDelay: "0.05s" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { handleCategory(cat); setOpenItem(null); }}
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

          {/* Two-column accordion grid */}
          <div className="faq-pp-grid animate-on-scroll" style={{ transitionDelay: "0.1s" }}>
            {[col1, col2].map((col, ci) => (
              <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                        borderRadius: "16px 0 0 16px",
                        background: isOpen ? "linear-gradient(180deg,#0694d1 0%,#4DBFEF 100%)" : "transparent",
                        transition: "background 0.3s",
                      }} />

                      <button
                        className="faq-pp-accordion-btn"
                        onClick={() => setOpenItem(isOpen ? null : item.id)}
                        style={{
                          width: "100%", display: "flex", alignItems: "flex-start", gap: 12,
                          paddingLeft: 20, paddingRight: 16, paddingTop: 18, paddingBottom: 18,
                          background: "transparent", border: "none", cursor: "pointer",
                          textAlign: "left", fontFamily: "inherit",
                        }}
                      >
                        <span style={{
                          flex: 1, fontSize: 14, fontWeight: 600, lineHeight: 1.45,
                          color: isOpen ? "#0694D1" : "#22262a",
                          transition: "color 0.3s",
                        }}>
                          {item.question}
                        </span>
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

                      {/* Answer */}
                      <div style={{
                        display: "grid",
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        transition: "grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)",
                      }}>
                        <div style={{ overflow: "hidden" }}>
                          <div
                            className="faq-pp-answer-body"
                            style={{
                              paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 18,
                              fontSize: 13.5, color: "#94A3B8", lineHeight: 1.75,
                              borderTop: "1px solid #EBF8FE",
                            }}
                          >
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

          {/* View More / Show Less FAQ */}
          {filtered.length > INITIAL_FAQ && (
            <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 18px" }}>
              <button
                onClick={() => setShowAllFaq(v => !v)}
                style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#0694D1", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                {showAllFaq ? "Show Less FAQ" : "View More FAQ"}
                {showAllFaq
                  ? <svg width="16" height="18" viewBox="0 0 24 26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 13 12 7 7 13"/><polyline points="17 20 12 14 7 20"/></svg>
                  : <svg width="16" height="18" viewBox="0 0 24 26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 6 12 12 7 6"/><polyline points="17 13 12 19 7 13"/></svg>
                }
              </button>
            </div>
          )}

          {/* Bottom CTA strip */}
          <div className="faq-pp-cta-bottom animate-on-scroll" style={{ transitionDelay: "0.15s" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 4, fontFamily: "'GTWalsheimPro', sans-serif" }}>
                Still have questions?
              </div>
              <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)" }}>
                Talk to a Power Platform certification advisor — free, no obligation.
              </div>
            </div>
            <div className="faq-pp-cta-btns">
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
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#25D366" }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("openContactModal", { detail: { type: "individual" } }))}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 22px", borderRadius: 10,
                  background: "#0694D1", border: "none",
                  color: "#fff", fontSize: 13.5, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                  boxShadow: "0 4px 16px rgba(6,148,209,0.35)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#057ab5")}
                onMouseLeave={e => (e.currentTarget.style.background = "#0694D1")}
              >
                Request More Info →
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

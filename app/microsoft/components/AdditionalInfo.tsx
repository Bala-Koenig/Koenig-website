"use client";
import { useState, useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const prerequisites = [
  "Basic understanding of Power Platform components (Power BI, Power Apps, Power Automate)",
  "Familiarity with Power Platform capabilities and features",
  "Basic knowledge of the development environment",
  "Understanding of security and governance features",
  "Awareness of data sources and connectors",
  "Basic knowledge of integration and deployment options",
];

const whoShouldTake = [
  { role: "IT Professionals", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke={C.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { role: "Business Analysts", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke={C.accent} strokeWidth="1.6"/></svg> },
  { role: "BI Professionals", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><circle cx="12" cy="12" r="10" stroke={C.accent} strokeWidth="1.6"/><path d="M12 6v6l4 2" stroke={C.accent} strokeWidth="1.6" strokeLinecap="round"/></svg> },
  { role: "Project Managers", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke={C.accent} strokeWidth="1.6"/><path d="M9 14l2 2 4-4" stroke={C.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { role: "Data Analysts", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><path d="M4 20h16M4 20V10M9 20V6M14 20V12M19 20V8" stroke={C.accent} strokeWidth="2" strokeLinecap="round"/></svg> },
  { role: "Business Users", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={C.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { role: "Developers", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><path d="M8 6l-6 6 6 6M16 6l6 6-6 6" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];

const studentFeedback = [
  { name: "Rahul Verma", role: "Power BI Developer", company: "TCS", rating: 5, avatar: "RV", review: "Exceptional training quality. The instructor explained complex DAX concepts in a very clear, practical manner. Passed PL-300 on the first attempt." },
  { name: "Anita Krishnamurthy", role: "IT Consultant", company: "Wipro", rating: 5, avatar: "AK", review: "The 1-on-1 training format was perfect for my schedule. Highly personalized sessions and the trainer was always available for queries after class hours." },
  { name: "Siddharth Malhotra", role: "Solution Architect", company: "Infosys", rating: 5, avatar: "SM", review: "The Power Platform Developer (PL-400) track was comprehensive and challenging. Real lab exercises aligned perfectly with the exam objectives." },
  { name: "Preethi Nair", role: "Business Analyst", company: "HCL", rating: 4, avatar: "PN", review: "Great content structure and very knowledgeable trainers. The post-training support community is extremely helpful for doubt resolution." },
];

const certFaqItems = [
  { q: "What is the passing score for Microsoft Power Platform certifications?", a: "Microsoft sets the passing score for most Power Platform certifications at 700 out of 1000. The exact number of questions and passing score can vary by exam version, but the 700/1000 threshold applies to PL-900, PL-100, PL-200, PL-300, and PL-400." },
  { q: "How long is a Microsoft Power Platform certification valid?", a: "Microsoft Power Platform certifications (Associate and Expert level) are valid for one year from the date of passing. You must renew annually by completing a free online renewal assessment at Microsoft Learn. Foundational certifications (PL-900) do not expire." },
  { q: "Can I take the Microsoft Power Platform exam online from home?", a: "Yes. All Microsoft Power Platform certification exams can be taken online via OnVUE (Pearson VUE) from your home or office. Your environment must meet specific system requirements, and you will be monitored by a remote proctor throughout the exam." },
  { q: "What is the exam fee for Power Platform certifications?", a: "The standard exam fee is approximately USD 165 per exam (prices vary by country). Our training bundles often include exam vouchers at no additional cost." },
];

const tabs = [
  { label: "Prerequisites", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.6"/></svg> },
  { label: "Student Reviews", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg> },
  { label: "Cert FAQ", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/><path d="M9 9a3 3 0 015.12-2.13A3 3 0 0112 13v1M12 17h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
  { label: "General FAQ", icon: <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];

const generalFaqs = [
  { q: "What is Microsoft Power Platform?", a: "Microsoft Power Platform is a suite of five powerful low-code/no-code tools: Power Apps, Power Automate, Power BI, Copilot Studio, and Power Pages — deeply integrated with Microsoft 365, Azure, and Dynamics 365." },
  { q: "Who should take this Power Platform training?", a: "IT professionals, business analysts, citizen developers, data analysts, project managers, and anyone seeking foundational to expert-level Microsoft certification." },
  { q: "What certifications does this course prepare me for?", a: "PL-900 (Fundamentals), PL-100 (App Maker), PL-200 (Functional Consultant), PL-300 (Power BI Data Analyst), PL-400 (Developer), and PL-600 (Solution Architect)." },
  { q: "How long is the training and what formats are available?", a: "The complete bundle spans 40+ hours across 5 days. Formats: Live Online (instructor-led), Self-Paced (90-day access), On-Site Corporate, and Bootcamp Weekend." },
  { q: "Do I get access to lab environments?", a: "Yes — every student gets a dedicated Microsoft 365 tenant with full Power Platform capabilities. 15+ real lab exercises with 30-day post-training access." },
  { q: "What is the exam pass rate?", a: "Our current pass rate is 98% across all Power Platform certifications, achieved through intensive practice exams and real-world lab scenarios." },
  { q: "Is there post-training support?", a: "Yes — lifetime alumni community (40,000+ members), 90-day recorded session access, dedicated Q&A forum, monthly live webinars, and support email." },
  { q: "What if I don't pass the certification exam?", a: "We offer an Exam Guarantee — free re-training session covering weak areas plus additional practice exam access at no extra cost." },
];

export default function AdditionalInfo() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
    <section ref={sectionRef} className="py-[60px] bg-white" aria-labelledby="addinfo-heading">
      <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px]">

        {/* ── Tab buttons — pill style ─────────── */}
        <div className="animate-on-scroll flex justify-center mb-[40px]">
          <div className="inline-flex rounded-[14px] p-[4px]" style={{ backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0" }}>
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className="flex items-center gap-[8px] px-[20px] py-[11px] rounded-[11px] text-[14px] font-heading font-medium transition-all duration-300"
                style={
                  activeTab === i
                    ? { backgroundColor: C.accent, color: "#fff", boxShadow: "0 2px 10px rgba(6,148,209,0.3)" }
                    : { backgroundColor: "transparent", color: "#64748B" }
                }
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab 0: Prerequisites ──────────────── */}
        {activeTab === 0 && (
          <div className="max-w-[900px] mx-auto">
            {/* Prerequisites */}
            <div className="mb-[40px]">
              <h2 className="font-heading font-medium text-[22px] mb-[20px]" style={{ color: C.dark }}>
                Prerequisites for Certification
              </h2>
              <div className="grid sm:grid-cols-2 gap-[10px]">
                {prerequisites.map((p, i) => (
                  <div key={i} className="flex items-start gap-[12px] p-[16px] rounded-[12px] border" style={{ backgroundColor: "#FAFCFF", borderColor: "#E8EDF2" }}>
                    <div className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center flex-shrink-0 mt-[1px]" style={{ backgroundColor: "rgba(6,148,209,0.1)" }}>
                      <svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px]"><path d="M5 13l4 4L19 7" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p className="font-body text-[14px] leading-[1.5]" style={{ color: "#374151" }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ── Tab 1: Student Feedback ──────────── */}
        {activeTab === 1 && (
          <div className="max-w-[900px] mx-auto">
            {/* Rating summary */}
            <div className="flex items-center gap-[24px] mb-[32px] p-[24px] rounded-[16px]" style={{ backgroundColor: "#FAFCFF", border: "1px solid #E8EDF2" }}>
              <div className="text-center">
                <p className="font-heading font-medium text-[48px] leading-none" style={{ color: C.dark }}>4.9</p>
                <div className="flex gap-[2px] mt-[6px] justify-center">
                  {"★★★★★".split("").map((s, i) => <span key={i} className="text-[16px]" style={{ color: "#F59E0B" }}>{s}</span>)}
                </div>
                <p className="font-body text-[12px] mt-[4px]" style={{ color: "#94A3B8" }}>3,200+ reviews</p>
              </div>
              <div className="w-[1px] h-[60px]" style={{ backgroundColor: "#E2E8F0" }} />
              <div className="flex-1 space-y-[6px]">
                {[
                  { stars: 5, pct: 85 },
                  { stars: 4, pct: 10 },
                  { stars: 3, pct: 3 },
                  { stars: 2, pct: 1 },
                  { stars: 1, pct: 1 },
                ].map((r) => (
                  <div key={r.stars} className="flex items-center gap-[8px]">
                    <span className="text-[12px] font-heading font-medium w-[14px]" style={{ color: "#64748B" }}>{r.stars}</span>
                    <div className="flex-1 h-[6px] rounded-full" style={{ backgroundColor: "#F1F5F9" }}>
                      <div className="h-[6px] rounded-full transition-all duration-500" style={{ width: `${r.pct}%`, backgroundColor: r.pct > 50 ? C.accent : "#94A3B8" }} />
                    </div>
                    <span className="text-[11px] font-body w-[30px] text-right" style={{ color: "#94A3B8" }}>{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review cards */}
            <div className="grid sm:grid-cols-2 gap-[14px]">
              {studentFeedback.map((fb) => (
                <div key={fb.name} className="p-[22px] rounded-[14px] border transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
                  style={{ backgroundColor: "#fff", borderColor: "#E8EDF2" }}>
                  <div className="flex items-center gap-[10px] mb-[14px]">
                    <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center font-heading font-medium text-white text-[13px]"
                      style={{ background: `linear-gradient(135deg, ${C.dark}, ${C.accent})` }}>
                      {fb.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-heading font-medium text-[14px]" style={{ color: C.dark }}>{fb.name}</p>
                      <p className="font-body text-[12px]" style={{ color: "#94A3B8" }}>{fb.role} · {fb.company}</p>
                    </div>
                    <div className="flex gap-[1px]">
                      {Array.from({ length: fb.rating }).map((_, i) => (
                        <span key={i} className="text-[12px]" style={{ color: "#F59E0B" }}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="font-body text-[14px] leading-[1.6]" style={{ color: "#374151" }}>
                    &ldquo;{fb.review}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab 2: FAQ ───────────────────────── */}
        {activeTab === 2 && (
          <div className="max-w-[800px] mx-auto space-y-[10px]">
            {certFaqItems.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.q} className="rounded-[14px] border overflow-hidden transition-all duration-300"
                  style={{ borderColor: isOpen ? "rgba(6,148,209,0.35)" : "#E8EDF2", backgroundColor: isOpen ? "#F8FCFF" : "#fff" }}
                  itemScope itemType="https://schema.org/Question">
                  <button onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center gap-[14px] px-[20px] py-[18px] text-left" aria-expanded={isOpen}>
                    <div className="flex-shrink-0 w-[28px] h-[28px] rounded-[8px] flex items-center justify-center transition-all duration-300"
                      style={{ backgroundColor: isOpen ? C.accent : "rgba(6,148,209,0.08)", border: isOpen ? "none" : "1px solid rgba(6,148,209,0.15)" }}>
                      <svg className="w-[12px] h-[12px] transition-transform duration-300" style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                        fill="none" stroke={isOpen ? "#fff" : C.accent} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <h3 className="flex-1 font-heading font-medium text-[15px]" itemProp="name" style={{ color: C.dark }}>{faq.q}</h3>
                  </button>
                  <div className="accordion-content" style={{ maxHeight: isOpen ? "300px" : "0" }} itemScope itemType="https://schema.org/Answer">
                    <p className="px-[20px] pb-[20px] text-[14px] font-body leading-[1.7] ml-[42px]" itemProp="text" style={{ color: "#6B7280" }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Tab 3: General FAQ ────────────────── */}
        {activeTab === 3 && (
          <div className="max-w-[800px] mx-auto space-y-[10px]">
            {generalFaqs.map((faq, i) => {
              const isOpen = openFaq === (100 + i);
              return (
                <div key={faq.q} className="rounded-[14px] border overflow-hidden transition-all duration-300"
                  style={{ borderColor: isOpen ? "rgba(6,148,209,0.35)" : "#E8EDF2", backgroundColor: isOpen ? "#F8FCFF" : "#fff" }}
                  itemScope itemType="https://schema.org/Question">
                  <button onClick={() => setOpenFaq(isOpen ? null : 100 + i)}
                    className="w-full flex items-center gap-[14px] px-[20px] py-[18px] text-left" aria-expanded={isOpen}>
                    <div className="flex-shrink-0 w-[28px] h-[28px] rounded-[8px] flex items-center justify-center transition-all duration-300"
                      style={{ backgroundColor: isOpen ? C.accent : "rgba(6,148,209,0.08)", border: isOpen ? "none" : "1px solid rgba(6,148,209,0.15)" }}>
                      <svg className="w-[12px] h-[12px] transition-transform duration-300" style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                        fill="none" stroke={isOpen ? "#fff" : C.accent} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <h3 className="flex-1 font-heading font-medium text-[15px]" itemProp="name" style={{ color: C.dark }}>{faq.q}</h3>
                  </button>
                  <div className="accordion-content" style={{ maxHeight: isOpen ? "300px" : "0" }} itemScope itemType="https://schema.org/Answer">
                    <p className="px-[20px] pb-[20px] text-[14px] font-body leading-[1.7] ml-[42px]" itemProp="text" style={{ color: "#6B7280" }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

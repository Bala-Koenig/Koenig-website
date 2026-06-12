"use client";
import { useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF", bg: "#071F30" };

const KfGradCap = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10l-10-5-10 5 10 5 10-5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/><line x1="22" y1="10" x2="22" y2="16"/></svg>);
const KfFlask = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6"/><path d="M10 3v6.5L3.5 19a1.5 1.5 0 0 0 1.28 2.26h14.44A1.5 1.5 0 0 0 20.5 19L14 9.5V3"/></svg>);
const KfPresentation = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="7" y1="8" x2="11" y2="12"/><line x1="11" y1="8" x2="7" y2="12"/></svg>);
const KfFolder = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>);
const KfRefresh = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>);
const KfChatBubble = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>);
const KfBarChart = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>);
const KfBuilding = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9.01" y2="6"/><line x1="15" y1="6" x2="15.01" y2="6"/><line x1="9" y1="10" x2="9.01" y2="10"/><line x1="15" y1="10" x2="15.01" y2="10"/><line x1="9" y1="14" x2="9.01" y2="14"/><line x1="15" y1="14" x2="15.01" y2="14"/><path d="M9 22v-4h6v4"/></svg>);
const KfStar = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);

const features = [
  { icon: <KfGradCap />, title: "Microsoft-Authorized Certification",  desc: "Earn globally recognized Microsoft certifications (PL-900 to PL-400) accepted by top employers worldwide.",                                  highlight: "5 Cert Paths"   },
  { icon: <KfFlask />, title: "Hands-On Lab Environment",            desc: "Practice on live Microsoft 365 tenants with pre-configured lab environments. Build real apps during training.",                              highlight: "15+ Labs"       },
  { icon: <KfPresentation />, title: "Expert Microsoft-Certified Trainers", desc: "Learn from certified MCTs with 10+ years of enterprise deployment experience across Fortune 500 clients.",                                  highlight: "MCT Certified"  },
  { icon: <KfFolder />, title: "Real-World Projects",                  desc: "Build an actual business app, automation flow, and BI dashboard as capstone projects for your portfolio.",                                   highlight: "Portfolio Ready" },
  { icon: <KfRefresh />, title: "Flexible Learning Formats",           desc: "Choose from live online, self-paced, or on-site training. Access recordings for 90 days post-training.",                                     highlight: "3 Formats"      },
  { icon: <KfChatBubble />, title: "Lifetime Community Access",           desc: "Join an exclusive alumni network of 40,000+ Power Platform professionals for ongoing support and networking.",                               highlight: "40K+ Alumni"    },
  { icon: <KfBarChart />, title: "Exam Guarantee",                      desc: "If you don't pass on the first attempt, we offer a free re-training session — because your success is our promise.",                        highlight: "Free Retake"    },
  { icon: <KfBuilding />, title: "Corporate Training Available",        desc: "Customized batch training for enterprises. Dedicated account managers, custom curriculum, and team progress tracking.",                      highlight: "Enterprise Ready"},
];

export default function KeyFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: C.bg }}
      aria-labelledby="features-heading"
    >
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px cosmos-divider" />
      <div className="absolute inset-x-0 bottom-0 h-px cosmos-divider" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 radial-glow-accent opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="animate-on-scroll text-center max-w-3xl mx-auto mb-14">
          <span className="section-badge mb-5 inline-flex"><KfStar /> Why Choose Us</span>
          <h2 id="features-heading" className="font-heading font-bold leading-tight mb-5" style={{ color: C.light, fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.4 }}>
            Everything You Need to{" "}
            <span className="text-shimmer">Succeed & Get Certified</span>
          </h2>
          <p className="font-body text-lg leading-relaxed" style={{ color: "rgba(228,247,255,0.55)" }}>
            Our Power Platform training combines expert instruction, hands-on practice,
            and proven exam strategies to guarantee your certification success.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="animate-on-scroll group rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden hover:scale-[1.02]"
              style={{
                backgroundColor: "rgba(9,49,72,0.45)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(6,148,209,0.12)",
                transitionDelay: `${0.04 * i}s`,
              }}
            >
              {/* Shine */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(228,247,255,0.04) 0%, rgba(228,247,255,0) 60%)" }} />

              {/* Badge */}
              <span
                className="inline-block text-xs font-heading font-medium px-2.5 py-0.5 rounded-full border mb-4"
                style={{ backgroundColor: "rgba(6,148,209,0.1)", borderColor: "rgba(6,148,209,0.22)", color: "#60CEFA" }}
              >
                {f.highlight}
              </span>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border"
                style={{ backgroundColor: "rgba(6,148,209,0.1)", borderColor: "rgba(6,148,209,0.18)" }}
              >
                {f.icon}
              </div>

              <h3 className="font-heading font-medium text-sm leading-snug mb-2" style={{ color: C.light }}>{f.title}</h3>
              <p className="text-xs font-body leading-relaxed" style={{ color: "rgba(228,247,255,0.5)" }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="animate-on-scroll mt-12 rounded-2xl p-6 sm:p-8 border relative overflow-hidden"
          style={{
            backgroundColor: "rgba(9,49,72,0.5)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(6,148,209,0.2)",
          }}
        >
          {/* Animated top border */}
          <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: `linear-gradient(90deg, ${C.dark}, ${C.accent}, ${C.light}, ${C.accent}, ${C.dark})`, backgroundSize: "300% 100%", animation: "borderSlide 4s ease infinite" }} />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-heading font-medium text-xl mb-1" style={{ color: C.light }}>Ready to transform your career?</p>
              <p className="font-body text-sm" style={{ color: "rgba(228,247,255,0.5)" }}>Join 40,000+ certified professionals. Limited seats in each batch.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a href="#contact" className="btn-primary text-sm px-5 py-2.5 whitespace-nowrap">Enroll Now</a>
              <a href="#syllabus" className="btn-outline text-sm px-5 py-2.5 whitespace-nowrap">Free Trial</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

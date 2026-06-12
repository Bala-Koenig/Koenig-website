"use client";
import { useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const instructors = [
  {
    name: "David Harrington", title: "Senior Microsoft Power Platform Architect", experience: "18+ Years",
    certifications: ["MCT","PL-600","PL-400","PL-300","AZ-900"],
    specialties: ["Enterprise Architecture","Power Apps PCF","Dataverse","Azure Integration"],
    bio: "David has designed and deployed Power Platform solutions for Fortune 500 companies across finance, healthcare, and retail. Former Microsoft FastTrack engineer with deep expertise in enterprise governance and ALM.",
    stats: [{ value: "5,000+", label: "Students Trained" },{ value: "12+", label: "Certifications Held" },{ value: "98%", label: "Pass Rate" }],
    avatar: "DH",
  },
  {
    name: "Priya Sharma", title: "Power BI & Data Analytics Expert", experience: "12+ Years",
    certifications: ["MCT","PL-300","DP-900","DA-100"],
    specialties: ["Power BI Premium","DAX Optimization","Embedded Analytics","Azure Synapse"],
    bio: "Priya leads Power BI implementations for global enterprises and has trained 3,000+ analysts. She specializes in translating complex data models into intuitive dashboards that drive business decisions.",
    stats: [{ value: "3,200+", label: "Students Trained" },{ value: "8+", label: "Certifications Held" },{ value: "97%", label: "Pass Rate" }],
    avatar: "PS",
  },
];

export default function Instructor() {
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
    <section id="instructor" ref={sectionRef} className="py-24 bg-white overflow-hidden" aria-labelledby="instructor-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-on-scroll text-center max-w-3xl mx-auto mb-14">
          <span className="section-badge mb-5 inline-flex"><svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{display:'inline',verticalAlign:'middle'}}><rect x="2" y="3" width="20" height="14" rx="2" stroke="#0694D1" strokeWidth="1.8"/><path d="M8 21h8M12 17v4" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 10h4M14 10h4M10 7v6" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round"/></svg> Expert Trainers</span>
          <h2 id="instructor-heading" className="font-heading font-medium text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight mb-5" style={{ color: C.dark }}>
            Learn from <span className="text-shimmer-dark">Industry Experts</span>
          </h2>
          <p className="font-body text-base leading-relaxed" style={{ color: "#6B7280" }}>
            Our Microsoft Certified Trainers bring real-world enterprise experience to every session.
          </p>
        </div>

        <div className="animate-on-scroll grid lg:grid-cols-2 gap-8">
          {instructors.map((inst, i) => (
            <div
              key={inst.name}
              className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: "#FAFCFF", borderColor: "#E5E7EB", transitionDelay: `${0.1 * i}s` }}
            >
              <div className="h-1" style={{ background: `linear-gradient(90deg, ${C.dark}, ${C.accent})` }} />
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-5 mb-5">
                  <div className="flex-shrink-0 relative">
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-heading font-medium text-xl sm:text-2xl group-hover:scale-105 transition-transform duration-300"
                      style={{ background: `linear-gradient(135deg, ${C.dark}, ${C.accent})`, color: "#fff", boxShadow: `0 4px 20px rgba(6,148,209,0.25)` }}
                    >
                      {inst.avatar}
                    </div>
                    <div
                      className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full border-2 flex items-center justify-center"
                      style={{ backgroundColor: "#fff", borderColor: C.accent }}
                    >
                      <span className="font-heading font-medium text-xs" style={{ color: C.accent }}>M</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-lg sm:text-xl leading-tight mb-1" style={{ color: C.dark }}>{inst.name}</h3>
                    <p className="text-sm font-body mb-2" style={{ color: "#6B7280" }}>{inst.title}</p>
                    <span className="text-xs font-body flex items-center gap-1" style={{ color: C.accent }}><svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{display:'inline',verticalAlign:'middle'}}><circle cx="12" cy="12" r="10" stroke="#0694D1" strokeWidth="1.8"/><path d="M12 6v6l4 2" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> {inst.experience} Experience</span>
                  </div>
                </div>

                <p className="text-sm font-body leading-relaxed mb-5" style={{ color: "#374151" }}>{inst.bio}</p>

                <div className="mb-4">
                  <p className="text-xs font-body uppercase tracking-wider mb-2" style={{ color: "#94A3B8" }}>Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {inst.certifications.map((cert) => (
                      <span key={cert} className="text-xs font-heading font-medium px-2.5 py-1 rounded-lg border" style={{ backgroundColor: C.light, borderColor: "rgba(6,148,209,0.25)", color: C.accent }}>{cert}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs font-body uppercase tracking-wider mb-2" style={{ color: "#94A3B8" }}>Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {inst.specialties.map((spec) => (
                      <span key={spec} className="text-xs font-body px-2.5 py-1 rounded-lg border" style={{ backgroundColor: "#F8FAFC", borderColor: "#E5E7EB", color: "#374151" }}>{spec}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4" style={{ borderTop: "1px solid #F1F5F9" }}>
                  {inst.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-heading font-medium text-lg" style={{ color: C.dark }}>{stat.value}</p>
                      <p className="text-xs font-body" style={{ color: "#94A3B8" }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

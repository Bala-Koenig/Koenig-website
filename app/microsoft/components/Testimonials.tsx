"use client";
import { useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const reviews = [
  { name: "Ahmed R.",  role: "Business Intelligence Lead", cert: "PL-300 Certified", color: C.accent, avatar: "/api/placeholder/48/48",
    quote: "Absolute game changer. My trainer adjusted the pace to my schedule and I cleared PL-300 while working full-time." },
  { name: "Rahul M.",  role: "Azure Administrator", cert: "AZ-104 Certified", color: C.accent, avatar: "/api/placeholder/48/48",
    quote: "Passed AZ-104 on first attempt. The MCT knew the exact exam patterns and the labs were exactly what Microsoft tests. Worth every penny." },
  { name: "Sarah K.",  role: "CISO, Financial Services", cert: "Enterprise Client", color: "#7C3AED", avatar: "/api/placeholder/48/48",
    quote: "I trained 15 of my team members for SC-200. Koenig's on-site delivery was seamless and all 15 passed within 3 months." },
  { name: "Aisha N.",  role: "Security Analyst", cert: "SC-300 Certified", color: "#16A34A", avatar: "/api/placeholder/48/48",
    quote: "SC-900 and SC-300 back to back — both cleared first try. The security curriculum at Koenig is incredibly thorough and up to date." },
  { name: "Priya S.",  role: "Cloud Solutions Architect", cert: "AZ-305 Expert", color: "#0078D4", avatar: "/api/placeholder/48/48",
    quote: "From AZ-900 to AZ-305 in 6 months. Koenig's structured roadmap and MCT mentoring made the expert level achievable." },
  { name: "Meera T.",  role: "L&D Head, Enterprise", cert: "Corporate Partner", color: "#D97706", avatar: "/api/placeholder/48/48",
    quote: "As an L&D head I've used 5 training vendors. Koenig's MCT quality, MOC materials, and ESI compliance is in a league of its own." },
  { name: "Carlos R.", role: "Engineering Manager", cert: "AZ-400 Team Training", color: C.accent, avatar: "/api/placeholder/48/48",
    quote: "Our whole DevOps team got AZ-400 certified through Koenig's corporate training. Smooth logistics and top-tier MCTs throughout." },
  { name: "David L.",  role: "AI Engineer", cert: "AI-102 Certified", color: "#7C3AED", avatar: "/api/placeholder/48/48",
    quote: "AI-102 was daunting but the trainer broke it down perfectly. Real Azure OpenAI labs made the difference. Highly recommend." },
  { name: "Fatima Z.", role: "Data Engineer", cert: "DP-600 Certified", color: "#16A34A", avatar: "/api/placeholder/48/48",
    quote: "DP-600 Fabric certification done in 3 weeks of part-time study. The customised schedule around my timezone was a lifesaver." },
];

/* Split into 3 columns manually for masonry effect */
const col1 = [reviews[0], reviews[1], reviews[2]];
const col2 = [reviews[3], reviews[4], reviews[5]];
const col3 = [reviews[6], reviews[7], reviews[8]];

function ReviewCard({ r, delay }: { r: typeof reviews[0]; delay: string }) {
  return (
    <div
      className="animate-on-scroll group rounded-[16px] p-[24px] border bg-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg"
      style={{ borderColor: "#E8EDF2", transitionDelay: delay }}
    >
      {/* Quote */}
      <p className="font-body text-[14px] leading-[1.7] mb-[20px]" style={{ color: "#374151" }}>
        &ldquo;{r.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-[12px] mb-[12px]">
        <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center font-heading font-medium text-white text-[13px] flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${C.dark}, ${r.color})` }}>
          {r.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <p className="font-heading font-medium text-[14px]" style={{ color: C.dark }}>{r.name}</p>
          <p className="font-body text-[12px]" style={{ color: "#94A3B8" }}>{r.role}</p>
        </div>
      </div>

      {/* Cert badge */}
      <span className="inline-flex items-center gap-[5px] text-[11px] font-heading font-medium px-[10px] py-[4px] rounded-full"
        style={{ backgroundColor: `${r.color}10`, color: r.color, border: `1px solid ${r.color}25` }}>
        <svg viewBox="0 0 16 16" fill="none" className="w-[11px] h-[11px]">
          <path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {r.cert}
      </span>
    </div>
  );
}

export default function Testimonials() {
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
    <section ref={sectionRef} className="py-[70px]" style={{ backgroundColor: "#F8FBFD" }} aria-labelledby="testimonials-heading">
      <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px]">

        {/* Header */}
        <div className="animate-on-scroll text-center mb-[44px]">
          <span className="inline-flex items-center gap-[6px] text-[12px] font-heading font-medium uppercase tracking-[0.1em] px-[14px] py-[5px] rounded-full mb-[14px]"
            style={{ backgroundColor: "rgba(6,148,209,0.08)", color: C.accent, border: "1px solid rgba(6,148,209,0.2)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Student Reviews
          </span>
          <h2 id="testimonials-heading" className="font-heading font-medium text-[30px] sm:text-[38px] leading-tight mb-[12px]" style={{ color: C.dark }}>
            Microsoft Certification{" "}
            <span className="text-shimmer-dark">Student Reviews</span>
          </h2>
          <p className="font-body text-[16px] max-w-[560px] mx-auto" style={{ color: "#6B7280" }}>
            Real results from IT professionals who passed AZ-104, AI-102, SC-300 and other Microsoft exams with Koenig — rated 4.7/5 from 500+ verified reviews.
          </p>
        </div>

        {/* Masonry 3-column auto-scrolling grid */}
        <div className="relative">
        {/* Fade top */}
        <div className="absolute inset-x-0 top-0 h-[40px] z-10 pointer-events-none" style={{ background: "linear-gradient(180deg, #F8FBFD, transparent)" }} />
        {/* Fade bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[40px] z-10 pointer-events-none" style={{ background: "linear-gradient(0deg, #F8FBFD, transparent)" }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] items-start overflow-hidden" style={{ maxHeight: "620px" }}>
          {/* Column 1 — scrolls up */}
          <div className="testimonial-scroll-col group/col" style={{ animation: "scrollUp 25s linear infinite" }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}>
            <div className="flex flex-col gap-[16px]">
              {[...col1, ...col1].map((r, i) => <ReviewCard key={`${r.name}-${i}`} r={r} delay="0s" />)}
            </div>
          </div>
          {/* Column 2 — scrolls up slower */}
          <div className="testimonial-scroll-col group/col" style={{ animation: "scrollUp 30s linear infinite" }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}>
            <div className="flex flex-col gap-[16px]">
              {[...col2, ...col2].map((r, i) => <ReviewCard key={`${r.name}-${i}`} r={r} delay="0s" />)}
            </div>
          </div>
          {/* Column 3 — scrolls up medium */}
          <div className="testimonial-scroll-col group/col" style={{ animation: "scrollUp 22s linear infinite" }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}>
            <div className="flex flex-col gap-[16px]">
              {[...col3, ...col3].map((r, i) => <ReviewCard key={`${r.name}-${i}`} r={r} delay="0s" />)}
            </div>
          </div>
        </div>

        </div>

        {/* Keyframes */}
        <style jsx>{`
          @keyframes scrollUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
        `}</style>

        {/* Bottom trust strip */}
        <div className="animate-on-scroll flex items-center justify-center gap-[24px] mt-[40px] flex-wrap" style={{ transitionDelay: "0.15s" }}>
          {[
            { value: "4.7/5", label: "Average Rating" },
            { value: "500+", label: "Verified Reviews" },
            { value: "98%", label: "Would Recommend" },
            { value: "150+", label: "Countries" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-[10px] px-[18px] py-[10px] rounded-[12px] border" style={{ backgroundColor: "#fff", borderColor: "#E8EDF2" }}>
              <span className="font-heading font-medium text-[18px]" style={{ color: C.accent }}>{s.value}</span>
              <span className="font-body text-[13px]" style={{ color: "#6B7280" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

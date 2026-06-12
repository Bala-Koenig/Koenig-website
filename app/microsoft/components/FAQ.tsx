"use client";
import { useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

export default function FAQ() {
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
    <section ref={sectionRef} className="py-[40px] bg-white">
      <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px]">
        <div className="animate-on-scroll">
          <div
            className="relative rounded-[24px] overflow-hidden px-[32px] sm:px-[56px] py-[48px] sm:py-[56px]"
            style={{ background: `linear-gradient(135deg, ${C.accent} 0%, #08A8EC 40%, #2BB8F0 70%, #60CEFA 100%)` }}
          >
            {/* Contact tech graphic — right side */}
            <div className="absolute right-[40px] top-1/2 -translate-y-1/2 hidden sm:block" style={{ width: "260px", height: "260px" }}>
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 260 260" fill="none">
                <circle cx="130" cy="130" r="120" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="8 6" />
                <circle cx="130" cy="130" r="85" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <circle cx="130" cy="130" r="50" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
              </svg>

              {/* Center — headset/support icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[70px] h-[70px] rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,0.15)" }}>
                  <svg viewBox="0 0 32 32" fill="none" className="w-[32px] h-[32px]">
                    <path d="M8 18V14a8 8 0 1116 0v4" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
                    <rect x="4" y="16" width="5" height="8" rx="2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                    <rect x="23" y="16" width="5" height="8" rx="2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                    <path d="M24 24c0 3-3.5 4-8 4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Floating contact nodes */}
              {/* Email */}
              <div className="absolute top-[10px] right-[30px] animate-float" style={{ animationDelay: "0s" }}>
                <div className="w-[42px] h-[42px] rounded-[12px] flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(6px)" }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><rect x="3" y="5" width="18" height="14" rx="2" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/><path d="M3 7l9 5 9-5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/></svg>
                </div>
              </div>
              {/* Phone */}
              <div className="absolute bottom-[20px] right-[10px] animate-float" style={{ animationDelay: "1s" }}>
                <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5"/></svg>
                </div>
              </div>
              {/* Chat */}
              <div className="absolute left-[5px] top-[60px] animate-float" style={{ animationDelay: "2s" }}>
                <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]"><path d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
              </div>
              {/* Video */}
              <div className="absolute bottom-[50px] left-[30px] animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-[15px] h-[15px]"><rect x="2" y="6" width="13" height="12" rx="2" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/><path d="M22 8l-5 3v2l5 3V8z" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            <div className="relative max-w-[500px]">
              <h2 className="font-heading font-medium text-[28px] sm:text-[36px] leading-tight mb-[12px]" style={{ color: "#fff" }}>
                Still Have Questions?
              </h2>
              <p className="font-body text-[16px] leading-[1.6] mb-[28px]" style={{ color: "rgba(255,255,255,0.85)" }}>
                Our training advisors are here to help you choose the right certification path. We&apos;re happy to assist.
              </p>
              <div className="flex flex-wrap gap-[12px]">
                <a
                  href="#contact"
                  className="flex items-center gap-[10px] px-[24px] py-[13px] rounded-full text-[14px] font-heading font-medium transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: C.dark, color: "#fff" }}
                >
                  Talk to an Expert
                  <span className="w-[28px] h-[28px] rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                    <svg className="w-[14px] h-[14px]" fill="none" stroke="#fff" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[10px] px-[24px] py-[13px] rounded-full text-[14px] font-heading font-medium transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: C.dark, color: "#fff" }}
                >
                  WhatsApp Us
                  <span className="w-[28px] h-[28px] rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

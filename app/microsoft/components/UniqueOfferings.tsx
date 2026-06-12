"use client";
import { useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

export default function UniqueOfferings() {
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-[16px] md:px-[32px] lg:px-[50px] py-[60px]"
      style={{ background: "rgb(6, 30, 48)" }}
      aria-labelledby="diff-heading"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgb(6, 148, 209), transparent 65%)", filter: "blur(80px)", animation: "diffOrb1 11s ease-in-out infinite" }} />
        <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full"
          style={{ background: "radial-gradient(circle, rgb(7, 109, 157), transparent 65%)", filter: "blur(70px)", opacity: 0.08, animation: "diffOrb2 14s ease-in-out infinite" }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, rgb(255, 255, 255) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="animate-on-scroll text-center" style={{ marginBottom: "35px" }}>
          <span className="mb-[12px] inline-block rounded-full px-[16px] py-[6px] text-[14px] font-heading font-medium uppercase tracking-wider"
            style={{ color: C.accent, background: "rgba(6, 148, 209, 0.15)", border: "1px solid rgba(6, 148, 209, 0.25)" }}>
            Why Koenig
          </span>
          <h2 id="diff-heading" className="mb-[12px] font-heading font-medium text-[24px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white">
            The <span className="text-shimmer">Koenig Difference</span>
          </h2>
          <p className="mx-auto max-w-[560px] text-[14px] sm:text-[16px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            What makes 1M+ professionals choose Koenig over everyone else
          </p>
        </div>

        {/* Desktop layout */}
        <div className="hidden sm:flex flex-col gap-[16px]">

          {/* Featured banner — 1-on-1 Training */}
          <div className="animate-on-scroll flex flex-col gap-[16px] rounded-[16px] p-[24px] sm:flex-row sm:items-center sm:justify-between"
            style={{ background: "linear-gradient(135deg, rgb(10, 110, 189) 0%, rgb(6, 148, 209) 50%, rgb(0, 180, 216) 100%)" }}>
            <div className="flex items-start gap-[16px]">
              <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px]"
                style={{ background: "rgba(255, 255, 255, 0.18)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div>
                <h3 className="mb-[4px] text-[16px] md:text-[18px] font-heading font-medium text-white">1-on-1 Training</h3>
                <p className="text-[14px] sm:text-[16px]" style={{ color: "rgba(255,255,255,0.8)" }}>Schedule personalized sessions based upon your availability.</p>
              </div>
            </div>
            <div className="flex shrink-0 gap-[12px]">
              {[
                { val: "2x", label: "Faster" },
                { val: "95%", label: "Pass Rate" },
                { val: "100%", label: "Dedicated" },
              ].map((s) => (
                <div key={s.label} className="rounded-[12px] px-[16px] py-[12px] text-center" style={{ background: "rgba(255, 255, 255, 0.15)" }}>
                  <div className="text-[16px] md:text-[18px] font-heading font-medium text-white">{s.val}</div>
                  <div className="text-[14px]" style={{ color: "rgba(255,255,255,0.7)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — 3 cards */}
          <div className="grid grid-cols-1 gap-[16px] md:grid-cols-3">
            {[
              {
                title: "Destination Training",
                desc: "Immerse yourself in a focused learning environment, free from distractions, where you can sharpen your skills in popular global destinations.",
                bg: "linear-gradient(145deg, rgb(7, 28, 46), rgb(10, 42, 66))",
                border: "rgba(6, 148, 209, 0.22)",
                iconBg: "rgba(6, 148, 209, 0.18)",
                iconColor: "#0694d1",
                icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
              },
              {
                title: "Customized Training",
                desc: "Learning without limits. Create custom courses that fit your exact needs, from blended topics to brand-new content.",
                bg: "linear-gradient(145deg, rgb(6, 32, 56), rgb(8, 50, 80))",
                border: "rgba(0, 180, 216, 0.2)",
                iconBg: "rgba(0, 180, 216, 0.16)",
                iconColor: "#00b4d8",
                icon: <><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></>,
              },
              {
                title: "Excellent Trainers",
                desc: "Learn from the best. Our trainers are certified experts with real-world experience, ensuring top-quality learning.",
                bg: "linear-gradient(145deg, rgb(7, 36, 64), rgb(9, 53, 86))",
                border: "rgba(6, 148, 209, 0.2)",
                iconBg: "rgba(6, 148, 209, 0.18)",
                iconColor: "#0694d1",
                icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
              },
            ].map((card, i) => (
              <div key={card.title}
                className="animate-on-scroll flex flex-col rounded-[16px] p-[24px] transition-all duration-300 hover:-translate-y-[3px]"
                style={{ background: card.bg, border: `1px solid ${card.border}`, transitionDelay: `${0.06 * (i + 1)}s` }}>
                <div className="mb-[12px] flex h-[40px] w-[40px] items-center justify-center rounded-[12px]" style={{ background: card.iconBg }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={card.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {card.icon}
                  </svg>
                </div>
                <h3 className="mb-[8px] text-[16px] md:text-[18px] font-heading font-medium text-white">{card.title}</h3>
                <p className="text-[14px] sm:text-[16px] font-body leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Row 3 — 2 cards */}
          <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
            {[
              {
                title: "Pre-Requisite Session",
                desc: "Ensure you're fully prepared before training. Join a free pre-requisite session to assess your knowledge and get ready for the course ahead.",
                bg: "linear-gradient(145deg, rgb(6, 24, 40), rgb(8, 36, 56))",
                border: "rgba(7, 109, 157, 0.25)",
                iconBg: "rgba(7, 109, 157, 0.22)",
                iconColor: "#076d9d",
                icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8M12 17v4" /></>,
              },
              {
                title: "Happiness Guarantee",
                desc: "100% satisfaction guarantee on every course. Not satisfied? We make it right — no questions, no hassle.",
                bg: "linear-gradient(145deg, rgb(6, 32, 48), rgb(8, 48, 72))",
                border: "rgba(0, 180, 216, 0.18)",
                iconBg: "rgba(0, 180, 216, 0.15)",
                iconColor: "#00b4d8",
                icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
              },
            ].map((card, i) => (
              <div key={card.title}
                className="animate-on-scroll flex flex-col rounded-[16px] p-[24px] transition-all duration-300 hover:-translate-y-[3px]"
                style={{ background: card.bg, border: `1px solid ${card.border}`, transitionDelay: `${0.06 * (i + 4)}s` }}>
                <div className="mb-[12px] flex h-[40px] w-[40px] items-center justify-center rounded-[12px]" style={{ background: card.iconBg }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={card.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {card.icon}
                  </svg>
                </div>
                <h3 className="mb-[8px] text-[16px] md:text-[18px] font-heading font-medium text-white">{card.title}</h3>
                <p className="text-[14px] sm:text-[16px] font-body leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile — stacked */}
        <div className="sm:hidden flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[16px] rounded-[16px] p-[20px]"
            style={{ background: "linear-gradient(135deg, rgb(10, 110, 189) 0%, rgb(6, 148, 209) 50%, rgb(0, 180, 216) 100%)" }}>
            <div className="flex items-start gap-[12px]">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[12px]" style={{ background: "rgba(255, 255, 255, 0.18)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div>
                <h3 className="mb-[4px] text-[14px] font-heading font-medium text-white">1-on-1 Training</h3>
                <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.8)" }}>Schedule personalized sessions based upon your availability.</p>
              </div>
            </div>
            <div className="flex gap-[8px]">
              {[{ v: "2x", l: "Faster" }, { v: "95%", l: "Pass Rate" }, { v: "100%", l: "Dedicated" }].map((s) => (
                <div key={s.l} className="flex-1 rounded-[12px] px-[8px] py-[10px] text-center" style={{ background: "rgba(255, 255, 255, 0.15)" }}>
                  <div className="text-[14px] font-heading font-medium text-white">{s.v}</div>
                  <div className="text-[12px]" style={{ color: "rgba(255,255,255,0.7)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          {[
            { title: "Destination Training", desc: "Focused learning in popular global destinations.", bg: "linear-gradient(145deg, rgb(7, 28, 46), rgb(10, 42, 66))", border: "rgba(6, 148, 209, 0.22)", iconBg: "rgba(6, 148, 209, 0.18)", iconColor: "#0694d1", icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></> },
            { title: "Customized Training", desc: "Custom courses for your exact needs.", bg: "linear-gradient(145deg, rgb(6, 32, 56), rgb(8, 50, 80))", border: "rgba(0, 180, 216, 0.2)", iconBg: "rgba(0, 180, 216, 0.16)", iconColor: "#00b4d8", icon: <><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></> },
            { title: "Excellent Trainers", desc: "Certified experts with real-world experience.", bg: "linear-gradient(145deg, rgb(7, 36, 64), rgb(9, 53, 86))", border: "rgba(6, 148, 209, 0.2)", iconBg: "rgba(6, 148, 209, 0.18)", iconColor: "#0694d1", icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></> },
            { title: "Pre-Requisite Session", desc: "Free session to assess your knowledge.", bg: "linear-gradient(145deg, rgb(6, 24, 40), rgb(8, 36, 56))", border: "rgba(7, 109, 157, 0.25)", iconBg: "rgba(7, 109, 157, 0.22)", iconColor: "#076d9d", icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8M12 17v4" /></> },
            { title: "Happiness Guarantee", desc: "100% satisfaction — no questions, no hassle.", bg: "linear-gradient(145deg, rgb(6, 32, 48), rgb(8, 48, 72))", border: "rgba(0, 180, 216, 0.18)", iconBg: "rgba(0, 180, 216, 0.15)", iconColor: "#00b4d8", icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></> },
          ].map((card) => (
            <div key={card.title} className="flex flex-col rounded-[16px] p-[20px]" style={{ background: card.bg, border: `1px solid ${card.border}` }}>
              <div className="mb-[8px] flex h-[36px] w-[36px] items-center justify-center rounded-[12px]" style={{ background: card.iconBg }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{card.icon}</svg>
              </div>
              <h3 className="mb-[6px] text-[14px] font-heading font-medium text-white">{card.title}</h3>
              <p className="text-[12px] font-body leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes diffOrb1 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.08); }
        }
        @keyframes diffOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, -15px) scale(1.05); }
        }
      `}</style>
    </section>
  );
}

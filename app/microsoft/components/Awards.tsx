"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const awards = [
  { title: "Winner of Microsoft Training Services Partner of the Year Award", year: "2025", awardImg: "/images/awards/MS-Partner-of-the-year-2025-popup.webp", partnerImg: "/images/partners/microsoft-cloud-t.png" },
  { title: "Winner of Microsoft's ANZ Superstar Campaign", year: "2024", awardImg: "/images/awards/Microsoft-FY2024-Superstar-Award.webp", partnerImg: "/images/partners/microsoft-cloud-t.png" },
  { title: "Winner of Microsoft's Asia Superstar Campaign", year: "2022", awardImg: "/images/awards/Microsoft-Superstar-Award-2022.webp", partnerImg: "/images/partners/microsoft-cloud-t.png" },
  { title: "Microsoft Solutions Partner — Cloud Training Services", year: "2023", awardImg: "/images/awards/MS-Partner-of-the-year-2025-popup.webp", partnerImg: "/images/partners/microsoft-cloud-t.png" },
  { title: "Microsoft Authorized Learning Partner — Global Recognition", year: "2021", awardImg: "/images/awards/MS-Partner-of-the-year-2025-popup.webp", partnerImg: "/images/partners/microsoft-cloud-t.png" },
];

const allAwards = [...awards, ...awards];

/* Fallback MS logo */
const MsFallback = () => (
  <div className="flex flex-col items-center gap-[6px]">
    <svg viewBox="0 0 21 21" width="44" height="44">
      <rect x="0.5" y="0.5" width="9.5" height="9.5" fill="#F25022" />
      <rect x="11" y="0.5" width="9.5" height="9.5" fill="#7FBA00" />
      <rect x="0.5" y="11" width="9.5" height="9.5" fill="#00A4EF" />
      <rect x="11" y="11" width="9.5" height="9.5" fill="#FFB900" />
    </svg>
    <div className="px-[8px] py-[3px] rounded-[4px] text-center" style={{ backgroundColor: "#002050" }}>
      <p className="text-[8px] font-heading font-medium text-white leading-none">Microsoft Cloud</p>
      <p className="text-[7px] text-white opacity-60 mt-[1px]">Training Services</p>
    </div>
  </div>
);

const MsPartnerFallback = () => (
  <div className="flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px]" style={{ border: "1px solid #E2E8F0", backgroundColor: "#FAFCFF" }}>
    <svg viewBox="0 0 21 21" width="24" height="24">
      <rect x="0.5" y="0.5" width="9.5" height="9.5" fill="#F25022" />
      <rect x="11" y="0.5" width="9.5" height="9.5" fill="#7FBA00" />
      <rect x="0.5" y="11" width="9.5" height="9.5" fill="#00A4EF" />
      <rect x="11" y="11" width="9.5" height="9.5" fill="#FFB900" />
    </svg>
    <div>
      <p className="font-heading font-medium text-[11px] leading-none" style={{ color: C.dark }}>Microsoft</p>
      <p className="font-body text-[9px] leading-none mt-[1px]" style={{ color: "#94A3B8" }}>Solutions Partner</p>
    </div>
  </div>
);

export default function Awards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Auto-scroll animation */
  const speed = 0.5;
  const animate = useCallback(() => {
    if (!isDragging && trackRef.current) {
      posRef.current += speed;
      const totalWidth = trackRef.current.scrollWidth / 2;
      if (posRef.current >= totalWidth) posRef.current = 0;
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
    }
    animRef.current = requestAnimationFrame(animate);
  }, [isDragging]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  /* Drag handlers */
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(posRef.current);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    posRef.current = scrollLeft - diff;
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
  };
  const onMouseUp = () => setIsDragging(false);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-[16px] md:px-[32px] lg:px-[50px] py-[60px]"
      style={{ borderTop: "1px solid #CAEFFF", borderBottom: "1px solid #CAEFFF" }}
      aria-labelledby="awards-heading"
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute -left-[128px] top-0 h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6, 148, 209, 0.18) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -right-[80px] bottom-0 h-[350px] w-[350px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(77, 191, 239, 0.18) 0%, transparent 70%)" }} />

      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="animate-on-scroll mb-[32px] text-center">
          <span className="mb-[8px] inline-block rounded-full px-[16px] py-[6px] text-[14px] font-heading font-medium uppercase tracking-wider"
            style={{ backgroundColor: "rgba(6,148,209,0.1)", color: C.accent }}>
            Recognition
          </span>
          <h2 id="awards-heading" className="mb-[8px] font-heading font-medium text-[24px] sm:text-[30px] md:text-[36px]" style={{ color: C.dark }}>
            Awards & <span className="text-shimmer-dark">Recognition</span>
          </h2>
          <p className="text-[14px] font-body" style={{ color: "#6B7280" }}>
            Recognized by global vendors and quality bodies for training excellence
          </p>
        </div>

        {/* Stats bar */}
        <div className="animate-on-scroll mb-[16px] mx-auto max-w-[640px] rounded-[16px] bg-white px-[8px] py-[4px]"
          style={{ border: "1px solid #E8F4FB", boxShadow: "0 2px 16px rgba(6,148,209,0.08)" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { icon: <svg className="h-[24px] w-[24px] mb-[4px]" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>, val: "10+", label: "Awards & Certifications" },
              { icon: <svg className="h-[24px] w-[24px] mb-[4px]" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, val: "6+", label: "Global Partners" },
              { icon: <svg className="h-[24px] w-[24px] mb-[4px]" fill="none" viewBox="0 0 24 24" stroke="#F59E0B" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>, val: "15 Yrs", label: "Great Place to Work" },
              { icon: <svg className="h-[24px] w-[24px] mb-[4px]" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, val: "3x", label: "Microsoft Partner of Year" },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-col items-center gap-[6px] px-[16px] py-[20px] text-center"
                style={{ borderRight: i < 3 ? "1px solid #F1F5F9" : "none" }}>
                {s.icon}
                <div className="text-[20px] sm:text-[24px] font-heading font-medium leading-tight" style={{ color: C.dark }}>{s.val}</div>
                <div className="text-[12px] font-body" style={{ color: "#6B7280" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Draggable marquee area */}
      <div className="animate-on-scroll" style={{ transitionDelay: "0.06s" }}>
        <div
          style={{
            overflowX: "clip",
            padding: "14px 0",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            maskImage: "linear-gradient(to right, transparent 0px, black 80px, black calc(100% - 80px), transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0px, black 80px, black calc(100% - 80px), transparent 100%)",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div
            ref={trackRef}
            className="flex gap-[20px] px-[20px]"
            style={{ width: "max-content", willChange: "transform" }}
          >
            {allAwards.map((award, i) => (
              <div
                key={`${award.year}-${i}`}
                className="flex shrink-0 overflow-hidden rounded-[16px] bg-white"
                style={{
                  width: "380px",
                  height: "280px",
                  border: "1.5px solid #CAEFFF",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07), 0 4px 16px rgba(6,148,209,0.1)",
                }}
              >
                {/* Left — award image */}
                <div className="flex w-[150px] shrink-0 items-center justify-center overflow-hidden"
                  style={{ background: "#F0FAFF", borderRight: "1.5px solid #CAEFFF" }}>
                  <img
                    alt=""
                    className="h-[90%] w-[90%] object-contain"
                    src={award.awardImg}
                    onError={(e) => { e.currentTarget.style.display = "none"; const p = e.currentTarget.parentElement; if (p) { const d = document.createElement("div"); d.className = "flex items-center justify-center w-full h-full"; d.innerHTML = ""; p.appendChild(d); } }}
                  />
                  {/* Inline fallback if no image */}
                  <div className="award-fallback hidden"><MsFallback /></div>
                </div>

                {/* Right — partner logo + title + year */}
                <div className="flex flex-1 flex-col items-center justify-center gap-[16px] px-[12px] py-[20px] text-center">
                  {/* Partner logo */}
                  <div className="h-[64px] flex items-center justify-center">
                    <img
                      alt="Microsoft"
                      className="max-h-[64px] max-w-[140px] object-contain"
                      src={award.partnerImg}
                      onError={(e) => { e.currentTarget.style.display = "none"; const p = e.currentTarget.parentElement; if (p) { const d = document.createElement("div"); d.innerHTML = `<div style="display:flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid #E2E8F0;border-radius:8px;background:#FAFCFF"><svg viewBox="0 0 21 21" width="24" height="24"><rect x="0.5" y="0.5" width="9.5" height="9.5" fill="#F25022"/><rect x="11" y="0.5" width="9.5" height="9.5" fill="#7FBA00"/><rect x="0.5" y="11" width="9.5" height="9.5" fill="#00A4EF"/><rect x="11" y="11" width="9.5" height="9.5" fill="#FFB900"/></svg><div><div style="font-size:11px;font-weight:500;color:#093148">Microsoft</div><div style="font-size:9px;color:#94A3B8;margin-top:1px">Solutions Partner</div></div></div>`; p.appendChild(d); } }}
                    />
                  </div>

                  {/* Title */}
                  <p className="font-heading font-medium text-[14px] sm:text-[16px] leading-[1.4]" style={{ color: C.dark }}>
                    {award.title}
                  </p>

                  {/* Year pill */}
                  <span className="rounded-full px-[12px] py-[2px] text-[14px] font-heading font-medium"
                    style={{ border: "1px solid #CAEFFF", color: "#6B7280" }}>
                    {award.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

export default function TrainingProfessionals() {
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
    <>
      <style suppressHydrationWarning>{`
        .tp-sec {
          background: #ffffff;
          padding: 30px 16px;
          overflow: hidden;
          position: relative;
          border-top: 1px solid rgba(6,148,209,0.12);
        }
        .tp-sec::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 50% at 70% 50%, rgba(6,148,209,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .tp-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; gap: 64px;
          position: relative; z-index: 1;
        }
        .tp-content { flex: 1; min-width: 0; }
        .tp-map-panel {
          flex-shrink: 0; width: 420px;
          border-radius: 20px; overflow: hidden;
        }
        .tp-map-img {
          width: 100%; height: auto; display: block; border-radius: 20px;
        }
        .tp-stats {
          display: flex; gap: 28px; margin-top: 15px;
          flex-wrap: wrap;
        }
        .tp-stat { display: flex; flex-direction: column; gap: 4px; }
        .tp-stat-num { font-size: 32px; font-weight: 800; color: #071e2e; line-height: 1; }
        .tp-stat-num span { color: #0694D1; }
        .tp-stat-lbl { font-size: 12px; font-weight: 500; color: #4a6375; text-transform: uppercase; letter-spacing: 1px; }
        .tp-divider { width: 1px; align-self: stretch; background: rgba(6,148,209,0.12); }

        @media (max-width: 900px) {
          .tp-inner { flex-direction: column; gap: 15px; }
          .tp-map-panel { width: 100%; }
          .tp-map-img { min-height: unset; max-height: 200px; }
          .tp-sec { padding: 18px 16px; }
        }
        @media (max-width: 600px) {
          .tp-sec { padding: 18px 16px; overflow: visible; }
          .tp-stats { flex-wrap: nowrap; gap: 0; justify-content: space-between; }
          .tp-stat { flex: 1; align-items: center; }
          .tp-stat-num { font-size: 18px; }
          .tp-stat-lbl { font-size: 9px; letter-spacing: 0.5px; }
          .tp-divider { display: block; }
        }
      `}</style>

      <section className="tp-sec" ref={sectionRef} aria-labelledby="tp-heading">
        <div className="tp-inner">

          {/* Left content */}
          <div className="tp-content animate-on-scroll">
            <h2 id="tp-heading" className="font-heading font-medium leading-tight" style={{ fontSize: "clamp(24px, 2.8vw, 38px)", color: "#071e2e", marginBottom: 15 }}>
              Training Professionals<br />
              <span className="text-shimmer-dark">Across 50+ Countries</span>
            </h2>
            <p className="font-body" style={{ fontSize: 16, color: "#4a6375", lineHeight: 1.65, maxWidth: 420, marginBottom: 0 }}>
              From our headquarters in India to training centers across UAE, Iraq, Saudi Arabia, UK, USA, Singapore, Australia, and more — Koenig delivers Microsoft certification training in 50+ countries.
            </p>

            <div className="tp-stats">
              <div className="tp-stat">
                <div className="tp-stat-num">50<span>+</span></div>
                <div className="tp-stat-lbl">Countries</div>
              </div>
              <div className="tp-divider" />
              <div className="tp-stat">
                <div className="tp-stat-num">500<span>K+</span></div>
                <div className="tp-stat-lbl">Trained</div>
              </div>
              <div className="tp-divider" />
              <div className="tp-stat">
                <div className="tp-stat-num">33<span>+</span></div>
                <div className="tp-stat-lbl">Years</div>
              </div>
              <div className="tp-divider" />
              <div className="tp-stat">
                <div className="tp-stat-num">95<span>%</span></div>
                <div className="tp-stat-lbl">Pass Rate</div>
              </div>
            </div>
          </div>

          {/* Right — World map */}
          <div className="tp-map-panel animate-on-scroll" style={{ transitionDelay: "0.1s" }}>
            <img
              src="/images/map3.jpg"
              alt="Koenig training locations worldwide"
              className="tp-map-img"
              decoding="async"
              loading="lazy"
            />
          </div>

        </div>
      </section>
    </>
  );
}

"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const C = { accent: "#0694D1" };

const formats = [
  {
    name: "Classroom Training", badge: "Most Popular",
    img: "/images/home-banner/classroom-training.webp",
    desc: "Traditional, instructor-led learning in popular global destinations.",
    bullets: ["Hands-on lab sessions", "Face-to-face with expert instructors", "Global training centers"],
    bg: "linear-gradient(145deg,#0a3d5c,#072d44)",
    icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  },
  {
    name: "Live Online Classes", badge: "Best Value",
    img: "/images/home-banner/Live-Online-Classes.webp",
    desc: "Flexible virtual learning with expert instructors from the comfort of your own space.",
    bullets: ["Live instructor-led sessions", "Interactive Q&A & labs", "Train from anywhere"],
    bg: "linear-gradient(145deg,#0a3d5c,#072d44)",
    icon: <><path d="M15 10l4.553-2.277A1 1 0 0 1 21 8.649v6.7a1 1 0 0 1-1.447.894L15 14"/><rect x="1" y="6" width="14" height="12" rx="2"/></>,
  },
  {
    name: "Fly-Me-A-Trainer (FMAT)", badge: "Fastest",
    img: "/images/home-banner/FMAT.webp",
    desc: "Flexible on-site learning for larger groups. Fly an expert to your location anywhere in the world.",
    bullets: ["Expert trainer at your site", "Custom schedule & pace", "Any location worldwide"],
    bg: "linear-gradient(145deg,#0c4a72,#093148)",
    icon: <><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></>,
  },
  {
    name: "Flexi (Self-Paced)", badge: "Most Flexible",
    img: "/images/home-banner/Flexi.webp",
    desc: "Self-paced learning with edited lectures, courseware, hands-on labs, and optional doubt clearing sessions.",
    bullets: ["Edited video lectures", "Hands-on labs & courseware", "Optional doubt clearing sessions"],
    bg: "linear-gradient(145deg,#0a3d5c,#072d44)",
    icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  },
  {
    name: "1-on-1 Training", badge: "Most Focused",
    img: "/images/home-banner/1on1.webp",
    desc: "Dedicated instructor assigned exclusively to you for maximum personalisation and knowledge retention.",
    bullets: ["Personalised schedule", "Instructor adapts to your pace", "Max knowledge retention"],
    bg: "linear-gradient(145deg,#0a3d5c,#072d44)",
    icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  },
  {
    name: "Customised Programmes", badge: "Bespoke",
    img: "/images/home-banner/CT.webp",
    desc: "Bespoke curricula tailored to your tech stack, business processes, and learning goals.",
    bullets: ["Custom course content", "Fits your tech stack", "Aligned to business goals"],
    bg: "linear-gradient(145deg,#0a3d5c,#072d44)",
    icon: <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></>,
  },
  {
    name: "Webinar as a Service", badge: "New",
    img: "/images/home-banner/Waas.webp",
    desc: "Professionally hosted live webinars delivered to your global workforce at scale.",
    bullets: ["Global workforce delivery", "Live hosted sessions", "Scalable & trackable"],
    bg: "linear-gradient(145deg,#0c4a72,#093148)",
    icon: <><path d="M15 10l4.553-2.277A1 1 0 0 1 21 8.649v6.7a1 1 0 0 1-1.447.894L15 14"/><rect x="1" y="6" width="14" height="12" rx="2"/></>,
  },
  {
    name: "Qubits", badge: "Assessment",
    img: "/images/home-banner/Qubits.webp",
    desc: "AI-powered assessments to benchmark skills, identify gaps, and measure training ROI.",
    bullets: ["Skill benchmarking", "Gap identification", "Training ROI measurement"],
    bg: "linear-gradient(145deg,#0a3d5c,#072d44)",
    icon: <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  },
];

function CheckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="8.5" cy="8.5" r="8" stroke="rgba(6,148,209,0.5)" strokeWidth="1"/>
      <path d="M5.5 8.5l2 2 4-4" stroke="#0694d1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const TOTAL = formats.length;

export default function UniqueOfferings() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sliderHoverRef = useRef(false); // true the moment mouse is anywhere inside the slider

  const [start, setStart] = useState(0);
  const [mobileSlide, setMobileSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const mobileDragStart = useRef<number | null>(null);

  const setHover = (val: number | null) => setHoveredCard(val);

  const mobileSwipeStart = (x: number) => {
    mobileDragStart.current = x;
    if (mobileAutoRef.current) clearInterval(mobileAutoRef.current);
  };
  const mobileSwipeEnd = (x: number) => {
    if (mobileDragStart.current === null) return;
    const diff = mobileDragStart.current - x;
    if (Math.abs(diff) > 40) setMobileSlide(s => diff > 0 ? Math.min(s + 1, formats.length - 1) : Math.max(s - 1, 0));
    mobileDragStart.current = null;
    mobileAutoRef.current = setInterval(() => setMobileSlide(s => (s + 1) % formats.length), 3000);
  };


  // Scroll-in animation
  useEffect(() => {
    const targets = [headerRef.current, sliderRef.current, mobileRef.current].filter(Boolean) as HTMLElement[];
    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.65s ease, transform 0.65s ease";
    });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }, i * 120);
          obs.unobserve(entry.target);
        }
      }),
      { threshold: 0.06 }
    );
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Double-rAF slide — aborts in the rAF if slider is being hovered
  const triggerSlide = useCallback((forward: boolean) => {
    const track = trackRef.current;
    if (!track || busyRef.current) return;
    const card = track.children[0] as HTMLElement | undefined;
    if (!card) return;
    const amount = card.offsetWidth + 20;
    busyRef.current = true;
    track.style.transition = "none";
    track.style.transform = "translateX(0px)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (sliderHoverRef.current) { busyRef.current = false; return; }
        track.style.transition = "transform 0.55s cubic-bezier(0.4,0,0.2,1)";
        track.style.transform = `translateX(${forward ? -amount : amount}px)`;
      });
    });
  }, []);

  const handleTransitionEnd = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const forward = track.style.transform.startsWith("translateX(-");
    track.style.transition = "none";
    track.style.transform = "translateX(0px)";
    busyRef.current = false;
    setStart(prev => forward ? (prev + 1) % TOTAL : (prev - 1 + TOTAL) % TOTAL);
  }, []);

  // Interval always runs; sliderHoverRef is the gate
  useEffect(() => {
    autoRef.current = setInterval(() => {
      if (sliderHoverRef.current) return;
      triggerSlide(true);
    }, 3000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [triggerSlide]);

  // Mobile auto-advance every 3s — loops back to start
  const mobileAutoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    mobileAutoRef.current = setInterval(() => {
      setMobileSlide(s => (s + 1) % formats.length);
    }, 3000);
    return () => { if (mobileAutoRef.current) clearInterval(mobileAutoRef.current); };
  }, []);

  const visibleCards = Array.from({ length: 5 }, (_, i) => formats[(start + i) % TOTAL]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden lfr-sec"
      style={{
        background: "linear-gradient(135deg,rgb(6,30,48) 0%,rgb(9,49,72) 50%,rgb(6,34,64) 100%)",
        padding: "30px 16px",
      }}
      aria-labelledby="lfr-heading"
    >
      <style suppressHydrationWarning>{`
        .lfr-flip-inner { transform-style: preserve-3d; }
        .lfr-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .lfr-back { transform: rotateY(180deg); }
        @keyframes lfrRipple { 0%{transform:translate(-50%,-50%) scale(0.25);opacity:0.55} 100%{transform:translate(-50%,-50%) scale(2.8);opacity:0} }
        .lfr-ring { position:absolute; border-radius:50%; pointer-events:none; border:1px solid rgba(6,148,209,0.35); animation:lfrRipple 5s ease-out infinite; }
        .lfr-ring.d1{animation-delay:0s} .lfr-ring.d2{animation-delay:1.6s} .lfr-ring.d3{animation-delay:3.2s}
        @keyframes lfrBtnGlow { 0%,100%{box-shadow:0 0 0 0 rgba(6,148,209,0),0 4px 14px rgba(6,148,209,0.3)} 50%{box-shadow:0 0 22px 7px rgba(6,148,209,0.5),0 4px 14px rgba(6,148,209,0.3)} }
        .lfr-btn-glow { animation:lfrBtnGlow 2.8s ease-in-out infinite; }
        .lfr-desktop { display:block; }
        .lfr-mobile  { display:none; }
        @media(max-width:992px) {
          .lfr-desktop-track > div { flex: 0 0 calc(50% - 10px)!important; }
        }
        @media(max-width:700px) {
          .lfr-sec { padding-top:24px!important; padding-bottom:24px!important; }
        }
        @media(max-width:640px) {
          .lfr-desktop { display:none!important; }
          .lfr-mobile  { display:block!important; }
          .lfr-sec     { padding-top:20px!important; padding-bottom:20px!important; }
        }
        @media(min-width:641px) and (max-width:1024px) {
          .lfr-desktop-track > div { flex: 0 0 calc(50% - 10px)!important; }
        }
        @media(max-width:375px) {
          .lfr-mobile .sc-slide-inner { max-width:100%!important; overflow-x:hidden; }
        }
        .lfr-nav-btn { width:32px; height:32px; border-radius:50%; border:1px solid rgba(6,148,209,0.4); background:rgba(6,148,209,0.12); color:#0694d1; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; transition:background 0.2s; flex-shrink:0; }
        .lfr-nav-btn:hover { background:rgba(6,148,209,0.25); }
        .lfr-nav-btn:disabled { opacity:0.35; cursor:default; }
      `}</style>

      {/* Background orbs */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, left:"25%", width:380, height:380, borderRadius:"50%", opacity:0.25, background:"radial-gradient(circle,#0694d1,transparent 70%)", filter:"blur(60px)" }}/>
        <div style={{ position:"absolute", bottom:0, right:"25%", width:320, height:320, borderRadius:"50%", opacity:0.2, background:"radial-gradient(circle,#076d9d,transparent 70%)", filter:"blur(55px)" }}/>
        <div style={{ position:"absolute", top:"50%", left:40, transform:"translateY(-50%)", width:200, height:200, borderRadius:"50%", opacity:0.15, background:"radial-gradient(circle,#00a4ef,transparent 70%)", filter:"blur(45px)" }}/>
        <div style={{ position:"absolute", top:"33%", right:40, width:180, height:180, borderRadius:"50%", opacity:0.15, background:"radial-gradient(circle,#0694d1,transparent 70%)", filter:"blur(40px)" }}/>
        <div className="lfr-ring d1" style={{ top:"50%", left:"50%", width:420, height:420 }}/>
        <div className="lfr-ring d2" style={{ top:"50%", left:"50%", width:420, height:420 }}/>
        <div className="lfr-ring d3" style={{ top:"50%", left:"50%", width:420, height:420 }}/>
      </div>

      <div style={{ position:"relative", maxWidth:1280, margin:"0 auto" }}>

        {/* Header */}
        <div ref={headerRef} style={{ textAlign:"center", marginBottom:15 }}>
          <span style={{ display:"inline-block", background:"rgba(6,148,209,0.18)", color:C.accent, fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", padding:"6px 16px", borderRadius:20, marginBottom:15 }}>
            Learning Formats
          </span>
          <h2 id="lfr-heading" style={{ fontSize:"clamp(22px, 2.8vw, 36px)", fontWeight:800, color:"#fff", lineHeight:1.35, marginBottom:15, letterSpacing:"-0.015em" }}>
            Learning That{" "}
            <span style={{ background:"linear-gradient(90deg,#0694d1,#38bdf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Fits Your Life
            </span>
          </h2>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.55)", lineHeight:1.65, maxWidth:560, margin:"0 auto 15px" }}>
            Four formats. One quality standard. Every option comes with the same expert instructors, official courseware, and money-back guarantee.
          </p>
        </div>

        {/* ── DESKTOP slider ── */}
        <div
          ref={sliderRef}
          className="lfr-desktop"
          style={{ overflow:"hidden" }}
          onMouseEnter={() => { sliderHoverRef.current = true; }}
          onMouseLeave={() => { sliderHoverRef.current = false; setHover(null); }}
        >
          <div
            ref={trackRef}
            className="lfr-desktop-track"
            style={{ display:"flex", gap:20 }}
            onTransitionEnd={handleTransitionEnd}
          >
            {visibleCards.map((f, i) => (
              <div
                key={`${start}-${i}`}
                style={{ flex:"0 0 calc(25% - 15px)" }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <div className="lfr-flip" style={{ perspective:1000, height:400, cursor:"pointer" }}>
                  <div className="lfr-flip-inner" style={{ position:"relative", width:"100%", height:"100%", transform: hoveredCard === i ? "rotateY(180deg)" : "rotateY(0deg)", transition: hoveredCard === i ? "transform 0.65s cubic-bezier(0.4,0.2,0.2,1)" : "none" }}>
                    {/* FRONT */}
                    <div className="lfr-face" style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", overflow:"hidden", borderRadius:16, background:f.bg, border:"1px solid rgba(6,148,209,0.22)" }}>
                      <div style={{ position:"relative", height:176, flexShrink:0, overflow:"hidden", borderRadius:"16px 16px 0 0" }}>
                        <img src={f.img} alt={f.name} width={320} height={176} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} loading="lazy" decoding="async"/>
                        <span style={{ position:"absolute", left:12, top:12, fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:20, background:"rgba(9,49,72,0.55)", backdropFilter:"blur(6px)", color:"#fff", letterSpacing:"0.04em" }}>
                          {f.badge}
                        </span>
                      </div>
                      <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"16px 20px 0" }}>
                        <h3 style={{ fontSize:15, fontWeight:600, color:"#fff", marginBottom:8, lineHeight:1.3 }}>{f.name}</h3>
                        <p style={{ fontSize:13, color:"rgba(255,255,255,0.6)", lineHeight:1.65, flex:1, fontWeight:300 }}>{f.desc}</p>
                        <div style={{ paddingBottom:20, paddingTop:20 }}>
                          <button className="lfr-btn-glow" style={{ display:"block", width:"100%", padding:"10px 0", borderRadius:12, border:"none", background:"linear-gradient(135deg,#0694d1,#076d9d)", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                            Learn More →
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* BACK */}
                    <div className="lfr-face lfr-back" style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", borderRadius:16, padding:20, background:f.bg, border:"1px solid rgba(6,148,209,0.35)" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                        <div style={{ width:40, height:40, borderRadius:12, background:"rgba(6,148,209,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                        </div>
                        <h3 style={{ fontSize:14, fontWeight:700, color:"#fff", lineHeight:1.3 }}>{f.name}</h3>
                      </div>
                      <div style={{ height:1, background:"rgba(6,148,209,0.25)", marginBottom:16 }}/>
                      <ul style={{ listStyle:"none", padding:0, margin:"0 0 auto", display:"flex", flexDirection:"column", gap:10, flex:1 }}>
                        {f.bullets.map((b) => (
                          <li key={b} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:13, color:"rgba(255,255,255,0.78)", lineHeight:1.4 }}>
                            <CheckIcon/>{b}
                          </li>
                        ))}
                      </ul>
                      <button className="lfr-btn-glow" style={{ marginTop:20, display:"block", width:"100%", padding:"10px 0", borderRadius:12, border:"none", background:"linear-gradient(135deg,#0694d1,#076d9d)", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop ← counter → navigation */}
        <div className="lfr-desktop" style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:16, marginTop:24 }}>
          <button className="lfr-nav-btn" onClick={() => triggerSlide(false)} aria-label="Previous">←</button>
          <span style={{ fontSize:13, fontWeight:600, letterSpacing:"0.08em", color:"rgba(255,255,255,0.75)", minWidth:52, textAlign:"center" }}>
            {String(start + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </span>
          <button className="lfr-nav-btn" onClick={() => triggerSlide(true)} aria-label="Next">→</button>
        </div>

        {/* ── MOBILE: 1 full-width card per slide, 8 slides ── */}
        <div ref={mobileRef} className="lfr-mobile">
          <div style={{ overflow:"hidden" }}
            onTouchStart={e => mobileSwipeStart(e.touches[0].clientX)}
            onTouchEnd={e => mobileSwipeEnd(e.changedTouches[0].clientX)}
            onMouseDown={e => mobileSwipeStart(e.clientX)}
            onMouseUp={e => mobileSwipeEnd(e.clientX)}
            onMouseLeave={e => { if (mobileDragStart.current !== null) mobileSwipeEnd(e.clientX); }}
            style={{ userSelect:"none", cursor:"grab" }}>
            <div style={{
              display:"flex",
              width:`${formats.length * 100}%`,
              transform:`translateX(-${(mobileSlide / formats.length) * 100}%)`,
              transition:"transform 0.45s cubic-bezier(0.4,0,0.2,1)",
              boxSizing:"border-box",
              pointerEvents:"none",
            }}>
              {formats.map((f) => (
                <div key={f.name} style={{ width:`${100 / formats.length}%`, flexShrink:0 }}>
                  <div style={{ borderRadius:16, overflow:"hidden", background:f.bg, border:"1px solid rgba(6,148,209,0.22)", display:"flex", flexDirection:"column" }}>
                    <div style={{ position:"relative", height:200, flexShrink:0, overflow:"hidden", borderRadius:"16px 16px 0 0" }}>
                      <img src={f.img} alt={f.name} width={400} height={200} style={{ width:"100%", height:"100%", objectFit:"cover" }} loading="lazy"/>
                      <span style={{ position:"absolute", left:12, top:12, borderRadius:999, padding:"4px 12px", fontSize:11, fontWeight:600, background:"rgba(9,49,72,0.6)", backdropFilter:"blur(6px)", color:"#fff", letterSpacing:"0.03em" }}>{f.badge}</span>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", flex:1, padding:"16px 16px 18px" }}>
                      <h3 style={{ fontSize:16, fontWeight:700, color:"#fff", marginBottom:8, lineHeight:1.3 }}>{f.name}</h3>
                      <p style={{ fontSize:14, color:"rgba(255,255,255,0.65)", lineHeight:1.6, flex:1, margin:0 }}>{f.desc}</p>
                      <button className="lfr-btn-glow" style={{ marginTop:16, width:"100%", borderRadius:12, padding:"12px 0", fontSize:14, fontWeight:700, color:"#fff", background:"linear-gradient(135deg,#0694d1,#076d9d)", border:"none", cursor:"pointer", fontFamily:"inherit" }}>
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Arrow nav + counter */}
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:20, marginTop:20 }}>
            <button className="lfr-nav-btn" onClick={() => setMobileSlide(s => Math.max(s - 1, 0))} disabled={mobileSlide === 0} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span style={{ fontSize:13, fontWeight:600, letterSpacing:"0.08em", color:"rgba(255,255,255,0.75)", minWidth:52, textAlign:"center" }}>
              {String(mobileSlide + 1).padStart(2, "0")} / {String(formats.length).padStart(2, "0")}
            </span>
            <button className="lfr-nav-btn" onClick={() => setMobileSlide(s => Math.min(s + 1, formats.length - 1))} disabled={mobileSlide === formats.length - 1} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

/* ── Feature cards ──────────────────────────────────────────────── */
const FEATURES = [
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/Ai.png',
    title: 'Embedding AI Tools / Gen AI',
    desc: 'Leverage cutting-edge AI tools and technology in the context of your chosen course to enhance learning outcomes.',
    icon: <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/></>,
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/video.png',
    title: 'Recorded Sessions',
    desc: 'Session recordings accessible for 90 days, with extensions available upon request.',
    icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/report.png',
    title: 'Manager Reports',
    desc: 'Tailored reports for managers — learner performance, attendance, exam redemption, Qubits scores, and more.',
    icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/live.png',
    title: 'Live Training',
    desc: 'Expert-led training delivered live in both online and offline formats to suit your schedule.',
    icon: <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/custom.png',
    title: 'Customised LMS',
    desc: 'Learner access to Qubits, knowledge checks, trainer-shared resources and all course-related information.',
    icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/translate.png',
    title: 'Content Translation',
    desc: 'PPTs, videos with voiceovers, and subtitles translated into your required language.',
    icon: <><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></>,
  },
]

/* ── Case studies ────────────────────────────────────────────────── */
const CASE_STUDIES = [
  { id: 1,  title: 'Seamless SAP Migration Through Tailored Training',
    bg: 'linear-gradient(135deg,#0f2d4a 0%,#1a4a6e 100%)', accent: '#4da6d6',
    icon: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></> },
  { id: 2,  title: 'Fueling Innovation with Azure OpenAI Hackathons',
    bg: 'linear-gradient(135deg,#0a2540 0%,#0e4d7a 100%)', accent: '#38bdf8',
    icon: <><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3M6.343 6.343l-.707-.707M10.121 20.364A9 9 0 1 1 20.364 10.12"/><path d="M12 7v5l3 3"/></> },
  { id: 3,  title: '140 Learners Upskilled in Azure and AI Fundamentals',
    bg: 'linear-gradient(135deg,#0d3352 0%,#0694D1 100%)', accent: '#e0f2fe',
    icon: <><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><path d="M9 14l2 2 4-4"/></> },
  { id: 4,  title: 'Empowering Women in Tech with AI Training',
    bg: 'linear-gradient(135deg,#2d1b69 0%,#6d28d9 100%)', accent: '#c4b5fd',
    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></> },
  { id: 5,  title: 'Power BI Upskilling Across Roles and Regions',
    bg: 'linear-gradient(135deg,#1e3a5f 0%,#f59e0b 60%)', accent: '#fde68a',
    icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><rect x="2" y="2" width="20" height="20" rx="2" fill="none"/></> },
  { id: 6,  title: 'Cloud Migration Kickoff with Azure & AWS Training',
    bg: 'linear-gradient(135deg,#0a2540 0%,#0f4c75 100%)', accent: '#67e8f9',
    icon: <><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><path d="M12 12l3 3-3 3m-3-3h6"/></> },
  { id: 7,  title: 'Boosting Security Skills with Microsoft Stack Training',
    bg: 'linear-gradient(135deg,#1a0533 0%,#7c3aed 80%)', accent: '#a78bfa',
    icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></> },
  { id: 8,  title: 'Custom Leadership Training for Cross-Cultural Impact',
    bg: 'linear-gradient(135deg,#064e3b 0%,#059669 100%)', accent: '#6ee7b7',
    icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></> },
  { id: 9,  title: 'Solving Postgres-Azure Complexity with Custom Training',
    bg: 'linear-gradient(135deg,#1e3a5f 0%,#1d4ed8 100%)', accent: '#93c5fd',
    icon: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M9 13l2 2 4-4"/></> },
  { id: 10, title: 'Equipping Nonprofits with Real-World AI & Data Skills',
    bg: 'linear-gradient(135deg,#7f1d1d 0%,#dc2626 80%)', accent: '#fca5a5',
    icon: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></> },
  { id: 11, title: 'On-Premise Power BI Training for High-Security Environments',
    bg: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)', accent: '#60a5fa',
    icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="20" x2="18" y2="10"/></> },
  { id: 12, title: 'Rebuilding BI Publisher Training from the Ground Up',
    bg: 'linear-gradient(135deg,#1c1917 0%,#78350f 100%)', accent: '#fbbf24',
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><path d="M9 9l1 1 3-3"/></> },
  { id: 13, title: 'Scaling Azure Training with Multilingual AI Localization',
    bg: 'linear-gradient(135deg,#0d3352 0%,#0694D1 100%)', accent: '#7dd3fc',
    icon: <><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></> },
  { id: 14, title: 'Terraform Certification with IBM Cloud, Tailored On-Site',
    bg: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)', accent: '#818cf8',
    icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22"/></> },
  { id: 15, title: 'Mastering OKD: OpenShift Training for Cost-Saving DevOps',
    bg: 'linear-gradient(135deg,#0f2027 0%,#203a43 50%,#2c5364 100%)', accent: '#34d399',
    icon: <><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/></> },
  { id: 16, title: 'Building In-House Microservices Expertise from the Ground Up',
    bg: 'linear-gradient(135deg,#0a2540 0%,#0369a1 100%)', accent: '#38bdf8',
    icon: <><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="8" height="8" rx="1"/><line x1="10" y1="6" x2="14" y2="6"/><line x1="10" y1="18" x2="14" y2="18"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="18" y1="10" x2="18" y2="14"/></> },
  { id: 17, title: 'Custom LMS & Cyber Labs Training for Global Retailer',
    bg: 'linear-gradient(135deg,#4c0519 0%,#9f1239 100%)', accent: '#fda4af',
    icon: <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></> },
  { id: 18, title: 'Scaling Copilot Training with Role-Based Precision',
    bg: 'linear-gradient(135deg,#0a1628 0%,#0694D1 100%)', accent: '#bae6fd',
    icon: <><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></> },
  { id: 19, title: 'Offline Network Training for High-Security Government Environments',
    bg: 'linear-gradient(135deg,#1a2e1a 0%,#166534 100%)', accent: '#86efac',
    icon: <><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></> },
  { id: 20, title: 'Custom Cisco Nexus Training for Data Center Excellence',
    bg: 'linear-gradient(135deg,#0c1a2e 0%,#0f3460 100%)', accent: '#60a5fa',
    icon: <><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></> },
]

/* ── Stats (ILO style) ──────────────────────────────────────────── */
const HERO_STATS = [
  { val: '500+',  label: 'Enterprise Clients',
    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></> },
  { val: '50+',   label: 'Countries Served',
    icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></> },
  { val: '98%',   label: 'Satisfaction Rate',
    icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></> },
  { val: '33+',   label: 'Years in Training',
    icon: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></> },
]

const INITIAL_VISIBLE = 8

/* ── Page ────────────────────────────────────────────────────────── */
export default function CustomisedTrainingPage() {
  const [showAll, setShowAll]         = useState(false)
  const [requirement, setRequirement] = useState('')
  const [generating, setGenerating]   = useState(false)
  const [generated, setGenerated]     = useState(false)
  const [emailSent, setEmailSent]     = useState(false)

  const visibleStudies = showAll ? CASE_STUDIES : CASE_STUDIES.slice(0, INITIAL_VISIBLE)

  const handleGenerate = () => {
    if (!requirement.trim() || generating) return
    setGenerating(true)
    setGenerated(false)
    setTimeout(() => { setGenerating(false); setGenerated(true) }, 2000)
  }

  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #061624 0%, #071929 60%, #062236 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow blobs */}
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', top: -160, right: '33%', width: 600, height: 600, borderRadius: '50%', opacity: 0.15, filter: 'blur(120px)', background: '#0694D1' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 400, height: 400, borderRadius: '50%', opacity: 0.10, filter: 'blur(100px)', background: '#38bdf8' }} />
          <div style={{ position: 'absolute', top: '50%', right: 0, width: 300, height: 300, borderRadius: '50%', opacity: 0.08, filter: 'blur(80px)', background: '#076D9D' }} />
        </div>

        <style>{`
          .ct-stat-item:hover .ct-stat-glow { opacity: 1 !important; }
          .ct-features-grid { grid-template-columns: repeat(3, 1fr) !important; }
          @media (max-width: 767px) {
            .ct-features-grid { grid-template-columns: 1fr !important; }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .ct-features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 1023px) {
            .ct-hero-grid { grid-template-columns: 1fr !important; }
            .ct-stats-card { display: none !important; }
            .ct-mobile-stats { display: grid !important; }
          }
        `}</style>

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '35px 20px 35px', paddingLeft: 'max(20px, 50px)', paddingRight: 'max(20px, 50px)' }}>
          <div className="ct-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            {/* ── Left: text ─────────────────────────────────── */}
            <div>
              <div style={{ marginBottom: 16, display: 'inline-flex', alignItems: 'center', gap: 8,
                borderRadius: 999, padding: '6px 16px', fontSize: 12, fontWeight: 600,
                background: 'rgba(6,148,209,0.18)', color: '#38bdf8', border: '1px solid rgba(6,148,209,0.35)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8', display: 'inline-block', animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }} />
                Enterprise Learning Solutions
              </div>

              <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, lineHeight: 1.18,
                marginBottom: 16, color: '#fff', letterSpacing: '-0.02em' }}>
                Empower your Workforce with Koenig&apos;s{' '}
                <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Customized Learning
                </span>
              </h1>

              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 28, maxWidth: 520 }}>
                Tailored programmes designed around your business goals — blending expert-led live training, AI tools, custom LMS, and multilingual content delivery.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
                <a href="#generator" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #0694D1, #076D9D)',
                  color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none',
                  boxShadow: '0 0 20px rgba(6,148,209,0.35)',
                }}>
                  Generate a Custom Course
                </a>
                <a href="#case-studies" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 12, cursor: 'pointer',
                  border: '1.5px solid rgba(6,148,209,0.6)', color: '#38bdf8',
                  background: 'rgba(6,148,209,0.08)', fontSize: 14, fontWeight: 700,
                  textDecoration: 'none',
                }}>
                  View Case Studies
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>

              {/* Mobile stats (hidden on desktop) */}
              <div className="ct-mobile-stats" style={{ display: 'none', gridTemplateColumns: '1fr 1fr', borderRadius: 16, border: '1px solid rgba(6,148,209,0.18)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                {HERO_STATS.map(({ val, label }, i) => (
                  <div key={val} style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 4,
                    borderRight: i % 2 === 0 ? '1px solid rgba(6,148,209,0.12)' : 'none',
                    borderBottom: i < 2 ? '1px solid rgba(6,148,209,0.12)' : 'none' }}>
                    <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1,
                      background: 'linear-gradient(135deg, #ffffff 0%, #50e6ff 60%, #0694D1 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{val}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: stats card (ILO style) ──────────────── */}
            <div className="ct-stats-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* 2×2 stats grid */}
              <div style={{ borderRadius: 20, border: '1px solid rgba(6,148,209,0.15)', overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,148,209,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ display: 'grid', gridTemplateRows: 'auto 1px auto' }}>
                  {/* Row 1 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
                    {HERO_STATS.slice(0, 2).map((s, i) => (
                      <>
                        {i === 1 && <div key="div" style={{ background: 'rgba(6,148,209,0.12)' }} />}
                        <div key={s.val} className="ct-stat-item" style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
                          <div className="ct-stat-glow" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(6,148,209,0.5), transparent)', opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{s.icon}</svg>
                            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, background: 'linear-gradient(135deg, #ffffff 0%, #50e6ff 60%, #0694D1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
                          </div>
                          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>{s.label}</div>
                        </div>
                      </>
                    ))}
                  </div>
                  {/* divider */}
                  <div style={{ height: 1, background: 'rgba(6,148,209,0.12)' }} />
                  {/* Row 2 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
                    {HERO_STATS.slice(2, 4).map((s, i) => (
                      <>
                        {i === 1 && <div key="div2" style={{ background: 'rgba(6,148,209,0.12)' }} />}
                        <div key={s.val} className="ct-stat-item" style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
                          <div className="ct-stat-glow" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(6,148,209,0.5), transparent)', opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{s.icon}</svg>
                            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, background: 'linear-gradient(135deg, #ffffff 0%, #50e6ff 60%, #0694D1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
                          </div>
                          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>{s.label}</div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trusted by card */}
              <div style={{ borderRadius: 20, border: '1px solid rgba(6,148,209,0.15)', background: 'rgba(255,255,255,0.02)', position: 'relative', padding: '20px 22px' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: 20, background: 'linear-gradient(135deg, rgba(6,148,209,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>Trusted by enterprises across</div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {['Finance','Healthcare','Government','Retail','Technology','Manufacturing','Consulting','Telecoms'].map(s => (
                      <span key={s} style={{ fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
                        color: 'rgba(255,255,255,0.5)' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* ── HOW WE ARE DIFFERENT ───────────────────────────────── */}
      <section style={{ background: 'linear-gradient(145deg, #06111E 0%, #081d35 60%, #06111E 100%)', padding: '64px 20px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: 'max(0px, 30px)', paddingRight: 'max(0px, 30px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'inline-block', marginBottom: 12, borderRadius: 999,
              background: 'rgba(6,148,209,0.10)', padding: '6px 18px', fontSize: 12,
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0694D1' }}>
              What Makes Us Different
            </span>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#fff', marginBottom: 14, lineHeight: 1.25, letterSpacing: '-0.015em' }}>
              How are Koenig&apos;s Customized Learning{' '}
              <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Solutions different?
              </span>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              Koenig combines different services to meet the business outcome you need.
            </p>
          </div>

          <div className="ct-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div key={i}
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, padding: '24px 22px',
                  borderRadius: 20, cursor: 'default', overflow: 'hidden', transition: 'all 0.3s',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(6,148,209,0.55)'
                  el.style.boxShadow = '0 12px 36px rgba(0,0,0,0.35), 0 0 0 1px rgba(6,148,209,0.3), 0 0 28px rgba(6,148,209,0.15)'
                  el.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                  el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2)'
                  el.style.transform = 'none'
                }}>
                {/* Top accent line on hover */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', height: 2, width: 0,
                  borderRadius: 999, pointerEvents: 'none', transition: 'width 0.5s',
                  background: 'linear-gradient(90deg, transparent, #0694D1, #38bdf8, #0694D1, transparent)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.width = '100%' }}
                />
                {/* Icon */}
                <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.28)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.img} alt={f.title} style={{ width: 30, height: 30, objectFit: 'contain' }}
                    onError={e => {
                      const img = e.currentTarget as HTMLImageElement
                      img.style.display = 'none'
                      if (img.parentElement) img.parentElement.innerHTML = `<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#0694D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${(f.icon as unknown as {props: {children: string}}).props?.children ?? ''}</svg>`
                    }} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.4, margin: 0 }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ───────────────────────────────────────── */}
      <section id="case-studies" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,148,209,0.13) 0%, rgba(6,148,209,0.04) 50%, #f0f7fc 100%)', padding: '64px 20px', borderTop: '1px solid #CAEFFF', boxShadow: 'inset 0 8px 48px rgba(6,148,209,0.10)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: 'max(0px, 30px)', paddingRight: 'max(0px, 30px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'inline-block', marginBottom: 12, borderRadius: 999,
              background: 'rgba(6,148,209,0.10)', padding: '6px 18px', fontSize: 12,
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0694D1' }}>
              Success Stories
            </span>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#06111E', marginBottom: 14, lineHeight: 1.25, letterSpacing: '-0.015em' }}>
              Our{' '}
              <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Case Studies
              </span>
            </h2>
            <p style={{ fontSize: 15, color: '#7a8c96', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              How Koenig has delivered tailored learning programmes for organisations across the globe.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 20 }}>
            {visibleStudies.map(cs => (
              <div key={cs.id}
                style={{ background: '#fff', borderRadius: 16, overflow: 'hidden',
                  border: '1px solid #CAEFFF', boxShadow: '0 2px 8px rgba(6,148,209,0.06)',
                  transition: 'box-shadow 0.2s, transform 0.2s', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = '0 12px 32px rgba(6,148,209,0.14)'
                  el.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = '0 2px 8px rgba(6,148,209,0.06)'
                  el.style.transform = 'none'
                }}>
                {/* Thumbnail */}
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: cs.bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {/* subtle grid pattern */}
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }} xmlns="http://www.w3.org/2000/svg">
                    <defs><pattern id={`grid-${cs.id}`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${cs.id})`}/>
                  </svg>
                  {/* topic icon */}
                  <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke={cs.accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1, filter: `drop-shadow(0 0 12px ${cs.accent}66)` }}>
                    {cs.icon}
                  </svg>
                  {/* accent glow orb */}
                  <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: cs.accent, opacity: 0.08, filter: 'blur(20px)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}/>
                </div>
                {/* Body */}
                <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#06111E', lineHeight: 1.55, margin: 0 }}>
                    {cs.title}
                  </h3>
                  <div style={{ marginTop: 'auto' }}>
                    <a href="https://www.koenig-solutions.com/customised-training"
                      target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 12, fontWeight: 700, color: '#0694D1', textDecoration: 'none' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {CASE_STUDIES.length > INITIAL_VISIBLE && (
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <button
                onClick={() => setShowAll(s => !s)}
                style={{ padding: '12px 32px', borderRadius: 12, border: '2px solid #0694D1',
                  background: 'transparent', color: '#0694D1', fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#0694D1'; el.style.color = '#fff' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'transparent'; el.style.color = '#0694D1' }}>
                {showAll ? 'Show Less' : `Show ${CASE_STUDIES.length - INITIAL_VISIBLE} More Case Studies`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(145deg, #06111E 0%, #081d35 60%, #06111E 100%)', padding: '64px 20px', position: 'relative', overflow: 'hidden' }}>
        {/* Radial glow */}
        <div style={{ pointerEvents: 'none', position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,148,209,0.12) 0%, transparent 65%)' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: 'max(0px, 30px)', paddingRight: 'max(0px, 30px)', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ display: 'inline-block', marginBottom: 12, borderRadius: 999, background: 'rgba(6,148,209,0.10)', padding: '6px 18px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0694D1' }}>
              Our Process
            </span>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#fff', marginBottom: 14, lineHeight: 1.25, letterSpacing: '-0.015em' }}>
              How Customised Training{' '}
              <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Works
              </span>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              From your first conversation to post-training reports — a seamless end-to-end experience built around your goals.
            </p>
          </div>

          <div className="ct-how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
            {/* Connecting line */}
            <div className="ct-how-line" style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 2, background: 'linear-gradient(90deg, transparent, rgba(6,148,209,0.35) 15%, rgba(6,148,209,0.35) 85%, transparent)', pointerEvents: 'none', zIndex: 0 }} />

            {[
              {
                step: '01', title: 'Share Your Requirement',
                desc: 'Tell us your team size, skills gaps, preferred format, timeline, and budget. We listen before we design.',
                icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
              },
              {
                step: '02', title: 'Custom Curriculum Design',
                desc: 'Our experts build a bespoke course outline, blending AI tools, live sessions, and role-based scenarios.',
                icon: <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></>,
              },
              {
                step: '03', title: 'Live Training Delivery',
                desc: 'Vendor-certified instructors deliver online or onsite — with recorded sessions, labs, and real-time support.',
                icon: <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
              },
              {
                step: '04', title: 'Reports & Certification',
                desc: 'Detailed manager reports on attendance and performance, plus exam redemption and Qubits scores.',
                icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
              },
            ].map((s, i) => (
              <div key={i} style={{ position: 'relative', zIndex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, flexShrink: 0, position: 'relative',
                  background: 'linear-gradient(135deg, rgba(6,148,209,0.18), rgba(6,148,209,0.06))',
                  border: '1.5px solid rgba(6,148,209,0.35)',
                  boxShadow: '0 0 24px rgba(6,148,209,0.18)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                  <span style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#0694D1,#076D9D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff', letterSpacing: 0 }}>{s.step}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.4 }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <style>{`
            @media (max-width: 767px) {
              .ct-how-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
              .ct-how-line { display: none !important; }
            }
            @media (min-width: 768px) and (max-width: 1023px) {
              .ct-how-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
              .ct-how-line { display: none !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ── CUSTOM COURSE GENERATOR ─────────────────────────────── */}
      <section id="generator" style={{ background: '#fff', padding: '64px 20px', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ display: 'inline-block', marginBottom: 12, borderRadius: 999,
              background: 'rgba(6,148,209,0.10)', padding: '6px 18px', fontSize: 12,
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0694D1' }}>
              AI-Powered
            </span>
            <h2 style={{ fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 800, color: '#06111E', marginBottom: 12, letterSpacing: '-0.015em' }}>
              Need Customised Training?
            </h2>
            <p style={{ fontSize: 15, color: '#7a8c96', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
              Share your requirement below and generate a custom course table of contents.
            </p>
          </div>

          <div style={{ background: '#f8fafc', border: '1.5px solid #CAEFFF', borderRadius: 20, padding: '36px 32px',
            boxShadow: '0 4px 24px rgba(6,148,209,0.07)' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#06111E', marginBottom: 10 }}>
              Describe Your Training Requirement
            </label>
            <textarea
              value={requirement}
              onChange={e => setRequirement(e.target.value)}
              rows={5}
              placeholder="E.g. We need Azure Administrator training for 25 engineers, blended with AI/ML fundamentals, over 5 days onsite in Dubai."
              style={{ width: '100%', boxSizing: 'border-box', background: '#fff',
                border: '1.5px solid #CAEFFF', borderRadius: 12, padding: '14px 16px',
                fontSize: 14, color: '#06111E', outline: 'none', fontFamily: 'inherit',
                resize: 'vertical', minHeight: 120, transition: 'border-color 0.2s' }}
              onFocus={e => (e.target.style.borderColor = '#0694D1')}
              onBlur={e => (e.target.style.borderColor = '#CAEFFF')}
            />

            {generating && (
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10,
                background: 'linear-gradient(135deg,#f0f7fc,#e8f4fb)', border: '1.5px solid #CAEFFF',
                borderRadius: 12, padding: '16px 20px' }}>
                <style>{`@keyframes ctSpin{to{transform:rotate(360deg)}}`}</style>
                <div style={{ width: 16, height: 16, border: '2px solid #0694D1', borderTopColor: 'transparent',
                  borderRadius: '50%', animation: 'ctSpin 0.7s linear infinite', flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, color: '#5a7a8c', fontWeight: 500 }}>TOC generating in progress…</span>
              </div>
            )}

            {generated && (
              <div style={{ marginTop: 16, background: 'linear-gradient(135deg,#f0f7fc,#e8f4fb)',
                border: '1.5px solid #CAEFFF', borderRadius: 12, padding: '20px 22px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#06111E', marginBottom: 12 }}>
                  Generated Table of Contents
                </div>
                {['Introduction & Business Context', 'Core Technical Concepts', 'Hands-on Lab Sessions', 'Role-Based Scenario Workshops', 'Assessment & Knowledge Check', 'Certification Preparation'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                    <span style={{ minWidth: 22, height: 22, borderRadius: 6, background: 'rgba(6,148,209,0.1)',
                      color: '#0694D1', fontSize: 11, fontWeight: 800, display: 'inline-flex',
                      alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 13.5, color: '#374151', lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
                <div style={{ fontSize: 12, color: 'rgba(6,148,209,0.7)', marginTop: 12, paddingTop: 12,
                  borderTop: '1px solid #CAEFFF' }}>
                  Review the above TOC. If any change is required, mention below and click Re-Generate.
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
              <button onClick={handleGenerate} disabled={!requirement.trim() || generating}
                style={{ padding: '12px 26px', borderRadius: 12, border: 'none',
                  cursor: requirement.trim() && !generating ? 'pointer' : 'not-allowed',
                  background: requirement.trim() && !generating
                    ? 'linear-gradient(135deg,#0694D1,#0577ab)' : '#cbd5e1',
                  color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'inherit',
                  boxShadow: requirement.trim() && !generating ? '0 4px 14px rgba(6,148,209,0.35)' : 'none',
                  transition: 'all 0.2s' }}>
                {generated ? 'Re-Generate Course' : 'Generate Course'}
              </button>
              {generated && (
                <button onClick={() => { setEmailSent(true); setTimeout(() => setEmailSent(false), 3000) }}
                  style={{ padding: '12px 26px', borderRadius: 12,
                    border: '1.5px solid #0694D1', background: emailSent ? '#0694D1' : 'transparent',
                    color: emailSent ? '#fff' : '#0694D1', fontSize: 14, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                  {emailSent ? '✓ TOC Sent to Your Inbox!' : 'Email Me the TOC'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

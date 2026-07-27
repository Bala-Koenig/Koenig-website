'use client'
import { useState, useRef } from 'react'
import Navbar from '@/components/Navbar'
import HeroParticles from '@/components/HeroParticles'

/* ── Data (sourced from koenig-solutions.com/learnova — content unchanged) ── */
const FEATURES = [
  {
    title: 'A Living Library, Not a Static Shelf',
    desc: 'Your organization\'s knowledge deserves better than folders and playlists. LearNova builds a living library — combining your internal content, official courses, and Koenig\'s expert-led videos. The system learns what\'s being watched, where people pause, and what gets skipped — and re-organizes itself accordingly.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>,
  },
  {
    title: 'Dashboards That Think in Outcomes',
    desc: 'Our dashboards don\'t just show completion rates — they show correlations. Which teams learn faster? Which skills drive performance? Koenig\'s analytics connect learning behavior to business success — turning "course finished" into "impact achieved."',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>,
  },
  {
    title: 'AI-Shaped Learning Journeys',
    desc: 'Every learner is different. Our AI-driven learning paths study preferences, speed, and performance to create adaptive learning maps that change in real time — like a GPS for skills. Learn slow or sprint ahead — the LMS bends around you.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>,
  },
  {
    title: 'Beyond Quizzes — Assessments that Understand',
    desc: 'Multiple choice? Sure. But also multi-line answers, reflections, and scenario responses that reveal thinking, not guessing. Our evaluation tools help leaders see how employees think, not just what they know.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>,
  },
  {
    title: 'Microsoft Learning Inside',
    desc: 'Plug into Microsoft\'s official learning universe. Access certifications, resources, and labs — all from within your LMS. One sign-on. One unified experience.',
    icon: <><rect x="1" y="1" width="9" height="9"/><rect x="14" y="1" width="9" height="9"/><rect x="1" y="14" width="9" height="9"/><rect x="14" y="14" width="9" height="9"/></>,
  },
  {
    title: 'Optional, Human Touch',
    desc: 'Prefer a guided experience? Assign a personal coach to every learner — a real Koenig expert who reviews progress, sets challenges, and inspires completion. Human mentorship, algorithmically matched.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>,
  },
  {
    title: 'Built for the Connected Ecosystem',
    desc: 'AICC. SCORM. xAPI. LTI. All built in — so your LMS isn\'t an island but a hub in your digital learning network.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.684 13.342a4 4 0 010-5.684m6.632 5.684a4 4 0 000-5.684m-8.79 8.79a8 8 0 010-11.896m10.948 11.896a8 8 0 000-11.896M12 12h.01"/>,
  },
  {
    title: 'AI-Translation That Brings the World Closer',
    desc: 'Train in any language, anywhere. Our auto-translation engine converts videos, transcripts, and subtitles — breaking language barriers so learning travels as fast as your teams do.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.5 5.5c-1.667 4.667-4.5 9-8.5 12.5"/>,
  },
]

const STATS = [
  { value: '33+', label: 'Years of Excellence' },
  { value: 'Global', label: 'Workforce Training' },
  { value: '1', label: 'Adaptive Platform' },
]

const LEARNOVA_TOPICS = [
  'Microsoft Certifications', 'Cloud & DevOps', 'Cybersecurity', 'Project Management',
  'Data & AI', 'Soft Skills & Leadership', 'Custom Enterprise Programme',
]

const HEAR_OPTIONS = [
  'Organic Search (Google/Bing/Yahoo)', 'Paid Search Ads (Google Ads, Bing Ads)',
  'Webinars', 'Email Outreach', 'LinkedIn', 'Social Media (Facebook, Instagram, X)',
  'YouTube', 'Trustpilot', 'Word of Mouth', 'Existing customer referral',
  'Press release', 'Other',
]

/* ── Request-info form (same shared component used across all Learning Options pages) ── */
function InquiryForm({ formType, setFormType }: { formType: 'individual' | 'enterprise'; setFormType: (t: 'individual' | 'enterprise') => void }) {
  const inputCls = 'w-full rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-white/35 transition-colors'
  const inputSty = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'white' }
  const selectSty = { background: '#0b1c2e', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.55)' }
  const optSty = { background: '#0b1c2e' }
  return (
    <>
      <div className="flex gap-3 mb-5">
        <a href="https://wa.me/919840722417" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'white', background: 'rgba(255,255,255,0.06)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp us
        </a>
        <a href="mailto:info@koenig-solutions.com" className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'white', background: 'rgba(255,255,255,0.06)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          Email us
        </a>
      </div>
      <div className="flex rounded-xl p-1 mb-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {(['individual', 'enterprise'] as const).map(t => (
          <button key={t} type="button" onClick={() => setFormType(t)}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all"
            style={formType === t ? { background: 'linear-gradient(135deg, #0694D1, #00B4D8)', color: 'white', boxShadow: '0 2px 12px rgba(6,148,209,0.40)' } : { color: 'rgba(255,255,255,0.45)', background: 'transparent' }}>
            {t === 'individual'
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>}
            {t === 'individual' ? 'Individual' : 'Enterprise'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div><label className="block text-xs font-semibold mb-1.5 text-white">Full Name <span className="text-red-400">*</span></label><input className={inputCls} style={inputSty} placeholder="John Smith" /></div>
        <div><label className="block text-xs font-semibold mb-1.5 text-white">{formType === 'enterprise' ? 'Business Email' : 'Email'} <span className="text-red-400">*</span></label><input className={inputCls} style={inputSty} type="email" placeholder={formType === 'enterprise' ? 'john@company.com' : 'john@example.com'} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div><label className="block text-xs font-semibold mb-1.5 text-white">Phone</label><input className={inputCls} style={inputSty} type="tel" placeholder="+1 (555) 000-0000" /></div>
        <div>{formType === 'enterprise' ? (<><label className="block text-xs font-semibold mb-1.5 text-white">Number of Trainees</label><input className={inputCls} style={inputSty} placeholder="e.g. 500" /></>) : (<><label className="block text-xs font-semibold mb-1.5 text-white">Select Course Name</label><select className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={selectSty}><option value="" style={optSty}>Select Course Name</option>{LEARNOVA_TOPICS.map(o => <option key={o} style={optSty}>{o}</option>)}</select></>)}</div>
      </div>
      <div className="mb-3"><label className="block text-xs font-semibold mb-1.5 text-white">How did you hear about us?</label><select className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={selectSty}><option value="" style={optSty}>Select Option</option>{HEAR_OPTIONS.map(o => <option key={o} style={optSty}>{o}</option>)}</select></div>
      <div className="mb-5"><label className="block text-xs font-semibold mb-1.5 text-white">Tell us more about your Training Request</label><textarea className={`${inputCls} resize-none`} style={inputSty} rows={4} placeholder="e.g. We need an LMS to onboard and certify 500 engineers across 4 regions..." /></div>
      <div className="flex justify-center mb-5">
        <div className="inline-flex items-center gap-3 rounded-xl px-5 py-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#0694D1' }} />
          <span className="text-sm text-white">I&apos;m not a robot</span>
          <div className="ml-4 text-right"><p className="text-[9px] font-bold" style={{ color: '#4A90D9' }}>reCAPTCHA</p><p className="text-[8px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Privacy · Terms</p></div>
        </div>
      </div>
      <button type="button" className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #0694D1, #00B4D8)', boxShadow: '0 4px 20px rgba(6,148,209,0.40)' }}>Submit</button>
    </>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function LearnovaPage() {
  const [featPage, setFeatPage] = useState(0)
  const featTotalPages = Math.ceil(FEATURES.length / 2)
  const featTouchX = useRef(0)
  const [formType, setFormType] = useState<'individual' | 'enterprise'>('individual')

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ background: 'radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 45%, #040C18 100%)', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          @keyframes lvFloatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
          @keyframes lvFloatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(16px)} }
          .lv-blob1 { animation: lvFloatA 7s ease-in-out infinite; }
          .lv-blob2 { animation: lvFloatB 8s ease-in-out infinite; }
          .lv-blob3 { animation: lvFloatA 6s ease-in-out infinite 1s; }
        `}</style>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="lv-blob1 absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="lv-blob2 absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-cyan-300/8 blur-3xl" />
          <div className="lv-blob3 absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-sky-200/5 blur-3xl" />
          <div className="absolute inset-0" style={{ opacity: 0.25 }}><HeroParticles /></div>
        </div>

        <div className="lv-hero-inner relative mx-auto max-w-7xl px-4 md:px-8" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="lv-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'center' }}>

            {/* Left: text */}
            <div>
              <style>{`
                @keyframes lvGlowPulse {
                  0%, 100% { filter: drop-shadow(0 0 6px rgba(6,148,209,0.25)); }
                  50%      { filter: drop-shadow(0 0 14px rgba(6,148,209,0.45)); }
                }
                .lv-glow-text { animation: lvGlowPulse 4s ease-in-out infinite; }
              `}</style>
              <h1 className="lv-glow-text font-bold leading-tight mb-1"
                style={{ fontSize: 36, background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                LearNova
              </h1>
              <p className="lv-glow-text font-semibold mb-1"
                style={{ fontSize: 28, background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animationDelay: '0.3s' }}>
                Enterprise LMS from Koenig
              </p>
              <p className="font-semibold mb-3" style={{ fontSize: 18, color: '#0694D1' }}>
                When Learning Learns You
              </p>
              <p className="text-sm sm:text-base mb-6" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, maxWidth: 560 }}>
                In a world of rigid training portals and one-size-fits-all courses, Koenig redefines learning. LearNova doesn&apos;t just deliver content — it evolves with your people.
              </p>

              <div className="lv-hero-btns flex flex-wrap gap-3">
                <a href="#request" className="lv-hero-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: '#fff', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 0 24px rgba(6,148,209,0.45)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  Request More Information
                </a>
              </div>
            </div>

            {/* Right: trust card */}
            <div className="lv-hero-img" style={{ background: 'rgba(6,20,34,0.82)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: 16, padding: '28px 24px', border: '1px solid rgba(6,148,209,0.30)', borderLeft: '4px solid #0694D1', boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(6,148,209,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#38bdf8" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1.3, margin: 0 }}>Adaptive by Design</h3>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 20px' }}>
                AI-driven learning paths study preferences, speed, and performance to create <span style={{ color: '#38bdf8', fontWeight: 600 }}>adaptive learning maps</span> that change in real time — like a GPS for skills.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {STATS.map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 10, padding: '12px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#38bdf8' }}>{s.value}</div>
                    <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 1023px) {
              .lv-hero-grid { grid-template-columns: 1fr !important; }
            }
            @media (max-width: 767px) {
              .lv-hero-inner { padding-top: 20px !important; padding-bottom: 20px !important; }
              .lv-hero-grid { gap: 18px !important; }
              .lv-hero-btns { flex-direction: column !important; }
              .lv-hero-btn { display: flex !important; width: 100%; justify-content: center; }
            }
          `}</style>
        </div>
      </section>

      {/* ── WHAT MAKES IT DIFFERENT ──────────────────────────────── */}
      <section className="lv-section" style={{ background: '#f8fcff', padding: '48px 24px' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center" style={{ marginBottom: 15 }}>
            <h2 className="font-bold text-[20px] sm:text-[32px]" style={{ color: '#0d1b2a' }}>
              What Makes It <span style={{ background: 'linear-gradient(135deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Different</span>
            </h2>
          </div>

          {/* Mobile: 2-per-slide slider */}
          <div className="block sm:hidden">
            <div
              onTouchStart={e => { featTouchX.current = e.touches[0].clientX }}
              onTouchEnd={e => {
                const diff = featTouchX.current - e.changedTouches[0].clientX
                if (diff > 50 && featPage < featTotalPages - 1) setFeatPage(p => p + 1)
                if (diff < -50 && featPage > 0) setFeatPage(p => p - 1)
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FEATURES.slice(featPage * 2, featPage * 2 + 2).map((f, i) => (
                <div key={i} className="lv-feat-card rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #8FCBEF', boxShadow: '0 6px 20px rgba(6,148,209,0.18)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                    <div className="lv-feat-icon" style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(6,148,209,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1">{f.icon}</svg>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0694D1', lineHeight: 1.3, margin: 0 }}>{f.title}</h3>
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#4a6580', margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
              <button onClick={() => setFeatPage(p => Math.max(0, p - 1))}
                style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(6,148,209,0.4)', background: 'rgba(6,148,209,0.08)', cursor: featPage === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: featPage === 0 ? 0.35 : 1, transition: 'opacity 0.2s' }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button onClick={() => setFeatPage(p => Math.min(featTotalPages - 1, p + 1))}
                style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(6,148,209,0.4)', background: 'rgba(6,148,209,0.08)', cursor: featPage === featTotalPages - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: featPage === featTotalPages - 1 ? 0.35 : 1, transition: 'opacity 0.2s' }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="lv-feat-card rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #8FCBEF', boxShadow: '0 6px 20px rgba(6,148,209,0.18)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                  <div className="lv-feat-icon" style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(6,148,209,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1">{f.icon}</svg>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0694D1', lineHeight: 1.3, margin: 0 }}>{f.title}</h3>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: '#4a6580', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <style>{`
            .lv-feat-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
            .lv-feat-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(6,148,209,0.15) !important; }
            .lv-feat-icon { transition: transform 0.25s ease; }
            .lv-feat-card:hover .lv-feat-icon { transform: scale(1.12); }
          `}</style>
        </div>
      </section>

      {/* ── WHY ENTERPRISES CHOOSE KOENIG ────────────────────────── */}
      <section className="lv-section lv-why-section" style={{ background: 'linear-gradient(90deg,#eef8fd 0%,#dbeffa 40%,#a8d8f0 75%,#6ec1e8 100%)', padding: '56px 24px', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          @media (max-width: 640px) {
            .lv-why-section { background: linear-gradient(180deg,#eef8fd 0%,#dbeffa 35%,#a8d8f0 70%,#6ec1e8 100%) !important; }
          }
        `}</style>
        <div className="pointer-events-none hidden lg:block" style={{ position: 'absolute', top: 36, right: '6%', width: 130, height: 170, borderRadius: 20, border: '1px solid rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(2px)', transform: 'rotate(4deg)' }} />
        <div className="pointer-events-none hidden lg:block" style={{ position: 'absolute', bottom: 24, right: '16%', width: 90, height: 120, borderRadius: 16, border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(2px)', transform: 'rotate(-3deg)' }} />
        <div className="mx-auto max-w-7xl text-center" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="font-bold text-[20px] sm:text-[32px]" style={{ color: '#0d1b2a', marginBottom: 15 }}>
            Why Enterprises Choose <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Koenig</span>
          </h2>
          <p className="text-sm sm:text-base mb-2" style={{ color: '#1e3a52' }}>Because every learner is different. And flexibility is the future of learning.</p>
          <p className="text-sm sm:text-base mb-[15px] sm:mb-10" style={{ color: '#4a6580' }}>Koenig&apos;s LMS turns that philosophy into a platform — one that listens, learns, and adapts.</p>

          {/* Mobile: all 3 stats in a single card */}
          <div className="sm:hidden rounded-2xl overflow-hidden" style={{ maxWidth: 420, margin: '0 auto', background: '#fff', border: '1px solid rgba(6,148,209,0.25)', boxShadow: '0 4px 20px rgba(6,148,209,0.12)' }}>
            {STATS.map((s, i) => (
              <div key={i} className="py-6 px-6 text-center" style={i < STATS.length - 1 ? { borderBottom: '1px solid #CAEFFF' } : undefined}>
                <div className="text-2xl font-extrabold" style={{ color: '#0694D1' }}>{s.value}</div>
                <div className="text-sm mt-1" style={{ color: '#4a6580' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Desktop: 3 separate cards */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-5" style={{ maxWidth: 760, margin: '0 auto' }}>
            {STATS.map((s, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid rgba(6,148,209,0.25)', boxShadow: '0 4px 20px rgba(6,148,209,0.12)' }}>
                <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#0694D1' }}>{s.value}</div>
                <div className="text-sm mt-1" style={{ color: '#4a6580' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUEST INFO FORM ────────────────────────────────────── */}
      <section id="request" className="lv-section" style={{ background: 'linear-gradient(160deg, #07111e 0%, #0a1828 100%)', padding: '48px 24px' }}>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl px-6 sm:px-10 py-8 sm:py-9"
            style={{ background: 'linear-gradient(160deg, #091828 0%, #0c1f34 100%)', border: '1px solid rgba(6,148,209,0.25)', boxShadow: '0 0 0 1px rgba(6,148,209,0.08), 0 24px 60px rgba(0,0,0,0.5)' }}>
            <div className="flex justify-center mb-4">
              <span className="rounded-full px-4 py-1 text-xs font-bold tracking-widest" style={{ border: '1px solid rgba(6,148,209,0.55)', color: '#38bdf8' }}>LET&apos;S TALK</span>
            </div>
            <h2 className="text-center font-bold text-white text-[20px] sm:text-[32px]" style={{ marginBottom: 15 }}>Enterprise LMS from <span style={{ color: '#38bdf8' }}>Koenig</span></h2>
            <p className="text-center text-sm mb-8" style={{ color: 'rgba(255,255,255,0.42)' }}>Request more information about LearNova</p>
            <InquiryForm formType={formType} setFormType={setFormType} />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .lv-section { padding-left: 16px !important; padding-right: 16px !important; padding-top: 20px !important; padding-bottom: 20px !important; }
        }
      `}</style>
    </div>
  )
}

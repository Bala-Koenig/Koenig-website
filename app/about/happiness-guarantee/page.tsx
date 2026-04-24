'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

/* ── Testimonial data ───────────────────────────────────────── */
const TESTIMONIALS = [
  { quote: 'I went from IT support to Cloud Architect in 6 months. The 1-on-1 format was a game-changer — my instructor built every session around my specific gaps, not a generic syllabus.', extra: 'The structured 1-on-1 curriculum meant every session built directly on the last. My instructor had real Azure enterprise deployments behind him — not just exam coaching. I passed the Solutions Architect exam with 890/1000.', showMore: true, name: 'Ravi Mehta', location: '🇮🇳 India', course: 'Azure Solutions Architect Expert', date: '18th Feb 2026', initials: 'RM', avatarBg: 'linear-gradient(135deg,#076D9D,#4DBFEF)' },
  { quote: 'The guaranteed schedule gave me the confidence to hand in my notice and make the career change. My instructor had real enterprise experience — not just textbook knowledge.', name: "James O'Brien", location: '🇬🇧 United Kingdom', course: 'CompTIA Security+ SY0-701', date: '17th Feb 2026', initials: 'JO', avatarBg: 'linear-gradient(135deg,#093148,#076D9D)' },
  { quote: "Koenig's FMAT format let me complete CCNP in under 2 weeks. Same quality, same dedication — just compressed for my timeline. My employer was shocked.", name: 'Farah Zahir', location: '🇦🇪 UAE', course: 'CCNP Enterprise Core (ENCOR)', date: '16th Feb 2026', initials: 'FZ', avatarBg: 'linear-gradient(135deg,#F47920,#f6a05c)' },
  { quote: 'Rahul was an excellent trainer. His deep knowledge of the subject and patient teaching style made complex topics easy to understand.', extra: 'Rahul covered every Microsoft Identity scenario in depth — Conditional Access, PIM, and Defender integration. The labs mirrored real enterprise setups. I passed SC-300 first attempt with high confidence.', showMore: true, name: 'Elena Mancini', location: '🇮🇹 Italy', course: 'SC-300 Microsoft Identity', date: '18th Feb 2026', initials: 'EM', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)' },
  { quote: 'Fantastic course, great instructor. The PMP prep was thorough and the practice exams were spot on. Passed first attempt!', name: 'Jackson Tate', location: '🇺🇸 USA', course: 'PMP Certification', date: '11th Feb 2026', initials: 'JT', avatarBg: 'linear-gradient(135deg,#093148,#F47920)' },
  { quote: 'The AWS course exceeded all expectations. The instructor had real-world cloud experience and the hands-on labs were invaluable. I landed a senior cloud role within a month of certifying.', name: 'Priya Sharma', location: '🇸🇬 Singapore', course: 'AWS Solutions Architect – Associate', date: '5th Feb 2026', initials: 'PS', avatarBg: 'linear-gradient(135deg,#F47920,#076D9D)' },
  { quote: 'Koenig made the impossible possible. I completed my CISSP in 3 weeks with their intensive 1-on-1 training. The instructor adapted the pace perfectly to my background.', extra: 'The intensive 1-on-1 format let me cover 3 weeks of CISSP content in the time I had available. My instructor focused on my weak domains identified in a pre-assessment. All 10 domains felt manageable by exam day.', showMore: true, name: 'Ahmed Al-Rashid', location: '🇦🇪 UAE', course: 'CISSP Certification', date: '2nd Feb 2026', initials: 'AA', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)' },
  { quote: 'Best training investment I have ever made. The DevOps course was hands-on from day one. Our entire team is now deploying to Kubernetes confidently.', name: 'Sophie Laurent', location: '🇫🇷 France', course: 'Certified Kubernetes Administrator', date: '28th Jan 2026', initials: 'SL', avatarBg: 'linear-gradient(135deg,#093148,#0694d1)' },
  { quote: 'The Google Cloud course gave me exactly what I needed to transition from on-prem to cloud. Real labs, real scenarios, and a trainer who genuinely cared about my success.', name: 'Carlos Mendez', location: '🇲🇽 Mexico', course: 'Google Cloud Professional Architect', date: '20th Jan 2026', initials: 'CM', avatarBg: 'linear-gradient(135deg,#4285F4,#0694d1)' },
]

function TestimonialCard({ t, onExpandChange }: { t: typeof TESTIMONIALS[0]; onExpandChange?: (e: boolean) => void }) {
  const [expanded, setExpanded] = useState(false)
  const extra = (t as { extra?: string }).extra
  const showMore = (t as { showMore?: boolean }).showMore
  return (
    <div className="kglass-dark flex flex-col overflow-hidden rounded-2xl h-full">
      <div className="flex-1 p-5">
        <div className="mb-2 text-xs text-yellow-400">★★★★★</div>
        <p className="mb-3 text-sm leading-relaxed text-white/75">{t.quote}</p>
        <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: expanded ? '200px' : '0px', opacity: expanded ? 1 : 0 }}>
          <p className="mb-3 text-xs leading-relaxed text-white/50">{extra}</p>
        </div>
        {showMore && (
          <button onClick={() => { const n = !expanded; setExpanded(n); onExpandChange?.(n) }}
            className="mb-4 w-fit rounded-full border px-3 py-1 text-xs font-semibold text-[#38bdf8] transition-all hover:bg-[#38bdf8] hover:text-[#06111E]"
            style={{ borderColor: 'rgba(56,189,248,0.4)' }}>
            {expanded ? 'Show Less ↑' : 'Show More ↓'}
          </button>
        )}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: t.avatarBg, border: '2px solid rgba(56,189,248,0.25)' }}>{t.initials}</div>
          <div>
            <p className="text-sm font-bold text-white">{t.name}</p>
            <p className="text-xs font-semibold text-[#38bdf8]">{t.location}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: 'rgba(56,189,248,0.12)', background: 'rgba(6,148,209,0.07)' }}>
        <div>
          <p className="text-xs font-bold text-white/80">{t.course}</p>
          <p className="mt-0.5 text-xs text-white/35">{t.date}</p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-xs font-bold text-[#38bdf8]" style={{ background: 'rgba(56,189,248,0.12)' }}>✓ Verified</span>
      </div>
    </div>
  )
}

function MobileMarquee({ items }: { items: typeof TESTIMONIALS }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const paused = useRef(false)
  const expandedCount = useRef(0)
  useEffect(() => {
    const inner = trackRef.current
    if (!inner) return
    let prev = performance.now(); let raf: number
    const tick = (now: number) => {
      const dt = now - prev; prev = now
      if (!paused.current && inner) {
        pos.current += 0.04 * dt
        const half = inner.scrollWidth / 2
        if (half > 0 && pos.current >= half) pos.current -= half
        inner.style.transform = `translateX(-${pos.current}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div className="sm:hidden overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
      onTouchStart={e => { paused.current = true }}
      onTouchEnd={() => { if (expandedCount.current === 0) paused.current = false }}>
      <div ref={trackRef} className="flex items-stretch gap-4 py-2" style={{ width: 'max-content' }}>
        {[...items, ...items].map((t, i) => (
          <div key={i} style={{ width: '280px', flexShrink: 0 }}>
            <TestimonialCard t={t} onExpandChange={exp => { expandedCount.current += exp ? 1 : -1; if (expandedCount.current < 0) expandedCount.current = 0; paused.current = expandedCount.current > 0 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ScrollColumn({ items, speed }: { items: typeof TESTIMONIALS; speed: number }) {
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const paused = useRef(false)
  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return
    let prev = performance.now(); let raf: number
    const tick = (now: number) => {
      const dt = now - prev; prev = now
      if (!paused.current && inner) {
        pos.current += speed * dt
        const half = inner.scrollHeight / 2
        if (half > 0 && pos.current >= half) pos.current -= half
        inner.style.transform = `translateY(-${pos.current}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [speed])
  return (
    <div style={{ height: '520px', overflow: 'hidden' }} onMouseEnter={() => { paused.current = true }} onMouseLeave={() => { paused.current = false }}>
      <div ref={innerRef} className="flex flex-col gap-4 pb-4">
        {[...items, ...items].map((t, i) => <TestimonialCard key={i} t={t} />)}
      </div>
    </div>
  )
}

export default function HappinessGuaranteePage() {
  const [tab, setTab] = useState<'why' | 'feedback'>('why')
  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />
      <AboutSubNav />

      {/* ── BANNER — dark + blue glow ── */}
      <section className="relative bg-[#06111E] overflow-hidden py-10 sm:py-[50px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#0694D1] opacity-[0.10] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.07] blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#0694D1] opacity-[0.04] blur-[80px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="kglass-banner py-8 px-5 sm:py-10 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6">
                  Learn with <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Confidence:</span> Koenig Solutions' Happiness Guarantee
                </h1>
                <p className="text-sm sm:text-lg text-white/70 leading-relaxed">
                  Happiness is achieved when expectations are met. We set clear expectations and then we exceed them — every single time.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/happinessGuranty.webp"
                  alt="Happiness Guaranteed"
                  className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 0 40px rgba(6,148,209,0.4))', animation: 'iconFloat 4s ease-in-out infinite' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS THE HAPPINESS GUARANTEE — sky-blue gradient + glow ── */}
      <section className="relative overflow-hidden py-10 sm:py-[50px]"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #ddf1fb 35%, #ffffff 65%, #c8eaf8 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full opacity-40 blur-[90px]" style={{ background: 'radial-gradient(circle, #BAE6FD, transparent 70%)' }} />
          <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full opacity-30 blur-[80px]" style={{ background: 'radial-gradient(circle, #7DD3FA, transparent 70%)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-8 sm:mb-12 text-center">
            What is the <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Happiness Guarantee?</span>
          </h2>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
            {/* HG image */}
            <div className="w-full lg:w-[42%] rounded-2xl overflow-hidden shrink-0 shadow-xl" style={{ minHeight: '280px', boxShadow: '0 8px 40px rgba(6,148,209,0.15)' }}>
              <img
                src="/images/HG.png"
                alt="Koenig Happiness Guarantee"
                className="w-full h-full object-cover"
                style={{ minHeight: '280px' }}
              />
            </div>
            {/* Points */}
            <div className="flex-1 flex flex-col gap-4 justify-center">
              {[
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                  text: <>At Koenig Solutions, your happiness is our top priority. That's why we offer our comprehensive <strong>Happiness Guarantee.</strong></>,
                },
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
                  text: <>We understand that "happiness" can be subjective. However, we believe happiness is achieved when expectations are met. This guarantee ensures you receive the high-quality training and service you deserve.</>,
                },
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
                  text: <>If, for any reason, you're not satisfied with your Koenig Solutions training experience, we promise to make it right.</>,
                },
              ].map((item, i) => (
                <div key={i} className="kglass-light flex gap-4 items-start rounded-2xl p-4 sm:p-5">
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-lg"
                    style={{
                      background: 'rgba(6,148,209,0.1)',
                      border: '1px solid rgba(6,148,209,0.2)',
                      animation: `iconPop 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.35}s both, iconFloat 3s ease-in-out ${i * 0.35 + 0.7}s infinite`,
                    }}>
                    {React.cloneElement(item.icon as React.ReactElement, {
                      style: { strokeDasharray: 300, strokeDashoffset: 300, animation: `strokeDraw 1.2s ease ${i * 0.35 + 0.1}s both` },
                    })}
                  </div>
                  <p className="text-[#334155] text-sm sm:text-base leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW DOES IT WORK — dark navy + glow ── */}
      <section className="relative py-10 sm:py-[50px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #06111E 0%, #071f38 50%, #06111E 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-0 w-[450px] h-[450px] rounded-full bg-[#0694D1] opacity-[0.06] blur-[110px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.05] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 text-center">
            How Does it <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Work?</span>
          </h2>
          <p className="text-center text-white/50 text-sm sm:text-base mb-8 sm:mb-12 max-w-2xl mx-auto">
            To ensure a successful learning experience, we ask for your feedback multiple times. If you encounter any issues or feel your expectations are not being met, simply inform your trainer or contact our customer support team.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/></svg>,
                title: 'Resolution Options',
                desc: "We're committed to resolving any issues you may encounter during your training. In such cases, we will assess the situation and implement one of two solutions:",
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                title: 'Full Refund',
                desc: 'We will provide a full refund for the course fee (excluding courseware and exam vouchers costs, if applicable)',
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
                title: 'Class Redo',
                desc: 'You can re-enroll in the same course free of charge at a future date (subject to availability)',
              },
            ].map((card, i) => (
              <div key={card.title} className="kglass-dark rounded-2xl p-6 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(56,189,248,0.1)',
                    border: '1px solid rgba(56,189,248,0.2)',
                    boxShadow: '0 0 20px rgba(56,189,248,0.15)',
                    animation: `iconPop 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.3}s both, iconFloat 2.8s ease-in-out ${i * 0.3 + 0.7}s infinite`,
                  }}>
                  {React.cloneElement(card.icon as React.ReactElement, {
                    style: { strokeDasharray: 300, strokeDashoffset: 300, animation: `strokeDraw 1.3s ease ${i * 0.3 + 0.1}s both` },
                  })}
                </div>
                <h3 className="font-bold text-[#38bdf8] text-base sm:text-lg">{card.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CEO MESSAGE — sky-blue gradient + glassmorphism ── */}
      <section className="relative overflow-hidden py-10 sm:py-[50px]"
        style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #ddf1fb 40%, #f0f9ff 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-40 blur-[90px]" style={{ background: 'radial-gradient(circle, #BAE6FD, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full opacity-30 blur-[80px]" style={{ background: 'radial-gradient(circle, #7DD3FA, transparent 70%)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-8 sm:mb-12 text-center">
            A Message from <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Our CEO</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="kglass-light rounded-3xl overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(6,148,209,0.12)' }}>

              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #0694D1, #38bdf8, #0694D1)' }} />

              <div className="p-6 sm:p-8 lg:p-10">
                {/* Profile row */}
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-center sm:items-start mb-6 sm:mb-8">
                  <div className="shrink-0">
                    <img
                      src="/images/leadership/CEO.png"
                      alt="Rohit Aggarwal — Founder & CEO"
                      className="w-28 h-36 sm:w-32 sm:h-40 object-cover rounded-2xl"
                      style={{ boxShadow: '0 8px 32px rgba(6,148,209,0.22)', border: '2px solid rgba(6,148,209,0.3)' }}
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-lg sm:text-xl font-bold text-[#0F172A] mb-1">Dear Kustomer,</p>
                    <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
                      We take immense pride in delivering exceptional training experiences that meet your needs and equip you with the skills you need to succeed. We meticulously design our courses and ensure the services we promise are fully delivered.
                    </p>
                  </div>
                </div>

                {/* Highlighted key message */}
                <div className="rounded-2xl px-5 py-4 mb-6 flex items-center gap-3"
                  style={{ background: 'linear-gradient(135deg, rgba(6,148,209,0.1), rgba(56,189,248,0.08))', border: '1px solid rgba(6,148,209,0.2)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <p className="text-sm sm:text-base font-semibold text-[#0F172A]">
                    In short — <span className="text-[#0694D1]">your happiness is our priority.</span>
                  </p>
                </div>

                {/* Body paragraphs with left accent */}
                <div className="flex flex-col gap-4 mb-6">
                  {[
                    {
                      gradient: 'linear-gradient(180deg, #0694D1, #38bdf8)',
                      delay: '0s',
                      content: <>However, we understand that sometimes things may not go as planned. If, for any reason, you're not satisfied with your Koenig experience and haven't found a resolution through our standard channels, please contact me directly at{' '}<a href="mailto:rohit.a@koenig-solutions.com" className="text-[#0694D1] hover:underline font-medium">rohit.a@koenig-solutions.com</a>.</>,
                    },
                    {
                      gradient: 'linear-gradient(180deg, #38bdf8, #0694D1)',
                      delay: '0.15s',
                      content: <>As CEO, it's my ultimate responsibility to ensure your satisfaction. I'm committed to personally addressing any concerns you may have and working towards a fair resolution.</>,
                    },
                    {
                      gradient: 'linear-gradient(180deg, #0694D1, #38bdf8)',
                      delay: '0.3s',
                      content: <>Enjoy your learning journey at Koenig Solutions. I am confident you'll gain valuable knowledge and skills.</>,
                    },
                  ].map((row, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-[3px] shrink-0 rounded-full self-stretch"
                        style={{
                          background: row.gradient,
                          transformOrigin: 'top',
                          animation: `lineGrow 0.6s cubic-bezier(0.22,1,0.36,1) ${row.delay} both`,
                        }} />
                      <p className="text-[#475569] text-sm sm:text-base leading-relaxed">{row.content}</p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px mb-5" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,148,209,0.25), transparent)' }} />

                {/* Signature row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-[#64748B] text-xs sm:text-sm mb-0.5">With kind regards,</p>
                    <p className="text-[#0F172A] font-bold text-base sm:text-lg">Rohit Aggarwal</p>
                    <p className="text-[#0694D1] text-xs sm:text-sm font-medium">Founder &amp; CEO, Koenig Solutions</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#0694D1]"
                    style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.18)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    rohit.a@koenig-solutions.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA — mild blue bg ── */}
      <section className="relative py-10 sm:py-14 overflow-hidden" style={{ background: 'linear-gradient(135deg, #c8e6f5 0%, #ddf1fb 40%, #b8dff0 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-[#0694D1] opacity-[0.12] blur-[80px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-[#38bdf8] opacity-[0.10] blur-[70px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="relative rounded-2xl py-8 sm:py-10 px-6 sm:px-12 overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-5"
            style={{ background: '#ffffff', border: '1.5px solid rgba(6,148,209,0.25)', boxShadow: '0 4px 32px rgba(6,148,209,0.14), 0 1px 4px rgba(6,148,209,0.08)' }}>

            {/* Decorative background elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              {/* Soft blue gradient sweep on the right */}
              <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #0694D1, transparent 70%)' }} />
              <div className="absolute -right-4 -bottom-8 w-48 h-48 rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)' }} />
              {/* Decorative concentric rings */}
              <svg className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.07]" width="180" height="180" viewBox="0 0 180 180" fill="none">
                <circle cx="90" cy="90" r="40" stroke="#0694D1" strokeWidth="1.5"/>
                <circle cx="90" cy="90" r="60" stroke="#0694D1" strokeWidth="1"/>
                <circle cx="90" cy="90" r="80" stroke="#0694D1" strokeWidth="0.75"/>
              </svg>
              {/* Tiny dot grid top-left */}
              <svg className="absolute left-0 top-0 opacity-[0.06]" width="120" height="80" viewBox="0 0 120 80">
                {Array.from({ length: 5 }).map((_, row) =>
                  Array.from({ length: 8 }).map((_, col) => (
                    <circle key={`${row}-${col}`} cx={col * 16 + 8} cy={row * 16 + 8} r="1.5" fill="#0694D1" />
                  ))
                )}
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-3"
                style={{ background: 'rgba(6,148,209,0.08)', color: '#0694D1', border: '1px solid rgba(6,148,209,0.18)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0694D1] animate-pulse inline-block" />
                Join 1M+ professionals trained
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: '#053148' }}>
                Ready to Get Started?
              </h2>
              <p className="mt-1.5 text-sm text-[#475569]">Happiness Guaranteed — or your money back.</p>
            </div>

            <Link href="/courses"
              className="relative z-10 shrink-0 font-semibold px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base transition-all text-white hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', boxShadow: '0 4px 20px rgba(6,148,209,0.35)' }}>
              Explore Our Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US — dark + kglass-dark cards ── */}
      <section className="relative bg-[#06111E] py-10 sm:py-[50px] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full bg-[#0694D1] opacity-[0.05] blur-[110px]" />
          <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-[#38bdf8] opacity-[0.04] blur-[90px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          {/* Tab buttons */}
          <div className="flex gap-3 mb-8 sm:mb-10">
            <button onClick={() => setTab('why')}
              className="font-semibold px-5 py-2 rounded-full text-sm transition-all"
              style={tab === 'why' ? { background: 'linear-gradient(135deg, #0694D1, #38bdf8)', color: '#fff' } : { border: '1px solid rgba(6,148,209,0.4)', color: '#38bdf8' }}>
              Why Choose Us
            </button>
            <button onClick={() => setTab('feedback')}
              className="font-semibold px-5 py-2 rounded-full text-sm transition-all"
              style={tab === 'feedback' ? { background: 'linear-gradient(135deg, #0694D1, #38bdf8)', color: '#fff' } : { border: '1px solid rgba(6,148,209,0.4)', color: '#38bdf8' }}>
              Student Feedback
            </button>
          </div>

          {/* Why Choose Us cards */}
          {tab === 'why' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>, title: 'Happiness Guarantee', desc: "We're so confident in the quality of our training that we offer a comprehensive Happiness Guarantee" },
                { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, title: 'Unparalleled Course Selection', desc: 'Explore over 5,000 courses across diverse industries and skill sets to find the perfect fit for your learning goals' },
                { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>, title: 'Expert Instructors', desc: 'Learn from industry veterans with real-world experience' },
                { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, title: 'Flexible Learning Options', desc: 'Choose from online, classroom, or blended learning formats to suit your schedule' },
              ].map((p, i) => (
                <div key={p.title} className="kglass-dark rounded-2xl p-5 sm:p-6 flex flex-col gap-3" style={{ borderTop: '2px solid rgba(56,189,248,0.3)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', boxShadow: '0 0 16px rgba(56,189,248,0.12)', animation: `iconPop 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.2}s both, iconFloat 3s ease-in-out ${i * 0.2 + 0.7}s infinite` }}>
                    {React.cloneElement(p.icon as React.ReactElement, { style: { strokeDasharray: 300, strokeDashoffset: 300, animation: `strokeDraw 1.2s ease ${i * 0.2 + 0.1}s both` } })}
                  </div>
                  <h3 className="font-bold text-[#38bdf8] text-sm sm:text-base leading-snug">{p.title}</h3>
                  <p className="text-white/55 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Student Feedback — inline testimonials */}
          {tab === 'feedback' && (
            <div>
              {/* Stats bar */}
              <div className="kglass-dark mx-auto mb-8 max-w-3xl rounded-2xl px-4 py-4 sm:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: 'rgba(56,189,248,0.06)' }}>
                  {[
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, val: '18,400+', label: 'Verified Reviews' },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, val: '4.9 / 5', label: 'Average Rating' },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, val: '95%', label: 'Would Recommend' },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, val: '1M+', label: 'Professionals Trained' },
                  ].map((s, i, arr) => (
                    <div key={s.label} className="px-3 py-3 text-center" style={{ borderRight: i < arr.length - 1 ? '1px solid rgba(56,189,248,0.12)' : 'none' }}>
                      <div className="mb-1 flex justify-center">{s.icon}</div>
                      <div className="text-base sm:text-xl font-bold text-white">{s.val}</div>
                      <div className="text-xs text-white/45 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile marquee */}
              <MobileMarquee items={TESTIMONIALS} />

              {/* Desktop 3-col scroll */}
              <div className="hidden sm:block relative overflow-hidden"
                style={{ height: '520px', maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
                <div className="grid grid-cols-3 gap-4 h-full">
                  <ScrollColumn items={TESTIMONIALS.slice(0, 3)} speed={0.030} />
                  <ScrollColumn items={TESTIMONIALS.slice(3, 6)} speed={0.025} />
                  <ScrollColumn items={TESTIMONIALS.slice(6, 9)} speed={0.038} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

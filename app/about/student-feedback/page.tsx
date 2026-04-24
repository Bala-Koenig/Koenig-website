'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

/* ── Testimonials data (matches homepage format) ─────────────── */
const TESTIMONIALS = [
  { quote: 'I went from IT support to Cloud Architect in 6 months. The 1-on-1 format was a game-changer — my instructor built every session around my specific gaps, not a generic syllabus.', extra: 'The structured 1-on-1 curriculum meant every session built directly on the last. My instructor had real Azure enterprise deployments behind him — not just exam coaching. I passed the Solutions Architect exam with 890/1000.', showMore: true, name: 'Ravi Mehta', location: '🇮🇳 India', course: 'Azure Solutions Architect Expert', date: '18th Feb 2026', initials: 'RM', avatarBg: 'linear-gradient(135deg,#076D9D,#4DBFEF)', ringColor: '#4F8EF7' },
  { quote: 'The guaranteed schedule gave me the confidence to hand in my notice and make the career change. My instructor had real enterprise experience — not just textbook knowledge.', name: "James O'Brien", location: '🇬🇧 United Kingdom', course: 'CompTIA Security+ SY0-701', date: '17th Feb 2026', initials: 'JO', avatarBg: 'linear-gradient(135deg,#093148,#076D9D)', ringColor: '#F59E0B' },
  { quote: "Koenig's FMAT format let me complete CCNP in under 2 weeks. Same quality, same dedication — just compressed for my timeline. My employer was shocked.", name: 'Farah Zahir', location: '🇦🇪 UAE', course: 'CCNP Enterprise Core (ENCOR)', date: '16th Feb 2026', initials: 'FZ', avatarBg: 'linear-gradient(135deg,#F47920,#f6a05c)', ringColor: '#EC4899' },
  { quote: 'Rahul was an excellent trainer. His deep knowledge of the subject and patient teaching style made complex topics easy to understand.', extra: 'Rahul covered every Microsoft Identity scenario in depth — Conditional Access, PIM, and Defender integration. The labs mirrored real enterprise setups. I passed SC-300 first attempt with high confidence.', showMore: true, name: 'Elena Mancini', location: '🇮🇹 Italy', course: 'SC-300 Microsoft Identity', date: '18th Feb 2026', initials: 'EM', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)', ringColor: '#8B5CF6' },
  { quote: 'Fantastic course, great instructor. The PMP prep was thorough and the practice exams were spot on. Passed first attempt!', name: 'Jackson Tate', location: '🇺🇸 USA', course: 'PMP Certification', date: '11th Feb 2026', initials: 'JT', avatarBg: 'linear-gradient(135deg,#093148,#F47920)', ringColor: '#10B981' },
  { quote: 'The AWS course exceeded all expectations. The instructor had real-world cloud experience and the hands-on labs were invaluable. I landed a senior cloud role within a month of certifying.', name: 'Priya Sharma', location: '🇸🇬 Singapore', course: 'AWS Solutions Architect – Associate', date: '5th Feb 2026', initials: 'PS', avatarBg: 'linear-gradient(135deg,#F47920,#076D9D)', ringColor: '#F59E0B' },
  { quote: 'Koenig made the impossible possible. I completed my CISSP in 3 weeks with their intensive 1-on-1 training. The instructor adapted the pace perfectly to my background.', extra: 'The intensive 1-on-1 format let me cover 3 weeks of CISSP content in the time I had available. My instructor focused on my weak domains identified in a pre-assessment. All 10 domains felt manageable by exam day.', showMore: true, name: 'Ahmed Al-Rashid', location: '🇦🇪 UAE', course: 'CISSP Certification', date: '2nd Feb 2026', initials: 'AA', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)', ringColor: '#06B6D4' },
  { quote: 'Best training investment I have ever made. The DevOps course was hands-on from day one. Our entire team is now deploying to Kubernetes confidently.', name: 'Sophie Laurent', location: '🇫🇷 France', course: 'Certified Kubernetes Administrator', date: '28th Jan 2026', initials: 'SL', avatarBg: 'linear-gradient(135deg,#093148,#0694d1)', ringColor: '#8B5CF6' },
  { quote: 'The Google Cloud course gave me exactly what I needed to transition from on-prem to cloud. Real labs, real scenarios, and a trainer who genuinely cared about my success.', name: 'Carlos Mendez', location: '🇲🇽 Mexico', course: 'Google Cloud Professional Architect', date: '20th Jan 2026', initials: 'CM', avatarBg: 'linear-gradient(135deg,#4285F4,#0694d1)', ringColor: '#10B981' },
]

/* ── Card (dark mode) ─────────────────────────────────────────── */
function HomeTestimonialCard({ t, onExpandChange }: { t: typeof TESTIMONIALS[0]; onExpandChange?: (e: boolean) => void }) {
  const [expanded, setExpanded] = useState(false)
  const extra = (t as { extra?: string }).extra
  const showMore = (t as { showMore?: boolean }).showMore
  const handleToggle = () => {
    const next = !expanded
    setExpanded(next)
    onExpandChange?.(next)
  }
  return (
    <div className="kglass-dark flex flex-col overflow-hidden rounded-2xl h-full">
      <div className="flex-1 p-5">
        <div className="mb-2 text-xs text-yellow-400">★★★★★</div>
        <p className="mb-3 text-sm leading-relaxed text-white/75">{t.quote}</p>
        <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: expanded ? '200px' : '0px', opacity: expanded ? 1 : 0 }}>
          <p className="mb-3 text-xs leading-relaxed text-white/50">{extra}</p>
        </div>
        {showMore && (
          <button onClick={handleToggle} className="mb-4 w-fit rounded-full border px-3 py-1 text-xs font-semibold text-[#38bdf8] transition-all hover:bg-[#38bdf8] hover:text-[#06111E]" style={{ borderColor: 'rgba(56,189,248,0.4)' }}>
            {expanded ? 'Show Less ↑' : 'Show More ↓'}
          </button>
        )}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: t.avatarBg, border: '2px solid rgba(56,189,248,0.25)' }}>
            {t.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight text-white">{t.name}</p>
            <p className="text-xs font-semibold text-[#38bdf8]">{t.location}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: 'rgba(56,189,248,0.12)', background: 'rgba(6,148,209,0.07)' }}>
        <div>
          <p className="text-xs font-bold text-white/80">{t.course}</p>
          <p className="mt-0.5 text-xs text-white/35">{t.date}</p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8' }}>✓ Verified</span>
      </div>
    </div>
  )
}

/* ── Mobile horizontal marquee ───────────────────────────────── */
function MobileTestimonialMarquee({ items }: { items: typeof TESTIMONIALS }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const paused = useRef(false)
  const expandedCount = useRef(0)
  const dragStartX = useRef(0)
  const dragStartPos = useRef(0)

  useEffect(() => {
    const inner = trackRef.current
    if (!inner) return
    let prev = performance.now()
    let raf: number
    function tick(now: number) {
      const dt = now - prev
      prev = now
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
    <div
      className="sm:hidden overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
      onTouchStart={e => { paused.current = true; dragStartX.current = e.touches[0].clientX; dragStartPos.current = pos.current }}
      onTouchMove={e => {
        const delta = dragStartX.current - e.touches[0].clientX
        const inner = trackRef.current
        if (!inner) return
        const half = inner.scrollWidth / 2
        let newPos = dragStartPos.current + delta
        if (newPos < 0) newPos = 0
        if (half > 0 && newPos >= half) newPos = half - 1
        pos.current = newPos
        inner.style.transform = `translateX(-${pos.current}px)`
      }}
      onTouchEnd={() => { if (expandedCount.current === 0) paused.current = false }}
    >
      <div ref={trackRef} className="flex items-stretch gap-4 py-2" style={{ width: 'max-content' }}>
        {[...items, ...items].map((t, i) => (
          <div key={i} style={{ width: '280px', flexShrink: 0 }}>
            <HomeTestimonialCard t={t} onExpandChange={exp => {
              expandedCount.current += exp ? 1 : -1
              if (expandedCount.current < 0) expandedCount.current = 0
              paused.current = expandedCount.current > 0
            }} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Desktop vertical scroll column ─────────────────────────── */
function HomeScrollColumn({ items, speed }: { items: typeof TESTIMONIALS; speed: number }) {
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const paused = useRef(false)

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return
    let prev = performance.now()
    let raf: number
    function tick(now: number) {
      const dt = now - prev
      prev = now
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
    <div
      style={{ height: '520px', overflow: 'hidden' }}
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
    >
      <div ref={innerRef} className="flex flex-col gap-4 pb-4">
        {[...items, ...items].map((t, i) => <HomeTestimonialCard key={i} t={t} />)}
      </div>
    </div>
  )
}

const VIDEO_COUNTRIES = [
  'Tanzania', 'Oman', 'Saudi Arabia', 'Zambia', 'Iraq', 'Ghana', 'Angola', 'Kenya',
]

export default function StudentFeedbackPage() {
  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />
      <AboutSubNav />

      {/* DARK HERO */}
      <section className="relative bg-[#06111E] overflow-hidden py-[50px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#0694D1] opacity-[0.07] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.05] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="kglass-banner py-10 px-8 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                  Real Learners. <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Real Stories.</span>
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  5 million+ learners upskilled across 195 countries. These are their words — unfiltered, unedited, and from real post-course surveys.
                </p>
              </div>
              <div className="kglass-dark rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/z_6FnQE7-LA"
                    title="Koenig Solutions — Your Trusted IT Training Partner"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stories That Speak for Themselves — dark mode ── */}
      <section className="relative overflow-hidden bg-[#06111E] px-4 md:px-8 lg:px-[50px] py-10 sm:py-[60px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#0694D1] opacity-[0.06] blur-[120px]" />
          <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#38bdf8] opacity-[0.05] blur-[100px]" />
          <div className="absolute -left-20 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#0694D1] opacity-[0.04] blur-[90px]" />
        </div>
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="text-center" style={{ marginBottom: '35px' }}>
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-[#38bdf8]" style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}>Real Transformations</span>
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">Stories That <span className="bg-gradient-to-r from-[#0694d1] to-cyan-400 bg-clip-text text-transparent">Speak for Themselves</span></h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-white/50">Every number is real. Every name is used with permission. These are your peers — people who were exactly where you are and made the leap.</p>
          </div>

          {/* Stats bar — dark glass */}
          <div className="kglass-dark mx-auto mb-10 max-w-3xl rounded-2xl px-6 py-5 sm:px-10">
            <div className="grid grid-cols-2 gap-px sm:flex sm:flex-wrap sm:gap-0 sm:bg-transparent sm:items-center sm:justify-center" style={{ background: 'rgba(56,189,248,0.06)' }}>
              {[
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, val: '18,400+', label: 'Verified Reviews' },
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, val: '4.9 / 5', label: 'Average Rating' },
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, val: '95%', label: 'Would Recommend' },
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, val: '1M+', label: 'Professionals Trained' },
              ].map((s, i, arr) => (
                <div key={s.label} className="px-4 py-4 text-center sm:px-8 sm:py-1 sm:first:pl-0 sm:last:pr-0" style={{ borderRight: i < arr.length - 1 ? '1px solid rgba(56,189,248,0.12)' : 'none' }}>
                  <div className="mb-1.5 flex items-center justify-center">{s.icon}</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{s.val}</div>
                  <div className="mt-1 text-sm text-white/45">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: horizontal auto-scroll marquee */}
          <MobileTestimonialMarquee items={TESTIMONIALS} />

          {/* Desktop: 3-column auto-scroll */}
          <div
            className="hidden sm:block relative overflow-hidden"
            style={{
              height: '560px',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <div className="grid grid-cols-3 gap-4 h-full">
              <HomeScrollColumn items={TESTIMONIALS.slice(0, 3)} speed={0.030} />
              <HomeScrollColumn items={TESTIMONIALS.slice(3, 6)} speed={0.025} />
              <HomeScrollColumn items={TESTIMONIALS.slice(6, 9)} speed={0.038} />
            </div>
          </div>

        </div>
      </section>

      {/* Video testimonials note */}
      <section className="bg-[#F8FAFC] py-[50px]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl mb-5">🎬</div>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Video <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Testimonials</span></h2>
            <p className="text-[#475569] text-lg leading-relaxed mb-6">
              Learners from around the world share their Koenig experience on camera. Our video testimonials come from students in:
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {VIDEO_COUNTRIES.map(c => (
                <span key={c} className="bg-white border border-[#E2E8F0] text-[#0F172A] px-4 py-2 rounded-full text-sm font-medium">{c}</span>
              ))}
            </div>
            <p className="text-[#64748B] text-sm">
              Watch unscripted testimonials on our YouTube channel — genuine stories from real students, no marketing polish.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#06111E] py-[50px] text-center">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Join 5M+ <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Learners</span></h2>
          <p className="text-white/70 mb-8 text-lg">Write your own success story with Koenig.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:sales@koenig-solutions.com" className="inline-block bg-[#0694D1] hover:bg-[#0580bb] text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              Start Learning Today
            </a>
            <Link href="/about/happiness-guarantee" className="inline-block border border-[#0694D1] text-[#38bdf8] hover:bg-[#0694D1] hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              Our Happiness Guarantee
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

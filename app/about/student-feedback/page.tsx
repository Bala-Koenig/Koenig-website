'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

/* ── Testimonials data ─────────────────────────────────────────── */
const TESTIMONIALS = [
  { quote: 'I would rate the trainer\'s ability to deliver the subject as excellent. The trainer explained the concepts clearly, used practical examples, and ensured that the material was easy to understand.', extra: 'The session was engaging and interactive. The trainer made sure every participant understood the concepts before moving on. Highly recommend Koenig for PMP preparation.', showMore: true, name: 'Tails Al-Buseidi', location: 'Trainer', course: 'Project Management Professional (PMP)® Certification Training', date: '17th Feb 2026', initials: 'TA', avatarBg: 'linear-gradient(135deg,#076D9D,#4DBFEF)', ringColor: '#4F8EF7' },
  { quote: '10/10! That was really knowledgeable, and his energetic delivery was a pleasure to listen to!', name: 'Lita Voss', location: 'Student', course: 'AB-730T00: Automating business workflows with generative AI', date: '9th Feb 2026', initials: 'LV', avatarBg: 'linear-gradient(135deg,#093148,#076D9D)', ringColor: '#F59E0B' },
  { quote: "I've being the max,", name: 'Maya Krishnan', location: 'Student', course: 'AB-731T00: Drive AI transformation in your organization', date: '25th Feb 2026', initials: 'MK', avatarBg: 'linear-gradient(135deg,#F47920,#f6a05c)', ringColor: '#EC4899' },
  { quote: 'Excellent.', name: 'Leandra Chiketi', location: 'Student', course: 'DP-300T00-A: Implement Scalable Database Solutions Using Azure SQL', date: '13th Feb 2026', initials: 'LC', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)', ringColor: '#8B5CF6' },
  { quote: 'The trainer demonstrated exceptional ability in delivering the subject matter. He has deep technical knowledge of SQL server performance tuning and was able to break down complex topics with clarity.', extra: 'The hands-on approach to performance tuning was excellent. Every example was practical and directly applicable to real-world scenarios. I now have full confidence in database optimization.', showMore: true, name: 'Harper Caldwell', location: 'Student', course: 'Performance Tuning and Optimizing SQL Databases in 2 days', date: '22nd Feb 2026', initials: 'HC', avatarBg: 'linear-gradient(135deg,#093148,#F47920)', ringColor: '#10B981' },
  { quote: 'I really liked how the trainer broke things down into simple terms that actually made them easy to understand and apply.', name: 'Arjun Mehta', location: 'Student', course: 'Minecraft Email Security', date: '20th Feb 2026', initials: 'AM', avatarBg: 'linear-gradient(135deg,#F47920,#076D9D)', ringColor: '#F59E0B' },
  { quote: 'Koenig made the impossible possible. I completed my CISSP in 3 weeks with their intensive 1-on-1 training. The instructor adapted the pace perfectly to my background.', extra: 'The intensive 1-on-1 format let me cover 3 weeks of CISSP content in the time I had available. My instructor focused on my weak domains identified in a pre-assessment. All 10 domains felt manageable by exam day.', showMore: true, name: 'Ahmed Al-Rashid', location: '🇦🇪 UAE', course: 'CISSP Certification', date: '2nd Feb 2026', initials: 'AA', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)', ringColor: '#06B6D4' },
  { quote: 'Best training investment I have ever made. The DevOps course was hands-on from day one. Our entire team is now deploying to Kubernetes confidently.', name: 'Sophie Laurent', location: '🇫🇷 France', course: 'Certified Kubernetes Administrator', date: '28th Jan 2026', initials: 'SL', avatarBg: 'linear-gradient(135deg,#093148,#0694d1)', ringColor: '#8B5CF6' },
  { quote: 'The Google Cloud course gave me exactly what I needed to transition from on-prem to cloud. Real labs, real scenarios, and a trainer who genuinely cared about my success.', name: 'Carlos Mendez', location: '🇲🇽 Mexico', course: 'Google Cloud Professional Architect', date: '20th Jan 2026', initials: 'CM', avatarBg: 'linear-gradient(135deg,#4285F4,#0694d1)', ringColor: '#10B981' },
]

/* ── Revision class testimonials ─────────────────────────────── */
const REVISION_TESTIMONIALS = [
  { quote: 'Way topics covered are really helpful. Understood the concepts with the examples showed in the training gadgets', name: 'Kiran Kumar G', course: 'AWS Certified Solutions Architect - Associate', date: '10th Oct 2024' },
  { quote: 'Trainer is very committed and is ready to extend effort and hours to meet participants needs. Entire session was smooth and professional and no unwanted disturbances.', name: 'Krishnaprasad Shettigan T', course: 'AWS Certified Solutions Architect', date: '10th Oct 2024' },
  { quote: 'The training is very good. Excellent delivery of content and very good explanations were given to our doubts. However, presentation slides would be better to mark up the list of contents taught and provide a write-up for later reference', name: 'Poornima M', course: 'AWS Certified Solutions Architect', date: '16th Oct 2024' },
]

/* ── Courses list ─────────────────────────────────────────────── */
const COURSES = [
  'AWS Certified Solutions Architect - Associate (Architecting on AWS)',
  'F5 BIG IP LTM',
  'AWS Certified CloudOps Engineer - Associate (Cloud Operations on AWS)',
  'Implementing Cisco Application Centric Infrastructure (DCACI) v1.2',
  'AZ-104v2/v3: Microsoft Azure Administrator',
  'PL-300T00: Design and Manage Analytics Solutions Using Power BI',
  'Fundamentals of Cisco Firewall Threat Defense and Intrusion Prevention (SFWIPP)',
  'Generative AI Specialty',
  'Generative AI Essentials on AWS',
  'MS-N023: Explore Microsoft 365 Copilot Chat',
  'Implementing and Administering Cisco Solutions (CCNA) 2.3',
  'VMware Cloud Foundation: Solution Architecture and Design (V9.0)',
  'VMware Cloud Foundation: Build, Manage and Secure (v5.0)',
  'Technology Architecture L3',
]

/* ── Card ─────────────────────────────────────────────────────── */
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
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white h-full" style={{ border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
      <div className="flex-1 p-5">
        <div className="mb-2 text-xs text-yellow-400">★★★★★</div>
        <p className="mb-3 text-sm leading-relaxed" style={{ color: '#2d4a6a' }}>{t.quote}</p>
        <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: expanded ? '200px' : '0px', opacity: expanded ? 1 : 0 }}>
          <p className="mb-3 text-xs leading-relaxed" style={{ color: '#4a7a9b' }}>{extra}</p>
        </div>
        {showMore && (
          <button onClick={handleToggle} className="mb-4 w-fit rounded-full border px-3 py-1 text-xs font-semibold text-[#0694D1] transition-all hover:bg-[#0694D1] hover:text-white" style={{ borderColor: '#0694D1' }}>
            {expanded ? 'Show Less ↑' : 'Show More ↓'}
          </button>
        )}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: t.avatarBg, border: '2px solid #DCEEFB' }}>
            {t.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight" style={{ color: '#0d1b2a' }}>{t.name}</p>
            <p className="text-xs font-semibold" style={{ color: '#0694D1' }}>{t.location}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: '#E8F4FA', background: '#F8FCFF' }}>
        <div>
          <p className="text-xs font-bold" style={{ color: '#0d1b2a' }}>{t.course}</p>
          <p className="mt-0.5 text-xs" style={{ color: '#999' }}>{t.date}</p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: '#E8F4FA', color: '#0569a8' }}>✓ Verified</span>
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

export default function StudentFeedbackPage() {
  const [activeTab, setActiveTab] = useState<'testimonial' | 'videos'>('testimonial')
  const [revIdx, setRevIdx] = useState(0)

  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />
      <AboutSubNav />

      {/* HERO */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1b2a] leading-tight mb-4">
                Real Learners. Real Stories.
              </h1>
              <p className="text-base text-[#4a6a8a] leading-relaxed">
                From first certifications to career breakthroughs — read how learners worldwide transformed their careers with Koenig Solutions.
              </p>
            </div>
            <div className="hidden md:flex shrink-0 items-center justify-center">
              <div className="relative w-[200px] h-[200px] lg:w-[240px] lg:h-[240px]">
                <div className="w-full h-full rounded-full overflow-hidden" style={{ border: '4px solid #DCEEFB', boxShadow: '0 8px 32px rgba(6,148,209,0.15)' }}>
                  <div className="grid grid-cols-2 w-full h-full">
                    <Image src="/images/headshots/headshot-1.webp" alt="" width={120} height={120} className="w-full h-full object-cover" />
                    <Image src="/images/headshots/headshot-2.webp" alt="" width={120} height={120} className="w-full h-full object-cover" />
                    <Image src="/images/headshots/headshot-5.webp" alt="" width={120} height={120} className="w-full h-full object-cover" />
                    <Image src="/images/headshots/headshot-3.webp" alt="" width={120} height={120} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE KOENIG EXPERIENCE */}
      <section className="bg-white pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">

          {/* Section heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1b2a] mb-2">The Koenig Experience</h2>
            <p className="text-sm sm:text-base text-[#7a8c96]">Hear firsthand from students who&apos;ve experienced the Koenig difference.</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex rounded-full overflow-hidden" style={{ border: '1.5px solid #0694D1' }}>
              <button
                onClick={() => setActiveTab('testimonial')}
                className={`px-5 py-2.5 text-sm font-semibold transition-colors ${activeTab === 'testimonial' ? 'bg-[#0694D1] text-white' : 'bg-white text-[#0694D1] hover:bg-[#E8F4FA]'}`}
              >
                Students Testimonial
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-5 py-2.5 text-sm font-semibold transition-colors ${activeTab === 'videos' ? 'bg-[#0694D1] text-white' : 'bg-white text-[#0694D1] hover:bg-[#E8F4FA]'}`}
              >
                Student Testimonial Videos
              </button>
            </div>
          </div>

          {activeTab === 'testimonial' ? (
            <>
              {/* Mobile: horizontal auto-scroll marquee */}
              <MobileTestimonialMarquee items={TESTIMONIALS} />

              {/* Desktop: 3-column auto-scroll */}
              <div
                className="hidden sm:block relative overflow-hidden"
                style={{
                  height: '520px',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
                }}
              >
                <div className="grid grid-cols-3 gap-4 h-full">
                  <HomeScrollColumn items={TESTIMONIALS.slice(0, 3)} speed={0.030} />
                  <HomeScrollColumn items={TESTIMONIALS.slice(3, 6)} speed={0.025} />
                  <HomeScrollColumn items={TESTIMONIALS.slice(6, 9)} speed={0.038} />
                </div>
              </div>

              {/* Show More */}
              <div className="text-center mt-8">
                <button className="rounded-full px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90" style={{ background: '#0694D1' }}>
                  Show More
                </button>
              </div>
            </>
          ) : (
            <div className="py-10 text-center">
              <p className="text-[#475569] mb-6">Learners from around the world share their Koenig experience on camera.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {['Tanzania', 'Oman', 'Saudi Arabia', 'Zambia', 'Iraq', 'Ghana', 'Angola', 'Kenya'].map(c => (
                  <span key={c} className="bg-white border border-[#E2E8F0] text-[#0F172A] px-4 py-2 rounded-full text-sm font-medium">{c}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* LEARNER FEEDBACK ON REVISION CLASSES */}
      <section className="bg-[#F8FAFC] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1b2a] mb-2">Learner Feedback on Our Revision Classes</h2>
            <p className="text-sm sm:text-base text-[#7a8c96] max-w-2xl mx-auto">
              Missed a concept or need extra clarity? Our revision classes are here to help you revisit, relearn, and master every topic. Read what our learners have to say about their experience.
            </p>
          </div>

          {/* Cards */}
          <div className="hidden sm:grid grid-cols-3 gap-5 mt-8">
            {REVISION_TESTIMONIALS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6" style={{ border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
                <div className="text-3xl text-[#DCEEFB] font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#2d4a6a' }}>{r.quote}</p>
                <div className="mt-auto pt-4 border-t" style={{ borderColor: '#E8F4FA' }}>
                  <p className="text-sm font-bold text-[#0d1b2a]">{r.name}</p>
                  <p className="text-xs text-[#7a8c96] mt-0.5">{r.course}</p>
                  <p className="text-xs text-[#aaa] mt-0.5">{r.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: single card with dots */}
          <div className="sm:hidden mt-8">
            <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
              <div className="text-3xl text-[#DCEEFB] font-serif leading-none mb-3">&ldquo;</div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#2d4a6a' }}>{REVISION_TESTIMONIALS[revIdx].quote}</p>
              <div className="pt-4 border-t" style={{ borderColor: '#E8F4FA' }}>
                <p className="text-sm font-bold text-[#0d1b2a]">{REVISION_TESTIMONIALS[revIdx].name}</p>
                <p className="text-xs text-[#7a8c96] mt-0.5">{REVISION_TESTIMONIALS[revIdx].course}</p>
                <p className="text-xs text-[#aaa] mt-0.5">{REVISION_TESTIMONIALS[revIdx].date}</p>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {REVISION_TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setRevIdx(i)} className="w-2 h-2 rounded-full transition-colors" style={{ background: i === revIdx ? '#0694D1' : '#DCEEFB' }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE / FACEBOOK RATINGS */}
      <section className="bg-white py-10 border-y" style={{ borderColor: '#E8F4FA' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20">
            {/* Google */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1 text-2xl font-bold tracking-tight">
                <span style={{ color: '#4285F4' }}>G</span>
                <span style={{ color: '#EA4335' }}>o</span>
                <span style={{ color: '#FBBC05' }}>o</span>
                <span style={{ color: '#4285F4' }}>g</span>
                <span style={{ color: '#34A853' }}>l</span>
                <span style={{ color: '#EA4335' }}>e</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-sm font-bold text-[#0d1b2a]">4.4/5 Rating</span>
              </div>
            </div>
            {/* Facebook */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span className="text-xl font-bold" style={{ color: '#1877F2' }}>facebook</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-sm font-bold text-[#0d1b2a]">4.2/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN 5 MILLION+ LEARNERS */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1b2a] leading-snug mb-2">
              Join 5 million+ learners who&apos;ve upskilled with Koenig&apos;s top-rated programs
            </h2>
            <p className="text-sm text-[#7a8c96]">Explore Our Courses</p>
          </div>

          {/* Course grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {COURSES.map((course, i) => (
              <div key={i} className="rounded-lg border px-3 py-3 text-xs leading-snug cursor-pointer transition-colors hover:border-[#0694D1] hover:bg-[#F0F8FF]" style={{ borderColor: '#DCEEFB', color: '#2d4a6a' }}>
                {course}
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="rounded-full px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90" style={{ background: '#0694D1' }}>
              Show All Course
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

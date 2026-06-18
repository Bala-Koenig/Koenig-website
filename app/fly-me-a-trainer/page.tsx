'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

/* ── Learning tabs ─────────────────────────────────────────────── */
const LEARNING_TABS = [
  { id: 'ilo',      label: 'Live Online Training',      href: '/live-online-classroom',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { id: 'classroom',label: 'Classroom Training',          href: '/classroom-training',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: 'flexi',    label: 'Flexi Training',              href: '/flexi-training',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { id: '1on1',     label: '1-on-1 Training',             href: '/1-on-1-training',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { id: 'fmat',     label: 'Fly-Me-a-Trainer',           href: '/fly-me-a-trainer',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></svg> },
]

const STATS = [
  { value: '5,000+', label: 'Courses' },
  { value: '50+',    label: 'Countries' },
  { value: '33+',    label: 'Years' },
  { value: '99.1%',  label: 'Satisfaction' },
]

const BENEFITS = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: 'Trainer Comes to You',
    desc: 'Our certified instructor flies to your office, facility, or any location worldwide. Zero travel hassle for your team.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    title: 'Uncompromised Privacy',
    desc: 'Train on sensitive or proprietary systems in your secure environment. No external participants, no data risk.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    title: 'Fully Tailored Curriculum',
    desc: 'Curriculum customized around your team\'s real-world challenges, tools, and workflows — not a generic syllabus.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'All-Inclusive Pricing',
    desc: 'One flat rate covers trainer fees, travel, and accommodation. No hidden costs, no surprises.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: 'Globally Available',
    desc: 'We\'ve delivered onsite training in 50+ countries. Wherever your team is, we can be there.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    title: 'Familiar Environment',
    desc: 'Training in your own space means higher comfort, better focus, and stronger knowledge retention.',
  },
]

const HOW_STEPS = [
  {
    step: '01',
    title: 'Choose Your Course',
    desc: 'Pick from 5,000+ courses across Microsoft, AWS, Cisco, CompTIA, PMI, and more. Our advisors can help you select the right program.',
    tags: ['5,000+ Courses', 'Expert Guidance'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>,
  },
  {
    step: '02',
    title: 'Share Your Location & Dates',
    desc: 'Tell us your city, country, preferred start date, and team size. We handle all logistics from there.',
    tags: ['Any Country', 'Flexible Dates'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>,
  },
  {
    step: '03',
    title: 'We Arrange Everything',
    desc: 'Koenig books the certified trainer, handles travel and accommodation. All costs are included in your quote.',
    tags: ['All-Inclusive', 'Fast Turnaround'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
  },
  {
    step: '04',
    title: 'Training at Your Premises',
    desc: 'The instructor arrives at your facility and delivers a fully customized, hands-on program for your team.',
    tags: ['On-Site', 'Hands-On Labs'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>,
  },
]

const FAQS = [
  { q: 'What is Fly-Me-a-Trainer (FMAT)?', a: 'FMAT is Koenig\'s onsite training service where a certified instructor travels to your location — your office, facility, or any venue worldwide — to deliver training directly to your team. No travel required from participants.' },
  { q: 'Is pricing all-inclusive?', a: 'Yes. FMAT pricing covers the trainer fee, flights, and accommodation. There are no hidden add-ons. You get a single, transparent quote upfront.' },
  { q: 'How quickly can you arrange a trainer?', a: 'Turnaround time varies by course, trainer availability, and destination. Many courses can be arranged within a few days. Contact us for an exact timeline.' },
  { q: 'What facility do we need to provide?', a: 'You need a suitable training room with reliable Wi-Fi and a projector or large screen. We\'ll advise on specific lab requirements per course.' },
  { q: 'Are all 5,000+ courses available via FMAT?', a: 'Yes. Every course in the Koenig catalogue is available in FMAT format. Custom or vendor-specific topics can also be accommodated on request.' },
  { q: 'Is FMAT suitable for a single employee?', a: 'FMAT is most cost-effective for groups of 4 or more. For individual training, our 1-on-1 Training option is a better fit.' },
  { q: 'What is your cancellation policy?', a: 'Flexible rescheduling and cancellation are available. Please refer to our Terms of Service for specific conditions based on the notice period.' },
  { q: 'Do you handle visa requirements for the trainer?', a: 'Yes. Koenig manages all travel logistics for the trainer including visa arrangements. We have established processes for trainers visiting 50+ countries.' },
]

const TESTIMONIALS = [
  { name: 'Adham Al Mayasi',   role: 'IT Professional, 🇴🇲 Oman',      course: 'AZ-104: Microsoft Azure Administrator',         initials: 'AA', bg: 'linear-gradient(135deg,#076D9D,#4DBFEF)', quote: 'Your dedication, expertise, and unwavering commitment to your craft are truly inspiring. You have a unique ability to connect with your trainees, instilling a sense of belief and motivation that stays long after the sessions end.' },
  { name: 'Emmanuel Masabo',   role: 'Network Engineer, 🇷🇼 Rwanda',    course: 'CCNA (200-301): Cisco Certified Network Associate', initials: 'EM', bg: 'linear-gradient(135deg,#093148,#076D9D)', quote: 'The trainer is very organised. She helped us understand difficult concepts in simple ways. She managed the time professionally — the content was huge but all was delivered perfectly.' },
  { name: 'Yoosuf Nizam',     role: 'Cloud Architect, 🇲🇻 Maldives',   course: 'AWS Solutions Architect – Associate (SAA-C03)',    initials: 'YN', bg: 'linear-gradient(135deg,#F47920,#f6a05c)', quote: 'This trainer is undoubtedly one of the finest I have encountered. His profound knowledge and articulate teaching style make complex concepts remarkably accessible.' },
  { name: 'Amjad Kushar',     role: 'IT Manager, 🇸🇦 Saudi Arabia',    course: 'AZ-500: Microsoft Azure Security Technologies',   initials: 'AK', bg: 'linear-gradient(135deg,#093148,#F47920)', quote: 'I would like to express my sincere appreciation to the trainer for providing such an outstanding learning experience tailored precisely to my knowledge gaps.' },
  { name: 'David Muriuki',    role: 'Security Engineer, 🇰🇪 Kenya',    course: 'CEH v13: Certified Ethical Hacker',               initials: 'DM', bg: 'linear-gradient(135deg,#34A853,#076D9D)', quote: 'His approach was nothing short of excellent — blending professionalism with a deep understanding of real-world scenarios that made every session highly engaging.' },
  { name: 'Monica Kalamula',  role: 'Systems Admin, 🇲🇼 Malawi',       course: 'CompTIA Security+ (SY0-701)',                      initials: 'MK', bg: 'linear-gradient(135deg,#476D8D,#0694D1)', quote: 'His expertise shone through in his ability to translate complex ideas into digestible information — one of the best training experiences I\'ve had.' },
]

const HEAR_OPTIONS = [
  'Search Engine (Google/Bing)', 'LinkedIn', 'Facebook / Instagram', 'Twitter / X', 'YouTube',
  'Colleague / Friend Referral', 'Previous Koenig Student', 'Email Newsletter',
  'Company Recommendation', 'Job Board', 'Online Forum / Reddit', 'Other',
]

/* ── Testimonial Card ─────────────────────────────────────────── */
function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  const [exp, setExp] = useState(false)
  const isLong = t.quote.length > 140
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white h-full" style={{ border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
      <div className="flex-1 flex flex-col p-5">
        <div className="mb-3 text-base leading-none" style={{ color: '#F59E0B', letterSpacing: 1 }}>★★★★★</div>
        <p className="mb-4 text-sm leading-relaxed flex-1" style={{ color: '#2d4a6a' }}>&ldquo;{isLong && !exp ? `${t.quote.slice(0, 140)}…` : t.quote}&rdquo;</p>
        {isLong && (
          <button onClick={() => setExp(p => !p)} className="mb-3 w-fit rounded-full border px-3 py-1 text-xs font-semibold text-[#0694D1] hover:bg-[#0694D1] hover:text-white transition-all" style={{ borderColor: '#0694D1' }}>
            {exp ? 'Show Less ↑' : 'Show More ↓'}
          </button>
        )}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: t.bg, border: '2px solid #DCEEFB' }}>{t.initials}</div>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight" style={{ color: '#0d1b2a' }}>{t.name}</p>
            <p className="text-xs font-semibold mt-0.5" style={{ color: '#0694D1' }}>{t.role}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: '#E8F4FA', background: '#F8FCFF' }}>
        <p className="text-xs font-bold truncate mr-2" style={{ color: '#0d1b2a' }}>{t.course}</p>
        <span className="rounded-full px-2.5 py-1 text-xs font-semibold shrink-0" style={{ background: '#EBF8FE', color: '#0569a8', border: '1px solid #CAEFFF' }}>✓ Verified</span>
      </div>
    </div>
  )
}

/* ── Mobile horizontal marquee ───────────────────────────────── */
function MobileMarquee({ items }: { items: typeof TESTIMONIALS }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const posRef   = useRef(0)
  const dragRef  = useRef({ active: false, startX: 0, startPos: 0 })

  useEffect(() => {
    const inner = trackRef.current
    if (!inner) return
    let prev = performance.now(); let raf: number
    function tick(now: number) {
      const dt = now - prev; prev = now
      if (!dragRef.current.active && inner) {
        posRef.current += 0.038 * dt
        const half = inner.scrollWidth / 2
        if (half > 0 && posRef.current >= half) posRef.current -= half
        inner.style.transform = `translateX(-${posRef.current}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="sm:hidden overflow-hidden mt-5" style={{ maskImage: 'linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%)', WebkitMaskImage: 'linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%)' }}
      onTouchStart={e => { dragRef.current = { active: true, startX: e.touches[0].clientX, startPos: posRef.current } }}
      onTouchMove={e => {
        const dx = dragRef.current.startX - e.touches[0].clientX
        const inner = trackRef.current; if (!inner) return
        const half = inner.scrollWidth / 2
        let p = dragRef.current.startPos + dx
        if (p < 0) p = 0; if (half > 0 && p >= half) p = half - 1
        posRef.current = p; inner.style.transform = `translateX(-${p}px)`
      }}
      onTouchEnd={() => { dragRef.current.active = false }}>
      <ul ref={trackRef} className="flex gap-4 py-2" style={{ width: 'max-content', listStyle: 'none', padding: 0, margin: 0 }}>
        {[...items, ...items].map((t, i) => (
          <li key={i} style={{ width: 280, flexShrink: 0 }}>
            <TestimonialCard t={t} />
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Desktop scroll column ───────────────────────────────────── */
function ScrollColumn({ items, speed }: { items: typeof TESTIMONIALS; speed: number }) {
  const ref  = useRef<HTMLDivElement>(null)
  const pos  = useRef(0)
  const paus = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    let prev = performance.now(); let raf: number
    function tick(now: number) {
      const dt = now - prev; prev = now
      if (!paus.current && el) {
        pos.current += speed * dt
        const half = el.scrollHeight / 2
        if (half > 0 && pos.current >= half) pos.current -= half
        el.style.transform = `translateY(-${pos.current}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [speed])
  return (
    <div style={{ height: 520, overflow: 'hidden' }} onMouseEnter={() => { paus.current = true }} onMouseLeave={() => { paus.current = false }}>
      <div ref={ref} className="flex flex-col gap-4">
        {[...items, ...items].map((t, i) => <TestimonialCard key={i} t={t} />)}
      </div>
    </div>
  )
}

/* ── Lead Form Section ───────────────────────────────────────── */
function FmatLeadFormSection() {
  const [tab, setTab] = useState<'individual' | 'enterprise'>('individual')
  const [submitted, setSubmitted] = useState(false)
  const [robotChecked, setRobotChecked] = useState(false)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', courseName: '', trainees: '', hearAbout: '', message: '' })

  const set = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }))

  const inp: React.CSSProperties = { width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 12, color: '#fff', padding: '10px 14px', fontSize: 13.5, fontFamily: 'inherit', outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }

  if (submitted) {
    return (
      <section id="request" style={{ background: 'radial-gradient(ellipse at 68% 48%, rgba(6,148,209,0.18) 0%, rgba(6,148,209,0.06) 38%, transparent 65%), #06111E', padding: '30px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.3)', borderRadius: 20, padding: '48px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 20, margin: '0 0 8px' }}>Thank you!</h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>Our FMAT team will reach out within 1 business day.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="request" style={{ background: 'radial-gradient(ellipse at 68% 48%, rgba(6,148,209,0.18) 0%, rgba(6,148,209,0.06) 38%, transparent 65%), #06111E', padding: '30px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
          className="fmat-ilf-form" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.20)', borderRadius: 20, padding: '32px 28px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <span style={{ display: 'inline-block', border: '1px solid rgba(6,148,209,0.55)', background: 'rgba(6,148,209,0.12)', color: '#38bdf8', borderRadius: 999, padding: '4px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
              Let&apos;s Talk
            </span>
            <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(20px,3vw,28px)', margin: '0 0 6px', lineHeight: 1.25 }}>
              Request for more <span style={{ color: '#38bdf8' }}>information</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, margin: '0 0 16px' }}>Fly-Me-a-Trainer with Koenig Solutions</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              <a href="https://wa.me/919840722417" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 16px', color: 'rgba(255,255,255,0.75)', fontSize: 13, textDecoration: 'none', fontFamily: 'inherit' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp us
              </a>
              <a href="mailto:info@koenig-solutions.com"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 16px', color: 'rgba(255,255,255,0.75)', fontSize: 13, textDecoration: 'none', fontFamily: 'inherit' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
                Email us
              </a>
            </div>
          </div>

          {/* Individual / Enterprise toggle */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 12, padding: 4, marginBottom: 20 }}>
            {(['individual', 'enterprise'] as const).map(t => (
              <button key={t} type="button" onClick={() => setTab(t)}
                style={{ flex: 1, borderRadius: 9, padding: '10px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.2s',
                  ...(tab === t ? { background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: '#fff', boxShadow: '0 2px 12px rgba(6,148,209,0.35)' } : { background: 'transparent', color: 'rgba(255,255,255,0.45)' }) }}>
                {t === 'individual'
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                  : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/><path d="M2 12h20"/></svg>}
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Row 1 */}
          <div className="fmat-ilf-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={lbl}>Full Name <span style={{ color: '#f87171' }}>*</span></label>
              <input type="text" required placeholder="John Smith" value={form.fullName} onChange={e => set('fullName', e.target.value)} style={inp} />
            </div>
            <div>
              <label style={lbl}>{tab === 'enterprise' ? 'Business ' : ''}Email <span style={{ color: '#f87171' }}>*</span></label>
              <input type="email" required placeholder="john@example.com" value={form.email} onChange={e => set('email', e.target.value)} style={inp} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="fmat-ilf-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={lbl}>Phone / WhatsApp <span style={{ color: '#f87171' }}>*</span></label>
              <input type="tel" required placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => set('phone', e.target.value)} style={inp} />
            </div>
            <div>
              {tab === 'individual' ? (
                <>
                  <label style={lbl}>Course Name</label>
                  <input type="text" placeholder="e.g. AZ-104, CISSP, PMP…" value={form.courseName} onChange={e => set('courseName', e.target.value)} style={inp} />
                </>
              ) : (
                <>
                  <label style={lbl}>Number of Trainees</label>
                  <input type="number" min="1" placeholder="e.g. 5" value={form.trainees} onChange={e => set('trainees', e.target.value)} style={inp} />
                </>
              )}
            </div>
          </div>

          {/* How did you hear */}
          <div style={{ marginBottom: 12, position: 'relative' }}>
            <label style={lbl}>How did you hear about us?</label>
            <select value={form.hearAbout} onChange={e => set('hearAbout', e.target.value)}
              style={{ ...inp, appearance: 'none', WebkitAppearance: 'none', color: form.hearAbout ? '#fff' : 'rgba(255,255,255,0.3)' }}>
              <option value="" style={{ background: '#0a1929' }}>Select Option</option>
              {HEAR_OPTIONS.map(o => <option key={o} value={o} style={{ background: '#0a1929', color: '#fff' }}>{o}</option>)}
            </select>
            <svg style={{ position: 'absolute', right: 14, top: 'calc(50% + 10px)', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.4)' }}
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>

          {/* Training goals */}
          <div style={{ marginBottom: 12 }}>
            <label style={lbl}>Tell us about your training goals</label>
            <textarea rows={4} placeholder="e.g. Preferred dates, location, number of attendees, specific topics…"
              value={form.message} onChange={e => set('message', e.target.value)}
              style={{ ...inp, resize: 'none', lineHeight: 1.6 }} />
          </div>

          {/* reCAPTCHA mock */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '8px 14px' }}>
              <input type="checkbox" checked={robotChecked} onChange={e => setRobotChecked(e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer' }} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>I&apos;m not a robot</span>
              <div style={{ marginLeft: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
                  <path d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z" fill="#4A90D9"/>
                  <path d="M32 14c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18z" fill="white"/>
                  <path d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" fill="#4A90D9"/>
                  <path d="M32 26a6 6 0 100 12 6 6 0 000-12z" fill="white"/>
                </svg>
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', lineHeight: 1.2 }}>reCAPTCHA</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button type="submit"
            style={{ width: '100%', padding: '14px 0', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg,#0694D1 0%,#076D9D 100%)', boxShadow: '0 0 28px rgba(6,148,209,0.40)' }}>
            Request More Info
          </button>
          <p style={{ textAlign: 'center', fontSize: 11.5, color: 'rgba(255,255,255,0.30)', marginTop: 10 }}>
            We&apos;ll respond within 1 business day · No spam, ever.
          </p>
        </form>

        <style>{`
          @media(max-width:600px){
            .fmat-ilf-grid { grid-template-columns: 1fr !important; }
            .fmat-ilf-form { padding: 20px 16px !important; }
          }
        `}</style>
      </div>
    </section>
  )
}

export default function FlyMeATrainerPage() {
  const [openFaq, setOpenFaq]   = useState<number | null>(null)
  const [howIdx, setHowIdx]     = useState(0)
  const [benIdx, setBenIdx]     = useState(0)
  const howTouchX = useRef(0)
  const benTouchX = useRef(0)
  const BEN_SLIDES = Math.ceil(BENEFITS.length / 2)
  const tabScrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = tabScrollRef.current?.querySelector('[data-tab="fmat"]') as HTMLElement | null
    if (el) el.scrollIntoView({ behavior: 'instant', inline: 'start', block: 'nearest' })
  }, [])

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <Navbar />

      {/* ── BANNER ─────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg,#06111E 0%,#071828 55%,#061624 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle,#0694D1 0%,transparent 70%)' }} />
          <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle,#38bdf8 0%,transparent 70%)' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]" style={{ paddingTop: 35, paddingBottom: 35 }}>
          <div className="grid lg:grid-cols-2 gap-0 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.35)', color: '#38bdf8' }}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                Onsite · All-Inclusive · Global Delivery
              </div>

              <h1 className="sm:text-4xl lg:text-5xl font-black leading-tight text-white mb-4" style={{ fontSize: 36 }}>
                The Trainer{' '}
                <span style={{ background: 'linear-gradient(135deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Comes</span>
                {' '}to You.
              </h1>

              <p className="text-base leading-relaxed mb-[15px]" style={{ color: 'rgba(255,255,255,0.68)' }}>
                Fly-Me-a-Trainer (FMAT) brings a certified Koenig instructor directly to your premises — anywhere in the world. No employee travel. Fully customized. All-inclusive pricing.
              </p>

              {/* Carbon pledge */}
              <div className="flex items-center gap-2 mb-[15px] rounded-xl px-4 py-2.5" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', display: 'inline-flex' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.5c-.13.21-.41.27-.64.14-.33-.19-.58-.52-.58-.89V5.5A2.5 2.5 0 0 1 5.09 3H19a2 2 0 0 1 2 2v9.5A2.5 2.5 0 0 1 18.5 17H17"/></svg>
                <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 600 }}>We plant a tree for every trainer flight — carbon neutral commitment</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-[15px] sm:mb-0">
                <a href="#request" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90 sm:w-auto w-full" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 4px 20px rgba(6,148,209,0.4)' }}>
                  Request More Info
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
                <a href="https://wa.me/919840722417" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:bg-white/10 sm:w-auto w-full" style={{ border: '1.5px solid rgba(37,211,102,0.45)', color: '#25D366' }}>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.843L0 24l6.305-1.654A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5.007-1.371l-.359-.214-3.742.981.999-3.65-.234-.375A9.818 9.818 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>
                  WhatsApp Us
                </a>
              </div>

              {/* Mobile stats */}
              <div className="lg:hidden grid grid-cols-4 gap-2">
                {STATS.map(s => (
                  <div key={s.label} className="flex flex-col items-center justify-center rounded-xl py-3 px-1" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(6,148,209,0.30)' }}>
                    <span className="text-sm font-black leading-none" style={{ color: '#38bdf8' }}>{s.value}</span>
                    <span className="text-[10px] font-medium mt-0.5 text-center leading-tight" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — feature cards (desktop) */}
            <div className="hidden lg:grid grid-cols-2 gap-3" style={{ gridTemplateRows: 'auto auto auto' }}>
              {[
                { label: <>Trainer <span style={{ color: '#38bdf8' }}>flies to your location</span> worldwide</> },
                { label: <>All-inclusive pricing — <span style={{ color: '#38bdf8' }}>travel & accommodation included</span></> },
                { label: <><span style={{ color: '#38bdf8' }}>100% private</span> — no other participants</> },
                { label: <>Curriculum <span style={{ color: '#38bdf8' }}>built around your team's needs</span></> },
                { label: <>Available in <span style={{ color: '#38bdf8' }}>50+ countries</span>, 5,000+ courses</>, full: true },
              ].map(({ label, full }, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(6,148,209,0.25)', gridColumn: full ? '1 / -1' : undefined }}>
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.5)' }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span className="text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.82)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRAINING TABS ──────────────────────────────────────── */}
      <style>{`
        @keyframes tab-border-sweep {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .tab-border-glow {
          background: linear-gradient(270deg, #0694D1, #38bdf8, #076D9D, #38bdf8, #0694D1);
          background-size: 400% 400%;
          animation: tab-border-sweep 3s ease infinite;
          padding: 2px;
          border-radius: 1rem;
          display: inline-flex;
        }
      `}</style>
      <section className="bg-white border-b py-4 px-4 lg:px-[50px]" style={{ borderColor: '#E2E8F0' }}>
        <div className="mx-auto max-w-7xl">

          {/* Mobile: full-width scrollable, active tab snaps to left */}
          <div className="sm:hidden">
            <div className="tab-border-glow" style={{ display: 'block', width: '100%' }}>
              <div
                ref={tabScrollRef}
                className="flex overflow-x-auto rounded-[14px] bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}
              >
                {LEARNING_TABS.map(tab =>
                  tab.id === 'fmat' ? (
                    <Link key={tab.id} href={tab.href} data-tab="fmat"
                      className="relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 px-6 py-3 text-sm bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30">
                      {tab.icon}{tab.label}
                    </Link>
                  ) : (
                    <Link key={tab.id} href={tab.href}
                      className="inline-flex items-center gap-1.5 relative whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 px-4 py-3 text-sm text-[#7a8c96]">
                      {tab.icon}{tab.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Desktop: centered */}
          <div className="hidden sm:flex justify-center">
            <div className="tab-border-glow">
              <div className="inline-flex overflow-hidden rounded-[14px] bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]">
                {LEARNING_TABS.map(tab =>
                  tab.id === 'fmat' ? (
                    <Link key={tab.id} href={tab.href}
                      className="relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 px-8 py-3 text-sm sm:text-base bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30">
                      {tab.icon}{tab.label}
                    </Link>
                  ) : (
                    <Link key={tab.id} href={tab.href}
                      className="inline-flex items-center gap-1.5 relative whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 px-6 py-3 text-sm text-[#7a8c96] hover:text-[#093148]">
                      {tab.icon}{tab.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── KEY BENEFITS ───────────────────────────────────────── */}
      <section style={{ background: '#EBF8FE', borderTop: '1px solid #CAEFFF', paddingTop: 30, paddingBottom: 30 }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-[15px]">
            <div className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ background: 'rgba(6,148,209,0.1)', color: '#0694D1' }}>Why FMAT</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: '#071e2e' }}>
              Training on <span style={{ color: '#0694D1' }}>Your Terms</span>
            </h2>
            <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: '#7a8c96' }}>No flights for your team, no generic syllabus, no compromise on quality — the instructor comes to you.</p>
          </div>
          {/* Mobile: 2-card slider */}
          <div className="sm:hidden"
            onTouchStart={e => { benTouchX.current = e.touches[0].clientX }}
            onTouchEnd={e => { const dx = benTouchX.current - e.changedTouches[0].clientX; if (dx > 50) setBenIdx(p => Math.min(p + 1, BEN_SLIDES - 1)); if (dx < -50) setBenIdx(p => Math.max(p - 1, 0)) }}>
            <div className="overflow-hidden">
              <div className="flex" style={{ transform: `translateX(-${benIdx * 100}%)`, transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)' }}>
                {Array.from({ length: BEN_SLIDES }).map((_, si) => (
                  <div key={si} className="shrink-0 w-full grid grid-cols-2 gap-3">
                    {BENEFITS.slice(si * 2, si * 2 + 2).map((b, i) => (
                      <div key={i} className="flex flex-col gap-3 rounded-2xl p-4 bg-white" style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(6,148,209,0.06)' }}>
                        <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1' }}>{b.icon}</div>
                        <div>
                          <h3 className="text-sm font-bold mb-1" style={{ color: '#0F172A' }}>{b.title}</h3>
                          <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{b.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              {Array.from({ length: BEN_SLIDES }).map((_, i) => (
                <button key={i} onClick={() => setBenIdx(i)} className="rounded-full transition-all duration-300" style={{ width: benIdx === i ? 20 : 7, height: 7, background: benIdx === i ? '#0694D1' : 'rgba(6,148,209,0.25)' }} />
              ))}
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((b, i) => (
              <div key={i} className="flex gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 bg-white" style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(6,148,209,0.06)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.35)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(6,148,209,0.12)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px rgba(6,148,209,0.06)' }}>
                <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center mt-0.5" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1' }}>{b.icon}</div>
                <div>
                  <h3 className="text-sm font-bold mb-1" style={{ color: '#0F172A' }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg,#06111E 0%,#093148 100%)', paddingTop: 30, paddingBottom: 30 }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-[15px]">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              How <span style={{ color: '#38bdf8' }}>FMAT Works</span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>From booking to onsite delivery in four simple steps</p>
          </div>

          {/* Mobile slider */}
          <div className="sm:hidden" onTouchStart={e => { howTouchX.current = e.touches[0].clientX }} onTouchEnd={e => { const dx = howTouchX.current - e.changedTouches[0].clientX; if (dx > 50) setHowIdx(p => Math.min(p + 1, HOW_STEPS.length - 1)); if (dx < -50) setHowIdx(p => Math.max(p - 1, 0)) }}>
            <div className="overflow-hidden">
              <div className="flex" style={{ transform: `translateX(-${howIdx * 100}%)`, transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)' }}>
                {HOW_STEPS.map(step => (
                  <div key={step.step} className="shrink-0 w-full rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,rgba(13,32,53,.95),rgba(10,22,40,.98))', border: '1px solid rgba(6,148,209,0.2)' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl font-black" style={{ color: 'rgba(6,148,209,0.2)', lineHeight: 1 }}>{step.step}</span>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.3)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeLinecap="round" strokeLinejoin="round">{step.icon}</svg>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.25)', color: '#38bdf8' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-5">
              <button onClick={() => setHowIdx(p => Math.max(p - 1, 0))} disabled={howIdx === 0} className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: howIdx === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.35)', color: howIdx === 0 ? 'rgba(255,255,255,0.25)' : '#38bdf8' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div className="flex gap-2">
                {HOW_STEPS.map((_, i) => (
                  <button key={i} onClick={() => setHowIdx(i)} className="rounded-full transition-all duration-300" style={{ width: howIdx === i ? 20 : 7, height: 7, background: howIdx === i ? '#0694D1' : 'rgba(255,255,255,0.22)' }} />
                ))}
              </div>
              <button onClick={() => setHowIdx(p => Math.min(p + 1, HOW_STEPS.length - 1))} disabled={howIdx === HOW_STEPS.length - 1} className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: howIdx === HOW_STEPS.length - 1 ? 'rgba(255,255,255,0.06)' : 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.35)', color: howIdx === HOW_STEPS.length - 1 ? 'rgba(255,255,255,0.25)' : '#38bdf8' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_STEPS.map(step => (
              <div key={step.step} className="rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,rgba(13,32,53,.95),rgba(10,22,40,.98))', border: '1px solid rgba(6,148,209,0.2)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl font-black" style={{ color: 'rgba(6,148,209,0.2)', lineHeight: 1 }}>{step.step}</span>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.3)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeLinecap="round" strokeLinejoin="round">{step.icon}</svg>
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.25)', color: '#38bdf8' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUEST FORM ───────────────────────────────────────── */}
      <FmatLeadFormSection />

      {/* ── TESTIMONIALS ───────────────────────────────────────── */}
      <section style={{ background: '#E8F4FA', paddingTop: 30, paddingBottom: 30, overflow: 'hidden', borderTop: '1px solid #CAEFFF' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-[15px]">
            <span className="inline-block mb-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1' }}>Real Results</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#071e2e' }}>
              Trusted by Teams <span style={{ color: '#0694D1' }}>Worldwide</span>
            </h2>
          </div>
          {/* Mobile: auto-scrolling marquee */}
          <MobileMarquee items={TESTIMONIALS} />
          {/* Desktop: scroll columns */}
          <div className="hidden sm:flex gap-4 mt-5">
            <div className="flex-1 max-w-[320px]"><ScrollColumn items={TESTIMONIALS.slice(0, 3)} speed={0.030} /></div>
            <div className="flex-1 max-w-[320px] hidden md:block"><ScrollColumn items={TESTIMONIALS.slice(3, 6)} speed={0.025} /></div>
            <div className="flex-1 max-w-[320px] hidden lg:block"><ScrollColumn items={TESTIMONIALS.slice(0, 3)} speed={0.038} /></div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 lg:px-[50px] bg-koenig-light" style={{ paddingTop: 35, paddingBottom: 35 }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#06111E' }}>
              Frequently <span style={{ background: 'linear-gradient(135deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Asked Questions</span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#7a8c96' }}>Everything you need to know about Fly-Me-a-Trainer with Koenig</p>
          </div>

          {/* Desktop: two-column */}
          <div className="hidden sm:flex gap-3">
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 === 0).map((f, j) => {
                const i = j * 2; const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left">
                      <span className="text-base font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#053148', transition: 'color 0.3s' }}>{f.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <p className="border-t border-[#EBF8FE] px-6 py-4 text-base leading-relaxed" style={{ color: '#7a8c96' }}>{f.a}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 !== 0).map((f, j) => {
                const i = j * 2 + 1; const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left">
                      <span className="text-base font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#053148', transition: 'color 0.3s' }}>{f.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <p className="border-t border-[#EBF8FE] px-6 py-4 text-base leading-relaxed" style={{ color: '#7a8c96' }}>{f.a}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:block mt-8 text-center">
            <p className="mb-3 text-base" style={{ color: '#7a8c96' }}>Still have questions?</p>
            <button className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-sm font-bold text-[#076D9D] transition-all hover:bg-[#076D9D] hover:text-white">
              Chat with a Training Advisor
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(7,109,157,0.12)' }}>→</span>
            </button>
          </div>

          {/* Mobile: single column */}
          <div className="sm:hidden flex flex-col gap-3">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left">
                    <span className="text-sm font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#053148', transition: 'color 0.3s' }}>{f.q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <p className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed" style={{ color: '#7a8c96' }}>{f.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}

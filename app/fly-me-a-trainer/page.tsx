'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

/* ── Learning tabs ─────────────────────────────────────────────── */
const LEARNING_TABS = [
  { id: 'ilo',      label: 'Live Online (ILO)',          href: '/live-online-classroom' },
  { id: 'classroom',label: 'Classroom',                  href: '/classroom-training'   },
  { id: 'flexi',    label: 'Flexi',                      href: '/flexi-training'       },
  { id: '1on1',     label: '1-on-1',                     href: '/1-on-1-training'      },
  { id: 'fmat',     label: 'Fly-Me-a-Trainer',           href: '/fly-me-a-trainer'     },
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
  { name: 'Adham Al Mayasi', role: 'IT Professional, 🇴🇲 Oman', initials: 'AA', bg: 'linear-gradient(135deg,#076D9D,#4DBFEF)', quote: 'Your dedication, expertise, and unwavering commitment to your craft are truly inspiring. You have a unique ability to connect with your trainees.' },
  { name: 'Emmanuel Masabo', role: 'Network Engineer, 🇷🇼 Rwanda', initials: 'EM', bg: 'linear-gradient(135deg,#093148,#076D9D)', quote: 'The trainer is very organised. She helped us understand difficult concepts in simple ways. She managed the time professionally — the content was huge but all was delivered perfectly.' },
  { name: 'Yoosuf Nizam', role: 'Cloud Architect, 🇲🇻 Maldives', initials: 'YN', bg: 'linear-gradient(135deg,#F47920,#f6a05c)', quote: 'This trainer is undoubtedly one of the finest I have encountered. His profound knowledge and articulate teaching style make complex concepts remarkably accessible.' },
  { name: 'Amjad Kushar', role: 'IT Manager, 🇸🇦 Saudi Arabia', initials: 'AK', bg: 'linear-gradient(135deg,#093148,#F47920)', quote: 'I would like to express my sincere appreciation to the trainer for providing such an outstanding learning experience tailored precisely to my knowledge gaps.' },
  { name: 'David Muriuki', role: 'Security Engineer, 🇰🇪 Kenya', initials: 'DM', bg: 'linear-gradient(135deg,#34A853,#076D9D)', quote: 'His approach was nothing short of excellent — blending professionalism with a deep understanding of real-world scenarios that made every session highly engaging.' },
  { name: 'Monica Kalamula', role: 'Systems Admin, 🇲🇼 Malawi', initials: 'MK', bg: 'linear-gradient(135deg,#476D8D,#0694D1)', quote: 'His expertise shone through in his ability to translate complex ideas into digestible information — one of the best training experiences I\'ve had.' },
]

const COUNTRIES = ['India','United States','United Kingdom','Canada','Australia','UAE','Singapore','Germany','France','Netherlands','Saudi Arabia','Qatar','South Africa','New Zealand','Other']

function LeadForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail]       = useState('')
  const [phone, setPhone]       = useState('')
  const [country, setCountry]   = useState('')
  const [team, setTeam]         = useState('')
  const [course, setCourse]     = useState('')
  const [message, setMessage]   = useState('')
  const [submitted, setSubmitted] = useState(false)

  const inp: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(6,148,209,0.07)', border: '1.5px solid rgba(6,148,209,0.25)',
    borderRadius: 10, padding: '11px 14px', fontSize: 13.5, color: '#fff',
    outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s',
  }
  const lbl: React.CSSProperties = {
    fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase', marginBottom: 5, display: 'block',
  }
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => (e.target.style.borderColor = '#0694D1')
  const blur  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => (e.target.style.borderColor = 'rgba(6,148,209,0.25)')

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Request Received!</h3>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6 }}>Our FMAT team will reach out within 1 business day with a detailed quote and availability.</p>
    </div>
  )

  return (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <label style={lbl}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
          <input required style={inp} placeholder="John" value={fullName} onChange={e => setFullName(e.target.value)} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={lbl}>Email <span style={{ color: '#ef4444' }}>*</span></label>
          <input required type="email" style={inp} placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={lbl}>Phone / WhatsApp <span style={{ color: '#ef4444' }}>*</span></label>
          <input required type="tel" style={inp} placeholder="+1 (555) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={lbl}>Country <span style={{ color: '#ef4444' }}>*</span></label>
          <select required style={{ ...inp, color: country ? '#fff' : 'rgba(255,255,255,0.4)', appearance: 'none' }} value={country} onChange={e => setCountry(e.target.value)} onFocus={focus} onBlur={blur}>
            <option value="" style={{ background: '#0d2d47' }}>Select country</option>
            {COUNTRIES.map(c => <option key={c} value={c} style={{ background: '#0d2d47', color: '#c8d8e8' }}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={lbl}>Team Size</label>
          <input type="number" min="1" style={inp} placeholder="e.g. 10" value={team} onChange={e => setTeam(e.target.value)} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={lbl}>Course / Topic</label>
          <input style={inp} placeholder="e.g. AZ-104, CCNA…" value={course} onChange={e => setCourse(e.target.value)} onFocus={focus} onBlur={blur} />
        </div>
      </div>
      <div>
        <label style={lbl}>Additional Requirements</label>
        <textarea style={{ ...inp, resize: 'vertical', minHeight: 90 } as React.CSSProperties} placeholder="Preferred dates, location, specific topics, lab requirements…"
          value={message} onChange={e => setMessage(e.target.value)} onFocus={focus} onBlur={blur} />
      </div>
      <button type="submit" style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#0694D1,#0577ab)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(6,148,209,0.4)', transition: 'filter 0.18s' }}
        onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.12)')}
        onMouseLeave={e => (e.currentTarget.style.filter = 'none')}>
        Request More Info
      </button>
      <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
        We respond within 1 business day · No spam, ever.
      </p>
    </form>
  )
}

export default function FlyMeATrainerPage() {
  const [openFaq, setOpenFaq]   = useState<number | null>(null)
  const [howIdx, setHowIdx]     = useState(0)
  const howTouchX = useRef(0)

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
      <section className="bg-white border-b py-4" style={{ borderColor: '#E2E8F0' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {LEARNING_TABS.map(tab => (
              <Link key={tab.id} href={tab.href}
                className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all"
                style={tab.id === 'fmat'
                  ? { background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: '#fff', boxShadow: '0 2px 10px rgba(6,148,209,0.35)' }
                  : { background: '#F1F5F9', color: '#64748b' }}>
                {tab.label}
              </Link>
            ))}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* ── WHAT YOU NEED TO PROVIDE ───────────────────────────── */}
      <section style={{ background: '#ffffff', paddingTop: 30, paddingBottom: 30 }}>
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-[15px]">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#071e2e' }}>
              What You Need to <span style={{ color: '#0694D1' }}>Provide</span>
            </h2>
            <p className="text-sm" style={{ color: '#7a8c96' }}>Minimal setup — we handle everything else</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, title: 'Training Room', desc: 'A comfortable space with seating for all participants and enough room for the instructor.' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 8.5h21M1.5 12h21M5 4.5h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2z"/></svg>, title: 'Strong Wi-Fi', desc: 'Reliable internet connection for lab exercises, demos, and any cloud-based course content.' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, title: 'Projector or Screen', desc: 'A projector or large display screen so all participants can clearly follow the instructor.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(6,148,209,0.08)' }}>{item.icon}</div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#0F172A' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────── */}
      <section style={{ background: '#E8F4FA', paddingTop: 30, paddingBottom: 30, overflow: 'hidden', borderTop: '1px solid #CAEFFF' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-[15px]">
            <span className="inline-block mb-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1' }}>Real Results</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#071e2e' }}>
              Trusted by Teams <span style={{ color: '#0694D1' }}>Worldwide</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: t.bg }}>{t.initials}</div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: '#0F172A' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: '#94a3b8' }}>{t.role}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(s => <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section style={{ background: '#f8fafc', paddingTop: 30, paddingBottom: 30 }}>
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="text-center mb-[15px]">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#06111E' }}>
              Frequently <span style={{ color: '#0694D1' }}>Asked Questions</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s,box-shadow 0.3s' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
                    <span className="text-sm font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#053148' }}>{f.q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s,background 0.3s' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <p className="border-t px-5 py-4 text-sm leading-relaxed" style={{ color: '#7a8c96', borderColor: '#EBF8FE' }}>{f.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── REQUEST FORM ───────────────────────────────────────── */}
      <section id="request" style={{ background: 'linear-gradient(135deg,#06111E 0%,#0d1f35 100%)', paddingTop: 30, paddingBottom: 30 }}>
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="text-center mb-[20px]">
            <div className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.3)', color: '#38bdf8' }}>Get a Free Quote</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Bring Training to <span style={{ color: '#0694D1' }}>Your Team</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Fill in the details below and our FMAT team will send you a customized quote within 1 business day.</p>
          </div>
          <div style={{ background: 'linear-gradient(160deg,#0d1f2e 0%,#091525 100%)', border: '1px solid rgba(6,148,209,0.2)', borderRadius: 20, padding: '32px 28px' }}>
            <LeadForm />
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {[
              { icon: '🌍', label: '50+ Countries Served' },
              { icon: '✈️', label: 'All-Inclusive Travel' },
              { icon: '🌱', label: 'Carbon Neutral Pledge' },
              { icon: '⚡', label: 'Quick Turnaround' },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-2">
                <span style={{ fontSize: 16 }}>{b.icon}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

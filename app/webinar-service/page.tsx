'use client'
import React, { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'

/* ── Data ─────────────────────────────────────────────────────── */

const FEATURES = [
  {
    title: 'Accelerated AI Adoption',
    desc: 'Quickly upskill your teams through targeted, regular AI learning sessions that boost innovation and keep your enterprise competitive.',
    img: '/images/webinar-service/was-icon1.png',
  },
  {
    title: 'Tailored, Contextual Learning',
    desc: 'Learning sessions customized to align precisely with your specific industry challenges, goals, and immediate priorities for maximum relevance.',
    img: '/images/webinar-service/was-icon2.png',
  },
  {
    title: 'Global Accessibility and Flexibility',
    desc: 'Sessions conveniently scheduled according to your global teams\' time zones, ensuring optimal participation and eliminating scheduling conflicts.',
    img: '/images/webinar-service/was-icon5.png',
  },
  {
    title: 'Streamlined Administration',
    desc: 'Effortless management through a dedicated platform for session requests, registrations, attendance tracking, and insightful feedback.',
    img: '/images/webinar-service/was-icon3.png',
  },
  {
    title: 'Employee-Driven Engagement',
    desc: 'Foster a learner-first culture by organizing exclusive learning sessions based directly on employee requests and feedback, driving engagement and morale.',
    img: '/images/webinar-service/was-icon4.png',
  },
  {
    title: 'Performance-Based Pricing',
    desc: 'Pay only for attendees who remain engaged and provide high-quality feedback, ensuring guaranteed ROI and accountability.',
    img: '/images/webinar-service/was-icon6.png',
  },
]

const HOW_STEPS = [
  {
    step: '01',
    title: 'Submit Your Request',
    desc: 'Provide learning session details — topic, audience size, preferred date and time — using our quick request form.',
    tags: ['Simple Form', 'Fast Response'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>,
  },
  {
    step: '02',
    title: 'Session Setup',
    desc: 'We schedule and tailor the learning session based on your preferences, assigning a certified expert instructor.',
    tags: ['Expert Instructor', 'Tailored Content'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>,
  },
  {
    step: '03',
    title: 'Delivery & Reporting',
    desc: 'Sessions are delivered seamlessly live. You receive detailed performance metrics, attendance data, and attendee feedback.',
    tags: ['Live Delivery', 'Detailed Reports'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>,
  },
]

const BENEFITS = [
  {
    title: 'Expert, Certified Instructors',
    desc: 'Learning sessions delivered by professional, certified instructors, ensuring your teams receive high-quality, accurate, and expert knowledge.',
    img: '/images/webinar-service/wass1.png',
  },
  {
    title: 'Live Interactive Q&A',
    desc: 'Attendees can get their specific questions answered immediately, enhancing understanding and practical application.',
    img: '/images/webinar-service/wass2.png',
  },
  {
    title: 'Scalable and Cost-Effective Training',
    desc: 'Enjoy flexible, scalable training initiatives without upfront risk, with costs linked directly to measurable engagement and value delivered.',
    img: '/images/webinar-service/waas7.png',
  },
  {
    title: 'Enhanced Talent Attraction & Retention',
    desc: 'Position your enterprise as an attractive employer by providing consistent learning opportunities, attracting and retaining top-tier talent.',
    img: '/images/webinar-service/was5.png',
  },
]

const TOP_SESSIONS = [
  { title: 'Kickstart Your Copilot Studio Journey', img: '/images/webinar-service/sessions/6.png', desc: 'Build and deploy AI copilots that integrate seamlessly into your development workflows.' },
  { title: 'Innovate with Generative AI',           img: '/images/webinar-service/sessions/2.png', desc: 'Turn ideas into reality: automate content, prototypes, and data workflows to free your team for high-value work.' },
  { title: 'Mastering Prompt Engineering',          img: '/images/webinar-service/sessions/3.png', desc: 'Craft precise prompts to unlock the full potential of ChatGPT and other large language models.' },
  { title: 'Drive Decisions with Excel BI',         img: '/images/webinar-service/sessions/4.png', desc: 'Create dynamic dashboards and reports—turn raw data into strategic insights in minutes.' },
  { title: 'Email Etiquette for Professionals',     img: '/images/webinar-service/sessions/5.png', desc: 'Write clear, concise emails that command attention and drive faster responses.' },
  { title: 'Cybersecurity Made Simple',             img: '/images/webinar-service/sessions/1.png', desc: 'Master the fundamentals: from strong passwords to secure sharing, safeguard your organization without the jargon.' },
]

const FAQS = [
  { q: 'What is Webinar as a Service (WaaS)?',           a: 'WaaS is Koenig\'s on-demand live learning service where certified instructors deliver tailored webinar sessions to your teams. You submit a session request, we set it up, deliver it live, and report the results — all at performance-based pricing.' },
  { q: 'How does the $10-per-attendee pricing work?',    a: 'You pay a flat rate of $10 per attendee who stays engaged for more than 50 minutes and provides a rating above 4.4. If an attendee drops off early or rates poorly, you don\'t pay for them — guaranteed ROI.' },
  { q: 'How quickly can a session be arranged?',         a: 'Most sessions can be set up within 2–5 business days depending on topic complexity and instructor availability. Submit a request and our team will confirm a timeline within 1 business day.' },
  { q: 'Can sessions be customized to our industry?',   a: 'Absolutely. Every session is tailored to your specific industry challenges, tools, and goals. You can provide a brief and our instructors will adapt the content accordingly.' },
  { q: 'What topics are available?',                     a: 'We cover any topic in our 5,000+ course catalogue — from AI and cloud to cybersecurity, project management, data analytics, Microsoft 365, and more. Custom topics outside our catalogue can also be accommodated on request.' },
  { q: 'Is there a minimum audience size?',              a: 'There is no minimum — WaaS works for teams of any size, from 5 to 5,000. The performance-based model means pricing naturally scales with your actual engagement.' },
]

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahrain','Bangladesh',
  'Belarus','Belgium','Bolivia','Brazil','Bulgaria','Cambodia','Canada','Chile','China','Colombia','Croatia',
  'Czech Republic','Denmark','Ecuador','Egypt','Estonia','Ethiopia','Finland','France','Georgia','Germany',
  'Ghana','Greece','Guatemala','Hungary','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy',
  'Japan','Jordan','Kazakhstan','Kenya','Kuwait','Latvia','Lebanon','Libya','Lithuania','Malaysia','Mexico',
  'Morocco','Myanmar','Netherlands','New Zealand','Nigeria','Norway','Oman','Pakistan','Peru','Philippines',
  'Poland','Portugal','Qatar','Romania','Russia','Saudi Arabia','Serbia','Singapore','Slovakia','South Africa',
  'South Korea','Spain','Sri Lanka','Sweden','Switzerland','Taiwan','Thailand','Turkey','UAE','Uganda',
  'Ukraine','United Kingdom','United States','Uruguay','Uzbekistan','Venezuela','Vietnam','Zimbabwe',
]

/* ── Custom Date Picker ───────────────────────────────────────── */
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEK_DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa']

function CustomDatePicker({ value, onChange, inputStyle }: { value: string, onChange: (v: string) => void, inputStyle: React.CSSProperties }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const today = new Date()
  const sel = value ? new Date(value + 'T00:00:00') : null
  const [viewYear, setViewYear] = useState(sel ? sel.getFullYear() : today.getFullYear())
  const [viewMonth, setViewMonth] = useState(sel ? sel.getMonth() : today.getMonth())

  useEffect(() => {
    if (value) { const d = new Date(value + 'T00:00:00'); setViewYear(d.getFullYear()); setViewMonth(d.getMonth()) }
  }, [value])

  useEffect(() => {
    if (!open) return
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [open])

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) } else setViewMonth(m => m - 1) }
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) } else setViewMonth(m => m + 1) }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const daysInPrev = new Date(viewYear, viewMonth, 0).getDate()
  const cells: { day: number; kind: 'prev' | 'cur' | 'next' }[] = []
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, kind: 'prev' })
  for (let i = 1; i <= daysInMonth; i++) cells.push({ day: i, kind: 'cur' })
  for (let i = 1; cells.length < 42; i++) cells.push({ day: i, kind: 'next' })

  const pick = (day: number, kind: 'prev' | 'cur' | 'next') => {
    let y = viewYear, mo = viewMonth
    if (kind === 'prev') { mo--; if (mo < 0) { mo = 11; y-- } }
    if (kind === 'next') { mo++; if (mo > 11) { mo = 0; y++ } }
    onChange(`${y}-${String(mo + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
    setOpen(false)
  }

  const displayValue = value ? value.split('-').reverse().join('-') : ''

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div onClick={() => setOpen(o => !o)} style={{ ...inputStyle, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: value ? '#fff' : 'rgba(255,255,255,0.3)', fontSize: 13.5 }}>{displayValue || 'dd-mm-yyyy'}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      </div>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: '#0a1929', border: '1px solid rgba(6,148,209,0.30)', borderRadius: 12, zIndex: 200, boxShadow: '0 8px 28px rgba(0,0,0,0.50)', padding: '14px', minWidth: 280 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{MONTHS[viewMonth]}, {viewYear}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={prevMonth} type="button" style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg>
              </button>
              <button onClick={nextMonth} type="button" style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </div>
          </div>
          {/* Weekday headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
            {WEEK_DAYS.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.35)', padding: '3px 0', fontWeight: 600 }}>{d}</div>)}
          </div>
          {/* Days grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {cells.map((c, idx) => {
              const isSel = c.kind === 'cur' && sel && sel.getFullYear() === viewYear && sel.getMonth() === viewMonth && sel.getDate() === c.day
              const isTod = c.kind === 'cur' && today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === c.day
              return (
                <div key={idx} onClick={() => pick(c.day, c.kind)} style={{ textAlign: 'center', padding: '6px 0', fontSize: 13, borderRadius: 6, cursor: 'pointer', fontWeight: isSel || isTod ? 700 : 400, color: isSel ? '#fff' : c.kind !== 'cur' ? 'rgba(255,255,255,0.20)' : isTod ? '#38bdf8' : 'rgba(255,255,255,0.80)', background: isSel ? '#0694D1' : isTod ? 'rgba(6,148,209,0.15)' : 'transparent', border: isTod && !isSel ? '1px solid rgba(6,148,209,0.40)' : '1px solid transparent' }}>{c.day}</div>
              )
            })}
          </div>
          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button type="button" onClick={() => { onChange(''); setOpen(false) }} style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Clear</button>
            <button type="button" onClick={() => { const d = today; onChange(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`); setOpen(false) }} style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Today</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Custom Time Picker ───────────────────────────────────────── */
function CustomTimePicker({ value, onChange, inputStyle }: { value: string, onChange: (v: string) => void, inputStyle: React.CSSProperties }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [h, m] = value ? value.split(':') : ['', '']

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const setH = (hh: string) => onChange(`${hh}:${m || '00'}`)
  const setM = (mm: string) => onChange(`${h || '00'}:${mm}`)

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div onClick={() => setOpen(o => !o)} style={{ ...inputStyle, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: value ? '#fff' : 'rgba(255,255,255,0.3)', fontSize: 13.5 }}>{value || '--:--'}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      </div>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#0a1929', border: '1px solid rgba(6,148,209,0.30)', borderRadius: 10, zIndex: 200, display: 'flex', overflow: 'hidden', boxShadow: '0 8px 28px rgba(0,0,0,0.50)' }}>
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: 200, borderRight: '1px solid rgba(255,255,255,0.07)' }}>
            {hours.map(hh => (
              <div key={hh} onClick={() => setH(hh)}
                style={{ padding: '8px 0', textAlign: 'center', fontSize: 13.5, cursor: 'pointer', color: hh === h ? '#38bdf8' : 'rgba(255,255,255,0.70)', background: hh === h ? 'rgba(6,148,209,0.18)' : 'transparent' }}>
                {hh}
              </div>
            ))}
          </div>
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: 200 }}>
            {minutes.map(mm => (
              <div key={mm} onClick={() => setM(mm)}
                style={{ padding: '8px 0', textAlign: 'center', fontSize: 13.5, cursor: 'pointer', color: mm === m ? '#38bdf8' : 'rgba(255,255,255,0.70)', background: mm === m ? 'rgba(6,148,209,0.18)' : 'transparent' }}>
                {mm}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Request Form ─────────────────────────────────────────────── */
function WaasRequestForm() {
  const [submitted, setSubmitted] = useState(false)
  const [robotChecked, setRobotChecked] = useState(false)
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', country: '',
    date: '', time: '', sessionTopic: '', audienceSize: '',
    orgName: '', notes: '',
  })

  const set = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }))

  const inp: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 10, color: '#fff',
    padding: '10px 14px', fontSize: 13.5,
    fontFamily: 'inherit', outline: 'none',
  }
  const lbl: React.CSSProperties = {
    display: 'block', fontSize: 12.5, fontWeight: 600,
    color: 'rgba(255,255,255,0.65)', marginBottom: 6,
  }

  if (submitted) {
    return (
      <section id="request" style={{ background: 'radial-gradient(ellipse at 68% 48%,rgba(6,148,209,0.18) 0%,rgba(6,148,209,0.06) 38%,transparent 65%),#06111E', padding: '48px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.30)', borderRadius: 20, padding: '48px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 20, margin: '0 0 8px' }}>Request Received!</h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>Our WaaS team will reach out within 1 business day to confirm your session setup.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="request" style={{ background: 'radial-gradient(ellipse at 68% 48%,rgba(6,148,209,0.18) 0%,rgba(6,148,209,0.06) 38%,transparent 65%),#06111E', padding: '48px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <form
          onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
          className="waas-form"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.20)', borderRadius: 20, padding: '32px 28px' }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <span style={{ display: 'inline-block', border: '1px solid rgba(6,148,209,0.55)', background: 'rgba(6,148,209,0.12)', color: '#38bdf8', borderRadius: 999, padding: '4px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
              Request a Session
            </span>
            <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(20px,3vw,26px)', margin: '0 0 6px', lineHeight: 1.25 }}>
              Fill out the form &amp; we&apos;ll set up a <span style={{ color: '#38bdf8' }}>tailored WaaS</span> solution
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 13, margin: '0 0 16px' }}>Pay only for real engagement · $10 per engaged attendee</p>
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

          {/* Row 1 — Name + Email */}
          <div className="waas-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={lbl}>Full Name <span style={{ color: '#f87171' }}>*</span></label>
              <input type="text" required placeholder="John Smith" value={form.fullName} onChange={e => set('fullName', e.target.value)} style={inp} />
            </div>
            <div>
              <label style={lbl}>Business Email <span style={{ color: '#f87171' }}>*</span></label>
              <input type="email" required placeholder="john@company.com" value={form.email} onChange={e => set('email', e.target.value)} style={inp} />
            </div>
          </div>

          {/* Row 2 — Phone + Country */}
          <div className="waas-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={lbl}>Phone <span style={{ color: '#f87171' }}>*</span></label>
              <input type="tel" required placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => set('phone', e.target.value)} style={inp} />
            </div>
            <div style={{ position: 'relative' }}>
              <label style={lbl}>Country <span style={{ color: '#f87171' }}>*</span></label>
              <select required value={form.country} onChange={e => set('country', e.target.value)}
                style={{ ...inp, appearance: 'none', WebkitAppearance: 'none', color: form.country ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                <option value="" style={{ background: '#0a1929' }}>Select Country</option>
                {COUNTRIES.map(c => <option key={c} value={c} style={{ background: '#0a1929', color: '#fff' }}>{c}</option>)}
              </select>
              <svg style={{ position: 'absolute', right: 14, top: 'calc(50% + 10px)', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.4)' }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>

          {/* Row 3 — Date + Time */}
          <div className="waas-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={lbl}>Preferred Date</label>
              <CustomDatePicker value={form.date} onChange={v => set('date', v)} inputStyle={inp} />
            </div>
            <div>
              <label style={lbl}>Preferred Time</label>
              <CustomTimePicker value={form.time} onChange={v => set('time', v)} inputStyle={inp} />
            </div>
          </div>

          {/* Row 4 — Session Topic + Audience Size */}
          <div className="waas-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={lbl}>Session Topic <span style={{ color: '#f87171' }}>*</span></label>
              <input type="text" required placeholder="e.g. Prompt Engineering, Azure AI…" value={form.sessionTopic} onChange={e => set('sessionTopic', e.target.value)} style={inp} />
            </div>
            <div>
              <label style={lbl}>Expected Audience Size</label>
              <input type="number" min="1" placeholder="e.g. 50" value={form.audienceSize} onChange={e => set('audienceSize', e.target.value)} style={inp} />
            </div>
          </div>

          {/* Row 5 — Org Name */}
          <div style={{ marginBottom: 12 }}>
            <label style={lbl}>Organisation Name <span style={{ color: '#f87171' }}>*</span></label>
            <input type="text" required placeholder="Acme Corporation" value={form.orgName} onChange={e => set('orgName', e.target.value)} style={inp} />
          </div>

          {/* Notes */}
          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Additional Notes</label>
            <textarea rows={3} placeholder="Any specific goals, preferred language, or other details…"
              value={form.notes} onChange={e => set('notes', e.target.value)}
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
            Request Session →
          </button>
          <p style={{ textAlign: 'center', fontSize: 11.5, color: 'rgba(255,255,255,0.30)', marginTop: 10 }}>
            We&apos;ll respond within 1 business day · No spam, ever.
          </p>
        </form>

        <style>{`
          @media(max-width:600px){
            .waas-grid { grid-template-columns: 1fr !important; }
            .waas-form { padding: 20px 16px !important; }
          }
          .waas-form input[type="date"],
          .waas-form input[type="time"] {
            color-scheme: dark;
          }
          .waas-form input[type="date"]::-webkit-calendar-picker-indicator,
          .waas-form input[type="time"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
          }
        `}</style>
      </div>
    </section>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function WebinarServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg,#06111E 0%,#071828 55%,#061624 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle,#0694D1 0%,transparent 70%)' }} />
          <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle,#38bdf8 0%,transparent 70%)' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="waas-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 40, alignItems: 'center' }}>

            {/* ── Left: text ── */}
            <div>
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.35)', color: '#38bdf8' }}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
                Webinar as a Service (WaaS)
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white mb-3">
                Empower Your Teams with<br />
                <span style={{ color: '#38bdf8' }}>Tailored, Flexible Learning Sessions</span>
              </h1>
              <p className="text-sm sm:text-base mb-6" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7 }}>
                Enable Continuous Learning, Accelerate AI Adoption, and Simplify Team Upskilling
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <a href="#request"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: '#fff', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 0 24px rgba(6,148,209,0.45)' }}>
                  Request Session
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </a>
                <a href="#sessions"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: 10, padding: '12px 24px', fontWeight: 600, fontSize: 14, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                  Explore Top Sessions
                </a>
              </div>

            </div>

            {/* ── Right: pricing info card ── */}
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: '28px 24px', borderLeft: '4px solid #0694D1', border: '1px solid rgba(6,148,209,0.25)', borderLeftWidth: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.30)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(6,148,209,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#38bdf8" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1.3, margin: 0 }}>Pay Only for Engaged Attendees</h3>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: 0 }}>
                A flat rate of <span style={{ color: '#38bdf8', fontWeight: 600 }}>$10 per attendee</span> who stays engaged for more than <span style={{ color: '#38bdf8', fontWeight: 600 }}>50 minutes</span> and provides a high rating <span style={{ color: '#38bdf8', fontWeight: 600 }}>(above 4.4)</span>.
              </p>
            </div>

          </div>

          <style>{`
            @media (max-width: 1023px) {
              .waas-hero-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ── WHAT IS WaaS ─────────────────────────────────────────── */}
      <section style={{ background: '#f8fcff', padding: '48px 24px' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: '#0d1b2a' }}>
              What is Webinar as a Service?
            </h2>
            <p className="mt-3 text-sm" style={{ color: '#0694D1' }}>
              Structured, flexible learning sessions customized to meet your enterprise&apos;s unique learning objectives via:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="waas-feat-card rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                  <div className="waas-feat-icon" style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(6,148,209,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src={f.img} alt={f.title} style={{ width: 36, height: 36, objectFit: 'contain' }} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0d1b2a', lineHeight: 1.3, margin: 0 }}>{f.title}</h3>
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: '#4a6580', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <style>{`
            .waas-feat-card { transition: transform 0.25s ease, box-shadow 0.25s ease; cursor: default; }
            .waas-feat-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(6,148,209,0.15) !important; }
            .waas-feat-icon { transition: transform 0.25s ease; }
            .waas-feat-card:hover .waas-feat-icon { transform: scale(1.12); }
          `}</style>
        </div>
      </section>

      {/* ── REQUEST FORM ─────────────────────────────────────────── */}
      <WaasRequestForm />

      {/* ── WHY ENTERPRISES CHOOSE WaaS ──────────────────────────── */}
      <section style={{ background: 'linear-gradient(180deg,#eaf6fd 0%,#f8fcff 100%)', padding: '56px 24px' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#0d1b2a' }}>
              Why Enterprises Choose WaaS?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => (
              <div key={i} className="waas-ben-card rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #DCEEFB', boxShadow: '0 2px 16px rgba(6,148,209,0.08)' }}>
                <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img src={b.img} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.35s ease' }} className="waas-ben-img" />
                </div>
                <div style={{ padding: '16px 16px 20px', textAlign: 'center' }}>
                  <div style={{ background: '#e8f5fb', borderRadius: 8, padding: '8px 12px', marginBottom: 10 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0694D1', lineHeight: 1.35, margin: 0 }}>{b.title}</h3>
                  </div>
                  <p style={{ fontSize: 16, color: '#06111E', lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <style>{`
            .waas-ben-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
            .waas-ben-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(6,148,209,0.18), 0 0 0 1px rgba(6,148,209,0.20), 0 16px 40px rgba(6,148,209,0.12) !important; }
            .waas-ben-card:hover .waas-ben-img { transform: scale(1.05); }
          `}</style>
        </div>
      </section>

      {/* ── PRICING & HOW IT WORKS ───────────────────────────────── */}
      <section style={{ background: '#fff', padding: '56px 24px' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#0d1b2a' }}>
              Pricing &amp; How it Works
            </h2>
            <p className="mt-3" style={{ color: '#0694D1', fontSize: 16 }}>
              Koenig ensures you pay only for real engagement, keeping the pricing clear and effective:
            </p>
          </div>

          <div className="waas-pricing-grid" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}>
            {/* Left: photo — sits behind card right edge */}
            <div className="waas-pricing-img" style={{ flexShrink: 0, width: 380, borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', position: 'relative', zIndex: 0 }}>
              <img src="/images/webinar-service/waas3.png" alt="Webinar as a Service" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>

            {/* Right: steps card — slightly overlaps image left */}
            <div style={{ background: '#e8f5fb', borderRadius: 24, padding: '36px 32px 36px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 660, flexShrink: 0, marginLeft: -24, position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, justifyContent: 'center' }}>
                <img src="/images/webinar-service/was-icon6.png" alt="" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0d1b2a', margin: 0 }}>Simple Steps to Get Started</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: '/images/webinar-service/was-icon7.png',  title: 'Submit Your Request',  desc: 'Provide learning session details using our quick request form.' },
                  { icon: '/images/webinar-service/was-icon8.png',  title: 'Session Setup',         desc: 'We schedule and tailor the learning session based on your preferences.' },
                  { icon: '/images/webinar-service/was-icon10.png', title: 'Delivery & Reporting',  desc: 'Sessions are delivered seamlessly, and you receive detailed performance metrics and attendee feedback.' },
                ].map((step, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: 999, padding: '14px 24px 14px 14px', display: 'flex', alignItems: 'center', gap: 16, border: '1px solid #DCEEFB', boxShadow: '0 1px 6px rgba(6,148,209,0.06)' }}>
                    <div style={{ width: 54, height: 54, borderRadius: '50%', background: '#e8f5fb', border: '1.5px solid #c8e8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <img src={step.icon} alt="" style={{ width: 30, height: 30, objectFit: 'contain' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 700, color: '#0d1b2a', margin: '0 0 4px' }}>{step.title}</p>
                      <p style={{ fontSize: 13.5, color: '#4a6580', margin: 0, lineHeight: 1.55 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 767px) {
              .waas-pricing-grid { flex-direction: column !important; }
              .waas-pricing-img { width: 100% !important; height: 240px !important; order: 2; }
              .waas-pricing-grid > div:last-child { margin-left: 0 !important; margin-top: -20px; padding-left: 20px !important; border-radius: 20px !important; }
            }
            @media (min-width: 768px) and (max-width: 1023px) {
              .waas-pricing-img { width: 280px !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ── TOP SESSIONS ─────────────────────────────────────────── */}
      <section id="sessions" style={{ background: 'linear-gradient(180deg,#eaf6fd 0%,#f0f8ff 100%)', padding: '56px 24px' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#0d1b2a' }}>
              Our Top Custom Learning Sessions
            </h2>
            <p className="mt-3" style={{ fontSize: 18, color: '#0d1b2a' }}>Pick from our proven favorites-or tell us your own goal</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOP_SESSIONS.map((s, i) => (
              <div key={i} className="waas-session-card rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
                <div style={{ width: '100%', height: 160, overflow: 'hidden' }}>
                  <img src={s.img} alt={s.title} className="waas-session-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.35s ease' }} />
                </div>
                <div style={{ padding: '14px 14px 18px', textAlign: 'center' }}>
                  <div style={{ background: '#e8f5fb', borderRadius: 8, padding: '8px 12px', marginBottom: 10 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0694D1', margin: 0, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{s.title}</h3>
                  </div>
                  <p style={{ fontSize: 16, color: '#0d1b2a', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <style>{`
            .waas-session-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
            .waas-session-card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(6,148,209,0.15) !important; }
            .waas-session-card:hover .waas-session-img { transform: scale(1.05); }
          `}</style>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section style={{ background: '#f8fcff', padding: '48px 24px' }}>
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <span className="inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-3" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1', border: '1px solid rgba(6,148,209,0.20)' }}>
              FAQ
            </span>
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: '#0d1b2a' }}>Frequently Asked Questions</h2>
          </div>

          <div className="flex flex-col gap-2">
            {FAQS.map((f, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ border: '1px solid #DCEEFB', background: '#fff' }}>
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <span className="font-semibold text-sm" style={{ color: '#0d1b2a' }}>{f.q}</span>
                  <svg className="w-4 h-4 shrink-0 transition-transform" style={{ color: '#0694D1', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-xs leading-relaxed" style={{ color: '#4a6580', borderTop: '1px solid #DCEEFB' }}>
                    <div className="pt-3">{f.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg,#06111E 0%,#071828 100%)', padding: '48px 24px', textAlign: 'center' }}>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Ready to upskill your team with <span style={{ color: '#38bdf8' }}>zero risk?</span>
          </h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.50)' }}>
            Pay only for engaged learners. No upfront commitment. Sessions delivered by certified experts.
          </p>
          <a href="#request"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: '#fff', borderRadius: 10, padding: '14px 32px', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 0 32px rgba(6,148,209,0.50)' }}>
            Request Your First Session →
          </a>
          <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.30)' }}>
            info@koenig-solutions.com · +91-984-072-2417 (WhatsApp)
          </p>
        </div>
      </section>
    </div>
  )
}

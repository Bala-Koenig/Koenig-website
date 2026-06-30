'use client'
import React, { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'

/* ── Data ─────────────────────────────────────────────────────── */

const HERO_STATS = [
  { value: '$10',       label: 'Per Engaged Attendee',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/> },
  { value: '500+',      label: 'Enterprise Clients',
    icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></> },
  { value: '50+',       label: 'Countries Reached',
    icon: <><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/><line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round" strokeLinejoin="round"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></> },
  { value: '4.8★',      label: 'Avg Session Rating',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/> },
]

const FEATURES = [
  {
    title: 'Accelerated AI Adoption',
    desc: 'Quickly upskill your teams through targeted, regular AI learning sessions that boost innovation and keep your enterprise competitive.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>,
  },
  {
    title: 'Tailored, Contextual Learning',
    desc: 'Sessions customized to align precisely with your specific industry challenges, goals, and immediate priorities for maximum relevance.',
    icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></>,
  },
  {
    title: 'Global Accessibility & Flexibility',
    desc: 'Sessions conveniently scheduled across your global teams\' time zones, ensuring optimal participation and eliminating scheduling conflicts.',
    icon: <><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/><line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round" strokeLinejoin="round"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
  },
  {
    title: 'Streamlined Administration',
    desc: 'Effortless management through a dedicated platform for session requests, registrations, attendance tracking, and insightful feedback.',
    icon: <><rect x="3" y="3" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/><rect x="14" y="3" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/><rect x="14" y="14" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="14" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/></>,
  },
  {
    title: 'Employee-Driven Engagement',
    desc: 'Foster a learner-first culture by organizing exclusive learning sessions based directly on employee requests and feedback.',
    icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></>,
  },
  {
    title: 'Performance-Based Pricing',
    desc: 'Pay only for attendees who remain engaged and provide high-quality feedback, ensuring guaranteed ROI and accountability.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>,
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
    desc: 'Sessions delivered by professional, certified instructors ensuring your teams receive high-quality, accurate, and expert knowledge.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>,
  },
  {
    title: 'Live Interactive Q&A',
    desc: 'Attendees get their specific questions answered in real-time, enhancing understanding and practical application.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>,
  },
  {
    title: 'Scalable & Cost-Effective',
    desc: 'Flexible, scalable training initiatives without upfront risk — costs linked directly to measurable engagement and value.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>,
  },
  {
    title: 'Talent Attraction & Retention',
    desc: 'Position your enterprise as an attractive employer by providing consistent learning opportunities that attract and retain top talent.',
    icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></>,
  },
]

const TOP_SESSIONS = [
  { title: 'Kickstart Your Copilot Studio Journey',      desc: 'Build and deploy AI copilots that integrate seamlessly into your development workflows.' },
  { title: 'Innovate with Generative AI',                desc: 'Automate content, prototypes, and data workflows to free your team for high-value work.' },
  { title: 'Mastering Prompt Engineering',               desc: 'Craft precise prompts to unlock the full potential of ChatGPT and large language models.' },
  { title: 'Drive Decisions with Excel BI',              desc: 'Create dynamic dashboards and reports — turn raw data into strategic insights in minutes.' },
  { title: 'Email Etiquette for Professionals',          desc: 'Write clear, concise emails that command attention and drive faster responses.' },
  { title: 'Cybersecurity Made Simple',                  desc: 'Master the fundamentals: passwords, secure sharing, safeguard your org without the jargon.' },
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
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                style={{ ...inp, colorScheme: 'dark' }} />
            </div>
            <div>
              <label style={lbl}>Preferred Time</label>
              <input type="time" value={form.time} onChange={e => set('time', e.target.value)}
                style={{ ...inp, colorScheme: 'dark' }} />
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

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {HERO_STATS.map(s => (
                  <div key={s.label} className="rounded-xl p-3 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="shrink-0 rounded-lg flex items-center justify-center w-9 h-9" style={{ background: 'rgba(6,148,209,0.15)' }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#38bdf8" strokeWidth={1.8}>{s.icon}</svg>
                    </div>
                    <div>
                      <p className="text-base font-bold text-white leading-none">{s.value}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: pricing info card ── */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '28px 24px', borderLeft: '4px solid #0694D1', boxShadow: '0 8px 32px rgba(6,148,209,0.18)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(6,148,209,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0d1b2a', lineHeight: 1.3, margin: 0 }}>Pay Only for Engaged Attendees</h3>
              </div>
              <p style={{ fontSize: 14, color: '#4a6580', lineHeight: 1.75, margin: '0 0 20px' }}>
                A flat rate of <span style={{ color: '#0694D1', fontWeight: 600 }}>$10 per attendee</span> who stays engaged for more than <span style={{ color: '#0694D1', fontWeight: 600 }}>50 minutes</span> and provides a high rating <span style={{ color: '#0694D1', fontWeight: 600 }}>(above 4.4)</span>.
              </p>
              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {HERO_STATS.map(s => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#06111E', borderRadius: 10, padding: '12px 14px' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(6,148,209,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#38bdf8" strokeWidth={1.8}>{s.icon}</svg>
                    </div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1, margin: 0 }}>{s.value}</p>
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.50)', marginTop: 3, lineHeight: 1.3 }}>{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
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
            <span className="inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-3" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1', border: '1px solid rgba(6,148,209,0.20)' }}>
              What is WaaS?
            </span>
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: '#0d1b2a' }}>
              Six Reasons Enterprises Choose <span style={{ color: '#0694D1' }}>Webinar as a Service</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(6,148,209,0.10)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth={1.8}>{f.icon}</svg>
                </div>
                <h3 className="font-bold text-sm mb-1.5" style={{ color: '#0d1b2a' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#4a6580' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section style={{ background: '#06111E', padding: '48px 24px' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <span className="inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-3" style={{ background: 'rgba(6,148,209,0.15)', color: '#38bdf8', border: '1px solid rgba(6,148,209,0.30)' }}>
              How It Works
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Koenig ensures you pay only for <span style={{ color: '#38bdf8' }}>real engagement</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {HOW_STEPS.map((s, i) => (
              <div key={i} className="rounded-2xl p-5 relative" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.20)' }}>
                <div className="text-4xl font-black mb-3 leading-none" style={{ color: 'rgba(6,148,209,0.15)', letterSpacing: -2 }}>{s.step}</div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(6,148,209,0.15)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#38bdf8" strokeWidth={1.8}>{s.icon}</svg>
                </div>
                <h3 className="font-bold text-sm text-white mb-1.5">{s.title}</h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.50)' }}>{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(t => (
                    <span key={t} className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'rgba(6,148,209,0.15)', color: '#38bdf8', border: '1px solid rgba(6,148,209,0.25)' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUEST FORM ─────────────────────────────────────────── */}
      <WaasRequestForm />

      {/* ── WHY ENTERPRISES CHOOSE WaaS ──────────────────────────── */}
      <section style={{ background: '#f8fcff', padding: '48px 24px' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <span className="inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-3" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1', border: '1px solid rgba(6,148,209,0.20)' }}>
              Why Choose WaaS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: '#0d1b2a' }}>
              Why Enterprises Choose <span style={{ color: '#0694D1' }}>Koenig WaaS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BENEFITS.map((b, i) => (
              <div key={i} className="rounded-2xl p-5 flex gap-4" style={{ background: '#fff', border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(6,148,209,0.10)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth={1.8}>{b.icon}</svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: '#0d1b2a' }}>{b.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#4a6580' }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP SESSIONS ─────────────────────────────────────────── */}
      <section id="sessions" style={{ background: '#06111E', padding: '48px 24px' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <span className="inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-3" style={{ background: 'rgba(6,148,209,0.15)', color: '#38bdf8', border: '1px solid rgba(6,148,209,0.30)' }}>
              Popular Sessions
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Our Top Custom <span style={{ color: '#38bdf8' }}>Learning Sessions</span>
            </h2>
            <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>Pick from our proven favourites — or tell us your own goal</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {TOP_SESSIONS.map((s, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.20)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 text-sm font-bold" style={{ background: 'rgba(6,148,209,0.15)', color: '#38bdf8' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-bold text-sm text-white mb-1.5">{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="#request"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: '#fff', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 0 24px rgba(6,148,209,0.40)' }}>
              Request a Custom Session →
            </a>
          </div>
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

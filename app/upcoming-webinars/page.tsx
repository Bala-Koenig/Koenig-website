'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

/* ── Hero stats ─────────────────────────────────────────────── */
const HERO_STATS = [
  { value: '3,000+',   label: 'Webinars Conducted' },
  { value: '150,000+', label: 'Learners Served' },
]

/* ── Trust badges ───────────────────────────────────────────── */
const TRUST_BADGES = ['Free Webinar', 'Industry Experts', 'Certificate of Attendance', 'Live Q&A']

/* ── Webinar data ───────────────────────────────────────────── */
const WEBINARS = [
  {
    id: 1,
    speaker: 'Aayushi Maheshwari',
    initials: 'AM',
    avatarBg: 'linear-gradient(135deg,#0694D1,#38bdf8)',
    title: 'Information Security Governance – From Strategy To Execution',
    partner: 'PECB',
    technology: 'Security',
    date: '11 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 2,
    live: true,
  },
  {
    id: 2,
    speaker: 'Piyushi Mundhir',
    initials: 'PM',
    avatarBg: 'linear-gradient(135deg,#093148,#076D9D)',
    title: 'Mastering Payroll Schema 8 PCE to SAP HCM – From Basics to Real Time',
    partner: 'SAP',
    technology: 'ERP',
    date: '11 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 1,
    live: false,
  },
  {
    id: 3,
    speaker: 'Balajishekara Badri',
    initials: 'BB',
    avatarBg: 'linear-gradient(135deg,#F47920,#f6a05c)',
    title: 'Why Your App Works On Your Laptop But Fails In Production (Containers Explained)',
    partner: 'Docker',
    technology: 'DevOps',
    date: '11 Jun 2026',
    time: '03:30 PM IST',
    duration: '1 Hour',
    registered: 1,
    live: false,
  },
  {
    id: 4,
    speaker: 'Bhuvam Bhatia',
    initials: 'BB',
    avatarBg: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
    title: 'Introduction to ISO 27035',
    partner: 'PECB',
    technology: 'Security',
    date: '11 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 1,
    live: false,
  },
  {
    id: 5,
    speaker: 'Sonia McAnaya',
    initials: 'SM',
    avatarBg: 'linear-gradient(135deg,#0694D1,#076D9D)',
    title: 'Microsoft Power Platform Fundamentals For Non Developers',
    partner: 'Microsoft',
    technology: 'Microsoft',
    date: '11 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 1,
    live: false,
  },
  {
    id: 6,
    speaker: 'Nidhi Karthik Nagale',
    initials: 'NK',
    avatarBg: 'linear-gradient(135deg,#34A853,#076D9D)',
    title: 'Work Smarter With Microsoft 365 Copilot',
    partner: 'Microsoft',
    technology: 'Microsoft',
    date: '11 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 1,
    live: false,
  },
  {
    id: 7,
    speaker: 'Lydia Chaveau',
    initials: 'LC',
    avatarBg: 'linear-gradient(135deg,#EC4899,#8B5CF6)',
    title: 'Microsoft AI Certification Fundamentals Series: AI 900 To AI Engineer Roadmap',
    partner: 'Microsoft',
    technology: 'AI',
    date: '11 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 79,
    live: false,
  },
  {
    id: 8,
    speaker: 'Sachin Kumar',
    initials: 'SK',
    avatarBg: 'linear-gradient(135deg,#0694D1,#0F172A)',
    title: 'DP-600: Implement Real Time Analytics With Microsoft Fabric',
    partner: 'Microsoft',
    technology: 'Data',
    date: '11 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 1,
    live: false,
  },
  {
    id: 9,
    speaker: 'Bhavani Singh Thakur',
    initials: 'BS',
    avatarBg: 'linear-gradient(135deg,#F59E0B,#B45309)',
    title: 'Mastering SAP LAN & The 9 HANA 9 Phase Maintenance Model',
    partner: 'SAP',
    technology: 'ERP',
    date: '11 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 1,
    live: false,
  },
  {
    id: 10,
    speaker: 'K M Shukla',
    initials: 'KS',
    avatarBg: 'linear-gradient(135deg,#065F46,#10B981)',
    title: 'PostgreSQL Database Administration',
    partner: 'PostgreSQL',
    technology: 'Database',
    date: '11 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 1,
    live: false,
  },
  {
    id: 11,
    speaker: 'Waqed Kumar',
    initials: 'WK',
    avatarBg: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
    title: 'Workflow Management Using Java And Spring Boot',
    partner: 'Java',
    technology: 'Development',
    date: '11 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 2,
    live: false,
  },
  {
    id: 12,
    speaker: 'Akash Rao',
    initials: 'AR',
    avatarBg: 'linear-gradient(135deg,#DC2626,#F97316)',
    title: 'AI Driven Generative Design And Smart Manufacturing With Fusion 360',
    partner: 'Autodesk',
    technology: 'AI',
    date: '11 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 4,
    live: false,
  },
  {
    id: 13,
    speaker: 'Sadhika Choubhan',
    initials: 'SC',
    avatarBg: 'linear-gradient(135deg,#0694D1,#7c3aed)',
    title: 'Designing Microsoft AI Agents With Copilot Studio – From Idea To Impact',
    partner: 'Microsoft',
    technology: 'AI',
    date: '11 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 20,
    live: false,
  },
]

/* ── Partner badge colors ────────────────────────────────────── */
const PARTNER_COLORS: Record<string, { bg: string; text: string }> = {
  'Microsoft': { bg: 'rgba(6,148,209,0.12)',   text: '#0694D1' },
  'SAP':       { bg: 'rgba(247,148,29,0.12)',   text: '#F7941D' },
  'PECB':      { bg: 'rgba(30,116,201,0.12)',   text: '#1E74C9' },
  'Docker':    { bg: 'rgba(13,183,237,0.12)',   text: '#0DB7ED' },
  'Java':      { bg: 'rgba(237,126,44,0.12)',   text: '#ED7E2C' },
  'PostgreSQL':{ bg: 'rgba(51,103,145,0.12)',   text: '#336791' },
  'Autodesk':  { bg: 'rgba(0,97,184,0.12)',     text: '#0061B8' },
}
const getPC = (p: string) => PARTNER_COLORS[p] ?? { bg: 'rgba(6,148,209,0.12)', text: '#0694D1' }

/* ── FAQs ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How can I register for a webinar?',
    a: 'You can visit our webinar listing page to browse upcoming sessions, click on "Register" for the session you\'re interested in, and submit the form available on the webinar registration page.',
  },
  {
    q: 'Who conducts the webinars?',
    a: 'Our webinars are conducted by industry-certified experts and experienced trainers from Koenig Solutions with real-world experience in their respective domains.',
  },
  {
    q: 'What topics are covered in the webinars?',
    a: 'We cover a wide range of topics including Cloud Computing (AWS, Azure), Cybersecurity, SAP, Microsoft 365, AI & Machine Learning, DevOps, Project Management, and much more.',
  },
  {
    q: 'Are the webinars live or recorded?',
    a: 'All webinars are conducted live, allowing you to interact with the speaker in real-time. Recordings may be available after the session depending on the webinar type.',
  },
  {
    q: 'Will I receive a certificate for attending?',
    a: 'Yes, attendees who complete the full webinar session are eligible to receive a Certificate of Attendance from Koenig Solutions.',
  },
  {
    q: 'What should I do if I don\'t receive the LET credentials email even after filling out the feedback form?',
    a: 'If you haven\'t received your credentials within 24 hours of filling out the feedback form, please contact our support team at support@koenig-solutions.com or reach out via live chat.',
  },
  {
    q: 'Can I ask questions during the webinar?',
    a: 'Absolutely! Each webinar includes a dedicated Live Q&A session where you can interact directly with the speaker and get your questions answered.',
  },
  {
    q: 'How do I get access to the recording of the session?',
    a: 'Registered attendees may receive access to the recording after the session. Check your registered email for the recording link, usually sent within 24–48 hours after the webinar.',
  },
  {
    q: 'Are these webinars suitable for beginners?',
    a: 'Yes, many of our webinars are designed for all experience levels. Each webinar listing specifies the target audience, so you can choose sessions that match your current skill level.',
  },
  {
    q: 'How do I contact Koenig Solutions for further queries?',
    a: 'You can reach our team at +91-9811-72-9494 (Chat Only), email us at info@koenig-solutions.com, or use the live chat option on our website.',
  },
]

/* ─────────────────────────────────────────────────────────────── */
export default function UpcomingWebinarsPage() {
  const [openFaq, setOpenFaq]           = useState<number | null>(null)
  const [searchQuery, setSearchQuery]   = useState('')
  const [filterTech, setFilterTech]     = useState('All')
  const [filterPartner, setFilterPartner] = useState('All')
  const [showAll, setShowAll]           = useState(false)

  const allTechs    = ['All', ...Array.from(new Set(WEBINARS.map(w => w.technology)))]
  const allPartners = ['All', ...Array.from(new Set(WEBINARS.map(w => w.partner)))]

  const filtered = WEBINARS.filter(w => {
    const q = searchQuery.toLowerCase()
    return (
      (w.title.toLowerCase().includes(q) || w.speaker.toLowerCase().includes(q)) &&
      (filterTech    === 'All' || w.technology === filterTech) &&
      (filterPartner === 'All' || w.partner    === filterPartner)
    )
  })

  const displayed = showAll ? filtered : filtered.slice(0, 9)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home',            item: 'https://www.koenig-solutions.com' },
              { '@type': 'ListItem', position: 2, name: 'Learning Options', item: 'https://www.koenig-solutions.com/learning-options' },
              { '@type': 'ListItem', position: 3, name: 'Upcoming Webinars', item: 'https://www.koenig-solutions.com/upcoming-webinars' },
            ],
          }),
        }}
      />

      <Navbar />

      {/* ════════════════ HERO ════════════════ */}
      <section
        aria-label="Upcoming Webinars Hero"
        style={{ background: 'linear-gradient(135deg, #06111E 0%, #071828 55%, #061624 100%)', position: 'relative', overflow: 'hidden' }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-[0.07]"  style={{ background: 'radial-gradient(circle, #0694D1 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full opacity-[0.05]"   style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #0694D1 0%, transparent 70%)' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-5 lg:py-[50px]">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── Left copy ── */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.35)', color: '#38bdf8' }}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                Free · Expert-Led · Live Q&A Included
              </div>

              <h1 className="text-[36px] font-bold leading-tight text-white mb-5">
                Join Our <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Free Expert Webinars</span><br />
                Learn, Grow &amp; Get Certified
              </h1>

              <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.70)' }}>
                Attend live sessions led by industry-certified experts. Ask questions in real-time, earn a certificate of attendance, and stay ahead in your tech career — all at zero cost.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                {HERO_STATS.map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="text-xl font-black" style={{ color: '#38bdf8' }}>{s.value}</span>
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                {TRUST_BADGES.map(text => (
                  <span key={text} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                    style={{ background: 'rgba(6,148,209,0.13)', border: '1px solid rgba(6,148,209,0.32)', color: '#38bdf8' }}>
                    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {text}
                  </span>
                ))}
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.60)' }}>
                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Join our LinkedIn Group for daily updates –{' '}
                <a href="https://www.linkedin.com/company/koenig-solutions/"
                  className="font-semibold underline underline-offset-2 hover:text-white transition-colors"
                  style={{ color: '#38bdf8' }}>
                  Join Here
                </a>
              </div>
            </div>

            {/* ── Right: video (desktop) ── */}
            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-2xl"
                style={{ border: '1.5px solid rgba(6,148,209,0.50)', boxShadow: '0 0 0 4px rgba(6,148,209,0.08), 0 0 30px 6px rgba(6,148,209,0.22), 0 8px 40px rgba(6,109,157,0.28)' }}>
                <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                  {/* Replace VIDEO_ID below with the YouTube video ID from koenig-solutions.com/upcoming-webinars */}
                  <iframe
                    src="https://www.youtube.com/embed/B2ezhvq1ito?rel=0&autoplay=1&mute=1&loop=1&playlist=B2ezhvq1ito&enablejsapi=1"
                    title="Welcome to Koenig Webinars"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* ── Mobile stats row ── */}
            <div className="lg:hidden grid grid-cols-2 gap-2 mt-2">
              {HERO_STATS.map(s => (
                <div key={s.label} className="flex flex-col items-center justify-center rounded-xl py-3 px-2"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(6,148,209,0.30)' }}>
                  <span className="text-lg font-black leading-none" style={{ color: '#38bdf8' }}>{s.value}</span>
                  <span className="text-xs font-medium mt-0.5 text-center leading-tight" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* ── Mobile video ── */}
            <div className="lg:hidden">
              <div className="overflow-hidden rounded-xl"
                style={{ border: '1px solid rgba(6,148,209,0.40)', boxShadow: '0 4px 24px rgba(6,148,209,0.20)' }}>
                <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src="https://www.youtube.com/embed/B2ezhvq1ito?rel=0&autoplay=1&mute=1&loop=1&playlist=B2ezhvq1ito&enablejsapi=1"
                    title="Welcome to Koenig Webinars"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════ STREAMING LIVE BANNER ════════════════ */}
      <div style={{ background: 'linear-gradient(90deg,#053148 0%,#071828 50%,#053148 100%)', borderBottom: '1px solid rgba(6,148,209,0.25)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shrink-0"
                style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.40)', color: '#ef4444' }}>
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                Streaming Live
              </span>
              <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Information Security Governance – From Strategy To Execution
              </span>
            </div>
            <a href="#webinar-listings"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 2px 12px rgba(6,148,209,0.35)' }}>
              Join Now →
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════ SUBSCRIBE BAR ════════════════ */}
      <div style={{ background: '#EBF8FE', borderBottom: '1px solid #CAEFFF' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-sm font-semibold text-center sm:text-left shrink-0" style={{ color: '#0d1b2a' }}>
              Subscribe for updates on our Upcoming Webinars
            </p>
            <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full sm:w-64 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30"
                style={{ borderColor: '#CAEFFF', background: 'white', color: '#0d1b2a' }}
              />
              <button className="shrink-0 rounded-lg px-4 py-2 text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════ WEBINAR LISTINGS ════════════════ */}
      <section id="webinar-listings" aria-labelledby="webinars-heading" className="py-10" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">

          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 id="webinars-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Register Now for our{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg,#0694D1,#38bdf8)' }}>
                Upcoming Webinars
              </span>
            </h2>
          </div>

          {/* Search & Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[160px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search Course"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30"
                style={{ borderColor: '#CAEFFF', background: 'white', color: '#0d1b2a' }}
              />
            </div>
            <select value={filterTech} onChange={e => setFilterTech(e.target.value)}
              className="rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30"
              style={{ borderColor: '#CAEFFF', background: 'white', color: '#465058' }}>
              {allTechs.map(t => (
                <option key={t} value={t}>{t === 'All' ? 'Filter by Technology' : t}</option>
              ))}
            </select>
            <select value={filterPartner} onChange={e => setFilterPartner(e.target.value)}
              className="rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30"
              style={{ borderColor: '#CAEFFF', background: 'white', color: '#465058' }}>
              {allPartners.map(p => (
                <option key={p} value={p}>{p === 'All' ? 'Filter by Partner' : p}</option>
              ))}
            </select>
          </div>

          {/* Cards */}
          {displayed.length === 0 ? (
            <div className="py-16 text-center text-sm" style={{ color: '#64748b' }}>No webinars match your filters.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayed.map(w => {
                const pc = getPC(w.partner)
                return (
                  <article key={w.id}
                    className="flex flex-col overflow-hidden rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{ border: '1px solid #CAEFFF', boxShadow: '0 4px 16px rgba(0,164,239,0.08)' }}>

                    <div className="flex-1 flex flex-col p-5">
                      {/* Speaker row */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="relative shrink-0">
                          <div className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md"
                            style={{ background: w.avatarBg, border: '2px solid rgba(6,148,209,0.20)' }}>
                            {w.initials}
                          </div>
                          {w.live && (
                            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-sm font-bold leading-snug truncate" style={{ color: '#0d1b2a' }}>{w.speaker}</p>
                          <span className="mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold"
                            style={{ background: pc.bg, color: pc.text }}>
                            {w.partner}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-4 text-sm font-bold leading-snug flex-1" style={{ color: '#0F172A' }}>
                        {w.title}
                      </h3>

                      {/* Meta */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs" style={{ color: '#465058' }}>
                          <span className="flex items-center gap-1.5">
                            <svg className="h-3.5 w-3.5 shrink-0" style={{ color: '#0694D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            {w.date} | {w.time}
                          </span>
                          <span className="flex items-center gap-1" style={{ color: '#0694D1' }}>
                            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/>
                            </svg>
                            {w.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: '#64748b' }}>
                          <svg className="h-3.5 w-3.5 shrink-0" style={{ color: '#0694D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          {w.registered} Registered
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t px-5 py-3"
                      style={{ borderColor: '#EBF8FE', background: '#F8FCFF' }}>
                      <button className="text-xs font-semibold transition-colors hover:text-[#0694D1]" style={{ color: '#465058' }}>
                        Show More &rsaquo;
                      </button>
                      <button className="rounded-lg px-4 py-1.5 text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
                        style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 2px 8px rgba(6,148,209,0.30)' }}>
                        Register
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {/* Show All */}
          {!showAll && filtered.length > 9 && (
            <div className="mt-10 text-center">
              <button onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 rounded-xl border-2 px-8 py-3 text-sm font-bold transition-all hover:bg-[#0694D1] hover:text-white hover:border-[#0694D1]"
                style={{ borderColor: '#0694D1', color: '#0694D1' }}>
                Show All
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════ FAQ ════════════════ */}
      <section aria-labelledby="faq-heading" className="py-12 bg-white">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="mb-10 text-center">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
              Frequently Asked{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{ border: openFaq === i ? '1.5px solid rgba(6,148,209,0.4)' : '1.5px solid #e2e8f0', boxShadow: openFaq === i ? '0 4px 20px rgba(6,148,209,0.08)' : 'none' }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between px-6 py-5 text-left gap-4 transition-colors"
                  style={{ background: openFaq === i ? 'rgba(6,148,209,0.04)' : '#ffffff' }}
                >
                  <span className="text-base font-semibold text-[#0F172A]">{faq.q}</span>
                  <span
                    className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200"
                    style={{ background: openFaq === i ? '#0694D1' : '#f1f5f9', color: openFaq === i ? '#ffffff' : '#64748b', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5" style={{ background: 'rgba(6,148,209,0.02)' }}>
                    <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm" style={{ color: '#94a3b8' }}>
            Still have questions?{' '}
            <a href="mailto:info@koenig-solutions.com" className="font-semibold hover:underline" style={{ color: '#0694D1' }}>
              Email us at info@koenig-solutions.com
            </a>
          </p>
        </div>
      </section>
    </>
  )
}

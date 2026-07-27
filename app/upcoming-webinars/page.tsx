'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { WEBINARS, PARTNER_LOGOS } from './data'

/* ── Hero stats ─────────────────────────────────────────────── */
const HERO_STATS = [
  { value: '3,000+',   label: 'Webinars Conducted', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"/> },
  { value: '150,000+', label: 'Learners Served',    icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></> },
]

/* ── Trust badges ───────────────────────────────────────────── */
const TRUST_BADGES = [
  {
    label: 'Free Webinar',
    icon: (
      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    label: 'Industry Experts',
    icon: (
      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
      </svg>
    ),
  },
  {
    label: 'Certificate of Attendance',
    icon: (
      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
  },
  {
    label: 'Live Q&A',
    icon: (
      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
    ),
  },
]

/* ── FAQs ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How do I register for a webinar?',
    a: <>You can visit our <a href="/upcoming-webinars" target="_blank" className="text-koenig-blue underline hover:opacity-80">webinar landing page</a> to browse upcoming sessions, click on &ldquo;Register&rdquo; for the session you&apos;re interested in, and submit the form available on the webinar registration page.</>,
  },
  {
    q: 'Who conducts the webinars?',
    a: 'Our webinars are conducted by industry and subject-matter experts, often in collaboration with trainers and professionals from leading organizations. This ensures you gain insights from top practitioners in the field.',
  },
  {
    q: 'What topics are covered in the webinars?',
    a: <>We cover a variety of topics, including emerging technologies, software development, data analytics, cybersecurity, project management, and more. Visit our <a href="/upcoming-webinars" target="_blank" className="text-koenig-blue underline hover:opacity-80">webinar page</a> to explore the full range of topics.</>,
  },
  {
    q: 'Are the webinars live or recorded?',
    a: 'Our webinars are always conducted live with our expert trainer to ensure interactive learning and real-time engagement.',
  },
  {
    q: 'Will I receive a certificate for attending?',
    a: 'Yes, attendees who complete the full webinar session are eligible to receive a Certificate of Attendance from Koenig Solutions.',
  },
  {
    q: 'What should I do if I don\'t receive the LET credentials email even after filling out the feedback form?',
    a: <>If you haven&apos;t received the email, please reach out to us at <a href="mailto:webinars@koenig-solutions.com" className="text-koenig-blue underline hover:opacity-80">webinars@koenig-solutions.com</a>, and our team will assist you.</>,
  },
  {
    q: 'Can I ask questions during the webinar?',
    a: 'Absolutely! Each webinar includes a dedicated Q&A session where you can ask questions and get answers directly from the experts.',
  },
  {
    q: 'How do I get access to the recording of the session?',
    a: 'Learners can receive the video recording of the session for a small amount. A participation certificate & a digital Credly badge is also provided as part of the bundle. Learners can make the payment by logging into LET and clicking on the "Access Badge & Certificate" button.',
  },
  {
    q: 'Are these webinars suitable for beginners?',
    a: <>Yes, we offer webinars for all skill levels. Check the session details on our <a href="/upcoming-webinars" target="_blank" className="text-koenig-blue underline hover:opacity-80"> landing page</a> to find the most suitable topics for you.</>,
  },
  {
    q: 'How do I contact Koenig Solutions for further queries?',
    a: <>For any questions, you can email us at <a href="mailto:webinars@koenig-solutions.com" className="text-koenig-blue underline hover:opacity-80">webinars@koenig-solutions.com</a>.</>,
  },
]

function parseWebinarMs(date: string, time: string): number {
  return new Date(`${date} ${time.replace(' IST', '')} GMT+0530`).getTime()
}

/* ─────────────────────────────────────────────────────────────── */
export default function UpcomingWebinarsPage() {
  const [openFaq, setOpenFaq]           = useState<number | null>(null)
  const [searchQuery, setSearchQuery]   = useState('')
  const [filterTechs, setFilterTechs]       = useState<Set<string>>(new Set())
  const [filterPartners, setFilterPartners] = useState<Set<string>>(new Set())
  const [showAll, setShowAll]           = useState(false)
  const [showMoreMobile, setShowMoreMobile] = useState(false)
  const [modalWebinar, setModalWebinar]   = useState<typeof WEBINARS[0] | null>(null)
  const [regWebinar, setRegWebinar]       = useState<typeof WEBINARS[0] | null>(null)
  const [regEmail, setRegEmail]           = useState('')
  const [regName, setRegName]             = useState('')
  const [regSubmitted, setRegSubmitted]   = useState(false)
  const [sortBy, setSortBy]               = useState('All Webinar')
  const [sortOpen, setSortOpen]           = useState(false)
  const [techOpen, setTechOpen]           = useState(false)
  const [techSearch, setTechSearch]       = useState('')
  const [partnerOpen, setPartnerOpen]     = useState(false)
  const [partnerSearch, setPartnerSearch] = useState('')
  const [subConfirm, setSubConfirm]       = useState(false)
  const [showAllFaqs, setShowAllFaqs]     = useState(false)
  const [wbFilterOpen, setWbFilterOpen]   = useState(false)
  const [wbFilterCat, setWbFilterCat]     = useState<'tech'|'partner'>('tech')
  const [pendingTechs, setPendingTechs]       = useState<Set<string>>(new Set())
  const [pendingPartners, setPendingPartners] = useState<Set<string>>(new Set())
  const [now, setNow] = useState<number>(0)
  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 60000)
    return () => clearInterval(id)
  }, [])

  const allTechs    = ['All', ...Array.from(new Set(WEBINARS.map(w => w.technology))).filter(t => t !== 'Microsoft').sort((a, b) => a.localeCompare(b))]
  const allPartners = ['All', ...Array.from(new Set(WEBINARS.map(w => w.partner))).sort((a, b) => a.localeCompare(b))]

  const filtered = WEBINARS.filter(w => {
    const q = searchQuery.toLowerCase()
    return (
      (w.title.toLowerCase().includes(q) || w.speaker.toLowerCase().includes(q)) &&
      (filterTechs.size === 0    || filterTechs.has(w.technology)) &&
      (filterPartners.size === 0 || filterPartners.has(w.partner))
    )
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Latest Webinars') return new Date(a.date).getTime() - new Date(b.date).getTime()
    if (sortBy === 'Most Popular')    return b.registered - a.registered
    return 0
  })
  const displayed = showAll ? sorted : sorted.slice(0, 15)

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
        <style>{`
          @keyframes floatUp   { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(4deg)} }
          @keyframes floatDown { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(14px) rotate(-3deg)} }
          @keyframes pulseFade { 0%,100%{opacity:0.10} 50%{opacity:0.22} }
          @keyframes spinSlow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes ripple    { 0%{transform:scale(1);opacity:0.18} 100%{transform:scale(2.2);opacity:0} }
        `}</style>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Sky blue glow orbs */}
          <div className="absolute" style={{ top: '-10%', left: '-5%', width: '55%', height: '80%', background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.13) 0%, rgba(6,148,209,0.06) 45%, transparent 70%)', filter: 'blur(40px)' }} />
          <div className="absolute" style={{ top: '20%', right: '-8%', width: '45%', height: '70%', background: 'radial-gradient(ellipse at center, rgba(6,148,209,0.12) 0%, rgba(56,189,248,0.05) 50%, transparent 70%)', filter: 'blur(50px)' }} />
          <div className="absolute" style={{ bottom: '-5%', left: '35%', width: '40%', height: '50%', background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.09) 0%, transparent 65%)', filter: 'blur(35px)' }} />
          {/* Floating webinar icons */}
          {[
            /* video camera */ { x:'8%',  y:'18%', delay:'0s',   dur:'6s',  anim:'floatUp',   size:38, paths:[<path key="a" strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>] },
            /* mic */          { x:'85%', y:'12%', delay:'1s',   dur:'7s',  anim:'floatDown', size:34, paths:[<path key="b" strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 3a4 4 0 014 4v4a4 4 0 01-8 0V7a4 4 0 014-4z"/>] },
            /* chat bubble */  { x:'72%', y:'55%', delay:'2s',   dur:'8s',  anim:'floatUp',   size:32, paths:[<path key="c" strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>] },
            /* screen share */ { x:'20%', y:'70%', delay:'0.5s', dur:'9s',  anim:'floatDown', size:36, paths:[<path key="d" strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>] },
            /* play circle */  { x:'50%', y:'20%', delay:'1.5s', dur:'5s',  anim:'floatUp',   size:40, paths:[<path key="e" strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>, <path key="f" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>] },
            /* users */        { x:'90%', y:'72%', delay:'3s',   dur:'7s',  anim:'floatDown', size:33, paths:[<path key="g" strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>] },
            /* wifi */         { x:'38%', y:'80%', delay:'2.5s', dur:'6s',  anim:'floatUp',   size:30, paths:[<path key="h" strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>] },
            /* certificate */  { x:'60%', y:'78%', delay:'4s',   dur:'8s',  anim:'floatDown', size:34, paths:[<path key="i" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>] },
            /* globe */        { x:'4%',  y:'60%', delay:'3.5s', dur:'10s', anim:'floatUp',   size:32, paths:[<path key="j" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>] },
          ].map((item, i) => (
            <div key={i} className="absolute" style={{ left: item.x, top: item.y, animation: `${item.anim} ${item.dur} ease-in-out ${item.delay} infinite` }}>
              <div className="relative flex items-center justify-center rounded-2xl"
                style={{ width: item.size+16, height: item.size+16, background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(56,189,248,0.12)', animation: `pulseFade 4s ease-in-out ${item.delay} infinite` }}>
                <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {item.paths}
                </svg>
              </div>
            </div>
          ))}
          {/* Ripple rings on two icons */}
          {[{ x:'50%', y:'20%' }, { x:'8%', y:'18%' }].map((pos, i) => (
            <div key={i} className="absolute rounded-full" style={{ left: pos.x, top: pos.y, width: 56, height: 56, marginLeft: -28, marginTop: -28, border: '1px solid rgba(56,189,248,0.25)', animation: `ripple 3s ease-out ${i * 1.5}s infinite` }} />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-[20px] sm:py-8 lg:py-[50px]">
          <div className="grid lg:grid-cols-2 gap-[15px] lg:gap-16 items-center">

            {/* ── Left copy ── */}
            <div>
              <style>{`
                @keyframes heroTitleSweep {
                  0%   { background-position: 0% 50% }
                  50%  { background-position: 100% 50% }
                  100% { background-position: 0% 50% }
                }
                .hero-title-sweep {
                  background: linear-gradient(270deg, #ffffff, #38bdf8, #0694D1, #38bdf8, #ffffff);
                  background-size: 300% 300%;
                  animation: heroTitleSweep 5s ease infinite;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                }
              `}</style>
              <h1 className="hero-title-sweep text-[21px] sm:text-[32px] lg:text-[36px] font-bold leading-tight mb-[15px] sm:mb-5">
                Join Our Free Expert Webinars<br />
                Learn, Grow &amp; Get Certified
              </h1>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-[15px] sm:mb-6">
                {TRUST_BADGES.map(badge => (
                  <span key={badge.label} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                    style={{ background: 'rgba(6,148,209,0.13)', border: '1px solid rgba(6,148,209,0.32)', color: '#38bdf8' }}>
                    {badge.icon}
                    {badge.label}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="hidden sm:inline-flex items-center rounded-2xl mb-6"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(6,148,209,0.35)',
                  boxShadow: '0 4px 24px rgba(6,148,209,0.15), inset 0 1px 0 rgba(255,255,255,0.10)',
                }}>
                {HERO_STATS.map((s, i) => (
                  <div key={s.label} className="flex items-center">
                    <div className="flex flex-col items-center justify-center px-6 py-4">
                      <div className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                        <span className="text-2xl font-bold leading-none" style={{ color: '#38bdf8' }}>{s.value}</span>
                      </div>
                      <span className="text-xs font-medium mt-1 text-center leading-snug" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.label}</span>
                    </div>
                    {i < HERO_STATS.length - 1 && (
                      <div className="h-10 w-px" style={{ background: 'rgba(6,148,209,0.35)' }} />
                    )}
                  </div>
                ))}
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-2 text-[11px] sm:text-sm whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.60)' }}>
                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Join our LinkedIn Group for daily updates –{' '}
                <a href="https://www.linkedin.com/company/koenig-solutions/" target="_blank" rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2 hover:text-white transition-colors text-[14px] sm:text-sm"
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
            <div className="lg:hidden grid grid-cols-2 gap-2">
              {HERO_STATS.map(s => (
                <div key={s.label} className="flex flex-col items-center justify-center rounded-xl py-3 px-2"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(6,148,209,0.30)' }}>
                  <div className="flex items-center gap-1.5">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                    <span className="text-lg font-black leading-none" style={{ color: '#38bdf8' }}>{s.value}</span>
                  </div>
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
                    src="https://www.youtube.com/embed/B2ezhvq1ito?rel=0&autoplay=1&mute=1&enablejsapi=1&playsinline=1"
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
      <div style={{ background: 'linear-gradient(90deg, #dbeafe 0%, #e0f2fe 40%, #bfdbfe 100%)', borderBottom: '1px solid rgba(6,148,209,0.20)', borderTop: '1px solid rgba(6,148,209,0.15)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-[20px] sm:py-5">
          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-base font-medium shrink-0 justify-self-center sm:justify-self-start"
              style={{ background: 'rgba(34,197,94,0.18)', border: '1px solid rgba(34,197,94,0.50)', color: '#16a34a' }}>
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#FF0000">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Streaming Live
            </span>
            <span className="text-center text-[16px] sm:text-base lg:text-lg" style={{ color: '#093148', fontWeight: 900 }}>
              Information Security Governance – From Strategy To Execution
            </span>
            <button
              onClick={() => { setRegWebinar(WEBINARS[0]); setRegEmail(''); setRegName(''); setRegSubmitted(false) }}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-bold text-white transition-all hover:opacity-90 active:scale-95 justify-self-center sm:justify-self-end"
              style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 4px 16px rgba(6,148,209,0.40)' }}>
              Join Now →
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════ SUBSCRIBE BAR ════════════════ */}
      <div style={{ background: '#EBF8FE', borderBottom: '1px solid #CAEFFF' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-[20px] sm:py-3.5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm font-bold whitespace-nowrap" style={{ color: '#0d1b2a' }}>
              Subscribe for updates on our Upcoming Webinars
            </p>
            <form className="flex items-center gap-2" onSubmit={e => { e.preventDefault(); setSubConfirm(true) }}>
              <input
                type="email"
                placeholder="Enter Email"
                required
                className="w-full sm:w-56 rounded-lg border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30"
                style={{ borderColor: '#CAEFFF', background: 'white', color: '#0d1b2a' }}
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg px-5 py-2 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: '#0694D1' }}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ════════════════ WEBINAR LISTINGS ════════════════ */}
      <section id="webinar-listings" aria-labelledby="webinars-heading" className="py-[20px] sm:py-10" style={{ background: '#f8fafc', borderTop: '2px solid #93d4f5' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">

          {/* Heading */}
          <div className="mb-[15px] sm:mb-8 text-center">
            <h2 id="webinars-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Register Now for our{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg,#0694D1,#38bdf8)' }}>
                Upcoming Webinars
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base" style={{ color: '#64748b' }}>
              Join our free live sessions led by certified experts — learn, ask questions, and grow your skills.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-[15px] sm:mb-8 flex flex-col sm:flex-row gap-3 flex-wrap items-center sm:items-center justify-center sm:justify-start">
            {/* Search */}
            <div className="relative w-full sm:flex-1 sm:min-w-[160px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search Webinar Topic"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border pl-9 pr-9 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30"
                style={{ borderColor: '#CAEFFF', background: 'white', color: '#0d1b2a' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-4 w-4 rounded-full transition-opacity hover:opacity-70"
                  style={{ background: '#94a3b8', color: '#fff' }}
                  aria-label="Clear search">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
            {/* Mobile: Filter by + Sort by side by side */}
            <div className="flex gap-2 w-full sm:contents">

            {/* Filter by Technology */}
            <div className="hidden sm:block relative">
              {/* Desktop: dropdown */}
              <button onClick={() => { setTechOpen(o => !o); setPartnerOpen(false); setSortOpen(false) }}
                className="hidden sm:flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition-all"
                style={{ borderColor: '#CAEFFF', background: 'white', color: '#093148', minWidth: '160px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                <span className="flex-1 text-left truncate">{filterTechs.size === 0 ? 'Filter by Technology' : filterTechs.size === 1 ? [...filterTechs][0] : `${filterTechs.size} selected`}</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: techOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {techOpen && (
                <div className="absolute left-0 top-full mt-1 z-50 w-52 rounded-xl shadow-lg overflow-hidden"
                  style={{ background: 'white', border: '1px solid #CAEFFF' }}>
                  <div className="p-2 border-b" style={{ borderColor: '#CAEFFF' }}>
                    <div className="relative">
                      <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                      <input autoFocus type="text" placeholder="Search..." value={techSearch}
                        onChange={e => setTechSearch(e.target.value)}
                        className="w-full rounded-lg border pl-8 pr-3 py-1.5 text-xs outline-none"
                        style={{ borderColor: '#CAEFFF', color: '#0d1b2a' }} />
                    </div>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {allTechs.filter(t => t === 'All' || t.toLowerCase().includes(techSearch.toLowerCase())).map(t => (
                      <button key={t} onClick={() => { setFilterTechs(t === 'All' ? new Set() : new Set([t])); setTechOpen(false); setTechSearch('') }}
                        className="w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[#EBF8FE]"
                        style={{ color: (t === 'All' ? filterTechs.size === 0 : filterTechs.has(t)) ? '#0694D1' : '#0d1b2a', fontWeight: (t === 'All' ? filterTechs.size === 0 : filterTechs.has(t)) ? 600 : 400 }}>
                        {t === 'All' ? 'All Technologies' : t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Filter by Partner */}
            <div className="hidden sm:block relative">
              {/* Desktop: dropdown */}
              <button onClick={() => { setPartnerOpen(o => !o); setTechOpen(false); setSortOpen(false) }}
                className="hidden sm:flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition-all"
                style={{ borderColor: '#CAEFFF', background: 'white', color: '#093148', minWidth: '160px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span className="flex-1 text-left truncate">{filterPartners.size === 0 ? 'Filter by Partner' : filterPartners.size === 1 ? [...filterPartners][0] : `${filterPartners.size} selected`}</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: partnerOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {partnerOpen && (
                <div className="absolute left-0 top-full mt-1 z-50 w-52 rounded-xl shadow-lg overflow-hidden"
                  style={{ background: 'white', border: '1px solid #CAEFFF' }}>
                  <div className="p-2 border-b" style={{ borderColor: '#CAEFFF' }}>
                    <div className="relative">
                      <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                      <input autoFocus type="text" placeholder="Search..." value={partnerSearch}
                        onChange={e => setPartnerSearch(e.target.value)}
                        className="w-full rounded-lg border pl-8 pr-3 py-1.5 text-xs outline-none"
                        style={{ borderColor: '#CAEFFF', color: '#0d1b2a' }} />
                    </div>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {allPartners.filter(p => p === 'All' || p.toLowerCase().includes(partnerSearch.toLowerCase())).map(p => (
                      <button key={p} onClick={() => { setFilterPartners(p === 'All' ? new Set() : new Set([p])); setPartnerOpen(false); setPartnerSearch('') }}
                        className="w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[#EBF8FE]"
                        style={{ color: (p === 'All' ? filterPartners.size === 0 : filterPartners.has(p)) ? '#0694D1' : '#0d1b2a', fontWeight: (p === 'All' ? filterPartners.size === 0 : filterPartners.has(p)) ? 600 : 400 }}>
                        {p === 'All' ? 'All Partners' : p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
              {/* Filter by — mobile only */}
              <button onClick={() => { setPendingTechs(new Set(filterTechs)); setPendingPartners(new Set(filterPartners)); setWbFilterCat('tech'); setWbFilterOpen(true) }}
                className="sm:hidden flex-1 flex items-center justify-center gap-2 rounded-xl border px-4 py-[10px] text-sm transition-all whitespace-nowrap"
                style={{ borderColor: '#CAEFFF', background: 'white', color: '#465058' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                <span>Filter by</span>
                {(filterTechs.size + filterPartners.size) > 0 && (
                  <span style={{ background: '#0694D1', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {filterTechs.size + filterPartners.size}
                  </span>
                )}
              </button>
              {/* Sort by */}
              <div className="relative flex-1 sm:flex-none">
                <button
                  onClick={() => setSortOpen(o => !o)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border px-4 py-[10px] text-sm font-medium transition-all whitespace-nowrap"
                  style={{ borderColor: '#CAEFFF', background: 'white', color: '#093148' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                  </svg>
                  Sort by
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: sortOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 z-50 w-44 overflow-hidden rounded-xl shadow-lg"
                    style={{ background: 'white', border: '1px solid #CAEFFF' }}>
                    {['All Webinar', 'Latest Webinars', 'Most Popular'].map(opt => (
                      <button key={opt} onClick={() => { setSortBy(opt); setSortOpen(false) }}
                        className="w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#EBF8FE]"
                        style={{ color: sortBy === opt ? '#0694D1' : '#0d1b2a', fontWeight: sortBy === opt ? 600 : 400 }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>{/* end mobile row wrapper */}
          </div>

          {/* Cards */}
          {displayed.length === 0 ? (
            <div className="py-16 text-center text-sm" style={{ color: '#64748b' }}>No webinars match your filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] sm:gap-4">
              {displayed.map((w, i) => (
                  <article key={w.id}
                    className={`relative flex flex-col rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mt-3${i >= 8 && !showMoreMobile ? ' hidden sm:flex' : ''}`}
                    style={{ border: '1px solid #CAEFFF', boxShadow: '0 4px 16px rgba(0,164,239,0.08)' }}>

                    {w.live && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-normal z-10 whitespace-nowrap"
                        style={{ background: '#16a34a', color: '#fff', boxShadow: '0 2px 10px rgba(22,163,74,0.45)', border: '2px solid #fff' }}>
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        Live Now
                      </span>
                    )}
                    {!w.live && now > 0 && (() => {
                      const ms = parseWebinarMs(w.date, w.time) - now
                      if (ms <= 0 || ms >= 3 * 3600000) return null
                      const h = Math.floor(ms / 3600000)
                      const m = Math.floor((ms % 3600000) / 60000)
                      return (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-normal z-10 whitespace-nowrap"
                          style={{ background: '#0694D1', color: '#fff', boxShadow: '0 2px 10px rgba(6,148,209,0.45)', border: '2px solid #fff' }}>
                          Starts In: {String(h).padStart(2, '0')}hr {String(m).padStart(2, '0')}min
                        </span>
                      )
                    })()}

                    <div className="flex-1 flex flex-col p-[15px] sm:p-5 relative" style={{ background: '#fff' }}>
                      {/* Speaker row */}
                      <div className="flex items-start justify-between gap-3 mb-[15px] sm:mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative shrink-0">
                            {w.photo ? (
                              <Image src={w.photo} alt={w.speaker}
                                width={64} height={64}
                                quality={90}
                                className="w-16 h-16 rounded-full object-cover object-top shadow-md"
                                style={{ border: '2px solid rgba(6,148,209,0.20)' }}
                                onError={(e) => { (e.target as HTMLImageElement).style.display='none'; (e.target as HTMLImageElement).nextElementSibling?.removeAttribute('style') }}
                              />
                            ) : null}
                            <div className="w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md"
                              style={{ background: w.avatarBg, border: '2px solid rgba(6,148,209,0.20)', display: w.photo ? 'none' : 'flex' }}>
                              {w.initials}
                            </div>
                          </div>
                          <p className="text-sm font-bold leading-snug" style={{ color: '#0d1b2a' }}>{w.speaker}</p>
                        </div>
                        {/* Vendor logo */}
                        {PARTNER_LOGOS[w.partner] ? (
                          <img src={PARTNER_LOGOS[w.partner]} alt={w.partner}
                            className="h-12 w-auto max-w-[100px] object-contain shrink-0 mt-0.5" />
                        ) : (
                          <span className="shrink-0 rounded-full px-2.5 py-1 text-sm font-semibold mt-1"
                            style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1', border: '1px solid rgba(6,148,209,0.25)' }}>
                            {w.partner}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="mb-[15px] sm:mb-4 text-base font-bold leading-snug flex-1" style={{ color: '#0F172A', fontSize: '16px' }}>
                        {w.title}
                      </h3>

                      {/* Meta */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm" style={{ color: '#465058' }}>
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
                        <div className="flex items-center gap-1.5 text-sm" style={{ color: '#64748b' }}>
                          <svg className="h-3.5 w-3.5 shrink-0" style={{ color: '#0694D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          {w.registered} Registered
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t px-[15px] sm:px-5 py-[15px] sm:py-3"
                      style={{ borderColor: '#EBF8FE', background: '#F8FCFF' }}>
                      <button onClick={() => setModalWebinar(w)} className="text-sm font-semibold transition-colors hover:text-[#0694D1]" style={{ color: '#465058' }}>
                        Show More &rsaquo;
                      </button>
                      {w.live ? (
                        <button
                          onClick={() => { setRegWebinar(w); setRegEmail(''); setRegName(''); setRegSubmitted(false) }}
                          className="rounded-lg border px-16 py-2.5 text-sm font-bold transition-all hover:opacity-80 active:scale-95"
                          style={{ background: '#fff', borderColor: '#0694D1', color: '#0694D1' }}>
                          Join Now
                        </button>
                      ) : (
                        <Link
                          href={`/webinar-detail/${w.id}`}
                          className="rounded-lg border px-16 py-2.5 text-sm font-bold transition-all hover:opacity-80 active:scale-95"
                          style={{ background: '#fff', borderColor: '#0694D1', color: '#0694D1' }}>
                          Register
                        </Link>
                      )}
                    </div>
                  </article>
              ))}
            </div>
          )}

          {/* Mobile: View More / View Less */}
          {displayed.length > 8 && (
            <div className="mt-6 text-center sm:hidden">
              <button onClick={() => setShowMoreMobile(v => !v)}
                className="inline-flex items-center gap-2 rounded-xl border-2 px-8 py-3 text-sm font-bold transition-all text-[#0694D1] border-[#0694D1] hover:bg-[#0694D1] hover:text-white">
                {showMoreMobile ? (
                  <>View Less <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg></>
                ) : (
                  <>View More Webinars <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg></>
                )}
              </button>
            </div>
          )}

          {/* Show All / Show Less — desktop only */}
          {sorted.length > 15 && (
            <div className="hidden sm:block mt-10 text-center">
              <button onClick={() => setShowAll(v => !v)}
                className="inline-flex items-center gap-2 rounded-xl border-2 px-8 py-3 text-sm font-bold transition-all text-[#0694D1] border-[#0694D1] hover:bg-[#0694D1] hover:text-white">
                {showAll ? (
                  <>
                    Show Less
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>
                  </>
                ) : (
                  <>
                    Show All ({sorted.length})
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

      {/* ── Mobile filter modal (sm:hidden) ── */}
      {wbFilterOpen && (
        <>
          <div onClick={() => setWbFilterOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'calc(100% - 32px)', maxWidth: 360, background: '#fff', borderRadius: 16, zIndex: 1001, display: 'flex', flexDirection: 'column', maxHeight: '80vh', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e8f1fb', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#0a1f33' }}>Filter</span>
              <button type="button" onClick={() => setWbFilterOpen(false)} style={{ width: 28, height: 28, borderRadius: '50%', background: '#f0f6fb', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b8299' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            {/* Body */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              {/* Left tabs */}
              <div style={{ width: 120, flexShrink: 0, borderRight: '1px solid #e8f1fb', overflowY: 'auto', background: '#fafcff' }}>
                {([{ key: 'tech', label: 'Technology' }, { key: 'partner', label: 'Partner' }] as const).map(cat => (
                  <button key={cat.key} onClick={() => setWbFilterCat(cat.key)} style={{ width: '100%', textAlign: 'left', padding: '14px 16px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: wbFilterCat === cat.key ? 700 : 500, color: wbFilterCat === cat.key ? '#0694D1' : '#374151', background: wbFilterCat === cat.key ? '#EBF8FE' : 'transparent', borderLeft: wbFilterCat === cat.key ? '3px solid #0694D1' : '3px solid transparent' }}>
                    {cat.label}
                  </button>
                ))}
              </div>
              {/* Right list */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
                {wbFilterCat === 'tech' && allTechs.filter(t => t !== 'All').map(t => {
                  const checked = pendingTechs.has(t)
                  return (
                    <label key={t} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #f0f7fc' }}>
                      <span style={{ fontSize: 13, color: checked ? '#0694D1' : '#374151', fontWeight: checked ? 600 : 400 }}>{t}</span>
                      <input type="checkbox" checked={checked} onChange={() => { const s = new Set(pendingTechs); s.has(t) ? s.delete(t) : s.add(t); setPendingTechs(s) }} style={{ width: 16, height: 16, accentColor: '#0694D1', cursor: 'pointer' }} />
                    </label>
                  )
                })}
                {wbFilterCat === 'partner' && allPartners.filter(p => p !== 'All').map(p => {
                  const checked = pendingPartners.has(p)
                  return (
                    <label key={p} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #f0f7fc' }}>
                      <span style={{ fontSize: 13, color: checked ? '#0694D1' : '#374151', fontWeight: checked ? 600 : 400 }}>{p}</span>
                      <input type="checkbox" checked={checked} onChange={() => { const s = new Set(pendingPartners); s.has(p) ? s.delete(p) : s.add(p); setPendingPartners(s) }} style={{ width: 16, height: 16, accentColor: '#0694D1', cursor: 'pointer' }} />
                    </label>
                  )
                })}
              </div>
            </div>
            {/* Footer */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid #e8f1fb', display: 'flex', gap: 10, flexShrink: 0 }}>
              <button type="button" onClick={() => { setFilterTechs(new Set()); setFilterPartners(new Set()); setPendingTechs(new Set()); setPendingPartners(new Set()); }} style={{ flex: 1, background: '#fff', border: '1.5px solid #B5D4F4', color: '#374151', borderRadius: 8, padding: '10px 0', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600 }}>Clear All</button>
              <button type="button" onClick={() => { setFilterTechs(new Set(pendingTechs)); setFilterPartners(new Set(pendingPartners)); setWbFilterOpen(false); }} style={{ flex: 1, background: '#0694D1', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 0', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 700 }}>Apply</button>
            </div>
          </div>
        </>
      )}
      </section>

      {/* ════════════════ FAQ ════════════════ */}
      <section className="relative overflow-hidden bg-koenig-light px-4 md:px-8 lg:px-[50px] py-[20px] sm:py-[35px]">
        <div className="pointer-events-none absolute left-0 bottom-0 h-[450px] w-[450px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.30) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.28) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.22) 0%, transparent 70%)' }} />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center" style={{ marginBottom: '35px' }}>
            <h2 id="faq-heading" className="mb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-koenig-dark">
              Frequently <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Asked Questions</span>
            </h2>
            <p className="text-sm sm:text-base text-koenig-muted">Everything you need to know before joining a webinar</p>
          </div>

          {/* Desktop: two-column layout */}
          <div className="hidden sm:flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 === 0).map((f, j) => {
                const i = j * 2; const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl border" style={{ background: '#ffffff', borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-6 sm:py-4">
                      <span className={`text-sm font-semibold leading-snug sm:text-base ${isOpen ? 'text-koenig-blue' : 'text-koenig-dark'}`} style={{ transition: 'color 0.3s' }}>{f.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed text-koenig-muted sm:px-6 sm:py-4 sm:text-base">{f.a}</div>
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
                  <div key={i} className="rounded-xl border" style={{ background: '#ffffff', borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-6 sm:py-4">
                      <span className={`text-sm font-semibold leading-snug sm:text-base ${isOpen ? 'text-koenig-blue' : 'text-koenig-dark'}`} style={{ transition: 'color 0.3s' }}>{f.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed text-koenig-muted sm:px-6 sm:py-4 sm:text-base">{f.a}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile: single-column, show 6 then toggle */}
          <div className="sm:hidden flex flex-col gap-3">
            {FAQS.slice(0, showAllFaqs ? FAQS.length : 6).map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className="rounded-xl border" style={{ background: '#ffffff', borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left">
                    <span className={`text-sm font-semibold leading-snug ${isOpen ? 'text-koenig-blue' : 'text-koenig-dark'}`} style={{ transition: 'color 0.3s' }}>{f.q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <div className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed text-koenig-muted">{f.a}</div>
                    </div>
                  </div>
                </div>
              )
            })}
            {FAQS.length > 6 && (
              <div className="mt-2 text-center">
                <button onClick={() => setShowAllFaqs(v => !v)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold underline underline-offset-4 transition-opacity hover:opacity-70"
                  style={{ color: '#0694D1' }}>
                  {showAllFaqs ? 'View Less FAQs' : 'View More FAQs'}
                  {!showAllFaqs && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="7 13 12 18 17 13"/><polyline points="7 6 12 11 17 6"/>
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ════════════════ STATS ════════════════ */}
      <div className="bg-white px-4 md:px-8 lg:px-[50px] py-[20px] sm:py-[35px]">
        <div className="mx-auto max-w-7xl px-6 py-6" style={{ background: '#EBF8FE', borderRadius: '0 1.5rem 0 1.5rem' }}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-8">
            {[
              { value: '33+',   label: 'Years Training Excellence', icon: '/images/home-banner/icon-infographic-30+.svg',    barColor: '#0694d1' },
              { value: '5000+', label: 'Courses Offered',           icon: '/images/home-banner/icon-infographic-5000+.svg',  barColor: '#076d9d' },
              { value: '30K+',  label: 'Monthly Students',          icon: '/images/home-banner/icon-infographic-30000+.svg', barColor: '#0694d1' },
              { value: '99%',   label: 'On-Time Delivery',          icon: '/images/home-banner/icon-infographic-99.svg',     barColor: '#076d9d' },
              { value: '300+',  label: 'Certified Trainers',        icon: '/images/home-banner/icon-infographic-300+.svg',   barColor: '#0694d1' },
            ].map((s, i) => (
              <div key={s.label} className={`flex flex-col items-center text-center${i === 4 ? ' col-span-2 sm:col-span-1' : ''}`}>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: `linear-gradient(135deg,${s.barColor},#0694d1)` }}>
                  <img src={s.icon} alt={s.label} className="h-5 w-5 object-contain" />
                </div>
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-koenig-dark">{s.value}</div>
                <div className="mt-1 text-sm font-medium text-koenig-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════ WEBINAR DETAIL MODAL ════════ */}
      {modalWebinar && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: 'rgba(6,17,30,0.75)', backdropFilter: 'blur(6px)' }}
          onClick={() => setModalWebinar(null)}
        >
          {/* Card */}
          <div
            className="relative flex flex-col sm:flex-row w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl"
            style={{ background: '#fff' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close — inside card, top-right */}
            <button
              onClick={() => setModalWebinar(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-70"
              style={{ background: '#1e293b', color: '#fff' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>

            {/* Left — speaker */}
            <div className="flex w-full sm:w-[190px] shrink-0 flex-col items-center justify-center gap-3 py-5 sm:py-8 px-6" style={{ background: '#f1f5f9', borderRight: '1px solid #e2e8f0' }}>
              {/* Photo or initials */}
              {modalWebinar.photo ? (
                <Image src={modalWebinar.photo} alt={modalWebinar.speaker}
                  width={96} height={96}
                  quality={90}
                  className="h-24 w-24 rounded-xl object-cover object-top shadow-md"
                  style={{ border: '3px solid rgba(6,148,209,0.20)' }} />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-xl text-2xl font-bold text-white shadow-md"
                  style={{ background: modalWebinar.avatarBg, border: '3px solid rgba(6,148,209,0.20)' }}>
                  {modalWebinar.initials}
                </div>
              )}
              <p className="text-center text-sm font-bold leading-snug" style={{ color: '#0d1b2a' }}>{modalWebinar.speaker}</p>
              {/* Vendor logo */}
              {PARTNER_LOGOS[modalWebinar.partner] ? (
                <img src={PARTNER_LOGOS[modalWebinar.partner]} alt={modalWebinar.partner}
                  className="h-8 w-auto max-w-[100px] object-contain opacity-80" />
              ) : null}
              {modalWebinar.live && (
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" style={{ background: '#16a34a', color: '#fff' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  Live Now
                </span>
              )}
            </div>

            {/* Right — title + description */}
            <div className="relative flex flex-1 flex-col justify-center p-5 sm:p-7 sm:pr-12">
              <h3 className="mb-3 text-base font-bold leading-snug" style={{ color: '#0F172A' }}>{modalWebinar.title}</h3>
              {modalWebinar.description && (
                <>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide" style={{ color: '#0694D1' }}>Webinar Summary</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{modalWebinar.description}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ════════ REGISTRATION MODAL ════════ */}
      {regWebinar && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: 'rgba(6,17,30,0.80)', backdropFilter: 'blur(8px)' }}
          onClick={() => setRegWebinar(null)}
        >
          <div
            className="relative w-full max-w-md mx-2 overflow-hidden rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header band */}
            <div className="relative px-7" style={{ background: 'linear-gradient(135deg,#b8ddf0 0%,#cce9f7 55%,#daf1fb 100%)', boxShadow: 'inset 0 0 50px rgba(56,189,248,0.35), inset 0 0 20px rgba(255,255,255,0.40)', paddingTop: '15px', paddingBottom: '15px' }}>
              <button onClick={() => setRegWebinar(null)}
                className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full transition-opacity hover:opacity-70"
                style={{ background: 'rgba(6,148,209,0.12)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>

              {/* Live badge — centered at top */}
              {regWebinar.live && (
                <div className="flex justify-center mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" style={{ background: '#16a34a', color: '#fff' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    Live
                  </span>
                </div>
              )}

              {/* Speaker row */}
              <div className="flex items-center gap-3 mb-4">
                {regWebinar.photo ? (
                  <Image src={regWebinar.photo} alt={regWebinar.speaker} width={80} height={80} quality={90}
                    className="rounded-full object-cover object-top shrink-0" style={{ width: 80, height: 80, border: '2px solid rgba(6,148,209,0.25)', marginTop: '-30px' }} />
                ) : (
                  <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: regWebinar.avatarBg, border: '2px solid rgba(6,148,209,0.25)', marginTop: '-30px' }}>
                    {regWebinar.initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-semibold mb-0.5" style={{ color: '#4a90b8' }}>Speaker</p>
                  <p className="text-sm font-bold leading-tight truncate" style={{ color: '#0d2d44' }}>{regWebinar.speaker}</p>
                </div>
              </div>

              <h3 className="text-sm font-bold leading-snug" style={{ color: '#0d2d44' }}>{regWebinar.title}</h3>
            </div>

            {/* Body */}
            <div className="px-7 py-6" style={{ background: '#fff' }}>
              {regSubmitted ? (
                <div className="flex flex-col items-center gap-3 py-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: 'rgba(22,163,74,0.12)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <p className="text-base font-bold" style={{ color: '#0F172A' }}>You&apos;re registered!</p>
                  <p className="text-sm" style={{ color: '#64748b' }}>Check your inbox for confirmation details.</p>
                </div>
              ) : (
                <>
                  <p className="mb-5 text-sm" style={{ color: '#64748b' }}>Join the live session now.</p>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold" style={{ color: '#374151' }}>
                      Email Address <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2"
                      style={{ borderColor: '#e2e8f0', color: '#0F172A' }}
                    />
                  </div>

                  <button
                    onClick={() => { if (regEmail) setRegSubmitted(true) }}
                    className="mt-6 w-full rounded-xl border py-3 text-sm font-bold transition-all hover:opacity-80 active:scale-[0.98]"
                    style={{ background: '#fff', borderColor: '#0694D1', color: '#0694D1' }}>
                    {regWebinar.live ? 'Join Now →' : 'Register for Free →'}
                  </button>

                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ════════ SUBSCRIBE SUCCESS POPUP ════════ */}
      {subConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: 'rgba(6,17,30,0.60)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSubConfirm(false)}>
          <div className="relative w-full max-w-sm rounded-2xl p-8 text-center shadow-2xl"
            style={{ background: '#fff' }}
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setSubConfirm(false)}
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full transition-opacity hover:opacity-70"
              style={{ background: '#f1f5f9' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'rgba(22,163,74,0.12)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="mb-2 text-lg font-bold" style={{ color: '#0F172A' }}>Subscribed!</h3>
            <p className="text-sm" style={{ color: '#64748b' }}>You&apos;ll receive updates on our upcoming webinars. Stay tuned!</p>
            <button onClick={() => setSubConfirm(false)}
              className="mt-6 w-full rounded-xl py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)' }}>
              Done
            </button>
          </div>
        </div>
      )}
    </>
  )
}

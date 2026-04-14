'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

/* ─── Sub-nav sections ───────────────────────────────────────── */
const ABOUT_SECTIONS = [
  { id: 'overview',             label: 'Overview' },
  { id: 'our-story',           label: 'Our Story' },
  { id: 'leadership',           label: 'Leadership' },
  { id: 'our-clients',         label: 'Our Clients' },
  { id: 'our-partners',        label: 'Our Partners' },
  { id: 'awards',               label: 'Our Awards' },
  { id: 'happiness-guarantee',  label: 'Happiness Guarantee' },
  { id: 'koenig-koshish',      label: 'Koenig Koshish' },
]

/* ─── Stats ─────────────────────────────────────────────────── */
const STATS = [
  {
    value: '30+', label: 'Years of Excellence',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>,
  },
  {
    value: '30,000+', label: 'Students Monthly',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>,
  },
  {
    value: '99.1%', label: 'On-Time Delivery',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>,
  },
  {
    value: '300+', label: 'Expert Trainers',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>,
  },
  {
    value: '5,000+', label: 'Courses Available',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>,
  },
  {
    value: '195+', label: 'Countries Served',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
  },
]

/* ─── Timeline / Our Story ───────────────────────────────────── */
const TIMELINE = [
  {
    year: '1993',
    title: 'The Beginning',
    tag: 'Founded',
    color: '#0694D1',
    desc: 'Started in the congested lanes of Patel Nagar, New Delhi — a small, struggling enterprise with big ambitions. The early years were loss-making but set the foundation for what was to come.',
  },
  {
    year: '2001',
    title: 'Near-Death #1 — Dotcom Bust',
    tag: 'Crisis & Pivot',
    color: '#f59e0b',
    desc: 'The dotcom crash threatened to shut us down entirely. We pivoted to an offshore training model, welcoming European customers to train in India. Our first UK customer, Andy Sau, marked the turning point.',
  },
  {
    year: '2004–2015',
    title: 'From 10 to 1,000+',
    tag: 'Rapid Growth',
    color: '#10b981',
    desc: 'Grew from 10 students per month in 2004 to 100+ monthly by 2007. Expanded to Shimla, Goa, and Dubai. Diversified delivery with live online and Fly-Me-a-Trainer options. Became a truly global IT training company.',
  },
  {
    year: '2016',
    title: 'Near-Death #2 — Oil Crisis',
    tag: 'Crisis & Recovery',
    color: '#f59e0b',
    desc: 'Over-dependence on oil-exporting countries caused an 80% revenue crash when oil prices plummeted. Strict cost controls and portfolio diversification enabled a full recovery by year-end.',
  },
  {
    year: '2020',
    title: 'Near-Death #3 — COVID-19',
    tag: 'Reinvention',
    color: '#8b5cf6',
    desc: 'Classroom training came to a global halt. We pivoted fully to live online delivery within weeks, retained global talent through a Work-From-Home model, and emerged stronger with a more scalable business.',
  },
  {
    year: '2025',
    title: '30+ Years Strong',
    tag: 'Today',
    color: '#0694D1',
    desc: 'Today Koenig is a globally recognized IT training leader — 30,000+ students monthly, 300+ expert trainers, 5,000+ courses, offices in 12 countries. The journey continues.',
  },
]

/* ─── Leadership ─────────────────────────────────────────────── */
const LEADERSHIP = [
  { name: 'Rohit Aggarwal',       title: 'CEO & Founder',                                     initials: 'RA' },
  { name: 'Vardaan Aggarwal',     title: 'Executive Director — Investments',                  initials: 'VA' },
  { name: 'Raahil Aggarwal',      title: 'Group Manager — AI, Strategy & Brand',              initials: 'RA' },
  { name: 'Subodh Choudhary',     title: 'Group Manager — Alliances & Corporate Sales',       initials: 'SC' },
  { name: 'Sakshi Gaba Dhawan',   title: 'Group Manager — HR, AR/AP & Pre-Sales',            initials: 'SG' },
  { name: 'Aditya Sharma',        title: 'Technical Lead — Automation',                       initials: 'AS' },
  { name: 'Praveen Kumar',        title: 'Finance Manager',                                   initials: 'PK' },
  { name: 'Kunal Singh',          title: 'Regional Manager — Australia',                      initials: 'KS' },
  { name: 'Nidhi Kumra Ahuja',    title: 'Manager HR & Freelancer Management',                initials: 'NK' },
  { name: 'Rohit Tiwary',         title: 'Asst. Manager — Brand & Digital Communications',   initials: 'RT' },
  { name: 'Hardik Tike',          title: 'Asst. Technical Manager',                           initials: 'HT' },
  { name: 'Vatan Vijay Joshi',    title: 'Asst. Technical Manager',                           initials: 'VJ' },
  { name: 'Manish Chaturvedi',    title: 'Asst. Sales Manager',                               initials: 'MC' },
]

/* ─── Enterprise Clients ─────────────────────────────────────── */
const CLIENTS = [
  'Chevron', 'TCS', 'HCL', 'Microsoft', 'NTT', 'PwC',
  'United Nations', 'HSBC', 'NHS', 'Saudi Aramco', 'Shell', 'Infosys',
  'Adobe', 'Google', 'EY', 'GE', 'McKinsey', 'Bain & Company',
  'Emirates', 'DHL', 'HP', 'Fujifilm', 'Accenture', 'Deloitte',
  'IBM', 'Capgemini', 'Wipro', 'Cognizant', 'KPMG', 'Oracle',
]

/* ─── Vendor Partners ────────────────────────────────────────── */
const PARTNERS = [
  { name: 'Microsoft',        img: 'microsoft-cloud-t.png' },
  { name: 'AWS',              img: 'amazon-authorized.png' },
  { name: 'Cisco',            img: 'Cisco.png' },
  { name: 'CompTIA',          img: 'comptia.png' },
  { name: 'Oracle',           img: 'o-prtnr-clr-rgb (1).png' },
  { name: 'SAP',              img: 'SAP.jpg' },
  { name: 'PMI',              img: 'PMI1115-ATP-Badge-2024-rgb.png' },
  { name: 'Red Hat',          img: 'Redvendorlogo.png' },
  { name: 'EC-Council',       img: 'EC-Council-logo.png' },
  { name: 'VMware',           img: 'VMware-Broadcom.png' },
  { name: 'PeopleCert',       img: 'PeopleCert.png' },
  { name: 'PECB',             img: 'Authorized PECB Certification Courses Training badge.png' },
  { name: 'Linux Foundation', img: 'Linux-Foundation.png' },
  { name: 'ISC2',             img: 'OTP-Preferred-Badge.png' },
  { name: 'ISACA',            img: undefined },
  { name: 'ISTQB',            img: 'ISTQB.png' },
]

/* ─── Global Offices ─────────────────────────────────────────── */
const OFFICES = [
  { city: 'New Delhi',       country: 'India',        flag: '🇮🇳' },
  { city: 'Delta, BC',       country: 'Canada',       flag: '🇨🇦' },
  { city: 'London',          country: 'United Kingdom',flag: '🇬🇧' },
  { city: 'Dubai',           country: 'UAE',          flag: '🇦🇪' },
  { city: 'New York',        country: 'USA',          flag: '🇺🇸' },
  { city: 'Singapore',       country: 'Singapore',    flag: '🇸🇬' },
  { city: 'Amsterdam',       country: 'Netherlands',  flag: '🇳🇱' },
  { city: 'Johannesburg',    country: 'South Africa', flag: '🇿🇦' },
  { city: 'Wellington',      country: 'New Zealand',  flag: '🇳🇿' },
  { city: 'Sydney',          country: 'Australia',    flag: '🇦🇺' },
  { city: 'Riyadh',          country: 'Saudi Arabia', flag: '🇸🇦' },
  { city: 'Munich',          country: 'Germany',      flag: '🇩🇪' },
  { city: 'Kuala Lumpur',    country: 'Malaysia',     flag: '🇲🇾' },
]

/* ─── Awards ─────────────────────────────────────────────────── */
const AWARDS = [
  { year: '2010–2025', title: 'Best Place to Work in Education', body: 'Recognized for 15 consecutive years as a top employer in the education sector globally.' },
  { year: '2024',      title: 'Top IT Training Company',         body: 'Ranked among the world\'s top IT training providers by independent industry analysts.' },
  { year: '2023',      title: 'Excellence in Online Delivery',   body: 'Award for outstanding live online training quality and learner satisfaction scores.' },
  { year: '2022',      title: 'Vendor Partner of the Year',      body: 'Multiple vendor partner awards for consistently high pass rates and student satisfaction.' },
]

/* ─── Testimonials ───────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'James Whitmore',
    role: 'Cloud Architect, Chevron',
    country: '🇺🇸 USA',
    rating: 5,
    text: 'The quality of instruction at Koenig is unmatched. My AWS certification journey was made smooth by their structured approach and knowledgeable trainers.',
  },
  {
    name: 'Priya Nair',
    role: 'Security Manager, HSBC',
    country: '🇬🇧 UK',
    rating: 5,
    text: 'Koenig\'s 1-on-1 training option was a game changer. I could set my own pace and the instructor was deeply invested in my success.',
  },
  {
    name: 'Mohammed Al-Rashid',
    role: 'IT Director, Saudi Aramco',
    country: '🇸🇦 Saudi Arabia',
    rating: 5,
    text: 'Outstanding course delivery, professional trainers, and a seamless experience from enrollment to certification. Highly recommended.',
  },
  {
    name: 'Sarah Chen',
    role: 'DevOps Lead, Shell',
    country: '🇦🇺 Australia',
    rating: 5,
    text: 'I have been to many training providers, but Koenig stands apart for its commitment to quality and the genuine care they show for each student\'s success.',
  },
  {
    name: 'Arjun Mehta',
    role: 'Solutions Architect, TCS',
    country: '🇮🇳 India',
    rating: 5,
    text: 'Completed my Azure certification through Koenig. The guaranteed batch dates meant I could plan my schedule perfectly. Zero delays.',
  },
  {
    name: 'Emma van Dijk',
    role: 'Project Manager, PwC',
    country: '🇳🇱 Netherlands',
    rating: 5,
    text: 'The Fly-Me-a-Trainer model is brilliant. We had an expert trainer come to our office and train our whole team. Incredibly efficient.',
  },
]

/* ─── Page Component ─────────────────────────────────────────── */
export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [subNavStuck, setSubNavStuck] = useState(false)
  const subNavRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  /* Intersection observer — track which section is in view */
  useEffect(() => {
    const sectionEls = ABOUT_SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    sectionEls.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  /* Detect sticky sub-nav */
  useEffect(() => {
    const el = subNavRef.current
    if (!el) return
    const sentinel = document.createElement('div')
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:100%;pointer-events:none'
    el.parentElement?.insertBefore(sentinel, el)
    const obs = new IntersectionObserver(([e]) => setSubNavStuck(!e.isIntersecting), { threshold: [1] })
    obs.observe(sentinel)
    return () => { obs.disconnect(); sentinel.remove() }
  }, [])

  /* Scroll active tab into view */
  useEffect(() => {
    const container = tabsRef.current
    if (!container) return
    const active = container.querySelector('[data-active="true"]') as HTMLElement
    if (active) {
      const left = active.offsetLeft - container.offsetWidth / 2 + active.offsetWidth / 2
      container.scrollTo({ left, behavior: 'smooth' })
    }
  }, [activeSection])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 110
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  /* IO fade animation for cards */
  useEffect(() => {
    const els = document.querySelectorAll('.abt-fade')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('abt-visible') })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#06111E', fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <style>{`
        .abt-fade { opacity: 0; transform: translateY(16px); transition: opacity 0.35s ease, transform 0.35s ease; }
        .abt-visible { opacity: 1; transform: translateY(0); }
        .abt-fade.d1 { transition-delay: 0.05s; }
        .abt-fade.d2 { transition-delay: 0.10s; }
        .abt-fade.d3 { transition-delay: 0.15s; }
        .abt-fade.d4 { transition-delay: 0.20s; }
        .abt-fade.d5 { transition-delay: 0.25s; }
        .abt-fade.d6 { transition-delay: 0.30s; }

        /* Timeline line */
        .tl-line { position: relative; }
        .tl-line::before { content: ''; position: absolute; left: 15px; top: 24px; bottom: 0; width: 2px; background: linear-gradient(to bottom, rgba(6,148,209,0.6), rgba(6,148,209,0.05)); }

        /* Sub-nav scroll */
        .abt-tabs-scroll { scrollbar-width: none; }
        .abt-tabs-scroll::-webkit-scrollbar { display: none; }

        /* Partner logo hover */
        .partner-card { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .partner-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(6,148,209,0.18); }

        /* Client pill */
        .client-pill { transition: background 0.15s ease, color 0.15s ease; }
        .client-pill:hover { background: rgba(6,148,209,0.18) !important; color: #38bdf8 !important; }

        /* Leadership card */
        .leader-card { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .leader-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(6,148,209,0.15); }

        /* Testimonial card */
        .testi-card { transition: transform 0.18s ease; }
        .testi-card:hover { transform: translateY(-3px); }

        /* Blob */
        @keyframes abtBlob { 0%,100%{transform:scale(1) translate(0,0)} 33%{transform:scale(1.08) translate(20px,-15px)} 66%{transform:scale(0.95) translate(-15px,10px)} }
        .abt-blob { animation: abtBlob 12s ease-in-out infinite; }
      `}</style>

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 md:px-8 lg:px-[50px] py-16 sm:py-24" style={{ background: 'linear-gradient(135deg, #061118 0%, #06111E 50%, #071828 100%)' }}>
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="abt-blob absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #0694D1, transparent 70%)' }} />
          <div className="abt-blob absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)', animationDelay: '4s' }} />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            <span style={{ color: '#38bdf8' }}>About Us</span>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Left copy */}
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium" style={{ background: 'rgba(6,148,209,0.12)', border: '1px solid rgba(6,148,209,0.3)', color: '#38bdf8' }}>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                Established 1993 · 30+ Years of Excellence
              </div>
              <h1 className="mb-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                We&apos;re Koenig&nbsp;—<br />
                <span style={{ color: '#0694D1' }}>Global Leaders</span> in<br />
                IT Training
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                A global leader in IT training since 1993. Just tell us <strong className="text-white">What, Where, When</strong> — we&apos;ll deliver the training. We empower you to earn Money, Respect, and Peace of Mind.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo('our-story')}
                  className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: '#0694D1' }}
                >
                  Our Story
                </button>
                <button
                  onClick={() => scrollTo('leadership')}
                  className="rounded-xl border px-6 py-3 text-sm font-semibold transition-all"
                  style={{ borderColor: 'rgba(6,148,209,0.4)', color: '#38bdf8' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  Meet the Team
                </button>
              </div>
            </div>

            {/* Right — stat cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:w-auto lg:grid-cols-2 xl:grid-cols-3">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 rounded-2xl p-4 text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.15)', backdropFilter: 'blur(8px)' }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.12)' }}>
                    <svg className="h-5 w-5" style={{ color: '#0694D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">{s.icon}</svg>
                  </div>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Sub-Navigation ── */}
      <div
        ref={subNavRef}
        className="sticky top-0 z-40 border-b transition-shadow"
        style={{
          background: 'rgba(6,17,30,0.97)',
          borderColor: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: subNavStuck ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div ref={tabsRef} className="abt-tabs-scroll flex gap-1 overflow-x-auto py-1">
            {ABOUT_SECTIONS.map(s => {
              const isActive = activeSection === s.id
              return (
                <button
                  key={s.id}
                  data-active={isActive}
                  onClick={() => scrollTo(s.id)}
                  className="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  style={{
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    background: isActive ? '#0694D1' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
                >
                  {s.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* ── OVERVIEW ── */}
      {/* ════════════════════════════════════════════════ */}
      <section id="overview" className="px-4 md:px-8 lg:px-[50px] py-16 sm:py-20" style={{ background: '#06111E' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Who We Are</span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">A Mission-Driven Company</h2>
          </div>

          {/* Philosophy cards */}
          <div className="mb-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
                title: 'Money',
                desc: 'We help you earn it — through certifications that command higher salaries and career-defining skills that open new opportunities.',
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>,
                title: 'Respect',
                desc: 'Vendor-authorized certifications earn recognition from peers, employers, and the global IT community — credibility that matters.',
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>,
                title: 'Peace of Mind',
                desc: 'Our Happiness Guarantee, 99.1% on-time batch delivery, and dedicated support mean you can focus on learning — not logistics.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`abt-fade d${i + 1} rounded-2xl p-7`}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.12)' }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.12)' }}>
                  <svg className="h-6 w-6" style={{ color: '#0694D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">{card.icon}</svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Ethos + Global */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Koenig Ethos */}
            <div className="abt-fade rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, rgba(6,148,209,0.08) 0%, rgba(6,148,209,0.03) 100%)', border: '1px solid rgba(6,148,209,0.2)' }}>
              <h3 className="mb-4 text-2xl font-bold text-white">The Koenig Ethos</h3>
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl font-black" style={{ background: 'rgba(6,148,209,0.15)', color: '#0694D1' }}>I</div>
                <svg className="h-6 w-6 shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18"/></svg>
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl font-black" style={{ background: 'rgba(6,148,209,0.15)', color: '#38bdf8' }}>O</div>
              </div>
              <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Our core philosophy: <strong className="text-white">&ldquo;I (us) is less than O (others).&rdquo;</strong> We put customers first — always. This customer obsession drives every decision, from batch scheduling to trainer selection to our happiness guarantee.
              </p>
              <div className="mt-5 rounded-xl p-4" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.15)' }}>
                <p className="text-sm font-medium" style={{ color: '#38bdf8' }}>Constant Improvement</p>
                <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>We add 100+ new courses monthly, continuously improve delivery quality, and never stop evolving to meet the market&apos;s needs.</p>
              </div>
            </div>

            {/* Global Offices */}
            <div className="abt-fade d2 rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Global Presence</h3>
                <span className="rounded-full px-3 py-1 text-sm font-semibold" style={{ background: 'rgba(6,148,209,0.15)', color: '#38bdf8' }}>12 Offices</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {OFFICES.map((o, i) => (
                  <div key={i} className="flex items-center gap-2.5 rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-xl">{o.flag}</span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-white">{o.city}</div>
                      <div className="truncate text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{o.country}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* ── OUR STORY ── */}
      {/* ════════════════════════════════════════════════ */}
      <section id="our-story" className="px-4 md:px-8 lg:px-[50px] py-16 sm:py-20" style={{ background: '#070f1b' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>How We Got Here</span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Story</h2>
            <p className="mt-3 max-w-2xl text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Thirty years of persistence, three near-death moments, and an unrelenting drive to grow. Here&apos;s how Koenig became a global IT training leader.
            </p>
          </div>

          <div className="tl-line flex flex-col gap-0 pl-10 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-8">
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className={`abt-fade d${Math.min(i + 1, 6)} relative mb-8 lg:mb-0 rounded-2xl p-7`}
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${item.color}22` }}
              >
                {/* Mobile timeline dot */}
                <div className="absolute -left-[42px] top-6 flex h-8 w-8 items-center justify-center rounded-full lg:hidden" style={{ background: item.color, boxShadow: `0 0 16px ${item.color}55` }}>
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                </div>

                {/* Desktop number */}
                <div className="mb-4 hidden items-center gap-3 lg:flex">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: item.color }}>{i + 1}</div>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${item.color}50, transparent)` }} />
                </div>

                <div className="mb-3 flex items-center gap-2 flex-wrap">
                  <span className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: item.color }}>{item.year}</span>
                  <span className="rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: `${item.color}50`, color: item.color }}>{item.tag}</span>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* ── LEADERSHIP ── */}
      {/* ════════════════════════════════════════════════ */}
      <section id="leadership" className="px-4 md:px-8 lg:px-[50px] py-16 sm:py-20" style={{ background: '#06111E' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>The People Behind the Mission</span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Leadership Team</h2>
            <p className="mt-3 max-w-2xl text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Our leadership brings together decades of experience in IT training, sales, technology, and operations — united by a shared obsession with customer success.
            </p>
          </div>

          {/* CEO highlight */}
          <div className="abt-fade mb-10 flex flex-col gap-6 rounded-2xl p-8 sm:flex-row sm:items-center" style={{ background: 'linear-gradient(135deg, rgba(6,148,209,0.1) 0%, rgba(6,148,209,0.04) 100%)', border: '1px solid rgba(6,148,209,0.25)' }}>
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ background: '#0694D1', boxShadow: '0 0 30px rgba(6,148,209,0.4)' }}>RA</div>
            <div>
              <div className="mb-1 text-2xl font-bold text-white">Rohit Aggarwal</div>
              <div className="mb-3 text-sm font-semibold" style={{ color: '#38bdf8' }}>CEO & Founder</div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Rohit founded Koenig in 1993 with a vision to make world-class IT training accessible globally. Under his leadership, Koenig has survived three near-death crises and emerged stronger each time — growing from a single Delhi office to a 12-country global operation.
              </p>
            </div>
          </div>

          {/* Team grid */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {LEADERSHIP.filter((_, i) => i > 0).map((person, i) => (
              <div
                key={i}
                className={`leader-card abt-fade d${(i % 4) + 1} rounded-2xl p-5`}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ background: `hsl(${(i * 47) % 360},50%,35%)` }}>
                  {person.initials}
                </div>
                <div className="mb-1 font-semibold text-white">{person.name}</div>
                <div className="text-xs leading-snug" style={{ color: 'rgba(255,255,255,0.45)' }}>{person.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* ── OUR CLIENTS ── */}
      {/* ════════════════════════════════════════════════ */}
      <section id="our-clients" className="px-4 md:px-8 lg:px-[50px] py-16 sm:py-20" style={{ background: '#070f1b' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-3 block text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Trusted Worldwide</span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Clients</h2>
              <p className="mt-3 max-w-xl text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
                30+ enterprise clients across every major industry trust Koenig to upskill their teams.
              </p>
            </div>
            <div className="rounded-2xl px-6 py-4 text-center" style={{ background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.2)' }}>
              <div className="text-3xl font-bold" style={{ color: '#38bdf8' }}>1M+</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Professionals Certified</div>
            </div>
          </div>

          {/* Client logos/pills */}
          <div className="abt-fade flex flex-wrap gap-3">
            {CLIENTS.map((name, i) => (
              <div
                key={i}
                className="client-pill rounded-xl px-4 py-2.5 text-sm font-medium"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)' }}
              >
                {name}
              </div>
            ))}
          </div>

          {/* Feature stats */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { value: '30+', label: 'Fortune 500 Clients', sub: 'Who trust us with their talent' },
              { value: '195+', label: 'Countries', sub: 'Global reach for global companies' },
              { value: '95%', label: 'First-Attempt Pass Rate', sub: 'Industry-leading certification success' },
            ].map((s, i) => (
              <div key={i} className={`abt-fade d${i + 1} rounded-2xl p-6`} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.12)' }}>
                <div className="mb-1 text-4xl font-bold" style={{ color: '#0694D1' }}>{s.value}</div>
                <div className="font-semibold text-white">{s.label}</div>
                <div className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* ── OUR PARTNERS ── */}
      {/* ════════════════════════════════════════════════ */}
      <section id="our-partners" className="px-4 md:px-8 lg:px-[50px] py-16 sm:py-20" style={{ background: '#06111E' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Vendor-Authorized Training</span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Partners</h2>
            <p className="mt-3 max-w-2xl text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Koenig is an authorized training partner for the world&apos;s most respected technology vendors — meaning our certifications carry the full weight of vendor recognition.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {PARTNERS.map((p, i) => (
              <div
                key={i}
                className={`partner-card abt-fade d${(i % 5) + 1} flex flex-col items-center gap-3 rounded-2xl p-4`}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white p-2">
                  {p.img ? (
                    <img src={`/images/partners/${encodeURIComponent(p.img)}`} alt={p.name} className="h-full w-full object-contain" />
                  ) : (
                    <span className="text-sm font-bold" style={{ color: '#0694D1' }}>{p.name[0]}</span>
                  )}
                </div>
                <span className="text-center text-xs font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{p.name}</span>
              </div>
            ))}
          </div>

          {/* Partner highlight */}
          <div className="abt-fade mt-10 rounded-2xl p-8" style={{ background: 'rgba(6,148,209,0.06)', border: '1px solid rgba(6,148,209,0.2)' }}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ background: 'rgba(6,148,209,0.15)' }}>
                <svg className="h-7 w-7" style={{ color: '#0694D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <div>
                <h4 className="mb-1 text-lg font-bold text-white">Why Vendor-Authorization Matters</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Being an authorized partner means our training materials, courseware, and methodologies are approved and certified by the vendor. Your certification carries the same credibility as training received directly from Microsoft, AWS, Cisco, or any other partner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* ── AWARDS ── */}
      {/* ════════════════════════════════════════════════ */}
      <section id="awards" className="px-4 md:px-8 lg:px-[50px] py-16 sm:py-20" style={{ background: '#070f1b' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Recognition & Achievements</span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Awards</h2>
            <p className="mt-3 max-w-2xl text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Consistent recognition from the industry for excellence in training quality, employee culture, and innovation.
            </p>
          </div>

          {/* Flagship award */}
          <div className="abt-fade mb-8 overflow-hidden rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(251,191,36,0.04) 100%)', border: '1px solid rgba(251,191,36,0.3)' }}>
            <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center">
              {/* Trophy */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-4xl" style={{ background: 'rgba(251,191,36,0.15)' }}>
                🏆
              </div>
              <div className="flex-1">
                <div className="mb-1 text-sm font-semibold uppercase tracking-wider" style={{ color: '#fbbf24' }}>2010 – 2025 · 15 Consecutive Years</div>
                <h3 className="mb-2 text-2xl font-bold text-white">Best Place to Work in Education</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Recognized for 15 consecutive years as a top employer in the education sector globally. This reflects our deep commitment to employee well-being, a culture of constant learning, and building a workplace where talent thrives.
                </p>
              </div>
              {/* Badge */}
              <div className="flex shrink-0 flex-col items-center gap-1 rounded-2xl px-6 py-5" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>
                <div className="text-3xl font-black" style={{ color: '#fbbf24' }}>15</div>
                <div className="text-center text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>Years in a<br />Row</div>
              </div>
            </div>
          </div>

          {/* Other awards grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            {AWARDS.slice(1).map((award, i) => (
              <div key={i} className={`abt-fade d${i + 1} rounded-2xl p-6`} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-xl" style={{ background: 'rgba(6,148,209,0.12)' }}>⭐</div>
                <div className="mb-1 text-sm font-semibold" style={{ color: '#38bdf8' }}>{award.year}</div>
                <h4 className="mb-2 font-bold text-white">{award.title}</h4>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{award.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* ── STUDENT FEEDBACK / TESTIMONIALS ── */}
      {/* ════════════════════════════════════════════════ */}
      <section id="student-feedback" className="px-4 md:px-8 lg:px-[50px] py-16 sm:py-20" style={{ background: '#06111E' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>What Our Students Say</span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Student Feedback</h2>
            <p className="mt-3 max-w-xl text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Thousands of professionals share their Koenig experience every month. Here are a few of their stories.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`testi-card abt-fade d${(i % 3) + 1} flex flex-col gap-4 rounded-2xl p-6`}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="h-4 w-4" style={{ color: '#fbbf24' }} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: `hsl(${(i * 83) % 360},45%,40%)` }}>
                    {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{t.role} · {t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* ── HAPPINESS GUARANTEE ── */}
      {/* ════════════════════════════════════════════════ */}
      <section id="happiness-guarantee" className="px-4 md:px-8 lg:px-[50px] py-16 sm:py-20" style={{ background: '#070f1b' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Our Promise to You</span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Happiness Guarantee</h2>
          </div>

          {/* Main guarantee card */}
          <div className="abt-fade mb-8 overflow-hidden rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(6,148,209,0.12) 0%, rgba(6,148,209,0.04) 100%)', border: '1px solid rgba(6,148,209,0.3)' }}>
            <div className="p-8 sm:p-12">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl" style={{ background: 'rgba(6,148,209,0.15)' }}>
                😊
              </div>
              <h3 className="mb-4 text-3xl font-bold text-white">We&apos;re Not Happy Until You Are</h3>
              <p className="mb-8 max-w-3xl text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Our Happiness Guarantee is simple — if you&apos;re not satisfied with your training experience, we will make it right. No questions, no hassle. Your satisfaction is our highest priority, and we&apos;ll go above and beyond to ensure you achieve your learning goals.
              </p>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { emoji: '📅', title: 'Guaranteed Batches', desc: '99.1% on-time delivery. Your scheduled batch will run.' },
                  { emoji: '🔄', title: 'Free Re-sit', desc: 'Didn\'t pass? Re-attend the course at no extra charge.' },
                  { emoji: '👨‍🏫', title: 'Expert Trainers', desc: 'All trainers are vendor-certified professionals with real-world experience.' },
                  { emoji: '📞', title: '24/7 Support', desc: 'Dedicated support before, during, and after your training.' },
                ].map((item, i) => (
                  <div key={i} className={`abt-fade d${i + 1} rounded-2xl p-5`} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="mb-3 text-3xl">{item.emoji}</div>
                    <h4 className="mb-2 font-bold text-white">{item.title}</h4>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="abt-fade flex flex-col items-center gap-4 rounded-2xl py-10 text-center" style={{ background: 'rgba(6,148,209,0.06)', border: '1px solid rgba(6,148,209,0.15)' }}>
            <h4 className="text-2xl font-bold text-white">Ready to Start Your Journey?</h4>
            <p style={{ color: 'rgba(255,255,255,0.55)' }}>Join 30,000+ students trained every month by Koenig.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/" className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: '#0694D1' }}>
                Browse Courses
              </Link>
              <a href="mailto:info@koenig-solutions.com" className="rounded-xl border px-6 py-3 text-sm font-semibold transition-all" style={{ borderColor: 'rgba(6,148,209,0.4)', color: '#38bdf8' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* ── KOENIG KOSHISH ── */}
      {/* ════════════════════════════════════════════════ */}
      <section id="koenig-koshish" className="px-4 md:px-8 lg:px-[50px] py-16 sm:py-20" style={{ background: '#06111E' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Social Responsibility</span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Koenig Koshish</h2>
            <p className="mt-3 max-w-2xl text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
              &ldquo;Koshish&rdquo; means effort — and that&apos;s exactly what this initiative represents. Koenig Koshish is our corporate social responsibility program dedicated to creating positive change.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Mission statement */}
            <div className="abt-fade rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.03) 100%)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <div className="mb-4 text-4xl">🤝</div>
              <h3 className="mb-4 text-2xl font-bold text-white">Giving Back Through Training</h3>
              <p className="mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Through Koenig Koshish, we believe that access to quality IT education should not be limited by economic circumstances. We work to bridge the digital divide by providing training opportunities to underserved communities and aspiring professionals who would otherwise lack access.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Free Training Scholarships', 'Community Outreach', 'Digital Literacy Programs', 'Career Mentorship'].map((tag, i) => (
                  <span key={i} className="rounded-full px-4 py-1.5 text-sm font-medium" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Pillars */}
            <div className="flex flex-col gap-4">
              {[
                {
                  emoji: '🎓',
                  title: 'Education Access',
                  desc: 'Providing scholarships and subsidized training to students from economically disadvantaged backgrounds who show promise in IT.',
                  color: '#0694D1',
                },
                {
                  emoji: '🌱',
                  title: 'Skill Development',
                  desc: 'Running free workshops and boot camps in under-served communities to introduce foundational IT skills and spark interest in technology careers.',
                  color: '#10b981',
                },
                {
                  emoji: '💼',
                  title: 'Employment Bridge',
                  desc: 'Connecting Koshish graduates with Koenig\'s enterprise client network to create meaningful employment pathways post-training.',
                  color: '#8b5cf6',
                },
              ].map((item, i) => (
                <div key={i} className={`abt-fade d${i + 1} flex gap-5 rounded-2xl p-5`} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl" style={{ background: `${item.color}18` }}>
                    {item.emoji}
                  </div>
                  <div>
                    <h4 className="mb-1 font-bold text-white">{item.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="px-4 md:px-8 lg:px-[50px] py-12" style={{ background: '#061020', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <div className="mb-1 font-bold text-white">Want to know more?</div>
            <div className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>info@koenig-solutions.com · +91-984-072-2417</div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {ABOUT_SECTIONS.slice(1).map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="rounded-lg px-3 py-1.5 text-sm transition-colors"
                style={{ color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.04)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#38bdf8' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

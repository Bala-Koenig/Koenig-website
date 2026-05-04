'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

/* ── Learning-options tab data ───────────────────────────────── */
const LEARNING_TABS = [
  { id: 'ilo',      label: 'Live Online Classroom', href: '/live-online-classroom' },
  { id: 'fmat',     label: 'Fly-Me-a-Trainer (FMAT)', href: '#' },
  { id: 'classroom',label: 'Classroom Training',    href: '/classroom-training' },
  { id: '1on1',     label: '1-on-1 Training',        href: '/1-on-1-training' },
  { id: 'flexi',    label: 'Flexi',                  href: '#' },
]

/* ── Benefits ────────────────────────────────────────────────── */
const BENEFITS = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
    title: 'Flexible Scheduling',
    desc: 'Train on any day — including weekends and holidays. Pick start times that fit your time zone and daily routine.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
      </svg>
    ),
    title: 'Fully Customized Curriculum',
    desc: 'Syllabus adapted to your skill level, goals, and pace. Skip what you know, deep-dive where it matters.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: 'Accelerated Learning',
    desc: "Learn up to 3× faster than group classes. No waiting — the instructor's entire attention is on you.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    title: 'Certified Expert Instructors',
    desc: '300+ industry-certified trainers with real-world experience, handpicked to match your technical domain.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
      </svg>
    ),
    title: 'Train From Anywhere',
    desc: 'Fully online, live sessions from your home or office. No travel, no relocation — just pure learning.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Guaranteed to Run',
    desc: 'Every booked session runs — no minimum enrolments, no cancellations. Your slot is yours alone.',
  },
]

/* ── How It Works steps ──────────────────────────────────────── */
const STEPS = [
  {
    num: '01',
    title: 'Choose Your Course',
    desc: 'Browse 5,000+ courses across Microsoft, AWS, Cisco, CompTIA and more. Our advisors can help you pick the right certification path.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Pick Your Schedule',
    desc: 'Select any start date that suits you — weekday, weekend, morning or evening. Sessions can start in as little as 24 hours.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Get Matched with an Expert',
    desc: 'We assign a certified instructor who specialises in your exact topic. Review their profile and request a change at any time.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Learn, Practice & Certify',
    desc: 'Attend live sessions, get hands-on labs, ask questions freely, and walk away exam-ready — backed by our Happiness Guarantee.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
  },
]

/* ── Page stats ──────────────────────────────────────────────── */
const STATS = [
  { value: '5,000+', label: 'Courses Available' },
  { value: '300+',   label: 'Expert Instructors' },
  { value: '33+',    label: 'Years of Excellence' },
  { value: '99.1%',  label: 'Satisfaction Rate' },
]

/* ── Popular courses ─────────────────────────────────────────── */
const POPULAR_COURSES = [
  { vendor: 'Microsoft', code: 'AZ-104',    name: 'Microsoft Azure Administrator',              days: 5, level: 'Intermediate', hot: true  },
  { vendor: 'AWS',       code: 'SAA-C03',   name: 'AWS Solutions Architect – Associate',         days: 4, level: 'Intermediate', hot: true  },
  { vendor: 'CompTIA',   code: 'SY0-701',   name: 'CompTIA Security+',                           days: 5, level: 'Intermediate', hot: true  },
  { vendor: 'Cisco',     code: 'CCNA',      name: 'CCNA – Cisco Certified Network Associate',    days: 5, level: 'Beginner',     hot: false },
  { vendor: 'ISC2',      code: 'CISSP',     name: 'CISSP – Certified Information Systems Security Professional', days: 5, level: 'Advanced', hot: true },
  { vendor: 'PMI',       code: 'PMP',       name: 'Project Management Professional (PMP)',       days: 4, level: 'Advanced',     hot: true  },
  { vendor: 'Microsoft', code: 'AZ-305',    name: 'Azure Solutions Architect Expert',            days: 4, level: 'Advanced',     hot: false },
  { vendor: 'CompTIA',   code: 'N10-009',   name: 'CompTIA Network+',                            days: 5, level: 'Beginner',     hot: false },
]

/* ── Comparison rows ─────────────────────────────────────────── */
const COMPARISON = [
  { feature: 'Class Size',        one: 'Just you',                  group: '8–20 students' },
  { feature: 'Schedule',          one: 'Any day, any time',         group: 'Fixed batch dates' },
  { feature: 'Pace',              one: 'Entirely your pace',        group: "Trainer's set pace" },
  { feature: 'Curriculum',        one: 'Tailored to your goals',    group: 'Standard syllabus' },
  { feature: 'Instructor Focus',  one: '100% on you',               group: 'Split across students' },
  { feature: 'Start Date',        one: 'As early as tomorrow',      group: 'Next scheduled batch' },
  { feature: 'Session Recording', one: 'Available on request',      group: 'Shared recording' },
  { feature: 'Exam Readiness',    one: 'Personalised prep plan',    group: 'General exam tips' },
]

/* ── Who is it for ───────────────────────────────────────────── */
const WHO_FOR = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    title: 'Busy Professionals',
    desc: 'Juggling work and upskilling? Train before or after office hours, on weekends, or during breaks — no fixed schedule required.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
      </svg>
    ),
    title: 'Exam Re-takers',
    desc: 'Struggled with a certification? Focus exactly on the topics where you need improvement, with targeted practice and guidance.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
      </svg>
    ),
    title: 'Career Changers',
    desc: 'Transitioning into IT? Get a curriculum built around your background, covering foundations and advanced topics at the right speed.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    title: 'Corporate Teams',
    desc: 'Need to upskill 2–3 team members fast? 1-on-1 or small-group private sessions deliver maximum ROI with minimal downtime.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
      </svg>
    ),
    title: 'Remote Learners Worldwide',
    desc: 'Live anywhere in the world? Attend sessions from your home or office — no travel, no relocation, no compromise on quality.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: 'Fast-Track Learners',
    desc: 'Have a certification deadline coming up? Compress a 5-day course into an intensive sprint tailored to your existing knowledge.',
  },
]

export default function OneOnOneTrainingPage() {
  const [activeTab, setActiveTab] = useState('1on1')

  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif", background: '#f8fafc' }}>

      {/* ── JSON-LD Breadcrumb + FAQ Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.koenig-solutions.com' },
              { '@type': 'ListItem', position: 2, name: 'Learning Options', item: 'https://www.koenig-solutions.com/learning-options' },
              { '@type': 'ListItem', position: 3, name: '1-on-1 Training', item: 'https://www.koenig-solutions.com/1-on-1-training' },
            ],
          }),
        }}
      />

      <Navbar />

      {/* ════════════════════════════════════════════════════════
           HERO
      ════════════════════════════════════════════════════════ */}
      <section
        aria-label="1-on-1 Training Hero"
        style={{ background: 'linear-gradient(135deg, #06111E 0%, #071828 55%, #061624 100%)', position: 'relative', overflow: 'hidden' }}
      >
        {/* Background blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #0694D1 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #0694D1 0%, transparent 70%)' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-16 lg:py-24">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg></li>
              <li><Link href="#" className="hover:text-white transition-colors">Learning Options</Link></li>
              <li aria-hidden="true"><svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg></li>
              <li style={{ color: '#38bdf8' }}>1-on-1 Training</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div>
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.35)', color: '#38bdf8' }}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                Fully Personalized · Expert-Led · Any Schedule
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-tight text-white mb-5">
                Your Training,{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>
                  Your Way
                </span>
                {' '}—{' '}
                <br className="hidden sm:block" />
                1-on-1 with Expert Instructors
              </h1>

              <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.70)' }}>
                Skip the classroom. Get a private certified instructor dedicated entirely to <em>you</em>. Train on your schedule, at your pace, focused on exactly what you need to pass your certification and advance your career.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="#enquiry-form"
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-bold text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 4px 20px rgba(6,148,209,0.4)' }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  Request Free Consultation
                </a>
                <a
                  href="https://wa.me/919840722417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-bold transition-all hover:bg-white/10 active:scale-95"
                  style={{ border: '1.5px solid rgba(37,211,102,0.5)', color: '#25D366' }}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.843L0 24l6.305-1.654A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5.007-1.371l-.359-.214-3.742.981.999-3.65-.234-.375A9.818 9.818 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>
                  Chat on WhatsApp
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {['No group sessions', 'Sessions start in 24h', 'Happiness Guarantee'].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 shrink-0" style={{ color: '#25D366' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(s => (
                <div
                  key={s.label}
                  className="rounded-2xl p-6 text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(6,148,209,0.2)', backdropFilter: 'blur(12px)' }}
                >
                  <div className="text-3xl lg:text-4xl font-extrabold mb-1 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>
                    {s.value}
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           LEARNING OPTIONS TAB BAR
      ════════════════════════════════════════════════════════ */}
      <section aria-label="Learning Options" style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <p className="pt-6 pb-3 text-center text-sm font-semibold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
            Explore All Learning Options
          </p>
          <div className="flex flex-wrap justify-center gap-2 pb-5" role="tablist" aria-label="Training formats">
            {LEARNING_TABS.map(tab => {
              const active = tab.id === activeTab
              return tab.id === '1on1' ? (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
                  style={{
                    background: active ? '#0694D1' : 'transparent',
                    color: active ? '#ffffff' : '#64748b',
                    border: active ? '1.5px solid #0694D1' : '1.5px solid #e2e8f0',
                  }}
                >
                  {tab.label}
                </button>
              ) : (
                <Link
                  key={tab.id}
                  href={tab.href}
                  role="tab"
                  aria-selected={false}
                  className="rounded-full px-5 py-2 text-sm font-semibold transition-all hover:border-[#0694D1] hover:text-[#0694D1]"
                  style={{ background: 'transparent', color: '#64748b', border: '1.5px solid #e2e8f0' }}
                >
                  {tab.label}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           WHY 1-ON-1 TRAINING — BENEFITS GRID
      ════════════════════════════════════════════════════════ */}
      <section aria-labelledby="benefits-heading" className="py-16 lg:py-24" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-widest" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1' }}>
              Why Choose 1-on-1
            </span>
            <h2 id="benefits-heading" className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
              Everything Revolves Around <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>You</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed" style={{ color: '#64748b' }}>
              Unlike group classes, every minute of every session is focused entirely on your learning goals — no distractions, no compromise.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <article
                key={i}
                className="group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(6,148,209,0.12)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)' }}
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1' }}>
                  {b.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#0F172A]">{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           HOW IT WORKS — 4-STEP PROCESS
      ════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="how-it-works-heading"
        className="py-16 lg:py-24"
        style={{ background: 'linear-gradient(135deg, #06111E 0%, #071828 60%, #061624 100%)', position: 'relative', overflow: 'hidden' }}
      >
        {/* Subtle grid overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(6,148,209,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,148,209,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="mb-14 text-center">
            <span className="mb-3 inline-block rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-widest" style={{ background: 'rgba(6,148,209,0.15)', color: '#38bdf8' }}>
              How It Works
            </span>
            <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Start Learning in{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>4 Simple Steps</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg" style={{ color: 'rgba(255,255,255,0.60)' }}>
              From course selection to certification — we make the entire journey seamless.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="relative">
                {/* Connector line for desktop */}
                {i < STEPS.length - 1 && (
                  <div aria-hidden="true" className="hidden lg:block absolute top-10 left-full w-full h-px z-0" style={{ background: 'linear-gradient(90deg, rgba(6,148,209,0.5), rgba(6,148,209,0.1))', width: 'calc(100% - 40px)', left: '70%' }} />
                )}

                <div
                  className="relative z-10 rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(6,148,209,0.2)', backdropFilter: 'blur(10px)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.08)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}
                >
                  {/* Step number */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-5xl font-black leading-none bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, rgba(6,148,209,0.3), rgba(56,189,248,0.15))' }}>
                      {step.num}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.18)', color: '#38bdf8' }}>
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <p className="text-lg font-semibold text-white">Ready to get started?</p>
            <a
              href="#enquiry-form"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 4px 20px rgba(6,148,209,0.35)' }}
            >
              Book a Free Tech Call
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           POPULAR COURSES FOR 1-ON-1
      ════════════════════════════════════════════════════════ */}
      <section aria-labelledby="courses-heading" className="py-16 lg:py-24" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-widest" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1' }}>
              Most Booked
            </span>
            <h2 id="courses-heading" className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
              Popular Courses for{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>1-on-1 Training</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed" style={{ color: '#64748b' }}>
              From cloud to cybersecurity — every course is available as a private 1-on-1 session with a certified expert.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {POPULAR_COURSES.map((c, i) => (
              <article
                key={i}
                className="relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(6,148,209,0.12)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)' }}
              >
                {c.hot && (
                  <span className="absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-xs font-bold" style={{ background: 'rgba(239,68,68,0.10)', color: '#ef4444' }}>
                    🔥 Hot
                  </span>
                )}

                {/* Vendor + code */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-lg px-2.5 py-1 text-xs font-bold" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1' }}>
                    {c.vendor}
                  </span>
                  <span className="text-xs font-mono" style={{ color: '#94a3b8' }}>{c.code}</span>
                </div>

                {/* Name */}
                <h3 className="flex-1 mb-4 text-sm font-bold leading-snug text-[#0F172A]">{c.name}</h3>

                {/* Meta row */}
                <div className="flex items-center gap-3 mb-5 text-xs" style={{ color: '#64748b' }}>
                  <span className="flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    {c.days} days
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                    <span
                      className="rounded-full px-2 py-0.5 font-semibold"
                      style={{
                        background: c.level === 'Beginner' ? 'rgba(34,197,94,0.10)' : c.level === 'Intermediate' ? 'rgba(6,148,209,0.10)' : 'rgba(139,92,246,0.10)',
                        color:      c.level === 'Beginner' ? '#16a34a'            : c.level === 'Intermediate' ? '#0694D1'            : '#7c3aed',
                      }}
                    >
                      {c.level}
                    </span>
                  </span>
                </div>

                <a
                  href="#enquiry-form"
                  className="block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', color: '#ffffff' }}
                >
                  Book 1-on-1 Session
                </a>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm" style={{ color: '#94a3b8' }}>
            Can&apos;t find your course?{' '}
            <a href="#enquiry-form" className="font-semibold hover:underline" style={{ color: '#0694D1' }}>
              Request any course as a 1-on-1 →
            </a>
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           1-ON-1 vs GROUP COMPARISON
      ════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="comparison-heading"
        className="py-16 lg:py-24"
        style={{ background: 'linear-gradient(135deg, #06111E 0%, #071828 60%, #061624 100%)', position: 'relative', overflow: 'hidden' }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(6,148,209,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,148,209,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative mx-auto max-w-5xl px-4 md:px-8 lg:px-[50px]">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-widest" style={{ background: 'rgba(6,148,209,0.15)', color: '#38bdf8' }}>
              Compare
            </span>
            <h2 id="comparison-heading" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              1-on-1 Training vs{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Group Classes</span>
            </h2>
            <p className="mx-auto max-w-xl text-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>
              See why thousands of professionals choose private training over batch classes.
            </p>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(6,148,209,0.2)' }}>
            {/* Header */}
            <div className="grid grid-cols-3 text-sm font-bold" style={{ background: 'rgba(6,148,209,0.15)' }}>
              <div className="px-6 py-4" style={{ color: 'rgba(255,255,255,0.5)' }}>Feature</div>
              <div className="px-6 py-4 text-center" style={{ color: '#38bdf8' }}>
                <span className="inline-flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  1-on-1 Training
                </span>
              </div>
              <div className="px-6 py-4 text-center" style={{ color: 'rgba(255,255,255,0.45)' }}>Group Class</div>
            </div>

            {COMPARISON.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 text-sm transition-colors"
                style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent', borderTop: '1px solid rgba(6,148,209,0.10)' }}
              >
                <div className="px-6 py-4 font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{row.feature}</div>
                <div className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: '#38bdf8' }}>
                    <svg className="h-4 w-4 shrink-0" style={{ color: '#22c55e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {row.one}
                  </span>
                </div>
                <div className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    <svg className="h-4 w-4 shrink-0" style={{ color: 'rgba(239,68,68,0.6)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    {row.group}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#enquiry-form"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 4px 20px rgba(6,148,209,0.35)' }}
            >
              Start My 1-on-1 Journey
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           WHO IS 1-ON-1 FOR?
      ════════════════════════════════════════════════════════ */}
      <section aria-labelledby="who-for-heading" className="py-16 lg:py-24" style={{ background: '#ffffff' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-widest" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1' }}>
              Is It Right for You?
            </span>
            <h2 id="who-for-heading" className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
              Who Is 1-on-1 Training{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Perfect For?</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed" style={{ color: '#64748b' }}>
              Whether you&apos;re a first-timer or a seasoned professional, 1-on-1 training adapts to every learner profile.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHO_FOR.map((w, i) => (
              <article
                key={i}
                className="flex gap-5 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.35)'; (e.currentTarget as HTMLElement).style.background = '#ffffff'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(6,148,209,0.10)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.background = '#f8fafc'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
              >
                <div className="shrink-0 mt-0.5 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1' }}>
                  {w.icon}
                </div>
                <div>
                  <h3 className="mb-1.5 text-base font-bold text-[#0F172A]">{w.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{w.desc}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom banner */}
          <div className="mt-14 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ background: 'linear-gradient(135deg, #06111E, #071828)', border: '1px solid rgba(6,148,209,0.25)' }}>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                Not sure if 1-on-1 is right for you?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)' }} className="text-sm max-w-lg">
                Talk to a Koenig advisor for free — they&apos;ll assess your goals and recommend the best learning format, no commitment required.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90 whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 4px 20px rgba(6,148,209,0.35)' }}
              >
                Talk to an Advisor
              </a>
              <a
                href="https://wa.me/919840722417"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:bg-white/10 whitespace-nowrap"
                style={{ border: '1.5px solid rgba(37,211,102,0.45)', color: '#25D366' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.843L0 24l6.305-1.654A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5.007-1.371l-.359-.214-3.742.981.999-3.65-.234-.375A9.818 9.818 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

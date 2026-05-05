'use client'
import { useState, useRef } from 'react'
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
  { vendor: 'Microsoft', code: 'AZ-104',  name: 'Microsoft Azure Administrator',                        days: 5, level: 'Intermediate', hot: true,  tz: 'IST / GST / GMT' },
  { vendor: 'AWS',       code: 'SAA-C03', name: 'AWS Solutions Architect – Associate',                   days: 4, level: 'Intermediate', hot: true,  tz: 'EST / GMT / IST' },
  { vendor: 'CompTIA',   code: 'SY0-701', name: 'CompTIA Security+',                                     days: 5, level: 'Intermediate', hot: true,  tz: 'All timezones'   },
  { vendor: 'Cisco',     code: 'CCNA',    name: 'CCNA – Cisco Certified Network Associate',               days: 5, level: 'Beginner',     hot: false, tz: 'IST / GST'       },
  { vendor: 'ISC2',      code: 'CISSP',   name: 'CISSP – Certified Information Systems Security Professional', days: 5, level: 'Advanced', hot: true, tz: 'EST / GMT / IST' },
  { vendor: 'PMI',       code: 'PMP',     name: 'Project Management Professional (PMP)',                 days: 4, level: 'Advanced',     hot: true,  tz: 'All timezones'   },
  { vendor: 'Microsoft', code: 'AZ-305',  name: 'Azure Solutions Architect Expert',                      days: 4, level: 'Advanced',     hot: false, tz: 'IST / GST / GMT' },
  { vendor: 'CompTIA',   code: 'N10-009', name: 'CompTIA Network+',                                      days: 5, level: 'Beginner',     hot: false, tz: 'All timezones'   },
]

const VENDOR_BADGE = 'bg-[#076D9D]/30 text-[#3AB6EB] ring-1 ring-[#0694D1]/40'

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

/* ── Testimonials ────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'Adham Al Maqasi',
    country: 'Oman',
    flag: '🇴🇲',
    course: 'Microsoft Azure Administrator',
    rating: 5,
    text: 'I wanted to take a moment to express my deep appreciation for your exceptional skills as a trainer. Your dedication, expertise, and unwavering commitment to your craft are truly inspiring. You have a unique ability to connect with your trainees, instilling in them a sense of belief and motivation.',
  },
  {
    name: 'Emmanuel MASABO',
    country: 'Rwanda',
    flag: '🇷🇼',
    course: 'CompTIA Security+',
    rating: 5,
    text: 'The trainer is very organised. She helped us understand the difficult course concepts in simple ways. She managed the time in a professional way as the content was huge but all was delivered us perfectly. Our trainer is kind, always happy, understanding and puts the class in the great learning mood.',
  },
  {
    name: 'Yoosuf Nizam',
    country: 'Maldives',
    flag: '🇲🇻',
    course: 'ISO 22301 Lead Implementer',
    rating: 5,
    text: 'This trainer is undoubtedly one of the finest trainers I have encountered during my training journeys. His profound knowledge and articulate teaching style make complex concepts remarkably accessible. His consistent preparation for each session greatly enhanced my learning experience.',
  },
  {
    name: 'Amjad Kushar',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    course: 'AWS Solutions Architect',
    rating: 5,
    text: 'I would like to express my sincere appreciation to the trainer for providing such an outstanding learning experience. I look forward to taking another course in the future.',
  },
  {
    name: 'David Muriuki',
    country: 'Kenya',
    flag: '🇰🇪',
    course: 'ISO 22301 Lead Implementer',
    rating: 5,
    text: 'I recently had the privilege of attending this course and I must commend the exceptional pedagogical skills demonstrated by our trainer. His approach to teaching was nothing short of excellent, blending professionalism with a deep understanding of the subject matter.',
  },
  {
    name: 'Monica Kalamula',
    country: 'Malawi',
    flag: '🇲🇼',
    course: 'Project Management Professional',
    rating: 5,
    text: 'From the outset, it was evident that the instructor possessed a deep understanding of the subject matter. His expertise shone through not only his grasp of theoretical concepts but also his ability to translate complex ideas into easily digestible information.',
  },
]

/* ── FAQs ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How can I schedule a 1-on-1 batch?',
    a: 'Simply visit your desired course page and choose your preferred start date and time. If you\'d like personalised guidance, fill out our enquiry form to schedule a free tech call with a Koenig Solutions expert. They\'ll help you find the ideal training match.',
  },
  {
    q: 'Can I take training over the weekend?',
    a: 'Absolutely. 1-on-1 training sessions can be scheduled on any day of the week, including Saturdays and Sundays, as well as public holidays. Just let us know your preferred time when you enquire.',
  },
  {
    q: 'Can I change the schedule after booking a training?',
    a: 'Yes, you can reschedule your session at any time before it begins, subject to trainer availability. Simply contact your account manager or reach us on WhatsApp and we\'ll coordinate the change for you.',
  },
  {
    q: 'My colleague and I would like to be trained together. Can we set up a 1-on-2 training?',
    a: 'Yes! Koenig supports small-group private sessions (1-on-2 or 1-on-3). Both participants still benefit from a dedicated instructor and fully customised content, with the added bonus of a shared learning experience.',
  },
  {
    q: 'Can I opt for a longer duration than prescribed for the standard course?',
    a: 'Yes. Because sessions are fully private, you can request additional hours, extra lab time, or extended deep-dives on specific topics. Your instructor will adapt the schedule and content to suit the extended duration.',
  },
  {
    q: 'Is 1-on-1 training available for all 5,000+ courses?',
    a: 'Yes. Every course in the Koenig catalogue — across Microsoft, AWS, Cisco, CompTIA, PMI, and hundreds more vendors — is available in 1-on-1 format. If you don\'t see a specific course, contact us and we\'ll arrange it.',
  },
]

export default function OneOnOneTrainingPage() {
  const [activeTab, setActiveTab] = useState('1on1')
  const tabScrollRef = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [reviewTab, setReviewTab] = useState<'reviews' | 'faqs'>('reviews')
  const [formType, setFormType] = useState<'individual' | 'enterprise'>('individual')
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', course: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

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

        <style>{`
          @keyframes lolFloat1 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
          @keyframes lolFloat2 { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-8px) rotate(-1deg)} }
          @keyframes lolFloat3 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(9px) translateX(3px)} }
          @keyframes lolFloat4 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(8px) rotate(1.5deg)} }
          @keyframes lolGlow   { 0%,100%{box-shadow:0 4px 18px rgba(6,109,157,0.30),inset 0 1px 0 rgba(255,255,255,0.18)} 50%{box-shadow:0 4px 28px rgba(6,148,209,0.55),0 0 16px rgba(58,182,235,0.30),inset 0 1px 0 rgba(255,255,255,0.28)} }
        `}</style>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-5 lg:py-[50px]">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left copy */}
            <div>
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.35)', color: '#38bdf8' }}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                Fully Personalized · Expert-Led · Any Schedule
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-bold leading-tight text-white mb-5">
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
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="#enquiry-form"
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-bold text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 4px 20px rgba(6,148,209,0.4)' }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  Request Free Consultation
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  { text: 'No group sessions',   color: '#38bdf8', bg: 'rgba(6,148,209,0.13)',  border: 'rgba(6,148,209,0.32)'  },
                  { text: 'Sessions start in 24h', color: '#34d399', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.32)' },
                  { text: 'Happiness Guarantee', color: '#fbbf24', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.32)' },
                ].map(({ text, color, bg, border }) => (
                  <span key={text} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                    style={{ background: bg, border: `1px solid ${border}`, color }}>
                    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — image with floating stat cards */}
            <div className="hidden lg:block">
              <div className="relative mx-auto" style={{ width: '500px', padding: '44px' }}>
                {([
                  { val: '300+',   label: 'Instructors',  pos: { top: 0,    left: 0  }, anim: 'lolFloat1 3.4s ease-in-out infinite' },
                  { val: '5,000+', label: 'Courses',      pos: { top: 0,    right: 0 }, anim: 'lolFloat2 3.8s ease-in-out infinite 0.5s' },
                  { val: '99.1%',  label: 'Satisfaction', pos: { bottom: 0, left: 0  }, anim: 'lolFloat3 4.0s ease-in-out infinite 1.0s' },
                  { val: '24h',    label: 'Start Time',   pos: { bottom: 0, right: 0 }, anim: 'lolFloat4 3.6s ease-in-out infinite 1.5s' },
                ] as { val: string; label: string; pos: React.CSSProperties; anim: string }[]).map(({ val, label, pos, anim }) => (
                  <div key={val} className="absolute flex flex-col items-center justify-center rounded-xl"
                    style={{ ...pos, width: 76, padding: '8px 10px', background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(6,148,209,0.30)', textAlign: 'center', animation: `${anim}, lolGlow 3s ease-in-out infinite`, zIndex: 10 }}>
                    <span className="text-base font-black leading-none" style={{ color: '#0694D1' }}>{val}</span>
                    <span className="text-[10px] font-medium mt-0.5" style={{ color: '#475569' }}>{label}</span>
                  </div>
                ))}
                <div className="relative overflow-hidden rounded-2xl"
                  style={{ background: 'rgba(6,25,45,0.52)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1.5px solid rgba(6,148,209,0.50)', boxShadow: '0 0 0 4px rgba(6,148,209,0.08), 0 0 30px 6px rgba(6,148,209,0.22), 0 8px 40px rgba(6,109,157,0.28)' }}>
                  <img src="/images/home-banner/1on1.png" alt="1-on-1 Training with Expert Instructor" className="w-full h-auto object-contain" />
                </div>
              </div>
            </div>

            {/* Mobile — stat tiles */}
            <div className="lg:hidden grid grid-cols-4 gap-2 mt-4">
              {STATS.map(s => (
                <div key={s.label} className="flex flex-col items-center justify-center rounded-xl py-3 px-1"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(6,148,209,0.30)', backdropFilter: 'blur(12px)' }}>
                  <span className="text-sm font-black leading-none" style={{ color: '#38bdf8' }}>{s.value}</span>
                  <span className="text-[10px] font-medium mt-0.5 text-center leading-tight" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           TRAINING MODE TABS
      ════════════════════════════════════════════════════════ */}
      <style>{`
        @keyframes tab-border-sweep { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .tab-border-glow { background:linear-gradient(270deg,#0694D1,#38bdf8,#076D9D,#38bdf8,#0694D1); background-size:400% 400%; animation:tab-border-sweep 3s ease infinite; padding:2px; border-radius:1rem; display:inline-flex; }
      `}</style>
      <section className="bg-white border-b py-4" style={{ borderColor: '#E2E8F0' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          {/* Mobile: scrollable */}
          <div className="sm:hidden">
            <div className="tab-border-glow" style={{ display: 'block', width: '100%' }}>
              <div ref={tabScrollRef} className="flex overflow-x-auto rounded-[14px] bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {LEARNING_TABS.map(t =>
                  t.id === '1on1' ? (
                    <button key={t.id}
                      className="relative whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 px-6 py-3 text-sm bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30">
                      {t.label}
                    </button>
                  ) : (
                    <Link key={t.id} href={t.href}
                      className="inline-flex items-center relative whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 px-4 py-3 text-sm text-[#7a8c96]">
                      {t.label}
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
                {LEARNING_TABS.map(t =>
                  t.id === '1on1' ? (
                    <button key={t.id}
                      className="relative whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 px-8 py-3 text-sm sm:text-base bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30">
                      {t.label}
                    </button>
                  ) : (
                    <Link key={t.id} href={t.href}
                      className="inline-flex items-center relative whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 px-6 py-3 text-sm text-[#7a8c96] hover:text-[#093148]">
                      {t.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           WHY 1-ON-1 TRAINING — BENEFITS GRID
      ════════════════════════════════════════════════════════ */}
      <section aria-labelledby="benefits-heading" className="py-10" style={{ background: '#f8fafc' }}>
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
        className="py-10"
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
      <section aria-labelledby="courses-heading" className="relative overflow-hidden bg-koenig-light px-4 md:px-8 lg:px-[50px] py-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.20) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 h-[300px] w-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.18) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="mb-1 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-koenig-blue">Most Booked</span>
              <h2 id="courses-heading" className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-koenig-dark">
                Popular Courses for{' '}
                <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">1-on-1 Training</span>
              </h2>
              <p className="text-sm text-koenig-muted">Every course available as a private session — start any day, any timezone.</p>
            </div>
            <a
              href="#enquiry-form"
              className="group inline-flex shrink-0 items-center gap-3 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg,#093148,#076D9D)' }}
            >
              Browse All Courses
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.18)' }}>→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {POPULAR_COURSES.map((c, i) => (
              <a
                key={i}
                href="#enquiry-form"
                role="button"
                tabIndex={0}
                className="group relative cursor-pointer rounded-xl bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-koenig-blue block"
                style={{ border: '1px solid #CAEFFF', boxShadow: '0 4px 16px rgba(0,164,239,0.10)' }}
              >
                {/* Row 1 — vendor badge + hot badge / level */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold whitespace-nowrap ${VENDOR_BADGE}`}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                      {c.vendor}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold whitespace-nowrap bg-[#EBF8FE] text-[#0694d1]">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="13" rx="2"/><polyline points="8 21 12 17 16 21"/><line x1="2" y1="16" x2="22" y2="16"/></svg>
                      1-on-1 Online
                    </span>
                  </div>
                  {c.hot && (
                    <span className="rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap bg-red-50 text-red-600">🔥 Hot</span>
                  )}
                </div>

                {/* Row 2 — course name */}
                <h3 className="mb-1.5 text-sm font-semibold text-koenig-navy transition-colors group-hover:text-koenig-blue leading-snug">{c.name}</h3>

                {/* Row 3 — meta */}
                <div className="mb-3 flex items-center gap-2 text-xs text-koenig-gray flex-wrap">
                  <span className="flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Start Anytime
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {c.days * 8} Hrs ({c.days}d)
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 truncate">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    {c.tz}
                  </span>
                </div>

                {/* Row 4 — footer */}
                <div className="flex items-center justify-between border-t border-koenig-border pt-3">
                  <div>
                    <p className="text-xs text-koenig-muted">Level</p>
                    <p className="text-sm font-bold text-koenig-dark"
                      style={{ color: c.level === 'Beginner' ? '#16a34a' : c.level === 'Intermediate' ? '#0694D1' : '#7c3aed' }}>
                      {c.level}
                    </p>
                  </div>
                  <span className="rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all whitespace-nowrap group-hover:shadow-lg" style={{ background: '#093148' }}>
                    Book 1-on-1 →
                  </span>
                </div>
              </a>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-koenig-muted">
            Can&apos;t find your course?{' '}
            <a href="#enquiry-form" className="font-semibold hover:underline text-koenig-blue">
              Request any of 5,000+ courses as a 1-on-1 →
            </a>
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           1-ON-1 vs GROUP COMPARISON
      ════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="comparison-heading"
        className="py-10"
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
      <section aria-labelledby="who-for-heading" className="py-10" style={{ background: '#ffffff' }}>
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

      {/* ════════════════════════════════════════════════════════
           REVIEWS & FAQ  (tabbed)
      ════════════════════════════════════════════════════════ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      <section className="py-10" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">

          {/* Tab toggle */}
          <div className="mb-10 flex justify-center">
            <div className="tab-border-glow">
              <div className="inline-flex overflow-hidden rounded-[14px] bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]">
                {([
                  { id: 'reviews' as const, label: 'Student Reviews' },
                  { id: 'faqs'    as const, label: 'Common Questions' },
                ]).map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setReviewTab(tab.id)}
                    className={`relative whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 ${
                      reviewTab === tab.id
                        ? 'px-6 sm:px-8 py-3 text-sm sm:text-base bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30'
                        : 'px-4 sm:px-6 py-2.5 text-sm text-[#7a8c96] hover:text-[#093148]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Student Reviews panel ── */}
          {reviewTab === 'reviews' && (
            <>
              <div className="mb-10 text-center">
                <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
                  What Our Students{' '}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Are Saying</span>
                </h2>
                <p className="mx-auto max-w-2xl text-lg leading-relaxed" style={{ color: '#64748b' }}>
                  Real reviews from professionals who trained 1-on-1 with Koenig. We use pseudonyms to protect privacy.
                </p>
                <div className="mt-5 inline-flex items-center gap-3 rounded-full px-5 py-2" style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4" style={{ color: '#f59e0b' }} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#0F172A]">4.9 / 5</span>
                  <span className="text-sm" style={{ color: '#94a3b8' }}>from 12,000+ reviews</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, i) => (
                  <article
                    key={i}
                    className="flex flex-col rounded-2xl p-7 transition-all duration-300"
                    style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(6,148,209,0.10)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.3)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0' }}
                  >
                    <div className="mb-4 flex items-center gap-0.5">
                      {[...Array(t.rating)].map((_, j) => (
                        <svg key={j} className="h-4 w-4" style={{ color: '#f59e0b' }} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <blockquote className="flex-1 mb-5 text-sm leading-relaxed" style={{ color: '#475569' }}>
                      &ldquo;{t.text}&rdquo;
                    </blockquote>
                    <div className="mb-4">
                      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgba(6,148,209,0.08)', color: '#0694D1' }}>
                        {t.course}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #f1f5f9' }}>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold" style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', color: '#ffffff' }}>
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0F172A]">{t.name}</p>
                        <p className="text-xs" style={{ color: '#94a3b8' }}>{t.flag} {t.country}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {/* ── Common Questions panel ── */}
          {reviewTab === 'faqs' && (
            <div className="mx-auto max-w-3xl">
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
          )}

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           ENQUIRY FORM
      ════════════════════════════════════════════════════════ */}
      <section
        id="enquiry-form"
        aria-labelledby="form-heading"
        className="py-10"
        style={{ background: 'linear-gradient(135deg, #06111E 0%, #071828 60%, #061624 100%)', position: 'relative', overflow: 'hidden' }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(6,148,209,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,148,209,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #0694D1 0%, transparent 70%)' }} />

        <div className="relative mx-auto max-w-2xl px-4 md:px-8 lg:px-0">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-widest" style={{ background: 'rgba(6,148,209,0.15)', color: '#38bdf8' }}>
              Get Started
            </span>
            <h2 id="form-heading" className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Request More Information
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)' }} className="text-base">
              Tell us about your training goals and we&apos;ll get back to you within 2 hours.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl p-12 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(6,148,209,0.3)' }}>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'rgba(34,197,94,0.15)' }}>
                <svg className="h-8 w-8" style={{ color: '#22c55e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Thank you!</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)' }}>A Koenig advisor will contact you within 2 hours.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ firstName: '', lastName: '', email: '', phone: '', course: '', message: '' }) }}
                className="mt-6 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-80"
                style={{ background: 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.4)' }}
              >
                Submit Another
              </button>
            </div>
          ) : (
            <div className="rounded-2xl p-8 sm:p-10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(6,148,209,0.2)', backdropFilter: 'blur(16px)' }}>
              {/* Contact quick-links */}
              <div className="flex gap-3 mb-7">
                <a href="mailto:info@koenig-solutions.com" className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.05)' }}>
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                  Email Us
                </a>
                <a href="https://wa.me/919840722417" target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ border: '1px solid rgba(37,211,102,0.35)', color: '#25D366', background: 'rgba(37,211,102,0.05)' }}>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.843L0 24l6.305-1.654A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5.007-1.371l-.359-.214-3.742.981.999-3.65-.234-.375A9.818 9.818 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>
                  WhatsApp
                </a>
              </div>

              {/* Individual / Enterprise toggle */}
              <div className="flex rounded-xl p-1 mb-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {(['individual', 'enterprise'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormType(t)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all capitalize"
                    style={formType === t ? { background: '#0694D1', color: '#ffffff', boxShadow: '0 2px 8px rgba(6,148,209,0.4)' } : { color: 'rgba(255,255,255,0.45)', background: 'transparent' }}
                  >
                    {t === 'individual' ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    )}
                    {t}
                  </button>
                ))}
              </div>

              {/* Form fields */}
              <form
                onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.40)' }}>First Name <span style={{ color: '#0694D1' }}>*</span></label>
                    <input
                      required
                      type="text"
                      placeholder="John"
                      value={form.firstName}
                      onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(6,148,209,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(6,148,209,0.12)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none' }}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.40)' }}>Last Name <span style={{ color: '#0694D1' }}>*</span></label>
                    <input
                      required
                      type="text"
                      placeholder="Smith"
                      value={form.lastName}
                      onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(6,148,209,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(6,148,209,0.12)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.40)' }}>{formType === 'enterprise' ? 'Business ' : ''}Email <span style={{ color: '#0694D1' }}>*</span></label>
                  <input
                    required
                    type="email"
                    placeholder={formType === 'enterprise' ? 'you@company.com' : 'you@email.com'}
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(6,148,209,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(6,148,209,0.12)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.40)' }}>Phone / WhatsApp <span style={{ color: '#0694D1' }}>*</span></label>
                  <input
                    required
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(6,148,209,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(6,148,209,0.12)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.40)' }}>Course Name</label>
                  <input
                    type="text"
                    placeholder="e.g. AZ-104, CISSP, PMP…"
                    value={form.course}
                    onChange={e => setForm(f => ({ ...f, course: e.target.value }))}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(6,148,209,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(6,148,209,0.12)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.40)' }}>Tell us about your Training Goals</label>
                  <textarea
                    rows={4}
                    placeholder="e.g. I want to pass AZ-104 within 3 weeks, currently a network engineer…"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25 resize-none"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(6,148,209,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(6,148,209,0.12)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl py-4 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 4px 20px rgba(6,148,209,0.4)' }}
                >
                  Submit Request
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           FINAL CTA STRIP
      ════════════════════════════════════════════════════════ */}
      <section
        aria-label="Final call to action"
        className="py-14"
        style={{ background: '#0694D1' }}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                Ready to Train 1-on-1?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-base">
                Sessions start in as little as 24 hours. No group, no compromise.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition-all whitespace-nowrap"
                style={{ background: '#ffffff', color: '#0694D1', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
              >
                Book Free Consultation
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
              <a
                href="https://wa.me/919840722417"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10 whitespace-nowrap"
                style={{ border: '2px solid rgba(255,255,255,0.6)' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.843L0 24l6.305-1.654A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5.007-1.371l-.359-.214-3.742.981.999-3.65-.234-.375A9.818 9.818 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           FOOTER
      ════════════════════════════════════════════════════════ */}
      <footer style={{ background: '#06111E', borderTop: '1px solid rgba(6,148,209,0.15)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div style={{ background: '#ffffff', borderRadius: '6px', padding: '6px 10px' }}>
                  <span className="text-sm font-black" style={{ color: '#06111E' }}>KOENIG</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '280px' }}>
                Global IT training leader since 1993. 5,000+ courses, 300+ expert instructors, 13+ global locations.
              </p>
              <div className="flex items-center gap-1.5 text-sm mb-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <svg className="h-4 w-4 shrink-0" style={{ color: '#25D366' }} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.843L0 24l6.305-1.654A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5.007-1.371l-.359-.214-3.742.981.999-3.65-.234-.375A9.818 9.818 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>
                <a href="https://wa.me/919840722417" className="hover:text-white transition-colors">+91-984-072-2417</a>
              </div>
              <div className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                <a href="mailto:info@koenig-solutions.com" className="hover:text-white transition-colors">info@koenig-solutions.com</a>
              </div>
            </div>

            {/* Learning Options */}
            <div>
              <h4 className="mb-4 text-sm font-bold text-white">Learning Options</h4>
              <ul className="space-y-2.5">
                {['Live Online Training', '1-on-1 Training', 'Classroom Training', 'Fly-Me-a-Trainer', 'Flexi Training', 'Customized Training'].map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-sm font-bold text-white">Company</h4>
              <ul className="space-y-2.5">
                {['About Koenig', 'Our Story', 'Leadership', 'Our Clients', 'Our Awards', 'Careers'].map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="mb-4 text-sm font-bold text-white">Support</h4>
              <ul className="space-y-2.5">
                {['Student Feedback', 'Happiness Guarantee', 'Refund Policy', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.30)' }}>
              © 1997–2026 Koenig Solutions Pvt. Ltd. All rights reserved.
            </p>
            <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>
              We believe in &ldquo;Err is Human, to Admit Divine!&rdquo; — feel free to{' '}
              <a href="mailto:webmaster@koenig-solutions.com" className="hover:text-white transition-colors" style={{ color: 'rgba(6,148,209,0.7)' }}>
                write to us
              </a>{' '}
              if you spot any issues.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}

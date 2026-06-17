'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

/* ── Learning tabs ───────────────────────────────────────────── */
const LEARNING_TABS = [
  { id: 'ilo',      label: 'Live Online Classroom (ILO)', href: '/live-online-classroom' },
  { id: 'classroom',label: 'Classroom Training',          href: '/classroom-training'   },
  { id: 'flexi',    label: 'Flexi',                       href: '/flexi-training'       },
  { id: '1on1',     label: '1-on-1 Training',             href: '/1-on-1-training'      },
  { id: 'fmat',     label: 'Fly-Me-a-Trainer (FMAT)',     href: '#'                     },
]

/* ── Stats ───────────────────────────────────────────────────── */
const STATS = [
  { value: '5,000+', label: 'Courses' },
  { value: '300+',   label: 'Instructors' },
  { value: '33+',    label: 'Years' },
  { value: '99.1%',  label: 'Satisfaction' },
]

/* ── Benefits ────────────────────────────────────────────────── */
const BENEFITS = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    title: 'Flexible Scheduling',
    desc: 'Train on any day — including weekends and holidays. Pick start times that fit your time zone and daily routine.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Fully Customized Curriculum',
    desc: 'Syllabus adapted to your skill level, goals, and pace. Skip what you know, deep-dive where it matters.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
    title: 'Accelerated Learning',
    desc: "Learn up to 3× faster than group classes. No waiting — the instructor's entire attention is on you.",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
    title: 'Certified Expert Instructors',
    desc: '300+ industry-certified trainers with real-world experience, handpicked to match your technical domain.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: 'Train From Anywhere',
    desc: 'Fully online, live sessions from your home or office. No travel, no relocation — just pure learning.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    title: 'Guaranteed to Run',
    desc: 'Every booked session runs — no minimum enrolments, no cancellations. Your slot is yours alone.',
  },
]

/* ── How It Works ────────────────────────────────────────────── */
const HOW_STEPS = [
  {
    step: '01',
    title: 'Choose Your Course',
    desc: 'Browse 5,000+ courses across Microsoft, AWS, Cisco, CompTIA and more. Our advisors can help you pick the right path.',
    tags: ['5,000+ Courses', 'Expert Guidance'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>,
  },
  {
    step: '02',
    title: 'Pick Your Schedule',
    desc: 'Select any start date — weekday, weekend, morning or evening. Sessions can begin in as little as 24 hours.',
    tags: ['Any Day', 'Start in 24h'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>,
  },
  {
    step: '03',
    title: 'Get Matched with an Expert',
    desc: 'We assign a certified instructor who specialises in your exact topic. Request a change at any time.',
    tags: ['Certified Trainer', 'Perfect Match'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>,
  },
  {
    step: '04',
    title: 'Learn, Practice & Certify',
    desc: 'Attend live sessions, get hands-on labs, ask questions freely, and walk away exam-ready — backed by our Happiness Guarantee.',
    tags: ['Live Labs', 'Exam Ready'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>,
  },
]

/* ── Popular courses ─────────────────────────────────────────── */
const POPULAR_COURSES = [
  { vendor: 'Microsoft', code: 'AZ-104',  name: 'Microsoft Azure Administrator',                             days: 5, level: 'Intermediate', hot: true,  enrolled: '4,200+', rating: '4.9', price: '33,000' },
  { vendor: 'AWS',       code: 'SAA-C03', name: 'AWS Solutions Architect – Associate',                        days: 4, level: 'Intermediate', hot: true,  enrolled: '3,800+', rating: '4.8', price: '35,000' },
  { vendor: 'CompTIA',   code: 'SY0-701', name: 'CompTIA Security+',                                          days: 5, level: 'Intermediate', hot: true,  enrolled: '3,500+', rating: '4.7', price: '28,000' },
  { vendor: 'Cisco',     code: 'CCNA',    name: 'CCNA – Cisco Certified Network Associate',                    days: 5, level: 'Beginner',     hot: false, enrolled: '2,900+', rating: '4.6', price: '32,000' },
  { vendor: 'ISC2',      code: 'CISSP',   name: 'CISSP – Certified Information Systems Security Professional', days: 5, level: 'Advanced',     hot: true,  enrolled: '1,800+', rating: '4.9', price: '45,000' },
  { vendor: 'PMI',       code: 'PMP',     name: 'Project Management Professional (PMP)',                      days: 4, level: 'Advanced',     hot: true,  enrolled: '5,200+', rating: '4.8', price: '38,000' },
  { vendor: 'Microsoft', code: 'AZ-305',  name: 'Azure Solutions Architect Expert',                           days: 4, level: 'Advanced',     hot: false, enrolled: '2,100+', rating: '4.7', price: '42,000' },
  { vendor: 'CompTIA',   code: 'N10-009', name: 'CompTIA Network+',                                           days: 5, level: 'Beginner',     hot: false, enrolled: '2,600+', rating: '4.6', price: '25,000' },
]

/* ── Comparison ──────────────────────────────────────────────── */
const COMPARISON = [
  { feature: 'Class Size',        one: 'Just you',               group: '8–20 students'        },
  { feature: 'Schedule',          one: 'Any day, any time',      group: 'Fixed batch dates'     },
  { feature: 'Pace',              one: 'Entirely your pace',     group: "Trainer's set pace"    },
  { feature: 'Curriculum',        one: 'Tailored to your goals', group: 'Standard syllabus'     },
  { feature: 'Instructor Focus',  one: '100% on you',            group: 'Split across students' },
  { feature: 'Start Date',        one: 'As early as tomorrow',   group: 'Next scheduled batch'  },
  { feature: 'Session Recording', one: 'Available on request',   group: 'Shared recording'      },
  { feature: 'Exam Readiness',    one: 'Personalised prep plan', group: 'General exam tips'     },
]

/* ── Who is it for ───────────────────────────────────────────── */
const WHO_FOR = [
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>, title: 'Busy Professionals', desc: 'Juggling work and upskilling? Train before or after office hours, on weekends, or during breaks — no fixed schedule.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>, title: 'Exam Re-takers', desc: 'Struggled with a certification? Focus exactly on the topics where you need improvement with targeted practice.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg>, title: 'Career Changers', desc: 'Transitioning into IT? Get a curriculum built around your background, covering foundations at the right speed.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>, title: 'Corporate Teams', desc: 'Need to upskill 2–3 team members fast? 1-on-1 or small-group private sessions deliver maximum ROI.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: 'Remote Learners Worldwide', desc: 'Live anywhere in the world? Attend sessions from your home — no travel, no relocation, no compromise on quality.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>, title: 'Fast-Track Learners', desc: 'Have a certification deadline? Compress a 5-day course into an intensive sprint tailored to your existing knowledge.' },
]

/* ── Testimonials ────────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: 'Adham Al Maqasi',  role: 'IT Professional, 🇴🇲 Oman',         course: 'AZ-104: Microsoft Azure Administrator',     initials: 'AA', bg: 'linear-gradient(135deg,#076D9D,#4DBFEF)', quote: 'Your dedication, expertise, and unwavering commitment are truly inspiring. You have a unique ability to connect with trainees, instilling a sense of belief and motivation that stays long after the sessions end.' },
  { name: 'Emmanuel Masabo',  role: 'Network Engineer, 🇷🇼 Rwanda',        course: 'CCNA (200-301): Cisco Certified Network Associate', initials: 'EM', bg: 'linear-gradient(135deg,#093148,#076D9D)', quote: 'The trainer is very organised. She helped us understand difficult concepts in simple ways. She managed the time professionally — the content was huge but all was delivered perfectly.' },
  { name: 'Yoosuf Nizam',     role: 'Cloud Architect, 🇲🇻 Maldives',       course: 'AWS Solutions Architect – Associate (SAA-C03)', initials: 'YN', bg: 'linear-gradient(135deg,#F47920,#f6a05c)', quote: 'This trainer is undoubtedly one of the finest I have encountered. His profound knowledge and articulate teaching style make complex concepts remarkably accessible.' },
  { name: 'Amjad Kushar',     role: 'IT Manager, 🇸🇦 Saudi Arabia',        course: 'AZ-500: Microsoft Azure Security Technologies', initials: 'AK', bg: 'linear-gradient(135deg,#093148,#F47920)', quote: 'I would like to express my sincere appreciation to the trainer for providing such an outstanding learning experience. Every session was tailored precisely to my knowledge gaps.' },
  { name: 'David Muriuki',    role: 'Security Engineer, 🇰🇪 Kenya',        course: 'CEH v13: Certified Ethical Hacker',            initials: 'DM', bg: 'linear-gradient(135deg,#34A853,#076D9D)', quote: 'His approach was nothing short of excellent — blending professionalism with a deep understanding of real-world scenarios that made every session highly engaging.' },
  { name: 'Monica Kalamula',  role: 'Systems Admin, 🇲🇼 Malawi',           course: 'CompTIA Security+ (SY0-701)',                  initials: 'MK', bg: 'linear-gradient(135deg,#476D8D,#0694D1)', quote: 'From the outset it was evident the instructor possessed a deep understanding of the subject. His expertise shone through in his ability to translate complex ideas into digestible information.' },
  { name: 'Fredrick F. Arthur', role: 'Data Analyst, 🇬🇭 Ghana',           course: 'PL-300: Microsoft Power BI Data Analyst',      initials: 'FA', bg: 'linear-gradient(135deg,#0694D1,#38bdf8)', quote: 'Your passion and expertise in teaching Power BI have been incredibly motivating. Your clear explanations and practical approach made the learning journey truly enjoyable.' },
  { name: 'Anacleto F. da Rosa', role: 'Developer, 🇦🇴 Angola',            course: 'Python Programming (PCEP)',                    initials: 'AF', bg: 'linear-gradient(135deg,#7c3aed,#0694D1)', quote: 'My teacher is very friendly and knowledgeable. The teacher has a passion for Python and explains every topic so well. I am very happy with the 1-on-1 training experience.' },
  { name: 'Emanuel B. Mahina', role: 'Security Specialist, 🇦🇴 Angola',    course: 'CISSP – Certified Information Systems Security Professional', initials: 'EB', bg: 'linear-gradient(135deg,#16a34a,#0694D1)', quote: 'I received one of the best trainings and with the best trainer in the security area. I have gained a lot of knowledge that I am already applying in my daily work.' },
]

/* ── FAQs ────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'How can I schedule a 1-on-1 batch?', a: "Simply visit your desired course page and choose your preferred start date and time. If you'd like personalised guidance, fill out our enquiry form to schedule a free tech call with a Koenig Solutions expert." },
  { q: 'Can I take training over the weekend?', a: 'Absolutely. 1-on-1 training sessions can be scheduled on any day of the week, including Saturdays and Sundays, as well as public holidays. Just let us know your preferred time when you enquire.' },
  { q: 'Can I change the schedule after booking a training?', a: "Yes, you can reschedule your session at any time before it begins, subject to trainer availability. Simply contact your account manager or reach us on WhatsApp and we'll coordinate the change for you." },
  { q: 'My colleague and I would like to be trained together. Can we set up a 1-on-2 training?', a: 'Yes! Koenig supports small-group private sessions (1-on-2 or 1-on-3). Both participants still benefit from a dedicated instructor and fully customised content.' },
  { q: 'Can I opt for a longer duration than the standard course?', a: 'Yes. Because sessions are fully private, you can request additional hours, extra lab time, or extended deep-dives on specific topics. Your instructor will adapt the schedule accordingly.' },
  { q: 'Is 1-on-1 training available for all 5,000+ courses?', a: "Yes. Every course in the Koenig catalogue — across Microsoft, AWS, Cisco, CompTIA, PMI, and hundreds more vendors — is available in 1-on-1 format. If you don't see a specific course, contact us and we'll arrange it." },
]

/* ── HEAR OPTIONS for form ───────────────────────────────────── */
const HEAR_OPTIONS = [
  'Search Engine (Google/Bing)',
  'LinkedIn',
  'Facebook / Instagram',
  'Twitter / X',
  'YouTube',
  'Colleague / Friend Referral',
  'Previous Koenig Student',
  'Email Newsletter',
  'Company Recommendation',
  'Job Board',
  'Online Forum / Reddit',
  'Other',
]

/* ── Lead Form Section ───────────────────────────────────────── */
function OneOnOneLeadFormSection() {
  const [tab, setTab] = useState<'individual' | 'enterprise'>('individual')
  const [submitted, setSubmitted] = useState(false)
  const [robotChecked, setRobotChecked] = useState(false)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', courseName: '', trainees: '', hearAbout: '', message: '' })

  const set = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }))

  const inp: React.CSSProperties = { width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 12, color: '#fff', padding: '10px 14px', fontSize: 13.5, fontFamily: 'inherit', outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }

  if (submitted) {
    return (
      <section style={{ background: 'radial-gradient(ellipse at 68% 48%, rgba(6,148,209,0.18) 0%, rgba(6,148,209,0.06) 38%, transparent 65%), #06111E', padding: '30px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.3)', borderRadius: 20, padding: '48px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 20, margin: '0 0 8px' }}>Thank you!</h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>A Koenig advisor will contact you within 1 business day.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="request" style={{ background: 'radial-gradient(ellipse at 68% 48%, rgba(6,148,209,0.18) 0%, rgba(6,148,209,0.06) 38%, transparent 65%), #06111E', padding: '30px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
          className="oo1-ilf-form" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.20)', borderRadius: 20, padding: '32px 28px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <span style={{ display: 'inline-block', border: '1px solid rgba(6,148,209,0.55)', background: 'rgba(6,148,209,0.12)', color: '#38bdf8', borderRadius: 999, padding: '4px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
              Let&apos;s Talk
            </span>
            <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(20px,3vw,28px)', margin: '0 0 6px', lineHeight: 1.25 }}>
              Request for more <span style={{ color: '#38bdf8' }}>information</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, margin: '0 0 16px' }}>1-on-1 Training with Koenig Solutions</p>
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
          <div className="oo1-ilf-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={lbl}>Full Name <span style={{ color: '#f87171' }}>*</span></label>
              <input type="text" required placeholder="John Smith" value={form.fullName} onChange={e => set('fullName', e.target.value)} style={inp} />
            </div>
            <div>
              <label style={lbl}>{tab === 'enterprise' ? 'Business ' : ''}Email <span style={{ color: '#f87171' }}>*</span></label>
              <input type="email" required placeholder={tab === 'enterprise' ? 'john@example.com' : 'john@example.com'} value={form.email} onChange={e => set('email', e.target.value)} style={inp} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="oo1-ilf-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
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
            <textarea rows={4} placeholder="e.g. I want to pass AZ-104 within 3 weeks, currently a network engineer…"
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
            Submit — Get a Free Consultation
          </button>
          <p style={{ textAlign: 'center', fontSize: 11.5, color: 'rgba(255,255,255,0.30)', marginTop: 10 }}>
            We&apos;ll respond within 1 business day · No spam, ever.
          </p>
        </form>

        <style>{`
          @media(max-width:600px){
            .oo1-ilf-grid { grid-template-columns: 1fr !important; }
            .oo1-ilf-form { padding: 20px 16px !important; }
          }
        `}</style>
      </div>
    </section>
  )
}

/* ── Testimonial Card ────────────────────────────────────────── */
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

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */
const COUNTRIES = ['India','United States','United Kingdom','Canada','Australia','UAE','Singapore','Germany','France','Netherlands','Saudi Arabia','Qatar','South Africa','New Zealand','Other']

function BrochureForm({ onClose, courseName }: { onClose: () => void; courseName?: string }) {
  const [fullName, setFullName] = useState('')
  const [email,    setEmail]    = useState('')
  const [country,  setCountry]  = useState('')
  const [submitted, setSubmitted] = useState(false)

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(6,148,209,0.08)', border: '1.5px solid rgba(6,148,209,0.3)',
    borderRadius: 10, padding: '11px 14px', fontSize: 13.5, color: '#fff',
    outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 10, fontWeight: 800, letterSpacing: 0.8,
    color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase',
    marginBottom: 5, display: 'block',
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '12px 0 4px' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(6,148,209,0.15)', border: '1.5px solid rgba(6,148,209,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{ fontSize: 19, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.25 }}>You&apos;re all set, {fullName.split(' ')[0]}!</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 20 }}>
          The course content for <strong style={{ color: '#0694D1' }}>{courseName || 'this course'}</strong> will be sent to <strong style={{ color: '#fff' }}>{email}</strong> shortly.
        </div>
        <div style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Check your inbox — usually arrives within 2 minutes
        </div>
        <button onClick={onClose} style={{ width: '100%', padding: '11px', borderRadius: 10, border: '1px solid rgba(6,148,209,0.35)', background: 'transparent', color: '#0694D1', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          Close
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <label style={labelStyle}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
        <input required style={inputStyle} placeholder="John" value={fullName} onChange={e => setFullName(e.target.value)}
          onFocus={e => (e.target.style.borderColor = '#0694D1')} onBlur={e => (e.target.style.borderColor = 'rgba(6,148,209,0.3)')} />
      </div>
      <div>
        <label style={labelStyle}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
        <input required type="email" style={inputStyle} placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)}
          onFocus={e => (e.target.style.borderColor = '#0694D1')} onBlur={e => (e.target.style.borderColor = 'rgba(6,148,209,0.3)')} />
      </div>
      <div>
        <label style={labelStyle}>Country <span style={{ color: '#ef4444' }}>*</span></label>
        <select required style={{ ...inputStyle, color: country ? '#fff' : 'rgba(255,255,255,0.4)', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }} value={country} onChange={e => setCountry(e.target.value)}
          onFocus={e => (e.target.style.borderColor = '#0694D1')} onBlur={e => (e.target.style.borderColor = 'rgba(6,148,209,0.3)')}>
          <option value="" style={{ background: '#0d2d47', color: '#c8d8e8' }}>Select your country</option>
          {COUNTRIES.map(c => <option key={c} value={c} style={{ background: '#0d2d47', color: '#c8d8e8' }}>{c}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Course content will be sent to your email ID</span>
      </div>
      <button type="submit" style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#0694D1,#0577ab)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', letterSpacing: 0.2, boxShadow: '0 4px 18px rgba(6,148,209,0.4)', marginTop: 2, transition: 'filter 0.18s' }}
        onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.12)')}
        onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
      >
        Send Course Content →
      </button>
      <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        No spam, ever. Unsubscribe anytime.
      </div>
    </form>
  )
}

export default function OneOnOneTrainingPage() {
  const tabScrollRef   = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [benSlideIdx,  setBenSlideIdx]  = useState(0)
  const [howSlideIdx,  setHowSlideIdx]  = useState(0)
  const [howWhoTab, setHowWhoTab] = useState<'how' | 'who'>('how')
  const [whoSlideIdx, setWhoSlideIdx] = useState(0)
  const [brochureModal, setBrochureModal] = useState(false)
  const [brochureCourse, setBrochureCourse] = useState('')
  const benTouchStartX = useRef(0)
  const howTouchStartX = useRef(0)
  const whoTouchStartX = useRef(0)

  useEffect(() => {
    const el = tabScrollRef.current?.querySelector('[data-tab="1on1"]') as HTMLElement | null
    if (el) el.scrollIntoView({ behavior: 'instant', inline: 'start', block: 'nearest' })
  }, [])

  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      {/* ── BANNER ─────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg,#06111E 0%,#071828 55%,#061624 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle,#0694D1 0%,transparent 70%)' }} />
          <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle,#38bdf8 0%,transparent 70%)' }} />
        </div>

        <style>{`
          @keyframes tab-border-sweep{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
          .tab-border-glow{background:linear-gradient(270deg,#0694D1,#38bdf8,#076D9D,#38bdf8,#0694D1);background-size:400% 400%;animation:tab-border-sweep 3s ease infinite;padding:2px;border-radius:1rem;display:inline-flex;}
        `}</style>

        {/* Banner content */}
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]" style={{ paddingTop: 15, paddingBottom: 20 }}>
          <div className="grid lg:grid-cols-2 gap-0 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.35)', color: '#38bdf8' }}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                Fully Personalized · Expert-Led · Any Schedule
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-bold leading-tight text-white mb-4">
                Your Training,{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg,#0694D1,#38bdf8)' }}>Your Way</span>
                {' '}—{' '}
                <br className="hidden sm:block" />
                1-on-1 with Expert Instructors
              </h1>
              <p className="text-base leading-relaxed mb-[15px]" style={{ color: 'rgba(255,255,255,0.68)' }}>
                Skip the classroom. Get a private certified instructor dedicated entirely to <em>you</em>. Train on your schedule, at your pace, focused on exactly what you need to certify and advance your career.
              </p>

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
            </div>

            {/* Right — feature cards (desktop) */}
            <div className="hidden lg:grid grid-cols-2 gap-3" style={{ gridTemplateRows: 'auto auto auto' }}>
              {[
                { full: false, label: <>Get Access to <span style={{ color: '#38bdf8' }}>Unlimited 1-on-1 Sessions</span> on any day</> },
                { full: false, label: <>Free <span style={{ color: '#38bdf8' }}>Schedule Flexibility</span> — weekdays, weekends & holidays</> },
                { full: false, label: <>100% <span style={{ color: '#38bdf8' }}>Customized Curriculum</span> tailored to your goals</> },
                { full: false, label: <>Instructor <span style={{ color: '#38bdf8' }}>100% focused on you</span> — no group distractions</> },
                { full: true,  label: <>Sessions start in as little as <span style={{ color: '#38bdf8' }}>24 hours</span></> },
              ].map(({ label, full }, i) => (
                <div key={i}
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(6,148,209,0.25)', gridColumn: full ? '1 / -1' : undefined }}>
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.5)' }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span className="text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.82)' }}>{label}</span>
                </div>
              ))}
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
        </div>
      </section>

      {/* ── TRAINING TABS ──────────────────────────────────────── */}
      <section className="bg-white border-b py-4" style={{ borderColor: '#E2E8F0' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="sm:hidden">
            <div className="tab-border-glow" style={{ display: 'block', width: '100%' }}>
              <div ref={tabScrollRef} className="flex overflow-x-auto rounded-[14px] bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]" style={{ scrollbarWidth: 'none' }}>
                {LEARNING_TABS.map(t => t.id === '1on1' ? (
                  <button key={t.id} data-tab="1on1" className="relative whitespace-nowrap rounded-xl font-semibold shrink-0 px-5 py-2.5 text-sm bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30">{t.label}</button>
                ) : (
                  <Link key={t.id} href={t.href} className="inline-flex items-center whitespace-nowrap rounded-xl font-semibold shrink-0 px-4 py-2.5 text-sm text-[#7a8c96]">{t.label}</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden sm:flex justify-center">
            <div className="tab-border-glow">
              <div className="inline-flex overflow-hidden rounded-[14px] bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]">
                {LEARNING_TABS.map(t => t.id === '1on1' ? (
                  <button key={t.id} className="relative whitespace-nowrap rounded-xl font-semibold shrink-0 px-8 py-3 text-sm sm:text-base bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30">{t.label}</button>
                ) : (
                  <Link key={t.id} href={t.href} className="inline-flex items-center whitespace-nowrap rounded-xl font-semibold shrink-0 px-6 py-3 text-sm text-[#7a8c96] hover:text-[#093148]">{t.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 md:px-8 lg:px-[50px]" style={{ background: '#07121e', paddingTop: 30, paddingBottom: 30 }}>
        <style>{`
          @keyframes oo1BenCardIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
          @keyframes oo1BenIconPulse{0%,100%{box-shadow:0 0 0 0 rgba(19,168,212,.25)}50%{box-shadow:0 0 0 7px rgba(19,168,212,.06)}}
          @keyframes oo1BenDraw{from{stroke-dashoffset:500}to{stroke-dashoffset:0}}
          @keyframes oo1BenFloat{from{transform:translateY(0)}to{transform:translateY(-5px)}}
          .oo1-ben-card{position:relative;overflow:hidden;border-radius:18px;padding:28px;cursor:default;
            background:linear-gradient(145deg,rgba(13,32,53,.92) 0%,rgba(10,22,40,.96) 60%,rgba(11,37,69,.88) 100%);
            border:1px solid rgba(19,168,212,.18);transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease,border-color .35s ease;opacity:0;}
          .oo1-ben-card.oo1-ben-vis{animation:oo1BenCardIn .55s cubic-bezier(.22,1,.36,1) forwards;}
          .oo1-ben-card:hover{transform:translateY(-7px);border-color:rgba(19,168,212,.55);box-shadow:0 0 0 1px rgba(19,168,212,.2),0 16px 40px rgba(0,0,0,.4);}
          .oo1-ben-accent{position:absolute;top:0;left:50%;transform:translateX(-50%);height:2.5px;width:0;border-radius:2px;background:linear-gradient(90deg,transparent,#13a8d4,#38bdf8,#13a8d4,transparent);transition:width .45s cubic-bezier(.22,1,.36,1);pointer-events:none;}
          .oo1-ben-card:hover .oo1-ben-accent{width:100%;}
          .oo1-ben-icon-box{width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(19,168,212,.08);border:1px solid rgba(19,168,212,.28);animation:oo1BenIconPulse 3s ease-in-out infinite;transition:background .3s,border-color .3s;}
          .oo1-ben-card:hover .oo1-ben-icon-box{background:rgba(19,168,212,.22);border-color:#13a8d4;}
          .oo1-ben-icon-svg{display:flex;align-items:center;justify-content:center;animation:oo1BenFloat 3s ease-in-out infinite alternate;}
          .oo1-ben-icon-svg svg path,.oo1-ben-icon-svg svg circle,.oo1-ben-icon-svg svg line,.oo1-ben-icon-svg svg polyline,.oo1-ben-icon-svg svg rect{stroke-dasharray:500;stroke-dashoffset:500;stroke:#13a8d4;transition:stroke .3s ease;}
          .oo1-ben-card.oo1-ben-vis .oo1-ben-icon-svg svg path,.oo1-ben-card.oo1-ben-vis .oo1-ben-icon-svg svg circle,.oo1-ben-card.oo1-ben-vis .oo1-ben-icon-svg svg line,.oo1-ben-card.oo1-ben-vis .oo1-ben-icon-svg svg polyline,.oo1-ben-card.oo1-ben-vis .oo1-ben-icon-svg svg rect{animation:oo1BenDraw 1.2s ease-in-out var(--draw-delay,0s) forwards;}
          .oo1-ben-card:hover .oo1-ben-icon-svg svg path,.oo1-ben-card:hover .oo1-ben-icon-svg svg circle,.oo1-ben-card:hover .oo1-ben-icon-svg svg line,.oo1-ben-card:hover .oo1-ben-icon-svg svg polyline,.oo1-ben-card:hover .oo1-ben-icon-svg svg rect{stroke:#fff;}
          .oo1-ben-divider{height:1px;background:rgba(19,168,212,.18);border-radius:1px;margin:12px 0;width:40px;transition:width .4s cubic-bezier(.22,1,.36,1);}
          .oo1-ben-card:hover .oo1-ben-divider{width:100%;}
          .oo1-ben-ghost{position:absolute;bottom:8px;right:14px;font-size:88px;font-weight:900;line-height:1;color:rgba(19,168,212,.045);letter-spacing:-4px;pointer-events:none;user-select:none;transition:transform .4s ease,color .4s ease;}
          .oo1-ben-card:hover .oo1-ben-ghost{transform:translateY(-4px);color:rgba(19,168,212,.08);}
        `}</style>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center mb-[15px]">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#38bdf8' }}>Why 1-on-1</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Choose{' '}
              <span style={{ background: 'linear-gradient(135deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>1-on-1 Training</span>
              {' '}with Koenig?
            </h2>
          </div>

          {/* Mobile slider */}
          <div className="sm:hidden">
            <div className="overflow-hidden" onTouchStart={e => { benTouchStartX.current = e.touches[0].clientX }} onTouchEnd={e => { const dx = benTouchStartX.current - e.changedTouches[0].clientX; if (dx > 50) setBenSlideIdx(p => Math.min(p + 1, BENEFITS.length - 1)); if (dx < -50) setBenSlideIdx(p => Math.max(p - 1, 0)) }}>
              <div className="flex" style={{ transform: `translateX(-${benSlideIdx * 100}%)`, transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)' }}>
                {BENEFITS.map((b, i) => (
                  <div key={b.title} className="oo1-ben-card oo1-ben-vis shrink-0 w-full" style={{ ['--draw-delay' as string]: '0s' } as React.CSSProperties}>
                    <div className="oo1-ben-accent" />
                    <div className="flex gap-4 items-start">
                      <div className="oo1-ben-icon-box shrink-0"><div className="oo1-ben-icon-svg">{b.icon}</div></div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-white">{b.title}</h3>
                        <div className="oo1-ben-divider" />
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.52)' }}>{b.desc}</p>
                      </div>
                    </div>
                    <div className="oo1-ben-ghost" aria-hidden>{String(i + 1).padStart(2, '0')}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-5">
              <button onClick={() => setBenSlideIdx(p => Math.max(p - 1, 0))} disabled={benSlideIdx === 0} className="flex items-center justify-center w-8 h-8 rounded-full transition-all" style={{ background: benSlideIdx === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.35)', color: benSlideIdx === 0 ? 'rgba(255,255,255,0.25)' : '#38bdf8' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div className="flex gap-2">
                {BENEFITS.map((_, i) => (
                  <button key={i} onClick={() => setBenSlideIdx(i)} className="rounded-full transition-all duration-300" style={{ width: benSlideIdx === i ? 20 : 7, height: 7, background: benSlideIdx === i ? '#0694D1' : 'rgba(255,255,255,0.22)' }} />
                ))}
              </div>
              <button onClick={() => setBenSlideIdx(p => Math.min(p + 1, BENEFITS.length - 1))} disabled={benSlideIdx === BENEFITS.length - 1} className="flex items-center justify-center w-8 h-8 rounded-full transition-all" style={{ background: benSlideIdx === BENEFITS.length - 1 ? 'rgba(255,255,255,0.06)' : 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.35)', color: benSlideIdx === BENEFITS.length - 1 ? 'rgba(255,255,255,0.25)' : '#38bdf8' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <div key={b.title} className="oo1-ben-card" style={{ animationDelay: `${i * 0.1}s` }}
                ref={el => { if (!el) return; const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { el.classList.add('oo1-ben-vis'); obs.disconnect() } }, { threshold: 0.12 }); obs.observe(el) }}>
                <div className="oo1-ben-accent" />
                <div className="flex gap-4 items-start">
                  <div className="oo1-ben-icon-box shrink-0" style={{ animationDelay: `${i * 0.6}s` }}>
                    <div className="oo1-ben-icon-svg" style={{ animationDelay: `${i * 0.4}s`, ['--draw-delay' as string]: `${i * 0.15}s` } as React.CSSProperties}>{b.icon}</div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-white">{b.title}</h3>
                    <div className="oo1-ben-divider" />
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.52)' }}>{b.desc}</p>
                  </div>
                </div>
                <div className="oo1-ben-ghost" aria-hidden>{String(i + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR COURSES ────────────────────────────────────── */}
      <section className="relative py-[30px]" style={{ background: '#EBF8FE', borderTop: '1px solid #CAEFFF' }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle,rgba(6,148,209,0.18) 0%,transparent 70%)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="flex flex-col items-center text-center mb-[15px]">
            <div className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ background: 'rgba(6,148,209,0.1)', color: '#0694D1' }}>Most Booked</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: '#071e2e' }}>
              Popular Courses for{' '}
              <em style={{ fontStyle: 'normal', background: 'linear-gradient(90deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>1-on-1 Training</em>
            </h2>
            <p className="text-sm" style={{ color: '#5a7a90', marginTop: 4 }}>Every course available as a private session — start any day, any timezone.</p>
          </div>

          <style>{`
            .oo1-cert-card{background:#fff;border:1.5px solid rgba(6,148,209,0.12);border-radius:14px;padding:16px 16px 14px;cursor:pointer;transition:all 0.25s;display:flex;flex-direction:column;position:relative;overflow:visible;gap:0;min-height:250px;box-shadow:0 2px 10px rgba(6,148,209,0.07);text-decoration:none;color:inherit;}
            .oo1-cert-card:hover{box-shadow:0 8px 32px rgba(6,148,209,0.18),0 2px 8px rgba(0,0,0,0.06);transform:translateY(-3px);}
            .oo1-cert-hot-badge{position:absolute;top:0;right:0;display:inline-flex;align-items:center;gap:4px;height:20px;font-size:9px;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;padding:0 10px 0 8px;border-radius:0 14px 0 10px;background:linear-gradient(135deg,#0694D1,#22d3ee);color:#fff;border:none;flex-shrink:0;box-shadow:-2px 2px 8px rgba(6,148,209,0.28);z-index:2;}
            .oo1-cert-badge{display:inline-flex;align-items:center;gap:3px;font-size:9px;font-weight:800;letter-spacing:0.6px;text-transform:uppercase;padding:3px 9px 3px 7px;border-radius:20px;margin-bottom:3px;width:fit-content;border:none;line-height:1;}
            .oo1-cert-badge.fund{background:linear-gradient(135deg,#4DBFEF,#0694D1);color:#fff;box-shadow:0 2px 8px rgba(6,148,209,0.25);}
            .oo1-cert-badge.assoc{background:linear-gradient(135deg,#0694D1,#076D9D);color:#fff;box-shadow:0 2px 8px rgba(6,108,157,0.3);}
            .oo1-cert-badge.expert{background:linear-gradient(135deg,#076D9D,#062238);color:#fff;box-shadow:0 2px 8px rgba(6,34,56,0.35);}
            .oo1-cert-name{font-size:14px;font-weight:800;color:#071e2e;margin-bottom:8px;line-height:1.4;flex:1;letter-spacing:-0.01em;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;min-height:59px;transition:color 0.18s;position:relative;}
            .oo1-cert-name-wrap{position:relative;flex:1;margin-top:10px;}
            .oo1-cert-code-row{display:flex;align-items:center;gap:5px;margin-bottom:10px;flex-wrap:wrap;}
            .oo1-cert-code{display:inline-block;font-size:12px;font-family:'SFMono-Regular','Consolas',monospace;color:#0694D1;background:rgba(6,148,209,0.1);border:1px solid rgba(6,148,209,0.28);padding:2px 7px;border-radius:4px;font-weight:700;letter-spacing:0.4px;}
            .oo1-cert-hours{display:inline-flex;align-items:center;gap:3px;font-size:12px;font-family:'SFMono-Regular','Consolas',monospace;color:#5a7a90;background:rgba(6,148,209,0.05);border:1px solid rgba(6,148,209,0.14);padding:2px 7px;border-radius:4px;font-weight:600;letter-spacing:0.3px;}
            .oo1-cert-footer{display:flex;flex-direction:column;gap:8px;margin-top:auto;border-top:1px solid rgba(6,148,209,0.08);padding-top:10px;}
            .oo1-cert-price-row{display:flex;align-items:center;justify-content:space-between;}
            .oo1-cert-enrolled{font-size:10px;color:#5a7a90;font-weight:600;display:flex;align-items:center;gap:4px;}
            .oo1-cert-enrolled svg{color:#0694D1;}
            .oo1-cert-rating{display:flex;align-items:center;gap:3px;font-size:10px;font-weight:700;color:#d97706;}
            .oo1-cert-price{display:flex;align-items:baseline;gap:1px;margin-left:auto;}
            .oo1-cert-price-curr{font-size:10px;font-weight:600;color:#0694D1;margin-right:1px;opacity:0.8;}
            .oo1-cert-price-amount{font-size:15px;font-weight:700;color:#0694D1;letter-spacing:-0.3px;line-height:1;}
            .oo1-cert-actions{display:flex;gap:7px;}
            .oo1-cert-btn-brochure{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:4px;height:32px;padding:0 8px;border-radius:8px;font-size:10px;font-weight:700;background:transparent;color:#0694D1;border:1.5px solid #0694D1;cursor:pointer;transition:background 0.18s;white-space:nowrap;font-family:inherit;}
            .oo1-cert-btn-brochure:hover{background:rgba(6,148,209,0.07);}
            .oo1-cert-btn-details{flex:1;display:flex;align-items:center;justify-content:center;height:32px;padding:0 8px;border-radius:8px;font-size:10.5px;font-weight:700;background:linear-gradient(135deg,#093148 0%,#0d5280 100%);color:#fff;border:none;cursor:pointer;transition:filter 0.22s,box-shadow 0.22s,transform 0.22s;white-space:nowrap;font-family:inherit;box-shadow:0 2px 8px rgba(9,49,72,0.3);}
            .oo1-cert-btn-details:hover{filter:brightness(1.25);box-shadow:0 4px 14px rgba(9,49,72,0.4);transform:translateY(-1px);}
            @keyframes oo1FadeIn{from{opacity:0}to{opacity:1}}
            .oo1-modal-overlay{position:fixed;inset:0;z-index:500;background:rgba(0,0,0,0.8);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:24px 20px;overflow-y:auto;animation:oo1FadeIn 0.2s ease;}
          `}</style>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {POPULAR_COURSES.map((c, i) => {
              const lvl = c.level === 'Beginner' ? 'fund' : c.level === 'Intermediate' ? 'assoc' : 'expert'
              const lvlLabel = c.level === 'Beginner' ? 'Fundamentals' : c.level === 'Intermediate' ? 'Associate' : 'Expert'
              return (
                <a key={i} href="#request" className="oo1-cert-card">
                  {c.hot && (
                    <span className="oo1-cert-hot-badge">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c0 0-5.5 6-5.5 10.5a5.5 5.5 0 0 0 11 0C17.5 8 12 2 12 2zm0 14a3 3 0 0 1-3-3c0-2.5 3-6 3-6s3 3.5 3 6a3 3 0 0 1-3 3z"/></svg>
                      Popular
                    </span>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 6, marginTop: -8 }}>
                    <span className={`oo1-cert-badge ${lvl}`} style={{ marginBottom: 0 }}>
                      {lvl === 'fund' ? (
                        <><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M5 3a7 7 0 0 0 7 7 7 7 0 0 0 7-7"/></svg>{lvlLabel}</>
                      ) : lvl === 'assoc' ? (
                        <><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>{lvlLabel}</>
                      ) : (
                        <><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7l4 9h12l4-9-6 4-4-6-4 6z"/></svg>{lvlLabel}</>
                      )}
                    </span>
                  </div>

                  <div className="oo1-cert-name-wrap">
                    <div className="oo1-cert-name">{c.name}</div>
                  </div>

                  <div className="oo1-cert-code-row">
                    <span className="oo1-cert-code">{c.code}</span>
                    <span className="oo1-cert-hours">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {c.days}d · {c.days * 8}hrs
                    </span>
                  </div>

                  <div className="oo1-cert-footer">
                    <div className="oo1-cert-price-row">
                      <span className="oo1-cert-enrolled">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        {c.enrolled}
                      </span>
                      <span className="oo1-cert-rating">
                        <span>★</span>
                        {c.rating}
                      </span>
                      <span className="oo1-cert-price">
                        <span className="oo1-cert-price-curr">₹</span>
                        <span className="oo1-cert-price-amount">{c.price}</span>
                      </span>
                    </div>
                    <div className="oo1-cert-actions">
                      <button className="oo1-cert-btn-brochure" style={{ flex: 1, whiteSpace: 'nowrap' }} onClick={e => { e.preventDefault(); setBrochureCourse(c.name); setBrochureModal(true) }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Download Syllabus
                      </button>
                      <span className="oo1-cert-btn-details" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>Enroll Now</span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

          <p className="mt-6 text-center text-sm" style={{ color: '#5a7a90' }}>
            Can&apos;t find your course?{' '}
            <a href="#request" className="font-semibold hover:underline" style={{ color: '#0694D1' }}>Request any of 5,000+ courses as a 1-on-1 →</a>
          </p>
        </div>
      </section>

      {/* ── REQUEST INFO FORM ──────────────────────────────────── */}
      <OneOnOneLeadFormSection />

      {/* ── HOW IT WORKS + WHO IS IT FOR — mobile: tabbed, desktop: separate ── */}
      <style>{`
        @keyframes oo1-tab-shimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .oo1-tab-shimmer-border {
          padding: 2.5px; border-radius: 22px;
          background: linear-gradient(120deg, #0694D1, #22d3ee, #a8d8ff, #50e6ff, #0694D1);
          background-size: 300% 300%;
          animation: oo1-tab-shimmer 2.8s ease infinite;
          box-shadow: 0 0 22px rgba(6,148,209,0.32), 0 6px 28px rgba(6,148,209,0.14);
          display: inline-flex;
        }
        .oo1-tab-shimmer-inner {
          display: inline-flex; background: white; border-radius: 20px; padding: 6px; gap: 6px;
        }
      `}</style>

      {/* MOBILE: tabbed section */}
      <section className="sm:hidden" style={{ background: howWhoTab === 'how' ? 'linear-gradient(135deg,#06111E 0%,#093148 100%)' : '#E8F4FA', paddingTop: 30, paddingBottom: 30, transition: 'background 0.3s' }}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Tab switcher */}
          <div style={{ marginBottom: 10 }}>
            <div className="oo1-tab-shimmer-border" style={{ width: '100%' }}>
              <div className="oo1-tab-shimmer-inner" style={{ width: '100%' }}>
                {([
                  { key: 'how', label: 'How It Works' },
                  { key: 'who', label: 'Who Is It For?' },
                ] as const).map(t => (
                  <button key={t.key} onClick={() => setHowWhoTab(t.key)}
                    style={{ flex: 1, padding: '9px 8px', borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, transition: 'background 0.22s, color 0.22s, box-shadow 0.22s',
                      background: howWhoTab === t.key ? 'linear-gradient(135deg,#0694D1 0%,#22d3ee 100%)' : 'transparent',
                      color: howWhoTab === t.key ? '#fff' : '#4a6375',
                      boxShadow: howWhoTab === t.key ? '0 4px 18px rgba(6,148,209,0.38)' : 'none',
                    }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-xs mb-5" style={{ color: howWhoTab === 'how' ? 'rgba(255,255,255,0.5)' : '#7a9db3' }}>
            {howWhoTab === 'how' ? 'From course selection to certification in four simple steps' : 'Find out if 1-on-1 training is the right fit for your learning goals'}
          </p>

          {/* HOW: mobile slider */}
          {howWhoTab === 'how' && (
            <div onTouchStart={e => { howTouchStartX.current = e.touches[0].clientX }} onTouchEnd={e => { const dx = howTouchStartX.current - e.changedTouches[0].clientX; if (dx > 50) setHowSlideIdx(p => Math.min(p + 1, HOW_STEPS.length - 1)); if (dx < -50) setHowSlideIdx(p => Math.max(p - 1, 0)) }}>
              <div className="overflow-hidden">
                <div className="flex" style={{ transform: `translateX(-${howSlideIdx * 100}%)`, transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)' }}>
                  {HOW_STEPS.map((step) => (
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
                <button onClick={() => setHowSlideIdx(p => Math.max(p - 1, 0))} disabled={howSlideIdx === 0} className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: howSlideIdx === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.35)', color: howSlideIdx === 0 ? 'rgba(255,255,255,0.25)' : '#38bdf8' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <div className="flex gap-2">
                  {HOW_STEPS.map((_, i) => (
                    <button key={i} onClick={() => setHowSlideIdx(i)} className="rounded-full transition-all duration-300" style={{ width: howSlideIdx === i ? 20 : 7, height: 7, background: howSlideIdx === i ? '#0694D1' : 'rgba(255,255,255,0.22)' }} />
                  ))}
                </div>
                <button onClick={() => setHowSlideIdx(p => Math.min(p + 1, HOW_STEPS.length - 1))} disabled={howSlideIdx === HOW_STEPS.length - 1} className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: howSlideIdx === HOW_STEPS.length - 1 ? 'rgba(255,255,255,0.06)' : 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.35)', color: howSlideIdx === HOW_STEPS.length - 1 ? 'rgba(255,255,255,0.25)' : '#38bdf8' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* WHO: mobile slider */}
          {howWhoTab === 'who' && (
            <div onTouchStart={e => { whoTouchStartX.current = e.touches[0].clientX }} onTouchEnd={e => { const dx = whoTouchStartX.current - e.changedTouches[0].clientX; if (dx > 50) setWhoSlideIdx(p => Math.min(p + 1, WHO_FOR.length - 1)); if (dx < -50) setWhoSlideIdx(p => Math.max(p - 1, 0)) }}>
              <div className="overflow-hidden">
                <div className="flex" style={{ transform: `translateX(-${whoSlideIdx * 100}%)`, transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)' }}>
                  {WHO_FOR.map((w, i) => (
                    <div key={i} className="shrink-0 w-full rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(6,148,209,0.06)' }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1' }}>{w.icon}</div>
                      <h3 className="text-base font-bold mb-2" style={{ color: '#0F172A' }}>{w.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{w.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-5">
                <button onClick={() => setWhoSlideIdx(p => Math.max(p - 1, 0))} disabled={whoSlideIdx === 0} className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: whoSlideIdx === 0 ? 'rgba(6,148,209,0.06)' : 'rgba(6,148,209,0.18)', border: '1px solid rgba(6,148,209,0.3)', color: whoSlideIdx === 0 ? 'rgba(6,148,209,0.3)' : '#0694D1' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <div className="flex gap-2">
                  {WHO_FOR.map((_, i) => (
                    <button key={i} onClick={() => setWhoSlideIdx(i)} className="rounded-full transition-all duration-300" style={{ width: whoSlideIdx === i ? 20 : 7, height: 7, background: whoSlideIdx === i ? '#0694D1' : 'rgba(6,148,209,0.25)' }} />
                  ))}
                </div>
                <button onClick={() => setWhoSlideIdx(p => Math.min(p + 1, WHO_FOR.length - 1))} disabled={whoSlideIdx === WHO_FOR.length - 1} className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: whoSlideIdx === WHO_FOR.length - 1 ? 'rgba(6,148,209,0.06)' : 'rgba(6,148,209,0.18)', border: '1px solid rgba(6,148,209,0.3)', color: whoSlideIdx === WHO_FOR.length - 1 ? 'rgba(6,148,209,0.3)' : '#0694D1' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* DESKTOP: How It Works */}
      <section className="hidden sm:block" style={{ background: 'linear-gradient(135deg,#06111E 0%,#093148 100%)', paddingTop: 30, paddingBottom: 30 }}>
        <div className="mx-auto max-w-7xl px-8 lg:px-[50px]">
          <div className="text-center mb-[15px]">
            <h2 className="text-3xl font-bold text-white mb-2">
              How 1-on-1 Training <span style={{ color: '#38bdf8' }}>Works</span>
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>From course selection to certification in four simple steps</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_STEPS.map((step) => (
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

      {/* DESKTOP: Who Is It For */}
      <section className="hidden sm:block" style={{ background: '#E8F4FA', paddingTop: 30, paddingBottom: 30 }}>
        <div className="mx-auto max-w-7xl px-8 lg:px-[50px]">
          <div className="text-center mb-[15px]">
            <div className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ background: 'rgba(6,148,209,0.1)', color: '#0694D1' }}>Is It Right For You?</div>
            <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#071e2e' }}>
              Who Is 1-on-1 Training <span style={{ color: '#0694D1' }}>Perfect For?</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHO_FOR.map((w, i) => (
              <div key={i} className="flex gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5" style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(6,148,209,0.06)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.35)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(6,148,209,0.12)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px rgba(6,148,209,0.06)' }}>
                <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center mt-0.5" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1' }}>{w.icon}</div>
                <div>
                  <h3 className="text-sm font-bold mb-1" style={{ color: '#0F172A' }}>{w.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 1-ON-1 vs GROUP COMPARISON ─────────────────────────── */}
      <section style={{ background: '#07121e', paddingTop: 30, paddingBottom: 30 }}>
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-[15px]">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#38bdf8' }}>Compare</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              1-on-1 Training vs{' '}
              <span style={{ color: '#38bdf8' }}>Group Classes</span>
            </h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>See why thousands of professionals choose private training over batch classes.</p>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(6,148,209,0.2)' }}>
            <div className="grid grid-cols-3 text-sm font-bold" style={{ background: 'rgba(6,148,209,0.15)' }}>
              <div className="px-4 sm:px-6 py-4" style={{ color: 'rgba(255,255,255,0.5)' }}>Feature</div>
              <div className="px-4 sm:px-6 py-4 text-center" style={{ color: '#38bdf8' }}>1-on-1 Training</div>
              <div className="px-4 sm:px-6 py-4 text-center" style={{ color: 'rgba(255,255,255,0.45)' }}>Group Class</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} className="grid grid-cols-3 text-xs sm:text-sm transition-colors" style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent', borderTop: '1px solid rgba(6,148,209,0.10)' }}>
                <div className="px-4 sm:px-6 py-3.5 font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{row.feature}</div>
                <div className="px-4 sm:px-6 py-3.5 text-center">
                  <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: '#38bdf8' }}>
                    <svg className="h-3.5 w-3.5 shrink-0" style={{ color: '#22c55e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {row.one}
                  </span>
                </div>
                <div className="px-4 sm:px-6 py-3.5 text-center">
                  <span className="inline-flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    <svg className="h-3.5 w-3.5 shrink-0" style={{ color: 'rgba(239,68,68,0.6)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    {row.group}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── STUDENT REVIEWS ────────────────────────────────────── */}
      <section style={{ background: '#E8F4FA', paddingTop: 30, paddingBottom: 30, overflow: 'hidden', position: 'relative', borderTop: '1px solid #CAEFFF' }}>
        <div style={{ pointerEvents: 'none', position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(6,148,209,0.20) 0%,transparent 65%)' }} />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-[15px]">
            <span className="inline-block mb-3 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest" style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1' }}>Real Results</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: '#071e2e' }}>
              1-on-1 Training{' '}
              <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Student Reviews</span>
            </h2>
            <p style={{ color: '#7a8c96', fontSize: 15 }}>Real results from IT professionals worldwide — rated 4.9/5 from thousands of verified reviews.</p>
          </div>

          {/* Stats bar */}
          <div style={{ margin: '0 auto 15px', maxWidth: 760 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '14px 8px', boxShadow: '0 4px 20px rgba(6,148,209,0.10)', border: '1px solid #DCEEFB' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
                {[
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, val: '12,000+', label: 'Verified Reviews' },
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, val: '4.9/5', label: 'Avg Rating' },
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, val: '93%', label: 'Recommend' },
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, val: '1M+', label: 'Trained' },
                ].map((s, i, arr) => (
                  <div key={s.label} style={{ textAlign: 'center', padding: '6px 4px', borderRight: i < arr.length - 1 ? '1px solid #CAEFFF' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>{s.icon}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#093148', lineHeight: 1.2, whiteSpace: 'nowrap' }}>{s.val}</div>
                    <div style={{ marginTop: 3, fontSize: 10, color: '#666', lineHeight: 1.3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <MobileMarquee items={TESTIMONIALS} />

          <div className="hidden sm:flex justify-center gap-6 mt-8 overflow-hidden" style={{ maxHeight: 520, WebkitMaskImage: 'linear-gradient(to bottom,transparent,black 10%,black 90%,transparent)', maskImage: 'linear-gradient(to bottom,transparent,black 10%,black 90%,transparent)' }}>
            <div className="flex-1 max-w-[320px]"><ScrollColumn items={TESTIMONIALS.slice(0, 3)} speed={0.030} /></div>
            <div className="flex-1 max-w-[320px] hidden md:block"><ScrollColumn items={TESTIMONIALS.slice(3, 6)} speed={0.025} /></div>
            <div className="flex-1 max-w-[320px] hidden lg:block"><ScrollColumn items={TESTIMONIALS.slice(6, 9)} speed={0.038} /></div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 lg:px-[50px] bg-koenig-light" style={{ paddingTop: 30, paddingBottom: 30 }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-[15px]">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#06111E' }}>
              Frequently <span style={{ background: 'linear-gradient(135deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Asked Questions</span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#7a8c96' }}>Everything you need to know about 1-on-1 Training with Koenig</p>
          </div>

          {/* Desktop: 2 columns */}
          <div className="hidden sm:flex gap-3">
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 === 0).map((f, j) => {
                const i = j * 2; const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s,box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left">
                      <span className="text-base font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#053148', transition: 'color 0.3s' }}>{f.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1),background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}><p className="border-t border-[#EBF8FE] px-6 py-4 text-base leading-relaxed" style={{ color: '#7a8c96' }}>{f.a}</p></div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 !== 0).map((f, j) => {
                const i = j * 2 + 1; const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s,box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left">
                      <span className="text-base font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#053148', transition: 'color 0.3s' }}>{f.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1),background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}><p className="border-t border-[#EBF8FE] px-6 py-4 text-base leading-relaxed" style={{ color: '#7a8c96' }}>{f.a}</p></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="hidden sm:block mt-[15px] text-center">
            <p className="mb-3 text-base" style={{ color: '#7a8c96' }}>Still have questions?</p>
            <a href="#request" className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-sm font-bold text-[#076D9D] transition-all hover:bg-[#076D9D] hover:text-white">
              Chat with a Training Advisor
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(7,109,157,0.12)' }}>→</span>
            </a>
          </div>

          {/* Mobile: stacked */}
          <div className="sm:hidden flex flex-col gap-3">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s,box-shadow 0.3s' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left">
                    <span className="text-sm font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#053148', transition: 'color 0.3s' }}>{f.q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1),background 0.3s' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                    <div style={{ overflow: 'hidden' }}><p className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed" style={{ color: '#7a8c96' }}>{f.a}</p></div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="sm:hidden mt-[15px] text-center">
            <a href="#request" className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-sm font-bold text-[#076D9D] transition-all hover:bg-[#076D9D] hover:text-white">
              Chat with a Training Advisor
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(7,109,157,0.12)' }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {brochureModal && (
        <div className="oo1-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setBrochureModal(false) }}>
          <div style={{ background: 'linear-gradient(160deg,#062238 0%,#093148 100%)', border: '1px solid rgba(6,148,209,0.22)', borderRadius: 20, padding: '32px 28px 28px', width: '100%', maxWidth: 440, position: 'relative', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', fontFamily: 'inherit' }}>
            {/* Close button */}
            <button onClick={() => setBrochureModal(false)} style={{ position: 'absolute', top: 14, right: 14, width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>✕</button>
            {/* Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0694D1', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Download Syllabus</span>
            </div>
            {/* Course name box */}
            {brochureCourse && (
              <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(6,148,209,0.2)', borderRadius: 10, padding: '10px 14px', marginBottom: 18 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 4 }}>Course</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0694D1', lineHeight: 1.4 }}>{brochureCourse}</div>
              </div>
            )}
            {/* Title */}
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 6, lineHeight: 1.3 }}>Get the Course Content</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20, lineHeight: 1.55 }}>Fill in your details and we&apos;ll send it straight to your inbox.</div>
            <BrochureForm onClose={() => setBrochureModal(false)} courseName={brochureCourse} />
          </div>
        </div>
      )}
    </div>
  )
}

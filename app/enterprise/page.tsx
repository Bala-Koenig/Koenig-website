'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const STATS = [
  { num: '1M+',   label: 'Professionals Trained' },
  { num: '5,000+',label: 'Courses Available'      },
  { num: '30+',   label: 'Years of Excellence'    },
  { num: '195+',  label: 'Countries Served'       },
]

const APPROACH = [
  {
    step: '01',
    title: 'Assess',
    sub: 'Diagnose Skill Gaps',
    desc: 'We analyse your workforce capability, benchmark against industry standards, and identify the precise learning gaps across roles and departments.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>,
  },
  {
    step: '02',
    title: 'Design',
    sub: 'Build Custom Programmes',
    desc: 'Our instructional designers craft bespoke curricula aligned to your business goals, using the latest vendor-certified content across 50+ technology domains.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>,
  },
  {
    step: '03',
    title: 'Deliver',
    sub: 'Deploy at Scale',
    desc: 'Training delivered globally via Live Online, Classroom, 1-on-1, and Fly-Me-a-Trainer formats — on your schedule, in your timezone, in 195+ countries.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>,
  },
  {
    step: '04',
    title: 'Elevate',
    sub: 'Measure & Optimise',
    desc: 'Post-training assessments, certification tracking, and ROI reporting ensure continuous improvement and a measurable impact on your business outcomes.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>,
  },
]

const DOMAINS = [
  { name: 'Cloud Computing',    count: '840+', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/> },
  { name: 'Cybersecurity',      count: '620+', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/> },
  { name: 'Data & AI',          count: '280+', icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></> },
  { name: 'Networking',         count: '510+', icon: <><circle cx="12" cy="5" r="2" strokeWidth={1.8}/><circle cx="5" cy="19" r="2" strokeWidth={1.8}/><circle cx="19" cy="19" r="2" strokeWidth={1.8}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 7v4M8.5 17.5l3-2.5M15.5 17.5l-3-2.5"/></> },
  { name: 'Project Management', count: '390+', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/> },
  { name: 'DevOps',             count: '210+', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/> },
  { name: 'ERP Systems',        count: '180+', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/> },
  { name: 'Linux & Open Source',count: '110+', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/> },
]

const FORMATS = [
  { title: 'Live Online Training',   icon: '🌐', desc: 'Instructor-led virtual sessions across all timezones. Teams join from any location.' },
  { title: '1-on-1 Training',        icon: '🎯', desc: 'Dedicated instructor assigned exclusively to your employee. Maximum focus, zero distractions.' },
  { title: 'Classroom Training',     icon: '🏫', desc: 'Onsite delivery at your premises or our training centres across 195+ countries.' },
  { title: 'Fly-Me-a-Trainer',       icon: '✈️', desc: 'We send a certified trainer to your location — ideal for large team deployments.' },
  { title: 'Customised Programmes',  icon: '⚙️', desc: 'Bespoke curricula tailored to your tech stack, business processes, and learning objectives.' },
  { title: 'Flexi Training',         icon: '📅', desc: 'Flexible scheduling that adapts to your team\'s workload — start anytime, pause anytime.' },
]

const TESTIMONIALS = [
  { quote: 'Koenig delivered Azure training for 120 of our engineers across three continents simultaneously. The quality was consistent and the scheduling was flawless.', name: 'Head of L&D', company: 'Global Financial Services Firm', initials: 'GL' },
  { quote: 'We needed CISSP certification for our security team fast. Koenig\'s 1-on-1 model got all 12 candidates certified in under 6 weeks.', name: 'CISO', company: 'Multinational Technology Company', initials: 'MT' },
  { quote: 'The custom SAP curriculum Koenig built for us matched our exact S/4HANA implementation. It was the most relevant enterprise training we have ever run.', name: 'VP of IT', company: 'Manufacturing Conglomerate', initials: 'MC' },
]

const WHY = [
  { title: '50+ Vendor Partnerships',    desc: 'Microsoft Gold, AWS, Cisco, Cisco, VMware, Red Hat, and 45+ more — all under one roof.' },
  { title: 'Guaranteed Scheduling',      desc: 'Every batch confirmed. We never cancel or postpone. Your training plan runs on time, every time.' },
  { title: 'Global Reach',               desc: 'Training delivered in 195+ countries in multiple languages with local timezone support.' },
  { title: 'Certified Instructors Only', desc: 'Every instructor holds active vendor certifications and brings real-world enterprise experience.' },
  { title: 'Flexible Learning Formats',  desc: 'Live Online, Classroom, 1-on-1, Fly-Me-a-Trainer, Flexi — whatever works for your team.' },
  { title: 'End-to-End Support',         desc: 'From needs analysis to post-training reporting — a dedicated account manager handles everything.' },
]

export default function EnterprisePage() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: '#06111E', fontFamily: "'GT Walsheim Pro', sans-serif" }}>

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 px-4 lg:px-[50px]" style={{ background: 'rgba(6,17,30,0.94)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between py-3">
          <Link href="/">
            <Image src="/images/koenig-logo.svg" alt="Koenig Solutions" width={120} height={32} className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-white/70 transition-colors hover:text-white">← Back to Home</Link>
            <a href="#contact" className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: '#0694D1' }}>
              Get in Touch
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 lg:px-[50px] py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(6,148,209,0.18) 0%, transparent 65%)' }} />
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.35)' }}>
                <span className="h-2 w-2 rounded-full bg-[#0694D1]" />
                Enterprise Training Solutions
              </div>
              <h1 className="mb-5 text-4xl font-black leading-tight tracking-tight text-white lg:text-5xl xl:text-6xl">
                Upskill Your Workforce<br />
                <span style={{ color: '#38bdf8' }}>at Global Scale</span>
              </h1>
              <p className="mb-8 max-w-xl text-base text-white/65 lg:text-lg">
                Tailored IT certification programmes for enterprises across 195+ countries. From needs assessment to certified outcomes — Koenig handles everything, so your team stays focused on what matters.
              </p>
              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                <a href="#contact" className="rounded-xl px-7 py-3.5 text-base font-bold text-white shadow-lg transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 0 24px rgba(6,148,209,0.4)' }}>
                  Get a Free Consultation
                </a>
                <a href="mailto:enterprise@koenig-solutions.com" className="rounded-xl border px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
                  enterprise@koenig-solutions.com
                </a>
              </div>
            </div>
            {/* Right — stats grid */}
            <div className="grid w-full max-w-sm grid-cols-2 gap-4 lg:w-auto">
              {STATS.map(s => (
                <div key={s.label} className="rounded-2xl p-6 text-center" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.2)', backdropFilter: 'blur(12px)' }}>
                  <div className="text-3xl font-black" style={{ color: '#38bdf8' }}>{s.num}</div>
                  <div className="mt-1 text-sm text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section className="px-4 lg:px-[50px] py-20" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Our Methodology</p>
            <h2 className="text-3xl font-black text-white lg:text-4xl">The Koenig <span style={{ color: '#38bdf8' }}>A.D.D.E.</span> Framework</h2>
            <p className="mt-3 text-white/50">A structured 4-step approach that ensures every enterprise training programme delivers measurable results.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((a, i) => (
              <div key={a.step} className="relative rounded-2xl p-6" style={{ background: 'rgba(6,148,209,0.06)', border: '1px solid rgba(6,148,209,0.18)' }}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.3)' }}>
                    <svg className="h-5 w-5" style={{ color: '#38bdf8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">{a.icon}</svg>
                  </div>
                  <span className="text-2xl font-black" style={{ color: 'rgba(6,148,209,0.3)' }}>{a.step}</span>
                </div>
                <h3 className="mb-1 text-lg font-bold text-white">{a.title}</h3>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: '#0694D1' }}>{a.sub}</p>
                <p className="text-sm leading-relaxed text-white/55">{a.desc}</p>
                {i < APPROACH.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <svg className="h-6 w-6" style={{ color: 'rgba(6,148,209,0.4)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Training Domains ── */}
      <section className="px-4 lg:px-[50px] py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>What We Train</p>
            <h2 className="text-3xl font-black text-white lg:text-4xl">5,000+ Courses Across <span style={{ color: '#38bdf8' }}>8 Core Domains</span></h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
            {DOMAINS.map(d => (
              <div key={d.name} className="group cursor-pointer rounded-2xl p-5 transition-all hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.15)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.4)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.15)'; }}
              >
                <svg className="mb-3 h-6 w-6" style={{ color: '#0694D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">{d.icon}</svg>
                <h3 className="mb-1 text-sm font-semibold text-white">{d.name}</h3>
                <p className="text-xs" style={{ color: '#38bdf8' }}>{d.count} Courses</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Koenig ── */}
      <section className="px-4 lg:px-[50px] py-20" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Why Enterprises Choose Us</p>
            <h2 className="text-3xl font-black text-white lg:text-4xl">The Koenig <span style={{ color: '#38bdf8' }}>Difference</span></h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <div key={i} className="flex gap-4 rounded-2xl p-5" style={{ background: 'rgba(6,148,209,0.05)', border: '1px solid rgba(6,148,209,0.15)' }}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(6,148,209,0.2)' }}>
                  <svg className="h-4 w-4" style={{ color: '#38bdf8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-bold text-white">{w.title}</h3>
                  <p className="text-sm text-white/50">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Learning Formats ── */}
      <section className="px-4 lg:px-[50px] py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Flexible Delivery</p>
            <h2 className="text-3xl font-black text-white lg:text-4xl">Training That Fits <span style={{ color: '#38bdf8' }}>Your Way of Working</span></h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FORMATS.map((f, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.15)' }}>
                <div className="mb-3 text-2xl">{f.icon}</div>
                <h3 className="mb-2 text-base font-bold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="px-4 lg:px-[50px] py-20" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Client Stories</p>
            <h2 className="text-3xl font-black text-white lg:text-4xl">Trusted by <span style={{ color: '#38bdf8' }}>Global Enterprises</span></h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex flex-col rounded-2xl p-7" style={{ background: 'rgba(6,148,209,0.06)', border: '1px solid rgba(6,148,209,0.2)' }}>
                <div className="mb-4 text-3xl font-black leading-none" style={{ color: 'rgba(6,148,209,0.3)' }}>&ldquo;</div>
                <p className="flex-1 text-sm leading-relaxed text-white/75">{t.quote}</p>
                <div className="mt-5 flex items-center gap-3 border-t pt-4" style={{ borderColor: 'rgba(6,148,209,0.15)' }}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)' }}>{t.initials}</div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/45">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section id="contact" className="px-4 lg:px-[50px] py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Let's Talk</p>
            <h2 className="text-3xl font-black text-white lg:text-4xl">Start Your Enterprise <span style={{ color: '#38bdf8' }}>Training Journey</span></h2>
            <p className="mt-3 text-white/50">Tell us about your workforce goals and we'll design a programme that delivers real, measurable outcomes.</p>
          </div>
          {submitted ? (
            <div className="rounded-2xl p-10 text-center" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.3)' }}>
              <div className="mb-4 text-4xl">✅</div>
              <h3 className="mb-2 text-xl font-bold text-white">Thank you!</h3>
              <p className="text-white/60">Our enterprise team will reach out within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.2)' }}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { id: 'name',    label: 'Full Name',       type: 'text',  placeholder: 'John Smith'             },
                  { id: 'company', label: 'Company Name',    type: 'text',  placeholder: 'Acme Corporation'       },
                  { id: 'email',   label: 'Work Email',      type: 'email', placeholder: 'john@acme.com'          },
                  { id: 'phone',   label: 'Phone Number',    type: 'tel',   placeholder: '+1 (555) 000-0000'      },
                ].map(f => (
                  <div key={f.id}>
                    <label className="mb-1.5 block text-sm font-medium text-white/70">{f.label}</label>
                    <input
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={formData[f.id as keyof typeof formData]}
                      onChange={e => setFormData(p => ({ ...p, [f.id]: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-[#0694D1]"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-white/70">Tell us about your training needs</label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. We need Azure certification for 50 engineers across 3 countries..."
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all resize-none focus:border-[#0694D1]"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </div>
              <button type="submit" className="mt-6 w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 0 24px rgba(6,148,209,0.35)' }}>
                Submit — Get a Free Consultation
              </button>
              <p className="mt-3 text-center text-xs text-white/35">We'll respond within 1 business day. No spam, ever.</p>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-4 lg:px-[50px] py-10" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Image src="/images/koenig-logo.svg" alt="Koenig Solutions" width={100} height={28} className="h-7 w-auto" />
          <p className="text-sm text-white/35">© {new Date().getFullYear()} Koenig Solutions. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-white/40">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <a href="mailto:enterprise@koenig-solutions.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  )
}

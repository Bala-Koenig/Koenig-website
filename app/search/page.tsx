'use client'
import { useState, useEffect, useLayoutEffect, useRef, Suspense } from 'react'
import { createPortal } from 'react-dom'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

/* ─── Data ─────────────────────────────────────────────────── */

const ALL_COURSES = [
  { vendor: 'AWS',           name: 'AWS Certified Solutions Architect – Professional',                           examCode: 'SAP-C02',  category: 'ASSOCIATE',    days: 5, rating: 4.9, enrolled: '1,900+', price: '$1,395', hot: true,  level: 'Advanced'     },
  { vendor: 'Cisco',         name: 'Implementing and Operating Cisco Enterprise Network Core Technologies',       examCode: '350-401',  category: 'ASSOCIATE',    days: 5, rating: 4.8, enrolled: '1,100+', price: '$1,195', hot: false, level: 'Advanced'     },
  { vendor: 'Microsoft',     name: 'Configuring and Operating Microsoft Azure Virtual Desktop',                   examCode: 'AZ-140',   category: 'ASSOCIATE',    days: 4, rating: 4.7, enrolled: '980+',   price: '$996',   hot: false, level: 'Intermediate' },
  { vendor: 'Microsoft',     name: 'Designing and Implementing Microsoft Azure Networking Solutions',             examCode: 'AZ-700',   category: 'ASSOCIATE',    days: 3, rating: 4.8, enrolled: '1,200+', price: '$747',   hot: false, level: 'Intermediate' },
  { vendor: 'Microsoft',     name: 'Microsoft Azure Administrator',                                              examCode: 'AZ-104',   category: 'ASSOCIATE',    days: 5, rating: 4.9, enrolled: '2,100+', price: '$1,245', hot: true,  level: 'Intermediate' },
  { vendor: 'Microsoft',     name: 'Microsoft Azure Fundamentals',                                               examCode: 'AZ-900',   category: 'FUNDAMENTALS', days: 3, rating: 4.9, enrolled: '2,400+', price: '$597',   hot: true,  level: 'Beginner'     },
  { vendor: 'Microsoft',     name: 'Microsoft Azure Data Fundamentals',                                          examCode: 'DP-900',   category: 'FUNDAMENTALS', days: 2, rating: 4.8, enrolled: '1,800+', price: '$398',   hot: false, level: 'Beginner'     },
  { vendor: 'Microsoft',     name: 'Microsoft Azure AI Fundamentals',                                            examCode: 'AI-900',   category: 'FUNDAMENTALS', days: 2, rating: 4.8, enrolled: '1,600+', price: '$398',   hot: true,  level: 'Beginner'     },
  { vendor: 'Google Cloud',  name: 'Google Cloud Professional Data Engineer',                                    examCode: 'GPDE',     category: 'EXPERT',       days: 4, rating: 4.8, enrolled: '1,400+', price: '$1,095', hot: true,  level: 'Advanced'     },
  { vendor: 'AWS',           name: 'AWS Certified Machine Learning Engineer – Associate',                        examCode: 'MLA-C01',  category: 'ASSOCIATE',    days: 4, rating: 4.9, enrolled: '1,200+', price: '$1,195', hot: true,  level: 'Advanced'     },
  { vendor: 'Microsoft',     name: 'Microsoft Copilot Studio – Build AI-Powered Chatbots',                      examCode: 'PL-100',   category: 'FUNDAMENTALS', days: 3, rating: 4.8, enrolled: '890+',   price: '$895',   hot: true,  level: 'Beginner'     },
  { vendor: 'Kubernetes',    name: 'Certified Kubernetes Administrator (CKA) Exam Prep',                        examCode: 'CKA',      category: 'EXPERT',       days: 4, rating: 4.9, enrolled: '1,600+', price: '$995',   hot: true,  level: 'Advanced'     },
  { vendor: 'HashiCorp',     name: 'HashiCorp Certified: Terraform Associate (003)',                             examCode: 'TA-003',   category: 'ASSOCIATE',    days: 3, rating: 4.7, enrolled: '720+',   price: '$795',   hot: false, level: 'Intermediate' },
  { vendor: 'AWS',           name: 'AWS Certified AI Practitioner – Foundations',                               examCode: 'AIF-C01',  category: 'FUNDAMENTALS', days: 3, rating: 4.8, enrolled: '1,100+', price: '$895',   hot: true,  level: 'Beginner'     },
  { vendor: 'Microsoft',     name: 'Azure AI Engineer Associate (AI-102) Certification',                        examCode: 'AI-102',   category: 'ASSOCIATE',    days: 4, rating: 4.8, enrolled: '960+',   price: '$995',   hot: false, level: 'Intermediate' },
  { vendor: 'EC-Council',    name: 'Certified Ethical Hacker (CEH) – Practical',                                examCode: 'CEH-P',    category: 'EXPERT',       days: 5, rating: 4.9, enrolled: '2,200+', price: '$1,350', hot: true,  level: 'Advanced'     },
  { vendor: 'CompTIA',       name: 'CompTIA Security+ SY0-701',                                                 examCode: 'SY0-701',  category: 'ASSOCIATE',    days: 5, rating: 4.8, enrolled: '3,100+', price: '$945',   hot: true,  level: 'Intermediate' },
  { vendor: 'ISC2',          name: 'CISSP – Certified Information Systems Security Professional',               examCode: 'CISSP',    category: 'EXPERT',       days: 5, rating: 4.9, enrolled: '1,800+', price: '$1,495', hot: true,  level: 'Advanced'     },
  { vendor: 'PMI',           name: 'Project Management Professional (PMP) Certification',                       examCode: 'PMP',      category: 'EXPERT',       days: 4, rating: 4.9, enrolled: '2,600+', price: '$1,095', hot: true,  level: 'Advanced'     },
  { vendor: 'Cisco',         name: 'CCNA – Cisco Certified Network Associate',                                  examCode: '200-301',  category: 'ASSOCIATE',    days: 5, rating: 4.8, enrolled: '2,400+', price: '$995',   hot: true,  level: 'Intermediate' },
]

const ALL_VENDORS = [
  { name: 'Microsoft',    tier: 'Gold Partner',      courses: '380+', learners: '30K+', techs: '122', formats: ['1-on-1', 'Online', 'Classroom', 'Flexi'] },
  { name: 'AWS',          tier: 'Training Partner',  courses: '290+', learners: '25K+', techs: '98',  formats: ['1-on-1', 'Online', 'Classroom', 'Flexi'] },
  { name: 'Cisco',        tier: 'Premier Partner',   courses: '210+', learners: '18K+', techs: '75',  formats: ['1-on-1', 'Online', 'Classroom'] },
  { name: 'CompTIA',      tier: 'Platinum Partner',  courses: '180+', learners: '22K+', techs: '64',  formats: ['1-on-1', 'Online', 'Classroom', 'Flexi'] },
  { name: 'EC-Council',   tier: 'ATC Partner',       courses: '120+', learners: '14K+', techs: '45',  formats: ['1-on-1', 'Online', 'Classroom'] },
  { name: 'PMI',          tier: 'Premier Partner',   courses: '140+', learners: '16K+', techs: '52',  formats: ['1-on-1', 'Online', 'Classroom'] },
  { name: 'ISC2',         tier: 'Official Partner',  courses: '50+',  learners: '10K+', techs: '28',  formats: ['1-on-1', 'Online'] },
  { name: 'Oracle',       tier: 'Gold Partner',      courses: '160+', learners: '12K+', techs: '58',  formats: ['1-on-1', 'Online', 'Classroom'] },
  { name: 'Google Cloud', tier: 'Training Partner',  courses: '120+', learners: '14K+', techs: '42',  formats: ['1-on-1', 'Online', 'Classroom', 'Flexi'] },
  { name: 'Red Hat',      tier: 'Advanced Partner',  courses: '110+', learners: '8K+',  techs: '38',  formats: ['1-on-1', 'Online', 'Classroom'] },
]

const ALL_TECHNOLOGIES = [
  { name: 'Cloud Computing',             count: '840+', certifications: '51', learners: '30K+', partners: ['Microsoft', 'AWS', 'Google Cloud', 'Oracle'] },
  { name: 'Cybersecurity',               count: '620+', certifications: '48', learners: '25K+', partners: ['EC-Council', 'CompTIA', 'ISC2', 'Check Point'] },
  { name: 'Networking',                  count: '510+', certifications: '42', learners: '20K+', partners: ['Cisco', 'Juniper', 'CompTIA', 'CWNP'] },
  { name: 'Project Management',          count: '390+', certifications: '35', learners: '18K+', partners: ['PMI', 'PeopleCert', 'AXELOS', 'PRINCE2'] },
  { name: 'Artificial Intelligence (AI)',count: '280+', certifications: '32', learners: '22K+', partners: ['Microsoft', 'AWS', 'Google Cloud'] },
  { name: 'DevOps',                      count: '210+', certifications: '28', learners: '16K+', partners: ['Kubernetes', 'HashiCorp', 'AWS', 'Red Hat'] },
  { name: 'Data Science',                count: '195+', certifications: '24', learners: '14K+', partners: ['Microsoft', 'AWS', 'Google Cloud'] },
  { name: 'ERP Systems',                 count: '180+', certifications: '22', learners: '12K+', partners: ['SAP', 'Oracle', 'Microsoft'] },
  { name: 'Linux & Open Source',         count: '110+', certifications: '18', learners: '8K+',  partners: ['Red Hat', 'Linux Foundation', 'CompTIA'] },
  { name: 'Database Management',         count: '150+', certifications: '20', learners: '10K+', partners: ['Oracle', 'Microsoft', 'IBM'] },
]

/* ─── Helpers ─────────────────────────────────────────────── */

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((p, i) =>
        regex.test(p) ? <mark key={i} className="bg-transparent text-[#4dbfef] font-semibold not-italic">{p}</mark> : p
      )}
    </>
  )
}

function categoryColor(cat: string) {
  if (cat === 'FUNDAMENTALS') return { bg: 'rgba(6,148,209,0.18)', color: '#4dbfef', label: 'Fundamentals' }
  if (cat === 'ASSOCIATE')    return { bg: 'rgba(99,102,241,0.2)',  color: '#a5b4fc', label: 'Associate'    }
  if (cat === 'EXPERT')       return { bg: 'rgba(139,92,246,0.2)',  color: '#c4b5fd', label: 'Expert'       }
  return { bg: 'rgba(255,255,255,0.1)', color: '#e2e8f0', label: cat }
}

/* ─── Brochure Modal (exact homepage design) ─────────────── */

function BrochureModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.72)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[420px] rounded-2xl p-6"
        style={{ background: 'linear-gradient(160deg, #0D2137 0%, #081828 100%)', border: '1px solid rgba(6,148,209,0.30)', boxShadow: '0 0 0 1px rgba(6,148,209,0.08), 0 32px 80px rgba(0,0,0,0.8)' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div className="mb-5">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#0694d1]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0694d1]" />
            Free Training Brochure
          </p>
          <h2 className="text-2xl font-extrabold leading-tight text-white">
            Get Your Free<br />
            <span className="text-[#3AB6EB]">Training Brochure</span>
          </h2>
          <p className="mt-1.5 text-xs text-white/40">Curriculum · Pricing · Exam prep — all in one PDF</p>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">First Name <span className="text-[#0694d1]">*</span></label>
              <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/30"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} placeholder="Rahul" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
              </div>
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">Last Name</label>
              <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/30"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Sharma" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">Work Email <span className="text-[#0694d1]">*</span></label>
            <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/30"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
              <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" type="email" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">Phone / WhatsApp <span className="text-[#0694d1]">*</span></label>
            <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/30"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98400 00000" type="tel" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button onClick={onClose} className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: 'linear-gradient(90deg, #0694d1, #3AB6EB)' }}>
            Get My Brochure →
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/25">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Your details are safe. No spam, ever.
          </p>
        </div>
      </div>
    </div>
  , document.body)
}

/* ─── Enroll Modal (exact homepage design) ───────────────── */

function EnrollModal({ vendor, onClose }: { vendor: string; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [interests, setInterests] = useState<string[]>([])
  const [goal, setGoal] = useState('')

  const INTEREST_OPTIONS = ['Cloud & Infrastructure', 'Cybersecurity', 'Networking', 'Data & AI', 'DevOps', 'Project Management']
  const GOAL_OPTIONS = ['Get certified ASAP', 'Career transition', 'Upskill my team', 'Explore course options']
  const STEPS = ['YOU', 'INTERESTS', 'GOALS']

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const inputRow = (children: React.ReactNode) => (
    <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
      {children}
    </div>
  )

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.72)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[420px] rounded-2xl p-6"
        style={{ background: 'linear-gradient(160deg, #0D2137 0%, #081828 100%)', border: '1px solid rgba(6,148,209,0.30)', boxShadow: '0 0 0 1px rgba(6,148,209,0.08), 0 32px 80px rgba(0,0,0,0.8)' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div className="mb-5">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#0694d1]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0694d1]" />
            Free {vendor} Training Guide
          </p>
          <h2 className="text-2xl font-extrabold leading-tight text-white">
            Talk to a<br />
            <span className="text-[#3AB6EB]">{vendor} Expert</span>
          </h2>
          <p className="mt-1.5 text-xs text-white/40">Response within 2 hours · Zero obligation</p>
        </div>

        {/* Step indicators */}
        <div className="mb-6 flex items-center">
          {STEPS.map((s, i) => {
            const n = i + 1
            const done = step > n
            const active = step === n
            return (
              <div key={s} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${active ? 'text-white' : done ? 'bg-[#0694d1] text-white' : 'bg-white/10 text-white/30'}`}
                    style={active ? { background: 'linear-gradient(135deg,#0694d1,#076D9D)', boxShadow: '0 0 0 3px rgba(6,148,209,0.25)' } : {}}
                  >
                    {done
                      ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      : n}
                  </div>
                  <span className={`text-[9px] font-semibold tracking-wider uppercase ${active ? 'text-[#3AB6EB]' : done ? 'text-white/50' : 'text-white/25'}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="mb-4 h-px flex-1 mx-1 transition-all" style={{ background: done ? '#0694d1' : 'rgba(255,255,255,0.12)' }} />
                )}
              </div>
            )
          })}
        </div>

        {step === 1 && (
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">First Name <span className="text-[#0694d1]">*</span></label>
                {inputRow(<>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-white/30"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} placeholder="Rahul" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
                </>)}
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">Last Name</label>
                {inputRow(<>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-white/30"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Sharma" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
                </>)}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">Work Email <span className="text-[#0694d1]">*</span></label>
              {inputRow(<>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-white/30"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" type="email" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
              </>)}
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">Phone / WhatsApp <span className="text-[#0694d1]">*</span></label>
              {inputRow(<>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-white/30"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98400 00000" type="tel" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
              </>)}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <p className="text-sm text-white/50">Which areas interest you most?</p>
            <div className="grid grid-cols-2 gap-2">
              {INTEREST_OPTIONS.map(opt => (
                <button key={opt} onClick={() => setInterests(p => p.includes(opt) ? p.filter(x => x !== opt) : [...p, opt])}
                  className={`rounded-lg px-3 py-2.5 text-left text-xs font-medium transition-all ${interests.includes(opt) ? 'text-white' : 'text-white/50 hover:text-white/70'}`}
                  style={{ background: interests.includes(opt) ? 'rgba(6,148,209,0.20)' : 'rgba(255,255,255,0.05)', border: interests.includes(opt) ? '1px solid rgba(6,148,209,0.50)' : '1px solid rgba(255,255,255,0.08)' }}
                >{opt}</button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2">
            <p className="text-sm text-white/50">What is your primary goal?</p>
            {GOAL_OPTIONS.map(opt => (
              <button key={opt} onClick={() => setGoal(opt)}
                className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all ${goal === opt ? 'text-white' : 'text-white/50 hover:text-white/70'}`}
                style={{ background: goal === opt ? 'rgba(6,148,209,0.20)' : 'rgba(255,255,255,0.05)', border: goal === opt ? '1px solid rgba(6,148,209,0.50)' : '1px solid rgba(255,255,255,0.08)' }}
              >{opt}</button>
            ))}
          </div>
        )}

        <div className="mt-5">
          <button
            onClick={() => step < 3 ? setStep(s => s + 1) : onClose()}
            className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'linear-gradient(90deg, #0694d1, #3AB6EB)' }}
          >
            {step < 3 ? 'Continue →' : 'Submit →'}
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/25">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Your details are safe. No spam, ever.
          </p>
        </div>
      </div>
    </div>
  , document.body)
}

/* ─── Course Card ─────────────────────────────────────────── */

function CourseCard({ c, query }: { c: typeof ALL_COURSES[0]; query: string }) {
  const cat = categoryColor(c.category)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [isClamped, setIsClamped] = useState(false)
  const [showBrochure, setShowBrochure] = useState(false)
  const [showEnroll, setShowEnroll] = useState(false)

  useLayoutEffect(() => {
    const el = nameRef.current
    if (el) setIsClamped(el.scrollHeight > el.clientHeight)
  }, [c.name])

  return (
    <>
      <div className="flex flex-col rounded-2xl p-5" style={{ background: '#0d2235', border: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Badges row */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'rgba(6,148,209,0.18)', color: '#4dbfef' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            {c.vendor}
          </span>
          <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: cat.bg, color: cat.color }}>{cat.label}</span>
          {c.hot && (
            <span className="ml-auto animate-pulse rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: 'rgba(245,158,11,0.2)', color: '#fbbf24' }}>Popular</span>
          )}
        </div>
        {/* Title */}
        <h3 ref={nameRef} className="mb-1 line-clamp-2 text-sm font-bold leading-snug text-white">
          {highlight(c.name, query)}
        </h3>
        {isClamped && (
          <button className="mb-1 self-start text-[10px] text-[#4dbfef] hover:underline">Show more</button>
        )}
        <p className="mb-3 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{c.examCode}</p>
        {/* Meta */}
        <p className="mb-3 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {c.enrolled} enrolled &nbsp;·&nbsp; ⏱ {c.days * 8} Hrs ({c.days} days)
        </p>
        {/* Price row */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-extrabold text-white">{c.price}</span>
          <span className="cursor-pointer text-xs font-semibold text-[#4dbfef] hover:underline">Cert Details →</span>
        </div>
        {/* Buttons */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setShowBrochure(true)}
            className="flex-1 rounded-xl border border-white/20 py-2.5 text-xs font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            Brochure
          </button>
          <button
            onClick={() => setShowEnroll(true)}
            className="flex-1 rounded-xl py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#0694d1,#076d9d)' }}
          >
            Enroll Now
          </button>
        </div>
      </div>
      {showBrochure && <BrochureModal onClose={() => setShowBrochure(false)} />}
      {showEnroll && <EnrollModal vendor={c.vendor} onClose={() => setShowEnroll(false)} />}
    </>
  )
}

/* ─── Vendor Card ─────────────────────────────────────────── */

function VendorCard({ v, query }: { v: typeof ALL_VENDORS[0]; query: string }) {
  return (
    <div className="flex flex-col rounded-2xl p-5" style={{ background: '#0d2235', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-base font-bold text-white">{highlight(v.name, query)}</h3>
        <span className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'rgba(6,148,209,0.18)', color: '#4dbfef' }}>{v.tier}</span>
      </div>
      <div className="mb-4 flex gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
        <span><span className="font-bold text-white">{v.learners}</span> Learners</span>
        <span><span className="font-bold text-white">{v.courses}</span> Courses</span>
        <span><span className="font-bold text-white">{v.techs}</span> Technologies</span>
      </div>
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>Delivery Formats</p>
        <div className="flex flex-wrap gap-1.5">
          {v.formats.map(f => (
            <span key={f} className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-white/70">{f}</span>
          ))}
        </div>
      </div>
      <div className="mt-auto flex gap-2">
        <button className="flex-1 rounded-xl border border-white/20 py-2.5 text-xs font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white">Learn More</button>
        <button className="flex-1 rounded-xl py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0694d1,#076d9d)' }}>Enquire Now</button>
      </div>
    </div>
  )
}

/* ─── Technology Card ─────────────────────────────────────── */

function TechCard({ t, query }: { t: typeof ALL_TECHNOLOGIES[0]; query: string }) {
  return (
    <div className="flex flex-col rounded-2xl p-5" style={{ background: '#0d2235', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 className="mb-3 text-base font-bold leading-snug text-white">{highlight(t.name, query)}</h3>
      <div className="mb-4 flex gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
        <span><span className="font-bold text-white">{t.learners}</span> Learners</span>
        <span><span className="font-bold text-white">{t.count}</span> Courses</span>
        <span><span className="font-bold text-white">{t.certifications}</span> Certs</span>
      </div>
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>Training Partners</p>
        <div className="flex flex-wrap gap-1.5">
          {t.partners.map(p => (
            <span key={p} className="rounded-lg border border-[#0694d1]/30 bg-[#0694d1]/10 px-2.5 py-1 text-xs text-[#4dbfef]">{p}</span>
          ))}
        </div>
      </div>
      <div className="mt-auto flex gap-2">
        <button className="flex-1 rounded-xl border border-white/20 py-2.5 text-xs font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white">Learn More</button>
        <button className="flex-1 rounded-xl py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0694d1,#076d9d)' }}>Enquire Now</button>
      </div>
    </div>
  )
}

/* ─── Empty state ─────────────────────────────────────────── */

function EmptyState({ label, query }: { label: string; query: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl py-12 text-center" style={{ background: '#0d2235', border: '1px solid rgba(255,255,255,0.08)' }}>
      <svg className="mb-3 h-10 w-10 opacity-30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <p className="text-sm font-semibold text-white/50">No {label} found</p>
      {query && <p className="mt-1 text-xs text-white/30">for &ldquo;{query}&rdquo;</p>}
    </div>
  )
}

/* ─── Main Search Results Inner ──────────────────────────── */

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQ = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [inputVal, setInputVal] = useState(initialQ)
  const [activeTab, setActiveTab] = useState<'courses' | 'vendors' | 'technologies'>('courses')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setQuery(q)
    setInputVal(q)
  }, [searchParams])

  const q = query.trim().toLowerCase()

  const filteredCourses = q
    ? ALL_COURSES.filter(c => c.name.toLowerCase().includes(q) || c.vendor.toLowerCase().includes(q) || c.examCode.toLowerCase().includes(q))
    : ALL_COURSES

  const filteredVendors = q
    ? ALL_VENDORS.filter(v => v.name.toLowerCase().includes(q) || v.tier.toLowerCase().includes(q))
    : ALL_VENDORS

  const filteredTechs = q
    ? ALL_TECHNOLOGIES.filter(t => t.name.toLowerCase().includes(q) || t.partners.some(p => p.toLowerCase().includes(q)))
    : ALL_TECHNOLOGIES

  const totalCount = filteredCourses.length + filteredVendors.length + filteredTechs.length

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = inputVal.trim()
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search')
  }

  const TABS = [
    { key: 'courses',      label: 'Courses',      count: filteredCourses.length },
    { key: 'vendors',      label: 'Vendors',       count: filteredVendors.length },
    { key: 'technologies', label: 'Technologies',  count: filteredTechs.length  },
  ] as const

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg,#040f1a 0%,#061e30 60%,#051525 100%)', fontFamily: "'GT Walsheim Pro', sans-serif" }}>

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-40 border-b border-white/[0.07] backdrop-blur-md" style={{ background: 'rgba(6,18,30,0.92)' }}>
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-8">
          <Link href="/" className="shrink-0">
            <span className="text-lg font-extrabold text-white">Koenig<span style={{ color: '#0694d1' }}>.</span></span>
          </Link>
          <form onSubmit={handleSearch} className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 py-2" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)' }}>
            <svg className="h-4 w-4 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Search 5,000+ courses, vendors, technologies…"
              className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder-white/35 outline-none"
            />
            {inputVal && (
              <button type="button" onClick={() => { setInputVal(''); inputRef.current?.focus() }} className="shrink-0 text-white/40 hover:text-white/70">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            )}
            <button type="submit" className="shrink-0 rounded-lg px-4 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ background: '#0694d1' }}>
              Search
            </button>
          </form>
          <Link href="/" className="hidden shrink-0 items-center gap-1.5 rounded-xl border border-white/15 px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white sm:flex">
            ← Home
          </Link>
        </div>
      </header>

      {/* ── Results heading ── */}
      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-8">
        {query ? (
          <h1 className="text-lg font-bold text-white sm:text-xl">
            <span style={{ color: 'rgba(255,255,255,0.55)' }}>{totalCount} Search Results found for </span>
            <span className="text-[#4dbfef]">&ldquo;{query}&rdquo;</span>
          </h1>
        ) : (
          <h1 className="text-lg font-bold text-white sm:text-xl">
            Explore <span className="text-[#4dbfef]">5,000+ Courses</span>
          </h1>
        )}
        <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Showing results across courses, vendors, and technologies
        </p>
      </div>

      {/* ── Mobile tabs ── */}
      <div className="mx-auto mt-5 max-w-7xl px-4 lg:hidden">
        <div className="flex rounded-xl border border-white/10 p-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="flex-1 rounded-lg py-2 text-xs font-semibold transition-all"
              style={activeTab === t.key ? { background: '#0694d1', color: '#fff' } : { color: 'rgba(255,255,255,0.5)' }}
            >
              {t.label} <span className="opacity-70">({t.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">

        {/* Desktop column headers */}
        <div className="mb-5 hidden gap-5 lg:grid lg:grid-cols-3">
          {TABS.map(t => (
            <div key={t.key} className="flex items-center justify-center gap-2 rounded-xl py-3" style={{ background: 'rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.22)' }}>
              <span className="text-sm font-bold text-[#4dbfef]">{t.label}</span>
              <span className="rounded-full px-2 py-0.5 text-xs font-bold text-white" style={{ background: 'rgba(6,148,209,0.3)' }}>{t.count}</span>
            </div>
          ))}
        </div>

        {/* Desktop 3-col grid */}
        <div className="hidden gap-5 lg:grid lg:grid-cols-3 lg:items-start">
          <div className="flex flex-col gap-4">
            {filteredCourses.length === 0 ? <EmptyState label="courses" query={query} /> : filteredCourses.map((c, i) => <CourseCard key={i} c={c} query={query} />)}
          </div>
          <div className="flex flex-col gap-4">
            {filteredVendors.length === 0 ? <EmptyState label="vendors" query={query} /> : filteredVendors.map((v, i) => <VendorCard key={i} v={v} query={query} />)}
          </div>
          <div className="flex flex-col gap-4">
            {filteredTechs.length === 0 ? <EmptyState label="technologies" query={query} /> : filteredTechs.map((t, i) => <TechCard key={i} t={t} query={query} />)}
          </div>
        </div>

        {/* Mobile tab content */}
        <div className="flex flex-col gap-4 lg:hidden">
          {activeTab === 'courses' && (filteredCourses.length === 0 ? <EmptyState label="courses" query={query} /> : filteredCourses.map((c, i) => <CourseCard key={i} c={c} query={query} />))}
          {activeTab === 'vendors' && (filteredVendors.length === 0 ? <EmptyState label="vendors" query={query} /> : filteredVendors.map((v, i) => <VendorCard key={i} v={v} query={query} />))}
          {activeTab === 'technologies' && (filteredTechs.length === 0 ? <EmptyState label="technologies" query={query} /> : filteredTechs.map((t, i) => <TechCard key={i} t={t} query={query} />))}
        </div>
      </div>
    </div>
  )
}

/* ─── Page export ─────────────────────────────────────────── */

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#040f1a' }}>
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#0694d1]" />
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
}

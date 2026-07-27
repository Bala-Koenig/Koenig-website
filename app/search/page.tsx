'use client'
import { useState, useEffect, useLayoutEffect, useRef, Suspense } from 'react'
import { createPortal } from 'react-dom'
import { useSearchParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { queryTokens, matchesText, classifyAiQuery } from '@/lib/aiSearch'

/* ─── Data ─────────────────────────────────────────────────── */

const ALL_COURSES = [
  { vendor: 'AWS',           name: 'AWS Certified Solutions Architect – Professional',                           examCode: 'SAP-C02',  category: 'ASSOCIATE',    days: 5, rating: 4.9, enrolled: '1,900+', price: '₹45,000', hot: true,  level: 'Advanced'     },
  { vendor: 'Cisco',         name: 'Implementing and Operating Cisco Enterprise Network Core Technologies',       examCode: '350-401',  category: 'ASSOCIATE',    days: 5, rating: 4.8, enrolled: '1,100+', price: '₹38,000', hot: false, level: 'Advanced'     },
  { vendor: 'Microsoft',     name: 'Configuring and Operating Microsoft Azure Virtual Desktop',                   examCode: 'AZ-140',   category: 'ASSOCIATE',    days: 4, rating: 4.7, enrolled: '980+',   price: '₹32,000', hot: false, level: 'Intermediate' },
  { vendor: 'Microsoft',     name: 'Designing and Implementing Microsoft Azure Networking Solutions',             examCode: 'AZ-700',   category: 'ASSOCIATE',    days: 3, rating: 4.8, enrolled: '1,200+', price: '₹28,000', hot: false, level: 'Intermediate' },
  { vendor: 'Microsoft',     name: 'Microsoft Azure Administrator',                                              examCode: 'AZ-104',   category: 'ASSOCIATE',    days: 5, rating: 4.9, enrolled: '2,100+', price: '₹33,000', hot: true,  level: 'Intermediate' },
  { vendor: 'Microsoft',     name: 'Microsoft Azure Fundamentals',                                               examCode: 'AZ-900',   category: 'FUNDAMENTALS', days: 3, rating: 4.9, enrolled: '2,400+', price: '₹18,000', hot: true,  level: 'Beginner'     },
  { vendor: 'Microsoft',     name: 'Microsoft Azure Data Fundamentals',                                          examCode: 'DP-900',   category: 'FUNDAMENTALS', days: 2, rating: 4.8, enrolled: '1,800+', price: '₹15,000', hot: false, level: 'Beginner'     },
  { vendor: 'Microsoft',     name: 'Microsoft Azure AI Fundamentals',                                            examCode: 'AI-900',   category: 'FUNDAMENTALS', days: 2, rating: 4.8, enrolled: '1,600+', price: '₹15,000', hot: true,  level: 'Beginner'     },
  { vendor: 'Google Cloud',  name: 'Google Cloud Professional Data Engineer',                                    examCode: 'GPDE',     category: 'EXPERT',       days: 4, rating: 4.8, enrolled: '1,400+', price: '₹42,000', hot: true,  level: 'Advanced'     },
  { vendor: 'AWS',           name: 'AWS Certified Machine Learning Engineer – Associate',                        examCode: 'MLA-C01',  category: 'ASSOCIATE',    days: 4, rating: 4.9, enrolled: '1,200+', price: '₹38,000', hot: true,  level: 'Advanced'     },
  { vendor: 'Microsoft',     name: 'Microsoft Copilot Studio – Build AI-Powered Chatbots',                      examCode: 'PL-100',   category: 'FUNDAMENTALS', days: 3, rating: 4.8, enrolled: '890+',   price: '₹25,000', hot: true,  level: 'Beginner'     },
  { vendor: 'Kubernetes',    name: 'Certified Kubernetes Administrator (CKA) Exam Prep',                        examCode: 'CKA',      category: 'EXPERT',       days: 4, rating: 4.9, enrolled: '1,600+', price: '₹36,000', hot: true,  level: 'Advanced'     },
  { vendor: 'HashiCorp',     name: 'HashiCorp Certified: Terraform Associate (003)',                             examCode: 'TA-003',   category: 'ASSOCIATE',    days: 3, rating: 4.7, enrolled: '720+',   price: '₹30,000', hot: false, level: 'Intermediate' },
  { vendor: 'AWS',           name: 'AWS Certified AI Practitioner – Foundations',                               examCode: 'AIF-C01',  category: 'FUNDAMENTALS', days: 3, rating: 4.8, enrolled: '1,100+', price: '₹25,000', hot: true,  level: 'Beginner'     },
  { vendor: 'Microsoft',     name: 'Azure AI Engineer Associate (AI-102) Certification',                        examCode: 'AI-102',   category: 'ASSOCIATE',    days: 4, rating: 4.8, enrolled: '960+',   price: '₹33,000', hot: false, level: 'Intermediate' },
  { vendor: 'EC-Council',    name: 'Certified Ethical Hacker (CEH) – Practical',                                examCode: 'CEH-P',    category: 'EXPERT',       days: 5, rating: 4.9, enrolled: '2,200+', price: '₹48,000', hot: true,  level: 'Advanced'     },
  { vendor: 'CompTIA',       name: 'CompTIA Security+ SY0-701',                                                 examCode: 'SY0-701',  category: 'ASSOCIATE',    days: 5, rating: 4.8, enrolled: '3,100+', price: '₹32,000', hot: true,  level: 'Intermediate' },
  { vendor: 'ISC2',          name: 'CISSP – Certified Information Systems Security Professional',               examCode: 'CISSP',    category: 'EXPERT',       days: 5, rating: 4.9, enrolled: '1,800+', price: '₹52,000', hot: true,  level: 'Advanced'     },
  { vendor: 'PMI',           name: 'Project Management Professional (PMP) Certification',                       examCode: 'PMP',      category: 'EXPERT',       days: 4, rating: 4.9, enrolled: '2,600+', price: '₹40,000', hot: true,  level: 'Advanced'     },
  { vendor: 'Cisco',         name: 'CCNA – Cisco Certified Network Associate',                                  examCode: '200-301',  category: 'ASSOCIATE',    days: 5, rating: 4.8, enrolled: '2,400+', price: '₹33,000', hot: true,  level: 'Intermediate' },
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
  { name: 'Cloud Computing',             count: '840+', certifications: '51', learners: '30K+', partners: ['Microsoft', 'AWS', 'Google Cloud', 'Oracle'], keywords: ['azure', 'aws', 'gcp', 'cloud', 'ec2', 'vm', 'virtual machine'] },
  { name: 'Cybersecurity',               count: '620+', certifications: '48', learners: '25K+', partners: ['EC-Council', 'CompTIA', 'ISC2', 'Check Point'], keywords: ['security', 'ceh', 'cissp', 'security+', 'sy0', 'ethical hacking', 'firewall'] },
  { name: 'Networking',                  count: '510+', certifications: '42', learners: '20K+', partners: ['Cisco', 'Juniper', 'CompTIA', 'CWNP'], keywords: ['cisco', 'ccna', 'ccnp', 'router', 'switch', 'network'] },
  { name: 'Project Management',          count: '390+', certifications: '35', learners: '18K+', partners: ['PMI', 'PeopleCert', 'AXELOS', 'PRINCE2'], keywords: ['pmp', 'project management', 'agile', 'scrum', 'prince2'] },
  { name: 'Artificial Intelligence (AI)',count: '280+', certifications: '32', learners: '22K+', partners: ['Microsoft', 'AWS', 'Google Cloud'], keywords: ['ai', 'azure ai', 'machine learning', 'ml', 'copilot', 'openai', 'cognitive'] },
  { name: 'DevOps',                      count: '210+', certifications: '28', learners: '16K+', partners: ['Kubernetes', 'HashiCorp', 'AWS', 'Red Hat'], keywords: ['devops', 'kubernetes', 'docker', 'terraform', 'ci/cd', 'pipeline'] },
  { name: 'Data Science',                count: '195+', certifications: '24', learners: '14K+', partners: ['Microsoft', 'AWS', 'Google Cloud'], keywords: ['data science', 'power bi', 'data analyst', 'analytics', 'fabric'] },
  { name: 'ERP Systems',                 count: '180+', certifications: '22', learners: '12K+', partners: ['SAP', 'Oracle', 'Microsoft'], keywords: ['sap', 'erp', 'dynamics 365'] },
  { name: 'Linux & Open Source',         count: '110+', certifications: '18', learners: '8K+',  partners: ['Red Hat', 'Linux Foundation', 'CompTIA'], keywords: ['linux', 'red hat', 'rhel', 'open source'] },
  { name: 'Database Management',         count: '150+', certifications: '20', learners: '10K+', partners: ['Oracle', 'Microsoft', 'IBM'], keywords: ['database', 'sql', 'oracle db', 'azure sql'] },
]

/* ─── Helpers ─────────────────────────────────────────────── */

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const tokens = queryTokens(query)
  const alternatives = text.toLowerCase().includes(query.toLowerCase()) ? [query] : tokens
  if (alternatives.length === 0) return <>{text}</>
  const regex = new RegExp(`(${alternatives.map(escape).join('|')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((p, i) =>
        regex.test(p) ? <mark key={i} className="bg-transparent text-[#0694D1] font-semibold not-italic">{p}</mark> : p
      )}
    </>
  )
}

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  FUNDAMENTALS: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M5 3a7 7 0 0 0 7 7 7 7 0 0 0 7-7"/></svg>,
  ASSOCIATE: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
  EXPERT: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7l4 9h12l4-9-6 4-4-6-4 6z"/></svg>,
}

function categoryColor(cat: string) {
  if (cat === 'FUNDAMENTALS') return { badge: 'bg-gradient-to-br from-[#4DBFEF] to-[#0694D1] text-white', label: 'Fundamentals', icon: CATEGORY_ICON.FUNDAMENTALS }
  if (cat === 'ASSOCIATE')    return { badge: 'bg-gradient-to-br from-[#0694D1] to-[#076D9D] text-white', label: 'Associate',    icon: CATEGORY_ICON.ASSOCIATE }
  if (cat === 'EXPERT')       return { badge: 'bg-gradient-to-br from-[#076D9D] to-[#062238] text-white', label: 'Expert',       icon: CATEGORY_ICON.EXPERT }
  return { badge: 'bg-koenig-blue/10 text-koenig-blue', label: cat, icon: null }
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
  const [showEnroll, setShowEnroll] = useState(false)

  useLayoutEffect(() => {
    const el = nameRef.current
    if (el) setIsClamped(el.scrollHeight > el.clientHeight)
  }, [c.name])

  return (
    <>
    <div className="relative flex flex-col rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(6,148,209,0.07)] transition-shadow hover:shadow-[0_8px_24px_rgba(6,148,209,0.16)]" style={{ border: '1.5px solid rgba(6,148,209,0.12)' }}>
        {/* Popular corner ribbon */}
        {c.hot && (
          <span className="absolute right-0 top-0 z-[1] inline-flex items-center gap-1 whitespace-nowrap rounded-bl-xl rounded-tr-xl px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-white" style={{ background: 'linear-gradient(135deg,#0694D1,#22d3ee)' }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c0 0-5.5 6-5.5 10.5a5.5 5.5 0 0 0 11 0C17.5 8 12 2 12 2zm0 14a3 3 0 0 1-3-3c0-2.5 3-6 3-6s3 3.5 3 6a3 3 0 0 1-3 3z" /></svg>
            Popular
          </span>
        )}
        {/* Level badge */}
        <div className="mb-3 flex items-center">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide whitespace-nowrap ${cat.badge}`}>
            {cat.icon}
            {cat.label}
          </span>
        </div>
        {/* Title */}
        <h3 ref={nameRef} className="mb-1 line-clamp-2 text-sm font-bold leading-snug text-koenig-navy">
          {highlight(c.name, query)}
        </h3>
        {isClamped && (
          <button className="mb-1 self-start text-[10px] text-koenig-blue hover:underline">Show more</button>
        )}
        {/* Code + duration chips */}
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <span className="inline-block rounded px-1.5 py-0.5 font-mono text-xs font-bold tracking-wide text-koenig-blue" style={{ background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.28)' }}>{c.examCode}</span>
          <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-xs font-semibold" style={{ background: 'rgba(6,148,209,0.05)', border: '1px solid rgba(6,148,209,0.14)', color: '#5a7a90' }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {c.days} day{c.days !== 1 ? 's' : ''} · {c.days * 8}hrs
          </span>
        </div>
        {/* Enrolled + rating + price row */}
        <div className="mt-auto flex items-center gap-3 border-t pt-3" style={{ borderColor: 'rgba(6,148,209,0.08)' }}>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-koenig-muted">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            {c.enrolled}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
            <span className="text-[10px]">★</span>
            {c.rating}
          </span>
          <span className="ml-auto text-[15px] font-bold text-koenig-blue">{c.price}</span>
        </div>
        {/* Button */}
        <div className="mt-3">
          <button
            onClick={() => setShowEnroll(true)}
            className="w-full rounded-xl border-[1.5px] py-2.5 text-xs font-bold text-koenig-blue transition-colors hover:bg-koenig-blue/5"
            style={{ borderColor: '#0694D1' }}
          >
            View Course
          </button>
        </div>
      </div>
      {showEnroll && <EnrollModal vendor={c.vendor} onClose={() => setShowEnroll(false)} />}
    </>
  )
}

/* ─── Vendor Card ─────────────────────────────────────────── */

function VendorCard({ v, query }: { v: typeof ALL_VENDORS[0]; query: string }) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(6,148,209,0.07)] transition-shadow hover:shadow-[0_8px_24px_rgba(6,148,209,0.16)]" style={{ border: '1.5px solid rgba(6,148,209,0.12)' }}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-base font-bold text-koenig-navy">{highlight(v.name, query)}</h3>
        <span className="shrink-0 rounded-full bg-koenig-blue/10 px-2.5 py-1 text-xs font-semibold text-koenig-blue">{v.tier}</span>
      </div>
      <div className="mb-4 flex gap-4 text-xs text-koenig-gray">
        <span><span className="font-bold text-koenig-dark">{v.learners}</span> Learners</span>
        <span><span className="font-bold text-koenig-dark">{v.courses}</span> Courses</span>
        <span><span className="font-bold text-koenig-dark">{v.techs}</span> Technologies</span>
      </div>
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-koenig-gray/70">Delivery Formats</p>
        <div className="flex flex-wrap gap-1.5">
          {v.formats.map(f => (
            <span key={f} className="rounded-lg border px-2.5 py-1 text-xs text-koenig-gray" style={{ borderColor: '#CAEFFF' }}>{f}</span>
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <button className="w-full rounded-xl border-[1.5px] py-2.5 text-xs font-bold text-koenig-blue transition-colors hover:bg-koenig-blue/5" style={{ borderColor: '#0694D1' }}>View Vendor</button>
      </div>
    </div>
  )
}

/* ─── Technology Card ─────────────────────────────────────── */

function TechCard({ t, query }: { t: typeof ALL_TECHNOLOGIES[0]; query: string }) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(6,148,209,0.07)] transition-shadow hover:shadow-[0_8px_24px_rgba(6,148,209,0.16)]" style={{ border: '1.5px solid rgba(6,148,209,0.12)' }}>
      <h3 className="mb-3 text-base font-bold leading-snug text-koenig-navy">{highlight(t.name, query)}</h3>
      <div className="mb-4 flex gap-4 text-xs text-koenig-gray">
        <span><span className="font-bold text-koenig-dark">{t.learners}</span> Learners</span>
        <span><span className="font-bold text-koenig-dark">{t.count}</span> Courses</span>
      </div>
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-koenig-gray/70">Training Partners</p>
        <div className="flex flex-wrap gap-1.5">
          {t.partners.map(p => (
            <span key={p} className="rounded-lg border border-koenig-blue/20 bg-koenig-blue/10 px-2.5 py-1 text-xs text-koenig-blue">{p}</span>
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <button className="w-full rounded-xl border-[1.5px] py-2.5 text-xs font-bold text-koenig-blue transition-colors hover:bg-koenig-blue/5" style={{ borderColor: '#0694D1' }}>View Technology</button>
      </div>
    </div>
  )
}

/* ─── Empty state ─────────────────────────────────────────── */

function EmptyState({ label, query }: { label: string; query: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white py-12 text-center" style={{ border: '1.5px solid rgba(6,148,209,0.12)' }}>
      <svg className="mb-3 h-10 w-10 text-koenig-blue/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <p className="text-sm font-semibold text-koenig-gray">No {label} found</p>
      {query && <p className="mt-1 text-xs text-koenig-gray/60">for &ldquo;{query}&rdquo;</p>}
    </div>
  )
}

/* ─── Main Search Results Inner ──────────────────────────── */

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQ = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [activeTab, setActiveTab] = useState<'courses' | 'vendors' | 'technologies'>('courses')
  const [learnMoreOpen, setLearnMoreOpen] = useState(false)
  const [askInput, setAskInput] = useState('')

  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setQuery(q)
    setLearnMoreOpen(false)
  }, [searchParams])

  function askAnything() {
    const text = askInput.trim()
    if (!text) return
    setAskInput('')
    router.push(`/search?q=${encodeURIComponent(text)}`)
  }

  const q = query.trim().toLowerCase()
  const qTokens = queryTokens(q)
  const aiResult = query.trim() ? classifyAiQuery(query) : null

  const filteredCourses = q
    ? ALL_COURSES.filter(c => matchesText(c.name, q, qTokens) || matchesText(c.vendor, q, qTokens) || matchesText(c.examCode, q, qTokens))
    : ALL_COURSES

  const filteredVendors = q
    ? ALL_VENDORS.filter(v => matchesText(v.name, q, qTokens) || matchesText(v.tier, q, qTokens))
    : ALL_VENDORS

  const filteredTechs = q
    ? ALL_TECHNOLOGIES.filter(t =>
        matchesText(t.name, q, qTokens) ||
        t.partners.some(p => matchesText(p, q, qTokens)) ||
        t.keywords.some(k => matchesText(k, q, qTokens))
      )
    : ALL_TECHNOLOGIES

  const totalCount = filteredCourses.length + filteredVendors.length + filteredTechs.length

  const TABS = [
    { key: 'courses',      label: 'Courses',      count: filteredCourses.length },
    { key: 'vendors',      label: 'Vendors',       count: filteredVendors.length },
    { key: 'technologies', label: 'Technologies',  count: filteredTechs.length  },
  ] as const

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>

      {/* ── Full homepage navigation ── */}
      <Navbar initialQuery={initialQ} />

      {/* ── Ask anything — compact full-width search box, top of the page ── */}
      <div className="mx-auto mt-5 max-w-7xl px-4 lg:px-8">
        <div className="flex w-full items-center gap-2 rounded-xl bg-white p-1.5" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.08)' }}>
          <input
            type="text"
            value={askInput}
            onChange={e => setAskInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); askAnything() } }}
            placeholder="Ask about courses, certifications, or career paths…"
            aria-label="Ask anything"
            className="min-w-0 flex-1 bg-transparent px-2.5 py-1.5 text-sm text-[#1a2d3e] placeholder-[#9a9a9a] outline-none"
          />
          <button
            type="button"
            onClick={askAnything}
            aria-label="Ask"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#5f6368] transition-colors hover:bg-black/5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
          </button>
        </div>
      </div>

      {/* ── Results heading ── */}
      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-8">
        {query ? (
          <h1 className="text-lg font-bold text-koenig-dark sm:text-xl">
            <span className="text-koenig-muted">{totalCount} Search Results found for </span>
            <span className="text-koenig-blue">&ldquo;{query}&rdquo;</span>
          </h1>
        ) : (
          <h1 className="text-lg font-bold text-koenig-dark sm:text-xl">
            Explore <span className="text-koenig-blue">5,000+ Courses</span>
          </h1>
        )}
        <p className="mt-1 text-sm text-koenig-muted">
          Showing results across courses, vendors, and technologies
        </p>

        {/* ── AI description — advice + fuller overview, same accent treatment as the homepage hero search ── */}
        {aiResult && (
          <div className="mt-4 flex items-start justify-between gap-4 rounded-r-lg border-l-[3px] border-[#0694D1] px-4 py-3.5" style={{ background: 'rgba(6,148,209,0.06)' }}>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-relaxed text-[#071e2e]">{aiResult.advice}</p>
              {aiResult.learnMore && (
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#4a6375] sm:text-sm">{aiResult.learnMore.overview}</p>
              )}
            </div>
            {aiResult.learnMore && (
              <button
                onClick={() => setLearnMoreOpen(true)}
                className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md border-[1.5px] border-[#0694D1] bg-white px-2.5 py-1 text-[11.5px] font-bold text-[#0694D1]"
              >
                Learn more
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            )}
          </div>
        )}

        {/* Learn more modal — same layout as the homepage hero search */}
        {learnMoreOpen && aiResult?.learnMore && typeof document !== 'undefined' && createPortal(
          <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(7,30,46,0.6)', backdropFilter: 'blur(6px)' }} onClick={() => setLearnMoreOpen(false)}>
            <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 580, maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(6,148,209,0.22)', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <div style={{ background: 'linear-gradient(135deg,#071e2e 0%,#093148 100%)', borderRadius: '20px 20px 0 0', padding: '22px 24px 20px', position: 'relative' }}>
                <button onClick={() => setLearnMoreOpen(false)} style={{ position: 'absolute', top: 14, right: 14, width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(6,148,209,0.2)', border: '1px solid rgba(6,148,209,0.4)', borderRadius: 999, padding: '3px 10px', marginBottom: 10 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.88 5.47L19 9l-4.12 3-1.88 5.47L11 12 5 9l5.12-.53z" /></svg>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Learning Guide</span>
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.25, margin: 0 }}>{aiResult.learnMore.title}</h2>
              </div>
              <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <p style={{ fontSize: 13, color: '#4a6375', lineHeight: 1.75, margin: 0 }}>{aiResult.learnMore.overview}</p>
                <div>
                  <h4 style={{ fontSize: 12, fontWeight: 800, color: '#071e2e', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Career Paths This Opens</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {aiResult.learnMore.careers.map((c, i) => (
                      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 999, background: '#F0F8FF', border: '1px solid rgba(6,148,209,0.2)', fontSize: 12, fontWeight: 600, color: '#0b2840' }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: 12, fontWeight: 800, color: '#071e2e', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Key Skills You&apos;ll Learn</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {aiResult.learnMore.skills.map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                        <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                        <span style={{ fontSize: 13, color: '#2d4a6a', lineHeight: 1.5 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: '#F8FCFF', border: '1px solid rgba(6,148,209,0.18)', borderRadius: 12, padding: '14px 16px' }}>
                  <h4 style={{ fontSize: 12, fontWeight: 800, color: '#071e2e', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Why Now?</h4>
                  <p style={{ fontSize: 13, color: '#4a6375', lineHeight: 1.7, margin: '0 0 12px' }}>{aiResult.learnMore.whyNow}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                    {aiResult.learnMore.points.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                        <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(6,148,209,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                        <span style={{ fontSize: 11.5, color: '#071e2e', fontWeight: 600, lineHeight: 1.4 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>

      {/* ── Mobile tabs ── */}
      <div className="mx-auto mt-5 max-w-7xl px-4 lg:hidden">
        <div className="flex rounded-xl bg-koenig-light p-1" style={{ border: '1px solid #CAEFFF' }}>
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${activeTab === t.key ? 'text-white' : 'text-koenig-gray'}`}
              style={activeTab === t.key ? { background: '#0694d1' } : {}}
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
            <div key={t.key} className="flex items-center justify-center gap-2 rounded-xl bg-koenig-blue/10 py-3" style={{ border: '1px solid rgba(6,148,209,0.22)' }}>
              <span className="text-sm font-bold text-koenig-blue">{t.label}</span>
              <span className="rounded-full bg-koenig-blue/25 px-2 py-0.5 text-xs font-bold text-koenig-dark">{t.count}</span>
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
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-koenig-blue/20 border-t-koenig-blue" />
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
}

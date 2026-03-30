'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
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
  { name: 'Microsoft',       tier: 'Gold Partner',       courses: '380+', learners: '30K+', techs: '122', img: 'microsoft-cloud-t.png',    formats: ['1-on-1', 'Online', 'Classroom', 'Flexi'] },
  { name: 'AWS',             tier: 'Training Partner',   courses: '290+', learners: '25K+', techs: '98',  img: 'amazon-authorized.png',    formats: ['1-on-1', 'Online', 'Classroom', 'Flexi'] },
  { name: 'Cisco',           tier: 'Premier Partner',    courses: '210+', learners: '18K+', techs: '75',  img: 'Cisco.png',                formats: ['1-on-1', 'Online', 'Classroom'] },
  { name: 'CompTIA',         tier: 'Platinum Partner',   courses: '180+', learners: '22K+', techs: '64',  img: 'comptia.png',              formats: ['1-on-1', 'Online', 'Classroom', 'Flexi'] },
  { name: 'EC-Council',      tier: 'ATC Partner',        courses: '120+', learners: '14K+', techs: '45',  img: 'EC-Council-logo.png',      formats: ['1-on-1', 'Online', 'Classroom'] },
  { name: 'PMI',             tier: 'Premier Partner',    courses: '140+', learners: '16K+', techs: '52',  img: 'PMI1115-ATP-Badge-2024-rgb.png', formats: ['1-on-1', 'Online', 'Classroom'] },
  { name: 'ISC2',            tier: 'Official Partner',   courses: '50+',  learners: '10K+', techs: '28',  img: 'OTP-Preferred-Badge.png',  formats: ['1-on-1', 'Online'] },
  { name: 'Oracle',          tier: 'Gold Partner',       courses: '160+', learners: '12K+', techs: '58',  img: 'o-prtnr-clr-rgb (1).png', formats: ['1-on-1', 'Online', 'Classroom'] },
  { name: 'Google Cloud',    tier: 'Training Partner',   courses: '120+', learners: '14K+', techs: '42',  img: undefined,                  formats: ['1-on-1', 'Online', 'Classroom', 'Flexi'] },
  { name: 'Red Hat',         tier: 'Advanced Partner',   courses: '110+', learners: '8K+',  techs: '38',  img: 'Redvendorlogo.png',        formats: ['1-on-1', 'Online', 'Classroom'] },
]

const ALL_TECHNOLOGIES = [
  { name: 'Cloud Computing',      count: '840+', certifications: '51', learners: '30K+', partners: ['Microsoft', 'AWS', 'Google Cloud', 'Oracle'] },
  { name: 'Cybersecurity',        count: '620+', certifications: '48', learners: '25K+', partners: ['EC-Council', 'CompTIA', 'ISC2', 'Check Point'] },
  { name: 'Networking',           count: '510+', certifications: '42', learners: '20K+', partners: ['Cisco', 'Juniper', 'CompTIA', 'CWNP'] },
  { name: 'Project Management',   count: '390+', certifications: '35', learners: '18K+', partners: ['PMI', 'PeopleCert', 'AXELOS', 'PRINCE2'] },
  { name: 'Artificial Intelligence (AI)', count: '280+', certifications: '32', learners: '22K+', partners: ['Microsoft', 'AWS', 'Google Cloud'] },
  { name: 'DevOps',               count: '210+', certifications: '28', learners: '16K+', partners: ['Kubernetes', 'HashiCorp', 'AWS', 'Red Hat'] },
  { name: 'Data Science',         count: '195+', certifications: '24', learners: '14K+', partners: ['Microsoft', 'AWS', 'Google Cloud'] },
  { name: 'ERP Systems',          count: '180+', certifications: '22', learners: '12K+', partners: ['SAP', 'Oracle', 'Microsoft'] },
  { name: 'Linux & Open Source',  count: '110+', certifications: '18', learners: '8K+',  partners: ['Red Hat', 'Linux Foundation', 'CompTIA'] },
  { name: 'Database Management',  count: '150+', certifications: '20', learners: '10K+', partners: ['Oracle', 'Microsoft', 'IBM'] },
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

/* ─── Course Card ─────────────────────────────────────────── */

function CourseCard({ c, query }: { c: typeof ALL_COURSES[0]; query: string }) {
  const cat = categoryColor(c.category)
  return (
    <div className="flex flex-col rounded-2xl p-5" style={{ background: '#0d2235', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Badges row */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'rgba(6,148,209,0.18)', color: '#4dbfef' }}>
          <span>⊙</span>{c.vendor}
        </span>
        <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: cat.bg, color: cat.color }}>{cat.label}</span>
        {c.hot && (
          <span className="ml-auto rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: 'rgba(245,158,11,0.2)', color: '#fbbf24' }}>Popular</span>
        )}
      </div>
      {/* Title */}
      <h3 className="mb-1 text-sm font-bold leading-snug text-white line-clamp-2">
        {highlight(c.name, query)}
      </h3>
      <p className="mb-3 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>{c.examCode}</p>
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
        <button className="flex-1 rounded-xl border border-white/20 py-2.5 text-xs font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white">
          Brochure
        </button>
        <button className="flex-1 rounded-xl py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0694d1,#076d9d)' }}>
          Enroll Now
        </button>
      </div>
    </div>
  )
}

/* ─── Vendor Card ─────────────────────────────────────────── */

function VendorCard({ v, query }: { v: typeof ALL_VENDORS[0]; query: string }) {
  return (
    <div className="flex flex-col rounded-2xl p-5" style={{ background: '#0d2235', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-base font-bold text-white">{highlight(v.name, query)}</h3>
        <span className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'rgba(6,148,209,0.18)', color: '#4dbfef' }}>{v.tier}</span>
      </div>
      {/* Stats */}
      <div className="mb-4 flex gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
        <span><span className="font-bold text-white">{v.learners}</span> Learners</span>
        <span><span className="font-bold text-white">{v.courses}</span> Courses</span>
        <span><span className="font-bold text-white">{v.techs}</span> Technologies</span>
      </div>
      {/* Delivery formats */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>Delivery Formats</p>
        <div className="flex flex-wrap gap-1.5">
          {v.formats.map(f => (
            <span key={f} className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-white/70">{f}</span>
          ))}
        </div>
      </div>
      {/* Buttons */}
      <div className="mt-auto flex gap-2">
        <button className="flex-1 rounded-xl border border-white/20 py-2.5 text-xs font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white">
          Learn More
        </button>
        <button className="flex-1 rounded-xl py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0694d1,#076d9d)' }}>
          Enquire Now
        </button>
      </div>
    </div>
  )
}

/* ─── Technology Card ─────────────────────────────────────── */

function TechCard({ t, query }: { t: typeof ALL_TECHNOLOGIES[0]; query: string }) {
  return (
    <div className="flex flex-col rounded-2xl p-5" style={{ background: '#0d2235', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Header */}
      <h3 className="mb-3 text-base font-bold leading-snug text-white">{highlight(t.name, query)}</h3>
      {/* Stats */}
      <div className="mb-4 flex gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
        <span><span className="font-bold text-white">{t.learners}</span> Learners</span>
        <span><span className="font-bold text-white">{t.count}</span> Courses</span>
        <span><span className="font-bold text-white">{t.certifications}</span> Certs</span>
      </div>
      {/* Training partners */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>Training Partners</p>
        <div className="flex flex-wrap gap-1.5">
          {t.partners.map(p => (
            <span key={p} className="rounded-lg border border-[#0694d1]/30 bg-[#0694d1]/10 px-2.5 py-1 text-xs text-[#4dbfef]">{p}</span>
          ))}
        </div>
      </div>
      {/* Buttons */}
      <div className="mt-auto flex gap-2">
        <button className="flex-1 rounded-xl border border-white/20 py-2.5 text-xs font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white">
          Learn More
        </button>
        <button className="flex-1 rounded-xl py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0694d1,#076d9d)' }}>
          Enquire Now
        </button>
      </div>
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
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    }
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
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-lg font-extrabold text-white">Koenig<span style={{ color: '#0694d1' }}>.</span></span>
          </Link>
          {/* Search bar */}
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
          {/* Back */}
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
            <span className="text-[#4dbfef]">"{query}"</span>
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
      <div className="mx-auto mt-5 max-w-7xl px-4 lg:hidden lg:px-8">
        <div className="flex rounded-xl border border-white/10 p-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="flex-1 rounded-lg py-2 text-xs font-semibold transition-all"
              style={activeTab === t.key
                ? { background: '#0694d1', color: '#fff' }
                : { color: 'rgba(255,255,255,0.5)' }}
            >
              {t.label} <span className="opacity-70">({t.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Desktop: 3-column grid | Mobile: tab content ── */}
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">

        {/* Desktop 3-col headers */}
        <div className="mb-5 hidden gap-5 lg:grid lg:grid-cols-3">
          {TABS.map(t => (
            <div key={t.key} className="flex items-center justify-center gap-2 rounded-xl py-3" style={{ background: 'rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.22)' }}>
              <span className="text-sm font-bold text-[#4dbfef]">{t.label}</span>
              <span className="rounded-full px-2 py-0.5 text-xs font-bold text-white" style={{ background: 'rgba(6,148,209,0.3)' }}>{t.count}</span>
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden gap-5 lg:grid lg:grid-cols-3 lg:items-start">
          {/* Courses */}
          <div className="flex flex-col gap-4">
            {filteredCourses.length === 0
              ? <EmptyState label="courses" query={query} />
              : filteredCourses.map((c, i) => <CourseCard key={i} c={c} query={query} />)
            }
          </div>
          {/* Vendors */}
          <div className="flex flex-col gap-4">
            {filteredVendors.length === 0
              ? <EmptyState label="vendors" query={query} />
              : filteredVendors.map((v, i) => <VendorCard key={i} v={v} query={query} />)
            }
          </div>
          {/* Technologies */}
          <div className="flex flex-col gap-4">
            {filteredTechs.length === 0
              ? <EmptyState label="technologies" query={query} />
              : filteredTechs.map((t, i) => <TechCard key={i} t={t} query={query} />)
            }
          </div>
        </div>

        {/* Mobile tab content */}
        <div className="flex flex-col gap-4 lg:hidden">
          {activeTab === 'courses' && (
            filteredCourses.length === 0
              ? <EmptyState label="courses" query={query} />
              : filteredCourses.map((c, i) => <CourseCard key={i} c={c} query={query} />)
          )}
          {activeTab === 'vendors' && (
            filteredVendors.length === 0
              ? <EmptyState label="vendors" query={query} />
              : filteredVendors.map((v, i) => <VendorCard key={i} v={v} query={query} />)
          )}
          {activeTab === 'technologies' && (
            filteredTechs.length === 0
              ? <EmptyState label="technologies" query={query} />
              : filteredTechs.map((t, i) => <TechCard key={i} t={t} query={query} />)
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState({ label, query }: { label: string; query: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl py-12 text-center" style={{ background: '#0d2235', border: '1px solid rgba(255,255,255,0.08)' }}>
      <svg className="mb-3 h-10 w-10 opacity-30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <p className="text-sm font-semibold text-white/50">No {label} found</p>
      {query && <p className="mt-1 text-xs text-white/30">for "{query}"</p>}
    </div>
  )
}

/* ─── Page export with Suspense ─────────────────────────── */

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

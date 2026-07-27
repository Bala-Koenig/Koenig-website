'use client'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Navbar from '@/components/Navbar'

/* ── Practice test data ──────────────────────────────────────── */
const QUBIT_COURSES = [
  {
    id: 1, vendor: 'Microsoft', code: 'AZ-104', name: 'Microsoft Azure Administrator',
    questions: 120, minutes: 120, access: 'Instant', validity: '90 Days Access',
    tags: ['POPULAR'], rating: 4.8, enrolled: '3,400+', price: 'INR 799', mrp: 'INR 1,499',
    techs: ['Microsoft Azure'],
  },
  {
    id: 2, vendor: 'Microsoft', code: 'AI-102', name: 'Designing and Implementing a Microsoft Azure AI Solution',
    questions: 90, minutes: 100, access: '24-Hour', validity: '90 Days Access',
    tags: [], rating: 4.7, enrolled: '1,120+', price: 'INR 699', mrp: 'INR 1,299',
    techs: ['Artificial Intelligence (AI)', 'Microsoft Azure'],
  },
  {
    id: 3, vendor: 'Microsoft', code: 'PL-300', name: 'Microsoft Power BI Data Analyst',
    questions: 75, minutes: 90, access: 'Instant', validity: '90 Days Access',
    tags: ['POPULAR'], rating: 4.9, enrolled: '4,900+', price: 'INR 499', mrp: 'INR 999',
    techs: ['Data Management & Analytics'],
  },
  {
    id: 4, vendor: 'Microsoft', code: 'SC-300', name: 'Microsoft Identity and Access Administrator',
    questions: 85, minutes: 100, access: '24-Hour', validity: '90 Days Access',
    tags: [], rating: 4.6, enrolled: '980+', price: 'INR 699', mrp: 'INR 1,299',
    techs: ['Identity and Access Management (IAM)'],
  },
  {
    id: 5, vendor: 'AWS', code: 'CLF-C02', name: 'AWS Certified Cloud Practitioner',
    questions: 65, minutes: 90, access: 'Instant', validity: '90 Days Access',
    tags: ['POPULAR'], rating: 4.9, enrolled: '6,200+', price: 'INR 499', mrp: 'INR 999',
    techs: ['AWS Cloud'],
  },
  {
    id: 6, vendor: 'AWS', code: 'SAA-C03', name: 'AWS Certified Solutions Architect – Associate',
    questions: 130, minutes: 130, access: 'Instant', validity: '90 Days Access',
    tags: ['POPULAR'], rating: 4.9, enrolled: '5,100+', price: 'INR 899', mrp: 'INR 1,599',
    techs: ['AWS Cloud'],
  },
  {
    id: 7, vendor: 'Cisco', code: '200-301', name: 'Implementing and Administering Cisco Solutions (CCNA)',
    questions: 110, minutes: 120, access: '24-Hour', validity: '90 Days Access',
    tags: ['POPULAR'], rating: 4.8, enrolled: '3,800+', price: 'INR 799', mrp: 'INR 1,399',
    techs: ['CCNA'],
  },
  {
    id: 8, vendor: 'CompTIA', code: 'SY0-701', name: 'CompTIA Security+',
    questions: 90, minutes: 90, access: 'Instant', validity: '90 Days Access',
    tags: ['POPULAR'], rating: 4.8, enrolled: '4,300+', price: 'INR 599', mrp: 'INR 1,099',
    techs: ['Cyber Security'],
  },
  {
    id: 9, vendor: 'PMI', code: 'PMP', name: 'Project Management Professional (PMP)',
    questions: 180, minutes: 230, access: '24-Hour', validity: '180 Days Access',
    tags: ['POPULAR'], rating: 4.9, enrolled: '5,700+', price: 'INR 999', mrp: 'INR 1,799',
    techs: ['Project Management'],
  },
  {
    id: 10, vendor: 'EC-Council', code: 'CEH v13', name: 'Certified Ethical Hacker',
    questions: 125, minutes: 240, access: 'Instant', validity: '90 Days Access',
    tags: ['POPULAR'], rating: 4.8, enrolled: '2,900+', price: 'INR 899', mrp: 'INR 1,599',
    techs: ['Ethical Hacking and Penetration Testing', 'Cyber Security'],
  },
  {
    id: 11, vendor: 'Oracle', code: '1Z0-1085', name: 'Oracle Cloud Infrastructure Foundations',
    questions: 55, minutes: 75, access: '24-Hour', validity: '90 Days Access',
    tags: [], rating: 4.6, enrolled: '740+', price: 'INR 499', mrp: 'INR 899',
    techs: ['Oracle Cloud'],
  },
  {
    id: 12, vendor: 'Red Hat', code: 'EX200', name: 'Red Hat Certified System Administrator (RHCSA)',
    questions: 60, minutes: 100, access: '24-Hour', validity: '90 Days Access',
    tags: [], rating: 4.7, enrolled: '1,050+', price: 'INR 699', mrp: 'INR 1,299',
    techs: ['Linux'],
  },
  {
    id: 13, vendor: 'PECB', code: 'ISO-27001-LI', name: 'ISO/IEC 27001 Lead Implementer',
    questions: 100, minutes: 150, access: '24-Hour', validity: '180 Days Access',
    tags: [], rating: 4.7, enrolled: '620+', price: 'INR 899', mrp: 'INR 1,599',
    techs: ['ISO', 'Cyber Security'],
  },
  {
    id: 14, vendor: 'Microsoft', code: 'DP-700', name: 'Microsoft Fabric Data Engineer',
    questions: 80, minutes: 100, access: 'Instant', validity: '90 Days Access',
    tags: [], rating: 4.7, enrolled: '860+', price: 'INR 699', mrp: 'INR 1,299',
    techs: ['Microsoft Fabric'],
  },
  {
    id: 15, vendor: 'AWS', code: 'DVA-C02', name: 'AWS Certified Developer – Associate',
    questions: 110, minutes: 130, access: 'Instant', validity: '90 Days Access',
    tags: [], rating: 4.8, enrolled: '2,100+', price: 'INR 799', mrp: 'INR 1,399',
    techs: ['AWS Cloud'],
  },
]

const VENDORS = ['Microsoft', 'AWS', 'Cisco', 'CompTIA', 'PMI', 'EC-Council', 'Oracle', 'Red Hat', 'PECB']

const UNLIMITED_PLAN_PRICE = 'INR 7,499'

const _TECH_PALETTE = [
  { bg: '#E3F2FD', color: '#0078d4' }, { bg: '#E8F5E9', color: '#2e7d32' },
  { bg: '#FFF3E0', color: '#e65100' }, { bg: '#FCE4EC', color: '#c2185b' },
  { bg: '#EDE7F6', color: '#7c3aed' }, { bg: '#E0F7FA', color: '#1ba0d7' },
  { bg: '#FFF8E1', color: '#d97706' }, { bg: '#ECEFF1', color: '#475569' },
  { bg: '#E8EAF6', color: '#3949ab' }, { bg: '#E0F2F1', color: '#00695c' },
]
const ALL_TECH_NAMES = Array.from(new Set(QUBIT_COURSES.flatMap(c => c.techs)))
const SIDEBAR_TECHNOLOGIES = [
  { name: 'All', label: 'All Courses', count: QUBIT_COURSES.length, bg: '#EBF8FE', color: '#0694D1' },
  ...ALL_TECH_NAMES.map((t, i) => ({
    name: t, label: t, count: QUBIT_COURSES.filter(c => c.techs.includes(t)).length,
    bg: _TECH_PALETTE[i % _TECH_PALETTE.length].bg, color: _TECH_PALETTE[i % _TECH_PALETTE.length].color,
  })),
]

const KEY_FEATURES = [
  {
    title: 'Monitor Your Learning Progress.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>,
  },
  {
    title: 'Gain Instant Access to Select Courses.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z"/>,
  },
  {
    title: 'Earn Certificate of Completion.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>,
  },
  {
    title: 'Enhance Your Exam Readiness.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>,
  },
]

const ACCESS_NOTES = [
  'Courses marked "Instant" are accessible immediately after purchase.',
  'You will receive an email with login details to the LET portal to access Qubits — other courses would take 24 hrs for access.',
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Pick Your Practice Test', desc: 'Browse 100+ vendor practice tests across Microsoft, AWS, Cisco, PMI and more. Filter by technology or search by exam code.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/> },
  { step: '02', title: 'Instant or 24-Hour Access', desc: 'Courses marked Instant unlock immediately after payment. All others arrive via email with your LET portal login within 24 hours.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z"/> },
  { step: '03', title: 'Practice Real Exam Questions', desc: 'Attempt scenario-based questions built to mirror the actual certification exam’s format and difficulty.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/> },
  { step: '04', title: 'Track Scores & Earn Your Certificate', desc: 'Review section-wise performance, retake unlimited times, and download your Certificate of Completion.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
]

const QUBITS_TESTIMONIALS = [
  { name: 'Adham Al Mayasi',           role: 'IT Manager, Oman',                  course: 'AZ-104 Practice Test',
    quote: 'Qubits\' Instant Access meant I could start practicing the moment I paid. The questions mirrored the real AZ-104 exam so closely that the actual test felt like a formality.',
    initials: 'AA', avatarBg: 'linear-gradient(135deg,#076D9D,#4DBFEF)', avatar: '/images/headshots/headshot-1.webp' },
  { name: 'Emmanuel Masabo',            role: 'Network Engineer, Rwanda',           course: 'CCNA Practice Test',
    quote: 'Unlimited attempts made all the difference. I kept retaking the CCNA practice test until my score was consistently above 90%, then walked into the real exam with total confidence.',
    initials: 'EM', avatarBg: 'linear-gradient(135deg,#093148,#076D9D)', avatar: '/images/headshots/headshot-4.png' },
  { name: 'Yoosuf Nizam',              role: 'Cloud Architect, Maldives',          course: 'SAA-C03 Practice Test',
    quote: 'The score breakdown after every attempt showed exactly which domains I was weak in. That targeted feedback is what got me from a 60% to a 92% in under two weeks.',
    initials: 'YN', avatarBg: 'linear-gradient(135deg,#F47920,#f6a05c)', avatar: '/images/headshots/headshot-3.webp' },
  { name: 'Anacleto Francisco da Rosa', role: 'IT Consultant, Angola',              course: 'CEH v13 Practice Test',
    quote: 'Getting the LET portal login within 24 hours was exactly as promised. The certificate of completion was a nice bonus I could show my manager before I even sat the real exam.',
    initials: 'AF', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)', avatar: '/images/headshots/headshot-2.webp' },
  { name: 'David Muriuki',              role: 'Security Engineer, Kenya',           course: 'SY0-701 Practice Test',
    quote: 'The Security+ practice test questions were scenario-based, not just definitions — exactly what the real exam throws at you. Best prep investment I made this year.',
    initials: 'DM', avatarBg: 'linear-gradient(135deg,#34A853,#076D9D)', avatar: '/images/headshots/headshot-5.webp' },
  { name: 'Fredrick Fiifi Arthur',      role: 'Data Analyst, Ghana',               course: 'PL-300 Practice Test',
    quote: 'I practice on my phone during my commute and on the LET portal at home — Qubits worked seamlessly across both. Passed PL-300 on the first attempt.',
    initials: 'FA', avatarBg: 'linear-gradient(135deg,#F2C811,#0694d1)', avatar: '/images/headshots/headshot-1.webp' },
  { name: 'Amjaad Kushar',              role: 'IT Professional, Saudi Arabia',      course: 'PMP Practice Test',
    quote: '180 questions, real exam timing, unlimited retakes — the PMP practice test on Qubits was the closest thing to sitting the actual PMI exam. I would recommend it to anyone prepping.',
    initials: 'AK', avatarBg: 'linear-gradient(135deg,#093148,#F47920)', avatar: '/images/headshots/headshot-4.png' },
  { name: 'Monica Kalamula',            role: 'Systems Administrator, Malawi',      course: 'EX200 Practice Test',
    quote: 'The RHCSA practice test flagged exactly the command-line topics I was shaky on. Focused revision on those areas alone got me exam-ready in half the time I expected.',
    initials: 'MK', avatarBg: 'linear-gradient(135deg,#476D8D,#0694D1)', avatar: '/images/headshots/headshot-2.webp' },
  { name: 'Emanuel Bento Mahina',       role: 'Security Specialist, Angola',        course: 'ISO 27001 Practice Test',
    quote: 'Support was quick to help when I had a login issue with the LET portal. Once in, the ISO 27001 practice test questions were detailed and genuinely exam-representative.',
    initials: 'EB', avatarBg: 'linear-gradient(135deg,#c8102e,#f47920)', avatar: '/images/headshots/headshot-3.webp' },
]

const FAQS = [
  { q: 'What is Qubits?', a: 'Qubits is Koenig’s interactive testing engine that lets you practice real exam-style questions for 100+ certifications, track your progress, and build exam-day confidence before you sit the official test.' },
  { q: 'What does "Instant" access mean?', a: 'Courses marked Instant unlock immediately after your payment is confirmed — no waiting. For all other courses, your login details for the LET (Learning Enablement Tool) portal are emailed within 24 hours of purchase.' },
  { q: 'How is the LET portal login shared for non-Instant courses?', a: 'For courses without the Instant badge, your LET (Learning Enablement Tool) portal login is sent to your registered email within 24 hours of purchase — no manual request needed.' },
  { q: 'How many times can I attempt a practice test?', a: 'Most Qubits practice tests allow unlimited attempts within your access validity window, so you can keep practicing until you’re confident.' },
  { q: 'Do I get a certificate after completing a Qubits test?', a: 'Yes. Once you cross the pass threshold on a practice test, you can download a Certificate of Completion directly from your LET portal dashboard.' },
  { q: 'Is Qubits the same as the official certification exam?', a: 'No. Qubits is a practice and preparation tool designed to mirror the format and difficulty of the real vendor exam — it does not replace or count towards your official certification.' },
  { q: 'Can I access Qubits on mobile?', a: 'Yes. Qubits is available on both the Koenig mobile app (iOS and Android) and the web-based LET portal at mykoenig.com.' },
  { q: 'Who do I contact if I face login or access issues?', a: 'Reach our support team at info@koenig-solutions.com or WhatsApp us at +91-984-072-2417 for quick help with login, access, or billing issues.' },
]

const HEAR_OPTIONS = [
  'Organic Search (Google/Bing/Yahoo)', 'Paid Search Ads (Google Ads, Bing Ads)',
  'Webinars', 'Email Outreach', 'LinkedIn', 'Social Media (Facebook, Instagram, X)',
  'YouTube', 'Trustpilot', 'Word of Mouth', 'Existing customer referral',
  'Press release', 'Other',
]

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Bahrain','Bangladesh',
  'Belgium','Brazil','Canada','Chile','China','Colombia','Croatia','Czech Republic','Denmark',
  'Egypt','Ethiopia','Finland','France','Germany','Ghana','Greece','Hong Kong','Hungary',
  'India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Japan','Jordan','Kazakhstan',
  'Kenya','Kuwait','Lebanon','Malaysia','Mexico','Morocco','Netherlands','New Zealand',
  'Nigeria','Norway','Oman','Pakistan','Peru','Philippines','Poland','Portugal','Qatar',
  'Romania','Russia','Saudi Arabia','Singapore','South Africa','South Korea','Spain','Sri Lanka',
  'Sweden','Switzerland','Taiwan','Thailand','Turkey','Ukraine','United Arab Emirates',
  'United Kingdom','United States','Venezuela','Vietnam','Zimbabwe',
]

/* ── Tech icon helper ────────────────────────────────────────── */
function getTechIcon(name: string) {
  const n = name.toLowerCase()
  const p = { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (name === 'All') return <svg {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
  if (/\b(aws)\b|azure|gcp|google cloud|cloud native/.test(n) || n === 'cloud') return <svg {...p}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
  if (/identity|iam|active directory/.test(n)) return <svg {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  if (/security|cyber|hacking|penetration|firewall/.test(n)) return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  if (/artificial intelligence|\bai\b|machine learning/.test(n)) return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/></svg>
  if (/\bdata\b|analytics|fabric|management & analytics/.test(n)) return <svg {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  if (/network|ccna|routing|switching/.test(n)) return <svg {...p}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
  if (/project management|agile|scrum|pmp/.test(n)) return <svg {...p}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
  if (/linux|red hat|rhel/.test(n)) return <svg {...p}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
  if (/\biso\b|governance|compliance|lead implementer/.test(n)) return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
  return <svg {...p}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
}

/* ── FilterDropdown ──────────────────────────────────────────── */
function FilterDropdown({
  label, options, value, onChange, fullWidth, inputType = 'radio', values, onMultiChange,
}: {
  label: string; options: string[]; value: string; onChange: (v: string) => void; fullWidth?: boolean;
  inputType?: 'radio' | 'checkbox'; values?: string[]; onMultiChange?: (vals: string[]) => void;
}) {
  const [open, setOpen]   = useState(false)
  const [query, setQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const ref      = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      function handle(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
      }
      document.addEventListener('mousedown', handle)
      return () => document.removeEventListener('mousedown', handle)
    }
  }, [isMobile])

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 80) }, [open])

  const isChecked = (o: string) => inputType === 'checkbox' ? (values ?? []).includes(o) : value === o
  const activeCount = inputType === 'checkbox' ? (values ?? []).length : (value && value !== label ? 1 : 0)
  const displayed = inputType === 'checkbox'
    ? label
    : (value && value !== label ? value : label)
  const filtered  = options.filter(o => o.toLowerCase().includes(query.toLowerCase()))
  const hasValue  = activeCount > 0

  const handleSelect = (o: string) => {
    if (inputType === 'checkbox') {
      const cur = values ?? []
      const next = cur.includes(o) ? cur.filter(v => v !== o) : [...cur, o]
      onMultiChange?.(next)
    } else {
      onChange(o)
      setOpen(false)
      setQuery('')
    }
  }

  const handleClear = () => {
    if (inputType === 'checkbox') { onMultiChange?.([]); }
    else { onChange(''); }
    setQuery('')
  }

  const triggerBtn = (
    <button
      onClick={() => setOpen(p => !p)}
      className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all ${fullWidth ? 'w-full justify-between' : ''}`}
      style={{
        border:     `1px solid ${hasValue ? '#0694D1' : '#CAEFFF'}`,
        background: 'white',
        color:      hasValue ? '#0694D1' : '#475569',
        boxShadow:  '0 1px 4px rgba(6,148,209,0.06)',
      }}>
      <span className="max-w-[120px] truncate">{displayed}</span>
      {inputType === 'checkbox' && activeCount > 0 && (
        <span style={{ minWidth: 18, height: 18, borderRadius: 999, background: '#0694D1', color: '#fff', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px', flexShrink: 0 }}>
          {activeCount}
        </span>
      )}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: '#94A3B8' }}>
        <path d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
  )

  const mobileSheet = open && isMobile && typeof document !== 'undefined' && createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={() => { setOpen(false); setQuery('') }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(6,18,30,0.55)', backdropFilter: 'blur(2px)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: '20px 20px 0 0', padding: '0 0 0', maxHeight: '75vh', display: 'flex', flexDirection: 'column', boxShadow: '0 -8px 40px rgba(6,148,209,0.18)' }}>
        <div style={{ padding: '12px 20px 0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ width: 36, height: 4, borderRadius: 999, background: '#CBD5E1', margin: '5px auto 0' }} />
            <button onClick={() => { setOpen(false); setQuery('') }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#94A3B8', lineHeight: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#0694D1' }}>{label}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8FBFF', border: '1px solid #CAEFFF', borderRadius: 10, padding: '8px 12px', marginBottom: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search…" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, fontWeight: 400, color: '#0F172A', WebkitAppearance: 'none' }} />
          </div>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: '4px 12px' }}>
          {filtered.map(o => {
            const checked = isChecked(o)
            return (
              <button key={o} onClick={() => handleSelect(o)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', padding: '10px 8px', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 400, color: checked ? '#0694D1' : '#374151', background: checked ? 'rgba(6,148,209,0.06)' : 'transparent', marginBottom: 1 }}>
                {inputType === 'radio' ? (
                  <span style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${checked ? '#0694D1' : '#CBD5E1'}`, background: checked ? '#0694D1' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {checked && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'block' }} />}
                  </span>
                ) : (
                  <span style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${checked ? '#0694D1' : '#CBD5E1'}`, background: checked ? '#0694D1' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {checked && <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="1.5,6 4.5,9 10.5,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </span>
                )}
                {o}
              </button>
            )
          })}
          {filtered.length === 0 && (
            <p style={{ padding: '12px 8px', fontSize: 12, color: '#94A3B8' }}>No results</p>
          )}
        </div>
        <div style={{ flexShrink: 0, padding: '12px 16px 32px', borderTop: '1px solid #EBF8FE', display: 'flex', gap: 10 }}>
          <button onClick={handleClear}
            style={{ flex: 1, padding: '11px', borderRadius: 12, background: 'transparent', border: '1.5px solid #CAEFFF', color: '#64748B', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            Clear
          </button>
          <button onClick={() => { setOpen(false); setQuery('') }}
            style={{ flex: 2, padding: '11px', borderRadius: 12, background: 'linear-gradient(135deg,#0694D1,#076D9D)', border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            Apply{activeCount > 0 ? ` (${activeCount})` : ''}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )

  return (
    <div ref={ref} className={`relative ${fullWidth ? 'w-full' : 'shrink-0'}`}>
      {triggerBtn}
      {open && !isMobile && (
        <div className="absolute left-0 top-full mt-1.5 z-50 rounded-2xl overflow-hidden"
          style={{ width: fullWidth ? '100%' : undefined, minWidth: fullWidth ? undefined : '290px', maxWidth: 'min(290px, calc(100vw - 2rem))', background: 'white', border: '1px solid #CAEFFF', boxShadow: '0 8px 32px rgba(6,148,209,0.16)' }}>
          <div className="p-2 border-b" style={{ borderColor: '#EBF8FE' }}>
            <div className="flex items-center gap-2 rounded-lg px-3 py-1.5" style={{ background: '#F8FBFF', border: '1px solid #CAEFFF' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search…" className="flex-1 bg-transparent text-xs outline-none" style={{ color: '#0F172A' }} />
            </div>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
            {filtered.map(o => (
              <button key={o} onClick={() => { onChange(o); setOpen(false); setQuery('') }}
                className="w-full px-4 py-2 text-left transition-colors hover:bg-[#F0FAFF]"
                style={{ fontSize: 12, color: value === o ? '#0694D1' : '#374151', fontWeight: value === o ? 700 : 400 }}>
                {o}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-4 py-3 text-xs" style={{ color: '#94A3B8' }}>No results</p>
            )}
          </div>
        </div>
      )}
      {mobileSheet}
    </div>
  )
}

/* ── Download Syllabus modal ─────────────────────────────────── */
function SampleModal({ courseName, onClose }: { courseName: string; onClose: () => void }) {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [country, setCountry]   = useState('')
  const [countryOpen, setCountryOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const countryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCountryOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const inp: React.CSSProperties = { width: '100%', boxSizing: 'border-box', background: 'rgba(6,148,209,0.08)', border: '1.5px solid rgba(6,148,209,0.3)', borderRadius: 10, padding: '11px 14px', fontSize: 13.5, color: '#fff', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s' }
  const lbl: React.CSSProperties = { fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: 5, display: 'block' }

  return (
    <>
      <style>{`@keyframes qbSlideIn{from{opacity:0;transform:translate(-50%,-54%)}to{opacity:1;transform:translate(-50%,-50%)}}`}</style>
      <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(5px)' }}
        onClick={e => { if (e.target === e.currentTarget) onClose() }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 2001, width: 'calc(100vw - 32px)', maxWidth: 440, background: 'linear-gradient(160deg,#062238 0%,#093148 100%)', borderRadius: 20, padding: '32px 28px 28px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', fontFamily: 'inherit', animation: 'qbSlideIn 0.3s cubic-bezier(0.25,1,0.5,1)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '12px 0 4px' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(6,148,209,0.15)', border: '1.5px solid rgba(6,148,209,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.25 }}>You&apos;re all set, {name.split(' ')[0]}!</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 20 }}>
              The syllabus for <strong style={{ color: '#0694D1' }}>{courseName || 'this course'}</strong> will be sent to <strong style={{ color: '#fff' }}>{email}</strong> shortly.
            </div>
            <div style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Check your inbox — usually arrives within 2 minutes
            </div>
            <button onClick={onClose} style={{ width: '100%', padding: 11, borderRadius: 10, border: '1px solid rgba(6,148,209,0.35)', background: 'transparent', color: '#0694D1', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0694D1', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, color: '#0694D1', textTransform: 'uppercase' }}>Download Syllabus</span>
            </div>
            {courseName && (
              <div style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 14px', marginBottom: 18, background: 'rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: 5 }}>Practice Test</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0694D1', lineHeight: 1.4 }}>{courseName}</div>
              </div>
            )}
            <div style={{ marginBottom: 6 }}><div style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Get the Course Content</div></div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 22 }}>Fill in your details and we&apos;ll send it straight to your inbox.</div>

            <form onSubmit={e => { e.preventDefault(); if (!country) return; setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={lbl}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input required placeholder="John" value={name} onChange={e => setName(e.target.value)} style={inp}
                  onFocus={e => (e.target.style.borderColor = '#0694D1')} onBlur={e => (e.target.style.borderColor = 'rgba(6,148,209,0.3)')} />
              </div>
              <div>
                <label style={lbl}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                <input required type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} style={inp}
                  onFocus={e => (e.target.style.borderColor = '#0694D1')} onBlur={e => (e.target.style.borderColor = 'rgba(6,148,209,0.3)')} />
              </div>
              <div>
                <label style={lbl}>Country <span style={{ color: '#ef4444' }}>*</span></label>
                <div ref={countryRef} style={{ position: 'relative' }}>
                  <button type="button" onClick={() => setCountryOpen(o => !o)}
                    style={{ width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,148,209,0.08)', border: `1.5px solid ${countryOpen ? '#0694D1' : 'rgba(6,148,209,0.3)'}`, borderRadius: 10, padding: '11px 14px', fontSize: 13.5, color: country ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer', fontFamily: 'inherit', outline: 'none' }}>
                    {country || 'Select your country'}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: countryOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {countryOpen && (
                    <div style={{ position: 'absolute', bottom: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 10000, background: '#0d2535', border: '1.5px solid rgba(6,148,209,0.35)', borderRadius: 10, maxHeight: 300, overflowY: 'auto', overscrollBehavior: 'contain', boxShadow: '0 -8px 32px rgba(0,0,0,0.6)' }}>
                      {COUNTRIES.map(c => (
                        <div key={c} onClick={() => { setCountry(c); setCountryOpen(false) }}
                          style={{ padding: '9px 14px', fontSize: 13.5, cursor: 'pointer', color: country === c ? '#fff' : '#c8dce9', background: country === c ? '#1a5fa8' : 'transparent' }}>
                          {c}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button type="submit" onClick={e => { if (!country) { e.preventDefault(); setCountryOpen(true) } }}
                style={{ width: '100%', padding: 13, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#0694D1,#0577ab)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', letterSpacing: 0.2, boxShadow: '0 4px 18px rgba(6,148,209,0.4)', marginTop: 2 }}>
                Send Course Content →
              </button>
              <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>No spam, ever. Unsubscribe anytime.</div>
            </form>
          </>
        )}
      </div>
    </>
  )
}

/* ── InquiryForm ─────────────────────────────────────────────── */
function InquiryForm({ formType, setFormType }: { formType: 'individual' | 'enterprise'; setFormType: (t: 'individual' | 'enterprise') => void }) {
  const inputCls = 'w-full rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-white/35 transition-colors'
  const inputSty = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'white' }
  const selectSty = { background: '#0b1c2e', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.55)' }
  const optSty = { background: '#0b1c2e' }
  return (
    <>
      <div className="flex gap-3 mb-5">
        <a href="https://wa.me/919840722417" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'white', background: 'rgba(255,255,255,0.06)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp us
        </a>
        <a href="mailto:info@koenig-solutions.com" className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'white', background: 'rgba(255,255,255,0.06)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          Email us
        </a>
      </div>
      <div className="flex rounded-xl p-1 mb-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {(['individual', 'enterprise'] as const).map(t => (
          <button key={t} type="button" onClick={() => setFormType(t)}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all"
            style={formType === t ? { background: 'linear-gradient(135deg, #0694D1, #00B4D8)', color: 'white', boxShadow: '0 2px 12px rgba(6,148,209,0.40)' } : { color: 'rgba(255,255,255,0.45)', background: 'transparent' }}>
            {t === 'individual'
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>}
            {t === 'individual' ? 'Individual' : 'Enterprise'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div><label className="block text-xs font-semibold mb-1.5 text-white">Full Name <span className="text-red-400">*</span></label><input className={inputCls} style={inputSty} placeholder="John Smith" /></div>
        <div><label className="block text-xs font-semibold mb-1.5 text-white">{formType === 'enterprise' ? 'Business Email' : 'Email'} <span className="text-red-400">*</span></label><input className={inputCls} style={inputSty} type="email" placeholder={formType === 'enterprise' ? 'john@company.com' : 'john@example.com'} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div><label className="block text-xs font-semibold mb-1.5 text-white">Phone</label><input className={inputCls} style={inputSty} type="tel" placeholder="+1 (555) 000-0000" /></div>
        <div>{formType === 'enterprise' ? (<><label className="block text-xs font-semibold mb-1.5 text-white">Number of Trainees</label><input className={inputCls} style={inputSty} placeholder="e.g. 25" /></>) : (<><label className="block text-xs font-semibold mb-1.5 text-white">Select Practice Test</label><select className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={selectSty}><option value="" style={optSty}>Select Practice Test</option>{QUBIT_COURSES.map(c => <option key={c.id} value={c.id} style={optSty}>{c.code}: {c.name}</option>)}</select></>)}</div>
      </div>
      <div className="mb-3"><label className="block text-xs font-semibold mb-1.5 text-white">How did you hear about us?</label><select className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={selectSty}><option value="" style={optSty}>Select Option</option>{HEAR_OPTIONS.map(o => <option key={o} style={optSty}>{o}</option>)}</select></div>
      <div className="mb-5"><label className="block text-xs font-semibold mb-1.5 text-white">Tell us more about your Training Request</label><textarea className={`${inputCls} resize-none`} style={inputSty} rows={4} placeholder="e.g. We need Azure certification training in Dubai for 20 engineers..." /></div>
      <div className="flex justify-center mb-5">
        <div className="inline-flex items-center gap-3 rounded-xl px-5 py-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#0694D1' }} />
          <span className="text-sm text-white">I&apos;m not a robot</span>
          <div className="ml-4 text-right"><p className="text-[9px] font-bold" style={{ color: '#4A90D9' }}>reCAPTCHA</p><p className="text-[8px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Privacy · Terms</p></div>
        </div>
      </div>
      <button type="button" className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #0694D1, #00B4D8)', boxShadow: '0 4px 20px rgba(6,148,209,0.40)' }}>Submit</button>
    </>
  )
}

/* ── Practice test card (visual language borrowed from Classroom Training's CourseCard) ── */
function QubitCard({ course, onSample }: { course: typeof QUBIT_COURSES[0]; onSample: () => void }) {
  const [feesOpen, setFeesOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'one' | 'unlimited'>('one')
  const isPopular = (course.tags ?? []).includes('POPULAR')
  const isInstant = course.access === 'Instant'
  const selectedPrice = selectedPlan === 'one' ? course.price : UNLIMITED_PLAN_PRICE
  const priceNum = parseInt(selectedPrice.replace(/[^0-9]/g, ''), 10)
  const gstNum = Math.round(priceNum * 0.18)
  const totalNum = priceNum + gstNum

  return (
    <>
      {feesOpen && typeof document !== 'undefined' && createPortal(
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }} onClick={() => setFeesOpen(false)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 9999, width: 'calc(100vw - 32px)', maxWidth: 340, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.22)' }}>
            <div style={{ background: '#071e2e', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff' }}>Fees Breakdown</span>
              <button onClick={() => setFeesOpen(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 700 }}>✕</button>
            </div>
            <div style={{ padding: '4px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #f0f4f8' }}>
                <div>
                  <div style={{ color: '#4a6a8a' }}>{selectedPlan === 'one' ? 'One-Course Plan' : 'Unlimited Plan (For One Year)'}</div>
                  <div style={{ fontSize: 11, color: '#8a9db5', marginTop: 2 }}>{isInstant ? 'Instant Access' : '24-Hour Access'}</div>
                </div>
                <span style={{ fontWeight: 600, color: '#071e2e', flexShrink: 0 }}>INR {priceNum.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #e8f4fa' }}>
                <span style={{ color: '#4a6a8a' }}>+ GST 18%</span>
                <span style={{ fontWeight: 600, color: '#071e2e' }}>INR {gstNum.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: 14, background: '#f8fcff' }}>
                <span style={{ fontWeight: 700, color: '#071e2e' }}>Total (INR)</span>
                <span style={{ fontWeight: 700, color: '#071e2e' }}>INR {totalNum.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '10px 16px 14px', borderTop: '1px solid #e8f4fa' }}>
              <button onClick={() => setFeesOpen(false)} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#0694D1', textDecoration: 'underline', cursor: 'pointer' }}>Hide Breakdown</button>
            </div>
          </div>
        </>,
        document.body
      )}
    <div className="flex flex-col rounded-2xl overflow-hidden relative group/card transition-all duration-300 hover:-translate-y-1"
      style={{ background: 'white', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(6,148,209,0.18)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#CAEFFF' }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#E2E8F0' }}>

      {isPopular && (
        <span className="absolute" style={{ top: 0, right: 0, display: 'inline-flex', alignItems: 'center', gap: 4, height: 20, fontSize: 9, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', padding: '0 10px 0 8px', borderRadius: '0 14px 0 10px', background: 'linear-gradient(135deg,#0694D1,#22d3ee)', color: '#fff', boxShadow: '-2px 2px 8px rgba(6,148,209,0.28)', zIndex: 2 }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c0 0-5.5 6-5.5 10.5a5.5 5.5 0 0 0 11 0C17.5 8 12 2 12 2z"/></svg>
          Popular
        </span>
      )}

      {/* Card header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ flex: 1 }}>
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: '#EBF8FE', color: '#0694D1' }}>{course.vendor}</span>
        </div>
        <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
          style={{ background: '#DCFCE7', color: '#15803D' }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Instant
        </span>
        <div style={{ flex: 1 }} />
      </div>
      <div className="px-4 pt-3">
        <h3 className="text-sm font-bold leading-snug" style={{ color: '#0F172A' }}>
          {course.code}: {course.name}
        </h3>
        <div className="flex items-center justify-center mt-2.5">
          <button onClick={onSample}
            className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
            style={{ border: '1px solid #0694D1', color: '#0694D1', background: 'transparent' }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Syllabus
          </button>
        </div>
        <div className="flex items-center justify-center gap-1 text-[11px] font-semibold mt-1.5" style={{ color: '#475569' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          No. of Questions: {course.questions}
        </div>
      </div>

      {/* Plan selection */}
      <div className="px-4 py-3 flex flex-col gap-2">
        <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: '#94A3B8' }}>Select a Plan</p>

        <label className="flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2.5 transition-colors"
          style={selectedPlan === 'one'
            ? { border: '1.5px solid #0694D1', background: 'rgba(6,148,209,0.08)', boxShadow: '0 0 0 1px rgba(6,148,209,0.25)' }
            : { border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
              style={selectedPlan === 'one' ? { background: '#0694D1' } : { border: '1.5px solid #CBD5E1' }}>
              {selectedPlan === 'one' && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
            <span className="text-xs font-semibold" style={{ color: selectedPlan === 'one' ? '#0694D1' : '#374151' }}>One-Course Plan</span>
          </div>
          <span className="text-right shrink-0">
            <span className="block text-xs font-bold" style={{ color: '#093148' }}>{course.price}</span>
            <span className="block text-[9.5px] leading-tight" style={{ color: '#94A3B8' }}>excl. VAT/GST</span>
          </span>
          <input type="radio" name={`plan-${course.id}`} className="sr-only" checked={selectedPlan === 'one'} onChange={() => setSelectedPlan('one')} />
        </label>

        <label className="flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2.5 transition-colors"
          style={selectedPlan === 'unlimited'
            ? { border: '1.5px solid #0694D1', background: 'rgba(6,148,209,0.08)', boxShadow: '0 0 0 1px rgba(6,148,209,0.25)' }
            : { border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
              style={selectedPlan === 'unlimited' ? { background: '#0694D1' } : { border: '1.5px solid #CBD5E1' }}>
              {selectedPlan === 'unlimited' && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
            <span className="text-xs font-semibold leading-tight" style={{ color: selectedPlan === 'unlimited' ? '#0694D1' : '#374151' }}>Unlimited Plan<br /><span className="font-normal">(For One Year)</span></span>
          </div>
          <span className="text-right shrink-0">
            <span className="block text-xs font-bold" style={{ color: '#093148' }}>{UNLIMITED_PLAN_PRICE}</span>
            <span className="block text-[9.5px] leading-tight" style={{ color: '#94A3B8' }}>excl. VAT/GST</span>
          </span>
          <input type="radio" name={`plan-${course.id}`} className="sr-only" checked={selectedPlan === 'unlimited'} onChange={() => setSelectedPlan('unlimited')} />
        </label>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1.5">
            <span style={{ color: '#F59E0B', fontSize: 11 }}>★</span>
            <span className="text-[11px] font-semibold" style={{ color: '#64748B' }}>{course.rating}</span>
            <span style={{ color: '#CBD5E1', fontSize: 10 }}>·</span>
            <span className="text-[11px] font-semibold" style={{ color: '#64748B' }}>{course.enrolled} purchased</span>
          </div>
          <button onClick={() => setFeesOpen(true)} className="text-[10px] font-semibold hover:underline cursor-pointer" style={{ color: '#0694D1' }}>
            View Fees Breakdown
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 px-4 pb-4 mt-auto">
        <button className="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all cursor-pointer"
          style={{ border: '1.5px solid #093148', color: '#093148', background: 'transparent' }}>
          View Course
        </button>
        <button className="flex-1 rounded-lg py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #093148, #076D9D)' }}>
          Buy Now
        </button>
      </div>
    </div>
    </>
  )
}

/* ── Testimonials Column (desktop, CSS keyframe vertical scroll) ── */
function QbTestimonialsColumn({ items, duration = 15, className }: { items: typeof QUBITS_TESTIMONIALS; duration?: number; className?: string }) {
  const doubled = [...items, ...items]
  return (
    <div className={`ilo-test-col-wrap${className ? ' ' + className : ''}`} style={{ overflow: 'hidden' }}>
      <ul className="ilo-test-col-track" style={{ animationDuration: `${duration}s`, listStyle: 'none', margin: 0, padding: 0 }}>
        {doubled.map((t, i) => (
          <li key={i} style={{ width: 280, flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 16, background: '#fff', border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
              <div style={{ flex: 1, padding: '18px 18px 14px' }}>
                <div style={{ marginBottom: 8, fontSize: 13, color: '#FBBF24' }}>★★★★★</div>
                <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.7, color: '#2d4a6a' }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {t.avatar ? (
                    <img decoding="async" src={t.avatar} alt={t.name} loading="lazy"
                      style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #DCEEFB', flexShrink: 0, objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #DCEEFB', flexShrink: 0, background: t.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>
                      {t.initials}
                    </div>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#0d1b2a', lineHeight: 1.3 }}>{t.name}</p>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#0694D1' }}>{t.role}</p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E8F4FA', background: '#F8FCFF', padding: '10px 18px' }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#0d1b2a' }}>{t.course}</p>
                <span style={{ background: '#E8F4FA', color: '#0569a8', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>✓ Verified</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Mobile Testimonial Row (rAF horizontal scroll) ───────────── */
function QbMobileTestimonialRow({ items }: { items: typeof QUBITS_TESTIMONIALS }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const posRef = useRef(0)
  const dragRef = useRef({ active: false, startX: 0, startPos: 0 })
  const rafRef = useRef<number | null>(null)
  const popupOpenRef = useRef(false)
  const [popup, setPopup] = useState<typeof QUBITS_TESTIMONIALS[0] | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const loop = () => {
      if (!dragRef.current.active && !popupOpenRef.current) {
        posRef.current += 0.5
        const half = track.scrollWidth / 2
        if (posRef.current >= half) posRef.current -= half
        track.style.transform = `translateX(-${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const onTouchStart = (e: React.TouchEvent) => {
    dragRef.current = { active: true, startX: e.touches[0].clientX, startPos: posRef.current }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current.active || !trackRef.current) return
    const delta = dragRef.current.startX - e.touches[0].clientX
    const half = trackRef.current.scrollWidth / 2
    posRef.current = ((dragRef.current.startPos + delta) % half + half) % half
    trackRef.current.style.transform = `translateX(-${posRef.current}px)`
  }
  const onTouchEnd = () => { dragRef.current.active = false }

  return (
    <>
      <div className="sm:hidden" style={{ overflow: 'hidden', marginTop: 28 }}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <ul ref={trackRef} style={{ listStyle: 'none', margin: 0, padding: '4px 0', display: 'flex', gap: '16px', width: 'max-content' }}>
          {[...items, ...items].map((t, i) => (
            <li key={i} style={{ width: 280, flexShrink: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 16, background: '#fff', border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
                <div style={{ flex: 1, padding: '18px 18px 14px' }}>
                  <div style={{ marginBottom: 8, fontSize: 13, color: '#FBBF24' }}>★★★★★</div>
                  <p style={{ margin: '0 0 6px', fontSize: 13, lineHeight: 1.7, color: '#2d4a6a', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>&ldquo;{t.quote}&rdquo;</p>
                  <button onClick={e => { e.stopPropagation(); popupOpenRef.current = true; setPopup(t) }}
                    style={{ background: 'none', border: 'none', color: '#0694D1', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', padding: '0 0 12px', display: 'block' }}>
                    Show more →
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {t.avatar ? (
                      <img decoding="async" src={t.avatar} alt={t.name} loading="lazy"
                        style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #DCEEFB', flexShrink: 0, objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #DCEEFB', flexShrink: 0, background: t.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>
                        {t.initials}
                      </div>
                    )}
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#0d1b2a', lineHeight: 1.3 }}>{t.name}</p>
                      <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#0694D1' }}>{t.role}</p>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E8F4FA', background: '#F8FCFF', padding: '10px 18px' }}>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#0d1b2a' }}>{t.course}</p>
                  <span style={{ background: '#E8F4FA', color: '#0569a8', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>✓ Verified</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {popup && typeof document !== 'undefined' && createPortal(
        <div onClick={() => { popupOpenRef.current = false; setPopup(null) }} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(7,30,46,0.70)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: '28px 24px 40px', width: '100%', maxWidth: 480, maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 16, color: '#FBBF24', letterSpacing: 2 }}>★★★★★</span>
              <button onClick={() => { popupOpenRef.current = false; setPopup(null) }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b8299" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#2d4a6a', margin: '0 0 24px' }}>&ldquo;{popup.quote}&rdquo;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              {popup.avatar ? (
                <img decoding="async" loading="lazy" src={popup.avatar} alt={popup.name}
                  style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #DCEEFB', objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <div style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #DCEEFB', flexShrink: 0, background: popup.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff' }}>
                  {popup.initials}
                </div>
              )}
              <div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0d1b2a' }}>{popup.name}</p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#0694D1' }}>{popup.role}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E8F4FA', paddingTop: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0d1b2a' }}>{popup.course}</span>
              <span style={{ background: '#E8F4FA', color: '#0569a8', borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 700 }}>✓ Verified</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

/* ── FAQ accordion item ──────────────────────────────────────── */
function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left">
        <span className="text-base font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#053148', transition: 'color 0.3s' }}>{q}</span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </button>
      <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
        <div style={{ overflow: 'hidden' }}><p className="border-t border-[#EBF8FE] px-6 py-4 text-base leading-relaxed" style={{ color: '#7a8c96' }}>{a}</p></div>
      </div>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function QubitsPage() {
  const [activeVendors, setActiveVendors] = useState<string[]>([])
  const [vendorSearch, setVendorSearch] = useState('')
  const [activeTechs, setActiveTechs] = useState<string[]>([])
  const [techSearch, setTechSearch] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [sampleCourse, setSampleCourse] = useState<string | null>(null)
  const [showFormModal, setShowFormModal] = useState(false)
  const [formType, setFormType] = useState<'individual' | 'enterprise'>('individual')
  const [howSlideIdx, setHowSlideIdx] = useState(0)
  const howTouchStartX = useRef(0)
  const PER_PAGE = 9

  const toggleTech = (t: string) => {
    setActiveTechs(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
    setPage(0)
  }

  const toggleVendor = (v: string) => {
    setActiveVendors(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])
    setPage(0)
  }

  const filtered = QUBIT_COURSES.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.vendor.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    const matchTech = activeTechs.length > 0 ? c.techs.some(t => activeTechs.includes(t)) : true
    const matchVendor = activeVendors.length === 0 || activeVendors.includes(c.vendor)
    return matchSearch && matchTech && matchVendor
  })
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  const activeTechData = activeTechs.length === 1
    ? SIDEBAR_TECHNOLOGIES.find(t => t.name === activeTechs[0]) ?? SIDEBAR_TECHNOLOGIES[0]
    : activeVendors.length === 1
    ? { name: activeVendors[0], label: `${activeVendors[0]} Practice Tests`, count: filtered.length, bg: '#EBF8FE', color: '#0694D1' }
    : activeVendors.length > 1
    ? { name: 'All', label: `${activeVendors.length} Vendors Selected`, count: filtered.length, bg: '#EBF8FE', color: '#0694D1' }
    : SIDEBAR_TECHNOLOGIES[0]
  const bannerDesc = activeTechs.length === 1
    ? `Browse all ${activeTechData.label} Qubits practice tests — Instant or 24-Hour access, unlimited attempts.`
    : activeVendors.length > 0
    ? `Browse all Guaranteed ${activeVendors.join(', ')} Qubits practice tests — Instant or 24-Hour access, unlimited attempts.`
    : 'Browse all Qubits practice tests — Instant or 24-Hour access, unlimited attempts, real exam-format questions.'

  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      {sampleCourse !== null && (
        typeof document !== 'undefined' && createPortal(
          <SampleModal courseName={sampleCourse} onClose={() => setSampleCourse(null)} />,
          document.body
        )
      )}

      {/* ── FORM MODAL ───────────────────────────────────────── */}
      {showFormModal && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto" onClick={() => setShowFormModal(false)}
          style={{ background: 'rgba(4,10,20,0.82)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <div className="relative w-full max-w-2xl rounded-2xl"
              style={{ background: 'linear-gradient(160deg, #091828 0%, #0c1f34 100%)', border: '1px solid rgba(6,148,209,0.25)', boxShadow: '0 32px 80px rgba(0,0,0,0.65)' }}
              onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowFormModal(false)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <div className="px-6 sm:px-8 pt-8 pb-7">
                <div className="flex justify-center mb-4">
                  <span className="rounded-full px-4 py-1 text-xs font-bold tracking-widest" style={{ border: '1px solid rgba(6,148,209,0.55)', color: '#38bdf8' }}>LET&apos;S TALK</span>
                </div>
                <h2 className="text-center font-bold text-white mb-1" style={{ fontSize: 20 }}>Request for more <span style={{ color: '#38bdf8' }}>information</span></h2>
                <p className="text-center text-sm mb-6" style={{ color: 'rgba(255,255,255,0.42)' }}>Qubits Practice Tests with Koenig Solutions</p>
                <InquiryForm formType={formType} setFormType={setFormType} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #061624 0%, #071929 60%, #062236 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-1/3 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: '#0694D1' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: '#38bdf8' }} />
        </div>

        <div className="qb-hero-inner relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="qb-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 40, alignItems: 'center' }}>

            {/* Left — text */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.35)', color: '#38bdf8' }}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                Qubits — Interactive Testing Engine
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white mb-3">
                Master Your Skills with Qubits:<br />
                <span style={{ color: '#38bdf8' }}>Your Premier Interactive Testing Engine</span>
              </h1>
              <p className="text-sm sm:text-base mb-6" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, maxWidth: 560 }}>
                Practice real exam-style questions for 100+ certifications, monitor your progress, and walk into your official exam with confidence.
              </p>

              <ul className="flex flex-col gap-2.5 mb-8">
                {KEY_FEATURES.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(6,148,209,0.18)' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{f.title}</span>
                  </li>
                ))}
                {ACCESS_NOTES.map((n, i) => (
                  <li key={`note-${i}`} className="flex items-start gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(6,148,209,0.18)' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{n}</span>
                  </li>
                ))}
              </ul>

              <div className="qb-hero-btns flex flex-wrap gap-3">
                <a href="#tests" className="qb-hero-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: '#fff', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 0 24px rgba(6,148,209,0.45)' }}>
                  Browse Practice Tests
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </a>
                <a href="#how" className="qb-hero-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: 10, padding: '12px 24px', fontWeight: 600, fontSize: 14, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                  See How It Works
                </a>
              </div>
            </div>

            {/* Right — coverage/trust card */}
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: '28px 24px', border: '1px solid rgba(6,148,209,0.25)', borderLeft: '4px solid #0694D1', boxShadow: '0 8px 32px rgba(0,0,0,0.30)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(6,148,209,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#38bdf8" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1.3, margin: 0 }}>Practice Across Every Major Vendor</h3>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 20px' }}>
                From <span style={{ color: '#38bdf8', fontWeight: 600 }}>Microsoft and AWS</span> to Cisco, PMI, and EC-Council — across <span style={{ color: '#38bdf8', fontWeight: 600 }}>50+ vendors</span>, every Qubits practice test is mapped to the real certification blueprint, question for question.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 10, padding: '12px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#38bdf8' }}>50+</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Vendors</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 10, padding: '12px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#38bdf8' }}>1K+</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Practice Tests</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 10, padding: '12px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#38bdf8' }}>∞</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Attempts</div>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 1023px) {
              .qb-hero-grid { grid-template-columns: 1fr !important; }
            }
            @media (max-width: 767px) {
              .qb-hero-inner { padding-top: 20px !important; padding-bottom: 20px !important; }
              .qb-hero-grid { gap: 18px !important; }
              .qb-hero-btns { flex-direction: column !important; gap: 12px !important; }
              .qb-hero-btn { display: flex !important; width: 100%; justify-content: center; }
            }
          `}</style>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="how" className="qb-section" style={{ background: '#f8fcff', padding: '48px 24px' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10 qb-section-head">
            <h2 className="font-bold mb-2" style={{ color: '#06111E', fontSize: 20 }}>
              How <span style={{ background: 'linear-gradient(135deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Qubits</span> Works
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#7a8c96' }}>From choosing a test to earning your certificate — four simple steps</p>
          </div>
          {/* Mobile: 1-per-slide swipeable */}
          <div className="sm:hidden">
            <div className="overflow-hidden"
              onTouchStart={e => { howTouchStartX.current = e.touches[0].clientX }}
              onTouchEnd={e => {
                const dx = howTouchStartX.current - e.changedTouches[0].clientX
                if (dx > 50)  setHowSlideIdx(p => Math.min(p + 1, HOW_IT_WORKS.length - 1))
                if (dx < -50) setHowSlideIdx(p => Math.max(p - 1, 0))
              }}>
              <div className="flex" style={{ transform: `translateX(-${howSlideIdx * 100}%)`, transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)' }}>
                {HOW_IT_WORKS.map((s, i) => (
                  <div key={i} className="shrink-0 w-full" style={{ padding: '0 2px' }}>
                    <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: 'rgba(6,148,209,0.35)' }}>{s.step}</span>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(6,148,209,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694D1">{s.icon}</svg>
                        </div>
                      </div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1b2a', margin: '0 0 6px' }}>{s.title}</h3>
                      <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#4a6580', margin: 0 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-5">
              <button onClick={() => setHowSlideIdx(p => Math.max(p - 1, 0))} disabled={howSlideIdx === 0}
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                style={{ background: howSlideIdx === 0 ? '#F1F5F9' : 'rgba(6,148,209,0.12)', border: '1px solid #CAEFFF', color: howSlideIdx === 0 ? '#CBD5E1' : '#0694D1' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div className="flex gap-2">
                {HOW_IT_WORKS.map((_, i) => (
                  <button key={i} onClick={() => setHowSlideIdx(i)} className="rounded-full transition-all duration-300"
                    style={{ width: howSlideIdx === i ? 20 : 7, height: 7, background: howSlideIdx === i ? '#0694D1' : '#CAEFFF' }} />
                ))}
              </div>
              <button onClick={() => setHowSlideIdx(p => Math.min(p + 1, HOW_IT_WORKS.length - 1))} disabled={howSlideIdx === HOW_IT_WORKS.length - 1}
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                style={{ background: howSlideIdx === HOW_IT_WORKS.length - 1 ? '#F1F5F9' : 'rgba(6,148,209,0.12)', border: '1px solid #CAEFFF', color: howSlideIdx === HOW_IT_WORKS.length - 1 ? '#CBD5E1' : '#0694D1' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((s, i) => (
              <div key={i} className="qb-step-card rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: 'rgba(6,148,209,0.35)' }}>{s.step}</span>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(6,148,209,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694D1">{s.icon}</svg>
                  </div>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1b2a', margin: '0 0 6px' }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#4a6580', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <style>{`
            .qb-step-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
            .qb-step-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(6,148,209,0.15) !important; }
          `}</style>
        </div>
      </section>

      {/* ── PRACTICE TEST GRID ───────────────────────────────── */}
      <section id="tests" className="relative py-[20px]" style={{ background: '#EBF8FE', borderTop: '1px solid #CAEFFF' }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-16 left-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.16) 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">

          <div className="flex flex-col items-center text-center mb-[15px]">
            <div className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ background: 'rgba(6,148,209,0.1)', color: '#0694D1' }}>Interactive Testing Engine</div>
            <h2 className="font-extrabold mb-1" style={{ color: '#071e2e', lineHeight: 1.2, fontSize: 20 }}>
              Find Your <em style={{ fontStyle: 'normal', background: 'linear-gradient(90deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Qubits</em> Practice Test
            </h2>
            <p className="text-sm" style={{ color: '#5a7a90', marginTop: 4 }}>
              Browse {QUBIT_COURSES.length}+ practice tests across leading vendors — filter by vendor or technology.
            </p>
          </div>

          <div className="relative rounded-2xl p-4 sm:p-5" style={{ background: '#F0F9FF', border: '1px solid #CAEFFF', boxShadow: '0 4px 24px rgba(6,148,209,0.08)' }}>
            <div className="flex gap-5 items-start">

              {/* Left sidebar */}
              <div className="hidden lg:flex flex-col w-[220px] shrink-0 rounded-2xl overflow-hidden bg-white self-start sticky top-4"
                style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 10px rgba(6,148,209,0.07)' }}>
                {/* ── Vendor section ── */}
                <div className="px-3 pt-3 pb-2" style={{ borderBottom: '1px solid #EBF8FE' }}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>VENDOR</p>
                  <div className="relative">
                    <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input type="text" placeholder="Search..." value={vendorSearch}
                      onChange={e => setVendorSearch(e.target.value)}
                      className="w-full pl-7 py-1.5 text-[11px] rounded-lg outline-none"
                      style={{ background: '#F0F9FF', border: '1px solid #CAEFFF', color: '#0F172A', paddingRight: vendorSearch ? '24px' : '8px' }}
                    />
                    {vendorSearch && (
                      <button onClick={() => setVendorSearch('')}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-5 h-5 hover:bg-[#CAEFFF] transition-all"
                        style={{ color: '#64748B' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    )}
                  </div>
                  <div className="mt-2" style={{ borderBottom: '1px solid #EBF8FE', marginLeft: '-12px', marginRight: '-12px' }} />
                </div>
                <div className="flex flex-col overflow-y-auto" style={{ maxHeight: 220 }}>
                  {!vendorSearch && (
                    <button
                      onClick={() => { setActiveVendors([]); setPage(0) }}
                      className="flex items-center justify-between w-full px-3 py-2 text-left transition-colors hover:bg-[#F0FAFF]"
                      style={{ borderLeft: `3px solid ${activeVendors.length === 0 ? '#0694D1' : 'transparent'}`, background: activeVendors.length === 0 ? '#EBF8FE' : 'white' }}>
                      <span className="text-[13px] font-medium truncate" style={{ color: activeVendors.length === 0 ? '#0694D1' : '#374151' }}>All Courses</span>
                      <span className="text-[10px] font-bold rounded-full px-1.5 py-0.5 shrink-0 ml-1"
                        style={{ background: activeVendors.length === 0 ? '#0694D1' : '#E2E8F0', color: activeVendors.length === 0 ? 'white' : '#6B7280' }}>
                        {QUBIT_COURSES.length}
                      </span>
                    </button>
                  )}
                  {VENDORS.filter(v => !vendorSearch || v.toLowerCase().includes(vendorSearch.toLowerCase())).map(v => {
                    const count = QUBIT_COURSES.filter(c => c.vendor === v).length
                    if (count === 0) return null
                    const active = activeVendors.includes(v)
                    return (
                      <button key={v}
                        onClick={() => toggleVendor(v)}
                        className="flex items-center justify-between w-full px-3 py-2 text-left transition-colors hover:bg-[#F0FAFF]"
                        style={{ borderLeft: `3px solid ${active ? '#0694D1' : 'transparent'}`, background: active ? '#EBF8FE' : 'white' }}>
                        <span className="text-[13px] font-medium truncate" style={{ color: active ? '#0694D1' : '#374151' }} title={v}>{v}</span>
                        <div className="flex items-center gap-1.5 shrink-0 ml-1">
                          <span className="text-[10px] font-bold rounded-full px-1.5 py-0.5"
                            style={{ background: active ? '#0694D1' : '#E2E8F0', color: active ? 'white' : '#6B7280' }}>
                            {count}
                          </span>
                          <div className="w-3.5 h-3.5 rounded border-[1.5px] flex items-center justify-center shrink-0"
                            style={active ? { borderColor: '#0694D1', background: '#0694D1' } : { borderColor: '#CBD5E1', background: 'white' }}>
                            {active && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* ── Technology section ── */}
                <div className="px-3 pt-2.5 pb-2" style={{ borderTop: '1px solid #EBF8FE', borderBottom: '1px solid #EBF8FE' }}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>TECHNOLOGY</p>
                  <div className="relative">
                    <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input type="text" placeholder="Search..." value={techSearch}
                      onChange={e => setTechSearch(e.target.value)}
                      className="w-full pl-7 py-1.5 text-[11px] rounded-lg outline-none"
                      style={{ background: '#F0F9FF', border: '1px solid #CAEFFF', color: '#0F172A', paddingRight: techSearch ? '24px' : '8px' }}
                    />
                    {techSearch && (
                      <button onClick={() => setTechSearch('')} className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-5 h-5 hover:bg-[#CAEFFF] transition-all" style={{ color: '#64748B' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex flex-col overflow-y-auto" style={{ maxHeight: 352 }}>
                  {!techSearch && (
                    <button
                      onClick={() => { setActiveTechs([]); setPage(0) }}
                      className="flex items-center justify-between w-full px-3 py-2.5 text-left transition-colors hover:bg-[#F0FAFF]"
                      style={{
                        borderLeft: `3px solid ${activeTechs.length === 0 ? '#0694D1' : 'transparent'}`,
                        background:  activeTechs.length === 0 ? '#EBF8FE' : 'white',
                      }}>
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                          style={{ background: '#EBF8FE', color: '#0694D1', fontSize: 13, fontWeight: 700 }}>★</div>
                        <span className="text-[14px] font-medium leading-tight truncate"
                          style={{ color: activeTechs.length === 0 ? '#0694D1' : '#374151' }}>
                          All Technologies
                        </span>
                      </div>
                      <span className="text-[10px] font-bold rounded-full px-1.5 py-0.5 shrink-0 ml-1"
                        style={{
                          background: activeTechs.length === 0 ? '#0694D1' : '#E2E8F0',
                          color:      activeTechs.length === 0 ? 'white' : '#6B7280',
                        }}>
                        {QUBIT_COURSES.length}
                      </span>
                    </button>
                  )}
                  {SIDEBAR_TECHNOLOGIES
                    .filter(t => t.name !== 'All' && (!techSearch || t.name.toLowerCase().includes(techSearch.toLowerCase())))
                    .map(t => {
                      const active = activeTechs.includes(t.name)
                      return (
                        <button key={t.name}
                          onClick={() => toggleTech(t.name)}
                          className="flex items-center justify-between w-full px-3 py-2.5 text-left transition-colors hover:bg-[#F0FAFF]"
                          style={{
                            borderLeft: `3px solid ${active ? '#0694D1' : 'transparent'}`,
                            background:  active ? '#EBF8FE' : 'white',
                          }}>
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                              style={{ background: t.bg, color: t.color }}>
                              {getTechIcon(t.name)}
                            </div>
                            <span className="text-[14px] font-medium leading-tight truncate"
                              style={{ color: active ? '#0694D1' : '#374151' }}
                              title={t.label}>
                              {t.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 ml-1">
                            <span className="text-[10px] font-bold rounded-full px-1.5 py-0.5"
                              style={{
                                background: active ? '#0694D1' : '#E2E8F0',
                                color:      active ? 'white' : '#6B7280',
                              }}>
                              {t.count}
                            </span>
                            <div className="w-3.5 h-3.5 rounded border-[1.5px] flex items-center justify-center shrink-0"
                              style={active ? { borderColor: '#0694D1', background: '#0694D1' } : { borderColor: '#CBD5E1', background: 'white' }}>
                              {active && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                </div>
              </div>

              {/* Right panel */}
              <div className="flex-1 min-w-0">

                {/* Info banner */}
                <div className="flex flex-col gap-3 mb-5 p-5 rounded-2xl bg-white" style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 8px rgba(6,148,209,0.07)' }}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: activeTechData.bg, color: activeTechData.color }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">{getTechIcon(activeTechData.name)}</svg>
                      </div>
                      <div>
                        <h3 className="text-base font-bold mb-0.5" style={{ color: '#06111E' }}>{activeTechData.label}</h3>
                        <p className="text-xs sm:text-sm leading-snug" style={{ color: '#64748B' }}>{bannerDesc}</p>
                      </div>
                    </div>
                    <button onClick={() => { setFormType('individual'); setShowFormModal(true) }} className="shrink-0 self-center rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)' }}>
                      Request More Info →
                    </button>
                  </div>
                </div>

                {/* Desktop: Search */}
                <div className="hidden lg:flex items-center gap-2 mb-2">
                  <div className="relative flex-1 min-w-0">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" placeholder="Search practice tests..." value={search} onChange={e => { setSearch(e.target.value); setPage(0) }}
                      className="w-full rounded-xl pl-9 py-2.5 text-sm outline-none bg-white"
                      style={{ border: '1px solid #CAEFFF', color: '#0F172A', paddingRight: search ? '32px' : '12px' }} />
                    {search && (
                      <button onClick={() => { setSearch(''); setPage(0) }} className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-6 h-6 transition-all" style={{ color: '#64748B' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile: search */}
                <div className="lg:hidden mb-2">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" placeholder="Search practice tests..." value={search} onChange={e => { setSearch(e.target.value); setPage(0) }}
                      className="w-full rounded-xl pl-9 py-2.5 text-sm outline-none bg-white"
                      style={{ border: '1px solid #CAEFFF', color: '#0F172A', paddingRight: search ? '32px' : '12px' }} />
                    {search && (
                      <button onClick={() => { setSearch(''); setPage(0) }} className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-6 h-6 transition-all" style={{ color: '#64748B' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile: Vendor | Tech */}
                <div className="lg:hidden flex flex-col gap-2 mb-2">
                  <div className="flex gap-2">
                    <div className="flex-1 min-w-0"><FilterDropdown label="Vendor" options={VENDORS.filter(v => QUBIT_COURSES.some(c => c.vendor === v))} value={activeVendors[0] ?? ''} onChange={v => { setActiveVendors(v ? [v] : []); setPage(0) }} fullWidth inputType="checkbox" values={activeVendors} onMultiChange={vals => { setActiveVendors(vals); setPage(0) }} /></div>
                    <div className="flex-1 min-w-0"><FilterDropdown label="All Technologies" options={SIDEBAR_TECHNOLOGIES.filter(t => t.name !== 'All').map(t => t.label)} value={activeTechs[0] ?? ''} onChange={v => { setActiveTechs(v ? [v] : []); setPage(0) }} fullWidth inputType="checkbox" values={activeTechs} onMultiChange={vals => { setActiveTechs(vals); setPage(0) }} /></div>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-xs font-medium" style={{ color: '#64748B' }}>Showing {filtered.length} practice test{filtered.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Course grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginated.length > 0
                    ? paginated.map(c => (
                        <QubitCard key={c.id} course={c} onSample={() => setSampleCourse(`${c.code}: ${c.name}`)} />
                      ))
                    : (
                      <div className="col-span-full flex flex-col items-center py-16 rounded-2xl" style={{ background: '#F8FBFE', border: '1px solid #CAEFFF' }}>
                        <svg className="mb-3 opacity-40" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        <p className="text-sm font-semibold" style={{ color: '#64748B' }}>No practice tests found</p>
                      </div>
                    )
                  }
                </div>

                {/* Pagination */}
                {totalPages > 1 && (() => {
                  const WINDOW = 5, half = Math.floor(WINDOW / 2)
                  let start = Math.max(0, page - half)
                  const end = Math.min(totalPages - 1, start + WINDOW - 1)
                  if (end - start < WINDOW - 1) start = Math.max(0, end - WINDOW + 1)
                  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)
                  const PageBtn = ({ p }: { p: number }) => (
                    <button onClick={() => setPage(p)} className="w-9 h-9 rounded-full text-sm font-bold transition-all hover:opacity-80"
                      style={page === p ? { background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: 'white', border: 'none', boxShadow: '0 4px 12px rgba(6,148,209,0.35)' } : { border: '1.5px solid #E2E8F0', color: '#64748B', background: 'white' }}>
                      {p + 1}
                    </button>
                  )
                  return (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="w-11 h-11 rounded-full flex items-center justify-center text-xl font-bold transition-all disabled:opacity-30 hover:bg-[#EBF8FE]" style={{ border: '1.5px solid #CAEFFF', color: '#0694D1', background: 'white' }}>‹</button>
                      {start > 0 && <><PageBtn p={0} /><span className="text-sm" style={{ color: '#94A3B8' }}>…</span></>}
                      {pages.map(p => <PageBtn key={p} p={p} />)}
                      {end < totalPages - 1 && <><span className="text-sm" style={{ color: '#94A3B8' }}>…</span><PageBtn p={totalPages - 1} /></>}
                      <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="w-11 h-11 rounded-full flex items-center justify-center text-xl font-bold transition-all disabled:opacity-30 hover:bg-[#EBF8FE]" style={{ border: '1.5px solid #CAEFFF', color: '#0694D1', background: 'white' }}>›</button>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REQUEST INFO FORM ────────────────────────────────── */}
      <section id="request" className="py-[20px]" style={{ background: 'linear-gradient(160deg, #07111e 0%, #0a1828 100%)' }}>
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="rounded-2xl px-8 sm:px-12 py-7 sm:py-9"
            style={{ background: 'linear-gradient(160deg, #091828 0%, #0c1f34 100%)', border: '1px solid rgba(6,148,209,0.25)', boxShadow: '0 0 0 1px rgba(6,148,209,0.08), 0 24px 60px rgba(0,0,0,0.5)' }}>
            <div className="flex justify-center mb-4">
              <span className="rounded-full px-4 py-1 text-xs font-bold tracking-widest" style={{ border: '1px solid rgba(6,148,209,0.55)', color: '#38bdf8' }}>LET&apos;S TALK</span>
            </div>
            <h2 className="text-center font-bold text-white mb-1" style={{ fontSize: 20 }}>Request for more <span style={{ color: '#38bdf8' }}>information</span></h2>
            <p className="text-center text-sm mb-8" style={{ color: 'rgba(255,255,255,0.42)' }}>Qubits Practice Tests with Koenig Solutions</p>
            <InquiryForm formType={formType} setFormType={setFormType} />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="qb-test-section" style={{ background: '#E8F4FA', padding: '20px 48px', overflow: 'hidden', position: 'relative', borderTop: '1px solid #CAEFFF' }}>
        <style>{`
          @keyframes ctScrollCol { from { transform: translateY(0); } to { transform: translateY(-50%); } }
          .ilo-test-col-track { display: flex; flex-direction: column; gap: 20px; animation: ctScrollCol linear infinite; }
          .ilo-test-cols-outer:hover .ilo-test-col-track { animation-play-state: paused; }
          .ilo-test-col-md { display: none; }
          .ilo-test-col-lg { display: none; }
          @media (min-width: 768px) { .ilo-test-col-md { display: block !important; } }
          @media (min-width: 1024px) { .ilo-test-col-lg { display: block !important; } }
          @media (max-width: 640px) {
            .qb-test-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .qb-test-stats-grid > div { border-bottom: 1px solid #CAEFFF; }
            .qb-test-stats-grid > div:nth-child(odd) { border-right: 1px solid #CAEFFF !important; }
            .qb-test-stats-grid > div:nth-child(even) { border-right: none !important; }
            .qb-test-stats-grid > div:nth-last-child(-n+2) { border-bottom: none; }
            .qb-test-section { padding: 20px 20px !important; }
          }
        `}</style>
        <div style={{ pointerEvents: 'none', position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,148,209,0.20) 0%, transparent 65%)' }} />
        <div style={{ pointerEvents: 'none', position: 'absolute', right: -128, bottom: 0, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,180,216,0.18) 0%, transparent 70%)' }} />
        <div style={{ pointerEvents: 'none', position: 'absolute', left: -80, top: '50%', transform: 'translateY(-50%)', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(77,191,239,0.16) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'inline-block', marginBottom: 12, borderRadius: 999, background: 'rgba(6,148,209,0.10)', padding: '6px 18px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0694D1' }}>
              Real Transformations
            </span>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#071e2e', margin: '0 0 12px', lineHeight: 1.3, letterSpacing: '-0.015em' }}>
              Qubits{' '}
              <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Student Reviews
              </span>
            </h2>
            <p style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto', color: '#7a8c96', fontSize: 15, lineHeight: 1.65 }}>
              Real results from IT professionals worldwide — rated 4.9/5 from 18,400+ verified reviews.
            </p>
          </div>
          <div style={{ margin: '15px auto 0', maxWidth: 760 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 4px 20px rgba(6,148,209,0.10)', border: '1px solid #DCEEFB' }}>
              <div className="qb-test-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
                {[
                  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, val: '18,400+', label: 'Verified Reviews' },
                  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, val: '4.9 / 5', label: 'Average Rating' },
                  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, val: '95%', label: 'Would Recommend' },
                  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, val: '500K+', label: 'Practice Attempts' },
                ].map((s, i, arr) => (
                  <div key={s.label} style={{ textAlign: 'center', padding: '8px 16px', borderRight: i < arr.length - 1 ? '1px solid #CAEFFF' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>{s.icon}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#093148', lineHeight: 1.2 }}>{s.val}</div>
                    <div style={{ marginTop: 4, fontSize: 12, color: '#666' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <QbMobileTestimonialRow items={QUBITS_TESTIMONIALS} />
          <div className="ilo-test-cols-outer hidden sm:flex" style={{ justifyContent: 'center', gap: 24, marginTop: 48, maxHeight: 740, overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
            <QbTestimonialsColumn items={QUBITS_TESTIMONIALS.slice(0, 3)} duration={15} />
            <QbTestimonialsColumn items={QUBITS_TESTIMONIALS.slice(3, 6)} duration={19} className="ilo-test-col-md" />
            <QbTestimonialsColumn items={QUBITS_TESTIMONIALS.slice(6, 9)} duration={17} className="ilo-test-col-lg" />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="qb-section" style={{ background: '#f0faff', padding: '48px 24px' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8 qb-section-head">
            <h2 className="font-bold mb-2" style={{ color: '#06111E', fontSize: 20 }}>
              Frequently <span style={{ background: 'linear-gradient(135deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Asked Questions</span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#7a8c96' }}>Everything you need to know about Qubits</p>
          </div>

          <div className="hidden sm:flex gap-3">
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 === 0).map((f, j) => {
                const i = j * 2
                return <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              })}
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 !== 0).map((f, j) => {
                const i = j * 2 + 1
                return <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              })}
            </div>
          </div>
          <div className="sm:hidden flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="mb-3 text-sm sm:text-base" style={{ color: '#7a8c96' }}>Still have questions?</p>
            <button className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-sm font-bold text-[#076D9D] transition-all hover:bg-[#076D9D] hover:text-white cursor-pointer">
              Chat with a Training Advisor
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(7,109,157,0.12)' }}>→</span>
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .qb-section { padding-left: 16px !important; padding-right: 16px !important; padding-top: 20px !important; padding-bottom: 20px !important; }
          .qb-section-head { margin-bottom: 18px !important; }
        }
      `}</style>
    </div>
  )
}

'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

/* ─── Existing Data ──────────────────────────────────────── */

const ENT_MORPH_WORDS = [
  'at Global Scale',
  'Across 195+ Countries',
  'With Expert Trainers',
  'Across All Domains',
  'in Record Time',
  'With Certified Outcomes',
]

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

/* ─── New Data ───────────────────────────────────────────── */

const ENTERPRISE_CLIENTS = [
  { name: 'Google',             img: 'google.png'               },
  { name: 'Microsoft',          img: 'ms.png'                   },
  { name: 'Adobe',              img: 'adobe.png'                },
  { name: 'Dell',               img: 'dell.png'                 },
  { name: 'HP',                 img: 'hp.png'                   },
  { name: 'Infosys',            img: 'infosys.png'              },
  { name: 'TCS',                img: 'TCS.png'                  },
  { name: 'Wipro',              img: 'wipro.png'                },
  { name: 'HCL Technologies',   img: 'hcl-technologies.png'     },
  { name: 'Cognizant',          img: 'cts.png'                  },
  { name: 'EY',                 img: 'EY.png'                   },
  { name: 'PwC',                img: 'pwc.png'                  },
  { name: 'McKinsey',           img: 'mcKinsey-and-company.png' },
  { name: 'HSBC',               img: 'hsbc.png'                 },
  { name: 'Shell',              img: 'shell 1.png'              },
  { name: 'Emirates',           img: 'Emirates.png'             },
  { name: 'Capgemini',          img: 'capeg.png'                },
  { name: 'Saudi Aramco',       img: 'aramco.png'               },
]

const INDUSTRIES = [
  {
    name: 'Financial Services',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
    desc: 'Upskill risk analysts, compliance officers, and cloud architects across banking, insurance, and fintech.',
    tags: ['Cloud Security', 'Risk & Compliance', 'AI/ML'],
  },
  {
    name: 'Healthcare & Life Sciences',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>,
    desc: 'Equip IT teams with HIPAA-compliant cloud, data management, and cybersecurity expertise at scale.',
    tags: ['Data Privacy', 'Cloud Computing', 'DevOps'],
  },
  {
    name: 'Manufacturing & Engineering',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>,
    desc: 'Enable digital transformation with IIoT, automation, and ERP training from shop-floor to C-suite.',
    tags: ['SAP S/4HANA', 'IoT & Automation', 'PMP'],
  },
  {
    name: 'Technology & Software',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>,
    desc: 'Accelerate product delivery with DevOps, cloud-native, and AI/ML certifications at scale for engineering teams.',
    tags: ['Kubernetes', 'AWS / Azure', 'DevSecOps'],
  },
  {
    name: 'Government & Defence',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
    desc: 'Deliver security-cleared, compliance-driven training for public sector IT and defence organisations worldwide.',
    tags: ['Cybersecurity', 'ITSM / ITIL', 'CompTIA'],
  },
  {
    name: 'Energy & Utilities',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z"/>,
    desc: 'Future-proof infrastructure teams with OT/IT convergence, cloud migration, and project management skills.',
    tags: ['SCADA / OT', 'Cloud Migration', 'Cisco Networking'],
  },
]

const ROI_METRICS = [
  { value: '94%',  label: 'First-Attempt Certification Pass Rate', sub: 'Across all 5,000+ courses' },
  { value: '3×',   label: 'Faster Skill Acquisition',              sub: 'vs. self-study or e-learning' },
  { value: '48h',  label: 'Average Programme Launch Time',         sub: 'From brief to live training' },
  { value: '$0',   label: 'Hidden or Unexpected Costs',            sub: 'All-inclusive transparent pricing' },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Submit Your Brief',
    desc: 'Share your team size, required skills, and timeline via our quick-start form or a 30-minute consultation call.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>,
    color: '#0694D1',
  },
  {
    step: '02',
    title: 'Receive a Custom Plan',
    desc: 'Your dedicated account manager presents a tailored curriculum, delivery format, and cost estimate within 48 hours.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>,
    color: '#076D9D',
  },
  {
    step: '03',
    title: 'Approve & Schedule',
    desc: 'Confirm dates, select formats — Live Online, Classroom, or 1-on-1 — and receive a guaranteed training calendar.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>,
    color: '#0694D1',
  },
  {
    step: '04',
    title: 'Train, Certify & Report',
    desc: 'Your team trains with certified instructors. We track progress, manage re-sits, and deliver a full ROI report.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>,
    color: '#076D9D',
  },
]

const TECH_TRENDS = [
  { label: 'HOT',      name: 'Generative AI & LLMs',     growth: '+340%', desc: 'Prompt engineering, RAG pipelines, fine-tuning, and AI governance at enterprise scale.',    courses: '120+', accent: '#FF6B35' },
  { label: 'HOT',      name: 'Cloud-Native & Kubernetes', growth: '+185%', desc: 'Container orchestration, GitOps, service mesh, and multi-cloud architecture.',               courses: '280+', accent: '#0694D1' },
  { label: 'RISING',   name: 'Zero Trust Security',       growth: '+210%', desc: 'Identity-centric, perimeter-less security for hybrid and cloud-first enterprises.',          courses: '95+',  accent: '#8B5CF6' },
  { label: 'RISING',   name: 'FinOps & Cloud Cost',       growth: '+168%', desc: 'Cloud financial management, cost allocation, and optimisation at enterprise scale.',         courses: '40+',  accent: '#10B981' },
  { label: 'EMERGING', name: 'Quantum Computing',         growth: '+420%', desc: 'Quantum algorithms, Qiskit, and post-quantum cryptography for enterprise readiness.',        courses: '18+',  accent: '#F59E0B' },
  { label: 'RISING',   name: 'DevSecOps & SBOM',          growth: '+145%', desc: 'Shift-left security, supply-chain integrity, and automated compliance pipelines.',           courses: '160+', accent: '#38bdf8' },
  { label: 'EMERGING', name: 'Edge AI & TinyML',          growth: '+290%', desc: 'On-device inference and real-time AI for manufacturing, retail, and smart infrastructure.', courses: '55+',  accent: '#EC4899' },
]

const FAQS = [
  { q: 'What is the minimum team size for enterprise training?', a: 'We accommodate teams of any size — from a single employee in 1-on-1 format to enterprise-wide rollouts of 1,000+ staff. Pricing and formats are fully customised to your headcount and objectives.' },
  { q: 'Can training be delivered at our office location?', a: 'Yes. Our Fly-Me-a-Trainer (FMAT) service deploys certified instructors directly to your premises anywhere in the world — ideal for large teams or classified environments.' },
  { q: 'How quickly can a programme be launched?', a: 'For standard certification programmes we can go from brief to live training within 48 hours. Custom-built curricula typically require 5–10 business days for instructional design.' },
  { q: 'Do you offer post-training reporting and ROI tracking?', a: 'Yes. Every enterprise engagement includes a training-completion report, certification tracking dashboard, and an optional ROI analysis aligned to your L&D KPIs.' },
  { q: 'Are all instructors vendor-certified?', a: 'Absolutely. Every Koenig instructor holds active certifications from the vendor they teach — Microsoft, AWS, Cisco, etc. — and brings a minimum of 5 years of real-world enterprise experience.' },
  { q: 'What happens if an employee does not pass their certification exam?', a: 'We include exam-prep support and, for most programmes, a complimentary re-sit session. Our 94% first-attempt pass rate means this is rarely needed — but the safety net is always there.' },
]

/* ─── Bento Hero Animation ───────────────────────────────── */

/* Shared card wrapper */
function BentoCard({ label, children, style }: {
  label: string; children: React.ReactNode; style?: React.CSSProperties
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderRadius: 14,
        background: 'rgba(6,12,24,0.88)',
        border: '1px solid rgba(6,148,209,0.38)',
        backdropFilter: 'blur(6px)',
        ...style,
      }}
    >
      {children}
      {/* Label overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-2"
        style={{ background: 'linear-gradient(to top,rgba(6,12,24,0.95) 60%,transparent)' }}
      >
        <span
          className="inline-block text-[10px] font-medium tracking-[0.12em] text-white/90 px-2.5 py-1 rounded"
          style={{
            background: 'linear-gradient(135deg, rgba(6,148,209,0.28) 0%, rgba(56,189,248,0.14) 50%, rgba(6,148,209,0.22) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.2)',
            border: '1px solid rgba(56,189,248,0.20)',
            backdropFilter: 'blur(4px)',
          }}
        >{label}</span>
      </div>
    </div>
  )
}

/* ── Canvas 1: GEN AI — layered neural-net forward pass ── */
function CanvasNeuralNet() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => { const r = c.getBoundingClientRect(); if (r.width) { c.width = r.width; c.height = r.height } }
    resize(); window.addEventListener('resize', resize)
    const LAYERS = [3, 5, 4, 2]
    const loop = () => {
      const W = c.width, H = c.height, t = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)
      const nodes = LAYERS.map((cnt, li) =>
        Array.from({ length: cnt }, (_, ni) => ({
          x: W * (0.14 + li * 0.24),
          y: H * 0.5 + (ni - (cnt - 1) / 2) * (H * 0.19),
        }))
      )
      // connections + animated pulse dots
      for (let li = 0; li < nodes.length - 1; li++) {
        nodes[li].forEach((a, ai) => {
          nodes[li + 1].forEach((b, bi) => {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = 'rgba(6,148,209,0.09)'; ctx.lineWidth = 0.7; ctx.stroke()
            const p = ((t * 0.7 + ai * 0.14 + bi * 0.10 + li * 0.33) % 1)
            const px = a.x + (b.x - a.x) * p, py = a.y + (b.y - a.y) * p
            const g = ctx.createRadialGradient(px, py, 0, px, py, 5)
            g.addColorStop(0, 'rgba(56,189,248,0.88)'); g.addColorStop(1, 'rgba(56,189,248,0)')
            ctx.beginPath(); ctx.arc(px, py, 5, 0, 6.28); ctx.fillStyle = g; ctx.fill()
          })
        })
      }
      // nodes with activation glow
      nodes.forEach((layer, li) => {
        layer.forEach((n, ni) => {
          const act = 0.35 + 0.65 * Math.abs(Math.sin(t * 2.2 + li * 1.4 + ni))
          const rg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 16)
          rg.addColorStop(0, `rgba(6,148,209,${act * 0.4})`); rg.addColorStop(1, 'rgba(6,148,209,0)')
          ctx.beginPath(); ctx.arc(n.x, n.y, 16, 0, 6.28); ctx.fillStyle = rg; ctx.fill()
          ctx.beginPath(); ctx.arc(n.x, n.y, 4 + act * 3, 0, 6.28)
          ctx.strokeStyle = `rgba(56,189,248,${0.45 + act * 0.55})`; ctx.lineWidth = 1.5; ctx.stroke()
          ctx.beginPath(); ctx.arc(n.x, n.y, 2, 0, 6.28)
          ctx.fillStyle = `rgba(255,255,255,${0.65 + act * 0.35})`; ctx.fill()
        })
      })
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

/* ── Canvas 2: MANAGEMENT — animated org-chart hierarchy ── */
function CanvasManagement() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => { const r = c.getBoundingClientRect(); if (r.width) { c.width = r.width; c.height = r.height } }
    resize(); window.addEventListener('resize', resize)
    const loop = () => {
      const W = c.width, H = c.height, t = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)
      type Nd = { x: number; y: number }
      const root: Nd = { x: W * 0.5, y: H * 0.13 }
      const mid: Nd[] = [{ x: W * 0.27, y: H * 0.42 }, { x: W * 0.73, y: H * 0.42 }]
      const leaves: Nd[] = [
        { x: W * 0.12, y: H * 0.74 }, { x: W * 0.40, y: H * 0.74 },
        { x: W * 0.60, y: H * 0.74 }, { x: W * 0.88, y: H * 0.74 },
      ]
      const allNodes = [root, ...mid, ...leaves]
      const edges: [Nd, Nd][] = [
        [root, mid[0]], [root, mid[1]],
        [mid[0], leaves[0]], [mid[0], leaves[1]],
        [mid[1], leaves[2]], [mid[1], leaves[3]],
      ]
      edges.forEach(([a, b], ei) => {
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = 'rgba(6,148,209,0.22)'; ctx.lineWidth = 1.2; ctx.stroke()
        const p = ((t * 0.52 + ei * 0.21) % 1)
        const px = a.x + (b.x - a.x) * p, py = a.y + (b.y - a.y) * p
        const g = ctx.createRadialGradient(px, py, 0, px, py, 7)
        g.addColorStop(0, 'rgba(56,189,248,0.9)'); g.addColorStop(1, 'rgba(56,189,248,0)')
        ctx.beginPath(); ctx.arc(px, py, 7, 0, 6.28); ctx.fillStyle = g; ctx.fill()
        ctx.beginPath(); ctx.arc(px, py, 2.2, 0, 6.28); ctx.fillStyle = '#38bdf8'; ctx.fill()
      })
      const radii = [10, 7, 7, 5, 5, 5, 5]
      allNodes.forEach((n, i) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.9 + i * 0.85)
        const r = radii[i] + pulse * 3
        const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 2.6)
        ng.addColorStop(0, `rgba(6,148,209,${0.32 + pulse * 0.28})`); ng.addColorStop(1, 'rgba(6,148,209,0)')
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 2.6, 0, 6.28); ctx.fillStyle = ng; ctx.fill()
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 6.28)
        ctx.fillStyle = 'rgba(6,20,40,0.92)'; ctx.fill()
        ctx.strokeStyle = `rgba(56,189,248,${0.5 + pulse * 0.5})`; ctx.lineWidth = 1.5; ctx.stroke()
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 0.38, 0, 6.28)
        ctx.fillStyle = `rgba(56,189,248,${0.65 + pulse * 0.35})`; ctx.fill()
      })
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

/* ── Canvas 3: FINANCE — candlestick chart with EMA line ── */
function CanvasFinance() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => { const r = c.getBoundingClientRect(); if (r.width) { c.width = r.width; c.height = r.height } }
    resize(); window.addEventListener('resize', resize)
    // [open, high, low, close] each 0-1
    const BASE: [number, number, number, number][] = [
      [0.42, 0.62, 0.34, 0.57],
      [0.57, 0.71, 0.50, 0.47],
      [0.47, 0.55, 0.37, 0.53],
      [0.53, 0.73, 0.51, 0.69],
      [0.69, 0.82, 0.60, 0.76],
      [0.76, 0.79, 0.54, 0.59],
      [0.59, 0.67, 0.41, 0.50],
    ]
    const loop = () => {
      const W = c.width, H = c.height, t = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)
      const floor = H * 0.86, ceiling = H * 0.10, range = floor - ceiling
      const n = BASE.length, bW = W / (n * 2.4)
      const gap = (W - bW * n) / (n + 1)
      // faint grid
      for (let gr = 0; gr < 4; gr++) {
        const gy = ceiling + (gr / 3) * range
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy)
        ctx.strokeStyle = 'rgba(6,148,209,0.07)'; ctx.lineWidth = 0.6; ctx.stroke()
      }
      // candles
      BASE.forEach(([o, h, l, cl], i) => {
        const animCl = cl + 0.06 * Math.sin(t * 1.1 + i * 0.65)
        const animH = Math.max(h, animCl) + 0.025 * Math.abs(Math.sin(t * 0.8 + i))
        const animL = Math.min(l, animCl) - 0.018 * Math.abs(Math.sin(t * 0.7 + i))
        const x = gap + i * (bW + gap) + bW / 2
        const oY = floor - o * range, cY = floor - animCl * range
        const hY = floor - animH * range, lY = floor - animL * range
        const isUp = animCl >= o
        const col = isUp ? 'rgba(56,189,248,0.92)' : 'rgba(6,100,180,0.72)'
        ctx.beginPath(); ctx.moveTo(x, hY); ctx.lineTo(x, lY)
        ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.stroke()
        const bodyY = Math.min(oY, cY), bodyH = Math.max(2, Math.abs(oY - cY))
        ctx.fillStyle = col; ctx.fillRect(x - bW / 2, bodyY, bW, bodyH)
        if (isUp) {
          const tg = ctx.createRadialGradient(x, cY, 0, x, cY, bW * 1.6)
          tg.addColorStop(0, 'rgba(56,189,248,0.32)'); tg.addColorStop(1, 'rgba(56,189,248,0)')
          ctx.beginPath(); ctx.arc(x, cY, bW * 1.6, 0, 6.28); ctx.fillStyle = tg; ctx.fill()
        }
      })
      // EMA line
      ctx.beginPath()
      BASE.forEach(([, , , cl], i) => {
        const animCl = cl + 0.06 * Math.sin(t * 1.1 + i * 0.65)
        const x = gap + i * (bW + gap) + bW / 2, y = floor - animCl * range
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.strokeStyle = 'rgba(56,189,248,0.55)'; ctx.lineWidth = 1.5
      ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([])
      // baseline
      ctx.beginPath(); ctx.moveTo(0, floor); ctx.lineTo(W, floor)
      ctx.strokeStyle = 'rgba(6,148,209,0.28)'; ctx.lineWidth = 0.8; ctx.stroke()
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

/* ── Canvas 4: DATA SCIENCE — scatter-plot clustering ── */
function CanvasDataScience() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => { const r = c.getBoundingClientRect(); if (r.width) { c.width = r.width; c.height = r.height } }
    resize(); window.addEventListener('resize', resize)
    const CLUSTERS = [
      { cx: 0.24, cy: 0.32, col: '6,148,209' },
      { cx: 0.73, cy: 0.27, col: '56,189,248' },
      { cx: 0.50, cy: 0.73, col: '7,109,157' },
    ]
    const PTS = Array.from({ length: 39 }, (_, i) => {
      const cl = CLUSTERS[i % 3]
      return {
        rx: Math.random() * 0.88 + 0.06,
        ry: Math.random() * 0.82 + 0.09,
        clX: cl.cx + (Math.random() - 0.5) * 0.20,
        clY: cl.cy + (Math.random() - 0.5) * 0.20,
        ci: i % 3,
        ph: Math.random() * 6.28,
      }
    })
    const loop = () => {
      const W = c.width, H = c.height, t = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)
      const cycle = (t * 0.20) % 1
      const gather = Math.max(0, Math.min(1, cycle * 2.2 - 0.3))
      CLUSTERS.forEach((cl, ci) => {
        const rp = 24 + 7 * Math.sin(t * 1.9 + ci)
        if (gather > 0.2) {
          const rg = ctx.createRadialGradient(cl.cx * W, cl.cy * H, 0, cl.cx * W, cl.cy * H, rp * gather + 12)
          rg.addColorStop(0, `rgba(${cl.col},${0.09 * gather})`); rg.addColorStop(1, `rgba(${cl.col},0)`)
          ctx.beginPath(); ctx.arc(cl.cx * W, cl.cy * H, rp * gather + 12, 0, 6.28); ctx.fillStyle = rg; ctx.fill()
          ctx.beginPath(); ctx.arc(cl.cx * W, cl.cy * H, rp * gather, 0, 6.28)
          ctx.strokeStyle = `rgba(${cl.col},${gather * 0.45})`; ctx.lineWidth = 1; ctx.stroke()
        }
      })
      PTS.forEach(pt => {
        const cl = CLUSTERS[pt.ci]
        const x = (pt.rx + (pt.clX - pt.rx) * gather) * W
        const y = (pt.ry + (pt.clY - pt.ry) * gather) * H
        const pulse = 0.5 + 0.5 * Math.sin(t * 2.6 + pt.ph)
        const r = 2 + pulse * 1.8
        const cg = ctx.createRadialGradient(x, y, 0, x, y, r * 2.8)
        cg.addColorStop(0, `rgba(${cl.col},0.88)`); cg.addColorStop(1, `rgba(${cl.col},0)`)
        ctx.beginPath(); ctx.arc(x, y, r * 2.8, 0, 6.28); ctx.fillStyle = cg; ctx.fill()
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.28); ctx.fillStyle = `rgba(${cl.col},1)`; ctx.fill()
      })
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

/* ── Canvas 5: TECHNOLOGY — hexagonal pulse-wave grid ── */
function CanvasTechnology() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => { const r = c.getBoundingClientRect(); if (r.width) { c.width = r.width; c.height = r.height } }
    resize(); window.addEventListener('resize', resize)
    const drawHex = (cx: number, cy: number, r: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 - Math.PI / 6
        i === 0 ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
                : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
      }
      ctx.closePath()
    }
    const loop = () => {
      const W = c.width, H = c.height, t = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)
      const R = Math.min(W, H) * 0.10
      const hW = R * Math.sqrt(3), hH = R * 1.5
      const cols = Math.ceil(W / hW) + 2, rows = Math.ceil(H / hH) + 2
      const p1 = { x: W * 0.5, y: H * 0.5, ph: t * 1.5 }
      const p2 = { x: W * 0.18, y: H * 0.28, ph: t * 1.1 + 2.8 }
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const cx = col * hW + (row % 2 === 0 ? 0 : hW / 2)
          const cy = row * hH
          const d1 = Math.sqrt((cx - p1.x) ** 2 + (cy - p1.y) ** 2)
          const d2 = Math.sqrt((cx - p2.x) ** 2 + (cy - p2.y) ** 2)
          const w1 = 0.5 + 0.5 * Math.cos(d1 * 0.05 - p1.ph)
          const w2 = 0.5 + 0.5 * Math.cos(d2 * 0.07 - p2.ph)
          const intensity = Math.max(w1, w2)
          drawHex(cx, cy, R - 1.5)
          ctx.fillStyle = `rgba(6,148,209,${intensity * 0.17})`; ctx.fill()
          ctx.strokeStyle = `rgba(56,189,248,${0.07 + intensity * 0.55})`; ctx.lineWidth = 0.8; ctx.stroke()
          if (intensity > 0.84) {
            ctx.beginPath(); ctx.arc(cx, cy, 2.8, 0, 6.28)
            ctx.fillStyle = `rgba(56,189,248,${(intensity - 0.84) * 6})`; ctx.fill()
          }
        }
      }
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

/* ── Canvas 6: FUNCTIONAL SKILLS — morphing radar / spider chart ── */
function CanvasPuzzle() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => { const r = c.getBoundingClientRect(); if (r.width) { c.width = r.width; c.height = r.height } }
    resize(); window.addEventListener('resize', resize)
    const AXES = 6
    const P1 = [0.80, 0.60, 0.90, 0.50, 0.72, 0.82]
    const P2 = [0.50, 0.90, 0.62, 0.88, 0.58, 0.50]
    const loop = () => {
      const W = c.width, H = c.height, t = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)
      const cx = W * 0.5, cy = H * 0.5
      const R = Math.min(W, H) * 0.38
      const morph = 0.5 + 0.5 * Math.sin(t * 0.72)
      // grid rings
      for (let ring = 1; ring <= 4; ring++) {
        const rr = R * ring / 4
        ctx.beginPath()
        for (let a = 0; a < AXES; a++) {
          const angle = (a * Math.PI * 2) / AXES - Math.PI / 2
          const x = cx + rr * Math.cos(angle), y = cy + rr * Math.sin(angle)
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.strokeStyle = `rgba(6,148,209,${0.07 + ring * 0.025})`; ctx.lineWidth = 0.7; ctx.stroke()
      }
      // spokes
      for (let a = 0; a < AXES; a++) {
        const angle = (a * Math.PI * 2) / AXES - Math.PI / 2
        ctx.beginPath(); ctx.moveTo(cx, cy)
        ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle))
        ctx.strokeStyle = 'rgba(6,148,209,0.14)'; ctx.lineWidth = 0.7; ctx.stroke()
      }
      // filled morphing polygon
      const vals = P1.map((v, i) => v + (P2[i] - v) * morph)
      ctx.beginPath()
      vals.forEach((v, a) => {
        const angle = (a * Math.PI * 2) / AXES - Math.PI / 2
        const x = cx + R * v * Math.cos(angle), y = cy + R * v * Math.sin(angle)
        a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.fillStyle = 'rgba(6,148,209,0.17)'; ctx.fill()
      ctx.strokeStyle = 'rgba(56,189,248,0.75)'; ctx.lineWidth = 1.6; ctx.stroke()
      // vertex glow dots
      vals.forEach((v, a) => {
        const angle = (a * Math.PI * 2) / AXES - Math.PI / 2
        const x = cx + R * v * Math.cos(angle), y = cy + R * v * Math.sin(angle)
        const pulse = 0.5 + 0.5 * Math.sin(t * 2.5 + a * 1.05)
        const vg = ctx.createRadialGradient(x, y, 0, x, y, 7)
        vg.addColorStop(0, `rgba(56,189,248,${0.7 + pulse * 0.3})`); vg.addColorStop(1, 'rgba(56,189,248,0)')
        ctx.beginPath(); ctx.arc(x, y, 7, 0, 6.28); ctx.fillStyle = vg; ctx.fill()
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, 6.28); ctx.fillStyle = '#38bdf8'; ctx.fill()
      })
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

/* ── Animated stats cards (bento animation behind each stat) ── */
function HeroStatsAnimation() {
  const cards = [
    { num: '1M+',    label: 'Professionals Trained', Canvas: CanvasNeuralNet   },
    { num: '5,000+', label: 'Courses Available',     Canvas: CanvasDataScience },
    { num: '30+',    label: 'Years of Excellence',   Canvas: CanvasFinance     },
    { num: '195+',   label: 'Countries Served',      Canvas: CanvasTechnology  },
  ]
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-3 lg:w-auto">
      {cards.map(({ num, label, Canvas }) => (
        <div
          key={label}
          className="relative overflow-hidden rounded-2xl text-center"
          style={{
            background: 'rgba(6,12,24,0.90)',
            border: '1px solid rgba(6,148,209,0.40)',
            backdropFilter: 'blur(10px)',
            minHeight: 140,
            padding: '22px 14px 18px',
          }}
        >
          {/* Canvas animation fills the card as background */}
          <Canvas />
          {/* Dark vignette so numbers stay readable */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(6,12,24,0.18) 0%, rgba(6,12,24,0.72) 100%)', pointerEvents: 'none' }}
          />
          {/* Stat content */}
          <div className="relative z-10">
            <div
              className="text-3xl font-black leading-none"
              style={{ color: '#38bdf8', textShadow: '0 0 22px rgba(56,189,248,0.55)' }}
            >
              {num}
            </div>
            <div className="mt-2 text-xs font-semibold leading-tight text-white/65">{label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Hero particle banner background ── */
function ParticleBanner() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => {
      c.width = c.offsetWidth; c.height = c.offsetHeight
    }
    resize(); window.addEventListener('resize', resize)

    interface Particle {
      x: number; y: number; vx: number; vy: number
      r: number; alpha: number; rgb: string; pulse: number
    }
    const COLORS = ['6,148,209', '56,189,248', '6,148,209', '38,175,225', '14,107,157']
    const COUNT = 90
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00018,
      vy: (Math.random() - 0.5) * 0.00018,
      r: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.5 + 0.2,
      rgb: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
    }))

    const CONNECT_DIST = 0.14 // fraction of canvas width

    const loop = () => {
      const W = c.width, H = c.height, now = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)

      // Move particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
      })

      // Connection lines
      const cd = CONNECT_DIST * W
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = (a.x - b.x) * W, dy = (a.y - b.y) * H
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < cd) {
            const alpha = (1 - dist / cd) * 0.18
            ctx.beginPath()
            ctx.moveTo(a.x * W, a.y * H)
            ctx.lineTo(b.x * W, b.y * H)
            ctx.strokeStyle = `rgba(6,148,209,${alpha})`
            ctx.lineWidth = 0.7; ctx.stroke()
          }
        }
      }

      // Particles
      particles.forEach(p => {
        const pulsed = p.alpha * (0.7 + 0.3 * Math.sin(now * 1.4 + p.pulse))
        const g = ctx.createRadialGradient(p.x * W, p.y * H, 0, p.x * W, p.y * H, p.r * 3.5)
        g.addColorStop(0, `rgba(${p.rgb},${pulsed})`)
        g.addColorStop(1, `rgba(${p.rgb},0)`)
        ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r * 3.5, 0, 6.28)
        ctx.fillStyle = g; ctx.fill()
        ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, 6.28)
        ctx.fillStyle = `rgba(${p.rgb},${pulsed * 0.9})`; ctx.fill()
      })

      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }} />
}

/* ── Hero right-panel: live training analytics dashboard ── */
function HeroIllustration() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => {
      const r = c.getBoundingClientRect()
      if (r.width) { c.width = r.width; c.height = r.height }
    }
    resize(); window.addEventListener('resize', resize)

    const DOMAINS = [
      { name: 'GEN AI',     rgb: '255,107,53',  target: 0.87, count: 1847 },
      { name: 'TECHNOLOGY', rgb: '6,148,209',   target: 0.74, count: 2341 },
      { name: 'DATA SCI',   rgb: '139,92,246',  target: 0.68, count: 1256 },
      { name: 'FINANCE',    rgb: '16,185,129',  target: 0.91, count: 3102 },
      { name: 'MANAGEMENT', rgb: '56,189,248',  target: 0.82, count: 2789 },
      { name: 'FUNCTIONAL', rgb: '245,158,11',  target: 0.76, count: 1934 },
    ]

    const CERTS = [
      'Priya S. — AWS Solutions Architect',
      'James K. — PMP Certified',
      'Maria L. — Azure Data Engineer',
      'Rahul M. — Scrum Master (CSM)',
      'Sarah W. — Generative AI Specialist',
      'Ahmed H. — SAP FICO Consultant',
      'Nina C. — ITIL 4 Foundation',
      'David P. — Python for Data Science',
      'Liu W. — CFA Level I',
      'Emma T. — Lean Six Sigma Green Belt',
    ]

    interface CertEntry { text: string; alpha: number; y: number }
    let certIdx = 0
    const certDisplayed: CertEntry[] = []
    let lastCertTime = 0
    const startTime = Date.now()
    const progress = DOMAINS.map(() => 0)

    function drawRR(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath()
      ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + r)
      ctx.lineTo(x + w, y + h - r)
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      ctx.lineTo(x + r, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - r)
      ctx.lineTo(x, y + r)
      ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.closePath()
    }

    const loop = () => {
      const W = c.width, H = c.height
      const now = Date.now()
      const elapsed = (now - startTime) / 1000
      ctx.clearRect(0, 0, W, H)

      // Background
      ctx.fillStyle = '#060f1d'
      ctx.fillRect(0, 0, W, H)

      // Dot grid
      ctx.fillStyle = 'rgba(6,148,209,0.07)'
      for (let gx = 12; gx < W; gx += 24)
        for (let gy = 12; gy < H; gy += 24) {
          ctx.beginPath(); ctx.arc(gx, gy, 0.8, 0, 6.28); ctx.fill()
        }

      // Header bar
      const headerH = 44
      ctx.fillStyle = 'rgba(6,148,209,0.08)'
      ctx.fillRect(0, 0, W, headerH)
      ctx.strokeStyle = 'rgba(6,148,209,0.20)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(0, headerH); ctx.lineTo(W, headerH); ctx.stroke()

      // Live dot + pulse
      const livePulse = 0.5 + 0.5 * Math.sin(now / 500)
      ctx.beginPath(); ctx.arc(18, headerH / 2, 4.5, 0, 6.28)
      ctx.fillStyle = `rgba(16,185,129,${0.6 + livePulse * 0.4})`; ctx.fill()
      ctx.beginPath(); ctx.arc(18, headerH / 2, 4.5 + livePulse * 3.5, 0, 6.28)
      ctx.strokeStyle = `rgba(16,185,129,${(1 - livePulse) * 0.35})`; ctx.lineWidth = 1; ctx.stroke()

      ctx.font = 'bold 10px system-ui,sans-serif'
      ctx.fillStyle = 'rgba(16,185,129,0.90)'
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
      ctx.fillText('LIVE', 30, headerH / 2)
      ctx.font = '10px system-ui,sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.42)'
      ctx.fillText('Training Activity Dashboard', 58, headerH / 2)

      const totalCerts = Math.floor(500000 + Math.min(elapsed * 80, 800))
      ctx.font = 'bold 10px system-ui,sans-serif'
      ctx.fillStyle = 'rgba(56,189,248,0.85)'
      ctx.textAlign = 'right'
      ctx.fillText(`${totalCerts.toLocaleString()}+ Certified`, W - 14, headerH / 2)

      // Domain card grid
      const padX = 12, padY = 10
      const gridTop = headerH + padY
      const feedH = 56
      const gridH = H - gridTop - feedH - padY
      const cols = 3, rows = 2
      const colGap = 8, rowGap = 8
      const cardW = (W - padX * 2 - colGap * (cols - 1)) / cols
      const cardH = (gridH - rowGap * (rows - 1)) / rows

      DOMAINS.forEach((d, i) => {
        const col = i % cols, row = Math.floor(i / cols)
        const x = padX + col * (cardW + colGap)
        const y = gridTop + row * (cardH + rowGap)

        const animP = Math.min(1, Math.max(0, (elapsed - i * 0.18) / 2.6))
        const eased = 1 - Math.pow(1 - animP, 3)
        progress[i] = d.target * eased
        const pulse = 0.5 + 0.5 * Math.sin(now / 900 + i * 1.1)

        // Card background + border
        drawRR(x, y, cardW, cardH, 8)
        ctx.fillStyle = `rgba(${d.rgb},0.07)`; ctx.fill()
        ctx.strokeStyle = `rgba(${d.rgb},${0.20 + pulse * 0.10})`; ctx.lineWidth = 1; ctx.stroke()

        // Inner radial glow
        const cg = ctx.createRadialGradient(x + cardW / 2, y + cardH * 0.35, 0, x + cardW / 2, y + cardH / 2, cardH * 0.8)
        cg.addColorStop(0, `rgba(${d.rgb},${0.06 + pulse * 0.04})`); cg.addColorStop(1, `rgba(${d.rgb},0)`)
        drawRR(x, y, cardW, cardH, 8); ctx.fillStyle = cg; ctx.fill()

        // Circular progress ring
        const ringR = Math.min(cardW, cardH) * 0.255
        const ringCx = x + cardW / 2, ringCy = y + cardH * 0.535
        ctx.beginPath(); ctx.arc(ringCx, ringCy, ringR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${d.rgb},0.13)`; ctx.lineWidth = 3.5; ctx.stroke()
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.arc(ringCx, ringCy, ringR, -Math.PI / 2, -Math.PI / 2 + progress[i] * Math.PI * 2)
        ctx.strokeStyle = `rgba(${d.rgb},0.90)`; ctx.lineWidth = 3.5; ctx.stroke()
        ctx.lineCap = 'butt'

        // Leading glow dot at arc tip
        const tipA = -Math.PI / 2 + progress[i] * Math.PI * 2
        const tipX = ringCx + Math.cos(tipA) * ringR
        const tipY = ringCy + Math.sin(tipA) * ringR
        const tg = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 7)
        tg.addColorStop(0, `rgba(${d.rgb},0.8)`); tg.addColorStop(1, `rgba(${d.rgb},0)`)
        ctx.beginPath(); ctx.arc(tipX, tipY, 7, 0, 6.28); ctx.fillStyle = tg; ctx.fill()

        // Percentage inside ring
        ctx.font = `bold ${Math.max(8, Math.round(ringR * 0.55))}px system-ui,sans-serif`
        ctx.fillStyle = `rgba(${d.rgb},0.95)`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(Math.round(progress[i] * 100) + '%', ringCx, ringCy)

        // Domain name above ring
        ctx.font = `bold ${Math.max(7, Math.round(cardH * 0.115))}px system-ui,sans-serif`
        ctx.fillStyle = 'rgba(255,255,255,0.85)'
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'
        ctx.fillText(d.name, x + cardW / 2, y + cardH * 0.26)

        // Enrolled count below ring
        const cnt = Math.round(d.count * Math.min(1, progress[i] / (d.target || 1) + 0.01))
        ctx.font = `${Math.max(6, Math.round(cardH * 0.09))}px system-ui,sans-serif`
        ctx.fillStyle = `rgba(${d.rgb},0.58)`
        ctx.textBaseline = 'top'
        ctx.fillText(`${cnt.toLocaleString()} enrolled`, x + cardW / 2, y + cardH * 0.80)
      })

      // Feed area divider
      const feedY = H - feedH + 2
      ctx.strokeStyle = 'rgba(6,148,209,0.14)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(padX, feedY - 4); ctx.lineTo(W - padX, feedY - 4); ctx.stroke()

      // Spawn new cert entry every 2 seconds
      if (now - lastCertTime > 2000) {
        lastCertTime = now
        certDisplayed.unshift({ text: CERTS[certIdx % CERTS.length], alpha: 0, y: feedY + 10 })
        certIdx++
        if (certDisplayed.length > 2) certDisplayed.pop()
      }

      // Draw scrolling cert feed
      certDisplayed.forEach((entry, idx) => {
        entry.alpha = Math.min(1, entry.alpha + 0.05)
        const targetY = feedY + 6 + idx * 22
        entry.y += (targetY - entry.y) * 0.15

        ctx.beginPath(); ctx.arc(padX + 7, entry.y, 5.5, 0, 6.28)
        ctx.fillStyle = `rgba(16,185,129,${entry.alpha * 0.85})`; ctx.fill()
        ctx.font = 'bold 7.5px system-ui,sans-serif'
        ctx.fillStyle = `rgba(255,255,255,${entry.alpha})`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText('✓', padX + 7, entry.y)

        ctx.font = '9px system-ui,sans-serif'
        ctx.fillStyle = `rgba(255,255,255,${entry.alpha * 0.78})`
        ctx.textAlign = 'left'
        ctx.fillText(entry.text, padX + 18, entry.y)
      })

      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        display: 'block', width: '100%', height: 420,
        borderRadius: 16, border: '1px solid rgba(6,148,209,0.22)',
      }}
    />
  )
}

/* ── Reusable inline bento grid (fills its parent) ── */
function BentoGrid() {
  return (
    <div
      className="h-full w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 8,
      }}
    >
      <BentoCard label="GEN AI" style={{ gridColumn: 1, gridRow: 1 }}>
        <CanvasNeuralNet />
      </BentoCard>
      <BentoCard label="MANAGEMENT" style={{ gridColumn: 2, gridRow: '1 / 3' }}>
        <CanvasManagement />
      </BentoCard>
      <BentoCard label="FINANCE" style={{ gridColumn: 3, gridRow: 1 }}>
        <CanvasFinance />
      </BentoCard>
      <BentoCard label="DATA SCIENCE" style={{ gridColumn: 1, gridRow: 2 }}>
        <CanvasDataScience />
      </BentoCard>
      <div style={{ gridColumn: 3, gridRow: 2, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <BentoCard label="TECHNOLOGY" style={{ flex: 1 }}>
          <CanvasTechnology />
        </BentoCard>
        <BentoCard label="FUNCTIONAL SKILLS" style={{ flex: 1 }}>
          <CanvasPuzzle />
        </BentoCard>
      </div>
    </div>
  )
}

/* ── Hero right panel: bento background + stats centered on top ── */
function HeroRightPanel() {
  return (
    <div className="w-full flex-shrink-0 lg:w-[440px] xl:w-[480px]">
      {/* Mobile — plain stats only */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {STATS.map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.2)' }}>
            <div className="text-3xl font-black" style={{ color: '#38bdf8' }}>{s.num}</div>
            <div className="mt-1 text-sm text-white/60">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Desktop — bento fills the box, stats float centered on top */}
      <div className="relative hidden lg:block" style={{ height: 420 }}>
        {/* Layer 1: bento animation */}
        <BentoGrid />

        {/* Layer 2: stat boxes float centered over the bento */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-3">
            {STATS.map(s => (
              <div
                key={s.label}
                className="rounded-2xl text-center"
                style={{
                  background: 'rgba(6,12,24,0.80)',
                  border: '1.5px solid rgba(6,148,209,0.55)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  boxShadow: '0 0 32px rgba(6,148,209,0.25), 0 8px 40px rgba(0,0,0,0.55)',
                  padding: '22px 18px',
                  minWidth: 140,
                }}
              >
                <div
                  className="text-3xl font-black leading-none"
                  style={{ color: '#38bdf8', textShadow: '0 0 24px rgba(56,189,248,0.6)' }}
                >
                  {s.num}
                </div>
                <div className="mt-2 text-xs font-semibold text-white/65">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Bento grid wrapper (kept for reference) ── */
function HeroBentoAnimation() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-end"
      style={{ pointerEvents: 'none', padding: '18px 22px 18px 0' }}
    >
      <div
        className="hidden lg:grid h-full w-[400px] xl:w-[450px]"
        style={{
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 9,
          maxHeight: 445,
          opacity: 0.92,
        }}
      >
        {/* GEN AI — top-left */}
        <BentoCard label="GEN AI" style={{ gridColumn: 1, gridRow: 1 }}>
          <CanvasNeuralNet />
        </BentoCard>

        {/* MANAGEMENT — center, spans both rows */}
        <BentoCard label="MANAGEMENT" style={{ gridColumn: 2, gridRow: '1 / 3' }}>
          <CanvasManagement />
        </BentoCard>

        {/* FINANCE — top-right */}
        <BentoCard label="FINANCE" style={{ gridColumn: 3, gridRow: 1 }}>
          <CanvasFinance />
        </BentoCard>

        {/* DATA SCIENCE — bottom-left */}
        <BentoCard label="DATA SCIENCE" style={{ gridColumn: 1, gridRow: 2 }}>
          <CanvasDataScience />
        </BentoCard>

        {/* Bottom-right: TECHNOLOGY + FUNCTIONAL SKILLS stacked */}
        <div style={{ gridColumn: 3, gridRow: 2, display: 'flex', flexDirection: 'column', gap: 9 }}>
          <BentoCard label="TECHNOLOGY" style={{ flex: 1 }}>
            <CanvasTechnology />
          </BentoCard>
          <BentoCard label="FUNCTIONAL SKILLS" style={{ flex: 1 }}>
            <CanvasPuzzle />
          </BentoCard>
        </div>
      </div>
    </div>
  )
}

/* (old globe stub — replaced) */
function HeroGlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let rot = 0

    // Major training-hub cities [lat, lng]
    const CITIES = [
      { lat: 51.5,  lng:   0.0 }, // London
      { lat: 40.7,  lng: -74.0 }, // New York
      { lat: 25.2,  lng:  55.3 }, // Dubai
      { lat:  1.3,  lng: 103.8 }, // Singapore
      { lat:-33.8,  lng: 151.2 }, // Sydney
      { lat: 43.7,  lng: -79.4 }, // Toronto
      { lat: 28.6,  lng:  77.2 }, // Delhi
      { lat: 35.7,  lng: 139.7 }, // Tokyo
      { lat: 50.1,  lng:   8.7 }, // Frankfurt
      { lat:-26.2,  lng:  28.0 }, // Johannesburg
      { lat:-23.5,  lng: -46.6 }, // São Paulo
      { lat: 55.7,  lng:  37.6 }, // Moscow
    ]

    // Pairs that shoot training arcs between each other
    const CONN = [
      [0,2],[0,1],[0,8],[1,5],[2,3],[2,6],
      [3,4],[3,7],[0,9],[1,10],[7,3],[8,11],
    ]
    const connState = CONN.map(() => ({
      t: Math.random(),
      spd: 0.0022 + Math.random() * 0.003,
    }))

    const R2D = (d: number) => d * Math.PI / 180

    function proj(lat: number, lng: number, R: number, cx: number, cy: number) {
      const φ = R2D(lat), λ = R2D(lng) + rot
      return {
        sx: cx + Math.cos(φ) * Math.cos(λ) * R,
        sy: cy - Math.sin(φ) * R,
        z:  Math.cos(φ) * Math.sin(λ),
      }
    }

    function slerp(la1: number, lo1: number, la2: number, lo2: number, t: number) {
      const φ1=R2D(la1), λ1=R2D(lo1), φ2=R2D(la2), λ2=R2D(lo2)
      const ax=Math.cos(φ1)*Math.cos(λ1), ay=Math.sin(φ1), az=Math.cos(φ1)*Math.sin(λ1)
      const bx=Math.cos(φ2)*Math.cos(λ2), by=Math.sin(φ2), bz=Math.cos(φ2)*Math.sin(λ2)
      const dot=Math.min(1,Math.max(-1,ax*bx+ay*by+az*bz))
      const θ=Math.acos(dot)
      if(θ<0.001) return {lat:la1,lng:lo1}
      const s=Math.sin(θ)
      const w1=Math.sin((1-t)*θ)/s, w2=Math.sin(t*θ)/s
      return {
        lat: Math.asin(w1*ay+w2*by)*180/Math.PI,
        lng: Math.atan2(w1*az+w2*bz, w1*ax+w2*bx)*180/Math.PI,
      }
    }

    function resize() {
      const r = canvas.getBoundingClientRect()
      canvas.width  = r.width
      canvas.height = r.height
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      rot += 0.0018

      const mobile = W < 768
      const R  = mobile ? Math.min(W * 0.41, H * 0.40) : Math.min(W * 0.27, H * 0.46)
      const cx = mobile ? W * 0.5 : W * 0.675
      const cy = H * 0.5

      // ── Outer atmospheric glow ──
      const aura = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.42)
      aura.addColorStop(0,   'rgba(6,148,209,0.18)')
      aura.addColorStop(0.5, 'rgba(6,148,209,0.07)')
      aura.addColorStop(1,   'rgba(6,148,209,0)')
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.42, 0, Math.PI * 2)
      ctx.fillStyle = aura; ctx.fill()

      // ── Sphere fill ──
      const sf = ctx.createRadialGradient(cx - R*0.28, cy - R*0.28, R*0.04, cx, cy, R)
      sf.addColorStop(0,   'rgba(6,148,209,0.13)')
      sf.addColorStop(0.5, 'rgba(7,109,157,0.06)')
      sf.addColorStop(1,   'rgba(6,17,30,0.0)')
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = sf; ctx.fill()

      // ── Back-face grid (low opacity) ──
      ctx.lineWidth = 0.5
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath(); let first = true
        for (let lng = -180; lng <= 180; lng += 5) {
          const p = proj(lat, lng, R, cx, cy)
          if (p.z < 0) { first ? ctx.moveTo(p.sx,p.sy) : ctx.lineTo(p.sx,p.sy); first=false }
          else first = true
        }
        ctx.strokeStyle = 'rgba(6,148,209,0.08)'; ctx.stroke()
      }
      for (let lng = -180; lng < 180; lng += 20) {
        ctx.beginPath(); let first = true
        for (let lat = -90; lat <= 90; lat += 5) {
          const p = proj(lat, lng, R, cx, cy)
          if (p.z < 0) { first ? ctx.moveTo(p.sx,p.sy) : ctx.lineTo(p.sx,p.sy); first=false }
          else first = true
        }
        ctx.strokeStyle = 'rgba(6,148,209,0.08)'; ctx.stroke()
      }

      // ── Sphere rim ──
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(6,148,209,0.5)'; ctx.lineWidth = 1.4; ctx.stroke()

      // ── Front-face grid (brighter) ──
      ctx.lineWidth = 0.55
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath(); let first = true
        for (let lng = -180; lng <= 180; lng += 5) {
          const p = proj(lat, lng, R, cx, cy)
          if (p.z >= 0) { first ? ctx.moveTo(p.sx,p.sy) : ctx.lineTo(p.sx,p.sy); first=false }
          else first = true
        }
        ctx.strokeStyle = 'rgba(6,148,209,0.28)'; ctx.stroke()
      }
      for (let lng = -180; lng < 180; lng += 20) {
        ctx.beginPath(); let first = true
        for (let lat = -90; lat <= 90; lat += 5) {
          const p = proj(lat, lng, R, cx, cy)
          if (p.z >= 0) { first ? ctx.moveTo(p.sx,p.sy) : ctx.lineTo(p.sx,p.sy); first=false }
          else first = true
        }
        ctx.strokeStyle = 'rgba(6,148,209,0.28)'; ctx.stroke()
      }

      // ── Training arcs ──
      const now = Date.now() * 0.001
      CONN.forEach((c, i) => {
        connState[i].t += connState[i].spd
        if (connState[i].t > 1.35) connState[i].t = -0.12

        const t    = connState[i].t
        const head = Math.min(1, t)
        const tail = Math.max(0, t - 0.22)
        if (head <= 0 || tail >= 1) return

        const c1 = CITIES[c[0]], c2 = CITIES[c[1]]
        const STEPS = 64
        type Pt = { sx:number; sy:number; z:number; frac:number }
        const pts: Pt[] = []

        for (let j = 0; j <= STEPS; j++) {
          const st = j / STEPS
          if (st < tail || st > head) continue
          const ip   = slerp(c1.lat, c1.lng, c2.lat, c2.lng, st)
          const lift = 1 + 0.16 * Math.sin(st * Math.PI)   // arc bows outward at midpoint
          const φ = R2D(ip.lat), λ = R2D(ip.lng) + rot
          pts.push({
            sx: cx + Math.cos(φ) * Math.cos(λ) * R * lift,
            sy: cy - Math.sin(φ) * R * lift,
            z:  Math.cos(φ) * Math.sin(λ),
            frac: (st - tail) / Math.max(0.001, head - tail),
          })
        }
        if (pts.length < 2) return

        // Draw arc segments with gradient alpha (dim tail → bright head)
        for (let j = 1; j < pts.length; j++) {
          if (pts[j-1].z < -0.05 || pts[j].z < -0.05) continue
          const alpha = 0.15 + pts[j].frac * 0.82
          ctx.beginPath()
          ctx.moveTo(pts[j-1].sx, pts[j-1].sy)
          ctx.lineTo(pts[j].sx,   pts[j].sy)
          ctx.strokeStyle = `rgba(56,189,248,${alpha})`
          ctx.lineWidth = 1.8; ctx.stroke()
        }

        // Leading glowing dot
        const last = pts[pts.length - 1]
        if (last && last.z >= -0.05) {
          const hg = ctx.createRadialGradient(last.sx, last.sy, 0, last.sx, last.sy, 10)
          hg.addColorStop(0,   'rgba(255,255,255,1)')
          hg.addColorStop(0.25,'rgba(56,189,248,0.9)')
          hg.addColorStop(1,   'rgba(6,148,209,0)')
          ctx.beginPath(); ctx.arc(last.sx, last.sy, 10, 0, Math.PI * 2)
          ctx.fillStyle = hg; ctx.fill()
          ctx.beginPath(); ctx.arc(last.sx, last.sy, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = 'white'; ctx.fill()
        }
      })

      // ── City dots with pulsing rings ──
      CITIES.forEach((city, ci) => {
        const p = proj(city.lat, city.lng, R, cx, cy)
        if (p.z < 0) return
        const pulse = 0.5 + 0.5 * Math.sin(now * 2.4 + ci * 1.35)

        // Outer pulse ring
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 5 + pulse * 5.5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(6,148,209,${0.38 * pulse})`
        ctx.lineWidth = 1; ctx.stroke()

        // Inner ring
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 3.5 + pulse * 2, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(56,189,248,${0.22 * pulse})`
        ctx.lineWidth = 0.8; ctx.stroke()

        // Core dot
        const dg = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, 4.5)
        dg.addColorStop(0,   'rgba(255,255,255,1)')
        dg.addColorStop(0.45,'rgba(56,189,248,1)')
        dg.addColorStop(1,   'rgba(6,148,209,0.7)')
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 4, 0, Math.PI * 2)
        ctx.fillStyle = dg; ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}

/* ─── Component ──────────────────────────────────────────── */

export default function EnterprisePage() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [entMorphIdx, setEntMorphIdx] = useState(0)
  const [entMorphExiting, setEntMorphExiting] = useState(false)

  // Scroll-triggered fade-ins (same pattern as homepage)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('io-visible')
        else e.target.classList.remove('io-visible')
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.io-fade').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cycle = setInterval(() => {
      setEntMorphExiting(true)
      setTimeout(() => {
        setEntMorphIdx(i => (i + 1) % ENT_MORPH_WORDS.length)
        setEntMorphExiting(false)
      }, 380)
    }, 2800)
    return () => clearInterval(cycle)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#06111E', fontFamily: "'GT Walsheim Pro', sans-serif" }}>

      {/* ── Global styles & keyframes (same as homepage) ── */}
      <style>{`
        /* ── Hero illustration ── */
        @keyframes entIllSpin    { to { transform: rotate(360deg); } }
        @keyframes entIllSpinRev { to { transform: rotate(-360deg); } }
        @keyframes entIllOrb     { 0%,100%{box-shadow:0 0 35px rgba(6,148,209,0.32),0 0 70px rgba(6,148,209,0.10)} 50%{box-shadow:0 0 58px rgba(6,148,209,0.55),0 0 110px rgba(6,148,209,0.20)} }
        @keyframes entIllFloatA  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes entIllFloatB  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes entIllFloatC  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes entIllLiveDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.25;transform:scale(0.5)} }
        @keyframes entIllBeam    { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
        .ent-ill-spin     { animation: entIllSpin 20s linear infinite; }
        .ent-ill-spin-rev { animation: entIllSpinRev 13s linear infinite; }
        .ent-ill-orb      { animation: entIllOrb 3.8s ease-in-out infinite; }
        .ent-ill-float-a  { animation: entIllFloatA 5s ease-in-out infinite; }
        .ent-ill-float-b  { animation: entIllFloatB 6.5s ease-in-out infinite 0.9s; }
        .ent-ill-float-c  { animation: entIllFloatC 4.5s ease-in-out infinite 1.6s; }
        .ent-ill-live-dot { animation: entIllLiveDot 1.4s ease-in-out infinite; }

        /* Morphing hero word (same as homepage) */
        @keyframes entMorphIn  { from { opacity:0; filter:blur(10px); transform:translateY(14px);  } to { opacity:1; filter:blur(0); transform:translateY(0); } }
        @keyframes entMorphOut { from { opacity:1; filter:blur(0);    transform:translateY(0);     } to { opacity:0; filter:blur(10px); transform:translateY(-14px); } }
        .ent-morph-in  { animation: entMorphIn  0.52s cubic-bezier(0.22,1,0.36,1) both; }
        .ent-morph-out { animation: entMorphOut 0.34s ease-in both; }

        /* Scroll-triggered fade-in-up */
        .io-fade { opacity: 0; transform: translateY(12px); transition: opacity 0.22s ease-out, transform 0.22s ease-out; }
        .io-fade.io-visible { opacity: 1; transform: translateY(0); }
        .io-fade.delay-1 { transition-delay: 0.04s; }
        .io-fade.delay-2 { transition-delay: 0.08s; }
        .io-fade.delay-3 { transition-delay: 0.12s; }
        .io-fade.delay-4 { transition-delay: 0.16s; }
        .io-fade.delay-5 { transition-delay: 0.20s; }
        .io-fade.delay-6 { transition-delay: 0.24s; }

        /* Infinite client logo marquee */
        @keyframes ent-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ent-marquee-track { animation: ent-marquee 55s linear infinite; display:flex; width:max-content; }
        .ent-marquee-track:hover { animation-play-state: paused; }
        .ent-marquee-wrap { overflow:hidden; mask-image:linear-gradient(to right,transparent 0,black 80px,black calc(100% - 80px),transparent 100%); -webkit-mask-image:linear-gradient(to right,transparent 0,black 80px,black calc(100% - 80px),transparent 100%); }

        /* Hero blob floats (same as homepage) */
        @keyframes entBlob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.95)} }
        @keyframes entBlob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-35px,25px) scale(1.08)} 66%{transform:translate(25px,-15px) scale(0.92)} }
        @keyframes entBlob3 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,40px) scale(1.05)} 66%{transform:translate(-30px,-20px) scale(1.1)} }
        .ent-blob1 { animation: entBlob1 12s ease-in-out infinite; }
        .ent-blob2 { animation: entBlob2 16s ease-in-out infinite; }
        .ent-blob3 { animation: entBlob3 20s ease-in-out infinite; }

        /* Gradient shimmer on dark banners (same as homepage diff-banner) */
        @keyframes entShimmer { 0%{transform:translateX(-110%) skewX(-18deg)} 100%{transform:translateX(220%) skewX(-18deg)} }
        .ent-shimmer { position:relative; overflow:hidden; }
        .ent-shimmer::after { content:''; position:absolute; top:0; left:0; height:100%; width:40%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent); animation:entShimmer 5s ease-in-out infinite; pointer-events:none; border-radius:inherit; }

        /* ROI stat pop */
        @keyframes entStatPop { 0%{opacity:0;transform:scale(0.6) translateY(8px)} 70%{transform:scale(1.06)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        .ent-stat-pop { opacity:0; }
        .ent-stat-pop.io-visible { animation: entStatPop 0.65s cubic-bezier(0.34,1.56,0.64,1) both; }
        .ent-stat-pop.io-visible.d1 { animation-delay:0.05s; }
        .ent-stat-pop.io-visible.d2 { animation-delay:0.18s; }
        .ent-stat-pop.io-visible.d3 { animation-delay:0.31s; }
        .ent-stat-pop.io-visible.d4 { animation-delay:0.44s; }

        /* Industry card hover glow */
        .ent-ind-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .ent-ind-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(6,148,209,0.2), 0 0 0 1px rgba(6,148,209,0.5); }

        /* How-it-works card */
        @keyframes entHiwIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .ent-hiw-card { opacity:0; }
        .ent-hiw-card.io-visible { animation: entHiwIn 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .ent-hiw-card.io-visible.d1 { animation-delay:0.05s; }
        .ent-hiw-card.io-visible.d2 { animation-delay:0.15s; }
        .ent-hiw-card.io-visible.d3 { animation-delay:0.25s; }
        .ent-hiw-card.io-visible.d4 { animation-delay:0.35s; }

        /* FAQ accordion */
        .ent-faq-answer { max-height:0; overflow:hidden; transition: max-height 0.38s cubic-bezier(0.22,1,0.36,1), opacity 0.28s ease; opacity:0; }
        .ent-faq-answer.open { max-height:300px; opacity:1; }

        /* CTA button shine sweep (same as homepage search-btn) */
        @keyframes entBtnShine {
          0%   { background-position: -200% center; }
          30%  { background-position: 200% center; }
          100% { background-position: 200% center; }
        }
        .ent-cta-btn {
          background: linear-gradient(135deg,#0694D1,#076D9D);
          background-image: linear-gradient(135deg,#0694D1,#076D9D), linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.55) 50%,transparent 60%);
          background-image: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.52) 50%,transparent 60%), linear-gradient(135deg,#0694D1,#076D9D);
          background-size: 200% 100%, 100% 100%;
          background-position: -200% center, 0 0;
          animation: entBtnShine 2.4s ease-in-out infinite;
          box-shadow: 0 0 18px rgba(6,148,209,0.45), 0 4px 24px rgba(6,148,209,0.25);
          transition: box-shadow 0.2s ease, opacity 0.2s ease;
        }
        .ent-cta-btn:hover {
          box-shadow: 0 0 28px rgba(6,148,209,0.65), 0 6px 32px rgba(6,148,209,0.35);
          opacity: 0.95;
        }

        /* Gradient text */
        .ent-grad-text { background: linear-gradient(135deg,#0694D1,#38bdf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        /* White section gradient text */
        .ent-dark-grad-text { background: linear-gradient(135deg,#076D9D,#0694D1); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        /* Pointer */
        a, button, [role="button"] { cursor: pointer !important; }

        @media (max-width: 480px) {
          .ent-blob1,.ent-blob2,.ent-blob3 { animation: none !important; }
        }
      `}</style>

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 px-4 lg:px-[50px]" style={{ background: 'rgba(6,17,30,0.94)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between py-3">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div style={{ background: '#ffffff', borderRadius: '6px', padding: '8px' }}>
              <Image src="/images/koenig-logo.svg" alt="Koenig Solutions" width={120} height={32} className="h-7 w-auto lg:h-8" />
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {/* Individual / Enterprise toggle */}
            <div className="hidden lg:flex rounded-xl p-0.5" style={{ background: 'rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.30)' }}>
              <Link
                href="/"
                className="rounded-lg px-3 py-1.5 text-xs font-normal transition-all"
                style={{ color: 'rgba(255,255,255,0.55)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#38bdf8'; (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                Individual
              </Link>
              <span className="rounded-lg px-3 py-1.5 text-xs font-normal text-white" style={{ background: '#0694D1', boxShadow: '0 0 10px rgba(6,148,209,0.40)' }}>
                Enterprise
              </span>
            </div>
            <a href="#contact" className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: '#0694D1' }}>
              Get in Touch
            </a>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════
           EXISTING SECTIONS (unchanged)
      ════════════════════════════════════════════════════════ */}

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 lg:px-[50px] py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <ParticleBanner />
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
              <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-6xl">
                Upskill Your Workforce<br />
                <span
                  key={entMorphIdx}
                  className={`inline-block ${entMorphExiting ? 'ent-morph-out' : 'ent-morph-in'}`}
                  style={{ color: '#38bdf8', textShadow: '0 0 28px rgba(56,189,248,0.85), 0 0 55px rgba(6,148,209,0.45)' }}
                >
                  {ENT_MORPH_WORDS[entMorphIdx]}
                </span>
              </h1>
              <p className="mb-8 max-w-xl text-base text-white/65 lg:text-lg">
                Tailored IT certification programmes for enterprises across 195+ countries. From needs assessment to certified outcomes — Koenig handles everything, so your team stays focused on what matters.
              </p>
              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                <a href="#contact" className="ent-cta-btn rounded-xl px-7 py-3.5 text-base font-bold text-white">
                  Get a Free Consultation
                </a>
                <a href="mailto:enterprise@koenig-solutions.com" className="rounded-xl border px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
                  enterprise@koenig-solutions.com
                </a>
              </div>

              {/* Stats — all 4 in one row below the CTAs */}
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                {STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center rounded-xl px-5 py-3 text-center"
                    style={{
                      background: 'rgba(6,148,209,0.08)',
                      border: '1px solid rgba(6,148,209,0.22)',
                      backdropFilter: 'blur(10px)',
                      minWidth: 100,
                    }}
                  >
                    <span className="text-xl font-black leading-none" style={{ color: '#38bdf8' }}>{s.num}</span>
                    <span className="mt-1 text-[11px] font-medium leading-tight text-white/55">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — bento canvas animations */}
            <div className="hidden w-full flex-shrink-0 lg:block lg:w-[420px] xl:w-[460px]" style={{ height: 420 }}>
              <BentoGrid />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           NEW SECTION 1 — Trusted by Global Enterprises (WHITE)
           Inspired by Simplilearn's client marquee strip
      ════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-[50px]">
          <div className="io-fade mb-10 text-center">
            <p className="mb-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: '#0694D1' }}>Trusted Worldwide</p>
            <h2 className="text-2xl font-bold lg:text-3xl" style={{ color: '#093148' }}>
              Training <span className="ent-dark-grad-text">Fortune 500 Teams</span> & Global Enterprises
            </h2>
            <p className="mt-2 text-sm" style={{ color: '#4a7a9b' }}>From startups to multinationals — 1,000+ organisations choose Koenig for their workforce upskilling.</p>
          </div>
        </div>
        <div className="ent-marquee-wrap py-2">
          <div className="ent-marquee-track gap-6 px-6">
            {[...ENTERPRISE_CLIENTS, ...ENTERPRISE_CLIENTS].map((c, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-4"
                style={{ height: '72px', minWidth: '160px', border: '1.5px solid #CAEFFF', boxShadow: '0 2px 8px rgba(6,148,209,0.07)' }}
              >
                <img
                  src={`/images/companies/${encodeURIComponent(c.img)}`}
                  alt={c.name}
                  className="max-h-9 max-w-[120px] object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Trust badges */}
        <div className="mx-auto mt-10 max-w-7xl px-4 lg:px-[50px]">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: '🏆', text: 'Microsoft Training Partner of the Year 2025' },
              { icon: '✅', text: 'Certified Great Place to Work 2011–2025' },
              { icon: '🌍', text: 'Training delivered in 195+ Countries' },
              { icon: '⭐', text: '4.9/5 Average Client Satisfaction Score' },
            ].map((b, i) => (
              <div key={i} className="io-fade flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ background: '#F0FAFF', border: '1px solid #CAEFFF', color: '#093148' }}>
                <span>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADDE Framework (existing, unchanged) ── */}
      <section className="px-4 lg:px-[50px] py-20" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Our Methodology</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">The Koenig <span style={{ color: '#38bdf8' }}>A.D.D.E.</span> Framework</h2>
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

      {/* ════════════════════════════════════════════════════════
           NEW SECTION 2 — Industries We Serve (DARK NAVY)
           Inspired by Simplilearn's industry verticals section
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 px-4 lg:px-[50px]" style={{ background: '#093148' }}>
        {/* Blob decorations (same as homepage) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="ent-blob1 absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #0694D1, transparent)' }} />
          <div className="ent-blob2 absolute -bottom-24 -left-24 h-80 w-80 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #38bdf8, transparent)' }} />
          <div className="ent-blob3 absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #076D9D, transparent)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="io-fade mb-12 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#38bdf8' }}>Sector Expertise</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">Industries We <span style={{ color: '#38bdf8' }}>Specialise In</span></h2>
            <p className="mt-3 max-w-2xl mx-auto text-base text-white/55">Deep domain knowledge across the sectors that depend most on certified IT expertise — delivered with precision, at scale.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <div
                key={i}
                className={`ent-ind-card io-fade delay-${i + 1} rounded-2xl p-6`}
                style={{ background: 'rgba(6,148,209,0.07)', border: '1px solid rgba(6,148,209,0.2)', backdropFilter: 'blur(8px)' }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(6,148,209,0.25), rgba(7,109,157,0.35))', border: '1px solid rgba(6,148,209,0.3)' }}>
                  <svg className="h-6 w-6" style={{ color: '#38bdf8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">{ind.icon}</svg>
                </div>
                <h3 className="mb-2 text-base font-bold text-white">{ind.name}</h3>
                <p className="mb-4 text-sm leading-relaxed text-white/55">{ind.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {ind.tags.map(tag => (
                    <span key={tag} className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'rgba(6,148,209,0.15)', color: '#38bdf8', border: '1px solid rgba(6,148,209,0.25)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Training Domains (existing, unchanged) ── */}
      <section className="px-4 lg:px-[50px] py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>What We Train</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">5,000+ Courses Across <span style={{ color: '#38bdf8' }}>8 Core Domains</span></h2>
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

      {/* ════════════════════════════════════════════════════════
           NEW SECTION 3 — Training ROI & Business Impact (WHITE)
           Inspired by Simplilearn's impact/metrics section
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 px-4 lg:px-[50px] bg-white">
        {/* Subtle background gradient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="ent-blob1 absolute -top-20 -right-20 h-80 w-80 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #0694D1, transparent)' }} />
          <div className="ent-blob2 absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #076D9D, transparent)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="io-fade mb-14 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#0694D1' }}>Proven Results</p>
            <h2 className="text-3xl font-bold lg:text-4xl" style={{ color: '#093148' }}>
              The Business Impact of <span className="ent-dark-grad-text">Koenig Enterprise Training</span>
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: '#4a7a9b' }}>Numbers that matter to L&D leaders, CISOs, and CFOs alike — backed by 30+ years of enterprise outcomes.</p>
          </div>
          {/* ROI Metric Cards */}
          <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ROI_METRICS.map((m, i) => (
              <div
                key={i}
                className={`ent-stat-pop io-fade d${i + 1} rounded-2xl p-7 text-center`}
                style={{ background: 'linear-gradient(135deg,#F0FAFF,#EBF8FE)', border: '1.5px solid #CAEFFF', boxShadow: '0 4px 20px rgba(6,148,209,0.1)' }}
              >
                <div className="mb-2 text-4xl font-black lg:text-5xl ent-dark-grad-text">{m.value}</div>
                <p className="mb-1 text-sm font-bold" style={{ color: '#093148' }}>{m.label}</p>
                <p className="text-xs" style={{ color: '#4a7a9b' }}>{m.sub}</p>
              </div>
            ))}
          </div>
          {/* Two-column benefit strip */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '📊', title: 'Dedicated L&D Dashboard', desc: 'Real-time visibility into team progress, certification status, and upcoming sessions — all in one portal.' },
              { icon: '🔒', title: 'Compliance-Ready Training', desc: 'Audit-friendly reports for ISO, SOC 2, GDPR, and HIPAA compliance requirements available on demand.' },
              { icon: '💬', title: 'Dedicated Account Manager', desc: 'A single point of contact handles scheduling, logistics, and escalation — zero admin burden on your team.' },
              { icon: '🌐', title: 'Multi-Region Delivery', desc: 'Run identical programmes across APAC, EMEA, and Americas simultaneously with region-specific instructors.' },
              { icon: '🎓', title: 'Vendor-Certified Instructors', desc: 'Every trainer holds active vendor certs and real-world experience — no theory-only instructors, ever.' },
              { icon: '📅', title: 'Guaranteed Schedule',       desc: 'Every confirmed batch runs. No last-minute cancellations. Your team plans around training, not the other way.' },
            ].map((b, i) => (
              <div key={i} className={`io-fade delay-${i + 1} flex gap-4 rounded-xl p-5`} style={{ border: '1px solid #CAEFFF', background: '#F8FCFF' }}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg" style={{ background: '#EBF8FE', border: '1px solid #CAEFFF' }}>{b.icon}</div>
                <div>
                  <h4 className="mb-1 text-sm font-bold" style={{ color: '#093148' }}>{b.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#4a7a9b' }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Koenig (existing, unchanged) ── */}
      <section className="px-4 lg:px-[50px] py-20" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Why Enterprises Choose Us</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">The Koenig <span style={{ color: '#38bdf8' }}>Difference</span></h2>
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

      {/* ════════════════════════════════════════════════════════
           NEW SECTION 4 — How Corporate Training Works (WHITE)
           Inspired by Simplilearn's "How it works" process section
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 px-4 lg:px-[50px] bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="ent-blob3 absolute top-1/3 right-0 h-72 w-72 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #0694D1, transparent)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="io-fade mb-14 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#0694D1' }}>Simple Onboarding</p>
            <h2 className="text-3xl font-bold lg:text-4xl" style={{ color: '#093148' }}>
              From Brief to Certified — <span className="ent-dark-grad-text">In 4 Simple Steps</span>
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: '#4a7a9b' }}>We handle every detail so your HR and L&D teams can focus on strategy, not logistics.</p>
          </div>
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 hidden lg:block" style={{ background: 'linear-gradient(90deg, #CAEFFF, #0694D1, #CAEFFF)' }} />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={i} className={`ent-hiw-card io-fade d${i + 1} relative flex flex-col items-center text-center`}>
                  {/* Circle number */}
                  <div
                    className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full font-black text-white text-xl shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${step.color}, #093148)`, boxShadow: `0 0 28px ${step.color}50` }}
                  >
                    {step.step}
                  </div>
                  <div className="rounded-2xl p-5 w-full" style={{ background: '#F0FAFF', border: '1.5px solid #CAEFFF' }}>
                    <div className="mb-3 flex h-10 w-10 mx-auto items-center justify-center rounded-xl" style={{ background: 'white', border: '1px solid #CAEFFF' }}>
                      <svg className="h-5 w-5" style={{ color: step.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">{step.icon}</svg>
                    </div>
                    <h3 className="mb-2 text-sm font-bold" style={{ color: '#093148' }}>{step.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#4a7a9b' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="io-fade mt-12 text-center">
            <a
              href="#contact"
              className="ent-shimmer inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 0 28px rgba(6,148,209,0.35)' }}
            >
              Start Your Programme Today
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Learning Formats (existing, unchanged) ── */}
      <section className="px-4 lg:px-[50px] py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Flexible Delivery</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">Training That Fits <span style={{ color: '#38bdf8' }}>Your Way of Working</span></h2>
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

      {/* ════════════════════════════════════════════════════════
           NEW: 2025 Technology Radar (WHITE — featured + staggered grid)
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 px-4 lg:px-[50px] bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #CAEFFF, transparent)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header row */}
          <div className="io-fade mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest" style={{ background: 'rgba(255,107,53,0.10)', border: '1px solid rgba(255,107,53,0.32)', color: '#FF6B35' }}>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF6B35]" style={{ animation: 'pulse 1.5s infinite' }} />
                Live Demand Intelligence · 2025
              </span>
              <h2 className="mt-2 text-3xl font-bold leading-tight lg:text-4xl" style={{ color: '#093148' }}>
                Technology Skills Enterprises<br className="hidden lg:block" />
                Are <span className="ent-dark-grad-text">Racing to Learn</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm lg:text-right" style={{ color: '#4a7a9b' }}>
              Demand signals from 1M+ enrolled professionals across 195+ countries. Updated quarterly.
            </p>
          </div>

          {/* Featured card + grid */}
          <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
            {/* Featured — GenAI */}
            <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl p-8" style={{ background: 'linear-gradient(145deg,#06111E 0%,#0a2440 55%,#071a30 100%)', border: '1.5px solid rgba(255,107,53,0.35)' }}>
              <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,107,53,0.05) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-widest" style={{ background: 'rgba(255,107,53,0.18)', color: '#FF6B35', border: '1px solid rgba(255,107,53,0.4)' }}>
                  🔥 #1 Trending Globally
                </span>
                <h3 className="mt-5 text-3xl font-bold leading-tight text-white">Generative AI<br />&amp; LLMs</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">Prompt engineering, RAG pipelines, fine-tuning, and responsible AI governance at enterprise scale.</p>
              </div>
              <div className="relative z-10">
                <div className="mb-4 flex items-end gap-3">
                  <span className="text-5xl font-black" style={{ color: '#FF6B35' }}>+340%</span>
                  <span className="mb-1.5 text-sm text-white/45">YoY demand</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/60">120+ Courses</span>
                  <a href="#contact" className="rounded-lg px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-80" style={{ background: 'rgba(255,107,53,0.22)', border: '1px solid rgba(255,107,53,0.45)' }}>Explore →</a>
                </div>
              </div>
            </div>

            {/* Trend cards grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
              {TECH_TRENDS.slice(1).map((t, i) => (
                <div
                  key={i}
                  className="io-fade group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: '#F4FBFF', border: '1.5px solid #CAEFFF', cursor: 'default' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#EBF8FE'; el.style.borderColor = t.accent }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#F4FBFF'; el.style.borderColor = '#CAEFFF' }}
                >
                  {/* Trend badge */}
                  <span className="mb-3 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest" style={{ background: `${t.accent}18`, color: t.accent, border: `1px solid ${t.accent}44` }}>
                    {t.label}
                  </span>
                  <h4 className="mb-1.5 text-sm font-bold leading-tight" style={{ color: '#093148' }}>{t.name}</h4>
                  <div className="mb-2 text-2xl font-black leading-none" style={{ color: t.accent }}>{t.growth}</div>
                  <p className="text-[11px] leading-relaxed" style={{ color: '#4a7a9b' }}>{t.courses} courses · YoY</p>
                  {/* animated bottom bar */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full" style={{ background: `linear-gradient(90deg,${t.accent},transparent)` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom strip */}
          <div className="io-fade mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl p-5 sm:flex-row" style={{ background: '#F0FAFF', border: '1.5px solid #CAEFFF' }}>
            <div>
              <p className="text-sm font-bold" style={{ color: '#093148' }}>Don&apos;t see your technology?</p>
              <p className="text-xs" style={{ color: '#4a7a9b' }}>We cover 5,000+ courses across 50+ vendors — our team builds custom curricula for any tech stack.</p>
            </div>
            <a href="#contact" className="shrink-0 rounded-xl px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 whitespace-nowrap" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)' }}>
              Request Custom Training
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           NEW: Vendor Certification Ecosystem (DARK NAVY — tiered rows)
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 px-4 lg:px-[50px]" style={{ background: '#093148' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(6,148,209,0.035) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="ent-blob1 absolute -top-28 -right-28 h-80 w-80 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle,#0694D1,transparent)' }} />
          <div className="ent-blob2 absolute -bottom-20 -left-20 h-72 w-72 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle,#38bdf8,transparent)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="io-fade mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#38bdf8' }}>Official Vendor Partners</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">50+ Authorised <span style={{ color: '#38bdf8' }}>Certification Partners</span></h2>
            <p className="mt-3 max-w-xl mx-auto text-sm text-white/50">Train and certify your team on the industry's most in-demand platforms — all under one roof, with one account manager.</p>
          </div>

          {/* Tier rows */}
          <div className="space-y-4">
            {([
              { tier: '🏆 ELITE', vendors: ['Microsoft', 'AWS', 'Cisco', 'VMware', 'Red Hat', 'Google Cloud'], accentColor: '#F59E0B' },
              { tier: '⭐ PREMIER', vendors: ['CompTIA', 'PMI', 'EC-Council', 'Salesforce', 'ServiceNow', 'SAP', 'Oracle'], accentColor: '#38bdf8' },
              { tier: '✅ CERTIFIED', vendors: ['IBM', 'Fortinet', 'Palo Alto Networks', 'HashiCorp', 'Nutanix', 'Juniper', 'Citrix', 'ISACA', 'AXELOS'], accentColor: '#10B981' },
            ] as { tier: string; vendors: string[]; accentColor: string }[]).map((row, ri) => (
              <div key={ri} className="io-fade overflow-hidden rounded-2xl" style={{ background: 'rgba(6,148,209,0.06)', border: '1px solid rgba(6,148,209,0.18)' }}>
                <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
                  <div className="shrink-0 lg:w-[160px]">
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: row.accentColor }}>{row.tier}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {row.vendors.map(v => (
                      <span key={v} className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:text-white" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.11)' }}>{v}</span>
                    ))}
                    <span className="rounded-full px-3.5 py-1.5 text-xs font-semibold" style={{ background: `${row.accentColor}18`, color: row.accentColor, border: `1px solid ${row.accentColor}38` }}>+ more</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mini stat strip */}
          <div className="io-fade mt-8 grid gap-4 text-center sm:grid-cols-3">
            {[['50+','Vendor Partnerships'],['300+','Certifications Available'],['94%','First-Attempt Pass Rate']].map(([n, l], i) => (
              <div key={i} className="rounded-2xl py-5" style={{ background: 'rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.25)' }}>
                <div className="text-2xl font-black" style={{ color: '#38bdf8' }}>{n}</div>
                <div className="mt-1 text-xs text-white/50">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           NEW: L&D Intelligence Dashboard (WHITE — split-screen with CSS mockup)
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 px-4 lg:px-[50px] bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="ent-blob3 absolute bottom-0 left-1/3 h-72 w-72 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle,#0694D1,transparent)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-center">
            {/* Left copy */}
            <div className="flex-1">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: '#0694D1' }}>Enterprise Reporting</p>
              <h2 className="mb-5 text-3xl font-bold leading-tight lg:text-4xl" style={{ color: '#093148' }}>
                Full Visibility Into<br /><span className="ent-dark-grad-text">Every Training Engagement</span>
              </h2>
              <p className="mb-8 text-sm leading-relaxed" style={{ color: '#4a7a9b' }}>
                Your dedicated L&amp;D portal gives HR leaders, managers, and executives real-time insight into completion, certification timelines, and measurable ROI — no spreadsheets, no chasing updates.
              </p>
              <div className="space-y-5">
                {[
                  { icon: '📊', title: 'Real-Time Progress Tracking',  desc: 'Completion rates, assessment scores, and engagement metrics per employee, team, or region.' },
                  { icon: '🏅', title: 'Certification Status Board',   desc: 'See who is certified, who is expiring, and who needs re-sit — with automated renewal reminders.' },
                  { icon: '📈', title: 'Audit-Ready ROI Reports',      desc: 'Downloadable reports aligned to ISO, SOC 2, GDPR, and HIPAA compliance frameworks.' },
                  { icon: '🔔', title: 'Smart Alerts & Escalation',    desc: 'Automatic alerts for low attendance, missed sessions, and upcoming exam deadlines.' },
                ].map((f, i) => (
                  <div key={i} className="io-fade flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg" style={{ background: '#EBF8FE', border: '1px solid #CAEFFF' }}>{f.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold" style={{ color: '#093148' }}>{f.title}</h4>
                      <p className="mt-0.5 text-xs leading-relaxed" style={{ color: '#4a7a9b' }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 0 24px rgba(6,148,209,0.28)' }}>
                Request a Platform Demo →
              </a>
            </div>

            {/* Right: CSS dashboard mockup */}
            <div className="shrink-0 w-full lg:w-[460px]">
              <div className="rounded-3xl p-6 shadow-2xl" style={{ background: '#06111E', border: '1px solid rgba(6,148,209,0.28)' }}>
                {/* Window chrome */}
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400 opacity-80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400 opacity-80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400 opacity-80" />
                  <span className="ml-3 text-[11px] text-white/30">L&D Training Portal — Koenig Enterprise</span>
                </div>
                {/* Stat row */}
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {[['847','Enrolled'],['234','Certified'],['94%','Pass Rate']].map(([v,l],i) => (
                    <div key={i} className="rounded-xl p-3 text-center" style={{ background: 'rgba(6,148,209,0.12)', border: '1px solid rgba(6,148,209,0.22)' }}>
                      <div className="text-lg font-black" style={{ color: '#38bdf8' }}>{v}</div>
                      <div className="text-[10px] text-white/45">{l}</div>
                    </div>
                  ))}
                </div>
                {/* Progress bars */}
                <div className="mb-4 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="mb-3 text-xs font-semibold text-white/50">Completion by Department</p>
                  {[{ d:'Cloud Engineering',pct:87 },{ d:'Security Ops',pct:74 },{ d:'Data Science',pct:91 },{ d:'DevOps',pct:68 }].map((r,i) => (
                    <div key={i} className="mb-2.5 last:mb-0">
                      <div className="mb-1 flex justify-between text-[10px]">
                        <span className="text-white/55">{r.d}</span>
                        <span style={{ color: '#38bdf8' }}>{r.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(6,148,209,0.15)' }}>
                        <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: 'linear-gradient(90deg,#0694D1,#38bdf8)' }} />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Exam schedule */}
                <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="mb-3 text-xs font-semibold text-white/50">Upcoming Exams</p>
                  {[{ n:'AZ-900',d:'Mar 22',s:'On Track' },{ n:'CKA',d:'Mar 28',s:'At Risk' },{ n:'CISSP',d:'Apr 3',s:'On Track' }].map((ex,i) => (
                    <div key={i} className="flex items-center justify-between border-b py-1.5 last:border-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <span className="text-xs font-semibold text-white">{ex.n}</span>
                      <span className="text-xs text-white/40">{ex.d}</span>
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: ex.s==='On Track' ? 'rgba(16,185,129,0.16)' : 'rgba(245,158,11,0.16)', color: ex.s==='On Track' ? '#10B981' : '#F59E0B' }}>{ex.s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials (existing, unchanged) ── */}
      <section className="px-4 lg:px-[50px] py-20" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Client Stories</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">Trusted by <span style={{ color: '#38bdf8' }}>Global Enterprises</span></h2>
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

      {/* ════════════════════════════════════════════════════════
           NEW SECTION 5 — FAQ (WHITE)
           Inspired by Simplilearn's FAQ accordion section
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 px-4 lg:px-[50px] bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="ent-blob1 absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #0694D1, transparent)' }} />
          <div className="ent-blob2 absolute -bottom-20 -right-20 h-64 w-64 rounded-full opacity-6 blur-3xl" style={{ background: 'radial-gradient(circle, #076D9D, transparent)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="io-fade mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#0694D1' }}>Common Questions</p>
            <h2 className="text-3xl font-bold lg:text-4xl" style={{ color: '#093148' }}>
              Everything You Need to <span className="ent-dark-grad-text">Know</span>
            </h2>
            <p className="mt-3 text-sm" style={{ color: '#4a7a9b' }}>Quick answers to the questions L&D leaders ask before launching enterprise training with Koenig.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  className="io-fade overflow-hidden rounded-2xl transition-all duration-200"
                  style={{ border: isOpen ? '1.5px solid #0694D1' : '1.5px solid #CAEFFF', background: isOpen ? '#F0FAFF' : '#FAFCFF', boxShadow: isOpen ? '0 4px 20px rgba(6,148,209,0.12)' : 'none' }}
                >
                  <button
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    <span className="text-sm font-semibold lg:text-base" style={{ color: isOpen ? '#076D9D' : '#093148' }}>{faq.q}</span>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300"
                      style={{ background: isOpen ? '#0694D1' : '#EBF8FE', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      <svg className="h-3.5 w-3.5" style={{ color: isOpen ? 'white' : '#0694D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/>
                      </svg>
                    </span>
                  </button>
                  <div className={`ent-faq-answer px-6${isOpen ? ' open' : ''}`}>
                    <p className="pb-5 text-sm leading-relaxed" style={{ color: '#4a7a9b' }}>{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="io-fade mt-10 text-center">
            <p className="mb-4 text-sm" style={{ color: '#4a7a9b' }}>Still have questions? Our enterprise team is here to help.</p>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 0 20px rgba(6,148,209,0.3)' }}>
              Talk to Our Team →
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact Form (existing, unchanged) ── */}
      <section id="contact" className="px-4 lg:px-[50px] py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Let's Talk</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">Start Your Enterprise <span style={{ color: '#38bdf8' }}>Training Journey</span></h2>
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

      {/* ── Footer (existing, unchanged) ── */}
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

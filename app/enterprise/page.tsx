'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

/* ─── Existing Data ──────────────────────────────────────── */

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

const FAQS = [
  { q: 'What is the minimum team size for enterprise training?', a: 'We accommodate teams of any size — from a single employee in 1-on-1 format to enterprise-wide rollouts of 1,000+ staff. Pricing and formats are fully customised to your headcount and objectives.' },
  { q: 'Can training be delivered at our office location?', a: 'Yes. Our Fly-Me-a-Trainer (FMAT) service deploys certified instructors directly to your premises anywhere in the world — ideal for large teams or classified environments.' },
  { q: 'How quickly can a programme be launched?', a: 'For standard certification programmes we can go from brief to live training within 48 hours. Custom-built curricula typically require 5–10 business days for instructional design.' },
  { q: 'Do you offer post-training reporting and ROI tracking?', a: 'Yes. Every enterprise engagement includes a training-completion report, certification tracking dashboard, and an optional ROI analysis aligned to your L&D KPIs.' },
  { q: 'Are all instructors vendor-certified?', a: 'Absolutely. Every Koenig instructor holds active certifications from the vendor they teach — Microsoft, AWS, Cisco, etc. — and brings a minimum of 5 years of real-world enterprise experience.' },
  { q: 'What happens if an employee does not pass their certification exam?', a: 'We include exam-prep support and, for most programmes, a complimentary re-sit session. Our 94% first-attempt pass rate means this is rarely needed — but the safety net is always there.' },
]

/* ─── Globe Animation ────────────────────────────────────── */

function HeroGlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
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

  return (
    <div className="min-h-screen" style={{ background: '#06111E', fontFamily: "'GT Walsheim Pro', sans-serif" }}>

      {/* ── Global styles & keyframes (same as homepage) ── */}
      <style>{`
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

      {/* ════════════════════════════════════════════════════════
           EXISTING SECTIONS (unchanged)
      ════════════════════════════════════════════════════════ */}

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 lg:px-[50px] py-20 lg:py-28">
        {/* Rotating globe with training-arc animation */}
        <HeroGlobeCanvas />
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

      {/* ════════════════════════════════════════════════════════
           NEW SECTION 1 — Trusted by Global Enterprises (WHITE)
           Inspired by Simplilearn's client marquee strip
      ════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-[50px]">
          <div className="io-fade mb-10 text-center">
            <p className="mb-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: '#0694D1' }}>Trusted Worldwide</p>
            <h2 className="text-2xl font-black lg:text-3xl" style={{ color: '#093148' }}>
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
            <h2 className="text-3xl font-black text-white lg:text-4xl">Industries We <span style={{ color: '#38bdf8' }}>Specialise In</span></h2>
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
            <h2 className="text-3xl font-black lg:text-4xl" style={{ color: '#093148' }}>
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
            <h2 className="text-3xl font-black lg:text-4xl" style={{ color: '#093148' }}>
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

      {/* ── Testimonials (existing, unchanged) ── */}
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
            <h2 className="text-3xl font-black lg:text-4xl" style={{ color: '#093148' }}>
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

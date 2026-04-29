'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

/* ── Course data ─────────────────────────────────────────────── */
const COURSES = [
  {
    id: 1, vendor: 'Microsoft', code: 'AZ-104T00-A',
    name: 'Microsoft Azure Administrator',
    duration: 32,
    schedules: [
      { dates: '05 – 08 May', time: '06:30 AM – 02:30 PM IST', gtr: true, highlight: true },
      { dates: '06 – 11 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '11 – 14 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '11 – 14 May', time: '09:30 PM – 05:30 AM IST', gtr: true },
    ],
  },
  {
    id: 2, vendor: 'Microsoft', code: 'AI-102T00',
    name: 'Develop AI Solutions with Azure',
    duration: 40,
    schedules: [
      { dates: '06 – 12 May', time: '09:00 AM – 05:00 PM IST', gtr: true, highlight: true },
      { dates: '19 – 25 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '02 – 08 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 3, vendor: 'Microsoft', code: 'DP-700T00',
    name: 'Microsoft Fabric Data Engineer',
    duration: 32,
    schedules: [
      { dates: '04 – 07 May', time: '12:30 PM – 08:30 PM IST', gtr: true, highlight: true },
      { dates: '18 – 21 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '01 – 04 Jun', time: '06:30 AM – 02:30 PM IST', gtr: true },
    ],
  },
  {
    id: 4, vendor: 'Microsoft', code: 'SC-300T00',
    name: 'Microsoft Identity and Access Administrator',
    duration: 32,
    schedules: [
      { dates: '04 – 07 May', time: '04:30 AM – 12:30 PM IST', gtr: true, highlight: true },
      { dates: '11 – 14 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '25 – 28 May', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 5, vendor: 'Microsoft', code: 'SC-200T00',
    name: 'Microsoft Security Operations Analyst',
    duration: 32,
    schedules: [
      { dates: '04 – 07 May', time: '03:30 AM – 11:30 AM IST', gtr: true, highlight: true },
      { dates: '18 – 21 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '01 – 04 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 6, vendor: 'Microsoft', code: 'DP-600T00',
    name: 'Microsoft Fabric Analytics Engineer',
    duration: 32,
    schedules: [
      { dates: '24 – 27 Aug', time: '12:30 PM – 08:30 PM IST', gtr: true, highlight: true },
      { dates: '08 – 11 Sep', time: '09:00 AM – 05:00 PM IST', gtr: true },
    ],
  },
  {
    id: 7, vendor: 'Microsoft', code: 'AZ-204T00',
    name: 'Developing Solutions for Microsoft Azure',
    duration: 40,
    schedules: [
      { dates: '06 – 12 May', time: '09:00 AM – 05:00 PM IST', gtr: true, highlight: true },
      { dates: '19 – 25 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '02 – 08 Jun', time: '09:00 AM – 05:00 PM IST', gtr: true },
    ],
  },
  {
    id: 8, vendor: 'Microsoft', code: 'AZ-305T00',
    name: 'Designing Microsoft Azure Infrastructure Solutions',
    duration: 32,
    schedules: [
      { dates: '06 – 11 May', time: '09:00 AM – 05:00 PM IST', gtr: true, highlight: true },
      { dates: '19 – 23 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '02 – 06 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 9, vendor: 'PMI', code: 'PMP',
    name: 'Project Management Professional (PMP®) Certification Training',
    duration: 40,
    schedules: [
      { dates: '04 – 08 May', time: '11:30 AM – 07:30 PM IST', gtr: true, highlight: true },
      { dates: '18 – 22 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '01 – 05 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 10, vendor: 'Microsoft', code: 'PL-300T00',
    name: 'Power BI Dashboard in a Day',
    duration: 8,
    schedules: [
      { dates: '14 May', time: '04:30 AM – 12:30 PM IST', gtr: true, highlight: true },
      { dates: '28 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '11 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 11, vendor: 'AWS', code: 'AWS-SAA',
    name: 'AWS Certified Solutions Architect – Associate (Architecting on AWS)',
    duration: 24,
    schedules: [
      { dates: '04 – 08 May', time: '01:30 PM – 09:30 PM IST', gtr: true, highlight: true },
      { dates: '18 – 22 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '01 – 05 Jun', time: '09:00 AM – 05:00 PM IST', gtr: true },
    ],
  },
  {
    id: 12, vendor: 'AWS', code: 'AWS-COA',
    name: 'AWS Certified CloudOps Engineer – Associate (Cloud Operations on AWS)',
    duration: 24,
    schedules: [
      { dates: '11 – 13 May', time: '04:30 AM – 12:30 PM IST', gtr: true, highlight: true },
      { dates: '25 – 27 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '08 – 10 Jun', time: '01:30 PM – 09:30 PM IST', gtr: true },
    ],
  },
  {
    id: 13, vendor: 'EC-Council', code: 'CEH',
    name: 'Certified Ethical Hacker (CEH v13)',
    duration: 40,
    schedules: [
      { dates: '05 – 09 May', time: '09:00 AM – 05:00 PM IST', gtr: true, highlight: true },
      { dates: '19 – 23 May', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '02 – 06 Jun', time: '06:30 AM – 02:30 PM IST', gtr: true },
    ],
  },
  {
    id: 14, vendor: 'CompTIA', code: 'SY0-701',
    name: 'CompTIA Security+ SY0-701',
    duration: 40,
    schedules: [
      { dates: '12 – 16 May', time: '09:00 AM – 05:00 PM IST', gtr: true, highlight: true },
      { dates: '26 – 30 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '09 – 13 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 15, vendor: 'Cisco', code: 'CCNA',
    name: 'Implementing and Administering Cisco Solutions (CCNA)',
    duration: 40,
    schedules: [
      { dates: '05 – 09 May', time: '02:30 PM – 10:30 PM IST', gtr: true, highlight: true },
      { dates: '19 – 23 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '02 – 06 Jun', time: '06:30 AM – 02:30 PM IST', gtr: true },
    ],
  },
  {
    id: 16, vendor: 'PECB', code: 'ISO27001',
    name: 'ISO/IEC 27001 Lead Implementer',
    duration: 40,
    schedules: [
      { dates: '12 – 16 May', time: '09:00 AM – 05:00 PM IST', gtr: true, highlight: true },
      { dates: '26 – 30 May', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '09 – 13 Jun', time: '09:00 AM – 05:00 PM IST', gtr: true },
    ],
  },
]

const VENDOR_COLORS: Record<string, string> = {
  Microsoft: '#0078d4',
  AWS:       '#ff9900',
  PMI:       '#0d2a5e',
  'EC-Council': '#c8102e',
  CompTIA:   '#c00000',
  Cisco:     '#1ba0d7',
  PECB:      '#475569',
  Google:    '#4285F4',
}

const TRAINING_TABS = [
  { id: 'ilo',       label: 'Live Online Classroom (ILO)' },
  { id: 'fmat',      label: 'Fly-Me-a-Trainer (FMAT)'    },
  { id: 'classroom', label: 'Classroom Training'          },
  { id: '1on1',      label: '1-on-1 Training'             },
  { id: 'flexi',     label: 'Flexi Training'              },
]

const BENEFITS = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Guaranteed to Run (GTR)',
    desc: 'Every GTR batch runs as scheduled — no last-minute cancellations. Book confidently knowing your training will happen.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: '195+ Countries Covered',
    desc: 'Multiple time-zone batches (IST, GST, GMT, EST) so learners worldwide attend at a convenient local time.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Expert Certified Instructors',
    desc: 'All trainers are vendor-certified with active industry experience — not just academic knowledge.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    title: 'Live & Interactive Sessions',
    desc: 'Real-time Q&A, hands-on labs, and breakout exercises — not recorded lectures. Engage directly with your instructor.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: '5,000+ Courses Available',
    desc: 'Microsoft, AWS, Cisco, PMI, EC-Council, CompTIA, PECB and 70+ more vendors — all accessible via live online delivery.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Post-Training Support',
    desc: '30-day post-training access to course materials, plus revision class eligibility if you need to revisit any topic.',
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Choose Your Course & Batch', desc: 'Browse 5,000+ live online courses. Filter by vendor, OEM, or technology. Pick a GTR batch that fits your timezone and schedule.' },
  { step: '02', title: 'Confirm Enrollment & Get Access', desc: 'Receive instant confirmation with virtual classroom credentials, pre-reading materials, and lab access details before day one.' },
  { step: '03', title: 'Attend Live, Interactive Training', desc: 'Join your certified instructor in a real-time virtual classroom. Ask questions, complete hands-on labs, and collaborate with peers globally.' },
  { step: '04', title: 'Certify & Advance Your Career', desc: 'Receive your official course completion certificate. Sit your vendor exam with confidence and claim your new certification.' },
]

const CATEGORIES = [
  { name: 'Cloud Computing',      icon: '☁️', count: '480+', desc: 'Azure, AWS, Google Cloud, Oracle Cloud' },
  { name: 'Cybersecurity',        icon: '🔒', count: '320+', desc: 'CEH, CISSP, CompTIA Security+, CISM' },
  { name: 'Project Management',   icon: '📋', count: '140+', desc: 'PMP, PRINCE2, Agile, Scrum Master' },
  { name: 'Data & AI',            icon: '🤖', count: '260+', desc: 'AI-900, DP-900, Machine Learning, Power BI' },
  { name: 'Networking',           icon: '🌐', count: '210+', desc: 'CCNA, CCNP, CompTIA Network+, Juniper' },
  { name: 'DevOps & Cloud-Native',icon: '⚙️', count: '180+', desc: 'Kubernetes, Docker, Terraform, Jenkins' },
  { name: 'ITSM & Governance',    icon: '📊', count: '120+', desc: 'ITIL 4, COBIT, ISO 27001, ISO 20000' },
  { name: 'SAP & ERP',            icon: '🏢', count: '140+', desc: 'SAP S/4HANA, Basis, FICO, MM, SD' },
]

const FAQS = [
  {
    q: 'What is a Guaranteed to Run (GTR) batch?',
    a: 'A GTR batch is confirmed to run on the scheduled dates regardless of enrolment numbers. Once you see the GTR badge on a schedule slot, your training will not be cancelled or postponed — giving you confidence to book travel, take leave, and prepare without risk.',
  },
  {
    q: 'What equipment do I need to attend a live online class?',
    a: 'A stable internet connection (minimum 5 Mbps), a modern browser (Chrome, Edge, or Firefox), a working webcam and microphone, and any vendor-specific lab prerequisites (shared in your confirmation email). No additional software installation is typically required.',
  },
  {
    q: 'Are the sessions recorded?',
    a: 'Live sessions are not recorded to ensure full vendor compliance and participant privacy. However, you retain access to all course materials, lab guides, and official courseware for 30 days after training ends. A revision class option is also available.',
  },
  {
    q: 'What time zones do you offer classes in?',
    a: 'We run multiple daily batches covering IST (India), GST (Gulf), GMT (UK/Europe), EST (Americas), and AEST (Australia/Pacific). Each course card shows available batch timings so you can select one that works for your region.',
  },
  {
    q: 'Can my corporate team attend the same live online batch?',
    a: 'Yes. We accommodate group enrolments of any size in open GTR batches. For teams of 5 or more, we also offer dedicated private batches at a time entirely of your choosing — contact us for a corporate quote.',
  },
  {
    q: 'Is the training instructor-led or self-paced?',
    a: 'All Live Online Classroom (ILO) sessions are 100% instructor-led in real time. You interact with a certified trainer and fellow learners live. If you prefer self-paced study, ask about our Flexi Training option.',
  },
  {
    q: 'What if I miss a session?',
    a: "Koenig's Happiness Guarantee covers you. If you miss a session due to unavoidable circumstances, you can rejoin the same course in a future batch at no extra charge, subject to seat availability.",
  },
  {
    q: 'How do I get an invoice or PO for my company?',
    a: "After confirming your enrolment, our support team raises a proforma invoice within 24 hours. We accept bank transfers, credit cards, and corporate POs. Contact us via the Request Info form and select 'Enterprise' to fast-track the process.",
  },
]

const TESTIMONIALS = [
  { name: 'Ravi Mehta', location: '🇮🇳 India', course: 'AZ-104: Microsoft Azure Administrator', quote: 'The GTR guarantee meant I could plan my schedule confidently. Excellent instructor with real Azure enterprise experience.', initials: 'RM', bg: 'linear-gradient(135deg,#076D9D,#4DBFEF)' },
  { name: "James O'Brien", location: '🇬🇧 UK', course: 'CompTIA Security+ SY0-701', quote: 'Attended from London in the GMT batch — perfect timing, zero tech issues, and the labs were enterprise-grade.', initials: 'JO', bg: 'linear-gradient(135deg,#093148,#076D9D)' },
  { name: 'Farah Zahir', location: '🇦🇪 UAE', course: 'AWS Solutions Architect – Associate', quote: 'GST batch was ideal for Dubai. Passed my exam first attempt. The instructor\'s real AWS project experience made the difference.', initials: 'FZ', bg: 'linear-gradient(135deg,#FF9900,#c47a00)' },
  { name: 'Elena Mancini', location: '🇮🇹 Italy', course: 'PMP Certification Training', quote: 'Koenig\'s live online PMP prep is the best I found. Interactive sessions, practice exams, and a trainer who answered every question.', initials: 'EM', bg: 'linear-gradient(135deg,#0d2a5e,#076D9D)' },
  { name: 'Ahmed Al-Rashid', location: '🇸🇦 Saudi Arabia', course: 'CEH v13 – Certified Ethical Hacker', quote: 'Completed CEH live online in one intensive week. Hands-on labs in a real virtual environment — no sandbox limitations.', initials: 'AA', bg: 'linear-gradient(135deg,#c8102e,#f47920)' },
  { name: 'Priya Sharma', location: '🇸🇬 Singapore', course: 'ISO/IEC 27001 Lead Implementer', quote: 'The PECB course content was thorough. Live online format meant I could attend from Singapore without travel costs.', initials: 'PS', bg: 'linear-gradient(135deg,#475569,#076D9D)' },
]

/* ── Course Card ─────────────────────────────────────────────── */
function CourseCard({ course }: { course: typeof COURSES[0] }) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? course.schedules : course.schedules.slice(0, 1)
  const color = VENDOR_COLORS[course.vendor] ?? '#0694D1'

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(6,148,209,0.16)]"
      style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 10px rgba(0,164,239,0.07)' }}>
      {/* Top accent */}
      <div className="h-0.5 w-full" style={{ backgroundColor: color }} />

      <div className="flex flex-col flex-1 p-4">
        {/* Vendor */}
        <p className="text-[11px] font-semibold mb-1" style={{ color: '#7a8c96' }}>{course.vendor}</p>

        {/* Title */}
        <h3 className="text-sm font-bold leading-snug mb-4" style={{ color: '#0F172A' }}>
          {course.code}: {course.name}
        </h3>

        {/* Course Contents pill */}
        <div className="flex justify-center mb-3">
          <button className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors hover:bg-[#0694D1] hover:text-white hover:border-[#0694D1]"
            style={{ borderColor: '#0694D1', color: '#0694D1' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Course Contents
          </button>
        </div>

        {/* Duration */}
        <div className="flex items-center justify-center gap-1.5 mb-3 text-xs" style={{ color: '#475569' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          Duration : <span className="font-semibold">{course.duration} hr</span>
        </div>

        {/* Schedule slots */}
        <div className="flex flex-col gap-1.5 mb-2">
          {visible.map((s, i) => (
            <div key={i} className="rounded-lg px-3 py-2 text-xs"
              style={s.highlight
                ? { background: 'linear-gradient(135deg, rgba(6,148,209,0.12), rgba(56,189,248,0.1))', border: '1px solid rgba(6,148,209,0.35)' }
                : { background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div className="flex items-center gap-1 font-semibold mb-0.5" style={{ color: s.highlight ? '#0694D1' : '#0F172A' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {s.dates}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px]" style={{ color: '#475569' }}>
                  <span className="flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {s.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    Online
                  </span>
                </div>
                {s.gtr && (
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold rounded-full px-1.5 py-0.5"
                    style={{ background: 'rgba(6,148,209,0.1)', color: '#0694D1', border: '1px solid rgba(6,148,209,0.25)' }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    GTR
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show More Dates */}
        {course.schedules.length > 1 && (
          <button onClick={() => setShowAll(p => !p)}
            className="text-[11px] font-semibold mb-3 self-center transition-colors hover:text-[#0694D1]"
            style={{ color: '#475569' }}>
            {showAll ? 'Show Less ↑' : `Show More Dates ↓`}
          </button>
        )}
      </div>

      {/* CTAs */}
      <div className="px-4 pb-4 flex flex-col gap-2 mt-auto">
        <button className="w-full rounded-xl py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)' }}>
          Request Price
        </button>
        <button className="w-full rounded-xl py-2.5 text-sm font-semibold transition-colors hover:bg-[#0694D1] hover:text-white"
          style={{ border: '1px solid #CAEFFF', color: '#0694D1', background: 'white' }}>
          More Details
        </button>
      </div>
    </div>
  )
}

/* ── FAQ Item ─────────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #CAEFFF' }}>
      <button onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#F0FAFF]"
        style={{ background: open ? '#EBF8FE' : 'white' }}>
        <span className="text-sm font-semibold pr-4" style={{ color: '#0F172A' }}>{q}</span>
        <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform"
          style={{ background: open ? '#0694D1' : '#EBF8FE', transform: open ? 'rotate(45deg)' : 'none' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? 'white' : '#0694D1'} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </span>
      </button>
      <div style={{ maxHeight: open ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <p className="px-5 py-4 text-sm leading-relaxed" style={{ color: '#475569', borderTop: '1px solid #EBF8FE' }}>{a}</p>
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function LiveOnlineClassroomPage() {
  const [activeTab, setActiveTab] = useState('ilo')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [formType, setFormType] = useState<'individual' | 'enterprise'>('individual')
  const PER_PAGE = 12

  const filtered = COURSES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.vendor.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #EBF8FE 0%, #ddf1fb 40%, #f0faff 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]" style={{ background: '#0694D1' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 blur-[90px]" style={{ background: '#38bdf8' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
                style={{ background: 'rgba(6,148,209,0.12)', color: '#0694D1', border: '1px solid rgba(6,148,209,0.25)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0694D1] animate-pulse" />
                Live Instructor-Led Training — Guaranteed to Run
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{ color: '#06111E' }}>
                Master In-Demand Skills.<br />
                <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Live Online. Anywhere.
                </span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: '#475569' }}>
                Learn from expert instructors with our 5,000+ course catalogue. Upskill conveniently, from the comfort of your own space — with sessions Guaranteed to Run.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { val: '5,000+', label: 'Courses' },
                  { val: '195+',   label: 'Countries' },
                  { val: '5M+',    label: 'Learners' },
                  { val: 'GTR',    label: 'Guaranteed' },
                ].map(s => (
                  <div key={s.label} className="flex flex-col items-center px-4 py-2 rounded-xl"
                    style={{ background: 'white', border: '1px solid #CAEFFF', boxShadow: '0 2px 8px rgba(6,148,209,0.08)' }}>
                    <span className="text-lg font-black leading-none" style={{ color: '#0694D1' }}>{s.val}</span>
                    <span className="text-[10px] font-medium mt-0.5" style={{ color: '#7a8c96' }}>{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#schedule" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)' }}>
                  View Upcoming Batches
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="#request" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-colors hover:bg-[#0694D1] hover:text-white"
                  style={{ border: '1.5px solid #0694D1', color: '#0694D1', background: 'white' }}>
                  Request Info
                </a>
              </div>
            </div>

            {/* Right — illustration + trust badges */}
            <div className="hidden lg:flex flex-col items-center gap-6">
              <div className="relative w-80 h-80 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(6,148,209,0.12), rgba(56,189,248,0.08))', border: '2px solid rgba(6,148,209,0.2)' }}>
                <svg width="160" height="160" viewBox="0 0 200 200" fill="none">
                  <rect x="20" y="40" width="160" height="100" rx="12" fill="#0694D1" fillOpacity="0.12" stroke="#0694D1" strokeWidth="2"/>
                  <rect x="30" y="50" width="140" height="80" rx="8" fill="white"/>
                  <rect x="40" y="60" width="120" height="60" rx="6" fill="#EBF8FE"/>
                  <circle cx="100" cy="90" r="18" fill="#0694D1" fillOpacity="0.15" stroke="#0694D1" strokeWidth="1.5"/>
                  <polygon points="94,82 94,98 110,90" fill="#0694D1"/>
                  <rect x="35" y="148" width="130" height="4" rx="2" fill="#0694D1" fillOpacity="0.2"/>
                  <rect x="60" y="152" width="80" height="16" rx="3" fill="#0694D1" fillOpacity="0.1"/>
                  <circle cx="48" cy="170" r="10" fill="#0694D1" fillOpacity="0.15"/>
                  <circle cx="152" cy="170" r="10" fill="#0694D1" fillOpacity="0.15"/>
                  <rect x="25" y="165" width="28" height="18" rx="4" fill="#0694D1" fillOpacity="0.08" stroke="#0694D1" strokeWidth="1"/>
                  <rect x="147" y="165" width="28" height="18" rx="4" fill="#0694D1" fillOpacity="0.08" stroke="#0694D1" strokeWidth="1"/>
                  <circle cx="160" cy="50" r="14" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5"/>
                  <polyline points="154,50 159,55 168,44" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 rounded-xl px-3 py-2 text-center shadow-lg"
                  style={{ background: 'white', border: '1px solid #CAEFFF' }}>
                  <p className="text-xs font-black" style={{ color: '#0694D1' }}>GTR</p>
                  <p className="text-[9px] font-medium" style={{ color: '#7a8c96' }}>Guaranteed</p>
                </div>
                <div className="absolute -bottom-4 -left-4 rounded-xl px-3 py-2 text-center shadow-lg"
                  style={{ background: 'white', border: '1px solid #CAEFFF' }}>
                  <p className="text-xs font-black" style={{ color: '#0694D1' }}>195+</p>
                  <p className="text-[9px] font-medium" style={{ color: '#7a8c96' }}>Countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRAINING MODE TABS ───────────────────────────────── */}
      <section className="bg-white border-b" style={{ borderColor: '#E2E8F0' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {TRAINING_TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className="whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0"
                style={{
                  background:   activeTab === t.id ? 'linear-gradient(135deg, #0694D1, #076D9D)' : 'transparent',
                  color:        activeTab === t.id ? 'white' : '#475569',
                  border:       activeTab === t.id ? 'none' : '1px solid #E2E8F0',
                }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-16" style={{ background: 'linear-gradient(135deg, #f0faff 0%, #fff 60%, #EBF8FE 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#06111E' }}>
              Why Choose{' '}
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Live Online Training
              </span>{' '}with Koenig?
            </h2>
            <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: '#7a8c96' }}>
              Real instructors, real labs, real results — all from your desk. Here's what sets Koenig's ILO apart.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map(b => (
              <div key={b.title} className="group flex gap-4 items-start p-5 rounded-2xl bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(6,148,209,0.12)]"
                style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 8px rgba(6,148,209,0.06)' }}>
                <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.18)' }}>
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: '#0F172A' }}>{b.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING SCHEDULE ────────────────────────────────── */}
      <section id="schedule" className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#06111E' }}>
              Upcoming Schedule of{' '}
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Guaranteed to Run
              </span>{' '}Classes
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#7a8c96' }}>
              {filtered.length} courses available — filter by vendor, OEM, or technology
            </p>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text" placeholder="Search Course, Vendor or Code…"
                value={search} onChange={e => { setSearch(e.target.value); setPage(0) }}
                className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none"
                style={{ border: '1px solid #CAEFFF', background: '#F8FBFF', color: '#0F172A' }}
              />
            </div>
            <div className="flex gap-2">
              {['Filter by OEM', 'Filter by Technology', 'IST'].map(f => (
                <button key={f} className="rounded-xl px-3 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors hover:bg-[#0694D1] hover:text-white"
                  style={{ border: '1px solid #CAEFFF', color: '#0694D1', background: 'white' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* GTR legend */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-1"
              style={{ background: 'rgba(6,148,209,0.1)', color: '#0694D1', border: '1px solid rgba(6,148,209,0.25)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              GTR
            </span>
            <span className="text-xs" style={{ color: '#7a8c96' }}>= Guaranteed to Run — this batch will not be cancelled</span>
          </div>

          {/* Course grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginated.map(c => <CourseCard key={c.id} course={c} />)}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                style={{ border: '1px solid #CAEFFF', color: '#0694D1', background: 'white' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i)}
                  className="w-9 h-9 rounded-full text-sm font-semibold transition-all"
                  style={i === page
                    ? { background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: 'white', border: 'none' }
                    : { border: '1px solid #CAEFFF', color: '#475569', background: 'white' }}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                style={{ border: '1px solid #CAEFFF', color: 'white', background: 'linear-gradient(135deg,#0694D1,#076D9D)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-12 sm:py-16" style={{ background: 'linear-gradient(135deg, #06111E 0%, #093148 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              How Live Online Training{' '}
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Works
              </span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>From enrolment to certification in four simple steps</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((s, i) => (
              <div key={s.step} className="relative flex flex-col gap-3 rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', color: 'white' }}>
                  {s.step}
                </div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-9 left-full w-full h-px -translate-x-5 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, rgba(6,148,209,0.4), transparent)' }} />
                )}
                <h3 className="font-bold text-sm text-white">{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINING CATEGORIES ──────────────────────────────── */}
      <section className="py-12 sm:py-16" style={{ background: 'linear-gradient(135deg, #f0faff 0%, #fff 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#06111E' }}>
              Popular{' '}
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Training Categories
              </span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#7a8c96' }}>
              5,000+ live online courses across the technologies that matter most in 2026
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(c => (
              <div key={c.name} className="group flex flex-col gap-2 p-4 rounded-2xl bg-white cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(6,148,209,0.14)]"
                style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 8px rgba(6,148,209,0.06)' }}>
                <div className="text-2xl">{c.icon}</div>
                <h3 className="font-bold text-sm leading-snug" style={{ color: '#0F172A' }}>{c.name}</h3>
                <p className="text-[11px] leading-snug" style={{ color: '#64748B' }}>{c.desc}</p>
                <span className="text-xs font-bold mt-auto" style={{ color: '#0694D1' }}>{c.count} Courses →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#06111E' }}>
              What Our{' '}
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Students Say
              </span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#7a8c96' }}>
              18,400+ verified reviews — 4.9/5 average rating
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="flex flex-col bg-white rounded-2xl overflow-hidden"
                style={{ border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
                <div className="flex-1 p-5">
                  <div className="text-yellow-400 text-xs mb-3">★★★★★</div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#2d4a6a' }}>"{t.quote}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: t.bg }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-tight" style={{ color: '#093148' }}>{t.name}</p>
                      <p className="text-xs font-semibold" style={{ color: '#0694D1' }}>{t.location}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: '#E8F4FA', background: '#F8FCFF' }}>
                  <p className="text-xs font-bold truncate pr-2" style={{ color: '#093148' }}>{t.course}</p>
                  <span className="shrink-0 rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: '#E8F4FA', color: '#0569a8' }}>✓ Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16" style={{ background: 'linear-gradient(180deg, #f0faff 0%, #fff 100%)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#06111E' }}>
              Frequently Asked{' '}
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Questions
              </span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#7a8c96' }}>
              Everything you need to know about Live Online Classroom training with Koenig
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── REQUEST INFO FORM ────────────────────────────────── */}
      <section id="request" className="py-12 sm:py-16" style={{ background: 'linear-gradient(135deg, #EBF8FE 0%, #ddf1fb 100%)' }}>
        <div className="mx-auto max-w-2xl px-4 md:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10" style={{ border: '1px solid #CAEFFF', boxShadow: '0 8px 40px rgba(6,148,209,0.12)' }}>
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2" style={{ color: '#06111E' }}>
              Request for more information
            </h2>
            <p className="text-sm text-center mb-6" style={{ color: '#7a8c96' }}>
              Our team will respond within 24 hours with batch options and pricing.
            </p>

            {/* Contact method */}
            <div className="flex justify-center gap-3 mb-5">
              {['Email 📧', 'WhatsApp 💬'].map(m => (
                <button key={m} className="rounded-full px-5 py-2 text-sm font-semibold transition-colors hover:bg-[#0694D1] hover:text-white"
                  style={{ border: '1px solid #CAEFFF', color: '#0694D1', background: 'white' }}>
                  {m}
                </button>
              ))}
            </div>

            {/* Type toggle */}
            <div className="flex justify-center gap-6 mb-6">
              {(['individual', 'enterprise'] as const).map(t => (
                <label key={t} className="flex items-center gap-2 cursor-pointer text-sm font-medium capitalize" style={{ color: '#475569' }}>
                  <input type="radio" checked={formType === t} onChange={() => setFormType(t)}
                    className="accent-[#0694D1]" />
                  {t}
                </label>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <input placeholder="Full Name *" className="rounded-xl px-4 py-3 text-sm outline-none w-full"
                style={{ border: '1px solid #CAEFFF', background: '#F8FBFF', color: '#0F172A' }} />
              <input placeholder="Business Email *" type="email" className="rounded-xl px-4 py-3 text-sm outline-none w-full"
                style={{ border: '1px solid #CAEFFF', background: '#F8FBFF', color: '#0F172A' }} />
              <input placeholder="Phone" type="tel" className="rounded-xl px-4 py-3 text-sm outline-none w-full"
                style={{ border: '1px solid #CAEFFF', background: '#F8FBFF', color: '#0F172A' }} />
              <select className="rounded-xl px-4 py-3 text-sm outline-none w-full"
                style={{ border: '1px solid #CAEFFF', background: '#F8FBFF', color: '#475569' }}>
                <option value="">Select Course Name</option>
                {COURSES.map(c => <option key={c.id} value={c.id}>{c.code}: {c.name}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <select className="rounded-xl px-4 py-3 text-sm outline-none w-full"
                style={{ border: '1px solid #CAEFFF', background: '#F8FBFF', color: '#475569' }}>
                <option value="">How did you hear about us? — Select Option</option>
                <option>Google Search</option>
                <option>LinkedIn</option>
                <option>Colleague / Referral</option>
                <option>Email Newsletter</option>
                <option>Social Media</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-5">
              <textarea placeholder="Tell us more about your Training Request" rows={4}
                className="rounded-xl px-4 py-3 text-sm outline-none w-full resize-none"
                style={{ border: '1px solid #CAEFFF', background: '#F8FBFF', color: '#0F172A' }} />
            </div>

            {/* reCAPTCHA placeholder */}
            <div className="flex items-center gap-3 mb-5 rounded-xl px-4 py-3"
              style={{ border: '1px solid #CAEFFF', background: '#F8FBFF' }}>
              <input type="checkbox" className="w-4 h-4 accent-[#0694D1]" />
              <span className="text-sm" style={{ color: '#475569' }}>I&apos;m not a robot</span>
              <div className="ml-auto text-right">
                <p className="text-[9px] font-bold" style={{ color: '#4A90D9' }}>reCAPTCHA</p>
                <p className="text-[8px]" style={{ color: '#9AA5B1' }}>Privacy · Terms</p>
              </div>
            </div>

            <button className="w-full rounded-2xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)' }}>
              Submit
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

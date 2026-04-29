'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

/* ── Course data ─────────────────────────────────────────────── */
const COURSES = [
  {
    id: 1, vendor: 'Microsoft', code: 'AZ-104T00-A',
    name: 'Microsoft Azure Administrator',
    duration: 32,
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.9, enrolled: '2,100+', price: '$1,245',
    schedules: [
      { dates: '05 – 08 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '06 – 11 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '11 – 14 May', time: '09:30 PM – 05:30 AM IST', gtr: true },
    ],
  },
  {
    id: 2, vendor: 'Microsoft', code: 'AI-102T00',
    name: 'Designing and Implementing a Microsoft Azure AI Solution',
    duration: 40,
    tags: ['ASSOCIATE'], rating: 4.8, enrolled: '960+', price: '$995',
    schedules: [
      { dates: '06 – 12 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '19 – 25 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '02 – 08 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 3, vendor: 'Microsoft', code: 'DP-700T00',
    name: 'Microsoft Fabric Data Engineer',
    duration: 32,
    tags: ['ASSOCIATE'], rating: 4.8, enrolled: '720+', price: '$995',
    schedules: [
      { dates: '04 – 07 May', time: '12:30 PM – 08:30 PM IST', gtr: true },
      { dates: '18 – 21 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '01 – 04 Jun', time: '06:30 AM – 02:30 PM IST', gtr: true },
    ],
  },
  {
    id: 4, vendor: 'Microsoft', code: 'SC-300T00',
    name: 'Microsoft Identity and Access Administrator',
    duration: 32,
    tags: ['ASSOCIATE'], rating: 4.7, enrolled: '840+', price: '$996',
    schedules: [
      { dates: '04 – 07 May', time: '04:30 AM – 12:30 PM IST', gtr: true },
      { dates: '11 – 14 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '25 – 28 May', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 5, vendor: 'Microsoft', code: 'SC-200T00',
    name: 'Microsoft Security Operations Analyst',
    duration: 32,
    tags: ['ASSOCIATE'], rating: 4.8, enrolled: '780+', price: '$996',
    schedules: [
      { dates: '04 – 07 May', time: '03:30 AM – 11:30 AM IST', gtr: true },
      { dates: '18 – 21 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '01 – 04 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 6, vendor: 'Microsoft', code: 'DP-600T00',
    name: 'Microsoft Fabric Analytics Engineer',
    duration: 32,
    tags: ['ASSOCIATE'], rating: 4.7, enrolled: '560+', price: '$995',
    schedules: [
      { dates: '24 – 27 Aug', time: '12:30 PM – 08:30 PM IST', gtr: true },
      { dates: '08 – 11 Sep', time: '09:00 AM – 05:00 PM IST', gtr: true },
    ],
  },
  {
    id: 7, vendor: 'Microsoft', code: 'AZ-204T00',
    name: 'Developing Solutions for Microsoft Azure',
    duration: 40,
    tags: ['EXPERT'], rating: 4.8, enrolled: '1,100+', price: '$1,245',
    schedules: [
      { dates: '06 – 12 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '19 – 25 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '02 – 08 Jun', time: '09:00 AM – 05:00 PM IST', gtr: true },
    ],
  },
  {
    id: 8, vendor: 'Microsoft', code: 'AZ-305T00',
    name: 'Designing Microsoft Azure Infrastructure Solutions',
    duration: 32,
    tags: ['EXPERT'], rating: 4.8, enrolled: '980+', price: '$1,245',
    schedules: [
      { dates: '06 – 11 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '19 – 23 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '02 – 06 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 9, vendor: 'PMI', code: 'PMP',
    name: 'Project Management Professional (PMP®) Certification Training',
    duration: 40,
    tags: ['POPULAR', 'EXPERT'], rating: 4.9, enrolled: '2,600+', price: '$1,095',
    schedules: [
      { dates: '04 – 08 May', time: '11:30 AM – 07:30 PM IST', gtr: true },
      { dates: '18 – 22 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '01 – 05 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 10, vendor: 'Microsoft', code: 'PL-300T00',
    name: 'Microsoft Power BI Data Analyst',
    duration: 8,
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.9, enrolled: '1,800+', price: '$398',
    schedules: [
      { dates: '14 May', time: '04:30 AM – 12:30 PM IST', gtr: true },
      { dates: '28 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '11 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 11, vendor: 'AWS', code: 'AWS-SAA-C03',
    name: 'AWS Certified Solutions Architect – Associate (Architecting on AWS)',
    duration: 24,
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.9, enrolled: '1,900+', price: '$1,395',
    schedules: [
      { dates: '04 – 08 May', time: '01:30 PM – 09:30 PM IST', gtr: true },
      { dates: '18 – 22 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '01 – 05 Jun', time: '09:00 AM – 05:00 PM IST', gtr: true },
    ],
  },
  {
    id: 12, vendor: 'AWS', code: 'AWS-COA-C02',
    name: 'AWS Certified CloudOps Engineer – Associate (Cloud Operations on AWS)',
    duration: 24,
    tags: ['ASSOCIATE'], rating: 4.7, enrolled: '720+', price: '$1,195',
    schedules: [
      { dates: '11 – 13 May', time: '04:30 AM – 12:30 PM IST', gtr: true },
      { dates: '25 – 27 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '08 – 10 Jun', time: '01:30 PM – 09:30 PM IST', gtr: true },
    ],
  },
  {
    id: 13, vendor: 'EC-Council', code: 'CEH-v13',
    name: 'Certified Ethical Hacker (CEH v13)',
    duration: 40,
    tags: ['POPULAR', 'EXPERT'], rating: 4.9, enrolled: '2,200+', price: '$1,350',
    schedules: [
      { dates: '05 – 09 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '19 – 23 May', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '02 – 06 Jun', time: '06:30 AM – 02:30 PM IST', gtr: true },
    ],
  },
  {
    id: 14, vendor: 'CompTIA', code: 'SY0-701',
    name: 'CompTIA Security+ SY0-701',
    duration: 40,
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.8, enrolled: '3,100+', price: '$945',
    schedules: [
      { dates: '12 – 16 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '26 – 30 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '09 – 13 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 15, vendor: 'Cisco', code: 'CCNA-200-301',
    name: 'Implementing and Administering Cisco Solutions (CCNA)',
    duration: 40,
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.8, enrolled: '2,400+', price: '$995',
    schedules: [
      { dates: '05 – 09 May', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '19 – 23 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '02 – 06 Jun', time: '06:30 AM – 02:30 PM IST', gtr: true },
    ],
  },
  {
    id: 16, vendor: 'PECB', code: 'ISO-27001-LI',
    name: 'ISO/IEC 27001 Lead Implementer',
    duration: 40,
    tags: ['EXPERT'], rating: 4.8, enrolled: '1,200+', price: '$1,295',
    schedules: [
      { dates: '12 – 16 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '26 – 30 May', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '09 – 13 Jun', time: '09:00 AM – 05:00 PM IST', gtr: true },
    ],
  },
]

const TAG_STYLES: Record<string, { bg: string; color: string; dot?: boolean }> = {
  POPULAR:     { bg: '#06111E',              color: 'white',    dot: true  },
  ASSOCIATE:   { bg: 'rgba(6,148,209,0.12)', color: '#0694D1'              },
  EXPERT:      { bg: 'rgba(234,88,12,0.12)', color: '#ea580c'              },
  FUNDAMENTALS:{ bg: 'rgba(6,148,209,0.12)', color: '#0694D1'              },
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
    q: 'How do I register for a Live Online Training session?',
    a: 'Simply choose your preferred date from the batches mentioned above. Click on "Register Now" and enter your details to secure your spot. Our team will confirm your enrolment and send virtual classroom credentials within 24 hours.',
  },
  {
    q: 'What technology do I need to participate in Live Online Training?',
    a: 'For Live Online Training, all you need is a stable internet connection and a laptop or PC. No specialist hardware is required. Any vendor-specific lab prerequisites will be shared in your enrolment confirmation email before day one.',
  },
  {
    q: 'Can I interact with the instructor and other participants during the session?',
    a: 'Absolutely! Live Online Training shines with two key benefits: instant doubt resolution and student interaction. You can ask questions in real time, participate in breakout exercises, and collaborate with fellow learners from around the world — just like a physical classroom.',
  },
  {
    q: 'Are Live Online Training sessions recorded?',
    a: 'Yes, you can access recordings of most Live Online Training sessions through the LET Platform for future reference. This ensures you never miss a concept, even if you need to step away momentarily during a session.',
  },
  {
    q: 'What is your cancellation and refund policy for Live Online Training?',
    a: "Koenig Solutions offers a flexible rescheduling and cancellation policy. If you need to reschedule, simply contact our support team and we'll find the next available GTR batch for you at no extra charge. For full details on refunds, please refer to our Terms of Service.",
  },
  {
    q: 'How can I provide feedback on my Live Online Training experience?',
    a: "Your feedback matters! We'll ask you to complete a short feedback form on the first and last day of training. This helps us continuously improve our delivery quality, instructor performance, and course content.",
  },
  {
    q: 'How can I find courses that are Guaranteed to Run?',
    a: 'All the courses listed on this page are Guaranteed-to-Run (GTR). Look for the GTR badge on any schedule slot — it means that batch is confirmed to run regardless of enrolment numbers, giving you full confidence to plan your schedule.',
  },
  {
    q: 'What happens if I cannot attend a class I am enrolled in?',
    a: "Koenig Solutions offers a flexible rescheduling policy. If you're unable to attend, contact us as early as possible and we'll transfer you to the next available batch for the same course. Our Happiness Guarantee ensures your learning journey continues without extra cost.",
  },
]

const TESTIMONIALS = [
  {
    name: 'Adham Al Mayasi', location: '🇴🇲 Oman',
    quote: 'Your exceptional skills as a trainer, dedication, expertise, and unwavering commitment are truly inspiring. The live online sessions felt just as engaging as classroom training.',
    initials: 'AA', bg: 'linear-gradient(135deg,#076D9D,#4DBFEF)',
  },
  {
    name: 'Emmanuel Masabo', location: '🇷🇼 Rwanda',
    quote: 'The trainer is very organized and helped us understand difficult concepts simply. Content delivery was perfect — the live online format made it easy to follow from Kigali.',
    initials: 'EM', bg: 'linear-gradient(135deg,#093148,#076D9D)',
  },
  {
    name: 'Yoosuf Nizam', location: '🇲🇻 Maldives',
    quote: "This trainer is undoubtedly one of the finest I have encountered. His profound knowledge makes complex concepts accessible. The GTR guarantee meant I could plan around the confirmed schedule.",
    initials: 'YN', bg: 'linear-gradient(135deg,#F47920,#f6a05c)',
  },
  {
    name: 'Anacleto Francisco da Rosa', location: '🇦🇴 Angola',
    quote: 'The teacher is very friendly, knowledgeable, and passionate. Excellent hands-on training experience — the live labs worked flawlessly even on my connection from Luanda.',
    initials: 'AF', bg: 'linear-gradient(135deg,#076D9D,#093148)',
  },
  {
    name: 'David Muriuki', location: '🇰🇪 Kenya',
    quote: 'His pedagogical skills were exceptional, blending professionalism with deep subject matter understanding throughout. Live online delivery from Nairobi was seamless.',
    initials: 'DM', bg: 'linear-gradient(135deg,#34A853,#076D9D)',
  },
  {
    name: 'Fredrick Fiifi Arthur', location: '🇬🇭 Ghana',
    quote: 'Your passion and expertise in teaching Power BI have been incredibly motivating and empowering. The interactive sessions made every module click into place immediately.',
    initials: 'FA', bg: 'linear-gradient(135deg,#F2C811,#0694d1)',
  },
  {
    name: 'Amjaad Kushar', location: '🇸🇦 Saudi Arabia',
    quote: 'I would like to express my sincere appreciation for such an outstanding learning experience. The GST-time batch was perfectly scheduled for the Gulf region.',
    initials: 'AK', bg: 'linear-gradient(135deg,#093148,#F47920)',
  },
  {
    name: 'Monica Kalamula', location: '🇲🇼 Malawi',
    quote: 'The instructor possessed deep understanding, translating complex ideas into easily digestible information effectively. Koenig live online truly bridges the gap across continents.',
    initials: 'MK', bg: 'linear-gradient(135deg,#476D8D,#0694D1)',
  },
  {
    name: 'Emanuel Bento Mahina', location: '🇦🇴 Angola',
    quote: 'I received one of the best trainings with exceptional security expertise. Highly motivated and well-prepared instructor who kept the live online sessions energetic from start to finish.',
    initials: 'EB', bg: 'linear-gradient(135deg,#c8102e,#f47920)',
  },
]

/* ── Course Card ─────────────────────────────────────────────── */
function CourseCard({ course, onEnroll }: { course: typeof COURSES[0]; onEnroll: () => void }) {
  const daysFromHours = Math.ceil(course.duration / 8)
  const nextBatch = course.schedules[0]

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(6,148,209,0.16)]"
      style={{ border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
      <div className="flex flex-col flex-1 p-5">
        {/* Badge row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {course.tags.map(tag => {
              const s = TAG_STYLES[tag] ?? TAG_STYLES.ASSOCIATE
              return (
                <span key={tag} className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold"
                  style={{ background: s.bg, color: s.color }}>
                  {s.dot && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color === 'white' ? 'rgba(255,255,255,0.7)' : s.color }} />}
                  {tag}
                </span>
              )
            })}
          </div>
          <button className="text-xs font-semibold whitespace-nowrap ml-2 hover:underline" style={{ color: '#0694D1' }}>
            Cert Details →
          </button>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold leading-snug mb-3" style={{ color: '#0F172A', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {course.name}
        </h3>

        {/* Code + Duration pills */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' }}>
            {course.code}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {daysFromHours} {daysFromHours === 1 ? 'day' : 'days'} · {course.duration} hrs
          </span>
        </div>

        {/* Enrolled + rating */}
        <p className="flex items-center gap-1 text-xs mb-4" style={{ color: '#64748B' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          &nbsp;{course.enrolled} enrolled &nbsp;·&nbsp; <span style={{ color: '#FBBF24' }}>★</span>&nbsp;{course.rating}
        </p>

        {/* Next GTR batch */}
        {nextBatch && (
          <div className="flex items-center gap-1.5 mb-4 rounded-lg px-3 py-2 text-xs"
            style={{ background: 'rgba(6,148,209,0.07)', border: '1px solid rgba(6,148,209,0.2)', color: '#0694D1' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span className="font-semibold">Next GTR:</span>
            <span>{nextBatch.dates}</span>
            <span className="mx-0.5">·</span>
            <span>{nextBatch.time}</span>
          </div>
        )}

        {/* Divider + Price */}
        <div className="border-t pt-3 mt-auto" style={{ borderColor: '#F1F5F9' }}>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-black" style={{ color: '#0F172A' }}>{course.price}</span>
            <span className="text-xs" style={{ color: '#94A3B8' }}>per person · USD</span>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="px-5 pb-5 flex gap-2">
        <button onClick={onEnroll} className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all hover:bg-gray-50"
          style={{ border: '1px solid #E2E8F0', color: '#374151' }}>
          Enroll Now
        </button>
        <button className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ background: '#06111E' }}>
          Learn More
        </button>
      </div>
    </div>
  )
}

/* ── Filter data ─────────────────────────────────────────────── */
const OEM_OPTIONS = ['Microsoft','AWS','PMI','EC-Council','CompTIA','Cisco','PECB','Oracle','Red Hat','VMware','SAP','Google Cloud','ISACA','ISC2']
const TECH_OPTIONS = ['Cloud Computing','Cybersecurity','Project Management','Data & AI','Networking','DevOps & Cloud-Native','ITSM & Governance','SAP & ERP','Microsoft Office 365','Microsoft SQL Server','Linux & Open Source']
const TZ_OPTIONS   = ['IST','GST','GMT','EST','CST','PST','AEST','CET','CEST','AFT','SST']

/* ── FilterDropdown ──────────────────────────────────────────── */
function FilterDropdown({
  label, options, value, onChange,
}: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen]       = useState(false)
  const [query, setQuery]     = useState('')
  const ref                   = useRef<HTMLDivElement>(null)
  const inputRef              = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50) }, [open])

  const displayed = value && value !== label ? value : label
  const filtered  = options.filter(o => o.toLowerCase().includes(query.toLowerCase()))
  const hasValue  = value && value !== label

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(p => !p)}
        className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all"
        style={{
          border:     `1px solid ${hasValue ? '#0694D1' : '#CAEFFF'}`,
          background: hasValue ? 'rgba(6,148,209,0.08)' : 'white',
          color:      hasValue ? '#0694D1' : '#475569',
          boxShadow:  hasValue ? '0 0 0 3px rgba(6,148,209,0.12)' : '0 1px 4px rgba(6,148,209,0.06)',
        }}>
        <span className="max-w-[120px] truncate">{displayed}</span>
        {hasValue && (
          <span onClick={e => { e.stopPropagation(); onChange(''); setQuery('') }}
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0694D1] text-white hover:bg-[#076D9D]">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </span>
        )}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: '#94A3B8' }}>
          <path d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 z-50 rounded-2xl overflow-hidden"
          style={{ minWidth: '200px', background: 'white', border: '1px solid #CAEFFF', boxShadow: '0 8px 32px rgba(6,148,209,0.16)' }}>
          {/* Search */}
          <div className="p-2 border-b" style={{ borderColor: '#EBF8FE' }}>
            <div className="flex items-center gap-2 rounded-lg px-3 py-1.5" style={{ background: '#F8FBFF', border: '1px solid #CAEFFF' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search…" className="flex-1 bg-transparent text-xs outline-none" style={{ color: '#0F172A' }} />
            </div>
          </div>
          {/* Options */}
          <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
            {/* Clear option */}
            <button onClick={() => { onChange(''); setQuery(''); setOpen(false) }}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors"
              style={{ color: '#0694D1', background: !hasValue ? 'rgba(6,148,209,0.06)' : 'transparent' }}>
              <span className="w-3.5 h-3.5 flex items-center justify-center">
                {!hasValue && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </span>
              {label}
            </button>
            {filtered.map(o => (
              <button key={o} onClick={() => { onChange(o); setQuery(''); setOpen(false) }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-[#F0FAFF]"
                style={{ color: value === o ? '#0694D1' : '#374151', background: value === o ? 'rgba(6,148,209,0.06)' : 'transparent', fontWeight: value === o ? 600 : 400 }}>
                <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  {value === o && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </span>
                {o}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-4 py-3 text-xs text-center" style={{ color: '#94A3B8' }}>No results</p>
            )}
          </div>
        </div>
      )}
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

/* ── Sidebar vendor data ─────────────────────────────────────── */
const SIDEBAR_VENDORS = [
  { name: 'All',        label: 'All Vendors', count: 16, bg: '#EBF8FE', color: '#0694D1', initial: '★' },
  { name: 'Microsoft',  label: 'Microsoft',   count: 9,  bg: '#E3F2FD', color: '#0078d4', initial: 'M' },
  { name: 'AWS',        label: 'AWS',         count: 2,  bg: '#FFF3E0', color: '#FF9900', initial: 'A' },
  { name: 'PMI',        label: 'PMI',         count: 1,  bg: '#EDE7F6', color: '#7c3aed', initial: 'P' },
  { name: 'EC-Council', label: 'EC-Council',  count: 1,  bg: '#FFEBEE', color: '#c8102e', initial: 'E' },
  { name: 'CompTIA',    label: 'CompTIA',     count: 1,  bg: '#FFF8E1', color: '#d97706', initial: 'C' },
  { name: 'Cisco',      label: 'Cisco',       count: 1,  bg: '#E0F7FA', color: '#1ba0d7', initial: 'C' },
  { name: 'PECB',       label: 'PECB',        count: 1,  bg: '#ECEFF1', color: '#475569', initial: 'P' },
]

const VENDOR_DESCS: Record<string, string> = {
  All:          'Browse all 16 Guaranteed-to-Run classes across Microsoft, AWS, PMI, EC-Council, CompTIA, Cisco and PECB.',
  Microsoft:    'Master Azure, AI, Security, Power BI and more — from core administration to advanced infrastructure solutions.',
  AWS:          "Build, deploy and scale on the world's most comprehensive cloud platform with AWS certified training.",
  PMI:          'Advance your project management career with PMP® exam preparation and globally recognised PMI certification.',
  'EC-Council': 'Master ethical hacking and cybersecurity with the world-renowned Certified Ethical Hacker (CEH v13).',
  CompTIA:      "Validate your IT skills with CompTIA Security+ SY0-701, the industry's leading vendor-neutral certification.",
  Cisco:        'From CCNA to CCIE — master enterprise networking with Cisco premier certified instructor-led training.',
  PECB:         'Become an ISO/IEC 27001 Lead Implementer with PECB internationally recognised certification training.',
}

/* ── Shared form data ────────────────────────────────────────── */
const HEAR_OPTIONS = [
  'Organic Search (Google/Bing/Yahoo)',
  'Paid Search Ads (Google Ads, Bing Ads)',
  'Webinars',
  'Email Outreach',
  'LinkedIn',
  'Social Media (Facebook, Instagram, X)',
  'YouTube',
  'Trustpilot',
  'Word of Mouth',
  'Existing customer referral',
  'Press release',
  'Other',
]

/* ── InquiryForm ─────────────────────────────────────────────── */
function InquiryForm({
  formType,
  setFormType,
}: {
  formType: 'individual' | 'enterprise'
  setFormType: (t: 'individual' | 'enterprise') => void
}) {
  const inputCls = 'w-full rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-white/35 transition-colors'
  const inputSty = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'white' }
  const selectSty = { background: '#0b1c2e', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.55)' }
  const optSty = { background: '#0b1c2e' }

  return (
    <>
      {/* WhatsApp / Email buttons */}
      <div className="flex gap-3 mb-5">
        <button className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition hover:bg-white/10"
          style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'white', background: 'rgba(255,255,255,0.06)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366' }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp us
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition hover:bg-white/10"
          style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'white', background: 'rgba(255,255,255,0.06)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          Email us
        </button>
      </div>

      {/* Individual / Enterprise toggle */}
      <div className="flex rounded-xl p-1 mb-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {(['individual', 'enterprise'] as const).map(t => (
          <button key={t} type="button" onClick={() => setFormType(t)}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all"
            style={formType === t
              ? { background: 'linear-gradient(135deg, #0694D1, #00B4D8)', color: 'white', boxShadow: '0 2px 12px rgba(6,148,209,0.40)' }
              : { color: 'rgba(255,255,255,0.45)', background: 'transparent' }
            }>
            {t === 'individual'
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
            }
            {t === 'individual' ? 'Individual' : 'Enterprise'}
          </button>
        ))}
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-white">Full Name <span className="text-red-400">*</span></label>
          <input className={inputCls} style={inputSty} placeholder="John Smith" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-white">
            {formType === 'enterprise' ? 'Business Email' : 'Email'} <span className="text-red-400">*</span>
          </label>
          <input className={inputCls} style={inputSty} type="email"
            placeholder={formType === 'enterprise' ? 'john@company.com' : 'john@example.com'} />
        </div>
      </div>

      {/* Phone + Course / Trainees */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-white">Phone</label>
          <input className={inputCls} style={inputSty} type="tel" placeholder="+1 (555) 000-0000" />
        </div>
        <div>
          {formType === 'enterprise' ? (
            <>
              <label className="block text-xs font-semibold mb-1.5 text-white">Number of Trainees</label>
              <input className={inputCls} style={inputSty} placeholder="e.g. 25" />
            </>
          ) : (
            <>
              <label className="block text-xs font-semibold mb-1.5 text-white">Select Course Name</label>
              <select className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={selectSty}>
                <option value="" style={optSty}>Select Course Name</option>
                {COURSES.map(c => <option key={c.id} value={c.id} style={optSty}>{c.code}: {c.name}</option>)}
              </select>
            </>
          )}
        </div>
      </div>

      {/* Source */}
      <div className="mb-3">
        <label className="block text-xs font-semibold mb-1.5 text-white">How did you hear about us?</label>
        <select className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={selectSty}>
          <option value="" style={optSty}>Select Option</option>
          {HEAR_OPTIONS.map(o => <option key={o} style={optSty}>{o}</option>)}
        </select>
      </div>

      {/* Message */}
      <div className="mb-5">
        <label className="block text-xs font-semibold mb-1.5 text-white">Tell us more about your Training Request</label>
        <textarea className={`${inputCls} resize-none`} style={inputSty} rows={4}
          placeholder="e.g. We need Azure certification for 50 engineers across 3 countries..." />
      </div>

      {/* reCAPTCHA */}
      <div className="flex justify-center mb-5">
        <div className="inline-flex items-center gap-3 rounded-xl px-5 py-3"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#0694D1' }} />
          <span className="text-sm text-white">I&apos;m not a robot</span>
          <div className="ml-4 text-right">
            <p className="text-[9px] font-bold" style={{ color: '#4A90D9' }}>reCAPTCHA</p>
            <p className="text-[8px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Privacy · Terms</p>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button type="button" className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
        style={{ background: 'linear-gradient(135deg, #0694D1, #00B4D8)', boxShadow: '0 4px 20px rgba(6,148,209,0.40)' }}>
        Submit — Get a Free Consultation
      </button>

      <p className="text-center text-xs mt-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
        We&apos;ll respond within 1 business day · No spam, ever.
      </p>
    </>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function LiveOnlineClassroomPage() {
  const [activeTab, setActiveTab]     = useState('ilo')
  const [activeVendor, setActiveVendor] = useState('All')
  const [search, setSearch]           = useState('')
  const [filterTz, setFilterTz]       = useState('')
  const [page, setPage]               = useState(0)
  const [formType, setFormType]       = useState<'individual' | 'enterprise'>('individual')
  const [showFormModal, setShowFormModal] = useState(false)
  const PER_PAGE = 9

  useEffect(() => {
    if (!showFormModal) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowFormModal(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [showFormModal])

  const filtered = COURSES.filter(c => {
    const q = search.toLowerCase()
    const matchSearch  = !q || c.name.toLowerCase().includes(q) || c.vendor.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    const matchVendor  = activeVendor === 'All' || c.vendor === activeVendor
    const matchTz      = !filterTz || c.schedules.some(s => s.time.includes(filterTz))
    return matchSearch && matchVendor && matchTz
  })
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
  const activeVendorData = SIDEBAR_VENDORS.find(v => v.name === activeVendor) ?? SIDEBAR_VENDORS[0]

  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      {/* ── FORM MODAL ───────────────────────────────────────── */}
      {showFormModal && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto" onClick={() => setShowFormModal(false)}
          style={{ background: 'rgba(4,10,20,0.82)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
          <div className="relative w-full max-w-2xl rounded-2xl"
            style={{ background: 'linear-gradient(160deg, #091828 0%, #0c1f34 100%)', border: '1px solid rgba(6,148,209,0.25)', boxShadow: '0 32px 80px rgba(0,0,0,0.65)' }}
            onClick={e => e.stopPropagation()}>

            {/* X close */}
            <button onClick={() => setShowFormModal(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <div className="px-6 sm:px-8 pt-8 pb-7">
              {/* LET'S TALK pill */}
              <div className="flex justify-center mb-4">
                <span className="rounded-full px-4 py-1 text-xs font-bold tracking-widest"
                  style={{ border: '1px solid rgba(6,148,209,0.55)', color: '#38bdf8' }}>
                  LET&apos;S TALK
                </span>
              </div>

              {/* Title */}
              <h2 className="text-center text-xl sm:text-2xl font-bold text-white mb-1">
                Request for more{' '}
                <span style={{ color: '#38bdf8' }}>information</span>
              </h2>
              <p className="text-center text-sm mb-6" style={{ color: 'rgba(255,255,255,0.42)' }}>
                Microsoft Certification Training with Koenig Solutions
              </p>

              <InquiryForm formType={formType} setFormType={setFormType} />
            </div>
          </div>
          </div>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #061624 0%, #071929 60%, #062236 100%)' }}>
        {/* Background glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-1/3 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: '#0694D1' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: '#38bdf8' }} />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full opacity-8 blur-[80px]" style={{ background: '#076D9D' }} />
        </div>

        <style>{`
          @keyframes lolFloat1 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
          @keyframes lolFloat2 { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-8px) rotate(-1deg)} }
          @keyframes lolFloat3 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(9px) translateX(3px)} }
          @keyframes lolFloat4 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(8px) rotate(1.5deg)} }
          @keyframes lolGlow   { 0%,100%{box-shadow:0 4px 18px rgba(6,109,157,0.30),inset 0 1px 0 rgba(255,255,255,0.18)} 50%{box-shadow:0 4px 28px rgba(6,148,209,0.55),0 0 16px rgba(58,182,235,0.30),inset 0 1px 0 rgba(255,255,255,0.28)} }
        `}</style>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-[50px]">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text content */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
                style={{ background: 'rgba(6,148,209,0.18)', color: '#38bdf8', border: '1px solid rgba(6,148,209,0.35)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                Live Instructor-Led Training — Guaranteed to Run
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
                <span className="block">Master In-Demand Skills.</span>
                <span className="block" style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Live Online. Anywhere.
                </span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Learn from expert instructors with our 5,000+ course catalogue. Upskill conveniently, from the comfort of your own space — with sessions Guaranteed to Run.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#schedule" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 0 20px rgba(6,148,209,0.35)' }}>
                  View Upcoming Batches
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <button onClick={() => setShowFormModal(true)} className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:bg-white/10"
                  style={{ border: '1.5px solid rgba(6,148,209,0.6)', color: '#38bdf8', background: 'rgba(6,148,209,0.08)' }}>
                  Request Info
                </button>
              </div>
            </div>

            {/* Right — Live-Online-Classes image with floating stat cards */}
            <div className="hidden lg:block">
              <div className="relative mx-auto" style={{ width: '500px', padding: '44px' }}>

                {/* Floating stat cards */}
                {([
                  { val: '5M+',    label: 'Learners',   pos: { top: 0,    left: 0   }, anim: 'lolFloat1 3.4s ease-in-out infinite' },
                  { val: '195+',   label: 'Countries',  pos: { top: 0,    right: 0  }, anim: 'lolFloat2 3.8s ease-in-out infinite 0.5s' },
                  { val: '5,000+', label: 'Courses',    pos: { bottom: 0, left: 0   }, anim: 'lolFloat3 4.0s ease-in-out infinite 1.0s' },
                  { val: 'GTR',    label: 'Guaranteed', pos: { bottom: 0, right: 0  }, anim: 'lolFloat4 3.6s ease-in-out infinite 1.5s' },
                ] as { val: string; label: string; pos: React.CSSProperties; anim: string }[]).map(({ val, label, pos, anim }) => (
                  <div
                    key={val}
                    className="absolute flex flex-col items-center justify-center rounded-xl"
                    style={{
                      ...pos,
                      width: 76,
                      padding: '8px 10px',
                      background: 'rgba(255,255,255,0.96)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(6,148,209,0.30)',
                      textAlign: 'center',
                      animation: `${anim}, lolGlow 3s ease-in-out infinite`,
                      zIndex: 10,
                    }}
                  >
                    <span className="text-base font-black leading-none" style={{ color: '#0694D1' }}>{val}</span>
                    <span className="text-[10px] font-medium mt-0.5" style={{ color: '#475569' }}>{label}</span>
                  </div>
                ))}

                {/* Main image card */}
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{
                    background: 'rgba(6,25,45,0.52)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1.5px solid rgba(6,148,209,0.50)',
                    boxShadow: '0 0 0 4px rgba(6,148,209,0.08), 0 0 30px 6px rgba(6,148,209,0.22), 0 0 60px 12px rgba(58,182,235,0.10), 0 8px 40px rgba(6,109,157,0.28), inset 0 1px 0 rgba(58,182,235,0.15)',
                  }}
                >
                  <img
                    src="/images/home-banner/Live-Online-Classes.png"
                    alt="Live Online Classes"
                    className="w-full h-auto object-contain"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TRAINING MODE TABS ───────────────────────────────── */}
      <style>{`
        @keyframes tab-border-sweep {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .tab-border-glow {
          background: linear-gradient(270deg, #0694D1, #38bdf8, #076D9D, #38bdf8, #0694D1);
          background-size: 400% 400%;
          animation: tab-border-sweep 3s ease infinite;
          padding: 2px;
          border-radius: 1rem;
          display: inline-flex;
        }
      `}</style>
      <section className="bg-white border-b py-4" style={{ borderColor: '#E2E8F0' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="flex justify-center">
            <div className="tab-border-glow">
              <div className="inline-flex overflow-x-auto overflow-hidden rounded-[14px] bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)] scrollbar-none">
                {TRAINING_TABS.map(t => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)}
                    className={`relative whitespace-nowrap rounded-xl px-4 sm:px-6 py-2.5 text-sm font-semibold transition-all duration-[250ms] shrink-0 ${
                      activeTab === t.id
                        ? 'bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30'
                        : 'text-[#7a8c96] hover:text-[#093148]'
                    }`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
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
      <section id="schedule" className="py-12 sm:py-16" style={{ background: 'linear-gradient(160deg, #EBF8FE 0%, #F5FBFF 50%, #EDF6FF 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">

          {/* Section header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#06111E' }}>
              Find Your{' '}
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Guaranteed to Run
              </span>{' '}Course
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#7a8c96' }}>
              Browse {COURSES.length} live online GTR classes across {SIDEBAR_VENDORS.length - 1} vendors — confirmed to run regardless of enrolment numbers.
            </p>
          </div>

          {/* Mobile vendor pills */}
          <div className="flex lg:hidden overflow-x-auto gap-2 mb-4 pb-1" style={{ scrollbarWidth: 'none' }}>
            {SIDEBAR_VENDORS.map(v => (
              <button key={v.name}
                onClick={() => { setActiveVendor(v.name); setPage(0) }}
                className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all"
                style={activeVendor === v.name
                  ? { background: '#0694D1', color: 'white', border: '1px solid #0694D1' }
                  : { background: 'white', color: '#475569', border: '1px solid #CAEFFF' }}>
                {v.label} ({v.count})
              </button>
            ))}
          </div>

          {/* Two-panel layout */}
          <div className="flex gap-5 items-start">

            {/* ── Left sidebar ── */}
            <div className="hidden lg:flex flex-col w-[190px] shrink-0 rounded-2xl overflow-hidden bg-white"
              style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 10px rgba(6,148,209,0.07)' }}>
              <p className="px-4 py-3 text-[10px] font-black uppercase tracking-widest" style={{ color: '#94A3B8', borderBottom: '1px solid #EBF8FE' }}>
                VENDORS
              </p>
              <div className="flex flex-col">
                {SIDEBAR_VENDORS.map(v => (
                  <button key={v.name}
                    onClick={() => { setActiveVendor(v.name); setPage(0) }}
                    className="flex items-center justify-between w-full px-4 py-3 text-left transition-colors hover:bg-[#F0FAFF]"
                    style={{
                      borderLeft: `3px solid ${activeVendor === v.name ? '#0694D1' : 'transparent'}`,
                      background:  activeVendor === v.name ? '#EBF8FE' : 'white',
                    }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                        style={{ background: v.bg, color: v.color }}>
                        {v.initial}
                      </div>
                      <span className="text-sm font-semibold leading-tight"
                        style={{ color: activeVendor === v.name ? '#0694D1' : '#374151' }}>
                        {v.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold rounded-full px-2 py-0.5 shrink-0 ml-1"
                      style={{
                        background: activeVendor === v.name ? '#0694D1' : '#E2E8F0',
                        color:      activeVendor === v.name ? 'white' : '#6B7280',
                      }}>
                      {v.count}
                    </span>
                  </button>
                ))}
              </div>
              <div className="p-4 mt-auto" style={{ borderTop: '1px solid #EBF8FE' }}>
                <button className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Enquire Now
                </button>
              </div>
            </div>

            {/* ── Right panel ── */}
            <div className="flex-1 min-w-0">

              {/* Vendor header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 p-5 rounded-2xl bg-white"
                style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 8px rgba(6,148,209,0.06)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black shrink-0"
                    style={{ background: activeVendorData.bg, color: activeVendorData.color }}>
                    {activeVendorData.initial}
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-0.5" style={{ color: '#06111E' }}>{activeVendorData.label}</h3>
                    <p className="text-xs sm:text-sm leading-snug" style={{ color: '#64748B' }}>{VENDOR_DESCS[activeVendor]}</p>
                  </div>
                </div>
                <button onClick={() => setShowFormModal(true)} className="shrink-0 self-start sm:self-center rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)' }}>
                  Enquire Now →
                </button>
              </div>

              {/* Search + Timezone + Filters row */}
              <div className="flex items-center gap-2 mb-5 flex-wrap sm:flex-nowrap">
                <div className="relative flex-1 min-w-0">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    type="text" placeholder="Search courses..."
                    value={search} onChange={e => { setSearch(e.target.value); setPage(0) }}
                    className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none"
                    style={{ border: '1px solid #CAEFFF', background: 'white', color: '#0F172A' }}
                  />
                </div>
                <FilterDropdown label="Sort by" options={['Price: Low to High', 'Price: High to Low', 'Most Popular', 'Duration']} value="" onChange={() => {}} />
                <button className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:bg-[#F0FAFF] shrink-0"
                  style={{ border: '1px solid #CAEFFF', background: 'white', color: '#475569' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                  </svg>
                  Filters
                </button>
              </div>

              {/* Course grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginated.length > 0
                  ? paginated.map(c => <CourseCard key={c.id} course={c} onEnroll={() => setShowFormModal(true)} />)
                  : (
                    <div className="col-span-full flex flex-col items-center py-16 rounded-2xl bg-white"
                      style={{ border: '1px solid #CAEFFF' }}>
                      <svg className="mb-3 opacity-30" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                      <p className="text-sm font-semibold" style={{ color: '#94A3B8' }}>No courses found</p>
                    </div>
                  )
                }
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-8">
                  <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all disabled:opacity-30"
                    style={{ border: '1px solid #CAEFFF', color: '#0694D1', background: 'white' }}>
                    ‹
                  </button>
                  <button onClick={() => setPage(0)}
                    className="w-9 h-9 rounded-full text-sm font-semibold transition-all"
                    style={page === 0 ? { background: '#0694D1', color: 'white', border: 'none' } : { border: '1px solid #CAEFFF', color: '#475569', background: 'white' }}>
                    1
                  </button>
                  {totalPages >= 2 && (
                    <button onClick={() => setPage(1)}
                      className="w-9 h-9 rounded-full text-sm font-semibold transition-all"
                      style={page === 1 ? { background: '#0694D1', color: 'white', border: 'none' } : { border: '1px solid #CAEFFF', color: '#475569', background: 'white' }}>
                      2
                    </button>
                  )}
                  {totalPages > 3 && (
                    <span className="text-sm font-semibold" style={{ color: '#94A3B8' }}>…</span>
                  )}
                  {totalPages > 2 && (
                    <button onClick={() => setPage(totalPages - 1)}
                      className="w-9 h-9 rounded-full text-sm font-semibold transition-all"
                      style={page === totalPages - 1 ? { background: '#0694D1', color: 'white', border: 'none' } : { border: '1px solid #CAEFFF', color: '#475569', background: 'white' }}>
                      {totalPages}
                    </button>
                  )}
                  <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all disabled:opacity-30"
                    style={{ border: '1px solid #CAEFFF', color: 'white', background: '#0694D1' }}>
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>
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
                  <p className="text-xs font-bold truncate pr-2" style={{ color: '#093148' }}>Live Online Training</p>
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
      <section id="request" className="py-14 sm:py-20" style={{ background: 'linear-gradient(160deg, #07111e 0%, #0a1828 100%)' }}>
        <div className="mx-auto max-w-2xl px-4 md:px-8">
          {/* LET'S TALK pill */}
          <div className="flex justify-center mb-4">
            <span className="rounded-full px-4 py-1 text-xs font-bold tracking-widest"
              style={{ border: '1px solid rgba(6,148,209,0.55)', color: '#38bdf8' }}>
              LET&apos;S TALK
            </span>
          </div>
          {/* Title */}
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-1">
            Request for more{' '}
            <span style={{ color: '#38bdf8' }}>information</span>
          </h2>
          <p className="text-center text-sm mb-8" style={{ color: 'rgba(255,255,255,0.42)' }}>
            Microsoft Certification Training with Koenig Solutions
          </p>

          <InquiryForm formType={formType} setFormType={setFormType} />
        </div>
      </section>
    </div>
  )
}

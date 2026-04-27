'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

/* ── Testimonials data ─────────────────────────────────────────── */
const TESTIMONIALS = [
  { quote: 'I would rate the trainer\'s ability to deliver the subject as excellent. The trainer explained the concepts clearly, used practical examples, and ensured that the material was easy to understand.', extra: 'The session was engaging and interactive. The trainer made sure every participant understood the concepts before moving on. Highly recommend Koenig for PMP preparation.', showMore: true, name: 'Tails Al-Buseidi', location: 'Trainer', course: 'Project Management Professional (PMP)® Certification Training', date: '17th Feb 2026', initials: 'TA', avatarBg: 'linear-gradient(135deg,#076D9D,#4DBFEF)', ringColor: '#4F8EF7' },
  { quote: '10/10! That was really knowledgeable, and his energetic delivery was a pleasure to listen to!', name: 'Lita Voss', location: 'Student', course: 'AB-730T00: Automating business workflows with generative AI', date: '9th Feb 2026', initials: 'LV', avatarBg: 'linear-gradient(135deg,#093148,#076D9D)', ringColor: '#F59E0B' },
  { quote: "I've being the max,", name: 'Maya Krishnan', location: 'Student', course: 'AB-731T00: Drive AI transformation in your organization', date: '25th Feb 2026', initials: 'MK', avatarBg: 'linear-gradient(135deg,#F47920,#f6a05c)', ringColor: '#EC4899' },
  { quote: 'Excellent.', name: 'Leandra Chiketi', location: 'Student', course: 'DP-300T00-A: Implement Scalable Database Solutions Using Azure SQL', date: '13th Feb 2026', initials: 'LC', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)', ringColor: '#8B5CF6' },
  { quote: 'The trainer demonstrated exceptional ability in delivering the subject matter. He has deep technical knowledge of SQL server performance tuning and was able to break down complex topics with clarity.', extra: 'The hands-on approach to performance tuning was excellent. Every example was practical and directly applicable to real-world scenarios. I now have full confidence in database optimization.', showMore: true, name: 'Harper Caldwell', location: 'Student', course: 'Performance Tuning and Optimizing SQL Databases in 2 days', date: '22nd Feb 2026', initials: 'HC', avatarBg: 'linear-gradient(135deg,#093148,#F47920)', ringColor: '#10B981' },
  { quote: 'I really liked how the trainer broke things down into simple terms that actually made them easy to understand and apply.', name: 'Arjun Mehta', location: 'Student', course: 'Minecraft Email Security', date: '20th Feb 2026', initials: 'AM', avatarBg: 'linear-gradient(135deg,#F47920,#076D9D)', ringColor: '#F59E0B' },
  { quote: 'Koenig made the impossible possible. I completed my CISSP in 3 weeks with their intensive 1-on-1 training. The instructor adapted the pace perfectly to my background.', extra: 'The intensive 1-on-1 format let me cover 3 weeks of CISSP content in the time I had available. My instructor focused on my weak domains identified in a pre-assessment. All 10 domains felt manageable by exam day.', showMore: true, name: 'Ahmed Al-Rashid', location: '🇦🇪 UAE', course: 'CISSP Certification', date: '2nd Feb 2026', initials: 'AA', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)', ringColor: '#06B6D4' },
  { quote: 'Best training investment I have ever made. The DevOps course was hands-on from day one. Our entire team is now deploying to Kubernetes confidently.', name: 'Sophie Laurent', location: '🇫🇷 France', course: 'Certified Kubernetes Administrator', date: '28th Jan 2026', initials: 'SL', avatarBg: 'linear-gradient(135deg,#093148,#0694d1)', ringColor: '#8B5CF6' },
  { quote: 'The Google Cloud course gave me exactly what I needed to transition from on-prem to cloud. Real labs, real scenarios, and a trainer who genuinely cared about my success.', name: 'Carlos Mendez', location: '🇲🇽 Mexico', course: 'Google Cloud Professional Architect', date: '20th Jan 2026', initials: 'CM', avatarBg: 'linear-gradient(135deg,#4285F4,#0694d1)', ringColor: '#10B981' },
  { quote: 'The trainer was absolutely fantastic — very patient and knowledgeable. She adapted every session to my pace and ensured I was confident before moving on to the next topic.', extra: 'I passed SC-900 on my first attempt thanks to the personalised attention. The real-world examples made abstract concepts very concrete.', showMore: true, name: 'Nadia Al-Farsi', location: '🇴🇲 Oman', course: 'SC-900: Microsoft Security Fundamentals', date: '14th Mar 2026', initials: 'NF', avatarBg: 'linear-gradient(135deg,#0694d1,#4DBFEF)', ringColor: '#0694D1' },
  { quote: 'Outstanding quality of training. The ITIL 4 course was structured perfectly and the trainer brought real-world service management experience to every module.', name: 'David Osei', location: '🇬🇭 Ghana', course: 'ITIL® 4 Foundation', date: '10th Mar 2026', initials: 'DO', avatarBg: 'linear-gradient(135deg,#F47920,#093148)', ringColor: '#F47920' },
  { quote: 'I completed my AWS Cloud Practitioner in just 4 days with Koenig. The structured approach and practice questions were spot on. I passed with a high score on the first attempt!', name: 'Preet Bhandari', location: '🇮🇳 India', course: 'AWS Certified Cloud Practitioner', date: '5th Mar 2026', initials: 'PB', avatarBg: 'linear-gradient(135deg,#FF9900,#093148)', ringColor: '#FF9900' },
  { quote: 'The Power BI course was incredibly well structured. My trainer gave me hands-on experience with real business datasets and the dashboards I built are now live in production.', extra: 'I went from zero Power BI knowledge to building complex DAX measures and publishing reports within 5 days. Koenig\'s 1-on-1 format made all the difference.', showMore: true, name: 'Amira Haddad', location: '🇹🇳 Tunisia', course: 'PL-300: Microsoft Power BI Data Analyst', date: '28th Feb 2026', initials: 'AH', avatarBg: 'linear-gradient(135deg,#F2C811,#0694d1)', ringColor: '#F2C811' },
  { quote: 'Very professional and thorough training. The CompTIA CySA+ content was delivered at exactly the right pace and the hands-on labs reinforced every concept perfectly.', name: 'James Kariuki', location: '🇰🇪 Kenya', course: 'CompTIA CySA+ CS0-003', date: '21st Feb 2026', initials: 'JK', avatarBg: 'linear-gradient(135deg,#C00000,#076D9D)', ringColor: '#C00000' },
  { quote: 'The DevSecOps training was a revelation. My trainer integrated security into every stage of the CI/CD pipeline and the knowledge I gained has already transformed how my team works.', name: 'Liu Wei', location: '🇨🇳 China', course: 'DevSecOps Foundation', date: '18th Feb 2026', initials: 'LW', avatarBg: 'linear-gradient(135deg,#076D9D,#F47920)', ringColor: '#076D9D' },
  { quote: 'Excellent trainer and well-organised content. The SAP S/4HANA course was dense but the trainer made it easy to follow. I feel fully ready for my project now.', extra: 'The trainer\'s real SAP implementation experience meant every lesson was grounded in practical scenarios rather than theory alone. Highly valuable.', showMore: true, name: 'Fatima Al-Zahrani', location: '🇸🇦 Saudi Arabia', course: 'SAP S/4HANA Finance', date: '12th Feb 2026', initials: 'FZ', avatarBg: 'linear-gradient(135deg,#0ABFBC,#093148)', ringColor: '#0ABFBC' },
  { quote: 'The ethical hacking course with Koenig was one of the best learning experiences I have had. Practical labs on real environments and a trainer who actively works in the field.', name: 'Marcus Webb', location: '🇦🇺 Australia', course: 'Certified Ethical Hacker (CEH)', date: '8th Feb 2026', initials: 'MW', avatarBg: 'linear-gradient(135deg,#34A853,#076D9D)', ringColor: '#34A853' },
  { quote: 'I gained more in 3 days with Koenig than in 3 months of self-study. The Azure Data Engineer course was exactly what I needed to upskill quickly for my new role.', name: 'Yuki Tanaka', location: '🇯🇵 Japan', course: 'DP-203: Azure Data Engineer Associate', date: '3rd Feb 2026', initials: 'YT', avatarBg: 'linear-gradient(135deg,#EB3349,#0694d1)', ringColor: '#EB3349' },
]

/* ── Video testimonials data ─────────────────────────────────── */
const VIDEOS = [
  { id: 'NfhIeqcHpCc', name: 'Husain', country: 'Tanzania', course: 'AZ-10NT00-A: Microsoft Azure Administrator' },
  { id: 'OAk_pix9ofk', name: 'Mohammed Al Marhoobi', country: 'Oman', course: 'Mdm With Intune' },
  { id: 'A5KE_hzUcCE', name: 'Fawaz Muhammad', country: 'Oman', course: 'AZ-800: Administering Windows Server Hybrid Core Infrastructure' },
  { id: 'd5wEidVM07A', name: 'Kashan Memon', country: 'Saudi Arabia', course: 'ITIL® 4 Strategist: Direct, Plan And Improve' },
  { id: '-DJhl5-lKj4', name: 'Joojo Chiputa', country: 'Zambia', course: 'Kubernetes Administration Using Docker' },
  { id: 'Qi4Qxv_A0NA', name: 'Ali Omar', country: 'Iraq', course: 'Designing Cisco Data Center Infrastructure (DCID) v2.1' },
  { id: 'Gsf3wEEc1tM', name: '', country: '', course: 'AZ-305: Designing Microsoft Azure Infrastructure Solutions' },
  { id: 'IEitbo_0aIc', name: '', country: '', course: 'Oracle Linux 8: System Administration I' },
  { id: 'igqdyizamvY', name: '', country: '', course: 'Certified Penetration Testing Professional (CPENT)' },
]

/* ── Revision class testimonials ─────────────────────────────── */
const REVISION_TESTIMONIALS = [
  { quote: 'Way topics covered are really helpful. Understood the concepts with the examples showed in the training gadgets', name: 'Kiran Kumar G', course: 'AWS Certified Solutions Architect - Associate', date: '10th Oct 2024' },
  { quote: 'Trainer is very committed and is ready to extend effort and hours to meet participants needs. Entire session was smooth and professional and no unwanted disturbances.', name: 'Krishnaprasad Shettigan T', course: 'AWS Certified Solutions Architect', date: '10th Oct 2024' },
  { quote: 'The training is very good. Excellent delivery of content and very good explanations were given to our doubts. However, presentation slides would be better to mark up the list of contents taught and provide a write-up for later reference', name: 'Poornima M', course: 'AWS Certified Solutions Architect', date: '16th Oct 2024' },
  { quote: 'The revision class helped me clarify all the doubts I had after the main training. The trainer was patient and went through every question thoroughly until I was fully confident.', name: 'Rashid Al-Balushi', course: 'AZ-104: Microsoft Azure Administrator', date: '22nd Oct 2024' },
  { quote: 'Excellent revision session. The instructor identified my weak areas quickly and focused the entire session on those topics. I passed my exam the very next day.', name: 'Sunita Rajan', course: 'ITIL® 4 Foundation', date: '28th Oct 2024' },
  { quote: 'The revision class was structured just like the exam format which made it extremely useful. I felt fully prepared after attending. Highly recommended before any certification attempt.', name: 'George Nkemdirim', course: 'CompTIA Security+ SY0-701', date: '3rd Nov 2024' },
  { quote: 'I struggled with a few networking topics and the revision class was exactly what I needed. Clear explanations, real examples, and the trainer answered every single question I had.', name: 'Mei Lin Zhang', course: 'CCNA 200-301', date: '8th Nov 2024' },
  { quote: 'Very focused and productive session. The trainer covered all the high-weight exam topics and provided memory tricks that I still use today. Worth every minute.', name: 'Adebayo Okafor', course: 'PMP Certification', date: '14th Nov 2024' },
  { quote: 'The revision class gave me a completely new perspective on the topics I was struggling with. The trainer used diagrams and live demos which made everything click into place instantly.', name: 'Priya Nambiar', course: 'Kubernetes Administrator (CKA)', date: '20th Nov 2024' },
]

/* ── Courses list ─────────────────────────────────────────────── */
const COURSES: { name: string; icon: React.ReactNode }[] = [
  {
    name: 'AWS Certified Solutions Architect - Associate (Architecting on AWS)',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>,
  },
  {
    name: 'F5 BIG IP LTM',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="8" width="5" height="8" rx="1"/><rect x="17" y="8" width="5" height="8" rx="1"/><path d="M7 12h10M12 8V4M12 20v-4"/><circle cx="12" cy="12" r="2"/></svg>,
  },
  {
    name: 'AWS Certified CloudOps Engineer - Associate (Cloud Operations on AWS)',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/><polyline points="12 11 12 17 15 14"/></svg>,
  },
  {
    name: 'Implementing Cisco Application Centric Infrastructure (DCACI) v1.2',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="4" rx="1"/><rect x="1" y="10" width="22" height="4" rx="1"/><rect x="1" y="16" width="22" height="4" rx="1"/><line x1="5" y1="6" x2="5" y2="6"/><line x1="5" y1="12" x2="5" y2="12"/><line x1="5" y1="18" x2="5" y2="18"/></svg>,
  },
  {
    name: 'AZ-104v2/v3: Microsoft Azure Administrator',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    name: 'PL-300T00: Design and Manage Analytics Solutions Using Power BI',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  },
  {
    name: 'Fundamentals of Cisco Firewall Threat Defense and Intrusion Prevention (SFWIPP)',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    name: 'Generative AI Specialty',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  },
  {
    name: 'Generative AI Essentials on AWS',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/><circle cx="12" cy="13" r="2"/><path d="M12 11V9"/></svg>,
  },
  {
    name: 'MS-N023: Explore Microsoft 365 Copilot Chat',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="9" cy="10" r="1" fill="#0694D1"/><circle cx="12" cy="10" r="1" fill="#0694D1"/><circle cx="15" cy="10" r="1" fill="#0694D1"/></svg>,
  },
  {
    name: 'Implementing and Administering Cisco Solutions (CCNA) 2.3',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/><line x1="5" y1="19" x2="19" y2="19"/></svg>,
  },
  {
    name: 'VMware Cloud Foundation: Solution Architecture and Design (V9.0)',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="9" width="20" height="4" rx="1"/><rect x="2" y="15" width="20" height="4" rx="1"/></svg>,
  },
  {
    name: 'VMware Cloud Foundation: Build, Manage and Secure (v5.0)',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="9" width="20" height="4" rx="1"/><rect x="2" y="15" width="20" height="4" rx="1"/><path d="M6 5h.01M6 11h.01M6 17h.01"/></svg>,
  },
  {
    name: 'Technology Architecture L3',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  },
]

/* ── Card ─────────────────────────────────────────────────────── */
function HomeTestimonialCard({ t, onExpandChange }: { t: typeof TESTIMONIALS[0]; onExpandChange?: (e: boolean) => void }) {
  const [expanded, setExpanded] = useState(false)
  const extra = (t as { extra?: string }).extra
  const showMore = (t as { showMore?: boolean }).showMore
  const handleToggle = () => {
    const next = !expanded
    setExpanded(next)
    onExpandChange?.(next)
  }
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white h-full" style={{ border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
      <div className="flex-1 p-5">
        <div className="mb-2 text-xs text-yellow-400">★★★★★</div>
        <p className="mb-3 text-sm leading-relaxed" style={{ color: '#2d4a6a' }}>{t.quote}</p>
        <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: expanded ? '200px' : '0px', opacity: expanded ? 1 : 0 }}>
          <p className="mb-3 text-xs leading-relaxed" style={{ color: '#4a7a9b' }}>{extra}</p>
        </div>
        {showMore && (
          <button onClick={handleToggle} className="mb-4 w-fit rounded-full border px-3 py-1 text-xs font-semibold text-[#0694D1] transition-all hover:bg-[#0694D1] hover:text-white" style={{ borderColor: '#0694D1' }}>
            {expanded ? 'Show Less ↑' : 'Show More ↓'}
          </button>
        )}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: t.avatarBg, border: '2px solid #DCEEFB' }}>
            {t.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight" style={{ color: '#093148' }}>{t.name}</p>
            <p className="text-xs font-semibold" style={{ color: '#0694D1' }}>{t.location}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: '#E8F4FA', background: '#F8FCFF' }}>
        <div>
          <p className="text-xs font-bold" style={{ color: '#093148' }}>{t.course}</p>
          <p className="mt-0.5 text-xs" style={{ color: '#999' }}>{t.date}</p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: '#E8F4FA', color: '#0569a8' }}>✓ Verified</span>
      </div>
    </div>
  )
}

/* ── Mobile horizontal marquee ───────────────────────────────── */
function MobileTestimonialMarquee({ items }: { items: typeof TESTIMONIALS }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const paused = useRef(false)
  const expandedCount = useRef(0)
  const dragStartX = useRef(0)
  const dragStartPos = useRef(0)

  useEffect(() => {
    const inner = trackRef.current
    if (!inner) return
    let prev = performance.now()
    let raf: number
    function tick(now: number) {
      const dt = now - prev
      prev = now
      if (!paused.current && inner) {
        pos.current += 0.04 * dt
        const half = inner.scrollWidth / 2
        if (half > 0 && pos.current >= half) pos.current -= half
        inner.style.transform = `translateX(-${pos.current}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className="sm:hidden overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
      onTouchStart={e => { paused.current = true; dragStartX.current = e.touches[0].clientX; dragStartPos.current = pos.current }}
      onTouchMove={e => {
        const delta = dragStartX.current - e.touches[0].clientX
        const inner = trackRef.current
        if (!inner) return
        const half = inner.scrollWidth / 2
        let newPos = dragStartPos.current + delta
        if (newPos < 0) newPos = 0
        if (half > 0 && newPos >= half) newPos = half - 1
        pos.current = newPos
        inner.style.transform = `translateX(-${pos.current}px)`
      }}
      onTouchEnd={() => { if (expandedCount.current === 0) paused.current = false }}
    >
      <div ref={trackRef} className="flex items-stretch gap-4 py-2" style={{ width: 'max-content' }}>
        {[...items, ...items].map((t, i) => (
          <div key={i} style={{ width: '280px', flexShrink: 0 }}>
            <HomeTestimonialCard t={t} onExpandChange={exp => {
              expandedCount.current += exp ? 1 : -1
              if (expandedCount.current < 0) expandedCount.current = 0
              paused.current = expandedCount.current > 0
            }} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Desktop vertical scroll column ─────────────────────────── */
function HomeScrollColumn({ items, speed }: { items: typeof TESTIMONIALS; speed: number }) {
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const paused = useRef(false)

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return
    let prev = performance.now()
    let raf: number
    function tick(now: number) {
      const dt = now - prev
      prev = now
      if (!paused.current && inner) {
        pos.current += speed * dt
        const half = inner.scrollHeight / 2
        if (half > 0 && pos.current >= half) pos.current -= half
        inner.style.transform = `translateY(-${pos.current}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [speed])

  return (
    <div
      style={{ height: '520px', overflow: 'hidden' }}
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
    >
      <div ref={innerRef} className="flex flex-col gap-4 pb-4">
        {[...items, ...items].map((t, i) => <HomeTestimonialCard key={i} t={t} />)}
      </div>
    </div>
  )
}

/* ── Video card ──────────────────────────────────────────────── */
function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #DCEEFB', boxShadow: '0 2px 16px rgba(6,148,209,0.09)' }}>
      <div className="relative" style={{ aspectRatio: '16/9', background: '#06111E', cursor: 'pointer' }} onClick={() => setPlaying(true)}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
              alt={video.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg` }}
            />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/70 bg-white/20 backdrop-blur-sm transition-transform hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="px-4 pt-3 pb-4 text-center flex flex-col gap-1">
        {video.name && <p className="text-sm font-bold text-[#093148]">{video.name}</p>}
        {video.country && <p className="text-xs font-medium" style={{ color: '#0694D1' }}>{video.country}</p>}
        <p className="text-xs leading-snug" style={{ color: '#4a6a8a' }}>{video.course}</p>
        <button className="mt-2 w-full rounded-full border py-1.5 text-xs font-semibold transition-colors hover:bg-[#0694D1] hover:text-white" style={{ borderColor: '#0694D1', color: '#0694D1' }}>
          View Courses
        </button>
      </div>
    </div>
  )
}

export default function StudentFeedbackPage() {
  const [activeTab, setActiveTab] = useState<'testimonial' | 'videos'>('testimonial')
  const [revIdx, setRevIdx] = useState(0)
  const [revPage, setRevPage] = useState(0)
  const REV_PER_PAGE = 3
  const revTotalPages = Math.ceil(REVISION_TESTIMONIALS.length / REV_PER_PAGE)
  const [showAllTestimonials, setShowAllTestimonials] = useState(false)
  const [showAllVideos, setShowAllVideos] = useState(false)

  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />
      <AboutSubNav />

      {/* HERO — dark mode */}
      <style>{`
        @keyframes sfBlob1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-30px) scale(1.1)}66%{transform:translate(-20px,20px) scale(0.95)}}
        @keyframes sfBlob2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-35px,25px) scale(1.08)}66%{transform:translate(25px,-15px) scale(0.92)}}
        @keyframes sfBlob3{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,40px) scale(1.05)}66%{transform:translate(-30px,-20px) scale(1.1)}}
        .sf-blob1{animation:sfBlob1 12s ease-in-out infinite}
        .sf-blob2{animation:sfBlob2 15s ease-in-out infinite}
        .sf-blob3{animation:sfBlob3 18s ease-in-out infinite}
      `}</style>
      <section className="relative bg-[#06111E] overflow-hidden py-[50px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="sf-blob1 absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#0694D1] opacity-[0.08] blur-[130px]" />
          <div className="sf-blob2 absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#38bdf8] opacity-[0.06] blur-[110px]" />
          <div className="sf-blob3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#0694D1] opacity-[0.04] blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="kglass-banner py-10 px-8 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 lg:gap-14">
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold" style={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.25)' }}>
                <span className="text-yellow-400">★</span> Trusted by 5M+ Learners Worldwide
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 text-white">
                Real Learners.<br />
                <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Real Stories.</span>
              </h1>
              <p className="text-base leading-relaxed mb-6 max-w-lg text-white/65">
                From first certifications to career breakthroughs — read how learners worldwide transformed their careers with Koenig Solutions.
              </p>
              {/* Infographic stats — single row */}
              <div className="grid grid-cols-4 gap-2">
                {([
                  {
                    val: '5M+', label: 'Learners Upskilled',
                    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                  },
                  {
                    val: '195', label: 'Countries Served',
                    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
                  },
                  {
                    val: '18,400+', label: 'Verified Reviews',
                    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                  },
                  {
                    val: '33+', label: 'Years of Excellence',
                    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                  },
                ] as { val: string; label: string; svg: React.ReactNode }[]).map(s => (
                  <div key={s.label} className="flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(56,189,248,0.18)' }}>
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0" style={{ background: 'rgba(56,189,248,0.12)' }}>
                      {s.svg}
                    </div>
                    <div className="text-base font-extrabold leading-none text-white">{s.val}</div>
                    <div className="text-[10px] leading-tight text-white/50">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Ratings card — dark glassmorphism */}
            <div className="hidden md:flex shrink-0 items-center justify-center">
              <div className="relative w-[320px] lg:w-[360px] overflow-hidden rounded-3xl kglass-dark" style={{ border: '1px solid rgba(56,189,248,0.18)', boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(56,189,248,0.1)' }}>
                {/* Gradient top bar */}
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #0694D1, #38bdf8, #076D9D)' }} />

                {/* Inner glow blobs */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-25 blur-3xl" style={{ background: '#0694D1' }} />
                <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full opacity-15 blur-3xl" style={{ background: '#38bdf8' }} />

                <div className="relative px-7 pt-6 pb-7">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-1 text-[#38bdf8]">Overall Rating</p>
                      <div className="flex items-end gap-2">
                        <span className="text-5xl font-black leading-none" style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>4.9</span>
                        <span className="mb-1 text-sm font-medium text-white/40">/ 5</span>
                      </div>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', boxShadow: '0 8px 24px rgba(6,148,209,0.45)' }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                  </div>

                  {/* Stars + review count */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} width="17" height="17" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      ))}
                    </div>
                    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' }}>18,400+ reviews</span>
                  </div>

                  {/* Divider */}
                  <div className="mb-5 h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(56,189,248,0.25), transparent)' }} />

                  {/* 2×2 stat grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { val: '98%', label: 'Would recommend' },
                      { val: '4.8', label: 'Course quality' },
                      { val: '4.9', label: 'Instructor rating' },
                      { val: '4.7', label: 'Support quality' },
                    ].map(s => (
                      <div key={s.label} className="relative overflow-hidden rounded-2xl px-4 py-3.5 transition-all hover:-translate-y-0.5" style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)' }}>
                        <div className="text-xl font-black leading-none mb-1" style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
                        <div className="text-[10px] font-medium leading-tight text-white/45">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* THE KOENIG EXPERIENCE */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">

          {/* Section heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#093148' }}>
              The Koenig <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Experience</span>
            </h2>
            <p className="text-sm sm:text-base text-[#7a8c96]">Hear firsthand from students who&apos;ve experienced the Koenig difference.</p>
          </div>

          {/* Tabs */}
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
          <div className="flex justify-center mb-8">
            <div className="tab-border-glow">
            <div className="inline-flex overflow-hidden rounded-[14px] bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]">
              <button
                onClick={() => setActiveTab('testimonial')}
                className={`relative flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-[250ms] ${activeTab === 'testimonial' ? 'bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30' : 'text-[#7a8c96] hover:text-[#093148]'}`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Students Testimonial
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`relative flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-[250ms] ${activeTab === 'videos' ? 'bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30' : 'text-[#7a8c96] hover:text-[#093148]'}`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Student Testimonial Videos
              </button>
            </div>
            </div>
          </div>

          {activeTab === 'testimonial' ? (
            <>
              {/* Mobile: horizontal auto-scroll marquee */}
              <MobileTestimonialMarquee items={TESTIMONIALS.slice(0, 9)} />

              {/* Desktop: 3-column auto-scroll (first 9) */}
              <div
                className="hidden sm:block relative overflow-hidden"
                style={{
                  height: '520px',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
                }}
              >
                <div className="grid grid-cols-3 gap-4 h-full">
                  <HomeScrollColumn items={TESTIMONIALS.slice(0, 3)} speed={0.030} />
                  <HomeScrollColumn items={TESTIMONIALS.slice(3, 6)} speed={0.025} />
                  <HomeScrollColumn items={TESTIMONIALS.slice(6, 9)} speed={0.038} />
                </div>
              </div>

              {/* Extra testimonials revealed on Show More */}
              {showAllTestimonials && (
                <div className="hidden sm:grid grid-cols-3 gap-4 mt-6">
                  {TESTIMONIALS.slice(9).map((t, i) => (
                    <HomeTestimonialCard key={i} t={t} />
                  ))}
                </div>
              )}

              {/* Show More / Show Less */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowAllTestimonials(p => !p)}
                  className="group inline-flex items-center gap-3 rounded-2xl px-8 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg,#093148,#076D9D)' }}
                >
                  {showAllTestimonials ? 'Show Less' : 'Show More'}
                  <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.18)' }}>
                    {showAllTestimonials ? '↑' : '↓'}
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {VIDEOS.slice(0, 6).map(v => <VideoCard key={v.id} video={v} />)}
              </div>

              {/* Extra 3 videos revealed on Show More */}
              {showAllVideos && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                  {VIDEOS.slice(6).map(v => <VideoCard key={v.id} video={v} />)}
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowAllVideos(p => !p)}
                  className="group inline-flex items-center gap-3 rounded-2xl px-8 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg,#093148,#076D9D)' }}
                >
                  {showAllVideos ? 'Show Less' : 'Show More'}
                  <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.18)' }}>
                    {showAllVideos ? '↑' : '↓'}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* LEARNER FEEDBACK ON REVISION CLASSES */}
      <section className="py-10" style={{ background: 'linear-gradient(180deg, #f0f8ff 0%, #ffffff 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-12">
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider" style={{ background: 'rgba(6,148,209,0.1)', color: '#0694D1' }}>
              Revision Classes
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#093148] mb-3">
              Learner Feedback on Our <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Revision Classes</span>
            </h2>
            <p className="text-sm sm:text-base text-[#7a8c96] max-w-2xl mx-auto">
              Missed a concept or need extra clarity? Our revision classes are here to help you revisit, relearn, and master every topic.
            </p>
          </div>

          {/* Desktop slider — 3 cards per page */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-3 gap-6">
              {REVISION_TESTIMONIALS.slice(revPage * REV_PER_PAGE, revPage * REV_PER_PAGE + REV_PER_PAGE).map((r, i) => (
                <div key={i} className="relative flex flex-col bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 24px rgba(6,148,209,0.1)', border: '1px solid #E8F4FA' }}>
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #0694D1, #38bdf8)' }} />
                  <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
                  <div className="text-5xl font-serif leading-none mb-2" style={{ color: '#DCEEFB' }}>&ldquo;</div>
                  <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: '#2d4a6a' }}>{r.quote}</p>
                  <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: '#E8F4FA' }}>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg,#0694D1,#093148)' }}>
                      {r.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#093148]">{r.name}</p>
                      <p className="text-xs font-medium mt-0.5" style={{ color: '#0694D1' }}>{r.course}</p>
                      <p className="text-xs text-[#aaa] mt-0.5">{r.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Desktop pagination */}
            <div className="flex items-center justify-center gap-5 mt-10">
              {/* Prev */}
              <button
                onClick={() => setRevPage(p => Math.max(0, p - 1))}
                disabled={revPage === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
                style={revPage === 0
                  ? { background: '#f0f6fb', border: '1.5px solid #DCEEFB', color: '#b0c8da' }
                  : { background: 'white', border: '1.5px solid #0694D1', color: '#0694D1', boxShadow: '0 2px 12px rgba(6,148,209,0.18)' }
                }
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: revTotalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setRevPage(i)}
                    className="rounded-full transition-all duration-300"
                    style={i === revPage
                      ? { width: '32px', height: '10px', background: 'linear-gradient(90deg, #0694D1, #38bdf8)', boxShadow: '0 2px 8px rgba(6,148,209,0.4)' }
                      : { width: '10px', height: '10px', background: '#D0E8F5', border: '1.5px solid #b8d9ee' }
                    }
                  />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={() => setRevPage(p => Math.min(revTotalPages - 1, p + 1))}
                disabled={revPage === revTotalPages - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
                style={revPage === revTotalPages - 1
                  ? { background: '#f0f6fb', border: '1.5px solid #DCEEFB', color: '#b0c8da' }
                  : { background: 'linear-gradient(135deg, #0694D1, #38bdf8)', color: 'white', boxShadow: '0 4px 14px rgba(6,148,209,0.35)' }
                }
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>

          {/* Mobile: single card with dots */}
          <div className="sm:hidden">
            <div className="relative bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 24px rgba(6,148,209,0.1)', border: '1px solid #E8F4FA' }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #0694D1, #38bdf8)' }} />
              <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
              <div className="text-5xl font-serif leading-none mb-2" style={{ color: '#DCEEFB' }}>&ldquo;</div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#2d4a6a' }}>{REVISION_TESTIMONIALS[revIdx].quote}</p>
              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: '#E8F4FA' }}>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg,#0694D1,#093148)' }}>
                  {REVISION_TESTIMONIALS[revIdx].name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#093148]">{REVISION_TESTIMONIALS[revIdx].name}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: '#0694D1' }}>{REVISION_TESTIMONIALS[revIdx].course}</p>
                  <p className="text-xs text-[#aaa] mt-0.5">{REVISION_TESTIMONIALS[revIdx].date}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setRevIdx(p => Math.max(0, p - 1))}
                disabled={revIdx === 0}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
                style={revIdx === 0
                  ? { background: '#f0f6fb', border: '1.5px solid #DCEEFB', color: '#b0c8da' }
                  : { background: 'white', border: '1.5px solid #0694D1', color: '#0694D1', boxShadow: '0 2px 10px rgba(6,148,209,0.18)' }
                }
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div className="flex items-center gap-1.5">
                {REVISION_TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setRevIdx(i)} className="rounded-full transition-all duration-300"
                    style={i === revIdx
                      ? { width: '24px', height: '8px', background: 'linear-gradient(90deg, #0694D1, #38bdf8)', boxShadow: '0 2px 6px rgba(6,148,209,0.4)' }
                      : { width: '8px', height: '8px', background: '#D0E8F5', border: '1.5px solid #b8d9ee' }
                    }
                  />
                ))}
              </div>
              <button
                onClick={() => setRevIdx(p => Math.min(REVISION_TESTIMONIALS.length - 1, p + 1))}
                disabled={revIdx === REVISION_TESTIMONIALS.length - 1}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
                style={revIdx === REVISION_TESTIMONIALS.length - 1
                  ? { background: '#f0f6fb', border: '1.5px solid #DCEEFB', color: '#b0c8da' }
                  : { background: 'linear-gradient(135deg, #0694D1, #38bdf8)', color: 'white', boxShadow: '0 3px 12px rgba(6,148,209,0.35)' }
                }
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE / FACEBOOK RATINGS */}
      <section className="py-10" style={{ background: 'linear-gradient(135deg, #06111E 0%, #093148 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-10">
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider" style={{ background: 'rgba(6,148,209,0.18)', color: '#38bdf8' }}>
              Our Reputation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Rated Highly Across{' '}
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Platforms</span>
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Thousands of learners rate us 4+ stars across the web</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
            {/* Google card */}
            <div className="flex items-center gap-5 bg-white rounded-2xl px-8 py-6 w-full sm:w-auto sm:min-w-[240px]" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
              <div>
                <div className="text-2xl font-bold tracking-tight leading-none mb-2">
                  <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
                </div>
                <div className="text-yellow-400 text-base leading-none">★★★★<span style={{ opacity: 0.3 }}>★</span></div>
              </div>
              <div className="h-12 w-px" style={{ background: '#E8F4FA' }} />
              <div>
                <div className="text-3xl font-bold text-[#093148] leading-none">4.4</div>
                <div className="text-xs text-[#7a8c96] font-medium mt-1">out of 5</div>
              </div>
            </div>
            {/* Facebook card */}
            <div className="flex items-center gap-5 bg-white rounded-2xl px-8 py-6 w-full sm:w-auto sm:min-w-[240px]" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  <span className="text-lg font-bold leading-none" style={{ color: '#1877F2' }}>facebook</span>
                </div>
                <div className="text-yellow-400 text-base leading-none">★★★★<span style={{ opacity: 0.3 }}>★</span></div>
              </div>
              <div className="h-12 w-px" style={{ background: '#E8F4FA' }} />
              <div>
                <div className="text-3xl font-bold text-[#093148] leading-none">4.2</div>
                <div className="text-xs text-[#7a8c96] font-medium mt-1">out of 5</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN 5 MILLION+ LEARNERS */}
      <section className="relative overflow-hidden py-14" style={{ background: 'linear-gradient(160deg, #f0f8ff 0%, #e4f2fb 50%, #f8fcff 100%)' }}>
        {/* Background glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-30 blur-[100px]" style={{ background: 'radial-gradient(circle, #0694D1, transparent 70%)' }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-[90px]" style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-10">
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider" style={{ background: 'rgba(6,148,209,0.12)', color: '#0694D1', border: '1px solid rgba(6,148,209,0.2)' }}>
              Explore Our Courses
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#093148] leading-snug">
              Join 5 million+ learners who&apos;ve upskilled with<br className="hidden sm:block" />
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> Koenig&apos;s top-rated programs</span>
            </h2>
          </div>

          {/* Course grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {COURSES.map((course, i) => (
              <div
                key={i}
                className="group relative flex items-center gap-3 rounded-2xl px-4 py-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_36px_rgba(6,148,209,0.22)]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(232,244,252,0.85))',
                  border: '1px solid rgba(6,148,209,0.18)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(6,148,209,0.07), rgba(56,189,248,0.05))' }} />
                {/* top accent line */}
                <div className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, #0694D1, transparent)' }} />
                {/* icon */}
                <div className="relative shrink-0 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-110" style={{ background: 'rgba(6,148,209,0.1)', boxShadow: '0 2px 8px rgba(6,148,209,0.12)' }}>
                  {course.icon}
                </div>
                {/* text */}
                <div className="relative flex-1 min-w-0">
                  <p className="text-xs leading-snug font-semibold" style={{ color: '#093148' }}>{course.name}</p>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-200" style={{ color: '#0694D1' }}>
                    View Course
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="group inline-flex items-center gap-3 rounded-2xl px-8 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{ background: 'linear-gradient(135deg,#093148,#076D9D)' }}>
              Show All Course
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.18)' }}>→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

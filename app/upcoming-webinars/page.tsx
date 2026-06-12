'use client'
import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

/* ── Hero stats ─────────────────────────────────────────────── */
const HERO_STATS = [
  { value: '3,000+',   label: 'Webinars Conducted' },
  { value: '150,000+', label: 'Learners Served' },
]

/* ── Trust badges ───────────────────────────────────────────── */
const TRUST_BADGES = [
  {
    label: 'Free Webinar',
    icon: (
      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    label: 'Industry Experts',
    icon: (
      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
      </svg>
    ),
  },
  {
    label: 'Certificate of Attendance',
    icon: (
      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
  },
  {
    label: 'Live Q&A',
    icon: (
      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
    ),
  },
]

/* ── Webinar data ───────────────────────────────────────────── */
const WEBINARS = [
  {
    id: 1,
    speaker: 'Nidhi Karthik Nayak',
    initials: 'NK',
    photo: 'https://rms.koenig-solutions.com/Sync_data/AutoResume/imagePhoto/08_Jun_2026_14_29_22_704Nidhi.jpg',
    avatarBg: 'linear-gradient(135deg,#34A853,#076D9D)',
    title: 'Work Smarter With Microsoft 365 Copilot',
    description: 'Discover how AI can simplify daily tasks, boost productivity, and unlock creativity across Word, Excel, PowerPoint, Outlook, and Teams—with practical Copilot use cases for everyday work.',
    partner: 'Microsoft',
    technology: 'Microsoft',
    date: '15 Jun 2026',
    time: '01:00 PM IST',
    duration: '1 Hour',
    registered: 45,
    live: true,
  },
  {
    id: 2,
    speaker: 'Lipika Sharma',
    initials: 'LS',
    photo: 'https://rms.koenig-solutions.com/Sync_data/Files/EmpPhoto/2024123594-Pic2.jpg',
    avatarBg: 'linear-gradient(135deg,#EC4899,#8B5CF6)',
    title: 'Microsoft AI Certification Fundamentals Series: AI 900 To AI Engineer Roadmap',
    description: 'Explore the complete Microsoft AI certification path from AI-900 fundamentals to the full AI Engineer roadmap, with exam preparation strategies and real-world AI application scenarios.',
    partner: 'Microsoft',
    technology: 'AI',
    date: '15 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 79,
    live: false,
  },
  {
    id: 3,
    speaker: 'Rashmi Sharma',
    initials: 'RS',
    photo: 'https://rms.koenig-solutions.com/Sync_data/AutoResume/imagePhoto/Rashmi%20Sharma.png',
    avatarBg: 'linear-gradient(135deg,#0694D1,#38bdf8)',
    title: 'DP-603: Implement Real Time Analytics With Microsoft Fabric',
    description: 'Learn to implement real-time analytics using Microsoft Fabric. Covers DP-603 exam topics including data streaming, pipelines, and building intelligent analytics solutions at scale.',
    partner: 'Microsoft',
    technology: 'Data',
    date: '15 Jun 2026',
    time: '04:00 PM IST',
    duration: '1 Hour',
    registered: 38,
    live: false,
  },
  {
    id: 4,
    speaker: 'Bharat Singh Thakur',
    initials: 'BT',
    photo: 'https://rms.koenig-solutions.com/Sync_data/AutoResume/imagePhoto/19_Jan_2026_11_6_28_38WhatsApp%20Image%202026-01-14%20at%209.44.47%20AM.jpeg',
    avatarBg: 'linear-gradient(135deg,#F59E0B,#B45309)',
    title: 'Mastering SAP LAM & The S/4HANA 9 Phase Maintenance Model',
    description: 'Deep dive into SAP Linear Asset Management and the structured 9-phase maintenance model in S/4HANA for enterprise-grade asset lifecycle management and operational efficiency.',
    partner: 'SAP',
    technology: 'ERP',
    date: '15 Jun 2026',
    time: '05:00 PM IST',
    duration: '1 Hour',
    registered: 12,
    live: false,
  },
  {
    id: 5,
    speaker: 'K M Bilvika',
    initials: 'KB',
    photo: 'https://rms.koenig-solutions.com/Sync_data/AutoResume/imagePhoto/11_Nov_2022_9_59_15_824BV%20Photo.jpg',
    avatarBg: 'linear-gradient(135deg,#065F46,#10B981)',
    title: 'PostgreSQL Database Administration',
    description: 'Master PostgreSQL DBA essentials—installation, configuration, backup & recovery, performance tuning, high availability, and security best practices for production environments.',
    partner: 'PostgreSQL',
    technology: 'Database',
    date: '15 Jun 2026',
    time: '06:00 PM IST',
    duration: '1 Hour',
    registered: 8,
    live: false,
  },
  {
    id: 6,
    speaker: 'Vinod Kumar',
    initials: 'VK',
    photo: 'https://rms.koenig-solutions.com/Sync_data/AutoResume/imagePhoto/31_Oct_2019_9_51_10_591vinodkumar.jpg',
    avatarBg: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
    title: 'Workflow Management Using Java And Spring Boot',
    description: 'Learn to design and implement enterprise-grade workflow management systems using Java and Spring Boot, covering state machines, process automation, and RESTful API patterns.',
    partner: 'Java',
    technology: 'Development',
    date: '15 Jun 2026',
    time: '06:00 PM IST',
    duration: '1 Hour',
    registered: 22,
    live: false,
  },
  {
    id: 7,
    speaker: 'Akash Rai',
    initials: 'AR',
    photo: 'https://rms.koenig-solutions.com/Sync_data/AutoResume/imagePhoto/12_Mar_2026_8_45_44_158my%20pic.jpg',
    avatarBg: 'linear-gradient(135deg,#DC2626,#F97316)',
    title: 'AI Driven Generative Design And Smart Manufacturing With Fusion 360',
    description: 'Explore how AI and generative design in Autodesk Fusion 360 are revolutionizing smart manufacturing—from concept generation to production-ready designs and simulation.',
    partner: 'Autodesk',
    technology: 'AI',
    date: '15 Jun 2026',
    time: '07:00 PM IST',
    duration: '1 Hour',
    registered: 5,
    live: false,
  },
  {
    id: 8,
    speaker: 'Sachin Chauhan',
    initials: 'SC',
    photo: 'https://rms.koenig-solutions.com/Sync_data/AutoResume/imagePhoto/Sachin%20Chauhan.png',
    avatarBg: 'linear-gradient(135deg,#0694D1,#7c3aed)',
    title: 'Designing Microsoft AI Agents With Copilot Studio – From Idea To Impact',
    description: 'Build intelligent AI agents with Microsoft Copilot Studio—from initial concept to enterprise deployment—covering agent design, actions, connectors, and real-world integration patterns.',
    partner: 'Microsoft',
    technology: 'AI',
    date: '15 Jun 2026',
    time: '08:00 PM IST',
    duration: '1 Hour',
    registered: 31,
    live: false,
  },
  {
    id: 9,
    speaker: 'Anshu Jayant Batra',
    initials: 'AB',
    photo: 'https://rms.koenig-solutions.com/Sync_data/AutoResume/imagePhoto/Anshu%20Jayant%20Batra.png',
    avatarBg: 'linear-gradient(135deg,#0694D1,#076D9D)',
    title: 'Automating Legacy Systems And Desktop Applications Using Microsoft Power Automate',
    description: 'Discover how Microsoft Power Automate desktop flows can modernize and automate legacy systems without costly rewrites, enabling seamless integration and end-to-end process automation.',
    partner: 'Microsoft',
    technology: 'Microsoft',
    date: '16 Jun 2026',
    time: '01:00 PM IST',
    duration: '1 Hour',
    registered: 19,
    live: false,
  },
  {
    id: 10,
    speaker: 'Jasleen Kaur',
    initials: 'JK',
    photo: 'https://rms.koenig-solutions.com/Sync_data/AutoResume/imagePhoto/19_Dec_2025_7_25_2_926pp2025.jpg',
    avatarBg: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
    title: 'DP-700 Exam Prep In 1 Hour',
    description: 'Fast-track your DP-700 Microsoft Fabric Analytics Engineer certification with a focused 1-hour review of exam objectives, key concepts, practice patterns, and time-saving strategies.',
    partner: 'Microsoft',
    technology: 'Data',
    date: '16 Jun 2026',
    time: '03:00 PM IST',
    duration: '1 Hour',
    registered: 14,
    live: false,
  },
  {
    id: 11,
    speaker: 'Bharat Singh Thakur',
    initials: 'BT',
    photo: 'https://rms.koenig-solutions.com/Sync_data/AutoResume/imagePhoto/19_Jan_2026_11_6_28_38WhatsApp%20Image%202026-01-14%20at%209.44.47%20AM.jpeg',
    avatarBg: 'linear-gradient(135deg,#F59E0B,#B45309)',
    title: 'Transitioning From SAP GUI To SAP Fiori Applications',
    description: 'Navigate the shift from SAP GUI to the modern SAP Fiori UX—covering migration strategies, Fiori app design principles, Launchpad configuration, and deployment best practices.',
    partner: 'SAP',
    technology: 'ERP',
    date: '16 Jun 2026',
    time: '04:00 PM IST',
    duration: '1 Hour',
    registered: 7,
    live: false,
  },
  {
    id: 12,
    speaker: 'Sajiyabanu Salat',
    initials: 'SS',
    photo: 'https://rms.koenig-solutions.com/Sync_data/AutoResume/imagePhoto/10_Nov_2025_20_24_26_537WhatsApp%20Image%202025-09-18%20at%2010.02.25%20PM.jpeg',
    avatarBg: 'linear-gradient(135deg,#F47920,#f6a05c)',
    title: 'GitHub Is More Than Push And Pull: Features Every Developer Should Know',
    description: 'Unlock the full potential of GitHub beyond basic version control—explore Actions, Codespaces, Copilot, Projects, and security scanning features every modern developer should leverage.',
    partner: 'GitHub',
    technology: 'DevOps',
    date: '16 Jun 2026',
    time: '05:00 PM IST',
    duration: '1 Hour',
    registered: 16,
    live: false,
  },
  {
    id: 13,
    speaker: 'Vinod Kumar',
    initials: 'VK',
    photo: 'https://rms.koenig-solutions.com/Sync_data/AutoResume/imagePhoto/31_Oct_2019_9_51_10_591vinodkumar.jpg',
    avatarBg: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
    title: 'Oracle WebLogic Administration Basics',
    description: 'Get started with Oracle WebLogic Server administration—covering domain configuration, application deployment, clustering, monitoring, security configuration, and troubleshooting fundamentals.',
    partner: 'Oracle',
    technology: 'Database',
    date: '16 Jun 2026',
    time: '06:00 PM IST',
    duration: '1 Hour',
    registered: 3,
    live: false,
  },
]

/* ── Partner logos ───────────────────────────────────────────── */
const PARTNER_LOGOS: Record<string, string> = {
  'Microsoft': '/images/partners/microsoft-cloud-t.png',
  'SAP':       '/images/partners/SAP.jpg',
  'PECB':      '/images/partners/Authorized PECB Certification Courses Training badge.png',
  'Autodesk':  '/images/partners/AutodeskCertification.png',
}

/* ── FAQs ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How do I register for a webinar?',
    a: <>You can visit our <a href="/upcoming-webinars" target="_blank" className="text-koenig-blue underline hover:opacity-80">webinar landing page</a> to browse upcoming sessions, click on &ldquo;Register&rdquo; for the session you&apos;re interested in, and submit the form available on the webinar registration page.</>,
  },
  {
    q: 'Who conducts the webinars?',
    a: 'Our webinars are conducted by industry and subject-matter experts, often in collaboration with trainers and professionals from leading organizations. This ensures you gain insights from top practitioners in the field.',
  },
  {
    q: 'What topics are covered in the webinars?',
    a: <>We cover a variety of topics, including emerging technologies, software development, data analytics, cybersecurity, project management, and more. Visit our <a href="/upcoming-webinars" target="_blank" className="text-koenig-blue underline hover:opacity-80">webinar page</a> to explore the full range of topics.</>,
  },
  {
    q: 'Are the webinars live or recorded?',
    a: 'Our webinars are always conducted live with our expert trainer to ensure interactive learning and real-time engagement.',
  },
  {
    q: 'Will I receive a certificate for attending?',
    a: 'Yes, attendees who complete the full webinar session are eligible to receive a Certificate of Attendance from Koenig Solutions.',
  },
  {
    q: 'What should I do if I don\'t receive the LET credentials email even after filling out the feedback form?',
    a: <>If you haven&apos;t received the email, please reach out to us at <a href="mailto:webinars@koenig-solutions.com" className="text-koenig-blue underline hover:opacity-80">webinars@koenig-solutions.com</a>, and our team will assist you.</>,
  },
  {
    q: 'Can I ask questions during the webinar?',
    a: 'Absolutely! Each webinar includes a dedicated Q&A session where you can ask questions and get answers directly from the experts.',
  },
  {
    q: 'How do I get access to the recording of the session?',
    a: 'Learners can receive the video recording of the session for a small amount. A participation certificate & a digital Credly badge is also provided as part of the bundle. Learners can make the payment by logging into LET and clicking on the "Access Badge & Certificate" button.',
  },
  {
    q: 'Are these webinars suitable for beginners?',
    a: <>Yes, we offer webinars for all skill levels. Check the session details on our <a href="/upcoming-webinars" target="_blank" className="text-koenig-blue underline hover:opacity-80"> landing page</a> to find the most suitable topics for you.</>,
  },
  {
    q: 'How do I contact Koenig Solutions for further queries?',
    a: <>For any questions, you can email us at <a href="mailto:webinars@koenig-solutions.com" className="text-koenig-blue underline hover:opacity-80">webinars@koenig-solutions.com</a>.</>,
  },
]

/* ─────────────────────────────────────────────────────────────── */
export default function UpcomingWebinarsPage() {
  const [openFaq, setOpenFaq]           = useState<number | null>(null)
  const [searchQuery, setSearchQuery]   = useState('')
  const [filterTech, setFilterTech]     = useState('All')
  const [filterPartner, setFilterPartner] = useState('All')
  const [showAll, setShowAll]           = useState(false)
  const [modalWebinar, setModalWebinar]   = useState<typeof WEBINARS[0] | null>(null)
  const [regWebinar, setRegWebinar]       = useState<typeof WEBINARS[0] | null>(null)
  const [regEmail, setRegEmail]           = useState('')
  const [regName, setRegName]             = useState('')
  const [regSubmitted, setRegSubmitted]   = useState(false)

  const allTechs    = ['All', ...Array.from(new Set(WEBINARS.map(w => w.technology)))]
  const allPartners = ['All', ...Array.from(new Set(WEBINARS.map(w => w.partner)))]

  const filtered = WEBINARS.filter(w => {
    const q = searchQuery.toLowerCase()
    return (
      (w.title.toLowerCase().includes(q) || w.speaker.toLowerCase().includes(q)) &&
      (filterTech    === 'All' || w.technology === filterTech) &&
      (filterPartner === 'All' || w.partner    === filterPartner)
    )
  })

  const displayed = showAll ? filtered : filtered.slice(0, 9)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home',            item: 'https://www.koenig-solutions.com' },
              { '@type': 'ListItem', position: 2, name: 'Learning Options', item: 'https://www.koenig-solutions.com/learning-options' },
              { '@type': 'ListItem', position: 3, name: 'Upcoming Webinars', item: 'https://www.koenig-solutions.com/upcoming-webinars' },
            ],
          }),
        }}
      />

      <Navbar />

      {/* ════════════════ HERO ════════════════ */}
      <section
        aria-label="Upcoming Webinars Hero"
        style={{ background: 'linear-gradient(135deg, #06111E 0%, #071828 55%, #061624 100%)', position: 'relative', overflow: 'hidden' }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-[0.07]"  style={{ background: 'radial-gradient(circle, #0694D1 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full opacity-[0.05]"   style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #0694D1 0%, transparent 70%)' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-5 lg:py-[50px]">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── Left copy ── */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.35)', color: '#38bdf8' }}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                Free · Expert-Led · Live Q&A Included
              </div>

              <style>{`
                @keyframes heroTitleSweep {
                  0%   { background-position: 0% 50% }
                  50%  { background-position: 100% 50% }
                  100% { background-position: 0% 50% }
                }
                .hero-title-sweep {
                  background: linear-gradient(270deg, #ffffff, #38bdf8, #0694D1, #38bdf8, #ffffff);
                  background-size: 300% 300%;
                  animation: heroTitleSweep 5s ease infinite;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                }
              `}</style>
              <h1 className="hero-title-sweep text-[36px] font-bold leading-tight mb-5">
                Join Our Free Expert Webinars<br />
                Learn, Grow &amp; Get Certified
              </h1>

              {/* Stats */}
              <div className="inline-flex items-center rounded-2xl mb-6"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(6,148,209,0.35)',
                  boxShadow: '0 4px 24px rgba(6,148,209,0.15), inset 0 1px 0 rgba(255,255,255,0.10)',
                }}>
                {HERO_STATS.map((s, i) => (
                  <div key={s.label} className="flex items-center">
                    <div className="flex flex-col items-center justify-center px-6 py-4">
                      <span className="text-2xl font-bold leading-none" style={{ color: '#38bdf8' }}>{s.value}</span>
                      <span className="text-xs font-medium mt-1 text-center leading-snug" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.label}</span>
                    </div>
                    {i < HERO_STATS.length - 1 && (
                      <div className="h-10 w-px" style={{ background: 'rgba(6,148,209,0.35)' }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                {TRUST_BADGES.map(badge => (
                  <span key={badge.label} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                    style={{ background: 'rgba(6,148,209,0.13)', border: '1px solid rgba(6,148,209,0.32)', color: '#38bdf8' }}>
                    {badge.icon}
                    {badge.label}
                  </span>
                ))}
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.60)' }}>
                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Join our LinkedIn Group for daily updates –{' '}
                <a href="https://www.linkedin.com/company/koenig-solutions/" target="_blank" rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2 hover:text-white transition-colors"
                  style={{ color: '#38bdf8' }}>
                  Join Here
                </a>
              </div>
            </div>

            {/* ── Right: video (desktop) ── */}
            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-2xl"
                style={{ border: '1.5px solid rgba(6,148,209,0.50)', boxShadow: '0 0 0 4px rgba(6,148,209,0.08), 0 0 30px 6px rgba(6,148,209,0.22), 0 8px 40px rgba(6,109,157,0.28)' }}>
                <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                  {/* Replace VIDEO_ID below with the YouTube video ID from koenig-solutions.com/upcoming-webinars */}
                  <iframe
                    src="https://www.youtube.com/embed/B2ezhvq1ito?rel=0&autoplay=1&mute=1&loop=1&playlist=B2ezhvq1ito&enablejsapi=1"
                    title="Welcome to Koenig Webinars"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* ── Mobile stats row ── */}
            <div className="lg:hidden grid grid-cols-2 gap-2 mt-2">
              {HERO_STATS.map(s => (
                <div key={s.label} className="flex flex-col items-center justify-center rounded-xl py-3 px-2"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(6,148,209,0.30)' }}>
                  <span className="text-lg font-black leading-none" style={{ color: '#38bdf8' }}>{s.value}</span>
                  <span className="text-xs font-medium mt-0.5 text-center leading-tight" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* ── Mobile video ── */}
            <div className="lg:hidden">
              <div className="overflow-hidden rounded-xl"
                style={{ border: '1px solid rgba(6,148,209,0.40)', boxShadow: '0 4px 24px rgba(6,148,209,0.20)' }}>
                <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src="https://www.youtube.com/embed/B2ezhvq1ito?rel=0&autoplay=1&mute=1&loop=1&playlist=B2ezhvq1ito&enablejsapi=1"
                    title="Welcome to Koenig Webinars"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════ STREAMING LIVE BANNER ════════════════ */}
      <div style={{ background: 'linear-gradient(90deg, #dbeafe 0%, #e0f2fe 40%, #bfdbfe 100%)', borderBottom: '1px solid rgba(6,148,209,0.20)', borderTop: '1px solid rgba(6,148,209,0.15)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-base font-medium shrink-0"
                style={{ background: 'rgba(34,197,94,0.18)', border: '1px solid rgba(34,197,94,0.50)', color: '#16a34a' }}>
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#FF0000">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Streaming Live
              </span>
              <span className="font-extrabold text-center sm:text-left w-full sm:w-auto" style={{ color: '#093148', fontSize: '18px' }}>
                Information Security Governance – From Strategy To Execution
              </span>
            </div>
            <a href="#webinar-listings"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 4px 16px rgba(6,148,209,0.40)' }}>
              Join Now →
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════ SUBSCRIBE BAR ════════════════ */}
      <div style={{ background: '#EBF8FE', borderBottom: '1px solid #CAEFFF' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-5">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-base font-semibold text-center sm:text-left shrink-0" style={{ color: '#0d1b2a' }}>
              Subscribe for updates on our Upcoming Webinars
            </p>
            <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full sm:w-64 rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30"
                style={{ borderColor: '#CAEFFF', background: 'white', color: '#0d1b2a' }}
              />
              <button className="shrink-0 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 4px 16px rgba(6,148,209,0.35)' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════ WEBINAR LISTINGS ════════════════ */}
      <section id="webinar-listings" aria-labelledby="webinars-heading" className="py-10" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">

          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 id="webinars-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Register Now for our{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg,#0694D1,#38bdf8)' }}>
                Upcoming Webinars
              </span>
            </h2>
          </div>

          {/* Search & Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[160px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search Course"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30"
                style={{ borderColor: '#CAEFFF', background: 'white', color: '#0d1b2a' }}
              />
            </div>
            <select value={filterTech} onChange={e => setFilterTech(e.target.value)}
              className="rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30"
              style={{ borderColor: '#CAEFFF', background: 'white', color: '#465058' }}>
              {allTechs.map(t => (
                <option key={t} value={t}>{t === 'All' ? 'Filter by Technology' : t}</option>
              ))}
            </select>
            <select value={filterPartner} onChange={e => setFilterPartner(e.target.value)}
              className="rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30"
              style={{ borderColor: '#CAEFFF', background: 'white', color: '#465058' }}>
              {allPartners.map(p => (
                <option key={p} value={p}>{p === 'All' ? 'Filter by Partner' : p}</option>
              ))}
            </select>
          </div>

          {/* Cards */}
          {displayed.length === 0 ? (
            <div className="py-16 text-center text-sm" style={{ color: '#64748b' }}>No webinars match your filters.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayed.map(w => (
                  <article key={w.id}
                    className="relative flex flex-col rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mt-3"
                    style={{ border: '1px solid #CAEFFF', boxShadow: '0 4px 16px rgba(0,164,239,0.08)' }}>

                    {w.live && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-bold z-10 whitespace-nowrap"
                        style={{ background: '#16a34a', color: '#fff', boxShadow: '0 2px 10px rgba(22,163,74,0.45)', border: '2px solid #fff' }}>
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        Live Now
                      </span>
                    )}

                    <div className="flex-1 flex flex-col p-5 relative">
                      {/* Speaker row */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative shrink-0">
                            {w.photo ? (
                              <Image src={w.photo} alt={w.speaker}
                                width={64} height={64}
                                quality={90}
                                className="w-16 h-16 rounded-full object-cover object-top shadow-md"
                                style={{ border: '2px solid rgba(6,148,209,0.20)' }}
                                onError={(e) => { (e.target as HTMLImageElement).style.display='none'; (e.target as HTMLImageElement).nextElementSibling?.removeAttribute('style') }}
                              />
                            ) : null}
                            <div className="w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md"
                              style={{ background: w.avatarBg, border: '2px solid rgba(6,148,209,0.20)', display: w.photo ? 'none' : 'flex' }}>
                              {w.initials}
                            </div>
                          </div>
                          <p className="text-sm font-bold leading-snug" style={{ color: '#0d1b2a' }}>{w.speaker}</p>
                        </div>
                        {/* Vendor logo */}
                        {PARTNER_LOGOS[w.partner] ? (
                          <img src={PARTNER_LOGOS[w.partner]} alt={w.partner}
                            className="h-12 w-auto max-w-[100px] object-contain shrink-0 mt-0.5" />
                        ) : (
                          <span className="shrink-0 rounded-full px-2.5 py-1 text-sm font-semibold mt-1"
                            style={{ background: 'rgba(6,148,209,0.10)', color: '#0694D1', border: '1px solid rgba(6,148,209,0.25)' }}>
                            {w.partner}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="mb-4 text-base font-bold leading-snug flex-1" style={{ color: '#0F172A', fontSize: '16px' }}>
                        {w.title}
                      </h3>

                      {/* Meta */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm" style={{ color: '#465058' }}>
                          <span className="flex items-center gap-1.5">
                            <svg className="h-3.5 w-3.5 shrink-0" style={{ color: '#0694D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            {w.date} | {w.time}
                          </span>
                          <span className="flex items-center gap-1" style={{ color: '#0694D1' }}>
                            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/>
                            </svg>
                            {w.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm" style={{ color: '#64748b' }}>
                          <svg className="h-3.5 w-3.5 shrink-0" style={{ color: '#0694D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          {w.registered} Registered
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t px-5 py-3"
                      style={{ borderColor: '#EBF8FE', background: '#F8FCFF' }}>
                      <button onClick={() => setModalWebinar(w)} className="text-sm font-semibold transition-colors hover:text-[#0694D1]" style={{ color: '#465058' }}>
                        Show More &rsaquo;
                      </button>
                      <button onClick={() => { setRegWebinar(w); setRegEmail(''); setRegName(''); setRegSubmitted(false) }}
                        className="rounded-lg px-8 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                        style={{ background: 'linear-gradient(135deg,#093148 0%,#0d5280 100%)', boxShadow: '0 2px 8px rgba(9,49,72,0.35)' }}>
                        {w.live ? 'Join Now' : 'Register'}
                      </button>
                    </div>
                  </article>
              ))}
            </div>
          )}

          {/* Show All */}
          {!showAll && filtered.length > 9 && (
            <div className="mt-10 text-center">
              <button onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 rounded-xl border-2 px-8 py-3 text-sm font-bold transition-all hover:bg-[#0694D1] hover:text-white hover:border-[#0694D1]"
                style={{ borderColor: '#0694D1', color: '#0694D1' }}>
                Show All
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════ FAQ ════════════════ */}
      <section className="relative overflow-hidden bg-koenig-light px-4 md:px-8 lg:px-[50px] py-5 sm:py-[60px]">
        <div className="pointer-events-none absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.19) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.20) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.15) 0%, transparent 70%)' }} />

        <div className="mx-auto max-w-7xl">
          <div className="text-center" style={{ marginBottom: '35px' }}>
            <h2 id="faq-heading" className="mb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-koenig-dark">
              Frequently <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Asked Questions</span>
            </h2>
            <p className="text-sm sm:text-base text-koenig-muted">Everything you need to know before joining a webinar</p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 === 0).map((f, j) => {
                const i = j * 2; const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-6 sm:py-4">
                      <span className={`text-sm font-semibold leading-snug sm:text-base ${isOpen ? 'text-koenig-blue' : 'text-koenig-dark'}`} style={{ transition: 'color 0.3s' }}>{f.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed text-koenig-muted sm:px-6 sm:py-4 sm:text-base">{f.a}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 !== 0).map((f, j) => {
                const i = j * 2 + 1; const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-6 sm:py-4">
                      <span className={`text-sm font-semibold leading-snug sm:text-base ${isOpen ? 'text-koenig-blue' : 'text-koenig-dark'}`} style={{ transition: 'color 0.3s' }}>{f.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed text-koenig-muted sm:px-6 sm:py-4 sm:text-base">{f.a}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ════════ SUBSCRIBE STRIP ════════ */}
      <section className="px-4 md:px-8 lg:px-[50px] py-3.5" style={{ background: '#dbeafe', borderTop: '1px solid #bfdbfe' }}>
        <div className="mx-auto max-w-7xl flex justify-center">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-sm font-bold whitespace-nowrap" style={{ color: '#0F172A' }}>Subscribe for updates on our Upcoming Webinars</p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter Email"
                className="rounded-lg border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30 w-56"
                style={{ borderColor: '#bfdbfe', background: '#fff', color: '#0F172A' }}
              />
              <button
                className="shrink-0 rounded-lg px-5 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: '#0694D1' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ WEBINAR DETAIL MODAL ════════ */}
      {modalWebinar && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: 'rgba(6,17,30,0.75)', backdropFilter: 'blur(6px)' }}
          onClick={() => setModalWebinar(null)}
        >
          {/* Card */}
          <div
            className="relative flex w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl"
            style={{ background: '#fff' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close — inside card, top-right */}
            <button
              onClick={() => setModalWebinar(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-70"
              style={{ background: '#1e293b', color: '#fff' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>

            {/* Left — speaker */}
            <div className="flex w-[190px] shrink-0 flex-col items-center justify-center gap-3 px-6 py-8" style={{ background: '#f1f5f9', borderRight: '1px solid #e2e8f0' }}>
              {/* Photo or initials */}
              {modalWebinar.photo ? (
                <Image src={modalWebinar.photo} alt={modalWebinar.speaker}
                  width={96} height={96}
                  quality={90}
                  className="h-24 w-24 rounded-xl object-cover object-top shadow-md"
                  style={{ border: '3px solid rgba(6,148,209,0.20)' }} />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-xl text-2xl font-bold text-white shadow-md"
                  style={{ background: modalWebinar.avatarBg, border: '3px solid rgba(6,148,209,0.20)' }}>
                  {modalWebinar.initials}
                </div>
              )}
              <p className="text-center text-sm font-bold leading-snug" style={{ color: '#0d1b2a' }}>{modalWebinar.speaker}</p>
              {/* Vendor logo */}
              {PARTNER_LOGOS[modalWebinar.partner] ? (
                <img src={PARTNER_LOGOS[modalWebinar.partner]} alt={modalWebinar.partner}
                  className="h-8 w-auto max-w-[100px] object-contain opacity-80" />
              ) : null}
              {modalWebinar.live && (
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" style={{ background: '#16a34a', color: '#fff' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  Live Now
                </span>
              )}
            </div>

            {/* Right — title + description */}
            <div className="relative flex flex-1 flex-col justify-center p-7 pr-12">
              {/* Quote decoration */}
              <svg className="absolute right-5 top-5 opacity-10" width="36" height="36" viewBox="0 0 24 24" fill="#0694D1"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>

              <h3 className="mb-3 text-base font-bold leading-snug" style={{ color: '#0F172A' }}>{modalWebinar.title}</h3>
              {modalWebinar.description && (
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{modalWebinar.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ════════ REGISTRATION MODAL ════════ */}
      {regWebinar && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: 'rgba(6,17,30,0.80)', backdropFilter: 'blur(8px)' }}
          onClick={() => setRegWebinar(null)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header band */}
            <div className="relative px-7" style={{ background: 'linear-gradient(135deg,#093148 0%,#0d5280 100%)', paddingTop: '15px', paddingBottom: '15px' }}>
              <button onClick={() => setRegWebinar(null)}
                className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full transition-opacity hover:opacity-70"
                style={{ background: 'rgba(255,255,255,0.15)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>

              {/* Live badge — centered at top */}
              {regWebinar.live && (
                <div className="flex justify-center mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" style={{ background: '#16a34a', color: '#fff' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    Live
                  </span>
                </div>
              )}

              {/* Speaker row */}
              <div className="flex items-center gap-3 mb-4">
                {regWebinar.photo ? (
                  <Image src={regWebinar.photo} alt={regWebinar.speaker} width={44} height={44} quality={90}
                    className="rounded-full object-cover object-top shrink-0" style={{ border: '2px solid rgba(255,255,255,0.30)' }} />
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: regWebinar.avatarBg, border: '2px solid rgba(255,255,255,0.30)' }}>
                    {regWebinar.initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white/70 mb-0.5">Speaker</p>
                  <p className="text-sm font-bold text-white leading-tight truncate">{regWebinar.speaker}</p>
                </div>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug">{regWebinar.title}</h3>
            </div>

            {/* Body */}
            <div className="px-7 py-6" style={{ background: '#fff' }}>
              {regSubmitted ? (
                <div className="flex flex-col items-center gap-3 py-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: 'rgba(22,163,74,0.12)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <p className="text-base font-bold" style={{ color: '#0F172A' }}>You&apos;re registered!</p>
                  <p className="text-sm" style={{ color: '#64748b' }}>Check your inbox for confirmation details.</p>
                </div>
              ) : (
                <>
                  <p className="mb-5 text-sm" style={{ color: '#64748b' }}>Fill in your details to secure your spot for this free webinar.</p>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold" style={{ color: '#374151' }}>
                      Email Address <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2"
                      style={{ borderColor: '#e2e8f0', color: '#0F172A' }}
                    />
                  </div>

                  <button
                    onClick={() => { if (regEmail) setRegSubmitted(true) }}
                    className="mt-6 w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg,#093148 0%,#0d5280 100%)', boxShadow: '0 4px 14px rgba(9,49,72,0.35)' }}>
                    {regWebinar.live ? 'Join Now →' : 'Register for Free →'}
                  </button>

                  <p className="mt-3 text-center text-xs" style={{ color: '#94a3b8' }}>
                    Free event · No credit card required
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

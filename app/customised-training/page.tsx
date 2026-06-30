'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

/* ── Feature cards ──────────────────────────────────────────────── */
const FEATURES = [
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/Ai.png',
    title: 'Embedding AI Tools / Gen AI',
    desc: 'Leverage cutting-edge AI tools and technology in the context of your chosen course to enhance learning outcomes.',
    icon: <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/></>,
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/video.png',
    title: 'Recorded Sessions',
    desc: 'Session recordings accessible for 90 days, with extensions available upon request.',
    icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/report.png',
    title: 'Manager Reports',
    desc: 'Tailored reports for managers — learner performance, attendance, exam redemption, Qubits scores, and more.',
    icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/live.png',
    title: 'Live Training',
    desc: 'Expert-led training delivered live in both online and offline formats to suit your schedule.',
    icon: <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/custom.png',
    title: 'Customised LMS',
    desc: 'Learner access to Qubits, knowledge checks, trainer-shared resources and all course-related information.',
    icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/translate.png',
    title: 'Content Translation',
    desc: 'PPTs, videos with voiceovers, and subtitles translated into your required language.',
    icon: <><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></>,
  },
]

/* ── Case studies ────────────────────────────────────────────────── */
const CASE_STUDIES = [
  { id: 1,  title: 'Seamless SAP Migration Through Tailored Training',
    img: '/images/CT/Seamless SAP Migration Through Tailored Training.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EfU26l6V5zVCoNwtQEdAVPABwwq3HBBeR-vlWTravCUOCw?e=iSgkTX' },
  { id: 2,  title: 'Fueling Innovation with Azure OpenAI Hackathons',
    img: '/images/CT/Fueling Innovation with Azure OpenAI Hackathons.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/Ec33ZZxAN1NNiMDk78_GAXYBKxagI-_1mWneNf5PhiQGYw?e=X6S8B1' },
  { id: 3,  title: '140 Learners Upskilled in Azure and AI Fundamentals',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&h=338&q=80',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EfdNC1uET4VDpBOiN4cOEccB2wU0NoQF4Un5i-JH7ZLvbg?e=GHdpPN' },
  { id: 4,  title: 'Empowering Women in Tech with AI Training',
    img: '/images/CT/Empowering Women in Tech with AI Training.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EYQVsQPyQ25OiLMg15mhqQsByLTUkai3awpn1U9EQIThiA?e=EVMphd' },
  { id: 5,  title: 'Power BI Upskilling Across Roles and Regions',
    img: '/images/CT/Power BI Upskilling Across Roles and Regions.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EZDedHCqW01HtbiS70zzcgUB9ZOVHGVbpiFC1-dVxF2laQ?e=uD6ENm' },
  { id: 6,  title: 'Cloud Migration Kickoff with Azure & AWS Training',
    img: '/images/CT/Cloud Migration Kickoff with Azure & AWS Training.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EchtfC08EwpBgOWn3O7s5iQB7SFIREomxa8pjZif_9HTLA?e=w1IJDp' },
  { id: 7,  title: 'Boosting Security Skills with Microsoft Stack Training',
    img: '/images/CT/Boosting Security Skills with Microsoft Stack Training.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EcnoT3TG0oBBlWyRzWJ1ADsBWTsJWWWNJW9FTXii-hvVOg?e=jhu8Fo' },
  { id: 8,  title: 'Custom Leadership Training for Cross-Cultural Impact',
    img: '/images/CT/Custom Leadership Training for Cross-Cultural Impact.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EdWX_PjQZaJMqK0wCpK8dTUBfIyfN0f-oA_EUxFpSthRpg?e=ksv1y3' },
  { id: 9,  title: 'Solving Postgres-Azure Complexity with Custom Training',
    img: '/images/CT/Solving Postgres-Azure Complexity with Custom Training.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EUnmZpX1wIdMpiVblaAbG7cBUEm98Vt1rWmy1k5StCoWnw?e=qhmnLk' },
  { id: 10, title: 'Equipping Nonprofits with Real-World AI & Data Skills',
    img: '/images/CT/Equipping Nonprofits with Real-World AI & Data Skills.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/ERNgYFVZYUVKgQmqBKGKlqsB5NMQfPiDS7SGzvpzFr8hLA?e=jlIE0s' },
  { id: 11, title: 'On-Premise Power BI Training for High-Security Environments',
    img: '/images/CT/On-Premise Power BI Training for High-Security Environments.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EeJu1_x1WOhNr3kmMexs_j8BBxZHeEPlZqOOGBnEuiu4mg?e=oSf45o' },
  { id: 12, title: 'Rebuilding BI Publisher Training from the Ground Up',
    img: '/images/CT/Rebuilding BI Publisher Training from the Ground Up.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EV_JHsnkjtpFrqmR5-Q9fN8BHp5sr-kYfafKCwqf5hSCAw?e=aEhYWk' },
  { id: 13, title: 'Scaling Azure Training with Multilingual AI Localization',
    img: '/images/CT/Scaling Azure Training with Multilingual AI Localization.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EVwhr5MFlO1Iq512J2IcDq0BEoUAS8VAeEdCJNlgpv5JUA?e=vLvpXx' },
  { id: 14, title: 'Terraform Certification with IBM Cloud, Tailored On-Site',
    img: '/images/CT/Terraform Certification with IBM Cloud, Tailored On-Site.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EQAkg1mbdbFMl_ynU7uk1ToBk8itsLiYobxivG4Vc9Ynlg?e=SBxQrD' },
  { id: 15, title: 'Mastering OKD: OpenShift Training for Cost-Saving DevOps',
    img: '/images/CT/Mastering OKD OpenShift Training for Cost-Saving DevOps.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EQDdXvxwaHpOruUqfKMaBQ0BED8IeU0Frj4jpCbkgWkRhw?e=8CFIgL' },
  { id: 16, title: 'Building In-House Microservices Expertise from the Ground Up',
    img: '/images/CT/Building In-House Microservices Expertise from the Ground Up.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EQr1Sqx6OoRCitD5dtMTWXEBUAyoXRMPpjBKwMIG-aUetw?e=VHGyUn' },
  { id: 17, title: 'Custom LMS & Cyber Labs Training for Global Retailer',
    img: '/images/CT/Custom LMS & Cyber Labs Training for Global Retailer.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EcT4yVMaUk9NmktA0mb9uoMBvZ7ORSMxzd6PvCr9X5VoYA?e=vjUWSo' },
  { id: 18, title: 'Scaling Copilot Training with Role-Based Precision',
    img: '/images/CT/Scaling Copilot Training with Role-Based Precision.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EQERTvmN2TdCk643RuJ8cbQB1Gba988f5xMe7WwQmJ3D6A?e=e7aSLi' },
  { id: 19, title: 'Offline Network Training for High-Security Government Environments',
    img: '/images/CT/Offline Network Training for High-Security Government Environments.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/ES-kJ9ae-eRFqf6tV79IcVcBP85HdARQ2PBmzKkMKSKWYw?e=mMokia' },
  { id: 20, title: 'Custom Cisco Nexus Training for Data Center Excellence',
    img: '/images/CT/Custom Cisco Nexus Training for Data Center Excellence.png',
    pdf: 'https://koenigsolutionsltd-my.sharepoint.com/:b:/g/personal/rohit_tiwary_koenig-solutions_com/EeLmfnLIVDBHirbTbkyiczoB6JhgGpFhrx9a2gCm2_ZtsQ?e=bcbbM8' },
]

/* ── Stats (ILO style) ──────────────────────────────────────────── */
const HERO_STATS = [
  { val: '500+',  label: 'Enterprise Clients',
    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></> },
  { val: '50+',   label: 'Countries Served',
    icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></> },
  { val: '98%',   label: 'Satisfaction Rate',
    icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></> },
  { val: '33+',   label: 'Years in Training',
    icon: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></> },
]

const INITIAL_VISIBLE = 8

/* ── Page ────────────────────────────────────────────────────────── */
export default function CustomisedTrainingPage() {
  const [showAll, setShowAll]         = useState(false)
  const [requirement, setRequirement] = useState('')
  const [name, setName]               = useState('')
  const [email, setEmail]             = useState('')
  const [robotChecked, setRobotChecked] = useState(false)
  const [generating, setGenerating]   = useState(false)
  const [generated, setGenerated]     = useState(false)
  const [emailSent, setEmailSent]     = useState(false)

  const visibleStudies = showAll ? CASE_STUDIES : CASE_STUDIES.slice(0, INITIAL_VISIBLE)

  const handleGenerate = () => {
    if (!requirement.trim() || generating) return
    setGenerating(true)
    setGenerated(false)
    setTimeout(() => { setGenerating(false); setGenerated(true) }, 2000)
  }

  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #061624 0%, #071929 60%, #062236 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow blobs */}
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', top: -160, right: '33%', width: 600, height: 600, borderRadius: '50%', opacity: 0.15, filter: 'blur(120px)', background: '#0694D1' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 400, height: 400, borderRadius: '50%', opacity: 0.10, filter: 'blur(100px)', background: '#38bdf8' }} />
          <div style={{ position: 'absolute', top: '50%', right: 0, width: 300, height: 300, borderRadius: '50%', opacity: 0.08, filter: 'blur(80px)', background: '#076D9D' }} />
        </div>

        <style>{`
          .ct-stat-item:hover .ct-stat-glow { opacity: 1 !important; }
          .ct-features-grid { grid-template-columns: repeat(3, 1fr) !important; }
          @media (max-width: 767px) {
            .ct-features-grid { grid-template-columns: 1fr !important; }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .ct-features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 1023px) {
            .ct-hero-grid { grid-template-columns: 1fr !important; }
            .ct-stats-card { display: none !important; }
            .ct-mobile-stats { display: grid !important; }
          }
        `}</style>

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '35px 20px 35px', paddingLeft: 'max(20px, 50px)', paddingRight: 'max(20px, 50px)' }}>
          <div className="ct-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            {/* ── Left: text ─────────────────────────────────── */}
            <div>
              <div style={{ marginBottom: 16, display: 'inline-flex', alignItems: 'center', gap: 8,
                borderRadius: 999, padding: '6px 16px', fontSize: 12, fontWeight: 600,
                background: 'rgba(6,148,209,0.18)', color: '#38bdf8', border: '1px solid rgba(6,148,209,0.35)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8', display: 'inline-block', animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }} />
                Enterprise Learning Solutions
              </div>

              <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, lineHeight: 1.18,
                marginBottom: 16, color: '#fff', letterSpacing: '-0.02em' }}>
                Empower your Workforce with Koenig&apos;s{' '}
                <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Customized Learning
                </span>
              </h1>

              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 28, maxWidth: 520 }}>
                Tailored programmes designed around your business goals — blending expert-led live training, AI tools, custom LMS, and multilingual content delivery.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
                <a href="#generator" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #0694D1, #076D9D)',
                  color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none',
                  boxShadow: '0 0 20px rgba(6,148,209,0.35)',
                }}>
                  Generate a Custom Course
                </a>
                <a href="#case-studies" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 12, cursor: 'pointer',
                  border: '1.5px solid rgba(6,148,209,0.6)', color: '#38bdf8',
                  background: 'rgba(6,148,209,0.08)', fontSize: 14, fontWeight: 700,
                  textDecoration: 'none',
                }}>
                  View Case Studies
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>

              {/* Mobile stats (hidden on desktop) */}
              <div className="ct-mobile-stats" style={{ display: 'none', gridTemplateColumns: '1fr 1fr', borderRadius: 16, border: '1px solid rgba(6,148,209,0.18)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                {HERO_STATS.map(({ val, label }, i) => (
                  <div key={val} style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 4,
                    borderRight: i % 2 === 0 ? '1px solid rgba(6,148,209,0.12)' : 'none',
                    borderBottom: i < 2 ? '1px solid rgba(6,148,209,0.12)' : 'none' }}>
                    <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1,
                      background: 'linear-gradient(135deg, #ffffff 0%, #50e6ff 60%, #0694D1 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{val}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: stats card (ILO style) ──────────────── */}
            <div className="ct-stats-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* 2×2 stats grid */}
              <div style={{ borderRadius: 20, border: '1px solid rgba(6,148,209,0.15)', overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,148,209,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ display: 'grid', gridTemplateRows: 'auto 1px auto' }}>
                  {/* Row 1 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
                    {HERO_STATS.slice(0, 2).map((s, i) => (
                      <>
                        {i === 1 && <div key="div" style={{ background: 'rgba(6,148,209,0.12)' }} />}
                        <div key={s.val} className="ct-stat-item" style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
                          <div className="ct-stat-glow" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(6,148,209,0.5), transparent)', opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{s.icon}</svg>
                            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, background: 'linear-gradient(135deg, #ffffff 0%, #50e6ff 60%, #0694D1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
                          </div>
                          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>{s.label}</div>
                        </div>
                      </>
                    ))}
                  </div>
                  {/* divider */}
                  <div style={{ height: 1, background: 'rgba(6,148,209,0.12)' }} />
                  {/* Row 2 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
                    {HERO_STATS.slice(2, 4).map((s, i) => (
                      <>
                        {i === 1 && <div key="div2" style={{ background: 'rgba(6,148,209,0.12)' }} />}
                        <div key={s.val} className="ct-stat-item" style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
                          <div className="ct-stat-glow" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(6,148,209,0.5), transparent)', opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{s.icon}</svg>
                            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, background: 'linear-gradient(135deg, #ffffff 0%, #50e6ff 60%, #0694D1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
                          </div>
                          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>{s.label}</div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trusted by card */}
              <div style={{ borderRadius: 20, border: '1px solid rgba(6,148,209,0.15)', background: 'rgba(255,255,255,0.02)', position: 'relative', padding: '20px 22px' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: 20, background: 'linear-gradient(135deg, rgba(6,148,209,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>Trusted by enterprises across</div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {['Finance','Healthcare','Government','Retail','Technology','Manufacturing','Consulting','Telecoms'].map(s => (
                      <span key={s} style={{ fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
                        color: 'rgba(255,255,255,0.5)' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* ── HOW WE ARE DIFFERENT ───────────────────────────────── */}
      <section style={{ background: '#e8f5fb', padding: '64px 20px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: 'max(0px, 30px)', paddingRight: 'max(0px, 30px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'inline-block', marginBottom: 12, borderRadius: 999,
              background: 'rgba(6,148,209,0.12)', padding: '6px 18px', fontSize: 12,
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0694D1' }}>
              What Makes Us Different
            </span>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#0d1b2a', marginBottom: 14, lineHeight: 1.25, letterSpacing: '-0.015em' }}>
              How are Koenig&apos;s Customized Learning{' '}
              <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Solutions different?
              </span>
            </h2>
            <p style={{ fontSize: 15, color: '#4a6580', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              Koenig combines different services to meet the business outcome you need.
            </p>
          </div>

          <div className="ct-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div key={i}
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, padding: '24px 22px',
                  borderRadius: 20, cursor: 'default', overflow: 'hidden', transition: 'all 0.3s',
                  background: '#fff', border: '1px solid #CAEFFF',
                  boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(6,148,209,0.55)'
                  el.style.boxShadow = '0 12px 36px rgba(6,148,209,0.15), 0 0 0 1px rgba(6,148,209,0.3)'
                  el.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = '#CAEFFF'
                  el.style.boxShadow = '0 2px 12px rgba(6,148,209,0.07)'
                  el.style.transform = 'none'
                }}>
                {/* Top accent line on hover */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', height: 2, width: 0,
                  borderRadius: 999, pointerEvents: 'none', transition: 'width 0.5s',
                  background: 'linear-gradient(90deg, transparent, #0694D1, #38bdf8, #0694D1, transparent)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.width = '100%' }}
                />
                {/* Icon */}
                <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.20)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.img} alt={f.title} style={{ width: 30, height: 30, objectFit: 'contain' }}
                    onError={e => {
                      const img = e.currentTarget as HTMLImageElement
                      img.style.display = 'none'
                      if (img.parentElement) img.parentElement.innerHTML = `<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#0694D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${(f.icon as unknown as {props: {children: string}}).props?.children ?? ''}</svg>`
                    }} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0d1b2a', lineHeight: 1.4, margin: 0 }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, color: '#4a6580', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ───────────────────────────────────────── */}
      <section id="case-studies" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,148,209,0.13) 0%, rgba(6,148,209,0.04) 50%, #f0f7fc 100%)', padding: '64px 20px', borderTop: '1px solid #CAEFFF', boxShadow: 'inset 0 8px 48px rgba(6,148,209,0.10)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: 'max(0px, 30px)', paddingRight: 'max(0px, 30px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'inline-block', marginBottom: 12, borderRadius: 999,
              background: 'rgba(6,148,209,0.10)', padding: '6px 18px', fontSize: 12,
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0694D1' }}>
              Success Stories
            </span>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#06111E', marginBottom: 14, lineHeight: 1.25, letterSpacing: '-0.015em' }}>
              Our{' '}
              <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Case Studies
              </span>
            </h2>
            <p style={{ fontSize: 15, color: '#7a8c96', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              How Koenig has delivered tailored learning programmes for organisations across the globe.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 20 }}>
            {visibleStudies.map(cs => (
              <div key={cs.id}
                style={{ background: '#fff', borderRadius: 16, overflow: 'hidden',
                  border: '1px solid #CAEFFF', boxShadow: '0 2px 8px rgba(6,148,209,0.06)',
                  transition: 'box-shadow 0.2s, transform 0.2s', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = '0 12px 32px rgba(6,148,209,0.14)'
                  el.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = '0 2px 8px rgba(6,148,209,0.06)'
                  el.style.transform = 'none'
                }}>
                {/* Thumbnail */}
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#0d1f2d', flexShrink: 0, position: 'relative', transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cs.img}
                    alt={cs.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      imageRendering: 'auto', transform: 'scale(1.01)',
                      WebkitBackfaceVisibility: 'hidden' }}
                    onError={e => {
                      const img = e.currentTarget as HTMLImageElement
                      img.style.display = 'none'
                    }}
                  />
                </div>
                {/* Body */}
                <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#06111E', lineHeight: 1.55, margin: 0 }}>
                    {cs.title}
                  </h3>
                  <div style={{ marginTop: 'auto' }}>
                    <a href={cs.pdf}
                      target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 12, fontWeight: 700, color: '#0694D1', textDecoration: 'none' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      Read Case Study
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {CASE_STUDIES.length > INITIAL_VISIBLE && (
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <button
                onClick={() => setShowAll(s => !s)}
                style={{ padding: '12px 32px', borderRadius: 12, border: '2px solid #0694D1',
                  background: 'transparent', color: '#0694D1', fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#0694D1'; el.style.color = '#fff' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'transparent'; el.style.color = '#0694D1' }}>
                {showAll ? 'Show Less' : `Show ${CASE_STUDIES.length - INITIAL_VISIBLE} More Case Studies`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(145deg, #06111E 0%, #081d35 60%, #06111E 100%)', padding: '64px 20px', position: 'relative', overflow: 'hidden' }}>
        {/* Radial glow */}
        <div style={{ pointerEvents: 'none', position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,148,209,0.12) 0%, transparent 65%)' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: 'max(0px, 30px)', paddingRight: 'max(0px, 30px)', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ display: 'inline-block', marginBottom: 12, borderRadius: 999, background: 'rgba(6,148,209,0.10)', padding: '6px 18px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0694D1' }}>
              Our Process
            </span>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#fff', marginBottom: 14, lineHeight: 1.25, letterSpacing: '-0.015em' }}>
              How Customised Training{' '}
              <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Works
              </span>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              From your first conversation to post-training reports — a seamless end-to-end experience built around your goals.
            </p>
          </div>

          <div className="ct-how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
            {/* Connecting line */}
            <div className="ct-how-line" style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 2, background: 'linear-gradient(90deg, transparent, rgba(6,148,209,0.35) 15%, rgba(6,148,209,0.35) 85%, transparent)', pointerEvents: 'none', zIndex: 0 }} />

            {[
              {
                step: '01', title: 'Share Your Requirement',
                desc: 'Tell us your team size, skills gaps, preferred format, timeline, and budget. We listen before we design.',
                icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
              },
              {
                step: '02', title: 'Custom Curriculum Design',
                desc: 'Our experts build a bespoke course outline, blending AI tools, live sessions, and role-based scenarios.',
                icon: <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></>,
              },
              {
                step: '03', title: 'Live Training Delivery',
                desc: 'Vendor-certified instructors deliver online or onsite — with recorded sessions, labs, and real-time support.',
                icon: <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
              },
              {
                step: '04', title: 'Reports & Certification',
                desc: 'Detailed manager reports on attendance and performance, plus exam redemption and Qubits scores.',
                icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
              },
            ].map((s, i) => (
              <div key={i} style={{ position: 'relative', zIndex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, flexShrink: 0, position: 'relative',
                  background: 'linear-gradient(135deg, rgba(6,148,209,0.18), rgba(6,148,209,0.06))',
                  border: '1.5px solid rgba(6,148,209,0.35)',
                  boxShadow: '0 0 24px rgba(6,148,209,0.18)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                  <span style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#0694D1,#076D9D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff', letterSpacing: 0 }}>{s.step}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.4 }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <style>{`
            @media (max-width: 767px) {
              .ct-how-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
              .ct-how-line { display: none !important; }
            }
            @media (min-width: 768px) and (max-width: 1023px) {
              .ct-how-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
              .ct-how-line { display: none !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ── CUSTOM COURSE GENERATOR ─────────────────────────────── */}
      <section id="generator" style={{ background: '#e8f5fb', padding: '48px 20px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ background: '#e8f5fb', border: '1.5px solid #b3dff0', borderRadius: 28, padding: '40px 36px', boxShadow: 'none' }}>

            {/* Heading */}
            <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: '#0d1b2a', marginBottom: 28, lineHeight: 1.3, textAlign: 'center' }}>
              Need Customized Training - Share your<br />Requirement below and Generate a course.
            </h2>

            {/* Name + Email row */}
            <div className="ct-gen-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder=" "
                  style={{ width: '100%', boxSizing: 'border-box', background: '#fff', border: '1.5px solid #0694D1', borderRadius: 8, padding: '14px 14px', fontSize: 14, color: '#0d1b2a', outline: 'none', fontFamily: 'inherit' }}
                />
                <label style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#4a6580', pointerEvents: 'none', transition: 'all 0.2s', background: '#fff', padding: '0 4px' }}>
                  Name <span style={{ color: '#e53e3e' }}>*</span>
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder=" "
                  style={{ width: '100%', boxSizing: 'border-box', background: '#fff', border: '1.5px solid #0694D1', borderRadius: 8, padding: '14px 14px', fontSize: 14, color: '#0d1b2a', outline: 'none', fontFamily: 'inherit' }}
                />
                <label style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#4a6580', pointerEvents: 'none', transition: 'all 0.2s', background: '#fff', padding: '0 4px' }}>
                  Email <span style={{ color: '#e53e3e' }}>*</span>
                </label>
              </div>
            </div>

            {/* Your requirement textarea — fieldset/legend floating label */}
            <fieldset style={{ border: '1.5px solid #0694D1', borderRadius: 8, padding: '0 14px 14px', margin: '0 0 20px', background: '#fff' }}>
              <legend style={{ fontSize: 13, color: '#0694D1', padding: '0 6px', marginLeft: 4, fontWeight: 500 }}>Your requirement</legend>
              <textarea
                value={requirement}
                onChange={e => setRequirement(e.target.value)}
                rows={5}
                placeholder="E.g. We need Azure Administrator training for 25 engineers, blended with AI/ML fundamentals, over 5 days onsite in Dubai."
                style={{ width: '100%', boxSizing: 'border-box', background: 'transparent', border: 'none', outline: 'none', fontFamily: 'inherit', fontSize: 14, color: '#0d1b2a', resize: 'vertical', minHeight: 100, paddingTop: 8 }}
              />
            </fieldset>

            {/* reCAPTCHA mock */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid #d1d5db', borderRadius: 4, padding: '10px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <input type="checkbox" checked={robotChecked} onChange={e => setRobotChecked(e.target.checked)} style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#0694D1' }} />
                <span style={{ fontSize: 13, color: '#374151' }}>I&apos;m not a robot</span>
                <div style={{ marginLeft: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                    <path d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z" fill="#4A90D9"/>
                    <path d="M32 14c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18z" fill="white"/>
                    <path d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" fill="#4A90D9"/>
                    <path d="M32 26a6 6 0 100 12 6 6 0 000-12z" fill="white"/>
                  </svg>
                  <span style={{ fontSize: 8, color: '#9ca3af', lineHeight: 1.2 }}>reCAPTCHA</span>
                </div>
              </div>
            </div>

            {/* Generate button — pill, centered */}
            <div style={{ textAlign: 'center' }}>
              <button onClick={handleGenerate} disabled={!requirement.trim() || generating}
                style={{ padding: '14px 48px', borderRadius: 999, border: 'none',
                  cursor: requirement.trim() && !generating ? 'pointer' : 'not-allowed',
                  background: requirement.trim() && !generating ? '#0694D1' : '#93c5d8',
                  color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'inherit',
                  letterSpacing: 0.2, transition: 'all 0.2s' }}>
                {generated ? 'Re-Generate Course' : 'Generate Course'}
              </button>
            </div>

            {/* Generating spinner */}
            {generating && (
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10,
                background: '#fff', border: '1.5px solid #CAEFFF', borderRadius: 12, padding: '16px 20px' }}>
                <style>{`@keyframes ctSpin{to{transform:rotate(360deg)}}`}</style>
                <div style={{ width: 16, height: 16, border: '2px solid #0694D1', borderTopColor: 'transparent',
                  borderRadius: '50%', animation: 'ctSpin 0.7s linear infinite', flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, color: '#5a7a8c', fontWeight: 500 }}>TOC generating in progress…</span>
              </div>
            )}

            {/* Generated TOC */}
            {generated && (
              <div style={{ marginTop: 20, background: '#fff', border: '1.5px solid #CAEFFF', borderRadius: 12, padding: '20px 22px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#06111E', marginBottom: 12 }}>Generated Table of Contents</div>
                {['Introduction & Business Context', 'Core Technical Concepts', 'Hands-on Lab Sessions', 'Role-Based Scenario Workshops', 'Assessment & Knowledge Check', 'Certification Preparation'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                    <span style={{ minWidth: 22, height: 22, borderRadius: 6, background: 'rgba(6,148,209,0.1)', color: '#0694D1', fontSize: 11, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 13.5, color: '#374151', lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
                <div style={{ fontSize: 12, color: 'rgba(6,148,209,0.7)', marginTop: 12, paddingTop: 12, borderTop: '1px solid #CAEFFF' }}>
                  Review the above TOC. If any change is required, mention below and click Re-Generate.
                </div>
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                  <button onClick={() => { setEmailSent(true); setTimeout(() => setEmailSent(false), 3000) }}
                    style={{ padding: '10px 28px', borderRadius: 999, border: '1.5px solid #0694D1',
                      background: emailSent ? '#0694D1' : 'transparent', color: emailSent ? '#fff' : '#0694D1',
                      fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                    {emailSent ? '✓ TOC Sent to Your Inbox!' : 'Email Me the TOC'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <style>{`
            @media(max-width:600px){
              .ct-gen-row { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ── Webinar as a Service cross-sell ─────────────────────────── */}
      <section style={{ background: '#06111E', padding: '40px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', borderRadius: 20, padding: '32px 28px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.22)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ pointerEvents: 'none', position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(6,148,209,0.18) 0%,transparent 70%)' }} />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ flex: '1 1 300px' }}>
              <span style={{ display: 'inline-block', borderRadius: 999, padding: '3px 14px', fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 10, background: 'rgba(6,148,209,0.15)', color: '#38bdf8', border: '1px solid rgba(6,148,209,0.30)' }}>
                Webinar as a Service
              </span>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 36, margin: '0 0 8px', lineHeight: 1.3 }}>
                Need live learning sessions for your team?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: 13, margin: '0 0 16px', lineHeight: 1.65, maxWidth: 480 }}>
                Koenig&apos;s WaaS delivers tailored, instructor-led sessions on any topic — scheduled to your team&apos;s time zone. Pay only <strong style={{ color: '#38bdf8' }}>$10 per engaged attendee</strong> who stays 50+ min and rates ≥ 4.4.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Expert Instructors', 'Live Q&A', 'Detailed Reports', 'Global Scheduling'].map(tag => (
                  <span key={tag} style={{ borderRadius: 999, padding: '4px 12px', fontSize: 11.5, fontWeight: 600, background: 'rgba(6,148,209,0.12)', color: '#7dd3fc', border: '1px solid rgba(6,148,209,0.22)' }}>{tag}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
              <a href="/webinar-service"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: '#fff', borderRadius: 10, padding: '13px 24px', fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 0 24px rgba(6,148,209,0.40)', whiteSpace: 'nowrap' }}>
                Request a Session
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </a>
              <a href="/webinar-service"
                style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.40)', textDecoration: 'none', textAlign: 'center', width: '100%' }}>
                Learn more about WaaS →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

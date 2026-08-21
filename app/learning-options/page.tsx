'use client'
import { Fragment } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

/* ── Learning formats ────────────────────────────────────────────── */
const FORMATS = [
  {
    id: 'ilo',
    label: 'Live-Online Classroom (ILO)',
    href: '/live-online-classroom',
    desc: 'Experience the flexibility of learning from anywhere with our Live-Online Classroom (ILO). Our virtual classrooms connect you with expert instructors in real-time. Enjoy interactive sessions led by industry professionals, all from the comfort of your own device. This format is ideal for busy learners who seek a structured learning environment with the added benefit of convenience.',
    img: '/images/home-banner/Live-Online-Classes.png',
    cardIcon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  },
  {
    id: 'classroom',
    label: 'Classroom Training',
    href: '/classroom-training',
    desc: 'Immerse yourself in a dynamic learning experience with Classroom Training. Our instructor-led courses put you at the center of the action in sought-after global destinations. Benefit from engaging face-to-face interactions, collaborative peer learning, and the invaluable guidance of our expert instructors. This immersive format fosters a comprehensive and enriching learning journey that goes beyond the screen.',
    img: '/images/home-banner/classroom-training.png',
    cardIcon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    id: 'flexi',
    label: 'Flexi',
    href: '/flexi-training',
    desc: "Flexi empowers you to take control of your learning journey. Dive deep into meticulously edited lectures, explore comprehensive course materials, and gain hands-on experience through practical labs. And if you get stuck, don't worry! Flexi offers optional doubt-clearing sessions to ensure you get the support you need, all on your own schedule. This approach is ideal for independent learners who crave the freedom to set their own pace without sacrificing quality or support.",
    img: '/images/home-banner/Flexi.png',
    cardIcon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    id: 'fmat',
    label: 'Fly-Me-A-Trainer (FMAT)',
    href: '/fly-me-a-trainer',
    desc: 'Upskill your team with the ultimate in convenience and customization – FMAT (Fly-Me-a-Trainer). Our expert trainers travel directly to your location, transforming your workspace into a dynamic learning environment. This personalized approach ensures the training is tailored to your specific organizational needs. FMAT offers the unique advantage of face-to-face interaction with industry professionals, fostering a truly impactful learning experience, no matter where in the world you are.',
    img: '/images/home-banner/FMAT.png',
    cardIcon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></svg>,
  },
  {
    id: '1on1',
    label: '1-on-1 Training',
    href: '/1-on-1-training',
    desc: 'Experience unparalleled focus with our exclusive 1-on-1 Training! This personalized program caters to your unique learning style, pace, and goals. Schedule sessions at your convenience and receive immediate feedback and direct guidance from your dedicated instructor. Deep dive into topics, ensure alignment with your goals, and unlock a transformative learning experience.',
    img: '/images/home-banner/1on1.png',
    cardIcon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
  {
    id: 'customized',
    label: 'Customized Training',
    href: '/customised-training',
    desc: "Get a training programme built entirely around your organization's goals. Koenig's Customized Training blends your choice of formats, AI-powered tools, a custom LMS, and multilingual content delivery — with dedicated manager reports so you can track outcomes across your whole team.",
    img: '/images/home-banner/CT.png',
    cardIcon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/></svg>,
  },
]

const HERO_STATS: { val: string; label: string }[] = [
  { val: '6',      label: 'Learning Formats' },
  { val: '5,000+', label: 'Courses Available' },
  { val: '195+',   label: 'Countries Served' },
  { val: '33+',    label: 'Years in Training' },
]

/* ── Page ────────────────────────────────────────────────────────── */
export default function LearningOptionsPage() {
  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="lo-sec relative overflow-hidden px-4 lg:px-[50px]" style={{ background: 'linear-gradient(135deg, #061624 0%, #071929 60%, #062236 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-1/3 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: '#0694D1' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: '#38bdf8' }} />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full opacity-8 blur-[80px]" style={{ background: '#076D9D' }} />
        </div>

        <style>{`
          .lo-stat-item:hover .lo-stat-glow { opacity: 1 !important; }
          @media (max-width: 1023px) {
            .lo-sec { padding-top: 20px !important; padding-bottom: 20px !important; }
            .lo-cards-sec { padding-top: 20px !important; padding-bottom: 20px !important; }
          }
        `}</style>

        <div className="relative mx-auto max-w-7xl py-0 lg:py-[35px]">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text content */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-bold leading-tight mb-[15px] lg:mb-4 text-white sm:whitespace-nowrap">
                Learning Options{' '}
                <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  for You
                </span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed mb-[15px] lg:mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
                From live virtual classrooms to fully customized enterprise programmes — explore every way to train with Koenig and pick the format that fits your schedule, team, and goals.
              </p>
              <div className="flex flex-col lg:flex-row flex-wrap gap-[15px]">
                <a href="#formats" className="w-full lg:w-auto inline-flex justify-center items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 0 20px rgba(6,148,209,0.35)' }}>
                  Explore All Formats
                </a>
                <Link href="/contact" className="w-full lg:w-auto inline-flex justify-center items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:bg-white/10"
                  style={{ border: '1.5px solid rgba(6,148,209,0.6)', color: '#38bdf8', background: 'rgba(6,148,209,0.08)' }}>
                  Contact Us
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>

              {/* Mobile stat tiles */}
              <div className="lg:hidden mt-[15px] grid grid-cols-2" style={{ borderRadius: 16, border: '1px solid rgba(6,148,209,0.18)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                {HERO_STATS.map(({ val, label }, i) => (
                  <div key={val} style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 4, borderRight: i % 2 === 0 ? '1px solid rgba(6,148,209,0.12)' : 'none', borderBottom: i < 2 ? '1px solid rgba(6,148,209,0.12)' : 'none' }}>
                    <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, background: 'linear-gradient(135deg, #ffffff 0%, #50e6ff 60%, #0694D1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{val}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — stats card */}
            <div className="hidden lg:flex flex-col gap-4">
              <div style={{ borderRadius: 20, border: '1px solid rgba(6,148,209,0.15)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,148,209,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
                    {HERO_STATS.slice(0, 2).map((s, i) => (
                      <Fragment key={s.val}>
                        {i === 1 && <div style={{ background: 'rgba(6,148,209,0.12)' }} />}
                        <div className="lo-stat-item" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
                          <div className="lo-stat-glow" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(6,148,209,0.5), transparent)', opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }} />
                          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, background: 'linear-gradient(135deg, #ffffff 0%, #50e6ff 60%, #0694D1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
                          <div style={{ fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <div style={{ height: 1, background: 'rgba(6,148,209,0.12)' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
                    {HERO_STATS.slice(2, 4).map((s, i) => (
                      <Fragment key={s.val}>
                        {i === 1 && <div style={{ background: 'rgba(6,148,209,0.12)' }} />}
                        <div className="lo-stat-item" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
                          <div className="lo-stat-glow" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(6,148,209,0.5), transparent)', opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }} />
                          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, background: 'linear-gradient(135deg, #ffffff 0%, #50e6ff 60%, #0694D1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
                          <div style={{ fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FORMAT CARDS ─────────────────────────────────────── */}
      <section id="formats" className="lo-cards-sec px-4 lg:px-[50px]" style={{ background: '#fff', padding: '35px 20px' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-[15px] sm:mb-10">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#06111E', marginBottom: 14, lineHeight: 1.25, letterSpacing: '-0.015em' }}>
              Choose the Way You Want to{' '}
              <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Learn
              </span>
            </h2>
            <p style={{ fontSize: 15, color: '#7a8c96', maxWidth: 620, margin: '0 auto', lineHeight: 1.7 }}>
              Every format is built on the same expert-led curriculum — pick the one that matches how you and your team learn best.
            </p>
          </div>

          <div className="grid gap-[15px] sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
            {FORMATS.map(f => (
              <Link key={f.id} id={f.id} href={f.href}
                style={{ scrollMarginTop: 90, position: 'relative', display: 'flex', flexDirection: 'column',
                  borderRadius: 20, overflow: 'hidden', background: '#fff', border: '1px solid #CAEFFF',
                  boxShadow: '0 0 28px rgba(6,148,209,0.14), 0 2px 12px rgba(6,148,209,0.07)', transition: 'all 0.3s', textDecoration: 'none', cursor: 'pointer' }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(6,148,209,0.55)'
                  el.style.boxShadow = '0 0 40px rgba(6,148,209,0.22), 0 12px 36px rgba(6,148,209,0.15), 0 0 0 1px rgba(6,148,209,0.3)'
                  el.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.borderColor = '#CAEFFF'
                  el.style.boxShadow = '0 0 28px rgba(6,148,209,0.14), 0 2px 12px rgba(6,148,209,0.07)'
                  el.style.transform = 'none'
                }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2', flexShrink: 0, overflow: 'hidden' }}>
                  <img src={f.img} alt={f.label} width={640} height={427} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" decoding="async" />
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', gap: 10,
                    padding: '13px 20px', background: 'linear-gradient(135deg, rgba(6,86,124,0.72), rgba(4,45,66,0.78))',
                    backdropFilter: 'blur(14px) saturate(160%)', WebkitBackdropFilter: 'blur(14px) saturate(160%)',
                    borderTop: '1px solid rgba(255,255,255,0.25)',
                    boxShadow: '0 -6px 18px rgba(6,20,35,0.3)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff' }}>
                      {f.cardIcon}
                    </span>
                    <h3 style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,0.55)' }}>{f.label}</h3>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '22px 26px 26px', flex: 1 }}>
                  <p style={{ fontSize: 14, color: '#4a6580', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                  <span style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 13, fontWeight: 700, color: '#0694D1' }}>
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

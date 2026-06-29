'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import DownloadPptButton from '@/components/DownloadPptButton'
import AboutSubNav from '@/components/AboutSubNav'

const TIMELINE = [
  {
    year: '1993',
    event: 'Founded',
    color: '#0694D1',
    iconBg: 'rgba(6,148,209,0.12)',
    desc: 'Started in Patel Nagar, Delhi — loss-making but determined. Rohit Aggarwal believed IT training could change lives. The early years were tough but the mission was clear.',
  },
  {
    year: '2001',
    event: 'Near-Death #1 — Dotcom Bust',
    color: '#075985',
    iconBg: 'rgba(7,89,133,0.12)',
    desc: 'The dotcom bubble wiped out the domestic market. Koenig pivoted to offshore training, finding its first UK customer Andy Sau — a move that would define the next decade.',
  },
  {
    year: '2004–2015',
    event: 'Rapid Growth',
    color: '#38bdf8',
    iconBg: 'rgba(56,189,248,0.12)',
    desc: 'Students grew from 10 to 1,000+ per month. Offices opened in Shimla, Goa, and Dubai. Live online training launched, breaking geographical barriers for learners worldwide.',
  },
  {
    year: '2016',
    event: 'Near-Death #2 — Oil Crisis',
    color: '#0369a1',
    iconBg: 'rgba(3,105,161,0.12)',
    desc: '80% revenue drop almost ended everything. Strict cost controls and an unwavering team kept Koenig alive. Full recovery was achieved by year-end — stronger than before.',
  },
  {
    year: '2020',
    event: 'Near-Death #3 — COVID-19',
    color: '#0284c7',
    iconBg: 'rgba(2,132,199,0.12)',
    desc: 'Pandemic shut down the world. Koenig made a full pivot to live online delivery and adopted a WFH model overnight. The crisis became a catalyst — student numbers surged.',
  },
  {
    year: '2026',
    event: 'Today',
    color: '#22d3ee',
    iconBg: 'rgba(34,211,238,0.12)',
    desc: '30,000+ students/month. 300+ trainers. 5,000+ courses across 12 countries. Three near-deaths and 33 years later, Koenig stands as a global leader in IT training.',
  },
]

const TIMELINE_ICONS = [
  // 1993 Founded — building/office
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" key="a"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>,
  // 2001 Dotcom Bust — lightning bolt
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" key="b"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  // 2004-2015 Rapid Growth — trending up
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" key="c"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>,
  // 2016 Oil Crisis — fire/flame
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" key="d"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>,
  // 2020 COVID-19 — shield exclamation
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" key="e"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" /></svg>,
  // 2025 Today — globe
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" key="f"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
]

export default function OurStoryPage() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.timeline-card')
    if (!cards) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.animationDelay = el.dataset.delay ?? '0s'
            el.classList.add('visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="about-page" style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      <AboutSubNav />

      {/* DARK HERO */}
      <section className="relative bg-[#06111E] overflow-hidden py-5 sm:py-[50px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#0694D1] opacity-[0.07] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.05] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="kglass-banner py-5 px-8 sm:py-10 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-[22px] sm:text-[36px] font-bold text-white leading-tight mb-[18px] sm:mb-6">
                Our <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Story</span>
              </h1>
              <p className="text-[15px] sm:text-base text-white/80 mb-4 leading-relaxed">
                Thirty years ago, a young entrepreneur started a training company in a small Delhi office with a dream to make world-class IT education accessible to everyone.
              </p>
              <p className="text-[15px] text-white/60 leading-relaxed">
                Three near-death experiences. Three pivots. One unstoppable mission — to help people earn Money, Respect, and Peace of Mind through technology skills.
              </p>
              <DownloadPptButton />
            </div>
            <div className="kglass-dark rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/z_6FnQE7-LA"
                  title="Koenig Solutions — Your Trusted IT Training Partner"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHT SECTION – Timeline */}
      <section className="relative py-5 sm:py-[50px] overflow-hidden"
        style={{ backgroundColor: '#EBF5FF' }}>
        {/* Glow gradient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/4 w-[600px] h-[300px] rounded-full bg-[#0694D1] opacity-[0.10] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] rounded-full bg-[#38bdf8] opacity-[0.13] blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-[#0694D1] opacity-[0.07] blur-[80px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] mb-3 text-center">Three Decades of <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Resilience</span></h2>
          <p className="text-center text-[#0F172A]/60 mb-12">From a single Delhi office to 30,000+ students monthly in 195 countries</p>
          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="relative">
                {/* Animated arrow between cards (not after last in each row) */}
                {i % 3 !== 2 && (
                  <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 items-center justify-center w-7 h-7 rounded-full shadow-md"
                    style={{ background: 'white', border: '1px solid rgba(6,148,209,0.35)' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="arrow-pulse">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                )}
                <div
                  className="timeline-card h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  data-delay={`${i * 0.13}s`}
                  style={{ background: 'white', boxShadow: '0 2px 20px rgba(6,148,209,0.12)', border: '1px solid rgba(6,148,209,0.20)' }}>
                  {/* Colored top accent */}
                  <div className="h-1" style={{ backgroundColor: t.color }} />
                  <div className="p-6">
                    {/* Icon + year badge row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: t.iconBg, color: t.color }}>
                        {TIMELINE_ICONS[i]}
                      </div>
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white tracking-wide"
                        style={{ backgroundColor: t.color }}>
                        {t.year}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A] mb-2">{t.event}</h3>
                    <p className="text-sm text-[#475569] leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK SECTION – Koenig Ethos */}
      <section className="relative bg-[#06111E] py-5 sm:py-[50px] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0694D1] opacity-[0.10] blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#38bdf8] opacity-[0.06] blur-[100px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-[28px] font-bold text-white mb-6">The Koenig <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Ethos</span></h2>

            {/* Main I < O card */}
            <div className="relative rounded-2xl p-8 mb-6 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(6,148,209,0.18) 0%, rgba(56,189,248,0.08) 100%)', border: '1px solid rgba(6,148,209,0.30)', boxShadow: '0 0 60px rgba(6,148,209,0.20), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
              {/* Inner glow spot */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-24 rounded-full bg-[#38bdf8] opacity-[0.12] blur-[40px]" />
              </div>
              <div className="relative text-6xl font-black mb-4 bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)', filter: 'drop-shadow(0 0 24px rgba(56,189,248,0.5))' }}>
                I &lt; O
              </div>
              <p className="relative text-white/80 text-lg leading-relaxed">
                <span className="font-bold text-white">Individual is less than Organisation.</span> Every decision, every hire, every product choice is made with the organisation's long-term health over any individual's short-term gain.
              </p>
            </div>

            {/* Two pillar cards */}
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div className="rounded-xl p-5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(6,148,209,0.20)', boxShadow: '0 4px 24px rgba(6,148,209,0.10)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(6,148,209,0.20)' }}>
                    <svg className="w-4 h-4 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16V8z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" /></svg>
                  </div>
                  <div className="text-[#38bdf8] font-bold text-sm">Customer Obsession</div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  We don't just train — we transform careers. Every interaction, every course, every support call is designed around one question: did this help the student?
                </p>
              </div>
              <div className="rounded-xl p-5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(6,148,209,0.20)', boxShadow: '0 4px 24px rgba(6,148,209,0.10)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(6,148,209,0.20)' }}>
                    <svg className="w-4 h-4 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                  </div>
                  <div className="text-[#38bdf8] font-bold text-sm">Constant Improvement</div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  We measure everything. NPS, on-time delivery (99.1%), trainer quality, course outcomes. If a number moves, we act — immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-5 sm:py-[50px]" style={{ backgroundColor: '#F8FBFF' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="relative rounded-2xl overflow-hidden flex items-stretch"
            style={{ background: '#EBF5FF', border: '1px solid rgba(6,148,209,0.18)', boxShadow: '0 4px 32px rgba(6,148,209,0.10)' }}>
            {/* Left content */}
            <div className="flex-1 px-8 py-8 sm:px-12 sm:py-10 flex flex-col justify-center">
              <p className="text-xs font-bold tracking-widest text-[#0694D1] uppercase mb-3">Koenig Solutions</p>
              <h2 className="text-[22px] sm:text-[28px] font-bold text-[#0F172A] leading-snug mb-2">
                Want to Be Part of Our Next Chapter?
              </h2>
              <p className="text-sm text-[#475569] mb-6">We&apos;re always looking for passionate educators, tech experts, and professionals to join our team.</p>
              <div>
                <a
                  href="https://www.koenig-solutions.com/career"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white font-semibold px-7 py-3 rounded-xl transition-all text-sm hover:opacity-90 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #08A8EC)', boxShadow: '0 4px 20px rgba(6,148,209,0.30)' }}>
                  Explore Careers
                </a>
              </div>
            </div>
            {/* Right image */}
            <div className="relative hidden sm:block w-[320px] flex-shrink-0">
              <Image
                src="/images/home-banner/classroom-training.webp"
                alt="Koenig IT Training"
                width={320}
                height={220}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const MS_AWARDS = [
  {
    awardImg: 'MS-Partner-of-the-year-2025-popup.webp',
    title: 'Koenig Solutions is the Global Winner of 2025 Microsoft Training Services Partner of the Year Award!',
    desc: 'Koenig Solutions has been named the winner of Microsoft\'s 2025 Training Services Partner of the Year Award — a global recognition for outstanding training delivery, certified instructor quality, and exceptional student outcomes across the Microsoft technology portfolio.',
    year: '2025',
  },
  {
    awardImg: 'Microsoft-FY2024-Superstar-Award.webp',
    title: 'Winner of Microsoft\'s FY24 ANZ Superstar Campaign',
    desc: 'Koenig Solutions was recognised as the winner of Microsoft\'s FY2024 ANZ Superstar Campaign, acknowledging our exceptional performance and growth in training delivery across the Australia and New Zealand region.',
    year: 'FY2024',
  },
  {
    awardImg: 'Microsoft-Superstar-Award-2022.webp',
    title: 'Winner of Microsoft\'s FY22 Asia Superstar Campaign',
    desc: 'Koenig Solutions was honoured as the winner of Microsoft\'s FY22 Asia Superstar Campaign, celebrating outstanding contribution to Microsoft learning and certification outcomes across the Asia region.',
    year: 'FY2022',
  },
]

export default function AwardsPage() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = (idx: number) => {
    if (animating || idx === active) return
    setAnimating(true)
    setTimeout(() => {
      setActive(idx)
      setAnimating(false)
    }, 250)
  }

  const prev = () => goTo((active - 1 + MS_AWARDS.length) % MS_AWARDS.length)
  const next = () => goTo((active + 1) % MS_AWARDS.length)

  useEffect(() => {
    const t = setInterval(() => next(), 4000)
    return () => clearInterval(t)
  }, [active])

  const award = MS_AWARDS[active]

  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />
      <AboutSubNav />

      {/* DARK HERO */}
      <section className="relative bg-[#06111E] overflow-hidden py-[50px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#0694D1] opacity-[0.07] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.05] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="kglass-banner py-10 px-8 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                  Awards &amp; <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Achievements</span>
                </h1>
                <p className="text-xl text-white/80 mb-4 leading-relaxed">
                  Recognized by the world's leading technology vendors and workplace authorities since 1993. Our awards reflect one thing: consistently excellent training outcomes.
                </p>
                <p className="text-lg text-white/60 leading-relaxed">
                  These aren't participation trophies — every award here was earned through measurable results, verified by the vendors themselves.
                </p>
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

      {/* LIGHT SECTION – Great Place to Work */}
      <section className="bg-white py-[50px]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-12 text-center">Workplace <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Excellence</span></h2>
          <div className="max-w-2xl mx-auto">
            <div className="kglass-light rounded-3xl p-10 text-center transition-all">
              <div className="text-6xl mb-5">🏆</div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Great Place to Work</h3>
              <div className="inline-block bg-[#F59E0B] text-white font-bold px-4 py-2 rounded-full text-sm mb-5">
                2011 – 2026 · 15 Consecutive Years
              </div>
              <p className="text-[#64748B] leading-relaxed">
                Koenig Solutions has been certified as a Great Place to Work for 15 consecutive years. This certification is awarded based on direct employee feedback and reflects our commitment to a culture of trust, pride, and camaraderie.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
                  <div className="text-2xl font-bold text-[#F59E0B]">15</div>
                  <div className="text-xs text-[#64748B]">Consecutive Years</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
                  <div className="text-2xl font-bold text-[#F59E0B]">300+</div>
                  <div className="text-xs text-[#64748B]">Team Members</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
                  <div className="text-2xl font-bold text-[#F59E0B]">2011</div>
                  <div className="text-xs text-[#64748B]">First Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MICROSOFT AWARDS CAROUSEL */}
      <section className="relative py-[50px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #ddf1fb 30%, #ffffff 60%, #c8eaf8 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full opacity-30 blur-[100px]" style={{ background: 'radial-gradient(circle, #BAE6FD, transparent 70%)' }} />
          <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full opacity-25 blur-[90px]" style={{ background: 'radial-gradient(circle, #7DD3FA, transparent 70%)' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3 text-center">
            Microsoft <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Awards</span>
          </h2>
          <p className="text-center text-[#475569] mb-10">Globally recognised by Microsoft for training excellence</p>

          {/* Carousel */}
          <div className="max-w-2xl mx-auto">

            {/* Vendor logo — above the card */}
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-2xl flex items-center justify-center p-1"
                style={{ width: '160px', height: '100px', boxShadow: '0 4px 20px rgba(6,148,209,0.18)', border: '2px solid rgba(6,148,209,0.3)' }}>
                <img src="/images/partners/microsoft-cloud-t.png" alt="Microsoft" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Card */}
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 8px 32px rgba(6,148,209,0.16), 0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(6,148,209,0.25)',
                opacity: animating ? 0 : 1,
                transform: animating ? 'translateY(10px)' : 'translateY(0)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
              }}
            >
              {/* Blue top accent */}
              <div className="h-1 w-full" style={{ backgroundColor: '#00a1f1' }} />

              {/* Body — image left, text right */}
              <div className="flex gap-5 px-6 pt-5 pb-4">
                {/* Award image */}
                <div className="shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-[#F8FBFF] border border-[#EEF6FF]" style={{ width: '150px', height: '160px' }}>
                  <img
                    src={`/images/awards/${encodeURIComponent(award.awardImg)}`}
                    alt={award.title}
                    className="max-h-full max-w-full object-contain p-3"
                  />
                </div>
                {/* Text */}
                <div className="flex flex-col justify-center gap-3">
                  <h3 className="font-bold text-[#0F172A] text-base leading-snug">{award.title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{award.desc}</p>
                </div>
              </div>

              {/* Year badge — bottom */}
              <div className="flex justify-end px-6 pb-4">
                <span className="text-sm font-semibold px-4 py-1.5 rounded-full text-white" style={{ backgroundColor: '#00a1f1' }}>
                  {award.year}
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              {/* Prev */}
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-[#BAE6FD] text-[#0694D1] hover:bg-[#0694D1] hover:text-white hover:border-[#0694D1] transition-all duration-200"
                style={{ boxShadow: '0 2px 8px rgba(6,148,209,0.12)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {MS_AWARDS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:  i === active ? '24px' : '8px',
                      height: '8px',
                      backgroundColor: i === active ? '#0694D1' : '#BAE6FD',
                    }}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-[#BAE6FD] text-[#0694D1] hover:bg-[#0694D1] hover:text-white hover:border-[#0694D1] transition-all duration-200"
                style={{ boxShadow: '0 2px 8px rgba(6,148,209,0.12)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/about/our-partners"
              className="inline-block border border-[#0694D1] text-[#0694D1] hover:bg-[#0694D1] hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Our Partners
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

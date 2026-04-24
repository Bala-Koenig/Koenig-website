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

const AWS_AWARDS = [
  {
    awardImg: 'Finalist–AWS-Partner-of-the-Year-2024.webp',
    title: 'Finalist – AWS Partner of the Year (2024)',
    desc: "Koenig Solutions was recognized as a Finalist for the AWS Partner of the Year Award in 2024, celebrating outstanding collaboration and impact. This honor highlights Koenig's commitment to cloud innovation, customer success, and advancing global digital skills through AWS-aligned training.",
    year: '2024',
  },
  {
    awardImg: 'award-commitment.webp',
    title: 'Winner of AWS High Standards Commitment Award',
    desc: "Koenig Solutions was honored with the AWS High Standards Commitment Award, recognizing its relentless pursuit of excellence. This accolade underscores Koenig's commitment to delivering high-quality products, services, and processes, ensuring that customer expectations are consistently exceeded.",
    year: '2023',
  },
  {
    awardImg: 'award-aug-2022.webp',
    title: 'Winner of AWS Customer Obsession Award (August 2022)',
    desc: "In August 2022, Koenig Solutions received the AWS Customer Obsession Award, highlighting the company's dedication to understanding and addressing customer needs. This award reflects Koenig's unwavering focus on delivering tailored solutions that enhance customer experiences.",
    year: '2022',
  },
]

const EC_AWARDS = [
  {
    awardImg: 'Winner-of-EC-Council-ATC-of-the-Year-Award-2024.webp',
    title: 'Winner of EC-Council ATC of the Year Award 2024',
    desc: "Koenig Solutions was honoured as the EC-Council Authorized Training Centre (ATC) of the Year for 2024, recognizing outstanding delivery of cybersecurity certifications including CEH, CHFI, and CPENT. This award reflects Koenig's commitment to excellence in ethical hacking and information security training globally.",
    year: '2024',
  },
  {
    awardImg: 'award-ec-2023.webp',
    title: 'Winner of EC-Council ATC of the Year Award 2023',
    desc: "Koenig Solutions received the EC-Council Global ATC of the Year Award for 2023, acknowledging its outstanding contribution to creating a skilled cybersecurity workforce. This recognition highlights Koenig's consistent performance in delivering world-class ethical hacking and security certification programmes.",
    year: '2023',
  },
  {
    awardImg: 'award-excellence-2022.webp',
    title: 'EC-Council ATC Circle of Excellence 2022',
    desc: "Koenig Solutions was inducted into the EC-Council ATC Circle of Excellence for 2022, recognizing its outstanding contribution to the mission of creating a skilled cybersecurity workforce. This honour reflects Koenig's dedication to delivering high-quality EC-Council certification training worldwide.",
    year: '2022',
  },
]

const PECB_AWARDS = [
  {
    awardImg: 'Winner-of-the-PECB-Titanium-Partner-Award-2024.webp',
    title: 'PECB Titanium Partner of the Year 2024',
    desc: "Koenig Solutions was recognised by PECB as the Titanium Partner of the Year for 2024 — the highest tier of partnership distinction. This award acknowledges Koenig's exceptional commitment and dedication to delivering PECB certification programmes, including ISO standards and cybersecurity management training, across a global audience.",
    year: '2024',
  },
  {
    awardImg: 'award-pecb-2023.webp',
    title: 'PECB Insights Conference Recognition 2023',
    desc: "Koenig Solutions was honoured at the PECB Insights Conference 2023 for its outstanding partnership and contribution to professional certification training. This recognition reflects Koenig's consistent performance in preparing students for internationally recognised PECB qualifications in information security and management standards.",
    year: '2023',
  },
]

export default function AwardsPage() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [paused, setPaused] = useState(false)

  const [awsActive, setAwsActive] = useState(0)
  const [awsAnimating, setAwsAnimating] = useState(false)
  const [awsPaused, setAwsPaused] = useState(false)

  const [ecActive, setEcActive] = useState(0)
  const [ecAnimating, setEcAnimating] = useState(false)
  const [ecPaused, setEcPaused] = useState(false)

  const [pecbActive, setPecbActive] = useState(0)
  const [pecbAnimating, setPecbAnimating] = useState(false)
  const [pecbPaused, setPecbPaused] = useState(false)

  const goTo = (idx: number) => {
    if (animating || idx === active) return
    setAnimating(true)
    setTimeout(() => { setActive(idx); setAnimating(false) }, 250)
  }
  const prev = () => goTo((active - 1 + MS_AWARDS.length) % MS_AWARDS.length)
  const next = () => goTo((active + 1) % MS_AWARDS.length)

  const awsGoTo = (idx: number) => {
    if (awsAnimating || idx === awsActive) return
    setAwsAnimating(true)
    setTimeout(() => { setAwsActive(idx); setAwsAnimating(false) }, 250)
  }
  const awsPrev = () => awsGoTo((awsActive - 1 + AWS_AWARDS.length) % AWS_AWARDS.length)
  const awsNext = () => awsGoTo((awsActive + 1) % AWS_AWARDS.length)

  const ecGoTo = (idx: number) => {
    if (ecAnimating || idx === ecActive) return
    setEcAnimating(true)
    setTimeout(() => { setEcActive(idx); setEcAnimating(false) }, 250)
  }
  const ecPrev = () => ecGoTo((ecActive - 1 + EC_AWARDS.length) % EC_AWARDS.length)
  const ecNext = () => ecGoTo((ecActive + 1) % EC_AWARDS.length)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => next(), 4000)
    return () => clearInterval(t)
  }, [active, paused])

  useEffect(() => {
    if (awsPaused) return
    const t = setInterval(() => awsNext(), 4000)
    return () => clearInterval(t)
  }, [awsActive, awsPaused])

  const pecbGoTo = (idx: number) => {
    if (pecbAnimating || idx === pecbActive) return
    setPecbAnimating(true)
    setTimeout(() => { setPecbActive(idx); setPecbAnimating(false) }, 250)
  }
  const pecbPrev = () => pecbGoTo((pecbActive - 1 + PECB_AWARDS.length) % PECB_AWARDS.length)
  const pecbNext = () => pecbGoTo((pecbActive + 1) % PECB_AWARDS.length)

  useEffect(() => {
    if (ecPaused) return
    const t = setInterval(() => ecNext(), 4000)
    return () => clearInterval(t)
  }, [ecActive, ecPaused])

  useEffect(() => {
    if (pecbPaused) return
    const t = setInterval(() => pecbNext(), 4000)
    return () => clearInterval(t)
  }, [pecbActive, pecbPaused])

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
              <div className="grid grid-cols-2 gap-3">
                {[
                  { logo: '/images/partners/microsoft-cloud-t.png', vendor: 'Microsoft', count: 3, label: 'Awards', color: '#00a1f1' },
                  { logo: '/images/partners/amazon-authorized.png', vendor: 'AWS', count: 3, label: 'Awards', color: '#ff9900' },
                  { logo: '/images/partners/EC-Council-logo.png', vendor: 'EC-Council', count: 3, label: 'Awards', color: '#c8102e' },
                  { logo: '/images/partners/Authorized PECB Certification Courses Training badge.png', vendor: 'PECB', count: 2, label: 'Awards', color: '#94a3b8' },
                  { logo: '/images/partners/o-prtnr-clr-rgb.png', vendor: 'Oracle', count: 1, label: 'Award', color: '#c74634' },
                  { logo: '/images/awards/Certified-as-great-place-to-work.webp', vendor: 'GPTW', count: 15, label: 'Years', color: '#e8002d' },
                ].map(({ logo, vendor, count, label, color }) => (
                  <div key={vendor} className="kglass-dark rounded-xl p-4 flex items-center gap-3">
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center p-1.5">
                      <img src={logo} alt={vendor} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white leading-none">{count}<span className="text-xs font-normal text-white/50 ml-1">{label}</span></div>
                      <div className="text-white/60 text-xs mt-0.5">{vendor}</div>
                    </div>
                    <div className="ml-auto w-1.5 h-8 rounded-full opacity-70" style={{ backgroundColor: color }} />
                  </div>
                ))}
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
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-[30px] text-center">
            Microsoft <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Awards</span>
          </h2>

          {/* Carousel */}
          <div className="max-w-2xl mx-auto" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

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

          {/* AWS AWARDS CAROUSEL */}
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-[30px] text-center mt-20">
            AWS <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #ff9900, #FFD580)' }}>Awards</span>
          </h2>

          <div className="max-w-2xl mx-auto" onMouseEnter={() => setAwsPaused(true)} onMouseLeave={() => setAwsPaused(false)}>

            {/* AWS vendor logo above */}
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-2xl flex items-center justify-center p-1"
                style={{ width: '160px', height: '100px', boxShadow: '0 4px 20px rgba(255,153,0,0.18)', border: '2px solid rgba(255,153,0,0.3)' }}>
                <img src="/images/partners/amazon-authorized.png" alt="AWS" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Card */}
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 8px 32px rgba(255,153,0,0.16), 0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(255,153,0,0.25)',
                opacity: awsAnimating ? 0 : 1,
                transform: awsAnimating ? 'translateY(10px)' : 'translateY(0)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
              }}
            >
              <div className="h-1 w-full" style={{ backgroundColor: '#ff9900' }} />
              <div className="flex gap-5 px-6 pt-5 pb-4">
                <div className="shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-[#FFFBF5] border border-[#FFE8C0]" style={{ width: '150px', height: '160px' }}>
                  <img src={`/images/awards/${encodeURIComponent(AWS_AWARDS[awsActive].awardImg)}`} alt={AWS_AWARDS[awsActive].title} className="max-h-full max-w-full object-contain p-3" />
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <h3 className="font-bold text-[#0F172A] text-base leading-snug">{AWS_AWARDS[awsActive].title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{AWS_AWARDS[awsActive].desc}</p>
                </div>
              </div>
              <div className="flex justify-end px-6 pb-4">
                <span className="text-sm font-semibold px-4 py-1.5 rounded-full text-white" style={{ backgroundColor: '#ff9900' }}>{AWS_AWARDS[awsActive].year}</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button onClick={awsPrev} className="w-10 h-10 rounded-full flex items-center justify-center bg-white transition-all duration-200 hover:text-white"
                style={{ border: '1px solid #FFD580', color: '#ff9900', boxShadow: '0 2px 8px rgba(255,153,0,0.12)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#ff9900'; (e.currentTarget as HTMLElement).style.borderColor = '#ff9900' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'white'; (e.currentTarget as HTMLElement).style.borderColor = '#FFD580' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div className="flex items-center gap-2">
                {AWS_AWARDS.map((_, i) => (
                  <button key={i} onClick={() => awsGoTo(i)} className="rounded-full transition-all duration-300"
                    style={{ width: i === awsActive ? '24px' : '8px', height: '8px', backgroundColor: i === awsActive ? '#ff9900' : '#FFD580' }} />
                ))}
              </div>
              <button onClick={awsNext} className="w-10 h-10 rounded-full flex items-center justify-center bg-white transition-all duration-200"
                style={{ border: '1px solid #FFD580', color: '#ff9900', boxShadow: '0 2px 8px rgba(255,153,0,0.12)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#ff9900'; (e.currentTarget as HTMLElement).style.borderColor = '#ff9900'; (e.currentTarget as HTMLElement).style.color = 'white' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'white'; (e.currentTarget as HTMLElement).style.borderColor = '#FFD580'; (e.currentTarget as HTMLElement).style.color = '#ff9900' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* EC-COUNCIL AWARDS CAROUSEL */}
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-[30px] text-center mt-20">
            EC-Council <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #c8102e, #ff4d6d)' }}>Awards</span>
          </h2>

          <div className="max-w-2xl mx-auto" onMouseEnter={() => setEcPaused(true)} onMouseLeave={() => setEcPaused(false)}>

            {/* EC-Council vendor logo above */}
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-2xl flex items-center justify-center p-1"
                style={{ width: '160px', height: '100px', boxShadow: '0 4px 20px rgba(200,16,46,0.18)', border: '2px solid rgba(200,16,46,0.3)' }}>
                <img src="/images/partners/EC-Council-logo.png" alt="EC-Council" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Card */}
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 8px 32px rgba(200,16,46,0.16), 0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(200,16,46,0.25)',
                opacity: ecAnimating ? 0 : 1,
                transform: ecAnimating ? 'translateY(10px)' : 'translateY(0)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
              }}
            >
              <div className="h-1 w-full" style={{ backgroundColor: '#c8102e' }} />
              <div className="flex gap-5 px-6 pt-5 pb-4">
                <div className="shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-[#FFF5F6] border border-[#FFD6DB]" style={{ width: '150px', height: '160px' }}>
                  <img src={`/images/awards/${encodeURIComponent(EC_AWARDS[ecActive].awardImg)}`} alt={EC_AWARDS[ecActive].title} className="max-h-full max-w-full object-contain p-3" />
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <h3 className="font-bold text-[#0F172A] text-base leading-snug">{EC_AWARDS[ecActive].title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{EC_AWARDS[ecActive].desc}</p>
                </div>
              </div>
              <div className="flex justify-end px-6 pb-4">
                <span className="text-sm font-semibold px-4 py-1.5 rounded-full text-white" style={{ backgroundColor: '#c8102e' }}>{EC_AWARDS[ecActive].year}</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button onClick={ecPrev} className="w-10 h-10 rounded-full flex items-center justify-center bg-white transition-all duration-200"
                style={{ border: '1px solid #FFB3BC', color: '#c8102e', boxShadow: '0 2px 8px rgba(200,16,46,0.12)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#c8102e'; (e.currentTarget as HTMLElement).style.borderColor = '#c8102e'; (e.currentTarget as HTMLElement).style.color = 'white' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'white'; (e.currentTarget as HTMLElement).style.borderColor = '#FFB3BC'; (e.currentTarget as HTMLElement).style.color = '#c8102e' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div className="flex items-center gap-2">
                {EC_AWARDS.map((_, i) => (
                  <button key={i} onClick={() => ecGoTo(i)} className="rounded-full transition-all duration-300"
                    style={{ width: i === ecActive ? '24px' : '8px', height: '8px', backgroundColor: i === ecActive ? '#c8102e' : '#FFB3BC' }} />
                ))}
              </div>
              <button onClick={ecNext} className="w-10 h-10 rounded-full flex items-center justify-center bg-white transition-all duration-200"
                style={{ border: '1px solid #FFB3BC', color: '#c8102e', boxShadow: '0 2px 8px rgba(200,16,46,0.12)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#c8102e'; (e.currentTarget as HTMLElement).style.borderColor = '#c8102e'; (e.currentTarget as HTMLElement).style.color = 'white' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'white'; (e.currentTarget as HTMLElement).style.borderColor = '#FFB3BC'; (e.currentTarget as HTMLElement).style.color = '#c8102e' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* PECB AWARDS CAROUSEL */}
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-[30px] text-center mt-20">
            PECB <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #334155, #64748b)' }}>Awards</span>
          </h2>

          <div className="max-w-2xl mx-auto" onMouseEnter={() => setPecbPaused(true)} onMouseLeave={() => setPecbPaused(false)}>

            {/* PECB vendor logo above */}
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-2xl flex items-center justify-center p-1"
                style={{ width: '160px', height: '100px', boxShadow: '0 4px 20px rgba(51,65,85,0.18)', border: '2px solid rgba(51,65,85,0.3)' }}>
                <img src="/images/partners/Authorized PECB Certification Courses Training badge.png" alt="PECB" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Card */}
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 8px 32px rgba(51,65,85,0.16), 0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(51,65,85,0.25)',
                opacity: pecbAnimating ? 0 : 1,
                transform: pecbAnimating ? 'translateY(10px)' : 'translateY(0)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
              }}
            >
              <div className="h-1 w-full" style={{ backgroundColor: '#475569' }} />
              <div className="flex gap-5 px-6 pt-5 pb-4">
                <div className="shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-[#F8FAFC] border border-[#E2E8F0]" style={{ width: '150px', height: '160px' }}>
                  <img src={`/images/awards/${encodeURIComponent(PECB_AWARDS[pecbActive].awardImg)}`} alt={PECB_AWARDS[pecbActive].title} className="max-h-full max-w-full object-contain p-3" />
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <h3 className="font-bold text-[#0F172A] text-base leading-snug">{PECB_AWARDS[pecbActive].title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{PECB_AWARDS[pecbActive].desc}</p>
                </div>
              </div>
              <div className="flex justify-end px-6 pb-4">
                <span className="text-sm font-semibold px-4 py-1.5 rounded-full text-white" style={{ backgroundColor: '#475569' }}>{PECB_AWARDS[pecbActive].year}</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button onClick={pecbPrev} className="w-10 h-10 rounded-full flex items-center justify-center bg-white transition-all duration-200"
                style={{ border: '1px solid #CBD5E1', color: '#475569', boxShadow: '0 2px 8px rgba(51,65,85,0.12)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#475569'; (e.currentTarget as HTMLElement).style.borderColor = '#475569'; (e.currentTarget as HTMLElement).style.color = 'white' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'white'; (e.currentTarget as HTMLElement).style.borderColor = '#CBD5E1'; (e.currentTarget as HTMLElement).style.color = '#475569' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div className="flex items-center gap-2">
                {PECB_AWARDS.map((_, i) => (
                  <button key={i} onClick={() => pecbGoTo(i)} className="rounded-full transition-all duration-300"
                    style={{ width: i === pecbActive ? '24px' : '8px', height: '8px', backgroundColor: i === pecbActive ? '#475569' : '#CBD5E1' }} />
                ))}
              </div>
              <button onClick={pecbNext} className="w-10 h-10 rounded-full flex items-center justify-center bg-white transition-all duration-200"
                style={{ border: '1px solid #CBD5E1', color: '#475569', boxShadow: '0 2px 8px rgba(51,65,85,0.12)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#475569'; (e.currentTarget as HTMLElement).style.borderColor = '#475569'; (e.currentTarget as HTMLElement).style.color = 'white' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'white'; (e.currentTarget as HTMLElement).style.borderColor = '#CBD5E1'; (e.currentTarget as HTMLElement).style.color = '#475569' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* ORACLE AWARD — single card, no slider */}
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-[30px] text-center mt-20">
            Oracle <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #c74634, #f46c44)' }}>Award</span>
          </h2>

          <div className="max-w-2xl mx-auto">

            {/* Oracle logo above */}
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-2xl flex items-center justify-center p-1"
                style={{ width: '160px', height: '100px', boxShadow: '0 4px 20px rgba(199,70,52,0.18)', border: '2px solid rgba(199,70,52,0.3)' }}>
                <img src="/images/partners/o-prtnr-clr-rgb.png" alt="Oracle" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Card */}
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 8px 32px rgba(199,70,52,0.16), 0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(199,70,52,0.25)',
              }}
            >
              <div className="h-1 w-full" style={{ backgroundColor: '#c74634' }} />
              <div className="flex gap-5 px-6 pt-5 pb-4">
                <div className="shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-[#FFF8F7] border border-[#FFD9D3]" style={{ width: '150px', height: '160px' }}>
                  <img src="/images/awards/award-oracle.webp" alt="Oracle Award" className="max-h-full max-w-full object-contain p-3" />
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <h3 className="font-bold text-[#0F172A] text-base leading-snug">Winner of the Oracle Award</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">Koenig Solutions was honored with the Oracle Award, recognizing its outstanding performance in delivering Oracle training programs. This accolade underscores Koenig's expertise in Oracle technologies and its role in empowering professionals with essential skills for the evolving IT industry.</p>
                </div>
              </div>
              <div className="flex justify-end px-6 pb-4">
                <span className="text-sm font-semibold px-4 py-1.5 rounded-full text-white" style={{ backgroundColor: '#c74634' }}>2023</span>
              </div>
            </div>
          </div>

          {/* WORKPLACE EXCELLENCE — single card */}
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-[30px] text-center mt-20">
            Workplace <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #e8002d, #1a1a5e)' }}>Excellence</span>
          </h2>

          <div className="max-w-2xl mx-auto">

            {/* Logo above */}
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-2xl flex items-center justify-center p-1"
                style={{ width: '160px', height: '100px', boxShadow: '0 4px 20px rgba(232,0,45,0.18)', border: '2px solid rgba(232,0,45,0.3)' }}>
                <img src="/images/awards/Certified-as-great-place-to-work.webp" alt="Great Place to Work" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Card */}
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 8px 32px rgba(232,0,45,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(232,0,45,0.2)',
              }}
            >
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #e8002d, #1a1a5e)' }} />
              <div className="flex gap-5 px-6 pt-5 pb-4">
                <div className="shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-[#FFF5F6] border border-[#FFD6DB]" style={{ width: '150px', height: '160px' }}>
                  <img src="/images/awards/Certified-as-great-place-to-work.webp" alt="Great Place to Work Certified" className="max-h-full max-w-full object-contain p-3" />
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <h3 className="font-bold text-[#0F172A] text-base leading-snug">Certified as a Great Place to Work (2011–2027)</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">Koenig Solutions has been consistently certified as a Great Place to Work from 2011 to 2027. This prestigious certification recognizes the organization's commitment to fostering a positive, inclusive, and empowering work culture, where employees thrive and contribute to meaningful success. The certification reflects Koenig's dedication to excellence in workplace practices and employee satisfaction.</p>
                </div>
              </div>
              <div className="flex justify-end px-6 pb-4">
                <span className="text-sm font-semibold px-4 py-1.5 rounded-full text-white" style={{ background: 'linear-gradient(90deg, #e8002d, #1a1a5e)' }}>2011 – 2027</span>
              </div>
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

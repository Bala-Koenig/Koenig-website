'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import SiteFooter from '@/components/SiteFooter'
import { WEBINARS, PARTNER_LOGOS, RELATED_COURSES } from '../../upcoming-webinars/data'

function keyPointsFor(w: typeof WEBINARS[number]): string[] {
  return [
    `Core concepts and terminology behind ${w.title}`,
    `Real-world use cases and practical applications relevant to ${w.technology}`,
    'Best practices and recommendations from an industry expert',
    'Live Q&A to get your specific questions answered',
  ]
}

export default function WebinarDetailPage() {
  const params = useParams<{ id: string }>()
  const webinar = WEBINARS.find(w => String(w.id) === params.id)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('India')
  const [notRobot, setNotRobot] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [modalWebinar, setModalWebinar] = useState<typeof WEBINARS[number] | null>(null)

  if (!webinar) {
    return (
      <>
        <Navbar />
        <section className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-koenig-dark">Webinar not found</h1>
          <p className="mt-2 text-koenig-muted">This webinar may have already concluded or the link is incorrect.</p>
          <Link href="/upcoming-webinars" className="mt-6 inline-block rounded-xl px-6 py-3 text-sm font-bold text-white" style={{ background: '#0694D1' }}>
            Browse Upcoming Webinars
          </Link>
        </section>
        <SiteFooter />
      </>
    )
  }

  const related = WEBINARS.filter(w => w.id !== webinar.id).slice(0, 3)
  const keyPoints = keyPointsFor(webinar)
  const relatedCourses = RELATED_COURSES[webinar.technology] ?? RELATED_COURSES['Microsoft']

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (name && email && phone && country && notRobot) setSubmitted(true)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.koenig-solutions.com' },
              { '@type': 'ListItem', position: 2, name: 'Upcoming Webinars', item: 'https://www.koenig-solutions.com/upcoming-webinars' },
              { '@type': 'ListItem', position: 3, name: webinar.title, item: `https://www.koenig-solutions.com/webinar-detail/${webinar.id}` },
            ],
          }),
        }}
      />

      <Navbar />

      {/* ════════════════ HERO ════════════════ */}
      <section className="px-4 md:px-8 lg:px-[50px]" style={{ background: 'linear-gradient(135deg, #06111E 0%, #071828 55%, #061624 100%)' }}>
        <div className="mx-auto max-w-7xl py-[20px] sm:py-10 lg:py-12">
          <div className="grid lg:grid-cols-[1fr_460px] gap-0 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-medium leading-[1.15] lg:leading-[55px] mb-2.5 text-white">
                {webinar.title}
              </h1>

              <p className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1 text-base sm:text-lg mt-3" style={{ color: 'rgba(255,255,255,0.75)' }}>
                <span className="flex items-center gap-2">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="#38bdf8" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  {webinar.date}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="#38bdf8" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/>
                  </svg>
                  {webinar.time}
                </span>
              </p>

              <a href="#register"
                onClick={e => { e.preventDefault(); document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
                className="mt-[30px] block sm:inline-block w-full sm:w-auto text-center rounded-full px-14 py-2.5 text-lg font-medium text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 4px 16px rgba(6,148,209,0.40)' }}>
                Register Now
              </a>

              <a href="#overview" className="flex items-center justify-center lg:justify-start gap-2 mt-[30px] text-lg font-medium w-full lg:w-fit transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.80)' }}>
                <Image src="/images/webinars/learn-more-icon.png" alt="" width={22} height={22} style={{ filter: 'brightness(0) invert(1)' }} />
                Learn More About This Topic
              </a>

              <Link href="/" className="mt-5 block sm:inline-block w-full sm:w-auto text-center rounded-full px-9 py-2.5 text-base font-medium transition-all hover:bg-white/10"
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.35)', color: '#fff' }}>
                Explore Our Course
              </Link>
            </div>

            {/* Banner graphic */}
            <div className="mt-[20px] mb-[20px] lg:mt-0 lg:mb-0">
              <Image src="/images/webinars/webinar-banner-graphic.png" alt="Participation Certificate, Credly Badge, Live Q&A, Learn from Industry Experts"
                width={640} height={480} className="w-full h-auto rounded-2xl" priority />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ MAIN CONTENT ════════════════ */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px]">
        <div className="mx-auto max-w-7xl py-[20px] sm:py-14">

          {/* Overview + Key Points card — full width */}
          <div id="overview" className="rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg,#ffffff 0%,#f0f9ff 50%,#ffffff 100%)', border: '1px solid #CAEFFF', boxShadow: '0 4px 20px rgba(6,148,209,0.08)' }}>
            <div className="grid sm:grid-cols-2 gap-8 sm:gap-10">
              {/* Webinar Overview */}
              <div className="sm:pr-8">
                <h2 className="flex items-center justify-center gap-2 text-lg sm:text-[22px] font-extrabold text-koenig-dark mb-4 text-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="10.5" cy="9.5" r="2"/><path d="M12.5 11.5L14 13"/>
                  </svg>
                  Webinar Overview
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-center" style={{ color: '#093148' }}>{webinar.description}</p>
              </div>

              {/* Key Points */}
              <div className="pt-8 sm:pt-0 sm:pl-8 border-t sm:border-t-0 sm:border-l" style={{ borderColor: 'rgba(6,148,209,0.30)' }}>
                <h2 className="flex items-center justify-center gap-2 text-lg sm:text-[22px] font-extrabold text-koenig-dark mb-4 text-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Key Points
                </h2>
                <ul className="space-y-3.5 max-w-md mx-auto">
                  {keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base" style={{ color: '#093148' }}>
                      <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="#0694D1"><path d="M5 3l14 9-14 9V3z"/></svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ TRAINER + REGISTRATION ════════════════ */}
      <section className="px-4 md:px-8 lg:px-[50px]" style={{ background: '#EBF8FE' }}>
        <div className="mx-auto max-w-7xl py-[20px] sm:py-14">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Trainer */}
            <div className="rounded-2xl p-8" style={{ background: '#083F5E', boxShadow: '10px 10px 0 rgba(6,148,209,0.15)' }}>
              <h2 className="text-xl sm:text-2xl font-bold text-white text-center pb-5 mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                Meet The Trainer
              </h2>
              <div className="flex flex-col items-center text-center">
                {webinar.photo ? (
                  <Image src={webinar.photo} alt={webinar.speaker} width={150} height={150} quality={90}
                    className="h-[150px] w-[150px] rounded-full object-cover object-top shrink-0" style={{ border: '4px solid #fff' }} />
                ) : (
                  <div className="flex h-[150px] w-[150px] shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white"
                    style={{ background: webinar.avatarBg, border: '4px solid #fff' }}>
                    {webinar.initials}
                  </div>
                )}
                <p className="mt-5 text-lg font-bold text-white">{webinar.speaker}</p>
                <p className="mt-3 text-[18px] leading-relaxed text-white">
                  As a {webinar.technology} Corporate Trainer, I specialize in delivering advanced, hands-on training with a focus on real-world application. I create interactive, goal-aligned sessions for diverse global industries.
                </p>
              </div>
            </div>

            {/* Registration form */}
            <div id="register" className="rounded-2xl bg-white p-8" style={{ border: '1px solid #CAEFFF', boxShadow: '0 8px 30px rgba(6,148,209,0.12)' }}>
              {submitted ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: 'rgba(22,163,74,0.12)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <p className="text-lg font-bold text-koenig-dark">Registration successful!</p>
                  <p className="text-sm text-koenig-muted">Details have been shared over email.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-koenig-dark text-center mb-6">Register for the Webinar</h2>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold" style={{ color: '#093148' }}>
                      Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Name"
                      className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30" style={{ borderColor: '#e2e8f0', color: '#0F172A' }} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold" style={{ color: '#093148' }}>
                      Email <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
                      className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30" style={{ borderColor: '#e2e8f0', color: '#0F172A' }} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold" style={{ color: '#093148' }}>
                      Phone <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone"
                      className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30" style={{ borderColor: '#e2e8f0', color: '#0F172A' }} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold" style={{ color: '#093148' }}>
                      Country <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <select required value={country} onChange={e => setCountry(e.target.value)}
                      className="w-full appearance-none rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30"
                      style={{
                        borderColor: '#e2e8f0', color: '#0F172A',
                        backgroundColor: '#fff',
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%230694D1\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 2.25rem center',
                        backgroundSize: '14px',
                      }}>
                      {['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'United Arab Emirates', 'Singapore', 'Other'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* reCAPTCHA-style checkbox */}
                  <div className="flex items-center justify-center pt-2">
                    <label className="flex items-center gap-3 rounded-md px-4 py-3 cursor-pointer" style={{ border: '1px solid #d3d3d3', background: '#f9f9f9' }}>
                      <input type="checkbox" checked={notRobot} onChange={e => setNotRobot(e.target.checked)}
                        className="h-5 w-5" style={{ accentColor: '#0694D1' }} />
                      <span className="text-sm" style={{ color: '#0F172A' }}>I&apos;m not a robot</span>
                      <span className="ml-2 text-[10px] leading-tight" style={{ color: '#9ca3af' }}>reCAPTCHA<br/>Privacy · Terms</span>
                    </label>
                  </div>

                  <div className="flex justify-center pt-2">
                    <button type="submit"
                      className="rounded-xl px-10 py-3 min-w-[260px] text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                      style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 4px 14px rgba(6,148,209,0.35)' }}>
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ RELATED WEBINARS ════════════════ */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px]">
        <div className="mx-auto max-w-7xl py-[20px] sm:py-14">
          <div className="mb-8 text-center">
            <h2 className="text-xl sm:text-2xl font-extrabold text-koenig-dark">Explore More Webinars</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(w => (
              <article key={w.id}
                className="flex flex-col rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ border: '1px solid #CAEFFF', boxShadow: '0 4px 16px rgba(0,164,239,0.08)' }}>

                <div className="flex-1 flex flex-col p-[15px] sm:p-5" style={{ background: '#fff' }}>
                  {/* Title */}
                  <h3 className="mb-[15px] sm:mb-4 text-base font-bold leading-snug flex-1" style={{ color: '#0F172A' }}>
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
                <div className="flex items-center justify-between border-t px-[15px] sm:px-5 py-[15px] sm:py-3"
                  style={{ borderColor: '#EBF8FE', background: '#F8FCFF' }}>
                  <button onClick={() => setModalWebinar(w)} className="text-sm font-semibold transition-colors hover:text-[#0694D1]" style={{ color: '#465058' }}>
                    Show More &rsaquo;
                  </button>
                  <Link href={`/webinar-detail/${w.id}`}
                    className="rounded-lg border px-16 py-2.5 text-sm font-bold transition-all hover:opacity-80 active:scale-95"
                    style={{ background: '#fff', borderColor: '#0694D1', color: '#0694D1' }}>
                    Register
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/upcoming-webinars"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 4px 16px rgba(6,148,209,0.35)' }}>
              Explore All Webinars
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ RELATED COURSES ════════════════ */}
      <section className="px-4 md:px-8 lg:px-[50px]" style={{ background: '#F7FAFC' }}>
        <div className="mx-auto max-w-7xl py-[20px] sm:py-14">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-extrabold text-koenig-dark">Explore Related Courses</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCourses.map(c => (
              <div key={c.code}
                className="flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ border: '1px solid #CAEFFF', boxShadow: '0 4px 16px rgba(0,164,239,0.08)' }}>

                <div className="flex-1 p-6" style={{ background: '#EAF6FC' }}>
                  <p className="text-base font-extrabold leading-snug" style={{ color: '#0F172A' }}>
                    <span style={{ color: '#0694D1' }}>{c.code}</span> {c.title}
                  </p>
                </div>

                <div className="flex justify-center border-t p-4" style={{ borderColor: '#CAEFFF', background: '#fff' }}>
                  <a href={c.url} target="_blank" rel="noopener noreferrer"
                    className="rounded-lg border px-16 py-2.5 text-sm font-bold transition-all hover:opacity-80 active:scale-95"
                    style={{ background: '#fff', borderColor: '#0694D1', color: '#0694D1' }}>
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/search"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 4px 16px rgba(6,148,209,0.35)' }}>
              Explore All Courses
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ SUBSCRIBE BAR ════════════════ */}
      <div className="px-4 md:px-8 lg:px-[50px]" style={{ background: '#EBF8FE', borderTop: '1px solid #CAEFFF' }}>
        <div className="mx-auto max-w-7xl py-[20px] sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm font-bold text-center" style={{ color: '#0d1b2a' }}>
              Subscribe for updates on our Upcoming Webinars
            </p>
            <form className="flex items-center gap-2" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Enter Email" required
                className="w-full sm:w-56 rounded-lg border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0694D1]/30"
                style={{ borderColor: '#CAEFFF', background: 'white', color: '#0d1b2a' }} />
              <button type="submit" className="shrink-0 rounded-lg px-5 py-2 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95" style={{ background: '#0694D1' }}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ════════ WEBINAR DETAIL MODAL ════════ */}
      {modalWebinar && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: 'rgba(6,17,30,0.75)', backdropFilter: 'blur(6px)' }}
          onClick={() => setModalWebinar(null)}
        >
          <div
            className="relative flex flex-col sm:flex-row w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl"
            style={{ background: '#fff' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModalWebinar(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-70"
              style={{ background: '#1e293b', color: '#fff' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>

            {/* Left — speaker */}
            <div className="flex w-full sm:w-[190px] shrink-0 flex-col items-center justify-center gap-3 py-5 sm:py-8 px-6" style={{ background: '#f1f5f9', borderRight: '1px solid #e2e8f0' }}>
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
            <div className="relative flex flex-1 flex-col justify-center p-5 sm:p-7 sm:pr-12">
              <h3 className="mb-3 text-base font-bold leading-snug" style={{ color: '#0F172A' }}>{modalWebinar.title}</h3>
              {modalWebinar.description && (
                <>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide" style={{ color: '#0694D1' }}>Webinar Summary</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{modalWebinar.description}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </>
  )
}

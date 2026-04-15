'use client'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const STATS = [
  { value: '30+',      label: 'Years of Excellence' },
  { value: '30,000+', label: 'Students Trained Every Month' },
  { value: '99.1%',   label: 'On-Time Batch' },
  { value: '300+',    label: 'Excellent Trainers' },
  { value: '5,000+',  label: 'Courses 100+ Added Every Month' },
]

const OFFICES = [
  { code: 'in', name: 'India' },
  { code: 'ca', name: 'Canada' },
  { code: 'gb', name: 'Kingdom' },
  { code: 'ae', name: 'UAE' },
  { code: 'us', name: 'USA' },
  { code: 'sg', name: 'Singapore' },
  { code: 'nl', name: 'Netherlands' },
  { code: 'za', name: 'South Africa' },
  { code: 'nz', name: 'New Zealand' },
  { code: 'au', name: 'Australia' },
  { code: 'sa', name: 'Saudi Arabia' },
  { code: 'de', name: 'Germany' },
  { code: 'my', name: 'Malaysia' },
]

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />
      <AboutSubNav />

      {/* ── HERO BANNER ─────────────────────────────────────── */}
      <section className="py-10 px-4 md:px-8 lg:px-[50px]"
        style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #f0f9ff 50%, #e0f2fe 100%)' }}>
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-3">About Us</h1>
            <p className="text-[#475569] mb-5 leading-relaxed text-base">
              A global leader in IT training.<br />
              Just tell us What, Where, When – we'll deliver the training.
            </p>
            <p className="text-xl font-bold text-[#0F172A] mb-8">
              We empower you to earn Money, Respect and Peace of Mind.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: '#0694D1' }}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Our Corporate Presentation
            </a>
          </div>

          {/* Right – Presentation preview */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            style={{ background: '#07111e' }}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <Image src="/images/koenig-logo.svg" alt="Koenig" width={100} height={28}
                  className="h-6 w-auto brightness-0 invert" />
              </div>
              <div className="rounded-lg py-2 px-4 mb-5 text-center"
                style={{ background: '#0694D1' }}>
                <p className="text-white text-xs font-bold uppercase tracking-widest">Company Overview</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider mb-2">About Us</p>
                  <p className="text-white/65 text-[10px] leading-relaxed mb-3">
                    Empowering individuals through education since 1993. Koenig Solutions has grown into a global
                    training leader with presence in over 50+ cities worldwide.
                  </p>
                  <div className="flex gap-2">
                    <span className="rounded px-2 py-1 text-[9px] font-semibold text-white"
                      style={{ background: 'rgba(6,148,209,0.3)' }}>Vision 🌍</span>
                    <span className="rounded px-2 py-1 text-[9px] font-semibold text-white"
                      style={{ background: 'rgba(6,148,209,0.3)' }}>Mission 🎯</span>
                  </div>
                  <p className="text-white/40 text-[9px] leading-relaxed mt-3">
                    Our mission is to help individuals earn Money, Respect and Peace of Mind...
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.06)', minHeight: '120px' }}>
                  <div className="text-center p-4">
                    <div className="text-5xl mb-2">🌐</div>
                    <p className="text-white/30 text-[9px]">Global Training Leader</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── COMPANY INFO ────────────────────────────────────── */}
      <section className="bg-white py-10 px-4 md:px-8 lg:px-[50px]">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="grid lg:grid-cols-[260px_1fr]">

              {/* Left – logo + globe */}
              <div className="flex flex-col items-center justify-center gap-6 p-8
                border-b lg:border-b-0 lg:border-r border-gray-200">
                <Image src="/images/koenig-logo.svg" alt="Koenig Solutions"
                  width={160} height={44} className="h-10 w-auto" />
                {/* Stylised globe */}
                <div className="w-44 h-44 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden"
                  style={{ background: 'radial-gradient(circle at 38% 38%, #3b82f6, #1d4ed8, #1e3a8a)' }}>
                  {/* grid lines */}
                  <svg viewBox="0 0 176 176" className="absolute inset-0 w-full h-full opacity-20"
                    fill="none" stroke="white" strokeWidth="0.6">
                    <ellipse cx="88" cy="88" rx="86" ry="86" />
                    <ellipse cx="88" cy="88" rx="55" ry="86" />
                    <ellipse cx="88" cy="88" rx="20" ry="86" />
                    <line x1="2" y1="88" x2="174" y2="88" />
                    <ellipse cx="88" cy="88" rx="86" ry="45" />
                    <ellipse cx="88" cy="88" rx="86" ry="20" />
                  </svg>
                  <span className="text-6xl relative z-10">🌍</span>
                </div>
              </div>

              {/* Right – paragraphs */}
              <div className="p-8 space-y-4 text-[#374151] text-sm leading-7">
                <p>
                  <strong>Established in the year 1993</strong>, Koenig Solutions is a reputed training
                  organisation. The secret of our success is our belief that good training requires{' '}
                  <strong>"Excellent Trainers,"</strong> and our strive to retain the best.
                </p>
                <p>
                  Our vision is to contribute to a more equitable and prosperous world through education.
                  Today, Koenig has offices across the globe to help accomplish that vision.
                </p>
                <p>
                  Our dedicated team of professionals, known as <strong>Kites</strong>, are passionate
                  about delivering exceptional customer experiences.
                </p>
                <p>
                  We believe that true success is achievement of{' '}
                  <strong>Money, Respect, and Peace of Mind</strong> and we endeavor to achieve both for
                  our Kites and Kustomers. These core principles, embodied in{' '}
                  <span className="font-semibold" style={{ color: '#0694D1' }}>"Koenig Ethos"</span>, are
                  what drive us to deliver exceptional learning experiences for our valued Kustomers.
                </p>
                <p>
                  We believe in the philosophy of <strong>Constant Improvement</strong>.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── AWARD BANNER ────────────────────────────────────── */}
      <section className="bg-white pb-10 px-4 md:px-8 lg:px-[50px]">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border-2 p-5 flex items-center gap-5"
            style={{ borderColor: '#0694D1' }}>
            <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-3xl"
              style={{ background: '#f1f5f9', border: '2px solid #e2e8f0' }}>
              🏆
            </div>
            <div>
              <p className="font-bold" style={{ color: '#0694D1' }}>
                Best Place to Work in Education (2010-2025).
              </p>
              <p className="text-[#64748B] text-sm mt-1">
                The I &lt; O in our logo symbolises that I (us) is less than O (others), which aligns
                with our Kustomer Obsession.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────── */}
      <section className="bg-white pb-10 px-4 md:px-8 lg:px-[50px]">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-5 divide-x divide-y lg:divide-y-0 divide-gray-200">
              {STATS.map((s, i) => (
                <div key={i} className={`p-6 text-center${i === 4 ? ' col-span-2 lg:col-span-1' : ''}`}>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#0694D1' }}>{s.value}</div>
                  <div className="text-xs text-[#64748B] leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL PRESENCE ─────────────────────────────────── */}
      <section className="bg-white py-10 px-4 md:px-8 lg:px-[50px]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-[#0F172A] text-center mb-8">Our Global Presence</h2>
          <div className="rounded-xl border border-gray-200 p-8">
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-x-4 gap-y-6">
              {OFFICES.map(o => (
                <div key={o.code} className="flex flex-col items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/w80/${o.code}.png`}
                    alt={`${o.name} flag`}
                    style={{ width: '52px', height: '34px', objectFit: 'cover' }}
                    className="rounded-sm shadow"
                  />
                  <span className="text-[11px] text-[#64748B] text-center leading-tight">{o.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

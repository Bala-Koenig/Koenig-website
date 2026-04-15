'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const STATS = [
  { value: '30+',      label: 'Years of Excellence' },
  { value: '30,000+', label: 'Students Trained Every Month' },
  { value: '99.1%',   label: 'On-Time Batch' },
  { value: '300+',    label: 'Excellent Trainers' },
  { value: '5,000+',  label: 'Courses — 100+ Added Every Month' },
]

const OFFICES = [
  { code: 'in', country: 'India' },
  { code: 'ca', country: 'Canada' },
  { code: 'gb', country: 'Kingdom' },
  { code: 'ae', country: 'UAE' },
  { code: 'us', country: 'USA' },
  { code: 'sg', country: 'Singapore' },
  { code: 'nl', country: 'Netherlands' },
  { code: 'za', country: 'South Africa' },
  { code: 'nz', country: 'New Zealand' },
  { code: 'au', country: 'Australia' },
  { code: 'sa', country: 'Saudi Arabia' },
  { code: 'de', country: 'Germany' },
  { code: 'my', country: 'Malaysia' },
]

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />
      <AboutSubNav />

      {/* ── DARK HERO ──────────────────────────────────────── */}
      <style>{`
        @keyframes blob1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-30px) scale(1.1)}66%{transform:translate(-20px,20px) scale(0.95)}}
        @keyframes blob2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-35px,25px) scale(1.08)}66%{transform:translate(25px,-15px) scale(0.92)}}
        @keyframes blob3{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,40px) scale(1.05)}66%{transform:translate(-30px,-20px) scale(1.1)}}
        .about-blob1{animation:blob1 12s ease-in-out infinite}
        .about-blob2{animation:blob2 15s ease-in-out infinite}
        .about-blob3{animation:blob3 18s ease-in-out infinite}
      `}</style>
      <section className="relative bg-[#06111E] overflow-hidden py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="about-blob1 absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#0694D1] opacity-[0.08] blur-[130px]" />
          <div className="about-blob2 absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#38bdf8] opacity-[0.06] blur-[110px]" />
          <div className="about-blob3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#0694D1] opacity-[0.04] blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize:'24px 24px'}} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <p className="text-[#38bdf8] text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/70">About Us</span>
          </p>

          <div className="kglass-banner p-8 sm:p-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                  About <span className="text-[#38bdf8]">Koenig Solutions</span>
                </h1>
                <p className="text-xl text-white/80 mb-3 leading-relaxed">
                  A global leader in IT training. Just tell us <span className="text-[#38bdf8] font-semibold">What, Where, When</span> — we'll deliver the training.
                </p>
                <p className="text-lg text-white/60 mb-8">
                  We empower you to earn <span className="text-white font-medium">Money, Respect and Peace of Mind.</span>
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/about/our-story"
                    className="inline-block bg-[#0694D1] hover:bg-[#0580bb] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                    Our Story
                  </Link>
                  <Link href="/about/leadership"
                    className="inline-block border border-[#0694D1] text-[#38bdf8] hover:bg-[#0694D1] hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                    Meet the Team
                  </Link>
                </div>
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

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="kglass-dark rounded-2xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#38bdf8]">{s.value}</div>
                <div className="text-xs sm:text-sm text-white/60 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANY INFO ───────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden py-16 sm:py-20">
        {/* light-bg glow orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="about-blob1 absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#0694D1] opacity-[0.07] blur-[120px]" />
          <div className="about-blob3 absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.05] blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-2 text-center">Who We Are</h2>
          <p className="text-center text-[#475569] mb-12">Three decades of training excellence, built on one belief</p>

          <div className="kglass-light rounded-2xl p-8 sm:p-10">
            <div className="divide-y divide-[#0694D1]/10">

              {/* Founded */}
              <div className="flex gap-5 pb-7">
                <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(6,148,209,0.10)' }}>
                  🏛️
                </div>
                <div>
                  <p className="font-bold text-[#0694D1] text-sm mb-1">Founded in 1993</p>
                  <p className="text-[#374151] text-sm leading-7">
                    Koenig Solutions is a reputed training organisation. The secret of our success is our
                    belief that good training requires <strong>"Excellent Trainers,"</strong> and our strive
                    to retain the best.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="flex gap-5 py-7">
                <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(5,150,105,0.10)' }}>
                  🌍
                </div>
                <div>
                  <p className="font-bold text-sm mb-1" style={{ color: '#059669' }}>Our Vision</p>
                  <p className="text-[#374151] text-sm leading-7">
                    To contribute to a more equitable and prosperous world through education. Today, Koenig
                    has offices across the globe to help accomplish that vision.
                  </p>
                </div>
              </div>

              {/* Kites */}
              <div className="flex gap-5 py-7">
                <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(124,58,237,0.10)' }}>
                  🤝
                </div>
                <div>
                  <p className="font-bold text-sm mb-1" style={{ color: '#7c3aed' }}>The Kites</p>
                  <p className="text-[#374151] text-sm leading-7">
                    Our dedicated team of professionals, known as <strong>Kites</strong>, are passionate
                    about delivering exceptional customer experiences.
                  </p>
                </div>
              </div>

              {/* Koenig Ethos */}
              <div className="flex gap-5 py-7">
                <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(6,148,209,0.10)' }}>
                  💎
                </div>
                <div>
                  <p className="font-bold text-[#0694D1] text-sm mb-1">Koenig Ethos</p>
                  <p className="text-[#374151] text-sm leading-7">
                    We believe that true success is achievement of <strong>Money, Respect, and Peace of Mind</strong>{' '}
                    and we endeavor to achieve both for our Kites and Kustomers. These core principles, embodied in{' '}
                    <span className="font-semibold" style={{ color: '#0694D1' }}>"Koenig Ethos"</span>, drive
                    exceptional learning experiences for our valued Kustomers.
                  </p>
                </div>
              </div>

              {/* Constant Improvement */}
              <div className="flex gap-5 pt-7">
                <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(220,38,38,0.10)' }}>
                  📈
                </div>
                <div>
                  <p className="font-bold text-sm mb-1" style={{ color: '#dc2626' }}>Constant Improvement</p>
                  <p className="text-[#374151] text-sm leading-7">
                    We believe in the philosophy of <strong>Constant Improvement</strong> — always striving
                    to be better for our trainers, students, and the communities we serve worldwide.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── AWARD BANNER ───────────────────────────────────── */}
      <section className="relative bg-[#06111E] overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0">
          {/* base radial gradient centred on the card */}
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,148,209,0.18) 0%, rgba(56,189,248,0.08) 45%, transparent 70%)' }} />
          {/* animated blobs */}
          <div className="about-blob2 absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#0694D1] opacity-[0.18] blur-[110px]" />
          <div className="about-blob1 absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.10] blur-[100px]" />
          <div className="about-blob3 absolute bottom-0 -right-32 w-[400px] h-[400px] rounded-full bg-[#0694D1] opacity-[0.10] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="kglass-dark rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="text-5xl shrink-0">🏆</div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-[#38bdf8] mb-2">
                Best Place to Work in Education (2010–2026)
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                The <strong className="text-white/80">I &lt; O</strong> in our logo symbolises that
                I (us) is less than O (others), which aligns with our Kustomer Obsession.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL PRESENCE ────────────────────────────────── */}
      <section className="relative bg-[#F8FAFC] overflow-hidden py-16 sm:py-20">
        {/* light-bg glow orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="about-blob3 absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full bg-[#0694D1] opacity-[0.06] blur-[120px]" />
          <div className="about-blob2 absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-[#38bdf8] opacity-[0.06] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-2 text-center">Our Global Presence</h2>
          <p className="text-center text-[#475569] mb-12">13 offices. 195+ countries served.</p>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-x-4 gap-y-8">
            {OFFICES.map(o => (
              <div key={o.code} className="flex flex-col items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/w80/${o.code}.png`}
                  alt={`${o.country} flag`}
                  style={{ width: '52px', height: '34px', objectFit: 'cover' }}
                  className="rounded shadow-sm"
                />
                <span className="text-[11px] text-[#475569] text-center font-medium leading-tight">
                  {o.country}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="relative bg-[#06111E] overflow-hidden py-16 sm:py-20 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="about-blob1 absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#0694D1] opacity-[0.10] blur-[120px]" />
          <div className="about-blob2 absolute -bottom-16 -left-24 w-[350px] h-[350px] rounded-full bg-[#38bdf8] opacity-[0.06] blur-[100px]" />
          <div className="about-blob3 absolute -bottom-16 -right-24 w-[350px] h-[350px] rounded-full bg-[#0694D1] opacity-[0.06] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Upskill?</h2>
          <p className="text-white/70 mb-8 text-lg">Join 30,000+ students training with Koenig every month.</p>
          <a href="mailto:sales@koenig-solutions.com"
            className="inline-block bg-[#0694D1] hover:bg-[#0580bb] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}

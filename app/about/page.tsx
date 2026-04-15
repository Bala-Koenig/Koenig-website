'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const STATS = [
  { value: '30+',      label: 'Years' },
  { value: '30,000+',  label: 'Students Monthly' },
  { value: '99.1%',    label: 'On-Time' },
  { value: '300+',     label: 'Trainers' },
  { value: '5,000+',   label: 'Courses' },
  { value: '195+',     label: 'Countries' },
]

const CARDS = [
  { icon: '📖', title: 'Our Story',            desc: 'Three decades of resilience and growth.',                     href: '/about/our-story' },
  { icon: '👥', title: 'Leadership',           desc: 'Meet the team driving our global mission.',                   href: '/about/leadership' },
  { icon: '🏢', title: 'Our Clients',          desc: '1M+ professionals from 195+ countries trust us.',             href: '/about/our-clients' },
  { icon: '🤝', title: 'Our Partners',         desc: 'Vendor-authorized training from the world\'s best.',          href: '/about/our-partners' },
  { icon: '🏆', title: 'Our Awards',           desc: 'Recognized globally for training excellence.',                href: '/about/awards' },
  { icon: '😊', title: 'Happiness Guarantee',  desc: 'Not happy? Full refund or free class redo.',                  href: '/about/happiness-guarantee' },
  { icon: '⭐', title: 'Student Feedback',     desc: 'Real stories from 5M+ learners worldwide.',                  href: '/about/student-feedback' },
]

const PHILOSOPHY = [
  { icon: '💰', title: 'Money',          desc: 'We help you gain high-demand skills that command premium salaries and open doors to new opportunities globally.' },
  { icon: '🎖️', title: 'Respect',        desc: 'Certifications from world-leading vendors earn you the credibility and recognition you deserve in your field.' },
  { icon: '☮️', title: 'Peace of Mind',  desc: 'Our happiness guarantee means you train risk-free. If you\'re not satisfied, we make it right — always.' },
]

const OFFICES = [
  { flag: '🇮🇳', city: 'New Delhi',        country: 'India' },
  { flag: '🇨🇦', city: 'Delta BC',         country: 'Canada' },
  { flag: '🇬🇧', city: 'London',           country: 'UK' },
  { flag: '🇦🇪', city: 'Dubai',            country: 'UAE' },
  { flag: '🇺🇸', city: 'New York',         country: 'USA' },
  { flag: '🇸🇬', city: 'Singapore',        country: 'Singapore' },
  { flag: '🇳🇱', city: 'Amsterdam',        country: 'Netherlands' },
  { flag: '🇿🇦', city: 'Johannesburg',     country: 'South Africa' },
  { flag: '🇳🇿', city: 'Wellington',       country: 'New Zealand' },
  { flag: '🇦🇺', city: 'Sydney',           country: 'Australia' },
  { flag: '🇸🇦', city: 'Riyadh',           country: 'Saudi Arabia' },
  { flag: '🇩🇪', city: 'Munich',           country: 'Germany' },
  { flag: '🇲🇾', city: 'Kuala Lumpur',     country: 'Malaysia' },
]

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      <AboutSubNav />

      {/* DARK HERO */}
      <style>{`
        @keyframes blob1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-30px) scale(1.1)}66%{transform:translate(-20px,20px) scale(0.95)}}
        @keyframes blob2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-35px,25px) scale(1.08)}66%{transform:translate(25px,-15px) scale(0.92)}}
        @keyframes blob3{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,40px) scale(1.05)}66%{transform:translate(-30px,-20px) scale(1.1)}}
        .about-blob1{animation:blob1 12s ease-in-out infinite}
        .about-blob2{animation:blob2 15s ease-in-out infinite}
        .about-blob3{animation:blob3 18s ease-in-out infinite}
      `}</style>
      <section className="relative bg-[#06111E] overflow-hidden py-16 sm:py-24">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="about-blob1 absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#0694D1] opacity-[0.08] blur-[130px]" />
          <div className="about-blob2 absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#38bdf8] opacity-[0.06] blur-[110px]" />
          <div className="about-blob3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#0694D1] opacity-[0.04] blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize:'24px 24px'}} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          {/* Breadcrumb */}
          <p className="text-[#38bdf8] text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/70">About Us</span>
          </p>

          <div className="kglass-banner p-8 sm:p-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
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

              {/* Right – YouTube embed */}
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

          {/* Stats row */}
          <div className="mt-8 grid grid-cols-3 sm:grid-cols-6 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="kglass-dark rounded-2xl p-4 text-center transition-all">
                <div className="text-2xl sm:text-3xl font-bold text-[#38bdf8]">{s.value}</div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHT SECTION – sub-page cards */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-2 text-center">Explore Our Story</h2>
          <p className="text-center text-[#475569] mb-12">Everything you need to know about Koenig Solutions</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARDS.map(c => (
              <Link key={c.href} href={c.href}
                className="group block kglass-light rounded-2xl p-6 transition-all">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#0694D1] transition-colors">{c.title}</h3>
                <p className="text-sm text-[#64748B] mb-4 leading-relaxed">{c.desc}</p>
                <span className="text-[#0694D1] text-sm font-semibold group-hover:underline">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DARK SECTION – philosophy */}
      <section className="relative bg-[#06111E] py-16 sm:py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0694D1] opacity-[0.06] blur-[120px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">Our Promise to You</h2>
          <p className="text-center text-white/60 mb-12">Every course, every student — the same commitment.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {PHILOSOPHY.map(p => (
              <div key={p.title}
                className="kglass-dark rounded-2xl p-8 text-center transition-all">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHT SECTION – global presence */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-2 text-center">13 Offices, 1 Mission</h2>
          <p className="text-center text-[#475569] mb-12">Global reach with local expertise</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {OFFICES.map(o => (
              <div key={`${o.city}-${o.country}`}
                className="kglass-light rounded-xl p-4 text-center transition-all">
                <div className="text-2xl mb-2">{o.flag}</div>
                <div className="font-semibold text-[#0F172A] text-sm">{o.city}</div>
                <div className="text-[#64748B] text-xs">{o.country}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK SECTION – CTA */}
      <section className="bg-[#06111E] py-16 sm:py-20 text-center">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
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

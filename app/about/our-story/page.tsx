'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const TIMELINE = [
  {
    year: '1993',
    event: 'Founded',
    color: '#0694D1',
    desc: 'Started in Patel Nagar, Delhi — loss-making but determined. Rohit Aggarwal believed IT training could change lives. The early years were tough but the mission was clear.',
  },
  {
    year: '2001',
    event: 'Near-Death #1 — Dotcom Bust',
    color: '#ef4444',
    desc: 'The dotcom bubble wiped out the domestic market. Koenig pivoted to offshore training, finding its first UK customer Andy Sau — a move that would define the next decade.',
  },
  {
    year: '2004–2015',
    event: 'Rapid Growth',
    color: '#22c55e',
    desc: 'Students grew from 10 to 1,000+ per month. Offices opened in Shimla, Goa, and Dubai. Live online training launched, breaking geographical barriers for learners worldwide.',
  },
  {
    year: '2016',
    event: 'Near-Death #2 — Oil Crisis',
    color: '#f59e0b',
    desc: '80% revenue drop almost ended everything. Strict cost controls and an unwavering team kept Koenig alive. Full recovery was achieved by year-end — stronger than before.',
  },
  {
    year: '2020',
    event: 'Near-Death #3 — COVID-19',
    color: '#a855f7',
    desc: 'Pandemic shut down the world. Koenig made a full pivot to live online delivery and adopted a WFH model overnight. The crisis became a catalyst — student numbers surged.',
  },
  {
    year: '2025',
    event: 'Today',
    color: '#38bdf8',
    desc: '30,000+ students/month. 300+ trainers. 5,000+ courses across 12 countries. Three near-deaths and 30 years later, Koenig stands as a global leader in IT training.',
  },
]

export default function OurStoryPage() {
  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      <AboutSubNav />

      {/* DARK HERO */}
      <section className="relative bg-[#06111E] overflow-hidden py-[60px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#0694D1] opacity-[0.07] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.05] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="kglass-banner py-10 px-8 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Our <span className="text-[#38bdf8]">Story</span>
              </h1>
              <p className="text-xl text-white/80 mb-4 leading-relaxed">
                Thirty years ago, a young entrepreneur started a training company in a small Delhi office with a dream to make world-class IT education accessible to everyone.
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                Three near-death experiences. Three pivots. One unstoppable mission — to help people earn Money, Respect, and Peace of Mind through technology skills.
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

      {/* LIGHT SECTION – Timeline */}
      <section className="bg-white py-[60px]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3 text-center">Three Decades of Resilience</h2>
          <p className="text-center text-[#475569] mb-12">From a single Delhi office to 30,000+ students monthly in 195 countries</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIMELINE.map(t => (
              <div key={t.year}
                className="kglass-light rounded-2xl p-6 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-sm font-bold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: t.color }}>
                    {t.year}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-3">{t.event}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK SECTION – Koenig Ethos */}
      <section className="relative bg-[#06111E] py-[60px] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0694D1] opacity-[0.06] blur-[120px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">The Koenig Ethos</h2>
            <div className="kglass-dark rounded-2xl p-8 mb-8">
              <div className="text-5xl font-black text-[#38bdf8] mb-4">I &lt; O</div>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                <span className="font-bold text-white">Individual is less than Organisation.</span> Every decision, every hire, every product choice is made with the organisation's long-term health over any individual's short-term gain.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div className="kglass-dark rounded-xl p-5">
                <div className="text-[#38bdf8] font-bold mb-2">Customer Obsession</div>
                <p className="text-white/60 text-sm leading-relaxed">
                  We don't just train — we transform careers. Every interaction, every course, every support call is designed around one question: did this help the student?
                </p>
              </div>
              <div className="kglass-dark rounded-xl p-5">
                <div className="text-[#38bdf8] font-bold mb-2">Constant Improvement</div>
                <p className="text-white/60 text-sm leading-relaxed">
                  We measure everything. NPS, on-time delivery (99.1%), trainer quality, course outcomes. If a number moves, we act — immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHT SECTION – CTA */}
      <section className="bg-[#F8FAFC] py-[60px] text-center">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Want to Be Part of Our Next Chapter?</h2>
          <p className="text-[#475569] mb-8 text-lg">Train with Koenig and write your own success story.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:sales@koenig-solutions.com"
              className="inline-block bg-[#0694D1] hover:bg-[#0580bb] text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              Contact Us
            </a>
            <Link href="/about/leadership"
              className="inline-block border border-[#0694D1] text-[#0694D1] hover:bg-[#0694D1] hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

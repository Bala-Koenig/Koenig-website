'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const VENDOR_AWARDS = [
  {
    vendor: 'Microsoft',
    color: '#00a1f1',
    awards: [
      '2025 Global Winner — Training Services Partner of the Year',
      'FY24 ANZ Superstar Campaign Winner',
      'FY22 Asia Superstar Campaign Winner',
    ],
  },
  {
    vendor: 'AWS',
    color: '#ff9900',
    awards: [
      '2024 Partner of the Year Finalist',
      '2022 Customer Obsession Award',
    ],
  },
  {
    vendor: 'EC-Council',
    color: '#e63946',
    awards: [
      '2024 ATC of the Year',
      '2023 ATC of the Year',
      '2022 ATC Circle of Excellence',
    ],
  },
  {
    vendor: 'PECB',
    color: '#22c55e',
    awards: [
      '2024 Titanium Partner',
      '2023 Titanium Partner',
    ],
  },
  {
    vendor: 'Oracle',
    color: '#f80000',
    awards: [
      'Training Program Excellence Award',
    ],
  },
  {
    vendor: 'VMware',
    color: '#607078',
    awards: [
      'Partner of the Year 2023',
    ],
  },
  {
    vendor: 'Red Hat',
    color: '#ee0000',
    awards: [
      'Partner of the Year 2023',
    ],
  },
]

export default function AwardsPage() {
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
      <section className="bg-white py-[60px]">
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

      {/* DARK SECTION – Vendor awards */}
      <section className="relative bg-[#06111E] py-[60px] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0694D1] opacity-[0.05] blur-[120px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">Vendor <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Awards</span></h2>
          <p className="text-center text-white/60 mb-12">Recognition from the technology vendors we're authorized to represent</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VENDOR_AWARDS.map(v => (
              <div key={v.vendor}
                className="kglass-dark rounded-2xl p-6 transition-all">
                <div
                  className="inline-block text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5"
                  style={{ backgroundColor: v.color }}>
                  {v.vendor}
                </div>
                <ul className="space-y-3">
                  {v.awards.map(a => (
                    <li key={a} className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 flex-shrink-0">★</span>
                      <span className="text-white/70 text-sm leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/about/our-partners"
              className="inline-block border border-[#0694D1] text-[#38bdf8] hover:bg-[#0694D1] hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Our Partners
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

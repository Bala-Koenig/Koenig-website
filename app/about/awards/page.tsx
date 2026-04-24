'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const VENDOR_AWARDS = [
  {
    vendor: 'Microsoft',
    color: '#00a1f1',
    vendorLogo: 'microsoft-cloud-t.png',
    awardImg: 'MS-Partner-of-the-year-2025-popup.webp',
    awards: ['2025 Global Winner — Training Services Partner of the Year'],
  },
  {
    vendor: 'Microsoft',
    color: '#00a1f1',
    vendorLogo: 'microsoft-cloud-t.png',
    awardImg: 'Microsoft-FY2024-Superstar-Award.webp',
    awards: ['FY24 ANZ Superstar Campaign Winner'],
  },
  {
    vendor: 'Microsoft',
    color: '#00a1f1',
    vendorLogo: 'microsoft-cloud-t.png',
    awardImg: 'Microsoft-Superstar-Award-2022.webp',
    awards: ['FY22 Asia Superstar Campaign Winner'],
  },
  {
    vendor: 'AWS',
    color: '#ff9900',
    vendorLogo: 'amazon-authorized.png',
    awardImg: 'Finalist–AWS-Partner-of-the-Year-2024.webp',
    awards: [
      '2024 Partner of the Year Finalist',
      '2022 Customer Obsession Award',
    ],
  },
  {
    vendor: 'EC-Council',
    color: '#e63946',
    vendorLogo: 'EC-Council-logo.png',
    awardImg: 'Winner-of-EC-Council-ATC-of-the-Year-Award-2024.webp',
    awards: [
      '2024 ATC of the Year',
      '2023 ATC of the Year',
      '2022 ATC Circle of Excellence',
    ],
  },
  {
    vendor: 'PECB',
    color: '#22c55e',
    vendorLogo: 'Authorized PECB Certification Courses Training badge.png',
    awardImg: 'Winner-of-the-PECB-Titanium-Partner-Award-2024.webp',
    awards: [
      '2024 Titanium Partner',
      '2023 Titanium Partner',
    ],
  },
  {
    vendor: 'Oracle',
    color: '#f80000',
    vendorLogo: 'o-prtnr-clr-rgb (1).png',
    awardImg: null,
    awards: [
      'Training Program Excellence Award',
    ],
  },
  {
    vendor: 'VMware',
    color: '#607078',
    vendorLogo: 'VMware-Broadcom.png',
    awardImg: null,
    awards: [
      'Partner of the Year 2023',
    ],
  },
  {
    vendor: 'Red Hat',
    color: '#ee0000',
    vendorLogo: 'Redvendorlogo.png',
    awardImg: 'Redhat-23.png',
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

      {/* LIGHT SECTION – Vendor Awards */}
      <section className="relative py-[50px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #ddf1fb 30%, #ffffff 60%, #c8eaf8 100%)' }}>
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full opacity-30 blur-[100px]" style={{ background: 'radial-gradient(circle, #BAE6FD, transparent 70%)' }} />
          <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full opacity-25 blur-[90px]" style={{ background: 'radial-gradient(circle, #7DD3FA, transparent 70%)' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3 text-center">
            Vendor <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Awards</span>
          </h2>
          <p className="text-center text-[#475569] mb-12">Recognition from the technology vendors we're authorized to represent</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {VENDOR_AWARDS.map((v, idx) => (
              <div
                key={`${v.vendor}-${idx}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: '0 4px 20px rgba(6,148,209,0.10), 0 1px 4px rgba(0,0,0,0.06)', border: '1px solid rgba(186,230,253,0.6)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(6,148,209,0.22), 0 2px 8px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = '#0694D1' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(6,148,209,0.10), 0 1px 4px rgba(0,0,0,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(186,230,253,0.6)' }}
              >
                {/* Colored top accent */}
                <div className="h-1 w-full" style={{ backgroundColor: v.color }} />

                {/* Vendor header */}
                <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#F8FBFF] border border-[#EEF6FF] p-1">
                    <img
                      src={`/images/partners/${encodeURIComponent(v.vendorLogo)}`}
                      alt={v.vendor}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-[#0F172A] text-sm leading-tight">{v.vendor}</div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5">{v.awards.length} Award{v.awards.length > 1 ? 's' : ''}</div>
                  </div>
                </div>

                {/* Award image */}
                <div className="mx-4 mb-3 rounded-xl overflow-hidden flex items-center justify-center bg-[#F8FBFF] border border-[#EEF6FF]" style={{ height: '140px' }}>
                  {v.awardImg ? (
                    <img
                      src={`/images/awards/${encodeURIComponent(v.awardImg)}`}
                      alt={`${v.vendor} award`}
                      className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                        style={{ backgroundColor: v.color + '18' }}>
                        🏆
                      </div>
                      <span className="text-xs font-semibold" style={{ color: v.color }}>Award Winner</span>
                    </div>
                  )}
                </div>

                {/* Awards list */}
                <div className="px-4 pb-4 flex-1">
                  <ul className="space-y-2">
                    {v.awards.map(a => (
                      <li key={a} className="flex items-start gap-2">
                        <span className="mt-0.5 shrink-0 text-xs" style={{ color: v.color }}>★</span>
                        <span className="text-[#334155] text-xs leading-relaxed">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
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

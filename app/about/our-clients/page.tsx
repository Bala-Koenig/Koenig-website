'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const CLIENTS = [
  'Chevron', 'TCS', 'HCL', 'Microsoft', 'NTT', 'PwC',
  'United Nations', 'HSBC', 'NHS', 'Saudi Aramco', 'Shell', 'Infosys',
  'Adobe', 'Google', 'EY', 'GE', 'McKinsey', 'Bain & Company',
  'Emirates', 'DHL', 'HP', 'Fujifilm', 'Accenture', 'Deloitte',
  'IBM', 'Capgemini', 'Wipro', 'Cognizant', 'KPMG', 'Oracle',
]

const BIG_STATS = [
  { value: '1M+',     label: 'Professionals Certified' },
  { value: '195+',    label: 'Countries Reached' },
  { value: '30+',     label: 'Fortune-500 Clients' },
]

export default function OurClientsPage() {
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
                Our <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Clients</span>
              </h1>
              <p className="text-xl text-white/80 mb-4 leading-relaxed">
                From Fortune-500 multinationals to government agencies and fast-growing startups — over 1 million professionals across 195 countries have trusted Koenig to upskill their teams.
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#38bdf8]">1M+</div>
                  <div className="text-white/60 text-sm">Professionals Certified</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#38bdf8]">195+</div>
                  <div className="text-white/60 text-sm">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#38bdf8]">30+</div>
                  <div className="text-white/60 text-sm">Fortune-500 Clients</div>
                </div>
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
        </div>
      </section>

      {/* LIGHT SECTION – Client pills */}
      <section className="bg-white py-[50px]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3 text-center">Trusted by the World's <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Best</span></h2>
          <p className="text-center text-[#475569] mb-12">Organizations that rely on Koenig to develop their teams</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {CLIENTS.map(c => (
              <span key={c}
                className="group inline-block bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] px-5 py-2.5 rounded-full text-sm font-medium
                  hover:text-[#0694D1] hover:border-[#0694D1] hover:bg-[#EFF6FF] transition-all cursor-default">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* DARK SECTION – Big stats */}
      <section className="relative bg-[#06111E] py-[50px] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#0694D1] opacity-[0.06] blur-[120px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {BIG_STATS.map(s => (
              <div key={s.label} className="kglass-dark rounded-2xl p-10 transition-all">
                <div className="text-5xl font-black text-[#38bdf8] mb-3">{s.value}</div>
                <div className="text-white/70 text-lg">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHT SECTION – Enterprise callout */}
      <section className="bg-[#F8FAFC] py-[50px]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-6">Enterprise Training <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Solutions</span></h2>
            <p className="text-[#475569] text-lg leading-relaxed mb-6">
              We deliver bespoke corporate training programs tailored to your organization's technology stack, business goals, and learning preferences. From instructor-led classroom sessions to fully remote live online cohorts — we build the program around you.
            </p>
            <p className="text-[#475569] leading-relaxed mb-8">
              Our enterprise clients benefit from dedicated account managers, custom courseware, volume pricing, and a guaranteed satisfaction policy. Whether you're upskilling 10 or 10,000 employees, Koenig scales with you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:sales@koenig-solutions.com"
                className="inline-block bg-[#0694D1] hover:bg-[#0580bb] text-white font-semibold px-8 py-4 rounded-xl transition-colors">
                Talk to Enterprise Sales
              </a>
              <Link href="/about/happiness-guarantee"
                className="inline-block border border-[#0694D1] text-[#0694D1] hover:bg-[#0694D1] hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
                Our Happiness Guarantee
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

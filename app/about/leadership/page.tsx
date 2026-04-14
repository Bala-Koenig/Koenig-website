'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const TEAM = [
  { initials: 'SC', name: 'Subodh Choudhary',     title: 'Group Manager, Alliances & Corporate Sales', color: '#0694D1' },
  { initials: 'SG', name: 'Sakshi Gaba Dhawan',   title: 'Group Manager, HR, AR/AP & Pre-Sales',       color: '#7c3aed' },
  { initials: 'VA', name: 'Vardaan Aggarwal',      title: 'Executive Director, Investments',             color: '#059669' },
  { initials: 'AS', name: 'Aditya Sharma',         title: 'Technical Lead, Automation',                  color: '#dc2626' },
  { initials: 'PK', name: 'Praveen Kumar',         title: 'Finance Manager',                             color: '#d97706' },
  { initials: 'RA', name: 'Raahil Aggarwal',       title: 'Group Manager, AI, Strategy & Brand',         color: '#0891b2' },
  { initials: 'KS', name: 'Kunal Singh',           title: 'Regional Manager, Australia',                 color: '#16a34a' },
  { initials: 'NK', name: 'Nidhi Kumra Ahuja',     title: 'Manager, HR & Freelancer Management',         color: '#be185d' },
  { initials: 'RT', name: 'Rohit Tiwary',          title: 'Asst. Manager, Brand & Digital Communications', color: '#7c3aed' },
  { initials: 'HT', name: 'Hardik Tike',           title: 'Asst. Technical Manager',                    color: '#0694D1' },
  { initials: 'VJ', name: 'Vatan Vijay Joshi',     title: 'Asst. Technical Manager',                    color: '#dc2626' },
  { initials: 'MC', name: 'Manish Chaturvedi',     title: 'Asst. Sales Manager',                        color: '#d97706' },
]

export default function LeadershipPage() {
  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      <AboutSubNav />

      {/* DARK HERO */}
      <section className="relative bg-[#06111E] overflow-hidden py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#0694D1] opacity-[0.07] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.05] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <p className="text-[#38bdf8] text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-white/40">/</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/70">Leadership</span>
          </p>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Leadership <span className="text-[#38bdf8]">Team</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                The people behind 30 years of innovation, resilience, and customer obsession. Each leader brings deep domain expertise and a shared commitment to student outcomes.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
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
      </section>

      {/* LIGHT SECTION – CEO spotlight */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-12 text-center">Founder &amp; CEO</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-2 border-[#0694D1]/20 rounded-3xl p-8 sm:p-12 hover:shadow-xl hover:shadow-[#0694D1]/10 transition-all">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>
                    RA
                  </div>
                </div>
                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-1">Rohit Aggarwal</h3>
                  <p className="text-[#0694D1] font-semibold text-lg mb-4">CEO &amp; Founder</p>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-6">
                    <span className="bg-[#EFF6FF] text-[#0694D1] px-3 py-1 rounded-full text-sm font-medium">30+ Years Experience</span>
                    <span className="bg-[#EFF6FF] text-[#0694D1] px-3 py-1 rounded-full text-sm font-medium">Customer Obsession</span>
                    <span className="bg-[#EFF6FF] text-[#0694D1] px-3 py-1 rounded-full text-sm font-medium">I &lt; O Philosophy</span>
                  </div>
                  <p className="text-[#475569] leading-relaxed mb-4">
                    Rohit Aggarwal founded Koenig Solutions in 1993 from a small office in Patel Nagar, Delhi. Over three decades he has led the company through three near-death crises — the Dotcom bust, the Oil price crash, and COVID-19 — emerging stronger each time.
                  </p>
                  <p className="text-[#475569] leading-relaxed mb-4">
                    His guiding philosophy — <span className="font-semibold text-[#0F172A]">I &lt; O (Individual is less than Organisation)</span> — is embedded in every team decision. He personally reviews student satisfaction scores and responds directly to unhappy learners.
                  </p>
                  <p className="text-[#475569] leading-relaxed">
                    Under his leadership, Koenig has trained 5M+ professionals across 195 countries, earned 15 consecutive Great Place to Work certifications, and won global awards from Microsoft, AWS, EC-Council, PECB, and VMware.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DARK SECTION – Team grid */}
      <section className="relative bg-[#06111E] py-16 sm:py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0694D1] opacity-[0.05] blur-[120px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">Senior Leadership</h2>
          <p className="text-center text-white/60 mb-12">The experts driving global operations, growth, and innovation</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {TEAM.map(m => (
              <div key={m.name}
                className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 hover:border-[#0694D1]/50 hover:bg-white/[0.07] transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: m.color }}>
                    {m.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm group-hover:text-[#38bdf8] transition-colors">{m.name}</div>
                  </div>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHT SECTION – Join CTA */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 text-center">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Join Our Team</h2>
          <p className="text-[#475569] mb-8 text-lg max-w-xl mx-auto">
            We're always looking for passionate educators, tech experts, and business professionals to help us grow.
          </p>
          <a href="mailto:hr@koenig-solutions.com"
            className="inline-block bg-[#0694D1] hover:bg-[#0580bb] text-white font-semibold px-8 py-4 rounded-xl transition-colors">
            Explore Careers
          </a>
        </div>
      </section>
    </div>
  )
}

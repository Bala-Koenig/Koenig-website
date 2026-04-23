'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const CLIENTS = [
  { name: 'Google',             img: 'google.png'               },
  { name: 'Microsoft',          img: 'ms.png'                   },
  { name: 'Adobe',              img: 'adobe.png'                },
  { name: 'Dell',               img: 'dell.png'                 },
  { name: 'HP',                 img: 'hp.png'                   },
  { name: 'Infosys',            img: 'infosys.png'              },
  { name: 'TCS',                img: 'TCS.png'                  },
  { name: 'Wipro',              img: 'wipro.png'                },
  { name: 'HCL Technologies',   img: 'hcl-technologies.png'     },
  { name: 'Cognizant',          img: 'cts.png'                  },
  { name: 'EY',                 img: 'EY.png'                   },
  { name: 'PwC',                img: 'pwc.png'                  },
  { name: 'McKinsey & Company', img: 'mcKinsey-and-company.png' },
  { name: 'Bain & Company',     img: 'Bain-and-Company.png'     },
  { name: 'HSBC',               img: 'hsbc.png'                 },
  { name: 'Shell',              img: 'shell 1.png'              },
  { name: 'Chevron',            img: 'chevron.png'              },
  { name: 'Saudi Aramco',       img: 'aramco.png'               },
  { name: 'Bharat Petroleum',   img: 'Bharat-Petroleum.png'     },
  { name: 'GE',                 img: 'ge.png'                   },
  { name: 'Fujifilm',           img: 'fuji.png'                 },
  { name: 'DHL',                img: 'dhl.png'                  },
  { name: 'Emirates',           img: 'Emirates.png'             },
  { name: 'NTT',                img: 'NTT.png'                  },
  { name: 'NHS',                img: 'NHS.png'                  },
  { name: 'United Nations',     img: 'united-nations.png'       },
  { name: 'Capgemini',          img: 'capeg.png'                },
  { name: 'Dept',               img: 'dept.png'                 },
  { name: 'Link',               img: 'link.png'                 },
  { name: 'Abin',               img: 'abin.png'                 },
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

      {/* LIGHT SECTION – Client logos grid */}
      <section className="bg-white py-[50px]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3 text-center">
            Trusted by the World's <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Best</span>
          </h2>
          <p className="text-center text-[#475569] mb-12">Organizations that rely on Koenig to develop their teams</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {CLIENTS.map(c => (
              <div
                key={c.name}
                className="flex items-center justify-center p-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0694D1]/40 hover:bg-[#EFF6FF] hover:shadow-md transition-all"
                title={c.name}>
                <img
                  src={`/images/trusted-logos/${encodeURIComponent(c.img)}`}
                  alt={c.name}
                  className="h-14 w-auto max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK SECTION – Industries We Serve */}
      <section className="relative py-[50px] overflow-hidden" style={{ background: 'linear-gradient(160deg, #06111E 0%, #071828 50%, #06111E 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/4 w-[500px] h-[400px] bg-[#0694D1] opacity-[0.08] blur-[130px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-[#38bdf8] opacity-[0.06] blur-[120px] rounded-full" />
          <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#0694D1] opacity-[0.04] blur-[100px] rounded-full" />
          <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #0694D1, #38bdf8, #0694D1, transparent)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">Industries We <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Serve</span></h2>
          <p className="text-center text-white/60 mb-12">Koenig delivers specialist IT training across every major sector</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              {
                color: '#0694D1', bg: 'rgba(6,148,209,0.12)',
                title: 'Banking & Finance',
                desc: 'HSBC, PwC, EY and global financial institutions upskilling teams in cloud, security and compliance.',
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>,
              },
              {
                color: '#10b981', bg: 'rgba(16,185,129,0.12)',
                title: 'Healthcare & NHS',
                desc: 'NHS and healthcare providers training staff on Microsoft 365, data governance and digital transformation.',
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
              },
              {
                color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',
                title: 'Oil & Energy',
                desc: 'Saudi Aramco, Shell and Chevron developing technical teams across infrastructure, cloud and automation.',
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
              },
              {
                color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',
                title: 'Aviation & Logistics',
                desc: 'Emirates and DHL building certified professionals in networking, cloud operations and project management.',
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 16v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><path d="M3 16l4-9h10l4 9"/><path d="M12 7V3"/><path d="M8 21h8"/></svg>,
              },
              {
                color: '#38bdf8', bg: 'rgba(56,189,248,0.12)',
                title: 'Technology & IT',
                desc: 'TCS, Infosys, Wipro, HCL and Cognizant running large-scale upskilling programs across global teams.',
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
              },
              {
                color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
                title: 'Government & UN',
                desc: 'United Nations and public sector organisations training staff in cybersecurity, data and cloud platforms.',
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
              },
              {
                color: '#f97316', bg: 'rgba(249,115,22,0.12)',
                title: 'Manufacturing & GE',
                desc: 'GE, Fujifilm and industrial enterprises certifying engineers in cloud, IoT and enterprise technology.',
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
              },
              {
                color: '#06b6d4', bg: 'rgba(6,182,212,0.12)',
                title: 'Telecom & NTT',
                desc: 'NTT and telecom leaders certifying network engineers across Cisco, Microsoft and cloud technologies.',
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M1.7 8.5a14.5 14.5 0 0120.6 0M5 12a11 11 0 0114 0M8.5 15.5a7 7 0 017 0M12 19h.01"/></svg>,
              },
            ].map(ind => (
              <div key={ind.title}
                className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden backdrop-blur-md"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ background: `radial-gradient(ellipse at top left, ${ind.bg}, transparent 70%)` }} />
                {/* Top accent line */}
                <div className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${ind.color}, transparent)` }} />
                <div className="relative">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: ind.bg, color: ind.color }}>
                    {ind.svg}
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2 group-hover:text-white transition-colors">{ind.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHT SECTION – Enterprise callout */}
      <section
        className="relative py-[50px] overflow-hidden"
        style={{
          backgroundColor: '#EBF5FF',
          backgroundImage: 'radial-gradient(rgba(6,148,209,0.28) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[260px] bg-[#EBF5FF] opacity-80 blur-[60px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
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

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
      <section className="relative bg-[#06111E] py-[50px] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0694D1] opacity-[0.06] blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#38bdf8] opacity-[0.04] blur-[100px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">Industries We <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Serve</span></h2>
          <p className="text-center text-white/60 mb-12">Koenig delivers specialist IT training across every major sector</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { icon: '🏦', title: 'Banking & Finance',     desc: 'HSBC, PwC, EY and global financial institutions upskilling teams in cloud, security and compliance.' },
              { icon: '⚕️', title: 'Healthcare & NHS',      desc: 'NHS and healthcare providers training staff on Microsoft 365, data governance and digital transformation.' },
              { icon: '⛽', title: 'Oil & Energy',          desc: 'Saudi Aramco, Shell and Chevron developing technical teams across infrastructure, cloud and automation.' },
              { icon: '✈️', title: 'Aviation & Logistics',  desc: 'Emirates and DHL building certified professionals in networking, cloud operations and project management.' },
              { icon: '💻', title: 'Technology & IT',       desc: 'TCS, Infosys, Wipro, HCL and Cognizant running large-scale upskilling programs across global teams.' },
              { icon: '🌍', title: 'Government & UN',       desc: 'United Nations and public sector organisations training staff in cybersecurity, data and cloud platforms.' },
              { icon: '🏭', title: 'Manufacturing & GE',    desc: 'GE, Fujifilm and industrial enterprises certifying engineers in cloud, IoT and enterprise technology.' },
              { icon: '📡', title: 'Telecom & NTT',         desc: 'NTT and telecom leaders certifying network engineers across Cisco, Microsoft and cloud technologies.' },
            ].map(ind => (
              <div key={ind.title} className="kglass-dark rounded-2xl p-6 transition-all hover:-translate-y-1">
                <div className="text-3xl mb-4">{ind.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2">{ind.title}</h3>
                <p className="text-white/55 text-xs leading-relaxed">{ind.desc}</p>
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

'use client'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const PARTNERS = [
  { name: 'Microsoft',    img: 'microsoft-cloud-t.png' },
  { name: 'AWS',          img: 'amazon-authorized.png' },
  { name: 'Cisco',        img: 'Cisco.png' },
  { name: 'CompTIA',      img: 'comptia.png' },
  { name: 'Oracle',       img: 'o-prtnr-clr-rgb (1).png' },
  { name: 'SAP',          img: 'SAP.jpg' },
  { name: 'PMI',          img: 'PMI1115-ATP-Badge-2024-rgb.png' },
  { name: 'Red Hat',      img: 'Redvendorlogo.png' },
  { name: 'EC-Council',   img: 'EC-Council-logo.png' },
  { name: 'VMware',       img: 'VMware-Broadcom.png' },
  { name: 'PeopleCert',   img: 'PeopleCert.png' },
  { name: 'PECB',         img: 'Authorized PECB Certification Courses Training badge.png' },
  { name: 'Linux Foundation', img: 'Linux-Foundation.png' },
  { name: 'ISC2',         img: 'OTP-Preferred-Badge.png' },
  { name: 'ISACA',        img: null },
  { name: 'ISTQB',        img: 'ISTQB.png' },
]

const WHY_POINTS = [
  {
    icon: '✅',
    title: 'Verified Curriculum',
    desc: 'Vendor-authorized training means our courseware is reviewed and approved by the technology vendors themselves — you learn the real thing, not a third-party interpretation.',
  },
  {
    icon: '🎓',
    title: 'Certified Instructors',
    desc: 'Our trainers hold active certifications in the subjects they teach. Vendor authorization requires ongoing trainer assessment, so you always get a current, qualified expert.',
  },
  {
    icon: '🏅',
    title: 'Recognized Credentials',
    desc: 'Completing an authorized course carries weight with employers. The certifications earned through vendor-authorized training are the gold standard across the industry.',
  },
]

export default function OurPartnersPage() {
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
                Our <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Partners</span>
              </h1>
              <p className="text-xl text-white/80 mb-4 leading-relaxed">
                Koenig is an authorized training partner of the world's leading technology vendors. This isn't a badge we buy — it's an authorization we earn through rigorous assessment, certified instructors, and verified delivery.
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                When you train with Koenig, you train with the source — the same curricula, the same standards, the same recognition that the vendor itself demands.
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

      {/* LIGHT SECTION – Partner logo grid */}
      <section className="bg-white py-[50px]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3 text-center">Authorized by the World's <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Best</span></h2>
          <p className="text-center text-[#475569] mb-12">16+ vendor authorizations across cloud, security, networking, and beyond</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {PARTNERS.map(p => (
              <div key={p.name}
                className="kglass-light rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition-all min-h-[120px]">
                {p.img ? (
                  <div className="relative w-full h-14 flex items-center justify-center">
                    <Image
                      src={`/images/partners/${encodeURIComponent(p.img)}`}
                      alt={p.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-[#0694D1] flex items-center justify-center text-white font-black text-lg">
                    {p.name.slice(0, 3)}
                  </div>
                )}
                <span className="text-sm font-semibold text-[#0F172A] text-center">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK SECTION – Why authorization matters */}
      <section className="relative bg-[#06111E] py-[50px] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0694D1] opacity-[0.05] blur-[120px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">Why Authorization <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Matters</span></h2>
          <p className="text-center text-white/60 mb-12">The difference between authorized and unauthorized training is significant</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {WHY_POINTS.map(w => (
              <div key={w.title}
                className="kglass-dark rounded-2xl p-7 transition-all">
                <div className="text-3xl mb-4">{w.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{w.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="mailto:sales@koenig-solutions.com"
              className="inline-block bg-[#0694D1] hover:bg-[#0580bb] text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              Enquire About a Course
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const SUB_NAV = [
  { label: 'Overview',            href: '/about' },
  { label: 'Our Story',           href: '/about/our-story' },
  { label: 'Leadership',          href: '/about/leadership' },
  { label: 'Our Clients',         href: '/about/our-clients' },
  { label: 'Our Partners',        href: '/about/our-partners' },
  { label: 'Awards',              href: '/about/awards' },
  { label: 'Happiness Guarantee', href: '/about/happiness-guarantee' },
  { label: 'Student Feedback',    href: '/about/student-feedback' },
  { label: 'Koenig Koshish',      href: '/about/koenig-koshish' },
]

const VALUE_PROPS = [
  { icon: '🎓', title: 'Industry-Ready Workforce',     desc: 'Candidates trained to your stack — not generic textbook knowledge, but real production-grade skills.' },
  { icon: '📋', title: 'Customized Training Curriculum', desc: 'We build a bespoke curriculum around your technology environment, tools, and job requirements.' },
  { icon: '💸', title: 'Zero-Cost Training',           desc: 'Candidates undergo training at no cost to them. You only pay when you successfully hire.' },
  { icon: '⚡', title: 'Accelerated Onboarding',       desc: 'New hires hit the ground running — they arrive already certified and familiar with your tools.' },
  { icon: '📊', title: 'Outcome-Based Pricing',        desc: 'Pay only for what you get. No upfront cost, no risk — the model aligns our success with yours.' },
]

const PROCESS_STEPS = [
  { n: '1', title: 'Corporate Connect',    desc: 'We consult with your L&D or HR team to understand your technical requirements, culture, and hiring timeline.' },
  { n: '2', title: 'Campus Outreach',      desc: 'We screen candidates through a Skills Eligibility Test, selecting only those with the aptitude and drive.' },
  { n: '3', title: 'Training Delivery',    desc: 'Selected candidates are trained at our incubation centers — fully equipped, structured, and intensive.' },
  { n: '4', title: 'Assess and Certify',   desc: 'Hands-on lab assessments and vendor certification exams validate real-world competency.' },
  { n: '5', title: 'Placement Drive',      desc: 'We match top-performing candidates with your open roles, handling the entire matching process.' },
  { n: '6', title: 'Pay-For-Hire',         desc: 'You pay only after a successful placement. No hidden fees, no risk — pure outcome-based ROI.' },
]

const TESTIMONIALS_KOSHISH = [
  {
    name: 'Bunty Makhija',
    quote: '"The knowledge and skills I have acquired through Koenig Koshish\'s Cisco training have been truly transformative. I went from knowing very little about networking to being fully certified and employed within four months."',
  },
  {
    name: 'Student, BT Placement',
    quote: '"Being placed with BT after completing the program was beyond my expectations. The training prepared me for the actual job — not just the exam. I\'ve been with the company for two years now."',
  },
  {
    name: 'Student, Mr. Vikas Hangloo\'s Cohort',
    quote: '"Mr. Vikas Hangloo was an exceptional trainer. His real-world networking experience made every lesson relevant and engaging. The entire Koshish team made us feel supported every step of the way."',
  },
]

export default function KoenigKoshishPage() {
  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      {/* Sub-nav */}
      <div className="bg-[#06111E] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="flex gap-6 overflow-x-auto py-3 text-sm scrollbar-none">
            {SUB_NAV.map(n => (
              <Link key={n.href} href={n.href}
                className="whitespace-nowrap text-[#38bdf8] hover:text-white transition-colors font-medium">
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

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
            <span className="text-white/70">Koenig Koshish</span>
          </p>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
              Koenig <span className="text-[#38bdf8]">Koshish</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#38bdf8] mb-6">
              Better Talent. Lesser Cost.
            </h2>
            <p className="text-xl text-white/80 mb-4 leading-relaxed">
              The technology skills gap is real — companies struggle to find job-ready candidates, while graduates struggle to find work. Koenig Koshish bridges that gap with an outcome-based talent development model.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              We train. We certify. You hire. You pay only after a successful placement.
            </p>
          </div>
        </div>
      </section>

      {/* LIGHT SECTION – Value props */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3 text-center">Why Koenig Koshish?</h2>
          <p className="text-center text-[#475569] mb-12">A hiring model built around your outcomes, not our revenue</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {VALUE_PROPS.map(v => (
              <div key={v.title}
                className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#0694D1] hover:shadow-lg hover:shadow-[#0694D1]/10 transition-all text-center">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="text-sm font-bold text-[#0F172A] mb-2 group-hover:text-[#0694D1] transition-colors">{v.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK SECTION – Process */}
      <section className="relative bg-[#06111E] py-16 sm:py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0694D1] opacity-[0.05] blur-[120px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">The 6-Step Process</h2>
          <p className="text-center text-white/60 mb-12">From requirement to ready-to-hire — a structured, risk-free journey</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.n}
                className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:border-[#0694D1]/50 hover:bg-white/[0.07] transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#0694D1] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {s.n}
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="flex-1 border-t border-dashed border-white/20" />
                  )}
                </div>
                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHT SECTION – Testimonials */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3 text-center">Student Success Stories</h2>
          <p className="text-center text-[#475569] mb-12">From training bench to employment — in their own words</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS_KOSHISH.map(t => (
              <div key={t.name}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-7 hover:shadow-lg hover:border-[#0694D1]/30 transition-all">
                <div className="text-[#0694D1] text-3xl mb-4">"</div>
                <p className="text-[#475569] text-sm leading-relaxed mb-6 italic">{t.quote}</p>
                <div className="font-semibold text-[#0F172A] text-sm">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK SECTION – Contact callout */}
      <section className="relative bg-[#06111E] py-16 sm:py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0694D1] opacity-[0.05] blur-[100px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Build Your Tech Team?</h2>
            <p className="text-white/70 mb-8 text-lg leading-relaxed">
              Talk to Ravita Parwani, our Koenig Koshish Program Lead, to explore how we can source, train, and deliver industry-ready candidates for your organization.
            </p>
            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-7 mb-8 text-left">
              <div className="font-bold text-white text-lg mb-5">Ravita Parwani</div>
              <div className="space-y-3">
                <a href="mailto:Ravita.Parwani@koenig-solutions.com"
                  className="flex items-center gap-3 text-[#38bdf8] hover:text-white transition-colors">
                  <span className="text-white/50">✉</span>
                  <span className="text-sm">Ravita.Parwani@koenig-solutions.com</span>
                </a>
                <a href="tel:+918377858563"
                  className="flex items-center gap-3 text-[#38bdf8] hover:text-white transition-colors">
                  <span className="text-white/50">📞</span>
                  <span className="text-sm">+91 8377 858 563</span>
                </a>
              </div>
            </div>
            <a href="mailto:Ravita.Parwani@koenig-solutions.com"
              className="inline-block bg-[#0694D1] hover:bg-[#0580bb] text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              Get in Touch with Ravita
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const STEPS = [
  { n: '1', title: 'Attend Training',         desc: 'Join your scheduled course — live online or classroom.' },
  { n: '2', title: 'Share Feedback',           desc: 'Tell us during or right after the class what\'s not working.' },
  { n: '3', title: 'Issue Escalated',          desc: 'Your concern is flagged to the trainer and our support team immediately.' },
  { n: '4', title: 'Choose Your Resolution',   desc: 'Pick a full refund or a free class redo — your choice, no questions asked.' },
]

const PILLARS = [
  { icon: '📅', title: 'Guaranteed Batches',  desc: '99.1% on-time delivery. Courses start when scheduled — no last-minute cancellations.' },
  { icon: '🔄', title: 'Free Re-sit',         desc: 'Didn\'t pass? Re-enroll in the same course at zero additional cost.' },
  { icon: '👨‍🏫', title: 'Expert Trainers',   desc: '300+ certified, industry-veteran instructors with hands-on real-world experience.' },
  { icon: '📞', title: '24/7 Support',        desc: 'Our team is available around the clock to resolve any issues before, during, or after training.' },
]

export default function HappinessGuaranteePage() {
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
            <span className="text-white/70">Happiness Guarantee</span>
          </p>
          <div className="kglass-banner p-8 sm:p-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Learn with <span className="text-[#38bdf8]">Confidence:</span> Koenig Solutions' Happiness Guarantee
              </h1>
              <p className="text-xl text-white/70 leading-relaxed">
                Happiness is achieved when expectations are met. We set clear expectations and then we exceed them — every single time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHT SECTION – Core promise */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">We're Not Happy Until You Are</h2>
            <p className="text-[#475569] text-lg">If you're not satisfied, we make it right — guaranteed.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Refund card */}
            <div className="kglass-light rounded-2xl p-8 text-center transition-all">
              <div className="text-5xl mb-4">🔄</div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Full Refund</h3>
              <p className="text-[#475569] leading-relaxed text-sm">
                Complete reimbursement of course fees. Excludes courseware and exam voucher costs where separately purchased.
              </p>
            </div>
            {/* Redo card */}
            <div className="kglass-light rounded-2xl p-8 text-center transition-all">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Free Class Redo</h3>
              <p className="text-[#475569] leading-relaxed text-sm">
                Re-enroll in the same course at no charge. Subject to batch availability — we'll find you the next suitable date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DARK SECTION – How it works */}
      <section className="relative bg-[#06111E] py-16 sm:py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0694D1] opacity-[0.05] blur-[120px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">How It Works</h2>
          <p className="text-center text-white/60 mb-12">A simple, transparent process — no hoops, no small print</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div key={s.n}
                className="relative kglass-dark rounded-2xl p-6 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0694D1] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 text-[#0694D1] text-lg">›</div>
                  )}
                </div>
                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHT SECTION – CEO message */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-12 text-center">A Personal Promise</h2>
          <div className="max-w-3xl mx-auto">
            <div className="kglass-light rounded-3xl p-8 sm:p-10 transition-all">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-black text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>
                  RA
                </div>
                <div>
                  <div className="text-xl font-bold text-[#0F172A]">Rohit Aggarwal</div>
                  <div className="text-[#0694D1] font-medium">Founder &amp; CEO, Koenig Solutions</div>
                </div>
              </div>
              <blockquote className="text-[#475569] text-lg leading-relaxed mb-6 border-l-4 border-[#0694D1] pl-6 italic">
                "I personally ensure that every student gets the quality training they paid for. If at any point you feel let down, reach out to me directly — I take this personally."
              </blockquote>
              <a href="mailto:rohit.a@koenig-solutions.com"
                className="inline-flex items-center gap-2 text-[#0694D1] font-semibold hover:underline">
                <span>✉</span>
                rohit.a@koenig-solutions.com
              </a>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center bg-[#F8FAFC] rounded-xl p-4">
                  <div className="text-xl font-bold text-[#0694D1]">5,000+</div>
                  <div className="text-xs text-[#64748B]">Courses</div>
                </div>
                <div className="text-center bg-[#F8FAFC] rounded-xl p-4">
                  <div className="text-xl font-bold text-[#0694D1]">300+</div>
                  <div className="text-xs text-[#64748B]">Expert Trainers</div>
                </div>
                <div className="text-center bg-[#F8FAFC] rounded-xl p-4">
                  <div className="text-xl font-bold text-[#0694D1]">Multiple</div>
                  <div className="text-xs text-[#64748B]">Formats</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DARK SECTION – 4 pillars */}
      <section className="relative bg-[#06111E] py-16 sm:py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0694D1] opacity-[0.05] blur-[100px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">The Four Pillars of Our Guarantee</h2>
          <p className="text-center text-white/60 mb-12">Every commitment is measurable, every promise is kept</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map(p => (
              <div key={p.title}
                className="kglass-dark rounded-2xl p-6 text-center transition-all">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-white font-bold mb-3">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

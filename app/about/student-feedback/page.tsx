'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const TESTIMONIALS = [
  {
    name: 'Ethan Monroe',
    country: 'USA',
    flag: '🇺🇸',
    course: 'AZ-305',
    stars: 5,
    text: 'Excellent course — the trainer had in-depth knowledge of every Azure scenario and was able to answer every question with real-world examples. Would highly recommend Koenig to anyone preparing for architect-level exams.',
    trainer: null,
  },
  {
    name: 'Benjamin Parker',
    country: 'USA',
    flag: '🇺🇸',
    course: 'PL-500',
    stars: 5,
    text: 'Alok was an excellent trainer. His patience with every student and ability to break down complex Power Automate concepts made the whole course feel effortless. One of the best training experiences I\'ve had.',
    trainer: 'Alok',
  },
  {
    name: 'Kacper Nowak',
    country: 'Poland',
    flag: '🇵🇱',
    course: 'MS-700',
    stars: 5,
    text: '10/10. We were making fast progress through the material without ever feeling rushed. The trainer explained every Teams administration concept clearly. The lab exercises were perfectly matched to the exam objectives.',
    trainer: null,
  },
  {
    name: 'Marlon Beckford',
    country: 'Jamaica',
    flag: '🇯🇲',
    course: 'AWS Solutions Architect',
    stars: 5,
    text: 'Great guy, patient, and did well to keep the class engaged throughout. The AWS architecture content was comprehensive and the trainer linked every topic back to real production scenarios. Genuinely impressive.',
    trainer: null,
  },
  {
    name: 'Sizwe Mthethwa',
    country: 'South Africa',
    flag: '🇿🇦',
    course: 'PL-300',
    stars: 5,
    text: 'Rajat has a very good conversational style — he explains complex Power BI concepts in a way that sticks. The course content was well-structured and the labs were directly relevant to the certification exam.',
    trainer: 'Rajat',
  },
  {
    name: 'James Whitmore',
    country: 'UK',
    flag: '🇬🇧',
    course: 'Azure',
    stars: 5,
    text: 'The quality of instruction at Koenig is unmatched. I\'ve attended training with other providers and the depth of knowledge here is on a completely different level. Will be booking my next certification here without hesitation.',
    trainer: null,
  },
]

const RATINGS = [
  { platform: 'Google', rating: 4.4, out_of: 5, color: '#4285F4', icon: 'G' },
  { platform: 'Facebook', rating: 4.2, out_of: 5, color: '#1877F2', icon: 'f' },
]

const VIDEO_COUNTRIES = [
  'Tanzania', 'Oman', 'Saudi Arabia', 'Zambia', 'Iraq', 'Ghana', 'Angola', 'Kenya',
]

export default function StudentFeedbackPage() {
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
          <p className="text-[#38bdf8] text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-white/40">/</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/70">Student Feedback</span>
          </p>
          <div className="kglass-banner py-10 px-8 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Real Learners. <span className="text-[#38bdf8]">Real Stories.</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                5 million+ learners upskilled across 195 countries. These are their words — unfiltered, unedited, and from real post-course surveys.
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

      {/* LIGHT SECTION – Rating bars */}
      <section className="bg-white py-[60px]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3 text-center">Platform Ratings</h2>
          <p className="text-center text-[#475569] mb-12">Verified ratings from third-party review platforms</p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {RATINGS.map(r => (
              <div key={r.platform}
                className="kglass-light rounded-2xl p-8 text-center transition-all">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-black text-xl"
                  style={{ backgroundColor: r.color }}>
                  {r.icon}
                </div>
                <div className="text-4xl font-black text-[#0F172A] mb-1">{r.rating}</div>
                <div className="text-[#64748B] text-sm mb-3">out of {r.out_of}</div>
                <div className="flex justify-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-xl" style={{ color: i < Math.round(r.rating) ? '#F59E0B' : '#E2E8F0' }}>★</span>
                  ))}
                </div>
                <div className="text-sm font-semibold text-[#0F172A]">{r.platform}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK SECTION – Testimonials */}
      <section className="relative bg-[#06111E] py-[60px] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0694D1] opacity-[0.05] blur-[120px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">What Our Learners Say</h2>
          <p className="text-center text-white/60 mb-12">From post-course surveys — real feedback, unedited</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name}
                className="kglass-dark rounded-2xl p-6 transition-all flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#0694D1] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.flag} {t.name}</div>
                    <div className="text-white/50 text-xs">{t.country} · {t.course}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-[#F59E0B] text-sm">★</span>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.text}"</p>
                {t.trainer && (
                  <div className="mt-4 pt-4 border-t border-white/10 text-[#38bdf8] text-xs">
                    Trainer: {t.trainer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHT SECTION – Video testimonials note */}
      <section className="bg-[#F8FAFC] py-[60px]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl mb-5">🎬</div>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Video Testimonials</h2>
            <p className="text-[#475569] text-lg leading-relaxed mb-6">
              Learners from around the world share their Koenig experience on camera. Our video testimonials come from students in:
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {VIDEO_COUNTRIES.map(c => (
                <span key={c}
                  className="bg-white border border-[#E2E8F0] text-[#0F172A] px-4 py-2 rounded-full text-sm font-medium">
                  {c}
                </span>
              ))}
            </div>
            <p className="text-[#64748B] text-sm">
              Watch unscripted testimonials on our YouTube channel — genuine stories from real students, no marketing polish.
            </p>
          </div>
        </div>
      </section>

      {/* DARK SECTION – CTA */}
      <section className="bg-[#06111E] py-[60px] text-center">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Join 5M+ Learners</h2>
          <p className="text-white/70 mb-8 text-lg">Write your own success story with Koenig.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:sales@koenig-solutions.com"
              className="inline-block bg-[#0694D1] hover:bg-[#0580bb] text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              Start Learning Today
            </a>
            <Link href="/about/happiness-guarantee"
              className="inline-block border border-[#0694D1] text-[#38bdf8] hover:bg-[#0694D1] hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              Our Happiness Guarantee
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

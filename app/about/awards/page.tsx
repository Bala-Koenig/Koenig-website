import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

/* ─── Award data ─────────────────────────────────────────────── */

const BRAND = {
  color: '#0694D1',
  gradFrom: '#0694D1',
  gradTo: '#38bdf8',
  cardBg: '#EBF5FF',
  cardBorder: 'rgba(6,148,209,0.18)',
  shadow: 'rgba(6,148,209,0.10)',
}

const VENDOR_SECTIONS = [
  {
    name: 'Microsoft',
    ...BRAND,
    awards: [
      {
        img: 'MS-Partner-of-the-year-2025-popup.webp',
        title: 'Global Winner — Microsoft Training Services Partner of the Year',
        desc: 'Koenig Solutions has been named the winner of Microsoft\'s 2025 Training Services Partner of the Year Award — a global recognition for outstanding training delivery, certified instructor quality, and exceptional student outcomes across the Microsoft technology portfolio.',
        year: '2025',
      },
      {
        img: 'Microsoft-FY2024-Superstar-Award.webp',
        title: 'Winner of Microsoft\'s FY24 ANZ Superstar Campaign',
        desc: 'Koenig Solutions was recognised as the winner of Microsoft\'s FY2024 ANZ Superstar Campaign, acknowledging our exceptional performance and growth in training delivery across the Australia and New Zealand region.',
        year: 'FY2024',
      },
      {
        img: 'Microsoft-Superstar-Award-2022.webp',
        title: 'Winner of Microsoft\'s FY22 Asia Superstar Campaign',
        desc: 'Koenig Solutions was honoured as the winner of Microsoft\'s FY22 Asia Superstar Campaign, celebrating outstanding contribution to Microsoft learning and certification outcomes across the Asia region.',
        year: 'FY2022',
      },
    ],
  },
  {
    name: 'AWS',
    ...BRAND,
    awards: [
      {
        img: 'Finalist–AWS-Partner-of-the-Year-2024.webp',
        title: 'Finalist – AWS Partner of the Year',
        desc: 'Koenig Solutions was recognized as a Finalist for the AWS Partner of the Year Award in 2024, celebrating outstanding collaboration and impact. This honor highlights Koenig\'s commitment to cloud innovation, customer success, and advancing global digital skills through AWS-aligned training.',
        year: '2024',
      },
      {
        img: 'award-commitment.webp',
        title: 'Winner of AWS High Standards Commitment Award',
        desc: 'Koenig Solutions was honored with the AWS High Standards Commitment Award, recognizing its relentless pursuit of excellence. This accolade underscores Koenig\'s commitment to delivering high-quality products, services, and processes, ensuring that customer expectations are consistently exceeded.',
        year: '2023',
      },
      {
        img: 'award-aug-2022.webp',
        title: 'Winner of AWS Customer Obsession Award',
        desc: 'In August 2022, Koenig Solutions received the AWS Customer Obsession Award, highlighting the company\'s dedication to understanding and addressing customer needs. This award reflects Koenig\'s unwavering focus on delivering tailored solutions that enhance customer experiences.',
        year: '2022',
      },
    ],
  },
  {
    name: 'EC-Council',
    ...BRAND,
    awards: [
      {
        img: 'Winner-of-EC-Council-ATC-of-the-Year-Award-2024.webp',
        title: 'Winner of EC-Council ATC of the Year Award',
        desc: 'Koenig Solutions was honoured as the EC-Council Authorized Training Centre (ATC) of the Year for 2024, recognizing outstanding delivery of cybersecurity certifications including CEH, CHFI, and CPENT.',
        year: '2024',
      },
      {
        img: 'award-ec-2023.webp',
        title: 'Winner of EC-Council Global ATC of the Year Award',
        desc: 'Koenig Solutions received the EC-Council Global ATC of the Year Award for 2023, acknowledging its outstanding contribution to creating a skilled cybersecurity workforce worldwide.',
        year: '2023',
      },
      {
        img: 'award-excellence-2022.webp',
        title: 'EC-Council ATC Circle of Excellence',
        desc: 'Koenig Solutions was inducted into the EC-Council ATC Circle of Excellence for 2022, recognizing its outstanding contribution to delivering high-quality cybersecurity certification training worldwide.',
        year: '2022',
      },
    ],
  },
  {
    name: 'PECB',
    ...BRAND,
    awards: [
      {
        img: 'Winner-of-the-PECB-Titanium-Partner-Award-2024.webp',
        title: 'PECB Titanium Partner of the Year',
        desc: 'Koenig Solutions was recognised by PECB as the Titanium Partner of the Year for 2024 — the highest tier of partnership distinction — acknowledging exceptional commitment to delivering PECB certification programmes globally.',
        year: '2024',
      },
      {
        img: 'award-pecb-2023.webp',
        title: 'PECB Insights Conference Recognition',
        desc: 'Koenig Solutions was honoured at the PECB Insights Conference 2023 for its outstanding partnership and contribution to professional certification training in information security and management standards.',
        year: '2023',
      },
    ],
  },
  {
    name: 'Red Hat',
    ...BRAND,
    awards: [
      {
        img: 'RED-25.png',
        title: 'Red Hat Training Partner Award',
        desc: 'Koenig Solutions was recognised by Red Hat for outstanding performance and excellence in delivering Red Hat training and certification programmes, demonstrating a sustained commitment to open-source technology education in 2025.',
        year: '2025',
      },
      {
        img: 'RED-24.png',
        title: 'Red Hat Training Partner Award',
        desc: 'Koenig Solutions was honoured by Red Hat in 2024 for its exceptional contribution to growing the Red Hat certified professional community, reflecting a high standard of training delivery across enterprise Linux, OpenShift, and Ansible.',
        year: '2024',
      },
      {
        img: 'Redhat-23.png',
        title: 'Red Hat Training Partner Award',
        desc: 'Koenig Solutions received recognition from Red Hat in 2023 for its dedication to delivering world-class Red Hat training, enabling IT professionals to master enterprise open-source technologies and achieve certification success.',
        year: '2023',
      },
    ],
  },
]

const SINGLE_AWARDS = [
  {
    vendor: 'Oracle',
    ...BRAND,
    img: 'award-oracle.webp',
    title: 'Winner of the Oracle Award',
    desc: 'Koenig Solutions was honored with the Oracle Award, recognizing its outstanding performance in delivering Oracle training programs. This accolade underscores Koenig\'s expertise in Oracle technologies and its role in empowering professionals with essential skills for the evolving IT industry.',
    year: '2023',
  },
  {
    vendor: 'Great Place to Work',
    ...BRAND,
    img: 'Certified-as-great-place-to-work.webp',
    title: 'Certified as a Great Place to Work',
    desc: 'Koenig Solutions has been consistently certified as a Great Place to Work from 2011 to 2027. This prestigious certification recognizes the organization\'s commitment to fostering a positive, inclusive, and empowering work culture, where employees thrive and contribute to meaningful success.',
    year: '2011 – 2027',
  },
]

/* ─── Page ───────────────────────────────────────────────────── */

export default function AwardsPage() {
  return (
    <div className="about-page" style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />
      <AboutSubNav />

      {/* DARK HERO */}
      <section className="relative bg-[#06111E] overflow-hidden py-5 sm:py-[50px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#0694D1] opacity-[0.07] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.05] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="kglass-banner py-7 px-4 sm:py-10 sm:px-8 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h1 className="text-[26px] sm:text-[36px] font-bold text-white leading-tight mb-4 sm:mb-6">
                  Awards &amp; <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Achievements</span>
                </h1>
                <p className="text-sm sm:text-base text-white/80 mb-3 sm:mb-4 leading-relaxed">
                  Recognized by the world's leading technology vendors and workplace authorities since 1993. Our awards reflect one thing: consistently excellent training outcomes.
                </p>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  These aren't participation trophies — every award here was earned through measurable results, verified by the vendors themselves.
                </p>
              </div>
              <div className="kglass-dark rounded-2xl p-5 sm:p-6">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2.5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                    <span className="text-[38px] sm:text-[44px] font-bold leading-none" style={{ color: '#38bdf8' }}>16</span>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 mt-1 flex-shrink-0">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <p className="text-white/60 text-[13px] mb-4">Global Awards &amp; Recognitions</p>
                <div className="border-t mb-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                <div className="flex flex-wrap gap-2">
                  {['Microsoft', 'AWS', 'Cisco', 'CompTIA', 'EC-Council', 'PMI', 'Oracle', 'Red Hat'].map(v => (
                    <span key={v} className="text-[11px] font-medium text-white/75 px-2.5 py-1 rounded-full"
                      style={{ border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.05)' }}>
                      {v}
                    </span>
                  ))}
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ border: '1px solid rgba(56,189,248,0.35)', background: 'rgba(56,189,248,0.12)', color: '#38bdf8' }}>
                    +42 more
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALL AWARDS */}
      <section className="relative py-10 sm:py-[60px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #ddf1fb 30%, #ffffff 60%, #c8eaf8 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full opacity-30 blur-[100px]" style={{ background: 'radial-gradient(circle, #BAE6FD, transparent 70%)' }} />
          <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full opacity-25 blur-[90px]" style={{ background: 'radial-gradient(circle, #7DD3FA, transparent 70%)' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] space-y-14 sm:space-y-20">

          {/* Vendor sections with 3-col grids */}
          {VENDOR_SECTIONS.map(vendor => (
            <div key={vendor.name}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: `linear-gradient(180deg, ${vendor.gradFrom}, ${vendor.gradTo})` }} />
                <h2 className="text-xl sm:text-[24px] font-bold text-[#0F172A]">
                  {vendor.name}{' '}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${vendor.gradFrom}, ${vendor.gradTo})` }}>
                    Awards
                  </span>
                </h2>
                <span className="ml-1 text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                  style={{ background: `linear-gradient(135deg, ${vendor.gradFrom}, ${vendor.gradTo})` }}>
                  {vendor.awards.length}
                </span>
              </div>

              {/* Cards grid */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${vendor.awards.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-4 sm:gap-5`}>
                {vendor.awards.map(award => (
                  <div
                    key={award.title}
                    className="bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
                    style={{
                      border: `1px solid ${vendor.cardBorder}`,
                      boxShadow: `0 2px 16px ${vendor.shadow}`,
                    }}
                  >
                    {/* Top accent */}
                    <div className="h-[3px] w-full flex-shrink-0" style={{ background: `linear-gradient(90deg, ${vendor.gradFrom}, ${vendor.gradTo})` }} />

                    {/* Image */}
                    <div className="flex items-center justify-center px-6 pt-6 pb-4">
                      <div className="w-full rounded-xl overflow-hidden flex items-center justify-center" style={{ height: '140px', background: vendor.cardBg, border: `1px solid ${vendor.cardBorder}` }}>
                        <img
                          src={`/images/awards/${encodeURIComponent(award.img)}`}
                          alt={award.title}
                          className="max-h-full max-w-full object-contain p-3"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-5 pb-4 flex flex-col flex-1">
                      <h3 className="font-bold text-[#0F172A] text-sm sm:text-[15px] leading-snug mb-2">{award.title}</h3>
                      <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed flex-1">{award.desc}</p>
                      <div className="mt-4 flex justify-end">
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                          style={{ background: `linear-gradient(135deg, ${vendor.gradFrom}, ${vendor.gradTo})` }}>
                          {award.year}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Single-award vendors — horizontal card */}
          <div>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(180deg, #0694D1, #38bdf8)' }} />
              <h2 className="text-xl sm:text-[24px] font-bold text-[#0F172A]">
                More <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Recognitions</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              {SINGLE_AWARDS.map(award => (
                <div
                  key={award.vendor}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:-translate-y-1"
                  style={{ border: `1px solid ${award.cardBorder}`, boxShadow: `0 2px 16px ${award.shadow}` }}
                >
                  <div className="hidden sm:block w-1 flex-shrink-0 rounded-l-2xl" style={{ background: `linear-gradient(180deg, ${award.gradFrom}, ${award.gradTo})` }} />
                  <div className="block sm:hidden h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${award.gradFrom}, ${award.gradTo})` }} />

                  {/* Image */}
                  <div className="flex items-center justify-center p-5 flex-shrink-0">
                    <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] rounded-xl overflow-hidden flex items-center justify-center"
                      style={{ background: award.cardBg, border: `1px solid ${award.cardBorder}` }}>
                      <img
                        src={`/images/awards/${encodeURIComponent(award.img)}`}
                        alt={award.title}
                        className="max-h-full max-w-full object-contain p-2"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center px-5 sm:px-4 pb-5 sm:py-5 flex-1">
                    <p className="text-xs font-semibold tracking-wider uppercase mb-1" style={{ color: award.color }}>{award.vendor}</p>
                    <h3 className="font-bold text-[#0F172A] text-sm sm:text-[15px] leading-snug mb-2">{award.title}</h3>
                    <p className="text-[#64748B] text-xs leading-relaxed mb-3">{award.desc}</p>
                    <span className="self-start text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                      style={{ background: `linear-gradient(135deg, ${award.gradFrom}, ${award.gradTo})` }}>
                      {award.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </section>
    </div>
  )
}

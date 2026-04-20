'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const CEO = {
  initials: 'RA',
  name: 'Rohit Aggarwal',
  title: 'CEO & Founder',
  linkedin: 'https://www.linkedin.com/in/rohit-aggarwal-ba3890/',
  // TODO: Replace with actual photo path e.g. /images/leadership/rohit-aggarwal.jpg
  image: null as string | null,
  bio: 'TODO: Add Rohit Aggarwal bio content from the live site.',
  tags: ['30+ Years Experience', 'Customer Obsession', 'I < O Philosophy'],
  about: [
    'Rohit Aggarwal founded Koenig Solutions in 1993 from a small office in Patel Nagar, Delhi. Over three decades he has led the company through three near-death crises — the Dotcom bust, the Oil price crash, and COVID-19 — emerging stronger each time.',
    'His guiding philosophy — I < O (Individual is less than Organisation) — is embedded in every team decision. He personally reviews student satisfaction scores and responds directly to unhappy learners.',
    'Under his leadership, Koenig has trained 5M+ professionals across 195 countries, earned 15 consecutive Great Place to Work certifications, and won global awards from Microsoft, AWS, EC-Council, PECB, and VMware.',
  ],
}

const TEAM = [
  {
    initials: 'SC',
    name: 'Subodh Choudhary',
    title: 'Group Manager, Alliances & Corporate Sales',
    color: '#0694D1',
    linkedin: 'https://www.linkedin.com/in/subodh-chaudhary-440b394b/',
    // TODO: Replace with actual photo path e.g. /images/leadership/subodh-choudhary.jpg
    image: null as string | null,
    bio: 'TODO: Add Subodh Choudhary bio content from the live site.',
  },
  {
    initials: 'SG',
    name: 'Sakshi Gaba Dhawan',
    title: 'Group Manager, HR, AR/AP & Pre-Sales',
    color: '#7c3aed',
    linkedin: 'https://www.linkedin.com/in/sakshigabadhawan/',
    // TODO: Replace with actual photo path e.g. /images/leadership/sakshi-gaba-dhawan.jpg
    image: null as string | null,
    bio: 'TODO: Add Sakshi Gaba Dhawan bio content from the live site.',
  },
  {
    initials: 'VA',
    name: 'Vardaan Aggarwal',
    title: 'Executive Director, Investments',
    color: '#059669',
    linkedin: 'https://www.linkedin.com/in/vardaan-aggarwal-309386174/',
    // TODO: Replace with actual photo path e.g. /images/leadership/vardaan-aggarwal.jpg
    image: null as string | null,
    bio: 'TODO: Add Vardaan Aggarwal bio content from the live site.',
  },
  {
    initials: 'AS',
    name: 'Aditya Sharma',
    title: 'Technical Lead, Automation',
    color: '#dc2626',
    linkedin: 'https://www.linkedin.com/in/aditya-sharma-22a7b784',
    // TODO: Replace with actual photo path e.g. /images/leadership/aditya-sharma.jpg
    image: null as string | null,
    bio: 'TODO: Add Aditya Sharma bio content from the live site.',
  },
  {
    initials: 'PK',
    name: 'Praveen Kumar',
    title: 'Finance Manager',
    color: '#d97706',
    linkedin: 'https://www.linkedin.com/in/praveen-chaudhary-47b9881b/',
    // TODO: Replace with actual photo path e.g. /images/leadership/praveen-kumar.jpg
    image: null as string | null,
    bio: 'TODO: Add Praveen Kumar bio content from the live site.',
  },
  {
    initials: 'RA',
    name: 'Raahil Aggarwal',
    title: 'Group Manager, AI, Koenig Koshish, Strategy & Brand',
    color: '#0891b2',
    linkedin: 'https://www.linkedin.com/in/raahil-aggarwal-7b5895187/',
    // TODO: Replace with actual photo path e.g. /images/leadership/raahil-aggarwal.jpg
    image: null as string | null,
    bio: 'TODO: Add Raahil Aggarwal bio content from the live site.',
  },
  {
    initials: 'KS',
    name: 'Kunal Singh',
    title: 'Regional Manager, Australia',
    color: '#16a34a',
    linkedin: 'https://www.linkedin.com/in/kunal-singh-0684b6255/',
    // TODO: Replace with actual photo path e.g. /images/leadership/kunal-singh.jpg
    image: null as string | null,
    bio: 'TODO: Add Kunal Singh bio content from the live site.',
  },
  {
    initials: 'NK',
    name: 'Nidhi Kumra Ahuja',
    title: 'Manager, HR & Freelancer Management',
    color: '#be185d',
    linkedin: 'https://www.linkedin.com/in/nidhikumra/',
    // TODO: Replace with actual photo path e.g. /images/leadership/nidhi-kumra-ahuja.jpg
    image: null as string | null,
    bio: 'TODO: Add Nidhi Kumra Ahuja bio content from the live site.',
  },
  {
    initials: 'RT',
    name: 'Rohit Tiwary',
    title: 'Asst. Manager, Brand & Digital Communications',
    color: '#7c3aed',
    linkedin: 'https://www.linkedin.com/in/rohit-tiwary-8958721a1/',
    // TODO: Replace with actual photo path e.g. /images/leadership/rohit-tiwary.jpg
    image: null as string | null,
    bio: 'TODO: Add Rohit Tiwary bio content from the live site.',
  },
  {
    initials: 'HT',
    name: 'Hardik Tike',
    title: 'Asst. Technical Manager',
    color: '#0694D1',
    linkedin: 'https://www.linkedin.com/in/hardik-tike-b89a08197/',
    // TODO: Replace with actual photo path e.g. /images/leadership/hardik-tike.jpg
    image: null as string | null,
    bio: 'TODO: Add Hardik Tike bio content from the live site.',
  },
  {
    initials: 'VJ',
    name: 'Vatan Vijay Joshi',
    title: 'Asst. Technical Manager',
    color: '#dc2626',
    linkedin: 'https://www.linkedin.com/in/vatanjoshi/',
    // TODO: Replace with actual photo path e.g. /images/leadership/vatan-vijay-joshi.jpg
    image: null as string | null,
    bio: 'TODO: Add Vatan Vijay Joshi bio content from the live site.',
  },
  {
    initials: 'MC',
    name: 'Manish Chaturvedi',
    title: 'Asst. Sales Manager',
    color: '#d97706',
    linkedin: 'https://www.linkedin.com/in/manishchaturvedii/',
    // TODO: Replace with actual photo path e.g. /images/leadership/manish-chaturvedi.jpg
    image: null as string | null,
    bio: 'TODO: Add Manish Chaturvedi bio content from the live site.',
  },
]

export default function LeadershipPage() {
  const [expandedBio, setExpandedBio] = useState<string | null>(null)
  const [ceoBioOpen, setCeoBioOpen] = useState(false)

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
          <div className="kglass-banner p-8 sm:p-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Leadership <span className="text-[#38bdf8]">Team</span>
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  The people behind 30 years of innovation, resilience, and customer obsession. Each leader brings deep domain expertise and a shared commitment to student outcomes.
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

      {/* LIGHT SECTION – CEO spotlight */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-12 text-center">Founder &amp; CEO</h2>
          <div className="max-w-4xl mx-auto">
            <div className="kglass-light rounded-3xl p-8 sm:p-12 transition-all">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

                {/* Image / Avatar placeholder */}
                <div className="flex-shrink-0">
                  {CEO.image ? (
                    /* TODO: replace null with actual image path to activate */
                    <img
                      src={CEO.image}
                      alt={CEO.name}
                      className="w-28 h-28 rounded-full object-cover shadow-lg"
                    />
                  ) : (
                    /* Image placeholder — set CEO.image to the real photo path to replace */
                    <div
                      className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}
                      title="Image placeholder — update CEO.image with actual photo path">
                      {CEO.initials}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-1">{CEO.name}</h3>
                  <p className="text-[#0694D1] font-semibold text-lg mb-4">{CEO.title}</p>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-6">
                    {CEO.tags.map(tag => (
                      <span key={tag} className="bg-[#EFF6FF] text-[#0694D1] px-3 py-1 rounded-full text-sm font-medium">{tag}</span>
                    ))}
                  </div>
                  {CEO.about.map((para, i) => (
                    <p key={i} className="text-[#475569] leading-relaxed mb-4">{para}</p>
                  ))}

                  {/* View Bio toggle */}
                  <button
                    onClick={() => setCeoBioOpen(o => !o)}
                    className="mt-2 text-[#0694D1] font-semibold text-sm hover:text-[#0580bb] transition-colors flex items-center gap-1">
                    {ceoBioOpen ? 'Hide Bio −' : 'View Bio +'}
                  </button>
                  {ceoBioOpen && (
                    <div className="mt-4 p-4 bg-[#F0F9FF] rounded-xl border border-[#BAE6FD]">
                      <p className="text-[#475569] text-sm leading-relaxed">{CEO.bio}</p>
                    </div>
                  )}

                  {/* LinkedIn */}
                  <a
                    href={CEO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-5 text-[#0694D1] font-medium text-sm hover:text-[#0580bb] transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn Profile
                  </a>
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
              <div key={m.name} className="kglass-dark rounded-2xl p-5 transition-all group flex flex-col">

                <div className="flex items-center gap-4 mb-4">
                  {/* Image / Avatar placeholder */}
                  {m.image ? (
                    /* TODO: set m.image to the real photo path to activate */
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    /* Image placeholder — set image field to actual photo path to replace */
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: m.color }}
                      title={`Image placeholder — update image field for ${m.name}`}>
                      {m.initials}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="font-semibold text-white text-sm group-hover:text-[#38bdf8] transition-colors leading-snug">{m.name}</div>
                  </div>
                </div>

                <p className="text-white/50 text-xs leading-relaxed mb-4">{m.title}</p>

                <div className="mt-auto flex items-center justify-between">
                  {/* View Bio toggle */}
                  <button
                    onClick={() => setExpandedBio(expandedBio === m.name ? null : m.name)}
                    className="text-[#38bdf8] text-xs font-semibold hover:text-white transition-colors">
                    {expandedBio === m.name ? 'Hide Bio −' : 'View Bio +'}
                  </button>

                  {/* LinkedIn icon */}
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-[#38bdf8] transition-colors"
                    aria-label={`${m.name} LinkedIn`}>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>

                {/* Expanded bio */}
                {expandedBio === m.name && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-white/60 text-xs leading-relaxed">{m.bio}</p>
                  </div>
                )}

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
            We&#39;re always looking for passionate educators, tech experts, and business professionals to help us grow.
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

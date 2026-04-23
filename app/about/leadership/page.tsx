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
  image: '/images/leadership/CEO.png' as string | null,
  bio: 'Rohit Aggarwal has over 30 years of experience in the training industry. He is a strong proponent of customer obsession and constant innovation. Under his stewardship, Koenig has grown from a small training center in New Delhi to a respected industry player in the training space. He is an avid reader, yoga enthusiast, and loves spending his free time playing with his golden retriever, Leo.',
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
    title: 'Group Manager Alliances & Corporate Sales',
    color: '#0694D1',
    linkedin: 'https://www.linkedin.com/in/subodh-chaudhary-440b394b/',
    image: '/images/leadership/subodh-choudhary.png' as string | null,
    bio: 'Subodh is a management graduate having over 20 years of experience in Training industry. He is a strong believer of empowering people through skilling. He manages the OEM relationship & key account management. Subodh is a sport enthusiast & love to spend his free time on his farm house with his parents & Blue (Siberian Husky).',
  },
  {
    initials: 'SG',
    name: 'Sakshi Gaba Dhawan',
    title: 'Group Manager (HR. AR/AP & Pre-Sales)',
    color: '#7c3aed',
    linkedin: 'https://www.linkedin.com/in/sakshigabadhawan/',
    image: '/images/leadership/sakshi.png' as string | null,
    bio: 'Sakshi Gaba Dhawan, our Head of HR, leverages 18+ years of experience, 11+ of which have been dedicated to Koenig. Starting in HR, Sakshi now adeptly manages Accounts Payable and Receivables, along with leading initiatives in lead generation and freelancer management. Beyond the corporate realm, she finds balance in exercising and travelling with her family.',
  },
  {
    initials: 'VA',
    name: 'Vardaan Aggarwal',
    title: 'Executive Director (Investments)',
    color: '#059669',
    linkedin: 'https://www.linkedin.com/in/vardaan-aggarwal-309386174/',
    image: '/images/leadership/verdan-aggarwal.png' as string | null,
    bio: 'Vardaan Aggarwal has 7+ years of experience. He plays a key role in managing corporate finance, digital marketing and strategic investments. He oversees Koenig\'s global expansion and has been instrumental in setting up Koenig\'s new facilities and infrastructure overseas. Apart from his work responsibilities, Vardaan spends his time researching about the stock market and playing tennis.',
  },
  {
    initials: 'AS',
    name: 'Aditya Sharma',
    title: 'Technical Lead (Automation)',
    color: '#dc2626',
    linkedin: 'https://www.linkedin.com/in/aditya-sharma-22a7b784',
    image: '/images/leadership/aditya-sharma.webp' as string | null,
    bio: 'Aditya has over a decade\'s expertise in tech automation. Always up for a challenge, he excels in driving innovation and solving complex problems. He has been instrumental in creating and executing technical frameworks and standards, guiding his team through technical challenges. A devoted programmer, Aditya is always exploring new technologies, ensuring his team remains at the forefront of industry advancements.',
  },
  {
    initials: 'PK',
    name: 'Praveen Kumar',
    title: 'Finance Manager',
    color: '#d97706',
    linkedin: 'https://www.linkedin.com/in/praveen-chaudhary-47b9881b/',
    image: '/images/leadership/praveen-new-image.webp' as string | null,
    bio: 'Praveen Chaudhary with a wealth of experience exceeding 22 years in the fields of Accounts & Finance. He is known for his strong capabilities in team management, tax planning, and achieving financial goals, He has been instrumental in overseeing the successful execution of tasks. He is passionate about personal well-being, actively engaging in activities like Gym and Yoga, reflecting his commitment to a balanced and healthy lifestyle. He indulges in a different form of self-expression - singing Indian melody songs.',
  },
  {
    initials: 'RA',
    name: 'Raahil Aggarwal',
    title: 'Group Manager (AI, Koenig Koshish, Strategy and Brand)',
    color: '#0891b2',
    linkedin: 'https://www.linkedin.com/in/raahil-aggarwal-7b5895187/',
    image: '/images/leadership/raahil_new.png' as string | null,
    bio: 'Raahil Aggarwal is the youngest member of the leadership team. A graduate of Babson College (MA), he oversees branding, AI integration, and corporate strategy, while also leading Koenig Koshish, the company\'s social impact initiative. Passionate about leveraging technology and storytelling to elevate the brand, Raahil is committed to pushing boundaries in the training industry. An avid golfer, he finds balance on the course, where strategy and precision mirror his professional approach.',
  },
  {
    initials: 'KS',
    name: 'Kunal Singh',
    title: 'Regional Manager (Australia)',
    color: '#16a34a',
    linkedin: 'https://www.linkedin.com/in/kunal-singh-0684b6255/',
    image: '/images/leadership/kunal.webp' as string | null,
    bio: 'Kunal Sibbal is a Science graduate with over 10+ years of experience in the IT training industry. He has extensive experience in IT Sales and client management with a primary focus on driving cloud enablement and end-user adoption. He is involved in business activities like client interaction, business research, and delivery management. Apart from his professional work, Kunal is an active member of MBLA (My Best Life Australia) Charitable Group which provides shelter to homeless people.',
  },
  {
    initials: 'NK',
    name: 'Nidhi Kumra Ahuja',
    title: 'Manager, HR & Freelancer Management',
    color: '#be185d',
    linkedin: 'https://www.linkedin.com/in/nidhikumra/',
    image: '/images/leadership/Leadership_Nidhi.webp' as string | null,
    bio: 'TODO: Add Nidhi Kumra Ahuja bio content from the live site.',
  },
  {
    initials: 'RT',
    name: 'Rohit Tiwary',
    title: 'Asst. Manager, Brand & Digital Communications',
    color: '#7c3aed',
    linkedin: 'https://www.linkedin.com/in/rohit-tiwary-8958721a1/',
    image: '/images/leadership/Leadership_RohitTiwari.webp' as string | null,
    bio: 'TODO: Add Rohit Tiwary bio content from the live site.',
  },
  {
    initials: 'HT',
    name: 'Hardik Tike',
    title: 'Asst. Technical Manager',
    color: '#0694D1',
    linkedin: 'https://www.linkedin.com/in/hardik-tike-b89a08197/',
    image: '/images/leadership/Leadership_Hardik-Tike.webp' as string | null,
    bio: 'TODO: Add Hardik Tike bio content from the live site.',
  },
  {
    initials: 'VJ',
    name: 'Vatan Vijay Joshi',
    title: 'Asst. Technical Manager',
    color: '#dc2626',
    linkedin: 'https://www.linkedin.com/in/vatanjoshi/',
    image: '/images/leadership/Leadership_Vatan-Vijay-Joshi.webp' as string | null,
    bio: 'TODO: Add Vatan Vijay Joshi bio content from the live site.',
  },
  {
    initials: 'MC',
    name: 'Manish Chaturvedi',
    title: 'Asst. Sales Manager',
    color: '#d97706',
    linkedin: 'https://www.linkedin.com/in/manishchaturvedii/',
    image: '/images/leadership/Leadership_Manish.webp' as string | null,
    bio: 'TODO: Add Manish Chaturvedi bio content from the live site.',
  },
]

const EXECUTIVE_TEAM = [
  {
    initials: 'NK',
    name: 'Nidhi Kumra Ahuja',
    title: 'Manager - HR & Freelancer Management (FM)',
    linkedin: 'https://www.linkedin.com/in/nidhikumra/',
    image: '/images/leadership/Leadership_Nidhi.webp' as string | null,
    bio: 'TODO: Add Nidhi Kumra Ahuja bio content from the live site.',
  },
  {
    initials: 'RT',
    name: 'Rohit Tiwary',
    title: 'Assistant Manager - Brand & Digital Communications',
    linkedin: 'https://www.linkedin.com/in/rohit-tiwary-8958721a1/',
    image: '/images/leadership/Leadership_RohitTiwari.webp' as string | null,
    bio: 'TODO: Add Rohit Tiwary bio content from the live site.',
  },
  {
    initials: 'HT',
    name: 'Hardik Tike',
    title: 'Assistant Technical Manager',
    linkedin: 'https://www.linkedin.com/in/hardik-tike-b89a08197/',
    image: '/images/leadership/Leadership_Hardik-Tike.webp' as string | null,
    bio: 'TODO: Add Hardik Tike bio content from the live site.',
  },
  {
    initials: 'VJ',
    name: 'Vatan Vijay Joshi',
    title: 'Assistant Technical Manager',
    linkedin: 'https://www.linkedin.com/in/vatanjoshi/',
    image: '/images/leadership/Leadership_Vatan-Vijay-Joshi.webp' as string | null,
    bio: 'TODO: Add Vatan Vijay Joshi bio content from the live site.',
  },
  {
    initials: 'MC',
    name: 'Manish Chaturvedi',
    title: 'Assistant Sales Manager',
    linkedin: 'https://www.linkedin.com/in/manishchaturvedii/',
    image: '/images/leadership/Leadership_Manish.webp' as string | null,
    bio: 'TODO: Add Manish Chaturvedi bio content from the live site.',
  },
]

type BioMember = {
  name: string
  title: string
  initials: string
  color: string
  image: string | null
  bio: string
  linkedin: string
}

export default function LeadershipPage() {
  const [bioModal, setBioModal] = useState<BioMember | null>(null)
  const [activeTab, setActiveTab] = useState<'koenig' | 'executive'>('koenig')

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

      {/* TABS */}
      <section className="bg-white py-8 border-b border-[#E2EEF9]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] flex justify-center">
          <div className="inline-flex overflow-hidden rounded-2xl border border-[#0694D1]/20 bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]">
            <button
              onClick={() => setActiveTab('koenig')}
              className={`relative flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'koenig'
                  ? 'bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}>
              Koenig Leadership
            </button>
            <button
              onClick={() => setActiveTab('executive')}
              className={`relative flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'executive'
                  ? 'bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}>
              Executive Leadership
            </button>
          </div>
        </div>
      </section>

      {/* KOENIG LEADERSHIP TAB — CEO + Team grid */}
      {activeTab === 'koenig' && (<>

      {/* CEO spotlight */}
      <section className="bg-white py-[60px]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="max-w-4xl mx-auto">
            <div className="kglass-light rounded-3xl py-10 px-8 sm:px-12 transition-all">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

                {/* Image / Avatar placeholder */}
                <div className="flex-shrink-0">
                  {CEO.image ? (
                    /* TODO: replace null with actual image path to activate */
                    <img
                      src={CEO.image}
                      alt={CEO.name}
                      className="w-48 h-48 rounded-2xl object-cover object-top shadow-lg"
                    />
                  ) : (
                    /* Image placeholder — set CEO.image to the real photo path to replace */
                    <div
                      className="w-36 h-36 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #0694D133, #38bdf822)', border: '2px dashed #0694D155' }}
                      title="Image placeholder — update CEO.image with actual photo path">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black text-white"
                        style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>
                        {CEO.initials}
                      </div>
                      <span className="text-[#0694D1]/60 text-[10px] tracking-wide uppercase">Photo placeholder</span>
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
                  <p className="text-[#475569] leading-relaxed mb-4">{CEO.bio}</p>

                  {/* LinkedIn */}
                  <a
                    href={CEO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-[#0694D1] font-medium text-sm hover:text-[#0580bb] transition-colors">
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

      {/* Team grid — below CEO */}
      <section className="relative py-[60px] overflow-hidden" style={{ background: 'linear-gradient(160deg, #06111E 0%, #0a1f35 40%, #06111E 100%)' }}>
        {/* Background glow effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0694D1] opacity-[0.08] blur-[130px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#0694D1] opacity-[0.05] blur-[100px] rounded-full" />
          <div className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-[#38bdf8] opacity-[0.04] blur-[110px] rounded-full" />
          {/* Subtle blue gradient line across top */}
          <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #0694D1, #38bdf8, #0694D1, transparent)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">Senior Leadership</h2>
          <p className="text-center text-white/60 mb-12">The experts driving global operations, growth, and innovation</p>
          <div className="flex flex-wrap justify-center gap-5">
            {TEAM.slice(0, 7).map(m => (
              <div key={m.name} className="kglass-dark rounded-2xl overflow-hidden flex flex-col transition-all group w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]">

                {/* ── Photo / Image placeholder (top) ── */}
                {m.image ? (
                  /* TODO: set m.image to real photo path to activate */
                  <img src={m.image} alt={m.name} className="w-full h-52 object-cover object-top flex-shrink-0" />
                ) : (
                  /* Image placeholder — set image field to actual photo path to replace */
                  <div className="w-full h-52 flex flex-col items-center justify-center flex-shrink-0 border-b border-white/10">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-lg mb-3"
                      style={{ backgroundColor: m.color }}>
                      {m.initials}
                    </div>
                    <span className="text-white/25 text-[10px] tracking-widest uppercase">Photo placeholder</span>
                  </div>
                )}

                {/* ── Name, designation, actions (bottom) ── */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="font-semibold text-white text-sm group-hover:text-[#38bdf8] transition-colors leading-snug mb-1">
                    {m.name}
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed mb-4">{m.title}</p>

                  <div className="mt-auto flex items-center justify-between">
                    {/* View Bio — opens modal */}
                    <button
                      onClick={() => setBioModal(m)}
                      className="text-[#38bdf8] text-xs font-semibold hover:text-white transition-colors cursor-pointer">
                      View Bio +
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
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      </>)}

      {/* EXECUTIVE LEADERSHIP TAB */}
      {activeTab === 'executive' && (
        <section className="relative bg-[#06111E] py-[60px] overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0694D1] opacity-[0.05] blur-[120px] rounded-full" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">

            {/* Intro text */}
            <p className="font-bold text-white text-base leading-snug mb-10">
              Koenig&#39;s Leadership team consists of Industry veterans who have a passion for educational innovation and customers.
            </p>

            {/* Card grid */}
            <div className="flex flex-wrap justify-center gap-6">
              {EXECUTIVE_TEAM.map(m => (
                <div key={m.name} className="w-full sm:w-[calc(33.333%-1rem)] bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(6,148,209,0.10)] border border-gray-100 flex flex-col">

                  {/* Photo area — dark teal bg */}
                  <div className="w-full h-52 bg-[#0a3d5c] flex items-end justify-center overflow-hidden flex-shrink-0">
                    {m.image ? (
                      <img src={m.image} alt={m.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      /* Image placeholder — set image field to actual photo path to replace */
                      <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                        <div className="w-20 h-20 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center text-white text-2xl font-black">
                          {m.initials}
                        </div>
                        <span className="text-white/30 text-[10px] tracking-widest uppercase pb-4">Photo placeholder</span>
                      </div>
                    )}
                  </div>

                  {/* Name, title, LinkedIn */}
                  <div className="px-5 pt-5 pb-4 text-center flex flex-col items-center gap-2 flex-1">
                    <h3 className="font-bold text-[#0F172A] text-base leading-snug">{m.name}</h3>
                    <p className="text-[#64748B] text-sm leading-snug">{m.title}</p>
                    {/* LinkedIn icon */}
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} LinkedIn`}
                      className="mt-1">
                      <div className="w-8 h-8 rounded-lg bg-[#0694D1] flex items-center justify-center shadow-sm hover:bg-[#0580bb] transition-colors">
                        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                    </a>
                  </div>

                  {/* View Bio — full-width bottom strip */}
                  <div className="border-t border-[#E2EEF9] px-5 py-3 text-center">
                    <button
                      onClick={() => setBioModal({ ...m, color: '#0694D1' })}
                      className="text-[#0694D1] text-sm font-medium hover:text-[#0580bb] transition-colors w-full cursor-pointer">
                      View Bio +
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* LIGHT SECTION – Join CTA */}
      <section className="bg-[#F8FAFC] py-[60px] text-center">
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

      {/* BIO MODAL */}
      {bioModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(6,17,30,0.88)', backdropFilter: 'blur(8px)' }}
          onClick={() => setBioModal(null)}>
          <div
            className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: '#0D1F30', border: '1px solid rgba(56,189,248,0.15)' }}
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">{bioModal.name}</h3>
              <button
                onClick={() => setBioModal(null)}
                className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white transition-colors text-2xl leading-none"
                aria-label="Close">
                ×
              </button>
            </div>

            {/* Body */}
            <div className="flex items-start gap-6 p-6">

              {/* Circular photo with teal ring glow */}
              <div className="flex-shrink-0">
                <div
                  className="w-28 h-28 rounded-full overflow-hidden"
                  style={{ boxShadow: '0 0 0 3px #0694D1, 0 0 20px rgba(6,148,209,0.35)' }}>
                  {bioModal.image ? (
                    <img src={bioModal.image} alt={bioModal.name} className="w-full h-full object-cover object-left object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-black text-white" style={{ backgroundColor: bioModal.color }}>
                      {bioModal.initials}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1 min-w-0">
                <p className="text-[#38bdf8] text-sm font-semibold mb-3">{bioModal.title}</p>
                <p className="text-white/70 text-sm leading-relaxed mb-5">{bioModal.bio}</p>
                <a
                  href={bioModal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#38bdf8] text-sm font-semibold hover:text-white transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  View LinkedIn Profile
                </a>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  )
}

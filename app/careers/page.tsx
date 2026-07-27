'use client'
import { useState, useMemo, useRef, useEffect } from 'react'
import {
  Home, Check, ListChecks, Quote,
  Search, Briefcase, Award, Mail, Upload, X,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import SiteFooter from '@/components/SiteFooter'

const EMPLOYEE_TESTIMONIALS = [
  {
    name: 'Saurabh Banerjee', role: 'CSM+',
    quote: 'It was a wonderful journey. A place where I can "learn and earn" at the same time. I remember the days when I joined Koenig back in 2020 March. It was the start of the Covid-19 pandemic, lockdown, and curfew. While most of the companies were doing a mass lay-off and LinkedIn was filled with stories of lost jobs and lay-offs. Koenig gave me a platform to learn continuously with a stable job. I would also like to thank "Dan", my reporting manager who has guided me throughout the last 2 years and has always corrected me wherever I was wrong, and has supported me throughout my journey in Koenig.\n\nI was also provided with a decent salary hike while I completed my first year. If an employee gets a satisfactory salary hike in the current organization, not only does he see himself in the long run in the same organization but also gets motivated to perform in a better manner.\n\nHoping to learn and grow more in the upcoming years in Koenig.\n\nThank you Koenig Solutions for providing me a platform to learn and earn during the pandemic situation.',
  },
  {
    name: 'Rohit Bahl', role: 'Iconic Trainer',
    quote: 'Koenig is undoubtedly the best place to work. It gives us ample opportunities to learn and grow. My work at Koenig has taken me to different countries and allowed me to meet students from across the globe. The work culture at Koenig is extremely empowering - every possible support in terms of training and mentoring is given to you to allow you to excel at your work.',
  },
  {
    name: 'Sunaina', role: 'CSM+',
    quote: 'I joined Koenig in April 2019. I came from a different professional background and a different work culture.\n\nSince my work experience so far was in a different domain, I took time to show results. But I truly appreciate my reporting manager for being patient with me and giving me the time to adapt.\n\nI am far from perfect but thanks to the support system provided by my colleagues and seniors I am striving to reach my full potential.',
  },
  {
    name: 'Nirbhai Chauhan', role: 'Senior Corporate Trainer',
    quote: 'At Koenig, we are encouraged to take risks and think out of the box. I have imbibed some of the most valuable lessons in teamwork, attention to detail, student satisfaction, and the importance of taking challenges head-on at Koenig. I can clearly distinguish myself as a professional before and after joining Koenig for the better.',
  },
  {
    name: 'Sachin Chauhan', role: 'Technical Lead',
    quote: 'With an innovative and progressive organization like Koenig, you can never feel professionally stagnant. At Koenig, every day brings in a new learning opportunity.',
  },
]

const CATEGORIES = ['All', 'Corporate Trainers', 'Business Development', 'Corporate & Support'] as const

const JOBS = [
  { id: 'KS 2', title: 'Customer Success Manager', category: 'Corporate & Support', desc: 'We are seeking an experienced B2B sales professionals with minimum 2+ years of experience, would prefer IT Solution or IT Training. Candidate will be responsible for developing and maintaining long-term relationships with clients, ensuring customer satisfaction, identifying new business opportunities, and achieving sales targets.' },
  { id: 'KS 17', title: 'Cisco Trainer (Service Provider/Data Center)', category: 'Corporate Trainers', desc: 'We are looking for skilled Cisco Trainers to lead training sessions in CCNP Service Provider or CCNP Data Center technologies. Candidates should have strong expertise in Cisco networking, including routing, switching, MPLS, BGP, QoS, VPN, Nexus switches, UCS, ACI, and data center virtualization. CCNA/CCNP certification is required, along with 2+ years of relevant experience. Prior experience in technical training or a passion for teaching is essential.' },
  { id: 'KS 88', title: 'Business Development Manager - US', category: 'Business Development', desc: 'We are hiring a Business Development Manager based in the US with 3+ years of B2B sales experience in IT, SaaS, or EdTech. The role involves driving revenue growth by identifying new business opportunities, managing the full sales cycle, and building strong client relationships. The ideal candidate should have a proven track record of meeting sales targets, excellent communication and negotiation skills, and experience working with CRM tools. Prior experience in selling IT services or digital learning solutions is highly preferred. Candidates must be currently based in the US and legally authorized to work.' },
  { id: 'KS 112', title: 'Corporate Trainer - Red Hat', category: 'Corporate Trainers', desc: 'Having Minimum 2+ Years of experience of imparting Trainings and Certified RHCSA, RHCA, RHCE, RHCI. Also having exp in Linux Red Hat.' },
  { id: 'KS 133', title: 'Executive-AR-Accounts Receivable', category: 'Corporate & Support', desc: 'We are seeking an experienced Accounts Receivable Executive to manage end-to-end AR operations for India. The ideal candidate will be responsible for invoicing, collections, cash application, reconciliations, and cash flow optimization while supporting automation and digital finance initiatives.' },
  { id: 'KS 201', title: 'Account Manager - Business Development', category: 'Business Development', desc: 'We are seeking an experienced Key Account Manager to onboard Corporates. The Key Account Manager will be responsible for developing and maintaining long-term relationships with clients, ensuring customer satisfaction, identifying new business opportunities, and achieving sales targets.' },
  { id: 'KS 212', title: 'HR Generalist Executive', category: 'Corporate & Support', desc: 'We are seeking a passionate and detail-oriented HR Generalist to join our dynamic team. This role is an excellent opportunity for a motivated individual looking to build a career in Human Resources. You will play a key role in supporting the entire employee lifecycle, ensuring smooth HR operations, and fostering a positive employee experience.' },
  { id: 'KS 293', title: 'AI - Corporate Trainer', category: 'Corporate Trainers', desc: 'Urgent Requirement of AI Trainer with minimum 2 years of relevant experience. The person should be able to deliver AI concepts such as Generative AI, Databricks, Open Source LLMs, ML and Gen AI tools. Candidates from non-metro cities are preferred.' },
  { id: 'KS 303', title: 'Corporate Sales Manager - Gulf', category: 'Business Development', desc: 'We are seeking a Business Development Manager in Saudi Arabia. The candidate should have good understanding in IT or IT training industry. Candidate must have the ability to develop deep customer relationships. This job has possibility of promotion to Regional/National Head. Our remuneration is the best in the industry.' },
  { id: 'KS 335', title: 'Corporate Trainer - Data Analytics', category: 'Corporate Trainers', desc: 'We are seeking a dynamic and experienced Corporate Trainer specializing in Data Analytics to join our Learning & Development team. The ideal candidate with 2+ years of experience will be proficient in leading data analytics technologies such as Tableau, Qlik, Power BI, Power Apps, and Microsoft Fabric. Experience in training digital marketing concepts is also highly valued.' },
  { id: 'KS 348', title: 'Corporate Trainer - Cisco Security', category: 'Corporate Trainers', desc: 'We are seeking a passionate and knowledgeable Cisco Security Trainer with expertise in CCNP Security, SCOR (350-701), and Cisco CyberOps. The ideal candidate should have a solid understanding of cybersecurity principles, a strong desire to teach and mentor professionals, and the flexibility to travel globally for delivering training sessions.' },
  { id: 'KS 369', title: 'Security Management Trainer', category: 'Corporate Trainers', desc: 'We are seeking an experienced Information and Cybersecurity Corporate Trainer to design, develop, and deliver engaging training programs on cybersecurity awareness, governance, and compliance. The ideal candidate will possess strong expertise in cybersecurity frameworks, ISO standards, and information security management systems (ISMS), and have a proven ability to educate both technical and non-technical audiences.' },
  { id: 'KS 376', title: 'Corporate Trainer - Checkpoint', category: 'Corporate Trainers', desc: 'Seeking for an experienced Corporate Trainer – Check Point Technologies (Permanent WFH). The role includes delivering virtual training sessions on Check Point security solutions including CCSA, CCSE, Security Gateway, SmartConsole, VPN (Site-to-Site & Remote Access), Threat Prevention, SandBlast, and CloudGuard. Candidates should have strong hands-on experience with Check Point Firewall (R81.x), Gaia OS, policy management, NAT, and core networking concepts (TCP/IP, routing, switching). Excellent communication, presentation abilities, and prior training or mentoring experience are preferred.' },
  { id: 'KS 393', title: 'Corporate Trainer - SAP BW / Datasphere', category: 'Corporate Trainers', desc: 'We are looking for a skilled and passionate SAP BW / SAP Datasphere Corporate Trainer with strong hands-on experience in SAP BW on HANA, BW/4HANA, and SAP Datasphere. The ideal candidate should have 2+ years of real-time AMS or production support exposure and the ability to deliver concept-driven, hands-on, and real-world scenario–based training to corporate and individual learners.' },
  { id: 'KS 400', title: 'Corporate Trainer - LenelS2 / OnGuard', category: 'Corporate Trainers', desc: 'We are looking for experienced LenelS2 / OnGuard Trainers to deliver high-quality corporate training remotely. Candidates should have strong hands-on expertise in LenelS2 OnGuard access control systems, system configuration, alarm monitoring, cardholder management, and physical security integration. A solid understanding of enterprise security infrastructure, access control architecture, and security system integration is required. Relevant LenelS2 certifications or equivalent physical security certifications are preferred. This work-from-home role offers exciting global travel opportunities and the chance to train professionals on enterprise-grade physical security and access control platforms.' },
  { id: 'KS 405', title: 'Corporate Trainer - MCT (AI & Copilot)', category: 'Corporate Trainers', desc: 'We are looking for experienced Microsoft Certified Trainers (MCT) to deliver high-quality corporate training remotely. Candidates should have strong hands-on expertise in Microsoft AI technologies, Azure AI services, Microsoft Copilot, Azure OpenAI, and Power Platform, along with experience in designing and delivering technical training sessions. A solid understanding of cloud computing concepts, generative AI, machine learning fundamentals, and Microsoft 365 ecosystem is required. Primary expertise should be in AI and Copilot solutions, while secondary skills can include Azure, Power Platform, or data analytics technologies. Relevant Microsoft certifications such as MCT, AI-900, AI-102, or equivalent are required. This work-from-home role offers exciting global travel opportunities and the chance to train professionals on enterprise-grade Microsoft AI and cloud solutions.' },
  { id: 'KS 406', title: 'Corporate Trainer - Veritas', category: 'Corporate Trainers', desc: 'We are looking for experienced Veritas NetBackup Trainers to deliver high-quality corporate training remotely and onsite. Candidates should have strong hands-on expertise in NetBackup administration, backup and recovery strategies, storage lifecycle policies, and enterprise data protection. A solid understanding of virtualization (VMware), cloud backup solutions, deduplication, and disaster recovery is required. Relevant Veritas certifications or equivalent experience in backup technologies is preferred. This role offers opportunities to work with global clients, deliver hands-on training, and enable professionals on enterprise-grade data protection and cyber resilience solutions.' },
  { id: 'KS 407', title: 'Business Development Manager - Canada', category: 'Business Development', desc: 'We are hiring a Business Development Manager based in Canada with 3+ years of B2B sales experience in IT, SaaS, or EdTech. The role involves driving revenue growth by identifying new business opportunities, managing the full sales cycle, and building strong client relationships. The ideal candidate should have a proven track record of meeting sales targets, excellent communication and negotiation skills, and experience working with CRM tools. Prior experience in selling IT services or digital learning solutions is highly preferred. Candidates must be currently based in Canada and legally authorized to work.' },
  { id: 'KS 408', title: 'Corporate Trainer - Juniper', category: 'Corporate Trainers', desc: 'We are looking for an experienced Juniper Networking Trainer with strong expertise in Routing & Switching, Data Center, and Service Provider technologies. The candidate should have hands-on experience with Junos OS and Juniper MX, EX, QFX, and SRX platforms, along with the ability to deliver technical training in both online and classroom environments.' },
  { id: 'KS 410', title: 'Business Development Manager - Singapore', category: 'Business Development', desc: 'We are hiring a Business Development Manager based in Singapore with 3+ years of B2B sales experience in IT, SaaS, or EdTech. The role involves driving revenue growth by identifying new business opportunities, managing the full sales cycle, and building strong client relationships. The ideal candidate should have a proven track record of meeting sales targets, excellent communication and negotiation skills, and experience working with CRM tools. Prior experience in selling IT services or digital learning solutions is highly preferred. Candidates must be currently based in Singapore and legally authorized to work.' },
  { id: 'KS 413', title: 'Alliance Manager', category: 'Business Development', desc: "Experience in OEM alliance development; Preferably training partnership, strategic partnerships, and business development, with a strong focus on identifying, engaging, and onboarding new OEM/technology vendor partnerships, expanding Koenig's OEM ecosystem, negotiating partnership agreements, and driving alliance-led growth. Should be open to learning and leveraging AI tools to enhance productivity and business outcomes. AI-aware mindset with willingness to learn and utilize AI tools for business growth." },
  { id: 'KS 414', title: 'Corporate Trainer - MCT (Multilingual)', category: 'Corporate Trainers', desc: 'We are looking for Multilingual Microsoft Certified Trainers (MCTs) proficient in Spanish, French, or German to deliver Microsoft technical training programs worldwide. Candidates should possess active MCT certification, strong presentation skills, expertise in Microsoft technologies, and willingness to work in flexible shifts and travel globally.' },
  { id: 'KS 415', title: 'Corporate Trainer - Portfolio/Programme Management', category: 'Corporate Trainers', desc: 'We are looking for an experienced Corporate Trainer – Project & Portfolio Management with 8–15 years of industry experience and a PgMP and/or PfMP certification to deliver world-class training programs for professionals preparing for PMI certifications. The ideal candidate should have strong expertise in Program and Portfolio Management, excellent presentation and facilitation skills, and prior experience conducting instructor-led corporate training (virtual and classroom). Candidates with a PMP certification and enterprise PMO or transformation program experience will have an added advantage.' },
  { id: 'KS 416', title: 'Business Unit Head - K12 Space', category: 'Corporate & Support', desc: 'Experienced professional from the EdTech Space with a proven track record of managing business operations, driving revenue growth, and ensuring excellence in academic delivery. Responsible for student enrolment growth, maintaining high-quality learning outcomes, managing faculty and support teams, building strong relationships with clients, and executing business expansion strategies. Strong leadership, operational management, stakeholder engagement, and business development skills are essential. Should be open to learning and leveraging AI tools to enhance productivity and business outcomes. AI-aware mindset with willingness to learn and utilize AI tools for business growth.' },
]

const CURRENT_LOCATIONS = [
  'Delhi NCR', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata',
  'Other City in India', 'Outside India',
]

const NOTICE_PERIODS = [
  '1 week', '2 week', '1 month', '2 months', 'Immediate', '3 months', '45 Days', '15 days',
]

const APPLY_FORM_INITIAL = { name: '', email: '', phone: '', skills: '', location: '', noticePeriod: '', linkedin: '' }

export default function CareersPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('All')
  const [form, setForm] = useState({ name: '', email: '', phone: '', jobTitle: '' })
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set())
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<string>>(new Set())
  const [overflowingTestimonials, setOverflowingTestimonials] = useState<Set<string>>(new Set())
  const testimonialQuoteRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const [applyJob, setApplyJob] = useState<typeof JOBS[number] | null>(null)
  const [applyDescExpanded, setApplyDescExpanded] = useState(false)
  const [applyForm, setApplyForm] = useState(APPLY_FORM_INITIAL)
  const [applyResumeFileName, setApplyResumeFileName] = useState('')
  const [applySubmitted, setApplySubmitted] = useState(false)

  const openApplyModal = (job: typeof JOBS[number]) => {
    setApplyJob(job)
    setApplyDescExpanded(false)
    setApplySubmitted(false)
    setApplyForm(APPLY_FORM_INITIAL)
    setApplyResumeFileName('')
  }

  const closeApplyModal = () => setApplyJob(null)

  useEffect(() => {
    const overflowing = new Set<string>()
    testimonialQuoteRefs.current.forEach((el, name) => {
      if (el.scrollHeight > el.clientHeight + 1) overflowing.add(name)
    })
    setOverflowingTestimonials(overflowing)
  }, [])

  const toggleExpandedTestimonial = (name: string) => {
    setExpandedTestimonials(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const toggleExpanded = (id: string) => {
    setExpandedJobs(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase()
    return JOBS.filter(job => {
      const matchesCategory = category === 'All' || job.category === category
      const matchesQuery = !q || job.title.toLowerCase().includes(q) || job.id.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <div>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="career-section px-4 lg:px-[50px]" style={{ background: 'radial-gradient(ellipse at 50% 30%, #0D3F5A 0%, #071B2E 45%, #040C18 100%)' }}>
        <div className="mx-auto max-w-7xl pt-0 sm:pt-[35px] pb-0 sm:pb-[35px] grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-extrabold leading-tight text-[28px] sm:text-[35px]" style={{ color: '#fff' }}>
              Careers at Koenig
            </h1>
            <p className="mt-3 font-semibold text-[15px] sm:text-base" style={{ color: '#fff' }}>
              Hiring Globally!
            </p>
            <p className="mt-2 text-[15px] sm:text-base max-w-2xl" style={{ color: '#9fc3d8', lineHeight: 1.7 }}>
              Build a career that works around your life, not the other way around. Permanent Work From Home, constant learning, and a real purpose — help people earn Money, Respect & Peace of Mind.
            </p>
          </div>
          <div className="mx-auto lg:ml-auto lg:mr-0 w-full max-w-md rounded-2xl p-6 sm:p-8 space-y-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)' }}>
            {[
              { Icon: Briefcase, title: `${JOBS.length} Open Positions`, desc: 'Across trainers, business development, and corporate roles' },
              { Icon: Home, title: '100% Remote-Friendly', desc: 'Permanent Work From Home for eligible roles' },
              { Icon: Award, title: 'Great Place to Work', desc: 'Certified — Best Place to Work in Education & Training since 2010' },
            ].map(stat => (
              <div key={stat.title} className="flex items-start gap-4">
                <stat.Icon className="w-6 h-6 shrink-0" style={{ color: '#5fb8e0' }} aria-hidden="true" />
                <div>
                  <p className="font-bold text-[15px] sm:text-base" style={{ color: '#fff' }}>{stat.title}</p>
                  <p className="text-[15px] leading-snug" style={{ color: '#9fc3d8' }}>{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY JOIN ──────────────────────────────────────────────── */}
      <section className="career-section px-4 lg:px-[50px]" style={{ background: '#fff' }}>
        <div className="mx-auto max-w-7xl pt-0 sm:pt-[35px] pb-0 sm:pb-[35px]">
          <div className="text-center mb-[15px] sm:mb-10">
            <h2 className="font-extrabold text-[26px] sm:text-[36px] leading-tight mb-3" style={{ color: '#0d1b2a' }}>
              Consider Joining Koenig, If <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">This Matters</span> to You
            </h2>
            <p className="text-[15px] sm:text-base" style={{ color: '#5b7690' }}>
              We build a workplace around what actually makes a career worth having.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10" style={{ background: 'linear-gradient(135deg, #eaf6fd 0%, #f4fbff 60%, #eef8fd 100%)', border: '1px solid #cdebf8' }}>
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.14) 0%, transparent 70%)' }} />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.14) 0%, transparent 70%)' }} />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="rounded-2xl bg-white/80 p-6 sm:p-8 backdrop-blur-sm" style={{ boxShadow: '0 4px 28px rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.12)' }}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.12)' }}>
                    <ListChecks className="w-5 h-5" style={{ color: '#0694d1' }} aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-[17px] sm:text-[19px] leading-snug" style={{ color: '#0d1b2a' }}>
                    Consider joining Koenig, if the following are important to you:
                  </h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    'Embark on the AI Journey and AI-proof your career.',
                    'Permanent Work from Home. For the best Return on Time for Work, Life and Family.',
                    'Constant Improvement.',
                    'Using Technology.',
                    'A Purpose - Help people earn Money, Respect & Peace of Mind.',
                  ].map(item => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed" style={{ color: '#374151' }}>
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(6,148,209,0.12)' }}>
                        <Check className="w-3 h-3" style={{ color: '#0694d1' }} aria-hidden="true" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="flex gap-3 text-[15px] leading-relaxed" style={{ color: '#374151' }}>
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(6,148,209,0.12)' }}>
                      <Check className="w-3 h-3" style={{ color: '#0694d1' }} aria-hidden="true" />
                    </span>
                    <a href="/about#koenig-ethos" className="font-semibold hover:underline" style={{ color: '#0694d1' }}>Koenig Ethos.</a>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white/80 p-6 sm:p-8 backdrop-blur-sm" style={{ boxShadow: '0 4px 28px rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.12)' }}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.12)' }}>
                    <Quote className="w-5 h-5" style={{ color: '#0694d1' }} aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-[17px] sm:text-[19px] leading-snug" style={{ color: '#0d1b2a' }}>
                    What Our Employees Say About WFH:
                  </h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    'I stay in Jamshedpur, a place where job opportunities are limited. This WFH model allows me to work without compromising my career due to family responsibilities or other personal reasons.',
                    "Flexibility, cost savings, better work-life balance, and increased productivity—these are the key benefits I've experienced with permanent WFH.",
                    'Overall, working from home enhances productivity while giving me a more fulfilling personal life.',
                    'I believe WFH gives a great return on time for work, life, and family.',
                    'With elderly parents at home, WFH enables me to take care of their needs while maintaining my professional commitments.',
                    'Flexibility and autonomy are the true USPs of WFH, allowing me to be more productive while balancing personal responsibilities effectively.',
                  ].map(item => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed" style={{ color: '#374151' }}>
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(6,148,209,0.12)' }}>
                        <Check className="w-3 h-3" style={{ color: '#0694d1' }} aria-hidden="true" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOB OPENINGS ──────────────────────────────────────────── */}
      <section className="career-section career-section--tight-top px-4 lg:px-[50px]" style={{ background: '#fff' }}>
        <div className="mx-auto max-w-7xl pt-0 pb-0 sm:pb-[35px]">
          <div className="text-center mb-[15px] sm:mb-8">
            <h2 className="font-extrabold text-[26px] sm:text-[36px] leading-tight mb-3" style={{ color: '#0d1b2a' }}>
              Current Job <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Openings</span>
            </h2>
            <p className="text-[15px] sm:text-base" style={{ color: '#5b7690' }}>
              Note: Former employees can re-apply after at least 3 months of separation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#5b7690' }} aria-hidden="true" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search jobs..."
                className="w-full rounded-full pl-9 pr-4 py-2.5 text-[15px] outline-none"
                style={{ border: '1px solid #dbeefa', background: '#f0f9ff', color: '#33475b' }}
              />
            </div>
            <div className="scrollbar-hide flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] sm:text-[15px] font-semibold transition-colors"
                  style={category === cat
                    ? { background: 'linear-gradient(135deg, #0694d1, #076d9d)', color: '#fff' }
                    : { background: '#f0f9ff', color: '#33475b', border: '1px solid #dbeefa' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <p className="text-center text-[15px] py-10" style={{ color: '#5b7690' }}>No job openings match your search.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
              {filteredJobs.map(job => (
                <div key={job.id} className="rounded-2xl p-5 flex flex-col" style={{ background: '#f0f9ff', border: '1px solid #dbeefa' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full px-2.5 py-0.5 text-[13px] font-bold" style={{ background: 'rgba(6,148,209,0.12)', color: '#0694d1' }}>{job.id}</span>
                    <span className="rounded-full px-2.5 py-0.5 text-[13px]" style={{ background: '#fff', color: '#5b7690', border: '1px solid #dbeefa' }}>{job.category}</span>
                  </div>
                  <p className="font-bold text-[15px] sm:text-base mb-1.5" style={{ color: '#0d1b2a' }}>{job.title}</p>
                  <p className={`text-[15px] leading-relaxed flex-1 ${expandedJobs.has(job.id) ? '' : 'line-clamp-4'}`} style={{ color: '#5b7690' }}>{job.desc}</p>
                  <button
                    type="button"
                    onClick={() => toggleExpanded(job.id)}
                    className="mb-4 mt-1 self-start text-[15px] font-semibold hover:underline"
                    style={{ color: '#0694d1' }}
                  >
                    {expandedJobs.has(job.id) ? 'Read less' : 'Read more'}
                  </button>
                  <button
                    type="button"
                    onClick={() => openApplyModal(job)}
                    className="mt-auto inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-[15px] font-bold transition-opacity hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #0694d1, #076d9d)', color: '#fff' }}
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SUBMIT RESUME CTA ────────────────────────────────────── */}
      <section className="career-section relative overflow-hidden px-4 lg:px-[50px]" style={{ background: 'linear-gradient(160deg,#040f1a 0%,#061e30 50%,#051525 100%)' }}>
        <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle,rgba(6,148,209,0.14) 0%,transparent 70%)' }} />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full" style={{ background: 'radial-gradient(circle,rgba(77,191,239,0.10) 0%,transparent 70%)' }} />

        <div className="relative mx-auto max-w-3xl pt-0 sm:pt-[35px] pb-0 sm:pb-[35px]">
          <div className="text-center mb-8">
            <h2 className="font-extrabold leading-tight mb-3 whitespace-nowrap text-[12px] sm:text-[16px] md:text-[22px] lg:text-[30px]" style={{ color: '#fff' }}>
              Don&apos;t See a Role That Fits? Share Your Resume Anyway
            </h2>
            <p className="text-[15px] sm:text-base mb-2" style={{ color: 'rgba(255,255,255,0.50)' }}>
              You will be intimated about the current positions in Koenig for which you are eligible.
            </p>
            <p className="text-[15px] sm:text-base flex items-center justify-center gap-2 flex-wrap" style={{ color: 'rgba(255,255,255,0.50)' }}>
              <Mail className="w-4 h-4" aria-hidden="true" />
              Email us at{' '}
              <a href="mailto:career@koenig-solutions.com" className="font-semibold hover:underline" style={{ color: '#5fb8e0' }}>career@koenig-solutions.com</a>
              {' '}or use the form below.
            </p>
          </div>
          <form
            onSubmit={e => e.preventDefault()}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 rounded-2xl p-6 sm:p-8"
            style={{ background: 'linear-gradient(145deg,#0a2d45,#072238)', border: '1px solid rgba(6,148,209,0.25)', boxShadow: '0 0 50px rgba(6,148,209,0.10)' }}
          >
            <style>{`
              .careers-input { background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.10); transition: border-color 0.2s, box-shadow 0.2s; }
              .careers-input:focus { border-color: #0694D1; box-shadow: 0 0 0 3px rgba(6,148,209,0.15); outline: none; }
              .careers-input::placeholder { color: rgba(255,255,255,0.25); }
              .careers-upload { background: rgba(6,148,209,0.08); border: 1.5px solid rgba(6,148,209,0.35); transition: border-color 0.2s, box-shadow 0.2s, background 0.2s; }
              .careers-upload:hover { border-color: #0694D1; box-shadow: 0 0 0 3px rgba(6,148,209,0.15); background: rgba(6,148,209,0.14); }
            `}</style>
            <div>
              <label className="block mb-2 text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>Full Name</label>
              <input
                type="text" required placeholder="John Smith" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="careers-input w-full rounded-xl px-4 py-3 text-[15px] text-white"
              />
            </div>
            <div>
              <label className="block mb-2 text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>Email Address</label>
              <input
                type="email" required placeholder="john@example.com" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="careers-input w-full rounded-xl px-4 py-3 text-[15px] text-white"
              />
            </div>
            <div>
              <label className="block mb-2 text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>Phone Number</label>
              <input
                type="tel" required placeholder="+91 98765 43210" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="careers-input w-full rounded-xl px-4 py-3 text-[15px] text-white"
              />
            </div>
            <div>
              <label className="block mb-2 text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>Job Title You&apos;re Applying For</label>
              <input
                type="text" required placeholder="e.g. Corporate Trainer - Cisco Security" value={form.jobTitle}
                onChange={e => setForm({ ...form, jobTitle: e.target.value })}
                className="careers-input w-full rounded-xl px-4 py-3 text-[15px] text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>Resume</label>
              <label className="careers-upload flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer text-[15px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Upload className="w-4 h-4 shrink-0" aria-hidden="true" />
                Choose Resume File
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
              </label>
            </div>
            <button
              type="submit"
              className="sm:col-span-2 rounded-xl px-6 py-3.5 text-[15px] font-bold transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0694d1, #076d9d)', color: '#fff', boxShadow: '0 2px 12px rgba(6,148,209,0.35)' }}
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* ── GREAT PLACE TO WORK ───────────────────────────────────── */}
      <section className="career-section px-4 lg:px-[50px]" style={{ background: '#fff' }}>
        <div className="mx-auto max-w-7xl pb-0 sm:pb-[35px]">
          <div
            className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl bg-white p-6 sm:p-8"
            style={{ border: '1.5px solid #CAEFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.07), 0 4px 16px rgba(6,148,209,0.10)' }}
          >
            <div className="flex w-full sm:w-[150px] shrink-0 items-center justify-center overflow-hidden rounded-xl" style={{ background: '#F0FAFF', border: '1.5px solid #CAEFFF', height: '110px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/awards/great_place_to_work_2026_2027.webp" alt="Great Place to Work" className="h-[85%] w-[85%] object-contain" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-extrabold text-[18px] sm:text-[22px] leading-snug" style={{ color: '#0d1b2a' }}>
                We are Great Place to Work Certified
              </p>
              <p className="text-[15px] mt-1" style={{ color: '#5b7690' }}>
                Rated the Best Place to Work in Education and Training since 2010.
              </p>
            </div>
            <span className="shrink-0 rounded-full border px-4 py-1.5 text-[15px] font-semibold" style={{ borderColor: '#CAEFFF', color: '#5b7690' }}>
              2011–2027
            </span>
          </div>
        </div>
      </section>

      {/* ── EMPLOYEE TESTIMONIALS ─────────────────────────────────── */}
      <section className="career-section px-4 lg:px-[50px]" style={{ background: '#f0f9ff' }}>
        <div className="mx-auto max-w-7xl pt-0 sm:pt-[35px] pb-0 sm:pb-[35px]">
          <div className="text-center mb-[15px] sm:mb-10">
            <h2 className="font-extrabold text-[26px] sm:text-[36px] leading-tight mb-3" style={{ color: '#0d1b2a' }}>
              Employee <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Testimonials</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px] sm:gap-6 items-start">
            {EMPLOYEE_TESTIMONIALS.map(t => {
              const expanded = expandedTestimonials.has(t.name)
              return (
                <div key={t.name} className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #dbeefa' }}>
                  <p className="font-bold text-[15px] text-center" style={{ color: '#0d1b2a' }}>{t.name}</p>
                  <p className="text-[15px] text-center mb-4" style={{ color: '#5b7690' }}>{t.role}</p>
                  <div
                    ref={el => { if (el) testimonialQuoteRefs.current.set(t.name, el) }}
                    className="flex flex-col gap-[15px] overflow-hidden"
                    style={{ maxHeight: expanded ? 'none' : '195px' }}
                  >
                    {t.quote.split('\n\n').map((para, i) => (
                      <p key={i} className="text-[15px] leading-relaxed" style={{ color: '#33475b' }}>{para}</p>
                    ))}
                  </div>
                  {overflowingTestimonials.has(t.name) && (
                    <button
                      type="button"
                      onClick={() => toggleExpandedTestimonial(t.name)}
                      className="mt-3 text-[15px] font-semibold hover:underline"
                      style={{ color: '#0694d1' }}
                    >
                      {expanded ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CANDIDATE APPLICATION MODAL ──────────────────────────── */}
      {applyJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(4,15,26,0.6)' }}
          onClick={closeApplyModal}
        >
          <div
            className="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl px-6 py-4" style={{ background: 'linear-gradient(135deg, #0694d1, #076d9d)' }}>
              <h3 className="font-extrabold text-[19px] sm:text-[22px]" style={{ color: '#fff' }}>Candidate Application Form</h3>
              <button
                type="button"
                onClick={closeApplyModal}
                aria-label="Close"
                className="rounded-full p-1.5 transition-colors hover:bg-white/15"
              >
                <X className="w-5 h-5" style={{ color: '#fff' }} aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {applySubmitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'rgba(6,148,209,0.12)' }}>
                    <Check className="w-7 h-7" style={{ color: '#0694d1' }} aria-hidden="true" />
                  </div>
                  <p className="font-bold text-[17px] mb-1.5" style={{ color: '#0d1b2a' }}>Application Submitted!</p>
                  <p className="text-[15px] mb-6" style={{ color: '#5b7690' }}>
                    Thanks{applyForm.name ? ` ${applyForm.name.split(' ')[0]}` : ''}, we&apos;ve received your application for {applyJob.title}. Our team will reach out if there&apos;s a match.
                  </p>
                  <button
                    type="button"
                    onClick={closeApplyModal}
                    className="rounded-xl px-6 py-2.5 text-[15px] font-bold"
                    style={{ background: 'linear-gradient(135deg, #0694d1, #076d9d)', color: '#fff' }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-3.5">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span className="shrink-0 rounded-full px-2.5 py-0.5 text-[13px] font-bold" style={{ background: 'rgba(6,148,209,0.12)', color: '#0694d1' }}>{applyJob.id}</span>
                      <p className="font-bold text-[15px] sm:text-[16px]" style={{ color: '#0d1b2a' }}>{applyJob.title}</p>
                    </div>
                    <p className={`text-[14px] leading-snug ${applyDescExpanded ? '' : 'line-clamp-1'}`} style={{ color: '#5b7690' }}>
                      <span className="font-semibold" style={{ color: '#374151' }}>Description: </span>{applyJob.desc}
                    </p>
                    <button
                      type="button"
                      onClick={() => setApplyDescExpanded(v => !v)}
                      className="text-[13px] font-semibold hover:underline"
                      style={{ color: '#0694d1' }}
                    >
                      {applyDescExpanded ? 'Read less' : 'Read more'}
                    </button>
                  </div>

                  <form
                    onSubmit={e => { e.preventDefault(); setApplySubmitted(true) }}
                    className="space-y-2.5"
                  >
                    <style>{`
                      .apply-input { border: 1.5px solid #dbeefa; background: #f8fdff; transition: border-color .2s, box-shadow .2s; color: #33475b; }
                      .apply-input:focus { border-color: #0694D1; box-shadow: 0 0 0 3px rgba(6,148,209,0.12); outline: none; }
                      .apply-input::placeholder { color: #94a8ba; }
                      .apply-upload { border: 1.5px solid #a9def2; background: #eef8fd; transition: border-color .2s, box-shadow .2s, background .2s; }
                      .apply-upload:hover { border-color: #0694D1; box-shadow: 0 0 0 3px rgba(6,148,209,0.12); }
                    `}</style>
                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        type="text" required placeholder="Name" value={applyForm.name}
                        onChange={e => setApplyForm({ ...applyForm, name: e.target.value })}
                        className="apply-input w-full rounded-xl px-4 py-2.5 text-[15px]"
                      />
                      <input
                        type="email" required placeholder="Email" value={applyForm.email}
                        onChange={e => setApplyForm({ ...applyForm, email: e.target.value })}
                        className="apply-input w-full rounded-xl px-4 py-2.5 text-[15px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        type="tel" required placeholder="Phone" value={applyForm.phone}
                        onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })}
                        className="apply-input w-full rounded-xl px-4 py-2.5 text-[15px]"
                      />
                      <input
                        type="url" placeholder="Linkedin Profile" value={applyForm.linkedin}
                        onChange={e => setApplyForm({ ...applyForm, linkedin: e.target.value })}
                        className="apply-input w-full rounded-xl px-4 py-2.5 text-[15px]"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <select
                        required value={applyForm.location}
                        onChange={e => setApplyForm({ ...applyForm, location: e.target.value })}
                        className="apply-input w-full rounded-xl px-4 py-2.5 text-[15px]"
                        style={{ color: applyForm.location ? '#33475b' : '#94a8ba' }}
                      >
                        <option value="" disabled style={{ color: '#94a8ba' }}>Select Current Location</option>
                        {CURRENT_LOCATIONS.map(loc => <option key={loc} value={loc} style={{ color: '#33475b' }}>{loc}</option>)}
                      </select>
                      <select
                        required value={applyForm.noticePeriod}
                        onChange={e => setApplyForm({ ...applyForm, noticePeriod: e.target.value })}
                        className="apply-input w-full rounded-xl px-4 py-2.5 text-[15px]"
                        style={{ color: applyForm.noticePeriod ? '#33475b' : '#94a8ba' }}
                      >
                        <option value="" disabled style={{ color: '#94a8ba' }}>Select Notice Period</option>
                        {NOTICE_PERIODS.map(np => <option key={np} value={np} style={{ color: '#33475b' }}>{np}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-[12px] font-semibold" style={{ color: '#5b7690' }}>Upload Resume Or Linkedin Profile</label>
                      <label className="apply-upload flex items-center gap-3 rounded-xl px-4 py-2.5 cursor-pointer text-[15px]" style={{ color: applyResumeFileName ? '#33475b' : '#94a8ba' }}>
                        <Upload className="w-4 h-4 shrink-0" style={{ color: '#0694d1' }} aria-hidden="true" />
                        {applyResumeFileName || 'Choose file'}
                        <input
                          type="file" className="hidden" accept=".pdf,.doc,.docx"
                          onChange={e => setApplyResumeFileName(e.target.files?.[0]?.name ?? '')}
                        />
                      </label>
                    </div>

                    <input
                      type="text" required placeholder="Skills" value={applyForm.skills}
                      onChange={e => setApplyForm({ ...applyForm, skills: e.target.value })}
                      className="apply-input w-full rounded-xl px-4 py-3.5 text-[15px]"
                    />

                    <button
                      type="submit"
                      className="w-full rounded-full px-6 py-3 text-[15px] font-bold transition-opacity hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #0694d1, #076d9d)', color: '#fff', boxShadow: '0 2px 12px rgba(6,148,209,0.35)' }}
                    >
                      Submit
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <SiteFooter />

      <style>{`
        @media (max-width: 767px) {
          .career-section { padding-left: 15px !important; padding-right: 15px !important; padding-top: 20px !important; padding-bottom: 20px !important; }
          .career-section.career-section--tight-top { padding-top: 0 !important; }
        }
      `}</style>
    </div>
  )
}

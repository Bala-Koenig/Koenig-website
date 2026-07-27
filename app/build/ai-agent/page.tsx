'use client'
import { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import HeroParticles from '@/components/HeroParticles'

/* ── Data (sourced from koenig-solutions.com/build/ai-agent — content reworded, structure kept) ── */
const TOOLS = ['OpenAI', 'LangChain', 'Pinecone', 'Zapier', 'Python', 'AutoGPT', 'HuggingFace', 'n8n']

const STATS = [
  {
    value: '33+ Years', label: 'Of Excellence',
    icon: <>
      <path d="M7 3h10v4a5 5 0 0 1-10 0V3z"/>
      <path d="M7 4a3 3 0 0 0-3 3 3 3 0 0 0 3 3" fill="none" stroke="#0694D1" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M17 4a3 3 0 0 1 3 3 3 3 0 0 1-3 3" fill="none" stroke="#0694D1" strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="11" y="12" width="2" height="4"/>
      <rect x="7" y="17" width="10" height="2" rx="1"/>
    </>,
  },
  {
    value: '300+ Trainers', label: 'Certified Experts',
    icon: <>
      <circle cx="12" cy="8" r="3.5"/>
      <path d="M5 21a7 7 0 0 1 14 0z"/>
    </>,
  },
  {
    value: '30,000+ Students', label: 'Trained Monthly',
    icon: <>
      <path d="M12 3L2 8l10 5 10-5-10-5z"/>
      <path d="M6 10.5L18 10.5 18 15 12 18 6 15z"/>
    </>,
  },
]

const PATHWAY = [
  { step: '01', title: 'Free discovery call', desc: 'In a 20-30 minute call, we listen to your goals and explore ideas.' },
  { step: '02', title: 'Choose your use case', desc: 'Together, we pick one workflow and plan how your agent will help.' },
  { step: '03', title: 'Guided build sessions', desc: 'Across 3-4 live sessions, we help you configure, test, and refine your agent.' },
  { step: '04', title: 'Launch & next steps', desc: 'We connect your agent to your tools and share tips to scale it.' },
]

const DELIVERABLES = [
  { title: 'Live expert guidance', desc: 'Work directly with Koenig trainers who simplify the tech and keep you focused.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/> },
  { title: 'Configured agent setup', desc: 'From prompts to basic integrations, we help you configure your first agent.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/> },
  { title: 'Reusable playbook', desc: 'Get simple checklists and templates so you can repeat the process.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/> },
  { title: 'Time back every week', desc: 'Automate repetitive steps so you can focus on decisions, not data entry.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/> },
  { title: 'Post-launch check-in', desc: 'Quick follow-up to review performance and refine your agent.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/> },
  { title: 'Confidence with AI', desc: 'Understand the backend so you can speak about AI with clarity.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/> },
]

const PRICING_INCLUDES = [
  'Personalized consultation and planning session',
  'Expert tool and platform selection guidance',
  'Hands-on coaching through build and deployment',
  'A live, working AI agent customized for you',
  'Skills and confidence to build more agents',
]

const TIMELINE_OPTIONS = ['Immediately', 'Within 2 weeks', 'Flexible']

const FAQS = [
  { q: 'Do I need coding experience?', a: 'No! This program is designed for beginners.' },
  { q: 'How long does the program take?', a: 'It is a 4-week guided sprint, flexible to your schedule.' },
  { q: "What if I don't know what agent to build?", a: "That's what the discovery call is for. We have a library of ideas." },
  { q: 'What tools and platforms do you support?', a: 'Zapier, Make, OpenAI, Python, and more.' },
  { q: 'Is this a course or hands-on training?', a: 'This is hands-on mentorship. You build a real product.' },
]

/* ── Hero code-terminal animation ─────────────────────────────── */
const CODE_LINES: { num: string; content: React.ReactNode }[] = [
  { num: '01', content: <><span className="tk-kw">import</span> <span className="tk-var">Agent</span> <span className="tk-kw">from</span> <span className="tk-str">&apos;koenig-core&apos;</span>;</> },
  { num: '02', content: null },
  { num: '03', content: <span className="tk-cm">// Define your objective</span> },
  { num: '04', content: <><span className="tk-kw">const</span> <span className="tk-var">myWorker</span> = <span className="tk-kw">new</span> Agent({'{'}</> },
  { num: '05', content: <>{'  '}role: <span className="tk-str">&apos;Data Analyst&apos;</span>,</> },
  { num: '06', content: <>{'  '}tools: [<span className="tk-str">&apos;Spreadsheets&apos;</span>, <span className="tk-str">&apos;Gmail&apos;</span>]</> },
  { num: '07', content: <>{'});'}</> },
  { num: '08', content: null },
  { num: '09', content: <>myWorker.<span className="tk-fn">deploy</span>();</> },
]

function AgentTerminal() {
  const [visible, setVisible] = useState(0)
  const [live, setLive] = useState(false)

  useEffect(() => {
    let alive = true
    let timer: ReturnType<typeof setTimeout>
    const run = (i: number) => {
      if (!alive) return
      setVisible(i)
      if (i < CODE_LINES.length) {
        timer = setTimeout(() => run(i + 1), 260)
      } else {
        timer = setTimeout(() => {
          if (!alive) return
          setLive(true)
          timer = setTimeout(() => {
            if (!alive) return
            setLive(false)
            setVisible(0)
            timer = setTimeout(() => run(1), 700)
          }, 3200)
        }, 450)
      }
    }
    run(1)
    return () => { alive = false; clearTimeout(timer) }
  }, [])

  return (
    <div className="aa-term" style={{ borderRadius: 14, overflow: 'hidden', background: '#0b1220', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: '#111b2e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
        <span style={{ marginLeft: 8, fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>koenig-agent-builder — bash</span>
      </div>
      <div style={{ padding: '22px 22px', fontFamily: "'Fira Code', 'SFMono-Regular', Consolas, monospace", fontSize: 13.5, lineHeight: 1.9, minHeight: 300 }}>
        {CODE_LINES.map((l, i) => (
          <div key={l.num} style={{ display: 'flex', gap: 16, opacity: i < visible ? 1 : 0, transition: 'opacity 0.25s' }}>
            <span style={{ color: 'rgba(255,255,255,0.25)', width: 18, flexShrink: 0, userSelect: 'none' }}>{l.num}</span>
            <span style={{ color: '#d4d4d4', whiteSpace: 'pre' }}>
              {l.content}
              {i === visible - 1 && !live && <span className="aa-cursor" />}
            </span>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 16, marginTop: 8, opacity: live ? 1 : 0, transition: 'opacity 0.3s' }}>
          <span style={{ width: 18, flexShrink: 0 }} />
          <span style={{ color: '#4ade80', fontWeight: 600 }}>
            &gt; Status: LIVE <span className="aa-live-dot" />
          </span>
        </div>
      </div>
      <style>{`
        .aa-term .tk-kw { color: #c792ea; }
        .aa-term .tk-str { color: #e5c07b; }
        .aa-term .tk-cm  { color: #6a9955; }
        .aa-term .tk-fn  { color: #56b6c2; }
        .aa-cursor { display: inline-block; width: 7px; height: 15px; background: #38bdf8; margin-left: 2px; vertical-align: -2px; animation: aaBlink 0.9s steps(1) infinite; }
        @keyframes aaBlink { 50% { opacity: 0; } }
        .aa-live-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #4ade80; margin-left: 6px; animation: aaPulse 1.4s ease-out infinite; }
        @keyframes aaPulse {
          0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.55); }
          70%  { box-shadow: 0 0 0 8px rgba(74,222,128,0); }
          100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
        }
      `}</style>
    </div>
  )
}

function DeployTerminal() {
  const check = (
    <span className="flex h-4 w-4 items-center justify-center rounded" style={{ background: '#16a34a', flexShrink: 0 }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}><polyline points="20 6 9 17 4 12"/></svg>
    </span>
  )
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(6,148,209,0.15)', boxShadow: '0 24px 60px rgba(6,148,209,0.18)' }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ background: '#f3f8fb', borderBottom: '1px solid #e3eef4' }}>
        <span className="text-sm font-semibold" style={{ color: '#0d1b2a' }}>Terminal - /project/deploy</span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#5b7690' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#5b7690"><path d="M6 19a5 5 0 0 1-1-9.9A6 6 0 0 1 17 8a4.5 4.5 0 0 1 0 9H6z"/></svg>
          v1.2.0
        </span>
      </div>
      <div className="p-5 space-y-3 text-sm" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
        <div className="rounded-lg px-3 py-2.5" style={{ background: '#f7f7f8', color: '#a3a3a3', textDecoration: 'line-through' }}>✗ Error: API Connection Refused (504)</div>
        <div className="rounded-lg px-3 py-2.5" style={{ background: '#f7f7f8', color: '#a3a3a3', textDecoration: 'line-through' }}>✗ Error: Variable &apos;userData&apos; is undefined</div>
        <div style={{ borderTop: '1px dashed #dbe7ee', margin: '16px 0' }} />
        <div style={{ color: '#0694D1', fontWeight: 600 }}>&gt; Mentor Session Initiated... Applying Fixes...</div>
        <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: '#eafaf0' }}>
          {check}
          <span style={{ color: '#166534', fontWeight: 600 }}>Connection Established</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: '#eafaf0' }}>
          {check}
          <span style={{ color: '#166534', fontWeight: 600 }}>Agent Deployed Successfully</span>
        </div>
      </div>
    </div>
  )
}

/* ── Registration form ──────────────────────────────────────── */
function RegisterForm() {
  const inputCls = 'w-full rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-white/35 transition-colors'
  const inputSty = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'white' }
  const selectSty = { background: '#0b1c2e', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.55)' }
  const optSty = { background: '#0b1c2e' }
  return (
    <>
      <div className="mb-3">
        <label className="block text-xs font-semibold mb-1.5 text-white">Full Name <span className="text-red-400">*</span></label>
        <input className={inputCls} style={inputSty} placeholder="John Doe" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div><label className="block text-xs font-semibold mb-1.5 text-white">Email Address <span className="text-red-400">*</span></label><input className={inputCls} style={inputSty} type="email" placeholder="john.doe@company.com" /></div>
        <div><label className="block text-xs font-semibold mb-1.5 text-white">Phone Number <span className="text-red-400">*</span></label><input className={inputCls} style={inputSty} type="tel" placeholder="+1 (555) 123-4567" /></div>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-semibold mb-1.5 text-white">What do you want your AI agent to accomplish?</label>
        <textarea className={`${inputCls} resize-none`} style={inputSty} rows={4} placeholder="Tell us about your goals and what you'd like to automate or build..." />
      </div>
      <div className="mb-5">
        <label className="block text-xs font-semibold mb-1.5 text-white">Preferred Start Timeline <span className="text-red-400">*</span></label>
        <select className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={selectSty}>
          <option value="" style={optSty}>Select Timeline</option>
          {TIMELINE_OPTIONS.map(o => <option key={o} style={optSty}>{o}</option>)}
        </select>
      </div>
      <div className="flex justify-center mb-5">
        <div className="inline-flex items-center gap-3 rounded-xl px-5 py-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#0694D1' }} />
          <span className="text-sm text-white">I&apos;m not a robot</span>
          <div className="ml-4 text-right"><p className="text-[9px] font-bold" style={{ color: '#4A90D9' }}>reCAPTCHA</p><p className="text-[8px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Privacy · Terms</p></div>
        </div>
      </div>
      <button type="button" className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #0694D1, #00B4D8)', boxShadow: '0 4px 20px rgba(6,148,209,0.40)' }}>Request Information</button>
      <p className="text-center text-xs mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>We respect your privacy. Your information will never be shared with third parties.</p>
    </>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function AiAgentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeStep, setActiveStep] = useState(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [pathPage, setPathPage] = useState(0)
  const pathTouchX = useRef<number>(0)
  const [featPage, setFeatPage] = useState(0)
  const featTotalPages = Math.ceil(DELIVERABLES.length / 2)
  const featTouchX = useRef<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % PATHWAY.length)
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ background: 'radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 45%, #040C18 100%)', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          @keyframes aaFloatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
          @keyframes aaFloatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(16px)} }
          .aa-blob1 { animation: aaFloatA 7s ease-in-out infinite; }
          .aa-blob2 { animation: aaFloatB 8s ease-in-out infinite; }
        `}</style>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="aa-blob1 absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="aa-blob2 absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-cyan-300/8 blur-3xl" />
          <div className="absolute inset-0" style={{ opacity: 0.25 }}><HeroParticles /></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 md:px-8 pt-5 pb-5 sm:pt-14 sm:pb-12" style={{ position: 'relative' }}>
          <div className="aa-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 460px', gap: 48, alignItems: 'center' }}>

            {/* Left: copy */}
            <div>
              <span className="inline-block rounded-full px-4 py-1 mb-[15px] sm:mb-5 text-xs font-bold tracking-widest" style={{ border: '1px solid rgba(6,148,209,0.55)', color: '#38bdf8' }}>KOENIG &quot;FIRST AGENT&quot; PROGRAM</span>
              <h1 className="font-bold leading-tight mb-[15px] sm:mb-4" style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: '#fff' }}>
                Build Your First <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI Agent.</span>
              </h1>
              <p className="text-sm sm:text-base mb-[15px] sm:mb-8 pl-4" style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, maxWidth: 560, borderLeft: '3px solid #0694D1' }}>
                The era of passive watching is over. Join the Koenig &quot;First Agent&quot; Program: A guided, hands-on sprint where you build, deploy, and own a functioning AI worker.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-[15px] sm:mb-7">
                <div className="rounded-2xl px-6 py-3" style={{ background: 'rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.35)' }}>
                  <span className="text-sm font-semibold mr-2" style={{ color: 'rgba(255,255,255,0.75)' }}>Program Cost:</span>
                  <span className="text-2xl font-extrabold" style={{ color: '#38bdf8' }}>$499</span>
                  <span className="text-sm ml-2" style={{ color: 'rgba(255,255,255,0.55)' }}>(One-Time)</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-[15px] sm:mb-8">
                <a href="#register" className="aa-cta-btn">
                  Start Building Now
                </a>
              </div>
              <style>{`
                .aa-cta-btn {
                  position: relative;
                  display: inline-block;
                  background: #0694D1;
                  color: #fff;
                  padding: 20px 45px;
                  font-weight: 700;
                  font-size: 16px;
                  letter-spacing: 1px;
                  text-transform: uppercase;
                  text-decoration: none;
                  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
                  transition: 0.3s;
                }
                .aa-cta-btn:hover { background: #076D9D; transform: translateY(-1px); }
              `}</style>

              <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <span className="inline-flex items-center gap-2"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#38bdf8" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>1-on-1 Expert Mentorship</span>
                <span className="inline-flex items-center gap-2"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#38bdf8" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>No Code or Low Code</span>
              </div>
            </div>

            {/* Right: animated code terminal */}
            <div className="aa-hero-term">
              <AgentTerminal />
            </div>
          </div>

        </div>

        <style>{`
          @media (max-width: 1023px) {
            .aa-hero-grid { grid-template-columns: 1fr !important; gap: 18px !important; }
          }
        `}</style>
      </section>

      {/* ── TOOL MARQUEE STRIP ───────────────────────────────────── */}
      <section style={{ background: '#0a1628', padding: '22px 0', overflow: 'hidden' }}>
        <div className="aa-marquee-track" style={{ display: 'flex', width: 'max-content' }}>
          {[...TOOLS, ...TOOLS].map((t, i) => (
            <span key={i} className="text-lg sm:text-2xl font-extrabold uppercase tracking-wide" style={{ padding: '0 32px', flexShrink: 0, color: i % 2 === 0 ? '#0694D1' : 'rgba(255,255,255,0.30)' }}>{t}</span>
          ))}
        </div>
        <style>{`
          .aa-marquee-track { animation: aaMarquee 28s linear infinite; }
          @keyframes aaMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        `}</style>
      </section>

      {/* ── SOCIAL PROOF STATS ───────────────────────────────────── */}
      <section className="aa-section" style={{ background: '#fff', padding: '28px 24px' }}>
        <div className="mx-auto max-w-5xl aa-stats-wrap flex flex-wrap items-center justify-center sm:justify-between gap-y-6 gap-x-10">
          {STATS.map((s, i) => (
            <div key={i} className="aa-stat-item flex items-center gap-3">
              <div className="aa-stat-icon" style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(6,148,209,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#0694D1">{s.icon}</svg>
              </div>
              <div>
                <div className="text-base font-extrabold" style={{ color: '#0d1b2a' }}>{s.value}</div>
                <div className="text-sm" style={{ color: '#5b7690' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .aa-stat-icon { animation: aaStatPulse 2.6s ease-out infinite; }
          @keyframes aaStatPulse {
            0%   { box-shadow: 0 0 0 0 rgba(6,148,209,0.35); }
            70%  { box-shadow: 0 0 0 10px rgba(6,148,209,0); }
            100% { box-shadow: 0 0 0 0 rgba(6,148,209,0); }
          }
          @media (max-width: 639px) {
            .aa-stats-wrap {
              flex-direction: column;
              align-items: stretch;
              gap: 0;
              background: rgba(6,148,209,0.06);
              border: 1px solid rgba(6,148,209,0.18);
              border-radius: 16px;
              padding: 4px 20px;
            }
            .aa-stat-item {
              padding: 14px 0;
              border-top: 1px solid rgba(6,148,209,0.18);
            }
            .aa-stat-item:first-child {
              border-top: none;
            }
          }
        `}</style>
      </section>

      {/* ── PROBLEM / SOLUTION ───────────────────────────────────── */}
      <section className="aa-section" style={{ background: '#eef7fc', padding: '56px 24px' }}>
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-[18px] lg:gap-12 items-center">
          <div>
            <h2 className="font-bold text-[26px] sm:text-[36px] mb-5" style={{ color: '#093148' }}>
              Escaping &quot;Tutorial Hell&quot;
            </h2>
            <p className="text-sm sm:text-base mb-6" style={{ color: '#4a6580', lineHeight: 1.75 }}>
              You&apos;ve tried to build agents before. You watched the videos, copied the code, but when you tried to customize it for your specific data, everything broke.
            </p>
            <div className="rounded-xl p-6" style={{ background: '#fff', borderLeft: '4px solid #0694D1', boxShadow: '0 4px 20px rgba(6,148,209,0.10)' }}>
              <p className="text-base font-bold mb-2" style={{ color: '#0694D1' }}>The Koenig Difference</p>
              <p className="text-sm sm:text-base" style={{ color: '#4a6580', lineHeight: 1.75 }}>
                We don&apos;t just dump content on you. We partner you with an expert mentor to ensure your architecture is robust and secure.
              </p>
            </div>
          </div>
          <DeployTerminal />
        </div>
      </section>

      {/* ── IMPLEMENTATION PATHWAY ───────────────────────────────── */}
      <section className="aa-section" style={{ background: '#fff', padding: '64px 24px' }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-bold text-[26px] sm:text-[38px] mb-3" style={{ color: '#093148' }}>
            A simple path from idea to live AI agent
          </h2>
          <p className="text-center text-sm sm:text-base mb-[18px] sm:mb-12" style={{ color: '#5b7690' }}>
            We guide you from first conversation to launch, one clear step at a time.
          </p>
          <div className="relative">
            {(() => {
              const pathCard = (p: typeof PATHWAY[number], i: number) => (
                <div key={p.step} onMouseEnter={() => setHoveredStep(i)} onMouseLeave={() => setHoveredStep(null)}
                  className="rounded-2xl p-6" style={{
                    background: '#fff',
                    border: (hoveredStep ?? activeStep) === i ? '2px solid #0694D1' : '1px solid #e6eef3',
                    boxShadow: (hoveredStep ?? activeStep) === i ? '0 8px 24px rgba(6,148,209,0.18)' : 'none',
                    transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                  }}>
                  <p className="flex items-center gap-1.5 text-xs font-bold tracking-widest mb-2" style={{ color: '#0694D1' }}>
                    STEP {p.step}
                    <svg className="aa-step-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </p>
                  <h3 className="text-base font-bold mb-3" style={{ color: '#093148' }}>{p.title}</h3>
                  <p className="text-sm mb-5" style={{ color: '#5b7690', lineHeight: 1.6 }}>{p.desc}</p>
                  <div className="flex items-center gap-1.5">
                    {PATHWAY.map((_, j) => (
                      j <= i
                        ? <span key={j} style={{ width: 16, height: 6, borderRadius: 4, background: '#093148' }} />
                        : <span key={j} style={{ width: 6, height: 6, borderRadius: '50%', background: '#bfe3f5' }} />
                    ))}
                  </div>
                </div>
              )
              return (
                <>
                  {/* Mobile: 1-per-slide with arrows + dots */}
                  <div className="block sm:hidden">
                    <div
                      onTouchStart={e => { pathTouchX.current = e.touches[0].clientX }}
                      onTouchEnd={e => {
                        const diff = pathTouchX.current - e.changedTouches[0].clientX
                        if (diff > 50 && pathPage < PATHWAY.length - 1) setPathPage(p => p + 1)
                        if (diff < -50 && pathPage > 0) setPathPage(p => p - 1)
                      }}>
                      {pathCard(PATHWAY[pathPage], pathPage)}
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <button onClick={() => setPathPage(p => Math.max(0, p - 1))}
                        style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(6,148,209,0.4)', background: 'rgba(6,148,209,0.08)', cursor: pathPage === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pathPage === 0 ? 0.35 : 1, transition: 'opacity 0.2s' }}>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                      </button>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {PATHWAY.map((_, i) => (
                          <button key={i} onClick={() => setPathPage(i)}
                            style={{ width: i === pathPage ? 20 : 8, height: 8, borderRadius: 999, background: i === pathPage ? '#0694D1' : 'rgba(6,148,209,0.30)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
                        ))}
                      </div>
                      <button onClick={() => setPathPage(p => Math.min(PATHWAY.length - 1, p + 1))}
                        style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(6,148,209,0.4)', background: 'rgba(6,148,209,0.08)', cursor: pathPage === PATHWAY.length - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pathPage === PATHWAY.length - 1 ? 0.35 : 1, transition: 'opacity 0.2s' }}>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  </div>

                  {/* Desktop: full grid */}
                  <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PATHWAY.map((p, i) => pathCard(p, i))}
                  </div>
                </>
              )
            })()}
          </div>
          <style>{`
            .aa-step-arrow { animation: aaArrowMove 1.4s ease-in-out infinite; }
            @keyframes aaArrowMove {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(4px); }
            }
          `}</style>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────────────────── */}
      <section className="aa-section aa-got-section" style={{ background: '#f8fcff', padding: '56px 24px' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-[18px] sm:mb-10">
            <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#0694D1' }}>WHAT YOU GET</p>
            <h2 className="font-bold text-[26px] sm:text-[36px] mb-3" style={{ color: '#093148' }}>
              A working agent-and the skills to build more.
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#5b7690' }}>
              You don&apos;t just learn &quot;about&quot; AI. You leave with something live, useful, and built around your work.
            </p>
          </div>
          {(() => {
            const featCard = (d: typeof DELIVERABLES[number], i: number) => (
              <div key={i} className="aa-feat-card rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #8FCBEF', boxShadow: '0 6px 20px rgba(6,148,209,0.18)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(6,148,209,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1">{d.icon}</svg>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0694D1', lineHeight: 1.3, margin: 0 }}>{d.title}</h3>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: '#4a6580', margin: 0 }}>{d.desc}</p>
              </div>
            )
            return (
              <>
                {/* Mobile: 2-per-slide with arrows + dots */}
                <div className="block sm:hidden">
                  <div
                    onTouchStart={e => { featTouchX.current = e.touches[0].clientX }}
                    onTouchEnd={e => {
                      const diff = featTouchX.current - e.changedTouches[0].clientX
                      if (diff > 50 && featPage < featTotalPages - 1) setFeatPage(p => p + 1)
                      if (diff < -50 && featPage > 0) setFeatPage(p => p - 1)
                    }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {DELIVERABLES.slice(featPage * 2, featPage * 2 + 2).map((d, i) => featCard(d, featPage * 2 + i))}
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <button onClick={() => setFeatPage(p => Math.max(0, p - 1))}
                      style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(6,148,209,0.4)', background: 'rgba(6,148,209,0.08)', cursor: featPage === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: featPage === 0 ? 0.35 : 1, transition: 'opacity 0.2s' }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {Array.from({ length: featTotalPages }).map((_, i) => (
                        <button key={i} onClick={() => setFeatPage(i)}
                          style={{ width: i === featPage ? 20 : 8, height: 8, borderRadius: 999, background: i === featPage ? '#0694D1' : 'rgba(6,148,209,0.30)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
                      ))}
                    </div>
                    <button onClick={() => setFeatPage(p => Math.min(featTotalPages - 1, p + 1))}
                      style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(6,148,209,0.4)', background: 'rgba(6,148,209,0.08)', cursor: featPage === featTotalPages - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: featPage === featTotalPages - 1 ? 0.35 : 1, transition: 'opacity 0.2s' }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>

                {/* Desktop: full grid */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {DELIVERABLES.map((d, i) => featCard(d, i))}
                </div>
              </>
            )
          })()}
          <style>{`
            .aa-feat-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
            .aa-feat-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(6,148,209,0.15) !important; }
          `}</style>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section className="aa-section aa-pricing-section" style={{ background: '#f8fcff', padding: '56px 24px' }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] rounded-2xl overflow-hidden" style={{ background: '#07304a', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
            {/* Left: copy + checklist */}
            <div className="p-8 sm:p-12">
              <h2 className="font-bold text-[24px] sm:text-[32px] mb-3 text-white">Simple, Transparent Pricing</h2>
              <p className="text-sm sm:text-base mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Everything you need to succeed, bundled into one guided experience.
              </p>
              <ul className="space-y-4">
                {PRICING_INCLUDES.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <svg width="18" height="18" className="mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#38bdf8" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: price + CTA */}
            <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12" style={{ background: 'rgba(0,0,0,0.12)' }}>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.65)' }}>One-Time Investment</p>
              <div className="mb-6">
                <span className="text-5xl sm:text-6xl font-extrabold text-white">$499</span>
              </div>
              <a href="#register" className="w-full rounded-xl py-3.5 text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: '#fff', color: '#0694D1' }}>Get Started</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── REGISTER FORM ────────────────────────────────────────── */}
      <section id="register" className="aa-section" style={{ background: 'linear-gradient(160deg, #07111e 0%, #0a1828 100%)', padding: '48px 24px' }}>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl px-6 sm:px-10 py-8 sm:py-9"
            style={{ background: 'linear-gradient(160deg, #091828 0%, #0c1f34 100%)', border: '1px solid rgba(6,148,209,0.25)', boxShadow: '0 0 0 1px rgba(6,148,209,0.08), 0 24px 60px rgba(0,0,0,0.5)' }}>
            <h2 className="text-center font-bold text-white text-[20px] sm:text-[32px]" style={{ marginBottom: 15 }}>Request More Information</h2>
            <p className="text-center text-sm mb-8" style={{ color: 'rgba(255,255,255,0.42)' }}>Fill out the form below. Our team will contact you within 24 hours to discuss your AI goals.</p>
            <RegisterForm />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="aa-section relative overflow-hidden" style={{ background: '#f0f9ff', padding: '56px 24px' }}>
        <div className="pointer-events-none absolute left-0 bottom-0 h-[450px] w-[450px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.30) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.28) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.22) 0%, transparent 70%)' }} />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="font-bold text-[20px] sm:text-[32px] mb-3" style={{ color: '#0d1b2a' }}>
              Frequently Asked <span style={{ background: 'linear-gradient(135deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Questions</span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#5b7690' }}>Everything you need to know before you start building</p>
          </div>

          {/* Desktop: two-column layout */}
          <div className="hidden sm:flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 === 0).map((f, j) => {
                const i = j * 2; const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl border" style={{ background: '#ffffff', borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-6 sm:py-4">
                      <span className="text-sm font-semibold leading-snug sm:text-base" style={{ color: isOpen ? '#0694d1' : '#0d1b2a', transition: 'color 0.3s' }}>{f.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div className="border-t px-4 py-3 text-sm leading-relaxed sm:px-6 sm:py-4 sm:text-base" style={{ borderColor: '#EBF8FE', color: '#5b7690' }}>{f.a}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 !== 0).map((f, j) => {
                const i = j * 2 + 1; const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl border" style={{ background: '#ffffff', borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-6 sm:py-4">
                      <span className="text-sm font-semibold leading-snug sm:text-base" style={{ color: isOpen ? '#0694d1' : '#0d1b2a', transition: 'color 0.3s' }}>{f.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div className="border-t px-4 py-3 text-sm leading-relaxed sm:px-6 sm:py-4 sm:text-base" style={{ borderColor: '#EBF8FE', color: '#5b7690' }}>{f.a}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile: single-column */}
          <div className="sm:hidden flex flex-col gap-3">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className="rounded-xl border" style={{ background: '#ffffff', borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left">
                    <span className="text-sm font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#0d1b2a', transition: 'color 0.3s' }}>{f.q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <div className="border-t px-4 py-3 text-sm leading-relaxed" style={{ borderColor: '#EBF8FE', color: '#5b7690' }}>{f.a}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .aa-section { padding-left: 16px !important; padding-right: 16px !important; padding-top: 28px !important; padding-bottom: 28px !important; }
          .aa-got-section { padding-bottom: 0 !important; }
          .aa-pricing-section { padding-top: 18px !important; }
        }
      `}</style>
    </div>
  )
}

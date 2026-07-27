'use client'
import { useState, useEffect, useRef, type ReactNode } from 'react'
import { Bricolage_Grotesque } from 'next/font/google'
import Navbar from '@/components/Navbar'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' })

/* ── Data ───────────────────────────────────────────────────── */
const SUB_NAV_LINKS = [
  { label: 'Use-Case Generator', href: '#generator' },
  { label: 'What’s Included', href: '#included' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQs', href: '#faqs' },
]

const HERO_BADGES = [
  {
    label: 'Built for Your Use Cases',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={1.5}><circle cx="12" cy="12" r="9" /><polygon points="15.5,8.5 10.5,10.5 8.5,15.5 13.5,13.5" fill="#38bdf8" stroke="none" /></svg>,
  },
  {
    label: 'Hands-On with Real Tools',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={1.5} strokeLinejoin="round"><path d="M4 4L13 22L15.5 14L22 11.5Z" /></svg>,
  },
  {
    label: 'Test in a Live Sandbox',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={1.5}><rect x="3" y="3" width="5" height="5" rx="1" /><rect x="9.5" y="3" width="5" height="5" rx="1" /><rect x="16" y="3" width="5" height="5" rx="1" /><rect x="3" y="9.5" width="5" height="5" rx="1" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /><rect x="16" y="9.5" width="5" height="5" rx="1" /><rect x="3" y="16" width="5" height="5" rx="1" /><rect x="9.5" y="16" width="5" height="5" rx="1" /><rect x="16" y="16" width="5" height="5" rx="1" /></svg>,
  },
]

const DISCOVERY_POINTS = [
  'Custom-built around your team’s roles',
  'Hands-on workshops with domain experts',
  'Capability that sticks, not just a certificate',
]

const FUNCTIONS = ['Marketing', 'Sales', 'HR', 'Finance', 'IT & Engineering', 'Customer Support', 'Other']

const USE_CASE_SUGGESTIONS: Record<string, string[]> = {
  'Marketing': [
    'Draft on-brand ad copy and social captions in your team’s voice',
    'Generate micro-segmented email variants at scale',
    'Turn campaign data into next-week budget recommendations',
  ],
  'Sales': [
    'Score inbound leads by real intent signals, not just form fills',
    'Auto-draft personalized outreach and follow-up sequences',
    'Summarize call recordings into coachable moments for reps',
  ],
  'HR': [
    'Screen and rank resumes against role requirements in minutes',
    'Run a 24/7 recruiting chatbot for candidate FAQs and scheduling',
    'Build individual learning paths tied to skill gaps',
  ],
  'Finance': [
    'Flag duplicate payments and policy breaches in real time',
    'Draft management commentary during month-end close',
    'Run rolling forecasts across best-case and worst-case scenarios',
  ],
  'IT & Engineering': [
    'Pair-program with AI directly inside your IDE',
    'Auto-summarize pull requests and flag likely vulnerabilities',
    'Triage security alerts and cut investigation time',
  ],
  'Customer Support': [
    'Deploy a virtual agent that resolves routine tickets instantly',
    'Auto-route tickets by intent, urgency, and language',
    'Score 100% of calls for sentiment and compliance, not just a sample',
  ],
  'Other': [
    'Tell us your team’s function on the discovery call',
    'We’ll map use cases to your actual workflows, not a generic list',
    'Every program starts with what your team does today',
  ],
}

const PROBLEMS = [
  {
    n: '01', title: 'They don’t know where to start.',
    desc: 'Too many tools. Too much noise. Most teams freeze before they begin.',
  },
  {
    n: '02', title: 'The training doesn’t fit their needs.',
    desc: 'A marketer’s AI training shouldn’t look like a developer’s. One-size-fits-all doesn’t work.',
  },
  {
    n: '03', title: 'They don’t know how to apply it after.',
    desc: 'Training ends. Certificates get filed. Nothing in the team’s day-to-day actually changes.',
  },
]

const PROGRAM_COMPONENTS = [
  {
    title: 'Hands-On Workshops',
    desc: 'No passive lectures. Your team builds, prompts, and ships during the session itself.',
  },
  {
    title: 'Expert-Led Mentorship',
    desc: 'Trainers who are working technical experts in their domains, not generalist instructors reading slides.',
  },
  {
    title: 'Role-Specific Use Cases',
    desc: 'Workshops shaped around what each role actually does. Marketing learns marketing AI. Sales learns sales AI.',
  },
  {
    title: 'Tools (On Request)',
    desc: 'Subscription to the AI tools can be provided at cost.',
  },
  {
    title: 'Outcome-Led Promise',
    desc: 'Your team doesn’t finish a course. They finish capable of doing specific work with AI that they couldn’t do before.',
  },
  {
    title: 'Live Sandbox',
    desc: 'A safe environment to practise on your own data, with your own constraints, before applying it to live work.',
  },
]

const ROLE_CAPABILITIES: Record<string, { title: string; desc: string }[]> = {
  'Marketing': [
    { title: 'AI-Assisted Content Creation', desc: 'Drafting blog posts, social copy, ad creative, scripts, and email sequences with generative AI, then editing for brand voice.' },
    { title: 'Hyper-Personalization at Scale', desc: 'Tailoring email, web, and ad content to micro-segments using AI to generate variants and match them to behavioural signals.' },
    { title: 'Marketing Research and Competitive Insight', desc: 'Synthesizing market reports, competitor pages, reviews, and earnings calls into briefs and SWOTs.' },
    { title: 'Campaign Analytics and Performance Optimization', desc: 'Using AI to analyze multi-channel performance, attribute revenue, and recommend budget reallocations.' },
    { title: 'Creative Production (Image, Video, Audio)', desc: 'Generating images, short-form video, voiceovers, and design variants without an external agency.' },
    { title: 'Lifecycle Email and Customer Journey Automation', desc: 'AI drafting and optimizing lifecycle emails, subject lines, send-time, and follow-ups.' },
  ],
  'Sales': [
    { title: 'AI-Powered Prospecting and Lead Scoring', desc: 'Using AI to identify high-fit accounts, score leads and prioritize outreach based on intent signals.' },
    { title: 'AI-Generated Outreach and Personalized Email', desc: 'Drafting first-touch and follow-up emails, LinkedIn messages, and call openers tailored to the prospect.' },
    { title: 'Call Recording, Transcription and Conversation Intelligence', desc: 'Auto-recording, transcribing, and summarizing calls; surfacing coachable moments and objections.' },
    { title: 'Sales Forecasting and Pipeline Health', desc: 'AI surfacing pipeline risk, deal stage anomalies, and projected closed-won outcomes.' },
    { title: 'Proposal, Quote and Contract Drafting', desc: 'AI assembling tailored proposals, generating quotes, and red-lining contracts.' },
    { title: 'Account Research and Pre-Call Briefs', desc: 'Auto-generating pre-meeting briefs from 10-Ks, news, social, CRM history, and intent data.' },
  ],
  'HR': [
    { title: 'Job Description and Job Posting Generation', desc: 'Drafting role descriptions, requirements, and inclusive language using AI.' },
    { title: 'Resume Screening and Candidate Matching', desc: 'AI parsing resumes, ranking candidates against role requirements, and surfacing hidden matches.' },
    { title: 'Recruiting Chatbots and Candidate Engagement', desc: 'AI assistants that engage candidates 24/7, answer FAQs, and schedule interviews.' },
    { title: 'HR Self-Service Assistants and Policy Q&A', desc: 'AI agents that handle benefits, PTO, payroll, and policy questions and execute common transactions.' },
    { title: 'Onboarding Automation and New-Hire Assistants', desc: 'AI agents that walk new hires through paperwork, policies, training plans, and role-specific learning.' },
    { title: 'Personalized Learning and Development', desc: 'AI recommending learning paths, generating training content, and tracking skill progress per employee.' },
  ],
  'Finance': [
    { title: 'Knowledge Management and Policy Q&A', desc: 'AI assistants that answer accounting policy, GL, tax, and compliance questions instantly.' },
    { title: 'Accounts Payable and Invoice Processing', desc: 'AI extracting invoice data, matching to POs, routing approvals, and flagging exceptions.' },
    { title: 'Error, Anomaly Detection and Audit Support', desc: 'AI flagging unusual transactions, duplicate payments, and policy breaches in real time.' },
    { title: 'Financial Reporting and Month-End Close Acceleration', desc: 'AI drafting management commentary, reconciling accounts, and accelerating consolidation.' },
    { title: 'FP&A Forecasting and Scenario Modelling', desc: 'AI-driven rolling forecasts, scenario plans, and predictive models incorporating internal and external data.' },
    { title: 'Tax Automation and Compliance Drafting', desc: 'AI summarizing tax law, drafting filings, and matching transactions to tax treatment.' },
  ],
  'IT & Engineering': [
    { title: 'Code Generation and Pair Programming', desc: 'Real-time AI completions and full-function generation inside the IDE.' },
    { title: 'Code Review and Pull-Request Assistance', desc: 'AI explaining diffs, suggesting refactors, flagging vulnerabilities, and auto-summarizing PRs.' },
    { title: 'Debugging and Code Explanation', desc: 'Asking AI to explain unfamiliar code, diagnose errors, and propose fixes.' },
    { title: 'Documentation, READMEs and API Specs', desc: 'AI drafting technical documentation, READMEs, OpenAPI specs, and inline comments from code.' },
    { title: 'SOC Operations and Threat Triage', desc: 'AI agents triaging phishing alerts, summarizing incidents, and accelerating SOC investigations.' },
    { title: 'IT Service Desk and Knowledge Management', desc: 'AI agents for IT helpdesk, password resets, software requests, and how-to queries.' },
  ],
  'Customer Support': [
    { title: 'AI Chatbots and Virtual Agents (Customer-Facing)', desc: 'Conversational AI on web, app, and messaging channels that resolves customer queries without a human.' },
    { title: 'Agent Assist and Real-Time Recommendations', desc: 'AI co-pilot for human agents surfacing relevant KB articles, drafting replies, and recommending next-best actions during a live interaction.' },
    { title: 'Case Summarization and Wrap-Up Automation', desc: 'AI auto-generating call summaries, case notes, and disposition codes after each interaction.' },
    { title: 'Sentiment Analysis and Quality Assurance', desc: 'AI scoring 100% of calls/chats for sentiment, compliance, and coaching opportunities.' },
    { title: 'Intelligent Ticket Routing and Triage', desc: 'AI classifying incoming tickets by intent, urgency, and language and routing to the right queue or AI agent.' },
    { title: 'Self-Service and Conversational Search', desc: 'AI-powered search and guided journeys that let customers solve issues themselves.' },
  ],
}

const PROCESS_STEPS = [
  { step: '01', title: 'Free Discovery Call', desc: 'A 30-minute conversation. We learn your team’s roles, current AI maturity, and the outcomes you’re after.' },
  { step: '02', title: 'Custom Curriculum Design', desc: 'We map your team’s roles to use cases and design a workshop plan around them. Tools, modules, and outcomes, all tailored to roles.' },
  { step: '03', title: 'Hands-On Workshops', desc: 'Live sessions led by domain experts. Your team builds, prompts, and ships real work using the tools they’ll keep using.' },
  { step: '04', title: 'Sandbox to Live Work', desc: 'Your team practises on their own data in a safe environment, then applies it straight to their day-to-day work.' },
]

const FAQS = [
  { q: 'How is this different from a regular AI course?', a: 'A regular course teaches you about AI. This trains your team to do their actual jobs differently with AI. The curriculum, tools, and outcomes are all built around your team’s specific roles, not a generic syllabus.' },
  { q: 'Who is this designed for?', a: 'Any team or professional who needs to apply AI in their day-to-day work. We’ve built programs for marketing, sales, L&D, product, business analysis, project management, IT, operations, and leadership. If your role uses AI, we can shape a program around it.' },
  { q: 'What if I’m an individual, not a team?', a: <>This program is built for organisations and teams. If you’re an individual looking to skill up on AI, we have a full catalogue of self-paced and instructor-led AI courses you can browse and enrol in directly. <a href="/search" className="font-semibold" style={{ color: '#0694D1' }}>Explore all our AI courses here.</a></> },
  { q: 'What does it cost?', a: 'Pricing depends on your team size, the use cases involved, and the tools required. We share a tailored proposal after the discovery call so you’re only paying for what your team actually needs.' },
  { q: 'How long does a program run?', a: 'It varies. Some engagements are a focused two-day workshop, others run across several weeks with multiple sessions and sandbox time. We design the timeline around your team’s availability and the depth of capability you’re after.' },
  { q: 'Do we need to bring our own AI tool subscriptions?', a: 'No. The cost of the AI tools used in the program is included. Your team gets access for the duration of the engagement so there are no extra licences to procure on your end.' },
  { q: 'Can the program be delivered remotely?', a: 'Yes. Programs run in-person, fully remote, or as a hybrid mix. Our trainers operate across time zones and we structure sessions around your team’s location and working hours.' },
  { q: 'What about data privacy in the sandbox?', a: 'The sandbox is an isolated environment built for safe practice. Your team can work with realistic data without exposing live systems or sensitive information. We also align with your organisation’s data and security policies before the program begins.' },
  { q: 'What happens after the program ends?', a: 'Your team walks away with the capability to apply AI to their work independently, plus reference materials and prompt libraries from the sessions. For organisations that want ongoing support, we offer follow-up engagements and refresher workshops.' },
]

/* ── Small mock components ─────────────────────────────────── */
const HERO_VIDEO_ID = 'gcNR-fvVxYs'

function BeastHeroVideo() {
  const [muted, setMuted] = useState(true)
  const src = `https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${HERO_VIDEO_ID}&modestbranding=1&rel=0&playsinline=1&controls=0&showinfo=0&iv_load_policy=3`
  return (
    <div className="bs-hero-phone">
      <div className="bs-hero-phone__frame">
        <div className="bs-hero-phone__screen">
          <iframe
            key={muted ? 'muted' : 'unmuted'}
            className="bs-hero-phone__video"
            src={src}
            title="AI is a different beast. A short look at how Koenig trains teams to use AI on their actual workflows."
            frameBorder={0}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
          <button
            type="button"
            onClick={() => setMuted(m => !m)}
            className="bs-hero-phone__sound"
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            aria-pressed={!muted}
          >
            {muted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M11 5L6 9H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3l5 4z" fill="currentColor" />
                <path d="M16 9l5 5M21 9l-5 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" fill="none" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M11 5L6 9H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3l5 4z" fill="currentColor" />
                <path d="M15.5 8.5a5 5 0 010 7M18.5 6a8 8 0 010 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" fill="none" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const PROBLEM_TOOLS = [
  { name: 'ChatGPT', icon: <circle cx="7" cy="7" r="6" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.3} /> },
  { name: 'Claude', icon: <polygon points="7,1 13,7 7,13 1,7" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.3} /> },
  { name: 'Gemini', icon: <polygon points="7,1 13,12 1,12" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.3} /> },
  { name: 'Copilot', icon: <circle cx="7" cy="7" r="6" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.3} /> },
]

function ProblemMock({ n }: { n: string }) {
  if (n === '01') {
    return (
      <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <p className="text-[11px] mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Choosing your AI tool…</p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {PROBLEM_TOOLS.map(t => (
            <div key={t.name} className="flex items-center gap-2 rounded-lg px-2.5 py-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" className="flex-shrink-0">{t.icon}</svg>
              <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{t.name}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex items-center justify-center rounded-full flex-shrink-0 text-[9px] font-bold" style={{ width: 14, height: 14, background: '#38bdf8', color: '#0a2540' }}>?</span>
          <span className="text-[11px] font-medium" style={{ color: '#38bdf8' }}>Where do I even start?</span>
        </div>
      </div>
    )
  }
  if (n === '02') {
    return (
      <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <p className="text-[11px] mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Available Training:</p>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 min-w-0 rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 16, height: 16, background: '#0694D1' }}>
                <svg width="7" height="7" viewBox="0 0 24 24" fill="#fff"><polygon points="6,4 20,12 6,20" /></svg>
              </span>
              <span className="flex-1 rounded-full" style={{ height: 3, background: 'rgba(255,255,255,0.15)' }} />
            </div>
            <p className="text-[11px] font-bold truncate" style={{ color: '#fff' }}>AI Fundamentals 101</p>
            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Module 4 of 12</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" className="flex-shrink-0" fill="none" stroke="#38bdf8" strokeWidth={2.5}><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
          <div className="flex flex-col gap-1.5 flex-shrink-0">
            {['Marketing', 'Sales', 'L&D'].map(r => (
              <span key={r} className="flex items-center justify-between gap-2.5 rounded-md px-2 py-1 text-[10px] font-semibold" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }}>
                {r}
                <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 11, height: 11, background: 'rgba(255,255,255,0.15)', fontSize: 8 }}>?</span>
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
          <span className="text-[11px] font-medium" style={{ color: '#38bdf8' }}>Doesn&apos;t match my role</span>
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
      <p className="text-[11px] mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>What happens after training:</p>
      <p className="text-[11px] mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>Application of skills over time</p>
      <div className="relative mb-2" style={{ height: 10 }}>
        <div className="absolute left-0 right-0" style={{ top: 4, height: 1, borderTop: '1px dashed rgba(255,255,255,0.25)' }} />
        {[0, 33, 66, 100].map((pos, i) => (
          <span key={pos} className="absolute rounded-full" style={{ left: `${pos}%`, top: 0, width: 10, height: 10, transform: 'translateX(-50%)', background: i === 0 ? '#38bdf8' : 'rgba(255,255,255,0.25)' }} />
        ))}
      </div>
      <div className="flex justify-between text-[9px]">
        <span className="font-semibold" style={{ color: '#38bdf8' }}>Training Complete</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>Week 1</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>Week 4</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>Week 12</span>
      </div>
      <p className="text-center text-[11px] mt-4" style={{ color: '#38bdf8' }}>Skills fade. Habits return.</p>
    </div>
  )
}

function ProgramMock({ title }: { title: string }) {
  if (title === 'Hands-On Workshops') {
    return (
      <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-bold" style={{ color: '#fff' }}>Marketing Workshop</span>
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold" style={{ background: 'rgba(56,189,248,0.18)', color: '#38bdf8' }}>
            <span className="rounded-full flex-shrink-0" style={{ width: 5, height: 5, background: '#38bdf8' }} /> LIVE · 8
          </span>
        </div>
        <p className="text-[11px] mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Building: AI ad variants for Q4</p>
        <div className="rounded-full mb-3" style={{ height: 4, background: 'rgba(255,255,255,0.12)' }}>
          <div style={{ width: '65%', height: '100%', borderRadius: 999, background: '#0694D1' }} />
        </div>
        <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: 'rgba(6,148,209,0.18)', color: '#38bdf8' }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg> Hands on
        </span>
      </div>
    )
  }
  if (title === 'Expert-Led Mentorship') {
    return (
      <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <div className="flex items-center gap-2.5 mb-3">
          <span className="flex items-center justify-center rounded-full flex-shrink-0 text-[11px] font-bold" style={{ width: 30, height: 30, background: '#0694D1', color: '#fff' }}>K</span>
          <div>
            <p className="text-[12px] font-bold leading-tight" style={{ color: '#fff' }}>Karthik R.</p>
            <p className="text-[10px] leading-tight" style={{ color: 'rgba(255,255,255,0.45)' }}>Microsoft Certified Trainer</p>
          </div>
        </div>
        <p className="text-[11px] mb-2.5" style={{ color: 'rgba(255,255,255,0.55)' }}>12+ years · 2,400+ trained</p>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: '#38bdf8' }}>
          <span className="rounded-full flex-shrink-0" style={{ width: 5, height: 5, background: '#38bdf8' }} /> Currently mentoring · 3 active workshops
        </span>
      </div>
    )
  }
  if (title === 'Role-Specific Use Cases') {
    return (
      <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <p className="text-[11px] mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Your role-specific path</p>
        <div className="space-y-1.5 mb-2">
          {[
            { r: 'Marketing', c: 'Build AI ad campaigns' },
            { r: 'Sales', c: 'Auto-summarise calls' },
            { r: 'L&D', c: 'Generate training content' },
          ].map(x => (
            <div key={x.r} className="flex items-center gap-1.5 text-[11px]">
              <span className="font-bold" style={{ color: '#fff' }}>{x.r}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>{x.c}</span>
            </div>
          ))}
        </div>
        <span className="text-[11px] font-semibold" style={{ color: '#38bdf8' }}>+9 more roles</span>
      </div>
    )
  }
  if (title === 'Tools (On Request)') {
    return (
      <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <p className="text-[11px] mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Included in your program:</p>
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {PROBLEM_TOOLS.map(t => (
            <div key={t.name} className="flex flex-col items-center gap-1 rounded-lg py-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14">{t.icon}</svg>
              <span className="text-[9px] font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.name}</span>
            </div>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: 'rgba(6,148,209,0.18)', color: '#38bdf8' }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg> All licences covered
        </span>
      </div>
    )
  }
  if (title === 'Outcome-Led Promise') {
    return (
      <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>BEFORE TRAINING</span>
          <span className="text-[10px] font-bold tracking-wide" style={{ color: '#38bdf8' }}>AFTER TRAINING</span>
        </div>
        <div className="flex items-center gap-2 mb-3 text-[11px]">
          <span className="flex items-center gap-1.5 flex-1 min-w-0" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <span className="rounded-full flex-shrink-0" style={{ width: 6, height: 6, border: '1.5px solid rgba(255,255,255,0.45)' }} />
            <span className="truncate">Manual ad copy writing</span>
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" className="flex-shrink-0" fill="none" stroke="#38bdf8" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
          <span className="flex items-center gap-1.5 flex-1 min-w-0" style={{ color: '#fff' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" className="flex-shrink-0" fill="none" stroke="#38bdf8" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            <span className="truncate">AI-powered ad generation</span>
          </span>
        </div>
        <p className="text-center text-[11px] font-semibold" style={{ color: '#38bdf8' }}>Capability, not certification</p>
      </div>
    )
  }
  return (
    <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
      <div className="flex items-center gap-1.5 mb-3">
        <span className="flex gap-1 flex-shrink-0">
          <span className="rounded-full" style={{ width: 5, height: 5, background: 'rgba(255,255,255,0.3)' }} />
          <span className="rounded-full" style={{ width: 5, height: 5, background: 'rgba(255,255,255,0.3)' }} />
          <span className="rounded-full" style={{ width: 5, height: 5, background: 'rgba(255,255,255,0.3)' }} />
        </span>
        <span className="flex-1 truncate text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>sandbox.koenig-solutions.com</span>
        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold flex-shrink-0" style={{ background: 'rgba(56,189,248,0.18)', color: '#38bdf8' }}>
          <span className="rounded-full flex-shrink-0" style={{ width: 4, height: 4, background: '#38bdf8' }} /> LIVE
        </span>
      </div>
      <p className="text-[12px] font-bold mb-0.5" style={{ color: '#fff' }}>Your team&apos;s workspace</p>
      <p className="text-[11px] mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>Test on your data</p>
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: 'rgba(6,148,209,0.18)', color: '#38bdf8' }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2.5}><rect x="3" y="3" width="18" height="18" rx="3" /></svg> Safe to experiment
      </span>
    </div>
  )
}

/* ── Role capability mock primitives ───────────────────────── */
function MPill({ children, tone = 'blue' }: { children: ReactNode; tone?: 'blue' | 'gray' }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold flex-shrink-0" style={{ background: tone === 'blue' ? 'rgba(56,189,248,0.18)' : 'rgba(255,255,255,0.08)', color: tone === 'blue' ? '#38bdf8' : 'rgba(255,255,255,0.55)' }}>
      {children}
    </span>
  )
}
function MBar({ pct, color = '#0694D1' }: { pct: number; color?: string }) {
  return (
    <div className="rounded-full" style={{ height: 4, background: 'rgba(255,255,255,0.12)' }}>
      <div style={{ width: `${pct}%`, height: '100%', borderRadius: 999, background: color }} />
    </div>
  )
}
function MCheck() {
  return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
}
function MHeader({ title, badge }: { title: string; badge?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 mb-3">
      <span className="text-[12px] font-bold truncate" style={{ color: '#fff' }}>{title}</span>
      {badge}
    </div>
  )
}
function MScoreList({ items }: { items: { label: string; value: string; top?: boolean }[] }) {
  return (
    <div className="space-y-1.5 mb-3">
      {items.map(it => (
        <div key={it.label} className="flex items-center justify-between rounded-lg px-2.5 py-1.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <span className="flex items-center gap-2 text-[11px] font-medium" style={{ color: '#fff' }}>
            <span className="rounded-full flex-shrink-0" style={{ width: 7, height: 7, background: it.top ? '#38bdf8' : 'rgba(255,255,255,0.25)' }} />
            {it.label}
          </span>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-bold flex-shrink-0" style={{ background: it.top ? '#0694D1' : 'rgba(255,255,255,0.1)', color: '#fff' }}>{it.value}</span>
        </div>
      ))}
    </div>
  )
}
function MChat({ bubbles }: { bubbles: { text: string; mine?: boolean }[] }) {
  return (
    <div className="space-y-1.5 mb-3">
      {bubbles.map((b, i) => (
        <div key={i} className={`flex ${b.mine ? 'justify-end' : 'justify-start'}`}>
          <span className="rounded-lg px-2.5 py-1.5 text-[11px] font-medium" style={{ maxWidth: '85%', background: b.mine ? '#0694D1' : 'rgba(255,255,255,0.08)', color: b.mine ? '#fff' : 'rgba(255,255,255,0.75)' }}>{b.text}</span>
        </div>
      ))}
    </div>
  )
}
function MCheckList({ items }: { items: { label: string; done?: boolean }[] }) {
  return (
    <div className="space-y-1.5 mb-3">
      {items.map(it => (
        <div key={it.label} className="flex items-center gap-2 text-[11px]" style={{ color: it.done ? '#fff' : 'rgba(255,255,255,0.4)' }}>
          {it.done ? <MCheck /> : <span className="rounded-full flex-shrink-0" style={{ width: 10, height: 10, border: '1.5px solid rgba(255,255,255,0.3)' }} />}
          {it.label}
        </div>
      ))}
    </div>
  )
}
function MLines({ pcts, colors }: { pcts: number[]; colors?: string[] }) {
  return (
    <div className="space-y-1.5 mb-3">
      {pcts.map((p, i) => <MBar key={i} pct={p} color={(colors && colors[i]) || 'rgba(255,255,255,0.18)'} />)}
    </div>
  )
}

function RoleMock({ title }: { title: string }) {
  const bottom = (left: ReactNode, right?: ReactNode) => (
    <div className="flex items-center justify-between gap-2">{left}{right}</div>
  )

  switch (title) {
    /* ── Marketing ── */
    case 'AI-Assisted Content Creation':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Blog post · ‘AI in B2B sales’" badge={<MPill>Draft v3</MPill>} />
        <MLines pcts={[100, 100, 60]} />
        {bottom(<span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>847 words</span>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Auto-saved 2m ago</span>)}
      </div>
    case 'Hyper-Personalization at Scale':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Segment: SaaS founders, US, 50-200 emp" />
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <p className="text-[11px] font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Generic</p>
            <MBar pct={30} color="rgba(255,255,255,0.3)" />
          </div>
          <div className="rounded-lg p-2.5" style={{ background: 'rgba(6,148,209,0.16)', border: '1px solid #0694D1' }}>
            <p className="text-[11px] font-semibold mb-2" style={{ color: '#38bdf8' }}>Personalized</p>
            <MBar pct={90} />
          </div>
        </div>
        {bottom(<span className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>Hi Sarah, congrats on Series A</span>, <MPill>24 variants ready</MPill>)}
      </div>
    case 'Marketing Research and Competitive Insight':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Brief: Competitor X · Q3 earnings" />
        <MLines pcts={[100, 65]} />
        {bottom(<span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Sources: 14</span>, <MPill>SWOT synthesized</MPill>)}
      </div>
    case 'Campaign Analytics and Performance Optimization':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-extrabold" style={{ color: '#fff' }}>4.2x</span>
          <span className="text-[10px] font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>ROAS LIFT</span>
        </div>
        <div className="mb-3"><MBar pct={65} /></div>
        <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Reallocate +£18K to LinkedIn</span>
      </div>
    case 'Creative Production (Image, Video, Audio)':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Generating: Q4 launch video" />
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-semibold" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.75)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg> Image
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-semibold" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.75)' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#38bdf8"><polygon points="6,4 20,12 6,20" /></svg> Video
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-semibold" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.75)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2}><path strokeLinecap="round" d="M5 20V10m7 10V4m7 16v-7" /></svg> Audio
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#38bdf8' }}>
          <span className="rounded-full flex-shrink-0" style={{ width: 6, height: 6, background: '#38bdf8' }} /> Render 78%
        </span>
      </div>
    case 'Lifecycle Email and Customer Journey Automation':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Sequence: Trial day 7" />
        <MLines pcts={[85, 55]} colors={['#0694D1', 'rgba(255,255,255,0.18)']} />
        {bottom(<span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Open rate 34%</span>, <MPill>A/B winner</MPill>)}
      </div>

    /* ── Sales ── */
    case 'AI-Powered Prospecting and Lead Scoring':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Today’s top accounts" badge={<MPill>12 ready</MPill>} />
        <MScoreList items={[{ label: 'Acme Corp', value: '94', top: true }, { label: 'Vertex Inc', value: '87' }, { label: 'Lumen Labs', value: '76' }]} />
      </div>
    case 'AI-Generated Outreach and Personalized Email':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="To: Sarah Chen · VP Marketing · Vertex" />
        <div className="mb-3"><MBar pct={90} /></div>
        {bottom(<MPill tone="gray">Draft 1</MPill>, <MPill>Suggested opener</MPill>)}
      </div>
    case 'Call Recording, Transcription and Conversation Intelligence':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Acme Corp · Discovery · 32:14" badge={<MPill>REC</MPill>} />
        <MLines pcts={[100, 100, 60]} />
        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>3 pain points · 2 objections</p>
      </div>
    case 'Sales Forecasting and Pipeline Health':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-extrabold" style={{ color: '#fff' }}>£840K</span>
          <span className="text-[10px] font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>Q3 COMMIT</span>
        </div>
        <div className="mb-3"><MBar pct={55} /></div>
        {bottom(<MPill>+12%</MPill>, <MPill tone="gray">3 deals slipping</MPill>)}
      </div>
    case 'Proposal, Quote and Contract Drafting':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Proposal: Acme Corp · 12-month" />
        <div className="mb-3"><MBar pct={40} /></div>
        {bottom(<span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>£24K · 36 seats</span>, <MPill>Ready to send</MPill>)}
      </div>
    case 'Account Research and Pre-Call Briefs':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Pre-call: Lumen Labs · Tue 3pm" />
        <MLines pcts={[100, 100, 70]} colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.18)', '#0694D1']} />
        <div className="flex gap-1.5"><MPill tone="gray">10-K</MPill><MPill tone="gray">News</MPill><MPill tone="gray">CRM</MPill></div>
      </div>

    /* ── HR ── */
    case 'Job Description and Job Posting Generation':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Role: Senior Product Manager" badge={<MPill tone="gray">Draft</MPill>} />
        <MLines pcts={[100, 60]} />
        {bottom(<MPill><MCheck /> Inclusive language</MPill>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Edit</span>)}
      </div>
    case 'Resume Screening and Candidate Matching':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Senior PM · 47 applicants" />
        <MScoreList items={[{ label: 'Priya M.', value: '92%', top: true }, { label: 'James R.', value: '88%' }, { label: 'Wei L.', value: '76%' }]} />
      </div>
    case 'Recruiting Chatbots and Candidate Engagement':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MChat bubbles={[{ text: 'When can I interview?' }, { text: 'How about Thu 2pm?', mine: true }]} />
        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>24/7 candidate care · 1.2k engaged</p>
      </div>
    case 'HR Self-Service Assistants and Policy Q&A':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MChat bubbles={[{ text: 'Q: PTO balance?' }, { text: 'You have 12 days remaining', mine: true }]} />
        {bottom(<MPill>Auto-resolved</MPill>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>8s</span>)}
      </div>
    case 'Onboarding Automation and New-Hire Assistants':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="New hire: Amir K. · Day 1" />
        <MCheckList items={[{ label: 'Sign offer', done: true }, { label: 'IT setup', done: true }, { label: 'Manager intro' }, { label: 'Day 1 plan' }]} />
      </div>
    case 'Personalized Learning and Development':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Sarah · Marketing track" />
        <div className="space-y-2 mb-3">
          {[{ l: 'Prompt basics', p: 90 }, { l: 'Brand AI', p: 75 }, { l: 'Analytics', p: 40 }].map(s => (
            <div key={s.l}>
              <div className="flex items-center justify-between text-[10px] mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}><span>{s.l}</span><span>{s.p}%</span></div>
              <MBar pct={s.p} />
            </div>
          ))}
        </div>
        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Next: Campaign optimization</p>
      </div>

    /* ── Finance ── */
    case 'Knowledge Management and Policy Q&A':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MChat bubbles={[{ text: 'Q: Can we capitalize this license?' }, { text: 'Yes. Per GAAP §842, treat as ROU asset.', mine: true }]} />
        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Source: Accounting policy §4.2</p>
      </div>
    case 'Accounts Payable and Invoice Processing':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="INV-2041 · Vertex Logistics" />
        <MCheckList items={[{ label: 'PO-1138', done: true }, { label: 'Amount £4,200', done: true }]} />
        {bottom(<MPill><MCheck /> Approved</MPill>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Routed to Sarah</span>)}
      </div>
    case 'Error, Anomaly Detection and Audit Support':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Transaction #4471 · £8,200" />
        <div className="flex items-center gap-1.5 mb-3">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
          <span className="text-[11px] font-semibold" style={{ color: '#38bdf8' }}>Flagged: Duplicate vendor</span>
        </div>
        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Compare to TX#4468 · 14 Mar</p>
      </div>
    case 'Financial Reporting and Month-End Close Acceleration':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-extrabold" style={{ color: '#fff' }}>Day 3</span>
          <span className="text-[10px] font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>CLOSE IN PROGRESS</span>
        </div>
        <div className="mb-3"><MBar pct={55} /></div>
        {bottom(<MPill><MCheck /> Auto-recon</MPill>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>ETA 2 days</span>)}
      </div>
    case 'FP&A Forecasting and Scenario Modelling':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Q4 forecast · 3 scenarios" />
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <p className="text-[10px] mb-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Base</p>
            <p className="text-[12px] font-bold" style={{ color: '#fff' }}>£4.2M</p>
          </div>
          <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(6,148,209,0.18)', border: '1px solid #0694D1' }}>
            <p className="text-[10px] mb-0.5" style={{ color: '#38bdf8' }}>Aggressive</p>
            <p className="text-[12px] font-bold" style={{ color: '#fff' }}>£5.1M</p>
          </div>
        </div>
        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Driver: enterprise pipeline</p>
      </div>
    case 'Tax Automation and Compliance Drafting':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Filing: Q2 GST · Drafted" />
        <div className="mb-3"><MBar pct={15} /></div>
        {bottom(<MPill>Sec 80C applied</MPill>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Review by Fri</span>)}
      </div>

    /* ── IT & Engineering ── */
    case 'Code Generation and Pair Programming':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="auth.ts · line 42" />
        <MLines pcts={[100, 55]} colors={['rgba(255,255,255,0.18)', '#0694D1']} />
        {bottom(<span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Tab to accept</span>, <MPill><MCheck /> Suggested</MPill>)}
      </div>
    case 'Code Review and Pull-Request Assistance':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="PR #142 · auth refactor" />
        <MLines pcts={[100, 65]} />
        {bottom(<span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>+18 / −7</span>, <MPill>Refactor candidate</MPill>)}
      </div>
    case 'Debugging and Code Explanation':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <div className="flex items-center gap-1.5 mb-3">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
          <span className="text-[11px] font-semibold truncate" style={{ color: '#38bdf8' }}>ERR_TIMEOUT @ line 78</span>
        </div>
        <div className="mb-3"><MBar pct={80} color="#38bdf8" /></div>
        {bottom(<MPill>Apply fix</MPill>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>3 similar errors</span>)}
      </div>
    case 'Documentation, READMEs and API Specs':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="README.md · v2.3" />
        <MLines pcts={[100, 60]} />
        {bottom(<MPill>Auto-generated</MPill>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>From src/</span>)}
      </div>
    case 'SOC Operations and Threat Triage':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Alert #2241 · Phishing" />
        <div className="flex items-center gap-1.5 mb-3">
          <span className="rounded-full flex-shrink-0" style={{ width: 6, height: 6, background: '#38bdf8' }} />
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Medium severity</span>
        </div>
        {bottom(<MPill><MCheck /> Triaged</MPill>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>4m to resolve</span>)}
      </div>
    case 'IT Service Desk and Knowledge Management':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MChat bubbles={[{ text: 'Reset password?' }, { text: 'Done. Check inbox.', mine: true }]} />
        {bottom(<MPill>Resolved</MPill>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>12s</span>)}
      </div>

    /* ── Customer Support ── */
    case 'AI Chatbots and Virtual Agents (Customer-Facing)':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MChat bubbles={[{ text: 'Where’s my order?' }, { text: 'Out for delivery, ETA 5:30 PM', mine: true }]} />
        {bottom(<MPill>Bot resolved</MPill>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>8s</span>)}
      </div>
    case 'Agent Assist and Real-Time Recommendations':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <p className="text-[10px] font-semibold tracking-wide mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>Transcript</p>
        <MLines pcts={[100, 55]} />
        <div className="rounded-lg p-2 mb-2" style={{ background: 'rgba(6,148,209,0.14)', border: '1px solid rgba(6,148,209,0.35)' }}>
          <p className="text-[10px] font-semibold mb-1.5" style={{ color: '#38bdf8' }}>KB-219 · Suggested reply</p>
          <MBar pct={70} />
        </div>
        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Confidence 94%</p>
      </div>
    case 'Case Summarization and Wrap-Up Automation':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Case #8821 · Refund issued" />
        <MLines pcts={[100, 60]} />
        {bottom(<MPill>Wrap-up auto</MPill>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Logged 6s</span>)}
      </div>
    case 'Sentiment Analysis and Quality Assurance':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-extrabold" style={{ color: '#fff' }}>92%</span>
          <span className="text-[10px] font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>COMPLIANCE SCORE</span>
        </div>
        <div className="mb-3"><MBar pct={85} /></div>
        {bottom(<MPill>Positive</MPill>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Last 100 calls</span>)}
      </div>
    case 'Intelligent Ticket Routing and Triage':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <MHeader title="Inbox: 47 tickets" />
        <div className="space-y-1.5 mb-3">
          {[{ from: 'Refund', to: 'Billing queue' }, { from: 'Bug', to: 'Tech queue' }, { from: 'Plan change', to: 'CSM' }].map(r => (
            <div key={r.from} className="flex items-center justify-between text-[11px]">
              <MPill tone="gray">{r.from}</MPill>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>{r.to}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Auto-routed in 200ms</p>
      </div>
    case 'Self-Service and Conversational Search':
      return <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 mb-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>How do I…</span>
        </div>
        <MLines pcts={[100, 60]} />
        {bottom(<MPill>Top match</MPill>, <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Reset password</span>)}
      </div>

    default:
      return null
  }
}

function TraditionalMock() {
  return (
    <div className="rounded-xl p-4" style={{ background: '#fff' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#0d1b2a' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#dc2626', flexShrink: 0 }} />
          Course Abandoned
        </span>
        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: '#fde2e2', color: '#dc2626' }}>Day 47</span>
      </div>
      <div className="rounded-lg p-3 mb-4 space-y-1" style={{ background: '#fdeeee' }}>
        <p className="text-xs" style={{ color: '#b91c1c' }}><span className="opacity-70">Module 4 of 12:</span> not started</p>
        <p className="text-xs" style={{ color: '#b91c1c' }}><span className="opacity-70">Last activity:</span> 47 days ago</p>
        <p className="text-xs" style={{ color: '#b91c1c' }}><span className="opacity-70">Skills applied:</span> 0 of 12</p>
        <p className="text-xs" style={{ color: '#b91c1c' }}><span className="opacity-70">Status:</span> stalled</p>
      </div>
      <div className="rounded-full mb-4" style={{ height: 6, background: '#fbdada' }}>
        <div style={{ width: '8%', height: '100%', borderRadius: 999, background: '#dc2626' }} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold" style={{ color: '#0d1b2a' }}>Progress: Stalled</span>
        <button type="button" disabled className="rounded-lg px-4 py-1.5 text-xs font-semibold" style={{ background: '#f1f5f9', color: '#94a3b8' }}>Resume Course</button>
      </div>
    </div>
  )
}

function UseCaseMock() {
  const messages = [
    'Great work on the ad variants. Let’s review your CTOs strategy next.',
    'Pushed your campaign to live tomorrow. Here’s the playbook.',
  ]
  return (
    <div>
      <div className="rounded-xl p-4 mb-3" style={{ background: '#fff' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#0d1b2a' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
            Skills Applied Successfully
          </span>
          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: '#dcfce7', color: '#166534' }}>Mentor Session Active</span>
        </div>
        <div className="rounded-lg p-3 mb-3" style={{ background: '#f0fdf4' }}>
          <p className="text-xs font-medium mb-2 truncate" style={{ color: '#0d1b2a' }}>workshops.koenig-solutions.com/marketing</p>
          <div className="flex gap-1.5" style={{ height: 6 }}>
            <span style={{ flex: 1, borderRadius: 999, background: '#16a34a' }} />
            <span style={{ flex: 1, borderRadius: 999, background: '#16a34a' }} />
            <span style={{ flex: 1, borderRadius: 999, background: '#16a34a' }} />
          </div>
        </div>
        <span className="text-sm font-bold" style={{ color: '#166534' }}>Progress: Applied to live work</span>
      </div>
      <div className="space-y-2">
        {messages.map(msg => (
          <div key={msg} className="flex items-start gap-2">
            <span className="mt-2 rounded-full flex-shrink-0" style={{ width: 8, height: 8, background: '#16a34a' }} />
            <span className="rounded-lg px-3 py-2 text-xs font-medium flex-1" style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' }}>{msg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProcessMock({ i }: { i: number }) {
  if (i === 0) {
    return (
      <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        {bottomHeader('Discovery Call', <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>30 min</span>)}
        <div className="flex items-center justify-center gap-8 py-4">
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex items-center justify-center rounded-full text-[11px] font-bold text-white flex-shrink-0" style={{ width: 30, height: 30, background: '#0694D1' }}>K</span>
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Koenig</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex items-center justify-center rounded-full text-[11px] font-bold text-white flex-shrink-0" style={{ width: 30, height: 30, background: '#0694D1' }}>Y</span>
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>You</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
          <span className="rounded-full flex-shrink-0" style={{ width: 6, height: 6, background: '#38bdf8' }} /> Recording notes…
        </span>
      </div>
    )
  }
  if (i === 1) {
    return (
      <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        {bottomHeader('Workshop Plan')}
        <div className="space-y-2 mb-3">
          {[{ r: 'Marketing', p: 90 }, { r: 'Sales', p: 55 }, { r: 'L&D', p: 40 }].map(x => (
            <div key={x.r} className="flex items-center gap-2">
              <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold flex-shrink-0" style={{ background: 'rgba(56,189,248,0.18)', color: '#38bdf8' }}>{x.r}</span>
              <span className="flex-1 rounded-full" style={{ height: 3, background: 'rgba(255,255,255,0.15)' }}>
                <span style={{ display: 'block', width: `${x.p}%`, height: '100%', borderRadius: 999, background: 'rgba(255,255,255,0.3)' }} />
              </span>
            </div>
          ))}
        </div>
        <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: 'rgba(56,189,248,0.18)', color: '#38bdf8' }}>3 modules · 6 use cases</span>
      </div>
    )
  }
  if (i === 2) {
    return (
      <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: 'rgba(56,189,248,0.18)', color: '#38bdf8' }}>
            <span className="rounded-full flex-shrink-0" style={{ width: 5, height: 5, background: '#38bdf8' }} /> WORKSHOP LIVE
          </span>
          <span className="inline-flex items-center gap-1.5 flex-shrink-0">
            <span className="flex items-center justify-center rounded-full text-[9px] font-bold text-white flex-shrink-0" style={{ width: 16, height: 16, background: '#0694D1' }}>K</span>
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Mentor</span>
          </span>
        </div>
        <div className="rounded-lg px-3 py-2.5 mb-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <p className="text-[12px] font-medium" style={{ color: '#fff', margin: 0 }}>Draft 3 ad variants for the Q4 launch<span className="animate-pulse" style={{ color: '#38bdf8' }}>|</span></p>
        </div>
        <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>4 participants active</span>
      </div>
    )
  }
  return (
    <div className="rounded-xl p-4" style={{ background: '#0a2540' }}>
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-[12px] font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}>Sandbox</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
        <span className="text-[12px] font-bold" style={{ color: '#fff' }}>Live work</span>
      </div>
      <div className="rounded-full mb-1.5" style={{ height: 4, background: 'rgba(255,255,255,0.12)' }}>
        <div style={{ width: '90%', height: '100%', borderRadius: 999, background: '#0694D1' }} />
      </div>
      <p className="text-[10px] mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>Applied</p>
      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: 'rgba(56,189,248,0.18)', color: '#38bdf8' }}>Your data</span>
    </div>
  )
}
function bottomHeader(title: string, right?: ReactNode) {
  return (
    <div className="flex items-center justify-between gap-2 mb-1">
      <span className="text-[12px] font-bold" style={{ color: '#fff' }}>{title}</span>
      {right}
    </div>
  )
}

/* ── Forms ──────────────────────────────────────────────────── */
function DiscoveryForm() {
  const [notRobot, setNotRobot] = useState(false)
  const inputCls = 'w-full rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-white/35 transition-colors'
  const inputSty = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: '#fff' }
  const labelCls = 'block text-sm font-semibold mb-1.5'
  const labelSty = { color: '#fff' }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div><label className={labelCls} style={labelSty}>Full Name <span className="text-red-400">*</span></label><input className={inputCls} style={inputSty} placeholder="Your full name" /></div>
        <div><label className={labelCls} style={labelSty}>Email <span className="text-red-400">*</span></label><input className={inputCls} style={inputSty} type="email" placeholder="you@company.com" /></div>
      </div>
      <div className="mb-3">
        <label className={labelCls} style={labelSty}>Phone Number <span className="text-red-400">*</span></label>
        <input className={inputCls} style={inputSty} type="tel" placeholder="+1 (555) 000-0000" />
      </div>
      <div className="mb-4">
        <label className={labelCls} style={labelSty}>Description</label>
        <textarea className={`${inputCls} resize-none`} style={inputSty} rows={3} placeholder="Tell us about your team's AI skilling needs..." />
      </div>
      <button
        type="button"
        onClick={() => setNotRobot(v => !v)}
        className="mb-5 flex w-full max-w-[260px] items-center gap-2.5 rounded-lg px-2.5 py-2 mx-auto"
        style={{ background: '#f9f9f9', border: '1px solid #d3d3d3' }}
      >
        <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded" style={{ background: notRobot ? '#0694D1' : '#fff', border: '2px solid ' + (notRobot ? '#0694D1' : '#c1c1c1') }}>
          {notRobot && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>}
        </span>
        <span className="text-[13px]" style={{ color: '#0d1b2a' }}>I&apos;m not a robot</span>
        <span className="ml-auto flex flex-col items-center gap-0.5 flex-shrink-0" style={{ color: '#9aa0a6' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581M4.93 15A8 8 0 0018 6.31M4 9a8 8 0 0113.93-1.69" /></svg>
          <span className="text-[8px] font-medium">reCAPTCHA</span>
        </span>
      </button>
      <button type="button" className="w-full rounded-xl py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 8px 24px rgba(6,148,209,0.40)' }}>
        Book My Discovery Call
      </button>
    </>
  )
}

/* ── Page ───────────────────────────────────────────────────── */
export default function BeastAiSkillingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeRole, setActiveRole] = useState('Marketing')
  const [genFunctions, setGenFunctions] = useState<string[]>(['Marketing'])
  const [genIndustry, setGenIndustry] = useState('')
  const [genGoal, setGenGoal] = useState('')
  const [generated, setGenerated] = useState(false)
  const [activeSubNav, setActiveSubNav] = useState(SUB_NAV_LINKS[0].href)
  const subNavScrollRef = useRef<HTMLDivElement>(null)
  const subNavActiveRef = useRef<HTMLAnchorElement>(null)
  const [problemPage, setProblemPage] = useState(0)
  const problemTouchX = useRef(0)
  const [programPage, setProgramPage] = useState(0)
  const programTouchX = useRef(0)
  const [processPage, setProcessPage] = useState(0)
  const processTouchX = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 60
      let current = SUB_NAV_LINKS[0].href
      for (const l of SUB_NAV_LINKS) {
        const el = document.getElementById(l.href.slice(1))
        if (el && el.offsetTop <= scrollY) current = l.href
      }
      setActiveSubNav(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const container = subNavScrollRef.current
    const active = subNavActiveRef.current
    if (!container || !active) return
    container.scrollLeft = active.offsetLeft - 16
  }, [activeSubNav])

  return (
    <div className={`bs-page ${bricolage.variable}`} style={{ fontFamily: 'inherit' }}>
      <Navbar />

      {/* ── SUB NAV ──────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 border-b border-white/10" style={{ background: '#06111E' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div ref={subNavScrollRef} className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
            {SUB_NAV_LINKS.map(l => {
              const isActive = activeSubNav === l.href
              return (
                <a
                  key={l.href}
                  ref={isActive ? subNavActiveRef : undefined}
                  href={l.href}
                  className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-all flex-shrink-0"
                  style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)', background: isActive ? '#0694D1' : 'transparent' }}
                >
                  {l.label}
                </a>
              )
            })}
            <a href="#discovery" className="ml-2 flex-shrink-0 whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)' }}>
              Book a Free Discovery Call
            </a>
          </div>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="px-4 lg:px-[50px]" style={{ background: 'radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 45%, #040C18 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="bs-hero mx-auto max-w-7xl" style={{ position: 'relative', paddingTop: 35, paddingBottom: 35 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="bs-hero-stack text-center lg:text-left min-w-0">
              <span className="inline-block rounded-full px-4 py-1.5 text-xs sm:text-sm font-extrabold mb-4" style={{ background: '#0694D1', color: '#fff', letterSpacing: '0.05em' }}>
                B.E.A.S.T. AI
              </span>
              <p className="text-sm sm:text-base font-medium mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Build. Execute. Apply. Solve. Transform with AI.
              </p>
              <h1 className="font-extrabold leading-[1.1] mb-5" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: '#fff' }}>
                AI Is a <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Different Beast</span>
              </h1>
              <p className="text-sm sm:text-base mb-6" style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, maxWidth: 520 }}>
                And it needs a different approach than traditional skilling. Role-based training, real tools, and a live sandbox to test in — not another generic course. <strong style={{ color: '#fff' }}>Built around what your team actually does.</strong>
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-nowrap items-center justify-center lg:items-start lg:justify-start gap-2 sm:gap-2.5 mb-7">
                {HERO_BADGES.map(b => (
                  <span key={b.label} className="inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold" style={{ background: 'rgba(6,148,209,0.14)', border: '1px solid rgba(6,148,209,0.35)', color: 'rgba(255,255,255,0.85)' }}>
                    {b.icon}
                    {b.label}
                  </span>
                ))}
              </div>
              <div className="flex justify-center lg:justify-start">
                <a href="#discovery" className="w-full sm:w-auto text-center rounded-xl px-9 py-4 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 8px 24px rgba(6,148,209,0.40)' }}>
                  BOOK A FREE DISCOVERY CALL
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <BeastHeroVideo />
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCOVERY CALL ───────────────────────────────────────── */}
      <section id="discovery" className="bs-section px-4 lg:px-[50px]" style={{ background: '#fff', paddingTop: 35, paddingBottom: 35 }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-extrabold text-[28px] sm:text-[42px] mb-3" style={{ color: '#0d1b2a' }}>
            Discover What AI Skilling Looks Like For Your Team
          </h2>
          <p className="text-center text-sm sm:text-lg font-semibold mb-10" style={{ color: '#5b7690' }}>
            One conversation to map a tailored program to your team&apos;s roles.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden" style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.18)' }}>
            <div className="p-8 sm:p-12 flex flex-col items-start justify-center text-left" style={{ background: '#07304a' }}>
              <h3 className="font-extrabold text-3xl sm:text-4xl mb-3 text-white" style={{ fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>Free Discovery Call</h3>
              <p className="text-sm sm:text-base mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>30 minutes. Zero commitment. Real plan.</p>
              <ul className="space-y-4 mb-6">
                {DISCOVERY_POINTS.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <svg width="18" height="18" className="mt-0.5 flex-shrink-0 rounded-full" fill="#0694D1" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" /><path fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" d="M7 12.5l3 3 7-7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm sm:text-base italic" style={{ color: 'rgba(255,255,255,0.55)' }}>
                We map your team&apos;s roles to the right use cases on the call itself.
              </p>
            </div>
            <div className="p-8 sm:p-12" style={{ background: '#0a1a2b' }}>
              <h3 className="font-extrabold text-2xl mb-6 text-white" style={{ fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>Book Your Free Discovery Call</h3>
              <DiscoveryForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASE GENERATOR ───────────────────────────────────── */}
      <section id="generator" className="bs-section px-4 lg:px-[50px]" style={{ background: '#eef7fc', paddingTop: 35, paddingBottom: 35 }}>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-extrabold text-[26px] sm:text-[38px] mb-3" style={{ color: '#0d1b2a' }}>
            Generate Use Cases for Your Team
          </h2>
          <p className="text-center text-sm sm:text-lg mb-10" style={{ color: '#5b7690' }}>
            Pick your team&apos;s function and see where AI fits their actual work.
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#07304a', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
            <div className="flex items-center justify-center px-6 py-4" style={{ position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
              <span className="rounded-full px-4 py-1.5 text-xs font-extrabold" style={{ background: '#0694D1', color: '#fff', letterSpacing: '0.05em' }}>B.E.A.S.T. ENGINE</span>
              <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: '#38bdf8', boxShadow: '0 0 8px rgba(56,189,248,0.8)' }} />
            </div>
            <div className="p-6 sm:p-10">
              <p className="text-sm font-semibold mb-1" style={{ color: '#fff' }}>Your team&apos;s function</p>
              <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>Select all that apply.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {FUNCTIONS.map(f => {
                  const active = genFunctions.includes(f)
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => {
                        setGenFunctions(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])
                        setGenerated(false)
                      }}
                      className="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                      style={{
                        background: active ? '#0694D1' : 'rgba(255,255,255,0.06)',
                        color: '#fff',
                        border: '1px solid ' + (active ? '#0694D1' : 'rgba(255,255,255,0.16)'),
                      }}
                    >
                      {f}
                    </button>
                  )
                })}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#fff' }}>Your industry <span className="font-normal" style={{ color: 'rgba(255,255,255,0.45)' }}>optional</span></label>
                  <input value={genIndustry} onChange={e => setGenIndustry(e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-white/35 transition-colors" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: '#fff' }} placeholder="e.g. SaaS, logistics, healthcare" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#fff' }}>Main goal <span className="font-normal" style={{ color: 'rgba(255,255,255,0.45)' }}>optional</span></label>
                  <input value={genGoal} onChange={e => setGenGoal(e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-white/35 transition-colors" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: '#fff' }} placeholder="e.g. cut reporting time" />
                </div>
              </div>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>Adding this makes the examples more specific.</p>
              <button onClick={() => setGenerated(true)} type="button" className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: '#0694D1', boxShadow: '0 8px 24px rgba(6,148,209,0.40)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h7l-1 8 11-13h-7z" /></svg>
                Generate
              </button>
              {generated && (
                <div className="mt-6 space-y-5">
                  {(genFunctions.length ? genFunctions : ['Other']).map(f => (
                    <div key={f}>
                      {genFunctions.length > 1 && (
                        <p className="text-xs font-bold tracking-wide mb-2" style={{ color: '#38bdf8' }}>{f.toUpperCase()}</p>
                      )}
                      <div className="space-y-2.5">
                        {(USE_CASE_SUGGESTIONS[f] || USE_CASE_SUGGESTIONS['Other']).map(t => (
                          <div key={t} className="flex items-start gap-2.5 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <svg width="14" height="14" className="mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={3}><polyline points="20 6 9 17 4 12"/></svg>
                            <span className="text-sm font-medium" style={{ color: '#fff' }}>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM STATEMENT ────────────────────────────────────── */}
      <section className="bs-section px-4 lg:px-[50px]" style={{ background: '#fff', paddingTop: 35, paddingBottom: 35 }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-extrabold text-[26px] sm:text-[38px] mb-3" style={{ color: '#0d1b2a' }}>
            Why AI Adoption Keeps Failing Inside Organisations
          </h2>
          <p className="text-center text-sm sm:text-base mb-10" style={{ color: '#5b7690' }}>
            Three problems show up everywhere. They&apos;re the reason most AI investments quietly stall.
          </p>
          {(() => {
            const problemCard = (p: typeof PROBLEMS[0]) => (
              <div className="rounded-2xl p-6" style={{ background: '#eef7fc' }}>
                <span className="inline-flex items-center justify-center rounded-full font-bold text-base text-white flex-shrink-0 mb-4" style={{ width: 48, height: 48, background: '#0694D1' }}>{p.n}</span>
                <h3 className="font-extrabold text-2xl leading-snug mb-3" style={{ color: '#0d1b2a', fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>{p.title}</h3>
                <p className="text-sm sm:text-base mb-5" style={{ color: '#5b7690', lineHeight: 1.6 }}>{p.desc}</p>
                <ProblemMock n={p.n} />
              </div>
            )
            return (
              <>
                <div className="block sm:hidden">
                  <div
                    onTouchStart={e => { problemTouchX.current = e.touches[0].clientX }}
                    onTouchEnd={e => {
                      const diff = problemTouchX.current - e.changedTouches[0].clientX
                      if (diff > 50 && problemPage < PROBLEMS.length - 1) setProblemPage(pg => pg + 1)
                      if (diff < -50 && problemPage > 0) setProblemPage(pg => pg - 1)
                    }}
                  >
                    {problemCard(PROBLEMS[problemPage])}
                  </div>
                  <div className="flex justify-center gap-1.5 mt-4">
                    {PROBLEMS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setProblemPage(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className="rounded-full p-0 transition-all"
                        style={{ width: i === problemPage ? 20 : 8, height: 8, background: i === problemPage ? '#0694D1' : 'rgba(6,148,209,0.30)', border: 'none' }}
                      />
                    ))}
                  </div>
                </div>
                <div className="hidden sm:grid grid-cols-3 gap-6">
                  {PROBLEMS.map(p => <div key={p.n}>{problemCard(p)}</div>)}
                </div>
              </>
            )
          })()}
        </div>
      </section>

      {/* ── COMPARISON ───────────────────────────────────────────── */}
      <section className="bs-section px-4 lg:px-[50px]" style={{ background: '#eef7fc', paddingTop: 35, paddingBottom: 35 }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-extrabold text-[26px] sm:text-[38px] mb-3" style={{ color: '#0d1b2a' }}>
            Why AI Skilling Needs a Different Approach
          </h2>
          <p className="text-center text-sm sm:text-base mb-10" style={{ color: '#3f3f46' }}>
            Use-case based AI <span style={{ color: '#0694D1' }}>skilling</span>. <span style={{ color: '#0694D1' }}>Built</span> around what your team actually does.
          </p>
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="rounded-2xl p-6 sm:p-8" style={{ background: '#fdeaea' }}>
              <h3 className="inline-flex items-center gap-2.5 font-extrabold text-xl mb-4" style={{ color: '#dc2626', fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>
                <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 26, height: 26, background: '#dc2626' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </span>
                Traditional AI Training
              </h3>
              <p className="mb-6 text-sm sm:text-base" style={{ color: '#3f3f46', lineHeight: 1.7 }}>
                Most AI training is a <strong style={{ color: '#dc2626' }}>generic curriculum</strong> built for everyone and useful to no one. Theory-first lectures and tool demos. Practice on <strong style={{ color: '#dc2626' }}>sample data, not your data</strong>. It ends with a certificate, not a capability. <strong style={{ color: '#dc2626' }}>Application is your team&apos;s problem</strong> to figure out alone.
              </p>
              <TraditionalMock />
            </div>
            <div className="rounded-2xl p-6 sm:p-8" style={{ background: '#e9f9ef' }}>
              <h3 className="inline-flex items-center gap-2.5 font-extrabold text-xl mb-4" style={{ color: '#16a34a', fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>
                <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 26, height: 26, background: '#16a34a' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </span>
                Use-Case Based AI Skilling
              </h3>
              <p className="mb-6 text-sm sm:text-base" style={{ color: '#3f3f46', lineHeight: 1.7 }}>
                This isn&apos;t a course. It&apos;s a <strong style={{ color: '#16a34a' }}>custom-built program</strong> shaped around your team&apos;s roles. Hands-on workshops with the tools they&apos;ll actually use, on the <strong style={{ color: '#16a34a' }}>data they actually work with</strong>. It ends with capability that sticks, <strong style={{ color: '#16a34a' }}>applied to real work</strong>, not stored in a certificate.
              </p>
              <UseCaseMock />
            </div>
            <span className="hidden lg:flex items-center justify-center rounded-full font-extrabold text-sm text-white flex-shrink-0" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 52, height: 52, background: '#0d1b2a' }}>VS</span>
          </div>
        </div>
      </section>

      {/* ── PROGRAM COMPONENTS ───────────────────────────────────── */}
      <section id="included" className="bs-section px-4 lg:px-[50px]" style={{ background: '#fff', paddingTop: 35, paddingBottom: 35 }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-extrabold text-[26px] sm:text-[38px] mb-3" style={{ color: '#0d1b2a' }}>
            Inside the Program: Built for Capability, Not Completion
          </h2>
          <p className="text-center text-sm sm:text-lg font-semibold mb-10" style={{ color: '#5b7690' }}>
            Six pieces that turn AI training into AI fluency.
          </p>
          {(() => {
            const programCard = (f: typeof PROGRAM_COMPONENTS[0]) => (
              <div className="bs-card rounded-2xl p-6" style={{ background: '#eef7fc' }}>
                <div className="mb-5">
                  <ProgramMock title={f.title} />
                </div>
                <h3 className="font-extrabold text-lg mb-2" style={{ color: '#0d1b2a', fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>{f.title}</h3>
                <p className="text-sm" style={{ color: '#5b7690', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            )
            return (
              <>
                <div className="block sm:hidden">
                  <div
                    onTouchStart={e => { programTouchX.current = e.touches[0].clientX }}
                    onTouchEnd={e => {
                      const diff = programTouchX.current - e.changedTouches[0].clientX
                      if (diff > 50 && programPage < PROGRAM_COMPONENTS.length - 1) setProgramPage(pg => pg + 1)
                      if (diff < -50 && programPage > 0) setProgramPage(pg => pg - 1)
                    }}
                  >
                    {programCard(PROGRAM_COMPONENTS[programPage])}
                  </div>
                  <div className="flex justify-center gap-1.5 mt-4">
                    {PROGRAM_COMPONENTS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setProgramPage(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className="rounded-full p-0 transition-all"
                        style={{ width: i === programPage ? 20 : 8, height: 8, background: i === programPage ? '#0694D1' : 'rgba(6,148,209,0.30)', border: 'none' }}
                      />
                    ))}
                  </div>
                </div>
                <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {PROGRAM_COMPONENTS.map(f => <div key={f.title}>{programCard(f)}</div>)}
                </div>
              </>
            )
          })()}
          <style>{`
            .bs-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
            .bs-card:hover { transform: translateY(-4px); box-shadow: 0 14px 34px rgba(6,148,209,0.14) !important; }
          `}</style>
        </div>
      </section>

      {/* ── ROLE-SPECIFIC CAPABILITIES ───────────────────────────── */}
      <section id="use-cases" className="bs-section px-4 lg:px-[50px]" style={{ background: '#eef7fc', paddingTop: 35, paddingBottom: 35 }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-extrabold text-[26px] sm:text-[38px] mb-10" style={{ color: '#0d1b2a' }}>
            What Your Team Will Actually Be Able to Do
          </h2>
          <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 mb-8 overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
            {Object.keys(ROLE_CAPABILITIES).map(role => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className="flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors"
                style={{
                  background: activeRole === role ? '#0694D1' : '#fff',
                  color: activeRole === role ? '#fff' : '#0d1b2a',
                  border: '1px solid ' + (activeRole === role ? '#0694D1' : '#cfe9f7'),
                }}
              >
                {role}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROLE_CAPABILITIES[activeRole].map(c => (
              <div key={c.title} className="rounded-2xl p-5" style={{ background: '#fff', boxShadow: '0 4px 16px rgba(6,148,209,0.06)' }}>
                <div className="mb-4">
                  <RoleMock title={c.title} />
                </div>
                <h3 className="font-extrabold text-base mb-2" style={{ color: '#0d1b2a', fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>{c.title}</h3>
                <p className="text-sm" style={{ color: '#5b7690', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm italic mt-8" style={{ color: '#5b7690' }}>
            We&apos;ve built programs for many more roles. Tell us what your team needs on the discovery call.
          </p>
          <div className="flex justify-center mt-6">
            <a href="#discovery" className="rounded-xl px-9 py-4 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 8px 24px rgba(6,148,209,0.40)' }}>
              Book a Free Discovery Call
            </a>
          </div>
          <p className="text-center text-sm italic mt-5" style={{ color: '#5b7690' }}>
            Looking for ready-made AI courses for yourself instead?{' '}
            <a href="/search" className="not-italic font-semibold" style={{ color: '#0694D1' }}>Browse all our AI courses →</a>
          </p>
        </div>
      </section>

      {/* ── IMPLEMENTATION PROCESS ───────────────────────────────── */}
      <section id="how-it-works" className="bs-section px-4 lg:px-[50px]" style={{ background: '#fff', paddingTop: 35, paddingBottom: 35 }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-extrabold text-[26px] sm:text-[38px] mb-3" style={{ color: '#0d1b2a' }}>
            From First Call To a Capable Team in Four Steps
          </h2>
          <p className="text-center text-sm sm:text-lg font-semibold mb-10" style={{ color: '#5b7690' }}>
            No surprises. Here&apos;s exactly how we get from a conversation to your team doing real work with AI.
          </p>
          <div className="relative">
            <div className="hidden lg:grid absolute inset-0 grid-cols-4 gap-10 pointer-events-none" aria-hidden="true">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="relative">
                  {i < 3 && (
                    <div className="absolute flex items-center" style={{ right: -40, width: 40, top: 40 }}>
                      <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
                        <path d="M1 8 H28" stroke="#0694D1" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                        <path d="M24 3 L33 8 L24 13" stroke="#0694D1" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {(() => {
              const stepCard = (p: typeof PROCESS_STEPS[0], i: number) => (
                <div className="rounded-2xl p-6" style={{ background: '#eef7fc' }}>
                  <span className="flex items-center justify-center rounded-full font-bold text-sm text-white flex-shrink-0 mb-4" style={{ width: 40, height: 40, background: '#0694D1' }}>{p.step}</span>
                  <h3 className="font-extrabold text-lg leading-snug mb-3" style={{ color: '#0d1b2a', fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>{p.title}</h3>
                  <p className="text-sm mb-5" style={{ color: '#5b7690', lineHeight: 1.6 }}>{p.desc}</p>
                  <ProcessMock i={i} />
                </div>
              )
              return (
                <>
                  <div className="block sm:hidden">
                    <div
                      onTouchStart={e => { processTouchX.current = e.touches[0].clientX }}
                      onTouchEnd={e => {
                        const diff = processTouchX.current - e.changedTouches[0].clientX
                        if (diff > 50 && processPage < PROCESS_STEPS.length - 1) setProcessPage(pg => pg + 1)
                        if (diff < -50 && processPage > 0) setProcessPage(pg => pg - 1)
                      }}
                    >
                      {stepCard(PROCESS_STEPS[processPage], processPage)}
                    </div>
                    <div className="flex justify-center gap-1.5 mt-4">
                      {PROCESS_STEPS.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setProcessPage(i)}
                          aria-label={`Go to slide ${i + 1}`}
                          className="rounded-full p-0 transition-all"
                          style={{ width: i === processPage ? 20 : 8, height: 8, background: i === processPage ? '#0694D1' : 'rgba(6,148,209,0.30)', border: 'none' }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
                    {PROCESS_STEPS.map((p, i) => <div key={p.step}>{stepCard(p, i)}</div>)}
                  </div>
                </>
              )
            })()}
          </div>
          <div className="flex justify-center mt-10">
            <a href="#discovery" className="w-full sm:w-auto text-center rounded-xl px-9 py-4 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 8px 24px rgba(6,148,209,0.40)' }}>
              BOOK A FREE DISCOVERY CALL
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section id="faqs" className="bs-section px-4 lg:px-[50px] relative overflow-hidden" style={{ background: '#f0f9ff', paddingTop: 35, paddingBottom: 35 }}>
        <div className="pointer-events-none absolute left-0 bottom-0 h-[450px] w-[450px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.30) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.28) 0%, transparent 70%)' }} />

        <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-24 self-start">
            <h2 className="font-extrabold text-[28px] sm:text-[36px] leading-tight mb-4" style={{ color: '#0d1b2a', fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base mb-8" style={{ color: '#5b7690' }}>
              Everything you&apos;d want to know before booking a call. Anything else, we&apos;ll cover it on the call itself.
            </p>
            <div>
              <p className="font-bold text-sm sm:text-base mb-1.5" style={{ color: '#0d1b2a' }}>Still have questions?</p>
              <p className="text-sm mb-5" style={{ color: '#5b7690' }}>Book a free discovery call and we&apos;ll walk you through everything specific to your team.</p>
              <a href="#discovery" className="inline-block rounded-lg px-6 py-3 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: '#0694D1' }}>
                Book a Discovery Call
              </a>
            </div>
          </div>

          <div className="rounded-3xl px-6 sm:px-8" style={{ background: '#fff', boxShadow: '0 20px 50px rgba(6,148,209,0.12)' }}>
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className={i !== FAQS.length - 1 ? 'border-b' : ''} style={{ borderColor: '#e9f2f8' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                    <span className="font-bold text-base sm:text-lg leading-snug" style={{ color: '#0d1b2a' }}>{f.q}</span>
                    <span className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: '#e3f3fb', color: '#0694D1' }}>
                      {isOpen
                        ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={2.5}><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18"/></svg>
                        : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={2.5}><path strokeLinecap="round" d="M12 5v14M5 12h14"/></svg>}
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s ease' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <div className="rounded-xl p-5 mb-5 text-sm sm:text-base" style={{ background: '#f7fbfd', border: '1px solid #e3eef4', color: '#33475b', lineHeight: 1.7 }}>
                        {f.a}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <style>{`
        .bs-page h1, .bs-page h2 { font-family: var(--font-bricolage), 'Bricolage Grotesque', serif; }
        @media (max-width: 767px) {
          .bs-section { padding-left: 16px !important; padding-right: 16px !important; padding-top: 20px !important; padding-bottom: 20px !important; }
          .bs-page h1, .bs-page h2 { font-size: 20px !important; }
          .bs-page h3 { font-size: 18px !important; }
          .bs-page p { font-size: 14px !important; }
          .bs-hero { padding-top: 20px !important; padding-bottom: 20px !important; }
          .bs-hero-stack > * { margin-bottom: 15px !important; }
          .bs-hero-stack > *:last-child { margin-bottom: 0 !important; }
        }
        .bs-hero-phone { width: 100%; max-width: 320px; margin: 0 auto; }
        .bs-hero-phone__frame { width: 100%; border: 4px solid #0a2540; border-radius: 18px; box-shadow: 0 20px 50px rgba(6,148,209,0.30); background: #0a2540; overflow: hidden; }
        .bs-hero-phone__screen { position: relative; aspect-ratio: 9 / 16; background: #0a2540; border-radius: 14px; overflow: hidden; }
        .bs-hero-phone__video { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; display: block; }
        .bs-hero-phone__sound { position: absolute; bottom: 10px; right: 10px; width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center; background: rgba(9,49,72,0.78); border: 1px solid rgba(255,255,255,0.22); border-radius: 50%; color: #fff; cursor: pointer; z-index: 2; transition: background 180ms ease, transform 140ms ease, border-color 180ms ease; -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); }
        .bs-hero-phone__sound:hover, .bs-hero-phone__sound:focus-visible { background: #0694D1; border-color: rgba(255,255,255,0.5); transform: scale(1.06); outline: none; }
        @media (min-width: 1024px) {
          .bs-hero-phone { width: 250px; max-width: 100%; margin: 0 0 0 auto; }
        }
      `}</style>
    </div>
  )
}

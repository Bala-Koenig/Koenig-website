'use client'
import { useState, useRef, type ReactNode } from 'react'
import { Bricolage_Grotesque } from 'next/font/google'
import Navbar from '@/components/Navbar'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' })

/* ── Data (sourced from koenig-solutions.com/vibe-coding — content reworded, structure kept) ── */
const TOOLS = ['Cursor', 'Bolt', 'Lovable', 'Replit', 'Claude', 'GitHub Copilot', 'V0', 'Vercel', 'Netlify', 'ChatGPT', 'Windsurf', 'Figma']

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
    value: '350+ Trainers', label: 'Certified Experts',
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
  { step: '01', title: 'Free Discovery Call', label: '30 min', desc: '20-30 min call. We learn your goals, scope your project, and match you with the right mentor.' },
  { step: '02', title: 'Plan Your Build', label: 'Build Plan', desc: 'We pick the right tools and map out a clear build plan tailored to your project.' },
  { step: '03', title: 'Build Together', label: 'Live Session', desc: '3-4 live 1-on-1 sessions. Your mentor builds side-by-side with you, fixing issues in real time.' },
  { step: '04', title: 'Ship It', label: 'Terminal', desc: 'We deploy your project to a live URL. You own it completely - code, domain, everything.' },
]

const BOOKING_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const BOOKING_ROWS: ({ name: string; color: string } | null)[][] = [
  [{ name: 'Sarah', color: '#0694D1' }, null, { name: 'Mike', color: '#eab308' }, { name: 'Alex', color: '#22c55e' }, null],
  [{ name: 'John', color: '#0694D1' }, null, { name: 'Ella', color: '#0694D1' }, null, { name: 'Sam', color: '#22c55e' }],
]

const ADMIN_TABLE_USERS = [
  { name: 'Sarah K.', email: 'sarah@co.io', role: 'Admin', roleColor: '#22c55e' },
  { name: 'Mike R.', email: 'mike@co.io', role: 'Editor', roleColor: '#64748b' },
]

const BUILD_IDEAS = [
  { title: 'Web Apps', desc: 'Portals, booking tools, trackers, or any interactive app. Full-stack, database-connected.', label: 'BookingApp', Mock: BookingAppMock },
  { title: 'SaaS Prototypes', desc: 'A working MVP to demo to investors or test with users. Stripe-ready.', label: 'Dashboard', Mock: DashboardMock },
  { title: 'Internal Tools', desc: "Dashboards, admin panels, and reporting tools. Built for your team's workflow.", label: 'Admin Panel', Mock: AdminPanelMock },
  { title: 'Sites & Landing Pages', desc: 'Portfolios, product pages, personal brands. SEO-optimized and responsive.', label: 'mysite.com', Mock: SiteLandingMock },
  { title: 'Browser Extensions', desc: 'Chrome tools and productivity add-ons. Publish to the Chrome Web Store.', label: 'PageHelper', Mock: BrowserExtensionMock },
  { title: 'AI-Powered Apps', desc: 'Chatbots, content generators, recommendation engines. API-integrated.', label: 'AI Chat', Mock: AIChatMock },
]

const PRICING_INCLUDES = [
  'Free discovery call',
  '3-4 live 1-on-1 build sessions',
  'Deployed project on a live URL',
  'Prompt engineering coaching',
  'Personalized tool selection',
  'Reusable playbook + prompts',
  'Post-launch check-in',
  'Tool fluency across 6+ platforms',
]

const WHATS_INCLUDED_CHECKS = [
  'Live URL you can share with anyone',
  'You own the code, domain, and data',
  'Works on desktop and mobile',
]

const WHATS_INCLUDED_TOP = [
  {
    title: '1-on-1 Expert Mentorship',
    desc: "3-4 live sessions with a Koenig trainer from a team that's trained 30,000+ professionals monthly for over 30 years. Real-time debugging, architecture decisions, and deployment guidance.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={2}><circle cx="9" cy="8" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 20a6.5 6.5 0 0113 0"/><circle cx="17" cy="9" r="2.3"/><path strokeLinecap="round" strokeLinejoin="round" d="M14.8 14.3A5.5 5.5 0 0121.5 19.5"/></svg>,
  },
  {
    title: 'Prompt Engineering Skills',
    desc: "Learn to direct AI tools effectively. Write prompts that produce working code, not broken attempts. A skill you'll use on every future project.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  },
]

const WHATS_INCLUDED_BOTTOM = [
  {
    title: 'Tool Fluency',
    desc: 'Hands-on with Cursor, Bolt, Lovable, Replit, Copilot, and more. Know which tool fits which job.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={2}><rect x="2" y="4" width="20" height="13" rx="2"/><path strokeLinecap="round" d="M8 21h8M12 17v4"/></svg>,
  },
  {
    title: 'Reusable Playbook',
    desc: 'Templates, prompts, and workflows to build your next project solo. Your personal reference guide for vibe coding.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13H7z"/><path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5M9 13h6M9 17h6"/></svg>,
  },
  {
    title: 'Post-Launch Check-in',
    desc: "A follow-up session to review, refine, and plan your next build. We don't disappear after deployment.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5"/><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15a8 8 0 0014.9 2.5M19.5 9A8 8 0 004.6 6.5"/></svg>,
  },
]

const FAQS = [
  { q: 'Do I need coding experience?', a: "No. You describe what you want in plain English and your mentor handles the technical side. The entire program is designed for people with zero coding background — you just need an idea and the motivation to build it." },
  { q: 'Who is this for?', a: 'Anyone with an idea for a software product but no coding experience. Entrepreneurs, marketers, designers, freelancers, and professionals who want to build tools for their work or business.' },
  { q: 'How long does it take?', a: '4 weeks total, with 3-4 live mentoring sessions scheduled flexibly around your availability. Most participants spend a few hours a week between sessions refining their project with guidance from their mentor.' },
  { q: "What if I don't know what to build?", a: "That's exactly what the free discovery call is for. We'll talk through your goals, interests, and workflow to find a project that's both useful to you and achievable in 4 weeks." },
  { q: 'What tools will I use?', a: "It depends on your project. We work with tools like Cursor, Bolt, Lovable, Replit, GitHub Copilot, V0, and more. Your mentor will recommend the best stack for what you're building and teach you how to use it." },
  { q: 'What if I get stuck after the program ends?', a: "You'll have a reusable playbook, prompt library, and tool fluency to continue building on your own. Plus, your post-launch check-in session is there to help you troubleshoot and plan your next project." },
  { q: 'Is this a course?', a: "No. There are zero lectures or pre-recorded videos. You build a real project with a dedicated expert beside you from start to deployment. It's hands-on mentorship, not passive learning." },
  { q: 'What happens after?', a: 'You keep everything — your deployed project, all the source code, and your personalized playbook. Plus you get a follow-up check-in session to review progress and troubleshoot anything that comes up.' },
  { q: 'How is this different from free courses and bootcamps?', a: "Free courses and bootcamps teach vibe coding with pre-set exercises. We're different: you pick your own project, and a dedicated mentor builds it with you 1-on-1 until it's deployed live. You don't get a certificate. You get a product." },
]

/* ── Hero product mockup: chat prompt + deployed app preview ──── */
const HERO_CLIENTS = [
  { name: 'Acme Corp', amount: '$2,400', status: 'Paid' },
  { name: 'Globex Inc', amount: '$1,800', status: 'Pending' },
  { name: 'Wayne Ent.', amount: '$3,200', status: 'Paid' },
  { name: 'Sterling & Co', amount: '$4,100', status: 'Paid' },
  { name: 'Nexus Digital', amount: '$2,750', status: 'Pending' },
]
const HERO_TABLE_GRID = { display: 'grid', gridTemplateColumns: '1fr 76px 68px', alignItems: 'center' } as const

function ClientHubMockup() {
  return (
    <div className="vc-hero-visual" style={{ position: 'relative', width: 620, height: 400 }}>
      {/* Chat panel */}
      <div style={{ position: 'absolute', left: 0, top: 105, width: 240, borderRadius: 16, background: '#0c1a26', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 50px rgba(0,0,0,0.35)', padding: 14, zIndex: 1, transform: 'rotate(-4deg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ display: 'flex', height: 20, width: 20, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(6,148,209,0.20)', flexShrink: 0 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2}><circle cx="12" cy="8" r="4"/><path strokeLinecap="round" d="M4 21a8 8 0 0116 0"/></svg>
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>You</span>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>just now</span>
        </div>
        <div style={{ borderRadius: 10, background: 'rgba(6,148,209,0.16)', padding: '10px 12px', marginBottom: 10 }}>
          <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, color: '#e2f4fc' }}>&quot;Build me a client portal with invoicing and payment tracking&quot;</p>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <span style={{ display: 'flex', height: 18, width: 18, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#0694D1', flexShrink: 0, marginTop: 2 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M6 10.5L18 10.5 18 14 12 17 6 14z"/></svg>
          </span>
          <div style={{ borderRadius: 10, background: 'rgba(255,255,255,0.06)', padding: '10px 12px' }}>
            <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.75)' }}>Setting up Next.js project with Stripe integration and client dashboard...</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '9px 10px' }}>
          <span className="vc-prompt-cursor" />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', flex: 1 }}>Type your next prompt...</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </div>
      </div>

      {/* Dashed connector */}
      <svg width="50" height="120" style={{ position: 'absolute', left: 234, top: 130, zIndex: 2 }} viewBox="0 0 50 120" fill="none">
        <path d="M45 115 C 20 100, 10 50, 6 8" stroke="#0694D1" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" opacity="0.55"/>
        <path d="M6 8 L12 10 M6 8 L9 15" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" opacity="0.55"/>
      </svg>

      {/* Browser / deployed-app panel */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: 356, borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 24px 60px rgba(6,148,209,0.25)', zIndex: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', background: '#f3f8fb', borderBottom: '1px solid #e3eef4' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, marginLeft: 8, borderRadius: 999, background: '#fff', border: '1px solid #e3eef4', padding: '3px 10px', fontSize: 10.5, color: '#5b7690' }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#5b7690" strokeWidth={2.5}><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
            clienthub.vercel.app
          </span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, borderRadius: 999, background: '#16a34a', color: '#fff', fontSize: 9.5, fontWeight: 700, padding: '3px 9px' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} /> Live
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#0694D1' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>ClientHub</span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            <span style={{ display: 'flex', height: 18, width: 18, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', fontSize: 9, fontWeight: 700, color: '#fff' }}>R</span>
          </span>
        </div>
        <div style={{ display: 'flex', padding: 14, gap: 10 }}>
          {[{ l: 'REVENUE', v: '$14,730', icon: true }, { l: 'INVOICES', v: '24' }, { l: 'CLIENTS', v: '10' }].map(s => (
            <div key={s.l} style={{ flex: 1, borderRadius: 10, background: s.l === 'REVENUE' ? '#EAF6FC' : '#F8FAFC', border: `1px solid ${s.l === 'REVENUE' ? '#CFE9F7' : '#EEF2F6'}`, padding: '9px 12px' }}>
              <p style={{ margin: 0, fontSize: 9, fontWeight: 700, letterSpacing: 0.5, color: '#94a3b8' }}>{s.l}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#0d1b2a' }}>{s.v}</span>
                {s.icon && (
                  <svg width="18" height="12" viewBox="0 0 24 16" fill="none">
                    <rect x="1" y="9" width="3.5" height="7" rx="1" fill="#bfe3f5"/>
                    <rect x="7" y="5" width="3.5" height="11" rx="1" fill="#7dd0f0"/>
                    <rect x="13" y="7" width="3.5" height="9" rx="1" fill="#38bdf8"/>
                    <rect x="19" y="2" width="3.5" height="14" rx="1" fill="#0694D1"/>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '4px 14px 14px' }}>
          <div style={{ ...HERO_TABLE_GRID, padding: '6px 0', fontSize: 9.5, fontWeight: 700, color: '#94a3b8', borderBottom: '1px solid #eef2f6' }}>
            <span>CLIENT</span><span>AMOUNT</span><span>STATUS</span>
          </div>
          {HERO_CLIENTS.map(c => (
            <div key={c.name} style={{ ...HERO_TABLE_GRID, padding: '7px 0', borderBottom: '1px solid #f5f8fa' }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: '#0d1b2a' }}>{c.name}</span>
              <span style={{ fontSize: 11.5, color: '#334155' }}>{c.amount}</span>
              <span style={{ justifySelf: 'start', fontSize: 9.5, fontWeight: 700, borderRadius: 999, padding: '2px 9px', background: c.status === 'Paid' ? '#dcfce7' : '#fef3c7', color: c.status === 'Paid' ? '#16a34a' : '#b45309' }}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .vc-prompt-cursor { display: inline-block; width: 1.5px; height: 12px; flex-shrink: 0; background: #38bdf8; animation: vcPromptBlink 0.85s steps(1) infinite; }
        @keyframes vcPromptBlink { 50% { opacity: 0; } }
      `}</style>
    </div>
  )
}

function GoingSoloMockup() {
  const errors = [
    'Error: Cannot read properties of undefined',
    'TypeError: fetch failed at line 42',
    "Module not found: './components/Auth'",
    'Warning: deprecated API call on line 89',
  ]
  return (
    <div className="relative">
      <span aria-hidden style={{ position: 'absolute', top: -14, left: 24, right: 24, height: 20, borderRadius: '14px 14px 0 0', background: '#fce7e7', border: '1px solid #f8dede', borderBottom: 'none' }} />
      <span aria-hidden style={{ position: 'absolute', top: -7, left: 12, right: 12, height: 20, borderRadius: '16px 16px 0 0', background: '#fbdbdb', border: '1px solid #f6d4d4', borderBottom: 'none' }} />
      <div className="relative rounded-xl p-4" style={{ background: '#fff', border: '1px solid #f6d4d4' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#dc2626' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#dc2626', flexShrink: 0 }} />
            Build Failed
          </span>
          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: '#fde2e2', color: '#dc2626' }}>Attempt #7</span>
        </div>
        <div className="rounded-lg px-3 py-3 mb-3 text-xs space-y-1.5" style={{ background: '#fdf1f1', border: '1px solid #f9dede', fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}>
          {errors.map(e => <p key={e} style={{ margin: 0, color: '#b91c1c' }}>{e}</p>)}
        </div>
        <div className="flex gap-1 mb-3" style={{ height: 6 }}>
          <span style={{ flex: 1.2, borderRadius: 4, background: '#ef4444' }} />
          <span style={{ flex: 1.2, borderRadius: 4, background: '#ef4444' }} />
          <span style={{ flex: 1, borderRadius: 4, background: '#fbdada' }} />
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#b45309' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={2}><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" d="M12 8v4M12 16h.01"/></svg>
            Progress: Stuck
          </span>
          <span className="rounded-lg px-3.5 py-1.5 text-xs font-semibold" style={{ background: '#fce8e8', color: '#e29b9b' }}>Retry Build</span>
        </div>
      </div>
    </div>
  )
}

function MentorMockup() {
  return (
    <div className="relative">
      <span aria-hidden style={{ position: 'absolute', top: -14, left: 24, right: 24, height: 20, borderRadius: '14px 14px 0 0', background: '#e0f7e9', border: '1px solid #d4f2e0', borderBottom: 'none' }} />
      <span aria-hidden style={{ position: 'absolute', top: -7, left: 12, right: 12, height: 20, borderRadius: '16px 16px 0 0', background: '#d6f3e2', border: '1px solid #c8f0d8', borderBottom: 'none' }} />
      <div className="relative rounded-xl p-4" style={{ background: '#fff', border: '1px solid #c8f0d8' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#0d1b2a' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
            Deployed Successfully
          </span>
          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: '#dcfce7', color: '#166534' }}>Mentor Session Active</span>
        </div>
        <div className="rounded-lg p-3 mb-3" style={{ background: '#f4fbf6', border: '1px solid #dcf3e3' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold" style={{ color: '#0d1b2a' }}>
              <span className="flex items-center justify-center rounded-full" style={{ width: 18, height: 18, background: '#16a34a', flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              myproject.vercel.app
            </span>
            <span className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white" style={{ background: '#16a34a' }}>LIVE</span>
          </div>
          <div className="flex gap-1 mb-2" style={{ height: 6 }}>
            <span style={{ flex: 1, borderRadius: 4, background: '#16a34a' }} />
            <span style={{ flex: 1, borderRadius: 4, background: '#16a34a' }} />
            <span style={{ flex: 1, borderRadius: 4, background: '#16a34a' }} />
          </div>
          <p className="text-right text-xs font-semibold" style={{ color: '#166534', margin: 0 }}>Progress: Complete</p>
        </div>
        <div className="space-y-2.5">
          {[
            "Great work! Your app is live. Let's optimize the dashboard next.",
            "Pushed to production. Here's your deployment checklist for next time.",
          ].map(msg => (
            <div key={msg} className="flex items-start gap-2">
              <span className="flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: '#dbeafe', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={2}><circle cx="12" cy="8" r="3.2"/><path strokeLinecap="round" d="M5 20a7 7 0 0114 0"/></svg>
              </span>
              <p className="rounded-xl px-3 py-2 text-xs" style={{ background: '#eff6ff', color: '#1e3a5f', margin: 0, lineHeight: 1.5 }}>&quot;{msg}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── "What is Vibe Coding?" step mockups ─────────────────────── */
function ChatStepMockup() {
  return (
    <div className="rounded-2xl p-4" style={{ background: '#111c2b' }}>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0694D1', flexShrink: 0 }} />
        <span className="text-xs font-bold tracking-wide" style={{ color: 'rgba(255,255,255,0.55)' }}>AI ASSISTANT</span>
      </div>
      <div className="rounded-xl px-3 py-2.5 mb-2.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)', margin: 0 }}>What would you like to build today?</p>
      </div>
      <div className="rounded-xl px-3 py-2.5 mb-3" style={{ background: '#0694D1' }}>
        <p className="text-sm" style={{ color: '#fff', margin: 0, lineHeight: 1.5 }}>Build me a client portal with invoicing and payment tracking</p>
      </div>
      <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <span className="text-sm flex-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Describe your app idea...</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
      </div>
    </div>
  )
}

const CODE_KW = '#c586c0'
const CODE_STR = '#ce9178'
const CODE_FN = '#dcdcaa'
const CODE_TAG = '#4ec9b0'
const CODE_PLAIN = '#d4d4d4'
const CODE_LINES: { t: string; c: string }[][] = [
  [{ t: 'import ', c: CODE_KW }, { t: 'React', c: CODE_PLAIN }, { t: ' from ', c: CODE_KW }, { t: "'react'", c: CODE_STR }],
  [{ t: 'import ', c: CODE_KW }, { t: 'Dashboard', c: CODE_PLAIN }, { t: ' from ', c: CODE_KW }, { t: "'./Dashboard'", c: CODE_STR }],
  [],
  [{ t: 'export function ', c: CODE_KW }, { t: 'App', c: CODE_FN }, { t: '() {', c: CODE_PLAIN }],
  [{ t: '  const ', c: CODE_KW }, { t: '[clients, setClients] =', c: CODE_PLAIN }],
  [{ t: '    ', c: CODE_PLAIN }, { t: 'useState', c: CODE_FN }, { t: '([])', c: CODE_PLAIN }],
  [],
  [{ t: '  return ', c: CODE_KW }, { t: '(', c: CODE_PLAIN }],
  [{ t: '    ', c: CODE_PLAIN }, { t: '<Dashboard', c: CODE_TAG }],
  [{ t: '      clients=', c: CODE_PLAIN }, { t: '{clients}', c: '#569cd6' }],
]

function CodeStepMockup() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#111c2b' }}>
      <div className="flex items-center gap-4 px-4 pt-3">
        <span className="text-xs font-semibold pb-2" style={{ color: '#fff', borderBottom: '2px solid #0694D1' }}>App.jsx</span>
        <span className="text-xs pb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>index.css</span>
        <span className="text-xs pb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>api.js</span>
      </div>
      <div className="px-4 py-3 text-xs" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", lineHeight: 1.85 }}>
        {CODE_LINES.map((segs, i) => (
          <div key={i} style={{ display: 'flex' }}>
            <span style={{ color: '#5a6678', width: 16, textAlign: 'right', marginRight: 14, flexShrink: 0, userSelect: 'none' }}>{i + 1}</span>
            <span style={{ whiteSpace: 'pre' }}>
              {segs.length === 0 ? ' ' : segs.map((s, j) => <span key={j} style={{ color: s.c }}>{s.t}</span>)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ShipStepMockup() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e3eef4', boxShadow: '0 10px 30px rgba(6,148,209,0.10)' }}>
      <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: '#f3f8fb', borderBottom: '1px solid #e3eef4' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
        <span className="inline-flex items-center gap-1.5 rounded-full ml-2 px-2.5 py-1" style={{ background: '#fff', border: '1px solid #e3eef4', fontSize: 11, color: '#5b7690' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5b7690" strokeWidth={2.5}><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
          yourapp.vercel.app
        </span>
        <span className="ml-auto rounded-full px-2.5 py-1 text-[10px] font-bold text-white" style={{ background: '#16a34a' }}>LIVE</span>
      </div>
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-sm" style={{ color: '#0d1b2a' }}>MyPortfolio</span>
          <div className="flex items-center gap-3 text-xs" style={{ color: '#94a3b8' }}>
            <span>Work</span><span>About</span><span className="font-semibold" style={{ color: '#0694D1' }}>Contact</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center justify-center rounded-full" style={{ width: 34, height: 34, background: '#0694D1', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="8" r="3.2"/><path d="M5 20a7 7 0 0114 0z"/></svg>
          </span>
          <div>
            <p className="font-bold text-sm" style={{ color: '#0d1b2a', margin: 0 }}>Sarah Chen</p>
            <p className="text-xs" style={{ color: '#94a3b8', margin: 0 }}>Product Designer · San Francisco</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <div className="rounded-xl p-2.5" style={{ background: '#f8fafc', border: '1px solid #eef2f6' }}>
            <div className="rounded-lg flex items-center justify-center mb-2" style={{ height: 36, background: '#0694D1' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            </div>
            <p className="text-xs font-bold" style={{ color: '#0d1b2a', margin: 0 }}>E-Commerce App</p>
            <p className="text-[10px]" style={{ color: '#94a3b8', margin: 0 }}>React · Stripe · Vercel</p>
          </div>
          <div className="rounded-xl p-2.5" style={{ background: '#f8fafc', border: '1px solid #eef2f6' }}>
            <div className="rounded-lg flex items-center justify-center mb-2" style={{ height: 36, background: '#16a34a' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 15l4-4 3 3 5-6"/></svg>
            </div>
            <p className="text-xs font-bold" style={{ color: '#0d1b2a', margin: 0 }}>Analytics Dashboard</p>
            <p className="text-[10px]" style={{ color: '#94a3b8', margin: 0 }}>Next.js · Charts · API</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid #f5f8fa' }}>
          <span className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: '#94a3b8' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a' }} /> Deployed · 2 projects live
          </span>
          <span className="text-[11px] font-semibold" style={{ color: '#0694D1' }}>View All</span>
        </div>
      </div>
    </div>
  )
}

const VIBE_STEPS = [
  { n: 1, title: 'Describe Your Idea', desc: 'Tell AI what you want in plain English. No syntax. No programming languages.', Mock: ChatStepMockup },
  { n: 2, title: 'AI Writes the Code', desc: 'AI tools generate working code from your description automatically.', Mock: CodeStepMockup },
  { n: 3, title: 'Ship Your Product', desc: 'Deploy to a live URL the world can use.', Mock: ShipStepMockup },
]

/* ── "How It Works" step mockups ─────────────────────────────── */
function HowItWorksCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ background: '#0d1b2a' }}>
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
        <span className="ml-auto text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}

function DiscoveryCallMock() {
  return (
    <div className="flex gap-2">
      <div className="flex-1 rounded-md flex flex-col items-center justify-center py-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2}><circle cx="12" cy="8" r="3.5"/><path strokeLinecap="round" d="M5 20a7 7 0 0114 0"/></svg>
        <span className="text-[11px] mt-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>You</span>
      </div>
      <div className="flex-1 rounded-md flex flex-col items-center justify-center py-3" style={{ background: 'rgba(6,148,209,0.16)', border: '1px solid #0694D1' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2}><circle cx="12" cy="8" r="3.5"/><path strokeLinecap="round" d="M5 20a7 7 0 0114 0"/></svg>
        <span className="text-[11px] mt-1.5 font-semibold" style={{ color: '#38bdf8' }}>Mentor</span>
      </div>
    </div>
  )
}

const BUILD_PLAN_ITEMS = [
  { t: 'Set up project scaffold', done: true },
  { t: 'Design database schema', done: true },
  { t: 'Build auth flow', done: false },
  { t: 'Deploy to Vercel', done: false },
]

function BuildPlanMock() {
  return (
    <div>
      {BUILD_PLAN_ITEMS.map(item => (
        <div key={item.t} className="flex items-center gap-2 mb-2 last:mb-0">
          <span className="flex items-center justify-center rounded flex-shrink-0" style={{ width: 14, height: 14, background: item.done ? '#0694D1' : 'transparent', border: item.done ? 'none' : '1px solid rgba(255,255,255,0.3)' }}>
            {item.done && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.5}><polyline points="20 6 9 17 4 12"/></svg>}
          </span>
          <span className="text-[11px]" style={{ color: item.done ? '#fff' : 'rgba(255,255,255,0.4)' }}>{item.t}</span>
        </div>
      ))}
    </div>
  )
}

function LiveSessionMock() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <p className="text-[9px] font-bold tracking-wide mb-2" style={{ color: '#38bdf8' }}>MENTOR</p>
        {[100, 75, 55].map((w, i) => <div key={i} style={{ height: 4, width: `${w}%`, background: '#0694D1', borderRadius: 2, marginBottom: 6 }} />)}
      </div>
      <div>
        <p className="text-[9px] font-bold tracking-wide mb-2" style={{ color: '#eab308' }}>YOU</p>
        {[65, 35].map((w, i) => <div key={i} style={{ height: 4, width: `${w}%`, background: '#eab308', borderRadius: 2, marginBottom: 6 }} />)}
        <div style={{ height: 4, width: 2, background: 'rgba(234,179,8,0.6)' }} />
      </div>
    </div>
  )
}

function ShipTerminalMock() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth={3.5}><polyline points="20 6 9 17 4 12"/></svg>
        <span className="text-[11px]" style={{ color: '#fff' }}>Build complete</span>
      </div>
      <div className="flex items-center gap-2 mb-1.5">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth={3.5}><polyline points="20 6 9 17 4 12"/></svg>
        <span className="text-[11px]" style={{ color: '#fff' }}>Tests passed</span>
      </div>
      <div className="flex items-start gap-2">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth={3.5} style={{ marginTop: 2, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
        <span className="text-[11px]" style={{ color: '#fff', lineHeight: 1.5 }}>Deployed to<br />yourapp.vercel.app</span>
      </div>
    </div>
  )
}

const PATHWAY_MOCKS = [DiscoveryCallMock, BuildPlanMock, LiveSessionMock, ShipTerminalMock]

/* ── "What You Can Build" idea mockups ───────────────────────── */
function BuildCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ background: '#0d1b2a' }}>
      <div className="relative flex items-center px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-1.5">
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span className="flex items-center rounded-full flex-shrink-0" style={{ width: 22, height: 12, padding: 2, background: on ? '#0694D1' : 'rgba(255,255,255,0.15)' }}>
      <span className="rounded-full" style={{ width: 8, height: 8, background: '#fff', marginLeft: on ? 10 : 0, transition: 'margin 0.2s ease' }} />
    </span>
  )
}

function BookingAppMock() {
  return (
    <div>
      <div className="grid grid-cols-5 gap-1 mb-1.5">
        {BOOKING_DAYS.map(d => <span key={d} className="text-center text-[8px] font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>{d}</span>)}
      </div>
      {BOOKING_ROWS.map((row, ri) => (
        <div key={ri} className="grid grid-cols-5 gap-1 mb-1">
          {row.map((cell, ci) => cell
            ? <span key={ci} className="rounded text-center text-[8px] font-semibold py-1 truncate" style={{ background: cell.color, color: '#fff' }}>{cell.name}</span>
            : <span key={ci} className="rounded" style={{ background: 'rgba(255,255,255,0.04)', height: 18 }} />
          )}
        </div>
      ))}
      <div className="flex justify-end mt-2">
        <span className="rounded-md px-3 py-1 text-[10px] font-semibold text-white" style={{ background: '#0694D1' }}>Book Now</span>
      </div>
    </div>
  )
}

function DashboardMock() {
  const stats = [
    { v: '$4.2k', l: 'MRR', c: '#38bdf8' },
    { v: '+24%', l: 'Growth', c: '#4ade80' },
    { v: '183', l: 'Users', c: '#fff' },
  ]
  return (
    <div>
      <div className="grid grid-cols-3 gap-1.5 mb-2.5">
        {stats.map(s => (
          <div key={s.l} className="rounded-md py-1.5 text-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <p className="text-[11px] font-bold" style={{ color: s.c, margin: 0 }}>{s.v}</p>
            <p className="text-[8px]" style={{ color: 'rgba(255,255,255,0.4)', margin: 0 }}>{s.l}</p>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-1" style={{ height: 30 }}>
        {[30, 45, 35, 60, 50, 70, 85].map((h, i) => <span key={i} style={{ flex: 1, height: `${h}%`, background: '#0694D1', borderRadius: 2 }} />)}
      </div>
    </div>
  )
}

function AdminPanelMock() {
  return (
    <div className="flex gap-2.5">
      <div className="flex flex-col gap-1" style={{ width: 50 }}>
        <span className="rounded px-1.5 py-1 text-[8px] font-semibold text-white" style={{ background: '#0694D1' }}>Dashboard</span>
        <span className="rounded px-1.5 py-1 text-[8px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Users</span>
        <span className="rounded px-1.5 py-1 text-[8px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Reports</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="grid grid-cols-3 gap-1 mb-1.5 text-[7px] font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>
          <span>Name</span><span>Email</span><span>Role</span>
        </div>
        {ADMIN_TABLE_USERS.map(u => (
          <div key={u.name} className="grid grid-cols-3 gap-1 items-center mb-1.5">
            <span className="text-[9px] truncate" style={{ color: '#fff' }}>{u.name}</span>
            <span className="text-[8px] truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{u.email}</span>
            <span className="rounded-full text-[7px] font-semibold text-center py-0.5" style={{ background: u.roleColor, color: '#fff' }}>{u.role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SiteLandingMock() {
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold" style={{ color: '#fff' }}>Acme Co</span>
        <div className="flex items-center gap-2 text-[8px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
          <span>Features</span><span>Pricing</span>
          <span className="rounded px-2 py-1 font-semibold text-white" style={{ background: '#0694D1' }}>Sign Up</span>
        </div>
      </div>
      <p className="text-[13px] font-extrabold" style={{ color: '#fff', margin: 0, lineHeight: 1.35 }}>Ship faster.<br />Scale smarter.</p>
      <p className="text-[8px] mt-1.5 mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>The platform for modern teams</p>
      <div className="flex items-center gap-2">
        <span className="rounded px-2.5 py-1.5 text-[8px] font-semibold text-white" style={{ background: '#0694D1' }}>Get Started</span>
        <span className="rounded px-2.5 py-1.5 text-[8px] font-semibold" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>Learn More</span>
      </div>
      <span className="flex items-center justify-center rounded-md" style={{ position: 'absolute', right: 0, bottom: -2, width: 22, height: 22, background: '#0694D1' }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
      </span>
    </div>
  )
}

function BrowserExtensionMock() {
  return (
    <div>
      <div className="flex items-center gap-1.5 rounded-md px-2 py-1.5 mb-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path strokeLinecap="round" d="M21 21l-4-4"/></svg>
        <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.5)' }}>example.com/article</span>
      </div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Block Ads</span>
        <Toggle on />
      </div>
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Dark Mode</span>
        <Toggle on={false} />
      </div>
      <div className="rounded-md py-1.5 text-center text-[9px] font-semibold text-white" style={{ background: '#0694D1' }}>Save</div>
    </div>
  )
}

function AIChatMock() {
  return (
    <div>
      <div className="flex justify-end mb-3">
        <span className="rounded-full px-2.5 py-1 text-[8px] font-semibold text-white" style={{ background: '#0694D1' }}>Summarize this article</span>
      </div>
      <div className="flex items-start gap-1.5 mb-3.5">
        <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 16, height: 16, background: 'rgba(6,148,209,0.2)' }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2.5}><circle cx="12" cy="8" r="3.5"/><path strokeLinecap="round" d="M5 20a7 7 0 0114 0"/></svg>
        </span>
        <p className="rounded-lg px-2.5 py-1.5 text-[9px]" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.5 }}>Here are the key points from this article...</p>
      </div>
      <div className="flex items-center gap-1.5 rounded-md px-2.5 py-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <span className="flex-1 text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Type a message...</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
      </div>
    </div>
  )
}

function FitTrackMock() {
  const stats = [
    { v: '5', l: 'this week', label: 'Workouts' },
    { v: '12', l: 'days', label: 'Streak' },
    { v: '2,340', l: 'burned', label: 'Calories' },
  ]
  const activity = [
    { d: 'M', h: 45 },
    { d: 'T', h: 60 },
    { d: 'W', h: 25 },
    { d: 'T', h: 85 },
    { d: 'F', h: 55 },
    { d: 'S', h: 8 },
    { d: 'S', h: 8 },
  ]
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e3eef4', boxShadow: '0 10px 30px rgba(6,148,209,0.10)' }}>
      <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: '#f3f8fb', borderBottom: '1px solid #e3eef4' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
        <span className="inline-flex items-center gap-1.5 rounded-full ml-2 px-2.5 py-1" style={{ background: '#fff', border: '1px solid #e3eef4', fontSize: 11, color: '#5b7690' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5b7690" strokeWidth={2.5}><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
          fittrack.vercel.app
        </span>
        <span className="ml-auto rounded-full px-2.5 py-1 text-[10px] font-bold text-white" style={{ background: '#16a34a' }}>LIVE</span>
      </div>
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-center justify-between rounded-xl px-4 py-3 mb-4" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)' }}>
          <span className="flex items-center gap-2 font-bold text-sm text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 7-7"/><path strokeLinecap="round" strokeLinejoin="round" d="M14 8h6v6"/></svg>
            FitTrack
          </span>
          <span className="rounded-full flex-shrink-0" style={{ width: 22, height: 22, background: 'rgba(255,255,255,0.35)' }} />
        </div>
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {stats.map(s => (
            <div key={s.label} className="rounded-xl p-2.5" style={{ background: '#f8fafc', border: '1px solid #eef2f6' }}>
              <p className="text-[10px] font-semibold" style={{ color: '#94a3b8', margin: 0 }}>{s.label}</p>
              <p className="font-extrabold text-base" style={{ color: '#0d1b2a', margin: 0 }}>{s.v}</p>
              <p className="text-[10px]" style={{ color: '#0694D1', margin: 0 }}>{s.l}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] font-bold tracking-wide mb-2" style={{ color: '#94a3b8' }}>WEEKLY ACTIVITY</p>
        <div className="flex items-end gap-1.5" style={{ height: 44 }}>
          {activity.map((a, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end" style={{ height: '100%' }}>
              <span className="w-full rounded-sm" style={{ height: `${a.h}%`, background: a.h > 70 ? '#0694D1' : 'rgba(6,148,209,0.35)' }} />
            </div>
          ))}
        </div>
        <div className="flex gap-1.5 mt-1">
          {activity.map((a, i) => <span key={i} className="flex-1 text-center text-[9px] font-semibold" style={{ color: '#94a3b8' }}>{a.d}</span>)}
        </div>
      </div>
    </div>
  )
}

/* ── Registration form ──────────────────────────────────────── */
function RegisterForm() {
  const inputCls = 'w-full rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-white/35 transition-colors'
  const inputSty = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: '#fff' }
  const labelCls = 'block text-sm font-semibold mb-1.5 text-white'
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div><label className={labelCls}>Full Name <span className="text-red-400">*</span></label><input className={inputCls} style={inputSty} placeholder="Your full name" /></div>
        <div><label className={labelCls}>Email Address <span className="text-red-400">*</span></label><input className={inputCls} style={inputSty} type="email" placeholder="you@email.com" /></div>
      </div>
      <div className="mb-3">
        <label className={labelCls}>Phone Number <span className="text-red-400">*</span></label>
        <input className={inputCls} style={inputSty} type="tel" placeholder="+1 (555) 000-0000" />
      </div>
      <div className="mb-3">
        <label className={labelCls}>What do you want to build? <span className="text-red-400">*</span></label>
        <textarea className={`${inputCls} resize-none`} style={inputSty} rows={3} placeholder="Describe your project idea..." />
      </div>
      <div className="mb-5">
        <label className={labelCls}>Anything else you&apos;d like us to know?</label>
        <input className={inputCls} style={inputSty} placeholder="Optional — timeline, experience level, or questions" />
      </div>
      <div className="flex justify-center mb-5">
        <div className="inline-flex items-center gap-3 rounded-xl px-5 py-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#0694D1' }} />
          <span className="text-sm text-white">I&apos;m not a robot</span>
          <div className="ml-4 text-right"><p className="text-[9px] font-bold" style={{ color: '#4A90D9' }}>reCAPTCHA</p><p className="text-[8px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Privacy · Terms</p></div>
        </div>
      </div>
      <button type="button" className="w-full rounded-xl py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #0694D1, #00B4D8)', boxShadow: '0 4px 20px rgba(6,148,209,0.40)' }}>START BUILDING</button>
    </>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function VibeCodingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [pathPage, setPathPage] = useState(0)
  const pathTouchX = useRef<number>(0)

  return (
    <div className={`vc-page ${bricolage.variable}`} style={{ fontFamily: 'inherit' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="px-4 lg:px-[50px]" style={{ background: 'radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 45%, #040C18 100%)', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          @keyframes vcFloatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
          @keyframes vcFloatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(16px)} }
          .vc-blob1 { animation: vcFloatA 7s ease-in-out infinite; }
          .vc-blob2 { animation: vcFloatB 8s ease-in-out infinite; }
        `}</style>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="vc-blob1 absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="vc-blob2 absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-cyan-300/8 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl pt-2.5 pb-2.5 sm:pt-16 sm:pb-16" style={{ position: 'relative' }}>
          <div className="vc-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 560px', gap: 32, alignItems: 'center' }}>

            {/* Left: copy */}
            <div className="text-center lg:text-left min-w-0">
              <h1 className="font-extrabold leading-[1.1] mb-5" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: '#fff' }}>
                Learn to Code Using <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI</span>
              </h1>
              <p className="text-sm sm:text-base mb-6" style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, maxWidth: 520 }}>
                Go from idea to a live, deployed project in 4 weeks.<br className="hidden sm:block" /> A Koenig expert builds alongside you, 1-on-1.<br className="hidden sm:block" /> <strong style={{ color: '#fff' }}>No coding experience needed.</strong>
              </p>

              <div className="vc-hero-badges flex flex-wrap justify-center lg:justify-start mb-6">
                {[
                  { label: '1-on-1 Expert Mentorship', icon: <><circle cx="12" cy="8" r="3.2"/><path fill="none" stroke="#38bdf8" strokeWidth={1.8} strokeLinecap="round" d="M5 20a7 7 0 0114 0"/></> },
                  { label: 'You Pick Your Project', icon: <path fill="none" stroke="#38bdf8" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/> },
                  { label: 'Deployed to a Live URL', icon: <path fill="none" stroke="#38bdf8" strokeWidth={1.8} d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15 15 0 010 20 15 15 0 010-20z"/> },
                ].map(item => (
                  <span key={item.label} className="vc-hero-badge inline-flex shrink items-center whitespace-nowrap" style={{ background: 'rgba(6,148,209,0.14)', border: '1px solid rgba(6,148,209,0.35)', color: 'rgba(255,255,255,0.85)' }}>
                    <span className="vc-hero-badge-icon flex shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <svg viewBox="0 0 24 24" fill="#38bdf8">{item.icon}</svg>
                    </span>
                    {item.label}
                  </span>
                ))}
              </div>
              <style>{`
                .vc-hero-badges { gap: 6px; }
                .vc-hero-badge { border-radius: 999px; padding: 2px 5px 2px 2px; gap: 3px; font-size: 7.3px; font-weight: 700; }
                .vc-hero-badge-icon { width: 15px; height: 15px; }
                .vc-hero-badge-icon svg { width: 9px; height: 9px; }
                .vc-hero-badge-icon svg path, .vc-hero-badge-icon svg circle { stroke-width: 2.6; }
                @media (min-width: 640px) {
                  .vc-hero-badges { gap: 10px; }
                  .vc-hero-badge { padding: 6px 16px 6px 8px; gap: 8px; font-size: 14px; font-weight: 600; }
                  .vc-hero-badge-icon { width: 24px; height: 24px; }
                  .vc-hero-badge-icon svg { width: 14px; height: 14px; }
                  .vc-hero-badge-icon svg path, .vc-hero-badge-icon svg circle { stroke-width: 1.8; }
                }
              `}</style>

              <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-center lg:justify-start items-center gap-3">
                <div className="rounded-full px-6 py-3" style={{ background: 'rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.35)' }}>
                  <span className="text-xl font-extrabold" style={{ color: '#38bdf8' }}>$999</span>
                  <span className="text-sm ml-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>(One-Time)</span>
                </div>
                <a href="#register" className="w-full sm:w-auto text-center rounded-xl px-9 py-4 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 8px 24px rgba(6,148,209,0.40)' }}>
                  START BUILDING
                </a>
              </div>
            </div>

            {/* Right: product mockup */}
            <div className="vc-hero-term flex justify-center lg:justify-end">
              <ClientHubMockup />
            </div>
          </div>

        </div>

        <style>{`
          .vc-hero-visual { zoom: 0.9; }
          @media (max-width: 1023px) {
            .vc-hero-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 32px !important; }
          }
          @media (max-width: 680px) {
            .vc-hero-visual { zoom: 0.62; }
          }
          @media (max-width: 440px) {
            .vc-hero-visual { zoom: 0.52; }
          }
        `}</style>
      </section>

      {/* ── TOOL MARQUEE STRIP ───────────────────────────────────── */}
      <section style={{ background: '#0a1628', padding: '20px 0 22px' }}>
        <p className="text-center text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Build with the tools the pros use
        </p>
        <div style={{ overflow: 'hidden' }}>
          <div className="vc-marquee-track" style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}>
            {[...TOOLS, ...TOOLS].map((t, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <span className="text-lg sm:text-2xl font-extrabold tracking-wide" style={{ padding: '0 32px', color: i % 2 === 0 ? '#0694D1' : 'rgba(255,255,255,0.30)' }}>{t}</span>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', flexShrink: 0 }} />
              </span>
            ))}
          </div>
        </div>
        <style>{`
          .vc-marquee-track { animation: vcMarquee 32s linear infinite; }
          @keyframes vcMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        `}</style>
      </section>

      {/* ── SOCIAL PROOF STATS ───────────────────────────────────── */}
      <section className="vc-section px-4 lg:px-[50px]" style={{ background: '#fff', paddingTop: 28, paddingBottom: 28 }}>
        <div className="mx-auto max-w-5xl vc-stats-wrap flex flex-wrap items-center justify-center sm:justify-between gap-y-6 gap-x-10">
          {STATS.map((s, i) => (
            <div key={i} className="vc-stat-item flex items-center gap-3">
              <div className="vc-stat-icon" style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(6,148,209,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
          .vc-stat-icon { animation: vcStatPulse 2.6s ease-out infinite; }
          @keyframes vcStatPulse {
            0%   { box-shadow: 0 0 0 0 rgba(6,148,209,0.35); }
            70%  { box-shadow: 0 0 0 10px rgba(6,148,209,0); }
            100% { box-shadow: 0 0 0 0 rgba(6,148,209,0); }
          }
          @media (max-width: 639px) {
            .vc-stats-wrap {
              flex-direction: column;
              align-items: stretch;
              gap: 0;
              background: rgba(6,148,209,0.06);
              border: 1px solid rgba(6,148,209,0.18);
              border-radius: 16px;
              padding: 4px 20px;
            }
            .vc-stat-item {
              padding: 14px 0;
              border-top: 1px solid rgba(6,148,209,0.18);
            }
            .vc-stat-item:first-child {
              border-top: none;
            }
          }
        `}</style>
      </section>

      {/* ── WHAT IS VIBE CODING ──────────────────────────────────── */}
      <section className="vc-section px-4 lg:px-[50px]" style={{ background: '#EAF6FC', paddingTop: 64, paddingBottom: 64 }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-extrabold text-[28px] sm:text-[42px] mb-3" style={{ color: '#0d1b2a' }}>
            What is Vibe Coding?
          </h2>
          <p className="text-center text-sm sm:text-base mb-10" style={{ color: '#33475b' }}>
            From idea to live product in 3 simple steps. No coding experience required.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {VIBE_STEPS.map(s => (
              <div key={s.n} className="rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 10px 30px rgba(6,148,209,0.08)' }}>
                <p className="font-bold text-base mb-4">
                  <span style={{ color: '#0694D1' }}>Step {s.n}</span> <span style={{ color: '#0d1b2a' }}>— {s.title}</span>
                </p>
                <div className="mb-4"><s.Mock /></div>
                <p className="text-sm" style={{ color: '#5b7690', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE KOENIG ────────────────────────────────────── */}
      <section className="vc-section px-4 lg:px-[50px]" style={{ background: '#fff', paddingTop: 56, paddingBottom: 56 }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-extrabold text-[26px] sm:text-[38px] mb-3" style={{ color: '#0694D1' }}>
            Why Choose Koenig?
          </h2>
          <p className="text-center text-sm sm:text-lg font-semibold mb-10" style={{ color: '#0d1b2a' }}>
            The tools are easy. Building alone isn&apos;t. That&apos;s where expert mentorship makes the difference.
          </p>
          <div className="vc-vs-grid relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="rounded-2xl p-6 sm:p-8" style={{ background: '#fdf1f1', border: '1px solid #f6d4d4' }}>
              <div className="flex items-center gap-2.5 mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={2}><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" d="M15 9l-6 6M9 9l6 6"/></svg>
                <h3 className="font-extrabold text-xl" style={{ color: '#dc2626' }}>Going Solo</h3>
              </div>
              <p className="text-sm sm:text-base mb-6" style={{ color: '#3f3f46', lineHeight: 1.75 }}>
                Free courses teach you the basics. YouTube shows the demos. But when you try to build <strong>your own project</strong>, things break. <strong>Prompts don&apos;t work. Errors pile up.</strong> Without guidance, you&apos;re just prompting in circles.
              </p>
              <GoingSoloMockup />
            </div>

            <span className="vc-vs-badge hidden lg:flex items-center justify-center rounded-full" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 56, height: 56, background: '#0d1b2a', color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: 0.5, zIndex: 2, boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}>VS</span>

            <div className="rounded-2xl p-6 sm:p-8" style={{ background: '#eefaf2', border: '1px solid #c8f0d8' }}>
              <div className="flex items-center gap-2.5 mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2}><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 12.5l2.5 2.5L16 9"/></svg>
                <h3 className="font-extrabold text-xl" style={{ color: '#16a34a' }}>With a Mentor</h3>
              </div>
              <p className="text-sm sm:text-base mb-6" style={{ color: '#3f3f46', lineHeight: 1.75 }}>
                This isn&apos;t a course. It&apos;s <strong>1-on-1 mentorship</strong>. A Koenig expert builds alongside you, session by session, until <strong>your project is live</strong>. When you&apos;re stuck, they show you the way.
              </p>
              <MentorMockup />
            </div>
          </div>
        </div>
        <style>{`
          @media (min-width: 1024px) {
            .vc-vs-grid::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: #e2e8f0; }
          }
        `}</style>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="vc-section px-4 lg:px-[50px]" style={{ background: '#eef7fc', paddingTop: 64, paddingBottom: 64 }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-extrabold text-[26px] sm:text-[38px] mb-3" style={{ color: '#0d1b2a' }}>
            How It Works
          </h2>
          <p className="text-center text-sm sm:text-lg font-semibold mb-10" style={{ color: '#0d1b2a' }}>
            From idea to live project in four guided steps. Here&apos;s exactly what happens.
          </p>
          <div className="relative">
            {(() => {
              const pathCard = (p: typeof PATHWAY[number], i: number) => {
                const Mock = PATHWAY_MOCKS[i]
                return (
                  <div key={p.step} className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #e6eef3' }}>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="flex items-center justify-center rounded-full font-bold text-xs text-white flex-shrink-0" style={{ width: 32, height: 32, background: '#0694D1' }}>{p.step}</span>
                      <h3 className="font-extrabold text-lg leading-snug" style={{ color: '#0d1b2a' }}>{p.title}</h3>
                    </div>
                    <p className="text-sm mb-4" style={{ color: '#5b7690', lineHeight: 1.6 }}>{p.desc}</p>
                    <HowItWorksCard label={p.label}><Mock /></HowItWorksCard>
                  </div>
                )
              }
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

                  {/* Desktop: full grid with dashed connectors */}
                  <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 vc-how-grid">
                    {PATHWAY.map((p, i) => (
                      <div key={p.step} className="relative">
                        {pathCard(p, i)}
                        {i < PATHWAY.length - 1 && (
                          <svg className="vc-how-arrow hidden lg:block" width="28" height="14" viewBox="0 0 28 14" fill="none" style={{ position: 'absolute', right: -24, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
                            <path d="M1 7h20" stroke="#0694D1" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round"/>
                            <path d="M17 2l6 5-6 5" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )
            })()}
          </div>
          <div className="flex justify-center mt-10">
            <a href="#register" className="rounded-xl px-9 py-4 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 8px 24px rgba(6,148,209,0.40)' }}>
              START BUILDING
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU CAN BUILD ───────────────────────────────────── */}
      <section className="vc-section vc-got-section px-4 lg:px-[50px]" style={{ background: '#fff', paddingTop: 56, paddingBottom: 56 }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-[18px] sm:mb-10">
            <h2 className="font-extrabold text-[28px] sm:text-[42px] mb-3" style={{ color: '#0694D1' }}>
              What You Can Build
            </h2>
            <p className="text-sm sm:text-lg font-semibold" style={{ color: '#0d1b2a' }}>
              You decide. We help you ship it. Here are some ideas to get you started.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BUILD_IDEAS.map(idea => (
              <div key={idea.title} className="vc-feat-card rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #e6eef3', boxShadow: '0 4px 16px rgba(6,148,209,0.06)' }}>
                <h3 className="font-extrabold text-xl mb-2" style={{ color: '#0d1b2a', fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>{idea.title}</h3>
                <p className="text-sm mb-4" style={{ color: '#5b7690', lineHeight: 1.6 }}>{idea.desc}</p>
                <BuildCard label={idea.label}><idea.Mock /></BuildCard>
              </div>
            ))}
          </div>
          <p className="text-center text-sm italic mt-8 mb-6" style={{ color: '#5b7690' }}>
            Not sure what to build? That&apos;s what the discovery call is for.
          </p>
          <div className="flex justify-center">
            <a href="#register" className="rounded-xl px-9 py-4 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 8px 24px rgba(6,148,209,0.40)' }}>
              BOOK A DISCOVERY CALL
            </a>
          </div>
          <style>{`
            .vc-feat-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
            .vc-feat-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(6,148,209,0.15) !important; }
          `}</style>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────────────── */}
      <section className="vc-section px-4 lg:px-[50px]" style={{ background: '#eef7fc', paddingTop: 64, paddingBottom: 64 }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-extrabold text-[28px] sm:text-[42px] mb-3" style={{ color: '#0d1b2a' }}>
            What&apos;s Included
          </h2>
          <p className="text-center text-sm sm:text-lg font-semibold mb-10" style={{ color: '#0d1b2a' }}>
            A working project. And the skills to build the next one on your own.
          </p>

          <div className="vc-incl-card grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-center rounded-2xl p-6 sm:p-8 mb-6" style={{ background: '#fff', boxShadow: '0 10px 30px rgba(6,148,209,0.08)' }}>
            <FitTrackMock />
            <div>
              <h3 className="font-extrabold text-xl mb-3" style={{ color: '#0d1b2a', fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>A Deployed, Live Project</h3>
              <p className="text-sm sm:text-base mb-5" style={{ color: '#5b7690', lineHeight: 1.7 }}>
                Hosted on a real URL you can share. Not a mockup, not a prototype — a working product that&apos;s live on the internet.
              </p>
              <ul className="space-y-3">
                {WHATS_INCLUDED_CHECKS.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base font-medium" style={{ color: '#0d1b2a' }}>
                    <svg width="18" height="18" className="mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {WHATS_INCLUDED_TOP.map(f => (
              <div key={f.title} className="vc-incl-card rounded-2xl p-6 sm:p-7" style={{ background: '#fff', borderLeft: '4px solid #0694D1', boxShadow: '0 10px 30px rgba(6,148,209,0.08)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center rounded-xl flex-shrink-0" style={{ width: 44, height: 44, background: '#eaf6fc' }}>{f.icon}</span>
                  <h3 className="font-extrabold text-xl" style={{ color: '#0d1b2a', fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>{f.title}</h3>
                </div>
                <p className="text-sm sm:text-base" style={{ color: '#5b7690', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {WHATS_INCLUDED_BOTTOM.map(f => (
              <div key={f.title} className="vc-incl-card rounded-2xl p-6" style={{ background: '#fff', borderLeft: '4px solid #0694D1', boxShadow: '0 10px 30px rgba(6,148,209,0.08)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center rounded-xl flex-shrink-0" style={{ width: 40, height: 40, background: '#eaf6fc' }}>{f.icon}</span>
                  <h3 className="font-extrabold text-lg" style={{ color: '#0d1b2a', fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>{f.title}</h3>
                </div>
                <p className="text-sm" style={{ color: '#5b7690', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <style>{`
            .vc-incl-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
            .vc-incl-card:hover { transform: translateY(-4px); box-shadow: 0 14px 34px rgba(6,148,209,0.14) !important; }
          `}</style>
        </div>
      </section>

      {/* ── READY TO START BUILDING ──────────────────────────────── */}
      <section id="register" className="vc-section px-4 lg:px-[50px]" style={{ background: '#fff', paddingTop: 56, paddingBottom: 56 }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-extrabold text-[28px] sm:text-[42px] mb-3" style={{ color: '#0694D1' }}>
            Ready to Start Building?
          </h2>
          <p className="text-center text-sm sm:text-lg font-semibold mb-10" style={{ color: '#0d1b2a' }}>
            One price. Everything included. Book your free discovery call today.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden" style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.18)' }}>
            {/* Left: price + checklist */}
            <div className="p-8 sm:p-12" style={{ background: '#07304a' }}>
              <p className="font-extrabold" style={{ fontSize: 46, color: '#fff', lineHeight: 1, fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>$999</p>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>One-time payment. No subscriptions.</p>
              <ul className="space-y-3 mb-7">
                {PRICING_INCLUDES.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <svg width="16" height="16" className="mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#38bdf8" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Start with a free discovery call. No commitment required.</p>
            </div>

            {/* Right: form */}
            <div className="p-8 sm:p-12" style={{ background: '#0a1a2b' }}>
              <h3 className="font-extrabold text-2xl mb-6 text-white" style={{ fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>Book Your Free Discovery Call</h3>
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="vc-section px-4 lg:px-[50px] relative overflow-hidden" style={{ background: '#f0f9ff', paddingTop: 64, paddingBottom: 64 }}>
        <div className="pointer-events-none absolute left-0 bottom-0 h-[450px] w-[450px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.30) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.28) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.22) 0%, transparent 70%)' }} />

        <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-16">
          {/* Left: intro + CTA */}
          <div className="lg:sticky lg:top-24 self-start">
            <h2 className="font-extrabold text-[28px] sm:text-[36px] leading-tight mb-4" style={{ color: '#0d1b2a', borderLeft: '4px solid #0694D1', paddingLeft: 18, fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", serif' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base mb-8" style={{ color: '#5b7690', paddingLeft: 18 }}>
              Everything you need to know before getting started.
            </p>
            <div style={{ paddingLeft: 18 }}>
              <p className="font-bold text-sm sm:text-base mb-1.5" style={{ color: '#0d1b2a' }}>Still have questions?</p>
              <p className="text-sm mb-5" style={{ color: '#5b7690' }}>Book a free discovery call and we&apos;ll walk you through everything.</p>
              <a href="#register" className="inline-block rounded-lg px-6 py-3 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: '#0694D1' }}>
                BOOK A DISCOVERY CALL
              </a>
            </div>
          </div>

          {/* Right: FAQ list */}
          <div>
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className="border-b" style={{ borderColor: '#d9ecf7' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                    <span className="font-bold text-base sm:text-lg leading-snug" style={{ color: '#0d1b2a' }}>{f.q}</span>
                    <span className="flex-shrink-0" style={{ color: '#0694D1' }}>
                      {isOpen
                        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={2.5}><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18"/></svg>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={2.5}><path strokeLinecap="round" d="M12 5v14M5 12h14"/></svg>}
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s ease' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <div className="rounded-xl p-5 mb-5 text-sm sm:text-base" style={{ background: '#fff', border: '1px solid #e3eef4', color: '#33475b', lineHeight: 1.7 }}>
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
        .vc-page h1, .vc-page h2 { font-family: var(--font-bricolage), 'Bricolage Grotesque', serif; }
        @media (max-width: 767px) {
          .vc-section { padding-left: 16px !important; padding-right: 16px !important; padding-top: 10px !important; padding-bottom: 10px !important; }
        }
      `}</style>
    </div>
  )
}

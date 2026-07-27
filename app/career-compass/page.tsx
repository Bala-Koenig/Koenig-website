'use client'
import { useState, useRef, Fragment, type DragEvent } from 'react'
import Navbar from '@/components/Navbar'
import CareerCompassNavbar from '@/components/CareerCompassNavbar'
import CareerCompassFooter from '@/components/CareerCompassFooter'

const TOOL_URL = 'https://academy.koenig-solutions.com/career'

/* ── Data (sourced from academy.koenig-solutions.com/career — content unchanged, restyled) ── */

const TRUST_BADGES = [
  { label: 'CV encrypted at rest and never public', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6.5-4.35-9-8.5C1.2 8.5 3 4.5 7 4.5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 5.8 4 4 8-2.5 4.15-9 8.5-9 8.5z" /> },
  { label: 'One-account ownership for every report', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
  { label: 'Retryable report and account deletion', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> },
]

const STEPS = [
  { n: '01', title: 'Upload', desc: 'Your CV (PDF, photo, or pasted text) and the job you want — pasted, linked, or screenshotted.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.5L13.5 3H7a2 2 0 00-2 2v14a2 2 0 002 2zM13 3v6h6" /> },
  { n: '02', title: 'Compare line by line', desc: 'Every requirement in the posting gets a verdict — met, partial, or missing — with evidence quoted from your CV.', icon: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></> },
  { n: '03', title: 'Follow your path', desc: 'Each gap maps to a specific course, chapter, or post — free, and built to close that exact gap.', icon: <><path d="M12 4l9 4-9 4-9-4 9-4z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9 4 9-4M3 16l9 4 9-4" /></> },
]

const STATS = [
  { value: 'Free', label: 'AI course generated for every gap' },
  { value: 'Growing', label: 'Library of posts to learn from' },
  { value: '~60s', label: 'From upload to full report' },
  { value: '$0', label: 'Cost · no card · no spam' },
]

const WHAT_YOU_GET = [
  {
    title: 'A Fit Score',
    desc: 'A single, honest number for how you match the job — not a guess.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
  },
  {
    title: 'A Skill Gap Breakdown',
    desc: 'Every requirement in the posting, verdicted met, partial, or missing — with evidence quoted straight from your CV.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
  {
    title: 'A Free Course Built for You',
    desc: 'Each gap maps to a specific course, chapter, or post. If nothing covers it, our AI content authors write a full course for that exact gap — typically within hours.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
  },
  {
    title: 'A Certificate',
    desc: 'Close the gap, prove it. Earn a certificate for every course you complete.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a4 4 0 100-8 4 4 0 000 8zm-3.5 1.5L7 21l5-2 5 2-1.5-4.5" />,
  },
]

const WIZARD_STEPS = ['Your CV', 'Target job', 'Review']

const FAQS = [
  { q: 'How is the fit score computed?', a: "An AI analyst decomposes the posting into atomic requirements, checks each one against evidence in your CV, and weights must-haves 3x. It's an AI estimate to guide your preparation — not a recruiter's decision." },
  { q: 'What happens to my CV?', a: "It's stored encrypted, never made public, and used only for your Career Compass services. Your CV and report remain private until you delete them or delete your account. Deletion is queued durably and retried if a storage provider is temporarily unavailable." },
  { q: 'Does it work with non-English CVs?', a: 'Yes — CVs and job postings in other languages are analyzed and reported in English, with a note on the source language.' },
  { q: 'What if no course covers my gap?', a: "That's the special part: you can request one. Our AI content authors write a full course for that exact gap — typically within hours — and we email you when it's live." },
]

/* ── Page ────────────────────────────────────────────────────── */
export default function CareerCompassPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [jobText, setJobText] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [wizardStep, setWizardStep] = useState(0)
  const [cvMode, setCvMode] = useState<'file' | 'paste'>('file')
  const [cvPasteText, setCvPasteText] = useState('')

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f) setCvFile(f)
  }

  return (
    <div className="cc-page">
      <Navbar />
      <CareerCompassNavbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="px-4 lg:px-[50px]" style={{ background: 'radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 45%, #040C18 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="dot-pattern absolute inset-0" style={{ pointerEvents: 'none', opacity: 0.5 }} />
        <div className="mx-auto max-w-7xl relative pt-5 pb-5 sm:pt-[35px] sm:pb-[35px]" style={{ zIndex: 5 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 mb-5 text-xs sm:text-sm font-bold uppercase" style={{ color: '#38bdf8', letterSpacing: '0.12em' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={1.8}><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-4 2-2 4 4-2 2-4z" /></svg>
                Career Compass
              </div>
              <h1 className="font-extrabold leading-[1.1] mb-6" style={{ fontSize: 35, color: '#fff' }}>
                See exactly what stands between you and the job.
              </h1>
              <p className="text-sm sm:text-base mb-8" style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, maxWidth: 560 }}>
                Career Compass by Koenig AI Academy analyzes your CV against any job posting and returns a fit score, precise skill gap breakdown, a free personalized AI course to close each gap, and a certificate — in about 60 seconds. No payment required; sign in to open and save your private result.
              </p>
              <a href="#upload" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white mb-7 transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 8px 24px rgba(6,148,209,0.40)' }}>
                Chart my course
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </a>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
                {TRUST_BADGES.map(b => (
                  <span key={b.label} className="inline-flex items-center gap-1.5 text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={1.8}>{b.icon}</svg>
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            {/* ── "you → the job" journey graphic ──────────────────── */}
            <div className="relative rounded-2xl overflow-hidden" style={{ height: 320, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.25)' }}>
              <svg viewBox="0 0 1000 320" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <path d="M70 260 C 350 280, 620 160, 930 90" fill="none" stroke="#38bdf8" strokeWidth={2} strokeLinecap="round" opacity={0.65} />
                <circle cx="70" cy="260" r="9" fill="#0694D1" />
                <circle cx="70" cy="260" r="16" fill="none" stroke="#0694D1" strokeWidth={1.5} opacity={0.4} />
                <circle cx="930" cy="90" r="9" fill="#f59e0b" />
                <circle cx="930" cy="90" r="16" fill="none" stroke="#f59e0b" strokeWidth={1.5} opacity={0.4} />
              </svg>
              <span className="absolute text-xs font-mono" style={{ left: '7%', top: 'calc(81.25% + 14px)', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)' }}>you</span>
              <span className="absolute text-xs font-mono" style={{ left: '93%', top: 'calc(28.125% - 26px)', transform: 'translateX(-50%)', color: '#f5c377' }}>the job</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section className="px-4 lg:px-[50px]" style={{ background: '#f0f9ff' }}>
        <div className="mx-auto max-w-7xl pt-[15px] pb-[15px] sm:pt-[35px] sm:pb-[35px]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map(s => (
              <div key={s.label} className="rounded-2xl text-center px-3 py-6" style={{ background: '#fff', border: '1px solid #dbeefa' }}>
                <p className="font-extrabold mb-1" style={{ fontSize: 'clamp(20px, 3vw, 30px)', color: '#0694D1' }}>{s.value}</p>
                <p className="text-xs sm:text-sm" style={{ color: '#5b7690' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section id="how-it-works" className="px-4 lg:px-[50px]" style={{ background: '#fff' }}>
        <div className="mx-auto max-w-7xl pt-[15px] pb-[15px] sm:pt-[35px] sm:pb-[35px]">
          <div className="text-center mb-12">
            <h2 className="font-extrabold text-[26px] sm:text-[38px] leading-tight mb-3" style={{ color: '#0d1b2a' }}>How It Works</h2>
            <p className="text-sm sm:text-base mx-auto" style={{ color: '#5b7690', maxWidth: 560 }}>
              Three steps between you and a clear picture of where you stand.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map(s => (
              <div key={s.n} className="rounded-2xl p-7" style={{ background: '#f7fbfd', border: '1px solid #e3eef4' }}>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="flex items-center justify-center rounded-full font-bold" style={{ width: 30, height: 30, fontSize: 12, background: '#e3f3fb', color: '#0694D1' }}>{s.n}</span>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={1.7}>{s.icon}</svg>
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0d1b2a' }}>{s.title}</h3>
                <p className="text-sm" style={{ color: '#5b7690', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────────────────── */}
      <section className="px-4 lg:px-[50px]" style={{ background: 'radial-gradient(ellipse at 50% 0%, #0D3F5A 0%, #071B2E 45%, #040C18 100%)' }}>
        <div className="mx-auto max-w-7xl pt-[15px] pb-[15px] sm:pt-[35px] sm:pb-[35px]">
          <div className="text-center mb-12">
            <h2 className="font-extrabold text-[26px] sm:text-[38px] leading-tight mb-3" style={{ color: '#fff' }}>What You Get</h2>
            <p className="text-sm sm:text-base mx-auto" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560 }}>
              One upload. A complete, personalized plan to close the gap.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHAT_YOU_GET.map(f => (
              <div key={f.title} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(6,148,209,0.25)' }}>
                <span className="flex items-center justify-center rounded-xl mb-4" style={{ width: 44, height: 44, background: 'rgba(6,148,209,0.18)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={1.8}>{f.icon}</svg>
                </span>
                <h3 className="font-bold text-base mb-2" style={{ color: '#fff' }}>{f.title}</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPLOAD ───────────────────────────────────────────────── */}
      <section id="upload" className="px-4 lg:px-[50px]" style={{ background: '#f0f9ff' }}>
        <div className="mx-auto max-w-4xl pt-[15px] pb-[15px] sm:pt-[35px] sm:pb-[35px]">
          <div className="text-center mb-10">
            <h2 className="font-extrabold text-[26px] sm:text-[38px] leading-tight mb-3" style={{ color: '#0d1b2a' }}>Start Your Free Analysis</h2>
            <p className="text-sm sm:text-base mx-auto" style={{ color: '#5b7690', maxWidth: 560 }}>
              Drop your CV and the job you want. Your fit score and learning path follow in about 60 seconds.
            </p>
          </div>

          <div className="rounded-3xl p-6 sm:p-9" style={{ background: '#fff', border: '1px solid #dbeefa', boxShadow: '0 20px 50px rgba(6,148,209,0.10)' }}>

            {/* Step indicator */}
            <div className="flex items-center mb-9">
              {WIZARD_STEPS.map((label, i) => (
                <Fragment key={label}>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 22, height: 22, border: `2px solid ${i <= wizardStep ? '#0694D1' : '#cfe3ec'}` }}>
                      {i < wizardStep && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      )}
                      {i === wizardStep && <span className="rounded-full" style={{ width: 8, height: 8, background: '#0694D1' }} />}
                    </span>
                    <span className="text-sm font-bold whitespace-nowrap" style={{ color: i === wizardStep ? '#0694D1' : '#9db3bf' }}>{label}</span>
                  </div>
                  {i !== WIZARD_STEPS.length - 1 && (
                    <span className="flex-1 mx-3 sm:mx-4" style={{ height: 1, background: i < wizardStep ? '#0694D1' : '#dce9ef' }} />
                  )}
                </Fragment>
              ))}
            </div>

            {/* Step 1 — Your CV */}
            {wizardStep === 0 && (
              <div>
                <h3 className="font-extrabold text-xl sm:text-2xl mb-2" style={{ color: '#0d1b2a' }}>Your CV</h3>
                <p className="text-sm mb-5" style={{ color: '#5b7690', lineHeight: 1.7 }}>
                  PDF or a clear photo works. It&apos;s encrypted at rest, never public, and stays under your account&apos;s deletion controls.
                </p>
                <div className="inline-flex rounded-full p-1 mb-6" style={{ background: '#eef6fa' }}>
                  <button type="button" onClick={() => setCvMode('file')} className="rounded-full px-4 py-2 text-sm font-bold transition-all" style={cvMode === 'file' ? { background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: '#fff' } : { color: '#5b7690', background: 'transparent' }}>
                    Upload file
                  </button>
                  <button type="button" onClick={() => setCvMode('paste')} className="rounded-full px-4 py-2 text-sm font-bold transition-all" style={cvMode === 'paste' ? { background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: '#fff' } : { color: '#5b7690', background: 'transparent' }}>
                    Paste text
                  </button>
                </div>

                {cvMode === 'file' ? (
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    className="flex flex-col items-center justify-center text-center rounded-2xl px-4 py-12 cursor-pointer transition-colors"
                    style={{ border: `2px dashed ${dragOver ? '#0694D1' : '#bfe0f2'}`, background: dragOver ? 'rgba(6,148,209,0.06)' : '#f7fbfd' }}
                  >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth={1.6} className="mb-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.5L13.5 3H7a2 2 0 00-2 2v14a2 2 0 002 2zM13 3v6h6" />
                    </svg>
                    <p className="text-sm mb-1" style={{ color: '#5b7690' }}>
                      {cvFile ? <span className="font-semibold" style={{ color: '#0d1b2a' }}>{cvFile.name}</span> : <>Drag it here, or <span className="font-bold underline" style={{ color: '#0694D1' }}>browse</span></>}
                    </p>
                    <p className="text-xs" style={{ color: '#8098a8' }}>PDF, PNG, JPG, WebP · up to 8 MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.webp"
                      className="hidden"
                      onChange={e => setCvFile(e.target.files?.[0] ?? null)}
                    />
                  </div>
                ) : (
                  <textarea
                    value={cvPasteText}
                    onChange={e => setCvPasteText(e.target.value)}
                    placeholder="Paste your CV text here…"
                    rows={8}
                    className="w-full rounded-2xl px-4 py-3 text-sm outline-none resize-none"
                    style={{ border: '1px solid #bfe0f2', background: '#f7fbfd', color: '#0d1b2a' }}
                  />
                )}

                <div className="flex justify-end mt-7">
                  <button
                    type="button"
                    disabled={cvMode === 'file' ? !cvFile : !cvPasteText.trim()}
                    onClick={() => setWizardStep(1)}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)' }}
                  >
                    Next — target job
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Target Job */}
            {wizardStep === 1 && (
              <div>
                <h3 className="font-extrabold text-xl sm:text-2xl mb-2" style={{ color: '#0d1b2a' }}>Target Job</h3>
                <p className="text-sm mb-5" style={{ color: '#5b7690', lineHeight: 1.7 }}>
                  Paste the posting, drop a link, or paste a screenshot.
                </p>
                <textarea
                  value={jobText}
                  onChange={e => setJobText(e.target.value)}
                  placeholder="Paste the job posting or its link here…"
                  rows={8}
                  className="w-full rounded-2xl px-4 py-3 text-sm outline-none resize-none"
                  style={{ border: '1px solid #bfe0f2', background: '#f7fbfd', color: '#0d1b2a' }}
                />
                <div className="flex items-center justify-between mt-7">
                  <button type="button" onClick={() => setWizardStep(0)} className="text-sm font-bold" style={{ color: '#5b7690' }}>← Back</button>
                  <button
                    type="button"
                    disabled={!jobText.trim()}
                    onClick={() => setWizardStep(2)}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)' }}
                  >
                    Next — review
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Review */}
            {wizardStep === 2 && (
              <div>
                <h3 className="font-extrabold text-xl sm:text-2xl mb-2" style={{ color: '#0d1b2a' }}>Review</h3>
                <p className="text-sm mb-5" style={{ color: '#5b7690', lineHeight: 1.7 }}>
                  Make sure everything looks right before we analyze your fit.
                </p>
                <div className="space-y-3 mb-7">
                  <div className="rounded-2xl px-5 py-4" style={{ border: '1px solid #e3eef4', background: '#f7fbfd' }}>
                    <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#8098a8' }}>Your CV</p>
                    <p className="text-sm font-semibold" style={{ color: '#0d1b2a' }}>
                      {cvMode === 'file' ? (cvFile?.name ?? 'No file uploaded') : (cvPasteText.trim() ? `${cvPasteText.trim().slice(0, 80)}${cvPasteText.trim().length > 80 ? '…' : ''}` : 'No text pasted')}
                    </p>
                  </div>
                  <div className="rounded-2xl px-5 py-4" style={{ border: '1px solid #e3eef4', background: '#f7fbfd' }}>
                    <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#8098a8' }}>Target Job</p>
                    <p className="text-sm font-semibold" style={{ color: '#0d1b2a' }}>
                      {jobText.trim() ? `${jobText.trim().slice(0, 80)}${jobText.trim().length > 80 ? '…' : ''}` : 'No job posting added'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button type="button" onClick={() => setWizardStep(1)} className="text-sm font-bold" style={{ color: '#5b7690' }}>← Back</button>
                  <a
                    href={TOOL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 8px 24px rgba(6,148,209,0.40)' }}
                  >
                    Analyze My Fit — It&apos;s Free
                  </a>
                </div>
              </div>
            )}

            <p className="text-center text-xs mt-7" style={{ color: '#8098a8' }}>Opens Career Compass · ~60 seconds · no card required</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section id="faqs" className="px-4 lg:px-[50px] relative overflow-hidden pt-[15px] pb-[15px] sm:pt-[35px] sm:pb-[35px]" style={{ background: '#f0f9ff' }}>
        <div className="pointer-events-none absolute left-0 bottom-0 h-[450px] w-[450px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.30) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.28) 0%, transparent 70%)' }} />

        <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-24 self-start">
            <h2 className="font-extrabold text-[28px] sm:text-[36px] leading-tight mb-4" style={{ color: '#0d1b2a' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base mb-8" style={{ color: '#5b7690' }}>
              Everything you&apos;d want to know before you upload. Anything else, ask Nova once you&apos;re in.
            </p>
            <div>
              <p className="font-bold text-sm sm:text-base mb-1.5" style={{ color: '#0d1b2a' }}>Ready to see your fit score?</p>
              <p className="text-sm mb-5" style={{ color: '#5b7690' }}>It&apos;s free, it&apos;s fast, and it&apos;s built to show you exactly what to learn next.</p>
              <a href="#upload" className="inline-block rounded-lg px-6 py-3 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: '#0694D1' }}>
                Start Your Free Analysis
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

      <CareerCompassFooter />
    </div>
  )
}

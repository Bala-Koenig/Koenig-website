'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'

type Tab = 'individual' | 'enterprise'

const HEAR_OPTIONS = [
  'Select Option',
  'Google / Search Engine',
  'LinkedIn',
  'Facebook / Instagram',
  'Colleague / Friend Referral',
  'Email Newsletter',
  'YouTube',
  'Event / Webinar',
  'Other',
]

export default function AdvisorModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('individual')
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', hear: 'Select Option', message: '' })
  const [submitted, setSubmitted] = useState(false)

  if (typeof window === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(4,15,26,0.80)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}>
      <div
        className="relative w-full max-w-xl rounded-2xl overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#0b2d45,#071e30)', border: '1px solid rgba(6,148,209,0.25)', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white">
          ✕
        </button>

        <div className="p-7 sm:p-8">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'rgba(6,148,209,0.18)', border: '1px solid rgba(6,148,209,0.4)' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">We&apos;ll be in touch!</h3>
              <p className="text-sm text-white/55">Our training advisor will contact you within 1 business day.</p>
              <button
                onClick={() => { onClose(); setSubmitted(false); setForm({ name: '', email: '', phone: '', course: '', hear: 'Select Option', message: '' }) }}
                className="mt-6 rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
                style={{ background: 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.4)' }}>
                Close
              </button>
            </div>
          ) : (
            <>
              {/* LET'S TALK badge */}
              <div className="mb-4 flex justify-center">
                <span className="rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-widest text-white" style={{ borderColor: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.06)' }}>
                  LET&apos;S TALK
                </span>
              </div>

              {/* Title */}
              <h2 className="mb-1 text-center text-2xl font-bold text-white">
                Request for more{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg,#0694D1,#38bdf8)' }}>information</span>
              </h2>

              {/* Quick contact */}
              <div className="mt-5 mb-5 flex gap-3">
                <a
                  href="https://wa.me/919840722417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
                  style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.35)' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp us
                </a>
                <a
                  href="mailto:sales@koenig-solutions.com"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
                  style={{ background: 'rgba(6,148,209,0.12)', border: '1px solid rgba(6,148,209,0.30)' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                  Email us
                </a>
              </div>

              {/* Individual / Enterprise toggle */}
              <div className="mb-5 flex rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <button
                  onClick={() => setTab('individual')}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all"
                  style={tab === 'individual' ? { background: '#0694D1', color: '#fff', boxShadow: '0 0 16px rgba(6,148,209,0.40)' } : { color: 'rgba(255,255,255,0.5)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Individual
                </button>
                <button
                  onClick={() => setTab('enterprise')}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all"
                  style={tab === 'enterprise' ? { background: '#0694D1', color: '#fff', boxShadow: '0 0 16px rgba(6,148,209,0.40)' } : { color: 'rgba(255,255,255,0.5)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                  Enterprise
                </button>
              </div>

              {/* Form */}
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="space-y-4">
                <style>{`.lead-input{background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.10);color:#fff;transition:border-color .2s,box-shadow .2s}.lead-input:focus{border-color:#0694D1;box-shadow:0 0 0 3px rgba(6,148,209,0.15);outline:none}.lead-input::placeholder{color:rgba(255,255,255,0.25)}.lead-input option{background:#0b2d45;color:#fff}`}</style>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-white/60">Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                    <input required type="text" placeholder="John Smith" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="lead-input w-full rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-white/60">Business Email <span style={{ color: '#ef4444' }}>*</span></label>
                    <input required type="email" placeholder="john@company.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="lead-input w-full rounded-xl px-4 py-3 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-white/60">Phone</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="lead-input w-full rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-white/60">Select Course Name</label>
                    <input type="text" placeholder="e.g. AZ-104, AWS, CISSP..." value={form.course} onChange={e => setForm(p => ({ ...p, course: e.target.value }))} className="lead-input w-full rounded-xl px-4 py-3 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-white/60">How did you hear about us?</label>
                  <select value={form.hear} onChange={e => setForm(p => ({ ...p, hear: e.target.value }))} className="lead-input w-full rounded-xl px-4 py-3 text-sm appearance-none cursor-pointer">
                    {HEAR_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-white/60">Tell us more about your Training Request</label>
                  <textarea rows={3} placeholder="e.g. We need Azure certification for 50 engineers across 3 countries..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="lead-input w-full resize-none rounded-xl px-4 py-3 text-sm" />
                </div>

                {/* reCAPTCHA placeholder */}
                <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.10)' }}>
                  <div className="h-5 w-5 shrink-0 rounded border-2 border-white/30 bg-white/5" />
                  <span className="text-sm text-white/60">I&apos;m not a robot</span>
                  <div className="ml-auto flex flex-col items-center gap-0.5">
                    <div className="h-8 w-8 rounded" style={{ background: 'conic-gradient(#0694D1 60%, #38bdf8 60% 75%, #ffffff22 75%)', border: '1px solid rgba(6,148,209,0.3)' }} />
                    <span className="text-[9px] text-white/30 leading-none">reCAPTCHA</span>
                    <span className="text-[8px] text-white/20 leading-none">Privacy · Terms</span>
                  </div>
                </div>

                <button type="submit" className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 4px 20px rgba(6,148,209,0.40)' }}>
                  Submit — Get a Free Consultation
                </button>
                <p className="text-center text-xs text-white/30">We&apos;ll respond within 1 business day · No spam, ever.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

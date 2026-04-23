'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'

export default function AdvisorModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '' })
  const [submitted, setSubmitted] = useState(false)

  if (typeof window === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(4,15,26,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}>
      <div
        className="relative w-full max-w-lg rounded-2xl p-8"
        style={{ background: 'linear-gradient(145deg,#0a2d45,#072238)', border: '1px solid rgba(6,148,209,0.30)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white">
          ✕
        </button>
        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'rgba(6,148,209,0.18)', border: '1px solid rgba(6,148,209,0.4)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-white">We&apos;ll be in touch!</h3>
            <p className="text-sm text-white/55">Our training advisor will contact you within 1 business day.</p>
            <button
              onClick={() => { onClose(); setSubmitted(false); setForm({ name: '', email: '', phone: '', interest: '' }) }}
              className="mt-6 rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
              style={{ background: 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.4)' }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <span className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ color: '#0694D1', background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.3)' }}>Free Consultation</span>
            <h2 className="mb-1 text-xl font-bold text-white">Talk to a Training Advisor</h2>
            <p className="mb-6 text-sm text-white/55">Tell us your goal — we&apos;ll match you with the right course, format, and schedule.</p>
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="space-y-4">
              <style>{`.adv-input{background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.10);transition:border-color .2s,box-shadow .2s}.adv-input:focus{border-color:#0694D1;box-shadow:0 0 0 3px rgba(6,148,209,0.15);outline:none}.adv-input::placeholder{color:rgba(255,255,255,0.25)}`}</style>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-white/65">Full Name</label>
                  <input required type="text" placeholder="John Smith" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="adv-input w-full rounded-xl px-4 py-3 text-sm text-white" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-white/65">Email</label>
                  <input required type="email" placeholder="john@company.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="adv-input w-full rounded-xl px-4 py-3 text-sm text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-white/65">Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="adv-input w-full rounded-xl px-4 py-3 text-sm text-white" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-white/65">What are you looking to learn?</label>
                <textarea required rows={3} placeholder="e.g. AWS certification, Azure fundamentals, Cybersecurity..." value={form.interest} onChange={e => setForm(p => ({ ...p, interest: e.target.value }))} className="adv-input w-full resize-none rounded-xl px-4 py-3 text-sm text-white" />
              </div>
              <button type="submit" className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 4px 20px rgba(6,148,209,0.40)' }}>
                Submit — Talk to an Advisor
              </button>
              <p className="text-center text-xs text-white/30">We&apos;ll respond within 1 business day · No spam, ever.</p>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}

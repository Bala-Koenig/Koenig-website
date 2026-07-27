'use client'
import { useState } from 'react'

export default function CareerCompassFooter() {
  const [email, setEmail] = useState('')

  return (
    <footer className="ccf" style={{ background: 'var(--ccf-bg)', borderTop: '1px solid var(--ccf-border)' }}>
      <div className="px-4 md:px-8 lg:px-[50px] py-[15px] sm:py-14">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.3fr_1fr]">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex items-center justify-center rounded-lg font-bold text-white" style={{ width: 32, height: 32, background: 'var(--ccf-badge)', fontSize: 15 }}>K</span>
              <span className="text-[15px]" style={{ color: 'var(--ccf-heading)' }}>
                <span className="font-bold">Koenig</span> <span className="font-medium" style={{ color: 'var(--ccf-muted)' }}>AI Academy</span>
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--ccf-muted)', lineHeight: 1.7, maxWidth: 300 }}>
              Find your AI career path with Career Compass, then learn the skills that get you there — long-form lessons, runnable prompts, and an always-on tutor.
            </p>
            <p className="text-xs" style={{ color: 'var(--ccf-faint)', lineHeight: 1.7 }}>
              Part of <a href="https://www.koenig-solutions.com" target="_blank" rel="noopener noreferrer" className="underline font-medium" style={{ color: 'var(--ccf-muted)' }}>Koenig Solutions</a> — Microsoft Partner of the Year 2025.
            </p>
          </div>

          {/* Career Compass */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--ccf-faint)', letterSpacing: '0.08em' }}>Career Compass</h4>
            <ul className="space-y-2.5">
              <li><a href="/career-compass" className="text-sm" style={{ color: 'var(--ccf-strong)' }}>Find your path</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--ccf-faint)', letterSpacing: '0.08em' }}>Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm" style={{ color: 'var(--ccf-strong)' }}>Press</a></li>
              <li><a href="/sitemap" className="text-sm" style={{ color: 'var(--ccf-strong)' }}>Sitemap</a></li>
            </ul>
          </div>

          {/* Daily AI Brief */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--ccf-faint)', letterSpacing: '0.08em' }}>Daily AI Brief</h4>
            <p className="text-sm mb-4" style={{ color: 'var(--ccf-muted)', lineHeight: 1.7 }}>
              Daily AI brief — same-day commentary on what Anthropic, OpenAI, Google, and Cloudflare ship. Anonymous-by-default. Weekly digest, no tracking.
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full min-w-0 rounded-lg border px-3 py-2 text-sm outline-none placeholder-white/40"
                style={{ background: 'var(--ccf-input-bg)', borderColor: 'var(--ccf-input-border)', color: 'var(--ccf-heading)' }}
              />
              <button type="submit" className="flex-shrink-0 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: 'var(--ccf-button)' }}>
                Get the brief
              </button>
            </form>
          </div>

          {/* Koenig Solutions */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--ccf-faint)', letterSpacing: '0.08em' }}>Koenig Solutions</h4>
            <ul className="space-y-2.5">
              <li><a href="https://www.koenig-solutions.com" target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: 'var(--ccf-strong)' }}>koenig-solutions.com</a></li>
              <li><a href="https://www.linkedin.com/company/koenig-solutions" target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: 'var(--ccf-strong)' }}>LinkedIn</a></li>
              <li><a href="https://github.com/koenig-solutions" target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: 'var(--ccf-strong)' }}>GitHub</a></li>
              <li><a href="https://twitter.com/koenigsolutions" target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: 'var(--ccf-strong)' }}>X / Twitter</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--ccf-border)' }} className="px-4 md:px-8 lg:px-[50px] py-[15px] sm:py-5">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm flex flex-wrap items-center gap-x-5 gap-y-1" style={{ color: 'var(--ccf-faint)' }}>
            <span>© 2026 Koenig Solutions Pvt Ltd</span>
            <a href="/privacy-policy" className="hover:underline" style={{ color: 'var(--ccf-muted)' }}>Privacy</a>
            <a href="/terms-of-service" className="hover:underline" style={{ color: 'var(--ccf-muted)' }}>Terms</a>
          </p>
          <p className="text-sm italic" style={{ color: 'var(--ccf-faint)' }}>
            Tagline: <span>&ldquo;Learn AI the day it ships.&rdquo;</span>
          </p>
        </div>
      </div>

      <style>{`
        .ccf {
          --ccf-bg: #071929;
          --ccf-border: rgba(255,255,255,0.08);
          --ccf-badge: #0694D1;
          --ccf-heading: #f3f4f6;
          --ccf-strong: rgba(255,255,255,0.85);
          --ccf-muted: rgba(255,255,255,0.55);
          --ccf-faint: rgba(255,255,255,0.4);
          --ccf-input-bg: rgba(255,255,255,0.06);
          --ccf-input-border: rgba(255,255,255,0.15);
          --ccf-button: #0694D1;
        }
      `}</style>
    </footer>
  )
}

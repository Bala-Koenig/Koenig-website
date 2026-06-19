'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import DownloadPptButton from '@/components/DownloadPptButton'
import AboutSubNav from '@/components/AboutSubNav'
import ContactForm from '../technologies/power-platform/components/ContactForm'

const STATS = [
  { value: '33+',      label: 'Years of Excellence',            icon: '/images/home-banner/icon-infographic-30+.svg' },
  { value: '30,000+', label: 'Students Trained Every Month',    icon: '/images/home-banner/icon-infographic-30000+.svg' },
  { value: '99.1%',   label: 'On-Time Batch',                   icon: '/images/home-banner/icon-infographic-99.svg' },
  { value: '300+',    label: 'Excellent Trainers',              icon: '/images/home-banner/icon-infographic-300+.svg' },
  { value: '5,000+',  label: 'Courses — 100+ Added Every Month', icon: '/images/home-banner/icon-infographic-5000+.svg' },
]

const OFFICES = [
  { code: 'in', country: 'India' },
  { code: 'ca', country: 'Canada' },
  { code: 'gb', country: 'Kingdom' },
  { code: 'ae', country: 'UAE' },
  { code: 'us', country: 'USA' },
  { code: 'sg', country: 'Singapore' },
  { code: 'nl', country: 'Netherlands' },
  { code: 'za', country: 'South Africa' },
  { code: 'nz', country: 'New Zealand' },
  { code: 'au', country: 'Australia' },
  { code: 'sa', country: 'Saudi Arabia' },
  { code: 'de', country: 'Germany' },
  { code: 'my', country: 'Malaysia' },
]

type Tab = 'who' | 'global'

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<Tab>('who')
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="about-page" style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
<Navbar />
      <AboutSubNav />

      {/* ── DARK HERO ──────────────────────────────────────── */}
      <style>{`
        @keyframes blob1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-30px) scale(1.1)}66%{transform:translate(-20px,20px) scale(0.95)}}
        @keyframes blob2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-35px,25px) scale(1.08)}66%{transform:translate(25px,-15px) scale(0.92)}}
        @keyframes blob3{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,40px) scale(1.05)}66%{transform:translate(-30px,-20px) scale(1.1)}}
        .about-blob1{animation:blob1 12s ease-in-out infinite}
        .about-blob2{animation:blob2 15s ease-in-out infinite}
        .about-blob3{animation:blob3 18s ease-in-out infinite}
        @keyframes wwwFadeUp{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes wwwBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes wwwPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.7;transform:scale(1.15)}}
        @keyframes wwwSpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        .www-item{animation:wwwFadeUp 0.5s ease both}
        .www-item:nth-child(1){animation-delay:0.1s}
        .www-item:nth-child(2){animation-delay:0.25s}
        .www-item:nth-child(3){animation-delay:0.4s}
        .www-icon-q{animation:wwwPulse 2.4s ease-in-out infinite}
        .www-icon-pin{animation:wwwBounce 2s ease-in-out infinite}
        .www-icon-clock{animation:wwwSpin 6s linear infinite}
        @keyframes chevSlide{0%,100%{transform:translateX(0);opacity:0.35}50%{transform:translateX(7px);opacity:0.9}}
        @keyframes chevSlideDown{0%,100%{transform:translateY(0);opacity:0.35}50%{transform:translateY(7px);opacity:0.9}}
        .chev-r{animation:chevSlide 1.6s ease-in-out infinite}
        .chev-r2{animation:chevSlide 1.6s ease-in-out 0.53s infinite}
        .chev-r3{animation:chevSlide 1.6s ease-in-out 1.06s infinite}
        .chev-d{animation:chevSlideDown 1.6s ease-in-out 0.27s infinite}
      `}</style>
      <section className="relative bg-[#06111E] overflow-hidden py-5 sm:py-[50px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="about-blob1 absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#0694D1] opacity-[0.08] blur-[130px]" />
          <div className="about-blob2 absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#38bdf8] opacity-[0.06] blur-[110px]" />
          <div className="about-blob3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#0694D1] opacity-[0.04] blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize:'24px 24px'}} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">

          <div className="kglass-banner py-10 px-8 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-[36px] font-bold text-white leading-tight mb-3">
                  About <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Koenig Solutions</span>
                </h1>
                <p className="text-base text-white/80 mb-3 leading-relaxed">
                  A global leader in IT training. Just tell us
                </p>
                <div className="flex flex-wrap gap-3 mb-3">
                  {/* What */}
                  <span className="www-item inline-flex items-center gap-1.5 bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] font-semibold text-sm px-4 py-1.5 rounded-full">
                    <span className="www-icon-q inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] text-xs font-black leading-none">?</span>
                    What
                  </span>
                  {/* Where */}
                  <span className="www-item inline-flex items-center gap-1.5 bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] font-semibold text-sm px-4 py-1.5 rounded-full">
                    <span className="www-icon-pin inline-flex items-center justify-center w-5 h-5">
                      <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                        <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 114.5 5 1.5 1.5 0 016 6.5z" fill="#38bdf8"/>
                      </svg>
                    </span>
                    Where
                  </span>
                  {/* When */}
                  <span className="www-item inline-flex items-center gap-1.5 bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] font-semibold text-sm px-4 py-1.5 rounded-full">
                    <span className="www-icon-clock inline-flex items-center justify-center w-5 h-5">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </span>
                    When
                  </span>
                </div>
                <p className="text-base text-white/80 leading-relaxed">— we'll deliver the training.</p>
                <p className="text-sm text-white/60 mb-6">
                  We empower you to earn <span className="text-white font-medium">Money, Respect and Peace of Mind.</span>
                </p>
                <div className="inline-flex flex-col gap-0">
                  <DownloadPptButton />
                </div>
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

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="kglass-dark rounded-2xl p-4 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt={s.label} className="h-8 w-8 object-contain shrink-0"
                  style={{ filter: 'brightness(0) saturate(100%) invert(66%) sepia(72%) saturate(500%) hue-rotate(163deg) brightness(103%)' }} />
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#38bdf8] leading-tight">{s.value}</div>
                  <div className="text-xs text-white/60 leading-snug">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE + GLOBAL PRESENCE (TABS) ───────────── */}
      <section className="relative bg-white overflow-hidden py-5 sm:py-[50px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="about-blob1 absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#0694D1] opacity-[0.07] blur-[120px]" />
          <div className="about-blob3 absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.05] blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">

          {/* Tab navigation */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex overflow-hidden rounded-2xl border border-koenig-blue/15 bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]">

              {/* Who We Are tab */}
              <button
                onClick={() => setActiveTab('who')}
                className={`relative flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-[250ms] ${
                  activeTab === 'who'
                    ? 'bg-gradient-to-r from-koenig-blue to-cyan-500 text-white shadow-md shadow-koenig-blue/30'
                    : 'text-koenig-muted hover:text-koenig-dark'
                }`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Who We Are
              </button>

              {/* Our Global Presence tab */}
              <button
                onClick={() => setActiveTab('global')}
                className={`relative flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-[250ms] ${
                  activeTab === 'global'
                    ? 'bg-gradient-to-r from-koenig-blue to-cyan-500 text-white shadow-md shadow-koenig-blue/30'
                    : 'text-koenig-muted hover:text-koenig-dark'
                }`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Our Global Presence
              </button>

            </div>
          </div>

          {/* WHO WE ARE content */}
          {activeTab === 'who' && (
            <>
              <h2 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] mb-2 text-center">
                Who We <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Are</span>
              </h2>
              <p className="text-center text-sm text-[#475569] mb-8">Three decades of training excellence, built on one belief</p>

              {/* Row 1: 3 cards with animated arrows */}
              <div className="flex flex-col sm:flex-row items-stretch">

                {/* Card 1 — Founded in 1993 */}
                <div className="flex-1 kglass-light rounded-2xl p-6 flex flex-col items-center text-center"
                  style={{ boxShadow: '0 0 0 1px rgba(6,148,209,0.18), 0 4px 20px rgba(6,148,209,0.08)' }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(6,148,209,0.12)', boxShadow: '0 4px 14px rgba(6,148,209,0.18)' }}>
                    <svg className="w-8 h-8" fill="none" stroke="#0694D1" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                    </svg>
                  </div>
                  <p className="font-bold text-[#0694D1] mb-2">Founded in 1993</p>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    Koenig Solutions is a reputed training organisation. The secret of our success is our belief that good training requires <strong>"Excellent Trainers,"</strong> and our strive to retain the best.
                  </p>
                </div>

                {/* Arrow 1→2 */}
                <div className="flex items-center justify-center py-3 sm:py-0 sm:w-8 w-full shrink-0">
                  <div className="rotate-90 sm:rotate-0">
                    <svg className="chev-r w-6 h-6" fill="none" stroke="#0694D1" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Card 2 — Our Vision */}
                <div className="flex-1 kglass-light rounded-2xl p-6 flex flex-col items-center text-center"
                  style={{ boxShadow: '0 0 0 1px rgba(6,148,209,0.18), 0 4px 20px rgba(6,148,209,0.08)' }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(6,148,209,0.12)', boxShadow: '0 4px 14px rgba(6,148,209,0.18)' }}>
                    <svg className="w-8 h-8" fill="none" stroke="#0694D1" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </div>
                  <p className="font-bold mb-2" style={{ color: '#0694D1' }}>Our Vision</p>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    To contribute to a more equitable and prosperous world through education. Today, Koenig has offices across the globe to help accomplish that vision.
                  </p>
                </div>

                {/* Arrow 2→3 */}
                <div className="flex items-center justify-center py-3 sm:py-0 sm:w-8 w-full shrink-0">
                  <div className="rotate-90 sm:rotate-0">
                    <svg className="chev-r2 w-6 h-6" fill="none" stroke="#0694D1" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Card 3 — The Kites */}
                <div className="flex-1 kglass-light rounded-2xl p-6 flex flex-col items-center text-center"
                  style={{ boxShadow: '0 0 0 1px rgba(6,148,209,0.18), 0 4px 20px rgba(6,148,209,0.08)' }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(6,148,209,0.12)', boxShadow: '0 4px 14px rgba(6,148,209,0.18)' }}>
                    <svg className="w-8 h-8" fill="none" stroke="#0694D1" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                  <p className="font-bold mb-2" style={{ color: '#0694D1' }}>The Kites</p>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    Our dedicated team of professionals, known as <strong>Kites</strong>, are passionate about delivering exceptional customer experiences worldwide.
                  </p>
                </div>

              </div>

              {/* Between-row down arrow */}
              <div className="flex justify-center my-4">
                <svg className="chev-d w-6 h-6" fill="none" stroke="#0694D1" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Row 2: 2 cards centered */}
              <div className="flex flex-col sm:flex-row items-stretch sm:w-2/3 sm:mx-auto">

                {/* Card 4 — Koenig Ethos */}
                <div className="flex-1 kglass-light rounded-2xl p-6 flex flex-col items-center text-center"
                  style={{ boxShadow: '0 0 0 1px rgba(6,148,209,0.18), 0 4px 20px rgba(6,148,209,0.08)' }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(6,148,209,0.12)', boxShadow: '0 4px 14px rgba(6,148,209,0.18)' }}>
                    <svg className="w-8 h-8" fill="none" stroke="#0694D1" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  </div>
                  <p className="font-bold text-[#0694D1] mb-2">Koenig Ethos</p>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    We believe that true success is <strong>Money, Respect, and Peace of Mind</strong>. These core principles, embodied in{' '}
                    <span className="font-semibold" style={{ color: '#0694D1' }}>"Koenig Ethos"</span>, drive exceptional learning experiences for our valued Kustomers.
                  </p>
                </div>

                {/* Arrow 4→5 */}
                <div className="flex items-center justify-center py-3 sm:py-0 sm:w-8 w-full shrink-0">
                  <div className="rotate-90 sm:rotate-0">
                    <svg className="chev-r3 w-6 h-6" fill="none" stroke="#0694D1" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Card 5 — Constant Improvement */}
                <div className="flex-1 kglass-light rounded-2xl p-6 flex flex-col items-center text-center"
                  style={{ boxShadow: '0 0 0 1px rgba(6,148,209,0.18), 0 4px 20px rgba(6,148,209,0.08)' }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(6,148,209,0.12)', boxShadow: '0 4px 14px rgba(6,148,209,0.18)' }}>
                    <svg className="w-8 h-8" fill="none" stroke="#0694D1" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                  </div>
                  <p className="font-bold mb-2" style={{ color: '#0694D1' }}>Constant Improvement</p>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    We believe in the philosophy of <strong>Constant Improvement</strong> — always striving to be better for our trainers, students, and the communities we serve worldwide.
                  </p>
                </div>

              </div>
            </>
          )}

          {/* GLOBAL PRESENCE content */}
          {activeTab === 'global' && (
            <>
              <h2 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] mb-2 text-center">
                Our Global <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Presence</span>
              </h2>
              <p className="text-center text-sm text-[#475569] mb-8">13 offices. 195+ countries served.</p>

              <div className="kglass-light rounded-2xl p-8 sm:p-10"
                style={{ boxShadow: '0 0 0 1px rgba(6,148,209,0.18), 0 8px 40px rgba(56,189,248,0.22), 0 0 80px rgba(6,148,209,0.12)' }}>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-x-4 gap-y-8">
                  {OFFICES.map(o => (
                    <div key={o.code} className="flex flex-col items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://flagcdn.com/w80/${o.code}.png`}
                        alt={`${o.country} flag`}
                        style={{ width: '52px', height: '34px', objectFit: 'cover' }}
                        className="rounded shadow-sm"
                      />
                      <span className="text-[11px] text-[#475569] text-center font-medium leading-tight">
                        {o.country}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </section>

      {/* ── AWARDS ─────────────────────────────────────────── */}
      <section className="relative bg-[#06111E] overflow-hidden py-5 sm:py-[50px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,148,209,0.18) 0%, rgba(56,189,248,0.08) 45%, transparent 70%)' }} />
          <div className="about-blob2 absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#0694D1] opacity-[0.18] blur-[110px]" />
          <div className="about-blob1 absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.10] blur-[100px]" />
          <div className="about-blob3 absolute bottom-0 -right-32 w-[400px] h-[400px] rounded-full bg-[#0694D1] opacity-[0.10] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">

          <h2 className="text-2xl sm:text-[28px] font-bold text-white mb-2 text-center">
            Awards &amp; <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Recognition</span>
          </h2>
          <p className="text-center text-sm text-white/50 mb-8">Proud milestones that reflect our commitment to excellence</p>

          <div className="grid sm:grid-cols-2 gap-6">

            {/* Great Place to Work */}
            <div className="kglass-dark rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8">
              {/* Image — left */}
              <div className="shrink-0 flex justify-center">
                <Image
                  src="/images/awards/Certified-as-great-place-to-work.webp"
                  alt="Certified as Great Place to Work"
                  width={140}
                  height={175}
                  className="object-contain drop-shadow-lg"
                />
              </div>
              {/* Content — right */}
              <div className="text-center sm:text-left">
                <p className="text-base font-bold text-[#38bdf8] mb-2">Great Place to Work® Certified</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Koenig Solutions is proud to be certified as a{' '}
                  <strong className="text-white/80">Great Place to Work® (JAN 2026–JAN 2027)</strong>,
                  reflecting our commitment to building a high-trust, high-performance culture
                  where every Kite thrives and grows.
                </p>
              </div>
            </div>

            {/* Best Place to Work in Education */}
            <div className="kglass-dark rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8">
              {/* I < O — left, white bg */}
              <div className="shrink-0 flex justify-center">
                <div className="rounded-2xl px-8 py-6" style={{ background: '#fff' }}>
                  <span className="text-5xl font-black tracking-tight" style={{ color: '#0694D1' }}>I &lt; O</span>
                </div>
              </div>
              {/* Content — right */}
              <div className="text-center sm:text-left">
                <p className="text-base font-bold text-[#38bdf8] mb-2">Best Place to Work in Education</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Recognised as the{' '}
                  <strong className="text-white/80">Best Place to Work in Education (2010–2026)</strong>.
                  The <strong className="text-white/80">I &lt; O</strong> in our logo symbolises that
                  I (us) is less than O (others), which aligns perfectly with our Kustomer Obsession.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-10 text-center">
            <a
              href="https://www.koenig-solutions.com/koenig-awards-and-achievements"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#0694D1] text-[#38bdf8] hover:bg-[#0694D1] hover:text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              View All Awards &amp; Achievements →
            </a>
          </div>
        </div>
      </section>

      {/* ── READY TO UPSKILL BANNER ─────────────────────────── */}
      <section className="py-5 sm:py-[50px]" style={{ backgroundColor: '#F8FBFF' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="relative rounded-2xl overflow-hidden flex items-stretch"
            style={{ background: '#EBF5FF', border: '1px solid rgba(6,148,209,0.18)', boxShadow: '0 4px 32px rgba(6,148,209,0.10)' }}>
            {/* Left content */}
            <div className="flex-1 px-8 py-8 sm:px-12 sm:py-10 flex flex-col justify-center">
              <p className="text-xs font-bold tracking-widest text-[#0694D1] uppercase mb-3">Koenig Solutions</p>
              <h2 className="text-[22px] sm:text-[28px] font-bold text-[#0F172A] leading-snug mb-2">
                Ready to Upskill with Certified IT Training?
              </h2>
              <p className="text-sm text-[#475569] mb-6">Join 30,000+ professionals trained every month across 195 countries.</p>
              <div>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-block text-white font-semibold px-7 py-3 rounded-full transition-all text-sm hover:opacity-90 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #08A8EC)', boxShadow: '0 4px 20px rgba(6,148,209,0.30)' }}>
                  Request More Info
                </button>
              </div>
            </div>
            {/* Right image */}
            <div className="hidden sm:block w-[320px] flex-shrink-0">
              <Image
                src="/images/home-banner/classroom-training.webp"
                alt="Koenig IT Training"
                width={320}
                height={220}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── REQUEST MORE INFO MODAL ─────────────────────────── */}
      {showForm && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(4,24,37,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false) }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', borderRadius: 20, background: '#fff' }}>
            <button
              onClick={() => setShowForm(false)}
              style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'rgba(9,49,72,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#093148', lineHeight: 1 }}
              aria-label="Close">
              ×
            </button>
            <ContactForm />
          </div>
        </div>
      )}
    </div>
  )
}

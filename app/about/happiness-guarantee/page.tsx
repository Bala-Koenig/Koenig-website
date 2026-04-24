'use client'
import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

export default function HappinessGuaranteePage() {
  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />
      <AboutSubNav />

      {/* ── BANNER — dark + blue glow ── */}
      <section className="relative bg-[#06111E] overflow-hidden py-10 sm:py-[50px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#0694D1] opacity-[0.10] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.07] blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#0694D1] opacity-[0.04] blur-[80px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="kglass-banner py-8 px-5 sm:py-10 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6">
                  Learn with <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Confidence:</span> Koenig Solutions' Happiness Guarantee
                </h1>
                <p className="text-sm sm:text-lg text-white/70 leading-relaxed">
                  Happiness is achieved when expectations are met. We set clear expectations and then we exceed them — every single time.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/happinessGuranty.webp"
                  alt="Happiness Guaranteed"
                  className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 0 40px rgba(6,148,209,0.4))', animation: 'iconFloat 4s ease-in-out infinite' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS THE HAPPINESS GUARANTEE — sky-blue gradient + glow ── */}
      <section className="relative overflow-hidden py-10 sm:py-[50px]"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #ddf1fb 35%, #ffffff 65%, #c8eaf8 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full opacity-40 blur-[90px]" style={{ background: 'radial-gradient(circle, #BAE6FD, transparent 70%)' }} />
          <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full opacity-30 blur-[80px]" style={{ background: 'radial-gradient(circle, #7DD3FA, transparent 70%)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-8 sm:mb-12 text-center">
            What is the <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Happiness Guarantee?</span>
          </h2>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
            {/* Classroom image */}
            <div className="w-full lg:w-[42%] rounded-2xl overflow-hidden shrink-0 shadow-xl" style={{ minHeight: '280px', boxShadow: '0 8px 40px rgba(6,148,209,0.15)' }}>
              <img
                src="/images/home-banner/classroom-training.png"
                alt="Koenig Solutions classroom training"
                className="w-full h-full object-cover"
                style={{ minHeight: '280px' }}
              />
            </div>
            {/* Points */}
            <div className="flex-1 flex flex-col gap-4 justify-center">
              {[
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                  text: <>At Koenig Solutions, your happiness is our top priority. That's why we offer our comprehensive <strong>Happiness Guarantee.</strong></>,
                },
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
                  text: <>We understand that "happiness" can be subjective. However, we believe happiness is achieved when expectations are met. This guarantee ensures you receive the high-quality training and service you deserve.</>,
                },
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
                  text: <>If, for any reason, you're not satisfied with your Koenig Solutions training experience, we promise to make it right.</>,
                },
              ].map((item, i) => (
                <div key={i} className="kglass-light flex gap-4 items-start rounded-2xl p-4 sm:p-5">
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-lg"
                    style={{
                      background: 'rgba(6,148,209,0.1)',
                      border: '1px solid rgba(6,148,209,0.2)',
                      animation: `iconPop 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.35}s both, iconFloat 3s ease-in-out ${i * 0.35 + 0.7}s infinite`,
                    }}>
                    {React.cloneElement(item.icon as React.ReactElement, {
                      style: { strokeDasharray: 300, strokeDashoffset: 300, animation: `strokeDraw 1.2s ease ${i * 0.35 + 0.1}s both` },
                    })}
                  </div>
                  <p className="text-[#334155] text-sm sm:text-base leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW DOES IT WORK — dark + glow ── */}
      <section className="relative bg-[#06111E] py-10 sm:py-[50px] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-0 w-[450px] h-[450px] rounded-full bg-[#0694D1] opacity-[0.06] blur-[110px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.05] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 text-center">
            How Does it <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Work?</span>
          </h2>
          <p className="text-center text-white/50 text-sm sm:text-base mb-8 sm:mb-12 max-w-2xl mx-auto">
            To ensure a successful learning experience, we ask for your feedback multiple times. If you encounter any issues or feel your expectations are not being met, simply inform your trainer or contact our customer support team.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>,
                title: 'Resolution Options',
                desc: "We're committed to resolving any issues you may encounter during your training. In such cases, we will assess the situation and implement one of two solutions:",
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                title: 'Full Refund',
                desc: 'We will provide a full refund for the course fee (excluding courseware and exam vouchers costs, if applicable)',
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
                title: 'Class Redo',
                desc: 'You can re-enroll in the same course free of charge at a future date (subject to availability)',
              },
            ].map((card, i) => (
              <div key={card.title} className="kglass-dark rounded-2xl p-6 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(56,189,248,0.1)',
                    border: '1px solid rgba(56,189,248,0.2)',
                    boxShadow: '0 0 20px rgba(56,189,248,0.15)',
                    animation: `iconPop 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.3}s both, iconFloat 2.8s ease-in-out ${i * 0.3 + 0.7}s infinite`,
                  }}>
                  {React.cloneElement(card.icon as React.ReactElement, {
                    style: { strokeDasharray: 300, strokeDashoffset: 300, animation: `strokeDraw 1.3s ease ${i * 0.3 + 0.1}s both` },
                  })}
                </div>
                <h3 className="font-bold text-[#38bdf8] text-base sm:text-lg">{card.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CEO MESSAGE — sky-blue gradient + glassmorphism ── */}
      <section className="relative overflow-hidden py-10 sm:py-[50px]"
        style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #ddf1fb 40%, #f0f9ff 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-40 blur-[90px]" style={{ background: 'radial-gradient(circle, #BAE6FD, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full opacity-30 blur-[80px]" style={{ background: 'radial-gradient(circle, #7DD3FA, transparent 70%)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-8 sm:mb-12 text-center">
            A Message from <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Our CEO</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="kglass-light rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <div className="shrink-0 mx-auto sm:mx-0">
                <img
                  src="/images/leadership/CEO.png"
                  alt="Rohit Aggarwal — Founder & CEO"
                  className="w-36 h-44 sm:w-40 sm:h-52 object-cover rounded-2xl"
                  style={{ boxShadow: '0 8px 32px rgba(6,148,209,0.18)', border: '2px solid rgba(6,148,209,0.25)' }}
                />
              </div>
              <div className="flex-1">
                <p className="text-[#0F172A] text-sm sm:text-base leading-relaxed mb-3"><strong>Dear Kustomer,</strong></p>
                <p className="text-[#475569] text-sm sm:text-base leading-relaxed mb-3">
                  We take immense pride in delivering exceptional training experiences that meet your needs and equip you with the skills you need to succeed. We meticulously design our courses and ensure the services we promise are fully delivered.
                </p>
                <p className="text-[#475569] text-sm sm:text-base leading-relaxed mb-3">
                  In short, <strong className="text-[#0F172A]">your happiness is our priority.</strong>
                </p>
                <p className="text-[#475569] text-sm sm:text-base leading-relaxed mb-3">
                  However, we understand that sometimes things may not go as planned. If, for any reason, you're not satisfied with your Koenig experience and haven't found a resolution through our standard channels, please contact me directly at{' '}
                  <a href="mailto:rohit.a@koenig-solutions.com" className="text-[#0694D1] hover:underline font-medium">rohit.a@koenig-solutions.com</a>.
                </p>
                <p className="text-[#475569] text-sm sm:text-base leading-relaxed mb-3">
                  As CEO, it's my ultimate responsibility to ensure your satisfaction. I'm committed to personally addressing any concerns you may have and working towards a fair resolution.
                </p>
                <p className="text-[#475569] text-sm sm:text-base leading-relaxed mb-5">
                  Enjoy your learning journey at Koenig Solutions. I am confident you'll gain valuable knowledge and skills.
                </p>
                <p className="text-[#0F172A] text-sm sm:text-base font-medium leading-relaxed">
                  With kind regards,<br />
                  <strong>Rohit Aggarwal</strong><br />
                  Founder &amp; CEO
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA — dark + kglass-banner ── */}
      <section className="relative bg-[#06111E] py-10 sm:py-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[180px] bg-[#0694D1] opacity-[0.07] blur-[80px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="kglass-banner rounded-2xl py-8 sm:py-10 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center sm:text-left">
              Ready to Get Started?
            </h2>
            <Link href="/courses"
              className="shrink-0 font-semibold px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base transition-colors text-white"
              style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', boxShadow: '0 4px 20px rgba(6,148,209,0.35)' }}>
              Explore Our Courses
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US — dark + kglass-dark cards ── */}
      <section className="relative bg-[#06111E] py-10 sm:py-[50px] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full bg-[#0694D1] opacity-[0.05] blur-[110px]" />
          <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-[#38bdf8] opacity-[0.04] blur-[90px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="flex gap-3 mb-8 sm:mb-10">
            <span className="font-semibold px-5 py-2 rounded-full text-sm text-white" style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Why Choose Us</span>
            <Link href="/about/student-feedback"
              className="border border-[#0694D1]/50 text-[#38bdf8] hover:border-[#0694D1] font-semibold px-5 py-2 rounded-full text-sm transition-colors">
              Student Feedback
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { title: 'Happiness Guarantee',        desc: "We're so confident in the quality of our training that we offer a comprehensive Happiness Guarantee" },
              { title: 'Unparalleled Course Selection', desc: 'Explore over 5,000 courses across diverse industries and skill sets to find the perfect fit for your learning goals' },
              { title: 'Expert Instructors',          desc: 'Learn from industry veterans with real-world experience' },
              { title: 'Flexible Learning Options',   desc: 'Choose from online, classroom, or blended learning formats to suit your schedule' },
            ].map((p) => (
              <div key={p.title} className="kglass-dark rounded-2xl p-5 sm:p-6 flex flex-col gap-2" style={{ borderTop: '2px solid rgba(56,189,248,0.3)' }}>
                <h3 className="font-bold text-[#38bdf8] text-sm sm:text-base leading-snug">{p.title}</h3>
                <p className="text-white/55 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

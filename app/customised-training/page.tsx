'use client'
import { useState, useRef } from 'react'
import Navbar from '@/components/Navbar'

/* ── Feature cards ──────────────────────────────────────────────── */
const FEATURES = [
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/Ai.png',
    title: 'Embedding AI Tools/Gen AI capabilities',
    desc: 'Leverage cutting-edge AI tools and technology in the context of your chosen course to enhance your learning outcomes and sharpen your skills.',
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/video.png',
    title: 'Recorded Sessions',
    desc: 'We provide session recordings accessible for 90 days, with extensions available upon request.',
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/report.png',
    title: 'Customized Report for Managers',
    desc: 'We provide tailored reports for managers, offering insights into learner performance, attendance, exam redemption, Qubits scores, and more.',
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/live.png',
    title: 'Live Training',
    desc: 'We offer expert-led training delivered live in both online and offline formats to suit your needs.',
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/custom.png',
    title: 'Customized LMS for Learners',
    desc: 'Our learning tool gives learners access to Qubits, knowledge checks, trainer-shared resources, and all course-related information.',
  },
  {
    img: 'https://www.koenig-solutions.com/assets/CourseImagesNew/translate.png',
    title: 'Translation of Content',
    desc: 'We offer content translation services, including PPTs, videos with voiceovers, and subtitles in your required language.',
  },
]

/* ── Case studies ────────────────────────────────────────────────── */
const CASE_STUDIES = [
  { id: 1,  title: 'Seamless SAP Migration Through Tailored Training' },
  { id: 2,  title: 'Fueling Innovation with Azure OpenAI Hackathons' },
  { id: 3,  title: '140 Learners Upskilled in Azure and AI Fundamentals' },
  { id: 4,  title: 'Empowering Women in Tech with AI Training' },
  { id: 5,  title: 'Power BI Upskilling Across Roles and Regions' },
  { id: 6,  title: 'Cloud Migration Kickoff with Azure & AWS Training' },
  { id: 7,  title: 'Boosting Security Skills with Microsoft Stack Training' },
  { id: 8,  title: 'Custom Leadership Training for Cross-Cultural Impact' },
  { id: 9,  title: 'Solving Postgres-Azure Complexity with Custom Training' },
  { id: 10, title: 'Equipping Nonprofits with Real-World AI & Data Skills' },
  { id: 11, title: 'On-Premise Power BI Training for High-Security Environments' },
  { id: 12, title: 'Rebuilding BI Publisher Training from the Ground Up' },
  { id: 13, title: 'Scaling Azure Training with Multilingual AI Localization' },
  { id: 14, title: 'Terraform Certification with IBM Cloud, Tailored On-Site' },
  { id: 15, title: 'Mastering OKD: OpenShift Training for Cost-Saving DevOps' },
  { id: 16, title: 'Building In-House Microservices Expertise from the Ground Up' },
  { id: 17, title: 'Custom LMS & Cyber Labs Training for Global Retailer' },
  { id: 18, title: 'Scaling Copilot Training with Role-Based Precision' },
  { id: 19, title: 'Offline Network Training for High-Security Government Environments' },
  { id: 20, title: 'Custom Cisco Nexus Training for Data Center Excellence' },
]

const INITIAL_VISIBLE = 8

/* ── Contact form countries ──────────────────────────────────────── */
const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Bahrain','Bangladesh',
  'Belgium','Brazil','Canada','Chile','China','Colombia','Croatia','Czech Republic','Denmark',
  'Egypt','Ethiopia','Finland','France','Germany','Ghana','Greece','Hong Kong','Hungary',
  'India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Japan','Jordan','Kazakhstan',
  'Kenya','Kuwait','Lebanon','Malaysia','Mexico','Morocco','Netherlands','New Zealand',
  'Nigeria','Norway','Oman','Pakistan','Peru','Philippines','Poland','Portugal','Qatar',
  'Romania','Russia','Saudi Arabia','Singapore','South Africa','South Korea','Spain','Sri Lanka',
  'Sweden','Switzerland','Taiwan','Thailand','Turkey','Ukraine','United Arab Emirates',
  'United Kingdom','United States','Venezuela','Vietnam','Zimbabwe',
]

/* ── Contact / Get Started modal ─────────────────────────────────── */
function ContactModal({ onClose }: { onClose: () => void }) {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [phone, setPhone]     = useState('')
  const [org, setOrg]         = useState('')
  const [country, setCountry] = useState('')
  const [msg, setMsg]         = useState('')
  const [countryOpen, setCountryOpen] = useState(false)
  const [submitted, setSubmitted]     = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const inp: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(6,148,209,0.08)', border: '1.5px solid rgba(6,148,209,0.3)',
    borderRadius: 10, padding: '11px 14px', fontSize: 13.5, color: '#fff',
    outline: 'none', fontFamily: 'inherit',
  }
  const lbl: React.CSSProperties = {
    fontSize: 10, fontWeight: 800, letterSpacing: 0.8,
    color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: 5, display: 'block',
  }

  return (
    <>
      <style>{`@keyframes ctSlideIn{from{opacity:0;transform:translate(-50%,-54%)}to{opacity:1;transform:translate(-50%,-50%)}}`}</style>
      <div style={{ position:'fixed', inset:0, zIndex:2000, background:'rgba(0,0,0,0.65)', backdropFilter:'blur(5px)' }}
        onClick={e => { if (e.target === e.currentTarget) onClose() }} />
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:2001,
        width:'100%', maxWidth:480, maxHeight:'90vh', overflowY:'auto',
        background:'linear-gradient(160deg,#062238 0%,#093148 100%)', borderRadius:20,
        padding:'32px 28px 28px', boxShadow:'0 24px 60px rgba(0,0,0,0.5)', fontFamily:'inherit',
        animation:'ctSlideIn 0.3s cubic-bezier(0.25,1,0.5,1)' }}>
        <button onClick={onClose} style={{ position:'absolute', top:14, right:14, width:30, height:30,
          borderRadius:'50%', background:'rgba(255,255,255,0.1)', border:'none', color:'#fff',
          fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        {submitted ? (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ width:56, height:56, borderRadius:'50%', background:'rgba(6,148,209,0.15)',
              border:'1.5px solid rgba(6,148,209,0.4)', display:'flex', alignItems:'center',
              justifyContent:'center', margin:'0 auto 20px' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ fontSize:20, fontWeight:800, color:'#fff', marginBottom:10 }}>Thank you, {name.split(' ')[0]}!</div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.6)', lineHeight:1.7, marginBottom:24 }}>
              Our training advisors will get back to you within one business day to discuss your customised training requirements.
            </div>
            <button onClick={onClose} style={{ padding:'11px 28px', borderRadius:10, border:'1px solid rgba(6,148,209,0.35)',
              background:'transparent', color:'#0694D1', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:16 }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:'#0694D1', display:'inline-block' }} />
              <span style={{ fontSize:10, fontWeight:800, letterSpacing:1.2, color:'#0694D1', textTransform:'uppercase' }}>Get a Custom Quote</span>
            </div>
            <div style={{ fontSize:22, fontWeight:800, color:'#fff', marginBottom:6 }}>Tell Us About Your Training Needs</div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', marginBottom:24, lineHeight:1.65 }}>
              Fill in your details and a Koenig advisor will design a solution for your team.
            </div>
            <form onSubmit={e => { e.preventDefault(); if (!country) return; setSubmitted(true) }}
              style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div><label style={lbl}>Full Name <span style={{ color:'#ef4444' }}>*</span></label>
                <input required value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" style={inp}
                  onFocus={e => (e.target.style.borderColor='#0694D1')} onBlur={e => (e.target.style.borderColor='rgba(6,148,209,0.3)')} /></div>
              <div><label style={lbl}>Work Email <span style={{ color:'#ef4444' }}>*</span></label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@company.com" style={inp}
                  onFocus={e => (e.target.style.borderColor='#0694D1')} onBlur={e => (e.target.style.borderColor='rgba(6,148,209,0.3)')} /></div>
              <div><label style={lbl}>Phone Number</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" style={inp}
                  onFocus={e => (e.target.style.borderColor='#0694D1')} onBlur={e => (e.target.style.borderColor='rgba(6,148,209,0.3)')} /></div>
              <div><label style={lbl}>Organisation</label>
                <input value={org} onChange={e => setOrg(e.target.value)} placeholder="Company name" style={inp}
                  onFocus={e => (e.target.style.borderColor='#0694D1')} onBlur={e => (e.target.style.borderColor='rgba(6,148,209,0.3)')} /></div>
              <div ref={ref} style={{ position:'relative' }}>
                <label style={lbl}>Country <span style={{ color:'#ef4444' }}>*</span></label>
                <button type="button" onClick={() => setCountryOpen(o => !o)}
                  style={{ width:'100%', boxSizing:'border-box', display:'flex', alignItems:'center', justifyContent:'space-between',
                    background:'rgba(6,148,209,0.08)', border:`1.5px solid ${countryOpen ? '#0694D1' : 'rgba(6,148,209,0.3)'}`,
                    borderRadius:10, padding:'11px 14px', fontSize:13.5, color:country ? '#fff' : 'rgba(255,255,255,0.4)',
                    cursor:'pointer', fontFamily:'inherit', outline:'none' }}>
                  {country || 'Select your country'}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform:countryOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.2s', flexShrink:0 }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {countryOpen && (
                  <div style={{ position:'absolute', bottom:'calc(100% + 4px)', left:0, right:0, zIndex:10000,
                    background:'#0d2535', border:'1.5px solid rgba(6,148,209,0.35)', borderRadius:10,
                    maxHeight:200, overflowY:'auto', boxShadow:'0 -8px 32px rgba(0,0,0,0.6)' }}>
                    {COUNTRIES.map(c => (
                      <div key={c} onClick={() => { setCountry(c); setCountryOpen(false) }}
                        style={{ padding:'9px 14px', fontSize:13.5, cursor:'pointer',
                          color:country === c ? '#fff' : '#c8dce9', background:country === c ? '#1a5fa8' : 'transparent' }}
                        onMouseEnter={e => { if (country !== c) (e.currentTarget as HTMLDivElement).style.background='rgba(6,148,209,0.18)' }}
                        onMouseLeave={e => { if (country !== c) (e.currentTarget as HTMLDivElement).style.background='transparent' }}>
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div><label style={lbl}>Training Requirement</label>
                <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={3}
                  placeholder="Describe your training goals, team size, topics, timeline…"
                  style={{ ...inp, resize:'vertical', minHeight:80 }}
                  onFocus={e => (e.target.style.borderColor='#0694D1')} onBlur={e => (e.target.style.borderColor='rgba(6,148,209,0.3)')} /></div>
              <button type="submit" onClick={e => { if (!country) { e.preventDefault(); setCountryOpen(true) } }}
                style={{ width:'100%', padding:13, borderRadius:10, border:'none', cursor:'pointer',
                  background:'linear-gradient(135deg,#0694D1,#0577ab)', color:'#fff', fontSize:14,
                  fontWeight:700, fontFamily:'inherit', boxShadow:'0 4px 18px rgba(6,148,209,0.4)', marginTop:2 }}>
                Send My Requirement →
              </button>
            </form>
          </>
        )}
      </div>
    </>
  )
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function CustomisedTrainingPage() {
  const [showAll, setShowAll]           = useState(false)
  const [showModal, setShowModal]       = useState(false)
  const [requirement, setRequirement]   = useState('')
  const [generating, setGenerating]     = useState(false)
  const [generated, setGenerated]       = useState(false)
  const [emailSent, setEmailSent]       = useState(false)

  const visibleStudies = showAll ? CASE_STUDIES : CASE_STUDIES.slice(0, INITIAL_VISIBLE)

  const handleGenerate = () => {
    if (!requirement.trim()) return
    setGenerating(true)
    setGenerated(false)
    setTimeout(() => { setGenerating(false); setGenerated(true) }, 2000)
  }

  const handleEmailToc = () => {
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  return (
    <div style={{ fontFamily: 'inherit', background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #06111E 0%, #093148 60%, #0a3d5a 100%)',
        position: 'relative', overflow: 'hidden',
        paddingTop: 80,
      }}>
        {/* decorative blobs */}
        <div style={{ position:'absolute', top:-80, right:-80, width:420, height:420,
          borderRadius:'50%', background:'rgba(6,148,209,0.08)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:300, height:300,
          borderRadius:'50%', background:'rgba(6,148,209,0.05)', pointerEvents:'none' }} />

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'48px 20px 0', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:40, flexWrap:'wrap' }}>

            {/* left: text */}
            <div style={{ flex:'1 1 320px', paddingBottom:48 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(6,148,209,0.15)',
                border:'1px solid rgba(6,148,209,0.3)', borderRadius:999, padding:'6px 14px', marginBottom:20 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#0694D1', display:'inline-block' }} />
                <span style={{ fontSize:11, fontWeight:800, letterSpacing:1.2, color:'#0694D1', textTransform:'uppercase' }}>
                  Customised Training
                </span>
              </div>
              <h1 style={{ fontSize:'clamp(24px,4vw,40px)', fontWeight:800, color:'#fff', lineHeight:1.22,
                marginBottom:18, letterSpacing:-0.5 }}>
                Empower your Workforce with Koenig&apos;s Customized Learning Solutions
              </h1>
              <p style={{ fontSize:16, color:'rgba(255,255,255,0.65)', lineHeight:1.7, marginBottom:32, maxWidth:520 }}>
                Koenig&apos;s Customized Learning Solutions are designed to meet your business goals. We combine expert instructors, AI-powered tools, and tailored content to build programmes that deliver measurable outcomes.
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <button onClick={() => setShowModal(true)} style={{
                  padding:'13px 28px', borderRadius:12, border:'none', cursor:'pointer',
                  background:'linear-gradient(135deg,#0694D1,#0577ab)', color:'#fff',
                  fontSize:14, fontWeight:700, boxShadow:'0 4px 18px rgba(6,148,209,0.4)',
                }}>
                  Get a Custom Quote →
                </button>
                <a href="#case-studies" style={{
                  padding:'13px 28px', borderRadius:12, border:'1.5px solid rgba(6,148,209,0.4)',
                  color:'#fff', fontSize:14, fontWeight:600, textDecoration:'none', display:'inline-flex',
                  alignItems:'center', backdropFilter:'blur(4px)',
                }}>
                  View Case Studies
                </a>
              </div>
              {/* stats row */}
              <div style={{ display:'flex', gap:24, marginTop:36, flexWrap:'wrap' }}>
                {[
                  { label:'Clients Trained', value:'500+' },
                  { label:'Countries Served', value:'50+' },
                  { label:'Satisfaction Rate', value:'98%' },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize:24, fontWeight:800, color:'#0694D1' }}>{s.value}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginTop:2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* right: hero image */}
            <div style={{ flex:'1 1 280px', display:'flex', justifyContent:'flex-end', alignSelf:'flex-end' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.koenig-solutions.com/assets/CourseImagesNew/customised-training.png"
                alt="Customised Training"
                style={{ maxWidth:'100%', maxHeight:360, objectFit:'contain', display:'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── How We Are Different ───────────────────────────────────── */}
      <section style={{ background:'#fff', padding:'64px 20px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <h2 style={{ fontSize:'clamp(20px,3vw,32px)', fontWeight:800, color:'#06111E', marginBottom:14 }}>
              How are Koenig&apos;s Customized Learning Solutions different?
            </h2>
            <p style={{ fontSize:15, color:'#5a7a8c', maxWidth:680, margin:'0 auto', lineHeight:1.7 }}>
              Koenig provides Customized Learning Solutions by combining different services to meet the business outcome you need:
            </p>
          </div>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',
            gap:24,
          }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                background:'#f8fafc', border:'1.5px solid #e8f0f7',
                borderRadius:16, padding:'28px 24px',
                transition:'border-color 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = '#0694D1'
                  el.style.boxShadow = '0 8px 28px rgba(6,148,209,0.12)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = '#e8f0f7'
                  el.style.boxShadow = 'none'
                }}>
                <div style={{ width:56, height:56, borderRadius:14,
                  background:'linear-gradient(135deg,rgba(6,148,209,0.08),rgba(6,148,209,0.15))',
                  display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.img} alt={f.title} style={{ width:36, height:36, objectFit:'contain' }} />
                </div>
                <h3 style={{ fontSize:15, fontWeight:700, color:'#06111E', marginBottom:10, lineHeight:1.4 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize:13.5, color:'#5a7a8c', lineHeight:1.7, margin:0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Studies ───────────────────────────────────────────── */}
      <section id="case-studies" style={{ background:'#f0f7fc', padding:'64px 20px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(6,148,209,0.1)',
              borderRadius:999, padding:'5px 14px', marginBottom:14 }}>
              <span style={{ fontSize:11, fontWeight:800, letterSpacing:1.2, color:'#0694D1', textTransform:'uppercase' }}>
                Success Stories
              </span>
            </div>
            <h2 style={{ fontSize:'clamp(20px,3vw,32px)', fontWeight:800, color:'#06111E', marginBottom:14 }}>
              Our Case Studies
            </h2>
            <p style={{ fontSize:15, color:'#5a7a8c', maxWidth:600, margin:'0 auto', lineHeight:1.7 }}>
              Explore how Koenig has delivered tailored learning programmes for organisations across the globe.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:24 }}>
            {visibleStudies.map(cs => (
              <div key={cs.id} style={{
                background:'#fff', borderRadius:16, overflow:'hidden',
                border:'1.5px solid #e8f0f7', boxShadow:'0 2px 8px rgba(6,148,209,0.06)',
                transition:'box-shadow 0.2s, transform 0.2s',
                display:'flex', flexDirection:'column',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = '0 12px 32px rgba(6,148,209,0.14)'
                  el.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = '0 2px 8px rgba(6,148,209,0.06)'
                  el.style.transform = 'none'
                }}>
                {/* thumbnail */}
                <div style={{ aspectRatio:'16/9', overflow:'hidden', background:'#e8f0f7', flexShrink:0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://www.koenig-solutions.com/assets/CourseImagesNew/case-study-${cs.id}.png`}
                    alt={cs.title}
                    style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                    onError={e => {
                      const img = e.currentTarget as HTMLImageElement
                      img.style.display = 'none'
                      if (img.parentElement) {
                        img.parentElement.style.background = `hsl(${(cs.id * 37) % 360}, 40%, 88%)`
                        img.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(6,148,209,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>`
                      }
                    }}
                  />
                </div>
                {/* body */}
                <div style={{ padding:'18px 20px 20px', flex:1, display:'flex', flexDirection:'column', gap:14 }}>
                  <h3 style={{ fontSize:14, fontWeight:700, color:'#06111E', lineHeight:1.5, margin:0 }}>
                    {cs.title}
                  </h3>
                  <div style={{ marginTop:'auto' }}>
                    <a
                      href={`https://www.koenig-solutions.com/customised-training`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display:'inline-flex', alignItems:'center', gap:7,
                        fontSize:12.5, fontWeight:700, color:'#0694D1', textDecoration:'none',
                      }}>
                      {/* PDF icon */}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* show more / less */}
          {CASE_STUDIES.length > INITIAL_VISIBLE && (
            <div style={{ textAlign:'center', marginTop:40 }}>
              <button
                onClick={() => setShowAll(s => !s)}
                style={{
                  padding:'13px 32px', borderRadius:12, border:'2px solid #0694D1',
                  background:'transparent', color:'#0694D1', fontSize:14, fontWeight:700,
                  cursor:'pointer', transition:'all 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.background = '#0694D1'; el.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.background = 'transparent'; el.style.color = '#0694D1'
                }}>
                {showAll ? 'Show Less' : `Show More (${CASE_STUDIES.length - INITIAL_VISIBLE} more)`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Custom Course Generator ─────────────────────────────────── */}
      <section style={{ background:'#fff', padding:'64px 20px' }}>
        <div style={{ maxWidth:800, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(6,148,209,0.1)',
              borderRadius:999, padding:'5px 14px', marginBottom:14 }}>
              <span style={{ fontSize:11, fontWeight:800, letterSpacing:1.2, color:'#0694D1', textTransform:'uppercase' }}>
                AI-Powered
              </span>
            </div>
            <h2 style={{ fontSize:'clamp(18px,3vw,28px)', fontWeight:800, color:'#06111E', marginBottom:12 }}>
              Need Customized Training?
            </h2>
            <p style={{ fontSize:15, color:'#5a7a8c', lineHeight:1.7 }}>
              Share your requirement below and generate a custom course table of contents.
            </p>
          </div>

          <div style={{ background:'#f8fafc', border:'1.5px solid #e8f0f7', borderRadius:20, padding:'32px 28px' }}>
            <label style={{ display:'block', fontSize:13, fontWeight:700, color:'#06111E', marginBottom:10 }}>
              Describe Your Training Requirement
            </label>
            <textarea
              value={requirement}
              onChange={e => setRequirement(e.target.value)}
              rows={5}
              placeholder="E.g. We need Azure Administrator training for 25 engineers, blended with AI/ML fundamentals, over 5 days onsite in Dubai."
              style={{
                width:'100%', boxSizing:'border-box', background:'#fff', border:'1.5px solid #CAEFFF',
                borderRadius:12, padding:'14px 16px', fontSize:14, color:'#06111E',
                outline:'none', fontFamily:'inherit', resize:'vertical', minHeight:120,
                transition:'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor='#0694D1')}
              onBlur={e => (e.target.style.borderColor='#CAEFFF')}
            />

            {generated && (
              <div style={{ marginTop:16, background:'linear-gradient(135deg,#f0f7fc,#e8f4fb)',
                border:'1.5px solid #CAEFFF', borderRadius:12, padding:'16px 20px' }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#06111E', marginBottom:10 }}>
                  Generated Table of Contents
                </div>
                <div style={{ fontSize:13, color:'#5a7a8c', lineHeight:1.8 }}>
                  <div>1. Introduction &amp; Business Context</div>
                  <div>2. Core Technical Concepts</div>
                  <div>3. Hands-on Lab Sessions</div>
                  <div>4. Role-Based Scenario Workshops</div>
                  <div>5. Assessment &amp; Knowledge Check</div>
                  <div>6. Certification Preparation</div>
                </div>
                <div style={{ fontSize:12, color:'rgba(6,148,209,0.7)', marginTop:8 }}>
                  Review the above TOC. If any change is required, mention below &amp; click Re-Generate.
                </div>
              </div>
            )}

            {generating && (
              <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:10,
                background:'linear-gradient(135deg,#f0f7fc,#e8f4fb)', border:'1.5px solid #CAEFFF',
                borderRadius:12, padding:'16px 20px' }}>
                <div style={{ width:16, height:16, border:'2px solid #0694D1', borderTopColor:'transparent',
                  borderRadius:'50%', animation:'ctSpin 0.7s linear infinite', flexShrink:0 }} />
                <span style={{ fontSize:13, color:'#5a7a8c' }}>TOC generating in progress…</span>
              </div>
            )}

            <style>{`@keyframes ctSpin{to{transform:rotate(360deg)}}`}</style>

            <div style={{ display:'flex', gap:12, marginTop:18, flexWrap:'wrap' }}>
              <button
                onClick={handleGenerate}
                disabled={!requirement.trim() || generating}
                style={{
                  padding:'12px 24px', borderRadius:12, border:'none', cursor:requirement.trim() && !generating ? 'pointer' : 'not-allowed',
                  background:requirement.trim() && !generating ? 'linear-gradient(135deg,#0694D1,#0577ab)' : '#cbd5e1',
                  color:'#fff', fontSize:13.5, fontWeight:700, fontFamily:'inherit',
                  boxShadow:requirement.trim() && !generating ? '0 4px 14px rgba(6,148,209,0.35)' : 'none',
                  transition:'all 0.2s',
                }}>
                {generated ? 'Re-Generate Course' : 'Generate Course'}
              </button>
              {generated && (
                <button
                  onClick={handleEmailToc}
                  style={{
                    padding:'12px 24px', borderRadius:12, border:'1.5px solid #0694D1',
                    background:emailSent ? '#0694D1' : 'transparent',
                    color:emailSent ? '#fff' : '#0694D1', fontSize:13.5, fontWeight:700,
                    cursor:'pointer', fontFamily:'inherit', transition:'all 0.2s',
                  }}>
                  {emailSent ? '✓ TOC Sent!' : 'Email Me the TOC'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────── */}
      <section style={{
        background:'linear-gradient(135deg, #06111E 0%, #093148 100%)',
        padding:'56px 20px', textAlign:'center',
      }}>
        <div style={{ maxWidth:700, margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(20px,3vw,30px)', fontWeight:800, color:'#fff', marginBottom:14 }}>
            Ready to Build a Custom Learning Programme?
          </h2>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.65)', lineHeight:1.7, marginBottom:32 }}>
            Talk to a Koenig training advisor today. We&apos;ll design a solution tailored to your team&apos;s skills, goals, and schedule.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => setShowModal(true)} style={{
              padding:'14px 32px', borderRadius:12, border:'none', cursor:'pointer',
              background:'linear-gradient(135deg,#0694D1,#0577ab)', color:'#fff',
              fontSize:14, fontWeight:700, boxShadow:'0 4px 18px rgba(6,148,209,0.4)',
            }}>
              Get a Custom Quote →
            </button>
            <a href="mailto:info@koenig-solutions.com" style={{
              padding:'14px 32px', borderRadius:12, border:'1.5px solid rgba(6,148,209,0.4)',
              color:'#fff', fontSize:14, fontWeight:600, textDecoration:'none',
              display:'inline-flex', alignItems:'center',
            }}>
              info@koenig-solutions.com
            </a>
          </div>
        </div>
      </section>

      {/* ── Modal ──────────────────────────────────────────────────── */}
      {showModal && <ContactModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

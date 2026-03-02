'use client'
import { useEffect } from 'react'

/* ─── Constants ─────────────────────────────────────────────── */
const NAV_H   = 56
const CARD_BG = '#0b1929'

/* ─── Vendor Data ───────────────────────────────────────────── */
const vendors = [
  {
    edgeColor: CARD_BG,
    panelGradient: 'linear-gradient(135deg,#076D9D,#0694D1)',
    tag: '⭐ Gold Partner · Microsoft',
    title: 'Microsoft',
    desc: "From Azure to Microsoft 365 — master the world's most used enterprise platform.",
    bullets: [
      'Administrator',
      'AI-102T00: Designing and Implementing a Microsoft Azure AI Solution',
      'PL-300T00: Microsoft Power BI Data Analyst',
      'AI-102T00: Designing and Implementing a Microsoft Azure AI Solution',
    ],
    stats: [
      { val: '120+', label: 'Courses' },
      { val: 'Gold', label: 'Partner Level' },
      { val: '1M+', label: 'Certified' },
    ],
    cta: 'Explore Microsoft Courses →',
    image: '/images/top-six-vendors/Microsoft.png',
    whiteBg: true,
  },
  {
    edgeColor: CARD_BG,
    panelGradient: 'linear-gradient(135deg,#0694D1,#4DBFEF)',
    tag: '⭐ Premier Partner · Cisco',
    title: 'Cisco',
    desc: "From CCNA to CCIE — master networking and security with Cisco's premier learning partner.",
    bullets: [
      'CCNA 200-301 Network Associate (9,800+ enrolled)',
      'CCNP Enterprise Core (ENCOR)',
      'Cisco CyberOps Associate',
      'Cisco DevNet Associate',
    ],
    stats: [
      { val: '60+', label: 'Courses' },
      { val: 'Premier', label: 'Partner Level' },
      { val: '8K+', label: 'Certified' },
    ],
    cta: 'Explore Cisco Courses →',
    image: '/images/top-six-vendors/Cisco.png',
    whiteBg: true,
  },
  {
    edgeColor: CARD_BG,
    panelGradient: 'linear-gradient(135deg,#04446A,#076D9D)',
    tag: '⭐ Advanced Partner · AWS',
    title: 'Amazon Web Services',
    desc: "Build, deploy and scale on the world's most comprehensive cloud platform.",
    bullets: [
      'AWS Solutions Architect Associate (5,747 enrolled)',
      'AWS Cloud Practitioner (4,593 enrolled)',
      'AWS DevOps Engineer Professional',
      'AWS Security Specialty',
    ],
    stats: [
      { val: '45+', label: 'Courses' },
      { val: 'Advanced', label: 'Partner Level' },
      { val: '10K+', label: 'Certified' },
    ],
    cta: 'Explore AWS Courses →',
    image: '/images/top-six-vendors/amazon-authorized.png',
    whiteBg: true,
  },
  {
    edgeColor: CARD_BG,
    panelGradient: 'linear-gradient(135deg,#076D9D,#4DBFEF)',
    tag: '⭐ Authorized Partner · VMware',
    title: 'VMware',
    desc: 'Master virtualization, cloud infrastructure and modern data centre with VMware certifications.',
    bullets: [
      'VMware vSphere: Install, Configure, Manage',
      'VCP-DCV Data Center Virtualization (3,200+ enrolled)',
      'VMware NSX-T Data Center',
      'VMware Carbon Black Cloud',
    ],
    stats: [
      { val: '35+', label: 'Courses' },
      { val: 'Authorized', label: 'Partner Level' },
      { val: '6K+', label: 'Certified' },
    ],
    cta: 'Explore VMware Courses →',
    image: '/images/top-six-vendors/VMware-Broadcom.png',
    whiteBg: true,
  },
  {
    edgeColor: CARD_BG,
    panelGradient: 'linear-gradient(135deg,#076D9D,#0694D1)',
    tag: '⭐ Gold Partner · Oracle',
    title: 'Oracle',
    desc: 'From Oracle Database to Oracle Cloud — become certified on the most widely deployed enterprise technology.',
    bullets: [
      'Oracle Database 19c Administration (4,100+ enrolled)',
      'Oracle Cloud Infrastructure Architect Associate',
      'Oracle Java SE 17 Developer',
      'Oracle Autonomous Database Specialist',
    ],
    stats: [
      { val: '50+', label: 'Courses' },
      { val: 'Gold', label: 'Partner Level' },
      { val: '7K+', label: 'Certified' },
    ],
    cta: 'Explore Oracle Courses →',
    image: '/images/top-six-vendors/oracle.png',
    whiteBg: true,
  },
  { isMore: true } as const,
]

const MORE_BADGES = [
  'Google Cloud', 'CompTIA', 'Salesforce', 'PMI',
  'EC-Council', 'ISACA', 'ITIL', 'Red Hat',
  'Tableau', 'Python Inst.', 'ServiceNow', '+ 39 more',
]

const SIDEBAR_TABS = [
  { icon: '🪟', label: 'Microsoft' },
  { icon: '🌐', label: 'Cisco' },
  { icon: '☁️', label: 'AWS' },
  { icon: '🖥️', label: 'VMware' },
  { icon: '🔴', label: 'Oracle' },
  { icon: '∞', label: 'More Vendors' },
]

/* ─── Standard Vendor Card ──────────────────────────────────── */
type VendorItem = {
  edgeColor: string; panelGradient: string; tag: string; title: string
  desc: string; bullets: string[]; stats: { val: string; label: string }[]
  cta: string; image: string; whiteBg: boolean
}

function VendorCard({ v }: { v: VendorItem }) {
  return (
    <div
      className="vs-card-inner"
      style={{
        height: '100%',
        background: 'radial-gradient(ellipse at 60% 40%, rgba(6,148,209,0.18) 0%, rgba(77,191,239,0.08) 35%, transparent 70%), #0b1929',
        border: '1px solid rgba(6,148,209,0.18)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Left content */}
      <div className="vs-card-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
        <div>
          <span
            style={{
              display: 'inline-flex',
              borderRadius: 9999,
              border: '1px solid rgba(77,191,239,0.3)',
              padding: '4px 12px',
              fontSize: 12,
              color: '#4DBFEF',
              marginBottom: 12,
            }}
          >
            {v.tag}
          </span>
          <h3 className="vs-card-title" style={{ fontWeight: 700, color: 'white', lineHeight: 1.1, marginBottom: 8, marginTop: 0 }}>
            {v.title}
          </h3>
          <p
            style={{
              fontSize: 13, color: '#8AAFC0', lineHeight: 1.6,
              marginBottom: 16, marginTop: 0,
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}
          >
            {v.desc}
          </p>
          <p style={{ fontSize: 11, color: '#4DBFEF', letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8, marginTop: 0 }}>
            OUR EXPERTISE
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {v.bullets.map((b, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: idx < v.bullets.length - 1 ? 6 : 0 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#076D9D', flexShrink: 0, marginTop: 4 }} />
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="vs-cta-btn"
          style={{ background: '#076D9D', borderRadius: 28, fontSize: 13, fontWeight: 400, color: 'white', border: 'none', cursor: 'pointer', width: 'fit-content' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0694D1' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#076D9D' }}
        >
          {v.cta}
        </button>
      </div>

      {/* Right image panel — hidden on mobile & tablet, visible on lg+ */}
      <div
        className="vs-card-panel"
        style={{
          position: 'relative',
          flexShrink: 0,
          overflow: 'hidden',
          background: '#EAF6FB',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={v.image}
          alt={v.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            padding: '24px',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.18))',
            zIndex: 1,
          }}
        />
      </div>

      {/* Bottom stats bar */}
      <div
        className="vs-stats-bar"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 56,
          background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center',
        }}
      >
        {v.stats.map((s, idx) => (
          <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#4DBFEF' }}>{s.val}</span>
            <span style={{ fontSize: 10, color: '#8AAFC0', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── More Vendors Card ─────────────────────────────────────── */
function MoreCard() {
  return (
    <div
      style={{
        height: '100%',
        background: 'radial-gradient(ellipse at 60% 40%, rgba(6,148,209,0.18) 0%, rgba(77,191,239,0.08) 35%, transparent 70%), #0b1929',
        border: '1px solid rgba(6,148,209,0.18)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div className="vs-more-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
        <div>
          <span style={{ display: 'inline-flex', borderRadius: 9999, border: '1px solid rgba(77,191,239,0.35)', padding: '4px 12px', fontSize: 12, color: '#4DBFEF', marginBottom: 12 }}>
            ∞&nbsp;&nbsp;50+ Global Vendors
          </span>
          <h3 className="vs-more-title" style={{ fontWeight: 700, lineHeight: 1.1, margin: 0 }}>
            <span style={{ color: 'white' }}>Explore All</span>
            <br />
            <span style={{ color: '#4DBFEF' }}>Vendor Partners</span>
          </h3>
          <p style={{ fontSize: 13, color: '#8AAFC0', marginTop: 10, marginBottom: 16, lineHeight: 1.5 }}>
            Beyond our top picks — Koenig is authorized by 50+ global technology vendors. From VMware, Google Cloud, Salesforce and Oracle to niche certifications across cybersecurity, cloud, networking and project management.
          </p>
          <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
            {[{ val: '50+', label: 'VENDORS' }, { val: '3,000+', label: 'COURSES' }, { val: '500K+', label: 'TRAINED' }].map((s, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#4DBFEF' }}>{s.val}</span>
                <span style={{ fontSize: 11, color: '#8AAFC0', letterSpacing: 1, marginTop: 2 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ color: '#4DBFEF', fontSize: 13, fontWeight: 400, whiteSpace: 'nowrap' }}>View all vendors</span>
          <div style={{ flex: 1, minWidth: 20, height: 1, background: 'repeating-linear-gradient(to right, rgba(77,191,239,0.4) 0, rgba(77,191,239,0.4) 6px, transparent 6px, transparent 12px)' }} />
          <span style={{ color: '#4DBFEF', fontSize: 16 }}>→</span>
          <button
            style={{ background: '#076D9D', borderRadius: 28, padding: '9px 18px', fontSize: 13, fontWeight: 400, color: 'white', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0694D1' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#076D9D' }}
          >
            Explore All Courses →
          </button>
        </div>
      </div>

      {/* Right badges panel — hidden on mobile & tablet */}
      <div
        className="vs-more-panel"
        style={{ position: 'relative', overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(135deg, #076D9D, #0694D1)' }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40%', background: `linear-gradient(to right, ${CARD_BG}, transparent)`, zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', gap: 8, padding: 20, zIndex: 2 }}>
          {MORE_BADGES.map((b, idx) => (
            <span key={idx} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 10px', fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ────────────────────────────────────────── */
export default function VendorStack() {

  useEffect(() => {
    const SHIFT  = 22
    const SCALE  = 0.03
    const FADE   = 0.12
    const MAX_BG = 4

    const allCards = document.querySelectorAll('[data-index]')
    const allTabs  = document.querySelectorAll('[data-tab]')

    function applyLayout(active: number) {
      allCards.forEach((card, i) => {
        const el  = card as HTMLElement
        const pos = active - i

        if (pos < 0) {
          el.style.transform = 'translateY(110%)'
          el.style.opacity   = '0'
          el.style.zIndex    = String(i)
          el.style.boxShadow = 'none'
        } else if (pos === 0) {
          el.style.transform = 'translateY(0) scale(1)'
          el.style.opacity   = '1'
          el.style.zIndex    = '100'
          el.style.boxShadow = 'none'
        } else {
          if (pos > MAX_BG) {
            el.style.transform = `translateY(-${MAX_BG * SHIFT + 30}px) scale(${Math.max(1 - MAX_BG * SCALE, 0.78)})`
            el.style.opacity   = '0'
            el.style.zIndex    = String(100 - pos)
          } else {
            el.style.transform = `translateY(-${pos * SHIFT}px) scale(${Math.max(1 - pos * SCALE, 0.78)})`
            el.style.opacity   = String(Math.max(1 - pos * FADE, 0.2))
            el.style.zIndex    = String(100 - pos)
            el.style.boxShadow = 'none'
          }
        }
      })

      allTabs.forEach((t, i) => {
        const el = t as HTMLElement
        el.setAttribute('data-active', i === active ? 'true' : 'false')
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const n = parseInt((entry.target as HTMLElement).dataset.n ?? '0', 10)
            applyLayout(n)
          }
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll('.vs-trigger').forEach(t => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  const scrollToTrigger = (i: number) => {
    document.querySelector(`.vs-trigger[data-n="${i}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div style={{ position: 'relative', background: 'linear-gradient(135deg,#061e30 0%,#093148 50%,#062240 100%)' }}>

      {/* ── Sticky section ── */}
      <section
        className="vs-section"
        style={{
          position: 'sticky',
          top: NAV_H,
          zIndex: 20,
          background: 'linear-gradient(135deg,#020d18 0%,#061e30 25%,#0a2e4a 50%,#061e30 75%,#020d18 100%)',
        }}
      >
        {/* ── Section header ── */}
        <div className="vs-header" style={{ textAlign: 'center', padding: '0 16px' }}>
          <span
            style={{
              display: 'inline-block',
              borderRadius: 9999,
              background: 'rgba(6,148,209,0.18)',
              padding: '6px 16px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#4DBFEF',
              marginBottom: 12,
            }}
          >
            Top Vendor Partners
          </span>
          <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white" style={{ marginTop: 0 }}>
            Train with{' '}
            <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p style={{ margin: '0 auto', maxWidth: 520, fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
            Koenig is an authorized training partner for the world&apos;s leading technology vendors,
            delivering globally recognized certifications.
          </p>
        </div>

        {/* ── Mobile horizontal tab bar (hidden on lg+) ── */}
        <div className="vs-mobile-tabs" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as 'touch', scrollbarWidth: 'none' }}>
          <div style={{ display: 'flex', gap: 8, padding: '0 16px', width: 'max-content' }}>
            {SIDEBAR_TABS.map((tab, i) => (
              <button
                key={i}
                data-tab={i}
                data-active={i === 0 ? 'true' : 'false'}
                onClick={() => scrollToTrigger(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px', borderRadius: 9999,
                  border: '1px solid rgba(6,148,209,0.3)',
                  background: 'transparent', cursor: 'pointer',
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 14 }}>{tab.icon}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Main layout: sidebar + deck ── */}
        <div
          className="vs-layout"
          style={{
            display: 'flex',
            maxWidth: 1200,
            margin: '0 auto',
            alignItems: 'flex-start',
          }}
        >
          {/* ── LEFT: Sidebar (hidden on mobile) ── */}
          <div
            className="vs-sidebar"
            style={{
              flexShrink: 0,
              marginTop: 30,
              background: CARD_BG,
              borderRadius: 16,
              border: '1px solid rgba(6,148,209,0.18)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg,#076D9D,#0694D1)',
                color: 'white',
                padding: '12px 16px',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              🏆 Top Vendors
            </div>

            {SIDEBAR_TABS.map((tab, i) => (
              <button
                key={i}
                data-tab={i}
                data-active={i === 0 ? 'true' : 'false'}
                onClick={() => scrollToTrigger(i)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, flexShrink: 0,
                    background: i === 0 ? '#076D9D' : 'transparent',
                    color: i === 0 ? 'white' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {tab.icon}
                </span>
                <span className="vs-tab-label" style={{ fontSize: 14, color: i === 0 ? 'white' : 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap' }}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* ── RIGHT: Deck column ── */}
          <div className="vs-deck-col" style={{ flex: 1, position: 'relative', overflow: 'hidden', minWidth: 0 }}>
            <div
              className="vs-viewport"
              style={{
                position: 'relative',
                overflow: 'visible',
                zIndex: 10,
              }}
            >
              {vendors.map((vendor, i) => (
                <div
                  key={i}
                  data-index={i}
                  className="vs-card-wrapper"
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    borderRadius: 18,
                    overflow: 'hidden',
                    transform: i === 0 ? 'translateY(0) scale(1)' : 'translateY(110%)',
                    opacity: i === 0 ? 1 : 0,
                    zIndex: i === 0 ? 100 : i,
                    boxShadow: 'none',
                    transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease',
                  }}
                >
                  {'isMore' in vendor
                    ? <MoreCard />
                    : <VendorCard v={vendor as VendorItem} />
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Styles ── */}
        <style>{`

          /* ── Responsive layout ── */

          /* XXS — tiny phones: < 360px (iPhone SE 1st gen 320px, Galaxy A01) */
          @media (max-width: 359px) {
            .vs-section { padding: 18px 0; }
            .vs-header { margin-bottom: 10px; }
            .vs-mobile-tabs { display: flex; margin: 8px 0 10px; }
            .vs-layout { flex-direction: column; gap: 0; padding: 0 10px; }
            .vs-sidebar { display: none !important; }
            .vs-deck-col { padding-top: 4px; }
            .vs-viewport { height: 470px; }
            .vs-card-wrapper { height: 470px; }
            .vs-card-content { padding: 12px 10px 58px !important; }
            .vs-card-title { font-size: 18px !important; }
            .vs-card-panel { display: none !important; }
            .vs-stats-bar { padding-right: 0 !important; }
            .vs-cta-btn { padding: 8px 10px !important; font-size: 11px !important; width: 100% !important; text-align: center !important; }
            .vs-more-content { padding: 12px 10px !important; }
            .vs-more-title { font-size: 20px !important; }
            .vs-more-panel { display: none !important; }
          }

          /* XS — 360px phones: 360px–374px (Samsung Galaxy S/A, Xiaomi, Redmi — most common Android width) */
          @media (min-width: 360px) and (max-width: 374px) {
            .vs-section { padding: 20px 0; }
            .vs-header { margin-bottom: 12px; }
            .vs-mobile-tabs { display: flex; margin: 10px 0 12px; }
            .vs-layout { flex-direction: column; gap: 0; padding: 0 12px; }
            .vs-sidebar { display: none !important; }
            .vs-deck-col { padding-top: 4px; }
            .vs-viewport { height: 460px; }
            .vs-card-wrapper { height: 460px; }
            .vs-card-content { padding: 14px 12px 60px !important; }
            .vs-card-title { font-size: 20px !important; }
            .vs-card-panel { display: none !important; }
            .vs-stats-bar { padding-right: 0 !important; }
            .vs-cta-btn { padding: 8px 14px !important; font-size: 11px !important; }
            .vs-more-content { padding: 14px 12px !important; }
            .vs-more-title { font-size: 22px !important; }
            .vs-more-panel { display: none !important; }
          }

          /* SM — standard phones: 375px–479px (iPhone 12/13/14, Pixel 6, Galaxy S21) */
          @media (min-width: 375px) and (max-width: 479px) {
            .vs-section { padding: 24px 0; }
            .vs-header { margin-bottom: 14px; }
            .vs-mobile-tabs { display: flex; margin: 10px 0 14px; }
            .vs-layout { flex-direction: column; gap: 0; padding: 0 12px; }
            .vs-sidebar { display: none !important; }
            .vs-deck-col { padding-top: 6px; }
            .vs-viewport { height: 450px; }
            .vs-card-wrapper { height: 450px; }
            .vs-card-content { padding: 16px 14px 62px !important; }
            .vs-card-title { font-size: 22px !important; }
            .vs-card-panel { display: none !important; }
            .vs-stats-bar { padding-right: 0 !important; }
            .vs-cta-btn { padding: 9px 14px !important; font-size: 12px !important; }
            .vs-more-content { padding: 16px 14px !important; }
            .vs-more-title { font-size: 24px !important; }
            .vs-more-panel { display: none !important; }
          }

          /* MD-mobile — large phones / phablets: 480px–639px (iPhone 14 Plus/Max, Pixel 7 Pro) */
          @media (min-width: 480px) and (max-width: 639px) {
            .vs-section { padding: 28px 0; }
            .vs-header { margin-bottom: 16px; }
            .vs-mobile-tabs { display: flex; margin: 12px 0 16px; }
            .vs-layout { flex-direction: column; gap: 0; padding: 0 16px; }
            .vs-sidebar { display: none !important; }
            .vs-deck-col { padding-top: 6px; }
            .vs-viewport { height: 440px; }
            .vs-card-wrapper { height: 440px; }
            .vs-card-content { padding: 18px 16px 64px !important; }
            .vs-card-title { font-size: 24px !important; }
            .vs-card-panel { display: none !important; }
            .vs-stats-bar { padding-right: 0 !important; }
            .vs-cta-btn { padding: 9px 16px !important; font-size: 12px !important; }
            .vs-more-content { padding: 18px 16px !important; }
            .vs-more-title { font-size: 26px !important; }
            .vs-more-panel { display: none !important; }
          }

          /* LG-mobile — small tablets in portrait / large phones: 640px–767px (iPad mini portrait, Surface Duo) */
          @media (min-width: 640px) and (max-width: 767px) {
            .vs-section { padding: 32px 0; }
            .vs-header { margin-bottom: 20px; }
            .vs-mobile-tabs { display: flex; margin: 12px 0 16px; }
            .vs-layout { flex-direction: column; gap: 0; padding: 0 20px; }
            .vs-sidebar { display: none !important; }
            .vs-deck-col { padding-top: 8px; }
            .vs-viewport { height: 430px; }
            .vs-card-wrapper { height: 430px; }
            .vs-card-content { padding: 20px 20px 66px !important; }
            .vs-card-title { font-size: 26px !important; }
            .vs-card-panel { display: none !important; }
            .vs-stats-bar { padding-right: 0 !important; }
            .vs-cta-btn { padding: 9px 18px !important; font-size: 13px !important; }
            .vs-more-content { padding: 20px 20px !important; }
            .vs-more-title { font-size: 28px !important; }
            .vs-more-panel { display: none !important; }
          }

          /* Tablet — 768px to 1023px */
          @media (min-width: 768px) and (max-width: 1023px) {
            .vs-section { padding: 40px 0; }
            .vs-header { margin-bottom: 28px; }
            .vs-mobile-tabs { display: none; }
            .vs-layout { gap: 20px; padding: 0 16px; }
            .vs-sidebar { width: 170px; }
            .vs-tab-label { font-size: 13px !important; }
            .vs-deck-col { padding-top: 30px; }
            .vs-viewport { height: 420px; }
            .vs-card-wrapper { height: 420px; }
            .vs-card-content { padding: 24px 20px 68px !important; }
            .vs-card-title { font-size: 26px !important; }
            .vs-card-panel { display: block !important; width: 160px !important; }
            .vs-stats-bar { padding-right: 160px !important; }
            .vs-cta-btn { padding: 9px 16px !important; font-size: 13px !important; }
            .vs-more-content { padding: 24px 24px !important; }
            .vs-more-title { font-size: 28px !important; }
            .vs-more-panel { display: block !important; width: 220px !important; }
          }

          /* Desktop — 1024px to 1279px */
          @media (min-width: 1024px) and (max-width: 1279px) {
            .vs-section { padding: 52px 0; }
            .vs-header { margin-bottom: 36px; }
            .vs-mobile-tabs { display: none; }
            .vs-layout { gap: 24px; padding: 0 20px; }
            .vs-sidebar { width: 200px; }
            .vs-deck-col { padding-top: 30px; }
            .vs-viewport { height: 420px; }
            .vs-card-wrapper { height: 420px; }
            .vs-card-content { padding: 30px 24px 72px !important; }
            .vs-card-title { font-size: 28px !important; }
            .vs-card-panel { display: block !important; width: 190px !important; }
            .vs-stats-bar { padding-right: 190px !important; }
            .vs-cta-btn { padding: 10px 18px !important; }
            .vs-more-content { padding: 28px 28px !important; }
            .vs-more-title { font-size: 30px !important; }
            .vs-more-panel { display: block !important; width: 280px !important; }
          }

          /* Large desktop — 1280px+ */
          @media (min-width: 1280px) {
            .vs-section { padding: 60px 0; }
            .vs-header { margin-bottom: 48px; }
            .vs-mobile-tabs { display: none; }
            .vs-layout { gap: 32px; padding: 0 24px; }
            .vs-sidebar { width: 220px; }
            .vs-deck-col { padding-top: 30px; }
            .vs-viewport { height: 420px; }
            .vs-card-wrapper { height: 420px; }
            .vs-card-content { padding: 36px 32px 80px !important; }
            .vs-card-title { font-size: 32px !important; }
            .vs-card-panel { display: block !important; width: 220px !important; }
            .vs-stats-bar { padding-right: 220px !important; }
            .vs-cta-btn { padding: 10px 20px !important; }
            .vs-more-content { padding: 28px 36px !important; }
            .vs-more-title { font-size: 34px !important; }
            .vs-more-panel { display: block !important; width: 340px !important; }
          }

          /* ── Tab states ── */
          [data-tab] {
            border-left: 3px solid transparent;
            transition: background 0.2s, border-color 0.2s, color 0.2s;
          }
          [data-tab]:hover { background: rgba(6,148,209,0.1); }
          [data-tab][data-active="true"] {
            background: linear-gradient(90deg, rgba(6,148,209,0.35) 0%, rgba(77,191,239,0.12) 100%) !important;
            border-left: 3px solid #0694D1 !important;
            box-shadow: inset 0 0 0 1px rgba(6,148,209,0.3);
          }
          [data-tab][data-active="true"] > span:first-child {
            background: linear-gradient(135deg, #076D9D, #0694D1) !important;
            color: white !important;
          }
          [data-tab][data-active="true"] > span:last-child {
            color: white !important;
            font-weight: 600 !important;
          }

          /* Mobile tab pill active state */
          .vs-mobile-tabs [data-active="true"] {
            background: rgba(6,148,209,0.25) !important;
            border-color: #0694D1 !important;
          }
          .vs-mobile-tabs [data-active="true"] span:last-child {
            color: white !important;
          }

          /* Hide scrollbar on mobile tabs */
          .vs-mobile-tabs::-webkit-scrollbar { display: none; }
        `}</style>
      </section>

      {/* ── Scroll triggers ── */}
      {vendors.map((_, i) => (
        <div
          key={i}
          data-n={i}
          className="vs-trigger"
          style={{ height: '60vh' }}
        />
      ))}

    </div>
  )
}

'use client'
import { useEffect, useRef, useState } from 'react'

/* ─── Orbit Node Config ──────────────────────────────────────── */
const ORBIT_NODES = [
  { label: 'Gen AI',       color: '#0694d1', r: 115, speed: 0.00080, tilt:  22, phase: 0.00, icon: '🤖' },
  { label: 'Technology',   color: '#1a6fbf', r: 140, speed: 0.00058, tilt: -18, phase: 1.05, icon: '💻' },
  { label: 'Finance',      color: '#13a8d4', r: 126, speed: 0.00100, tilt:  35, phase: 2.10, icon: '💹' },
  { label: 'Data Science', color: '#076D9D', r: 150, speed: 0.00068, tilt: -28, phase: 3.15, icon: '📊' },
  { label: 'Management',   color: '#4DBFEF', r: 134, speed: 0.00090, tilt:  15, phase: 4.20, icon: '🏆' },
  { label: 'Functional',   color: '#0b2545', r: 122, speed: 0.00112, tilt: -40, phase: 5.25, icon: '⚙️' },
]

/* ─── City Hotspots ──────────────────────────────────────────── */
const CITIES = [
  { lat:  51.5, lon:   -0.1 },  // London
  { lat:  40.7, lon:  -74.0 },  // New York
  { lat:   1.3, lon:  103.8 },  // Singapore
  { lat:  28.6, lon:   77.2 },  // Delhi
  { lat:  35.7, lon:  139.7 },  // Tokyo
  { lat:  25.2, lon:   55.3 },  // Dubai
  { lat:  48.9, lon:    2.3 },  // Paris
  { lat:  37.8, lon: -122.4 },  // San Francisco
  { lat:  55.8, lon:   37.6 },  // Moscow
  { lat: -23.5, lon:  -46.6 },  // São Paulo
  { lat:  30.1, lon:   31.2 },  // Cairo
  { lat:  41.3, lon:   69.3 },  // Central Asia
  { lat: -33.9, lon:   18.4 },  // Cape Town
]

/* ─── Perspective factor for orbit ellipses ─────────────────── */
const PERSP = 0.36

/* ─── lat/lon → 2-D canvas position ─────────────────────────── */
function latLonToXY(lat: number, lon: number, rotation: number, R: number) {
  const latR = (lat * Math.PI) / 180
  const lonR = ((lon + rotation * (180 / Math.PI)) * Math.PI) / 180
  const cosLat = Math.cos(latR)
  return {
    sx:    cosLat * Math.cos(lonR) * R,
    sy:    -Math.sin(latR) * R,
    depth: cosLat * Math.sin(lonR),   // positive = facing viewer
  }
}

/* ─── Node position on a tilted elliptical orbit ────────────── */
function orbitPos(
  node: typeof ORBIT_NODES[0],
  angle: number,
  CX: number,
  CY: number,
) {
  const tiltRad = (node.tilt * Math.PI) / 180
  const xl = node.r * Math.cos(angle)
  const yl = node.r * PERSP * Math.sin(angle)
  return {
    nx: CX + xl * Math.cos(tiltRad) - yl * Math.sin(tiltRad),
    ny: CY + xl * Math.sin(tiltRad) + yl * Math.cos(tiltRad),
  }
}

/* ─── Component ──────────────────────────────────────────────── */
export default function EnterpriseHeroGlobe() {
  const cvRef      = useRef<HTMLCanvasElement>(null)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const hoveredRef = useRef<number | null>(null)
  const animRef    = useRef<number>(0)

  useEffect(() => {
    const cv  = cvRef.current as HTMLCanvasElement
    if (!cv) return
    const ctx = cv.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    let W = 0, H = 0, GR = 0, CX = 0, CY = 0
    let t = 0

    const cityPhases     = CITIES.map((_, i) => i * 0.62)
    const packetProgress = ORBIT_NODES.map(() => Math.random())

    /* ── resize ──────────────────────────────────────────────── */
    function resize() {
      const parent = cv.parentElement
      if (!parent) return
      W = parent.offsetWidth
      H = parent.offsetHeight
      const dpr = window.devicePixelRatio || 1
      cv.width  = Math.round(W * dpr)
      cv.height = Math.round(H * dpr)
      cv.style.width  = W + 'px'
      cv.style.height = H + 'px'
      ctx.resetTransform()
      ctx.scale(dpr, dpr)
      GR = Math.min(W, H) * 0.28
      CX = W / 2
      CY = H / 2
    }
    resize()

    /* ── globe body ──────────────────────────────────────────── */
    function drawGlobe() {
      const rotation = t * 0.18

      // Ocean fill
      const ocean = ctx.createRadialGradient(
        CX - GR * 0.22, CY - GR * 0.26, GR * 0.04,
        CX, CY, GR,
      )
      ocean.addColorStop(0,    'rgba(185,230,248,1)')
      ocean.addColorStop(0.40, 'rgba(90,175,222,1)')
      ocean.addColorStop(0.76, 'rgba(26,111,191,1)')
      ocean.addColorStop(1,    'rgba(7,28,60,1)')
      ctx.save()
      ctx.beginPath()
      ctx.arc(CX, CY, GR, 0, Math.PI * 2)
      ctx.fillStyle = ocean
      ctx.fill()
      ctx.restore()

      // Specular highlight
      const spec = ctx.createRadialGradient(
        CX - GR * 0.30, CY - GR * 0.33, 0,
        CX - GR * 0.10, CY - GR * 0.10, GR * 0.62,
      )
      spec.addColorStop(0,    'rgba(255,255,255,0.62)')
      spec.addColorStop(0.38, 'rgba(255,255,255,0.15)')
      spec.addColorStop(1,    'rgba(255,255,255,0)')
      ctx.save()
      ctx.beginPath()
      ctx.arc(CX, CY, GR, 0, Math.PI * 2)
      ctx.clip()
      ctx.fillStyle = spec
      ctx.fillRect(CX - GR, CY - GR, GR * 2, GR * 2)
      ctx.restore()

      // Longitude lines (18) — front brighter, back faded
      for (let i = 0; i < 18; i++) {
        const lonAngle = ((i / 18) * Math.PI * 2) + rotation
        const isFront  = Math.cos(lonAngle) > 0
        ctx.save()
        ctx.beginPath()
        for (let s = 0; s <= 64; s++) {
          const latA = (s / 64) * Math.PI - Math.PI / 2
          const px   = GR * Math.cos(latA) * Math.cos(lonAngle)
          const py   = -GR * Math.sin(latA)
          if (s === 0) ctx.moveTo(CX + px, CY + py)
          else         ctx.lineTo(CX + px, CY + py)
        }
        ctx.strokeStyle = isFront ? 'rgba(100,215,255,0.50)' : 'rgba(100,215,255,0.08)'
        ctx.lineWidth   = isFront ? 0.70 : 0.34
        ctx.stroke()
        ctx.restore()
      }

      // Latitude ellipses (9)
      for (let i = 1; i < 9; i++) {
        const latA = (i / 9) * Math.PI - Math.PI / 2
        const eRx  = GR * Math.cos(latA)
        const eY   = CY - GR * Math.sin(latA)
        if (eRx < 2) continue
        const brightness = 1 - Math.abs((i / 9) - 0.5) * 1.25
        ctx.save()
        ctx.beginPath()
        ctx.ellipse(CX, eY, eRx, eRx * 0.10, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(100,215,255,${Math.max(0.06, brightness * 0.42)})`
        ctx.lineWidth   = 0.55
        ctx.stroke()
        ctx.restore()
      }

      // ── Branding ring floating above the globe ──────────────
      const ringPulse = 0.72 + 0.28 * Math.sin(t * 1.8)
      const bRingRx   = GR * 0.72
      const bRingRy   = GR * 0.14
      const bRingY    = CY - GR * 1.08          // sits above the globe

      // outer glow pass
      ctx.save()
      ctx.beginPath()
      ctx.ellipse(CX, bRingY, bRingRx + 5, bRingRy + 3, 0, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(6,148,209,${0.18 * ringPulse})`
      ctx.lineWidth   = 8
      ctx.shadowBlur  = 18
      ctx.shadowColor = 'rgba(6,148,209,0.55)'
      ctx.stroke()
      ctx.restore()

      // main ring
      ctx.save()
      const bGrad = ctx.createLinearGradient(CX - bRingRx, bRingY, CX + bRingRx, bRingY)
      bGrad.addColorStop(0,    `rgba(6,148,209,0)`)
      bGrad.addColorStop(0.25, `rgba(6,148,209,${0.85 * ringPulse})`)
      bGrad.addColorStop(0.5,  `rgba(77,191,239,${ringPulse})`)
      bGrad.addColorStop(0.75, `rgba(6,148,209,${0.85 * ringPulse})`)
      bGrad.addColorStop(1,    `rgba(6,148,209,0)`)
      ctx.beginPath()
      ctx.ellipse(CX, bRingY, bRingRx, bRingRy, 0, 0, Math.PI * 2)
      ctx.strokeStyle = bGrad
      ctx.lineWidth   = 2.5
      ctx.shadowBlur  = 12
      ctx.shadowColor = `rgba(6,148,209,${0.7 * ringPulse})`
      ctx.stroke()
      ctx.restore()

      // small travelling dot on the ring
      const dotAngle = (t * 0.9) % (Math.PI * 2)
      const dotX = CX + Math.cos(dotAngle) * bRingRx
      const dotY = bRingY + Math.sin(dotAngle) * bRingRy
      const dg2  = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 5)
      dg2.addColorStop(0, 'rgba(255,255,255,1)')
      dg2.addColorStop(1, 'rgba(6,148,209,0)')
      ctx.save()
      ctx.fillStyle  = dg2
      ctx.shadowBlur = 8
      ctx.shadowColor = 'rgba(6,148,209,0.9)'
      ctx.beginPath()
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // 3 concentric pulsing rings
      for (let r = 0; r < 3; r++) {
        const pulse = ((t * 0.54 + r * 0.56) % 1)
        const ringR = GR + 9 + r * 15 + pulse * 26
        ctx.save()
        ctx.beginPath()
        ctx.arc(CX, CY, ringR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(19,168,212,${(1 - pulse) * 0.20})`
        ctx.lineWidth   = 1.5 - pulse * 0.7
        ctx.stroke()
        ctx.restore()
      }

      // Scanning arc
      const scanA = (t * 1.08) % (Math.PI * 2)
      ctx.save()
      ctx.beginPath()
      ctx.arc(CX, CY, GR + 5, scanA, scanA + 0.88)
      ctx.strokeStyle = 'rgba(19,168,212,0.90)'
      ctx.lineWidth   = 2.5
      ctx.lineCap     = 'round'
      ctx.shadowBlur  = 10
      ctx.shadowColor = 'rgba(19,168,212,0.65)'
      ctx.stroke()
      ctx.restore()

      // Glowing core dot
      const cp = 0.65 + 0.35 * Math.sin(t * 3.3)
      const cg = ctx.createRadialGradient(CX, CY, 0, CX, CY, 15)
      cg.addColorStop(0,   `rgba(255,255,255,${cp})`)
      cg.addColorStop(0.4, `rgba(19,168,212,${cp * 0.65})`)
      cg.addColorStop(1,   'rgba(19,168,212,0)')
      ctx.save()
      ctx.fillStyle = cg
      ctx.beginPath()
      ctx.arc(CX, CY, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = `rgba(255,255,255,${cp})`
      ctx.beginPath()
      ctx.arc(CX, CY, 3.0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // 13 city hotspot dots with ripple rings
      CITIES.forEach(({ lat, lon }, ci) => {
        const { sx, sy, depth } = latLonToXY(lat, lon, rotation, GR)
        if (depth < -0.06) return
        const px  = CX + sx
        const py  = CY + sy
        const vis = Math.min(1, (depth + 0.06) / 0.55)

        cityPhases[ci] = (cityPhases[ci] + 0.011) % 1
        const phase = cityPhases[ci]

        ctx.save()
        ctx.beginPath()
        ctx.arc(px, py, 4 + phase * 14, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(19,168,212,${(1 - phase) * 0.58 * vis})`
        ctx.lineWidth   = 1.1
        ctx.stroke()
        ctx.restore()

        const dg = ctx.createRadialGradient(px, py, 0, px, py, 5.5)
        dg.addColorStop(0,   `rgba(255,255,255,${vis})`)
        dg.addColorStop(0.5, `rgba(77,191,239,${vis * 0.75})`)
        dg.addColorStop(1,   'rgba(19,168,212,0)')
        ctx.save()
        ctx.fillStyle = dg
        ctx.beginPath()
        ctx.arc(px, py, 5.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(255,255,255,${vis * 0.92})`
        ctx.beginPath()
        ctx.arc(px, py, 2.1, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    /* ── orbit nodes ─────────────────────────────────────────── */
    function drawOrbitNodes() {
      ORBIT_NODES.forEach((node, ni) => {
        const tiltRad = (node.tilt * Math.PI) / 180
        const angle   = t * node.speed * 1000 + node.phase

        // Dashed tilted orbit ellipse
        ctx.save()
        ctx.translate(CX, CY)
        ctx.rotate(tiltRad)
        ctx.setLineDash([4, 5])
        ctx.beginPath()
        ctx.ellipse(0, 0, node.r, node.r * PERSP, 0, 0, Math.PI * 2)
        ctx.strokeStyle = node.color + '2a'
        ctx.lineWidth   = 1.0
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()

        // Node position (matches orbit ellipse exactly)
        const { nx, ny } = orbitPos(node, angle, CX, CY)

        // Connection line: globe edge → node
        const dx    = nx - CX
        const dy    = ny - CY
        const dist  = Math.hypot(dx, dy)
        const edgeX = CX + (dx / dist) * GR
        const edgeY = CY + (dy / dist) * GR

        const lg = ctx.createLinearGradient(edgeX, edgeY, nx, ny)
        lg.addColorStop(0,   node.color + '00')
        lg.addColorStop(0.3, node.color + '42')
        lg.addColorStop(1,   node.color + '20')
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(edgeX, edgeY)
        ctx.lineTo(nx, ny)
        ctx.strokeStyle = lg
        ctx.lineWidth   = 1.1
        ctx.stroke()
        ctx.restore()

        // Animated data packet
        packetProgress[ni] = (packetProgress[ni] + 0.0055) % 1
        const pp  = packetProgress[ni]
        const pkx = edgeX + (nx - edgeX) * pp
        const pky = edgeY + (ny - edgeY) * pp
        const pg  = ctx.createRadialGradient(pkx, pky, 0, pkx, pky, 5)
        pg.addColorStop(0, node.color + 'ff')
        pg.addColorStop(1, node.color + '00')
        ctx.save()
        ctx.fillStyle = pg
        ctx.beginPath()
        ctx.arc(pkx, pky, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Node circle
        const isHov = hoveredRef.current === ni
        const scale = isHov ? 1.28 : 1.0
        const nodeR = 13 * scale

        // Outer glow aura
        const glowR = nodeR + 8 + (isHov ? 7 : 0) + 2.8 * Math.sin(t * 3 + ni)
        const gg    = ctx.createRadialGradient(nx, ny, nodeR * 0.5, nx, ny, glowR)
        gg.addColorStop(0, node.color + '52')
        gg.addColorStop(1, node.color + '00')
        ctx.save()
        ctx.fillStyle = gg
        ctx.beginPath()
        ctx.arc(nx, ny, glowR, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Outer glow ring
        ctx.save()
        ctx.beginPath()
        ctx.arc(nx, ny, nodeR + 4.5, 0, Math.PI * 2)
        ctx.strokeStyle = node.color + (isHov ? 'bb' : '52')
        ctx.lineWidth   = isHov ? 2.0 : 1.4
        ctx.stroke()
        ctx.restore()

        // Filled node
        const ng = ctx.createRadialGradient(
          nx - nodeR * 0.28, ny - nodeR * 0.28, 0,
          nx, ny, nodeR,
        )
        ng.addColorStop(0, node.color + 'ff')
        ng.addColorStop(1, node.color + 'aa')
        ctx.save()
        ctx.beginPath()
        ctx.arc(nx, ny, nodeR, 0, Math.PI * 2)
        ctx.fillStyle = ng
        ctx.fill()
        ctx.restore()

        // Tech icon centered inside node
        const iconSize = nodeR * 1.05
        ctx.save()
        ctx.font = `${iconSize}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(node.icon, nx, ny)
        ctx.restore()

        // Label pill
        const fs = 9.5 * scale
        ctx.save()
        ctx.font      = `600 ${fs}px "Plus Jakarta Sans","Inter",sans-serif`
        ctx.textAlign = 'center'
        const tw = ctx.measureText(node.label).width
        const ph = 15 * scale
        const pw = tw + 12 * scale
        const lx = nx
        const ly = ny + nodeR + 9 * scale
        // Pill bg — brand navy with blue border
        ctx.fillStyle = 'rgba(11,37,69,0.88)'
        ctx.beginPath()
        if (ctx.roundRect) {
          ctx.roundRect(lx - pw / 2, ly - ph / 2, pw, ph, ph / 2)
        } else {
          ctx.rect(lx - pw / 2, ly - ph / 2, pw, ph)
        }
        ctx.fill()
        ctx.strokeStyle = 'rgba(6,148,209,0.70)'
        ctx.lineWidth   = 1
        ctx.stroke()
        // Pill text — Koenig cyan
        ctx.fillStyle   = '#4DBFEF'
        ctx.fillText(node.label, lx, ly + 3.5 * scale)
        ctx.restore()
      })
    }

    /* ── animation loop ──────────────────────────────────────── */
    function frame() {
      t += 0.010
      ctx.clearRect(0, 0, W, H)
      drawGlobe()
      drawOrbitNodes()
      animRef.current = requestAnimationFrame(frame)
    }

    animRef.current = requestAnimationFrame(frame)

    const ro = new ResizeObserver(resize)
    if (cv.parentElement) ro.observe(cv.parentElement)

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  }, [])

  /* ── hover detection ─────────────────────────────────────────── */
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const mx   = e.clientX - rect.left
    const my   = e.clientY - rect.top
    const CX   = rect.width  / 2
    const CY   = rect.height / 2
    let found: number | null = null
    ORBIT_NODES.forEach((node, ni) => {
      const { nx, ny } = orbitPos(node, (Date.now() * node.speed) + node.phase, CX, CY)
      if (Math.hypot(mx - nx, my - ny) < 22) found = ni
    })
    if (found !== hoveredRef.current) {
      hoveredRef.current = found
      setHoveredNode(found)
    }
  }

  function handleMouseLeave() {
    hoveredRef.current = null
    setHoveredNode(null)
  }

  /* ── HUD floating info cards ─────────────────────────────────── */
  const HUD_CARDS = [
    { pos: 'top-left',     title: 'Active Learners',  value: '3,240',  sub: 'Enrolled this month',      live: true,  icon: '👥', accent: '#22c55e' },
    { pos: 'top-right',    title: 'Certifications',   value: '1M+',    sub: 'Total issued globally',    live: false, icon: '🎓', accent: '#1a6fbf' },
    { pos: 'bottom-left',  title: 'Completion Rate',  value: '94.7%',  sub: 'Avg. across all courses',  live: false, icon: '📈', accent: '#13a8d4' },
    { pos: 'bottom-right', title: 'NPS Score',        value: '72',     sub: 'World-class promoter score', live: false, icon: '⭐', accent: '#f59e0b' },
  ]

  const posClass: Record<string, string> = {
    'top-left':     'top-3 left-1',
    'top-right':    'top-3 right-1',
    'bottom-left':  'bottom-3 left-1',
    'bottom-right': 'bottom-3 right-1',
  }
  const floatClass: Record<string, string> = {
    'top-left':     'ent-hud-float-a',
    'top-right':    'ent-hud-float-b',
    'bottom-left':  'ent-hud-float-b',
    'bottom-right': 'ent-hud-float-a',
  }

  return (
    <div ref={wrapRef} className="relative w-full h-full select-none">
      <style>{`
        @keyframes entHudFloatA {
          0%,100% { transform: translateY(0px) }
          50%     { transform: translateY(-7px) }
        }
        @keyframes entHudFloatB {
          0%,100% { transform: translateY(0px) }
          50%     { transform: translateY(7px) }
        }
        .ent-hud-float-a { animation: entHudFloatA 4.3s ease-in-out infinite; }
        .ent-hud-float-b { animation: entHudFloatB 4.9s ease-in-out infinite; }
        @keyframes entLivePulse {
          0%,100% { opacity:1; transform:scale(1) }
          50%     { opacity:0.42; transform:scale(1.48) }
        }
        .ent-live-dot { animation: entLivePulse 1.45s ease-in-out infinite; }
      `}</style>

      {/* Canvas */}
      <div
        className="absolute inset-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: hoveredNode !== null ? 'pointer' : 'default' }}
      >
        <canvas
          ref={cvRef}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>

      {/* HUD Cards */}
      {HUD_CARDS.map(card => (
        <div
          key={card.pos}
          className={`absolute ${posClass[card.pos]} ${floatClass[card.pos]} pointer-events-none z-10`}
        >
          <div
            style={{
              background:     'rgba(255,255,255,0.93)',
              border:         `1px solid ${card.accent}2a`,
              boxShadow:      `0 4px 22px rgba(11,37,69,0.10), 0 1px 5px ${card.accent}14`,
              borderRadius:   '14px',
              padding:        '11px 15px',
              minWidth:       '138px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 13 }}>{card.icon}</span>
              <span style={{
                fontSize:      9,
                fontWeight:    700,
                color:         '#64748b',
                fontFamily:    '"Plus Jakarta Sans", sans-serif',
                letterSpacing: '0.05em',
                textTransform: 'uppercase' as const,
              }}>
                {card.title}
              </span>
              {card.live && (
                <span
                  className="ent-live-dot"
                  style={{
                    width:        7,
                    height:       7,
                    borderRadius: '50%',
                    background:   '#22c55e',
                    display:      'inline-block',
                    marginLeft:   'auto',
                  }}
                />
              )}
            </div>
            <div style={{
              fontSize:   22,
              fontWeight: 800,
              color:      '#0b2545',
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              lineHeight: 1.1,
            }}>
              {card.value}
            </div>
            <div style={{
              fontSize:   10,
              color:      '#64748b',
              fontFamily: '"Inter", sans-serif',
              marginTop:  3,
            }}>
              {card.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

'use client'
import { useEffect, useRef, useState } from 'react'

/* ─── Orbit Node Config ─────────────────────────────────────── */
const ORBIT_NODES = [
  { label: 'Gen AI',       color: '#ef4444', glow: 'rgba(239,68,68,0.55)',   r: 118, speed: 0.0008, tilt: 22,  phase: 0 },
  { label: 'Technology',   color: '#3b82f6', glow: 'rgba(59,130,246,0.55)',  r: 138, speed: 0.0006, tilt: -18, phase: 1.1 },
  { label: 'Finance',      color: '#22c55e', glow: 'rgba(34,197,94,0.55)',   r: 125, speed: 0.0010, tilt: 35,  phase: 2.2 },
  { label: 'Data Science', color: '#ec4899', glow: 'rgba(236,72,153,0.55)',  r: 145, speed: 0.0007, tilt: -28, phase: 3.3 },
  { label: 'Management',   color: '#a855f7', glow: 'rgba(168,85,247,0.55)',  r: 132, speed: 0.0009, tilt: 15,  phase: 4.4 },
  { label: 'Functional',   color: '#f59e0b', glow: 'rgba(245,158,11,0.55)',  r: 120, speed: 0.0011, tilt: -40, phase: 5.5 },
]

/* ─── City Hotspots ─────────────────────────────────────────── */
const CITIES = [
  { name: 'London',       lat: 51.5,  lon: -0.1   },
  { name: 'New York',     lat: 40.7,  lon: -74.0  },
  { name: 'Singapore',    lat: 1.3,   lon: 103.8  },
  { name: 'Delhi',        lat: 28.6,  lon: 77.2   },
  { name: 'Tokyo',        lat: 35.7,  lon: 139.7  },
  { name: 'Dubai',        lat: 25.2,  lon: 55.3   },
  { name: 'Paris',        lat: 48.9,  lon: 2.3    },
  { name: 'San Francisco',lat: 37.8,  lon: -122.4 },
  { name: 'Moscow',       lat: 55.8,  lon: 37.6   },
  { name: 'São Paulo',    lat: -23.5, lon: -46.6  },
  { name: 'Cairo',        lat: 30.1,  lon: 31.2   },
  { name: 'Central Asia', lat: 41.3,  lon: 69.3   },
  { name: 'Cape Town',    lat: -33.9, lon: 18.4   },
]

function latLonToXY(lat: number, lon: number, rotation: number, R: number) {
  const latR = (lat * Math.PI) / 180
  const lonR = ((lon + rotation * (180 / Math.PI)) * Math.PI) / 180
  const cosLat = Math.cos(latR)
  const z = Math.sin(latR)
  const x = cosLat * Math.cos(lonR)
  const y = cosLat * Math.sin(lonR)
  return { sx: x * R, sy: -z * R, depth: y }
}

/* ─── Main Canvas Globe ─────────────────────────────────────── */
export default function HeroGlobe() {
  const cvRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const hoveredRef = useRef<number | null>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const cv = cvRef.current as HTMLCanvasElement
    if (!cv) return
    const ctx = cv.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    let W = 0, H = 0
    let GR = 0 // globe radius
    let CX = 0, CY = 0
    let t = 0

    // Per-city ripple timers (offset so they don't all pulse together)
    const cityPhases = CITIES.map((_, i) => i * 0.65)

    // Per-packet progress along orbit connection line
    const packetProgress = ORBIT_NODES.map(() => Math.random())

    function resize() {
      if (!cv.parentElement) return
      W = cv.parentElement.offsetWidth
      H = cv.parentElement.offsetHeight
      cv.width = W * window.devicePixelRatio
      cv.height = H * window.devicePixelRatio
      cv.style.width = W + 'px'
      cv.style.height = H + 'px'
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      GR = Math.min(W, H) * 0.30
      CX = W / 2
      CY = H / 2
    }

    resize()

    /* ── Draw Globe ────────────────────────────────────────── */
    function drawGlobe() {
      const rotation = t * 0.18 // radians/s equivalent

      // ── Ocean fill (radial gradient)
      const oceanGrad = ctx.createRadialGradient(CX - GR * 0.22, CY - GR * 0.25, GR * 0.05, CX, CY, GR)
      oceanGrad.addColorStop(0,   'rgba(173,216,240,1)')
      oceanGrad.addColorStop(0.45,'rgba(100,180,220,1)')
      oceanGrad.addColorStop(0.78,'rgba(26,111,191,1)')
      oceanGrad.addColorStop(1,   'rgba(11,37,69,1)')
      ctx.save()
      ctx.beginPath()
      ctx.arc(CX, CY, GR, 0, Math.PI * 2)
      ctx.fillStyle = oceanGrad
      ctx.fill()
      ctx.restore()

      // ── Specular highlight
      const specGrad = ctx.createRadialGradient(CX - GR * 0.28, CY - GR * 0.32, 0, CX - GR * 0.1, CY - GR * 0.1, GR * 0.65)
      specGrad.addColorStop(0,   'rgba(255,255,255,0.55)')
      specGrad.addColorStop(0.35,'rgba(255,255,255,0.12)')
      specGrad.addColorStop(1,   'rgba(255,255,255,0)')
      ctx.save()
      ctx.beginPath()
      ctx.arc(CX, CY, GR, 0, Math.PI * 2)
      ctx.clip()
      ctx.fillStyle = specGrad
      ctx.fillRect(CX - GR, CY - GR, GR * 2, GR * 2)
      ctx.restore()

      // ── Longitude lines (18)
      const LON_COUNT = 18
      for (let i = 0; i < LON_COUNT; i++) {
        const lonBase = (i / LON_COUNT) * Math.PI * 2
        const lonAngle = lonBase + rotation

        // Determine if front-facing
        const cosLon = Math.cos(lonAngle)
        const isFront = cosLon > 0

        ctx.save()
        ctx.beginPath()
        for (let step = 0; step <= 64; step++) {
          const latAngle = ((step / 64) * Math.PI) - Math.PI / 2
          const x = GR * Math.cos(latAngle) * Math.cos(lonAngle)
          const y = -GR * Math.sin(latAngle)
          if (step === 0) ctx.moveTo(CX + x, CY + y)
          else ctx.lineTo(CX + x, CY + y)
        }
        const alpha = isFront ? 0.55 : 0.10
        ctx.strokeStyle = `rgba(100,200,255,${alpha})`
        ctx.lineWidth = isFront ? 0.7 : 0.4
        ctx.stroke()
        ctx.restore()
      }

      // ── Latitude ellipses (9)
      const LAT_COUNT = 9
      for (let i = 1; i < LAT_COUNT; i++) {
        const latAngle = ((i / LAT_COUNT) * Math.PI) - Math.PI / 2
        const ellipseR = GR * Math.cos(latAngle)
        const ellipseY = CY - GR * Math.sin(latAngle)

        if (ellipseR < 1) continue

        ctx.save()
        ctx.beginPath()
        ctx.ellipse(CX, ellipseY, ellipseR, ellipseR * 0.12, 0, 0, Math.PI * 2)
        // Use depth from Y: top/bottom rings are faded, equatorial is bright
        const brightness = 1 - Math.abs((i / LAT_COUNT) - 0.5) * 1.2
        const alpha = Math.max(0.08, brightness * 0.5)
        ctx.strokeStyle = `rgba(100,200,255,${alpha})`
        ctx.lineWidth = 0.6
        ctx.stroke()
        ctx.restore()
      }

      // ── 3 Concentric pulsing rings
      for (let r = 0; r < 3; r++) {
        const pulse = ((t * 0.6 + r * 0.6) % 1)
        const ringR = GR + 12 + r * 18 + pulse * 22
        const alpha = (1 - pulse) * 0.25
        ctx.save()
        ctx.beginPath()
        ctx.arc(CX, CY, ringR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(19,168,212,${alpha})`
        ctx.lineWidth = 1.5 - pulse
        ctx.stroke()
        ctx.restore()
      }

      // ── Scanning arc
      const scanAngle = (t * 1.1) % (Math.PI * 2)
      ctx.save()
      ctx.beginPath()
      ctx.arc(CX, CY, GR + 5, scanAngle, scanAngle + 0.9)
      ctx.strokeStyle = 'rgba(19,168,212,0.9)'
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'
      ctx.shadowBlur = 8
      ctx.shadowColor = 'rgba(19,168,212,0.8)'
      ctx.stroke()
      ctx.restore()

      // ── Glowing core dot
      const corePulse = 0.7 + 0.3 * Math.sin(t * 3.5)
      const coreGrad = ctx.createRadialGradient(CX, CY, 0, CX, CY, 12)
      coreGrad.addColorStop(0,   `rgba(255,255,255,${corePulse})`)
      coreGrad.addColorStop(0.4, `rgba(19,168,212,${corePulse * 0.7})`)
      coreGrad.addColorStop(1,   'rgba(19,168,212,0)')
      ctx.save()
      ctx.fillStyle = coreGrad
      ctx.beginPath()
      ctx.arc(CX, CY, 12, 0, Math.PI * 2)
      ctx.fill()
      // solid white inner
      ctx.fillStyle = `rgba(255,255,255,${corePulse})`
      ctx.beginPath()
      ctx.arc(CX, CY, 3.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // ── City hotspots
      CITIES.forEach((city, ci) => {
        const { sx, sy, depth } = latLonToXY(city.lat, city.lon, rotation, GR)
        if (depth < -0.1) return // back face hidden

        const px = CX + sx
        const py = CY + sy
        const vis = Math.min(1, (depth + 0.1) / 0.5)

        cityPhases[ci] += 0.012
        const ripplePhase = cityPhases[ci] % 1

        // ripple ring
        const rippleR = 4 + ripplePhase * 14
        const rippleA = (1 - ripplePhase) * 0.6 * vis
        ctx.save()
        ctx.beginPath()
        ctx.arc(px, py, rippleR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(19,168,212,${rippleA})`
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.restore()

        // dot
        const dotGrad = ctx.createRadialGradient(px, py, 0, px, py, 5)
        dotGrad.addColorStop(0,  `rgba(255,255,255,${vis})`)
        dotGrad.addColorStop(0.5,`rgba(77,191,239,${vis * 0.8})`)
        dotGrad.addColorStop(1,  `rgba(19,168,212,0)`)
        ctx.save()
        ctx.fillStyle = dotGrad
        ctx.beginPath()
        ctx.arc(px, py, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(255,255,255,${vis * 0.95})`
        ctx.beginPath()
        ctx.arc(px, py, 2.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    /* ── Draw Orbit Nodes ──────────────────────────────────── */
    function drawOrbitNodes() {
      ORBIT_NODES.forEach((node, ni) => {
        const angle = t * node.speed * 1000 + node.phase
        const tiltRad = (node.tilt * Math.PI) / 180

        // Ellipse semi-axes in screen space
        const ax = node.r * 1.0
        const ay = node.r * 0.35 * Math.cos(tiltRad)

        // ── Dashed orbit ellipse
        ctx.save()
        ctx.setLineDash([4, 5])
        ctx.beginPath()
        ctx.ellipse(CX, CY, ax, Math.abs(ay) + Math.abs(node.r * 0.35 * Math.sin(tiltRad) * 0.35), tiltRad, 0, Math.PI * 2)
        ctx.strokeStyle = `${node.color}33`
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()

        // Node position
        const nx = CX + Math.cos(angle) * ax
        const ny = CY + Math.sin(angle) * (Math.abs(ay) + Math.abs(node.r * 0.35 * Math.sin(tiltRad) * 0.35))

        // ── Connection line (globe edge → node)
        const dx = nx - CX, dy = ny - CY
        const dist = Math.hypot(dx, dy)
        const edgeX = CX + (dx / dist) * GR
        const edgeY = CY + (dy / dist) * GR

        const lineGrad = ctx.createLinearGradient(edgeX, edgeY, nx, ny)
        lineGrad.addColorStop(0, `${node.color}00`)
        lineGrad.addColorStop(0.3, `${node.color}44`)
        lineGrad.addColorStop(1, `${node.color}22`)
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(edgeX, edgeY)
        ctx.lineTo(nx, ny)
        ctx.strokeStyle = lineGrad
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.restore()

        // ── Animated data packet
        packetProgress[ni] = (packetProgress[ni] + 0.006) % 1
        const pp = packetProgress[ni]
        const pkx = edgeX + (nx - edgeX) * pp
        const pky = edgeY + (ny - edgeY) * pp
        const pkGrad = ctx.createRadialGradient(pkx, pky, 0, pkx, pky, 5)
        pkGrad.addColorStop(0, `${node.color}ff`)
        pkGrad.addColorStop(1, `${node.color}00`)
        ctx.save()
        ctx.fillStyle = pkGrad
        ctx.beginPath()
        ctx.arc(pkx, pky, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // ── Node circle
        const isHov = hoveredRef.current === ni
        const scale = isHov ? 1.25 : 1.0
        const nodeR = 14 * scale

        // outer glow
        const glowR = nodeR + 8 + (isHov ? 6 : 0) + 3 * Math.sin(t * 3 + ni)
        const glowGrad = ctx.createRadialGradient(nx, ny, nodeR * 0.5, nx, ny, glowR)
        glowGrad.addColorStop(0, `${node.color}55`)
        glowGrad.addColorStop(1, `${node.color}00`)
        ctx.save()
        ctx.fillStyle = glowGrad
        ctx.beginPath()
        ctx.arc(nx, ny, glowR, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // glow ring
        ctx.save()
        ctx.beginPath()
        ctx.arc(nx, ny, nodeR + 4, 0, Math.PI * 2)
        ctx.strokeStyle = `${node.color}${isHov ? 'bb' : '55'}`
        ctx.lineWidth = isHov ? 2 : 1.5
        ctx.stroke()
        ctx.restore()

        // filled circle
        const nodeGrad = ctx.createRadialGradient(nx - nodeR * 0.3, ny - nodeR * 0.3, 0, nx, ny, nodeR)
        nodeGrad.addColorStop(0, node.color + 'ff')
        nodeGrad.addColorStop(1, node.color + 'aa')
        ctx.save()
        ctx.beginPath()
        ctx.arc(nx, ny, nodeR, 0, Math.PI * 2)
        ctx.fillStyle = nodeGrad
        ctx.fill()
        ctx.restore()

        // white inner dot
        ctx.save()
        ctx.fillStyle = 'rgba(255,255,255,0.92)'
        ctx.beginPath()
        ctx.arc(nx, ny, 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // ── Label pill (drawn on canvas for simplicity)
        ctx.save()
        ctx.font = `bold ${10 * scale}px "Plus Jakarta Sans", "Inter", sans-serif`
        ctx.textAlign = 'center'
        const tw = ctx.measureText(node.label).width
        const ph = 16 * scale, pw = tw + 14 * scale
        const lx = nx, ly = ny + nodeR + 10 * scale
        // pill bg
        ctx.fillStyle = 'rgba(255,255,255,0.92)'
        ctx.beginPath()
        ctx.roundRect(lx - pw / 2, ly - ph / 2, pw, ph, ph / 2)
        ctx.fill()
        // pill border
        ctx.strokeStyle = node.color + '88'
        ctx.lineWidth = 1
        ctx.stroke()
        // text
        ctx.fillStyle = node.color
        ctx.fillText(node.label, lx, ly + 3.5 * scale)
        ctx.restore()
      })
    }

    /* ── Main Loop ─────────────────────────────────────────── */
    function frame() {
      t += 0.01
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

  // ── Hover detection via pointer move on wrapper
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    const W = rect.width, H = rect.height
    const CX = W / 2, CY = H / 2
    const GR = Math.min(W, H) * 0.30

    let found: number | null = null
    ORBIT_NODES.forEach((node, ni) => {
      const angle = (Date.now() * node.speed) + node.phase
      const tiltRad = (node.tilt * Math.PI) / 180
      const ax = node.r
      const ay = Math.abs(node.r * 0.35 * Math.cos(tiltRad)) + Math.abs(node.r * 0.35 * Math.sin(tiltRad) * 0.35)
      const nx = CX + Math.cos(angle) * ax
      const ny = CY + Math.sin(angle) * ay
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

  /* ── HUD Cards ─────────────────────────────────────────── */
  const HUD_CARDS = [
    {
      pos: 'top-left',
      title: 'Active Learners',
      value: '3,240',
      sub: 'Enrolled this month',
      live: true,
      icon: '👥',
      accent: '#22c55e',
    },
    {
      pos: 'top-right',
      title: 'Certifications',
      value: '1M+',
      sub: 'Total issued globally',
      live: false,
      icon: '🎓',
      accent: '#1a6fbf',
    },
    {
      pos: 'bottom-left',
      title: 'Completion Rate',
      value: '94.7%',
      sub: 'Avg. across all courses',
      live: false,
      icon: '📈',
      accent: '#13a8d4',
    },
    {
      pos: 'bottom-right',
      title: 'NPS Score',
      value: '72',
      sub: 'Promoter score',
      live: false,
      icon: '⭐',
      accent: '#f59e0b',
    },
  ]

  const posClass: Record<string, string> = {
    'top-left':     'top-4 left-2',
    'top-right':    'top-4 right-2',
    'bottom-left':  'bottom-4 left-2',
    'bottom-right': 'bottom-4 right-2',
  }
  const floatClass: Record<string, string> = {
    'top-left':     'hud-float-a',
    'top-right':    'hud-float-b',
    'bottom-left':  'hud-float-b',
    'bottom-right': 'hud-float-a',
  }

  return (
    <div className="relative w-full h-full select-none" ref={wrapRef}>
      <style>{`
        @keyframes hudFloatA { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes hudFloatB { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(8px)} }
        .hud-float-a { animation: hudFloatA 4s ease-in-out infinite; }
        .hud-float-b { animation: hudFloatB 4.5s ease-in-out infinite; }
        @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        .live-dot { animation: livePulse 1.5s ease-in-out infinite; }
      `}</style>

      {/* Canvas */}
      <div
        className="absolute inset-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: hoveredNode !== null ? 'pointer' : 'default' }}
      >
        <canvas ref={cvRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>

      {/* HUD Cards */}
      {HUD_CARDS.map(card => (
        <div
          key={card.pos}
          className={`absolute ${posClass[card.pos]} ${floatClass[card.pos]} pointer-events-none z-10`}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.93)',
              border: `1px solid ${card.accent}30`,
              boxShadow: `0 4px 20px rgba(11,37,69,0.10), 0 1px 4px ${card.accent}18`,
              borderRadius: '12px',
              padding: '10px 14px',
              minWidth: '130px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span style={{ fontSize: 14 }}>{card.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#64748b', fontFamily: '"Plus Jakarta Sans", sans-serif', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {card.title}
              </span>
              {card.live && (
                <span className="live-dot ml-auto" style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              )}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0b2545', fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: 1.1 }}>
              {card.value}
            </div>
            <div style={{ fontSize: 10, color: '#64748b', fontFamily: '"Inter", sans-serif', marginTop: 2 }}>
              {card.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

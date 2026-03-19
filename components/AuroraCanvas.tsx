'use client'
import { useEffect, useRef } from 'react'

interface AuroraCanvasProps {
  className?: string
  style?: React.CSSProperties
}

type Star = { x: number; y: number; vx: number; vy: number; len: number; life: number; maxLife: number }

const ORBS = [
  { cx:.28, cy:.38, r:.44, col:'19,168,212', spd:.00016, fx:.65, fy:.50, ax:.30, ay:.22, ph:0.0 },
  { cx:.72, cy:.58, r:.40, col:'19,168,212', spd:.00013, fx:.50, fy:.80, ax:.24, ay:.28, ph:2.1 },
  { cx:.50, cy:.22, r:.32, col:'19,168,212', spd:.00021, fx:.90, fy:.60, ax:.18, ay:.14, ph:4.4 },
  { cx:.16, cy:.74, r:.46, col:'11,37,69',   spd:.00011, fx:.60, fy:.42, ax:.20, ay:.32, ph:1.1 },
  { cx:.84, cy:.32, r:.36, col:'8,50,100',   spd:.00015, fx:.42, fy:.88, ax:.28, ay:.16, ph:3.3 },
  { cx:.54, cy:.82, r:.30, col:'11,37,69',   spd:.00019, fx:.78, fy:.54, ax:.22, ay:.24, ph:5.2 },
]

export default function AuroraCanvas({ className = '', style }: AuroraCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let tick = 0
    const stars: Star[] = []

    const spawnStar = () => {
      const W = canvas.width, H = canvas.height
      const angle = (Math.PI / 180) * (18 + Math.random() * 12)
      const speed = 3.2 + Math.random() * 2.2
      stars.push({
        x: Math.random() * W * 0.65,
        y: Math.random() * H * 0.42,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 80 + Math.random() * 70,
        life: 0,
        maxLife: 75 + Math.random() * 45,
      })
    }

    const interval = setInterval(spawnStar, 2200)
    spawnStar()

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const W = canvas.width, H = canvas.height
      tick++

      // ── Deep radial gradient base ──────────────────────────
      const bg = ctx.createRadialGradient(W * .35, H * .30, 0, W * .35, H * .30, Math.max(W, H) * .95)
      bg.addColorStop(0,   '#0d2035')
      bg.addColorStop(.40, '#0a1628')
      bg.addColorStop(1,   '#060f1a')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // ── Dot grid ───────────────────────────────────────────
      ctx.strokeStyle = 'rgba(19,168,212,.025)'
      ctx.lineWidth = 1
      for (let x = 0; x < W; x += 72) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += 72) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // ── Aurora orbs ────────────────────────────────────────
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      ORBS.forEach(o => {
        const x = (o.cx + Math.sin(tick * o.spd * o.fx + o.ph) * o.ax) * W
        const y = (o.cy + Math.cos(tick * o.spd * o.fy + o.ph) * o.ay) * H
        const r = o.r * Math.min(W, H)
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0,    `rgba(${o.col},.17)`)
        g.addColorStop(.35,  `rgba(${o.col},.09)`)
        g.addColorStop(.70,  `rgba(${o.col},.03)`)
        g.addColorStop(1,    `rgba(${o.col},0)`)
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
      })
      ctx.restore()

      // ── Shooting stars ─────────────────────────────────────
      for (let s = stars.length - 1; s >= 0; s--) {
        const st = stars[s]
        st.x += st.vx; st.y += st.vy; st.life++
        const progress = st.life / st.maxLife
        const alpha = progress < .15
          ? progress / .15
          : 1 - (progress - .15) / .85

        const tailX = st.x - (st.vx / Math.hypot(st.vx, st.vy)) * st.len
        const tailY = st.y - (st.vy / Math.hypot(st.vx, st.vy)) * st.len
        const sg = ctx.createLinearGradient(tailX, tailY, st.x, st.y)
        sg.addColorStop(0,    `rgba(19,168,212,0)`)
        sg.addColorStop(.55,  `rgba(100,210,240,${alpha * .40})`)
        sg.addColorStop(1,    `rgba(255,255,255,${alpha})`)
        ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(st.x, st.y)
        ctx.strokeStyle = sg; ctx.lineWidth = 1.5; ctx.stroke()

        // Head glow
        const hg = ctx.createRadialGradient(st.x, st.y, 0, st.x, st.y, 4)
        hg.addColorStop(0, `rgba(255,255,255,${alpha})`)
        hg.addColorStop(1, `rgba(19,168,212,0)`)
        ctx.beginPath(); ctx.arc(st.x, st.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = hg; ctx.fill()

        if (st.life >= st.maxLife) stars.splice(s, 1)
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: 'block', ...style }}
    />
  )
}

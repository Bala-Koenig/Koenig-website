'use client'
import { useEffect, useRef } from 'react'

/* ── tunables ───────────────────────────────────────────── */
const N         = 115   // particle count
const REPEL_R   = 135   // repel radius (px)
const LINE_R    = 155   // cursor→particle line radius (px)
const SPRING    = 0.030 // spring strength back to home
const DAMP      = 0.80  // velocity damping per frame
const REPEL_F   = 3.0   // repel impulse multiplier
const CONNECT_R = 95    // particle↔particle join line radius (px)
// Brand blue  rgb(6, 148, 209)
const R = 6, G = 148, B = 209

interface P {
  x: number; y: number   // current
  hx: number; hy: number // home
  vx: number; vy: number // velocity
  rad: number            // dot radius
  ph: number             // sine phase
  fx: number; fy: number // sine frequency
  ax: number; ay: number // sine amplitude
  baseOp: number         // resting opacity (left zone vs right zone)
}

export default function HeroParticles() {
  const cvRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!cvRef.current) return
    const cv: HTMLCanvasElement = cvRef.current
    const ctx = cv.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return
    const par = cv.parentElement as HTMLElement
    if (!par) return

    let W = 0, H = 0
    let ps: P[] = []
    let t = 0
    let rafId = 0
    let paused = false
    const m = { x: -9999, y: -9999, on: false }

    /* ── initialise ─────────────────────────────────────── */
    function setup() {
      W = par.offsetWidth
      H = par.offsetHeight
      cv.width  = W
      cv.height = H
      ps = Array.from({ length: N }, () => {
        const x = Math.random() * W
        const y = Math.random() * H
        const inRight = x > W * 0.55
        return {
          x, y, hx: x, hy: y, vx: 0, vy: 0,
          rad:    Math.random() * 1.5 + 0.8,
          ph:     Math.random() * Math.PI * 2,
          fx:     Math.random() * 0.22 + 0.10,
          fy:     Math.random() * 0.22 + 0.10,
          ax:     Math.random() * 20 + 8,
          ay:     Math.random() * 14 + 6,
          baseOp: inRight ? 0.62 : 0.22,
        }
      })
    }

    /* ── main render loop ───────────────────────────────── */
    function frame() {
      ctx.clearRect(0, 0, W, H)
      if (!paused) t += 0.007

      /* particle↔particle join lines */
      ctx.lineWidth = 0.65
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const d = Math.hypot(ps[i].x - ps[j].x, ps[i].y - ps[j].y)
          if (d < CONNECT_R) {
            const a = (1 - d / CONNECT_R) * 0.38
            ctx.strokeStyle = `rgba(${R},${G},${B},${a})`
            ctx.beginPath()
            ctx.moveTo(ps[i].x, ps[i].y)
            ctx.lineTo(ps[j].x, ps[j].y)
            ctx.stroke()
          }
        }
      }

      /* connection lines from cursor */
      if (m.on && !paused) {
        ctx.save()
        ctx.lineWidth = 0.85
        for (const p of ps) {
          const d = Math.hypot(m.x - p.x, m.y - p.y)
          if (d < LINE_R) {
            const a = (1 - d / LINE_R) * 0.42
            ctx.strokeStyle = `rgba(${R},${G},${B},${a})`
            ctx.shadowBlur  = 6
            ctx.shadowColor = `rgba(${R},${G},${B},0.55)`
            ctx.beginPath()
            ctx.moveTo(m.x, m.y)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
        }
        ctx.shadowBlur = 0
        ctx.restore()
      }

      /* update + draw particles */
      for (const p of ps) {
        if (!paused) {
          /* sine-wave float target */
          const tx = p.hx + Math.sin(t * p.fx * 6 + p.ph) * p.ax
          const ty = p.hy + Math.cos(t * p.fy * 6 + p.ph * 1.35) * p.ay

          /* repel from cursor */
          if (m.on) {
            const d = Math.hypot(m.x - p.x, m.y - p.y)
            if (d < REPEL_R && d > 0) {
              const f = Math.pow((REPEL_R - d) / REPEL_R, 1.4) * REPEL_F
              const ang = Math.atan2(p.y - m.y, p.x - m.x)
              p.vx += Math.cos(ang) * f
              p.vy += Math.sin(ang) * f
            }
          }

          /* spring toward sine target */
          p.vx += (tx - p.x) * SPRING
          p.vy += (ty - p.y) * SPRING
          p.vx *= DAMP
          p.vy *= DAMP
          p.x  += p.vx
          p.y  += p.vy
        }

        /* opacity — brighten near cursor */
        let op = p.baseOp
        if (m.on && !paused) {
          const d = Math.hypot(m.x - p.x, m.y - p.y)
          if (d < LINE_R * 1.8) {
            op = Math.min(op + (1 - d / (LINE_R * 1.8)) * p.baseOp * 2.2, 0.88)
          }
        }

        const glowR = p.rad * 3.5
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR)
        grad.addColorStop(0,   `rgba(${R},${G},${B},${op})`)
        grad.addColorStop(0.4, `rgba(${R},${G},${B},${op * 0.55})`)
        grad.addColorStop(1,   `rgba(${R},${G},${B},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2)
        ctx.fill()
      }

      rafId = requestAnimationFrame(frame)
    }

    /* ── event handlers ─────────────────────────────────── */
    function onMove(e: MouseEvent) {
      const rc = cv.getBoundingClientRect()
      m.x  = e.clientX - rc.left
      m.y  = e.clientY - rc.top
      m.on = true
    }
    function onLeave() { m.on = false }
    function onFocusIn()  { paused = true }
    function onFocusOut(e: FocusEvent) {
      /* resume only when focus moves fully outside the banner */
      if (!par.contains(e.relatedTarget as Node | null)) paused = false
    }

    setup()
    frame()

    par.addEventListener('mousemove',  onMove)
    par.addEventListener('mouseleave', onLeave)
    par.addEventListener('focusin',    onFocusIn)
    par.addEventListener('focusout',   onFocusOut as EventListener)
    window.addEventListener('resize',  setup)

    return () => {
      cancelAnimationFrame(rafId)
      par.removeEventListener('mousemove',  onMove)
      par.removeEventListener('mouseleave', onLeave)
      par.removeEventListener('focusin',    onFocusIn)
      par.removeEventListener('focusout',   onFocusOut as EventListener)
      window.removeEventListener('resize',  setup)
    }
  }, [])

  return (
    <canvas
      ref={cvRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        3,
      }}
    />
  )
}

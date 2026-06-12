"use client";
import { useState, useEffect, useRef } from "react";

/* ── Data ───────────────────────────────────────────────── */
const COMPARE_CATS = [
  {
    cat: "Trainer Quality & Credentials",
    rows: [
      { label: "MCT-Certified Trainers",        koenig:"yes", alp:"partial", legacy:"partial", selfPaced:"no",  free:"no"  },
      { label: "Live Instructor-Led Classes",    koenig:"yes", alp:"yes",     legacy:"yes",     selfPaced:"no",  free:"no"  },
      { label: "1-on-1 Private Training",        koenig:"yes", alp:"no",      legacy:"no",      selfPaced:"no",  free:"no"  },
    ],
  },
  {
    cat: "Microsoft Authorisation",
    rows: [
      { label: "Official Microsoft ALP Status",  koenig:"yes", alp:"yes",     legacy:"partial", selfPaced:"no",  free:"yes" },
      { label: "Official MOC Courseware",         koenig:"yes", alp:"yes",     legacy:"partial", selfPaced:"no",  free:"yes" },
      { label: "ESI / EA Credits Accepted",       koenig:"yes", alp:"yes",     legacy:"partial", selfPaced:"no",  free:"no"  },
    ],
  },
  {
    cat: "Flexibility & Access",
    rows: [
      { label: "Flexi / Any-Day Start",           koenig:"yes", alp:"no",      legacy:"no",      selfPaced:"yes", free:"yes" },
      { label: "On-Site / Fly-Me-A-Trainer",      koenig:"yes", alp:"yes",     legacy:"yes",     selfPaced:"no",  free:"no"  },
      { label: "Global Delivery (50+ countries)", koenig:"yes", alp:"partial", legacy:"partial", selfPaced:"yes", free:"yes" },
    ],
  },
  {
    cat: "Results & Trust",
    rows: [
      { label: "Microsoft Exam Pass Rate",   koenig:"95%",             koenigSub:"vs 60–70% industry avg", alp:"~70–75%",  legacy:"Not published", selfPaced:"Not tracked", free:"Variable" },
      { label: "Entry Price (Fundamentals)", koenig:"~$795",           koenigSub:"best value",              alp:"~$1,500+", legacy:"~$1,400+",      selfPaced:"$15–30/mo",   free:"Free"     },
      { label: "Verified Student Reviews",   koenig:"18,400+ · 4.9★", koenigSub:"",                        alp:"Limited",  legacy:"Limited",        selfPaced:"High volume", free:"N/A"      },
    ],
  },
];

const SCORES: Record<string, number> = { koenig:12, alp:5, legacy:2, selfPaced:2, free:4 };
const SCORE_TOTAL = 12;

const CMP_COLS = [
  { key:"koenig",    label:"Koenig",              sub:"Official ALP Partner",     isKoenig:true  },
  { key:"alp",       label:"ALP Provider",        sub:"Other authorised partner", isKoenig:false },
  { key:"legacy",    label:"Legacy Provider",     sub:"Traditional classroom",    isKoenig:false },
  { key:"selfPaced", label:"Self-Paced Platform", sub:"On-demand video",          isKoenig:false },
  { key:"free",      label:"Free Platform",       sub:"Self-study / free tier",   isKoenig:false },
];

/* ── Cell renderer ──────────────────────────────────────── */
function CmpCell({ value, isKoenig, sub }: { value: string; isKoenig: boolean; sub?: string }) {
  const v = typeof value === "string" ? value.toLowerCase().trim() : "";
  if (v === "yes") return (
    <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:24, height:24, borderRadius:"50%", background:"rgba(74,222,128,0.13)", border:"1.5px solid rgba(74,222,128,0.32)" }} aria-label="Yes">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </span>
  );
  if (v === "no") return (
    <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:24, height:24, borderRadius:"50%", background:"rgba(255,255,255,0.03)", border:"1.5px solid rgba(255,255,255,0.08)" }} aria-label="No">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </span>
  );
  if (v === "partial") return (
    <span style={{ fontSize:10.5, fontWeight:700, color:"#fbbf24", background:"rgba(251,191,36,0.09)", border:"1px solid rgba(251,191,36,0.18)", padding:"2px 7px", borderRadius:6, whiteSpace:"nowrap" }}>Partial</span>
  );
  if (isKoenig) return (
    <div>
      <div style={{ fontSize:12.5, fontWeight:800, color:"#4ade80" }}>{value}</div>
      {sub && <div style={{ fontSize:9.5, color:"#3AB6EB", fontWeight:700, marginTop:2 }}>{sub}</div>}
    </div>
  );
  return <span style={{ fontSize:11.5, fontWeight:500, color:"rgba(255,255,255,0.32)" }}>{value}</span>;
}

/* ── Donut chart ─────────────────────────────────────────── */
function ScoreDonutChart({ score, total, color }: { score: number; total: number; color: string }) {
  const r = 24;
  const circ = 2 * Math.PI * r;
  const dash = (score / total) * circ;
  return (
    <svg width="68" height="68" viewBox="0 0 64 64" style={{ display:"block", overflow:"visible" }}>
      <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7"/>
      <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="7"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 32 32)"/>
      <text x="32" y="37" textAnchor="middle" fontSize="15" fontWeight="800"
        fill={color} style={{ fontFamily:"inherit" }}>{score}</text>
    </svg>
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function Comparison() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const INITIAL_ROWS = 8;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  let idx = 0;
  const indexedCats = COMPARE_CATS.map(cat => ({
    ...cat,
    rows: cat.rows.map((row: Record<string, string>) => ({ ...row, _idx: idx++ })),
  }));
  const totalRows = idx;
  const hiddenCount = totalRows - INITIAL_ROWS;

  return (
    <>
      <style suppressHydrationWarning>{`
        .cmp-sec {
          background: radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 45%, #040C18 100%);
          padding: 30px 16px;
          overflow: hidden;
          position: relative;
        }
        .cmp-sec::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(6,148,209,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .cmp-inner { max-width: 1200px; margin: 0 auto; position: relative; }
        .cmp-header { text-align: center; margin-bottom: 28px; }
        .cmp-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(6,148,209,0.12); color: #0694D1;
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 4px 14px; border-radius: 20px; margin-bottom: 12px;
          border: 1px solid rgba(6,148,209,0.35);
        }
        .cmp-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #0694D1;
          display: inline-block;
          animation: livePulse 1.5s infinite;
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes em-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .cmp-title {
          font-size: 22px; font-weight: 800; color: #fff;
          letter-spacing: -0.015em; line-height: 1.35; margin-bottom: 8px;
          font-family: 'GTWalsheimPro', sans-serif;
        }
        .cmp-title em {
          background-image:
            linear-gradient(90deg,
              transparent calc(50% - 80px),
              #93d4ff 50%,
              transparent calc(50% + 80px)
            ),
            linear-gradient(#0694D1, #0694D1);
          background-size: 300% 100%, auto;
          background-repeat: no-repeat, padding-box;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          font-style: normal;
          animation: em-shimmer 3s linear infinite;
        }
        .cmp-sub {
          font-size: 13.5px; color: rgba(255,255,255,0.45);
          max-width: 480px; margin: 0 auto; line-height: 1.6;
        }
        .cmp-scores {
          display: grid; grid-template-columns: repeat(5,1fr);
          gap: 10px; margin-bottom: 24px;
        }
        .cmp-score-card {
          border-radius: 14px; padding: 14px 10px; text-align: center;
          border: 1px solid rgba(6,148,209,0.20);
          background: rgba(8,24,42,0.60);
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.30);
        }
        .cmp-score-card.is-koenig {
          background: linear-gradient(135deg, rgba(6,148,209,0.28) 0%, rgba(8,24,42,0.80) 100%);
          border-color: rgba(6,148,209,0.50);
          box-shadow: 0 4px 20px rgba(6,148,209,0.18);
        }
        .cmp-score-name {
          font-size: 10.5px; font-weight: 700; color: rgba(255,255,255,0.40);
          letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 4px;
        }
        .cmp-score-card.is-koenig .cmp-score-name { color: #3AB6EB; }
        .cmp-score-sub { font-size: 9.5px; color: rgba(255,255,255,0.22); margin-bottom: 8px; }
        .cmp-score-label {
          font-size: 9.5px; font-weight: 600; color: rgba(255,255,255,0.28);
          margin-top: 3px; letter-spacing: 0.04em; text-transform: uppercase;
        }
        .cmp-score-card.is-koenig .cmp-score-label { color: rgba(74,222,128,0.65); }
        .cmp-table-wrap {
          border-radius: 16px; overflow: hidden;
          border: 1px solid rgba(6,148,209,0.20); margin-bottom: 12px;
          background: rgba(8,24,42,0.60);
          backdrop-filter: blur(12px);
        }
        .cmp-table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .cmp-table { width: 100%; min-width: 580px; border-collapse: collapse; font-size: 13px; }
        .cmp-cat-row td {
          background: rgba(6,148,209,0.10);
          border-bottom: 1px solid rgba(6,148,209,0.18);
          padding: 7px 18px;
          font-size: 10.5px; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; color: #3AB6EB;
        }
        .cmp-thead th {
          padding: 11px 12px; text-align: center;
          font-size: 10.5px; font-weight: 700;
          background: rgba(4,12,24,0.85);
          border-bottom: 1px solid rgba(6,148,209,0.15);
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.05em; text-transform: uppercase;
        }
        .cmp-thead th:first-child { text-align: left; padding-left: 18px; width: 28%; color: rgba(255,255,255,0.28); }
        .cmp-thead th.cth-koenig {
          background: #0694D1; color: #fff;
          font-size: 11.5px; font-weight: 800;
          letter-spacing: 0; text-transform: none;
        }
        .cmp-thead th.cth-koenig .cth-sub { display: block; font-size: 9.5px; font-weight: 500; color: rgba(255,255,255,0.7); margin-top: 2px; }
        .cmp-thead th .cth-sub { display: block; font-size: 9.5px; font-weight: 500; color: rgba(255,255,255,0.28); margin-top: 2px; text-transform: none; letter-spacing: 0; }
        .cmp-data-row { border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; }
        .cmp-data-row:last-child { border-bottom: none; }
        .cmp-data-row:hover { background: rgba(6,148,209,0.04); }
        .cmp-data-row td { padding: 10px 12px; text-align: center; vertical-align: middle; background: transparent; }
        .cmp-data-row td:first-child {
          text-align: left; padding-left: 18px;
          font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.72);
        }
        .cmp-data-row td.td-koenig {
          background: rgba(6,148,209,0.08);
          border-left: 2px solid rgba(6,148,209,0.25);
          border-right: 2px solid rgba(6,148,209,0.25);
        }
        .cmp-footnote {
          text-align: center; font-size: 11px;
          color: rgba(255,255,255,0.18); margin-top: 10px;
        }
        @media (max-width: 860px) {
          .cmp-sec { padding: 18px 16px; }
          .cmp-scores { grid-template-columns: repeat(3,1fr); }
        }
        @media (max-width: 768px) {
          .cmp-scores { grid-template-columns: repeat(3,1fr); }
        }
        @media (max-width: 700px) {
          .cmp-sec { padding: 32px 16px; }
          .cmp-title { font-size: 19px; }
        }
        @media (max-width: 600px) {
          .cmp-sec { padding: 28px 16px; }
          .cmp-scores { grid-template-columns: repeat(2,1fr); }
          .cmp-table { font-size: 12px; }
          .cmp-table-wrap { overflow-x: auto; }
          .cmp-table-scroll {
            overflow-x: auto; overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            max-height: 72vh;
            border: 1px solid rgba(6,148,209,0.20);
            border-radius: 16px;
          }
          .cmp-thead th { position: sticky; top: 0; z-index: 10; background: rgba(4,12,24,0.95); }
          .cmp-thead th.cth-koenig { background: #0694D1; }
          .cmp-title { font-size: 18px; }
        }
      `}</style>

      <section className="cmp-sec" id="compare" ref={sectionRef}>
        <div className="cmp-inner">

          {/* Header */}
          <div className="cmp-header animate-on-scroll">
            <div className="cmp-eyebrow">
              <span className="cmp-eyebrow-dot" aria-hidden="true"/>
              The Honest Comparison
            </div>
            <div className="cmp-title">
              How Koenig Stacks Up Against <em>Every Alternative</em>
            </div>
            <p className="cmp-sub">
              Every factor that determines whether you actually pass your Microsoft exam — rated across every training format available.
            </p>
          </div>

          {/* Score cards */}
          <div className="cmp-scores animate-on-scroll" style={{ transitionDelay:"0.1s" }}>
            {CMP_COLS.map(col => {
              const s = SCORES[col.key];
              const chartColor = col.isKoenig ? "#4ade80" : "rgba(100,160,200,0.65)";
              return (
                <div key={col.key} className={`cmp-score-card${col.isKoenig ? " is-koenig" : ""}`}>
                  <div className="cmp-score-name">{col.label}</div>
                  <div className="cmp-score-sub">{col.sub}</div>
                  <div style={{ display:"flex", justifyContent:"center", margin:"12px 0 8px" }}>
                    <ScoreDonutChart score={s} total={SCORE_TOTAL} color={chartColor} />
                  </div>
                  <div className="cmp-score-label">
                    <span style={{ opacity:0.5 }}>/{SCORE_TOTAL}</span> {col.isKoenig ? "criteria ✓" : "criteria"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table */}
          <div className="cmp-table-wrap animate-on-scroll" style={{ transitionDelay:"0.15s" }}>
            <div className="cmp-table-scroll">
              <table className="cmp-table" role="table">
                <thead>
                  <tr className="cmp-thead">
                    <th>Criteria</th>
                    {CMP_COLS.map(col => (
                      <th key={col.key} className={col.isKoenig ? "cth-koenig" : ""}>
                        {col.label}<span className="cth-sub">{col.sub}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {indexedCats.map((cat, ci) => {
                    const visibleRows = cat.rows.filter((r: Record<string, string | number>) => showAll || (r._idx as number) < INITIAL_ROWS);
                    if (visibleRows.length === 0) return null;
                    return (
                      <>
                        <tr key={`cat-${ci}`} className="cmp-cat-row"><td colSpan={6}>{cat.cat}</td></tr>
                        {visibleRows.map((row: Record<string, string | number>, ri: number) => (
                          <tr key={`row-${ci}-${ri}`} className="cmp-data-row">
                            <td>{row.label as string}</td>
                            {CMP_COLS.map(col => (
                              <td key={col.key} className={col.isKoenig ? "td-koenig" : ""}>
                                <CmpCell
                                  value={row[col.key] as string}
                                  isKoenig={col.isKoenig}
                                  sub={col.isKoenig ? row.koenigSub as string : undefined}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {!showAll && hiddenCount > 0 && (
              <div style={{ textAlign:"center", marginTop:20, paddingBottom:20 }}>
                <button
                  onClick={() => setShowAll(true)}
                  style={{
                    display:"inline-flex", alignItems:"center", gap:8,
                    padding:"10px 24px", borderRadius:10,
                    border:"1px solid rgba(6,148,209,0.4)", background:"rgba(6,148,209,0.1)",
                    color:"#0694D1", fontSize:13, fontWeight:700, cursor:"pointer",
                    fontFamily:"inherit", transition:"background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(6,148,209,0.2)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(6,148,209,0.1)")}
                >
                  Show {hiddenCount} more criteria
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
              </div>
            )}
            {showAll && (
              <div style={{ textAlign:"center", marginTop:20, paddingBottom:20 }}>
                <button
                  onClick={() => setShowAll(false)}
                  style={{
                    display:"inline-flex", alignItems:"center", gap:8,
                    padding:"10px 24px", borderRadius:10,
                    border:"1px solid rgba(255,255,255,0.12)", background:"transparent",
                    color:"rgba(255,255,255,0.4)", fontSize:13, fontWeight:600, cursor:"pointer",
                    fontFamily:"inherit", transition:"color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                >
                  Show less
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                </button>
              </div>
            )}
          </div>

          <p className="cmp-footnote">Data sourced from public pricing pages and review platforms. Accurate as of March 2026. Partial = available in select regions only.</p>
        </div>
      </section>
    </>
  );
}

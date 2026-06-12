"use client";
import { useState, useRef } from "react";

const resources = [
  {
    title: "How to Prepare for AZ-104 Certification Exam",
    desc: "Expert tips, study strategies and exam structure insights to pass AZ-104 on your first attempt.",
    href: "https://www.koenig-solutions.com/blog/azure-administrator-certification",
    border: "border-koenig-blue/10",
    badge: "bg-koenig-blue/8 text-koenig-blue",
    badgeLabel: "Guide",
    thumbnail: (
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <defs>
          <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0694D1"/>
            <stop offset="100%" stopColor="#0a1628"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#bg1)"/>
        {/* Grid dots */}
        {[40,80,120,160,200,240,280,320,360].map(x =>
          [30,70,110,150,190].map(y => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="white" opacity="0.12"/>
          ))
        )}
        {/* Clipboard */}
        <rect x="130" y="40" width="90" height="115" rx="8" fill="white" opacity="0.12"/>
        <rect x="155" y="32" width="40" height="16" rx="4" fill="white" opacity="0.25"/>
        {/* Lines on clipboard */}
        <rect x="148" y="68" width="55" height="6" rx="3" fill="white" opacity="0.35"/>
        <rect x="148" y="82" width="40" height="6" rx="3" fill="white" opacity="0.25"/>
        <rect x="148" y="96" width="50" height="6" rx="3" fill="white" opacity="0.25"/>
        <rect x="148" y="110" width="35" height="6" rx="3" fill="white" opacity="0.25"/>
        {/* Check mark */}
        <circle cx="290" cy="100" r="36" fill="#22c55e" opacity="0.18"/>
        <circle cx="290" cy="100" r="26" fill="#22c55e" opacity="0.25"/>
        <polyline points="278,100 287,110 304,90" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        {/* AZ-104 badge */}
        <rect x="16" y="168" width="64" height="22" rx="11" fill="white" opacity="0.18"/>
        <text x="48" y="183" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" opacity="0.9">AZ-104</text>
      </svg>
    ),
  },
  {
    title: "What is a Microsoft Azure Administrator?",
    desc: "Understand the role, responsibilities, salary expectations and career path of an Azure Administrator.",
    href: "https://www.koenig-solutions.com/blog/what-is-microsoft-azure-administrator",
    border: "border-indigo-100",
    badge: "bg-indigo-50 text-indigo-600",
    badgeLabel: "Article",
    thumbnail: (
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <defs>
          <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b5bdb"/>
            <stop offset="100%" stopColor="#1971c2"/>
          </linearGradient>
          <linearGradient id="glow2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#74c0fc" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#4dabf7" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#bg2)"/>
        <circle cx="320" cy="60" r="80" fill="url(#glow2)"/>
        {/* Person silhouette */}
        <circle cx="175" cy="72" r="28" fill="white" opacity="0.15"/>
        <path d="M130 155 Q175 120 220 155" fill="white" opacity="0.15"/>
        <circle cx="175" cy="72" r="20" fill="white" opacity="0.2"/>
        <path d="M138 155 Q175 125 212 155 L212 165 L138 165 Z" fill="white" opacity="0.2"/>
        {/* Azure cloud icon */}
        <circle cx="295" cy="90" r="40" fill="white" opacity="0.08"/>
        <path d="M270,105 Q268,88 282,84 Q284,72 298,72 Q312,72 316,84 Q328,82 330,95 Q332,108 318,108 L278,108 Q268,108 270,105 Z" fill="white" opacity="0.3"/>
        {/* Connection lines */}
        <line x1="220" y1="100" x2="255" y2="95" stroke="white" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3"/>
        {/* Tag/badge */}
        <rect x="16" y="168" width="88" height="22" rx="11" fill="white" opacity="0.18"/>
        <text x="60" y="183" textAnchor="middle" fill="white" fontSize="9.5" fontWeight="bold" opacity="0.9">Administrator</text>
      </svg>
    ),
  },
  {
    title: "Azure Administrator Roles & Responsibilities",
    desc: "A detailed breakdown of day-to-day tasks, required skills and tools used by Azure Administrators on the job.",
    href: "https://www.koenig-solutions.com/blog/microsoft-azure-administrator-roles-and-responsibilities",
    border: "border-teal-100",
    badge: "bg-teal-50 text-teal-600",
    badgeLabel: "Article",
    thumbnail: (
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <defs>
          <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a1628"/>
            <stop offset="100%" stopColor="#0d3349"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#bg3)"/>
        {/* Radial glow */}
        <circle cx="220" cy="100" r="90" fill="#0694D1" opacity="0.08"/>
        <circle cx="220" cy="100" r="55" fill="#0694D1" opacity="0.07"/>
        {/* Central cloud */}
        <path d="M190,108 Q188,92 202,87 Q204,74 218,74 Q232,74 236,87 Q248,84 250,98 Q252,112 238,112 L198,112 Q188,112 190,108 Z" fill="none" stroke="#0694D1" strokeWidth="2" opacity="0.8"/>
        <path d="M190,108 Q188,92 202,87 Q204,74 218,74 Q232,74 236,87 Q248,84 250,98 Q252,112 238,112 L198,112 Q188,112 190,108 Z" fill="#0694D1" opacity="0.15"/>
        {/* Rays */}
        {[0,45,90,135,180,225,270,315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 220 + Math.cos(rad) * 62;
          const y1 = 100 + Math.sin(rad) * 62;
          const x2 = 220 + Math.cos(rad) * 85;
          const y2 = 100 + Math.sin(rad) * 85;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4DBFEF" strokeWidth="1.5" opacity="0.35"/>;
        })}
        {/* Orbit dots */}
        {[0,60,120,180,240,300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 220 + Math.cos(rad) * 88;
          const cy = 100 + Math.sin(rad) * 88;
          return <circle key={i} cx={cx} cy={cy} r="4" fill="#4DBFEF" opacity="0.6"/>;
        })}
        {/* Laptop outline */}
        <rect x="290" y="118" width="70" height="46" rx="4" fill="none" stroke="#4DBFEF" strokeWidth="1.5" opacity="0.4"/>
        <rect x="294" y="122" width="62" height="34" rx="2" fill="#0694D1" opacity="0.12"/>
        <rect x="282" y="164" width="86" height="6" rx="3" fill="none" stroke="#4DBFEF" strokeWidth="1.5" opacity="0.35"/>
        {/* Badge */}
        <rect x="16" y="168" width="80" height="22" rx="11" fill="#0694D1" opacity="0.35"/>
        <text x="56" y="183" textAnchor="middle" fill="#4DBFEF" fontSize="9.5" fontWeight="bold" opacity="0.9">Azure Admin</text>
      </svg>
    ),
  },
];

function ResourceCard({ r }: { r: typeof resources[number] }) {
  return (
    <a
      href={r.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col overflow-hidden rounded-2xl border ${r.border} bg-white shadow-sm transition-all hover:shadow-[0_8px_28px_rgba(6,148,209,0.10)] hover:-translate-y-0.5`}
    >
      <div className="overflow-hidden rounded-t-2xl">{r.thumbnail}</div>
      <div className="flex flex-1 flex-col p-5">
        <span className={`mb-3 self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${r.badge}`}>
          {r.badgeLabel}
        </span>
        <h3 className="mb-2 text-sm font-bold leading-snug text-koenig-dark group-hover:text-koenig-blue transition-colors">
          {r.title}
        </h3>
        <p className="mb-5 flex-1 text-xs leading-relaxed text-koenig-gray">{r.desc}</p>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-koenig-blue">
          {r.badgeLabel === "Guide" ? "Read Guide" : "Read Article"}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
            <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </a>
  );
}

export function CourseResources() {
  const [page, setPage] = useState(0);
  const touchX = useRef(0);
  const total = resources.length;

  return (
    <section className="relative overflow-hidden border-t border-koenig-border bg-[#f4f8fc] px-[15px] sm:px-6 py-[15px] sm:py-10">
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(6,148,209,0.09) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(77,191,239,0.07) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-2xl font-bold text-koenig-dark">
            <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Resources</span>
          </h2>
          <p className="text-sm text-koenig-muted">Learn more about AZ-104 before you enroll</p>
        </div>

        {/* Mobile: single card + swipe + arrows */}
        <div
          className="sm:hidden"
          onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            const delta = touchX.current - e.changedTouches[0].clientX;
            if (Math.abs(delta) > 50) {
              if (delta > 0) setPage(p => Math.min(total - 1, p + 1));
              else setPage(p => Math.max(0, p - 1));
            }
          }}
        >
          <ResourceCard r={resources[page]} />

          {/* Arrows + dots */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-koenig-blue/20 bg-white text-koenig-blue shadow-sm transition hover:bg-koenig-blue hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`rounded-full transition-all ${i === page ? "h-2 w-5 bg-koenig-blue" : "h-2 w-2 bg-koenig-blue/25 hover:bg-koenig-blue/50"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setPage(p => Math.min(total - 1, p + 1))}
              disabled={page === total - 1}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-koenig-blue/20 bg-white text-koenig-blue shadow-sm transition hover:bg-koenig-blue hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden sm:grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map(r => <ResourceCard key={r.href} r={r} />)}
        </div>
      </div>
    </section>
  );
}

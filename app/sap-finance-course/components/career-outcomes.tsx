"use client";

import { useState, useRef } from "react";

const jobRoles = ["Azure Administrator", "Cloud Engineer", "Systems Administrator", "DevOps Engineer", "Infrastructure Engineer", "Cloud Consultant"];
const companies = ["Microsoft", "Amazon", "Deloitte", "Accenture", "Wipro", "Infosys", "TCS", "Capgemini", "IBM", "Google"];

function PagedCards<T>({ items, page, setPage, renderCard, desktopCols = 3 }: {
  items: T[];
  page: number;
  setPage: (p: number) => void;
  renderCard: (item: T, idx: number) => React.ReactNode;
  desktopCols?: number;
}) {
  const totalPages = items.length;
  const touchX = useRef(0);
  const colClass = desktopCols === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <>
      <div className={`hidden md:grid gap-5 ${colClass}`}>
        {items.map((item, idx) => renderCard(item, idx))}
      </div>

      <div
        className="md:hidden"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const delta = touchX.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 50) {
            if (delta > 0) setPage(Math.min(totalPages - 1, page + 1));
            else setPage(Math.max(0, page - 1));
          }
        }}
      >
        <div className="grid gap-5 grid-cols-1">
          {renderCard(items[page], page)}
        </div>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-koenig-blue/20 bg-white text-koenig-blue shadow-sm transition hover:bg-koenig-blue hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`rounded-full transition-all ${i === page ? "h-2 w-5 bg-koenig-blue" : "h-2 w-2 bg-koenig-blue/25 hover:bg-koenig-blue/50"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-koenig-blue/20 bg-white text-koenig-blue shadow-sm transition hover:bg-koenig-blue hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}

export function CareerOutcomesSection() {
  const [page, setPage] = useState(0);

  const cards: React.ReactNode[] = [
    /* Salary */
    <div key="salary" className="relative overflow-hidden rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-green-400/60 via-emerald-400/80 to-green-400/30" />
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 text-white shadow-md shadow-green-500/25">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      </div>
      <h3 className="mb-1 text-sm font-bold text-koenig-dark">Salary Impact</h3>
      <div className="mb-2 text-3xl font-bold text-green-600">+26%</div>
      <p className="mb-4 text-xs leading-relaxed text-koenig-gray">Average salary increase reported after obtaining the AZ-104 certification</p>
      <div className="rounded-xl bg-green-50/60 px-4 py-3 ring-1 ring-green-100">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-green-700/70">Typical Salary Range</div>
        <div className="mt-0.5 text-sm font-bold text-green-700">$95,000 &mdash; $145,000</div>
      </div>
    </div>,

    /* Job Roles */
    <div key="job-roles" className="relative overflow-hidden rounded-2xl border border-koenig-blue/10 bg-white p-6 shadow-sm">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-koenig-blue/60 via-cyan-400/80 to-koenig-blue/30" />
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-koenig-blue to-cyan-500 text-white shadow-md shadow-koenig-blue/25">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      </div>
      <h3 className="mb-3 text-sm font-bold text-koenig-dark">Job Roles</h3>
      <ul className="space-y-2">
        {jobRoles.map((role) => (
          <li key={role} className="flex items-center gap-2.5 text-xs text-koenig-gray">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-koenig-blue/10 text-koenig-blue">
              <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            {role}
          </li>
        ))}
      </ul>
    </div>,

    /* Companies Hiring */
    <div key="companies" className="relative overflow-hidden rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400/60 via-sky-400/80 to-cyan-400/30" />
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-400 text-white shadow-md shadow-cyan-500/25">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </div>
      <h3 className="mb-3 text-sm font-bold text-koenig-dark">Companies Hiring</h3>
      <div className="flex flex-wrap gap-1.5">
        {companies.map((company) => (
          <span key={company} className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-800">
            {company}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-koenig-muted">
        and 5,000+ organizations worldwide seeking AZ-104 certified professionals
      </p>
    </div>,
  ];

  return (
    <section className="relative overflow-hidden border-t border-koenig-border bg-[#f4f8fc] px-6 py-10">
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(6,148,209,0.09) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(77,191,239,0.07) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-koenig-blue/15 bg-white px-4 py-1.5 text-xs font-semibold text-koenig-blue shadow-sm">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
            </svg>
            Career Outcomes
          </div>
          <h2 className="text-xl font-bold text-koenig-dark">What AZ-104 Opens Up For You</h2>
          <p className="text-sm text-koenig-muted">What AZ-104 certified professionals can expect based on industry data</p>
        </div>

        {/* Hero stat banner */}
        <div className="relative overflow-hidden rounded-2xl p-8 text-center mb-5" style={{ background: "radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 55%, #040C18 100%)" }}>
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(6,148,209,0.25) 0%, transparent 70%)" }} />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full" style={{ background: "radial-gradient(circle, rgba(77,191,239,0.15) 0%, transparent 70%)" }} />
          <div className="relative">
            <div className="mb-1 bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-5xl font-bold text-transparent">86%</div>
            <p className="text-sm text-white/70">of AZ-104 certified professionals report career advancement within 6 months</p>
          </div>
        </div>

        <PagedCards
          items={cards}
          page={page}
          setPage={setPage}
          desktopCols={3}
          renderCard={(card) => card}
        />
      </div>
    </section>
  );
}

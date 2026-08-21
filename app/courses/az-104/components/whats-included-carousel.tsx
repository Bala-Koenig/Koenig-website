"use client";

import { useState, useRef } from "react";

const items = [
  {
    item: "Official Microsoft Courseware",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  },
  {
    item: "Hands-On Lab Environment (30 days)",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg>,
  },
  {
    item: "Exam Preparation Materials",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
  {
    item: "Practice Test Questions (200+)",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  },
  {
    item: "Certificate of Completion",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  },
  {
    item: "Post-Training Support (30 days)",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    item: "Session Recording Access",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  },
  {
    item: "Free Rescheduling (7+ days notice)",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  },
];

const PER_PAGE = 2;

function Card({ item, icon }: { item: string; icon: React.ReactNode }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-koenig-blue/10 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-koenig-blue/25 hover:shadow-[0_8px_28px_rgba(6,148,209,0.12)] flex items-center gap-3">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-koenig-blue/60 via-cyan-400/80 to-koenig-blue/40 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-koenig-blue/10 text-koenig-blue">
        {icon}
      </div>
      <p className="text-sm font-semibold leading-snug text-koenig-dark">{item}</p>
    </div>
  );
}

export function WhatsIncludedCarousel() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(items.length / PER_PAGE);
  const touchX = useRef(0);
  const pageItems = items.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <>
      {/* Desktop: all cards in a 4-col grid, no slider */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {items.map(({ item, icon }) => (
          <Card key={item} item={item} icon={icon} />
        ))}
      </div>

      {/* Mobile: 2 cards per slide */}
      <div
        className="md:hidden"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const delta = touchX.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 50) {
            if (delta > 0) setPage((p) => Math.min(totalPages - 1, p + 1));
            else setPage((p) => Math.max(0, p - 1));
          }
        }}
      >
        <div className="grid gap-3 grid-cols-1">
          {pageItems.map(({ item, icon }) => (
            <Card key={item} item={item} icon={icon} />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
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
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
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

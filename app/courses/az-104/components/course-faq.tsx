"use client";

import { useState } from "react";

interface Faq {
  q: string;
  a: string;
}

interface CourseFaqProps {
  faqs: Faq[];
  subtitle?: string;
}

function FaqItem({
  faq,
  idx,
  openFaq,
  setOpenFaq,
}: {
  faq: Faq;
  idx: number;
  openFaq: number | null;
  setOpenFaq: (v: number | null) => void;
}) {
  const isOpen = openFaq === idx;
  return (
    <div
      className="rounded-xl border bg-white"
      style={{
        borderColor: isOpen ? "#0694d1" : "#CAEFFF",
        boxShadow: isOpen ? "0 4px 16px rgba(6,148,209,0.10)" : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <button
        onClick={() => setOpenFaq(isOpen ? null : idx)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 sm:px-5 sm:py-4 text-left"
      >
        <span
          className="text-sm sm:text-base font-normal leading-snug"
          style={{ color: isOpen ? "#0694d1" : "#22262a", transition: "color 0.3s" }}
        >
          {faq.q}
        </span>
        <span
          className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full"
          style={{
            background: isOpen ? "linear-gradient(135deg,#0694d1,#076d9d)" : "#EBF8FE",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "white" : "#0694d1"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p className="border-t border-[#EBF8FE] px-3 py-2.5 sm:px-5 sm:py-4 text-sm sm:text-[15px] leading-relaxed text-koenig-muted">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CourseFaq({ faqs, subtitle = "Everything you need to know about the AZ-104 training course" }: CourseFaqProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [visibleCount, setVisibleCount] = useState(5);

  const left = faqs.filter((_, i) => i % 2 === 0);
  const right = faqs.filter((_, i) => i % 2 !== 0);
  const mobileFaqs = faqs.slice(0, visibleCount);
  const hasMore = visibleCount < faqs.length;

  return (
    <section id="faqs" className="relative overflow-hidden bg-koenig-light px-[15px] sm:px-6 py-[15px] sm:py-10">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(6,148,209,0.19) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full" style={{ background: "radial-gradient(circle, rgba(77,191,239,0.20) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(0,180,216,0.15) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-koenig-dark">
            Frequently <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Asked Questions</span>
          </h2>
          <p className="text-base text-koenig-muted">{subtitle}</p>
        </div>

        {/* Mobile: single column, paginated in sets of 5 */}
        <div className="flex flex-col gap-1.5 md:hidden">
          {mobileFaqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} idx={i} openFaq={openFaq} setOpenFaq={setOpenFaq} />
          ))}
          {hasMore ? (
            <button
              onClick={() => setVisibleCount(v => v + 5)}
              className="flex items-center justify-center gap-1.5 w-full mt-2 text-sm font-semibold text-koenig-blue hover:text-koenig-navy transition underline underline-offset-4"
            >
              View More FAQ
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="7 13 12 18 17 13"/>
                <polyline points="7 7 12 12 17 7"/>
              </svg>
            </button>
          ) : visibleCount > 5 && (
            <button
              onClick={() => setVisibleCount(5)}
              className="flex items-center justify-center gap-1.5 w-full mt-2 text-sm font-semibold text-koenig-blue hover:text-koenig-navy transition underline underline-offset-4"
            >
              View Less FAQ
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="7 11 12 6 17 11"/>
                <polyline points="7 17 12 12 17 17"/>
              </svg>
            </button>
          )}
        </div>

        {/* Desktop: 2-column accordion */}
        <div className="hidden md:flex gap-3 md:items-start">
          <div className="flex flex-1 flex-col gap-3">
            {left.map((faq, j) => (
              <FaqItem key={j * 2} faq={faq} idx={j * 2} openFaq={openFaq} setOpenFaq={setOpenFaq} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {right.map((faq, j) => (
              <FaqItem key={j * 2 + 1} faq={faq} idx={j * 2 + 1} openFaq={openFaq} setOpenFaq={setOpenFaq} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="mb-3 text-sm text-koenig-muted">Still have questions?</p>
          <button className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-sm font-bold text-[#076D9D] transition-all hover:bg-[#076D9D] hover:text-white">
            Chat with a Training Advisor
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1"
              style={{ background: "rgba(7,109,157,0.12)" }}
            >
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

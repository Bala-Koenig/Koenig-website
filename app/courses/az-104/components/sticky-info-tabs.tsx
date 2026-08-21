"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ReadMore } from "./read-more";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface Review {
  name: string;
  role: string;
  company: string;
  stars: number;
  text: string;
  date: string;
}

interface RatingRow {
  stars: number;
  pct: number;
}

interface StickyInfoTabsProps {
  reviews?: Review[];
  ratingDistribution?: RatingRow[];
  reviewCount?: number;
}

/* ------------------------------------------------------------------ */
/*  Tab config                                                          */
/* ------------------------------------------------------------------ */

const TABS = [
  {
    id: "lab",
    label: "Hands-On Lab",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
      </svg>
    ),
  },
  {
    id: "career",
    label: "Career Outcomes",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    id: "instructor",
    label: "Meet Your Instructor",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ------------------------------------------------------------------ */
/*  Career Outcomes data                                                */
/* ------------------------------------------------------------------ */

const jobRoles = ["Azure Administrator", "Cloud Engineer", "Systems Administrator", "DevOps Engineer", "Infrastructure Engineer", "Cloud Consultant"];
const companies = ["Microsoft", "Amazon", "Deloitte", "Accenture", "Wipro", "Infosys", "TCS", "Capgemini", "IBM", "Google"];

/* ------------------------------------------------------------------ */
/*  Hands-On Lab data                                                   */
/* ------------------------------------------------------------------ */

const labFeatures = [
  {
    title: "Live Azure Sandbox",
    desc: "Practice in a real Azure subscription with full access to services covered in the course.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    ),
    stat: "Real Azure",
    bubble: "bg-koenig-blue/10 text-koenig-blue",
    accent: "from-koenig-blue/50 via-cyan-400/60 to-koenig-blue/30",
    border: "border-koenig-blue/10",
    badge: "bg-koenig-blue/8 text-koenig-blue",
  },
  {
    title: "30+ Guided Labs",
    desc: "Step-by-step lab exercises designed to reinforce each module with practical, hands-on tasks.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    stat: "30+",
    bubble: "bg-indigo-50 text-indigo-600",
    accent: "from-indigo-400/50 via-blue-400/60 to-indigo-400/30",
    border: "border-indigo-100",
    badge: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Lab Manual Included",
    desc: "Comprehensive lab guide with detailed instructions, screenshots, and troubleshooting tips.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    stat: "Full Guide",
    bubble: "bg-teal-50 text-teal-600",
    accent: "from-teal-400/50 via-cyan-400/60 to-teal-400/30",
    border: "border-teal-100",
    badge: "bg-teal-50 text-teal-600",
  },
  {
    title: "Post-Training Access",
    desc: "30 days of extended lab access after your training ends so you can continue practicing.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    stat: "30 Days",
    bubble: "bg-sky-50 text-sky-600",
    accent: "from-sky-400/50 via-cyan-400/60 to-sky-400/30",
    border: "border-sky-100",
    badge: "bg-sky-50 text-sky-600",
  },
];

/* ------------------------------------------------------------------ */
/*  Mobile paged cards helper                                           */
/* ------------------------------------------------------------------ */

function PagedCards<T>({ items, page, setPage, renderCard, cols = "md:grid-cols-2" }: {
  items: T[];
  page: number;
  setPage: (p: number) => void;
  renderCard: (item: T, idx: number) => React.ReactNode;
  cols?: string;
}) {
  const totalPages = items.length;
  const touchX = useRef(0);
  return (
    <>
      <div className={`hidden md:grid gap-5 ${cols}`}>
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
        <div className="grid gap-5">{renderCard(items[page], page)}</div>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-koenig-blue/20 bg-white text-koenig-blue shadow-sm transition hover:bg-koenig-blue hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)}
                className={`rounded-full transition-all ${i === page ? "h-2 w-5 bg-koenig-blue" : "h-2 w-2 bg-koenig-blue/25 hover:bg-koenig-blue/50"}`} />
            ))}
          </div>
          <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page === totalPages - 1}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-koenig-blue/20 bg-white text-koenig-blue shadow-sm transition hover:bg-koenig-blue hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

interface SalaryTier { level: string; range: string }
interface SalaryData { increase: string; regionLabel: string; tiers: SalaryTier[]; source: string }

const SALARY: Record<string, SalaryData> = {
  IN: {
    increase: "+35%",
    regionLabel: "Typical Salary Range (India)",
    tiers: [
      { level: "Entry",  range: "₹6–10 LPA"  },
      { level: "Mid",    range: "₹12–22 LPA" },
      { level: "Senior", range: "₹22–40 LPA" },
    ],
    source: "Glassdoor / LinkedIn 2025",
  },
  default: {
    increase: "+26%",
    regionLabel: "Typical Salary Range (Global)",
    tiers: [
      { level: "Entry",  range: "$75,000–$95,000"   },
      { level: "Mid",    range: "$95,000–$120,000"  },
      { level: "Senior", range: "$120,000–$145,000" },
    ],
    source: "Glassdoor / LinkedIn 2025",
  },
};

export function StickyInfoTabs(_props: StickyInfoTabsProps = {}) {
  const [active, setActive] = useState<TabId>("lab");
  const [labPage, setLabPage] = useState(0);
  const [careerPage, setCareerPage] = useState(0);
  const [country, setCountry] = useState<string>("default");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => { if (d?.country_code) setCountry(d.country_code); })
      .catch(() => {});
  }, []);
  const sectionRefs = useRef<Record<TabId, HTMLDivElement | null>>({
    career: null,
    lab: null,
    instructor: null,
  });
  const tabBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /* Scroll active mobile tab into view when it changes */
  useEffect(() => {
    tabBtnRefs.current[active]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  /* Scroll-spy via IntersectionObserver */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    (Object.entries(sectionRefs.current) as [TabId, HTMLDivElement | null][]).forEach(([id, el]) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id: TabId) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }, []);

  const salary = SALARY[country] ?? SALARY.default;

  const careerCards: React.ReactNode[] = [
    /* Salary */
    <div key="salary" className="relative overflow-hidden rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-green-400/60 via-emerald-400/80 to-green-400/30" />
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <h3 className="text-sm font-bold text-koenig-dark">Salary Impact</h3>
          <div className="text-2xl font-bold text-green-600">{salary.increase}</div>
        </div>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-koenig-gray">Average salary increase reported after obtaining the AZ-104 certification</p>
      <div className="rounded-xl bg-green-50/60 px-4 py-3 ring-1 ring-green-100">
        <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-wide text-green-700/70">{salary.regionLabel}</div>
        <div className="space-y-2">
          {salary.tiers.map((tier) => (
            <div key={tier.level} className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-green-700/70 w-12">{tier.level}</span>
              <div className="flex-1 mx-3 h-px bg-green-200/60" />
              <span className="text-xs font-bold text-green-700">{tier.range}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-green-600/60">*Source: {salary.source}</p>
      </div>
    </div>,

    /* Job Roles */
    <div key="job-roles" className="relative overflow-hidden rounded-2xl border border-koenig-blue/10 bg-white p-6 shadow-sm">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-koenig-blue/60 via-cyan-400/80 to-koenig-blue/30" />
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-koenig-blue/10 text-koenig-blue">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <h3 className="text-sm font-bold text-koenig-dark">Job Roles</h3>
          <span className="text-2xl font-bold text-koenig-blue">{jobRoles.length}</span>
        </div>
      </div>
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
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <h3 className="text-sm font-bold text-koenig-dark">Companies Hiring</h3>
          <span className="text-2xl font-bold text-cyan-600">5,000+</span>
        </div>
      </div>
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
    <div className="border-t border-koenig-border bg-white">
      {/* ── Mobile horizontal tab bar — hidden on mobile ── */}

      <div className="mx-auto max-w-7xl px-[15px] sm:px-6 py-[15px] sm:py-10">
        <div className="flex gap-10 lg:items-start">

          {/* ── Sticky left tab rail ── */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start">
            <div className="overflow-hidden rounded-2xl border border-koenig-blue/15 bg-white shadow-[0_8px_32px_rgba(6,148,209,0.18),0_2px_8px_rgba(6,148,209,0.10)]">
              <div className="h-[3px] bg-gradient-to-r from-koenig-blue via-cyan-400 to-koenig-blue/40" />

              <nav className="p-2">
                {TABS.map((tab) => {
                  const isActive = active === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => scrollTo(tab.id)}
                      className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-koenig-blue/10 to-cyan-400/5 text-koenig-blue"
                          : "text-koenig-muted hover:bg-koenig-light hover:text-koenig-dark"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-koenig-blue to-cyan-400" />
                      )}
                      <span className={`flex-shrink-0 transition-colors ${isActive ? "text-koenig-blue" : "text-koenig-muted group-hover:text-koenig-dark"}`}>
                        {tab.icon}
                      </span>
                      <span className="leading-snug">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 border-t border-koenig-border/50 py-3">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollTo(tab.id)}
                    className={`rounded-full transition-all duration-300 ${
                      active === tab.id
                        ? "h-2 w-6 bg-gradient-to-r from-koenig-blue to-cyan-400"
                        : "h-2 w-2 bg-koenig-border hover:bg-koenig-muted"
                    }`}
                    title={tab.label}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* ── Scrollable content ── */}
          <div className="min-w-0 flex-1 space-y-5 sm:space-y-20">

            {/* ── Section 1: Hands-On Lab ── */}
            <div ref={(el) => { sectionRefs.current.lab = el; }} id="tab-lab">
              <h2 className="mb-6 text-2xl font-bold text-koenig-dark">
                Hands-On{" "}
                <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">
                  Lab
                </span>
              </h2>

              <PagedCards
                items={labFeatures}
                page={labPage}
                setPage={setLabPage}
                cols="md:grid-cols-2"
                renderCard={(f) => (
                  <div
                    key={f.title}
                    className={`group relative overflow-hidden rounded-2xl border ${f.border} bg-white p-6 shadow-sm transition-all hover:shadow-[0_8px_28px_rgba(6,148,209,0.10)] hover:-translate-y-0.5`}
                  >
                    <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${f.accent}`} />
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${f.bubble}`}>
                        {f.icon}
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-3">
                          <h3 className="text-sm font-bold text-koenig-dark">{f.title}</h3>
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${f.badge}`}>
                            {f.stat}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed text-koenig-gray">{f.desc}</p>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>

            {/* ── Section 2: Career Outcomes ── */}
            <div ref={(el) => { sectionRefs.current.career = el; }} id="tab-career">
              <h2 className="mb-6 text-2xl font-bold text-koenig-dark">
                Career{" "}
                <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">
                  Outcomes
                </span>
              </h2>

              <div className="space-y-5">
                {/* Hero stat banner */}
                <div className="relative overflow-hidden rounded-2xl p-8 text-center" style={{ background: "radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 55%, #040C18 100%)" }}>
                  <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(6,148,209,0.25) 0%, transparent 70%)" }} />
                  <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full" style={{ background: "radial-gradient(circle, rgba(77,191,239,0.15) 0%, transparent 70%)" }} />
                  <div className="relative">
                    <div className="mb-1 bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-5xl font-bold text-transparent">86%</div>
                    <p className="text-sm text-white/70">of AZ-104 certified professionals report career advancement within 6 months</p>
                  </div>
                </div>

                <PagedCards
                  items={careerCards}
                  page={careerPage}
                  setPage={setCareerPage}
                  cols="md:grid-cols-3"
                  renderCard={(card) => card}
                />
              </div>
            </div>

            {/* ── Section 3: Instructor ── */}
            <div ref={(el) => { sectionRefs.current.instructor = el; }} id="tab-instructor">
              <h2 className="mb-6 text-2xl font-bold text-koenig-dark">
                Meet Your{" "}
                <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">
                  Instructor
                </span>
              </h2>

              <div className="overflow-hidden rounded-2xl border border-koenig-blue/10 bg-white shadow-[0_4px_24px_rgba(6,148,209,0.07)]">
                <div className="h-[2px] bg-gradient-to-r from-koenig-blue/60 via-cyan-400/80 to-koenig-blue/40" />

                <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-3">
                  {/* Photo + Name */}
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-koenig-blue/10 to-cyan-400/10 text-4xl ring-4 ring-koenig-blue/10">
                      &#128100;
                    </div>
                    <h3 className="text-lg font-bold text-koenig-dark">Rajesh Kumar</h3>
                    <p className="mt-1 text-xs text-koenig-muted">
                      Microsoft Certified Trainer (MCT) | Azure Solutions Architect Expert
                    </p>

                    <div className="mt-5 grid w-full grid-cols-3 gap-2">
                      {[
                        { value: "12+", label: "Years Exp." },
                        { value: "5,000+", label: "Students" },
                        { value: "4.9", label: "Avg Rating" },
                      ].map((s) => (
                        <div key={s.label} className="rounded-xl bg-gradient-to-br from-koenig-light to-white p-2.5 ring-1 ring-koenig-blue/10">
                          <div className="text-sm font-bold text-koenig-blue">{s.value}</div>
                          <div className="text-[9px] text-koenig-muted">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-2">
                    <ReadMore lines={6}>
                    <p className="mb-4 text-sm leading-relaxed text-koenig-gray">
                      Rajesh is a seasoned cloud architect and Microsoft Certified Trainer with over 12 years of
                      experience helping organizations migrate to and optimize their Azure environments. He has
                      trained over 5,000 IT professionals across 30+ countries and is known for his practical,
                      real-world approach to teaching complex cloud concepts.
                    </p>
                    <p className="mb-2 text-sm leading-relaxed text-koenig-gray">
                      His training sessions combine theoretical foundations with hands-on labs, ensuring that
                      participants not only understand Azure services but can confidently implement and manage
                      them in production environments. Rajesh regularly contributes to the Azure community
                      through blogs, webinars, and speaking engagements at technology conferences.
                    </p>
                    </ReadMore>

                    <h4 className="mb-3 mt-3 text-xs font-bold uppercase tracking-widest text-koenig-muted/70">
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["AZ-305", "AZ-104", "AZ-900", "MS-900"].map((cert) => (
                        <span
                          key={cert}
                          className="rounded-full border border-koenig-blue/20 bg-koenig-blue/5 px-4 py-1.5 text-xs font-bold text-koenig-blue"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

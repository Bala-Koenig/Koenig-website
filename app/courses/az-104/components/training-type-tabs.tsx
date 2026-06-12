"use client";

import { useState } from "react";
import { CourseScheduler } from "./course-scheduler";

/* ── bullet icon (matching koenig style) ── */
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-koenig-dark">
      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-koenig-blue" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

/* ── Flexi pricing option row ── */
function FlexiOption({
  label, price, icon, selected, onSelect,
}: { label: string; price: string; icon: React.ReactNode; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`flex w-full max-w-sm items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
        selected
          ? "border-koenig-blue bg-koenig-blue/5 ring-1 ring-koenig-blue/30"
          : "border-koenig-border bg-white hover:border-koenig-blue/40"
      }`}
    >
      <div className="flex items-center gap-3">
        {selected ? (
          <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-koenig-blue bg-koenig-blue">
            <div className="h-2 w-2 rounded-full bg-white" />
          </div>
        ) : (
          <div className="h-5 w-5 rounded-full border-2 border-koenig-border" />
        )}
        <span className={`flex items-center gap-2 text-sm font-medium ${selected ? "text-koenig-blue" : "text-koenig-dark"}`}>
          {icon}{label}
        </span>
      </div>
      <span className={`text-sm font-semibold ${selected ? "text-koenig-blue" : "text-koenig-dark"}`}>{price}</span>
    </button>
  );
}

export function TrainingTypeTabs() {
  const [tab, setTab] = useState<"public" | "oneOnOne" | "flexi">("public");
  const [flexiOption, setFlexiOption] = useState<"video" | "exam" | "labs">("video");

  const tabs = [
    { key: "oneOnOne" as const, label: "1-on-1" },
    { key: "public"  as const, label: "Public" },
    { key: "flexi"   as const, label: <span>Flexi <span className="text-xs font-normal opacity-75">(Self Paced)</span></span> },
  ];

  return (
    <section id="schedule" className="px-4 py-10 lg:px-[50px]">
      {/* Tab switcher */}
      <div className="mb-8 flex justify-center gap-3 flex-wrap">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-full border px-7 py-2.5 text-sm font-semibold transition-all ${
              tab === key
                ? "border-koenig-blue bg-koenig-blue text-white shadow-sm"
                : "border-koenig-border bg-white text-koenig-dark hover:border-koenig-blue hover:text-koenig-blue"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── PUBLIC ── */}
      {tab === "public" && (
        <>
          <ul className="mb-6 space-y-2 px-2">
            <Bullet>Live Training (Duration : 32 Hours)</Bullet>
            <Bullet>Per Participant</Bullet>
            <Bullet>
              We can also offer this course in{" "}
              <span className="text-koenig-blue font-medium">Arabic</span>,{" "}
              <span className="text-koenig-blue font-medium">Japanese</span>,{" "}
              <span className="text-koenig-blue font-medium">Polish</span>, and{" "}
              <span className="text-koenig-blue font-medium">Spanish</span>.
            </Bullet>
            <Bullet>Classroom Training fee on request</Bullet>
          </ul>
          <CourseScheduler />
        </>
      )}

      {/* ── 1-ON-1 ── */}
      {tab === "oneOnOne" && (
        <div className="mx-auto max-w-2xl">
          <ul className="mb-6 space-y-2 px-2">
            <Bullet>Live Training (Duration : 32 Hours)</Bullet>
            <Bullet>Per Participant</Bullet>
            <Bullet>
              We can also offer this course in{" "}
              <span className="text-koenig-blue font-medium">Arabic</span>,{" "}
              <span className="text-koenig-blue font-medium">Japanese</span>,{" "}
              <span className="text-koenig-blue font-medium">Polish</span>, and{" "}
              <span className="text-koenig-blue font-medium">Spanish</span>.
            </Bullet>
            <Bullet>Guaranteed-to-Run (GTR)</Bullet>
            <Bullet>Classroom Training fee on request</Bullet>
          </ul>

          {/* Hours + Days filters */}
          <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-3 rounded-xl border border-koenig-border bg-white p-5">
            {/* Hours */}
            <div className="space-y-2">
              {(["4 Hours", "8 Hours"] as const).map((h) => (
                <label key={h} className="flex cursor-pointer items-center gap-2.5 text-sm text-koenig-dark">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-koenig-blue">
                    {h === "8 Hours" && <div className="h-2 w-2 rounded-full bg-koenig-blue" />}
                  </div>
                  {h}
                </label>
              ))}
            </div>
            {/* Days */}
            <div className="space-y-2">
              {(["Week Days", "Weekends"] as const).map((d) => (
                <label key={d} className={`flex cursor-pointer items-center gap-2.5 text-sm ${d === "Week Days" ? "text-koenig-blue font-semibold" : "text-koenig-dark"}`}>
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-koenig-blue">
                    {d === "Week Days" && <div className="h-2 w-2 rounded-full bg-koenig-blue" />}
                  </div>
                  {d}
                </label>
              ))}
            </div>
          </div>

          {/* Date + Time pickers */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2.5 rounded-full border border-koenig-border bg-white px-5 py-2.5 text-sm font-medium text-koenig-dark hover:border-koenig-blue transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Select Date
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <button className="flex items-center gap-2.5 rounded-full border border-koenig-border bg-white px-5 py-2.5 text-sm font-medium text-koenig-dark hover:border-koenig-blue transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              09:00 AM
              <span className="mx-1 text-koenig-muted">·</span>
              IST (India)
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
          </div>

          <p className="mt-5 text-xs text-koenig-muted">† Excluding VAT/GST</p>
        </div>
      )}

      {/* ── FLEXI ── */}
      {tab === "flexi" && (
        <div className="mx-auto max-w-2xl">
          <ul className="mb-6 space-y-2 px-2">
            <Bullet>You will get access to Flexi within 30 minutes.</Bullet>
            <Bullet>Access to Microsoft content via Microsoft learn.</Bullet>
            <Bullet>Access to hands-on labs (Optional)</Bullet>
            <Bullet>Enjoy offline learning on your mobile.</Bullet>
            <Bullet>6 Hrs free consultation with MCT.</Bullet>
            <Bullet>6 months video access (extendable on request).</Bullet>
            <Bullet>Access to exam prep software (Qubits).</Bullet>
            <Bullet>Certificate of Completion.</Bullet>
          </ul>

          {/* Pricing options */}
          <div className="mb-4 space-y-3">
            <FlexiOption
              selected={flexiOption === "video"}
              onSelect={() => setFlexiOption("video")}
              label="Flexi Video"
              price="INR 9,990+"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              }
            />
            <FlexiOption
              selected={flexiOption === "exam"}
              onSelect={() => setFlexiOption("exam")}
              label="Exam Voucher (optional)"
              price="INR 4,659+"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              }
            />
            <FlexiOption
              selected={flexiOption === "labs"}
              onSelect={() => setFlexiOption("labs")}
              label="Hands-On-Labs"
              price="INR 4,559+"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                </svg>
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-koenig-muted">† Excluding VAT/GST</p>
              <p className="text-xs text-koenig-muted">* Flexi access will be provided once MS learn registration is done.</p>
            </div>
            <a
              href="#"
              className="flex items-center gap-1.5 rounded-full border border-koenig-border px-4 py-2 text-xs font-semibold text-koenig-dark hover:border-koenig-blue hover:text-koenig-blue transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Flexi FAQ&apos;s
            </a>
          </div>

          <button className="group mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-koenig-blue py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-koenig-accent hover:shadow-md active:scale-95">
            <span>Enroll Now</span>
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </button>

          {/* Other training options */}
          <div className="mt-6">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-koenig-muted">Other Training Options</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setTab("public")}
                className="flex items-center justify-between rounded-xl border border-koenig-blue/20 bg-gradient-to-r from-koenig-blue/5 to-white p-4 text-left transition-all hover:border-koenig-blue/50 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-koenig-blue/10">
                    <svg className="h-5 w-5 text-koenig-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-koenig-dark">Public Training</div>
                    <div className="text-xs text-koenig-muted">Group class · Fixed schedule</div>
                  </div>
                </div>
                <svg className="h-4 w-4 text-koenig-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
              <button
                onClick={() => setTab("oneOnOne")}
                className="flex items-center justify-between rounded-xl border border-koenig-blue/20 bg-gradient-to-r from-koenig-blue/5 to-white p-4 text-left transition-all hover:border-koenig-blue/50 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-koenig-blue/10">
                    <svg className="h-5 w-5 text-koenig-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-koenig-dark">1-on-1 Training</div>
                    <div className="text-xs text-koenig-muted">Private instructor · Any date</div>
                  </div>
                </div>
                <svg className="h-4 w-4 text-koenig-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

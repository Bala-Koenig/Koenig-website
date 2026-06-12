"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const hearOptions = [
  "",
  "Organic Search (Google/Bing/Yahoo)",
  "Paid Search Ads (Google Ads, Bing Ads)",
  "Webinars",
  "Email Outreach",
  "LinkedIn",
  "Social Media (Facebook, Instagram, X)",
  "YouTube",
  "Trustpilot",
  "Word of Mouth",
  "Existing customer referral",
  "Press release",
  "Other",
];

interface RequestInfoModalProps {
  courseTitle: string;
  courseCode: string;
}

export function RequestInfoModal({ courseTitle, courseCode }: RequestInfoModalProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<"individual" | "enterprise">("individual");
  const [submitted, setSubmitted] = useState(false);
  const [robotChecked, setRobotChecked] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseName: `${courseCode}: ${courseTitle}`,
    trainees: "",
    hearAbout: "",
    message: "",
  });

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function set(key: string, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
  };
  const inputCls = "w-full rounded-xl px-4 py-[11px] text-sm placeholder-white/30 outline-none transition-colors focus:border-[#0694D1]";
  const labelCls = "mb-1.5 block text-sm font-semibold text-white/70";

  const modal = open && mounted && createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" onClick={() => setOpen(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{ background: "radial-gradient(ellipse at 68% 48%, rgba(6,148,209,0.18) 0%, rgba(6,148,209,0.06) 38%, transparent 65%), #06111E" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition"
        >
          ✕
        </button>

        <div className="p-6">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="mb-4 text-5xl">✅</div>
              <h3 className="mb-2 text-xl font-bold text-white">Thank you!</h3>
              <p className="text-white/60">Our team will reach out within 1 business day.</p>
              <button onClick={() => setOpen(false)} className="mt-6 rounded-xl bg-koenig-blue px-6 py-2.5 text-sm font-semibold text-white hover:bg-koenig-accent transition">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              {/* Header */}
              <div className="mb-5 text-center">
                <span
                  className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest"
                  style={{ border: "1px solid rgba(6,148,209,0.55)", background: "rgba(6,148,209,0.12)", color: "#38bdf8" }}
                >
                  Let&apos;s Talk
                </span>
                <h2 className="text-2xl font-bold text-white">
                  Request for more <span style={{ color: "#38bdf8" }}>information</span>
                </h2>
                <p className="mt-1.5 text-sm text-white/50">{courseCode}: {courseTitle}</p>

                <div className="mt-4 flex justify-center gap-3">
                  <a href="https://wa.me/918800971792" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp us
                  </a>
                  <a href="mailto:training@koenig-solutions.com"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    Email us
                  </a>
                </div>
              </div>

              {/* Individual / Enterprise toggle */}
              <div className="mb-6 inline-flex w-full rounded-xl p-1" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {(["individual", "enterprise"] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setTab(t)}
                    className="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200"
                    style={tab === t ? { background: "linear-gradient(135deg, #0694D1, #076D9D)", color: "#fff", boxShadow: "0 2px 12px rgba(6,148,209,0.35)" } : { color: "rgba(255,255,255,0.45)" }}>
                    <span className="inline-flex items-center justify-center gap-2">
                      {t === "individual" ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/><path d="M2 12h20"/></svg>
                      )}
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Row 1 */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
                  <input type="text" required placeholder="John Smith" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} className={inputCls} style={inputStyle} />
                </div>
                <div>
                  <label className={labelCls}>Business Email <span className="text-red-400">*</span></label>
                  <input type="email" required placeholder="john@company.com" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} style={inputStyle} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Phone</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} style={inputStyle} />
                </div>
                {tab === "individual" ? (
                  <div>
                    <label className={labelCls}>Select Course Name</label>
                    <input type="text" placeholder="Course Name" value={form.courseName} onChange={(e) => set("courseName", e.target.value)} className={inputCls} style={inputStyle} />
                  </div>
                ) : (
                  <div>
                    <label className={labelCls}>Number of Trainees</label>
                    <input type="number" placeholder="e.g. 25" value={form.trainees} onChange={(e) => set("trainees", e.target.value)} className={inputCls} style={inputStyle} />
                  </div>
                )}
              </div>

              {/* How did you hear */}
              <div className="mt-3">
                <label className={labelCls}>How did you hear about us?</label>
                <div className="relative">
                  <select value={form.hearAbout} onChange={(e) => set("hearAbout", e.target.value)}
                    className="w-full appearance-none rounded-xl px-4 py-[11px] text-sm outline-none transition-colors focus:border-[#0694D1]"
                    style={{ ...inputStyle, color: form.hearAbout ? "#fff" : "rgba(255,255,255,0.3)" }}>
                    <option value="" style={{ background: "#0a1929" }}>Select Option</option>
                    {hearOptions.filter(Boolean).map((o) => (
                      <option key={o} value={o} style={{ background: "#0a1929", color: "#fff" }}>{o}</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.4)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>

              {/* Message */}
              <div className="mt-3">
                <label className={labelCls}>Tell us more about your Training Request</label>
                <textarea rows={3} placeholder="e.g. We need Azure certification for 50 engineers across 3 countries..."
                  value={form.message} onChange={(e) => set("message", e.target.value)}
                  className="w-full resize-none rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#0694D1]"
                  style={inputStyle} />
              </div>

              {/* reCAPTCHA mock */}
              <div className="mt-3 flex justify-center">
                <div className="inline-flex items-center gap-3 rounded px-3 py-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <input type="checkbox" checked={robotChecked} onChange={(e) => setRobotChecked(e.target.checked)} className="h-4 w-4 cursor-pointer rounded" />
                  <span className="text-xs text-white/70">I&apos;m not a robot</span>
                  <div className="ml-2 flex flex-col items-center">
                    <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
                      <path d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z" fill="#4A90D9"/>
                      <path d="M32 14c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18z" fill="white"/>
                      <path d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" fill="#4A90D9"/>
                      <path d="M32 26a6 6 0 100 12 6 6 0 000-12z" fill="white"/>
                    </svg>
                    <span className="text-[8px] text-white/35 leading-tight">reCAPTCHA</span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={!robotChecked}
                className="mt-6 w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.99] disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #0694D1 0%, #076D9D 100%)", boxShadow: "0 0 28px rgba(6,148,209,0.40)" }}>
                Submit — Get a Free Consultation
              </button>
              <p className="mt-3 text-center text-xs text-white/30">We&apos;ll respond within 1 business day · No spam, ever.</p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto rounded-lg bg-koenig-blue px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-koenig-blue/30 transition hover:bg-koenig-accent"
      >
        Request More Info
      </button>
      {modal}
    </>
  );
}

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

export function CorporateQuoteModal({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [robotChecked, setRobotChecked] = useState(false);
  const [tab, setTab] = useState<"individual" | "enterprise">("enterprise");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseName: "",
    trainees: "",
    hearAbout: "",
    message: "",
  });

  function set(key: string, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
  };
  const inputCls =
    "w-full rounded-xl px-4 py-[11px] text-sm placeholder-white/30 outline-none transition-colors focus:border-[#0694D1]";
  const labelCls = "mb-1.5 block text-sm font-semibold text-white/70";

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const modalJsx = open ? (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(5px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div
        className="relative flex w-full max-w-xl flex-col rounded-2xl"
        style={{
          maxHeight: "calc(100dvh - 1.5rem)",
          background: "radial-gradient(ellipse at 68% 48%, rgba(6,148,209,0.18) 0%, rgba(6,148,209,0.06) 38%, transparent 65%), #06111E",
          border: "1px solid rgba(6,148,209,0.25)",
        }}
      >
        {/* Fixed header with close */}
        <div className="flex flex-shrink-0 items-center justify-between px-4 sm:px-6 pt-4 pb-2">
          <div>
            <span
              className="inline-block rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest"
              style={{ border: "1px solid rgba(6,148,209,0.55)", background: "rgba(6,148,209,0.12)", color: "#38bdf8" }}
            >
              Corporate Training
            </span>
            <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">Get a Corporate Quote</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Scrollable form body */}
        <div className="flex-1 overflow-y-auto px-4 pb-5 sm:px-6">


          {submitted ? (
            <div className="py-8 text-center">
              <div className="mb-3 text-5xl">✅</div>
              <h3 className="mb-2 text-xl font-bold text-white">Thank you!</h3>
              <p className="text-white/60">Our team will reach out within 1 business day.</p>
              <button
                onClick={() => { setOpen(false); setSubmitted(false); }}
                className="mt-5 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition"
                style={{ background: "rgba(6,148,209,0.3)", border: "1px solid rgba(6,148,209,0.4)" }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              {/* Quick contact */}
              <p className="mb-3 text-xs text-white/40">Volume discounts · Dedicated account manager · Custom scheduling</p>
              <div className="mb-4 flex gap-2">
                <a href="https://wa.me/918800971792" target="_blank" rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-white/70 transition hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a href="mailto:training@koenig-solutions.com"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-white/70 transition hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  Email us
                </a>
              </div>

              {/* Tab toggle */}
              <div className="mb-4 inline-flex w-full rounded-xl p-1"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {(["individual", "enterprise"] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setTab(t)}
                    className="flex-1 rounded-lg py-2 text-sm font-semibold transition-all duration-200"
                    style={tab === t
                      ? { background: "linear-gradient(135deg, #0694D1, #076D9D)", color: "#fff", boxShadow: "0 2px 12px rgba(6,148,209,0.35)" }
                      : { color: "rgba(255,255,255,0.45)" }}>
                    <span className="inline-flex items-center justify-center gap-1.5">
                      {t === "individual"
                        ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                        : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 12h20"/></svg>}
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
                  <input type="text" required placeholder="John Smith"
                    value={form.fullName} onChange={(e) => set("fullName", e.target.value)}
                    className={inputCls} style={inputStyle} />
                </div>
                <div>
                  <label className={labelCls}>Business Email <span className="text-red-400">*</span></label>
                  <input type="email" required placeholder="john@company.com"
                    value={form.email} onChange={(e) => set("email", e.target.value)}
                    className={inputCls} style={inputStyle} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Phone</label>
                  <input type="tel" placeholder="+91 98765 43210"
                    value={form.phone} onChange={(e) => set("phone", e.target.value)}
                    className={inputCls} style={inputStyle} />
                </div>
                {tab === "individual" ? (
                  <div>
                    <label className={labelCls}>Course Name</label>
                    <input type="text" placeholder="Course Name"
                      value={form.courseName} onChange={(e) => set("courseName", e.target.value)}
                      className={inputCls} style={inputStyle} />
                  </div>
                ) : (
                  <div>
                    <label className={labelCls}>Number of Trainees</label>
                    <input type="number" placeholder="e.g. 25"
                      value={form.trainees} onChange={(e) => set("trainees", e.target.value)}
                      className={inputCls} style={inputStyle} />
                  </div>
                )}
              </div>

              {/* How did you hear */}
              <div className="mt-2.5">
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
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.4)" }}
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </div>

              {/* Message */}
              <div className="mt-2.5">
                <label className={labelCls}>Training Requirement</label>
                <textarea rows={2}
                  placeholder="e.g. We need Azure certification for 50 engineers across 3 countries..."
                  value={form.message} onChange={(e) => set("message", e.target.value)}
                  className="w-full resize-none rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#0694D1]"
                  style={inputStyle} />
              </div>

              {/* reCAPTCHA + Submit */}
              <div className="mt-3 flex items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded px-2.5 py-1.5 flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <input type="checkbox" checked={robotChecked} onChange={(e) => setRobotChecked(e.target.checked)} className="h-4 w-4 cursor-pointer rounded" />
                  <span className="text-xs text-white/70">I&apos;m not a robot</span>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
                style={{ background: "linear-gradient(135deg, #0694D1 0%, #076D9D 100%)", boxShadow: "0 0 20px rgba(6,148,209,0.35)" }}
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Trigger — custom children or default button */}
      {children ? (
        <span onClick={() => setOpen(true)} className="cursor-pointer">{children}</span>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="relative w-full rounded-lg border border-koenig-blue/40 bg-koenig-blue/20 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-koenig-blue/30"
        >
          Request More Info
        </button>
      )}

      {mounted && createPortal(modalJsx, document.body)}
    </>
  );
}

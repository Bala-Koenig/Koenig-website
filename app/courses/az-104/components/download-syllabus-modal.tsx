"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface DownloadSyllabusModalProps {
  courseTitle: string;
  courseCode: string;
  triggerClassName?: string;
}

const countries = [
  "United States", "United Kingdom", "India", "Canada", "Australia",
  "United Arab Emirates", "Singapore", "Germany", "Other",
];

export function DownloadSyllabusModal({ courseTitle, courseCode, triggerClassName }: DownloadSyllabusModalProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", country: "" });

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function set(key: string, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  const inputStyle: React.CSSProperties = {
    background: "#fff",
    border: "1.5px solid #C7D9E8",
    color: "#093148",
    boxShadow: "0 1px 3px rgba(6,148,209,0.06)",
  };
  const inputCls = "reqinfo-field w-full rounded-xl px-4 py-[11px] text-sm placeholder-koenig-muted/70 outline-none transition-all";
  const labelCls = "mb-1.5 block text-sm font-medium text-koenig-dark";

  const courseLabel = courseTitle.startsWith(courseCode) ? courseTitle : `${courseCode}: ${courseTitle}`;

  const modal = open && mounted && createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" onClick={() => setOpen(false)}>
      {/* Field focus state — !important beats each field's inline border/background style */}
      <style>{`
        .reqinfo-field:focus {
          border-color: #0694D1 !important;
          box-shadow: 0 10px 20px -8px rgba(6,148,209,0.35), 0 0 0 3px rgba(6,148,209,0.15) !important;
        }
      `}</style>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-koenig-blue/15"
        style={{
          background: "radial-gradient(ellipse at 68% 48%, rgba(6,148,209,0.10) 0%, rgba(6,148,209,0.04) 38%, transparent 65%), #F3FAFD",
          boxShadow: "0 0 80px 10px rgba(6,148,209,0.35), 0 25px 50px -12px rgba(0,0,0,0.35)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-koenig-muted hover:bg-koenig-border transition"
        >
          ✕
        </button>

        <div className="p-6">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="mb-4 text-5xl">✅</div>
              <h3 className="mb-2 text-xl font-bold text-koenig-dark">Sent!</h3>
              <p className="text-koenig-muted">Check your inbox — the course content is on its way.</p>
              <button onClick={() => setOpen(false)} className="mt-6 rounded-xl bg-koenig-blue px-6 py-2.5 text-sm font-semibold text-white hover:bg-koenig-accent transition">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-koenig-blue">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <text x="12" y="17.5" fontSize="6.5" fontWeight="700" fill="currentColor" stroke="none" textAnchor="middle">PDF</text>
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest text-koenig-blue">Download Syllabus</span>
              </div>

              {/* Course box */}
              <div className="mb-5 rounded-xl border border-koenig-blue/20 bg-koenig-blue/5 px-4 py-3">
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-koenig-muted">Course</p>
                <p className="text-sm font-bold leading-snug text-koenig-dark">{courseLabel}</p>
              </div>

              <h2 className="mb-1.5 text-xl font-bold text-koenig-dark">Get the Course Content</h2>
              <p className="mb-5 text-sm leading-relaxed text-koenig-muted">
                Fill in your details and we&apos;ll send it straight to your inbox.
              </p>

              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Rahul Sharma"
                    className={inputCls}
                    style={inputStyle}
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="John@example.com"
                    className={inputCls}
                    style={inputStyle}
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Country *</label>
                  <div className="relative">
                    <select
                      required
                      className="reqinfo-field w-full appearance-none rounded-xl px-4 py-[11px] text-sm outline-none transition-all"
                      style={{ ...inputStyle, color: form.country ? "#093148" : "#7a8c96" }}
                      value={form.country}
                      onChange={(e) => set("country", e.target.value)}
                    >
                      <option value="" disabled style={{ background: "#fff" }}>Select your country</option>
                      {countries.map((c) => (
                        <option key={c} value={c} style={{ background: "#fff", color: "#093148" }}>{c}</option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-koenig-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                  </div>
                </div>

                <p className="flex items-center gap-2 text-xs text-koenig-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" />
                  </svg>
                  Course content will be sent to your email ID
                </p>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-koenig-blue py-4 text-base font-bold text-white transition hover:bg-koenig-accent active:scale-[0.99]"
                >
                  Send Course Content →
                </button>
              </div>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-koenig-muted">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                No spam, ever. Unsubscribe anytime.
              </p>
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
        className={triggerClassName ?? "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M12 13v5m-2.5-2.5L12 18l2.5-2.5" />
        </svg>
        Download Syllabus
      </button>
      {modal}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const COUNTRIES = [
  "India", "United States", "United Kingdom", "United Arab Emirates",
  "Australia", "Canada", "Germany", "Singapore", "South Africa", "Other",
];

const CITIES_BY_COUNTRY: Record<string, string[]> = {
  India: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Gurugram", "Other"],
  "United States": ["New York", "Chicago", "San Francisco", "Other"],
  "United Kingdom": ["London", "Manchester", "Other"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Other"],
  Australia: ["Sydney", "Melbourne", "Other"],
  Canada: ["Toronto", "Vancouver", "Other"],
  Germany: ["Munich", "Berlin", "Other"],
  Singapore: ["Singapore", "Other"],
  "South Africa": ["Johannesburg", "Cape Town", "Other"],
  Other: ["Other"],
};

export interface ClassroomBookingBatch {
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  price: number;
  currency: string;
}

interface ClassroomBookingModalProps {
  open: boolean;
  onClose: () => void;
  batch: ClassroomBookingBatch | null;
  courseTitle?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatBookingDateRange(startIso: string, endIso: string): string {
  const fmt = (iso: string) => {
    const d = new Date(iso + "T00:00:00");
    const day = d.getDate();
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    const year = d.getFullYear();
    return `${day} ${month} (${weekday}) ${year}`;
  };
  return `${fmt(startIso)} to ${fmt(endIso)}`;
}

function formatFee(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency, currencyDisplay: "code", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

const GST_RATE = 0.18;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ClassroomBookingModal({ open, onClose, batch, courseTitle }: ClassroomBookingModalProps) {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [robotChecked, setRobotChecked] = useState(false);
  const [robotError, setRobotError] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Reset the form each time it's opened for a (possibly different) batch
  useEffect(() => {
    if (open && batch) {
      setSubmitted(false);
      setRobotChecked(false);
      setRobotError(false);
      setName("");
      setPhone("");
      setEmail("");
      setCountry("India");
      setCity(CITIES_BY_COUNTRY.India.includes(batch.location) ? batch.location : "");
      setMessage("");
      setPromoCode("");
    }
  }, [open, batch]);

  if (!open || !mounted || !batch) return null;

  const cityOptions = CITIES_BY_COUNTRY[country] ?? ["Other"];

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative flex w-full max-w-3xl max-h-[92vh] flex-col overflow-hidden rounded-2xl shadow-2xl"
        style={{ background: "#F6F7F9" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-start justify-between px-6 py-4" style={{ background: "linear-gradient(135deg, #093148 0%, #0694D1 100%)" }}>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-white sm:text-lg">Book classroom training</h2>
            {courseTitle && <p className="mt-0.5 truncate text-xs text-white/70 sm:text-sm">{courseTitle}</p>}
          </div>
          <button onClick={onClose} aria-label="Close" className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          {submitted ? (
            <div className="overflow-y-auto px-6 py-10 text-center">
              <div className="mb-4 text-5xl">✅</div>
              <h3 className="mb-2 text-xl font-bold text-koenig-dark">Booking request received!</h3>
              <p className="text-koenig-muted">Our team will confirm your seat within 1 business day.</p>
              <button onClick={onClose} className="mt-6 rounded-xl bg-koenig-blue px-6 py-2.5 text-sm font-semibold text-white hover:bg-koenig-accent transition">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (!robotChecked) { setRobotError(true); return; } setSubmitted(true); }} className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* Schedule + Fee summary */}
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <div className="flex-1 overflow-hidden rounded-xl border" style={{ borderColor: "rgba(6,148,209,0.35)", background: "rgba(6,148,209,0.03)" }}>
                  <div className="grid grid-cols-3">
                    {["Day", "Time", "Location"].map((h, i) => (
                      <div key={h} className="border-b px-3 py-1.5 text-xs font-normal text-[#093148]"
                        style={{ borderColor: "rgba(6,148,209,0.35)", borderRight: i < 2 ? "1px solid rgba(6,148,209,0.35)" : undefined }}>{h}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="px-3 py-2 text-[13px] text-koenig-dark" style={{ borderRight: "1px solid rgba(6,148,209,0.20)" }}>{formatBookingDateRange(batch.startDate, batch.endDate)}</div>
                    <div className="px-3 py-2 text-[13px] text-koenig-dark" style={{ borderRight: "1px solid rgba(6,148,209,0.20)" }}>{batch.time}</div>
                    <div className="px-3 py-2 text-[13px] text-koenig-dark">{batch.location}</div>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-2.5 rounded-xl border px-4 py-3.5 sm:w-[220px]" style={{ borderColor: "rgba(6,148,209,0.25)", background: "rgba(6,148,209,0.03)" }}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-koenig-muted">Course Fee</span>
                    <span className="whitespace-nowrap text-[13px] font-bold text-koenig-dark">{formatFee(batch.price, batch.currency)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t pt-2.5" style={{ borderColor: "rgba(6,148,209,0.18)" }}>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-koenig-muted">
                      Total Fees <span className="font-normal normal-case text-koenig-muted/70">(incl. GST)</span>
                    </span>
                    <span className="whitespace-nowrap text-[13px] font-bold text-[#0694D1]">{formatFee(Math.round(batch.price * (1 + GST_RATE)), batch.currency)}</span>
                  </div>
                </div>
              </div>

              {/* Name / Email */}
              <div className="mb-3.5 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#093148]">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="e.g. John Smith" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-koenig-border bg-white px-4 py-[11px] text-sm text-koenig-dark placeholder-koenig-muted/50 outline-none transition-colors focus:border-koenig-blue" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#093148]">Email <span className="text-red-500">*</span></label>
                  <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-koenig-border bg-white px-4 py-[11px] text-sm text-koenig-dark placeholder-koenig-muted/50 outline-none transition-colors focus:border-koenig-blue" />
                </div>
              </div>

              {/* Phone / Country */}
              <div className="mb-3.5 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#093148]">Phone <span className="text-red-500">*</span></label>
                  <input type="tel" required placeholder="+91 00000 00000" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-koenig-border bg-white px-4 py-[11px] text-sm text-koenig-dark placeholder-koenig-muted/50 outline-none transition-colors focus:border-koenig-blue" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#093148]">Country <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select value={country} onChange={(e) => { setCountry(e.target.value); setCity(""); }}
                      className="w-full appearance-none rounded-xl border border-koenig-border bg-white px-4 py-[11px] text-sm text-koenig-dark outline-none transition-colors focus:border-koenig-blue">
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-koenig-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                </div>
              </div>

              {/* City / Promo Code */}
              <div className="mb-3.5 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#093148]">City <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select value={city} onChange={(e) => setCity(e.target.value)} required
                      className="w-full appearance-none rounded-xl border border-koenig-border bg-white px-4 py-[11px] text-sm outline-none transition-colors focus:border-koenig-blue"
                      style={{ color: city ? undefined : "rgba(15,23,42,0.4)" }}>
                      <option value="">Select city</option>
                      {cityOptions.map((c) => <option key={c} value={c} style={{ color: "#0d1b2a" }}>{c}</option>)}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-koenig-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#093148]">Promo Code <span className="font-normal text-koenig-muted/60">(optional)</span></label>
                  <input type="text" placeholder="Enter promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full rounded-xl border border-koenig-border bg-white px-4 py-[11px] text-sm text-koenig-dark placeholder-koenig-muted/50 outline-none transition-colors focus:border-koenig-blue" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-1 block text-xs font-medium text-[#093148]">Message <span className="font-normal text-koenig-muted/60">(optional)</span></label>
                <textarea rows={3} placeholder="Any specific requirements for your training..." value={message} onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-xl border border-koenig-border bg-white px-4 py-3 text-sm text-koenig-dark placeholder-koenig-muted/50 outline-none transition-colors focus:border-koenig-blue" />
              </div>
            </div>

            {/* Fixed footer — reCAPTCHA + Book Now always visible, never scrolled out of view */}
            <div className="flex-shrink-0 border-t px-6 py-4" style={{ borderColor: "rgba(6,148,209,0.15)", background: "#FFFFFF" }}>
              {/* reCAPTCHA mock */}
              <div className="mb-1 flex justify-center">
                <div className="inline-flex items-center gap-3 rounded-lg border bg-white px-3.5 py-2.5" style={{ borderColor: robotError ? "#ef4444" : undefined }}>
                  <input type="checkbox" checked={robotChecked} onChange={(e) => { setRobotChecked(e.target.checked); if (e.target.checked) setRobotError(false); }} className="h-4 w-4 cursor-pointer rounded" />
                  <span className="text-xs text-koenig-muted">I&apos;m not a robot</span>
                  <div className="ml-2 flex flex-col items-center">
                    <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
                      <path d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z" fill="#4A90D9" />
                      <path d="M32 14c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18z" fill="white" />
                      <path d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" fill="#4A90D9" />
                      <path d="M32 26a6 6 0 100 12 6 6 0 000-12z" fill="white" />
                    </svg>
                    <span className="text-[8px] text-koenig-muted/70 leading-tight">reCAPTCHA</span>
                  </div>
                </div>
              </div>
              <p className="mb-1 min-h-[13px] text-center text-[11px] font-medium text-red-500">
                {robotError ? "Please verify you're not a robot to continue" : ""}
              </p>

              {/* Submit — always active; clicking without the captcha checked shows the error above instead of disabling the button */}
              <button type="submit"
                className="w-full rounded-full py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
                style={{ background: "linear-gradient(135deg, #0694D1 0%, #076D9D 100%)", boxShadow: "0 0 24px rgba(6,148,209,0.35)" }}>
                Book Now
              </button>
            </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

"use client";

import { Fragment, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Footer } from "../components/footer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const COUNTRIES = [
  "India", "United States", "United Kingdom", "United Arab Emirates",
  "Australia", "Canada", "Germany", "Singapore", "South Africa", "Other",
];

const GST_RATE = 0.18;

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

/* ------------------------------------------------------------------ */
/*  Small icons                                                        */
/* ------------------------------------------------------------------ */

function RegistrationIcon({ cls = "w-6 h-6" }) {
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M9 3.75V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 3v.75m-6 0h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h6.166a2.25 2.25 0 011.898 1.04l.478.766a2.25 2.25 0 001.898 1.04h2.62a2.25 2.25 0 001.898-1.04l.478-.766a2.25 2.25 0 011.898-1.04h6.166" />
    </svg>
  );
}
function SecurePaymentIcon({ cls = "w-6 h-6" }) {
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3M3.75 6h16.5a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5v-9a1.5 1.5 0 011.5-1.5z" />
    </svg>
  );
}
function ThankYouIcon({ cls = "w-6 h-6" }) {
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function UserDetailsIcon({ cls = "w-5 h-5" }) {
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5v-.75a5.25 5.25 0 015.25-5.25h.75m6-3a3 3 0 11-6 0 3 3 0 016 0zm2.25 9v-.75a4.5 4.5 0 00-3-4.243M15 15.75h5.25a.75.75 0 00.75-.75v-.375a3.375 3.375 0 00-3.375-3.375h-.75" />
    </svg>
  );
}
function SummaryIcon({ cls = "w-5 h-5" }) {
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
    </svg>
  );
}
function CalIcon({ cls = "w-4 h-4" }) {
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function ClockIcon({ cls = "w-4 h-4" }) {
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3.5 2" />
    </svg>
  );
}
function PinIcon({ cls = "w-4 h-4" }) {
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}
function ShieldCheckIcon({ cls = "w-6 h-6" }) {
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="#22c55e">
      <path d="M12 2l7 3v6c0 5-3.4 8.9-7 10-3.6-1.1-7-5-7-10V5l7-3z" />
      <path d="M9.5 12.2l1.8 1.8 3.3-3.6" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Stepper                                                            */
/* ------------------------------------------------------------------ */

function Stepper({ active }: { active: "registration" | "payment" | "thankyou" }) {
  const steps = [
    { key: "registration", label: "Registration", icon: RegistrationIcon },
    { key: "payment", label: "Secure Payment", icon: SecurePaymentIcon },
    { key: "thankyou", label: "Thank You", icon: ThankYouIcon },
  ] as const;

  return (
    <div className="mx-auto flex max-w-2xl items-start">
      {steps.map((s, i) => {
        const isActive = s.key === active;
        const Icon = s.icon;
        return (
          <Fragment key={s.key}>
            <div className="flex flex-shrink-0 flex-col items-center gap-2">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full border-2"
                style={isActive
                  ? { borderColor: "#0694D1", color: "#0694D1", background: "rgba(6,148,209,0.06)" }
                  : { borderColor: "#A8D8F0", color: "#9aa7b0", background: "#fff" }}
              >
                <Icon />
              </div>
              <span className="text-sm font-normal" style={{ color: isActive ? "#0694D1" : "#9aa7b0" }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="mt-7 h-px flex-1" style={{ background: "#A8D8F0" }} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page content                                                       */
/* ------------------------------------------------------------------ */

function CheckoutContent() {
  const params = useSearchParams();
  const courseTitle = params.get("title") || "AZ-104: Microsoft Azure Administrator";
  const start = params.get("start") || "";
  const end = params.get("end") || "";
  const time = params.get("time") || "";
  const price = Number(params.get("price") || 0);
  const currency = params.get("currency") || "INR";

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("India");
  const [message, setMessage] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [partialPay, setPartialPay] = useState(false);
  const [showParticipant, setShowParticipant] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [participantPhone, setParticipantPhone] = useState("");
  const [robotChecked, setRobotChecked] = useState(false);
  const [robotError, setRobotError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const gst = Math.round(price * GST_RATE);
  const total = price + gst;
  const partialAmount = Math.max(1000, Math.round((total * 0.25) / 1000) * 1000);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!robotChecked) { setRobotError(true); return; }
    setSubmitted(true);
  }

  // Static notched-border style (fieldset/legend) — used for the one-off Participant Details fields
  const fieldsetCls = "rounded-xl border border-[#A8D8F0] px-3 pb-2.5 transition-colors focus-within:border-koenig-blue";
  const legendCls = "ml-1 px-1 text-xs font-medium text-[#093148]";

  // Animated floating-label style — label sits centered like a placeholder, floats up onto the
  // border and shrinks on focus or once the field has a value (peer + :placeholder-shown trick)
  const floatInputCls = "peer w-full rounded-xl border border-[#A8D8F0] bg-white px-4 pb-2.5 pt-4 text-sm text-koenig-dark outline-none transition-colors focus:border-koenig-blue";
  const floatLabelCls = "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1 text-sm text-koenig-muted transition-all duration-150 peer-focus:top-0 peer-focus:text-xs peer-focus:text-koenig-blue peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#093148]";

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-10 md:px-8" style={{ background: "#F6FAFD" }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <Stepper active="registration" />
          </div>

          {submitted ? (
            <div className="mx-auto max-w-lg rounded-2xl border border-[#A8D8F0] bg-white p-10 text-center shadow-sm">
              <div className="mb-4 text-5xl">✅</div>
              <h2 className="mb-2 text-xl font-bold text-koenig-dark">Registration received!</h2>
              <p className="text-koenig-muted">We&apos;ve recorded your details for {courseTitle}. Our team will follow up with payment confirmation shortly.</p>
            </div>
          ) : (
            <div className="grid items-start gap-6 lg:grid-cols-[1fr_460px]">
              {/* ══ LEFT: Your Details ══ */}
              <div className="overflow-hidden rounded-2xl border border-[#A8D8F0] bg-white" style={{ boxShadow: "0 12px 32px rgba(6,148,209,0.14)" }}>
                <div className="flex items-center justify-center gap-2 border-b border-[#A8D8F0] px-6 py-4" style={{ background: "#EAF6FD" }}>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full text-koenig-blue" style={{ background: "rgba(6,148,209,0.15)" }}>
                    <UserDetailsIcon cls="w-4 h-4" />
                  </span>
                  <h2 className="text-lg font-bold text-koenig-blue">Your Details</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                  {/* First Name / Email */}
                  <div className="mb-3.5 grid gap-3 sm:grid-cols-2">
                    <div className="relative">
                      <input id="firstName" type="text" required placeholder=" " value={firstName} onChange={(e) => setFirstName(e.target.value)} className={floatInputCls} />
                      <label htmlFor="firstName" className={floatLabelCls}>First Name <span className="text-red-500">*</span></label>
                    </div>
                    <div className="relative">
                      <input id="email" type="email" required placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} className={floatInputCls} />
                      <label htmlFor="email" className={floatLabelCls}>Email <span className="text-red-500">*</span></label>
                    </div>
                  </div>

                  {/* Phone / Country */}
                  <div className="mb-3.5 grid gap-3 sm:grid-cols-2">
                    <div className="relative flex items-center rounded-xl border border-[#A8D8F0] bg-white pl-4 transition-colors focus-within:border-koenig-blue">
                      <span className="pr-2 text-sm text-koenig-muted">+91</span>
                      <span className="mr-2 h-4 w-px bg-koenig-border" />
                      <input id="phone" type="tel" placeholder=" " value={phone} onChange={(e) => setPhone(e.target.value)} className={`${floatInputCls} !border-none !pl-0`} />
                      <label htmlFor="phone" className={`${floatLabelCls} left-[54px] peer-focus:!left-4 peer-[&:not(:placeholder-shown)]:!left-4`}>Phone</label>
                    </div>
                    <div className="relative">
                      <select value={country} onChange={(e) => setCountry(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-[#A8D8F0] bg-white px-4 pb-2.5 pt-4 text-sm text-koenig-dark outline-none transition-colors focus:border-koenig-blue">
                        {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs text-[#093148]">Country <span className="text-red-500">*</span></label>
                      <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-koenig-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-3.5 sm:w-1/2 sm:pr-1.5">
                    <div className="relative">
                      <input id="promoCode" type="text" placeholder=" " value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className={floatInputCls} />
                      <label htmlFor="promoCode" className={floatLabelCls}>Promo Code <span className="font-normal text-koenig-muted/60">(optional)</span></label>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-4">
                    <div className="relative">
                      <textarea id="message" rows={3} placeholder=" " value={message} onChange={(e) => setMessage(e.target.value)}
                        className={`${floatInputCls} resize-none pt-5`} />
                      <label htmlFor="message"
                        className="pointer-events-none absolute left-4 top-4 bg-white px-1 text-sm text-koenig-muted transition-all duration-150 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-koenig-blue peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#093148]">
                        Message <span className="font-normal text-koenig-muted/60">(optional)</span>
                      </label>
                    </div>
                  </div>

                  {/* Partial payment + Add participant */}
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <label className="flex cursor-pointer items-start gap-2.5">
                      <input type="checkbox" checked={partialPay} onChange={(e) => setPartialPay(e.target.checked)} className="mt-0.5 h-4 w-4 cursor-pointer rounded" />
                      <span>
                        <span className="block text-sm font-semibold text-koenig-dark">Book Seat by Paying {formatFee(partialAmount, currency)}</span>
                        <span className="block text-xs text-koenig-muted">(Remaining can be paid later)</span>
                      </span>
                    </label>
                    <div className="text-center sm:text-right">
                      <button type="button" onClick={() => setShowParticipant((v) => {
                        if (v) { setParticipantName(""); setParticipantEmail(""); setParticipantPhone(""); }
                        return !v;
                      })}
                        className="rounded-lg px-4 py-2 text-xs font-medium uppercase tracking-wide text-white transition hover:opacity-90" style={{ background: "#093148" }}>
                        {showParticipant ? "Remove Participant" : "Add Participant Details"}
                      </button>
                      <p className="mt-1 text-[11px] text-koenig-muted">(If different from you)</p>
                    </div>
                  </div>

                  {/* Participant Details — appears once "Add Participant Details" is clicked */}
                  {showParticipant && (
                    <div className="mb-4 grid gap-3 sm:grid-cols-3">
                      <fieldset className={fieldsetCls}>
                        <legend className={legendCls}>Name <span className="text-red-500">*</span></legend>
                        <input type="text" required placeholder="Name" value={participantName} onChange={(e) => setParticipantName(e.target.value)}
                          className="w-full border-none bg-transparent p-0 text-sm text-koenig-dark placeholder-koenig-muted/60 outline-none" />
                      </fieldset>
                      <fieldset className={fieldsetCls}>
                        <legend className={legendCls}>Email <span className="text-red-500">*</span></legend>
                        <input type="email" required placeholder="Email" value={participantEmail} onChange={(e) => setParticipantEmail(e.target.value)}
                          className="w-full border-none bg-transparent p-0 text-sm text-koenig-dark placeholder-koenig-muted/60 outline-none" />
                      </fieldset>
                      <fieldset className={fieldsetCls}>
                        <legend className={legendCls}>Phone <span className="text-red-500">*</span></legend>
                        <input type="tel" required placeholder="Phone" value={participantPhone} onChange={(e) => setParticipantPhone(e.target.value)}
                          className="w-full border-none bg-transparent p-0 text-sm text-koenig-dark placeholder-koenig-muted/60 outline-none" />
                      </fieldset>
                    </div>
                  )}

                  {/* reCAPTCHA mock */}
                  <div className="mb-1 flex justify-center">
                    <div className="inline-flex items-center gap-3 rounded-lg border bg-white px-3.5 py-2.5" style={{ borderColor: robotError ? "#ef4444" : "#A8D8F0" }}>
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

                  {/* Proceed */}
                  <div className="flex justify-center">
                    <button type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.99] sm:w-96"
                      style={{ background: "linear-gradient(135deg, #0694D1 0%, #076D9D 100%)", boxShadow: "0 0 24px rgba(6,148,209,0.35)" }}>
                      Proceed
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </button>
                  </div>
                </form>
              </div>

              {/* ══ RIGHT: Course Summary ══ */}
              <div className="overflow-hidden rounded-2xl border border-[#A8D8F0] bg-white" style={{ boxShadow: "0 12px 32px rgba(6,148,209,0.14)" }}>
                <div className="flex items-center justify-center gap-2 border-b border-[#A8D8F0] px-6 py-4" style={{ background: "#EAF6FD" }}>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full text-koenig-blue" style={{ background: "rgba(6,148,209,0.15)" }}>
                    <SummaryIcon cls="w-4 h-4" />
                  </span>
                  <h2 className="text-lg font-bold text-koenig-blue">Course Summary</h2>
                </div>

                <div className="px-6 py-5">
                  <p className="text-sm font-bold text-koenig-dark">Public Batch</p>
                  <p className="mb-3 text-base font-semibold text-koenig-dark">{courseTitle}</p>

                  {start && end && (
                    <div className="mb-1.5 flex items-start gap-2 text-sm font-medium text-koenig-dark">
                      <CalIcon cls="mt-0.5 h-4 w-4 flex-shrink-0 text-koenig-blue" />
                      <span>{formatBookingDateRange(start, end)}</span>
                    </div>
                  )}
                  {time && (
                    <div className="mb-1.5 flex items-start gap-2 text-sm font-medium text-koenig-dark">
                      <ClockIcon cls="mt-0.5 h-4 w-4 flex-shrink-0 text-koenig-blue" />
                      <span>{time} India Standard Time</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2 text-sm font-medium text-koenig-dark">
                    <PinIcon cls="mt-0.5 h-4 w-4 flex-shrink-0 text-koenig-blue" />
                    <span>Online</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 border-y border-[#A8D8F0] px-6 py-3" style={{ background: "#EAF6FD" }}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full text-koenig-blue" style={{ background: "rgba(6,148,209,0.15)" }}>
                    <SummaryIcon cls="w-3.5 h-3.5" />
                  </span>
                  <h3 className="text-base font-bold text-koenig-blue">Payment Details</h3>
                </div>

                <div className="px-6 py-5">
                  <div className="flex items-center justify-between border-b border-dashed border-[#A8D8F0] pb-3 text-sm">
                    <span className="font-semibold text-koenig-dark">Course Fee</span>
                    <span className="font-semibold text-koenig-dark">({currency}) {price.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-dashed border-[#A8D8F0] py-3 text-sm">
                    <span className="font-semibold text-koenig-dark">+ GST 18%</span>
                    <span className="font-semibold text-koenig-dark">({currency}) {gst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#A8D8F0] pt-3 text-base">
                    <span className="font-bold text-koenig-dark">Total</span>
                    <span className="font-bold text-koenig-dark">({currency}) {total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="mx-6 mb-6 flex flex-col overflow-hidden rounded-xl border border-[#A8D8F0] sm:flex-row">
                  <p className="flex-1 p-4 text-[11px] leading-relaxed text-[#093148]">
                    Transactions on this site are safe and secure, as indicated by the secure lock in your address bar. Over 50,000 users have enrolled in our courses. For more information about payment options, please refer to the{" "}
                    <a href="#" className="text-koenig-blue underline underline-offset-2">Payment Methods</a> page on our website.
                  </p>
                  <div className="flex flex-shrink-0 flex-col items-center justify-center gap-1.5 border-t border-[#A8D8F0] p-4 sm:border-l sm:border-t-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">Powered By</span>
                    <span className="rounded border border-[#A8D8F0] px-2 py-0.5 text-[9px] font-bold italic text-koenig-blue">⚡Razorpay</span>
                    <div className="flex items-center gap-1.5">
                      <span className="rounded border border-[#A8D8F0] px-1.5 py-0.5 text-[9px] font-bold text-koenig-dark">UPI</span>
                      <span className="rounded border border-[#A8D8F0] px-1.5 py-0.5 text-[9px] font-bold text-koenig-dark">VISA</span>
                      <span className="rounded border border-[#A8D8F0] px-1.5 py-0.5 text-[9px] font-bold text-koenig-dark">RuPay</span>
                      <ShieldCheckIcon cls="h-5 w-5" />
                    </div>
                    <span className="text-[8px] font-semibold text-koenig-muted">100% Secure Transaction</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  );
}

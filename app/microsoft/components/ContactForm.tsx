"use client";
import { useState, useEffect, useRef } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const hearAboutOptions = [
  "Select Option", "Google Search", "Social Media", "LinkedIn", "Colleague / Referral",
  "Email Newsletter", "Microsoft Event", "Other",
];

const courses = [
  "Select Course Name",
  "PL-900T00: Power Platform Fundamentals",
  "PL-300T00: Design and Manage Analytics with Power BI",
  "PL-200T00: Power Platform Functional Consultant",
  "PL-400T00: Power Platform Developer",
  "Automation in a Day",
  "App in a Day",
  "Power Pages in a Day",
  "Agent in a Day",
  "Full Bundle",
];

export default function ContactForm() {
  const [type,    setType]    = useState<"individual" | "enterprise">("individual");
  const [contact, setContact] = useState<"email" | "whatsapp">("email");
  const [form,    setForm]    = useState({ name: "", email: "", phone: "", course: "", trainees: "", hear: "", message: "" });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const inputStyle = {
    backgroundColor: "#fff",
    border: "1px solid #CBD5E1",
    color: "#1E293B",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "13px",
    fontFamily: "var(--font-body-sans)",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = C.accent;
  };
  const handleBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#CBD5E1";
  };

  return (
    <section
      ref={sectionRef}
      className="py-16"
      style={{ backgroundColor: "#EEF7FD" }}
      aria-labelledby="contact-form-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div
          className="animate-on-scroll rounded-3xl p-8 sm:p-10 border"
          style={{
            backgroundColor: C.light,
            borderColor: "rgba(6,148,209,0.2)",
            boxShadow: "0 8px 40px rgba(6,148,209,0.08)",
          }}
        >
          {/* Title */}
          <h2
            id="contact-form-heading"
            className="font-heading font-medium text-2xl sm:text-3xl text-center mb-6"
            style={{ color: C.dark }}
          >
            Request more information
          </h2>

          {/* Email / WhatsApp tabs */}
          <div className="flex justify-center gap-3 mb-6">
            {[
              { key: "email",    label: "Email:", icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )},
              { key: "whatsapp", label: "WhatsApp:", icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.121 1.535 5.847L0 24l6.335-1.508A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.825 9.825 0 01-5.027-1.381l-.36-.214-3.735.889.927-3.647-.235-.374A9.774 9.774 0 012.182 12C2.182 6.567 6.567 2.182 12 2.182S21.818 6.567 21.818 12 17.433 21.818 12 21.818z"/>
                </svg>
              )},
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setContact(tab.key as "email" | "whatsapp")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-heading font-medium transition-all duration-200"
                style={
                  contact === tab.key
                    ? { backgroundColor: C.accent, borderColor: C.accent, color: "#fff" }
                    : { backgroundColor: "transparent", borderColor: C.accent, color: C.accent }
                }
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Individual / Enterprise radio */}
          <div className="flex justify-center gap-8 mb-7">
            {[
              { key: "individual", label: "Individual"  },
              { key: "enterprise", label: "Enterprise"  },
            ].map((opt) => (
              <label
                key={opt.key}
                className="flex items-center gap-2.5 cursor-pointer font-body text-sm font-500"
                style={{ color: "#374151" }}
              >
                <input
                  type="radio"
                  name="type"
                  checked={type === opt.key}
                  onChange={() => setType(opt.key as "individual" | "enterprise")}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: C.accent }}
                />
                <strong className={type === opt.key ? "font-700" : "font-400"} style={{ color: type === opt.key ? C.dark : "#374151" }}>
                  {opt.label}
                </strong>
              </label>
            ))}
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            {/* Row 1 */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <input
                type="email"
                placeholder="Business Email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Row 2 — changes based on type */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {type === "individual" ? (
                <select
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  style={{ ...inputStyle, color: form.course ? "#1E293B" : "#94A3B8" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  {courses.map((c) => <option key={c} value={c === "Select Course Name" ? "" : c}>{c}</option>)}
                </select>
              ) : (
                <input
                  type="number"
                  placeholder="Number of Trainees"
                  value={form.trainees}
                  onChange={(e) => setForm({ ...form, trainees: e.target.value })}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              )}
            </div>

            {/* How did you hear */}
            <div className="relative">
              <label
                className="absolute -top-2.5 left-3 px-1 text-xs font-body"
                style={{ color: C.accent, backgroundColor: C.light }}
              >
                How did you hear about us?
              </label>
              <select
                value={form.hear}
                onChange={(e) => setForm({ ...form, hear: e.target.value })}
                style={{ ...inputStyle, color: form.hear ? "#1E293B" : "#94A3B8" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                {hearAboutOptions.map((opt) => (
                  <option key={opt} value={opt === "Select Option" ? "" : opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Tell us more */}
            <div className="relative">
              <label
                className="absolute -top-2.5 left-3 px-1 text-xs font-body"
                style={{ color: C.accent, backgroundColor: C.light }}
              >
                Tell us more about your Training Request
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* reCAPTCHA placeholder */}
            <div className="flex justify-center">
              <div
                className="flex items-center gap-4 px-5 py-3 rounded border"
                style={{ borderColor: "#CBD5E1", backgroundColor: "#F8FAFC", width: "280px" }}
              >
                <div
                  className="w-6 h-6 rounded border-2 flex-shrink-0"
                  style={{ borderColor: "#CBD5E1" }}
                />
                <span className="text-sm font-body" style={{ color: "#374151" }}>I&apos;m not a robot</span>
                <div className="ml-auto text-right">
                  <p className="text-xs font-body" style={{ color: "#9CA3AF" }}>reCAPTCHA</p>
                  <p className="text-xs font-body" style={{ color: "#9CA3AF" }}>Privacy · Terms</p>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-1">
              <button
                type="submit"
                className="px-16 py-3.5 rounded-full text-white font-heading font-medium text-base transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${C.accent}, #08A8EC)`,
                  boxShadow: `0 4px 20px rgba(6,148,209,0.3)`,
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

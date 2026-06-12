"use client";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

export default function FinalCTA() {
  return (
    <>
      {/* ── Footer ───────────────────────────────────────── */}
      <footer style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(6,148,209,0.12)" }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.accent}, #2BB8F0)` }}>
                  <span className="font-heading font-medium text-sm" style={{ color: C.light }}>K</span>
                </div>
                <span className="font-heading font-medium text-lg" style={{ color: C.light }}>Koenig Solutions</span>
              </div>
              <p className="text-sm font-body leading-relaxed max-w-sm" style={{ color: "rgba(228,247,255,0.45)" }}>
                Microsoft Authorized Learning Partner with 25+ years of IT training excellence.
                Trusted by 40,000+ professionals across 150+ countries.
              </p>
            </div>
            <div>
              <p className="font-heading font-medium text-sm mb-4" style={{ color: C.light }}>Quick Links</p>
              <ul className="space-y-2">
                {["Course Overview","Curriculum","Certifications","Corporate Training","FAQ"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm font-body transition-colors" style={{ color: "rgba(228,247,255,0.45)" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.light)}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(228,247,255,0.45)")}
                    >{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-heading font-medium text-sm mb-4" style={{ color: C.light }}>Contact</p>
              <ul className="space-y-2 text-sm font-body" style={{ color: "rgba(228,247,255,0.45)" }}>
                <li className="flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px] flex-shrink-0"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#0694D1" strokeWidth="1.5"/><path d="M3 7l9 5 9-5" stroke="#0694D1" strokeWidth="1.5"/></svg> info@koenig-solutions.com</li>
                <li className="flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px] flex-shrink-0"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="#0694D1" strokeWidth="1.5"/></svg> +1 (800) KOENIG-1</li>
                <li className="flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px] flex-shrink-0"><circle cx="12" cy="12" r="10" stroke="#0694D1" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="4" ry="10" stroke="#0694D1" strokeWidth="1.5"/><path d="M2 12h20" stroke="#0694D1" strokeWidth="1.5"/></svg> www.koenig-solutions.com</li>
                <li className="flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px] flex-shrink-0"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#0694D1" strokeWidth="1.5"/><circle cx="12" cy="9" r="2.5" stroke="#0694D1" strokeWidth="1.5"/></svg> Delhi · Dubai · UK · USA</li>
              </ul>
            </div>
          </div>
          <div className="cosmos-divider mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body" style={{ color: "rgba(228,247,255,0.35)" }}>
            <p>© 2026 Koenig Solutions Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-5">
              {["Privacy Policy","Terms of Service","Refund Policy"].map((l) => (
                <a key={l} href="#" className="transition-colors hover:text-white">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

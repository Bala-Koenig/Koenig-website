"use client";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const companies = [
  "Microsoft","Accenture","Deloitte","IBM","Capgemini","Infosys","Wipro","TCS","HCL","SAP","Oracle","Cognizant",
];

const trustStats = [
  { number: "10,000+", label: "Certified Professionals", icon: <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M12 3L1 9l11 6 9-4.91V17" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 13.18v4.26C5 19.82 8.13 22 12 22s7-2.18 7-4.56v-4.26" stroke="#0694D1" strokeWidth="1.8"/></svg> },
  { number: "150+",    label: "Countries Served",        icon: <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><circle cx="12" cy="12" r="10" stroke="#0694D1" strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="#0694D1" strokeWidth="1.8"/></svg> },
  { number: "25+",     label: "Years of Excellence",     icon: <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M6 9l6-6 6 6" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3v12" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round"/><path d="M5 21h14" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="18" r="2" stroke="#0694D1" strokeWidth="1.8"/></svg> },
  { number: "500+",    label: "Enterprise Clients",      icon: <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><rect x="3" y="10" width="7" height="11" rx="1" stroke="#0694D1" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="18" rx="1" stroke="#0694D1" strokeWidth="1.8"/><path d="M5 14h3M5 17h3M16 7h3M16 10h3M16 13h3M16 16h3" stroke="#0694D1" strokeWidth="1.3" strokeLinecap="round"/></svg> },
];

export default function TrustBar() {
  return (
    <section className="relative py-[30px] overflow-hidden bg-white" aria-label="Social Proof">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(6,148,209,0.2), transparent)` }} />
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(6,148,209,0.2), transparent)` }} />

      <div className="max-w-7xl mx-auto px-[16px]">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[15px] mb-[15px]">
          {trustStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl p-4 border group transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              style={{ backgroundColor: C.light + "40", borderColor: "rgba(6,148,209,0.18)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 border"
                style={{ backgroundColor: C.light, borderColor: "rgba(6,148,209,0.25)" }}
              >
                {stat.icon}
              </div>
              <div>
                <p className="font-heading font-medium text-xl" style={{ color: C.dark }}>{stat.number}</p>
                <p className="text-xs font-body leading-snug" style={{ color: "#64748B" }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Label */}
        <div className="text-center mb-[15px]">
          <p className="text-xs font-body uppercase tracking-widest" style={{ color: "#94A3B8" }}>
            Trusted by professionals from world-class organizations
          </p>
        </div>

        {/* Scrolling logos */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #fff, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(-90deg, #fff, transparent)" }} />

          <div className="flex gap-4 w-max animate-scroll">
            {[...companies, ...companies].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center justify-center w-36 h-12 rounded-xl border flex-shrink-0 transition-all duration-300 cursor-default hover:shadow-sm"
                style={{ backgroundColor: "#F8FAFC", borderColor: "#E5E7EB" }}
              >
                <span className="font-heading font-medium text-sm" style={{ color: "#94A3B8" }}>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partner badges */}
        <div className="mt-[15px] flex flex-col sm:flex-row items-center justify-center gap-[15px] flex-wrap">
          {[
            { icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="9" r="6" stroke="#0694D1" strokeWidth="1.8"/><path d="M8.5 15l-2 7 5.5-3 5.5 3-2-7" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, strong: "Official Microsoft", sub: "Learning Partner",  borderColor: "rgba(6,148,209,0.25)" },
            { icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="9" r="6" stroke="#0694D1" strokeWidth="1.8"/><path d="M12 6v3l2 1" stroke="#0694D1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 15l-1.5 7L12 19l4.5 3L15 15" stroke="#0694D1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, strong: "Gold Certified",     sub: "Training Provider", borderColor: "rgba(245,158,11,0.3)"  },
            { icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 2L3 7v6c0 5.25 3.83 10.15 9 11.25 5.17-1.1 9-6 9-11.25V7l-9-5z" stroke="#0694D1" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, strong: "ISO 9001:2015",       sub: "Quality Assured",   borderColor: "rgba(74,222,128,0.3)"  },
          ].map((b) => (
            <div
              key={b.strong}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border"
              style={{ backgroundColor: "#F8FAFC", borderColor: b.borderColor }}
            >
              <span className="flex items-center justify-center">{b.icon}</span>
              <span className="text-sm font-body" style={{ color: "#374151" }}>
                <strong className="font-heading" style={{ color: C.dark }}>{b.strong}</strong>{" "}{b.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

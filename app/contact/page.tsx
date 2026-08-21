"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── types ─────────────────────────────────────────────────────── */
type Contact = { name: string; phone: string; whatsapp?: string; email?: string; languages?: string };
type Office  = { city: string; country: string; flag: string; address?: string; meetingVenue?: string; contacts: Contact[]; tag?: string; moreInfo?: boolean };
type Region  = { id: string; label: string; color: string; offices: Office[] };

/* ─── data ───────────────────────────────────────────────────────── */

const phoneRegions = [
  { label: "India",         flag: "🇮🇳", phone: "+91-80950-73333"   },
  { label: "UAE",           flag: "🇦🇪", phone: "+971 58 633 8289"  },
  { label: "Oman",          flag: "🇴🇲", phone: "+968 76051994"     },
  { label: "South Africa",  flag: "🇿🇦", phone: "+27 84 388 1870"   },
  { label: "Egypt",         flag: "🇪🇬", phone: "+20 106 149 4189"  },
  { label: "Tanzania",      flag: "🇹🇿", phone: "+255 744 396 711"  },
  { label: "Nigeria",       flag: "🇳🇬", phone: "+234 813 092 2071" },
  { label: "United Kingdom",flag: "🇬🇧", phone: "+44 7391 233590"   },
  { label: "Germany",       flag: "🇩🇪", phone: "+49 1512 1216902"  },
  { label: "Canada",        flag: "🇨🇦", phone: "+1 437 243 1015"   },
  { label: "Australia",     flag: "🇦🇺", phone: "+61 416 190 484"   },
  { label: "New Zealand",   flag: "🇳🇿", phone: "+64 211 809 987"   },
  { label: "Singapore",     flag: "🇸🇬", phone: "+65 8100 7960"     },
  { label: "Malaysia",      flag: "🇲🇾", phone: "+60 112 312 6443"  },
];

const officeRegions: Region[] = [
  {
    id: "india", label: "India", color: "#0694D1",
    offices: [
      { city: "Gurugram",  country: "India", flag: "🇮🇳",
        address: "Unit 202, Second Floor, Emaar The Palm Spring Plaza, DLF Phase 5, Sector 54, Gurugram (Delhi Metropolis) Haryana - 122022 (India)",
        contacts: [{ name: "Nishant Yash",   phone: "+91 95601 08722", email: "nishant.yash@koenig-solutions.com",   languages: "English, Hindi" }] },
      { city: "New Delhi", country: "India", flag: "🇮🇳", tag: "HQ",
        address: "DSM-640-641, 6th Floor, DLF Tower, Shivaji Marg, Moti Nagar, New Delhi-110015(India)",
        contacts: [{ name: "Pooja Chauhan",  phone: "+91 88002 76665", email: "pooja.chauhan@koenig-solutions.com",  languages: "English, Hindi" }] },
      { city: "Bangalore", country: "India", flag: "🇮🇳",
        address: "12th floor SKAV (Rockline Seethalaxmi) Building C-39, Kasturba Rd, Shanthala Nagar, Sampangi Rama Nagar, Bengaluru, Karnataka-560001 (India)",
        contacts: [{ name: "Tamanna Alisha", phone: "+91 98868 88455", email: "tamanna.alisha@koenig-solutions.com", languages: "English, Hindi, Kannada, Urdu" }] },
      { city: "Chennai",   country: "India", flag: "🇮🇳", moreInfo: true,
        address: "5th Floor, Olympia Teknos Plot No. 28, South Phase, Sidco Industrial Estate, Guindy Chennai-600032, Tamil Nadu (India)",
        contacts: [] },
      { city: "Goa",       country: "India", flag: "🇮🇳", moreInfo: true,
        address: "4th Floor, Nizmar Center, 401, Dr. Atmaram Borkar Road, Near EDC House, Altinho, Panaji, Goa 403001 (India)",
        contacts: [{ name: "Gabe Turner",    phone: "+91 95998 34249", email: "Gabe.Turner@koenig-solutions.com",   languages: "Hindi, English" }] },
      { city: "Dehradun",  country: "India", flag: "🇮🇳", moreInfo: true,
        address: "Plot#22, IT Park, Sahastradhara Road, Dehradun(Uttarakhand)-248001 (India)",
        contacts: [{ name: "Simran Dewan",   phone: "+91 92894 88282", whatsapp: "+91 92894 88282", email: "Simran.Deewan@koenig-solutions.com", languages: "English" }] },
    ],
  },
  {
    id: "mea", label: "Middle East & Africa", color: "#076D9D",
    offices: [
      { city: "Dubai",         country: "United Arab Emirates", flag: "🇦🇪", moreInfo: true,
        address: "Mazaya Business Avenue BB1, First Floor, Office no#107 & 108 Plot No. 847, AL Thanyah Fifth JLT, Dubai - United Arab Emirates DMCC Licence No: 852564",
        contacts: [
          { name: "Ashraf Ahmed",          phone: "+971 58 633 8289",  whatsapp: "+971 58 633 8289",  email: "ashraf.ahmed@koenig-solutions.com",   languages: "English, Arabic" },
          { name: "Omar Mohamed Elmasry",  phone: "+971 54 431 5301",  whatsapp: "+971 54 431 5301",  email: "Omar.Elmasry@koenig-solutions.com",   languages: "English, Arabic" },
          { name: "Halem Moubark Abdallah",phone: "+971 128 884 7708", email: "halem.moubark@koenig-solutions.com" },
        ] },
      { city: "Johannesburg",  country: "South Africa", flag: "🇿🇦",
        address: "FutureSpace 61 Katherine, 61 Katherine St, Sandhurst, Sandton, 2196, South Africa",
        contacts: [
          { name: "Khalil Adam",    phone: "+27 843 881 870", email: "Khalil.Adam@koenig-solutions.com",    languages: "English, Hindi" },
          { name: "Ivan Mathebula", phone: "+27 825 461 186", whatsapp: "+27 825 461 186", email: "Ivan.Mathebula@koenig-solutions.com", languages: "English" },
          { name: "Bongiwe Fuleni", phone: "+27 836 977 165", whatsapp: "+27 836 977 165", email: "Bongiwe.Fuleni@koenig-solutions.com" },
        ] },
      { city: "Riyadh", country: "Saudi Arabia", flag: "🇸🇦", moreInfo: true,
        address: "Khurais Br Rd, Ar Rawdah, Al Hassan Ibn Ali Street, Riyadh 13211, Saudi Arabia",
        contacts: [] },
      { city: "Oman",     country: "Oman",     flag: "🇴🇲",
        contacts: [{ name: "Shaik Arshiya", phone: "+968 760 519 94",   whatsapp: "+968 760 519 94", email: "Shaik.Arshiya@koenig-solutions.com", languages: "English, Urdu, Arabic" }] },
      { city: "Egypt",    country: "Egypt",    flag: "🇪🇬",
        contacts: [{ name: "Noha Swedy",    phone: "+20 106 149 4189", email: "Noha.Swedy@koenig-solutions.com", languages: "Arabic, English" }] },
      { city: "Tanzania", country: "Tanzania", flag: "🇹🇿",
        contacts: [] },
      { city: "Nigeria",  country: "Nigeria",  flag: "🇳🇬",
        contacts: [{ name: "Joy Ogira",     phone: "+234 813 092 2071", whatsapp: "+234 813 092 2071", email: "Joy.Ogira@koenig-solutions.com", languages: "English" }] },
    ],
  },
  {
    id: "europe", label: "Europe", color: "#093148",
    offices: [
      { city: "London",    country: "United Kingdom", flag: "🇬🇧", moreInfo: true,
        address: "Level 19,100 Bishopsgate, London EC2N 4AG, United Kingdom",
        contacts: [{ name: "Daniel Owen Nimmo", phone: "+44 7354 352 427", email: "Daniel.Nimmo@koenig-solutions.com", languages: "English" }] },
      { city: "Amsterdam", country: "Netherlands", flag: "🇳🇱", moreInfo: true,
        address: "RSIN: 861730045 Wilhelmina van Pruisenweg 35, 2595AN 's-Gravenhage, Netherlands",
        meetingVenue: "Amsterdam Queens Tower, Delflandlaan 1, 1062 EA Amsterdam, Netherlands",
        contacts: [{ name: "Mr. Imran Sheikh", phone: "+49 151 212 169 02", whatsapp: "+49 151 212 169 02", email: "Imran.Sheikh@koenig-solutions.com", languages: "German, English, French" }] },
      { city: "Munich",    country: "Germany", flag: "🇩🇪", moreInfo: true,
        address: "Regus, Munich Peak 2nd & 3rd floor, Putzbrunner Str. 71-73, MUNICH, 81739 Germany",
        contacts: [{ name: "Imran Sheikh", phone: "+49 151 212 169 02", whatsapp: "+49 151 212 169 02", email: "Imran.Sheikh@koenig-solutions.com", languages: "German, English, French" }] },
    ],
  },
  {
    id: "namerica", label: "North America", color: "#0577A8",
    offices: [
      { city: "New York", country: "USA", flag: "🇺🇸",
        address: "Koenig New York Regus - New York City-57 West 57th Street Midtown Manhattan, 3rd and 4th Floor, New York, NY 10019, United States",
        contacts: [] },
      { city: "Canada",    country: "Canada", flag: "🇨🇦",
        address: "Koenig Solutions Ltd. 612-6960 Nicholson Road Delta BC V4E 0A9 Canada Business Number : 736655135BC0001",
        contacts: [{ name: "Faraz Hameed", phone: "+1 (437) 243-1015", email: "faraz.hameed@koenig-solutions.com", languages: "English, French, German" }] },
    ],
  },
  {
    id: "anz", label: "Australia & New Zealand", color: "#0694D1",
    offices: [
      { city: "Sydney",      country: "Australia",   flag: "🇦🇺", moreInfo: true,
        address: "ABNAUSTRALIA, 232 Unley Road, Unley SA 5061",
        meetingVenue: "F1/9-13 Bronte Rd, Bondi Junction NSW 2022, Australia",
        contacts: [
          { name: "Chris Tzalibiras", phone: "+61 4 2305 9782", email: "chris.tzalabiras@koenig-solutions.com" },
          { name: "Kunal Singh",      phone: "+61 4 1619 0484", email: "kunal.singh@koenig-solutions.com", languages: "English" },
          { name: "Mudit Misra",      phone: "+61 4 5221 9323", email: "mudit.misra@koenig-solutions.com", languages: "English" },
        ] },
      { city: "New Zealand", country: "New Zealand", flag: "🇳🇿",
        address: "Moore Markhams Wellington Limited, Level 11, 34-42 Manners Street, Wellington, 6011, New Zealand",
        contacts: [{ name: "Danish Mahajan", phone: "+64 211 809 987", whatsapp: "+64 211 809 987", email: "danish.mahajan@koenig-solutions.com" }] },
    ],
  },
  {
    id: "asia", label: "Asia", color: "#076D9D",
    offices: [
      { city: "Singapore", country: "Singapore", flag: "🇸🇬", moreInfo: true,
        address: "2 Peck Seah St, #02-01 Air View Building, Singapore - 079305",
        contacts: [] },
      { city: "Malaysia",  country: "Malaysia Training", flag: "🇲🇾",
        address: "Level 5, Guoco Tower, 6 Jalan Damanlela, Damansara City, Bukit Damansara, 50490 Kuala Lumpur, W.P. Kuala Lumpur",
        meetingVenue: "Spaces Platinum Sentral, LOT G02-G07 , Level 3 , Platinum Sentral Jalan Stesen Sentral 2 ,50470 Kuala Lumpur, Malaysia",
        contacts: [] },
    ],
  },
];

const indiaOffices = officeRegions.find((r) => r.id === "india")!.offices;

/* ─── helpers ────────────────────────────────────────────────────── */
function flagCode(emoji: string) {
  return [...emoji].map((c) => String.fromCharCode(c.codePointAt(0)! - 127397)).join("").toLowerCase();
}
function initials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#076D9D,#4DBFEF)",
  "linear-gradient(135deg,#093148,#076D9D)",
  "linear-gradient(135deg,#0694D1,#3AB6EB)",
  "linear-gradient(135deg,#062240,#0694D1)",
  "linear-gradient(135deg,#076D9D,#093148)",
];
function avatarGrad(name: string) {
  return AVATAR_GRADIENTS[name.charCodeAt(0) % AVATAR_GRADIENTS.length];
}
function mapsHref(office: { city: string; country: string; address?: string; meetingVenue?: string }) {
  const query = office.address || office.meetingVenue || `${office.city}, ${office.country}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/* ─── channel icons ──────────────────────────────────────────────── */
function MailIcon({ cls = "w-5 h-5" }) {
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}
function PhoneIcon({ cls = "w-5 h-5" }) {
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}
function WAIcon({ cls = "w-5 h-5" }) {
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
function PinIcon({ cls = "w-3.5 h-3.5" }) {
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}
function DocIcon({ cls = "w-3.5 h-3.5" }) {
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

const hearOptions = [
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

/* ─── main component ─────────────────────────────────────────────── */
export default function ContactPage() {
  const [tab, setTab]               = useState<"individual" | "enterprise">("individual");
  const [submitted, setSubmitted]   = useState(false);
  const [robotChecked, setRobotChecked] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", courseName: "", trainees: "", hearAbout: "", message: "" });
  const [activeRegion, setActiveRegion] = useState("india");
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  function set(key: string, val: string) { setForm((p) => ({ ...p, [key]: val })); }

  const inputStyle: React.CSSProperties = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" };
  const inputCls = "w-full rounded-xl px-4 py-[11px] text-base placeholder-white/30 outline-none transition-colors focus:border-[#0694D1]";
  const labelCls = "mb-1.5 block text-sm sm:text-base font-medium text-white/70";

  const currentRegion = officeRegions.find((r) => r.id === activeRegion)!;

  return (
    <div className="min-h-screen bg-white text-[#0d1b2a]" style={{ fontFamily: "'GTWalsheimPro', sans-serif" }}>
      <Navbar />
      <style>{`
        @keyframes blob-a { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-28px) scale(1.06)} 66%{transform:translate(-24px,18px) scale(0.95)} }
        @keyframes blob-b { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-45px,28px) scale(1.08)} 70%{transform:translate(28px,-18px) scale(0.94)} }
        @keyframes blob-c { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,30px) scale(1.04)} }
        .kblob-a { animation: blob-a 14s ease-in-out infinite; }
        .kblob-b { animation: blob-b 18s ease-in-out infinite; }
        .kblob-c { animation: blob-c 22s ease-in-out infinite; }
        @keyframes io-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .io-up { animation: io-up 0.55s ease both; }
        @keyframes shimmer { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        .btn-shine:hover::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.22) 50%,transparent 60%); animation:shimmer 0.55s ease; }
        .btn-shine { position:relative; overflow:hidden; }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>

      {/* ══════════════════════════════════════════════
          HERO  — matches homepage #06111E dark style
      ══════════════════════════════════════════════ */}
      <section className="relative flex items-center px-4 md:px-8 lg:px-[50px] py-[30px]" style={{ background: "#06111E" }}>
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 45%, #0D3F5A 0%, #071B2E 50%, #040C18 100%)", opacity: 0.85 }} />
          <div className="kblob-a absolute -top-28 -left-28 w-[440px] h-[440px] rounded-full" style={{ background: "radial-gradient(circle, #0694D1 0%, transparent 70%)", filter: "blur(72px)", opacity: 0.18 }} />
          <div className="kblob-b absolute -bottom-20 -right-20 w-[380px] h-[380px] rounded-full" style={{ background: "radial-gradient(circle, #076D9D 0%, transparent 70%)", filter: "blur(64px)", opacity: 0.15 }} />
          <div className="kblob-c absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[260px] rounded-full" style={{ background: "radial-gradient(ellipse, #00a4ef 0%, transparent 70%)", filter: "blur(80px)", opacity: 0.08 }} />
          {/* Subtle grid */}
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(6,148,209,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(6,148,209,0.06) 1px,transparent 1px)", backgroundSize: "52px 52px", opacity: 0.7 }} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-6 lg:gap-14 items-end">

            {/* Left */}
            <div className="io-up">
              {/* India offices — quick city/phone grid, in place of the old badge + title + description */}
              <div className="mb-4 flex items-center gap-2">
                <img src="https://flagcdn.com/24x18/in.png" width={24} height={18} alt="India" className="rounded-[2px]" />
                <span className="text-sm font-bold uppercase tracking-widest text-white/70">India</span>
              </div>
              <div className="rounded-2xl p-3 sm:p-4"
                style={{ background: "rgba(6,148,209,0.12)", border: "1px solid rgba(6,148,209,0.25)" }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {indiaOffices.filter((office) => office.contacts.length > 0).map((office) => (
                    <div key={office.city} className="rounded-xl px-2.5 py-2 text-left transition-colors duration-150 border-b border-white/10"
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(6,148,209,0.20)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <p className="mb-1 truncate text-xs font-medium uppercase tracking-widest" style={{ color: "#3AB6EB" }}>{office.city}</p>
                      <p className="mb-1 truncate text-xs font-medium text-white/70">{office.contacts[0].name}</p>
                      <a href={`tel:${office.contacts[0].phone.replace(/[\s()-]/g, "")}`}
                        className="flex items-center gap-1.5 text-sm tabular-nums text-white transition-colors hover:text-[#3AB6EB]">
                        <PhoneIcon cls="w-3 h-3 shrink-0" /> <span className="whitespace-nowrap">{office.contacts[0].phone}</span>
                      </a>
                      {office.contacts[0].whatsapp && (
                        <a href={`https://wa.me/${office.contacts[0].whatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer"
                          className="mt-0.5 flex items-center gap-1.5 text-sm tabular-nums text-emerald-400 transition-colors hover:text-emerald-300">
                          <WAIcon cls="w-3 h-3 shrink-0" /> <span className="whitespace-nowrap">{office.contacts[0].whatsapp}</span>
                        </a>
                      )}
                      {office.contacts[0].email && (
                        <a href={`mailto:${office.contacts[0].email}`}
                          className="mt-0.5 flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-[#3AB6EB]">
                          <MailIcon cls="w-3 h-3 shrink-0" /> <span className="whitespace-nowrap">{office.contacts[0].email}</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — contact info card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-full lg:max-w-[380px]">
                <div className="rounded-2xl p-5 sm:p-7 space-y-1"
                  style={{ background: "linear-gradient(160deg,#0D2137 0%,#081828 100%)", border: "1px solid rgba(6,148,209,0.30)", boxShadow: "0 0 0 1px rgba(6,148,209,0.08), 0 32px 80px rgba(0,0,0,0.6)" }}>
                  {/* Header */}
                  <div className="flex items-center gap-3 pb-5 mb-1 border-b" style={{ borderColor: "rgba(6,148,209,0.18)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                      style={{ background: "linear-gradient(135deg,#0694D1,#076D9D)" }}>
                      <img src="/images/Contact-us/iconlogo.svg" alt="Koenig" className="w-6 h-6 object-contain" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Koenig Solutions</p>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>30+ offices · 13+ countries</p>
                    </div>
                    <span className="ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-300"
                      style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.25)" }}>
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      Online
                    </span>
                  </div>

                  {[
                    { icon: <MailIcon cls="w-5 h-5" />,      label: "General",      value: "info@koenig-solutions.com", href: "mailto:info@koenig-solutions.com"  },
                    { icon: <WAIcon cls="w-4 h-4" />,     label: "WhatsApp",     value: "+91-984-072-2417",          href: "https://wa.me/919840722417"        },
                  ].map((row) => (
                    <a key={row.label} href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-2.5 rounded-xl transition-colors duration-150"
                      style={{ color: "inherit" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(6,148,209,0.10)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#3AB6EB]"
                        style={{ background: "rgba(6,148,209,0.14)" }}>
                        {row.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.38)" }}>{row.label}</p>
                        <p className="text-sm font-medium truncate text-white/80 group-hover:text-white transition-colors">{row.value}</p>
                      </div>
                      <svg className="w-3 h-3 text-white/20 group-hover:text-[#3AB6EB] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════
          GLOBAL OFFICES — tabbed (light, mild blue glow)
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden px-4 md:px-8 lg:px-[50px] py-[30px]"
        style={{ background: "radial-gradient(ellipse at 25% 60%, rgba(6,148,209,0.10) 0%, rgba(6,148,209,0.03) 40%, transparent 65%), #F7FBFF" }}>
        {/* top-edge gradient separator */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28"
          style={{ background: "linear-gradient(to bottom, rgba(6,148,209,0.12) 0%, transparent 100%)" }} />

        {/* subtle glow blobs */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,148,209,0.10) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-[300px] w-[300px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(77,191,239,0.08) 0%, transparent 70%)" }} />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center mb-5 sm:mb-8">
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#0694D1]"
              style={{ background: "rgba(6,148,209,0.10)", border: "1px solid rgba(6,148,209,0.20)" }}>
              Worldwide Presence
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-koenig-dark mb-2 sm:mb-3">
              Our global <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">offices</span>
            </h2>
            <p className="text-[#5b7186] text-[13px] sm:text-base md:whitespace-nowrap px-2">
              30+ offices across 5 continents — there&apos;s always a Koenig expert near you.
            </p>
          </div>

          {/* Region tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-5 sm:mb-8">
            {officeRegions.map((r) => (
              <button key={r.id} onClick={() => setActiveRegion(r.id)}
                className="rounded-full px-5 py-2.5 min-h-[46px] text-[15px] font-medium transition-all duration-200"
                style={activeRegion === r.id
                  ? { background: "#0694D1", color: "#fff", boxShadow: "0 4px 14px rgba(6,148,209,0.40)" }
                  : { background: "rgba(6,148,209,0.06)", color: "#2d4a6a", border: "1px solid rgba(6,148,209,0.18)" }}
                onMouseEnter={e => { if (activeRegion !== r.id) { e.currentTarget.style.background = "rgba(6,148,209,0.14)"; e.currentTarget.style.color = "#0694D1"; } }}
                onMouseLeave={e => { if (activeRegion !== r.id) { e.currentTarget.style.background = "rgba(6,148,209,0.06)"; e.currentTarget.style.color = "#2d4a6a"; } }}>
                {r.label}
              </button>
            ))}
          </div>

          {/* Office cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentRegion.offices.map((office) => (
              <div key={office.city}
                className="group rounded-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col"
                style={{ background: "linear-gradient(160deg,#FFFFFF 0%,#F4FBFF 100%)", border: "1px solid #CAEFFF", boxShadow: "0 4px 20px rgba(6,148,209,0.08)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(6,148,209,0.45)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(6,148,209,0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#CAEFFF"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(6,148,209,0.08)"; }}>

                {/* top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg,#0694D1,#3AB6EB)" }} />

                {/* ── Location zone ── */}
                <div className="px-6 pt-6 pb-5">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <img src={`https://flagcdn.com/40x30/${flagCode(office.flag)}.png`} width={40} height={30} alt={office.country} className="rounded-[3px]" />
                    <div className="flex flex-col items-end gap-1.5">
                      {office.tag && (
                        <span className="text-xs sm:text-sm font-bold tracking-wider uppercase rounded-full px-2.5 py-0.5 text-white"
                          style={{ background: "#0694D1" }}>{office.tag}</span>
                      )}
                      <a href={mapsHref(office)} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors"
                        style={{ background: "rgba(6,148,209,0.10)", border: "1px solid rgba(6,148,209,0.25)", color: "#0694D1" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,148,209,0.18)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(6,148,209,0.10)"; }}>
                        <PinIcon cls="w-3 h-3" /> View direction
                      </a>
                      {office.moreInfo && (
                        <button type="button"
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors"
                          style={{ background: "rgba(6,148,209,0.06)", border: "1px solid rgba(6,148,209,0.18)", color: "#0694D1" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,148,209,0.14)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "rgba(6,148,209,0.06)"; }}>
                          <DocIcon cls="w-3 h-3" /> More Information
                        </button>
                      )}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-koenig-dark mb-0.5">{office.city}</h3>
                  <p className="text-sm font-bold uppercase tracking-wider text-[#0694D1] mb-3">{office.country}</p>
                  {office.address && (
                    <p className="text-sm text-[#2d4a6a] leading-relaxed">{office.address}</p>
                  )}
                  {office.meetingVenue && (
                    <p className="text-sm text-[#2d4a6a] leading-relaxed mt-2">
                      <span className="font-bold text-koenig-dark">(Meeting Venue)</span> {office.meetingVenue}
                    </p>
                  )}
                </div>

                {/* ── Contact person zone — glassy ── */}
                {office.contacts.length > 0 && (
                  <div className="px-6 py-4 mt-auto space-y-3"
                    style={{
                      background: "linear-gradient(135deg, rgba(6,148,209,0.08) 0%, rgba(255,255,255,0.5) 100%)",
                      borderTop: "1px solid rgba(6,148,209,0.18)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                    }}>
                    {office.contacts.map((c) => (
                      <div key={c.name} className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: avatarGrad(c.name) }}>
                          {initials(c.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#0d1b2a] leading-tight">{c.name}</p>
                          <a href={`tel:${c.phone.replace(/[\s()-]/g, "")}`}
                            className="flex items-center gap-1.5 text-sm text-[#0694D1] hover:text-[#076D9D] transition-colors tabular-nums">
                            <PhoneIcon cls="w-3 h-3 shrink-0" /> {c.phone}
                          </a>
                          {c.whatsapp && (
                            <a href={`https://wa.me/${c.whatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-sm text-[#16a34a] hover:text-[#15803d] transition-colors tabular-nums">
                              <WAIcon cls="w-3 h-3 shrink-0" /> {c.whatsapp}
                            </a>
                          )}
                          {c.email && (
                            <a href={`mailto:${c.email}`}
                              className="block text-sm text-[#5b7186] hover:text-[#0694D1] transition-colors truncate">
                              {c.email}
                            </a>
                          )}
                          {c.languages && (
                            <p className="text-sm text-[#5b7186] mt-0.5">{c.languages}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT FORM + SIDEBAR — dark mode
      ══════════════════════════════════════════════ */}
      <section className="px-4 md:px-8 lg:px-[50px] py-[30px]" ref={formRef}
        style={{ background: "radial-gradient(ellipse at 68% 48%, rgba(6,148,209,0.18) 0%, rgba(6,148,209,0.06) 38%, transparent 65%), #06111E" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-7 items-stretch">
            {/* Form — exact course page form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="rounded-2xl p-10 text-center"
                  style={{ background: "rgba(6,148,209,0.08)", border: "1px solid rgba(6,148,209,0.3)" }}>
                  <div className="mb-4 text-5xl">✅</div>
                  <h3 className="mb-2 text-xl font-bold text-white">Thank you!</h3>
                  <p className="text-white/60">Our team will reach out within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="rounded-2xl p-4 sm:p-6"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(6,148,209,0.2)" }}>

                  {/* Header */}
                  <div className="mb-5 text-center">
                    <span className="mb-3 inline-block rounded-full px-4 py-1 text-xs sm:text-sm font-bold uppercase tracking-widest"
                      style={{ border: "1px solid rgba(6,148,209,0.55)", background: "rgba(6,148,209,0.12)", color: "#38bdf8" }}>
                      Let&apos;s Talk
                    </span>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                      Request for more <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">information</span>
                    </h2>
                    <p className="mt-1.5 text-sm sm:text-base text-white/50">Our training advisors respond within 24 hours — guaranteed.</p>
                    <div className="mt-4 flex justify-center gap-3">
                      <a href="https://wa.me/919840722417" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 whitespace-nowrap"
                        style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp us
                      </a>
                      <a href="mailto:info@koenig-solutions.com"
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 whitespace-nowrap"
                        style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                        Email us
                      </a>
                    </div>
                  </div>

                  {/* Individual / Enterprise toggle */}
                  <div className="mb-6 inline-flex w-full rounded-xl p-1"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {(["individual", "enterprise"] as const).map((t) => (
                      <button key={t} type="button" onClick={() => setTab(t)}
                        className="flex-1 rounded-lg py-3 min-h-[44px] text-sm font-medium transition-all duration-200"
                        style={tab === t
                          ? { background: "linear-gradient(135deg,#0694D1,#076D9D)", color: "#fff", boxShadow: "0 2px 12px rgba(6,148,209,0.35)" }
                          : { color: "rgba(255,255,255,0.45)" }}>
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

                  {/* Row 1: Full Name + Business Email */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
                      <input type="text" required placeholder="John Smith"
                        value={form.fullName} onChange={(e) => set("fullName", e.target.value)}
                        className={inputCls} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelCls}>Business Email <span className="text-red-400">*</span></label>
                      <input type="email" required placeholder="john@example.com"
                        value={form.email} onChange={(e) => set("email", e.target.value)}
                        className={inputCls} style={inputStyle} />
                    </div>
                  </div>

                  {/* Row 2: Phone + Course Name or Trainees */}
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input type="tel" placeholder="+91 98765 43210"
                        value={form.phone} onChange={(e) => set("phone", e.target.value)}
                        className={inputCls} style={inputStyle} />
                    </div>
                    {tab === "individual" ? (
                      <div>
                        <label className={labelCls}>Select Course Name</label>
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

                  {/* How did you hear about us */}
                  <div className="mt-3">
                    <label className={labelCls}>How did you hear about us?</label>
                    <div className="relative">
                      <select value={form.hearAbout} onChange={(e) => set("hearAbout", e.target.value)}
                        className="w-full appearance-none rounded-xl px-4 py-[11px] text-base outline-none transition-colors focus:border-[#0694D1]"
                        style={{ ...inputStyle, color: form.hearAbout ? "#fff" : "rgba(255,255,255,0.3)" }}>
                        <option value="" style={{ background: "#0a1929" }}>Select Option</option>
                        {hearOptions.map((o) => (
                          <option key={o} value={o} style={{ background: "#0a1929", color: "#fff" }}>{o}</option>
                        ))}
                      </select>
                      <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                        width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                  </div>

                  {/* Tell us more */}
                  <div className="mt-3">
                    <label className={labelCls}>Tell us more about your Training Request</label>
                    <textarea rows={4}
                      placeholder="e.g. We need Azure certification for 50 engineers across 3 countries..."
                      value={form.message} onChange={(e) => set("message", e.target.value)}
                      className="w-full resize-none rounded-xl px-4 py-3 text-base text-white placeholder-white/30 outline-none transition-colors focus:border-[#0694D1]"
                      style={inputStyle} />
                  </div>

                  {/* reCAPTCHA */}
                  <div className="mt-3 flex justify-center">
                    <div className="inline-flex items-center gap-3 rounded px-3 py-2"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }}>
                      <input type="checkbox" checked={robotChecked} onChange={(e) => setRobotChecked(e.target.checked)}
                        className="h-4 w-4 cursor-pointer rounded" />
                      <span className="text-sm text-white/70">I&apos;m not a robot</span>
                      <div className="ml-2 flex flex-col items-center">
                        <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
                          <path d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z" fill="#4A90D9"/>
                          <path d="M32 14c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18z" fill="white"/>
                          <path d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" fill="#4A90D9"/>
                          <path d="M32 26a6 6 0 100 12 6 6 0 000-12z" fill="white"/>
                        </svg>
                        <span className="text-[10px] text-white/35 leading-tight">reCAPTCHA</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <button type="submit"
                    className="mt-6 w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
                    style={{ background: "linear-gradient(135deg,#0694D1 0%,#076D9D 100%)", boxShadow: "0 0 28px rgba(6,148,209,0.40)" }}>
                    Submit — Get a Free Consultation
                  </button>
                  <p className="mt-3 text-center text-sm text-white/30">
                    We&apos;ll respond within 1 business day · No spam, ever.
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar — dark mode */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Regional phones */}
              <div className="flex-1 rounded-2xl p-4 sm:p-6 flex flex-col" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(6,148,209,0.2)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[#3AB6EB]"
                    style={{ background: "rgba(6,148,209,0.15)" }}>
                    <PhoneIcon cls="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-white">Call Us <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Directly</span></h3>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  {phoneRegions.map((r) => (
                    <a key={r.label} href={`tel:${r.phone.replace(/[\s()-]/g, "")}`}
                      className="group flex items-center justify-between py-2 px-3 rounded-xl transition-colors duration-150 min-h-[44px]"
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(6,148,209,0.12)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <div className="flex items-center gap-3">
                        <img src={`https://flagcdn.com/20x15/${flagCode(r.flag)}.png`} width={20} height={15} alt={r.label} className="rounded-[2px] shrink-0" />
                        <span className="text-sm sm:text-base text-white/60 group-hover:text-white font-medium transition-colors">{r.label}</span>
                      </div>
                      <span className="text-sm sm:text-base font-bold text-white/80 tabular-nums group-hover:text-[#3AB6EB] transition-colors">{r.phone}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Promise card */}
              <div className="rounded-2xl p-4 sm:p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(6,148,209,0.2)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[#3AB6EB]"
                    style={{ background: "rgba(6,148,209,0.15)" }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-base text-white">Our <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Promise</span></h3>
                </div>
                <div className="space-y-3">
                  {[
                    "Response within 24 hours",
                    "Dedicated training advisor",
                    "Custom roadmap for your goals",
                    "No spam — ever",
                  ].map((p) => (
                    <div key={p} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[#3AB6EB]"
                        style={{ background: "rgba(6,148,209,0.18)" }}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-base text-white/60">{p}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-white px-4 md:px-8 lg:px-[50px] py-[30px]">
        {/* subtle top glow to blend with dark section above */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16"
          style={{ background: "linear-gradient(to bottom, rgba(6,148,209,0.06) 0%, transparent 100%)" }} />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 overflow-hidden rounded-2xl"
            style={{ background: "linear-gradient(135deg,#EBF8FE 0%,#F4FBFF 100%)", border: "1px solid #CAEFFF", boxShadow: "0 6px 32px rgba(6,148,209,0.10)" }}>
            {[
              { value: "30+",    label: "Years Training Excellence", icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              )},
              { value: "5,000+", label: "Courses Available", icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              )},
              { value: "50+",    label: "Technology Vendors", icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                </svg>
              )},
              { value: "1993",   label: "Year Founded", icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                </svg>
              )},
            ].map((s, i) => (
              <div key={s.label} className="relative text-center py-4 px-1 sm:py-6 sm:px-4">
                {i > 0 && (
                  <div className="absolute left-0 top-1/4 h-1/2 w-px" style={{ background: "#CAEFFF" }} />
                )}
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 text-[#0694D1]"
                    style={{ background: "rgba(6,148,209,0.12)" }}>
                    {s.icon}
                  </div>
                  <p className="text-xl sm:text-2xl font-bold" style={{ color: "#0694D1" }}>{s.value}</p>
                </div>
                <div className="w-8 h-[2px] mx-auto mb-2 rounded-full" style={{ background: "rgba(6,148,209,0.30)" }} />
                <p className="text-xs sm:text-sm text-[#2d4a6a] font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          CTA STRIP — dark like homepage
      ══════════════════════════════════════════════ */}
      <section className="relative px-4 md:px-8 lg:px-[50px] py-[30px]"
        style={{ background: "linear-gradient(135deg,#061e30 0%,#093148 50%,#062240 100%)" }}>
        {/* Glow orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-1/4 h-[360px] w-[360px] rounded-full opacity-25"
            style={{ background: "radial-gradient(circle,#0694d1,transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle,#076d9d,transparent 70%)", filter: "blur(55px)" }} />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-8">
            <div>
              <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#3AB6EB]"
                style={{ background: "rgba(6,148,209,0.18)" }}>
                Need guidance?
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                Not sure which course is <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">right for you?</span>
              </h2>
              <p className="text-white/55 text-sm sm:text-base mt-2 sm:mt-3 max-w-md">
                Our advisors are available 24/7 to map your goals to the perfect certification path.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <a href="mailto:info@koenig-solutions.com"
                className="btn-shine inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 sm:px-7 sm:py-3.5 text-sm font-bold text-[#093148] bg-white transition-all duration-200 hover:bg-[#F0FAFF] hover:-translate-y-0.5 whitespace-nowrap min-h-[44px]"
                style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.18)" }}>
                <MailIcon cls="w-4 h-4" />
                Email Us Now
              </a>
              <button onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 sm:px-7 sm:py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap min-h-[44px]"
                style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.22)" }}>
                Fill in a Form
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

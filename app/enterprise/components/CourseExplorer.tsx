"use client";
import { useState, useEffect, useRef, useMemo } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Argentina","Australia","Austria","Bahrain","Bangladesh",
  "Belgium","Brazil","Canada","Chile","China","Colombia","Croatia","Czech Republic","Denmark",
  "Egypt","Ethiopia","Finland","France","Germany","Ghana","Greece","Hong Kong","Hungary",
  "India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Japan","Jordan","Kazakhstan",
  "Kenya","Kuwait","Lebanon","Malaysia","Mexico","Morocco","Netherlands","New Zealand",
  "Nigeria","Norway","Oman","Pakistan","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Saudi Arabia","Singapore","South Africa","South Korea","Spain","Sri Lanka",
  "Sweden","Switzerland","Taiwan","Thailand","Turkey","Ukraine","United Arab Emirates",
  "United Kingdom","United States","Venezuela","Vietnam","Zimbabwe",
];

/* ── Vendor brand logos (inline SVG) ────────────────── */
const techLogos: Record<string, JSX.Element> = {
  Microsoft: (
    <svg width="28" height="28" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  ),
  Cisco: (
    <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="2" width="4" height="8" rx="2" fill="#1BA0D7" />
      <rect x="4" y="8" width="4" height="7" rx="2" fill="#1BA0D7" opacity="0.75" />
      <rect x="24" y="8" width="4" height="7" rx="2" fill="#1BA0D7" opacity="0.75" />
      <rect x="9" y="6" width="4" height="9" rx="2" fill="#1BA0D7" opacity="0.9" />
      <rect x="19" y="6" width="4" height="9" rx="2" fill="#1BA0D7" opacity="0.9" />
      <rect x="1" y="11" width="3" height="5" rx="1.5" fill="#1BA0D7" opacity="0.5" />
      <rect x="28" y="11" width="3" height="5" rx="1.5" fill="#1BA0D7" opacity="0.5" />
      <path d="M6 22 Q16 26 26 22" stroke="#1BA0D7" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  AWS: (
    <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="aws-g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FF9900" /><stop offset="100%" stopColor="#FF6600" /></linearGradient></defs>
      <path d="M8 14 Q8 9 16 9 Q24 9 24 14" fill="none" stroke="url(#aws-g)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M5 14 Q5 7 16 7 Q27 7 27 14" fill="none" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <rect x="9" y="14" width="14" height="8" rx="3" fill="url(#aws-g)" />
      <path d="M6 26 Q16 30 26 26" stroke="#FF9900" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M24 24 l3 2 l-3 2" stroke="#FF9900" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  CompTIA: (
    <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="28" height="28" rx="4" fill="#C8202F" opacity="0.12" />
      <rect x="2" y="2" width="28" height="28" rx="4" fill="none" stroke="#C8202F" strokeWidth="1.8" />
      <path d="M9 16 Q9 10 16 10 Q20 10 22 13" fill="none" stroke="#C8202F" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3.5" fill="#C8202F" opacity="0.25" />
      <circle cx="16" cy="16" r="1.8" fill="#C8202F" />
      <path d="M10 22h12M12 19h8" stroke="#C8202F" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  VMware: (
    <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="vm-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#607078" /><stop offset="100%" stopColor="#405060" /></linearGradient></defs>
      <rect x="2" y="8" width="28" height="16" rx="4" fill="url(#vm-g)" opacity="0.2" />
      <rect x="2" y="8" width="28" height="16" rx="4" fill="none" stroke="#607078" strokeWidth="1.8" />
      <rect x="6" y="12" width="8" height="8" rx="2" fill="#607078" opacity="0.5" />
      <rect x="18" y="12" width="8" height="8" rx="2" fill="#607078" opacity="0.5" />
      <path d="M14 16h4" stroke="#607078" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="16" r="2" fill="#607078" />
      <circle cx="22" cy="16" r="2" fill="#607078" />
    </svg>
  ),
  Oracle: (
    <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="16" rx="13" ry="8" fill="none" stroke="#F80000" strokeWidth="2.4" />
    </svg>
  ),
  "Red Hat": (
    <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 20c0-6 4.5-13 10-13s10 7 10 13c0 2-4.5 3.5-10 3.5S6 22 6 20z" fill="#EE0000" opacity="0.85" />
      <ellipse cx="16" cy="21" rx="10" ry="3" fill="#151515" />
    </svg>
  ),
  PMI: (
    <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="26" height="26" rx="5" fill="none" stroke="#00558C" strokeWidth="2.2" />
      <path d="M10 22V10h6a4 4 0 0 1 0 8h-6" fill="none" stroke="#00558C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "EC-Council": (
    <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3l11 5v8c0 7-4.7 12-11 13-6.3-1-11-6-11-13V8z" fill="none" stroke="#C8102E" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M11 16l3.5 3.5L21 12" fill="none" stroke="#C8102E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const technologies = [
  {
    name: "Microsoft",
    desc: "Master Microsoft's full certification portfolio — Azure, AI, Power Platform, Security, M365 and more.",
    courses: [
      { title: "Microsoft Azure Fundamentals", code: "AZ-900", level: "fund", price: 24900, days: 2, hours: 16, enrolled: "8,000+", rating: 4.8 },
      { title: "Microsoft Azure Data Fundamentals", code: "DP-900", level: "fund", price: 24900, days: 2, hours: 16, enrolled: "4,200+", rating: 4.7 },
      { title: "Microsoft Azure AI Fundamentals", code: "AI-900", level: "fund", price: 24900, days: 2, hours: 16, enrolled: "3,800+", rating: 4.6 },
      { title: "Power Platform Fundamentals", code: "PL-900", level: "fund", price: 24900, days: 2, hours: 16, enrolled: "5,100+", rating: 4.7 },
      { title: "Security, Compliance, Identity Fundamentals", code: "SC-900", level: "fund", price: 24900, days: 2, hours: 16, enrolled: "4,300+", rating: 4.7 },
      { title: "Microsoft 365 Fundamentals", code: "MS-900", level: "fund", price: 24900, days: 2, hours: 16, enrolled: "6,400+", rating: 4.8 },
      { title: "Dynamics 365 Fundamentals (CRM)", code: "MB-910", level: "fund", price: 24900, days: 2, hours: 16, enrolled: "3,800+", rating: 4.6 },
      { title: "Microsoft Azure Administrator", code: "AZ-104", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "12,000+", rating: 4.9 },
      { title: "Azure Virtual Desktop Specialty", code: "AZ-140", level: "assoc", price: 49900, days: 2, hours: 16, enrolled: "3,500+", rating: 4.7 },
      { title: "Azure Network Engineer Associate", code: "AZ-700", level: "assoc", price: 49900, days: 2, hours: 16, enrolled: "4,100+", rating: 4.8 },
      { title: "Azure Security Technologies", code: "AZ-500", level: "assoc", price: 74900, days: 3, hours: 24, enrolled: "6,300+", rating: 4.8 },
      { title: "Azure Database Administrator Associate", code: "DP-300", level: "assoc", price: 74900, days: 3, hours: 24, enrolled: "3,900+", rating: 4.7 },
      { title: "Azure AI Engineer Associate", code: "AI-102", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "5,000+", rating: 4.8 },
      { title: "Azure Data Scientist Associate", code: "DP-100", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "3,600+", rating: 4.7 },
      { title: "Power Platform Functional Consultant", code: "PL-200", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "4,800+", rating: 4.8 },
      { title: "Power Platform Developer", code: "PL-400", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "3,900+", rating: 4.7 },
      { title: "Power BI Data Analyst", code: "PL-300", level: "assoc", price: 74900, days: 3, hours: 24, enrolled: "7,200+", rating: 4.9 },
      { title: "Identity and Access Administrator", code: "SC-300", level: "assoc", price: 74900, days: 3, hours: 24, enrolled: "3,500+", rating: 4.8 },
      { title: "Information Protection Administrator", code: "SC-400", level: "assoc", price: 74900, days: 3, hours: 24, enrolled: "2,700+", rating: 4.6 },
      { title: "Microsoft 365 Administrator", code: "MS-102", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "5,300+", rating: 4.9 },
      { title: "Teams Administrator Associate", code: "MS-700", level: "assoc", price: 74900, days: 3, hours: 24, enrolled: "4,000+", rating: 4.7 },
      { title: "Dynamics 365 Sales Functional Consultant", code: "MB-210", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "4,200+", rating: 4.7 },
      { title: "Data Engineering on Azure", code: "DP-203", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "5,500+", rating: 4.8 },
      { title: "Fabric Analytics Engineer", code: "DP-600", level: "assoc", price: 74900, days: 3, hours: 24, enrolled: "3,100+", rating: 4.7 },
      { title: "Azure Developer Associate", code: "AZ-204", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "6,100+", rating: 4.8 },
      { title: "Windows Server Hybrid Administrator", code: "AZ-800", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "3,800+", rating: 4.7 },
      { title: "Windows Server Hybrid Advanced Services", code: "AZ-801", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "3,200+", rating: 4.6 },
      { title: "Designing Microsoft Azure Infrastructure Solutions", code: "AZ-305T00", level: "expert", price: 99900, days: 4, hours: 32, enrolled: "4,000+", rating: 4.8 },
      { title: "Designing and Implementing Microsoft DevOps Solutions", code: "AZ-400T00-A", level: "expert", price: 99900, days: 4, hours: 32, enrolled: "3,700+", rating: 4.8 },
      { title: "Azure Solutions Architect Expert - Exam Prep", code: "AZ-305", level: "expert", price: 24900, days: 1, hours: 8, enrolled: "2,100+", rating: 4.9 },
      { title: "DevOps Engineer Expert", code: "AZ-400", level: "expert", price: 124900, days: 5, hours: 40, enrolled: "4,700+", rating: 4.9 },
      { title: "Power Platform Solution Architect", code: "PL-600", level: "expert", price: 124900, days: 5, hours: 40, enrolled: "2,200+", rating: 4.8 },
      { title: "Architecting Cloud-Native .NET Apps for Azure", code: "AZ-Arch", level: "expert", price: 124900, days: 5, hours: 40, enrolled: "1,900+", rating: 4.7 },
      { title: "Microsoft Azure Administration and Networking Masterclass", code: "AZ-Master", level: "expert", price: 124900, days: 5, hours: 40, enrolled: "2,300+", rating: 4.9 },
    ],
  },
  {
    name: "Cisco",
    desc: "Master networking, security, and collaboration with industry-leading Cisco certifications.",
    courses: [
      { title: "CCNA (Cisco Certified Network Associate)", code: "200-301", level: "fund", price: 49900, days: 5, hours: 40, enrolled: "12,500+", rating: 4.9 },
      { title: "CyberOps Associate", code: "200-201", level: "fund", price: 49900, days: 5, hours: 40, enrolled: "4,800+", rating: 4.7 },
      { title: "DevNet Associate", code: "200-901", level: "fund", price: 49900, days: 4, hours: 32, enrolled: "3,200+", rating: 4.6 },
      { title: "CCNP Enterprise Core (ENCOR)", code: "350-401", level: "assoc", price: 99900, days: 5, hours: 40, enrolled: "8,200+", rating: 4.8 },
      { title: "CCNP Security Core (SCOR)", code: "350-701", level: "assoc", price: 99900, days: 5, hours: 40, enrolled: "5,100+", rating: 4.7 },
      { title: "CCNP Data Center Core (DCCOR)", code: "350-601", level: "assoc", price: 99900, days: 5, hours: 40, enrolled: "3,400+", rating: 4.6 },
      { title: "Cisco Certified Specialist — Enterprise Advanced", code: "300-415", level: "assoc", price: 74900, days: 4, hours: 32, enrolled: "2,900+", rating: 4.7 },
      { title: "CCIE Enterprise Infrastructure", code: "CCIE-EI", level: "expert", price: 199900, days: 10, hours: 80, enrolled: "1,800+", rating: 4.9 },
      { title: "CCIE Security", code: "CCIE-SEC", level: "expert", price: 199900, days: 10, hours: 80, enrolled: "1,400+", rating: 4.8 },
    ],
  },
  {
    name: "AWS",
    desc: "Validate cloud expertise with Amazon Web Services certifications across all levels.",
    courses: [
      { title: "AWS Cloud Practitioner", code: "CLF-C02", level: "fund", price: 24900, days: 2, hours: 16, enrolled: "15,000+", rating: 4.9 },
      { title: "AWS Solutions Architect Associate", code: "SAA-C03", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "18,500+", rating: 4.9 },
      { title: "AWS Developer Associate", code: "DVA-C02", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "9,200+", rating: 4.8 },
      { title: "AWS SysOps Administrator Associate", code: "SOA-C02", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "6,400+", rating: 4.7 },
      { title: "AWS Data Engineer Associate", code: "DEA-C01", level: "assoc", price: 74900, days: 3, hours: 24, enrolled: "4,100+", rating: 4.7 },
      { title: "AWS Solutions Architect Professional", code: "SAP-C02", level: "expert", price: 124900, days: 5, hours: 40, enrolled: "4,800+", rating: 4.8 },
      { title: "AWS DevOps Engineer Professional", code: "DOP-C02", level: "expert", price: 124900, days: 5, hours: 40, enrolled: "3,600+", rating: 4.8 },
      { title: "AWS Security Specialty", code: "SCS-C02", level: "expert", price: 99900, days: 4, hours: 32, enrolled: "3,200+", rating: 4.7 },
      { title: "AWS Machine Learning Specialty", code: "MLS-C01", level: "expert", price: 99900, days: 4, hours: 32, enrolled: "2,800+", rating: 4.7 },
    ],
  },
  {
    name: "CompTIA",
    desc: "Build foundational IT skills with vendor-neutral CompTIA certifications trusted worldwide.",
    courses: [
      { title: "CompTIA IT Fundamentals (ITF+)", code: "FC0-U61", level: "fund", price: 24900, days: 2, hours: 16, enrolled: "6,200+", rating: 4.6 },
      { title: "CompTIA A+", code: "220-1102", level: "fund", price: 49900, days: 5, hours: 40, enrolled: "9,800+", rating: 4.8 },
      { title: "CompTIA Network+", code: "N10-009", level: "assoc", price: 49900, days: 5, hours: 40, enrolled: "7,400+", rating: 4.7 },
      { title: "CompTIA Security+", code: "SY0-701", level: "assoc", price: 49900, days: 5, hours: 40, enrolled: "11,200+", rating: 4.9 },
      { title: "CompTIA CySA+", code: "CS0-003", level: "assoc", price: 74900, days: 5, hours: 40, enrolled: "4,600+", rating: 4.7 },
      { title: "CompTIA PenTest+", code: "PT0-003", level: "assoc", price: 74900, days: 5, hours: 40, enrolled: "3,100+", rating: 4.6 },
      { title: "CompTIA CASP+", code: "CAS-004", level: "expert", price: 99900, days: 5, hours: 40, enrolled: "2,400+", rating: 4.8 },
    ],
  },
  {
    name: "VMware",
    desc: "Advance virtualisation, cloud, and networking skills with VMware by Broadcom certifications.",
    courses: [
      { title: "VMware vSphere: Install, Configure, Manage", code: "VCP-DCV", level: "fund", price: 74900, days: 5, hours: 40, enrolled: "5,300+", rating: 4.8 },
      { title: "VMware vSphere: Optimize and Scale", code: "VCP-OPT", level: "assoc", price: 74900, days: 4, hours: 32, enrolled: "3,200+", rating: 4.7 },
      { title: "VMware NSX: Install, Configure, Manage", code: "VCP-NV", level: "assoc", price: 99900, days: 5, hours: 40, enrolled: "2,800+", rating: 4.7 },
      { title: "VMware Horizon: Install, Configure, Manage", code: "VCP-DTM", level: "assoc", price: 74900, days: 4, hours: 32, enrolled: "2,100+", rating: 4.6 },
      { title: "VMware vSphere with Tanzu", code: "VCP-Tanzu", level: "expert", price: 99900, days: 4, hours: 32, enrolled: "1,600+", rating: 4.7 },
      { title: "VMware Cloud on AWS: Management and Operations", code: "VCP-AWS", level: "expert", price: 99900, days: 4, hours: 32, enrolled: "1,400+", rating: 4.6 },
    ],
  },
  {
    name: "Oracle",
    desc: "Build database, cloud, and applications expertise with official Oracle certifications.",
    courses: [
      { title: "Oracle Cloud Infrastructure Foundations", code: "1Z0-1085", level: "fund", price: 24900, days: 2, hours: 16, enrolled: "2,900+", rating: 4.6 },
      { title: "Oracle Database Administration", code: "1Z0-082", level: "assoc", price: 74900, days: 5, hours: 40, enrolled: "4,100+", rating: 4.7 },
      { title: "Oracle Cloud Infrastructure Architect Associate", code: "1Z0-1072", level: "assoc", price: 74900, days: 4, hours: 32, enrolled: "2,300+", rating: 4.6 },
      { title: "Oracle Fusion Cloud Applications Developer", code: "1Z0-1042", level: "assoc", price: 99900, days: 5, hours: 40, enrolled: "1,700+", rating: 4.5 },
      { title: "Oracle Cloud Infrastructure Architect Professional", code: "1Z0-997", level: "expert", price: 124900, days: 5, hours: 40, enrolled: "1,200+", rating: 4.7 },
    ],
  },
  {
    name: "Red Hat",
    desc: "Master enterprise Linux, automation, and OpenShift with Red Hat's hands-on certifications.",
    courses: [
      { title: "Red Hat Certified System Administrator (RHCSA)", code: "EX200", level: "fund", price: 74900, days: 5, hours: 40, enrolled: "6,300+", rating: 4.8 },
      { title: "Red Hat Certified Engineer (RHCE)", code: "EX294", level: "assoc", price: 99900, days: 5, hours: 40, enrolled: "3,900+", rating: 4.8 },
      { title: "Red Hat OpenShift Administration", code: "DO280", level: "assoc", price: 99900, days: 4, hours: 32, enrolled: "2,600+", rating: 4.7 },
      { title: "Ansible Automation Platform Essentials", code: "DO407", level: "assoc", price: 74900, days: 4, hours: 32, enrolled: "2,100+", rating: 4.7 },
      { title: "Red Hat Certified Architect (RHCA)", code: "RHCA", level: "expert", price: 149900, days: 8, hours: 64, enrolled: "900+", rating: 4.9 },
    ],
  },
  {
    name: "PMI",
    desc: "Advance project and program management careers with globally recognised PMI credentials.",
    courses: [
      { title: "Certified Associate in Project Management (CAPM)", code: "CAPM", level: "fund", price: 49900, days: 3, hours: 24, enrolled: "5,200+", rating: 4.7 },
      { title: "Project Management Professional (PMP)", code: "PMP", level: "assoc", price: 99900, days: 5, hours: 40, enrolled: "14,800+", rating: 4.9 },
      { title: "Agile Certified Practitioner (PMI-ACP)", code: "PMI-ACP", level: "assoc", price: 74900, days: 4, hours: 32, enrolled: "4,300+", rating: 4.8 },
      { title: "Risk Management Professional (PMI-RMP)", code: "PMI-RMP", level: "expert", price: 99900, days: 4, hours: 32, enrolled: "1,500+", rating: 4.7 },
      { title: "Program Management Professional (PgMP)", code: "PgMP", level: "expert", price: 124900, days: 5, hours: 40, enrolled: "800+", rating: 4.8 },
    ],
  },
  {
    name: "EC-Council",
    desc: "Build offensive and defensive cybersecurity expertise with EC-Council's globally recognised credentials.",
    courses: [
      { title: "Certified Cybersecurity Technician (CCT)", code: "CCT", level: "fund", price: 49900, days: 3, hours: 24, enrolled: "3,100+", rating: 4.6 },
      { title: "Certified Ethical Hacker (CEH v13)", code: "CEH", level: "assoc", price: 99900, days: 5, hours: 40, enrolled: "9,600+", rating: 4.8 },
      { title: "Computer Hacking Forensic Investigator (CHFI)", code: "CHFI", level: "assoc", price: 99900, days: 5, hours: 40, enrolled: "2,400+", rating: 4.7 },
      { title: "Certified Network Defender (CND)", code: "CND", level: "assoc", price: 74900, days: 4, hours: 32, enrolled: "2,100+", rating: 4.6 },
      { title: "Certified Chief Information Security Officer (CCISO)", code: "CCISO", level: "expert", price: 149900, days: 5, hours: 40, enrolled: "700+", rating: 4.8 },
    ],
  },
];

const DURATION_OPTS = [
  { key: "4hrs",  label: "4 hrs",  sub: "½ day"   },
  { key: "8hrs",  label: "8 hrs",  sub: "1 day"   },
  { key: "16hrs", label: "16 hrs", sub: "2 days"  },
  { key: "24hrs", label: "24 hrs", sub: "3 days"  },
  { key: "32hrs", label: "32 hrs", sub: "4 days"  },
  { key: "more",  label: "More",   sub: "5+ days" },
];

const ITEMS_PER_PAGE = 12;

export default function CourseExplorer() {
  const [activeTechName, setActiveTechName] = useState("");
  const [techSearch, setTechSearch]         = useState("");
  const [activeLevels, setActiveLevels]     = useState<Set<string>>(new Set());
  const [activeDurations, setActiveDurations] = useState<Set<string>>(new Set());
  const [certSearch, setCertSearch]         = useState("");
  const [certSort, setCertSort]             = useState("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filterCategory, setFilterCategory]     = useState<"level"|"duration">("level");
  const [filterSearch, setFilterSearch]         = useState("");
  const [techSheetOpen, setTechSheetOpen]       = useState(false);
  const [currentPage, setCurrentPage]       = useState(1);
  const [syllabusOpen, setSyllabusOpen]     = useState(false);
  const [sylSubmitted, setSylSubmitted]     = useState(false);
  const [sylName, setSylName]               = useState("");
  const [sylEmail, setSylEmail]             = useState("");
  const [sylCourse, setSylCourse]           = useState("");
  const [sylCountry, setSylCountry]         = useState("");
  const [sylCountryOpen, setSylCountryOpen] = useState(false);
  const [reqInfoOpen, setReqInfoOpen]       = useState(false);
  const [reqCaptcha, setReqCaptcha]         = useState(false);
  const [reqSubmitted, setReqSubmitted]     = useState(false);
  const [reqForm, setReqForm]               = useState({ name: "", email: "", phone: "", course: "", trainees: "", source: "", message: "" });
  const [enquireOpen, setEnquireOpen]       = useState(false);
  const [enquireCourse, setEnquireCourse]   = useState<{ code: string; title: string } | null>(null);
  const [enqName, setEnqName]               = useState("");
  const [enqEmail, setEnqEmail]             = useState("");
  const [enqPhone, setEnqPhone]             = useState("");
  const [enqCaptcha, setEnqCaptcha]         = useState(false);
  const [enqSubmitted, setEnqSubmitted]     = useState(false);

  const closeEnquireModal = () => {
    setEnquireOpen(false); setEnqSubmitted(false); setEnqName(""); setEnqEmail(""); setEnqPhone(""); setEnqCaptcha(false); setEnquireCourse(null);
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const sylCountryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sylCountryRef.current && !sylCountryRef.current.contains(e.target as Node)) {
        setSylCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeTech = useMemo(
    () => (activeTechName ? technologies.find(t => t.name === activeTechName) ?? null : null),
    [activeTechName]
  );

  const totalCount = useMemo(() => technologies.reduce((s, t) => s + t.courses.length, 0), []);

  const basePool = useMemo(
    () => activeTech ? activeTech.courses : technologies.flatMap(t => t.courses),
    [activeTechName] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const levelCounts = useMemo(() => ({
    fund:   basePool.filter(c => c.level === "fund").length,
    assoc:  basePool.filter(c => c.level === "assoc").length,
    expert: basePool.filter(c => c.level === "expert").length,
  }), [basePool]);

  const toggleLevel = (k: string) =>
    setActiveLevels(prev => { const n = new Set(prev); n.has(k) ? n.delete(k) : n.add(k); return n; });

  const toggleDuration = (k: string) =>
    setActiveDurations(prev => { const n = new Set(prev); n.has(k) ? n.delete(k) : n.add(k); return n; });

  const clearAllFilters = () => { setActiveLevels(new Set()); setActiveDurations(new Set()); };

  const filteredCourses = useMemo(() => {
    let arr = basePool.filter(c => {
      if (activeLevels.size > 0 && !activeLevels.has(c.level)) return false;
      if (activeDurations.size > 0) {
        const ok = (activeDurations.has("4hrs")  && c.hours <= 4) ||
                   (activeDurations.has("8hrs")  && c.hours === 8) ||
                   (activeDurations.has("16hrs") && c.hours === 16) ||
                   (activeDurations.has("24hrs") && c.hours === 24) ||
                   (activeDurations.has("32hrs") && c.hours === 32) ||
                   (activeDurations.has("more")  && c.hours >= 40);
        if (!ok) return false;
      }
      if (certSearch) {
        const q = certSearch.toLowerCase();
        if (!c.title.toLowerCase().includes(q) && !c.code.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    if (certSort === "new")        arr = [...arr].reverse();
    if (certSort === "price-desc") arr = [...arr].sort((a, b) => b.price - a.price);
    if (certSort === "price-asc")  arr = [...arr].sort((a, b) => a.price - b.price);
    return arr;
  }, [basePool, activeLevels, activeDurations, certSearch, certSort]);

  useEffect(() => { setCurrentPage(1); }, [activeTechName, activeLevels, activeDurations, certSearch, certSort]);

  const totalPages  = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE));
  const pagedCourses = filteredCourses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalActiveFilters = activeLevels.size + activeDurations.size;

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".animate-on-scroll").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handler = () => {
      setReqSubmitted(false);
      setReqForm({ name: "", email: "", phone: "", course: "", trainees: "", source: "", message: "" });
      setReqCaptcha(false);
      setReqInfoOpen(true);
    };
    window.addEventListener("openContactModal", handler);
    return () => window.removeEventListener("openContactModal", handler);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const course = ((e as CustomEvent).detail?.course) as (string | undefined);
      setSylCourse(course ?? "");
      setSylSubmitted(false);
      setSylName("");
      setSylEmail("");
      setSyllabusOpen(true);
    };
    window.addEventListener("openSyllabusModal", handler);
    return () => window.removeEventListener("openSyllabusModal", handler);
  }, []);

  const paginationNums = useMemo((): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const p: (number | "...")[] = [];
    if (currentPage <= 4)              { [1,2,3,4,5,"...",totalPages].forEach(x => p.push(x as number | "...")); }
    else if (currentPage >= totalPages - 3) { p.push(1,"..."); for (let i = totalPages-4; i <= totalPages; i++) p.push(i); }
    else                               { p.push(1,"...",currentPage-1,currentPage,currentPage+1,"...",totalPages); }
    return p;
  }, [currentPage, totalPages]);

  const mobilePaginationNums = useMemo((): (number | "...")[] => {
    if (totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage === 1)              return [1, 2, "...", totalPages];
    if (currentPage === totalPages)     return [1, "...", totalPages - 1, totalPages];
    if (currentPage === totalPages - 1) return [1, "...", totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, "...", totalPages];
  }, [currentPage, totalPages]);

  const LEVELS = [
    { key: "fund",   label: "Fundamentals", count: levelCounts.fund   },
    { key: "assoc",  label: "Associate",    count: levelCounts.assoc  },
    { key: "expert", label: "Expert",       count: levelCounts.expert },
  ];

  const filteredTechList = technologies.filter(
    t => !techSearch || t.name.toLowerCase().includes(techSearch.toLowerCase())
  );

  return (
    <section
      ref={sectionRef}
      id="cert"
      aria-labelledby="cert-explorer-heading"
      style={{ background: "#F5F8FB", padding: "30px 16px", borderTop: "1px solid #CAEFFF", overflow: "clip" }}
    >
      <div style={{ maxWidth: 1340, margin: "0 auto" }}>

        {/* ── Header ─────────────────────────────────── */}
        <div style={{ marginBottom: 20 }}>
          <div className="certs-header-row" style={{ justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ flex: "0 0 60px", height: 1.5, background: "linear-gradient(to left,#0694D1,transparent)", borderRadius: 2 }} />
                <span style={{ color: "#0694D1", fontSize: 14, fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1 }}>//</span>
                <span style={{ color: "#0694D1", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1 }}>ENTERPRISE TRAINING</span>
                <span style={{ flex: "0 0 60px", height: 1.5, background: "linear-gradient(to right,#0694D1,transparent)", borderRadius: 2 }} />
              </div>
              <h2 id="cert-explorer-heading" style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 800, color: "#0f1f3d", margin: "0 0 8px", lineHeight: 1.3 }}>
                Enterprise{" "}
                <em style={{ fontStyle: "normal", background: "linear-gradient(to right,#0694d1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Course Catalog
                </em>
              </h2>
              <p style={{ fontSize: 14, color: "#6b8499", margin: "0 auto", maxWidth: 580, lineHeight: 1.6 }}>
                Browse certification courses across Microsoft, Cisco, AWS, CompTIA, VMware and more — tailored for your team&apos;s training goals.
              </p>
            </div>
          </div>
        </div>

        {/* ── Layout: sidebar + right ─────────────────── */}
        <div className="animate-on-scroll certs-layout" style={{ transitionDelay: "0.06s" }}>

          {/* ── Sidebar ── */}
          <div className="cert-sidebar">
            {/* Vendor label */}
            <div className="cert-sidebar-label" style={{ padding: "12px 14px 4px", flexShrink: 0 }}>Vendors</div>

            {/* Tech search */}
            <div style={{ padding: "4px 14px 6px", flexShrink: 0 }}>
              <div className="cert-tech-search-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.7 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input
                  type="text"
                  placeholder="Search Vendor..."
                  value={techSearch}
                  onChange={e => setTechSearch(e.target.value)}
                  style={{ flex: 1, minWidth: 0, fontSize: 12, fontWeight: 500, color: "#0f1f3d", background: "transparent", border: "none", outline: "none", fontFamily: "inherit" }}
                />
                {techSearch && (
                  <button onClick={() => setTechSearch("")} style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(0,0,0,0.07)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b8499", fontFamily: "inherit", fontSize: 14, lineHeight: 1 }}>×</button>
                )}
              </div>
            </div>

            {/* Tech list — scrollable */}
            <div className="cert-tech-scroll">
              {!techSearch && (
                <button className={`cert-sidebar-item${activeTechName === "" ? " active" : ""}`} onClick={() => setActiveTechName("")}>
                  <span className="csi-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  </span>
                  <div className="csi-body"><span className="csi-label">All Courses</span></div>
                  <span className="csi-count">{totalCount}</span>
                </button>
              )}
              {filteredTechList.map(t => (
                <button
                  key={t.name}
                  className={`cert-sidebar-item${activeTechName === t.name ? " active" : ""}`}
                  onClick={() => setActiveTechName(activeTechName === t.name ? "" : t.name)}
                >
                  <span className={`csi-radio${activeTechName === t.name ? " active" : ""}`}><span className="csi-radio-dot" /></span>
                  <div className="csi-body"><span className="csi-label">{t.name}</span></div>
                  <span className="csi-count">{t.courses.length}</span>
                </button>
              ))}
            </div>

            {/* Level + Duration filters — always visible, no scroll */}
            <div className="cert-sidebar-filters">

              <div className="cert-sidebar-label">Level</div>
              <div className="cert-filter-list">
                {LEVELS.map(lv => (
                  <button key={lv.key} className={`cert-filter-item${activeLevels.has(lv.key) ? " active" : ""}`} onClick={() => toggleLevel(lv.key)}>
                    <span className="cert-filter-checkbox">
                      {activeLevels.has(lv.key) && (
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      )}
                    </span>
                    <span className="cert-filter-label">{lv.label}</span>
                    <span className="cert-filter-count">{lv.count}</span>
                  </button>
                ))}
              </div>

              <div className="cert-sidebar-divider-line" />
              <div className="cert-sidebar-label">Duration</div>
              <div className="cert-filter-list">
                {DURATION_OPTS.map(d => (
                  <button key={d.key} className={`cert-filter-item${activeDurations.has(d.key) ? " active" : ""}`} onClick={() => toggleDuration(d.key)}>
                    <span className="cert-filter-checkbox">
                      {activeDurations.has(d.key) && (
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      )}
                    </span>
                    <span className="cert-filter-label">{d.label}</span>
                    <span className="cert-filter-count">{d.sub}</span>
                  </button>
                ))}
              </div>
              <div style={{ height: 12 }} />
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className="cert-right">

            {/* Tech info strip — always visible */}
            <div className="cert-tech-strip">
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#0f1f3d", lineHeight: 1.2, marginBottom: 3 }}>
                  {activeTech ? activeTech.name : "All Courses"}
                </div>
                <div style={{ fontSize: 12, color: "#6b8499", lineHeight: 1.5 }}>
                  {activeTech ? activeTech.desc : "Browse all certification courses across Microsoft, Cisco, AWS, CompTIA, VMware and more"}
                </div>
              </div>
            </div>

            {/* Mobile-only: count + Request More Info + Technology selector */}
            <div className="cf-mobile-controls">
              <div className="cf-mobile-count">Showing {filteredCourses.length} courses</div>
              <button className="cf-mobile-req-btn" onClick={() => setReqInfoOpen(true)}>
                Request More Info
              </button>
              <button className="cf-mobile-tech-selector" onClick={() => setTechSheetOpen(true)}>
                <svg className="cf-mobile-tech-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                <span className="cf-mobile-tech-label">Technology: {activeTechName || "All Courses"}</span>
                <svg className="cf-mobile-tech-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>

            {/* Filter bar */}
            <div className="cf-bar">
              <div className="cf-search-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.8 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input
                  className="cf-search-input"
                  type="text"
                  placeholder={`Search ${activeTechName || "Microsoft"} courses…`}
                  value={certSearch}
                  onChange={e => setCertSearch(e.target.value)}
                  onKeyDown={e => e.key === "Escape" && setCertSearch("")}
                />
                {certSearch && (
                  <button className="cf-search-clear" onClick={() => setCertSearch("")} title="Clear">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                )}
              </div>
              <div className="cf-bar-right">
                <div className="cf-sort-wrap">
                  <svg className="cf-sort-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="9" y1="18" x2="15" y2="18"/></svg>
                  <select className="cf-sort" value={certSort} onChange={e => setCertSort(e.target.value)}>
                    <option value="">Sort: Popular</option>
                    <option value="new">Sort: New Course</option>
                    <option value="price-desc">Fees: High to Low</option>
                    <option value="price-asc">Fees: Low to High</option>
                  </select>
                </div>
                <span className="cf-result-count-inline">Showing {filteredCourses.length} courses</span>
                <button className="cf-filter-btn-mobile" onClick={() => setFilterDrawerOpen(true)} aria-label="Open filters">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
                  Filters
                  {totalActiveFilters > 0 && <span className="cf-filter-badge-mobile">{totalActiveFilters}</span>}
                </button>
              </div>
            </div>


            {/* Card grid */}
            <div className="cert-panel-scroll">
              <div className="cert-grid">
                {pagedCourses.map((course, i) => (
                  <div key={`${course.code}-${i}`} className="cert-card">
                    {/* Popular badge */}
                    {course.enrolled && (
                      <span className="cert-hot-badge">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c0 0-5.5 6-5.5 10.5a5.5 5.5 0 0 0 11 0C17.5 8 12 2 12 2z"/></svg>
                        Popular
                      </span>
                    )}

                    {/* Level badge */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 6, marginTop: -8 }}>
                      <span className={`cert-badge ${course.level}`}>
                        {course.level === "fund" ? (
                          <><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M5 3a7 7 0 0 0 7 7 7 7 0 0 0 7-7"/></svg>Fundamentals</>
                        ) : course.level === "assoc" ? (
                          <><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>Associate</>
                        ) : (
                          <><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7l4 9h12l4-9-6 4-4-6-4 6z"/></svg>Expert</>
                        )}
                      </span>
                    </div>

                    {/* Name + tooltip */}
                    <div
                      className="cert-name-wrap"
                      onMouseEnter={e => { const n = e.currentTarget.querySelector(".cert-name"); if (n && n.scrollHeight > n.clientHeight) e.currentTarget.classList.add("show-tip"); }}
                      onMouseLeave={e => e.currentTarget.classList.remove("show-tip")}
                    >
                      <div className="cert-name">{course.title}</div>
                      <div className="cert-name-tooltip">{course.title}</div>
                    </div>

                    {/* Download syllabus link */}
                    <button
                      className="cert-syllabus-link"
                      onClick={() => { setSylCourse(`${course.code}: ${course.title}`); setSyllabusOpen(true); }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download Syllabus
                    </button>

                    {/* Code + duration */}
                    <div className="cert-code-row">
                      <span className="cert-code">{course.code}</span>
                      <span className="cert-hours">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {course.days} day{course.days !== 1 ? "s" : ""} · {course.hours}hrs
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="cert-footer">
                      <div className="cert-price-row">
                        {course.enrolled && (
                          <span className="cert-enrolled">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            {course.enrolled}
                            {(course as { rating?: number }).rating && (
                              <><span className="cert-star">★</span><span className="cert-rating-num">{(course as { rating?: number }).rating}</span></>
                            )}
                          </span>
                        )}
                        <div className="cert-price">
                          <span className="cert-price-curr">INR</span>
                          <span className="cert-price-amount">{course.price.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                      <div className="cert-actions">
                        <a href="#contact" className="cert-btn-view">View Course</a>
                        <button className="cert-btn-enquire" onClick={() => { setEnquireCourse({ code: course.code, title: course.title }); setEnquireOpen(true); }}>
                          Enquire now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredCourses.length === 0 && (
                  <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 0" }}>
                    <p style={{ fontSize: 13, color: "#94A3B8" }}>No courses found{certSearch ? ` for "${certSearch}"` : ""}.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <>
                  {/* Desktop pagination */}
                  <div className="cert-pagination cert-pagination-desktop">
                    <button className="cert-pg-arrow" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    {paginationNums.map((p, i) =>
                      p === "..." ? (
                        <span key={`e-${i}`} className="cert-pg-ellipsis">…</span>
                      ) : (
                        <button key={p} className={`cert-pg-num${currentPage === p ? " active" : ""}`} onClick={() => setCurrentPage(p as number)}>{p}</button>
                      )
                    )}
                    <button className="cert-pg-arrow" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>

                  {/* Mobile pagination */}
                  <div className="cert-pagination cert-pagination-mobile">
                    <button className="cert-pg-arrow" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    {mobilePaginationNums.map((p, i) =>
                      p === "..." ? (
                        <span key={`e-${i}`} className="cert-pg-ellipsis">…</span>
                      ) : (
                        <button key={p} className={`cert-pg-num${currentPage === p ? " active" : ""}`} onClick={() => setCurrentPage(p as number)}>{p}</button>
                      )
                    )}
                    <button className="cert-pg-arrow" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>


        {/* ── Filter popup modal ──────────────────── */}
        {filterDrawerOpen && (() => {
          const FILTER_CATS = [
            { key: "level",    label: "Skill Level" },
            { key: "duration", label: "Duration" },
          ] as const;
          const levelItems = LEVELS.filter(l =>
            !filterSearch || l.label.toLowerCase().includes(filterSearch.toLowerCase())
          );
          const durationItems = DURATION_OPTS.filter(d =>
            !filterSearch || d.label.toLowerCase().includes(filterSearch.toLowerCase())
          );
          return (
            <>
              <div className="cf-overlay" onClick={() => { setFilterDrawerOpen(false); setFilterSearch(""); }} />
              <div className="cf-filter-popup">
                {/* Header */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #e8f1fb", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#0a1f33" }}>Filter</span>
                  <button type="button" onClick={() => { setFilterDrawerOpen(false); setFilterSearch(""); }} style={{ width: 28, height: 28, borderRadius: "50%", background: "#f0f6fb", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b8299", zIndex: 1002, position: "relative" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                {/* Body: left tabs + right list */}
                <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
                  {/* Left category tabs */}
                  <div style={{ width: 120, flexShrink: 0, borderRight: "1px solid #e8f1fb", overflowY: "auto", background: "#fafcff" }}>
                    {FILTER_CATS.map(cat => (
                      <button key={cat.key} onClick={() => { setFilterCategory(cat.key); setFilterSearch(""); }} style={{
                        width: "100%", textAlign: "left", padding: "14px 16px", border: "none", cursor: "pointer",
                        fontFamily: "inherit", fontSize: 13, fontWeight: filterCategory === cat.key ? 700 : 500,
                        color: filterCategory === cat.key ? "#0694D1" : "#374151",
                        background: filterCategory === cat.key ? "#EBF8FE" : "transparent",
                        borderLeft: filterCategory === cat.key ? "3px solid #0694D1" : "3px solid transparent",
                      }}>{cat.label}</button>
                    ))}
                  </div>
                  {/* Right items */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                      {/* Checkbox list */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
                      {filterCategory === "level" && levelItems.map(l => (
                        <label key={l.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", cursor: "pointer", borderBottom: "1px solid #f0f7fc" }}>
                          <span style={{ fontSize: 13, color: "#374151" }}>{l.label}</span>
                          <input type="checkbox" checked={activeLevels.has(l.key)} onChange={() => toggleLevel(l.key)} style={{ width: 16, height: 16, accentColor: "#0694D1", cursor: "pointer" }} />
                        </label>
                      ))}
                      {filterCategory === "duration" && durationItems.map(d => (
                        <label key={d.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", cursor: "pointer", borderBottom: "1px solid #f0f7fc" }}>
                          <span style={{ fontSize: 13, color: "#374151" }}>{d.label} <span style={{ color: "#94a3b8", fontSize: 11 }}>{d.sub}</span></span>
                          <input type="checkbox" checked={activeDurations.has(d.key)} onChange={() => toggleDuration(d.key)} style={{ width: 16, height: 16, accentColor: "#0694D1", cursor: "pointer" }} />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div style={{ padding: "14px 20px", borderTop: "1px solid #e8f1fb", display: "flex", gap: 10, flexShrink: 0 }}>
                  <button type="button" onClick={() => { clearAllFilters(); setFilterSearch(""); }} style={{ flex: 1, background: "#fff", border: "1.5px solid #B5D4F4", color: "#374151", borderRadius: 8, padding: "10px 0", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600 }}>Clear All</button>
                  <button type="button" onClick={() => { setFilterDrawerOpen(false); setFilterSearch(""); }} style={{ flex: 1, background: "#0694D1", color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 700 }}>Apply</button>
                </div>
              </div>
            </>
          );
        })()}

      {/* ── Technology bottom sheet (mobile) ────── */}
      {techSheetOpen && (
        <>
          <div className="tbs-overlay" onClick={() => setTechSheetOpen(false)} />
          <div className="tbs-sheet">
            <div className="tbs-handle" />
            <div className="tbs-header">
              <div>
                <div className="tbs-label">Filter by</div>
                <div className="tbs-title">Technology</div>
              </div>
              <button className="tbs-close" onClick={() => setTechSheetOpen(false)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="tbs-list">
              {/* All Courses */}
              <button className={`tbs-item${activeTechName === "" ? " active" : ""}`} onClick={() => { setActiveTechName(""); setTechSheetOpen(false); }}>
                <span className="tbs-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeTechName === "" ? "#0694D1" : "#6b8499"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                </span>
                <span className="tbs-item-name">All Courses</span>
                <span className="tbs-item-count">{totalCount}</span>
                {activeTechName === "" && <svg className="tbs-item-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </button>
              {/* Tech list */}
              {technologies.map(t => (
                <button key={t.name} className={`tbs-item${activeTechName === t.name ? " active" : ""}`} onClick={() => { setActiveTechName(t.name); setTechSheetOpen(false); }}>
                  <span className="tbs-item-icon">{techLogos[t.name]}</span>
                  <span className="tbs-item-name">{t.name}</span>
                  <span className="tbs-item-count">{t.courses.length}</span>
                  {activeTechName === t.name && <svg className="tbs-item-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Syllabus modal (vendor page design) ────── */}
      {syllabusOpen && (
        <div className="syl-overlay" style={{ display:"flex", alignItems:"center", justifyContent:"center" }}
          onClick={e => { if (e.target === e.currentTarget) { setSyllabusOpen(false); setSylSubmitted(false); setSylName(""); setSylEmail(""); setSylCourse(""); } }}>
          <div style={{
            background:"linear-gradient(160deg,#062238 0%,#093148 100%)",
            borderRadius:20, padding:"32px 28px 28px", width:"100%", maxWidth:"min(90vw, 440px)",
            position:"relative", boxShadow:"0 24px 60px rgba(0,0,0,0.5)",
            fontFamily:"inherit", animation:"sylSlideIn 0.3s cubic-bezier(0.25,1,0.5,1)",
          }}>
            {/* Close */}
            <button onClick={() => { setSyllabusOpen(false); setSylSubmitted(false); setSylName(""); setSylEmail(""); setSylCourse(""); setSylCountry(""); }}
              style={{ position:"absolute", top:14, right:14, width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"none", color:"#fff", fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>

            {sylSubmitted ? (
              /* ── Success state ── */
              <div style={{ textAlign:"center", padding:"12px 0 4px" }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(6,148,209,0.15)", border:"1.5px solid rgba(6,148,209,0.4)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ fontSize:19, fontWeight:800, color:"#fff", marginBottom:8, lineHeight:1.25 }}>You&apos;re all set, {sylName.split(" ")[0]}!</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", lineHeight:1.65, marginBottom:20 }}>
                  The course content for <strong style={{ color:"#0694D1" }}>{sylCourse || "Microsoft Power Platform Certification"}</strong> will be sent to <strong style={{ color:"#fff" }}>{sylEmail}</strong> shortly.
                </div>
                <div style={{ background:"rgba(6,148,209,0.08)", border:"1px solid rgba(6,148,209,0.2)", borderRadius:10, padding:"10px 14px", fontSize:12, color:"rgba(255,255,255,0.5)", display:"flex", alignItems:"center", gap:8, justifyContent:"center", marginBottom:16 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Check your inbox — usually arrives within 2 minutes
                </div>
                <button onClick={() => { setSyllabusOpen(false); setSylSubmitted(false); setSylName(""); setSylEmail(""); setSylCountry(""); }}
                  style={{ width:"100%", padding:11, borderRadius:10, border:"1px solid rgba(6,148,209,0.35)", background:"transparent", color:"#0694D1", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                  Close
                </button>
              </div>
            ) : (
              /* ── Form state ── */
              <>
                {/* Badge */}
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:"#0694D1", display:"inline-block", flexShrink:0 }}/>
                  <span style={{ fontSize:10, fontWeight:800, letterSpacing:1.2, color:"#0694D1", textTransform:"uppercase" }}>Download Syllabus</span>
                </div>
                {/* Course name box */}
                {sylCourse && (
                  <div style={{ border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"10px 14px", marginBottom:18, background:"rgba(255,255,255,0.05)" }}>
                    <div style={{ fontSize:10, fontWeight:800, letterSpacing:1.2, color:"rgba(255,255,255,0.45)", textTransform:"uppercase", marginBottom:5 }}>Course</div>
                    <div style={{ fontSize:14, fontWeight:700, color:"#0694D1", lineHeight:1.4 }}>{sylCourse}</div>
                  </div>
                )}
                <form onSubmit={e => { e.preventDefault(); if (!sylCountry) return; setSylSubmitted(true); }} style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  <div>
                    <label style={{ fontSize:10, fontWeight:800, letterSpacing:0.8, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", marginBottom:5, display:"block" }}>Name <span style={{ color:"#ef4444" }}>*</span></label>
                    <input required placeholder="John Smith" value={sylName} onChange={e => setSylName(e.target.value)}
                      style={{ width:"100%", boxSizing:"border-box", background:"rgba(6,148,209,0.08)", border:"1.5px solid rgba(6,148,209,0.3)", borderRadius:10, padding:"11px 14px", fontSize:13.5, color:"#fff", outline:"none", fontFamily:"inherit", transition:"border-color 0.2s" }}
                      onFocus={e => (e.target.style.borderColor="#0694D1")} onBlur={e => (e.target.style.borderColor="rgba(6,148,209,0.3)")} />
                  </div>
                  <div>
                    <label style={{ fontSize:10, fontWeight:800, letterSpacing:0.8, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", marginBottom:5, display:"block" }}>Email <span style={{ color:"#ef4444" }}>*</span></label>
                    <input required type="email" placeholder="John@example.com" value={sylEmail} onChange={e => setSylEmail(e.target.value)}
                      style={{ width:"100%", boxSizing:"border-box", background:"rgba(6,148,209,0.08)", border:"1.5px solid rgba(6,148,209,0.3)", borderRadius:10, padding:"11px 14px", fontSize:13.5, color:"#fff", outline:"none", fontFamily:"inherit", transition:"border-color 0.2s" }}
                      onFocus={e => (e.target.style.borderColor="#0694D1")} onBlur={e => (e.target.style.borderColor="rgba(6,148,209,0.3)")} />
                  </div>
                  <div>
                    <label style={{ fontSize:10, fontWeight:800, letterSpacing:0.8, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", marginBottom:5, display:"block" }}>Country <span style={{ color:"#ef4444" }}>*</span></label>
                    <div ref={sylCountryRef} style={{ position:"relative" }}>
                      <button type="button" onClick={() => setSylCountryOpen(o => !o)}
                        style={{ width:"100%", boxSizing:"border-box", display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(6,148,209,0.08)", border:`1.5px solid ${sylCountryOpen ? "#0694D1" : "rgba(6,148,209,0.3)"}`, borderRadius:10, padding:"11px 14px", fontSize:13.5, color: sylCountry ? "#fff" : "rgba(255,255,255,0.4)", cursor:"pointer", fontFamily:"inherit", outline:"none" }}>
                        {sylCountry || "Select your country"}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: sylCountryOpen ? "rotate(180deg)" : "none", transition:"transform 0.2s", flexShrink:0 }}><polyline points="6 9 12 15 18 9"/></svg>
                      </button>
                      {sylCountryOpen && (
                        <div style={{ position:"absolute", bottom:"calc(100% + 4px)", left:0, right:0, zIndex:10000, background:"#0d2535", border:"1.5px solid rgba(6,148,209,0.35)", borderRadius:10, maxHeight:420, overflowY:"auto", overscrollBehavior:"contain", boxShadow:"0 -8px 32px rgba(0,0,0,0.6)" }}>
                          <div style={{ padding:"9px 14px", fontSize:13.5, color:"rgba(255,255,255,0.35)", cursor:"default", borderBottom:"1px solid rgba(6,148,209,0.15)" }}>Select your country</div>
                          {COUNTRIES.map(c => (
                            <div key={c} onClick={() => { setSylCountry(c); setSylCountryOpen(false); }}
                              style={{ padding:"9px 14px", fontSize:13.5, cursor:"pointer", color: sylCountry === c ? "#fff" : "#c8dce9", background: sylCountry === c ? "#1a5fa8" : "transparent", transition:"background 0.12s" }}
                              onMouseEnter={e => { if (sylCountry !== c) e.currentTarget.style.background="rgba(6,148,209,0.18)"; }}
                              onMouseLeave={e => { if (sylCountry !== c) e.currentTarget.style.background="transparent"; }}>
                              {c}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <span style={{ fontSize:12, color:"rgba(255,255,255,0.45)" }}>Course content will be sent to your email ID</span>
                  </div>
                  <button type="submit" onClick={e => { if (!sylCountry) { e.preventDefault(); sylCountryRef.current?.querySelector("button")?.focus(); } }} style={{ width:"100%", padding:13, borderRadius:10, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#0694D1,#22c1e8)", color:"#fff", fontSize:14, fontWeight:700, fontFamily:"inherit", letterSpacing:0.2, boxShadow:"0 4px 18px rgba(6,148,209,0.4)", marginTop:2, transition:"filter 0.18s" }}
                    onMouseEnter={e => (e.currentTarget.style.filter="brightness(1.12)")} onMouseLeave={e => (e.currentTarget.style.filter="none")}>
                    Submit
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Request More Info modal ─────────────────── */}
      {reqInfoOpen && (
        <>
          <div className="syl-overlay" onClick={() => { setReqInfoOpen(false); setReqSubmitted(false); }} />
          <div className="req-modal" role="dialog" aria-modal="true" aria-labelledby="req-title">
            <button className="syl-close" onClick={() => { setReqInfoOpen(false); setReqSubmitted(false); }} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>

            {reqSubmitted ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: "rgba(6,148,209,0.18)", border: "1px solid rgba(6,148,209,0.4)", marginBottom: 16 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Request Received!</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
                  Our enterprise team will reach out within 1 business day.
                </p>
                <button onClick={() => { setReqInfoOpen(false); setReqSubmitted(false); setReqForm({ name: "", email: "", phone: "", course: "", trainees: "", source: "", message: "" }); setReqCaptcha(false); }} style={{ background: "rgba(6,148,209,0.25)", border: "1px solid rgba(6,148,209,0.4)", borderRadius: 12, padding: "8px 24px", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>Close</button>
              </div>
            ) : (
              <>
                {/* Badge */}
                <div style={{ textAlign: "center", marginBottom: 12 }}>
                  <span style={{ display: "inline-block", padding: "5px 18px", borderRadius: 999, border: "1.5px solid rgba(6,148,209,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#4DBFEF", textTransform: "uppercase" }}>Let&apos;s Talk</span>
                </div>

                {/* Title */}
                <h2 id="req-title" style={{ color: "#fff", fontSize: 22, fontWeight: 800, textAlign: "center", margin: "0 0 6px", lineHeight: 1.3 }}>
                  Get Your Custom{" "}
                  <span style={{ color: "#0694D1" }}>Training Plan</span>
                </h2>
                <p style={{ textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 16 }}>
                  Enterprise Certification Training with Koenig Solutions
                </p>

                {/* Contact shortcuts */}
                <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 18 }}>
                  <button type="button" className="req-contact-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp us
                  </button>
                  <button type="button" className="req-contact-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Email us
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={e => { e.preventDefault(); if (!reqCaptcha) return; setReqSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="req-grid-2">
                    <div>
                      <label className="req-label">Full Name <span style={{ color: "#ef4444" }}>*</span></label>
                      <input className="syl-input" type="text" placeholder="John" required value={reqForm.name} onChange={e => setReqForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="req-label">Business Email <span style={{ color: "#ef4444" }}>*</span></label>
                      <input className="syl-input" type="email" placeholder="john@example.com" required value={reqForm.email} onChange={e => setReqForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div>
                      <label className="req-label">Phone</label>
                      <input className="syl-input" type="tel" placeholder="+1 (555) 000-0000" value={reqForm.phone} onChange={e => setReqForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                    <div>
                      <label className="req-label">Number of Trainees</label>
                      <input className="syl-input" type="number" min="1" placeholder="e.g. 25" value={reqForm.trainees} onChange={e => setReqForm(f => ({ ...f, trainees: e.target.value }))} />
                    </div>
                  </div>

                  <div>
                    <label className="req-label">How did you hear about us?</label>
                    <select className="syl-input req-select" style={{ width: "100%" }} value={reqForm.source} onChange={e => setReqForm(f => ({ ...f, source: e.target.value }))}>
                      <option value="">Select Option</option>
                      <option>Google Search</option>
                      <option>Social Media</option>
                      <option>LinkedIn</option>
                      <option>Colleague / Referral</option>
                      <option>Email Newsletter</option>
                      <option>Microsoft Event</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="req-label">Tell us more about your Training Request</label>
                    <textarea
                      className="syl-input"
                      style={{ width: "100%", boxSizing: "border-box", resize: "vertical", minHeight: 80 }}
                      placeholder="e.g. We need Azure certification for 50 engineers across 3 countries..."
                      value={reqForm.message}
                      onChange={e => setReqForm(f => ({ ...f, message: e.target.value }))}
                    />
                  </div>

                  {/* reCAPTCHA */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div onClick={() => setReqCaptcha(c => !c)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 4, border: "1.5px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.04)", width: 220, height: 44, cursor: "pointer" }}>
                      <div style={{ width: 18, height: 18, borderRadius: 3, border: `2px solid ${reqCaptcha ? "#0694D1" : "rgba(255,255,255,0.55)"}`, background: reqCaptcha ? "#0694D1" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}>
                        {reqCaptcha && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500, flex: 1 }}>I&apos;m not a robot</span>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, flexShrink: 0 }}>
                        <img decoding="async" loading="lazy" src="https://www.gstatic.com/recaptcha/api2/logo_48.png" width="24" height="24" alt="reCAPTCHA" style={{ display: "block" }} />
                        <span style={{ fontSize: 7, color: "rgba(255,255,255,0.4)", letterSpacing: "0.03em", lineHeight: 1 }}>reCAPTCHA</span>
                        <span style={{ fontSize: 6, color: "rgba(255,255,255,0.25)", lineHeight: 1 }}>Privacy - Terms</span>
                      </div>
                    </div>
                  </div>

                  <button type="submit" style={{ width: "100%", padding: "14px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#0694D1,#076D9D)", border: "none", cursor: reqCaptcha ? "pointer" : "not-allowed", fontFamily: "inherit", boxShadow: "0 4px 20px rgba(6,148,209,0.40)", opacity: reqCaptcha ? 1 : 0.6, transition: "opacity .2s, transform .15s" }}>
                    Submit
                  </button>
                </form>
              </>
            )}
          </div>
        </>
      )}

      {/* ── Enquire Now modal ───────────────────────── */}
      {enquireOpen && (
        <div className="syl-overlay" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={e => { if (e.target === e.currentTarget) closeEnquireModal(); }}>
          <div style={{
            background: "linear-gradient(160deg,#062238 0%,#093148 100%)",
            borderRadius: 20, padding: "32px 28px 28px", width: "100%", maxWidth: "min(90vw, 440px)",
            position: "relative", boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            fontFamily: "inherit", animation: "sylSlideIn 0.3s cubic-bezier(0.25,1,0.5,1)",
          }}>
            <button onClick={closeEnquireModal}
              style={{ position: "absolute", top: 14, right: 14, width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

            {enqSubmitted ? (
              <div style={{ textAlign: "center", padding: "12px 0 4px" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(6,148,209,0.15)", border: "1.5px solid rgba(6,148,209,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ fontSize: 19, fontWeight: 800, color: "#fff", marginBottom: 8, lineHeight: 1.25 }}>You&apos;re all set, {enqName.split(" ")[0]}!</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: 20 }}>
                  Our advisor will reach out to you at <strong style={{ color: "#fff" }}>{enqPhone}</strong> shortly about{" "}
                  <strong style={{ color: "#0694D1" }}>{enquireCourse ? `${enquireCourse.code}: ${enquireCourse.title}` : "this course"}</strong>.
                </div>
                <button onClick={closeEnquireModal}
                  style={{ width: "100%", padding: 11, borderRadius: 10, border: "1px solid rgba(6,148,209,0.35)", background: "transparent", color: "#0694D1", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0694D1", display: "inline-block", flexShrink: 0 }} />
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, color: "#0694D1", textTransform: "uppercase" }}>Enquire Now</span>
                </div>

                <div style={{ marginBottom: 22 }}>
                  <div className="enquire-course-name" style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1.35 }}>
                    {enquireCourse ? `${enquireCourse.code}: ${enquireCourse.title}` : "Course Enquiry"}
                  </div>
                </div>

                <form onSubmit={e => { e.preventDefault(); if (!enqCaptcha) return; setEnqSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", marginBottom: 5, display: "block" }}>Name <span style={{ color: "#ef4444" }}>*</span></label>
                    <input required placeholder="John Smith" value={enqName} onChange={e => setEnqName(e.target.value)}
                      style={{ width: "100%", boxSizing: "border-box", background: "rgba(6,148,209,0.08)", border: "1.5px solid rgba(6,148,209,0.3)", borderRadius: 10, padding: "11px 14px", fontSize: 13.5, color: "#fff", outline: "none", fontFamily: "inherit", transition: "border-color 0.2s" }}
                      onFocus={e => (e.target.style.borderColor = "#0694D1")} onBlur={e => (e.target.style.borderColor = "rgba(6,148,209,0.3)")} />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", marginBottom: 5, display: "block" }}>Email <span style={{ color: "#ef4444" }}>*</span></label>
                    <input required type="email" placeholder="John@example.com" value={enqEmail} onChange={e => setEnqEmail(e.target.value)}
                      style={{ width: "100%", boxSizing: "border-box", background: "rgba(6,148,209,0.08)", border: "1.5px solid rgba(6,148,209,0.3)", borderRadius: 10, padding: "11px 14px", fontSize: 13.5, color: "#fff", outline: "none", fontFamily: "inherit", transition: "border-color 0.2s" }}
                      onFocus={e => (e.target.style.borderColor = "#0694D1")} onBlur={e => (e.target.style.borderColor = "rgba(6,148,209,0.3)")} />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", marginBottom: 5, display: "block" }}>Phone <span style={{ color: "#ef4444" }}>*</span></label>
                    <input required type="tel" placeholder="+91 98765 43210" value={enqPhone} onChange={e => setEnqPhone(e.target.value)}
                      style={{ width: "100%", boxSizing: "border-box", background: "rgba(6,148,209,0.08)", border: "1.5px solid rgba(6,148,209,0.3)", borderRadius: 10, padding: "11px 14px", fontSize: 13.5, color: "#fff", outline: "none", fontFamily: "inherit", transition: "border-color 0.2s" }}
                      onFocus={e => (e.target.style.borderColor = "#0694D1")} onBlur={e => (e.target.style.borderColor = "rgba(6,148,209,0.3)")} />
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div onClick={() => setEnqCaptcha(c => !c)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 4, border: "1.5px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.04)", width: 220, height: 44, cursor: "pointer" }}>
                      <div style={{ width: 18, height: 18, borderRadius: 3, border: `2px solid ${enqCaptcha ? "#0694D1" : "rgba(255,255,255,0.55)"}`, background: enqCaptcha ? "#0694D1" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}>
                        {enqCaptcha && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500, flex: 1 }}>I&apos;m not a robot</span>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, flexShrink: 0 }}>
                        <img decoding="async" loading="lazy" src="https://www.gstatic.com/recaptcha/api2/logo_48.png" width="24" height="24" alt="reCAPTCHA" style={{ display: "block" }} />
                        <span style={{ fontSize: 7, color: "rgba(255,255,255,0.4)", letterSpacing: "0.03em", lineHeight: 1 }}>reCAPTCHA</span>
                        <span style={{ fontSize: 6, color: "rgba(255,255,255,0.25)", lineHeight: 1 }}>Privacy - Terms</span>
                      </div>
                    </div>
                  </div>

                  <button type="submit" style={{ width: "100%", padding: 13, borderRadius: 10, border: "none", cursor: enqCaptcha ? "pointer" : "not-allowed", background: "linear-gradient(135deg,#0694D1,#0577ab)", color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "inherit", letterSpacing: 0.2, boxShadow: "0 4px 18px rgba(6,148,209,0.4)", opacity: enqCaptcha ? 1 : 0.6, transition: "opacity .18s, filter .18s" }}
                    onMouseEnter={e => enqCaptcha && (e.currentTarget.style.filter = "brightness(1.12)")} onMouseLeave={e => (e.currentTarget.style.filter = "none")}>
                    Enquire Now
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style suppressHydrationWarning>{`
        .certs-header-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; }

        /* shimmer border on mode toggle */
        .tab-shimmer-border { padding: 2.5px; background: linear-gradient(120deg,#0694D1,#22d3ee,#a8d8ff,#50e6ff,#0694D1); background-size: 300% 300%; animation: tab-shimmer 2.8s ease infinite; box-shadow: 0 0 22px rgba(6,148,209,0.32),0 6px 28px rgba(6,148,209,0.14); display: inline-flex; border-radius: 18px; }
        @keyframes tab-shimmer { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .cert-mode-toggle-wrap { flex-shrink: 0; align-self: flex-end; }

        /* layout grid */
        .certs-layout { display: grid; grid-template-columns: 248px 1fr; gap: 0; border: 1px solid #CAEFFF; border-radius: 20px; align-items: start; box-shadow: 0 4px 32px rgba(6,148,209,0.06),0 1px 4px rgba(0,0,0,0.04); }

        /* sidebar */
        .cert-sidebar { background: #fff; border-right: 1px solid #CAEFFF; border-radius: 20px 0 0 20px; display: flex; flex-direction: column; overflow: hidden; position: sticky; top: 72px; align-self: start; max-height: calc(100vh - 90px); overflow-y: auto; }
        .cert-tech-scroll { max-height: 286px; overflow-y: auto; overflow-x: hidden; scrollbar-width: thin; scrollbar-color: rgba(6,148,209,0.4) rgba(6,148,209,0.06); border-bottom: 1px solid #CAEFFF; }
        .cert-tech-scroll::-webkit-scrollbar { width: 4px; }
        .cert-tech-scroll::-webkit-scrollbar-track { background: rgba(6,148,209,0.04); }
        .cert-tech-scroll::-webkit-scrollbar-thumb { background: rgba(6,148,209,0.3); border-radius: 4px; }
        .cert-sidebar-filters { flex-shrink: 0; }

        .cert-tech-search-box { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #fff; border: 1.5px solid rgba(6,148,209,0.35); border-radius: 9px; transition: border-color 0.2s,box-shadow 0.2s; }
        .cert-tech-search-box:focus-within { border-color: #0694D1; box-shadow: 0 0 0 3px rgba(6,148,209,0.14); }

        .cert-sidebar-item { display: flex; align-items: center; gap: 8px; padding: 7px 14px 7px 12px; cursor: pointer; border: none; background: transparent; border-left: 3px solid transparent; width: 100%; text-align: left; transition: background 0.15s; font-family: inherit; }
        .cert-sidebar-item:hover { background: rgba(6,148,209,0.06); }
        .cert-sidebar-item.active { background: linear-gradient(90deg,rgba(6,148,209,0.10),rgba(6,148,209,0.03)); border-left-color: #0694D1; }
        .cert-sidebar-item.active .csi-label { color: #0694D1; font-weight: 700; }
        .cert-sidebar-item.active .csi-icon { opacity: 1; background: rgba(6,148,209,0.08); }
        .cert-sidebar-item.active .csi-radio { border-color: #0694D1; }
        .cert-sidebar-item.active .csi-count { background: rgba(6,148,209,0.1); color: #0694D1; border-color: rgba(6,148,209,0.3); }
        .csi-icon { width: 26px; height: 26px; flex-shrink: 0; opacity: 0.6; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.22s; }
        .csi-radio { width: 17px; height: 17px; flex-shrink: 0; border-radius: 50%; border: 2px solid #cbd5e1; display: flex; align-items: center; justify-content: center; transition: border-color 0.2s; }
        .csi-radio.active { border-color: #0694D1; }
        .csi-radio-dot { width: 8px; height: 8px; border-radius: 50%; background: #0694D1; opacity: 0; transform: scale(0.4); transition: all 0.2s; }
        .csi-radio.active .csi-radio-dot { opacity: 1; transform: scale(1); }
        .csi-body { flex: 1; min-width: 0; }
        .csi-label { font-size: 13px; font-weight: 600; color: #0f1f3d; display: block; line-height: 1.3; }
        .csi-count { font-size: 11px; font-weight: 700; color: #6b8499; background: #f0f9ff; border: 1px solid #CAEFFF; padding: 2px 8px; border-radius: 20px; flex-shrink: 0; min-width: 28px; text-align: center; }

        .cert-sidebar-label { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #0694D1; padding: 10px 14px 6px; display: flex; align-items: center; gap: 6px; }
        .cert-sidebar-label::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right,rgba(6,148,209,0.25),transparent); border-radius: 1px; }
        .cert-sidebar-divider-line { height: 1px; margin: 4px 12px; background: #CAEFFF; }

        .cert-filter-list { padding: 2px 12px 8px; display: flex; flex-direction: column; }
        .cert-filter-item { display: flex; align-items: center; gap: 8px; padding: 5px 4px; border: none; background: transparent; cursor: pointer; width: 100%; text-align: left; border-radius: 5px; transition: background 0.15s; font-family: inherit; }
        .cert-filter-item:hover { background: rgba(6,148,209,0.05); }
        .cert-filter-checkbox { width: 14px; height: 14px; flex-shrink: 0; border: 1.5px solid #b0c8d8; border-radius: 3px; display: flex; align-items: center; justify-content: center; background: #fff; transition: all 0.15s; }
        .cert-filter-item.active .cert-filter-checkbox { background: #0694D1; border-color: #0694D1; }
        .cert-filter-label { flex: 1; font-size: 13px; font-weight: 600; color: #0f1f3d; }
        .cert-filter-item.active .cert-filter-label { color: #0694D1; }
        .cert-filter-count { font-size: 11px; font-weight: 600; color: #6b8499; }

        /* right panel */
        .cert-right { display: flex; flex-direction: column; min-width: 0; border-radius: 0 20px 20px 0; overflow: hidden; }
        .cert-tech-strip { display: flex; align-items: center; gap: 16px; padding: 14px 18px; border-bottom: 1px solid #CAEFFF; background: #fff; flex-shrink: 0; }

        /* filter bar */
        .cf-bar { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: #f8fafc; border-bottom: 1px solid #CAEFFF; flex-shrink: 0; }
        .cf-bar-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; margin-left: auto; }
        .cf-search-wrap { flex: 1; min-width: 0; display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #fff; border: 1.5px solid rgba(0,120,212,0.25); border-radius: 8px; transition: border-color 0.2s,box-shadow 0.2s; }
        .cf-search-wrap:focus-within { border-color: #0078D4; box-shadow: 0 0 0 3px rgba(0,120,212,0.1); }
        .cf-search-input { flex: 1; min-width: 0; font-size: 12.5px; font-weight: 500; color: #1a2d3e; background: transparent; border: none; outline: none; font-family: inherit; }
        .cf-search-input::placeholder { color: #8baabf; font-weight: 400; }
        .cf-search-clear { width: 20px; height: 20px; border-radius: 50%; background: rgba(0,0,0,0.08); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #6b8299; transition: all 0.15s; }
        .cf-search-clear:hover { background: rgba(0,120,212,0.15); color: #0078D4; }
        .cf-sort-wrap { position: relative; display: inline-flex; align-items: center; }
        .cf-sort-icon { position: absolute; left: 10px; color: #0078D4; pointer-events: none; flex-shrink: 0; }
        .cf-sort { appearance: none; -webkit-appearance: none; font-size: 12px; font-weight: 600; font-family: inherit; color: #1a2d3e; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%230078D4' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 10px center; border: 1.5px solid rgba(0,120,212,0.2); border-radius: 8px; padding: 7px 28px 7px 30px; cursor: pointer; white-space: nowrap; }
        .cf-sort:focus { outline: none; border-color: #0078D4; }
        .cf-result-count-inline { font-size: 12px; color: #6b8499; font-weight: 500; white-space: nowrap; }
        .cf-filter-btn-mobile { display: none; align-items: center; gap: 5px; padding: 7px 14px; background: #0078D4; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 12px; font-weight: 700; flex-shrink: 0; }
        .cf-filter-badge-mobile { display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 10px; background: #fff; color: #0078D4; font-size: 11px; font-weight: 800; }

        /* mobile-only controls */
        .cf-mobile-controls { display: none; flex-direction: column; gap: 8px; padding: 12px 14px; background: #fff; border-bottom: 1px solid #CAEFFF; }
        .cf-mobile-count { font-size: 11px; font-weight: 800; color: #0694D1; letter-spacing: 0.08em; text-transform: uppercase; }
        .cf-mobile-req-btn { width: 100%; padding: 12px; background: linear-gradient(135deg,#0694D1,#046fa3); color: #fff; border-radius: 10px; font-size: 14px; font-weight: 700; border: none; cursor: pointer; font-family: inherit; box-shadow: 0 4px 14px rgba(6,148,209,0.25); }
        .cf-mobile-tech-selector { position: relative; display: flex; align-items: center; }
        .cf-mobile-tech-icon { position: absolute; left: 12px; pointer-events: none; flex-shrink: 0; }
        .cf-mobile-tech-chevron { position: absolute; right: 12px; pointer-events: none; flex-shrink: 0; }
        .cf-mobile-tech-select { width: 100%; appearance: none; -webkit-appearance: none; background: #fff; border: 1.5px solid rgba(0,120,212,0.25); border-radius: 8px; padding: 10px 32px 10px 36px; font-size: 13px; font-weight: 600; color: #0f1f3d; cursor: pointer; font-family: inherit; outline: none; }
        .cf-mobile-tech-selector { width: 100%; display: flex; align-items: center; background: #fff; border: 1.5px solid rgba(0,120,212,0.25); border-radius: 8px; padding: 10px 12px 10px 36px; font-size: 13px; font-weight: 600; color: #0f1f3d; cursor: pointer; font-family: inherit; text-align: left; position: relative; }
        .cf-mobile-tech-label { flex: 1; }
        .cf-mobile-tech-icon { position: absolute; left: 12px; pointer-events: none; }
        .cf-mobile-tech-chevron { flex-shrink: 0; margin-left: auto; }

        /* Technology bottom sheet */
        @keyframes tbs-slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .tbs-overlay { position: fixed; inset: 0; background: rgba(9,49,72,0.5); backdrop-filter: blur(2px); z-index: 9997; }
        .tbs-sheet { position: fixed; bottom: 0; left: 0; right: 0; z-index: 9998; background: #fff; border-radius: 20px 20px 0 0; max-height: 80vh; display: flex; flex-direction: column; animation: tbs-slide-up 0.28s cubic-bezier(0.25,1,0.5,1); box-shadow: 0 -8px 40px rgba(9,49,72,0.18); }
        .tbs-handle { width: 40px; height: 4px; background: #e2e8f0; border-radius: 2px; margin: 10px auto 0; flex-shrink: 0; }
        .tbs-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px 12px; border-bottom: 1px solid #EBF8FE; flex-shrink: 0; }
        .tbs-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #0694D1; margin-bottom: 2px; }
        .tbs-title { font-size: 18px; font-weight: 800; color: #093148; }
        .tbs-close { width: 32px; height: 32px; border-radius: 50%; background: #f1f5f9; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #64748b; flex-shrink: 0; }
        .tbs-list { overflow-y: auto; padding: 8px 0 24px; overscroll-behavior: contain; height: 70vh; }
        .tbs-item { width: 100%; display: flex; align-items: center; gap: 14px; padding: 13px 20px; background: none; border: none; cursor: pointer; font-family: inherit; text-align: left; transition: background 0.12s; }
        .tbs-item:active { background: #f0f9ff; }
        .tbs-item.active { background: rgba(6,148,209,0.08); }
        .tbs-item.active .tbs-item-name { color: #0694D1; font-weight: 700; }
        .tbs-item.active .tbs-item-count { background: #093148; color: #fff; }
        .tbs-item-icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(6,148,209,0.07); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .tbs-item-name { flex: 1; font-size: 15px; font-weight: 600; color: #0f1f3d; }
        .tbs-item-count { font-size: 11px; font-weight: 700; color: #0694D1; background: rgba(6,148,209,0.1); border-radius: 20px; padding: 3px 9px; flex-shrink: 0; transition: background 0.12s, color 0.12s; }
        .tbs-item-check { flex-shrink: 0; margin-left: 8px; }

        /* filter chips */
        .cf-chips-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; padding: 7px 14px; background: #f8fafc; border-bottom: 1px solid #CAEFFF; flex-shrink: 0; }
        .cf-chips-label { font-size: 11.5px; color: #6b8499; font-weight: 500; flex-shrink: 0; }
        .cf-chip { display: inline-flex; align-items: center; gap: 4px; padding: 3px 6px 3px 10px; border-radius: 20px; background: #D5E8F6; font-size: 11.5px; font-weight: 600; color: #185FA5; }
        .cf-chip-x { background: none; border: none; cursor: pointer; width: 17px; height: 17px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: inherit; font-family: inherit; font-size: 14px; line-height: 1; transition: background 0.15s; }
        .cf-chip-x:hover { background: rgba(0,120,212,0.15); }
        .cf-clear-all { background: none; border: none; cursor: pointer; font-size: 11.5px; font-weight: 700; color: #0078D4; padding: 0 6px; font-family: inherit; }

        /* card panel */
        .cert-panel-scroll { padding: 16px 18px 24px; background: #f8fafc; flex: 1; }

        /* cert grid */
        .cert-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
        @media (max-width: 1280px) {
          .cert-grid { grid-template-columns: repeat(2,1fr); }
        }

        /* cert card */
        .cert-card { background: #fff; border: 1.5px solid rgba(6,148,209,0.12); border-radius: 14px; padding: 16px 16px 14px; cursor: pointer; transition: box-shadow 0.25s; display: flex; flex-direction: column; position: relative; overflow: visible; min-height: 250px; box-shadow: 0 2px 10px rgba(6,148,209,0.07); }
        .cert-card:hover { box-shadow: 0 8px 32px rgba(6,148,209,0.18),0 2px 8px rgba(0,0,0,0.06); }

        /* popular badge */
        .cert-hot-badge { position: absolute; top: 0; right: 0; display: inline-flex; align-items: center; gap: 4px; height: 20px; font-size: 9px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; padding: 0 10px 0 8px; border-radius: 0 14px 0 10px; background: linear-gradient(135deg,#0694D1,#22d3ee); color: #fff; box-shadow: -2px 2px 8px rgba(6,148,209,0.28); z-index: 2; }

        /* level badges */
        .cert-badge { display: inline-flex; align-items: center; gap: 3px; font-size: 9px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase; padding: 3px 9px 3px 7px; border-radius: 20px; margin-bottom: 3px; border: none; line-height: 1; }
        .cert-badge.fund   { background: linear-gradient(135deg,#4DBFEF,#0694D1); color: #fff; box-shadow: 0 2px 8px rgba(6,148,209,0.25); }
        .cert-badge.assoc  { background: linear-gradient(135deg,#0694D1,#076D9D); color: #fff; box-shadow: 0 2px 8px rgba(6,108,157,0.3); }
        .cert-badge.expert { background: linear-gradient(135deg,#076D9D,#062238); color: #fff; box-shadow: 0 2px 8px rgba(6,34,56,0.35); }

        /* card name + tooltip */
        .cert-name-wrap { position: relative; flex: 1; margin-top: 10px; }
        .cert-name { font-size: 14px; font-weight: 800; color: #071e2e; margin-bottom: 8px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; min-height: 59px; }
        .cert-name-tooltip { display: none; position: absolute; bottom: calc(100% + 8px); left: 0; z-index: 100; background: #071e2e; color: #fff; font-size: 12px; font-weight: 600; line-height: 1.5; padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(6,148,209,0.35); box-shadow: 0 8px 24px rgba(0,0,0,0.3); max-width: 260px; white-space: normal; pointer-events: none; }
        .cert-name-tooltip::after { content: ''; position: absolute; top: 100%; left: 16px; border: 5px solid transparent; border-top-color: #071e2e; }
        .cert-name-wrap.show-tip .cert-name-tooltip { display: block; }
        .cert-syllabus-link { display: inline-flex; align-items: center; gap: 5px; align-self: flex-start; margin-bottom: 10px; padding: 0; border: none; background: none; color: #0694D1; font-size: 12px; font-weight: 700; cursor: pointer; font-family: inherit; }
        .cert-syllabus-link:hover { text-decoration: underline; }

        /* code / hours pills */
        .cert-code-row { display: flex; align-items: center; gap: 5px; margin-bottom: 10px; flex-wrap: wrap; }
        .cert-code  { font-size: 12px; font-family: 'SFMono-Regular','Consolas',monospace; color: #0694D1; background: rgba(6,148,209,0.1); border: 1px solid rgba(6,148,209,0.28); padding: 2px 7px; border-radius: 4px; font-weight: 700; letter-spacing: 0.4px; }
        .cert-hours { display: inline-flex; align-items: center; gap: 3px; font-size: 12px; font-family: 'SFMono-Regular','Consolas',monospace; color: #5a7a90; background: rgba(6,148,209,0.05); border: 1px solid rgba(6,148,209,0.14); padding: 2px 7px; border-radius: 4px; font-weight: 600; }

        /* card footer */
        .cert-footer { display: flex; flex-direction: column; gap: 8px; margin-top: auto; border-top: 1px solid rgba(6,148,209,0.08); padding-top: 10px; }
        .cert-price-row { display: flex; align-items: center; gap: 6px; }
        .cert-enrolled { font-size: 11px; color: #4a6375; font-weight: 600; display: inline-flex; align-items: center; gap: 3px; }
        .cert-star { color: #f59e0b; font-size: 11px; line-height: 1; margin-left: 1px; }
        .cert-rating-num { color: #f59e0b; font-size: 11px; font-weight: 700; line-height: 1; }
        .cert-price      { display: flex; align-items: baseline; gap: 4px; margin-left: auto; }
        .cert-price-curr { font-size: 10px; font-weight: 600; color: #0694D1; opacity: 0.8; }
        .cert-price-amount { font-size: 15px; font-weight: 700; color: #0694D1; letter-spacing: -0.3px; line-height: 1; }
        .cert-actions { display: flex; gap: 8px; }
        .cert-btn-view { flex: 1; display: flex; align-items: center; justify-content: center; height: 34px; padding: 0 8px; border-radius: 8px; font-size: 11px; font-weight: 700; background: #fff; color: #0694D1; border: 1.5px solid #0694D1; cursor: pointer; transition: background 0.18s; white-space: nowrap; font-family: inherit; text-decoration: none; }
        .cert-btn-view:hover { background: rgba(6,148,209,0.07); }
        .cert-btn-enquire { flex: 1; display: flex; align-items: center; justify-content: center; height: 34px; padding: 0 8px; border-radius: 8px; font-size: 11px; font-weight: 700; background: #093148; color: #fff; border: none; cursor: pointer; transition: filter 0.22s,box-shadow 0.22s,transform 0.22s; white-space: nowrap; font-family: inherit; }
        .cert-btn-enquire:hover { filter: brightness(1.25); transform: translateY(-1px); }

        /* pagination */
        .cert-pagination { display: flex; align-items: center; justify-content: center; gap: 5px; padding: 16px 0 8px; }
        .cert-pagination-mobile { display: none; }
        .cert-pg-arrow { width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid rgba(6,148,209,0.25); background: #fff; display: flex; align-items: center; justify-content: center; color: #0578b3; cursor: pointer; transition: all 0.18s; font-family: inherit; }
        .cert-pg-arrow:disabled { opacity: 0.3; cursor: not-allowed; }
        .cert-pg-arrow:not(:disabled):hover { background: #0694D1; border-color: #0694D1; color: #fff; box-shadow: 0 4px 12px rgba(6,148,209,0.3); }
        .cert-pg-num { min-width: 34px; height: 34px; border-radius: 8px; border: 1.5px solid transparent; background: transparent; font-size: 13px; font-weight: 600; color: #4a6375; cursor: pointer; transition: all 0.18s; font-family: inherit; padding: 0 8px; }
        .cert-pg-num:hover { background: rgba(6,148,209,0.08); color: #0694D1; border-color: rgba(6,148,209,0.2); }
        .cert-pg-num.active { background: #0694D1; color: #fff; border-color: #0694D1; box-shadow: 0 3px 10px rgba(6,148,209,0.35); }
        .cert-pg-ellipsis { font-size: 13px; font-weight: 600; color: #94a3b8; padding: 0 4px; }

        /* mobile drawer */
        .cf-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,0.45); backdrop-filter: blur(2px); animation: cfFadeIn 0.18s ease; }

        /* syllabus modal */
        .syl-overlay { position: fixed; inset: 0; z-index: 2000; background: rgba(0,0,0,0.65); backdrop-filter: blur(5px); animation: cfFadeIn 0.2s ease; }
        .syl-modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: 2001; width: 520px; max-width: calc(100vw - 32px); background: #071e34; border-radius: 20px; padding: 36px; box-shadow: 0 24px 80px rgba(0,0,0,0.55),0 0 0 1px rgba(6,148,209,0.18); animation: sylSlideIn 0.3s cubic-bezier(0.25,1,0.5,1); }
        @keyframes sylSlideIn { from{opacity:0;transform:translate(-50%,-54%)} to{opacity:1;transform:translate(-50%,-50%)} }
        .syl-close { position: absolute; top: 16px; right: 16px; width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.1); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #fff; transition: background 0.18s; font-family: inherit; }
        .syl-close:hover { background: rgba(255,255,255,0.2); }
        .syl-label { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #7a9ab0; margin-bottom: 7px; }
        .syl-input { width: 100%; box-sizing: border-box; background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 14px; font-size: 14px; color: #fff; font-family: inherit; transition: border-color 0.2s,box-shadow 0.2s; outline: none; }
        .syl-input::placeholder { color: #3f6070; }
        .syl-input:focus { border-color: #0694D1; box-shadow: 0 0 0 3px rgba(6,148,209,0.2); }
        .syl-submit { width: 100%; padding: 15px; background: linear-gradient(135deg,#0694D1 0%,#046fa3 100%); border: none; border-radius: 10px; color: #fff; font-size: 15px; font-weight: 800; cursor: pointer; font-family: inherit; transition: filter 0.2s,box-shadow 0.2s; box-shadow: 0 6px 22px rgba(6,148,209,0.45); letter-spacing: 0.02em; }
        .syl-submit:hover { filter: brightness(1.12); box-shadow: 0 8px 30px rgba(6,148,209,0.55); }
        @media (max-width: 600px) { .syl-modal { padding: 28px 20px; } .syl-modal > form > div:first-child { grid-template-columns: 1fr !important; } .syl-overlay > div { padding: 24px 18px 20px !important; } }

        /* request more info modal */
        .req-modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: 2001; width: 640px; max-width: calc(100vw - 32px); max-height: 92vh; overflow-y: auto; background: linear-gradient(160deg,#091e30 0%,#071525 100%); border: 1px solid rgba(6,148,209,0.25); border-radius: 24px; padding: 28px 32px; box-shadow: 0 24px 80px rgba(0,0,0,0.6); animation: sylSlideIn 0.25s ease; scrollbar-width: thin; scrollbar-color: rgba(6,148,209,0.3) transparent; }
        .req-modal::-webkit-scrollbar { width: 4px; }
        .req-modal::-webkit-scrollbar-thumb { background: rgba(6,148,209,0.3); border-radius: 4px; }
        .req-label { display: block; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.65); margin-bottom: 5px; }
        .req-contact-btn { display: inline-flex; align-items: center; gap: 8px; padding: 9px 18px; border-radius: 10px; background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.85); font-size: 13px; font-weight: 600; text-decoration: none; transition: background 0.18s,border-color 0.18s; font-family: inherit; cursor: pointer; }
        .req-contact-btn:hover { background: rgba(6,148,209,0.15); border-color: rgba(6,148,209,0.4); color: #fff; }
        .req-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .req-select { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%230694D1' stroke-width='2.5' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px; }
        .req-select option { background: #0d2d47; color: #c8d8e8; }
        @media (max-width: 600px) { .req-modal { padding: 24px 16px; } .req-grid-2 { grid-template-columns: 1fr; } }
        .cf-filter-popup { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: 1001; width: calc(100vw - 32px); max-width: 380px; height: 70vh; background: #fff; border-radius: 16px; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,0.25); animation: cfFadeIn 0.2s ease; overflow: hidden; }
        @keyframes cfFadeIn      { from{opacity:0} to{opacity:1} }
        @keyframes cfSlideInRight { from{transform:translateX(100%)} to{transform:translateX(0)} }

        /* ── Responsive ────────────────────────────── */

        /* Tablet: hide sidebar, show mobile controls */
        @media (max-width: 992px) {
          section[id="cert"] { padding: 18px 16px !important; }
          .certs-layout { grid-template-columns: 1fr; border-radius: 16px; }
          .cert-sidebar { display: none; }
          .cert-right { border-radius: 16px; }
          .cert-grid { grid-template-columns: repeat(2,1fr); }
          .cf-filter-btn-mobile { display: inline-flex !important; }
          .cf-result-count-inline { display: none; }
          .cf-mobile-controls { display: flex; }
          /* hide tech strip on mobile — cf-mobile-controls replaces it */
          .cert-tech-strip { display: none; }
          /* filter bar: search full width, sort+filter on same row below */
          .cf-bar { flex-direction: column; align-items: stretch; gap: 8px; padding: 10px 14px; }
          .cf-search-wrap { width: 100%; box-sizing: border-box; }
          .cf-bar-right { margin-left: 0; width: 100%; display: flex; align-items: center; gap: 8px; }
          .cf-sort-wrap { flex: 1; }
          .cf-sort { width: 100%; box-sizing: border-box; font-size: 13px; padding-top: 9px; padding-bottom: 9px; }
          .cf-filter-btn-mobile { flex-shrink: 0; padding: 9px 18px; font-size: 13px; }
          .cert-panel-scroll { padding: 14px 14px 20px; }
        }

        /* Mobile: single column, full-width tabs */
        @media (max-width: 700px) {
          section[id="cert"] { padding: 18px 16px !important; }
          .certs-header-row { flex-direction: column; align-items: stretch; gap: 14px; }
          .cert-mode-toggle-wrap { align-self: stretch; }
          .tab-shimmer-border { width: 100%; display: flex; border-radius: 14px; box-sizing: border-box; }
          .tab-shimmer-border > div { width: 100%; border-radius: 12px !important; box-sizing: border-box; }
          .tab-shimmer-border > div > button { flex: 1; min-width: 0 !important; padding: 12px 14px !important; justify-content: center; gap: 8px !important; }
          .tab-sub-label { display: none; }
          .cert-grid { grid-template-columns: 1fr; }
          .cf-mobile-controls { padding: 10px 12px; gap: 8px; }
          .cf-mobile-req-btn { font-size: 13px; padding: 11px; }
          .cf-mobile-tech-selector { font-size: 13px; padding: 9px 12px 9px 34px; }
          .cf-bar { padding: 8px 12px; }
          .cert-panel-scroll { padding: 12px 12px 16px; }
          .cert-card { padding: 14px 14px 12px; }
        }

        /* Small phones */
        @media (max-width: 375px) {
          section[id="cert"] { padding: 18px 16px !important; }
          .tab-shimmer-border > div > button { padding: 9px 8px !important; gap: 6px !important; }
          .cert-pagination-desktop { display: none !important; }
          .cert-pagination-mobile { display: flex !important; gap: 6px; padding: 16px 0 10px; }
          .cert-pagination-mobile .cert-pg-arrow { width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid rgba(6,148,209,0.3); background: #fff; }
          .cert-pagination-mobile .cert-pg-num { min-width: 36px; height: 36px; border-radius: 50%; border: none; background: transparent; font-size: 13px; color: #374151; padding: 0; }
          .cert-pagination-mobile .cert-pg-num.active { background: #0694D1; color: #fff; border-radius: 50%; box-shadow: 0 4px 12px rgba(6,148,209,0.35); }
          .cert-pagination-mobile .cert-pg-ellipsis { font-size: 13px; color: #94a3b8; padding: 0 2px; letter-spacing: 1px; line-height: 36px; }
          .cert-actions { flex-direction: row; gap: 6px; }
          .cert-btn-view, .cert-btn-enquire { flex: 1; width: auto; }
          .cf-mobile-controls { padding: 8px 10px; }
          .cert-panel-scroll { padding: 10px 10px 14px; }
        }

        /* 360px */
        @media (max-width: 360px) {
          section[id="cert"] { padding: 18px 16px !important; }
          .tab-shimmer-border > div > button span:last-child span:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}

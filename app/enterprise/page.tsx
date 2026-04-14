'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { FallingPattern } from '@/components/ui/falling-pattern'
import EnterpriseHeroGlobe from '@/components/EnterpriseHeroGlobe'
import AuroraCanvas from '@/components/AuroraCanvas'

/* ─── Vendor Partner Data ────────────────────────────────── */

const ENT_VENDORS_ROW1 = [
  { name: 'Microsoft',        tier: 'Gold Partner',        courses: '380+', initial: 'M', img: 'microsoft-cloud-t.png' },
  { name: 'Cisco',            tier: 'Premier Partner',     courses: '210+', initial: 'C', img: 'Cisco.png' },
  { name: 'AWS',              tier: 'Training Partner',    courses: '290+', initial: 'A', img: 'amazon-authorized.png' },
  { name: 'VMware',           tier: 'Principal Partner',   courses: '120+', initial: 'V', img: 'VMware-Broadcom.png' },
  { name: 'Oracle',           tier: 'Gold Partner',        courses: '160+', initial: 'O', img: 'o-prtnr-clr-rgb (1).png' },
  { name: 'PECB',             tier: 'Authorized Partner',  courses: '80+',  initial: 'P', img: 'Authorized PECB Certification Courses Training badge.png' },
  { name: 'ISACA',            tier: 'Authorized Partner',  courses: '60+',  initial: 'I', img: undefined },
  { name: 'PeopleCert',       tier: 'ATO Partner',         courses: '90+',  initial: 'P', img: 'PeopleCert.png' },
  { name: 'CompTIA',          tier: 'Platinum Partner',    courses: '180+', initial: 'C', img: 'comptia.png' },
  { name: 'SAP',              tier: 'Gold Partner',        courses: '140+', initial: 'S', img: 'SAP.jpg' },
  { name: 'EC-Council',       tier: 'ATC Partner',         courses: '120+', initial: 'E', img: 'EC-Council-logo.png' },
  { name: 'ISC2',             tier: 'Official Partner',    courses: '50+',  initial: 'I', img: 'OTP-Preferred-Badge.png' },
  { name: 'PMI',              tier: 'Premier Partner',     courses: '140+', initial: 'P', img: 'PMI1115-ATP-Badge-2024-rgb.png' },
  { name: 'ISTQB',            tier: 'Authorized Partner',  courses: '40+',  initial: 'I', img: 'ISTQB.png' },
  { name: 'Broadcom',         tier: 'Partner',             courses: '70+',  initial: 'B', img: 'Broadcom.png' },
  { name: 'Check Point',      tier: 'Authorized Partner',  courses: '55+',  initial: 'C', img: 'Checkpoint ATC 2026 PLATINUM Badge.png' },
  { name: 'Red Hat',          tier: 'Advanced Partner',    courses: '110+', initial: 'R', img: 'Redvendorlogo.png' },
  { name: 'The Open Group',   tier: 'Authorized Partner',  courses: '45+',  initial: 'T', img: 'Vendor-OG-logo.png' },
  { name: 'Python Institute', tier: 'Authorized Partner',  courses: '35+',  initial: 'P', img: 'Python-logo.png' },
  { name: 'Linux Foundation', tier: 'Training Partner',    courses: '60+',  initial: 'L', img: 'Linux-Foundation.png' },
]
const ENT_VENDORS_ROW2 = [
  { name: 'Autodesk',                 tier: 'Authorized Partner',  courses: '45+',  initial: 'A', img: 'AutodeskCertification.png' },
  { name: 'BCS',                      tier: 'ATO Partner',         courses: '35+',  initial: 'B', img: 'BCS partner logo (1).png' },
  { name: 'ServiceNow',               tier: 'Training Partner',    courses: '40+',  initial: 'S', img: 'ServiceNow.png' },
  { name: 'CertNexus',                tier: 'Authorized Partner',  courses: '30+',  initial: 'C', img: 'cnxatpweb-small.png' },
  { name: 'CWNP',                     tier: 'Authorized Partner',  courses: '25+',  initial: 'C', img: 'alc-standard-Basic-Logo.jpg' },
  { name: 'SUSE',                     tier: 'Training Partner',    courses: '20+',  initial: 'S', img: 'suse.jpg' },
  { name: 'Android ATC',              tier: 'Authorized Partner',  courses: '30+',  initial: 'A', img: 'Android ATC Authorized Training Center.jpg' },
  { name: 'SCRUMstudy',               tier: 'Authorized Partner',  courses: '25+',  initial: 'S', img: 'scrumstudy.png', imgLg: true },
  { name: 'TÜV SÜD',                 tier: 'Authorized Partner',  courses: '35+',  initial: 'T', img: 'Web-TS_Cobranding_Cooperation_partner_RGB_TS_Blue.png' },
  { name: 'GSDC',                     tier: 'Authorized Partner',  courses: '20+',  initial: 'G', img: 'ATP badge.png' },
  { name: 'Dell EMC',                 tier: 'Training Partner',    courses: '50+',  initial: 'D', img: 'emc.png' },
  { name: 'AI CERTs',                 tier: 'Authorized Partner',  courses: '30+',  initial: 'A', img: 'AICerts (1).png' },
  { name: 'EXIN',                     tier: 'Authorized Partner',  courses: '40+',  initial: 'E', img: 'EXIN.png' },
  { name: 'Cloud Security Alliance',  tier: 'Authorized Partner',  courses: '25+',  initial: 'C', img: 'cloud-security-alliance.png' },
  { name: 'OffSec Training',          tier: 'Learning Partner',    courses: '20+',  initial: 'O', img: 'OffSecLearningPartnerDarkPNG (1).png' },
  { name: 'Cloudera',                 tier: 'Training Partner',    courses: '30+',  initial: 'C', img: 'cloudera (1).png' },
  { name: 'Cloud Credential Council', tier: 'Authorized Partner',  courses: '20+',  initial: 'C', img: 'CCC_Logo.png' },
  { name: 'LPI',                      tier: 'Authorized Partner',  courses: '15+',  initial: 'L', img: 'Linux.png' },
  { name: 'C++ Institute',            tier: 'Authorized Partner',  courses: '10+',  initial: 'C', img: 'c-plus-2-logo.png' },
  { name: 'Omnissa',                  tier: 'Partner',             courses: '30+',  initial: 'O', img: 'Omnissa.png' },
]

function EntVendorCard({ v }: { v: { name: string; tier: string; courses: string; initial: string; img?: string; imgLg?: boolean } }) {
  return (
    <div
      className="group flex w-48 shrink-0 flex-col overflow-hidden rounded-2xl bg-white"
      style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 10px rgba(0,164,239,0.07)', transition: 'box-shadow 0.3s ease, border-color 0.3s ease' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(6,148,209,0.14)'; e.currentTarget.style.borderColor = '#A8D8F0' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,164,239,0.07)'; e.currentTarget.style.borderColor = '#CAEFFF' }}
    >
      <div className={`flex h-28 w-full items-center justify-center bg-white ${v.imgLg ? 'p-1' : 'p-3'}`}>
        {v.img ? (
          <img
            src={`/images/partners/${encodeURIComponent(v.img)}`}
            alt={v.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
            style={{ maxHeight: v.imgLg ? '116px' : '88px' }}
          />
        ) : (
          <span className="text-2xl sm:text-3xl md:text-4xl font-black transition-transform duration-300 group-hover:scale-110 inline-block" style={{ color: '#076D9D' }}>{v.initial}</span>
        )}
      </div>
      <div className="flex flex-col gap-1 border-t border-[#EEF6FF] bg-[#FAFCFF] px-3 pb-3 pt-2.5">
        <p className="truncate text-center text-sm font-bold" style={{ color: '#0b2545' }}>{v.name}</p>
        <p className="truncate text-center text-xs" style={{ color: '#4a90b8' }}>{v.tier}</p>
        <p className="text-center text-xs font-semibold" style={{ color: '#13a8d4' }}>{v.courses} Courses</p>
      </div>
    </div>
  )
}

/* ─── Existing Data ──────────────────────────────────────── */

const ENT_MORPH_WORDS = [
  'at Global Scale',
  'Across 195+ Countries',
  'With Expert Trainers',
  'Across All Domains',
  'in Record Time',
  'With Certified Outcomes',
]

const STATS = [
  { num: '1M+',   label: 'Professionals Trained', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0zm6 3a3 3 0 11-6 0 3 3 0 016 0zM1 10a3 3 0 116 0 3 3 0 01-6 0z"/> },
  { num: '5,000+',label: 'Courses Available',      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/> },
  { num: '30+',   label: 'Years of Excellence',    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/> },
  { num: '195+',  label: 'Countries Served',       icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/> },
]

const APPROACH = [
  {
    step: '01',
    title: 'Assess',
    sub: 'Diagnose Skill Gaps',
    desc: 'We analyse your workforce capability, benchmark against industry standards, and identify the precise learning gaps across roles and departments.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>,
  },
  {
    step: '02',
    title: 'Design',
    sub: 'Build Custom Programmes',
    desc: 'Our instructional designers craft bespoke curricula aligned to your business goals, using the latest vendor-certified content across 50+ technology domains.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>,
  },
  {
    step: '03',
    title: 'Deliver',
    sub: 'Deploy at Scale',
    desc: 'Training delivered globally via Live Online, Classroom, 1-on-1, and Fly-Me-a-Trainer formats — on your schedule, in your timezone, in 195+ countries.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>,
  },
  {
    step: '04',
    title: 'Elevate',
    sub: 'Measure & Optimise',
    desc: 'Post-training assessments, certification tracking, and ROI reporting ensure continuous improvement and a measurable impact on your business outcomes.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>,
  },
]

const DOMAINS = [
  {
    name: 'Cloud Computing', count: '840+',
    skills: ['AWS Solutions Architecture', 'Azure Administration', 'Google Cloud Platform', 'Cloud Security', 'Serverless Computing', 'Container Orchestration', 'Infrastructure as Code', 'Multi-Cloud Strategy', 'Cloud Networking', 'Cost Optimisation'],
    tools: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Terraform', 'Kubernetes'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>,
  },
  {
    name: 'Cybersecurity', count: '620+',
    skills: ['Ethical Hacking & Pen Testing', 'Network Security', 'Security Operations (SOC)', 'Cloud Security', 'Incident Response', 'Malware Analysis', 'Zero Trust Architecture', 'Risk & Compliance', 'Digital Forensics'],
    tools: ['CompTIA Security+', 'EC-Council CEH', 'ISC2 CISSP', 'Palo Alto PCNSA', 'Cisco CyberOps'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
  },
  {
    name: 'Data & AI', count: '280+',
    skills: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Data Engineering', 'MLOps & AI Ops', 'Statistical Analysis', 'Generative AI', 'Big Data Platforms'],
    tools: ['Python', 'TensorFlow', 'Databricks', 'Microsoft Power BI', 'Tableau'],
    icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></>,
  },
  {
    name: 'Networking', count: '510+',
    skills: ['Network Design & Architecture', 'Routing & Switching', 'SD-WAN', 'Network Automation', 'Wireless Networking', 'VoIP & Collaboration', 'IPv6 Implementation', 'QoS & Traffic Engineering', 'Network Virtualisation'],
    tools: ['Cisco CCNA / CCNP', 'Juniper JNCIA', 'CompTIA Network+', 'Aruba ACSA', 'Fortinet NSE'],
    icon: <><circle cx="12" cy="5" r="2" strokeWidth={1.8}/><circle cx="5" cy="19" r="2" strokeWidth={1.8}/><circle cx="19" cy="19" r="2" strokeWidth={1.8}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 7v4M8.5 17.5l3-2.5M15.5 17.5l-3-2.5"/></>,
  },
  {
    name: 'Project Management', count: '390+',
    skills: ['PMP Certification', 'Agile & Scrum', 'PRINCE2', 'Programme & Portfolio Management', 'Risk Management', 'Stakeholder Engagement', 'Change Management', 'Lean Six Sigma', 'ITIL Service Management'],
    tools: ['PMI PMP / CAPM', 'PRINCE2 Foundation', 'Scrum.org PSM', 'SAFe Agile', 'AXELOS ITIL 4'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>,
  },
  {
    name: 'DevOps', count: '210+',
    skills: ['CI/CD Pipeline Design', 'Docker & Kubernetes', 'Infrastructure as Code', 'GitOps Workflows', 'Site Reliability Engineering', 'DevSecOps', 'Platform Engineering', 'Observability & Monitoring', 'Microservices Architecture'],
    tools: ['Docker', 'Kubernetes (CKA)', 'Terraform', 'GitHub Actions', 'HashiCorp Vault'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>,
  },
  {
    name: 'ERP Systems', count: '180+',
    skills: ['SAP S/4HANA Implementation', 'Oracle ERP Cloud', 'Salesforce CRM', 'ServiceNow ITSM', 'Microsoft Dynamics 365', 'SAP FICO & MM', 'Workflow Automation', 'ERP Integration & Migration', 'Business Process Optimisation'],
    tools: ['SAP S/4HANA', 'Oracle Cloud ERP', 'Salesforce Platform', 'ServiceNow CSA', 'Microsoft Dynamics'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>,
  },
  {
    name: 'Linux & Open Source', count: '110+',
    skills: ['Linux System Administration', 'Shell Scripting & Automation', 'Kernel Tuning & Optimisation', 'Container Management', 'OpenStack Administration', 'Configuration Management', 'Security Hardening', 'High Availability Clusters', 'RHEL Certification'],
    tools: ['Red Hat RHCSA / RHCE', 'Linux Foundation LFCS', 'Ubuntu Administration', 'Ansible Automation', 'Kubernetes (CKAD)'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>,
  },
]

const CAT_DOMAINS = [
  {
    name: 'Cloud Computing',
    desc: 'Master multi-cloud platforms — AWS, Azure, and GCP — from core IaaS/PaaS fundamentals to advanced architecture, DevSecOps, and cost optimisation.',
    features: ['8 Courses', 'CLF-C02 — AZ-305', 'Cloud Roles'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>,
    courses: [
      { level: 'Fundamentals', title: 'AWS Cloud Practitioner',              code: 'CLF-C02',  price: '398',   days: 2, popular: true,
        cert: { prereq: 'No prerequisites required', examFee: '$150 USD', format: 'Multiple choice & multi-response', questions: '65 questions', passingScore: '700 / 1000', validity: '3 years', bestPractices: ['Complete AWS Cloud Practitioner Essentials course on AWS Skill Builder', 'Use the AWS Free Tier to explore core services hands-on', 'Take 2+ official practice exams before booking your date'] } },
      { level: 'Fundamentals', title: 'Microsoft Azure Fundamentals',         code: 'AZ-900',   price: '398',   days: 2,
        cert: { prereq: 'No prerequisites required', examFee: '$165 USD', format: 'Multiple choice & case studies', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete the AZ-900 learning path on Microsoft Learn', 'Focus on cloud concepts, Azure services, and pricing', 'Take the official practice assessment before your exam'] } },
      { level: 'Associate',    title: 'AWS Solutions Architect Associate',    code: 'SAA-C03',  price: '996',   days: 4,
        cert: { prereq: 'Cloud practitioner experience recommended', examFee: '$300 USD', format: 'Multiple choice & multi-response', questions: '65 questions', passingScore: '720 / 1000', validity: '3 years', bestPractices: ['Study AWS Well-Architected Framework in depth', 'Practice designing resilient, cost-optimised architectures', 'Use AWS whitepapers and FAQs alongside official study materials'] } },
      { level: 'Associate',    title: 'Microsoft Azure Administrator',        code: 'AZ-104',   price: '1,245', days: 5,
        cert: { prereq: '6+ months cloud experience recommended', examFee: '$165 USD', format: 'Multiple choice & scenario tasks', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete all Microsoft Learn modules for AZ-104', 'Lab-practice in Azure sandbox — 30–40% of exam is scenario-based', 'Review the official skills outline on learn.microsoft.com'] } },
      { level: 'Associate',    title: 'Google Associate Cloud Engineer',      code: 'ACE',      price: '747',   days: 3,
        cert: { prereq: '6+ months GCP experience recommended', examFee: '$200 USD', format: 'Multiple choice & multi-select', questions: '50–60 questions', passingScore: 'Scaled score (pass/fail)', validity: '3 years', bestPractices: ['Complete Google Cloud Fundamentals learning path', 'Practice with GCP free tier — focus on Compute, Storage, Networking', 'Review the exam guide and attempt practice questions'] } },
      { level: 'Expert', title: 'AWS Solutions Architect Professional',       code: 'SAP-C02',  price: '1,495', days: 5,
        cert: { prereq: 'AWS Solutions Architect Associate or equivalent', examFee: '$300 USD', format: 'Multiple choice & multi-response', questions: '75 questions', passingScore: '750 / 1000', validity: '3 years', bestPractices: ['Study complex multi-account and hybrid architecture patterns', 'Focus on cost optimisation and migration strategies', 'Complete AWS advanced reskilling labs'] } },
      { level: 'Expert', title: 'Azure Solutions Architect Expert',           code: 'AZ-305',   price: '1,495', days: 5,
        cert: { prereq: 'AZ-104 and Azure experience recommended', examFee: '$165 USD', format: 'Multiple choice & case studies', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete Microsoft Learn paths for AZ-305', 'Practice designing landing zones and governance frameworks', 'Study hybrid networking and identity architecture patterns'] } },
      { level: 'Expert', title: 'Google Professional Cloud Architect',        code: 'PCA',      price: '1,495', days: 5,
        cert: { prereq: '3+ years GCP experience recommended', examFee: '$200 USD', format: 'Multiple choice & case studies', questions: '50–60 questions', passingScore: 'Scaled score (pass/fail)', validity: '2 years', bestPractices: ['Review all four case studies provided by Google', 'Practice architecture decisions for scalability and reliability', 'Use Google Cloud Architecture Framework as study reference'] } },
    ],
  },
  {
    name: 'Cybersecurity',
    desc: 'Build world-class security expertise — from ethical hacking and network defence to SOC operations, threat intelligence, and zero-trust architecture.',
    features: ['8 Courses', 'SY0-701 — CISSP', 'Security Roles'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
    courses: [
      { level: 'Fundamentals', title: 'CompTIA Security+',                    code: 'SY0-701', price: '597',   days: 5, popular: true,
        cert: { prereq: 'CompTIA Network+ recommended', examFee: '$392 USD', format: 'Multiple choice & performance-based', questions: '90 questions', passingScore: '750 / 900', validity: '3 years', bestPractices: ['Study all six Security+ domains with equal focus', 'Practice performance-based questions (PBQs) extensively', 'Use Professor Messer or Jason Dion study materials'] } },
      { level: 'Fundamentals', title: 'ISC2 Certified in Cybersecurity',       code: 'CC',      price: '398',   days: 3,
        cert: { prereq: 'No prerequisites required', examFee: '$199 USD', format: 'Multiple choice', questions: '100 questions', passingScore: '700 / 1000', validity: '3 years', bestPractices: ['Complete the free ISC2 CC self-paced course', 'Focus on the five CC domains in the exam outline', 'Join ISC2 candidate community for peer support'] } },
      { level: 'Associate',    title: 'Cisco CyberOps Associate',              code: '200-201', price: '747',   days: 4,
        cert: { prereq: 'Basic networking knowledge recommended', examFee: '$330 USD', format: 'Multiple choice & drag & drop', questions: '95–105 questions', passingScore: '825 / 1000', validity: '3 years', bestPractices: ['Lab-practice with Cisco Packet Tracer or GNS3', 'Study security monitoring and incident response workflows', 'Review CVSS scoring and IOC identification techniques'] } },
      { level: 'Associate',    title: 'CompTIA CySA+',                         code: 'CS0-003', price: '747',   days: 5,
        cert: { prereq: 'Security+ and 4 years security experience recommended', examFee: '$392 USD', format: 'Multiple choice & performance-based', questions: '85 questions', passingScore: '750 / 900', validity: '3 years', bestPractices: ['Focus on threat and vulnerability management workflows', 'Practice log analysis and SIEM tool scenarios', 'Study MITRE ATT&CK framework deeply'] } },
      { level: 'Expert', title: 'EC-Council Certified Ethical Hacker',         code: '312-50',  price: '1,245', days: 5,
        cert: { prereq: '2 years security experience or CEH training required', examFee: '$550 USD', format: 'Multiple choice', questions: '125 questions', passingScore: '70% (varies by form)', validity: '3 years', bestPractices: ['Complete all 20 CEH modules with hands-on labs', 'Practice on CEH iLabs or TryHackMe/HackTheBox', 'Focus on scanning, enumeration, and exploitation techniques'] } },
      { level: 'Expert', title: 'Fortinet NSE 4 Network Security',             code: 'NSE4',    price: '996',   days: 4,
        cert: { prereq: 'NSE 1, 2, 3 or equivalent experience', examFee: '$400 USD', format: 'Multiple choice', questions: '60 questions', passingScore: '65%', validity: '2 years', bestPractices: ['Complete Fortinet NSE 4 training on Fortinet Network Security Academy', 'Lab-practice FortiGate configuration and policy management', 'Review firewall policy, VPN, and IPS configuration topics'] } },
      { level: 'Expert',       title: 'ISC2 CISSP',                            code: 'CISSP',   price: '1,495', days: 5,
        cert: { prereq: '5 years paid security experience required', examFee: '$749 USD', format: 'CAT (adaptive) or linear', questions: '100–150 (CAT)', passingScore: '700 / 1000', validity: '3 years', bestPractices: ['Study all 8 CISSP domains — focus on risk and governance', 'Read the official ISC2 CISSP study guide cover to cover', 'Think like a manager, not a technician when answering questions'] } },
      { level: 'Expert',       title: 'Palo Alto Networks PCNSE',              code: 'PCNSE',   price: '1,245', days: 5,
        cert: { prereq: '3+ years Palo Alto NGFW experience', examFee: '$160 USD', format: 'Multiple choice', questions: '75 questions', passingScore: 'Pass / Fail (scaled)', validity: '2 years', bestPractices: ['Study PAN-OS administration and advanced features', 'Practice GlobalProtect VPN, Panorama, and security profiles', 'Complete Palo Alto EDU-210 and EDU-220 courses'] } },
    ],
  },
  {
    name: 'Data & AI',
    desc: 'Equip teams with data engineering, machine learning, and generative AI skills — from foundational analytics to enterprise-scale MLOps deployments.',
    features: ['8 Courses', 'AI-900 — DP-600', 'AI & Data Roles'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>,
    courses: [
      { level: 'Fundamentals', title: 'Azure AI Fundamentals',                  code: 'AI-900',  price: '398',   days: 2, popular: true,
        cert: { prereq: 'No prerequisites required', examFee: '$165 USD', format: 'Multiple choice & case studies', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete the AI-900 learning path on Microsoft Learn', 'Explore Azure Cognitive Services and Machine Learning concepts', 'Take the official practice assessment before your exam'] } },
      { level: 'Fundamentals', title: 'AWS Machine Learning Foundations',       code: 'MLS-C01', price: '398',   days: 2,
        cert: { prereq: 'No prerequisites required', examFee: '$200 USD', format: 'Multiple choice & multi-response', questions: '65 questions', passingScore: '720 / 1000', validity: '3 years', bestPractices: ['Study AWS ML services: SageMaker, Rekognition, Comprehend', 'Focus on ML concepts, model evaluation, and ethical AI', 'Complete AWS ML Foundations free course on Coursera'] } },
      { level: 'Associate',    title: 'Azure Data Engineer Associate',          code: 'DP-203',  price: '996',   days: 5,
        cert: { prereq: 'Azure Data Fundamentals recommended', examFee: '$165 USD', format: 'Multiple choice & scenario tasks', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete DP-203 learning path on Microsoft Learn', 'Lab-practice Azure Data Factory, Synapse, and Databricks', 'Focus on pipeline orchestration and data transformation patterns'] } },
      { level: 'Associate',    title: 'AWS Certified ML Associate',             code: 'MLA-C01', price: '747',   days: 3,
        cert: { prereq: '1 year ML experience recommended', examFee: '$250 USD', format: 'Multiple choice & multi-response', questions: '65 questions', passingScore: '720 / 1000', validity: '3 years', bestPractices: ['Study SageMaker pipelines and model deployment patterns', 'Practice feature engineering and model monitoring workflows', 'Review AWS ML Specialty guide alongside MLA prep materials'] } },
      { level: 'Expert', title: 'Azure AI Engineer Associate',                  code: 'AI-102',  price: '1,245', days: 4,
        cert: { prereq: 'Azure Fundamentals and development experience', examFee: '$165 USD', format: 'Multiple choice & scenario tasks', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete AI-102 learning path on Microsoft Learn', 'Build solutions with Azure OpenAI, Speech, Vision, and Language services', 'Practice responsible AI implementation and governance patterns'] } },
      { level: 'Expert', title: 'Google Professional ML Engineer',              code: 'PMLE',    price: '1,495', days: 5,
        cert: { prereq: '3+ years ML/data experience', examFee: '$200 USD', format: 'Multiple choice & case studies', questions: '50–60 questions', passingScore: 'Scaled (pass/fail)', validity: '2 years', bestPractices: ['Study Vertex AI, BigQuery ML, and TFX pipelines deeply', 'Review ML system design patterns and scalability', 'Complete Google Cloud Professional ML Engineer study guide'] } },
      { level: 'Expert',       title: 'Microsoft Fabric Analytics Engineer',    code: 'DP-600',  price: '1,245', days: 4,
        cert: { prereq: 'Power BI or Azure data experience recommended', examFee: '$165 USD', format: 'Multiple choice & scenario tasks', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete DP-600 learning path on Microsoft Learn', 'Lab-practice Fabric workspaces, lakehouses, and data pipelines', 'Study OneLake architecture and semantic model design'] } },
      { level: 'Expert',       title: 'Databricks Data Engineer Professional',  code: 'DE-PRO',  price: '996',   days: 3,
        cert: { prereq: 'Databricks Certified Associate required', examFee: '$200 USD', format: 'Multiple choice', questions: '60 questions', passingScore: '70%', validity: '2 years', bestPractices: ['Master Delta Lake, streaming with Structured Streaming, and DLT', 'Practice complex Spark optimisation and pipeline debugging', 'Complete Databricks Academy Professional course'] } },
    ],
  },
  {
    name: 'Networking',
    desc: 'Design and manage enterprise networks — from CCNA routing and switching to SD-WAN, CCNP enterprise architecture, and expert-level CCIE certification.',
    features: ['8 Courses', 'N10-009 — CCIE', 'Network Roles'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>,
    courses: [
      { level: 'Fundamentals', title: 'CompTIA Network+',                       code: 'N10-009', price: '597',   days: 5, popular: true,
        cert: { prereq: 'CompTIA A+ or 9 months networking experience recommended', examFee: '$358 USD', format: 'Multiple choice & performance-based', questions: '90 questions', passingScore: '720 / 900', validity: '3 years', bestPractices: ['Study all five Network+ domains systematically', 'Practice subnetting and IP addressing extensively', 'Use Professor Messer free Network+ course and practice tests'] } },
      { level: 'Associate',    title: 'Cisco CCNA',                             code: '200-301', price: '747',   days: 5,
        cert: { prereq: 'Basic IT knowledge recommended', examFee: '$330 USD', format: 'Multiple choice & drag & drop', questions: '90–110 questions', passingScore: '825 / 1000', validity: '3 years', bestPractices: ['Complete Cisco NetAcad CCNA courses (SRWE + ENSA)', 'Lab extensively with Cisco Packet Tracer or GNS3', 'Master subnetting, OSPF, VLANs, and STP thoroughly'] } },
      { level: 'Associate',    title: 'Juniper JNCIA-Junos',                    code: 'JN0-104', price: '597',   days: 3,
        cert: { prereq: 'Basic networking knowledge', examFee: '$200 USD', format: 'Multiple choice', questions: '65 questions', passingScore: 'Pass / Fail (scaled)', validity: '3 years', bestPractices: ['Study Junos OS architecture and CLI navigation', 'Practice routing policy and firewall filter configuration', 'Complete free Juniper Open Learning JNCIA course'] } },
      { level: 'Associate',    title: 'CompTIA Network Specialist',             code: 'CAS-005', price: '747',   days: 4,
        cert: { prereq: 'Network+ and 5 years experience recommended', examFee: '$480 USD', format: 'Multiple choice & scenario-based', questions: '90 questions', passingScore: '750 / 900', validity: '3 years', bestPractices: ['Study enterprise network security architecture', 'Focus on SD-WAN, cloud networking, and network automation', 'Review CompTIA advanced network infrastructure design patterns'] } },
      { level: 'Expert', title: 'Cisco CCNP Enterprise',                       code: 'ENCOR',   price: '1,245', days: 5,
        cert: { prereq: 'CCNA or 3+ years enterprise networking', examFee: '$400 USD', format: 'Multiple choice & drag & drop', questions: '90–110 questions', passingScore: '825 / 1000', validity: '3 years', bestPractices: ['Study dual-stack architectures, SD-WAN, and wireless deeply', 'Practice advanced OSPF, BGP, and EIGRP configurations', 'Complete Cisco ENCOR official cert guide cover to cover'] } },
      { level: 'Expert', title: 'Cisco CCNP Security',                         code: 'SCOR',    price: '1,245', days: 5,
        cert: { prereq: 'CCNA Security or 3+ years network security', examFee: '$400 USD', format: 'Multiple choice & drag & drop', questions: '90–110 questions', passingScore: '825 / 1000', validity: '3 years', bestPractices: ['Study Cisco Firepower, ISE, and Umbrella architecture', 'Lab-practice NGFW policies, VPN, and identity-based security', 'Review Cisco security architecture blueprints'] } },
      { level: 'Expert',       title: 'Cisco CCIE Enterprise Infrastructure',  code: 'CCIE-E',  price: '1,995', days: 5,
        cert: { prereq: 'CCNP Enterprise and extensive lab experience', examFee: '$1,600 USD (written + lab)', format: 'Written MCQ + 8-hour lab exam', questions: '90–110 (written)', passingScore: 'Pass / Fail (lab)', validity: '3 years', bestPractices: ['Allocate 6–12 months of dedicated study time', 'Build comprehensive home or rented lab environment', 'Focus on automation, programmability, and advanced routing'] } },
      { level: 'Expert',       title: 'Fortinet NSE 7 Enterprise Firewall',    code: 'NSE7',    price: '1,245', days: 4,
        cert: { prereq: 'NSE 4 or 5 and enterprise firewall experience', examFee: '$400 USD', format: 'Multiple choice', questions: '60 questions', passingScore: '65%', validity: '2 years', bestPractices: ['Complete FortiGate advanced administration labs', 'Study VDOM, HA clustering, and SD-WAN advanced features', 'Practice FortiGate troubleshooting methodologies'] } },
    ],
  },
  {
    name: 'Project Management',
    desc: 'Certify project leaders and agile teams — from ITIL and Scrum foundations to PMP, PRINCE2 Practitioner, and SAFe programme management.',
    features: ['8 Courses', 'ITIL-4F — PMI-ACP', 'PM Roles'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>,
    courses: [
      { level: 'Fundamentals', title: 'ITIL 4 Foundation',                      code: 'ITIL-4F', price: '597',   days: 2, popular: true,
        cert: { prereq: 'No prerequisites required', examFee: '$397 USD', format: 'Multiple choice', questions: '40 questions', passingScore: '65% (26/40)', validity: 'No expiry', bestPractices: ['Study the ITIL 4 Foundation official publication', 'Focus on key concepts: value co-creation and service value chain', 'Take 3–4 practice exams using official PeopleCert sample papers'] } },
      { level: 'Fundamentals', title: 'Project Management Fundamentals',        code: 'PMF-101', price: '398',   days: 2,
        cert: { prereq: 'No prerequisites required', examFee: '$250 USD', format: 'Multiple choice', questions: '50 questions', passingScore: '70%', validity: '3 years', bestPractices: ['Study PMI project management process groups and knowledge areas', 'Focus on project initiation, planning, and stakeholder management', 'Complete at least one practice project lifecycle walkthrough'] } },
      { level: 'Associate',    title: 'PRINCE2 Foundation',                     code: 'PR2-F',   price: '597',   days: 3,
        cert: { prereq: 'No prerequisites required', examFee: '$343 USD', format: 'Multiple choice', questions: '60 questions', passingScore: '55% (33/60)', validity: 'No expiry', bestPractices: ['Study all 7 PRINCE2 principles, themes, and processes', 'Use official PRINCE2 manual as primary reference', 'Attempt PeopleCert practice papers under timed conditions'] } },
      { level: 'Associate',    title: 'Certified Scrum Master',                 code: 'CSM',     price: '597',   days: 2,
        cert: { prereq: 'CSM course attendance required', examFee: 'Included in training', format: 'Multiple choice (online)', questions: '50 questions', passingScore: '74% (37/50)', validity: '2 years', bestPractices: ['Attend the 2-day live CSM training — participation is mandatory', 'Study the Scrum Guide (official, free PDF)', 'Apply Scrum concepts to a real or practice project scenario'] } },
      { level: 'Expert', title: 'PMI Project Management Professional',          code: 'PMP',     price: '1,245', days: 5,
        cert: { prereq: '36–60 months PM experience + 35 education hours', examFee: '$555 USD (PMI member $405)', format: 'Multiple choice, matching, hotspot, fill-in', questions: '180 questions', passingScore: 'Above Target performance', validity: '3 years', bestPractices: ['Study both predictive (waterfall) and agile PM approaches', 'Use PMI Examination Content Outline as study blueprint', 'Complete 300+ practice questions using reputable question banks'] } },
      { level: 'Expert', title: 'PRINCE2 Practitioner',                         code: 'PR2-P',   price: '747',   days: 2,
        cert: { prereq: 'PRINCE2 Foundation required', examFee: '$343 USD', format: 'Objective testing (scenario-based)', questions: '68 questions', passingScore: '55% (38/68)', validity: '3 years', bestPractices: ['Study how to tailor PRINCE2 principles to scenarios', 'Practice applying PRINCE2 to the Practitioner exam scenario', 'Focus on how themes interact within the scenario context'] } },
      { level: 'Expert',       title: 'PMI Agile Certified Practitioner',       code: 'PMI-ACP', price: '747',   days: 3,
        cert: { prereq: '2000 hours general PM + 1500 hours agile experience', examFee: '$495 USD (PMI member $435)', format: 'Multiple choice', questions: '120 questions', passingScore: 'Above Target performance', validity: '3 years', bestPractices: ['Study Agile Manifesto, Scrum, Kanban, XP, and SAFe frameworks', 'Use Mike Griffiths PMI-ACP study guide as primary resource', 'Complete 150+ practice questions from multiple question banks'] } },
      { level: 'Expert',       title: 'SAFe 6.0 Program Consultant',            code: 'SPC',     price: '1,495', days: 4,
        cert: { prereq: 'SAFe Agilist and 5+ years enterprise experience', examFee: 'Included in training', format: 'Multiple choice (online)', questions: '45 questions', passingScore: '77%', validity: '1 year', bestPractices: ['Complete official SAFe SPC training — attendance required', 'Study SAFe framework: ART, Solution Train, and Portfolio', 'Apply SAFe patterns to a real enterprise scenario in your answers'] } },
    ],
  },
  {
    name: 'DevOps',
    desc: 'Train engineering teams in CI/CD pipelines, Docker, Kubernetes, Infrastructure as Code, GitOps, and Site Reliability Engineering at enterprise scale.',
    features: ['8 Courses', 'DOF-101 — CKS', 'DevOps Roles'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>,
    courses: [
      { level: 'Fundamentals', title: 'DevOps Foundations',                     code: 'DOF-101', price: '398',   days: 2, popular: true,
        cert: { prereq: 'No prerequisites required', examFee: '$250 USD', format: 'Multiple choice', questions: '40 questions', passingScore: '65%', validity: '3 years', bestPractices: ['Study DevOps culture, CALMS framework, and value stream mapping', 'Understand CI/CD pipeline concepts and toolchain overview', 'Complete a hands-on mini-project implementing a basic pipeline'] } },
      { level: 'Fundamentals', title: 'Docker for Developers',                  code: 'DCA-E',   price: '597',   days: 3,
        cert: { prereq: 'Basic Linux and development experience', examFee: '$200 USD', format: 'Multiple choice & scenario', questions: '55 questions', passingScore: '65%', validity: '2 years', bestPractices: ['Build and run Docker containers from scratch in a lab environment', 'Study Docker networking, volumes, and multi-container orchestration', 'Complete Docker official hands-on labs on Docker Hub'] } },
      { level: 'Associate',    title: 'HashiCorp Terraform Associate',          code: 'TA-003',  price: '747',   days: 3,
        cert: { prereq: 'Basic cloud and IaC understanding', examFee: '$70 USD', format: 'Multiple choice & multi-select', questions: '57 questions', passingScore: '70%', validity: '2 years', bestPractices: ['Complete HashiCorp Learn Terraform tutorials (free)', 'Practice Terraform state management, modules, and workspaces', 'Build a real IaC project on any cloud provider'] } },
      { level: 'Associate',    title: 'Kubernetes and Cloud Native Associate',  code: 'KCNA',    price: '597',   days: 2,
        cert: { prereq: 'Basic cloud and containers knowledge', examFee: '$250 USD', format: 'Multiple choice', questions: '60 questions', passingScore: '75%', validity: '2 years', bestPractices: ['Complete CNCF Kubernetes Introduction course on edX', 'Study Kubernetes core concepts: Pods, Services, Deployments', 'Review the KCNA curriculum guide on CNCF website'] } },
      { level: 'Expert', title: 'Certified Kubernetes Administrator',           code: 'CKA',     price: '996',   days: 4,
        cert: { prereq: '6+ months Kubernetes experience', examFee: '$395 USD', format: 'Performance-based (hands-on lab)', questions: '15–20 tasks', passingScore: '66%', validity: '3 years', bestPractices: ['Practice daily in a real Kubernetes cluster (kubeadm or kind)', 'Master kubectl commands and YAML manifests under time pressure', 'Complete Killer.sh CKA simulator — very close to real exam'] } },
      { level: 'Expert', title: 'Certified Kubernetes App Developer',           code: 'CKAD',    price: '996',   days: 3,
        cert: { prereq: 'Kubernetes development experience', examFee: '$395 USD', format: 'Performance-based (hands-on lab)', questions: '15–20 tasks', passingScore: '66%', validity: '3 years', bestPractices: ['Practice building, configuring, and exposing Kubernetes applications', 'Master ConfigMaps, Secrets, Probes, and multi-container patterns', 'Use Killer.sh CKAD simulator to benchmark readiness'] } },
      { level: 'Expert',       title: 'Certified Kubernetes Security Specialist', code: 'CKS',   price: '1,245', days: 4,
        cert: { prereq: 'Active CKA required', examFee: '$395 USD', format: 'Performance-based (hands-on lab)', questions: '15–20 tasks', passingScore: '67%', validity: '2 years', bestPractices: ['Study supply chain security, cluster hardening, and runtime security', 'Practice with Falco, OPA Gatekeeper, and network policies', 'Complete CKS-specific labs on Killer.sh'] } },
      { level: 'Expert',       title: 'GitLab Professional Services Engineer',  code: 'GPSE',    price: '996',   days: 3,
        cert: { prereq: '2+ years GitLab or CI/CD experience', examFee: '$300 USD', format: 'Multiple choice & scenario', questions: '50 questions', passingScore: '70%', validity: '2 years', bestPractices: ['Study GitLab CI/CD pipelines, runners, and GitOps workflows', 'Practice GitLab project setup, merge request automation, and security scanning', 'Complete GitLab Learn certification path'] } },
    ],
  },
  {
    name: 'ERP Systems',
    desc: 'Upskill ERP and CRM teams across SAP S/4HANA, Salesforce, ServiceNow, and Oracle — from fundamentals through advanced certified professional roles.',
    features: ['8 Courses', 'BTP-100 — SAP-EA', 'ERP Roles'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>,
    courses: [
      { level: 'Fundamentals', title: 'SAP Business Technology Platform',       code: 'BTP-100',      price: '597',   days: 3, popular: true,
        cert: { prereq: 'No prerequisites required', examFee: '$592 USD', format: 'Multiple choice', questions: '80 questions', passingScore: '64%', validity: 'No expiry', bestPractices: ['Complete SAP Learning Journey for BTP on SAP Learning Hub', 'Explore BTP Trial account — free sandbox for hands-on practice', 'Focus on Integration Suite, Extension Suite, and HANA Cloud services'] } },
      { level: 'Fundamentals', title: 'Salesforce Administrator',               code: 'ADM-201',      price: '597',   days: 5,
        cert: { prereq: 'No prerequisites required', examFee: '$200 USD', format: 'Multiple choice', questions: '60 questions', passingScore: '65%', validity: 'No expiry (maintenance required)', bestPractices: ['Complete Salesforce Trailhead Admin Beginner and Intermediate trails', 'Lab extensively in a free Salesforce Developer org', 'Use Focus on Force or Trailhead Superbadges for exam readiness'] } },
      { level: 'Associate',    title: 'SAP S/4HANA Fundamentals',               code: 'S4H-100',      price: '747',   days: 3,
        cert: { prereq: 'SAP BTP Fundamentals recommended', examFee: '$592 USD', format: 'Multiple choice', questions: '80 questions', passingScore: '64%', validity: 'No expiry', bestPractices: ['Complete SAP S/4HANA Learning Journey on SAP Learning Hub', 'Study Fiori UX, Universal Journal, and S/4HANA architecture', 'Use SAP Best Practices Explorer to understand process scenarios'] } },
      { level: 'Associate',    title: 'ServiceNow System Administrator',        code: 'CSA',          price: '747',   days: 3,
        cert: { prereq: 'ServiceNow Fundamentals training recommended', examFee: '$300 USD', format: 'Multiple choice', questions: '60 questions', passingScore: '70%', validity: '2 years', bestPractices: ['Complete the ServiceNow Fundamentals eLearning on Now Learning', 'Lab-practice in a free ServiceNow Personal Developer Instance (PDI)', 'Study tables, business rules, workflows, and ACL configuration'] } },
      { level: 'Expert', title: 'SAP Certified Assoc – Financial Accounting',   code: 'C_TS4FI_2023', price: '1,245', days: 5,
        cert: { prereq: 'SAP S/4HANA Finance experience recommended', examFee: '$592 USD', format: 'Multiple choice', questions: '80 questions', passingScore: '65%', validity: 'No expiry', bestPractices: ['Complete SAP Certified Application Associate - SAP S/4HANA training', 'Lab-practice financial document posting and period-end closing', 'Study universal journal, asset accounting, and bank accounting'] } },
      { level: 'Expert', title: 'Salesforce Platform Developer I',              code: 'PD1',          price: '996',   days: 4,
        cert: { prereq: 'Admin experience and Apex/SOQL knowledge', examFee: '$200 USD', format: 'Multiple choice & scenario', questions: '60 questions', passingScore: '65%', validity: 'No expiry (maintenance required)', bestPractices: ['Complete Salesforce Platform Developer Trailhead trails', 'Practice Apex, Visualforce, and Lightning Web Components in Developer org', 'Study governor limits, triggers, and test class coverage requirements'] } },
      { level: 'Expert',       title: 'SAP Certified Professional – Solution Arch.', code: 'P_SAPEA_2023', price: '1,495', days: 5,
        cert: { prereq: 'SAP Associate certification and 5+ years experience', examFee: '$1,197 USD', format: 'Multiple choice + case-based', questions: '80 questions', passingScore: '64%', validity: 'No expiry', bestPractices: ['Study SAP Enterprise Architecture and TOGAF integration', 'Focus on SAP Solution Manager and integration architecture patterns', 'Complete SAP Professional certification learning journey'] } },
      { level: 'Expert',       title: 'Oracle ERP Cloud Financials Professional', code: '1Z0-1055',   price: '1,245', days: 4,
        cert: { prereq: 'Oracle Financials Cloud experience required', examFee: '$245 USD', format: 'Multiple choice', questions: '85 questions', passingScore: '68%', validity: '1 year', bestPractices: ['Complete Oracle University financials training course', 'Lab-practice in Oracle Financials Cloud environment', 'Study period close, subledger accounting, and reporting tools'] } },
    ],
  },
  {
    name: 'Linux & Open Source',
    desc: 'Certify Linux administrators and open source engineers — from RHEL foundations and shell scripting to advanced RHCE, Kubernetes, and OpenStack.',
    features: ['8 Courses', 'LPI LE-1 — RHCE', 'Linux Roles'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>,
    courses: [
      { level: 'Fundamentals', title: 'Linux Essentials (LPI LE-1)',            code: 'LPI LE-1', price: '398',   days: 3, popular: true,
        cert: { prereq: 'No prerequisites required', examFee: '$120 USD', format: 'Multiple choice', questions: '40 questions', passingScore: '500 / 800', validity: 'No expiry', bestPractices: ['Complete LPI Linux Essentials learning materials (free online)', 'Practice basic Linux commands and file navigation daily', 'Use a live Linux VM or WSL2 environment for hands-on practice'] } },
      { level: 'Fundamentals', title: 'CompTIA Linux+',                         code: 'XK0-005',  price: '747',   days: 5,
        cert: { prereq: 'CompTIA A+ or 12 months Linux experience', examFee: '$358 USD', format: 'Multiple choice & performance-based', questions: '90 questions', passingScore: '720 / 900', validity: '3 years', bestPractices: ['Study all four Linux+ domains: system management, security, scripting, containers', 'Lab in RHEL, Ubuntu, and CentOS environments', 'Use Professor Messer or Jason Dion Linux+ study materials'] } },
      { level: 'Associate',    title: 'Red Hat System Administration I',        code: 'RH124',    price: '996',   days: 5,
        cert: { prereq: 'Basic IT literacy recommended', examFee: 'Included with RHCSA exam', format: 'Performance-based (hands-on lab)', questions: '9–15 tasks', passingScore: '210 / 300', validity: '3 years', bestPractices: ['Complete RH124 official Red Hat training', 'Practice daily in a RHEL VM — no multiple choice, all hands-on', 'Master user management, filesystems, services, and SELinux'] } },
      { level: 'Associate',    title: 'Linux Foundation LFCA',                  code: 'LFCA',     price: '597',   days: 3,
        cert: { prereq: 'No prerequisites required', examFee: '$200 USD', format: 'Multiple choice', questions: '60 questions', passingScore: '72%', validity: '3 years', bestPractices: ['Complete Linux Foundation\'s free Introduction to Linux course on edX', 'Study cloud and container fundamentals alongside Linux basics', 'Review the LFCA curriculum guide on Linux Foundation website'] } },
      { level: 'Expert', title: 'Red Hat Certified System Administrator',       code: 'EX200',    price: '1,245', days: 5,
        cert: { prereq: 'RH124 + RH134 training or equivalent', examFee: '$450 USD', format: 'Performance-based (hands-on lab)', questions: '15–20 tasks', passingScore: '210 / 300', validity: '3 years', bestPractices: ['Build and rebuild a RHEL lab environment daily', 'Master systemd, firewalld, SELinux, and storage management', 'Time yourself — exam tasks must be completed within 3 hours'] } },
      { level: 'Expert', title: 'Red Hat Certified Engineer',                   code: 'EX294',    price: '1,495', days: 5,
        cert: { prereq: 'Active RHCSA required', examFee: '$450 USD', format: 'Performance-based (hands-on lab)', questions: '10–15 tasks', passingScore: '210 / 300', validity: '3 years', bestPractices: ['Master Ansible playbooks, roles, and Ansible Vault', 'Practice automating RHEL system configuration from scratch', 'Complete Red Hat DO294 Ansible for RHCE official training'] } },
      { level: 'Expert',       title: 'Certified Kubernetes Administrator',     code: 'CKA',      price: '996',   days: 4,
        cert: { prereq: '6+ months Kubernetes experience', examFee: '$395 USD', format: 'Performance-based (hands-on lab)', questions: '15–20 tasks', passingScore: '66%', validity: '3 years', bestPractices: ['Practice kubectl and YAML authoring daily in a real cluster', 'Master kubeadm cluster bootstrapping and upgrades', 'Use Killer.sh simulator — most representative CKA practice available'] } },
      { level: 'Expert',       title: 'OpenStack Certified Administrator',      code: 'COA',      price: '1,245', days: 5,
        cert: { prereq: '6+ months OpenStack experience', examFee: '$300 USD', format: 'Performance-based (hands-on lab)', questions: 'Scenario tasks', passingScore: 'Pass / Fail', validity: '3 years', bestPractices: ['Deploy a full OpenStack environment using DevStack for practice', 'Master Nova, Neutron, Cinder, Glance, and Keystone components', 'Complete OpenStack Foundation training and documentation'] } },
    ],
  },
  {
    name: 'Agile & Scrum',
    desc: 'Transform teams with Agile methodologies — from Scrum and Kanban foundations to SAFe, LeSS, and scaled enterprise Agile delivery frameworks.',
    features: ['6 Courses', 'CSM — SAFe-RTE', 'Agile Roles'],
    icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7"/></>,
    courses: [
      { level: 'Fundamentals', title: 'Scrum Fundamentals Certified (SFC)',     code: 'SFC',      price: '299',   days: 1, popular: true,
        cert: { prereq: 'No prerequisites required', examFee: 'Free', format: 'Multiple choice (online)', questions: '40 questions', passingScore: '70%', validity: 'No expiry', bestPractices: ['Complete the free SFC course on SCRUMstudy website', 'Read the SBOK Guide chapters on Scrum fundamentals', 'Take the free SFC exam online immediately after training'] } },
      { level: 'Fundamentals', title: 'Kanban Foundation',                      code: 'KIKF',     price: '398',   days: 2,
        cert: { prereq: 'No prerequisites required', examFee: '$120 USD', format: 'Multiple choice', questions: '40 questions', passingScore: '65%', validity: 'No expiry', bestPractices: ['Study Kanban core practices: visualise, limit WIP, manage flow', 'Apply Kanban to a real team workflow before the exam', 'Read David Anderson\'s Kanban book as primary study material'] } },
      { level: 'Associate',    title: 'Certified Scrum Product Owner (CSPO)',   code: 'CSPO',     price: '597',   days: 2,
        cert: { prereq: 'CSPO course attendance required', examFee: 'Included in training', format: 'No written exam — attendance-based', questions: 'N/A', passingScore: 'N/A (attendance required)', validity: '2 years', bestPractices: ['Attend the 2-day live CSPO training — participation is mandatory', 'Study product vision, backlog refinement, and stakeholder management', 'Join Scrum Alliance communities and explore real PO case studies'] } },
      { level: 'Associate',    title: 'SAFe Scrum Master (SSM)',                code: 'SSM',      price: '747',   days: 2,
        cert: { prereq: 'CSM or Scrum experience recommended', examFee: 'Included in training', format: 'Multiple choice (online)', questions: '45 questions', passingScore: '73%', validity: '1 year', bestPractices: ['Complete Scaled Agile Framework (SAFe) official SSM training', 'Study how Scrum Master role differs in SAFe vs. standalone Scrum', 'Review ART ceremonies: PI Planning, Iteration Review, and Retrospectives'] } },
      { level: 'Expert', title: 'SAFe Release Train Engineer (RTE)',            code: 'SAFe-RTE', price: '1,245', days: 3,
        cert: { prereq: 'SAFe Agilist and 5+ years Agile/PM experience', examFee: 'Included in training', format: 'Multiple choice (online)', questions: '45 questions', passingScore: '77%', validity: '1 year', bestPractices: ['Complete official SAFe RTE training from Scaled Agile', 'Study facilitation, coaching, and ART execution competencies', 'Practice leading PI Planning and program increment simulations'] } },
      { level: 'Expert', title: 'PMI Agile Certified Practitioner (PMI-ACP)',   code: 'PMI-ACP',  price: '996',   days: 3,
        cert: { prereq: '2000 hrs PM + 1500 hrs Agile experience required', examFee: '$435–495 USD', format: 'Multiple choice', questions: '120 questions', passingScore: 'Above Target performance', validity: '3 years', bestPractices: ['Study all Agile frameworks: Scrum, Kanban, XP, Lean, and SAFe', 'Use Mike Griffiths PMI-ACP exam prep book', 'Complete 150+ practice questions from at least two different sources'] } },
    ],
  },
  {
    name: 'IT Service Management',
    desc: 'Elevate IT service delivery with ITIL, ISO 20000, COBIT, and HDI certifications — from service desk fundamentals to enterprise service governance.',
    features: ['6 Courses', 'ITIL-4F — ITIL-MP', 'ITSM Roles'],
    icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/></>,
    courses: [
      { level: 'Fundamentals', title: 'ITIL 4 Foundation',                      code: 'ITIL-4F',  price: '597',   days: 2, popular: true,
        cert: { prereq: 'No prerequisites required', examFee: '$397 USD', format: 'Multiple choice', questions: '40 questions', passingScore: '65% (26/40)', validity: 'No expiry', bestPractices: ['Study the ITIL 4 Foundation official publication', 'Focus on the four dimensions and service value chain', 'Complete at least three official PeopleCert practice exams'] } },
      { level: 'Fundamentals', title: 'HDI Support Center Analyst',             code: 'HDI-SCA',  price: '498',   days: 2,
        cert: { prereq: 'No prerequisites required', examFee: '$195 USD', format: 'Multiple choice', questions: '65 questions', passingScore: '80%', validity: '3 years', bestPractices: ['Study IT support best practices and service desk workflows', 'Focus on incident management, escalation, and customer communication', 'Complete HDI practice exams on HDI Learning Center'] } },
      { level: 'Associate',    title: 'ITIL 4 Specialist: CDS',                 code: 'ITIL-CDS', price: '747',   days: 3,
        cert: { prereq: 'ITIL 4 Foundation required', examFee: '$397 USD', format: 'Multiple choice (scenario-based)', questions: '40 questions', passingScore: '70%', validity: 'No expiry', bestPractices: ['Study Create, Deliver and Support module of ITIL 4', 'Focus on value stream design and service performance management', 'Complete official Axelos ITIL 4 CDS training materials'] } },
      { level: 'Associate',    title: 'ISO/IEC 20000 IT Service Mgmt',          code: 'ISO-20K',  price: '747',   days: 3,
        cert: { prereq: 'ITIL Foundation or IT service management experience', examFee: '$450 USD', format: 'Multiple choice', questions: '50 questions', passingScore: '65%', validity: 'No expiry', bestPractices: ['Study ISO/IEC 20000-1 standard requirements', 'Focus on SMS planning, service design, and continual improvement', 'Complete PECB ISO 20000 Foundation training materials'] } },
      { level: 'Expert', title: 'ITIL 4 Managing Professional (MP)',            code: 'ITIL-MP',  price: '1,495', days: 5,
        cert: { prereq: 'ITIL 4 Foundation + 3 Specialist modules required', examFee: '$397 USD per module', format: 'Multiple choice (scenario-based)', questions: '40 questions', passingScore: '70%', validity: 'No expiry', bestPractices: ['Complete all three required ITIL 4 Specialist modules', 'Study across CDS, DSV, and HVIT modules systematically', 'Apply ITIL 4 concepts to real-world service management scenarios'] } },
      { level: 'Expert', title: 'COBIT 2019 Foundation',                        code: 'COBIT-19', price: '996',   days: 3,
        cert: { prereq: 'IT governance experience recommended', examFee: '$350 USD', format: 'Multiple choice', questions: '75 questions', passingScore: '65%', validity: '3 years', bestPractices: ['Study COBIT 2019 Design and Implementation guides', 'Focus on governance system design and maturity levels', 'Complete ISACA official COBIT 2019 Foundation training'] } },
    ],
  },
  {
    name: 'Business Intelligence',
    desc: 'Build enterprise BI and analytics capabilities — from Power BI and Tableau foundations to advanced data modelling, DAX, and self-service analytics.',
    features: ['6 Courses', 'PL-900 — DP-600', 'Analytics Roles'],
    icon: <><polyline strokeLinecap="round" strokeLinejoin="round" points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    courses: [
      { level: 'Fundamentals', title: 'Microsoft Power Platform Fundamentals',  code: 'PL-900',   price: '299',   days: 1, popular: true,
        cert: { prereq: 'No prerequisites required', examFee: '$165 USD', format: 'Multiple choice & case studies', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete PL-900 learning path on Microsoft Learn (free)', 'Explore Power BI, Power Apps, and Power Automate in trial accounts', 'Take the official Microsoft practice assessment before booking'] } },
      { level: 'Fundamentals', title: 'Tableau Desktop Specialist',             code: 'TDS',      price: '498',   days: 2,
        cert: { prereq: 'No prerequisites required', examFee: '$250 USD', format: 'Multiple choice & hands-on', questions: '45 questions', passingScore: '75%', validity: '2 years', bestPractices: ['Complete Tableau free eLearning for Tableau Desktop', 'Practice building charts, dashboards, and calculated fields daily', 'Use Tableau Public for hands-on practice with public datasets'] } },
      { level: 'Associate',    title: 'Microsoft Power BI Data Analyst',        code: 'PL-300',   price: '895',   days: 3,
        cert: { prereq: 'Power BI experience recommended', examFee: '$165 USD', format: 'Multiple choice & scenario tasks', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete PL-300 Microsoft Learn paths and hands-on labs', 'Master DAX measures, data modelling, and relationship management', 'Build 3–4 full Power BI reports from raw data to published dashboard'] } },
      { level: 'Associate',    title: 'Google Data Analytics Certificate',      code: 'GDA',      price: '598',   days: 3,
        cert: { prereq: 'No prerequisites required', examFee: 'Included in training', format: 'Project-based assessment', questions: 'Portfolio project', passingScore: 'Portfolio review', validity: 'No expiry', bestPractices: ['Complete all 8 courses in the Google Data Analytics Certificate path', 'Build a case study portfolio project as final deliverable', 'Practice SQL, R, and Tableau alongside the coursework'] } },
      { level: 'Expert', title: 'Implementing Analytics Solutions – Fabric',    code: 'DP-600',   price: '1,195', days: 4,
        cert: { prereq: 'Power BI Associate or data engineering experience', examFee: '$165 USD', format: 'Multiple choice & scenario tasks', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete DP-600 Microsoft Learn paths on Microsoft Fabric', 'Lab-practice Lakehouses, Notebooks, Dataflows Gen2, and semantic models', 'Study OneLake architecture and Fabric workspace governance'] } },
      { level: 'Expert', title: 'Databricks Certified Associate Developer',     code: 'DB-ADE',   price: '996',   days: 3,
        cert: { prereq: 'Python and basic Spark knowledge', examFee: '$200 USD', format: 'Multiple choice', questions: '60 questions', passingScore: '70%', validity: '2 years', bestPractices: ['Complete Databricks Academy Associate Developer course', 'Practice DataFrame operations, Spark SQL, and Delta Lake', 'Use Databricks Community Edition for free hands-on labs'] } },
    ],
  },
]

const FORMATS = [
  {
    title: 'Live Online Training', badge: 'Best Value', badgeBg: '#076D9D',
    img: '/images/home-banner/Live-Online-Classes.png',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.277A1 1 0 0 1 21 8.649v6.7a1 1 0 0 1-1.447.894L15 14"/><rect x="1" y="6" width="14" height="12" rx="2"/></svg>,
    desc: 'Flexible virtual learning with expert instructors from the comfort of any location.',
    bullets: ['Live instructor-led sessions', 'Interactive Q&A & labs', 'Train from anywhere'],
    cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)',
  },
  {
    title: 'Classroom Training', badge: 'Most Popular', badgeBg: '#0694d1',
    img: '/images/home-banner/classroom-training.png',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    desc: 'Traditional instructor-led learning in global training centres or at your premises.',
    bullets: ['Hands-on lab sessions', 'Face-to-face expert instructors', 'Global training centres'],
    cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)',
  },
  {
    title: 'Fly-Me-a-Trainer', badge: 'Fastest', badgeBg: '#0694d1',
    img: '/images/home-banner/FMAT.png',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></svg>,
    desc: 'We fly a certified trainer to your site — ideal for large on-site team deployments.',
    bullets: ['Expert trainer at your site', 'Custom schedule & pace', 'Any location worldwide'],
    cardBg: 'linear-gradient(145deg,#0c4a72,#093148)',
  },
  {
    title: 'Flexi Training', badge: 'Most Flexible', badgeBg: '#076D9D',
    img: '/images/home-banner/Flexi.png',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    desc: 'Self-paced learning with edited lectures, labs, courseware, and optional doubt clearing.',
    bullets: ['Edited video lectures', 'Hands-on labs & courseware', 'Optional doubt clearing'],
    cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)',
  },
  {
    title: '1-on-1 Training', badge: 'Most Focused', badgeBg: '#0694d1',
    img: '/images/home-banner/1on1.png', objPos: 'top',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    desc: 'Dedicated instructor assigned exclusively to one employee for maximum focus.',
    bullets: ['Personalised curriculum', 'Flexible scheduling', 'Zero distractions'],
    cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)',
  },
  {
    title: 'Customised Programmes', badge: 'Bespoke', badgeBg: '#076D9D',
    img: '/images/home-banner/CT.png',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    desc: 'Bespoke curricula tailored to your tech stack, business processes, and learning goals.',
    bullets: ['Custom content design', 'Blended topic support', 'Branded materials'],
    cardBg: 'linear-gradient(145deg,#0c4a72,#093148)',
  },
  {
    title: 'Webinar as a Service', badge: 'New', badgeBg: '#0694d1',
    img: '/images/home-banner/Waas.png',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    desc: 'Professionally hosted live webinars delivered to your global workforce at scale.',
    bullets: ['Expert-hosted live sessions', 'Interactive polls & Q&A', 'On-demand recording'],
    cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)',
  },
  {
    title: 'Qubits', badge: 'Assessment', badgeBg: '#076D9D',
    img: '/images/home-banner/Qubits.png',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    desc: 'AI-powered assessments to benchmark skills, identify gaps, and measure training ROI.',
    bullets: ['Pre & post training assessments', 'AI-driven skill gap analysis', 'ROI measurement'],
    cardBg: 'linear-gradient(145deg,#0c4a72,#093148)',
  },
]

const TESTIMONIALS_COL1 = [
  { quote: '"Koenig delivered Azure training for 120 engineers across three continents simultaneously. Quality was consistent and scheduling was flawless."', extra: 'The dedicated account manager handled every logistical detail — from scheduling across time zones to providing post-training reports within 24 hours. We\'ve already renewed for next quarter.', highlights: ['Multi-Region Delivery', 'Dedicated Account Manager'], showMore: true, name: 'Rahul M.', country: 'India', badge: 'AZ-104 Certified', date: '2 months ago', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces&auto=format&q=80' },
  { quote: '"I trained 15 of my team members for SC-200. Koenig\'s on-site delivery was seamless and all 15 passed within 3 months."', extra: 'The MCT knew the exact exam domains to focus on. Labs were hands-on and mirrored real Microsoft exam scenarios. The 100% batch guarantee gave us the confidence to commit to the training plan.', highlights: ['On-Site Delivery', '100% Pass Rate'], name: 'Sarah K.', country: 'United States', badge: 'Enterprise Client', date: '1 month ago', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces&auto=format&q=80' },
  { quote: '"The 1-on-1 format was a game changer. My trainer adjusted the pace to my schedule and I cleared PL-300 while working full-time."', extra: 'I tried group classes before and always fell behind. With Koenig\'s flexi 1-on-1 sessions I could pause, replay, and revisit topics. Cleared PL-300 on first attempt with 890/1000.', highlights: ['1-on-1 Format', 'Flexi Schedule'], name: 'Ahmed R.', country: 'UAE', badge: 'PL-300 Certified', date: '3 months ago', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces&auto=format&q=80' },
  { quote: '"Koenig\'s guaranteed batch delivery meant zero last-minute cancellations. Our Q1 certification targets were met exactly on schedule."', extra: 'After two vendors cancelled on us last year, Koenig\'s 100% batch guarantee was non-negotiable for us. Not a single session was missed. Our entire APAC team is now Azure-certified.', highlights: ['Guaranteed Schedule', 'APAC Coverage'], name: 'Priya S.', country: 'Singapore', badge: 'Enterprise Client', date: '4 months ago', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=faces&auto=format&q=80' },
]
const TESTIMONIALS_COL2 = [
  { quote: '"As an L&D head I\'ve used 5 training vendors. Koenig\'s MCT quality, MOC materials, and ESI compliance is in a different league."', extra: 'The ESI-approved curriculum gave our compliance team confidence. MOC materials were up-to-date — something other vendors consistently failed at. Koenig is now our sole preferred vendor for Microsoft training.', highlights: ['ESI Approved', 'MOC Materials'], showMore: true, name: 'James T.', country: 'United Kingdom', badge: '100+ Learners Trained', date: '2 months ago', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces&auto=format&q=80' },
  { quote: '"SC-900 and SC-300 back to back — both cleared first try. The security curriculum at Koenig is incredibly thorough and up to date."', extra: 'The SC-300 labs covered real-world Conditional Access and Defender scenarios I hadn\'t seen elsewhere. Koenig keeps the curriculum updated with the latest Microsoft exam changes. Zero surprises on exam day.', highlights: ['Up-to-Date Content', 'Real-World Labs'], name: 'Aisha N.', country: 'Canada', badge: 'SC-300 Certified', date: '5 months ago', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces&auto=format&q=80' },
  { quote: '"From AZ-900 to AZ-305 in 6 months. Koenig\'s structured roadmap and MCT mentoring made the expert level genuinely achievable."', extra: 'The learning path Koenig mapped for me was exactly right — no filler, no gaps. Each certification built directly on the previous one. My MCT was available between sessions for quick questions too.', highlights: ['Structured Roadmap', 'MCT Mentoring'], name: 'Li W.', country: 'Australia', badge: 'AZ-305 Expert', date: '3 months ago', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=faces&auto=format&q=80' },
  { quote: '"We needed CISSP for our security team fast. Koenig\'s 1-on-1 model got all 12 candidates certified in under 6 weeks."', extra: 'Koenig customised the CISSP boot camp to focus on our team\'s weak domains based on a pre-assessment. The result was 12 out of 12 passing on first attempt. Incredible ROI for our security posture.', highlights: ['Custom Curriculum', 'Pre-Assessment'], name: 'Mark D.', country: 'Germany', badge: 'CISSP Certified', date: '1 month ago', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=faces&auto=format&q=80' },
]
const TESTIMONIALS_COL3 = [
  { quote: '"AI-102 was daunting but the trainer broke it down perfectly. Real Azure OpenAI labs made the difference. Highly recommend."', extra: 'The hands-on Azure OpenAI Service labs were unlike anything I found in self-paced courses. We built real prompt-engineering workflows and tested GPT-4 deployments. The trainer had actual project experience with enterprise AI — it showed in every session.', highlights: ['Azure OpenAI Labs', 'Expert MCT'], showMore: true, name: 'David L.', country: 'United States', badge: 'AI-102 Certified', date: '2 weeks ago', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop&crop=faces&auto=format&q=80' },
  { quote: '"DP-600 Fabric certification done in 3 weeks of part-time study. The customised schedule around my timezone was a lifesaver."', extra: 'Being based in Tokyo, timezone compatibility was my biggest concern. Koenig scheduled every session around my work hours with zero compromise on content. The Fabric lakehouse labs were comprehensive and exam-relevant.', highlights: ['Timezone Flexible', 'Fabric Labs'], name: 'Mei W.', country: 'Japan', badge: 'DP-600 Certified', date: '6 months ago', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces&auto=format&q=80' },
  { quote: '"Our whole DevOps team got AZ-400 certified through Koenig\'s corporate training. Smooth logistics and top-tier MCTs throughout."', extra: 'We had 18 engineers across 3 countries attending the same live online sessions. Koenig managed the cross-timezone cohort brilliantly. The MCT tailored pipeline lab scenarios to our actual GitHub Actions setup.', highlights: ['Corporate Cohort', 'Live Online'], name: 'Carlos R.', country: 'Brazil', badge: 'AZ-400 Team Training', date: '4 months ago', img: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=80&h=80&fit=crop&crop=faces&auto=format&q=80' },
  { quote: '"The custom SAP curriculum matched our exact S/4HANA implementation. The most relevant enterprise training we have ever run."', extra: 'Other vendors used generic SAP content. Koenig\'s team spent two weeks before training analysing our S/4HANA configuration and built a curriculum around our actual system. The ROI was immediate — our team hit the ground running post-training.', highlights: ['Custom Curriculum', 'S/4HANA Focused'], name: 'Fatima A.', country: 'Saudi Arabia', badge: 'SAP S/4HANA', date: '3 months ago', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=faces&auto=format&q=80' },
]

type EntTestimonial = { quote: string; extra: string; highlights: string[]; showMore?: boolean; name: string; country: string; badge: string; date: string; img: string }
function EntTestimonialCard({ t, onExpandChange }: { t: EntTestimonial; onExpandChange?: (expanded: boolean) => void }) {
  const [expanded, setExpanded] = useState(false)
  const handleToggle = () => {
    const next = !expanded
    setExpanded(next)
    onExpandChange?.(next)
  }
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white h-full" style={{ border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
      <div className="flex-1 p-5">
        <div className="mb-2 text-xs text-yellow-400">★★★★★</div>
        <p className="mb-3 text-sm leading-relaxed" style={{ color: '#2d4a6a' }}>{t.quote}</p>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: expanded ? '220px' : '0px', opacity: expanded ? 1 : 0 }}
        >
          <p className="mb-3 text-sm leading-relaxed" style={{ color: '#4a7a9b' }}>{t.extra}</p>
        </div>
        {t.showMore && (
          <button
            onClick={handleToggle}
            className="mb-4 w-fit rounded-full border px-3 py-1 text-xs font-semibold text-[#0694D1] transition-all hover:bg-[#0694D1] hover:text-white"
            style={{ borderColor: '#0694D1' }}
          >
            {expanded ? 'Show Less ↑' : 'Show More ↓'}
          </button>
        )}
        <div className="flex items-center gap-3">
          <img src={t.img} alt={t.name} className="h-10 w-10 shrink-0 rounded-full object-cover" style={{ border: '2px solid #DCEEFB' }} />
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight" style={{ color: '#0d1b2a' }}>{t.name}</p>
            <p className="text-xs font-semibold" style={{ color: '#0694D1' }}>{t.country}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: '#E8F4FA', background: '#F8FCFF' }}>
        <div>
          <p className="text-xs font-bold" style={{ color: '#0d1b2a' }}>{t.badge}</p>
          <p className="mt-0.5 text-xs" style={{ color: '#999' }}>{t.date}</p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: '#E8F4FA', color: '#0569a8' }}>✓ Verified</span>
      </div>
    </div>
  )
}

function DraggableScrollColumn({ items, speed }: { items: EntTestimonial[]; speed: number }) {
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const paused = useRef(false)

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return
    let prev = performance.now()
    let raf: number
    function tick(now: number) {
      const dt = now - prev
      prev = now
      if (!paused.current && inner) {
        pos.current += speed * dt
        const half = inner.scrollHeight / 2
        if (half > 0 && pos.current >= half) pos.current -= half
        inner.style.transform = `translateY(-${pos.current}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [speed])

  return (
    <div
      style={{ height: '520px', overflow: 'hidden' }}
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
    >
      <div ref={innerRef} className="flex flex-col gap-4 pb-4">
        {[...items, ...items].map((t, i) => <EntTestimonialCard key={i} t={t} />)}
      </div>
    </div>
  )
}

const ALL_ENT_TESTIMONIALS = [...TESTIMONIALS_COL1, ...TESTIMONIALS_COL2, ...TESTIMONIALS_COL3]

function EntMobileTestimonialMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const paused = useRef(false)
  const expandedCount = useRef(0)
  const dragStartX = useRef(0)
  const dragStartPos = useRef(0)

  useEffect(() => {
    const inner = trackRef.current
    if (!inner) return
    let prev = performance.now()
    let raf: number
    function tick(now: number) {
      const dt = now - prev
      prev = now
      if (!paused.current && inner) {
        pos.current += 0.04 * dt
        const half = inner.scrollWidth / 2
        if (half > 0 && pos.current >= half) pos.current -= half
        inner.style.transform = `translateX(-${pos.current}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className="sm:hidden overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
      onTouchStart={e => {
        paused.current = true
        dragStartX.current = e.touches[0].clientX
        dragStartPos.current = pos.current
      }}
      onTouchMove={e => {
        const delta = dragStartX.current - e.touches[0].clientX
        const inner = trackRef.current
        if (!inner) return
        const half = inner.scrollWidth / 2
        let newPos = dragStartPos.current + delta
        if (newPos < 0) newPos = 0
        if (half > 0 && newPos >= half) newPos = half - 1
        pos.current = newPos
        inner.style.transform = `translateX(-${pos.current}px)`
      }}
      onTouchEnd={() => {
        if (expandedCount.current === 0) paused.current = false
      }}
    >
      <div
        ref={trackRef}
        className="flex items-stretch gap-4 py-2"
        style={{ width: 'max-content' }}
      >
        {[...ALL_ENT_TESTIMONIALS, ...ALL_ENT_TESTIMONIALS].map((t, i) => (
          <div key={i} style={{ width: '280px', flexShrink: 0 }}>
            <EntTestimonialCard
              t={t}
              onExpandChange={exp => {
                expandedCount.current += exp ? 1 : -1
                if (expandedCount.current < 0) expandedCount.current = 0
                paused.current = expandedCount.current > 0
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const WHY = [
  { title: '50+ Vendor Partnerships',    desc: 'Microsoft Gold, AWS, Cisco, Cisco, VMware, Red Hat, and 45+ more — all under one roof.' },
  { title: 'Guaranteed Scheduling',      desc: 'Every batch confirmed. We never cancel or postpone. Your training plan runs on time, every time.' },
  { title: 'Global Reach',               desc: 'Training delivered in 195+ countries in multiple languages with local timezone support.' },
  { title: 'Certified Instructors Only', desc: 'Every instructor holds active vendor certifications and brings real-world enterprise experience.' },
  { title: 'Flexible Learning Formats',  desc: 'Live Online, Classroom, 1-on-1, Fly-Me-a-Trainer, Flexi — whatever works for your team.' },
  { title: 'End-to-End Support',         desc: 'From needs analysis to post-training reporting — a dedicated account manager handles everything.' },
]

/* ─── New Data ───────────────────────────────────────────── */

const ENTERPRISE_CLIENTS = [
  { name: 'Google',             img: 'google.png'               },
  { name: 'Microsoft',          img: 'ms.png'                   },
  { name: 'Adobe',              img: 'adobe.png'                },
  { name: 'Dell',               img: 'dell.png'                 },
  { name: 'HP',                 img: 'hp.png'                   },
  { name: 'Infosys',            img: 'infosys.png'              },
  { name: 'TCS',                img: 'TCS.png'                  },
  { name: 'Wipro',              img: 'wipro.png'                },
  { name: 'HCL Technologies',   img: 'hcl-technologies.png'     },
  { name: 'Cognizant',          img: 'cts.png'                  },
  { name: 'EY',                 img: 'EY.png'                   },
  { name: 'PwC',                img: 'pwc.png'                  },
  { name: 'McKinsey & Company', img: 'mcKinsey-and-company.png' },
  { name: 'Bain & Company',     img: 'Bain-and-Company.png'     },
  { name: 'HSBC',               img: 'hsbc.png'                 },
  { name: 'Shell',              img: 'shell 1.png'              },
  { name: 'Chevron',            img: 'chevron.png'              },
  { name: 'Saudi Aramco',       img: 'aramco.png'               },
  { name: 'Bharat Petroleum',   img: 'Bharat-Petroleum.png'     },
  { name: 'GE',                 img: 'ge.png'                   },
  { name: 'Fujifilm',           img: 'fuji.png'                 },
  { name: 'DHL',                img: 'dhl.png'                  },
  { name: 'Emirates',           img: 'Emirates.png'             },
  { name: 'NTT',                img: 'NTT.png'                  },
  { name: 'NHS',                img: 'NHS.png'                  },
  { name: 'United Nations',     img: 'united-nations.png'       },
  { name: 'Capgemini',          img: 'capeg.png'                },
]

const INDUSTRIES = [
  {
    name: 'Technology & Software',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>,
    desc: 'Accelerate product delivery with DevOps, cloud-native, and AI/ML certifications at scale for engineering teams.',
    tags: ['Kubernetes', 'AWS / Azure', 'DevSecOps'],
  },
  {
    name: 'Financial Services',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
    desc: 'Upskill risk analysts, compliance officers, and cloud architects across banking, insurance, and fintech.',
    tags: ['Cloud Security', 'Risk & Compliance', 'AI/ML'],
  },
  {
    name: 'Manufacturing & Engineering',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>,
    desc: 'Enable digital transformation with IIoT, automation, and ERP training from shop-floor to C-suite.',
    tags: ['SAP S/4HANA', 'IoT & Automation', 'PMP'],
  },
  {
    name: 'Healthcare & Life Sciences',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>,
    desc: 'Equip IT teams with HIPAA-compliant cloud, data management, and cybersecurity expertise at scale.',
    tags: ['Data Privacy', 'Cloud Computing', 'DevOps'],
  },
  {
    name: 'Government & Defence',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
    desc: 'Deliver security-cleared, compliance-driven training for public sector IT and defence organisations worldwide.',
    tags: ['Cybersecurity', 'ITSM / ITIL', 'CompTIA'],
  },
  {
    name: 'Energy & Utilities',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z"/>,
    desc: 'Future-proof infrastructure teams with OT/IT convergence, cloud migration, and project management skills.',
    tags: ['SCADA / OT', 'Cloud Migration', 'Cisco Networking'],
  },
]

const ROI_METRICS = [
  { value: '94%',  label: 'First-Attempt Certification Pass Rate', sub: 'Across all 5,000+ courses' },
  { value: '3×',   label: 'Faster Skill Acquisition',              sub: 'vs. self-study or e-learning' },
  { value: '48h',  label: 'Average Programme Launch Time',         sub: 'From brief to live training' },
  { value: '$0',   label: 'Hidden or Unexpected Costs',            sub: 'All-inclusive transparent pricing' },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Submit Your Brief',
    desc: 'Share your team size, required skills, and timeline via our quick-start form or a 30-minute consultation call.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>,
    color: '#0694D1',
  },
  {
    step: '02',
    title: 'Receive a Custom Plan',
    desc: 'Your dedicated account manager presents a tailored curriculum, delivery format, and cost estimate within 48 hours.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>,
    color: '#076D9D',
  },
  {
    step: '03',
    title: 'Approve & Schedule',
    desc: 'Confirm dates, select formats — Live Online, Classroom, or 1-on-1 — and receive a guaranteed training calendar.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>,
    color: '#0694D1',
  },
  {
    step: '04',
    title: 'Train, Certify & Report',
    desc: 'Your team trains with certified instructors. We track progress, manage re-sits, and deliver a full ROI report.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>,
    color: '#076D9D',
  },
]

const TECH_TRENDS = [
  { label: 'HOT',      name: 'Generative AI & LLMs',     growth: '+340%', desc: 'Prompt engineering, RAG pipelines, fine-tuning, and AI governance at enterprise scale.',    courses: '120+', accent: '#FF6B35' },
  { label: 'HOT',      name: 'Cloud-Native & Kubernetes', growth: '+185%', desc: 'Container orchestration, GitOps, service mesh, and multi-cloud architecture.',               courses: '280+', accent: '#0694D1' },
  { label: 'RISING',   name: 'Zero Trust Security',       growth: '+210%', desc: 'Identity-centric, perimeter-less security for hybrid and cloud-first enterprises.',          courses: '95+',  accent: '#8B5CF6' },
  { label: 'RISING',   name: 'FinOps & Cloud Cost',       growth: '+168%', desc: 'Cloud financial management, cost allocation, and optimisation at enterprise scale.',         courses: '40+',  accent: '#10B981' },
  { label: 'EMERGING', name: 'Quantum Computing',         growth: '+420%', desc: 'Quantum algorithms, Qiskit, and post-quantum cryptography for enterprise readiness.',        courses: '18+',  accent: '#F59E0B' },
  { label: 'RISING',   name: 'DevSecOps & SBOM',          growth: '+145%', desc: 'Shift-left security, supply-chain integrity, and automated compliance pipelines.',           courses: '160+', accent: '#38bdf8' },
  { label: 'EMERGING', name: 'Edge AI & TinyML',          growth: '+290%', desc: 'On-device inference and real-time AI for manufacturing, retail, and smart infrastructure.', courses: '55+',  accent: '#EC4899' },
]

/* ─── Footer data ───────────────────────────────────────────── */
const FOOTER_COLS = [
  { heading: 'Company', links: ['About us','Leadership','Contact Us','Webinars','Our Clientele','All Courses','Our Partners','Our Story','Testimonials','Our Awards'] },
  { heading: 'Learning Options', links: ['Explore All Learning Options','Live Online Training','1-on-1 Training','Classroom Training','Fly-me-a-Trainer (FMAT)','Flexi','Customized Training','Webinar as a Service','Techlabs','Learnova','AI Agent'] },
  { heading: 'Resources', links: ['Technical Questions & Answers','Blog','Sitemap','Koenig Koshish','Qubits','Certificate Authenticator','Microsoft Products'] },
  { heading: 'Others', links: ['Environment Policy','Payment Methods','Terms of Service','Career','Privacy Policy',"What's New",'Media Report'] },
]
const FOOTER_BOTTOM_COLS = [
  { heading: 'Top Technologies', links: ['Cloud Computing','Artificial Intelligence','Microsoft Office','Security','Microsoft Dynamics'] },
  { heading: 'Top Partners', links: ['Microsoft','AWS','Cisco','PECB','VMware'] },
]
const TOP_COURSES_COL1 = [
  'PL-300T00: Design and Manage Analytics Solutions Using Power BI',
  'AZ-104T00-A: Microsoft Azure Administrator',
  'AI-102T00: Develop AI Solutions in Azure',
  'ITIL® 4 Foundation',
  'Automation in a Day',
]
const TOP_COURSES_COL2 = [
  'DP-700T00: Microsoft Fabric Data Engineer',
  'AWS Certified Solutions Architect - Associate (Architecting on AWS)',
  'AZ-305T00: GH-300: GitHub Copilot Fundamentals',
  'AZ-400T00-A: Designing and Implementing Microsoft DevOps Solutions',
  'VMware vSphere: Install, Configure, Manage [V8]',
]

const FAQS = [
  { q: 'What is the minimum team size for enterprise training?', a: 'We accommodate teams of any size — from a single employee in 1-on-1 format to enterprise-wide rollouts of 1,000+ staff. Pricing and formats are fully customised to your headcount and objectives.' },
  { q: 'Can training be delivered at our office location?', a: 'Yes. Our Fly-Me-a-Trainer (FMAT) service deploys certified instructors directly to your premises anywhere in the world — ideal for large teams or classified environments.' },
  { q: 'How quickly can a programme be launched?', a: 'For standard certification programmes we can go from brief to live training within 48 hours. Custom-built curricula typically require 5–10 business days for instructional design.' },
  { q: 'Do you offer post-training reporting and ROI tracking?', a: 'Yes. Every enterprise engagement includes a training-completion report, certification tracking dashboard, and an optional ROI analysis aligned to your L&D KPIs.' },
  { q: 'Are all instructors vendor-certified?', a: 'Absolutely. Every Koenig instructor holds active certifications from the vendor they teach — Microsoft, AWS, Cisco, etc. — and brings a minimum of 5 years of real-world enterprise experience.' },
  { q: 'What happens if an employee does not pass their certification exam?', a: 'We include exam-prep support and, for most programmes, a complimentary re-sit session. Our 94% first-attempt pass rate means this is rarely needed — but the safety net is always there.' },
]

/* ─── Bento Hero Animation ───────────────────────────────── */

/* Per-card colour themes */
const BENTO_THEMES: Record<string, { card: string; border: string; overlay: string; badge: string; badgeBorder: string; text: string }> = {
  'GEN AI':            { card: 'rgba(237,233,255,0.82)', border: 'rgba(139,92,246,0.32)',  overlay: 'rgba(237,233,255,0.97)', badge: 'rgba(139,92,246,0.13)', badgeBorder: 'rgba(139,92,246,0.35)', text: '#6d28d9' },
  'MANAGEMENT':        { card: 'rgba(219,242,255,0.82)', border: 'rgba(6,148,209,0.35)',   overlay: 'rgba(219,242,255,0.97)', badge: 'rgba(6,148,209,0.13)',  badgeBorder: 'rgba(6,148,209,0.38)',  text: '#076d9d' },
  'FINANCE':           { card: 'rgba(220,252,231,0.82)', border: 'rgba(16,185,129,0.32)',  overlay: 'rgba(220,252,231,0.97)', badge: 'rgba(16,185,129,0.13)', badgeBorder: 'rgba(16,185,129,0.35)', text: '#047857' },
  'DATA SCIENCE':      { card: 'rgba(207,250,254,0.82)', border: 'rgba(6,182,212,0.32)',   overlay: 'rgba(207,250,254,0.97)', badge: 'rgba(6,182,212,0.13)',  badgeBorder: 'rgba(6,182,212,0.35)',  text: '#0891b2' },
  'TECHNOLOGY':        { card: 'rgba(255,243,220,0.82)', border: 'rgba(245,158,11,0.32)',  overlay: 'rgba(255,243,220,0.97)', badge: 'rgba(245,158,11,0.13)', badgeBorder: 'rgba(245,158,11,0.35)', text: '#b45309' },
  'FUNCTIONAL SKILLS': { card: 'rgba(255,228,240,0.82)', border: 'rgba(236,72,153,0.28)',  overlay: 'rgba(255,228,240,0.97)', badge: 'rgba(236,72,153,0.11)', badgeBorder: 'rgba(236,72,153,0.30)', text: '#be185d' },
}


/* Shared card wrapper */
function BentoCard({ label, children, style }: {
  label: string; children: React.ReactNode; style?: React.CSSProperties
}) {
  const th = BENTO_THEMES[label] ?? BENTO_THEMES['MANAGEMENT']
  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderRadius: 14,
        background: th.card,
        border: `1px solid ${th.border}`,
        backdropFilter: 'blur(12px)',
        boxShadow: `0 4px 24px ${th.border.replace('0.32','0.12').replace('0.35','0.12').replace('0.28','0.10')}`,
        ...style,
      }}
    >
      {children}
      {/* Label overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-2"
        style={{ background: `linear-gradient(to top,${th.overlay} 60%,transparent)` }}
      >
        <span
          className="inline-block text-sm font-semibold tracking-[0.12em] px-2.5 py-1 rounded"
          style={{ background: th.badge, border: `1px solid ${th.badgeBorder}`, color: th.text }}
        >{label}</span>
      </div>
    </div>
  )
}

/* ── Canvas 1: GEN AI — human brain + AI neural network ── */
function CanvasNeuralNet() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => { const r = c.getBoundingClientRect(); if (r.width) { c.width = r.width; c.height = r.height } }
    resize(); window.addEventListener('resize', resize)
    const IN_TOKENS  = ['Prompt', 'Context', 'Query', 'Input', 'Data', 'Task']
    const OUT_TOKENS = ['Answer', 'Output', 'Stream', 'Result', 'Code', 'Done']
    // Fixed neural nodes inside brain (relative to brain center, -1..1)
    const BNODES = [
      { rx: -0.28, ry: -0.42 }, { rx: 0.28, ry: -0.42 },
      { rx: -0.54, ry: -0.08 }, { rx: 0.00, ry: -0.18 }, { rx: 0.54, ry: -0.08 },
      { rx: -0.38, ry:  0.22 }, { rx: 0.12, ry:  0.16 }, { rx: 0.42, ry:  0.22 },
      { rx: -0.14, ry:  0.42 }, { rx: 0.22, ry:  0.40 },
    ]
    const BEDGES = [[0,1],[0,2],[0,3],[1,3],[1,4],[2,3],[3,4],[2,5],[3,6],[4,7],[5,6],[6,7],[5,8],[6,8],[7,9],[8,9]]
    const loop = () => {
      const W = c.width, H = c.height, t = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)
      const N = IN_TOKENS.length
      const tH = Math.min(H * 0.095, 16), tW = Math.min(W * 0.21, 44)
      const gapY = (H - N * tH) / (N + 1)
      const inX = W * 0.03, outX = W - tW - W * 0.03
      const inTks  = Array.from({ length: N }, (_, i) => ({ x: inX,  y: gapY + i * (tH + gapY) + tH / 2 }))
      const outTks = Array.from({ length: N }, (_, i) => ({ x: outX, y: gapY + i * (tH + gapY) + tH / 2 }))
      // Brain geometry
      const bx = W * 0.5, by = H * 0.48
      const bw = Math.min(W * 0.19, H * 0.26), bh = bw * 1.22
      const glow = 0.5 + 0.5 * Math.sin(t * 1.3)
      // Outer glow aura
      const aura = ctx.createRadialGradient(bx, by, 0, bx, by, bw * 1.6)
      aura.addColorStop(0, `rgba(6,148,209,${0.10 + glow * 0.09})`); aura.addColorStop(1, 'rgba(6,148,209,0)')
      ctx.beginPath(); ctx.ellipse(bx, by, bw * 1.6, bh * 1.35, 0, 0, 6.28); ctx.fillStyle = aura; ctx.fill()
      // Brain outline — two hemispheres
      const ba = 0.30 + glow * 0.22
      ctx.beginPath()
      ctx.moveTo(bx - bw * 0.06, by - bh * 0.82)
      ctx.bezierCurveTo(bx - bw * 0.28, by - bh * 1.02, bx - bw * 0.96, by - bh * 0.80, bx - bw, by - bh * 0.08)
      ctx.bezierCurveTo(bx - bw, by + bh * 0.46, bx - bw * 0.52, by + bh * 0.58, bx - bw * 0.06, by + bh * 0.38)
      ctx.bezierCurveTo(bx + bw * 0.52, by + bh * 0.58, bx + bw, by + bh * 0.46, bx + bw, by - bh * 0.08)
      ctx.bezierCurveTo(bx + bw * 0.96, by - bh * 0.80, bx + bw * 0.28, by - bh * 1.02, bx + bw * 0.06, by - bh * 0.82)
      ctx.closePath()
      ctx.strokeStyle = `rgba(6,148,209,${ba})`; ctx.lineWidth = 1.4; ctx.stroke()
      // Center fissure
      ctx.beginPath()
      ctx.moveTo(bx, by - bh * 0.82)
      ctx.bezierCurveTo(bx - bw * 0.04, by - bh * 0.28, bx + bw * 0.04, by + bh * 0.08, bx, by + bh * 0.38)
      ctx.strokeStyle = `rgba(6,148,209,${ba * 0.45})`; ctx.lineWidth = 0.8; ctx.stroke()
      // Gyri / sulci details — left hemisphere
      const gyriL: [number, number, number, number, number, number][] = [
        [-0.72, -0.52, -0.48, -0.66, -0.12, -0.52],
        [-0.88, -0.08, -0.60, -0.24, -0.10, -0.06],
        [-0.62,  0.18, -0.40,  0.06, -0.08,  0.20],
      ]
      gyriL.forEach(([x1,y1,cx1,cy1,x2,y2]) => {
        ctx.beginPath()
        ctx.moveTo(bx + x1*bw, by + y1*bh)
        ctx.quadraticCurveTo(bx + cx1*bw, by + cy1*bh, bx + x2*bw, by + y2*bh)
        ctx.strokeStyle = `rgba(56,189,248,${0.18 + glow * 0.10})`; ctx.lineWidth = 0.7; ctx.stroke()
      })
      // Mirror gyri for right hemisphere
      gyriL.forEach(([x1,y1,cx1,cy1,x2,y2]) => {
        ctx.beginPath()
        ctx.moveTo(bx - x1*bw, by + y1*bh)
        ctx.quadraticCurveTo(bx - cx1*bw, by + cy1*bh, bx - x2*bw, by + y2*bh)
        ctx.strokeStyle = `rgba(56,189,248,${0.18 + glow * 0.10})`; ctx.lineWidth = 0.7; ctx.stroke()
      })
      // Neural nodes inside brain
      const bNodes = BNODES.map(n => ({ x: bx + n.rx * bw, y: by + n.ry * bh }))
      BEDGES.forEach(([ai, bi], ei) => {
        const a = bNodes[ai], b = bNodes[bi]
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = 'rgba(56,189,248,0.16)'; ctx.lineWidth = 0.7; ctx.stroke()
        const p = ((t * 1.0 + ei * 0.21) % 1)
        const px = a.x + (b.x - a.x) * p, py = a.y + (b.y - a.y) * p
        const sg = ctx.createRadialGradient(px, py, 0, px, py, 3.5)
        sg.addColorStop(0, 'rgba(56,189,248,0.85)'); sg.addColorStop(1, 'rgba(6,148,209,0)')
        ctx.beginPath(); ctx.arc(px, py, 3.5, 0, 6.28); ctx.fillStyle = sg; ctx.fill()
      })
      bNodes.forEach((n, i) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 2.1 + i * 0.9)
        const r = 2.4 + pulse * 1.4
        const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3)
        ng.addColorStop(0, `rgba(6,148,209,${0.28 + pulse * 0.18})`); ng.addColorStop(1, 'rgba(6,148,209,0)')
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 3, 0, 6.28); ctx.fillStyle = ng; ctx.fill()
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 6.28)
        ctx.fillStyle = 'rgba(232,244,250,0.95)'; ctx.fill()
        ctx.strokeStyle = `rgba(56,189,248,${0.5 + pulse * 0.5})`; ctx.lineWidth = 1.1; ctx.stroke()
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 0.33, 0, 6.28)
        ctx.fillStyle = `rgba(56,189,248,${0.7 + pulse * 0.3})`; ctx.fill()
      })
      // Input token → brain connections
      const brainLX = bx - bw * 0.94
      inTks.forEach((tk, i) => {
        const bLy = by - bh * 0.52 + (i / (N - 1)) * bh * 0.82
        ctx.beginPath(); ctx.moveTo(tk.x + tW, tk.y)
        ctx.quadraticCurveTo((tk.x + tW + brainLX) / 2, (tk.y + bLy) / 2, brainLX, bLy)
        ctx.strokeStyle = 'rgba(6,148,209,0.13)'; ctx.lineWidth = 0.8; ctx.stroke()
        const p = ((t * 0.65 + i * 0.19) % 1)
        const qx = (1-p)*(1-p)*(tk.x+tW) + 2*(1-p)*p*((tk.x+tW+brainLX)/2) + p*p*brainLX
        const qy = (1-p)*(1-p)*tk.y + 2*(1-p)*p*((tk.y+bLy)/2) + p*p*bLy
        const g = ctx.createRadialGradient(qx, qy, 0, qx, qy, 4)
        g.addColorStop(0, 'rgba(56,189,248,0.8)'); g.addColorStop(1, 'rgba(56,189,248,0)')
        ctx.beginPath(); ctx.arc(qx, qy, 4, 0, 6.28); ctx.fillStyle = g; ctx.fill()
      })
      // Brain → output token connections
      const brainRX = bx + bw * 0.94
      const streamed = Math.floor(t * 0.85) % (N + 3)
      outTks.forEach((tk, i) => {
        const bRy = by - bh * 0.52 + (i / (N - 1)) * bh * 0.82
        ctx.beginPath(); ctx.moveTo(brainRX, bRy)
        ctx.quadraticCurveTo((brainRX + tk.x) / 2, (bRy + tk.y) / 2, tk.x, tk.y)
        ctx.strokeStyle = 'rgba(6,148,209,0.13)'; ctx.lineWidth = 0.8; ctx.stroke()
        if (i < streamed) {
          const p = ((t * 0.65 + i * 0.23 + 0.5) % 1)
          const qx = (1-p)*(1-p)*brainRX + 2*(1-p)*p*((brainRX+tk.x)/2) + p*p*tk.x
          const qy = (1-p)*(1-p)*bRy + 2*(1-p)*p*((bRy+tk.y)/2) + p*p*tk.y
          const g = ctx.createRadialGradient(qx, qy, 0, qx, qy, 4)
          g.addColorStop(0, 'rgba(56,189,248,0.8)'); g.addColorStop(1, 'rgba(56,189,248,0)')
          ctx.beginPath(); ctx.arc(qx, qy, 4, 0, 6.28); ctx.fillStyle = g; ctx.fill()
        }
      })
      // Token box helper
      const drawToken = (x: number, y: number, label: string, accent: string, alpha: number, cursor: boolean) => {
        const by2 = y - tH / 2
        ctx.fillStyle = `rgba(${accent},${0.52 * alpha})`; ctx.fillRect(x, by2, tW, tH)
        ctx.strokeStyle = `rgba(${accent},${0.8 * alpha})`; ctx.lineWidth = 1; ctx.strokeRect(x, by2, tW, tH)
        ctx.font = `600 ${Math.max(6, tH * 0.52)}px monospace`; ctx.textAlign = 'center'
        ctx.fillStyle = `rgba(7,49,70,${alpha})`
        ctx.fillText(label, x + tW / 2, y + tH * 0.18)
        if (cursor && Math.sin(t * 5) > 0) {
          ctx.fillStyle = 'rgba(56,189,248,0.9)'; ctx.fillRect(x + tW - 4, by2 + 2, 2, tH - 4)
        }
      }
      // Input tokens
      inTks.forEach((tk, i) => {
        const act = 0.5 + 0.5 * Math.abs(Math.sin(t * 1.6 + i * 0.9))
        drawToken(tk.x, tk.y, IN_TOKENS[i], '6,148,209', act, false)
      })
      // Output tokens — streaming one by one
      outTks.forEach((tk, i) => {
        if (i >= streamed) return
        const isNew = i === streamed - 1
        const act = isNew ? 1 : 0.6 + 0.4 * Math.abs(Math.sin(t * 1.4 + i * 0.7))
        drawToken(tk.x, tk.y, OUT_TOKENS[i], isNew ? '6,148,209' : '6,148,209', act, isNew)
      })
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

/* ── Canvas 2: MANAGEMENT — card-based org chart with roles, depts & status ── */
function CanvasManagement() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => { const r = c.getBoundingClientRect(); if (r.width) { c.width = r.width; c.height = r.height } }
    resize(); window.addEventListener('resize', resize)
    type Nd = { rx: number; ry: number; role: string; dept: string; lvl: number; acc: string }
    const NODES: Nd[] = [
      { rx: 0.50, ry: 0.11, role: 'CEO',     dept: 'Executive',   lvl: 0, acc: '56,189,248' },
      { rx: 0.27, ry: 0.42, role: 'VP Eng',  dept: 'Engineering', lvl: 1, acc: '6,148,209'  },
      { rx: 0.73, ry: 0.42, role: 'VP Ops',  dept: 'Operations',  lvl: 1, acc: '6,148,209'  },
      { rx: 0.12, ry: 0.76, role: 'Lead',    dept: 'Dev',         lvl: 2, acc: '7,109,157'  },
      { rx: 0.40, ry: 0.76, role: 'Lead',    dept: 'QA',          lvl: 2, acc: '7,109,157'  },
      { rx: 0.60, ry: 0.76, role: 'Lead',    dept: 'Ops',         lvl: 2, acc: '7,109,157'  },
      { rx: 0.88, ry: 0.76, role: 'Analyst', dept: 'Data',        lvl: 2, acc: '7,109,157'  },
    ]
    const EDGES: [number, number][] = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]]
    const loop = () => {
      const W = c.width, H = c.height, t = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)
      const baseW = Math.min(W * 0.25, 58), baseH = Math.min(H * 0.165, 26)
      const SCALE = [1.28, 1.1, 1.1, 1.0, 1.0, 1.0, 1.0]
      const nodes = NODES.map((n, i) => ({
        ...n,
        x: W * n.rx, y: H * n.ry,
        w: baseW * SCALE[i], h: baseH * SCALE[i],
      }))
      // Bezier edges with arrowhead + animated particle
      EDGES.forEach(([ai, bi], ei) => {
        const a = nodes[ai], b = nodes[bi]
        const ax = a.x, ay = a.y + a.h / 2
        const bx = b.x, by = b.y - b.h / 2
        const my = (ay + by) / 2
        ctx.beginPath(); ctx.moveTo(ax, ay)
        ctx.bezierCurveTo(ax, my, bx, my, bx, by)
        ctx.strokeStyle = 'rgba(6,148,209,0.22)'; ctx.lineWidth = 1; ctx.stroke()
        // Arrowhead
        const ang = Math.atan2(by - my, bx - mx(ax, bx))
        const as = 4.5
        ctx.beginPath()
        ctx.moveTo(bx, by)
        ctx.lineTo(bx - as * Math.cos(ang - 0.45), by - as * Math.sin(ang - 0.45))
        ctx.lineTo(bx - as * Math.cos(ang + 0.45), by - as * Math.sin(ang + 0.45))
        ctx.closePath()
        ctx.fillStyle = 'rgba(6,148,209,0.38)'; ctx.fill()
        // Particle
        const p = ((t * 0.55 + ei * 0.24) % 1)
        const qx = (1-p)*(1-p)*(1-p)*ax + 3*(1-p)*(1-p)*p*ax + 3*(1-p)*p*p*bx + p*p*p*bx
        const qy = (1-p)*(1-p)*(1-p)*ay + 3*(1-p)*(1-p)*p*my + 3*(1-p)*p*p*my + p*p*p*by
        const g = ctx.createRadialGradient(qx, qy, 0, qx, qy, 5)
        g.addColorStop(0, 'rgba(56,189,248,0.9)'); g.addColorStop(1, 'rgba(56,189,248,0)')
        ctx.beginPath(); ctx.arc(qx, qy, 5, 0, 6.28); ctx.fillStyle = g; ctx.fill()
        ctx.beginPath(); ctx.arc(qx, qy, 2, 0, 6.28); ctx.fillStyle = '#38bdf8'; ctx.fill()
      })
      // Helper: mx used inline above
      function mx(ax: number, bx: number) { return (ax + bx) / 2 }
      // Draw node cards
      nodes.forEach((n, i) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.8 + i * 0.88)
        const x = n.x - n.w / 2, y = n.y - n.h / 2
        const rad = 5
        // Card bg
        ctx.beginPath(); ctx.roundRect(x, y, n.w, n.h, rad)
        ctx.fillStyle = 'rgba(232,244,250,0.90)'; ctx.fill()
        ctx.strokeStyle = `rgba(${n.acc},${0.42 + pulse * 0.32})`
        ctx.lineWidth = n.lvl === 0 ? 1.4 : 1; ctx.stroke()
        // Left accent strip
        ctx.beginPath(); ctx.roundRect(x, y, 3, n.h, [rad, 0, 0, rad])
        ctx.fillStyle = `rgba(${n.acc},${0.75 + pulse * 0.25})`; ctx.fill()
        // Person icon — centered in card
        // Icon spans: top = iY - hR*1.6, bottom = iY + hR*1.1 (total height hR*2.7)
        // Set iY so visual centre = card centre (n.y)
        const hR = n.h * 0.22
        const iX = n.x
        const iY = n.y + hR * 0.25
        const iCol = `rgba(${n.acc},0.88)`
        ctx.beginPath(); ctx.arc(iX, iY - hR * 0.6, hR, 0, 6.28); ctx.fillStyle = iCol; ctx.fill()
        ctx.beginPath(); ctx.arc(iX, iY + hR * 1.1, hR * 1.35, Math.PI, 0); ctx.fillStyle = iCol; ctx.fill()
        // Status dot (top-right, pulsing)
        const dX = x + n.w - 7, dY = y + 7
        const dR = 2.2 + pulse * 0.9
        const dg = ctx.createRadialGradient(dX, dY, 0, dX, dY, dR * 2.2)
        dg.addColorStop(0, `rgba(56,189,248,${0.65 + pulse * 0.35})`); dg.addColorStop(1, 'rgba(56,189,248,0)')
        ctx.beginPath(); ctx.arc(dX, dY, dR * 2.2, 0, 6.28); ctx.fillStyle = dg; ctx.fill()
        ctx.beginPath(); ctx.arc(dX, dY, dR * 0.55, 0, 6.28); ctx.fillStyle = 'rgba(56,189,248,0.95)'; ctx.fill()
      })
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

/* ── Canvas 3: FINANCE — candlestick chart with EMA line ── */
function CanvasFinance() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => { const r = c.getBoundingClientRect(); if (r.width) { c.width = r.width; c.height = r.height } }
    resize(); window.addEventListener('resize', resize)
    // [open, high, low, close] each 0-1
    const BASE: [number, number, number, number][] = [
      [0.42, 0.62, 0.34, 0.57],
      [0.57, 0.71, 0.50, 0.47],
      [0.47, 0.55, 0.37, 0.53],
      [0.53, 0.73, 0.51, 0.69],
      [0.69, 0.82, 0.60, 0.76],
      [0.76, 0.79, 0.54, 0.59],
      [0.59, 0.67, 0.41, 0.50],
    ]
    const loop = () => {
      const W = c.width, H = c.height, t = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)
      const floor = H * 0.86, ceiling = H * 0.10, range = floor - ceiling
      const n = BASE.length, bW = W / (n * 2.4)
      const gap = (W - bW * n) / (n + 1)
      // faint grid
      for (let gr = 0; gr < 4; gr++) {
        const gy = ceiling + (gr / 3) * range
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy)
        ctx.strokeStyle = 'rgba(6,148,209,0.07)'; ctx.lineWidth = 0.6; ctx.stroke()
      }
      // candles
      BASE.forEach(([o, h, l, cl], i) => {
        const animCl = cl + 0.06 * Math.sin(t * 1.1 + i * 0.65)
        const animH = Math.max(h, animCl) + 0.025 * Math.abs(Math.sin(t * 0.8 + i))
        const animL = Math.min(l, animCl) - 0.018 * Math.abs(Math.sin(t * 0.7 + i))
        const x = gap + i * (bW + gap) + bW / 2
        const oY = floor - o * range, cY = floor - animCl * range
        const hY = floor - animH * range, lY = floor - animL * range
        const isUp = animCl >= o
        const col = isUp ? 'rgba(56,189,248,0.92)' : 'rgba(6,100,180,0.72)'
        ctx.beginPath(); ctx.moveTo(x, hY); ctx.lineTo(x, lY)
        ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.stroke()
        const bodyY = Math.min(oY, cY), bodyH = Math.max(2, Math.abs(oY - cY))
        ctx.fillStyle = col; ctx.fillRect(x - bW / 2, bodyY, bW, bodyH)
        if (isUp) {
          const tg = ctx.createRadialGradient(x, cY, 0, x, cY, bW * 1.6)
          tg.addColorStop(0, 'rgba(56,189,248,0.32)'); tg.addColorStop(1, 'rgba(56,189,248,0)')
          ctx.beginPath(); ctx.arc(x, cY, bW * 1.6, 0, 6.28); ctx.fillStyle = tg; ctx.fill()
        }
      })
      // EMA line
      ctx.beginPath()
      BASE.forEach(([, , , cl], i) => {
        const animCl = cl + 0.06 * Math.sin(t * 1.1 + i * 0.65)
        const x = gap + i * (bW + gap) + bW / 2, y = floor - animCl * range
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.strokeStyle = 'rgba(56,189,248,0.55)'; ctx.lineWidth = 1.5
      ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([])
      // baseline
      ctx.beginPath(); ctx.moveTo(0, floor); ctx.lineTo(W, floor)
      ctx.strokeStyle = 'rgba(6,148,209,0.28)'; ctx.lineWidth = 0.8; ctx.stroke()
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

/* ── Canvas 4: DATA SCIENCE — ML training curves (loss + accuracy over epochs) ── */
function CanvasDataScience() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => { const r = c.getBoundingClientRect(); if (r.width) { c.width = r.width; c.height = r.height } }
    resize(); window.addEventListener('resize', resize)
    const N = 24 // epochs
    // Pre-computed stable curves (no Math.random in loop)
    const TRAIN_LOSS = Array.from({ length: N }, (_, i) =>
      Math.exp(-i * 0.21) * 0.84 + 0.07 + Math.sin(i * 3.7) * 0.025)
    const VAL_LOSS = Array.from({ length: N }, (_, i) =>
      Math.exp(-i * 0.17) * 0.80 + 0.11 + Math.sin(i * 2.4 + 1.1) * 0.034)
    const ACCURACY = Array.from({ length: N }, (_, i) =>
      Math.min(0.975, 1 - Math.exp(-i * 0.19) * 0.82 - 0.07 + Math.sin(i * 3.1 + 0.5) * 0.018))
    const loop = () => {
      const W = c.width, H = c.height, t = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)
      const mL = W * 0.11, mB = H * 0.20, mT = H * 0.14, mR = W * 0.04
      const cW = W - mL - mR, cH = H - mT - mB
      // Animate: draw progressively then hold, cycle every ~6 s
      const cycle = (t * 0.18) % 1
      const prog  = Math.min(1, cycle < 0.65 ? cycle / 0.65 : 1)
      const tipI  = prog * (N - 1)
      const tipFl = Math.floor(tipI), tipFr = tipI - tipFl
      // Map helpers
      const px = (i: number) => mL + (i / (N - 1)) * cW
      const py = (v: number) => mT + (1 - v) * cH  // 0 at bottom, 1 at top
      // Horizontal grid + Y-axis tick labels
      const fs = Math.max(5, W * 0.046)
      ctx.font = `${fs}px sans-serif`; ctx.fillStyle = 'rgba(7,109,157,0.70)'
      ctx.textAlign = 'right'
      for (let g = 0; g <= 4; g++) {
        const gy = mT + (g / 4) * cH
        ctx.beginPath(); ctx.moveTo(mL, gy); ctx.lineTo(mL + cW, gy)
        ctx.strokeStyle = 'rgba(6,148,209,0.16)'; ctx.lineWidth = 0.6; ctx.stroke()
        ctx.fillText(`${((4 - g) * 0.25).toFixed(2)}`, mL - 3, gy + fs * 0.35)
      }
      // X-axis epoch ticks
      ctx.fillStyle = 'rgba(7,109,157,0.65)'; ctx.textAlign = 'center'
      for (let e = 0; e <= 3; e++) {
        const gx = mL + (e / 3) * cW
        ctx.beginPath(); ctx.moveTo(gx, mT + cH); ctx.lineTo(gx, mT + cH + 3)
        ctx.strokeStyle = 'rgba(56,189,248,0.20)'; ctx.lineWidth = 0.7; ctx.stroke()
        ctx.fillText(`${Math.round((e / 3) * (N - 1))}`, gx, mT + cH + fs + 2)
      }
      // Axes
      ctx.beginPath(); ctx.moveTo(mL, mT); ctx.lineTo(mL, mT + cH); ctx.lineTo(mL + cW, mT + cH)
      ctx.strokeStyle = 'rgba(6,148,209,0.45)'; ctx.lineWidth = 1; ctx.stroke()
      // Axis labels
      ctx.font = `${fs}px sans-serif`
      ctx.fillStyle = 'rgba(7,109,157,0.70)'; ctx.textAlign = 'center'
      ctx.fillText('Epoch', mL + cW / 2, H - mB * 0.06)
      ctx.save(); ctx.translate(mL * 0.22, mT + cH / 2); ctx.rotate(-Math.PI / 2)
      ctx.fillText('Value', 0, 0); ctx.restore()
      // Draw a curve progressively up to tipI
      const drawCurve = (data: number[], col: string, lw: number, dash: number[]) => {
        if (tipFl < 1) return
        ctx.beginPath(); ctx.moveTo(px(0), py(data[0]))
        for (let i = 1; i <= tipFl; i++) ctx.lineTo(px(i), py(data[i]))
        if (tipFl < N - 1 && tipFr > 0) {
          const v = data[tipFl] + (data[tipFl + 1] - data[tipFl]) * tipFr
          ctx.lineTo(px(tipI), py(v))
        }
        ctx.strokeStyle = col; ctx.lineWidth = lw
        if (dash.length) ctx.setLineDash(dash)
        ctx.stroke()
        ctx.setLineDash([])
      }
      // Filled area under accuracy curve
      if (tipFl >= 1) {
        ctx.beginPath(); ctx.moveTo(px(0), py(ACCURACY[0]))
        for (let i = 1; i <= tipFl; i++) ctx.lineTo(px(i), py(ACCURACY[i]))
        if (tipFl < N - 1 && tipFr > 0) {
          const v = ACCURACY[tipFl] + (ACCURACY[tipFl + 1] - ACCURACY[tipFl]) * tipFr
          ctx.lineTo(px(tipI), py(v))
        }
        ctx.lineTo(px(tipI), mT + cH); ctx.lineTo(px(0), mT + cH); ctx.closePath()
        const ag = ctx.createLinearGradient(0, mT, 0, mT + cH)
        ag.addColorStop(0, 'rgba(7,109,157,0.18)'); ag.addColorStop(1, 'rgba(7,109,157,0)')
        ctx.fillStyle = ag; ctx.fill()
      }
      drawCurve(VAL_LOSS,  'rgba(7,109,157,0.65)',  1.1, [3, 2])
      drawCurve(TRAIN_LOSS,'rgba(56,189,248,0.90)',  1.5, [])
      drawCurve(ACCURACY,  'rgba(77,191,239,0.75)',  1.2, [])
      // Moving glow tip on train-loss curve
      if (tipFl >= 0) {
        const tipV = tipFl < N - 1 && tipFr > 0
          ? TRAIN_LOSS[tipFl] + (TRAIN_LOSS[tipFl + 1] - TRAIN_LOSS[tipFl]) * tipFr
          : TRAIN_LOSS[tipFl]
        const tx = px(tipI), ty = py(tipV)
        const dp = 0.5 + 0.5 * Math.sin(t * 7)
        const dg = ctx.createRadialGradient(tx, ty, 0, tx, ty, 7)
        dg.addColorStop(0, 'rgba(56,189,248,0.9)'); dg.addColorStop(1, 'rgba(56,189,248,0)')
        ctx.beginPath(); ctx.arc(tx, ty, 7, 0, 6.28); ctx.fillStyle = dg; ctx.fill()
        ctx.beginPath(); ctx.arc(tx, ty, 2.2 + dp * 0.8, 0, 6.28); ctx.fillStyle = '#38bdf8'; ctx.fill()
      }
      // Top readouts
      const ei = Math.min(tipFl, N - 1)
      ctx.font = `600 ${fs}px sans-serif`
      ctx.fillStyle = 'rgba(7,109,157,0.80)'; ctx.textAlign = 'left'
      ctx.fillText(`Epoch ${Math.round(tipI)}/${N - 1}`, mL, mT - fs * 0.6)
      ctx.fillStyle = 'rgba(7,109,157,0.65)'; ctx.textAlign = 'right'
      ctx.fillText(`Loss ${TRAIN_LOSS[ei].toFixed(3)}  Acc ${(ACCURACY[ei] * 100).toFixed(1)}%`, mL + cW, mT - fs * 0.6)
      // Legend
      const legY = mT + cH + mB * 0.52
      const items = [
        { col: 'rgba(56,189,248,0.9)', label: 'Train Loss', dash: false },
        { col: 'rgba(7,109,157,0.65)', label: 'Val Loss',   dash: true  },
        { col: 'rgba(77,191,239,0.8)', label: 'Accuracy',   dash: false },
      ]
      const segW = cW / items.length
      items.forEach((it, ii) => {
        const lx = mL + ii * segW
        ctx.strokeStyle = it.col; ctx.lineWidth = 1.4
        if (it.dash) ctx.setLineDash([3, 2])
        ctx.beginPath(); ctx.moveTo(lx, legY); ctx.lineTo(lx + 11, legY); ctx.stroke()
        ctx.setLineDash([])
        ctx.font = `${fs}px sans-serif`; ctx.fillStyle = 'rgba(7,109,157,0.75)'; ctx.textAlign = 'left'
        ctx.fillText(it.label, lx + 14, legY + fs * 0.38)
      })
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

/* ── Canvas 5: TECHNOLOGY — hexagonal pulse-wave grid ── */
function CanvasTechnology() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => { const r = c.getBoundingClientRect(); if (r.width) { c.width = r.width; c.height = r.height } }
    resize(); window.addEventListener('resize', resize)
    const drawHex = (cx: number, cy: number, r: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 - Math.PI / 6
        i === 0 ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
                : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
      }
      ctx.closePath()
    }
    const loop = () => {
      const W = c.width, H = c.height, t = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)
      const R = Math.min(W, H) * 0.10
      const hW = R * Math.sqrt(3), hH = R * 1.5
      const cols = Math.ceil(W / hW) + 2, rows = Math.ceil(H / hH) + 2
      const p1 = { x: W * 0.5, y: H * 0.5, ph: t * 1.5 }
      const p2 = { x: W * 0.18, y: H * 0.28, ph: t * 1.1 + 2.8 }
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const cx = col * hW + (row % 2 === 0 ? 0 : hW / 2)
          const cy = row * hH
          const d1 = Math.sqrt((cx - p1.x) ** 2 + (cy - p1.y) ** 2)
          const d2 = Math.sqrt((cx - p2.x) ** 2 + (cy - p2.y) ** 2)
          const w1 = 0.5 + 0.5 * Math.cos(d1 * 0.05 - p1.ph)
          const w2 = 0.5 + 0.5 * Math.cos(d2 * 0.07 - p2.ph)
          const intensity = Math.max(w1, w2)
          drawHex(cx, cy, R - 1.5)
          ctx.fillStyle = `rgba(6,148,209,${intensity * 0.25})`; ctx.fill()
          ctx.strokeStyle = `rgba(6,100,180,${0.12 + intensity * 0.60})`; ctx.lineWidth = 0.8; ctx.stroke()
          if (intensity > 0.84) {
            ctx.beginPath(); ctx.arc(cx, cy, 2.8, 0, 6.28)
            ctx.fillStyle = `rgba(56,189,248,${(intensity - 0.84) * 6})`; ctx.fill()
          }
        }
      }
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

/* ── Canvas 6: FUNCTIONAL SKILLS — morphing radar / spider chart ── */
function CanvasPuzzle() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => { const r = c.getBoundingClientRect(); if (r.width) { c.width = r.width; c.height = r.height } }
    resize(); window.addEventListener('resize', resize)
    const AXES = 6
    const P1 = [0.80, 0.60, 0.90, 0.50, 0.72, 0.82]
    const P2 = [0.50, 0.90, 0.62, 0.88, 0.58, 0.50]
    const loop = () => {
      const W = c.width, H = c.height, t = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)
      const cx = W * 0.5, cy = H * 0.5
      const R = Math.min(W, H) * 0.38
      const morph = 0.5 + 0.5 * Math.sin(t * 0.72)
      // grid rings
      for (let ring = 1; ring <= 4; ring++) {
        const rr = R * ring / 4
        ctx.beginPath()
        for (let a = 0; a < AXES; a++) {
          const angle = (a * Math.PI * 2) / AXES - Math.PI / 2
          const x = cx + rr * Math.cos(angle), y = cy + rr * Math.sin(angle)
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.strokeStyle = `rgba(6,148,209,${0.14 + ring * 0.04})`; ctx.lineWidth = 0.7; ctx.stroke()
      }
      // spokes
      for (let a = 0; a < AXES; a++) {
        const angle = (a * Math.PI * 2) / AXES - Math.PI / 2
        ctx.beginPath(); ctx.moveTo(cx, cy)
        ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle))
        ctx.strokeStyle = 'rgba(6,148,209,0.25)'; ctx.lineWidth = 0.7; ctx.stroke()
      }
      // filled morphing polygon
      const vals = P1.map((v, i) => v + (P2[i] - v) * morph)
      ctx.beginPath()
      vals.forEach((v, a) => {
        const angle = (a * Math.PI * 2) / AXES - Math.PI / 2
        const x = cx + R * v * Math.cos(angle), y = cy + R * v * Math.sin(angle)
        a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.fillStyle = 'rgba(6,148,209,0.22)'; ctx.fill()
      ctx.strokeStyle = 'rgba(56,189,248,0.75)'; ctx.lineWidth = 1.6; ctx.stroke()
      // vertex glow dots
      vals.forEach((v, a) => {
        const angle = (a * Math.PI * 2) / AXES - Math.PI / 2
        const x = cx + R * v * Math.cos(angle), y = cy + R * v * Math.sin(angle)
        const pulse = 0.5 + 0.5 * Math.sin(t * 2.5 + a * 1.05)
        const vg = ctx.createRadialGradient(x, y, 0, x, y, 7)
        vg.addColorStop(0, `rgba(56,189,248,${0.7 + pulse * 0.3})`); vg.addColorStop(1, 'rgba(56,189,248,0)')
        ctx.beginPath(); ctx.arc(x, y, 7, 0, 6.28); ctx.fillStyle = vg; ctx.fill()
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, 6.28); ctx.fillStyle = '#38bdf8'; ctx.fill()
      })
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

/* ── Animated stats cards (bento animation behind each stat) ── */
function HeroStatsAnimation() {
  const cards = [
    { num: '1M+',    label: 'Professionals Trained', Canvas: CanvasNeuralNet   },
    { num: '5,000+', label: 'Courses Available',     Canvas: CanvasDataScience },
    { num: '30+',    label: 'Years of Excellence',   Canvas: CanvasFinance     },
    { num: '195+',   label: 'Countries Served',      Canvas: CanvasTechnology  },
  ]
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-3 lg:w-auto">
      {cards.map(({ num, label, Canvas }) => (
        <div
          key={label}
          className="relative overflow-hidden rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(6,148,209,0.06) 50%, rgba(255,255,255,0.04) 100%)',
            border: '1px solid rgba(255,255,255,0.13)',
            borderTop: '1px solid rgba(255,255,255,0.22)',
            backdropFilter: 'blur(18px) saturate(160%)',
            WebkitBackdropFilter: 'blur(18px) saturate(160%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(6,148,209,0.12)',
            minHeight: 140,
            padding: '22px 14px 18px',
          }}
        >
          {/* Canvas animation fills the card as background */}
          <Canvas />
          {/* Dark vignette so numbers stay readable */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(6,12,24,0.18) 0%, rgba(6,12,24,0.72) 100%)', pointerEvents: 'none' }}
          />
          {/* Stat content */}
          <div className="relative z-10">
            <div
              className="text-3xl font-black leading-none"
              style={{
                background: 'linear-gradient(135deg, #e0f7ff 0%, #38bdf8 40%, #0694d1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.6)) drop-shadow(0 0 22px rgba(6,148,209,0.35))',
              }}
            >
              {num}
            </div>
            <div className="mt-2 text-sm font-semibold leading-tight text-white/65">{label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Hero tech-wave banner animation ── */
function HeroTechWave() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
    resize(); window.addEventListener('resize', resize)

    // Flowing data-stream dots along each wave
    const WAVES = [
      { amp: 0.09, freq: 1.8, speed: 0.38, phase: 0.0,  yBase: 0.20, col: '6,148,209',  opacity: 0.22 },
      { amp: 0.07, freq: 2.4, speed: 0.28, phase: 1.2,  yBase: 0.38, col: '0,180,216',  opacity: 0.18 },
      { amp: 0.11, freq: 1.4, speed: 0.48, phase: 2.5,  yBase: 0.55, col: '56,189,248', opacity: 0.14 },
      { amp: 0.06, freq: 3.0, speed: 0.22, phase: 0.8,  yBase: 0.70, col: '6,148,209',  opacity: 0.16 },
      { amp: 0.08, freq: 2.0, speed: 0.35, phase: 3.8,  yBase: 0.85, col: '77,191,239', opacity: 0.12 },
    ]
    // Dots that travel along each wave
    const DOTS = WAVES.flatMap((w, wi) =>
      Array.from({ length: 4 }, (_, di) => ({ wi, offset: di / 4 }))
    )
    // Static circuit nodes (stable grid positions)
    const NODES = Array.from({ length: 18 }, (_, i) => ({
      rx: (Math.sin(i * 127.1) * 0.5 + 0.5),
      ry: (Math.sin(i * 311.7) * 0.5 + 0.5),
    }))

    const loop = () => {
      const W = c.width, H = c.height, t = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)

      // Faint dot-grid
      const gridSize = 36
      for (let gx = 0; gx < W; gx += gridSize) {
        for (let gy = 0; gy < H; gy += gridSize) {
          ctx.beginPath(); ctx.arc(gx, gy, 1, 0, 6.28)
          ctx.fillStyle = 'rgba(6,148,209,0.10)'; ctx.fill()
        }
      }

      // Circuit connector lines between nearby nodes
      const pts = NODES.map(n => ({ x: n.rx * W, y: n.ry * H }))
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < W * 0.22) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(6,148,209,${0.06 * (1 - dist / (W * 0.22))})`;
            ctx.lineWidth = 0.7; ctx.stroke()
          }
        }
      }
      // Node dots
      pts.forEach((p, i) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.6 + i * 0.9)
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.8 + pulse * 0.8, 0, 6.28)
        ctx.fillStyle = `rgba(6,148,209,${0.10 + pulse * 0.08})`; ctx.fill()
      })

      // Flowing sine waves
      WAVES.forEach(w => {
        ctx.beginPath()
        for (let px = 0; px <= W; px += 2) {
          const x = px
          const y = H * w.yBase + H * w.amp * Math.sin(w.freq * Math.PI * 2 * (px / W) - t * w.speed * Math.PI * 2 + w.phase)
          px === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(${w.col},${w.opacity})`; ctx.lineWidth = 1.4; ctx.stroke()
      })

      // Travelling dots along each wave
      DOTS.forEach(d => {
        const w = WAVES[d.wi]
        const prog = ((t * w.speed + d.offset) % 1)
        const px = prog * W
        const py = H * w.yBase + H * w.amp * Math.sin(w.freq * Math.PI * 2 * prog - t * w.speed * Math.PI * 2 + w.phase)
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 6)
        glow.addColorStop(0, `rgba(${w.col},0.55)`); glow.addColorStop(1, `rgba(${w.col},0)`)
        ctx.beginPath(); ctx.arc(px, py, 6, 0, 6.28); ctx.fillStyle = glow; ctx.fill()
        ctx.beginPath(); ctx.arc(px, py, 2, 0, 6.28); ctx.fillStyle = `rgba(${w.col},0.80)`; ctx.fill()
      })

      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }} />
}

/* ── Hero particle banner background ── */
function ParticleBanner() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => {
      c.width = c.offsetWidth; c.height = c.offsetHeight
    }
    resize(); window.addEventListener('resize', resize)

    interface Particle {
      x: number; y: number; vx: number; vy: number
      r: number; alpha: number; rgb: string; pulse: number
    }
    const COLORS = ['6,148,209', '56,189,248', '6,148,209', '38,175,225', '14,107,157']
    const COUNT = 90
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00018,
      vy: (Math.random() - 0.5) * 0.00018,
      r: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.5 + 0.2,
      rgb: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
    }))

    const CONNECT_DIST = 0.14 // fraction of canvas width

    const loop = () => {
      const W = c.width, H = c.height, now = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)

      // Move particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
      })

      // Connection lines
      const cd = CONNECT_DIST * W
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = (a.x - b.x) * W, dy = (a.y - b.y) * H
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < cd) {
            const alpha = (1 - dist / cd) * 0.18
            ctx.beginPath()
            ctx.moveTo(a.x * W, a.y * H)
            ctx.lineTo(b.x * W, b.y * H)
            ctx.strokeStyle = `rgba(6,148,209,${alpha})`
            ctx.lineWidth = 0.7; ctx.stroke()
          }
        }
      }

      // Particles
      particles.forEach(p => {
        const pulsed = p.alpha * (0.7 + 0.3 * Math.sin(now * 1.4 + p.pulse))
        const g = ctx.createRadialGradient(p.x * W, p.y * H, 0, p.x * W, p.y * H, p.r * 3.5)
        g.addColorStop(0, `rgba(${p.rgb},${pulsed})`)
        g.addColorStop(1, `rgba(${p.rgb},0)`)
        ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r * 3.5, 0, 6.28)
        ctx.fillStyle = g; ctx.fill()
        ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, 6.28)
        ctx.fillStyle = `rgba(${p.rgb},${pulsed * 0.9})`; ctx.fill()
      })

      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }} />
}

/* ── Hero right-panel: live training analytics dashboard ── */
function HeroIllustration() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let id: number
    const resize = () => {
      const r = c.getBoundingClientRect()
      if (r.width) { c.width = r.width; c.height = r.height }
    }
    resize(); window.addEventListener('resize', resize)

    const DOMAINS = [
      { name: 'GEN AI',     rgb: '255,107,53',  target: 0.87, count: 1847 },
      { name: 'TECHNOLOGY', rgb: '6,148,209',   target: 0.74, count: 2341 },
      { name: 'DATA SCI',   rgb: '139,92,246',  target: 0.68, count: 1256 },
      { name: 'FINANCE',    rgb: '16,185,129',  target: 0.91, count: 3102 },
      { name: 'MANAGEMENT', rgb: '56,189,248',  target: 0.82, count: 2789 },
      { name: 'FUNCTIONAL', rgb: '245,158,11',  target: 0.76, count: 1934 },
    ]

    const CERTS = [
      'Priya S. — AWS Solutions Architect',
      'James K. — PMP Certified',
      'Maria L. — Azure Data Engineer',
      'Rahul M. — Scrum Master (CSM)',
      'Sarah W. — Generative AI Specialist',
      'Ahmed H. — SAP FICO Consultant',
      'Nina C. — ITIL 4 Foundation',
      'David P. — Python for Data Science',
      'Liu W. — CFA Level I',
      'Emma T. — Lean Six Sigma Green Belt',
    ]

    interface CertEntry { text: string; alpha: number; y: number }
    let certIdx = 0
    const certDisplayed: CertEntry[] = []
    let lastCertTime = 0
    const startTime = Date.now()
    const progress = DOMAINS.map(() => 0)

    function drawRR(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath()
      ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + r)
      ctx.lineTo(x + w, y + h - r)
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      ctx.lineTo(x + r, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - r)
      ctx.lineTo(x, y + r)
      ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.closePath()
    }

    const loop = () => {
      const W = c.width, H = c.height
      const now = Date.now()
      const elapsed = (now - startTime) / 1000
      ctx.clearRect(0, 0, W, H)

      // Background
      ctx.fillStyle = '#060f1d'
      ctx.fillRect(0, 0, W, H)

      // Dot grid
      ctx.fillStyle = 'rgba(6,148,209,0.07)'
      for (let gx = 12; gx < W; gx += 24)
        for (let gy = 12; gy < H; gy += 24) {
          ctx.beginPath(); ctx.arc(gx, gy, 0.8, 0, 6.28); ctx.fill()
        }

      // Header bar
      const headerH = 44
      ctx.fillStyle = 'rgba(6,148,209,0.08)'
      ctx.fillRect(0, 0, W, headerH)
      ctx.strokeStyle = 'rgba(6,148,209,0.20)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(0, headerH); ctx.lineTo(W, headerH); ctx.stroke()

      // Live dot + pulse
      const livePulse = 0.5 + 0.5 * Math.sin(now / 500)
      ctx.beginPath(); ctx.arc(18, headerH / 2, 4.5, 0, 6.28)
      ctx.fillStyle = `rgba(16,185,129,${0.6 + livePulse * 0.4})`; ctx.fill()
      ctx.beginPath(); ctx.arc(18, headerH / 2, 4.5 + livePulse * 3.5, 0, 6.28)
      ctx.strokeStyle = `rgba(16,185,129,${(1 - livePulse) * 0.35})`; ctx.lineWidth = 1; ctx.stroke()

      ctx.font = 'bold 10px system-ui,sans-serif'
      ctx.fillStyle = 'rgba(16,185,129,0.90)'
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
      ctx.fillText('LIVE', 30, headerH / 2)
      ctx.font = '10px system-ui,sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.42)'
      ctx.fillText('Training Activity Dashboard', 58, headerH / 2)

      const totalCerts = Math.floor(500000 + Math.min(elapsed * 80, 800))
      ctx.font = 'bold 10px system-ui,sans-serif'
      ctx.fillStyle = 'rgba(56,189,248,0.85)'
      ctx.textAlign = 'right'
      ctx.fillText(`${totalCerts.toLocaleString()}+ Certified`, W - 14, headerH / 2)

      // Domain card grid
      const padX = 12, padY = 10
      const gridTop = headerH + padY
      const feedH = 56
      const gridH = H - gridTop - feedH - padY
      const cols = 3, rows = 2
      const colGap = 8, rowGap = 8
      const cardW = (W - padX * 2 - colGap * (cols - 1)) / cols
      const cardH = (gridH - rowGap * (rows - 1)) / rows

      DOMAINS.forEach((d, i) => {
        const col = i % cols, row = Math.floor(i / cols)
        const x = padX + col * (cardW + colGap)
        const y = gridTop + row * (cardH + rowGap)

        const animP = Math.min(1, Math.max(0, (elapsed - i * 0.18) / 2.6))
        const eased = 1 - Math.pow(1 - animP, 3)
        progress[i] = d.target * eased
        const pulse = 0.5 + 0.5 * Math.sin(now / 900 + i * 1.1)

        // Card background + border
        drawRR(x, y, cardW, cardH, 8)
        ctx.fillStyle = `rgba(${d.rgb},0.07)`; ctx.fill()
        ctx.strokeStyle = `rgba(${d.rgb},${0.20 + pulse * 0.10})`; ctx.lineWidth = 1; ctx.stroke()

        // Inner radial glow
        const cg = ctx.createRadialGradient(x + cardW / 2, y + cardH * 0.35, 0, x + cardW / 2, y + cardH / 2, cardH * 0.8)
        cg.addColorStop(0, `rgba(${d.rgb},${0.06 + pulse * 0.04})`); cg.addColorStop(1, `rgba(${d.rgb},0)`)
        drawRR(x, y, cardW, cardH, 8); ctx.fillStyle = cg; ctx.fill()

        // Circular progress ring
        const ringR = Math.min(cardW, cardH) * 0.255
        const ringCx = x + cardW / 2, ringCy = y + cardH * 0.535
        ctx.beginPath(); ctx.arc(ringCx, ringCy, ringR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${d.rgb},0.13)`; ctx.lineWidth = 3.5; ctx.stroke()
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.arc(ringCx, ringCy, ringR, -Math.PI / 2, -Math.PI / 2 + progress[i] * Math.PI * 2)
        ctx.strokeStyle = `rgba(${d.rgb},0.90)`; ctx.lineWidth = 3.5; ctx.stroke()
        ctx.lineCap = 'butt'

        // Leading glow dot at arc tip
        const tipA = -Math.PI / 2 + progress[i] * Math.PI * 2
        const tipX = ringCx + Math.cos(tipA) * ringR
        const tipY = ringCy + Math.sin(tipA) * ringR
        const tg = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 7)
        tg.addColorStop(0, `rgba(${d.rgb},0.8)`); tg.addColorStop(1, `rgba(${d.rgb},0)`)
        ctx.beginPath(); ctx.arc(tipX, tipY, 7, 0, 6.28); ctx.fillStyle = tg; ctx.fill()

        // Percentage inside ring
        ctx.font = `bold ${Math.max(8, Math.round(ringR * 0.55))}px system-ui,sans-serif`
        ctx.fillStyle = `rgba(${d.rgb},0.95)`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(Math.round(progress[i] * 100) + '%', ringCx, ringCy)

        // Domain name above ring
        ctx.font = `bold ${Math.max(7, Math.round(cardH * 0.115))}px system-ui,sans-serif`
        ctx.fillStyle = 'rgba(255,255,255,0.85)'
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'
        ctx.fillText(d.name, x + cardW / 2, y + cardH * 0.26)

        // Enrolled count below ring
        const cnt = Math.round(d.count * Math.min(1, progress[i] / (d.target || 1) + 0.01))
        ctx.font = `${Math.max(6, Math.round(cardH * 0.09))}px system-ui,sans-serif`
        ctx.fillStyle = `rgba(${d.rgb},0.58)`
        ctx.textBaseline = 'top'
        ctx.fillText(`${cnt.toLocaleString()} enrolled`, x + cardW / 2, y + cardH * 0.80)
      })

      // Feed area divider
      const feedY = H - feedH + 2
      ctx.strokeStyle = 'rgba(6,148,209,0.14)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(padX, feedY - 4); ctx.lineTo(W - padX, feedY - 4); ctx.stroke()

      // Spawn new cert entry every 2 seconds
      if (now - lastCertTime > 2000) {
        lastCertTime = now
        certDisplayed.unshift({ text: CERTS[certIdx % CERTS.length], alpha: 0, y: feedY + 10 })
        certIdx++
        if (certDisplayed.length > 2) certDisplayed.pop()
      }

      // Draw scrolling cert feed
      certDisplayed.forEach((entry, idx) => {
        entry.alpha = Math.min(1, entry.alpha + 0.05)
        const targetY = feedY + 6 + idx * 22
        entry.y += (targetY - entry.y) * 0.15

        ctx.beginPath(); ctx.arc(padX + 7, entry.y, 5.5, 0, 6.28)
        ctx.fillStyle = `rgba(16,185,129,${entry.alpha * 0.85})`; ctx.fill()
        ctx.font = 'bold 7.5px system-ui,sans-serif'
        ctx.fillStyle = `rgba(255,255,255,${entry.alpha})`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText('✓', padX + 7, entry.y)

        ctx.font = '9px system-ui,sans-serif'
        ctx.fillStyle = `rgba(255,255,255,${entry.alpha * 0.78})`
        ctx.textAlign = 'left'
        ctx.fillText(entry.text, padX + 18, entry.y)
      })

      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        display: 'block', width: '100%', height: 420,
        borderRadius: 16, border: '1px solid rgba(6,148,209,0.22)',
      }}
    />
  )
}

/* ── Reusable inline bento grid (fills its parent) ── */
function BentoGrid() {
  return (
    <div
      className="h-full w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 8,
      }}
    >
      <BentoCard label="GEN AI" style={{ gridColumn: 1, gridRow: 1 }}>
        <CanvasNeuralNet />
      </BentoCard>
      <BentoCard label="MANAGEMENT" style={{ gridColumn: 2, gridRow: '1 / 3' }}>
        <CanvasManagement />
      </BentoCard>
      <BentoCard label="FINANCE" style={{ gridColumn: 3, gridRow: 1 }}>
        <CanvasFinance />
      </BentoCard>
      <BentoCard label="DATA SCIENCE" style={{ gridColumn: 1, gridRow: 2 }}>
        <CanvasDataScience />
      </BentoCard>
      <div style={{ gridColumn: 3, gridRow: 2, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <BentoCard label="TECHNOLOGY" style={{ flex: 1 }}>
          <CanvasTechnology />
        </BentoCard>
        <BentoCard label="FUNCTIONAL SKILLS" style={{ flex: 1 }}>
          <CanvasPuzzle />
        </BentoCard>
      </div>
    </div>
  )
}

/* ── Hero right panel: bento background + stats centered on top ── */
function HeroRightPanel() {
  return (
    <div className="w-full flex-shrink-0 lg:w-[440px] xl:w-[480px]">
      {/* Mobile — plain stats only */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {STATS.map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.2)' }}>
            <div className="text-3xl font-black" style={{ color: '#38bdf8' }}>{s.num}</div>
            <div className="mt-1 text-sm text-white/60">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Desktop — bento fills the box, stats float centered on top */}
      <div className="relative hidden lg:block" style={{ height: 420 }}>
        {/* Layer 1: bento animation */}
        <BentoGrid />

        {/* Layer 2: stat boxes float centered over the bento */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-3">
            {STATS.map(s => (
              <div
                key={s.label}
                className="rounded-2xl text-center"
                style={{
                  background: 'rgba(255,255,255,0.82)',
                  border: '1.5px solid rgba(6,148,209,0.30)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  boxShadow: '0 4px 24px rgba(6,148,209,0.14), 0 8px 32px rgba(0,0,0,0.08)',
                  padding: '22px 18px',
                  minWidth: 140,
                }}
              >
                <div
                  className="text-3xl font-black leading-none"
                  style={{ color: '#0694d1' }}
                >
                  {s.num}
                </div>
                <div className="mt-2 text-sm font-semibold" style={{ color: '#4a7a99' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Bento grid wrapper (kept for reference) ── */
function HeroBentoAnimation() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-end"
      style={{ pointerEvents: 'none', padding: '18px 22px 18px 0' }}
    >
      <div
        className="hidden lg:grid h-full w-[400px] xl:w-[450px]"
        style={{
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 9,
          maxHeight: 445,
          opacity: 0.92,
        }}
      >
        {/* GEN AI — top-left */}
        <BentoCard label="GEN AI" style={{ gridColumn: 1, gridRow: 1 }}>
          <CanvasNeuralNet />
        </BentoCard>

        {/* MANAGEMENT — center, spans both rows */}
        <BentoCard label="MANAGEMENT" style={{ gridColumn: 2, gridRow: '1 / 3' }}>
          <CanvasManagement />
        </BentoCard>

        {/* FINANCE — top-right */}
        <BentoCard label="FINANCE" style={{ gridColumn: 3, gridRow: 1 }}>
          <CanvasFinance />
        </BentoCard>

        {/* DATA SCIENCE — bottom-left */}
        <BentoCard label="DATA SCIENCE" style={{ gridColumn: 1, gridRow: 2 }}>
          <CanvasDataScience />
        </BentoCard>

        {/* Bottom-right: TECHNOLOGY + FUNCTIONAL SKILLS stacked */}
        <div style={{ gridColumn: 3, gridRow: 2, display: 'flex', flexDirection: 'column', gap: 9 }}>
          <BentoCard label="TECHNOLOGY" style={{ flex: 1 }}>
            <CanvasTechnology />
          </BentoCard>
          <BentoCard label="FUNCTIONAL SKILLS" style={{ flex: 1 }}>
            <CanvasPuzzle />
          </BentoCard>
        </div>
      </div>
    </div>
  )
}

/* (old globe stub — replaced) */
function HeroGlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let rot = 0

    // Major training-hub cities [lat, lng]
    const CITIES = [
      { lat: 51.5,  lng:   0.0 }, // London
      { lat: 40.7,  lng: -74.0 }, // New York
      { lat: 25.2,  lng:  55.3 }, // Dubai
      { lat:  1.3,  lng: 103.8 }, // Singapore
      { lat:-33.8,  lng: 151.2 }, // Sydney
      { lat: 43.7,  lng: -79.4 }, // Toronto
      { lat: 28.6,  lng:  77.2 }, // Delhi
      { lat: 35.7,  lng: 139.7 }, // Tokyo
      { lat: 50.1,  lng:   8.7 }, // Frankfurt
      { lat:-26.2,  lng:  28.0 }, // Johannesburg
      { lat:-23.5,  lng: -46.6 }, // São Paulo
      { lat: 55.7,  lng:  37.6 }, // Moscow
    ]

    // Pairs that shoot training arcs between each other
    const CONN = [
      [0,2],[0,1],[0,8],[1,5],[2,3],[2,6],
      [3,4],[3,7],[0,9],[1,10],[7,3],[8,11],
    ]
    const connState = CONN.map(() => ({
      t: Math.random(),
      spd: 0.0022 + Math.random() * 0.003,
    }))

    const R2D = (d: number) => d * Math.PI / 180

    function proj(lat: number, lng: number, R: number, cx: number, cy: number) {
      const φ = R2D(lat), λ = R2D(lng) + rot
      return {
        sx: cx + Math.cos(φ) * Math.cos(λ) * R,
        sy: cy - Math.sin(φ) * R,
        z:  Math.cos(φ) * Math.sin(λ),
      }
    }

    function slerp(la1: number, lo1: number, la2: number, lo2: number, t: number) {
      const φ1=R2D(la1), λ1=R2D(lo1), φ2=R2D(la2), λ2=R2D(lo2)
      const ax=Math.cos(φ1)*Math.cos(λ1), ay=Math.sin(φ1), az=Math.cos(φ1)*Math.sin(λ1)
      const bx=Math.cos(φ2)*Math.cos(λ2), by=Math.sin(φ2), bz=Math.cos(φ2)*Math.sin(λ2)
      const dot=Math.min(1,Math.max(-1,ax*bx+ay*by+az*bz))
      const θ=Math.acos(dot)
      if(θ<0.001) return {lat:la1,lng:lo1}
      const s=Math.sin(θ)
      const w1=Math.sin((1-t)*θ)/s, w2=Math.sin(t*θ)/s
      return {
        lat: Math.asin(w1*ay+w2*by)*180/Math.PI,
        lng: Math.atan2(w1*az+w2*bz, w1*ax+w2*bx)*180/Math.PI,
      }
    }

    function resize() {
      const r = canvas.getBoundingClientRect()
      canvas.width  = r.width
      canvas.height = r.height
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      rot += 0.0018

      const mobile = W < 768
      const R  = mobile ? Math.min(W * 0.41, H * 0.40) : Math.min(W * 0.27, H * 0.46)
      const cx = mobile ? W * 0.5 : W * 0.675
      const cy = H * 0.5

      // ── Outer atmospheric glow ──
      const aura = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.42)
      aura.addColorStop(0,   'rgba(6,148,209,0.18)')
      aura.addColorStop(0.5, 'rgba(6,148,209,0.07)')
      aura.addColorStop(1,   'rgba(6,148,209,0)')
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.42, 0, Math.PI * 2)
      ctx.fillStyle = aura; ctx.fill()

      // ── Sphere fill ──
      const sf = ctx.createRadialGradient(cx - R*0.28, cy - R*0.28, R*0.04, cx, cy, R)
      sf.addColorStop(0,   'rgba(6,148,209,0.13)')
      sf.addColorStop(0.5, 'rgba(7,109,157,0.06)')
      sf.addColorStop(1,   'rgba(6,17,30,0.0)')
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = sf; ctx.fill()

      // ── Back-face grid (low opacity) ──
      ctx.lineWidth = 0.5
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath(); let first = true
        for (let lng = -180; lng <= 180; lng += 5) {
          const p = proj(lat, lng, R, cx, cy)
          if (p.z < 0) { first ? ctx.moveTo(p.sx,p.sy) : ctx.lineTo(p.sx,p.sy); first=false }
          else first = true
        }
        ctx.strokeStyle = 'rgba(6,148,209,0.08)'; ctx.stroke()
      }
      for (let lng = -180; lng < 180; lng += 20) {
        ctx.beginPath(); let first = true
        for (let lat = -90; lat <= 90; lat += 5) {
          const p = proj(lat, lng, R, cx, cy)
          if (p.z < 0) { first ? ctx.moveTo(p.sx,p.sy) : ctx.lineTo(p.sx,p.sy); first=false }
          else first = true
        }
        ctx.strokeStyle = 'rgba(6,148,209,0.08)'; ctx.stroke()
      }

      // ── Sphere rim ──
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(6,148,209,0.5)'; ctx.lineWidth = 1.4; ctx.stroke()

      // ── Front-face grid (brighter) ──
      ctx.lineWidth = 0.55
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath(); let first = true
        for (let lng = -180; lng <= 180; lng += 5) {
          const p = proj(lat, lng, R, cx, cy)
          if (p.z >= 0) { first ? ctx.moveTo(p.sx,p.sy) : ctx.lineTo(p.sx,p.sy); first=false }
          else first = true
        }
        ctx.strokeStyle = 'rgba(6,148,209,0.28)'; ctx.stroke()
      }
      for (let lng = -180; lng < 180; lng += 20) {
        ctx.beginPath(); let first = true
        for (let lat = -90; lat <= 90; lat += 5) {
          const p = proj(lat, lng, R, cx, cy)
          if (p.z >= 0) { first ? ctx.moveTo(p.sx,p.sy) : ctx.lineTo(p.sx,p.sy); first=false }
          else first = true
        }
        ctx.strokeStyle = 'rgba(6,148,209,0.28)'; ctx.stroke()
      }

      // ── Training arcs ──
      const now = Date.now() * 0.001
      CONN.forEach((c, i) => {
        connState[i].t += connState[i].spd
        if (connState[i].t > 1.35) connState[i].t = -0.12

        const t    = connState[i].t
        const head = Math.min(1, t)
        const tail = Math.max(0, t - 0.22)
        if (head <= 0 || tail >= 1) return

        const c1 = CITIES[c[0]], c2 = CITIES[c[1]]
        const STEPS = 64
        type Pt = { sx:number; sy:number; z:number; frac:number }
        const pts: Pt[] = []

        for (let j = 0; j <= STEPS; j++) {
          const st = j / STEPS
          if (st < tail || st > head) continue
          const ip   = slerp(c1.lat, c1.lng, c2.lat, c2.lng, st)
          const lift = 1 + 0.16 * Math.sin(st * Math.PI)   // arc bows outward at midpoint
          const φ = R2D(ip.lat), λ = R2D(ip.lng) + rot
          pts.push({
            sx: cx + Math.cos(φ) * Math.cos(λ) * R * lift,
            sy: cy - Math.sin(φ) * R * lift,
            z:  Math.cos(φ) * Math.sin(λ),
            frac: (st - tail) / Math.max(0.001, head - tail),
          })
        }
        if (pts.length < 2) return

        // Draw arc segments with gradient alpha (dim tail → bright head)
        for (let j = 1; j < pts.length; j++) {
          if (pts[j-1].z < -0.05 || pts[j].z < -0.05) continue
          const alpha = 0.15 + pts[j].frac * 0.82
          ctx.beginPath()
          ctx.moveTo(pts[j-1].sx, pts[j-1].sy)
          ctx.lineTo(pts[j].sx,   pts[j].sy)
          ctx.strokeStyle = `rgba(56,189,248,${alpha})`
          ctx.lineWidth = 1.8; ctx.stroke()
        }

        // Leading glowing dot
        const last = pts[pts.length - 1]
        if (last && last.z >= -0.05) {
          const hg = ctx.createRadialGradient(last.sx, last.sy, 0, last.sx, last.sy, 10)
          hg.addColorStop(0,   'rgba(255,255,255,1)')
          hg.addColorStop(0.25,'rgba(56,189,248,0.9)')
          hg.addColorStop(1,   'rgba(6,148,209,0)')
          ctx.beginPath(); ctx.arc(last.sx, last.sy, 10, 0, Math.PI * 2)
          ctx.fillStyle = hg; ctx.fill()
          ctx.beginPath(); ctx.arc(last.sx, last.sy, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = 'white'; ctx.fill()
        }
      })

      // ── City dots with pulsing rings ──
      CITIES.forEach((city, ci) => {
        const p = proj(city.lat, city.lng, R, cx, cy)
        if (p.z < 0) return
        const pulse = 0.5 + 0.5 * Math.sin(now * 2.4 + ci * 1.35)

        // Outer pulse ring
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 5 + pulse * 5.5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(6,148,209,${0.38 * pulse})`
        ctx.lineWidth = 1; ctx.stroke()

        // Inner ring
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 3.5 + pulse * 2, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(56,189,248,${0.22 * pulse})`
        ctx.lineWidth = 0.8; ctx.stroke()

        // Core dot
        const dg = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, 4.5)
        dg.addColorStop(0,   'rgba(255,255,255,1)')
        dg.addColorStop(0.45,'rgba(56,189,248,1)')
        dg.addColorStop(1,   'rgba(6,148,209,0.7)')
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 4, 0, Math.PI * 2)
        ctx.fillStyle = dg; ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}

/* ─── Nav Data (shared with homepage) ───────────────────── */

const ABOUT_LINKS: { label: string; href: string }[] = [
  { label: 'About Us',            href: '/about' },
  { label: 'Our Clientele',       href: '/about#our-clients' },
  { label: 'Leadership',          href: '/about#leadership' },
  { label: 'Our Partners',        href: '/about#our-partners' },
  { label: 'Happiness Guarantee', href: '/about#happiness-guarantee' },
  { label: 'Student Feedback',    href: '/about#student-feedback' },
  { label: 'Our Awards',          href: '/about#awards' },
  { label: 'Koenig Koshish',     href: '/about#koenig-koshish' },
]
const LEARNING_LINKS = ['Live Online Training','Classroom Training','1-on-1 Training','Fly-Me-a-Trainer','Flexi','Customized Training','Webinar as a Service','Qubits','Upcoming Webinars','Learnova']

const MEGA_MENU_VENDORS = [
  { name: 'Microsoft',        img: 'microsoft-cloud-t.png',                                    courses: '380+' },
  { name: 'AWS',              img: 'amazon-authorized.png',                                     courses: '290+' },
  { name: 'Cisco',            img: 'Cisco.png',                                                 courses: '210+' },
  { name: 'CompTIA',          img: 'comptia.png',                                               courses: '180+' },
  { name: 'Oracle',           img: 'o-prtnr-clr-rgb (1).png',                                   courses: '160+' },
  { name: 'SAP',              img: 'SAP.jpg',                                                   courses: '140+' },
  { name: 'PMI',              img: 'PMI1115-ATP-Badge-2024-rgb.png',                            courses: '140+' },
  { name: 'Red Hat',          img: 'Redvendorlogo.png',                                         courses: '110+' },
  { name: 'EC-Council',       img: 'EC-Council-logo.png',                                       courses: '120+' },
  { name: 'VMware',           img: 'VMware-Broadcom.png',                                       courses: '120+' },
  { name: 'PeopleCert',       img: 'PeopleCert.png',                                            courses: '90+'  },
  { name: 'PECB',             img: 'Authorized PECB Certification Courses Training badge.png',  courses: '80+'  },
  { name: 'Linux Foundation', img: 'Linux-Foundation.png',                                      courses: '60+'  },
  { name: 'ISACA',            img: undefined,                                                   courses: '60+'  },
  { name: 'ISC2',             img: 'OTP-Preferred-Badge.png',                                   courses: '50+'  },
  { name: 'ISTQB',            img: 'ISTQB.png',                                                 courses: '40+'  },
  { name: 'The Open Group',   img: 'Vendor-OG-logo.png',                                        courses: '45+'  },
  { name: 'ServiceNow',       img: 'ServiceNow.png',                                            courses: '40+'  },
  { name: 'Broadcom',         img: 'Broadcom.png',                                              courses: '70+'  },
  { name: 'Check Point',      img: 'Checkpoint ATC 2026 PLATINUM Badge.png',                   courses: '55+'  },
]

const MEGA_MENU_COURSES: Record<string, { name: string; days: number; level: string }[]> = {
  'Microsoft': [
    { name: 'AZ-104: Microsoft Azure Administrator', days: 5, level: 'Intermediate' },
    { name: 'AZ-305: Azure Solutions Architect Expert', days: 4, level: 'Advanced' },
    { name: 'AI-102: Azure AI Engineer Associate', days: 4, level: 'Advanced' },
    { name: 'PL-300: Power BI Data Analyst', days: 3, level: 'Intermediate' },
    { name: 'MS-102: Microsoft 365 Administrator', days: 5, level: 'Advanced' },
    { name: 'AZ-400: Azure DevOps Engineer Expert', days: 5, level: 'Advanced' },
    { name: 'AZ-900: Azure Fundamentals', days: 1, level: 'Beginner' },
    { name: 'MS-900: Microsoft 365 Fundamentals', days: 1, level: 'Beginner' },
  ],
  'AWS': [
    { name: 'AWS Solutions Architect – Associate', days: 4, level: 'Intermediate' },
    { name: 'AWS DevOps Engineer – Professional', days: 5, level: 'Advanced' },
    { name: 'AWS Certified AI Practitioner', days: 3, level: 'Beginner' },
    { name: 'AWS Cloud Practitioner Essentials', days: 2, level: 'Beginner' },
    { name: 'AWS SysOps Administrator – Associate', days: 3, level: 'Intermediate' },
    { name: 'Advanced AWS Networking', days: 4, level: 'Advanced' },
  ],
  'Cisco': [
    { name: 'CCNP Enterprise Core (ENCOR)', days: 5, level: 'Advanced' },
    { name: 'CCNA (200-301)', days: 5, level: 'Beginner' },
    { name: 'Cisco CyberOps Associate', days: 5, level: 'Intermediate' },
    { name: 'Cisco DevNet Associate', days: 4, level: 'Intermediate' },
    { name: 'CCIE Enterprise Infrastructure', days: 5, level: 'Advanced' },
  ],
  'CompTIA': [
    { name: 'CompTIA Security+ (SY0-701)', days: 5, level: 'Intermediate' },
    { name: 'CompTIA Network+', days: 5, level: 'Beginner' },
    { name: 'CompTIA CySA+', days: 5, level: 'Intermediate' },
    { name: 'CompTIA A+ Core 1 & Core 2', days: 5, level: 'Beginner' },
    { name: 'CompTIA PenTest+', days: 5, level: 'Advanced' },
  ],
  'Oracle': [
    { name: 'Oracle Database Administration', days: 5, level: 'Intermediate' },
    { name: 'Oracle Cloud Infrastructure Architect Associate', days: 4, level: 'Intermediate' },
    { name: 'Java SE 17 Developer', days: 5, level: 'Intermediate' },
    { name: 'Oracle Cloud Infrastructure Foundations', days: 2, level: 'Beginner' },
  ],
  'SAP': [
    { name: 'SAP S/4HANA Functional Consultant', days: 5, level: 'Advanced' },
    { name: 'SAP BASIS Administration', days: 5, level: 'Intermediate' },
    { name: 'SAP ABAP Programming', days: 5, level: 'Intermediate' },
    { name: 'SAP BW/4HANA Data Modeling', days: 4, level: 'Advanced' },
    { name: 'SAP Certified Associate – Cloud ERP', days: 3, level: 'Intermediate' },
  ],
  'PMI': [
    { name: 'Project Management Professional (PMP)', days: 3, level: 'Advanced' },
    { name: 'CAPM: Certified Associate in PM', days: 3, level: 'Beginner' },
    { name: 'PMI-ACP: Agile Certified Practitioner', days: 3, level: 'Intermediate' },
    { name: 'PMI-RMP: Risk Management Professional', days: 3, level: 'Advanced' },
  ],
  'Red Hat': [
    { name: 'RHCSA: Red Hat Certified System Administrator', days: 5, level: 'Intermediate' },
    { name: 'RHCE: Red Hat Certified Engineer', days: 5, level: 'Advanced' },
    { name: 'OpenShift Administration', days: 4, level: 'Advanced' },
    { name: 'Ansible Automation Platform', days: 4, level: 'Intermediate' },
  ],
  'EC-Council': [
    { name: 'Certified Ethical Hacker (CEH v13)', days: 5, level: 'Intermediate' },
    { name: 'CPENT: Certified Penetration Testing', days: 5, level: 'Advanced' },
    { name: 'CHFI: Computer Hacking Forensic Investigator', days: 5, level: 'Intermediate' },
    { name: 'CCSE: Certified Cloud Security Engineer', days: 3, level: 'Advanced' },
  ],
  'VMware': [
    { name: 'vSphere: Install, Configure, Manage', days: 5, level: 'Intermediate' },
    { name: 'NSX-T Data Center: Install, Configure, Manage', days: 5, level: 'Advanced' },
    { name: 'vSAN: Deploy and Manage', days: 3, level: 'Advanced' },
    { name: 'VMware Cloud Foundation: Deploy and Manage', days: 4, level: 'Advanced' },
  ],
  'PeopleCert': [
    { name: 'ITIL® 4 Foundation', days: 3, level: 'Beginner' },
    { name: 'PRINCE2® Foundation & Practitioner', days: 5, level: 'Intermediate' },
    { name: 'ITIL 4 Specialist: Create, Deliver and Support', days: 3, level: 'Advanced' },
    { name: 'PRINCE2 Agile', days: 3, level: 'Intermediate' },
  ],
  'PECB': [
    { name: 'ISO 27001 Lead Implementer', days: 5, level: 'Advanced' },
    { name: 'ISO 27001 Lead Auditor', days: 5, level: 'Advanced' },
    { name: 'ISO 22301 Lead Implementer', days: 5, level: 'Intermediate' },
    { name: 'ISO 9001 Lead Auditor', days: 5, level: 'Intermediate' },
  ],
  'Linux Foundation': [
    { name: 'Certified Kubernetes Administrator (CKA)', days: 4, level: 'Advanced' },
    { name: 'Certified Kubernetes Application Developer (CKAD)', days: 3, level: 'Intermediate' },
    { name: 'Linux Foundation Certified System Administrator', days: 5, level: 'Intermediate' },
  ],
  'ISACA': [
    { name: 'CISM: Certified Information Security Manager', days: 3, level: 'Advanced' },
    { name: 'CISA: Certified Information Systems Auditor', days: 3, level: 'Advanced' },
    { name: 'CRISC: Certified in Risk and Information Systems Control', days: 3, level: 'Advanced' },
  ],
  'ISC2': [
    { name: 'CISSP Certification', days: 5, level: 'Advanced' },
    { name: 'CCSP: Certified Cloud Security Professional', days: 5, level: 'Advanced' },
    { name: 'SSCP: Systems Security Certified Practitioner', days: 5, level: 'Intermediate' },
    { name: 'CC: Certified in Cybersecurity', days: 2, level: 'Beginner' },
  ],
  'ISTQB': [
    { name: 'ISTQB Certified Tester Foundation Level', days: 3, level: 'Beginner' },
    { name: 'ISTQB Advanced Level Test Analyst', days: 4, level: 'Advanced' },
    { name: 'ISTQB Advanced Level Test Manager', days: 5, level: 'Advanced' },
  ],
  'The Open Group': [
    { name: 'TOGAF 10 Foundation & Practitioner', days: 5, level: 'Intermediate' },
    { name: 'TOGAF 9.2 Foundation', days: 3, level: 'Beginner' },
    { name: 'ArchiMate 3 Foundation & Practitioner', days: 4, level: 'Intermediate' },
  ],
  'ServiceNow': [
    { name: 'ServiceNow System Administrator', days: 3, level: 'Intermediate' },
    { name: 'ServiceNow Application Developer', days: 4, level: 'Advanced' },
    { name: 'ServiceNow ITSM Implementation', days: 3, level: 'Intermediate' },
  ],
  'Broadcom': [
    { name: 'Clarity PPM Administration', days: 4, level: 'Advanced' },
    { name: 'CA Service Management Administration', days: 3, level: 'Intermediate' },
    { name: 'Symantec Endpoint Security', days: 3, level: 'Intermediate' },
  ],
  'Check Point': [
    { name: 'Check Point CCSA R82', days: 3, level: 'Intermediate' },
    { name: 'Check Point CCSE R82', days: 4, level: 'Advanced' },
    { name: 'Check Point Certified Cloud Specialist', days: 3, level: 'Advanced' },
  ],
}

const TOP_TECHNOLOGIES = [
  { name: 'Cloud Computing',     count: '840+', partners: ['Microsoft', 'AWS', 'Google Cloud'] },
  { name: 'Cybersecurity',       count: '620+', partners: ['EC-Council', 'CompTIA', 'ISC2'] },
  { name: 'Networking',          count: '510+', partners: ['Cisco', 'Juniper', 'CompTIA'] },
  { name: 'Project Management',  count: '390+', partners: ['PMI', 'PeopleCert', 'AXELOS'] },
  { name: 'Data & AI',           count: '280+', partners: ['Microsoft', 'AWS', 'Google Cloud'] },
  { name: 'DevOps',              count: '210+', partners: ['Kubernetes', 'HashiCorp', 'AWS'] },
  { name: 'ERP Systems',         count: '180+', partners: ['SAP', 'Oracle', 'Microsoft'] },
  { name: 'Linux & Open Source', count: '110+', partners: ['Red Hat', 'Linux Foundation', 'CompTIA'] },
]

const TECH_MENU_COURSES: Record<string, { name: string; vendor: string; days: number; level: string }[]> = {
  'Cloud Computing': [
    { name: 'AZ-104: Microsoft Azure Administrator', vendor: 'Microsoft', days: 5, level: 'Intermediate' },
    { name: 'AWS Solutions Architect – Associate', vendor: 'AWS', days: 4, level: 'Intermediate' },
    { name: 'Google Professional Cloud Architect', vendor: 'Google Cloud', days: 4, level: 'Advanced' },
    { name: 'AZ-900: Azure Fundamentals', vendor: 'Microsoft', days: 1, level: 'Beginner' },
    { name: 'AWS Cloud Practitioner Essentials', vendor: 'AWS', days: 2, level: 'Beginner' },
    { name: 'Oracle Cloud Infrastructure Foundations', vendor: 'Oracle', days: 2, level: 'Beginner' },
  ],
  'Cybersecurity': [
    { name: 'Certified Ethical Hacker (CEH v13)', vendor: 'EC-Council', days: 5, level: 'Intermediate' },
    { name: 'CompTIA Security+ (SY0-701)', vendor: 'CompTIA', days: 5, level: 'Intermediate' },
    { name: 'CISSP Certification', vendor: 'ISC2', days: 5, level: 'Advanced' },
    { name: 'CCSP: Certified Cloud Security', vendor: 'ISC2', days: 5, level: 'Advanced' },
    { name: 'CompTIA CySA+', vendor: 'CompTIA', days: 5, level: 'Intermediate' },
    { name: 'CPENT: Certified Penetration Testing', vendor: 'EC-Council', days: 5, level: 'Advanced' },
  ],
  'Networking': [
    { name: 'CCNP Enterprise Core (ENCOR)', vendor: 'Cisco', days: 5, level: 'Advanced' },
    { name: 'CCNA (200-301)', vendor: 'Cisco', days: 5, level: 'Beginner' },
    { name: 'CompTIA Network+', vendor: 'CompTIA', days: 5, level: 'Beginner' },
    { name: 'Cisco DevNet Associate', vendor: 'Cisco', days: 4, level: 'Intermediate' },
    { name: 'CCIE Enterprise Infrastructure', vendor: 'Cisco', days: 5, level: 'Advanced' },
  ],
  'Project Management': [
    { name: 'Project Management Professional (PMP)', vendor: 'PMI', days: 3, level: 'Advanced' },
    { name: 'PRINCE2® Foundation & Practitioner', vendor: 'PeopleCert', days: 5, level: 'Intermediate' },
    { name: 'ITIL® 4 Foundation', vendor: 'PeopleCert', days: 3, level: 'Beginner' },
    { name: 'PMI-ACP: Agile Certified Practitioner', vendor: 'PMI', days: 3, level: 'Intermediate' },
    { name: 'CAPM: Certified Associate in PM', vendor: 'PMI', days: 3, level: 'Beginner' },
  ],
  'Data & AI': [
    { name: 'AI-102: Azure AI Engineer Associate', vendor: 'Microsoft', days: 4, level: 'Advanced' },
    { name: 'AWS Certified AI Practitioner', vendor: 'AWS', days: 3, level: 'Beginner' },
    { name: 'Google Professional Data Engineer', vendor: 'Google Cloud', days: 4, level: 'Advanced' },
    { name: 'PL-300: Power BI Data Analyst', vendor: 'Microsoft', days: 3, level: 'Intermediate' },
    { name: 'Azure AI Engineer Associate', vendor: 'Microsoft', days: 4, level: 'Advanced' },
    { name: 'SAP BW/4HANA Data Modeling', vendor: 'SAP', days: 4, level: 'Advanced' },
  ],
  'DevOps': [
    { name: 'AZ-400: Azure DevOps Engineer Expert', vendor: 'Microsoft', days: 5, level: 'Advanced' },
    { name: 'Certified Kubernetes Administrator (CKA)', vendor: 'Linux Foundation', days: 4, level: 'Advanced' },
    { name: 'AWS DevOps Engineer – Professional', vendor: 'AWS', days: 5, level: 'Advanced' },
    { name: 'Ansible Automation Platform', vendor: 'Red Hat', days: 4, level: 'Intermediate' },
    { name: 'HashiCorp Certified: Terraform Associate', vendor: 'HashiCorp', days: 3, level: 'Intermediate' },
  ],
  'ERP Systems': [
    { name: 'SAP S/4HANA Functional Consultant', vendor: 'SAP', days: 5, level: 'Advanced' },
    { name: 'SAP BASIS Administration', vendor: 'SAP', days: 5, level: 'Intermediate' },
    { name: 'Oracle Database Administration', vendor: 'Oracle', days: 5, level: 'Intermediate' },
    { name: 'SAP ABAP Programming', vendor: 'SAP', days: 5, level: 'Intermediate' },
    { name: 'Oracle Cloud Infrastructure Architect', vendor: 'Oracle', days: 4, level: 'Intermediate' },
  ],
  'Linux & Open Source': [
    { name: 'RHCSA: Red Hat Certified System Administrator', vendor: 'Red Hat', days: 5, level: 'Intermediate' },
    { name: 'RHCE: Red Hat Certified Engineer', vendor: 'Red Hat', days: 5, level: 'Advanced' },
    { name: 'Linux Foundation Certified Sysadmin', vendor: 'Linux Foundation', days: 5, level: 'Intermediate' },
    { name: 'OpenShift Administration', vendor: 'Red Hat', days: 4, level: 'Advanced' },
    { name: 'Certified Kubernetes Administrator', vendor: 'Linux Foundation', days: 4, level: 'Advanced' },
  ],
}

const TOP_COURSES = [
  {
    vendor: 'AWS', name: 'AWS Certified Solutions Architect – Professional: Designing Resilient, High-Performance Cloud Architectures on AWS',
    examCode: 'SAP-C02', category: 'ASSOCIATE',
    days: 5, rating: 4.9, enrolled: '1,900+', price: '$1,395',
    levelColor: 'bg-orange-100 text-orange-700', hot: true, level: 'Advanced',
  },
  {
    vendor: 'Cisco', name: 'Implementing and Operating Cisco Enterprise Network Core Technologies – ENCOR Certification Training',
    examCode: '350-401', category: 'ASSOCIATE',
    days: 5, rating: 4.8, enrolled: '1,100+', price: '$1,195',
    levelColor: 'bg-blue-100 text-blue-700', hot: false, level: 'Advanced',
  },
  {
    vendor: 'Microsoft', name: 'Microsoft Azure Administrator',
    examCode: 'AZ-104', category: 'ASSOCIATE',
    days: 5, rating: 4.9, enrolled: '2,100+', price: '$1,245',
    levelColor: 'bg-blue-100 text-blue-700', hot: true, level: 'Intermediate',
  },
  {
    vendor: 'Microsoft', name: 'Microsoft Azure Fundamentals',
    examCode: 'AZ-900', category: 'FUNDAMENTALS',
    days: 3, rating: 4.9, enrolled: '2,400+', price: '$597',
    levelColor: 'bg-blue-100 text-blue-700', hot: true, level: 'Beginner',
  },
]

const NEW_TRENDING = [
  {
    vendor: 'Google Cloud', name: 'Google Cloud Professional Data Engineer – Building Resilient, Scalable Data Pipelines and Machine Learning Solutions on GCP',
    examCode: 'GPDE', category: 'EXPERT',
    days: 4, rating: 4.8, enrolled: '1,400+', price: '$1,095',
    levelColor: 'bg-green-100 text-green-700', hot: true, level: 'Advanced',
  },
  {
    vendor: 'AWS', name: 'AWS Certified Machine Learning Engineer – Associate: Building and Deploying ML Models on Amazon Web Services',
    examCode: 'MLA-C01', category: 'ASSOCIATE',
    days: 4, rating: 4.9, enrolled: '1,200+', price: '$1,195',
    levelColor: 'bg-orange-100 text-orange-700', hot: true, level: 'Advanced',
  },
  {
    vendor: 'Microsoft', name: 'Microsoft Copilot Studio – Build AI-Powered Chatbots',
    examCode: 'PL-100', category: 'FUNDAMENTALS',
    days: 3, rating: 4.8, enrolled: '890+', price: '$895',
    levelColor: 'bg-blue-100 text-blue-700', hot: false, level: 'Intermediate',
  },
]

/* ─── Vendors Mobile Strip ───────────────────────────────── */

const ALL_ENT_VENDORS = [...ENT_VENDORS_ROW1, ...ENT_VENDORS_ROW2]

function VendorsMobileStrip() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    let raf: number
    const animate = () => {
      const el = scrollRef.current
      if (el && !pausedRef.current) {
        el.scrollLeft += 0.6
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={scrollRef}
      className="sm:hidden overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden"
      style={{ WebkitOverflowScrolling: 'touch' }}
      onTouchStart={() => { pausedRef.current = true }}
      onTouchEnd={() => { pausedRef.current = false }}
    >
      <div className="flex gap-3 px-1" style={{ width: 'max-content' }}>
        {[...ALL_ENT_VENDORS, ...ALL_ENT_VENDORS].map((v, i) => (
          <EntVendorCard key={i} v={v} />
        ))}
      </div>
    </div>
  )
}

/* ─── Formats Mobile Carousel ───────────────────────────── */

function FormatsMobileCarousel() {
  const [page, setPage] = useState(0)
  const touchStartX = useRef(0)
  const CARDS_PER_PAGE = 2
  const totalPages = Math.ceil(FORMATS.length / CARDS_PER_PAGE)
  const pages: number[][] = Array.from({ length: totalPages }, (_, p) =>
    FORMATS.slice(p * CARDS_PER_PAGE, (p + 1) * CARDS_PER_PAGE).map((_, i) => p * CARDS_PER_PAGE + i)
  )

  return (
    <div className="sm:hidden">
      <div
        className="overflow-hidden"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (dx < -40 && page < totalPages - 1) setPage(p => p + 1)
          if (dx > 40 && page > 0) setPage(p => p - 1)
        }}
      >
        <div
          className="flex"
          style={{ transform: `translateX(-${page * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
        >
          {pages.map((group, pageIdx) => (
            <div key={pageIdx} className="min-w-full grid grid-cols-1 gap-4">
              {group.map(gi => {
                const f = FORMATS[gi]
                return (
                  <div key={gi} style={{ borderRadius: '14px', overflow: 'hidden', background: f.cardBg, border: '1px solid rgba(6,148,209,0.22)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', height: '140px', flexShrink: 0, overflow: 'hidden' }}>
                      <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: (f as { objPos?: string }).objPos ?? 'center' }} />
                      <span style={{ position: 'absolute', left: '8px', top: '8px', borderRadius: '999px', padding: '3px 10px', fontSize: '11px', fontWeight: 500, background: 'rgba(9,49,72,0.65)', backdropFilter: 'blur(6px)', color: '#fff' }}>{f.badge}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '12px 14px 14px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{f.title}</h3>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55, flex: 1 }}>{f.desc}</p>
                      <button className="ent-lf-btn-glow" style={{ marginTop: '12px', width: '100%', borderRadius: '10px', padding: '9px', fontSize: '12px', fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg,#0694d1,#076d9d)', border: 'none', cursor: 'pointer' }}>Learn More →</button>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="mt-6 flex justify-center gap-3">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            aria-label={`Page ${i + 1}`}
            style={{
              width: i === page ? 32 : 10,
              height: 10,
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
              background: i === page ? '#0694D1' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── How It Works Mobile Carousel ──────────────────────── */

function HowItWorksMobileCarousel() {
  const [page, setPage] = useState(0)
  const touchStartX = useRef(0)
  const CARDS_PER_PAGE = 2
  const totalPages = Math.ceil(HOW_IT_WORKS.length / CARDS_PER_PAGE)
  const pages: number[][] = Array.from({ length: totalPages }, (_, p) =>
    HOW_IT_WORKS.slice(p * CARDS_PER_PAGE, (p + 1) * CARDS_PER_PAGE).map((_, i) => p * CARDS_PER_PAGE + i)
  )

  return (
    <div className="sm:hidden">
      <div
        className="overflow-hidden"
        style={{ paddingTop: 12 }}
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (dx < -40 && page < totalPages - 1) setPage(p => p + 1)
          if (dx > 40 && page > 0) setPage(p => p - 1)
        }}
      >
        <div
          className="flex"
          style={{ transform: `translateX(-${page * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
        >
          {pages.map((group, pageIdx) => (
            <div key={pageIdx} className="min-w-full grid grid-cols-1 gap-8">
              {group.map(gi => {
                const step = HOW_IT_WORKS[gi]
                return (
                  <div key={gi} className="flex flex-col items-center">
                    {/* Icon circle */}
                    <div className="relative z-10 mb-6">
                      <div
                        className="flex h-20 w-20 items-center justify-center rounded-full"
                        style={{ background: 'white', border: '4px solid #f0f9ff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                      >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#076D9D" strokeWidth={1.8}>{step.icon}</svg>
                      </div>
                      <span
                        className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white"
                        style={{ background: '#093148' }}
                      >{gi + 1}</span>
                    </div>
                    {/* Card */}
                    <div
                      className="w-full rounded-2xl border-2 p-6 text-center"
                      style={{ background: 'white', borderColor: '#e8f4fa', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                    >
                      <div className="mb-2 text-sm font-bold tracking-widest text-koenig-blue">STEP {step.step}</div>
                      <h3 className="mb-2 text-base font-semibold" style={{ color: '#093148' }}>{step.title}</h3>
                      <p className="mb-4 text-sm font-light leading-relaxed text-koenig-muted">{step.desc}</p>
                      <div className="flex items-center justify-center gap-1.5">
                        {[0,1,2,3].map(d => (
                          <div key={d} className="rounded-full" style={{ width: d < gi + 1 ? '16px' : '8px', height: '8px', background: d < gi + 1 ? '#076D9D' : '#CAEFFF' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="mt-6 flex justify-center gap-3">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            aria-label={`Page ${i + 1}`}
            style={{
              width: i === page ? 32 : 10,
              height: 10,
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
              background: i === page ? '#076D9D' : '#CAEFFF',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Koenig Difference Mobile Carousel ─────────────────── */

const WHY_ICONS = [
  <svg key={0} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key={1} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  <svg key={2} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  <svg key={3} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/><path d="M9 11l2 2 4-4"/></svg>,
  <svg key={4} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#076d9d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 7h5M7 11h3"/></svg>,
  <svg key={5} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.1a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z"/></svg>,
]

const WHY_BG = [
  'linear-gradient(135deg,#0a6ebd 0%,#0694d1 50%,#00b4d8 100%)',
  'linear-gradient(145deg,#071c2e,#0a2a42)',
  'linear-gradient(145deg,#062038,#083250)',
  'linear-gradient(145deg,#072440,#093556)',
  'linear-gradient(145deg,#061828,#082438)',
  'linear-gradient(145deg,#062030,#083048)',
]

const WHY_BORDER = [
  'rgba(255,255,255,0.18)',
  'rgba(6,148,209,0.22)',
  'rgba(0,180,216,0.2)',
  'rgba(6,148,209,0.2)',
  'rgba(7,109,157,0.25)',
  'rgba(0,180,216,0.18)',
]

function KoenigDifferenceMobileCarousel() {
  const [page, setPage] = useState(0)
  const touchStartX = useRef(0)
  const CARDS_PER_PAGE = 2
  const totalPages = Math.ceil(WHY.length / CARDS_PER_PAGE)
  const pages: number[][] = Array.from({ length: totalPages }, (_, p) =>
    WHY.slice(p * CARDS_PER_PAGE, (p + 1) * CARDS_PER_PAGE).map((_, i) => p * CARDS_PER_PAGE + i)
  )

  return (
    <div className="sm:hidden">
      <div
        className="overflow-hidden"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (dx < -40 && page < totalPages - 1) setPage(p => p + 1)
          if (dx > 40 && page > 0) setPage(p => p - 1)
        }}
      >
        <div
          className="flex"
          style={{ transform: `translateX(-${page * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
        >
          {pages.map((group, pageIdx) => (
            <div key={pageIdx} className="min-w-full grid grid-cols-1 gap-3">
              {group.map(gi => (
                <div
                  key={gi}
                  className="flex flex-col rounded-2xl p-5"
                  style={{ background: WHY_BG[gi], border: `1px solid ${WHY_BORDER[gi]}` }}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: gi === 0 ? 'rgba(255,255,255,0.18)' : 'rgba(6,148,209,0.18)' }}>
                    {WHY_ICONS[gi]}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white">{WHY[gi].title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: gi === 0 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)' }}>{WHY[gi].desc}</p>
                  {gi === 0 && (
                    <div className="mt-4 flex gap-3">
                      {[{ val: '50+', label: 'Vendors' }, { val: '195+', label: 'Countries' }, { val: '30+', label: 'Years' }].map(s => (
                        <div key={s.label} className="flex-1 rounded-xl py-2 text-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                          <div className="text-sm font-bold text-white">{s.val}</div>
                          <div className="text-xs text-white/70">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="mt-5 flex justify-center gap-3">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            aria-label={`Page ${i + 1}`}
            style={{
              width: i === page ? 32 : 10,
              height: 10,
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
              background: i === page ? '#0694D1' : 'rgba(6,148,209,0.3)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Industry Mobile Carousel ──────────────────────────── */

function IndustryMobileCarousel() {
  const [page, setPage] = useState(0)
  const touchStartX = useRef(0)
  const CARDS_PER_PAGE = 2
  const totalPages = Math.ceil(INDUSTRIES.length / CARDS_PER_PAGE)
  const pages: number[][] = Array.from({ length: totalPages }, (_, p) =>
    INDUSTRIES.slice(p * CARDS_PER_PAGE, (p + 1) * CARDS_PER_PAGE).map((_, i) => p * CARDS_PER_PAGE + i)
  )

  return (
    <div className="sm:hidden">
      {/* Sliding track */}
      <div
        className="overflow-hidden"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (dx < -40 && page < totalPages - 1) setPage(p => p + 1)
          if (dx > 40 && page > 0) setPage(p => p - 1)
        }}
      >
        <div
          className="flex"
          style={{ transform: `translateX(-${page * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
        >
          {pages.map((group, pageIdx) => (
            <div key={pageIdx} className="min-w-full grid grid-cols-1 gap-3">
              {group.map(globalI => {
                const ind = INDUSTRIES[globalI]
                return (
                  <div
                    key={globalI}
                    className="ind-card"
                    ref={el => {
                      if (!el) return
                      const obs = new IntersectionObserver(([entry]) => {
                        if (entry.isIntersecting) { el.classList.add('ind-visible'); obs.disconnect() }
                      }, { threshold: 0.05 })
                      obs.observe(el)
                    }}
                  >
                    <div className="ind-accent" />
                    <div className="ind-icon-box mb-4" style={{ animationDelay: `${globalI * 0.6}s` }}>
                      <div className="ind-icon-svg" style={{ ['--fy' as string]: '0px', ['--draw-delay' as string]: `${globalI * 0.15}s` } as React.CSSProperties}>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>{ind.icon}</svg>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white">{ind.name}</h3>
                    <div className="ind-divider" />
                    <p className="mb-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.52)' }}>{ind.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ind.tags.map(tag => <span key={tag} className="ind-tag">{tag}</span>)}
                    </div>
                    <div className="ind-ghost" aria-hidden>{String(globalI + 1).padStart(2, '0')}</div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="mt-5 flex justify-center gap-3">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            aria-label={`Page ${i + 1}`}
            style={{
              width: i === page ? 32 : 10,
              height: 10,
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
              background: i === page ? '#0694D1' : 'rgba(19,168,212,0.3)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Client Logo Marquee ────────────────────────────────── */

function ClientLogoMarquee({ clients }: { clients: typeof ENTERPRISE_CLIENTS }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const paused = useRef(false)
  const dragStartX = useRef(0)
  const dragStartPos = useRef(0)

  useEffect(() => {
    const inner = trackRef.current
    if (!inner) return
    let prev = performance.now()
    let raf: number
    function tick(now: number) {
      const dt = now - prev
      prev = now
      if (!paused.current && inner) {
        pos.current += 0.04 * dt
        const half = inner.scrollWidth / 2
        if (half > 0 && pos.current >= half) pos.current -= half
        inner.style.transform = `translateX(-${pos.current}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
      onTouchStart={e => {
        paused.current = true
        dragStartX.current = e.touches[0].clientX
        dragStartPos.current = pos.current
      }}
      onTouchMove={e => {
        const delta = dragStartX.current - e.touches[0].clientX
        const inner = trackRef.current
        if (!inner) return
        const half = inner.scrollWidth / 2
        let newPos = dragStartPos.current + delta
        if (newPos < 0) newPos = 0
        if (half > 0 && newPos >= half) newPos = half - 1
        pos.current = newPos
        inner.style.transform = `translateX(-${pos.current}px)`
      }}
      onTouchEnd={() => { paused.current = false }}
    >
      <div
        ref={trackRef}
        className="flex items-center gap-2 py-2"
        style={{ width: 'max-content' }}
      >
        {[...clients, ...clients].map((c, i) => (
          <div key={i} className="flex shrink-0 items-center justify-center px-2">
            <img src={`/images/trusted-logos/${encodeURIComponent(c.img)}`} alt={c.name} className="h-12 w-auto object-contain" style={{ filter: 'drop-shadow(0 2px 6px rgba(6,148,209,0.12))' }} title={c.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Component ──────────────────────────────────────────── */

export default function EnterprisePage() {
  const [activeDomain, setActiveDomain] = useState(0)
  const [activeHiwStep, setActiveHiwStep] = useState(0)
  const [hiwPaused, setHiwPaused] = useState(false)
  const [formatsSlide, setFormatsSlide] = useState(0)
  const [biSlide, setBiSlide] = useState(0)
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [modalFormData, setModalFormData] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [modalSubmitted, setModalSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [catSearch, setCatSearch] = useState('')
  const [catLevel, setCatLevel] = useState('All')
  const [catSort, setCatSort] = useState('low-high')
  const [descExpanded, setDescExpanded] = useState(false)
  const [flippedCard, setFlippedCard] = useState<string | null>(null)
  const [entMorphIdx, setEntMorphIdx] = useState(0)
  const [entMorphExiting, setEntMorphExiting] = useState(false)

  const [chatOpen, setChatOpen] = useState(false)
  const [chatMsg, setChatMsg] = useState('')
  const [showBackTop, setShowBackTop] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')

  // Nav state
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)
  const [mobileAllCoursesOpen, setMobileAllCoursesOpen] = useState(false)
  const [mobileTechOpen, setMobileTechOpen] = useState(false)
  const [mobileLearningOpen, setMobileLearningOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const [mobileMegaVendor, setMobileMegaVendor] = useState(MEGA_MENU_VENDORS[0]?.name ?? '')
  const [mobileTechCategory, setMobileTechCategory] = useState(TOP_TECHNOLOGIES[0]?.name ?? '')
  const [navQuery, setNavQuery] = useState('')
  const [navResultsOpen, setNavResultsOpen] = useState(false)
  const navSearchRef = useRef<HTMLDivElement>(null)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [techMenuOpen, setTechMenuOpen] = useState(false)
  const [learningMenuOpen, setLearningMenuOpen] = useState(false)
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false)
  const [megaMenuVendor, setMegaMenuVendor] = useState('Microsoft')
  const [techMenuCategory, setTechMenuCategory] = useState('Cloud Computing')
  const [scrollProgress, setScrollProgress] = useState(0)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const techMenuRef = useRef<HTMLDivElement>(null)
  const learningMenuRef = useRef<HTMLDivElement>(null)
  const aboutMenuRef = useRef<HTMLDivElement>(null)

  // Scroll-triggered fade-ins (same pattern as homepage)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('io-visible')
        else e.target.classList.remove('io-visible')
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.io-fade').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])


  useEffect(() => {
    const cycle = setInterval(() => {
      setEntMorphExiting(true)
      setTimeout(() => {
        setEntMorphIdx(i => (i + 1) % ENT_MORPH_WORDS.length)
        setEntMorphExiting(false)
      }, 380)
    }, 2800)
    return () => clearInterval(cycle)
  }, [])

  // Business Impact — auto-advance image slider
  useEffect(() => {
    const t = setInterval(() => setBiSlide(s => (s + 1) % 6), 4000)
    return () => clearInterval(t)
  }, [])

  // Learning Formats — auto-advance every 3s
  useEffect(() => {
    const t = setInterval(() => setFormatsSlide(s => (s + 1) % 2), 3000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (hiwPaused) return
    const t = setInterval(() => setActiveHiwStep(s => (s + 1) % 4), 2500)
    return () => clearInterval(t)
  }, [hiwPaused])

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 10)
      setShowBackTop(scrollTop > 400)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docH > 0 ? (scrollTop / docH) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ADDE canvas
  const addeCanvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = addeCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let tick = 0
    const orbs = [
      { cx:.28, cy:.45, r:.40, col:'19,168,212', spd:.00018, fx:.7, fy:.5, ax:.30, ay:.22, ph:0 },
      { cx:.72, cy:.55, r:.38, col:'19,168,212', spd:.00014, fx:.5, fy:.8, ax:.25, ay:.28, ph:2.1 },
      { cx:.50, cy:.25, r:.30, col:'19,168,212', spd:.00022, fx:.9, fy:.6, ax:.18, ay:.14, ph:4.2 },
      { cx:.18, cy:.70, r:.45, col:'11,37,69',   spd:.00012, fx:.6, fy:.4, ax:.20, ay:.32, ph:1.1 },
      { cx:.82, cy:.30, r:.35, col:'11,37,69',   spd:.00016, fx:.4, fy:.9, ax:.28, ay:.16, ph:3.3 },
    ]
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const draw = () => {
      const W = canvas.width, H = canvas.height
      tick++
      const bg = ctx.createLinearGradient(0,0,W,H)
      bg.addColorStop(0,'#0c1a28'); bg.addColorStop(.5,'#0d1e30'); bg.addColorStop(1,'#080f18')
      ctx.fillStyle = bg; ctx.fillRect(0,0,W,H)
      ctx.save(); ctx.globalCompositeOperation = 'screen'
      orbs.forEach(o => {
        const x = (o.cx + Math.sin(tick * o.spd * o.fx + o.ph) * o.ax) * W
        const y = (o.cy + Math.cos(tick * o.spd * o.fy + o.ph) * o.ay) * H
        const r = o.r * Math.min(W,H)
        const g = ctx.createRadialGradient(x,y,0,x,y,r)
        g.addColorStop(0,   `rgba(${o.col},.18)`)
        g.addColorStop(.4,  `rgba(${o.col},.10)`)
        g.addColorStop(.75, `rgba(${o.col},.03)`)
        g.addColorStop(1,   `rgba(${o.col},0)`)
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill()
      })
      ctx.restore()
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])


  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navSearchRef.current && !navSearchRef.current.contains(e.target as Node)) setNavResultsOpen(false)
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) setMegaMenuOpen(false)
      if (techMenuRef.current && !techMenuRef.current.contains(e.target as Node)) setTechMenuOpen(false)
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(e.target as Node)) setAboutMenuOpen(false)
      if (learningMenuRef.current && !learningMenuRef.current.contains(e.target as Node)) setLearningMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#06111E', fontFamily: "'GT Walsheim Pro', sans-serif" }}>

      {/* ── Global styles & keyframes (same as homepage) ── */}
      <style>{`
        /* ── Hero illustration ── */
        @keyframes entIllSpin    { to { transform: rotate(360deg); } }
        @keyframes entIllSpinRev { to { transform: rotate(-360deg); } }
        @keyframes entIllOrb     { 0%,100%{box-shadow:0 0 35px rgba(6,148,209,0.32),0 0 70px rgba(6,148,209,0.10)} 50%{box-shadow:0 0 58px rgba(6,148,209,0.55),0 0 110px rgba(6,148,209,0.20)} }
        @keyframes entIllFloatA  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes entIllFloatB  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes entIllFloatC  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes entIllLiveDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.25;transform:scale(0.5)} }
        @keyframes entIllBeam    { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
        .ent-ill-spin     { animation: entIllSpin 20s linear infinite; }
        .ent-ill-spin-rev { animation: entIllSpinRev 13s linear infinite; }
        .ent-ill-orb      { animation: entIllOrb 3.8s ease-in-out infinite; }
        .ent-ill-float-a  { animation: entIllFloatA 5s ease-in-out infinite; }
        .ent-ill-float-b  { animation: entIllFloatB 6.5s ease-in-out infinite 0.9s; }
        .ent-ill-float-c  { animation: entIllFloatC 4.5s ease-in-out infinite 1.6s; }
        .ent-ill-live-dot { animation: entIllLiveDot 1.4s ease-in-out infinite; }

        /* Morphing hero word (same as homepage) */
        @keyframes entMorphIn  { from { opacity:0; filter:blur(10px); transform:translateY(14px);  } to { opacity:1; filter:blur(0); transform:translateY(0); } }
        @keyframes entMorphOut { from { opacity:1; filter:blur(0);    transform:translateY(0);     } to { opacity:0; filter:blur(10px); transform:translateY(-14px); } }
        @keyframes entGradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        /* Gradient morph text — colour stays blue gradient, glow matches homepage */
        .ent-morph-gradient {
          background: linear-gradient(90deg, #38bdf8 0%, #0694d1 30%, #4DBFEF 55%, #38bdf8 80%, #0694d1 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 28px rgba(6,148,209,0.9)) drop-shadow(0 0 55px rgba(6,148,209,0.45));
        }
        /* Combine gradient sweep + morph animations so both run together */
        .ent-morph-in  { animation: entGradShift 3s ease infinite, entMorphIn  0.52s cubic-bezier(0.22,1,0.36,1) both; }
        .ent-morph-out { animation: entGradShift 3s ease infinite, entMorphOut 0.34s ease-in both; }

        /* Scroll-triggered fade-in-up */
        .io-fade { opacity: 0; transform: translateY(12px); transition: opacity 0.22s ease-out, transform 0.22s ease-out; }
        .io-fade.io-visible { opacity: 1; transform: translateY(0); }
        .io-fade.delay-1 { transition-delay: 0.04s; }
        .io-fade.delay-2 { transition-delay: 0.08s; }
        .io-fade.delay-3 { transition-delay: 0.12s; }
        .io-fade.delay-4 { transition-delay: 0.16s; }
        .io-fade.delay-5 { transition-delay: 0.20s; }
        .io-fade.delay-6 { transition-delay: 0.24s; }


        /* Domain card — animated gradient border */
        @property --domain-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes domain-border-spin {
          to { --domain-angle: 360deg; }
        }
        .domain-card {
          --domain-angle: 0deg;
          background: #fff;
          border: 1.5px solid transparent;
          background-image: linear-gradient(#fff, #fff), conic-gradient(from var(--domain-angle), #13A8D4 0%, #4DBFEF 25%, #e8f8ff 42%, #093148 55%, #07C8EE 75%, #13A8D4 100%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          animation: domain-border-spin 5s linear infinite;
          box-shadow: 0 2px 14px rgba(19,168,212,0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.22s ease-out;
        }
        .domain-card:hover {
          box-shadow: 0 8px 32px rgba(19,168,212,0.22), 0 0 18px rgba(19,168,212,0.18);
          transform: translateY(-5px);
          animation: domain-border-spin 2s linear infinite;
        }

        /* Infinite client logo marquee */
        @keyframes ent-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes ent-marquee-rev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .ent-marquee-track { animation: ent-marquee 38s linear infinite; display:flex; width:max-content; }
        .ent-marquee-track-rev { animation: ent-marquee-rev 38s linear infinite; display:flex; width:max-content; }
        .ent-marquee-track:hover, .ent-marquee-track-rev:hover { animation-play-state: paused; }
        .ent-marquee-wrap { overflow:hidden; mask-image:linear-gradient(to right,transparent 0,black 80px,black calc(100% - 80px),transparent 100%); -webkit-mask-image:linear-gradient(to right,transparent 0,black 80px,black calc(100% - 80px),transparent 100%); }

        /* Hero blob floats (same as homepage) */
        @keyframes entBlob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.95)} }
        @keyframes entBlob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-35px,25px) scale(1.08)} 66%{transform:translate(25px,-15px) scale(0.92)} }
        @keyframes entBlob3 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,40px) scale(1.05)} 66%{transform:translate(-30px,-20px) scale(1.1)} }
        .ent-blob1 { animation: entBlob1 12s ease-in-out infinite; }
        .ent-blob2 { animation: entBlob2 16s ease-in-out infinite; }
        .ent-blob3 { animation: entBlob3 20s ease-in-out infinite; }

        /* Gradient shimmer on dark banners (same as homepage diff-banner) */
        @keyframes entShimmer { 0%{transform:translateX(-110%) skewX(-18deg)} 100%{transform:translateX(220%) skewX(-18deg)} }
        .ent-shimmer { position:relative; overflow:hidden; }
        .ent-shimmer::after { content:''; position:absolute; top:0; left:0; height:100%; width:40%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent); animation:entShimmer 5s ease-in-out infinite; pointer-events:none; border-radius:inherit; }

        /* ROI stat pop */
        @keyframes entStatPop { 0%{opacity:0;transform:scale(0.6) translateY(8px)} 70%{transform:scale(1.06)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        .ent-stat-pop { opacity:0; }
        .ent-stat-pop.io-visible { animation: entStatPop 0.65s cubic-bezier(0.34,1.56,0.64,1) both; }
        .ent-stat-pop.io-visible.d1 { animation-delay:0.05s; }
        .ent-stat-pop.io-visible.d2 { animation-delay:0.18s; }
        .ent-stat-pop.io-visible.d3 { animation-delay:0.31s; }
        .ent-stat-pop.io-visible.d4 { animation-delay:0.44s; }

        /* Industry card hover glow */
        .ent-ind-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .ent-ind-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(6,148,209,0.2), 0 0 0 1px rgba(6,148,209,0.5); }

        /* How-it-works card */
        @keyframes entHiwIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .ent-hiw-card { opacity:0; }
        .ent-hiw-card.io-visible { animation: entHiwIn 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .ent-hiw-card.io-visible.d1 { animation-delay:0.05s; }
        .ent-hiw-card.io-visible.d2 { animation-delay:0.15s; }
        .ent-hiw-card.io-visible.d3 { animation-delay:0.25s; }
        .ent-hiw-card.io-visible.d4 { animation-delay:0.35s; }

        /* FAQ accordion */
        .ent-faq-answer { max-height:0; overflow:hidden; transition: max-height 0.38s cubic-bezier(0.22,1,0.36,1), opacity 0.28s ease; opacity:0; }
        .ent-faq-answer.open { max-height:300px; opacity:1; }

        /* CTA button shine sweep (same as homepage search-btn) */
        @keyframes entBtnShine {
          0%   { background-position: -200% center; }
          30%  { background-position: 200% center; }
          100% { background-position: 200% center; }
        }
        .ent-cta-btn {
          background: linear-gradient(135deg,#0694D1,#076D9D);
          background-image: linear-gradient(135deg,#0694D1,#076D9D), linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.55) 50%,transparent 60%);
          background-image: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.52) 50%,transparent 60%), linear-gradient(135deg,#0694D1,#076D9D);
          background-size: 200% 100%, 100% 100%;
          background-position: -200% center, 0 0;
          animation: entBtnShine 2.4s ease-in-out infinite;
          box-shadow: 0 2px 12px rgba(6,148,209,0.18), 0 1px 4px rgba(6,148,209,0.10);
          transition: box-shadow 0.2s ease, opacity 0.2s ease;
        }
        .ent-cta-btn:hover {
          box-shadow: 0 4px 18px rgba(6,148,209,0.26), 0 2px 8px rgba(6,148,209,0.14);
          opacity: 0.95;
        }

        /* Gradient text */
        .ent-grad-text { background: linear-gradient(135deg,#0694D1,#38bdf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        /* White section gradient text */
        .ent-dark-grad-text { background: linear-gradient(135deg,#076D9D,#0694D1); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        /* Pointer */
        a, button, [role="button"] { cursor: pointer !important; }

        @media (max-width: 480px) {
          .ent-blob1,.ent-blob2,.ent-blob3 { animation: none !important; }
        }
      `}</style>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 z-[200] h-[3px] transition-none" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg,#076D9D,#0694d1,#38bdf8)' }} />

      {/* Contact bar */}
      <div className="hidden md:block px-4 md:px-8 lg:px-[50px]" style={{ background: '#061624' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-3 text-[15px] text-white/75">
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://wa.me/919840722417" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold transition-colors hover:text-white" style={{ color: '#25D366' }}>
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.843L0 24l6.305-1.654A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5.007-1.371l-.359-.214-3.742.981.999-3.65-.234-.375A9.818 9.818 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>
              +91-984-072-2417 <span className="ml-0.5 text-sm font-normal" style={{ color: 'rgba(37,211,102,0.55)' }}>(Chat Only)</span>
            </a>
            <span className="text-white/15">|</span>
            <a href="mailto:info@koenig-solutions.com" className="flex items-center gap-1.5 transition-colors hover:text-white/80">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              info@koenig-solutions.com
            </a>
          </div>
          {/* Right — Login + Enquire */}
          <div className="flex items-center gap-2">
            <a
              href="https://mykoenig.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border px-3 py-1 text-xs font-medium transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.45)', color: '#ffffff' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              Login
            </a>
            <a
              href="#contact"
              className="rounded-lg px-3 py-1 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: '#0694D1' }}
            >
              Enquire
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`relative z-50 px-4 md:px-8 lg:px-[50px] ${scrolled ? 'shadow-lg shadow-black/30' : ''}`}
        style={{ background: 'rgba(6,17,30,0.94)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 py-2 lg:py-3">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div style={{ background: '#ffffff', borderRadius: '6px', padding: '8px' }}>
              <Image src="/images/koenig-logo.svg" alt="Koenig Solutions" width={120} height={32} className="h-7 w-auto lg:h-8" />
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-4 lg:flex">
            <div className="flex items-center" style={{ background: 'linear-gradient(to right, rgba(6,148,209,0.04) 0%, rgba(255,255,255,0.01) 100%)', backdropFilter: 'blur(24px) saturate(200%)', WebkitBackdropFilter: 'blur(24px) saturate(200%)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '50px', padding: '4px', boxShadow: '0 0 20px rgba(6,148,209,0.2), 0 0 40px rgba(6,148,209,0.08), 0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
              {/* All Courses */}
              <button
                onClick={() => { setMegaMenuOpen(v => !v); setTechMenuOpen(false); }}
                className="flex items-center whitespace-nowrap px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 rounded-[40px]"
                style={{ background: megaMenuOpen ? '#076D9D' : '#0694D1', gap: '8px' }}
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
                All Courses
                <svg className="h-3 w-3 opacity-70 -ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              {/* Technologies */}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setTechMenuOpen(v => !v); setMegaMenuOpen(false); setAboutMenuOpen(false); setLearningMenuOpen(false); }}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                style={{ color: techMenuOpen ? '#38bdf8' : '#ffffff', background: techMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(6,148,209,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = techMenuOpen ? '#38bdf8' : '#ffffff'; e.currentTarget.style.background = techMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent'; }}
              >
                Technologies
                <svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </a>

              {/* Learning Options with dropdown */}
              <div className="relative" ref={learningMenuRef}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setLearningMenuOpen(v => !v); setAboutMenuOpen(false); setTechMenuOpen(false); setMegaMenuOpen(false); }}
                  className="flex items-center gap-1 whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                  style={{ color: learningMenuOpen ? '#38bdf8' : '#ffffff', background: learningMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(6,148,209,0.18)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = learningMenuOpen ? '#38bdf8' : '#ffffff'; e.currentTarget.style.background = learningMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent'; }}
                >
                  Learning Options
                  <svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </a>
                {learningMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 z-[300] rounded-xl shadow-2xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', minWidth: '220px' }}>
                    {LEARNING_LINKS.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="block px-5 py-2.5 text-sm transition-colors"
                        style={{ color: '#374151' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0694D1'; (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.06)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#374151'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                        onClick={() => setLearningMenuOpen(false)}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* About with dropdown */}
              <div className="relative" ref={aboutMenuRef}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setAboutMenuOpen(v => !v); setTechMenuOpen(false); setMegaMenuOpen(false); setLearningMenuOpen(false); }}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                  style={{ color: aboutMenuOpen ? '#38bdf8' : '#ffffff', background: aboutMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(6,148,209,0.18)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = aboutMenuOpen ? '#38bdf8' : '#ffffff'; e.currentTarget.style.background = aboutMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent'; }}
                >
                  About
                  <svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </a>
                {aboutMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 z-[300] rounded-xl shadow-2xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', minWidth: '220px' }}>
                    {ABOUT_LINKS.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="block px-5 py-2.5 text-sm transition-colors"
                        style={{ color: '#374151' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0694D1'; (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.06)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#374151'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                        onClick={() => setAboutMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#"
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                style={{ color: '#ffffff', background: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(6,148,209,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'transparent'; }}
              >
                Contact
              </a>
            </div>
          </nav>

          {/* Right — search + hamburger */}
          <div className="ml-auto flex items-center gap-2">
            {/* Individual / Enterprise toggle — Enterprise is active on this page */}
            <div className="hidden lg:flex rounded-xl p-0.5" style={{ background: 'rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.30)' }}>
              <Link
                href="/"
                className="rounded-lg px-3 py-1.5 text-sm font-normal transition-all"
                style={{ color: 'rgba(255,255,255,0.55)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#38bdf8'; (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                Individual
              </Link>
              <span className="rounded-lg px-3 py-1.5 text-sm font-normal text-white" style={{ background: '#0694D1', boxShadow: '0 0 10px rgba(6,148,209,0.40)' }}>
                Enterprise
              </span>
            </div>
            {/* Search */}
            <div className="relative hidden lg:block" ref={navSearchRef}>
              <div className="flex items-center gap-2 rounded-full px-4 py-1.5 transition-all focus-within:shadow-[0_0_0_2px_rgba(6,148,209,0.6)]" style={{ background: 'rgba(6,148,209,0.12)', border: '1px solid rgba(6,148,209,0.35)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0" style={{ color: '#38bdf8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input
                  type="text"
                  value={navQuery}
                  onChange={e => { setNavQuery(e.target.value); setNavResultsOpen(true) }}
                  onFocus={() => setNavResultsOpen(true)}
                  placeholder="Search courses…"
                  aria-label="Search courses"
                  className="w-36 bg-transparent text-sm text-white placeholder-white/40 outline-none"
                />
                {navQuery.length > 0 && (
                  <button
                    onClick={() => { setNavQuery(''); setNavResultsOpen(false); }}
                    className="shrink-0 flex items-center justify-center w-4 h-4 rounded-full transition-colors hover:bg-white/20"
                    aria-label="Clear search"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                )}
              </div>
              {navResultsOpen && navQuery.trim().length > 0 && (
                <div className="absolute right-0 top-full z-50 mt-1.5 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                  {(() => {
                    const results = [...TOP_COURSES, ...NEW_TRENDING].filter(c =>
                      c.name.toLowerCase().includes(navQuery.toLowerCase()) ||
                      c.vendor.toLowerCase().includes(navQuery.toLowerCase())
                    ).slice(0, 6)
                    return results.length > 0 ? results.map((c, i) => (
                      <div key={i} className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50 last:border-0">
                        <div className="min-w-0 flex-1">
                          <div className="mb-0.5 flex items-center gap-1">
                            {(c as { category?: string }).category === 'NEW' && <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-600">New</span>}
                            {c.hot && <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-600">Popular</span>}
                          </div>
                          <p className="truncate text-sm font-medium text-gray-800">{c.name}</p>
                          <p className="mt-0.5 text-xs text-gray-500">{c.vendor} · {c.days} days · {c.price}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          {(c as { category?: string }).category === 'FUNDAMENTALS' && <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-cyan-50 text-cyan-600">Fundamentals</span>}
                          {(c as { category?: string }).category === 'ASSOCIATE' && <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-600">Associate</span>}
                          {((c as { category?: string }).category === 'EXPERT' || (c.level === 'Advanced' && (c as { category?: string }).category !== 'FUNDAMENTALS' && (c as { category?: string }).category !== 'ASSOCIATE')) && <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-violet-50 text-violet-600">Expert</span>}
                        </div>
                      </div>
                    )) : <div className="px-4 py-3 text-sm text-gray-500">No courses found for &quot;{navQuery}&quot;</div>
                  })()}
                </div>
              )}
            </div>
            {/* Mobile search icon */}
            <button
              onClick={() => { setMobileSearchOpen(true); setMobileOpen(false); setTimeout(() => mobileSearchInputRef.current?.focus(), 50); }}
              className="rounded-lg p-2 transition-colors hover:bg-white/10 lg:hidden"
              style={{ color: '#ffffff' }}
              aria-label="Search"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="rounded-lg p-2 transition-colors hover:bg-white/10 lg:hidden"
              style={{ color: '#ffffff' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search overlay bar */}
        {mobileSearchOpen && (
          <div className="relative lg:hidden px-3 pb-3" style={{ background: 'rgba(6,17,30,0.98)' }}>
            <div className="flex items-center gap-2 rounded-xl border px-3 py-2" style={{ background: 'rgba(6,148,209,0.10)', borderColor: 'rgba(6,148,209,0.4)' }}>
              <svg className="h-4 w-4 shrink-0 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input
                ref={mobileSearchInputRef}
                type="text"
                value={navQuery}
                onChange={e => { setNavQuery(e.target.value); setNavResultsOpen(true); }}
                onFocus={() => setNavResultsOpen(true)}
                placeholder="Search 5,000+ courses…"
                aria-label="Search courses"
                className="flex-1 bg-transparent text-sm text-white placeholder-white/50 outline-none"
              />
              <button
                onClick={() => { setMobileSearchOpen(false); setNavQuery(''); setNavResultsOpen(false); }}
                className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                aria-label="Close search"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            {navResultsOpen && navQuery.trim().length > 0 && (
              <div className="absolute left-3 right-3 top-full z-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                {(() => {
                  const results = [...TOP_COURSES, ...NEW_TRENDING].filter(c =>
                    c.name.toLowerCase().includes(navQuery.toLowerCase()) ||
                    c.vendor.toLowerCase().includes(navQuery.toLowerCase())
                  ).slice(0, 6)
                  return results.length > 0 ? results.map((c, i) => (
                    <div key={i} className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50 last:border-0">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-800">{c.name}</p>
                        <p className="mt-0.5 text-xs text-gray-500">{c.vendor} · {c.days} days</p>
                      </div>
                    </div>
                  )) : <div className="px-4 py-3 text-sm text-gray-500">No courses found for &ldquo;{navQuery}&rdquo;</div>
                })()}
              </div>
            )}
          </div>
        )}

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="-mx-4 border-t lg:hidden" style={{ background: '#061624', borderColor: 'rgba(6,148,209,0.2)', maxHeight: '80vh', overflowY: 'auto' }}>
            <div className="px-4 py-3 space-y-1">

              {/* Individual / Enterprise toggle */}
              <div className="mb-2 flex rounded-xl p-0.5" style={{ background: 'rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.30)' }}>
                <Link href="/" className="flex-1 rounded-lg px-3 py-2 text-center text-sm font-normal transition-all" style={{ color: 'rgba(255,255,255,0.55)' }}>Individual</Link>
                <span className="flex-1 rounded-lg px-3 py-2 text-center text-sm font-normal text-white" style={{ background: '#0694D1', boxShadow: '0 0 10px rgba(6,148,209,0.40)' }}>Enterprise</span>
              </div>

              {/* All Courses accordion */}
              <div>
                <button
                  onClick={() => setMobileAllCoursesOpen(v => !v)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5"
                  style={{ color: mobileAllCoursesOpen ? '#38bdf8' : '#ffffff' }}
                >
                  All Courses
                  <svg className={`h-4 w-4 transition-transform ${mobileAllCoursesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </button>
                {mobileAllCoursesOpen && (
                  <div className="mt-1 rounded-xl overflow-hidden" style={{ background: 'rgba(6,148,209,0.06)', border: '1px solid rgba(6,148,209,0.15)' }}>
                    <div className="flex overflow-x-auto gap-1 p-2 border-b" style={{ borderColor: 'rgba(6,148,209,0.15)' }}>
                      {MEGA_MENU_VENDORS.map(v => (
                        <button
                          key={v.name}
                          onClick={() => setMobileMegaVendor(v.name)}
                          className="shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                          style={{
                            background: mobileMegaVendor === v.name ? '#0694D1' : 'rgba(255,255,255,0.06)',
                            color: mobileMegaVendor === v.name ? '#fff' : 'rgba(255,255,255,0.65)',
                          }}
                        >
                          {v.img && <div className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded bg-white"><img src={`/images/partners/${encodeURIComponent(v.img)}`} alt={v.name} className="h-full w-full object-contain" /></div>}
                          {v.name}
                        </button>
                      ))}
                    </div>
                    <div className="p-3 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(6,148,209,0.8)' }}>
                        {MEGA_MENU_VENDORS.find(v => v.name === mobileMegaVendor)?.courses} courses available
                      </p>
                      {(MEGA_MENU_COURSES[mobileMegaVendor] ?? []).map((c, i) => (
                        <a key={i} href="#" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.85)' }}>
                          <span>{c.name}</span>
                          <span className="text-xs" style={{ color: 'rgba(6,148,209,0.8)' }}>{c.days}d</span>
                        </a>
                      ))}
                      <a href="#" className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: '#0694D1' }}>
                        Browse All {mobileMegaVendor} Courses →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Technologies accordion */}
              <div>
                <button
                  onClick={() => setMobileTechOpen(v => !v)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5"
                  style={{ color: mobileTechOpen ? '#38bdf8' : '#ffffff' }}
                >
                  Technologies
                  <svg className={`h-4 w-4 transition-transform ${mobileTechOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </button>
                {mobileTechOpen && (
                  <div className="mt-1 rounded-xl overflow-hidden" style={{ background: 'rgba(6,148,209,0.06)', border: '1px solid rgba(6,148,209,0.15)' }}>
                    <div className="flex overflow-x-auto gap-1 p-2 border-b" style={{ borderColor: 'rgba(6,148,209,0.15)' }}>
                      {TOP_TECHNOLOGIES.map(t => (
                        <button
                          key={t.name}
                          onClick={() => setMobileTechCategory(t.name)}
                          className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                          style={{
                            background: mobileTechCategory === t.name ? '#0694D1' : 'rgba(255,255,255,0.06)',
                            color: mobileTechCategory === t.name ? '#fff' : 'rgba(255,255,255,0.65)',
                          }}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                    <div className="p-3 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(6,148,209,0.8)' }}>
                        {TOP_TECHNOLOGIES.find(t => t.name === mobileTechCategory)?.count} courses · Partners: {TOP_TECHNOLOGIES.find(t => t.name === mobileTechCategory)?.partners.join(', ')}
                      </p>
                      {(TECH_MENU_COURSES[mobileTechCategory] ?? []).map((course, i) => (
                        <a key={i} href="#" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.85)' }}>
                          <span>{course.name}</span>
                          <span className="text-xs" style={{ color: 'rgba(6,148,209,0.8)' }}>{course.days}d</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Learning Options accordion */}
              <div>
                <button
                  onClick={() => setMobileLearningOpen(v => !v)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5"
                  style={{ color: mobileLearningOpen ? '#38bdf8' : '#ffffff' }}
                >
                  Learning Options
                  <svg className={`h-4 w-4 transition-transform ${mobileLearningOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </button>
                {mobileLearningOpen && (
                  <div className="mt-1 rounded-xl overflow-hidden" style={{ background: 'rgba(6,148,209,0.06)', border: '1px solid rgba(6,148,209,0.15)' }}>
                    {LEARNING_LINKS.map(link => (
                      <a key={link} href="#" className="block px-5 py-2.5 text-sm transition-colors hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.8)' }}>{link}</a>
                    ))}
                  </div>
                )}
              </div>

              {/* About accordion */}
              <div>
                <button
                  onClick={() => setMobileAboutOpen(v => !v)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5"
                  style={{ color: mobileAboutOpen ? '#38bdf8' : '#ffffff' }}
                >
                  About
                  <svg className={`h-4 w-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </button>
                {mobileAboutOpen && (
                  <div className="mt-1 rounded-xl overflow-hidden" style={{ background: 'rgba(6,148,209,0.06)', border: '1px solid rgba(6,148,209,0.15)' }}>
                    {ABOUT_LINKS.map(link => (
                      <Link key={link.label} href={link.href} className="block px-5 py-2.5 text-sm transition-colors hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.8)' }} onClick={() => setMobileAboutOpen(false)}>{link.label}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact */}
              <a href="#" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5">Contact</a>

              {/* Bottom actions */}
              <div className="flex gap-2 pt-2 pb-1">
                <a href="https://mykoenig.com" target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg border border-white/30 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10">Login</a>
                <a href="#contact" className="flex-1 rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: '#0694D1' }}>Enquire</a>
              </div>

            </div>
          </div>
        )}

        {/* ── All Courses Mega Menu ── */}
        {megaMenuOpen && (
          <div
            ref={megaMenuRef}
            className="absolute left-0 right-0 top-full z-[200] flex overflow-hidden"
            style={{ background: 'rgba(4,12,24,0.98)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(6,148,209,0.2)', borderTop: 'none', boxShadow: '0 24px 60px rgba(0,0,0,0.6)', maxHeight: '520px' }}
          >
            {/* Left — vendor list */}
            <div className="flex w-52 shrink-0 flex-col overflow-y-auto border-r" style={{ borderColor: 'rgba(6,148,209,0.15)', background: 'rgba(6,17,30,0.6)' }}>
              <div className="px-4 py-3 text-sm font-semibold uppercase tracking-widest" style={{ color: 'rgba(6,148,209,0.7)' }}>Vendors</div>
              {MEGA_MENU_VENDORS.map(v => (
                <div key={v.name} className="group/vendor relative flex items-center" style={{ borderLeft: megaMenuVendor === v.name ? '2px solid #0694D1' : '2px solid transparent', background: megaMenuVendor === v.name ? 'rgba(6,148,209,0.12)' : 'transparent' }}>
                  <button
                    onMouseEnter={() => setMegaMenuVendor(v.name)}
                    onClick={() => setMegaMenuVendor(v.name)}
                    className="flex flex-1 items-center gap-3 px-4 py-2.5 text-left transition-all"
                    style={{ color: megaMenuVendor === v.name ? '#ffffff' : 'rgba(255,255,255,0.65)' }}
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white p-0.5">
                      {v.img ? (
                        <img src={`/images/partners/${encodeURIComponent(v.img)}`} alt={v.name} className="h-full w-full object-contain" />
                      ) : (
                        <span className="text-sm font-black" style={{ color: '#0694D1' }}>{v.name[0]}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium leading-tight">{v.name}</div>
                      <div className="text-sm" style={{ color: 'rgba(6,148,209,0.7)' }}>{v.courses} Courses</div>
                    </div>
                  </button>
                  <a
                    href="#"
                    title={`View all ${v.name} courses`}
                    className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-md opacity-0 transition-all group-hover/vendor:opacity-100 hover:!opacity-100"
                    style={{ color: '#38bdf8', background: 'rgba(6,148,209,0.18)' }}
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </a>
                </div>
              ))}
            </div>

            {/* Right — courses panel */}
            <div className="flex flex-1 flex-col overflow-y-auto p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{megaMenuVendor} Courses</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {MEGA_MENU_VENDORS.find(v => v.name === megaMenuVendor)?.courses} courses available
                  </p>
                </div>
                <a href="#" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: '#0694D1' }}>
                  View All {megaMenuVendor} Courses
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                {(MEGA_MENU_COURSES[megaMenuVendor] ?? []).map((course, i) => (
                  <a
                    key={i}
                    href="#"
                    className="group flex flex-col gap-2 rounded-xl p-3.5 transition-all hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(6,148,209,0.15)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.35)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.15)'; }}
                  >
                    <p className="text-sm font-medium leading-snug text-white group-hover:text-[#38bdf8] transition-colors line-clamp-2">{course.name}</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="flex items-center gap-1 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        {course.days} days
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-sm font-semibold ${
                        course.level === 'Beginner' ? 'bg-[#0694d1]/20 text-[#3AB6EB]' :
                        course.level === 'Intermediate' ? 'bg-[#076d9d]/20 text-[#6CCFEE]' :
                        'bg-[#076d9d] text-white'
                      }`}>{course.level}</span>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4" style={{ borderColor: 'rgba(6,148,209,0.15)' }}>
                <a href="#" className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7"/></svg>
                  Browse All Vendors
                </a>
                <a href="#" className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90" style={{ background: '#0694D1' }}>
                  Browse All {megaMenuVendor} Courses →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── Technologies Mega Menu ── */}
        {techMenuOpen && (
          <div
            ref={techMenuRef}
            className="absolute left-0 right-0 top-full z-[200] flex overflow-hidden"
            style={{ background: 'rgba(4,12,24,0.98)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(6,148,209,0.2)', borderTop: 'none', boxShadow: '0 24px 60px rgba(0,0,0,0.6)', maxHeight: '520px' }}
          >
            {/* Left — technology categories */}
            <div className="flex w-52 shrink-0 flex-col overflow-y-auto border-r" style={{ borderColor: 'rgba(6,148,209,0.15)', background: 'rgba(6,17,30,0.6)' }}>
              <div className="px-4 py-3 text-sm font-semibold uppercase tracking-widest" style={{ color: 'rgba(6,148,209,0.7)' }}>Technologies</div>
              {([
                { name: 'Cloud Computing',    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/> },
                { name: 'Cybersecurity',      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/> },
                { name: 'Networking',         icon: <><circle cx="12" cy="5" r="2" strokeWidth={1.8}/><circle cx="5" cy="19" r="2" strokeWidth={1.8}/><circle cx="19" cy="19" r="2" strokeWidth={1.8}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 7v4M8.5 17.5l3-2.5M15.5 17.5l-3-2.5"/></> },
                { name: 'Project Management', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/> },
                { name: 'Data & AI',          icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></> },
                { name: 'DevOps',             icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/> },
                { name: 'ERP Systems',        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/> },
                { name: 'Linux & Open Source',icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/> },
              ] as { name: string; icon: React.ReactNode }[]).map(({ name, icon }) => {
                const t = TOP_TECHNOLOGIES.find(x => x.name === name)!
                return (
                  <button
                    key={name}
                    onMouseEnter={() => setTechMenuCategory(name)}
                    onClick={() => setTechMenuCategory(name)}
                    className="flex items-center gap-3 px-4 py-2.5 text-left transition-all"
                    style={{
                      background: techMenuCategory === name ? 'rgba(6,148,209,0.12)' : 'transparent',
                      borderLeft: techMenuCategory === name ? '2px solid #0694D1' : '2px solid transparent',
                      color: techMenuCategory === name ? '#ffffff' : 'rgba(255,255,255,0.65)',
                    }}
                  >
                    <svg className="h-4 w-4 shrink-0" style={{ color: techMenuCategory === name ? '#38bdf8' : 'rgba(6,148,209,0.6)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">{icon}</svg>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium leading-tight">{name}</div>
                      <div className="text-sm" style={{ color: 'rgba(6,148,209,0.7)' }}>{t.count} Courses</div>
                    </div>
                    {techMenuCategory === name && (
                      <svg className="h-3.5 w-3.5 shrink-0" style={{ color: '#0694D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Right — courses panel */}
            <div className="flex flex-1 flex-col overflow-y-auto p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{techMenuCategory}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {TOP_TECHNOLOGIES.find(t => t.name === techMenuCategory)?.count} courses · Partners: {TOP_TECHNOLOGIES.find(t => t.name === techMenuCategory)?.partners.join(', ')}
                  </p>
                </div>
                <a href="#" className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-white" style={{ color: '#38bdf8' }}>
                  View all {techMenuCategory} courses
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                {(TECH_MENU_COURSES[techMenuCategory] ?? []).map((course, i) => (
                  <a
                    key={i}
                    href="#"
                    className="group flex flex-col gap-2 rounded-xl p-3.5 transition-all hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(6,148,209,0.15)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.35)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.15)'; }}
                  >
                    <p className="text-sm font-medium leading-snug text-white group-hover:text-[#38bdf8] transition-colors line-clamp-2">{course.name}</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-sm" style={{ color: 'rgba(6,148,209,0.8)' }}>{course.vendor}</span>
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
                      <span className="flex items-center gap-1 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        {course.days}d
                      </span>
                      <span className={`ml-auto rounded-full px-2 py-0.5 text-sm font-semibold ${course.level === 'Beginner' ? 'bg-[#0694d1]/20 text-[#3AB6EB]' : course.level === 'Intermediate' ? 'bg-[#076d9d]/20 text-[#6CCFEE]' : 'bg-[#076d9d] text-white'}`}>{course.level}</span>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t pt-4" style={{ borderColor: 'rgba(6,148,209,0.15)' }}>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Showing top courses for {techMenuCategory}</span>
                <a href="#" className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90" style={{ background: '#0694D1' }}>
                  Browse All {techMenuCategory} Courses →
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ════════════════════════════════════════════════════════
           EXISTING SECTIONS (unchanged)
      ════════════════════════════════════════════════════════ */}

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#E8F4FA] w-full px-4 md:px-8 lg:px-[50px] py-[30px] sm:py-[60px]">
        <div className="pointer-events-none absolute inset-0">
          {/* Falling pattern — Koenig blue streaks on hero bg */}
          <FallingPattern
            color="rgba(6,148,209,0.55)"
            backgroundColor="#E8F4FA"
            duration={120}
            blurIntensity="0.6em"
            density={1.2}
            className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#E8F4FA_80%)]"
          />
          <div className="ent-blob1 absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.08) 0%, transparent 65%)' }} />
          <div className="ent-blob2 absolute -right-32 bottom-0 h-[350px] w-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.06) 0%, transparent 70%)' }} />
          <div className="ent-blob3 absolute -left-20 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.05) 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10 lg:gap-12">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium" style={{ background: 'rgba(6,148,209,0.12)', border: '1px solid rgba(6,148,209,0.30)', color: '#0694d1' }}>
                <span className="h-2 w-2 rounded-full bg-[#0694D1]" />
                Enterprise Training Solutions
              </div>
              <h1 className="mb-5 font-bold leading-[1.15] tracking-tight text-[clamp(1.5rem,5vw,2.5rem)] lg:text-[clamp(1.4rem,2.4vw,2.6rem)] xl:text-[clamp(2rem,3vw,3.5rem)]" style={{ color: '#093148' }}>
                <span className="block">The Training Partner</span>
                <span className="ent-morph-gradient">Trusted by 1,000+ Global Enterprises</span>
              </h1>
              <p className="mb-8 max-w-xl text-base lg:text-lg" style={{ color: '#4a7a99' }}>
                Tailored IT certification programmes for enterprises across 195+ countries. From needs assessment to certified outcomes — Koenig handles everything, so your team stays focused on what matters.
              </p>
              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                <button onClick={() => setContactModalOpen(true)} className="ent-cta-btn rounded-xl px-7 py-3.5 text-base font-bold text-white">
                  Get a Free Consultation
                </button>
              </div>

              {/* Stats — all 4 in one row below the CTAs */}
              <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 w-full">
                {STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center rounded-xl px-2 py-2.5 text-center"
                    style={{
                      background: 'rgba(255,255,255,0.70)',
                      border: '1px solid rgba(6,148,209,0.22)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#093148" className="h-4 w-4 shrink-0">{s.icon}</svg>
                      <span className="text-base font-black leading-none" style={{ color: '#093148' }}>{s.num}</span>
                    </div>
                    <span className="mt-1 text-[10px] font-medium leading-tight" style={{ color: '#4a7a99' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — banner image card with floating vendor logos */}
            <div className="hidden shrink-0 lg:block">
              <div className="relative" style={{ width: '520px', padding: '36px' }}>

                <style>{`
                  @keyframes vFloat1 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
                  @keyframes vFloat2 { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-8px) rotate(-1deg)} }
                  @keyframes vFloat3 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(9px) translateX(3px)} }
                  @keyframes vFloat4 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(8px) rotate(1.5deg)} }
                  @keyframes vFloat5 { 0%,100%{transform:translateX(0) rotate(0deg)} 50%{transform:translateX(-8px) rotate(-2deg)} }
                  @keyframes vGlow   { 0%,100%{box-shadow:0 4px 18px rgba(6,109,157,0.22),inset 0 1px 0 rgba(255,255,255,0.18)} 50%{box-shadow:0 4px 28px rgba(6,148,209,0.50),0 0 16px rgba(58,182,235,0.30),inset 0 1px 0 rgba(255,255,255,0.28)} }
                `}</style>

                {/* Floating vendor logo cards */}
                {[
                  { src: '/images/top-six-vendors/Microsoft.png',        alt: 'Microsoft', pos: { top: 4,    left: 4    }, anim: 'vFloat1 3.4s ease-in-out infinite',          logoW: 68, logoH: 40 },
                  { src: '/images/top-six-vendors/amazon-authorized.png', alt: 'AWS',       pos: { top: 4,    right: 4   }, anim: 'vFloat2 3.8s ease-in-out infinite 0.5s',     logoW: 68, logoH: 40 },
                  { src: '/images/top-six-vendors/Cisco.png',             alt: 'Cisco',     pos: { bottom: 4, left: 4    }, anim: 'vFloat3 4.0s ease-in-out infinite 1.0s',     logoW: 68, logoH: 40 },
                  { src: '/images/top-six-vendors/oracle.png',            alt: 'Oracle',    pos: { bottom: 4, right: 4   }, anim: 'vFloat4 3.6s ease-in-out infinite 1.5s',     logoW: 108, logoH: 64 },
                  { src: '/images/top-six-vendors/VMware-Broadcom.png',   alt: 'VMware',    pos: { top: 'calc(50% - 30px)', right: -4 }, anim: 'vFloat5 3.2s ease-in-out infinite 2.0s', logoW: 68, logoH: 40 },
                ].map(({ src, alt, pos, anim, logoW, logoH }) => (
                  <div
                    key={alt}
                    className="absolute flex items-center justify-center rounded-xl p-2"
                    style={{
                      ...pos,
                      width: 68,
                      height: 50,
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(6,148,209,0.25)',
                      boxShadow: '0 4px 18px rgba(6,109,157,0.22), inset 0 1px 0 rgba(255,255,255,0.9)',
                      animation: `${anim}, vGlow 3s ease-in-out infinite`,
                      zIndex: 10,
                    }}
                  >
                    <Image src={src} alt={alt} width={logoW} height={logoH} className="object-contain w-full h-full" />
                  </div>
                ))}

                {/* Main image card */}
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{
                    background: 'rgba(6,25,45,0.52)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1.5px solid rgba(6,148,209,0.55)',
                    boxShadow: '0 0 0 4px rgba(6,148,209,0.08), 0 0 30px 6px rgba(6,148,209,0.25), 0 0 60px 12px rgba(58,182,235,0.12), 0 8px 40px rgba(6,109,157,0.28), inset 0 1px 0 rgba(58,182,235,0.18)',
                  }}
                >
                  <Image
                    src="/images/banner-enterprise2.png"
                    alt="Enterprise Training"
                    width={448}
                    height={440}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           NEW SECTION 1 — Trusted by Global Enterprises (WHITE)
           Inspired by Simplilearn's client marquee strip
      ════════════════════════════════════════════════════════ */}
      <section className="bg-white relative overflow-hidden px-4 md:px-8 lg:px-[50px] py-5 sm:py-[40px]">

        {/* ── Brand glow effect system ── */}
        <style>{`
          @keyframes glowPulse1 { 0%,100%{opacity:0.45;transform:scale(1) translate(0,0)} 50%{opacity:0.75;transform:scale(1.18) translate(-12px,10px)} }
          @keyframes glowPulse2 { 0%,100%{opacity:0.35;transform:scale(1) translate(0,0)} 50%{opacity:0.60;transform:scale(1.22) translate(10px,-14px)} }
          @keyframes glowPulse3 { 0%,100%{opacity:0.25;transform:scale(1) translate(0,0)} 50%{opacity:0.50;transform:scale(1.15) translate(-8px,8px)} }
          @keyframes glowSweep  { 0%{transform:translateX(-120%) skewX(-20deg)} 100%{transform:translateX(260%) skewX(-20deg)} }
          @keyframes twSlide { 0%,100%{transform:translateX(0)} 50%{transform:translateX(10px)} }
          @keyframes borderSpin { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
          .tw-glow-border {
            position:absolute;inset:-2px;border-radius:20px;z-index:0;
            background: linear-gradient(120deg, #0694D1, #4DBFEF, #076D9D, #38bdf8, #093148, #0694D1);
            background-size: 300% 300%;
            animation: borderSpin 5s ease infinite;
            padding: 2px;
          }
          .tw-glow-border-inner { background:#fff; border-radius:18px; width:100%; height:100%; }
          .tw-sweep { position:absolute;inset:0;overflow:hidden;border-radius:18px;pointer-events:none;z-index:1; }
          .tw-sweep::after { content:'';position:absolute;top:0;left:0;height:100%;width:30%;background:linear-gradient(90deg,transparent,rgba(6,148,209,0.06),transparent);animation:glowSweep 6s ease-in-out infinite; }
          .award-card-icon { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease; }
          .award-card:hover .award-card-icon { transform: scale(1.18) rotate(-4deg); box-shadow: 0 6px 18px rgba(6,148,209,0.22); }
          @keyframes ent-shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
          .ent-shimmer-text { background: linear-gradient(90deg, #076D9D 0%, #0694D1 25%, #38bdf8 50%, #0694D1 75%, #076D9D 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: ent-shimmer 2.8s linear infinite; }
        `}</style>

        {/* Section bg glow orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Corners */}
          <div style={{ position:'absolute', top:-80, left:-80, width:340, height:340, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,148,209,0.38) 0%, transparent 70%)', animation:'glowPulse1 7s ease-in-out infinite' }} />
          <div style={{ position:'absolute', top:-60, right:-100, width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle, rgba(77,191,239,0.30) 0%, transparent 70%)', animation:'glowPulse2 9s ease-in-out infinite' }} />
          <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(7,109,157,0.28) 0%, transparent 70%)', animation:'glowPulse3 11s ease-in-out infinite' }} />
          <div style={{ position:'absolute', bottom:-60, right:-60, width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,148,209,0.30) 0%, transparent 70%)', animation:'glowPulse1 8s ease-in-out 2s infinite' }} />
          {/* Centre bloom */}
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,148,209,0.14) 0%, rgba(56,189,248,0.08) 40%, transparent 70%)', animation:'glowPulse3 13s ease-in-out infinite' }} />
          {/* Very mild green near title area (top-left) only */}
          <div style={{ position:'absolute', top:10, left:'15%', width:220, height:220, borderRadius:'50%', background:'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)', animation:'glowPulse2 12s ease-in-out 2s infinite' }} />
        </div>

        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] relative z-10">
          <div className="io-fade mb-[15px] sm:mb-10 flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between lg:justify-between">
            {/* Left — heading */}
            <div className="relative text-center lg:text-left">
              {/* Title glow orbs */}
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:360, height:180, borderRadius:'50%', background:'radial-gradient(ellipse, rgba(6,148,209,0.13) 0%, rgba(77,191,239,0.07) 45%, transparent 70%)', filter:'blur(18px)', pointerEvents:'none', zIndex:0 }} />
              <div style={{ position:'absolute', top:'30%', left:'10%', width:160, height:100, borderRadius:'50%', background:'radial-gradient(ellipse, rgba(56,189,248,0.09) 0%, transparent 70%)', filter:'blur(12px)', pointerEvents:'none', zIndex:0 }} />
              <div className="relative z-10">
                <p className="mb-1.5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#0694D1', animation: 'twSlide 3s ease-in-out infinite' }}>
                  <span style={{ display:'inline-block', width:20, height:2, borderRadius:2, background:'#0694D1', flexShrink:0 }} />
                  Trusted Worldwide
                </p>
                <h2 className="text-2xl font-bold lg:text-3xl" style={{ color: '#093148' }}>
                  Training <span className="ent-dark-grad-text">Fortune 500 </span><span className="ent-shimmer-text">Companies</span><span className="ent-dark-grad-text"> & Global Enterprises</span>
                </h2>
                <p className="mt-2 text-sm" style={{ color: '#4a7a9b' }}>From startups to multinationals — 1,000+ organisations choose Koenig for their workforce upskilling.</p>
              </div>
            </div>
            {/* Right — Score card */}
            <div className="shrink-0 rounded-2xl px-8 py-5 text-center" style={{ background: '#fff', border: '1.5px solid #CAEFFF', boxShadow: '0 0 22px 6px rgba(6,148,209,0.10), 0 4px 16px rgba(6,148,209,0.07)', minWidth: 180 }}>
              <div className="leading-none" style={{ fontSize: 56, fontWeight: 900, color: '#093148' }}>
                4.9<span style={{ fontSize: 26, fontWeight: 600, color: '#64748b' }}>/5</span>
              </div>
              <div className="mt-2 flex justify-center gap-0.5">
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#f59e0b', fontSize: 20 }}>★</span>)}
              </div>
              <p className="mt-1.5 text-sm font-medium" style={{ color: '#64748b' }}>Avg. client satisfaction</p>
            </div>
          </div>
        </div>
        <ClientLogoMarquee clients={ENTERPRISE_CLIENTS} />
        {/* Award cards */}
        <div className="mx-auto mt-10 max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {([
              {
                accent: 'linear-gradient(90deg,#0694D1,#4DBFEF)', iconBg: 'rgba(6,148,209,0.10)',
                iconEl: <img src="/images/partners/microsoft-cloud-t.png" alt="Microsoft" style={{ width: 44, height: 44, objectFit: 'contain' }} />,
                stat: '#1', title: 'Microsoft Partner Award', sub: 'Training Services Partner of the Year 2025', bottom: 'Active partner',
              },
              {
                accent: 'linear-gradient(90deg,#0694D1,#076D9D)', iconBg: 'rgba(7,109,157,0.10)',
                iconEl: <img src="/images/awards/Certified-as-great-place-to-work.webp" alt="Great Place to Work" style={{ width: 44, height: 44, objectFit: 'contain' }} />,
                stat: '14+', title: 'Great Place to Work', sub: 'Certified consecutively since 2011', bottom: 'Certified active',
              },
              {
                accent: 'linear-gradient(90deg,#38bdf8,#0694D1)', iconBg: 'rgba(56,189,248,0.10)',
                iconEl: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                ),
                stat: '195+', title: 'Countries Served', sub: 'Global delivery across every continent', bottom: 'Live sessions daily',
              },
              {
                accent: 'linear-gradient(90deg,#076D9D,#093148)', iconBg: 'rgba(9,49,72,0.10)',
                iconEl: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#076D9D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
                  </svg>
                ),
                stat: '1,000+', title: 'Enterprise Clients', sub: 'Fortune 500s to fast-growing scale-ups', bottom: 'Growing network',
              },
            ] as const).map((c, i) => (
              <div
                key={i}
                className="io-fade award-card rounded-xl overflow-hidden transition-all duration-200"
                style={{ border: '1px solid #CAEFFF', background: '#ffffff', boxShadow: '0 4px 20px rgba(6,148,209,0.10)', cursor: 'default' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(6,148,209,0.18)'; (e.currentTarget as HTMLDivElement).style.background = '#f5fbff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(6,148,209,0.10)'; (e.currentTarget as HTMLDivElement).style.background = '#ffffff'; }}
              >
                <div style={{ height: 3, background: c.accent }} />
                <div className="p-5" style={{ background: 'linear-gradient(160deg, rgba(240,250,255,0.7) 0%, rgba(255,255,255,1) 60%)' }}>
                  <div className="award-card-icon" style={{ width: 60, height: 60, borderRadius: 14, background: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>{c.iconEl}</div>
                  <div className="text-2xl font-black leading-none" style={{ color: '#093148' }}>{c.stat}</div>
                  <div className="mt-1 text-sm font-bold" style={{ color: '#093148' }}>{c.title}</div>
                  <div className="mt-0.5 text-xs" style={{ color: '#4a7a9b' }}>{c.sub}</div>
                  <div className="mt-3 flex items-center gap-1.5">
                    <span className="relative inline-flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22c55e' }} />
                      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#22c55e' }} />
                    </span>
                    <span className="text-[11px] font-semibold" style={{ color: '#076D9D' }}>{c.bottom}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADDE Framework ── */}
      <section className="relative overflow-hidden py-5 sm:py-[40px] px-4 md:px-8 lg:px-[50px]" style={{ background: '#0d1b2a' }}>
        <style>{`
          @keyframes circlePulse { 0%,100%{box-shadow:0 0 0 0 rgba(19,168,212,.3)} 50%{box-shadow:0 0 0 8px rgba(19,168,212,.07),0 0 18px rgba(19,168,212,.22)} }
          @keyframes spinRing { to{transform:rotate(360deg)} }
          .adde-card .icon-circle { width:54px;height:54px;border-radius:50%;background:rgba(19,168,212,.08);border:1.5px solid rgba(19,168,212,.35);display:flex;align-items:center;justify-content:center;position:relative;animation:circlePulse 3s ease-in-out infinite; }
          .adde-card:nth-child(1) .icon-circle{animation-delay:0s}
          .adde-card:nth-child(2) .icon-circle{animation-delay:.6s}
          .adde-card:nth-child(3) .icon-circle{animation-delay:1.2s}
          .adde-card:nth-child(4) .icon-circle{animation-delay:1.8s}
          .adde-card .spin-ring { position:absolute;inset:-7px;border-radius:50%;border:1px dashed rgba(19,168,212,.25);animation:spinRing 8s linear infinite; }
          .adde-card .spin-ring::after { content:'';position:absolute;inset:-5px;border-radius:50%;border:1px dashed rgba(19,168,212,.10);animation:spinRing 13s linear infinite reverse; }
          .adde-card:hover .icon-circle { background:rgba(19,168,212,.16);border-color:#13a8d4;box-shadow:0 0 0 6px rgba(19,168,212,.10),0 0 24px rgba(19,168,212,.35); }
          .adde-card:hover .icon-circle svg { stroke:#fff;transform:scale(1.1); }
          .adde-card .icon-circle svg { transition:stroke .25s,transform .25s; }
          @keyframes arrowDot { 0%{left:2px;opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{left:calc(100% - 8px);opacity:0} }
          @keyframes arrowChevron { 0%,100%{opacity:.3;transform:translateX(-3px)} 50%{opacity:1;transform:translateX(3px)} }
          @keyframes arrowDotV { 0%{top:2px;opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{top:calc(100% - 8px);opacity:0} }
          @keyframes arrowChevronV { 0%,100%{opacity:.3;transform:translateY(-3px)} 50%{opacity:1;transform:translateY(3px)} }
          .adde-conn-h { display:none;align-items:center;justify-content:center;flex-direction:column;gap:4px;width:32px;flex-shrink:0;align-self:center; }
          @media(min-width:1024px){.adde-conn-h{display:flex}}
          .adde-conn-v { display:flex;align-items:center;justify-content:center;flex-direction:column;gap:4px;height:28px;width:100%; }
          @media(min-width:640px){.adde-conn-v{display:none}}
          .adde-tline-h { position:relative;width:100%;height:2px;border-radius:2px;background:linear-gradient(90deg,rgba(19,168,212,.1),rgba(19,168,212,.55),rgba(19,168,212,.1));overflow:hidden; }
          .adde-tline-h::after { content:'';position:absolute;top:50%;transform:translateY(-50%);width:8px;height:8px;border-radius:50%;background:#13a8d4;box-shadow:0 0 8px #13a8d4;animation:arrowDot 1.8s ease-in-out infinite; }
          .adde-chev-row { display:flex;gap:3px;animation:arrowChevron 1.8s ease-in-out infinite; }
          .adde-chev { width:8px;height:8px;border-top:2px solid #13a8d4;border-right:2px solid #13a8d4;transform:rotate(45deg); }
          .adde-chev:nth-child(1){opacity:.3}.adde-chev:nth-child(2){opacity:.6}.adde-chev:nth-child(3){opacity:1}
          .adde-tline-v { position:relative;height:100%;width:2px;border-radius:2px;background:linear-gradient(180deg,rgba(19,168,212,.1),rgba(19,168,212,.55),rgba(19,168,212,.1));overflow:hidden; }
          .adde-tline-v::after { content:'';position:absolute;left:50%;transform:translateX(-50%);width:8px;height:8px;border-radius:50%;background:#13a8d4;box-shadow:0 0 8px #13a8d4;animation:arrowDotV 1.8s ease-in-out infinite; }
          .adde-chev-col { display:flex;flex-direction:column;gap:3px;animation:arrowChevronV 1.8s ease-in-out infinite; }
          .adde-chev-v { width:8px;height:8px;border-bottom:2px solid #13a8d4;border-right:2px solid #13a8d4;transform:rotate(45deg); }
          .adde-chev-v:nth-child(1){opacity:.3}.adde-chev-v:nth-child(2){opacity:.6}.adde-chev-v:nth-child(3){opacity:1}
        `}</style>
        <canvas ref={addeCanvasRef} className="absolute inset-0 w-full h-full" style={{ display:'block' }} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#13a8d4' }}>Our Methodology</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">The Koenig <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">A.D.D.E.</span> Framework</h2>
            <p className="mt-3 text-white/50">A structured 4-step approach that ensures every enterprise training programme delivers measurable results.</p>
          </div>
          {/* Desktop: flex row with connectors between. Mobile: flex col */}
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-0">
            {APPROACH.map((a, i) => {
              const letter = ['A','D','D','E'][i]
              return (
                <div key={a.step} className="flex flex-col lg:flex-row lg:items-stretch flex-1 min-w-0">
                  {/* Card */}
                  <div className="adde-card relative overflow-hidden rounded-2xl p-6 pb-8 transition-all duration-300 flex-1" style={{ background: 'rgba(19,168,212,0.05)', border: '1px solid rgba(19,168,212,0.18)', backdropFilter:'blur(6px)' }}>
                    <div aria-hidden className="pointer-events-none absolute bottom-2 right-3 select-none font-black leading-none" style={{ fontSize: 120, color: 'rgba(19,168,212,0.07)', lineHeight:1 }}>{letter}</div>
                    <div className="mb-5 flex items-center gap-4 relative z-10">
                      <div className="relative shrink-0">
                        <div className="spin-ring" />
                        <div className="icon-circle">
                          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#13a8d4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{a.icon}</svg>
                        </div>
                      </div>
                      <span className="text-2xl font-black" style={{ color: 'rgba(19,168,212,0.35)' }}>{a.step}</span>
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-white relative z-10">{a.title}</h3>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider relative z-10" style={{ color: '#13a8d4' }}>{a.sub}</p>
                    <p className="text-sm leading-relaxed text-white/55 relative z-10">{a.desc}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, #13a8d4 40%, #38bdf8 60%, transparent)' }} />
                  </div>
                  {/* Connector — horizontal on desktop, vertical on mobile */}
                  {i < APPROACH.length - 1 && (
                    <>
                      {/* Desktop horizontal */}
                      <div className="adde-conn-h px-1" style={{ animationDelay:`${i*.4}s` }}>
                        <div className="adde-tline-h w-full" />
                        <div className="adde-chev-row" style={{ animationDelay:`${i*.4}s` }}>
                          <div className="adde-chev"/><div className="adde-chev"/><div className="adde-chev"/>
                        </div>
                      </div>
                      {/* Mobile vertical */}
                      <div className="adde-conn-v py-1 lg:hidden" style={{ animationDelay:`${i*.4}s` }}>
                        <div className="adde-tline-v h-full" />
                        <div className="adde-chev-col" style={{ animationDelay:`${i*.4}s` }}>
                          <div className="adde-chev-v"/><div className="adde-chev-v"/><div className="adde-chev-v"/>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>


      {/* Section divider */}
      <div className="relative h-px overflow-visible" style={{ background: 'linear-gradient(90deg,transparent 0%,rgba(19,168,212,.35) 30%,rgba(56,189,248,.55) 50%,rgba(19,168,212,.35) 70%,transparent 100%)' }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full" style={{ background:'#13a8d4', boxShadow:'0 0 10px 3px rgba(19,168,212,.6)' }} />
      </div>

      {/* ════════════════════════════════════════════════════════
           NEW SECTION 2 — Industries We Serve (DARK NAVY)
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-5 sm:py-[40px] px-4 md:px-8 lg:px-[50px]" style={{ background: '#07121e' }}>
        <AuroraCanvas />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="io-fade mb-[15px] sm:mb-12 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#38bdf8' }}>Sector Expertise</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">Industries We{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Specialise In</span>
                <style>{`
                  @keyframes lineExpand { 0%{width:0;opacity:0} 60%{opacity:1} 100%{width:100%;opacity:1} }
                  @keyframes lineSweep { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
                  .si-underline { position:absolute;bottom:-4px;left:0;height:2px;border-radius:2px;width:0;animation:lineExpand 1s cubic-bezier(.4,0,.2,1) 0.3s forwards; background:linear-gradient(90deg,#0694D1,#38bdf8,#0694D1); background-size:200% auto; }
                  .si-underline-sweep { position:absolute;bottom:-4px;left:0;height:2px;border-radius:2px;width:100%;background:linear-gradient(90deg,#0694D1 0%,#38bdf8 50%,#0694D1 100%);background-size:200% auto;animation:lineSweep 2.5s linear infinite; opacity:0; animation-delay:1.3s; }
                  @keyframes siDotPing { 0%{transform:translateX(-50%) scale(1);opacity:.9} 100%{transform:translateX(-50%) scale(2.5);opacity:0} }
                  .si-dot { position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);width:6px;height:6px;border-radius:50%;background:#38bdf8;box-shadow:0 0 8px #38bdf8; animation:siDotPing 1.5s ease-out 1.1s infinite; }
                `}</style>
                <span className="si-underline" />
                <span className="si-underline-sweep" style={{ animationFillMode:'forwards' }} />
                <span className="si-dot" />
              </span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-base text-white/55">Deep domain knowledge across the sectors that depend most on certified IT expertise — delivered with precision, at scale.</p>
          </div>
          <style>{`
            @keyframes indIconPulse { 0%,100%{box-shadow:0 0 0 0 rgba(19,168,212,.25)} 50%{box-shadow:0 0 0 7px rgba(19,168,212,.06),0 0 16px rgba(19,168,212,.18)} }
            @keyframes indCardIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
            .ind-card { position:relative;overflow:hidden;border-radius:18px;padding:28px;cursor:default;
              background:linear-gradient(145deg,rgba(13,32,53,.92) 0%,rgba(10,22,40,.96) 60%,rgba(11,37,69,.88) 100%);
              border:1px solid rgba(19,168,212,.18);
              transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease,border-color .35s ease;
              opacity:0; }
            .ind-card.ind-visible { animation:indCardIn .55s cubic-bezier(.22,1,.36,1) forwards; }
            .ind-card:hover { transform:translateY(-7px); border-color:rgba(19,168,212,.55); box-shadow:0 0 0 1px rgba(19,168,212,.2),0 16px 40px rgba(0,0,0,.4),0 0 32px rgba(19,168,212,.12); }
            /* Radial flood from top on hover */
            .ind-card::before { content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:280px;height:220px;border-radius:50%;
              background:radial-gradient(ellipse,rgba(19,168,212,.13) 0%,transparent 70%);
              opacity:0;transition:opacity .4s ease;pointer-events:none; }
            .ind-card:hover::before { opacity:1; }
            /* Top accent line slides in from centre */
            .ind-accent { position:absolute;top:0;left:50%;transform:translateX(-50%);height:2.5px;width:0;border-radius:2px;
              background:linear-gradient(90deg,transparent,#13a8d4,#38bdf8,#13a8d4,transparent);
              transition:width .45s cubic-bezier(.22,1,.36,1);pointer-events:none; }
            .ind-card:hover .ind-accent { width:100%; }
            /* ── Icon draw-in ── */
            @keyframes indDraw { from{stroke-dashoffset:500} to{stroke-dashoffset:0} }
            /* ── Icon float ── */
            @keyframes indFloat { from{transform:translateY(0px)} to{transform:translateY(-5px)} }
            /* ── Hover shake/bounce ── */
            @keyframes indShake { 0%{transform:translateY(var(--fy,0px)) rotate(0deg) scale(1)} 15%{transform:translateY(var(--fy,0px)) rotate(-6deg) scale(1.06)} 30%{transform:translateY(var(--fy,0px)) rotate(5deg) scale(1.1)} 45%{transform:translateY(var(--fy,0px)) rotate(-3deg) scale(1.08)} 60%{transform:translateY(var(--fy,0px)) rotate(2deg) scale(1.09)} 75%{transform:translateY(var(--fy,0px)) rotate(-1deg) scale(1.1)} 100%{transform:translateY(var(--fy,0px)) rotate(-3deg) scale(1.08)} }
            /* Icon box */
            .ind-icon-box { width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;
              background:rgba(19,168,212,.08);border:1px solid rgba(19,168,212,.28);
              animation:indIconPulse 3s ease-in-out infinite;
              transition:background .3s,border-color .3s; }
            .ind-card:hover .ind-icon-box { background:rgba(19,168,212,.22);border-color:#13a8d4; }
            /* SVG wrapper handles float + hover shake */
            .ind-icon-svg { display:flex;align-items:center;justify-content:center;
              animation:indFloat 3s ease-in-out infinite alternate; }
            .ind-card:hover .ind-icon-svg { animation:indShake .55s cubic-bezier(.36,.07,.19,.97) both; }
            /* Path draw-in + stroke colour transition */
            .ind-icon-svg svg path, .ind-icon-svg svg circle, .ind-icon-svg svg line, .ind-icon-svg svg polyline, .ind-icon-svg svg rect {
              stroke-dasharray:500;
              stroke-dashoffset:500;
              stroke:#13a8d4;
              transition:stroke .3s ease; }
            .ind-card.ind-visible .ind-icon-svg svg path,
            .ind-card.ind-visible .ind-icon-svg svg circle,
            .ind-card.ind-visible .ind-icon-svg svg line,
            .ind-card.ind-visible .ind-icon-svg svg polyline,
            .ind-card.ind-visible .ind-icon-svg svg rect { animation:indDraw 1.2s ease-in-out var(--draw-delay,0s) forwards; }
            .ind-card:hover .ind-icon-svg svg path,
            .ind-card:hover .ind-icon-svg svg circle,
            .ind-card:hover .ind-icon-svg svg line,
            .ind-card:hover .ind-icon-svg svg polyline,
            .ind-card:hover .ind-icon-svg svg rect { stroke:#fff; }
            /* Divider */
            .ind-divider { height:1px;background:rgba(19,168,212,.18);border-radius:1px;margin:12px 0;width:40px;transition:width .4s cubic-bezier(.22,1,.36,1); }
            .ind-card:hover .ind-divider { width:100%; }
            /* Ghost number */
            .ind-ghost { position:absolute;bottom:8px;right:14px;font-size:88px;font-weight:900;line-height:1;
              color:rgba(19,168,212,.045);letter-spacing:-4px;pointer-events:none;select:none;
              transition:transform .4s ease,color .4s ease; }
            .ind-card:hover .ind-ghost { transform:translateY(-4px);color:rgba(19,168,212,.08); }
            /* Tags */
            .ind-tag { border-radius:100px;padding:3px 10px;font-size:11px;font-weight:600;
              background:rgba(19,168,212,.10);color:rgba(19,168,212,.7);border:1px solid rgba(19,168,212,.2);
              transition:background .3s,color .3s,border-color .3s; }
            .ind-card:hover .ind-tag { background:rgba(19,168,212,.22);color:#7de8ff;border-color:rgba(19,168,212,.45); }
          `}</style>
          <IndustryMobileCarousel />
          <div className="hidden sm:grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <div
                key={i}
                className="ind-card"
                style={{ animationDelay: `${i * 0.1}s` }}
                ref={(el) => {
                  if (!el) return
                  const obs = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) { el.classList.add('ind-visible'); obs.disconnect() }
                  }, { threshold: 0.12 })
                  obs.observe(el)
                }}
              >
                {/* Top accent line */}
                <div className="ind-accent" />
                {/* Icon */}
                <div className="ind-icon-box mb-4" style={{ animationDelay: `${i * 0.6}s` }}>
                  <div className="ind-icon-svg" style={{ animationDelay: `${i * 0.4}s`, ['--fy' as string]: `${i % 2 === 0 ? '0px' : '-2px'}`, ['--draw-delay' as string]: `${i * 0.15}s` } as React.CSSProperties}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ overflow:'visible' }}>{ind.icon}</svg>
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-base font-bold text-white">{ind.name}</h3>
                {/* Expanding divider */}
                <div className="ind-divider" />
                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.52)' }}>{ind.desc}</p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {ind.tags.map(tag => (
                    <span key={tag} className="ind-tag">{tag}</span>
                  ))}
                </div>
                {/* Ghost step number */}
                <div className="ind-ghost" aria-hidden>{String(i + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Train ── */}
      <section className="relative px-4 md:px-8 lg:px-[50px] py-5 sm:py-16" style={{ background: '#e8f0f8', fontFamily: 'Segoe UI, system-ui, sans-serif' }}>
        {(() => {
          const d = CAT_DOMAINS[activeDomain]
          const allCourses = d.courses
          const allLevels = Array.from(new Set(allCourses.map(c => c.level)))
          const LEVELS = ['All', 'Popular', ...allLevels]
          const levelCount = (lv: string) => lv === 'All' ? allCourses.length : lv === 'Popular' ? allCourses.filter(c => (c as {popular?: boolean}).popular).length : allCourses.filter(c => c.level === lv).length
          const searched = catSearch.trim()
            ? allCourses.filter(c => c.title.toLowerCase().includes(catSearch.toLowerCase()) || c.code.toLowerCase().includes(catSearch.toLowerCase()))
            : allCourses
          const filtered = catLevel === 'All' ? searched : catLevel === 'Popular' ? searched.filter(c => (c as {popular?: boolean}).popular) : searched.filter(c => c.level === catLevel)
          const sorted = [...filtered].sort((a, b) => {
            const pa = parseFloat(String(a.price).replace(/[^0-9.]/g, ''))
            const pb = parseFloat(String(b.price).replace(/[^0-9.]/g, ''))
            return catSort === 'high-low' ? pb - pa : catSort === 'low-high' ? pa - pb : catSort === 'dur-asc' ? a.days - b.days : catSort === 'dur-desc' ? b.days - a.days : 0
          })
          const LCAT: Record<string, { bg: string; color: string }> = {
            Fundamentals: { bg: '#d0f4f2', color: '#007b83' },
            Associate:    { bg: '#dbeeff', color: '#0d87c8' },
            Expert:       { bg: '#ffebd6', color: '#c05a00' },
          }
          return (
            <div className="mx-auto max-w-7xl">
              {/* Section heading */}
              <div className="io-fade mb-7 text-center">
                <span className="mb-2 inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ background: 'rgba(13,135,200,0.10)', color: '#0d87c8' }}>Enterprise Training</span>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: '#0a1929' }}>
                  Explore Our <span className="bg-gradient-to-r from-[#0d87c8] to-[#38bdf8] bg-clip-text text-transparent">Courses</span>
                </h2>
              </div>

              {/* Main floating card */}
              <div className="io-fade delay-1 flex overflow-hidden" style={{ borderRadius: 16, boxShadow: '0 4px 32px rgba(13,135,200,0.13)', border: '1px solid #dde8f2', background: '#fff', minHeight: 640 }}>

                {/* Left Sidebar */}
                <div className="hidden sm:flex flex-col shrink-0 bg-white" style={{ width: 'clamp(160px, 18vw, 210px)', borderRight: '1px solid #e4edf5' }}>
                  <div className="px-4 pt-5 pb-2" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9aabb8' }}>Technologies</div>
                  <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d0e8f5 transparent' }}>
                    {CAT_DOMAINS.map((cat, i) => {
                      const active = activeDomain === i
                      return (
                        <button key={i}
                          onClick={() => { setActiveDomain(i); setCatLevel('All'); setFlippedCard(null); setDescExpanded(false) }}
                          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px 9px 0', borderLeft: active ? '3px solid #0d87c8' : '3px solid transparent', background: active ? '#e6f4fb' : 'transparent', cursor: 'pointer', transition: 'background 0.15s' }}
                          onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = '#f2f9fd' }}
                          onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, marginLeft: 11, flexShrink: 0, color: active ? '#0d87c8' : '#5a8ba8' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{cat.icon}</svg>
                          </span>
                          <span style={{ flex: 1, fontSize: 13, fontWeight: active ? 700 : 500, color: active ? '#0970a8' : '#1a3a4a', lineHeight: 1.3, textAlign: 'left' }}>{cat.name}</span>
                          <span style={{ flexShrink: 0, marginRight: 10, borderRadius: 999, padding: '1px 7px', fontSize: 11, fontWeight: 700, background: active ? '#0d87c8' : '#dff0fb', color: active ? '#fff' : '#0d87c8' }}>{cat.courses.length}</span>
                        </button>
                      )
                    })}
                  </div>
                  {/* Bottom buttons */}
                  <div style={{ padding: 12, borderTop: '1px solid #e4edf5', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <a href="#contact"
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 10, border: '1.5px solid #0d87c8', padding: '9px 0', fontSize: 13, fontWeight: 600, color: '#0d87c8', background: 'transparent', cursor: 'pointer', textDecoration: 'none', transition: 'background 0.15s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#dff0fb' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                      Download Brochure
                    </a>
                    <a href="#contact"
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 10, border: 'none', padding: '9px 0', fontSize: 13, fontWeight: 600, color: '#fff', background: '#0d87c8', cursor: 'pointer', textDecoration: 'none', transition: 'background 0.15s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#0970a8' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#0d87c8' }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                      Enquire Now
                    </a>
                  </div>
                </div>

                {/* Right panel */}
                <div className="flex-1 flex flex-col overflow-hidden">

                  {/* Mobile category scroll */}
                  <div className="sm:hidden relative" style={{ borderBottom: '1px solid #e4edf5' }}>
                    <div className="overflow-x-auto flex gap-2 px-4 py-3 [&::-webkit-scrollbar]:hidden">
                      {CAT_DOMAINS.map((cat, i) => (
                        <button key={i} onClick={() => { setActiveDomain(i); setCatLevel('All'); setFlippedCard(null); setDescExpanded(false) }}
                          style={{ flexShrink: 0, borderRadius: 999, padding: '5px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', background: activeDomain === i ? '#0d87c8' : '#e6f4fb', color: activeDomain === i ? '#fff' : '#0d87c8', border: 'none' }}>
                          {cat.name}
                        </button>
                      ))}
                    </div>
                    {/* Right fade + arrow hint */}
                    <div style={{ pointerEvents: 'none', position: 'absolute', right: 0, top: 0, bottom: 0, width: 48, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.95))', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 6 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d87c8" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  </div>

                  {/* Tech header */}
                  {/* Mobile layout */}
                  <div className="sm:hidden flex flex-col gap-2 px-5 py-4" style={{ borderBottom: '1px solid #e4edf5' }}>
                    <div className="flex items-center gap-3">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 10, background: '#e0f2fb', flexShrink: 0, color: '#0d87c8' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{d.icon}</svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0, fontSize: 17, fontWeight: 700, color: '#0a1929', lineHeight: 1.2 }}>{d.name}</div>
                      <a href="#contact" style={{ flexShrink: 0, borderRadius: 9, border: 'none', padding: '7px 14px', fontSize: 12, fontWeight: 600, color: '#fff', background: '#0d87c8', cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        Enquire Now →
                      </a>
                    </div>
                    <div style={{ fontSize: 12.5, color: '#6b8fa8', lineHeight: 1.55 }}>
                      <span className={descExpanded ? '' : 'line-clamp-2'}>{d.desc}</span>
                      <button onClick={() => setDescExpanded(v => !v)} style={{ marginLeft: 4, fontSize: 11, fontWeight: 600, color: '#0d87c8', background: 'none', border: 'none', padding: 0, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        {descExpanded ? 'less ↑' : 'more ↓'}
                      </button>
                    </div>
                  </div>
                  {/* Desktop layout: icon | name | desc | button all in one row */}
                  <div className="hidden sm:flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid #e4edf5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 10, background: '#e0f2fb', flexShrink: 0, color: '#0d87c8' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{d.icon}</svg>
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#0a1929', lineHeight: 1.2, flexShrink: 0 }}>{d.name}</div>
                    <div style={{ flex: 1, minWidth: 0, fontSize: 12.5, color: '#6b8fa8', lineHeight: 1.45 }}>{d.desc}</div>
                    <a href="#contact"
                      style={{ flexShrink: 0, borderRadius: 9, border: 'none', padding: '8px 18px', fontSize: 13, fontWeight: 600, color: '#fff', background: '#0d87c8', cursor: 'pointer', textDecoration: 'none', transition: 'background 0.15s', whiteSpace: 'nowrap' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#0970a8' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#0d87c8' }}>
                      Enquire Now →
                    </a>
                  </div>

                  {/* Filter bar — column on mobile, row on desktop */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 px-4 py-2.5" style={{ borderBottom: '1px solid #e4edf5', background: '#fff' }}>
                    {/* Search — full width on mobile */}
                    <div style={{ position: 'relative' }}>
                      <svg style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', width: 13, height: 13, color: '#9aabb8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                      <input type="text" placeholder="Search courses..."
                        value={catSearch} onChange={e => setCatSearch(e.target.value)}
                        style={{ width: '100%', borderRadius: 8, border: '1px solid #d1dce8', padding: '7px 26px 7px 26px', fontSize: 12, color: '#1a3a4a', outline: 'none', background: '#fff', boxSizing: 'border-box' }} />
                      {catSearch && (
                        <button onClick={() => setCatSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: '#9aabb8' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#4a6278' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#9aabb8' }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      )}
                    </div>
                    {/* Level pills — scrollable on mobile, wrapped on desktop */}
                    <div className="relative min-w-0">
                      <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap sm:overflow-x-visible" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', paddingRight: 36 } as React.CSSProperties}>
                        {LEVELS.map(lv => {
                          const cnt = levelCount(lv)
                          if (cnt === 0 && lv !== 'All') return null
                          const active = catLevel === lv
                          return (
                            <button key={lv} onClick={() => setCatLevel(lv)}
                              style={{ borderRadius: 999, padding: '4px 8px 4px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s', display: 'inline-flex', alignItems: 'center', gap: 5, flexShrink: 0, background: active ? '#0d87c8' : '#fff', color: active ? '#fff' : '#4a6278', border: active ? '1.5px solid #0d87c8' : '1.5px solid #ccd8e2' }}>
                              {lv}
                              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 20, height: 20, borderRadius: 999, padding: '0 5px', fontSize: 11, fontWeight: 700, lineHeight: 1, background: active ? 'rgba(255,255,255,0.28)' : '#dbeeff', color: active ? '#fff' : '#0d87c8' }}>{cnt}</span>
                            </button>
                          )
                        })}
                      </div>
                      {/* Right fade + arrow hint — mobile only */}
                      <div className="sm:hidden" style={{ pointerEvents: 'none', position: 'absolute', right: 0, top: 0, bottom: 0, width: 44, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.97))', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 6 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d87c8" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </div>
                    {/* Sort */}
                    <div className="sm:ml-auto flex items-center justify-center sm:justify-start gap-2">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#9aabb8" strokeWidth={2}><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="9" y2="14"/><line x1="21" y1="18" x2="9" y2="18"/></svg>
                      <select value={catSort} onChange={e => setCatSort(e.target.value)}
                        style={{ fontSize: 12, fontWeight: 500, border: '1px solid #d1dce8', borderRadius: 7, padding: '5px 10px', background: '#fff', color: '#1a3a4a', outline: 'none', cursor: 'pointer' }}>
                        <option value="low-high">Price: Low → High</option>
                        <option value="high-low">Price: High → Low</option>
                        <option value="dur-asc">Duration: Short → Long</option>
                        <option value="dur-desc">Duration: Long → Short</option>
                      </select>
                    </div>
                  </div>

                  {/* Cards grid */}
                  {(() => {
                    type CertType = { prereq: string; examFee: string; format: string; questions: string; passingScore: string; validity: string; bestPractices: string[] }
                    const flippedCourse = flippedCard !== null ? sorted.find(c => `${activeDomain}-${c.code}` === flippedCard) ?? null : null
                    const flippedCert = flippedCourse ? (flippedCourse as {cert?: CertType}).cert ?? null : null
                    return (
                      <div className="overflow-y-auto p-4" style={{ background: '#f4f8fc', maxHeight: 640, scrollbarWidth: 'thin', scrollbarColor: '#c8dcea transparent' }}>
                        {sorted.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-20" style={{ color: '#9aabb8' }}>
                            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ opacity: 0.3, marginBottom: 10 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                            <p style={{ fontSize: 13, fontWeight: 500 }}>No courses match your search.</p>
                            <button onClick={() => { setCatSearch(''); setCatLevel('All') }} style={{ marginTop: 8, fontSize: 12, color: '#0d87c8', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear filters</button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: 14 }}>
                            {sorted.map((course, ci) => {
                              const cardKey = `${activeDomain}-${course.code}`
                              const isFlipped = flippedCard === cardKey
                              const lc = LCAT[course.level] ?? { bg: '#dbeeff', color: '#0050c8' }
                              /* ── Cert panel replaces the clicked card ── */
                              if (isFlipped) return (
                                <div key={ci} style={{ background: '#fff', borderRadius: 10, border: '1.5px solid #0d87c8', padding: '13px 15px', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 12px rgba(13,135,200,0.13)' }}>
                                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                                    <button onClick={() => setFlippedCard(null)} style={{ fontSize: 11, fontWeight: 600, color: '#0d87c8', background: '#e8f4fb', border: '1px solid #b8ddf0', borderRadius: 20, padding: '3px 10px', cursor: 'pointer' }}>← Course</button>
                                  </div>
                                  {flippedCert ? (
                                    <>
                                      <div style={{ background: '#f4f8fc', borderRadius: 6, padding: '6px 10px', fontSize: 11.5, color: '#4a6a7a', marginBottom: 8 }}>{flippedCert.prereq}</div>
                                      {([
                                        { label: 'Exam Fee', value: flippedCert.examFee },
                                        { label: 'Format', value: flippedCert.format },
                                        { label: 'Questions', value: flippedCert.questions },
                                        { label: 'Passing Score', value: flippedCert.passingScore },
                                        { label: 'Validity', value: flippedCert.validity },
                                      ] as {label:string;value:string}[]).map((row, ri) => (
                                        <div key={ri} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '5px 0', borderBottom: '1px solid #f0f5fa', gap: 8 }}>
                                          <span style={{ fontSize: 11.5, color: '#6b8fa8', flexShrink: 0 }}>{row.label}</span>
                                          <span style={{ fontSize: 11.5, fontWeight: 700, color: '#0a1929', textAlign: 'right' }}>{row.value}</span>
                                        </div>
                                      ))}
                                      <div style={{ marginTop: 10 }}>
                                        <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0d87c8', marginBottom: 6 }}>Best Practices</div>
                                        {flippedCert.bestPractices.map((bp, bi) => (
                                          <div key={bi} style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                                            <span style={{ color: '#0d87c8', fontSize: 12, flexShrink: 0 }}>•</span>
                                            <span style={{ fontSize: 11.5, color: '#1a3a4a', lineHeight: 1.45 }}>{bp}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  ) : (
                                    <div style={{ fontSize: 12, color: '#9aabb8', textAlign: 'center', paddingTop: 40 }}>No cert details available</div>
                                  )}
                                </div>
                              )
                              /* ── Normal card ── */
                              return (
                                <div key={ci} style={{ background: '#fff', borderRadius: 10, border: '1px solid #dde8f2', padding: '14px 15px 13px', display: 'flex', flexDirection: 'column', gap: 9, boxShadow: '0 1px 4px rgba(13,135,200,0.06)' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderRadius: 5, padding: '3px 8px', background: lc.bg, color: lc.color }}>{course.level}</span>
                                    <button onClick={() => setFlippedCard(cardKey)} style={{ fontSize: 11, fontWeight: 600, color: '#0d87c8', background: '#e8f4fb', border: '1px solid #b8ddf0', borderRadius: 6, padding: '3px 8px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Cert Details →</button>
                                  </div>
                                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0a1929', lineHeight: 1.35 }}>{course.title}</div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ borderRadius: 6, background: '#e8f2fa', border: '1px solid #c8dcea', padding: '2px 8px', fontSize: 11.5, fontWeight: 600, color: '#3a5f80' }}>{course.code}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: '#6b8fa8' }}>
                                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                      {course.days} {course.days === 1 ? 'day' : 'days'} · 8hrs
                                    </span>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                                      <span style={{ fontSize: 12, color: '#0d87c8' }}>$</span>
                                      <span style={{ fontSize: 18, fontWeight: 800, color: '#0d87c8', lineHeight: 1 }}>{course.price}</span>
                                    </div>
                                    <span style={{ fontSize: 11, color: '#94a3b8' }}>per person · USD</span>
                                  </div>
                                  <div style={{ display: 'flex', gap: 7, marginTop: 'auto', paddingTop: 4 }}>
                                    <a href="#contact" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, borderRadius: 8, border: '1.5px solid #0d87c8', padding: '7px 0', fontSize: 12, fontWeight: 600, color: '#0d87c8', background: 'transparent', textDecoration: 'none' }}
                                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#e6f4fb' }}
                                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}>
                                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                      Brochure
                                    </a>
                                    <button style={{ flex: 2, borderRadius: 8, border: 'none', padding: '7px 0', fontSize: 12, fontWeight: 600, color: '#fff', background: '#0d87c8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0970a8' }}
                                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0d87c8' }}>
                                      Enquire Now
                                    </button>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })()}
                </div>
              </div>

            </div>
          )
        })()}
      </section>

      {/* ── Business Impact ── */}
      <section className="relative overflow-hidden px-4 md:px-8 lg:px-[50px] py-[30px] sm:py-20" style={{ background: 'linear-gradient(to right, #f0f5ff 0%, #c8e4f5 45%, #7dc8e8 100%)' }}>
        {/* Floating squares — right half decorative */}
        {[
          { w: 110, h: 110, top: '12%',  left: '46%' },
          { w:  80, h:  80, top: '52%',  left: '56%' },
          { w: 100, h: 100, top: '10%',  left: '70%' },
          { w: 130, h: 130, top: '5%',   left: '84%' },
          { w:  90, h: 130, top: '40%',  left: '91%' },
          { w:  70, h:  70, top: '68%',  left: '74%' },
        ].map((sq, i) => (
          <div key={i} className="pointer-events-none absolute" style={{ width: sq.w, height: sq.h, top: sq.top, left: sq.left, border: '1.5px solid rgba(255,255,255,0.55)', borderRadius: '6px', background: 'rgba(255,255,255,0.08)' }} />
        ))}

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col gap-[15px] md:flex-row md:items-center md:gap-8 lg:gap-12">

            {/* ══ LEFT — Text ══ */}
            <div className="flex-1 lg:max-w-[500px]">

              {/* Eyebrow */}
              <p className="mb-[15px] lg:mb-4 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#13a8d4' }}>
                Strengthen Your Business Edge
              </p>

              {/* Heading */}
              <h2 className="mb-[15px] lg:mb-4 text-3xl font-bold leading-tight lg:text-4xl" style={{ color: '#0b2545' }}>
                The Business Impact of{' '}
                <span className="bg-gradient-to-r from-[#13a8d4] to-[#4dbfef] bg-clip-text text-transparent">
                  Koenig Enterprise Training
                </span>
              </h2>

              {/* Sub-text */}
              <p className="mb-[15px] lg:mb-10 text-sm leading-relaxed" style={{ color: '#3a6080' }}>
                Trusted by 500+ enterprises worldwide to upskill teams, close certification gaps, and deliver measurable ROI across every region.
              </p>

              {/* CTA */}
              <button
                className="rounded-xl px-8 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#0694d1,#076d9d)', boxShadow: '0 4px 20px rgba(6,148,209,0.35)' }}
              >
                Learn More
              </button>
            </div>

            {/* ══ RIGHT — Auto-sliding image ══ */}
            {(() => {
              const BI_ITEMS = [
                { img: '/images/enterprise/94.png',                           title: 'Dedicated L&D Dashboard',      stat: '94%',  sublabel: 'First-Attempt Pass Rate',    objPos: 'center 30%' },
                { img: '/images/enterprise/ISO.png',                          title: 'Compliance-Ready Training',    stat: 'ISO',  sublabel: 'Compliance-Ready Reports',   objPos: 'center center' },
                { img: '/images/enterprise/dedicated-account-manager.png',    title: 'Dedicated Account Manager',    stat: '1:1',  sublabel: 'Dedicated Account Manager',  objPos: 'center 30%' },
                { img: '/images/enterprise/multi-region-delivery.png',        title: 'Multi-Region Delivery',        stat: '195+', sublabel: 'Countries Delivered',        objPos: 'center center' },
                { img: '/images/enterprise/vendor-certified-instructors.png', title: 'Vendor-Certified Instructors', stat: '500+', sublabel: 'Vendor Certifications',      objPos: 'center 30%' },
                { img: '/images/enterprise/GTR.png',                          title: 'Guaranteed Schedule',          stat: '100%', sublabel: 'Batch Guarantee',            objPos: 'center center' },
              ]
              return (
                <div className="flex-1">
                  {/* Feature title — updates per slide */}
                  <p className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: '#0b2545', minHeight: '20px' }}>
                    {BI_ITEMS[biSlide].title}
                  </p>

                  {/* Fixed-height image container — all slides stacked */}
                  <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{ height: '340px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 16px 48px rgba(11,37,69,0.15)' }}
                    onTouchStart={e => { (e.currentTarget as HTMLDivElement).dataset.touchX = String(e.touches[0].clientX) }}
                    onTouchEnd={e => {
                      const startX = parseFloat((e.currentTarget as HTMLDivElement).dataset.touchX || '0')
                      const diff = startX - e.changedTouches[0].clientX
                      if (Math.abs(diff) > 40) setBiSlide(s => diff > 0 ? (s + 1) % 6 : (s + 5) % 6)
                    }}
                  >
                    {BI_ITEMS.map((sl, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{ opacity: biSlide === idx ? 1 : 0, pointerEvents: biSlide === idx ? 'auto' : 'none' }}
                      >
                        <img src={sl.img} alt={sl.title} className="h-full w-full object-cover" style={{ objectPosition: sl.objPos }} />
                        {/* Stat badge — bottom-right inside image */}
                        <div
                          className="absolute bottom-4 right-4 rounded-xl px-4 py-3 text-right"
                          style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.7)', boxShadow: '0 4px 16px rgba(11,37,69,0.18)' }}
                        >
                          <p className="text-2xl font-black leading-none" style={{ color: '#13a8d4' }}>{sl.stat}</p>
                          <p className="mt-1 text-xs font-medium" style={{ color: '#1e4060' }}>{sl.sublabel}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dot nav */}
                  <div className="mt-4 flex items-center gap-2">
                    {BI_ITEMS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setBiSlide(i)}
                        className="rounded-full transition-all duration-300"
                        style={{ width: biSlide === i ? 22 : 8, height: 8, background: biSlide === i ? '#13a8d4' : 'rgba(11,37,69,0.25)' }}
                      />
                    ))}
                  </div>
                </div>
              )
            })()}

          </div>
        </div>
      </section>

      {/* ── Why Koenig ── */}
      <section className="relative overflow-hidden px-4 md:px-8 lg:px-[50px] py-5 sm:py-[60px]" style={{ background: '#061e30' }}>
        <style>{`
          @keyframes entDiffShimmer { 0%{transform:translateX(-110%) skewX(-18deg)} 100%{transform:translateX(220%) skewX(-18deg)} }
          .ent-diff-banner { position:relative; overflow:hidden; }
          .ent-diff-banner::after { content:''; position:absolute; top:0; left:0; height:100%; width:40%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent); animation:entDiffShimmer 4s ease-in-out infinite; pointer-events:none; border-radius:inherit; }
          .ent-diff-card { transition:transform .3s ease, box-shadow .3s ease, border-color .3s ease; }
          .ent-diff-card:hover { transform:translateY(-5px); box-shadow:0 12px 36px rgba(6,148,209,0.18),0 0 0 1px rgba(6,148,209,0.45); }
        `}</style>
        {/* BG effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-10" style={{ background: 'radial-gradient(circle,#0694d1,transparent 65%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full opacity-8" style={{ background: 'radial-gradient(circle,#076d9d,transparent 65%)', filter: 'blur(70px)' }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#ffffff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Heading */}
          <div className="io-fade mb-[15px] sm:mb-[35px] text-center">
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wider" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.25)', color: '#0694d1' }}>Why Enterprises Choose Us</span>
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">The <span className="bg-gradient-to-r from-[#0694d1] to-cyan-400 bg-clip-text text-transparent">Koenig Difference</span></h2>
            <p className="mx-auto max-w-xl text-sm sm:text-base text-white/55">What makes 1M+ professionals and global enterprises choose Koenig</p>
          </div>

          <KoenigDifferenceMobileCarousel />
          <div className="hidden sm:flex flex-col gap-4">
            {/* Row 1 — full-width banner: 50+ Vendor Partnerships */}
            <div className="ent-diff-banner io-fade flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between" style={{ background: 'linear-gradient(135deg,#0a6ebd 0%,#0694d1 50%,#00b4d8 100%)' }}>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(255,255,255,0.18)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <h3 className="mb-1 text-base md:text-lg font-bold text-white">{WHY[0].title}</h3>
                  <p className="text-sm sm:text-base text-white/80">{WHY[0].desc}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-3">
                {[{ val: '50+', label: 'Vendors' }, { val: '195+', label: 'Countries' }, { val: '30+', label: 'Years' }].map(s => (
                  <div key={s.label} className="rounded-xl px-4 py-3 text-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <div className="text-base md:text-lg font-bold text-white">{s.val}</div>
                    <div className="text-sm text-white/70">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 — 3 cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="ent-diff-card io-fade flex flex-col rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,#071c2e,#0a2a42)', border: '1px solid rgba(6,148,209,0.22)' }}>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.18)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <h3 className="mb-2 text-base md:text-lg font-medium text-white">{WHY[1].title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/60">{WHY[1].desc}</p>
              </div>
              <div className="ent-diff-card io-fade flex flex-col rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,#062038,#083250)', border: '1px solid rgba(0,180,216,0.2)' }}>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(0,180,216,0.16)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <h3 className="mb-2 text-base md:text-lg font-medium text-white">{WHY[2].title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/60">{WHY[2].desc}</p>
              </div>
              <div className="ent-diff-card io-fade flex flex-col rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,#072440,#093556)', border: '1px solid rgba(6,148,209,0.2)' }}>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.18)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/><path d="M9 11l2 2 4-4"/></svg>
                </div>
                <h3 className="mb-2 text-base md:text-lg font-medium text-white">{WHY[3].title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/60">{WHY[3].desc}</p>
              </div>
            </div>

            {/* Row 3 — 2 cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="ent-diff-card io-fade flex flex-col rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,#061828,#082438)', border: '1px solid rgba(7,109,157,0.25)' }}>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(7,109,157,0.22)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#076d9d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 7h5M7 11h3"/></svg>
                </div>
                <h3 className="mb-2 text-base md:text-lg font-medium text-white">{WHY[4].title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/60">{WHY[4].desc}</p>
              </div>
              <div className="ent-diff-card io-fade flex flex-col rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,#062030,#083048)', border: '1px solid rgba(0,180,216,0.18)' }}>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(0,180,216,0.15)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.1a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z"/></svg>
                </div>
                <h3 className="mb-2 text-base md:text-lg font-medium text-white">{WHY[5].title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/60">{WHY[5].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How Corporate Training Works ── */}
      <section className="relative overflow-hidden bg-white px-4 md:px-8 lg:px-[50px] py-5 sm:py-[60px]">
        <style>{`
          @keyframes entHiwFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
          .ent-hiw-step { opacity:0; animation: entHiwFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; }
          .ent-hiw-step.io-visible { opacity:1; }
          @keyframes entHiwPulse { 0%{box-shadow:0 0 0 0 rgba(7,109,157,0.5)} 70%{box-shadow:0 0 0 18px rgba(7,109,157,0)} 100%{box-shadow:0 0 0 0 rgba(7,109,157,0)} }
          .ent-hiw-pulse { animation: entHiwPulse 1.8s ease-out infinite; border: 2px solid rgba(7,109,157,0.4); }
          .ent-hiw-outline-btn { transition: background .3s, color .3s; }
          .ent-hiw-outline-btn:hover { background: #076D9D !important; color: white !important; }
        `}</style>
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[350px] w-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.14) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">
          <div className="io-fade mb-[15px] sm:mb-[35px] text-center">
            <span className="mb-3 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-koenig-blue">Simple Onboarding</span>
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-koenig-dark">From Brief to Certified — <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">In 4 Simple Steps</span></h2>
            <p className="mx-auto max-w-xl text-sm sm:text-base text-koenig-muted">We handle every detail so your HR and L&D teams can focus on strategy, not logistics.</p>
          </div>

          <HowItWorksMobileCarousel />
          <div className="relative hidden sm:block">
            <div className="pointer-events-none absolute hidden lg:block" style={{ top: '52px', left: '12.5%', right: '12.5%', height: '2px', background: 'linear-gradient(to right,#076D9D,#4DBFEF,#076D9D)' }} />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch">
              {HOW_IT_WORKS.map((step, i) => {
                const isActive = activeHiwStep === i
                return (
                  <div
                    key={i}
                    className="ent-hiw-step io-fade flex h-full cursor-pointer flex-col items-center"
                    style={{ animationDelay: `${0.1 + i * 0.15}s` }}
                    onMouseEnter={() => { setActiveHiwStep(i); setHiwPaused(true) }}
                    onMouseLeave={() => setHiwPaused(false)}
                  >
                    <div className="relative z-10 mb-6">
                      <div
                        className="flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300"
                        style={{
                          background: isActive ? '#076D9D' : 'white',
                          border: '4px solid #f0f9ff',
                          boxShadow: isActive ? '0 8px 30px rgba(7,109,157,0.35)' : '0 4px 20px rgba(0,0,0,0.08)',
                          transform: isActive ? 'scale(1.1) translateY(-6px)' : 'scale(1)',
                        }}
                      >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke={isActive ? 'white' : '#076D9D'} strokeWidth={1.8}>{step.icon}</svg>
                      </div>
                      <span
                        className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white transition-all duration-300"
                        style={{ background: isActive ? '#0694d1' : '#093148', transform: isActive ? 'scale(1.2)' : 'scale(1)' }}
                      >{i + 1}</span>
                      {isActive && <div className="ent-hiw-pulse pointer-events-none absolute inset-0 rounded-full" />}
                    </div>
                    <div
                      className="w-full flex-1 rounded-2xl border-2 p-6 text-center transition-all duration-300"
                      style={{
                        background: 'white',
                        borderColor: isActive ? '#076D9D' : '#e8f4fa',
                        boxShadow: isActive ? '0 20px 40px rgba(7,109,157,0.12)' : '0 2px 12px rgba(0,0,0,0.04)',
                        transform: isActive ? 'translateY(-4px)' : 'none',
                      }}
                    >
                      <div className="mb-2 text-sm font-bold tracking-widest text-koenig-blue">STEP {step.step}</div>
                      <h3 className="mb-2 text-sm sm:text-base md:text-lg font-semibold transition-colors duration-300" style={{ color: isActive ? '#076D9D' : '#093148' }}>{step.title}</h3>
                      <p className="mb-4 text-sm sm:text-base font-light leading-relaxed text-koenig-muted">{step.desc}</p>
                      <div className="flex items-center justify-center gap-1.5">
                        {[0,1,2,3].map(d => (
                          <div key={d} className="rounded-full transition-all duration-300" style={{ width: d < i + 1 ? '16px' : '8px', height: '8px', background: d < i + 1 ? '#076D9D' : '#CAEFFF' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="io-fade mt-12 flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="group inline-flex items-center gap-3 rounded-2xl px-8 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{ background: 'linear-gradient(135deg,#093148,#076D9D)' }}>
              Get a Free Consultation
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.18)' }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Learning Formats ── */}
      <section className="relative overflow-hidden px-4 md:px-8 lg:px-[50px] py-5 sm:py-[60px]" style={{ background: 'linear-gradient(135deg,#061e30 0%,#093148 50%,#062240 100%)' }}>
        {/* Glow orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/4 h-[380px] w-[380px] rounded-full opacity-25" style={{ background: 'radial-gradient(circle,#0694d1,transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 right-1/4 h-[320px] w-[320px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle,#076d9d,transparent 70%)', filter: 'blur(55px)' }} />
          <div className="absolute top-1/2 left-10 h-[200px] w-[200px] -translate-y-1/2 rounded-full opacity-15" style={{ background: 'radial-gradient(circle,#00a4ef,transparent 70%)', filter: 'blur(45px)' }} />
          <div className="absolute top-1/3 right-10 h-[180px] w-[180px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle,#0694d1,transparent 70%)', filter: 'blur(40px)' }} />
          <div className="ent-lf-ring d1" style={{ top: '50%', left: '50%', width: '420px', height: '420px' }} />
          <div className="ent-lf-ring d2" style={{ top: '50%', left: '50%', width: '420px', height: '420px' }} />
          <div className="ent-lf-ring d3" style={{ top: '50%', left: '50%', width: '420px', height: '420px' }} />
        </div>
        <style>{`
          @keyframes entLfRipple { 0%{transform:translate(-50%,-50%) scale(0.25);opacity:0.55} 100%{transform:translate(-50%,-50%) scale(2.8);opacity:0} }
          .ent-lf-ring { position:absolute; border-radius:50%; pointer-events:none; border:1px solid rgba(6,148,209,0.35); animation:entLfRipple 5s ease-out infinite; }
          .ent-lf-ring.d1 { animation-delay:0s; }
          .ent-lf-ring.d2 { animation-delay:1.6s; }
          .ent-lf-ring.d3 { animation-delay:3.2s; }
        `}</style>
        <div className="relative mx-auto max-w-7xl">
          <div className="io-fade mb-[15px] sm:mb-[35px] text-center">
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-koenig-blue" style={{ background: 'rgba(6,148,209,0.18)' }}>Flexible Delivery</span>
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">Training That Fits <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Your Way of Working</span></h2>
            <p className="mx-auto max-w-xl text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>Six formats. One quality standard. Every option comes with the same expert instructors, official courseware, and money-back guarantee.</p>
          </div>
          <style>{`
            .ent-lf-flip-inner { transform-style:preserve-3d; transition:transform 0.65s cubic-bezier(0.4,0.2,0.2,1); }
            .ent-lf-flip:hover .ent-lf-flip-inner { transform:rotateY(180deg); }
            .ent-lf-face { backface-visibility:hidden; -webkit-backface-visibility:hidden; }
            .ent-lf-back { transform:rotateY(180deg); }
            @keyframes entLfBtnGlow { 0%,100%{box-shadow:0 0 0 0 rgba(6,148,209,0),0 4px 14px rgba(6,148,209,0.3)} 50%{box-shadow:0 0 22px 7px rgba(6,148,209,0.5),0 4px 14px rgba(6,148,209,0.3)} }
            .ent-lf-btn-glow { animation:entLfBtnGlow 2.8s ease-in-out infinite; }
          `}</style>

          <FormatsMobileCarousel />
          {/* Slide — desktop only */}
          <div className="hidden sm:block overflow-hidden">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {FORMATS.slice(formatsSlide * 4, formatsSlide * 4 + 4).map((f, i) => (
                <div key={i} className="ent-lf-flip io-fade" style={{ perspective: '1000px', height: '400px' }}>
                  <div className="ent-lf-flip-inner relative h-full w-full">

                    {/* FRONT */}
                    <div className="ent-lf-face absolute inset-0 flex flex-col overflow-hidden rounded-2xl" style={{ background: f.cardBg, border: '1px solid rgba(6,148,209,0.22)' }}>
                      <div className="relative h-44 w-full shrink-0 overflow-hidden">
                        <img src={f.img} alt={f.title} className="h-full w-full object-cover" style={f.objPos ? { objectPosition: f.objPos } : undefined} />
                        <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-sm font-normal" style={{ background: 'rgba(9,49,72,0.55)', backdropFilter: 'blur(6px)', color: '#fff' }}>{f.badge}</span>
                      </div>
                      <div className="flex flex-1 flex-col px-5 pt-4">
                        <div className="flex-1">
                          <h3 className="mb-2 text-base font-medium text-white">{f.title}</h3>
                          <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{f.desc}</p>
                        </div>
                        <div className="pb-5 pt-4">
                          <button className="ent-lf-btn-glow w-full rounded-xl py-2.5 text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#0694d1,#076d9d)' }}>Learn More →</button>
                        </div>
                      </div>
                    </div>

                    {/* BACK */}
                    <div className="ent-lf-face ent-lf-back absolute inset-0 flex flex-col rounded-2xl p-5" style={{ background: f.cardBg, border: '1px solid rgba(6,148,209,0.35)' }}>
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.18)' }}>{f.icon}</div>
                        <h3 className="text-sm font-bold text-white leading-tight">{f.title}</h3>
                      </div>
                      <div className="mb-3 h-px" style={{ background: 'rgba(6,148,209,0.25)' }} />
                      <ul className="mb-4 space-y-2.5">
                        {f.bullets.map(b => (
                          <li key={b} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.78)' }}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="shrink-0">
                              <circle cx="8.5" cy="8.5" r="8" stroke="rgba(6,148,209,0.5)" strokeWidth="1"/>
                              <path d="M5.5 8.5l2 2 4-4" stroke="#0694d1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <button className="ent-lf-btn-glow mt-auto w-full rounded-xl py-2.5 text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#0694d1,#076d9d)' }}>Learn More →</button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide dots — desktop only */}
          <div className="hidden sm:flex mt-8 items-center justify-center gap-3">
            {[0, 1].map(idx => (
              <button
                key={idx}
                onClick={() => setFormatsSlide(idx)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: formatsSlide === idx ? 28 : 10,
                  height: 10,
                  background: formatsSlide === idx ? 'linear-gradient(to right,#3AB6EB,#076D9D)' : 'rgba(255,255,255,0.25)',
                  border: '1px solid rgba(6,148,209,0.4)',
                }}
              />
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
           NEW: Vendor Certification Ecosystem (DARK NAVY — tiered rows)
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-5 sm:py-[60px] px-4 md:px-8 lg:px-[50px]" style={{ background: 'linear-gradient(to right, #f0f5ff 0%, #c8e4f5 45%, #7dc8e8 100%)' }}>
        {/* Floating squares */}
        {[
          { w: 110, h: 110, top: '10%',  left: '47%' },
          { w:  80, h:  80, top: '55%',  left: '57%' },
          { w: 100, h: 100, top: '8%',   left: '71%' },
          { w: 130, h: 130, top: '4%',   left: '84%' },
          { w:  90, h: 130, top: '42%',  left: '91%' },
          { w:  70, h:  70, top: '70%',  left: '75%' },
        ].map((sq, i) => (
          <div key={i} className="pointer-events-none absolute" style={{ width: sq.w, height: sq.h, top: sq.top, left: sq.left, border: '1.5px solid rgba(255,255,255,0.55)', borderRadius: '6px', background: 'rgba(255,255,255,0.08)', zIndex: 0 }} />
        ))}

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="io-fade mb-[15px] sm:mb-12 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#0694d1' }}>Official Vendor Partners</p>
            <h2 className="text-3xl font-bold lg:text-4xl" style={{ color: '#0b2545' }}>50+ Authorised <span className="bg-gradient-to-r from-[#13a8d4] to-[#4dbfef] bg-clip-text text-transparent">Certification Partners</span></h2>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: '#3a6080' }}>Train and certify your team on the industry's most in-demand platforms — all under one roof, with one account manager.</p>
          </div>
        </div>

        {/* Mobile auto-scroll strip */}
        <div className="relative z-10">
          <VendorsMobileStrip />
        </div>

        {/* Row 1 — scrolls left (desktop only) */}
        <div className="hidden sm:block ent-marquee-wrap relative mb-4 py-3">
          <div className="ent-marquee-track gap-4 px-2">
            {[...ENT_VENDORS_ROW1, ...ENT_VENDORS_ROW1].map((v, i) => (
              <EntVendorCard key={i} v={v} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right (reverse — desktop only) */}
        <div className="hidden sm:block ent-marquee-wrap relative py-3">
          <div className="ent-marquee-track-rev gap-4 px-2">
            {[...ENT_VENDORS_ROW2, ...ENT_VENDORS_ROW2].map((v, i) => (
              <EntVendorCard key={i} v={v} />
            ))}
          </div>
        </div>

      </section>

      {/* ── Testimonials ── */}
      <section className="relative overflow-hidden py-5 sm:py-16 px-4 md:px-8 lg:px-[50px]" style={{ background: '#f0f5fa' }}>

        <div className="mx-auto max-w-7xl">
          <div className="io-fade mb-[15px] sm:mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Client Stories</p>
            <h2 className="text-2xl font-bold lg:text-3xl" style={{ color: '#0d1b2a' }}>
              Trusted by <span style={{ color: '#0694D1' }}>Global Enterprises</span>
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm" style={{ color: '#4a7a9b' }}>
              Real results from professionals trained and certified by Koenig — rated 4.9/5 from 10,000+ verified reviews.
            </p>
          </div>

          <EntMobileTestimonialMarquee />

          {/* Animated columns — desktop only */}
          <div
            className="hidden sm:block relative overflow-hidden"
            style={{
              height: '520px',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
            }}
          >
            <div className="grid grid-cols-1 gap-4 h-full sm:grid-cols-2 md:grid-cols-3">
              <DraggableScrollColumn items={TESTIMONIALS_COL1} speed={0.03} />
              <DraggableScrollColumn items={TESTIMONIALS_COL2} speed={0.025} />
              <DraggableScrollColumn items={TESTIMONIALS_COL3} speed={0.038} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative overflow-hidden bg-koenig-light px-4 md:px-8 lg:px-[50px] py-5 sm:py-[60px]">
        <div className="pointer-events-none absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.19) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.20) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.15) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">
          <div className="io-fade mb-[15px] sm:mb-[35px] text-center">
            <h2 className="mb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-koenig-dark">Everything You Need to <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Know</span></h2>
            <p className="text-sm sm:text-base text-koenig-muted">Quick answers to the questions L&D leaders ask before launching enterprise training with Koenig.</p>
          </div>
          <div className="io-fade delay-1 flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 === 0).map((faq, j) => {
                const i = j * 2; const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-6 sm:py-4">
                      <span className={`text-sm font-semibold leading-snug sm:text-base ${isOpen ? 'text-koenig-blue' : 'text-koenig-dark'}`} style={{ transition: 'color 0.3s' }}>{faq.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <p className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed text-koenig-muted sm:px-6 sm:py-4 sm:text-base">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 !== 0).map((faq, j) => {
                const i = j * 2 + 1; const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-6 sm:py-4">
                      <span className={`text-sm font-semibold leading-snug sm:text-base ${isOpen ? 'text-koenig-blue' : 'text-koenig-dark'}`} style={{ transition: 'color 0.3s' }}>{faq.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <p className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed text-koenig-muted sm:px-6 sm:py-4 sm:text-base">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="mb-3 text-sm sm:text-base text-koenig-muted">Still have questions?</p>
            <a href="#contact" className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-sm font-bold text-[#076D9D] transition-all hover:bg-[#076D9D] hover:text-white">
              Get a Free Consultation
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(7,109,157,0.12)' }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section id="contact" className="relative overflow-hidden px-4 md:px-8 lg:px-[50px] py-5 sm:py-[70px]" style={{ background: 'linear-gradient(160deg,#040f1a 0%,#061e30 50%,#051525 100%)' }}>
        {/* Glow orbs */}
        <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle,rgba(6,148,209,0.14) 0%,transparent 70%)' }} />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full" style={{ background: 'radial-gradient(circle,rgba(77,191,239,0.10) 0%,transparent 70%)' }} />

        <div className="relative mx-auto max-w-3xl">

          {/* Case study testimonial */}
          <div className="mb-10 rounded-2xl px-6 py-5" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.22)' }}>
            <svg className="mb-3 h-6 w-6 text-[#0694D1] opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            <p className="text-sm sm:text-base font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              &ldquo;We deployed Azure certification training to 120 engineers across 4 countries in 6 weeks. Koenig handled scheduling, content, and pass-rate reporting end to end.&rdquo;
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#0694D1' }}>— Global Financial Services Firm</p>
          </div>

          {/* Header */}
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-koenig-blue" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.3)' }}>Let&apos;s Talk</span>
            <h2 className="mt-3 text-3xl font-bold text-white lg:text-4xl">Get Your Custom Training Plan <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">— Free</span></h2>
            <p className="mt-3 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.50)' }}>Tell us about your workforce goals and we&apos;ll design a programme that delivers real, measurable outcomes.</p>
            <p className="mt-2 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.40)' }}>Flexible pricing for teams of any size — from 5 to 5,000.</p>
          </div>

          {submitted ? (
            <div className="rounded-2xl p-12 text-center" style={{ background: 'linear-gradient(145deg,#0a2d45,#072238)', border: '1px solid rgba(6,148,209,0.35)', boxShadow: '0 0 40px rgba(6,148,209,0.12)' }}>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'rgba(6,148,209,0.18)', border: '1px solid rgba(6,148,209,0.4)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Message Received!</h3>
              <p className="text-white/55">Our enterprise team will reach out within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="rounded-2xl p-8" style={{ background: 'linear-gradient(145deg,#0a2d45,#072238)', border: '1px solid rgba(6,148,209,0.25)', boxShadow: '0 0 50px rgba(6,148,209,0.10)' }}>
              <style>{`
                .ent-input { background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.10); transition: border-color 0.2s, box-shadow 0.2s; }
                .ent-input:focus { border-color: #0694D1; box-shadow: 0 0 0 3px rgba(6,148,209,0.15); outline: none; }
                .ent-input::placeholder { color: rgba(255,255,255,0.25); }
              `}</style>

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { id: 'name',    label: 'Full Name',    type: 'text',  placeholder: 'John Smith'        },
                  { id: 'company', label: 'Company Name', type: 'text',  placeholder: 'Acme Corporation'  },
                  { id: 'email',   label: 'Work Email',   type: 'email', placeholder: 'john@acme.com'     },
                  { id: 'phone',   label: 'Phone Number', type: 'tel',   placeholder: '+1 (555) 000-0000' },
                ].map(f => (
                  <div key={f.id}>
                    <label className="mb-2 block text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>{f.label}</label>
                    <input
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={formData[f.id as keyof typeof formData]}
                      onChange={e => setFormData(p => ({ ...p, [f.id]: e.target.value }))}
                      className="ent-input w-full rounded-xl px-4 py-3 text-sm text-white"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>Training Needs</label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. We need Azure certification for 50 engineers across 3 countries..."
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  className="ent-input w-full rounded-xl px-4 py-3 text-sm text-white resize-none"
                />
              </div>

              <button type="submit" className="mt-6 w-full rounded-xl py-4 text-base font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 4px 24px rgba(6,148,209,0.40)' }}>
                Request My Free Consultation →
              </button>
              <ul className="mt-5 space-y-2">
                {[
                  'A dedicated enterprise account manager will reach out within 1 business day',
                  "We'll scope your training needs and design a custom programme",
                  'No commitment required — just a conversation',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-center text-sm" style={{ color: 'rgba(255,255,255,0.30)' }}>We&apos;ll respond within 1 business day · No spam, ever.</p>
            </form>
          )}
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(6,148,209,0.5), transparent)' }} />

      {/* ── Footer ── */}
      <footer style={{ background: '#071929' }} className="text-white">

        {/* Newsletter + Social */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="px-4 md:px-8 lg:px-[50px] py-8">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="mb-3 text-sm font-semibold text-white">Subscribe to our Newsletter</p>
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder=""
                  aria-label="Email address"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="w-56 sm:w-72 rounded-l border-y border-l px-3 py-2 text-sm text-white placeholder-white/40 outline-none"
                  style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}
                />
                <button className="rounded-r px-5 py-2 text-sm font-semibold text-white" style={{ background: '#0694D1' }}>Subscribe</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.youtube.com/user/KoenigSol" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80" style={{ background: '#FF0000' }}>
                <svg className="h-4 w-4" fill="white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.facebook.com/KoenigSolutions" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80" style={{ background: '#1877F2' }}>
                <svg className="h-4 w-4" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/koenigsolutions" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80" style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)' }}>
                <svg className="h-4 w-4" fill="white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/koenig-solutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80" style={{ background: '#0A66C2' }}>
                <svg className="h-4 w-4" fill="white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://twitter.com/koenigsolutions" target="_blank" rel="noopener noreferrer" aria-label="X" className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80" style={{ background: '#000000' }}>
                <svg className="h-4 w-4" fill="white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Main link columns */}
        <div className="px-4 md:px-8 lg:px-[50px] py-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 mb-10">
              {FOOTER_COLS.map(col => (
                <div key={col.heading}>
                  <h4 className="mb-4 text-sm font-semibold" style={{ color: '#0694D1' }}>{col.heading}</h4>
                  <ul className="space-y-2">
                    {col.links.map(link => (
                      <li key={link}><a href="#" className="text-sm leading-snug text-white/80 transition-colors hover:text-white">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
              {FOOTER_BOTTOM_COLS.map(col => (
                <div key={col.heading}>
                  <h4 className="mb-4 text-sm font-semibold" style={{ color: '#0694D1' }}>{col.heading}</h4>
                  <ul className="space-y-2">
                    {col.links.map(link => (
                      <li key={link}><a href="#" className="text-sm leading-snug text-white/80 transition-colors hover:text-white">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-2">
                <h4 className="mb-4 text-sm font-semibold" style={{ color: '#0694D1' }}>Top Courses</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  <ul className="space-y-2">
                    {TOP_COURSES_COL1.map(link => (
                      <li key={link}><a href="#" className="text-sm leading-snug text-white/80 transition-colors hover:text-white">{link}</a></li>
                    ))}
                  </ul>
                  <ul className="space-y-2">
                    {TOP_COURSES_COL2.map(link => (
                      <li key={link}><a href="#" className="text-sm leading-snug text-white/80 transition-colors hover:text-white">{link}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal disclaimers */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} className="px-4 md:px-8 lg:px-[50px] py-8">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-8 items-start">
            <ul className="flex-1 space-y-1.5 list-disc list-outside pl-4 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <li>All rights reserved. ©1997 - 2026, Koenig Solutions Pvt. Ltd.</li>
              <li>PMP ® is a registered trademark of the Project Management Institute.</li>
              <li>ITIL, PRINCE2 and IAASC are registered trademarks of the PeopleCert group. PeopleCert DevOps and PeopleCert SCRUM are trademarks of the PeopleCert group. Used under licence from PeopleCert. All rights reserved.</li>
              <li>TOGAF® is a registered trademark of The Open Group.</li>
              <li>The Open Group Certification Mark is a trademark, and The Open Group and TOGAF are registered trademarks of The Open Group.</li>
              <li>The APMG International and swirl device logo is a trademark of the APM Group Limited, used under permission of The APM Group Limited. All rights reserved.</li>
              <li>AgilePM® is a registered trademark of Agile Business Consortium Limited. All rights reserved.</li>
            </ul>
            <div className="shrink-0">
              <a href="https://www.dmca.com/Protection/Status.aspx?ID=koenig-solutions" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dmca.png" alt="DMCA Protected" style={{ width: '62px', height: '62px' }} />
              </a>
            </div>
          </div>
        </div>

      </footer>

      {/* ── Contact Modal ── */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: 'rgba(4,15,26,0.80)', backdropFilter: 'blur(6px)' }} onClick={() => setContactModalOpen(false)}>
          <div className="relative w-full max-w-xl rounded-2xl p-8" style={{ background: 'linear-gradient(145deg,#0a2d45,#072238)', border: '1px solid rgba(6,148,209,0.30)', boxShadow: '0 0 60px rgba(6,148,209,0.15)' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setContactModalOpen(false)} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white">✕</button>
            {modalSubmitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'rgba(6,148,209,0.18)', border: '1px solid rgba(6,148,209,0.4)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Message Received!</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Our enterprise team will reach out within 1 business day.</p>
                <button onClick={() => { setContactModalOpen(false); setModalSubmitted(false); setModalFormData({ name: '', company: '', email: '', phone: '', message: '' }) }} className="mt-6 rounded-xl px-6 py-2.5 text-sm font-semibold text-white" style={{ background: 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.4)' }}>Close</button>
              </div>
            ) : (
              <>
                <h2 className="mb-1 text-xl font-bold text-white">Get Your Custom Training Plan</h2>
                <p className="mb-6 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Flexible pricing for teams of any size — from 5 to 5,000.</p>
                <style>{`.modal-input { background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.10); transition: border-color 0.2s, box-shadow 0.2s; } .modal-input:focus { border-color: #0694D1; box-shadow: 0 0 0 3px rgba(6,148,209,0.15); outline: none; } .modal-input::placeholder { color: rgba(255,255,255,0.25); }`}</style>
                <form onSubmit={e => { e.preventDefault(); setModalSubmitted(true) }} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { id: 'name',    label: 'Full Name',    type: 'text',  placeholder: 'John Smith'        },
                      { id: 'company', label: 'Company Name', type: 'text',  placeholder: 'Acme Corporation'  },
                      { id: 'email',   label: 'Work Email',   type: 'email', placeholder: 'john@acme.com'     },
                      { id: 'phone',   label: 'Phone Number', type: 'tel',   placeholder: '+1 (555) 000-0000' },
                    ].map(f => (
                      <div key={f.id}>
                        <label className="mb-1.5 block text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.60)' }}>{f.label}</label>
                        <input type={f.type} required placeholder={f.placeholder} value={modalFormData[f.id as keyof typeof modalFormData]} onChange={e => setModalFormData(p => ({ ...p, [f.id]: e.target.value }))} className="modal-input w-full rounded-xl px-4 py-3 text-sm text-white" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.60)' }}>Training Needs</label>
                    <textarea rows={3} required placeholder="e.g. We need Azure certification for 50 engineers across 3 countries..." value={modalFormData.message} onChange={e => setModalFormData(p => ({ ...p, message: e.target.value }))} className="modal-input w-full resize-none rounded-xl px-4 py-3 text-sm text-white" />
                  </div>
                  <button type="submit" className="w-full rounded-xl py-3.5 text-base font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 4px 24px rgba(6,148,209,0.40)' }}>
                    Request My Free Consultation →
                  </button>
                  <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>We&apos;ll respond within 1 business day · No spam, ever.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Chatbox ── */}
      <div
        className="fixed z-50 overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300"
        style={{ bottom: '7rem', right: '1rem', width: 'calc(100vw - 2rem)', maxWidth: '340px', opacity: chatOpen ? 1 : 0, transform: chatOpen ? 'translateY(0)' : 'translateY(20px)', pointerEvents: chatOpen ? 'auto' : 'none' }}
      >
        <div className="flex items-center justify-between p-4" style={{ background: '#093148' }}>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            <div>
              <p className="text-sm font-bold text-white">KOENIG Solutions</p>
              <p className="text-sm text-gray-300">Online | Typically replies instantly</p>
            </div>
          </div>
          <button onClick={() => setChatOpen(false)} className="text-white/70 transition-colors hover:text-white" aria-label="Close chat">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
        </div>
        <div className="space-y-3 p-4" style={{ background: '#F8F9FA' }}>
          <div className="max-w-[85%] rounded-2xl rounded-tl-none p-3 text-sm text-white" style={{ background: '#076D9D' }}>👋 Hello! Welcome to Koenig Solutions.</div>
          <div className="max-w-[85%] rounded-2xl rounded-tl-none p-3 text-sm text-white" style={{ background: '#076D9D' }}>How can I help you today?</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {['🎓 Browse Courses','💬 Talk to Advisor','📅 Course Schedule','💰 Get a Quote'].map(q => (
              <button key={q} className="cursor-pointer rounded-full border bg-white px-3 py-1 text-sm transition-all duration-150" style={{ borderColor: '#076D9D', color: '#076D9D' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#076D9D'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#076D9D' }}
              >{q}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 border-t border-gray-200 bg-white p-3">
          <input type="text" placeholder="Type a message..." aria-label="Chat message" value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') setChatMsg('') }} className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm outline-none transition-colors focus:border-[#076D9D]" />
          <button onClick={() => setChatMsg('')} aria-label="Send" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90" style={{ background: '#076D9D' }}>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </div>
      </div>

      {/* Floating chat button */}
      <button onClick={() => setChatOpen(v => !v)} aria-label="Open chat" className="fixed z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-2xl transition-transform duration-200 hover:scale-105 sm:h-14 sm:w-14" style={{ bottom: '1rem', right: '1rem', background: '#076D9D' }}>
        <span className="absolute inset-0 animate-ping rounded-full opacity-40" style={{ background: '#076D9D' }} />
        {chatOpen ? (
          <svg className="relative h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        ) : (
          <svg className="relative h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/></svg>
        )}
      </button>

      {/* Back-to-top */}
      {showBackTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-koenig-dark shadow-xl transition-all duration-200 hover:bg-koenig-blue hover:text-white"
          style={{ bottom: 'calc(1rem + 56px + 10px)', right: '1rem', border: '1px solid #dedede' }}
        >
          ↑
        </button>
      )}

    </div>
  )
}

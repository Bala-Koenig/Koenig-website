'use client'
import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

/* ─── Vendor Data ───────────────────────────────────────── */
const VENDORS = [
  {
    id: 'microsoft', name: 'Microsoft', tier: 'Gold Partner', color: '#0078D4', bg: '#EFF6FF',
    courses: 380,
    desc: "Azure, M365, Power Platform, Security & AI certifications from the world's largest software company.",
    icon: 'M',
    list: [
      'PL-300T00: Microsoft Power BI Data Analyst',
      'AZ-104T00-A: Microsoft Azure Administrator',
      'AI-102T00: Designing and Implementing a Microsoft Azure AI Solution',
      'DP-600T00: Microsoft Fabric Analytics Engineer',
      'AZ-305T00: Designing Microsoft Azure Infrastructure Solutions',
      'SC-200T00: Microsoft Security Operations Analyst',
      'SC-300T00: Microsoft Identity and Access Administrator',
      'AZ-500: Microsoft Azure Security Technologies',
      'AZ-400T00-A: Designing and Implementing Microsoft DevOps Solutions',
      'AZ-204T00: Developing Solutions for Microsoft Azure',
      'AZ-900T00: Microsoft Azure Fundamentals',
      'DW-101: Copilot for Microsoft 365 Deployment Workshop',
      'Automation in a Day',
      'Power BI Dashboard in a Day',
      'App in a Day',
    ],
  },
  {
    id: 'cisco', name: 'Cisco', tier: 'Premier Partner', color: '#1BA0D7', bg: '#F0FAFF',
    courses: 210,
    desc: 'Enterprise networking, security, and DevNet certifications for the connected enterprise.',
    icon: 'C',
    list: [
      'Implementing and Administering Cisco Solutions (CCNA) v2.1',
      'Implementing Cisco Application Centric Infrastructure (DCACI) v1.2',
      'Implementing and Configuring Cisco Identity Services Engine (SISE) v4.0',
      'Implementing Cisco SD-WAN Solutions (ENSDWI) v3.0',
      'Implementing Cisco Enterprise Network Core Technologies (ENCOR) v1.3',
      'Cisco SD-WAN Operation and Deployment (SDWFND) v2.0',
      'Implementing Cisco Enterprise Wireless Networks (ENWLSI) 2.0',
      'Engineering Cisco Meraki Solutions (ECMS) 1.0',
      'Implementing Cisco Enterprise Advanced Routing and Services (ENARSI)',
      'Fundamentals of Cisco Firewall Threat Defense and Intrusion Prevention (SFWIPF)',
      'Designing Cisco Enterprise Networks (ENSLD) v2.0',
      'SCOR v2 – Implementing and Operating Cisco Security Core Technologies',
      'IP6FD – IPv6 Fundamentals, Design, and Deployment v4.0',
      'Cisco Certified DevNet Associate (DEVASC)',
      'Implementing and Operating Cisco Data Center Core Technologies (DCCOR) v1.3',
    ],
  },
  {
    id: 'aws', name: 'AWS', tier: 'Training Partner', color: '#FF9900', bg: '#FFFBF0',
    courses: 290,
    desc: 'Cloud computing certifications from foundational to professional across all AWS specialty tracks.',
    icon: 'A',
    list: [
      'AWS Certified Cloud Practitioner',
      'AWS Certified Solutions Architect – Associate (Architecting on AWS)',
      'AWS Certified Developer – Associate (Developing on AWS)',
      'AWS Certified SysOps Administrator – Associate (Cloud Operations on AWS)',
      'AWS Certified Solutions Architect – Professional',
      'AWS Certified DevOps Engineer – Professional',
      'AWS Certified Security – Specialty',
      'AWS Technical Essentials',
      'MLOps Engineering on AWS',
      'Practical Data Science with Amazon SageMaker',
      'Advanced AWS Well-Architected Best Practices',
      'Migrating to AWS',
      'AWS Security Essentials',
      'AWS Cloud Essentials for Business Leaders',
      'Developing Generative AI Applications on AWS',
    ],
  },
  {
    id: 'vmware', name: 'VMware', tier: 'Principal Partner', color: '#607078', bg: '#F5F7F8',
    courses: 120,
    desc: 'Virtualization, cloud foundation, NSX networking, and Kubernetes container training.',
    icon: 'V',
    list: [
      'VMware vSphere: Install, Configure, Manage [V8]',
      'VMware Cloud Foundation: Deploy, Configure, Manage [v5.2]',
      'VMware NSX: Install, Configure, Manage [V4.0]',
      'VMware vSphere: Advanced Administration [V8]',
      'VMware vSAN: Install, Configure, Manage [V8]',
      'VMware NSX: Troubleshooting and Operations [V4.x]',
      'VMware NSX: Design [V4.x]',
      'Azure VMware Solution: Integrated Workshop',
      'Migrating to VMware Cloud Foundation [V5.0]',
      'VMware Cloud Foundation: Troubleshooting [V5.0]',
      'Kubernetes Fundamentals and Cluster Operations',
      'VMware Aria Automation: Install, Configure, Manage [V8.17]',
      'VMware Site Recovery Manager: Install, Configure, Manage [V8.6]',
      'VMware SD-WAN by VeloCloud: Design and Deploy [V3.x]',
      'VMware Aria Operations: Install, Configure, Manage [V8.17]',
    ],
  },
  {
    id: 'oracle', name: 'Oracle', tier: 'Gold Partner', color: '#C74634', bg: '#FFF5F4',
    courses: 160,
    desc: 'Database administration, cloud infrastructure, WebLogic, and enterprise application training.',
    icon: 'O',
    list: [
      'Oracle Database 19c: Administration Workshop',
      'Oracle Cloud Infrastructure Architect Associate',
      'Oracle WebLogic Server 14c: Administration I',
      'Oracle Data Integrator 12c: Integration and Administration Ed 3',
      'Oracle Database 19c: Multitenant Architecture',
      'Oracle Database 19c: SQL Workshop',
      'Oracle Exadata Database Machine: Implementation and Administration',
      'Oracle WebLogic Server 14c: Administration II',
      'Application Integration on Oracle Cloud Ed 4',
      'Oracle Database 23ai: New Features for Administrators',
      'Oracle SOA Suite 12c: Build Composite Applications Ed 2',
      'Primavera P6 Professional Fundamentals Rel 19 Ed 1',
      'Oracle Database 19c: Data Guard Administration Workshop',
      'Primavera P6 Professional Project Management Rel 19 Ed 1',
      'Oracle Database 19c: Backup and Recovery',
    ],
  },
  {
    id: 'comptia', name: 'CompTIA', tier: 'Platinum Partner', color: '#C8002F', bg: '#FFF5F7',
    courses: 180,
    desc: 'Vendor-neutral IT fundamentals, networking, security, and cloud certifications.',
    icon: 'CT',
    list: [
      'CompTIA Security+ SY0-701',
      'CompTIA Network+ (N10-009)',
      'CompTIA A+ Core 1 and 2 (220-1101 and 220-1102)',
      'CompTIA Cybersecurity Analyst (CySA+)',
      'CompTIA PenTest+ (PT0-002)',
      'CompTIA Linux+ XK0-005',
      'CompTIA Data+ DA0-001',
      'CompTIA Advanced Security Practitioner (CASP+) CAS-004',
      'CompTIA Cloud+ CV0-004',
      'CompTIA SecurityX CAS-005',
      'IT Fundamentals+ (ITF+)',
      'CompTIA Cloud Essentials+',
      'CompTIA Server+ (SK0-005)',
    ],
  },
  {
    id: 'pecb', name: 'PECB', tier: 'Authorized Partner', color: '#1A5276', bg: '#EBF5FB',
    courses: 80,
    desc: 'ISO management system certifications covering security, quality, risk, and compliance.',
    icon: 'P',
    list: [
      'ISO/IEC 27001 Lead Implementer',
      'ISO/IEC 27001 Lead Auditor',
      'ISO 31000 Lead Risk Manager',
      'ISO 9001 Lead Auditor',
      'ISO 9001 Lead Implementer',
      'ISO/IEC 42001 Lead Implementer',
      'ISO 22301 Lead Implementer',
      'Certified Digital Transformation Officer',
      'ISO/IEC 27001:2022 Foundation',
      'ISO 18788 Lead Auditor',
      'ISO/IEC 27005 Lead Risk Manager',
      'GDPR Foundation',
      'Lead Cybersecurity Manager',
      'ISO 22301 Lead Auditor',
      'ISO 14001 Environmental Management Lead Implementer',
    ],
  },
  {
    id: 'isc2', name: 'ISC2', tier: 'Official Partner', color: '#2E4057', bg: '#F0F4F8',
    courses: 50,
    desc: 'Advanced information security credentials including CISSP, CCSP, and SSCP.',
    icon: 'I2',
    list: [
      'Certified Information Systems Security Professional (CISSP)',
      'Certified Cloud Security Professional (CCSP)',
      'Certified in Governance, Risk and Compliance (CGRC)',
      'ISSAP – Information Systems Security Architecture Professional',
      'Systems Security Certified Practitioner (SSCP)',
      'Certified in Cybersecurity (CC)',
      'ISSEP – Information Systems Security Engineering Professional',
      'ISSMP – Information Systems Security Management Professional',
      'Certified Authorization Professional (CAP)',
    ],
  },
  {
    id: 'peoplecert', name: 'PeopleCert', tier: 'ATO Partner', color: '#6B2FA0', bg: '#F9F0FF',
    courses: 90,
    desc: 'ITIL, PRINCE2, and Lean Six Sigma professional service management certifications.',
    icon: 'PC',
    list: [
      'ITIL® 4 Foundation',
      'ITIL® 4 Specialist: Create, Deliver and Support',
      'ITIL® 4 Leader: Digital and IT Strategy',
      'ITIL® 4 Strategist: Direct, Plan, and Improve',
      'ITIL® 4 Specialist: Drive Stakeholder Value',
      'ITIL® 4 Specialist: High-velocity IT',
      'ITIL® 4 Specialist: Monitor, Support and Fulfil',
      'PRINCE2® 7 Foundation and Practitioner',
      'PRINCE2® 7 Foundation',
      'PRINCE2® 7 Practitioner',
      'PRINCE2 Agile® Foundation and Practitioner',
      'PRINCE2 Agile® Practitioner',
      'IASSC® Certified Lean Six Sigma Green Belt™',
      'IASSC® Certified Lean Six Sigma Yellow Belt™',
      'IASSC® Certified Lean Six Sigma Black Belt™',
    ],
  },
  {
    id: 'isaca', name: 'ISACA', tier: 'Authorized Partner', color: '#003366', bg: '#EEF3FA',
    courses: 60,
    desc: 'IT governance, audit, risk management, and cybersecurity framework certifications.',
    icon: 'IS',
    list: [
      'Certified Information Security Manager (CISM)',
      'Certified Information Systems Auditor (CISA)',
      'CRISC – Certified in Risk and Information Systems Control',
      'Certified in the Governance of Enterprise IT (CGEIT)',
      'COBIT 2019 Foundation',
      'IT Risk Fundamentals',
      'Certified Data Privacy Solutions Engineer (CDPSE)',
      'COBIT 2019 Design and Implementation',
      'Cyber Security Audit',
      'Implementing NIST Cyber Security Framework using COBIT 2019',
      'Certificate of Cloud Auditing Knowledge (CCAK)',
      'Cloud Fundamentals Certificate',
      'IT Audit Fundamental Certificate',
    ],
  },
  {
    id: 'sap', name: 'SAP', tier: 'Gold Partner', color: '#007DB8', bg: '#EEF7FC',
    courses: 140,
    desc: 'SAP S/4HANA, Fiori, SuccessFactors, Ariba and enterprise ERP training.',
    icon: 'SA',
    list: [
      'SAP S/4HANA Overview (S4H00)',
      'UX100 – SAP Fiori Foundation',
      'ACT100 – SAP Activate Methodology',
      'SAP Master Data Governance on SAP S/4HANA (MDG100)',
      'MDG200 – SAP Master Data Governance: Configuration and Customizing',
      'Business Processes in Quality Management with SAP S/4HANA (S4140)',
      'SAP Basis Administration',
      'Implementing SAP S/4HANA Cloud Private Edition',
      'SAP SuccessFactors Employee Central Administration',
      'RISE with SAP S/4HANA Cloud, private edition Onboarding Fundamentals',
      'ADM328 – SAP S/4HANA Conversion and SAP System Upgrade',
      'SAP HCM (Human Capital Management)',
      'SAP Ariba Strategic Sourcing: System Administration (AR710)',
      'Data Services – Platform and Transforms (DS10)',
      'Financial Accounting in SAP S/4HANA – Academy Part I (TS4F01)',
    ],
  },
  {
    id: 'ec-council', name: 'EC-Council', tier: 'ATC Partner', color: '#E31E25', bg: '#FFF4F4',
    courses: 120,
    desc: 'Ethical hacking, penetration testing, SOC analysis, and advanced cybersecurity certifications.',
    icon: 'EC',
    list: [
      'Certified Ethical Hacker v13 AI (CEH)',
      'Certified Penetration Testing Professional v1 (CPENT)',
      'Certified Chief Information Security Officer v3 (CCISO)',
      'Certified SOC Analyst v1 (CSA)',
      'EC-Council Certified Incident Handler v3 (ECIH)',
      'ICS/SCADA Cybersecurity',
      'Web Application Hacking and Security (WAHS)',
      'Computer Hacking Forensic Investigator v11 (CHFI)',
      'Certified Cloud Security Engineer v2',
      'Certified Threat Intelligence Analyst v2 (CTIA)',
      'Certified Blockchain Professional v2 (CBP)',
      'Certified Network Defender v3 (CND)',
      'EC-Council Disaster Recovery Professional v3 (EDRP)',
      'Certified Cybersecurity Technician v1 (CCT)',
    ],
  },
  {
    id: 'redhat', name: 'Red Hat', tier: 'Advanced Partner', color: '#CC0000', bg: '#FFF5F5',
    courses: 110,
    desc: 'Linux system administration, OpenShift containerization, and enterprise open-source training.',
    icon: 'RH',
    list: [
      'Red Hat System Administration I (RH124) – RHEL 9',
      'Red Hat System Administration II (RH134) – RHEL 9',
      'Red Hat System Administration III: Linux Automation (RH294) – RHEL 9',
      'RHCSA Rapid Track (RH199) – RHEL 9',
      'DO180: Red Hat OpenShift Administration I: Operating a Production Cluster',
      'Red Hat OpenShift Administration II: Configuring a Production Cluster (DO280)',
      'Red Hat OpenShift Developer II: Building Kubernetes Applications (DO288)',
      'DO188 – Red Hat OpenShift Development I: Introduction to Containers with Podman',
      'Red Hat Security: Linux in Physical, Virtual, and Cloud (RH415)',
      'Red Hat JBoss Application Administration I (AD248)',
      'RH436 – Red Hat High Availability Clustering',
      'Red Hat OpenShift Installation Lab (DO322)',
      'Red Hat Ceph Storage for OpenStack (CL260)',
      'DO328 – Building Resilient Microservices with Istio and Red Hat OpenShift Service Mesh',
    ],
  },
  {
    id: 'pmi', name: 'PMI', tier: 'Premier Partner', color: '#00507F', bg: '#EEF4FA',
    courses: 140,
    desc: 'Project, program, and portfolio management credentials including PMP and agile frameworks.',
    icon: 'PM',
    list: [
      'Project Management Professional (PMP®) Certification Training',
      'Certified Associate in Project Management (CAPM) Certification Training',
      'PMI Agile Certified Practitioner (PMI-ACP)® Exam Preparation',
      'Program Management Professional (PgMP)',
      'Portfolio Management Professional (PfMP)',
      'Professional in Business Analysis (PMI-PBA®) Certification Exam Prep',
      'Disciplined Agile® Scrum Master (DASM)',
      'PMI Scheduling Professional (PMI-SP)',
      'Disciplined Agile® Coach (DAC)',
      'Disciplined Agile® Senior Scrum Master (DASSM)',
      'PMI-ACP Exam Preparation (5 days)',
      'Change Management for Project Managers',
      'Understanding Project Budget and Accounting',
      'Project Portfolio Management',
    ],
  },
  {
    id: 'bcs', name: 'BCS', tier: 'ATO Partner', color: '#004B87', bg: '#EEF3F9',
    courses: 35,
    desc: 'Business analysis, enterprise architecture, and IT project management certifications.',
    icon: 'BC',
    list: [
      'BCS Foundation Certificate in Business Analysis',
      'BCS Practitioner Certificate in Business Analysis Practice',
      'BCS Practitioner Certificate in Enterprise and Solution Architecture',
      'Professional Certificate in Agile Business Analysis',
      'BCS Practitioner Certificate in Information Assurance Architecture',
      'BCS Foundation Certificate in Architecture Concepts and Domains',
      'BCS Professional Certificate in Business Architecture',
      'BCS Practitioner Certificate in Data Management Essentials',
      'IS Project Management',
    ],
  },
  {
    id: 'koenig-original', name: 'Koenig Original', tier: 'Proprietary Curriculum', color: '#0694D1', bg: '#EDF7FF',
    courses: 45,
    desc: 'Exclusive Koenig-developed programs in AI, Data Science, DevOps, Finance, and emerging tech.',
    icon: 'KO',
    list: [
      'Generative AI Specialty',
      'Power BI Advanced',
      'Advanced JavaScript with TypeScript',
      'DP-600 Exam Prep',
      'Microsoft 365 for Exchange Online Administrators',
      'Basic to Advanced Excel',
      'Exam Prep: AWS Certified Cloud Practitioner',
      'Digital Banking and Financial Services',
      'Java Full Stack – Spring Boot and Angular',
      'Financial Risk Management',
      'Microsoft Dynamics 365 CRM Developer',
      'Basic DevOps',
      'Advanced Python Programming',
      'ISO 27031 IT Disaster Recovery & Business Continuity Management',
      'Data Science with Python',
    ],
  },
]

const ALL_OEMS = ['All OEMs', ...VENDORS.map(v => v.name).sort((a, b) => a.localeCompare(b))]
const ALL_TECHNOLOGIES = ['All Technologies', ...['Cloud', 'Cybersecurity', 'Data & AI', 'Database', 'DevOps', 'ERP', 'Linux', 'Networking', 'Project Management'].sort((a, b) => a.localeCompare(b))]
const DURATION_ITEMS = [
  { label: '4 hrs',  days: '½ day'  },
  { label: '8 hrs',  days: '1 day'  },
  { label: '16 hrs', days: '2 days' },
  { label: '24 hrs', days: '3 days' },
  { label: '32 hrs', days: '4 days' },
  { label: 'More',   days: '5+ days'},
]
const TRAINING_MODES = ['Only GTR', 'Only Live Online', 'Only Classroom', 'Self-Paced']
const CLASSROOM_CITIES = ['Bangalore', 'Chennai', 'Delhi / NCR', 'Dubai', 'Hyderabad', 'Jaipur', 'Kolkata', 'London', 'Mumbai', 'New York', 'Pune', 'Singapore']

/* ─── Dropdown component ────────────────────────────────── */
function SelectDropdown({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isDefault = value === options[0]

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
        style={{
          border: `1.5px solid ${isDefault ? '#D1D5DB' : '#0694D1'}`,
          color: isDefault ? '#374151' : '#0694D1',
          background: isDefault ? '#fff' : '#EDF7FF',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute z-50 mt-1 py-1 rounded-xl overflow-hidden"
          style={{ background: '#fff', border: '1.5px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '160px', top: '100%', left: 0 }}
        >
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false) }}
              className="w-full text-left px-4 py-2 text-sm transition-colors"
              style={{
                background: value === opt ? '#EDF7FF' : 'transparent',
                color: value === opt ? '#0694D1' : '#374151',
                fontWeight: value === opt ? 600 : 400,
              }}
              onMouseEnter={e => { if (value !== opt) (e.currentTarget as HTMLButtonElement).style.background = '#F9FAFB' }}
              onMouseLeave={e => { if (value !== opt) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Inline dropdown (borderless, sits inside a cell) ─── */
function InlineSelect({ value, options, onChange, placeholder, searchable }: { value: string; options: string[]; onChange: (v: string) => void; placeholder: string; searchable?: boolean }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setQuery('') }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
  useEffect(() => {
    if (open && searchable) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open, searchable])
  const isDefault = value === options[0]
  const filtered = searchable && query
    ? [options[0], ...options.slice(1).filter(o => o.toLowerCase().includes(query.toLowerCase()))]
    : options
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-1 text-sm w-full text-left">
        <span className="flex-1 truncate" style={{ color: isDefault ? '#94a3b8' : '#0b2545', fontWeight: isDefault ? 400 : 500 }}>
          {isDefault ? placeholder : value}
        </span>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="#94a3b8" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 rounded-xl overflow-hidden" style={{ background: '#fff', border: '1.5px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '200px', top: '100%', left: 0 }}>
          {searchable && (
            <div className="px-3 pt-2.5 pb-2" style={{ borderBottom: '1px solid #EEF3F9' }}>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: '#F1F5F9' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search partner…"
                  className="flex-1 bg-transparent outline-none text-xs"
                  style={{ color: '#374151', caretColor: '#0694D1' }}
                  onKeyDown={e => e.key === 'Escape' && (setOpen(false), setQuery(''))}
                />
                {query && (
                  <button onClick={() => setQuery('')} className="leading-none text-sm" style={{ color: '#94a3b8' }}>×</button>
                )}
              </div>
            </div>
          )}
          <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
            {filtered.length === 1 && query ? (
              <p className="px-4 py-3 text-xs" style={{ color: '#94a3b8' }}>No results for "{query}"</p>
            ) : (
              filtered.map(opt => (
                <button key={opt} onClick={() => { onChange(opt); setOpen(false); setQuery('') }}
                  className="w-full text-left px-4 py-2 text-sm"
                  style={{ background: value === opt ? '#EDF7FF' : 'transparent', color: value === opt ? '#0694D1' : '#374151', fontWeight: value === opt ? 600 : 400 }}
                  onMouseEnter={e => { if (value !== opt) (e.currentTarget as HTMLButtonElement).style.background = '#F9FAFB' }}
                  onMouseLeave={e => { if (value !== opt) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                >{opt}</button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── City searchable dropdown (for Classroom mode) ─────── */
function CitySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setQuery('') }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
  useEffect(() => {
    if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])
  const filtered = query ? CLASSROOM_CITIES.filter(c => c.toLowerCase().includes(query.toLowerCase())) : CLASSROOM_CITIES
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm transition-colors"
        style={{
          border: `1.5px solid ${value ? '#0694D1' : '#E2EBF6'}`,
          background: value ? '#EDF7FF' : '#F8FAFC',
          color: value ? '#0694D1' : '#64748b',
          fontWeight: value ? 600 : 400,
        }}>
        <span>{value || 'Select city'}</span>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0, opacity: 0.6 }}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-1.5 rounded-xl overflow-hidden"
          style={{ background: '#fff', border: '1.5px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '200px', top: '100%', left: 0 }}>
          <div className="px-3 pt-2.5 pb-2" style={{ borderBottom: '1px solid #EEF3F9' }}>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: '#F1F5F9' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search city…"
                className="flex-1 bg-transparent outline-none text-xs"
                style={{ color: '#374151', caretColor: '#0694D1' }}
                onKeyDown={e => e.key === 'Escape' && (setOpen(false), setQuery(''))}
              />
              {query && <button onClick={() => setQuery('')} className="leading-none text-sm" style={{ color: '#94a3b8' }}>×</button>}
            </div>
          </div>
          <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-xs" style={{ color: '#94a3b8' }}>No city found</p>
            ) : filtered.map(city => {
              const sel = value === city
              return (
                <button key={city} onClick={() => { onChange(sel ? '' : city); setOpen(false); setQuery('') }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left"
                  style={{ background: sel ? '#EDF7FF' : 'transparent', color: sel ? '#0694D1' : '#374151', fontWeight: sel ? 600 : 400 }}
                  onMouseEnter={e => { if (!sel) (e.currentTarget as HTMLButtonElement).style.background = '#F9FAFB' }}
                  onMouseLeave={e => { if (!sel) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, flexShrink: 0 }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {city}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Duration multi-select checkbox dropdown ───────────── */
function DurationSelect({ values, onChange }: { values: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
  const toggle = (label: string) => {
    onChange(values.includes(label) ? values.filter(v => v !== label) : [...values, label])
  }
  const label = values.length === 0 ? 'Any length' : values.length === 1 ? values[0] : `${values.length} selected`
  const hasValue = values.length > 0
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-1 text-sm w-full text-left">
        <span className="flex-1 truncate" style={{ color: hasValue ? '#0b2545' : '#94a3b8', fontWeight: hasValue ? 500 : 400 }}>{label}</span>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="#94a3b8"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 rounded-xl overflow-hidden"
          style={{ background: '#fff', border: '1.5px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '210px', top: '100%', left: 0 }}>
          <div className="px-3 py-2" style={{ borderBottom: '1px solid #EEF3F9' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#0694D1' }}>Duration</p>
          </div>
          <div className="py-1">
            {DURATION_ITEMS.map(({ label: lbl, days }) => {
              const checked = values.includes(lbl)
              return (
                <button key={lbl} onClick={() => toggle(lbl)}
                  className="w-full flex items-center justify-between px-4 py-2.5 transition-colors"
                  style={{ background: checked ? '#EDF7FF' : 'transparent' }}
                  onMouseEnter={e => { if (!checked) (e.currentTarget as HTMLButtonElement).style.background = '#F9FAFB' }}
                  onMouseLeave={e => { if (!checked) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center rounded flex-shrink-0"
                      style={{ width: 16, height: 16, border: `2px solid ${checked ? '#0694D1' : '#CBD5E1'}`, background: checked ? '#0694D1' : '#fff' }}>
                      {checked && (
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm" style={{ color: checked ? '#0694D1' : '#374151', fontWeight: checked ? 600 : 400 }}>{lbl}</span>
                  </div>
                  <span className="text-xs" style={{ color: '#94a3b8' }}>{days}</span>
                </button>
              )
            })}
          </div>
          {hasValue && (
            <div className="px-4 py-2" style={{ borderTop: '1px solid #EEF3F9' }}>
              <button onClick={() => onChange([])} className="text-xs font-semibold" style={{ color: '#0694D1' }}>Clear</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── Price range radio dropdown ────────────────────────── */
const PRICE_RANGES = [
  'INR 0 to 10,000',
  'INR 10,000 to 20,000',
  'INR 20,000 to 30,000',
  'INR 30,000 to 40,000',
  'INR 40,000 to 50,000',
  'INR 50,000 to 60,000',
  'INR 60,000 to 70,000',
  'INR 70,000 to 80,000',
  'INR 80,000 to 90,000',
  'INR 90,000 to 1,00,000',
  'Above 1 lakh',
]

function BudgetSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setQuery('') }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
  useEffect(() => {
    if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])
  const filtered = query ? PRICE_RANGES.filter(r => r.toLowerCase().includes(query.toLowerCase())) : PRICE_RANGES
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-1 text-sm w-full text-left">
        <span className="flex-1 truncate" style={{ color: value ? '#0b2545' : '#94a3b8', fontWeight: value ? 500 : 400 }}>
          {value || 'Select Range'}
        </span>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="#94a3b8"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 rounded-xl overflow-hidden"
          style={{ background: '#fff', border: '1.5px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '220px', top: '100%', left: 0 }}>
          {/* Header */}
          <div className="px-4 pt-3 pb-2.5" style={{ borderBottom: '1px solid #EEF3F9' }}>
            <p className="text-xs font-bold text-center mb-2" style={{ color: '#64748b' }}>Price Range</p>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: '#F1F5F9' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search range…"
                className="flex-1 bg-transparent outline-none text-xs"
                style={{ color: '#374151', caretColor: '#0694D1' }}
                onKeyDown={e => e.key === 'Escape' && (setOpen(false), setQuery(''))}
              />
              {query && <button onClick={() => setQuery('')} className="leading-none text-sm" style={{ color: '#94a3b8' }}>×</button>}
            </div>
          </div>
          {/* Radio list */}
          <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-xs" style={{ color: '#94a3b8' }}>No results for "{query}"</p>
            ) : filtered.map(range => {
              const selected = value === range
              return (
                <button key={range}
                  onClick={() => { onChange(selected ? '' : range); setOpen(false); setQuery('') }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left"
                  style={{ background: selected ? '#EDF7FF' : 'transparent' }}
                  onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLButtonElement).style.background = '#F9FAFB' }}
                  onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                >
                  {/* Radio circle */}
                  <div className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width: 18, height: 18, border: `2px solid ${selected ? '#0694D1' : '#CBD5E1'}` }}>
                    {selected && <div className="rounded-full" style={{ width: 8, height: 8, background: '#0694D1' }} />}
                  </div>
                  <span className="text-sm" style={{ color: selected ? '#0694D1' : '#374151', fontWeight: selected ? 600 : 400 }}>{range}</span>
                </button>
              )
            })}
          </div>
          {value && (
            <div className="px-4 py-2" style={{ borderTop: '1px solid #EEF3F9' }}>
              <button onClick={() => { onChange(''); setQuery('') }} className="text-xs font-semibold" style={{ color: '#0694D1' }}>Clear</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── Date range calendar picker ────────────────────────── */
const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function toCalIso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getCalDays(year: number, month: number): Date[] {
  const first = new Date(year, month, 1)
  const start = new Date(year, month, 1 - first.getDay())
  return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
}

function DateRangeSelect({ startDate, endDate, onChange }: { startDate: string; endDate: string; onChange: (s: string, e: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const now = new Date()
  const todayIso = toCalIso(now)
  const [calYear, setCalYear] = useState(now.getFullYear())
  const [calMonth, setCalMonth] = useState(now.getMonth())
  const [picking, setPicking] = useState<'start' | 'end'>('start')
  const [hoverDate, setHoverDate] = useState('')

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false); setHoverDate('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const fmt = (d: string) => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }) : ''
  const hasValue = !!(startDate || endDate)
  const label = hasValue ? `${fmt(startDate) || '…'} – ${fmt(endDate) || '…'}` : 'Select Date Range'

  const month2 = calMonth === 11 ? 0 : calMonth + 1
  const year2 = calMonth === 11 ? calYear + 1 : calYear

  const prevMonth = () => calMonth === 0 ? (setCalMonth(11), setCalYear(y => y - 1)) : setCalMonth(m => m - 1)
  const nextMonth = () => calMonth === 11 ? (setCalMonth(0), setCalYear(y => y + 1)) : setCalMonth(m => m + 1)

  const handleOpen = () => {
    if (!open) {
      setPicking(startDate && !endDate ? 'end' : 'start')
      setHoverDate('')
    }
    setOpen(o => !o)
  }

  const handleDayClick = (iso: string) => {
    if (picking === 'start') {
      onChange(iso, '')
      setPicking('end')
    } else {
      if (iso <= startDate) {
        onChange(iso, '')
        setPicking('end')
      } else {
        onChange(startDate, iso)
        setPicking('start')
        setHoverDate('')
        setOpen(false)
      }
    }
  }

  const renderDay = (d: Date, monthRef: number) => {
    const iso = toCalIso(d)
    const inMonth = d.getMonth() === monthRef
    const isPast = iso < todayIso
    const isToday = iso === todayIso
    const isStart = iso === startDate
    const isEnd = iso === endDate
    const dispEnd = picking === 'end' && hoverDate ? hoverDate : endDate
    const [a, b] = startDate && dispEnd && startDate <= dispEnd ? [startDate, dispEnd] : [dispEnd || '', startDate || '']
    const inRange = !!(a && b && iso > a && iso < b)
    const isEndpoint = isStart || isEnd || (picking === 'end' && hoverDate && iso === hoverDate)

    if (!inMonth) return <div key={iso} style={{ height: 36 }} />
    return (
      <div key={iso} className="flex items-center justify-center"
        style={{ height: 36, background: inRange ? '#EBF5FB' : undefined }}>
        <button
          onClick={() => !isPast && handleDayClick(iso)}
          onMouseEnter={() => picking === 'end' && startDate && setHoverDate(iso)}
          onMouseLeave={() => setHoverDate('')}
          className={`flex items-center justify-center rounded-full select-none transition-colors
            ${!isPast && !isEndpoint ? 'hover:bg-[#EDF7FF]' : ''}
          `}
          style={{
            width: 34, height: 34,
            background: isEndpoint ? '#0694D1' : undefined,
            color: isPast ? '#b0bec5' : isEndpoint ? '#fff' : isToday ? '#0694D1' : '#1a2e44',
            fontWeight: isEndpoint || isToday ? 700 : 400,
            fontSize: 14,
            cursor: isPast ? 'default' : 'pointer',
            outline: isToday && !isEndpoint ? '2px solid #0694D1' : undefined,
            outlineOffset: '-1px',
          }}
        >
          {d.getDate()}
        </button>
      </div>
    )
  }

  const month1Days = getCalDays(calYear, calMonth)
  const month2Days = getCalDays(year2, month2)
  const lbl1 = new Date(calYear, calMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const lbl2 = new Date(year2, month2, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const NavArrow = ({ dir }: { dir: 'left' | 'right' }) => (
    <button
      onClick={dir === 'left' ? prevMonth : nextMonth}
      className="flex items-center justify-center rounded-full transition-colors hover:bg-slate-100"
      style={{ width: 28, height: 28, flexShrink: 0, color: '#0694D1' }}
    >
      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
        {dir === 'left'
          ? <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0z" clipRule="evenodd" />
          : <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
        }
      </svg>
    </button>
  )

  return (
    <div ref={ref} className="relative">
      <button onClick={handleOpen} className="flex items-center gap-1 text-sm w-full text-left">
        <span className="flex-1 truncate" style={{ color: hasValue ? '#0b2545' : '#94a3b8', fontWeight: hasValue ? 500 : 400 }}>{label}</span>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="#94a3b8"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 rounded-xl overflow-hidden"
          style={{ background: '#fff', border: '1px solid #E2EBF6', boxShadow: '0 4px 24px rgba(6,148,209,0.13)', top: '100%', left: 0, minWidth: '560px' }}>
          <div className="grid grid-cols-2 divide-x divide-[#E2EBF6]">
            {/* Month 1 */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <NavArrow dir="left" />
                <span className="font-bold text-sm" style={{ color: '#0b2545' }}>{lbl1}</span>
                <span className="w-6" />
              </div>
              <div className="grid grid-cols-7 mb-1">
                {DAY_LABELS.map((l, i) => (
                  <div key={l} className="flex items-center justify-center text-[11px] font-bold py-1"
                    style={{ color: i === 0 || i === 6 ? '#78909C' : '#90a4ae' }}>{l}</div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {month1Days.map(d => renderDay(d, calMonth))}
              </div>
            </div>
            {/* Month 2 */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="w-6" />
                <span className="font-bold text-sm" style={{ color: '#0b2545' }}>{lbl2}</span>
                <NavArrow dir="right" />
              </div>
              <div className="grid grid-cols-7 mb-1">
                {DAY_LABELS.map((l, i) => (
                  <div key={l} className="flex items-center justify-center text-[11px] font-bold py-1"
                    style={{ color: i === 0 || i === 6 ? '#78909C' : '#90a4ae' }}>{l}</div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {month2Days.map(d => renderDay(d, month2))}
              </div>
            </div>
          </div>
          {hasValue && (
            <div className="flex justify-end px-4 py-2" style={{ borderTop: '1px solid #EEF3F9' }}>
              <button onClick={() => { onChange('', ''); setPicking('start') }}
                className="text-xs font-semibold"
                style={{ color: '#0694D1' }}>
                Clear dates
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── Chevron ───────────────────────────────────────────── */
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0"
      style={{ transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
    </svg>
  )
}

/* ─── Vendor Accordion Card ─────────────────────────────── */
function VendorCard({ vendor, forceOpen, searchQuery }: { vendor: typeof VENDORS[0]; forceOpen: boolean; searchQuery: string }) {
  const [open, setOpen] = useState(false)
  const isOpen = forceOpen || open

  const filtered = useMemo(() => {
    if (!searchQuery) return vendor.list
    return vendor.list.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [vendor.list, searchQuery])

  const hidden = searchQuery && filtered.length === 0 && !vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
  if (hidden) return null

  const displayList = searchQuery ? filtered : vendor.list
  const effective = searchQuery ? true : isOpen

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: `1.5px solid ${vendor.color}22`, boxShadow: '0 1px 8px rgba(0,0,0,0.05)', background: '#fff', transition: 'box-shadow 0.2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 18px rgba(0,0,0,0.09)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 8px rgba(0,0,0,0.05)' }}
    >
      {/* Header */}
      <button
        className="w-full text-left flex items-center gap-4 px-5 py-4"
        style={{ background: vendor.bg }}
        onClick={() => setOpen(o => !o)}
      >
        <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white text-xs flex-shrink-0"
          style={{ background: vendor.color }}>
          {vendor.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm" style={{ color: '#0b2545' }}>{vendor.name}</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${vendor.color}18`, color: vendor.color }}>
              {vendor.tier}
            </span>
          </div>
          <p className="text-xs mt-0.5 truncate" style={{ color: '#64748b' }}>{vendor.desc}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden sm:block text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${vendor.color}14`, color: vendor.color }}>
            {vendor.courses}+ courses
          </span>
          <span style={{ color: vendor.color }}><ChevronIcon open={effective} /></span>
        </div>
      </button>

      {/* Course list */}
      <div style={{ maxHeight: effective ? '9999px' : '0px', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <div className="px-5 pb-5 pt-3 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {displayList.map((course, i) => (
              <div key={i}
                className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-colors duration-150"
                style={{ background: '#f8fafc' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = vendor.bg }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#f8fafc' }}
              >
                <span className="flex-shrink-0 rounded-full mt-[5px]" style={{ width: 7, height: 7, background: vendor.color }} />
                <span className="text-sm leading-snug" style={{ color: '#1e3a5f' }}>{course}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            <a href="https://www.koenig-solutions.com/" target="_blank" rel="noopener noreferrer"
              className="text-xs font-bold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-80"
              style={{ background: vendor.color }}>
              View All {vendor.name} Courses →
            </a>
            <a href="https://www.koenig-solutions.com/contact" target="_blank" rel="noopener noreferrer"
              className="text-xs font-bold px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
              style={{ background: `${vendor.color}10`, color: vendor.color, border: `1.5px solid ${vendor.color}28` }}>
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function CorporateITTrainingPage() {
  const [search, setSearch] = useState('')
  const [expandAll, setExpandAll] = useState(false)
  const [durations, setDurations] = useState<string[]>([])
  const [oem, setOem] = useState('All OEMs')
  const [technology, setTechnology] = useState('All Technologies')
  const [budget, setBudget] = useState('')
  const [modes, setModes] = useState<string[]>([])
  const [classroomCity, setClassroomCity] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  function toggleMode(m: string) {
    setModes(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
    if (m === 'Only Classroom' && modes.includes('Only Classroom')) setClassroomCity('')
  }

  const activeSearch = search || (oem !== 'All OEMs' ? oem : '')

  const visibleCount = useMemo(() => {
    return VENDORS.filter(v => {
      const q = activeSearch.toLowerCase()
      if (!q) return true
      return v.name.toLowerCase().includes(q) || v.list.some(c => c.toLowerCase().includes(q))
    }).length
  }, [activeSearch])

  const totalCourses = VENDORS.reduce((s, v) => s + v.courses, 0)

  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif", background: '#f5f9fc', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO (ILO style) ──────────────────────────────── */}
      <section className="relative overflow-hidden px-4 lg:px-[50px]"
        style={{ background: 'linear-gradient(135deg, #061624 0%, #071929 60%, #062236 100%)' }}>

        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-1/3 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: '#0694D1' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: '#38bdf8' }} />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full opacity-[0.08] blur-[80px]" style={{ background: '#0694D1' }} />
        </div>

        <style>{`
          .cit-stat:hover .cit-glow { opacity: 1 !important; }
        `}</style>

        <div className="relative mx-auto max-w-7xl py-[35px]">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
                style={{ background: 'rgba(6,148,209,0.18)', color: '#38bdf8', border: '1px solid rgba(6,148,209,0.35)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                Corporate IT Training — 17 Vendor Categories
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-bold leading-tight mb-4 text-white">
                <span className="block">Train Your Team.</span>
                <span className="block" style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  5,000+ Certified Courses.
                </span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Vendor-authorized corporate IT certification training across Microsoft, AWS, Cisco, Oracle, and 13+ more partners. Guaranteed batch schedules, group discounts, and 1-on-1 options available.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <a href="https://www.koenig-solutions.com/contact" target="_blank" rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #0694D1)', boxShadow: '0 0 20px rgba(6,148,209,0.35)' }}>
                  Request Corporate Quote
                </a>
                <a href="#courses"
                  className="inline-flex justify-center items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:bg-white/10"
                  style={{ border: '1.5px solid rgba(6,148,209,0.6)', color: '#38bdf8', background: 'rgba(6,148,209,0.08)' }}>
                  Browse All Courses
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>

              {/* Mobile stat grid */}
              <div className="lg:hidden mt-8 grid grid-cols-2"
                style={{ borderRadius: 16, border: '1px solid rgba(6,148,209,0.18)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                {[
                  { val: '5,000+', label: 'Courses available' },
                  { val: '1M+',    label: 'Professionals trained' },
                  { val: '195+',   label: 'Countries served' },
                  { val: '95%',    label: 'First-attempt pass rate' },
                ].map(({ val, label }, i) => (
                  <div key={val} style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 4, borderRight: i % 2 === 0 ? '1px solid rgba(6,148,209,0.12)' : 'none', borderBottom: i < 2 ? '1px solid rgba(6,148,209,0.12)' : 'none' }}>
                    <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, background: 'linear-gradient(135deg, #ffffff 0%, #50e6ff 60%, #0694D1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{val}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — stat + partner cards (desktop) */}
            <div className="hidden lg:flex flex-col gap-4">
              {/* Stats card */}
              <div style={{ borderRadius: 20, border: '1px solid rgba(6,148,209,0.15)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,148,209,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
                {[
                  [{ icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>, val: '5,000+', label: 'Total Courses' },
                   { icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>, val: '195+', label: 'Countries Served' }],
                  [{ icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>, val: '1M+', label: 'Professionals Trained' },
                   { icon: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>, val: '95%', label: 'First-Attempt Pass Rate' }],
                ].map((row, ri) => (
                  <div key={ri}>
                    {ri > 0 && <div style={{ height: 1, background: 'rgba(6,148,209,0.12)' }} />}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
                      {row.map((s, ci) => (
                        <div key={ci}>
                          {ci > 0 && <div style={{ background: 'rgba(6,148,209,0.12)', width: 1, height: '100%' }} />}
                          <div className="cit-stat" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
                            <div className="cit-glow" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(6,148,209,0.5), transparent)', opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{s.icon}</svg>
                              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #ffffff 0%, #50e6ff 60%, #0694D1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
                            </div>
                            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Partners card */}
              <div style={{ borderRadius: 20, border: '1px solid rgba(6,148,209,0.15)', background: 'rgba(255,255,255,0.02)', padding: '20px 22px', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: 20, background: 'linear-gradient(135deg, rgba(6,148,209,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                    <div style={{ fontSize: 26, fontWeight: 800, background: 'linear-gradient(135deg, #ffffff 0%, #50e6ff 60%, #0694D1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>17+</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginLeft: 4 }}>Authorised Vendor Partners</div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {['Microsoft', 'AWS', 'Cisco', 'CompTIA', 'EC-Council', 'PMI', 'Oracle', 'Red Hat', 'VMware', 'SAP'].map(p => (
                      <span key={p} style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.5)' }}>{p}</span>
                    ))}
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: 'rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.25)', color: '#38bdf8' }}>+7 more</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FIND YOUR COURSE ─────────────────────────────────── */}
      <section id="courses" className="max-w-7xl mx-auto px-4 lg:px-[50px] py-10">

        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#0b2545' }}>Find Your Course</h2>
          <p className="text-sm" style={{ color: '#64748b' }}>Use the filters below to narrow down from 5,000+ courses across 17 vendors</p>
        </div>

        {/* ── Filter section ── */}
        <div>

          {/* Row 1: 5 individual filter cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-3">

            {(() => {
              const card = (active: boolean) => ({
                background: active ? '#EFF8FF' : '#fff',
                border: `1.5px solid ${active ? '#0694D1' : '#E2EBF6'}`,
                boxShadow: active ? '0 4px 18px rgba(6,148,209,0.18)' : '0 4px 18px rgba(0,0,0,0.08)',
                transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
              })
              const iconBox = (svg: React.ReactNode) => (
                <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: '#EDF4FF' }}>{svg}</div>
              )
              return (
                <>
                  {/* Date Range */}
                  <div className="col-span-2 lg:col-span-1 rounded-2xl p-4" style={card(!!(startDate || endDate))}>
                    <div className="flex items-center gap-2 mb-3">
                      {iconBox(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>)}
                      <span className="text-xs font-bold uppercase" style={{ color: '#94a3b8', letterSpacing: '0.09em' }}>Date Range</span>
                    </div>
                    <DateRangeSelect startDate={startDate} endDate={endDate} onChange={(s, e) => { setStartDate(s); setEndDate(e) }} />
                  </div>

                  {/* Partner */}
                  <div className="rounded-2xl p-4" style={card(oem !== 'All OEMs')}>
                    <div className="flex items-center gap-2 mb-3">
                      {iconBox(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>)}
                      <span className="text-xs font-bold uppercase" style={{ color: '#94a3b8', letterSpacing: '0.09em' }}>Partner</span>
                    </div>
                    <InlineSelect value={oem} options={ALL_OEMS} onChange={setOem} placeholder="Any partner" searchable />
                  </div>

                  {/* Technology */}
                  <div className="rounded-2xl p-4" style={card(technology !== 'All Technologies')}>
                    <div className="flex items-center gap-2 mb-3">
                      {iconBox(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>)}
                      <span className="text-xs font-bold uppercase" style={{ color: '#94a3b8', letterSpacing: '0.09em' }}>Technology</span>
                    </div>
                    <InlineSelect value={technology} options={ALL_TECHNOLOGIES} onChange={setTechnology} placeholder="Any technology" searchable />
                  </div>

                  {/* Duration */}
                  <div className="rounded-2xl p-4" style={card(durations.length > 0)}>
                    <div className="flex items-center gap-2 mb-3">
                      {iconBox(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>)}
                      <span className="text-xs font-bold uppercase" style={{ color: '#94a3b8', letterSpacing: '0.09em' }}>Duration</span>
                    </div>
                    <DurationSelect values={durations} onChange={setDurations} />
                  </div>

                  {/* Price Range */}
                  <div className="rounded-2xl p-4" style={card(!!budget)}>
                    <div className="flex items-center gap-2 mb-3">
                      {iconBox(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 0 0 7H6"/></svg>)}
                      <span className="text-xs font-bold uppercase" style={{ color: '#94a3b8', letterSpacing: '0.09em' }}>Price Range</span>
                    </div>
                    <BudgetSelect value={budget} onChange={setBudget} />
                  </div>
                </>
              )
            })()}
          </div>

          {/* YOUR SELECTION */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: '#fff', border: '1.5px solid #E2EBF6', boxShadow: '0 1px 4px rgba(6,148,209,0.04)' }}>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: '#EDF4FF' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              </div>
              <span className="text-xs font-bold uppercase" style={{ color: '#94a3b8', letterSpacing: '0.09em' }}>Your Selection</span>
            </div>
            {!(startDate || endDate || durations.length > 0 || oem !== 'All OEMs' || technology !== 'All Technologies' || budget || modes.length > 0) ? (
              <p className="text-sm" style={{ color: '#c8d6e5', fontFamily: "'Courier New', monospace" }}>nothing selected yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(startDate || endDate) && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#EDF7FF', color: '#0694D1', border: '1px solid #C8DFF0' }}>
                    {startDate || '…'} → {endDate || '…'}
                    <button onClick={() => { setStartDate(''); setEndDate('') }} className="ml-0.5 leading-none text-sm opacity-60 hover:opacity-100">×</button>
                  </span>
                )}
                {oem !== 'All OEMs' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#EDF7FF', color: '#0694D1', border: '1px solid #C8DFF0' }}>
                    Partner: {oem}
                    <button onClick={() => setOem('All OEMs')} className="ml-0.5 leading-none text-sm opacity-60 hover:opacity-100">×</button>
                  </span>
                )}
                {technology !== 'All Technologies' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#EDF7FF', color: '#0694D1', border: '1px solid #C8DFF0' }}>
                    Tech: {technology}
                    <button onClick={() => setTechnology('All Technologies')} className="ml-0.5 leading-none text-sm opacity-60 hover:opacity-100">×</button>
                  </span>
                )}
                {durations.map(d => (
                  <span key={d} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#EDF7FF', color: '#0694D1', border: '1px solid #C8DFF0' }}>
                    {d}
                    <button onClick={() => setDurations(durations.filter(x => x !== d))} className="ml-0.5 leading-none text-sm opacity-60 hover:opacity-100">×</button>
                  </span>
                ))}
                {budget && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#EDF7FF', color: '#0694D1', border: '1px solid #C8DFF0' }}>
                    {budget}
                    <button onClick={() => setBudget('')} className="ml-0.5 leading-none text-sm opacity-60 hover:opacity-100">×</button>
                  </span>
                )}
                {modes.map(m => (
                  <span key={m} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#EDF7FF', color: '#0694D1', border: '1px solid #C8DFF0' }}>
                    {m.replace('Only ', '')}
                    <button onClick={() => toggleMode(m)} className="ml-0.5 leading-none text-sm opacity-60 hover:opacity-100">×</button>
                  </span>
                ))}
                {classroomCity && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#EDF7FF', color: '#0694D1', border: '1px solid #C8DFF0' }}>
                    📍 {classroomCity}
                    <button onClick={() => setClassroomCity('')} className="ml-0.5 leading-none text-sm opacity-60 hover:opacity-100">×</button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* HOW YOU WANT TO LEARN */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: '#EDF4FF' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <span className="text-xs font-bold uppercase" style={{ color: '#94a3b8', letterSpacing: '0.09em' }}>How You Want To Learn</span>
            </div>
            <div className={`grid grid-cols-2 gap-3 ${modes.includes('Only Classroom') ? 'sm:grid-cols-5' : 'sm:grid-cols-4'}`}>
              {[
                { key: 'Only GTR', icon: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>, label: 'Guaranteed', sub: 'Confirmed dates', badge: 'GTR' },
                { key: 'Only Live Online', icon: <><rect x="2" y="2" width="20" height="15" rx="2"/><polyline points="8 21 12 17 16 21"/></>, label: 'Online', sub: 'Live virtual' },
                { key: 'Only Classroom', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>, label: 'Classroom', sub: 'In person' },
                { key: 'Self-Paced', icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, label: 'Self-Paced', sub: 'Flexi anytime' },
              ].reduce<React.ReactNode[]>((acc, { key, icon, label, sub, badge }) => {
                const active = modes.includes(key)
                acc.push(
                  <button key={key} onClick={() => toggleMode(key)}
                    className="relative flex flex-col p-5 rounded-2xl text-left transition-all duration-200 select-none"
                    style={{
                      border: `1.5px solid ${active ? '#0694D1' : '#E2EBF6'}`,
                      background: active ? 'linear-gradient(145deg,#EDF7FF,#e0f2fe)' : '#fff',
                      boxShadow: active ? '0 4px 18px rgba(6,148,209,0.22)' : '0 4px 14px rgba(0,0,0,0.07)',
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: active ? '#0694D1' : '#EEF4FA' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#476D8D'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                      </div>
                      <div className="w-10 h-5 rounded-full relative flex-shrink-0" style={{ background: active ? '#0694D1' : '#E2EBF6', transition: 'background 0.2s' }}>
                        <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white" style={{ transform: active ? 'translateX(20px)' : 'translateX(2px)', transition: 'transform 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                      </div>
                    </div>
                    {badge && <span className="absolute top-4 left-16 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: '#d1fae5', color: '#065f46' }}>{badge}</span>}
                    <p className="text-sm font-bold mb-0.5" style={{ color: active ? '#0b2545' : '#374151' }}>{label}</p>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>{sub}</p>
                  </button>
                )
                {/* City card — injected right after Classroom card */ }
                if (key === 'Only Classroom' && modes.includes('Only Classroom')) {
                  acc.push(
                    <div key="city-card" className="flex flex-col p-4 rounded-2xl"
                      style={{
                        border: `1.5px solid ${classroomCity ? '#0694D1' : '#E2EBF6'}`,
                        background: classroomCity ? '#EFF8FF' : '#FAFCFF',
                        boxShadow: classroomCity ? '0 4px 18px rgba(6,148,209,0.18)' : '0 4px 14px rgba(0,0,0,0.07)',
                        transition: 'border-color 0.2s, background 0.2s',
                      }}>
                      <div className="flex items-center gap-2 mb-3">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#94a3b8', letterSpacing: '0.09em' }}>City</span>
                      </div>
                      <CitySelect value={classroomCity} onChange={setClassroomCity} />
                    </div>
                  )
                }
                return acc
              }, [])}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-5" style={{ borderTop: '1.5px solid #EEF3F9' }}>
            <div className="text-sm">
              <span className="font-bold text-base" style={{ color: '#0b2545' }}>{totalCourses.toLocaleString()}</span>
              <span className="ml-1.5" style={{ color: '#64748b' }}>courses match</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setDurations([]); setOem('All OEMs'); setTechnology('All Technologies'); setBudget(''); setModes([]); setClassroomCity(''); setStartDate(''); setEndDate('') }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{ border: '1.5px solid #E2EBF6', color: '#64748b', background: '#fff' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                Reset
              </button>
              <button
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: '#0b2545', boxShadow: '0 4px 14px rgba(11,37,69,0.22)' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Show results
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>

        </div>

        {/* ── Search bar + expand controls ── */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search courses… (e.g. Azure, CISSP, PMP)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none"
              style={{ background: '#fff', border: '1.5px solid #D0E8F5', color: '#0b2545', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#0694D1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(6,148,209,0.1)' }}
              onBlur={e => { e.currentTarget.style.borderColor = '#D0E8F5'; e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.05)' }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-base leading-none">✕</button>
            )}
          </div>
          <div className="text-sm font-medium px-4 py-3 rounded-xl flex-shrink-0" style={{ background: '#fff', color: '#5a7a99', border: '1.5px solid #D0E8F5' }}>
            {search || oem !== 'All OEMs' ? `${visibleCount} vendor${visibleCount !== 1 ? 's' : ''} found` : `${VENDORS.length} vendors · ${totalCourses.toLocaleString()}+ courses`}
          </div>
          {!search && (
            <>
              <button onClick={() => setExpandAll(true)} className="text-sm font-semibold px-4 py-3 rounded-xl text-white flex-shrink-0" style={{ background: '#0694D1' }}>
                Expand All
              </button>
              <button onClick={() => setExpandAll(false)} className="text-sm font-semibold px-4 py-3 rounded-xl flex-shrink-0" style={{ background: '#fff', color: '#0694D1', border: '1.5px solid #D0E8F5' }}>
                Collapse All
              </button>
            </>
          )}
        </div>

        {/* ── Vendor accordion list ── */}
        <div className="mt-5 flex flex-col gap-3">
          {VENDORS.map(v => (
            <VendorCard key={v.id} vendor={v} forceOpen={expandAll} searchQuery={activeSearch} />
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="py-16 text-center px-4" style={{ background: 'linear-gradient(135deg, #061624 0%, #0694D1 100%)' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Need a Custom Training Plan?</h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Our corporate advisors will design a programme tailored to your team size, goals, and timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://www.koenig-solutions.com/contact" target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
              style={{ background: '#fff', color: '#0694D1' }}>
              Talk to a Training Advisor
            </a>
            <a href="https://www.koenig-solutions.com/corporate-it-training-courses" target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.25)' }}>
              Browse Full Catalogue
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

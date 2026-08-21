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

/* ─── Popular courses (flat list, not vendor-grouped) ────── */
const POPULAR_COURSES = [
  { name: 'AZ-104T00-A: Microsoft Azure Administrator', code: 'AZ-104', dur: '5 days', level: 'assoc' as const, vendor: 'Microsoft', color: '#0078D4', hot: true },
  { name: 'AZ-900T00: Microsoft Azure Fundamentals', code: 'AZ-900', dur: '1 day', level: 'fund' as const, vendor: 'Microsoft', color: '#0078D4', hot: false },
  { name: 'PL-300T00: Microsoft Power BI Data Analyst', code: 'PL-300', dur: '5 days', level: 'assoc' as const, vendor: 'Microsoft', color: '#0078D4', hot: true },
  { name: 'AZ-305T00: Designing Microsoft Azure Infrastructure Solutions', code: 'AZ-305', dur: '4 days', level: 'expert' as const, vendor: 'Microsoft', color: '#0078D4', hot: false },
  { name: 'AWS Certified Cloud Practitioner', code: 'CLF-C02', dur: '1 day', level: 'fund' as const, vendor: 'AWS', color: '#FF9900', hot: true },
  { name: 'AWS Certified Solutions Architect – Associate', code: 'SAA-C03', dur: '3 days', level: 'assoc' as const, vendor: 'AWS', color: '#FF9900', hot: true },
  { name: 'AWS Certified Security – Specialty', code: 'SCS-C02', dur: '3 days', level: 'expert' as const, vendor: 'AWS', color: '#FF9900', hot: false },
  { name: 'Implementing and Administering Cisco Solutions (CCNA) v2.1', code: 'CCNA', dur: '5 days', level: 'assoc' as const, vendor: 'Cisco', color: '#1BA0D7', hot: true },
  { name: 'Implementing Cisco Enterprise Network Core Technologies (ENCOR) v1.3', code: 'ENCOR', dur: '5 days', level: 'expert' as const, vendor: 'Cisco', color: '#1BA0D7', hot: false },
  { name: 'Certified Ethical Hacker v13 AI (CEH)', code: 'CEH', dur: '5 days', level: 'expert' as const, vendor: 'EC-Council', color: '#E31E25', hot: true },
  { name: 'CompTIA Security+ SY0-701', code: 'SY0-701', dur: '5 days', level: 'assoc' as const, vendor: 'CompTIA', color: '#C8002F', hot: true },
  { name: 'CompTIA Network+ (N10-009)', code: 'N10-009', dur: '5 days', level: 'assoc' as const, vendor: 'CompTIA', color: '#C8002F', hot: false },
  { name: 'Certified Information Systems Security Professional (CISSP)', code: 'CISSP', dur: '5 days', level: 'expert' as const, vendor: 'ISC2', color: '#2E4057', hot: true },
  { name: 'Certified Cloud Security Professional (CCSP)', code: 'CCSP', dur: '4 days', level: 'expert' as const, vendor: 'ISC2', color: '#2E4057', hot: false },
  { name: 'Project Management Professional (PMP®) Certification Training', code: 'PMP', dur: '4 days', level: 'expert' as const, vendor: 'PMI', color: '#00507F', hot: true },
  { name: 'ITIL® 4 Foundation', code: 'ITIL-4', dur: '2 days', level: 'fund' as const, vendor: 'PeopleCert', color: '#6B2FA0', hot: true },
  { name: 'Certified Information Security Manager (CISM)', code: 'CISM', dur: '5 days', level: 'expert' as const, vendor: 'ISACA', color: '#003366', hot: false },
  { name: 'ISO/IEC 27001 Lead Implementer', code: 'ISO-27001', dur: '5 days', level: 'expert' as const, vendor: 'PECB', color: '#1A5276', hot: false },
  { name: 'VMware vSphere: Install, Configure, Manage [V8]', code: 'VCP-DCV', dur: '5 days', level: 'assoc' as const, vendor: 'VMware', color: '#607078', hot: false },
  { name: 'Red Hat System Administration I (RH124) – RHEL 9', code: 'RHCSA', dur: '5 days', level: 'assoc' as const, vendor: 'Red Hat', color: '#CC0000', hot: false },
  { name: 'SAP S/4HANA Overview (S4H00)', code: 'S4H00', dur: '3 days', level: 'fund' as const, vendor: 'SAP', color: '#007DB8', hot: false },
  { name: 'Oracle Database 19c: Administration Workshop', code: 'OCA', dur: '5 days', level: 'assoc' as const, vendor: 'Oracle', color: '#C74634', hot: false },
  { name: 'AI-102T00: Designing and Implementing a Microsoft Azure AI Solution', code: 'AI-102', dur: '4 days', level: 'assoc' as const, vendor: 'Microsoft', color: '#0078D4', hot: false },
  { name: 'Generative AI Specialty', code: 'GEN-AI', dur: '3 days', level: 'expert' as const, vendor: 'Koenig', color: '#0694D1', hot: true },
]

const ALL_OEMS = ['All OEMs', ...VENDORS.map(v => v.name).sort((a, b) => a.localeCompare(b))]
const ALL_TECHNOLOGIES = ['All Technologies', ...['Cloud', 'Cybersecurity', 'Data & AI', 'Database', 'DevOps', 'ERP', 'Linux', 'Networking', 'Project Management'].sort((a, b) => a.localeCompare(b))]

/* Technology category icons — monoline, one per subject area */
const TECH_ICONS: Record<string, React.ReactNode> = {
  'Cloud':               <><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></>,
  'Cybersecurity':       <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
  'Data & AI':           <><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></>,
  'Database':            <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></>,
  'DevOps':              <><path d="M17 2.1l4 4-4 4"/><path d="M3 12.1v-2a4 4 0 0 1 4-4h14"/><path d="M7 21.9l-4-4 4-4"/><path d="M21 11.9v2a4 4 0 0 1-4 4H3"/></>,
  'ERP':                 <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  'Linux':               <><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></>,
  'Networking':          <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  'Project Management':  <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 15 2 2 4-4"/></>,
}
const DURATION_ITEMS = [
  { label: '4 hrs',  days: '½ day'  },
  { label: '8 hrs',  days: '1 day'  },
  { label: '16 hrs', days: '2 days' },
  { label: '24 hrs', days: '3 days' },
  { label: '32 hrs', days: '4 days' },
  { label: 'More',   days: '5+ days'},
]
const TRAINING_MODES = ['Only GTR', 'Only Live Online', 'Only Classroom', 'Self-Paced']
const CITY_DATA = [
  'Abu Dhabi', 'Ahmedabad', 'Amsterdam', 'Bahrain', 'Bangalore', 'Bangkok',
  'Boston', 'Brussels', 'Chennai', 'Chicago', 'Dallas', 'Delhi / NCR',
  'Doha', 'Dubai', 'Frankfurt', 'Hong Kong', 'Houston', 'Hyderabad',
  'Jaipur', 'Jakarta', 'Kochi', 'Kolkata', 'Kuala Lumpur', 'London',
  'Los Angeles', 'Melbourne', 'Miami', 'Mumbai', 'Muscat', 'Nairobi',
  'New York', 'Paris', 'Pune', 'Riyadh', 'San Francisco', 'Seattle',
  'Seoul', 'Singapore', 'Sydney', 'Tokyo', 'Toronto', 'Washington DC', 'Zurich',
]

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
          className="cit-dropdown absolute z-50 mt-1 py-1 rounded-xl overflow-hidden"
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
        <span className="flex-1 min-w-0 truncate" style={{ color: isDefault ? '#94a3b8' : '#0b2545', fontWeight: isDefault ? 400 : 700 }}>
          {isDefault ? placeholder : value}
        </span>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="#94a3b8" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="cit-dropdown absolute z-50 mt-2 rounded-xl overflow-hidden" style={{ background: '#fff', border: '1.5px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '200px', top: '100%', left: 0 }}>
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
                  className="w-full text-left px-4 py-3 text-sm"
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
  const filtered = query ? CITY_DATA.filter(c => c.toLowerCase().includes(query.toLowerCase())) : CITY_DATA
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
        <div className="cit-dropdown absolute z-50 mt-1.5 rounded-xl overflow-hidden"
          style={{ background: '#fff', border: '1.5px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '220px', top: '100%', left: 0 }}>
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
          <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-xs" style={{ color: '#94a3b8' }}>No city found</p>
            ) : filtered.map(city => {
              const sel = value === city
              return (
                <button key={city} onClick={() => { onChange(sel ? '' : city); setOpen(false); setQuery('') }}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-sm transition-colors text-left"
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
  const label = values.length === 0 ? 'Any length' : values.join(', ')
  const hasValue = values.length > 0
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-1 text-sm w-full text-left">
        <span className="flex-1 min-w-0 truncate" style={{ color: hasValue ? '#0b2545' : '#94a3b8', fontWeight: hasValue ? 700 : 400 }}>{label}</span>
        <svg width="15" height="15" viewBox="0 0 20 20" fill="#94a3b8"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="cit-dropdown absolute z-50 mt-2 rounded-xl overflow-hidden"
          style={{ background: '#fff', border: '1.5px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '210px', top: '100%', left: 0 }}>
          <div className="px-3 py-2" style={{ borderBottom: '1px solid #EEF3F9' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#0694D1' }}>Duration</p>
          </div>
          <div className="py-1">
            {DURATION_ITEMS.map(({ label: lbl, days }) => {
              const checked = values.includes(lbl)
              return (
                <button key={lbl} onClick={() => toggle(lbl)}
                  className="w-full flex items-center justify-between px-4 py-3 transition-colors"
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
          <div className="px-4 py-2 flex items-center justify-between" style={{ borderTop: '1px solid #EEF3F9' }}>
            {hasValue
              ? <button onClick={() => onChange([])} className="text-xs font-semibold" style={{ color: '#0694D1' }}>Clear</button>
              : <span />}
            <button
              onClick={() => setOpen(false)}
              className="block sm:hidden text-xs font-bold px-4 py-1.5 rounded-lg"
              style={{ background: '#0694D1', color: '#fff' }}
            >Apply</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Price Range Slider ─────────────────────────────────── */
const PRICE_MIN = 0
const PRICE_MAX = 100000
const PRICE_STEP = 1000
const PRICE_PRESETS: { label: string; range: [number, number] }[] = [
  { label: 'Under 10k', range: [0, 10000] },
  { label: '10k–30k',   range: [10000, 30000] },
  { label: '30k+',      range: [30000, 100000] },
]

function PriceRangeSlider({
  value, onChange, inline,
}: {
  value: [number, number] | null
  onChange: (v: [number, number] | null) => void
  inline?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [lo, hi] = value ?? [PRICE_MIN, PRICE_MAX]
  const [activePreset, setActivePreset] = useState<string | null>(null)
  const [inputVal, setInputVal] = useState(String(hi))
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef<'lo' | 'hi' | null>(null)

  useEffect(() => { setInputVal(String(hi)) }, [hi])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
  useEffect(() => { if (value === null) setActivePreset(null) }, [value])

  const loPct = (lo / PRICE_MAX) * 100
  const hiPct = (hi / PRICE_MAX) * 100
  const fmtINR = (n: number) => 'INR ' + n.toLocaleString('en-IN')

  const getValFromX = (clientX: number): number => {
    if (!trackRef.current) return 0
    const { left, width } = trackRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (clientX - left) / width))
    return Math.round((pct * PRICE_MAX) / PRICE_STEP) * PRICE_STEP
  }

  const handlePointerDown = (which: 'lo' | 'hi') => (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragging.current = which
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const v = getValFromX(e.clientX)
    if (dragging.current === 'lo') onChange([Math.min(v, hi - PRICE_STEP), hi])
    else onChange([lo, Math.max(v, lo + PRICE_STEP)])
    setActivePreset(null)
  }

  const handlePointerUp = () => { dragging.current = null }

  /* Slider body — shared between the popup (desktop pills) and the inline
     always-open layout (mobile filter drawer's Budget tab) */
  const sliderBody = (
    <>
          {/* Readout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#0b2545' }}>{fmtINR(lo)}</span>
            <span style={{ color: '#94a3b8', fontSize: 12 }}>–</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#0b2545' }}>{fmtINR(hi)}{hi >= PRICE_MAX ? '+' : ''}</span>
            {value !== null && (
              <button onClick={() => { onChange(null); setActivePreset(null) }}
                style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: '#0694D1', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Clear
              </button>
            )}
          </div>

          {/* Track */}
          <div ref={trackRef} style={{ position: 'relative', height: 24, userSelect: 'none', marginBottom: 4 }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 4, transform: 'translateY(-50%)', borderRadius: 99, background: '#E2E8F0', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '50%', left: `${loPct}%`, width: `${Math.max(0, hiPct - loPct)}%`, height: 4, transform: 'translateY(-50%)', borderRadius: 99, background: 'linear-gradient(90deg, #0694D1 0%, #38bdf8 100%)', pointerEvents: 'none' }} />
            <div onPointerDown={handlePointerDown('lo')} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}
              style={{ position: 'absolute', top: '50%', left: `${loPct}%`, width: 18, height: 18, borderRadius: '50%', background: '#fff', border: '2.5px solid #0694D1', boxShadow: '0 1px 6px rgba(6,148,209,0.28)', transform: 'translate(-50%, -50%)', cursor: 'grab', zIndex: 2, touchAction: 'none' }} />
            <div onPointerDown={handlePointerDown('hi')} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}
              style={{ position: 'absolute', top: '50%', left: `${hiPct}%`, width: 18, height: 18, borderRadius: '50%', background: '#fff', border: '2.5px solid #0694D1', boxShadow: '0 1px 6px rgba(6,148,209,0.28)', transform: 'translate(-50%, -50%)', cursor: 'grab', zIndex: 2, touchAction: 'none' }} />
          </div>

          {/* Min/Max labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 10, color: '#94a3b8' }}>INR 0</span>
            <span style={{ fontSize: 10, color: '#94a3b8' }}>INR 1,00,000+</span>
          </div>

          {/* Price input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, border: '1.5px solid #E2E8F0', borderRadius: 10, padding: '7px 10px', marginBottom: 10, background: '#fff' }}>
            <input
              type="number"
              min={0}
              value={inputVal}
              onChange={e => {
                const raw = Number(e.target.value)
                const clamped = Math.min(raw, PRICE_MAX)
                setInputVal(String(clamped))
                if (!isNaN(raw) && raw > 0) {
                  onChange([lo, Math.max(lo + PRICE_STEP, clamped)])
                  setActivePreset(null)
                }
              }}
              onBlur={e => {
                const v = Math.min(Math.max(lo + PRICE_STEP, Number(e.target.value) || hi), PRICE_MAX)
                onChange([lo, v])
                setInputVal(String(v))
                setActivePreset(null)
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
              }}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontWeight: 600, color: '#0b2545', background: 'transparent', minWidth: 0, textAlign: 'left', fontFamily: "'GT Walsheim Pro', sans-serif" }}
            />
            {hi >= PRICE_MAX && <span style={{ fontSize: 13, fontWeight: 700, color: '#0b2545', flexShrink: 0 }}>+</span>}
            <span style={{ fontSize: 12, color: '#0694D1', fontWeight: 700, flexShrink: 0 }}>INR</span>
          </div>

          {/* Preset chips */}
          <div style={{ display: 'flex', gap: 5 }}>
            {PRICE_PRESETS.map(p => {
              const active = activePreset === p.label
              return (
                <button key={p.label} onClick={() => { onChange(p.range); setActivePreset(p.label) }}
                  style={{ flex: 1, padding: '4px 0', borderRadius: 999, fontSize: 10, fontWeight: 600, border: `1.5px solid ${active ? '#0694D1' : '#E2E8F0'}`, background: active ? '#0694D1' : '#fff', color: active ? '#fff' : '#64748b', cursor: 'pointer' }}>
                  {p.label}
                </button>
              )
            })}
          </div>
    </>
  )

  /* Inline mode — used inside the mobile filter drawer's Budget tab.
     No trigger/popup; the slider is always visible in the panel. */
  if (inline) {
    return (
      <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
        {sliderBody}
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger — same height as other filter dropdowns */}
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-1 text-sm w-full text-left">
        <span className="flex-1 min-w-0 truncate" style={{ color: value ? '#0b2545' : '#94a3b8', fontWeight: value ? 700 : 400 }}>
          {value ? `${fmtINR(lo)} – ${fmtINR(hi)}${hi >= PRICE_MAX ? '+' : ''}` : 'Select Range'}
        </span>
        <svg width="15" height="15" viewBox="0 0 20 20" fill="#94a3b8"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown panel with slider */}
      {open && (
        <div className="cit-dropdown absolute z-50 mt-2 rounded-xl overflow-hidden"
          style={{ background: '#fff', border: '1.5px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', width: '280px', top: '100%', left: 0, padding: '14px 16px', fontFamily: "'GT Walsheim Pro', sans-serif" }}>
          {sliderBody}
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
        <span className="flex-1 min-w-0 truncate" style={{ color: hasValue ? '#0b2545' : '#94a3b8', fontWeight: hasValue ? 700 : 400 }}>{label}</span>
        <svg width="15" height="15" viewBox="0 0 20 20" fill="#94a3b8"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="cit-dropdown absolute z-50 mt-2 rounded-xl overflow-hidden"
          style={{ background: '#fff', border: '1px solid #E2EBF6', boxShadow: '0 4px 24px rgba(6,148,209,0.13)', top: '100%', left: 0, width: 'max-content', maxWidth: '100vw' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:divide-x divide-[#E2EBF6]">
            {/* Month 1 */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <NavArrow dir="left" />
                <span className="font-bold text-sm" style={{ color: '#0b2545' }}>{lbl1}</span>
                <NavArrow dir="right" />
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
            {/* Month 2 — hidden on mobile */}
            <div className="hidden sm:block p-4">
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

/* ─── Pill dropdown (sort / currency) ───────────────────── */
function PillDropdown({ label, value, options, onChange, minWidth }: { label?: string; value: string; options: string[]; onChange: (v: string) => void; minWidth?: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium"
        style={{ border: '1.5px solid #D0E8F5', background: '#fff', color: '#374151', whiteSpace: 'nowrap', ...(minWidth ? { minWidth } : {}) }}>
        {label ? <span style={{ color: '#64748b' }}>{label}</span> : null}
        <span style={{ fontWeight: 600, color: '#0b2545' }}>{value}</span>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="#94a3b8"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 rounded-xl overflow-hidden"
          style={{ background: '#fff', border: '1.5px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '170px', top: '100%', right: 0 }}>
          {options.map(opt => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false) }}
              className="w-full text-left px-4 py-2.5 text-sm"
              style={{ background: value === opt ? '#EDF7FF' : 'transparent', color: value === opt ? '#0694D1' : '#374151', fontWeight: value === opt ? 600 : 400 }}
              onMouseEnter={e => { if (value !== opt) (e.currentTarget as HTMLButtonElement).style.background = '#F9FAFB' }}
              onMouseLeave={e => { if (value !== opt) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
            >{opt}</button>
          ))}
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

/* ─── Course card helpers ───────────────────────────────── */
function getCourseLevel(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('fundamentals') || n.includes('foundation') || n.includes('essentials') || n.includes('basic') || n.includes('intro')) return 'FUNDAMENTALS'
  if (n.includes('expert') || n.includes('advanced') || n.includes('architect') || n.includes('cissp') || n.includes('cciso') || n.includes('cism')) return 'EXPERT'
  if (n.includes('professional') || n.includes('practitioner')) return 'PROFESSIONAL'
  if (n.includes('specialist') || n.includes('specialty') || n.includes('engineer')) return 'SPECIALIST'
  return 'ASSOCIATE'
}

function getCourseCode(name: string): string {
  const m = name.match(/\b([A-Z]{1,4}-\d{3,4}[A-Z0-9]*)\b/)
  if (m) return m[1]
  const map: Record<string, string> = {
    CISSP: 'CISSP', CCSP: 'CCSP', SSCP: 'SSCP', CEH: 'CEH', CPENT: 'CPENT', CHFI: 'CHFI', CCNA: 'CCNA',
    CCNP: 'CCNP', CISA: 'CISA', CISM: 'CISM', CRISC: 'CRISC', CGEIT: 'CGEIT', CAPM: 'CAPM',
    'PMP': 'PMP', ITIL: 'ITIL4', PRINCE2: 'P2', RHCSA: 'RHCSA', RHCE: 'RHCE', COBIT: 'COBIT',
  }
  for (const [k, v] of Object.entries(map)) { if (name.includes(k)) return v }
  return ''
}

function stableNum(s: string, min: number, max: number): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return min + (Math.abs(h) % (max - min))
}

/* Windowed page list: always shows first/last page, current ±1,
   and collapses larger gaps into a single "…" — e.g. 1 2 3 4 … 20 */
function getPageWindow(current: number, total: number): (number | '...')[] {
  const keep = new Set<number>([1, total, current - 1, current, current + 1])
  const sorted = Array.from(keep).filter(p => p >= 1 && p <= total).sort((a, b) => a - b)
  const result: (number | '...')[] = []
  let prev = 0
  for (const p of sorted) {
    if (p - prev === 2) result.push(prev + 1)
    else if (p - prev > 2) result.push('...')
    result.push(p)
    prev = p
  }
  return result
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

      {/* Course cards */}
      <div style={{ maxHeight: effective ? '9999px' : '0px', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <div className="px-5 pb-5 pt-4" style={{ background: '#F8FAFC' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayList.map((course, i) => {
              const level = getCourseLevel(course)
              const code = getCourseCode(course)
              const students = stableNum(course, 1100, 5200).toLocaleString()
              const rating = (4.5 + (stableNum(course + 'r', 0, 6) * 0.1)).toFixed(1)
              const popular = i < 3
              return (
                <div key={i} className="flex flex-col rounded-2xl p-4"
                  style={{ background: '#fff', border: '1.5px solid #E8F0FA', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  {/* Level badge + Vendor + Popular */}
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                      style={{ background: `${vendor.color}14`, color: vendor.color, border: `1px solid ${vendor.color}28` }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      {level}
                    </span>
                    {popular && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                        style={{ background: '#EDF7FF', color: '#0694D1', border: '1px solid rgba(6,148,209,0.25)' }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="#0694D1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        POPULAR
                      </span>
                    )}
                  </div>
                  {/* Title */}
                  <h4 className="text-sm font-bold leading-snug mb-4 flex-1" style={{ color: '#0b2545' }}>{course}</h4>
                  {/* Code + duration */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {code && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{ background: `${vendor.color}12`, color: vendor.color, border: `1px solid ${vendor.color}25` }}>{code}</span>
                    )}
                    <span className="flex items-center gap-1 text-xs" style={{ color: '#64748b' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      1 day · 8hrs
                    </span>
                  </div>
                  {/* Students + price */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs" style={{ color: '#64748b' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: 3 }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      {students}+ <span style={{ color: '#f59e0b' }}>★</span> <span style={{ fontWeight: 600, color: '#374151' }}>{rating}</span>
                    </span>
                    <span className="text-sm font-bold" style={{ color: vendor.color }}>₹33,000</span>
                  </div>
                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80"
                      style={{ border: `1.5px solid ${vendor.color}40`, color: vendor.color, background: '#fff' }}
                      onClick={() => { setSyllabusCourse(course); setSyllabusOpen(true) }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download Syllabus
                    </button>
                    <button className="flex-1 py-2 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-80"
                      style={{ background: '#0b2545' }}>
                      View Course
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-5 flex gap-2 flex-wrap">
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

/* ─── Lead Form ─────────────────────────────────────────── */
const CORP_COURSES = [
  'Select Course Name',
  'Microsoft Azure Administrator (AZ-104)',
  'AWS Solutions Architect',
  'Cisco CCNA / CCNP',
  'Oracle Database Administration',
  'CompTIA Security+',
  'VMware vSphere',
  'Red Hat Linux Administration',
  'Salesforce Administrator',
  'ServiceNow Administration',
  'PMP / Project Management',
  'Other Course',
];
const CORP_HEAR_OPTIONS = ['Select Option','Google Search','Social Media','LinkedIn','Colleague / Referral','Email Newsletter','Corporate Event','Other'];

function EnterpriseLeadForm({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'individual'|'enterprise'>('individual');
  const [form, setForm] = useState({ name:'', email:'', phone:'', course:'', trainees:'', hear:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState(false);

  const reset = () => { setSubmitted(false); setForm({ name:'', email:'', phone:'', course:'', trainees:'', hear:'', message:'' }); setCaptcha(false); };
  const isEnt = tab === 'enterprise';

  if (submitted) {
    return (
      <div style={{ textAlign:'center', padding:'32px 0' }}>
        <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:56, height:56, borderRadius:'50%', background:'rgba(6,148,209,0.18)', border:'1px solid rgba(6,148,209,0.4)', marginBottom:16 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 style={{ color:'#fff', fontSize:18, fontWeight:700, marginBottom:8 }}>Request Received!</h3>
        <p style={{ color:'rgba(255,255,255,0.55)', fontSize:14, marginBottom:24, lineHeight:1.6 }}>
          {isEnt ? "Our enterprise team will reach out within 1 business day." : "Your certification advisor will be in touch within 2 hours."}
        </p>
        <button onClick={() => { onClose(); reset(); }} style={{ background:'rgba(6,148,209,0.25)', border:'1px solid rgba(6,148,209,0.4)', borderRadius:12, padding:'8px 24px', fontSize:13, fontWeight:600, color:'#fff', cursor:'pointer', fontFamily:'inherit' }}>Close</button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .clf-input { background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.14); border-radius: 10px; padding: 11px 16px; font-size: 13.5px; color: #fff; width: 100%; outline: none; font-family: inherit; transition: border-color .2s, box-shadow .2s; box-sizing: border-box; }
        .clf-input:focus { border-color: #0694D1; box-shadow: 0 0 0 3px rgba(6,148,209,0.15); outline: none; }
        .clf-input::placeholder { color: rgba(255,255,255,0.25); }
        .clf-label { display: block; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.65); margin-bottom: 5px; }
        .clf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 480px) { .clf-row { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ textAlign:'center', marginBottom:12 }}>
        <span style={{ display:'inline-block', padding:'5px 18px', borderRadius:999, border:'1.5px solid rgba(6,148,209,0.5)', fontSize:11, fontWeight:700, letterSpacing:'0.14em', color:'#4DBFEF', textTransform:'uppercase' as const }}>
          Let&apos;s Talk
        </span>
      </div>

      <h2 style={{ color:'#fff', fontSize:22, fontWeight:800, textAlign:'center', margin:'0 0 6px', lineHeight:1.3 }}>
        Request for more{' '}
        <span style={{ color:'#0694D1' }}>information</span>
      </h2>
      <p style={{ textAlign:'center', color:'rgba(255,255,255,0.45)', fontSize:13, marginBottom:16 }}>
        Corporate IT Training with Koenig Solutions
      </p>

      <div style={{ display:'flex', gap:10, justifyContent:'center', marginBottom:18 }}>
        <button type="button" style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 18px', borderRadius:10, border:'1.5px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.04)', color:'rgba(255,255,255,0.85)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ color:'#25D366' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.121 1.535 5.847L0 24l6.335-1.508A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.825 9.825 0 01-5.027-1.381l-.36-.214-3.735.889.927-3.647-.235-.374A9.774 9.774 0 012.182 12C2.182 6.567 6.567 2.182 12 2.182S21.818 6.567 21.818 12 17.433 21.818 12 21.818z"/></svg>
          WhatsApp us
        </button>
        <button type="button" style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 18px', borderRadius:10, border:'1.5px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.04)', color:'rgba(255,255,255,0.85)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Email us
        </button>
      </div>

      <div style={{ display:'flex', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.10)', borderRadius:10, padding:4, gap:4, marginBottom:20 }}>
        {(['individual','enterprise'] as const).map(t => (
          <button key={t} type="button" onClick={() => setTab(t)} style={{
            flex:1, padding:'10px 0', border:'none', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit', transition:'all .2s',
            background: tab===t ? '#0694D1' : 'transparent',
            color: tab===t ? '#fff' : 'rgba(255,255,255,0.45)',
            display:'flex', alignItems:'center', justifyContent:'center', gap:7,
          }}>
            {t === 'individual'
              ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Individual</>
              : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>Enterprise</>
            }
          </button>
        ))}
      </div>

      <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div className="clf-row">
          <div>
            <label className="clf-label">Full Name <span style={{ color:'#ef4444' }}>*</span></label>
            <input required type="text" placeholder="John Smith" className="clf-input" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} />
          </div>
          <div>
            <label className="clf-label">{isEnt ? 'Business Email' : 'Email'} <span style={{ color:'#ef4444' }}>*</span></label>
            <input required type="email" placeholder={isEnt ? 'john@company.com' : 'john@example.com'} className="clf-input" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} />
          </div>
        </div>
        <div className="clf-row">
          <div>
            <label className="clf-label">Phone</label>
            <input type="tel" placeholder="+1 (555) 000-0000" className="clf-input" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} />
          </div>
          <div>
            {isEnt ? (
              <>
                <label className="clf-label">Number of Trainees</label>
                <input type="number" min="1" placeholder="e.g. 25" className="clf-input" value={form.trainees} onChange={e=>setForm(p=>({...p,trainees:e.target.value}))} />
              </>
            ) : (
              <>
                <label className="clf-label">Select Course Name</label>
                <select className="clf-input" style={{ color: form.course ? '#fff' : 'rgba(255,255,255,0.25)' }} value={form.course} onChange={e=>setForm(p=>({...p,course:e.target.value}))}>
                  {CORP_COURSES.map(c=><option key={c} value={c==='Select Course Name'?'':c} style={{ background:'#0a2d45', color:'#fff' }}>{c}</option>)}
                </select>
              </>
            )}
          </div>
        </div>
        <div>
          <label className="clf-label">How did you hear about us?</label>
          <select className="clf-input" style={{ color: form.hear ? '#fff' : 'rgba(255,255,255,0.25)' }} value={form.hear} onChange={e=>setForm(p=>({...p,hear:e.target.value}))}>
            {CORP_HEAR_OPTIONS.map(o=><option key={o} value={o==='Select Option'?'':o} style={{ background:'#0a2d45', color:'#fff' }}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="clf-label">Tell us more about your Training Request</label>
          <textarea rows={3} placeholder="e.g. We need Azure certification for 50 engineers across 3 countries..." className="clf-input" style={{ resize:'vertical', minHeight:80 }} value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} />
        </div>
        <div style={{ display:'flex', justifyContent:'center' }}>
          <div onClick={()=>setCaptcha(c=>!c)} style={{ display:'flex', alignItems:'center', gap:10, padding:'7px 10px', borderRadius:4, border:'1.5px solid rgba(255,255,255,0.18)', background:'rgba(255,255,255,0.04)', width:220, height:44, cursor:'pointer' }}>
            <div style={{ width:18, height:18, borderRadius:3, border:`2px solid ${captcha ? '#0694D1' : 'rgba(255,255,255,0.55)'}`, background: captcha ? '#0694D1' : 'transparent', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s' }}>
              {captcha && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
            <span style={{ fontSize:13, color:'rgba(255,255,255,0.85)', fontWeight:500, flex:1 }}>I&apos;m not a robot</span>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:1, flexShrink:0 }}>
              <img decoding="async" loading="lazy" src="https://www.gstatic.com/recaptcha/api2/logo_48.png" width="24" height="24" alt="reCAPTCHA" style={{ display:'block' }} />
              <span style={{ fontSize:7, color:'rgba(255,255,255,0.4)', letterSpacing:'0.03em', lineHeight:1 }}>reCAPTCHA</span>
              <span style={{ fontSize:6, color:'rgba(255,255,255,0.25)', lineHeight:1 }}>Privacy - Terms</span>
            </div>
          </div>
        </div>
        <button type="submit" style={{ width:'100%', padding:'14px 0', borderRadius:12, fontSize:14, fontWeight:700, color:'#fff', background:'linear-gradient(135deg,#0694D1,#076D9D)', border:'none', cursor:'pointer', fontFamily:'inherit', boxShadow:'0 4px 20px rgba(6,148,209,0.40)', transition:'opacity .2s, transform .15s' }}
          onMouseEnter={e=>{e.currentTarget.style.opacity='0.9'; e.currentTarget.style.transform='translateY(-1px)';}}
          onMouseLeave={e=>{e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)';}}
        >
          Submit — Get a Free Consultation
        </button>
        <p style={{ textAlign:'center', fontSize:12, color:'rgba(255,255,255,0.30)', margin:0 }}>
          We&apos;ll respond within 1 business day · No spam, ever.
        </p>
      </form>
    </>
  );
}

/* ─── Mobile inline calendar ────────────────────────────── */
function MobileCalendar({ startDate, endDate, onChange, onApply }: { startDate: string; endDate: string; onChange: (s: string, e: string) => void; onApply: () => void }) {
  const todayIso = toCalIso(new Date())
  const base = startDate || todayIso
  const [viewYear, setViewYear] = useState(() => parseInt(base.split('-')[0]))
  const [viewMonth, setViewMonth] = useState(() => parseInt(base.split('-')[1]) - 1)

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const firstDow = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells: (number | null)[] = [...Array(firstDow).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  function iso(d: number) {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  }

  function handleDay(d: number) {
    const clicked = iso(d)
    if (!startDate || (startDate && endDate)) {
      onChange(clicked, '')
    } else {
      if (clicked >= startDate) onChange(startDate, clicked)
      else onChange(clicked, startDate)
    }
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const fmtShort = (s: string) => s ? new Date(s + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '–'

  return (
    <div>

      {/* Month navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <button onClick={prevMonth} style={{ width: 30, height: 30, borderRadius: '50%', background: '#F1F5F9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="#64748b"><path fillRule="evenodd" d="M12.79 5.23a.75.75 0 0 1 0 1.06L9.06 10l3.73 3.71a.75.75 0 1 1-1.06 1.06l-4.25-4.24a.75.75 0 0 1 0-1.06l4.25-4.24a.75.75 0 0 1 1.06 0z" clipRule="evenodd"/></svg>
        </button>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0b2545' }}>{monthLabel}</span>
        <button onClick={nextMonth} style={{ width: 30, height: 30, borderRadius: '50%', background: '#F1F5F9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="#64748b"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 0-1.06L10.94 10 7.21 6.29a.75.75 0 1 1 1.06-1.06l4.25 4.24a.75.75 0 0 1 0 1.06l-4.25 4.24a.75.75 0 0 1-1.06 0z" clipRule="evenodd"/></svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 2 }}>
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: '#94a3b8', paddingBottom: 4 }}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {cells.map((d, i) => {
          if (!d) return <div key={`e${i}`} style={{ height: 34 }} />
          const cellIso = iso(d)
          const isStart = cellIso === startDate
          const isEnd = cellIso === endDate
          const inRange = !!(startDate && endDate && cellIso > startDate && cellIso < endDate)
          const isToday = cellIso === todayIso
          const dotted = isStart && !endDate

          let rangeBg = 'transparent'
          let rangeBr = '0'
          if (inRange) { rangeBg = '#DBEAFE'; rangeBr = '0' }
          else if (isStart && endDate) { rangeBg = '#DBEAFE'; rangeBr = '50% 0 0 50%' }
          else if (isEnd) { rangeBg = '#DBEAFE'; rangeBr = '0 50% 50% 0' }

          return (
            <div key={d} onClick={() => handleDay(d)}
              style={{ height: 34, background: rangeBg, borderRadius: rangeBr, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isStart || isEnd ? '#0694D1' : 'transparent',
                border: (isToday && !isStart && !isEnd) ? '1.5px solid #0694D1' : dotted ? '2px dashed #0694D1' : 'none',
                fontSize: 12,
                fontWeight: isStart || isEnd || isToday ? 700 : 400,
                color: isStart || isEnd ? '#fff' : isToday ? '#0694D1' : '#1e293b',
              }}>{d}</div>
            </div>
          )
        })}
      </div>

      {/* Actions row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
        <button onClick={() => onChange('', '')}
          style={{ flex: 1, padding: '10px 0', borderRadius: 20, background: 'transparent', border: `1.5px solid ${(startDate || endDate) ? '#94a3b8' : '#E2E8F0'}`, cursor: (startDate || endDate) ? 'pointer' : 'default', color: (startDate || endDate) ? '#64748b' : '#CBD5E1', fontSize: 13, fontWeight: 700, transition: 'border-color 0.2s, color 0.2s' }}>
          Clear
        </button>
        <button onClick={onApply} disabled={!startDate || !endDate}
          style={{ flex: 1, padding: '10px 0', borderRadius: 20, background: startDate && endDate ? '#0694D1' : '#E2E8F0', border: 'none', cursor: startDate && endDate ? 'pointer' : 'default', color: startDate && endDate ? '#fff' : '#94a3b8', fontSize: 13, fontWeight: 700, transition: 'background 0.2s' }}>
          Apply
        </button>
      </div>
    </div>
  )
}

/* ─── Mode options for filter modal ─────────────────────── */
const MODE_OPTIONS = [
  { key: 'Only GTR',        label: 'Guaranteed to Run', sub: 'Confirmed dates',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> },
  { key: 'Only Live Online', label: 'Online',            sub: 'Live virtual',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
  { key: 'Only Classroom',  label: 'Classroom',         sub: 'In person',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { key: 'Self-Paced',      label: 'Self-Paced',        sub: 'Flexi anytime',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
]

/* ─── Mobile date card (matches desktop card style) ─────── */
function MobileDateDropdown({ startDate, endDate, onChange }: { startDate: string; endDate: string; onChange: (s: string, e: string) => void }) {
  const [open, setOpen] = useState(false)
  const hasDate = !!(startDate || endDate)
  const fmtShort = (d: string) => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : ''
  return (
    <div className="w-full rounded-2xl overflow-hidden"
      style={{ background: '#fff', border: `1.5px solid ${hasDate ? '#0694D1' : '#D1D5DB'}`, boxShadow: hasDate ? '0 4px 18px rgba(6,148,209,0.18)' : 'none', transition: 'border-color 0.2s, box-shadow 0.2s' }}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: '#EDF4FF' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold uppercase" style={{ color: '#0b2545', letterSpacing: '0.09em' }}>Date Range</span>
            {hasDate && (
              <span className="text-xs font-semibold" style={{ color: '#0694D1' }}>
                {fmtShort(startDate) || '…'} – {fmtShort(endDate) || '…'}
              </span>
            )}
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="#94a3b8"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4" style={{ borderTop: '1px solid #EEF3F9' }}>
          <div className="pt-3">
            <MobileCalendar startDate={startDate} endDate={endDate} onChange={onChange} onApply={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

function FilterDrawer({
  open, onClose,
  oem, setOem,
  technology, setTechnology,
  durations, setDurations,
  priceRange, setPriceRange,
  modes, toggleMode,
  classroomCity, setClassroomCity,
  initialTab,
  onClearAll,
}: {
  open: boolean; onClose: () => void;
  oem: string; setOem: (v: string) => void;
  technology: string; setTechnology: (v: string) => void;
  durations: string[]; setDurations: (v: string[]) => void;
  priceRange: [number, number] | null; setPriceRange: (v: [number, number] | null) => void;
  modes: string[]; toggleMode: (m: string) => void;
  classroomCity: string; setClassroomCity: (v: string) => void;
  initialTab?: string;
  onClearAll: () => void;
}) {
  const [activeTab, setActiveTab] = useState(initialTab || 'Vendor')
  const [search, setSearch] = useState('')

  useEffect(() => { if (open) setActiveTab(initialTab || 'Vendor') }, [open])
  useEffect(() => { setSearch('') }, [activeTab])

  const categories = [
    { key: 'Vendor',     active: oem !== 'All OEMs',               count: oem !== 'All OEMs' ? 1 : 0,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { key: 'Technology', active: technology !== 'All Technologies', count: technology !== 'All Technologies' ? 1 : 0,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
    { key: 'Duration',   active: durations.length > 0,             count: durations.length,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { key: 'Budget',     active: !!priceRange,                     count: priceRange ? 1 : 0,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 0 0 7H6"/></svg> },
    { key: 'Mode',       active: modes.length > 0,                 count: modes.length,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
  ]

  const activeCount = categories.filter(c => c.active).length

  const allOptions: Record<string, string[]> = {
    Vendor:     ALL_OEMS.filter(o => o !== 'All OEMs'),
    Technology: ALL_TECHNOLOGIES.filter(t => t !== 'All Technologies'),
    Duration:   DURATION_ITEMS.map(d => d.label),
    Budget:     [],
  }

  const filtered = (allOptions[activeTab] || []).filter(o =>
    !search || o.toLowerCase().includes(search.toLowerCase())
  )

  function isSelected(opt: string) {
    if (activeTab === 'Vendor')     return oem === opt
    if (activeTab === 'Technology') return technology === opt
    if (activeTab === 'Duration')   return durations.includes(opt)
    if (activeTab === 'Budget')     return false
    return false
  }

  function toggle(opt: string) {
    if (activeTab === 'Vendor')     setOem(oem === opt ? 'All OEMs' : opt)
    if (activeTab === 'Technology') setTechnology(technology === opt ? 'All Technologies' : opt)
    if (activeTab === 'Duration')   setDurations(durations.includes(opt) ? durations.filter(x => x !== opt) : [...durations, opt])
    // Budget handled by PriceRangeSlider directly
  }

  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} onClick={onClose} />

      {/* Modal */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 420, height: '88vh', borderRadius: 16, background: '#fff', display: 'flex', flexDirection: 'column', zIndex: 1, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>

        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F4F8', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#0b2545' }}>Filter</span>
          <button onClick={onClose} aria-label="Close filters"
            style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: '#F1F5F9', color: '#64748b', cursor: 'pointer', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Two-panel body */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Left — category list */}
          <div style={{ width: 130, borderRight: '1px solid #F0F4F8', overflowY: 'auto', flexShrink: 0, background: '#FAFBFC' }}>
            {categories.map(cat => {
              const isActive = activeTab === cat.key
              const color = cat.active ? '#0694D1' : isActive ? '#0b2545' : '#64748b'
              return (
                <button key={cat.key} onClick={() => setActiveTab(cat.key)}
                  style={{
                    width: '100%', padding: '14px 12px', textAlign: 'left' as const,
                    background: isActive ? '#fff' : 'transparent',
                    borderLeft: `3px solid ${isActive ? '#0694D1' : 'transparent'}`,
                    borderTop: 'none', borderRight: 'none', borderBottom: '1px solid #F0F4F8',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                  <span style={{ color, display: 'flex', alignItems: 'center', flexShrink: 0 }}>{cat.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: cat.active ? 700 : isActive ? 600 : 400, color, lineHeight: 1.3, whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>{cat.key}</span>
                  {cat.count > 0 && (
                    <span style={{ background: '#0694D1', color: '#fff', fontSize: 10, fontWeight: 800, borderRadius: 4, padding: '1px 5px', lineHeight: 1.5, flexShrink: 0 }}>{cat.count}</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Right — search + list */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>
            {/* Search — hidden for Mode and Budget tabs */}
            {activeTab !== 'Mode' && activeTab !== 'Budget' && (
              <div style={{ padding: '10px 14px', borderBottom: '1px solid #F0F4F8', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#F1F5F9', borderRadius: 8, padding: '7px 10px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"
                    style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: '#0b2545' }} />
                </div>
              </div>
            )}

            {/* Options */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {activeTab === 'Budget' ? (
                <div style={{ padding: '16px 14px' }}>
                  <PriceRangeSlider value={priceRange} onChange={setPriceRange} inline />
                </div>
              ) : activeTab === 'Mode' ? (
                MODE_OPTIONS.map(m => {
                  const sel = modes.includes(m.key)
                  const isSelfPaced = m.key === 'Self-Paced'
                  const selfPacedOn = modes.includes('Self-Paced')
                  const othersOn = modes.some(x => x !== 'Self-Paced')
                  const liveOnlineOn = modes.includes('Only Live Online')
                  const classroomOn = modes.includes('Only Classroom')
                  const disabled = isSelfPaced ? othersOn
                    : selfPacedOn
                    || (m.key === 'Only Classroom' && liveOnlineOn)
                    || (m.key === 'Only Live Online' && classroomOn)
                  return (
                    <div key={m.key}>
                      <button onClick={() => !disabled && toggleMode(m.key)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 14px', background: sel ? '#F0F9FF' : 'transparent', border: 'none', borderBottom: '1px solid #F0F4F8', cursor: disabled ? 'not-allowed' : 'pointer', textAlign: 'left' as const, opacity: disabled ? 0.42 : 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 34, height: 34, borderRadius: 10, background: sel ? '#DBEAFE' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {m.icon}
                          </div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: sel ? 700 : 500, color: sel ? '#0694D1' : '#0b2545' }}>{m.label}</div>
                            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{m.sub}</div>
                          </div>
                        </div>
                        <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${sel ? '#0694D1' : '#D1D5DB'}`, background: sel ? '#0694D1' : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {sel && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                      </button>
                      {m.key === 'Only Classroom' && sel && (
                        <div style={{ padding: '12px 14px', borderBottom: '1px solid #F0F4F8', background: '#F8FBFF' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span style={{ fontSize: 11, fontWeight: 700, color: '#0b2545', textTransform: 'uppercase', letterSpacing: '0.08em' }}>City</span>
                          </div>
                          <CitySelect value={classroomCity} onChange={setClassroomCity} />
                        </div>
                      )}
                    </div>
                  )
                })
              ) : (
                filtered.map(opt => {
                  const sel = isSelected(opt)
                  const isMulti = activeTab === 'Duration'
                  return (
                    <button key={opt} onClick={() => toggle(opt)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: sel ? '#F0F9FF' : 'transparent', border: 'none', borderBottom: '1px solid #F8FAFC', cursor: 'pointer', textAlign: 'left' as const }}>
                      <span style={{ fontSize: 13, color: sel ? '#0694D1' : '#374151', fontWeight: sel ? 600 : 400, paddingRight: 8 }}>{opt}</span>
                      {isMulti ? (
                        <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${sel ? '#0694D1' : '#D1D5DB'}`, background: sel ? '#0694D1' : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {sel && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                      ) : (
                        <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${sel ? '#0694D1' : '#D1D5DB'}`, background: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {sel && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0694D1' }} />}
                        </div>
                      )}
                    </button>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 20px 18px', borderTop: '1px solid #F0F4F8', display: 'flex', gap: 12, flexShrink: 0 }}>
          <button onClick={() => { onClearAll(); onClose() }}
            style={{ flex: 1, padding: '12px 0', borderRadius: 12, border: '1.5px solid #D1D5DB', background: '#fff', fontSize: 14, fontWeight: 700, color: '#374151', cursor: 'pointer' }}>
            Close
          </button>
          <button onClick={onClose}
            style={{ flex: 1, padding: '12px 0', borderRadius: 12, border: 'none', background: activeCount > 0 ? '#0694D1' : '#E2E8F0', fontSize: 14, fontWeight: 700, color: activeCount > 0 ? '#fff' : '#94a3b8', cursor: 'pointer', transition: 'background 0.2s' }}>
            {activeCount > 0 ? `Apply (${activeCount})` : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Syllabus Modal (matches tech page ContactForm style) ── */
const HEAR_OPTIONS = ['Select Option','Google Search','Social Media','LinkedIn','Colleague / Referral','Email Newsletter','Other']

const CIT_COUNTRIES = [
  'Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Bahrain','Bangladesh',
  'Belgium','Brazil','Canada','Chile','China','Colombia','Croatia','Czech Republic','Denmark',
  'Egypt','Ethiopia','Finland','France','Germany','Ghana','Greece','Hong Kong','Hungary',
  'India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Japan','Jordan','Kazakhstan',
  'Kenya','Kuwait','Lebanon','Malaysia','Mexico','Morocco','Netherlands','New Zealand',
  'Nigeria','Norway','Oman','Pakistan','Peru','Philippines','Poland','Portugal','Qatar',
  'Romania','Russia','Saudi Arabia','Singapore','South Africa','South Korea','Spain','Sri Lanka',
  'Sweden','Switzerland','Taiwan','Thailand','Turkey','Ukraine','United Arab Emirates',
  'United Kingdom','United States','Venezuela','Vietnam','Zimbabwe',
]

function SyllabusModal({ courseName, onClose }: { courseName: string; onClose: () => void }) {
  const [sylName, setSylName]           = useState('')
  const [sylEmail, setSylEmail]         = useState('')
  const [sylCountry, setSylCountry]     = useState('')
  const [sylCountryOpen, setSylCountryOpen] = useState(false)
  const [submitted, setSubmitted]       = useState(false)
  const countryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setSylCountryOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const close = () => { onClose(); setSylName(''); setSylEmail(''); setSylCountry(''); setSylCountryOpen(false); setSubmitted(false) }

  const inp: React.CSSProperties = { width: '100%', boxSizing: 'border-box', background: 'rgba(6,148,209,0.08)', border: '1.5px solid rgba(6,148,209,0.3)', borderRadius: 10, padding: '11px 14px', fontSize: 13.5, color: '#fff', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s' }
  const lbl: React.CSSProperties = { fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: 5, display: 'block' }

  return (
    <>
      <style>{`@keyframes citSylSlideIn{from{opacity:0;transform:translate(-50%,-54%)}to{opacity:1;transform:translate(-50%,-50%)}}`}</style>
      <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(5px)' }}
        onClick={e => { if (e.target === e.currentTarget) close() }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 2001, width: '100%', maxWidth: 440, background: 'linear-gradient(160deg,#062238 0%,#093148 100%)', borderRadius: 20, padding: '32px 28px 28px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', fontFamily: 'inherit', animation: 'citSylSlideIn 0.3s cubic-bezier(0.25,1,0.5,1)' }}>
        {/* Close */}
        <button onClick={close} style={{ position: 'absolute', top: 14, right: 14, width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '12px 0 4px' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(6,148,209,0.15)', border: '1.5px solid rgba(6,148,209,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.25 }}>You&apos;re all set, {sylName.split(' ')[0]}!</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 20 }}>
              The course content for <strong style={{ color: '#0694D1' }}>{courseName || 'this course'}</strong> will be sent to <strong style={{ color: '#fff' }}>{sylEmail}</strong> shortly.
            </div>
            <div style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Check your inbox — usually arrives within 2 minutes
            </div>
            <button onClick={close} style={{ width: '100%', padding: 11, borderRadius: 10, border: '1px solid rgba(6,148,209,0.35)', background: 'transparent', color: '#0694D1', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
          </div>
        ) : (
          <>
            {/* Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0694D1', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, color: '#0694D1', textTransform: 'uppercase' }}>Download Syllabus</span>
            </div>
            {/* Course name box */}
            {courseName && (
              <div style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 14px', marginBottom: 18, background: 'rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: 5 }}>Course</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0694D1', lineHeight: 1.4 }}>{courseName}</div>
              </div>
            )}
            <div style={{ marginBottom: 6 }}><div style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Get the Course Content</div></div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 22 }}>Fill in your details and we&apos;ll send it straight to your inbox.</div>

            <form onSubmit={e => { e.preventDefault(); if (!sylCountry) return; setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={lbl}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input required placeholder="John" value={sylName} onChange={e => setSylName(e.target.value)} style={inp}
                  onFocus={e => (e.target.style.borderColor = '#0694D1')} onBlur={e => (e.target.style.borderColor = 'rgba(6,148,209,0.3)')} />
              </div>
              <div>
                <label style={lbl}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                <input required type="email" placeholder="john@example.com" value={sylEmail} onChange={e => setSylEmail(e.target.value)} style={inp}
                  onFocus={e => (e.target.style.borderColor = '#0694D1')} onBlur={e => (e.target.style.borderColor = 'rgba(6,148,209,0.3)')} />
              </div>
              <div>
                <label style={lbl}>Country <span style={{ color: '#ef4444' }}>*</span></label>
                <div ref={countryRef} style={{ position: 'relative' }}>
                  <button type="button" onClick={() => setSylCountryOpen(o => !o)}
                    style={{ width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,148,209,0.08)', border: `1.5px solid ${sylCountryOpen ? '#0694D1' : 'rgba(6,148,209,0.3)'}`, borderRadius: 10, padding: '11px 14px', fontSize: 13.5, color: sylCountry ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer', fontFamily: 'inherit', outline: 'none' }}>
                    {sylCountry || 'Select your country'}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: sylCountryOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {sylCountryOpen && (
                    <div style={{ position: 'absolute', bottom: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 10000, background: '#0d2535', border: '1.5px solid rgba(6,148,209,0.35)', borderRadius: 10, maxHeight: 220, overflowY: 'auto', overscrollBehavior: 'contain', boxShadow: '0 -8px 32px rgba(0,0,0,0.6)' }}>
                      <div style={{ padding: '9px 14px', fontSize: 13.5, color: 'rgba(255,255,255,0.35)', cursor: 'default', borderBottom: '1px solid rgba(6,148,209,0.15)' }}>Select your country</div>
                      {CIT_COUNTRIES.map(c => (
                        <div key={c} onClick={() => { setSylCountry(c); setSylCountryOpen(false) }}
                          style={{ padding: '9px 14px', fontSize: 13.5, cursor: 'pointer', color: sylCountry === c ? '#fff' : '#c8dce9', background: sylCountry === c ? '#1a5fa8' : 'transparent', transition: 'background 0.12s' }}
                          onMouseEnter={e => { if (sylCountry !== c) e.currentTarget.style.background = 'rgba(6,148,209,0.18)' }}
                          onMouseLeave={e => { if (sylCountry !== c) e.currentTarget.style.background = 'transparent' }}>
                          {c}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Course content will be sent to your email ID</span>
              </div>
              <button type="submit" onClick={e => { if (!sylCountry) { e.preventDefault(); setSylCountryOpen(true) } }}
                style={{ width: '100%', padding: 13, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#0694D1,#0577ab)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', letterSpacing: 0.2, boxShadow: '0 4px 18px rgba(6,148,209,0.4)', marginTop: 2, transition: 'filter 0.18s' }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.12)')} onMouseLeave={e => (e.currentTarget.style.filter = 'none')}>
                Send Course Content →
              </button>
              <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                No spam, ever. Unsubscribe anytime.
              </div>
            </form>
          </>
        )}
      </div>
    </>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function CorporateITTrainingPage() {
  const [search, setSearch] = useState('')
  const [expandAll, setExpandAll] = useState(false)
  const [durations, setDurations] = useState<string[]>([])
  const [oem, setOem] = useState('All OEMs')
  const [technology, setTechnology] = useState('All Technologies')
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null)
  const [modes, setModes] = useState<string[]>([])
  const [classroomCity, setClassroomCity] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [page, setPage] = useState(1)
  const isFirstPageRender = useRef(true)

  useEffect(() => { setPage(1) }, [search])

  useEffect(() => {
    if (isFirstPageRender.current) { isFirstPageRender.current = false; return }
    document.getElementById('course-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [page])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      const today = new Date()
      const next = new Date(today)
      next.setMonth(next.getMonth() + 1)
      setStartDate(toCalIso(today))
      setEndDate(toCalIso(next))
    }
  }, [])

  const [sortBy, setSortBy] = useState('Popularity')
  const [currency, setCurrency] = useState('INR')
  const [modal, setModal] = useState(false)
  const [syllabusOpen, setSyllabusOpen] = useState(false)
  const [syllabusCourse, setSyllabusCourse] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterInitialTab, setFilterInitialTab] = useState('Vendor')
  function openFilter(tab = 'Vendor') { setFilterInitialTab(tab); setFilterOpen(true) }

  function toggleMode(m: string) {
    if (m === 'Only Classroom' && modes.includes('Only Classroom')) setClassroomCity('')
    if (m === 'Only Live Online' && modes.includes('Only Classroom')) setClassroomCity('')
    setModes(prev => {
      if (m === 'Self-Paced') return prev.includes(m) ? [] : ['Self-Paced']
      const withoutSP = prev.filter(x => x !== 'Self-Paced')
      if (withoutSP.includes(m)) return withoutSP.filter(x => x !== m)
      if (m === 'Only Live Online') return [...withoutSP.filter(x => x !== 'Only Classroom'), m]
      if (m === 'Only Classroom') return [...withoutSP.filter(x => x !== 'Only Live Online'), m]
      return [...withoutSP, m]
    })
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

  const sortedVendors = useMemo(() => {
    const arr = [...VENDORS]
    if (sortBy === 'Shortest Duration') return arr.sort((a, b) => a.courses - b.courses)
    if (sortBy === 'Longest Duration') return arr.sort((a, b) => b.courses - a.courses)
    if (sortBy === 'Lowest Fees') return arr.sort((a, b) => a.name.localeCompare(b.name))
    if (sortBy === 'Highest Fees') return arr.sort((a, b) => b.name.localeCompare(a.name))
    return arr
  }, [sortBy])

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
          .cit-modal-overlay { position: fixed; inset: 0; z-index: 500; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); display: flex; align-items: flex-start; justify-content: center; padding: 24px 20px; overflow-y: auto; animation: citFadeIn 0.2s ease; }
          @keyframes citFadeIn { from { opacity:0; } to { opacity:1; } }
          @keyframes citScaleIn { from { opacity:0; transform:scale(0.96) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
          .cit-modal-box { background: linear-gradient(160deg,#091e30 0%,#071525 100%); border: 1px solid rgba(6,148,209,0.25); border-radius: 24px; padding: 28px 32px; max-width: 640px; width: 100%; position: relative; animation: citScaleIn 0.25s ease; margin: auto; box-shadow: 0 24px 80px rgba(0,0,0,0.6); }
          .cit-modal-close { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.06); border: none; color: rgba(255,255,255,0.5); width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
          .cit-modal-close:hover { background: rgba(255,255,255,0.1); color: #fff; }
          .cit-cert-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
          .cit-cert-card { background: #fff; border: 1.5px solid rgba(6,148,209,0.12); border-radius: 14px; padding: 16px 16px 14px; cursor: pointer; transition: all 0.25s; display: flex; flex-direction: column; position: relative; overflow: visible; min-height: 250px; box-shadow: 0 2px 10px rgba(6,148,209,0.07); }
          .cit-cert-card:hover { box-shadow: 0 8px 32px rgba(6,148,209,0.18), 0 2px 8px rgba(0,0,0,0.06); border-color: rgba(6,148,209,0.3); }
          .cit-hot-badge { position: absolute; top: 0; right: 0; display: inline-flex; align-items: center; gap: 4px; height: 20px; font-size: 9px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; padding: 0 10px 0 8px; border-radius: 0 14px 0 10px; background: linear-gradient(135deg,#0694D1,#22d3ee); color: #fff; box-shadow: -2px 2px 8px rgba(6,148,209,0.28); z-index: 2; }
          .cit-badge { display: inline-flex; align-items: center; gap: 3px; font-size: 9px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase; padding: 3px 9px 3px 7px; border-radius: 20px; width: fit-content; line-height: 1; }
          .cit-badge.fund { background: linear-gradient(135deg,#4DBFEF,#0694D1); color: #fff; box-shadow: 0 2px 8px rgba(6,148,209,0.25); }
          .cit-badge.assoc { background: linear-gradient(135deg,#0694D1,#076D9D); color: #fff; box-shadow: 0 2px 8px rgba(6,108,157,0.3); }
          .cit-badge.expert { background: linear-gradient(135deg,#076D9D,#062238); color: #fff; box-shadow: 0 2px 8px rgba(6,34,56,0.35); }
          .cit-cert-name { font-size: 15px; font-weight: 800; color: #071e2e; line-height: 1.4; flex: 1; letter-spacing: -0.01em; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; min-height: 59px; margin-top: 10px; margin-bottom: 0; }
          .cit-code-row { display: flex; align-items: center; gap: 5px; margin-bottom: 10px; flex-wrap: wrap; margin-top: 8px; }
          .cit-code { display: inline-block; font-size: 11px; font-family: 'SFMono-Regular','Consolas',monospace; color: #0694D1; background: rgba(6,148,209,0.1); border: 1px solid rgba(6,148,209,0.28); padding: 2px 7px; border-radius: 4px; font-weight: 700; letter-spacing: 0.4px; }
          .cit-hours { display: inline-flex; align-items: center; gap: 3px; font-size: 11px; font-family: 'SFMono-Regular','Consolas',monospace; color: #5a7a90; background: rgba(6,148,209,0.05); border: 1px solid rgba(6,148,209,0.14); padding: 2px 7px; border-radius: 4px; font-weight: 600; letter-spacing: 0.3px; }
          .cit-cert-footer { display: flex; flex-direction: column; gap: 8px; margin-top: auto; border-top: 1px solid rgba(6,148,209,0.08); padding-top: 10px; }
          .cit-price-row { display: flex; align-items: center; gap: 6px; }
          .cit-enrolled { font-size: 10px; color: #5a7a90; font-weight: 600; display: flex; align-items: center; gap: 4px; }
          .cit-rating { display: flex; align-items: center; gap: 2px; font-size: 10px; font-weight: 700; color: #d97706; }
          .cit-price { display: flex; align-items: baseline; gap: 1px; margin-left: auto; }
          .cit-price-amount { font-size: 15px; font-weight: 700; color: #0694D1; letter-spacing: -0.3px; line-height: 1; }
          .cit-price-curr { font-size: 10px; font-weight: 600; color: #0694D1; margin-right: 1px; opacity: 0.8; }
          .cit-actions { display: flex; gap: 7px; }
          .cit-btn-syllabus { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 7px 8px; border-radius: 8px; font-size: 11px; font-weight: 700; background: transparent; color: #0694D1; border: 1.5px solid #0694D1; cursor: pointer; transition: background 0.18s; white-space: nowrap; font-family: inherit; }
          .cit-btn-syllabus:hover { background: rgba(6,148,209,0.07); }
          .cit-btn-view { flex: 1; display: flex; align-items: center; justify-content: center; padding: 7px 8px; border-radius: 8px; font-size: 11.5px; font-weight: 700; background: linear-gradient(135deg,#093148 0%,#0d5280 100%); color: #fff; border: none; cursor: pointer; white-space: nowrap; font-family: inherit; text-decoration: none; box-shadow: 0 2px 8px rgba(9,49,72,0.3); transition: filter 0.22s; }
          .cit-btn-view:hover { filter: brightness(1.25); }
          @media (max-width: 1280px) { .cit-cert-grid { grid-template-columns: repeat(3,1fr); } }
          @media (max-width: 1024px) { .cit-cert-grid { grid-template-columns: repeat(2,1fr); } }
          @media (max-width: 640px) { .cit-cert-grid { grid-template-columns: repeat(2,1fr); gap: 10px; } }
          @media (max-width: 480px) { .cit-cert-grid { grid-template-columns: 1fr; } }
          @media (max-width: 640px) {
            .cit-cert-card { padding: 12px 12px 10px; min-height: 200px; }
            .cit-cert-name { font-size: 14px; min-height: 50px; }
            .cit-modal-box { padding: 20px 16px; border-radius: 16px; }
            .cit-modal-overlay { padding: 16px 12px; }
            .cit-price-amount { font-size: 13px; }
            .cit-btn-syllabus, .cit-btn-view { font-size: 11px; padding: 6px 7px; }
            .cit-dropdown {
              position: fixed !important;
              left: 50% !important;
              top: 50% !important;
              transform: translate(-50%, -50%) !important;
              width: calc(100vw - 32px) !important;
              max-width: 360px !important;
              max-height: 75vh;
              overflow-y: auto;
              z-index: 9999 !important;
            }
          }
        `}</style>

        <div className="relative mx-auto max-w-7xl pt-5 lg:pt-[35px] pb-16 sm:pb-20 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <h1 className="text-[22px] lg:text-3xl xl:text-[2.4rem] font-bold leading-tight mb-[15px] text-white">
                <span className="block">Train Your Team.</span>
                <span className="block" style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  5,000+ Certified Courses.
                </span>
              </h1>
              <p className="text-[14px] lg:text-lg leading-relaxed mb-[15px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Vendor-authorized corporate IT certification training across 40+ partners.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <button onClick={() => setModal(true)}
                  className="inline-flex justify-center items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #0694D1)', boxShadow: '0 0 20px rgba(6,148,209,0.35)', border:'none', cursor:'pointer', fontFamily:'inherit' }}>
                  Request More Info
                </button>
              </div>
            </div>

            {/* Right — stat + partner cards (desktop) */}
            <div className="hidden lg:flex flex-col gap-4">
              {/* Stats card */}
              <div style={{ borderRadius: 20, border: '1px solid rgba(6,148,209,0.15)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,148,209,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
                {[
                  [{ icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>, val: '5,000+', label: 'Total Courses' },
                   { icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>, val: '195+', label: 'Countries Served' }],
                  [{ icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>, val: '1M+', label: 'Professionals Trained' },
                   { icon: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>, val: '95%', label: 'First-Attempt Pass Rate' }],
                ].map((row, ri) => (
                  <div key={ri}>
                    {ri > 0 && <div style={{ height: 1, background: 'rgba(6,148,209,0.12)' }} />}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                      {row.map((s, ci) => (
                        <div key={ci} className="cit-stat" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6, position: 'relative', overflow: 'hidden', cursor: 'default', borderLeft: ci > 0 ? '1px solid rgba(6,148,209,0.12)' : 'none' }}>
                          <div className="cit-glow" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(6,148,209,0.5), transparent)', opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{s.icon}</svg>
                            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #ffffff 0%, #50e6ff 60%, #0694D1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
                          </div>
                          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section header — lives inside the hero so the filter card can fold up over the banner edge */}
          <div className="text-center" style={{ marginTop: '30px' }}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Find Your Course</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Use the filters below to narrow down from 5,000+ courses across 17 vendors</p>
          </div>
        </div>
      </section>

      {/* ── FIND YOUR COURSE ─────────────────────────────────── */}
      <section id="courses" className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-[50px] pb-6 sm:pb-10" style={{ background: 'radial-gradient(ellipse 90% 500px at 50% 0%, rgba(6,148,209,0.09) 0%, transparent 70%)' }}>

        {/* ── Filter section — pulled up to fold over the bottom of the hero banner ── */}
        <div className="relative z-10 -mt-14 sm:-mt-16 rounded-3xl p-6" style={{ background: '#fff', border: '2px solid rgba(6,148,209,0.8)', boxShadow: '0 12px 36px rgba(6,148,209,0.18)' }}>

          {/* Row 1: Filter button on mobile/tablet, cards on desktop */}
          {/* Mobile/tablet filter trigger — filters top, date below */}
          <div className="block lg:hidden">
            <div className="flex flex-col gap-3">
              <MobileDateDropdown
                startDate={startDate} endDate={endDate}
                onChange={(s, e) => { setStartDate(s); setEndDate(e) }}
              />
              {(() => {
                const activeCount = [
                  oem !== 'All OEMs', technology !== 'All Technologies', durations.length > 0, !!priceRange, modes.length > 0
                ].filter(Boolean).length
                const chips = [
                  { label: 'Vendor',     active: oem !== 'All OEMs',                  count: oem !== 'All OEMs' ? 1 : 0 },
                  { label: 'Technology', active: technology !== 'All Technologies',    count: technology !== 'All Technologies' ? 1 : 0 },
                  { label: 'Duration',   active: durations.length > 0,                count: durations.length },
                  { label: 'Budget',     active: !!priceRange,                            count: priceRange ? 1 : 0 },
                  { label: 'Mode',       active: modes.length > 0,                    count: modes.length },
                ]
                return (
                  <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none' }}>
                    {/* Main filter button */}
                    <button onClick={() => openFilter('Vendor')}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, height: 44, boxSizing: 'border-box', padding: '0 14px', borderRadius: 6, background: '#fff', border: `1.5px solid ${activeCount > 0 ? '#0694D1' : '#D1D5DB'}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      {activeCount > 0 && (
                        <span style={{ background: '#0694D1', color: '#fff', fontSize: 11, fontWeight: 800, borderRadius: 5, padding: '1px 6px', lineHeight: 1.4 }}>{activeCount}</span>
                      )}
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#0b2545' }}>Filter</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0b2545" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="7" x2="21" y2="7"/><circle cx="8" cy="7" r="2.5" fill="#0b2545" stroke="none"/>
                        <line x1="3" y1="17" x2="21" y2="17"/><circle cx="16" cy="17" r="2.5" fill="#0b2545" stroke="none"/>
                      </svg>
                    </button>
                    {/* Individual filter chips */}
                    {chips.map(chip => (
                      <button key={chip.label} onClick={() => openFilter(chip.label)}
                        style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0, height: 44, boxSizing: 'border-box', padding: '0 12px', borderRadius: 6, background: '#fff', border: `1.5px solid ${chip.active ? '#0694D1' : '#D1D5DB'}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        {chip.count > 0 && (
                          <span style={{ background: '#0694D1', color: '#fff', fontSize: 11, fontWeight: 800, borderRadius: 5, padding: '1px 6px', lineHeight: 1.4 }}>{chip.count}</span>
                        )}
                        <span style={{ fontSize: 13, fontWeight: chip.active ? 700 : 500, color: chip.active ? '#0694D1' : '#374151' }}>
                          {chip.label}
                        </span>
                        <svg width="11" height="11" viewBox="0 0 20 20" fill={chip.active ? '#0694D1' : '#9CA3AF'}>
                          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd"/>
                        </svg>
                      </button>
                    ))}
                  </div>
                )
              })()}
            </div>
          </div>

          {/* Filter bar — desktop only */}
          <div className="hidden lg:block">
            {(() => {
              const pill = (active: boolean) => ({
                background: active ? '#fff' : '#F8FAFC',
                border: `2px solid ${active ? '#0b2545' : '#E2E8F0'}`,
                boxShadow: active ? '0 4px 14px rgba(11,37,69,0.12)' : '0 1px 3px rgba(15,23,42,0.04)',
                transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
                minHeight: '44px',
              })
              const iconBox = (svg: React.ReactNode) => (
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#EDF4FF' }}>{svg}</div>
              )
              const dateActive = !!(startDate || endDate)
              const oemActive = oem !== 'All OEMs'
              const techActive = technology !== 'All Technologies'
              const durActive = durations.length > 0
              const priceActive = !!priceRange
              return (
                <div className="grid grid-cols-5 gap-3 mb-5">
                  <div className="rounded-full pl-3 pr-4 py-2 flex items-center gap-2 w-full" style={{ ...pill(dateActive), cursor: 'pointer' }}
                    onClick={(e) => { const t = e.target as HTMLElement; if (!t.closest('button') && !t.closest('input')) { const btn = e.currentTarget.querySelector<HTMLButtonElement>('button'); if (btn) btn.click() } }}>
                    {iconBox(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>)}
                    <div className="flex-1 min-w-0">
                      <DateRangeSelect startDate={startDate} endDate={endDate} onChange={(s, e) => { setStartDate(s); setEndDate(e) }} />
                    </div>
                  </div>

                  <div className="rounded-full pl-3 pr-4 py-2 flex items-center gap-2 w-full" style={{ ...pill(oemActive), cursor: 'pointer' }}
                    onClick={(e) => { const t = e.target as HTMLElement; if (!t.closest('button') && !t.closest('input')) { const btn = e.currentTarget.querySelector<HTMLButtonElement>('button'); if (btn) btn.click() } }}>
                    {iconBox(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>)}
                    <div className="flex-1 min-w-0">
                      <InlineSelect value={oem} options={ALL_OEMS} onChange={setOem} placeholder="Any partner" searchable />
                    </div>
                  </div>

                  <div className="rounded-full pl-3 pr-4 py-2 flex items-center gap-2 w-full" style={{ ...pill(techActive), cursor: 'pointer' }}
                    onClick={(e) => { const t = e.target as HTMLElement; if (!t.closest('button') && !t.closest('input')) { const btn = e.currentTarget.querySelector<HTMLButtonElement>('button'); if (btn) btn.click() } }}>
                    {technology !== 'All Technologies' && TECH_ICONS[technology] ? (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#EDF4FF' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{TECH_ICONS[technology]}</svg>
                      </div>
                    ) : (
                      iconBox(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>)
                    )}
                    <div className="flex-1 min-w-0">
                      <InlineSelect value={technology} options={ALL_TECHNOLOGIES} onChange={setTechnology} placeholder="Any technology" searchable />
                    </div>
                  </div>

                  <div className="rounded-full pl-3 pr-4 py-2 flex items-center gap-2 w-full" style={{ ...pill(durActive), cursor: 'pointer' }}
                    onClick={(e) => { const t = e.target as HTMLElement; if (!t.closest('button') && !t.closest('input')) { const btn = e.currentTarget.querySelector<HTMLButtonElement>('button'); if (btn) btn.click() } }}>
                    {iconBox(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>)}
                    <div className="flex-1 min-w-0">
                      <DurationSelect values={durations} onChange={setDurations} />
                    </div>
                  </div>

                  <div className="rounded-full pl-3 pr-4 py-2 flex items-center gap-2 w-full" style={{ ...pill(priceActive), cursor: 'pointer' }}
                    onClick={(e) => { const t = e.target as HTMLElement; if (!t.closest('button') && !t.closest('input')) { const btn = e.currentTarget.querySelector<HTMLButtonElement>('button'); if (btn) btn.click() } }}>
                    {iconBox(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 0 0 7H6"/></svg>)}
                    <div className="flex-1 min-w-0">
                      <PriceRangeSlider value={priceRange} onChange={setPriceRange} />
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* How you want to learn — compact toggle chips instead of full cards */}
            <div className="mb-5">
              <span className="block text-xs font-bold uppercase mb-2.5" style={{ color: '#0b2545', letterSpacing: '0.09em' }}>Learning Mode</span>
              <div className={`grid grid-cols-2 gap-3 ${modes.includes('Only Classroom') ? 'sm:grid-cols-5' : 'sm:grid-cols-4'}`}>
                {[
                  { key: 'Only GTR', icon: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>, label: 'Guaranteed to Run', sub: 'Confirmed dates' },
                  { key: 'Only Live Online', icon: <><rect x="2" y="2" width="20" height="15" rx="2"/><polyline points="8 21 12 17 16 21"/></>, label: 'Online', sub: 'Live virtual' },
                  { key: 'Only Classroom', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>, label: 'Classroom', sub: 'In person' },
                  { key: 'Self-Paced', icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, label: 'Self-Paced', sub: 'Flexi anytime' },
                ].reduce<React.ReactNode[]>((acc, { key, icon, label, sub }) => {
                  const active = modes.includes(key)
                  const isSelfPaced = key === 'Self-Paced'
                  const selfPacedOn = modes.includes('Self-Paced')
                  const othersOn = modes.some(x => x !== 'Self-Paced')
                  const liveOnlineOn = modes.includes('Only Live Online')
                  const classroomOn = modes.includes('Only Classroom')
                  const disabled = isSelfPaced ? othersOn
                    : selfPacedOn
                    || (key === 'Only Classroom' && liveOnlineOn)
                    || (key === 'Only Live Online' && classroomOn)
                  acc.push(
                    <button key={key} onClick={() => !disabled && toggleMode(key)}
                      disabled={disabled}
                      className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-left transition-colors w-full"
                      style={{
                        background: '#fff',
                        border: `2px solid ${active ? '#0694D1' : '#E2E8F0'}`,
                        boxShadow: active ? '0 4px 14px rgba(6,148,209,0.15)' : 'none',
                        opacity: disabled ? 0.42 : 1,
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        transition: 'border-color 0.2s, box-shadow 0.2s, opacity 0.2s',
                      }}
                    >
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: active ? '#0694D1' : '#E2E8F0' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#476D8D'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                      </div>
                      <div className="leading-tight min-w-0 flex-1">
                        <p className="text-sm font-semibold truncate" style={{ color: '#374151' }}>{label}</p>
                        <p className="text-[11px] truncate" style={{ color: '#94a3b8' }}>{sub}</p>
                      </div>
                      <div className="flex items-center justify-center flex-shrink-0"
                        style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${active ? '#0694D1' : '#CBD5E1'}`, background: active ? '#0694D1' : '#fff', transition: 'background 0.15s, border-color 0.15s' }}>
                        {active && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  )
                  {/* City card — injected right after Classroom card, once selected */}
                  if (key === 'Only Classroom' && classroomOn) {
                    acc.push(
                      <div key="city-card" className="flex flex-col rounded-2xl px-3.5 py-2.5"
                        style={{
                          border: `2px solid ${classroomCity ? '#0694D1' : '#E2E8F0'}`,
                          background: '#fff',
                          boxShadow: classroomCity ? '0 4px 14px rgba(6,148,209,0.15)' : 'none',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                          cursor: 'pointer',
                        }}
                        onClick={(e) => { const t = e.target as HTMLElement; if (!t.closest('button') && !t.closest('input')) { const btn = e.currentTarget.querySelector<HTMLButtonElement>('button'); if (btn) btn.click() } }}>
                        <div className="flex items-center gap-2 mb-2">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                          </svg>
                          <span className="text-[11px] font-bold uppercase" style={{ color: '#0b2545', letterSpacing: '0.08em' }}>City</span>
                        </div>
                        <CitySelect value={classroomCity} onChange={setClassroomCity} />
                      </div>
                    )
                  }
                  return acc
                }, [])}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-5" style={{ borderTop: '1.5px solid #EEF3F9' }}>
              <button
                onClick={() => { setDurations([]); setOem('All OEMs'); setTechnology('All Technologies'); setPriceRange(null); setModes([]); setClassroomCity(''); setStartDate(''); setEndDate('') }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{ border: '1.5px solid #E2EBF6', color: '#64748b', background: '#fff' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                Reset
              </button>
              <button
                onClick={() => document.getElementById('course-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="flex items-center justify-center gap-2 px-9 py-3 rounded-xl text-sm font-bold text-white"
                style={{ background: '#0694D1', boxShadow: '0 4px 14px rgba(6,148,209,0.35)', minWidth: '320px' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Show results
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>

        </div>


        {/* ── Search bar + sort controls ── */}
        <div className="mt-10 mb-2 flex flex-col lg:flex-row gap-2 lg:items-center">
          {/* Search — grows to fill available space on desktop */}
          <div className="relative w-full lg:flex-1">
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
          {/* Sort by & Currency — centered on mobile, inline on desktop */}
          <div className="flex gap-3 justify-center lg:justify-end lg:shrink-0">
            <PillDropdown label="Sort by  " value={sortBy} options={['Popularity', 'Highest Fees', 'Lowest Fees', 'Longest Duration', 'Shortest Duration']} onChange={setSortBy} minWidth={160} />
            <PillDropdown value={currency} options={['INR', 'USD', 'AED', 'GBP']} onChange={setCurrency} minWidth={80} />
          </div>
        </div>

        {/* ── Popular Courses Grid ── */}
        {(() => {
          const PAGE_SIZE = 2 // TEMP: shrunk from 12 to preview multi-page "…" pagination with the current 24-item mock list. Revert to 12 once real course data is wired in.
          const q = search.toLowerCase()
          const displayed = q
            ? POPULAR_COURSES.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.code.toLowerCase().includes(q) ||
                c.vendor.toLowerCase().includes(q)
              )
            : POPULAR_COURSES
          const vendorCount = new Set(displayed.map(c => c.vendor)).size
          const totalPages = Math.max(1, Math.ceil(displayed.length / PAGE_SIZE))
          const safePage = Math.min(page, totalPages)
          const pageItems = displayed.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
          return (
            <div id="course-results" className="mt-6" style={{ scrollMarginTop: '90px' }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold" style={{ color: '#64748b' }}>{displayed.length} course{displayed.length !== 1 ? 's' : ''} found</p>
              </div>
              {displayed.length === 0 ? (
                <div className="text-center py-16">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 12, display: 'inline-block', opacity: 0.25, color: '#94a3b8' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <p className="font-semibold text-sm" style={{ color: '#64748b' }}>No courses found</p>
                  <button className="mt-3 text-xs font-semibold" style={{ color: '#0694D1' }} onClick={() => setSearch('')}>Clear search</button>
                </div>
              ) : (
                <div className="cit-cert-grid">
                  {pageItems.map((c, i) => {
                    const enrolled = stableNum(c.name, 1100, 5200).toLocaleString()
                    const rating = (4.5 + stableNum(c.name + 'r', 0, 6) * 0.1).toFixed(1)
                    const days = parseInt(c.dur) || 1
                    return (
                      <div key={i} className="cit-cert-card">
                        {c.hot && (
                          <span className="cit-hot-badge">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c0 0-5.5 6-5.5 10.5a5.5 5.5 0 0 0 11 0C17.5 8 12 2 12 2zm0 14a3 3 0 0 1-3-3c0-2.5 3-6 3-6s3 3.5 3 6a3 3 0 0 1-3 3z"/></svg>
                            Popular
                          </span>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                          <span className={`cit-badge ${c.level}`}>
                            {c.level === 'fund' ? (
                              <><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M5 3a7 7 0 0 0 7 7 7 7 0 0 0 7-7"/></svg>Fundamentals</>
                            ) : c.level === 'assoc' ? (
                              <><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>Associate</>
                            ) : (
                              <><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7l4 9h12l4-9-6 4-4-6-4 6z"/></svg>Expert</>
                            )}
                          </span>
                        </div>
                        <div className="cit-cert-name">{c.name.replace(/exam prep:\s*/gi, '').trim()}</div>
                        <div className="cit-code-row">
                          <span className="cit-code">{c.code}</span>
                          <span className="cit-hours">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            {c.dur} · {days * 8}hrs
                          </span>
                        </div>
                        <div className="cit-cert-footer">
                          <div className="cit-price-row">
                            <span className="cit-enrolled">
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                              {enrolled}
                            </span>
                            <span className="cit-rating">
                              <span>★</span>{rating}
                            </span>
                            <span className="cit-price">
                              <span className="cit-price-curr">₹</span>
                              <span className="cit-price-amount">33,000</span>
                            </span>
                          </div>
                          <div className="cit-actions">
                            <button className="cit-btn-syllabus" onClick={() => { setSyllabusCourse(c.name); setSyllabusOpen(true) }}>
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                              Download Syllabus
                            </button>
                            <a className="cit-btn-view" href="https://www.koenig-solutions.com/" target="_blank" rel="noopener noreferrer">
                              View Course
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-8">
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2, background: '#fff', border: '1.5px solid #E2EBF6', borderRadius: 999, padding: '6px 8px', boxShadow: '0 2px 10px rgba(6,148,209,0.06)' }}>
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={safePage === 1}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 4, height: 36, padding: '0 12px', borderRadius: 999,
                        border: 'none', background: 'transparent', fontSize: 13, fontWeight: 700, fontFamily: 'inherit',
                        color: safePage === 1 ? '#B9C6D6' : '#0694D1',
                        cursor: safePage === 1 ? 'not-allowed' : 'pointer',
                      }}
                      aria-label="Previous page"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                      Previous
                    </button>

                    {getPageWindow(safePage, totalPages).map((p, i) =>
                      p === '...' ? (
                        <span key={`ellipsis-${i}`} style={{ width: 28, textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#94a3b8' }}>…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          aria-current={p === safePage ? 'page' : undefined}
                          style={{
                            minWidth: 36, height: 36, padding: '0 4px', borderRadius: 10,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 13, fontWeight: p === safePage ? 800 : 600, fontFamily: 'inherit',
                            border: `1.5px solid ${p === safePage ? '#0b2545' : 'transparent'}`,
                            background: 'transparent',
                            color: p === safePage ? '#0b2545' : '#0694D1',
                            cursor: 'pointer',
                            transition: 'border-color 0.15s',
                          }}
                        >
                          {p}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={safePage === totalPages}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 4, height: 36, padding: '0 12px', borderRadius: 999,
                        border: 'none', background: 'transparent', fontSize: 13, fontWeight: 700, fontFamily: 'inherit',
                        color: safePage === totalPages ? '#B9C6D6' : '#0694D1',
                        cursor: safePage === totalPages ? 'not-allowed' : 'pointer',
                      }}
                      aria-label="Next page"
                    >
                      Next
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })()}
      </section>

      {/* Inline lead form below courses */}
      <section className="px-4 sm:px-6 py-10 sm:py-16" style={{ background: 'linear-gradient(135deg, #061624 0%, #071929 60%, #062236 100%)' }}>
        <div className="mx-auto px-4 sm:px-8" style={{ maxWidth: 640, background: 'linear-gradient(160deg,#091e30 0%,#071525 100%)', border: '1px solid rgba(6,148,209,0.25)', borderRadius: 20, padding: '24px 20px', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}>
          <EnterpriseLeadForm onClose={() => {}} />
        </div>
      </section>

      {modal && (
        <div className="cit-modal-overlay" onClick={e=>{ if(e.target===e.currentTarget) setModal(false); }}>
          <div className="cit-modal-box">
            <button className="cit-modal-close" onClick={()=>setModal(false)}>✕</button>
            <EnterpriseLeadForm onClose={()=>setModal(false)}/>
          </div>
        </div>
      )}

      {syllabusOpen && (
        <SyllabusModal courseName={syllabusCourse} onClose={() => setSyllabusOpen(false)} />
      )}

      <FilterDrawer
        open={filterOpen} onClose={() => setFilterOpen(false)}
        oem={oem} setOem={setOem}
        technology={technology} setTechnology={setTechnology}
        durations={durations} setDurations={setDurations}
        priceRange={priceRange} setPriceRange={setPriceRange}
        modes={modes} toggleMode={toggleMode}
        classroomCity={classroomCity} setClassroomCity={setClassroomCity}
        initialTab={filterInitialTab}
        onClearAll={() => { setOem('All OEMs'); setTechnology('All Technologies'); setDurations([]); setPriceRange(null); setModes([]); setClassroomCity('') }}
      />
    </div>
  )
}

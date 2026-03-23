'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { FallingPattern } from '@/components/ui/falling-pattern'
import EnterpriseHeroGlobe from '@/components/EnterpriseHeroGlobe'
import AuroraCanvas from '@/components/AuroraCanvas'

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

const FORMATS = [
  { title: 'Live Online Training',   icon: '🌐', desc: 'Instructor-led virtual sessions across all timezones. Teams join from any location.' },
  { title: '1-on-1 Training',        icon: '🎯', desc: 'Dedicated instructor assigned exclusively to your employee. Maximum focus, zero distractions.' },
  { title: 'Classroom Training',     icon: '🏫', desc: 'Onsite delivery at your premises or our training centres across 195+ countries.' },
  { title: 'Fly-Me-a-Trainer',       icon: '✈️', desc: 'We send a certified trainer to your location — ideal for large team deployments.' },
  { title: 'Customised Programmes',  icon: '⚙️', desc: 'Bespoke curricula tailored to your tech stack, business processes, and learning objectives.' },
  { title: 'Flexi Training',         icon: '📅', desc: 'Flexible scheduling that adapts to your team\'s workload — start anytime, pause anytime.' },
]

const TESTIMONIALS = [
  { quote: 'Koenig delivered Azure training for 120 of our engineers across three continents simultaneously. The quality was consistent and the scheduling was flawless.', name: 'Head of L&D', company: 'Global Financial Services Firm', initials: 'GL' },
  { quote: 'We needed CISSP certification for our security team fast. Koenig\'s 1-on-1 model got all 12 candidates certified in under 6 weeks.', name: 'CISO', company: 'Multinational Technology Company', initials: 'MT' },
  { quote: 'The custom SAP curriculum Koenig built for us matched our exact S/4HANA implementation. It was the most relevant enterprise training we have ever run.', name: 'VP of IT', company: 'Manufacturing Conglomerate', initials: 'MC' },
]

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

/* ── Business Impact Aurora Canvas ── */
function BiAuroraCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    type Orb = { x: number; y: number; r: number; vx: number; vy: number; color: string }
    const orbs: Orb[] = [
      { x: 0.15, y: 0.25, r: 320, vx: 0.00018, vy: 0.00012, color: 'rgba(19,168,212,0.13)' },
      { x: 0.82, y: 0.70, r: 260, vx: -0.00013, vy: 0.00016, color: 'rgba(11,37,69,0.16)' },
      { x: 0.50, y: 0.05, r: 210, vx: 0.00016, vy: 0.00019, color: 'rgba(77,191,239,0.11)' },
      { x: 0.08, y: 0.85, r: 290, vx: 0.00011, vy: -0.00014, color: 'rgba(19,168,212,0.09)' },
    ]
    let id: number
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy
        if (o.x < -0.1 || o.x > 1.1) o.vx *= -1
        if (o.y < -0.1 || o.y > 1.1) o.vy *= -1
        const g = ctx.createRadialGradient(o.x * c.width, o.y * c.height, 0, o.x * c.width, o.y * c.height, o.r)
        g.addColorStop(0, o.color); g.addColorStop(1, 'transparent')
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(o.x * c.width, o.y * c.height, o.r, 0, Math.PI * 2); ctx.fill()
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />
}

const BI_SLIDES = [
  { gradient: 'linear-gradient(135deg,#0b2545 0%,#0d3d72 50%,#0a4d8f 100%)', label: 'Certification Success',  badge: '🏆 Industry-Leading', stat: '94%', unit: '',       desc: 'First-attempt pass rate across 5,000+ courses worldwide' },
  { gradient: 'linear-gradient(135deg,#0a2d54 0%,#083d6b 50%,#0b4d80 100%)', label: 'Speed of Learning',      badge: '⚡ Accelerated',      stat: '3×',  unit: 'faster', desc: 'Skill acquisition vs. self-study or e-learning platforms' },
  { gradient: 'linear-gradient(135deg,#071e3d 0%,#0a3060 50%,#0d3d78 100%)', label: 'Rapid Deployment',       badge: '🚀 Fast Launch',       stat: '48h', unit: '',       desc: 'Average programme launch — from brief to live training' },
]

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

/* ─── Component ──────────────────────────────────────────── */

export default function EnterprisePage() {
  const [activeDomain, setActiveDomain] = useState(0)
  const [biSlide, setBiSlide] = useState(0)
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [entMorphIdx, setEntMorphIdx] = useState(0)
  const [entMorphExiting, setEntMorphExiting] = useState(false)

  // Nav state
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navQuery, setNavQuery] = useState('')
  const [navResultsOpen, setNavResultsOpen] = useState(false)
  const navSearchRef = useRef<HTMLDivElement>(null)

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

  // Business impact — auto-advance slider
  useEffect(() => {
    const t = setInterval(() => setBiSlide(s => (s + 1) % BI_SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  // Business impact — feature card slide-in observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('bi-visible') }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.bi-feat-card').forEach(el => obs.observe(el))
    return () => obs.disconnect()
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
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
    const handler = (e: MouseEvent) => {
      if (navSearchRef.current && !navSearchRef.current.contains(e.target as Node)) setNavResultsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
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

        /* ── Business Impact ── */
        @keyframes bi-stat-glow {
          0%,100% { text-shadow: 0 0 8px rgba(19,168,212,0.25); }
          50%     { text-shadow: 0 0 20px rgba(19,168,212,0.75), 0 0 44px rgba(19,168,212,0.30); }
        }
        @keyframes bi-shimmer { from{left:-80%} to{left:160%} }
        @keyframes bi-icon-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(19,168,212,0.45); }
          60%     { box-shadow: 0 0 0 9px rgba(19,168,212,0); }
        }
        @keyframes bi-blob-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(22px,-18px)} }
        @keyframes bi-blob-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-18px,24px)} }
        @keyframes bi-scan   { from{top:-6%} to{top:108%} }
        @keyframes bi-bob    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes bi-spin-slow { to{transform:rotate(360deg)} }
        @keyframes bi-progress  { from{width:0%} to{width:100%} }

        .bi-grad-border {
          background: #fff;
          border: 1.5px solid transparent;
          background-image: linear-gradient(#fff,#fff), linear-gradient(135deg,#13a8d4 0%,#0b2545 55%,#4dbfef 100%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
        }
        .bi-stat-num { animation: bi-stat-glow 2.5s ease-in-out infinite; }
        .bi-stat-num.d2 { animation-delay:.45s } .bi-stat-num.d3 { animation-delay:.9s } .bi-stat-num.d4 { animation-delay:1.35s }

        .bi-feat-card {
          position: relative; overflow: hidden;
          background: #fff;
          border: 1.5px solid transparent;
          background-image: linear-gradient(#fff,#fff), linear-gradient(135deg,#13a8d4 0%,#0b2545 55%,#4dbfef 100%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          opacity: 0; transform: translateX(-14px);
          transition: opacity 0.42s ease, transform 0.42s ease, box-shadow 0.3s ease;
        }
        .bi-feat-card.bi-visible { opacity:1; transform:translateX(0); }
        .bi-feat-card::after {
          content:''; position:absolute; top:0; left:-80%; width:50%; height:100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.52),transparent);
          transform: skewX(-20deg); pointer-events:none;
        }
        .bi-feat-card:hover::after { animation: bi-shimmer 0.65s ease forwards; }
        .bi-feat-card:hover { box-shadow: 0 6px 26px rgba(19,168,212,0.16); }
        .bi-feat-icon { transition: transform 0.3s ease; animation: bi-icon-pulse 2.5s ease-in-out infinite; }
        .bi-feat-card:hover .bi-feat-icon { transform: rotate(14deg); }

        /* What You Get scrollable area */
        .bi-scroll { scrollbar-width: thin; scrollbar-color: rgba(19,168,212,0.45) rgba(19,168,212,0.06); }
        .bi-scroll::-webkit-scrollbar { width: 5px; }
        .bi-scroll::-webkit-scrollbar-track { background: rgba(19,168,212,0.06); border-radius: 6px; }
        .bi-scroll::-webkit-scrollbar-thumb { background: rgba(19,168,212,0.40); border-radius: 6px; }
        .bi-scroll::-webkit-scrollbar-thumb:hover { background: rgba(19,168,212,0.75); }

        .bi-blob-a { animation: bi-blob-a  8s ease-in-out infinite; }
        .bi-blob-b { animation: bi-blob-b 11s ease-in-out infinite; }
        .bi-scan-line { position:absolute; left:0; right:0; height:2px; pointer-events:none; animation: bi-scan 3.2s linear infinite; }
        .bi-pill-bob  { animation: bi-bob 2.5s ease-in-out infinite; }
        .bi-spin-slow { animation: bi-spin-slow 22s linear infinite; }
        .bi-progress-bar { animation: bi-progress 5s linear forwards; }

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

      {/* ── Nav ── */}
      <header
        className={`sticky top-0 z-50 px-4 lg:px-[50px] transition-shadow duration-200 ${scrolled ? 'shadow-lg shadow-black/30' : ''}`}
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
              <a href="/" className="flex items-center px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 rounded-[40px]" style={{ background: '#0694D1', gap: '8px' }}>
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
                All Courses
              </a>
              {[{ label: 'Technologies', href: '/#technologies' }, { label: 'About', href: '/#about' }, { label: 'Contact', href: '#contact' }].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                  style={{ color: '#ffffff' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(6,148,209,0.18)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          {/* Right */}
          <div className="ml-auto flex items-center gap-2">
            {/* Individual / Enterprise toggle */}
            <div className="hidden lg:flex rounded-xl p-0.5" style={{ background: 'rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.30)' }}>
              <Link href="/" className="rounded-lg px-3 py-1.5 text-sm font-normal transition-all" style={{ color: 'rgba(255,255,255,0.55)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#38bdf8'; (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                Individual
              </Link>
              <span className="rounded-lg px-3 py-1.5 text-sm font-normal text-white" style={{ background: '#0694D1', boxShadow: '0 0 10px rgba(6,148,209,0.40)' }}>Enterprise</span>
            </div>
            {/* Search */}
            <div className="relative hidden lg:block" ref={navSearchRef}>
              <div className="flex items-center gap-2 rounded-full px-4 py-1.5 transition-all focus-within:shadow-[0_0_0_2px_rgba(6,148,209,0.6)]" style={{ background: 'rgba(6,148,209,0.12)', border: '1px solid rgba(6,148,209,0.35)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0" style={{ color: '#38bdf8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input type="text" value={navQuery} onChange={e => { setNavQuery(e.target.value); setNavResultsOpen(true) }} onFocus={() => setNavResultsOpen(true)} placeholder="Search courses…" aria-label="Search courses" className="w-36 bg-transparent text-sm text-white placeholder-white/40 outline-none" />
                {navQuery.length > 0 && (
                  <button onClick={() => { setNavQuery(''); setNavResultsOpen(false); }} className="shrink-0 flex items-center justify-center w-4 h-4 rounded-full transition-colors hover:bg-white/20" aria-label="Clear search" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                )}
              </div>
              {navResultsOpen && navQuery.trim().length > 0 && (
                <div className="absolute right-0 top-full z-50 mt-1.5 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                  <div className="px-4 py-3 text-sm text-gray-500">Search on <a href={`/?q=${navQuery}`} className="font-medium text-[#0694D1] hover:underline">koenig-solutions.com</a></div>
                </div>
              )}
            </div>
            {/* Login */}
            <a href="https://mykoenig.com" target="_blank" rel="noopener noreferrer" className="hidden rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors lg:inline-block" style={{ borderColor: 'rgba(255,255,255,0.45)', color: '#ffffff' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
              Login
            </a>
            {/* Get in Touch */}
            <a href="#contact" className="hidden rounded-lg px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:inline-block" style={{ background: '#0694D1' }}>
              Get in Touch
            </a>
            {/* Hamburger */}
            <button onClick={() => setMobileOpen(v => !v)} className="rounded-lg p-2 transition-colors hover:bg-white/10 lg:hidden" style={{ color: '#ffffff' }} aria-label="Toggle menu">
              {mobileOpen
                ? <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                : <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="-mx-4 lg:-mx-[50px] border-t lg:hidden" style={{ background: '#0d3a5c', borderColor: '#0D4A6B' }}>
            <div className="mx-auto max-w-7xl space-y-0.5 px-4 py-3">
              <div className="mb-3 space-y-1.5 pb-3 text-sm" style={{ borderBottom: '1px solid #0D4A6B' }}>
                <a href="tel:+14129537506" className="flex items-center gap-2 transition-colors hover:text-white" style={{ color: '#A8C8E0' }}>
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                  +1 412 953 7506
                </a>
                <a href="mailto:info@koenig-solutions.com" className="flex items-center gap-2 transition-colors hover:text-white" style={{ color: '#A8C8E0' }}>
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                  info@koenig-solutions.com
                </a>
              </div>
              {['All Courses', 'Technologies', 'About Koenig', 'Contact Us'].map(item => (
                <a key={item} href={item === 'Contact Us' ? '#contact' : '/'} className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white" style={{ color: '#A8C8E0' }}>{item}</a>
              ))}
              <div className="pt-2">
                <div className="flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <input type="text" placeholder="Search courses…" aria-label="Search courses" className="flex-1 bg-transparent text-sm text-white placeholder-white/60 outline-none" />
                </div>
              </div>
              <a href="https://mykoenig.com" target="_blank" rel="noopener noreferrer" className="mt-2 block rounded-lg border border-white/30 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10">Login</a>
            </div>
          </div>
        )}
      </header>

      {/* ════════════════════════════════════════════════════════
           EXISTING SECTIONS (unchanged)
      ════════════════════════════════════════════════════════ */}

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#E8F4FA] w-full px-4 lg:px-[50px]">
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
          <div className="ent-blob1 absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.38) 0%, transparent 65%)' }} />
          <div className="ent-blob2 absolute -right-32 bottom-0 h-[350px] w-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.30) 0%, transparent 70%)' }} />
          <div className="ent-blob3 absolute -left-20 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.26) 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl w-full pt-[50px]">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium" style={{ background: 'rgba(6,148,209,0.12)', border: '1px solid rgba(6,148,209,0.30)', color: '#0694d1' }}>
                <span className="h-2 w-2 rounded-full bg-[#0694D1]" />
                Enterprise Training Solutions
              </div>
              <h1 className="mb-5 font-bold leading-[1.15] tracking-tight text-[clamp(1.5rem,5vw,2.5rem)] lg:text-[clamp(1.4rem,2.4vw,2.6rem)] xl:text-[clamp(2rem,3vw,3.5rem)]" style={{ color: '#093148' }}>
                <span className="block whitespace-nowrap">Upskill Your Workforce</span>
                <span
                  key={entMorphIdx}
                  className={`whitespace-nowrap inline-block ent-morph-gradient ${entMorphExiting ? 'ent-morph-out' : 'ent-morph-in'}`}
                >
                  {ENT_MORPH_WORDS[entMorphIdx]}
                </span>
              </h1>
              <p className="mb-8 max-w-xl text-base lg:text-lg" style={{ color: '#4a7a99' }}>
                Tailored IT certification programmes for enterprises across 195+ countries. From needs assessment to certified outcomes — Koenig handles everything, so your team stays focused on what matters.
              </p>
              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                <a href="#contact" className="ent-cta-btn rounded-xl px-7 py-3.5 text-base font-bold text-white">
                  Get a Free Consultation
                </a>
                <a href="mailto:enterprise@koenig-solutions.com" className="rounded-xl border px-7 py-3.5 text-base font-medium transition-colors hover:bg-[#0694d1]/5" style={{ borderColor: 'rgba(6,148,209,0.40)', color: '#076d9d' }}>
                  enterprise@koenig-solutions.com
                </a>
              </div>

              {/* Stats — all 4 in one row below the CTAs */}
              <div className="mt-8 pb-[50px] inline-grid grid-cols-4 gap-2">
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
              <div className="relative" style={{ width: '460px', padding: '36px' }}>

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
                  { src: '/images/top-six-vendors/Microsoft.png',        alt: 'Microsoft', pos: { top: 4,    left: 4    }, anim: 'vFloat1 3.4s ease-in-out infinite' },
                  { src: '/images/top-six-vendors/amazon-authorized.png', alt: 'AWS',       pos: { top: 4,    right: 4   }, anim: 'vFloat2 3.8s ease-in-out infinite 0.5s' },
                  { src: '/images/top-six-vendors/Cisco.png',             alt: 'Cisco',     pos: { bottom: 4, left: 4    }, anim: 'vFloat3 4.0s ease-in-out infinite 1.0s' },
                  { src: '/images/top-six-vendors/oracle.png',            alt: 'Oracle',    pos: { bottom: 4, right: 4   }, anim: 'vFloat4 3.6s ease-in-out infinite 1.5s' },
                  { src: '/images/top-six-vendors/VMware-Broadcom.png',   alt: 'VMware',    pos: { top: 'calc(50% - 30px)', right: -4 }, anim: 'vFloat5 3.2s ease-in-out infinite 2.0s' },
                ].map(({ src, alt, pos, anim }) => (
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
                    {/* Glow behind logo */}
                    <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: 'radial-gradient(ellipse at center, rgba(6,148,209,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <Image src={src} alt={alt} width={68} height={40} className="relative z-10 object-contain w-full h-full" />
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
                    width={388}
                    height={380}
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
      <section className="py-[40px] bg-white relative overflow-hidden">

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

        <div className="mx-auto max-w-7xl px-4 lg:px-[50px] relative z-10">
          <div className="io-fade mb-10 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
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
                  Training <span className="ent-dark-grad-text">Fortune </span><span className="ent-shimmer-text">500+</span><span className="ent-dark-grad-text"> Teams</span> & Global Enterprises
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
        <div
          className="relative overflow-x-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div className="ent-marquee-track items-center gap-2 py-2">
            {[...ENTERPRISE_CLIENTS, ...ENTERPRISE_CLIENTS].map((c, i) => (
              <div key={i} className="flex shrink-0 items-center justify-center px-2">
                <img src={`/images/trusted-logos/${encodeURIComponent(c.img)}`} alt={c.name} className="h-12 w-auto object-contain" style={{ filter: 'drop-shadow(0 2px 6px rgba(6,148,209,0.12))' }} title={c.name} />
              </div>
            ))}
          </div>
        </div>
        {/* Award cards */}
        <div className="mx-auto mt-10 max-w-7xl px-4 lg:px-[50px]">
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
                  <div className="mt-0.5 text-sm" style={{ color: '#4a7a9b' }}>{c.sub}</div>
                  <div className="mt-3 flex items-center gap-1.5">
                    <span className="relative inline-flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22c55e' }} />
                      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#22c55e' }} />
                    </span>
                    <span className="text-sm font-semibold" style={{ color: '#076D9D' }}>{c.bottom}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADDE Framework ── */}
      <section className="relative overflow-hidden py-[40px] px-4 lg:px-[50px]" style={{ background: '#0d1b2a' }}>
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
      <section className="relative overflow-hidden py-[40px] px-4 lg:px-[50px]" style={{ background: '#07121e' }}>
        <AuroraCanvas />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="io-fade mb-12 text-center">
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="relative overflow-hidden px-4 lg:px-[50px] py-16" style={{ background: 'linear-gradient(160deg,#EBF8FE 0%,#F5FBFF 60%,#EAF6FD 100%)', borderTop: '1px solid #CAEFFF', borderBottom: '1px solid #CAEFFF' }}>
        <div className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.14) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[350px] w-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.16) 0%, transparent 70%)' }} />
        <div className="relative mx-auto max-w-7xl">

          {/* ── Header ── */}
          <div className="io-fade mb-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

            {/* Left — title */}
            <div className="max-w-lg">
              <p className="mb-1 text-sm font-bold uppercase tracking-widest" style={{ color: '#0694D1' }}>What We Train</p>
              <h2 className="text-3xl font-bold lg:text-4xl" style={{ color: '#093148' }}>
                Comprehensive Training <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Catalogue</span>
              </h2>
            </div>

            {/* Right — 2×2 stat cards */}
            <div className="grid grid-cols-2 gap-3 lg:w-[420px] lg:shrink-0">

              {/* Courses */}
              <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #CAEFFF', boxShadow: '0 2px 10px rgba(6,148,209,0.07)' }}>
                <p className="text-2xl font-black" style={{ color: '#093148' }}>5,000+</p>
                <p className="mt-0.5 text-sm font-medium" style={{ color: '#4a7a9b' }}>Courses</p>
              </div>

              {/* Vendor Partners */}
              <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #CAEFFF', boxShadow: '0 2px 10px rgba(6,148,209,0.07)' }}>
                <p className="text-2xl font-black" style={{ color: '#093148' }}>50+</p>
                <p className="mt-0.5 text-sm font-medium" style={{ color: '#4a7a9b' }}>Vendor Partners</p>
              </div>

              {/* Countries */}
              <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #CAEFFF', boxShadow: '0 2px 10px rgba(6,148,209,0.07)' }}>
                <p className="text-2xl font-black" style={{ color: '#093148' }}>195+</p>
                <p className="mt-0.5 text-sm font-medium" style={{ color: '#4a7a9b' }}>Countries</p>
              </div>

              {/* Core Domains */}
              <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #CAEFFF', boxShadow: '0 2px 10px rgba(6,148,209,0.07)' }}>
                <p className="text-2xl font-black" style={{ color: '#093148' }}>8</p>
                <p className="mt-0.5 text-sm font-medium" style={{ color: '#4a7a9b' }}>Core Domains</p>
              </div>

            </div>
          </div>

          {/* ── Tab layout ── */}
          <div className="io-fade flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">

            {/* Left — domain tabs */}
            <div className="flex shrink-0 flex-row flex-wrap gap-2 lg:w-64 lg:flex-col lg:gap-0">
              {DOMAINS.map((d, i) => {
                const active = activeDomain === i
                return (
                  <button
                    key={d.name}
                    onClick={() => setActiveDomain(i)}
                    className="relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-4 py-3.5 text-left transition-all duration-200"
                    style={{
                      background: active ? '#0694D1' : '#fff',
                      color: active ? '#fff' : '#093148',
                      border: active ? '1px solid #0694D1' : '1px solid #CAEFFF',
                      fontWeight: active ? 700 : 500,
                      marginBottom: '6px',
                      borderRadius: '10px',
                      boxShadow: active ? '0 4px 16px rgba(6,148,209,0.25)' : '0 1px 4px rgba(6,148,209,0.06)',
                    }}
                  >
                    {/* Decorative circuit pattern — right side */}
                    <svg
                      className="pointer-events-none absolute right-0 top-0 h-full"
                      width="72" viewBox="0 0 72 52" fill="none"
                      style={{ opacity: active ? 0.18 : 0.07, color: active ? '#fff' : '#0694D1' }}
                    >
                      <circle cx="62" cy="9"  r="2.5" stroke="currentColor" strokeWidth="1.4"/>
                      <circle cx="62" cy="26" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
                      <circle cx="62" cy="43" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
                      <circle cx="46" cy="17" r="2"   stroke="currentColor" strokeWidth="1.2"/>
                      <circle cx="46" cy="35" r="2"   stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M62 11.5v12M62 28.5v12" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M62 26H48" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M62 9H50M50 9v8M50 17H48" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M62 43H50M50 43v-8M50 35H48" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M30 17h10M30 35h10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3"/>
                    </svg>

                    {/* Domain icon */}
                    <svg className="h-4 w-4 shrink-0" style={{ color: active ? '#fff' : '#0694D1', opacity: active ? 1 : 0.75 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      {d.icon}
                    </svg>

                    {/* Name */}
                    <span className="text-sm leading-snug">{d.name}</span>

                    {/* Course count badge */}
                    <span
                      className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-sm font-bold"
                      style={{
                        background: active ? 'rgba(255,255,255,0.22)' : 'rgba(6,148,209,0.08)',
                        color: active ? '#fff' : '#0694D1',
                        border: active ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(6,148,209,0.18)',
                      }}
                    >
                      {d.count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Right — content panel */}
            {(() => {
              const d = DOMAINS[activeDomain]
              const half = Math.ceil(d.skills.length / 2)
              const col1 = d.skills.slice(0, half)
              const col2 = d.skills.slice(half)
              return (
                <div className="flex-1 rounded-2xl bg-white p-7" style={{ border: '1px solid #CAEFFF', boxShadow: '0 4px 24px rgba(6,148,209,0.09)' }}>
                  {/* Panel header */}
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.18)' }}>
                      <svg className="h-6 w-6" style={{ color: '#0694D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        {d.icon}
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: '#093148' }}>{d.name}</h3>
                      <span className="text-sm font-semibold" style={{ color: '#0694D1' }}>{d.count} Courses Available</span>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid #E8F5FC', marginBottom: '20px' }} />

                  {/* Skills */}
                  <p className="mb-4 text-base font-bold" style={{ color: '#093148' }}>Skills</p>
                  <div className="mb-6 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {col1.map((s, i) => (
                      <div key={s} className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: '#0694D1' }}>
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        </span>
                        <span className="text-sm" style={{ color: '#2d5470' }}>{s}</span>
                      </div>
                    ))}
                    {col2.map((s, i) => (
                      <div key={s} className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: '#0694D1' }}>
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        </span>
                        <span className="text-sm" style={{ color: '#2d5470' }}>{s}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2.5 sm:col-start-2">
                      <span className="text-sm font-semibold" style={{ color: '#4a7a9b' }}>& Many More</span>
                    </div>
                  </div>

                  {/* Tools / Certifications */}
                  <p className="mb-3 text-base font-bold" style={{ color: '#093148' }}>Certifications & Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {d.tools.map(t => (
                      <span key={t} className="rounded-lg px-3.5 py-1.5 text-sm font-semibold" style={{ background: 'rgba(6,148,209,0.07)', border: '1px solid rgba(6,148,209,0.18)', color: '#076D9D' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>

          {/* ── CTA ── */}
          <div className="io-fade mt-10 text-center">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 4px 20px rgba(6,148,209,0.35)' }}>
              Request Training Plan
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Business Impact ── */}
      <section className="relative overflow-hidden px-4 py-20 lg:px-[50px]" style={{ background: '#eef6fd' }}>
        <BiAuroraCanvas />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">

            {/* ══ LEFT COLUMN ══ */}
            <div>
              {/* Eyebrow */}
              <div className="io-fade mb-5 flex items-center gap-3">
                <span className="h-px w-8 rounded-full" style={{ background: '#13a8d4' }} />
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: '#13a8d4' }}>Proven Results</p>
              </div>

              {/* Heading */}
              <div className="io-fade mb-3">
                <h2 className="text-3xl font-extrabold leading-tight lg:text-4xl" style={{ color: '#0b2545' }}>
                  The Business Impact of{' '}
                  <span className="bg-gradient-to-r from-[#13a8d4] to-[#4dbfef] bg-clip-text text-transparent">
                    Koenig Enterprise Training
                  </span>
                </h2>
              </div>
              <p className="io-fade mb-10 max-w-lg text-base" style={{ color: '#4a7a9b' }}>
                Numbers that matter to L&D leaders, CISOs, and CFOs — backed by 30+ years of enterprise outcomes.
              </p>

              {/* WHAT YOU GET label */}
              <p className="mb-4 text-sm font-black uppercase tracking-widest" style={{ color: '#13a8d4' }}>What You Get</p>

              {/* Feature cards — scrollable */}
              <div className="bi-scroll flex flex-col gap-4 overflow-y-auto pr-2" style={{ maxHeight: '280px' }}>
                {[
                  { title: 'Dedicated L&D Dashboard',      desc: 'Real-time visibility into team progress, certifications, and upcoming sessions — all in one portal.',         icon: <><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.7}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M8 12h.01M12 9v3M16 12h.01"/></>, delay: '0s'    },
                  { title: 'Compliance-Ready Training',     desc: 'Audit-friendly reports for ISO, SOC 2, GDPR, and HIPAA compliance requirements — available on demand.',        icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></>, delay: '0.08s' },
                  { title: 'Dedicated Account Manager',     desc: 'A single point of contact handles scheduling, logistics, and escalation — zero admin burden on your team.',    icon: <><circle cx="12" cy="8" r="4" strokeWidth={1.7}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4 20c0-4 3.582-7 8-7s8 3 8 7"/></>, delay: '0.16s' },
                  { title: 'Multi-Region Delivery',         desc: 'Run identical programmes across APAC, EMEA, and Americas simultaneously with region-specific instructors.',     icon: <><circle cx="12" cy="12" r="9" strokeWidth={1.7}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></>, delay: '0.24s' },
                  { title: 'Vendor-Certified Instructors',  desc: 'Every trainer holds active vendor certs and real-world experience — no theory-only instructors, ever.',         icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 5.523-4.03 10-9 10S3 18.523 3 13c0-.67.053-1.329.157-1.972L9 14"/></>, delay: '0.32s' },
                  { title: 'Guaranteed Schedule',           desc: 'Every confirmed batch runs. No last-minute cancellations. Your team plans around training, not the other way.', icon: <><rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={1.7}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01"/></>, delay: '0.40s' },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="bi-feat-card flex items-start gap-4 rounded-2xl p-5"
                    style={{ transitionDelay: f.delay, minHeight: '100px', flex: '0 0 auto' }}
                  >
                    {/* Icon box */}
                    <div
                      className="bi-feat-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: 'rgba(19,168,212,0.08)', border: '1px solid rgba(19,168,212,0.2)' }}
                    >
                      <svg className="h-5 w-5" style={{ color: '#13a8d4' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">{f.icon}</svg>
                    </div>
                    {/* Text */}
                    <div className="flex-1">
                      <div className="mb-0.5 flex items-center gap-2">
                        <h4 className="text-sm font-bold" style={{ color: '#0b2545' }}>{f.title}</h4>
                        <span className="flex h-2 w-2 rounded-full" style={{ background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)', animation: 'bi-bob 2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: '#4a7a9b' }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ RIGHT COLUMN — Slider ══ */}
            <div className="lg:sticky lg:top-24">
              <div
                className="relative overflow-hidden rounded-3xl"
                style={{
                  height: '540px',
                  border: '1.5px solid transparent',
                  backgroundImage: 'linear-gradient(#0b2545,#0b2545), linear-gradient(135deg,#13a8d4,#0b2545,#4dbfef)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  boxShadow: '0 24px 60px rgba(11,37,69,0.28)',
                }}
              >
                {/* Dot grid overlay */}
                <div className="pointer-events-none absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle, rgba(19,168,212,0.18) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }} />

                {/* Slides */}
                {BI_SLIDES.map((sl, idx) => (
                  <div
                    key={idx}
                    className="absolute inset-0 flex flex-col justify-between p-8 transition-opacity duration-700"
                    style={{ opacity: biSlide === idx ? 1 : 0, background: sl.gradient, pointerEvents: biSlide === idx ? 'auto' : 'none' }}
                  >
                    {/* Blobs */}
                    <div className="bi-blob-a pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full" style={{ background: 'radial-gradient(circle, rgba(19,168,212,0.22) 0%, transparent 70%)' }} />
                    <div className="bi-blob-b pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.18) 0%, transparent 70%)' }} />

                    {/* Rotating dashed ring */}
                    <div className="bi-spin-slow pointer-events-none absolute right-10 top-1/3 h-32 w-32 rounded-full" style={{ border: '1.5px dashed rgba(19,168,212,0.35)' }} />

                    {/* Scan line */}
                    <div className="bi-scan-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(19,168,212,0.3), transparent)' }} />

                    {/* Top row: frosted label + pill badge */}
                    <div className="relative z-10 flex items-start justify-between">
                      <span className="rounded-xl px-4 py-2 text-sm font-bold text-white/90 backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}>
                        {sl.label}
                      </span>
                      <span className="bi-pill-bob rounded-full px-3.5 py-1.5 text-sm font-bold text-white" style={{ background: 'rgba(19,168,212,0.35)', border: '1px solid rgba(19,168,212,0.55)', backdropFilter: 'blur(8px)' }}>
                        {sl.badge}
                      </span>
                    </div>

                    {/* Centre — large stat */}
                    <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-6">
                      <p className="font-black leading-none" style={{ fontSize: '7rem', color: '#fff', textShadow: '0 0 40px rgba(19,168,212,0.6)' }}>{sl.stat}</p>
                      {sl.unit && <p className="mt-1 text-xl font-bold" style={{ color: '#13a8d4' }}>{sl.unit}</p>}
                    </div>

                    {/* Bottom-left frosted stat badge */}
                    <div className="relative z-10 inline-flex max-w-xs flex-col rounded-2xl px-5 py-3 backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.13)' }}>
                      <p className="text-sm text-white/60">{sl.desc}</p>
                    </div>
                  </div>
                ))}

                {/* Progress bar + nav — bottom strip */}
                <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-5">
                  {/* Progress bar */}
                  <div className="mb-4 h-0.5 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }}>
                    <div
                      key={biSlide}
                      className="bi-progress-bar h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg,#13a8d4,#4dbfef)', width: '0%' }}
                    />
                  </div>
                  {/* Arrows + dots */}
                  <div className="flex items-center justify-end gap-4">
                    <button
                      onClick={() => setBiSlide(s => (s - 1 + BI_SLIDES.length) % BI_SLIDES.length)}
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:scale-110"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <div className="flex items-center gap-2">
                      {BI_SLIDES.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setBiSlide(i)}
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: biSlide === i ? '24px' : '8px',
                            background: biSlide === i ? '#13a8d4' : 'rgba(255,255,255,0.3)',
                          }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setBiSlide(s => (s + 1) % BI_SLIDES.length)}
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:scale-110"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Why Koenig (existing, unchanged) ── */}
      <section className="px-4 lg:px-[50px] py-[40px]" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Why Enterprises Choose Us</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">The Koenig <span style={{ color: '#38bdf8' }}>Difference</span></h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <div key={i} className="flex gap-4 rounded-2xl p-5" style={{ background: 'rgba(6,148,209,0.05)', border: '1px solid rgba(6,148,209,0.15)' }}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(6,148,209,0.2)' }}>
                  <svg className="h-4 w-4" style={{ color: '#38bdf8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-bold text-white">{w.title}</h3>
                  <p className="text-sm text-white/50">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           NEW SECTION 4 — How Corporate Training Works (WHITE)
           Inspired by Simplilearn's "How it works" process section
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-[40px] px-4 lg:px-[50px] bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="ent-blob3 absolute top-1/3 right-0 h-72 w-72 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #0694D1, transparent)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="io-fade mb-14 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#0694D1' }}>Simple Onboarding</p>
            <h2 className="text-3xl font-bold lg:text-4xl" style={{ color: '#093148' }}>
              From Brief to Certified — <span className="ent-dark-grad-text">In 4 Simple Steps</span>
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: '#4a7a9b' }}>We handle every detail so your HR and L&D teams can focus on strategy, not logistics.</p>
          </div>
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 hidden lg:block" style={{ background: 'linear-gradient(90deg, #CAEFFF, #0694D1, #CAEFFF)' }} />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={i} className={`ent-hiw-card io-fade d${i + 1} relative flex flex-col items-center text-center`}>
                  {/* Circle number */}
                  <div
                    className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full font-black text-white text-xl shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${step.color}, #093148)`, boxShadow: `0 0 28px ${step.color}50` }}
                  >
                    {step.step}
                  </div>
                  <div className="rounded-2xl p-5 w-full" style={{ background: '#F0FAFF', border: '1.5px solid #CAEFFF' }}>
                    <div className="mb-3 flex h-10 w-10 mx-auto items-center justify-center rounded-xl" style={{ background: 'white', border: '1px solid #CAEFFF' }}>
                      <svg className="h-5 w-5" style={{ color: step.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">{step.icon}</svg>
                    </div>
                    <h3 className="mb-2 text-sm font-bold" style={{ color: '#093148' }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#4a7a9b' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="io-fade mt-12 text-center">
            <a
              href="#contact"
              className="ent-shimmer inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 0 28px rgba(6,148,209,0.35)' }}
            >
              Start Your Programme Today
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Learning Formats (existing, unchanged) ── */}
      <section className="px-4 lg:px-[50px] py-[40px]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Flexible Delivery</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">Training That Fits <span style={{ color: '#38bdf8' }}>Your Way of Working</span></h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FORMATS.map((f, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.15)' }}>
                <div className="mb-3 text-2xl">{f.icon}</div>
                <h3 className="mb-2 text-base font-bold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           NEW: 2025 Technology Radar (WHITE — featured + staggered grid)
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-[40px] px-4 lg:px-[50px] bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #CAEFFF, transparent)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header row */}
          <div className="io-fade mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-black uppercase tracking-widest" style={{ background: 'rgba(255,107,53,0.10)', border: '1px solid rgba(255,107,53,0.32)', color: '#FF6B35' }}>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF6B35]" style={{ animation: 'pulse 1.5s infinite' }} />
                Live Demand Intelligence · 2025
              </span>
              <h2 className="mt-2 text-3xl font-bold leading-tight lg:text-4xl" style={{ color: '#093148' }}>
                Technology Skills Enterprises<br className="hidden lg:block" />
                Are <span className="ent-dark-grad-text">Racing to Learn</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm lg:text-right" style={{ color: '#4a7a9b' }}>
              Demand signals from 1M+ enrolled professionals across 195+ countries. Updated quarterly.
            </p>
          </div>

          {/* Featured card + grid */}
          <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
            {/* Featured — GenAI */}
            <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl p-8" style={{ background: 'linear-gradient(145deg,#06111E 0%,#0a2440 55%,#071a30 100%)', border: '1.5px solid rgba(255,107,53,0.35)' }}>
              <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,107,53,0.05) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-black uppercase tracking-widest" style={{ background: 'rgba(255,107,53,0.18)', color: '#FF6B35', border: '1px solid rgba(255,107,53,0.4)' }}>
                  🔥 #1 Trending Globally
                </span>
                <h3 className="mt-5 text-3xl font-bold leading-tight text-white">Generative AI<br />&amp; LLMs</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">Prompt engineering, RAG pipelines, fine-tuning, and responsible AI governance at enterprise scale.</p>
              </div>
              <div className="relative z-10">
                <div className="mb-4 flex items-end gap-3">
                  <span className="text-5xl font-black" style={{ color: '#FF6B35' }}>+340%</span>
                  <span className="mb-1.5 text-sm text-white/45">YoY demand</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/60">120+ Courses</span>
                  <a href="#contact" className="rounded-lg px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-80" style={{ background: 'rgba(255,107,53,0.22)', border: '1px solid rgba(255,107,53,0.45)' }}>Explore →</a>
                </div>
              </div>
            </div>

            {/* Trend cards grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
              {TECH_TRENDS.slice(1).map((t, i) => (
                <div
                  key={i}
                  className="io-fade group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: '#F4FBFF', border: '1.5px solid #CAEFFF', cursor: 'default' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#EBF8FE'; el.style.borderColor = t.accent }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#F4FBFF'; el.style.borderColor = '#CAEFFF' }}
                >
                  {/* Trend badge */}
                  <span className="mb-3 inline-block rounded-full px-2.5 py-0.5 text-sm font-black uppercase tracking-widest" style={{ background: `${t.accent}18`, color: t.accent, border: `1px solid ${t.accent}44` }}>
                    {t.label}
                  </span>
                  <h4 className="mb-1.5 text-sm font-bold leading-tight" style={{ color: '#093148' }}>{t.name}</h4>
                  <div className="mb-2 text-2xl font-black leading-none" style={{ color: t.accent }}>{t.growth}</div>
                  <p className="text-sm leading-relaxed" style={{ color: '#4a7a9b' }}>{t.courses} courses · YoY</p>
                  {/* animated bottom bar */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full" style={{ background: `linear-gradient(90deg,${t.accent},transparent)` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom strip */}
          <div className="io-fade mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl p-5 sm:flex-row" style={{ background: '#F0FAFF', border: '1.5px solid #CAEFFF' }}>
            <div>
              <p className="text-sm font-bold" style={{ color: '#093148' }}>Don&apos;t see your technology?</p>
              <p className="text-sm" style={{ color: '#4a7a9b' }}>We cover 5,000+ courses across 50+ vendors — our team builds custom curricula for any tech stack.</p>
            </div>
            <a href="#contact" className="shrink-0 rounded-xl px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 whitespace-nowrap" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)' }}>
              Request Custom Training
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           NEW: Vendor Certification Ecosystem (DARK NAVY — tiered rows)
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-[40px] px-4 lg:px-[50px]" style={{ background: '#093148' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(6,148,209,0.035) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="ent-blob1 absolute -top-28 -right-28 h-80 w-80 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle,#0694D1,transparent)' }} />
          <div className="ent-blob2 absolute -bottom-20 -left-20 h-72 w-72 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle,#38bdf8,transparent)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="io-fade mb-12 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#38bdf8' }}>Official Vendor Partners</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">50+ Authorised <span style={{ color: '#38bdf8' }}>Certification Partners</span></h2>
            <p className="mt-3 max-w-xl mx-auto text-sm text-white/50">Train and certify your team on the industry's most in-demand platforms — all under one roof, with one account manager.</p>
          </div>

          {/* Tier rows */}
          <div className="space-y-4">
            {([
              { tier: '🏆 ELITE', vendors: ['Microsoft', 'AWS', 'Cisco', 'VMware', 'Red Hat', 'Google Cloud'], accentColor: '#F59E0B' },
              { tier: '⭐ PREMIER', vendors: ['CompTIA', 'PMI', 'EC-Council', 'Salesforce', 'ServiceNow', 'SAP', 'Oracle'], accentColor: '#38bdf8' },
              { tier: '✅ CERTIFIED', vendors: ['IBM', 'Fortinet', 'Palo Alto Networks', 'HashiCorp', 'Nutanix', 'Juniper', 'Citrix', 'ISACA', 'AXELOS'], accentColor: '#10B981' },
            ] as { tier: string; vendors: string[]; accentColor: string }[]).map((row, ri) => (
              <div key={ri} className="io-fade overflow-hidden rounded-2xl" style={{ background: 'rgba(6,148,209,0.06)', border: '1px solid rgba(6,148,209,0.18)' }}>
                <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
                  <div className="shrink-0 lg:w-[160px]">
                    <span className="text-sm font-black uppercase tracking-widest" style={{ color: row.accentColor }}>{row.tier}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {row.vendors.map(v => (
                      <span key={v} className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.11)' }}>{v}</span>
                    ))}
                    <span className="rounded-full px-3.5 py-1.5 text-sm font-semibold" style={{ background: `${row.accentColor}18`, color: row.accentColor, border: `1px solid ${row.accentColor}38` }}>+ more</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mini stat strip */}
          <div className="io-fade mt-8 grid gap-4 text-center sm:grid-cols-3">
            {[['50+','Vendor Partnerships'],['300+','Certifications Available'],['94%','First-Attempt Pass Rate']].map(([n, l], i) => (
              <div key={i} className="rounded-2xl py-5" style={{ background: 'rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.25)' }}>
                <div className="text-2xl font-black" style={{ color: '#38bdf8' }}>{n}</div>
                <div className="mt-1 text-sm text-white/50">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           NEW: L&D Intelligence Dashboard (WHITE — split-screen with CSS mockup)
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-[40px] px-4 lg:px-[50px] bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="ent-blob3 absolute bottom-0 left-1/3 h-72 w-72 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle,#0694D1,transparent)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-center">
            {/* Left copy */}
            <div className="flex-1">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: '#0694D1' }}>Enterprise Reporting</p>
              <h2 className="mb-5 text-3xl font-bold leading-tight lg:text-4xl" style={{ color: '#093148' }}>
                Full Visibility Into<br /><span className="ent-dark-grad-text">Every Training Engagement</span>
              </h2>
              <p className="mb-8 text-sm leading-relaxed" style={{ color: '#4a7a9b' }}>
                Your dedicated L&amp;D portal gives HR leaders, managers, and executives real-time insight into completion, certification timelines, and measurable ROI — no spreadsheets, no chasing updates.
              </p>
              <div className="space-y-5">
                {[
                  { icon: '📊', title: 'Real-Time Progress Tracking',  desc: 'Completion rates, assessment scores, and engagement metrics per employee, team, or region.' },
                  { icon: '🏅', title: 'Certification Status Board',   desc: 'See who is certified, who is expiring, and who needs re-sit — with automated renewal reminders.' },
                  { icon: '📈', title: 'Audit-Ready ROI Reports',      desc: 'Downloadable reports aligned to ISO, SOC 2, GDPR, and HIPAA compliance frameworks.' },
                  { icon: '🔔', title: 'Smart Alerts & Escalation',    desc: 'Automatic alerts for low attendance, missed sessions, and upcoming exam deadlines.' },
                ].map((f, i) => (
                  <div key={i} className="io-fade flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg" style={{ background: '#EBF8FE', border: '1px solid #CAEFFF' }}>{f.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold" style={{ color: '#093148' }}>{f.title}</h4>
                      <p className="mt-0.5 text-sm leading-relaxed" style={{ color: '#4a7a9b' }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 0 24px rgba(6,148,209,0.28)' }}>
                Request a Platform Demo →
              </a>
            </div>

            {/* Right: CSS dashboard mockup */}
            <div className="shrink-0 w-full lg:w-[460px]">
              <div className="rounded-3xl p-6 shadow-2xl" style={{ background: '#06111E', border: '1px solid rgba(6,148,209,0.28)' }}>
                {/* Window chrome */}
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400 opacity-80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400 opacity-80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400 opacity-80" />
                  <span className="ml-3 text-sm text-white/30">L&D Training Portal — Koenig Enterprise</span>
                </div>
                {/* Stat row */}
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {[['847','Enrolled'],['234','Certified'],['94%','Pass Rate']].map(([v,l],i) => (
                    <div key={i} className="rounded-xl p-3 text-center" style={{ background: 'rgba(6,148,209,0.12)', border: '1px solid rgba(6,148,209,0.22)' }}>
                      <div className="text-lg font-black" style={{ color: '#38bdf8' }}>{v}</div>
                      <div className="text-sm text-white/45">{l}</div>
                    </div>
                  ))}
                </div>
                {/* Progress bars */}
                <div className="mb-4 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="mb-3 text-sm font-semibold text-white/50">Completion by Department</p>
                  {[{ d:'Cloud Engineering',pct:87 },{ d:'Security Ops',pct:74 },{ d:'Data Science',pct:91 },{ d:'DevOps',pct:68 }].map((r,i) => (
                    <div key={i} className="mb-2.5 last:mb-0">
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-white/55">{r.d}</span>
                        <span style={{ color: '#38bdf8' }}>{r.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(6,148,209,0.15)' }}>
                        <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: 'linear-gradient(90deg,#0694D1,#38bdf8)' }} />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Exam schedule */}
                <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="mb-3 text-sm font-semibold text-white/50">Upcoming Exams</p>
                  {[{ n:'AZ-900',d:'Mar 22',s:'On Track' },{ n:'CKA',d:'Mar 28',s:'At Risk' },{ n:'CISSP',d:'Apr 3',s:'On Track' }].map((ex,i) => (
                    <div key={i} className="flex items-center justify-between border-b py-1.5 last:border-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <span className="text-sm font-semibold text-white">{ex.n}</span>
                      <span className="text-sm text-white/40">{ex.d}</span>
                      <span className="rounded-full px-2 py-0.5 text-sm font-semibold" style={{ background: ex.s==='On Track' ? 'rgba(16,185,129,0.16)' : 'rgba(245,158,11,0.16)', color: ex.s==='On Track' ? '#10B981' : '#F59E0B' }}>{ex.s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials (existing, unchanged) ── */}
      <section className="px-4 lg:px-[50px] py-[40px]" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Client Stories</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">Trusted by <span style={{ color: '#38bdf8' }}>Global Enterprises</span></h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex flex-col rounded-2xl p-7" style={{ background: 'rgba(6,148,209,0.06)', border: '1px solid rgba(6,148,209,0.2)' }}>
                <div className="mb-4 text-3xl font-black leading-none" style={{ color: 'rgba(6,148,209,0.3)' }}>&ldquo;</div>
                <p className="flex-1 text-sm leading-relaxed text-white/75">{t.quote}</p>
                <div className="mt-5 flex items-center gap-3 border-t pt-4" style={{ borderColor: 'rgba(6,148,209,0.15)' }}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)' }}>{t.initials}</div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-white/45">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           NEW SECTION 5 — FAQ (WHITE)
           Inspired by Simplilearn's FAQ accordion section
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-[40px] px-4 lg:px-[50px] bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="ent-blob1 absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #0694D1, transparent)' }} />
          <div className="ent-blob2 absolute -bottom-20 -right-20 h-64 w-64 rounded-full opacity-6 blur-3xl" style={{ background: 'radial-gradient(circle, #076D9D, transparent)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="io-fade mb-12 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#0694D1' }}>Common Questions</p>
            <h2 className="text-3xl font-bold lg:text-4xl" style={{ color: '#093148' }}>
              Everything You Need to <span className="ent-dark-grad-text">Know</span>
            </h2>
            <p className="mt-3 text-sm" style={{ color: '#4a7a9b' }}>Quick answers to the questions L&D leaders ask before launching enterprise training with Koenig.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  className="io-fade overflow-hidden rounded-2xl transition-all duration-200"
                  style={{ border: isOpen ? '1.5px solid #0694D1' : '1.5px solid #CAEFFF', background: isOpen ? '#F0FAFF' : '#FAFCFF', boxShadow: isOpen ? '0 4px 20px rgba(6,148,209,0.12)' : 'none' }}
                >
                  <button
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    <span className="text-sm font-semibold lg:text-base" style={{ color: isOpen ? '#076D9D' : '#093148' }}>{faq.q}</span>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300"
                      style={{ background: isOpen ? '#0694D1' : '#EBF8FE', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      <svg className="h-3.5 w-3.5" style={{ color: isOpen ? 'white' : '#0694D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/>
                      </svg>
                    </span>
                  </button>
                  <div className={`ent-faq-answer px-6${isOpen ? ' open' : ''}`}>
                    <p className="pb-5 text-sm leading-relaxed" style={{ color: '#4a7a9b' }}>{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="io-fade mt-10 text-center">
            <p className="mb-4 text-sm" style={{ color: '#4a7a9b' }}>Still have questions? Our enterprise team is here to help.</p>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 0 20px rgba(6,148,209,0.3)' }}>
              Talk to Our Team →
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact Form (existing, unchanged) ── */}
      <section id="contact" className="px-4 lg:px-[50px] py-[40px]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Let's Talk</p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">Start Your Enterprise <span style={{ color: '#38bdf8' }}>Training Journey</span></h2>
            <p className="mt-3 text-white/50">Tell us about your workforce goals and we'll design a programme that delivers real, measurable outcomes.</p>
          </div>
          {submitted ? (
            <div className="rounded-2xl p-10 text-center" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.3)' }}>
              <div className="mb-4 text-4xl">✅</div>
              <h3 className="mb-2 text-xl font-bold text-white">Thank you!</h3>
              <p className="text-white/60">Our enterprise team will reach out within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,148,209,0.2)' }}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { id: 'name',    label: 'Full Name',       type: 'text',  placeholder: 'John Smith'             },
                  { id: 'company', label: 'Company Name',    type: 'text',  placeholder: 'Acme Corporation'       },
                  { id: 'email',   label: 'Work Email',      type: 'email', placeholder: 'john@acme.com'          },
                  { id: 'phone',   label: 'Phone Number',    type: 'tel',   placeholder: '+1 (555) 000-0000'      },
                ].map(f => (
                  <div key={f.id}>
                    <label className="mb-1.5 block text-sm font-medium text-white/70">{f.label}</label>
                    <input
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={formData[f.id as keyof typeof formData]}
                      onChange={e => setFormData(p => ({ ...p, [f.id]: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-[#0694D1]"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-white/70">Tell us about your training needs</label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. We need Azure certification for 50 engineers across 3 countries..."
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all resize-none focus:border-[#0694D1]"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </div>
              <button type="submit" className="mt-6 w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 0 24px rgba(6,148,209,0.35)' }}>
                Submit — Get a Free Consultation
              </button>
              <p className="mt-3 text-center text-sm text-white/35">We'll respond within 1 business day. No spam, ever.</p>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer (existing, unchanged) ── */}
      <footer className="px-4 lg:px-[50px] py-10" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Image src="/images/koenig-logo.svg" alt="Koenig Solutions" width={100} height={28} className="h-7 w-auto" />
          <p className="text-sm text-white/35">© {new Date().getFullYear()} Koenig Solutions. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-white/40">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <a href="mailto:enterprise@koenig-solutions.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  )
}

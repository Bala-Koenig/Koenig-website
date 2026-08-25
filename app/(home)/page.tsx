'use client'
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import VendorStack from '@/components/VendorStack'
import HeroParticles from '@/components/HeroParticles'
import { classifyAiQuery, getContextChips, queryTokens, matchesText, type AiClassifyResult } from '@/lib/aiSearch'

/* ─── Data ──────────────────────────────────────────────────── */

const MORPH_WORDS = [
  'Cloud & AI Certifications',
  'IT Certification',
  'AI & Machine Learning',
  'Cloud Architecture',
  'Cybersecurity Skills',
  'Generative AI Skills',
  'DevOps & Kubernetes',
]

const COURSE_TABS = ['Top Courses', 'Top Technologies', 'New & Trending']

const TOP_COURSES = [
  {
    vendor: 'AWS', tech: 'Cloud Architecture', name: 'AWS Certified Solutions Architect – Professional: Designing Resilient, High-Performance Cloud Architectures on AWS',
    examCode: 'SAP-C02', category: 'ASSOCIATE',
    days: 5, rating: 4.9, enrolled: '1,900+', price: 'INR 45000',
    levelColor: 'bg-orange-100 text-orange-700', hot: true, level: 'Advanced',
    cert: { prereq: '2+ years of hands-on AWS cloud experience recommended', examFee: '$300 USD', format: 'Multiple choice, multiple response', questions: '75 questions', passingScore: '750 / 1000', validity: '3 years', bestPractices: ['Complete all AWS Skill Builder courses mapped to SAP-C02', 'Study the AWS Well-Architected Framework whitepapers', 'Review the official exam guide at aws.training before exam day'] },
  },
  {
    vendor: 'Cisco', tech: 'Enterprise Networking', name: 'Implementing and Operating Cisco Enterprise Network Core Technologies – ENCOR Certification Training',
    examCode: '350-401', category: 'ASSOCIATE',
    days: 5, rating: 4.8, enrolled: '1,100+', price: 'INR 38000',
    levelColor: 'bg-blue-100 text-blue-700', hot: false, level: 'Advanced',
    cert: { prereq: '3–5 years of enterprise networking experience recommended', examFee: '$400 USD', format: 'MCQ, drag & drop, simulation', questions: '90–110 questions', passingScore: '825 / 1000', validity: '3 years, recertification required', bestPractices: ['Practice in Cisco DevNet sandboxes for hands-on tasks', 'Study the official ENCOR 350-401 exam blueprint thoroughly', 'Review Cisco SD-WAN and SD-Access documentation'] },
  },
  {
    vendor: 'Microsoft', tech: 'Microsoft Azure', name: 'Configuring and Operating Microsoft Azure Virtual Desktop',
    examCode: 'AZ-140', category: 'ASSOCIATE',
    days: 4, rating: 4.7, enrolled: '980+', price: 'INR 32000',
    levelColor: 'bg-blue-100 text-blue-700', hot: false, level: 'Intermediate',
    cert: { prereq: 'Azure administrator experience recommended', examFee: '$165 USD', format: 'MCQ, drag & drop, scenario tasks', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete Microsoft Learn paths for AZ-140', 'Practice deploying AVD environments in a lab subscription', 'Review the skills outline on learn.microsoft.com before exam day'] },
  },
  {
    vendor: 'Microsoft', tech: 'Microsoft Azure', name: 'Designing and Implementing Microsoft Azure Networking Solutions',
    examCode: 'AZ-700', category: 'ASSOCIATE',
    days: 3, rating: 4.8, enrolled: '1,200+', price: 'INR 24000',
    levelColor: 'bg-blue-100 text-blue-700', hot: false, level: 'Intermediate',
    cert: { prereq: 'Azure networking fundamentals experience recommended', examFee: '$165 USD', format: 'MCQ, drag & drop, scenario tasks', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete all Microsoft Learn modules for AZ-700', 'Lab-practice VNet peering, VPN gateways, and ExpressRoute', 'Review the official skills outline on learn.microsoft.com'] },
  },
  {
    vendor: 'Microsoft', tech: 'Microsoft Azure', name: 'Microsoft Azure Administrator',
    examCode: 'AZ-104', category: 'ASSOCIATE',
    days: 5, rating: 4.9, enrolled: '2,100+', price: 'INR 40000',
    levelColor: 'bg-blue-100 text-blue-700', hot: true, level: 'Intermediate',
    cert: { prereq: '6+ months hands-on cloud experience recommended', examFee: '$165 USD', format: 'MCQ, drag & drop, scenario tasks', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete all Microsoft Learn modules mapped to the exam skills outline', 'Practise in Azure sandbox — 30–40% of the exam is scenario-based', 'Review the official skills outline on learn.microsoft.com before exam day'] },
  },
  {
    vendor: 'Microsoft', tech: 'Microsoft Azure', name: 'Microsoft Azure Fundamentals',
    examCode: 'AZ-900', category: 'FUNDAMENTALS',
    days: 3, rating: 4.9, enrolled: '2,400+', price: 'INR 19000',
    levelColor: 'bg-blue-100 text-blue-700', hot: true, level: 'Beginner',
    cert: { prereq: 'No prerequisites — beginner-friendly', examFee: '$165 USD', format: 'MCQ, true/false, matching', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete the AZ-900 learning path on Microsoft Learn', 'Focus on cloud concepts, Azure services, and pricing', 'Take the official practice assessment before your exam'] },
  },
  {
    vendor: 'Microsoft', tech: 'Microsoft Azure', name: 'Microsoft Azure Data Fundamentals',
    examCode: 'DP-900', category: 'FUNDAMENTALS',
    days: 2, rating: 4.8, enrolled: '1,800+', price: 'INR 13000',
    levelColor: 'bg-blue-100 text-blue-700', hot: false, level: 'Beginner',
    cert: { prereq: 'No prerequisites — beginner-friendly', examFee: '$165 USD', format: 'MCQ, drag & drop', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete the DP-900 learning path on Microsoft Learn', 'Understand relational vs. non-relational data concepts', 'Take the official practice assessment before your exam'] },
  },
  {
    vendor: 'Microsoft', tech: 'Microsoft Azure', name: 'Microsoft Azure AI Fundamentals',
    examCode: 'AI-900', category: 'FUNDAMENTALS',
    days: 2, rating: 4.8, enrolled: '1,600+', price: 'INR 13000',
    levelColor: 'bg-blue-100 text-blue-700', hot: true, level: 'Beginner',
    cert: { prereq: 'No prerequisites — beginner-friendly', examFee: '$165 USD', format: 'MCQ, drag & drop', questions: '40–60 questions', passingScore: '700 / 1000', validity: '1 year, free renewal', bestPractices: ['Complete the AI-900 learning path on Microsoft Learn', 'Explore Azure Cognitive Services and Machine Learning concepts', 'Take the official practice assessment before your exam'] },
  },
]

const TOP_TECHNOLOGIES = [
  { name: 'Cloud Computing',     count: '840+', partners: ['Microsoft', 'AWS', 'Google Cloud'] },
  { name: 'Cybersecurity',       count: '620+', partners: ['EC-Council', 'CompTIA', 'ISC2'] },
  { name: 'Networking',          count: '510+', partners: ['Cisco', 'Juniper', 'CompTIA'] },
  { name: 'Project Management',  count: '390+', partners: ['PMI', 'PeopleCert', 'AXELOS'] },
  { name: 'Data & AI',           count: '280+', partners: ['Microsoft', 'AWS', 'Google Cloud'] },
  { name: 'DevOps',              count: '210+', partners: ['Kubernetes', 'HashiCorp', 'AWS'] },
  { name: 'ERP Systems',         count: '180+', partners: ['SAP', 'Oracle', 'Microsoft'] },
  { name: 'Linux & Open Source', count: '110+', partners: ['Red Hat', 'Linux Foundation', 'CompTIA'] },
  { name: 'Power Platform',      count: '60+',  partners: ['Microsoft'] },
]

const NEW_TRENDING = [
  {
    vendor: 'Google Cloud', tech: 'Data Engineering', name: 'Google Cloud Professional Data Engineer – Building Resilient, Scalable Data Pipelines and Machine Learning Solutions on GCP',
    examCode: 'GPDE', category: 'EXPERT',
    days: 4, rating: 4.8, enrolled: '1,400+', price: 'INR 35000',
    levelColor: 'bg-green-100 text-green-700', hot: true, level: 'Advanced',
  },
  {
    vendor: 'AWS', tech: 'Machine Learning', name: 'AWS Certified Machine Learning Engineer – Associate: Building and Deploying ML Models on Amazon Web Services',
    examCode: 'MLA-C01', category: 'ASSOCIATE',
    days: 4, rating: 4.9, enrolled: '1,200+', price: 'INR 38000',
    levelColor: 'bg-orange-100 text-orange-700', hot: true, level: 'Advanced',
  },
  {
    vendor: 'Microsoft', tech: 'Microsoft Power Platform', name: 'Microsoft Copilot Studio – Build AI-Powered Chatbots',
    examCode: 'PL-100', category: 'FUNDAMENTALS',
    days: 3, rating: 4.8, enrolled: '890+', price: 'INR 29000',
    levelColor: 'bg-blue-100 text-blue-700', hot: true, level: 'Beginner',
  },
  {
    vendor: 'Kubernetes', tech: 'Container Orchestration', name: 'Certified Kubernetes Administrator (CKA) Exam Prep',
    examCode: 'CKA', category: 'EXPERT',
    days: 4, rating: 4.9, enrolled: '1,600+', price: 'INR 32000',
    levelColor: 'bg-pink-100 text-pink-700', hot: true, level: 'Advanced',
  },
  {
    vendor: 'HashiCorp', tech: 'Terraform', name: 'HashiCorp Certified: Terraform Associate (003)',
    examCode: 'TA-003', category: 'ASSOCIATE',
    days: 3, rating: 4.7, enrolled: '720+', price: 'INR 25000',
    levelColor: 'bg-purple-100 text-purple-700', hot: false, level: 'Intermediate',
  },
  {
    vendor: 'AWS', tech: 'Artificial Intelligence', name: 'AWS Certified AI Practitioner – Foundations (AIF-C01)',
    examCode: 'AIF-C01', category: 'FUNDAMENTALS',
    days: 3, rating: 4.8, enrolled: '1,100+', price: 'INR 29000',
    levelColor: 'bg-orange-100 text-orange-700', hot: true, level: 'Beginner',
  },
  {
    vendor: 'Microsoft', tech: 'Microsoft Azure', name: 'Azure AI Engineer Associate (AI-102) Certification',
    examCode: 'AI-102', category: 'ASSOCIATE',
    days: 4, rating: 4.8, enrolled: '960+', price: 'INR 32000',
    levelColor: 'bg-blue-100 text-blue-700', hot: false, level: 'Intermediate',
  },
]

const VENDORS_ROW1 = [
  { name: 'Microsoft',          tier: 'Gold Partner',        courses: '380+', initial: 'M', img: 'microsoft-cloud-t.png' },
  { name: 'Cisco',              tier: 'Premier Partner',     courses: '210+', initial: 'C', img: 'Cisco.png' },
  { name: 'AWS',                tier: 'Training Partner',    courses: '290+', initial: 'A', img: 'amazon-authorized.png' },
  { name: 'VMware',             tier: 'Principal Partner',   courses: '120+', initial: 'V', img: 'VMware-Broadcom.png' },
  { name: 'Oracle',             tier: 'Gold Partner',        courses: '160+', initial: 'O', img: 'o-prtnr-clr-rgb (1).png' },
  { name: 'PECB',               tier: 'Authorized Partner',  courses: '80+',  initial: 'P', img: 'Authorized PECB Certification Courses Training badge.png' },
  { name: 'ISACA',              tier: 'Authorized Partner',  courses: '60+',  initial: 'I', img: 'ISACA_ChannelPartner_Logo_Elite_3.png' },
  { name: 'PeopleCert',         tier: 'ATO Partner',         courses: '90+',  initial: 'P', img: 'PeopleCert.png' },
  { name: 'CompTIA',            tier: 'Platinum Partner',    courses: '180+', initial: 'C', img: 'comptia.png' },
  { name: 'SAP',                tier: 'Gold Partner',        courses: '140+', initial: 'S', img: 'SAP.jpg' },
  { name: 'EC-Council',         tier: 'ATC Partner',         courses: '120+', initial: 'E', img: 'EC-Council-logo.png' },
  { name: 'ISC2',               tier: 'Official Partner',    courses: '50+',  initial: 'I', img: 'OTP-Preferred-Badge.png' },
  { name: 'PMI',                tier: 'Premier Partner',     courses: '140+', initial: 'P', img: 'PMI1115-ATP-Badge-2024-rgb.png' },
  { name: 'ISTQB',              tier: 'Authorized Partner',  courses: '40+',  initial: 'I', img: 'ISTQB.png' },
  { name: 'Broadcom',           tier: 'Partner',             courses: '70+',  initial: 'B', img: 'Broadcom.png' },
  { name: 'Check Point',        tier: 'Authorized Partner',  courses: '55+',  initial: 'C', img: 'Checkpoint ATC 2026 PLATINUM Badge.png' },
  { name: 'Red Hat',            tier: 'Advanced Partner',    courses: '110+', initial: 'R', img: 'Redvendorlogo.png' },
  { name: 'The Open Group',     tier: 'Authorized Partner',  courses: '45+',  initial: 'T', img: 'Vendor-OG-logo.png' },
  { name: 'Python Institute',   tier: 'Authorized Partner',  courses: '35+',  initial: 'P', img: 'Python-logo.png' },
  { name: 'Linux Foundation',   tier: 'Training Partner',    courses: '60+',  initial: 'L', img: 'Linux-Foundation.png' },
  { name: 'Omnissa',            tier: 'Partner',             courses: '30+',  initial: 'O', img: 'Omnissa.png' },
  { name: 'JS Institute',       tier: 'Authorized Partner',  courses: '25+',  initial: 'J', img: 'JS-Institute.png' },
  { name: 'IIBA',               tier: 'Endorsed Partner',    courses: '30+',  initial: 'I', img: 'iiba.png' },
  { name: 'DevOps Institute',   tier: 'Authorized Partner',  courses: '40+',  initial: 'D', img: 'DOI REGISTER PARTNERS 2023 BADGE RGB.jpg' },
]
const VENDORS_ROW2 = [
  { name: 'Autodesk',                    tier: 'Authorized Partner',  courses: '45+',  initial: 'A', img: 'AutodeskCertification.png' },
  { name: 'BCS',                         tier: 'ATO Partner',         courses: '35+',  initial: 'B', img: 'BCS partner logo (1).png' },
  { name: 'ServiceNow',                  tier: 'Training Partner',    courses: '40+',  initial: 'S', img: 'ServiceNow.png' },
  { name: 'CertNexus',                   tier: 'Authorized Partner',  courses: '30+',  initial: 'C', img: 'cnxatpweb-small.png' },
  { name: 'CWNP',                        tier: 'Authorized Partner',  courses: '25+',  initial: 'C', img: 'alc-standard-Basic-Logo.jpg' },
  { name: 'SUSE',                        tier: 'Training Partner',    courses: '20+',  initial: 'S', img: 'suse.jpg' },
  { name: 'Android ATC',                 tier: 'Authorized Partner',  courses: '30+',  initial: 'A', img: 'Android ATC Authorized Training Center.jpg' },
  { name: 'SCRUMstudy',                  tier: 'Authorized Partner',  courses: '25+',  initial: 'S', img: 'scrumstudy.png', imgLg: true },
  { name: 'TÜV SÜD',                    tier: 'Authorized Partner',  courses: '35+',  initial: 'T', img: 'Web-TS_Cobranding_Cooperation_partner_RGB_TS_Blue.png' },
  { name: 'GSDC',                        tier: 'Authorized Partner',  courses: '20+',  initial: 'G', img: 'ATP badge.png' },
  { name: 'Dell EMC',                    tier: 'Training Partner',    courses: '50+',  initial: 'D', img: 'emc.png' },
  { name: 'AI CERTs',                    tier: 'Authorized Partner',  courses: '30+',  initial: 'A', img: 'AICerts (1).png' },
  { name: 'Arcitura',                    tier: 'Authorized Partner',  courses: '20+',  initial: 'A', img: 'Arcituralogo.png' },
  { name: 'Mirantis',                    tier: 'Training Partner',    courses: '15+',  initial: 'M', img: 'mirantistraining.png' },
  { name: 'EXIN',                        tier: 'Authorized Partner',  courses: '40+',  initial: 'E', img: 'EXIN.png' },
  { name: 'Cloud Security Alliance',     tier: 'Authorized Partner',  courses: '25+',  initial: 'C', img: 'cloud-security-alliance.png' },
  { name: 'OffSec Training',             tier: 'Learning Partner',    courses: '20+',  initial: 'O', img: 'OffSecLearningPartnerDarkPNG (1).png' },
  { name: 'Cloudera',                    tier: 'Training Partner',    courses: '30+',  initial: 'C', img: 'cloudera (1).png' },
  { name: 'GAQM',                        tier: 'Authorized Partner',  courses: '25+',  initial: 'G', img: 'EC-Council-logo.png' },
  { name: 'Cloud Credential Council',    tier: 'Authorized Partner',  courses: '20+',  initial: 'C', img: 'CCC_Logo.png' },
  { name: 'LPI',                         tier: 'Authorized Partner',  courses: '15+',  initial: 'L', img: 'Linux.png' },
  { name: 'Symantec',                    tier: 'Authorized Partner',  courses: '20+',  initial: 'S', img: 'Symantec.png' },
  { name: 'DASA',                        tier: 'Authorized Partner',  courses: '15+',  initial: 'D', img: 'Vendor-Dasa.png' },
  { name: 'C++ Institute',               tier: 'Authorized Partner',  courses: '10+',  initial: 'C', img: 'c-plus-2-logo.png' },
]

const VENDOR_MARQUEE_DURATION = 78 // seconds — mobile "Authorized by" strip scroll speed (slightly slower than testimonials)
const TESTIMONIAL_MARQUEE_DURATION = 65 // seconds — mobile testimonials strip scroll speed

const TRUSTED_COMPANIES = [
  { name: 'Google',               img: 'google.png'              },
  { name: 'Microsoft',            img: 'ms.png'                  },
  { name: 'Adobe',                img: 'adobe.png'               },
  { name: 'Dell',                 img: 'dell.png'                },
  { name: 'HP',                   img: 'hp.png'                  },
  { name: 'Infosys',              img: 'infosys.png'             },
  { name: 'TCS',                  img: 'TCS.png'                 },
  { name: 'Wipro',                img: 'wipro.png'               },
  { name: 'HCL Technologies',     img: 'hcl-technologies.png'    },
  { name: 'Cognizant',            img: 'cts.png'                 },
  { name: 'EY',                   img: 'EY.png'                  },
  { name: 'PwC',                  img: 'pwc.png'                 },
  { name: 'McKinsey & Company',   img: 'mcKinsey-and-company.png'},
  { name: 'Bain & Company',       img: 'Bain-and-Company.png'    },
  { name: 'HSBC',                 img: 'hsbc.png'                },
  { name: 'Shell',                img: 'shell 1.png'             },
  { name: 'Chevron',              img: 'chevron.png'             },
  { name: 'Saudi Aramco',         img: 'aramco.png'              },
  { name: 'Bharat Petroleum',     img: 'Bharat-Petroleum.png'    },
  { name: 'GE',                   img: 'ge.png'                  },
  { name: 'Fujifilm',             img: 'fuji.png'                },
  { name: 'DHL',                  img: 'dhl.png'                 },
  { name: 'Emirates',             img: 'Emirates.png'            },
  { name: 'NTT',                  img: 'NTT.png'                 },
  { name: 'NHS',                  img: 'NHS.png'                 },
  { name: 'United Nations',       img: 'united-nations.png'      },
  { name: 'Capgemini',            img: 'capeg.png'               },
  { name: 'Dept',                 img: 'dept.png'                },
  { name: 'Link',                 img: 'link.png'                },
  { name: 'Abin',                 img: 'abin.png'                },
]

const SCHEDULE = [
  { name: 'Azure Solutions Architect Expert', level: 'expert' as const, date: 'Jul 3, 2026', days: 5, seats: 2, hot: true, vendor: 'Microsoft', tech: 'Microsoft Azure', price: 'INR 45000', rating: 4.9, enrolled: '2,100+' },
  { name: 'AWS Solutions Architect – Associate', level: 'assoc' as const, date: 'Jul 5, 2026', days: 4, seats: 4, vendor: 'AWS', tech: 'Cloud Architecture', price: 'INR 38000', rating: 4.8, enrolled: '1,900+' },
  { name: 'CompTIA Security+ SY0-701', level: 'fund' as const, date: 'Jul 10, 2026', days: 5, seats: 6, vendor: 'CompTIA', tech: 'Cybersecurity', price: 'INR 19000', rating: 4.7, enrolled: '1,200+' },
  { name: 'CCNP Enterprise Core (ENCOR)', level: 'expert' as const, date: 'Jul 12, 2026', days: 5, seats: 3, vendor: 'Cisco', tech: 'Enterprise Networking', price: 'INR 38000', rating: 4.8, enrolled: '1,100+' },
  { name: 'Project Management Professional (PMP)', level: 'expert' as const, date: 'Jul 17, 2026', days: 3, seats: 8, vendor: 'PMI', tech: 'Project Management', price: 'INR 40000', rating: 4.9, enrolled: '1,500+' },
  { name: 'Certified Ethical Hacker (CEH v13)', level: 'assoc' as const, date: 'Jul 19, 2026', days: 5, seats: 2, vendor: 'EC-Council', tech: 'Cybersecurity', price: 'INR 32000', rating: 4.7, enrolled: '980+' },
]

const SCHEDULE_LEVEL_ICON: Record<string, React.ReactNode> = {
  fund:   <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M5 3a7 7 0 0 0 7 7 7 7 0 0 0 7-7"/></svg>,
  assoc:  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
  expert: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7l4 9h12l4-9-6 4-4-6-4 6z"/></svg>,
}

const SCHEDULE_LEVEL_LABEL: Record<string, string> = { fund: 'Fundamentals', assoc: 'Associate', expert: 'Expert' }
const SCHEDULE_LEVEL_BADGE: Record<string, string> = {
  fund:   'bg-gradient-to-br from-[#4DBFEF] to-[#0694D1] text-white',
  assoc:  'bg-gradient-to-br from-[#0694D1] to-[#076D9D] text-white',
  expert: 'bg-gradient-to-br from-[#076D9D] to-[#062238] text-white',
}
// Mild blue fill + dark navy text, used only for the hero AI search recommended-course cards
const CARD_LEVEL_BADGE = 'bg-[#dbeeff] text-[#093148]'

const COUNTRIES = [
  { flagCode: 'in', name: 'India',          cities: 'Delhi · Bangalore', hub: true  },
  { flagCode: 'us', name: 'USA',            cities: 'New York · Chicago', hub: false },
  { flagCode: 'ae', name: 'UAE',            cities: 'Dubai',              hub: true  },
  { flagCode: 'gb', name: 'United Kingdom', cities: 'London',             hub: false },
  { flagCode: 'sg', name: 'Singapore',      cities: 'Singapore',          hub: false },
  { flagCode: 'za', name: 'South Africa',   cities: 'Johannesburg',       hub: false },
  { flagCode: 'au', name: 'Australia',      cities: 'Sydney',             hub: false },
  { flagCode: 'ca', name: 'Canada',         cities: 'Toronto',            hub: false },
  { flagCode: 'de', name: 'Germany',        cities: 'Frankfurt',          hub: false },
  { flagCode: 'nl', name: 'Netherlands',    cities: 'Amsterdam',          hub: false },
  { flagCode: 'bh', name: 'Bahrain',        cities: 'Manama',             hub: false },
  { flagCode: 'qa', name: 'Qatar',          cities: 'Doha',               hub: false },
  { flagCode: 'ke', name: 'Kenya',          cities: 'Nairobi',            hub: false },
]

const TESTIMONIALS = [
  { quote: 'I went from IT support to Cloud Architect in 6 months. The 1-on-1 format was a game-changer — my instructor built every session around my specific gaps, not a generic syllabus.', extra: 'The structured 1-on-1 curriculum meant every session built directly on the last. My instructor had real Azure enterprise deployments behind him — not just exam coaching. I passed the Solutions Architect exam with 890/1000.', showMore: true, name: 'Ravi Mehta', location: '🇮🇳 India', course: 'Azure Solutions Architect Expert', date: '18th Feb 2026', initials: 'RM', avatarBg: 'linear-gradient(135deg,#076D9D,#4DBFEF)', avatar: '/images/headshots/headshot-1.webp', ringColor: '#4F8EF7' },
  { quote: 'The guaranteed schedule gave me the confidence to hand in my notice and make the career change. My instructor had real enterprise experience — not just textbook knowledge.', name: "James O'Brien", location: '🇬🇧 United Kingdom', course: 'CompTIA Security+ SY0-701', date: '17th Feb 2026', initials: 'JO', avatarBg: 'linear-gradient(135deg,#093148,#076D9D)', avatar: '/images/headshots/headshot-4.png', ringColor: '#F59E0B' },
  { quote: "Koenig's FMAT format let me complete CCNP in under 2 weeks. Same quality, same dedication — just compressed for my timeline. My employer was shocked.", name: 'Farah Zahir', location: '🇦🇪 UAE', course: 'CCNP Enterprise Core (ENCOR)', date: '16th Feb 2026', initials: 'FZ', avatarBg: 'linear-gradient(135deg,#F47920,#f6a05c)', avatar: '/images/headshots/headshot-2.webp', ringColor: '#EC4899' },
  { quote: 'Rahul was an excellent trainer. His deep knowledge of the subject and patient teaching style made complex topics easy to understand.', extra: 'Rahul covered every Microsoft Identity scenario in depth — Conditional Access, PIM, and Defender integration. The labs mirrored real enterprise setups. I passed SC-300 first attempt with high confidence.', showMore: true, name: 'Elena Mancini', location: '🇮🇹 Italy', course: 'SC-300 Microsoft Identity', date: '18th Feb 2026', initials: 'EM', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)', avatar: '/images/headshots/headshot-5.webp', ringColor: '#8B5CF6' },
  { quote: 'Fantastic course, great instructor. The PMP prep was thorough and the practice exams were spot on. Passed first attempt!', name: 'Jackson Tate', location: '🇺🇸 USA', course: 'PMP Certification', date: '11th Feb 2026', initials: 'JT', avatarBg: 'linear-gradient(135deg,#093148,#F47920)', avatar: '/images/headshots/headshot-3.webp', ringColor: '#10B981' },
  { quote: 'The AWS course exceeded all expectations. The instructor had real-world cloud experience and the hands-on labs were invaluable. I landed a senior cloud role within a month of certifying.', name: 'Priya Sharma', location: '🇸🇬 Singapore', course: 'AWS Solutions Architect – Associate', date: '5th Feb 2026', initials: 'PS', avatarBg: 'linear-gradient(135deg,#F47920,#076D9D)', avatar: '/images/headshots/headshot-2.webp', ringColor: '#F59E0B' },
  { quote: 'Koenig made the impossible possible. I completed my CISSP in 3 weeks with their intensive 1-on-1 training. The instructor adapted the pace perfectly to my background.', extra: 'The intensive 1-on-1 format let me cover 3 weeks of CISSP content in the time I had available. My instructor focused on my weak domains identified in a pre-assessment. All 10 domains felt manageable by exam day.', showMore: true, name: 'Ahmed Al-Rashid', location: '🇦🇪 UAE', course: 'CISSP Certification', date: '2nd Feb 2026', initials: 'AA', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)', avatar: '/images/headshots/headshot-4.png', ringColor: '#06B6D4' },
  { quote: 'Best training investment I have ever made. The DevOps course was hands-on from day one. Our entire team is now deploying to Kubernetes confidently.', name: 'Sophie Laurent', location: '🇫🇷 France', course: 'Certified Kubernetes Administrator', date: '28th Jan 2026', initials: 'SL', avatarBg: 'linear-gradient(135deg,#093148,#0694d1)', avatar: '/images/headshots/headshot-5.webp', ringColor: '#8B5CF6' },
  { quote: 'The Google Cloud course gave me exactly what I needed to transition from on-prem to cloud. Real labs, real scenarios, and a trainer who genuinely cared about my success.', name: 'Carlos Mendez', location: '🇲🇽 Mexico', course: 'Google Cloud Professional Architect', date: '20th Jan 2026', initials: 'CM', avatarBg: 'linear-gradient(135deg,#4285F4,#0694d1)', avatar: '/images/headshots/headshot-1.webp', ringColor: '#10B981' },
]

const WEBINARS = [
  { speaker: 'Mayur Bhushan Kotoky',  title: 'Introduction to Nintex Automation Cloud: Streamline Workflows Without Code',  date: 'Mar 3, 2026',  time: '7:00 PM IST', vendorImg: 'microsoft-cloud-t.png', initials: 'MK', avatarBg: 'linear-gradient(135deg,#076D9D,#4DBFEF)' },
  { speaker: 'Priya Nair',            title: 'Revolutionizing Business Processes with SAP Intelligent Automation',           date: 'Mar 5, 2026',  time: '7:00 PM IST', vendorImg: 'SAP.jpg',               initials: 'PN', avatarBg: 'linear-gradient(135deg,#093148,#076D9D)' },
  { speaker: 'Rahul Sharma',          title: 'Create Smart Bots with Microsoft Power Virtual Agents for Enterprise Teams',   date: 'Mar 7, 2026',  time: '7:00 PM IST', vendorImg: 'microsoft-cloud-t.png', initials: 'RS', avatarBg: 'linear-gradient(135deg,#F47920,#f6a05c)' },
  { speaker: 'Anjali Singh',          title: 'AWS Security Best Practices for 2026',                  date: 'Mar 10, 2026', time: '6:00 PM IST', vendorImg: 'amazon-authorized.png',  initials: 'AS', avatarBg: 'linear-gradient(135deg,#FF9900,#c47a00)' },
  { speaker: 'David Chen',            title: 'Mastering Kubernetes in Production Environments',       date: 'Mar 12, 2026', time: '7:00 PM IST', vendorImg: 'Broadcom.png',           initials: 'DC', avatarBg: 'linear-gradient(135deg,#326CE5,#0694d1)' },
  { speaker: 'Fatima Al-Rashid',      title: 'Zero Trust Architecture Fundamentals',                  date: 'Mar 14, 2026', time: '5:00 PM GST', vendorImg: 'EC-Council-logo.png',    initials: 'FA', avatarBg: 'linear-gradient(135deg,#E31E24,#f47920)' },
  { speaker: 'James Wilson',          title: 'Google Cloud AI & ML for Practitioners',                date: 'Mar 17, 2026', time: '7:00 PM IST', vendorImg: 'comptia.png',            initials: 'JW', avatarBg: 'linear-gradient(135deg,#4285F4,#0694d1)' },
  { speaker: 'Sneha Patel',           title: 'CompTIA Security+ Exam Prep Workshop',                  date: 'Mar 19, 2026', time: '7:00 PM IST', vendorImg: 'comptia.png',            initials: 'SP', avatarBg: 'linear-gradient(135deg,#C8202F,#f47920)' },
  { speaker: 'Omar Abdullah',         title: 'DevOps Pipelines with Azure DevOps',                    date: 'Mar 21, 2026', time: '6:00 PM GST', vendorImg: 'microsoft-cloud-t.png', initials: 'OA', avatarBg: 'linear-gradient(135deg,#093148,#0694d1)' },
]

const ADVISOR_COURSES = [
  'Select Course Name',
  'Azure Administrator (AZ-104)',
  'AWS Solutions Architect – Associate',
  'PMP Certification',
  'CISSP Certification',
  'CCNP Enterprise (ENCOR)',
  'CompTIA Security+ (SY0-701)',
  'Certified Kubernetes Administrator (CKA)',
  'Google Cloud Professional Architect',
  'Other Course',
]
const ADVISOR_HEAR_OPTIONS = ['Select Option', 'Google Search', 'Social Media', 'LinkedIn', 'Colleague / Referral', 'Email Newsletter', 'Webinar / Event', 'Other']

/* ─── Helpers ───────────────────────────────────────────────── */

function StarsFilled({ n = 5 }: { n?: number }) {
  return <span className="text-yellow-400 text-sm">{'★'.repeat(n)}</span>
}

/* Draggable CSS-marquee helpers — freeze a running keyframe animation at its current
   visual position for manual drag, then seek it back to that same point on release
   (via a negative animation-delay) so it resumes with no visible jump. */
function getTrackTranslateX(el: HTMLElement): number {
  const transform = window.getComputedStyle(el).transform
  if (!transform || transform === 'none') return 0
  const match = transform.match(/matrix\(([^)]+)\)/)
  if (!match) return 0
  const parts = match[1].split(',').map(v => parseFloat(v.trim()))
  return parts[4] || 0
}

function freezeTrackAnimation(el: HTMLDivElement): number {
  const x = getTrackTranslateX(el)
  el.style.animation = 'none'
  el.style.transform = `translateX(${x}px)`
  return x
}

function seekTrackAnimation(el: HTMLDivElement, durationSec: number, xPos: number) {
  const half = el.scrollWidth / 2
  el.style.transform = ''
  if (half <= 0) { el.style.animation = ''; return }
  let x = xPos % half
  if (x > 0) x -= half
  const progress = (-x) / half
  const delay = -(progress * durationSec)
  el.style.animation = 'none'
  void el.offsetHeight
  el.style.animation = ''
  el.style.animationDelay = `${delay}s`
}

/* Shared drag controller for CSS-marquee tracks — rAF-batches transform writes for
   buttery updates, and tracks mouse-drag on `window` (not the small track element) so
   the drag keeps following the cursor even if it drifts outside the strip's bounds. */
function useMarqueeDrag(trackRef: React.RefObject<HTMLDivElement | null>, durationSec: number, isBlocked?: () => boolean) {
  const state = useRef({ startX: 0, startPos: 0, dragging: false, pendingX: null as number | null, raf: 0 })

  const applyFrame = () => {
    const track = trackRef.current
    const s = state.current
    if (track && s.pendingX !== null) track.style.transform = `translateX(${s.pendingX}px)`
    s.pendingX = null
    s.raf = 0
  }
  const scheduleX = (x: number) => {
    state.current.pendingX = x
    if (!state.current.raf) state.current.raf = requestAnimationFrame(applyFrame)
  }
  const start = (clientX: number) => {
    const track = trackRef.current
    if (!track) return
    const x = freezeTrackAnimation(track)
    state.current = { startX: clientX, startPos: x, dragging: true, pendingX: null, raf: 0 }
    track.style.cursor = 'grabbing'
  }
  const move = (clientX: number) => {
    if (!state.current.dragging) return
    scheduleX(state.current.startPos + (clientX - state.current.startX))
  }
  const end = () => {
    const track = trackRef.current
    if (!state.current.dragging) return
    state.current.dragging = false
    if (state.current.raf) { cancelAnimationFrame(state.current.raf); state.current.raf = 0 }
    if (track) {
      track.style.cursor = 'grab'
      if (!isBlocked || !isBlocked()) seekTrackAnimation(track, durationSec, getTrackTranslateX(track))
    }
  }

  const onTouchStart = (e: React.TouchEvent) => start(e.touches[0].clientX)
  const onTouchMove = (e: React.TouchEvent) => move(e.touches[0].clientX)
  const onTouchEnd = () => end()

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    start(e.clientX)
    const onWindowMove = (ev: MouseEvent) => move(ev.clientX)
    const onWindowUp = () => {
      end()
      window.removeEventListener('mousemove', onWindowMove)
      window.removeEventListener('mouseup', onWindowUp)
    }
    window.addEventListener('mousemove', onWindowMove)
    window.addEventListener('mouseup', onWindowUp)
  }

  return { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel: onTouchEnd, onMouseDown }
}

function VendorCard({ v }: { v: { name: string; tier: string; courses: string; initial: string; img?: string; imgLg?: boolean } }) {
  return (
    <div
      className="group flex w-48 shrink-0 flex-col overflow-hidden rounded-2xl bg-white"
      style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 10px rgba(0,164,239,0.07)', transition: 'box-shadow 0.3s ease, border-color 0.3s ease' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(6,148,209,0.14)'; e.currentTarget.style.borderColor = '#A8D8F0' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,164,239,0.07)'; e.currentTarget.style.borderColor = '#CAEFFF' }}
    >
      {/* Logo area — white bg */}
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
      {/* Info section — full-width mild blue */}
      <div className="flex flex-1 flex-col items-center justify-center w-full px-3 py-3 text-center" style={{ background: '#EBF8FE' }}>
        <p className="mb-1 text-sm font-medium leading-tight" style={{ color: '#093148' }}>{v.name}</p>
        <p className="mb-1 text-sm font-medium" style={{ color: '#076D9D' }}>{v.tier}</p>
        <p className="text-sm font-medium" style={{ color: '#0694d1' }}>{v.courses} Courses</p>
      </div>
    </div>
  )
}

function CountUp({ end, suffix = '', duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    setVal(0)
    const startTime = Date.now()
    let raf: number
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(eased * end))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, duration])
  return <>{val}{suffix}</>
}

function TestimonialCardV2({ t, delay }: { t: typeof TESTIMONIALS[0]; delay: string }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = t.quote.length > 140
  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl bg-white"
      style={{ border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)', animation: `cardFadeUp 0.45s cubic-bezier(0.22,1,0.36,1) ${delay} both` }}
    >
      <div className="flex flex-1 flex-col p-5">
        {/* Stars */}
        <div className="mb-2 text-xs text-yellow-400">★★★★★</div>

        {/* Quote */}
        <p className="mb-3 text-sm leading-relaxed" style={{ color: '#2d4a6a' }}>
          {isLong && !expanded ? `${t.quote.slice(0, 140)}…` : t.quote}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(v => !v)}
            className="mb-4 w-fit rounded-full border px-3 py-1 text-xs font-semibold text-[#0694D1] transition-all hover:bg-[#0694D1] hover:text-white"
            style={{ borderColor: '#0694D1' }}
          >
            {expanded ? 'Show Less ↑' : 'Show More ↓'}
          </button>
        )}

        {/* Avatar row */}
        <div className="mt-auto flex items-center gap-3">
          <div
            className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-bold text-white"
            style={{ background: t.avatarBg, border: '2px solid #DCEEFB' }}
          >
            {t.avatar
              ? <Image src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
              : t.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight" style={{ color: '#0d1b2a' }}>{t.name}</p>
            <p className="text-xs font-semibold" style={{ color: '#0694D1' }}>{t.location}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: '#E8F4FA', background: '#F8FCFF' }}>
        <div>
          <p className="text-xs font-bold" style={{ color: '#0d1b2a' }}>{t.course}</p>
          <p className="mt-0.5 text-xs" style={{ color: '#999' }}>{t.date}</p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: '#E8F4FA', color: '#0569a8' }}>✓ Verified</span>
      </div>
    </div>
  )
}

function HomeTestimonialCard({ t, onExpandChange }: { t: typeof TESTIMONIALS[0]; onExpandChange?: (expanded: boolean) => void }) {
  const [expanded, setExpanded] = useState(false)
  const extra = (t as { extra?: string }).extra
  const showMore = (t as { showMore?: boolean }).showMore
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
          style={{ maxHeight: expanded ? '200px' : '0px', opacity: expanded ? 1 : 0 }}
        >
          <p className="mb-3 text-sm leading-relaxed" style={{ color: '#2d4a6a' }}>{extra}</p>
        </div>
        {showMore && (
          <button
            onClick={handleToggle}
            className="mb-4 w-fit rounded-full border px-3 py-1 text-xs font-semibold text-[#0694D1] transition-all hover:bg-[#0694D1] hover:text-white"
            style={{ borderColor: '#0694D1' }}
          >
            {expanded ? 'Show Less ↑' : 'Show More ↓'}
          </button>
        )}
        <div className="flex items-center gap-3">
          <div
            className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-bold text-white"
            style={{ background: t.avatarBg, border: '2px solid #DCEEFB' }}
          >
            {t.avatar
              ? <Image src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
              : t.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight" style={{ color: '#0d1b2a' }}>{t.name}</p>
            <p className="text-xs font-semibold" style={{ color: '#0694D1' }}>{t.location}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: '#E8F4FA', background: '#F8FCFF' }}>
        <div>
          <p className="text-xs font-bold" style={{ color: '#0d1b2a' }}>{t.course}</p>
          <p className="mt-0.5 text-xs" style={{ color: '#999' }}>{t.date}</p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: '#E8F4FA', color: '#0569a8' }}>✓ Verified</span>
      </div>
    </div>
  )
}

function MobileTestimonialMarquee({ items }: { items: typeof TESTIMONIALS }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const expandedCount = useRef(0)
  const drag = useMarqueeDrag(trackRef, TESTIMONIAL_MARQUEE_DURATION, () => expandedCount.current > 0)

  const pauseForExpand = () => {
    const track = trackRef.current
    if (track) freezeTrackAnimation(track)
  }
  const resumeFromExpand = () => {
    const track = trackRef.current
    if (track) seekTrackAnimation(track, TESTIMONIAL_MARQUEE_DURATION, getTrackTranslateX(track))
  }

  return (
    <div
      className="sm:hidden overflow-hidden"
      style={{
        touchAction: 'pan-y',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
      {...drag}
    >
      <style>{`
        @keyframes testimonialScrollMobile { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .testimonial-track-mobile { display: flex; align-items: stretch; gap: 1rem; padding: 0.5rem 0; width: max-content; animation: testimonialScrollMobile ${TESTIMONIAL_MARQUEE_DURATION}s linear infinite; cursor: grab; }
      `}</style>
      <div
        ref={trackRef}
        className="testimonial-track-mobile"
      >
        {[...items, ...items].map((t, i) => (
          <div key={i} style={{ width: '280px', flexShrink: 0 }}>
            <HomeTestimonialCard
              t={t}
              onExpandChange={exp => {
                expandedCount.current += exp ? 1 : -1
                if (expandedCount.current < 0) expandedCount.current = 0
                if (expandedCount.current > 0) pauseForExpand()
                else resumeFromExpand()
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function HomeScrollColumn({ items, speed, draggable }: { items: typeof TESTIMONIALS; speed: number; draggable?: boolean }) {
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const paused = useRef(false)
  const dragStartY = useRef(0)
  const dragStartPos = useRef(0)

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

  const touchHandlers = draggable ? {
    onTouchStart: (e: React.TouchEvent) => {
      paused.current = true
      dragStartY.current = e.touches[0].clientY
      dragStartPos.current = pos.current
    },
    onTouchMove: (e: React.TouchEvent) => {
      const delta = dragStartY.current - e.touches[0].clientY
      const inner = innerRef.current
      if (!inner) return
      const half = inner.scrollHeight / 2
      let newPos = dragStartPos.current + delta
      if (newPos < 0) newPos = 0
      if (half > 0 && newPos >= half) newPos = half - 1
      pos.current = newPos
      inner.style.transform = `translateY(-${pos.current}px)`
    },
    onTouchEnd: () => { paused.current = false },
  } : {}

  return (
    <div
      style={{ height: '520px', overflow: 'hidden' }}
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
      {...touchHandlers}
    >
      <div ref={innerRef} className="flex flex-col gap-4 pb-4">
        {[...items, ...items].map((t, i) => <HomeTestimonialCard key={i} t={t} />)}
      </div>
    </div>
  )
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = t.quote.length > 130
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Top: quote body */}
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-2 block text-3xl sm:text-4xl md:text-5xl font-black leading-none text-gray-200">&ldquo;</span>
        <h3 className="mb-0.5 text-center text-sm font-bold text-koenig-dark">{t.name}</h3>
        <p className="mb-4 text-center text-sm font-semibold text-koenig-blue">{t.location}</p>
        <p className={`flex-1 text-center text-sm leading-relaxed text-gray-500 ${!expanded && isLong ? 'line-clamp-4' : ''}`}>
          {t.quote}
        </p>
        {isLong && !expanded && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setExpanded(true)}
              className="flex items-center gap-1.5 rounded-full border border-koenig-blue px-5 py-1.5 text-sm font-semibold text-koenig-blue transition-colors hover:bg-koenig-blue hover:text-white"
            >
              Show More <span className="text-base leading-none">↓</span>
            </button>
          </div>
        )}
      </div>
      {/* Bottom: course + date */}
      <div className="border-t border-dashed border-gray-200 px-6 py-4 text-center">
        <p className="mb-1 text-sm font-semibold text-koenig-dark">{t.course}</p>
        <p className="text-sm text-koenig-muted">{t.date}</p>
      </div>
    </div>
  )
}

const KOENIG_BADGE = 'bg-koenig-blue/10 text-koenig-blue ring-1 ring-koenig-blue/20'
const VENDOR_BADGE_COLORS: Record<string, string> = {
  Microsoft:          KOENIG_BADGE,
  AWS:                KOENIG_BADGE,
  Cisco:              KOENIG_BADGE,
  CompTIA:            KOENIG_BADGE,
  PMI:                KOENIG_BADGE,
  'EC-Council':       KOENIG_BADGE,
  Kubernetes:         KOENIG_BADGE,
  HashiCorp:          KOENIG_BADGE,
  'Google Cloud':     KOENIG_BADGE,
  ISC2:               KOENIG_BADGE,
  Juniper:            KOENIG_BADGE,
  PeopleCert:         KOENIG_BADGE,
  AXELOS:             KOENIG_BADGE,
  SAP:                KOENIG_BADGE,
  Oracle:             KOENIG_BADGE,
  'Red Hat':          KOENIG_BADGE,
  'Linux Foundation': KOENIG_BADGE,
}

function BrochureModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.72)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[420px] rounded-2xl p-6"
        style={{ background: 'linear-gradient(160deg, #0D2137 0%, #081828 100%)', border: '1px solid rgba(6,148,209,0.30)', boxShadow: '0 0 0 1px rgba(6,148,209,0.08), 0 32px 80px rgba(0,0,0,0.8)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Header */}
        <div className="mb-5">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#0694d1]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0694d1]" />
            Free Training Brochure
          </p>
          <h2 className="text-2xl font-extrabold leading-tight text-white">
            Get Your Free<br />
            <span className="text-[#3AB6EB]">Training Brochure</span>
          </h2>
          <p className="mt-1.5 text-xs text-white/40">Curriculum · Pricing · Exam prep — all in one PDF</p>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">First Name <span className="text-[#0694d1]">*</span></label>
              <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/30"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} placeholder="Rahul" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
              </div>
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">Last Name</label>
              <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/30"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Sharma" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">Work Email <span className="text-[#0694d1]">*</span></label>
            <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/30"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
              <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" type="email" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">Phone / WhatsApp <span className="text-[#0694d1]">*</span></label>
            <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/30"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98400 00000" type="tel" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5">
          <button
            onClick={onClose}
            className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'linear-gradient(90deg, #0694d1, #3AB6EB)' }}
          >
            Get My Brochure →
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/25">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Your details are safe. No spam, ever.
          </p>
        </div>
      </div>
    </div>
  , document.body)
}

const SYLLABUS_COUNTRIES = [
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

function SyllabusModal({ course, onClose }: { course: string; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [countryOpen, setCountryOpen] = useState(false)
  const countryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCountryOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return createPortal(
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(4,24,37,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: 'linear-gradient(160deg,#062238 0%,#093148 100%)', borderRadius: 20, padding: '32px 28px 28px', width: '100%', maxWidth: 440, position: 'relative', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', fontFamily: 'inherit' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '12px 0 4px' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(6,148,209,0.15)', border: '1.5px solid rgba(6,148,209,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.25 }}>You&apos;re all set, {name.split(' ')[0]}!</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 20 }}>
              The course content for <strong style={{ color: '#0694D1' }}>{course}</strong> will be sent to <strong style={{ color: '#fff' }}>{email}</strong> shortly.
            </div>
            <div style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Check your inbox — usually arrives within 2 minutes
            </div>
            <button onClick={onClose} style={{ width: '100%', padding: 11, borderRadius: 10, border: '1px solid rgba(6,148,209,0.35)', background: 'transparent', color: '#0694D1', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0694D1', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, color: '#0694D1', textTransform: 'uppercase' }}>Download Syllabus</span>
            </div>
            {course && (
              <div style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 14px', marginBottom: 18, background: 'rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: 5 }}>Course</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>{course}</div>
              </div>
            )}
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 6 }}>Get the Course Content</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 22 }}>Fill in your details and we&apos;ll send it straight to your inbox.</div>
            <form onSubmit={e => { e.preventDefault(); if (!country) return; setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: 5, display: 'block' }}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input required placeholder="John" value={name} onChange={e => setName(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(6,148,209,0.08)', border: '1.5px solid rgba(6,148,209,0.3)', borderRadius: 10, padding: '11px 14px', fontSize: 13.5, color: '#fff', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target.style.borderColor = '#0694D1')} onBlur={e => (e.target.style.borderColor = 'rgba(6,148,209,0.3)')} />
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: 5, display: 'block' }}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                <input required type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(6,148,209,0.08)', border: '1.5px solid rgba(6,148,209,0.3)', borderRadius: 10, padding: '11px 14px', fontSize: 13.5, color: '#fff', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target.style.borderColor = '#0694D1')} onBlur={e => (e.target.style.borderColor = 'rgba(6,148,209,0.3)')} />
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: 5, display: 'block' }}>Country <span style={{ color: '#ef4444' }}>*</span></label>
                <div ref={countryRef} style={{ position: 'relative' }}>
                  <button type="button" onClick={() => setCountryOpen(o => !o)}
                    style={{ width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,148,209,0.08)', border: `1.5px solid ${countryOpen ? '#0694D1' : 'rgba(6,148,209,0.3)'}`, borderRadius: 10, padding: '11px 14px', fontSize: 13.5, color: country ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer', fontFamily: 'inherit', outline: 'none' }}>
                    {country || 'Select your country'}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: countryOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {countryOpen && (
                    <div style={{ position: 'absolute', bottom: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 10000, background: '#0d2535', border: '1.5px solid rgba(6,148,209,0.35)', borderRadius: 10, maxHeight: 420, overflowY: 'auto', overscrollBehavior: 'contain', boxShadow: '0 -8px 32px rgba(0,0,0,0.6)' }}>
                      <div style={{ padding: '9px 14px', fontSize: 13.5, color: 'rgba(255,255,255,0.35)', cursor: 'default', borderBottom: '1px solid rgba(6,148,209,0.15)' }}>Select your country</div>
                      {SYLLABUS_COUNTRIES.map(c => (
                        <div key={c} onClick={() => { setCountry(c); setCountryOpen(false) }}
                          style={{ padding: '9px 14px', fontSize: 13.5, cursor: 'pointer', color: country === c ? '#fff' : '#c8dce9', background: country === c ? '#1a5fa8' : 'transparent', transition: 'background 0.12s' }}
                          onMouseEnter={e => { if (country !== c) e.currentTarget.style.background = 'rgba(6,148,209,0.18)' }}
                          onMouseLeave={e => { if (country !== c) e.currentTarget.style.background = 'transparent' }}>
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
              <button type="submit" style={{ width: '100%', padding: 13, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#0694D1,#0577ab)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', letterSpacing: 0.2, boxShadow: '0 4px 18px rgba(6,148,209,0.4)', marginTop: 2, transition: 'filter 0.18s' }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.12)')} onMouseLeave={e => (e.currentTarget.style.filter = 'none')}>
                Submit
              </button>
              <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                No spam, ever. Unsubscribe anytime.
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  , document.body)
}

function EnquireNowModal({ course, onClose }: { course: string; onClose: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [captcha, setCaptcha] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return createPortal(
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(4,24,37,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: 'linear-gradient(160deg,#062238 0%,#093148 100%)', borderRadius: 20, padding: '32px 28px 28px', width: '100%', maxWidth: 440, position: 'relative', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', fontFamily: 'inherit' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '12px 0 4px' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(6,148,209,0.15)', border: '1.5px solid rgba(6,148,209,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.25 }}>Thanks, {name.split(' ')[0]}!</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 20 }}>
              A training advisor will reach out about <strong style={{ color: '#0694D1' }}>{course}</strong> within 1 business day.
            </div>
            <button onClick={onClose} style={{ width: '100%', padding: 11, borderRadius: 10, border: '1px solid rgba(6,148,209,0.35)', background: 'transparent', color: '#0694D1', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0694D1', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, color: '#0694D1', textTransform: 'uppercase' }}>Enquire Now</span>
            </div>
            <div className="enquire-course-name" style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 22 }}>{course}</div>
            <form onSubmit={e => { e.preventDefault(); if (!captcha) return; setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: 5, display: 'block' }}>Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input required placeholder="John Smith" value={name} onChange={e => setName(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(6,148,209,0.08)', border: '1.5px solid rgba(6,148,209,0.3)', borderRadius: 10, padding: '11px 14px', fontSize: 13.5, color: '#fff', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target.style.borderColor = '#0694D1')} onBlur={e => (e.target.style.borderColor = 'rgba(6,148,209,0.3)')} />
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: 5, display: 'block' }}>Email <span style={{ color: '#ef4444' }}>*</span></label>
                <input required type="email" placeholder="John@example.com" value={email} onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(6,148,209,0.08)', border: '1.5px solid rgba(6,148,209,0.3)', borderRadius: 10, padding: '11px 14px', fontSize: 13.5, color: '#fff', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target.style.borderColor = '#0694D1')} onBlur={e => (e.target.style.borderColor = 'rgba(6,148,209,0.3)')} />
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: 5, display: 'block' }}>Phone <span style={{ color: '#ef4444' }}>*</span></label>
                <input required type="tel" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(6,148,209,0.08)', border: '1.5px solid rgba(6,148,209,0.3)', borderRadius: 10, padding: '11px 14px', fontSize: 13.5, color: '#fff', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target.style.borderColor = '#0694D1')} onBlur={e => (e.target.style.borderColor = 'rgba(6,148,209,0.3)')} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div onClick={() => setCaptcha(c => !c)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', borderRadius: 4, border: '1.5px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.04)', width: 220, height: 44, cursor: 'pointer' }}>
                  <div style={{ width: 18, height: 18, borderRadius: 3, border: `2px solid ${captcha ? '#0694D1' : 'rgba(255,255,255,0.55)'}`, background: captcha ? '#0694D1' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>
                    {captcha && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500, flex: 1 }}>I&apos;m not a robot</span>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                    <img decoding="async" loading="lazy" src="https://www.gstatic.com/recaptcha/api2/logo_48.png" width="24" height="24" alt="reCAPTCHA" style={{ display: 'block' }} />
                    <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', lineHeight: 1 }}>reCAPTCHA</span>
                    <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.25)', lineHeight: 1 }}>Privacy - Terms</span>
                  </div>
                </div>
              </div>

              <button type="submit" style={{ width: '100%', padding: 13, borderRadius: 10, border: 'none', cursor: captcha ? 'pointer' : 'not-allowed', background: 'linear-gradient(135deg,#0694D1,#0577ab)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', letterSpacing: 0.2, boxShadow: '0 4px 18px rgba(6,148,209,0.4)', opacity: captcha ? 1 : 0.6, transition: 'opacity .2s' }}>
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  , document.body)
}

function EnrollModal({ vendor, onClose }: { vendor: string; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [interests, setInterests] = useState<string[]>([])
  const [goal, setGoal] = useState('')

  const INTEREST_OPTIONS = ['Cloud & Infrastructure', 'Cybersecurity', 'Networking', 'Data & AI', 'DevOps', 'Project Management']
  const GOAL_OPTIONS = ['Get certified ASAP', 'Career transition', 'Upskill my team', 'Explore course options']
  const STEPS = ['YOU', 'INTERESTS', 'GOALS']

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const inputRow = (children: React.ReactNode) => (
    <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
      {children}
    </div>
  )

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.72)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[420px] rounded-2xl p-6"
        style={{ background: 'linear-gradient(160deg, #0D2137 0%, #081828 100%)', border: '1px solid rgba(6,148,209,0.30)', boxShadow: '0 0 0 1px rgba(6,148,209,0.08), 0 32px 80px rgba(0,0,0,0.8)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Header */}
        <div className="mb-5">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#0694d1]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0694d1]" />
            Free {vendor} Training Guide
          </p>
          <h2 className="text-2xl font-extrabold leading-tight text-white">
            Talk to a<br />
            <span className="text-[#3AB6EB]">{vendor} Expert</span>
          </h2>
          <p className="mt-1.5 text-xs text-white/40">Response within 2 hours · Zero obligation</p>
        </div>

        {/* Steps */}
        <div className="mb-6 flex items-center">
          {STEPS.map((s, i) => {
            const n = i + 1
            const done = step > n
            const active = step === n
            return (
              <div key={s} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                      active ? 'text-white' : done ? 'bg-[#0694d1] text-white' : 'bg-white/10 text-white/30'
                    }`}
                    style={active ? { background: 'linear-gradient(135deg,#0694d1,#076D9D)', boxShadow: '0 0 0 3px rgba(6,148,209,0.25)' } : {}}
                  >
                    {done
                      ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      : n}
                  </div>
                  <span className={`text-[9px] font-semibold tracking-wider uppercase ${active ? 'text-[#3AB6EB]' : done ? 'text-white/50' : 'text-white/25'}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="mb-4 h-px flex-1 mx-1 transition-all" style={{ background: done ? '#0694d1' : 'rgba(255,255,255,0.12)' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Step 1 — YOU */}
        {step === 1 && (
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">First Name <span className="text-[#0694d1]">*</span></label>
                {inputRow(<>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-white/30"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} placeholder="Rahul" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
                </>)}
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">Last Name</label>
                {inputRow(<>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-white/30"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Sharma" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
                </>)}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">Work Email <span className="text-[#0694d1]">*</span></label>
              {inputRow(<>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-white/30"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" type="email" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
              </>)}
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">Phone / WhatsApp <span className="text-[#0694d1]">*</span></label>
              {inputRow(<>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-white/30"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98400 00000" type="tel" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none" />
              </>)}
            </div>
          </div>
        )}

        {/* Step 2 — INTERESTS */}
        {step === 2 && (
          <div className="space-y-3">
            <p className="text-sm text-white/50">Which areas interest you most?</p>
            <div className="grid grid-cols-2 gap-2">
              {INTEREST_OPTIONS.map(opt => (
                <button key={opt} onClick={() => setInterests(p => p.includes(opt) ? p.filter(x => x !== opt) : [...p, opt])}
                  className={`rounded-lg px-3 py-2.5 text-left text-xs font-medium transition-all ${interests.includes(opt) ? 'text-white' : 'text-white/50 hover:text-white/70'}`}
                  style={{ background: interests.includes(opt) ? 'rgba(6,148,209,0.20)' : 'rgba(255,255,255,0.05)', border: interests.includes(opt) ? '1px solid rgba(6,148,209,0.50)' : '1px solid rgba(255,255,255,0.08)' }}
                >{opt}</button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — GOALS */}
        {step === 3 && (
          <div className="space-y-2">
            <p className="text-sm text-white/50">What is your primary goal?</p>
            {GOAL_OPTIONS.map(opt => (
              <button key={opt} onClick={() => setGoal(opt)}
                className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all ${goal === opt ? 'text-white' : 'text-white/50 hover:text-white/70'}`}
                style={{ background: goal === opt ? 'rgba(6,148,209,0.20)' : 'rgba(255,255,255,0.05)', border: goal === opt ? '1px solid rgba(6,148,209,0.50)' : '1px solid rgba(255,255,255,0.08)' }}
              >{opt}</button>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-5">
          <button
            onClick={() => step < 3 ? setStep(s => s + 1) : onClose()}
            className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'linear-gradient(90deg, #0694d1, #3AB6EB)' }}
          >
            {step < 3 ? 'Continue →' : 'Submit →'}
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/25">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Your details are safe. No spam, ever.
          </p>
        </div>
      </div>
    </div>
  , document.body)
}

const CARD_CATEGORY_ICON: Record<string, React.ReactNode> = {
  FUNDAMENTALS: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M5 3a7 7 0 0 0 7 7 7 7 0 0 0 7-7"/></svg>,
  ASSOCIATE: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
  EXPERT: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7l4 9h12l4-9-6 4-4-6-4 6z"/></svg>,
  NEW: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
}
const HIW_STEP_ICONS: React.ReactNode[] = [
  <svg key="goal" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  <svg key="format" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  <svg key="train" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  <svg key="certify" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
]
const CARD_CATEGORY_LABEL: Record<string, string> = { FUNDAMENTALS: 'Fundamentals', ASSOCIATE: 'Associate', EXPERT: 'Expert', NEW: 'New' }
const CARD_CATEGORY_BADGE: Record<string, string> = {
  FUNDAMENTALS: 'bg-gradient-to-br from-[#4DBFEF] to-[#0694D1] text-white',
  ASSOCIATE:    'bg-gradient-to-br from-[#0694D1] to-[#076D9D] text-white',
  EXPERT:       'bg-gradient-to-br from-[#076D9D] to-[#062238] text-white',
  NEW:          'bg-gradient-to-br from-[#0694D1] to-[#22d3ee] text-white',
}

function CourseCard({ c }: { c: Omit<typeof TOP_COURSES[0], 'cert'> & { cert?: typeof TOP_COURSES[0]['cert'] } }) {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [isClamped, setIsClamped] = useState(false)
  const [showBrochure, setShowBrochure] = useState(false)
  const [showEnroll, setShowEnroll] = useState(false)
  useLayoutEffect(() => {
    const el = nameRef.current
    if (el) setIsClamped(el.scrollHeight > el.clientHeight)
  }, [c.name])
  const category = (c as { category?: string }).category ?? 'ASSOCIATE'
  return (
    <div
      role="button" tabIndex={0}
      className="group relative cursor-pointer rounded-xl bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-koenig-blue"
      style={{ border: '1px solid #CAEFFF', boxShadow: '0 4px 16px rgba(0, 164, 239, 0.10)' }}
    >
      {c.hot && (
        <span className="absolute right-0 top-0 z-[1] inline-flex items-center gap-1 whitespace-nowrap rounded-bl-xl rounded-tr-xl px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-white" style={{ background: 'linear-gradient(135deg,#0694D1,#22d3ee)', boxShadow: '-2px 2px 8px rgba(6,148,209,0.28)' }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c0 0-5.5 6-5.5 10.5a5.5 5.5 0 0 0 11 0C17.5 8 12 2 12 2zm0 14a3 3 0 0 1-3-3c0-2.5 3-6 3-6s3 3.5 3 6a3 3 0 0 1-3 3z" /></svg>
          Popular
        </span>
      )}
      <div className="mb-3 flex items-center">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide whitespace-nowrap ${CARD_CATEGORY_BADGE[category] ?? CARD_CATEGORY_BADGE.ASSOCIATE}`}>
          {CARD_CATEGORY_ICON[category] ?? CARD_CATEGORY_ICON.ASSOCIATE}
          {CARD_CATEGORY_LABEL[category] ?? CARD_CATEGORY_LABEL.ASSOCIATE}
        </span>
      </div>
      <div className="group/name relative mb-3">
        <h3
          ref={nameRef}
          className="text-sm font-semibold text-koenig-navy transition-colors group-hover:text-koenig-blue leading-5 cursor-default"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >{c.name}</h3>
        {/* Tooltip — only shown when name is clamped beyond 2 lines */}
        {isClamped && (
          <div
            className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-64 rounded-xl px-3 py-2.5 text-sm font-medium text-white opacity-0 shadow-2xl transition-all duration-200 group-hover/name:opacity-100 group-hover/name:translate-y-0 translate-y-1"
            style={{ background: 'rgba(5,18,38,0.97)', border: '1px solid rgba(6,148,209,0.35)', backdropFilter: 'blur(12px)', lineHeight: '1.6', boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(6,148,209,0.15) inset' }}
          >
            {c.name}
            <span className="absolute -bottom-[5px] left-5 h-2.5 w-2.5 rotate-45" style={{ background: 'rgba(5,18,38,0.97)', borderRight: '1px solid rgba(6,148,209,0.35)', borderBottom: '1px solid rgba(6,148,209,0.35)' }} />
          </div>
        )}
      </div>
      <div className="mb-2 flex items-center justify-between gap-2 text-sm text-koenig-gray">
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {c.days * 8} Hrs ({c.days} days)
        </span>
        {(c as { tech?: string }).tech && (
          <span className="flex items-center gap-1 truncate text-koenig-gray/70">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            {(c as { tech?: string }).tech}
          </span>
        )}
      </div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); setShowBrochure(true) }}
          className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[#046fa3]"
          style={{ color: '#0694D1' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          Download Syllabus
        </button>
        <span className="flex items-center gap-1 truncate text-sm text-koenig-gray/70">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          {c.vendor}
        </span>
      </div>
      <div className="border-t pt-3.5" style={{ borderColor: '#CAEFFF' }}>
        <div className="mb-2.5 flex items-baseline justify-between">
          <span className="flex items-center gap-1 text-sm text-koenig-gray">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            {c.enrolled}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(217,158,11,0.85)" className="ml-1"><path d="M12 2l2.9 6.26 6.9.6-5.2 4.53 1.58 6.76L12 16.9l-6.18 3.25 1.58-6.76-5.2-4.53 6.9-.6z"/></svg>
            <span className="font-medium" style={{ color: 'rgba(217,158,11,0.85)' }}>{c.rating}</span>
          </span>
          <span className="text-sm sm:text-base font-bold" style={{ color: '#0694d1' }}>{c.price}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); window.open('https://www.koenig-solutions.com', '_blank') }}
            className="flex-1 rounded-lg border py-1.5 text-sm font-semibold transition-all hover:bg-[#0694d1]/5"
            style={{ borderColor: '#0694D1', color: '#0694D1' }}
          >
            View Course
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setShowEnroll(true) }}
            className="flex-1 rounded-lg py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #0694d1, #076D9D)' }}
          >
            Enquire Now
          </button>
        </div>
      </div>
      {showBrochure && <SyllabusModal course={c.name} onClose={() => setShowBrochure(false)} />}
      {showEnroll && <EnquireNowModal course={c.name} onClose={() => setShowEnroll(false)} />}
    </div>
  )
}

function ScheduleCard({ s }: { s: typeof SCHEDULE[0] }) {
  const urgent = s.seats <= 3
  const [showSyllabus, setShowSyllabus] = useState(false)
  const [showEnquire, setShowEnquire] = useState(false)
  return (
    <div
      role="button" tabIndex={0}
      className="group relative cursor-pointer rounded-xl bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-koenig-blue"
      style={{ border: '1px solid #CAEFFF', boxShadow: '0 4px 16px rgba(0, 164, 239, 0.10)' }}
    >
      {s.hot && (
        <span className="absolute right-0 top-0 z-[1] inline-flex items-center gap-1 whitespace-nowrap rounded-bl-xl rounded-tr-xl px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-white" style={{ background: 'linear-gradient(135deg,#0694D1,#22d3ee)', boxShadow: '-2px 2px 8px rgba(6,148,209,0.28)' }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c0 0-5.5 6-5.5 10.5a5.5 5.5 0 0 0 11 0C17.5 8 12 2 12 2zm0 14a3 3 0 0 1-3-3c0-2.5 3-6 3-6s3 3.5 3 6a3 3 0 0 1-3 3z" /></svg>
          Popular
        </span>
      )}

      {/* Row 1 — level badge | seats left */}
      <div className="mb-3 flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide whitespace-nowrap ${SCHEDULE_LEVEL_BADGE[s.level]}`}>
          {SCHEDULE_LEVEL_ICON[s.level]}
          {SCHEDULE_LEVEL_LABEL[s.level]}
        </span>
        <span className={`${urgent ? 'animate-pulse' : ''} rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${urgent ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {s.seats} seats left
        </span>
      </div>

      {/* Row 2 — course name */}
      <h3 className="mb-3 text-sm sm:text-base font-semibold text-koenig-navy transition-colors group-hover:text-koenig-blue">{s.name}</h3>

      {/* Row 3 — date · hrs | tech */}
      <div className="mb-2 flex items-center justify-between gap-2 text-sm text-koenig-gray">
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {s.days * 8} Hrs ({s.days} days)
        </span>
        <span className="flex items-center gap-1 truncate text-koenig-gray/70">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          {s.tech}
        </span>
      </div>

      {/* Row 4 — Download Syllabus | vendor */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); setShowSyllabus(true) }}
          className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[#046fa3]"
          style={{ color: '#0694D1' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          Download Syllabus
        </button>
        <span className="flex items-center gap-1 truncate text-sm text-koenig-gray/70">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          {s.vendor}
        </span>
      </div>

      {/* Row 5 — enrolled/rating | price */}
      <div className="border-t pt-3.5" style={{ borderColor: '#CAEFFF' }}>
        <div className="mb-2.5 flex items-baseline justify-between">
          <span className="flex items-center gap-1 text-sm text-koenig-gray">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            {s.enrolled}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(217,158,11,0.85)" className="ml-1"><path d="M12 2l2.9 6.26 6.9.6-5.2 4.53 1.58 6.76L12 16.9l-6.18 3.25 1.58-6.76-5.2-4.53 6.9-.6z"/></svg>
            <span className="font-medium" style={{ color: 'rgba(217,158,11,0.85)' }}>{s.rating}</span>
          </span>
          <span className="text-sm sm:text-base font-bold" style={{ color: '#0694d1' }}>{s.price}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); window.open('https://www.koenig-solutions.com', '_blank') }}
            className="flex-1 rounded-lg border py-1.5 text-sm font-semibold transition-all hover:bg-[#0694d1]/5"
            style={{ borderColor: '#0694D1', color: '#0694D1' }}
          >
            View Course
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setShowEnquire(true) }}
            className="flex-1 rounded-lg py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg,#0694d1,#076D9D)' }}
          >
            Enquire Now
          </button>
        </div>
      </div>
      {showSyllabus && <SyllabusModal course={s.name} onClose={() => setShowSyllabus(false)} />}
      {showEnquire && <EnquireNowModal course={s.name} onClose={() => setShowEnquire(false)} />}
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */

/* ─── Dropdown data ─────────────────────────────────────────── */
const ABOUT_LINKS = [
  { label: 'About Us',            href: '/about' },
  { label: 'Our Clients',         href: '/about/our-clients' },
  { label: 'Our Partners',        href: '/about/our-partners' },
  { label: 'Our Awards',          href: '/about/awards' },
  { label: 'Happiness Guarantee', href: '/about/happiness-guarantee' },
  { label: 'Student Feedback',    href: '/about/student-feedback' },
]
const LEARNING_LINKS = [
  { label: 'Explore All Learning Options', href: '/learning-options' },
  { label: 'Live Online Training',         href: '/live-online-classroom' },
  { label: 'Classroom Training',           href: '/classroom-training' },
  { label: '1-on-1 Training',              href: '/1-on-1-training' },
  { label: 'Fly-Me-a-Trainer',             href: '/fly-me-a-trainer' },
  { label: 'Flexi',                        href: '/flexi-training' },
  { label: 'Customized Training',          href: '/customised-training' },
  { label: 'Webinar as a Service',         href: '/webinar-service' },
  { label: 'Qubits',                       href: '/qubits' },
  { label: 'Upcoming Webinars',            href: '/upcoming-webinars' },
  { label: 'Learnova',                     href: '/learnova' },
]

const VENDOR_HREFS: Record<string, string> = {
  'Microsoft': '/microsoft',
}
const COURSE_HREFS: Record<string, string> = {
  'AZ-104: Microsoft Azure Administrator': '/courses/az-104',
}
const TECH_HREFS: Record<string, string> = {
  'Power Platform': '/technologies/power-platform',
}

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
  { name: 'ISACA',            img: 'ISACA_ChannelPartner_Logo_Elite_3.png',                      courses: '60+'  },
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
    { name: 'SC-300: Microsoft Identity & Access Administrator', days: 4, level: 'Advanced' },
    { name: 'SC-200: Microsoft Security Operations Analyst', days: 4, level: 'Advanced' },
    { name: 'DP-900: Azure Data Fundamentals', days: 1, level: 'Beginner' },
    { name: 'AZ-500: Azure Security Engineer Associate', days: 4, level: 'Advanced' },
    { name: 'MS-700: Managing Microsoft Teams', days: 4, level: 'Intermediate' },
    { name: 'PL-400: Power Platform Developer', days: 5, level: 'Advanced' },
    { name: 'MS-721: Teams Voice Engineer', days: 4, level: 'Advanced' },
  ],
  'AWS': [
    { name: 'AWS Solutions Architect – Associate', days: 4, level: 'Intermediate' },
    { name: 'AWS DevOps Engineer – Professional', days: 5, level: 'Advanced' },
    { name: 'AWS Certified AI Practitioner', days: 3, level: 'Beginner' },
    { name: 'AWS Cloud Practitioner Essentials', days: 2, level: 'Beginner' },
    { name: 'AWS SysOps Administrator – Associate', days: 3, level: 'Intermediate' },
    { name: 'Advanced AWS Networking', days: 4, level: 'Advanced' },
    { name: 'AWS Certified Developer – Associate', days: 4, level: 'Intermediate' },
    { name: 'AWS Certified Security – Specialty', days: 3, level: 'Advanced' },
    { name: 'AWS Certified Machine Learning – Specialty', days: 4, level: 'Advanced' },
    { name: 'AWS Certified Database – Specialty', days: 3, level: 'Advanced' },
    { name: 'AWS Certified Solutions Architect – Professional', days: 5, level: 'Advanced' },
    { name: 'AWS Certified Data Engineer – Associate', days: 4, level: 'Intermediate' },
    { name: 'AWS Certified SAP on AWS – Specialty', days: 4, level: 'Advanced' },
    { name: 'AWS Certified Advanced Networking – Specialty', days: 4, level: 'Advanced' },
    { name: 'AWS Well-Architected Framework Deep Dive', days: 2, level: 'Intermediate' },
  ],
  'Cisco': [
    { name: 'CCNP Enterprise Core (ENCOR)', days: 5, level: 'Advanced' },
    { name: 'CCNA (200-301)', days: 5, level: 'Beginner' },
    { name: 'Cisco CyberOps Associate', days: 5, level: 'Intermediate' },
    { name: 'Cisco DevNet Associate', days: 4, level: 'Intermediate' },
    { name: 'CCIE Enterprise Infrastructure', days: 5, level: 'Advanced' },
    { name: 'CCNP Security', days: 5, level: 'Advanced' },
    { name: 'CCNP Data Center', days: 5, level: 'Advanced' },
    { name: 'CCNP Collaboration', days: 5, level: 'Advanced' },
    { name: 'CCST Networking', days: 2, level: 'Beginner' },
    { name: 'Cisco SD-WAN Implementation', days: 4, level: 'Advanced' },
    { name: 'CCIE Security', days: 5, level: 'Advanced' },
    { name: 'Cisco Certified Support Technician (CCST)', days: 2, level: 'Beginner' },
    { name: 'CCNP Wireless', days: 4, level: 'Advanced' },
    { name: 'Cisco Meraki Solutions Specialist', days: 2, level: 'Intermediate' },
    { name: 'CCT Data Center', days: 3, level: 'Beginner' },
  ],
  'CompTIA': [
    { name: 'CompTIA Security+ (SY0-701)', days: 5, level: 'Intermediate' },
    { name: 'CompTIA Network+', days: 5, level: 'Beginner' },
    { name: 'CompTIA CySA+', days: 5, level: 'Intermediate' },
    { name: 'CompTIA A+ Core 1 & Core 2', days: 5, level: 'Beginner' },
    { name: 'CompTIA PenTest+', days: 5, level: 'Advanced' },
    { name: 'CompTIA Cloud+', days: 5, level: 'Intermediate' },
    { name: 'CompTIA Linux+', days: 5, level: 'Intermediate' },
    { name: 'CompTIA Data+', days: 4, level: 'Intermediate' },
    { name: 'CompTIA Project+', days: 3, level: 'Beginner' },
    { name: 'CompTIA Server+', days: 5, level: 'Intermediate' },
    { name: 'CompTIA CASP+', days: 5, level: 'Advanced' },
    { name: 'CompTIA ITF+', days: 2, level: 'Beginner' },
    { name: 'CompTIA CySA+ Exam Prep Bootcamp', days: 2, level: 'Advanced' },
    { name: 'CompTIA CASP+ Exam Prep Bootcamp', days: 2, level: 'Advanced' },
    { name: 'CompTIA ITF+ Bootcamp', days: 1, level: 'Beginner' },
  ],
  'Oracle': [
    { name: 'Oracle Database Administration', days: 5, level: 'Intermediate' },
    { name: 'Oracle Cloud Infrastructure Architect Associate', days: 4, level: 'Intermediate' },
    { name: 'Java SE 17 Developer', days: 5, level: 'Intermediate' },
    { name: 'Oracle Cloud Infrastructure Foundations', days: 2, level: 'Beginner' },
    { name: 'Oracle Autonomous Database Administration', days: 3, level: 'Advanced' },
    { name: 'Oracle Fusion Cloud Applications', days: 5, level: 'Advanced' },
    { name: 'Oracle Cloud Infrastructure Developer Professional', days: 4, level: 'Advanced' },
    { name: 'MySQL Database Administration', days: 4, level: 'Intermediate' },
    { name: 'Java SE 21 Developer Professional', days: 5, level: 'Advanced' },
    { name: 'Oracle PL/SQL Developer Certified Associate', days: 4, level: 'Intermediate' },
    { name: 'Oracle Cloud Infrastructure Security Professional', days: 3, level: 'Advanced' },
    { name: 'Oracle Data Integrator Certified Implementation Specialist', days: 4, level: 'Advanced' },
    { name: 'Oracle WebLogic Server Administration', days: 4, level: 'Advanced' },
    { name: 'Oracle GoldenGate Fundamentals', days: 3, level: 'Advanced' },
    { name: 'Oracle E-Business Suite R12 Administration', days: 5, level: 'Intermediate' },
  ],
  'SAP': [
    { name: 'SAP S/4HANA Functional Consultant', days: 5, level: 'Advanced' },
    { name: 'SAP BASIS Administration', days: 5, level: 'Intermediate' },
    { name: 'SAP ABAP Programming', days: 5, level: 'Intermediate' },
    { name: 'SAP BW/4HANA Data Modeling', days: 4, level: 'Advanced' },
    { name: 'SAP Certified Associate – Cloud ERP', days: 3, level: 'Intermediate' },
    { name: 'SAP SuccessFactors Employee Central', days: 5, level: 'Advanced' },
    { name: 'SAP Ariba Procurement', days: 4, level: 'Intermediate' },
    { name: 'SAP Fiori System Administration', days: 3, level: 'Intermediate' },
    { name: 'SAP HANA Cloud Modeling', days: 4, level: 'Advanced' },
    { name: 'SAP Business Technology Platform', days: 4, level: 'Advanced' },
    { name: 'SAP MM: Materials Management', days: 5, level: 'Intermediate' },
    { name: 'SAP FICO: Finance & Controlling', days: 5, level: 'Intermediate' },
    { name: 'SAP Concur Travel & Expense', days: 3, level: 'Intermediate' },
    { name: 'SAP Analytics Cloud', days: 4, level: 'Advanced' },
    { name: 'SAP EWM: Extended Warehouse Management', days: 5, level: 'Advanced' },
  ],
  'PMI': [
    { name: 'Project Management Professional (PMP)', days: 3, level: 'Advanced' },
    { name: 'CAPM: Certified Associate in PM', days: 3, level: 'Beginner' },
    { name: 'PMI-ACP: Agile Certified Practitioner', days: 3, level: 'Intermediate' },
    { name: 'PMI-RMP: Risk Management Professional', days: 3, level: 'Advanced' },
    { name: 'PMI-PBA: Professional in Business Analysis', days: 3, level: 'Advanced' },
    { name: 'PfMP: Portfolio Management Professional', days: 4, level: 'Advanced' },
    { name: 'PMI-SP: Scheduling Professional', days: 3, level: 'Advanced' },
    { name: 'DASM: Disciplined Agile Scrum Master', days: 2, level: 'Intermediate' },
    { name: 'DASSM: Disciplined Agile Senior Scrum Master', days: 3, level: 'Advanced' },
    { name: 'PMP Exam Prep Bootcamp', days: 2, level: 'Advanced' },
    { name: 'Agile Project Management Fundamentals', days: 2, level: 'Beginner' },
    { name: 'PMI Wicked Problem Solving', days: 1, level: 'Intermediate' },
    { name: 'PMI Citizen Developer Certification', days: 2, level: 'Beginner' },
    { name: 'Kanban Management Professional', days: 2, level: 'Intermediate' },
    { name: 'Risk Management Fundamentals', days: 2, level: 'Beginner' },
  ],
  'Red Hat': [
    { name: 'RHCSA: Red Hat Certified System Administrator', days: 5, level: 'Intermediate' },
    { name: 'RHCE: Red Hat Certified Engineer', days: 5, level: 'Advanced' },
    { name: 'OpenShift Administration', days: 4, level: 'Advanced' },
    { name: 'Ansible Automation Platform', days: 4, level: 'Intermediate' },
    { name: 'RHCA: Red Hat Certified Architect', days: 5, level: 'Advanced' },
    { name: 'Red Hat Satellite Administration', days: 3, level: 'Advanced' },
    { name: 'Red Hat CloudForms Administration', days: 3, level: 'Advanced' },
    { name: 'Red Hat Ceph Storage Administration', days: 4, level: 'Advanced' },
    { name: 'RHEL Diagnostics and Troubleshooting', days: 4, level: 'Advanced' },
    { name: 'OpenShift Application Development', days: 4, level: 'Intermediate' },
    { name: 'Red Hat Virtualization Administration', days: 4, level: 'Intermediate' },
    { name: 'Red Hat Identity Management', days: 3, level: 'Advanced' },
    { name: 'Red Hat OpenStack Administration', days: 4, level: 'Advanced' },
    { name: 'Red Hat Learning Subscription Bootcamp', days: 3, level: 'Intermediate' },
    { name: 'Red Hat Advanced Automation: Ansible Best Practices', days: 3, level: 'Advanced' },
  ],
  'EC-Council': [
    { name: 'Certified Ethical Hacker (CEH v13)', days: 5, level: 'Intermediate' },
    { name: 'CPENT: Certified Penetration Testing', days: 5, level: 'Advanced' },
    { name: 'CHFI: Computer Hacking Forensic Investigator', days: 5, level: 'Intermediate' },
    { name: 'CCSE: Certified Cloud Security Engineer', days: 3, level: 'Advanced' },
    { name: 'ECSA: Certified Security Analyst', days: 5, level: 'Advanced' },
    { name: 'CTIA: Certified Threat Intelligence Analyst', days: 3, level: 'Advanced' },
    { name: 'CSA: Certified SOC Analyst', days: 3, level: 'Intermediate' },
    { name: 'CND: Certified Network Defender', days: 5, level: 'Intermediate' },
    { name: 'CCT: Certified Cybersecurity Technician', days: 3, level: 'Beginner' },
    { name: 'DFE: Digital Forensics Essentials', days: 2, level: 'Beginner' },
    { name: 'CASE JAVA: Application Security Engineer', days: 4, level: 'Advanced' },
    { name: 'ECIH: Certified Incident Handler', days: 3, level: 'Intermediate' },
    { name: 'CASE .NET: Application Security Engineer', days: 4, level: 'Advanced' },
    { name: 'CEH Practical Exam Prep', days: 2, level: 'Advanced' },
    { name: 'OSINT: Open Source Intelligence Fundamentals', days: 2, level: 'Beginner' },
  ],
  'VMware': [
    { name: 'vSphere: Install, Configure, Manage', days: 5, level: 'Intermediate' },
    { name: 'NSX-T Data Center: Install, Configure, Manage', days: 5, level: 'Advanced' },
    { name: 'vSAN: Deploy and Manage', days: 3, level: 'Advanced' },
    { name: 'VMware Cloud Foundation: Deploy and Manage', days: 4, level: 'Advanced' },
    { name: 'vSphere: Optimize and Scale', days: 3, level: 'Advanced' },
    { name: 'VMware Horizon: Deploy and Manage', days: 4, level: 'Advanced' },
    { name: 'VMware Cloud on AWS', days: 3, level: 'Advanced' },
    { name: 'VMware Tanzu Kubernetes Operations', days: 4, level: 'Advanced' },
    { name: 'VMware Site Recovery Manager', days: 3, level: 'Advanced' },
    { name: 'NSX-T Advanced Troubleshooting', days: 4, level: 'Advanced' },
    { name: 'VMware Aria Automation', days: 4, level: 'Advanced' },
    { name: 'VMware Carbon Black Cloud Endpoint', days: 3, level: 'Intermediate' },
    { name: 'VMware NSX-T Micro-Segmentation', days: 3, level: 'Advanced' },
    { name: 'VMware Cloud Director Administration', days: 3, level: 'Advanced' },
    { name: 'VMware vRealize Operations Manager', days: 3, level: 'Advanced' },
  ],
  'PeopleCert': [
    { name: 'ITIL® 4 Foundation', days: 3, level: 'Beginner' },
    { name: 'PRINCE2® Foundation & Practitioner', days: 5, level: 'Intermediate' },
    { name: 'ITIL 4 Specialist: Create, Deliver and Support', days: 3, level: 'Advanced' },
    { name: 'PRINCE2 Agile', days: 3, level: 'Intermediate' },
    { name: 'ITIL 4 Specialist: Drive Stakeholder Value', days: 3, level: 'Advanced' },
    { name: 'ITIL 4 Strategist: Direct, Plan and Improve', days: 3, level: 'Advanced' },
    { name: 'ITIL 4 Leader: Digital and IT Strategy', days: 2, level: 'Advanced' },
    { name: 'MSP®: Managing Successful Programmes', days: 4, level: 'Advanced' },
    { name: 'M_o_R®: Management of Risk', days: 3, level: 'Intermediate' },
    { name: 'AgileSHIFT®', days: 1, level: 'Beginner' },
    { name: 'PRINCE2® Practitioner Refresher', days: 2, level: 'Intermediate' },
    { name: 'P3O®: Portfolio, Programme and Project Offices', days: 3, level: 'Advanced' },
    { name: 'PRINCE2 Foundation Fast Track', days: 2, level: 'Beginner' },
    { name: 'ITIL 4 Foundation Exam Prep', days: 1, level: 'Beginner' },
    { name: 'Resilia Cyber Resilience Foundation', days: 2, level: 'Intermediate' },
  ],
  'PECB': [
    { name: 'ISO 27001 Lead Implementer', days: 5, level: 'Advanced' },
    { name: 'ISO 27001 Lead Auditor', days: 5, level: 'Advanced' },
    { name: 'ISO 22301 Lead Implementer', days: 5, level: 'Intermediate' },
    { name: 'ISO 9001 Lead Auditor', days: 5, level: 'Intermediate' },
    { name: 'ISO 27701 Lead Implementer', days: 4, level: 'Advanced' },
    { name: 'ISO 31000 Risk Manager', days: 3, level: 'Intermediate' },
    { name: 'ISO 22301 Lead Auditor', days: 5, level: 'Advanced' },
    { name: 'ISO 20000 Lead Implementer', days: 4, level: 'Advanced' },
    { name: 'ISO 42001 AI Management Lead Implementer', days: 4, level: 'Advanced' },
    { name: 'GDPR Certified Data Protection Officer', days: 3, level: 'Intermediate' },
    { name: 'ISO 37301 Lead Compliance Manager', days: 4, level: 'Advanced' },
    { name: 'ISO 45001 Lead Auditor', days: 5, level: 'Advanced' },
    { name: 'ISO 26000 Social Responsibility', days: 2, level: 'Beginner' },
    { name: 'ISO 14001 Lead Auditor', days: 5, level: 'Advanced' },
    { name: 'ISO 50001 Lead Implementer', days: 4, level: 'Advanced' },
  ],
  'Linux Foundation': [
    { name: 'Certified Kubernetes Administrator (CKA)', days: 4, level: 'Advanced' },
    { name: 'Certified Kubernetes Application Developer (CKAD)', days: 3, level: 'Intermediate' },
    { name: 'Linux Foundation Certified System Administrator', days: 5, level: 'Intermediate' },
    { name: 'KCNA: Kubernetes and Cloud Native Associate', days: 2, level: 'Beginner' },
    { name: 'KCSA: Kubernetes and Cloud Native Security Associate', days: 2, level: 'Intermediate' },
    { name: 'CKS: Certified Kubernetes Security Specialist', days: 4, level: 'Advanced' },
    { name: 'FinOps Certified Practitioner', days: 2, level: 'Intermediate' },
    { name: 'Cloud Engineer Bootcamp', days: 5, level: 'Intermediate' },
    { name: 'Introduction to Linux (LFS101)', days: 3, level: 'Beginner' },
    { name: 'Istio and Envoy Fundamentals', days: 2, level: 'Advanced' },
    { name: 'GitOps Fundamentals', days: 2, level: 'Intermediate' },
    { name: 'Prometheus Certified Associate (PCA)', days: 2, level: 'Intermediate' },
    { name: 'OpenTelemetry Certified Associate', days: 2, level: 'Intermediate' },
    { name: 'ArgoProj Certified Associate', days: 2, level: 'Intermediate' },
    { name: 'Cloud Native Security Associate Bootcamp', days: 3, level: 'Advanced' },
  ],
  'ISACA': [
    { name: 'CISM: Certified Information Security Manager', days: 3, level: 'Advanced' },
    { name: 'CISA: Certified Information Systems Auditor', days: 3, level: 'Advanced' },
    { name: 'CRISC: Certified in Risk and Information Systems Control', days: 3, level: 'Advanced' },
    { name: 'CGEIT: Certified in Governance of Enterprise IT', days: 3, level: 'Advanced' },
    { name: 'CDPSE: Certified Data Privacy Solutions Engineer', days: 3, level: 'Advanced' },
    { name: 'COBIT 2019 Foundation', days: 2, level: 'Beginner' },
    { name: 'IT Risk Fundamentals', days: 2, level: 'Beginner' },
    { name: 'CISM Exam Prep Bootcamp', days: 2, level: 'Advanced' },
    { name: 'CISA Exam Prep Bootcamp', days: 2, level: 'Advanced' },
    { name: 'CET: Certified in Emerging Technology', days: 2, level: 'Intermediate' },
    { name: 'AI Fundamentals Certificate', days: 1, level: 'Beginner' },
    { name: 'COBIT 2019 Design and Implementation', days: 3, level: 'Advanced' },
    { name: 'Advanced in AI Security Management', days: 2, level: 'Advanced' },
    { name: 'IT Governance Fundamentals', days: 2, level: 'Beginner' },
    { name: 'Data Privacy Fundamentals', days: 2, level: 'Beginner' },
  ],
  'ISC2': [
    { name: 'CISSP Certification', days: 5, level: 'Advanced' },
    { name: 'CCSP: Certified Cloud Security Professional', days: 5, level: 'Advanced' },
    { name: 'SSCP: Systems Security Certified Practitioner', days: 5, level: 'Intermediate' },
    { name: 'CC: Certified in Cybersecurity', days: 2, level: 'Beginner' },
    { name: 'CGRC: Governance, Risk and Compliance', days: 4, level: 'Advanced' },
    { name: 'HCISPP: Healthcare Information Security', days: 4, level: 'Advanced' },
    { name: 'ISSAP: Information Systems Security Architecture', days: 3, level: 'Advanced' },
    { name: 'ISSEP: Information Systems Security Engineering', days: 3, level: 'Advanced' },
    { name: 'ISSMP: Information Systems Security Management', days: 3, level: 'Advanced' },
    { name: 'CISSP Exam Prep Bootcamp', days: 2, level: 'Advanced' },
    { name: 'SSCP Exam Prep Bootcamp', days: 2, level: 'Intermediate' },
    { name: 'CCSP Exam Prep Bootcamp', days: 2, level: 'Advanced' },
    { name: 'SSCP Bridge Course', days: 2, level: 'Intermediate' },
    { name: 'Certified in Cybersecurity Exam Prep Bootcamp', days: 1, level: 'Beginner' },
    { name: 'CISSP Concentration: ISSEP Deep Dive', days: 3, level: 'Advanced' },
  ],
  'ISTQB': [
    { name: 'ISTQB Certified Tester Foundation Level', days: 3, level: 'Beginner' },
    { name: 'ISTQB Advanced Level Test Analyst', days: 4, level: 'Advanced' },
    { name: 'ISTQB Advanced Level Test Manager', days: 5, level: 'Advanced' },
    { name: 'ISTQB Foundation Level Agile Tester', days: 2, level: 'Beginner' },
    { name: 'ISTQB Advanced Level Technical Test Analyst', days: 4, level: 'Advanced' },
    { name: 'ISTQB Advanced Level Test Automation Engineer', days: 4, level: 'Advanced' },
    { name: 'ISTQB Specialist Performance Testing', days: 3, level: 'Intermediate' },
    { name: 'ISTQB Specialist Security Tester', days: 3, level: 'Advanced' },
    { name: 'ISTQB Specialist Mobile Application Testing', days: 2, level: 'Intermediate' },
    { name: 'ISTQB Specialist Usability Testing', days: 2, level: 'Intermediate' },
    { name: 'ISTQB Specialist AI Testing', days: 2, level: 'Advanced' },
    { name: 'ISTQB Specialist Gherkin Test Automation', days: 2, level: 'Intermediate' },
    { name: 'ISTQB Specialist Test Automation Bootcamp', days: 3, level: 'Advanced' },
    { name: 'ISTQB Foundation Extension Model-Based Testing', days: 2, level: 'Intermediate' },
    { name: 'ISTQB Specialist Acceptance Testing', days: 2, level: 'Intermediate' },
  ],
  'The Open Group': [
    { name: 'TOGAF 10 Foundation & Practitioner', days: 5, level: 'Intermediate' },
    { name: 'TOGAF 9.2 Foundation', days: 3, level: 'Beginner' },
    { name: 'ArchiMate 3 Foundation & Practitioner', days: 4, level: 'Intermediate' },
    { name: 'TOGAF Business Architecture', days: 3, level: 'Advanced' },
    { name: 'IT4IT Foundation', days: 3, level: 'Intermediate' },
    { name: 'ArchiMate 3 Practitioner Bootcamp', days: 2, level: 'Advanced' },
    { name: 'Open FAIR Foundation', days: 2, level: 'Intermediate' },
    { name: 'DPBoK Foundation', days: 3, level: 'Intermediate' },
    { name: 'TOGAF Enterprise Architecture Practitioner', days: 4, level: 'Advanced' },
    { name: 'Open CA: Certified Architect', days: 4, level: 'Advanced' },
    { name: 'Open CITS: Certified IT Specialist', days: 4, level: 'Advanced' },
    { name: 'SOA Foundation', days: 2, level: 'Beginner' },
    { name: 'TOGAF Practitioner Refresher', days: 2, level: 'Intermediate' },
    { name: 'Open Agile Architecture Foundation', days: 3, level: 'Advanced' },
    { name: 'ArchiMate Modeling Bootcamp', days: 2, level: 'Intermediate' },
  ],
  'ServiceNow': [
    { name: 'ServiceNow System Administrator', days: 3, level: 'Intermediate' },
    { name: 'ServiceNow Application Developer', days: 4, level: 'Advanced' },
    { name: 'ServiceNow ITSM Implementation', days: 3, level: 'Intermediate' },
    { name: 'ServiceNow Certified Implementation Specialist – ITSM', days: 4, level: 'Advanced' },
    { name: 'ServiceNow HRSD Implementation', days: 4, level: 'Advanced' },
    { name: 'ServiceNow CSM Implementation', days: 4, level: 'Advanced' },
    { name: 'ServiceNow Certified Technical Architect', days: 5, level: 'Advanced' },
    { name: 'ServiceNow Flow Designer Micro-Certification', days: 1, level: 'Beginner' },
    { name: 'ServiceNow Discovery and Service Mapping', days: 3, level: 'Advanced' },
    { name: 'ServiceNow Performance Analytics', days: 2, level: 'Intermediate' },
    { name: 'ServiceNow Virtual Agent Implementation', days: 2, level: 'Intermediate' },
    { name: 'ServiceNow App Engine Studio', days: 3, level: 'Intermediate' },
    { name: 'ServiceNow Now Assist AI Implementation', days: 3, level: 'Advanced' },
    { name: 'ServiceNow Integration Hub Fundamentals', days: 2, level: 'Intermediate' },
    { name: 'ServiceNow Security Operations', days: 4, level: 'Advanced' },
  ],
  'Broadcom': [
    { name: 'Clarity PPM Administration', days: 4, level: 'Advanced' },
    { name: 'CA Service Management Administration', days: 3, level: 'Intermediate' },
    { name: 'Symantec Endpoint Security', days: 3, level: 'Intermediate' },
    { name: 'Symantec DLP Administration', days: 3, level: 'Advanced' },
    { name: 'CA Application Performance Management', days: 4, level: 'Advanced' },
    { name: 'CA Automic Workload Automation', days: 4, level: 'Advanced' },
    { name: 'Symantec Endpoint Protection Advanced', days: 3, level: 'Advanced' },
    { name: 'CA Service Desk Manager', days: 3, level: 'Intermediate' },
    { name: 'CA Identity Manager Administration', days: 4, level: 'Advanced' },
    { name: 'Symantec Web Security Service', days: 3, level: 'Intermediate' },
    { name: 'CA API Management', days: 3, level: 'Advanced' },
    { name: 'CA Agile Central Administration', days: 2, level: 'Intermediate' },
    { name: 'Symantec Data Center Security', days: 3, level: 'Advanced' },
    { name: 'CA PPM Reporting and Analytics', days: 2, level: 'Intermediate' },
    { name: 'VIP Access Manager Administration', days: 2, level: 'Intermediate' },
  ],
  'Check Point': [
    { name: 'Check Point CCSA R82', days: 3, level: 'Intermediate' },
    { name: 'Check Point CCSE R82', days: 4, level: 'Advanced' },
    { name: 'Check Point Certified Cloud Specialist', days: 3, level: 'Advanced' },
    { name: 'Check Point CCSM: Multi-Domain Security Mgmt', days: 3, level: 'Advanced' },
    { name: 'Check Point Certified Cloud Network Security Expert', days: 4, level: 'Advanced' },
    { name: 'Check Point Harmony Endpoint Administration', days: 2, level: 'Intermediate' },
    { name: 'Check Point CloudGuard Administration', days: 3, level: 'Advanced' },
    { name: 'Check Point Certified Security Master', days: 5, level: 'Advanced' },
    { name: 'Check Point CCTE: Troubleshooting Expert', days: 4, level: 'Advanced' },
    { name: 'Check Point Certified Automation Specialist', days: 2, level: 'Advanced' },
    { name: 'Check Point SD-WAN Administration', days: 3, level: 'Intermediate' },
    { name: 'Check Point Certified Threat Prevention Specialist', days: 3, level: 'Advanced' },
    { name: 'Check Point Quantum Spark Administration', days: 2, level: 'Intermediate' },
    { name: 'Check Point Certified PenTesting Expert', days: 4, level: 'Advanced' },
    { name: 'Check Point Infinity Portal Management', days: 2, level: 'Intermediate' },
  ],
}

const TECH_MENU_COURSES: Record<string, { name: string; vendor: string; days: number; level: string }[]> = {
  'Cloud Computing': [
    { name: 'AZ-104: Microsoft Azure Administrator', vendor: 'Microsoft', days: 5, level: 'Intermediate' },
    { name: 'AWS Solutions Architect – Associate', vendor: 'AWS', days: 4, level: 'Intermediate' },
    { name: 'Google Professional Cloud Architect', vendor: 'Google Cloud', days: 4, level: 'Advanced' },
    { name: 'AZ-900: Azure Fundamentals', vendor: 'Microsoft', days: 1, level: 'Beginner' },
    { name: 'AWS Cloud Practitioner Essentials', vendor: 'AWS', days: 2, level: 'Beginner' },
    { name: 'Oracle Cloud Infrastructure Foundations', vendor: 'Oracle', days: 2, level: 'Beginner' },
    { name: 'AZ-305: Azure Solutions Architect Expert', vendor: 'Microsoft', days: 4, level: 'Advanced' },
    { name: 'AWS Certified Solutions Architect – Professional', vendor: 'AWS', days: 5, level: 'Advanced' },
    { name: 'VMware Cloud Foundation: Deploy and Manage', vendor: 'VMware', days: 4, level: 'Advanced' },
    { name: 'Oracle Cloud Infrastructure Architect Associate', vendor: 'Oracle', days: 4, level: 'Intermediate' },
    { name: 'AWS SysOps Administrator – Associate', vendor: 'AWS', days: 3, level: 'Intermediate' },
    { name: 'AZ-500: Azure Security Engineer Associate', vendor: 'Microsoft', days: 4, level: 'Advanced' },
  ],
  'Cybersecurity': [
    { name: 'Certified Ethical Hacker (CEH v13)', vendor: 'EC-Council', days: 5, level: 'Intermediate' },
    { name: 'CompTIA Security+ (SY0-701)', vendor: 'CompTIA', days: 5, level: 'Intermediate' },
    { name: 'CISSP Certification', vendor: 'ISC2', days: 5, level: 'Advanced' },
    { name: 'CCSP: Certified Cloud Security', vendor: 'ISC2', days: 5, level: 'Advanced' },
    { name: 'CompTIA CySA+', vendor: 'CompTIA', days: 5, level: 'Intermediate' },
    { name: 'CPENT: Certified Penetration Testing', vendor: 'EC-Council', days: 5, level: 'Advanced' },
    { name: 'SC-200: Microsoft Security Operations Analyst', vendor: 'Microsoft', days: 4, level: 'Advanced' },
    { name: 'CISM: Certified Information Security Manager', vendor: 'ISACA', days: 3, level: 'Advanced' },
    { name: 'CISA: Certified Information Systems Auditor', vendor: 'ISACA', days: 3, level: 'Advanced' },
    { name: 'Check Point CCSA R82', vendor: 'Check Point', days: 3, level: 'Intermediate' },
    { name: 'ISO 27001 Lead Implementer', vendor: 'PECB', days: 5, level: 'Advanced' },
    { name: 'CND: Certified Network Defender', vendor: 'EC-Council', days: 5, level: 'Intermediate' },
  ],
  'Networking': [
    { name: 'CCNP Enterprise Core (ENCOR)', vendor: 'Cisco', days: 5, level: 'Advanced' },
    { name: 'CCNA (200-301)', vendor: 'Cisco', days: 5, level: 'Beginner' },
    { name: 'CompTIA Network+', vendor: 'CompTIA', days: 5, level: 'Beginner' },
    { name: 'Cisco DevNet Associate', vendor: 'Cisco', days: 4, level: 'Intermediate' },
    { name: 'CCIE Enterprise Infrastructure', vendor: 'Cisco', days: 5, level: 'Advanced' },
    { name: 'CCNP Security', vendor: 'Cisco', days: 5, level: 'Advanced' },
    { name: 'CCNP Data Center', vendor: 'Cisco', days: 5, level: 'Advanced' },
    { name: 'CCST Networking', vendor: 'Cisco', days: 2, level: 'Beginner' },
    { name: 'Cisco SD-WAN Implementation', vendor: 'Cisco', days: 4, level: 'Advanced' },
    { name: 'Check Point SD-WAN Administration', vendor: 'Check Point', days: 3, level: 'Intermediate' },
    { name: 'CCIE Security', vendor: 'Cisco', days: 5, level: 'Advanced' },
    { name: 'Cisco Certified Support Technician (CCST)', vendor: 'Cisco', days: 2, level: 'Beginner' },
  ],
  'Project Management': [
    { name: 'Project Management Professional (PMP)', vendor: 'PMI', days: 3, level: 'Advanced' },
    { name: 'PRINCE2® Foundation & Practitioner', vendor: 'PeopleCert', days: 5, level: 'Intermediate' },
    { name: 'ITIL® 4 Foundation', vendor: 'PeopleCert', days: 3, level: 'Beginner' },
    { name: 'PMI-ACP: Agile Certified Practitioner', vendor: 'PMI', days: 3, level: 'Intermediate' },
    { name: 'CAPM: Certified Associate in PM', vendor: 'PMI', days: 3, level: 'Beginner' },
    { name: 'PMI-RMP: Risk Management Professional', vendor: 'PMI', days: 3, level: 'Advanced' },
    { name: 'PfMP: Portfolio Management Professional', vendor: 'PMI', days: 4, level: 'Advanced' },
    { name: 'DASM: Disciplined Agile Scrum Master', vendor: 'PMI', days: 2, level: 'Intermediate' },
    { name: 'PRINCE2 Agile', vendor: 'PeopleCert', days: 3, level: 'Intermediate' },
    { name: 'MSP®: Managing Successful Programmes', vendor: 'PeopleCert', days: 4, level: 'Advanced' },
    { name: 'M_o_R®: Management of Risk', vendor: 'PeopleCert', days: 3, level: 'Intermediate' },
    { name: 'AgileSHIFT®', vendor: 'PeopleCert', days: 1, level: 'Beginner' },
  ],
  'Data & AI': [
    { name: 'AI-102: Azure AI Engineer Associate', vendor: 'Microsoft', days: 4, level: 'Advanced' },
    { name: 'AWS Certified AI Practitioner', vendor: 'AWS', days: 3, level: 'Beginner' },
    { name: 'Google Professional Data Engineer', vendor: 'Google Cloud', days: 4, level: 'Advanced' },
    { name: 'PL-300: Power BI Data Analyst', vendor: 'Microsoft', days: 3, level: 'Intermediate' },
    { name: 'AWS Certified Machine Learning – Specialty', vendor: 'AWS', days: 4, level: 'Advanced' },
    { name: 'SAP BW/4HANA Data Modeling', vendor: 'SAP', days: 4, level: 'Advanced' },
    { name: 'DP-900: Azure Data Fundamentals', vendor: 'Microsoft', days: 1, level: 'Beginner' },
    { name: 'AWS Certified Data Engineer – Associate', vendor: 'AWS', days: 4, level: 'Intermediate' },
    { name: 'Oracle Autonomous Database Administration', vendor: 'Oracle', days: 3, level: 'Advanced' },
    { name: 'AI Fundamentals Certificate', vendor: 'ISACA', days: 1, level: 'Beginner' },
    { name: 'ISTQB Specialist AI Testing', vendor: 'ISTQB', days: 2, level: 'Advanced' },
    { name: 'ISO 42001 AI Management Lead Implementer', vendor: 'PECB', days: 4, level: 'Advanced' },
  ],
  'DevOps': [
    { name: 'AZ-400: Azure DevOps Engineer Expert', vendor: 'Microsoft', days: 5, level: 'Advanced' },
    { name: 'Certified Kubernetes Administrator (CKA)', vendor: 'Linux Foundation', days: 4, level: 'Advanced' },
    { name: 'AWS DevOps Engineer – Professional', vendor: 'AWS', days: 5, level: 'Advanced' },
    { name: 'Ansible Automation Platform', vendor: 'Red Hat', days: 4, level: 'Intermediate' },
    { name: 'Certified Kubernetes Application Developer (CKAD)', vendor: 'Linux Foundation', days: 3, level: 'Intermediate' },
    { name: 'CKS: Certified Kubernetes Security Specialist', vendor: 'Linux Foundation', days: 4, level: 'Advanced' },
    { name: 'OpenShift Administration', vendor: 'Red Hat', days: 4, level: 'Advanced' },
    { name: 'GitOps Fundamentals', vendor: 'Linux Foundation', days: 2, level: 'Intermediate' },
    { name: 'KCNA: Kubernetes and Cloud Native Associate', vendor: 'Linux Foundation', days: 2, level: 'Beginner' },
    { name: 'VMware Tanzu Kubernetes Operations', vendor: 'VMware', days: 4, level: 'Advanced' },
    { name: 'ServiceNow App Engine Studio', vendor: 'ServiceNow', days: 3, level: 'Intermediate' },
    { name: 'Prometheus Certified Associate (PCA)', vendor: 'Linux Foundation', days: 2, level: 'Intermediate' },
  ],
  'ERP Systems': [
    { name: 'SAP S/4HANA Functional Consultant', vendor: 'SAP', days: 5, level: 'Advanced' },
    { name: 'SAP BASIS Administration', vendor: 'SAP', days: 5, level: 'Intermediate' },
    { name: 'Oracle Database Administration', vendor: 'Oracle', days: 5, level: 'Intermediate' },
    { name: 'SAP ABAP Programming', vendor: 'SAP', days: 5, level: 'Intermediate' },
    { name: 'Oracle Cloud Infrastructure Architect Associate', vendor: 'Oracle', days: 4, level: 'Intermediate' },
    { name: 'SAP SuccessFactors Employee Central', vendor: 'SAP', days: 5, level: 'Advanced' },
    { name: 'SAP Ariba Procurement', vendor: 'SAP', days: 4, level: 'Intermediate' },
    { name: 'SAP Fiori System Administration', vendor: 'SAP', days: 3, level: 'Intermediate' },
    { name: 'SAP MM: Materials Management', vendor: 'SAP', days: 5, level: 'Intermediate' },
    { name: 'SAP FICO: Finance & Controlling', vendor: 'SAP', days: 5, level: 'Intermediate' },
    { name: 'Oracle Fusion Cloud Applications', vendor: 'Oracle', days: 5, level: 'Advanced' },
    { name: 'MySQL Database Administration', vendor: 'Oracle', days: 4, level: 'Intermediate' },
  ],
  'Linux & Open Source': [
    { name: 'RHCSA: Red Hat Certified System Administrator', vendor: 'Red Hat', days: 5, level: 'Intermediate' },
    { name: 'RHCE: Red Hat Certified Engineer', vendor: 'Red Hat', days: 5, level: 'Advanced' },
    { name: 'Linux Foundation Certified System Administrator', vendor: 'Linux Foundation', days: 5, level: 'Intermediate' },
    { name: 'OpenShift Administration', vendor: 'Red Hat', days: 4, level: 'Advanced' },
    { name: 'Certified Kubernetes Administrator (CKA)', vendor: 'Linux Foundation', days: 4, level: 'Advanced' },
    { name: 'RHCA: Red Hat Certified Architect', vendor: 'Red Hat', days: 5, level: 'Advanced' },
    { name: 'Red Hat Satellite Administration', vendor: 'Red Hat', days: 3, level: 'Advanced' },
    { name: 'Red Hat Virtualization Administration', vendor: 'Red Hat', days: 4, level: 'Intermediate' },
    { name: 'Introduction to Linux (LFS101)', vendor: 'Linux Foundation', days: 3, level: 'Beginner' },
    { name: 'OpenShift Application Development', vendor: 'Red Hat', days: 4, level: 'Intermediate' },
    { name: 'CompTIA Linux+', vendor: 'CompTIA', days: 5, level: 'Intermediate' },
    { name: 'Istio and Envoy Fundamentals', vendor: 'Linux Foundation', days: 2, level: 'Advanced' },
  ],
  'Power Platform': [
    { name: 'PL-900: Microsoft Power Platform Fundamentals', vendor: 'Microsoft', days: 1, level: 'Beginner' },
    { name: 'PL-100: Microsoft Power Platform App Maker', vendor: 'Microsoft', days: 5, level: 'Intermediate' },
    { name: 'PL-200: Power Platform Functional Consultant', vendor: 'Microsoft', days: 5, level: 'Intermediate' },
    { name: 'PL-300: Microsoft Power BI Data Analyst', vendor: 'Microsoft', days: 3, level: 'Intermediate' },
    { name: 'PL-400: Microsoft Power Platform Developer', vendor: 'Microsoft', days: 5, level: 'Advanced' },
    { name: 'PL-600: Power Platform Solution Architect', vendor: 'Microsoft', days: 5, level: 'Advanced' },
    { name: 'PL-7005: Create Automated Processes Using Copilot Studio', vendor: 'Microsoft', days: 2, level: 'Advanced' },
    { name: 'MS-4004: Empower Your Workforce with Copilot for M365', vendor: 'Microsoft', days: 2, level: 'Advanced' },
    { name: 'MS-4005: Craft Effective Prompts for Copilot for M365', vendor: 'Microsoft', days: 1, level: 'Beginner' },
    { name: 'AI-3018: Develop Generative AI Solutions with Azure OpenAI', vendor: 'Microsoft', days: 3, level: 'Advanced' },
    { name: 'MS-700: Managing Microsoft Teams', vendor: 'Microsoft', days: 4, level: 'Intermediate' },
    { name: 'MS-102: Microsoft 365 Administrator', vendor: 'Microsoft', days: 5, level: 'Advanced' },
  ],
}

/* ─── Enterprise Tech Browser data ──────────────────────────── */
type EntCourse = { name: string; examCode: string; category: string; price: string; days: number; hours: number; popular?: boolean }
const ENT_TECH_CATEGORIES = [
  { name: 'Azure',            count: 102, tag: 'Cloud Roles',    desc: "Master Microsoft's cloud platform — from core IaaS/PaaS fundamentals to advanced architecture, networking, security, and DevOps pipelines." },
  { name: 'AI & Copilot',     count: 102, tag: 'AI Roles',       desc: 'Build intelligent applications with Azure AI, Copilot Studio, and Microsoft AI services across the full development stack.' },
  { name: 'Power Platform',   count: 141, tag: 'Platform Roles', desc: 'Create low-code apps, automate workflows, and build analytics solutions with Power Apps, Power Automate, and Power BI.' },
  { name: 'Security',         count: 47,  tag: 'Security Roles', desc: 'Protect identities, data, and infrastructure with Microsoft security, compliance, and identity certifications.' },
  { name: 'Microsoft 365',    count: 310, tag: 'M365 Roles',     desc: 'Deploy, manage, and secure Microsoft 365 workloads including Teams, Exchange, SharePoint, and endpoint management.' },
  { name: 'Dynamics 365',     count: 109, tag: 'D365 Roles',     desc: 'Implement and configure Dynamics 365 business applications for sales, customer service, finance, and operations.' },
  { name: 'Data & Analytics', count: 118, tag: 'Data Roles',     desc: 'Design data platforms and analytics solutions with Azure Synapse, Power BI, and Microsoft Fabric.' },
  { name: 'DevOps & Dev',     count: 111, tag: 'DevOps Roles',   desc: 'Accelerate delivery with Azure DevOps, GitHub Actions, and cloud-native development tools and practices.' },
  { name: 'GitHub',           count: 4,   tag: 'GitHub Roles',   desc: 'Master version control, GitHub Actions CI/CD, GitHub Copilot, and enterprise GitHub administration.' },
  { name: 'Windows Server',   count: 74,  tag: 'Server Roles',   desc: 'Install, configure, and manage Windows Server infrastructure including Active Directory, DNS, DHCP, and virtualization.' },
]
const ENT_TECH_COURSES: Record<string, EntCourse[]> = {
  'Azure': [
    { name: 'Introduction to Microsoft Azure',                                     examCode: 'AZ-900T00-A',     category: 'FUNDAMENTALS', price: '$199',   days: 1, hours: 8 },
    { name: 'Getting Started With Cosmos DB NoSQL Development',                    examCode: 'DP-3015-A',       category: 'FUNDAMENTALS', price: '$199',   days: 1, hours: 8 },
    { name: 'GitHub Fundamentals - Administration Basics and Product Features',    examCode: 'GH-100',          category: 'FUNDAMENTALS', price: '$199',   days: 1, hours: 8 },
    { name: 'GitHub Essentials for Developers',                                    examCode: 'GitHub Essentia', category: 'FUNDAMENTALS', price: '$199',   days: 1, hours: 8 },
    { name: 'Microsoft Cloud Workshop: App Modernization',                         examCode: 'Microsoft Cloud', category: 'ASSOCIATE',    price: '$249',   days: 1, hours: 8, popular: true },
    { name: 'Microsoft Cloud Workshop: IoT and the Smart City',                    examCode: 'Microsoft Cloud', category: 'ASSOCIATE',    price: '$249',   days: 1, hours: 8 },
    { name: '55621A - Mastering GitHub Copilot for Developers',                    examCode: '55621A - Master', category: 'ASSOCIATE',    price: '$249',   days: 1, hours: 8 },
    { name: 'AZ 900 Exam Prep',                                                    examCode: 'AZ 900 Exam Pre', category: 'ASSOCIATE',    price: '$249',   days: 1, hours: 8 },
    { name: 'Deploy and Manage Containers Using Azure Kubernetes Service',         examCode: 'AZ-1001',         category: 'ASSOCIATE',    price: '$249',   days: 1, hours: 8 },
    { name: 'AZ-104T00-A: Microsoft Azure Administrator',                          examCode: 'AZ-104',          category: 'ASSOCIATE',    price: '$1,245', days: 5, hours: 8 },
    { name: 'AZ-204T00-A: Developing Solutions for Microsoft Azure',               examCode: 'AZ-204',          category: 'ASSOCIATE',    price: '$1,195', days: 5, hours: 8 },
    { name: 'AZ-140T00-A: Configuring and Operating Azure Virtual Desktop',        examCode: 'AZ-140',          category: 'ASSOCIATE',    price: '$995',   days: 4, hours: 8 },
    { name: 'AZ-305T00-A: Designing Microsoft Azure Infrastructure Solutions',     examCode: 'AZ-305',          category: 'EXPERT',       price: '$1,495', days: 5, hours: 8 },
    { name: 'AZ-400T00-A: Designing and Implementing Microsoft DevOps Solutions',  examCode: 'AZ-400',          category: 'EXPERT',       price: '$1,195', days: 5, hours: 8 },
  ],
  'AI & Copilot': [
    { name: 'AI-900: Microsoft Azure AI Fundamentals',                             examCode: 'AI-900',          category: 'FUNDAMENTALS', price: '$299',   days: 1, hours: 8 },
    { name: 'MS-4005: Craft Effective Prompts for Microsoft Copilot for M365',     examCode: 'MS-4005',         category: 'FUNDAMENTALS', price: '$199',   days: 1, hours: 8 },
    { name: 'AI-102T00-A: Designing and Implementing Azure AI Solutions',          examCode: 'AI-102',          category: 'ASSOCIATE',    price: '$995',   days: 4, hours: 8, popular: true },
    { name: 'MS-4004: Empower Your Workforce with Copilot for Microsoft 365',      examCode: 'MS-4004',         category: 'ASSOCIATE',    price: '$399',   days: 2, hours: 8 },
    { name: 'AI-3018T00-A: Develop Generative AI Solutions with Azure OpenAI',     examCode: 'AI-3018',         category: 'ASSOCIATE',    price: '$695',   days: 3, hours: 8 },
    { name: 'PL-7005: Create Automated Processes Using Copilot Studio',            examCode: 'PL-7005',         category: 'ASSOCIATE',    price: '$499',   days: 2, hours: 8 },
    { name: 'AI-050T00: Develop Generative AI Solutions with Azure OpenAI Service',examCode: 'AI-050',          category: 'EXPERT',       price: '$895',   days: 3, hours: 8 },
  ],
  'Power Platform': [
    { name: 'PL-900T00-A: Microsoft Power Platform Fundamentals',                  examCode: 'PL-900',          category: 'FUNDAMENTALS', price: '$299',   days: 1, hours: 8 },
    { name: 'PL-7001: Create and Manage Canvas Apps with Power Apps',              examCode: 'PL-7001',         category: 'FUNDAMENTALS', price: '$299',   days: 1, hours: 8, popular: true },
    { name: 'PL-200T00-A: Microsoft Power Platform Functional Consultant',         examCode: 'PL-200',          category: 'ASSOCIATE',    price: '$1,195', days: 5, hours: 8 },
    { name: 'PL-300T00-A: Microsoft Power BI Data Analyst',                        examCode: 'PL-300',          category: 'ASSOCIATE',    price: '$895',   days: 3, hours: 8 },
    { name: 'PL-400T00-A: Microsoft Power Platform Developer',                     examCode: 'PL-400',          category: 'ASSOCIATE',    price: '$1,195', days: 5, hours: 8 },
    { name: 'PL-600T00-A: Microsoft Power Platform Solution Architect',            examCode: 'PL-600',          category: 'EXPERT',       price: '$1,395', days: 5, hours: 8 },
  ],
  'Security': [
    { name: 'SC-900T00-A: Microsoft Security, Compliance, and Identity Fundamentals', examCode: 'SC-900',       category: 'FUNDAMENTALS', price: '$299',   days: 1, hours: 8, popular: true },
    { name: 'SC-200T00-A: Microsoft Security Operations Analyst',                  examCode: 'SC-200',          category: 'ASSOCIATE',    price: '$995',   days: 4, hours: 8 },
    { name: 'SC-300T00-A: Microsoft Identity and Access Administrator',            examCode: 'SC-300',          category: 'ASSOCIATE',    price: '$995',   days: 4, hours: 8 },
    { name: 'SC-400T00-A: Microsoft Information Protection Administrator',         examCode: 'SC-400',          category: 'ASSOCIATE',    price: '$995',   days: 4, hours: 8 },
    { name: 'AZ-500T00-A: Microsoft Azure Security Technologies',                  examCode: 'AZ-500',          category: 'ASSOCIATE',    price: '$995',   days: 4, hours: 8 },
    { name: 'SC-100T00-A: Microsoft Cybersecurity Architect',                      examCode: 'SC-100',          category: 'EXPERT',       price: '$1,495', days: 5, hours: 8 },
  ],
  'Microsoft 365': [
    { name: 'MS-900T01-A: Microsoft 365 Fundamentals',                             examCode: 'MS-900',          category: 'FUNDAMENTALS', price: '$299',   days: 1, hours: 8, popular: true },
    { name: 'MS-102T00-A: Microsoft 365 Administrator Essentials',                 examCode: 'MS-102',          category: 'ASSOCIATE',    price: '$1,195', days: 5, hours: 8 },
    { name: 'MD-102T00-A: Microsoft 365 Endpoint Administrator',                   examCode: 'MD-102',          category: 'ASSOCIATE',    price: '$1,195', days: 5, hours: 8 },
    { name: 'MS-700T00-A: Managing Microsoft Teams',                               examCode: 'MS-700',          category: 'ASSOCIATE',    price: '$895',   days: 3, hours: 8 },
    { name: 'MS-721T00-A: Collaboration Communications Systems Engineer',          examCode: 'MS-721',          category: 'ASSOCIATE',    price: '$1,195', days: 5, hours: 8 },
    { name: 'MS-203T00-A: Microsoft 365 Messaging Administrator',                  examCode: 'MS-203',          category: 'EXPERT',       price: '$1,195', days: 5, hours: 8 },
  ],
  'Dynamics 365': [
    { name: 'MB-910T00-A: Microsoft Dynamics 365 Fundamentals (CRM)',              examCode: 'MB-910',          category: 'FUNDAMENTALS', price: '$299',   days: 1, hours: 8, popular: true },
    { name: 'MB-920T00-A: Microsoft Dynamics 365 Fundamentals (ERP)',              examCode: 'MB-920',          category: 'FUNDAMENTALS', price: '$299',   days: 1, hours: 8 },
    { name: 'MB-210T01-A: Microsoft Dynamics 365 Sales Functional Consultant',     examCode: 'MB-210',          category: 'ASSOCIATE',    price: '$1,095', days: 4, hours: 8 },
    { name: 'MB-220T00-A: Microsoft Dynamics 365 Customer Insights - Journeys',    examCode: 'MB-220',          category: 'ASSOCIATE',    price: '$895',   days: 3, hours: 8 },
    { name: 'MB-300T00-A: Microsoft Dynamics 365: Core Finance and Operations',    examCode: 'MB-300',          category: 'ASSOCIATE',    price: '$1,195', days: 5, hours: 8 },
    { name: 'MB-500T00-A: Microsoft Dynamics 365 Finance and Operations Developer',examCode: 'MB-500',          category: 'EXPERT',       price: '$1,395', days: 5, hours: 8 },
  ],
  'Data & Analytics': [
    { name: 'DP-900T00-A: Microsoft Azure Data Fundamentals',                      examCode: 'DP-900',          category: 'FUNDAMENTALS', price: '$299',   days: 1, hours: 8, popular: true },
    { name: 'DP-203T00-A: Data Engineering on Microsoft Azure',                    examCode: 'DP-203',          category: 'ASSOCIATE',    price: '$995',   days: 4, hours: 8 },
    { name: 'DP-300T00-A: Administering Microsoft Azure SQL Solutions',            examCode: 'DP-300',          category: 'ASSOCIATE',    price: '$895',   days: 3, hours: 8 },
    { name: 'PL-300T00-A: Microsoft Power BI Data Analyst',                        examCode: 'PL-300',          category: 'ASSOCIATE',    price: '$895',   days: 3, hours: 8 },
    { name: 'DP-600T00-A: Implementing Analytics Solutions Using Microsoft Fabric', examCode: 'DP-600',         category: 'ASSOCIATE',    price: '$1,095', days: 4, hours: 8 },
    { name: 'DP-100T01-A: Designing and Implementing a Data Science Solution',     examCode: 'DP-100',          category: 'EXPERT',       price: '$1,195', days: 5, hours: 8 },
  ],
  'DevOps & Dev': [
    { name: 'AZ-2008: DevOps Foundations: The Core Principles and Practices',      examCode: 'AZ-2008',         category: 'FUNDAMENTALS', price: '$299',   days: 1, hours: 8 },
    { name: '40573: GitHub: Introduction to GitHub',                               examCode: 'GH-INTRO',        category: 'FUNDAMENTALS', price: '$199',   days: 1, hours: 8 },
    { name: 'AZ-400T00-A: Designing and Implementing Microsoft DevOps Solutions',  examCode: 'AZ-400',          category: 'ASSOCIATE',    price: '$1,195', days: 5, hours: 8, popular: true },
    { name: 'AZ-2009: Accelerate Developer Productivity with GitHub Copilot',      examCode: 'AZ-2009',         category: 'ASSOCIATE',    price: '$499',   days: 2, hours: 8 },
    { name: 'AZ-2003: Deploy Cloud-Native Apps Using Azure Container Apps',        examCode: 'AZ-2003',         category: 'ASSOCIATE',    price: '$695',   days: 3, hours: 8 },
    { name: 'AZ-204T00-A: Developing Solutions for Microsoft Azure',               examCode: 'AZ-204',          category: 'EXPERT',       price: '$1,195', days: 5, hours: 8 },
  ],
  'GitHub': [
    { name: 'GitHub Foundations',                                                  examCode: 'GH-Foundation',   category: 'FUNDAMENTALS', price: '$199',   days: 1, hours: 8 },
    { name: 'GitHub Actions: Automate Your Workflow',                              examCode: 'GH-Actions',      category: 'FUNDAMENTALS', price: '$299',   days: 1, hours: 8, popular: true },
    { name: 'GitHub Advanced Security',                                            examCode: 'GH-Security',     category: 'ASSOCIATE',    price: '$499',   days: 2, hours: 8 },
    { name: 'GitHub Administration',                                               examCode: 'GH-Admin',        category: 'ASSOCIATE',    price: '$499',   days: 2, hours: 8 },
  ],
  'Windows Server': [
    { name: '55348A: Introduction to PowerShell for IT Administrators',            examCode: '55348A',          category: 'FUNDAMENTALS', price: '$299',   days: 1, hours: 8 },
    { name: 'AZ-800T00-A: Administering Windows Server Hybrid Core Infrastructure',examCode: 'AZ-800',          category: 'ASSOCIATE',    price: '$995',   days: 4, hours: 8, popular: true },
    { name: 'AZ-801T00-A: Configuring Windows Server Hybrid Advanced Services',    examCode: 'AZ-801',          category: 'ASSOCIATE',    price: '$995',   days: 4, hours: 8 },
    { name: 'WS-011T00-A: Windows Server 2019 Administration',                     examCode: 'WS-011',          category: 'ASSOCIATE',    price: '$1,195', days: 5, hours: 8 },
    { name: '10969: Active Directory Services with Windows Server',                examCode: '10969',           category: 'ASSOCIATE',    price: '$895',   days: 4, hours: 8 },
    { name: '10970: Networking with Windows Server',                               examCode: '10970',           category: 'EXPERT',       price: '$895',   days: 4, hours: 8 },
  ],
}
const ENT_CATEGORY_COLORS: Record<string, string> = {
  FUNDAMENTALS: 'bg-[#dbeeff] text-[#0050c8]',
  ASSOCIATE:    'bg-[#d4f5e2] text-[#0a7a3e]',
  PROFESSIONAL: 'bg-[#fff0d0] text-[#9a5500]',
  EXPERT:       'bg-[#fff0d0] text-[#9a5500]',
}
function EntTechIcon({ name, active }: { name: string; active: boolean }) {
  const cls = active ? 'text-white' : 'text-koenig-blue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p: Record<string, any> = {
    'Azure':            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>,
    'AI & Copilot':     <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></>,
    'Power Platform':   <><rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}/><rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}/><rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.5 14v7M14 17.5h7"/></>,
    'Security':         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
    'Microsoft 365':    <><rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}/><rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}/><rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}/><rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}/></>,
    'Dynamics 365':     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>,
    'Data & Analytics': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>,
    'DevOps & Dev':     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>,
    'GitHub':           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20v-6m0 0V9a3 3 0 013-3h1a3 3 0 013 3v1M10 14H7a3 3 0 00-3 3v3m16-3a3 3 0 00-3-3h-3"/>,
    'Windows Server':   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>,
  }
  return (
    <svg className={`h-4 w-4 ${cls}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {p[name] ?? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>}
    </svg>
  )
}

/* ─── Footer column data ─────────────────────────────────────── */
const FOOTER_COLS = [
  { heading: 'Company', links: ['About us','Leadership','Contact Us','Webinars','Our Clientele','All Courses','Our Partners','Our Story','Testimonials','Our Awards'] },
  { heading: 'Learning Options', links: ['Explore All Learning Options','Live Online Training','1-on-1 Training','Classroom Training','Fly-me-a-Trainer (FMAT)','Flexi','Customized Training','Webinar as a Service','Techlabs','Learnova','AI Agent','Coding Using AI','AI Is a Beast','Free AI Career Compass'] },
  { heading: 'Resources', links: ['Technical Questions & Answers','Blog','Sitemap','Koenig Koshish','Qubits','Certificate Authenticator','Microsoft Products'] },
  { heading: 'Others', links: ['Environment Policy','Payment Methods','Terms of Service','Career','Freelancer Opportunities','Privacy Policy',"What's New",'Media Report'] },
]

const FOOTER_LINK_HREFS: Record<string, string> = {
  'Explore All Learning Options': '/learning-options',
  'Live Online Training': '/live-online-classroom',
  '1-on-1 Training': '/1-on-1-training',
  'Classroom Training': '/classroom-training',
  'Fly-me-a-Trainer (FMAT)': '/fly-me-a-trainer',
  'Flexi': '/flexi-training',
  'Customized Training': '/customised-training',
  'Webinar as a Service': '/webinar-service',
  'AI Agent': '/build/ai-agent',
  'Coding Using AI': '/build/vibe-coding',
  'AI Is a Beast': '/beast-ai-skilling',
  'Learnova': '/learnova',
  'Qubits': '/qubits',
  'Free AI Career Compass': '/career-compass',
  'Environment Policy': '/environment-policy',
  'Terms of Service': '/terms-of-service',
  'Payment Methods': '/terms-of-service?tab=payment',
  'Career': '/careers',
}

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

const AWARDS = [
  { vendorLogo: 'microsoft-cloud-t.png', awardImg: 'MS-Partner-of-the-year-2025-popup.webp',      title: 'Winner of Microsoft Training Services Partner of the Year Award', year: '2025' },
  { vendorLogo: 'microsoft-cloud-t.png', awardImg: 'Microsoft-FY2024-Superstar-Award.webp',       title: "Winner of Microsoft's ANZ Superstar Campaign",                    year: '2024' },
  { vendorLogo: 'microsoft-cloud-t.png', awardImg: 'Microsoft-Superstar-Award-2022.webp',         title: "Winner of Microsoft's Asia Superstar Campaign",                   year: '2022' },
  { vendorLogo: 'amazon-authorized.png', awardImg: 'Finalist–AWS-Partner-of-the-Year-2024.webp',  title: 'Finalist – AWS Partner of the Year',                               year: '2024' },
  { vendorLogo: 'EC-Council-logo.png',   awardImg: 'Winner-of-EC-Council-ATC-of-the-Year-Award-2024.webp', title: 'Winner of EC-Council ATC of the Year Award',             year: '2024' },
  { vendorLogo: 'Authorized PECB Certification Courses Training badge.png', awardImg: 'Winner-of-the-PECB-Titanium-Partner-Award-2024.webp', title: 'Winner of the PECB Titanium Partner Award', year: '2024' },
  { vendorLogo: 'GPTW',                  awardImg: 'Certified-as-great-place-to-work.webp',       title: 'Certified as a Great Place to Work',                               year: '2011–2025' },
  { vendorLogo: 'Redvendorlogo.png',     awardImg: 'RED-25.png',     title: 'Winner of RedHat Gold Partner of the Year – Non-Retail (GLS India)', year: '2025' },
  { vendorLogo: 'Redvendorlogo.png',     awardImg: 'RED-24.png',     title: 'Winner of RedHat Gold Partner of the Year – Non-Retail (GLS India)', year: '2024' },
  { vendorLogo: 'Redvendorlogo.png',     awardImg: 'Redhat-23.png',  title: 'Winner of the Red Hat Partner of the Year Award',                    year: '2023' },
]

function AwardsMarquee({ awards }: { awards: typeof AWARDS }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const posRef = useRef(0)
  const dragging = useRef(false)
  const lastX = useRef(0)
  const [cursor, setCursor] = useState<'grab' | 'grabbing'>('grab')

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const tick = () => {
      if (!dragging.current) posRef.current -= 0.8
      const halfWidth = track.scrollWidth / 2
      if (halfWidth > 0) {
        if (posRef.current <= -halfWidth) posRef.current += halfWidth
        if (posRef.current > 0) posRef.current -= halfWidth
      }
      track.style.transform = `translateX(${posRef.current}px)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current!)
  }, [])

  const startDrag = (x: number) => { dragging.current = true; lastX.current = x; setCursor('grabbing') }
  const moveDrag = (x: number) => {
    if (!dragging.current) return
    posRef.current += x - lastX.current
    lastX.current = x
  }
  const endDrag = () => { dragging.current = false; setCursor('grab') }

  const doubled = [...awards, ...awards]
  return (
    <div
      style={{ overflowX: 'clip', padding: '14px 0', cursor, userSelect: 'none', maskImage: 'linear-gradient(to right,transparent 0,black 80px,black calc(100% - 80px),transparent 100%)', WebkitMaskImage: 'linear-gradient(to right,transparent 0,black 80px,black calc(100% - 80px),transparent 100%)' }}
      onMouseDown={e => { startDrag(e.clientX); e.preventDefault() }}
      onMouseMove={e => moveDrag(e.clientX)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={e => startDrag(e.touches[0].clientX)}
      onTouchMove={e => { e.preventDefault(); moveDrag(e.touches[0].clientX) }}
      onTouchEnd={endDrag}
    >
      <div ref={trackRef} className="flex gap-5 px-5" style={{ width: 'max-content', willChange: 'transform' }}>
        {doubled.map((a, i) => (
          <div
            key={i}
            className="flex shrink-0 overflow-hidden rounded-2xl bg-white"
            style={{ width: '380px', height: '280px', border: '1.5px solid #CAEFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.07), 0 4px 16px rgba(6,148,209,0.10)' }}
          >
            <div className="flex w-[150px] shrink-0 items-center justify-center overflow-hidden" style={{ background: '#F0FAFF', borderRight: '1.5px solid #CAEFFF' }}>
              {a.awardImg && <img src={`/images/awards/${encodeURIComponent(a.awardImg)}`} alt="" className="h-[90%] w-[90%] object-contain" />}
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-3 py-5 text-center">
              <div className="h-16 flex items-center justify-center">
                {a.vendorLogo === 'GPTW'
                  ? <img src={`/images/awards/${encodeURIComponent(a.awardImg!)}`} alt="Great Place to Work" className="max-h-16 max-w-[140px] object-contain" />
                  : a.vendorLogo
                  ? <img src={`/images/partners/${encodeURIComponent(a.vendorLogo)}`} alt="" className="max-h-16 max-w-[140px] object-contain" />
                  : null}
              </div>
              <p className="text-sm sm:text-base font-bold leading-snug text-koenig-dark">{a.title}</p>
              <span className="rounded-full border border-[#CAEFFF] px-3 py-0.5 text-sm font-semibold text-koenig-muted">{a.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VendorMarqueeRow({ vendors, direction }: { vendors: typeof VENDORS_ROW1; direction: 1 | -1 }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const posRef = useRef(0)
  const dragging = useRef(false)
  const lastX = useRef(0)
  const [cursor, setCursor] = useState<'grab' | 'grabbing'>('grab')

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const tick = () => {
      if (!dragging.current) posRef.current -= 0.5 * direction
      const halfWidth = track.scrollWidth / 2
      if (halfWidth > 0) {
        if (posRef.current <= -halfWidth) posRef.current += halfWidth
        if (posRef.current > 0) posRef.current -= halfWidth
      }
      track.style.transform = `translateX(${posRef.current}px)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current!)
  }, [direction])

  const startDrag = (x: number) => { dragging.current = true; lastX.current = x; setCursor('grabbing') }
  const moveDrag = (x: number) => {
    if (!dragging.current) return
    posRef.current += x - lastX.current
    lastX.current = x
  }
  const endDrag = () => { dragging.current = false; setCursor('grab') }

  const doubled = [...vendors, ...vendors]
  return (
    <div
      className="relative overflow-x-hidden py-3"
      style={{ cursor, userSelect: 'none', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      onMouseDown={e => { startDrag(e.clientX); e.preventDefault() }}
      onMouseMove={e => moveDrag(e.clientX)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={e => startDrag(e.touches[0].clientX)}
      onTouchMove={e => moveDrag(e.touches[0].clientX)}
      onTouchEnd={endDrag}
    >
      <div ref={trackRef} className="flex gap-4 px-2" style={{ width: 'max-content', willChange: 'transform' }}>
        {doubled.map((v, i) => (
          <VendorCard key={i} v={v} />
        ))}
      </div>
    </div>
  )
}

export default function Design4Page() {
  const [tab, setTab] = useState('Top Courses')
  const lfSliderRef = useRef<HTMLDivElement | null>(null)
  const lfTrackRef = useRef<HTMLDivElement | null>(null)
  const lfBusyRef = useRef(false)
  const lfAutoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lfSliderHoverRef = useRef(false)
  const [lfStart, setLfStart] = useState(0)
  const [lfHoveredCard, setLfHoveredCard] = useState<number | null>(null)
  const [lfMobileSlide, setLfMobileSlide] = useState(0)
  const lfMobileDragStart = useRef<number | null>(null)
  const lfMobileAutoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const lfMobileSwipeStart = (x: number) => {
    lfMobileDragStart.current = x
    if (lfMobileAutoRef.current) clearInterval(lfMobileAutoRef.current)
  }
  const lfMobileSwipeEnd = (x: number) => {
    if (lfMobileDragStart.current === null) return
    const diff = lfMobileDragStart.current - x
    if (Math.abs(diff) > 40) setLfMobileSlide(s => diff > 0 ? Math.min(s + 1, lfAllFormats.length - 1) : Math.max(s - 1, 0))
    lfMobileDragStart.current = null
    lfMobileAutoRef.current = setInterval(() => setLfMobileSlide(s => (s + 1) % lfAllFormats.length), 3000)
  }

  const lfTriggerSlide = useCallback((forward: boolean) => {
    const track = lfTrackRef.current
    if (!track || lfBusyRef.current) return
    const card = track.children[0] as HTMLElement | undefined
    if (!card) return
    const amount = card.offsetWidth + 20
    lfBusyRef.current = true
    setLfHoveredCard(null)
    track.style.transition = 'none'
    track.style.transform = 'translateX(0px)'
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (lfSliderHoverRef.current) { lfBusyRef.current = false; return }
        track.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1)'
        track.style.transform = `translateX(${forward ? -amount : amount}px)`
      })
    })
  }, [])

  const lfHandleTransitionEnd = useCallback(() => {
    const track = lfTrackRef.current
    if (!track) return
    const forward = track.style.transform.startsWith('translateX(-')
    track.style.transition = 'none'
    track.style.transform = 'translateX(0px)'
    lfBusyRef.current = false
    setLfHoveredCard(null)
    setLfStart(prev => forward ? (prev + 1) % lfAllFormats.length : (prev - 1 + lfAllFormats.length) % lfAllFormats.length)
  }, [])

  useEffect(() => {
    lfAutoRef.current = setInterval(() => {
      if (lfSliderHoverRef.current) return
      lfTriggerSlide(true)
    }, 3000)
    return () => { if (lfAutoRef.current) clearInterval(lfAutoRef.current) }
  }, [lfTriggerSlide])

  useEffect(() => {
    lfMobileAutoRef.current = setInterval(() => {
      setLfMobileSlide(s => (s + 1) % lfAllFormats.length)
    }, 3000)
    return () => { if (lfMobileAutoRef.current) clearInterval(lfMobileAutoRef.current) }
  }, [])
  const [diffMobilePage, setDiffMobilePage] = useState(0)
  const diffDragStartX = useRef(0)
  const diffTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startDiffTimer = () => { diffTimerRef.current = setInterval(() => setDiffMobilePage(p => (p + 1) % 3), 3500) }
  const stopDiffTimer  = () => { if (diffTimerRef.current) { clearInterval(diffTimerRef.current); diffTimerRef.current = null } }
  useEffect(() => { startDiffTimer(); return stopDiffTimer }, [])
  const vendorScrollRef = useRef<HTMLDivElement>(null)
  const vendorDrag = useMarqueeDrag(vendorScrollRef, VENDOR_MARQUEE_DURATION)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)
  const [mobileAllCoursesOpen, setMobileAllCoursesOpen] = useState(false)
  const [mobileTechOpen, setMobileTechOpen] = useState(false)
  const [mobileLearningOpen, setMobileLearningOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const [mobileMegaVendor, setMobileMegaVendor] = useState(MEGA_MENU_VENDORS[0]?.name ?? '')
  const [mobileTechCategory, setMobileTechCategory] = useState(TOP_TECHNOLOGIES[0]?.name ?? '')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackTop, setShowBackTop] = useState(false)
  const [statsCount, setStatsCount] = useState(0)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterFocus, setNewsletterFocus] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMsg, setChatMsg] = useState('')
  const [heroSlide, setHeroSlide] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)
  const heroTouchX = useRef<number | null>(null)
  const logosScrollRef = useRef<HTMLDivElement | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [stepPaused, setStepPaused] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [orgTab, setOrgTab] = useState<'enterprise' | 'global'>('enterprise')
  const [hoveredCountry, setHoveredCountry] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [morphIdx, setMorphIdx] = useState(0)
  const [morphExiting, setMorphExiting] = useState(false)
  const [webinarStart, setWebinarStart] = useState(0)
  const [webinarMobilePage, setWebinarMobilePage] = useState(0)
  const webinarDragStartX = useRef(0)
  const [hiwMobilePage, setHiwMobilePage] = useState(0)
  const hiwDragStartX = useRef(0)
  const statsRef = useRef<HTMLDivElement>(null)
  const [navQuery, setNavQuery] = useState('')
  const [heroQuery, setHeroQuery] = useState('')
  const [heroFollowUpQuery, setHeroFollowUpQuery] = useState('')
  const [navResultsOpen, setNavResultsOpen] = useState(false)
  const [heroResultsOpen, setHeroResultsOpen] = useState(false)
  const [heroAiThinking, setHeroAiThinking] = useState(false)
  const [heroAiResults, setHeroAiResults] = useState<AiClassifyResult | null>(null)
  const [heroRefinedQuery, setHeroRefinedQuery] = useState<string | null>(null)
  const [heroAiLearnMoreOpen, setHeroAiLearnMoreOpen] = useState(false)
  const [heroCourseSlide, setHeroCourseSlide] = useState(0)
  const [heroCoursePage, setHeroCoursePage] = useState(0)
  const [heroDetailsEmail, setHeroDetailsEmail] = useState('')
  const heroAiDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navSearchRef = useRef<HTMLDivElement>(null)
  const heroSearchRef = useRef<HTMLDivElement>(null)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [megaMenuVendor, setMegaMenuVendor] = useState('Microsoft')
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const [techMenuOpen, setTechMenuOpen] = useState(false)
  const [techMenuCategory, setTechMenuCategory] = useState('Cloud Computing')
  const techMenuRef = useRef<HTMLDivElement>(null)
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false)
  const aboutMenuRef = useRef<HTMLDivElement>(null)
  const [learningMenuOpen, setLearningMenuOpen] = useState(false)
  const learningMenuRef = useRef<HTMLDivElement>(null)
  const learningTriggerRef = useRef<HTMLButtonElement>(null)
  const [learningDropPos, setLearningDropPos] = useState({ top: 0, left: 0 })
  const aboutTriggerRef = useRef<HTMLButtonElement>(null)
  const [aboutDropPos, setAboutDropPos] = useState({ top: 0, left: 0 })
  const [advisorCourseOpen, setAdvisorCourseOpen] = useState(false)
  const [advisorCourseQuery, setAdvisorCourseQuery] = useState('')
  const advisorCourseRef = useRef<HTMLDivElement>(null)
  const navMenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clearNavMenuCloseTimer = () => { if (navMenuCloseTimer.current) { clearTimeout(navMenuCloseTimer.current); navMenuCloseTimer.current = null } }
  const openNavMenu = (which: 'all' | 'tech' | 'learning' | 'about') => {
    clearNavMenuCloseTimer()
    setMegaMenuOpen(which === 'all')
    setTechMenuOpen(which === 'tech')
    setLearningMenuOpen(which === 'learning')
    setAboutMenuOpen(which === 'about')
    if (which === 'learning' && learningTriggerRef.current) {
      const r = learningTriggerRef.current.getBoundingClientRect()
      setLearningDropPos({ top: r.bottom + 8, left: r.left })
    }
    if (which === 'about' && aboutTriggerRef.current) {
      const r = aboutTriggerRef.current.getBoundingClientRect()
      setAboutDropPos({ top: r.bottom + 8, left: r.left })
    }
  }
  const scheduleNavMenuClose = () => {
    clearNavMenuCloseTimer()
    navMenuCloseTimer.current = setTimeout(() => {
      setMegaMenuOpen(false); setTechMenuOpen(false); setLearningMenuOpen(false); setAboutMenuOpen(false)
    }, 200)
  }

  const router = useRouter()

  function goSearch(q: string) {
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`)
    else router.push('/search')
  }

  function durWithHours(dur: string) {
    const days = parseInt(dur, 10)
    if (Number.isNaN(days)) return dur
    return `${dur} (${days * 8} hrs)`
  }

  // ── Hero AI search — thinking → advice/learn-more/courses flow, same engine as the vendor page ──
  useEffect(() => {
    if (!heroQuery.trim() || getContextChips(heroQuery).length === 0) { setHeroAiResults(null); setHeroAiThinking(false); setHeroAiLearnMoreOpen(false); return }
    setHeroAiThinking(true); setHeroAiResults(null); setHeroAiLearnMoreOpen(false); setHeroRefinedQuery(null)
    if (heroAiDebounceRef.current) clearTimeout(heroAiDebounceRef.current)
    heroAiDebounceRef.current = setTimeout(() => {
      setHeroAiThinking(false)
      setHeroAiResults(classifyAiQuery(heroQuery))
    }, 600)
    return () => { if (heroAiDebounceRef.current) clearTimeout(heroAiDebounceRef.current) }
  }, [heroQuery])

  useEffect(() => {
    if (!heroFollowUpQuery.trim() || getContextChips(heroFollowUpQuery).length === 0) return
    setHeroAiThinking(true); setHeroAiLearnMoreOpen(false)
    if (heroAiDebounceRef.current) clearTimeout(heroAiDebounceRef.current)
    heroAiDebounceRef.current = setTimeout(() => {
      setHeroAiThinking(false)
      setHeroAiResults(classifyAiQuery(heroFollowUpQuery))
      setHeroRefinedQuery(heroFollowUpQuery.trim())
    }, 600)
    return () => { if (heroAiDebounceRef.current) clearTimeout(heroAiDebounceRef.current) }
  }, [heroFollowUpQuery])

  useEffect(() => { setHeroCourseSlide(0); setHeroCoursePage(0) }, [heroAiResults])

  // ── Popup modals ──
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false)
  const [advisorTab, setAdvisorTab] = useState<'individual' | 'enterprise'>('individual')
  const [advisorForm, setAdvisorForm] = useState({ name: '', email: '', phone: '', course: '', trainees: '', hear: '', message: '' })
  const [advisorCaptcha, setAdvisorCaptcha] = useState(false)
  const [advisorSubmitted, setAdvisorSubmitted] = useState(false)
  const [enterpriseModalOpen, setEnterpriseModalOpen] = useState(false)
  const [enterpriseForm, setEnterpriseForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [enterpriseSubmitted, setEnterpriseSubmitted] = useState(false)
  const [entTech, setEntTech] = useState('Azure')
  const [entSearch, setEntSearch] = useState('')
  const [entLevelFilter, setEntLevelFilter] = useState('All')
  const [entSort, setEntSort] = useState('low-high')

  useEffect(() => {
    if (heroPaused) return
    const timer = setInterval(() => {
      setHeroSlide(s => (s + 1) % 5)
    }, 4000)
    return () => clearInterval(timer)
  }, [heroPaused])

  useEffect(() => {
    const cycle = setInterval(() => {
      setMorphExiting(true)
      setTimeout(() => {
        setMorphIdx(i => (i + 1) % MORPH_WORDS.length)
        setMorphExiting(false)
      }, 380)
    }, 2800)
    return () => clearInterval(cycle)
  }, [])

  useEffect(() => {
    if (stepPaused) return
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % 4)
    }, 2000)
    return () => clearInterval(timer)
  }, [stepPaused])

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 8)
      setShowBackTop(scrollTop > 600)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docH > 0 ? (scrollTop / docH) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // IntersectionObserver for scroll-triggered fade-ins (repeats on every scroll)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('io-visible')
        } else {
          e.target.classList.remove('io-visible')
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px 300px 0px' }
    )
    document.querySelectorAll('.io-fade').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Stats count-up — fires on page load AND every time section scrolls into view
  useEffect(() => {
    // Trigger immediately on page load (counts even if section is off-screen)
    const loadTimer = setTimeout(() => setStatsCount(k => k + 1), 400)
    if (!statsRef.current) return () => clearTimeout(loadTimer)
    // Re-trigger every time section enters the viewport (replay on scroll)
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsCount(k => k + 1) },
      { threshold: 0.2 }
    )
    obs.observe(statsRef.current)
    return () => { obs.disconnect(); clearTimeout(loadTimer) }
  }, [])



  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navSearchRef.current && !navSearchRef.current.contains(e.target as Node)) setNavResultsOpen(false)
      const insideHeroLearnMore = (e.target as HTMLElement).closest?.('[data-hero-learnmore-modal]')
      if (heroSearchRef.current && !heroSearchRef.current.contains(e.target as Node) && !insideHeroLearnMore) { setHeroResultsOpen(false); setHeroAiLearnMoreOpen(false) }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) setMegaMenuOpen(false)
      if (techMenuRef.current && !techMenuRef.current.contains(e.target as Node)) setTechMenuOpen(false)
      const insideAbout = aboutMenuRef.current?.contains(e.target as Node) || aboutTriggerRef.current?.contains(e.target as Node)
      if (!insideAbout) setAboutMenuOpen(false)
      const insideLearning = learningMenuRef.current?.contains(e.target as Node) || learningTriggerRef.current?.contains(e.target as Node)
      if (!insideLearning) setLearningMenuOpen(false)
      if (advisorCourseRef.current && !advisorCourseRef.current.contains(e.target as Node)) setAdvisorCourseOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const lfAllFormats = [
    { name: 'Classroom Training',       badge: 'Most Popular',   desc: 'Traditional, instructor-led learning in popular global destinations.',                                                                           bullets: ['Hands-on lab sessions','Face-to-face with expert instructors','Global training centers'],       btnLabel: 'Learn More →', cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)', img: '/images/home-banner/classroom-training.png',  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { name: 'Live Online Classes',      badge: 'Best Value',     desc: 'Flexible virtual learning with expert instructors from the comfort of your own space.',                                                          bullets: ['Live instructor-led sessions','Interactive Q&A & labs','Train from anywhere'],                  btnLabel: 'Learn More →', cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)', img: '/images/home-banner/Live-Online-Classes.png', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.277A1 1 0 0 1 21 8.649v6.7a1 1 0 0 1-1.447.894L15 14"/><rect x="1" y="6" width="14" height="12" rx="2"/></svg> },
    { name: 'Fly-Me-A-Trainer (FMAT)',  badge: 'Fastest',        desc: 'Flexible on-site learning for larger groups. Fly an expert to your location anywhere in the world.',                                            bullets: ['Expert trainer at your site','Custom schedule & pace','Any location worldwide'],                  btnLabel: 'Learn More →', cardBg: 'linear-gradient(145deg,#0c4a72,#093148)', img: '/images/home-banner/FMAT.png',               icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></svg> },
    { name: 'Flexi (Self-Paced)',       badge: 'Most Flexible',  desc: 'Self-paced learning with edited lectures, courseware, hands-on labs, and optional doubt clearing sessions.',                                    bullets: ['Edited video lectures','Hands-on labs & courseware','Optional doubt clearing sessions'],          btnLabel: 'Learn More →', cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)', img: '/images/home-banner/Flexi.png',              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { name: '1-on-1 Training',          badge: 'Most Focused',   desc: 'Dedicated instructor assigned exclusively to one employee for maximum focus.',                                                                    bullets: ['Personalised schedule','Instructor adapts to your pace','Max knowledge retention'],               btnLabel: 'Learn More →', cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)', img: '/images/home-banner/1on1.png',               icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { name: 'Customised Programmes',    badge: 'Bespoke',        desc: 'Bespoke curricula tailored to your tech stack, business processes, and learning goals.',                                                          bullets: ['Custom content & pace','Multi-vendor programme design','Aligned to business KPIs'],               btnLabel: 'Learn More →', cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)', img: '/images/home-banner/CT.png',                 icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
    { name: 'Webinar as a Service',     badge: 'New',            desc: 'Professionally hosted live webinars delivered to your global workforce at scale.',                                                               bullets: ['Expert-hosted live sessions','Interactive Q&A','Global audience delivery'],                       btnLabel: 'Learn More →', cardBg: 'linear-gradient(145deg,#0c4a72,#093148)', img: '/images/home-banner/Waas.png',               icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.277A1 1 0 0 1 21 8.649v6.7a1 1 0 0 1-1.447.894L15 14"/><rect x="1" y="6" width="14" height="12" rx="2"/></svg> },
    { name: 'Qubits',                   badge: 'Assessment',     desc: 'AI-powered assessments to benchmark skills, identify gaps, and measure training ROI.',                                                           bullets: ['AI-driven skill benchmarking','Gap analysis reports','Training ROI measurement'],                 btnLabel: 'Learn More →', cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)', img: '/images/home-banner/Qubits.png',             icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> },
  ]

  return (
    <div className="min-h-screen overflow-x-clip bg-white" style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>

      {/* ── Request More Info Modal ── */}
      {advisorModalOpen && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }} onClick={() => setAdvisorModalOpen(false)}>
          <div className="relative my-auto w-full max-w-2xl rounded-2xl p-6" style={{ background: 'radial-gradient(ellipse at 68% 48%, rgba(6,148,209,0.18) 0%, rgba(6,148,209,0.06) 38%, transparent 65%), #06111E', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button onClick={() => setAdvisorModalOpen(false)} className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20">✕</button>
            {advisorSubmitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'rgba(6,148,209,0.18)', border: '1px solid rgba(6,148,209,0.4)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Thank you!</h3>
                <p className="text-white/60">Our team will reach out within 1 business day.</p>
                <button onClick={() => { setAdvisorModalOpen(false); setAdvisorSubmitted(false); setAdvisorCaptcha(false); setAdvisorForm({ name: '', email: '', phone: '', course: '', trainees: '', hear: '', message: '' }) }} className="mt-6 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: '#0694D1' }}>Close</button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setAdvisorSubmitted(true) }}>
                <style>{`.adv-input{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;transition:border-color .2s}.adv-input:focus{border-color:#0694D1;outline:none}.adv-input::placeholder{color:rgba(255,255,255,0.3)}`}</style>

                {/* Header */}
                <div className="mb-5 text-center">
                  <span className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest" style={{ border: '1px solid rgba(6,148,209,0.55)', background: 'rgba(6,148,209,0.12)', color: '#38bdf8' }}>Let&apos;s Talk</span>
                  <h2 className="text-2xl font-bold text-white">Request for more <span style={{ color: '#38bdf8' }}>information</span></h2>
                  <p className="mt-1.5 text-sm text-white/50">Cloud &amp; AI Certification Training with Koenig Solutions</p>

                  <div className="mt-4 flex justify-center gap-3">
                    <a href="https://wa.me/918800971792" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      WhatsApp us
                    </a>
                    <a href="mailto:training@koenig-solutions.com" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      Email us
                    </a>
                  </div>
                </div>

                {/* Individual / Enterprise toggle */}
                <div className="mb-6 inline-flex w-full rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {(['individual', 'enterprise'] as const).map(t => (
                    <button key={t} type="button" onClick={() => setAdvisorTab(t)} className="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200"
                      style={advisorTab === t ? { background: 'linear-gradient(135deg, #0694D1, #076D9D)', color: '#fff', boxShadow: '0 2px 12px rgba(6,148,209,0.35)' } : { color: 'rgba(255,255,255,0.45)' }}>
                      <span className="inline-flex items-center justify-center gap-2">
                        {t === 'individual'
                          ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                          : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/><path d="M2 12h20"/></svg>}
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Row 1 */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-white/70">Full Name <span className="text-red-400">*</span></label>
                    <input required type="text" placeholder="John" value={advisorForm.name} onChange={e => setAdvisorForm(p => ({ ...p, name: e.target.value }))} className="adv-input w-full rounded-xl px-4 py-[11px] text-sm" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-white/70">Email <span className="text-red-400">*</span></label>
                    <input required type="email" placeholder="john@example.com" value={advisorForm.email} onChange={e => setAdvisorForm(p => ({ ...p, email: e.target.value }))} className="adv-input w-full rounded-xl px-4 py-[11px] text-sm" />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-white/70">Phone</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" value={advisorForm.phone} onChange={e => setAdvisorForm(p => ({ ...p, phone: e.target.value }))} className="adv-input w-full rounded-xl px-4 py-[11px] text-sm" />
                  </div>
                  {advisorTab === 'individual' ? (
                    <div ref={advisorCourseRef} className="relative">
                      <label className="mb-1.5 block text-sm font-semibold text-white/70">Select Course Name</label>
                      <button
                        type="button"
                        onClick={() => { setAdvisorCourseOpen(v => !v); setAdvisorCourseQuery('') }}
                        className="adv-input flex w-full items-center justify-between rounded-xl px-4 py-[11px] text-left text-sm"
                        style={{ color: advisorForm.course ? '#fff' : 'rgba(255,255,255,0.3)' }}
                      >
                        <span className="truncate">{advisorForm.course || 'Select Course Name'}</span>
                        <svg className={`ml-2 h-3.5 w-3.5 shrink-0 transition-transform ${advisorCourseOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </button>
                      {advisorCourseOpen && (
                        <div className="absolute left-0 top-full z-20 mt-1.5 w-full overflow-hidden rounded-xl" style={{ background: '#0a1c2e', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 12px 32px rgba(0,0,0,0.5)' }}>
                          <div className="p-2">
                            <input
                              autoFocus
                              type="text"
                              placeholder="Search courses..."
                              value={advisorCourseQuery}
                              onChange={e => setAdvisorCourseQuery(e.target.value)}
                              className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none placeholder-white/30"
                              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                            />
                          </div>
                          <div className="max-h-48 overflow-y-auto pb-1">
                            {ADVISOR_COURSES.filter(c => c !== 'Select Course Name' && c.toLowerCase().includes(advisorCourseQuery.toLowerCase())).map(c => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => { setAdvisorForm(p => ({ ...p, course: c })); setAdvisorCourseOpen(false) }}
                                className="block w-full px-3 py-2 text-left text-sm text-white/85 transition-colors hover:bg-[#0694D1] hover:text-white"
                              >
                                {c}
                              </button>
                            ))}
                            {ADVISOR_COURSES.filter(c => c !== 'Select Course Name' && c.toLowerCase().includes(advisorCourseQuery.toLowerCase())).length === 0 && (
                              <p className="px-3 py-2 text-sm text-white/40">No courses found</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-white/70">Number of Trainees</label>
                      <input type="number" placeholder="e.g. 25" value={advisorForm.trainees} onChange={e => setAdvisorForm(p => ({ ...p, trainees: e.target.value }))} className="adv-input w-full rounded-xl px-4 py-[11px] text-sm" />
                    </div>
                  )}
                </div>

                {/* How did you hear */}
                <div className="mt-3">
                  <label className="mb-1.5 block text-sm font-semibold text-white/70">How did you hear about us?</label>
                  <select value={advisorForm.hear} onChange={e => setAdvisorForm(p => ({ ...p, hear: e.target.value }))} className="adv-input w-full rounded-xl px-4 py-[11px] text-sm" style={{ color: advisorForm.hear ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                    {ADVISOR_HEAR_OPTIONS.map(o => <option key={o} value={o === 'Select Option' ? '' : o} style={{ background: '#06111E', color: '#fff' }}>{o}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div className="mt-3">
                  <label className="mb-1.5 block text-sm font-semibold text-white/70">Tell us more about your Training Request</label>
                  <textarea rows={3} placeholder="e.g. We need Azure certification for 50 engineers across 3 countries..." value={advisorForm.message} onChange={e => setAdvisorForm(p => ({ ...p, message: e.target.value }))} className="adv-input w-full resize-none rounded-xl px-4 py-3 text-sm" />
                </div>

                {/* reCAPTCHA */}
                <div className="mt-3 flex justify-center">
                  <div onClick={() => setAdvisorCaptcha(c => !c)} className="inline-flex cursor-pointer items-center gap-3 rounded px-3 py-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <input type="checkbox" readOnly checked={advisorCaptcha} className="h-4 w-4 cursor-pointer rounded" />
                    <span className="text-xs text-white/70">I&apos;m not a robot</span>
                    <div className="ml-2 flex flex-col items-center">
                      <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
                        <path d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z" fill="#4A90D9"/>
                        <path d="M32 14c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18z" fill="white"/>
                        <path d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" fill="#4A90D9"/>
                        <path d="M32 26a6 6 0 100 12 6 6 0 000-12z" fill="white"/>
                      </svg>
                      <span className="text-[8px] leading-tight text-white/35">reCAPTCHA</span>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={!advisorCaptcha} className="mt-6 w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.99] disabled:opacity-40" style={{ background: 'linear-gradient(135deg, #0694D1 0%, #076D9D 100%)', boxShadow: '0 0 28px rgba(6,148,209,0.40)' }}>
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* ── Request Enterprise Quote Modal ── */}
      {enterpriseModalOpen && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: 'rgba(4,15,26,0.75)', backdropFilter: 'blur(6px)' }} onClick={() => setEnterpriseModalOpen(false)}>
          <div className="relative w-full max-w-lg rounded-2xl p-8" style={{ background: 'linear-gradient(145deg,#0a2d45,#072238)', border: '1px solid rgba(6,148,209,0.30)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button onClick={() => setEnterpriseModalOpen(false)} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white">✕</button>
            {enterpriseSubmitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'rgba(6,148,209,0.18)', border: '1px solid rgba(6,148,209,0.4)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">Request Received!</h3>
                <p className="text-sm text-white/55">Our enterprise team will reach out within 1 business day.</p>
                <button onClick={() => { setEnterpriseModalOpen(false); setEnterpriseSubmitted(false); setEnterpriseForm({ name: '', company: '', email: '', phone: '', message: '' }) }} className="mt-6 rounded-xl px-6 py-2.5 text-sm font-semibold text-white" style={{ background: 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.4)' }}>Close</button>
              </div>
            ) : (
              <>
                <span className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-koenig-blue" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.3)' }}>Enterprise</span>
                <h2 className="mb-1 text-xl font-bold text-white">Request an Enterprise Quote</h2>
                <p className="mb-6 text-sm text-white/55">Get a customised training proposal for your organisation. No commitment required.</p>
                <form onSubmit={e => { e.preventDefault(); setEnterpriseSubmitted(true) }} className="space-y-4">
                  <style>{`.ent-modal-input{background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.10);transition:border-color .2s,box-shadow .2s}.ent-modal-input:focus{border-color:#0694D1;box-shadow:0 0 0 3px rgba(6,148,209,0.15);outline:none}.ent-modal-input::placeholder{color:rgba(255,255,255,0.25)}`}</style>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-white/65">Full Name</label>
                      <input required type="text" placeholder="John Smith" value={enterpriseForm.name} onChange={e => setEnterpriseForm(p => ({ ...p, name: e.target.value }))} className="ent-modal-input w-full rounded-xl px-4 py-3 text-sm text-white" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-white/65">Company Name</label>
                      <input required type="text" placeholder="Acme Corporation" value={enterpriseForm.company} onChange={e => setEnterpriseForm(p => ({ ...p, company: e.target.value }))} className="ent-modal-input w-full rounded-xl px-4 py-3 text-sm text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-white/65">Work Email</label>
                      <input required type="email" placeholder="john@acme.com" value={enterpriseForm.email} onChange={e => setEnterpriseForm(p => ({ ...p, email: e.target.value }))} className="ent-modal-input w-full rounded-xl px-4 py-3 text-sm text-white" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-white/65">Phone Number</label>
                      <input type="tel" placeholder="+1 (555) 000-0000" value={enterpriseForm.phone} onChange={e => setEnterpriseForm(p => ({ ...p, phone: e.target.value }))} className="ent-modal-input w-full rounded-xl px-4 py-3 text-sm text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-white/65">Training Needs</label>
                    <textarea required rows={3} placeholder="e.g. We need Azure certification for 50 engineers across 3 countries..." value={enterpriseForm.message} onChange={e => setEnterpriseForm(p => ({ ...p, message: e.target.value }))} className="ent-modal-input w-full resize-none rounded-xl px-4 py-3 text-sm text-white" />
                  </div>
                  <button type="submit" className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', boxShadow: '0 4px 20px rgba(6,148,209,0.40)' }}>
                    Submit
                  </button>
                  <p className="text-center text-xs text-white/30">No commitment required · Response within 24 hours</p>
                </form>
              </>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* ── Global styles & keyframes ──────────────────────────── */}
      <style>{`
        /* ── Testimonial card fade-up ── */
        @keyframes cardFadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }

        /* ── Morphing hero word ── */
        @keyframes morphWordIn  { from { opacity:0; transform:translateY(14px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes morphWordOut { from { opacity:1; transform:translateY(0);     } to { opacity:0; transform:translateY(-14px); } }
        .morph-word-in  { animation: morphWordIn  0.52s cubic-bezier(0.22,1,0.36,1) both; }
        .morph-word-out { animation: morphWordOut 0.34s ease-in both; }

        /* Scroll-triggered fade-in-up — visible immediately by default so content never waits on JS/IntersectionObserver to appear; adds a subtle lift only once actually revealed */
        .io-fade { opacity: 1; transform: translateY(0); transition: opacity 0.18s ease-out, transform 0.18s ease-out; }
        .io-fade.io-visible { opacity: 1; transform: translateY(0); }
        .io-fade.delay-1 { transition-delay: 0.03s; }
        .io-fade.delay-2 { transition-delay: 0.06s; }
        .io-fade.delay-3 { transition-delay: 0.09s; }
        .io-fade.delay-4 { transition-delay: 0.12s; }
        .io-fade.delay-5 { transition-delay: 0.15s; }
        .io-fade.delay-6 { transition-delay: 0.18s; }

        /* Infinite vendor marquee */
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 70s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }

        /* Hero blobs */
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.95)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-35px,25px) scale(1.08)} 66%{transform:translate(25px,-15px) scale(0.92)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,40px) scale(1.05)} 66%{transform:translate(-30px,-20px) scale(1.1)} }
        .blob1 { animation: blob1 12s ease-in-out infinite; }
        .blob2 { animation: blob2 15s ease-in-out infinite; }
        .blob3 { animation: blob3 18s ease-in-out infinite; }

        /* Dot particle grid */
        .dot-grid { background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 24px 24px; }

        /* Progress bar width animation */
        .stat-bar { transition: width 1.8s cubic-bezier(0.22,1,0.36,1); }

        /* Footer link slide-underline */
        .footer-link { position: relative; display: inline-block; }
        .footer-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #ffffff; transition: width 0.25s ease; }
        .footer-link:hover::after { width: 100%; }

        /* Newsletter button arrow */
        .nl-btn .arrow { display: inline-block; transition: transform 0.25s ease; }
        .nl-btn:hover .arrow { transform: translateX(5px); }

        /* Pointer cursor on all interactive elements */
        a, button, [role="button"], select, label[for], input[type="checkbox"], input[type="radio"], input[type="submit"] { cursor: pointer !important; }

        /* Award hover glow */
        .award-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .award-card:hover { transform: scale(1.06); box-shadow: 0 0 28px rgba(7,109,157,0.35); }

        /* Learning card slide-up reveal */
        .lf-card { overflow: hidden; }
        .lf-reveal { transform: translateY(100%); transition: transform 0.35s cubic-bezier(0.22,1,0.36,1); }
        .lf-card:hover .lf-reveal { transform: translateY(0); }

        /* WhatsApp pulse ring */
        @keyframes wa-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.5)} 50%{box-shadow:0 0 0 12px rgba(37,211,102,0)} }
        .wa-btn { animation: wa-pulse 2.5s ease-in-out infinite; }

        /* Tab content slide */
        @keyframes tabSlide { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0)} }
        .tab-enter { animation: tabSlide 0.3s ease both; }

        /* Testimonial transition */
        @keyframes testimIn { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        .testim-enter { animation: testimIn 0.45s ease both; }

        /* Chatbot popup scale-in */
        @keyframes chatIn { from{opacity:0;transform:scale(0.82) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes chatOut { from{opacity:1;transform:scale(1) translateY(0)} to{opacity:0;transform:scale(0.82) translateY(12px)} }
        .chat-enter { animation: chatIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both; }
        .chat-exit  { animation: chatOut 0.2s ease both; }

        /* Chatbot button pulse ring */
        @keyframes chatPulse { 0%,100%{box-shadow:0 0 0 0 rgba(7,109,157,0.55)} 60%{box-shadow:0 0 0 14px rgba(7,109,157,0)} }
        .chat-pulse { animation: chatPulse 2.4s ease-in-out infinite; }

        /* Chat tooltip */
        .chat-tooltip { opacity:0; pointer-events:none; transition:opacity 0.2s ease; }
        .chat-btn-wrap:hover .chat-tooltip { opacity:1; }

        /* Stat dividers — only visible on 5-col (lg) layout */
        @media (min-width: 1024px) { .stat-item:not(:last-child) { border-right: 1px solid #B9DEFF; } }

        /* ── Awards marquee ── */
        @keyframes marqueeScroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .marquee-track { display:flex; width:max-content; animation: marqueeScroll 60s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-wrap { overflow:hidden; mask-image: linear-gradient(to right,transparent 0,black 80px,black calc(100% - 80px),transparent 100%); -webkit-mask-image: linear-gradient(to right,transparent 0,black 80px,black calc(100% - 80px),transparent 100%); }

        /* ── How It Works section animations ── */
        @keyframes hiwFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .hiw-step { opacity:0; animation: hiwFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .hiw-step.io-visible { opacity:1; }

        @keyframes hiwPulse { 0%{box-shadow:0 0 0 0 rgba(7,109,157,0.5)} 70%{box-shadow:0 0 0 18px rgba(7,109,157,0)} 100%{box-shadow:0 0 0 0 rgba(7,109,157,0)} }
        .hiw-pulse-ring { animation: hiwPulse 1.8s ease-out infinite; border: 2px solid rgba(7,109,157,0.4); }

        .hiw-outline-btn:hover { background: #076D9D !important; color: white !important; }

        /* ── Differentiators section animations ── */
        @keyframes diffOrb1 { 0%,100%{transform:translate(-50%,0) scale(1)} 50%{transform:translate(-50%,-35px) scale(1.1)} }
        @keyframes diffOrb2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(25px,30px) scale(1.08)} }
        .diff-orb1 { animation: diffOrb1 11s ease-in-out infinite; }
        .diff-orb2 { animation: diffOrb2 14s ease-in-out infinite; }

        @keyframes diffIconGlow { 0%,100%{box-shadow:0 0 0 0 rgba(6,148,209,0)} 50%{box-shadow:0 0 14px 3px rgba(6,148,209,0.4)} }
        .diff-icon { animation: diffIconGlow 3s ease-in-out infinite; }

        @keyframes diffShimmer { 0%{transform:translateX(-110%) skewX(-18deg)} 100%{transform:translateX(220%) skewX(-18deg)} }
        .diff-banner { position:relative; overflow:hidden; }
        .diff-banner::after { content:''; position:absolute; top:0; left:0; height:100%; width:40%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent); animation:diffShimmer 4s ease-in-out infinite; pointer-events:none; border-radius:inherit; }

        .diff-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .diff-card:hover { transform: translateY(-5px); box-shadow: 0 12px 36px rgba(6,148,209,0.18), 0 0 0 1px rgba(6,148,209,0.45); }

        @keyframes diffStatPop { 0%{opacity:0;transform:scale(0.5) translateY(6px)} 70%{transform:scale(1.12)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        .diff-stat { animation: diffStatPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }
        .diff-stat.d1 { animation-delay: 0.15s; }
        .diff-stat.d2 { animation-delay: 0.28s; }
        .diff-stat.d3 { animation-delay: 0.41s; }

        @keyframes diffCardIn { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        .diff-card-in { opacity:0; }
        .diff-card-in.io-visible { animation: diffCardIn 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .diff-card-in.io-visible.d1 { animation-delay: 0.05s; }
        .diff-card-in.io-visible.d2 { animation-delay: 0.13s; }
        .diff-card-in.io-visible.d3 { animation-delay: 0.21s; }
        .diff-card-in.io-visible.d4 { animation-delay: 0.29s; }
        .diff-card-in.io-visible.d5 { animation-delay: 0.37s; }

        /* Mobile overflow guard */
        @media (max-width: 480px) {
          .blob1, .blob2, .blob3 { animation: none !important; }
        }
        /* Touch — always show flip card content */
        @media (hover: none) {
          .lf-card .lf-reveal { transform: translateY(0) !important; }
        }
      `}</style>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 z-[200] h-[3px] transition-none" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg,#076D9D,#0694d1,#38bdf8)' }} />

      {/* ════════════════════════════════════════════════════════
           NAVBAR — exact Koenig Solutions match
      ════════════════════════════════════════════════════════ */}

      {/* Contact bar */}
      <div className="block px-4 md:px-8 lg:px-[50px]" style={{ background: '#061624', borderBottom: '1px solid rgba(6,148,209,0.18)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-3 text-[15px] text-white/75">
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://wa.me/919840722417" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold transition-colors hover:text-white" style={{ color: '#25D366' }}>
              <svg className="h-5 w-5 shrink-0" style={{ color: '#25D366' }} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.843L0 24l6.305-1.654A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5.007-1.371l-.359-.214-3.742.981.999-3.65-.234-.375A9.818 9.818 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>
              +91-984-072-2417 <span className="ml-0.5 text-sm font-normal" style={{ color: 'rgba(37,211,102,0.55)' }}>(Chat Only)</span>
            </a>
            <span className="hidden sm:inline text-white/15">|</span>
            <a href="mailto:info@koenig-solutions.com" className="hidden sm:flex items-center gap-1.5 transition-colors hover:text-white/80">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              info@koenig-solutions.com
            </a>
          </div>
          {/* Right — Login */}
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
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`relative z-50 px-4 md:px-8 lg:px-[50px] ${scrolled ? 'shadow-lg shadow-black/30' : ''}`}
        style={{ background: 'rgba(6,17,30,0.94)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        onClick={e => { if ((e.target as HTMLElement).closest('[data-dropdown]') === null) setOpenDropdown(null) }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 lg:gap-6 py-2 lg:py-3">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div style={{ background: '#ffffff', borderRadius: '6px', padding: '8px' }}>
              <Image src="/images/koenig-logo.svg" alt="Koenig Solutions" width={120} height={32} className="h-7 w-auto lg:h-8" />
            </div>
          </Link>

          {/* Mobile All Courses button — visible only on mobile, sits next to logo */}
          <button
            onClick={() => { setMobileAllCoursesOpen(v => !v); setMobileOpen(false); }}
            className="flex lg:hidden items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-sm font-semibold transition-all shrink-0 ml-3"
            style={{ color: '#ffffff', background: mobileAllCoursesOpen ? '#076D9D' : '#0694D1', border: 'none' }}
            aria-label="All Courses"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            <span className="whitespace-nowrap">All Courses</span>
            <svg className={`h-3 w-3 transition-transform ${mobileAllCoursesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-4 lg:flex">
            {/* Glassmorphism pill nav group — All Courses + nav links */}
            <div
              className="flex items-center"
              style={{ background: 'linear-gradient(to right, rgba(6,148,209,0.04) 0%, rgba(255,255,255,0.01) 100%)', backdropFilter: 'blur(24px) saturate(200%)', WebkitBackdropFilter: 'blur(24px) saturate(200%)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '50px', padding: '4px', boxShadow: '0 0 20px rgba(6,148,209,0.2), 0 0 40px rgba(6,148,209,0.08), 0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)' }}
              onMouseLeave={scheduleNavMenuClose}
            >
              {/* All Courses */}
              <button
                onMouseEnter={() => openNavMenu('all')}
                onClick={() => setMegaMenuOpen(v => !v)}
                className="flex items-center whitespace-nowrap px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 rounded-[40px]"
                style={{ background: megaMenuOpen ? '#076D9D' : '#0694D1', gap: '8px' }}
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
                All Courses
                <svg className="h-3 w-3 opacity-70 -ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              {/* Nav links */}
              <a
                href="#"
                onMouseEnter={() => openNavMenu('tech')}
                onClick={(e) => { e.preventDefault(); setTechMenuOpen(v => !v); setMegaMenuOpen(false); setAboutMenuOpen(false); setLearningMenuOpen(false); }}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                style={{ color: techMenuOpen ? '#38bdf8' : '#ffffff', background: techMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
              >
                Technologies
                <svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </a>

              {/* Learning Options — portal approach to escape nav-pill stacking context */}
              <button
                type="button"
                ref={learningTriggerRef}
                onMouseEnter={() => openNavMenu('learning')}
                onClick={() => {
                  if (learningTriggerRef.current) {
                    const r = learningTriggerRef.current.getBoundingClientRect()
                    setLearningDropPos({ top: r.bottom + 8, left: r.left })
                  }
                  setLearningMenuOpen(v => !v); setAboutMenuOpen(false); setTechMenuOpen(false); setMegaMenuOpen(false)
                }}
                className="flex items-center gap-1 whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                style={{ color: learningMenuOpen ? '#38bdf8' : '#ffffff', background: learningMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent', border: 'none', cursor: 'pointer' }}
              >
                Learning Options
                <svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>

              {/* About — portal approach to escape nav-pill stacking context */}
              <button
                type="button"
                ref={aboutTriggerRef}
                onMouseEnter={() => openNavMenu('about')}
                onClick={() => {
                  if (aboutTriggerRef.current) {
                    const r = aboutTriggerRef.current.getBoundingClientRect()
                    setAboutDropPos({ top: r.bottom + 8, left: r.left })
                  }
                  setAboutMenuOpen(v => !v); setTechMenuOpen(false); setMegaMenuOpen(false); setLearningMenuOpen(false)
                }}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                style={{ color: aboutMenuOpen ? '#38bdf8' : '#ffffff', background: aboutMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent', border: 'none', cursor: 'pointer' }}
              >
                About
                <svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>

              <a
                href="/contact"
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                style={{ color: '#ffffff', background: 'transparent' }}
                onMouseEnter={e => { clearNavMenuCloseTimer(); setMegaMenuOpen(false); setTechMenuOpen(false); setLearningMenuOpen(false); setAboutMenuOpen(false); e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(6,148,209,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'transparent'; }}
              >
                Contact
              </a>
            </div>
          </nav>

          {/* Right — search + hamburger */}
          <div className="ml-auto flex items-center gap-1">
            {/* Individual / Enterprise toggle */}
            <div className="hidden lg:flex rounded-xl p-0.5" style={{ background: 'rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.30)' }}>
              <span className="rounded-lg px-3 py-1.5 text-sm font-normal text-white" style={{ background: '#0694D1', boxShadow: '0 0 10px rgba(6,148,209,0.40)' }}>
                Individual
              </span>
              <Link
                href="/enterprise"
                className="rounded-lg px-3 py-1.5 text-sm font-normal transition-all"
                style={{ color: 'rgba(255,255,255,0.55)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#38bdf8'; (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                Enterprise
              </Link>
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
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); goSearch(navQuery) } }}
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
                      <div key={i} onClick={() => goSearch(c.name)} className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50 last:border-0">
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-1">
                            {(c as { category?: string }).category === 'NEW' && (
                              <span className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-2 py-0.5 text-center text-[9px] font-normal uppercase tracking-wide text-white" style={{ background: 'linear-gradient(135deg,#10b981,#34d399)' }}>New</span>
                            )}
                            {c.hot && (
                              <span className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-2 py-0.5 text-center text-[9px] font-medium uppercase tracking-wide" style={{ background: 'rgba(6,148,209,0.1)', color: '#0694D1' }}>
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="truncate text-sm font-medium text-gray-800">{c.name}</p>
                          <p className="mt-0.5 text-xs text-gray-500">{c.vendor} · {c.days} days · {c.price}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          {(() => {
                            const cat = (c as { category?: string }).category
                            const key = cat === 'FUNDAMENTALS' ? 'fund' : cat === 'ASSOCIATE' ? 'assoc' : (cat === 'EXPERT' || c.level === 'Advanced') ? 'expert' : null
                            const lightBadge: Record<string, string> = { fund: 'bg-[#0694d1]/10 text-[#0694D1]', assoc: 'bg-[#076d9d]/15 text-[#076D9D]', expert: 'bg-[#093148]/10 text-[#093148]' }
                            return key && (
                              <span className={`inline-flex shrink-0 items-center justify-center rounded-full px-2 py-0.5 text-center text-[9px] font-medium uppercase tracking-wide whitespace-nowrap ${lightBadge[key]}`}>
                                {SCHEDULE_LEVEL_LABEL[key]}
                              </span>
                            )
                          })()}
                        </div>
                      </div>
                    )) : <div className="px-4 py-3 text-sm text-gray-500">No courses found for "{navQuery}"</div>
                  })()}
                  <div onClick={() => goSearch(navQuery)} className="flex cursor-pointer items-center justify-center gap-1 border-t border-gray-100 px-4 py-2.5 text-xs font-semibold text-[#0694d1] hover:bg-gray-50">
                    View all results →
                  </div>
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
              onClick={() => { setMobileOpen(v => !v); setMobileAllCoursesOpen(false); }}
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
          <div className="-mx-4 relative lg:hidden px-4 pb-3" style={{ background: 'rgba(6,17,30,0.98)' }}>
            <div className="flex items-center gap-2 rounded-xl border px-3 py-2" style={{ background: 'rgba(6,148,209,0.10)', borderColor: 'rgba(6,148,209,0.4)' }}>
              <svg className="h-4 w-4 shrink-0 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input
                ref={mobileSearchInputRef}
                type="text"
                value={navQuery}
                onChange={e => { setNavQuery(e.target.value); setNavResultsOpen(true); }}
                onFocus={() => setNavResultsOpen(true)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); goSearch(navQuery) } }}
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
              <div className="absolute left-5 right-5 top-full z-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
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

        {/* Mobile All Courses panel — shown when All Courses nav button is tapped */}
        {mobileAllCoursesOpen && (
          <div className="-mx-4 border-t lg:hidden" style={{ background: '#061624', borderColor: 'rgba(6,148,209,0.2)', maxHeight: '70vh', overflowY: 'auto' }}>
            <div className="px-4 py-3">
              <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(6,148,209,0.06)', border: '1px solid rgba(6,148,209,0.15)' }}>
                {/* Vendor tabs */}
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
                      {v.name}
                    </button>
                  ))}
                </div>
                {/* Courses for selected vendor */}
                <div className="p-3 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(6,148,209,0.8)' }}>
                    {MEGA_MENU_VENDORS.find(v => v.name === mobileMegaVendor)?.courses} courses available
                  </p>
                  {(MEGA_MENU_COURSES[mobileMegaVendor] ?? []).map((c, i) => (
                    <a key={i} href={COURSE_HREFS[c.name] ?? '#'} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      <span>{c.name}</span>
                      <span className="text-xs" style={{ color: 'rgba(6,148,209,0.8)' }}>{c.days}d</span>
                    </a>
                  ))}
                  <a href={VENDOR_HREFS[mobileMegaVendor] ?? '#'} className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: '#0694D1' }}>
                    Browse All {mobileMegaVendor} Courses →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="-mx-4 border-t lg:hidden" style={{ background: '#061624', borderColor: 'rgba(6,148,209,0.2)', maxHeight: '80vh', overflowY: 'auto' }}>
            <div className="px-4 py-3 space-y-1">

              {/* Individual / Enterprise toggle */}
              <div className="mb-2 flex rounded-xl p-0.5" style={{ background: 'rgba(6,148,209,0.10)', border: '1px solid rgba(6,148,209,0.30)' }}>
                <span className="flex-1 rounded-lg px-3 py-2 text-center text-sm font-normal text-white" style={{ background: '#0694D1', boxShadow: '0 0 10px rgba(6,148,209,0.40)' }}>Individual</span>
                <Link href="/enterprise" className="flex-1 rounded-lg px-3 py-2 text-center text-sm font-normal transition-all" style={{ color: 'rgba(255,255,255,0.55)' }}>Enterprise</Link>
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
                    {/* Tech category tabs */}
                    <div className="flex overflow-x-auto gap-1 p-2 border-b" style={{ borderColor: 'rgba(6,148,209,0.15)' }}>
                      {TOP_TECHNOLOGIES.map(t => (
                        <button
                          key={t.name}
                          onClick={() => { if (TECH_HREFS[t.name]) { router.push(TECH_HREFS[t.name]); setMobileTechOpen(false); setMobileOpen(false) } else { setMobileTechCategory(t.name) } }}
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
                    {/* Courses for selected tech */}
                    <div className="p-3 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(6,148,209,0.8)' }}>
                        {TOP_TECHNOLOGIES.find(t => t.name === mobileTechCategory)?.count} courses · Partners: {TOP_TECHNOLOGIES.find(t => t.name === mobileTechCategory)?.partners.join(', ')}
                      </p>
                      {(TECH_MENU_COURSES[mobileTechCategory] ?? []).map((course, i) => (
                        <a key={i} href={COURSE_HREFS[course.name] ?? '#'} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.85)' }}>
                          <span>{course.name}</span>
                          <span className="text-xs" style={{ color: 'rgba(6,148,209,0.8)' }}>{course.days}d</span>
                        </a>
                      ))}
                      <a
                        href={TECH_HREFS[mobileTechCategory] ?? '#'}
                        onClick={() => setMobileAllCoursesOpen(false)}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all"
                        style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: '#fff' }}
                      >
                        View All {mobileTechCategory} Courses
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
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
                      <a key={link.label} href={link.href} className="block px-5 py-2.5 text-sm transition-colors hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.8)' }}>{link.label}</a>
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
                      <a key={link.label} href={link.href} className="block px-5 py-2.5 text-sm transition-colors hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.8)' }}>{link.label}</a>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact */}
              <a href="/contact" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5">Contact</a>

              {/* Bottom actions */}
              <div className="flex gap-2 pt-2 pb-1">
                <a href="https://mykoenig.com" target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg border border-white/30 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10">Login</a>
              </div>

            </div>
          </div>
        )}
        {/* ── All Courses Mega Menu ── */}
        {megaMenuOpen && (
          <div
            ref={megaMenuRef}
            className="absolute inset-x-0 top-full z-[200] mx-auto flex max-w-7xl overflow-hidden rounded-b-2xl"
            style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderTop: 'none', boxShadow: '0 24px 60px rgba(0,0,0,0.18)', maxHeight: '520px' }}
            onMouseEnter={clearNavMenuCloseTimer}
            onMouseLeave={scheduleNavMenuClose}
          >
            {/* Left — vendor list */}
            <div className="flex min-h-0 w-52 shrink-0 flex-col overflow-y-auto border-r" style={{ borderColor: 'rgba(6,148,209,0.15)', background: '#F8FBFE' }}>
              <div className="px-4 py-3 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Vendors</div>
              <div className="group/vendor relative flex items-center border-b" style={{ borderLeftWidth: '2px', borderLeftStyle: 'solid', borderLeftColor: megaMenuVendor === 'All Courses' ? '#0694D1' : 'transparent', borderBottomColor: 'rgba(6,148,209,0.1)', background: megaMenuVendor === 'All Courses' ? 'rgba(6,148,209,0.1)' : 'transparent' }}>
                <a
                  href="/corporate-it-training-courses"
                  onMouseEnter={() => setMegaMenuVendor('All Courses')}
                  onClick={() => setMegaMenuOpen(false)}
                  className="flex flex-1 items-center gap-3 px-4 py-2.5 text-left transition-all"
                  style={{ color: megaMenuVendor === 'All Courses' ? '#0694D1' : '#093148' }}
                >
                  <div className="flex h-9 w-[52px] shrink-0 items-center justify-center overflow-hidden rounded" style={{ background: 'rgba(6,148,209,0.12)', border: '1px solid rgba(6,148,209,0.3)' }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium leading-tight">All Courses</div>
                  </div>
                  <svg className="mr-1 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover/vendor:opacity-100" fill="none" viewBox="0 0 24 24" stroke="#0694D1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>
              </div>
              {MEGA_MENU_VENDORS.map(v => (
                <div key={v.name} className="group/vendor relative flex items-center border-b" style={{ borderLeftWidth: '2px', borderLeftStyle: 'solid', borderLeftColor: megaMenuVendor === v.name ? '#0694D1' : 'transparent', borderBottomColor: 'rgba(6,148,209,0.1)', background: megaMenuVendor === v.name ? 'rgba(6,148,209,0.1)' : 'transparent' }}>
                  <a
                    href={VENDOR_HREFS[v.name] ?? '#'}
                    onMouseEnter={() => setMegaMenuVendor(v.name)}
                    onClick={() => setMegaMenuOpen(false)}
                    className="flex flex-1 items-center gap-3 px-4 py-2.5 text-left transition-all"
                    style={{ color: megaMenuVendor === v.name ? '#0694D1' : '#093148' }}
                  >
                    <div className="flex h-9 w-[52px] shrink-0 items-center justify-center overflow-hidden rounded" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)' }}>
                      {v.img ? (
                        <img src={`/images/partners/${encodeURIComponent(v.img)}`} alt={v.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-sm font-black" style={{ color: '#0694D1' }}>{v.name[0]}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium leading-tight">{v.name}</div>
                    </div>
                    <svg className="mr-1 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover/vendor:opacity-100" fill="none" viewBox="0 0 24 24" stroke="#0694D1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </a>
                </div>
              ))}
            </div>

            {/* Right — courses panel */}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-6">
              {megaMenuVendor === 'All Courses' ? (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold" style={{ color: '#093148' }}>Popular Courses</h3>
                      <p className="text-sm" style={{ color: '#7a8c96' }}>5,000+ courses across 20 top vendors</p>
                    </div>
                    <a href="/corporate-it-training-courses" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: '#0694D1' }}>
                      Browse All Courses
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                    {[...TOP_COURSES, ...NEW_TRENDING].slice(0, 12).map((course, i) => (
                      <a
                        key={i}
                        href={COURSE_HREFS[course.name] ?? '#'}
                        className="group flex flex-col gap-2 rounded-xl p-3.5 transition-all hover:-translate-y-0.5"
                        style={{ background: '#F8FBFE', border: '1px solid #CAEFFF' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.4)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F8FBFE'; (e.currentTarget as HTMLElement).style.borderColor = '#CAEFFF' }}
                      >
                        <p className="text-sm font-medium leading-snug group-hover:text-[#0694D1] transition-colors line-clamp-2" style={{ color: '#093148' }}>{course.name}</p>
                        <div className="flex items-center gap-2 mt-auto">
                          <span className="flex items-center gap-1 text-sm" style={{ color: '#7a8c96' }}>
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            {course.days * 8} hrs ({course.days} days)
                          </span>
                          <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${course.level === 'Beginner' ? 'bg-[#0694d1]/10 text-[#0694D1]' : course.level === 'Intermediate' ? 'bg-[#076d9d]/15 text-[#076D9D]' : 'bg-[#093148]/10 text-[#093148]'}`}>{course.level}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              ) : (
              <>
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold" style={{ color: '#093148' }}>{megaMenuVendor} Courses</h3>
                  <p className="text-sm" style={{ color: '#7a8c96' }}>
                    {MEGA_MENU_VENDORS.find(v => v.name === megaMenuVendor)?.courses} courses available
                  </p>
                </div>
                <a href={VENDOR_HREFS[megaMenuVendor] ?? '#'} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: '#0694D1' }}>
                  View All {megaMenuVendor} Courses
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
              {/* Course grid */}
              <div className="grid min-w-0 grid-cols-2 gap-2 xl:grid-cols-3">
                {(MEGA_MENU_COURSES[megaMenuVendor] ?? []).map((course, i) => (
                  <a
                    key={i}
                    href={COURSE_HREFS[course.name] ?? '#'}
                    className="group flex min-w-0 flex-col gap-2 rounded-xl p-3 transition-all hover:-translate-y-0.5"
                    style={{ background: '#F8FBFE', border: '1px solid #CAEFFF' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.4)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F8FBFE'; (e.currentTarget as HTMLElement).style.borderColor = '#CAEFFF'; }}
                  >
                    <p className="text-sm font-medium leading-snug group-hover:text-[#0694D1] transition-colors line-clamp-3" style={{ color: '#093148' }}>{course.name}</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="flex items-center gap-1 text-sm" style={{ color: '#7a8c96' }}>
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        {course.days * 8} hrs ({course.days} days)
                      </span>
                      <span className={`rounded-full px-1.5 py-0.5 font-medium ${
                        course.level === 'Beginner' ? 'bg-[#0694d1]/10 text-[#0694D1]' :
                        course.level === 'Intermediate' ? 'bg-[#076d9d]/15 text-[#076D9D]' :
                        'bg-[#093148]/10 text-[#093148]'
                      }`} style={{ fontSize: '10px' }}>{course.level}</span>
                    </div>
                  </a>
                ))}
              </div>
              </>
              )}
            </div>
          </div>
        )}

        {/* ── Technologies Mega Menu ── */}
        {techMenuOpen && (
          <div
            ref={techMenuRef}
            className="absolute inset-x-0 top-full z-[200] mx-auto flex max-w-7xl overflow-hidden rounded-b-2xl"
            style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderTop: 'none', boxShadow: '0 24px 60px rgba(0,0,0,0.18)', maxHeight: '520px' }}
            onMouseEnter={clearNavMenuCloseTimer}
            onMouseLeave={scheduleNavMenuClose}
          >
            {/* Left — technology categories */}
            <div className="flex min-h-0 w-52 shrink-0 flex-col overflow-y-auto border-r" style={{ borderColor: 'rgba(6,148,209,0.15)', background: '#F8FBFE' }}>
              <div className="px-4 py-3 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Technologies</div>
              {([
                { name: 'Cloud Computing',    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/> },
                { name: 'Cybersecurity',      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/> },
                { name: 'Networking',         icon: <><circle cx="12" cy="5" r="2" strokeWidth={1.8}/><circle cx="5" cy="19" r="2" strokeWidth={1.8}/><circle cx="19" cy="19" r="2" strokeWidth={1.8}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 7v4M8.5 17.5l3-2.5M15.5 17.5l-3-2.5"/></> },
                { name: 'Project Management', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/> },
                { name: 'Data & AI',          icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></> },
                { name: 'DevOps',             icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/> },
                { name: 'ERP Systems',        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/> },
                { name: 'Linux & Open Source',icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/> },
                { name: 'Power Platform',     icon: <><rect x="3" y="3" width="8" height="8" rx="1.5" strokeWidth={1.8}/><rect x="13" y="3" width="8" height="8" rx="1.5" strokeWidth={1.8}/><rect x="3" y="13" width="8" height="8" rx="1.5" strokeWidth={1.8}/><rect x="13" y="13" width="8" height="8" rx="1.5" strokeWidth={1.8}/></> },
              ] as { name: string; icon: React.ReactNode }[]).map(({ name, icon }) => {
                const t = TOP_TECHNOLOGIES.find(x => x.name === name)!
                return (
                  <button
                    key={name}
                    onMouseEnter={() => setTechMenuCategory(name)}
                    onClick={() => { if (TECH_HREFS[name]) { router.push(TECH_HREFS[name]); setTechMenuOpen(false) } else { setTechMenuCategory(name) } }}
                    className="group/tech flex items-center gap-3 px-4 py-2.5 text-left transition-all border-b"
                    style={{
                      background: techMenuCategory === name ? 'rgba(6,148,209,0.1)' : 'transparent',
                      borderLeftWidth: '2px', borderLeftStyle: 'solid', borderLeftColor: techMenuCategory === name ? '#0694D1' : 'transparent',
                      borderBottomColor: 'rgba(6,148,209,0.1)',
                      color: techMenuCategory === name ? '#0694D1' : '#093148',
                    }}
                  >
                    <svg className="h-4 w-4 shrink-0" style={{ color: techMenuCategory === name ? '#0694D1' : '#093148' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">{icon}</svg>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium leading-tight">{name}</div>
                    </div>
                    <svg className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover/tech:opacity-100" fill="none" viewBox="0 0 24 24" stroke="#0694D1"><title>{`Go to ${name} courses`}</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </button>
                )
              })}
            </div>

            {/* Right — courses panel */}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold" style={{ color: '#093148' }}>{techMenuCategory}</h3>
                  <p className="text-sm" style={{ color: '#7a8c96' }}>
                    {TOP_TECHNOLOGIES.find(t => t.name === techMenuCategory)?.count} courses · Partners: {TOP_TECHNOLOGIES.find(t => t.name === techMenuCategory)?.partners.join(', ')}
                  </p>
                </div>
                <a href={TECH_HREFS[techMenuCategory] ?? '#'} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: '#0694D1' }}>
                  View All {techMenuCategory} Courses
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
              <div className="grid min-w-0 grid-cols-2 gap-2 xl:grid-cols-3">
                {(TECH_MENU_COURSES[techMenuCategory] ?? []).map((course, i) => (
                  <a
                    key={i}
                    href={COURSE_HREFS[course.name] ?? '#'}
                    className="group flex min-w-0 flex-col gap-2 rounded-xl p-3 transition-all hover:-translate-y-0.5"
                    style={{ background: '#F8FBFE', border: '1px solid #CAEFFF' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.4)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F8FBFE'; (e.currentTarget as HTMLElement).style.borderColor = '#CAEFFF'; }}
                  >
                    <p className="text-sm font-medium leading-snug group-hover:text-[#0694D1] transition-colors line-clamp-3" style={{ color: '#093148' }}>{course.name}</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-sm" style={{ color: '#0694D1' }}>{course.vendor}</span>
                      <span className="text-sm" style={{ color: '#CBD5E1' }}>·</span>
                      <span className="flex items-center gap-1 text-sm" style={{ color: '#7a8c96' }}>
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        {course.days * 8}h ({course.days}d)
                      </span>
                      <span className={`ml-auto rounded-full px-1.5 py-0.5 font-medium ${course.level === 'Beginner' ? 'bg-[#0694d1]/10 text-[#0694D1]' : course.level === 'Intermediate' ? 'bg-[#076d9d]/15 text-[#076D9D]' : 'bg-[#093148]/10 text-[#093148]'}`} style={{ fontSize: '10px' }}>{course.level}</span>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-5 flex items-center border-t pt-4" style={{ borderColor: 'rgba(6,148,209,0.15)' }}>
                <span className="text-sm" style={{ color: '#7a8c96' }}>Showing top courses for {techMenuCategory}</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Portalled dropdowns — in document.body to fully escape nav-pill stacking context */}
      {typeof window !== 'undefined' && learningMenuOpen && createPortal(
        <div
          ref={learningMenuRef}
          className="fixed z-[9999] rounded-xl shadow-2xl overflow-y-auto"
          style={{ top: `${learningDropPos.top}px`, left: `${learningDropPos.left}px`, background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', width: '380px', maxHeight: `calc(100vh - ${learningDropPos.top}px - 16px)`, padding: '6px' }}
          onMouseEnter={clearNavMenuCloseTimer}
          onMouseLeave={scheduleNavMenuClose}
        >
          {(() => {
            const linkBtn = (link: { label: string; href: string }, bold?: boolean) => (
              <button
                key={link.label}
                type="button"
                className="block w-full text-left rounded-lg px-3 py-2 text-sm transition-colors"
                style={{ color: '#374151', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: bold ? 700 : 400 }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0694D1'; e.currentTarget.style.background = 'rgba(6,148,209,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = 'transparent'; }}
                onClick={() => { setLearningMenuOpen(false); if (link.href !== '#') router.push(link.href) }}
              >
                {link.label}
              </button>
            )
            return (
              <>
                {linkBtn(LEARNING_LINKS[0], true)}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <div>{LEARNING_LINKS.slice(1, 6).map(l => linkBtn(l))}</div>
                  <div>{LEARNING_LINKS.slice(6).map(l => linkBtn(l))}</div>
                </div>
              </>
            )
          })()}
        </div>,
        document.body
      )}

      {typeof window !== 'undefined' && aboutMenuOpen && createPortal(
        <div
          ref={aboutMenuRef}
          className="fixed z-[9999] rounded-xl shadow-2xl overflow-hidden"
          style={{ top: `${aboutDropPos.top}px`, left: `${aboutDropPos.left}px`, background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', minWidth: '220px' }}
          onMouseEnter={clearNavMenuCloseTimer}
          onMouseLeave={scheduleNavMenuClose}
        >
          {ABOUT_LINKS.map(link => (
            <button
              key={link.label}
              type="button"
              className="block w-full text-left px-5 py-2.5 text-sm transition-colors"
              style={{ color: '#374151', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0694D1'; e.currentTarget.style.background = 'rgba(6,148,209,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = 'transparent'; }}
              onClick={() => { setAboutMenuOpen(false); router.push(link.href) }}
            >
              {link.label}
            </button>
          ))}
        </div>,
        document.body
      )}

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex items-center px-4 md:px-8 lg:px-[50px] py-5 sm:py-[35px]" style={{ background: '#06111E' }}>
        {/* Hero keyframes */}
        <style>{`
          @keyframes heroFadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
          @keyframes heroSlideL { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
          .h-fade-up { animation: heroFadeUp 0.7s ease both; }
          .h-slide-l { animation: heroSlideL 0.6s ease both; }
          .h-d1{animation-delay:0.05s} .h-d2{animation-delay:0.20s} .h-d3{animation-delay:0.35s} .h-d4{animation-delay:0.50s} .h-d5{animation-delay:0.65s}
          /* Search bar — glow breathe */
          @keyframes searchGlow {
            0%,100% { box-shadow: 0 0 8px 1px rgba(6,148,209,0.10), 0 0 20px 2px rgba(77,191,239,0.04); border-color: rgba(6,148,209,0.22); }
            50%      { box-shadow: 0 0 18px 4px rgba(6,148,209,0.25), 0 0 40px 6px rgba(77,191,239,0.09); border-color: rgba(6,148,209,0.45); }
          }
          .hero-search { animation: searchGlow 3s ease-in-out infinite; }
          .hero-search:focus-within {
            border-color: #0694D1 !important;
            box-shadow: 0 0 0 3px rgba(6,148,209,0.30), 0 0 40px 10px rgba(6,148,209,0.40) !important;
            animation: none;
          }
          /* Search button — shine sweep */
          @keyframes btnShine {
            0%   { background-position: -200% center; }
            30%  { background-position: 200% center; }
            100% { background-position: 200% center; }
          }
          .search-btn {
            background: #0694D1;
            background-image: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%);
            background-size: 200% 100%;
            background-position: -200% center;
            animation: btnShine 2.4s ease-in-out infinite;
          }
          .search-btn:hover { background-color: #076D9D; }
          @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
          @keyframes statFadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          .stat-box-a { animation: statFadeIn 0.6s ease both, floatA 4s ease-in-out 0.6s infinite; }
          .stat-box-b { animation: statFadeIn 0.6s ease both 0.15s, floatB 4.5s ease-in-out 0.75s infinite; }
          .stat-box-c { animation: statFadeIn 0.6s ease both 0.3s,  floatB 4s ease-in-out 1s infinite; }
          .stat-box-d { animation: statFadeIn 0.6s ease both 0.45s, floatA 4.5s ease-in-out 0.5s infinite; }
        `}</style>

        {/* Background container — overflow-hidden keeps blobs/image contained */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Background image */}
          <img src="/images/home-baner.png" alt="" className="h-full w-full object-cover object-center" style={{ opacity: 0.55 }} />
          {/* Dark navy/teal gradient overlay */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 45%, #040C18 100%)', opacity: 0.78 }} />
          {/* Animated blobs */}
          <div className="blob1 absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="blob2 absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="blob3 absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-sky-200/10 blur-3xl" />
          {/* Interactive particle canvas */}
          <HeroParticles />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">

            {/* ── Left: text content ── */}
            <div className="flex-1 text-center lg:text-left">

              {/* Announcement pill */}
              <div className="h-fade-up mb-5 flex justify-center lg:justify-start">
                <div className="flex items-center gap-2.5 rounded-full px-5 py-2 text-sm font-medium text-white" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.30)', boxShadow: '0 0 0 1px rgba(255,255,255,0.08) inset' }}>
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                  </span>
                  <span className="text-xs sm:text-sm"><span className="font-semibold text-white">New batches</span> starting this week —&nbsp;<span className="rounded-full bg-white px-2 py-0.5 text-xs sm:text-sm font-bold whitespace-nowrap" style={{ color: '#053148' }}>Seats filling fast</span></span>
                </div>
              </div>

              {/* Main headline — animated morph word */}
              <h1 className="h-fade-up h-d2 mb-5 font-bold leading-tight tracking-tight">
                <span className="block text-3xl text-white sm:text-3xl md:text-4xl lg:text-[38px]">
                  Master Any{' '}
                  <span
                    key={morphIdx}
                    className={morphExiting ? 'morph-word-out' : 'morph-word-in'}
                    style={{ display: 'inline-block', maxWidth: '100%', color: '#C8EEFF', textShadow: '0 0 28px rgba(6,148,209,0.9), 0 0 55px rgba(6,148,209,0.45)' }}
                  >
                    {MORPH_WORDS[morphIdx]}
                  </span>
                </span>
                <span className="block text-3xl text-white sm:text-3xl md:text-4xl lg:text-[38px]">in Record Time</span>
              </h1>

              {/* Subtext */}
              <p className="h-fade-up h-d3 mx-auto mb-6 max-w-2xl text-sm text-white sm:text-base lg:mx-0">
                33+ years. 5,000+ courses. 1M+ professionals certified. The world trusts Koenig to deliver results that matter.
              </p>

              {/* Search bar + Enterprise toggle */}
              {/* Search bar */}
              <div className="h-fade-up h-d4 mb-5 relative w-full max-w-2xl z-[100]" ref={heroSearchRef}>
                <div className="flex w-full items-stretch overflow-hidden rounded-2xl border-[1.5px] border-[#B5D4F4] bg-[#F0F6FB] p-2 shadow-xl transition-all duration-200 focus-within:border-[#0078D4] focus-within:shadow-[0_0_0_3px_rgba(0,120,212,0.15)]">
                  <input
                    type="text"
                    value={heroQuery}
                    onChange={e => { setHeroQuery(e.target.value); setHeroResultsOpen(true) }}
                    onFocus={() => { setHeroResultsOpen(true); setHeroAiLearnMoreOpen(false) }}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); goSearch(heroQuery) } }}
                    placeholder="Ask AI: e.g. I want to learn Azure security…"
                    aria-label="Search courses"
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm font-medium text-[#1a2d3e] placeholder-[#8baabf] outline-none"
                  />
                  {heroQuery.length > 0 && (
                    <button
                      onClick={() => { setHeroQuery(''); setHeroResultsOpen(false); }}
                      className="shrink-0 flex items-center justify-center w-6 h-6 my-auto mr-1 rounded-full transition-colors hover:bg-[#0078D4]/15 hover:text-[#0078D4]"
                      aria-label="Clear search"
                      style={{ color: '#6b8299', background: 'rgba(0,0,0,0.08)' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  )}
                  <button onClick={() => goSearch(heroQuery)} className="shrink-0 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(6,148,209,0.4)] transition-colors duration-200" style={{ background: 'linear-gradient(135deg,#0694d1,#076D9D)' }}>
                    Search
                  </button>
                </div>
                {heroResultsOpen && heroQuery.trim().length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-[rgba(6,148,209,0.12)] bg-[#F8FCFF] shadow-2xl">
                    <div className="p-4 sm:p-4">
                      {/* Persistent hint until a recognisable topic is typed */}
                      {getContextChips(heroQuery).length === 0 && (
                        <p className="mb-2.5 text-xs text-[#9bb3c5]">Type a topic above to get AI-powered course recommendations.</p>
                      )}

                      {/* Thinking dots */}
                      {heroAiThinking && (
                        <div className="flex items-center gap-2 py-2">
                          <span className="hero-ai-dot" /><span className="hero-ai-dot" /><span className="hero-ai-dot" />
                          <span className="ml-1 text-xs text-[#6b8299]">Reading your intent…</span>
                        </div>
                      )}

                      {/* Results */}
                      {heroAiResults && (
                        <>
                          <div className="mb-3 flex items-center justify-between gap-3 rounded-r-lg border-l-[3px] border-[#0694D1] px-3 py-1.5" style={{ background: 'rgba(6,148,209,0.06)' }}>
                            <span className="text-[12px] font-semibold leading-snug text-[#1a3a55]">{heroAiResults.advice}</span>
                            {heroAiResults.learnMore && (
                              <button
                                onClick={() => setHeroAiLearnMoreOpen(true)}
                                className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md border border-[#bfe0f0] bg-white px-2 py-0.5 text-[11px] font-medium text-[#093148]"
                              >
                                Learn more
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                              </button>
                            )}
                          </div>

                          {/* Learn more modal — portalled to body, same layout as the vendor page */}
                          {heroAiLearnMoreOpen && heroAiResults.learnMore && typeof document !== 'undefined' && createPortal(
                            <div data-hero-learnmore-modal style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(7,30,46,0.6)', backdropFilter: 'blur(6px)' }} onClick={() => setHeroAiLearnMoreOpen(false)}>
                              <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 580, maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(6,148,209,0.22)', position: 'relative' }} onClick={e => e.stopPropagation()}>
                                <div style={{ background: 'linear-gradient(135deg,#071e2e 0%,#093148 100%)', borderRadius: '20px 20px 0 0', padding: '22px 24px 20px', position: 'relative' }}>
                                  <button onClick={() => setHeroAiLearnMoreOpen(false)} style={{ position: 'absolute', top: 14, right: 14, width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                                  </button>
                                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(6,148,209,0.2)', border: '1px solid rgba(6,148,209,0.4)', borderRadius: 999, padding: '3px 10px', marginBottom: 10 }}>
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.88 5.47L19 9l-4.12 3-1.88 5.47L11 12 5 9l5.12-.53z" /></svg>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Learning Guide</span>
                                  </div>
                                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.25, margin: 0 }}>{heroAiResults.learnMore.title}</h2>
                                </div>
                                <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                                  <p style={{ fontSize: 13, color: '#4a6375', lineHeight: 1.75, margin: 0 }}>{heroAiResults.learnMore.overview}</p>
                                  <div>
                                    <h4 style={{ fontSize: 12, fontWeight: 800, color: '#071e2e', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Career Paths This Opens</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                                      {heroAiResults.learnMore.careers.map((c, i) => (
                                        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 999, background: '#F0F8FF', border: '1px solid rgba(6,148,209,0.2)', fontSize: 12, fontWeight: 600, color: '#0b2840' }}>
                                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
                                          {c}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 style={{ fontSize: 12, fontWeight: 800, color: '#071e2e', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Key Skills You&apos;ll Learn</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                      {heroAiResults.learnMore.skills.map((s, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                                          <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                          </span>
                                          <span style={{ fontSize: 13, color: '#2d4a6a', lineHeight: 1.5 }}>{s}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div style={{ background: '#F8FCFF', border: '1px solid rgba(6,148,209,0.18)', borderRadius: 12, padding: '14px 16px' }}>
                                    <h4 style={{ fontSize: 12, fontWeight: 800, color: '#071e2e', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Why Now?</h4>
                                    <p style={{ fontSize: 13, color: '#4a6375', lineHeight: 1.7, margin: '0 0 12px' }}>{heroAiResults.learnMore.whyNow}</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                                      {heroAiResults.learnMore.points.map((pt, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                                          <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(6,148,209,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                                            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                          </span>
                                          <span style={{ fontSize: 11.5, color: '#071e2e', fontWeight: 600, lineHeight: 1.4 }}>{pt}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>,
                            document.body
                          )}

                          {heroRefinedQuery && (
                            <p className="mb-2 text-[11px] font-semibold text-[#0694D1]">Refined for: &quot;{heroRefinedQuery}&quot;</p>
                          )}

                          {/* Recommended courses — mobile: 1 card per slide; desktop: 3 cards per slide. Both: side arrows + dots. */}
                          <div className="relative px-7 sm:hidden">
                            <div className="overflow-hidden rounded-xl">
                              <div
                                className="flex transition-transform duration-300 ease-out"
                                style={{ width: `${heroAiResults.courses.length * 100}%`, transform: `translateX(-${heroCourseSlide * (100 / heroAiResults.courses.length)}%)` }}
                              >
                                {heroAiResults.courses.map((c, i) => (
                                  <div key={i} style={{ width: `${100 / heroAiResults.courses.length}%` }} className="shrink-0">
                                    <div
                                      onClick={() => goSearch(c.code)}
                                      className="flex h-full cursor-pointer flex-col rounded-xl border-[1.5px] border-[rgba(6,148,209,0.28)] bg-[#EAF5FD] p-3 shadow-[0_2px_10px_rgba(6,148,209,0.07)] transition-shadow hover:shadow-[0_8px_24px_rgba(6,148,209,0.16)]"
                                    >
                                      <span className={`-mt-[5px] mb-1.5 inline-flex self-start items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${CARD_LEVEL_BADGE}`}>
                                        {SCHEDULE_LEVEL_ICON[c.level] ?? SCHEDULE_LEVEL_ICON.assoc}
                                        {SCHEDULE_LEVEL_LABEL[c.level] ?? c.level}
                                      </span>
                                      <p className="text-xs font-bold leading-snug text-[#0694D1]">{c.name}</p>
                                      <p className="mt-auto flex items-center gap-1 pt-1 text-[11px] text-[#6b8299]"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{durWithHours(c.dur)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <button
                              onClick={() => setHeroCourseSlide(s => Math.max(s - 1, 0))}
                              disabled={heroCourseSlide === 0}
                              aria-label="Previous course"
                              className="absolute -left-[9px] top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#076D9D] shadow-[0_2px_8px_rgba(6,148,209,0.25)] disabled:opacity-30"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                            </button>
                            <button
                              onClick={() => setHeroCourseSlide(s => Math.min(s + 1, heroAiResults.courses.length - 1))}
                              disabled={heroCourseSlide === heroAiResults.courses.length - 1}
                              aria-label="Next course"
                              className="absolute -right-[9px] top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#076D9D] shadow-[0_2px_8px_rgba(6,148,209,0.25)] disabled:opacity-30"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                            <div className="mt-2.5 flex items-center justify-center gap-1.5">
                              {heroAiResults.courses.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setHeroCourseSlide(i)}
                                  aria-label={`Go to course ${i + 1}`}
                                  className={`rounded-full transition-all duration-300 ${i === heroCourseSlide ? 'h-2 w-5 bg-[#0694D1]' : 'h-2 w-2 bg-[#0694D1]/25'}`}
                                />
                              ))}
                            </div>
                          </div>
                          {(() => {
                            const perPage = 3
                            const totalPages = Math.ceil(heroAiResults.courses.length / perPage)
                            return (
                              <div className="relative hidden px-8 sm:block">
                                <div className="overflow-hidden rounded-xl">
                                  <div
                                    className="flex transition-transform duration-300 ease-out"
                                    style={{ width: `${totalPages * 100}%`, transform: `translateX(-${heroCoursePage * (100 / totalPages)}%)` }}
                                  >
                                    {Array.from({ length: totalPages }, (_, p) => (
                                      <div key={p} style={{ width: `${100 / totalPages}%` }} className="grid shrink-0 grid-cols-3 gap-2.5">
                                        {heroAiResults.courses.slice(p * perPage, p * perPage + perPage).map((c, i) => (
                                          <div
                                            key={i}
                                            onClick={() => goSearch(c.code)}
                                            className="flex h-full cursor-pointer flex-col rounded-xl border-[1.5px] border-[rgba(6,148,209,0.28)] bg-[#EAF5FD] p-3 shadow-[0_2px_10px_rgba(6,148,209,0.07)] transition-shadow hover:shadow-[0_8px_24px_rgba(6,148,209,0.16)]"
                                          >
                                            <span className={`-mt-[5px] mb-1.5 inline-flex self-start items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${CARD_LEVEL_BADGE}`}>
                                              {SCHEDULE_LEVEL_ICON[c.level] ?? SCHEDULE_LEVEL_ICON.assoc}
                                              {SCHEDULE_LEVEL_LABEL[c.level] ?? c.level}
                                            </span>
                                            <p className="text-xs font-bold leading-snug text-[#0694D1]">{c.name}</p>
                                            <p className="mt-auto flex items-center gap-1 pt-1 text-[11px] text-[#6b8299]"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{durWithHours(c.dur)}</p>
                                          </div>
                                        ))}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <button
                                  onClick={() => setHeroCoursePage(p => Math.max(p - 1, 0))}
                                  disabled={heroCoursePage === 0}
                                  aria-label="Previous courses"
                                  className="absolute -left-[9px] top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#076D9D] shadow-[0_2px_8px_rgba(6,148,209,0.25)] disabled:opacity-30"
                                >
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                                </button>
                                <button
                                  onClick={() => setHeroCoursePage(p => Math.min(p + 1, totalPages - 1))}
                                  disabled={heroCoursePage === totalPages - 1}
                                  aria-label="Next courses"
                                  className="absolute -right-[9px] top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#076D9D] shadow-[0_2px_8px_rgba(6,148,209,0.25)] disabled:opacity-30"
                                >
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                                </button>
                                {totalPages > 1 && (
                                  <div className="mt-2.5 flex items-center justify-center gap-1.5">
                                    {Array.from({ length: totalPages }, (_, p) => (
                                      <button
                                        key={p}
                                        onClick={() => setHeroCoursePage(p)}
                                        aria-label={`Go to courses page ${p + 1}`}
                                        className={`rounded-full transition-all duration-300 ${p === heroCoursePage ? 'h-2 w-5 bg-[#0694D1]' : 'h-2 w-2 bg-[#0694D1]/25'}`}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            )
                          })()}

                          <p className="mt-3 text-center text-[12.5px] font-semibold leading-relaxed text-[#1a3a55]">If not, please elaborate more on your requirement.</p>

                          <div className="mt-3 border-t pt-3" style={{ borderColor: 'rgba(6,148,209,0.12)' }}>
                            <div className="flex w-full items-stretch overflow-hidden rounded-lg border-2 border-[rgba(6,148,209,0.3)] bg-white p-1 pl-2 shadow-[0_2px_10px_rgba(6,148,209,0.07)] transition-all duration-200 focus-within:border-[#0694D1] focus-within:shadow-[0_0_0_4px_rgba(6,148,209,0.25)]">
                              <svg viewBox="0 0 24 24" fill="none" stroke="#8baabf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="my-auto h-2.5 w-2.5 shrink-0"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                              <input
                                type="text"
                                value={heroFollowUpQuery}
                                onChange={e => setHeroFollowUpQuery(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault() } }}
                                placeholder="Elaborate more on your requirement…"
                                aria-label="Elaborate more on your requirement"
                                className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-[11px] font-medium text-[#1a2d3e] placeholder-[#8baabf] outline-none"
                              />
                              {heroFollowUpQuery.length > 0 && (
                                <button
                                  onClick={() => setHeroFollowUpQuery('')}
                                  className="shrink-0 flex items-center justify-center w-6 h-6 my-auto mr-1 rounded-full transition-colors hover:bg-[#0078D4]/15 hover:text-[#0078D4]"
                                  aria-label="Clear search"
                                  style={{ color: '#6b8299', background: 'rgba(0,0,0,0.08)' }}
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  if (heroAiDebounceRef.current) clearTimeout(heroAiDebounceRef.current)
                                  if (getContextChips(heroFollowUpQuery).length === 0) return
                                  setHeroAiThinking(false)
                                  setHeroAiResults(classifyAiQuery(heroFollowUpQuery))
                                  setHeroRefinedQuery(heroFollowUpQuery.trim())
                                }}
                                className="shrink-0 rounded-md px-3 py-2.5 text-[12px] font-semibold text-white transition-colors duration-200"
                                style={{ background: 'linear-gradient(135deg,#0694d1,#076D9D)' }}
                              >
                                Search Again
                              </button>
                            </div>
                          </div>

                          <div className="mt-3 flex flex-col gap-3 rounded-2xl px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between" style={{ background: '#D6ECFB', border: '1px solid #A9CFEF' }}>
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: '#FFFFFF', border: '1px solid #D9E4F2' }}>
                                <svg className="h-4 w-4 text-[#087FD1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-[#093148]">Require more details?</p>
                                <p className="text-xs text-[#093148]/70">These courses + the full learning guide,<br />in your inbox.</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 rounded-lg p-1 sm:w-80" style={{ background: '#FFFFFF', border: '1px solid #D9E4F2' }}>
                              <input
                                type="email"
                                value={heroDetailsEmail}
                                onChange={e => setHeroDetailsEmail(e.target.value)}
                                placeholder="Enter your email address..."
                                aria-label="Email address"
                                className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-[13px] text-[#093148] placeholder-[#94a3b8] outline-none"
                              />
                              <button className="shrink-0 rounded-md border px-3 py-1.5 text-[12px] font-medium text-[#093148] transition-colors" style={{ background: 'rgba(77,191,239,0.4)', borderColor: '#0694D1' }}>
                                Email Me Details
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Money-back guarantee + secondary CTA */}
              <div className="h-fade-up h-d4 mb-5 flex max-w-2xl flex-wrap items-center justify-center gap-3 lg:justify-start">
                <span className="flex items-center gap-1.5 text-xs text-white/60">
                  <svg className="h-3.5 w-3.5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  100% money-back guarantee
                </span>
                <span className="hidden h-3 w-px bg-white/20 sm:block" />
                <button
                  onClick={() => setAdvisorModalOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#4dbfef] transition-colors hover:text-white"
                >
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Request More Info
                </button>
              </div>

              {/* Popular tags */}
              <div className="h-fade-up h-d4 mb-5 flex max-w-2xl flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="text-sm font-semibold text-white/80">Popular:</span>
                {['Azure Administrator', 'AWS Solutions Architect', 'Generative AI', 'CISSP', 'PMP', 'CCNA', 'Kubernetes', 'CompTIA Security+'].map(t => (
                  <span
                    key={t}
                    onClick={() => goSearch(t)}
                    className="cursor-pointer rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-white/20 hover:text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Social proof */}
              <div className="h-fade-up h-d4 mb-3 flex justify-center lg:justify-start">
                <div className="flex flex-wrap items-center gap-3 rounded-2xl px-4 py-2.5 sm:gap-6 sm:rounded-full sm:px-6 sm:py-3" style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[
                        '/images/headshots/headshot-1.webp',
                        '/images/headshots/headshot-2.webp',
                        '/images/headshots/headshot-3.webp',
                        '/images/headshots/headshot-4.png',
                        '/images/headshots/headshot-5.webp',
                      ].map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Student ${i + 1}`}
                          className="h-9 w-9 shrink-0 rounded-full object-cover object-top"
                          style={{ border: '1px solid rgba(255,255,255,0.7)', zIndex: 5 - i }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white"><span className="font-bold">3,200+</span> enrolled this month</span>
                  </div>
                  <span className="hidden h-4 w-px bg-white/25 sm:block" />
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-base leading-none">★★★★★</span>
                    <span className="text-sm text-white font-bold">4.9/5</span>
                    <span className="text-sm text-white/80">(18,400+ reviews)</span>
                  </div>
                </div>
              </div>

              {/* Trust bar — mobile only */}
              <div className="h-fade-up h-d4 mb-4 flex justify-center lg:hidden">
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-2xl px-4 py-2.5 text-xs text-white/70" style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-[#0694D1] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg>
                    <span><span className="font-bold text-white">1M+</span> Certified</span>
                  </span>
                  <span className="h-3 w-px bg-white/20" />
                  <span className="flex items-center gap-1.5">
                    <span className="text-yellow-400 leading-none">★</span>
                    <span><span className="font-bold text-white">4.9</span> Rating</span>
                  </span>
                  <span className="h-3 w-px bg-white/20" />
                  <span className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-[#0694D1] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span><span className="font-bold text-white">95%</span> Pass Rate</span>
                  </span>
                  <span className="h-3 w-px bg-white/20" />
                  <span className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-[#0694D1] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span><span className="font-bold text-white">33+</span> Years</span>
                  </span>
                </div>
              </div>

              {/* Mobile Hero Carousel — same as desktop slider */}
              <div className="mt-6 lg:hidden">
                <div
                  className="relative w-full overflow-hidden rounded-2xl cursor-pointer"
                  style={{
                    height: '320px',
                    background: 'rgba(6, 25, 45, 0.52)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(6,148,209,0.25)',
                    boxShadow: '0 8px 40px rgba(6,109,157,0.28), inset 0 1px 0 rgba(58,182,235,0.12)',
                  }}
                  onTouchStart={e => { heroTouchX.current = e.touches[0].clientX; setHeroPaused(true) }}
                  onTouchEnd={e => {
                    setHeroPaused(false)
                    if (heroTouchX.current === null) return
                    const diff = heroTouchX.current - e.changedTouches[0].clientX
                    if (Math.abs(diff) > 40) setHeroSlide(s => diff > 0 ? (s + 1) % 5 : (s + 4) % 5)
                    heroTouchX.current = null
                  }}
                >
                  {/* dots */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-1.5 py-2.5" style={{ background: 'rgba(6,40,65,0.72)', borderTop: '1px solid rgba(6,148,209,0.18)' }}>
                    {[0,1,2,3,4].map(i => (
                      <button
                        key={i}
                        onClick={() => setHeroSlide(i)}
                        style={i === heroSlide ? { background: 'linear-gradient(to right, #3AB6EB, #076D9D)' } : {}}
                        className={`rounded-full transition-all duration-300 ${i === heroSlide ? 'w-6 h-2' : 'h-2 w-2 bg-white/25 border border-[#0694D1]/40'}`}
                      />
                    ))}
                  </div>

                  {/* Slide 1 — MS Award */}
                  <div className="absolute inset-0 flex flex-col transition-opacity duration-500" style={{ opacity: heroSlide === 0 ? 1 : 0, pointerEvents: heroSlide === 0 ? 'auto' : 'none' }}>
                    <div className="flex flex-1 flex-col items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(7,109,157,0.78) 0%, rgba(5,18,35,0.88) 100%)' }}>
                      <img src="/images/MS-award-banner.png" alt="Microsoft 2025 Partner of the Year Award" className="w-full object-contain object-top" />
                      <div className="flex flex-1 w-full items-center justify-center px-4 pb-7 text-center text-white" style={{ background: 'rgba(6,40,65,0.72)' }}>
                        <p className="font-bold" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                          Koenig Solutions is the Global Winner<br />
                          of 2025 Microsoft Training Services<br />
                          Partner of the Year Award!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Slide 2 — RedHat */}
                  <div className="absolute inset-0 flex flex-col transition-opacity duration-500" style={{ opacity: heroSlide === 1 ? 1 : 0, pointerEvents: heroSlide === 1 ? 'auto' : 'none' }}>
                    <div className="flex flex-1 flex-col items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(180,0,0,0.55) 0%, rgba(5,18,35,0.92) 100%)' }}>
                      <div className="w-full overflow-hidden" style={{ height: '62%', flexShrink: 0 }}>
                        <img src="/images/awards/RED-25.png" alt="RedHat Gold Partner of the Year 2025" className="w-full h-full object-contain object-top" style={{ marginTop: '5px' }} />
                      </div>
                      <div className="flex flex-1 w-full items-center justify-center px-4 pb-7 text-center text-white" style={{ background: 'rgba(6,40,65,0.72)' }}>
                        <p className="font-bold" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                          Winner of Red Hat Gold Partner<br />
                          of the Year 2025 – Non-Retail<br />
                          (GLS India)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Slide 3 — AI-Ready Workforce */}
                  <div className="absolute inset-0 flex flex-col transition-opacity duration-500" style={{ opacity: heroSlide === 2 ? 1 : 0, pointerEvents: heroSlide === 2 ? 'auto' : 'none' }}>
                    <div className="px-4 py-3 text-center text-white" style={{ background: 'linear-gradient(135deg, rgba(7,109,157,0.78) 0%, rgba(5,18,35,0.90) 100%)', borderBottom: '1px solid rgba(6,148,209,0.20)' }}>
                      <div className="font-bold text-sm leading-snug">AI-Ready Workforce Enablement — build AI fluency with certified, hands-on training</div>
                    </div>
                    <div className="flex flex-1 flex-col justify-evenly gap-1.5 p-2 pb-8">
                      {[
                        { stat: '15+',  label: 'AI & Generative AI Certification Tracks', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg> },
                        { stat: '24/7', label: 'AI Learning Assistant Support',           icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
                        { stat: '10K+', label: 'Professionals Upskilled in AI/ML',        icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-1.17 2.83A4 4 0 0 1 16 13.5V16a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-2.5a4 4 0 0 1 1.17-3.67A4 4 0 0 1 8 7V6a4 4 0 0 1 4-4z"/></svg> },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between rounded-xl px-3 py-2" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.22)' }}>
                          <div className="flex flex-1 items-center gap-2">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, #076D9D, #0C5A7F)', border: '1px solid rgba(58,182,235,0.30)' }}>
                              {row.icon}
                            </div>
                            <div className="flex-1 text-left">
                              <div className="font-bold text-white text-sm">{row.stat}</div>
                              <div className="text-sm text-white/60">{row.label}</div>
                            </div>
                          </div>
                          <span className="font-bold text-sm text-white/50">›</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Slide 4 — Partner Stats */}
                  <div className="absolute inset-0 flex flex-col transition-opacity duration-500" style={{ opacity: heroSlide === 3 ? 1 : 0, pointerEvents: heroSlide === 3 ? 'auto' : 'none' }}>
                    <div className="px-4 py-3 text-center text-white" style={{ background: 'linear-gradient(135deg, rgba(7,109,157,0.78) 0%, rgba(5,18,35,0.90) 100%)', borderBottom: '1px solid rgba(6,148,209,0.20)' }}>
                      <div className="font-bold text-sm leading-snug">Koenig is globally authorized by leading vendors, offering extensive courses delivered by certified trainers</div>
                    </div>
                    <div className="flex flex-1 flex-col justify-evenly gap-1.5 p-2 pb-8">
                      {[
                        { stat: '35+',    label: 'Partner Authorizations',                img: '/images/home-banner/35+.svg' },
                        { stat: '5,000+', label: 'Courses (Across technologies)',          img: '/images/home-banner/5000+.svg' },
                        { stat: '350+',   label: 'Certified Trainers (Real-world experts)', img: '/images/home-banner/350+.svg' },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between rounded-xl px-3 py-2" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.22)' }}>
                          <div className="flex flex-1 items-center gap-2">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, #076D9D, #0C5A7F)', border: '1px solid rgba(58,182,235,0.30)' }}>
                              <img src={row.img} alt={row.stat} className="h-5 w-5 object-contain" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="font-bold text-white text-sm">{row.stat}</div>
                              <div className="text-sm text-white/60">{row.label}</div>
                            </div>
                          </div>
                          <span className="font-bold text-sm text-white/50">›</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Slide 5 — Learning Stack */}
                  <div className="absolute inset-0 flex flex-col transition-opacity duration-500" style={{ opacity: heroSlide === 4 ? 1 : 0, pointerEvents: heroSlide === 4 ? 'auto' : 'none' }}>
                    <div className="px-4 py-3 text-center text-white" style={{ background: 'linear-gradient(135deg, rgba(7,109,157,0.78) 0%, rgba(5,18,35,0.90) 100%)', borderBottom: '1px solid rgba(6,148,209,0.20)' }}>
                      <div className="font-bold text-sm leading-snug">Koenig&apos;s learning stack ensures structured training with hands-on labs, guided practice, and certification pathways</div>
                    </div>
                    <div className="flex flex-1 flex-col justify-evenly gap-1 p-2 pb-8">
                      {[
                        { name: 'Pre-requisite Training', img: '/images/home-banner/pre-req.png' },
                        { name: 'Assessments (Qubits)',   img: '/images/home-banner/qubit.png' },
                        { name: 'Class Recordings',       img: '/images/home-banner/classrecord.png' },
                        { name: 'Lab Extensions',         img: '/images/home-banner/lab-extn.png' },
                        { name: 'Revision Classes',       img: '/images/home-banner/revision.png' },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg px-2 py-1" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.22)' }}>
                          <div className="flex items-center gap-1.5">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ background: 'linear-gradient(135deg, #076D9D, #0C5A7F)', border: '1px solid rgba(58,182,235,0.30)' }}>
                              <img src={row.img} alt="" className="h-3 w-3 object-contain" />
                            </div>
                            <span className="font-medium text-white/90" style={{ fontSize: '14px' }}>{row.name}</span>
                          </div>
                          <span className="rounded-full px-1.5 py-0.5 font-normal text-white" style={{ fontSize: '14px', background: 'rgba(7,109,157,0.75)', border: '1px solid rgba(6,148,209,0.30)' }}>Free</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>{/* /left */}

            {/* ── Right: Hero Carousel ── */}
            <div className="h-fade-up h-d5 hidden shrink-0 lg:block">
              {/* card height sized to slide 1 natural content: image(~189px)+text(~60px)+dots(36px) */}
              <div
                className="relative w-80 overflow-hidden rounded-2xl cursor-pointer"
                style={{
                  height: '340px',
                  background: 'rgba(6, 25, 45, 0.52)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(6,148,209,0.25)',
                  boxShadow: '0 8px 40px rgba(6,109,157,0.28), inset 0 1px 0 rgba(58,182,235,0.12)',
                }}
                onMouseEnter={() => setHeroPaused(true)}
                onMouseLeave={() => setHeroPaused(false)}
              >

                {/* shared dots — pinned to card bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-1.5 py-2.5" style={{ background: 'rgba(6,40,65,0.72)', borderTop: '1px solid rgba(6,148,209,0.18)' }}>
                  {[0,1,2,3,4].map(i => (
                    <button
                      key={i}
                      onClick={() => setHeroSlide(i)}
                      style={i === heroSlide ? { background: 'linear-gradient(to right, #3AB6EB, #076D9D)' } : {}}
                      className={`rounded-full transition-all duration-300 ${i === heroSlide ? 'w-6 h-2' : 'h-2 w-2 bg-white/25 border border-[#0694D1]/40'}`}
                    />
                  ))}
                </div>

                {/* ── Slide 1 — MS Award full image ── */}
                <div
                  className="absolute inset-0 flex flex-col transition-opacity duration-500"
                  style={{ opacity: heroSlide === 0 ? 1 : 0, pointerEvents: heroSlide === 0 ? 'auto' : 'none' }}
                >
                  <div
                    className="flex flex-1 flex-col items-center overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, rgba(7,109,157,0.78) 0%, rgba(5,18,35,0.88) 100%)' }}
                  >
                    <img
                      src="/images/MS-award-banner.png"
                      alt="Microsoft 2025 Partner of the Year Award"
                      className="w-full object-contain object-top"
                    />
                    <div className="flex flex-1 w-full items-center justify-center px-4 pb-7 text-center text-white" style={{ background: 'rgba(6,40,65,0.72)' }}>
                      <p className="font-bold" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                        Koenig Solutions is the Global Winner<br />
                        of 2025 Microsoft Training Services<br />
                        Partner of the Year Award!
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Slide 2 — RedHat Gold Partner Award ── */}
                <div
                  className="absolute inset-0 flex flex-col transition-opacity duration-500"
                  style={{ opacity: heroSlide === 1 ? 1 : 0, pointerEvents: heroSlide === 1 ? 'auto' : 'none' }}
                >
                  <div
                    className="flex flex-1 flex-col items-center overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, rgba(180,0,0,0.55) 0%, rgba(5,18,35,0.92) 100%)' }}
                  >
                    <div className="w-full overflow-hidden" style={{ height: '62%', flexShrink: 0 }}>
                      <img
                        src="/images/awards/RED-25.png"
                        alt="RedHat Gold Partner of the Year 2025"
                        className="w-full h-full object-contain object-top"
                        style={{ marginTop: '5px' }}
                      />
                    </div>
                    <div className="flex flex-1 w-full items-center justify-center px-4 pb-7 text-center text-white" style={{ background: 'rgba(6,40,65,0.72)' }}>
                      <p className="font-bold" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                        Winner of Red Hat Gold Partner<br />
                        of the Year 2025 – Non-Retail<br />
                        (GLS India)
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Slide 3 — AI-Ready Workforce ── */}
                <div
                  className="absolute inset-0 flex flex-col transition-opacity duration-500"
                  style={{ opacity: heroSlide === 2 ? 1 : 0, pointerEvents: heroSlide === 2 ? 'auto' : 'none' }}
                >
                  <div className="px-4 py-3 text-center text-white" style={{ background: 'linear-gradient(135deg, rgba(7,109,157,0.78) 0%, rgba(5,18,35,0.90) 100%)', borderBottom: '1px solid rgba(6,148,209,0.20)' }}>
                    <div className="font-bold text-sm leading-snug">
                      AI-Ready Workforce Enablement — build AI fluency with certified, hands-on training
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-evenly gap-1.5 p-2 pb-8" style={{ background: 'transparent' }}>
                    {[
                      { stat: '15+',  label: 'AI & Generative AI Certification Tracks', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg> },
                      { stat: '24/7', label: 'AI Learning Assistant Support',           icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
                      { stat: '10K+', label: 'Professionals Upskilled in AI/ML',        icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-1.17 2.83A4 4 0 0 1 16 13.5V16a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-2.5a4 4 0 0 1 1.17-3.67A4 4 0 0 1 8 7V6a4 4 0 0 1 4-4z"/></svg> },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl px-3 py-2" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.22)' }}>
                        <div className="flex items-center gap-2">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                            style={{ background: 'linear-gradient(135deg, #076D9D, #0C5A7F)', border: '1px solid rgba(58,182,235,0.30)' }}
                          >
                            {row.icon}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{row.stat}</div>
                            <div className="text-sm text-white/60">{row.label}</div>
                          </div>
                        </div>
                        <span className="font-bold text-sm text-white/50">›</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Slide 4 — Partner Stats ── */}
                <div
                  className="absolute inset-0 flex flex-col transition-opacity duration-500"
                  style={{ opacity: heroSlide === 3 ? 1 : 0, pointerEvents: heroSlide === 3 ? 'auto' : 'none' }}
                >
                  <div className="px-4 py-3 text-center text-white" style={{ background: 'linear-gradient(135deg, rgba(7,109,157,0.78) 0%, rgba(5,18,35,0.90) 100%)', borderBottom: '1px solid rgba(6,148,209,0.20)' }}>
                    <div className="font-bold text-sm leading-snug">
                      Koenig is globally authorized by leading vendors, offering extensive courses delivered by certified trainers
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-evenly gap-1.5 p-2 pb-8" style={{ background: 'transparent' }}>
                    {[
                      { icon: '🛡️', stat: '35+',    label: 'Partner Authorizations',             img: '/images/home-banner/35+.svg' },
                      { icon: '📚', stat: '5,000+', label: 'Courses (Across technologies)',        img: '/images/home-banner/5000+.svg' },
                      { icon: '👥', stat: '350+',   label: 'Certified Trainers (Real-world experts)', img: '/images/home-banner/350+.svg' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl px-3 py-2" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.22)' }}>
                        <div className="flex items-center gap-2">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                            style={{ background: 'linear-gradient(135deg, #076D9D, #0C5A7F)', border: '1px solid rgba(58,182,235,0.30)' }}
                          >
                            <img src={row.img} alt={row.stat} className="h-5 w-5 object-contain" />
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{row.stat}</div>
                            <div className="text-sm text-white/60">{row.label}</div>
                          </div>
                        </div>
                        <span className="font-bold text-sm text-white/50">›</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Slide 5 — Learning Stack ── */}
                <div
                  className="absolute inset-0 flex flex-col transition-opacity duration-500"
                  style={{ opacity: heroSlide === 4 ? 1 : 0, pointerEvents: heroSlide === 4 ? 'auto' : 'none' }}
                >
                  <div className="px-4 py-3 text-center text-white" style={{ background: 'linear-gradient(135deg, rgba(7,109,157,0.78) 0%, rgba(5,18,35,0.90) 100%)', borderBottom: '1px solid rgba(6,148,209,0.20)' }}>
                    <div className="font-bold text-sm leading-snug">
                      Koenig&apos;s learning stack ensures structured training with hands-on labs, guided practice, and certification pathways
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-evenly gap-1 p-2 pb-8" style={{ background: 'transparent' }}>
                    {[
                      { icon: '🎯', name: 'Pre-requisite Training', img: '/images/home-banner/pre-req.png' },
                      { icon: '🔍', name: 'Assessments (Qubits)',  img: '/images/home-banner/qubit.png' },
                      { icon: '🎬', name: 'Class Recordings',      img: '/images/home-banner/classrecord.png' },
                      { icon: '💻', name: 'Lab Extensions',        img: '/images/home-banner/lab-extn.png' },
                      { icon: '📖', name: 'Revision Classes',      img: '/images/home-banner/revision.png' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg px-2 py-1" style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.22)' }}>
                        <div className="flex items-center gap-1.5">
                          <div
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                            style={{ background: 'linear-gradient(135deg, #076D9D, #0C5A7F)', border: '1px solid rgba(58,182,235,0.30)' }}
                          >
                            <img src={row.img} alt="" className="h-3 w-3 object-contain" />
                          </div>
                          <span className="font-medium text-white/90" style={{ fontSize: '14px' }}>{row.name}</span>
                        </div>
                        <span className="rounded-full px-1.5 py-0.5 font-normal text-white" style={{ fontSize: '14px', background: 'rgba(7,109,157,0.75)', border: '1px solid rgba(6,148,209,0.30)' }}>Free</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>{/* /right carousel */}

          </div>
        </div>
      </section>

      {/* ── Trusted by Global Companies ───────────────────────── */}
      <section className="bg-white overflow-hidden px-4 md:px-8 lg:px-[50px] py-5 sm:py-[35px]">
        <style>{`
          @keyframes trustedScroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          .trusted-track { display: flex; width: max-content; animation: trustedScroll 38s linear infinite; }
          .trusted-track:hover { animation-play-state: paused; }
          .trusted-track-mobile { display: flex; align-items: center; gap: 1rem; width: max-content; animation: trustedScroll ${TESTIMONIAL_MARQUEE_DURATION}s linear infinite; }
        `}</style>

        {/* Section heading */}
        <div className="mx-auto max-w-7xl">
          <div className="io-fade text-center" style={{ marginBottom: '16px' }}>
            <h2 className="font-bold text-koenig-dark" style={{ fontSize: '22px' }}>
              Trusted by <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">global companies</span> across various industries
            </h2>
          </div>
        </div>

        {/* Scrolling logo strip — desktop: auto-marquee | mobile: drag/swipe */}
        {/* Desktop marquee */}
        <div
          className="relative hidden lg:block overflow-x-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div className="trusted-track items-center gap-2 py-2">
            {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((c, i) => (
              <div key={i} className="flex shrink-0 items-center justify-center px-2">
                <img
                  src={`/images/trusted-logos/${encodeURIComponent(c.img)}`}
                  alt={c.name}
                  className="h-14 w-auto object-contain"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(6,148,209,0.12))' }}
                  title={c.name}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile auto-scroll strip — CSS-driven marquee (matches desktop smoothness), touch pauses/resumes */}
        <div
          className="relative lg:hidden overflow-x-hidden py-2 px-2"
          style={{
            touchAction: 'pan-y',
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
          onTouchStart={() => { if (logosScrollRef.current) logosScrollRef.current.style.animationPlayState = 'paused' }}
          onTouchEnd={() => { if (logosScrollRef.current) logosScrollRef.current.style.animationPlayState = 'running' }}
          onTouchCancel={() => { if (logosScrollRef.current) logosScrollRef.current.style.animationPlayState = 'running' }}
        >
          <div ref={logosScrollRef} className="trusted-track-mobile">
          {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((c, i) => (
            <div key={i} className="flex shrink-0 items-center justify-center">
              <img
                src={`/images/trusted-logos/${encodeURIComponent(c.img)}`}
                alt={c.name}
                className="h-10 w-auto object-contain"
                title={c.name}
              />
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────── */}
      <div ref={statsRef} className="bg-white px-4 md:px-8 lg:px-[50px]" style={{ paddingBottom: '40px' }}>
        <div className="mx-auto max-w-7xl px-6 py-6" style={{ background: '#EBF8FE', borderRadius: '0 1.5rem 0 1.5rem' }}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-8">
          {[
            { end: 33,   suffix: '+',  label: 'Years Training Excellence', barColor: '#0694d1', icon: '/images/home-banner/icon-infographic-30+.svg' },
            { end: 5000, suffix: '+',  label: 'Courses Offered',           barColor: '#076d9d', icon: '/images/home-banner/icon-infographic-5000+.svg' },
            { end: 30,   suffix: 'K+', label: 'Monthly Students',          barColor: '#0694d1', icon: '/images/home-banner/icon-infographic-30000+.svg' },
            { end: 99,   suffix: '%',  label: 'On-Time Delivery',          barColor: '#076d9d', icon: '/images/home-banner/icon-infographic-99.svg' },
            { end: 300,  suffix: '+',  label: 'Certified Trainers',        barColor: '#0694d1', icon: '/images/home-banner/icon-infographic-300+.svg' },
          ].map((s, statIdx) => (
            <>
              {statIdx === 2 && (
                <div key="divider-1" className="col-span-2 sm:hidden">
                  <div style={{ height: '1px', background: 'rgba(6,148,209,0.25)' }} />
                </div>
              )}
              {statIdx === 4 && (
                <div key="divider-2" className="col-span-2 sm:hidden">
                  <div style={{ height: '1px', background: 'rgba(6,148,209,0.25)' }} />
                </div>
              )}
              <div key={s.label} className={`stat-item flex flex-col items-center text-center${statIdx === 4 ? ' col-span-2 sm:col-span-1' : ''}`}>
                <div
                  className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${s.barColor}, #0694d1)` }}
                >
                  <img src={s.icon} alt={s.label} className="h-5 w-5 object-contain" />
                </div>
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-koenig-dark">
                  <CountUp key={`${s.label}-${statsCount}`} end={s.end} suffix={s.suffix} duration={1800 + statIdx * 150} />
                </div>
                <div className={`io-fade mt-1 text-sm font-medium text-koenig-muted delay-${statIdx + 1}`}>{s.label}</div>
              </div>
            </>
          ))}
        </div>
        </div>
      </div>

      {/* ── Learning Formats ─────────────────────────────────── */}
      <section className="relative overflow-hidden lfr-sec" style={{ background: 'linear-gradient(135deg,#061e30 0%,#093148 50%,#062240 100%)', padding: '35px clamp(16px,4vw,50px)' }}>

        <style>{`
          .lfr-flip-inner { transform-style: preserve-3d; }
          .lfr-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
          .lfr-back { transform: rotateY(180deg); }
          @keyframes lfrRipple { 0%{transform:translate(-50%,-50%) scale(0.25);opacity:0.55} 100%{transform:translate(-50%,-50%) scale(2.8);opacity:0} }
          .lfr-ring { position:absolute; border-radius:50%; pointer-events:none; border:1px solid rgba(6,148,209,0.35); animation:lfrRipple 5s ease-out infinite; }
          .lfr-ring.d1{animation-delay:0s} .lfr-ring.d2{animation-delay:1.6s} .lfr-ring.d3{animation-delay:3.2s}
          @keyframes lfrBtnGlow { 0%,100%{box-shadow:0 0 0 0 rgba(6,148,209,0),0 4px 14px rgba(6,148,209,0.3)} 50%{box-shadow:0 0 22px 7px rgba(6,148,209,0.5),0 4px 14px rgba(6,148,209,0.3)} }
          .lfr-btn-glow { animation:lfrBtnGlow 2.8s ease-in-out infinite; }
          .lfr-desktop { display:block; }
          .lfr-mobile  { display:none; }
          @media(max-width:992px) {
            .lfr-desktop-track > div { flex: 0 0 calc(50% - 10px)!important; }
          }
          @media(max-width:700px) {
            .lfr-sec { padding-top:24px!important; padding-bottom:24px!important; }
          }
          @media(max-width:640px) {
            .lfr-desktop { display:none!important; }
            .lfr-mobile  { display:block!important; }
            .lfr-sec     { padding-top:20px!important; padding-bottom:20px!important; }
          }
          @media(min-width:641px) and (max-width:1024px) {
            .lfr-desktop-track > div { flex: 0 0 calc(50% - 10px)!important; }
          }
          .lfr-nav-btn { width:32px; height:32px; border-radius:50%; border:1px solid rgba(6,148,209,0.4); background:rgba(6,148,209,0.12); color:#0694d1; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; transition:background 0.2s; flex-shrink:0; }
          .lfr-nav-btn:hover { background:rgba(6,148,209,0.25); }
          .lfr-nav-btn:disabled { opacity:0.35; cursor:default; }
        `}</style>

        {/* Glow orbs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, left: '25%', width: 380, height: 380, borderRadius: '50%', opacity: 0.25, background: 'radial-gradient(circle,#0694d1,transparent 70%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: '25%', width: 320, height: 320, borderRadius: '50%', opacity: 0.2, background: 'radial-gradient(circle,#076d9d,transparent 70%)', filter: 'blur(55px)' }} />
          <div style={{ position: 'absolute', top: '50%', left: 40, transform: 'translateY(-50%)', width: 200, height: 200, borderRadius: '50%', opacity: 0.15, background: 'radial-gradient(circle,#00a4ef,transparent 70%)', filter: 'blur(45px)' }} />
          <div style={{ position: 'absolute', top: '33%', right: 40, width: 180, height: 180, borderRadius: '50%', opacity: 0.15, background: 'radial-gradient(circle,#0694d1,transparent 70%)', filter: 'blur(40px)' }} />
          <div className="lfr-ring d1" style={{ top: '50%', left: '50%', width: 420, height: 420 }} />
          <div className="lfr-ring d2" style={{ top: '50%', left: '50%', width: 420, height: 420 }} />
          <div className="lfr-ring d3" style={{ top: '50%', left: '50%', width: 420, height: 420 }} />
        </div>

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto' }}>

          {/* Header */}
          <div className="io-fade" style={{ textAlign: 'center', marginBottom: 35 }}>
            <span style={{ display: 'inline-block', background: 'rgba(6,148,209,0.18)', color: '#0694d1', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 20, marginBottom: 12 }}>
              Learning Formats
            </span>
            <h2 style={{ fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 800, color: '#fff', lineHeight: 1.35, marginBottom: 12 }}>
              Learning That{' '}
              <span style={{ background: 'linear-gradient(90deg,#0694d1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Fits Your Life
              </span>
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Four formats. One quality standard. Every option comes with the same expert instructors, official courseware, and money-back guarantee.
            </p>
          </div>

          {/* ── DESKTOP slider ── */}
          <div
            ref={lfSliderRef}
            className="lfr-desktop"
            style={{ overflow: 'hidden' }}
            onMouseEnter={() => { lfSliderHoverRef.current = true }}
            onMouseLeave={() => { lfSliderHoverRef.current = false; setLfHoveredCard(null) }}
          >
            <div
              ref={lfTrackRef}
              className="lfr-desktop-track"
              style={{ display: 'flex', gap: 20 }}
              onTransitionEnd={e => { if (e.target === e.currentTarget) lfHandleTransitionEnd() }}
            >
              {Array.from({ length: 5 }, (_, i) => lfAllFormats[(lfStart + i) % lfAllFormats.length]).map((f, i) => (
                <div
                  key={`${lfStart}-${i}`}
                  style={{ flex: '0 0 calc(25% - 15px)' }}
                  onMouseEnter={() => setLfHoveredCard(i)}
                  onMouseLeave={() => setLfHoveredCard(null)}
                >
                  <div className="lfr-flip" style={{ perspective: 1000, height: 400, cursor: 'pointer' }}>
                    <div className="lfr-flip-inner" style={{ position: 'relative', width: '100%', height: '100%', transform: lfHoveredCard === i ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: lfHoveredCard === i ? 'transform 0.65s cubic-bezier(0.4,0.2,0.2,1)' : 'none' }}>
                      {/* FRONT */}
                      <div className="lfr-face" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 16, background: f.cardBg, border: '1px solid rgba(6,148,209,0.22)' }}>
                        <div style={{ position: 'relative', height: 176, flexShrink: 0, overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
                          <img src={f.img} alt={f.name} width={320} height={176} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" decoding="async" />
                          <span style={{ position: 'absolute', left: 12, top: 12, fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20, background: 'rgba(9,49,72,0.55)', backdropFilter: 'blur(6px)', color: '#fff', letterSpacing: '0.04em' }}>
                            {f.badge}
                          </span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px 0' }}>
                          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>{f.name}</h3>
                          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, flex: 1, fontWeight: 300 }}>{f.desc}</p>
                          <div style={{ paddingBottom: 20, paddingTop: 20 }}>
                            <button className="lfr-btn-glow" style={{ display: 'block', width: '100%', padding: '10px 0', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#0694d1,#076d9d)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                              {f.btnLabel}
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* BACK */}
                      <div className="lfr-face lfr-back" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', borderRadius: 16, padding: 20, background: f.cardBg, border: '1px solid rgba(6,148,209,0.35)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(6,148,209,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{f.icon}</div>
                          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{f.name}</h3>
                        </div>
                        <div style={{ height: 1, background: 'rgba(6,148,209,0.25)', marginBottom: 16 }} />
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                          {f.bullets.map(b => (
                            <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.78)', lineHeight: 1.4 }}>
                              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="8.5" cy="8.5" r="8" stroke="rgba(6,148,209,0.5)" strokeWidth="1" /><path d="M5.5 8.5l2 2 4-4" stroke="#0694d1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              {b}
                            </li>
                          ))}
                        </ul>
                        <button className="lfr-btn-glow" style={{ marginTop: 20, display: 'block', width: '100%', padding: '10px 0', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#0694d1,#076d9d)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                          {f.btnLabel}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop ← counter → navigation */}
          <div className="lfr-desktop" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 24 }}>
            <button className="lfr-nav-btn" onClick={() => lfTriggerSlide(false)} aria-label="Previous">←</button>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.75)', minWidth: 52, textAlign: 'center' }}>
              {String(lfStart + 1).padStart(2, '0')} / {String(lfAllFormats.length).padStart(2, '0')}
            </span>
            <button className="lfr-nav-btn" onClick={() => lfTriggerSlide(true)} aria-label="Next">→</button>
          </div>

          {/* ── MOBILE: 1 full-width card per slide ── */}
          <div className="lfr-mobile">
            <div
              onTouchStart={e => lfMobileSwipeStart(e.touches[0].clientX)}
              onTouchEnd={e => lfMobileSwipeEnd(e.changedTouches[0].clientX)}
              onMouseDown={e => lfMobileSwipeStart(e.clientX)}
              onMouseUp={e => lfMobileSwipeEnd(e.clientX)}
              onMouseLeave={e => { if (lfMobileDragStart.current !== null) lfMobileSwipeEnd(e.clientX) }}
              style={{ overflow: 'hidden', userSelect: 'none', cursor: 'grab' }}>
              <div style={{
                display: 'flex',
                width: `${lfAllFormats.length * 100}%`,
                transform: `translateX(-${(lfMobileSlide / lfAllFormats.length) * 100}%)`,
                transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
                boxSizing: 'border-box',
                pointerEvents: 'none',
              }}>
                {lfAllFormats.map((f) => (
                  <div key={f.name} style={{ width: `${100 / lfAllFormats.length}%`, flexShrink: 0 }}>
                    <div style={{ borderRadius: 16, overflow: 'hidden', background: f.cardBg, border: '1px solid rgba(6,148,209,0.22)', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ position: 'relative', height: 200, flexShrink: 0, overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
                        <img src={f.img} alt={f.name} width={400} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                        <span style={{ position: 'absolute', left: 12, top: 12, borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 600, background: 'rgba(9,49,72,0.6)', backdropFilter: 'blur(6px)', color: '#fff', letterSpacing: '0.03em' }}>{f.badge}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '16px 16px 18px' }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>{f.name}</h3>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, flex: 1, margin: 0 }}>{f.desc}</p>
                        <button className="lfr-btn-glow" style={{ marginTop: 16, width: '100%', borderRadius: 12, padding: '12px 0', fontSize: 14, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg,#0694d1,#076d9d)', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                          {f.btnLabel}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Arrow nav + counter */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 20 }}>
              <button className="lfr-nav-btn" onClick={() => setLfMobileSlide(s => Math.max(s - 1, 0))} disabled={lfMobileSlide === 0} aria-label="Previous">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.75)', minWidth: 52, textAlign: 'center' }}>
                {String(lfMobileSlide + 1).padStart(2, '0')} / {String(lfAllFormats.length).padStart(2, '0')}
              </span>
              <button className="lfr-nav-btn" onClick={() => setLfMobileSlide(s => Math.min(s + 1, lfAllFormats.length - 1))} disabled={lfMobileSlide === lfAllFormats.length - 1} aria-label="Next">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── Vendor Partners ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white px-4 md:px-8 lg:px-[50px] py-5 sm:py-[35px]">
        <div className="pointer-events-none absolute -left-40 -top-32 h-[420px] w-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-[300px] w-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.18) 0%, transparent 70%)' }} />

        <div className="mx-auto max-w-7xl">
          <div className="io-fade text-center" style={{ marginBottom: '35px' }}>
            <span className="mb-3 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-koenig-blue">
              Official Partnerships
            </span>
            <h2 className="mb-2 text-lg sm:text-xl md:text-2xl lg:text-[32px] font-bold text-koenig-dark">Authorized by <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">50+ Global Vendors</span></h2>
            <p className="text-sm sm:text-base text-koenig-muted">Official courseware. Certified instructors. Vendor-recognized credentials.</p>
          </div>
        </div>

        {/* ── Mobile: CSS-driven auto-scrolling strip, swipeable via touch or mouse-drag (matches desktop marquee smoothness) ── */}
        <style>{`.vendor-track-mobile { display: flex; gap: 0.75rem; padding: 0 0.25rem; width: max-content; animation: trustedScroll ${VENDOR_MARQUEE_DURATION}s linear infinite; cursor: grab; }`}</style>
        <div
          className="sm:hidden overflow-x-hidden pb-3"
          style={{ touchAction: 'pan-y' }}
          {...vendorDrag}
        >
          <div ref={vendorScrollRef} className="vendor-track-mobile">
            {[...VENDORS_ROW1, ...VENDORS_ROW2, ...VENDORS_ROW1, ...VENDORS_ROW2].map((v, i) => (
              <VendorCard key={i} v={v} />
            ))}
          </div>
        </div>

        {/* Row 1 — scrolls left, swipeable (desktop only) */}
        <div className="mb-4 hidden sm:block">
          <VendorMarqueeRow vendors={VENDORS_ROW1} direction={1} />
        </div>

        {/* Row 2 — scrolls right, swipeable (desktop only) */}
        <div className="hidden sm:block">
          <VendorMarqueeRow vendors={VENDORS_ROW2} direction={-1} />
        </div>
      </section>

      {/* ── Differentiators ──────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 md:px-8 lg:px-[50px] py-5 sm:py-[35px]" style={{ background: '#061e30' }}>
        {/* BG effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="diff-orb1 absolute top-0 left-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-10" style={{ background: 'radial-gradient(circle,#0694d1,transparent 65%)', filter: 'blur(80px)' }} />
          <div className="diff-orb2 absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full opacity-8" style={{ background: 'radial-gradient(circle,#076d9d,transparent 65%)', filter: 'blur(70px)' }} />
          {/* Subtle dot grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#ffffff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Heading */}
          <div className="io-fade text-center" style={{ marginBottom: '35px' }}>
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-koenig-blue" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.25)' }}>Why Koenig</span>
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold text-white">The <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Koenig Difference</span></h2>
            <p className="mx-auto max-w-xl text-sm sm:text-base text-white/55">What makes 1M+ professionals choose Koenig over everyone else</p>
          </div>

          {/* ── Mobile carousel ── */}
          <div
            className="sm:hidden overflow-hidden"
            onTouchStart={e => { stopDiffTimer(); diffDragStartX.current = e.touches[0].clientX }}
            onTouchEnd={e => {
              const delta = e.changedTouches[0].clientX - diffDragStartX.current
              if (delta < -40) setDiffMobilePage(p => Math.min(p + 1, 2))
              else if (delta > 40) setDiffMobilePage(p => Math.max(p - 1, 0))
              startDiffTimer()
            }}
          >
            <div className="flex" style={{ transform: `translateX(-${diffMobilePage * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}>

              {/* Page 0: Banner + Destination Training */}
              <div className="min-w-full flex flex-col gap-3">
                <div className="flex flex-col gap-4 rounded-2xl p-5" style={{ background: 'linear-gradient(135deg,#0a6ebd 0%,#0694d1 50%,#00b4d8 100%)' }}>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(255,255,255,0.18)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-bold text-white">1-on-1 Training</h3>
                      <p className="text-xs text-white/80">Schedule personalized sessions based upon your availability.</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[{ val: '2x', label: 'Faster' }, { val: '95%', label: 'Pass Rate' }, { val: '100%', label: 'Dedicated' }].map(s => (
                      <div key={s.label} className="flex-1 rounded-xl px-2 py-2.5 text-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                        <div className="text-sm font-bold text-white">{s.val}</div>
                        <div className="text-xs text-white/70">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col rounded-2xl p-5" style={{ background: 'linear-gradient(145deg,#071c2e,#0a2a42)', border: '1px solid rgba(6,148,209,0.22)' }}>
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.18)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <h3 className="mb-1.5 text-sm font-medium text-white">Destination Training</h3>
                  <p className="text-xs font-light leading-relaxed text-white/60">Immerse yourself in a focused learning environment, free from distractions, where you can sharpen your skills in popular global destinations.</p>
                </div>
              </div>

              {/* Page 1: Customized Training + Excellent Trainers */}
              <div className="min-w-full flex flex-col gap-3">
                <div className="flex flex-col rounded-2xl p-5" style={{ background: 'linear-gradient(145deg,#062038,#083250)', border: '1px solid rgba(0,180,216,0.2)' }}>
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'rgba(0,180,216,0.16)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </div>
                  <h3 className="mb-1.5 text-sm font-medium text-white">Customized Training</h3>
                  <p className="text-xs font-light leading-relaxed text-white/60">Learning without limits. Create custom courses that fit your exact needs, from blended topics to brand-new content.</p>
                </div>
                <div className="flex flex-col rounded-2xl p-5" style={{ background: 'linear-gradient(145deg,#072440,#093556)', border: '1px solid rgba(6,148,209,0.2)' }}>
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.18)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  </div>
                  <h3 className="mb-1.5 text-sm font-medium text-white">Excellent Trainers</h3>
                  <p className="text-xs font-light leading-relaxed text-white/60">Learn from the best. Our trainers are certified experts with real-world experience, ensuring top-quality learning.</p>
                </div>
              </div>

              {/* Page 2: Pre-Requisite + Happiness Guarantee */}
              <div className="min-w-full flex flex-col gap-3">
                <div className="flex flex-col rounded-2xl p-5" style={{ background: 'linear-gradient(145deg,#061828,#082438)', border: '1px solid rgba(7,109,157,0.25)' }}>
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'rgba(7,109,157,0.22)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#076d9d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/></svg>
                  </div>
                  <h3 className="mb-1.5 text-sm font-medium text-white">Pre-Requisite Session</h3>
                  <p className="text-xs font-light leading-relaxed text-white/60">Ensure you're fully prepared before training. Join a free pre-requisite session to assess your knowledge and get ready for the course ahead.</p>
                </div>
                <div className="flex flex-col rounded-2xl p-5" style={{ background: 'linear-gradient(145deg,#062030,#083048)', border: '1px solid rgba(0,180,216,0.18)' }}>
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'rgba(0,180,216,0.15)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <h3 className="mb-1.5 text-sm font-medium text-white">Happiness Guarantee</h3>
                  <p className="text-xs font-light leading-relaxed text-white/60">100% satisfaction guarantee on every course. Not satisfied? We make it right — no questions, no hassle.</p>
                </div>
              </div>

            </div>
          </div>
          {/* Mobile dots */}
          <div className="sm:hidden mt-5 flex justify-center gap-3">
            {[0,1,2].map(p => (
              <button key={p} onClick={() => setDiffMobilePage(p)} className="transition-all duration-300"
                style={{ width: diffMobilePage === p ? '32px' : '10px', height: '10px', borderRadius: '999px', background: diffMobilePage === p ? '#0694d1' : 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer' }}
              />
            ))}
          </div>

          {/* Bento grid — desktop only */}
          <div className="hidden sm:flex flex-col gap-4">

            {/* 1-on-1 Training — full-width horizontal banner */}
            <div className="diff-banner io-fade delay-1 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between" style={{ background: 'linear-gradient(135deg,#0a6ebd 0%,#0694d1 50%,#00b4d8 100%)' }}>
              <div className="flex items-start gap-4">
                <div className="diff-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(255,255,255,0.18)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <div>
                  <h3 className="mb-1 text-sm sm:text-base md:text-lg font-bold text-white">1-on-1 Training</h3>
                  <p className="text-sm sm:text-base text-white/80">Schedule personalized sessions based upon your availability.</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-3">
                {[{ val: '2x', label: 'Faster', d: 'd1' }, { val: '95%', label: 'Pass Rate', d: 'd2' }, { val: '100%', label: 'Dedicated', d: 'd3' }].map(s => (
                  <div key={s.label} className={`diff-stat ${s.d} rounded-xl px-4 py-3 text-center`} style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <div className="text-sm sm:text-base md:text-lg font-bold text-white">{s.val}</div>
                    <div className="text-sm text-white/70">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 — 3 cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* Destination Training */}
              <div className="diff-card diff-card-in io-fade d1 flex flex-col rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,#071c2e,#0a2a42)', border: '1px solid rgba(6,148,209,0.22)' }}>
                <div className="diff-icon mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.18)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <h3 className="mb-2 text-sm sm:text-base md:text-lg font-medium text-white">Destination Training</h3>
                <p className="text-sm sm:text-base font-light leading-relaxed text-white/60">Immerse yourself in a focused learning environment, free from distractions, where you can sharpen your skills in popular global destinations.</p>
              </div>

              {/* Customized Training */}
              <div className="diff-card diff-card-in io-fade d2 flex flex-col rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,#062038,#083250)', border: '1px solid rgba(0,180,216,0.2)' }}>
                <div className="diff-icon mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(0,180,216,0.16)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </div>
                <h3 className="mb-2 text-sm sm:text-base md:text-lg font-medium text-white">Customized Training</h3>
                <p className="text-sm sm:text-base font-light leading-relaxed text-white/60">Learning without limits. Create custom courses that fit your exact needs, from blended topics to brand-new content.</p>
              </div>

              {/* Excellent Trainers */}
              <div className="diff-card diff-card-in io-fade d3 flex flex-col rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,#072440,#093556)', border: '1px solid rgba(6,148,209,0.2)' }}>
                <div className="diff-icon mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.18)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <h3 className="mb-2 text-sm sm:text-base md:text-lg font-medium text-white">Excellent Trainers</h3>
                <p className="text-sm sm:text-base font-light leading-relaxed text-white/60">Learn from the best. Our trainers are certified experts with real-world experience, ensuring top-quality learning.</p>
              </div>

            </div>

            {/* Row 3 — 2 cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Pre-Requisite Session */}
              <div className="diff-card diff-card-in io-fade d4 flex flex-col rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,#061828,#082438)', border: '1px solid rgba(7,109,157,0.25)' }}>
                <div className="diff-icon mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(7,109,157,0.22)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#076d9d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/></svg>
                </div>
                <h3 className="mb-2 text-sm sm:text-base md:text-lg font-medium text-white">Pre-Requisite Session</h3>
                <p className="text-sm sm:text-base font-light leading-relaxed text-white/60">Ensure you're fully prepared before training. Join a free pre-requisite session to assess your knowledge and get ready for the course ahead.</p>
              </div>

              {/* Happiness Guarantee */}
              <div className="diff-card diff-card-in io-fade d5 flex flex-col rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,#062030,#083048)', border: '1px solid rgba(0,180,216,0.18)' }}>
                <div className="diff-icon mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(0,180,216,0.15)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <h3 className="mb-2 text-sm sm:text-base md:text-lg font-medium text-white">Happiness Guarantee</h3>
                <p className="text-sm sm:text-base font-light leading-relaxed text-white/60">100% satisfaction guarantee on every course. Not satisfied? We make it right — no questions, no hassle.</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── Course Explorer ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white px-4 md:px-8 lg:px-[50px] py-5 sm:py-[35px]">
        {/* Glow orbs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.20) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 h-[300px] w-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.18) 0%, transparent 70%)' }} />
        <div className="relative mx-auto max-w-7xl">
          <div className="io-fade text-center" style={{ marginBottom: "35px" }}>
            <span className="mb-3 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-koenig-blue">
              5,000+ Courses
            </span>
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold text-koenig-dark">Explore Our <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Course Catalogue</span></h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-koenig-muted">
              Find your certification across cloud, security, networking, project management, and more.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="io-fade delay-1 mb-8 flex flex-nowrap overflow-x-auto justify-center gap-1 rounded-2xl bg-koenig-light p-1.5 [&::-webkit-scrollbar]:hidden sm:mx-auto sm:w-max" style={{ border: '1px solid #CAEFFF' }}>
            {COURSE_TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  tab === t
                    ? 'text-white shadow-md'
                    : 'text-koenig-gray hover:text-koenig-dark hover:bg-white'
                }`}
                style={tab === t ? { background: 'linear-gradient(135deg, #0694d1, #076d9d)', boxShadow: '0 4px 12px rgba(6,148,209,0.35)' } : {}}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Course cards */}
          {tab === 'Top Courses' && (
            <div key="top" className="tab-enter grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {TOP_COURSES.slice(0, 6).map((c, i) => <CourseCard key={i} c={c} />)}
            </div>
          )}
          {tab === 'Top Technologies' && (
            <div key="tech" className="tab-enter grid grid-cols-2 gap-4 md:grid-cols-4">
              {TOP_TECHNOLOGIES.map((t, i) => (
                <div
                  key={i} role="button" tabIndex={0}
                  className="group cursor-pointer rounded-xl bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-koenig-blue"
                  style={{ border: '1px solid #CAEFFF', boxShadow: '0 4px 16px rgba(0, 164, 239, 0.10)' }}
                >
                  {/* Title row */}
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-koenig-navy transition-colors group-hover:text-koenig-blue leading-snug">{t.name}</h3>
                    <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-koenig-blue/40 text-koenig-blue transition-all group-hover:bg-koenig-blue group-hover:text-white group-hover:border-koenig-blue">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                    </span>
                  </div>
                  {/* Count */}
                  <p className="mb-4 text-sm font-medium text-koenig-blue">{t.count} Courses</p>
                  {/* Divider */}
                  <div className="mb-3 h-px" style={{ background: '#CAEFFF' }} />
                  {/* Partners */}
                  <p className="mb-2 text-sm font-normal text-koenig-gray/70">Top Partners</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.partners.map(p => (
                      <span key={p} className={`rounded-full px-2.5 py-1 text-sm font-semibold ${VENDOR_BADGE_COLORS[p] ?? 'bg-koenig-blue/10 text-koenig-blue'}`}>{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'New & Trending' && (
            <div key="trending" className="tab-enter grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {NEW_TRENDING.slice(0, 6).map((c, i) => <CourseCard key={i} c={c} />)}
            </div>
          )}

          <div className="io-fade mt-12 flex flex-col items-center gap-3">
            <a href="https://www.koenig-solutions.com/corporate-it-training-courses" className="group inline-flex items-center gap-3 rounded-2xl px-8 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{ background: 'linear-gradient(135deg,#093148,#076D9D)' }}>
              Browse All 5,000+ Courses
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.18)' }}>→</span>
            </a>
            <p className="text-sm text-koenig-muted">Across 50+ global vendors · All skill levels</p>
          </div>
        </div>
      </section>

      {/* ── Live Expert Webinars ─────────────────────────────── */}
      <section className="relative overflow-hidden px-4 md:px-8 lg:px-[50px] py-5 sm:py-[35px]" style={{ background: 'linear-gradient(160deg,#EBF8FE 0%,#F5FBFF 50%,#EAF6FD 100%)', borderTop: '1px solid #CAEFFF', borderBottom: '1px solid #CAEFFF' }}>
        <div className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[350px] w-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.20) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="io-fade mb-10 text-center">
            <h2 className="mb-2 text-lg sm:text-xl md:text-2xl lg:text-[32px] font-bold text-koenig-dark">Join Our Live <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Expert Webinars</span></h2>
            <p className="text-sm text-koenig-muted">Free live sessions led by certified instructors — register and attend from anywhere</p>
          </div>

          {/* ── Mobile: 1 card per page ── */}
          <div className="sm:hidden">
            <div className="overflow-hidden"
              onTouchStart={e => { webinarDragStartX.current = e.touches[0].clientX }}
              onTouchEnd={e => {
                const delta = e.changedTouches[0].clientX - webinarDragStartX.current
                if (delta < -40) setWebinarMobilePage(p => Math.min(p + 1, WEBINARS.length - 1))
                else if (delta > 40) setWebinarMobilePage(p => Math.max(p - 1, 0))
              }}
            >
              <div className="flex" style={{ transform: `translateX(-${webinarMobilePage * 100}%)`, transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)' }}>
                {WEBINARS.map((w, i) => (
                  <div key={i} className="min-w-full">
                    <div className="flex flex-col overflow-hidden rounded-2xl bg-white" style={{ border: '1.5px solid #CAEFFF', boxShadow: '0 2px 12px rgba(6,148,209,0.09)' }}>
                      <div className="relative flex flex-col items-center pb-5 pt-8" style={{ background: '#EBF8FE', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50V17L28 1L56 17V50L28 66Z' stroke='%230694d1' stroke-opacity='0.10' stroke-width='1' fill='none'/%3E%3Cpath d='M28 100L0 84V50L28 66L56 50V84L28 100Z' stroke='%230694d1' stroke-opacity='0.10' stroke-width='1' fill='none'/%3E%3C/svg%3E\")", backgroundSize: '56px 100px' }}>
                        <div className="absolute right-3 top-3 overflow-hidden rounded-lg bg-white p-1.5 shadow-sm" style={{ width: '100px', height: '64px' }}>
                          <img src={`/images/partners/${encodeURIComponent(w.vendorImg)}`} alt="" className="h-full w-full object-contain" />
                        </div>
                        <div className="flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold text-white" style={{ background: w.avatarBg, border: '4px solid white', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>{w.initials}</div>
                        <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(6,148,209,0.18))' }} />
                        <p className="relative mt-3 text-sm font-semibold text-koenig-dark">{w.speaker}</p>
                      </div>
                      <div className="flex flex-1 flex-col gap-4 px-5 py-6">
                        <h3 className="text-center text-sm font-bold leading-relaxed text-koenig-dark line-clamp-3" style={{ minHeight: '4.875rem' }}>{w.title}</h3>
                        <div className="flex items-center justify-center gap-2 text-sm text-koenig-muted">
                          <span className="flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>{w.date}</span>
                          <span>|</span>
                          <span className="flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{w.time}</span>
                        </div>
                        <button className="w-full rounded-full border-2 border-koenig-blue py-2.5 text-sm font-semibold text-koenig-blue">Register Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cards — 3 per page */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
            {WEBINARS.slice(webinarStart, webinarStart + 3).map((w, i) => (
              <div
                key={`${webinarStart}-${i}`}
                className="flex flex-col overflow-hidden rounded-2xl bg-white"
                style={{ border: '1.5px solid #CAEFFF', boxShadow: '0 2px 12px rgba(6,148,209,0.09)', animation: `cardFadeUp 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s both` }}
              >
                {/* Top — speaker panel */}
                <div
                  className="relative flex flex-col items-center pb-5 pt-8"
                  style={{
                    background: '#EBF8FE',
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50V17L28 1L56 17V50L28 66Z' stroke='%230694d1' stroke-opacity='0.10' stroke-width='1' fill='none'/%3E%3Cpath d='M28 100L0 84V50L28 66L56 50V84L28 100Z' stroke='%230694d1' stroke-opacity='0.10' stroke-width='1' fill='none'/%3E%3C/svg%3E\")",
                    backgroundSize: '56px 100px',
                  }}
                >
                  {/* Vendor badge — top right */}
                  <div className="absolute right-3 top-3 overflow-hidden rounded-lg bg-white p-1.5 shadow-sm" style={{ width: '100px', height: '64px' }}>
                    <img src={`/images/partners/${encodeURIComponent(w.vendorImg)}`} alt="" className="h-full w-full object-contain" />
                  </div>
                  {/* Avatar */}
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-full text-base sm:text-lg md:text-xl font-bold text-white"
                    style={{ background: w.avatarBg, border: '4px solid white', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
                  >
                    {w.initials}
                  </div>
                  {/* Gradient overlay behind name */}
                  <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(6,148,209,0.18))' }} />
                  {/* Speaker name */}
                  <p className="relative mt-3 text-sm font-semibold text-koenig-dark">{w.speaker}</p>
                </div>

                {/* Bottom — content */}
                <div className="flex flex-1 flex-col gap-4 px-5 py-6">
                  <h3 className="text-center text-sm sm:text-base font-bold leading-relaxed text-koenig-dark line-clamp-3" style={{ minHeight: '4.875rem' }}>{w.title}</h3>
                  <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-koenig-muted">
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {w.date}
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {w.time}
                    </span>
                  </div>
                  {/* Register Now — outlined pill */}
                  <button className="w-full rounded-full border-2 border-koenig-blue py-2.5 text-sm font-semibold text-koenig-blue transition-all duration-200 hover:bg-koenig-blue hover:text-white">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow navigation — mobile (individual cards) */}
          <div className="mt-8 flex items-center justify-center gap-4 sm:hidden">
            <button
              onClick={() => setWebinarMobilePage(p => Math.max(0, p - 1))}
              disabled={webinarMobilePage === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
              style={webinarMobilePage === 0
                ? { background: '#F3F4F6', border: '1.5px solid #E5E7EB', cursor: 'not-allowed' }
                : { background: '#093148', border: '1.5px solid #093148', boxShadow: '0 4px 14px rgba(9,49,72,0.25)', cursor: 'pointer' }}
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={webinarMobilePage === 0 ? '#D1D5DB' : '#ffffff'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span className="text-sm font-semibold text-koenig-muted">{webinarMobilePage + 1} / {WEBINARS.length}</span>
            <button
              onClick={() => setWebinarMobilePage(p => Math.min(p + 1, WEBINARS.length - 1))}
              disabled={webinarMobilePage === WEBINARS.length - 1}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
              style={webinarMobilePage === WEBINARS.length - 1
                ? { background: '#F3F4F6', border: '1.5px solid #E5E7EB', cursor: 'not-allowed' }
                : { background: '#093148', border: '1.5px solid #093148', boxShadow: '0 4px 14px rgba(9,49,72,0.25)', cursor: 'pointer' }}
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={webinarMobilePage === WEBINARS.length - 1 ? '#D1D5DB' : '#ffffff'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          {/* Arrow navigation — desktop (groups of 3) */}
          <div className="mt-8 hidden sm:flex items-center justify-center gap-4">
            <button
              onClick={() => setWebinarStart(s => Math.max(0, s - 3))}
              disabled={webinarStart === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
              style={webinarStart === 0
                ? { background: '#F3F4F6', border: '1.5px solid #E5E7EB', cursor: 'not-allowed' }
                : { background: '#093148', border: '1.5px solid #093148', boxShadow: '0 4px 14px rgba(9,49,72,0.25)', cursor: 'pointer' }}
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={webinarStart === 0 ? '#D1D5DB' : '#ffffff'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span className="text-sm font-semibold text-koenig-muted">{Math.floor(webinarStart / 3) + 1} / {Math.ceil(WEBINARS.length / 3)}</span>
            <button
              onClick={() => setWebinarStart(s => s + 3 < WEBINARS.length ? s + 3 : s)}
              disabled={webinarStart + 3 >= WEBINARS.length}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
              style={webinarStart + 3 >= WEBINARS.length
                ? { background: '#F3F4F6', border: '1.5px solid #E5E7EB', cursor: 'not-allowed' }
                : { background: '#093148', border: '1.5px solid #093148', boxShadow: '0 4px 14px rgba(9,49,72,0.25)', cursor: 'pointer' }}
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={webinarStart + 3 >= WEBINARS.length ? '#D1D5DB' : '#ffffff'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          {/* View All Webinars CTA */}
          <div className="mt-6 flex justify-center">
            <a href="https://www.koenig-solutions.com/upcoming-webinars" className="group inline-flex items-center gap-3 rounded-2xl px-8 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{ background: 'linear-gradient(135deg,#093148,#076D9D)' }}>
              View All Webinars
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.18)' }}>→</span>
            </a>
          </div>

        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white px-4 md:px-8 lg:px-[50px] py-5 sm:py-[35px]">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[350px] w-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.14) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="io-fade text-center" style={{ marginBottom: '35px' }}>
            <span className="mb-3 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-koenig-blue">Simple Process</span>
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold text-koenig-dark">How It <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Works</span></h2>
            <p className="mx-auto max-w-xl text-sm sm:text-base text-koenig-muted">From choosing your path to getting certified — four steps that have worked for over a million professionals.</p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line — desktop only */}
            <div className="pointer-events-none absolute hidden lg:block" style={{ top: '52px', left: '12.5%', right: '12.5%', height: '2px', background: 'linear-gradient(to right,#076D9D,#4DBFEF,#076D9D)' }} />

            {/* ── Mobile: 2 steps per page ── */}
            {(() => {
              const steps = [
                { icon: HIW_STEP_ICONS[0], num: '01', title: 'Tell Us Your Goal',        desc: 'Share where you are and where you want to be. Use our course finder, talk to a training advisor, or start with one of our curated career pathways.',    dots: 1 },
                { icon: HIW_STEP_ICONS[1], num: '02', title: 'Pick Your Format & Date',  desc: 'Choose 1-on-1, Public Batch, or Flexi. Select dates from guaranteed schedules that fit your life. Lock in your spot with flexible payment options.',     dots: 2 },
                { icon: HIW_STEP_ICONS[2], num: '03', title: 'Train with a Real Expert', desc: 'A vendor-certified instructor teaches you live. Hands-on labs mirror real enterprise environments. Sessions are recorded so you can review later.',      dots: 3 },
                { icon: HIW_STEP_ICONS[3], num: '04', title: 'Certify & Advance',        desc: 'Pass your exam with dedicated prep and practice tests. Join 1M+ certified professionals who used Koenig to land promotions and salary increases.',          dots: 4 },
              ]
              return (
                <div className="sm:hidden">
                  <div className="overflow-hidden pt-3"
                    onTouchStart={e => { hiwDragStartX.current = e.touches[0].clientX }}
                    onTouchEnd={e => {
                      const delta = e.changedTouches[0].clientX - hiwDragStartX.current
                      if (delta < -40) setHiwMobilePage(p => Math.min(p + 1, 1))
                      else if (delta > 40) setHiwMobilePage(p => Math.max(p - 1, 0))
                    }}
                  >
                    <div className="flex" style={{ transform: `translateX(-${hiwMobilePage * 100}%)`, transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)' }}>
                      {[[0,1],[2,3]].map((pair, pageIdx) => (
                        <div key={pageIdx} className="min-w-full flex flex-col gap-6">
                          {pair.map(si => {
                            const s = steps[si]
                            return (
                              <div key={si} className="flex flex-col items-center">
                                <div className="relative z-10 mb-4">
                                  <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'white', border: '4px solid #f0f9ff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', color: '#076D9D' }}>{s.icon}</div>
                                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: '#093148' }}>{si + 1}</span>
                                </div>
                                <div className="w-full rounded-2xl border-2 p-5 text-center" style={{ background: 'white', borderColor: '#e8f4fa', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                  <div className="mb-1.5 text-xs font-bold tracking-widest text-koenig-blue">STEP {s.num}</div>
                                  <h3 className="mb-2 text-sm font-semibold text-koenig-dark">{s.title}</h3>
                                  <p className="mb-3 text-xs font-light leading-relaxed text-koenig-muted">{s.desc}</p>
                                  <div className="flex items-center justify-center gap-1.5">
                                    {[0,1,2,3].map(d => (
                                      <div key={d} className="rounded-full" style={{ width: d < s.dots ? '16px' : '8px', height: '8px', background: d < s.dots ? '#076D9D' : '#CAEFFF' }} />
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
                  <div className="mt-5 flex justify-center gap-3">
                    {[0,1].map(p => (
                      <button key={p} onClick={() => setHiwMobilePage(p)} className="transition-all duration-300"
                        style={{ width: hiwMobilePage === p ? '32px' : '10px', height: '10px', borderRadius: '999px', background: hiwMobilePage === p ? '#0694d1' : '#CAEFFF', border: 'none', cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                </div>
              )
            })()}

            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-stretch">
              {[
                { icon: HIW_STEP_ICONS[0], num: '01', title: 'Tell Us Your Goal',        desc: 'Share where you are and where you want to be. Use our course finder, talk to a training advisor, or start with one of our curated career pathways.',              dots: 1, delay: '0.10s' },
                { icon: HIW_STEP_ICONS[1], num: '02', title: 'Pick Your Format & Date',  desc: 'Choose 1-on-1, Public Batch, or Flexi. Select dates from guaranteed schedules that fit your life. Lock in your spot with flexible payment options.',           dots: 2, delay: '0.25s' },
                { icon: HIW_STEP_ICONS[2], num: '03', title: 'Train with a Real Expert', desc: 'A vendor-certified instructor teaches you live. Hands-on labs mirror real enterprise environments. Sessions are recorded so you can review later.',          dots: 3, delay: '0.40s' },
                { icon: HIW_STEP_ICONS[3], num: '04', title: 'Certify & Advance',        desc: 'Pass your exam with dedicated prep and practice tests. Join 1M+ certified professionals who used Koenig to land promotions and salary increases.',              dots: 4, delay: '0.55s' },
              ].map((s, i) => {
                const isActive = activeStep === i
                return (
                  <div
                    key={i}
                    className="hiw-step io-fade flex h-full cursor-pointer flex-col items-center"
                    style={{ animationDelay: s.delay }}
                    onMouseEnter={() => { setActiveStep(i); setStepPaused(true) }}
                    onMouseLeave={() => setStepPaused(false)}
                  >
                    {/* Icon circle */}
                    <div className="relative z-10 mb-6">
                      <div
                        className="flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300"
                        style={{
                          background: isActive ? '#076D9D' : 'white',
                          border: '4px solid #f0f9ff',
                          boxShadow: isActive ? '0 8px 30px rgba(7,109,157,0.35)' : '0 4px 20px rgba(0,0,0,0.08)',
                          transform: isActive ? 'scale(1.1) translateY(-6px)' : 'scale(1)',
                          color: isActive ? 'white' : '#076D9D',
                        }}
                      >{s.icon}</div>
                      {/* Step number badge */}
                      <span
                        className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white transition-all duration-300"
                        style={{ background: isActive ? '#0694d1' : '#093148', transform: isActive ? 'scale(1.2)' : 'scale(1)' }}
                      >{i + 1}</span>
                      {isActive && <div className="hiw-pulse-ring pointer-events-none absolute inset-0 rounded-full" />}
                    </div>

                    {/* Card */}
                    <div
                      className="w-full flex-1 rounded-2xl border-2 p-6 text-center transition-all duration-300"
                      style={{
                        background: 'white',
                        borderColor: isActive ? '#076D9D' : '#e8f4fa',
                        boxShadow: isActive ? '0 20px 40px rgba(7,109,157,0.12)' : '0 2px 12px rgba(0,0,0,0.04)',
                        transform: isActive ? 'translateY(-4px)' : 'none',
                      }}
                    >
                      <div className="mb-2 text-sm font-bold tracking-widest text-koenig-blue">STEP {s.num}</div>
                      <h3 className="mb-2 text-sm sm:text-base md:text-lg font-semibold transition-colors duration-300" style={{ color: isActive ? '#076D9D' : '#093148' }}>{s.title}</h3>
                      <p className="mb-4 text-sm sm:text-base font-light leading-relaxed text-koenig-muted">{s.desc}</p>
                      {/* Progress dots */}
                      <div className="flex items-center justify-center gap-1.5">
                        {[0, 1, 2, 3].map(d => (
                          <div key={d} className="rounded-full transition-all duration-300" style={{ width: d < s.dots ? '16px' : '8px', height: '8px', background: d < s.dots ? '#076D9D' : '#CAEFFF' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="io-fade mt-12 flex flex-wrap items-center justify-center gap-4">
            <a href="https://www.koenig-solutions.com/corporate-it-training-courses" className="group inline-flex items-center gap-3 rounded-2xl px-8 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{ background: 'linear-gradient(135deg,#093148,#076D9D)' }}>
              Start Your Journey
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.18)' }}>→</span>
            </a>
            <button onClick={() => setAdvisorModalOpen(true)} className="hiw-outline-btn rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-sm font-bold text-[#076D9D] transition-all duration-300 hover:bg-[#076D9D] hover:text-white">
              Talk to an Advisor
            </button>
          </div>

        </div>
      </section>

      {/* ── Success Stories ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#E8F4FA] px-4 md:px-8 lg:px-[50px] py-5 sm:py-[35px]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.20) 0%, transparent 65%)' }} />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[350px] w-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -left-20 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.16) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="io-fade text-center" style={{ marginBottom: '35px' }}>
            <span className="mb-3 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-koenig-blue">Real Transformations</span>
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold text-koenig-dark">Stories That <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Speak for Themselves</span></h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-koenig-muted">Every number is real. Every name is used with permission. These are your peers — people who were exactly where you are and made the leap.</p>
          </div>

          {/* Stats bar */}
          <div className="io-fade mx-auto mb-10 max-w-3xl rounded-2xl bg-white px-6 py-5 shadow-md sm:px-10">
            <div className="grid grid-cols-2 gap-px bg-[#CAEFFF] sm:flex sm:flex-wrap sm:gap-0 sm:bg-transparent sm:divide-x sm:divide-[#CAEFFF] sm:items-center sm:justify-center">
              {[
                {
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                  val: '18,400+', label: 'Verified Reviews',
                },
                {
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                  val: '4.9 / 5',  label: 'Average Rating',
                },
                {
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
                  val: '95%',      label: 'Would Recommend',
                },
                {
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                  val: '1M+',      label: 'Professionals Trained',
                },
              ].map(s => (
                <div key={s.label} className="bg-white px-4 py-4 text-center sm:px-8 sm:py-1 sm:first:pl-0 sm:last:pr-0">
                  <div className="mb-1.5 flex items-center justify-center">{s.icon}</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#093148]">{s.val}</div>
                  <div className="mt-1 text-sm text-[#666]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: horizontal auto-scroll marquee + swipe */}
          <MobileTestimonialMarquee items={TESTIMONIALS} />

          {/* Desktop: 3-column auto-scroll */}
          <div
            className="hidden sm:block relative overflow-hidden"
            style={{
              height: '520px',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
            }}
          >
            <div className="grid grid-cols-3 gap-4 h-full">
              <HomeScrollColumn items={TESTIMONIALS.slice(0, 3)} speed={0.030} />
              <HomeScrollColumn items={TESTIMONIALS.slice(3, 6)} speed={0.025} />
              <HomeScrollColumn items={TESTIMONIALS.slice(6, 9)} speed={0.038} />
            </div>
          </div>

        </div>
      </section>

      {/* ── Live Schedule ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-koenig-light px-4 md:px-8 lg:px-[50px] py-5 sm:py-[35px]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.20) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 h-[300px] w-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.18) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">
          <div className="io-fade mb-[15px]">
            <span className="mb-1 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-koenig-blue">Guaranteed Schedules</span>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[32px] font-bold text-koenig-dark">Upcoming Batches — <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">July 2026</span></h2>
            <p className="text-sm text-koenig-muted">Every batch listed here is guaranteed to run. No cancellations.</p>
          </div>
          <div className="io-fade delay-1 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {SCHEDULE.map((s, i) => (
              <ScheduleCard key={i} s={s} />
            ))}
          </div>
          <div className="io-fade mt-8 flex justify-center">
            <a href="https://www.koenig-solutions.com/corporate-it-training-courses" className="group inline-flex shrink-0 items-center gap-3 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{ background: 'linear-gradient(135deg,#093148,#076D9D)' }}>
              View Full Schedule
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.18)' }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Awards ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white px-4 md:px-8 lg:px-[50px] py-5 sm:py-[35px]" style={{ borderTop: '1px solid #CAEFFF', borderBottom: '1px solid #CAEFFF' }}>
        <div className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[350px] w-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.18) 0%, transparent 70%)' }} />

        {/* Header */}
        <div className="mx-auto max-w-7xl">
          <div className="io-fade mb-4 sm:mb-8 text-center">
            <span className="mb-2 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-koenig-blue">Recognition</span>
            <h2 className="mb-2 text-lg sm:text-xl md:text-2xl lg:text-[32px] font-bold text-koenig-dark">Awards &amp; <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Recognition</span></h2>
            <p className="text-sm text-koenig-muted">Recognized by global vendors and quality bodies for training excellence</p>
          </div>

          {/* Award stats */}
          <div className="io-fade mb-4 mx-auto max-w-2xl rounded-2xl bg-white px-2 py-1" style={{ border: '1px solid #e8f4fb', boxShadow: '0 2px 16px rgba(6,148,209,0.08)' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {[
                { value: '10+',    label: 'Awards & Certifications',   color: '#0694d1', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/> },
                { value: '6+',     label: 'Global Partners',           color: '#0694d1', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/> },
                { value: '15 Yrs', label: 'Great Place to Work',       color: '#f59e0b', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/> },
                { value: '3×',     label: 'Microsoft Partner of Year', color: '#0694d1', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/> },
              ].map(({ value, label, icon, color }, i, arr) => (
                <div key={label} className={`flex flex-col items-center gap-1.5 px-4 py-5 text-center ${i < arr.length - 1 ? 'border-r border-gray-100' : ''} ${i >= 2 ? 'border-t border-gray-100 sm:border-t-0' : ''}`}>
                  <svg className="h-6 w-6 mb-1" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">{icon}</svg>
                  <div className="text-xl sm:text-2xl font-extrabold leading-tight text-koenig-dark">{value}</div>
                  <div className="text-xs text-koenig-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drag-scrollable marquee */}
        <AwardsMarquee awards={AWARDS} />
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-koenig-light px-4 md:px-8 lg:px-[50px] py-5 sm:py-[35px]">
        <div className="pointer-events-none absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.19) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.20) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.15) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">
          <div className="io-fade text-center" style={{ marginBottom: "35px" }}>
            <h2 className="mb-3 text-lg sm:text-xl md:text-2xl lg:text-[32px] font-bold text-koenig-dark">Frequently <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Asked Questions</span></h2>
            <p className="text-sm sm:text-base text-koenig-muted">Everything you need to know before booking your training</p>
          </div>
          {(() => {
            const HOME_FAQS = [
              { q: 'What is 1-on-1 training and how does it actually work?', a: '1-on-1 training pairs you with a dedicated certified instructor who delivers the entire course exclusively to you. You set the pace, ask unlimited questions, and customize focus areas. Sessions are live and interactive via video conferencing or in-person at our training centers.' },
              { q: 'Are Koenig certifications recognized globally?', a: 'Absolutely. Koenig is an authorized training partner for 50+ global technology vendors including Microsoft, Cisco, AWS, and CompTIA. All certifications are issued directly by the vendor and recognized worldwide.' },
              { q: 'What is the money-back guarantee?', a: 'If you are not satisfied with your training experience, we offer a 100% money-back guarantee. Our commitment is your success and your satisfaction — no questions asked, no conditions.' },
              { q: 'How does corporate/enterprise training work?', a: 'We design custom training programs for organizations of any size — from skills gap analysis and tailored curricula through dedicated instructors, volume pricing, and a real-time progress dashboard for L&D managers.' },
              { q: 'Can I reschedule my training if something comes up?', a: 'Yes. We offer flexible rescheduling with reasonable notice. Our guaranteed schedules mean your original dates always run as planned, but if your circumstances change, we will accommodate you.' },
              { q: 'Do all courses include hands-on lab access?', a: 'Yes. All training formats include hands-on lab environments that mirror real-world enterprise setups. Lab access is available during training and often extends beyond course completion for additional practice time.' },
              { q: 'What formats are available? What is FMAT?', a: 'We offer Classroom, Live Online, Flexi (self-paced schedule), and FMAT (Fast-Track Multi-Accelerated Training — multi-week content delivered in days for urgent upskilling needs). All include official courseware, labs, and exam prep.' },
              { q: 'How do I prepare for my certification exam?', a: 'Every Koenig course includes dedicated exam prep: practice tests, exam-taking strategies, and focused review sessions. Our 95% first-attempt pass rate reflects the effectiveness of our approach across 1M+ trained professionals.' },
            ]
            return (
              <div className="io-fade delay-1 flex flex-col gap-3 md:flex-row">
                <div className="flex flex-1 flex-col gap-3">
                  {HOME_FAQS.filter((_, i) => i % 2 === 0).map((f, j) => {
                    const i = j * 2; const isOpen = openFaq === i
                    return (
                      <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                        <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-6 sm:py-4">
                          <span className={`text-sm font-semibold leading-snug sm:text-base ${isOpen ? 'text-koenig-blue' : 'text-koenig-dark'}`} style={{ transition: 'color 0.3s' }}>{f.q}</span>
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                          </span>
                        </button>
                        <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                          <div style={{ overflow: 'hidden' }}>
                            <p className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed text-koenig-muted sm:px-6 sm:py-4 sm:text-base">{f.a}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  {HOME_FAQS.filter((_, i) => i % 2 !== 0).map((f, j) => {
                    const i = j * 2 + 1; const isOpen = openFaq === i
                    return (
                      <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                        <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-6 sm:py-4">
                          <span className={`text-sm font-semibold leading-snug sm:text-base ${isOpen ? 'text-koenig-blue' : 'text-koenig-dark'}`} style={{ transition: 'color 0.3s' }}>{f.q}</span>
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                          </span>
                        </button>
                        <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                          <div style={{ overflow: 'hidden' }}>
                            <p className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed text-koenig-muted sm:px-6 sm:py-4 sm:text-base">{f.a}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })()}
          <div className="mt-8 text-center">
            <p className="mb-3 text-sm sm:text-base text-koenig-muted">Still have questions?</p>
            <button className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-sm font-bold text-[#076D9D] transition-all hover:bg-[#076D9D] hover:text-white">
              Chat with a Training Advisor
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(7,109,157,0.12)' }}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Vendor Stack ──────────────────────────────────────── */}
      <VendorStack />

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer style={{ background: '#071929' }} className="text-white">

        {/* Newsletter + Social icons row */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="px-4 md:px-8 lg:px-[50px] py-8">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Newsletter */}
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
                <button className="rounded-r px-5 py-2 text-sm font-semibold text-white" style={{ background: '#0694D1' }}>
                  Subscribe
                </button>
              </div>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* YouTube */}
              <a href="https://www.youtube.com/user/KoenigSol" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ background: '#FF0000' }}>
                <svg className="h-4 w-4" fill="white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/KoenigSolutions" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ background: '#1877F2' }}>
                <svg className="h-4 w-4" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/koenigsolutions" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)' }}>
                <svg className="h-4 w-4" fill="white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/koenig-solutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ background: '#0A66C2' }}>
                <svg className="h-4 w-4" fill="white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              {/* X (Twitter) */}
              <a href="https://twitter.com/koenigsolutions" target="_blank" rel="noopener noreferrer" aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ background: '#000000' }}>
                <svg className="h-4 w-4" fill="white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Main link columns */}
        <div className="px-4 md:px-8 lg:px-[50px] py-10">
          <div className="mx-auto max-w-7xl">

            {/* Row 1: Company, Learning Options, Resources, Others */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 mb-10">
              {FOOTER_COLS.map(col => (
                <div key={col.heading}>
                  <h4 className="mb-4 text-sm font-semibold" style={{ color: '#0694D1' }}>{col.heading}</h4>
                  <ul className="space-y-2">
                    {col.links.map(link => (
                      <li key={link}>
                        <a href={FOOTER_LINK_HREFS[link] ?? '#'} className="text-sm leading-snug text-white/80 transition-colors hover:text-white">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Row 2: Top Technologies, Top Partners, Top Courses (spans 2 cols) */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
              {FOOTER_BOTTOM_COLS.map(col => (
                <div key={col.heading}>
                  <h4 className="mb-4 text-sm font-semibold" style={{ color: '#0694D1' }}>{col.heading}</h4>
                  <ul className="space-y-2">
                    {col.links.map(link => (
                      <li key={link}>
                        <a href="#" className="text-sm leading-snug text-white/80 transition-colors hover:text-white">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {/* Top Courses — 2 sub-columns */}
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
            {/* DMCA Badge */}
            <div className="shrink-0">
              <a href="https://www.dmca.com/Protection/Status.aspx?ID=koenig-solutions" target="_blank" rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dmca.png" alt="DMCA Protected" style={{ width: '62px', height: '62px' }} />
              </a>
            </div>
          </div>
        </div>

        {/* Philosophy tagline */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} className="px-4 md:px-8 lg:px-[50px] py-5">
          <p className="mx-auto max-w-7xl text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            We believe in the philosophy To Err is Human, to Admit Divine! We are not perfect but we are trying. Keep visiting our website, you will see improvements and occasional blunders, Feel free to tell us how we can improve by writing to{' '}
            <a href="mailto:webmaster@koenig-solutions.com" className="text-[#0694D1] hover:underline">webmaster@koenig-solutions.com</a>
          </p>
        </div>

      </footer>

      {/* ── Chatbot widget (Design 5 style) ──────────────────────── */}

      {/* Popup — always rendered, toggled via opacity/translateY */}
      <div
        className="fixed z-50 overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300"
        style={{
          bottom: '7rem',
          right: '1rem',
          width: 'calc(100vw - 2rem)',
          maxWidth: '340px',
          opacity: chatOpen ? 1 : 0,
          transform: chatOpen ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: chatOpen ? 'auto' : 'none',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ background: '#093148' }}>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            <div>
              <p className="text-sm font-bold text-white">KOENIG Solutions</p>
              <p className="text-sm text-gray-300">Online | Typically replies instantly</p>
            </div>
          </div>
          <button
            onClick={() => setChatOpen(false)}
            className="text-white/70 transition-colors hover:text-white"
            aria-label="Close chat"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="space-y-3 p-4" style={{ background: '#F8F9FA' }}>
          {/* Bot bubble 1 */}
          <div
            className="max-w-[85%] rounded-2xl rounded-tl-none p-3 text-sm text-white"
            style={{ background: '#076D9D' }}
          >
            👋 Hello! Welcome to Koenig Solutions.
          </div>
          {/* Bot bubble 2 */}
          <div
            className="max-w-[85%] rounded-2xl rounded-tl-none p-3 text-sm text-white"
            style={{ background: '#076D9D' }}
          >
            How can I help you today?
          </div>
          {/* Quick replies */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              '🎓 Browse Courses',
              '💬 Talk to Advisor',
              '📅 Course Schedule',
              '💰 Get a Quote',
            ].map(q => (
              <button
                key={q}
                className="cursor-pointer rounded-full border bg-white px-3 py-1 text-sm transition-all duration-150"
                style={{ borderColor: '#076D9D', color: '#076D9D' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#076D9D'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#076D9D' }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Footer / input */}
        <div className="flex gap-2 border-t border-gray-200 bg-white p-3">
          <input
            type="text"
            placeholder="Type a message..."
            aria-label="Chat message"
            value={chatMsg}
            onChange={e => setChatMsg(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') setChatMsg('') }}
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm outline-none transition-colors focus:border-[#076D9D]"
          />
          <button
            onClick={() => setChatMsg('')}
            aria-label="Send"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90"
            style={{ background: '#076D9D' }}
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating chat button */}
      <button
        onClick={() => setChatOpen(v => !v)}
        aria-label="Open chat"
        className="fixed z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-2xl transition-transform duration-200 hover:scale-105 sm:h-14 sm:w-14"
        style={{ bottom: '1rem', right: '1rem', background: '#076D9D' }}
      >
        {/* Ping ring */}
        <span className="absolute inset-0 animate-ping rounded-full opacity-40" style={{ background: '#076D9D' }} />
        {/* Icon toggles */}
        {chatOpen ? (
          <svg className="relative h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="relative h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/>
          </svg>
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

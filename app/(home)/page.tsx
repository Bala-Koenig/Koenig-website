'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import VendorStack from '@/components/VendorStack'

/* ─── Data ──────────────────────────────────────────────────── */

const MORPH_WORDS = [
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
    vendor: 'Microsoft', vendorBadge: 'Advanced', name: 'Microsoft Azure Solutions Architect Expert – Designing and Implementing Infrastructure Solutions for Enterprise-Scale Cloud Environments (AZ-305)',
    days: 5, rating: 4.9, enrolled: '2,400+', price: '$1,495',
    levelColor: 'bg-blue-100 text-blue-700', hot: true, level: 'Advanced',
  },
  {
    vendor: 'AWS', vendorBadge: 'Associate', name: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
    days: 4, rating: 4.8, enrolled: '3,100+', price: '$1,195',
    levelColor: 'bg-orange-100 text-orange-700', hot: true, level: 'Intermediate',
  },
  {
    vendor: 'Cisco', vendorBadge: 'Professional', name: 'Cisco CCNP Enterprise Core (ENCOR) 350-401',
    days: 5, rating: 4.9, enrolled: '1,800+', price: '$1,295',
    levelColor: 'bg-blue-100 text-blue-700', hot: false, level: 'Advanced',
  },
  {
    vendor: 'CompTIA', vendorBadge: 'Foundation', name: 'CompTIA Security+ Certification Training (SY0-701)',
    days: 5, rating: 4.7, enrolled: '4,200+', price: '$895',
    levelColor: 'bg-green-100 text-green-700', hot: false, level: 'Beginner',
  },
  {
    vendor: 'PMI', vendorBadge: 'Professional', name: 'Project Management Professional (PMP) Certification',
    days: 3, rating: 4.8, enrolled: '2,900+', price: '$995',
    levelColor: 'bg-purple-100 text-purple-700', hot: false, level: 'Intermediate',
  },
  {
    vendor: 'EC-Council', vendorBadge: 'Intermediate', name: 'Certified Ethical Hacker v13 (CEH) – Master Advanced Penetration Testing, Ethical Hacking & Cyber Defence Strategies',
    days: 5, rating: 4.8, enrolled: '2,100+', price: '$1,095',
    levelColor: 'bg-indigo-100 text-indigo-700', hot: false, level: 'Intermediate',
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
]

const NEW_TRENDING = [
  {
    vendor: 'Microsoft', vendorBadge: 'New', name: 'Microsoft Copilot Studio – Build AI-Powered Chatbots',
    days: 3, rating: 4.8, enrolled: '890+', price: '$895',
    levelColor: 'bg-blue-100 text-blue-700', hot: true, level: 'Beginner',
  },
  {
    vendor: 'Google Cloud', vendorBadge: 'Updated', name: 'Google Cloud Professional Data Engineer – Building Scalable Data Pipelines & ML Solutions on GCP',
    days: 4, rating: 4.7, enrolled: '1,200+', price: '$1,095',
    levelColor: 'bg-green-100 text-green-700', hot: false, level: 'Advanced',
  },
  {
    vendor: 'Kubernetes', vendorBadge: 'Trending', name: 'Certified Kubernetes Administrator (CKA) Exam Prep',
    days: 4, rating: 4.9, enrolled: '1,600+', price: '$995',
    levelColor: 'bg-pink-100 text-pink-700', hot: true, level: 'Advanced',
  },
  {
    vendor: 'HashiCorp', vendorBadge: 'New', name: 'HashiCorp Certified: Terraform Associate (003)',
    days: 3, rating: 4.7, enrolled: '720+', price: '$795',
    levelColor: 'bg-purple-100 text-purple-700', hot: false, level: 'Intermediate',
  },
  {
    vendor: 'AWS', vendorBadge: 'Updated', name: 'AWS Certified AI Practitioner – Foundations (AIF-C01)',
    days: 3, rating: 4.8, enrolled: '1,100+', price: '$895',
    levelColor: 'bg-orange-100 text-orange-700', hot: true, level: 'Beginner',
  },
  {
    vendor: 'Microsoft', vendorBadge: 'New', name: 'Azure AI Engineer Associate (AI-102) Certification',
    days: 4, rating: 4.8, enrolled: '960+', price: '$995',
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
  { name: 'ISACA',              tier: 'Authorized Partner',  courses: '60+',  initial: 'I', img: undefined },
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
  { name: 'Archura',                     tier: 'Authorized Partner',  courses: '20+',  initial: 'A', img: 'Arcituralogo.png' },
  { name: 'Mirantis',                    tier: 'Training Partner',    courses: '15+',  initial: 'M', img: 'mirantistraining.png' },
  { name: 'EXIN',                        tier: 'Authorized Partner',  courses: '40+',  initial: 'E', img: 'EXIN.png' },
  { name: 'Cloud Security Alliance',     tier: 'Authorized Partner',  courses: '25+',  initial: 'C', img: 'cloud-security-alliance.png' },
  { name: 'OffSec Training',             tier: 'Learning Partner',    courses: '20+',  initial: 'O', img: 'OffSecLearningPartnerDarkPNG (1).png' },
  { name: 'Cloudera',                    tier: 'Training Partner',    courses: '30+',  initial: 'C', img: 'cloudera (1).png' },
  { name: 'GAQM',                        tier: 'Authorized Partner',  courses: '25+',  initial: 'G', img: undefined },
  { name: 'Cloud Credential Council',    tier: 'Authorized Partner',  courses: '20+',  initial: 'C', img: 'CCC_Logo.png' },
  { name: 'LPI',                         tier: 'Authorized Partner',  courses: '15+',  initial: 'L', img: 'Linux.png' },
  { name: 'Symantec',                    tier: 'Authorized Partner',  courses: '20+',  initial: 'S', img: 'Symantec.png' },
  { name: 'DASA',                        tier: 'Authorized Partner',  courses: '15+',  initial: 'D', img: 'Vendor-Dasa.png' },
  { name: 'C++ Institute',               tier: 'Authorized Partner',  courses: '10+',  initial: 'C', img: 'c-plus-2-logo.png' },
]

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
  { vendor: 'Microsoft', name: 'Azure Solutions Architect Expert', date: 'Mar 3, 2026', days: 5, format: 'Live Online', tz: 'IST / GST / GMT', seats: 2, seatColor: 'bg-red-50 text-red-600' },
  { vendor: 'AWS', name: 'AWS Solutions Architect – Associate', date: 'Mar 5, 2026', days: 4, format: 'Classroom — Delhi', tz: 'IST', seats: 4, seatColor: 'bg-orange-50 text-orange-600' },
  { vendor: 'CompTIA', name: 'CompTIA Security+ SY0-701', date: 'Mar 10, 2026', days: 5, format: 'Live Online', tz: 'EST / GMT / IST', seats: 6, seatColor: 'bg-green-50 text-green-600' },
  { vendor: 'Cisco', name: 'CCNP Enterprise Core (ENCOR)', date: 'Mar 12, 2026', days: 5, format: 'Classroom — Dubai', tz: 'IST', seats: 3, seatColor: 'bg-red-50 text-red-600' },
  { vendor: 'PMI', name: 'Project Management Professional (PMP)', date: 'Mar 17, 2026', days: 3, format: 'Live Online', tz: 'All timezones', seats: 8, seatColor: 'bg-green-50 text-green-600' },
  { vendor: 'EC-Council', name: 'Certified Ethical Hacker (CEH v13)', date: 'Mar 19, 2026', days: 5, format: 'Classroom — London', tz: 'IST', seats: 2, seatColor: 'bg-red-50 text-red-600' },
]

const COUNTRIES = [
  { flag: '🇮🇳', name: 'India',          cities: 'Delhi · Bangalore', hub: true,  landmark: '🕌', landmarkLabel: 'Taj Mahal'         },
  { flag: '🇺🇸', name: 'USA',            cities: 'New York · Chicago', hub: false, landmark: '🗽', landmarkLabel: 'Statue of Liberty'  },
  { flag: '🇦🇪', name: 'UAE',            cities: 'Dubai',              hub: true,  landmark: '🏙️', landmarkLabel: 'Burj Khalifa'       },
  { flag: '🇬🇧', name: 'United Kingdom', cities: 'London',             hub: false, landmark: '🎡', landmarkLabel: 'London Eye'         },
  { flag: '🇸🇬', name: 'Singapore',      cities: 'Singapore',          hub: false, landmark: '🦁', landmarkLabel: 'Merlion'            },
  { flag: '🇿🇦', name: 'South Africa',   cities: 'Johannesburg',       hub: false, landmark: '🏔️', landmarkLabel: 'Table Mountain'     },
  { flag: '🇦🇺', name: 'Australia',      cities: 'Sydney',             hub: false, landmark: '🦘', landmarkLabel: 'Kangaroo'           },
  { flag: '🇨🇦', name: 'Canada',         cities: 'Toronto',            hub: false, landmark: '🍁', landmarkLabel: 'Maple Leaf'         },
  { flag: '🇩🇪', name: 'Germany',        cities: 'Frankfurt',          hub: false, landmark: '🏛️', landmarkLabel: 'Brandenburg Gate'   },
  { flag: '🇳🇱', name: 'Netherlands',    cities: 'Amsterdam',          hub: false, landmark: '🌷', landmarkLabel: 'Tulip Fields'       },
  { flag: '🇧🇭', name: 'Bahrain',        cities: 'Manama',             hub: false, landmark: '🌊', landmarkLabel: 'Pearl Monument'     },
  { flag: '🇶🇦', name: 'Qatar',          cities: 'Doha',               hub: false, landmark: '🌴', landmarkLabel: 'The Pearl'          },
  { flag: '🇰🇪', name: 'Kenya',          cities: 'Nairobi',            hub: false, landmark: '🐘', landmarkLabel: 'Safari Wildlife'    },
]

const TESTIMONIALS = [
  { quote: 'I went from IT support to Cloud Architect in 6 months. The 1-on-1 format was a game-changer — my instructor built every session around my specific gaps, not a generic syllabus.', name: 'Ravi Mehta', location: '🇮🇳 India', course: 'Azure Solutions Architect Expert', date: '18th Feb 2026', initials: 'RM', avatarBg: 'linear-gradient(135deg,#076D9D,#4DBFEF)', avatar: '/images/headshots/headshot-1.webp', ringColor: '#4F8EF7' },
  { quote: 'The guaranteed schedule gave me the confidence to hand in my notice and make the career change. My instructor had real enterprise experience — not just textbook knowledge.', name: "James O'Brien", location: '🇬🇧 United Kingdom', course: 'CompTIA Security+ SY0-701', date: '17th Feb 2026', initials: 'JO', avatarBg: 'linear-gradient(135deg,#093148,#076D9D)', avatar: '/images/headshots/headshot-4.png', ringColor: '#F59E0B' },
  { quote: "Koenig's FMAT format let me complete CCNP in under 2 weeks. Same quality, same dedication — just compressed for my timeline. My employer was shocked.", name: 'Farah Zahir', location: '🇦🇪 UAE', course: 'CCNP Enterprise Core (ENCOR)', date: '16th Feb 2026', initials: 'FZ', avatarBg: 'linear-gradient(135deg,#F47920,#f6a05c)', avatar: '/images/headshots/headshot-2.webp', ringColor: '#EC4899' },
  { quote: 'Rahul was an excellent trainer. His deep knowledge of the subject and patient teaching style made complex topics easy to understand.', name: 'Elena Mancini', location: '🇮🇹 Italy', course: 'SC-300 Microsoft Identity', date: '18th Feb 2026', initials: 'EM', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)', avatar: '/images/headshots/headshot-5.webp', ringColor: '#8B5CF6' },
  { quote: 'Fantastic course, great instructor. The PMP prep was thorough and the practice exams were spot on. Passed first attempt!', name: 'Jackson Tate', location: '🇺🇸 USA', course: 'PMP Certification', date: '11th Feb 2026', initials: 'JT', avatarBg: 'linear-gradient(135deg,#093148,#F47920)', avatar: '/images/headshots/headshot-3.webp', ringColor: '#10B981' },
  { quote: 'The AWS course exceeded all expectations. The instructor had real-world cloud experience and the hands-on labs were invaluable. I landed a senior cloud role within a month of certifying.', name: 'Priya Sharma', location: '🇸🇬 Singapore', course: 'AWS Solutions Architect – Associate', date: '5th Feb 2026', initials: 'PS', avatarBg: 'linear-gradient(135deg,#F47920,#076D9D)', avatar: '/images/headshots/headshot-2.webp', ringColor: '#F59E0B' },
  { quote: 'Koenig made the impossible possible. I completed my CISSP in 3 weeks with their intensive 1-on-1 training. The instructor adapted the pace perfectly to my background.', name: 'Ahmed Al-Rashid', location: '🇦🇪 UAE', course: 'CISSP Certification', date: '2nd Feb 2026', initials: 'AA', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)', avatar: '/images/headshots/headshot-4.png', ringColor: '#06B6D4' },
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

/* ─── Helpers ───────────────────────────────────────────────── */

function StarsFilled({ n = 5 }: { n?: number }) {
  return <span className="text-yellow-400 text-xs">{'★'.repeat(n)}</span>
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
        <p className="mb-1 text-xs font-medium" style={{ color: '#076D9D' }}>{v.tier}</p>
        <p className="text-xs font-medium" style={{ color: '#0694d1' }}>{v.courses} Courses</p>
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
  const isLong = t.quote.length > 120
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border-2 bg-white transition-all duration-300"
      style={{
        borderColor: hovered ? '#076D9D' : 'transparent',
        boxShadow: hovered ? '0 20px 50px rgba(7,109,157,0.18)' : '0 2px 12px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-8px)' : 'none',
        animation: `cardFadeUp 0.45s cubic-bezier(0.22,1,0.36,1) ${delay} both`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top */}
      <div className="flex flex-1 flex-col p-7">
        {/* User row */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm sm:text-base font-bold text-white shadow-md" style={{ background: t.avatarBg, border: '3px solid white' }}>
            {t.initials}
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-koenig-dark">{t.name}</div>
            <div className="text-xs font-semibold text-koenig-blue">{t.location}</div>
          </div>
          <span className="ml-auto self-start text-2xl sm:text-3xl md:text-4xl font-black leading-none text-[#E8F4FA]">&ldquo;</span>
        </div>
        {/* Stars */}
        <div className="mb-3 text-sm text-yellow-400">★★★★★</div>
        {/* Review text */}
        <p className={`mb-4 flex-1 text-xs sm:text-sm leading-relaxed text-[#444] ${!expanded && isLong ? 'line-clamp-3' : ''}`}>
          {t.quote}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(v => !v)}
            className="w-fit rounded-full border border-koenig-blue px-4 py-1.5 text-xs font-semibold text-koenig-blue transition-all hover:bg-koenig-blue hover:text-white"
          >
            {expanded ? 'Show Less ↑' : 'Show More ↓'}
          </button>
        )}
      </div>
      {/* Bottom */}
      <div className="flex items-center justify-between border-t border-[#E8F4FA] bg-[#F8FCFF] px-7 py-4">
        <div>
          <div className="text-xs sm:text-sm font-bold text-koenig-dark">{t.course}</div>
          <div className="mt-0.5 text-xs text-[#999]">{t.date}</div>
        </div>
        <span className="rounded-full bg-[#E8F4FA] px-3 py-1 text-xs font-bold text-koenig-blue">✓ Verified</span>
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
        <h3 className="mb-0.5 text-center text-xs sm:text-sm font-bold text-koenig-dark">{t.name}</h3>
        <p className="mb-4 text-center text-xs font-semibold text-koenig-blue">{t.location}</p>
        <p className={`flex-1 text-center text-xs sm:text-sm leading-relaxed text-gray-500 ${!expanded && isLong ? 'line-clamp-4' : ''}`}>
          {t.quote}
        </p>
        {isLong && !expanded && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setExpanded(true)}
              className="flex items-center gap-1.5 rounded-full border border-koenig-blue px-5 py-1.5 text-xs font-semibold text-koenig-blue transition-colors hover:bg-koenig-blue hover:text-white"
            >
              Show More <span className="text-base leading-none">↓</span>
            </button>
          </div>
        )}
      </div>
      {/* Bottom: course + date */}
      <div className="border-t border-dashed border-gray-200 px-6 py-4 text-center">
        <p className="mb-1 text-xs sm:text-sm font-semibold text-koenig-dark">{t.course}</p>
        <p className="text-xs text-koenig-muted">{t.date}</p>
      </div>
    </div>
  )
}

const KOENIG_BADGE = 'bg-[#076D9D]/30 text-[#3AB6EB] ring-1 ring-[#0694D1]/40'
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

function CourseCard({ c }: { c: typeof TOP_COURSES[0] }) {
  const badgeColor = VENDOR_BADGE_COLORS[c.vendor] ?? KOENIG_BADGE
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [isClamped, setIsClamped] = useState(false)
  useEffect(() => {
    const el = nameRef.current
    if (el) setIsClamped(el.scrollHeight > el.clientHeight)
  }, [c.name])
  return (
    <div
      role="button" tabIndex={0}
      className="group relative cursor-pointer rounded-xl p-5 transition-all duration-300 hover:-translate-y-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-koenig-blue"
      style={{ background: 'rgba(8,24,42,0.60)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(6,148,209,0.20)', boxShadow: '0 4px 16px rgba(0,0,0,0.30)' }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badgeColor}`}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            {c.vendor}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
            c.level === 'Beginner'     ? 'bg-[#0694d1]/20 text-[#3AB6EB]' :
            c.level === 'Intermediate' ? 'bg-[#076d9d]/20 text-[#6CCFEE]' :
                                         'bg-[#076d9d] text-white'
          }`}>{c.level}</span>
        </div>
        {c.hot && <span className="animate-pulse rounded-full bg-koenig-blue px-2 py-0.5 text-[11px] font-medium text-white">Popular</span>}
      </div>
      <div className="group/name relative mb-1.5">
        <h3
          ref={nameRef}
          className="text-sm font-semibold text-white transition-colors group-hover:text-[#3AB6EB] leading-5 cursor-default"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >{c.name}</h3>
        {/* Tooltip — only renders when text is actually truncated */}
        {isClamped && (
          <div
            className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-64 rounded-xl px-3 py-2.5 text-xs font-medium text-white opacity-0 shadow-2xl transition-all duration-200 group-hover/name:opacity-100 group-hover/name:translate-y-0 translate-y-1"
            style={{ background: 'rgba(5,18,38,0.97)', border: '1px solid rgba(6,148,209,0.35)', backdropFilter: 'blur(12px)', lineHeight: '1.6', boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(6,148,209,0.15) inset' }}
          >
            {c.name}
            <span className="absolute -bottom-[5px] left-5 h-2.5 w-2.5 rotate-45" style={{ background: 'rgba(5,18,38,0.97)', borderRight: '1px solid rgba(6,148,209,0.35)', borderBottom: '1px solid rgba(6,148,209,0.35)' }} />
          </div>
        )}
      </div>
      <div className="mb-3 flex items-center gap-2 text-xs text-white/50">
        <span>{c.enrolled} enrolled</span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {c.days * 8} Hrs ({c.days} days)
        </span>
      </div>
      <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: 'rgba(6,148,209,0.15)' }}>
        <div>
          <p className="text-xs text-white/40">From</p>
          <p className="text-sm sm:text-base font-bold text-white">{c.price}</p>
        </div>
        <button className="rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all group-hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #0694d1, #076D9D)' }}>
          Enroll Now →
        </button>
      </div>
    </div>
  )
}

function ScheduleCard({ s }: { s: typeof SCHEDULE[0] }) {
  const badgeColor = VENDOR_BADGE_COLORS[s.vendor] ?? KOENIG_BADGE
  const isLive = s.format === 'Live Online'
  const urgent = s.seats <= 3
  return (
    <div
      role="button" tabIndex={0}
      className="group relative cursor-pointer rounded-xl bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-koenig-blue"
      style={{ border: '1px solid #CAEFFF', boxShadow: '0 4px 16px rgba(0, 164, 239, 0.10)' }}
    >
      {/* Row 1 — vendor badge + format badge | seats badge */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badgeColor}`}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            {s.vendor}
          </span>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${
            isLive ? 'bg-[#EBF8FE] text-[#0694d1]' : 'bg-[#076d9d] text-white'
          }`}>
            {isLive
              ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="13" rx="2"/><polyline points="8 21 12 17 16 21"/><line x1="2" y1="16" x2="22" y2="16"/></svg>
              : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            }
            {isLive ? 'Live Online' : 'Classroom'}
          </span>
        </div>
        <span className={`${urgent ? 'animate-pulse' : ''} rounded-full px-2 py-0.5 text-[11px] font-medium ${s.seatColor}`}>
          {s.seats} seats left
        </span>
      </div>

      {/* Row 2 — course name */}
      <h3 className="mb-1.5 text-sm sm:text-base font-semibold text-koenig-navy transition-colors group-hover:text-koenig-blue">{s.name}</h3>

      {/* Row 3 — meta: date · hrs · timezone */}
      <div className="mb-3 flex items-center gap-2 text-xs sm:text-sm text-koenig-gray">
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          {s.date}
        </span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {s.days * 8} Hrs ({s.days} days)
        </span>
        <span>·</span>
        <span className="flex items-center gap-1 truncate">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          {s.tz}
        </span>
      </div>

      {/* Row 4 — footer: location | button */}
      <div className="flex items-center justify-between border-t border-koenig-border pt-3">
        <div>
          <p className="text-xs text-koenig-muted">Location</p>
          <p className="flex items-center gap-1 text-sm sm:text-base font-bold text-koenig-dark">
            {isLive
              ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="13" rx="2"/><polyline points="8 21 12 17 16 21"/><line x1="2" y1="16" x2="22" y2="16"/></svg>
              : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            }
            {s.format}
          </p>
        </div>
        <button className="rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all group-hover:shadow-lg" style={{ background: '#093148' }}>
          Reserve My Seat →
        </button>
      </div>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */

/* ─── Dropdown data ─────────────────────────────────────────── */
const ABOUT_LINKS = ['About Us','Our Clientele','Leadership','Our Partners','Happiness Guarantee','Student Feedback','Testimonials','Koenig Koshish','Our Awards']
const LEARNING_LINKS = ['Live Online Training','Classroom Training','1-on-1 Training','Fly-Me-a-Trainer','Flexi','Customized Training','Webinar as a Service','Qubits','Upcoming Webinars','Learnova']

/* ─── Footer column data ─────────────────────────────────────── */
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
              <span className="rounded-full border border-[#CAEFFF] px-3 py-0.5 text-xs font-semibold text-koenig-muted">{a.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Design4Page() {
  const [tab, setTab] = useState('Top Courses')
  const [mobileOpen, setMobileOpen] = useState(false)
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
  const [activeStep, setActiveStep] = useState(0)
  const [stepPaused, setStepPaused] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [orgTab, setOrgTab] = useState<'enterprise' | 'global'>('enterprise')
  const [hoveredCountry, setHoveredCountry] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [morphIdx, setMorphIdx] = useState(0)
  const [morphExiting, setMorphExiting] = useState(false)
  const [testimStart, setTestimStart] = useState(0)
  const [webinarStart, setWebinarStart] = useState(0)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroPaused) return
    const timer = setInterval(() => {
      setHeroSlide(s => (s + 1) % 3)
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
      { threshold: 0.1 }
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



  return (
    <div className="min-h-screen overflow-x-clip bg-white" style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>

      {/* ── Global styles & keyframes ──────────────────────────── */}
      <style>{`
        /* ── Testimonial card fade-up ── */
        @keyframes cardFadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }

        /* ── Morphing hero word ── */
        @keyframes morphWordIn  { from { opacity:0; filter:blur(10px); transform:translateY(14px);  } to { opacity:1; filter:blur(0); transform:translateY(0); } }
        @keyframes morphWordOut { from { opacity:1; filter:blur(0);    transform:translateY(0);     } to { opacity:0; filter:blur(10px); transform:translateY(-14px); } }
        .morph-word-in  { animation: morphWordIn  0.52s cubic-bezier(0.22,1,0.36,1) both; }
        .morph-word-out { animation: morphWordOut 0.34s ease-in both; }

        /* Scroll-triggered fade-in-up */
        .io-fade { opacity: 0; transform: translateY(10px); transition: opacity 0.18s ease-out, transform 0.18s ease-out; }
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
      <div className="hidden md:block px-4 lg:px-[50px]" style={{ background: '#061624' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-1.5 text-[11px] text-white/75">
          <div className="flex flex-wrap items-center gap-3">
            <a href="tel:+14129537506" className="flex items-center gap-1 transition-colors hover:text-white/80">
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              +1 412 953 7506
            </a>
            <span className="text-white/15">|</span>
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.843L0 24l6.305-1.654A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5.007-1.371l-.359-.214-3.742.981.999-3.65-.234-.375A9.818 9.818 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>
              +91-984-072-2417 <span className="ml-0.5 text-white/25">(Chat Only)</span>
            </span>
            <span className="text-white/15">|</span>
            <a href="mailto:info@koenig-solutions.com" className="flex items-center gap-1 transition-colors hover:text-white/80">
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              info@koenig-solutions.com
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navbar */}
      <header
        className={`sticky top-0 z-50 px-4 lg:px-[50px] transition-shadow duration-200 ${scrolled ? 'shadow-lg shadow-black/30' : ''}`}
        style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}
        onClick={e => { if ((e.target as HTMLElement).closest('[data-dropdown]') === null) setOpenDropdown(null) }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 py-2 lg:py-3">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image src="/images/koenig-logo.svg" alt="Koenig Solutions" width={120} height={32} className="h-7 w-auto lg:h-8" />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-4 lg:flex">
            {/* All Courses — box with 8px radius */}
            <button
              className="flex items-center px-3 py-2.5 text-xs sm:text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: '#0694D1', borderRadius: '8px', gap: '8px' }}
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
              All Courses
              <svg className="h-3 w-3 opacity-70 -ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
            </button>
            <a href="#" className="flex items-center gap-1 px-1 py-2 text-sm font-medium transition-colors" style={{ color: '#093148' }} onMouseEnter={e => (e.currentTarget.style.color = '#0694D1')} onMouseLeave={e => (e.currentTarget.style.color = '#093148')}>Technologies<svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg></a>
            <a href="#" className="flex items-center gap-1 px-1 py-2 text-sm font-medium transition-colors" style={{ color: '#093148' }} onMouseEnter={e => (e.currentTarget.style.color = '#0694D1')} onMouseLeave={e => (e.currentTarget.style.color = '#093148')}>Vendors<svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg></a>
            <a href="#" className="flex items-center gap-1 px-1 py-2 text-sm font-medium transition-colors" style={{ color: '#093148' }} onMouseEnter={e => (e.currentTarget.style.color = '#0694D1')} onMouseLeave={e => (e.currentTarget.style.color = '#093148')}>About<svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg></a>
            <a href="#" className="flex items-center gap-1 px-1 py-2 text-sm font-medium transition-colors" style={{ color: '#093148' }} onMouseEnter={e => (e.currentTarget.style.color = '#0694D1')} onMouseLeave={e => (e.currentTarget.style.color = '#093148')}>Contact<svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg></a>
          </nav>

          {/* Right — search + login + hamburger */}
          <div className="ml-auto flex items-center gap-2">
            {/* Search */}
            <div className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 transition-all focus-within:border-[#0694D1] focus-within:bg-white lg:flex">
              <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input type="text" placeholder="Search courses…" aria-label="Search courses" className="w-36 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none" />
            </div>
            {/* Login */}
            <a
              href="https://mykoenig.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors lg:inline-block"
              style={{ borderColor: '#093148', color: '#093148' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#093148'; e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#093148'; }}
            >
              Login
            </a>
            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden"
              style={{ color: '#093148' }}
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

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="-mx-4 lg:-mx-[50px] border-t lg:hidden" style={{ background: '#0d3a5c', borderColor: '#0D4A6B' }}>
            <div className="mx-auto max-w-7xl space-y-0.5 px-4 py-3">
              {/* Contact info mobile */}
              <div className="mb-3 space-y-1.5 pb-3 text-xs" style={{ borderBottom: '1px solid #0D4A6B' }}>
                <a href="tel:+14129537506" className="flex items-center gap-2 transition-colors hover:text-white" style={{ color: '#A8C8E0' }}>
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                  +1 412 953 7506
                </a>
                <a href="mailto:info@koenig-solutions.com" className="flex items-center gap-2 transition-colors hover:text-white" style={{ color: '#A8C8E0' }}>
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                  info@koenig-solutions.com
                </a>
              </div>
              {/* Nav links */}
              {['All Courses','About Koenig','Learning Options','Contact Us'].map(item => (
                <a key={item} href="#" className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white" style={{ color: '#A8C8E0' }}>{item}</a>
              ))}
              {/* Search mobile */}
              <div className="pt-2">
                <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/8 px-3 py-2">
                  <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <input type="text" placeholder="Search courses…" aria-label="Search courses" className="flex-1 bg-transparent text-sm text-white placeholder-white/60 outline-none" />
                </div>
              </div>
              <a
                href="https://mykoenig.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block rounded-lg border border-white/30 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Login
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex items-center overflow-hidden px-4 lg:px-[50px] py-[60px]" style={{ background: '#06111E' }}>
        {/* Hero keyframes */}
        <style>{`
          @keyframes heroFadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
          @keyframes heroSlideL { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
          .h-fade-up { animation: heroFadeUp 0.7s ease both; }
          .h-slide-l { animation: heroSlideL 0.6s ease both; }
          .h-d1{animation-delay:0.05s} .h-d2{animation-delay:0.20s} .h-d3{animation-delay:0.35s} .h-d4{animation-delay:0.50s} .h-d5{animation-delay:0.65s}
          .hero-search:focus-within { border-color:#076D9D; box-shadow:0 0 0 3px rgba(7,109,157,0.25); }
          @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
          @keyframes statFadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          .stat-box-a { animation: statFadeIn 0.6s ease both, floatA 4s ease-in-out 0.6s infinite; }
          .stat-box-b { animation: statFadeIn 0.6s ease both 0.15s, floatB 4.5s ease-in-out 0.75s infinite; }
          .stat-box-c { animation: statFadeIn 0.6s ease both 0.3s,  floatB 4s ease-in-out 1s infinite; }
          .stat-box-d { animation: statFadeIn 0.6s ease both 0.45s, floatA 4.5s ease-in-out 0.5s infinite; }
        `}</style>

        {/* Background image */}
        <div className="pointer-events-none absolute inset-0">
          <img src="/images/home-baner.png" alt="" className="h-full w-full object-cover object-center" style={{ opacity: 0.55 }} />
        </div>
        {/* Dark navy/teal gradient overlay — matches reference */}
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 45%, #040C18 100%)', opacity: 0.78 }} />
        {/* Dot-grid particle layer */}
        <div className="dot-grid pointer-events-none absolute inset-0" />
        {/* Animated blobs */}
        <div className="blob1 pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="blob2 pointer-events-none absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="blob3 pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-sky-200/10 blur-3xl" />


        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* ── Left: text content ── */}
            <div className="flex-1 text-center lg:text-left">

              {/* Announcement pill */}
              <div className="h-fade-up mb-5 flex justify-center lg:justify-start">
                <div className="flex items-center gap-2.5 rounded-full px-5 py-2 text-sm font-medium text-white" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.30)', boxShadow: '0 0 0 1px rgba(255,255,255,0.08) inset' }}>
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                  </span>
                  <span><span className="font-semibold text-white">New batches</span> starting this week —&nbsp;<span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold" style={{ color: '#053148' }}>47 seats remaining</span></span>
                </div>
              </div>

              {/* Main headline — 2 lines with morphing word */}
              <h1 className="h-fade-up h-d2 mb-5 font-bold leading-tight tracking-tight">
                <span className="block text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl">
                  Master Any{' '}
                  <span
                    key={morphIdx}
                    className={`inline ${morphExiting ? 'morph-word-out' : 'morph-word-in'}`}
                    style={{ color: '#C8EEFF', textShadow: '0 0 28px rgba(6,148,209,0.9), 0 0 55px rgba(6,148,209,0.45)' }}
                  >
                    {MORPH_WORDS[morphIdx]}
                  </span>
                </span>
                <span className="block text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl">in Record Time</span>
              </h1>

              {/* Subtext */}
              <p className="h-fade-up h-d3 mx-auto mb-6 max-w-2xl text-sm text-white sm:text-base lg:mx-0">
                30+ years. 5,000+ courses. 1M+ professionals certified. The world trusts Koenig to deliver results that matter.
              </p>

              {/* Search bar */}
              <div className="hero-search h-fade-up h-d4 mb-5 flex w-full max-w-2xl items-stretch overflow-hidden rounded-2xl border border-white/20 bg-white p-2 shadow-xl transition-all duration-200">
                <select aria-label="Filter by domain" className="hidden rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-700 outline-none sm:block">
                  <option value="">All Domains</option>
                  <option value="cloud">Cloud</option>
                  <option value="security">Security</option>
                  <option value="networking">Networking</option>
                  <option value="ai">AI &amp; ML</option>
                </select>
                <div className="mx-2 my-1 hidden w-px bg-gray-200 sm:block" />
                <input
                  type="text"
                  placeholder="Search 5,000+ courses — e.g. Azure, CISSP, AWS DevOps..."
                  aria-label="Search courses"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none"
                />
                <button className="shrink-0 rounded-xl bg-[#0694D1] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-opacity hover:opacity-90">
                  Search
                </button>
              </div>

              {/* Popular tags */}
              <div className="h-fade-up h-d4 mb-5 flex max-w-2xl flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="text-xs sm:text-sm font-semibold text-white/80">Popular:</span>
                {['Azure Administrator', 'AWS Solutions Architect', 'CISSP', 'PMP', 'CCNA', 'Kubernetes', 'CompTIA Security+'].map(t => (
                  <span
                    key={t}
                    className="cursor-pointer rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-white/20 hover:text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Social proof */}
              <div className="h-fade-up h-d4 mb-3 flex justify-center lg:justify-start">
                <div className="flex flex-wrap items-center gap-6 rounded-full px-6 py-3" style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)' }}>
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
                    <span className="text-xs sm:text-sm text-white"><span className="font-bold">3,200+</span> enrolled this month</span>
                  </div>
                  <span className="hidden h-4 w-px bg-white/25 sm:block" />
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-base leading-none">★★★★★</span>
                    <span className="text-xs sm:text-sm text-white font-bold">4.9/5</span>
                    <span className="text-xs sm:text-sm text-white/80">(18,400+ reviews)</span>
                  </div>
                </div>
              </div>

              {/* Mobile stats 2×2 grid */}
              <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
                {[
                  { num: '1M+', label: 'Trained' },
                  { num: '95%', label: 'Pass Rate' },
                  { num: '30+', label: 'Years' },
                  { num: '50+', label: 'Vendors' },
                ].map(s => (
                  <div key={s.label} className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-md">
                    <div className="text-lg sm:text-xl md:text-2xl font-black text-white">{s.num}</div>
                    <div className="mt-1 text-xs text-white/60">{s.label}</div>
                  </div>
                ))}
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
                <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-1.5 py-2.5" style={{ background: 'rgba(4,16,30,0.40)', borderTop: '1px solid rgba(6,148,209,0.18)' }}>
                  {[0,1,2].map(i => (
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

                {/* ── Slide 2 — Partner Stats ── */}
                <div
                  className="absolute inset-0 flex flex-col transition-opacity duration-500"
                  style={{ opacity: heroSlide === 1 ? 1 : 0, pointerEvents: heroSlide === 1 ? 'auto' : 'none' }}
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
                            <div className="text-xs text-white/60">{row.label}</div>
                          </div>
                        </div>
                        <span className="font-bold text-sm text-white/50">›</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Slide 3 — Learning Stack ── */}
                <div
                  className="absolute inset-0 flex flex-col transition-opacity duration-500"
                  style={{ opacity: heroSlide === 2 ? 1 : 0, pointerEvents: heroSlide === 2 ? 'auto' : 'none' }}
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
                          <span className="font-medium text-white/90" style={{ fontSize: '11px' }}>{row.name}</span>
                        </div>
                        <span className="rounded-full px-1.5 py-0.5 font-normal text-white" style={{ fontSize: '10px', background: 'rgba(7,109,157,0.75)', border: '1px solid rgba(6,148,209,0.30)' }}>Free</span>
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
      <section className="bg-white overflow-hidden px-4 lg:px-[50px]" style={{ paddingTop: '48px', paddingBottom: '40px' }}>
        <style>{`
          @keyframes trustedScroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          .trusted-track { display: flex; width: max-content; animation: trustedScroll 38s linear infinite; }
          .trusted-track:hover { animation-play-state: paused; }
        `}</style>

        {/* Section heading */}
        <div className="mx-auto max-w-7xl">
          <div className="io-fade text-center" style={{ marginBottom: '16px' }}>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-koenig-dark">
              Trusted by <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">global companies</span> across various industries
            </h2>
          </div>
        </div>

        {/* Scrolling logo strip */}
        <div
          className="relative overflow-x-hidden"
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
      </section>

      {/* ── Stats Bar ────────────────────────────────────────── */}
      <div ref={statsRef} className="bg-white px-4 lg:px-[50px]" style={{ paddingBottom: '40px' }}>
        <div className="mx-auto max-w-7xl px-6 py-6" style={{ background: '#EBF8FE', borderRadius: '0 1.5rem 0 1.5rem' }}>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { end: 30,   suffix: '+',  label: 'Years Training Excellence', barColor: '#0694d1', icon: '/images/home-banner/icon-infographic-30+.svg' },
            { end: 5000, suffix: '+',  label: 'Courses Offered',           barColor: '#076d9d', icon: '/images/home-banner/icon-infographic-5000+.svg' },
            { end: 30,   suffix: 'K+', label: 'Monthly Students',          barColor: '#0694d1', icon: '/images/home-banner/icon-infographic-30000+.svg' },
            { end: 99,   suffix: '%',  label: 'On-Time Delivery',          barColor: '#076d9d', icon: '/images/home-banner/icon-infographic-99.svg' },
            { end: 300,  suffix: '+',  label: 'Certified Trainers',        barColor: '#0694d1', icon: '/images/home-banner/icon-infographic-300+.svg' },
          ].map((s, statIdx, arr) => (
            <div key={s.label} className="stat-item flex flex-col items-center text-center">
              <div
                className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `linear-gradient(135deg, ${s.barColor}, #0694d1)` }}
              >
                <img src={s.icon} alt={s.label} className="h-5 w-5 object-contain" />
              </div>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-koenig-dark">
                <CountUp key={`${s.label}-${statsCount}`} end={s.end} suffix={s.suffix} duration={1800 + statIdx * 150} />
              </div>
              <div className={`io-fade mt-1 text-xs font-medium text-koenig-muted delay-${statIdx + 1}`}>{s.label}</div>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* ── Course Explorer ───────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 lg:px-[50px]" style={{ background: 'radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 45%, #040C18 100%)', paddingTop: '50px', paddingBottom: '50px' }}>
        {/* Glow orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-20 h-[350px] w-[350px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle,#0694d1,transparent 70%)', filter: 'blur(70px)' }} />
          <div className="absolute top-1/2 right-0 h-[280px] w-[280px] -translate-y-1/2 rounded-full opacity-20" style={{ background: 'radial-gradient(circle,#38bdf8,transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 left-1/3 h-[240px] w-[240px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle,#076d9d,transparent 70%)', filter: 'blur(55px)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="io-fade text-center" style={{ marginBottom: "35px" }}>
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.30)' }}>
              5,000+ Courses
            </span>
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">Explore Our <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Course Catalogue</span></h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-white/60">
              Find your certification across cloud, security, networking, project management, and more.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="io-fade delay-1 mb-8 flex flex-nowrap overflow-x-auto justify-center gap-1 rounded-2xl p-1.5 [&::-webkit-scrollbar]:hidden sm:mx-auto sm:w-max" style={{ background: 'rgba(8,24,42,0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(6,148,209,0.20)' }}>
            {COURSE_TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  tab === t
                    ? 'text-white shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                style={tab === t ? { background: 'linear-gradient(135deg, #0694d1, #076d9d)', boxShadow: '0 4px 12px rgba(6,148,209,0.35)' } : {}}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Course cards */}
          {tab === 'Top Courses' && (
            <div key="top" className="tab-enter grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TOP_COURSES.map((c, i) => <CourseCard key={i} c={c} />)}
            </div>
          )}
          {tab === 'Top Technologies' && (
            <div key="tech" className="tab-enter grid grid-cols-2 gap-4 md:grid-cols-4">
              {TOP_TECHNOLOGIES.map((t, i) => (
                <div
                  key={i} role="button" tabIndex={0}
                  className="group cursor-pointer rounded-xl p-5 transition-all duration-300 hover:-translate-y-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-koenig-blue"
                  style={{ background: 'rgba(8,24,42,0.60)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(6,148,209,0.20)', boxShadow: '0 4px 16px rgba(0,0,0,0.30)' }}
                >
                  {/* Title row */}
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-white transition-colors group-hover:text-[#3AB6EB] leading-snug">{t.name}</h3>
                    <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-koenig-blue/40 text-[#3AB6EB] transition-all group-hover:bg-koenig-blue group-hover:text-white group-hover:border-koenig-blue">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                    </span>
                  </div>
                  {/* Count */}
                  <p className="mb-4 text-xs font-medium text-[#3AB6EB]">{t.count} Courses</p>
                  {/* Divider */}
                  <div className="mb-3 h-px" style={{ background: 'rgba(6,148,209,0.18)' }} />
                  {/* Partners */}
                  <p className="mb-2 text-[10px] font-normal text-white/40">Top Partners</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.partners.map(p => (
                      <span key={p} className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${VENDOR_BADGE_COLORS[p] ?? 'bg-[#0694d1]/20 text-[#3AB6EB]'}`}>{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'New & Trending' && (
            <div key="trending" className="tab-enter grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {NEW_TRENDING.map((c, i) => <CourseCard key={i} c={c} />)}
            </div>
          )}

          <div className="io-fade mt-12 flex flex-col items-center gap-3">
            <button className="group inline-flex items-center gap-3 rounded-2xl px-8 py-3.5 text-xs sm:text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{ background: 'linear-gradient(135deg,#093148,#076D9D)' }}>
              Browse All 5,000+ Courses
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.18)' }}>→</span>
            </button>
            <p className="text-xs text-white/50">Across 50+ global vendors · All skill levels</p>
          </div>
        </div>
      </section>

      {/* ── Vendor Partners ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white px-4 lg:px-[50px] py-[60px]">
        <div className="pointer-events-none absolute -left-40 -top-32 h-[420px] w-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-[300px] w-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.18) 0%, transparent 70%)' }} />
        {/* Add reverse-marquee keyframe */}
        <style>{`
          @keyframes marqueeRev { from{transform:translateX(-50%)} to{transform:translateX(0)} }
          .marquee-rev { animation: marqueeRev 80s linear infinite; }
          .marquee-rev:hover { animation-play-state: paused; }
        `}</style>

        <div className="mx-auto max-w-7xl">
          <div className="io-fade text-center" style={{ marginBottom: '35px' }}>
            <span className="mb-3 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-koenig-blue">
              Official Partnerships
            </span>
            <h2 className="mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-koenig-dark">Authorized by <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">50+ Global Vendors</span></h2>
            <p className="text-sm sm:text-base text-koenig-muted">Official courseware. Certified instructors. Vendor-recognized credentials.</p>
          </div>
        </div>

        {/* Row 1 — scrolls left */}
        <div
          className="relative mb-4 overflow-x-hidden py-3"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="marquee-track flex gap-4 px-2" style={{ width: 'max-content' }}>
            {[...VENDORS_ROW1, ...VENDORS_ROW1].map((v, i) => (
              <VendorCard key={i} v={v} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right (reverse) */}
        <div
          className="relative overflow-x-hidden pt-3 pb-0"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="marquee-rev flex gap-4 px-2" style={{ width: 'max-content' }}>
            {[...VENDORS_ROW2, ...VENDORS_ROW2].map((v, i) => (
              <VendorCard key={i} v={v} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Learning Formats ─────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 lg:px-[50px] py-[60px]" style={{ background: 'linear-gradient(135deg,#061e30 0%,#093148 50%,#062240 100%)' }}>
        {/* Glow orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/4 h-[380px] w-[380px] rounded-full opacity-25" style={{ background: 'radial-gradient(circle,#0694d1,transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 right-1/4 h-[320px] w-[320px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle,#076d9d,transparent 70%)', filter: 'blur(55px)' }} />
          <div className="absolute top-1/2 left-10 h-[200px] w-[200px] -translate-y-1/2 rounded-full opacity-15" style={{ background: 'radial-gradient(circle,#00a4ef,transparent 70%)', filter: 'blur(45px)' }} />
          <div className="absolute top-1/3 right-10 h-[180px] w-[180px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle,#0694d1,transparent 70%)', filter: 'blur(40px)' }} />
          {/* Expanding ripple rings — centred in the section */}
          <div className="lf-ring d1" style={{ top: '50%', left: '50%', width: '420px', height: '420px' }} />
          <div className="lf-ring d2" style={{ top: '50%', left: '50%', width: '420px', height: '420px' }} />
          <div className="lf-ring d3" style={{ top: '50%', left: '50%', width: '420px', height: '420px' }} />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="io-fade text-center" style={{ marginBottom: "35px" }}>
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-koenig-blue" style={{ background: 'rgba(6,148,209,0.18)' }}>
              Learning Formats
            </span>
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">Learning That <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Fits Your Life</span></h2>
            <p className="mx-auto max-w-xl text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Four formats. One quality standard. Every option comes with the same expert instructors, official courseware, and money-back guarantee.
            </p>
          </div>

          <style>{`
            .lf-flip-inner { transform-style: preserve-3d; transition: transform 0.65s cubic-bezier(0.4,0.2,0.2,1); }
            .lf-flip:hover .lf-flip-inner { transform: rotateY(180deg); }
            .lf-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
            .lf-back { transform: rotateY(180deg); }

            /* Expanding ripple rings */
            @keyframes lfRipple {
              0%   { transform: translate(-50%,-50%) scale(0.25); opacity: 0.55; }
              100% { transform: translate(-50%,-50%) scale(2.8);  opacity: 0; }
            }
            .lf-ring {
              position: absolute; border-radius: 50%; pointer-events: none;
              border: 1px solid rgba(6,148,209,0.35);
              animation: lfRipple 5s ease-out infinite;
            }
            .lf-ring.d1 { animation-delay: 0s; }
            .lf-ring.d2 { animation-delay: 1.6s; }
            .lf-ring.d3 { animation-delay: 3.2s; }

            /* Button pulse glow */
            @keyframes lfBtnGlow {
              0%,100% { box-shadow: 0 0 0 0 rgba(6,148,209,0), 0 4px 14px rgba(6,148,209,0.3); }
              50%      { box-shadow: 0 0 22px 7px rgba(6,148,209,0.5), 0 4px 14px rgba(6,148,209,0.3); }
            }
            .lf-btn-glow { animation: lfBtnGlow 2.8s ease-in-out infinite; }
            @media (hover: none) { .lf-card .lf-reveal { transform: translateY(0) !important; } }
          `}</style>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: 'Classroom Training',
                badge: 'Most Popular', badgeBg: '#0694d1', badgeText: '#fff',
                desc: 'Traditional, instructor-led learning in popular global destinations.',
                bullets: ['Hands-on lab sessions', 'Face-to-face with expert instructors', 'Global training centers'],
                btnLabel: 'Learn More →',
                cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)',
                img: '/images/home-banner/classroom-training.png',
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
              },
              {
                name: 'Live Online Classes',
                badge: 'Best Value', badgeBg: '#076D9D', badgeText: '#fff',
                desc: 'Flexible virtual learning with expert instructors from the comfort of your own space.',
                bullets: ['Live instructor-led sessions', 'Interactive Q&A & labs', 'Train from anywhere'],
                btnLabel: 'Learn More →',
                cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)',
                img: '/images/home-banner/Live-Online-Classes.png',
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.277A1 1 0 0 1 21 8.649v6.7a1 1 0 0 1-1.447.894L15 14"/><rect x="1" y="6" width="14" height="12" rx="2"/></svg>,
              },
              {
                name: 'Fly-Me-A-Trainer (FMAT)',
                badge: 'Fastest', badgeBg: '#0694d1', badgeText: '#fff',
                desc: 'Flexible on-site learning for larger groups. Fly an expert to your location anywhere in the world.',
                bullets: ['Expert trainer at your site', 'Custom schedule & pace', 'Any location worldwide'],
                btnLabel: 'Learn More →',
                cardBg: 'linear-gradient(145deg,#0c4a72,#093148)',
                img: '/images/home-banner/FMAT.png',
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></svg>,
              },
              {
                name: 'Flexi (Self-Paced Learning)',
                badge: 'Most Flexible', badgeBg: '#076D9D', badgeText: '#fff',
                desc: 'Self-paced learning with edited lectures, courseware, hands-on labs, and optional doubt clearing sessions.',
                bullets: ['Edited video lectures', 'Hands-on labs & courseware', 'Optional doubt clearing sessions'],
                btnLabel: 'Learn More →',
                cardBg: 'linear-gradient(145deg,#0a3d5c,#072d44)',
                img: '/images/home-banner/Flexi.png',
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              },
            ].map((f, i) => (
              <div key={i} className={`lf-flip io-fade delay-${i + 1}`} style={{ perspective: '1000px', height: '400px' }}>
                <div className="lf-flip-inner relative h-full w-full">

                  {/* ── FRONT ── */}
                  <div
                    className="lf-face absolute inset-0 flex flex-col overflow-hidden rounded-2xl"
                    style={{ background: f.cardBg, border: '1px solid rgba(6,148,209,0.22)' }}
                  >
                    {/* Image */}
                    <div className="relative h-44 w-full shrink-0 overflow-hidden">
                      <img src={f.img} alt={f.name} className="h-full w-full object-cover" />
                      {/* Badge */}
                      <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-normal" style={{ background: 'rgba(9,49,72,0.55)', backdropFilter: 'blur(6px)', color: '#fff' }}>{f.badge}</span>
                    </div>
                    {/* Front content */}
                    <div className="flex flex-1 flex-col px-5 pt-4">
                      <div className="flex-1">
                        <h3 className="mb-2 text-sm sm:text-base md:text-lg font-medium text-white">{f.name}</h3>
                        <p className="text-xs sm:text-sm font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{f.desc}</p>
                      </div>
                      <div className="pb-[20px] pt-[20px]">
                        <button className="lf-btn-glow w-full rounded-xl py-2.5 text-xs sm:text-sm font-bold text-white transition-opacity duration-200 hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0694d1,#076d9d)' }}>{f.btnLabel}</button>
                      </div>
                    </div>
                  </div>

                  {/* ── BACK ── */}
                  <div
                    className="lf-face lf-back absolute inset-0 flex flex-col rounded-2xl p-5"
                    style={{ background: f.cardBg, border: '1px solid rgba(6,148,209,0.35)' }}
                  >
                    {/* Icon + title */}
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(6,148,209,0.18)' }}>
                        {f.icon}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-tight">{f.name}</h3>
                    </div>
                    {/* Divider */}
                    <div className="mb-3 h-px" style={{ background: 'rgba(6,148,209,0.25)' }} />
                    {/* Bullets */}
                    <ul className="mb-4 space-y-2.5">
                      {f.bullets.map(b => (
                        <li key={b} className="flex items-center gap-2.5 text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.78)' }}>
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="shrink-0">
                            <circle cx="8.5" cy="8.5" r="8" stroke="rgba(6,148,209,0.5)" strokeWidth="1"/>
                            <path d="M5.5 8.5l2 2 4-4" stroke="#0694d1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {b}
                        </li>
                      ))}
                    </ul>
                    {/* CTA */}
                    <button
                      className="lf-btn-glow mt-auto w-full rounded-xl py-2.5 text-xs sm:text-sm font-bold text-white transition-opacity duration-200 hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg,#0694d1,#076d9d)' }}
                    >{f.btnLabel}</button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Differentiators ──────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 lg:px-[50px] py-[60px]" style={{ background: '#061e30' }}>
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
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-koenig-blue" style={{ background: 'rgba(6,148,209,0.15)', border: '1px solid rgba(6,148,209,0.25)' }}>Why Koenig</span>
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">The <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Koenig Difference</span></h2>
            <p className="mx-auto max-w-xl text-sm sm:text-base text-white/55">What makes 1M+ professionals choose Koenig over everyone else</p>
          </div>

          {/* Bento grid */}
          <div className="flex flex-col gap-4">

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
                    <div className="text-xs sm:text-sm text-white/70">{s.label}</div>
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

      {/* ── Live Expert Webinars ─────────────────────────────── */}
      <section className="relative overflow-hidden px-4 lg:px-[50px] py-[60px]" style={{ background: 'linear-gradient(160deg,#EBF8FE 0%,#F5FBFF 50%,#EAF6FD 100%)', borderTop: '1px solid #CAEFFF', borderBottom: '1px solid #CAEFFF' }}>
        <div className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[350px] w-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.20) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="io-fade mb-10 text-center">
            <h2 className="mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-koenig-dark">Join Our Live <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Expert Webinars</span></h2>
            <p className="text-xs sm:text-sm text-koenig-muted">Free live sessions led by certified instructors — register and attend from anywhere</p>
          </div>

          {/* Cards — 3 per page */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 items-stretch">
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
                  <p className="relative mt-3 text-xs sm:text-sm font-semibold text-koenig-dark">{w.speaker}</p>
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
                  <button className="w-full rounded-full border-2 border-koenig-blue py-2.5 text-xs sm:text-sm font-semibold text-koenig-blue transition-all duration-200 hover:bg-koenig-blue hover:text-white">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
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
            <button className="group inline-flex items-center gap-3 rounded-2xl px-8 py-3 text-xs sm:text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{ background: 'linear-gradient(135deg,#093148,#076D9D)' }}>
              View All Webinars
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.18)' }}>→</span>
            </button>
          </div>

        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white px-4 lg:px-[50px] py-[60px]">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[350px] w-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.14) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="io-fade text-center" style={{ marginBottom: '35px' }}>
            <span className="mb-3 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-koenig-blue">Simple Process</span>
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-koenig-dark">How It <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Works</span></h2>
            <p className="mx-auto max-w-xl text-sm sm:text-base text-koenig-muted">From choosing your path to getting certified — four steps that have worked for over a million professionals.</p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line — desktop only */}
            <div className="pointer-events-none absolute hidden lg:block" style={{ top: '52px', left: '12.5%', right: '12.5%', height: '2px', background: 'linear-gradient(to right,#076D9D,#4DBFEF,#076D9D)' }} />

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
              {[
                { icon: '🧭', num: '01', title: 'Tell Us Your Goal',        desc: 'Share where you are and where you want to be. Use our course finder, talk to a training advisor, or start with one of our curated career pathways.',              dots: 1, delay: '0.10s' },
                { icon: '📋', num: '02', title: 'Pick Your Format & Date',  desc: 'Choose 1-on-1, Public Batch, or Flexi. Select dates from guaranteed schedules that fit your life. Lock in your spot with flexible payment options.',           dots: 2, delay: '0.25s' },
                { icon: '🎓', num: '03', title: 'Train with a Real Expert', desc: 'A vendor-certified instructor teaches you live. Hands-on labs mirror real enterprise environments. Sessions are recorded so you can review later.',          dots: 3, delay: '0.40s' },
                { icon: '🚀', num: '04', title: 'Certify & Advance',        desc: 'Pass your exam with dedicated prep and practice tests. Join 1M+ certified professionals who used Koenig to land promotions and salary increases.',              dots: 4, delay: '0.55s' },
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
                        className="flex h-20 w-20 items-center justify-center rounded-full text-3xl transition-all duration-300"
                        style={{
                          background: isActive ? '#076D9D' : 'white',
                          border: '4px solid #f0f9ff',
                          boxShadow: isActive ? '0 8px 30px rgba(7,109,157,0.35)' : '0 4px 20px rgba(0,0,0,0.08)',
                          transform: isActive ? 'scale(1.1) translateY(-6px)' : 'scale(1)',
                        }}
                      >{s.icon}</div>
                      {/* Step number badge */}
                      <span
                        className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white transition-all duration-300"
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
                      <div className="mb-2 text-xs font-bold tracking-widest text-koenig-blue">STEP {s.num}</div>
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
            <button className="group inline-flex items-center gap-3 rounded-2xl px-8 py-3 text-xs sm:text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{ background: 'linear-gradient(135deg,#093148,#076D9D)' }}>
              Start Your Journey
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.18)' }}>→</span>
            </button>
            <button className="hiw-outline-btn rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-xs sm:text-sm font-bold text-[#076D9D] transition-all duration-300 hover:bg-[#076D9D] hover:text-white">
              Talk to an Advisor
            </button>
          </div>

        </div>
      </section>

      {/* ── Success Stories ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#E8F4FA] px-4 lg:px-[50px] py-[60px]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.20) 0%, transparent 65%)' }} />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[350px] w-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -left-20 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.16) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="io-fade text-center" style={{ marginBottom: '35px' }}>
            <span className="mb-3 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-koenig-blue">Real Transformations</span>
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-koenig-dark">Stories That <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Speak for Themselves</span></h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-koenig-muted">Every number is real. Every name is used with permission. These are your peers — people who were exactly where you are and made the leap.</p>
          </div>

          {/* Stats bar */}
          <div className="io-fade mx-auto mb-10 max-w-3xl rounded-2xl bg-white px-6 py-5 shadow-md sm:px-10">
            <div className="flex flex-wrap items-center justify-center divide-x divide-[#CAEFFF]">
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
                <div key={s.label} className="px-8 py-1 text-center first:pl-0 last:pr-0">
                  <div className="mb-1.5 flex items-center justify-center">{s.icon}</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#093148]">{s.val}</div>
                  <div className="mt-1 text-xs text-[#666]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards carousel — 3 per page, clean paging */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.slice(testimStart, testimStart + 3).map((t, i) => (
              <TestimonialCardV2 key={testimStart + i} t={t} delay={`${i * 0.08}s`} />
            ))}
          </div>

          {/* Arrow navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Prev */}
            <button
              onClick={() => setTestimStart(s => Math.max(0, s - 3))}
              disabled={testimStart === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
              style={testimStart === 0
                ? { background: '#F3F4F6', border: '1.5px solid #E5E7EB', cursor: 'not-allowed' }
                : { background: '#093148', border: '1.5px solid #093148', boxShadow: '0 4px 14px rgba(9,49,72,0.25)', cursor: 'pointer' }
              }
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={testimStart === 0 ? '#D1D5DB' : '#ffffff'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={() => setTestimStart(s => s + 3 < TESTIMONIALS.length ? s + 3 : s)}
              disabled={testimStart + 3 >= TESTIMONIALS.length}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
              style={testimStart + 3 >= TESTIMONIALS.length
                ? { background: '#F3F4F6', border: '1.5px solid #E5E7EB', cursor: 'not-allowed' }
                : { background: '#093148', border: '1.5px solid #093148', boxShadow: '0 4px 14px rgba(9,49,72,0.25)', cursor: 'pointer' }
              }
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={testimStart + 3 >= TESTIMONIALS.length ? '#D1D5DB' : '#ffffff'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* ── Live Schedule ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-koenig-light px-4 lg:px-[50px] py-[60px]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.20) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 h-[300px] w-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.18) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">
          <div className="io-fade mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="mb-1 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-koenig-blue">Guaranteed Schedules</span>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-koenig-dark">Upcoming Batches — <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">March 2026</span></h2>
              <p className="text-xs sm:text-sm text-koenig-muted">Every batch listed here is guaranteed to run. No cancellations.</p>
            </div>
            <button className="group inline-flex shrink-0 items-center gap-3 rounded-2xl px-6 py-3 text-xs sm:text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{ background: 'linear-gradient(135deg,#093148,#076D9D)' }}>
              View Full Schedule
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.18)' }}>→</span>
            </button>
          </div>
          <div className="io-fade delay-1 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SCHEDULE.map((s, i) => (
              <ScheduleCard key={i} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Vendor Stack ──────────────────────────────────────── */}
      <VendorStack />

      {/* ── Enterprise + Global Presence (tabbed) ─────────────── */}
      <section className="relative overflow-hidden bg-white px-4 lg:px-[50px] py-[60px]">
        <div className="pointer-events-none absolute -left-32 top-1/3 h-[450px] w-[450px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.17) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[200px] w-[600px] -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(77,191,239,0.16) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">

          {/* Tab header row */}
          <div className="io-fade mb-3 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="mb-1 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-koenig-blue">Solutions</span>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-koenig-dark">
                {orgTab === 'enterprise'
                  ? <>Upskill Your <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Entire Workforce</span></>
                  : <>Train From Anywhere <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">in the World</span></>}
              </h2>
            </div>
            {/* Tab pills — right side */}
            <div className="flex shrink-0 items-center gap-1 overflow-x-auto rounded-2xl p-1.5 [&::-webkit-scrollbar]:hidden" style={{ background: '#D6F0FB', border: '1px solid #B9DEFF' }}>
              {(['enterprise', 'global'] as const).map((key) => {
                const label = key === 'enterprise' ? 'Upskill Your Workforce' : 'Train Globally'
                const active = orgTab === key
                return (
                  <button
                    key={key}
                    onClick={() => setOrgTab(key)}
                    className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      active ? 'text-white shadow-md' : 'text-[#076d9d] hover:bg-white/50 hover:text-[#093148]'
                    }`}
                    style={active ? { background: 'linear-gradient(135deg,#0694d1,#076d9d)', boxShadow: '0 4px 12px rgba(6,148,209,0.35)' } : {}}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab content */}
          {orgTab === 'enterprise' ? (
            <div className="grid items-start gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-8 text-sm sm:text-base text-koenig-muted" >500+ enterprises trust Koenig to design and deliver customized IT training programs that align with their technology strategy and produce measurable results.</p>
                <div className="mb-8 space-y-4">
                  {[
                    { title: 'Skills Gap Analysis', sub: 'Pre-training assessment identifies exactly what your team needs' },
                    { title: 'Custom Curricula', sub: 'Programs tailored to your technology stack and business goals' },
                    { title: 'Dedicated Certified Instructors', sub: 'Handpicked instructors with real enterprise experience' },
                    { title: 'Volume Pricing', sub: 'Significant discounts for team and organization-wide enrollment' },
                    { title: 'Real-Time Progress Dashboard', sub: 'L&D managers track certifications, completion, and ROI' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-koenig-blue text-[10px] text-white">✓</span>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-koenig-dark">{f.title}</div>
                        <div className="text-xs text-koenig-muted">{f.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-koenig-dark">500+</div>
                      <div className="text-[11px] text-koenig-muted">Enterprise clients</div>
                    </div>
                    <div className="h-10 w-px bg-koenig-border" />
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-koenig-dark">50K+</div>
                      <div className="text-[11px] text-koenig-muted">Employees trained</div>
                    </div>
                    <div className="h-10 w-px bg-koenig-border" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-koenig-dark">4.8/5</div>
                    <div className="text-[11px] text-koenig-muted">Satisfaction score</div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-koenig-navy p-6 md:p-10 shadow-2xl shadow-koenig-navy/20">
                <div className="mb-6 text-4xl">🏢</div>
                <h3 className="mb-2 text-lg sm:text-xl md:text-2xl font-bold text-white">Ready to Transform Your Team?</h3>
                <p className="mb-6 text-xs sm:text-sm leading-relaxed text-white/80">Get a customized training proposal for your organization. Our enterprise team will assess your needs and recommend the optimal program, format, and schedule.</p>
                <ul className="mb-8 space-y-2">
                  {['Free skills gap assessment', 'Custom training roadmap', 'Dedicated account manager', 'Flexible payment terms'].map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs sm:text-sm text-white/60">
                      <span className="text-koenig-blue">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button className="w-full rounded-xl bg-koenig-blue py-4 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-koenig-blue/25 transition-shadow hover:shadow-xl hover:shadow-koenig-blue/35">
                  Request Enterprise Quote
                </button>
                <p className="mt-4 text-center text-xs text-white/30">No commitment required · Response within 24 hours</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-8 max-w-xl text-sm sm:text-base text-koenig-muted">Physical training centers on every major continent, plus live online delivery across every timezone.</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {COUNTRIES.map((c, i) => {
                  const isHovered = hoveredCountry === i
                  return (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-xl bg-white transition-all duration-300"
                      style={{
                        border: isHovered ? '1.5px solid #0694d1' : '1px solid #CAEFFF',
                        boxShadow: isHovered ? '0 4px 16px rgba(6,148,209,0.14)' : '0 2px 8px rgba(0,164,239,0.06)',
                        transform: isHovered ? 'translateY(-4px)' : 'none',
                      }}
                      onMouseEnter={() => setHoveredCountry(i)}
                      onMouseLeave={() => setHoveredCountry(null)}
                    >
                      {/* Accent bar — absolute so it doesn't affect card height */}
                      <div
                        className="absolute inset-x-0 top-0 transition-all duration-300"
                        style={{ height: '4px', background: 'linear-gradient(90deg,#0694d1,#076d9d)', opacity: isHovered ? 1 : 0 }}
                      />

                      <div className="p-4 text-center">
                        {/* Landmark icon */}
                        <div className="mb-1 text-4xl leading-none">{c.landmark}</div>

                        {/* Flag */}
                        <div className="mb-2 text-3xl leading-none">{c.flag}</div>

                        {/* Country name */}
                        <div className={`mb-1.5 text-xs sm:text-sm font-bold transition-colors ${isHovered ? 'text-koenig-blue' : 'text-koenig-dark'}`}>{c.name}</div>

                        {/* Cities with map pin */}
                        <div className="flex items-center justify-center gap-1 text-xs text-koenig-muted">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {c.cities}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-8 rounded-xl border border-koenig-border bg-koenig-light p-5 text-center">
                <p className="text-xs sm:text-sm text-koenig-muted">
                  Can&apos;t travel?{' '}
                  <span className="font-semibold text-koenig-dark">Live Online delivery reaches every country and every timezone</span>
                  {' '}— with the same instructor quality and guaranteed schedules.
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── Awards ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white px-4 lg:px-[50px] py-[60px]" style={{ borderTop: '1px solid #CAEFFF', borderBottom: '1px solid #CAEFFF' }}>
        <div className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[350px] w-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.18) 0%, transparent 70%)' }} />

        {/* Header */}
        <div className="mx-auto max-w-7xl">
          <div className="io-fade mb-10 text-center">
            <span className="mb-2 inline-block rounded-full bg-koenig-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-koenig-blue">Recognition</span>
            <h2 className="mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-koenig-dark">Awards &amp; <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Recognition</span></h2>
            <p className="text-xs sm:text-sm text-koenig-muted">Recognized by global vendors and quality bodies for training excellence</p>
          </div>
        </div>

        {/* Drag-scrollable marquee */}
        <AwardsMarquee awards={AWARDS} />
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-koenig-light px-4 lg:px-[50px] py-[60px]">
        <div className="pointer-events-none absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.19) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.20) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.15) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-7xl">
          <div className="io-fade text-center" style={{ marginBottom: "35px" }}>
            <h2 className="mb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-koenig-dark">Frequently <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Asked Questions</span></h2>
            <p className="text-sm sm:text-base text-koenig-muted">Everything you need to know before booking your training</p>
          </div>
          <div className="io-fade delay-1 grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              { q: 'What is 1-on-1 training and how does it actually work?', a: '1-on-1 training pairs you with a dedicated certified instructor who delivers the entire course exclusively to you. You set the pace, ask unlimited questions, and customize focus areas. Sessions are live and interactive via video conferencing or in-person at our training centers.' },
              { q: 'Are Koenig certifications recognized globally?', a: 'Absolutely. Koenig is an authorized training partner for 50+ global technology vendors including Microsoft, Cisco, AWS, and CompTIA. All certifications are issued directly by the vendor and recognized worldwide.' },
              { q: 'What is the money-back guarantee?', a: 'If you are not satisfied with your training experience, we offer a 100% money-back guarantee. Our commitment is your success and your satisfaction — no questions asked, no conditions.' },
              { q: 'How does corporate/enterprise training work?', a: 'We design custom training programs for organizations of any size — from skills gap analysis and tailored curricula through dedicated instructors, volume pricing, and a real-time progress dashboard for L&D managers.' },
              { q: 'Can I reschedule my training if something comes up?', a: 'Yes. We offer flexible rescheduling with reasonable notice. Our guaranteed schedules mean your original dates always run as planned, but if your circumstances change, we will accommodate you.' },
              { q: 'Do all courses include hands-on lab access?', a: 'Yes. All training formats include hands-on lab environments that mirror real-world enterprise setups. Lab access is available during training and often extends beyond course completion for additional practice time.' },
              { q: 'What formats are available? What is FMAT?', a: 'We offer Classroom, Live Online, Flexi (self-paced schedule), and FMAT (Fast-Track Multi-Accelerated Training — multi-week content delivered in days for urgent upskilling needs). All include official courseware, labs, and exam prep.' },
              { q: 'How do I prepare for my certification exam?', a: 'Every Koenig course includes dedicated exam prep: practice tests, exam-taking strategies, and focused review sessions. Our 95% first-attempt pass rate reflects the effectiveness of our approach across 1M+ trained professionals.' },
            ].map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border bg-white transition-all duration-200"
                  style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none' }}
                >
                  {/* Question row */}
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-6 sm:py-4"
                  >
                    <span className={`text-sm font-semibold leading-snug transition-colors sm:text-base ${isOpen ? 'text-koenig-blue' : 'text-koenig-dark'}`}>
                      {f.q}
                    </span>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300"
                      style={{
                        background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  {/* Answer — slides in */}
                  <div
                    className="transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
                  >
                    <p className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed text-koenig-muted sm:px-6 sm:py-4 sm:text-base">
                      {f.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-8 text-center">
            <p className="mb-3 text-sm sm:text-base text-koenig-muted">Still have questions?</p>
            <button className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-xs sm:text-sm font-bold text-[#076D9D] transition-all hover:bg-[#076D9D] hover:text-white">
              Chat with a Training Advisor
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(7,109,157,0.12)' }}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer style={{ background: '#071929' }} className="text-white">

        {/* Newsletter + Social icons row */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="px-4 lg:px-[50px] py-8">
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
        <div className="px-4 lg:px-[50px] py-10">
          <div className="mx-auto max-w-7xl">

            {/* Row 1: Company, Learning Options, Resources, Others */}
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-10">
              {FOOTER_COLS.map(col => (
                <div key={col.heading}>
                  <h4 className="mb-4 text-sm font-semibold" style={{ color: '#0694D1' }}>{col.heading}</h4>
                  <ul className="space-y-2">
                    {col.links.map(link => (
                      <li key={link}>
                        <a href="#" className="text-xs leading-snug text-white/80 transition-colors hover:text-white">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Row 2: Top Technologies, Top Partners, Top Courses (spans 2 cols) */}
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {FOOTER_BOTTOM_COLS.map(col => (
                <div key={col.heading}>
                  <h4 className="mb-4 text-sm font-semibold" style={{ color: '#0694D1' }}>{col.heading}</h4>
                  <ul className="space-y-2">
                    {col.links.map(link => (
                      <li key={link}>
                        <a href="#" className="text-xs leading-snug text-white/80 transition-colors hover:text-white">{link}</a>
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
                      <li key={link}><a href="#" className="text-xs leading-snug text-white/80 transition-colors hover:text-white">{link}</a></li>
                    ))}
                  </ul>
                  <ul className="space-y-2">
                    {TOP_COURSES_COL2.map(link => (
                      <li key={link}><a href="#" className="text-xs leading-snug text-white/80 transition-colors hover:text-white">{link}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Legal disclaimers */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} className="px-4 lg:px-[50px] py-8">
          <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-8 items-start">
            <ul className="flex-1 space-y-1.5 list-disc list-outside pl-4 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
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
                <img src="/images/dmca-logo.png" alt="DMCA Protected" style={{ width: '150px', height: 'auto' }} />
              </a>
            </div>
          </div>
        </div>

        {/* Philosophy tagline */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} className="px-4 lg:px-[50px] py-5">
          <p className="mx-auto max-w-7xl text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
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
              <p className="text-xs text-gray-300">Online | Typically replies instantly</p>
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
          style={{ bottom: '2rem', right: '5.5rem', border: '1px solid #dedede' }}
        >
          ↑
        </button>
      )}

    </div>
  )
}

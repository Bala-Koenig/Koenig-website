'use client'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

/* ── Course data ─────────────────────────────────────────────── */
const COURSES = [
  {
    id: 1, vendor: 'Microsoft', code: 'AZ-104T00-A',
    name: 'Microsoft Azure Administrator',
    duration: 32, accessDuration: '90 Days',
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.9, enrolled: '2,100+', price: 'INR 9999', certFee: 14400,
    techs: ['Microsoft Azure'],
    startImmediately: true,
  },
  {
    id: 2, vendor: 'Microsoft', code: 'AI-102T00',
    name: 'Designing and Implementing a Microsoft Azure AI Solution',
    duration: 40, accessDuration: '90 Days',
    tags: ['ASSOCIATE'], rating: 4.8, enrolled: '1,350+', price: 'INR 9999',
    techs: ['Artificial Intelligence (AI)', 'Microsoft Azure'],
    startImmediately: true,
  },
  {
    id: 3, vendor: 'Microsoft', code: 'DP-700T00',
    name: 'Microsoft Fabric Data Engineer',
    duration: 32, accessDuration: '90 Days',
    tags: ['ASSOCIATE'], rating: 4.8, enrolled: '1,080+', price: 'INR 9999',
    techs: ['Microsoft Fabric'],
    startImmediately: true,
  },
  {
    id: 4, vendor: 'Microsoft', code: 'SC-300T00',
    name: 'Microsoft Identity and Access Administrator',
    duration: 32, accessDuration: '90 Days',
    tags: ['ASSOCIATE'], rating: 4.7, enrolled: '1,240+', price: 'INR 9999',
    techs: ['Identity and Access Management (IAM)'],
    startImmediately: true,
  },
  {
    id: 5, vendor: 'Microsoft', code: 'SC-200T00',
    name: 'Microsoft Security Operations Analyst',
    duration: 32, accessDuration: '90 Days',
    tags: ['ASSOCIATE'], rating: 4.8, enrolled: '1,620+', price: 'INR 9999',
    techs: ['Cyber Security'],
    startImmediately: true,
  },
  {
    id: 6, vendor: 'Microsoft', code: 'DP-600T00',
    name: 'Microsoft Fabric Analytics Engineer',
    duration: 32, accessDuration: '90 Days',
    tags: ['ASSOCIATE'], rating: 4.7, enrolled: '1,470+', price: 'INR 9999',
    techs: ['Microsoft Fabric'],
    startImmediately: true,
  },
  {
    id: 7, vendor: 'Microsoft', code: 'AZ-204T00',
    name: 'Developing Solutions for Microsoft Azure',
    duration: 40, accessDuration: '90 Days',
    tags: ['EXPERT'], rating: 4.8, enrolled: '1,100+', price: 'INR 9999', certFee: 14400,
    techs: ['Microsoft Azure'],
    startImmediately: true,
  },
  {
    id: 8, vendor: 'Microsoft', code: 'AZ-305T00',
    name: 'Designing Microsoft Azure Infrastructure Solutions',
    duration: 32, accessDuration: '90 Days',
    tags: ['EXPERT'], rating: 4.8, enrolled: '1,150+', price: 'INR 9999', certFee: 14400,
    techs: ['Microsoft Azure'],
    startImmediately: true,
  },
  {
    id: 9, vendor: 'PMI', code: 'PMP',
    name: 'Project Management Professional (PMP®) Certification Training',
    duration: 40, accessDuration: '180 Days',
    tags: ['POPULAR', 'EXPERT'], rating: 4.9, enrolled: '2,600+', price: 'INR 9999', certFee: 28800,
    techs: ['Project Management'],
    startImmediately: false,
  },
  {
    id: 10, vendor: 'Microsoft', code: 'PL-300T00',
    name: 'Microsoft Power BI Data Analyst',
    duration: 8, accessDuration: '60 Days',
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.9, enrolled: '1,800+', price: 'INR 9999', certFee: 4800,
    techs: ['Data Management & Analytics'],
    startImmediately: true,
  },
  {
    id: 11, vendor: 'AWS', code: 'AWS-SAA-C03',
    name: 'AWS Certified Solutions Architect – Associate (Architecting on AWS)',
    duration: 24, accessDuration: '90 Days',
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.9, enrolled: '1,900+', price: 'INR 9999', certFee: 14400,
    techs: ['AWS Cloud'],
    startImmediately: true,
  },
  {
    id: 12, vendor: 'AWS', code: 'AWS-COA-C02',
    name: 'AWS Certified CloudOps Engineer – Associate (Cloud Operations on AWS)',
    duration: 24, accessDuration: '90 Days',
    tags: ['ASSOCIATE'], rating: 4.7, enrolled: '720+', price: 'INR 9999',
    techs: ['AWS Cloud'],
    startImmediately: true,
  },
  {
    id: 13, vendor: 'EC-Council', code: 'CEH-v13',
    name: 'Certified Ethical Hacker (CEH v13)',
    duration: 40, accessDuration: '180 Days',
    tags: ['POPULAR', 'EXPERT'], rating: 4.9, enrolled: '2,200+', price: 'INR 9999', certFee: 14400,
    techs: ['Ethical Hacking and Penetration Testing', 'Cyber Security'],
    startImmediately: false,
  },
  {
    id: 14, vendor: 'CompTIA', code: 'SY0-701',
    name: 'CompTIA Security+ SY0-701',
    duration: 40, accessDuration: '90 Days',
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.8, enrolled: '3,100+', price: 'INR 9999', certFee: 14400,
    techs: ['Cyber Security'],
    startImmediately: true,
  },
  {
    id: 15, vendor: 'Cisco', code: 'CCNA-200-301',
    name: 'Implementing and Administering Cisco Solutions (CCNA)',
    duration: 40, accessDuration: '180 Days',
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.8, enrolled: '2,400+', price: 'INR 9999', certFee: 14400,
    techs: ['CCNA'],
    startImmediately: false,
  },
  {
    id: 16, vendor: 'PECB', code: 'ISO-27001-LI',
    name: 'ISO/IEC 27001 Lead Implementer',
    duration: 40, accessDuration: '90 Days',
    tags: ['EXPERT'], rating: 4.8, enrolled: '1,200+', price: 'INR 9999',
    techs: ['ISO', 'Cyber Security'],
    startImmediately: true,
  },
  {
    id: 17, vendor: 'Microsoft', code: 'MS-900T01',
    name: 'Microsoft 365 Fundamentals',
    duration: 8, accessDuration: '60 Days',
    tags: ['FUNDAMENTALS'], rating: 4.7, enrolled: '2,800+', price: 'INR 9999',
    techs: ['Microsoft 365'],
    startImmediately: true,
  },
  {
    id: 18, vendor: 'Microsoft', code: 'AZ-900T00',
    name: 'Microsoft Azure Fundamentals',
    duration: 8, accessDuration: '60 Days',
    tags: ['POPULAR', 'FUNDAMENTALS'], rating: 4.8, enrolled: '4,100+', price: 'INR 9999', certFee: 4800,
    techs: ['Microsoft Azure'],
    startImmediately: true,
  },
  {
    id: 19, vendor: 'Microsoft', code: 'AZ-500T00',
    name: 'Microsoft Azure Security Technologies',
    duration: 32, accessDuration: '90 Days',
    tags: ['ASSOCIATE'], rating: 4.8, enrolled: '1,430+', price: 'INR 9999',
    techs: ['Cyber Security', 'Microsoft Azure'],
    startImmediately: true,
  },
  {
    id: 20, vendor: 'Microsoft', code: 'MD-102T00',
    name: 'Microsoft 365 Endpoint Administrator',
    duration: 40, accessDuration: '90 Days',
    tags: ['ASSOCIATE'], rating: 4.7, enrolled: '980+', price: 'INR 9999',
    techs: ['Microsoft 365'],
    startImmediately: true,
  },
  {
    id: 21, vendor: 'AWS', code: 'AWS-SAP-C02',
    name: 'AWS Certified Solutions Architect – Professional',
    duration: 40, accessDuration: '180 Days',
    tags: ['EXPERT'], rating: 4.9, enrolled: '1,650+', price: 'INR 9999', certFee: 28800,
    techs: ['AWS Cloud'],
    startImmediately: false,
  },
  {
    id: 22, vendor: 'CompTIA', code: 'N10-009',
    name: 'CompTIA Network+ N10-009',
    duration: 40, accessDuration: '90 Days',
    tags: ['ASSOCIATE'], rating: 4.7, enrolled: '1,850+', price: 'INR 9999', certFee: 14400,
    techs: ['Networking'],
    startImmediately: true,
  },
  {
    id: 23, vendor: 'PMI', code: 'CAPM',
    name: 'Certified Associate in Project Management (CAPM®)',
    duration: 24, accessDuration: '90 Days',
    tags: ['ASSOCIATE'], rating: 4.7, enrolled: '1,100+', price: 'INR 9999',
    techs: ['Project Management'],
    startImmediately: true,
  },
  {
    id: 24, vendor: 'Oracle', code: 'OCI-2024',
    name: 'Oracle Cloud Infrastructure 2024 Architect Associate',
    duration: 32, accessDuration: '90 Days',
    tags: ['ASSOCIATE'], rating: 4.8, enrolled: '680+', price: 'INR 9999', certFee: 14400,
    techs: ['Oracle Cloud'],
    startImmediately: true,
  },
  {
    id: 25, vendor: 'Red Hat', code: 'RH124',
    name: 'Red Hat System Administration I (RHCSA Prep)',
    duration: 40, accessDuration: '180 Days',
    tags: ['ASSOCIATE'], rating: 4.8, enrolled: '1,050+', price: 'INR 9999',
    techs: ['Linux'],
    startImmediately: false,
  },
  {
    id: 26, vendor: 'EC-Council', code: 'CPENT',
    name: 'Certified Penetration Testing Professional (CPENT)',
    duration: 40, accessDuration: '180 Days',
    tags: ['EXPERT'], rating: 4.9, enrolled: '630+', price: 'INR 9999', certFee: 28800,
    techs: ['Ethical Hacking and Penetration Testing', 'Cyber Security'],
    startImmediately: false,
  },
  {
    id: 27, vendor: 'PMI', code: 'PRINCE2-Foundation',
    name: 'PRINCE2® Foundation Certification Training',
    duration: 16, accessDuration: '60 Days',
    tags: ['ASSOCIATE'], rating: 4.8, enrolled: '1,750+', price: 'INR 9999',
    techs: ['Project Management'],
    startImmediately: true,
  },
]

const TAG_STYLES: Record<string, { bg: string; color: string; dot?: boolean }> = {
  POPULAR:     { bg: '#06111E',              color: 'white',    dot: true  },
  ASSOCIATE:   { bg: 'rgba(6,148,209,0.12)', color: '#0694D1'              },
  EXPERT:      { bg: 'rgba(234,88,12,0.12)', color: '#ea580c'              },
  FUNDAMENTALS:{ bg: 'rgba(6,148,209,0.12)', color: '#0694D1'              },
}

const TRAINING_TABS = [
  { id: 'ilo',       label: 'Live Online Classroom (ILO)', href: '/live-online-classroom' },
  { id: 'classroom', label: 'Classroom Training',          href: '/classroom-training'    },
  { id: 'flexi',     label: 'Flexi Training',              href: '/flexi-training'        },
  { id: '1on1',      label: '1-on-1 Training',             href: '/1-on-1-training'       },
  { id: 'fmat',      label: 'Fly-Me-a-Trainer (FMAT)',    href: '#'                      },
]

const BENEFITS = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Learn at Your Own Pace',
    desc: 'Study whenever and wherever suits you. No fixed schedule — access your course content 24/7 for the full duration of your access period.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: 'Live Online Style Video',
    desc: 'Not pre-recorded lectures — Flexi courses feature live online style video recordings, giving you the feel of an instructor-led session at your pace.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    title: 'Official Course Materials',
    desc: 'Every Flexi course includes the official vendor course-book or digital materials (DMOC) — the same resources used in live classroom training.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>,
    title: 'Hands-on Lab Access',
    desc: 'Practice with real lab environments included in your course. Apply what you learn with hands-on exercises — not just theory.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    title: 'Instant Access',
    desc: 'Many Flexi courses are available within minutes of purchase. Start learning immediately without waiting for a scheduled batch.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Exam Vouchers Available',
    desc: 'Optionally add an official exam voucher to your Flexi course purchase and save on separate exam booking costs.',
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Browse & Select Your Course', desc: 'Choose from 5,000+ Flexi courses. Filter by vendor, technology, or certification level. Pick the course that matches your goals.',
    tags: ['5,000+ Courses', 'Self-Paced', 'Vendor Filter'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/> },
  { step: '02', title: 'Purchase & Get Instant Access', desc: 'Complete your purchase and receive access within minutes (standard courses within 24 hours). Your course portal, videos, and labs are ready to go.',
    tags: ['Instant Access', 'Lab Portal', 'Official Materials'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/> },
  { step: '03', title: 'Learn at Your Own Schedule', desc: 'Watch live-style video recordings, complete hands-on labs, and study official course materials — all on your own timeline during your access period.',
    tags: ['24/7 Access', 'Hands-on Labs', 'Go at Your Pace'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/> },
  { step: '04', title: 'Certify & Advance', desc: 'Sit your vendor exam when you feel ready. With an optional exam voucher added at checkout, your certification path is fully covered in one purchase.',
    tags: ['Exam Voucher', 'Vendor Cert', 'Career Growth'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/> },
]

const FAQS = [
  {
    q: 'What is Flexi Training and how is it different from Live Online Training?',
    a: 'Flexi Training is a self-paced learning model where you access live-online-style video recordings, official course materials, and hands-on labs on your own schedule. Unlike Live Online Training (ILO), there is no fixed batch or specific time zone requirement — you learn whenever it suits you.',
  },
  {
    q: 'How quickly will I get access after purchasing a Flexi course?',
    a: 'Many Flexi courses are marked as "Instant" and are available within minutes of purchase. Standard courses are typically delivered within 24 hours. You will receive an email with your access credentials and course portal link as soon as your course is ready.',
  },
  {
    q: 'How long do I have access to the Flexi course content?',
    a: 'Access durations vary by course — typically 60, 90, or 180 days from the date of activation. This is clearly shown on each course card. If you need an extension, please contact our support team and we will be happy to assist.',
  },
  {
    q: 'Are the Flexi course videos recorded live sessions or pre-produced lectures?',
    a: 'Flexi Training features live-online-style video recordings — recordings of actual instructor-led sessions, not studio-produced lectures. This gives you the flow and depth of a real instructor-led training while you watch at your own pace.',
  },
  {
    q: 'Do Flexi courses include official course books and lab access?',
    a: 'Yes. Every Flexi course includes the official vendor course-book or digital materials (DMOC) and hands-on lab access. These are the same materials and labs used in Koenig\'s live instructor-led courses.',
  },
  {
    q: 'What is the Exam Voucher option shown on some course cards?',
    a: 'Some Flexi courses allow you to optionally add an official exam voucher at the time of purchase. Selecting the checkbox adds the voucher cost to your total, allowing you to book and sit the vendor certification exam at your own convenience after completing the course.',
  },
  {
    q: 'Can enterprises purchase Flexi Training for their teams?',
    a: 'Absolutely. Koenig offers customised enterprise Flexi Training plans through its Learnova platform. Contact us to discuss volume licensing, custom learning paths, and LMS integration options for your organisation.',
  },
  {
    q: 'What happens if I need support while going through a Flexi course?',
    a: 'Our support team is available to assist with technical issues or access queries. For content-related queries, you can also reach out to our training advisors who can connect you with subject matter experts or recommend supplementary resources.',
  },
]

const TESTIMONIALS = [
  { name: 'Norman Lardizabal', role: 'IT Professional, Philippines', course: 'Flexi Certified',
    quote: 'I have watched all the videos and I am very much satisfied with the content and presentation. The Flexi format let me learn at my own pace without missing any depth.',
    initials: 'NL', avatarBg: 'linear-gradient(135deg,#076D9D,#4DBFEF)', avatar: '/images/headshots/headshot-1.webp' },
  { name: 'Bhushanjha Bharat', role: 'Cloud Engineer, India', course: 'Azure Flexi Certified',
    quote: 'The training was absolutely superb and I genuinely enjoyed each and every session of it. The content was extremely informative and the Flexi access meant I could revisit complex topics multiple times.',
    initials: 'BB', avatarBg: 'linear-gradient(135deg,#093148,#076D9D)', avatar: '/images/headshots/headshot-4.png' },
  { name: 'Adham Al Mayasi', role: 'IT Manager, Oman', course: 'Flexi Certified',
    quote: 'Exceptional content quality. The live-online-style videos felt just as engaging as attending a classroom. I completed my Azure certification after just 6 weeks of Flexi study.',
    initials: 'AA', avatarBg: 'linear-gradient(135deg,#F47920,#f6a05c)', avatar: '/images/headshots/headshot-3.webp' },
  { name: 'Emmanuel Masabo', role: 'Network Engineer, Rwanda', course: 'Flexi Certified',
    quote: 'The instructor is very organised and the Flexi videos helped me understand difficult concepts at my own speed. I rewatched key sections multiple times until I was confident.',
    initials: 'EM', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)', avatar: '/images/headshots/headshot-2.webp' },
  { name: 'Yoosuf Nizam', role: 'Cloud Architect, Maldives', course: 'AWS Flexi Certified',
    quote: 'One of the finest training experiences I have encountered. The Flexi hands-on labs worked flawlessly and I could complete them on my schedule without rushing.',
    initials: 'YN', avatarBg: 'linear-gradient(135deg,#34A853,#076D9D)', avatar: '/images/headshots/headshot-5.webp' },
  { name: 'Monica Kalamula', role: 'Systems Administrator, Malawi', course: 'Flexi Certified',
    quote: 'The instructor possessed deep understanding and the Flexi video format made complex ideas digestible. I studied during evenings after work and earned my certification within three months.',
    initials: 'MK', avatarBg: 'linear-gradient(135deg,#476D8D,#0694D1)', avatar: '/images/headshots/headshot-1.webp' },
  { name: 'David Muriuki', role: 'Security Engineer, Kenya', course: 'CEH Flexi Certified',
    quote: 'The Flexi labs gave me real hands-on experience that matched exactly what I needed for the CEH exam. Being able to study from Nairobi without a fixed schedule was a game changer.',
    initials: 'DM', avatarBg: 'linear-gradient(135deg,#c8102e,#f47920)', avatar: '/images/headshots/headshot-3.webp' },
  { name: 'Fredrick Fiifi Arthur', role: 'Data Analyst, Ghana', course: 'Power BI Flexi Certified',
    quote: 'Your Flexi content for Power BI was incredibly motivating. Being able to pause and replay the instructor walkthroughs made every module clear and immediately applicable.',
    initials: 'FA', avatarBg: 'linear-gradient(135deg,#F2C811,#0694d1)', avatar: '/images/headshots/headshot-4.png' },
  { name: 'Amjaad Kushar', role: 'IT Professional, Saudi Arabia', course: 'Flexi Certified',
    quote: 'I would like to express my sincere appreciation for such an outstanding learning experience. The official course-book paired with Flexi videos made exam preparation much more effective.',
    initials: 'AK', avatarBg: 'linear-gradient(135deg,#093148,#F47920)', avatar: '/images/headshots/headshot-2.webp' },
]

const SIDEBAR_TECHNOLOGIES = [
  { name: 'All',          label: 'All Technologies',              count: COURSES.length, bg: '#EBF8FE', color: '#0694D1', initial: '★' },
  { name: 'Microsoft Azure',    label: 'Microsoft Azure',         count: COURSES.filter(c => (c.techs??[]).includes('Microsoft Azure')).length, bg: '#E3F2FD', color: '#0078d4', initial: 'Az' },
  { name: 'Cyber Security',     label: 'Cyber Security',          count: COURSES.filter(c => (c.techs??[]).includes('Cyber Security')).length, bg: '#FCE4EC', color: '#c2185b', initial: '🔒' },
  { name: 'AWS Cloud',          label: 'AWS Cloud',               count: COURSES.filter(c => (c.techs??[]).includes('AWS Cloud')).length, bg: '#FFF3E0', color: '#e65100', initial: 'AW' },
  { name: 'Project Management', label: 'Project Management',      count: COURSES.filter(c => (c.techs??[]).includes('Project Management')).length, bg: '#F3E5F5', color: '#7c3aed', initial: 'PM' },
  { name: 'Microsoft Fabric',   label: 'Microsoft Fabric',        count: COURSES.filter(c => (c.techs??[]).includes('Microsoft Fabric')).length, bg: '#E3F2FD', color: '#0078d4', initial: 'Fb' },
  { name: 'Data Management & Analytics', label: 'Data & Analytics', count: COURSES.filter(c => (c.techs??[]).includes('Data Management & Analytics')).length, bg: '#E0F2F1', color: '#0d9488', initial: 'DA' },
  { name: 'CCNA',               label: 'CCNA / Networking',       count: COURSES.filter(c => (c.techs??[]).includes('CCNA')).length, bg: '#E8F5E9', color: '#2e7d32', initial: 'CN' },
  { name: 'Ethical Hacking and Penetration Testing', label: 'Ethical Hacking', count: COURSES.filter(c => (c.techs??[]).includes('Ethical Hacking and Penetration Testing')).length, bg: '#FCE4EC', color: '#c2185b', initial: 'EH' },
  { name: 'ISO',                label: 'ISO / Governance',        count: COURSES.filter(c => (c.techs??[]).includes('ISO')).length, bg: '#E8EAF6', color: '#4f46e5', initial: 'IS' },
  { name: 'Microsoft 365',      label: 'Microsoft 365',           count: COURSES.filter(c => (c.techs??[]).includes('Microsoft 365')).length, bg: '#E3F2FD', color: '#0078d4', initial: 'M3' },
  { name: 'Linux',              label: 'Linux / Red Hat',         count: COURSES.filter(c => (c.techs??[]).includes('Linux')).length, bg: '#E8F5E9', color: '#2e7d32', initial: 'LX' },
  { name: 'Networking',         label: 'Networking / CompTIA',    count: COURSES.filter(c => (c.techs??[]).includes('Networking')).length, bg: '#E8F5E9', color: '#2e7d32', initial: 'NT' },
  { name: 'Oracle Cloud',       label: 'Oracle Cloud',            count: COURSES.filter(c => (c.techs??[]).includes('Oracle Cloud')).length, bg: '#FFF3E0', color: '#e65100', initial: 'OC' },
  { name: 'Identity and Access Management (IAM)', label: 'IAM / Identity', count: COURSES.filter(c => (c.techs??[]).includes('Identity and Access Management (IAM)')).length, bg: '#E3F2FD', color: '#0078d4', initial: 'IA' },
  { name: 'Artificial Intelligence (AI)', label: 'AI / ML',       count: COURSES.filter(c => (c.techs??[]).includes('Artificial Intelligence (AI)')).length, bg: '#E0F2F1', color: '#0d9488', initial: 'AI' },
]

const ALL_VENDORS = ['Microsoft', 'AWS', 'Cisco', 'CompTIA', 'EC-Council', 'PMI', 'PECB', 'Oracle', 'Red Hat']

const TECH_DESCS: Record<string, string> = {
  'Microsoft Azure': 'Browse all Guaranteed self-paced Microsoft Azure Flexi courses with official labs and course materials.',
  'Cyber Security': 'Flexible self-paced cybersecurity courses from CEH, CompTIA, ISO, and more — study at your own pace.',
  'AWS Cloud': 'Self-paced AWS Flexi courses with hands-on lab access and optional exam vouchers.',
  'Project Management': 'Flexible PMP, CAPM, and PRINCE2 training you can complete on your own schedule.',
}

const SYL_COUNTRIES = [
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

/* ── Syllabus Modal ──────────────────────────────────────────── */
function SyllabusModal({ courseName, onClose }: { courseName: string; onClose: () => void }) {
  const [sylName, setSylName]               = useState('')
  const [sylEmail, setSylEmail]             = useState('')
  const [sylCountry, setSylCountry]         = useState('')
  const [sylCountryOpen, setSylCountryOpen] = useState(false)
  const [submitted, setSubmitted]           = useState(false)
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
      <style>{`@keyframes flexiSylSlideIn{from{opacity:0;transform:translate(-50%,-54%)}to{opacity:1;transform:translate(-50%,-50%)}}`}</style>
      <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(5px)' }}
        onClick={e => { if (e.target === e.currentTarget) close() }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 2001, width: '100%', maxWidth: 'min(90vw,440px)', background: 'linear-gradient(160deg,#062238 0%,#093148 100%)', borderRadius: 20, padding: '32px 28px 28px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', fontFamily: 'inherit', animation: 'flexiSylSlideIn 0.3s cubic-bezier(0.25,1,0.5,1)' }}>
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
            <button onClick={close} style={{ width: '100%', padding: 11, borderRadius: 10, border: '1px solid rgba(6,148,209,0.35)', background: 'transparent', color: '#0694D1', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0694D1', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, color: '#0694D1', textTransform: 'uppercase' }}>Download Syllabus</span>
            </div>
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
                <input required type="email" placeholder="you@example.com" value={sylEmail} onChange={e => setSylEmail(e.target.value)} style={inp}
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
                    <div style={{ position: 'absolute', bottom: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 10000, background: '#0d2535', border: '1.5px solid rgba(6,148,209,0.35)', borderRadius: 10, maxHeight: 420, overflowY: 'auto', overscrollBehavior: 'contain', boxShadow: '0 -8px 32px rgba(0,0,0,0.6)' }}>
                      <div style={{ padding: '9px 14px', fontSize: 13.5, color: 'rgba(255,255,255,0.35)', cursor: 'default', borderBottom: '1px solid rgba(6,148,209,0.15)' }}>Select your country</div>
                      {SYL_COUNTRIES.map(c => (
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
              <button type="submit" onClick={e => { if (!sylCountry) { e.preventDefault(); setSylCountryOpen(true) } }}
                style={{ width: '100%', padding: 13, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#0694D1,#0577ab)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', letterSpacing: 0.2, boxShadow: '0 4px 18px rgba(6,148,209,0.4)', marginTop: 2, transition: 'filter 0.18s' }}>
                Send Course Content →
              </button>
            </form>
          </>
        )}
      </div>
    </>
  )
}

/* ── FilterDropdown ──────────────────────────────────────────── */
function FilterDropdown({ label, options, value, onChange, fullWidth, inputType = 'radio', values, onMultiChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void; fullWidth?: boolean;
  inputType?: 'radio' | 'checkbox'; values?: string[]; onMultiChange?: (vals: string[]) => void;
}) {
  const [open, setOpen]   = useState(false)
  const [query, setQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const ref      = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      function handle(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
      }
      document.addEventListener('mousedown', handle)
      return () => document.removeEventListener('mousedown', handle)
    }
  }, [isMobile])

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 80) }, [open])

  const isChecked = (o: string) => inputType === 'checkbox' ? (values ?? []).includes(o) : value === o
  const activeCount = inputType === 'checkbox' ? (values ?? []).length : (value && value !== label ? 1 : 0)
  const displayed = inputType === 'checkbox' ? label : (value && value !== label ? value : label)
  const filtered  = options.filter(o => o.toLowerCase().includes(query.toLowerCase()))
  const hasValue  = activeCount > 0

  const handleSelect = (o: string) => {
    if (inputType === 'checkbox') {
      const cur = values ?? []
      const next = cur.includes(o) ? cur.filter(v => v !== o) : [...cur, o]
      onMultiChange?.(next)
    } else {
      onChange(o)
      setOpen(false)
      setQuery('')
    }
  }

  const handleClear = () => {
    if (inputType === 'checkbox') { onMultiChange?.([]); }
    else { onChange(''); }
    setQuery('')
  }

  const triggerBtn = (
    <button onClick={() => setOpen(p => !p)}
      className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all ${fullWidth ? 'w-full justify-between' : ''}`}
      style={{ border: `1px solid ${hasValue ? '#0694D1' : '#CAEFFF'}`, background: 'white', color: hasValue ? '#0694D1' : '#475569', boxShadow: '0 1px 4px rgba(6,148,209,0.06)' }}>
      <span className="max-w-[120px] truncate">{displayed}</span>
      {inputType === 'checkbox' && activeCount > 0 && (
        <span style={{ minWidth: 18, height: 18, borderRadius: 999, background: '#0694D1', color: '#fff', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px', flexShrink: 0 }}>{activeCount}</span>
      )}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: '#94A3B8' }}>
        <path d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
  )

  const mobileSheet = open && isMobile && typeof document !== 'undefined' && createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={() => { setOpen(false); setQuery('') }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(6,18,30,0.55)', backdropFilter: 'blur(2px)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: '20px 20px 0 0', padding: '0 0 0', maxHeight: '75vh', display: 'flex', flexDirection: 'column', boxShadow: '0 -8px 40px rgba(6,148,209,0.18)' }}>
        <div style={{ padding: '12px 20px 0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ width: 36, height: 4, borderRadius: 999, background: '#CBD5E1', margin: '5px auto 0' }} />
            <button onClick={() => { setOpen(false); setQuery('') }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#94A3B8', lineHeight: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div style={{ marginBottom: 12 }}><span style={{ fontSize: 14, fontWeight: 700, color: '#0694D1' }}>{label}</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8FBFF', border: '1px solid #CAEFFF', borderRadius: 10, padding: '8px 12px', marginBottom: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search…" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, fontWeight: 400, color: '#0F172A', WebkitAppearance: 'none' }} />
          </div>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: '4px 12px' }}>
          {filtered.map(o => {
            const checked = isChecked(o)
            return (
              <button key={o} onClick={() => handleSelect(o)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', padding: '10px 8px', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 400, color: checked ? '#0694D1' : '#374151', background: checked ? 'rgba(6,148,209,0.06)' : 'transparent', marginBottom: 1 }}>
                {inputType === 'radio' ? (
                  <span style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${checked ? '#0694D1' : '#CBD5E1'}`, background: checked ? '#0694D1' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {checked && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'block' }} />}
                  </span>
                ) : (
                  <span style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${checked ? '#0694D1' : '#CBD5E1'}`, background: checked ? '#0694D1' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {checked && <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="1.5,6 4.5,9 10.5,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </span>
                )}
                {o}
              </button>
            )
          })}
          {filtered.length === 0 && <p style={{ padding: '12px 8px', fontSize: 12, color: '#94A3B8' }}>No results</p>}
        </div>
        <div style={{ flexShrink: 0, padding: '12px 16px 32px', borderTop: '1px solid #EBF8FE', display: 'flex', gap: 10 }}>
          <button onClick={handleClear}
            style={{ flex: 1, padding: '11px', borderRadius: 12, background: 'transparent', border: '1.5px solid #CAEFFF', color: '#64748B', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Clear</button>
          <button onClick={() => { setOpen(false); setQuery('') }}
            style={{ flex: 2, padding: '11px', borderRadius: 12, background: 'linear-gradient(135deg,#0694D1,#076D9D)', border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            Apply{activeCount > 0 ? ` (${activeCount})` : ''}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )

  return (
    <div ref={ref} className={`relative ${fullWidth ? 'w-full' : 'shrink-0'}`}>
      {triggerBtn}
      {open && !isMobile && (
        <div className="absolute left-0 top-full mt-1.5 z-50 rounded-2xl overflow-hidden"
          style={{ width: fullWidth ? '100%' : undefined, minWidth: fullWidth ? undefined : '220px', maxWidth: 'min(240px, calc(100vw - 2rem))', background: 'white', border: '1px solid #CAEFFF', boxShadow: '0 8px 32px rgba(6,148,209,0.16)' }}>
          <div className="p-2 border-b" style={{ borderColor: '#EBF8FE' }}>
            <div className="flex items-center gap-2 rounded-lg px-3 py-1.5" style={{ background: '#F8FBFF', border: '1px solid #CAEFFF' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search…" className="flex-1 bg-transparent text-xs outline-none" style={{ color: '#0F172A' }} />
            </div>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
            {filtered.map(o => (
              <button key={o} onClick={() => { onChange(o); setOpen(false); setQuery('') }}
                className="w-full px-4 py-2 text-left transition-colors hover:bg-[#F0FAFF]"
                style={{ fontSize: 12, color: value === o ? '#0694D1' : '#374151', fontWeight: value === o ? 700 : 400 }}>
                {o}
              </button>
            ))}
            {filtered.length === 0 && <p className="px-4 py-3 text-xs" style={{ color: '#94A3B8' }}>No results</p>}
          </div>
        </div>
      )}
      {mobileSheet}
    </div>
  )
}

/* ── InquiryForm ─────────────────────────────────────────────── */
function InquiryForm({ formType, setFormType }: { formType: 'individual' | 'enterprise'; setFormType: (t: 'individual' | 'enterprise') => void }) {
  const [submitted, setSubmitted] = useState(false)
  const inp: React.CSSProperties = { width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 12, color: '#fff', padding: '10px 14px', fontSize: 13.5, fontFamily: 'inherit', outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '24px 0' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 18, margin: '0 0 8px' }}>Thank you!</h3>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>Our team will reach out within 1 business day.</p>
    </div>
  )

  return (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 12, padding: 4, marginBottom: 4 }}>
        {(['individual', 'enterprise'] as const).map(t => (
          <button key={t} type="button" onClick={() => setFormType(t)}
            style={{ flex: 1, borderRadius: 9, padding: '10px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.2s',
              ...(formType === t ? { background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: '#fff', boxShadow: '0 2px 12px rgba(6,148,209,0.35)' } : { background: 'transparent', color: 'rgba(255,255,255,0.45)' }) }}>
            {t === 'individual'
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/><path d="M2 12h20"/></svg>}
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div><label style={lbl}>Full Name <span style={{ color: '#f87171' }}>*</span></label><input type="text" required placeholder="John Smith" style={inp} /></div>
        <div><label style={lbl}>{formType === 'enterprise' ? 'Business Email' : 'Email'} <span style={{ color: '#f87171' }}>*</span></label><input type="email" required placeholder="you@company.com" style={inp} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div><label style={lbl}>Phone</label><input type="tel" placeholder="+91 98765 43210" style={inp} /></div>
        <div><label style={lbl}>{formType === 'enterprise' ? 'No. of Trainees' : 'Course Name'}</label><input type="text" placeholder={formType === 'enterprise' ? 'e.g. 25' : 'Course name'} style={inp} /></div>
      </div>
      <div><label style={lbl}>Message</label><textarea rows={3} placeholder="Tell us about your training needs…" style={{ ...inp, resize: 'none', lineHeight: 1.6 }} /></div>
      <button type="submit" style={{ width: '100%', padding: 13, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#0694D1,#0577ab)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 4px 18px rgba(6,148,209,0.4)', marginTop: 2 }}>
        Send Request →
      </button>
    </form>
  )
}

/* ── Course Card ─────────────────────────────────────────────── */
function CourseCard({ course }: {
  course: typeof COURSES[0];
}) {
  const [voucherAdded, setVoucherAdded] = useState(false)
  const [feesOpen, setFeesOpen] = useState(false)
  const isPopular = (course.tags ?? []).includes('POPULAR')
  const days = Math.ceil(course.duration / 8)

  const courseNum  = parseInt(course.price.replace(/[^0-9]/g, ''), 10)
  const voucherNum = voucherAdded && course.certFee ? course.certFee : 0
  const subtotal   = courseNum + voucherNum
  const gstNum     = Math.round(subtotal * 0.18)
  const grandTotal = subtotal + gstNum

  return (
    <>
      {feesOpen && typeof document !== 'undefined' && createPortal(
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }} onClick={() => setFeesOpen(false)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 9999, width: 'calc(100vw - 32px)', maxWidth: 340, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.22)' }}>
            <div style={{ background: '#071e2e', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff' }}>Fees Breakdown</span>
              <button onClick={() => setFeesOpen(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 700 }}>✕</button>
            </div>
            <div style={{ padding: '4px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #f0f4f8' }}>
                <div>
                  <div style={{ color: '#4a6a8a' }}>Flexi Course Access</div>
                  <div style={{ fontSize: 11, color: '#8a9db5', marginTop: 2 }}>{course.duration} hrs · {course.accessDuration} Access</div>
                </div>
                <span style={{ fontWeight: 600, color: '#071e2e', flexShrink: 0 }}>INR {courseNum.toLocaleString('en-IN')}</span>
              </div>
              {voucherAdded && course.certFee && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #f0f4f8' }}>
                  <div>
                    <div style={{ color: '#4a6a8a' }}>Exam Voucher</div>
                    <div style={{ fontSize: 11, color: '#8a9db5', marginTop: 2 }}>Official {course.vendor} exam voucher</div>
                  </div>
                  <span style={{ fontWeight: 600, color: '#071e2e', flexShrink: 0 }}>INR {voucherNum.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #e8f4fa' }}>
                <span style={{ color: '#4a6a8a' }}>+ GST 18%</span>
                <span style={{ fontWeight: 600, color: '#071e2e' }}>INR {gstNum.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: 14, background: '#f8fcff' }}>
                <span style={{ fontWeight: 700, color: '#071e2e' }}>Total (INR)</span>
                <span style={{ fontWeight: 700, color: '#071e2e' }}>INR {grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '10px 16px 14px', borderTop: '1px solid #e8f4fa' }}>
              <button onClick={() => setFeesOpen(false)} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#0694D1', textDecoration: 'underline', cursor: 'pointer' }}>Hide Breakdown</button>
            </div>
          </div>
        </>,
        document.body
      )}
      <div className="flex flex-col rounded-2xl overflow-hidden relative group/card transition-all duration-300 hover:-translate-y-1"
        style={{ background: 'white', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(6,148,209,0.18)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#CAEFFF' }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#E2E8F0' }}>

        {isPopular && (
          <span className="absolute" style={{ top: 0, right: 0, display: 'inline-flex', alignItems: 'center', gap: 4, height: 20, fontSize: 9, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', padding: '0 10px 0 8px', borderRadius: '0 14px 0 10px', background: 'linear-gradient(135deg,#0694D1,#22d3ee)', color: '#fff', boxShadow: '-2px 2px 8px rgba(6,148,209,0.28)', zIndex: 2 }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c0 0-5.5 6-5.5 10.5a5.5 5.5 0 0 0 11 0C17.5 8 12 2 12 2z"/></svg>
            Popular
          </span>
        )}

        {/* Card header */}
        <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
            style={{ background: '#EBF8FE', color: '#0694D1' }}>{course.vendor}</span>
          <h3 className="mt-2 text-sm font-bold leading-snug pr-12" style={{ color: '#0F172A' }}>
            {course.code}: {course.name}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2.5">
            <div className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: '#475569' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {course.duration} hrs
            </div>
          </div>
        </div>

        {/* Access info */}
        <div className="px-4 py-3 flex flex-col gap-2">
          {/* Exam Voucher checkbox */}
          {course.certFee && (
            <label
              className="flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 transition-colors mt-1"
              style={voucherAdded
                ? { border: '1.5px solid #0694D1', background: 'rgba(6,148,209,0.08)', boxShadow: '0 0 0 1px rgba(6,148,209,0.25)' }
                : { border: '1px solid #E2E8F0', background: '#F8FAFC' }
              }
            >
              <div className="flex items-center gap-2">
                <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 transition-colors"
                  style={voucherAdded ? { borderColor: '#0694D1', background: '#0694D1' } : { borderColor: '#CBD5E1', background: 'white' }}>
                  {voucherAdded && (
                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={voucherAdded ? '#0694D1' : '#64748B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  <span className="text-xs font-semibold" style={{ color: voucherAdded ? '#0694D1' : '#374151' }}>
                    Exam Voucher <span style={{ color: voucherAdded ? '#38bdf8' : '#94A3B8', fontWeight: 500 }}>(optional)</span>
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold" style={{ color: '#093148' }}>
                INR {course.certFee.toLocaleString('en-IN')} +
              </span>
              <input type="checkbox" className="sr-only" checked={voucherAdded} onChange={() => setVoucherAdded(!voucherAdded)} />
            </label>
          )}

          {/* Price row */}
          <div className="flex items-center justify-between mt-0.5">
            <div className="flex items-center gap-1.5">
              <span style={{ color: '#F59E0B', fontSize: 11 }}>★</span>
              <span className="text-[11px] font-semibold" style={{ color: '#64748B' }}>{course.rating}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold leading-tight" style={{ color: '#0694D1' }}>{course.price}</p>
              <p className="text-[10px] leading-tight mt-0.5" style={{ color: '#94A3B8' }}>excl. VAT/GST</p>
            </div>
          </div>

          <button onClick={() => setFeesOpen(true)} className="text-[10px] font-semibold hover:underline cursor-pointer text-right"
            style={{ color: '#0694D1' }}>
            View Fees Breakdown
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 px-4 pb-4 mt-auto">
          <button className="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all cursor-pointer"
            style={{ border: '1.5px solid #093148', color: '#093148', background: 'transparent' }}>
            View Course
          </button>
          <button className="flex-1 rounded-lg py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #093148, #076D9D)' }}>
            Enroll Now
          </button>
        </div>
      </div>
    </>
  )
}

/* ── Testimonials Column (CSS animation) ─────────────────────── */
function FlexiTestimonialsColumn({ items, duration = 15, className }: { items: typeof TESTIMONIALS; duration?: number; className?: string }) {
  const doubled = [...items, ...items]
  return (
    <div className={`flexi-test-col-wrap${className ? ' ' + className : ''}`} style={{ overflow: 'hidden' }}>
      <ul className="flexi-test-col-track" style={{ animationDuration: `${duration}s`, listStyle: 'none', margin: 0, padding: 0 }}>
        {doubled.map((t, i) => (
          <li key={i} style={{ width: 280, flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 16, background: '#fff', border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
              <div style={{ flex: 1, padding: '18px 18px 14px' }}>
                <div style={{ marginBottom: 8, fontSize: 13, color: '#FBBF24' }}>★★★★★</div>
                <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.7, color: '#2d4a6a' }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {t.avatar ? (
                    <img decoding="async" src={t.avatar} alt={t.name} loading="lazy"
                      style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #DCEEFB', flexShrink: 0, objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #DCEEFB', flexShrink: 0, background: t.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>
                      {t.initials}
                    </div>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#0d1b2a', lineHeight: 1.3 }}>{t.name}</p>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#0694D1' }}>{t.role}</p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E8F4FA', background: '#F8FCFF', padding: '10px 18px' }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#0d1b2a' }}>{t.course}</p>
                <span style={{ background: '#E8F4FA', color: '#0569a8', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>✓ Verified</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Mobile Testimonial Row (rAF horizontal) ─────────────────── */
function FlexiMobileTestimonialRow({ items }: { items: typeof TESTIMONIALS }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const posRef   = useRef(0)
  const dragRef  = useRef({ active: false, startX: 0, startPos: 0 })
  const rafRef   = useRef<number | null>(null)
  const [popup, setPopup] = useState<typeof TESTIMONIALS[0] | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const loop = () => {
      if (!dragRef.current.active) {
        posRef.current += 0.5
        const half = track.scrollWidth / 2
        if (posRef.current >= half) posRef.current -= half
        track.style.transform = `translateX(-${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const onTouchStart = (e: React.TouchEvent) => { dragRef.current = { active: true, startX: e.touches[0].clientX, startPos: posRef.current } }
  const onTouchMove  = (e: React.TouchEvent) => {
    if (!dragRef.current.active || !trackRef.current) return
    const delta = dragRef.current.startX - e.touches[0].clientX
    const half  = trackRef.current.scrollWidth / 2
    posRef.current = ((dragRef.current.startPos + delta) % half + half) % half
    trackRef.current.style.transform = `translateX(-${posRef.current}px)`
  }
  const onTouchEnd = () => { dragRef.current.active = false }

  return (
    <>
      <div className="sm:hidden" style={{ overflow: 'hidden', marginTop: 28 }}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <ul ref={trackRef} style={{ listStyle: 'none', margin: 0, padding: '4px 0', display: 'flex', gap: '16px', width: 'max-content' }}>
          {[...items, ...items].map((t, i) => (
            <li key={i} style={{ width: 280, flexShrink: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 16, background: '#fff', border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
                <div style={{ flex: 1, padding: '18px 18px 14px' }}>
                  <div style={{ marginBottom: 8, fontSize: 13, color: '#FBBF24' }}>★★★★★</div>
                  <p style={{ margin: '0 0 6px', fontSize: 13, lineHeight: 1.7, color: '#2d4a6a', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>&ldquo;{t.quote}&rdquo;</p>
                  <button onClick={e => { e.stopPropagation(); setPopup(t) }}
                    style={{ background: 'none', border: 'none', color: '#0694D1', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', padding: '0 0 12px', display: 'block' }}>Show more →</button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {t.avatar ? (
                      <img decoding="async" src={t.avatar} alt={t.name} loading="lazy"
                        style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #DCEEFB', flexShrink: 0, objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #DCEEFB', flexShrink: 0, background: t.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>
                        {t.initials}
                      </div>
                    )}
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#0d1b2a', lineHeight: 1.3 }}>{t.name}</p>
                      <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#0694D1' }}>{t.role}</p>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E8F4FA', background: '#F8FCFF', padding: '10px 18px' }}>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#0d1b2a' }}>{t.course}</p>
                  <span style={{ background: '#E8F4FA', color: '#0569a8', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>✓ Verified</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {popup && typeof document !== 'undefined' && createPortal(
        <div onClick={() => setPopup(null)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(7,30,46,0.70)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: '28px 24px 40px', width: '100%', maxWidth: 480, maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 16, color: '#FBBF24', letterSpacing: 2 }}>★★★★★</span>
              <button onClick={() => setPopup(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b8299" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#2d4a6a', margin: '0 0 24px' }}>&ldquo;{popup.quote}&rdquo;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              {popup.avatar ? (
                <img decoding="async" loading="lazy" src={popup.avatar} alt={popup.name}
                  style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #DCEEFB', objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <div style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #DCEEFB', flexShrink: 0, background: popup.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff' }}>
                  {popup.initials}
                </div>
              )}
              <div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0d1b2a' }}>{popup.name}</p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#0694D1' }}>{popup.role}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E8F4FA', paddingTop: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0d1b2a' }}>{popup.course}</span>
              <span style={{ background: '#E8F4FA', color: '#0569a8', borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 700 }}>✓ Verified</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function FlexiTrainingPage() {
  const [activeTechs, setActiveTechs]     = useState<string[]>([])
  const [search, setSearch]               = useState('')
  const [filterVendor, setFilterVendor]   = useState('Microsoft')
  const [vendorSearch, setVendorSearch]   = useState('')
  const [techSearch, setTechSearch]       = useState('')
  const [page, setPage]                   = useState(0)
  const [formType, setFormType]           = useState<'individual' | 'enterprise'>('individual')
  const [openFaq, setOpenFaq]             = useState<number | null>(null)
  const tabScrollRef                       = useRef<HTMLDivElement>(null)
  const [benSlideIdx, setBenSlideIdx]     = useState(0)
  const benTouchStartX                     = useRef(0)
  const [howSlideIdx, setHowSlideIdx]     = useState(0)
  const howTouchStartX                     = useRef(0)
  const [showSyllabusModal, setShowSyllabusModal] = useState(false)
  const [syllabusCourseName, setSyllabusCourseName] = useState('')
  const PER_PAGE = 9

  const toggleTech = (t: string) => {
    setActiveTechs(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
    setPage(0)
  }

  useEffect(() => {
    const container = tabScrollRef.current
    if (!container) return
    const activeBtn = container.querySelector('[data-tab="flexi"]') as HTMLElement
    if (!activeBtn) return
    container.scrollLeft = activeBtn.offsetLeft - container.offsetLeft
  }, [])

  const filtered = COURSES.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.vendor.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    const matchTech   = activeTechs.length > 0
      ? (c.techs ?? []).some(t => activeTechs.includes(t))
      : true
    const matchVendor = !filterVendor || c.vendor === filterVendor
    return matchSearch && matchTech && matchVendor
  })
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
  const activeTechData = activeTechs.length === 1
    ? SIDEBAR_TECHNOLOGIES.find(t => t.name === activeTechs[0]) ?? SIDEBAR_TECHNOLOGIES[0]
    : filterVendor
    ? { name: '', label: `${filterVendor} Courses`, count: filtered.length, bg: '#EBF8FE', color: '#0694D1', initial: '★' }
    : SIDEBAR_TECHNOLOGIES[0]
  const bannerDesc = activeTechs.length === 1
    ? (TECH_DESCS[activeTechs[0]] ?? `Browse all self-paced ${activeTechData.label} Flexi Training courses — start immediately.`)
    : filterVendor
    ? `Browse all self-paced ${filterVendor} Flexi Training courses with official labs and materials.`
    : `Browse all self-paced Flexi Training courses with official labs, materials, and optional exam vouchers.`

  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      {showSyllabusModal && (
        <SyllabusModal courseName={syllabusCourseName} onClose={() => setShowSyllabusModal(false)} />
      )}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #061624 0%, #071929 60%, #062236 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-1/3 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: '#0694D1' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: '#38bdf8' }} />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full opacity-8 blur-[80px]" style={{ background: '#076D9D' }} />
        </div>

        <style>{`
          .flexi-stat-item:hover .flexi-stat-glow { opacity: 1 !important; }
        `}</style>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px] py-[35px]">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-bold leading-tight mb-[15px] text-white">
                Flexi - Self Paced Training from Koenig
              </h1>

              {/* Feature icons row */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 mb-[15px]" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>
                <span className="inline-flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                  Live Online Style Video
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  Official Course-Book
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  Hands-on Labs
                </span>
              </div>

              <p className="text-sm sm:text-base leading-relaxed mb-[15px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Courses marked <strong className="text-white">&ldquo;Instant&rdquo;</strong> are available within minutes of purchase. You will receive an email with login details to LET portal to access the purchase. Other courses can take up to 48 hrs to deliver.
              </p>

              <div className="mb-[15px]" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }} />

              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Customized plans available with Flexi Enterprise – select the ideal mix of courses and participants for your team{' '}
                <a href="#request" className="font-semibold" style={{ color: '#38bdf8' }}>Enquire Now&gt;&gt;</a>
              </p>
            </div>

            {/* Right — feature cards */}
            <div className="hidden lg:grid grid-cols-2 gap-3" style={{ gridTemplateRows: 'auto auto auto' }}>
              {[
                { full: false, label: <>Get Access to <span style={{ color: '#38bdf8' }}>Unlimited Flexi Courses</span> with an Annual Subscription</> },
                { full: false, label: <>Free <span style={{ color: '#38bdf8' }}>Online Doubt Clearance</span> Session</> },
                { full: false, label: <>Free Upgrades to <span style={{ color: '#38bdf8' }}>New Version</span></> },
                { full: false, label: <>Access to <span style={{ color: '#38bdf8' }}>Qubits</span> (Interactive self-assessment tool)</> },
                { full: true,  label: <>Recorded Sessions from <span style={{ color: '#38bdf8' }}>Live Interactive Classes</span></> },
              ].map(({ label, full }, i) => (
                <div key={i}
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(6,148,209,0.25)', gridColumn: full ? '1 / -1' : undefined }}>
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.5)' }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span className="text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.82)' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Mobile feature list */}
            <div className="lg:hidden flex flex-col gap-2 mt-[15px]">
              {[
                <>Get Access to <span style={{ color: '#38bdf8' }}>Unlimited Flexi Courses</span> with an Annual Subscription</>,
                <>Free <span style={{ color: '#38bdf8' }}>Online Doubt Clearance</span> Session</>,
                <>Free Upgrades to <span style={{ color: '#38bdf8' }}>New Version</span></>,
                <>Access to <span style={{ color: '#38bdf8' }}>Qubits</span> (Interactive self-assessment tool)</>,
                <>Recorded Sessions from <span style={{ color: '#38bdf8' }}>Live Interactive Classes</span></>,
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <span className="mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(6,148,209,0.2)', border: '1px solid rgba(6,148,209,0.4)' }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  {f}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── TRAINING MODE TABS ───────────────────────────────── */}
      <style>{`
        @keyframes tab-border-sweep { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .tab-border-glow { background:linear-gradient(270deg,#0694D1,#38bdf8,#076D9D,#38bdf8,#0694D1); background-size:400% 400%; animation:tab-border-sweep 3s ease infinite; padding:2px; border-radius:1rem; display:inline-flex; }
      `}</style>
      <section className="bg-white border-b py-4" style={{ borderColor: '#E2E8F0' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="sm:hidden">
            <div className="tab-border-glow" style={{ display: 'block', width: '100%' }}>
              <div ref={tabScrollRef} className="flex overflow-x-auto rounded-[14px] bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                {TRAINING_TABS.map(t =>
                  t.id === 'flexi' ? (
                    <button key={t.id} data-tab={t.id}
                      className="relative whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 px-6 py-3 text-sm bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30">
                      {t.label}
                    </button>
                  ) : (
                    <Link key={t.id} href={t.href}
                      className="inline-flex items-center relative whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 px-4 py-3 text-sm text-[#7a8c96]">
                      {t.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="hidden sm:flex justify-center">
            <div className="tab-border-glow">
              <div className="inline-flex overflow-hidden rounded-[14px] bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]">
                {TRAINING_TABS.map(t =>
                  t.id === 'flexi' ? (
                    <button key={t.id}
                      className="relative whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 px-8 py-3 text-sm sm:text-base bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30">
                      {t.label}
                    </button>
                  ) : (
                    <Link key={t.id} href={t.href}
                      className="inline-flex items-center relative whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 px-6 py-3 text-sm text-[#7a8c96] hover:text-[#093148]">
                      {t.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 md:px-8 lg:px-[50px]" style={{ background: '#07121e', paddingTop: '20px', paddingBottom: '20px' }}>
        <style>{`
          @keyframes benCardIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
          .flexi-ben-card { position:relative;overflow:hidden;border-radius:18px;padding:24px;cursor:default;
            background:linear-gradient(145deg,rgba(13,32,53,.92) 0%,rgba(10,22,40,.96) 60%,rgba(11,37,69,.88) 100%);
            border:1px solid rgba(19,168,212,.18); transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease,border-color .35s ease; }
          .flexi-ben-card:hover { transform:translateY(-6px); border-color:rgba(19,168,212,.55); box-shadow:0 0 0 1px rgba(19,168,212,.2),0 16px 40px rgba(0,0,0,.4); }
        `}</style>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center mb-[15px]">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#38bdf8' }}>Why Flexi</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Choose{' '}
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Flexi Training
              </span>{' '}with Koenig?
            </h2>
          </div>
          {/* Mobile slider */}
          <div className="sm:hidden"
            onTouchStart={e => { benTouchStartX.current = e.touches[0].clientX }}
            onTouchEnd={e => {
              const dx = benTouchStartX.current - e.changedTouches[0].clientX
              if (dx > 50)  setBenSlideIdx(p => Math.min(p + 1, BENEFITS.length - 1))
              if (dx < -50) setBenSlideIdx(p => Math.max(p - 1, 0))
            }}>
            <div className="overflow-hidden">
              <div className="flex" style={{ transform: `translateX(-${benSlideIdx * 100}%)`, transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)' }}>
                {BENEFITS.map(b => (
                  <div key={b.title} className="flexi-ben-card shrink-0 w-full">
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(19,168,212,0.08)', border: '1px solid rgba(19,168,212,0.28)' }}>
                        {b.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">{b.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.52)' }}>{b.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-1.5 mt-4">
              {BENEFITS.map((_, i) => (
                <button key={i} onClick={() => setBenSlideIdx(i)}
                  className="rounded-full transition-all"
                  style={{ width: i === benSlideIdx ? 20 : 8, height: 8, background: i === benSlideIdx ? '#0694D1' : 'rgba(255,255,255,0.2)' }} />
              ))}
            </div>
          </div>
          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map(b => (
              <div key={b.title} className="flexi-ben-card">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(19,168,212,0.08)', border: '1px solid rgba(19,168,212,0.28)' }}>
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{b.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.52)' }}>{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ──────────────────────────────────────────── */}
      <section id="schedule" className="relative py-[20px]" style={{ background: '#EBF8FE', borderTop: '1px solid #CAEFFF' }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-16 left-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.16) 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">

          <div className="flex flex-col items-center text-center mb-[15px]">
            <div className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ background: 'rgba(6,148,209,0.1)', color: '#0694D1' }}>Self-Paced Courses</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: '#071e2e', lineHeight: 1.2 }}>
              Browse <em style={{ fontStyle: 'normal', background: 'linear-gradient(90deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Flexi Courses</em>
            </h2>
            <p className="text-sm" style={{ color: '#5a7a90', marginTop: 4 }}>
              Self-paced with official materials, hands-on labs, and optional exam vouchers — start anytime.
            </p>
          </div>

          <div className="relative rounded-2xl p-4 sm:p-5" style={{ background: '#F0F9FF', border: '1px solid #CAEFFF', boxShadow: '0 4px 24px rgba(6,148,209,0.08)' }}>
            <div className="flex gap-5 items-start">

              {/* Left sidebar — desktop */}
              <div className="hidden lg:flex flex-col w-[220px] shrink-0 rounded-2xl overflow-hidden bg-white self-start sticky top-4"
                style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 10px rgba(6,148,209,0.07)' }}>
                {/* Vendor */}
                <div className="px-3 pt-3 pb-2" style={{ borderBottom: '1px solid #EBF8FE' }}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>VENDOR</p>
                  <div className="relative">
                    <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" placeholder="Search..." value={vendorSearch} onChange={e => setVendorSearch(e.target.value)}
                      className="w-full pl-7 py-1.5 text-[11px] rounded-lg outline-none"
                      style={{ background: '#F0F9FF', border: '1px solid #CAEFFF', color: '#0F172A', paddingRight: vendorSearch ? '24px' : '8px' }} />
                    {vendorSearch && (
                      <button onClick={() => setVendorSearch('')} className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-5 h-5 hover:bg-[#CAEFFF] transition-all" style={{ color: '#64748B' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    )}
                  </div>
                  <div className="mt-2" style={{ borderBottom: '1px solid #EBF8FE', marginLeft: '-12px', marginRight: '-12px' }} />
                </div>
                <div className="flex flex-col overflow-y-auto" style={{ maxHeight: 296 }}>
                  {ALL_VENDORS.filter(v => !vendorSearch || v.toLowerCase().includes(vendorSearch.toLowerCase())).map(v => {
                    const count = COURSES.filter(c => c.vendor === v).length
                    if (count === 0) return null
                    const active = filterVendor === v
                    return (
                      <button key={v} onClick={() => { setFilterVendor(active ? '' : v); setPage(0) }}
                        className="flex items-center justify-between w-full px-3 py-2 text-left transition-colors hover:bg-[#F0FAFF]"
                        style={{ borderLeft: `3px solid ${active ? '#0694D1' : 'transparent'}`, background: active ? '#EBF8FE' : 'white' }}>
                        <span className="text-[13px] font-medium truncate" style={{ color: active ? '#0694D1' : '#374151' }} title={v}>{v}</span>
                        <span className="text-[10px] font-bold rounded-full px-1.5 py-0.5 shrink-0 ml-1"
                          style={{ background: active ? '#0694D1' : '#E2E8F0', color: active ? 'white' : '#6B7280' }}>{count}</span>
                      </button>
                    )
                  })}
                </div>
                {/* Technology */}
                <div className="px-3 pt-2.5 pb-2" style={{ borderTop: '1px solid #EBF8FE', borderBottom: '1px solid #EBF8FE' }}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>TECHNOLOGY</p>
                  <div className="relative">
                    <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" placeholder="Search..." value={techSearch} onChange={e => setTechSearch(e.target.value)}
                      className="w-full pl-7 py-1.5 text-[11px] rounded-lg outline-none"
                      style={{ background: '#F0F9FF', border: '1px solid #CAEFFF', color: '#0F172A', paddingRight: techSearch ? '24px' : '8px' }} />
                    {techSearch && (
                      <button onClick={() => setTechSearch('')} className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-5 h-5 hover:bg-[#CAEFFF] transition-all" style={{ color: '#64748B' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex flex-col overflow-y-auto" style={{ maxHeight: 352 }}>
                  {!techSearch && (
                    <button onClick={() => { setActiveTechs([]); setPage(0) }}
                      className="flex items-center justify-between w-full px-3 py-2.5 text-left transition-colors hover:bg-[#F0FAFF]"
                      style={{ borderLeft: `3px solid ${activeTechs.length === 0 ? '#0694D1' : 'transparent'}`, background: activeTechs.length === 0 ? '#EBF8FE' : 'white' }}>
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: '#EBF8FE', color: '#0694D1', fontSize: 13, fontWeight: 700 }}>★</div>
                        <span className="text-[14px] font-medium leading-tight truncate" style={{ color: activeTechs.length === 0 ? '#0694D1' : '#374151' }}>All Technologies</span>
                      </div>
                      <span className="text-[10px] font-bold rounded-full px-1.5 py-0.5 shrink-0 ml-1"
                        style={{ background: activeTechs.length === 0 ? '#0694D1' : '#E2E8F0', color: activeTechs.length === 0 ? 'white' : '#6B7280' }}>{COURSES.length}</span>
                    </button>
                  )}
                  {SIDEBAR_TECHNOLOGIES.filter(t => t.name !== 'All' && (!techSearch || t.label.toLowerCase().includes(techSearch.toLowerCase()))).map(t => {
                    const active = activeTechs.includes(t.name)
                    return (
                      <button key={t.name} onClick={() => toggleTech(t.name)}
                        className="flex items-center justify-between w-full px-3 py-2.5 text-left transition-colors hover:bg-[#F0FAFF]"
                        style={{ borderLeft: `3px solid ${active ? '#0694D1' : 'transparent'}`, background: active ? '#EBF8FE' : 'white' }}>
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: t.bg, color: t.color }}>{t.initial}</div>
                          <span className="text-[14px] font-medium leading-tight truncate" style={{ color: active ? '#0694D1' : '#374151' }} title={t.label}>{t.label}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-1">
                          <span className="text-[10px] font-bold rounded-full px-1.5 py-0.5" style={{ background: active ? '#0694D1' : '#E2E8F0', color: active ? 'white' : '#6B7280' }}>{t.count}</span>
                          <div className="w-3.5 h-3.5 rounded border-[1.5px] flex items-center justify-center shrink-0"
                            style={active ? { borderColor: '#0694D1', background: '#0694D1' } : { borderColor: '#CBD5E1', background: 'white' }}>
                            {active && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Right panel */}
              <div className="flex-1 min-w-0">

                {/* Tech header card */}
                <div className="flex flex-col gap-3 mb-5 p-5 rounded-2xl bg-white" style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 8px rgba(6,148,209,0.07)' }}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: activeTechData.bg, color: activeTechData.color }}>{activeTechData.initial}</div>
                      <div>
                        <h3 className="text-base font-bold mb-0.5" style={{ color: '#06111E' }}>{activeTechData.label}</h3>
                        <p className="text-xs sm:text-sm leading-snug" style={{ color: '#64748B' }}>{bannerDesc}</p>
                      </div>
                    </div>
                    <a href="#request" className="shrink-0 self-center rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)' }}>
                      Request More Info →
                    </a>
                  </div>
                </div>

                {/* Desktop: search bar */}
                <div className="hidden lg:flex items-center gap-2 mb-2">
                  <div className="relative flex-1 min-w-0">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" placeholder="Search courses..." value={search} onChange={e => { setSearch(e.target.value); setPage(0) }}
                      className="w-full rounded-xl pl-9 py-2.5 text-sm outline-none bg-white"
                      style={{ border: '1px solid #CAEFFF', color: '#0F172A', paddingRight: search ? '32px' : '12px' }} />
                    {search && (
                      <button onClick={() => { setSearch(''); setPage(0) }} className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-6 h-6 transition-all" style={{ color: '#64748B' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile: search */}
                <div className="lg:hidden mb-2">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" placeholder="Search courses..." value={search} onChange={e => { setSearch(e.target.value); setPage(0) }}
                      className="w-full rounded-xl pl-9 py-2.5 text-sm outline-none bg-white"
                      style={{ border: '1px solid #CAEFFF', color: '#0F172A', paddingRight: search ? '32px' : '12px' }} />
                    {search && (
                      <button onClick={() => { setSearch(''); setPage(0) }} className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-6 h-6 transition-all" style={{ color: '#64748B' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile: Vendor + All Technologies row */}
                <div className="lg:hidden flex gap-2 mb-2">
                  <div className="flex-1 min-w-0"><FilterDropdown label="Vendor" options={['All Vendors', ...ALL_VENDORS.filter(v => COURSES.some(c => c.vendor === v))]} value={filterVendor} onChange={v => { setFilterVendor(v === 'All Vendors' ? '' : v); setPage(0) }} inputType="radio" fullWidth /></div>
                  <div className="flex-1 min-w-0"><FilterDropdown label="All Technologies" options={SIDEBAR_TECHNOLOGIES.filter(t => t.name !== 'All').map(t => t.label)} value={activeTechs.length === 1 ? (SIDEBAR_TECHNOLOGIES.find(t => t.name === activeTechs[0])?.label ?? '') : ''} onChange={v => { const n = SIDEBAR_TECHNOLOGIES.find(t => t.label === v)?.name ?? v; setActiveTechs(n ? [n] : []); setPage(0) }} fullWidth inputType="checkbox" values={activeTechs.map(n => SIDEBAR_TECHNOLOGIES.find(t => t.name === n)?.label ?? n)} onMultiChange={vals => { setActiveTechs(vals.map(v => SIDEBAR_TECHNOLOGIES.find(t => t.label === v)?.name ?? v)); setPage(0) }} /></div>
                </div>

                <div className="mb-3">
                  <span className="text-xs font-medium" style={{ color: '#64748B' }}>Showing {filtered.length} course{filtered.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Course grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginated.length > 0
                    ? paginated.map(c => (
                        <CourseCard key={c.id} course={c}
                        />
                      ))
                    : (
                      <div className="col-span-full flex flex-col items-center py-16 rounded-2xl" style={{ background: '#F8FBFE', border: '1px solid #CAEFFF' }}>
                        <svg className="mb-3 opacity-40" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        <p className="text-sm font-semibold" style={{ color: '#64748B' }}>No courses found</p>
                      </div>
                    )
                  }
                </div>

                {/* Pagination */}
                {totalPages > 1 && (() => {
                  const WINDOW = 5, half = Math.floor(WINDOW / 2)
                  let start = Math.max(0, page - half)
                  let end = Math.min(totalPages - 1, start + WINDOW - 1)
                  if (end - start < WINDOW - 1) start = Math.max(0, end - WINDOW + 1)
                  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)
                  const PageBtn = ({ p }: { p: number }) => (
                    <button onClick={() => setPage(p)} className="w-9 h-9 rounded-full text-sm font-bold transition-all hover:opacity-80"
                      style={page === p ? { background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: 'white', border: 'none', boxShadow: '0 4px 12px rgba(6,148,209,0.35)' } : { border: '1.5px solid #E2E8F0', color: '#64748B', background: 'white' }}>
                      {p + 1}
                    </button>
                  )
                  return (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="w-11 h-11 rounded-full flex items-center justify-center text-xl font-bold transition-all disabled:opacity-30 hover:bg-[#EBF8FE]" style={{ border: '1.5px solid #CAEFFF', color: '#0694D1', background: 'white' }}>‹</button>
                      {start > 0 && <><PageBtn p={0} /><span className="text-sm" style={{ color: '#94A3B8' }}>…</span></>}
                      {pages.map(p => <PageBtn key={p} p={p} />)}
                      {end < totalPages - 1 && <><span className="text-sm" style={{ color: '#94A3B8' }}>…</span><PageBtn p={totalPages - 1} /></>}
                      <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="w-11 h-11 rounded-full flex items-center justify-center text-xl font-bold transition-all disabled:opacity-30 hover:bg-[#EBF8FE]" style={{ border: '1.5px solid #CAEFFF', color: '#0694D1', background: 'white' }}>›</button>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REQUEST INFO FORM ────────────────────────────────── */}
      <section id="request" className="py-[20px]" style={{ background: 'linear-gradient(160deg, #07111e 0%, #0a1828 100%)' }}>
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="rounded-2xl px-8 sm:px-12 py-7 sm:py-9"
            style={{ background: 'linear-gradient(160deg, #091828 0%, #0c1f34 100%)', border: '1px solid rgba(6,148,209,0.25)', boxShadow: '0 0 0 1px rgba(6,148,209,0.08), 0 24px 60px rgba(0,0,0,0.5)' }}>
            <div className="flex justify-center mb-4">
              <span className="rounded-full px-4 py-1 text-xs font-bold tracking-widest" style={{ border: '1px solid rgba(6,148,209,0.55)', color: '#38bdf8' }}>LET&apos;S TALK</span>
            </div>
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-1">Request for more <span style={{ color: '#38bdf8' }}>information</span></h2>
            <p className="text-center text-sm mb-8" style={{ color: 'rgba(255,255,255,0.42)' }}>Flexi Training with Koenig Solutions</p>
            <InquiryForm formType={formType} setFormType={setFormType} />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-[20px]" style={{ background: 'linear-gradient(135deg, #06111E 0%, #093148 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="text-center mb-[15px]">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              How Flexi Training{' '}
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Works</span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>From browsing to certification in four simple steps</p>
          </div>

          {/* Mobile slider */}
          <div className="sm:hidden"
            onTouchStart={e => { howTouchStartX.current = e.touches[0].clientX }}
            onTouchEnd={e => {
              const dx = howTouchStartX.current - e.changedTouches[0].clientX
              if (dx > 50)  setHowSlideIdx(p => Math.min(p + 1, HOW_IT_WORKS.length - 1))
              if (dx < -50) setHowSlideIdx(p => Math.max(p - 1, 0))
            }}>
            <div className="overflow-hidden">
              <div className="flex" style={{ transform: `translateX(-${howSlideIdx * 100}%)`, transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)' }}>
                {HOW_IT_WORKS.map((step, i) => (
                  <div key={step.step} className="shrink-0 w-full rounded-2xl p-6"
                    style={{ background: 'linear-gradient(145deg,rgba(13,32,53,.95),rgba(10,22,40,.98))', border: '1px solid rgba(6,148,209,0.2)' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl font-black" style={{ color: 'rgba(6,148,209,0.2)', lineHeight: 1 }}>{step.step}</span>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.3)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeLinecap="round" strokeLinejoin="round">{step.icon}</svg>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.25)', color: '#38bdf8' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-1.5 mt-4">
              {HOW_IT_WORKS.map((_, i) => (
                <button key={i} onClick={() => setHowSlideIdx(i)}
                  className="rounded-full transition-all"
                  style={{ width: i === howSlideIdx ? 20 : 8, height: 8, background: i === howSlideIdx ? '#0694D1' : 'rgba(255,255,255,0.2)' }} />
              ))}
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="rounded-2xl p-6"
                style={{ background: 'linear-gradient(145deg,rgba(13,32,53,.95),rgba(10,22,40,.98))', border: '1px solid rgba(6,148,209,0.2)', position: 'relative' }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl font-black" style={{ color: 'rgba(6,148,209,0.2)', lineHeight: 1 }}>{step.step}</span>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.3)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeLinecap="round" strokeLinejoin="round">{step.icon}</svg>
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(6,148,209,0.1)', border: '1px solid rgba(6,148,209,0.25)', color: '#38bdf8' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT REVIEWS ──────────────────────────────────── */}
      <section className="flexi-test-section" style={{ background: '#E8F4FA', padding: '20px 48px', overflow: 'hidden', position: 'relative', borderTop: '1px solid #CAEFFF' }}>
        <style>{`
          @keyframes flexiScrollCol { from { transform: translateY(0); } to { transform: translateY(-50%); } }
          .flexi-test-col-track { display: flex; flex-direction: column; gap: 20px; animation: flexiScrollCol linear infinite; }
          .flexi-test-cols-outer:hover .flexi-test-col-track { animation-play-state: paused; }
          .flexi-test-col-md { display: none; }
          .flexi-test-col-lg { display: none; }
          @media (min-width: 768px) { .flexi-test-col-md { display: block !important; } }
          @media (min-width: 1024px) { .flexi-test-col-lg { display: block !important; } }
          @media (max-width: 640px) {
            .flexi-test-section { padding: 20px 20px !important; }
          }
        `}</style>
        <div style={{ pointerEvents: 'none', position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,148,209,0.20) 0%, transparent 65%)' }} />
        <div style={{ pointerEvents: 'none', position: 'absolute', right: -128, bottom: 0, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,180,216,0.18) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'inline-block', marginBottom: 12, borderRadius: 999, background: 'rgba(6,148,209,0.10)', padding: '6px 18px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0694D1' }}>Real Results</span>
            <h2 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 800, color: '#071e2e', margin: '0 0 12px', lineHeight: 1.3 }}>
              Flexi Training{' '}
              <span style={{ background: 'linear-gradient(90deg,#0694D1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Student Reviews</span>
            </h2>
            <p style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto', color: '#7a8c96', fontSize: 15, lineHeight: 1.65 }}>
              Real results from IT professionals worldwide — rated 4.9/5 from thousands of verified reviews.
            </p>
          </div>
          <div style={{ margin: '15px auto 0', maxWidth: 760 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 4px 20px rgba(6,148,209,0.10)', border: '1px solid #DCEEFB' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
                {[
                  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, val: '12,000+', label: 'Verified Reviews' },
                  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, val: '4.9 / 5', label: 'Average Rating' },
                  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, val: '93%', label: 'Would Recommend' },
                  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0694d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, val: '1M+', label: 'Professionals Trained' },
                ].map((s, i, arr) => (
                  <div key={s.label} style={{ textAlign: 'center', padding: '8px 16px', borderRight: i < arr.length - 1 ? '1px solid #CAEFFF' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>{s.icon}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#093148', lineHeight: 1.2 }}>{s.val}</div>
                    <div style={{ marginTop: 4, fontSize: 12, color: '#666' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <FlexiMobileTestimonialRow items={TESTIMONIALS} />
          <div className="flexi-test-cols-outer hidden sm:flex" style={{ justifyContent: 'center', gap: 24, marginTop: 32, maxHeight: 740, overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
            <FlexiTestimonialsColumn items={TESTIMONIALS.slice(0, 3)} duration={15} />
            <FlexiTestimonialsColumn items={TESTIMONIALS.slice(3, 6)} duration={19} className="flexi-test-col-md" />
            <FlexiTestimonialsColumn items={TESTIMONIALS.slice(6, 9)} duration={17} className="flexi-test-col-lg" />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 lg:px-[50px] bg-koenig-light" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-[15px]">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#06111E' }}>
              Frequently <span style={{ background: 'linear-gradient(135deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Asked Questions</span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#7a8c96' }}>Everything you need to know about Flexi Training with Koenig</p>
          </div>
          <div className="hidden sm:flex gap-3">
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 === 0).map((f, j) => {
                const i = j * 2; const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left">
                      <span className="text-base font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#053148', transition: 'color 0.3s' }}>{f.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}><p className="border-t border-[#EBF8FE] px-6 py-4 text-base leading-relaxed" style={{ color: '#7a8c96' }}>{f.a}</p></div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {FAQS.filter((_, i) => i % 2 !== 0).map((f, j) => {
                const i = j * 2 + 1; const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left">
                      <span className="text-base font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#053148', transition: 'color 0.3s' }}>{f.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      <div style={{ overflow: 'hidden' }}><p className="border-t border-[#EBF8FE] px-6 py-4 text-base leading-relaxed" style={{ color: '#7a8c96' }}>{f.a}</p></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="hidden sm:block mt-[15px] text-center">
            <p className="mb-3 text-base" style={{ color: '#7a8c96' }}>Still have questions?</p>
            <button className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-sm font-bold text-[#076D9D] transition-all hover:bg-[#076D9D] hover:text-white">
              Chat with a Training Advisor
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(7,109,157,0.12)' }}>→</span>
            </button>
          </div>
          <div className="sm:hidden flex flex-col gap-3">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left">
                    <span className="text-sm font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#053148', transition: 'color 0.3s' }}>{f.q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                    <div style={{ overflow: 'hidden' }}><p className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed" style={{ color: '#7a8c96' }}>{f.a}</p></div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="sm:hidden mt-[15px] text-center">
            <button className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-sm font-bold text-[#076D9D] transition-all hover:bg-[#076D9D] hover:text-white">
              Chat with a Training Advisor
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(7,109,157,0.12)' }}>→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

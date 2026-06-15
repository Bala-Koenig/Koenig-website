'use client'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ContactModal from './components/ContactModal'
import ContactForm from './components/ContactForm'


/* ── Course data ─────────────────────────────────────────────── */
const COURSES = [
  {
    id: 1, vendor: 'Microsoft', code: 'AZ-104T00-A',
    name: 'Microsoft Azure Administrator',
    duration: 32,
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.9, enrolled: '2,100+', price: 'INR 39000', certFee: 4800,
    techs: ['Microsoft Azure'],
    schedules: [
      { dates: '05 – 08 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '12 – 15 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '19 – 22 May', time: '09:30 PM – 05:30 AM IST', gtr: true },
      { dates: '26 – 29 May', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '02 – 05 Jun', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '16 – 19 Jun', time: '09:00 AM – 05:00 PM IST', gtr: false },
      { dates: '30 Jun – 03 Jul', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '14 – 17 Jul', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '28 – 31 Jul', time: '09:00 AM – 05:00 PM IST', gtr: false },
      { dates: '11 – 14 Aug', time: '09:30 PM – 05:30 AM IST', gtr: true },
    ],
  },
  {
    id: 2, vendor: 'Microsoft', code: 'AI-102T00',
    name: 'Designing and Implementing a Microsoft Azure AI Solution',
    duration: 40,
    tags: ['ASSOCIATE'], rating: 4.8, enrolled: '1,350+', price: 'INR 31000',
    techs: ['Artificial Intelligence (AI)', 'Microsoft Azure'],
    schedules: [
      { dates: '06 – 10 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '19 – 23 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '02 – 06 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '16 – 20 Jun', time: '09:00 AM – 05:00 PM IST', gtr: false },
      { dates: '30 Jun – 04 Jul', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '14 – 18 Jul', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '28 Jul – 01 Aug', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '11 – 15 Aug', time: '09:30 PM – 05:30 AM IST', gtr: false },
    ],
  },
  {
    id: 3, vendor: 'Microsoft', code: 'DP-700T00',
    name: 'Microsoft Fabric Data Engineer',
    duration: 32,
    tags: ['ASSOCIATE'], rating: 4.8, enrolled: '1,080+', price: 'INR 31000',
    techs: ['Microsoft Fabric'],
    schedules: [
      { dates: '04 – 07 May', time: '12:30 PM – 08:30 PM IST', gtr: true },
      { dates: '18 – 21 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '01 – 04 Jun', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '15 – 18 Jun', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '29 Jun – 02 Jul', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '13 – 16 Jul', time: '12:30 PM – 08:30 PM IST', gtr: false },
      { dates: '27 – 30 Jul', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '10 – 13 Aug', time: '09:00 AM – 05:00 PM IST', gtr: false },
    ],
  },
  {
    id: 4, vendor: 'Microsoft', code: 'SC-300T00',
    name: 'Microsoft Identity and Access Administrator',
    duration: 32,
    tags: ['ASSOCIATE'], rating: 4.7, enrolled: '1,240+', price: 'INR 31000',
    techs: ['Identity and Access Management (IAM)'],
    schedules: [
      { dates: '04 – 07 May', time: '04:30 AM – 12:30 PM IST', gtr: true },
      { dates: '11 – 14 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '25 – 28 May', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '08 – 11 Jun', time: '04:30 AM – 12:30 PM IST', gtr: false },
      { dates: '22 – 25 Jun', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '06 – 09 Jul', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '20 – 23 Jul', time: '04:30 AM – 12:30 PM IST', gtr: true },
      { dates: '03 – 06 Aug', time: '09:00 AM – 05:00 PM IST', gtr: false },
    ],
  },
  {
    id: 5, vendor: 'Microsoft', code: 'SC-200T00',
    name: 'Microsoft Security Operations Analyst',
    duration: 32,
    tags: ['ASSOCIATE'], rating: 4.8, enrolled: '1,620+', price: 'INR 31000',
    techs: ['Cyber Security'],
    schedules: [
      { dates: '04 – 07 May', time: '03:30 AM – 11:30 AM IST', gtr: true },
      { dates: '18 – 21 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '01 – 04 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '15 – 18 Jun', time: '03:30 AM – 11:30 AM IST', gtr: false },
      { dates: '29 Jun – 02 Jul', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '13 – 16 Jul', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '27 – 30 Jul', time: '03:30 AM – 11:30 AM IST', gtr: true },
      { dates: '10 – 13 Aug', time: '09:00 AM – 05:00 PM IST', gtr: false },
    ],
  },
  {
    id: 6, vendor: 'Microsoft', code: 'DP-600T00',
    name: 'Microsoft Fabric Analytics Engineer',
    duration: 32,
    tags: ['ASSOCIATE'], rating: 4.7, enrolled: '1,470+', price: 'INR 31000',
    techs: ['Microsoft Fabric'],
    schedules: [
      { dates: '05 – 08 May', time: '12:30 PM – 08:30 PM IST', gtr: true },
      { dates: '19 – 22 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '02 – 05 Jun', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '16 – 19 Jun', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '30 Jun – 03 Jul', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '14 – 17 Jul', time: '12:30 PM – 08:30 PM IST', gtr: false },
      { dates: '28 – 31 Jul', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '11 – 14 Aug', time: '09:00 AM – 05:00 PM IST', gtr: false },
      { dates: '25 – 28 Aug', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '08 – 11 Sep', time: '09:00 AM – 05:00 PM IST', gtr: true },
    ],
  },
  {
    id: 7, vendor: 'Microsoft', code: 'AZ-204T00',
    name: 'Developing Solutions for Microsoft Azure',
    duration: 40,
    tags: ['EXPERT'], rating: 4.8, enrolled: '1,100+', price: 'INR 39000',
    techs: ['Microsoft Azure'],
    schedules: [
      { dates: '06 – 10 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '19 – 23 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '02 – 06 Jun', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '16 – 20 Jun', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '30 Jun – 04 Jul', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '14 – 18 Jul', time: '09:00 AM – 05:00 PM IST', gtr: false },
      { dates: '28 Jul – 01 Aug', time: '09:30 PM – 05:30 AM IST', gtr: true },
      { dates: '11 – 15 Aug', time: '06:30 AM – 02:30 PM IST', gtr: false },
    ],
  },
  {
    id: 8, vendor: 'Microsoft', code: 'AZ-305T00',
    name: 'Designing Microsoft Azure Infrastructure Solutions',
    duration: 32,
    tags: ['EXPERT'], rating: 4.8, enrolled: '1,150+', price: 'INR 39000',
    techs: ['Microsoft Azure'],
    schedules: [
      { dates: '06 – 09 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '19 – 22 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '02 – 05 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '16 – 19 Jun', time: '09:00 AM – 05:00 PM IST', gtr: false },
      { dates: '30 Jun – 03 Jul', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '14 – 17 Jul', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '28 – 31 Jul', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '11 – 14 Aug', time: '09:30 PM – 05:30 AM IST', gtr: false },
    ],
  },
  {
    id: 9, vendor: 'PMI', code: 'PMP',
    name: 'Project Management Professional (PMP®) Certification Training',
    duration: 40,
    tags: ['POPULAR', 'EXPERT'], rating: 4.9, enrolled: '2,600+', price: 'INR 34000',
    techs: ['Project Management'],
    schedules: [
      { dates: '04 – 08 May', time: '11:30 AM – 07:30 PM IST', gtr: true },
      { dates: '18 – 22 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '01 – 05 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '15 – 19 Jun', time: '11:30 AM – 07:30 PM IST', gtr: false },
      { dates: '29 Jun – 03 Jul', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '13 – 17 Jul', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '27 – 31 Jul', time: '11:30 AM – 07:30 PM IST', gtr: true },
      { dates: '10 – 14 Aug', time: '06:30 AM – 02:30 PM IST', gtr: false },
      { dates: '24 – 28 Aug', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '07 – 11 Sep', time: '11:30 AM – 07:30 PM IST', gtr: true },
    ],
  },
  {
    id: 10, vendor: 'Microsoft', code: 'PL-300T00',
    name: 'Microsoft Power BI Data Analyst',
    duration: 8,
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.9, enrolled: '1,800+', price: 'INR 12500',
    techs: ['Data Management & Analytics'],
    schedules: [
      { dates: '14 May', time: '04:30 AM – 12:30 PM IST', gtr: true },
      { dates: '21 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '28 May', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '04 Jun', time: '04:30 AM – 12:30 PM IST', gtr: false },
      { dates: '11 Jun', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '18 Jun', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '25 Jun', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '02 Jul', time: '04:30 AM – 12:30 PM IST', gtr: false },
      { dates: '09 Jul', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '16 Jul', time: '02:30 PM – 10:30 PM IST', gtr: false },
    ],
  },
  {
    id: 11, vendor: 'AWS', code: 'AWS-SAA-C03',
    name: 'AWS Certified Solutions Architect – Associate (Architecting on AWS)',
    duration: 24,
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.9, enrolled: '1,900+', price: 'INR 44000', certFee: 14400,
    techs: ['AWS Cloud'],
    schedules: [
      { dates: '04 – 06 May', time: '01:30 PM – 09:30 PM IST', gtr: true },
      { dates: '18 – 20 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '01 – 03 Jun', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '15 – 17 Jun', time: '01:30 PM – 09:30 PM IST', gtr: false },
      { dates: '29 Jun – 01 Jul', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '13 – 15 Jul', time: '09:00 AM – 05:00 PM IST', gtr: false },
      { dates: '27 – 29 Jul', time: '01:30 PM – 09:30 PM IST', gtr: true },
      { dates: '10 – 12 Aug', time: '06:30 AM – 02:30 PM IST', gtr: false },
      { dates: '24 – 26 Aug', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '07 – 09 Sep', time: '01:30 PM – 09:30 PM IST', gtr: true },
    ],
  },
  {
    id: 12, vendor: 'AWS', code: 'AWS-COA-C02',
    name: 'AWS Certified CloudOps Engineer – Associate (Cloud Operations on AWS)',
    duration: 24,
    tags: ['ASSOCIATE'], rating: 4.7, enrolled: '720+', price: 'INR 37000',
    techs: ['AWS Cloud'],
    schedules: [
      { dates: '11 – 13 May', time: '04:30 AM – 12:30 PM IST', gtr: true },
      { dates: '25 – 27 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '08 – 10 Jun', time: '01:30 PM – 09:30 PM IST', gtr: true },
      { dates: '22 – 24 Jun', time: '04:30 AM – 12:30 PM IST', gtr: false },
      { dates: '06 – 08 Jul', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '20 – 22 Jul', time: '01:30 PM – 09:30 PM IST', gtr: false },
      { dates: '03 – 05 Aug', time: '04:30 AM – 12:30 PM IST', gtr: true },
      { dates: '17 – 19 Aug', time: '09:00 AM – 05:00 PM IST', gtr: false },
    ],
  },
  {
    id: 13, vendor: 'EC-Council', code: 'CEH-v13',
    name: 'Certified Ethical Hacker (CEH v13)',
    duration: 40,
    tags: ['POPULAR', 'EXPERT'], rating: 4.9, enrolled: '2,200+', price: 'INR 42000', certFee: 14400,
    techs: ['Ethical Hacking and Penetration Testing', 'Cyber Security'],
    schedules: [
      { dates: '05 – 09 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '19 – 23 May', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '02 – 06 Jun', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '16 – 20 Jun', time: '09:00 AM – 05:00 PM IST', gtr: false },
      { dates: '30 Jun – 04 Jul', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '14 – 18 Jul', time: '06:30 AM – 02:30 PM IST', gtr: false },
      { dates: '28 Jul – 01 Aug', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '11 – 15 Aug', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '25 – 29 Aug', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '08 – 12 Sep', time: '09:00 AM – 05:00 PM IST', gtr: true },
    ],
  },
  {
    id: 14, vendor: 'CompTIA', code: 'SY0-701',
    name: 'CompTIA Security+ SY0-701',
    duration: 40,
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.8, enrolled: '3,100+', price: 'INR 30000', certFee: 14400,
    techs: ['Cyber Security'],
    schedules: [
      { dates: '12 – 16 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '26 – 30 May', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '09 – 13 Jun', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '23 – 27 Jun', time: '09:00 AM – 05:00 PM IST', gtr: false },
      { dates: '07 – 11 Jul', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '21 – 25 Jul', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '04 – 08 Aug', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '18 – 22 Aug', time: '06:30 AM – 02:30 PM IST', gtr: false },
      { dates: '01 – 05 Sep', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '15 – 19 Sep', time: '09:00 AM – 05:00 PM IST', gtr: true },
    ],
  },
  {
    id: 15, vendor: 'Cisco', code: 'CCNA-200-301',
    name: 'Implementing and Administering Cisco Solutions (CCNA)',
    duration: 40,
    tags: ['POPULAR', 'ASSOCIATE'], rating: 4.8, enrolled: '2,400+', price: 'INR 31000', certFee: 14400,
    techs: ['CCNA'],
    schedules: [
      { dates: '05 – 09 May', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '19 – 23 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '02 – 06 Jun', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '16 – 20 Jun', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '30 Jun – 04 Jul', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '14 – 18 Jul', time: '06:30 AM – 02:30 PM IST', gtr: false },
      { dates: '28 Jul – 01 Aug', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '11 – 15 Aug', time: '09:00 AM – 05:00 PM IST', gtr: false },
      { dates: '25 – 29 Aug', time: '06:30 AM – 02:30 PM IST', gtr: true },
      { dates: '08 – 12 Sep', time: '02:30 PM – 10:30 PM IST', gtr: true },
    ],
  },
  {
    id: 16, vendor: 'PECB', code: 'ISO-27001-LI',
    name: 'ISO/IEC 27001 Lead Implementer',
    duration: 40,
    tags: ['EXPERT'], rating: 4.8, enrolled: '1,200+', price: 'INR 41000',
    techs: ['ISO', 'Cyber Security'],
    schedules: [
      { dates: '12 – 16 May', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '26 – 30 May', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '09 – 13 Jun', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '23 – 27 Jun', time: '02:30 PM – 10:30 PM IST', gtr: false },
      { dates: '07 – 11 Jul', time: '09:00 AM – 05:00 PM IST', gtr: true },
      { dates: '21 – 25 Jul', time: '06:30 AM – 02:30 PM IST', gtr: false },
      { dates: '04 – 08 Aug', time: '02:30 PM – 10:30 PM IST', gtr: true },
      { dates: '18 – 22 Aug', time: '09:00 AM – 05:00 PM IST', gtr: false },
    ],
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
  { id: 'fmat',      label: 'Fly-Me-a-Trainer (FMAT)',    href: '#'                      },
  { id: 'classroom', label: 'Classroom Training',          href: '/classroom-training'    },
  { id: '1on1',      label: '1-on-1 Training',             href: '/1-on-1-training'       },
  { id: 'flexi',     label: 'Flexi Training',              href: '#'                      },
]

const BENEFITS = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Guaranteed to Run (GTR)',
    desc: 'Every GTR batch runs as scheduled — no last-minute cancellations. Book confidently knowing your training will happen.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: '195+ Countries Covered',
    desc: 'Multiple time-zone batches (IST, GST, GMT, EST) so learners worldwide attend at a convenient local time.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Expert Certified Instructors',
    desc: 'All trainers are vendor-certified with active industry experience — not just academic knowledge.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    title: 'Live & Interactive Sessions',
    desc: 'Real-time Q&A, hands-on labs, and breakout exercises — not recorded lectures. Engage directly with your instructor.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: '5,000+ Courses Available',
    desc: 'Microsoft, AWS, Cisco, PMI, EC-Council, CompTIA, PECB and 70+ more vendors — all accessible via live online delivery.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Post-Training Support',
    desc: '30-day post-training access to course materials, plus revision class eligibility if you need to revisit any topic.',
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Choose Your Course & Batch', desc: 'Browse 5,000+ live online courses. Filter by vendor, OEM, or technology. Pick a GTR batch that fits your timezone and schedule.',
    tags: ['5,000+ Courses', 'GTR Batches', 'Vendor Filter'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/> },
  { step: '02', title: 'Confirm Enrollment & Get Access', desc: 'Receive instant confirmation with virtual classroom credentials, pre-reading materials, and lab access details before day one.',
    tags: ['Instant Access', 'Lab Credentials', 'Pre-Reading'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/> },
  { step: '03', title: 'Attend Live, Interactive Training', desc: 'Join your certified instructor in a real-time virtual classroom. Ask questions, complete hands-on labs, and collaborate with peers globally.',
    tags: ['Live Instructor', 'Hands-on Labs', 'Global Peers'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/> },
  { step: '04', title: 'Certify & Advance Your Career', desc: 'Receive your official course completion certificate. Sit your vendor exam with confidence and claim your new certification.',
    tags: ['Completion Cert', 'Vendor Exam', 'Career Growth'],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/> },
]

const CATEGORIES = [
  { name: 'Cloud Computing',       count: '480+', desc: 'Azure, AWS, Google Cloud, Oracle Cloud',    color: '#0694D1',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/> },
  { name: 'Cybersecurity',         count: '320+', desc: 'CEH, CISSP, CompTIA Security+, CISM',       color: '#e53e3e',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/> },
  { name: 'Project Management',    count: '140+', desc: 'PMP, PRINCE2, Agile, Scrum Master',         color: '#7c3aed',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/> },
  { name: 'Data & AI',             count: '260+', desc: 'AI-900, DP-900, Machine Learning, Power BI', color: '#0d9488',
    icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></> },
  { name: 'Networking',            count: '210+', desc: 'CCNA, CCNP, CompTIA Network+, Juniper',     color: '#16a34a',
    icon: <><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></> },
  { name: 'DevOps & Cloud-Native', count: '180+', desc: 'Kubernetes, Docker, Terraform, Jenkins',    color: '#ea580c',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z"/> },
  { name: 'ITSM & Governance',     count: '120+', desc: 'ITIL 4, COBIT, ISO 27001, ISO 20000',      color: '#4f46e5',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/> },
  { name: 'SAP & ERP',             count: '140+', desc: 'SAP S/4HANA, Basis, FICO, MM, SD',         color: '#d97706',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/> },
]

const FAQS = [
  {
    q: 'How do I register for a Live Online Training session?',
    a: 'Simply choose your preferred date from the batches mentioned above. Click on "Register Now" and enter your details to secure your spot. Our team will confirm your enrolment and send virtual classroom credentials within 24 hours.',
  },
  {
    q: 'What technology do I need to participate in Live Online Training?',
    a: 'For Live Online Training, all you need is a stable internet connection and a laptop or PC. No specialist hardware is required. Any vendor-specific lab prerequisites will be shared in your enrolment confirmation email before day one.',
  },
  {
    q: 'Can I interact with the instructor and other participants during the session?',
    a: 'Absolutely! Live Online Training shines with two key benefits: instant doubt resolution and student interaction. You can ask questions in real time, participate in breakout exercises, and collaborate with fellow learners from around the world — just like a physical classroom.',
  },
  {
    q: 'Are Live Online Training sessions recorded?',
    a: 'Yes, you can access recordings of most Live Online Training sessions through the LET Platform for future reference. This ensures you never miss a concept, even if you need to step away momentarily during a session.',
  },
  {
    q: 'What is your cancellation and refund policy for Live Online Training?',
    a: "Koenig Solutions offers a flexible rescheduling and cancellation policy. If you need to reschedule, simply contact our support team and we'll find the next available GTR batch for you at no extra charge. For full details on refunds, please refer to our Terms of Service.",
  },
  {
    q: 'How can I provide feedback on my Live Online Training experience?',
    a: "Your feedback matters! We'll ask you to complete a short feedback form on the first and last day of training. This helps us continuously improve our delivery quality, instructor performance, and course content.",
  },
  {
    q: 'How can I find courses that are Guaranteed to Run?',
    a: 'All the courses listed on this page are Guaranteed-to-Run (GTR). Look for the GTR badge on any schedule slot — it means that batch is confirmed to run regardless of enrolment numbers, giving you full confidence to plan your schedule.',
  },
  {
    q: 'What happens if I cannot attend a class I am enrolled in?',
    a: "Koenig Solutions offers a flexible rescheduling policy. If you're unable to attend, contact us as early as possible and we'll transfer you to the next available batch for the same course. Our Happiness Guarantee ensures your learning journey continues without extra cost.",
  },
]

const TESTIMONIALS = [
  { name: 'Adham Al Mayasi',           role: 'IT Manager, Oman',                  course: 'Live Online Certified',
    quote: 'Your exceptional skills as a trainer, dedication, expertise, and unwavering commitment are truly inspiring. The live online sessions felt just as engaging as classroom training.',
    initials: 'AA', avatarBg: 'linear-gradient(135deg,#076D9D,#4DBFEF)', avatar: '/images/headshots/headshot-1.webp' },
  { name: 'Emmanuel Masabo',            role: 'Network Engineer, Rwanda',           course: 'Live Online Certified',
    quote: 'The trainer is very organized and helped us understand difficult concepts simply. Content delivery was perfect — the live online format made it easy to follow from Kigali.',
    initials: 'EM', avatarBg: 'linear-gradient(135deg,#093148,#076D9D)', avatar: '/images/headshots/headshot-4.png' },
  { name: 'Yoosuf Nizam',              role: 'Cloud Architect, Maldives',          course: 'GTR Batch Certified',
    quote: "This trainer is undoubtedly one of the finest I have encountered. His profound knowledge makes complex concepts accessible. The GTR guarantee meant I could plan around the confirmed schedule.",
    initials: 'YN', avatarBg: 'linear-gradient(135deg,#F47920,#f6a05c)', avatar: '/images/headshots/headshot-3.webp' },
  { name: 'Anacleto Francisco da Rosa', role: 'IT Consultant, Angola',              course: 'Live Online Certified',
    quote: 'The teacher is very friendly, knowledgeable, and passionate. Excellent hands-on training experience — the live labs worked flawlessly even on my connection from Luanda.',
    initials: 'AF', avatarBg: 'linear-gradient(135deg,#076D9D,#093148)', avatar: '/images/headshots/headshot-2.webp' },
  { name: 'David Muriuki',              role: 'Security Engineer, Kenya',           course: 'Live Online Certified',
    quote: 'His pedagogical skills were exceptional, blending professionalism with deep subject matter understanding throughout. Live online delivery from Nairobi was seamless.',
    initials: 'DM', avatarBg: 'linear-gradient(135deg,#34A853,#076D9D)', avatar: '/images/headshots/headshot-5.webp' },
  { name: 'Fredrick Fiifi Arthur',      role: 'Data Analyst, Ghana',               course: 'Power BI Certified',
    quote: 'Your passion and expertise in teaching Power BI have been incredibly motivating and empowering. The interactive sessions made every module click into place immediately.',
    initials: 'FA', avatarBg: 'linear-gradient(135deg,#F2C811,#0694d1)', avatar: '/images/headshots/headshot-1.webp' },
  { name: 'Amjaad Kushar',              role: 'IT Professional, Saudi Arabia',      course: 'Live Online Certified',
    quote: 'I would like to express my sincere appreciation for such an outstanding learning experience. The GST-time batch was perfectly scheduled for the Gulf region.',
    initials: 'AK', avatarBg: 'linear-gradient(135deg,#093148,#F47920)', avatar: '/images/headshots/headshot-4.png' },
  { name: 'Monica Kalamula',            role: 'Systems Administrator, Malawi',      course: 'Live Online Certified',
    quote: 'The instructor possessed deep understanding, translating complex ideas into easily digestible information effectively. Koenig live online truly bridges the gap across continents.',
    initials: 'MK', avatarBg: 'linear-gradient(135deg,#476D8D,#0694D1)', avatar: '/images/headshots/headshot-2.webp' },
  { name: 'Emanuel Bento Mahina',       role: 'Security Specialist, Angola',        course: 'Security Certified',
    quote: 'I received one of the best trainings with exceptional security expertise. Highly motivated and well-prepared instructor who kept the live online sessions energetic from start to finish.',
    initials: 'EB', avatarBg: 'linear-gradient(135deg,#c8102e,#f47920)', avatar: '/images/headshots/headshot-3.webp' },
]

/* ── Tech icon helper ────────────────────────────────────────── */
function getTechIcon(name: string) {
  const n = name.toLowerCase()
  const p = { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (name === 'All') return <svg {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
  if (/\b(aws)\b|azure|gcp|google cloud|cloud native/.test(n) || n === 'cloud') return <svg {...p}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
  if (/identity|iam|active directory/.test(n)) return <svg {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  if (/security|cyber|hacking|penetration|firewall|vapt|pci dss|information security|soc|incident|digital forensics/.test(n)) return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  if (/artificial intelligence|\bai\b|machine learning|nlp|natural language|mlops|generative|ai engineering|ai ethics|ai agent|enterprise ai|ai cloud|intelligent automation|ai governance|azure ai/.test(n)) return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/></svg>
  if (/\bdata\b|analytics|fabric|warehouse|reporting|big data|data engineer|data science|data architect|data governance|data analysis|data management/.test(n)) return <svg {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  if (/devops|kubernetes|docker|container|microservice/.test(n)) return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
  if (/network|cisco|ccna|ccnp|routing|switching|wireless|meraki/.test(n)) return <svg {...p}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
  if (/project management|agile|scrum|pmp|prince2|program management|product management|delivery manager/.test(n)) return <svg {...p}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
  if (/database|\bsql\b|oracle|postgresql|dba/.test(n)) return <svg {...p}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
  if (/linux|red hat|rhel|openshift|jboss/.test(n)) return <svg {...p}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
  if (/programming|python|web dev|angular|react|software dev|coding|\.net/.test(n)) return <svg {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  if (/\bsap\b|\berp\b|supply chain|procurement|inventory|oracle ebs/.test(n)) return <svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  if (/itsm|itil|service management|servicenow|service desk/.test(n)) return <svg {...p}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
  if (/\biso\b|governance|compliance|audit|cobit|grc|risk|lead implementer|lead auditor|data privacy/.test(n)) return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
  if (/design|figma|adobe|user experience|\bux\b|graphic|cad|autodesk/.test(n)) return <svg {...p}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/></svg>
  if (/soft skills|leadership|management|human capital|business analysis|health and safety|payroll|finance and accounts/.test(n)) return <svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  if (/test|quality|\bqa\b/.test(n)) return <svg {...p}><path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/></svg>
  if (/iot|industrial iot|embedded|electric vehicle|industrial automation/.test(n)) return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/></svg>
  if (/robotic|uipath|\brpa\b|power automate|intelligent automation/.test(n)) return <svg {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M12 11V8"/><circle cx="12" cy="5" r="3"/><path d="M7 16h2M15 16h2"/></svg>
  if (/vmware|storage|server|middleware|windows server/.test(n)) return <svg {...p}><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
  if (/blockchain/.test(n)) return <svg {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
  if (/microsoft/.test(n)) return <svg {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
  return <svg {...p}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
}

/* ── Syllabus Modal ──────────────────────────────────────────── */
function SyllabusModal({ courseName, onClose }: { courseName: string; onClose: () => void }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.6)' }} onClick={onClose}>
      <div className="relative w-full max-w-md rounded-2xl p-7"
        style={{ background: 'linear-gradient(160deg,#06283d,#093148)', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
          style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'white' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        {/* Header */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-2 h-2 rounded-full" style={{ background: '#0694D1' }} />
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#0694D1' }}>Free Training Brochure</span>
        </div>
        <h2 className="text-2xl font-extrabold leading-tight mb-1 text-white">
          Get Your Free<br />
          <span style={{ color: '#0694D1' }}>Training Brochure</span>
        </h2>
        <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>Curriculum · Pricing · Exam prep — all in one PDF</p>
        {courseName && <p className="text-xs font-semibold mb-4 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(6,148,209,0.15)', color: '#7DD3FC' }}>{courseName}</p>}
        {/* Fields */}
        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>First Name <span style={{ color: '#F87171' }}>*</span></label>
            <input value={form.firstName} onChange={set('firstName')} placeholder="Rahul"
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
          </div>
          <div className="flex-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Last Name</label>
            <input value={form.lastName} onChange={set('lastName')} placeholder="Sharma"
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Work Email <span style={{ color: '#F87171' }}>*</span></label>
          <input value={form.email} onChange={set('email')} placeholder="you@company.com" type="email"
            className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
        </div>
        <div className="mb-5">
          <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Phone / WhatsApp <span style={{ color: '#F87171' }}>*</span></label>
          <input value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" type="tel"
            className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
        </div>
        <button className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg,#0694D1,#0577b0)' }}>
          Get My Brochure →
        </button>
        <p className="text-center text-xs mt-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
          🔒 Your details are safe. No spam, ever.
        </p>
      </div>
    </div>
  )
}

/* ── Vendor Logo ─────────────────────────────────────────────── */
function VendorLogo({ name, size = 24 }: { name: string; size?: number }) {
  const s = size, ms = Math.round(s * 0.62), fs = Math.round(s * 0.35)
  type E = { bg: string; icon: React.ReactNode; border?: string }
  const hue = name.charCodeAt(0) * 37 % 360
  const txt = (t: string, sz = 9, color = 'white') => (
    <svg width={ms} height={ms} viewBox="0 0 24 24">
      <text x="12" y="16" fill={color} fontFamily="Arial,sans-serif" fontWeight="900" fontSize={sz} textAnchor="middle">{t}</text>
    </svg>
  )
  const map: Record<string, E> = {
    Microsoft: { bg: '#f3f3f3', border: '1px solid #e0e0e0', icon: (
      <svg width={ms} height={ms} viewBox="0 0 21 21">
        <rect x="0" y="0" width="10" height="10" fill="#f25022"/><rect x="11" y="0" width="10" height="10" fill="#7fba00"/>
        <rect x="0" y="11" width="10" height="10" fill="#00a4ef"/><rect x="11" y="11" width="10" height="10" fill="#ffb900"/>
      </svg>
    )},
    AWS: { bg: '#232f3e', icon: (
      <svg width={ms} height={ms} viewBox="0 0 30 28" fill="none">
        <text x="15" y="15" fill="#ff9900" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="13" textAnchor="middle">aws</text>
        <path d="M6 22 Q15 28 24 22" stroke="#ff9900" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M21.5 19.5 L24 22 L21.5 24.5" stroke="#ff9900" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    Cisco: { bg: 'white', border: '1px solid #e8e8e8', icon: (
      <svg width={ms} height={Math.round(ms * 0.65)} viewBox="0 0 22 14" fill="#049fd9">
        <rect x="0"    y="8" width="2.5" height="6"  rx="1.2"/>
        <rect x="3.25" y="5" width="2.5" height="9"  rx="1.2"/>
        <rect x="6.5"  y="2" width="2.5" height="12" rx="1.2"/>
        <rect x="9.75" y="0" width="2.5" height="14" rx="1.2"/>
        <rect x="13"   y="2" width="2.5" height="12" rx="1.2"/>
        <rect x="16.25"y="5" width="2.5" height="9"  rx="1.2"/>
        <rect x="19.5" y="8" width="2.5" height="6"  rx="1.2"/>
      </svg>
    )},
    CompTIA:      { bg: '#c8202f', icon: txt('A+', 11) },
    'EC-Council': { bg: '#c41230', icon: (
      <svg width={ms} height={ms} viewBox="0 0 24 24" fill="none">
        <path d="M12 3 L20 7 L20 13.5 C20 17.5 16.4 20.8 12 22 C7.6 20.8 4 17.5 4 13.5 L4 7 Z" stroke="white" strokeWidth="1.8"/>
        <text x="12" y="15.5" fill="white" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="6.5" textAnchor="middle">EC</text>
      </svg>
    )},
    PMI:          { bg: '#003087', icon: txt('PMI', 9) },
    PECB:         { bg: '#004b87', icon: txt('PECB', 7.5) },
    Oracle: { bg: '#c74634', icon: (
      <svg width={ms} height={Math.round(ms * 0.65)} viewBox="0 0 28 18" fill="none">
        <ellipse cx="14" cy="9" rx="12" ry="7" stroke="white" strokeWidth="3.5"/>
      </svg>
    )},
    'Red Hat': { bg: '#cc0000', icon: (
      <svg width={ms} height={ms} viewBox="0 0 24 24" fill="white">
        <ellipse cx="12" cy="20" rx="9.5" ry="2.8"/>
        <path d="M4 20 Q4 10 12 7 Q20 10 20 20"/>
      </svg>
    )},
    VMware:       { bg: '#607078', icon: txt('VM', 9) },
    SAP:          { bg: '#0070f2', icon: txt('SAP', 9.5) },
    'Google Cloud': { bg: 'white', border: '1px solid #e0e0e0', icon: (
      <svg width={ms} height={Math.round(ms * 0.8)} viewBox="0 0 28 22" fill="none">
        <path d="M23 17H8a5 5 0 1 1 1-9.9 7 7 0 0 1 14 2.2A4.5 4.5 0 1 1 23 17z" fill="#4285f4"/>
      </svg>
    )},
    ISACA:        { bg: '#0065a0', icon: txt('ISACA', 7) },
    ISC2:         { bg: '#3e7d32', icon: txt('ISC²', 8) },
    IBM: { bg: '#006699', icon: (
      <svg width={ms} height={ms} viewBox="0 0 24 18" fill="white">
        <rect x="1" y="0"    width="22" height="3"/>
        <rect x="1" y="5"    width="22" height="3"/>
        <rect x="1" y="10"   width="22" height="3"/>
        <rect x="1" y="15"   width="22" height="3"/>
      </svg>
    )},
    Juniper:              { bg: '#006a00',  icon: txt('JN', 9) },
    Fortinet: { bg: '#ee3124', icon: (
      <svg width={ms} height={ms} viewBox="0 0 24 24" fill="none">
        <path d="M12 3 L19.5 7 L19.5 13.5 C19.5 17.5 16.2 20.5 12 21.5 C7.8 20.5 4.5 17.5 4.5 13.5 L4.5 7 Z" stroke="white" strokeWidth="1.8"/>
        <text x="12" y="16" fill="white" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="8" textAnchor="middle">F</text>
      </svg>
    )},
    'Palo Alto Networks': { bg: '#fa5e1f',  icon: txt('PA', 9) },
    CrowdStrike:          { bg: '#060e21',  icon: txt('CS', 9, '#e8192c') },
    Splunk:               { bg: '#181719',  icon: txt('S', 14, '#65a637') },
    ServiceNow:           { bg: '#81b5a1',  icon: txt('SN', 8.5) },
    Salesforce: { bg: '#00a1e0', icon: (
      <svg width={ms} height={Math.round(ms * 0.8)} viewBox="0 0 28 22" fill="none">
        <path d="M23 17H8a5 5 0 1 1 1-9.9 7 7 0 0 1 14 2.2A4.5 4.5 0 1 1 23 17z" fill="white"/>
      </svg>
    )},
    'Axelos (ITIL/PRINCE2)': { bg: '#4a1a8d', icon: txt('AX', 9) },
    'Scrum Alliance': { bg: '#009b77',  icon: txt('SA', 9) },
    'Scrum.org':      { bg: '#0052b4',  icon: txt('SO', 8.5) },
    PeopleCert:       { bg: '#0033a0',  icon: txt('PC', 9) },
    IAPP:             { bg: '#005487',  icon: txt('IAPP', 8) },
    DAMA:             { bg: '#e87722',  icon: txt('DAMA', 8) },
    'Linux Foundation': { bg: '#1a1a1a', icon: txt('LF', 10) },
    HashiCorp: { bg: '#7B42BC', icon: (
      <svg width={ms} height={ms} viewBox="0 0 24 24" fill="none">
        <polygon points="12,3 21,8 21,16 12,21 3,16 3,8" stroke="white" strokeWidth="2"/>
        <text x="12" y="16" fill="white" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="8" textAnchor="middle">H</text>
      </svg>
    )},
  }
  const e = map[name]
  const bg = e?.bg ?? `hsl(${hue},55%,42%)`
  const icon = e?.icon ?? <span style={{ fontSize: fs, fontWeight: 900, color: 'white', lineHeight: 1 }}>{name.slice(0,2).toUpperCase()}</span>
  return (
    <span className="rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
      style={{ width: s, height: s, background: bg, ...(e?.border ? { border: e.border } : {}) }}>
      {icon}
    </span>
  )
}

/* ── Dates Modal ─────────────────────────────────────────────── */
function DatesModal({ course, onClose, onSelectDate }: {
  course: typeof COURSES[0]; onClose: () => void; onSelectDate: (idx: number) => void
}) {
  const CARD_VISIBLE = 1
  const days = Math.ceil(course.duration / 8)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])

  const MONTH_RE = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/
  const MONTH_ORDER = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const rows = course.schedules.slice(CARD_VISIBLE).map((s, i) => ({ ...s, idx: i + CARD_VISIBLE }))
  const grouped: { month: string; items: typeof rows }[] = []
  rows.forEach(r => {
    const m = r.dates.match(MONTH_RE)?.[1] ?? 'Other'
    const g = grouped.find(x => x.month === m)
    if (g) g.items.push(r); else grouped.push({ month: m, items: [r] })
  })
  grouped.sort((a, b) => MONTH_ORDER.indexOf(a.month) - MONTH_ORDER.indexOf(b.month))

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center sm:px-4 justify-center"
      style={{ background: 'rgba(12,25,41,0.72)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <style>{`@keyframes dmUp{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className="relative w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col bg-white"
        style={{ maxHeight: '92vh', boxShadow: '0 -8px 40px rgba(12,25,41,0.25)', animation: 'dmUp 0.3s cubic-bezier(0.22,1,0.36,1)' } as React.CSSProperties}
        onClick={e => e.stopPropagation()}>

        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ background: '#CBD5E1' }} />
        </div>

        {/* Header */}
        <div className="relative px-5 pt-4 pb-3.5 shrink-0" style={{ borderBottom: '1px solid #DDE6EE' }}>
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-[#E6F6FD]"
            style={{ border: '1.5px solid #DDE6EE', color: '#5a7a90' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: '#E6F6FD', color: '#0694D1' }}>{course.vendor}</span>
          <h2 className="text-sm font-bold leading-snug mt-1.5 pr-10" style={{ color: '#0C1929' }}>
            {course.code}: {course.name}
          </h2>
          <span className="flex items-center gap-1 text-xs mt-1" style={{ color: '#5a7a90' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {course.duration} hrs · {days} {days === 1 ? 'Day' : 'Days'}
          </span>
        </div>

        {/* Scrollable date list */}
        <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
          <div className="px-5 pt-4 pb-5">
            <p className="text-[11px] font-black uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>
              Select a Date · {rows.length} available
            </p>
            {grouped.map(({ month, items }) => (
              <div key={month} className="mb-3 last:mb-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest shrink-0" style={{ color: '#C4D0DC' }}>{month} 2026</span>
                  <div className="flex-1 h-px" style={{ background: '#F1F5F9' }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  {items.map(({ idx, dates, time, gtr }) => (
                    <button key={idx} onClick={() => { onSelectDate(idx); onClose() }}
                      className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-all active:opacity-70 cursor-pointer"
                      style={{ background: 'white', border: '1px solid #E8EFF5' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F0FAFF'; (e.currentTarget as HTMLButtonElement).style.border = '1px solid #CAEFFF' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; (e.currentTarget as HTMLButtonElement).style.border = '1px solid #E8EFF5' }}>
                      <div className="w-3.5 h-3.5 rounded-full shrink-0 border-[1.5px]" style={{ borderColor: '#CBD5E1' }} />
                      <div className="flex-1 min-w-0">
                        <span className="text-[13px] font-bold block" style={{ color: '#0C1929' }}>{dates} 2026</span>
                        <span className="text-[11px]" style={{ color: '#5a7a90' }}>{time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {gtr && (
                          <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                            GTR
                          </span>
                        )}
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: '#E6F6FD', color: '#0694D1' }}>Online</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Course Card ─────────────────────────────────────────────── */
function CourseCard({ course, onEnroll, onSyllabus, dark = false }: {
  course: typeof COURSES[0]; onEnroll: () => void; onSyllabus: () => void; dark?: boolean
}) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [certAdded, setCertAdded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [feesOpen, setFeesOpen] = useState(false)
  const FULL_VISIBLE = 1
  const fullCards = course.schedules.slice(0, FULL_VISIBLE)
  const extraCount = course.schedules.length - FULL_VISIBLE
  const hasMore = extraCount > 0
  const isPopular = (course.tags ?? []).includes('POPULAR')
  const days = Math.ceil(course.duration / 8)
  const modalSched = selectedIdx >= FULL_VISIBLE ? course.schedules[selectedIdx] : null

  const courseNum = parseInt(course.price.replace(/[^0-9]/g, ''), 10)
  const certNum   = certAdded && course.certFee ? course.certFee : 0
  const subtotal  = courseNum + certNum
  const gstNum    = Math.round(subtotal * 0.18)
  const grandTotal = subtotal + gstNum

  const RadioDot = ({ active }: { active: boolean }) => (
    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
      style={active ? { background: '#0694D1' } : { border: `1.5px solid ${dark ? 'rgba(255,255,255,0.25)' : '#CBD5E1'}` }}>
      {active && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
    </div>
  )

  const GtrBadge = () => (
    <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
      style={{ background: dark ? 'rgba(21,128,61,0.25)' : '#DCFCE7', color: dark ? '#4ade80' : '#15803D' }}>
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      GTR
    </span>
  )

  return (
    <>
      {modalOpen && typeof document !== 'undefined' && createPortal(
        <DatesModal
          course={course}
          onClose={() => setModalOpen(false)}
          onSelectDate={(idx) => setSelectedIdx(idx)}
        />,
        document.body
      )}
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
                  <div style={{ color: '#4a6a8a' }}>Course Training</div>
                  <div style={{ fontSize: 11, color: '#8a9db5', marginTop: 2 }}>{course.duration} hrs · {days} {days === 1 ? 'Day' : 'Days'} · Live Online</div>
                </div>
                <span style={{ fontWeight: 600, color: '#071e2e', flexShrink: 0 }}>INR {courseNum.toLocaleString('en-IN')}</span>
              </div>
              {certAdded && course.certFee && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #f0f4f8' }}>
                  <div>
                    <div style={{ color: '#4a6a8a' }}>Certification Exam</div>
                    <div style={{ fontSize: 11, color: '#8a9db5', marginTop: 2 }}>Official {course.vendor} exam voucher</div>
                  </div>
                  <span style={{ fontWeight: 600, color: '#071e2e', flexShrink: 0 }}>INR {certNum.toLocaleString('en-IN')}</span>
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
        style={dark
          ? { background: 'rgba(8,24,42,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(6,148,209,0.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }
          : { background: 'white', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = dark ? '0 12px 32px rgba(6,148,209,0.25)' : '0 12px 32px rgba(6,148,209,0.18)'; (e.currentTarget as HTMLDivElement).style.borderColor = dark ? 'rgba(6,148,209,0.55)' : '#CAEFFF' }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = dark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLDivElement).style.borderColor = dark ? 'rgba(6,148,209,0.25)' : '#E2E8F0' }}>

      {/* Popular badge */}
      {isPopular && (
        <div className="absolute top-0 right-0 z-10">
          <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-bl-xl rounded-tr-2xl tracking-wide uppercase"
            style={{ background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: 'white', letterSpacing: '0.04em' }}>
            ★ Popular
          </span>
        </div>
      )}

      {/* Card header */}
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: `1px solid ${dark ? 'rgba(6,148,209,0.15)' : '#F1F5F9'}` }}>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
          style={{ background: dark ? 'rgba(6,148,209,0.18)' : '#EBF8FE', color: dark ? '#38bdf8' : '#0694D1' }}>{course.vendor}</span>
        <h3 className="mt-2 text-sm font-bold leading-snug pr-12" style={{ color: dark ? '#fff' : '#0F172A' }}>
          {course.code}: {course.name}
        </h3>
        <div className="flex items-center gap-3 mt-2.5">
          <button onClick={onSyllabus}
            className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all"
            style={{ border: `1px solid ${dark ? 'rgba(6,148,209,0.45)' : '#0694D1'}`, color: dark ? '#38bdf8' : '#0694D1', background: dark ? 'rgba(6,148,209,0.1)' : 'transparent' }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Syllabus
          </button>
          <div className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#475569' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {course.duration} hrs ({days} {days === 1 ? 'Day' : 'Days'})
          </div>
        </div>
      </div>

      {/* Date selection */}
      <div className="px-4 py-3 flex flex-col gap-2">
        <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: dark ? 'rgba(255,255,255,0.35)' : '#94A3B8' }}>Select a Date</p>

        {modalSched ? (
          <div className="w-full text-left rounded-xl px-3 py-2.5 text-xs"
            style={{ background: dark ? 'rgba(6,148,209,0.15)' : '#EFF9FF', border: '1.5px solid #0694D1', borderLeft: '4px solid #0694D1', boxShadow: dark ? '0 2px 8px rgba(6,148,209,0.2)' : '0 2px 8px rgba(6,148,209,0.15)' }}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 font-bold" style={{ color: dark ? '#38bdf8' : '#0694D1' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0 }}>
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {modalSched.dates}
                </span>
                <span className="flex items-center gap-1.5 text-[11px]" style={{ color: dark ? '#38bdf8' : '#0694D1', opacity: 0.85 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {modalSched.time}
                </span>
                <span className="flex items-center gap-1.5 text-[11px]" style={{ color: dark ? '#38bdf8' : '#0694D1' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  Online
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                {modalSched.gtr && <GtrBadge />}
                <RadioDot active={true} />
              </div>
            </div>
          </div>
        ) : (
          fullCards.map((s, i) => {
            const active = selectedIdx === i
            return (
              <button key={i} onClick={() => setSelectedIdx(i)}
                className="w-full text-left rounded-xl px-3 py-2.5 text-xs transition-all cursor-pointer"
                style={active
                  ? { background: dark ? 'rgba(6,148,209,0.15)' : '#EFF9FF', border: `1.5px solid #0694D1`, borderLeft: '4px solid #0694D1', boxShadow: dark ? '0 2px 8px rgba(6,148,209,0.2)' : '0 2px 8px rgba(6,148,209,0.15)' }
                  : { background: dark ? 'rgba(255,255,255,0.04)' : 'white', border: `1px solid ${dark ? 'rgba(255,255,255,0.10)' : '#E8EFF5'}`, boxShadow: dark ? 'none' : '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 font-bold" style={{ color: active ? (dark ? '#38bdf8' : '#0694D1') : (dark ? 'rgba(255,255,255,0.85)' : '#0F172A') }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0 }}>
                        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {s.dates}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px]" style={{ color: active ? (dark ? '#38bdf8' : '#0694D1') : (dark ? 'rgba(255,255,255,0.45)' : '#64748B'), opacity: active ? 0.85 : 1 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {s.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px]" style={{ color: active ? (dark ? '#38bdf8' : '#0694D1') : (dark ? 'rgba(255,255,255,0.3)' : '#94A3B8') }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                      Online
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                    {s.gtr && <GtrBadge />}
                    <RadioDot active={active} />
                  </div>
                </div>
              </button>
            )
          })
        )}

        {/* Add Certification Exam checkbox */}
        {course.certFee && (
          <label
            className="flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 transition-colors"
            style={certAdded
              ? { border: '1.5px solid #0694D1', background: dark ? 'rgba(6,148,209,0.15)' : 'rgba(6,148,209,0.08)', boxShadow: '0 0 0 1px rgba(6,148,209,0.25)' }
              : { border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : '#E2E8F0'}`, background: dark ? 'rgba(255,255,255,0.04)' : '#F8FAFC' }
            }
          >
            <div className="flex items-center gap-2">
              <div
                className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 transition-colors"
                style={certAdded
                  ? { borderColor: '#0694D1', background: '#0694D1' }
                  : { borderColor: dark ? 'rgba(255,255,255,0.3)' : '#CBD5E1', background: dark ? 'transparent' : 'white' }
                }
              >
                {certAdded && (
                  <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-xs font-semibold" style={{ color: certAdded ? (dark ? '#38bdf8' : '#0694D1') : (dark ? 'rgba(255,255,255,0.7)' : '#374151') }}>
                Add Certification Exam
              </span>
            </div>
            <span className="text-xs font-bold" style={{ color: dark ? '#38bdf8' : '#093148' }}>
              +INR {course.certFee.toLocaleString('en-IN')}
            </span>
            <input type="checkbox" className="sr-only" checked={certAdded} onChange={() => setCertAdded(!certAdded)} />
          </label>
        )}

        <div className="flex items-start justify-between mt-0.5">
          {/* Left — view all dates + social proof */}
          <div className="flex flex-col gap-1">
            {hasMore && (
              <button onClick={() => setModalOpen(true)}
                className="flex items-center gap-1 text-[11px] font-semibold transition-all hover:underline cursor-pointer"
                style={{ color: dark ? '#38bdf8' : '#0694D1' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {modalSched ? 'Change date' : `View All ${course.schedules.length} Dates`}
              </button>
            )}
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: dark ? 'rgba(255,255,255,0.45)' : '#64748B', flexShrink: 0 }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span className="text-[11px] font-semibold" style={{ color: dark ? 'rgba(255,255,255,0.55)' : '#64748B' }}>{course.enrolled}</span>
              <span style={{ color: dark ? 'rgba(255,255,255,0.2)' : '#CBD5E1', fontSize: 10 }}>·</span>
              <span style={{ color: '#F59E0B', fontSize: 11 }}>★</span>
              <span className="text-[11px] font-semibold" style={{ color: dark ? 'rgba(255,255,255,0.55)' : '#64748B' }}>{course.rating}</span>
            </div>
          </div>
          {/* Right — price */}
          <div className="text-right">
            <p className="text-sm font-bold leading-tight" style={{ color: dark ? '#38bdf8' : '#0694D1' }}>{course.price}</p>
            <p className="text-[10px] leading-tight mt-0.5" style={{ color: dark ? 'rgba(255,255,255,0.35)' : '#94A3B8' }}>excl. VAT/GST</p>
            <button onClick={() => setFeesOpen(true)} className="text-[10px] font-semibold mt-0.5 hover:underline cursor-pointer"
              style={{ color: dark ? 'rgba(56,189,248,0.7)' : '#0694D1' }}>
              View Fees Breakdown
            </button>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 px-4 pb-4 mt-auto">
        <button className="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all cursor-pointer"
          style={{ border: `1.5px solid ${dark ? 'rgba(255,255,255,0.2)' : '#093148'}`, color: dark ? 'rgba(255,255,255,0.75)' : '#093148', background: dark ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
          View Course
        </button>
        <button onClick={onEnroll}
          className="flex-1 rounded-lg py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #093148, #076D9D)' }}>
          Enroll Now
        </button>
      </div>
      </div>
    </>
  )
}


/* ── Filter data ─────────────────────────────────────────────── */
const OEM_OPTIONS = ['Microsoft','AWS','PMI','EC-Council','CompTIA','Cisco','PECB','Oracle','Red Hat','VMware','SAP','Google Cloud','ISACA','ISC2']
const TECH_OPTIONS = ['Cloud Computing','Cybersecurity','Project Management','Data & AI','Networking','DevOps & Cloud-Native','ITSM & Governance','SAP & ERP','Microsoft Office 365','Microsoft SQL Server','Linux & Open Source']
const ALL_VENDORS = [
  'Microsoft', 'AWS', 'Cisco', 'CompTIA', 'EC-Council', 'PMI', 'PECB',
  'Oracle', 'Red Hat', 'VMware', 'SAP', 'Google Cloud', 'ISACA', 'ISC2',
  'IBM', 'Juniper', 'Fortinet', 'Palo Alto Networks', 'CrowdStrike', 'Splunk',
  'ServiceNow', 'Salesforce', 'Axelos (ITIL/PRINCE2)', 'Scrum Alliance', 'Scrum.org',
  'PeopleCert', 'IAPP', 'DAMA', 'Linux Foundation', 'HashiCorp',
]

const TZ_OPTIONS   = [
  'IST — India (UTC+5:30)',
  'GST — UAE / Gulf (UTC+4)',
  'GMT — UK (UTC+0)',
  'CET — Central Europe (UTC+1)',
  'CEST — Central Europe Summer (UTC+2)',
  'EST — US East (UTC−5)',
  'CST — US Central (UTC−6)',
  'PST — US West (UTC−8)',
  'AEST — Australia East (UTC+10)',
  'SGT — Singapore (UTC+8)',
  'AFT — Afghanistan (UTC+4:30)',
  'NPT — Nepal (UTC+5:45)',
  'PKT — Pakistan (UTC+5)',
  'BDT — Bangladesh (UTC+6)',
  'GST — Gulf Standard (UTC+4)',
  'EAT — East Africa (UTC+3)',
  'WAT — West Africa (UTC+1)',
  'CAT — Central Africa (UTC+2)',
]

/* ── FilterDropdown ──────────────────────────────────────────── */
function FilterDropdown({
  label, options, value, onChange,
}: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen]       = useState(false)
  const [query, setQuery]     = useState('')
  const ref                   = useRef<HTMLDivElement>(null)
  const inputRef              = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50) }, [open])

  const displayed = value && value !== label ? value : label
  const filtered  = options.filter(o => o.toLowerCase().includes(query.toLowerCase()))
  const hasValue  = value && value !== label

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(p => !p)}
        className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all"
        style={{
          border:     `1px solid ${hasValue ? '#0694D1' : '#CAEFFF'}`,
          background: hasValue ? 'rgba(6,148,209,0.08)' : 'white',
          color:      hasValue ? '#0694D1' : '#475569',
          boxShadow:  hasValue ? '0 0 0 3px rgba(6,148,209,0.12)' : '0 1px 4px rgba(6,148,209,0.06)',
        }}>
        <span className="max-w-[120px] truncate">{displayed}</span>
        {hasValue && (
          <span onClick={e => { e.stopPropagation(); onChange(''); setQuery('') }}
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0694D1] text-white hover:bg-[#076D9D]">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </span>
        )}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: '#94A3B8' }}>
          <path d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 z-50 rounded-2xl overflow-hidden"
          style={{ minWidth: '290px', background: 'white', border: '1px solid #CAEFFF', boxShadow: '0 8px 32px rgba(6,148,209,0.16)' }}>
          {/* Search */}
          <div className="p-2 border-b" style={{ borderColor: '#EBF8FE' }}>
            <div className="flex items-center gap-2 rounded-lg px-3 py-1.5" style={{ background: '#F8FBFF', border: '1px solid #CAEFFF' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search…" className="flex-1 bg-transparent text-xs outline-none" style={{ color: '#0F172A' }} />
            </div>
          </div>
          {/* Options */}
          <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
            {filtered.map(o => (
              <button key={o} onClick={() => { onChange(o); setQuery(''); setOpen(false) }}
                className="flex w-full items-center px-4 py-2.5 text-sm transition-colors hover:bg-[#F0FAFF] text-left"
                style={{ color: value === o ? '#0694D1' : '#374151', background: value === o ? 'rgba(6,148,209,0.06)' : 'transparent', fontWeight: value === o ? 600 : 400, whiteSpace: 'nowrap' }}>
                {o}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-4 py-3 text-xs" style={{ color: '#94A3B8' }}>No results</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── FAQ Item ─────────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #CAEFFF' }}>
      <button onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#F0FAFF]"
        style={{ background: open ? '#EBF8FE' : 'white' }}>
        <span className="text-sm font-semibold pr-4" style={{ color: '#0F172A' }}>{q}</span>
        <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform"
          style={{ background: open ? '#0694D1' : '#EBF8FE', transform: open ? 'rotate(45deg)' : 'none' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? 'white' : '#0694D1'} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </span>
      </button>
      <div style={{ maxHeight: open ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <p className="px-5 py-4 text-sm leading-relaxed" style={{ color: '#475569', borderTop: '1px solid #EBF8FE' }}>{a}</p>
      </div>
    </div>
  )
}

/* ── All technology names from Koenig live-online-classes filter ─ */
const ALL_TECH_NAMES: string[] = [
  'Project Management','Microsoft Office 365','Microsoft SQL Server',
  'Citrix ADC (formerly NetScaler)','MS Office','VMware vSphere','VMware Horizon',
  'VMware NSX','ISO','Cisco Routing and Switching','Oracle Development',
  'Oracle Golden Gate','Oracle Database Administration','Soft Skills','ITIL',
  'Web Development','Cisco Collaboration','Cisco Service Provider','Cisco Security',
  'Cisco Data Center','Software Testing','Microsoft Azure','Linux OS Administration',
  'Microsoft SQL Administration','Oracle EBS','Security Testing','Security Management',
  'Security Products','Red Hat JBoss','Architecture Methodologies','Business Analysis',
  'Penetration Testing','Digital Forensics','Data Science','Oracle Weblogic',
  'Programming','Network Security','Red Hat Server Administration','Security',
  'DevOps Linux','CCNA','ERP','VMware vSAN','Graphic Designing',
  'User Experience Design','Python','Microsoft Excel','DBA - Database Administration',
  'Microsoft SQL Development','Software Development','Cyber Security','AWS Cloud',
  'COBIT','Microsoft Dynamics 365','Agile','Windows Server','Active Directory',
  'Oracle EBS SCM','Containers','PCI DSS','Angular','Artificial Intelligence (AI)',
  'Microsoft 365','Service Management','CWNP Wireless','Firewall',
  'Identity and Access Management (IAM)','Network Monitoring','IoT',
  'IT Service Management (ITSM)','Quality Management','SOC',
  'Red Hat Enterprise Linux (RHEL)','Red Hat OpenShift','Oracle Server',
  'Data Engineer','Microservices','AWS Architect','Data Warehouse','Cisco Enterprise',
  'Cisco DevNet','Robotic Process Automation (RPA)','Microsoft Artificial Intelligence',
  'Supply Chain Management (SCM)','Open Source','Middleware','Information Security',
  'Health and Safety','IT Governance','Networking',
  'Microsoft Dynamics 365 Finance and Operations','Microsoft Dynamics 365 CRM',
  'Network Monitoring and Analysis','Scrum','Business Continuity','Incident Response',
  'Secure Coding','Disaster Recovery','IBM WebSphere',
  'Vulnerability Assessment and Penetration Testing (VAPT)',
  'Microsoft Security Engineer','Oracle 19c','Oracle 12c',
  'Microsoft Power Platform','Blockchain','CCNP Security','CCNP Data Center',
  'Microsoft 365 Certified: Enterprise Administrator Expert','CCNP Service Provider',
  'ITIL® and PRINCE2®','Azure Development','Azure Infrastructure','Azure Security',
  'Microsoft Teams','Microsoft SharePoint Online','Oracle PL/SQL','Program Management',
  'Inventory Management','Procurement','Data Architect','Professional',
  'Lead Implementer','Lead Auditor','Payroll','Delivery Manager','Product Management',
  'Business Automation','Data Governance','Management','Business Administration',
  'Leadership and Management','Document Management System (DMS)','Azure Database',
  'Oracle EBS Functional','Meraki','Agile Project Management','React','DevSecOps',
  'VMware Spring','Ethical Hacking and Penetration Testing','Oracle Java',
  'Industrial Automation','Linux Administration','Containerization','Power Automate',
  'ServiceNow AID','Oracle Database 19c','Oracle Database Development',
  'Microsoft Dynamics 365 Finance & Operation (Technical)',
  'Microsoft Dynamics 365 Finance & Operation (Functional)','Oracle E-Business Suite',
  'GRC Management','ISC2 Security','Container Orchestration','Reporting','DevOps Tools',
  'Big Data - Data Analytics and Data Engineering','Google Cloud Platform',
  'Embedded Systems','DAMA','Software Testing Process','Figma','Adobe',
  'SAP Finance (FI)','SAP Human Capital Management (HCM)','SAP Material Management (MM)',
  'SAP Production Planning (PP)','SAP Successfactors (SF)','SAP SCM',
  'SAP Treasury and Risk Management (TRM)','EC-Council Security Testing',
  'Storage Administration','ITSM Tools and Services','CCNP Collaboration','JIRA',
  'SAP S/4 HANA','Kubernetes','PostgreSQL Technology','Microsoft IAM','AWS Kubernetes',
  'Electrical Engineering','Data Management & Analytics','Co-Pilot Github/Developer',
  'Microsoft Fabric','Supply Chain Management – Non Technical',
  'ASQ ( American Society for Quality)','Data Privacy and Security – IAPP',
  'Microsoft SQL Server Business Intelligence','Microsoft Data Engineering',
  'Microsoft Device management','VMware','Microsoft 365 Security','Audit & Compliance',
  'CAD, CAM and CAE','Computer-Aided Design (CAD)','Electrical Design','Data Analysis',
  'Python Programming','Risk Assessment','SAP Business One',
  'ServiceNow IT Service Management','Autodesk Architecture Engineering & Construction',
  'Agile Testing',
  'ManageEngine Endpoint management and protection platform (UEM and EPP)',
  'UiPath Automation Developer','MLOps','Cloud Native Architecture',
  'Natural Language Processing','AI Ethics & Governance','Design Systems',
  'Intelligent Document Processing','Human-Computer Interaction Expansion',
  'Industrial IoT (IIoT)','Azure AI','Finance and Accounts','Microsoft Dataverse',
  'IT Service Desk','AI Engineering','Generative AI Platforms',
  'AI Agents & Autonomous Systems','AI Cloud Platforms','Enterprise AI Architecture',
  'Intelligent Automation','AI Governance','Cisco Automation','CCNA Automation',
  'Electric Vehicle (EV)',
]

const _TECH_PALETTE = [
  { bg: '#E3F2FD', color: '#0078d4' }, { bg: '#E8F5E9', color: '#2e7d32' },
  { bg: '#FFF3E0', color: '#e65100' }, { bg: '#FCE4EC', color: '#c2185b' },
  { bg: '#EDE7F6', color: '#7c3aed' }, { bg: '#E0F7FA', color: '#1ba0d7' },
  { bg: '#FFF8E1', color: '#d97706' }, { bg: '#ECEFF1', color: '#475569' },
  { bg: '#E8EAF6', color: '#3949ab' }, { bg: '#E0F2F1', color: '#00695c' },
]
function _tStyle(n: string) { return _TECH_PALETTE[n.charCodeAt(0) % _TECH_PALETTE.length] }
function _tInitial(n: string) {
  const w = n.split(/[\s&(]+/).filter(x => x.length > 1)
  return w.length < 2 ? n.slice(0,2).toUpperCase() : (w[0][0]+w[1][0]).toUpperCase()
}
const _TECH_COUNTS = Object.fromEntries(
  ALL_TECH_NAMES.map(t => [t, COURSES.filter(c => (c.techs ?? []).includes(t)).length])
)
const SIDEBAR_TECHNOLOGIES = [
  ...[...ALL_TECH_NAMES]
    .sort((a,b) => (_TECH_COUNTS[b]??0) - (_TECH_COUNTS[a]??0) || a.localeCompare(b))
    .map(name => { const s = _tStyle(name); return { name, label: name, count: _TECH_COUNTS[name]??0, bg: s.bg, color: s.color, initial: _tInitial(name) } }),
]

const TECH_DESCS: Record<string, string> = {
  'All':                                     'Koenig\'s Live Online Classroom delivers expert-led, Guaranteed-to-Run courses — book with confidence and advance your career from anywhere in the world.',
  'Microsoft Azure':                         'Master Azure administration, AI, developer solutions and infrastructure design with Microsoft certified training.',
  'Cyber Security':                          'Protect organisations with CEH, CompTIA Security+ and SC-200 Microsoft Security Operations analyst training.',
  'AWS Cloud':                               "Build, deploy and scale on the world's most comprehensive cloud platform with AWS certified instructor-led training.",
  'Microsoft Fabric':                        'Build unified analytics solutions with Microsoft Fabric data engineering and analytics engineer certification.',
  'Artificial Intelligence (AI)':           'Design and implement production-ready AI solutions on Microsoft Azure with the AI-102 certification course.',
  'Identity and Access Management (IAM)':   'Govern identity, access policies and compliance with the Microsoft Identity and Access Administrator (SC-300) course.',
  'Project Management':                      'Advance your PM career with the globally recognised PMP® certification exam-prep training.',
  'Data Management & Analytics':             'Analyse business data and build powerful reports with the Microsoft Power BI Data Analyst (PL-300) certification.',
  'Ethical Hacking and Penetration Testing': 'Master ethical hacking methodologies with the world-renowned Certified Ethical Hacker (CEH v13) certification.',
  'CCNA':                                    'Master enterprise networking fundamentals and advanced routing with Cisco CCNA instructor-led training.',
  'ISO':                                     'Become an ISO/IEC 27001 Lead Implementer with PECB internationally recognised certification training.',
}

/* ── Shared form data ────────────────────────────────────────── */
const HEAR_OPTIONS = [
  'Organic Search (Google/Bing/Yahoo)',
  'Paid Search Ads (Google Ads, Bing Ads)',
  'Webinars',
  'Email Outreach',
  'LinkedIn',
  'Social Media (Facebook, Instagram, X)',
  'YouTube',
  'Trustpilot',
  'Word of Mouth',
  'Existing customer referral',
  'Press release',
  'Other',
]

/* ── ILO Testimonial Card ────────────────────────────────────── */
function IloTestimonialCard({ t, onExpandChange }: { t: typeof TESTIMONIALS[0]; onExpandChange?: (exp: boolean) => void }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = t.quote.length > 140
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white h-full"
      style={{ border: '1px solid #DCEEFB', boxShadow: '0 2px 12px rgba(6,148,209,0.07)' }}>
      <div className="flex-1 flex flex-col p-5">
        {/* Stars */}
        <div className="mb-3 text-base leading-none" style={{ color: '#F59E0B', letterSpacing: '1px' }}>★★★★★</div>
        {/* Quote */}
        <p className="mb-4 text-sm leading-relaxed flex-1" style={{ color: '#2d4a6a' }}>
          &ldquo;{isLong && !expanded ? `${t.quote.slice(0, 140)}…` : t.quote}&rdquo;
        </p>
        {isLong && (
          <button onClick={() => { const n = !expanded; setExpanded(n); onExpandChange?.(n) }}
            className="mb-3 w-fit rounded-full border px-3 py-1 text-xs font-semibold text-[#0694D1] transition-all hover:bg-[#0694D1] hover:text-white"
            style={{ borderColor: '#0694D1' }}>
            {expanded ? 'Show Less ↑' : 'Show More ↓'}
          </button>
        )}
        {/* Photo + Name + Role */}
        <div className="flex items-center gap-3">
          {t.avatar ? (
            <img src={t.avatar} alt={t.name}
              className="w-12 h-12 rounded-full object-cover object-top shrink-0"
              style={{ border: '2px solid #DCEEFB', boxShadow: '0 2px 8px rgba(6,148,209,0.15)' }} />
          ) : (
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ background: t.avatarBg, border: '2px solid #DCEEFB' }}>
              {t.initials}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight" style={{ color: '#0d1b2a' }}>{t.name}</p>
            <p className="text-xs font-semibold mt-0.5" style={{ color: '#0694D1' }}>{t.role}</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: '#E8F4FA', background: '#F8FCFF' }}>
        <p className="text-xs font-bold" style={{ color: '#0d1b2a' }}>{t.course}</p>
        <span className="rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{ background: '#EBF8FE', color: '#0569a8', border: '1px solid #CAEFFF' }}>✓ Verified</span>
      </div>
    </div>
  )
}

/* ── ILO Mobile Horizontal Marquee ──────────────────────────── */
function IloMobileMarquee({ items }: { items: typeof TESTIMONIALS }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const paused = useRef(false)
  const expandedCount = useRef(0)
  const dragStartX = useRef(0)
  const dragStartPos = useRef(0)

  useEffect(() => {
    const inner = trackRef.current
    if (!inner) return
    let prev = performance.now(); let raf: number
    function tick(now: number) {
      const dt = now - prev; prev = now
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
    <div className="sm:hidden overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%)', WebkitMaskImage: 'linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%)' }}
      onTouchStart={e => { paused.current = true; dragStartX.current = e.touches[0].clientX; dragStartPos.current = pos.current }}
      onTouchMove={e => {
        const delta = dragStartX.current - e.touches[0].clientX
        const inner = trackRef.current; if (!inner) return
        const half = inner.scrollWidth / 2
        let newPos = dragStartPos.current + delta
        if (newPos < 0) newPos = 0
        if (half > 0 && newPos >= half) newPos = half - 1
        pos.current = newPos; inner.style.transform = `translateX(-${pos.current}px)`
      }}
      onTouchEnd={() => { if (expandedCount.current === 0) paused.current = false }}>
      <div ref={trackRef} className="flex items-stretch gap-4 py-2" style={{ width: 'max-content' }}>
        {[...items, ...items].map((t, i) => (
          <div key={i} style={{ width: '280px', flexShrink: 0 }}>
            <IloTestimonialCard t={t} onExpandChange={exp => {
              expandedCount.current += exp ? 1 : -1
              if (expandedCount.current < 0) expandedCount.current = 0
              paused.current = expandedCount.current > 0
            }} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── ILO Desktop Scroll Column ───────────────────────────────── */
function IloScrollColumn({ items, speed }: { items: typeof TESTIMONIALS; speed: number }) {
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const paused = useRef(false)

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return
    let prev = performance.now(); let raf: number
    function tick(now: number) {
      const dt = now - prev; prev = now
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
    <div style={{ height: '520px', overflow: 'hidden' }}
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}>
      <div ref={innerRef} className="flex flex-col gap-4 pb-4">
        {[...items, ...items].map((t, i) => <IloTestimonialCard key={i} t={t} />)}
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function LiveOnlineClassroomPage() {
  const [activeTab, setActiveTab]     = useState('ilo')
  const [activeTechs, setActiveTechs] = useState<string[]>([])
  const toggleTech = (name: string) => {
    setActiveTechs(prev => prev.includes(name) ? prev.filter(t => t !== name) : [...prev, name])
    setPage(0)
  }
  const [techSearch, setTechSearch]       = useState('')
  const [vendorSearch, setVendorSearch]   = useState('')
  const [search, setSearch]           = useState('')
  const [filterTz, setFilterTz]       = useState('')
  const [filterVendor, setFilterVendor] = useState('Microsoft')
  const [page, setPage]               = useState(0)
  const [activeReviewFaq, setActiveReviewFaq] = useState<'reviews' | 'faq'>('reviews')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const tabScrollRef = useRef<HTMLDivElement>(null)
  const [benSlideIdx, setBenSlideIdx] = useState(0)
  const benTouchStartX = useRef(0)
  const [howSlideIdx, setHowSlideIdx] = useState(0)
  const howTouchStartX = useRef(0)
  const [showSyllabusModal, setShowSyllabusModal] = useState(false)
  const [syllabusCourseName, setSyllabusCourseName] = useState('')
  const PER_PAGE = 9

  const filtered = COURSES.filter(c => {
    const q = search.toLowerCase()
    const matchSearch  = !q || c.name.toLowerCase().includes(q) || c.vendor.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    const matchTech    = !activeTechs.length || activeTechs.some(t => (c.techs ?? []).includes(t))
    const matchTz      = !filterTz || c.schedules.some(s => s.time.includes(filterTz))
    const matchVendor  = !filterVendor || c.vendor === filterVendor
    return matchSearch && matchTech && matchTz && matchVendor
  })
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
  const activeTechData = activeTechs.length === 1
    ? (SIDEBAR_TECHNOLOGIES.find(t => t.name === activeTechs[0]) ?? { name: '', label: 'All Courses', count: COURSES.length, bg: '#EBF8FE', color: '#0694D1', initial: '★' })
    : activeTechs.length > 1
    ? { name: '', label: `${activeTechs.length} Technologies`, count: filtered.length, bg: '#EBF8FE', color: '#0694D1', initial: '★' }
    : { name: '', label: 'All Courses', count: COURSES.length, bg: '#EBF8FE', color: '#0694D1', initial: '★' }

  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />

      {/* ── SYLLABUS MODAL ───────────────────────────────────── */}
      {showSyllabusModal && (
        <SyllabusModal courseName={syllabusCourseName} onClose={() => setShowSyllabusModal(false)} />
      )}

      {/* ── CONTACT MODAL ────────────────────────────────────── */}
      <ContactModal />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 lg:px-[50px]" style={{ background: 'linear-gradient(135deg, #061624 0%, #071929 60%, #062236 100%)' }}>
        {/* Background glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-1/3 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: '#0694D1' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: '#38bdf8' }} />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full opacity-8 blur-[80px]" style={{ background: '#076D9D' }} />
        </div>

        <style>{`
          @keyframes lolFloat1 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
          @keyframes lolFloat2 { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-8px) rotate(-1deg)} }
          @keyframes lolFloat3 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(9px) translateX(3px)} }
          @keyframes lolFloat4 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(8px) rotate(1.5deg)} }
          @keyframes lolGlow   { 0%,100%{box-shadow:0 4px 18px rgba(6,109,157,0.30),inset 0 1px 0 rgba(255,255,255,0.18)} 50%{box-shadow:0 4px 28px rgba(6,148,209,0.55),0 0 16px rgba(58,182,235,0.30),inset 0 1px 0 rgba(255,255,255,0.28)} }
        `}</style>

        <div className="relative mx-auto max-w-7xl py-5 lg:py-[50px]">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text content */}
            <div>
              <div className="mb-[15px] lg:mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
                style={{ background: 'rgba(6,148,209,0.18)', color: '#38bdf8', border: '1px solid rgba(6,148,209,0.35)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                Live Instructor-Led Training — Guaranteed to Run
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-bold leading-tight mb-[15px] lg:mb-4 text-white">
                <span className="block whitespace-nowrap">Master In-Demand Skills.</span>
                <span className="block whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Live Online. Anywhere.
                </span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed mb-[15px] lg:mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Learn from expert instructors with our 5,000+ course catalogue. Upskill conveniently, from the comfort of your own space — with sessions Guaranteed to Run.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => window.dispatchEvent(new CustomEvent('openContactModal', { detail: { type: 'individual' } }))} className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 0 20px rgba(6,148,209,0.35)' }}>
                  Request More Info
                </button>
                <a href="#schedule" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:bg-white/10"
                  style={{ border: '1.5px solid rgba(6,148,209,0.6)', color: '#38bdf8', background: 'rgba(6,148,209,0.08)' }}>
                  View Upcoming Batches
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>

              {/* Social proof */}
              <div className="mt-4 flex items-center gap-3 justify-center lg:justify-start">
                <div style={{ display: 'flex' }}>
                  {[
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
                  ].map((src, i) => (
                    <img key={i} src={src} alt="certified professional" width={34} height={34}
                      style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid #0a1628', objectFit: 'cover', marginLeft: i === 0 ? 0 : -10, position: 'relative', zIndex: 5 - i }} />
                  ))}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 3 }}>
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i} style={{ color: '#F59E0B', fontSize: 15, lineHeight: 1 }}>{s}</span>
                    ))}
                  </div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1AABDD' }}>
                    500K+ <span style={{ color: 'rgba(228,247,255,0.7)', fontWeight: 400 }}>certified professionals</span>
                  </p>
                </div>
              </div>

              {/* Mobile-only stat tiles — mirrors desktop floating cards */}
              <div className="lg:hidden grid grid-cols-4 gap-2 mt-[15px]">
                {([
                  { val: '5M+',    label: 'Learners'   },
                  { val: '195+',   label: 'Countries'  },
                  { val: '5,000+', label: 'Courses'    },
                  { val: 'GTR',    label: 'Guaranteed' },
                ]).map(({ val, label }) => (
                  <div key={val} className="flex flex-col items-center justify-center rounded-xl py-3 px-1"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(6,148,209,0.30)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                    <span className="text-sm font-black leading-none" style={{ color: '#38bdf8' }}>{val}</span>
                    <span className="text-[10px] font-medium mt-0.5 text-center leading-tight" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Live-Online-Classes image with floating stat cards */}
            <div className="hidden lg:block">
              <div className="relative mx-auto" style={{ width: '500px', padding: '44px' }}>

                {/* Floating stat cards */}
                {([
                  { val: '5M+',    label: 'Learners',   pos: { top: 0,    left: 0   }, anim: 'lolFloat1 3.4s ease-in-out infinite' },
                  { val: '195+',   label: 'Countries',  pos: { top: 0,    right: 0  }, anim: 'lolFloat2 3.8s ease-in-out infinite 0.5s' },
                  { val: '5,000+', label: 'Courses',    pos: { bottom: 0, left: 0   }, anim: 'lolFloat3 4.0s ease-in-out infinite 1.0s' },
                  { val: 'GTR',    label: 'Guaranteed', pos: { bottom: 0, right: 0  }, anim: 'lolFloat4 3.6s ease-in-out infinite 1.5s' },
                ] as { val: string; label: string; pos: React.CSSProperties; anim: string }[]).map(({ val, label, pos, anim }) => (
                  <div
                    key={val}
                    className="absolute flex flex-col items-center justify-center rounded-xl"
                    style={{
                      ...pos,
                      width: 76,
                      padding: '8px 10px',
                      background: 'rgba(255,255,255,0.96)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(6,148,209,0.30)',
                      textAlign: 'center',
                      animation: `${anim}, lolGlow 3s ease-in-out infinite`,
                      zIndex: 10,
                    }}
                  >
                    <span className="text-base font-black leading-none" style={{ color: '#0694D1' }}>{val}</span>
                    <span className="text-[10px] font-medium mt-0.5" style={{ color: '#475569' }}>{label}</span>
                  </div>
                ))}

                {/* Main image card */}
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{
                    background: 'rgba(6,25,45,0.52)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1.5px solid rgba(6,148,209,0.50)',
                    boxShadow: '0 0 0 4px rgba(6,148,209,0.08), 0 0 30px 6px rgba(6,148,209,0.22), 0 0 60px 12px rgba(58,182,235,0.10), 0 8px 40px rgba(6,109,157,0.28), inset 0 1px 0 rgba(58,182,235,0.15)',
                  }}
                >
                  <img
                    src="/images/home-banner/Live-Online-Classes.png"
                    alt="Live Online Classes"
                    className="w-full h-auto object-contain"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TRAINING MODE TABS ───────────────────────────────── */}
      <style>{`
        @keyframes tab-border-sweep {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .tab-border-glow {
          background: linear-gradient(270deg, #0694D1, #38bdf8, #076D9D, #38bdf8, #0694D1);
          background-size: 400% 400%;
          animation: tab-border-sweep 3s ease infinite;
          padding: 2px;
          border-radius: 1rem;
          display: inline-flex;
        }
      `}</style>
      <section className="bg-white border-b py-4 px-4 lg:px-[50px]" style={{ borderColor: '#E2E8F0' }}>
        <div className="mx-auto max-w-7xl">

          {/* Mobile: full-width scrollable, active tab snaps to left */}
          <div className="sm:hidden">
            <div className="tab-border-glow" style={{ display: 'block', width: '100%' }}>
              <div
                ref={tabScrollRef}
                className="flex overflow-x-auto rounded-[14px] bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}
              >
                {TRAINING_TABS.map(t =>
                  t.id === 'ilo' ? (
                    <button key={t.id}
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

          {/* Desktop: centered, unchanged */}
          <div className="hidden sm:flex justify-center">
            <div className="tab-border-glow">
              <div className="inline-flex overflow-hidden rounded-[14px] bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]">
                {TRAINING_TABS.map(t =>
                  t.id === 'ilo' ? (
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
      <section className="relative overflow-hidden px-4 lg:px-[50px]" style={{ background: '#07121e', paddingTop: '50px', paddingBottom: '50px' }}>

        <style>{`
          @keyframes indIconPulse { 0%,100%{box-shadow:0 0 0 0 rgba(19,168,212,.25)} 50%{box-shadow:0 0 0 7px rgba(19,168,212,.06),0 0 16px rgba(19,168,212,.18)} }
          @keyframes indCardIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
          .ben-card { position:relative;overflow:hidden;border-radius:18px;padding:28px;cursor:default;
            background:linear-gradient(145deg,rgba(13,32,53,.92) 0%,rgba(10,22,40,.96) 60%,rgba(11,37,69,.88) 100%);
            border:1px solid rgba(19,168,212,.18);
            transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease,border-color .35s ease;
            opacity:0; }
          .ben-card.ben-visible { animation:indCardIn .55s cubic-bezier(.22,1,.36,1) forwards; }
          .ben-card:hover { transform:translateY(-7px); border-color:rgba(19,168,212,.55); box-shadow:0 0 0 1px rgba(19,168,212,.2),0 16px 40px rgba(0,0,0,.4),0 0 32px rgba(19,168,212,.12); }
          .ben-card::before { content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:280px;height:220px;border-radius:50%;
            background:radial-gradient(ellipse,rgba(19,168,212,.13) 0%,transparent 70%);
            opacity:0;transition:opacity .4s ease;pointer-events:none; }
          .ben-card:hover::before { opacity:1; }
          .ben-accent { position:absolute;top:0;left:50%;transform:translateX(-50%);height:2.5px;width:0;border-radius:2px;
            background:linear-gradient(90deg,transparent,#13a8d4,#38bdf8,#13a8d4,transparent);
            transition:width .45s cubic-bezier(.22,1,.36,1);pointer-events:none; }
          .ben-card:hover .ben-accent { width:100%; }
          @keyframes indDraw { from{stroke-dashoffset:500} to{stroke-dashoffset:0} }
          @keyframes indFloat { from{transform:translateY(0px)} to{transform:translateY(-5px)} }
          @keyframes indShake { 0%{transform:translateY(var(--fy,0px)) rotate(0deg) scale(1)} 15%{transform:translateY(var(--fy,0px)) rotate(-6deg) scale(1.06)} 30%{transform:translateY(var(--fy,0px)) rotate(5deg) scale(1.1)} 45%{transform:translateY(var(--fy,0px)) rotate(-3deg) scale(1.08)} 60%{transform:translateY(var(--fy,0px)) rotate(2deg) scale(1.09)} 75%{transform:translateY(var(--fy,0px)) rotate(-1deg) scale(1.1)} 100%{transform:translateY(var(--fy,0px)) rotate(-3deg) scale(1.08)} }
          .ben-icon-box { width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;
            background:rgba(19,168,212,.08);border:1px solid rgba(19,168,212,.28);
            animation:indIconPulse 3s ease-in-out infinite;transition:background .3s,border-color .3s; }
          .ben-card:hover .ben-icon-box { background:rgba(19,168,212,.22);border-color:#13a8d4; }
          .ben-icon-svg { display:flex;align-items:center;justify-content:center;animation:indFloat 3s ease-in-out infinite alternate; }
          .ben-card:hover .ben-icon-svg { animation:indShake .55s cubic-bezier(.36,.07,.19,.97) both; }
          .ben-icon-svg svg path,.ben-icon-svg svg circle,.ben-icon-svg svg line,.ben-icon-svg svg polyline,.ben-icon-svg svg rect {
            stroke-dasharray:500;stroke-dashoffset:500;stroke:#13a8d4;transition:stroke .3s ease; }
          .ben-card.ben-visible .ben-icon-svg svg path,
          .ben-card.ben-visible .ben-icon-svg svg circle,
          .ben-card.ben-visible .ben-icon-svg svg line,
          .ben-card.ben-visible .ben-icon-svg svg polyline,
          .ben-card.ben-visible .ben-icon-svg svg rect { animation:indDraw 1.2s ease-in-out var(--draw-delay,0s) forwards; }
          .ben-card:hover .ben-icon-svg svg path,
          .ben-card:hover .ben-icon-svg svg circle,
          .ben-card:hover .ben-icon-svg svg line,
          .ben-card:hover .ben-icon-svg svg polyline,
          .ben-card:hover .ben-icon-svg svg rect { stroke:#fff; }
          .ben-divider { height:1px;background:rgba(19,168,212,.18);border-radius:1px;margin:12px 0;width:40px;transition:width .4s cubic-bezier(.22,1,.36,1); }
          .ben-card:hover .ben-divider { width:100%; }
          .ben-ghost { position:absolute;bottom:8px;right:14px;font-size:88px;font-weight:900;line-height:1;
            color:rgba(19,168,212,.045);letter-spacing:-4px;pointer-events:none;user-select:none;
            transition:transform .4s ease,color .4s ease; }
          .ben-card:hover .ben-ghost { transform:translateY(-4px);color:rgba(19,168,212,.08); }
          .ben-tag { border-radius:100px;padding:3px 10px;font-size:11px;font-weight:600;
            background:rgba(19,168,212,.10);color:rgba(19,168,212,.7);border:1px solid rgba(19,168,212,.2);
            transition:background .3s,color .3s,border-color .3s; }
          .ben-card:hover .ben-tag { background:rgba(19,168,212,.22);color:#7de8ff;border-color:rgba(19,168,212,.45); }
        `}</style>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center mb-10 sm:mb-12">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#38bdf8' }}>Why ILO</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Why Choose{' '}
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Live Online Training
              </span>{' '}with Koenig?
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Real instructors, real labs, real results — all from your desk. Here&apos;s what sets Koenig&apos;s ILO apart.
            </p>
          </div>
          {/* Mobile: slider with swipe, arrows, dots */}
          <div className="sm:hidden">
            <div
              className="overflow-hidden"
              onTouchStart={e => { benTouchStartX.current = e.touches[0].clientX }}
              onTouchEnd={e => {
                const dx = benTouchStartX.current - e.changedTouches[0].clientX
                if (dx > 50)  setBenSlideIdx(p => Math.min(p + 1, BENEFITS.length - 1))
                if (dx < -50) setBenSlideIdx(p => Math.max(p - 1, 0))
              }}
            >
              <div
                className="flex"
                style={{ transform: `translateX(-${benSlideIdx * 100}%)`, transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)' }}
              >
                {BENEFITS.map((b, i) => (
                  <div key={b.title} className="ben-card ben-visible shrink-0 w-full" style={{ ['--draw-delay' as string]: '0s' } as React.CSSProperties}>
                    <div className="ben-accent" />
                    <div className="flex gap-4 items-start">
                      <div className="ben-icon-box shrink-0">
                        <div className="ben-icon-svg">{b.icon}</div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-white">{b.title}</h3>
                        <div className="ben-divider" />
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.52)' }}>{b.desc}</p>
                      </div>
                    </div>
                    <div className="ben-ghost" aria-hidden>{String(i + 1).padStart(2, '0')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots + Arrows */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                onClick={() => setBenSlideIdx(p => Math.max(p - 1, 0))}
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                style={{ background: benSlideIdx === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.35)', color: benSlideIdx === 0 ? 'rgba(255,255,255,0.25)' : '#38bdf8' }}
                disabled={benSlideIdx === 0}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>

              <div className="flex gap-2">
                {BENEFITS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setBenSlideIdx(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: benSlideIdx === i ? 20 : 7,
                      height: 7,
                      background: benSlideIdx === i ? '#0694D1' : 'rgba(255,255,255,0.22)',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => setBenSlideIdx(p => Math.min(p + 1, BENEFITS.length - 1))}
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                style={{ background: benSlideIdx === BENEFITS.length - 1 ? 'rgba(255,255,255,0.06)' : 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.35)', color: benSlideIdx === BENEFITS.length - 1 ? 'rgba(255,255,255,0.25)' : '#38bdf8' }}
                disabled={benSlideIdx === BENEFITS.length - 1}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* Desktop: grid unchanged */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <div
                key={b.title}
                className="ben-card"
                style={{ animationDelay: `${i * 0.1}s` }}
                ref={(el) => {
                  if (!el) return
                  const obs = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) { el.classList.add('ben-visible'); obs.disconnect() }
                  }, { threshold: 0.12 })
                  obs.observe(el)
                }}
              >
                <div className="ben-accent" />
                <div className="flex gap-4 items-start">
                  <div className="ben-icon-box shrink-0" style={{ animationDelay: `${i * 0.6}s` }}>
                    <div className="ben-icon-svg" style={{ animationDelay: `${i * 0.4}s`, ['--fy' as string]: `${i % 2 === 0 ? '0px' : '-2px'}`, ['--draw-delay' as string]: `${i * 0.15}s` } as React.CSSProperties}>
                      {b.icon}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-white">{b.title}</h3>
                    <div className="ben-divider" />
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.52)' }}>{b.desc}</p>
                  </div>
                </div>
                <div className="ben-ghost" aria-hidden>{String(i + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING SCHEDULE ────────────────────────────────── */}
      <style>{`
        @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        .batch-card { background:#fff; border:1px solid #CAEFFF; border-radius:12px; padding:20px; cursor:pointer; transition:transform 0.3s,box-shadow 0.3s; box-shadow:0 4px 16px rgba(0,164,239,0.10); position:relative; }
        .batch-card:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(6,148,209,0.15); }
        .batch-card-row1 { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
        .batch-badges { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .batch-vendor-badge { display:inline-flex; align-items:center; gap:4px; font-size:11px; font-weight:700; padding:2px 10px; border-radius:20px; background:rgba(6,148,209,0.12); color:#0694D1; border:1px solid rgba(6,148,209,0.3); letter-spacing:0.03em; }
        .batch-format-badge { display:inline-flex; align-items:center; gap:4px; font-size:11px; font-weight:700; padding:2px 8px; border-radius:20px; }
        .batch-format-online { background:#EBF8FE; color:#0694d1; }
        .batch-seats { font-size:11px; font-weight:600; padding:2px 8px; border-radius:20px; white-space:nowrap; }
        .batch-seats-ok { background:rgba(34,197,94,0.08); color:#16a34a; }
        .batch-name { font-size:14px; font-weight:600; color:#071e2e; margin-bottom:8px; line-height:1.4; transition:color 0.2s; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .batch-card:hover .batch-name { color:#0694D1; }
        .batch-meta { display:flex; align-items:center; gap:6px; flex-wrap:wrap; font-size:11.5px; color:#5a7a90; margin-bottom:14px; }
        .batch-meta-item { display:inline-flex; align-items:center; gap:3px; }
        .batch-footer { display:flex; align-items:center; justify-content:space-between; border-top:1px solid #CAEFFF; padding-top:12px; }
        .batch-location-label { font-size:11px; color:#8faabf; }
        .batch-location-val { display:flex; align-items:center; gap:4px; margin-top:2px; }
        .batch-reserve-btn { padding:8px 16px; background:linear-gradient(135deg,#0694D1,#076D9D); border:none; border-radius:8px; color:#fff; font-size:12px; font-weight:700; cursor:pointer; font-family:inherit; white-space:nowrap; transition:background 0.2s,box-shadow 0.2s,transform 0.2s; box-shadow:0 2px 8px rgba(6,148,209,0.25); }
        .batch-reserve-btn:hover { box-shadow:0 6px 20px rgba(6,148,209,0.4); transform:translateY(-1px); }
      `}</style>
      <section id="schedule" className="relative py-12 sm:py-16 px-4 lg:px-[50px]" style={{ background: '#EBF8FE', borderTop: '1px solid #CAEFFF' }}>
        {/* background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-16 left-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.16) 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">

          {/* Section header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest mb-2"
              style={{ background: 'rgba(6,148,209,0.1)', color: '#0694D1' }}>
              Guaranteed Schedules
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: '#071e2e', lineHeight: 1.2 }}>
              Find Your <em style={{ fontStyle: 'normal', background: 'linear-gradient(90deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Guaranteed to Run</em> Course
            </h2>
            <p className="text-sm" style={{ color: '#5a7a90', marginTop: 4 }}>
              Browse {COURSES.length} live online GTR classes — filter by technology to find your next certification.
            </p>
          </div>

          {/* ── Grouped interactive panel ── */}
          <div className="relative rounded-2xl p-4 sm:p-5" style={{ background: '#F0F9FF', border: '1px solid #CAEFFF', boxShadow: '0 4px 24px rgba(6,148,209,0.08)' }}>


          {/* Two-panel layout */}
          <div className="flex gap-5 items-start">

            {/* ── Left sidebar ── */}
            <div className="hidden lg:flex flex-col w-[220px] shrink-0 rounded-2xl overflow-hidden bg-white self-start sticky top-4"
              style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 10px rgba(6,148,209,0.07)' }}>
              {/* ── Vendor section (always open, at top) ── */}
              <div className="px-3 pt-3 pb-2" style={{ borderBottom: '1px solid #EBF8FE' }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>VENDOR</p>
                <div className="relative">
                  <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input type="text" placeholder="Search..." value={vendorSearch}
                    onChange={e => setVendorSearch(e.target.value)}
                    className="w-full pl-7 py-1.5 text-[11px] rounded-lg outline-none"
                    style={{ background: '#F0F9FF', border: '1px solid #CAEFFF', color: '#0F172A', paddingRight: vendorSearch ? '24px' : '8px' }}
                  />
                  {vendorSearch && (
                    <button onClick={() => setVendorSearch('')}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-5 h-5 hover:bg-[#CAEFFF] transition-all"
                      style={{ color: '#64748B' }}>
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
                    <button key={v}
                      onClick={() => { setFilterVendor(v); setPage(0) }}
                      className="flex items-center justify-between w-full px-3 py-2 text-left transition-colors hover:bg-[#F0FAFF]"
                      style={{ borderLeft: `3px solid ${active ? '#0694D1' : 'transparent'}`, background: active ? '#EBF8FE' : 'white' }}>
                      <span className="text-[13px] font-medium truncate" style={{ color: active ? '#0694D1' : '#374151' }} title={v}>{v}</span>
                      <span className="text-[10px] font-bold rounded-full px-1.5 py-0.5 shrink-0 ml-1"
                        style={{ background: active ? '#0694D1' : '#E2E8F0', color: active ? 'white' : '#6B7280' }}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* ── Technology section ── */}
              <div className="px-3 pt-2.5 pb-2" style={{ borderTop: '1px solid #EBF8FE', borderBottom: '1px solid #EBF8FE' }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>TECHNOLOGY</p>
                <div className="relative">
                  <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input type="text" placeholder="Search..." value={techSearch}
                    onChange={e => setTechSearch(e.target.value)}
                    className="w-full pl-7 py-1.5 text-[11px] rounded-lg outline-none"
                    style={{ background: '#F0F9FF', border: '1px solid #CAEFFF', color: '#0F172A', paddingRight: techSearch ? '24px' : '8px' }}
                  />
                  {techSearch && (
                    <button onClick={() => setTechSearch('')}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-5 h-5 hover:bg-[#CAEFFF] transition-all"
                      style={{ color: '#64748B' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-col overflow-y-auto" style={{ maxHeight: 352 }}>
                {/* All Technologies — clears all selections */}
                {!techSearch && (
                  <button
                    onClick={() => { setActiveTechs([]); setPage(0) }}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-left transition-colors hover:bg-[#F0FAFF]"
                    style={{
                      borderLeft: `3px solid ${activeTechs.length === 0 ? '#0694D1' : 'transparent'}`,
                      background:  activeTechs.length === 0 ? '#EBF8FE' : 'white',
                    }}>
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                        style={{ background: '#EBF8FE', color: '#0694D1', fontSize: 13, fontWeight: 700 }}>★</div>
                      <span className="text-[14px] font-medium leading-tight truncate"
                        style={{ color: activeTechs.length === 0 ? '#0694D1' : '#374151' }}>
                        All Technologies
                      </span>
                    </div>
                    <span className="text-[10px] font-bold rounded-full px-1.5 py-0.5 shrink-0 ml-1"
                      style={{
                        background: activeTechs.length === 0 ? '#0694D1' : '#E2E8F0',
                        color:      activeTechs.length === 0 ? 'white' : '#6B7280',
                      }}>
                      {COURSES.length}
                    </span>
                  </button>
                )}
                {SIDEBAR_TECHNOLOGIES
                  .filter(t => !techSearch || t.name.toLowerCase().includes(techSearch.toLowerCase()))
                  .map(t => {
                    const active = activeTechs.includes(t.name)
                    return (
                      <button key={t.name}
                        onClick={() => toggleTech(t.name)}
                        className="flex items-center justify-between w-full px-3 py-2.5 text-left transition-colors hover:bg-[#F0FAFF]"
                        style={{
                          borderLeft: `3px solid ${active ? '#0694D1' : 'transparent'}`,
                          background:  active ? '#EBF8FE' : 'white',
                        }}>
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                            style={{ background: t.bg, color: t.color }}>
                            {getTechIcon(t.name)}
                          </div>
                          <span className="text-[14px] font-medium leading-tight truncate"
                            style={{ color: active ? '#0694D1' : '#374151' }}
                            title={t.label}>
                            {t.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-1">
                          <span className="text-[10px] font-bold rounded-full px-1.5 py-0.5"
                            style={{
                              background: active ? '#0694D1' : '#E2E8F0',
                              color:      active ? 'white' : '#6B7280',
                            }}>
                            {t.count}
                          </span>
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

            {/* ── Right panel ── */}
            <div className="flex-1 min-w-0">

              {/* Technology header */}
              <div className="flex flex-col gap-3 mb-5 p-5 rounded-2xl bg-white"
                style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 8px rgba(6,148,209,0.07)' }}>
                {/* Top row: icon + title + button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: activeTechData.bg, color: activeTechData.color }}>
                      {activeTechData.initial}
                    </div>
                    <div>
                      <h3 className="text-base font-bold mb-0.5" style={{ color: '#06111E' }}>{activeTechData.label}</h3>
                      <p className="text-xs sm:text-sm leading-snug" style={{ color: '#64748B' }}>{(activeTechs.length === 1 ? TECH_DESCS[activeTechs[0]] : undefined) ?? `Browse all Guaranteed-to-Run ${activeTechData.label} courses — confirmed to run regardless of enrolment numbers.`}</p>
                    </div>
                  </div>
                  <button onClick={() => window.dispatchEvent(new CustomEvent('openContactModal', { detail: { type: 'individual' } }))} className="shrink-0 self-center rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)' }}>
                    Enquire Now →
                  </button>
                </div>
              </div>

              {/* Desktop: Search + Timezone */}
              <div className="hidden lg:flex items-center gap-2 mb-2">
                <div className="relative flex-1 min-w-0">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input type="text" placeholder="Search courses..."
                    value={search} onChange={e => { setSearch(e.target.value); setPage(0) }}
                    className="w-full rounded-xl pl-9 py-2.5 text-sm outline-none bg-white"
                    style={{ border: '1px solid #CAEFFF', color: '#0F172A', paddingRight: search ? '32px' : '12px' }} />
                  {search && (
                    <button onClick={() => { setSearch(''); setPage(0) }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-6 h-6 transition-all"
                      style={{ color: '#64748B' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  )}
                </div>
                <FilterDropdown label="Timezone" options={['All Timezones', ...TZ_OPTIONS]} value={filterTz} onChange={v => { setFilterTz(v === 'All Timezones' ? '' : v); setPage(0) }} />
              </div>

              {/* Mobile: full-width search */}
              <div className="lg:hidden mb-2">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input type="text" placeholder="Search courses..."
                    value={search} onChange={e => { setSearch(e.target.value); setPage(0) }}
                    className="w-full rounded-xl pl-9 py-2.5 text-sm outline-none bg-white"
                    style={{ border: '1px solid #CAEFFF', color: '#0F172A', paddingRight: search ? '32px' : '12px' }} />
                  {search && (
                    <button onClick={() => { setSearch(''); setPage(0) }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-6 h-6 transition-all"
                      style={{ color: '#64748B' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile: Vendor + Tech + Timezone row */}
              <div className="lg:hidden flex items-center gap-2 mb-2">
                <div className="flex-1 min-w-0"><FilterDropdown label="Vendor" options={['All Vendors', ...ALL_VENDORS]} value={filterVendor} onChange={v => { setFilterVendor(v === 'All Vendors' ? '' : v); setPage(0) }} /></div>
                <div className="flex-1 min-w-0"><FilterDropdown label="All Technologies" options={SIDEBAR_TECHNOLOGIES.map(t => t.label)} value={activeTechs[0] ?? ''} onChange={v => { setActiveTechs(v ? [v] : []); setPage(0) }} /></div>
                <div className="flex-1 min-w-0"><FilterDropdown label="Timezone" options={['All Timezones', ...TZ_OPTIONS]} value={filterTz} onChange={v => { setFilterTz(v === 'All Timezones' ? '' : v); setPage(0) }} /></div>
              </div>
              <div className="lg:hidden mb-3">
                <span className="text-xs font-medium" style={{ color: '#64748B' }}>Showing {filtered.length} course{filtered.length !== 1 ? 's' : ''}</span>
              </div>

              {/* Active filter chips */}
              {(filterVendor || filterTz) && (
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="ml-auto text-xs font-medium" style={{ color: '#64748B' }}>
                    Showing {filtered.length} course{filtered.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}

              {/* Course grid — dark cards on mobile, light on desktop */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginated.length > 0
                  ? paginated.map(c => (
                      <CourseCard key={c.id} course={c}
                        onEnroll={() => {}}
                        onSyllabus={() => { setSyllabusCourseName(`${c.code}: ${c.name}`); setShowSyllabusModal(true) }}
                      />
                    ))
                  : (
                    <div className="col-span-full flex flex-col items-center py-16 rounded-2xl"
                      style={{ background: '#F8FBFE', border: '1px solid #CAEFFF' }}>
                      <svg className="mb-3 opacity-40" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                      <p className="text-sm font-semibold" style={{ color: '#64748B' }}>No courses found</p>
                    </div>
                  )
                }
              </div>

              {/* Pagination */}
              {totalPages > 1 && (() => {
                const WINDOW = 5
                const half = Math.floor(WINDOW / 2)
                let start = Math.max(0, page - half)
                let end   = Math.min(totalPages - 1, start + WINDOW - 1)
                if (end - start < WINDOW - 1) start = Math.max(0, end - WINDOW + 1)
                const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)
                const PageBtn = ({ p }: { p: number }) => (
                  <button onClick={() => setPage(p)}
                    className="w-9 h-9 rounded-full text-sm font-bold transition-all hover:opacity-80"
                    style={page === p
                      ? { background: 'linear-gradient(135deg,#0694D1,#076D9D)', color: 'white', border: 'none', boxShadow: '0 4px 12px rgba(6,148,209,0.35)' }
                      : { border: '1.5px solid #E2E8F0', color: '#64748B', background: 'white' }}>
                    {p + 1}
                  </button>
                )
                return (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                      className="w-11 h-11 rounded-full flex items-center justify-center text-xl font-bold transition-all disabled:opacity-30 hover:bg-[#EBF8FE]"
                      style={{ border: '1.5px solid #CAEFFF', color: '#0694D1', background: 'white' }}>‹</button>
                    {start > 0 && <><PageBtn p={0} /><span className="text-sm" style={{ color: '#94A3B8' }}>…</span></>}
                    {pages.map(p => <PageBtn key={p} p={p} />)}
                    {end < totalPages - 1 && <><span className="text-sm" style={{ color: '#94A3B8' }}>…</span><PageBtn p={totalPages - 1} /></>}
                    <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                      className="w-11 h-11 rounded-full flex items-center justify-center text-xl font-bold transition-all disabled:opacity-30 hover:bg-[#EBF8FE]"
                      style={{ border: '1.5px solid #CAEFFF', color: '#0694D1', background: 'white' }}>›</button>
                  </div>
                )
              })()}
            </div>
          </div>

          </div>{/* end grouped interactive panel */}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 lg:px-[50px]" style={{ background: 'linear-gradient(135deg, #06111E 0%, #093148 100%)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              How Live Online Training{' '}
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Works
              </span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>From enrolment to certification in four simple steps</p>
          </div>
          {/* Mobile: slider */}
          <div className="sm:hidden">
            <div className="overflow-hidden"
              onTouchStart={e => { howTouchStartX.current = e.touches[0].clientX }}
              onTouchEnd={e => {
                const dx = howTouchStartX.current - e.changedTouches[0].clientX
                if (dx > 50)  setHowSlideIdx(p => Math.min(p + 1, HOW_IT_WORKS.length - 1))
                if (dx < -50) setHowSlideIdx(p => Math.max(p - 1, 0))
              }}>
              <div className="flex" style={{ transform: `translateX(-${howSlideIdx * 100}%)`, transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)' }}>
                {HOW_IT_WORKS.map((s, i) => (
                  <div key={s.step} className="ben-card ben-visible shrink-0 w-full" style={{ ['--draw-delay' as string]: '0s' } as React.CSSProperties}>
                    <div className="ben-accent" />
                    <div className="ben-icon-box mb-4">
                      <div className="ben-icon-svg">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>{s.icon}</svg>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white">{s.title}</h3>
                    <div className="ben-divider" />
                    <p className="mb-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.52)' }}>{s.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.map(tag => <span key={tag} className="ben-tag">{tag}</span>)}
                    </div>
                    <div className="ben-ghost" aria-hidden>{s.step}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Dots + Arrows */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <button onClick={() => setHowSlideIdx(p => Math.max(p - 1, 0))}
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                style={{ background: howSlideIdx === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.35)', color: howSlideIdx === 0 ? 'rgba(255,255,255,0.25)' : '#38bdf8' }}
                disabled={howSlideIdx === 0}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div className="flex gap-2">
                {HOW_IT_WORKS.map((_, i) => (
                  <button key={i} onClick={() => setHowSlideIdx(i)}
                    className="rounded-full transition-all duration-300"
                    style={{ width: howSlideIdx === i ? 20 : 7, height: 7, background: howSlideIdx === i ? '#0694D1' : 'rgba(255,255,255,0.22)' }} />
                ))}
              </div>
              <button onClick={() => setHowSlideIdx(p => Math.min(p + 1, HOW_IT_WORKS.length - 1))}
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                style={{ background: howSlideIdx === HOW_IT_WORKS.length - 1 ? 'rgba(255,255,255,0.06)' : 'rgba(6,148,209,0.25)', border: '1px solid rgba(6,148,209,0.35)', color: howSlideIdx === HOW_IT_WORKS.length - 1 ? 'rgba(255,255,255,0.25)' : '#38bdf8' }}
                disabled={howSlideIdx === HOW_IT_WORKS.length - 1}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* Desktop: grid unchanged */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((s, i) => (
              <div key={s.step} className="ben-card"
                style={{ animationDelay: `${i * 0.1}s` }}
                ref={(el) => {
                  if (!el) return
                  const obs = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) { el.classList.add('ben-visible'); obs.disconnect() }
                  }, { threshold: 0.12 })
                  obs.observe(el)
                }}>
                <div className="ben-accent" />
                <div className="ben-icon-box mb-4" style={{ animationDelay: `${i * 0.6}s` }}>
                  <div className="ben-icon-svg" style={{ animationDelay: `${i * 0.4}s`, ['--fy' as string]: `${i % 2 === 0 ? '0px' : '-2px'}`, ['--draw-delay' as string]: `${i * 0.15}s` } as React.CSSProperties}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>{s.icon}</svg>
                  </div>
                </div>
                <h3 className="text-base font-bold text-white">{s.title}</h3>
                <div className="ben-divider" />
                <p className="mb-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.52)' }}>{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(tag => <span key={tag} className="ben-tag">{tag}</span>)}
                </div>
                <div className="ben-ghost" aria-hidden>{s.step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINING CATEGORIES ──────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 lg:px-[50px]" style={{ background: 'linear-gradient(145deg, #06111E 0%, #081d35 60%, #06111E 100%)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
              Popular{' '}
              <span style={{ background: 'linear-gradient(135deg, #0694D1, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Training Categories
              </span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
              5,000+ live online courses across the technologies that matter most in 2026
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(c => (
              <div key={c.name}
                className="group relative flex flex-col gap-3 p-5 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(6,148,209,0.55)'
                  el.style.boxShadow = '0 12px 36px rgba(0,0,0,0.35), 0 0 0 1px rgba(6,148,209,0.3), 0 0 28px rgba(6,148,209,0.15)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(255,255,255,0.08)'
                  el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2)'
                }}>
                {/* Top accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-0 rounded-full pointer-events-none transition-all duration-500 group-hover:w-full"
                  style={{ background: 'linear-gradient(90deg, transparent, #0694D1, #38bdf8, #0694D1, transparent)' }} />
                {/* Icon box */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{ background: 'rgba(6,148,209,0.08)', border: '1px solid rgba(6,148,209,0.28)' }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"
                    style={{ stroke: '#0694D1', transition: 'stroke 0.3s' }}>
                    {c.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-sm leading-snug text-white">{c.name}</h3>
                <p className="text-[11px] leading-snug" style={{ color: 'rgba(255,255,255,0.42)' }}>{c.desc}</p>
                <span className="text-xs font-bold mt-auto" style={{ color: '#0694D1' }}>{c.count} Courses →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS & FAQ (tabbed) ───────────────────────────── */}
      <section className={`relative overflow-hidden py-12 sm:py-16 px-4 lg:px-[50px] sm:bg-white ${activeReviewFaq === 'faq' ? 'bg-koenig-light' : 'bg-white'}`}>
        {/* radial decorations — mobile only, FAQ tab only */}
        {activeReviewFaq === 'faq' && (<>
          <div className="sm:hidden pointer-events-none absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.19) 0%, transparent 70%)' }} />
          <div className="sm:hidden pointer-events-none absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.20) 0%, transparent 70%)' }} />
          <div className="sm:hidden pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.15) 0%, transparent 70%)' }} />
        </>)}

        <div className="mx-auto max-w-7xl">

          {/* Desktop: title ABOVE tabs */}
          <div className="hidden sm:block text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#06111E' }}>
              {activeReviewFaq === 'reviews' ? (
                <>What Our <span style={{ background: 'linear-gradient(135deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Students Say</span></>
              ) : (
                <>Frequently <span style={{ background: 'linear-gradient(135deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Asked Questions</span></>
              )}
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#7a8c96' }}>
              {activeReviewFaq === 'reviews'
                ? '18,400+ verified reviews — 4.9/5 average rating'
                : 'Everything you need to know about Live Online Classroom training with Koenig'}
            </p>
          </div>

          {/* Tab bar */}
          <div className="flex justify-center mb-8">
            <div className="tab-border-glow">
              <div className="inline-flex overflow-hidden rounded-[14px] bg-white p-1.5 shadow-[0_4px_20px_rgba(6,148,209,0.12)]">
                {([
                  { id: 'reviews' as const, label: 'Student Reviews' },
                  { id: 'faq'     as const, label: 'Common Questions'  },
                ]).map(tab => (
                  <button key={tab.id} onClick={() => setActiveReviewFaq(tab.id)}
                    className={`relative whitespace-nowrap rounded-xl font-semibold transition-all duration-[250ms] shrink-0 ${
                      activeReviewFaq === tab.id
                        ? 'px-6 sm:px-8 py-3 text-sm sm:text-base bg-gradient-to-r from-[#0694D1] to-cyan-500 text-white shadow-md shadow-[#0694D1]/30'
                        : 'px-4 sm:px-6 py-2.5 text-sm text-[#7a8c96] hover:text-[#093148]'
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: title BELOW tabs */}
          <div className="sm:hidden text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#06111E' }}>
              {activeReviewFaq === 'reviews' ? (
                <>What Our <span style={{ background: 'linear-gradient(135deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Students Say</span></>
              ) : (
                <>Frequently <span style={{ background: 'linear-gradient(135deg,#0694D1,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Asked Questions</span></>
              )}
            </h2>
            <p className="text-sm" style={{ color: '#7a8c96' }}>
              {activeReviewFaq === 'reviews'
                ? '18,400+ verified reviews — 4.9/5 average rating'
                : 'Everything you need to know about Live Online Classroom training with Koenig'}
            </p>
          </div>

          {/* Reviews panel */}
          {activeReviewFaq === 'reviews' && (
            <>
              <IloMobileMarquee items={TESTIMONIALS} />
              <div className="hidden sm:block relative overflow-hidden"
                style={{
                  height: '520px',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
                }}>
                <div className="grid grid-cols-3 gap-4 h-full">
                  <IloScrollColumn items={TESTIMONIALS.slice(0, 3)} speed={0.030} />
                  <IloScrollColumn items={TESTIMONIALS.slice(3, 6)} speed={0.025} />
                  <IloScrollColumn items={TESTIMONIALS.slice(6, 9)} speed={0.038} />
                </div>
              </div>
            </>
          )}

          {/* FAQ panel */}
          {activeReviewFaq === 'faq' && (
            <>
              {/* Desktop: two-column homepage pattern */}
              <div className="hidden sm:flex gap-3">
                <div className="flex flex-1 flex-col gap-3">
                  {FAQS.filter((_, i) => i % 2 === 0).map((f, j) => {
                    const i = j * 2; const isOpen = openFaq === i
                    return (
                      <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                        <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left">
                          <span className="text-base font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#053148', transition: 'color 0.3s' }}>{f.q}</span>
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                          </span>
                        </button>
                        <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                          <div style={{ overflow: 'hidden' }}>
                            <p className="border-t border-[#EBF8FE] px-6 py-4 text-base leading-relaxed" style={{ color: '#7a8c96' }}>{f.a}</p>
                          </div>
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
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                          </span>
                        </button>
                        <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                          <div style={{ overflow: 'hidden' }}>
                            <p className="border-t border-[#EBF8FE] px-6 py-4 text-base leading-relaxed" style={{ color: '#7a8c96' }}>{f.a}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* Desktop CTA */}
              <div className="hidden sm:block mt-8 text-center">
                <p className="mb-3 text-base" style={{ color: '#7a8c96' }}>Still have questions?</p>
                <button className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-sm font-bold text-[#076D9D] transition-all hover:bg-[#076D9D] hover:text-white">
                  Chat with a Training Advisor
                  <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(7,109,157,0.12)' }}>→</span>
                </button>
              </div>

              {/* Mobile: single column */}
              <div className="sm:hidden flex flex-col gap-3">
                {FAQS.map((f, i) => {
                  const isOpen = openFaq === i
                  return (
                    <div key={i} className="rounded-xl border bg-white" style={{ borderColor: isOpen ? '#0694d1' : '#CAEFFF', boxShadow: isOpen ? '0 4px 16px rgba(6,148,209,0.10)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                      <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left">
                        <span className="text-sm font-semibold leading-snug" style={{ color: isOpen ? '#0694d1' : '#053148', transition: 'color 0.3s' }}>{f.q}</span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: isOpen ? 'linear-gradient(135deg,#0694d1,#076d9d)' : '#EBF8FE', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'white' : '#0694d1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                        </span>
                      </button>
                      <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                        <div style={{ overflow: 'hidden' }}>
                          <p className="border-t border-[#EBF8FE] px-4 py-3 text-sm leading-relaxed" style={{ color: '#7a8c96' }}>{f.a}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* Mobile CTA */}
              <div className="sm:hidden mt-8 text-center">
                <p className="mb-3 text-sm" style={{ color: '#7a8c96' }}>Still have questions?</p>
                <button className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#076D9D] px-7 py-3 text-sm font-bold text-[#076D9D] transition-all hover:bg-[#076D9D] hover:text-white">
                  Chat with a Training Advisor
                  <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: 'rgba(7,109,157,0.12)' }}>→</span>
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── REQUEST INFO FORM ────────────────────────────────── */}
      <div id="request">
        <ContactForm />
      </div>
    </div>
  )
}

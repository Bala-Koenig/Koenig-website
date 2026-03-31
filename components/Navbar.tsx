'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

/* ─── Data ───────────────────────────────────────────────────── */

const ABOUT_LINKS = ['About Us','Our Clientele','Leadership','Our Partners','Happiness Guarantee','Student Feedback','Testimonials','Koenig Koshish','Our Awards']
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

const NAV_TOP_TECHNOLOGIES = [
  { name: 'Cloud Computing',     count: '840+', partners: ['Microsoft', 'AWS', 'Google Cloud'] },
  { name: 'Cybersecurity',       count: '620+', partners: ['EC-Council', 'CompTIA', 'ISC2'] },
  { name: 'Networking',          count: '510+', partners: ['Cisco', 'Juniper', 'CompTIA'] },
  { name: 'Project Management',  count: '390+', partners: ['PMI', 'PeopleCert', 'AXELOS'] },
  { name: 'Data & AI',           count: '280+', partners: ['Microsoft', 'AWS', 'Google Cloud'] },
  { name: 'DevOps',              count: '210+', partners: ['Kubernetes', 'HashiCorp', 'AWS'] },
  { name: 'ERP Systems',         count: '180+', partners: ['SAP', 'Oracle', 'Microsoft'] },
  { name: 'Linux & Open Source', count: '110+', partners: ['Red Hat', 'Linux Foundation', 'CompTIA'] },
]

const NAV_COURSES = [
  { vendor: 'AWS',         name: 'AWS Certified Solutions Architect – Professional',                 days: 5, hot: true,  level: 'Advanced',     category: 'ASSOCIATE'    },
  { vendor: 'Cisco',       name: 'Implementing and Operating Cisco Enterprise Network Core Technologies', days: 5, hot: false, level: 'Advanced', category: 'ASSOCIATE'  },
  { vendor: 'Microsoft',   name: 'Microsoft Azure Administrator',                                    days: 5, hot: true,  level: 'Intermediate', category: 'ASSOCIATE'    },
  { vendor: 'Microsoft',   name: 'Microsoft Azure Fundamentals',                                     days: 3, hot: true,  level: 'Beginner',     category: 'FUNDAMENTALS' },
  { vendor: 'Microsoft',   name: 'Microsoft Azure AI Fundamentals',                                  days: 2, hot: true,  level: 'Beginner',     category: 'FUNDAMENTALS' },
  { vendor: 'Google Cloud',name: 'Google Cloud Professional Data Engineer',                          days: 4, hot: true,  level: 'Advanced',     category: 'EXPERT'       },
  { vendor: 'AWS',         name: 'AWS Certified Machine Learning Engineer – Associate',              days: 4, hot: true,  level: 'Advanced',     category: 'ASSOCIATE'    },
  { vendor: 'Kubernetes',  name: 'Certified Kubernetes Administrator (CKA) Exam Prep',              days: 4, hot: true,  level: 'Advanced',     category: 'EXPERT'       },
  { vendor: 'CompTIA',     name: 'CompTIA Security+ SY0-701',                                       days: 5, hot: true,  level: 'Intermediate', category: 'ASSOCIATE'    },
  { vendor: 'ISC2',        name: 'CISSP – Certified Information Systems Security Professional',     days: 5, hot: true,  level: 'Advanced',     category: 'EXPERT'       },
  { vendor: 'PMI',         name: 'Project Management Professional (PMP) Certification',             days: 4, hot: true,  level: 'Advanced',     category: 'EXPERT'       },
  { vendor: 'Cisco',       name: 'CCNA – Cisco Certified Network Associate',                        days: 5, hot: true,  level: 'Intermediate', category: 'ASSOCIATE'    },
]

/* ─── Navbar Component ───────────────────────────────────────── */

export default function Navbar({ initialQuery = '' }: { initialQuery?: string }) {
  const router = useRouter()

  // Search
  const [navQuery, setNavQuery] = useState(initialQuery)
  const [navResultsOpen, setNavResultsOpen] = useState(false)
  const navSearchRef = useRef<HTMLDivElement>(null)

  // Mobile
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)
  const [mobileAllCoursesOpen, setMobileAllCoursesOpen] = useState(false)
  const [mobileTechOpen, setMobileTechOpen] = useState(false)
  const [mobileLearningOpen, setMobileLearningOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const [mobileMegaVendor, setMobileMegaVendor] = useState(MEGA_MENU_VENDORS[0]?.name ?? '')
  const [mobileTechCategory, setMobileTechCategory] = useState(NAV_TOP_TECHNOLOGIES[0]?.name ?? '')

  // Desktop mega menus
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

  // Scroll
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  function goSearch(q: string) {
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`)
    else router.push('/search')
  }

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 8)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docH > 0 ? (scrollTop / docH) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 z-[200] h-[3px] transition-none" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg,#076D9D,#0694d1,#38bdf8)' }} />

      {/* Contact bar */}
      <div className="hidden md:block px-4 lg:px-[50px]" style={{ background: '#061624' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-1.5 text-[14px] text-white/75">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" style={{ color: '#25D366' }} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.843L0 24l6.305-1.654A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5.007-1.371l-.359-.214-3.742.981.999-3.65-.234-.375A9.818 9.818 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>
              +91-984-072-2417 <span className="ml-0.5 text-white/25">(Chat Only)</span>
            </span>
            <span className="text-white/15">|</span>
            <a href="mailto:info@koenig-solutions.com" className="flex items-center gap-1 transition-colors hover:text-white/80">
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              info@koenig-solutions.com
            </a>
          </div>
          <a
            href="https://mykoenig.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border px-3 py-1 text-xs font-medium transition-colors"
            style={{ borderColor: 'rgba(255,255,255,0.45)', color: '#ffffff' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            Login
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`relative z-50 px-4 lg:px-[50px] ${scrolled ? 'shadow-lg shadow-black/30' : ''}`}
        style={{ background: 'rgba(6,17,30,0.94)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        onClick={e => { if ((e.target as HTMLElement).closest('[data-dropdown]') === null) { /* no-op */ } }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 lg:gap-6 py-2 lg:py-3">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div style={{ background: '#ffffff', borderRadius: '6px', padding: '8px' }}>
              <Image src="/images/koenig-logo.svg" alt="Koenig Solutions" width={120} height={32} className="h-7 w-auto lg:h-8" />
            </div>
          </Link>

          {/* Mobile All Courses button */}
          <button
            onClick={() => { setMobileAllCoursesOpen(v => !v); setMobileOpen(false) }}
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
            <div className="flex items-center" style={{ background: 'linear-gradient(to right, rgba(6,148,209,0.04) 0%, rgba(255,255,255,0.01) 100%)', backdropFilter: 'blur(24px) saturate(200%)', WebkitBackdropFilter: 'blur(24px) saturate(200%)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '50px', padding: '4px', boxShadow: '0 0 20px rgba(6,148,209,0.2), 0 0 40px rgba(6,148,209,0.08), 0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
              {/* All Courses */}
              <button
                onClick={() => { setMegaMenuOpen(v => !v); setTechMenuOpen(false) }}
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
                onClick={e => { e.preventDefault(); setTechMenuOpen(v => !v); setMegaMenuOpen(false); setAboutMenuOpen(false); setLearningMenuOpen(false) }}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                style={{ color: techMenuOpen ? '#38bdf8' : '#ffffff', background: techMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(6,148,209,0.18)' }}
                onMouseLeave={e => { e.currentTarget.style.color = techMenuOpen ? '#38bdf8' : '#ffffff'; e.currentTarget.style.background = techMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
              >
                Technologies
                <svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </a>
              {/* Learning Options */}
              <div className="relative" ref={learningMenuRef}>
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); setLearningMenuOpen(v => !v); setAboutMenuOpen(false); setTechMenuOpen(false); setMegaMenuOpen(false) }}
                  className="flex items-center gap-1 whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                  style={{ color: learningMenuOpen ? '#38bdf8' : '#ffffff', background: learningMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(6,148,209,0.18)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = learningMenuOpen ? '#38bdf8' : '#ffffff'; e.currentTarget.style.background = learningMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
                >
                  Learning Options
                  <svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </a>
                {learningMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 z-[300] rounded-xl shadow-2xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', minWidth: '220px' }}>
                    {LEARNING_LINKS.map(link => (
                      <a
                        key={link}
                        href="#"
                        className="block px-5 py-2.5 text-sm transition-colors"
                        style={{ color: '#374151' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0694D1'; (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.06)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#374151'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                        onClick={() => setLearningMenuOpen(false)}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {/* About */}
              <div className="relative" ref={aboutMenuRef}>
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); setAboutMenuOpen(v => !v); setTechMenuOpen(false); setMegaMenuOpen(false); setLearningMenuOpen(false) }}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                  style={{ color: aboutMenuOpen ? '#38bdf8' : '#ffffff', background: aboutMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(6,148,209,0.18)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = aboutMenuOpen ? '#38bdf8' : '#ffffff'; e.currentTarget.style.background = aboutMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
                >
                  About
                  <svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </a>
                {aboutMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 z-[300] rounded-xl shadow-2xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', minWidth: '220px' }}>
                    {ABOUT_LINKS.map(link => (
                      <a
                        key={link}
                        href="#"
                        className="block px-5 py-2.5 text-sm transition-colors"
                        style={{ color: '#374151' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0694D1'; (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.06)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#374151'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                        onClick={() => setAboutMenuOpen(false)}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {/* Contact */}
              <a
                href="#"
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                style={{ color: '#ffffff', background: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(6,148,209,0.18)' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'transparent' }}
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
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#38bdf8'; (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.15)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                Enterprise
              </Link>
            </div>
            {/* Desktop search */}
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
                    onClick={() => { setNavQuery(''); setNavResultsOpen(false) }}
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
                    const results = NAV_COURSES.filter(c =>
                      c.name.toLowerCase().includes(navQuery.toLowerCase()) ||
                      c.vendor.toLowerCase().includes(navQuery.toLowerCase())
                    ).slice(0, 6)
                    return results.length > 0 ? results.map((c, i) => (
                      <div key={i} onClick={() => goSearch(c.name)} className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50 last:border-0">
                        <div className="min-w-0 flex-1">
                          <div className="mb-0.5 flex items-center gap-1">
                            {c.hot && <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-600">Popular</span>}
                          </div>
                          <p className="truncate text-sm font-medium text-gray-800">{c.name}</p>
                          <p className="mt-0.5 text-xs text-gray-500">{c.vendor} · {c.days} days</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          {c.category === 'FUNDAMENTALS' && <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-cyan-50 text-cyan-600">Fundamentals</span>}
                          {c.category === 'ASSOCIATE' && <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-600">Associate</span>}
                          {c.category === 'EXPERT' && <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-violet-50 text-violet-600">Expert</span>}
                        </div>
                      </div>
                    )) : <div className="px-4 py-3 text-sm text-gray-500">No courses found for &ldquo;{navQuery}&rdquo;</div>
                  })()}
                  <div onClick={() => goSearch(navQuery)} className="flex cursor-pointer items-center justify-center gap-1 border-t border-gray-100 px-4 py-2.5 text-xs font-semibold text-[#0694d1] hover:bg-gray-50">
                    View all results →
                  </div>
                </div>
              )}
            </div>
            {/* Mobile search icon */}
            <button
              onClick={() => { setMobileSearchOpen(true); setMobileOpen(false); setTimeout(() => mobileSearchInputRef.current?.focus(), 50) }}
              className="rounded-lg p-2 transition-colors hover:bg-white/10 lg:hidden"
              style={{ color: '#ffffff' }}
              aria-label="Search"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
            {/* Hamburger */}
            <button
              onClick={() => { setMobileOpen(v => !v); setMobileAllCoursesOpen(false) }}
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
                onChange={e => { setNavQuery(e.target.value); setNavResultsOpen(true) }}
                onFocus={() => setNavResultsOpen(true)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); goSearch(navQuery) } }}
                placeholder="Search 5,000+ courses…"
                aria-label="Search courses"
                className="flex-1 bg-transparent text-sm text-white placeholder-white/50 outline-none"
              />
              <button
                onClick={() => { setMobileSearchOpen(false); setNavQuery(''); setNavResultsOpen(false) }}
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
                  const results = NAV_COURSES.filter(c =>
                    c.name.toLowerCase().includes(navQuery.toLowerCase()) ||
                    c.vendor.toLowerCase().includes(navQuery.toLowerCase())
                  ).slice(0, 5)
                  return results.length > 0 ? results.map((c, i) => (
                    <div key={i} onClick={() => { goSearch(c.name); setMobileSearchOpen(false) }} className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50 last:border-0">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-800">{c.name}</p>
                        <p className="mt-0.5 text-xs text-gray-500">{c.vendor} · {c.days} days</p>
                      </div>
                    </div>
                  )) : <div className="px-4 py-3 text-sm text-gray-500">No courses found for &ldquo;{navQuery}&rdquo;</div>
                })()}
                <div onClick={() => { goSearch(navQuery); setMobileSearchOpen(false) }} className="flex cursor-pointer items-center justify-center gap-1 border-t border-gray-100 px-4 py-2.5 text-xs font-semibold text-[#0694d1] hover:bg-gray-50">
                  View all results →
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile All Courses panel */}
        {mobileAllCoursesOpen && (
          <div className="-mx-4 border-t lg:hidden" style={{ background: '#061624', borderColor: 'rgba(6,148,209,0.2)', maxHeight: '70vh', overflowY: 'auto' }}>
            <div className="px-4 py-3">
              <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(6,148,209,0.06)', border: '1px solid rgba(6,148,209,0.15)' }}>
                <div className="flex overflow-x-auto gap-1 p-2 border-b" style={{ borderColor: 'rgba(6,148,209,0.15)' }}>
                  {MEGA_MENU_VENDORS.map(v => (
                    <button
                      key={v.name}
                      onClick={() => setMobileMegaVendor(v.name)}
                      className="shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                      style={{ background: mobileMegaVendor === v.name ? '#0694D1' : 'rgba(255,255,255,0.06)', color: mobileMegaVendor === v.name ? '#fff' : 'rgba(255,255,255,0.65)' }}
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
                    <div className="flex overflow-x-auto gap-1 p-2 border-b" style={{ borderColor: 'rgba(6,148,209,0.15)' }}>
                      {NAV_TOP_TECHNOLOGIES.map(t => (
                        <button
                          key={t.name}
                          onClick={() => setMobileTechCategory(t.name)}
                          className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                          style={{ background: mobileTechCategory === t.name ? '#0694D1' : 'rgba(255,255,255,0.06)', color: mobileTechCategory === t.name ? '#fff' : 'rgba(255,255,255,0.65)' }}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                    <div className="p-3 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(6,148,209,0.8)' }}>
                        {NAV_TOP_TECHNOLOGIES.find(t => t.name === mobileTechCategory)?.count} courses · Partners: {NAV_TOP_TECHNOLOGIES.find(t => t.name === mobileTechCategory)?.partners.join(', ')}
                      </p>
                      {(TECH_MENU_COURSES[mobileTechCategory] ?? []).map((course, i) => (
                        <a key={i} href="#" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.85)' }}>
                          <span>{course.name}</span>
                          <span className="text-xs" style={{ color: 'rgba(6,148,209,0.8)' }}>{course.days}d</span>
                        </a>
                      ))}
                      <a
                        href="#"
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
                      <a key={link} href="#" className="block px-5 py-2.5 text-sm transition-colors hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.8)' }}>{link}</a>
                    ))}
                  </div>
                )}
              </div>
              {/* Contact */}
              <a href="#" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5">Contact</a>
              {/* Bottom actions */}
              <div className="flex gap-2 pt-2 pb-1">
                <a href="https://mykoenig.com" target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg border border-white/30 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10">Login</a>
              </div>
            </div>
          </div>
        )}

        {/* All Courses Mega Menu */}
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
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.35)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.15)' }}
                  >
                    <p className="text-sm font-medium leading-snug text-white group-hover:text-[#38bdf8] transition-colors line-clamp-2">{course.name}</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="flex items-center gap-1 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        {course.days} days
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-sm font-semibold ${course.level === 'Beginner' ? 'bg-[#0694d1]/20 text-[#3AB6EB]' : course.level === 'Intermediate' ? 'bg-[#076d9d]/20 text-[#6CCFEE]' : 'bg-[#076d9d] text-white'}`}>{course.level}</span>
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

        {/* Technologies Mega Menu */}
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
                const t = NAV_TOP_TECHNOLOGIES.find(x => x.name === name)!
                return (
                  <button
                    key={name}
                    onMouseEnter={() => setTechMenuCategory(name)}
                    onClick={() => setTechMenuCategory(name)}
                    className="flex items-center gap-3 px-4 py-2.5 text-left transition-all"
                    style={{ background: techMenuCategory === name ? 'rgba(6,148,209,0.12)' : 'transparent', borderLeft: techMenuCategory === name ? '2px solid #0694D1' : '2px solid transparent', color: techMenuCategory === name ? '#ffffff' : 'rgba(255,255,255,0.65)' }}
                  >
                    <svg className="h-4 w-4 shrink-0" style={{ color: techMenuCategory === name ? '#38bdf8' : 'rgba(6,148,209,0.6)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">{icon}</svg>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium leading-tight">{name}</div>
                      <div className="text-sm" style={{ color: 'rgba(6,148,209,0.7)' }}>{t?.count} Courses</div>
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
                    {NAV_TOP_TECHNOLOGIES.find(t => t.name === techMenuCategory)?.count} courses · Partners: {NAV_TOP_TECHNOLOGIES.find(t => t.name === techMenuCategory)?.partners.join(', ')}
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
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.35)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.15)' }}
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
    </>
  )
}

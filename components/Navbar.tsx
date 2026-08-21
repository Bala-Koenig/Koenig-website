'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

/* ─── Data ───────────────────────────────────────────────────── */

const ABOUT_LINKS: { label: string; href: string }[] = [
  { label: 'About Us',            href: '/about' },
  { label: 'Our Clients',         href: '/about/our-clients' },
  { label: 'Our Partners',        href: '/about/our-partners' },
  { label: 'Our Awards',          href: '/about/awards' },
  { label: 'Happiness Guarantee', href: '/about/happiness-guarantee' },
  { label: 'Student Feedback',    href: '/about/student-feedback' },
]
const LEARNING_LINKS: { label: string; href: string }[] = [
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

const NAV_TOP_TECHNOLOGIES = [
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
  { vendor: 'SAP',         name: 'SAP S/4HANA Functional Consultant',                                days: 5, hot: true,  level: 'Advanced',     category: 'EXPERT'       },
  { vendor: 'Red Hat',     name: 'RHCSA – Red Hat Certified System Administrator',                  days: 5, hot: true,  level: 'Intermediate', category: 'ASSOCIATE'    },
  { vendor: 'VMware',      name: 'vSphere: Install, Configure, Manage',                              days: 5, hot: true,  level: 'Intermediate', category: 'ASSOCIATE'    },
  { vendor: 'EC-Council',  name: 'Certified Ethical Hacker (CEH v13)',                                days: 5, hot: true,  level: 'Intermediate', category: 'ASSOCIATE'    },
]

/* ─── Vendor & Course page URLs ─────────────────────────────── */

const VENDOR_HREFS: Record<string, string> = {
  'Microsoft': '/microsoft',
}

const COURSE_HREFS: Record<string, string> = {
  'AZ-104: Microsoft Azure Administrator': '/courses/az-104',
}

const TECH_HREFS: Record<string, string> = {
  'Power Platform': '/technologies/power-platform',
}

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
  const [megaMenuVendor, setMegaMenuVendor] = useState('All Courses')
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const [techMenuOpen, setTechMenuOpen] = useState(false)
  const [techMenuCategory, setTechMenuCategory] = useState('Cloud Computing')
  const techMenuRef = useRef<HTMLDivElement>(null)
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false)
  const aboutMenuRef = useRef<HTMLDivElement>(null)
  const aboutTriggerRef = useRef<HTMLButtonElement>(null)
  const [aboutDropPos, setAboutDropPos] = useState({ top: 0, left: 0 })
  const [learningMenuOpen, setLearningMenuOpen] = useState(false)
  const learningMenuRef = useRef<HTMLDivElement>(null)
  const learningTriggerRef = useRef<HTMLButtonElement>(null)
  const [learningDropPos, setLearningDropPos] = useState({ top: 0, left: 0 })

  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Portal mount guard (createPortal needs document.body)
  const [mounted, setMounted] = useState(false)

  // Scroll
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  function goSearch(q: string) {
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`)
    else router.push('/search')
  }

  function clearHoverTimer() {
    if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null }
  }
  function startCloseTimer() {
    clearHoverTimer()
    hoverTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(false); setTechMenuOpen(false); setLearningMenuOpen(false); setAboutMenuOpen(false)
    }, 150)
  }
  function openMenu(which: 'mega' | 'tech' | 'learning' | 'about') {
    clearHoverTimer()
    setMegaMenuOpen(which === 'mega')
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

  useEffect(() => {
    setMounted(true)
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
      const insideAbout = aboutMenuRef.current?.contains(e.target as Node) || aboutTriggerRef.current?.contains(e.target as Node)
      if (!insideAbout) setAboutMenuOpen(false)
      const insideLearning = learningMenuRef.current?.contains(e.target as Node) || learningTriggerRef.current?.contains(e.target as Node)
      if (!insideLearning) setLearningMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 z-[200] h-[3px] transition-none" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg,#076D9D,#0694d1,#38bdf8)' }} />

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
            className="nav-mobile-allcourses flex lg:hidden items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-sm font-semibold transition-all shrink-0 ml-3"
            style={{ color: '#ffffff', background: mobileAllCoursesOpen ? '#076D9D' : '#0694D1', border: 'none' }}
            aria-label="All Courses"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            <span className="nav-mobile-allcourses-label whitespace-nowrap">All Courses</span>
            <svg className={`h-3 w-3 transition-transform ${mobileAllCoursesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
          </button>
          <style>{`
            @media (max-width: 359px) {
              .nav-mobile-allcourses { margin-left: 6px; padding-left: 8px; padding-right: 8px; gap: 4px; }
              .nav-mobile-allcourses-label { display: none; }
            }
          `}</style>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-4 lg:flex">
            <div className="flex items-center" style={{ background: 'linear-gradient(to right, rgba(6,148,209,0.04) 0%, rgba(255,255,255,0.01) 100%)', backdropFilter: 'blur(24px) saturate(200%)', WebkitBackdropFilter: 'blur(24px) saturate(200%)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '50px', padding: '4px', boxShadow: '0 0 20px rgba(6,148,209,0.2), 0 0 40px rgba(6,148,209,0.08), 0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
              {/* All Courses */}
              <button
                onMouseEnter={() => openMenu('mega')}
                onMouseLeave={startCloseTimer}
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
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                style={{ color: techMenuOpen ? '#38bdf8' : '#ffffff', background: techMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
                onMouseEnter={e => { openMenu('tech'); e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(6,148,209,0.18)' }}
                onMouseLeave={e => { startCloseTimer(); e.currentTarget.style.color = techMenuOpen ? '#38bdf8' : '#ffffff'; e.currentTarget.style.background = techMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
              >
                Technologies
                <svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </a>
              {/* Learning Options */}
              <button
                type="button"
                ref={learningTriggerRef}
                className="flex items-center gap-1 whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                style={{ color: learningMenuOpen ? '#38bdf8' : '#ffffff', background: learningMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => { openMenu('learning'); e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(6,148,209,0.18)' }}
                onMouseLeave={e => { startCloseTimer(); e.currentTarget.style.color = learningMenuOpen ? '#38bdf8' : '#ffffff'; e.currentTarget.style.background = learningMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
              >
                Learning Options
                <svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              {/* About */}
              <button
                type="button"
                ref={aboutTriggerRef}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-[40px] transition-all"
                style={{ color: aboutMenuOpen ? '#38bdf8' : '#ffffff', background: aboutMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => { openMenu('about'); e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(6,148,209,0.18)' }}
                onMouseLeave={e => { startCloseTimer(); e.currentTarget.style.color = aboutMenuOpen ? '#38bdf8' : '#ffffff'; e.currentTarget.style.background = aboutMenuOpen ? 'rgba(6,148,209,0.18)' : 'transparent' }}
              >
                About
                <svg className="h-3 w-3 opacity-50 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              {/* Contact */}
              <a
                href="/contact"
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
              <Link
                href="/"
                className="rounded-lg px-3 py-1.5 text-sm font-normal text-white"
                style={{ background: '#0694D1', boxShadow: '0 0 10px rgba(6,148,209,0.40)' }}
              >
                Individual
              </Link>
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
                            {c.hot && <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: 'rgba(6,148,209,0.1)', color: '#0694D1' }}>Popular</span>}
                          </div>
                          <p className="truncate text-sm font-medium text-gray-800">{c.name}</p>
                          <p className="mt-0.5 text-xs text-gray-500">{c.vendor} · {c.days} days</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          {c.category === 'FUNDAMENTALS' && <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-[#0694d1]/10 text-[#0694D1]">Fundamentals</span>}
                          {c.category === 'ASSOCIATE' && <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-[#076d9d]/15 text-[#076D9D]">Associate</span>}
                          {c.category === 'EXPERT' && <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-[#093148]/10 text-[#093148]">Expert</span>}
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
                      {v.name}
                    </button>
                  ))}
                </div>
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
                <Link href="/" className="flex-1 rounded-lg px-3 py-2 text-center text-sm font-normal text-white" style={{ background: '#0694D1', boxShadow: '0 0 10px rgba(6,148,209,0.40)' }}>Individual</Link>
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
                          onClick={() => { if (TECH_HREFS[t.name]) { router.push(TECH_HREFS[t.name]); setMobileTechOpen(false); setMobileOpen(false) } else { setMobileTechCategory(t.name) } }}
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
                        href={TECH_HREFS[mobileTechCategory] ?? '#'}
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
                      <Link key={link.label} href={link.href} className="block px-5 py-2.5 text-sm transition-colors hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.8)' }} onClick={() => { setMobileLearningOpen(false); setMobileOpen(false) }}>{link.label}</Link>
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
                      <Link key={link.label} href={link.href} className="block px-5 py-2.5 text-sm transition-colors hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.8)' }} onClick={() => { setMobileAboutOpen(false); setMobileOpen(false) }}>{link.label}</Link>
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

        {/* All Courses Mega Menu */}
        {megaMenuOpen && (
          <div
            ref={megaMenuRef}
            onMouseEnter={clearHoverTimer}
            onMouseLeave={startCloseTimer}
            className="absolute left-0 right-0 top-full z-[200] flex overflow-hidden"
            style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderTop: 'none', boxShadow: '0 24px 60px rgba(0,0,0,0.18)', maxHeight: '520px' }}
          >
            {/* Left — vendor list */}
            <div className="flex w-52 shrink-0 flex-col overflow-y-auto border-r" style={{ borderColor: 'rgba(6,148,209,0.15)', background: '#F8FBFE' }}>
              <div className="px-4 py-3 text-sm font-semibold uppercase tracking-widest" style={{ color: '#0694D1' }}>Vendors</div>
              {/* All Courses entry */}
              <div className="group/vendor relative flex items-center border-b" style={{ borderLeftWidth: '2px', borderLeftStyle: 'solid', borderLeftColor: megaMenuVendor === 'All Courses' ? '#0694D1' : 'transparent', borderBottomColor: 'rgba(6,148,209,0.1)', background: megaMenuVendor === 'All Courses' ? 'rgba(6,148,209,0.1)' : 'transparent' }}>
                <a href="/corporate-it-training-courses"
                  onMouseEnter={() => setMegaMenuVendor('All Courses')}
                  className="flex flex-1 items-center gap-3 px-4 py-2.5 text-left transition-all"
                  style={{ color: megaMenuVendor === 'All Courses' ? '#0694D1' : '#093148' }}
                >
                  <div className="flex h-9 w-[52px] shrink-0 items-center justify-center overflow-hidden rounded" style={{ background: 'rgba(6,148,209,0.12)', border: '1px solid rgba(6,148,209,0.3)' }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium leading-tight">All Courses</div>
                  </div>
                </a>
              </div>
              {MEGA_MENU_VENDORS.map(v => (
                <div key={v.name} className="group/vendor relative flex items-center border-b" style={{ borderLeftWidth: '2px', borderLeftStyle: 'solid', borderLeftColor: megaMenuVendor === v.name ? '#0694D1' : 'transparent', borderBottomColor: 'rgba(6,148,209,0.1)', background: megaMenuVendor === v.name ? 'rgba(6,148,209,0.1)' : 'transparent' }}>
                  <button
                    onMouseEnter={() => setMegaMenuVendor(v.name)}
                    onClick={() => setMegaMenuVendor(v.name)}
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
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium leading-tight">{v.name}</div>
                    </div>
                  </button>
                  <a
                    href={VENDOR_HREFS[v.name] ?? '#'}
                    title={`View all ${v.name} courses`}
                    className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-md opacity-0 transition-all group-hover/vendor:opacity-100 hover:!opacity-100"
                    style={{ color: '#0694D1', background: 'rgba(6,148,209,0.12)' }}
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </a>
                </div>
              ))}
            </div>
            {/* Right — courses panel */}
            <div className="flex flex-1 flex-col overflow-y-auto p-6">
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
                    {NAV_COURSES.filter(c => c.hot).map((course, i) => (
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
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                {(MEGA_MENU_COURSES[megaMenuVendor] ?? []).map((course, i) => (
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
              <div className="mt-5 flex items-center justify-end gap-3 border-t pt-4" style={{ borderColor: 'rgba(6,148,209,0.15)' }}>
                <a href={VENDOR_HREFS[megaMenuVendor] ?? '#'} className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90" style={{ background: '#0694D1' }}>
                  Browse All {megaMenuVendor} Courses →
                </a>
              </div>
              </>
              )}
            </div>
          </div>
        )}

        {/* Learning Options + About dropdowns are portalled to document.body to fully escape
            the nav-pill backdrop-filter stacking/containing-block context */}

        {/* Technologies Mega Menu */}
        {techMenuOpen && (
          <div
            ref={techMenuRef}
            onMouseEnter={clearHoverTimer}
            onMouseLeave={startCloseTimer}
            className="absolute left-0 right-0 top-full z-[200] flex overflow-hidden"
            style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderTop: 'none', boxShadow: '0 24px 60px rgba(0,0,0,0.18)', maxHeight: '520px' }}
          >
            {/* Left — technology categories */}
            <div className="flex w-52 shrink-0 flex-col overflow-y-auto border-r" style={{ borderColor: 'rgba(6,148,209,0.15)', background: '#F8FBFE' }}>
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
                const t = NAV_TOP_TECHNOLOGIES.find(x => x.name === name)!
                return (
                  <button
                    key={name}
                    onMouseEnter={() => setTechMenuCategory(name)}
                    onClick={() => { if (TECH_HREFS[name]) { router.push(TECH_HREFS[name]); setTechMenuOpen(false) } else { setTechMenuCategory(name) } }}
                    className="flex items-center gap-3 px-4 py-2.5 text-left transition-all border-b"
                    style={{ background: techMenuCategory === name ? 'rgba(6,148,209,0.1)' : 'transparent', borderLeftWidth: '2px', borderLeftStyle: 'solid', borderLeftColor: techMenuCategory === name ? '#0694D1' : 'transparent', borderBottomColor: 'rgba(6,148,209,0.1)', color: techMenuCategory === name ? '#0694D1' : '#093148' }}
                  >
                    <svg className="h-4 w-4 shrink-0" style={{ color: techMenuCategory === name ? '#0694D1' : '#093148' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">{icon}</svg>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium leading-tight">{name}</div>
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
                  <h3 className="text-base font-bold" style={{ color: '#093148' }}>{techMenuCategory}</h3>
                  <p className="text-sm" style={{ color: '#7a8c96' }}>
                    {NAV_TOP_TECHNOLOGIES.find(t => t.name === techMenuCategory)?.count} courses · Partners: {NAV_TOP_TECHNOLOGIES.find(t => t.name === techMenuCategory)?.partners.join(', ')}
                  </p>
                </div>
                <a href={TECH_HREFS[techMenuCategory] ?? '#'} className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#076D9D]" style={{ color: '#0694D1' }}>
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
                    style={{ background: '#F8FBFE', border: '1px solid #CAEFFF' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(6,148,209,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,148,209,0.4)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F8FBFE'; (e.currentTarget as HTMLElement).style.borderColor = '#CAEFFF' }}
                  >
                    <p className="text-sm font-medium leading-snug group-hover:text-[#0694D1] transition-colors line-clamp-2" style={{ color: '#093148' }}>{course.name}</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-sm" style={{ color: '#0694D1' }}>{course.vendor}</span>
                      <span className="text-sm" style={{ color: '#CBD5E1' }}>·</span>
                      <span className="flex items-center gap-1 text-sm" style={{ color: '#7a8c96' }}>
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        {course.days * 8}h ({course.days}d)
                      </span>
                      <span className={`ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-medium ${course.level === 'Beginner' ? 'bg-[#0694d1]/10 text-[#0694D1]' : course.level === 'Intermediate' ? 'bg-[#076d9d]/15 text-[#076D9D]' : 'bg-[#093148]/10 text-[#093148]'}`}>{course.level}</span>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t pt-4" style={{ borderColor: 'rgba(6,148,209,0.15)' }}>
                <span className="text-sm" style={{ color: '#7a8c96' }}>Showing top courses for {techMenuCategory}</span>
                <a href={TECH_HREFS[techMenuCategory] ?? '#'} className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90" style={{ background: '#0694D1' }}>
                  Browse All {techMenuCategory} Courses →
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Portalled dropdowns — rendered directly in document.body so backdrop-filter
          on the nav pill cannot affect their containing block or stacking context */}
      {mounted && learningMenuOpen && createPortal(
        <div
          ref={learningMenuRef}
          onMouseEnter={clearHoverTimer}
          onMouseLeave={startCloseTimer}
          className="fixed z-[9999] rounded-xl shadow-2xl overflow-y-auto"
          style={{ top: `${learningDropPos.top}px`, left: `${learningDropPos.left}px`, background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', width: '380px', maxHeight: `calc(100vh - ${learningDropPos.top}px - 16px)`, padding: '6px' }}
        >
          {(() => {
            const linkBtn = (link: { label: string; href: string }, bold?: boolean) => (
              <button
                key={link.label}
                type="button"
                className="block w-full text-left rounded-lg px-3 py-2 text-[13px] transition-colors"
                style={{ color: '#374151', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: bold ? 700 : 400 }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0694D1'; e.currentTarget.style.background = 'rgba(6,148,209,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = 'transparent' }}
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

      {mounted && aboutMenuOpen && createPortal(
        <div
          ref={aboutMenuRef}
          onMouseEnter={clearHoverTimer}
          onMouseLeave={startCloseTimer}
          className="fixed z-[9999] rounded-xl shadow-2xl overflow-hidden"
          style={{ top: `${aboutDropPos.top}px`, left: `${aboutDropPos.left}px`, background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', minWidth: '220px' }}
        >
          {ABOUT_LINKS.map(link => (
            <button
              key={link.label}
              type="button"
              className="block w-full text-left px-5 py-2.5 text-sm transition-colors"
              style={{ color: '#374151', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0694D1'; e.currentTarget.style.background = 'rgba(6,148,209,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = 'transparent' }}
              onClick={() => { setAboutMenuOpen(false); if (link.href !== '#') router.push(link.href) }}
            >
              {link.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}

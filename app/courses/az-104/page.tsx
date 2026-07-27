import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { CourseScheduler } from "./components/course-scheduler";
import { PricingCard } from "./components/pricing-card";
import { StickyInfoTabs } from "./components/sticky-info-tabs";
import { StickyCourseNav } from "./components/sticky-course-nav";
import { CourseFaq } from "./components/course-faq";
import { CourseResources } from "./components/course-resources";
import { RequestInfoForm } from "./components/request-info-form";
import { RequestInfoModal } from "./components/request-info-modal";
import { CorporateQuoteModal } from "./components/corporate-quote-modal";
import { WhatsIncludedCarousel } from "./components/whats-included-carousel";
import { ReadMore } from "./components/read-more";
import { CourseTestimonials } from "./components/course-testimonials";
import { RelatedCourses } from "./components/related-courses";
import { BannerReadMore } from "./components/banner-read-more";
import { ScrollToTop } from "./components/scroll-to-top";
import Link from "next/link";
import { UserCog } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Course Data                                                        */
/* ------------------------------------------------------------------ */

const course = {
  title: "AZ-104: Microsoft Azure Administrator",
  vendor: "Microsoft",
  technology: "Cloud Computing",
  level: "Associate",
  duration: "32 Hours (4 Days)",
  format: "Live Online / Classroom",
  price: "INR 1,295",
  oneOnOnePrice: "INR 1,995",
  selfPacedPrice: "INR 495",
  enrolled: "44,776",
  rating: 4.8,
  reviews: 2340,
  guaranteed: true,
  code: "AZ-104",
  nextDates: [
    { date: "Mar 3 - Mar 7, 2026", format: "Online", mode: "Public Batch", seats: 8, price: "$1,295" },
    { date: "Mar 17 - Mar 21, 2026", format: "Classroom (Delhi)", mode: "Public Batch", seats: 12, price: "$1,295" },
    { date: "Mar 24 - Mar 28, 2026", format: "Online", mode: "Public Batch", seats: 15, price: "$1,295" },
    { date: "Apr 7 - Apr 11, 2026", format: "Classroom (Goa)", mode: "Classroom", seats: 10, price: "$1,495" },
    { date: "Any date", format: "Online / In-person", mode: "1-on-1", seats: 1, price: "$1,995" },
    { date: "Start anytime", format: "Recorded Sessions", mode: "Self-Paced", seats: 999, price: "$495" },
  ],
  objectives: [
    "Manage Azure identities and governance",
    "Implement and manage storage solutions",
    "Deploy and manage Azure compute resources",
    "Configure and manage virtual networking",
    "Monitor and maintain Azure resources",
    "Implement backup and recovery solutions",
  ],
  prerequisites: [
    "Understanding of on-premises virtualization technologies",
    "Networking fundamentals (TCP/IP, DNS, VPNs)",
    "Basic PowerShell or Azure CLI experience",
    "Familiarity with Azure portal navigation",
  ],
  syllabus: [
    {
      day: "Day 1",
      title: "Identity & Governance",
      topics: [
        "Manage Azure Active Directory users and groups",
        "Configure Azure AD roles and custom roles",
        "Manage Azure subscriptions and RBAC",
        "Implement and manage Azure Policy",
        "Configure management groups and resource locks",
        "Lab: Configure Azure AD and RBAC assignments",
      ],
    },
    {
      day: "Day 2",
      title: "Storage & Compute",
      topics: [
        "Create and configure storage accounts",
        "Manage blob storage, tiers, and lifecycle",
        "Configure Azure Files and Azure File Sync",
        "Implement storage security and SAS tokens",
        "Deploy and manage virtual machines",
        "Lab: Configure storage accounts and VM deployment",
      ],
    },
    {
      day: "Day 3",
      title: "Networking",
      topics: [
        "Create and configure virtual networks and subnets",
        "Configure network security groups and ASGs",
        "Implement Azure DNS (public and private zones)",
        "Configure Azure Load Balancer and Application Gateway",
        "Set up VNet peering and VPN Gateway",
        "Lab: Implement virtual networking and load balancing",
      ],
    },
    {
      day: "Day 4",
      title: "Monitoring & Backup",
      topics: [
        "Configure Azure Monitor and metrics",
        "Create and manage Log Analytics workspaces",
        "Set up alerts, action groups, and alert rules",
        "Implement Azure Backup for VMs and files",
        "Configure Azure Site Recovery for disaster recovery",
        "Lab: Configure monitoring dashboards and backup policies",
      ],
    },
  ],
  faqs: [
    { q: "Is the exam included in the training price?", a: "The exam voucher is available as an add-on for $165. Ask your training advisor for bundle pricing that includes the exam voucher at a discounted rate." },
    { q: "What's the difference between 1-on-1 and Public Batch?", a: "1-on-1 training gives you a dedicated instructor who can customize the pace and topics to your needs. Public Batch is a group class with 8-15 participants and a fixed schedule." },
    { q: "Do I get lab access?", a: "Yes, all formats include hands-on lab access for the duration of training plus 30 days post-training so you can continue practicing." },
    { q: "What if I need to reschedule?", a: "You can reschedule up to 7 days before the start date at no additional cost. Rescheduling within 7 days may incur a $50 admin fee." },
    { q: "What is the exam format for AZ-104?", a: "The AZ-104 exam consists of 40-60 questions including multiple choice, drag-and-drop, case studies, and hands-on lab scenarios. You have 2 hours to complete it." },
    { q: "How long is the certification valid?", a: "The AZ-104 certification is valid for 1 year. Microsoft requires an annual renewal assessment, which is free and available on Microsoft Learn." },
    { q: "Do you provide study materials?", a: "Yes, all participants receive official Microsoft courseware, practice test questions, exam preparation guides, and access to supplementary learning resources." },
    { q: "What if I need extra time to complete the course?", a: "For 1-on-1 training, your instructor can adjust the pace. For public batches, you get 30 days of post-training lab access and recordings to review at your own pace." },
    { q: "Is there post-training support?", a: "Yes, all formats include 30 days of post-training email support from your instructor. You can ask questions about course topics and exam preparation." },
    { q: "Can I switch formats after enrollment?", a: "Yes, you can switch between formats up to 7 days before your scheduled start date. Any price difference will be adjusted accordingly." },
  ],
  instructor: {
    name: "Rajesh K.",
    title: "Microsoft Certified Trainer (MCT)",
    experience: "15+ years in Azure & cloud infrastructure",
    certifications: [
      "Azure Solutions Architect Expert",
      "Azure Administrator Associate",
      "Azure DevOps Engineer Expert",
    ],
    rating: 4.9,
    sessionsDelivered: 1200,
    specializations: ["Azure Administration", "Cloud Migration", "Infrastructure as Code", "Hybrid Cloud"],
    bio: "Rajesh is a seasoned cloud architect and Microsoft Certified Trainer with over 15 years of experience helping organizations migrate to and optimize their Azure environments. He has trained over 12,000 IT professionals across 40+ countries and is known for his practical, real-world approach to teaching complex cloud concepts. When not training, Rajesh consults for Fortune 500 companies on large-scale Azure deployments.",
  },
};

const tabs = ["Overview", "Schedule", "Curriculum", "Instructor", "Reviews", "FAQs", "Related"];

const skills = [
  { name: "Azure AD", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { name: "Virtual Machines", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg> },
  { name: "Storage Accounts", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> },
  { name: "Virtual Networking", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><path d="M5 8v4h14V8"/><path d="M12 12v4"/></svg> },
  { name: "Azure Monitor", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { name: "Azure Backup", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { name: "RBAC", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
  { name: "ARM Templates", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { name: "Network Security Groups", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> },
  { name: "Load Balancer", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="3" x2="12" y2="8"/><path d="M3 12h18"/><path d="M6 8l-3 4 3 4"/><path d="M18 8l3 4-3 4"/><line x1="7" y1="16" x2="7" y2="21"/><line x1="17" y1="16" x2="17" y2="21"/></svg> },
  { name: "Azure DNS", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { name: "Azure Policy", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { name: "Resource Locks", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg> },
  { name: "Azure Files", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg> },
  { name: "Site Recovery", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.92"/></svg> },
  { name: "Log Analytics", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
];

const labs = [
  { name: "Deploy a Virtual Machine", duration: "45 min", description: "Provision, configure, and connect to a Windows and Linux VM with managed disks and network interfaces.", tools: "Azure Portal, Azure CLI" },
  { name: "Configure Azure AD", duration: "30 min", description: "Create users, groups, and role assignments. Implement conditional access policies and MFA configuration.", tools: "Azure AD Portal, PowerShell" },
  { name: "Create a Virtual Network", duration: "40 min", description: "Design a multi-subnet virtual network with NSGs, service endpoints, and VNet peering between regions.", tools: "Azure Portal, ARM Templates" },
  { name: "Set up Azure Backup", duration: "35 min", description: "Configure Recovery Services vault, backup policies for VMs, and perform a test restore operation.", tools: "Azure Portal, Azure CLI" },
  { name: "Implement Load Balancer", duration: "50 min", description: "Deploy a public load balancer with health probes, backend pools, and NAT rules across availability zones.", tools: "Azure Portal, ARM Templates" },
  { name: "Configure Azure Monitor", duration: "60 min", description: "Set up metrics, diagnostic settings, Log Analytics workspace, and create alert rules with action groups.", tools: "Azure Portal, KQL" },
];

const reviews = [
  { stars: 5, text: "Exceptional training experience. Rajesh made complex Azure concepts easy to understand with real-world examples. The hands-on labs were incredibly well-structured and directly applicable to my job.", name: "Sarah M.", role: "Systems Administrator", company: "Enterprise IT", country: "United States", date: "Feb 2026" },
  { stars: 5, text: "I passed the AZ-104 exam on my first attempt just two weeks after completing this course. The practice questions and lab access were invaluable for exam preparation.", name: "Amit P.", role: "Cloud Engineer", company: "Consulting Firm", country: "India", date: "Jan 2026" },
  { stars: 4, text: "Great course with comprehensive coverage of all AZ-104 domains. The only suggestion would be to add more time for the networking module. Otherwise, excellent instructor and materials.", name: "Klaus W.", role: "IT Manager", company: "Manufacturing", country: "Germany", date: "Jan 2026" },
  { stars: 5, text: "This was my third Koenig course and they never disappoint. The 1-on-1 format allowed me to deep-dive into areas most relevant to my role. Highly recommend for busy professionals.", name: "Priya S.", role: "DevOps Engineer", company: "Startup", country: "Singapore", date: "Dec 2025" },
];

const ratingDistribution = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 16 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

const relatedCourses = [
  { code: "AZ-900", title: "Microsoft Azure Fundamentals", vendor: "Microsoft", level: "Fundamentals", duration: "8 Hours (1 Day)", price: "$595", nextDate: "Mar 10, 2026" },
  { code: "AZ-305", title: "Designing Microsoft Azure Infrastructure Solutions", vendor: "Microsoft", level: "Expert", duration: "32 Hours (4 Days)", price: "$1,495", nextDate: "Mar 17, 2026" },
  { code: "AZ-400", title: "Designing & Implementing Microsoft DevOps Solutions", vendor: "Microsoft", level: "Expert", duration: "32 Hours (4 Days)", price: "$1,495", nextDate: "Apr 7, 2026" },
  { code: "AZ-500", title: "Microsoft Azure Security Technologies", vendor: "Microsoft", level: "Associate", duration: "32 Hours (4 Days)", price: "$1,395", nextDate: "Mar 24, 2026" },
  { code: "AZ-204", title: "Developing Solutions for Microsoft Azure", vendor: "Microsoft", level: "Associate", duration: "40 Hours (5 Days)", price: "$1,495", nextDate: "Apr 14, 2026" },
  { code: "SC-200", title: "Microsoft Security Operations Analyst", vendor: "Microsoft", level: "Associate", duration: "32 Hours (4 Days)", price: "$1,395", nextDate: "Apr 21, 2026" },
];

const certPath = [
  { tier: "Fundamentals", certs: [{ code: "AZ-900", name: "Azure Fundamentals", current: false, note: "New to Azure? Start here first" }] },
  { tier: "Associate", certs: [{ code: "AZ-104", name: "Azure Administrator", current: true }, { code: "AZ-204", name: "Azure Developer", current: false }] },
  { tier: "Expert", certs: [{ code: "AZ-305", name: "Azure Solutions Architect", current: false }, { code: "AZ-400", name: "Azure DevOps Engineer", current: false }] },
  { tier: "Specialty", certs: [{ code: "AZ-500", name: "Azure Security Engineer", current: false }] },
];

const included = [
  { item: "Official Microsoft courseware", icon: "book" },
  { item: "Hands-on lab environment (30 days)", icon: "lab" },
  { item: "Exam preparation materials", icon: "doc" },
  { item: "Practice test questions (200+)", icon: "check" },
  { item: "Certificate of completion", icon: "cert" },
  { item: "Post-training support (30 days)", icon: "support" },
  { item: "Session recording access (self-paced)", icon: "video" },
  { item: "Free rescheduling (7+ days notice)", icon: "cal" },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function CoursePageDesign() {
  return (
    <div className="vc-page min-h-screen bg-white" style={{ fontFamily: "'GTWalsheimPro', sans-serif" }}>
      {/* ============================================================ */}
      {/* 1. Back Link Bar                                             */}
      {/* ============================================================ */}
      <div className="bg-koenig-dark px-6 py-2 text-center text-xs text-white/60">
        <Link href="/" className="hover:text-white">
          &larr; Back to all designs
        </Link>
        <span className="mx-4">|</span>
        <span className="font-medium text-koenig-blue">
          Course Detail Page Wireframe
        </span>
      </div>

      {/* ============================================================ */}
      {/* 2. Nav                                                       */}
      {/* ============================================================ */}
      <Nav variant="dark" />
      <ScrollToTop />

      {/* ============================================================ */}
      {/* 3. Breadcrumb                                                */}
      {/* ============================================================ */}
      <div className="border-b border-koenig-border bg-koenig-light px-[15px] sm:px-6 py-3 overflow-x-auto">
        <div className="mx-auto max-w-7xl flex items-center flex-nowrap whitespace-nowrap text-xs text-koenig-muted">
          <Link href="/" className="hover:text-koenig-blue">Home</Link>
          <span className="mx-2">/</span>
          <Link href="#" className="hover:text-koenig-blue">Cloud Computing</Link>
          <span className="mx-2">/</span>
          <Link href="#" className="hover:text-koenig-blue">Microsoft</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-koenig-dark">{course.code}</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4–end. All page sections — 20px gap on mobile                */}
      {/* ============================================================ */}
      <div className="page-sections">

      {/* ============================================================ */}
      {/* 4. Course Hero                                               */}
      {/* ============================================================ */}
      <section className="px-[15px] sm:px-6 py-[15px] sm:py-10" style={{ background: 'radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 45%, #040C18 100%)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Left: Course Info */}
            <div className="lg:col-span-2">
              {/* Badges row — Vendor + GTR */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-koenig-blue/40 bg-koenig-blue/20 px-3 py-1 text-xs font-semibold text-koenig-blue">
                  <svg width="11" height="11" viewBox="0 0 21 21" fill="currentColor"><rect x="0" y="0" width="10" height="10" fill="#f25022"/><rect x="11" y="0" width="10" height="10" fill="#7fba00"/><rect x="0" y="11" width="10" height="10" fill="#00a4ef"/><rect x="11" y="11" width="10" height="10" fill="#ffb900"/></svg>
                  {course.vendor}
                </span>
                {course.guaranteed && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/40 bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                    Guaranteed-to-Run
                  </span>
                )}
              </div>

              {/* Title with Associate badge inline */}
              <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
                {course.title}
                <span className="ml-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/75 align-middle">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>
                  {course.level}
                </span>
              </h1>

              {/* Description */}
              <BannerReadMore>
                <p className="mb-3 max-w-2xl text-base leading-relaxed text-white/70">
                  Master the skills needed to manage Azure subscriptions, secure identities, administer
                  infrastructure, configure virtual networking, connect Azure and on-premises sites,
                  manage network traffic, implement storage solutions, and create and scale virtual machines.
                </p>
                <p className="mb-6 max-w-2xl text-sm leading-relaxed text-white/50">
                  This official Microsoft course prepares you for the AZ-104 certification exam and is
                  designed for IT professionals looking to specialize in Azure administration. Gain
                  hands-on experience with real-world lab environments guided by a Microsoft Certified Trainer.
                </p>
              </BannerReadMore>

              {/* Meta Row */}
              <div className="mb-6 mt-[18px] sm:mt-0 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-white">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  <span className="text-white">{course.format}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                  <span className="ml-1 font-medium text-yellow-400">{course.rating}</span>
                  <span className="ml-1">({course.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>{course.enrolled}+ professionals trained</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <RequestInfoModal courseTitle={course.title} courseCode={course.code} />
                <button className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <path d="M12 13v5m-2.5-2.5L12 18l2.5-2.5"/>
                  </svg>
                  Download Syllabus
                </button>
              </div>
            </div>

            {/* Right: Pricing Card — desktop only */}
            <div className="hidden lg:block">
            <PricingCard
              defaultSelected="Public Batch"
              formats={[
                { mode: "1-on-1", price: course.oneOnOnePrice, desc: "Dedicated instructor, your schedule", badge: "Fastest", badgeColor: "bg-sky-500/15 text-sky-300 border border-sky-500/25" },
                { mode: "Public Batch", price: course.price, desc: "Group class, fixed schedule", badge: "Most Popular", badgeColor: "bg-koenig-blue/20 text-koenig-blue border border-koenig-blue/30" },
                { mode: "Self-Paced", price: course.selfPacedPrice, desc: "Recorded sessions, learn anytime", badge: "Best Value", badgeColor: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25" },
              ]}
            />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4b. Customisation CTA strip                                  */}
      {/* ============================================================ */}
      <section className="bg-[#EAF4FB] px-[15px] sm:px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
          <p className="flex items-center gap-2 text-base font-medium text-koenig-dark">
            <UserCog size={20} strokeWidth={1.75} className="flex-shrink-0 text-koenig-blue" />
            <span>
              Want this course <span className="font-bold">customised</span>? We can adjust the <span className="font-bold">schedule</span>, <span className="font-bold">content</span> and <span className="font-bold">format</span> to fit your needs.
            </span>
          </p>
          <Link
            href="/customised-training"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center whitespace-nowrap rounded-lg border-2 border-koenig-blue bg-koenig-blue px-6 py-3 text-[15px] font-medium text-white transition hover:bg-koenig-blue/90"
          >
            Request Customisation
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. Sticky Tab Navigation                                     */}
      {/* ============================================================ */}
      <StickyCourseNav />

      {/* ============================================================ */}
      {/* 6. Course Overview                                           */}
      {/* ============================================================ */}
      <section id="overview" className="relative overflow-hidden px-[15px] sm:px-6 py-[15px] sm:py-10">
        {/* Glow blobs — same pattern as homepage white sections */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-[450px] w-[450px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.13) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-[380px] w-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.13) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.08) 0%, transparent 70%)' }} />
        <div className="mx-auto grid max-w-7xl gap-8 lg:gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="mb-3 text-2xl font-bold text-koenig-dark">
              Course <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Overview</span>
            </h2>
            <ReadMore lines={6}><div className="space-y-4 text-sm leading-relaxed text-koenig-gray">
              <p>
                This course teaches IT Professionals how to manage their Azure subscriptions, secure
                identities, administer the infrastructure, configure virtual networking, connect Azure
                and on-premises sites, manage network traffic, implement storage solutions, and create
                and scale virtual machines. It is designed for Azure Administrators who are responsible
                for implementing, managing, and monitoring identity, governance, storage, compute, and
                virtual networks in a cloud environment.
              </p>
              <p>
                Throughout the course, students will learn to use the Azure portal, Azure Cloud Shell,
                Azure PowerShell, CLI, and ARM templates. The hands-on labs reinforce the concepts
                covered in class and directly prepare you for the AZ-104 certification exam. Each module
                includes practical exercises that mirror real-world administration tasks you will encounter
                on the job.
              </p>
              <p>
                By the end of this course, you will have the confidence and skills to manage Azure
                environments for organizations of any size. Whether you are transitioning from on-premises
                infrastructure or expanding your cloud expertise, this course provides the foundation
                needed to excel as an Azure Administrator and advance your career in cloud computing.
              </p>
            </div></ReadMore>

            {/* What You'll Learn */}
            <h3 className="mb-4 mt-8 text-lg font-bold text-koenig-dark">
              What You&apos;ll Learn
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {course.objectives.map((obj) => (
                <div
                  key={obj}
                  className="flex items-start gap-3 rounded-lg border border-koenig-blue/20 bg-koenig-blue/5 p-4 shadow-sm backdrop-blur-sm"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-koenig-blue text-xs font-bold text-white">
                    &#10003;
                  </span>
                  <span className="text-sm text-koenig-gray">{obj}</span>
                </div>
              ))}
            </div>

            {/* Skills You'll Gain */}
            <h3 className="mb-4 mt-8 text-lg font-bold text-koenig-dark">
              Skills You&apos;ll Gain
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(({ name, icon }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-koenig-blue/20 bg-koenig-blue/5 px-3 py-1.5 text-xs font-medium text-koenig-accent"
                >
                  {icon}
                  {name}
                </span>
              ))}
            </div>

            {/* Prerequisites */}
            <h3 className="mb-4 mt-8 text-lg font-bold text-koenig-dark">
              Prerequisites
            </h3>
            <div className="relative overflow-hidden rounded-2xl border border-koenig-blue/30 bg-koenig-light p-6 shadow-sm">
              {/* Top accent bar */}
              <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-koenig-blue/60 via-cyan-400/80 to-koenig-blue/40" />

              <p className="relative mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-koenig-blue">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-koenig-blue/15 ring-1 ring-koenig-blue/30">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </span>
                Recommended knowledge before taking this course
              </p>
              <ul className="relative space-y-3">
                {course.prerequisites.map((pre) => (
                  <li key={pre} className="flex items-center gap-3 text-sm text-koenig-gray">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-koenig-blue/20 to-cyan-400/20 text-koenig-blue ring-1 ring-koenig-blue/20">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {pre}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            {/* Quick Facts */}
            <div className="rounded-xl border border-koenig-border bg-white p-6 shadow-sm">
              <h4 className="mb-5 text-sm font-bold uppercase tracking-wide text-koenig-dark">
                Quick Facts
              </h4>
              <div className="space-y-3 text-sm">
                {[
                  ["Course Code", course.code],
                  ["Duration", course.duration],
                  ["Level", course.level],
                  ["Vendor", course.vendor],
                  ["Format", course.format],
                  ["Certification", "Azure Administrator Associate"],
                  ["Language", "English"],
                  ["Lab Access", "30 days included"],
                  ["Exam Code", "AZ-104"],
                  ["Passing Score", "700 / 1000"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between border-b border-koenig-border/50 pb-2 last:border-0 last:pb-0">
                    <span className="text-koenig-muted">{label}</span>
                    <span className="font-medium text-koenig-dark">{value}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Enterprise nudge — separate card */}
            <div className="rounded-xl border border-koenig-blue/20 bg-koenig-blue/5 px-4 py-4 text-center shadow-sm">
              <p className="mb-2 text-sm text-koenig-muted">Training 5 or more employees?</p>
              <CorporateQuoteModal>
                <div className="inline-block rounded-lg border border-koenig-blue/30 bg-gradient-to-r from-koenig-blue/10 to-koenig-blue/5 px-5 py-2 transition hover:border-koenig-blue/50 hover:shadow-sm cursor-pointer">
                  <span className="text-sm font-semibold text-koenig-blue">Request More Info →</span>
                </div>
              </CorporateQuoteModal>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. Certification Details                                     */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden border-t border-koenig-border bg-koenig-light px-[15px] sm:px-6 py-[15px] sm:py-10">
        {/* Section glow blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.10) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-60 w-60 rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.08) 0%, transparent 70%)' }} />

        <div className="relative mx-auto max-w-7xl">
          <h2 className="mb-2 text-2xl font-bold text-koenig-dark">
            Certification <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Exam</span>
          </h2>
          <p className="mb-6 text-sm text-koenig-muted">
            Everything you need to know about the AZ-104 Microsoft Azure Administrator certification exam
          </p>

          <div>
            {/* Exam Details Card */}
            <div className="relative overflow-hidden rounded-2xl border border-koenig-blue/20 bg-white p-7 shadow-[0_4px_24px_rgba(6,148,209,0.08)]">
              <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-koenig-blue/50 via-cyan-400/70 to-koenig-blue/30" />
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.07) 0%, transparent 70%)' }} />
              <h3 className="mb-5 flex items-center gap-2 text-base font-bold text-koenig-dark">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-koenig-blue/10">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-koenig-blue"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </span>
                Exam <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Details</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Exam Name", value: "AZ-104", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
                  { label: "Exam Cost", value: "$165 (bundle available)", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                  { label: "Format", value: "Multiple choice, labs & case studies", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
                  { label: "Questions", value: "40-60 questions", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
                  { label: "Duration", value: "2 hours", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                  { label: "Passing Score", value: "700 / 1000", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
                  { label: "Validity", value: "1 year (renewal required)", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                  { label: "Retake Policy", value: "24hr wait, then 14-day wait", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.92"/></svg> },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex items-center justify-between rounded-xl border border-koenig-blue/10 bg-gradient-to-br from-koenig-light to-white px-4 py-3 gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-koenig-blue/70 shrink-0">
                      <span className="text-koenig-blue/60">{icon}</span>
                      {label}
                    </div>
                    <div className="text-sm font-semibold text-koenig-dark text-right">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. Schedule & Pricing — Interactive Scheduler                */}
      {/* ============================================================ */}
      <CourseScheduler />


      {/* ============================================================ */}
      {/* 9. Detailed Curriculum                                       */}
      {/* ============================================================ */}
      <section id="curriculum" className="relative overflow-hidden border-t border-koenig-border bg-koenig-light px-[15px] sm:px-6 py-[15px] sm:py-10">
        <div className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.10) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-60 w-60 rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.08) 0%, transparent 70%)' }} />
        <div className="relative mx-auto max-w-7xl">
          <h2 className="mb-2 text-2xl font-bold text-koenig-dark">
            Course <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Curriculum</span>
          </h2>
          <p className="mb-4 text-sm text-koenig-muted">
            4 days of structured learning with hands-on labs and real-world scenarios
          </p>

          {/* Timeline accordion */}
          <div className="relative">
            {/* Vertical connecting line — aligns under the inline dots (pl-6 + 7px = 31px) */}
            <div className="absolute left-[27px] sm:left-[31px] top-3 bottom-3 w-px bg-koenig-blue/20" />

            <div className="space-y-0">
              {([
                {
                  open: true,
                  title: "Day 1",
                  subtitle: "Manage Azure Identities and Governance",
                  topics: ["Azure AD", "RBAC", "Subscriptions", "Azure Policy", "Management Groups", "Resource Locks", "Custom Roles", "Conditional Access"],
                },
                {
                  open: false,
                  title: "Day 2",
                  subtitle: "Implement and Manage Storage",
                  topics: ["Storage Accounts", "Blob Storage", "Azure Files", "Storage Security", "SAS Tokens", "Lifecycle Management", "Storage Tiers", "File Sync"],
                },
                {
                  open: false,
                  title: "Day 3",
                  subtitle: "Deploy and Manage Azure Compute Resources",
                  topics: ["Virtual Machines", "App Services", "Containers", "Azure Kubernetes", "Availability Sets", "Scale Sets", "Azure Functions", "ARM Templates"],
                },
                {
                  open: false,
                  title: "Day 4",
                  subtitle: "Configure and Manage Virtual Networking",
                  topics: ["VNets", "NSGs", "Azure DNS", "Network Peering", "VPN Gateway", "Load Balancer", "Application Gateway", "Azure Firewall"],
                },
              ] as const).map((day, idx) => (
                <details key={day.title} {...(day.open ? { open: true } : {})} className="group pl-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 pr-4">
                    <div className="flex items-center gap-3">
                      {/* Numbered circle — always beside the title */}
                      <span className="relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-koenig-blue bg-white text-[10px] font-bold text-koenig-blue transition-all group-open:border-koenig-blue group-open:bg-gradient-to-br group-open:from-koenig-blue group-open:to-cyan-500 group-open:text-white group-open:shadow-md group-open:shadow-koenig-blue/30">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-sm font-semibold text-koenig-dark">{day.title}</span>
                        <span className="ml-2 text-sm text-koenig-muted">&mdash; {day.subtitle}</span>
                      </div>
                    </div>
                    <svg className="h-4 w-4 flex-shrink-0 text-koenig-muted transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>

                  <div className="mb-2 ml-6 rounded-xl border border-koenig-blue/10 bg-koenig-blue/5 px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {day.topics.map((topic) => (
                        <span key={topic} className="rounded-full border border-koenig-blue/20 bg-white px-3.5 py-1 text-xs font-medium text-koenig-accent shadow-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. What's Included in Your Training                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden border-t border-koenig-border bg-[#f4f8fc] px-[15px] sm:px-6 py-[15px] sm:py-10">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.12) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.10) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(6,148,209,0.06) 0%, transparent 70%)' }} />

        <div className="relative mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-koenig-dark">
            What&apos;s Included in Your <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Training</span>
          </h2>
          <p className="mb-6 text-center text-sm text-koenig-muted">
            Every enrollment comes packed with resources to maximise your learning and exam success
          </p>

          <WhatsIncludedCarousel />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11–13. Instructor · Reviews · Skills — sticky left tabs      */}
      {/* ============================================================ */}
      <div id="instructor">
        <StickyInfoTabs />
      </div>

      {/* ============================================================ */}
      {/* 14. Student Reviews                                          */}
      {/* ============================================================ */}
      <CourseTestimonials />

      {/* ============================================================ */}
      {/* 15. FAQs                                                     */}
      {/* ============================================================ */}
      <CourseFaq faqs={course.faqs} />

      {/* ============================================================ */}
      {/* 16. Resources                                                */}
      {/* ============================================================ */}
      <CourseResources />

      {/* ============================================================ */}
      {/* 17. Request for More Information Form                        */}
      {/* ============================================================ */}
      <RequestInfoForm courseTitle={course.title} courseCode="AZ-104T00-A" />

      {/* ============================================================ */}
      {/* 17. Money-Back Guarantee                                     */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden px-[15px] sm:px-6 py-[15px] sm:py-14" style={{ background: "radial-gradient(ellipse at 55% 40%, #0D3F5A 0%, #071B2E 55%, #040C18 100%)" }}>
        {/* Glow blobs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(34,197,94,0.14) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(34,197,94,0.06) 0%, transparent 70%)" }} />

        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">

            {/* Left — icon + headline */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {/* Smiley icon bubble */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full blur-xl" style={{ background: "rgba(34,197,94,0.40)" }} />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/40">
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 13s1.5 2.5 4 2.5 4-2.5 4-2.5"/>
                    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3"/>
                    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3"/>
                  </svg>
                </div>
              </div>

              {/* Big stat */}
              <div className="mb-1 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-5xl sm:text-6xl font-black text-transparent leading-none">
                100%
              </div>
              <h2 className="mb-3 text-2xl font-bold text-white">
                Happiness <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Guarantee</span>
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-white/55">
                We are so confident in the quality of our training that we offer a full money-back guarantee. Not satisfied? Contact us within 24 hours of your first session — we&apos;ll refund you completely, no questions asked.
              </p>
            </div>

            {/* Right — 2×2 feature cards */}
            <div className="grid w-full grid-cols-2 gap-3 lg:max-w-sm">
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                  label: "Full Refund",
                  sub: "Within 24 hours",
                  color: "from-koenig-blue to-cyan-500",
                  shadow: "shadow-koenig-blue/30",
                  glow: "rgba(6,148,209,0.12)",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  ),
                  label: "No Questions",
                  sub: "Asked ever",
                  color: "from-indigo-500 to-blue-500",
                  shadow: "shadow-indigo-500/30",
                  glow: "rgba(99,102,241,0.12)",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  ),
                  label: "Secure Payment",
                  sub: "Encrypted checkout",
                  color: "from-teal-500 to-cyan-400",
                  shadow: "shadow-teal-500/30",
                  glow: "rgba(20,184,166,0.12)",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                    </svg>
                  ),
                  label: "PCI DSS",
                  sub: "Compliant",
                  color: "from-sky-500 to-cyan-400",
                  shadow: "shadow-sky-500/30",
                  glow: "rgba(14,165,233,0.12)",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="relative overflow-hidden rounded-2xl border border-white/8 p-4"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${item.glow} 0%, rgba(255,255,255,0.03) 100%)` }}
                >
                  <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md ${item.shadow}`}>
                    {item.icon}
                  </div>
                  <div className="text-sm font-bold text-white">{item.label}</div>
                  <div className="text-[11px] text-white/45">{item.sub}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 18. Related Courses                                          */}
      {/* ============================================================ */}
      <section id="related" className="px-[15px] sm:px-6 py-[15px] sm:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-koenig-dark">Related <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Courses</span></h2>
              <p className="mt-1 text-sm text-koenig-muted">
                Other {course.vendor} Azure courses to advance your cloud career
              </p>
            </div>
            <button className="hidden text-sm font-medium text-koenig-blue hover:underline sm:block">
              View All Microsoft Courses &rarr;
            </button>
          </div>

          <RelatedCourses courses={relatedCourses} />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 19. Certification Path                                       */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden border-t border-koenig-border bg-koenig-light px-[15px] sm:px-6 py-[15px] sm:py-12">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full" style={{ background: "radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-[380px] w-[380px] rounded-full" style={{ background: "radial-gradient(circle, rgba(77,191,239,0.16) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(6,148,209,0.07) 0%, transparent 70%)" }} />

        <div className="relative mx-auto max-w-7xl">
          {/* Heading */}
          <div className="mb-[15px] sm:mb-10 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-koenig-blue/20 bg-koenig-blue/8 px-4 py-1 text-xs font-semibold text-koenig-blue">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Learning Path
            </span>
            <h2 className="mb-2 text-2xl font-bold text-koenig-dark">
              What&apos;s Next After <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">AZ-104?</span>
            </h2>
            <p className="text-sm text-koenig-muted">Continue your Azure journey after AZ-104</p>
          </div>

          {/* Connector line behind columns */}
          <div className="relative">
            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[22px] hidden h-px bg-gradient-to-r from-cyan-200 via-koenig-blue/50 to-koenig-blue/30 md:block" />

            <div className="grid items-start gap-4 md:grid-cols-4">
              {certPath.map((tier, tierIdx) => {
                const tierStyles = [
                  { bubble: "from-sky-400 to-cyan-400",        shadow: "shadow-sky-400/25",     pill: "bg-sky-50 text-sky-700 border-sky-200",                 cardBorder: "border-sky-100",        cardHover: "hover:border-sky-300/60 hover:shadow-sky-400/8",
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
                  { bubble: "from-koenig-blue to-cyan-500",    shadow: "shadow-koenig-blue/25", pill: "bg-koenig-blue/8 text-koenig-blue border-koenig-blue/20", cardBorder: "border-koenig-blue/20", cardHover: "hover:border-koenig-blue/40 hover:shadow-koenig-blue/10",
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
                  { bubble: "from-cyan-600 to-blue-500",       shadow: "shadow-cyan-600/25",    pill: "bg-cyan-50 text-cyan-700 border-cyan-200",               cardBorder: "border-cyan-100",       cardHover: "hover:border-cyan-300/60 hover:shadow-cyan-500/8",
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
                  { bubble: "from-teal-500 to-cyan-400",       shadow: "shadow-teal-500/25",    pill: "bg-teal-50 text-teal-700 border-teal-200",               cardBorder: "border-teal-100",       cardHover: "hover:border-teal-300/60 hover:shadow-teal-500/8",
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> },
                ][tierIdx];

                return (
                  <div key={tier.tier} className="flex flex-col gap-3">
                    {/* Tier header with icon bubble */}
                    <div className="flex flex-col items-center gap-2">
                      <div className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${tierStyles.bubble} shadow-md ${tierStyles.shadow} ring-4 ring-white`}>
                        {tierStyles.icon}
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${tierStyles.pill}`}>
                        {tier.tier}
                      </span>
                    </div>

                    {/* Cert cards */}
                    <div className="flex flex-col gap-2.5">
                      {tier.certs.map((cert) => (
                        <div
                          key={cert.code}
                          className={`group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                            cert.current
                              ? "border-koenig-blue/40 shadow-[0_4px_20px_rgba(6,148,209,0.15)] ring-2 ring-koenig-blue/15"
                              : `${tierStyles.cardBorder} ${tierStyles.cardHover}`
                          }`}
                        >
                          {/* Top accent */}
                          <div className={`absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r ${tierStyles.bubble} ${cert.current ? "opacity-100" : "opacity-40 group-hover:opacity-70"} transition-opacity`} />

                          <div className={`text-sm font-black ${cert.current ? "bg-gradient-to-r from-koenig-blue to-cyan-500 bg-clip-text text-transparent" : "text-koenig-dark"}`}>
                            {cert.code}
                          </div>
                          <div className="mt-0.5 text-[11px] text-koenig-muted">{cert.name}</div>

                          {cert.current && (
                            <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-koenig-blue to-cyan-500 px-3 py-1 text-[10px] font-bold text-white shadow-sm shadow-koenig-blue/30">
                              <svg width="6" height="6" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                              Current Course
                            </span>
                          )}
                          {"note" in cert && cert.note && (
                            <p className="mt-2 text-[10px] leading-snug text-sky-600 font-medium">
                              {cert.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>


      </div>{/* end .page-sections */}

      {/* ============================================================ */}
      {/* 22. Footer                                                   */}
      {/* ============================================================ */}
      <Footer />
    </div>
  );
}

import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { CourseScheduler } from "./components/course-scheduler";
import { TrainingFormatsCard } from "./components/training-formats-card";
import { StickyInfoTabs } from "./components/sticky-info-tabs";
import { StickyCourseNav } from "./components/sticky-course-nav";
import { CourseFaq } from "./components/course-faq";
import { CourseResources } from "./components/course-resources";
import { RequestInfoForm } from "./components/request-info-form";
import { RequestInfoModal } from "./components/request-info-modal";
import { DownloadSyllabusModal } from "./components/download-syllabus-modal";
import { WhatsIncludedCarousel } from "./components/whats-included-carousel";
import { ReadMore } from "./components/read-more";
import { CourseTestimonials } from "./components/course-testimonials";
import { RelatedCourses } from "./components/related-courses";
import { CertificationPath } from "./components/certification-path";
import { BannerReadMore } from "./components/banner-read-more";
import { ScrollToTop } from "./components/scroll-to-top";
import { BreadcrumbTechDropdown } from "./components/breadcrumb-tech-dropdown";
import { AudienceCards } from "./components/audience-cards";
import Link from "next/link";
import { User, Users, Clock, Globe } from "lucide-react";

/* Formats "Mar 3 - Mar 7, 2026" -> "Mar 3, 2026" for a compact next-batch label */
function formatNextBatchDate(dateRange: string): string {
  const [start, end] = dateRange.split(" - ");
  const year = end?.split(", ")[1];
  return year ? `${start}, ${year}` : dateRange;
}

/* ------------------------------------------------------------------ */
/*  Course Data                                                        */
/* ------------------------------------------------------------------ */

const course = {
  title: "Financial Accounting in SAP S/4HANA - Academy Part I - TS4F01",
  vendor: "SAP",
  relatedTechnologies: [] as string[],
  technology: "Enterprise Applications",
  level: "Advanced",
  duration: "80 Hours (10 Days)",
  format: "Live Online / Classroom",
  price: "INR 162,600",
  oneOnOnePrice: "INR 312,600",
  selfPacedPrice: "On Request",
  enrolled: "60",
  rating: 4.8,
  reviews: 2340,
  guaranteed: true,
  code: "TS4F01",
  nextDates: [
    { date: "Mar 3 - Mar 14, 2026", format: "Online", mode: "Public Batch", seats: 8, price: "INR 162,600" },
    { date: "Mar 17 - Mar 28, 2026", format: "Classroom (Delhi)", mode: "Public Batch", seats: 12, price: "INR 162,600" },
    { date: "Mar 24 - Apr 4, 2026", format: "Online", mode: "Public Batch", seats: 15, price: "INR 162,600" },
    { date: "Apr 7 - Apr 18, 2026", format: "Classroom (Bengaluru)", mode: "Classroom", seats: 10, price: "INR 175,000" },
    { date: "Any date", format: "Online / In-person", mode: "1-on-1", seats: 1, price: "INR 312,600" },
    { date: "Start anytime", format: "Recorded Sessions", mode: "Self-Paced", seats: 999, price: "On Request" },
  ],
  objectives: [
    "Configure SAP S/4HANA organizational units and master data",
    "Implement SAP S/4HANA General Ledger account structures",
    "Manage SAP S/4HANA document splitting and posting controls",
    "Configure SAP S/4HANA payment terms and tax codes",
    "Automate SAP S/4HANA open item clearing processes",
    "Optimize SAP S/4HANA financial reporting and period-end closing",
  ],
  prerequisites: [
    "Fundamental knowledge of accounting principles and financial statements.",
    "Understanding of core financial processes including General Ledger (FI-GL), Accounts Payable (FI-AP), and Accounts Receivable (FI-AR).",
    "Proficiency in SAP S/4HANA user interface navigation.",
    "Ability to describe core financial processes such as record-to-report, payables, and receivables management.",
    "Prior completion of SAP courses F1120, F1130, F1140, or equivalent knowledge (recommended).",
    "Practical experience with SAP S/4HANA Cloud Private Edition or on-premise deployments (recommended).",
  ],
  syllabus: [
    {
      day: "Day 1-2",
      title: "Organizational Structure & Master Data",
      topics: [
        "Configure company codes, fiscal year variants, and field status groups",
        "Set up chart of accounts and GL account master data",
        "Configure business partners for customers and vendors",
        "Define posting periods and number ranges",
        "Navigate the SAP Fiori Launchpad for finance apps",
        "Lab: Build a complete company code structure end to end",
      ],
    },
    {
      day: "Day 3-5",
      title: "General Ledger & Document Processing",
      topics: [
        "Implement General Ledger account structures",
        "Configure document types and posting keys",
        "Manage document splitting and parallel ledgers",
        "Execute cross-company transactions",
        "Configure payment terms and tax codes",
        "Lab: Post and split GL documents across company codes",
      ],
    },
    {
      day: "Day 6-8",
      title: "Accounts Payable & Receivable",
      topics: [
        "Configure vendor and customer master data",
        "Process incoming and outgoing payments",
        "Automate open item clearing",
        "Set up dunning and payment programs",
        "Configure bank accounting and reconciliation",
        "Lab: Run the automatic payment and clearing programs",
      ],
    },
    {
      day: "Day 9-10",
      title: "Reporting & Period-End Closing",
      topics: [
        "Optimize financial reporting with SAP Fiori apps",
        "Execute month-end and year-end closing activities",
        "Reconcile sub-ledgers to the General Ledger",
        "Prepare for the SAP C_TS4FI certification exam",
        "Review exam objective mapping and practice scenarios",
        "Lab: Complete a full period-end close simulation",
      ],
    },
  ],
  faqs: [
    { q: "Is the certification exam included in the course fee? If not, what is the exam cost?", a: "The official certification exam is not included in the course fee. You must purchase the C_TS4FI exam separately for $578 USD via the SAP Certification Hub. This fee provides a 12-month subscription for one remote exam attempt." },
    { q: "What training formats does Koenig offer for TS4F01, and is Guaranteed-to-Run scheduling available?", a: "Koenig provides this course via live online instructor-led and 1-on-1 sessions. All public batches are Guaranteed-to-Run, ensuring training proceeds with even one student. This guarantees schedule reliability for your professional development plans." },
    { q: "How long is lab access provided, and what type of environment is used?", a: "Lab access lasts for the course duration. You utilize cloud-based, preconfigured SAP S/4HANA environments. This on-demand access allows you to perform hands-on exercises without local software installation requirements." },
    { q: "What is Koenig's rescheduling and cancellation policy for this course?", a: "Koenig allows you to reschedule the course for free if requested 10 days prior. Cancellations within 10 days incur a 50% fee. Standard policy permits one reschedule per course enrollment." },
    { q: "How many questions are on the TS4F01 certification exam, what is the format, time limit, and passing score?", a: "The exam (C_TS4FI) is a 120-minute system-based assessment. You must achieve a 60% passing score. It replaces standard MCQs with scenario-based tasks to verify your real-world SAP proficiency." },
    { q: "How long is the SAP TS4F01 certification valid, and what is the renewal process and cost?", a: "Your certification remains valid for 12 months. You must pass a yearly assessment via SAP Learning Hub to renew. Otherwise, you must retake the $578 exam to maintain your credential." },
    { q: "Does Koenig provide post-training support after completing the course, such as mentor access or retake options?", a: "Koenig offers post-training support, including trainer access for technical queries. While retakes are fee-based, your Customer Success Manager remains available for support for one year." },
    { q: "What are the prerequisites or recommended experience for enrolling in this course?", a: "SAP suggests foundational financial accounting knowledge and basic SAP navigation skills before starting this course. Prior SAP ERP Financials experience significantly improves your mastery of S/4HANA configuration processes." },
    { q: "What salary increase or career opportunities can professionals expect after completing the TS4F01 course and certification?", a: "Certified professionals often earn between $75,000 and $110,000 annually, with senior roles exceeding $150,000. This credential accelerates career growth as an SAP FI consultant or financial analyst, meeting high demand for enterprise-wide digital transformation experts." },
    { q: "How does the TS4F01 course compare with self-study for preparing for the SAP certification exam?", a: "The course provides structured, instructor-led guidance and hands-on labs that outperform self-study. Koenig's approach ensures real-time doubt resolution, giving you a competitive advantage for passing the SAP certification exam successfully." },
  ],
  instructor: {
    name: "Priya S.",
    title: "SAP Certified Application Associate & Trainer",
    experience: "14+ years in SAP Financial Accounting & S/4HANA implementations",
    certifications: [
      "SAP Certified Application Associate - SAP S/4HANA for Financial Accounting",
      "SAP Certified Application Associate - Central Finance",
      "SAP Activate Project Manager",
    ],
    rating: 4.9,
    sessionsDelivered: 950,
    specializations: ["SAP S/4HANA Finance", "General Ledger Accounting", "Central Finance Migration", "SAP Fiori"],
    bio: "Priya is a seasoned SAP FI consultant and certified trainer with over 14 years of experience helping enterprises implement and optimize SAP S/4HANA Financial Accounting. She has trained over 8,000 finance and IT professionals across 30+ countries and is known for grounding every configuration topic in a real implementation scenario. When not training, Priya consults for large enterprises on SAP S/4HANA finance transformation projects.",
  },
};

const tabs = ["Overview", "Schedule", "Curriculum", "Instructor", "Reviews", "FAQs", "Related"];

const skills = [
  "SAP General Ledger Accounting", "SAP Accounts Payable", "SAP Accounts Receivable", "SAP Asset Accounting", "SAP Fiori Launchpad",
  "SAP Document Splitting", "SAP Posting Controls", "SAP Payment Terms & Tax Codes", "SAP Open Item Clearing", "SAP Financial Reporting",
  "SAP Period-End Closing", "SAP Bank Accounting", "SAP Company Code Configuration", "SAP S/4HANA Navigation", "SAP Master Data Management",
  "SAP Cross-Company Transactions", "SAP Learning Hub",
];

const curriculumTopics = [
  "TS4F01", "SAP S/4HANA Finance", "General Ledger Accounting", "Accounts Payable", "Accounts Receivable",
  "Asset Accounting", "Document Splitting", "SAP Fiori Launchpad", "Period-End Closing", "C_TS4FI Certification",
];

const labs = [
  { name: "Build a Company Code Structure", duration: "60 min", description: "Configure a complete company code with fiscal year variants and field status groups, simulating a real enterprise rollout.", tools: "SAP S/4HANA, SAP Fiori Launchpad" },
  { name: "Configure General Ledger Accounts", duration: "45 min", description: "Set up GL account master data and account structures to ensure accurate financial tracking.", tools: "SAP GUI, SAP Fiori" },
  { name: "Process Document Splitting", duration: "40 min", description: "Configure document splitting rules and posting controls, then post and split GL documents across company codes.", tools: "SAP S/4HANA Finance" },
  { name: "Run Automatic Payment Program", duration: "50 min", description: "Configure vendor payment terms and execute the automatic payment program with open item clearing.", tools: "SAP S/4HANA, SAP Fiori" },
  { name: "Configure Tax Codes & Bank Accounting", duration: "35 min", description: "Set up payment terms, tax codes, and bank accounting for cross-company transactions.", tools: "SAP S/4HANA Finance" },
  { name: "Period-End Close Simulation", duration: "60 min", description: "Execute month-end and year-end closing activities and reconcile sub-ledgers to the General Ledger.", tools: "SAP Fiori, SAP S/4HANA" },
];

const reviews = [
  { stars: 5, text: "Exceptional training experience. Priya made complex SAP S/4HANA finance concepts easy to understand with real-world examples. The hands-on labs were incredibly well-structured and directly applicable to my job.", name: "Neha R.", role: "SAP FI Consultant", company: "Enterprise IT", country: "India", date: "Feb 2026" },
  { stars: 5, text: "I passed the C_TS4FI exam on my first attempt just two weeks after completing this course. The practice scenarios and lab access were invaluable for exam preparation.", name: "Daniel O.", role: "Financial Systems Analyst", company: "Consulting Firm", country: "South Africa", date: "Jan 2026" },
  { stars: 4, text: "Great course with comprehensive coverage of SAP S/4HANA Financial Accounting. The only suggestion would be to add more time for document splitting. Otherwise, excellent instructor and materials.", name: "Marco T.", role: "ERP Project Manager", company: "Manufacturing", country: "Italy", date: "Jan 2026" },
  { stars: 5, text: "This was my second Koenig course and they never disappoint. The 1-on-1 format allowed me to deep-dive into areas most relevant to my role. Highly recommend for busy professionals.", name: "Aisha K.", role: "SAP Finance Analyst", company: "Startup", country: "UAE", date: "Dec 2025" },
];

const ratingDistribution = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 16 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

const relatedCourses = [
  { code: "F1120", title: "SAP S/4HANA Financial Accounting Specialization", vendor: "SAP", level: "Foundation", duration: "40 Hours (5 Days)", price: "$1,095", nextDate: "Mar 10, 2026" },
  { code: "TS4F02", title: "Financial Accounting in SAP S/4HANA - Academy Part II", vendor: "SAP", level: "Advanced", duration: "80 Hours (10 Days)", price: "$1,995", nextDate: "Mar 17, 2026" },
  { code: "S4F28", title: "Asset Accounting in SAP S/4HANA", vendor: "SAP", level: "Advanced", duration: "24 Hours (3 Days)", price: "$895", nextDate: "Apr 7, 2026" },
  { code: "S4F10", title: "Business Processes in Financial Accounting - SAP S/4HANA", vendor: "SAP", level: "Associate", duration: "32 Hours (4 Days)", price: "$1,195", nextDate: "Mar 24, 2026" },
  { code: "S4F12", title: "Management Accounting in SAP S/4HANA", vendor: "SAP", level: "Advanced", duration: "40 Hours (5 Days)", price: "$1,395", nextDate: "Apr 14, 2026" },
  { code: "C_TS4FI", title: "SAP Certified Application Associate - S/4HANA Financial Accounting", vendor: "SAP", level: "Certification", duration: "120 min exam", price: "$578", nextDate: "Any date" },
];

const certPath = [
  { tier: "Foundation", certs: [{ code: "F1120", name: "SAP S/4HANA Financial Accounting Specialization", current: false, note: "New to SAP Finance? Start here first", duration: "40 Hours (5 Days)", vendor: "SAP" }] },
  { tier: "Advanced", certs: [{ code: "TS4F01", name: "Financial Accounting in SAP S/4HANA - Part I", current: true, duration: course.duration, vendor: "SAP" }, { code: "TS4F02", name: "Financial Accounting in SAP S/4HANA - Part II", current: false, duration: "80 Hours (10 Days)", vendor: "SAP" }] },
  { tier: "Specialist", certs: [{ code: "S4F28", name: "Asset Accounting in SAP S/4HANA", current: false, duration: "24 Hours (3 Days)", vendor: "SAP" }, { code: "S4F12", name: "Management Accounting in SAP S/4HANA", current: false, duration: "40 Hours (5 Days)", vendor: "SAP" }] },
  { tier: "Certification", certs: [{ code: "C_TS4FI", name: "SAP Certified Application Associate - S/4HANA Financial Accounting", current: false, duration: "120 min exam", vendor: "SAP" }] },
];

const included = [
  { item: "Official SAP courseware", icon: "book" },
  { item: "Cloud-based SAP S/4HANA lab environment", icon: "lab" },
  { item: "Exam preparation materials for C_TS4FI", icon: "doc" },
  { item: "Practice scenario questions (150+)", icon: "check" },
  { item: "Certificate of completion", icon: "cert" },
  { item: "Post-training support (1 year)", icon: "support" },
  { item: "Session recording access (self-paced)", icon: "video" },
  { item: "Free rescheduling (10+ days notice)", icon: "cal" },
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
          <Link href="#" className="hover:text-koenig-blue">Enterprise Applications</Link>
          <span className="mx-2">/</span>
          <BreadcrumbTechDropdown primary={course.vendor} related={course.relatedTechnologies} />
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
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01"/></svg>
                  {course.vendor}
                </span>
                {course.guaranteed && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/40 bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                    Guaranteed-to-Run
                  </span>
                )}
              </div>

              {/* Title with level badge inline */}
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
                  Financial Accounting in SAP S/4HANA - Academy Part I - TS4F01 equips aspiring SAP consultants
                  with core skills in General Ledger, Accounts Payable, Accounts Receivable, and Asset Accounting
                  configuration and processes, preparing learners for real-world implementation projects in a
                  platform used by over 40,000 customers globally.
                </p>
                <p className="mb-6 max-w-2xl text-base leading-relaxed text-white/70">
                  This official SAP course prepares you for the SAP C_TS4FI certification exam and is
                  designed for IT and finance professionals looking to specialize in SAP S/4HANA Financial
                  Accounting. Gain hands-on experience with real-world lab environments guided by a SAP
                  Certified Trainer.
                </p>
              </BannerReadMore>

              {/* Meta Row */}
              <div className="mb-6 mt-[18px] sm:mt-0 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50">
                <div className="flex items-center gap-x-4">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-white">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    <span className="text-white">{course.format}</span>
                  </div>
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

              {/* AI-based live training, any language — quote-request note */}
              <div className="mb-4 inline-flex w-fit max-w-full items-start gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                <Globe size={18} strokeWidth={1.75} className="mt-0.5 flex-shrink-0 text-sky-300" />
                <p className="text-base font-medium text-sky-200">
                  Training in <span className="font-bold text-white">any language</span>, with <span className="font-bold text-white">AI-based Live Training</span>. Tell us which one and we&apos;ll send you a quote.
                </p>
              </div>

              {/* CTA Buttons — side by side even on mobile. */}
              <div className="flex flex-row gap-3">
                <RequestInfoModal
                  courseTitle={course.title}
                  courseCode={course.code}
                  triggerClassName="flex-1 sm:flex-none whitespace-nowrap rounded-lg bg-koenig-blue px-3 sm:px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-koenig-blue/30 transition hover:bg-koenig-accent"
                />
                <DownloadSyllabusModal
                  courseTitle={course.title}
                  courseCode={course.code}
                  triggerClassName="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-white/20 bg-white/5 px-3 sm:px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
                />
              </div>
            </div>

            {/* Right: Pricing Card — desktop only */}
            <div className="hidden lg:flex lg:items-center">
            <TrainingFormatsCard
              trust="100% Happiness Guarantee · Free Rescheduling · Secure Payment"
              formats={[
                {
                  mode: "1-on-1",
                  price: course.oneOnOnePrice,
                  desc: "Dedicated instructor, your schedule\nAvailable in all languages",
                  badge: "Fastest",
                  badgeColor: "bg-sky-500/15 text-sky-300 border border-sky-500/25",
                  targetFormat: "one-on-one",
                },
                {
                  mode: "Public Batch",
                  price: course.price,
                  desc: "Group class, fixed schedule\nAvailable in all languages",
                  badge: "Most Popular",
                  badgeColor: "bg-koenig-blue/20 text-koenig-blue border border-koenig-blue/30",
                  targetFormat: "public",
                },
                {
                  mode: "SAP Learning Hub",
                  price: "INR 1,37,772",
                  desc: "Annual subscription, entire SAP portfolio\n4 exam attempts per year",
                  badge: "Best Value",
                  badgeColor: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25",
                  targetFormat: "self-paced",
                },
              ]}
            />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. Sticky Tab Navigation                                     */}
      {/* ============================================================ */}
      <StickyCourseNav />

      {/* ============================================================ */}
      {/* 6. Course Overview                                           */}
      {/* ============================================================ */}
      <section id="overview" className="!mt-[15px] relative overflow-hidden px-[15px] sm:px-6 py-[15px] sm:py-10">
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
            <ReadMore lines={3}><div className="space-y-4 text-sm leading-relaxed text-koenig-gray">
              <p>
                The Financial Accounting in SAP S/4HANA - Academy Part I - TS4F01 by SAP is a foundational
                course designed for aspiring SAP consultants and financial professionals aiming to master
                core financial processes in SAP S/4HANA. This course prepares learners for the SAP Certified
                Application Associate - SAP S/4HANA for Financial Accounting (C_TS4FI) certification exam
                and serves roles such as SAP FI Consultant, Financial Systems Analyst, and ERP Project Manager.
              </p>
              <p>
                Participants gain hands-on experience configuring key components including General Ledger
                Accounting, Accounts Payable, Accounts Receivable, and Bank Accounting using the SAP S/4HANA
                system. The course includes practical exercises in the SAP Fiori Launchpad environment, where
                students configure document types, manage posting periods, and execute cross-company
                transactions. A key lab project involves setting up a complete company code structure with
                fiscal year variants and field status groups, simulating real-world deployment scenarios
                encountered during enterprise rollouts.
              </p>
              <p>
                By the end of this course, you will have the confidence and skills to configure SAP S/4HANA
                financial processes for organizations of any size. This training directly prepares candidates
                for the globally recognized C_TS4FI certification, positioning you to lead financial
                transformation projects in the growing SAP ecosystem.
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
              {skills.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-koenig-blue/20 bg-koenig-blue/5 px-3 py-1.5 text-xs font-medium text-koenig-accent"
                >
                  {name}
                </span>
              ))}
            </div>

            {/* Topics Covered in This Course */}
            <h3 className="mb-1 mt-8 text-lg font-bold text-koenig-dark">
              Topics <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Covered</span> in This Course
            </h3>
            <p className="mb-4 text-sm text-koenig-muted">
              Extracted directly from the full course curriculum &mdash; every topic below is actually taught, module by module.
            </p>
            <div className="rounded-2xl border border-koenig-border bg-white p-5 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {curriculumTopics.map((topic, idx) => (
                  <span
                    key={topic}
                    className="inline-flex items-center gap-2 rounded-full border border-koenig-border bg-koenig-light px-3.5 py-1.5 text-xs font-medium text-koenig-dark"
                  >
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0E7C99]/15 text-[10px] font-bold text-[#0E7C99]">
                      {idx + 1}
                    </span>
                    {topic}
                  </span>
                ))}
              </div>
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
                  ["Certification", "SAP S/4HANA for Financial Accounting"],
                  ["Language", "English"],
                  ["Lab Access", "Included for course duration"],
                  ["Exam Code", "C_TS4FI"],
                  ["Passing Score", "60%"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between border-b border-koenig-border/50 pb-2 last:border-0 last:pb-0">
                    <span className="text-koenig-muted">{label}</span>
                    <span className="font-medium text-koenig-dark">{value}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. Certification Details                                     */}
      {/* ============================================================ */}
      <section className="!mt-[15px] relative overflow-hidden border-t border-koenig-border bg-koenig-light px-[15px] sm:px-6 py-[15px] sm:py-10">
        {/* Section glow blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.10) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-60 w-60 rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.08) 0%, transparent 70%)' }} />

        <div className="relative mx-auto max-w-7xl">
          <h2 className="mb-2 text-2xl font-bold text-koenig-dark">
            Certification <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Exam</span>
          </h2>
          <p className="mb-6 text-sm text-koenig-muted">
            Everything you need to know about the SAP C_TS4FI certification exam
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
                  { label: "Exam Name", value: "C_TS4FI", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
                  { label: "Exam Cost", value: "$578 (12-month subscription, 1 attempt)", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                  { label: "Format", value: "System-based, scenario-driven tasks", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
                  { label: "Duration", value: "120 minutes", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                  { label: "Passing Score", value: "60%", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
                  { label: "Validity", value: "12 months (renewal via SAP Learning Hub)", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
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
      <CourseScheduler courseTitle={course.title} courseId={course.code} />

      {/* ============================================================ */}
      {/* 8b. Request for More Information Form                        */}
      {/* ============================================================ */}
      <RequestInfoForm courseTitle={course.title} courseCode="TS4F01" />

      {/* ============================================================ */}
      {/* 8c. Individual vs Enterprise — benefit cards                 */}
      {/* ============================================================ */}
      <AudienceCards courseTitle={course.title} courseCode="TS4F01" />

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
            10 days of structured learning with hands-on labs and real-world scenarios
          </p>

          {/* Timeline accordion */}
          <div className="relative">
            {/* Vertical connecting line — aligns under the inline dots (pl-6 + 7px = 31px) */}
            <div className="absolute left-[27px] sm:left-[31px] top-3 bottom-3 w-px bg-koenig-blue/20" />

            <div className="space-y-0">
              {([
                {
                  open: true,
                  title: "Day 1-2",
                  subtitle: "Organizational Structure & Master Data",
                  topics: ["Company Codes", "Fiscal Year Variants", "Field Status Groups", "Chart of Accounts", "Business Partners", "SAP Fiori Launchpad", "Posting Periods", "Number Ranges"],
                },
                {
                  open: false,
                  title: "Day 3-5",
                  subtitle: "General Ledger & Document Processing",
                  topics: ["GL Account Structures", "Document Types", "Posting Keys", "Document Splitting", "Parallel Ledgers", "Cross-Company Transactions", "Payment Terms", "Tax Codes"],
                },
                {
                  open: false,
                  title: "Day 6-8",
                  subtitle: "Accounts Payable & Receivable",
                  topics: ["Vendor Master Data", "Customer Master Data", "Payment Processing", "Open Item Clearing", "Dunning", "Payment Program", "Bank Accounting", "Reconciliation"],
                },
                {
                  open: false,
                  title: "Day 9-10",
                  subtitle: "Reporting & Period-End Closing",
                  topics: ["Financial Reporting", "Month-End Close", "Year-End Close", "Sub-Ledger Reconciliation", "C_TS4FI Exam Prep", "Objective Mapping", "Practice Scenarios", "Period-End Simulation"],
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
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, transparent 70%)' }} />
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
      <CourseFaq faqs={course.faqs} subtitle="Everything you need to know about the TS4F01 training course" />

      {/* ============================================================ */}
      {/* 16. Resources                                                */}
      {/* ============================================================ */}
      <CourseResources />

      {/* ============================================================ */}
      {/* 18. Related Courses                                          */}
      {/* ============================================================ */}
      <section id="related" className="px-[15px] sm:px-6 py-[15px] sm:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-koenig-dark">Related <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Courses</span></h2>
              <p className="mt-1 text-sm text-koenig-muted">
                Other {course.vendor} Finance courses to advance your SAP career
              </p>
            </div>
            <button className="hidden text-sm font-medium text-koenig-blue hover:underline sm:block">
              View All SAP Courses &rarr;
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
              What&apos;s Next After <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">TS4F01?</span>
            </h2>
            <p className="text-sm text-koenig-muted">Continue your SAP Finance journey after TS4F01</p>
          </div>

          <CertificationPath certPath={certPath} />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 21. Money-Back Guarantee                                     */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden px-[15px] sm:px-6 py-[15px] sm:py-14" style={{ background: "#EAF4FB" }}>
        {/* Glow blobs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(34,197,94,0.16) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(6,148,209,0.20) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(6,148,209,0.10) 0%, transparent 70%)" }} />

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
              <div className="mb-1 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-5xl sm:text-6xl font-black text-transparent leading-none">
                100%
              </div>
              <h2 className="mb-3 text-2xl font-bold text-koenig-dark">
                Happiness <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Guarantee</span>
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-koenig-gray">
                We are so confident in the quality of our training that we back it with a 100% Happiness
                Guarantee. Free rescheduling with 10+ days notice, SAP Guaranteed-to-Run batches, and secure
                payment — every time.
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
                  label: "Free Rescheduling",
                  sub: "10+ days notice",
                  bubble: "bg-koenig-blue/10 text-koenig-blue/70",
                  glow: "rgba(6,148,209,0.18)",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                    </svg>
                  ),
                  label: "Guaranteed-to-Run",
                  sub: "Even with one student",
                  bubble: "bg-indigo-50 text-indigo-400",
                  glow: "rgba(99,102,241,0.18)",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  ),
                  label: "Secure Payment",
                  sub: "Encrypted checkout",
                  bubble: "bg-teal-50 text-teal-400",
                  glow: "rgba(20,184,166,0.18)",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  ),
                  label: "1-Year Support",
                  sub: "From your CSM",
                  bubble: "bg-sky-50 text-sky-400",
                  glow: "rgba(14,165,233,0.18)",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="relative overflow-hidden rounded-2xl border border-koenig-border bg-white p-4 shadow-sm"
                >
                  <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${item.bubble}`}>
                    {item.icon}
                  </div>
                  <div className="text-sm font-bold text-koenig-dark">{item.label}</div>
                  <div className="text-[11px] text-koenig-muted">{item.sub}</div>
                </div>
              ))}
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

export const dynamic = "force-dynamic";

import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { CourseScheduler } from "../components/course-scheduler";
import { getCachedCourseData } from "../lib/course-cache";
import { transformRmsToBatches } from "../lib/transform-batches";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Helper: safe JSON parse                                            */
/* ------------------------------------------------------------------ */
function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/* ------------------------------------------------------------------ */
/*  Helper: format date from ISO/date string                           */
/* ------------------------------------------------------------------ */
function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

/* ------------------------------------------------------------------ */
/*  Helper: smart date range formatting                                */
/* ------------------------------------------------------------------ */
function formatDateRange(startStr: string | null | undefined, endStr: string | null | undefined): string {
  if (!startStr) return '—';
  if (!endStr) return formatDate(startStr);
  try {
    const start = new Date(startStr);
    const end = new Date(endStr);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return `${formatDate(startStr)} - ${formatDate(endStr)}`;
    }
    const sMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const sDay = start.getDate();
    const eMonth = end.toLocaleDateString('en-US', { month: 'short' });
    const eDay = end.getDate();
    const sYear = start.getFullYear();
    const eYear = end.getFullYear();

    if (sYear !== eYear) {
      // Different year: "Dec 28, 2025 - Jan 2, 2026"
      return `${sMonth} ${sDay}, ${sYear} - ${eMonth} ${eDay}, ${eYear}`;
    }
    if (sMonth === eMonth) {
      // Same month: "Mar 25 - 30, 2026"
      return `${sMonth} ${sDay} - ${eDay}, ${eYear}`;
    }
    // Different month, same year: "Mar 25 - Apr 2, 2026"
    return `${sMonth} ${sDay} - ${eMonth} ${eDay}, ${eYear}`;
  } catch {
    return `${formatDate(startStr)} - ${formatDate(endStr)}`;
  }
}

/* ------------------------------------------------------------------ */
/*  Helper: batch type number to label mapping                         */
/* ------------------------------------------------------------------ */
const batchTypeMap: Record<number, { label: string; color: string }> = {
  1: { label: 'GTR', color: 'bg-green-100 text-green-700' },
  2: { label: 'Confirmed', color: 'bg-blue-100 text-blue-700' },
  3: { label: 'Scheduled', color: 'bg-gray-100 text-gray-600' },
};

function getBatchTypeBadge(type: unknown): { label: string; color: string } {
  const num = typeof type === 'number' ? type : parseInt(String(type), 10);
  return batchTypeMap[num] ?? { label: String(type || 'Online'), color: 'bg-koenig-blue/10 text-koenig-blue' };
}

/* ------------------------------------------------------------------ */
/*  Helper: sanitize RMS HTML content                                  */
/* ------------------------------------------------------------------ */
function sanitizeRmsHtml(html: string): string {
  let cleaned = html;
  // Strip empty heading/paragraph tags (with optional whitespace)
  cleaned = cleaned.replace(/<(h[1-6]|p)>\s*<\/\1>/gi, '');
  // Strip heading/paragraph tags containing only &nbsp;
  cleaned = cleaned.replace(/<(h[1-6]|p)>(\s*&nbsp;\s*)+<\/\1>/gi, '');
  // Remove &nbsp; at start of paragraphs
  cleaned = cleaned.replace(/<p>(\s*&nbsp;\s*)+/gi, '<p>');
  // Strip inline style="" attributes (including content)
  cleaned = cleaned.replace(/\s*style="[^"]*"/gi, '');
  return cleaned;
}

/* ------------------------------------------------------------------ */
/*  Helper: safe HTML truncation for hero preview                      */
/* ------------------------------------------------------------------ */
function truncateHtmlForPreview(html: string, maxLen: number = 500): string {
  // Strip all HTML tags to get plain text for hero preview
  const plainText = html.replace(/<[^>]+>/g, '').replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim();
  if (plainText.length <= maxLen) return plainText;
  // Find last complete sentence within maxLen
  const truncated = plainText.substring(0, maxLen);
  const lastPeriod = truncated.lastIndexOf('. ');
  if (lastPeriod > maxLen * 0.4) {
    return truncated.substring(0, lastPeriod + 1);
  }
  // Fallback: break at last space
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.substring(0, lastSpace > 0 ? lastSpace : maxLen) + '...';
}

/* ------------------------------------------------------------------ */
/*  Helper: format INR price with Indian locale                        */
/* ------------------------------------------------------------------ */
function formatINR(amount: number): string {
  return '\u20B9' + amount.toLocaleString('en-IN');
}

/* ------------------------------------------------------------------ */
/*  Red sample data wrapper                                            */
/* ------------------------------------------------------------------ */
function SampleData({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -left-3 top-0 bottom-0 w-1 rounded bg-red-400" />
      <div style={{ color: '#ef4444' }}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static sample data (NOT in RMS — shown in red)                     */
/* ------------------------------------------------------------------ */

const sampleObjectives = [
  "Manage Azure identities and governance",
  "Implement and manage storage solutions",
  "Deploy and manage Azure compute resources",
  "Configure and manage virtual networking",
  "Monitor and maintain Azure resources",
  "Implement backup and recovery solutions",
];

const sampleSkills = [
  "Azure AD", "Virtual Machines", "Storage Accounts", "Virtual Networking",
  "Azure Monitor", "Azure Backup", "RBAC", "ARM Templates",
  "Network Security Groups", "Load Balancer", "Azure DNS", "Azure Policy",
  "Resource Locks", "Azure Files", "Site Recovery", "Log Analytics",
];

const sampleSyllabus = [
  {
    day: "Day 1",
    title: "Identity & Governance",
    topics: ["Azure AD", "RBAC", "Subscriptions", "Azure Policy", "Management Groups", "Resource Locks", "Custom Roles", "Conditional Access"],
  },
  {
    day: "Day 2",
    title: "Storage & Compute",
    topics: ["Storage Accounts", "Blob Storage", "Azure Files", "Storage Security", "SAS Tokens", "Lifecycle Management", "Storage Tiers", "File Sync"],
  },
  {
    day: "Day 3",
    title: "Networking",
    topics: ["Virtual Machines", "App Services", "Containers", "Azure Kubernetes", "Availability Sets", "Scale Sets", "Azure Functions", "ARM Templates"],
  },
  {
    day: "Day 4",
    title: "Monitoring & Backup",
    topics: ["VNets", "NSGs", "Azure DNS", "Network Peering", "VPN Gateway", "Load Balancer", "Application Gateway", "Azure Firewall"],
  },
];

const sampleFaqs = [
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
];

const sampleReviews = [
  { stars: 5, text: "Exceptional training experience. Rajesh made complex Azure concepts easy to understand with real-world examples. The hands-on labs were incredibly well-structured and directly applicable to my job.", name: "Sarah M.", role: "Systems Administrator", company: "Enterprise IT", country: "United States", date: "Feb 2026" },
  { stars: 5, text: "I passed the AZ-104 exam on my first attempt just two weeks after completing this course. The practice questions and lab access were invaluable for exam preparation.", name: "Amit P.", role: "Cloud Engineer", company: "Consulting Firm", country: "India", date: "Jan 2026" },
  { stars: 4, text: "Great course with comprehensive coverage of all AZ-104 domains. The only suggestion would be to add more time for the networking module. Otherwise, excellent instructor and materials.", name: "Klaus W.", role: "IT Manager", company: "Manufacturing", country: "Germany", date: "Jan 2026" },
];

const sampleRatingDistribution = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 16 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

const sampleRelatedCourses = [
  { code: "AZ-900", title: "Microsoft Azure Fundamentals", vendor: "Microsoft", level: "Fundamentals", duration: "8 Hours (1 Day)", price: "$595", nextDate: "Mar 10, 2026" },
  { code: "AZ-305", title: "Designing Microsoft Azure Infrastructure Solutions", vendor: "Microsoft", level: "Expert", duration: "32 Hours (4 Days)", price: "$1,495", nextDate: "Mar 17, 2026" },
  { code: "AZ-400", title: "Designing & Implementing Microsoft DevOps Solutions", vendor: "Microsoft", level: "Expert", duration: "32 Hours (4 Days)", price: "$1,495", nextDate: "Apr 7, 2026" },
  { code: "AZ-500", title: "Microsoft Azure Security Technologies", vendor: "Microsoft", level: "Associate", duration: "32 Hours (4 Days)", price: "$1,395", nextDate: "Mar 24, 2026" },
  { code: "AZ-204", title: "Developing Solutions for Microsoft Azure", vendor: "Microsoft", level: "Associate", duration: "40 Hours (5 Days)", price: "$1,495", nextDate: "Apr 14, 2026" },
  { code: "SC-200", title: "Microsoft Security Operations Analyst", vendor: "Microsoft", level: "Associate", duration: "32 Hours (4 Days)", price: "$1,395", nextDate: "Apr 21, 2026" },
];

const sampleCertPath = [
  { tier: "Fundamentals", certs: [{ code: "AZ-900", name: "Azure Fundamentals", current: false }] },
  { tier: "Associate", certs: [{ code: "AZ-104", name: "Azure Administrator", current: true }, { code: "AZ-204", name: "Azure Developer", current: false }] },
  { tier: "Expert", certs: [{ code: "AZ-305", name: "Azure Solutions Architect", current: false }, { code: "AZ-400", name: "Azure DevOps Engineer", current: false }] },
  { tier: "Specialty", certs: [{ code: "AZ-500", name: "Azure Security Engineer", current: false }] },
];

const sampleIncluded = [
  { item: "Official Microsoft courseware", icon: "book" },
  { item: "Hands-on lab environment (30 days)", icon: "lab" },
  { item: "Exam preparation materials", icon: "doc" },
  { item: "Practice test questions (200+)", icon: "check" },
  { item: "Certificate of completion", icon: "cert" },
  { item: "Post-training support (30 days)", icon: "support" },
  { item: "Session recording access (self-paced)", icon: "video" },
  { item: "Free rescheduling (7+ days notice)", icon: "cal" },
];

const tabs = ["Overview", "Schedule", "Curriculum", "Instructor", "Reviews", "FAQs", "Related"];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function CourseLiveDataPage() {
  const data = getCachedCourseData() || {
    basic: null, content: null, pricing: null,
    onlineSchedule: [], classroomSchedule: [], feedback: [], beforeAfterCourses: [],
    lastSync: null, courseId: 0,
  };

  // Parse JSON fields from RMS
  const deliveredDetail = safeJsonParse<Array<{ Professionals?: number; SessionsCount?: number }>>(
    data.basic?.DeliveredDetail, []
  );
  const examDetails = safeJsonParse<Array<{ ExamName?: string; ExamCode?: string; ExamCost?: string }>>(
    data.basic?.CourseExamDetails, []
  );
  const courseLanguages = safeJsonParse<Array<{ Name?: string }>>(
    data.basic?.CourseLanguage, []
  );
  const breadcrumbs = safeJsonParse<Array<{ Name?: string; URL?: string }>>(
    data.basic?.CourseBreadCrumb, []
  );

  // Derived RMS values
  const courseName = data.basic?.CourseName ?? 'AZ-104: Microsoft Azure Administrator';
  const vendor = data.basic?.VName ?? 'Microsoft';
  const courseCode = data.basic?.CCode ?? 'AZ-104';
  const durationDays = data.basic?.StDuration ?? 4;
  const hours = data.basic?.Hours ?? 32;
  const isPopular = data.basic?.IsPopular;
  const isFlexiAllowed = data.basic?.IsFlexiAllowed;

  // Pricing
  const onlineGroupUSD = data.pricing?.ILO_fee_GT;
  const online1on1USD = data.pricing?.ILO_Fee_1On1;
  const groupINR = data.pricing?.PS_Fee;
  const oneOnOneINR = data.pricing?.Ps_Fee_1On1_Domestic;

  // Professionals trained
  const profsTrained = deliveredDetail[0]?.Professionals;
  const sessionsCount = deliveredDetail[0]?.SessionsCount;

  // Exam info
  const examCode = examDetails[0]?.ExamCode ?? courseCode;
  const examName = examDetails[0]?.ExamName;
  const examCost = examDetails[0]?.ExamCost;

  // Languages
  const languages = courseLanguages.map(l => l.Name).filter(Boolean).join(', ') || 'English';

  // Content from RMS
  const courseIntroHtml = data.content?.CourseIntro ?? null;
  const audienceHtml = data.content?.CouseAudience ?? null;
  const prerequisitesHtml = data.content?.CoursePreRequisites ?? null;
  const examFormatHtml = data.content?.Exam_Format ?? null;

  // Schedules
  const onlineSchedule = (data.onlineSchedule ?? []).slice(0, 12);
  const classroomSchedule = (data.classroomSchedule ?? []).slice(0, 10);

  // Feedback from RMS
  const feedback = data.feedback ?? [];

  // Before/After courses
  const beforeAfterCourses = data.beforeAfterCourses ?? [];

  // Price display helpers
  const primaryPriceUSD = onlineGroupUSD ? `$${onlineGroupUSD.toLocaleString()}` : '$1,295';
  const oneOnOnePriceUSD = online1on1USD ? `$${online1on1USD.toLocaleString()}` : '$1,995';
  const primaryPriceINR = groupINR ? formatINR(groupINR) : null;

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================================ */}
      {/* 1. Back Link Bar                                             */}
      {/* ============================================================ */}
      <div className="bg-koenig-dark px-6 py-2 text-center text-xs text-white/60">
        <Link href="/" className="hover:text-white">
          &larr; Back to all designs
        </Link>
        <span className="mx-4">|</span>
        <span className="font-medium text-koenig-blue">
          Course Detail Page &mdash; Live RMS Data
        </span>
      </div>

      {/* ============================================================ */}
      {/* LIVE DATA DEMO Banner                                        */}
      {/* ============================================================ */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 text-center text-xs">
        <strong>LIVE DATA DEMO</strong> — Black text = real RMS data | <span style={{ color: '#ef4444' }}>Red text = sample data (needs enrichment in RMS)</span>
      </div>

      {/* ============================================================ */}
      {/* 2. Nav                                                       */}
      {/* ============================================================ */}
      <Nav variant="dark" />

      {/* ============================================================ */}
      {/* 3. Breadcrumb                                                */}
      {/* ============================================================ */}
      <div className="border-b border-koenig-border bg-koenig-light px-6 py-3">
        <div className="mx-auto max-w-7xl text-xs text-koenig-muted">
          <Link href="/" className="hover:text-koenig-blue">Home</Link>
          <span className="mx-2">/</span>
          {breadcrumbs.length > 0 ? (
            breadcrumbs.map((bc, i) => (
              <span key={i}>
                {bc.URL ? (
                  <Link href={bc.URL} className="hover:text-koenig-blue">{bc.Name}</Link>
                ) : (
                  <span className="font-medium text-koenig-dark">{bc.Name}</span>
                )}
                {i < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
              </span>
            ))
          ) : (
            <>
              <span style={{ color: '#ef4444' }}>
                <Link href="#" className="hover:text-koenig-blue" style={{ color: '#ef4444' }}>Cloud Computing</Link>
              </span>
              <span className="mx-2">/</span>
              <Link href="#" className="hover:text-koenig-blue">{vendor}</Link>
              <span className="mx-2">/</span>
              <span className="font-medium text-koenig-dark">{courseCode}</span>
            </>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. Course Hero                                               */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-koenig-navy via-koenig-navy to-koenig-dark px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Left: Course Info */}
            <div className="lg:col-span-2">
              {/* Badges */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-koenig-blue/20 px-3 py-1 text-xs font-semibold text-koenig-blue">
                  {vendor}
                </span>
                <span className="rounded-md bg-white/10 px-3 py-1 text-xs text-white/70" style={{ color: '#ef4444' }}>
                  Cloud Computing
                </span>
                <span className="rounded-md bg-white/10 px-3 py-1 text-xs text-white/70" style={{ color: '#ef4444' }}>
                  Associate
                </span>
                {isPopular && (
                  <span className="rounded-md bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                    Popular
                  </span>
                )}
                {isFlexiAllowed && (
                  <span className="rounded-md bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-400">
                    Flexi Available
                  </span>
                )}
                <span className="rounded-md bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                  Guaranteed-to-Run
                </span>
              </div>

              {/* Title — from RMS */}
              <h1 className="mb-4 text-3xl font-bold leading-tight text-white lg:text-4xl">
                {courseName}
              </h1>

              {/* Description — from RMS CourseIntro if available, else sample */}
              {courseIntroHtml ? (
                <p className="mb-6 max-w-2xl text-base leading-relaxed text-white/70">
                  {truncateHtmlForPreview(sanitizeRmsHtml(courseIntroHtml), 500)}
                </p>
              ) : (
                <div style={{ color: '#ef4444' }}>
                  <p className="mb-3 max-w-2xl text-base leading-relaxed" style={{ color: '#ef4444', opacity: 0.7 }}>
                    Master the skills needed to manage Azure subscriptions, secure identities, administer
                    infrastructure, configure virtual networking, connect Azure and on-premises sites,
                    manage network traffic, implement storage solutions, and create and scale virtual machines.
                  </p>
                </div>
              )}

              {/* YouTube Intro Video */}
              {data.content?.CourseIntroYouTubVideos && (
                <div className="mb-6">
                  <div className="max-w-2xl overflow-hidden rounded-xl border border-white/10">
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${
                        data.content.CourseIntroYouTubVideos.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)?.[1]
                        ?? data.content.CourseIntroYouTubVideos
                      }`}
                      title="Course Introduction Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {/* Meta Row */}
              <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-white">{hours} Hours ({durationDays} Days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  <span className="text-white">Live Online / Classroom</span>
                </div>
                <div className="flex items-center gap-1" style={{ color: '#ef4444' }}>
                  <span className="text-yellow-400">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                  <span className="ml-1 font-medium" style={{ color: '#ef4444' }}>4.8</span>
                  <span className="ml-1" style={{ color: '#ef4444' }}>(2,340 reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {profsTrained ? (
                    <span>{profsTrained.toLocaleString()}+ professionals trained</span>
                  ) : (
                    <span style={{ color: '#ef4444' }}>44,776+ professionals trained</span>
                  )}
                </div>
                {sessionsCount && (
                  <div className="flex items-center gap-2">
                    <span>{sessionsCount.toLocaleString()} sessions delivered</span>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="rounded-lg bg-koenig-blue px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-koenig-blue/30 transition hover:bg-koenig-accent">
                  Enroll Now &mdash; {primaryPriceUSD}
                  {primaryPriceINR && <span className="ml-1 text-xs opacity-70">({primaryPriceINR})</span>}
                </button>
                {data.basic?.UploadFilePath ? (
                  <a
                    href={`https://www.koenig-solutions.com${data.basic.UploadFilePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10 inline-flex items-center gap-2"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Download Syllabus
                  </a>
                ) : (
                  <button className="rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/50 cursor-not-allowed" disabled>
                    Download Syllabus
                  </button>
                )}
                <button className="rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10">
                  Request 1-on-1 Quote
                </button>
              </div>
            </div>

            {/* Right: Pricing Card */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:self-start">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/80">
                Training Formats &amp; Pricing
              </h3>

              <div className="space-y-3">
                {[
                  {
                    mode: "1-on-1",
                    price: online1on1USD ? `$${online1on1USD.toLocaleString()}` : oneOnOnePriceUSD,
                    priceINR: oneOnOneINR ? formatINR(oneOnOneINR) : null,
                    desc: "Dedicated instructor, your schedule",
                    badge: "Fastest",
                    badgeColor: "bg-purple-500/20 text-purple-300",
                    isRealPrice: !!online1on1USD || !!oneOnOneINR,
                  },
                  {
                    mode: "Public Batch",
                    price: onlineGroupUSD ? `$${onlineGroupUSD.toLocaleString()}` : primaryPriceUSD,
                    priceINR: groupINR ? formatINR(groupINR) : null,
                    desc: "Group class, fixed schedule",
                    badge: "Most Popular",
                    badgeColor: "bg-koenig-blue/20 text-koenig-blue",
                    isRealPrice: !!onlineGroupUSD || !!groupINR,
                  },
                  {
                    mode: "Self-Paced",
                    price: "$495",
                    priceINR: null,
                    desc: "Recorded sessions, learn anytime",
                    badge: "Best Value",
                    badgeColor: "bg-green-500/20 text-green-300",
                    isRealPrice: false,
                  },
                ].map((opt) => (
                  <div
                    key={opt.mode}
                    className={`rounded-lg border p-4 transition ${
                      opt.mode === "Public Batch"
                        ? "border-koenig-blue bg-koenig-blue/10 ring-1 ring-koenig-blue/30"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{opt.mode}</span>
                      <span
                        className="text-lg font-bold text-white"
                        style={opt.isRealPrice ? undefined : { color: '#ef4444' }}
                      >
                        {opt.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/50">
                        {opt.desc}
                        {opt.priceINR && (
                          <span className="ml-1">({opt.priceINR})</span>
                        )}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${opt.badgeColor}`}>
                        {opt.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full rounded-lg bg-koenig-blue py-3 text-sm font-bold text-white shadow-lg shadow-koenig-blue/30 transition hover:bg-koenig-accent">
                Enroll Now
              </button>
              <p className="mt-3 text-center text-[11px] text-white/40">
                100% Happiness Guarantee &middot; Free Rescheduling &middot; Secure Payment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. Sticky Tab Navigation                                     */}
      {/* ============================================================ */}
      <div className="sticky top-0 z-20 border-b border-koenig-border bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl gap-0 overflow-x-auto px-6">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`whitespace-nowrap border-b-2 px-5 py-3.5 text-sm font-medium transition ${
                i === 0
                  ? "border-koenig-blue text-koenig-blue"
                  : "border-transparent text-koenig-muted hover:border-koenig-border hover:text-koenig-dark"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 6. Course Overview                                           */}
      {/* ============================================================ */}
      <section id="overview" className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-koenig-dark">
              Course Overview
            </h2>

            {/* Course Intro — from RMS if available */}
            {courseIntroHtml ? (
              <div
                className="space-y-4 text-sm leading-relaxed text-koenig-gray [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_strong]:font-semibold [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-base [&_h3]:font-bold [&_h3]:mt-3 [&_h3]:mb-2"
                dangerouslySetInnerHTML={{ __html: sanitizeRmsHtml(courseIntroHtml) }}
              />
            ) : (
              <SampleData>
                <div className="space-y-4 text-sm leading-relaxed">
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
                </div>
              </SampleData>
            )}

            {/* Target Audience — from RMS if available */}
            {audienceHtml && (
              <>
                <h3 className="mb-5 mt-12 text-lg font-bold text-koenig-dark">
                  Target Audience
                </h3>
                <div
                  className="text-sm leading-relaxed text-koenig-gray [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: sanitizeRmsHtml(audienceHtml) }}
                />
              </>
            )}

            {/* What You'll Learn — NOT IN RMS */}
            <h3 className="mb-5 mt-12 text-lg font-bold text-koenig-dark">
              What You&apos;ll Learn
            </h3>
            <SampleData>
              <div className="grid gap-3 sm:grid-cols-2">
                {sampleObjectives.map((obj) => (
                  <div
                    key={obj}
                    className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50/30 p-4"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-400 text-xs font-bold text-white">
                      &#10003;
                    </span>
                    <span className="text-sm">{obj}</span>
                  </div>
                ))}
              </div>
            </SampleData>

            {/* Skills You'll Gain — NOT IN RMS */}
            <h3 className="mb-5 mt-12 text-lg font-bold text-koenig-dark">
              Skills You&apos;ll Gain
            </h3>
            <SampleData>
              <div className="flex flex-wrap gap-2">
                {sampleSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-red-300/30 bg-red-50/30 px-4 py-1.5 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </SampleData>

            {/* Prerequisites — from RMS if available */}
            <h3 className="mb-5 mt-12 text-lg font-bold text-koenig-dark">
              Prerequisites
            </h3>
            {prerequisitesHtml ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
                <p className="mb-4 text-xs font-medium uppercase tracking-wide text-amber-700">
                  Recommended knowledge before taking this course
                </p>
                <div
                  className="text-sm leading-relaxed text-koenig-gray [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_li]:flex [&_li]:items-center [&_li]:gap-3"
                  dangerouslySetInnerHTML={{ __html: sanitizeRmsHtml(prerequisitesHtml) }}
                />
                <p className="mt-4 text-xs text-koenig-muted">
                  Not sure if you meet the prerequisites?{" "}
                  <Link href="#" className="font-medium text-koenig-blue hover:underline">
                    Take our free readiness assessment
                  </Link>
                </p>
              </div>
            ) : (
              <SampleData>
                <div className="rounded-lg border border-red-200 bg-red-50/30 p-6">
                  <p className="mb-4 text-xs font-medium uppercase tracking-wide" style={{ color: '#b91c1c' }}>
                    Recommended knowledge before taking this course
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Understanding of on-premises virtualization technologies",
                      "Networking fundamentals (TCP/IP, DNS, VPNs)",
                      "Basic PowerShell or Azure CLI experience",
                      "Familiarity with Azure portal navigation",
                    ].map((pre) => (
                      <li key={pre} className="flex items-center gap-3 text-sm">
                        <span className="flex h-2 w-2 flex-shrink-0 rounded-full bg-red-400" />
                        {pre}
                      </li>
                    ))}
                  </ul>
                </div>
              </SampleData>
            )}
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
                  { label: "Course Code", value: courseCode, isReal: true },
                  { label: "Duration", value: `${hours} Hours (${durationDays} Days)`, isReal: true },
                  { label: "Level", value: "Associate", isReal: false },
                  { label: "Vendor", value: vendor, isReal: true },
                  { label: "Format", value: "Live Online / Classroom", isReal: true },
                  { label: "Certification", value: examName || "Azure Administrator Associate", isReal: !!examName },
                  { label: "Language", value: languages, isReal: courseLanguages.length > 0 },
                  { label: "Lab Access", value: "30 days included", isReal: false },
                  { label: "Exam Code", value: examCode, isReal: examDetails.length > 0 },
                  { label: "Exam Cost", value: examCost ? `\u20B9${examCost}` : "$165", isReal: !!examCost },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b border-koenig-border/50 pb-2 last:border-0 last:pb-0">
                    <span className="text-koenig-muted">{item.label}</span>
                    <span
                      className="font-medium text-koenig-dark"
                      style={item.isReal ? undefined : { color: '#ef4444' }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Batch Highlight — from RMS schedule if available */}
            <div className="rounded-xl border-2 border-koenig-blue bg-gradient-to-br from-koenig-light to-white p-6 shadow-sm">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-koenig-blue">
                Next Guaranteed Batch
              </div>
              {onlineSchedule.length > 0 ? (
                <>
                  <div className="mb-1 text-xl font-bold text-koenig-dark">
                    {formatDateRange(onlineSchedule[0]?.StartDate, onlineSchedule[0]?.EndDate)}
                  </div>
                  <div className="mb-4 text-xs text-koenig-muted">
                    {onlineSchedule[0]?.Mode || 'Online'} &middot; {onlineSchedule[0]?.TimeZone || 'IST'}
                  </div>
                </>
              ) : (
                <div style={{ color: '#ef4444' }}>
                  <div className="mb-1 text-xl font-bold">
                    Mar 3 - Mar 7, 2026
                  </div>
                  <div className="mb-4 text-xs">
                    Online &middot; 8 seats left &middot; Filling fast
                  </div>
                </div>
              )}
              <button className="w-full rounded-lg bg-koenig-blue py-3 text-sm font-bold text-white shadow-md shadow-koenig-blue/20 transition hover:bg-koenig-accent">
                Reserve Your Seat
              </button>
            </div>

            {/* Enterprise CTA */}
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-koenig-navy to-koenig-dark p-6 shadow-sm">
              <h4 className="mb-2 text-sm font-bold text-white">
                Training 5+ employees?
              </h4>
              <p className="mb-4 text-xs leading-relaxed text-white/60">
                Get volume discounts up to 30%, a dedicated account manager, custom scheduling, and
                progress reporting for your team.
              </p>
              <button className="w-full rounded-lg border border-white/20 bg-white/5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                Get Corporate Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. Certification Details                                     */}
      {/* ============================================================ */}
      <section className="border-t border-koenig-border bg-koenig-light px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-2xl font-bold text-koenig-dark">
            Certification Details
          </h2>
          <p className="mb-8 text-sm text-koenig-muted">
            Everything you need to know about the {examCode} {vendor} certification exam
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Exam Details Card */}
            <div className="rounded-xl border border-koenig-border bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-koenig-dark">Exam Information</h3>

              {/* If we have exam format HTML from RMS, show it */}
              {examFormatHtml ? (
                <div
                  className="text-sm text-koenig-gray [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-koenig-border [&_td]:p-3 [&_th]:border [&_th]:border-koenig-border [&_th]:bg-koenig-light [&_th]:p-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-bold [&_tr]:hover:bg-koenig-light/50"
                  dangerouslySetInnerHTML={{ __html: sanitizeRmsHtml(examFormatHtml) }}
                />
              ) : null}

              <div className="grid grid-cols-2 gap-4 mt-4">
                {[
                  { label: "Exam Name", value: examCode, isReal: examDetails.length > 0 },
                  { label: "Exam Cost", value: examCost ? `\u20B9${examCost}` : "$165 (bundle available)", isReal: !!examCost },
                  { label: "Format", value: "Multiple choice, labs & case studies", isReal: false },
                  { label: "Questions", value: "40-60 questions", isReal: false },
                  { label: "Duration", value: "2 hours", isReal: false },
                  { label: "Passing Score", value: "700 / 1000", isReal: false },
                  { label: "Validity", value: "1 year (renewal required)", isReal: false },
                  { label: "Retake Policy", value: "24hr wait, then 14-day wait", isReal: false },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-koenig-light p-3">
                    <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-koenig-muted">
                      {item.label}
                    </div>
                    <div
                      className="text-sm font-semibold text-koenig-dark"
                      style={item.isReal ? undefined : { color: '#ef4444' }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification Path Card — PARTIAL from beforeAfterCourses */}
            <div className="rounded-xl border border-koenig-border bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-koenig-dark">Certification Path</h3>
              <p className="mb-6 text-sm text-koenig-muted">
                Where {courseCode} fits in the {vendor} certification journey
              </p>

              {beforeAfterCourses.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-koenig-muted mb-3">Related Courses from RMS</p>
                  {beforeAfterCourses.slice(0, 6).map((c: { CId?: number; CName?: string; CCode?: string; CourseURL?: string }) => (
                    <div key={c.CId} className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-koenig-light text-xs font-bold text-koenig-muted">
                          {c.CCode?.substring(0, 6) || '?'}
                        </div>
                      </div>
                      <div className="flex-1 rounded-lg border border-koenig-border p-3">
                        <span className="text-sm font-bold text-koenig-dark">{c.CCode}</span>
                        <span className="ml-2 text-sm text-koenig-gray">{c.CName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <SampleData>
                  <div className="space-y-4">
                    {[
                      { step: "AZ-900", label: "Azure Fundamentals", tier: "Fundamentals", active: false },
                      { step: "AZ-104", label: "Azure Administrator", tier: "Associate", active: true },
                      { step: "AZ-305", label: "Azure Solutions Architect", tier: "Expert", active: false },
                    ].map((item, i) => (
                      <div key={item.step} className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${
                              item.active
                                ? "bg-red-400 text-white ring-4 ring-red-200"
                                : "bg-red-50 text-red-400"
                            }`}
                          >
                            {i + 1}
                          </div>
                          {i < 2 && <div className="h-4 w-0.5 bg-red-200" />}
                        </div>
                        <div className={`flex-1 rounded-lg border p-3 ${
                          item.active
                            ? "border-red-300 bg-red-50/50"
                            : "border-red-200"
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-bold">{item.step}</span>
                              <span className="ml-2 text-sm">{item.label}</span>
                            </div>
                            <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-red-50">
                              {item.tier}
                            </span>
                          </div>
                          {item.active && (
                            <div className="mt-1 text-xs font-semibold">
                              &#8594; You are here
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </SampleData>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ============================================================ */}
      {/* 8. Schedule & Pricing — CourseScheduler with RMS Data        */}
      {/* ============================================================ */}
      <CourseScheduler initialBatches={transformRmsToBatches(
        data.onlineSchedule ?? [],
        data.classroomSchedule ?? [],
        data.pricing
      )} />
      {/* ============================================================ */}
      {/* 9. Detailed Curriculum                                        */}
      {/* ============================================================ */}
      <section id="curriculum" className="border-t border-koenig-border bg-koenig-light px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-2xl font-bold text-koenig-dark">
            Course Curriculum
          </h2>
          <p className="mb-8 text-sm text-koenig-muted">
            {durationDays} days of structured learning with hands-on labs and real-world scenarios
          </p>

          {data.content?.CourseContent ? (
            <div
              className="rounded-xl border border-koenig-border bg-white p-8 shadow-sm text-sm leading-relaxed text-koenig-gray [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-semibold [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-koenig-dark [&_h3]:text-base [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-koenig-dark [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-koenig-border [&_td]:p-3 [&_th]:border [&_th]:border-koenig-border [&_th]:bg-koenig-light [&_th]:p-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-bold"
              dangerouslySetInnerHTML={{ __html: sanitizeRmsHtml(data.content.CourseContent) }}
            />
          ) : (
          <SampleData>
            <div className="space-y-4">
              {sampleSyllabus.map((day, idx) => (
                <details key={day.day} open={idx === 0} className="group rounded-xl border border-red-200 bg-white shadow-sm">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-400 text-sm font-bold text-white">
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold">{day.day}</h3>
                        <p className="text-xs">{day.title}</p>
                      </div>
                    </div>
                    <svg className="h-4 w-4 flex-shrink-0 transition group-open:rotate-180" style={{ color: '#ef4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="border-t border-red-200 px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      {day.topics.map((topic) => (
                        <span key={topic} className="rounded-full border border-red-300/30 bg-red-50/30 px-4 py-1.5 text-xs font-medium">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </SampleData>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. Meet the Instructor                                       */}
      {/* ============================================================ */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-bold text-koenig-dark">
            Meet Your Instructor
          </h2>

          {data.content?.AdvisorName ? (
            <div className="rounded-xl border border-koenig-border bg-white p-8 shadow-sm">
              <div className="grid gap-8 md:grid-cols-3">
                {/* Photo + Name */}
                <div className="flex flex-col items-center text-center">
                  {data.content.AdvisorProfilePic ? (
                    <img
                      src={`https://www.koenig-solutions.com${data.content.AdvisorProfilePic}`}
                      alt={data.content.AdvisorName}
                      className="mb-4 h-28 w-28 rounded-full object-cover"
                    />
                  ) : (
                    <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-koenig-light text-3xl text-koenig-muted">
                      &#128100;
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-koenig-dark">{data.content.AdvisorName}</h3>
                  {data.content.AdvisorSkillSet && (
                    <p className="mt-1 text-xs text-koenig-muted">
                      {data.content.AdvisorSkillSet}
                    </p>
                  )}

                  {data.content.AdvisorAdvisorExperience && (
                    <div className="mt-5 grid w-full grid-cols-1 gap-3">
                      <div className="rounded-lg bg-koenig-light p-2">
                        <div className="text-sm font-bold text-koenig-dark">{data.content.AdvisorAdvisorExperience}+</div>
                        <div className="text-[10px] text-koenig-muted">Years Experience</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  {data.content.AdvisorDescription ? (
                    <div
                      className="text-sm leading-relaxed text-koenig-gray [&_p]:mb-3"
                      dangerouslySetInnerHTML={{ __html: sanitizeRmsHtml(data.content.AdvisorDescription) }}
                    />
                  ) : (
                    <p className="text-sm leading-relaxed text-koenig-muted italic">
                      Instructor biography coming soon.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
          <SampleData>
            <div className="rounded-xl border border-red-200 bg-white p-8 shadow-sm">
              <div className="grid gap-8 md:grid-cols-3">
                {/* Photo + Name */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-red-50 text-3xl" style={{ color: '#ef4444' }}>
                    &#128100;
                  </div>
                  <h3 className="text-lg font-bold">Rajesh Kumar</h3>
                  <p className="mt-1 text-xs">
                    Microsoft Certified Trainer (MCT) | Azure Solutions Architect Expert
                  </p>

                  {/* Stats */}
                  <div className="mt-5 grid w-full grid-cols-3 gap-3">
                    {[
                      { value: "12+", label: "Years Exp." },
                      { value: "5,000+", label: "Students" },
                      { value: "4.9", label: "Avg Rating" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-lg bg-red-50/50 p-2">
                        <div className="text-sm font-bold">{s.value}</div>
                        <div className="text-[10px]">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <p className="mb-4 text-sm leading-relaxed">
                    Rajesh is a seasoned cloud architect and Microsoft Certified Trainer with over 12 years of
                    experience helping organizations migrate to and optimize their Azure environments. He has
                    trained over 5,000 IT professionals across 30+ countries and is known for his practical,
                    real-world approach to teaching complex cloud concepts.
                  </p>
                  <p className="mb-6 text-sm leading-relaxed">
                    His training sessions combine theoretical foundations with hands-on labs, ensuring that
                    participants not only understand Azure services but can confidently implement and manage
                    them in production environments. Rajesh regularly contributes to the Azure community
                    through blogs, webinars, and speaking engagements at technology conferences.
                  </p>

                  {/* Certifications */}
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wide">
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["AZ-305", "AZ-104", "AZ-900", "MS-900"].map((cert) => (
                      <span
                        key={cert}
                        className="rounded-full border border-red-300/30 bg-red-50/30 px-4 py-1.5 text-xs font-bold"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SampleData>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. Reviews & Ratings                                        */}
      {/* ============================================================ */}
      <section id="reviews" className="border-t border-koenig-border bg-koenig-light px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-bold text-koenig-dark">
            Student Reviews
          </h2>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Overall Rating — NOT IN RMS */}
            <SampleData className="lg:col-span-1">
              <div className="rounded-xl border border-red-200 bg-white p-8 shadow-sm">
                <div className="mb-2 text-center text-5xl font-bold">4.8</div>
                <div className="mb-1 text-center text-yellow-400">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="mb-6 text-center text-xs">
                  Based on 2,340 reviews
                </p>

                {/* Distribution */}
                <div className="space-y-2">
                  {sampleRatingDistribution.map((r) => (
                    <div key={r.stars} className="flex items-center gap-3 text-sm">
                      <span className="w-4 text-right text-xs font-medium">{r.stars}</span>
                      <span className="text-yellow-400">&#9733;</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-red-50">
                        <div
                          className="h-full rounded-full bg-red-400"
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs">{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </SampleData>

            {/* Review Cards — mix real feedback + sample */}
            <div className="space-y-4 lg:col-span-2">
              {/* Real RMS feedback first */}
              {feedback.slice(0, 3).map((review: Record<string, unknown>, idx: number) => (
                <div
                  key={idx}
                  className="rounded-xl border border-koenig-border bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-koenig-dark">
                        {(review.PseudoName as string) || (review.ClientName as string) || 'Anonymous'}
                      </span>
                      {review.Country && (
                        <span className="ml-2 text-xs text-koenig-muted">
                          {review.Country as string}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-koenig-muted">
                      {review.FeedbackDate ? formatDate(review.FeedbackDate as string) : ''}
                    </span>
                  </div>
                  <div className="mb-2 text-yellow-400">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </div>
                  <p className="text-sm leading-relaxed text-koenig-gray">
                    {(review.Feedback as string) || (review.PromptFeedback as string) || ''}
                  </p>
                </div>
              ))}

              {/* If less than 3 real reviews, fill with sample */}
              {feedback.length < 3 && (
                <SampleData>
                  {sampleReviews.slice(feedback.length, 3).map((review) => (
                    <div
                      key={review.name}
                      className="rounded-xl border border-red-200 bg-white p-6 shadow-sm mb-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold">{review.name}</span>
                          <span className="ml-2 text-xs">
                            {review.role}, {review.company}
                          </span>
                        </div>
                        <span className="text-xs">{review.date}</span>
                      </div>
                      <div className="mb-2 text-yellow-400">
                        {Array.from({ length: review.stars }, (_, i) => (
                          <span key={i}>&#9733;</span>
                        ))}
                        {Array.from({ length: 5 - review.stars }, (_, i) => (
                          <span key={i} className="text-red-200">&#9733;</span>
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </SampleData>
              )}

              <button className="w-full rounded-xl border border-koenig-border bg-white py-4 text-center text-sm font-semibold text-koenig-blue shadow-sm transition hover:bg-koenig-light" style={feedback.length > 3 ? undefined : { color: '#ef4444' }}>
                See All {feedback.length > 0 ? feedback.length : '2,340'} Reviews &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. Skills You'll Gain — NOT IN RMS                          */}
      {/* ============================================================ */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-koenig-dark">
            Skills You&apos;ll Gain
          </h2>
          <p className="mb-8 text-center text-sm text-koenig-muted">
            In-demand skills that employers are actively seeking
          </p>

          <SampleData>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Azure Administration",
                "Identity Management",
                "Virtual Networking",
                "Storage Solutions",
                "VM Management",
                "Cost Optimization",
                "Security Best Practices",
                "Monitoring & Diagnostics",
                "Disaster Recovery",
                "Azure CLI/PowerShell",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-red-300/30 bg-red-50/30 px-5 py-2 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </SampleData>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 13. Hands-On Lab Environment — NOT IN RMS                    */}
      {/* ============================================================ */}
      <section className="border-t border-koenig-border bg-koenig-light px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-koenig-dark">
            Hands-On Lab Environment
          </h2>
          <p className="mb-8 text-center text-sm text-koenig-muted">
            Practice in a real Azure environment
          </p>

          <SampleData>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Live Azure Sandbox",
                  desc: "Practice in a real Azure subscription with full access to services covered in the course.",
                  icon: "&#9729;",
                },
                {
                  title: "30+ Guided Labs",
                  desc: "Step-by-step lab exercises designed to reinforce each module with practical, hands-on tasks.",
                  icon: "&#128218;",
                },
                {
                  title: "Lab Manual Included",
                  desc: "Comprehensive lab guide with detailed instructions, screenshots, and troubleshooting tips.",
                  icon: "&#128203;",
                },
                {
                  title: "Post-Training Access",
                  desc: "30 days of extended lab access after your training ends so you can continue practicing.",
                  icon: "&#128274;",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-red-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
                    <span dangerouslySetInnerHTML={{ __html: feature.icon }} />
                  </div>
                  <h3 className="mb-2 text-sm font-bold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </SampleData>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 14. Career Outcomes — EMPTY IN RMS                           */}
      {/* ============================================================ */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-koenig-dark">
            Career Outcomes
          </h2>
          <p className="mb-10 text-center text-sm text-koenig-muted">
            What {examCode} certified professionals can expect based on industry data
          </p>

          <SampleData>
            {/* Headline Stat */}
            <div className="mb-10 rounded-xl bg-gradient-to-r from-red-400 to-red-500 p-8 text-center shadow-lg">
              <div className="text-3xl font-bold text-white">86%</div>
              <p className="mt-2 text-sm text-white/80">
                of {examCode} certified professionals report career advancement within 6 months
              </p>
            </div>

            {/* Outcome Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Salary Impact */}
              <div className="rounded-xl border border-red-200 bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
                  &#36;
                </div>
                <h3 className="mb-2 text-lg font-bold">Salary Impact</h3>
                <div className="mb-2 text-3xl font-bold">+26%</div>
                <p className="mb-3 text-sm">
                  Average salary increase reported after obtaining the {examCode} certification
                </p>
                <div className="rounded-lg bg-red-50/50 p-3">
                  <div className="text-xs">Typical Salary Range</div>
                  <div className="text-sm font-bold">$95,000 &mdash; $145,000</div>
                </div>
              </div>

              {/* Job Roles */}
              <div className="rounded-xl border border-red-200 bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
                  &#9881;
                </div>
                <h3 className="mb-4 text-lg font-bold">Job Roles</h3>
                <ul className="space-y-2.5">
                  {["Azure Administrator", "Cloud Engineer", "Systems Administrator", "DevOps Engineer", "Infrastructure Engineer", "Cloud Consultant"].map((role) => (
                    <li key={role} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      {role}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Companies Hiring */}
              <div className="rounded-xl border border-red-200 bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
                  &#127970;
                </div>
                <h3 className="mb-4 text-lg font-bold">Companies Hiring</h3>
                <div className="flex flex-wrap gap-2">
                  {["Microsoft", "Amazon", "Deloitte", "Accenture", "Wipro", "Infosys", "TCS", "Capgemini", "IBM", "Google"].map((company) => (
                    <span
                      key={company}
                      className="rounded-full border border-red-200 bg-red-50/30 px-3 py-1.5 text-xs font-medium"
                    >
                      {company}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs">
                  and 5,000+ organizations worldwide seeking {examCode} certified professionals
                </p>
              </div>
            </div>
          </SampleData>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 15. FAQs — NOT IN RMS                                        */}
      {/* ============================================================ */}
      <section id="faqs" className="border-t border-koenig-border bg-koenig-light px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-2xl font-bold text-koenig-dark">
            Frequently Asked Questions
          </h2>
          <p className="mb-8 text-sm text-koenig-muted">
            Everything you need to know about the {courseCode} training course
          </p>

          <SampleData>
            <div className="grid gap-4 md:grid-cols-2">
              {sampleFaqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-red-200 bg-white shadow-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4">
                    <h4 className="text-sm font-semibold pr-4">{faq.q}</h4>
                    <svg className="h-4 w-4 flex-shrink-0 transition group-open:rotate-180" style={{ color: '#ef4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="border-t border-red-200 px-6 py-4">
                    <p className="text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </SampleData>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 16. What's Included — NOT IN RMS                             */}
      {/* ============================================================ */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-koenig-dark">
            What&apos;s Included in Your Training
          </h2>
          <p className="mb-10 text-center text-sm text-koenig-muted">
            Every enrollment comes packed with resources to maximize your learning and exam success
          </p>

          <SampleData>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sampleIncluded.map((item) => (
                <div
                  key={item.item}
                  className="flex items-start gap-3 rounded-xl border border-red-200 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-sm">
                    &#10003;
                  </span>
                  <span className="text-sm font-medium">{item.item}</span>
                </div>
              ))}
            </div>
          </SampleData>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 17. Money-Back Guarantee                                     */}
      {/* ============================================================ */}
      <section className="border-t border-koenig-border bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            &#128737;
          </div>
          <h2 className="mb-3 text-2xl font-bold text-koenig-dark">
            100% Happiness Guarantee
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-koenig-gray">
            We are so confident in the quality of our training that we offer a full money-back guarantee.
            If you are not completely satisfied with your learning experience, contact us within 24 hours
            of your first session and we will process a complete refund &mdash; no questions asked.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-koenig-muted">
            <div className="flex items-center gap-2">
              <span className="text-green-500">&#10003;</span>
              Full refund within 24 hours
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">&#10003;</span>
              No questions asked
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">&#10003;</span>
              Secure payment processing
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">&#10003;</span>
              PCI DSS compliant
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 18. Related Courses — NULL IN RMS                            */}
      {/* ============================================================ */}
      <section id="related" className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-koenig-dark">Related Courses</h2>
              <p className="mt-1 text-sm text-koenig-muted">
                Other {vendor} courses to advance your cloud career
              </p>
            </div>
            <button className="hidden text-sm font-medium text-koenig-blue hover:underline sm:block">
              View All {vendor} Courses &rarr;
            </button>
          </div>

          <SampleData>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sampleRelatedCourses.map((c) => (
                <div
                  key={c.code}
                  className="group rounded-xl border border-red-200 bg-white p-6 shadow-sm transition hover:border-red-300 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-bold">
                      {c.code}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      c.level === "Expert"
                        ? "bg-purple-50 text-purple-700"
                        : c.level === "Fundamentals"
                        ? "bg-green-50 text-green-700"
                        : "bg-blue-50 text-blue-700"
                    }`} style={undefined}>
                      {c.level}
                    </span>
                  </div>
                  <h4 className="mb-2 text-sm font-bold leading-snug">
                    {c.title}
                  </h4>
                  <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    <span>{c.vendor}</span>
                    <span>{c.duration}</span>
                  </div>
                  <div className="mb-4 flex items-center justify-between border-t border-red-200 pt-3">
                    <div>
                      <div className="text-xs">Next date</div>
                      <div className="text-sm font-medium">{c.nextDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs">From</div>
                      <div className="text-lg font-bold">{c.price}</div>
                    </div>
                  </div>
                  <button className="w-full rounded-lg bg-red-400 py-2.5 text-xs font-semibold text-white transition hover:bg-red-500">
                    View Course
                  </button>
                </div>
              ))}
            </div>
          </SampleData>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 19. Certification Path — PARTIAL (before/after courses)      */}
      {/* ============================================================ */}
      <section className="border-t border-koenig-border bg-koenig-light px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-koenig-dark">
            {vendor} Certification Path
          </h2>
          <p className="mb-10 text-center text-sm text-koenig-muted">
            Plan your learning journey through the complete certification tree
          </p>

          {beforeAfterCourses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {beforeAfterCourses.map((c: { CId?: number; CName?: string; CCode?: string; CourseURL?: string }) => (
                <div
                  key={c.CId}
                  className="rounded-xl border-2 border-koenig-border bg-white p-4 transition hover:border-koenig-blue/30"
                >
                  <div className="text-sm font-bold text-koenig-dark">{c.CCode}</div>
                  <div className="text-xs text-koenig-gray">{c.CName}</div>
                  {c.CourseURL && (
                    <Link href={`/designs/course-live?slug=${c.CourseURL}`} className="mt-2 inline-block text-xs font-medium text-koenig-blue hover:underline">
                      View Course &rarr;
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <SampleData>
              <div className="grid gap-6 md:grid-cols-4">
                {sampleCertPath.map((tier, tierIdx) => (
                  <div key={tier.tier} className="text-center">
                    {/* Tier Header */}
                    <div className={`mb-4 rounded-lg py-2 text-xs font-bold uppercase tracking-widest ${
                      tierIdx === 0
                        ? "bg-red-50 text-red-400"
                        : tierIdx === 1
                        ? "bg-red-100 text-red-500"
                        : tierIdx === 2
                        ? "bg-red-100 text-red-600"
                        : "bg-red-50 text-red-400"
                    }`}>
                      {tier.tier}
                    </div>

                    {/* Certs */}
                    <div className="space-y-3">
                      {tier.certs.map((cert) => (
                        <div
                          key={cert.code}
                          className={`rounded-xl border-2 p-4 transition ${
                            cert.current
                              ? "border-red-400 bg-red-50/50 ring-2 ring-red-200"
                              : "border-red-200 bg-white hover:border-red-300"
                          }`}
                        >
                          <div className="text-sm font-bold">{cert.code}</div>
                          <div className="text-xs">{cert.name}</div>
                          {cert.current && (
                            <div className="mt-2 rounded-full bg-red-400 px-3 py-0.5 text-[10px] font-bold text-white">
                              Current Course
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Arrow between tiers */}
                    {tierIdx < sampleCertPath.length - 1 && (
                      <div className="mt-3 hidden md:block">
                        &#8594;
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SampleData>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 20. Enterprise CTA                                           */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-koenig-navy via-koenig-navy to-koenig-dark px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-3 text-3xl font-bold text-white">
                Training 5+ Employees?
              </h2>
              <p className="mb-6 text-base leading-relaxed text-white/70">
                Unlock volume discounts, dedicated account management, and customized training programs
                designed for your organization&apos;s specific needs.
              </p>
              <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Volume discounts up to 30%",
                  "Dedicated account manager",
                  "Custom scheduling",
                  "Progress tracking dashboard",
                  "Tailored curriculum",
                  "Private batches available",
                  "Invoice-based payment",
                  "Priority support",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-white/80">
                    <span className="text-koenig-blue">&#10003;</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-lg bg-koenig-blue px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-koenig-blue/30 transition hover:bg-koenig-accent">
                  Request a Corporate Quote
                </button>
                <button className="rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10">
                  Talk to Sales
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "500+", label: "Enterprise Clients" },
                { stat: profsTrained ? `${profsTrained.toLocaleString()}+` : "50,000+", label: "Professionals Trained" },
                { stat: "98%", label: "Client Retention" },
                { stat: "150+", label: "Countries Served" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">{item.stat}</div>
                  <div className="mt-1 text-xs text-white/50">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 21. Schema.org Preview                                       */}
      {/* ============================================================ */}
      <section className="border-t border-koenig-border px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-2xl font-bold text-koenig-dark">
            Schema.org Preview
          </h2>
          <p className="mb-6 text-sm text-koenig-muted">
            Structured data for rich search results &mdash; developer reference only
          </p>
          <div className="overflow-x-auto rounded-xl border border-koenig-border bg-koenig-dark p-6 shadow-sm">
            <pre className="text-xs leading-relaxed text-green-400">
              {JSON.stringify(
                {
                  "@context": "https://schema.org",
                  "@type": "Course",
                  name: courseName,
                  courseCode: courseCode,
                  description: data.basic?.MetaDescription ||
                    "Master Azure administration including identity management, storage, compute, networking, and monitoring.",
                  provider: {
                    "@type": "EducationalOrganization",
                    name: "Koenig Solutions",
                    sameAs: "https://www.koenig-solutions.com",
                  },
                  hasCourseInstance: onlineSchedule.length > 0 ? [
                    {
                      "@type": "CourseInstance",
                      courseMode: "Online",
                      courseWorkload: `PT${hours}H`,
                      startDate: onlineSchedule[0]?.StartDate,
                      endDate: onlineSchedule[0]?.EndDate,
                      offers: onlineGroupUSD ? {
                        "@type": "Offer",
                        price: String(onlineGroupUSD),
                        priceCurrency: "USD",
                        availability: "https://schema.org/InStock",
                      } : undefined,
                    },
                  ] : [],
                  educationalLevel: "Associate",
                  totalHistoricalEnrollment: profsTrained || 44776,
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 22. Raw RMS Data Debug (collapsed, developer-only)            */}
      {/* ============================================================ */}
      <div className="border-t border-koenig-border px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <details className="group">
            <summary className="cursor-pointer text-xs text-koenig-muted hover:text-koenig-blue transition">
              <span className="inline-flex items-center gap-1">
                <svg className="h-3 w-3 transition group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                Developer: View raw RMS data
              </span>
            </summary>
            <div className="mt-3 overflow-x-auto rounded-lg border border-koenig-border bg-koenig-dark p-4">
              <pre className="text-[11px] leading-relaxed text-green-400">
                {JSON.stringify(
                  {
                    basic: data.basic ? {
                      CourseId: data.basic.CourseId,
                      CourseName: data.basic.CourseName,
                      CCode: data.basic.CCode,
                      VName: data.basic.VName,
                      StDuration: data.basic.StDuration,
                      Hours: data.basic.Hours,
                      IsPopular: data.basic.IsPopular,
                      IsFlexiAllowed: data.basic.IsFlexiAllowed,
                      MetaTitle: data.basic.MetaTitle,
                      MetaDescription: data.basic.MetaDescription,
                      DeliveredDetail: data.basic.DeliveredDetail,
                      CourseExamDetails: data.basic.CourseExamDetails,
                      CourseLanguage: data.basic.CourseLanguage,
                      BreadCrumbs: data.basic.BreadCrumbs,
                      CourseBreadCrumb: data.basic.CourseBreadCrumb,
                      UploadFilePath: data.basic.UploadFilePath,
                    } : null,
                    pricing: data.pricing,
                    onlineScheduleCount: onlineSchedule.length,
                    classroomScheduleCount: classroomSchedule.length,
                    feedbackCount: feedback.length,
                    beforeAfterCoursesCount: beforeAfterCourses.length,
                    contentFields: data.content ? Object.keys(data.content) : null,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </details>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 23. Footer                                                   */}
      {/* ============================================================ */}
      <Footer />
    </div>
  );
}

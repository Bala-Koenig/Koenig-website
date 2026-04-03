import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { CourseScheduler } from "./components/course-scheduler";
import Link from "next/link";

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
  price: "$1,295",
  oneOnOnePrice: "$1,995",
  selfPacedPrice: "$495",
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
  "Azure AD", "Virtual Machines", "Storage Accounts", "Virtual Networking",
  "Azure Monitor", "Azure Backup", "RBAC", "ARM Templates",
  "Network Security Groups", "Load Balancer", "Azure DNS", "Azure Policy",
  "Resource Locks", "Azure Files", "Site Recovery", "Log Analytics",
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
  { tier: "Fundamentals", certs: [{ code: "AZ-900", name: "Azure Fundamentals", current: false }] },
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
          Course Detail Page Wireframe
        </span>
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
          <Link href="#" className="hover:text-koenig-blue">Cloud Computing</Link>
          <span className="mx-2">/</span>
          <Link href="#" className="hover:text-koenig-blue">Microsoft</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-koenig-dark">{course.code}</span>
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
                  {course.vendor}
                </span>
                <span className="rounded-md bg-white/10 px-3 py-1 text-xs text-white/70">
                  {course.technology}
                </span>
                <span className="rounded-md bg-white/10 px-3 py-1 text-xs text-white/70">
                  {course.level}
                </span>
                {course.guaranteed && (
                  <span className="rounded-md bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                    Guaranteed-to-Run
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="mb-4 text-3xl font-bold leading-tight text-white lg:text-4xl">
                {course.title}
              </h1>

              {/* Description */}
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

              {/* Meta Row */}
              <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50">
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
              <div className="flex flex-wrap gap-3">
                <button className="rounded-lg bg-koenig-blue px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-koenig-blue/30 transition hover:bg-koenig-accent">
                  Enroll Now &mdash; {course.price}
                </button>
                <button className="rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10">
                  Download Syllabus
                </button>
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
                  { mode: "1-on-1", price: course.oneOnOnePrice, desc: "Dedicated instructor, your schedule", badge: "Fastest", badgeColor: "bg-purple-500/20 text-purple-300" },
                  { mode: "Public Batch", price: course.price, desc: "Group class, fixed schedule", badge: "Most Popular", badgeColor: "bg-koenig-blue/20 text-koenig-blue" },
                  { mode: "Self-Paced", price: course.selfPacedPrice, desc: "Recorded sessions, learn anytime", badge: "Best Value", badgeColor: "bg-green-500/20 text-green-300" },
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
                      <span className="text-lg font-bold text-white">{opt.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/50">{opt.desc}</span>
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
            <div className="space-y-4 text-sm leading-relaxed text-koenig-gray">
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

            {/* What You'll Learn */}
            <h3 className="mb-5 mt-12 text-lg font-bold text-koenig-dark">
              What You&apos;ll Learn
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {course.objectives.map((obj) => (
                <div
                  key={obj}
                  className="flex items-start gap-3 rounded-lg border border-koenig-border bg-koenig-light p-4"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-koenig-blue text-xs font-bold text-white">
                    &#10003;
                  </span>
                  <span className="text-sm text-koenig-gray">{obj}</span>
                </div>
              ))}
            </div>

            {/* Skills You'll Gain */}
            <h3 className="mb-5 mt-12 text-lg font-bold text-koenig-dark">
              Skills You&apos;ll Gain
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-koenig-blue/20 bg-koenig-blue/5 px-4 py-1.5 text-xs font-medium text-koenig-accent"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Prerequisites */}
            <h3 className="mb-5 mt-12 text-lg font-bold text-koenig-dark">
              Prerequisites
            </h3>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-amber-700">
                Recommended knowledge before taking this course
              </p>
              <ul className="space-y-3">
                {course.prerequisites.map((pre) => (
                  <li key={pre} className="flex items-center gap-3 text-sm text-koenig-gray">
                    <span className="flex h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
                    {pre}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-koenig-muted">
                Not sure if you meet the prerequisites?{" "}
                <Link href="#" className="font-medium text-koenig-blue hover:underline">
                  Take our free readiness assessment
                </Link>
              </p>
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

            {/* Next Batch Highlight */}
            <div className="rounded-xl border-2 border-koenig-blue bg-gradient-to-br from-koenig-light to-white p-6 shadow-sm">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-koenig-blue">
                Next Guaranteed Batch
              </div>
              <div className="mb-1 text-xl font-bold text-koenig-dark">
                Mar 3 - Mar 7, 2026
              </div>
              <div className="mb-4 text-xs text-koenig-muted">
                Online &middot; 8 seats left &middot; Filling fast
              </div>
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
            Everything you need to know about the AZ-104 Microsoft Azure Administrator certification exam
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Exam Details Card */}
            <div className="rounded-xl border border-koenig-border bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-koenig-dark">Exam Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Exam Name", value: "AZ-104" },
                  { label: "Exam Cost", value: "$165 (bundle available)" },
                  { label: "Format", value: "Multiple choice, labs & case studies" },
                  { label: "Questions", value: "40-60 questions" },
                  { label: "Duration", value: "2 hours" },
                  { label: "Passing Score", value: "700 / 1000" },
                  { label: "Validity", value: "1 year (renewal required)" },
                  { label: "Retake Policy", value: "24hr wait, then 14-day wait" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-koenig-light p-3">
                    <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-koenig-muted">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-koenig-dark">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification Path Card */}
            <div className="rounded-xl border border-koenig-border bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-koenig-dark">Certification Path</h3>
              <p className="mb-6 text-sm text-koenig-muted">
                Where AZ-104 fits in the Microsoft Azure certification journey
              </p>
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
                            ? "bg-koenig-blue text-white ring-4 ring-koenig-blue/20"
                            : "bg-koenig-light text-koenig-muted"
                        }`}
                      >
                        {i + 1}
                      </div>
                      {i < 2 && <div className="h-4 w-0.5 bg-koenig-border" />}
                    </div>
                    <div className={`flex-1 rounded-lg border p-3 ${
                      item.active
                        ? "border-koenig-blue bg-koenig-blue/5"
                        : "border-koenig-border"
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-koenig-dark">{item.step}</span>
                          <span className="ml-2 text-sm text-koenig-gray">{item.label}</span>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          item.active
                            ? "bg-koenig-blue/10 text-koenig-blue"
                            : "bg-koenig-light text-koenig-muted"
                        }`}>
                          {item.tier}
                        </span>
                      </div>
                      {item.active && (
                        <div className="mt-1 text-xs font-semibold text-koenig-blue">
                          &#8594; You are here
                        </div>
                      )}
                    </div>
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
      <section id="curriculum" className="border-t border-koenig-border bg-koenig-light px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-2xl font-bold text-koenig-dark">
            Course Curriculum
          </h2>
          <p className="mb-8 text-sm text-koenig-muted">
            4 days of structured learning with hands-on labs and real-world scenarios
          </p>

          <div className="space-y-4">
            {/* Day 1 */}
            <details open className="group rounded-xl border border-koenig-border bg-white shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-koenig-blue text-sm font-bold text-white">
                    1
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-koenig-dark">Day 1</h3>
                    <p className="text-xs text-koenig-muted">Manage Azure Identities and Governance</p>
                  </div>
                </div>
                <svg className="h-4 w-4 flex-shrink-0 text-koenig-muted transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-koenig-border px-6 py-5">
                <div className="flex flex-wrap gap-2">
                  {["Azure AD", "RBAC", "Subscriptions", "Azure Policy", "Management Groups", "Resource Locks", "Custom Roles", "Conditional Access"].map((topic) => (
                    <span key={topic} className="rounded-full border border-koenig-blue/20 bg-koenig-blue/5 px-4 py-1.5 text-xs font-medium text-koenig-accent">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </details>

            {/* Day 2 */}
            <details className="group rounded-xl border border-koenig-border bg-white shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-koenig-blue text-sm font-bold text-white">
                    2
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-koenig-dark">Day 2</h3>
                    <p className="text-xs text-koenig-muted">Implement and Manage Storage</p>
                  </div>
                </div>
                <svg className="h-4 w-4 flex-shrink-0 text-koenig-muted transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-koenig-border px-6 py-5">
                <div className="flex flex-wrap gap-2">
                  {["Storage Accounts", "Blob Storage", "Azure Files", "Storage Security", "SAS Tokens", "Lifecycle Management", "Storage Tiers", "File Sync"].map((topic) => (
                    <span key={topic} className="rounded-full border border-koenig-blue/20 bg-koenig-blue/5 px-4 py-1.5 text-xs font-medium text-koenig-accent">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </details>

            {/* Day 3 */}
            <details className="group rounded-xl border border-koenig-border bg-white shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-koenig-blue text-sm font-bold text-white">
                    3
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-koenig-dark">Day 3</h3>
                    <p className="text-xs text-koenig-muted">Deploy and Manage Azure Compute Resources</p>
                  </div>
                </div>
                <svg className="h-4 w-4 flex-shrink-0 text-koenig-muted transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-koenig-border px-6 py-5">
                <div className="flex flex-wrap gap-2">
                  {["Virtual Machines", "App Services", "Containers", "Azure Kubernetes", "Availability Sets", "Scale Sets", "Azure Functions", "ARM Templates"].map((topic) => (
                    <span key={topic} className="rounded-full border border-koenig-blue/20 bg-koenig-blue/5 px-4 py-1.5 text-xs font-medium text-koenig-accent">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </details>

            {/* Day 4 */}
            <details className="group rounded-xl border border-koenig-border bg-white shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-koenig-blue text-sm font-bold text-white">
                    4
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-koenig-dark">Day 4</h3>
                    <p className="text-xs text-koenig-muted">Configure and Manage Virtual Networking</p>
                  </div>
                </div>
                <svg className="h-4 w-4 flex-shrink-0 text-koenig-muted transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-koenig-border px-6 py-5">
                <div className="flex flex-wrap gap-2">
                  {["VNets", "NSGs", "Azure DNS", "Network Peering", "VPN Gateway", "Load Balancer", "Application Gateway", "Azure Firewall"].map((topic) => (
                    <span key={topic} className="rounded-full border border-koenig-blue/20 bg-koenig-blue/5 px-4 py-1.5 text-xs font-medium text-koenig-accent">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. Meet the Instructor                                      */}
      {/* ============================================================ */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-bold text-koenig-dark">
            Meet Your Instructor
          </h2>

          <div className="rounded-xl border border-koenig-border bg-white p-8 shadow-sm">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Photo + Name */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-koenig-light text-3xl text-koenig-muted">
                  &#128100;
                </div>
                <h3 className="text-lg font-bold text-koenig-dark">Rajesh Kumar</h3>
                <p className="mt-1 text-xs text-koenig-muted">
                  Microsoft Certified Trainer (MCT) | Azure Solutions Architect Expert
                </p>

                {/* Stats */}
                <div className="mt-5 grid w-full grid-cols-3 gap-3">
                  {[
                    { value: "12+", label: "Years Exp." },
                    { value: "5,000+", label: "Students" },
                    { value: "4.9", label: "Avg Rating" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg bg-koenig-light p-2">
                      <div className="text-sm font-bold text-koenig-dark">{s.value}</div>
                      <div className="text-[10px] text-koenig-muted">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <p className="mb-4 text-sm leading-relaxed text-koenig-gray">
                  Rajesh is a seasoned cloud architect and Microsoft Certified Trainer with over 12 years of
                  experience helping organizations migrate to and optimize their Azure environments. He has
                  trained over 5,000 IT professionals across 30+ countries and is known for his practical,
                  real-world approach to teaching complex cloud concepts.
                </p>
                <p className="mb-6 text-sm leading-relaxed text-koenig-gray">
                  His training sessions combine theoretical foundations with hands-on labs, ensuring that
                  participants not only understand Azure services but can confidently implement and manage
                  them in production environments. Rajesh regularly contributes to the Azure community
                  through blogs, webinars, and speaking engagements at technology conferences.
                </p>

                {/* Certifications */}
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-koenig-muted">
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["AZ-305", "AZ-104", "AZ-900", "MS-900"].map((cert) => (
                    <span
                      key={cert}
                      className="rounded-full border border-koenig-blue/20 bg-koenig-blue/5 px-4 py-1.5 text-xs font-bold text-koenig-blue"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
            {/* Overall Rating */}
            <div className="rounded-xl border border-koenig-border bg-white p-8 shadow-sm lg:col-span-1">
              <div className="mb-2 text-center text-5xl font-bold text-koenig-dark">4.8</div>
              <div className="mb-1 text-center text-yellow-400">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="mb-6 text-center text-xs text-koenig-muted">
                Based on {course.reviews.toLocaleString()} reviews
              </p>

              {/* Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map((r) => (
                  <div key={r.stars} className="flex items-center gap-3 text-sm">
                    <span className="w-4 text-right text-xs font-medium text-koenig-dark">{r.stars}</span>
                    <span className="text-yellow-400">&#9733;</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-koenig-light">
                      <div
                        className="h-full rounded-full bg-yellow-400"
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs text-koenig-muted">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Cards */}
            <div className="space-y-4 lg:col-span-2">
              {reviews.slice(0, 3).map((review) => (
                <div
                  key={review.name}
                  className="rounded-xl border border-koenig-border bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-koenig-dark">{review.name}</span>
                      <span className="ml-2 text-xs text-koenig-muted">
                        {review.role}, {review.company}
                      </span>
                    </div>
                    <span className="text-xs text-koenig-muted">{review.date}</span>
                  </div>
                  <div className="mb-2 text-yellow-400">
                    {Array.from({ length: review.stars }, (_, i) => (
                      <span key={i}>&#9733;</span>
                    ))}
                    {Array.from({ length: 5 - review.stars }, (_, i) => (
                      <span key={i} className="text-koenig-border">&#9733;</span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-koenig-gray">{review.text}</p>
                </div>
              ))}

              <button className="w-full rounded-xl border border-koenig-border bg-white py-4 text-center text-sm font-semibold text-koenig-blue shadow-sm transition hover:bg-koenig-light">
                See All {course.reviews.toLocaleString()} Reviews &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. Skills You'll Gain                                       */}
      {/* ============================================================ */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-koenig-dark">
            Skills You&apos;ll Gain
          </h2>
          <p className="mb-8 text-center text-sm text-koenig-muted">
            In-demand skills that employers are actively seeking
          </p>

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
                className="rounded-full border border-koenig-blue/20 bg-koenig-blue/5 px-5 py-2 text-sm font-medium text-koenig-accent"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 13. Hands-On Lab Environment                                 */}
      {/* ============================================================ */}
      <section className="border-t border-koenig-border bg-koenig-light px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-koenig-dark">
            Hands-On Lab Environment
          </h2>
          <p className="mb-8 text-center text-sm text-koenig-muted">
            Practice in a real Azure environment
          </p>

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
                className="rounded-xl border border-koenig-border bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-koenig-blue/10 text-2xl">
                  <span dangerouslySetInnerHTML={{ __html: feature.icon }} />
                </div>
                <h3 className="mb-2 text-sm font-bold text-koenig-dark">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-koenig-gray">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 14. Career Outcomes                                          */}
      {/* ============================================================ */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-koenig-dark">
            Career Outcomes
          </h2>
          <p className="mb-10 text-center text-sm text-koenig-muted">
            What AZ-104 certified professionals can expect based on industry data
          </p>

          {/* Headline Stat */}
          <div className="mb-10 rounded-xl bg-gradient-to-r from-koenig-navy to-koenig-accent p-8 text-center shadow-lg">
            <div className="text-3xl font-bold text-white">86%</div>
            <p className="mt-2 text-sm text-white/80">
              of AZ-104 certified professionals report career advancement within 6 months
            </p>
          </div>

          {/* Outcome Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Salary Impact */}
            <div className="rounded-xl border border-koenig-border bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                &#36;
              </div>
              <h3 className="mb-2 text-lg font-bold text-koenig-dark">Salary Impact</h3>
              <div className="mb-2 text-3xl font-bold text-green-600">+26%</div>
              <p className="mb-3 text-sm text-koenig-gray">
                Average salary increase reported after obtaining the AZ-104 certification
              </p>
              <div className="rounded-lg bg-koenig-light p-3">
                <div className="text-xs text-koenig-muted">Typical Salary Range</div>
                <div className="text-sm font-bold text-koenig-dark">$95,000 &mdash; $145,000</div>
              </div>
            </div>

            {/* Job Roles */}
            <div className="rounded-xl border border-koenig-border bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                &#9881;
              </div>
              <h3 className="mb-4 text-lg font-bold text-koenig-dark">Job Roles</h3>
              <ul className="space-y-2.5">
                {["Azure Administrator", "Cloud Engineer", "Systems Administrator", "DevOps Engineer", "Infrastructure Engineer", "Cloud Consultant"].map((role) => (
                  <li key={role} className="flex items-center gap-2 text-sm text-koenig-gray">
                    <span className="h-1.5 w-1.5 rounded-full bg-koenig-blue" />
                    {role}
                  </li>
                ))}
              </ul>
            </div>

            {/* Companies Hiring */}
            <div className="rounded-xl border border-koenig-border bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                &#127970;
              </div>
              <h3 className="mb-4 text-lg font-bold text-koenig-dark">Companies Hiring</h3>
              <div className="flex flex-wrap gap-2">
                {["Microsoft", "Amazon", "Deloitte", "Accenture", "Wipro", "Infosys", "TCS", "Capgemini", "IBM", "Google"].map((company) => (
                  <span
                    key={company}
                    className="rounded-full border border-koenig-border bg-koenig-light px-3 py-1.5 text-xs font-medium text-koenig-dark"
                  >
                    {company}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-koenig-muted">
                and 5,000+ organizations worldwide seeking AZ-104 certified professionals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 15. FAQs                                                     */}
      {/* ============================================================ */}
      <section id="faqs" className="border-t border-koenig-border bg-koenig-light px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-2xl font-bold text-koenig-dark">
            Frequently Asked Questions
          </h2>
          <p className="mb-8 text-sm text-koenig-muted">
            Everything you need to know about the AZ-104 training course
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {course.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-koenig-border bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4">
                  <h4 className="text-sm font-semibold text-koenig-dark pr-4">{faq.q}</h4>
                  <svg className="h-4 w-4 flex-shrink-0 text-koenig-muted transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="border-t border-koenig-border px-6 py-4">
                  <p className="text-sm leading-relaxed text-koenig-gray">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 16. What's Included                                          */}
      {/* ============================================================ */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-koenig-dark">
            What&apos;s Included in Your Training
          </h2>
          <p className="mb-10 text-center text-sm text-koenig-muted">
            Every enrollment comes packed with resources to maximize your learning and exam success
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((item) => (
              <div
                key={item.item}
                className="flex items-start gap-3 rounded-xl border border-koenig-border bg-white p-5 shadow-sm"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-sm text-green-600">
                  &#10003;
                </span>
                <span className="text-sm font-medium text-koenig-dark">{item.item}</span>
              </div>
            ))}
          </div>
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
      {/* 18. Related Courses                                          */}
      {/* ============================================================ */}
      <section id="related" className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-koenig-dark">Related Courses</h2>
              <p className="mt-1 text-sm text-koenig-muted">
                Other {course.vendor} Azure courses to advance your cloud career
              </p>
            </div>
            <button className="hidden text-sm font-medium text-koenig-blue hover:underline sm:block">
              View All Microsoft Courses &rarr;
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCourses.map((c) => (
              <div
                key={c.code}
                className="group rounded-xl border border-koenig-border bg-white p-6 shadow-sm transition hover:border-koenig-blue/30 hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-md bg-koenig-blue/10 px-2.5 py-1 text-xs font-bold text-koenig-blue">
                    {c.code}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    c.level === "Expert"
                      ? "bg-purple-50 text-purple-700"
                      : c.level === "Fundamentals"
                      ? "bg-green-50 text-green-700"
                      : "bg-blue-50 text-blue-700"
                  }`}>
                    {c.level}
                  </span>
                </div>
                <h4 className="mb-2 text-sm font-bold leading-snug text-koenig-dark group-hover:text-koenig-blue">
                  {c.title}
                </h4>
                <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-koenig-muted">
                  <span>{c.vendor}</span>
                  <span>{c.duration}</span>
                </div>
                <div className="mb-4 flex items-center justify-between border-t border-koenig-border pt-3">
                  <div>
                    <div className="text-xs text-koenig-muted">Next date</div>
                    <div className="text-sm font-medium text-koenig-dark">{c.nextDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-koenig-muted">From</div>
                    <div className="text-lg font-bold text-koenig-dark">{c.price}</div>
                  </div>
                </div>
                <button className="w-full rounded-lg bg-koenig-blue py-2.5 text-xs font-semibold text-white transition hover:bg-koenig-accent">
                  View Course
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 19. Certification Path                                       */}
      {/* ============================================================ */}
      <section className="border-t border-koenig-border bg-koenig-light px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-koenig-dark">
            Microsoft Azure Certification Path
          </h2>
          <p className="mb-10 text-center text-sm text-koenig-muted">
            Plan your learning journey through the complete Azure certification tree
          </p>

          <div className="grid gap-6 md:grid-cols-4">
            {certPath.map((tier, tierIdx) => (
              <div key={tier.tier} className="text-center">
                {/* Tier Header */}
                <div className={`mb-4 rounded-lg py-2 text-xs font-bold uppercase tracking-widest ${
                  tierIdx === 0
                    ? "bg-green-100 text-green-700"
                    : tierIdx === 1
                    ? "bg-blue-100 text-blue-700"
                    : tierIdx === 2
                    ? "bg-purple-100 text-purple-700"
                    : "bg-amber-100 text-amber-700"
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
                          ? "border-koenig-blue bg-koenig-blue/5 ring-2 ring-koenig-blue/20"
                          : "border-koenig-border bg-white hover:border-koenig-blue/30"
                      }`}
                    >
                      <div className={`text-sm font-bold ${cert.current ? "text-koenig-blue" : "text-koenig-dark"}`}>
                        {cert.code}
                      </div>
                      <div className="text-xs text-koenig-gray">{cert.name}</div>
                      {cert.current && (
                        <div className="mt-2 rounded-full bg-koenig-blue px-3 py-0.5 text-[10px] font-bold text-white">
                          Current Course
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Arrow between tiers */}
                {tierIdx < certPath.length - 1 && (
                  <div className="mt-3 hidden text-koenig-muted md:block">
                    &#8594;
                  </div>
                )}
              </div>
            ))}
          </div>
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
                { stat: "50,000+", label: "Corporate Learners" },
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
                  name: course.title,
                  courseCode: course.code,
                  description:
                    "Master Azure administration including identity management, storage, compute, networking, and monitoring. Prepare for the AZ-104 certification exam.",
                  provider: {
                    "@type": "EducationalOrganization",
                    name: "Koenig Solutions",
                    sameAs: "https://www.koenig-solutions.com",
                  },
                  hasCourseInstance: [
                    {
                      "@type": "CourseInstance",
                      courseMode: "Online",
                      courseWorkload: "PT32H",
                      startDate: "2026-03-03",
                      endDate: "2026-03-07",
                      instructor: {
                        "@type": "Person",
                        name: course.instructor.name,
                      },
                      offers: {
                        "@type": "Offer",
                        price: "1295",
                        priceCurrency: "USD",
                        availability: "https://schema.org/InStock",
                      },
                    },
                  ],
                  educationalLevel: course.level,
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: course.rating,
                    reviewCount: course.reviews,
                    bestRating: 5,
                  },
                  totalHistoricalEnrollment: 44776,
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 22. Footer                                                   */}
      {/* ============================================================ */}
      <Footer />
    </div>
  );
}

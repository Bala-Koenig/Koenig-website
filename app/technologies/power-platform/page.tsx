import Hero             from "./components/Hero";
import TrustedCompanies from "./components/TrustedCompanies";
import RelatedTech      from "./components/RelatedTech";
import CourseListings   from "./components/CourseListings";
import CourseLeadForm   from "./components/CourseLeadForm";
import UniqueOfferings  from "./components/UniqueOfferings";
import SampleCertificate from "./components/SampleCertificate";
import UpcomingBatches  from "./components/UpcomingBatches";
import CourseOverview   from "./components/CourseOverview";
import Comparison       from "./components/Comparison";
import Awards           from "./components/Awards";
import Testimonials     from "./components/Testimonials";
import FAQ              from "./components/FAQ";
import TrainingProfessionals from "./components/TrainingProfessionals";
import FinalCTA         from "./components/FinalCTA";
import ScrollProgress   from "./components/ScrollProgress";

/* ── JSON-LD Structured Data ───────────────────────────────────────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is Microsoft Power Platform?", acceptedAnswer: { "@type": "Answer", text: "Microsoft Power Platform is a suite of five low-code tools: Power Apps, Power Automate, Power BI, Power Virtual Agents, and Power Pages, deeply integrated with Microsoft 365, Azure, and Dynamics 365." } },
    { "@type": "Question", name: "Who should take this Power Platform training?", acceptedAnswer: { "@type": "Answer", text: "IT professionals, business analysts, developers, data analysts, project managers, and anyone looking to build business solutions without deep coding knowledge." } },
    { "@type": "Question", name: "What certifications does this course prepare you for?", acceptedAnswer: { "@type": "Answer", text: "PL-900, PL-100, PL-200, PL-300, PL-400, and PL-600 Microsoft Power Platform certifications." } },
    { "@type": "Question", name: "How long does it take to complete the course?", acceptedAnswer: { "@type": "Answer", text: "The complete Power Platform training program spans 40+ hours over 5 days, with 90-day access to recorded sessions and hands-on labs." } },
    { "@type": "Question", name: "Is this course available online?", acceptedAnswer: { "@type": "Answer", text: "Yes — available in Live Online (instructor-led), Self-Paced, On-Site Corporate, and Bootcamp Weekend formats." } },
  ],
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Microsoft Power Platform Certification Training",
  description: "Comprehensive Microsoft Power Platform training covering Power Apps, Power Automate, Power BI, Power Virtual Agents, and Power Pages with hands-on labs and certification preparation.",
  provider: { "@type": "Organization", name: "Koenig Solutions", sameAs: "https://www.koenig-solutions.com" },
  educationalCredentialAwarded: "Microsoft Power Platform Certification",
  courseMode: ["online", "onsite", "blended"],
  hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", duration: "PT40H" },
};

export default function PowerPlatformPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />

      <ScrollProgress />

      <main>
        {/* 1. HERO */}
        <Hero />

        {/* TRUSTED COMPANIES — Logo marquee strip */}
        <TrustedCompanies />

        {/* CERTIFICATION EXPLORER — Sidebar + course cards */}
        <CourseListings />

        {/* LEAD FORM — below courses */}
        <CourseLeadForm />

        {/* RELATED TECHNOLOGIES */}
        <RelatedTech />

        {/* COURSE OVERVIEW — What is Power Platform + Show More */}
        <CourseOverview />

        {/* SAMPLE CERTIFICATE — above Learning That Fits Your Life */}
        <SampleCertificate />

        {/* 10. KOENIG DIFFERENCE — Why Koenig (dark) */}
        <UniqueOfferings />

        {/* UPCOMING BATCHES — below Learning That Fits Your Life */}
        <UpcomingBatches />

        {/* COMPARISON TABLE — table only */}
        <Comparison />

        {/* 18. AWARDS — Recognition & trust */}
        <Awards />

        {/* 19. TESTIMONIALS — Social proof */}
        <Testimonials />

        {/* 21. FAQ — Accordion */}
        <FAQ />

        {/* TRAINING PROFESSIONALS — above footer */}
        <TrainingProfessionals />

        {/* 22. FINAL CTA + FOOTER */}
        <FinalCTA />
      </main>
    </>
  );
}

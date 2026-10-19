import { User, Users, Route, Award, Video, FlaskConical, BookOpen, UserCheck, Tag, BarChart3, Receipt } from "lucide-react";
import { CorporateQuoteModal } from "./corporate-quote-modal";
import { RequestInfoModal } from "./request-info-modal";

const INDIVIDUAL_BENEFITS = [
  { icon: Route, text: "Choose your path — live online, classroom, or self-paced" },
  { icon: Award, text: "Official certification exam prep" },
  { icon: Video, text: "Lifetime access to recordings" },
  { icon: FlaskConical, text: "Hands-on labs & practice quizzes (if applicable)" },
];

const ENTERPRISE_BENEFITS = [
  { icon: BookOpen, text: "Custom curriculum for your team" },
  { icon: UserCheck, text: "Dedicated corporate trainer" },
  { icon: Tag, text: "Volume pricing for teams" },
  { icon: BarChart3, text: "Centralized progress reporting" },
  { icon: Receipt, text: "Flexible invoicing & purchase orders" },
];

function AudienceCard({
  icon,
  title,
  subheading,
  benefits,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  subheading: string;
  benefits: { icon: React.ElementType; text: string }[];
  cta: React.ReactNode;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl sm:p-7">
      <div className="mb-4 flex items-center justify-center gap-3.5">
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-koenig-navy text-white">
          {icon}
        </span>
        <div>
          <h3 className="text-xl font-bold leading-tight text-koenig-navy">{title}</h3>
        </div>
      </div>
      <p className="mb-5 text-center text-[15px] font-semibold leading-snug text-koenig-dark">{subheading}</p>

      <div className="flex-1 border-t border-koenig-border/70">
        {benefits.map(({ icon: BenefitIcon, text }) => (
          <div key={text} className="flex items-center gap-3 border-b border-koenig-border/70 py-4">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-koenig-blue/10">
              <BenefitIcon size={16} strokeWidth={2} className="text-koenig-blue" />
            </span>
            <p className="text-sm leading-relaxed text-koenig-navy">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">{cta}</div>
    </div>
  );
}

export function AudienceCards({ courseTitle, courseCode }: { courseTitle: string; courseCode: string }) {
  return (
    <section
      className="bg-koenig-light px-[15px] sm:px-6 py-8 sm:py-12"
      style={{
        backgroundImage: "radial-gradient(#cfe3ee 1.3px, transparent 1.3px)",
        backgroundSize: "16px 16px",
      }}
    >
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
        <AudienceCard
          icon={<User size={20} />}
          title="For Individuals"
          subheading="Learn and Get Certified at Your Own Pace"
          benefits={INDIVIDUAL_BENEFITS}
          cta={
            <div className="flex flex-col gap-2.5">
              <a
                href="#schedule"
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-koenig-blue px-6 py-4 text-sm font-bold text-koenig-blue transition hover:bg-koenig-blue/5"
              >
                View Schedules <span aria-hidden="true">→</span>
              </a>
              <RequestInfoModal
                courseTitle={courseTitle}
                courseCode={courseCode}
                triggerLabel="Request More Info →"
                triggerClassName="flex w-full items-center justify-center gap-2 rounded-full bg-koenig-blue px-6 py-4 text-sm font-bold text-white shadow-lg shadow-koenig-blue/30 transition hover:bg-koenig-accent"
              />
            </div>
          }
        />
        <AudienceCard
          icon={<Users size={20} />}
          title="For Teams & Enterprises"
          subheading="Scale Training Across Your Entire Team"
          benefits={ENTERPRISE_BENEFITS}
          cta={
            <CorporateQuoteModal>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-koenig-blue px-6 py-4 text-sm font-bold text-white shadow-lg shadow-koenig-blue/30 transition hover:bg-koenig-accent"
              >
                Request More Info <span aria-hidden="true">→</span>
              </button>
            </CorporateQuoteModal>
          }
        />
      </div>
    </section>
  );
}

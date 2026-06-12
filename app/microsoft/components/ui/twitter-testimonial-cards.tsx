"use client";

import { useState } from "react";
import { cn } from "../../lib/utils";

// Koenig brand palette
const K = {
  navy:    "#071e2e",   // darkest — card bg
  navyMid: "#093148",   // card bg alt
  blue:    "#0694D1",   // primary accent
  blueDark:"#046fa3",   // hover / ring
  white:   "#ffffff",
  sub:     "rgba(255,255,255,0.55)",
  border:  "rgba(6,148,209,0.22)",
  borderHover: "rgba(6,148,209,0.55)",
};

interface TestimonialCardProps {
  className?: string;
  avatar?: string;
  username?: string;
  handle?: string;
  certBadge?: string;      // e.g. "AZ-104 Certified"
  content?: string;
  date?: string;
  verified?: boolean;
  downloads?: number;      // replaces "likes" — cert downloads
  shares?: number;         // replaces "retweets" — LinkedIn shares
  tweetUrl?: string;
  onHover?: () => void;
  onLeave?: () => void;
  isActive?: boolean;
  onTap?: () => void;
}

function KoenigBadge() {
  // Small Microsoft logo badge — signals official cert source
  return (
    <div
      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide"
      style={{ background: "rgba(6,148,209,0.15)", border: `1px solid ${K.border}`, color: K.blue }}
    >
      <svg width="10" height="10" viewBox="0 0 21 21">
        <rect x="1"  y="1"  width="9" height="9" fill="#f25022"/>
        <rect x="11" y="1"  width="9" height="9" fill="#7fba00"/>
        <rect x="1"  y="11" width="9" height="9" fill="#00a4ef"/>
        <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
      </svg>
      Verified
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}

function TestimonialCard({
  className,
  avatar,
  username = "IT Professional",
  handle = "@itpro",
  certBadge = "Microsoft Certified",
  content = "Just downloaded my Microsoft certificate from Koenig — looks stunning. Highly recommended!",
  date = "Jan 2026",
  verified = true,
  downloads = 120,
  shares = 18,
  tweetUrl,
  onHover,
  onLeave,
  isActive,
  onTap,
}: TestimonialCardProps) {
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice && !isActive) {
      e.preventDefault();
      onTap?.();
    }
  };

  return (
    <div
      onClick={handleClick as any}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "relative flex h-auto min-h-[168px] sm:min-h-[200px] w-[268px] sm:w-[390px]",
        "-skew-y-[8deg] select-none flex-col rounded-2xl",
        "px-4 sm:px-5 py-4 sm:py-5",
        "transition-all duration-500 cursor-default",
        isActive && "scale-[1.02]",
        className
      )}
      style={{
        background: `linear-gradient(145deg, ${K.navyMid} 0%, ${K.navy} 100%)`,
        border: `1px solid ${K.border}`,
        boxShadow: isActive
          ? `0 12px 48px rgba(6,148,209,0.30), 0 0 0 2px ${K.blue}55`
          : "0 4px 24px rgba(0,0,0,0.25)",
      }}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${K.blue}, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div
          className="size-10 sm:size-11 rounded-full overflow-hidden shrink-0"
          style={{ border: `2px solid ${K.blue}55` }}
        >
          {avatar ? (
            <img src={avatar} alt={username} className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center font-bold text-sm"
              style={{ background: `linear-gradient(135deg, ${K.blue}, ${K.blueDark})`, color: K.white }}
            >
              {username[0]}
            </div>
          )}
        </div>

        {/* Name + handle */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold truncate text-sm sm:text-[15px] leading-tight" style={{ color: K.white }}>
              {username}
            </span>
            {verified && <KoenigBadge />}
          </div>
          <span className="text-[11px] sm:text-[12px]" style={{ color: K.sub }}>{handle}</span>
        </div>

        {/* Cert badge pill */}
        <span
          className="shrink-0 text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-lg tracking-wide leading-none"
          style={{ background: `${K.blue}20`, color: K.blue, border: `1px solid ${K.blue}35` }}
        >
          {certBadge}
        </span>
      </div>

      {/* Content */}
      <p className="text-[13px] sm:text-[14px] leading-relaxed mb-3 line-clamp-4" style={{ color: "rgba(255,255,255,0.85)" }}>
        {content}
      </p>

      {/* Footer */}
      <div
        className="flex items-center justify-between text-[11px] sm:text-[12px] mt-auto pt-2"
        style={{ borderTop: `1px solid rgba(6,148,209,0.15)`, color: K.sub }}
      >
        <span>{date}</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5" style={{ color: K.blue }}>
            <DownloadIcon />
            <span className="font-semibold">{downloads}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShareIcon />
            <span>{shares}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TestimonialsProps {
  cards?: TestimonialCardProps[];
}

export default function TwitterTestimonials({ cards }: TestimonialsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getCardClassName = (index: number, baseClassName: string) => {
    const focusedIndex = hoveredIndex ?? activeIndex;
    if (focusedIndex === 0 && index === 1) {
      return baseClassName + " !translate-y-20 sm:!translate-y-28 !translate-x-12 sm:!translate-x-20";
    }
    if (focusedIndex === 0 && index === 2) {
      return baseClassName + " !translate-y-28 sm:!translate-y-44 !translate-x-20 sm:!translate-x-36";
    }
    if (focusedIndex === 1 && index === 2) {
      return baseClassName + " !translate-y-24 sm:!translate-y-36 !translate-x-20 sm:!translate-x-36";
    }
    return baseClassName;
  };

  const handleTap = (index: number) => {
    if (activeIndex !== index) setActiveIndex(index);
  };

  // Certificate-download-focused content
  const defaultCards: TestimonialCardProps[] = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 " +
        "before:absolute before:w-full before:h-full before:rounded-2xl before:content-[''] " +
        "before:bg-[#071e2e]/60 hover:before:opacity-0 before:transition-opacity before:duration-500 " +
        "before:left-0 before:top-0 grayscale-[60%] hover:grayscale-0",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face&auto=format",
      username: "Rahul Mehta",
      handle: "@rahulmehta_az",
      certBadge: "AZ-104 Certified",
      content:
        "Downloaded the sample cert from Koenig before enrolling — that's what sold me. Seeing exactly what I'd earn made it real. 3 weeks later I had the actual AZ-104 in hand. Best decision of 2025. 🏆",
      date: "Feb 3, 2026",
      verified: true,
      downloads: 847,
      shares: 134,
    },
    {
      className:
        "[grid-area:stack] translate-x-8 sm:translate-x-14 translate-y-6 sm:translate-y-10 hover:-translate-y-1 " +
        "before:absolute before:w-full before:h-full before:rounded-2xl before:content-[''] " +
        "before:bg-[#071e2e]/60 hover:before:opacity-0 before:transition-opacity before:duration-500 " +
        "before:left-0 before:top-0 grayscale-[60%] hover:grayscale-0",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face&auto=format",
      username: "Sarah Kaur",
      handle: "@sarahk_cloud",
      certBadge: "AZ-305 Expert",
      content:
        "The Koenig certificate design is sharp — looks incredible on LinkedIn. Got 4 recruiter messages within 48 hrs of posting my AZ-305. Download the sample first, you'll see immediately why it's worth it. 🎯",
      date: "Jan 28, 2026",
      verified: true,
      downloads: 612,
      shares: 98,
    },
    {
      className:
        "[grid-area:stack] translate-x-16 sm:translate-x-28 translate-y-12 sm:translate-y-20 hover:translate-y-8 sm:hover:translate-y-12",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format",
      username: "Ahmed Rashid",
      handle: "@ahmedr_msft",
      certBadge: "AI-102 Certified",
      content:
        "Showed my manager the sample cert before starting — he funded the training on the spot. The official Microsoft branding on a Koenig cert carries serious weight. Download it free, takes 30 seconds. 📄",
      date: "Jan 15, 2026",
      verified: true,
      downloads: 1203,
      shares: 211,
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center">
      {displayCards.map((cardProps, index) => (
        <TestimonialCard
          key={index}
          {...cardProps}
          className={getCardClassName(index, cardProps.className || "")}
          onHover={() => setHoveredIndex(index)}
          onLeave={() => setHoveredIndex(null)}
          isActive={activeIndex === index}
          onTap={() => handleTap(index)}
        />
      ))}
    </div>
  );
}

export { TestimonialCard, TwitterTestimonials };
export type { TestimonialCardProps, TestimonialsProps };

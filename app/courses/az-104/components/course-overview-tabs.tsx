"use client";
import { useState } from "react";

const TABS = [
  {
    key: "overview",
    label: "Course Overview",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
  },
  {
    key: "learn",
    label: "What You'll Learn",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
] as const;

type TabKey = (typeof TABS)[number]["key"];

interface CourseOverviewTabsProps {
  overviewContent: React.ReactNode;
  learnContent: React.ReactNode;
  skillsContent?: React.ReactNode;
}

export function CourseOverviewTabs({
  overviewContent,
  learnContent,
}: CourseOverviewTabsProps) {
  const [active, setActive] = useState<TabKey>("overview");

  const contentMap: Record<TabKey, React.ReactNode> = {
    overview: overviewContent,
    learn: learnContent,
  };

  return (
    <div className="overflow-hidden rounded-xl border border-koenig-border">
      {/* Mobile: horizontal tabs */}
      <div className="flex border-b border-koenig-border bg-koenig-light lg:hidden">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`flex flex-1 items-center justify-center gap-1.5 px-3 py-3 text-xs font-medium transition-all border-b-2 ${
              active === tab.key
                ? "border-koenig-blue bg-white text-koenig-blue"
                : "border-transparent text-koenig-muted hover:text-koenig-dark"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Desktop: left sidebar tabs + content */}
      <div className="flex">
        {/* Left tab list */}
        <div className="hidden w-52 flex-shrink-0 border-r border-koenig-border bg-koenig-light lg:block">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`group flex w-full items-center gap-3 border-l-[3px] px-5 py-4 text-left text-sm font-medium transition-all duration-150 ${
                active === tab.key
                  ? "border-koenig-blue bg-white text-koenig-blue"
                  : "border-transparent text-koenig-muted hover:border-koenig-blue/30 hover:bg-white/70 hover:text-koenig-dark"
              }`}
            >
              <span className={`flex-shrink-0 transition-colors ${active === tab.key ? "text-koenig-blue" : "text-koenig-muted group-hover:text-koenig-dark"}`}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="min-h-[220px] flex-1 p-6 lg:p-8">
          {contentMap[active]}
        </div>
      </div>
    </div>
  );
}

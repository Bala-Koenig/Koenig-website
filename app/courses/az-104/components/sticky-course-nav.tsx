"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const NAV_ITEMS = [
  { label: "Overview",   id: "overview"   },
  { label: "Schedule",   id: "schedule"   },
  { label: "Curriculum", id: "curriculum" },
  { label: "Instructor", id: "instructor" },
  { label: "Reviews",    id: "reviews"    },
  { label: "FAQs",       id: "faqs"       },
  { label: "Related",    id: "related"    },
];

const NAV_HEIGHT = 50; // px — height of the sticky bar itself

export function StickyCourseNav() {
  const [activeId, setActiveId] = useState("overview");
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /* Scroll active tab into view when it changes */
  useEffect(() => {
    btnRefs.current[activeId]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId]);

  /* Scroll-spy: highlight the section whose top is closest above the fold */
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + NAV_HEIGHT + 10;
      let current = NAV_ITEMS[0].id;
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set correct tab on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveId(id);
  }, []);

  return (
    <div id="course-sticky-nav" className="sticky top-0 z-20 border-b border-koenig-border bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-[15px] sm:px-6">
        {/* Tabs — scroll horizontally on their own; CTA stays put alongside them */}
        <div
          className="flex min-w-0 flex-1 gap-0 overflow-x-auto scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              ref={(el) => { btnRefs.current[id] = el; }}
              onClick={() => scrollTo(id)}
              className={`whitespace-nowrap border-b-2 px-5 py-3.5 text-sm font-medium transition ${
                activeId === id
                  ? "border-koenig-blue text-koenig-blue"
                  : "border-transparent text-koenig-muted hover:border-koenig-border hover:text-koenig-dark"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* View Schedule CTA — always visible in the same sticky row */}
        <button
          onClick={() => scrollTo("schedule")}
          className="flex-shrink-0 whitespace-nowrap rounded-full border-2 border-koenig-blue px-4 py-1.5 text-xs font-semibold text-koenig-blue transition hover:bg-koenig-blue/10 sm:px-5 sm:py-2 sm:text-sm"
        >
          View Schedule
        </button>
      </div>
    </div>
  );
}

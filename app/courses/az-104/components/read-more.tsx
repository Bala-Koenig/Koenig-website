"use client";
import { useState } from "react";

export function ReadMore({ children, lines = 6 }: { children: React.ReactNode; lines?: number }) {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <div>
        {children}
        <button
          onClick={() => setExpanded(false)}
          className="mt-1 cursor-pointer text-sm font-semibold text-koenig-blue hover:text-koenig-navy transition block"
        >
          Read less
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        style={{
          display: "-webkit-box",
          WebkitLineClamp: lines,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
      {/* Mobile: plain button below — no overlay, no white patch */}
      <button
        onClick={() => setExpanded(true)}
        className="sm:hidden mt-1 cursor-pointer text-sm font-semibold text-koenig-blue hover:text-koenig-navy transition"
      >
        Read more
      </button>

      {/* Desktop: inline overlay at end of last line */}
      <div className="hidden sm:flex absolute bottom-0 right-0 items-end">
        <div className="w-28 h-[1.4em] bg-gradient-to-r from-transparent to-white" />
        <span
          role="button"
          tabIndex={0}
          onClick={() => setExpanded(true)}
          className="bg-white cursor-pointer text-sm font-semibold text-koenig-blue hover:text-koenig-navy transition leading-[1.4em] pr-px"
        >
          ... Read more
        </span>
      </div>
    </div>
  );
}

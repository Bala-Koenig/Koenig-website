"use client";
import { useState } from "react";

const BG = "#040C18"; // matches dark end of banner gradient

interface Props {
  children: React.ReactNode;
}

export function BannerReadMore({ children }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {/* Mobile only */}
      <div className="sm:hidden">
        {expanded ? (
          <div className="[&>p:last-child]:mb-1">
            {children}
            <span
              role="button"
              tabIndex={0}
              onClick={() => setExpanded(false)}
              className="cursor-pointer text-sm font-semibold text-koenig-blue hover:text-cyan-300 transition block"
              style={{ marginTop: '-15px' }}
            >
              ... Read less
            </span>
          </div>
        ) : (
          <div className="relative">
            <div
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 7,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {children}
            </div>
            <div className="absolute bottom-0 right-0 flex items-end">
              <div
                className="h-[1.5em] w-20"
                style={{ background: `linear-gradient(to right, rgba(4,12,24,0), ${BG})` }}
              />
              <span
                role="button"
                tabIndex={0}
                onClick={() => setExpanded(true)}
                className="cursor-pointer text-sm font-semibold text-koenig-blue hover:text-cyan-300 transition leading-[1.5em]"
                style={{ background: BG }}
              >
                ... Read more
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Desktop: show all */}
      <div className="hidden sm:block">{children}</div>
    </div>
  );
}

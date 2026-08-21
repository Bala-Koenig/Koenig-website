"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface BreadcrumbTechDropdownProps {
  primary: string;
  related?: string[];
}

export function BreadcrumbTechDropdown({ primary, related = [] }: BreadcrumbTechDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (related.length === 0) {
    return <Link href="#" className="hover:text-koenig-blue">{primary}</Link>;
  }

  const all = [primary, ...related];

  return (
    <div ref={ref} className="relative inline-flex items-center">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 hover:text-koenig-blue"
        aria-expanded={open}
      >
        {primary}
        <span className="rounded-full bg-koenig-blue/10 px-1.5 py-0.5 text-[10px] font-semibold text-koenig-blue">
          +{related.length}
        </span>
        <svg
          width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[160px] rounded-lg border border-koenig-border bg-white py-1.5 shadow-lg">
          {all.map((tech) => (
            <Link
              key={tech}
              href="#"
              className="block whitespace-nowrap px-3 py-1.5 text-xs text-koenig-dark hover:bg-koenig-light hover:text-koenig-blue"
            >
              {tech}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

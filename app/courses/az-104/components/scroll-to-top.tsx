"use client";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Show only when scrolling UP and scrolled more than 300px
      setVisible(y < lastY && y > 300);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-20 right-4 z-50 flex items-center justify-center rounded-full bg-koenig-navy text-white shadow-lg transition-all hover:bg-koenig-blue active:scale-95
        h-9 w-9 sm:h-11 sm:w-11"
      style={{ boxShadow: "0 4px 20px rgba(6,148,209,0.35)" }}
    >
      <svg
        className="h-4 w-4 sm:h-5 sm:w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

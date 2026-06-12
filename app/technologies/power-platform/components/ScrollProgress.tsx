"use client";

import { useEffect, useState } from "react";

const C = { dark: "#093148", accent: "#0694D1", light: "#E4F7FF" };

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3px",
        zIndex: 50,
        backgroundColor: "transparent",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "3px",
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${C.accent}, ${C.light})`,
          transition: "width 0.1s ease-out",
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );
}

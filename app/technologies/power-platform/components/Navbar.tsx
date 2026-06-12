"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Overview",   href: "#overview"    },
  { label: "Curriculum", href: "#curriculum"  },
  { label: "Tools",      href: "#tools"       },
  { label: "Careers",    href: "#careers"     },
  { label: "Instructors",href: "#instructor"  },
  { label: "FAQ",        href: "#faq"         },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl border-b shadow-[0_4px_30px_rgba(2,15,24,0.7)]"
          : "bg-transparent"
      }`}
      style={scrolled ? { backgroundColor: "rgba(4,24,37,0.97)", borderBottomColor: "rgba(6,148,209,0.12)" } : {}}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8">
            <div
              className="absolute inset-0 rounded-lg rotate-6 group-hover:rotate-12 transition-transform duration-300"
              style={{ background: "linear-gradient(135deg, #0694D1, #093148)" }}
            />
            <div
              className="absolute inset-0 rounded-md flex items-center justify-center"
              style={{ backgroundColor: "#041825" }}
            >
              <span className="font-heading font-medium text-sm" style={{ color: "#E4F7FF" }}>K</span>
            </div>
          </div>
          <span className="font-heading font-medium text-lg hidden sm:block" style={{ color: "#E4F7FF" }}>
            Koenig<span style={{ color: "#0694D1" }}>.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-3.5 py-2 text-sm font-body rounded-lg transition-all duration-200"
                style={{ color: "rgba(228,247,255,0.6)" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#E4F7FF"; (e.target as HTMLElement).style.backgroundColor = "rgba(6,148,209,0.08)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(228,247,255,0.6)"; (e.target as HTMLElement).style.backgroundColor = "transparent"; }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            className="text-sm font-body transition-colors"
            style={{ color: "rgba(228,247,255,0.55)" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#E4F7FF")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(228,247,255,0.55)")}
          >
            Contact
          </a>
          <a
            href="#enroll"
            className="px-4 py-2 text-sm font-heading font-medium rounded-lg transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #0694D1, #08A8EC)",
              color: "#E4F7FF",
              boxShadow: "0 0 18px rgba(6,148,209,0.3)",
            }}
          >
            Enroll Now
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg transition-all"
          style={{ color: "rgba(228,247,255,0.6)" }}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-screen" : "max-h-0"}`}
      >
        <div
          className="backdrop-blur-xl border-t px-4 py-4 space-y-1"
          style={{ backgroundColor: "rgba(4,24,37,0.98)", borderTopColor: "rgba(6,148,209,0.12)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-body rounded-lg transition-all duration-200"
              style={{ color: "rgba(228,247,255,0.7)" }}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3" style={{ borderTop: "1px solid rgba(6,148,209,0.12)" }}>
            <a
              href="#enroll"
              className="block w-full text-center px-4 py-3 text-sm font-heading font-medium rounded-lg"
              style={{
                background: "linear-gradient(135deg, #0694D1, #08A8EC)",
                color: "#E4F7FF",
              }}
            >
              Enroll Now — Get 20% Off
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

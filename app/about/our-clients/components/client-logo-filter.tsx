"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type Client = {
  name: string;
  img: string;
  country: string;
  industry: string;
};

const CONTINENT: Record<string, string> = {
  "United States": "North America",
  India: "Asia",
  "United Kingdom": "Europe",
  "Saudi Arabia": "Asia",
  Japan: "Asia",
  Germany: "Europe",
  "United Arab Emirates": "Asia",
  France: "Europe",
  Netherlands: "Europe",
  International: "International",
  Other: "Other",
};

const PAGE_SIZE = 30;

export function ClientLogoFilter({ clients }: { clients: Client[] }) {
  const countries = useMemo(() => {
    const set = new Set(clients.map((c) => c.country));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [clients]);

  const industries = useMemo(() => {
    const set = new Set(clients.map((c) => c.industry));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [clients]);

  const [country, setCountry] = useState("India");
  const [industry, setIndustry] = useState("All industries");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setCountryOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setCountryOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const result = useMemo(() => {
    const hasIndustry = industry !== "All industries";
    const hasCountry = country !== "All countries";

    const base = clients.filter((c) => (!hasCountry || c.country === country) && (!hasIndustry || c.industry === industry));

    let list = base;
    let usedFallback = false;
    const continent = hasCountry ? CONTINENT[country] ?? "Other" : "";

    if (hasCountry && !hasIndustry && base.length < PAGE_SIZE) {
      const pool =
        continent !== "International" && continent !== "Other"
          ? clients.filter((c) => (CONTINENT[c.country] ?? "Other") === continent)
          : base;
      // Still short of a full page even with the rest of the continent — just
      // show everyone rather than a near-empty grid.
      list = pool.length >= PAGE_SIZE || pool.length === clients.length ? pool : clients;
      usedFallback = list.length > base.length;
    }

    return { list, usedFallback, continent };
  }, [clients, country, industry]);

  const shown = result.list.slice(0, visible);

  function resetFilters() {
    setCountry("India");
    setIndustry("All industries");
    setVisible(PAGE_SIZE);
  }

  const filteredCountryOptions = ["All countries", ...countries].filter((c) => c.toLowerCase().includes(countrySearch.toLowerCase()));

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 flex flex-col items-center gap-4 rounded-2xl border border-[#CAEFFF] bg-[#F0FAFF] p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm font-normal text-[#053148]">Select Country:</span>
          <div className="relative w-[240px]" ref={wrapRef}>
            <button
              type="button"
              onClick={() => setCountryOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={countryOpen}
              className="flex w-full items-center justify-between gap-2 rounded-lg border border-[#DEDEDE] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#053148] hover:border-[#0694D1]"
            >
              <span>{country}</span>
              <svg className={`h-3.5 w-3.5 text-[#7a8c96] transition-transform ${countryOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {countryOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 rounded-xl border border-[#DEDEDE] bg-white p-2 shadow-xl">
                <input
                  type="text"
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  placeholder="Search country..."
                  autoFocus
                  className="mb-1.5 w-full rounded-lg border border-[#DEDEDE] px-3 py-2 text-sm outline-none focus:border-[#0694D1]"
                />
                <div className="flex max-h-56 flex-col gap-0.5 overflow-y-auto">
                  {filteredCountryOptions.map((c) => {
                    const count = c === "All countries" ? clients.length : clients.filter((x) => x.country === c).length;
                    return (
                      <button
                        key={c}
                        type="button"
                        role="option"
                        aria-selected={c === country}
                        onClick={() => {
                          setCountry(c);
                          setVisible(PAGE_SIZE);
                          setCountryOpen(false);
                        }}
                        className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium ${c === country ? "bg-[#F0FAFF] font-bold text-[#0694D1]" : "text-[#053148] hover:bg-[#F0FAFF]"}`}
                      >
                        <span>{c}</span>
                        <span className={`text-xs font-medium ${c === country ? "text-[#0694D1]" : "text-[#7a8c96]"}`}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex max-w-full gap-2 overflow-x-auto px-1 pb-1" style={{ scrollbarWidth: "none" }}>
          {["All industries", ...industries].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setIndustry(label);
                setVisible(PAGE_SIZE);
              }}
              className={`flex-none whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-semibold transition ${
                industry === label ? "border-[#0694D1] bg-[#0694D1] text-white" : "border-[#DEDEDE] bg-white text-[#053148] hover:border-[#0694D1]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {result.list.length === 0 ? (
        <div className="rounded-xl border border-[#DEDEDE] bg-[#F8FBFE] py-12 text-center">
          <p className="mb-2 text-sm font-semibold text-[#053148]">No organisations for this filter</p>
          <button type="button" onClick={resetFilters} className="text-sm font-bold text-[#0694D1] underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {shown.map((c) => (
            <div
              key={c.name}
              tabIndex={0}
              title={c.name}
              className="group flex min-h-[96px] items-center justify-center rounded-xl border border-[#E2E8F0] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#0694D1] hover:shadow-[0_10px_24px_rgba(6,148,209,0.18)] focus-visible:-translate-y-1 focus-visible:border-[#0694D1] focus-visible:shadow-[0_10px_24px_rgba(6,148,209,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0694D1] focus-visible:ring-offset-2"
            >
              <img
                src={`/images/trusted-logos/${encodeURIComponent(c.img)}`}
                alt={c.name}
                className="h-12 w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      )}

      {shown.length < result.list.length && (
        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-lg border-[1.5px] border-[#0694D1] bg-white px-7 py-3 text-sm font-bold text-[#0694D1] transition hover:bg-[#0694D1] hover:text-white"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}

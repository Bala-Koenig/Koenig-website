"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { ClassroomBookingModal } from "./classroom-booking-modal";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type Batch = {
  id: number;
  title: string;
  startDate: string;     // ISO "YYYY-MM-DD"
  endDate: string;
  format: "Online" | "Classroom" | "1-on-1";
  mode: string;          // "8 Hrs/Day", "4 Hrs/Day (AM)", "4 Hrs/Day (PM)", "Weekend"
  seats: number;
  totalSeats: number;
  price: number;
  currency: string;      // "INR", "GBP", "EGP", "AED", "EUR", "CAD"
  location: string;
  gtr: boolean;
  isWeekend: boolean;
  days: string[];
  time: string;
  hoursPerDay: number;   // 8 or 4
};

/* ------------------------------------------------------------------ */
/*  Course-Level Pricing Constants                                     */
/* ------------------------------------------------------------------ */

const COURSE_PRICING = {
  online: { public: 42500, oneOnOne: 85000, flexi: 9990, currency: "INR" },
  classroom: {
    india: { price: 92500, currency: "INR" },
    gurgaon: { price: 129634, currency: "INR" },
    london: { price: 3393, currency: "GBP" },
    cairo: { price: 133920, currency: "EGP" },
    dubai: { price: 12341, currency: "AED" },
    madrid: { price: 2415, currency: "EUR" },
    munich: { price: 4063, currency: "EUR" },
    vancouver: { price: 5325, currency: "CAD" },
  },
};

/* ------------------------------------------------------------------ */
/*  City → Country helpers                                             */
/* ------------------------------------------------------------------ */

const CITY_COUNTRY: Record<string, { name: string; abbr: string }> = {
  Cairo:      { name: "Egypt",                abbr: "EG"  },
  London:     { name: "United Kingdom",        abbr: "UK"  },
  Dubai:      { name: "United Arab Emirates", abbr: "UAE" },
  Madrid:     { name: "Spain",                abbr: "ES"  },
  Munich:     { name: "Germany",              abbr: "DE"  },
  Vancouver:  { name: "Canada",               abbr: "CA"  },
  Gurgaon:    { name: "India",                abbr: "IN"  },
  Mumbai:     { name: "India",                abbr: "IN"  },
  Delhi:      { name: "India",                abbr: "IN"  },
  Riyadh:     { name: "Saudi Arabia",         abbr: "KSA" },
  Doha:       { name: "Qatar",                abbr: "QA"  },
  Singapore:  { name: "Singapore",            abbr: "SG"  },
};
const INTERNATIONAL_LOCATIONS = new Set(["Cairo", "London", "Dubai", "Madrid", "Munich", "Vancouver"]);
function cityWithCountry(city: string): string {
  const c = CITY_COUNTRY[city];
  if (!c) return city;
  const country = c.name.length > 12 ? c.abbr : c.name;
  return `${city}, ${country}`;
}
function getPaginationRange(current: number, total: number): number[] {
  if (total <= 4) return Array.from({ length: total }, (_, i) => i);
  let start = Math.max(0, current - 1);
  let end = Math.min(total - 1, start + 3);
  if (end - start < 3) start = Math.max(0, end - 3);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/* ------------------------------------------------------------------ */
/*  Real AZ-104 Schedule Data                                          */
/* ------------------------------------------------------------------ */

let _id = 0;
function mkOnline(start: string, end: string, mode: string, time: string, hrs: number, weekend: boolean, days: string[]): Batch {
  return { id: ++_id, title: `AZ-104 GTR Online`, startDate: start, endDate: end, format: "Online", mode, seats: Math.floor(Math.random() * 9) + 1, totalSeats: 15, price: COURSE_PRICING.online.public, currency: "INR", location: "Virtual", gtr: true, isWeekend: weekend, days, time, hoursPerDay: hrs };
}
function mkClass(start: string, end: string, city: string, price: number, currency: string, days: string[]): Batch {
  return { id: ++_id, title: `AZ-104 Classroom – ${city}`, startDate: start, endDate: end, format: "Classroom", mode: "8 Hrs/Day", seats: Math.floor(Math.random() * 9) + 1, totalSeats: 15, price, currency, location: city, gtr: true, isWeekend: false, days, time: "9:00 AM – 5:00 PM", hoursPerDay: 8 };
}

const batches: Batch[] = [
  /* ---- Online Batches (21) ---- */
  mkOnline("2026-02-21","2026-03-01","Weekend","10:00 AM – 2:00 PM",4,true,["Sat","Sun"]),
  mkOnline("2026-02-25","2026-03-02","8 Hrs/Day","9:00 AM – 5:00 PM",8,false,["Mon","Tue","Wed","Thu","Fri","Sat"]),
  mkOnline("2026-03-02","2026-03-05","8 Hrs/Day","9:00 AM – 5:00 PM",8,false,["Mon","Tue","Wed","Thu"]),
  mkOnline("2026-03-02","2026-03-11","4 Hrs/Day (AM)","9:00 AM – 1:00 PM",4,false,["Mon","Tue","Wed","Thu","Fri"]),
  mkOnline("2026-03-02","2026-03-11","4 Hrs/Day (PM)","2:00 PM – 6:00 PM",4,false,["Mon","Tue","Wed","Thu","Fri"]),
  mkOnline("2026-03-11","2026-03-16","8 Hrs/Day","9:00 AM – 5:00 PM",8,false,["Wed","Thu","Fri","Sat","Sun","Mon"]),
  mkOnline("2026-03-16","2026-03-19","8 Hrs/Day","9:00 AM – 5:00 PM",8,false,["Mon","Tue","Wed","Thu"]),
  mkOnline("2026-03-16","2026-03-25","4 Hrs/Day (AM)","9:00 AM – 1:00 PM",4,false,["Mon","Tue","Wed","Thu","Fri"]),
  mkOnline("2026-03-25","2026-03-30","8 Hrs/Day","9:00 AM – 5:00 PM",8,false,["Wed","Thu","Fri","Sat","Sun","Mon"]),
  mkOnline("2026-03-30","2026-04-02","8 Hrs/Day","9:00 AM – 5:00 PM",8,false,["Mon","Tue","Wed","Thu"]),
  mkOnline("2026-03-30","2026-04-08","4 Hrs/Day (AM)","9:00 AM – 1:00 PM",4,false,["Mon","Tue","Wed","Thu","Fri"]),
  mkOnline("2026-04-08","2026-04-13","8 Hrs/Day","9:00 AM – 5:00 PM",8,false,["Wed","Thu","Fri","Sat","Sun","Mon"]),
  mkOnline("2026-04-13","2026-04-16","8 Hrs/Day","9:00 AM – 5:00 PM",8,false,["Mon","Tue","Wed","Thu"]),
  mkOnline("2026-04-13","2026-04-22","4 Hrs/Day (AM)","9:00 AM – 1:00 PM",4,false,["Mon","Tue","Wed","Thu","Fri"]),
  mkOnline("2026-04-22","2026-04-27","8 Hrs/Day","9:00 AM – 5:00 PM",8,false,["Wed","Thu","Fri","Sat","Sun","Mon"]),
  mkOnline("2026-04-27","2026-04-30","8 Hrs/Day","9:00 AM – 5:00 PM",8,false,["Mon","Tue","Wed","Thu"]),
  mkOnline("2026-04-27","2026-05-06","4 Hrs/Day (AM)","9:00 AM – 1:00 PM",4,false,["Mon","Tue","Wed","Thu","Fri"]),
  mkOnline("2026-05-06","2026-05-11","8 Hrs/Day","9:00 AM – 5:00 PM",8,false,["Wed","Thu","Fri","Sat","Sun","Mon"]),
  mkOnline("2026-05-11","2026-05-14","8 Hrs/Day","9:00 AM – 5:00 PM",8,false,["Mon","Tue","Wed","Thu"]),
  mkOnline("2026-05-11","2026-05-20","4 Hrs/Day (AM)","9:00 AM – 1:00 PM",4,false,["Mon","Tue","Wed","Thu","Fri"]),
  mkOnline("2026-05-20","2026-05-25","8 Hrs/Day","9:00 AM – 5:00 PM",8,false,["Wed","Thu","Fri","Sat","Sun","Mon"]),

  /* ---- Classroom Batches (64) — 14 cities, ~4-5 batches each ---- */
  // Cairo
  mkClass("2026-03-02","2026-03-05","Cairo",133920,"EGP",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-16","2026-03-19","Cairo",133920,"EGP",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-30","2026-04-02","Cairo",133920,"EGP",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-13","2026-04-16","Cairo",133920,"EGP",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","Cairo",133920,"EGP",["Mon","Tue","Wed","Thu"]),
  // London
  mkClass("2026-03-02","2026-03-05","London",3393,"GBP",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-16","2026-03-19","London",3393,"GBP",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-30","2026-04-02","London",3393,"GBP",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-13","2026-04-16","London",3393,"GBP",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","London",3393,"GBP",["Mon","Tue","Wed","Thu"]),
  // Mumbai
  mkClass("2026-03-02","2026-03-05","Mumbai",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-16","2026-03-19","Mumbai",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-30","2026-04-02","Mumbai",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-13","2026-04-16","Mumbai",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","Mumbai",92500,"INR",["Mon","Tue","Wed","Thu"]),
  // Delhi
  mkClass("2026-03-02","2026-03-05","Delhi",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-16","2026-03-19","Delhi",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-30","2026-04-02","Delhi",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-13","2026-04-16","Delhi",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","Delhi",92500,"INR",["Mon","Tue","Wed","Thu"]),
  // Kolkata
  mkClass("2026-03-02","2026-03-05","Kolkata",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-16","2026-03-19","Kolkata",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-13","2026-04-16","Kolkata",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","Kolkata",92500,"INR",["Mon","Tue","Wed","Thu"]),
  // Udaipur
  mkClass("2026-03-02","2026-03-05","Udaipur",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-16","2026-03-19","Udaipur",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-13","2026-04-16","Udaipur",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","Udaipur",92500,"INR",["Mon","Tue","Wed","Thu"]),
  // Gurgaon
  mkClass("2026-03-02","2026-03-05","Gurgaon",129634,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-16","2026-03-19","Gurgaon",129634,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-30","2026-04-02","Gurgaon",129634,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-13","2026-04-16","Gurgaon",129634,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","Gurgaon",129634,"INR",["Mon","Tue","Wed","Thu"]),
  // Bangalore
  mkClass("2026-03-02","2026-03-05","Bangalore",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-16","2026-03-19","Bangalore",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-30","2026-04-02","Bangalore",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-13","2026-04-16","Bangalore",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","Bangalore",92500,"INR",["Mon","Tue","Wed","Thu"]),
  // Hyderabad
  mkClass("2026-03-02","2026-03-05","Hyderabad",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-16","2026-03-19","Hyderabad",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-30","2026-04-02","Hyderabad",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-13","2026-04-16","Hyderabad",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","Hyderabad",92500,"INR",["Mon","Tue","Wed","Thu"]),
  // Dubai
  mkClass("2026-03-02","2026-03-05","Dubai",12341,"AED",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-16","2026-03-19","Dubai",12341,"AED",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-30","2026-04-02","Dubai",12341,"AED",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-13","2026-04-16","Dubai",12341,"AED",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","Dubai",12341,"AED",["Mon","Tue","Wed","Thu"]),
  // Shillong
  mkClass("2026-03-02","2026-03-05","Shillong",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-30","2026-04-02","Shillong",92500,"INR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","Shillong",92500,"INR",["Mon","Tue","Wed","Thu"]),
  // Vancouver
  mkClass("2026-03-02","2026-03-05","Vancouver",5325,"CAD",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-16","2026-03-19","Vancouver",5325,"CAD",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-13","2026-04-16","Vancouver",5325,"CAD",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","Vancouver",5325,"CAD",["Mon","Tue","Wed","Thu"]),
  // Madrid
  mkClass("2026-03-02","2026-03-05","Madrid",2415,"EUR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-16","2026-03-19","Madrid",2415,"EUR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-13","2026-04-16","Madrid",2415,"EUR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","Madrid",2415,"EUR",["Mon","Tue","Wed","Thu"]),
  // Munich
  mkClass("2026-03-02","2026-03-05","Munich",4063,"EUR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-03-16","2026-03-19","Munich",4063,"EUR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-13","2026-04-16","Munich",4063,"EUR",["Mon","Tue","Wed","Thu"]),
  mkClass("2026-04-27","2026-04-30","Munich",4063,"EUR",["Mon","Tue","Wed","Thu"]),
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const TIMEZONE_OFFSETS: Record<string, string> = {
  IST: "UTC+5:30",
  EST: "UTC-5",
  PST: "UTC-8",
  GMT: "UTC",
  CET: "UTC+1",
  EET: "UTC+2",
  GST: "UTC+4",
  AST: "UTC+3",
  PT: "UTC-8",
};

const CURRENCY_MAP: Record<string, string> = {
  INR: "en-IN", GBP: "en-GB", EGP: "en-EG", AED: "ar-AE", EUR: "de-DE", CAD: "en-CA",
};

function formatCurrency(amount: number, currency: string): string {
  const locale = CURRENCY_MAP[currency] || "en-US";
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency, currencyDisplay: "code", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

/** Local ISO date string — avoids UTC timezone shift from toISOString() */
function toLocalIso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getMonthDays(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const startMonday = getMonday(first);
  const days: Date[] = [];
  const d = new Date(startMonday);
  // generate 42 days (6 weeks) to cover any month layout
  for (let i = 0; i < 42; i++) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}


function isTodayCheck(iso: string, todayIso: string): boolean {
  return iso === todayIso;
}

function getNextBatch(allBatches: Batch[], todayIso: string): Batch | null {
  const future = allBatches.filter(b => b.startDate >= todayIso).sort((a, b) => a.startDate.localeCompare(b.startDate));
  return future[0] || null;
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.ceil((db.getTime() - da.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDateRange(startIso: string, endIso: string): string {
  const s = new Date(startIso + "T00:00:00");
  const e = new Date(endIso + "T00:00:00");
  const sMonth = s.toLocaleDateString("en-US", { month: "short" });
  const eMonth = e.toLocaleDateString("en-US", { month: "short" });
  const sDay = s.getDate();
  const eDay = e.getDate();
  const year = s.getFullYear();
  if (sMonth === eMonth) {
    return `${sMonth} ${sDay} \u2013 ${eDay}, ${year}`;
  }
  return `${sMonth} ${sDay} \u2013 ${eMonth} ${eDay}, ${year}`;
}

function getWeekDates(weekStart: Date): { day: string; date: number; iso: string }[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    const iso = toLocalIso(d);
    return { day, date: d.getDate(), iso };
  });
}

function getWeekLabel(weekStart: Date): string {
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);
  const sMonth = weekStart.toLocaleDateString("en-US", { month: "short" });
  const eMonth = end.toLocaleDateString("en-US", { month: "short" });
  const sDay = weekStart.getDate();
  const eDay = end.getDate();
  const year = weekStart.getFullYear();
  if (sMonth === eMonth) {
    return `${sMonth} ${sDay} \u2014 ${sMonth} ${eDay}, ${year}`;
  }
  return `${sMonth} ${sDay} \u2014 ${eMonth} ${eDay}, ${year}`;
}

function isCurrentWeek(weekStart: Date): boolean {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);
  return now >= weekStart && now <= end;
}

function batchFallsOnDate(batch: Batch, iso: string): boolean {
  return batch.startDate <= iso && batch.endDate >= iso;
}

function batchColor(batch: Batch): string {
  if (batch.format === "1-on-1") return "bg-koenig-navy";
  if (batch.format === "Classroom") return "bg-amber-500";
  return "bg-koenig-blue"; // Online
}

function batchDotColor(batch: Batch): string {
  if (batch.isWeekend) return "bg-purple-500";
  if (batch.format === "1-on-1") return "bg-purple-500";
  if (batch.format === "Classroom") return "bg-amber-500";
  return "bg-koenig-blue";
}

/* Within each run of same-date batches, interleave Online/Classroom instead of clumping by format */
function interleaveByFormat(list: Batch[]): Batch[] {
  const result: Batch[] = [];
  let i = 0;
  while (i < list.length) {
    let j = i;
    while (j < list.length && list[j].startDate === list[i].startDate) j++;
    const online = [];
    const classroom = [];
    for (const b of list.slice(i, j)) (b.format === "Classroom" ? classroom : online).push(b);
    let oi = 0, ci = 0;
    while (oi < online.length || ci < classroom.length) {
      if (oi < online.length) result.push(online[oi++]);
      if (ci < classroom.length) result.push(classroom[ci++]);
    }
    i = j;
  }
  return result;
}

/* Group batches in a calendar day cell: online shown individually, classroom grouped */
type DayItem =
  | { type: "online"; batch: Batch; isStart: boolean }
  | { type: "classroom-group"; batches: Batch[]; isStart: boolean; cities: string[] };

function groupBatchesForDay(dayBatches: Batch[], iso: string): DayItem[] {
  const items: DayItem[] = [];
  const online = dayBatches.filter(b => b.format !== "Classroom");
  const classroom = dayBatches.filter(b => b.format === "Classroom");

  for (const b of online) {
    items.push({ type: "online", batch: b, isStart: b.startDate === iso });
  }

  if (classroom.length > 0) {
    const groups = new Map<string, Batch[]>();
    for (const b of classroom) {
      const key = `${b.startDate}_${b.endDate}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(b);
    }
    for (const [, grp] of groups) {
      items.push({
        type: "classroom-group",
        batches: grp,
        isStart: grp[0].startDate === iso,
        cities: grp.map(b => b.location),
      });
    }
  }
  return items;
}

/* Stable color palette — brand theme only
   Colors: koenig-blue, koenig-navy, koenig-accent, cyan (brand gradient),
           amber (Classroom legend), purple (Weekend/1-on-1 legend), green (GTR legend), sky */
const SPAN_PALETTE = [
  { bg: "#EBF8FE", bar: "#0694D1", text: "#0577A8" },  // koenig-blue (primary)
  { bg: "#E4EEF3", bar: "#093148", text: "#093148" },  // koenig-navy
  { bg: "#E0F2FA", bar: "#0577A8", text: "#045D88" },  // koenig-accent
  { bg: "#ECFEFF", bar: "#06B6D4", text: "#0891B2" },  // cyan (brand gradient end)
  { bg: "#FFF8EF", bar: "#F59E0B", text: "#B45309" },  // amber — Classroom (legend)
  { bg: "#F5F3FF", bar: "#8B5CF6", text: "#6D28D9" },  // purple — Weekend/1-on-1 (legend)
  { bg: "#ECFDF5", bar: "#10B981", text: "#047857" },  // green — GTR (legend)
  { bg: "#F0F9FF", bar: "#0EA5E9", text: "#0369A1" },  // sky-blue (brand adjacent)
];

function getBatchColorIdx(id: number): number {
  return id % SPAN_PALETTE.length;
}

/* Return CSS grid col positions (1-based, end is exclusive) for a batch within a week */
type SpanInfo = { col1: number; col2: number; isStart: boolean; isEnd: boolean };
function getBatchSpan(batch: Batch, weekIsos: string[]): SpanInfo | null {
  const first = weekIsos[0];
  const last = weekIsos[weekIsos.length - 1];
  if (batch.endDate < first || batch.startDate > last) return null;
  let c1 = weekIsos.findIndex(iso => iso >= batch.startDate);
  let c2 = -1;
  for (let i = weekIsos.length - 1; i >= 0; i--) {
    if (weekIsos[i] <= batch.endDate) { c2 = i; break; }
  }
  return {
    col1: (c1 === -1 ? 0 : c1) + 1,
    col2: (c2 === -1 ? weekIsos.length - 1 : c2) + 2,
    isStart: batch.startDate >= first,
    isEnd: batch.endDate <= last,
  };
}

type SpanItem = { batch: Batch; col1: number; col2: number; isStart: boolean; isEnd: boolean };
/* Assign batches to non-overlapping lanes so they can stack without collision */
function assignSpanLanes(batches: Batch[], weekIsos: string[]): SpanItem[][] {
  const lanes: SpanItem[][] = [];
  for (const batch of batches) {
    const span = getBatchSpan(batch, weekIsos);
    if (!span) continue;
    let placed = false;
    for (const lane of lanes) {
      if (!lane.some(s => s.col1 < span.col2 && s.col2 > span.col1)) {
        lane.push({ batch, ...span });
        placed = true;
        break;
      }
    }
    if (!placed) lanes.push([{ batch, ...span }]);
  }
  return lanes;
}

function seatStatus(batch: Batch): { label: string; text: string; color: string; dot: string } {
  if (batch.seats <= 3) return { label: `${batch.seats} left · Almost full`,   text: "Almost full",     color: "text-koenig-navy",  dot: "bg-koenig-navy"  };
  if (batch.seats <= 6) return { label: `${batch.seats} left · Limited seats`, text: "Limited seats",   color: "text-koenig-navy",  dot: "bg-koenig-navy"  };
  return                       { label: `${batch.seats} seats available`,       text: "Seats available", color: "text-koenig-muted",  dot: "bg-koenig-muted"  };
}

function seatBarWidth(batch: Batch): string {
  const filled = batch.totalSeats - batch.seats;
  return `${Math.round((filled / batch.totalSeats) * 100)}%`;
}

function seatBarColor(batch: Batch): string {
  if (batch.seats <= 6) return "bg-koenig-navy";
  return "bg-koenig-muted";
}

/** AZ-104 total training hours */
const COURSE_TOTAL_HOURS = 32;

/**
 * Given a start date, daily hours (4 or 8), and schedule type,
 * count forward the required training days and return the end date ISO string.
 */
function calcOo1EndDate(startIso: string, hrsPerDay: 4 | 8, schedule: "weekday" | "weekend"): string {
  const totalDays = COURSE_TOTAL_HOURS / hrsPerDay; // 4 or 8
  const d = new Date(startIso + "T00:00:00");
  let counted = 0;
  while (counted < totalDays) {
    const dow = d.getDay(); // 0=Sun,1=Mon,...,6=Sat
    const valid = schedule === "weekday" ? (dow >= 1 && dow <= 5) : (dow === 0 || dow === 6);
    if (valid) counted++;
    if (counted < totalDays) d.setDate(d.getDate() + 1);
  }
  return toLocalIso(d);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type CourseSchedulerProps = {
  initialBatches?: Batch[];
  courseTitle?: string;
};

export function CourseScheduler({ initialBatches, courseTitle = "AZ-104: Microsoft Azure Administrator" }: CourseSchedulerProps = {}) {
  const router = useRouter();
  const activeBatches = initialBatches && initialBatches.length > 0 ? initialBatches : batches;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = toLocalIso(today);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [scheduleInView, setScheduleInView] = useState(false);
  useEffect(() => {
    const el = document.getElementById("schedule");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setScheduleInView(e.isIntersecting), { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const tabRowRef = useRef<HTMLDivElement>(null);
  const [tabsFloating, setTabsFloating] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const tab = tabRowRef.current;
      const schedule = document.getElementById("schedule");
      if (!tab || !schedule) return;
      const tabBottom = tab.getBoundingClientRect().bottom;
      const scheduleBottom = schedule.getBoundingClientRect().bottom;
      setTabsFloating(tabBottom < 0 && scheduleBottom > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const [activeView, setActiveView] = useState<"calendar" | "list" | "compare">("list");
  const [listPage, setListPage] = useState(0);
  const [certSelected, setCertSelected] = useState<Set<number>>(new Set());
  const [breakdownOpen, setBreakdownOpen] = useState<number | null>(null);
  const EXAM_FEE_INR = 4800;
  const GST_RATE = 0.18;
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  // Classroom Training booking popup — opens only for Classroom-format batches
  const [bookingBatch, setBookingBatch] = useState<Batch | null>(null);
  function openBookingIfClassroom(b: Batch | null | undefined) {
    if (b && b.format === "Classroom") setBookingBatch(b);
  }
  // Online batches skip the popup entirely and go to the full checkout page
  function goToOnlineCheckout(b: Batch | null | undefined) {
    if (!b || b.format !== "Online") return;
    const params = new URLSearchParams({
      title: courseTitle,
      start: b.startDate,
      end: b.endDate,
      time: b.time,
      price: String(b.price),
      currency: b.currency,
    });
    router.push(`/courses/az-104/checkout?${params.toString()}`);
  }
  const [activeFormat, setActiveFormat] = useState<string>("All");
  const [scheduleType, setScheduleType] = useState<"weekday" | "weekend" | "all">("all");
  const [currentWeekStart, setCurrentWeekStart] = useState(() => getMonday(today));
  const [timezone, setTimezone] = useState("IST");
  const [compareBatches, setCompareBatches] = useState<Set<number>>(new Set());
  const [comparePage, setComparePage] = useState(0);
  const COMPARE_PAGE_SIZE = 12; // 4 rows × 3 cols
  const [pricingTab, setPricingTab] = useState<"public" | "one-on-one" | "self-paced">("one-on-one");
  const [detailTab, setDetailTab] = useState<string>("public");
  const [flexiModalOpen, setFlexiModalOpen] = useState(false);
  const [detailInfoModal, setDetailInfoModal] = useState<"public" | "one-on-one" | null>(null);
  const [tzOpen, setTzOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerMonth, setPickerMonth] = useState(today.getMonth());
  const [pickerYear, setPickerYear] = useState(today.getFullYear());
  const [expanded, setExpanded] = useState(false);
  const [gtrOnly, setGtrOnly] = useState(false);
  const [flexiExamSelected, setFlexiExamSelected] = useState(false);
  const [flexiLabsSelected, setFlexiLabsSelected] = useState(false);
  const [flexiBreakdownOpen, setFlexiBreakdownOpen] = useState(false);
  const [pubBreakdownOpen, setPubBreakdownOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<"format" | "schedule" | "availability" | "timezone">("format");
  const [tzSearch, setTzSearch] = useState("");
  const [oneOnOneDuration, setOneOnOneDuration] = useState<"4h" | "8h">("8h");
  const [oneOnOneSchedule, setOneOnOneSchedule] = useState<"weekday" | "weekend">("weekday");
  const [oneOnOneDate, setOneOnOneDate] = useState("");
  const [oneOnOneBreakdownOpen, setOneOnOneBreakdownOpen] = useState(false);
  const [oo1InlineBreakdownOpen, setOo1InlineBreakdownOpen] = useState(false);
  const [oneOnOneCert, setOneOnOneCert] = useState(false);
  const [oneOnOneTime, setOneOnOneTime] = useState("09:00 AM");
  const [oneOnOneTZ, setOneOnOneTZ] = useState("IST");
  const [oneOnOneTimeChosen, setOneOnOneTimeChosen] = useState(false);
  const [oneOnOneTZChosen, setOneOnOneTZChosen] = useState(false);
  const [oneOnOneTimeOpen, setOneOnOneTimeOpen] = useState(false);
  const [oneOnOneTZOpen, setOneOnOneTZOpen] = useState(false);
  const [oo1EnrollError, setOo1EnrollError] = useState("");
  const [oo1CalMonth, setOo1CalMonth] = useState(today.getMonth());
  const [oo1CalYear, setOo1CalYear] = useState(today.getFullYear());
  const [oo1CalOpen, setOo1CalOpen] = useState(false);
  const [oo1TempDate, setOo1TempDate] = useState("");
  const [stackModalOpen, setStackModalOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = stackModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [stackModalOpen]);
  const FLEXI_VIDEO = 9990;
  const FLEXI_EXAM = 4619;
  const FLEXI_LABS = 4529;
  const pickerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const compareResultRef = useRef<HTMLDivElement>(null);

  /* Next available batch */
  const nextBatch = useMemo(() => getNextBatch(batches, todayIso), [todayIso]);

  /* Auto-select first batch on mount; navigate calendar to next batch */
  useEffect(() => {
    setSelectedBatch(activeBatches[0] ?? null);
    if (nextBatch) {
      setCurrentWeekStart(getMonday(new Date(nextBatch.startDate + "T00:00:00")));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Reset detail card tab when a new batch is selected */
  useEffect(() => { setDetailTab("public"); }, [selectedBatch?.id]);

  /* Auto-scroll to comparison section when 3 batches selected */
  useEffect(() => {
    if (compareBatches.size === 3) {
      setTimeout(() => compareResultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [compareBatches.size]);

  /* Close picker on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    }
    if (pickerOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [pickerOpen]);

  /* Filtered batches */
  const filtered = useMemo(() => {
    const sorted = activeBatches.filter((b) => {
      if (activeFormat !== "All" && b.format !== activeFormat) return false;
      if (scheduleType === "weekday" && b.isWeekend) return false;
      if (scheduleType === "weekend" && !b.isWeekend) return false;
      if (gtrOnly && !b.gtr) return false;
      return true;
    }).sort((a, b) => a.startDate.localeCompare(b.startDate));
    return interleaveByFormat(sorted);
  }, [activeFormat, scheduleType, gtrOnly]);

  /* Reset list page when filters change */
  useEffect(() => { setListPage(0); }, [activeFormat, scheduleType, gtrOnly]);

  /* Toggle compare */
  function toggleCompare(id: number) {
    setCompareBatches((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      }
      return next;
    });
  }

  /* Navigate weeks */
  function prevPeriod() {
    setCurrentWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  }
  function nextPeriod() {
    setCurrentWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  }

  /* Week dates for calendar */
  const weekDates = getWeekDates(currentWeekStart);

  /* Prev/next labels */
  const prevWeekDate = new Date(currentWeekStart);
  prevWeekDate.setDate(prevWeekDate.getDate() - 7);
  const nextWeekDate = new Date(currentWeekStart);
  nextWeekDate.setDate(nextWeekDate.getDate() + 7);

  /* 4-week rolling view data */
  const fourWeeks = useMemo(() => {
    const weeks: Date[] = [];
    const d = new Date(currentWeekStart);
    for (let i = 0; i < 4; i++) {
      weeks.push(new Date(d));
      d.setDate(d.getDate() + 7);
    }
    return weeks;
  }, [currentWeekStart]);
  const fourWeekEnd = new Date(currentWeekStart);
  fourWeekEnd.setDate(fourWeekEnd.getDate() + 27);
  const fourWeekLabel = `${formatDate(toLocalIso(currentWeekStart))} \u2014 ${formatDate(toLocalIso(fourWeekEnd))}, ${currentWeekStart.getFullYear()}`;

  /* Picker month days */
  const pickerDays = useMemo(() => getMonthDays(pickerYear, pickerMonth), [pickerYear, pickerMonth]);
  /* Batch dates set for picker dots */
  const batchDateSet = useMemo(() => {
    const s = new Set<string>();
    activeBatches.forEach(b => {
      const d = new Date(b.startDate + "T00:00:00");
      while (toLocalIso(d) <= b.endDate) {
        s.add(toLocalIso(d));
        d.setDate(d.getDate() + 1);
      }
    });
    return s;
  }, []);

  /* Upcoming batches not in current week */
  const upcomingBatches = filtered
    .filter((b) => b.startDate > weekDates[6].iso)
    .slice(0, 3);

  /* Selected pricing */
  const selectedPrice =
    pricingTab === "public"
      ? selectedBatch?.price ?? COURSE_PRICING.online.public
      : pricingTab === "one-on-one"
      ? COURSE_PRICING.online.oneOnOne
      : COURSE_PRICING.online.flexi;
  const selectedCurrency = pricingTab === "public" ? (selectedBatch?.currency ?? "INR") : "INR";

  return (
    <>
    <section id="schedule" className="relative overflow-hidden border-t border-b border-koenig-border bg-white px-3 sm:px-6 py-8 sm:py-14">
      {/* Top accent gradient bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-koenig-blue via-cyan-400 to-koenig-blue/50" />
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-[450px] w-[450px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.10) 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-[380px] w-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,191,239,0.10) 0%, transparent 70%)' }} />

      <div className="relative mx-auto max-w-7xl">

        {/* ── Section Header ── */}
        <div className="mb-5 sm:mb-10 text-center">
          <p className="mb-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-koenig-blue">Training Schedule</p>
          <h2 className="text-xl sm:text-2xl font-bold text-koenig-dark">
            Schedule Your <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Training</span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-koenig-muted">Pick your ideal date · All public batches guaranteed to run</p>
        </div>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* CARD 1 — Choose your training mode                            */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <div ref={card1Ref} className="rounded-2xl border border-koenig-border bg-white" style={{ boxShadow: '0 8px 40px 0 rgba(6, 148, 209, 0.30), 0 2px 8px 0 rgba(6, 148, 209, 0.18)' }}>
          {/* Card header */}
          <div className="rounded-t-2xl flex flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-koenig-blue/30 bg-gradient-to-r from-koenig-navy to-koenig-blue px-4 sm:px-6 py-2 sm:py-3">
            <span className="text-xs sm:text-sm font-semibold text-white">Choose Your Training Mode</span>
            <span className="ml-auto flex flex-col items-end whitespace-nowrap">
              <span className="text-xs sm:text-sm font-extrabold text-white">
                {pricingTab === "one-on-one" && "From INR 85,000"}
                {pricingTab === "public" && "From INR 42,500"}
                {pricingTab === "self-paced" && "From INR 9,990"}
              </span>
              <span className="text-[10px] sm:text-[11px] font-normal text-white/70">excl. VAT/GST</span>
            </span>
          </div>
          {/* ── Tab switcher (all screen sizes) ── */}
          <div>
            {/* 3 tab buttons */}
            <div ref={tabRowRef} className="flex gap-1.5 sm:gap-2 px-3 sm:px-4 pt-3 pb-2 sm:pt-4 sm:pb-3">
              <button
                onClick={() => setPricingTab("one-on-one")}
                className={`flex-1 rounded-xl border py-2 sm:py-[11px] transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${pricingTab === "one-on-one" ? "bg-koenig-blue border-koenig-blue text-white shadow-md" : "border-koenig-blue/30 text-koenig-blue bg-sky-50 shadow-sm hover:bg-sky-100 hover:border-koenig-blue/60"}`}
              >
                {pricingTab === "one-on-one"
                  ? <svg width="14" height="14" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="white"/><polyline points="6 12 10 16 18 8" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg width="14" height="14" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4"/><polyline points="6 12 10 16 18 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3"/></svg>
                }
                <span className="text-xs sm:text-sm font-extrabold"><span className="hidden sm:inline">1-on-1 Training</span><span className="sm:hidden">1-on-1</span></span>
              </button>
              <button
                onClick={() => setPricingTab("public")}
                className={`flex-1 rounded-xl border py-2 sm:py-[11px] transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${pricingTab === "public" ? "bg-koenig-blue border-koenig-blue text-white shadow-md" : "border-koenig-blue/30 text-koenig-blue bg-sky-50 shadow-sm hover:bg-sky-100 hover:border-koenig-blue/60"}`}
              >
                {pricingTab === "public"
                  ? <svg width="14" height="14" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="white"/><polyline points="6 12 10 16 18 8" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg width="14" height="14" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4"/><polyline points="6 12 10 16 18 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3"/></svg>
                }
                <span className="text-xs sm:text-sm font-extrabold"><span className="hidden sm:inline">Public Training</span><span className="sm:hidden">Public</span></span>
              </button>
              <button
                onClick={() => setPricingTab("self-paced")}
                className={`flex-1 rounded-xl border py-2 sm:py-[11px] transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${pricingTab === "self-paced" ? "bg-koenig-blue border-koenig-blue text-white shadow-md" : "border-koenig-blue/30 text-koenig-blue bg-sky-50 shadow-sm hover:bg-sky-100 hover:border-koenig-blue/60"}`}
              >
                {pricingTab === "self-paced"
                  ? <svg width="14" height="14" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="white"/><polyline points="6 12 10 16 18 8" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg width="14" height="14" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4"/><polyline points="6 12 10 16 18 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3"/></svg>
                }
                <span className="text-xs sm:text-sm font-extrabold">Flexi<span className="hidden sm:inline text-xs font-normal opacity-75"> (Self Paced)</span></span>
              </button>
            </div>

            {/* Tab content panel */}
            <div className="px-3 sm:px-4 pb-4">

              {pricingTab === "one-on-one" && (
                <div className="rounded-xl border border-koenig-navy/30 bg-transparent overflow-hidden">
                  <div className="pl-5 pr-3 pt-[15px] pb-3">
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {["Private instructor", "Any date", "Flexible hours", "Personalised curriculum"].map((tag) => (
                        <span key={tag} className="rounded-full bg-koenig-navy/10 px-2.5 py-0.5 text-[11px] font-medium text-koenig-navy border border-koenig-navy/20">{tag}</span>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <ul className="flex flex-col gap-y-0.5">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-navy" />
                          <span className="text-xs font-bold text-koenig-dark">Live Training (Duration: 32 Hours)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-navy" />
                          <span className="text-xs font-semibold text-koenig-gray">Also available in <span className="text-koenig-blue">Arabic</span>, <span className="text-koenig-blue">Japanese</span>, <span className="text-koenig-blue">Polish</span> &amp; <span className="text-koenig-blue">Spanish</span></span>
                        </li>
                      </ul>
                      <ul className="flex flex-col gap-y-0.5">
                        {[{ text: "Per Participant", bold: false }, { text: "Guaranteed-to-Run (GTR)", bold: false }].map(({ text, bold }) => (
                          <li key={text} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-navy" />
                            <span className={`text-xs ${bold ? "font-bold text-koenig-dark" : "font-semibold text-koenig-gray"}`}>{text}</span>
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => setStackModalOpen(true)} className="flex-shrink-0 cursor-pointer rounded-lg border border-koenig-blue/30 bg-koenig-blue/8 px-3 py-2 text-[11px] font-semibold text-koenig-blue hover:bg-koenig-blue/15 transition whitespace-nowrap flex flex-col items-center gap-0.5 sm:ml-auto sm:mr-[150px]">
                        <span>Koenig Learning Stack*</span>
                        <span className="text-[10px] font-normal text-koenig-blue/70">click here to view</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {pricingTab === "public" && (
                <div className="rounded-xl border border-koenig-blue/30 bg-transparent overflow-hidden">
                  <div className="pl-5 pr-3 pt-[15px] pb-3">
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {["Live online & classroom", "Scheduled dates", "GTR assured", "MCT-led"].map((tag) => (
                        <span key={tag} className="rounded-full bg-koenig-blue/10 px-2.5 py-0.5 text-[11px] font-medium text-koenig-blue border border-koenig-blue/20">{tag}</span>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <ul className="flex flex-col gap-y-0.5">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-blue" />
                          <span className="text-xs font-bold text-koenig-dark">Live Training (Duration: 32 Hours)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-blue" />
                          <span className="text-xs font-semibold text-koenig-gray">Also available in <span className="text-koenig-blue">Arabic</span>, <span className="text-koenig-blue">Japanese</span>, <span className="text-koenig-blue">Polish</span> &amp; <span className="text-koenig-blue">Spanish</span></span>
                        </li>
                      </ul>
                      <ul className="flex flex-col gap-y-0.5">
                        {[{ text: "Per Participant", bold: false }].map(({ text, bold }) => (
                          <li key={text} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-blue" />
                            <span className={`text-xs ${bold ? "font-bold text-koenig-dark" : "font-semibold text-koenig-gray"}`}>{text}</span>
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => setStackModalOpen(true)} className="flex-shrink-0 cursor-pointer rounded-lg border border-koenig-blue/30 bg-koenig-blue/8 px-3 py-2 text-[11px] font-semibold text-koenig-blue hover:bg-koenig-blue/15 transition whitespace-nowrap flex flex-col items-center gap-0.5 sm:ml-auto sm:mr-[150px]">
                        <span>Koenig Learning Stack*</span>
                        <span className="text-[10px] font-normal text-koenig-blue/70">click here to view</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {pricingTab === "self-paced" && (
                <div className="rounded-xl border border-koenig-accent/30 bg-transparent overflow-hidden">
                  <div className="pl-5 pr-3 pt-[15px] pb-3">
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {["Start anytime", "6 months access", "MCT support", "Learn at your pace"].map((tag) => (
                        <span key={tag} className="rounded-full bg-koenig-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-koenig-accent border border-koenig-accent/20">{tag}</span>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <ul className="flex flex-col gap-y-0.5">
                        {["Access within 30 minutes", "Microsoft Learn content + hands-on labs (Optional)", "6 Hrs free MCT consultation"].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-accent" />
                            <span className="text-xs font-semibold text-koenig-gray">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <ul className="flex flex-col gap-y-0.5">
                        {["6 months video access · Exam prep (Qubits)", "Certificate of Completion"].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-accent" />
                            <span className="text-xs font-semibold text-koenig-gray">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* ── Desktop: 3-column grid (hidden) ── */}
          <div className="hidden">

            {/* ── 1-on-1 Training — Navy / Premium ── */}
            <div onClick={() => setPricingTab("one-on-one")} className={`group relative flex flex-col overflow-hidden rounded-xl bg-white transition-all duration-200 cursor-pointer ${pricingTab === "one-on-one" ? "border-2 border-koenig-navy shadow-md" : "border border-koenig-navy/20 hover:border-koenig-navy/50 hover:shadow-lg"}`}>
              {/* Top accent stripe */}
              <div className="h-1 w-full bg-koenig-navy" />
              <div className="flex flex-1 flex-col p-4">
                {/* Badge */}
                <div className={`absolute right-3 top-4 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${pricingTab === "one-on-one" ? "bg-koenig-navy text-white" : "bg-koenig-navy/10 text-koenig-navy"}`}>{pricingTab === "one-on-one" ? "Selected" : "Premium"}</div>
                {/* Icon + title */}
                <div className="mb-3 flex items-center gap-2.5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-koenig-navy/10 group-hover:bg-koenig-navy/15 transition">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#093148" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                  </div>
                  <div className="text-base font-bold text-koenig-dark">1-on-1 Training</div>
                </div>
                <p className="mb-3 text-[13px] text-koenig-muted leading-relaxed">Private instructor · Any date · Flexible hours · Personalised curriculum</p>
                {/* Always-visible details */}
                <div className="mb-3 rounded-lg border border-koenig-navy/15 bg-koenig-navy/3 px-3 py-2.5 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-navy" />
                    <span className="text-sm font-semibold text-koenig-dark">Live Training (Duration : 32 Hours)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-navy" />
                    <span className="text-sm text-koenig-muted">Per Participant</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="mt-[3px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-navy" />
                    <span className="text-sm text-koenig-muted">
                      We can also offer this course in{" "}
                      <span className="text-koenig-blue font-medium">Arabic</span>,{" "}
                      <span className="text-koenig-blue font-medium">Japanese</span>,{" "}
                      <span className="text-koenig-blue font-medium">Polish</span>, and{" "}
                      <span className="text-koenig-navy font-medium">Spanish</span>.
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-navy" />
                    <span className="text-sm text-koenig-muted">Guaranteed-to-Run (GTR)</span>
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="text-lg font-extrabold text-koenig-navy">From INR 85,000</div>
                  {pricingTab === "one-on-one" && <span className="rounded-full bg-koenig-navy px-2.5 py-0.5 text-[10px] font-bold text-white">Active ✓</span>}
                </div>
              </div>
            </div>

            {/* ── Public Batch — Blue / Selected (primary) ── */}
            <div onClick={() => setPricingTab("public")} className={`group relative flex flex-col overflow-hidden rounded-xl bg-white cursor-pointer transition-all duration-200 ${pricingTab === "public" ? "border-2 border-koenig-blue shadow-md" : "border border-koenig-blue/20 hover:border-koenig-blue/50 hover:shadow-lg"}`}>
              {/* Top accent stripe */}
              <div className="h-1 w-full bg-koenig-blue" />
              <div className="flex flex-1 flex-col p-4">
                {/* Badge */}
                <div className={`absolute right-3 top-4 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${pricingTab === "public" ? "bg-koenig-blue text-white" : "bg-koenig-blue/10 text-koenig-blue"}`}>{pricingTab === "public" ? "Selected" : "Public"}</div>
                {/* Icon + title */}
                <div className="mb-3 flex items-center gap-2.5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-koenig-blue/15">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0694D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  </div>
                  <div className="text-base font-bold text-koenig-dark">Public Batch</div>
                </div>
                <p className="mb-3 text-[13px] text-koenig-muted leading-relaxed">Live online &amp; classroom · Scheduled dates · GTR assured · MCT-led</p>

                {/* Details */}
                <div className="mb-3 rounded-lg border border-koenig-blue/15 bg-koenig-light/60 px-3 py-2.5 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-blue" />
                      <span className="text-sm font-semibold text-koenig-dark">Live Training (Duration : 32 Hours)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-blue" />
                      <span className="text-sm text-koenig-muted">Per Participant</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="mt-[3px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-blue" />
                      <span className="text-sm text-koenig-muted">
                        We can also offer this course in{" "}
                        <span className="text-koenig-blue font-medium">Arabic</span>,{" "}
                        <span className="text-koenig-blue font-medium">Japanese</span>,{" "}
                        <span className="text-koenig-blue font-medium">Polish</span>, and{" "}
                        <span className="text-koenig-blue font-medium">Spanish</span>.
                      </span>
                    </div>
                  </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="text-lg font-extrabold text-koenig-blue">From INR 42,500</div>
                  {pricingTab === "public" && <span className="rounded-full bg-koenig-blue px-2.5 py-0.5 text-[10px] font-bold text-white">Active ✓</span>}
                </div>
              </div>
            </div>

            {/* ── Flexi Self-Paced — Accent Blue / Value ── */}
            <div onClick={() => setPricingTab("self-paced")} className={`group relative flex flex-col overflow-hidden rounded-xl bg-white transition-all duration-200 cursor-pointer ${pricingTab === "self-paced" ? "border-2 border-koenig-accent shadow-md" : "border border-koenig-accent/25 hover:border-koenig-accent/60 hover:shadow-lg"}`}>
              {/* Top accent stripe */}
              <div className="h-1 w-full bg-koenig-accent" />
              <div className="flex flex-1 flex-col p-4">
                {/* Badge */}
                <div className={`absolute right-3 top-4 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${pricingTab === "self-paced" ? "bg-koenig-accent text-white" : "bg-koenig-accent/10 text-koenig-accent"}`}>{pricingTab === "self-paced" ? "Selected" : "Instant"}</div>
                {/* Icon + title */}
                <div className="mb-3 flex items-center gap-2.5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-koenig-accent/10 group-hover:bg-koenig-accent/15 transition">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0577A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  </div>
                  <div className="text-base font-bold text-koenig-dark">Flexi <span className="text-xs font-normal text-koenig-muted">(Self-Paced)</span></div>
                </div>
                <p className="mb-3 text-[13px] text-koenig-muted leading-relaxed">Start anytime · 6 months access · MCT support · Learn at your pace</p>
                {/* Flexi details */}
                <div className="mb-3 rounded-lg border border-koenig-accent/15 bg-koenig-accent/3 px-3 py-2.5 space-y-1.5">
                  {[
                    "You will get access to Flexi within 30 minutes.",
                    "Access to Microsoft content via Microsoft learn.",
                    "Access to hands-on labs (Optional)",
                    "Enjoy offline learning on your mobile.",
                    "6 Hrs free consultation with MCT.",
                    "6 months video access (extendable on request).",
                    "Access to exam prep software (Qubits).",
                    "Certificate of Completion.",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-accent" />
                      <span className="text-sm text-koenig-muted">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="text-lg font-extrabold text-koenig-accent">From INR 9,990</div>
                  {pricingTab === "self-paced" && <span className="rounded-full bg-koenig-accent px-2.5 py-0.5 text-[10px] font-bold text-white">Active ✓</span>}
                </div>
              </div>
            </div>

          </div>

          {/* ── Section title bar — non-public tabs only ── */}
          {pricingTab !== "public" && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-koenig-border bg-koenig-light/60 px-[15px] sm:px-5 py-3">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="truncate text-sm font-semibold text-koenig-dark">
                  {pricingTab === "self-paced" ? "Flexi — Choose Add-ons" : "1-on-1 — Schedule Session"}
                </span>
              </div>
              {pricingTab === "self-paced" && (
                <div className="flex items-center gap-3">
                  <a href="#" className="text-sm font-semibold text-koenig-accent underline underline-offset-2 hover:text-koenig-navy transition">FAQ&apos;s</a>
                  <a href="#" className="flex items-center gap-1 rounded-full border border-koenig-accent/30 px-3 py-1.5 text-sm font-semibold text-koenig-accent hover:bg-koenig-accent hover:text-white transition">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    Demo
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Filter bar — only for public mode, includes view toggle */}
          {pricingTab === "public" && (
          <div className="border-t border-b border-koenig-border bg-koenig-light/60 px-3 sm:px-5 py-2 sm:py-3">

            {/* ── MOBILE: Filter button + view toggle ── */}
            <div className="flex items-center justify-between sm:hidden">
              {/* Filter button with active-filter indicator */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex h-[38px] items-center gap-2 rounded-full border border-koenig-dark/20 bg-white px-6 text-sm font-semibold text-koenig-dark transition hover:border-koenig-navy hover:bg-slate-50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h2" /></svg>
                Filters
                {(() => {
                  const selectedCount = [activeFormat !== "All", scheduleType !== "all", gtrOnly, timezone !== "IST"].filter(Boolean).length;
                  return selectedCount > 0 && (
                    <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-koenig-blue/15 px-1 text-[11px] font-bold text-koenig-blue">
                      {selectedCount}
                    </span>
                  );
                })()}
              </button>
              {/* View toggle — unchanged */}
              <div className="flex items-center gap-0.5 rounded-full bg-white border border-koenig-border p-1">
                {(["list", "calendar", "compare"] as const).map((view) => (
                  <button key={view} onClick={() => setActiveView(view)}
                    className={`flex items-center justify-center rounded-full p-1.5 transition ${activeView === view ? "bg-koenig-navy text-white shadow-sm" : "text-koenig-muted hover:text-koenig-navy"}`}>
                    {view === "list" && <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>}
                    {view === "calendar" && <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                    {view === "compare" && <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" /></svg>}
                  </button>
                ))}
              </div>
            </div>

            {/* ── MOBILE: Filter modal portal ── */}
            {mobileFilterOpen && createPortal(
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(7,30,46,0.5)', backdropFilter: 'blur(3px)' }} onClick={() => setMobileFilterOpen(false)} />
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '92vw', maxWidth: 420, height: '85vh', maxHeight: 640, boxSizing: 'border-box', overflow: 'hidden', zIndex: 9999, background: '#fff', borderRadius: 18, display: 'flex', flexDirection: 'column', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid #f0f4f8', flexShrink: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#071e2e', letterSpacing: '-0.02em' }}>Filter</div>
                    <button onClick={() => setMobileFilterOpen(false)} style={{ background: '#f0f4f8', border: 'none', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4a6a8a', fontSize: 15, fontWeight: 700, flexShrink: 0 }}>✕</button>
                  </div>

                  {/* Body: category tabs (left) + options (right) */}
                  <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
                    {/* Left: category tabs */}
                    <div style={{ width: 128, flexShrink: 0, background: '#f8fafc', borderRight: '1px solid #f0f4f8', overflowY: 'auto' }}>
                      {([
                        { key: 'format', label: 'Format', active: activeFormat !== 'All' },
                        { key: 'schedule', label: 'Schedule', active: scheduleType !== 'all' },
                        { key: 'availability', label: 'Availability', active: gtrOnly },
                        { key: 'timezone', label: 'Timezone', active: timezone !== 'IST' },
                      ] as const).map((tab) => (
                        <button key={tab.key} onClick={() => setActiveFilterTab(tab.key)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 6, width: '100%', textAlign: 'left',
                            padding: '14px 14px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                            background: activeFilterTab === tab.key ? '#fff' : 'transparent',
                            color: activeFilterTab === tab.key ? '#0694D1' : '#4a6a8a',
                            borderLeft: activeFilterTab === tab.key ? '3px solid #0694D1' : '3px solid transparent',
                            borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                          }}>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tab.label}</span>
                          {tab.active && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0694D1', flexShrink: 0 }} />}
                        </button>
                      ))}
                    </div>

                    {/* Right: options for the active category */}
                    <div style={{ flex: 1, minWidth: 0, overflowY: 'auto', overflowX: 'hidden' }}>
                      {activeFilterTab === 'format' && ["All", "Online", "Classroom"].map((fmt) => (
                        <button key={fmt} onClick={() => setActiveFormat(fmt)}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', boxSizing: 'border-box', padding: '14px 18px', borderBottom: '1px solid #f6f8fa', background: 'transparent', border: 'none', borderBottomWidth: 1, cursor: 'pointer', textAlign: 'left' }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: '#071e2e' }}>{fmt}</span>
                          <span style={{ width: 17, height: 17, borderRadius: 5, border: '2px solid', borderColor: activeFormat === fmt ? '#0694D1' : '#cbd5e1', background: activeFormat === fmt ? '#0694D1' : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {activeFormat === fmt && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                          </span>
                        </button>
                      ))}

                      {activeFilterTab === 'schedule' && (["all", "weekday", "weekend"] as const).map((t) => (
                        <button key={t} onClick={() => setScheduleType(t)}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', boxSizing: 'border-box', padding: '14px 18px', borderBottom: '1px solid #f6f8fa', background: 'transparent', border: 'none', borderBottomWidth: 1, cursor: 'pointer', textAlign: 'left' }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: '#071e2e' }}>{t === "all" ? "All" : t === "weekday" ? "Weekday" : "Weekend"}</span>
                          <span style={{ width: 17, height: 17, borderRadius: 5, border: '2px solid', borderColor: scheduleType === t ? '#0694D1' : '#cbd5e1', background: scheduleType === t ? '#0694D1' : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {scheduleType === t && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                          </span>
                        </button>
                      ))}

                      {activeFilterTab === 'availability' && (
                        <button onClick={() => setGtrOnly(!gtrOnly)}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', boxSizing: 'border-box', padding: '14px 18px', borderBottom: '1px solid #f6f8fa', background: 'transparent', border: 'none', borderBottomWidth: 1, cursor: 'pointer', textAlign: 'left' }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: '#071e2e' }}>Guaranteed-to-Run (GTR) Only</span>
                          <span style={{ width: 17, height: 17, borderRadius: 5, border: '2px solid', borderColor: gtrOnly ? '#0694D1' : '#cbd5e1', background: gtrOnly ? '#0694D1' : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {gtrOnly && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                          </span>
                        </button>
                      )}

                      {activeFilterTab === 'timezone' && (
                        <div style={{ padding: '14px 18px', boxSizing: 'border-box' }}>
                          {/* Search box */}
                          <div style={{ position: 'relative', marginBottom: 10 }}>
                            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 13, height: 13, color: '#8a9db5' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>
                            <input
                              type="text"
                              placeholder="Search timezone..."
                              value={tzSearch}
                              onChange={(e) => setTzSearch(e.target.value)}
                              style={{ width: '100%', boxSizing: 'border-box', padding: '9px 10px 9px 30px', borderRadius: 8, border: '1.5px solid #e2eaf2', fontSize: 14, color: '#071e2e', background: '#f8fafc', outline: 'none' }}
                            />
                          </div>
                          {Object.keys(TIMEZONE_OFFSETS)
                            .filter((tz) => tz.toLowerCase().includes(tzSearch.toLowerCase()))
                            .map((tz) => (
                              <button key={tz} onClick={() => setTimezone(tz)}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', boxSizing: 'border-box', padding: '11px 4px', borderBottom: '1px solid #f6f8fa', background: 'transparent', border: 'none', borderBottomWidth: 1, cursor: 'pointer', textAlign: 'left' }}>
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#071e2e' }}>{tz}</span>
                                <span style={{ width: 17, height: 17, borderRadius: 5, border: '2px solid', borderColor: timezone === tz ? '#0694D1' : '#cbd5e1', background: timezone === tz ? '#0694D1' : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  {timezone === tz && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                                </span>
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{ padding: '16px 20px', borderTop: '1px solid #f0f4f8', flexShrink: 0, display: 'flex', gap: 10 }}>
                    <button
                      onClick={() => { setActiveFormat("All"); setScheduleType("all"); setGtrOnly(false); setTimezone("IST"); setTzSearch(""); }}
                      style={{ flex: 1, padding: '13px 0', borderRadius: 12, background: '#fff', color: '#4a6a8a', fontSize: 14, fontWeight: 700, border: '1.5px solid #e2eaf2', cursor: 'pointer' }}>
                      Clear All
                    </button>
                    <button onClick={() => { setMobileFilterOpen(false); setTzSearch(""); }}
                      style={{ flex: 1, padding: '13px 0', borderRadius: 12, background: '#0694D1', color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      Apply
                      {(() => {
                        const selectedCount = [activeFormat !== "All", scheduleType !== "all", gtrOnly, timezone !== "IST"].filter(Boolean).length;
                        return selectedCount > 0 && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 18, height: 18, padding: '0 5px', borderRadius: 9, background: 'rgba(255,255,255,0.25)', fontSize: 11, fontWeight: 800 }}>
                            {selectedCount}
                          </span>
                        );
                      })()}
                    </button>
                  </div>
                </div>
              </>,
              document.body
            )}

            {/* ── DESKTOP: single row ── */}
            <div className="hidden sm:flex items-center gap-x-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-koenig-dark">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  Format
                </span>
                <div className="flex items-center gap-1">
                  {["All", "Online", "Classroom"].map((fmt) => (
                    <button key={fmt} onClick={() => setActiveFormat(fmt)}
                      className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition ${activeFormat === fmt ? "bg-koenig-navy text-white shadow-sm" : "bg-white text-koenig-dark border border-koenig-dark/30 hover:border-koenig-navy hover:text-koenig-navy"}`}>
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-5 w-px bg-koenig-dark/20" />
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-koenig-dark">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Type
                </span>
                <div className="flex items-center gap-1">
                  {(["all", "weekday", "weekend"] as const).map((t) => (
                    <button key={t} onClick={() => setScheduleType(t)}
                      className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold capitalize transition ${scheduleType === t ? "bg-koenig-navy text-white shadow-sm" : "bg-white text-koenig-dark border border-koenig-dark/30 hover:border-koenig-navy hover:text-koenig-navy"}`}>
                      {t === "all" ? "All" : t === "weekday" ? "Weekday" : "Weekend"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-5 w-px bg-koenig-dark/20" />
              <button onClick={() => setGtrOnly(!gtrOnly)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition ${gtrOnly ? "bg-green-600 text-white shadow-sm" : "bg-white text-koenig-dark border border-koenig-dark/30 hover:border-green-500 hover:text-green-600"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${gtrOnly ? "bg-white" : "bg-green-500"}`} />
                GTR Only
              </button>
              <div className="relative">
                <button onClick={() => setTzOpen(!tzOpen)}
                  className="flex items-center gap-1.5 rounded-lg border border-koenig-dark/30 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-koenig-dark hover:border-koenig-navy transition">
                  <svg className="h-3.5 w-3.5 text-koenig-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{timezone}</span>
                  <svg className="h-3 w-3 text-koenig-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {tzOpen && (
                  <div className="absolute left-0 top-full z-10 mt-1 w-44 rounded-lg border border-koenig-border bg-white p-1.5 shadow-lg">
                    <div className="relative mb-1.5">
                      <svg className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-koenig-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" /></svg>
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search timezone..."
                        value={tzSearch}
                        onChange={(e) => setTzSearch(e.target.value)}
                        className="w-full rounded-md border border-koenig-border bg-koenig-light py-1.5 pl-8 pr-2 text-xs text-koenig-dark outline-none focus:border-koenig-blue"
                      />
                    </div>
                    <div className="max-h-44 overflow-y-auto">
                      {Object.keys(TIMEZONE_OFFSETS)
                        .filter((tz) => tz.toLowerCase().includes(tzSearch.toLowerCase()))
                        .map((tz) => (
                          <button key={tz} onClick={() => { setTimezone(tz); setTzOpen(false); setTzSearch(""); }}
                            className={`block w-full rounded-md px-2.5 py-2 text-left text-xs transition hover:bg-koenig-light ${timezone === tz ? "font-semibold text-koenig-blue" : "text-koenig-dark"}`}>
                            {tz}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-0.5 rounded-full bg-white border border-koenig-border p-0.5 ml-auto">
                {(["list", "calendar", "compare"] as const).map((view) => (
                  <button key={view} onClick={() => setActiveView(view)}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${activeView === view ? "bg-koenig-navy text-white shadow-sm" : "text-koenig-muted hover:text-koenig-navy"}`}>
                    {view === "list" && <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>}
                    {view === "calendar" && <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                    {view === "compare" && <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" /></svg>}
                    <span>{view.charAt(0).toUpperCase() + view.slice(1)}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
          )}

          {/* Add Certification — mobile only, between filter & schedule, public tab */}
          {pricingTab === "public" && (
            <div className="lg:hidden border-b border-koenig-border px-3 py-2.5">
              <label className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2.5 transition-colors ${certSelected.size > 0 ? "border-koenig-blue bg-koenig-blue/10 ring-1 ring-koenig-blue/30 shadow-sm" : "border-koenig-navy/20 bg-white hover:border-koenig-blue/40 hover:bg-koenig-blue/5"}`}>
                <div className="flex items-center gap-2">
                  <div className={`flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${certSelected.size > 0 ? "border-koenig-blue bg-koenig-blue" : "border-gray-300 bg-white"}`}>
                    {certSelected.size > 0 && <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className={`text-sm font-semibold ${certSelected.size > 0 ? "text-koenig-blue" : "text-koenig-dark"}`}>Add Certification Exam</span>
                </div>
                <span className="text-sm font-bold text-koenig-navy">+{EXAM_FEE_INR.toLocaleString("en-IN")}</span>
                <input type="checkbox" className="sr-only" checked={certSelected.size > 0}
                  onChange={() => setCertSelected(prev => prev.size > 0 ? new Set() : new Set([-1]))}
                />
              </label>
            </div>
          )}

          {/* ── Batch results / Flexi panel / 1-on-1 panel ── */}
          {pricingTab === "self-paced" ? (() => {
            const flexiSubtotal = FLEXI_VIDEO + (flexiExamSelected ? FLEXI_EXAM : 0) + (flexiLabsSelected ? FLEXI_LABS : 0);
            const flexiGst = Math.round(flexiSubtotal * GST_RATE);
            const flexiTotal = flexiSubtotal + flexiGst;
            const flexiBaseTotal = FLEXI_VIDEO + Math.round(FLEXI_VIDEO * GST_RATE);
            const flexiAllTotal = FLEXI_VIDEO + FLEXI_EXAM + FLEXI_LABS + Math.round((FLEXI_VIDEO + FLEXI_EXAM + FLEXI_LABS) * GST_RATE);
            return (
            <div>
            {/* ── FLEXI PANEL — 2-col layout, no height increase ── */}
            <div className="flex flex-col lg:flex-row items-stretch gap-4 p-[18px]">

              {/* LEFT — option selector */}
              <div className="w-full lg:flex-1 min-w-0 lg:max-w-[850px]">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">Select Add-ons</p>
                <div className="flex flex-col gap-3 rounded-2xl p-4" style={{ background: "rgba(6,148,209,0.03)", border: "1px solid rgba(6,148,209,0.12)" }}>
                  {/* Flexi Video — always selected */}
                  <div className="relative">
                    <div className="absolute inset-x-0 bottom-0 h-full translate-y-1 rounded-xl bg-koenig-blue/25" />
                  <div className="relative flex items-center justify-between rounded-xl border-2 border-koenig-blue bg-white px-4 py-4 lg:px-5 lg:py-5 ring-1 ring-koenig-blue/30" style={{ transform: 'translateY(-2px) scale(1.012)', boxShadow: '0 8px 28px 0 rgba(6,148,209,0.28)' }}>
                    <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                      <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-koenig-blue bg-koenig-blue">
                        <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs lg:text-sm font-semibold text-koenig-blue truncate">
                        <svg className="h-3.5 w-3.5 lg:h-4 lg:w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
                        </svg>
                        Flexi Video
                      </span>
                    </div>
                    <span className="flex-shrink-0 text-xs lg:text-sm font-bold text-koenig-blue ml-2">INR {FLEXI_VIDEO.toLocaleString("en-IN")}+</span>
                  </div>
                  </div>
                  {/* Exam Voucher */}
                  <div className="relative">
                    {flexiExamSelected && <div className="absolute inset-x-0 bottom-0 h-full translate-y-1 rounded-xl bg-koenig-blue/25" />}
                  <label style={flexiExamSelected ? { transform: 'translateY(-2px) scale(1.012)', boxShadow: '0 8px 28px 0 rgba(6,148,209,0.28)' } : {}} className={`relative flex cursor-pointer items-center justify-between rounded-xl border-2 px-4 py-4 lg:px-5 lg:py-5 transition-all ${flexiExamSelected ? "border-koenig-blue bg-white ring-1 ring-koenig-blue/30" : "border-koenig-border bg-gray-50 shadow-sm hover:border-koenig-blue/40 hover:bg-koenig-blue/5"}`}>
                    <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                      <div className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 transition-all ${flexiExamSelected ? "border-koenig-blue bg-koenig-blue" : "border-gray-300 bg-white"}`}>
                        {flexiExamSelected && <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <input type="checkbox" checked={flexiExamSelected} onChange={() => setFlexiExamSelected(v => !v)} className="sr-only" />
                      <span className={`flex items-center gap-1 lg:gap-1.5 text-xs lg:text-sm font-semibold truncate ${flexiExamSelected ? "text-koenig-blue" : "text-koenig-dark"}`}>
                        <svg className="h-3.5 w-3.5 lg:h-4 lg:w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                        </svg>
                        Exam Voucher <span className="text-[10px] lg:text-sm font-normal text-koenig-muted">(optional)</span>
                      </span>
                    </div>
                    <span className={`flex-shrink-0 text-xs lg:text-sm font-bold ml-2 ${flexiExamSelected ? "text-koenig-blue" : "text-koenig-dark"}`}>INR {FLEXI_EXAM.toLocaleString("en-IN")}+</span>
                  </label>
                  </div>
                  {/* Hands-On-Labs */}
                  <div className="relative">
                    {flexiLabsSelected && <div className="absolute inset-x-0 bottom-0 h-full translate-y-1 rounded-xl bg-koenig-blue/25" />}
                  <label style={flexiLabsSelected ? { transform: 'translateY(-2px) scale(1.012)', boxShadow: '0 8px 28px 0 rgba(6,148,209,0.28)' } : {}} className={`relative flex cursor-pointer items-center justify-between rounded-xl border-2 px-4 py-4 lg:px-5 lg:py-5 transition-all ${flexiLabsSelected ? "border-koenig-blue bg-white ring-1 ring-koenig-blue/30" : "border-koenig-border bg-gray-50 shadow-sm hover:border-koenig-blue/40 hover:bg-koenig-blue/5"}`}>
                    <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                      <div className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 transition-all ${flexiLabsSelected ? "border-koenig-blue bg-koenig-blue" : "border-gray-300 bg-white"}`}>
                        {flexiLabsSelected && <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <input type="checkbox" checked={flexiLabsSelected} onChange={() => setFlexiLabsSelected(v => !v)} className="sr-only" />
                      <span className={`flex items-center gap-1 lg:gap-1.5 text-xs lg:text-sm font-semibold truncate ${flexiLabsSelected ? "text-koenig-blue" : "text-koenig-dark"}`}>
                        <svg className="h-3.5 w-3.5 lg:h-4 lg:w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                        </svg>
                        Hands-On-Labs²
                      </span>
                    </div>
                    <span className={`flex-shrink-0 text-xs lg:text-sm font-bold ml-2 ${flexiLabsSelected ? "text-koenig-blue" : "text-koenig-dark"}`}>INR {FLEXI_LABS.toLocaleString("en-IN")}+</span>
                  </label>
                  </div>
                </div>
                <div className="mt-2 space-y-0.5">
                  <p className="text-[10px] text-koenig-muted">† Excluding VAT/GST</p>
                  <p className="text-[10px] text-koenig-muted">* Flexi access provided once MS learn registration is done.</p>
                </div>
              </div>

              {/* Mobile fixed bottom Enroll bar — Flexi */}
              {scheduleInView && tabsFloating && (
                <div className="lg:hidden" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, background: '#fff', borderTop: '1px solid rgba(6,148,209,0.2)', boxShadow: '0 -4px 20px rgba(0,0,0,0.10)', padding: '8px 16px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: '#071e2e', whiteSpace: 'nowrap' }}>INR {flexiSubtotal.toLocaleString("en-IN")}</span>
                        <span style={{ fontSize: 10, color: '#8a9db5', whiteSpace: 'nowrap' }}>excl. GST</span>
                      </div>
                      <button
                        onClick={() => setFlexiBreakdownOpen(true)}
                        style={{ background: 'none', border: 'none', padding: 0, fontSize: 11, fontWeight: 600, color: '#0694D1', textDecoration: 'underline', cursor: 'pointer', textAlign: 'left' }}
                      >View Fees Breakdown</button>
                    </div>
                    <button style={{ flex: 1, minWidth: 0, borderRadius: 12, background: 'linear-gradient(to right,#0694D1,#22d3ee)', padding: '12px 0', fontSize: 14, fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <span>Enroll Now</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Flexi Fees Breakdown popup — mobile portal */}
              {flexiBreakdownOpen && createPortal(
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }} onClick={() => setFlexiBreakdownOpen(false)} />
                  <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 9999, width: 'calc(100vw - 32px)', maxWidth: 340, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.22)' }}>
                    <div style={{ background: '#071e2e', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff' }}>Fees Breakdown</span>
                      <button onClick={() => setFlexiBreakdownOpen(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 700 }}>✕</button>
                    </div>
                    <div style={{ padding: '4px 0' }}>
                      {[
                        { label: "Flexi Video", val: FLEXI_VIDEO, details: "HD video · 6 months · MS Learn", active: true },
                        { label: "Exam Voucher", val: FLEXI_EXAM, details: "Official Microsoft exam voucher", active: flexiExamSelected },
                        { label: "Hands-On-Labs", val: FLEXI_LABS, details: "Live lab environment access", active: flexiLabsSelected },
                      ].filter(r => r.active).map((r, i, arr) => (
                        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 16px', fontSize: 14, borderBottom: i < arr.length - 1 ? '1px solid #f0f4f8' : 'none' }}>
                          <div>
                            <div style={{ color: '#4a6a8a' }}>{r.label}</div>
                            <div style={{ fontSize: 11, color: '#8a9db5', marginTop: 2 }}>{r.details}</div>
                          </div>
                          <span style={{ fontWeight: 600, color: '#071e2e', flexShrink: 0 }}>INR {r.val.toLocaleString("en-IN")}</span>
                        </div>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: 14, background: '#f8fcff', borderTop: '1px solid #e8f4fa' }}>
                        <span style={{ fontWeight: 700, color: '#071e2e' }}>Subtotal</span>
                        <span style={{ fontWeight: 700, color: '#071e2e' }}>INR {flexiSubtotal.toLocaleString("en-IN")} <span style={{ fontSize: 11, fontWeight: 400, color: '#8a9db5' }}>excl. GST</span></span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '10px 16px 14px', borderTop: '1px solid #e8f4fa' }}>
                      <button onClick={() => setFlexiBreakdownOpen(false)} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#0694D1', textDecoration: 'underline', cursor: 'pointer' }}>Hide Breakdown</button>
                    </div>
                  </div>
                </>,
                document.body
              )}

              {/* RIGHT — live price + breakdown — desktop only */}
              <div className="hidden lg:flex lg:w-[330px] lg:flex-shrink-0 lg:sticky lg:top-20 lg:self-start flex-col">
                <div className="rounded-xl border-2 border-koenig-blue/30 bg-white flex flex-col" style={{ boxShadow: '0 4px 20px 0 rgba(6,148,209,0.15)' }}>
                  {/* Price area */}
                  <div className="bg-gradient-to-b from-koenig-blue/8 to-koenig-blue/3 px-4 py-4 text-center border-b border-koenig-blue/15 rounded-t-xl">
                    <div className="text-sm font-bold uppercase tracking-widest text-koenig-navy/70 mb-1">Total (excl. GST)</div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-sm font-bold text-koenig-blue">INR</span>
                      <span className="text-3xl font-extrabold text-koenig-navy">{flexiSubtotal.toLocaleString("en-IN")}</span>
                      <span className="text-sm font-bold text-koenig-blue">†</span>
                    </div>
                    <button onClick={() => setFlexiBreakdownOpen(v => !v)} className="mt-1.5 text-sm font-semibold text-koenig-blue underline underline-offset-2 hover:text-koenig-navy transition">
                      {flexiBreakdownOpen ? "Hide Breakdown" : "View Fees Breakdown"}
                    </button>
                  </div>
                  {/* Inline Fees Breakdown — no absolute positioning, works on all screen sizes */}
                  {flexiBreakdownOpen && (
                    <div className="border-b border-koenig-accent/20 text-sm">
                      <div className="flex items-center justify-between bg-koenig-accent px-3 py-2">
                        <span className="text-sm font-bold uppercase tracking-wide text-white">Fees Breakdown</span>
                        <button onClick={() => setFlexiBreakdownOpen(false)} className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition text-xs font-bold">✕</button>
                      </div>
                      {[
                        { label: "Flexi Video", val: FLEXI_VIDEO, active: true, details: "HD video · 6 months · MS Learn" },
                        { label: "Exam Voucher", val: FLEXI_EXAM, active: flexiExamSelected, details: "Official Microsoft exam voucher" },
                        { label: "Hands-On-Labs²", val: FLEXI_LABS, active: flexiLabsSelected, details: "Live lab environment access" },
                      ].filter(r => r.active).map((r, i) => (
                        <div key={r.label} className={`flex items-start justify-between gap-2 px-3 py-2 bg-white ${i > 0 ? "border-t border-koenig-accent/10" : ""}`}>
                          <div className="min-w-0">
                            <div className="text-koenig-muted">{r.label}</div>
                            <div className="text-sm mt-0.5 text-koenig-muted/70">{r.details}</div>
                          </div>
                          <span className="flex-shrink-0 font-semibold text-koenig-dark">{r.val.toLocaleString("en-IN")}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between border-t border-koenig-accent/20 bg-koenig-accent/10 px-3 py-2">
                        <span className="font-bold text-koenig-accent">Total (excl. GST)</span>
                        <span className="font-bold text-koenig-accent">{flexiSubtotal.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  )}
                  {/* Buy Now CTA */}
                  <div className="px-4 py-3">
                    <button className="group w-full rounded-lg bg-gradient-to-r from-koenig-blue to-cyan-500 py-3 text-sm font-bold text-white shadow-md shadow-koenig-blue/25 hover:shadow-lg hover:shadow-koenig-blue/40 hover:brightness-105 transition-all active:scale-95 flex items-center justify-center gap-2 overflow-hidden">
                      <span>Enroll Now</span>
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Mobile: fees summary — selected add-ons + subtotal */}
            <div className="lg:hidden px-3 pb-3">
              <div className="rounded-xl border border-koenig-blue/20 bg-koenig-blue/5 px-4 py-3">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-koenig-blue">Fees Summary</div>
                {/* Selected add-on rows */}
                <div className="space-y-1 text-sm mb-2">
                  {[
                    { label: "Flexi Video", val: FLEXI_VIDEO, details: "HD video · 6 months · MS Learn", active: true },
                    { label: "Exam Voucher", val: FLEXI_EXAM, details: "Official Microsoft exam voucher", active: flexiExamSelected },
                    { label: "Hands-On-Labs", val: FLEXI_LABS, details: "Live lab environment access", active: flexiLabsSelected },
                  ].filter(r => r.active).map(({ label, val, details }) => (
                    <div key={label} className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-medium text-koenig-dark">{label}</div>
                        <div className="text-xs text-koenig-muted">{details}</div>
                      </div>
                      <span className="flex-shrink-0 font-semibold text-koenig-dark whitespace-nowrap">INR {val.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
                {/* Subtotal */}
                <div className="flex items-center justify-between border-t border-koenig-blue/15 pt-2 text-sm">
                  <span className="font-bold text-koenig-dark">Subtotal</span>
                  <span className="font-bold text-koenig-blue">INR {flexiSubtotal.toLocaleString("en-IN")} <span className="text-xs font-normal text-koenig-muted">excl. GST</span></span>
                </div>
              </div>
            </div>

            {/* Desktop: other training options */}
            <div className="hidden lg:grid gap-3 px-[18px] pb-[18px] lg:grid-cols-2">
              <div
                className="cursor-pointer rounded-lg border border-koenig-blue/20 bg-gradient-to-r from-koenig-blue/5 to-white px-3 py-2.5 transition-all hover:border-koenig-blue/50 hover:shadow-md"
                onClick={() => { setPricingTab("public"); document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-koenig-blue/10">
                      <svg className="h-4 w-4 text-koenig-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-koenig-dark">Public Training</div>
                      <div className="text-[11px] text-koenig-muted">Group class &mdash; fixed schedule</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-base font-bold text-koenig-blue">{formatCurrency(COURSE_PRICING.online.public, "INR")}</div>
                    <div className="text-[10px] text-koenig-muted">per person · excl. VAT/GST</div>
                  </div>
                </div>
              </div>
              <div
                className="cursor-pointer rounded-lg border border-koenig-blue/20 bg-gradient-to-r from-koenig-blue/5 to-white px-3 py-2.5 transition-all hover:border-koenig-blue/50 hover:shadow-md"
                onClick={() => { setPricingTab("one-on-one"); document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-koenig-blue/10">
                      <svg className="h-4 w-4 text-koenig-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-koenig-dark">1-on-1 Training</div>
                      <div className="text-[11px] text-koenig-muted">Private instructor &mdash; any date</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-base font-bold text-koenig-blue">{formatCurrency(COURSE_PRICING.online.oneOnOne, "INR")}</div>
                    <div className="text-[10px] text-koenig-muted">per person · excl. VAT/GST</div>
                  </div>
                </div>
              </div>
            </div>

            </div>
            );
          })() : pricingTab === "one-on-one" ? (() => {
            const oo1Price = COURSE_PRICING.online.oneOnOne;
            const oo1Subtotal = oo1Price + (oneOnOneCert ? EXAM_FEE_INR : 0);
            const oo1Gst = Math.round(oo1Subtotal * GST_RATE);
            const oo1Total = oo1Subtotal + oo1Gst;
            const oo1HrsPerDay: 4 | 8 = oneOnOneDuration === "4h" ? 4 : 8;
            const oo1EndDate = oneOnOneDate ? calcOo1EndDate(oneOnOneDate, oo1HrsPerDay, oneOnOneSchedule) : "";
            const oo1TempEndDate = oo1TempDate ? calcOo1EndDate(oo1TempDate, oo1HrsPerDay, oneOnOneSchedule) : "";
            const oo1TotalDays = COURSE_TOTAL_HOURS / oo1HrsPerDay;
            const oo1CalDays = getMonthDays(oo1CalYear, oo1CalMonth);
            const monthName = new Date(oo1CalYear, oo1CalMonth, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
            const OO1_TIMES = (() => {
              const times: string[] = [];
              for (let h = 6; h <= 20; h++) {
                for (const m of [0, 15, 30, 45]) {
                  if (h === 20 && m > 0) break;
                  const hour12 = h % 12 === 0 ? 12 : h % 12;
                  const ampm = h < 12 ? "AM" : "PM";
                  times.push(`${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`);
                }
              }
              return times;
            })();
            const prevOo1Month = () => { if (oo1CalMonth === 0) { setOo1CalMonth(11); setOo1CalYear(y => y - 1); } else { setOo1CalMonth(m => m - 1); } };
            const nextOo1Month = () => { if (oo1CalMonth === 11) { setOo1CalMonth(0); setOo1CalYear(y => y + 1); } else { setOo1CalMonth(m => m + 1); } };
            return (
            <div>
            {/* ── 1-ON-1 PANEL ── */}
            <div className="flex flex-col lg:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-5 pb-3 lg:pb-5">

              {/* LEFT — Duration + Schedule + Calendar + Time/TZ */}
              <div className="w-full lg:flex-1 min-w-0 lg:max-w-[850px] flex flex-col gap-4 sm:gap-3">

                {/* Duration + Schedule — two rows on mobile, side by side on desktop */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
                  {/* Duration */}
                  <div className="flex flex-col gap-1 sm:w-[300px]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-koenig-blue px-1">Duration</span>
                    <div className="flex gap-2">
                      {(["4h", "8h"] as const).map((d) => {
                        const sel = oneOnOneDuration === d;
                        return (
                          <div key={d} className="relative flex-1">
                            {sel && <div className="absolute inset-x-0 bottom-0 h-full translate-y-1 rounded-xl bg-koenig-blue/25" />}
                          <label style={sel ? { transform: 'translateY(-2px) scale(1.012)', boxShadow: '0 8px 28px 0 rgba(6,148,209,0.28)' } : {}} className={`relative flex w-full cursor-pointer items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-xl border-[1.5px] transition-all ${sel ? "border-koenig-blue bg-white ring-1 ring-koenig-blue/30" : "border-gray-200 bg-gray-100 hover:border-koenig-blue/40 hover:bg-koenig-blue/5"}`}>
                            <div className={`flex h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${sel ? "border-koenig-blue bg-koenig-blue" : "border-gray-400 bg-white"}`}>
                              {sel && <svg className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>}
                            </div>
                            <input type="radio" className="sr-only" checked={sel} onChange={() => setOneOnOneDuration(d)} />
                            <span className={`text-xs sm:text-sm font-bold transition-colors ${sel ? "text-koenig-blue" : "text-gray-400"}`}>{d === "4h" ? "4 Hours" : "8 Hours"}</span>
                          </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Schedule */}
                  <div className="flex flex-col gap-1 sm:w-[300px]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-koenig-blue px-1">Schedule</span>
                    <div className="flex gap-2">
                      {(["weekday", "weekend"] as const).map((s) => {
                        const sel = oneOnOneSchedule === s;
                        return (
                          <div key={s} className="relative flex-1">
                            {sel && <div className="absolute inset-x-0 bottom-0 h-full translate-y-1 rounded-xl bg-koenig-blue/25" />}
                          <label style={sel ? { transform: 'translateY(-2px) scale(1.012)', boxShadow: '0 8px 28px 0 rgba(6,148,209,0.28)' } : {}} className={`relative flex w-full cursor-pointer items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-xl border-[1.5px] transition-all ${sel ? "border-koenig-blue bg-white ring-1 ring-koenig-blue/30" : "border-gray-200 bg-gray-100 hover:border-koenig-blue/40 hover:bg-koenig-blue/5"}`}>
                            <div className={`flex h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${sel ? "border-koenig-blue bg-koenig-blue" : "border-gray-400 bg-white"}`}>
                              {sel && <svg className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>}
                            </div>
                            <input type="radio" className="sr-only" checked={sel} onChange={() => setOneOnOneSchedule(s)} />
                            <span className={`text-xs sm:text-sm font-bold transition-colors ${sel ? "text-koenig-blue" : "text-gray-400"}`}>{s === "weekday" ? "Week Days" : "Weekends"}</span>
                          </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Time + Timezone dropdowns */}
                <div className="flex gap-2 sm:gap-3">
                  {/* Time */}
                  <div className="flex-1">
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-koenig-blue">Time</label>
                    <button
                      onClick={() => { setOneOnOneTimeOpen(v => !v); setOneOnOneTZOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-xl border-[1.5px] px-3 py-2 sm:py-2.5 text-xs font-bold transition ${oneOnOneTimeChosen ? "border-koenig-blue bg-koenig-blue/[0.06] ring-1 ring-koenig-blue/30 shadow-sm hover:border-koenig-blue hover:bg-koenig-blue/[0.06]" : "border-koenig-blue/40 hover:border-koenig-blue/70 hover:bg-koenig-blue/5"}`}
                      style={oneOnOneTimeChosen ? undefined : { background: "rgba(6,148,209,0.06)" }}
                    >
                      <span className={`font-bold ${oneOnOneTimeChosen ? "text-koenig-blue" : "text-koenig-dark"}`}>{oneOnOneTime}</span>
                      <svg className={`h-3.5 w-3.5 ${oneOnOneTimeChosen ? "text-koenig-blue" : "text-koenig-blue"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                  </div>
                  {/* Timezone */}
                  <div className="flex-1">
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-koenig-blue">Timezone</label>
                    <button
                      onClick={() => { setOneOnOneTZOpen(v => !v); setOneOnOneTimeOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-xl border-[1.5px] px-3 py-2 sm:py-2.5 text-xs font-bold transition ${oneOnOneTZChosen ? "border-koenig-blue bg-koenig-blue/[0.06] ring-1 ring-koenig-blue/30 shadow-sm hover:border-koenig-blue hover:bg-koenig-blue/[0.06]" : "border-koenig-blue/40 hover:border-koenig-blue/70 hover:bg-koenig-blue/5"}`}
                      style={oneOnOneTZChosen ? undefined : { background: "rgba(6,148,209,0.06)" }}
                    >
                      <span className={`font-bold ${oneOnOneTZChosen ? "text-koenig-blue" : "text-koenig-dark"}`}>{oneOnOneTZ} ({TIMEZONE_OFFSETS[oneOnOneTZ]})</span>
                      <svg className={`h-3.5 w-3.5 ${oneOnOneTZChosen ? "text-koenig-blue" : "text-koenig-blue"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                  </div>
                </div>

                {/* Calendar — mobile: dropdown button + 1-month popup | desktop: two-month inline */}
                {(() => {
                  const DAY_LABELS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
                  const getSunDays = (year: number, month: number) => {
                    const first = new Date(year, month, 1);
                    const offset = first.getDay();
                    const start = new Date(year, month, 1 - offset);
                    const days: Date[] = [];
                    for (let i = 0; i < 42; i++) { days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)); }
                    return days;
                  };
                  const nextMonth = oo1CalMonth === 11 ? 0 : oo1CalMonth + 1;
                  const nextYear = oo1CalMonth === 11 ? oo1CalYear + 1 : oo1CalYear;
                  const month1Days = getSunDays(oo1CalYear, oo1CalMonth);
                  const month2Days = getSunDays(nextYear, nextMonth);
                  const label1 = new Date(oo1CalYear, oo1CalMonth, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
                  const label2 = new Date(nextYear, nextMonth, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
                  const renderDay = (d: Date, monthRef: number) => {
                    const iso = toLocalIso(d);
                    const inMonth = d.getMonth() === monthRef;
                    const isPast = iso < todayIso;
                    const isToday = iso === todayIso;
                    const isStart = iso === oo1TempDate;
                    const tempEnd = oo1TempDate ? calcOo1EndDate(oo1TempDate, oneOnOneDuration === "4h" ? 4 : 8, oneOnOneSchedule) : "";
                    const isEnd = iso === tempEnd;
                    const inRange = oo1TempDate && tempEnd && iso > oo1TempDate && iso < tempEnd;
                    const dow = d.getDay();
                    const isWeekend = dow === 0 || dow === 6;
                    if (!inMonth) return <div key={iso} className="py-2" />;
                    return (
                      <button key={iso} disabled={isPast} onClick={() => setOo1TempDate(iso)}
                        className={`py-2 text-center text-sm font-semibold rounded transition
                          ${isStart || isEnd ? "bg-koenig-blue text-white font-bold"
                            : inRange ? "bg-koenig-blue/15 text-koenig-blue"
                            : isToday ? "text-koenig-blue font-bold ring-2 ring-koenig-blue/50 rounded-full"
                            : isPast ? "text-koenig-muted/40 cursor-not-allowed"
                            : isWeekend ? "text-koenig-navy/60 hover:bg-koenig-navy/5 cursor-pointer"
                            : "text-koenig-dark hover:bg-koenig-blue/8 cursor-pointer"}`}>
                        {d.getDate()}
                      </button>
                    );
                  };
                  const calendarGrid = (days: Date[], month: number) => (
                    <>
                      <div className="grid grid-cols-7 mb-1">
                        {DAY_LABELS.map((dl, i) => (
                          <div key={dl} className={`py-1 text-center text-[11px] font-bold ${i === 0 || i === 6 ? "text-koenig-navy/60" : "text-koenig-gray"}`}>{dl}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7">
                        {days.map(d => renderDay(d, month))}
                      </div>
                    </>
                  );
                  return (
                    <>
                      {/* Mobile: dropdown button + popup */}
                      <div className="lg:hidden">
                        <button
                          onClick={() => { setOo1TempDate(oneOnOneDate); setOo1CalOpen(true); }}
                          className={`flex w-full items-center justify-between rounded-xl border-2 px-3 py-2 sm:py-2.5 text-xs font-bold transition ${oneOnOneDate ? "border-koenig-blue bg-koenig-blue/10 ring-1 ring-koenig-blue/30 text-koenig-blue" : "border-koenig-blue/40 text-koenig-dark"}`}
                          style={oneOnOneDate ? undefined : { background: "rgba(6,148,209,0.06)" }}
                        >
                          <span className="flex items-center gap-2">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            {oneOnOneDate ? new Date(oneOnOneDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }) : "Select Date"}
                          </span>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {/* 1-month calendar popup — portal + translate centering */}
                        {oo1CalOpen && createPortal(
                          <>
                            {/* Backdrop */}
                            <div
                              style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }}
                              onClick={() => setOo1CalOpen(false)}
                            />
                            {/* Modal — true center via translate */}
                            <div
                              style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 9999, width: 'calc(100vw - 32px)', maxWidth: 340, background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 25px 60px rgba(0,0,0,0.22)' }}
                              onClick={e => e.stopPropagation()}
                            >
                              <div className="mb-3 flex items-center justify-between">
                                <button onClick={prevOo1Month} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-koenig-blue/10 text-koenig-dark transition">
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <span className="text-sm font-bold text-koenig-dark">{label1}</span>
                                <button onClick={nextOo1Month} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-koenig-blue/10 text-koenig-dark transition">
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </button>
                              </div>
                              {calendarGrid(month1Days, oo1CalMonth)}
                              {oo1TempDate && (
                                <div className="mt-3 rounded-lg bg-koenig-blue/8 border border-koenig-blue/20 px-3 py-2 text-xs font-semibold text-koenig-navy text-center whitespace-nowrap">
                                  {new Date(oo1TempDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                                  {oo1TempEndDate && (
                                    <> – {new Date(oo1TempEndDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</>
                                  )}
                                </div>
                              )}
                              <div className="mt-3 flex gap-2">
                                <button
                                  onClick={() => { setOo1TempDate(oneOnOneDate); setOo1CalOpen(false); }}
                                  className="flex-1 rounded-lg border border-koenig-border py-2 text-xs font-semibold text-koenig-muted hover:text-koenig-dark transition"
                                >Cancel</button>
                                <button
                                  disabled={!oo1TempDate}
                                  onClick={() => { setOneOnOneDate(oo1TempDate); setOo1CalOpen(false); }}
                                  className="flex-1 rounded-lg bg-koenig-blue py-2 text-xs font-bold text-white transition hover:bg-koenig-navy disabled:opacity-40 disabled:cursor-not-allowed"
                                >OK</button>
                              </div>
                            </div>
                          </>,
                          document.body
                        )}
                      </div>
                      {/* Desktop: two-month inline */}
                      <div className="hidden lg:block rounded-xl border border-koenig-border bg-white overflow-hidden shadow-[0_4px_20px_0_rgba(6,148,209,0.12)]">
                        <div className="grid grid-cols-2 divide-x divide-koenig-border">
                          {[{ days: month1Days, month: oo1CalMonth, label: label1, showPrev: true, showNext: false },
                            { days: month2Days, month: nextMonth, label: label2, showPrev: false, showNext: true }].map(({ days, month, label, showPrev, showNext }) => (
                            <div key={label} className="p-3">
                              <div className="flex items-center justify-between mb-2">
                                {showPrev ? <button onClick={prevOo1Month} className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-koenig-blue/10 text-koenig-dark transition"><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg></button> : <span />}
                                <span className="text-sm font-bold text-koenig-dark">{label}</span>
                                {showNext ? <button onClick={nextOo1Month} className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-koenig-blue/10 text-koenig-dark transition"><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></button> : <span />}
                              </div>
                              {calendarGrid(days, month)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}

                {/* Add Certification Exam — below calendar, mobile only */}
                <label className={`lg:hidden flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2.5 transition-colors ${oneOnOneCert ? "border-koenig-blue bg-koenig-blue/10 ring-1 ring-koenig-blue/30 shadow-sm" : "border-koenig-navy/20 bg-white hover:border-koenig-blue/40 hover:bg-koenig-blue/5"}`}>
                  <div className="flex items-center gap-2">
                    <div className={`flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${oneOnOneCert ? "border-koenig-blue bg-koenig-blue" : "border-gray-300 bg-white"}`}>
                      {oneOnOneCert && <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`text-sm font-semibold ${oneOnOneCert ? "text-koenig-blue" : "text-koenig-dark"}`}>Add Certification Exam</span>
                  </div>
                  <span className={`text-sm font-bold text-koenig-navy`}>+{EXAM_FEE_INR.toLocaleString("en-IN")}</span>
                  <input type="checkbox" className="sr-only" checked={oneOnOneCert} onChange={(e) => setOneOnOneCert(e.target.checked)} />
                </label>

                {/* Mobile fees summary — always shown below calendar */}
                <div className="lg:hidden rounded-xl border border-koenig-blue/20 bg-koenig-blue/5 px-3 py-3 space-y-3">

                    {/* Your Session */}
                    <div>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-koenig-blue">Your Session</div>
                      <div className="rounded-lg border border-koenig-blue/15 bg-white px-3 py-2.5 space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold uppercase tracking-wide text-[11px] text-koenig-blue/70">Start</span>
                          <span className={`font-semibold ${oneOnOneDate ? "text-koenig-dark" : "text-koenig-muted"}`}>
                            {oneOnOneDate ? new Date(oneOnOneDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }) : "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold uppercase tracking-wide text-[11px] text-koenig-blue/70">End</span>
                          <span className={`font-semibold ${oo1EndDate ? "text-koenig-dark" : "text-koenig-muted"}`}>
                            {oo1EndDate ? new Date(oo1EndDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }) : "—"}
                          </span>
                        </div>
                        {!oneOnOneDate && (
                          <p className="text-[11px] text-koenig-muted/70 border-t border-koenig-blue/10 pt-1.5">Pick a start date to see your session</p>
                        )}
                      </div>
                    </div>

                    {/* Fee rows — same "Total (excl. GST)" + breakdown toggle
                        treatment as the desktop price card. The breakdown
                        expands inline right inside this card (its own
                        state, not the fixed-bar's popup) so it's visible
                        in place rather than needing a separate popup. */}
                    <div>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-koenig-blue">Fees Summary</div>
                      <div className="rounded-lg border border-koenig-blue/15 bg-white overflow-hidden">
                        <div className="px-3 py-3 text-center">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-koenig-navy/70 mb-1">Total (excl. GST)</div>
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-sm font-bold text-koenig-blue">INR</span>
                            <span className="text-2xl font-extrabold text-koenig-blue">{oo1Subtotal.toLocaleString("en-IN")}</span>
                            <span className="text-sm font-bold text-koenig-blue">†</span>
                          </div>
                          <button onClick={() => setOo1InlineBreakdownOpen(v => !v)} className="mt-1 text-xs font-semibold text-koenig-blue underline underline-offset-2 hover:text-koenig-navy transition">
                            {oo1InlineBreakdownOpen ? "Hide Breakdown" : "View Fees Breakdown"}
                          </button>
                        </div>
                        {oo1InlineBreakdownOpen && (
                          <div className="border-t border-koenig-blue/15 text-sm">
                            <div className="flex items-center justify-between px-3 py-2 bg-koenig-blue/5">
                              <span className="text-koenig-muted">1-on-1 Training</span>
                              <span className="font-semibold text-koenig-dark">INR {oo1Price.toLocaleString("en-IN")}</span>
                            </div>
                            {oneOnOneCert && (
                              <div className="flex items-center justify-between border-t border-koenig-blue/10 px-3 py-2 bg-koenig-blue/5">
                                <span className="text-koenig-muted">Exam Fee</span>
                                <span className="font-semibold text-koenig-dark">INR {EXAM_FEE_INR.toLocaleString("en-IN")}</span>
                              </div>
                            )}
                            <div className="flex items-center justify-between border-t border-koenig-blue/10 px-3 py-2 bg-koenig-blue/5">
                              <span className="text-koenig-muted">+ GST 18%</span>
                              <span className="font-semibold text-koenig-dark">INR {oo1Gst.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex items-center justify-between border-t border-koenig-blue/20 bg-koenig-navy/8 px-3 py-2">
                              <span className="font-bold text-koenig-navy">Total (INR)</span>
                              <span className="font-bold text-koenig-navy">INR {oo1Total.toLocaleString("en-IN")}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                {/* Time popup — centered fixed overlay */}
                {oneOnOneTimeOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setOneOnOneTimeOpen(false)}>
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                    <div className="relative w-72 rounded-2xl border border-koenig-blue/20 bg-white shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-between border-b border-koenig-blue/10 bg-koenig-blue/8 px-4 py-3">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-koenig-blue">Select Time</span>
                        <button onClick={() => setOneOnOneTimeOpen(false)} className="flex h-5 w-5 items-center justify-center rounded-full bg-koenig-blue/10 text-koenig-blue hover:bg-koenig-blue/20 transition text-xs font-bold">✕</button>
                      </div>
                      <div className="max-h-64 overflow-y-auto py-1">
                        {OO1_TIMES.map((t) => (
                          <button key={t} onClick={() => { setOneOnOneTime(t); setOneOnOneTimeChosen(true); setOneOnOneTimeOpen(false); }}
                            className={`flex w-full items-center px-4 py-2.5 text-left text-xs transition hover:bg-koenig-blue/5 ${t === oneOnOneTime ? "font-bold text-koenig-blue bg-koenig-blue/8" : "text-koenig-dark"}`}>
                            {t === oneOnOneTime && <svg className="mr-2 h-3 w-3 text-koenig-blue flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                            {t !== oneOnOneTime && <span className="mr-2 h-3 w-3 flex-shrink-0" />}
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Timezone popup — centered fixed overlay */}
                {oneOnOneTZOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setOneOnOneTZOpen(false)}>
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                    <div className="relative w-80 rounded-2xl border border-koenig-blue/20 bg-white shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-between border-b border-koenig-blue/10 bg-koenig-blue/8 px-4 py-3">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-koenig-blue">Select Timezone</span>
                        <button onClick={() => setOneOnOneTZOpen(false)} className="flex h-5 w-5 items-center justify-center rounded-full bg-koenig-blue/10 text-koenig-blue hover:bg-koenig-blue/20 transition text-xs font-bold">✕</button>
                      </div>
                      <div className="py-1">
                        {Object.entries(TIMEZONE_OFFSETS).map(([tz, off]) => (
                          <button key={tz} onClick={() => { setOneOnOneTZ(tz); setOneOnOneTZChosen(true); setOneOnOneTZOpen(false); }}
                            className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-xs transition hover:bg-koenig-blue/5 ${tz === oneOnOneTZ ? "font-bold text-koenig-blue bg-koenig-blue/8" : "text-koenig-dark"}`}>
                            <div className="flex items-center gap-2">
                              {tz === oneOnOneTZ ? <svg className="h-3 w-3 text-koenig-blue flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : <span className="h-3 w-3 flex-shrink-0" />}
                              <span>{tz}</span>
                            </div>
                            <span className="text-koenig-muted">{off}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-[10px] text-koenig-muted">† Excluding VAT/GST &nbsp;·&nbsp; Dedicated trainer, flexible scheduling</p>
              </div>

              {/* RIGHT — Price card (hidden on mobile; fixed bar below replaces it) */}
              <div className="hidden lg:flex lg:w-[330px] lg:flex-shrink-0 lg:sticky lg:top-20 lg:self-start flex-col">
                <div className="rounded-xl border-2 border-koenig-blue/30 bg-white flex flex-col" style={{ boxShadow: '0 4px 20px 0 rgba(6,148,209,0.15)' }}>
                  {/* Add Certification — checkbox */}
                  <div className="px-4 pt-3 pb-0">
                    <label className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 transition-colors ${oneOnOneCert ? "border-koenig-blue bg-koenig-blue/10 ring-1 ring-koenig-blue/30 shadow-sm" : "border-koenig-navy/20 bg-koenig-light hover:border-koenig-blue/40 hover:bg-koenig-blue/5"}`}>
                      <div className="flex items-center gap-2">
                        <div className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${oneOnOneCert ? "border-koenig-blue bg-koenig-blue" : "border-gray-300 bg-white"}`}>
                          {oneOnOneCert && <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className={`text-sm font-semibold ${oneOnOneCert ? "text-koenig-blue" : "text-koenig-dark"}`}>Add Certification</span>
                        <div className="group relative flex items-center">
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center text-koenig-muted hover:text-koenig-blue"
                            aria-label="About the certification exam"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="11" /><circle cx="12" cy="8" r="0.5" fill="currentColor" /></svg>
                          </button>
                          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-48 -translate-x-1/2 rounded-lg border border-koenig-border bg-white px-3 py-2 text-[11px] leading-snug text-koenig-dark opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                            Check this box to add the certification exam
                            <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-koenig-border bg-white" />
                          </div>
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${oneOnOneCert ? "text-koenig-navy" : "text-koenig-navy"}`}>+{EXAM_FEE_INR.toLocaleString("en-IN")}</span>
                      <input type="checkbox" className="sr-only" checked={oneOnOneCert} onChange={(e) => setOneOnOneCert(e.target.checked)} />
                    </label>
                  </div>
                  {/* Price area */}
                  <div className="bg-gradient-to-b from-koenig-blue/8 to-koenig-blue/3 px-4 py-4 text-center border-t border-koenig-blue/15 mt-3">
                    <div className="text-sm font-bold uppercase tracking-widest text-koenig-navy/70 mb-1">Total (excl. GST)</div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-sm font-bold text-koenig-blue">INR</span>
                      <span className="text-3xl font-extrabold text-koenig-blue">{oo1Subtotal.toLocaleString("en-IN")}</span>
                      <span className="text-sm font-bold text-koenig-blue">†</span>
                    </div>
                    <button onClick={() => setOneOnOneBreakdownOpen(v => !v)} className="mt-1.5 text-sm font-semibold text-koenig-blue underline underline-offset-2 hover:text-koenig-navy transition">
                      {oneOnOneBreakdownOpen ? "Hide Breakdown" : "View Fees Breakdown"}
                    </button>
                  </div>
                  {/* Inline Fees Breakdown — no absolute positioning, works on all screen sizes */}
                  {oneOnOneBreakdownOpen && (
                    <div className="border-y border-koenig-navy/20 text-sm">
                      <div className="flex items-center justify-between bg-koenig-navy px-3 py-2">
                        <span className="text-sm font-bold uppercase tracking-wide text-white">Fees Breakdown</span>
                        <button onClick={() => setOneOnOneBreakdownOpen(false)} className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition text-xs font-bold">✕</button>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 bg-white">
                        <span className="text-koenig-muted">1-on-1 Training</span>
                        <span className="font-semibold text-koenig-dark">{oo1Price.toLocaleString("en-IN")}</span>
                      </div>
                      {oneOnOneCert && (
                        <div className="flex items-center justify-between border-t border-koenig-navy/10 px-3 py-2 bg-white">
                          <span className="text-koenig-muted">Exam Fee</span>
                          <span className="font-semibold text-koenig-dark">{EXAM_FEE_INR.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between border-t border-koenig-navy/10 px-3 py-2 bg-white">
                        <span className="text-koenig-muted">+ GST 18%</span>
                        <span className="font-semibold text-koenig-dark">{oo1Gst.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-koenig-navy/20 bg-koenig-navy/8 px-3 py-2">
                        <span className="font-bold text-koenig-navy">Total (INR)</span>
                        <span className="font-bold text-koenig-navy">{oo1Total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  )}
                  {/* Selected session info */}
                  {oneOnOneDate && oo1EndDate && (
                    <div className="mx-4 mt-3 rounded-lg border border-koenig-blue/20 bg-koenig-light px-3 py-2 text-left">
                      <div className="text-sm font-bold uppercase tracking-wide text-koenig-blue mb-1.5">Your Session</div>
                      <div className="flex items-start gap-1.5 mb-1">
                        <span className="text-sm font-bold uppercase text-koenig-muted shrink-0 pt-px">Start :</span>
                        <span className="text-sm font-semibold text-koenig-dark whitespace-nowrap">{new Date(oneOnOneDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                      <div className="flex items-start gap-1.5 mb-1.5">
                        <span className="text-sm font-bold uppercase text-koenig-muted shrink-0 pt-px">End :</span>
                        <span className="text-sm font-semibold text-koenig-navy whitespace-nowrap">{new Date(oo1EndDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                      <div className="border-t border-koenig-blue/10 pt-1.5 text-sm text-koenig-muted">
                        {oneOnOneTime} · {oneOnOneTZ} · {oo1HrsPerDay}h/day · {oo1TotalDays} days · {oneOnOneSchedule === "weekday" ? "Weekdays" : "Weekends"}
                      </div>
                    </div>
                  )}
                  {/* BOOK CTA */}
                  <div className="px-4 py-3">
                    <button className="group w-full rounded-lg bg-gradient-to-r from-koenig-blue to-cyan-500 py-3 text-sm font-bold text-white shadow-md shadow-koenig-blue/25 hover:shadow-lg hover:shadow-koenig-blue/40 hover:brightness-105 transition-all active:scale-95 flex items-center justify-center gap-2 overflow-hidden">
                      <span>Enroll Now</span>
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Mobile fixed bottom Enroll bar — always shown for 1-on-1 */}
            {scheduleInView && tabsFloating && (
              <div className="lg:hidden" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, background: '#fff', borderTop: '1px solid rgba(6,148,209,0.2)', boxShadow: '0 -4px 20px rgba(0,0,0,0.10)', padding: '8px 16px 12px' }}>
                {oo1EnrollError && (
                  <p className="mb-1.5 flex items-center justify-center gap-1 text-[11px] font-medium text-red-500">
                    <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {oo1EnrollError}
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#071e2e', whiteSpace: 'nowrap' }}>INR {oo1Subtotal.toLocaleString("en-IN")}</span>
                      <span style={{ fontSize: 10, color: '#8a9db5', whiteSpace: 'nowrap' }}>excl. GST</span>
                    </div>
                    <button
                      onClick={() => setOneOnOneBreakdownOpen(true)}
                      style={{ background: 'none', border: 'none', padding: 0, fontSize: 11, fontWeight: 600, color: '#0694D1', textDecoration: 'underline', cursor: 'pointer', textAlign: 'left' }}
                    >
                      View Fees Breakdown
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      if (!oneOnOneDate) { setOo1EnrollError("Please select a start date"); return; }
                      if (!oneOnOneTimeChosen) { setOo1EnrollError("Please select a time slot"); return; }
                      if (!oneOnOneTZChosen) { setOo1EnrollError("Please select a timezone"); return; }
                      setOo1EnrollError("");
                    }}
                    style={{ flex: 1, minWidth: 0, borderRadius: 12, background: 'linear-gradient(to right,#0694D1,#22d3ee)', padding: '12px 0', fontSize: 14, fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <span>Enroll Now</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Fees Breakdown popup — portal */}
            {oneOnOneBreakdownOpen && createPortal(
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }} onClick={() => setOneOnOneBreakdownOpen(false)} />
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 9999, width: 'calc(100vw - 32px)', maxWidth: 340, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.22)' }}>
                  {/* Header */}
                  <div style={{ background: '#071e2e', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff' }}>Fees Breakdown</span>
                    <button onClick={() => setOneOnOneBreakdownOpen(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 700 }}>✕</button>
                  </div>
                  {/* Rows */}
                  <div style={{ padding: '4px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #f0f4f8' }}>
                      <span style={{ color: '#4a6a8a' }}>1-on-1 Training</span>
                      <span style={{ fontWeight: 600, color: '#071e2e' }}>INR {oo1Price.toLocaleString("en-IN")}</span>
                    </div>
                    {oneOnOneCert && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #f0f4f8' }}>
                        <span style={{ color: '#4a6a8a' }}>Exam Fee</span>
                        <span style={{ fontWeight: 600, color: '#071e2e' }}>INR {EXAM_FEE_INR.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #e8f4fa' }}>
                      <span style={{ color: '#4a6a8a' }}>+ GST 18%</span>
                      <span style={{ fontWeight: 600, color: '#071e2e' }}>INR {oo1Gst.toLocaleString("en-IN")}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: 14, background: '#f8fcff' }}>
                      <span style={{ fontWeight: 700, color: '#071e2e' }}>Total (INR)</span>
                      <span style={{ fontWeight: 700, color: '#071e2e' }}>INR {oo1Total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  {/* Hide link */}
                  <div style={{ textAlign: 'center', padding: '10px 16px 14px', borderTop: '1px solid #e8f4fa' }}>
                    <button onClick={() => setOneOnOneBreakdownOpen(false)} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#0694D1', textDecoration: 'underline', cursor: 'pointer' }}>Hide Breakdown</button>
                  </div>
                </div>
              </>,
              document.body
            )}

            {/* Other training options below 1-on-1 — desktop only */}
            <div className="hidden lg:grid gap-3 px-[18px] pb-[18px] lg:grid-cols-2">
              <div
                className="cursor-pointer rounded-lg border border-koenig-blue/20 bg-gradient-to-r from-koenig-blue/5 to-white px-3 py-2.5 transition-all hover:border-koenig-blue/50 hover:shadow-md"
                onClick={() => { setPricingTab("public"); document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-koenig-blue/10">
                      <svg className="h-4 w-4 text-koenig-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-koenig-dark">Public Training</div>
                      <div className="text-[11px] text-koenig-muted">Group class &mdash; fixed schedule</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-base font-bold text-koenig-blue">{formatCurrency(COURSE_PRICING.online.public, "INR")}</div>
                    <div className="text-[10px] text-koenig-muted">per person · excl. VAT/GST</div>
                  </div>
                </div>
              </div>
              <div
                className="cursor-pointer rounded-lg border border-koenig-accent/20 bg-gradient-to-r from-koenig-accent/5 to-white px-3 py-2.5 transition-all hover:border-koenig-accent/50 hover:shadow-md"
                onClick={() => { setPricingTab("self-paced"); document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-koenig-accent/10">
                      <svg className="h-4 w-4 text-koenig-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-koenig-dark">Flexi (Self-Paced)</div>
                      <div className="text-[11px] text-koenig-muted">Start now &mdash; recorded HD sessions</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-base font-bold text-koenig-accent">{formatCurrency(COURSE_PRICING.online.flexi, "INR")}</div>
                    <div className="text-[10px] text-koenig-muted">per person · excl. VAT/GST</div>
                  </div>
                </div>
              </div>
            </div>

            </div>
            );
          })() : (
          <div>

        {/* ================================================================ */}
        {/*  CALENDAR VIEW                                                   */}
        {/* ================================================================ */}
        {activeView === "calendar" && (
          <div className="p-[18px]">
          <div className="overflow-hidden rounded-xl border border-koenig-border bg-white shadow-sm">
            {/* Week/Month Navigation */}
            <div className="flex items-center justify-between border-b border-koenig-border bg-koenig-light px-4 py-3">
              <button
                onClick={prevPeriod}
                className="flex items-center gap-1 text-xs font-medium text-koenig-muted hover:text-koenig-blue transition"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">{expanded ? "" : formatDate(toLocalIso(prevWeekDate))}</span>
              </button>

              {/* Clickable header — opens month picker */}
              <div className="relative" ref={pickerRef}>
                <button
                  onClick={() => {
                    setPickerMonth(currentWeekStart.getMonth());
                    setPickerYear(currentWeekStart.getFullYear());
                    setPickerOpen(!pickerOpen);
                  }}
                  className="flex items-center gap-1.5 text-sm font-bold text-koenig-dark hover:text-koenig-blue transition"
                >
                  {expanded ? fourWeekLabel : getWeekLabel(currentWeekStart)}
                  {isCurrentWeek(currentWeekStart) && !expanded && (
                    <span className="ml-2 rounded-full bg-koenig-blue/10 px-2 py-0.5 text-[10px] font-semibold text-koenig-blue">
                      Current Week
                    </span>
                  )}
                  <svg className="h-3.5 w-3.5 text-koenig-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Month Picker Popup */}
                {pickerOpen && (
                  <div className="absolute left-1/2 top-full z-20 mt-2 w-72 -translate-x-1/2 rounded-xl border border-koenig-border bg-white p-4 shadow-xl">
                    {/* Month nav */}
                    <div className="flex items-center justify-between mb-3">
                      <button
                        onClick={() => {
                          if (pickerMonth === 0) { setPickerMonth(11); setPickerYear(pickerYear - 1); }
                          else setPickerMonth(pickerMonth - 1);
                        }}
                        className="rounded p-1 hover:bg-koenig-light transition"
                      >
                        <svg className="h-4 w-4 text-koenig-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <span className="text-sm font-bold text-koenig-dark">
                        {new Date(pickerYear, pickerMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </span>
                      <button
                        onClick={() => {
                          if (pickerMonth === 11) { setPickerMonth(0); setPickerYear(pickerYear + 1); }
                          else setPickerMonth(pickerMonth + 1);
                        }}
                        className="rounded p-1 hover:bg-koenig-light transition"
                      >
                        <svg className="h-4 w-4 text-koenig-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
                      {["Mo","Tu","We","Th","Fr","Sa","Su"].map(d => (
                        <div key={d} className="text-[10px] font-semibold text-koenig-muted py-1">{d}</div>
                      ))}
                    </div>
                    {/* Day grid */}
                    <div className="grid grid-cols-7 gap-0.5">
                      {pickerDays.slice(0, 35).map((d, i) => {
                        const iso = toLocalIso(d);
                        const inMonth = d.getMonth() === pickerMonth;
                        const isToday = iso === todayIso;
                        const hasBatch = batchDateSet.has(iso);
                        return (
                          <button
                            key={i}
                            onClick={() => {
                              setCurrentWeekStart(getMonday(d));
                              setPickerOpen(false);
                            }}
                            className={`relative flex flex-col items-center rounded-lg py-1.5 text-xs transition hover:bg-koenig-blue/10 ${
                              inMonth ? "text-koenig-dark" : "text-koenig-muted/40"
                            } ${isToday ? "bg-red-500 text-white font-bold hover:bg-red-600" : ""}`}
                          >
                            {d.getDate()}
                            {hasBatch && !isToday && (
                              <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-koenig-blue" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {/* Today shortcut */}
                    <button
                      onClick={() => {
                        setCurrentWeekStart(getMonday(today));
                        setPickerOpen(false);
                      }}
                      className="mt-3 w-full rounded-lg bg-koenig-light py-1.5 text-xs font-semibold text-koenig-blue hover:bg-koenig-blue/10 transition"
                    >
                      Go to Today
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={nextPeriod}
                className="flex items-center gap-1 text-xs font-medium text-koenig-muted hover:text-koenig-blue transition"
              >
                <span className="hidden sm:inline">{expanded ? "" : formatDate(toLocalIso(nextWeekDate))}</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-b border-koenig-border px-4 py-2.5 bg-white">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">
                Legend:
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-koenig-gray">
                <span className="h-2.5 w-2.5 rounded-sm bg-koenig-blue" /> Online
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-koenig-gray">
                <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" /> Classroom (ILT)
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-koenig-gray">
                <span className="h-2.5 w-2.5 rounded-sm bg-purple-500" /> Weekend / 1-on-1
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-koenig-gray">
                <span className="h-2 w-2 rounded-full bg-green-500 ring-1 ring-green-300" /> GTR
              </span>
            </div>

            {/* Calendar Grid — Week or 4-Week view */}
            {!expanded ? (
              /* ---- WEEK VIEW ---- */
              <div className="overflow-x-auto">
              <div className="grid grid-cols-7 divide-x divide-koenig-border" style={{ minWidth: 560 }}>
                {weekDates.map((wd) => {
                  const dayBatches = filtered.filter((b) => batchFallsOnDate(b, wd.iso));
                  const isDayToday = isTodayCheck(wd.iso, todayIso);
                  return (
                    <div key={wd.iso} className="min-h-[140px] p-2">
                      {/* Day header */}
                      <div className="mb-2 flex flex-col items-center">
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">{wd.day}</span>
                        <div className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-bold ${
                          isDayToday ? "bg-red-500 text-white" : "text-koenig-dark"
                        }`}>{wd.date}</div>
                        {isDayToday && <span className="mt-0.5 text-[10px] font-bold text-red-500">Today</span>}
                      </div>
                      {/* Cards for every batch active on this day */}
                      <div className="space-y-1">
                        {dayBatches.map((batch) => {
                          const pal = SPAN_PALETTE[getBatchColorIdx(batch.id)];
                          const isSel = selectedBatch?.id === batch.id;
                          const isStart = batch.startDate === wd.iso;
                          const isEnd = batch.endDate === wd.iso;
                          const label = batch.format === "Classroom" ? `ILT · ${batch.location}` : "Instructor-Led";
                          return (
                            <button
                              key={batch.id}
                              onClick={() => setSelectedBatch(batch)}
                              style={{
                                borderLeftColor: pal.bar,
                                background: pal.bg,
                                outline: isSel ? `2px solid ${pal.bar}` : undefined,
                                outlineOffset: isSel ? "-1px" : undefined,
                              }}
                              className="w-full cursor-pointer rounded-lg border-l-[3px] text-left shadow-sm transition-all hover:shadow-md"
                            >
                              <div className="p-2">
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span
                                    className="rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                                    style={{ background: pal.bar, color: "#fff" }}
                                  >{label}</span>
                                  <div className="flex items-center gap-1">
                                    {batch.gtr && <span className="text-[10px] font-bold text-green-600">GTR</span>}
                                    {isStart && <span className="text-[10px] font-bold" style={{ color: pal.bar }}>Start</span>}
                                    {isEnd && <span className="text-[10px] font-bold" style={{ color: pal.bar }}>End</span>}
                                  </div>
                                </div>
                                <div className="text-[11px] text-koenig-muted truncate">{batch.time} · {batch.hoursPerDay}h/day</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              </div>
            ) : (
              /* ---- 4-WEEK ROLLING VIEW ---- */
              <div className="overflow-x-auto">
              <div>
                {/* Day headers */}
                <div className="grid grid-cols-7 divide-x divide-koenig-border border-b border-koenig-border bg-koenig-light/50" style={{ minWidth: 560 }}>
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                    <div key={d} className="py-2 text-center text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">{d}</div>
                  ))}
                </div>
                {/* 4 week rows */}
                {fourWeeks.map((weekMon) => {
                  const wDates = getWeekDates(weekMon);
                  const isThisWeek = isCurrentWeek(weekMon);
                  return (
                    <div key={weekMon.toISOString()} className={`grid grid-cols-7 divide-x divide-koenig-border border-b border-koenig-border ${isThisWeek ? "bg-koenig-blue/5" : ""}`} style={{ minWidth: 560 }}>
                      {wDates.map((wd) => {
                        const dayBatches = filtered.filter((b) => batchFallsOnDate(b, wd.iso));
                        const isDayToday = isTodayCheck(wd.iso, todayIso);
                        return (
                          <div key={wd.iso} className="min-h-[80px] p-1">
                            {/* Date number */}
                            <div className="mb-1">
                              <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                                isDayToday ? "bg-red-500 text-white" : "text-koenig-dark"
                              }`}>{wd.date}</span>
                            </div>
                            {/* Cards for every batch active on this day */}
                            <div className="space-y-0.5">
                              {dayBatches.map((batch) => {
                                const pal = SPAN_PALETTE[getBatchColorIdx(batch.id)];
                                const isSel = selectedBatch?.id === batch.id;
                                const isStart = batch.startDate === wd.iso;
                                const isEnd = batch.endDate === wd.iso;
                                const label = batch.format === "Classroom" ? `ILT · ${batch.location}` : "Instructor-Led";
                                return (
                                  <button
                                    key={batch.id}
                                    onClick={() => setSelectedBatch(batch)}
                                    style={{
                                      borderLeftColor: pal.bar,
                                      background: pal.bg,
                                      outline: isSel ? `1.5px solid ${pal.bar}` : undefined,
                                      outlineOffset: isSel ? "-1px" : undefined,
                                    }}
                                    className="w-full cursor-pointer rounded border-l-[2px] text-left shadow-sm transition-all hover:shadow-md"
                                  >
                                    <div className="px-1.5 py-1">
                                      <div className="truncate text-[10px] font-bold" style={{ color: pal.text }}>{label}</div>
                                      <div className="truncate text-[10px] text-koenig-muted">{batch.time}</div>
                                      <div className="mt-0.5 flex gap-1">
                                        {batch.gtr && <span className="text-[10px] font-bold text-green-600">GTR</span>}
                                        {isStart && <span className="text-[10px] font-bold" style={{ color: pal.bar }}>Start</span>}
                                        {isEnd && <span className="text-[10px] font-bold" style={{ color: pal.bar }}>End</span>}
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              </div>
            )}


            {/* Upcoming Weeks Indicator */}
            {!expanded && upcomingBatches.length > 0 && (
              <div className="border-t border-koenig-border bg-koenig-light px-4 py-2.5">
                <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide text-[11px] text-koenig-muted">
                  <span className="font-semibold shrink-0">Upcoming:</span>
                  {upcomingBatches.map((b, i) => (
                    <span key={b.id} className="flex shrink-0 items-center gap-1.5">
                      {i > 0 && (
                        <span className="text-koenig-border mr-1.5">|</span>
                      )}
                      <span className={`h-2 w-2 rounded-full ${batchDotColor(b)}`} />
                      {formatDate(b.startDate)} &mdash; {b.format}
                      {b.location !== "Virtual" ? ` (${b.location})` : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Month/Week Toggle */}
            <div className="border-t border-koenig-border bg-white px-6 py-2 text-center">
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-koenig-blue hover:text-koenig-accent transition"
              >
                <svg className={`h-3.5 w-3.5 transition ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {expanded ? "Show Week View" : "Show 4 Weeks"}
              </button>
            </div>
          </div>
          </div>
        )}

        {/* ================================================================ */}
        {/*  LIST VIEW — Card Layout                                         */}
        {/* ================================================================ */}
        {activeView === "list" && (() => {
          const PAGE_SIZE = isMobile ? 4 : 5;
          const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
          const pageItems = filtered.slice(listPage * PAGE_SIZE, (listPage + 1) * PAGE_SIZE);
          const selBatch = selectedBatch ?? pageItems[0] ?? null;
          const hasCertSel = selBatch ? certSelected.has(selBatch.id) : false;
          const selCourseFee = selBatch?.price ?? COURSE_PRICING.online.public;
          const selExamFee = selBatch?.currency === "INR" ? EXAM_FEE_INR : 0;
          const selSubtotal = selCourseFee + (hasCertSel ? selExamFee : 0);
          const selGst = Math.round(selSubtotal * GST_RATE);
          const selTotal = selSubtotal + selGst;
          const selFeeOnRequest = selBatch?.format === "Classroom" && INTERNATIONAL_LOCATIONS.has(selBatch.location);
          return (
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 p-2 sm:p-[18px] lg:items-start">
              {/* LEFT: batch list */}
              <div className="flex-1 min-w-0 w-full max-w-[850px] rounded-xl p-3 sm:p-4" style={{ background: "rgba(6,148,209,0.03)", border: "1px solid rgba(6,148,209,0.12)" }}>
              <div className="mb-3 flex items-center gap-2">
                <svg className="h-4 w-4 text-koenig-blue flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span className="text-sm font-bold text-koenig-dark">Choose Your Batch</span>
                <span className="ml-auto text-xs text-koenig-muted font-medium">{filtered.length} available</span>
              </div>
              <div className="mb-4 flex items-center gap-1.5 text-xs text-koenig-muted">
                <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <span>Classroom fees vary by location; some locations are fee on request</span>
              </div>
              <div className="space-y-2">
                {pageItems.map((batch) => {
                  const status = seatStatus(batch);
                  const isNext = nextBatch?.id === batch.id;
                  const isSel = selBatch?.id === batch.id;

                  const accentBorder =
                    batch.format === "Classroom"
                      ? "border-l-koenig-navy"
                      : batch.isWeekend || batch.format === "1-on-1"
                      ? "border-l-koenig-accent"
                      : "border-l-koenig-blue";

                  const dateBg =
                    batch.format === "Classroom"
                      ? "bg-koenig-navy/5"
                      : "bg-koenig-blue/5";

                  const startD = new Date(batch.startDate + "T00:00:00");
                  const endD = new Date(batch.endDate + "T00:00:00");
                  return (
                    <div key={batch.id} className="relative" onClick={() => setSelectedBatch(batch)}>
                      {/* Blue stacked card behind — fades in/out smoothly */}
                      <div className={`absolute inset-x-0 bottom-0 h-full translate-y-1 rounded-xl bg-koenig-blue/25 transition-opacity duration-300 ${isSel ? "opacity-100" : "opacity-0"}`} />
                    <div
                      style={{
                        boxShadow: isSel
                          ? '0 8px 28px 0 rgba(6,148,209,0.28), 0 2px 8px 0 rgba(6,148,209,0.18)'
                          : '0 2px 8px 0 rgba(6,148,209,0.07)',
                        transform: isSel ? 'translateY(-2px) scale(1.012)' : 'translateY(0) scale(1)',
                      }}
                      className={`relative cursor-pointer rounded-xl border-2 px-4 pt-3 pb-3 transition-all duration-300 ease-out flex gap-3 ${
                        isSel
                          ? "border-koenig-blue bg-white"
                          : "border-transparent bg-white hover:border-koenig-blue/30"
                      }`}
                    >
                      {/* Tick radio */}
                      <div className="flex flex-shrink-0 items-center self-center">
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${isSel ? "border-koenig-blue bg-koenig-blue" : "border-gray-300 bg-white"}`}>
                          {isSel && (
                            <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 13l4 4L19 7"/>
                            </svg>
                          )}
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                      {/* Row 1: Date + GTR */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <svg className={`h-3.5 w-3.5 flex-shrink-0 ${isSel ? "text-koenig-blue" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        {/* Shorter date on mobile to fit GTR on same line */}
                        <span className={`text-sm font-bold sm:hidden ${isSel ? "text-koenig-blue" : "text-koenig-dark"}`}>
                          {startD.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – {endD.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className={`text-sm font-bold hidden sm:inline ${isSel ? "text-koenig-blue" : "text-koenig-dark"}`}>
                          {startD.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} – {endD.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        {batch.gtr && (
                          <span className="flex flex-shrink-0 items-center gap-1 rounded-full border border-green-300 bg-green-50 px-2 py-0.5 text-green-700">
                            <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/></svg>
                            <span className="text-[12px] font-normal"><span className="sm:hidden">GTR</span><span className="hidden sm:inline">Guaranteed to Run</span></span>
                          </span>
                        )}
                      </div>

                      {/* Row 2: Format + Time */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                        <div className="flex items-center gap-1.5">
                          {batch.format === "Online" ? (
                            <svg className={`h-3.5 w-3.5 flex-shrink-0 ${isSel ? "text-koenig-blue" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                          ) : batch.format === "Classroom" ? (
                            <svg className={`h-3.5 w-3.5 flex-shrink-0 ${isSel ? "text-koenig-blue" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v18"/><path d="M6 12H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2"/><path d="M18 9h2a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/></svg>
                          ) : (
                            <svg className={`h-3.5 w-3.5 flex-shrink-0 ${isSel ? "text-koenig-blue" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          )}
                          {batch.format === "Classroom" ? (
                            <span className="flex items-baseline gap-0.5">
                              <span className={`text-sm font-semibold ${isSel ? "text-koenig-blue" : "text-koenig-dark"}`}>{batch.location}</span>
                              {CITY_COUNTRY[batch.location] && (
                                <span className={`text-sm font-normal ${isSel ? "text-koenig-blue" : "text-koenig-dark"}`}>
                                  {` (${CITY_COUNTRY[batch.location].name.length > 12 ? CITY_COUNTRY[batch.location].abbr : CITY_COUNTRY[batch.location].name})`}
                                </span>
                              )}
                            </span>
                          ) : (
                            <span className={`text-sm font-semibold ${isSel ? "text-koenig-blue" : "text-koenig-dark"}`}>{batch.format === "Online" ? "Online" : `${batch.format} · ${batch.location}`}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className={`h-3.5 w-3.5 flex-shrink-0 ${isSel ? "text-koenig-blue" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          <span className={`text-sm ${isSel ? "text-koenig-blue" : "text-koenig-dark"}`}>{batch.time} ({batch.hoursPerDay}hr)</span>
                        </div>
                      </div>
                      {/* Row 3: Price + Seats — mobile only inline, desktop in right column */}
                      <div className="sm:hidden">
                        <div className="mb-1 flex items-center justify-between">
                          <span className={`text-sm font-bold ${isSel ? "text-koenig-blue" : "text-koenig-dark"}`}>
                            {batch.format === "Classroom" && INTERNATIONAL_LOCATIONS.has(batch.location) ? "On Request" : formatCurrency(batch.price, batch.currency)}
                          </span>
                          <span className={`text-xs font-semibold whitespace-nowrap ${status.color}`}>{batch.seats} seats · {status.text}</span>
                        </div>
                        <div className="h-1 rounded-full overflow-hidden bg-gray-100">
                          <div className={`h-full rounded-full transition-all ${seatBarColor(batch)}`} style={{ width: seatBarWidth(batch) }} />
                        </div>
                      </div>
                      </div>

                      {/* Bar column — desktop only */}
                      <div className="hidden sm:flex flex-shrink-0 flex-col items-center justify-center gap-1 self-stretch pl-3 border-l border-koenig-blue/10 min-w-[150px]">
                        <span className={`text-sm font-bold ${isSel ? "text-koenig-blue" : "text-koenig-dark"}`}>
                          {batch.format === "Classroom" && INTERNATIONAL_LOCATIONS.has(batch.location) ? "On Request" : formatCurrency(batch.price, batch.currency)}
                        </span>
                        <div className="w-32 h-1 rounded-full overflow-hidden bg-gray-100 mt-0.5">
                          <div className={`h-full rounded-full transition-all ${seatBarColor(batch)}`} style={{ width: seatBarWidth(batch) }} />
                        </div>
                        <span className={`text-[12px] font-medium whitespace-nowrap ${status.color}`}>{batch.seats} Seats · {status.text}</span>
                      </div>
                    </div>
                    </div>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="rounded-lg border border-koenig-blue/20 bg-white px-5 py-10 text-center text-sm text-koenig-muted">
                    No batches match your filters.
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-3 flex flex-col items-center gap-2">
                  {/* Mobile: compact prev / page-x-of-y / next */}
                  <div className="flex sm:hidden items-center gap-2 w-full">
                    <button onClick={() => setListPage(p => Math.max(0, p - 1))} disabled={listPage === 0}
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-koenig-border bg-white text-koenig-muted transition hover:border-koenig-blue hover:text-koenig-blue disabled:opacity-40">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div className="flex flex-1 items-center justify-center gap-1">
                      {getPaginationRange(listPage, totalPages).map((i) => (
                        <button key={i} onClick={() => setListPage(i)}
                          className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${i === listPage ? "bg-koenig-navy text-white" : "border border-koenig-border bg-white text-koenig-muted hover:border-koenig-blue hover:text-koenig-blue"}`}>
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setListPage(p => Math.min(totalPages - 1, p + 1))} disabled={listPage === totalPages - 1}
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-koenig-border bg-white text-koenig-muted transition hover:border-koenig-blue hover:text-koenig-blue disabled:opacity-40">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                  {/* Desktop: full buttons */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    <button onClick={() => setListPage(p => Math.max(0, p - 1))} disabled={listPage === 0}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-koenig-border bg-white text-koenig-muted transition hover:border-koenig-blue hover:text-koenig-blue disabled:opacity-40">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    {getPaginationRange(listPage, totalPages).map((i) => (
                      <button key={i} onClick={() => setListPage(i)}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition ${i === listPage ? "bg-koenig-navy text-white" : "border border-koenig-border bg-white text-koenig-muted hover:border-koenig-blue hover:text-koenig-blue"}`}>
                        {i + 1}
                      </button>
                    ))}
                    <button onClick={() => setListPage(p => Math.min(totalPages - 1, p + 1))} disabled={listPage === totalPages - 1}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-koenig-border bg-white text-koenig-muted transition hover:border-koenig-blue hover:text-koenig-blue disabled:opacity-40">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                  <span className="text-sm font-medium text-koenig-dark">
                    Showing {listPage * PAGE_SIZE + 1}–{Math.min((listPage + 1) * PAGE_SIZE, filtered.length)} of <span className="font-bold">{filtered.length}</span> schedules
                  </span>
                </div>
              )}
              </div>

              {/* Mobile fixed bottom Enroll bar — public batch. Mirrors the
                  desktop price card's "Fee on Request" handling: no
                  numeric price/breakdown, and CTA reads "Request More
                  Info" instead of "Enroll Now" for on-request classroom
                  batches (e.g. international locations). */}
              {scheduleInView && tabsFloating && selBatch && (
                <div className="lg:hidden" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, background: '#fff', borderTop: '1px solid rgba(6,148,209,0.2)', boxShadow: '0 -4px 20px rgba(0,0,0,0.10)', padding: '8px 16px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {selFeeOnRequest ? (
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#071e2e', whiteSpace: 'nowrap' }}>Fee on Request</span>
                      ) : (
                        <>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                            <span style={{ fontSize: 14, fontWeight: 800, color: '#071e2e', whiteSpace: 'nowrap' }}>INR {selSubtotal.toLocaleString("en-IN")}</span>
                            <span style={{ fontSize: 10, color: '#8a9db5', whiteSpace: 'nowrap' }}>excl. GST</span>
                          </div>
                          <button
                            onClick={() => setPubBreakdownOpen(true)}
                            style={{ background: 'none', border: 'none', padding: 0, fontSize: 11, fontWeight: 600, color: '#0694D1', textDecoration: 'underline', cursor: 'pointer', textAlign: 'left' }}
                          >View Fees Breakdown</button>
                        </>
                      )}
                    </div>
                    <button onClick={() => { openBookingIfClassroom(selBatch); goToOnlineCheckout(selBatch); }} style={{ flex: 1, minWidth: 0, borderRadius: 12, background: 'linear-gradient(to right,#0694D1,#22d3ee)', padding: '12px 0', fontSize: 14, fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <span>{selFeeOnRequest ? "Request More Info" : "Enroll Now"}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Public Fees Breakdown popup */}
              {pubBreakdownOpen && selBatch && createPortal(
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }} onClick={() => setPubBreakdownOpen(false)} />
                  <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 9999, width: 'calc(100vw - 32px)', maxWidth: 340, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.22)' }}>
                    <div style={{ background: '#071e2e', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff' }}>Fees Breakdown</span>
                      <button onClick={() => setPubBreakdownOpen(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 700 }}>✕</button>
                    </div>
                    <div style={{ padding: '4px 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #f0f4f8' }}>
                        <span style={{ color: '#4a6a8a' }}>Course Fee</span>
                        <span style={{ fontWeight: 600, color: '#071e2e' }}>INR {selCourseFee.toLocaleString("en-IN")}</span>
                      </div>
                      {hasCertSel && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #f0f4f8' }}>
                          <span style={{ color: '#4a6a8a' }}>Exam Fee</span>
                          <span style={{ fontWeight: 600, color: '#071e2e' }}>INR {selExamFee.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #e8f4fa' }}>
                        <span style={{ color: '#4a6a8a' }}>+ GST 18%</span>
                        <span style={{ fontWeight: 600, color: '#071e2e' }}>INR {selGst.toLocaleString("en-IN")}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: 14, background: '#f8fcff' }}>
                        <span style={{ fontWeight: 700, color: '#071e2e' }}>Total (INR)</span>
                        <span style={{ fontWeight: 700, color: '#071e2e' }}>INR {selTotal.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '10px 16px 14px', borderTop: '1px solid #e8f4fa' }}>
                      <button onClick={() => setPubBreakdownOpen(false)} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#0694D1', textDecoration: 'underline', cursor: 'pointer' }}>Hide Breakdown</button>
                    </div>
                  </div>
                </>,
                document.body
              )}

              {/* RIGHT: Enroll card — desktop only */}
              <div className="hidden lg:block lg:w-[330px] flex-shrink-0 lg:sticky lg:top-20 lg:self-start">
                <div className="rounded-xl border-2 border-koenig-blue/30 bg-white flex flex-col" style={{ boxShadow: '0 4px 20px 0 rgba(6,148,209,0.15)' }}>
                  {/* Add Certification */}
                  <div className="px-4 pt-3 pb-0">
                    <label className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 transition-colors ${hasCertSel ? "border-koenig-blue bg-koenig-blue/10 ring-1 ring-koenig-blue/30" : "border-koenig-navy/20 bg-koenig-light hover:bg-koenig-blue/5"}`}>
                      <div className="flex items-center gap-2">
                        <div className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${hasCertSel ? "border-koenig-blue bg-koenig-blue" : "border-gray-300 bg-white"}`}>
                          {hasCertSel && <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className={`text-sm font-semibold ${hasCertSel ? "text-koenig-blue" : "text-koenig-dark"}`}>Add Certification</span>
                        <div className="group relative flex items-center">
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center text-koenig-muted hover:text-koenig-blue"
                            aria-label="About the certification exam"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="11" /><circle cx="12" cy="8" r="0.5" fill="currentColor" /></svg>
                          </button>
                          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-48 -translate-x-1/2 rounded-lg border border-koenig-border bg-white px-3 py-2 text-[11px] leading-snug text-koenig-dark opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                            Check this box to add the certification exam
                            <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-koenig-border bg-white" />
                          </div>
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${hasCertSel ? "text-koenig-navy" : "text-koenig-navy"}`}>+{EXAM_FEE_INR.toLocaleString("en-IN")}</span>
                      <input type="checkbox" className="sr-only" checked={hasCertSel} onChange={() => {
                        if (!selBatch) return;
                        setCertSelected(prev => { const next = new Set(prev); next.has(selBatch.id) ? next.delete(selBatch.id) : next.add(selBatch.id); return next; });
                      }} />
                    </label>
                  </div>
                  {/* Price */}
                  {selFeeOnRequest ? (
                    <div className="bg-gradient-to-b from-koenig-blue/8 to-koenig-blue/3 px-4 py-4 text-center border-t border-koenig-blue/15 mt-3">
                      <div className="text-sm font-bold uppercase tracking-widest text-koenig-navy/70 mb-1">Classroom Fee</div>
                      <div className="text-xl font-extrabold text-koenig-blue">Fee on Request</div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-b from-koenig-blue/8 to-koenig-blue/3 px-4 py-4 text-center border-t border-koenig-blue/15 mt-3">
                      <div className="text-sm font-bold uppercase tracking-widest text-koenig-navy/70 mb-1">Total (excl. GST)</div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-sm font-bold text-koenig-blue">INR</span>
                        <span className="text-3xl font-extrabold text-koenig-blue">{selSubtotal.toLocaleString("en-IN")}</span>
                        <span className="text-sm font-bold text-koenig-blue">†</span>
                      </div>
                      <button onClick={() => setPubBreakdownOpen(v => !v)} className="mt-1.5 text-sm font-semibold text-koenig-blue underline underline-offset-2 hover:text-koenig-navy transition">
                        {pubBreakdownOpen ? "Hide Breakdown" : "View Fees Breakdown"}
                      </button>
                    </div>
                  )}
                  {/* Breakdown */}
                  {!selFeeOnRequest && pubBreakdownOpen && selBatch && (
                    <div className="border-y border-koenig-navy/20 text-sm">
                      <div className="flex items-center justify-between bg-koenig-navy px-3 py-2">
                        <span className="text-sm font-bold uppercase tracking-wide text-white">Fees Breakdown</span>
                        <button onClick={() => setPubBreakdownOpen(false)} className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition text-xs font-bold">✕</button>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 bg-white"><span className="text-koenig-muted">Course Fee</span><span className="font-semibold text-koenig-dark">{selCourseFee.toLocaleString("en-IN")}</span></div>
                      {hasCertSel && <div className="flex items-center justify-between border-t border-koenig-navy/10 px-3 py-2 bg-white"><span className="text-koenig-muted">Exam Fee</span><span className="font-semibold text-koenig-dark">{selExamFee.toLocaleString("en-IN")}</span></div>}
                      <div className="flex items-center justify-between border-t border-koenig-navy/10 px-3 py-2 bg-white"><span className="text-koenig-muted">+ GST 18%</span><span className="font-semibold text-koenig-dark">{selGst.toLocaleString("en-IN")}</span></div>
                      <div className="flex items-center justify-between border-t border-koenig-navy/20 bg-koenig-navy/8 px-3 py-2"><span className="font-bold text-koenig-navy">Total (INR)</span><span className="font-bold text-koenig-navy">{selTotal.toLocaleString("en-IN")}</span></div>
                    </div>
                  )}
                  {/* Enroll Now / Request More Info */}
                  <div className="px-4 py-3">
                    <button onClick={() => { openBookingIfClassroom(selBatch); goToOnlineCheckout(selBatch); }} className="group w-full rounded-lg bg-gradient-to-r from-koenig-blue to-cyan-500 py-3 text-sm font-bold text-white shadow-md shadow-koenig-blue/25 hover:shadow-lg hover:shadow-koenig-blue/40 hover:brightness-105 transition-all active:scale-95 flex items-center justify-center gap-2 overflow-hidden">
                      <span>{selFeeOnRequest ? "Request More Info" : "Enroll Now"}</span>
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </button>
                    <p className="mt-2 text-center text-[10px] text-koenig-muted">{selFeeOnRequest ? "Our team will get back to you shortly" : "Secure payment"}</p>
                  </div>
                </div>
              </div>

              {/* Mobile fee summary — date info + subtotal only */}
              {selBatch && (
                <div className="lg:hidden px-3 pb-3">
                  <div className="rounded-xl border border-koenig-blue/20 bg-koenig-blue/5 px-4 py-3">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-koenig-blue">Fees Summary</div>

                    {/* Selected session info */}
                    <div className="mb-3 rounded-lg border border-koenig-blue/15 bg-white px-3 py-2.5 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <svg className="h-3.5 w-3.5 flex-shrink-0 text-koenig-blue/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        <span className="text-sm font-semibold text-koenig-dark">
                          {new Date(selBatch.startDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} – {new Date(selBatch.endDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-3.5 w-3.5 flex-shrink-0 text-koenig-blue/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span className="text-sm text-koenig-dark">{selBatch.time} ({selBatch.hoursPerDay}hr) · {selBatch.format}</span>
                      </div>
                    </div>

                    {selFeeOnRequest ? (
                      /* On-request classroom batches (e.g. international
                         locations) have no fixed price — match desktop's
                         "Fee on Request" treatment instead of a subtotal. */
                      <div className="text-center py-1">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-koenig-navy/70 mb-0.5">Classroom Fee</div>
                        <div className="text-base font-extrabold text-koenig-blue">Fee on Request</div>
                      </div>
                    ) : (
                      <>
                        {/* Fee rows — only visible when cert is added */}
                        {hasCertSel && (
                          <div className="space-y-1 text-sm mb-2">
                            <div className="flex items-center justify-between">
                              <span className="text-koenig-muted">Course Fee</span>
                              <span className="font-semibold text-koenig-dark">INR {selCourseFee.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-koenig-muted">Exam Fee</span>
                              <span className="font-semibold text-koenig-dark">INR {selExamFee.toLocaleString("en-IN")}</span>
                            </div>
                          </div>
                        )}
                        {/* Subtotal */}
                        <div className={`flex items-center justify-between text-sm ${hasCertSel ? "border-t border-koenig-blue/15 pt-2" : ""}`}>
                          <span className="font-bold text-koenig-dark">Subtotal</span>
                          <span className="font-bold text-koenig-blue">INR {selSubtotal.toLocaleString("en-IN")} <span className="text-xs font-normal text-koenig-muted">excl. GST</span></span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

          );
        })()}

        {/* Other training options below public — desktop only */}
        <div className="hidden lg:grid gap-3 px-[18px] pb-[18px] lg:grid-cols-2">
          <div
            className="cursor-pointer rounded-lg border border-koenig-blue/20 bg-gradient-to-r from-koenig-blue/5 to-white px-3 py-2.5 transition-all hover:border-koenig-blue/50 hover:shadow-md"
            onClick={() => { setPricingTab("one-on-one"); document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-koenig-blue/10">
                  <svg className="h-4 w-4 text-koenig-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-koenig-dark">1-on-1 Training</div>
                  <div className="text-[11px] text-koenig-muted">Private instructor &mdash; any date</div>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-base font-bold text-koenig-blue">{formatCurrency(COURSE_PRICING.online.oneOnOne, "INR")}</div>
                <div className="text-[10px] text-koenig-muted">per person · excl. VAT/GST</div>
              </div>
            </div>
          </div>
          <div
            className="cursor-pointer rounded-lg border border-koenig-accent/20 bg-gradient-to-r from-koenig-accent/5 to-white px-3 py-2.5 transition-all hover:border-koenig-accent/50 hover:shadow-md"
            onClick={() => { setPricingTab("self-paced"); document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-koenig-accent/10">
                  <svg className="h-4 w-4 text-koenig-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-koenig-dark">Flexi (Self-Paced)</div>
                  <div className="text-[11px] text-koenig-muted">Start now &mdash; recorded HD sessions</div>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-base font-bold text-koenig-accent">{formatCurrency(COURSE_PRICING.online.flexi, "INR")}</div>
                <div className="text-[10px] text-koenig-muted">per person · excl. VAT/GST</div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/*  COMPARE VIEW                                                    */}
        {/* ================================================================ */}
        {activeView === "compare" && (
          <div className="p-[18px]">
            {/* Header bar — centered, prominent */}
            <div className="mb-5 rounded-xl border border-koenig-blue/20 bg-koenig-light/60 p-4 sm:p-5">
              <div className="flex flex-col items-center gap-3">
                {/* Step circles */}
                <div className="flex items-center gap-2">
                  {[1,2,3].map((n) => (
                    <React.Fragment key={n}>
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${compareBatches.size >= n ? "bg-koenig-blue text-white shadow-sm shadow-koenig-blue/30" : "border-2 border-koenig-border bg-white text-koenig-muted"}`}>{n}</div>
                      {n < 3 && <div className={`h-0.5 w-8 rounded-full transition ${compareBatches.size >= n ? "bg-koenig-blue" : "bg-koenig-border"}`} />}
                    </React.Fragment>
                  ))}
                </div>
                {/* Status text */}
                <div className="text-center">
                  <p className="text-sm font-semibold text-koenig-dark">
                    {compareBatches.size === 0 && "Select up to 3 batches to compare side-by-side"}
                    {compareBatches.size === 1 && "Good — select 2 more batches"}
                    {compareBatches.size === 2 && "Almost there — select 1 more batch"}
                    {compareBatches.size === 3 && "All 3 selected — comparison ready below ↓"}
                  </p>
                  <p className="mt-0.5 text-[11px] text-koenig-muted">
                    {compareBatches.size === 0 ? "Click any card below to add it to comparison" : `${compareBatches.size}/3 selected`}
                  </p>
                </div>
                {/* Clear */}
                {compareBatches.size > 0 && (
                  <button onClick={() => setCompareBatches(new Set())} className="rounded-full border border-red-200 bg-white px-3 py-1 text-[11px] font-semibold text-red-500 hover:bg-red-50 transition">
                    Clear selection
                  </button>
                )}
              </div>
            </div>

            {/* Selection grid — 4 rows × 3 cols = 12 per page */}
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(comparePage * COMPARE_PAGE_SIZE, (comparePage + 1) * COMPARE_PAGE_SIZE).map((batch) => {
                const checked = compareBatches.has(batch.id);
                const disabled = !checked && compareBatches.size >= 3;
                return (
                  <button
                    key={batch.id}
                    onClick={() => toggleCompare(batch.id)}
                    disabled={disabled}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition ${
                      checked
                        ? "border-koenig-blue bg-koenig-blue/5 ring-2 ring-koenig-blue/20 shadow-sm"
                        : disabled
                        ? "border-koenig-border bg-koenig-light/50 opacity-40 cursor-not-allowed"
                        : "border-koenig-border bg-white hover:border-koenig-blue hover:shadow-sm"
                    }`}
                  >
                    {/* Checkbox */}
                    <div className={`mt-0.5 flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center rounded border-2 transition ${checked ? "border-koenig-blue bg-koenig-blue" : "border-koenig-border bg-white"}`}>
                      {checked && <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-koenig-dark">{formatDateRange(batch.startDate, batch.endDate)}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${batch.format === "Classroom" ? "bg-koenig-accent" : "bg-koenig-blue"}`}>{batch.format}</span>
                        {batch.isWeekend && <span className="rounded-full bg-koenig-navy/10 px-2 py-0.5 text-[10px] font-semibold text-koenig-navy">Weekend</span>}
                        {batch.gtr && <span className="rounded-full bg-koenig-blue/10 px-2 py-0.5 text-[10px] font-semibold text-koenig-blue">GTR</span>}
                      </div>
                      <div className="mt-1 text-[10px] text-koenig-muted">{formatCurrency(batch.price, batch.currency)} · {batch.seats} seats · {batch.hoursPerDay}h/day</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pagination — centered */}
            {Math.ceil(filtered.length / COMPARE_PAGE_SIZE) > 1 && (
              <div className="mt-4 flex flex-col items-center gap-2 border-t border-koenig-border pt-4">
                <span className="text-[11px] text-koenig-muted">
                  Showing {comparePage * COMPARE_PAGE_SIZE + 1}–{Math.min((comparePage + 1) * COMPARE_PAGE_SIZE, filtered.length)} of {filtered.length} batches
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setComparePage(p => Math.max(0, p - 1))} disabled={comparePage === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-koenig-border bg-white text-koenig-muted transition hover:border-koenig-blue hover:text-koenig-blue disabled:opacity-40 disabled:cursor-not-allowed">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  {Array.from({ length: Math.ceil(filtered.length / COMPARE_PAGE_SIZE) }, (_, i) => (
                    <button key={i} onClick={() => setComparePage(i)}
                      className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-semibold transition ${i === comparePage ? "bg-koenig-navy text-white shadow-sm" : "border border-koenig-border bg-white text-koenig-muted hover:border-koenig-blue hover:text-koenig-blue"}`}>
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => setComparePage(p => Math.min(Math.ceil(filtered.length / COMPARE_PAGE_SIZE) - 1, p + 1))} disabled={comparePage === Math.ceil(filtered.length / COMPARE_PAGE_SIZE) - 1}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-koenig-border bg-white text-koenig-muted transition hover:border-koenig-blue hover:text-koenig-blue disabled:opacity-40 disabled:cursor-not-allowed">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Side-by-side comparison */}
            {compareBatches.size > 0 && (
              <div ref={compareResultRef} className="mt-6 border-t border-koenig-border pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-koenig-blue text-[10px] font-bold text-white">✓</span>
                  <h3 className="text-sm font-bold text-koenig-dark">Comparison</h3>
                  <span className="text-[11px] text-koenig-muted">({compareBatches.size} batch{compareBatches.size > 1 ? "es" : ""} selected)</span>
                </div>
                <div className={`grid gap-4 grid-cols-1 ${compareBatches.size === 2 ? "lg:grid-cols-2" : compareBatches.size === 3 ? "lg:grid-cols-3" : ""}`}>
                  {Array.from(compareBatches).map((id) => {
                    const batch = activeBatches.find((b) => b.id === id)!;
                    const status = seatStatus(batch);
                    return (
                      <div key={batch.id} className="rounded-xl border border-koenig-blue/30 bg-white shadow-sm overflow-hidden">
                        {/* Card header stripe */}
                        <div className="h-1 w-full bg-koenig-blue" />
                        <div className="p-5">
                          <div className="mb-2 text-sm font-bold text-koenig-dark">{formatDateRange(batch.startDate, batch.endDate)}</div>
                          <div className="mb-4 flex flex-wrap items-center gap-1.5">
                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white ${batch.format === "Classroom" ? "bg-koenig-accent" : "bg-koenig-blue"}`}>{batch.format}</span>
                            {batch.gtr && <span className="rounded-full bg-koenig-blue/10 px-2.5 py-0.5 text-[10px] font-semibold text-koenig-blue">GTR</span>}
                            {batch.isWeekend && <span className="rounded-full bg-koenig-navy/10 px-2.5 py-0.5 text-[10px] font-semibold text-koenig-navy">Weekend</span>}
                          </div>

                          <div className="space-y-0 divide-y divide-koenig-border/60 text-xs">
                            {[
                              { label: "Schedule", val: batch.days.join(", ") },
                              { label: "Time", val: batch.time },
                              { label: "Duration", val: `${batch.hoursPerDay}h/day` },
                              { label: "Location", val: batch.location },
                            ].map(({ label, val }) => (
                              <div key={label} className="flex items-center justify-between py-2">
                                <span className="text-koenig-muted">{label}</span>
                                <span className="font-semibold text-koenig-dark text-right max-w-[60%] truncate">{val}</span>
                              </div>
                            ))}
                            <div className="py-2">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-koenig-muted">Seats</span>
                                <span className={`font-semibold ${status.color}`}>{batch.seats} / {batch.totalSeats}</span>
                              </div>
                              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-koenig-border">
                                <div className={`absolute left-0 top-0 h-full rounded-full ${seatBarColor(batch)}`} style={{ width: seatBarWidth(batch) }} />
                              </div>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <span className="text-koenig-muted">Price</span>
                              <span className="text-sm font-extrabold text-koenig-blue">{formatCurrency(batch.price, batch.currency)}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => { setSelectedBatch(batch); setActiveView("list"); }}
                            className="mt-4 w-full rounded-lg bg-koenig-blue py-2.5 text-xs font-bold text-white shadow-sm shadow-koenig-blue/20 transition hover:bg-koenig-accent active:scale-95"
                          >
                            Select This Batch
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/*  SELECTED BATCH DETAIL CARD (calendar view only)               */}
        {/* ================================================================ */}
        {activeView === "calendar" && selectedBatch && (
          <div className="mt-4 rounded-xl border-2 border-koenig-blue bg-white p-[18px] shadow-lg">
            <div className="flex flex-col lg:flex-row items-start gap-4">
              {/* Batch Info */}
              <div className="w-full lg:flex-1 min-w-0">
                {detailTab !== "self-paced" && <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-koenig-blue/10">
                    <svg className="h-6 w-6 text-koenig-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-bold text-koenig-dark">
                        {formatDateRange(selectedBatch.startDate, selectedBatch.endDate)}
                      </h3>
                      {/* Format badge inline */}
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white ${batchColor(selectedBatch)}`}>
                        {selectedBatch.format === "Classroom" ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                          </svg>
                        ) : selectedBatch.format === "Online" ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                          </svg>
                        ) : null}
                        {selectedBatch.format}
                      </span>
                      {/* City name inline for classroom */}
                      {selectedBatch.format === "Classroom" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-koenig-blue/30 bg-koenig-blue/10 px-3 py-1 text-xs font-semibold text-koenig-blue">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          {selectedBatch.location}
                        </span>
                      )}
                      {/* GTR badge — end of line */}
                      {selectedBatch.gtr && (
                        <span className="ml-auto rounded-full bg-koenig-blue/10 px-3 py-1 text-xs font-semibold text-koenig-blue">
                          Guaranteed-to-Run
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-koenig-muted mt-1">
                      {selectedBatch.days[0]}-{selectedBatch.days[selectedBatch.days.length - 1]} &middot; {selectedBatch.days.length} days &middot; {selectedBatch.time} {timezone} &middot; {selectedBatch.hoursPerDay} hrs/day
                    </p>
                  </div>
                </div>}

                {/* Weekend badge — hidden in 1-on-1 and self-paced modes */}
                {selectedBatch.isWeekend && detailTab !== "one-on-one" && detailTab !== "self-paced" && (
                  <div className="mb-2">
                    <span className="rounded-full bg-koenig-navy/10 px-3 py-1 text-xs font-semibold text-koenig-navy">
                      Weekend Batch
                    </span>
                  </div>
                )}

                {/* Left info — switches based on detail tab */}
                {detailTab === "one-on-one" ? (
                  <div className="rounded-lg border border-koenig-navy/20 bg-gradient-to-br from-koenig-navy/5 to-white p-3 max-w-sm">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-koenig-navy/10">
                        <svg className="h-5 w-5 text-koenig-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-koenig-dark">Private 1-on-1 Training</span>
                          {selectedBatch.isWeekend && (
                            <span className="rounded-full bg-koenig-navy/10 px-2 py-0.5 text-[10px] font-semibold text-koenig-navy">Weekend</span>
                          )}
                        </div>
                        <div className="text-[11px] text-koenig-muted">Private instructor · Any date · Flexible hours</div>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-[11px] text-koenig-muted">
                      <div className="flex items-center gap-2">
                        <svg className="h-3.5 w-3.5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium text-green-700">No seat limits — only you &amp; instructor</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setDetailInfoModal("one-on-one")}
                      className="mt-3 text-[11px] font-semibold text-koenig-navy underline underline-offset-2 hover:text-koenig-dark transition"
                    >
                      View more details →
                    </button>
                  </div>
                ) : detailTab === "self-paced" ? (
                  <div className="rounded-lg border border-koenig-accent/20 bg-gradient-to-br from-koenig-accent/5 to-white p-3 max-w-sm">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-koenig-accent/10">
                        <svg className="h-5 w-5 text-koenig-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-koenig-dark">Self-Paced / Flexi</div>
                        <div className="text-[11px] text-koenig-muted">Recorded HD sessions · Learn at your pace</div>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-[11px] text-koenig-muted">
                      <div className="flex items-center gap-2">
                        <svg className="h-3.5 w-3.5 flex-shrink-0 text-koenig-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Access anytime · No fixed schedule</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-3.5 w-3.5 flex-shrink-0 text-koenig-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-koenig-dark">Lifetime access to course material</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-3.5 w-3.5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium text-green-700">Start immediately after enrollment</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setFlexiModalOpen(true)}
                      className="mt-3 text-[11px] font-semibold text-koenig-accent underline underline-offset-2 hover:text-koenig-blue transition"
                    >
                      View all inclusions →
                    </button>
                  </div>
                ) : (
                  <div className="mb-0">
                    <div className="rounded-lg bg-koenig-light p-3 max-w-sm">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">Seats Remaining</div>
                        {seatStatus(selectedBatch).label === "Filling Fast" && (
                          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-[10px] font-semibold text-orange-700">Filling Fast</span>
                        )}
                      </div>
                      <div className={`mt-1 text-[12px] font-bold ${seatStatus(selectedBatch).color}`}>
                        {selectedBatch.seats} seats left
                      </div>
                      <div className="mt-2 relative h-2 w-full overflow-hidden rounded-full bg-koenig-border">
                        <div className={`absolute left-0 top-0 h-full rounded-full ${seatBarColor(selectedBatch)}`} style={{ width: seatBarWidth(selectedBatch) }} />
                      </div>
                      <div className="mt-1 text-[10px] text-koenig-muted">
                        {selectedBatch.totalSeats - selectedBatch.seats} of {selectedBatch.totalSeats} seats filled
                      </div>
                      <button
                        onClick={() => setDetailInfoModal("public")}
                        className="mt-3 text-[11px] font-semibold text-koenig-blue underline underline-offset-2 hover:text-koenig-accent transition"
                      >
                        View more details →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Cards — flex-wrap so they stack below batch info on mobile */}
              <div className="flex w-full flex-wrap gap-2 lg:w-auto lg:flex-shrink-0 lg:flex-nowrap lg:gap-3">
                {[
                  { label: "Public Batch", active: detailTab === "public", price: formatCurrency(selectedBatch.price, selectedBatch.currency), badge: "Most Popular", onClick: () => setDetailTab("public") },
                  { label: "1-on-1", active: detailTab === "one-on-one", price: formatCurrency(COURSE_PRICING.online.oneOnOne, "INR"), badge: "Premium", onClick: () => setDetailTab("one-on-one") },
                  { label: "Self-Paced", active: detailTab === "self-paced", price: formatCurrency(COURSE_PRICING.online.flexi, "INR"), badge: "Best Value", onClick: () => setDetailTab("self-paced") },
                ].map(({ label, active, price, badge, onClick }) => (
                  <button key={label} onClick={onClick}
                    className={`flex-1 min-w-[100px] rounded-xl p-3 lg:p-5 text-center transition ${
                      active ? "border-2 border-koenig-blue bg-koenig-blue/5 ring-2 ring-koenig-blue/20" : "border border-koenig-border bg-white hover:border-koenig-blue/40"
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-widest text-koenig-blue mb-1">{label}</div>
                    <div className="text-lg font-bold text-koenig-dark">{price}</div>
                    <div className="mt-0.5 text-[10px] text-koenig-muted">per person</div>
                    {active && <div className="mt-1 rounded-full bg-koenig-blue/10 px-2 py-0.5 text-[10px] font-semibold text-koenig-blue inline-block">{badge}</div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Enroll CTA */}
            {(() => {
              const detailPrice =
                detailTab === "one-on-one"
                  ? COURSE_PRICING.online.oneOnOne
                  : detailTab === "self-paced"
                  ? COURSE_PRICING.online.flexi
                  : selectedBatch.price;
              const detailCurrency =
                detailTab === "public" ? selectedBatch.currency : "INR";
              const enrollBg = "bg-gradient-to-r from-koenig-blue to-cyan-500 shadow-koenig-blue/25 hover:shadow-koenig-blue/40 hover:brightness-105";
              return (
            <div className="mt-[18px] flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-koenig-border pt-[18px]">
              <button onClick={() => { if (detailTab === "public") { openBookingIfClassroom(selectedBatch); goToOnlineCheckout(selectedBatch); } }} className={`group w-full sm:w-auto rounded-lg px-8 py-3 text-sm font-bold text-white shadow-lg transition flex items-center justify-center gap-2 ${enrollBg}`}>
                <span>Enroll Now</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
              {nextBatch && selectedBatch?.id === nextBatch.id && (
                <span className="text-xs font-semibold text-orange-600">
                  Starts in {daysBetween(todayIso, nextBatch.startDate)} days
                </span>
              )}
              <span className="text-sm text-koenig-muted">
                100% Happiness Guarantee &middot; Free Rescheduling &middot; Secure Payment
              </span>
            </div>
              );
            })()}
          </div>
        )}

          </div>
          )}
        </div>

      </div>
    </section>

      {/* ── Public / 1-on-1 details modal ── */}
      {detailInfoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(9,49,72,0.55)" }}
          onClick={() => setDetailInfoModal(null)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDetailInfoModal(null)}
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-koenig-light text-koenig-muted hover:bg-koenig-border transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${detailInfoModal === "one-on-one" ? "bg-koenig-navy/10" : "bg-koenig-blue/10"}`}>
                {detailInfoModal === "one-on-one" ? (
                  <svg className="h-5 w-5 text-koenig-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-koenig-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                )}
              </div>
              <div>
                <div className="text-sm font-bold text-koenig-dark">
                  {detailInfoModal === "one-on-one" ? "1-on-1 Training" : "Public Batch"} — What&apos;s Included
                </div>
                <div className="text-[11px] text-koenig-muted">
                  {detailInfoModal === "one-on-one"
                    ? "Private instructor · Any date · Flexible hours · Personalised curriculum"
                    : "Live online & classroom · Scheduled dates · GTR assured · MCT-led"}
                </div>
              </div>
            </div>
            <ul className="space-y-2.5">
              {(detailInfoModal === "one-on-one"
                ? [
                    { text: "Live Training (Duration : 32 Hours)", bold: true },
                    { text: "Per Participant", bold: false },
                    { text: null, langs: true },
                  ]
                : [
                    { text: "Live Training (Duration : 32 Hours)", bold: true },
                    { text: "Per Participant", bold: false },
                    { text: null, langs: true },
                    { text: "Guaranteed-to-Run (GTR)", bold: false },
                  ]
              ).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${detailInfoModal === "one-on-one" ? "bg-koenig-navy" : "bg-koenig-blue"}`} />
                  {item.langs ? (
                    <span className="text-sm text-koenig-dark leading-snug">
                      We can also offer this course in{" "}
                      {["Arabic", "Japanese", "Polish", "Spanish"].map((lang, j, arr) => (
                        <span key={lang}>
                          <span className="font-semibold text-koenig-blue">{lang}</span>
                          {j < arr.length - 1 ? (j === arr.length - 2 ? ", and " : ", ") : "."}
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span className={`text-sm leading-snug ${item.bold ? "font-semibold text-koenig-dark" : "text-koenig-dark"}`}>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── Koenig Learning Stack modal ── */}
      {stackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(9,49,72,0.55)" }} onClick={() => setStackModalOpen(false)}>
          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-koenig-navy to-koenig-blue px-6 py-4">
              <h2 className="text-base font-bold text-white">Koenig Learning Stack</h2>
              <button onClick={() => setStackModalOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {/* Content */}
            <div className="overflow-y-auto p-5 flex flex-col gap-3">
              {[
                {
                  icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
                  title: "Free Pre-requisite Training",
                  desc: "Join a free session to assess your readiness for the course. This session will help you understand the course structure and evaluate your current knowledge level to start with confidence.",
                },
                {
                  icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5" /></svg>,
                  title: "Free Assessments (Qubits)",
                  desc: "Take assessments to measure your progress clearly. Koenig's Qubits assessments identify your strengths and areas for improvement, helping you focus effectively on your learning goals.",
                },
                {
                  icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>,
                  title: "Free Class Recordings",
                  desc: "Get access to class recordings anytime. These recordings let you revisit key concepts and ensure you never miss important details, supporting your learning even after class ends.",
                },
                {
                  icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4" /></svg>,
                  title: "Free Lab Extensions",
                  desc: "Extend your lab time at no extra cost. With free lab extensions, you get additional practice to sharpen your skills, ensuring thorough understanding and mastery of practical tasks.",
                },
                {
                  icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
                  title: "Free Revision Classes",
                  desc: "Join our free revision classes to reinforce your learning. These classes revisit important topics, clarify doubts, and help solidify your understanding for better training outcomes.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-koenig-blue/20 bg-koenig-blue/5 p-4 text-center">
                  <div className="mb-2 flex items-center justify-center gap-2 text-koenig-blue">
                    {icon}
                    <span className="text-sm font-bold">{title}</span>
                  </div>
                  <p className="text-xs text-koenig-gray leading-relaxed">{desc}</p>
                </div>
              ))}
              <p className="text-center text-[11px] text-koenig-blue underline underline-offset-2">Inclusions in Koenig&apos;s Learning Stack may vary as per policies of OEMs</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Flexi inclusions modal ── */}
      {flexiModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(9,49,72,0.55)" }}
          onClick={() => setFlexiModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setFlexiModalOpen(false)}
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-koenig-light text-koenig-muted hover:bg-koenig-border transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            {/* Header */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-koenig-accent/10">
                <svg className="h-5 w-5 text-koenig-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-koenig-dark">Flexi (Self-Paced) — What&apos;s Included</div>
                <div className="text-[11px] text-koenig-muted">Everything you get with this course</div>
              </div>
            </div>
            {/* Bullet list */}
            <ul className="space-y-2.5">
              {[
                "You will get access to Flexi within 30 minutes.",
                "Access to Microsoft content via Microsoft Learn.",
                "Access to hands-on labs (Optional).",
                "Enjoy offline learning on your mobile.",
                "6 Hrs free consultation with MCT.",
                "6 months video access (extendable on request).",
                "Access to exam prep software (Qubits).",
                "Certificate of Completion.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-koenig-accent" />
                  <span className="text-sm text-koenig-dark leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── Floating tab row: portalled INTO #course-sticky-nav so it's always flush below the nav items ── */}
      {tabsFloating && typeof document !== "undefined" && (() => {
        const navEl = document.getElementById("course-sticky-nav");
        if (!navEl) return null;
        return createPortal(
          <div className="lg:hidden border-t border-koenig-blue/10 bg-white px-3 py-2">
            <div className="flex gap-1.5">
              <button
                onClick={() => setPricingTab("one-on-one")}
                className={`flex-1 rounded-xl border py-2 transition-all flex items-center justify-center gap-1.5 ${pricingTab === "one-on-one" ? "bg-koenig-blue border-koenig-blue text-white shadow-sm" : "border-koenig-blue/30 text-koenig-blue bg-white"}`}
              >
                {pricingTab === "one-on-one"
                  ? <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="white"/><polyline points="6 12 10 16 18 8" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4"/><polyline points="6 12 10 16 18 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3"/></svg>}
                <span className="text-[11px] font-extrabold">1-on-1</span>
              </button>
              <button
                onClick={() => setPricingTab("public")}
                className={`flex-1 rounded-xl border py-2 transition-all flex items-center justify-center gap-1.5 ${pricingTab === "public" ? "bg-koenig-blue border-koenig-blue text-white shadow-sm" : "border-koenig-blue/30 text-koenig-blue bg-white"}`}
              >
                {pricingTab === "public"
                  ? <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="white"/><polyline points="6 12 10 16 18 8" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4"/><polyline points="6 12 10 16 18 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3"/></svg>}
                <span className="text-[11px] font-extrabold">Public</span>
              </button>
              <button
                onClick={() => setPricingTab("self-paced")}
                className={`flex-1 rounded-xl border py-2 transition-all flex items-center justify-center gap-1.5 ${pricingTab === "self-paced" ? "bg-koenig-blue border-koenig-blue text-white shadow-sm" : "border-koenig-blue/30 text-koenig-blue bg-white"}`}
              >
                {pricingTab === "self-paced"
                  ? <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="white"/><polyline points="6 12 10 16 18 8" fill="none" stroke="#0694D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4"/><polyline points="6 12 10 16 18 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3"/></svg>}
                <span className="text-[11px] font-extrabold">Flexi</span>
              </button>
            </div>
          </div>,
          navEl
        );
      })()}

      {/* Classroom Training booking popup — only ever opened for Classroom-format batches */}
      <ClassroomBookingModal
        open={!!bookingBatch}
        onClose={() => setBookingBatch(null)}
        courseTitle={courseTitle}
        batch={bookingBatch ? {
          startDate: bookingBatch.startDate,
          endDate: bookingBatch.endDate,
          time: bookingBatch.time,
          location: bookingBatch.location,
          price: bookingBatch.price,
          currency: bookingBatch.currency,
        } : null}
      />
    </>
  );
}

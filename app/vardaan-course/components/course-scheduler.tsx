"use client";

import { useState, useMemo, useEffect, useRef } from "react";

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
/*  Real AZ-104 Schedule Data                                          */
/* ------------------------------------------------------------------ */

let _id = 0;
function mkOnline(start: string, end: string, mode: string, time: string, hrs: number, weekend: boolean, days: string[]): Batch {
  return { id: ++_id, title: `AZ-104 GTR Online`, startDate: start, endDate: end, format: "Online", mode, seats: Math.floor(Math.random() * 10) + 5, totalSeats: 15, price: COURSE_PRICING.online.public, currency: "INR", location: "Virtual", gtr: true, isWeekend: weekend, days, time, hoursPerDay: hrs };
}
function mkClass(start: string, end: string, city: string, price: number, currency: string, days: string[]): Batch {
  return { id: ++_id, title: `AZ-104 Classroom – ${city}`, startDate: start, endDate: end, format: "Classroom", mode: "8 Hrs/Day", seats: Math.floor(Math.random() * 8) + 4, totalSeats: 12, price, currency, location: city, gtr: true, isWeekend: false, days, time: "9:00 AM – 5:00 PM", hoursPerDay: 8 };
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
    return new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
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
  if (batch.isWeekend) return "bg-purple-500";
  if (batch.format === "1-on-1") return "bg-purple-500";
  if (batch.format === "Classroom") return "bg-amber-500";
  return "bg-koenig-blue";
}

function batchDotColor(batch: Batch): string {
  if (batch.isWeekend) return "bg-purple-500";
  if (batch.format === "1-on-1") return "bg-purple-500";
  if (batch.format === "Classroom") return "bg-amber-500";
  return "bg-koenig-blue";
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

function seatStatus(batch: Batch): { label: string; color: string } {
  const filled = batch.totalSeats - batch.seats;
  const pct = (filled / batch.totalSeats) * 100;
  if (pct >= 50) return { label: "Filling Fast", color: "text-orange-600" };
  if (pct > 0) return { label: "Available", color: "text-green-600" };
  return { label: "Open", color: "text-green-600" };
}

function seatBarWidth(batch: Batch): string {
  const filled = batch.totalSeats - batch.seats;
  return `${Math.round((filled / batch.totalSeats) * 100)}%`;
}

function seatBarColor(batch: Batch): string {
  const filled = batch.totalSeats - batch.seats;
  const pct = (filled / batch.totalSeats) * 100;
  if (pct >= 50) return "bg-gradient-to-r from-orange-400 to-orange-500";
  return "bg-gradient-to-r from-green-400 to-green-500";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type CourseSchedulerProps = {
  initialBatches?: Batch[];
};

export function CourseScheduler({ initialBatches }: CourseSchedulerProps = {}) {
  const activeBatches = initialBatches && initialBatches.length > 0 ? initialBatches : batches;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = toLocalIso(today);

  const [activeView, setActiveView] = useState<"calendar" | "list" | "compare">("calendar");
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(
    new Set(["Online", "Classroom", "1-on-1"])
  );
  const [scheduleType, setScheduleType] = useState<"weekday" | "weekend" | "all">("all");
  const [currentWeekStart, setCurrentWeekStart] = useState(() => getMonday(today));
  const [timezone, setTimezone] = useState("IST");
  const [compareBatches, setCompareBatches] = useState<Set<number>>(new Set());
  const [pricingTab, setPricingTab] = useState<"public" | "one-on-one" | "self-paced">("public");
  const [tzOpen, setTzOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerMonth, setPickerMonth] = useState(today.getMonth());
  const [pickerYear, setPickerYear] = useState(today.getFullYear());
  const [expanded, setExpanded] = useState(false);
  const [gtrOnly, setGtrOnly] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  /* Next available batch */
  const nextBatch = useMemo(() => getNextBatch(batches, todayIso), [todayIso]);

  /* Auto-select next available batch on mount */
  useEffect(() => {
    if (nextBatch) {
      setSelectedBatch(nextBatch);
      setCurrentWeekStart(getMonday(new Date(nextBatch.startDate + "T00:00:00")));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    return activeBatches.filter((b) => {
      if (!activeFormats.has(b.format)) return false;
      if (scheduleType === "weekday" && b.isWeekend) return false;
      if (scheduleType === "weekend" && !b.isWeekend) return false;
      if (gtrOnly && !b.gtr) return false;
      return true;
    });
  }, [activeFormats, scheduleType, gtrOnly]);

  /* Toggle format */
  function toggleFormat(fmt: string) {
    setActiveFormats((prev) => {
      const next = new Set(prev);
      if (next.has(fmt)) {
        next.delete(fmt);
      } else {
        next.add(fmt);
      }
      return next;
    });
  }

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
    <section id="schedule" className="px-6 py-14">
      <div className="mx-auto max-w-7xl">
        {/* ---- Header ---- */}
        <div className="mb-2 text-center">
          <h2 className="text-2xl font-bold text-koenig-dark">
            Schedule Your Training
          </h2>
          <p className="mt-2 text-sm text-koenig-muted">
            Pick your ideal date. All public batches guaranteed.
          </p>
        </div>

        {/* ---- Filter Bar ---- */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-koenig-border bg-koenig-light p-4">
          {/* Format Toggles */}
          <div className="flex items-center gap-2">
            <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-koenig-muted">
              Format:
            </span>
            {["Online", "Classroom", "1-on-1"].map((fmt) => (
              <button
                key={fmt}
                onClick={() => toggleFormat(fmt)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  activeFormats.has(fmt)
                    ? "bg-koenig-blue text-white shadow-sm"
                    : "bg-white text-koenig-gray border border-koenig-border hover:border-koenig-blue hover:text-koenig-blue"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          {/* GTR Toggle */}
          <button
            onClick={() => setGtrOnly(!gtrOnly)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              gtrOnly
                ? "bg-green-500 text-white shadow-sm"
                : "bg-white text-koenig-gray border border-koenig-border hover:border-green-500 hover:text-green-600"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${gtrOnly ? "bg-white" : "bg-green-500"}`} />
            GTR Only
          </button>

          {/* Schedule Type */}
          <div className="flex items-center gap-2">
            <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-koenig-muted">
              Type:
            </span>
            {(["all", "weekday", "weekend"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setScheduleType(t)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${
                  scheduleType === t
                    ? "bg-koenig-dark text-white"
                    : "bg-white text-koenig-gray border border-koenig-border hover:border-koenig-dark hover:text-koenig-dark"
                }`}
              >
                {t === "all" ? "All" : t === "weekday" ? "Weekday" : "Weekend"}
              </button>
            ))}
          </div>

          {/* Timezone */}
          <div className="relative">
            <button
              onClick={() => setTzOpen(!tzOpen)}
              className="flex items-center gap-2 rounded-lg border border-koenig-border bg-white px-4 py-2 text-xs font-medium text-koenig-dark"
            >
              <svg
                className="h-4 w-4 text-koenig-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                {timezone} ({TIMEZONE_OFFSETS[timezone]})
              </span>
              <svg
                className="h-3 w-3 text-koenig-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {tzOpen && (
              <div className="absolute right-0 top-full z-10 mt-1 w-44 rounded-lg border border-koenig-border bg-white py-1 shadow-lg">
                {Object.entries(TIMEZONE_OFFSETS).map(([tz, offset]) => (
                  <button
                    key={tz}
                    onClick={() => {
                      setTimezone(tz);
                      setTzOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-xs transition hover:bg-koenig-light ${
                      timezone === tz
                        ? "font-semibold text-koenig-blue"
                        : "text-koenig-dark"
                    }`}
                  >
                    {tz} ({offset})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ---- View Toggle ---- */}
        <div className="mt-6 flex items-center justify-center gap-1 rounded-full bg-koenig-light p-1 mx-auto w-fit">
          {(["calendar", "list", "compare"] as const).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`rounded-full px-6 py-2 text-xs font-semibold transition ${
                activeView === view
                  ? "bg-koenig-blue text-white shadow-sm"
                  : "text-koenig-muted hover:text-koenig-dark"
              }`}
            >
              {view === "calendar" && (
                <svg
                  className="mr-1.5 inline h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
              {view === "list" && (
                <svg
                  className="mr-1.5 inline h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
              {view === "compare" && (
                <svg
                  className="mr-1.5 inline h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7"
                  />
                </svg>
              )}
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {/* ================================================================ */}
        {/*  CALENDAR VIEW                                                   */}
        {/* ================================================================ */}
        {activeView === "calendar" && (
          <div className="mt-6 overflow-hidden rounded-xl border border-koenig-border bg-white shadow-sm">
            {/* Week/Month Navigation */}
            <div className="flex items-center justify-between border-b border-koenig-border bg-koenig-light px-6 py-3">
              <button
                onClick={prevPeriod}
                className="flex items-center gap-1 text-xs font-medium text-koenig-muted hover:text-koenig-blue transition"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                {expanded ? "" : formatDate(toLocalIso(prevWeekDate))}
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
                {expanded ? "" : formatDate(toLocalIso(nextWeekDate))}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 border-b border-koenig-border px-6 py-2.5 bg-white">
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
              <div className="grid grid-cols-7 divide-x divide-koenig-border">
                {weekDates.map((wd) => {
                  const dayBatches = filtered.filter((b) => batchFallsOnDate(b, wd.iso));
                  const isSelected = selectedBatch !== null && batchFallsOnDate(selectedBatch, wd.iso);
                  const isDayToday = isTodayCheck(wd.iso, todayIso);
                  const items = groupBatchesForDay(dayBatches, wd.iso);

                  return (
                    <div
                      key={wd.iso}
                      className={`min-h-[140px] p-3 transition ${
                        isSelected ? "bg-koenig-blue/5 ring-2 ring-inset ring-koenig-blue/20" : "hover:bg-koenig-light/50"
                      }`}
                    >
                      <div className="mb-2 text-center">
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-koenig-muted">{wd.day}</div>
                        <div
                          className={`mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-bold ${
                            isDayToday
                              ? "bg-red-500 text-white"
                              : isSelected
                              ? "bg-koenig-blue text-white"
                              : "text-koenig-dark"
                          }`}
                        >
                          {wd.date}
                        </div>
                        {isDayToday && <div className="text-[10px] font-bold text-red-500 mt-0.5">Today</div>}
                      </div>
                      <div className="space-y-1">
                        {items.map((item, idx) => {
                          if (item.type === "online") {
                            const { batch, isStart } = item;
                            const isNext = nextBatch?.id === batch.id;
                            if (!isStart) {
                              // Continuation bar — wider with subtle label
                              return (
                                <button
                                  key={batch.id}
                                  onClick={() => setSelectedBatch(batch)}
                                  className={`w-full h-3 rounded ${batchColor(batch)} opacity-40 transition hover:opacity-70 flex items-center justify-center ${
                                    selectedBatch?.id === batch.id ? "opacity-80 ring-1 ring-white" : ""
                                  }`}
                                  title={`${batch.title} (cont.)`}
                                >
                                  <span className="text-[7px] text-white/80 font-medium tracking-wide">&middot;&middot;&middot;</span>
                                </button>
                              );
                            }
                            return (
                              <button
                                key={batch.id}
                                onClick={() => setSelectedBatch(batch)}
                                className={`relative w-full cursor-pointer rounded-md px-2 py-2 text-left text-[11px] font-semibold leading-tight transition hover:opacity-80 ${batchColor(batch)} text-white ${
                                  selectedBatch?.id === batch.id ? "ring-2 ring-white ring-offset-1" : ""
                                } ${isNext ? "ring-2 ring-yellow-400 animate-pulse" : ""}`}
                              >
                                {batch.gtr && (
                                  <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-green-300" title="GTR" />
                                )}
                                {isNext && (
                                  <span className="absolute -top-1.5 -right-1.5 rounded-full bg-yellow-400 px-1 py-0.5 text-[8px] font-bold text-koenig-dark leading-none z-10">
                                    Next
                                  </span>
                                )}
                                <div className="truncate pr-3">{batch.mode}</div>
                                <div className="mt-0.5 text-[10px] opacity-80">
                                  {batch.time.split(" – ")[0] || batch.time.split(" - ")[0]}
                                </div>
                              </button>
                            );
                          }
                          // Classroom group
                          const { batches: grpBatches, isStart, cities } = item;
                          if (!isStart) {
                            return (
                              <button
                                key={`cg-${idx}`}
                                onClick={() => setSelectedBatch(grpBatches[0])}
                                className={`w-full h-3 rounded bg-amber-500 opacity-40 transition hover:opacity-70 flex items-center justify-center ${
                                  selectedBatch && grpBatches.some(b => b.id === selectedBatch.id) ? "opacity-80 ring-1 ring-white" : ""
                                }`}
                                title={`ILT · ${cities.length} cities (cont.)`}
                              >
                                <span className="text-[7px] text-white/80 font-medium tracking-wide">&middot;&middot;&middot;</span>
                              </button>
                            );
                          }
                          return (
                            <button
                              key={`cg-${idx}`}
                              onClick={() => {
                                // Select current city batch if already on this group, else first
                                const current = selectedBatch && grpBatches.find(b => b.id === selectedBatch.id);
                                setSelectedBatch(current || grpBatches[0]);
                              }}
                              className={`relative w-full cursor-pointer rounded-md bg-amber-500 px-2 py-2 text-left text-[11px] font-semibold leading-tight text-white transition hover:opacity-80 ${
                                selectedBatch && grpBatches.some(b => b.id === selectedBatch.id) ? "ring-2 ring-white ring-offset-1" : ""
                              }`}
                            >
                              {grpBatches[0].gtr && (
                                <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-green-300" title="GTR" />
                              )}
                              <div className="truncate pr-3">ILT &middot; {cities.length} cities</div>
                              <div className="mt-0.5 text-[10px] opacity-80">9:00 AM &middot; 8hr</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* ---- 4-WEEK ROLLING VIEW ---- */
              <div>
                {/* Day headers */}
                <div className="grid grid-cols-7 divide-x divide-koenig-border border-b border-koenig-border bg-koenig-light/50">
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                    <div key={d} className="py-2 text-center text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">{d}</div>
                  ))}
                </div>
                {/* 4 week rows */}
                {fourWeeks.map((weekMon) => {
                  const wDates = getWeekDates(weekMon);
                  const isThisWeek = isCurrentWeek(weekMon);
                  return (
                    <div key={weekMon.toISOString()} className={`grid grid-cols-7 divide-x divide-koenig-border border-b border-koenig-border ${isThisWeek ? "bg-koenig-blue/5" : ""}`}>
                      {wDates.map((wd) => {
                        const dayBatches = filtered.filter((b) => batchFallsOnDate(b, wd.iso));
                        const isDayToday = isTodayCheck(wd.iso, todayIso);
                        const items = groupBatchesForDay(dayBatches, wd.iso);
                        return (
                          <div key={wd.iso} className="min-h-[80px] p-1.5 transition hover:bg-koenig-light/50">
                            <div className="text-center mb-1">
                              <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                                isDayToday ? "bg-red-500 text-white" : "text-koenig-dark"
                              }`}>
                                {wd.date}
                              </span>
                            </div>
                            <div className="space-y-0.5">
                              {items.map((item, idx) => {
                                if (item.type === "online") {
                                  if (!item.isStart) {
                                    return <div key={item.batch.id} className={`h-2 rounded ${batchColor(item.batch)} opacity-35`} />;
                                  }
                                  return (
                                    <button
                                      key={item.batch.id}
                                      onClick={() => setSelectedBatch(item.batch)}
                                      className={`w-full rounded px-1 py-0.5 text-left text-[9px] font-semibold truncate ${batchColor(item.batch)} text-white transition hover:opacity-80`}
                                    >
                                      {item.batch.mode.replace(" Hrs/Day", "h").replace(" (AM)", " AM").replace(" (PM)", " PM")}
                                    </button>
                                  );
                                }
                                // Classroom group
                                if (!item.isStart) {
                                  return <div key={`cg-${idx}`} className="h-2 rounded bg-amber-500 opacity-35" />;
                                }
                                return (
                                  <button
                                    key={`cg-${idx}`}
                                    onClick={() => setSelectedBatch(item.batches[0])}
                                    className="w-full rounded bg-amber-500 px-1 py-0.5 text-left text-[9px] font-semibold truncate text-white transition hover:opacity-80"
                                  >
                                    ILT &middot; {item.cities.length}
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
            )}

            {/* Upcoming Weeks Indicator */}
            {!expanded && upcomingBatches.length > 0 && (
              <div className="border-t border-koenig-border bg-koenig-light px-6 py-2.5">
                <div className="flex items-center gap-3 text-[11px] text-koenig-muted">
                  <span className="font-semibold">Upcoming:</span>
                  {upcomingBatches.map((b, i) => (
                    <span key={b.id} className="flex items-center gap-1.5">
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
        )}

        {/* ================================================================ */}
        {/*  LIST VIEW                                                       */}
        {/* ================================================================ */}
        {activeView === "list" && (
          <div className="mt-6 overflow-hidden rounded-xl border border-koenig-border bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-koenig-border bg-koenig-light">
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">
                    Date
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">
                    Format
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">
                    Mode
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">
                    Location
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">
                    Time / TZ
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">
                    Seats
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">
                    Price
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">
                    GTR
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((batch) => {
                  const status = seatStatus(batch);
                  return (
                    <tr
                      key={batch.id}
                      onClick={() => setSelectedBatch(batch)}
                      className={`cursor-pointer border-b border-koenig-border transition ${
                        selectedBatch?.id === batch.id
                          ? "bg-koenig-blue/5"
                          : "hover:bg-koenig-light/50"
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="text-sm font-medium text-koenig-dark">
                          {formatDateRange(batch.startDate, batch.endDate)}
                        </div>
                        <div className="text-xs text-koenig-muted">
                          {batch.days.join(", ")}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white ${batchColor(
                            batch
                          )}`}
                        >
                          {batch.format}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-koenig-dark">{batch.mode}</td>
                      <td className="px-5 py-3.5 text-xs text-koenig-dark">{batch.location}</td>
                      <td className="px-5 py-3.5">
                        <div className="text-xs text-koenig-dark">{batch.time}</div>
                        <div className="text-[10px] text-koenig-muted">{timezone} &middot; {batch.hoursPerDay}hr/day</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-medium ${status.color}`}>
                          {batch.seats} left
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm font-bold text-koenig-dark">
                        {formatCurrency(batch.price, batch.currency)}
                      </td>
                      <td className="px-5 py-3.5">
                        {batch.gtr && (
                          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-semibold text-green-700">
                            GTR
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-sm text-koenig-muted">
                      No batches match your filters. Try adjusting the format or schedule type.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ================================================================ */}
        {/*  COMPARE VIEW                                                    */}
        {/* ================================================================ */}
        {activeView === "compare" && (
          <div className="mt-6">
            {/* Selection cards */}
            <div className="mb-4 text-xs text-koenig-muted">
              Select up to 3 batches to compare ({compareBatches.size}/3 selected)
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((batch) => {
                const checked = compareBatches.has(batch.id);
                const disabled = !checked && compareBatches.size >= 3;
                return (
                  <button
                    key={batch.id}
                    onClick={() => toggleCompare(batch.id)}
                    disabled={disabled}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                      checked
                        ? "border-koenig-blue bg-koenig-blue/5 ring-2 ring-koenig-blue/20"
                        : disabled
                        ? "border-koenig-border bg-koenig-light/50 opacity-50 cursor-not-allowed"
                        : "border-koenig-border bg-white hover:border-koenig-blue"
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition ${
                        checked
                          ? "border-koenig-blue bg-koenig-blue"
                          : "border-koenig-border bg-white"
                      }`}
                    >
                      {checked && (
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-koenig-dark">
                        {formatDateRange(batch.startDate, batch.endDate)}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${batchColor(
                            batch
                          )}`}
                        >
                          {batch.format}
                        </span>
                        {batch.gtr && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                            GTR
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-koenig-muted">
                        {formatCurrency(batch.price, batch.currency)} &middot; {batch.seats} seats left
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Side-by-side comparison */}
            {compareBatches.size > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-bold text-koenig-dark">Comparison</h3>
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${compareBatches.size}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from(compareBatches).map((id) => {
                    const batch = activeBatches.find((b) => b.id === id)!;
                    const status = seatStatus(batch);
                    return (
                      <div
                        key={batch.id}
                        className="rounded-xl border-2 border-koenig-blue bg-white p-6 shadow-sm"
                      >
                        <div className="mb-3 text-sm font-bold text-koenig-dark">
                          {formatDateRange(batch.startDate, batch.endDate)}
                        </div>
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white ${batchColor(
                              batch
                            )}`}
                          >
                            {batch.format}
                          </span>
                          {batch.gtr && (
                            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-semibold text-green-700">
                              GTR
                            </span>
                          )}
                          {batch.isWeekend && (
                            <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-semibold text-purple-700">
                              Weekend
                            </span>
                          )}
                        </div>

                        <div className="space-y-2.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-koenig-muted">Schedule</span>
                            <span className="font-medium text-koenig-dark">
                              {batch.days.join(", ")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-koenig-muted">Time</span>
                            <span className="font-medium text-koenig-dark">{batch.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-koenig-muted">Location</span>
                            <span className="font-medium text-koenig-dark">{batch.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-koenig-muted">Seats</span>
                            <span className={`font-medium ${status.color}`}>
                              {batch.seats} of {batch.totalSeats} left
                            </span>
                          </div>
                          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-koenig-border">
                            <div
                              className={`absolute left-0 top-0 h-full rounded-full ${seatBarColor(batch)}`}
                              style={{ width: seatBarWidth(batch) }}
                            />
                          </div>
                          <div className="flex justify-between">
                            <span className="text-koenig-muted">Price</span>
                            <span className="text-base font-bold text-koenig-dark">
                              {formatCurrency(batch.price, batch.currency)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-koenig-muted">GTR</span>
                            <span className="font-medium text-koenig-dark">
                              {batch.gtr ? "Yes" : "No"}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedBatch(batch);
                            setActiveView("calendar");
                          }}
                          className="mt-4 w-full rounded-lg bg-koenig-blue py-2.5 text-xs font-bold text-white transition hover:bg-koenig-accent"
                        >
                          Select This Batch
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/*  SELECTED BATCH DETAIL CARD (calendar & list views)             */}
        {/* ================================================================ */}
        {activeView !== "compare" && selectedBatch && (
          <div className="mt-6 rounded-xl border-2 border-koenig-blue bg-white p-8 shadow-lg">
            <div className="flex flex-wrap items-start justify-between gap-6">
              {/* Batch Info */}
              <div className="flex-1 min-w-[280px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-koenig-dark">
                      {formatDateRange(selectedBatch.startDate, selectedBatch.endDate)}
                    </h3>
                    <p className="text-sm text-koenig-muted">
                      {selectedBatch.days.join(", ")} &middot; {selectedBatch.days.length} days
                    </p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${batchColor(
                      selectedBatch
                    )}`}
                  >
                    {selectedBatch.format}
                  </span>
                  {selectedBatch.gtr && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Guaranteed-to-Run
                    </span>
                  )}
                  {(() => {
                    const s = seatStatus(selectedBatch);
                    if (s.label === "Filling Fast") {
                      return (
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                          Filling Fast
                        </span>
                      );
                    }
                    return null;
                  })()}
                  {selectedBatch.isWeekend && (
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                      Weekend Batch
                    </span>
                  )}
                </div>

                {/* Location Picker — for classroom batches with multiple cities */}
                {selectedBatch.format === "Classroom" && (() => {
                  const siblings = activeBatches.filter(
                    b => b.format === "Classroom" && b.startDate === selectedBatch.startDate && b.endDate === selectedBatch.endDate
                  );
                  if (siblings.length <= 1) return null;
                  return (
                    <div className="mb-4">
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-koenig-muted mb-2">
                        Select Location ({siblings.length} cities available)
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {siblings.map(sb => (
                          <button
                            key={sb.id}
                            onClick={() => setSelectedBatch(sb)}
                            className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                              selectedBatch.id === sb.id
                                ? "bg-amber-500 text-white shadow-sm"
                                : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                            }`}
                          >
                            {sb.location}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Schedule Details */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="rounded-lg bg-koenig-light p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">
                      Schedule
                    </div>
                    <div className="mt-1 text-sm font-medium text-koenig-dark">
                      {selectedBatch.days.join("-")}, {selectedBatch.time}{" "}
                      {timezone}
                    </div>
                    <div className="text-xs text-koenig-muted">
                      {selectedBatch.hoursPerDay} hrs/day
                    </div>
                  </div>
                  <div className="rounded-lg bg-koenig-light p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-koenig-muted">
                      Seats Remaining
                    </div>
                    <div className={`mt-1 text-sm font-bold ${seatStatus(selectedBatch).color}`}>
                      {selectedBatch.seats} seats left
                    </div>
                    <div className="mt-2 relative h-2 w-full overflow-hidden rounded-full bg-koenig-border">
                      <div
                        className={`absolute left-0 top-0 h-full rounded-full ${seatBarColor(
                          selectedBatch
                        )}`}
                        style={{ width: seatBarWidth(selectedBatch) }}
                      />
                    </div>
                    <div className="mt-1 text-[10px] text-koenig-muted">
                      {selectedBatch.totalSeats - selectedBatch.seats} of{" "}
                      {selectedBatch.totalSeats} seats filled
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="flex gap-3 flex-shrink-0">
                {/* Public */}
                <button
                  onClick={() => setPricingTab("public")}
                  className={`w-[160px] rounded-xl p-5 text-center transition ${
                    pricingTab === "public"
                      ? "border-2 border-koenig-blue bg-koenig-blue/5 ring-2 ring-koenig-blue/20"
                      : "border border-koenig-border bg-white hover:border-koenig-blue"
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest text-koenig-blue mb-2">
                    Public Batch
                  </div>
                  <div className="text-2xl font-bold text-koenig-dark">
                    {formatCurrency(selectedBatch.price, selectedBatch.currency)}
                  </div>
                  <div className="mt-1 text-xs text-koenig-muted">per person</div>
                  {pricingTab === "public" && (
                    <div className="mt-1 rounded-full bg-koenig-blue/10 px-2 py-0.5 text-[10px] font-semibold text-koenig-blue inline-block">
                      Most Popular
                    </div>
                  )}
                </button>
                {/* 1-on-1 */}
                <button
                  onClick={() => setPricingTab("one-on-one")}
                  className={`w-[160px] rounded-xl p-5 text-center transition ${
                    pricingTab === "one-on-one"
                      ? "border-2 border-purple-500 bg-purple-50 ring-2 ring-purple-200"
                      : "border border-koenig-border bg-white hover:border-purple-300"
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest text-purple-600 mb-2">
                    1-on-1
                  </div>
                  <div className="text-2xl font-bold text-koenig-dark">{formatCurrency(COURSE_PRICING.online.oneOnOne, "INR")}</div>
                  <div className="mt-1 text-xs text-koenig-muted">per person</div>
                  {pricingTab === "one-on-one" && (
                    <div className="mt-1 rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-600 inline-block">
                      Fastest
                    </div>
                  )}
                </button>
                {/* Self-Paced */}
                <button
                  onClick={() => setPricingTab("self-paced")}
                  className={`w-[160px] rounded-xl p-5 text-center transition ${
                    pricingTab === "self-paced"
                      ? "border-2 border-green-500 bg-green-50 ring-2 ring-green-200"
                      : "border border-koenig-border bg-white hover:border-green-300"
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest text-green-600 mb-2">
                    Self-Paced
                  </div>
                  <div className="text-2xl font-bold text-koenig-dark">{formatCurrency(COURSE_PRICING.online.flexi, "INR")}</div>
                  <div className="mt-1 text-xs text-koenig-muted">per person</div>
                  {pricingTab === "self-paced" && (
                    <div className="mt-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-600 inline-block">
                      Best Value
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Enroll CTA */}
            <div className="mt-6 flex items-center gap-4 border-t border-koenig-border pt-6">
              <button className="rounded-lg bg-koenig-blue px-10 py-3.5 text-sm font-bold text-white shadow-lg shadow-koenig-blue/30 transition hover:bg-koenig-accent">
                ENROLL NOW &mdash; {formatCurrency(selectedPrice, selectedCurrency)}
              </button>
              {nextBatch && selectedBatch?.id === nextBatch.id && (
                <span className="text-xs font-semibold text-orange-600">
                  Starts in {daysBetween(todayIso, nextBatch.startDate)} days
                </span>
              )}
              <span className="text-xs text-koenig-muted">
                100% Happiness Guarantee &middot; Free Rescheduling &middot; Secure Payment
              </span>
            </div>
          </div>
        )}

        {/* ---- Always Available Row ---- */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {/* 1-on-1 Card */}
          <div className="flex items-center justify-between rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-white p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-koenig-dark">1-on-1 Training</div>
                <div className="text-xs text-koenig-muted">
                  Start any date &mdash; dedicated instructor
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xl font-bold text-koenig-dark">{formatCurrency(COURSE_PRICING.online.oneOnOne, "INR")}</div>
                <div className="text-[10px] text-koenig-muted">per person</div>
              </div>
              <button className="rounded-lg bg-purple-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-purple-700">
                Get Quote
              </button>
            </div>
          </div>

          {/* Self-Paced Card */}
          <div className="flex items-center justify-between rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-white p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-koenig-dark">Self-Paced</div>
                <div className="text-xs text-koenig-muted">
                  Start now &mdash; recorded HD sessions
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xl font-bold text-koenig-dark">{formatCurrency(COURSE_PRICING.online.flexi, "INR")}</div>
                <div className="text-[10px] text-koenig-muted">per person</div>
              </div>
              <button className="rounded-lg bg-green-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-green-700">
                Start Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

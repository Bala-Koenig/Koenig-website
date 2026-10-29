"use client";

import { useEffect, useRef, useState } from "react";
import type { Batch } from "./course-scheduler";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ActionBarTab = "public" | "1on1" | "flexi";

/* ------------------------------------------------------------------ */
/*  Shared vote store                                                   */
/* ------------------------------------------------------------------ */
// A given tab can have more than one CourseActionBar mounted at once (a
// desktop copy + a mobile copy, swapped with CSS, not actually unmounted).
// Keeping vote state purely local to each instance let them drift out of
// sync — e.g. toggling dislike off on the visible one left the hidden one's
// in-memory state stale, which could then write the old value back. This
// module-level store + subscriber list keeps every mounted instance for the
// same courseId in lockstep instead.
type Vote = "like" | "dislike" | null;
const voteSubscribers = new Map<string, Set<(v: Vote) => void>>();

function readStoredVote(courseId: string): Vote {
  try {
    const saved = localStorage.getItem(`koenig_vote_${courseId}`);
    return saved === "like" || saved === "dislike" ? saved : null;
  } catch {
    return null;
  }
}

function writeStoredVote(courseId: string, next: Vote) {
  try {
    if (next) localStorage.setItem(`koenig_vote_${courseId}`, next);
    else localStorage.removeItem(`koenig_vote_${courseId}`);
  } catch {
    /* ignore */
  }
  voteSubscribers.get(courseId)?.forEach((fn) => fn(next));
}

function subscribeVote(courseId: string, fn: (v: Vote) => void): () => void {
  if (!voteSubscribers.has(courseId)) voteSubscribers.set(courseId, new Set());
  voteSubscribers.get(courseId)!.add(fn);
  return () => voteSubscribers.get(courseId)?.delete(fn);
}

type CourseActionBarProps = {
  courseId: string;
  courseName: string;
  activeTab: ActionBarTab;
  selectedBatch?: Batch | null;
  oneOnOneDate?: string | null;
  oneOnOnePrice: number;
  flexiPrice: number;
  flexiValidity?: string;
  likeCount?: number;
  className?: string;
};

type DislikeReason = "Dates don't suit me" | "Price is too high" | "Content is unclear" | "Other";
const DISLIKE_REASONS: DislikeReason[] = ["Dates don't suit me", "Price is too high", "Content is unclear", "Other"];

const SHARE_CHANNELS = ["WhatsApp", "LinkedIn", "Email", "Telegram", "X", "Copy link"] as const;
type ShareChannel = (typeof SHARE_CHANNELS)[number];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function hasConsent(): boolean {
  // No cookie-consent banner exists in this codebase yet. Default to
  // "granted" unless a CMP explicitly records a denial under this key, so
  // tracking degrades gracefully once a real consent banner is added.
  try {
    return typeof window !== "undefined" && localStorage.getItem("koenig_cookie_consent") !== "denied";
  } catch {
    return true;
  }
}

function track(event: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || !hasConsent()) return;
  (window as unknown as { dataLayer: unknown[] }).dataLayer = (window as unknown as { dataLayer: unknown[] }).dataLayer || [];
  (window as unknown as { dataLayer: unknown[] }).dataLayer.push({ event, ...params });
}

function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    throw new Error("clipboard API unavailable");
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

function buildUrl(pathname: string, params: Record<string, string>): string {
  const url = new URL(pathname, typeof window !== "undefined" ? window.location.origin : "https://www.koenig-solutions.com");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}

function getDevice(): "mobile" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const IconCopy = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const IconShare = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
);
const IconThumbsUp = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /></svg>
);
const IconThumbsDown = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" /></svg>
);
const CHANNEL_ICON: Record<ShareChannel, React.ReactNode> = {
  WhatsApp: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" /><path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2z" /></svg>,
  LinkedIn: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 11-4-.002 2 2 0 014 .002zM7 8.48H3V21h4zM13.5 8.48h-3.83V21h3.83v-6.3c0-1.66.31-3.27 2.38-3.27 2.03 0 2.06 1.9 2.06 3.37V21H21v-6.9c0-3.57-.77-6.32-4.94-6.32-2 0-3.34 1.1-3.89 2.14h-.05z" /></svg>,
  Email: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
  Telegram: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m22 2-20 7.8 6 2.2m14-10-2.1 17.2-8-6M22 2 10.2 14.2" /></svg>,
  X: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H1.4l8.1-9.3L1 2h7l4.9 6.4zm-1.2 18h1.9L7.3 4H5.3z" /></svg>,
  "Copy link": <IconCopy />,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CourseActionBar({
  courseId,
  courseName,
  activeTab,
  selectedBatch,
  oneOnOneDate,
  oneOnOnePrice,
  flexiPrice,
  flexiValidity = "90 Days",
  likeCount = 0,
  className = "",
}: CourseActionBarProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const shareBtnRef = useRef<HTMLButtonElement>(null);
  const sharePopoverRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [vote, setVote] = useState<"like" | "dislike" | null>(() => readStoredVote(courseId));
  const [dislikeOpen, setDislikeOpen] = useState(false);
  const [reasons, setReasons] = useState<Set<DislikeReason>>(new Set());
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const rateLimitRef = useRef<number[]>([]);

  // Vote persistence, one per visitor per course — shared across every
  // CourseActionBar instance mounted for this courseId (see the module-level
  // store above), so a desktop/mobile pair never drifts out of sync.
  useEffect(() => {
    setVote(readStoredVote(courseId));
    return subscribeVote(courseId, setVote);
  }, [courseId]);

  // Fire actionbar_view once, the first time the bar enters the viewport.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let fired = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          track("actionbar_view", baseEventParams());
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close the share popover on outside click / Escape.
  useEffect(() => {
    if (!shareOpen) return;
    function onDown(e: MouseEvent) {
      if (sharePopoverRef.current?.contains(e.target as Node) || shareBtnRef.current?.contains(e.target as Node)) return;
      setShareOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setShareOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [shareOpen]);

  // Escape closes the dislike modal too.
  useEffect(() => {
    if (!dislikeOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDislikeModal();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dislikeOpen]);

  function baseEventParams() {
    return { course_name: courseName, course_id: courseId, active_tab: activeTab, page_url: typeof window !== "undefined" ? window.location.href : "", device: getDevice() };
  }

  function currentModeParam(): string {
    return activeTab === "public" ? "public" : activeTab === "1on1" ? "1on1" : "flexi";
  }

  function pageUrlWithSelection(utmSource: string): string {
    const params: Record<string, string> = { mode: currentModeParam(), utm_source: utmSource, utm_medium: "actionbar" };
    if (activeTab === "public" && selectedBatch) params.batch = String(selectedBatch.id);
    return buildUrl(window.location.pathname, params);
  }

  function buildSummaryText(): string {
    const url = pageUrlWithSelection("copy");
    if (activeTab === "public") {
      const batch = selectedBatch;
      if (!batch) {
        return `${courseName}, Koenig Solutions\nPublic Batch · schedule coming soon\nLink: ${url}`;
      }
      const location = batch.format === "Online" ? "Online" : batch.location;
      return [
        `${courseName}, Koenig Solutions`,
        `Public Batch · ${formatDate(batch.startDate)} – ${formatDate(batch.endDate)} · ${location} · ${batch.time}`,
        `Price: ${formatMoney(batch.price, batch.currency)} (excl. GST)`,
        `Link: ${url}`,
      ].join("\n");
    }
    if (activeTab === "1on1") {
      const dateLine = oneOnOneDate ? `Date: ${formatDate(oneOnOneDate)}` : "Date: flexible, choose your own";
      return [`${courseName}, Koenig Solutions`, `1-on-1 Training · ${dateLine}`, `Price: ${formatMoney(oneOnOnePrice, "INR")} (excl. GST)`, `Link: ${url}`].join("\n");
    }
    return [`${courseName}, Koenig Solutions`, `Flexi (Self-Paced) · Valid for ${flexiValidity}`, `Price: ${formatMoney(flexiPrice, "INR")} (excl. GST)`, `Link: ${url}`].join("\n");
  }

  async function handleCopy() {
    const ok = await copyText(buildSummaryText());
    if (ok) {
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
      track("copy_click", { ...baseEventParams(), copy_type: "summary" });
    } else {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2500);
    }
  }

  function shareUrlsFor(channel: ShareChannel): { text: string; url: string } {
    const url = pageUrlWithSelection(channel.toLowerCase().replace(" ", "_"));
    const text = `Check out ${courseName} at Koenig Solutions`;
    return { text, url };
  }

  async function handleShareClick() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: courseName, text: `Check out ${courseName} at Koenig Solutions`, url: pageUrlWithSelection("native_share") });
        track("share_click", { ...baseEventParams(), channel: "native" });
        return;
      } catch {
        // user cancelled or share failed — fall through to the popover
      }
    }
    setShareOpen((v) => !v);
  }

  function handleChannelClick(channel: ShareChannel) {
    const { text, url } = shareUrlsFor(channel);
    track("share_click", { ...baseEventParams(), channel });
    if (channel === "Copy link") {
      copyText(url).then((ok) => {
        if (ok) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      });
      setShareOpen(false);
      return;
    }
    const encUrl = encodeURIComponent(url);
    const encText = encodeURIComponent(text);
    const hrefs: Record<Exclude<ShareChannel, "Copy link">, string> = {
      WhatsApp: `https://wa.me/?text=${encText}%20${encUrl}`,
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`,
      Email: `mailto:?subject=${encodeURIComponent(courseName)}&body=${encText}%20${encUrl}`,
      Telegram: `https://t.me/share/url?url=${encUrl}&text=${encText}`,
      X: `https://twitter.com/intent/tweet?url=${encUrl}&text=${encText}`,
    };
    window.open(hrefs[channel as Exclude<ShareChannel, "Copy link">], "_blank", "noopener,noreferrer");
    setShareOpen(false);
  }

  function persistVote(next: "like" | "dislike" | null) {
    // writeStoredVote notifies every subscribed instance (including this
    // one) via the shared store, so no separate setVote(next) call here.
    writeStoredVote(courseId, next);
  }

  function handleLikeClick() {
    const next = vote === "like" ? null : "like";
    persistVote(next);
    track(next ? "like_click" : "unlike_click", baseEventParams());
    submitFeedback(next ? "like" : "unlike", { skipReasonsAndComment: true });
  }

  function handleDislikeClick() {
    if (vote === "dislike") {
      persistVote(null);
      track("unlike_click", baseEventParams());
      return;
    }
    persistVote("dislike");
    track("dislike_click", baseEventParams());
    setDislikeOpen(true);
  }

  function closeDislikeModal() {
    setDislikeOpen(false);
    setReasons(new Set());
    setComment("");
    setSubmitted(false);
  }

  function toggleReason(r: DislikeReason) {
    setReasons((prev) => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r);
      else next.add(r);
      return next;
    });
  }

  async function submitFeedback(action: "like" | "unlike" | "dislike", opts?: { skipReasonsAndComment?: boolean }) {
    const now = Date.now();
    rateLimitRef.current = rateLimitRef.current.filter((t) => now - t < 60_000);
    if (rateLimitRef.current.length >= 5) return;
    rateLimitRef.current.push(now);

    const payload = {
      courseId,
      courseName,
      action,
      reasons: opts?.skipReasonsAndComment ? [] : Array.from(reasons),
      comment: opts?.skipReasonsAndComment ? "" : comment.trim().slice(0, 200),
      contact: "",
      mode: currentModeParam(),
      batchId: selectedBatch?.id ?? null,
      device: getDevice(),
      pageUrl: window.location.href,
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/course-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
    } catch {
      try {
        const key = "koenig_feedback_log";
        const existing = JSON.parse(localStorage.getItem(key) ?? "[]");
        existing.push(payload);
        localStorage.setItem(key, JSON.stringify(existing));
      } catch {
        /* ignore */
      }
      console.log("[course-feedback:fallback]", payload);
    }
  }

  async function handleDislikeSubmit() {
    setSubmitting(true);
    await submitFeedback("dislike");
    track("dislike_submit", { ...baseEventParams(), reasons: Array.from(reasons), has_comment: comment.trim().length > 0 });
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(closeDislikeModal, 2000);
  }

  async function handleDislikeSkip() {
    await submitFeedback("dislike", { skipReasonsAndComment: true });
    closeDislikeModal();
  }

  const iconBtnBase =
    "flex h-9 w-9 items-center justify-center rounded-full border border-koenig-blue/20 bg-koenig-blue/5 text-koenig-blue transition-colors hover:bg-koenig-blue/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-koenig-blue focus-visible:ring-offset-2 max-md:h-11 max-md:w-11";

  return (
    <div ref={rootRef} className={`relative flex items-center gap-2 rounded-full border border-koenig-border bg-white px-2 py-1.5 shadow-sm ${className}`}>
      {/* Copy */}
      <div className="group relative">
        <button type="button" aria-label="Copy course summary" title="Copy" onClick={handleCopy} className={iconBtnBase}>
          {copied ? <IconCheck /> : <IconCopy />}
        </button>
        <span role="tooltip" className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-koenig-navy px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          {copyError ? "Couldn't copy, please try again" : copied ? "Copied!" : "Copy"}
        </span>
      </div>

      {/* Share */}
      <div className="group relative">
        <button ref={shareBtnRef} type="button" aria-label="Share this course" title="Share" aria-haspopup="true" aria-expanded={shareOpen} onClick={handleShareClick} className={iconBtnBase}>
          <IconShare />
        </button>
        <span role="tooltip" className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-koenig-navy px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          Share
        </span>

        {shareOpen && (
          <div
            ref={sharePopoverRef}
            role="menu"
            className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-koenig-border bg-white p-2 shadow-xl"
          >
            {SHARE_CHANNELS.map((channel) => (
              <button
                key={channel}
                type="button"
                role="menuitem"
                onClick={() => handleChannelClick(channel)}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-koenig-dark transition hover:bg-koenig-blue/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-koenig-blue"
              >
                <span className="text-koenig-blue">{CHANNEL_ICON[channel]}</span>
                {channel}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Like */}
      <div className="group relative">
        <button
          type="button"
          aria-label="Like this course"
          aria-pressed={vote === "like"}
          title="Like"
          onClick={handleLikeClick}
          className={`${iconBtnBase} ${vote === "like" ? "!bg-koenig-blue !text-white" : ""}`}
        >
          <IconThumbsUp filled={vote === "like"} />
        </button>
        <span role="tooltip" className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-koenig-navy px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          {likeCount >= 10 ? `Like (${likeCount})` : "Like"}
        </span>
      </div>

      {/* Dislike */}
      <div className="group relative">
        <button
          type="button"
          aria-label="Dislike this course"
          aria-pressed={vote === "dislike"}
          title="Dislike"
          onClick={handleDislikeClick}
          className={`${iconBtnBase} ${vote === "dislike" ? "!bg-koenig-blue !text-white" : ""}`}
        >
          <IconThumbsDown filled={vote === "dislike"} />
        </button>
        <span role="tooltip" className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-koenig-navy px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          Dislike
        </span>
      </div>

      {/* Dislike modal — upward popover on desktop, bottom sheet on mobile */}
      {dislikeOpen && (
        <>
          <div className="fixed inset-0 z-[90] bg-black/30 sm:hidden" onClick={closeDislikeModal} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Dislike feedback"
            className="fixed inset-x-0 bottom-0 z-[91] rounded-t-2xl border border-koenig-border bg-white p-5 shadow-2xl sm:absolute sm:inset-x-auto sm:bottom-12 sm:right-0 sm:w-80 sm:rounded-2xl"
          >
            <button
              type="button"
              onClick={closeDislikeModal}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-koenig-muted transition hover:bg-koenig-blue/10 hover:text-koenig-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-koenig-blue"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-7">
                <style>{`
                  @keyframes dislikeTickPop { 0% { transform: scale(0.4); opacity: 0; } 60% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
                  @keyframes dislikeTickDraw { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
                  .dislike-tick-badge { animation: dislikeTickPop .4s cubic-bezier(.34,1.56,.64,1) forwards; }
                  .dislike-tick-path { stroke-dasharray: 24; stroke-dashoffset: 24; animation: dislikeTickDraw .35s ease forwards .25s; }
                  @media (prefers-reduced-motion: reduce) { .dislike-tick-badge, .dislike-tick-path { animation: none; opacity: 1; stroke-dashoffset: 0; } }
                `}</style>
                <span className="dislike-tick-badge flex h-14 w-14 items-center justify-center rounded-full bg-koenig-blue/10">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-koenig-blue">
                    <polyline className="dislike-tick-path" points="20 6 9 17 4 12" pathLength="24" />
                  </svg>
                </span>
                <p className="text-center text-sm font-semibold text-koenig-dark">Thanks for your feedback</p>
              </div>
            ) : (
              <>
                <h4 className="mb-3 pr-6 text-sm font-bold text-koenig-dark">Sorry to hear that. What was missing?</h4>
                <div className="mb-3 flex flex-wrap gap-2">
                  {DISLIKE_REASONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => toggleReason(r)}
                      aria-pressed={reasons.has(r)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-koenig-blue focus-visible:ring-offset-2 ${reasons.has(r) ? "border-koenig-blue bg-koenig-blue text-white" : "border-koenig-border bg-white text-koenig-muted hover:border-koenig-blue"}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <label className="mb-1 block text-xs font-semibold text-koenig-dark">Tell us more (optional)</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value.slice(0, 200))}
                  maxLength={200}
                  rows={3}
                  className="mb-1 w-full rounded-lg border border-koenig-border p-2 text-sm text-koenig-dark outline-none focus:border-koenig-blue"
                  placeholder="What should we improve?"
                />
                <p className="mb-3 text-right text-[11px] text-koenig-muted">{comment.length}/200</p>
                <div className="mt-3 flex items-center justify-end gap-2">
                  <button type="button" onClick={handleDislikeSkip} className="rounded-lg px-4 py-2 text-sm font-semibold text-koenig-muted hover:bg-koenig-blue/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-koenig-blue focus-visible:ring-offset-2">
                    Skip
                  </button>
                  <button
                    type="button"
                    onClick={handleDislikeSubmit}
                    disabled={submitting}
                    className="rounded-lg bg-koenig-blue px-4 py-2 text-sm font-bold text-white transition hover:bg-koenig-accent disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-koenig-blue focus-visible:ring-offset-2"
                  >
                    {submitting ? "Sending…" : "Submit"}
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

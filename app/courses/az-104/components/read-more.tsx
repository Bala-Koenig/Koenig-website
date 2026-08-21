"use client";
import { Children, cloneElement, isValidElement, useLayoutEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  lines?: number;
  /** Hover color class for the link — override for dark backgrounds. */
  hoverClassName?: string;
}

export function ReadMore({ children, lines = 6, hoverClassName = "hover:text-koenig-navy" }: Props) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number; fits: boolean } | null>(null);
  const [clampHeight, setClampHeight] = useState<number | null>(null);

  // Clamp to an exact pixel height ourselves (instead of leaving native
  // -webkit-line-clamp doing the final render), so measuring where the
  // visible text ends and where it's actually cut off always agree.
  //
  // The height itself is still discovered via a brief native line-clamp
  // probe — that's the only way to get a number that correctly accounts
  // for margins between block children (e.g. Course Overview's
  // `space-y-4` paragraphs), which a plain lineHeight × lines estimate
  // gets wrong. Once we have that authoritative height, we switch to a
  // plain overflow clip at that exact pixel value with no ellipsis, so
  // the last visible line is always a genuinely complete line — never a
  // word truncated mid-character — and "Read more" can sit right after it.
  //
  // The measured height is stored in state (not written to el.style
  // directly) — setting it imperatively would get silently reverted the
  // next time this component re-renders, since React reapplies whatever
  // the JSX `style` prop says.
  useLayoutEffect(() => {
    if (expanded) return;
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const prevMaxHeight = el.style.maxHeight;
      const prevDisplay = el.style.display;
      el.style.maxHeight = "";
      el.style.display = "-webkit-box";
      el.style.overflow = "hidden";
      (el.style as unknown as { webkitLineClamp: string }).webkitLineClamp = String(lines);
      (el.style as unknown as { webkitBoxOrient: string }).webkitBoxOrient = "vertical";

      const measuredHeight = el.getBoundingClientRect().height;

      el.style.display = prevDisplay;
      el.style.maxHeight = prevMaxHeight;
      (el.style as unknown as { webkitLineClamp: string }).webkitLineClamp = "";
      (el.style as unknown as { webkitBoxOrient: string }).webkitBoxOrient = "";

      const containerRect = el.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(el);
      const rects = Array.from(range.getClientRects()).filter((r) => r.width > 0 && r.height > 0);
      const visible = rects.filter((r) => r.bottom - containerRect.top <= measuredHeight + 0.5);
      if (!visible.length) return;
      // JSX text wrapped across multiple source lines becomes multiple text
      // nodes, so a single visual line can produce more than one rect (in
      // DOM order, not visual order). Group by row and take the rightmost
      // edge, rather than assuming the last array entry is the last line.
      const bottomRow = Math.max(...visible.map((r) => r.top));
      const last = visible
        .filter((r) => Math.abs(r.top - bottomRow) < 1)
        .reduce((a, b) => (b.right > a.right ? b : a));

      const left = last.right - containerRect.left;
      const gap = 4;
      const linkWidth = linkRef.current?.offsetWidth ?? 0;
      // If the last line runs close enough to the container's edge that
      // "Read more" wouldn't fit after it without spilling past the
      // container, don't clamp its position inward (that just makes it
      // overlap the text instead) — fall back to a block-level button
      // below the text, same as the mobile pattern.
      const fits = left + gap + linkWidth <= el.clientWidth;
      setClampHeight(measuredHeight);
      setPos({ top: last.top - containerRect.top, left, fits });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    // The first measurement can run before custom web fonts finish
    // loading, using fallback-font metrics — which wrap text differently
    // and throw off the measured position. A font swap alone doesn't
    // necessarily change the container's height, so ResizeObserver won't
    // catch it; re-measure explicitly once fonts are ready.
    let cancelled = false;
    document.fonts?.ready?.then(() => {
      if (!cancelled) measure();
    });

    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [expanded, lines, children]);

  if (expanded) {
    // Force the last child's own margin-bottom to 0 (e.g. the banner's
    // paragraphs use mb-6) so "Read less" sits close to the text,
    // regardless of spacing the caller set up for the collapsed layout.
    // A CSS selector override (e.g. "[&>*:last-child]:mb-0") isn't
    // reliable here — Tailwind's generated rule and the child's own
    // utility class end up with the same specificity, so which one wins
    // depends on stylesheet order, not intent. An inline style always
    // wins, so clone the last child and set it directly.
    const items = Children.toArray(children);
    const lastIndex = items.length - 1;
    const patched = items.map((child, i) =>
      i === lastIndex && isValidElement(child)
        ? cloneElement(child, { style: { ...(child.props as { style?: React.CSSProperties }).style, marginBottom: 0 } })
        : child
    );

    return (
      <div>
        {patched}
        <button
          onClick={() => setExpanded(false)}
          className={`mt-1 cursor-pointer text-sm font-semibold text-koenig-blue ${hoverClassName} transition block`}
        >
          Read less
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* maxHeight starts as an approximation (leading-relaxed ≈ 1.625) so
          there's no flash of full text before hydration; useLayoutEffect
          measures the exact pixel height and stores it in state, which
          then drives this same style prop on every subsequent render. */}
      <div
        ref={containerRef}
        style={{ overflow: "hidden", maxHeight: clampHeight != null ? `${clampHeight}px` : `${lines * 1.7}em` }}
      >
        {children}
      </div>

      {/* Mobile: plain button below — no overlay, no background patch */}
      <button
        onClick={() => setExpanded(true)}
        className={`sm:hidden mt-1 cursor-pointer text-sm font-semibold text-koenig-blue ${hoverClassName} transition`}
      >
        Read more
      </button>

      {/* Desktop: positioned right after the visible text ends — unless
          the last line runs too close to the edge for it to fit there,
          in which case it drops to a block button below (never
          overlapping text). Defaults to the safe below-text version
          until measured. */}
      {pos?.fits ? (
        <span
          ref={linkRef as React.RefObject<HTMLSpanElement>}
          role="button"
          tabIndex={0}
          onClick={() => setExpanded(true)}
          className={`hidden sm:inline-block absolute cursor-pointer whitespace-nowrap text-sm font-semibold text-koenig-blue ${hoverClassName} transition`}
          style={{ top: pos.top, left: pos.left + 4 }}
        >
          … Read more
        </span>
      ) : (
        <button
          ref={linkRef as React.RefObject<HTMLButtonElement>}
          onClick={() => setExpanded(true)}
          className={`hidden sm:inline-block mt-1 cursor-pointer whitespace-nowrap text-sm font-semibold text-koenig-blue ${hoverClassName} transition`}
        >
          … Read more
        </button>
      )}
    </div>
  );
}

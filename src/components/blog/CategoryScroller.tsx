"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CategoryOption {
  /** Identity of the filter; kept apart from the label so "All" cannot clash with a topic of that name. */
  value: string;
  label: string;
  count: number;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The blog's topic filter: a single row that scrolls sideways with a visible
 * scrollbar. Arrow buttons (tablet and up) and edge fades appear only on the
 * side that has more topics, and the selected topic is scrolled into view.
 */
export function CategoryScroller({
  categories,
  active,
  onSelect,
  className = "",
}: {
  categories: CategoryOption[];
  active: string;
  onSelect: (value: string) => void;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const next = { start: el.scrollLeft > 2, end: el.scrollLeft < max - 2 };
    setEdges((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateEdges);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    // The row's width changes on resize, and chip widths change once the web font loads.
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [updateEdges]);

  // Keep the selected topic in view, centred where the row allows.
  useEffect(() => {
    const el = scrollerRef.current;
    const chip = el?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!el || !chip) return;
    const target = chip.offsetLeft - (el.clientWidth - chip.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, target), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [active]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * Math.max(el.clientWidth * 0.8, 160),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const arrowClass =
    "absolute top-1 h-11 z-10 hidden md:flex items-center transition-opacity duration-200";
  const arrowButtonClass =
    "w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-dark/70 hover:text-primary hover:border-primary transition-colors";

  return (
    <div className={`relative ${className}`}>
      {/* Edge fades: shown only on a side with more topics to reach. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 h-13 z-1 w-10 md:w-16 bg-linear-to-r from-white to-transparent transition-opacity duration-200 ${edges.start ? "opacity-100" : "opacity-0"}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 top-0 h-13 z-1 w-10 md:w-16 bg-linear-to-l from-white to-transparent transition-opacity duration-200 ${edges.end ? "opacity-100" : "opacity-0"}`}
      />

      {/* Mouse shortcuts. Keyboard users reach every topic with Tab, so these stay out of the tab order. */}
      <div className={`${arrowClass} left-0 ${edges.start ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => scrollByPage(-1)}
          className={arrowButtonClass}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      <div className={`${arrowClass} right-0 ${edges.end ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => scrollByPage(1)}
          className={arrowButtonClass}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        role="group"
        aria-label="Filter articles by topic"
        className="relative overflow-x-auto overscroll-x-contain pb-1.5 scrollbar-brand"
      >
        {/* p-1 keeps the focus ring of the first and last topic inside the scroll area. */}
        <div className="flex w-max gap-3 p-1">
          {categories.map(({ value, label, count }) => {
            const selected = value === active;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(value)}
                className={`shrink-0 flex items-center gap-2 px-5 py-2 min-h-11 rounded-sm text-sm font-bold font-notch uppercase tracking-wider border transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  selected
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-dark/70 border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                {label}
                <span
                  className={`text-xs font-sans font-normal px-1.5 py-0.5 rounded-full transition-colors ${
                    selected ? "bg-white/20 text-white" : "bg-gray-100 text-dark/70"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

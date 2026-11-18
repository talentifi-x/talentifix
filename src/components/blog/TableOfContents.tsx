"use client";

import { useEffect, useId, useMemo, useRef, useState, type MouseEvent } from "react";
import { ChevronDown, List } from "lucide-react";

interface TableOfContentsItem {
  title: string;
  id: string;
  level: number;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  variant?: "sidebar" | "inline";
}

const headingOffset = () =>
  (document.querySelector<HTMLElement>("[data-site-header]")?.getBoundingClientRect().height ?? 120) + 24;

export function TableOfContents({ items, variant = "sidebar" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");
  const [expandedId, setExpandedId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const navigationId = useId();
  const isInline = variant === "inline";
  const groups = useMemo(() => {
    const result: (TableOfContentsItem & { children: TableOfContentsItem[] })[] = [];
    for (const item of items) {
      if (item.level <= 1 || result.length === 0) result.push({ ...item, children: [] });
      else result[result.length - 1].children.push(item);
    }
    return result;
  }, [items]);
  const activeIndex = groups.findIndex((group) => group.id === activeId || group.children.some((child) => child.id === activeId));
  const activeGroupId = groups[activeIndex]?.id ?? "";

  useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id)).filter((element): element is HTMLElement => Boolean(element));
    let frame = 0;
    // Keep the last heading above the reading line active between headings and
    // after large scroll jumps. Intersection-only tracking misses these cases.
    const update = () => {
      frame = 0;
      const readingLine = headingOffset() + 2;
      let current = "";
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > readingLine) break;
        current = heading.id;
      }
      setActiveId(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const followHash = () => {
      let id = "";
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = headings.find((heading) => heading.id === id);
      if (target) window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - headingOffset(), behavior: "instant" });
      schedule();
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", followHash);
    window.addEventListener("popstate", followHash);
    // Images and fonts can change section positions after the initial render.
    const observer = new ResizeObserver(schedule);
    const article = headings[0]?.closest("article");
    if (article) observer.observe(article);
    const header = document.querySelector("[data-site-header]");
    if (header) observer.observe(header);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", followHash);
      window.removeEventListener("popstate", followHash);
    };
  }, [items]);

  useEffect(() => { setExpandedId(activeGroupId); }, [activeGroupId]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const reveal = () => {
      if (!activeId) { nav.scrollTop = 0; return; }
      const current = nav.querySelector<HTMLElement>('[aria-current="location"]');
      if (!current || nav.clientHeight === 0) return;
      const bounds = nav.getBoundingClientRect();
      const item = current.getBoundingClientRect();
      // Move only the list; scrollIntoView would also move the article itself.
      if (item.top < bounds.top + 8) nav.scrollTop += item.top - bounds.top - 8;
      else if (item.bottom > bounds.bottom - 8) nav.scrollTop += item.bottom - bounds.bottom + 8;
    };
    // Wait for the active section's children to expand. Manual expansion of a
    // different section should not pull the list back to the reading position.
    const frame = requestAnimationFrame(reveal);
    const observer = new ResizeObserver(reveal);
    observer.observe(nav);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [activeId, isOpen]);

  const navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    if (isInline) setIsOpen(false);
    const hash = `#${encodeURIComponent(id)}`;
    if (window.location.hash !== hash) window.history.pushState(window.history.state, "", hash);
    // Collapsing the inline menu changes the target's position.
    requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - headingOffset(), behavior: reducedMotion ? "instant" : "smooth" });
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    });
  };

  if (items.length === 0) return null;
  const counter = activeIndex < 0 ? `${groups.length} sections` : `${activeIndex + 1} / ${groups.length}`;
  const label = (
    <>
      <span className="flex items-center gap-2 font-notch font-bold text-dark text-sm">
        <List className="h-4 w-4 text-primary" aria-hidden="true" /> Contents
      </span>
      <span className="ml-auto rounded-full bg-primary/5 px-2.5 py-1 text-xs font-medium tabular-nums text-primary" aria-label={activeIndex < 0 ? counter : `Section ${activeIndex + 1} of ${groups.length}`}>
        {counter}
      </span>
    </>
  );

  return (
    <div data-toc={variant} className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm" style={!isInline ? { maxHeight: "min(36rem, calc(100dvh - var(--site-header-height, 7.5rem) - 2rem))" } : undefined}>
      {isInline ? (
        <button type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls={navigationId} className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-2">
          {label}
          <ChevronDown className={`h-4 w-4 shrink-0 text-dark/60 transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      ) : (
        <div className="flex shrink-0 items-center gap-2 border-b border-gray-100 px-4 py-3.5">{label}</div>
      )}
      <nav ref={navRef} id={navigationId} aria-label="Article contents" hidden={isInline && !isOpen} className={`min-h-0 overflow-y-auto overscroll-contain p-2 scrollbar-brand ${isInline ? "max-h-[min(28rem,60dvh)] border-t border-gray-100" : "flex-1"}`}>
        <ol className="space-y-1">
          {groups.map((group, index) => {
            const selected = group.id === activeGroupId;
            const expanded = group.id === expandedId;
            const isCurrent = group.id === activeId || (selected && !expanded);
            const childrenId = `${navigationId}-section-${index}`;
            return (
              <li key={group.id}>
                <div className={`flex items-start rounded-lg border-l-2 ${selected ? "border-primary bg-primary/5" : "border-transparent"}`}>
                  <a href={`#${group.id}`} onClick={(event) => navigate(event, group.id)} aria-current={isCurrent ? "location" : undefined} className={`flex min-h-11 min-w-0 flex-1 items-start gap-2 rounded-md px-2 py-2.5 text-left text-[13px] leading-relaxed focus-visible:outline-2 focus-visible:outline-primary ${selected ? "font-semibold text-primary" : "text-dark/75 hover:bg-gray-50 hover:text-dark"}`}>
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-semibold tabular-nums ${selected ? "bg-primary text-white" : "bg-gray-100 text-dark/50"}`} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span>{group.title}</span>
                  </a>
                  {group.children.length > 0 && (
                    <button type="button" onClick={() => setExpandedId(expanded ? "" : group.id)} aria-expanded={expanded} aria-controls={childrenId} aria-label={`${expanded ? "Hide" : "Show"} subsections: ${group.title}`} className="flex min-h-11 w-11 lg:w-8 shrink-0 items-center justify-center rounded-md text-dark/50 hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary">
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                  )}
                </div>
                {group.children.length > 0 && (
                  <ol id={childrenId} hidden={!expanded} className="ml-5 mt-1 space-y-0.5 border-l border-gray-200 pl-2">
                    {group.children.map((child) => (
                      <li key={child.id}>
                        <a href={`#${child.id}`} onClick={(event) => navigate(event, child.id)} aria-current={child.id === activeId ? "location" : undefined} className={`block min-h-11 rounded-md px-2 py-2.5 text-[13px] leading-relaxed focus-visible:outline-2 focus-visible:outline-primary ${child.id === activeId ? "bg-primary/10 font-semibold text-primary" : "text-dark/65 hover:bg-gray-50 hover:text-dark"}`}>
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}

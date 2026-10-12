"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { ArrowRight, CornerDownLeft, FileText, Search, X } from "lucide-react";
import {
  buildSearchIndex,
  highlight,
  searchIndex,
  snippet,
  tokenize,
  type SearchablePost,
} from "@lib/blogSearch";

/** With an empty query, each topic lists its newest posts, then "View all". */
const BROWSE_PER_TOPIC = 3;
/** Cap on rendered results, so a very broad query on a large blog stays fast. */
const MAX_RESULTS = 50;

type Row =
  | { kind: "post"; id: string; post: SearchablePost; href: string }
  | { kind: "topic"; id: string; category: string; total: number };

interface Group {
  id: string;
  title: string;
  total: number;
  rows: Row[];
}

/** Holds back screen-reader announcements until typing pauses. */
function useSettledValue<T>(value: T, delay: number): T {
  const [settled, setSettled] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);
  return settled;
}

/**
 * Blog search, modelled on the command palette on digitallynext.com: a search
 * box in the filter bar opens a dialog that lists matching posts grouped by
 * topic. Ctrl+K / Cmd+K opens it from anywhere on the page. Full screen on
 * phones; a centred panel from the sm breakpoint.
 *
 * The dialog is portalled to <body>: the filter bar is sticky, and inside it the
 * dialog would be trapped beneath the site header.
 */
export function BlogSearch({
  posts,
  onSelectCategory,
}: {
  posts: SearchablePost[];
  /** Applies a topic filter to the article grid ("View all" rows). */
  onSelectCategory: (category: string) => void;
}) {
  const router = useRouter();
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;
  const titleId = `${baseId}-title`;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);
  const restoreFocusRef = useRef(true);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [shortcut, setShortcut] = useState<string | null>(null);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Read the platform after hydration, so the server and client render the same trigger.
  useEffect(() => {
    const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
    const platform = nav.userAgentData?.platform || nav.platform || nav.userAgent;
    setShortcut(/mac|iphone|ipad|ipod/i.test(platform) ? "⌘K" : "Ctrl K");
  }, []);

  const index = useMemo(() => buildSearchIndex(posts), [posts]);
  const tokens = useMemo(() => tokenize(query), [query]);
  const browsing = tokens.length === 0;

  const { groups, rows, totalMatches } = useMemo(() => {
    const topics = new Map<string, SearchablePost[]>();
    const add = (post: SearchablePost) => {
      const list = topics.get(post.category);
      if (list) list.push(post);
      else topics.set(post.category, [post]);
    };

    let total: number;
    if (browsing) {
      posts.forEach(add);
      total = posts.length;
    } else {
      // Topics appear in the order of their best match.
      const hits = searchIndex(index, query);
      total = hits.length;
      hits.slice(0, MAX_RESULTS).forEach((hit) => add(hit.post));
    }

    const groupList: Group[] = [];
    const flat: Row[] = [];
    let g = 0;
    for (const [category, list] of topics) {
      const shown = browsing ? list.slice(0, BROWSE_PER_TOPIC) : list;
      const groupRows: Row[] = shown.map((post, j) => ({
        kind: "post",
        id: `${baseId}-o-${flat.length + j}`,
        post,
        href: `/blog/${post.slug}`,
      }));
      if (browsing && list.length > BROWSE_PER_TOPIC) {
        groupRows.push({
          kind: "topic",
          id: `${baseId}-o-${flat.length + groupRows.length}`,
          category,
          total: list.length,
        });
      }
      groupList.push({ id: `${baseId}-g-${g++}`, title: category, total: list.length, rows: groupRows });
      flat.push(...groupRows);
    }
    return { groups: groupList, rows: flat, totalMatches: total };
  }, [baseId, browsing, index, posts, query]);

  const activeRow = rows[activeIndex];

  const openSearch = useCallback(() => {
    restoreFocusRef.current = true;
    setOpen(true);
  }, []);

  const closeSearch = useCallback((restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  /** Keeps Tab and Shift+Tab cycling through the dialog's controls. */
  const trapTab = (e: KeyboardEvent) => {
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = Array.from(panel.querySelectorAll<HTMLElement>("input, button:not([disabled])")).filter(
      (el) => el.offsetParent !== null,
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const current = document.activeElement;
    if (!panel.contains(current)) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    } else if (e.shiftKey && current === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && current === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // Ctrl+K / Cmd+K toggles the search from anywhere on the page.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey || e.key.toLowerCase() !== "k") return;
      e.preventDefault();
      if (openRef.current) closeSearch();
      else openSearch();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeSearch, openSearch]);

  // While open: lock page scroll, make the rest of the page inert, focus the input.
  // A layout effect, so the cleanup (unlock, then restore focus) runs before the
  // next paint and focus never lands on a still-inert element.
  useLayoutEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    // Keep the layout from shifting when the page scrollbar disappears.
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const inerted: Element[] = [];
    for (const el of Array.from(body.children)) {
      if (el === rootRef.current || el.hasAttribute("inert")) continue;
      el.setAttribute("inert", "");
      inerted.push(el);
    }

    inputRef.current?.focus({ preventScroll: true });
    const trigger = triggerRef.current;

    // On the document, not the dialog: a click on blank space in the panel moves
    // focus to <body>, and Esc and the Tab trap must still work from there.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeSearch();
      } else if (e.key === "Tab") {
        trapTab(e);
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      inerted.forEach((el) => el.removeAttribute("inert"));
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.bodyPaddingRight;
      if (restoreFocusRef.current) trigger?.focus({ preventScroll: true });
    };
  }, [open, closeSearch]);

  /** Scrolls the list (never the page) so the row is visible, with its topic label when it heads a group. */
  const revealRow = (i: number) => {
    requestAnimationFrame(() => {
      const list = listRef.current;
      const row = list?.querySelector<HTMLElement>(`[data-index="${i}"]`);
      if (!list || !row) return;
      const label = row.previousElementSibling?.getAttribute("role") === "presentation" ? row.previousElementSibling : null;
      const top = (label instanceof HTMLElement ? label : row).offsetTop - 4;
      const bottom = row.offsetTop + row.offsetHeight + 4;
      if (top < list.scrollTop) list.scrollTop = top;
      else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
    });
  };

  const activate = (row: Row, newTab = false) => {
    if (row.kind === "topic") {
      onSelectCategory(row.category);
      closeSearch();
      return;
    }
    if (newTab) {
      window.open(row.href, "_blank", "noopener");
      return;
    }
    closeSearch(false);
    router.push(row.href);
  };

  const onInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    // Enter during IME composition confirms the composed text; it must not open a post.
    if (e.nativeEvent.isComposing) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (rows.length === 0) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      const next = activeRow ? (activeIndex + step + rows.length) % rows.length : step > 0 ? 0 : rows.length - 1;
      setActiveIndex(next);
      revealRow(next);
    } else if (e.key === "Enter" && activeRow) {
      e.preventDefault();
      activate(activeRow, e.metaKey || e.ctrlKey);
    }
  };

  const onPostClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    // New-tab clicks keep the search open; a plain click navigates and closes it.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    closeSearch(false);
  };

  const renderHighlighted = (text: string) =>
    highlight(text, tokens).map((segment, i) =>
      segment.match ? (
        <mark key={i} className="rounded-[2px] bg-secondary/35 px-px text-inherit">
          {segment.text}
        </mark>
      ) : (
        <Fragment key={i}>{segment.text}</Fragment>
      ),
    );

  const status =
    posts.length === 0
      ? "No articles yet"
      : browsing
        ? `${posts.length} ${posts.length === 1 ? "article" : "articles"}`
        : totalMatches === 0
          ? "No results"
          : `${totalMatches} ${totalMatches === 1 ? "result" : "results"}${totalMatches > MAX_RESULTS ? `, first ${MAX_RESULTS} shown` : ""}`;
  const announcement = useSettledValue(open ? status : "", 500);

  const kbd =
    "inline-flex h-5 min-w-5 items-center justify-center rounded-[3px] border border-gray-300 bg-white px-1 font-sans text-[10px] font-bold text-dark/70";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openSearch}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-keyshortcuts="Control+K Meta+K"
        aria-label="Search articles"
        // Grey fill and a blue icon, so it reads as a search box rather than another topic chip.
        className="group flex h-11 w-11 shrink-0 items-center justify-center gap-2.5 rounded-sm border border-gray-300 bg-grey-accent text-dark/70 transition-colors hover:border-primary hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-52 sm:justify-start sm:px-4 lg:w-72"
      >
        <Search className="h-4.5 w-4.5 shrink-0 text-primary" strokeWidth={2.25} aria-hidden="true" />
        <span className="hidden flex-1 truncate text-left font-sans text-sm sm:block">Search articles</span>
        {shortcut && (
          // Its own class list: the shared kbd style sets inline-flex, which would override hidden.
          <kbd
            aria-hidden="true"
            className="hidden h-5 min-w-5 items-center justify-center rounded-[3px] border border-gray-300 bg-white px-1 font-sans text-[10px] font-bold text-dark/70 lg:pointer-fine:inline-flex"
          >
            {shortcut}
          </kbd>
        )}
      </button>

      {open &&
        createPortal(
          <div
            ref={rootRef}
            className="fixed inset-0 z-1000 flex justify-center sm:items-start sm:px-4 sm:pt-[12vh]"
          >
            <div
              aria-hidden="true"
              onClick={() => closeSearch()}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm motion-safe:animate-fade-in"
            />

            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onMouseDown={(e) => {
                // Keep typing focus in the input; the list itself is exempt so its scrollbar still drags.
                const target = e.target as HTMLElement;
                if (target !== listRef.current && !target.closest("input, button")) e.preventDefault();
              }}
              className="relative flex h-dvh w-full flex-col overflow-hidden bg-white shadow-2xl motion-safe:animate-dialog-in sm:h-auto sm:max-h-[min(72vh,640px)] sm:max-w-2xl sm:rounded-[10px]"
            >
              <h2 id={titleId} className="sr-only">
                Search articles
              </h2>

              <div className="flex h-15 shrink-0 items-center gap-3 border-b border-gray-100 px-4 sm:h-16 sm:px-5">
                <Search className="h-5 w-5 shrink-0 text-primary" strokeWidth={2.25} aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="search"
                  enterKeyHint="go"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  maxLength={100}
                  placeholder="Search articles by title, topic or keyword"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                    if (listRef.current) listRef.current.scrollTop = 0;
                  }}
                  onKeyDown={onInputKeyDown}
                  role="combobox"
                  aria-label="Search articles"
                  aria-autocomplete="list"
                  aria-expanded={rows.length > 0}
                  aria-controls={listboxId}
                  aria-activedescendant={activeRow?.id}
                  // 16px on phones: iOS zooms the page into any smaller input.
                  className="min-w-0 flex-1 bg-transparent font-sans text-base text-dark outline-none placeholder:text-dark/60 sm:text-[15px]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setActiveIndex(0);
                      inputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-dark/60 transition-colors hover:bg-gray-100 hover:text-dark focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <X className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => closeSearch()}
                  className="shrink-0 rounded-sm px-2 py-2 font-sans text-sm font-semibold text-primary focus-visible:outline-2 focus-visible:outline-primary sm:hidden"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => closeSearch()}
                  aria-label="Close search"
                  className="hidden shrink-0 items-center rounded-sm p-1 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-primary sm:flex"
                >
                  <kbd className={kbd} aria-hidden="true">
                    Esc
                  </kbd>
                </button>
              </div>

              {rows.length > 0 ? (
                <div
                  ref={listRef}
                  id={listboxId}
                  role="listbox"
                  aria-label={browsing ? "Articles by topic" : "Search results"}
                  className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain py-2"
                >
                  {groups.map((group) => (
                    <div key={group.id} role="group" aria-labelledby={`${group.id}-label`} className="pb-1">
                      <div
                        role="presentation"
                        id={`${group.id}-label`}
                        className="flex items-center justify-between gap-3 px-5 pb-1.5 pt-3 font-notch text-[11px] font-bold uppercase tracking-wider text-dark/70"
                      >
                        <span className="truncate">{group.title}</span>
                        <span className="shrink-0 font-sans font-semibold normal-case tracking-normal text-dark/70">
                          {group.total} {group.total === 1 ? "article" : "articles"}
                        </span>
                      </div>
                      {group.rows.map((row) => {
                        const i = rows.indexOf(row);
                        const active = i === activeIndex;
                        if (row.kind === "topic") {
                          return (
                            <div
                              key={row.id}
                              id={row.id}
                              role="option"
                              aria-selected={active}
                              data-index={i}
                              onMouseMove={() => !active && setActiveIndex(i)}
                              onClick={() => activate(row)}
                              className={`mx-2 flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 font-sans text-sm font-semibold text-primary transition-colors ${active ? "bg-primary/5" : ""}`}
                            >
                              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                              <span className="min-w-0 flex-1 truncate">
                                View all {row.total} in {row.category}
                              </span>
                            </div>
                          );
                        }
                        const extract = snippet(row.post.introduction ?? "", tokens);
                        // The option is the link itself: a link inside an option is a nested
                        // interactive control. Middle-click and Ctrl+click still open a new tab.
                        return (
                          <Link
                            key={row.id}
                            id={row.id}
                            role="option"
                            aria-selected={active}
                            data-index={i}
                            href={row.href}
                            prefetch={false}
                            tabIndex={-1}
                            onMouseMove={() => !active && setActiveIndex(i)}
                            onClick={onPostClick}
                            className={`mx-2 flex items-start gap-3 rounded-sm px-3 py-3 transition-colors ${active ? "bg-primary/5" : ""}`}
                          >
                            <span
                              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm transition-colors ${active ? "bg-primary text-white" : "bg-grey-accent text-primary"}`}
                            >
                              <FileText className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span
                                className={`block wrap-break-word font-notch text-[15px] font-bold leading-snug line-clamp-2 ${active ? "text-primary" : "text-dark"}`}
                              >
                                {renderHighlighted(row.post.title)}
                              </span>
                              {extract && (
                                <span className="mt-1 block wrap-break-word font-sans text-[13px] leading-relaxed text-dark/70 line-clamp-2">
                                  {renderHighlighted(extract)}
                                </span>
                              )}
                            </span>
                            <CornerDownLeft
                              aria-hidden="true"
                              className={`mt-1.5 hidden h-4 w-4 shrink-0 text-primary transition-opacity sm:block ${active ? "opacity-100" : "opacity-0"}`}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-14 text-center">
                  {posts.length === 0 ? (
                    <div className="font-sans text-sm text-dark/70">No articles yet. Please check back soon.</div>
                  ) : (
                    <>
                      <div className="max-w-full wrap-break-word font-notch text-lg font-bold text-dark">
                        No articles match &ldquo;{query.trim()}&rdquo;
                      </div>
                      <div className="mt-2 font-sans text-sm text-dark/70">
                        Check the spelling, or try a broader word such as &ldquo;hiring&rdquo; or
                        &ldquo;staffing&rdquo;.
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="flex shrink-0 items-center justify-between gap-4 border-t border-gray-100 bg-grey-accent/60 px-4 py-2.5 font-sans text-xs text-dark/70 sm:px-5">
                <div className="hidden items-center gap-4 sm:pointer-fine:flex" aria-hidden="true">
                  <span className="inline-flex items-center gap-1.5">
                    <kbd className={kbd}>&uarr;&darr;</kbd>
                    Navigate
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <kbd className={kbd}>
                      <CornerDownLeft className="h-2.5 w-2.5" strokeWidth={2.5} />
                    </kbd>
                    Open
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <kbd className={kbd}>Esc</kbd>
                    Close
                  </span>
                </div>
                <span className="ml-auto font-semibold tabular-nums">{status}</span>
              </div>
              <div className="sr-only" aria-live="polite" aria-atomic="true">
                {announcement}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

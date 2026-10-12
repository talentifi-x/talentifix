"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { CategoryScroller, type CategoryOption } from "@components/blog/CategoryScroller";
import { BlogSearch } from "@components/blog/BlogSearch";

type Post = {
  slug: string;
  title: string;
  category: string;
  author: string | undefined;
  date: string;
  readTime: string;
  introduction: string | undefined;
  image: string;
};

/** Filter value for "every topic", kept apart from topic names so it can never clash with one. */
const ALL = "__all__";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function BlogGrid({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState(ALL);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Topics in order of their newest post, each with its article count.
  const categories = useMemo<CategoryOption[]>(() => {
    const counts = new Map<string, number>();
    for (const post of posts) counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    return [
      { value: ALL, label: "All", count: posts.length },
      ...Array.from(counts, ([name, count]) => ({ value: name, label: name, count })),
    ];
  }, [posts]);

  const displayed = useMemo(
    () => (active === ALL ? posts : posts.filter((post) => post.category === active)),
    [active, posts],
  );

  /**
   * Brings the top of the grid up under the sticky filter bar when the reader
   * has scrolled past it, so a shorter list never leaves them looking at the
   * footer. `force` (from search) also scrolls down to a grid that is still
   * below the fold.
   */
  const revealGrid = (force: boolean) => {
    const grid = gridRef.current;
    const bar = toolbarRef.current;
    if (!grid || !bar) return;
    const barBottom = (parseFloat(getComputedStyle(bar).top) || 0) + bar.offsetHeight;
    const gridTop = grid.getBoundingClientRect().top;
    const hiddenBehindBar = gridTop < barBottom;
    const belowFold = gridTop > window.innerHeight * 0.5;
    if (!hiddenBehindBar && !(force && belowFold)) return;
    window.scrollTo({
      top: window.scrollY + gridTop - barBottom,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const selectCategory = (value: string, force = false) => {
    setActive(value);
    // After React has rendered the filtered grid.
    requestAnimationFrame(() => revealGrid(force));
  };

  return (
    <section className="w-full pb-24">
      {/* Sticky filter bar: search first, then topics that scroll sideways. top = header height (40px top bar + 80px nav). */}
      <div ref={toolbarRef} className="sticky top-[120px] z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-2.5 pb-1.5 flex items-start gap-3 sm:gap-4">
          <div className="pt-1">
            <BlogSearch posts={posts} onSelectCategory={(value) => selectCategory(value, true)} />
          </div>
          <CategoryScroller
            className="flex-1 min-w-0"
            categories={categories}
            active={active}
            onSelect={(value) => selectCategory(value)}
          />
        </div>
      </div>

      {/* Grid. Re-keyed per topic so the new set fades in. */}
      <div
        key={active}
        ref={gridRef}
        className="max-w-7xl mx-auto px-6 md:px-8 pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 motion-safe:animate-fade-in"
      >
        {displayed.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <div className="text-dark/70 font-sans text-lg">No articles yet. Please check back soon.</div>
          </div>
        )}
        {displayed.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white rounded-[10px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            {/* Thumbnail */}
            <div className="relative w-full h-55 overflow-hidden bg-gray-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Category badge */}
              <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold font-notch uppercase tracking-wider px-3 py-1 rounded-sm flex items-center gap-1.5">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 gap-4 p-6">
              <div className="flex items-center gap-4 text-dark/40 text-xs font-sans">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-dark/30 inline-block" />
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-[18px] font-bold font-notch text-dark leading-snug group-hover:text-primary transition-colors line-clamp-3">
                {post.title}
              </h2>

              {post.author && (
                <p className="text-dark/80 font-sans text-xs">
                  Author: <span className="font-semibold text-dark">{post.author}</span>
                </p>
              )}

              <p className="text-dark/60 font-sans text-base md:text-sm leading-relaxed line-clamp-3 flex-1">
                {post.introduction}
              </p>

              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider font-notch mt-auto pt-2 border-t border-gray-100">
                Read Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

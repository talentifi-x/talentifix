"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Tag } from "lucide-react";

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

export default function BlogGrid({ posts }: { posts: Post[] }) {
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const [fading, setFading] = useState(false);
  const [displayed, setDisplayed] = useState<Post[]>(posts);

  const countFor = (cat: string) =>
    cat === "All" ? posts.length : posts.filter((p) => p.category === cat).length;

  function handleFilter(cat: string) {
    if (cat === active) return;
    setFading(true);
    setTimeout(() => {
      setDisplayed(cat === "All" ? posts : posts.filter((p) => p.category === cat));
      setActive(cat);
      setFading(false);
    }, 150);
  }

  return (
    <section className="w-full pb-24">
      {/* Sticky filter strip */}
      <div className="sticky top-[120px] z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2 rounded-sm text-sm font-bold font-notch uppercase tracking-wider border transition-colors whitespace-nowrap ${
                active === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-dark/60 border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
              <span
                className={`text-xs font-sans font-normal px-1.5 py-0.5 rounded-full transition-colors ${
                  active === cat
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-dark/50"
                }`}
              >
                {countFor(cat)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        className={`max-w-7xl mx-auto px-6 md:px-8 pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-150 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        {displayed.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <p className="text-dark/50 font-sans text-lg">
              No posts in this category yet.
            </p>
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

              <p className="text-dark/60 font-sans text-sm leading-relaxed line-clamp-3 flex-1">
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

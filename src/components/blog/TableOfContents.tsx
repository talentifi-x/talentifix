"use client";

import { useState, useEffect } from "react";

interface TableOfContentsItem {
  title: string;
  id: string;
  level: number;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-10% 0px -80% 0px",
        threshold: 0,
      },
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white rounded-[10px] p-5 border border-gray-100 shadow-sm">
      <h3 className="font-notch font-bold text-dark text-sm uppercase tracking-widest mb-4 pb-3 border-b border-gray-100">
        Contents
      </h3>
      <nav className="flex flex-col gap-0.5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`text-left text-sm leading-snug py-1.5 px-2 rounded-md transition-colors w-full ${
              activeId === item.id
                ? "bg-primary/8 text-primary font-semibold"
                : "text-dark/50 hover:text-dark hover:bg-gray-50"
            } ${item.level === 2 ? "pl-5" : item.level === 3 ? "pl-8" : ""}`}
          >
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BlogFaq } from "@data/blogData";

interface FaqSectionProps {
  faqs: BlogFaq[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 mt-2">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-xl overflow-hidden border transition-all duration-200 ${
              isOpen
                ? "border-primary/30 shadow-md shadow-primary/5"
                : "border-gray-100 shadow-sm hover:border-gray-200"
            } bg-white`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-5 py-4 text-left flex items-center gap-4 group"
              aria-expanded={isOpen}
            >
              {/* Number badge */}
              <span
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-notch font-bold transition-colors duration-200 ${
                  isOpen
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-dark/40 group-hover:bg-primary/10 group-hover:text-primary"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Question */}
              <span
                className={`flex-1 font-notch font-bold text-base leading-snug transition-colors duration-200 ${
                  isOpen ? "text-primary" : "text-dark group-hover:text-primary"
                }`}
              >
                {faq.question}
              </span>

              {/* Chevron */}
              <ChevronDown
                className={`shrink-0 w-5 h-5 transition-all duration-300 ${
                  isOpen
                    ? "rotate-180 text-primary"
                    : "text-dark/30 group-hover:text-primary"
                }`}
              />
            </button>

            {/* Animated answer panel */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-1 flex gap-4">
                  {/* Left accent line aligned with text */}
                  <div className="shrink-0 w-7 flex justify-center pt-1">
                    <div className="w-0.5 h-full bg-primary/20 rounded-full" />
                  </div>
                  <p className="text-dark/65 font-sans text-[15px] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

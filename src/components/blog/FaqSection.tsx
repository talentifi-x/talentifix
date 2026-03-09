"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { BlogFaq } from "@data/blogData";

interface FaqSectionProps {
  faqs: BlogFaq[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
          >
            <span className="font-notch font-bold text-dark text-base leading-snug">
              {faq.question}
            </span>
            {expandedItems.has(index) ? (
              <ChevronUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            ) : (
              <ChevronDown className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            )}
          </button>
          {expandedItems.has(index) && (
            <div className="px-5 pb-4 border-t border-gray-100">
              <p className="text-dark/70 font-sans text-sm leading-relaxed pt-3">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

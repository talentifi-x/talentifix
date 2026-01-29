"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqSectionProps {
  data: {
    title?: string;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export function FaqSection({ data }: FaqSectionProps) {
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

  if (!data.faqs || data.faqs.length === 0) return null;

  return (
    <div className="my-8">
      {data.title && (
        <h3 className="text-2xl font-bold text-dark mb-6">{data.title}</h3>
      )}
      <div className="space-y-4">
        {data.faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h4 className="text-lg font-semibold text-dark">{faq.question}</h4>
              {expandedItems.has(index) ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedItems.has(index) && (
              <div className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
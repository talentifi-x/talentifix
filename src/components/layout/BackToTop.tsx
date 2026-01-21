"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full shadow-xl border-2
                 bg-linear-to-r from-primary to-secondary 
                 text-white
                 opacity-90 hover:opacity-100 transition-all duration-300
                 hover:scale-110
                 backdrop-blur-md  group"
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform duration-300 drop-shadow-md" />
    </button>
  );
};

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 md:px-4 py-24 bg-[#F7F9FC] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-0 w-87.5 h-87.5 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-75 h-75 bg-primary/5 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center gap-6 relative z-10">
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[260px] md:text-[380px] font-notch font-bold text-dark/4 leading-none select-none pointer-events-none whitespace-nowrap -z-10"
        >
          500
        </span>

        <span className="inline-block text-primary font-notch font-bold text-sm tracking-widest uppercase border border-primary/30 px-4 py-1.5 rounded-sm bg-primary/5">
          Error 500
        </span>

        <h1 className="text-[60px] md:text-[90px] leading-none font-bold text-dark font-notch tracking-tight">
          Something<span className="text-secondary">.</span>
          <br />
          Went Wrong<span className="text-secondary">.</span>
        </h1>

        <p className="text-lg md:text-xl text-dark/60 max-w-xl">
          An unexpected error occurred. You can try again or return to the
          homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-blue transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <RefreshCw size={18} aria-hidden="true" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-dark/20 text-dark font-semibold px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Back to Home
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

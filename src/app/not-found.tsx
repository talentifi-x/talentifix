import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-white relative overflow-hidden px-4 py-20">
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      {/* Floating dots */}
      {[
        { top: "12%", left: "8%", size: 10 },
        { top: "25%", left: "30%", size: 7 },
        { top: "15%", left: "70%", size: 9 },
        { top: "70%", left: "15%", size: 6 },
        { top: "65%", left: "55%", size: 8 },
        { top: "75%", left: "85%", size: 6 },
      ].map((dot, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute rounded-full bg-primary/20"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
          }}
        />
      ))}

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="relative rounded-[18px] bg-linear-to-r from-secondary to-primary p-0.5">
          {/* Mask */}
          <div className="absolute inset-0.5 rounded-2xl bg-white" />

          <div className="relative rounded-2xl bg-white px-10 py-14 flex flex-col items-center text-center gap-6">
            {/* 404 badge */}
            <span className="inline-block bg-primary/8 text-primary font-notch font-bold text-sm tracking-widest uppercase px-4 py-2 rounded-full border border-primary/20">
              Error 404
            </span>

            {/* Heading */}
            <h1 className="text-[52px] md:text-[72px] font-notch font-bold text-dark leading-none">
              Page <span className="text-primary">Not</span> Found
            </h1>

            {/* Divider line */}
            <div className="w-16 h-0.75 bg-linear-to-r from-primary to-secondary rounded-full" />

            {/* Description */}
            <p className="text-dark/60 font-sans text-base md:text-lg max-w-md leading-relaxed">
              Looks like this page took a wrong turn. The link may be broken, or
              the page may have been moved or removed.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-blue text-white font-bold text-sm tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
              <Link
                href="/solutions"
                className="flex items-center gap-2 px-6 py-3 border border-primary text-primary font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-primary hover:text-white transition-colors"
              >
                Explore Solutions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

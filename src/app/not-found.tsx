import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 md:px-4 py-24 bg-[#F7F9FC] relative overflow-hidden">
      {/* Background blur blobs — matches site pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-0 w-87.5 h-87.5 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-75 h-75 bg-primary/5 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center gap-6 relative z-10">
        {/* Ghost "404" watermark */}
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[260px] md:text-[380px] font-notch font-bold text-dark/4 leading-none select-none pointer-events-none whitespace-nowrap -z-10"
        >
          404
        </span>

        {/* Error label */}
        <span className="inline-block text-primary font-notch font-bold text-sm tracking-widest uppercase border border-primary/30 px-4 py-1.5 rounded-sm bg-primary/5">
          Error 404
        </span>

        {/* Heading — mirrors "Staffing. Rebuilt." style */}
        <h1 className="text-[60px] md:text-[90px] leading-none font-bold text-dark font-notch tracking-tight">
          Page Not<span className="text-secondary">.</span>
          <br />
          Found<span className="text-secondary">.</span>
        </h1>

        {/* Subtext */}
        <p className="text-dark/60 font-sans text-base md:text-lg max-w-lg leading-relaxed mt-2">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* CTA buttons — exact same pattern as Banner */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <Link
            href="/"
            className="bg-primary text-white px-8 py-4 rounded-[5px] flex items-center justify-center gap-2 font-bold uppercase hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Back to Home
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/solutions"
            className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-[5px] flex items-center justify-center gap-2 font-bold uppercase hover:bg-gray-50 transition-colors"
          >
            Explore Solutions
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}

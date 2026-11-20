import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export const Bannertwo = () => {
  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        {/*
          Phones: the strip image is 1920x250, so at phone width its text shrinks
          to a few pixels. Below md the same words are set as live text instead;
          from md up the original artwork is shown. The hidden image is lazy, so
          phones never download it.
        */}
        <div className="md:hidden my-6 flex items-center gap-4 rounded-2xl border border-primary/15 bg-linear-to-r from-white to-[#EEF3FF] px-5 py-4 shadow-[0_8px_24px_-16px_rgba(0,0,255,0.35)]">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="size-6 text-primary" aria-hidden="true" />
          </span>
          <p className="flex flex-col leading-tight">
            <span className="font-notch font-bold text-primary text-[20px]">ISO/IEC 27001:2022</span>
            <span className="font-notch font-bold text-dark text-[17px]">Certified</span>
            <span className="mt-1 text-[14px] text-dark/75">Your data. Our responsibility.</span>
          </p>
        </div>
        <Image
          src="/banner/ISO Strip - Transparent.png"
          alt="ISO/IEC 27001:2022 certified. Your data. Our responsibility."
          width={1920}
          height={250}
          // Sits below the hero: it loads normally so it never competes with the hero image.
          sizes="(max-width: 1280px) 100vw, 1216px"
          className="hidden md:block w-full h-auto"
        />
      </div>
    </section>
  );
};

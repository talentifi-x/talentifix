"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const steps = [
  {
    title: "Discovery",
    days: "(DAY 1)",
    desc: "Understanding role requirements, culture, and expectations",
    icon: "/assets/home/how/discovery.png",
  },
  {
    title: "AI Screening",
    days: "(DAY 2-5)",
    desc: "Large-scale filtering for skills, experience, and patterns",
    icon: "/assets/home/how/ai.png",
  },
  {
    title: "Human Evaluation",
    days: "(DAY 6-10)",
    desc: "Cultural fit, intent, communication, and potential",
    icon: "/assets/home/how/human.png",
  },
  {
    title: "Delivery",
    days: "(DAY 11-12)",
    desc: "3–5 highly qualified finalists, no noise",
    icon: "/assets/home/how/delivery.png",
  },
  {
    title: "Ongoing Partnership",
    days: "",
    desc: "Support beyond placement to ensure long-term success",
    icon: "/assets/home/how/ongoing.png",
  },
];

/**
 * Fills each visible connector as the section scrolls into view and marks the
 * steps the fill has reached. A track (data-fill-track, data-axis="x" | "y")
 * gets --fill (0 to 1); its steps (data-step) get data-active.
 * - Across (desktop): fills while the row moves from 85% to 40% of the window height.
 * - Down (phone and tablet): the fill's end follows a line 60% down the window.
 */
function useScrollFill(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      section.querySelectorAll<HTMLElement>("[data-fill-track]").forEach((track) => {
        if (track.offsetParent === null) return; // hidden at this screen size
        const rect = track.getBoundingClientRect();
        const across = track.dataset.axis === "x";
        const length = across ? rect.width : rect.height;
        const fill = reduce
          ? 1
          : across
            ? Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.45)))
            : Math.min(1, Math.max(0, (vh * 0.6 - rect.top) / Math.max(1, length)));
        track.style.setProperty("--fill", fill.toFixed(4));
        track.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => {
          const box = step.getBoundingClientRect();
          // The point on the connector where this step's icon sits.
          const at = across ? box.left + box.width / 2 - rect.left : box.top + 60 - rect.top;
          step.dataset.active = String(fill * length >= at - 4);
        });
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [root]);
}

/** The faint track plus the glowing fill drawn to --fill along it. */
function Connector({ axis, className }: { axis: "x" | "y"; className: string }) {
  const across = axis === "x";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <div
        className={`absolute inset-0 rounded-full opacity-20 ${across ? "bg-linear-to-r" : "bg-linear-to-b"} from-[#0000FF] to-[#00DDE2]`}
      />
      <div
        className={`absolute rounded-full ${across ? "inset-y-0 left-0 bg-linear-to-r" : "inset-x-0 top-0 bg-linear-to-b"} from-[#0000FF] to-[#00DDE2] shadow-[0_0_12px_rgba(0,221,226,0.85),0_0_26px_rgba(0,0,255,0.45)] transition-[width,height] duration-150 ease-out`}
        style={across ? { width: "calc(var(--fill, 0) * 100%)" } : { height: "calc(var(--fill, 0) * 100%)" }}
      >
        {/* Bright head at the leading edge of the fill */}
        <span
          className={`absolute size-3 rounded-full bg-white shadow-[0_0_10px_4px_rgba(0,221,226,0.9)] ${
            across ? "right-0 top-1/2 -translate-y-1/2 translate-x-1/2" : "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          }`}
          style={{ opacity: "calc(min(var(--fill, 0) * 20, 1) * min((1 - var(--fill, 0)) * 20, 1))" }}
        />
      </div>
    </div>
  );
}

/** Icon that glows and grows a little once the fill reaches its step. */
function StepIcon({ src, size }: { src: string; size: number }) {
  return (
    <div
      className="relative transition-[transform,filter] duration-500 group-data-[active=true]/step:scale-105 group-data-[active=true]/step:drop-shadow-[0_0_14px_rgba(0,221,226,0.75)]"
      style={{ width: size, height: size }}
    >
      <Image src={src} alt="" fill sizes={`${size}px`} className="object-contain" />
    </div>
  );
}

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollFill(sectionRef);

  return (
    <section ref={sectionRef} className="w-full lg:py-24 py-12 bg-[#F2F4F8]">
      <div className="max-w-7xl mx-auto px-site flex flex-col items-center gap-12 md:gap-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 md:gap-6 text-center">
          <h2 className="text-[32px] md:text-[40px] lg:text-[54px] font-bold font-notch text-black leading-tight">
            How It <span className="text-primary">Works</span>
            <span className="text-secondary">.</span>
          </h2>
          <p className="text-base md:text-lg lg:text-2xl font-bold font-sans text-black">
            A Clear, Human-Centered Process
          </p>
        </div>

        {/* Tablet View (768px–1024px): Icon left + text right with connector */}
        <div className="hidden md:block lg:hidden w-full">
          <div data-fill-track data-axis="y" className="relative w-full max-w-3xl mx-auto">
            <Connector axis="y" className="left-[59px] top-0 bottom-0 w-[3px]" />
            <div className="flex flex-col gap-10">
              {steps.map((step) => (
                <div
                  key={step.title}
                  data-step
                  className="group/step hover-pop relative z-10 flex items-start gap-8"
                >
                  <div className="shrink-0">
                    <StepIcon src={step.icon} size={120} />
                  </div>

                  <div className="flex flex-col gap-2 pt-4">
                    <h3 className="text-[22px] md:text-[23px] lg:text-[28px] font-bold font-notch text-black leading-tight transition-colors duration-500 group-data-[active=true]/step:text-primary">
                      {step.title}
                    </h3>
                    {step.days && (
                      <span className="text-[14px] font-bold font-sans text-black uppercase tracking-wide">
                        {step.days}
                      </span>
                    )}
                    <p className="text-[15px] font-sans text-black font-medium leading-relaxed opacity-80 max-w-[38rem]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View (≥1024px): Single row with small icons + connector */}
        <div data-fill-track data-axis="x" className="hidden lg:block relative w-full">
          <Connector axis="x" className="left-0 right-0 top-[52px] h-[3px]" />
          <div className="grid w-full grid-cols-5 gap-6 lg:gap-8">
            {steps.map((step) => (
              <div
                key={step.title}
                data-step
                className="group/step hover-pop relative flex flex-col items-center gap-4 text-center z-10"
              >
                <StepIcon src={step.icon} size={104} />

                <div className="flex flex-col gap-1">
                  <h3 className="text-[18px] lg:text-[23px] font-bold font-notch text-black leading-tight transition-colors duration-500 group-data-[active=true]/step:text-primary">
                    {step.title}
                  </h3>
                  {step.days && (
                    <span className="text-xs lg:text-base font-bold font-sans text-black uppercase tracking-wide">
                      {step.days}
                    </span>
                  )}
                </div>

                <p className="text-xs lg:text-sm font-sans text-black font-medium leading-relaxed opacity-80 max-w-[190px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View (Vertical Timeline) - Matches Image */}
        <div data-fill-track data-axis="y" className="flex md:hidden flex-col items-center w-full relative gap-8 mt-4">
          {/* Vertical Connecting Line */}
          <Connector axis="y" className="top-0 bottom-0 left-1/2 w-[4px] -translate-x-1/2" />

          {steps.map((step) => (
            <div
              key={step.title}
              data-step
              className="group/step relative z-10 flex flex-col items-center text-center gap-4 w-full"
            >
              <StepIcon src={step.icon} size={120} />

              {/* Text */}
              <div className="flex flex-col gap-1 items-center bg-[#F2F4F8] px-2 pt-2 pb-4 w-full">
                <h3 className="text-[28px] font-bold font-notch text-black leading-tight transition-colors duration-500 group-data-[active=true]/step:text-primary">
                  {step.title}
                </h3>
                {step.days && (
                  <span className="text-[16px] font-bold font-sans text-black uppercase tracking-wide">
                    {step.days}
                  </span>
                )}
                <p className="text-[16px] font-sans text-black font-medium max-w-[260px] leading-snug mt-2 opacity-80">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Callout */}
        <div className="hover-pop relative p-[3px] rounded-[10px] bg-linear-to-r from-[#0000FF] via-white to-[#00DDE2] w-full md:w-auto hover:shadow-[0_18px_40px_-18px_rgba(0,0,255,0.45)]">
          <div className="bg-[#F2F4F8] rounded-[8px] px-6 py-6 md:px-16 md:py-8">
            <p className="text-[18px] md:text-2xl font-bold font-sans text-black text-center leading-tight">
              Your total time investment: ~4 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

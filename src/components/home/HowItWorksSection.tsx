import React from "react";
import Image from "next/image";

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Discovery",
      days: "(DAY 1)",
      desc: "Understanding role requirements, culture, and expectations",
      icon: "/assets/figma/how-icon-discovery.png",
    },
    {
      title: "AI Screening",
      days: "(DAY 2-5)",
      desc: "Large-scale filtering for skills, experience, and patterns",
      icon: "/assets/figma/how-icon-ai.png",
    },
    {
      title: "Human Evaluation",
      days: "(DAY 6-10)",
      desc: "Cultural fit, intent, communication, and potential",
      icon: "/assets/figma/how-icon-human.png",
    },
    {
      title: "Delivery",
      days: "(DAY 11-12)",
      desc: "3–5 highly qualified finalists, no noise",
      icon: "/assets/figma/how-icon-delivery.png",
    },
    {
      title: "Ongoing Partnership",
      days: "",
      desc: "Support beyond placement to ensure long-term success",
      icon: "/assets/figma/how-icon-ongoing.png",
    },
  ];

  return (
    <section className="w-full lg:py-24 py-12 bg-[#F2F4F8]">
      <div className="max-w-7xl mx-auto px-4 lg:px-4 flex flex-col items-center gap-12 md:gap-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 md:gap-6 text-center">
          <h2 className="text-[clamp(32px,4.5vw,54px)] font-bold font-notch text-black leading-tight">
            How It <span className="text-primary">Works</span>
            <span className="text-secondary">.</span>
          </h2>
          <p className="text-[clamp(16px,2vw,24px)] font-bold font-sans text-black">
            A Clear, Human-Centered Process
          </p>
        </div>

        {/* Tablet View (768px–1024px): Icon left + text right with connector */}
        <div className="hidden md:block lg:hidden w-full">
          <div className="relative w-full max-w-3xl mx-auto">
            <div className="absolute left-[60px] top-0 bottom-0 w-[3px] bg-linear-to-b from-[#0000FF] to-[#00DDE2] opacity-25" />
            <div className="flex flex-col gap-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative z-10 flex items-start gap-8"
                >
                  <div className="shrink-0">
                    <div className="relative w-[120px] h-[120px]">
                      <Image
                        src={step.icon}
                        alt={step.title}
                        fill
                        sizes="120px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-4">
                    <h3 className="text-[clamp(22px,2.6vw,28px)] font-bold font-notch text-black leading-tight">
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
        <div className="hidden lg:block relative w-full">
          <div className="absolute left-0 right-0 top-[52px] h-[3px] bg-linear-to-r from-[#0000FF] to-[#00DDE2] opacity-20" />
          <div className="grid w-full grid-cols-5 gap-6 xl:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center gap-4 text-center z-10"
              >
                <div className="relative w-[104px] h-[104px]">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    fill
                    sizes="104px"
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-[clamp(18px,1.6vw,26px)] font-bold font-notch text-black leading-tight">
                    {step.title}
                  </h3>
                  {step.days && (
                    <span className="text-[clamp(12px,1.1vw,16px)] font-bold font-sans text-black uppercase tracking-wide">
                      {step.days}
                    </span>
                  )}
                </div>

                <p className="text-[clamp(12px,1.05vw,14px)] font-sans text-black font-medium leading-relaxed opacity-80 max-w-[190px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View (Vertical Timeline) - Matches Image */}
        <div className="flex md:hidden flex-col items-center w-full relative gap-8 mt-4">
          {/* Vertical Connecting Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[4px] bg-linear-to-b from-[#0000FF] to-[#00DDE2] -translate-x-1/2 opacity-30" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center text-center gap-4 w-full"
            >
              <div className="relative w-[120px] h-[120px]">
                <Image
                  src={step.icon}
                  alt={step.title}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1 items-center bg-[#F2F4F8] px-2 pt-2 pb-4 w-full">
                <h3 className="text-[28px] font-bold font-notch text-black leading-tight">
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
        <div className="relative p-[3px] rounded-[10px] bg-linear-to-r from-[#0000FF] via-white to-[#00DDE2] w-full md:w-auto">
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

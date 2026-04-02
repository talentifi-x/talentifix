import React from "react";
import Image from "next/image";

const WhereWeSpecializeSection = () => {
  const specializations = [
    "IT & New-Age Technology",
    "Finance & accounting",
    "Healthcare",
    "Legal",
    "Human Resources",
    "Administrative",
    "Light Industrial",
  ];

  return (
    <section className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/figma/specialize-bg.png"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          quality={100}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center gap-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="lg:text-[54px] text-[48px] font-bold font-notch text-black leading-tight">
            Where We Specialize.
          </h2>
          <p className="lg:text-2xl text-[20px] font-sans text-black">
            Expert recruiters. Industry-specific understanding.
          </p>
        </div>

        {/* Chips Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl">
          {specializations.map((item, index) => (
            <div
              key={index}
              className="px-12 lg:py-6 py-4 rounded-full bg-white/40 backdrop-blur-md border border-transparent relative group"
            >
              {/* Gradient Border Trick */}
              <div
                className="absolute inset-0 rounded-full p-0.5 -z-10"
                style={{
                  background:
                    "linear-gradient(270deg, #00DDE2 0%, #FFFFFF 49%, #0000FF 100%)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                }}
              />
              <span className="lg:text-2xl text-[16px] font-bold font-sans text-black uppercase">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center">
          <p className="text-2xl font-sans text-black">
            <span className="font-bold">No guessing. No generalists.</span>
            <br />
            Only specialists who understand your world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhereWeSpecializeSection;

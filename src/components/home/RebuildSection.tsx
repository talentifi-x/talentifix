import React from "react";
import Image from "next/image";
import { BrainCircuit, Lightbulb } from "lucide-react";

export const RebuildSection = () => {
  return (
    <section className="w-full relative lg:py-32 py-10 overflow-hidden bg-white">
      {/*
        The 3D logo and the blue/red data streams are baked into the background
        image (1536x1024), not rendered as elements - the centre column below is
        a deliberately empty placeholder. So the art only lines up with the
        content while the two are roughly the same width.

        Full-bleed `object-cover` broke that on wide screens: covering a
        viewport-width box with a 1.5-aspect image zooms it 1.07x at 1440px but
        1.67x at 2560px and 2.5x at 3840px, while the cards stay pinned to
        max-w-7xl (1280px). The baked-in logo grew while the cards did not.

        Capping the art at 1920px freezes the zoom at 1.25x beyond that, so
        every screen wider than 1920px renders the same composition that
        already looks correct at ~1920px. Behaviour at or below 1920px is
        unchanged.
      */}
      <div className="absolute inset-0 z-0 mx-auto w-full max-w-[1920px]">
        {/* Desktop Image */}
        <Image
          src="/banner-home/talentifi-x-logo-data-streams-background.webp"
          alt=""
          fill
          sizes="(max-width: 1920px) 100vw, 1920px"
          className="hidden md:block object-cover"
          quality={100}
        />
        {/*
          Past the cap the art no longer reaches the viewport edge. Its own
          edges are saturated mid-band colours (#326EAE left, #EFD5DC right),
          so a hard stop against the white section would seam. These dissolve
          it instead, and are inert at or below the cap.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-linear-to-r from-white to-transparent min-[1921px]:block min-[2400px]:w-44"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-linear-to-l from-white to-transparent min-[1921px]:block min-[2400px]:w-44"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center">
        {/* Header */}
        <div className="text-center lg:translate-y-[-50%]">
          <h2 className="text-[50px] lg:text-[54px] font-notch font-bold text-dark mb-6">
            The Rebuild<span className="text-secondary">.</span>
          </h2>
          <p className="text-[20px] lg:text-[24px] text-dark leading-relaxed">
            We didn’t add AI to staffing.
            <br />
            We rebuilt staffing around it.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-16 lg:mt-0 mt-20">
          {/* Left Column: AI */}
          <div className="flex flex-col gap-6 md:items-end md:text-left">
            <div className="flex items-center gap-4 md:flex-row">
              <div className="">
                <Image
                  src="/icons/cloud.svg"
                  alt="AI Icon"
                  width={60}
                  height={60}
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-dark">AI now does</h3>
                <p className="text-lg text-dark">What machines do best:</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border-3 border-white/70 rounded-[10px] p-6 w-full md:max-w-[280px] shadow-sm">
              <ul className="flex flex-col gap-2">
                <li className="text-[18px] text-dark font-medium">• Speed</li>
                <li className="text-[18px] text-dark font-medium">• Scale</li>
                <li className="text-[18px] text-dark font-medium">
                  • Pattern Recognition
                </li>
              </ul>
            </div>
          </div>

          {/* Center Column: Logo Placeholder (Assuming logo is part of bg or needs to be added) */}
          <div className="flex justify-center items-center md:h-[300px] lg:h-[460px]">
            {/* If there is a separate 3D logo asset, it goes here. 
                 For now, we'll assume the central space is for the graphic. 
                 If the graphic is NOT in the bg, we might need a placeholder. 
                 I'll add a placeholder div that is transparent if the user has the image in BG, 
                 or ready for an image tag. 
             */}
            {/*
              On phones the art lives here, inside the spacer, rather than in
              the full-bleed layer above: the spacer IS the gap between the two
              cards, so the grid's gap-8 guarantees the margin above and below.

              w-screen breaks it out of the container padding so it reaches
              both viewport edges (the section's overflow-hidden clips the
              bleed), and the box holds a fixed 5:3 ratio. A fixed pixel height
              could not: covering 320x300 shows 42% of this 2:3 image while
              covering 756x300 shows only 26%, so the baked-in logo swung from
              a sixth of the frame to filling it edge to edge. A constant ratio
              renders one composition at every phone width, with the logo
              always 65% of the box height.

              That logo is centred at 50.78% x 45.05% of the source, so the
              default 50% object-position hangs it above the middle. 42% puts
              its centre within 2px of the box centre at every width.
            */}
            <div className="relative w-screen shrink-0 aspect-[5/3] md:hidden overflow-hidden">
              <Image
                src="/banner-home/mobile-rebuild.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-[50%_42%]"
                quality={100}
              />
            </div>
            {/* Desktop keeps the logo in the full-bleed background layer. */}
            <div className="hidden md:block w-[200px] h-[200px] relative" />
          </div>

          {/* Right Column: Humans */}
          <div className="flex flex-col gap-6 md:items-start md:text-left ">
            <div className="flex items-center gap-4">
              <div className="">
                <Image
                  src="/icons/inspire.svg"
                  alt="Human Icon"
                  width={60}
                  height={60}
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-dark">Humans do</h3>
                <p className="text-lg text-dark">what only humans can:</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border-3 border-white/70 rounded-[10px] p-6 w-full md:max-w-[280px] shadow-sm">
              <ul className="flex flex-col gap-2">
                <li className="text-[18px] text-dark font-medium">
                  • Judgement
                </li>
                <li className="text-[18px] text-dark font-medium">
                  • Intuition
                </li>
                <li className="text-[18px] text-dark font-medium">
                  • Cultural Understanding
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center">
          <p className="text-3xl font-medium text-dark leading-tight">
            That balance is the system.
          </p>
          <p className="text-3xl font-bold text-dark leading-tight mt-2">
            That system is{" "}
            <span className="font-extrabold text-5xl">TalentiFi-X.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

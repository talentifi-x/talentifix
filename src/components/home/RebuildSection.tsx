import React from "react";
import Image from "next/image";
import { BrainCircuit, Lightbulb } from "lucide-react";

export const RebuildSection = () => {
  return (
    <section className="w-full relative lg:py-32 py-10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Image */}
        <Image
          src="/banner-home/bg-rebuild.webp"
          alt="Background"
          fill
          className="hidden md:block object-cover"
          quality={100}
        />
        {/* Mobile Image */}
        <Image
          src="/banner-home/mobile-rebuild.webp"
          alt="Background Mobile"
          fill
          className="block md:hidden object-cover"
          quality={100}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-4 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center lg:translate-y-[-50%]">
          <h2 className="text-[50px] lg:text-[54px] font-notch font-bold text-dark mb-4">
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
            
            <div className="bg-white/80 backdrop-blur-sm border-3 border-white/70 rounded-[10px] p-6 w-full md:w-[280px] shadow-sm">
              <ul className="flex flex-col gap-2">
                <li className="text-[18px] text-dark font-medium">• Speed</li>
                <li className="text-[18px] text-dark font-medium">• Scale</li>
                <li className="text-[18px] text-dark font-medium">• Pattern Recognition</li>
              </ul>
            </div>
          </div>

          {/* Center Column: Logo Placeholder (Assuming logo is part of bg or needs to be added) */}
          <div className="flex justify-center items-center h-[300px]">
             {/* If there is a separate 3D logo asset, it goes here. 
                 For now, we'll assume the central space is for the graphic. 
                 If the graphic is NOT in the bg, we might need a placeholder. 
                 I'll add a placeholder div that is transparent if the user has the image in BG, 
                 or ready for an image tag. 
             */}
             <div className="w-[200px] h-[200px] relative">
                {/* Placeholder for 3D TF Logo if not in BG */}
             </div>
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
            
            <div className="bg-white/80 backdrop-blur-sm border-3 border-white/70 rounded-[10px] p-6 w-full md:w-[280px] shadow-sm">
              <ul className="flex flex-col gap-2">
                <li className="text-[18px] text-dark font-medium">• Judgement</li>
                <li className="text-[18px] text-dark font-medium">• Intuition</li>
                <li className="text-[18px] text-dark font-medium">• Cultural Understanding</li>
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
            That system is <span className="font-extrabold text-5xl">TalentiFi-X.</span>
          </p>
        </div>

      </div>
    </section>
  );
};

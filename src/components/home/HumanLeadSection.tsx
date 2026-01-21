import React from 'react';
import Image from 'next/image';

export const HumanLeadSection = () => {
  return (
    <section className="w-full relative lg:py-24 py-14 overflow-hidden min-h-200 flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/figma/human-bg.png"
          alt="Human Background"
          fill
          className="object-cover opacity-10"
          quality={100}
        />
      </div>

      {/* Decorative SVGs */}
      <div className="absolute left-[-192px] top-[219px] w-[598px] h-[563px] opacity-30 z-0 pointer-events-none">
        <Image
          src="/assets/figma/human-group-2.svg"
          alt="Decoration Left"
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute right-[-100px] top-[91px] w-[448px] h-[422px] opacity-75 z-0 pointer-events-none">
        <Image
          src="/assets/figma/human-group-3.svg"
          alt="Decoration Right"
          fill
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-4 w-full flex flex-col items-center gap-24">
        
        {/* Heading */}
        <h2 className="text-[40px] md:text-[54px] font-notch font-bold text-black text-center leading-tight max-w-4xl">
          Human-Led. AI-Assisted<span className='text-primary'>.  </span><span className="text-primary">Always</span><span className="text-secondary">.</span>
        </h2>

        {/* Cards Container */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-24 w-full justify-center">
          
          {/* Card 1 */}
          <div className="flex-1 bg-linear-to-b/80 from-white to-[#F2F4F8] border-[3px] border-white rounded-[10px] shadow-[0px_4px_17px_rgba(0,0,0,0.13)] backdrop-blur-[16px] p-8 md:p-[32px_72px] flex flex-col gap-8 h-full min-h-[400px]">
            <div className="relative w-23.5 h-23.5">
              <Image
                src="/assets/figma/human-card-1.png"
                alt="AI Icon"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[21px] font-notch font-extrabold text-dark leading-relaxed">
                AI screens 10,000+ profiles...
                <br />
                But it never makes the final call.
              </p>
              <p className="text-[21px] font-notch font-normal text-dark leading-relaxed">
                Technology supports the process.
                <br />
                Humans own the outcome.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-1 bg-linear-to-b/80 from-white to-[#F2F4F8] border-[3px] border-white rounded-[10px] shadow-[0px_4px_17px_rgba(0,0,0,0.13)] backdrop-blur-[16px] p-8 md:p-[32px_72px] flex flex-col gap-8 h-full min-h-[400px]">
            <div className="relative w-23.5 h-23.5">
              <Image
                src="/assets/figma/human-card-2.png"
                alt="Ethics Icon"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[21px] font-notch font-extrabold text-dark leading-relaxed">
                Ethics, Transparency & Compliance
              </p>
              <ul className="text-[21px] font-notch font-normal text-dark leading-relaxed list-disc flex flex-col gap-2 ml-10">
                <li>Human oversight at every AI layer</li>
                <li>EEOC-aligned AI usage</li>
                <li>Continuous audits for fairness</li>
                <li>Data privacy and security by design</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Footer Text */}
        <p className="text-2xl font-normal font-stack-text text-black text-center">
          Trust isn’t claimed. <span className='text-primary font-bold text-4xl'>It’s engineered.</span>
        </p>

      </div>
    </section>
  );
};

import React from 'react';
import Image from 'next/image';

const TheOriginSection = () => {
  return (
    <section className="relative w-full py-24 bg-dark overflow-hidden">
      
      {/* Decorative Favicon (Bottom Right) */}
      <div className="absolute -right-25 -bottom-25 md:right-25 md:bottom-12.5 w-127.75 h-157.5 opacity-10 pointer-events-none blur-md">
        <Image
          src="/assets/figma/origin-favicon.svg"
          alt="Decoration"
          width={511}
          height={630}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center gap-20">
        
        {/* Quote Block */}
        <div className="relative flex flex-col items-center gap-10 text-center">
            {/* Quote Icon */}
            <div className="absolute -top-12 -left-12 md:-left-24 w-40 h-32 md:w-65 md:h-50 opacity-10 md:opacity-90 pointer-events-none block">
                <Image
                    src="/assets/figma/origin-quote.svg"
                    alt="Quote"
                    width={261}
                    height={198}
                />
            </div>

            <h2 className="lg:text-[54px] text-[40px] font-bold font-notch text-white leading-tight">
                The Origin Story<span className="text-secondary">.</span>
            </h2>
            
            <p className="text-[20px] md:text-[40px] font-sans text-white leading-tight font-normal">
                TalentiFi-X was built after <span className="text-secondary">23+ years in staffing. </span>
                Years spent seeing what slows teams down.
                What causes mis-hires. What gets ignored.
                <br /><br />
                <span className="opacity-60 md:opacity-100">
                Experience gave us clarity. Urgency gave us momentum.
                </span>
            </p>
        </div>

        {/* Timeline */}
        <div className="w-full flex flex-col gap-4">
             {/* Timeline Graphic */}
             <div className="w-full h-auto flex justify-center">
                 {/* Assuming origin-timeline.svg is the line/dots graphic */}
                 <Image
                    src="/assets/figma/origin-timeline.svg"
                    alt="Timeline"
                    width={840}
                    height={28}
                    className="w-full max-w-[840px]"
                 />
             </div>
             
             {/* Years Labels */}
             <div className="w-full max-w-[840px] mx-auto flex justify-between px-2">
                 <span className="text-[32px] font-bold font-notch text-white">
                    1999
                 </span>
                 <span className="text-[32px] font-bold font-notch text-[#00DDE2]">
                    Today
                 </span>
             </div>
        </div>

      </div>
    </section>
  );
};

export default TheOriginSection;

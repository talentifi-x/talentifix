import React from 'react';
import Image from 'next/image';
import { Mail, Globe } from 'lucide-react';

const TheNextStepSection = () => {
  return (
    <section className="w-full py-24 px-4 md:px-4 max-w-7xl mx-auto rounded-2xl my-4 relative bg-white overflow-hidden flex flex-col items-center justify-center lg:min-h-125 shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner-home/Next.webp"
          alt="The Next Step Background"
          fill
          className="object-cover object-top"
          quality={100}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 md:gap-12 max-w-5xl mx-auto w-full">
        
        {/* Headings */}
        <div className="flex flex-col items-center gap-4 md:gap-6 -translate-y-10 md:-translate-y-20 px-4">
          <h2 className="text-[42px] md:text-[80px] font-bold font-notch text-black leading-[1.1] md:leading-none uppercase tracking-tight">
            The Next <span className="text-secondary">Step</span><span className="text-primary">.</span>
          </h2>
          <p className="text-[20px] md:text-[28px] font-medium font-sans text-black leading-snug md:leading-tight max-w-75 md:max-w-none">
            Hiring doesn’t need to be complicated. <br />
            <span className="text-[#0000FF] font-bold">It needs to be intentional.</span>
          </p>
        </div>

        {/* Contact Bar */}
        <div className="mt-4 md:mt-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16 bg-white/90 md:bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg p-6 md:px-8 md:py-4 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] w-[90%] md:w-auto mx-auto">
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Mail className="w-5 h-5 md:w-6 md:h-6 text-[#0000FF] flex-shrink-0" />
            <span className="text-[16px] md:text-2xl font-bold text-black break-all md:break-normal">hello@talentifi-x.com</span>
          </div>

          <div className="w-full h-[1px] md:w-[1px] md:h-8 bg-gray-200 md:bg-gray-300 block md:hidden" />
          <div className="w-[1px] h-8 bg-gray-300 hidden md:block" />

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Globe className="w-5 h-5 md:w-6 md:h-6 text-[#0000FF] flex-shrink-0" />
            <span className="text-[16px] md:text-2xl font-bold text-black break-all md:break-normal">www.talentifix.com</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TheNextStepSection;

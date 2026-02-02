import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Banner = () => {
  return (
    <section className="w-full pt-12 pb-24 px-6 md:px-4  bg-[#F7F9FC]">
      <div className=" max-w-7xl mx-auto flex flex-col-reverse lg:flex-row lg:items-center items-start justify-between lg:gap-12 relative overflow-hidden">
      {/* Left Content */}
      <div className="flex flex-col gap-8  lg:mt-0 -mt-20 z-10">
        <h1 className="text-[50px] md:text-[80px] leading-none font-bold text-dark font-notch tracking-tight">
          Staffing<span className="text-secondary">.</span> <br />
          Rebuilt<span className="text-secondary">.</span>
        </h1>
        
        <div className="flex flex-col  gap-4 mt-4">
          <Link
            href="/start-hiring"
            className="bg-primary text-white px-8 py-4 rounded-[5px] flex items-center justify-center gap-2 font-bold uppercase hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Hire Smarter
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/join-our-network"
            className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-[5px] flex items-center justify-center gap-2 font-bold uppercase hover:bg-gray-50 transition-colors"
          >
            Find Your Next Opportunity
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Right Content - 3D Graphic */}
      <div className="relative w-full lg:w-[600px]  h-[500px] flex items-end lg:items-center justify-center">
          {/* Main 3D T Graphic Placeholder/Image */}
          <div className="relative w-[750px] h-[651px]  z-10">
               <Image 
                 src="/banner-home/banner.webp" 
                 alt="Staffing Rebuilt 3D Graphic" 
                 fill 
                 className="object-contain"
                 priority
               />
          </div>

          {/* Floating Stats Card 1 (Top Right) */}
          <div className="absolute lg:top-[10%] top-[1%] right-[5%] -md:right-5 p-4 rounded-lg shadow-xl flex items-start gap-3 z-20 animate-bounce-slow bg-white/80">
             <div className="w-6 h-6 bg-primary rounded-[4px] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
             </div>
             <div>
                <p className="text-[24px] font-bold text-dark leading-none">94%</p>
                <p className="text-sm text-gray-900">90-day retention</p>
             </div>
          </div>

          {/* Floating Stats Card 2 (Bottom Left) */}
          <div className="absolute w-[200px] lg:bottom-[10%] bottom-[30%] left-[0%] -md:left-10 px-4 py-2 rounded-lg shadow-xl items-start gap-3 z-20 animate-bounce-slow delay-700 flex flex-col bg-white/80">
             <div className="flex items-center justify-center text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
             </div>
             <div>
                <p className="text-sm font-bold text-dark">12 days to qualified candidates</p>
             </div>
          </div>

          {/* Background Glow/Blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-2xl -z-10"></div>
      </div>
     </div>
    </section>
  );
};

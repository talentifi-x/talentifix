"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const WhoSection = () => {
  const [activeTab, setActiveTab] = useState<'leaders' | 'teams' | 'talent'>('leaders');

  return (
    <section className="w-full bg-[#F2F4F8] lg:py-24 py-14 relative overflow-hidden">
      {/* Background Favicon */}
      <div className="absolute -left-28 -top-9.75 w-86.75 h-107 pointer-events-none opacity-100">
        <Image
          src="/banner-home/icons/who.svg"
          alt="Favicon Background"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-4 flex flex-col items-center gap-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-[40px] md:text-[54px] font-notch font-bold text-black leading-tight">
            Who This Is Built For<span className="text-secondary">.</span>
          </h2>
          <p className="text-[20px] md:text-[24px] font-semibold text-black">
            TalentiFi-X is built for companies and professionals who refuse to settle.
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-7xl bg-white rounded-[20px] shadow-[0px_10px_40px_rgba(0,0,0,0.05)] overflow-hidden">
          
          {/* Tabs Header */}
          <div className="flex w-full border-b border-[#ECECEC]">
            {/* Leaders Tab */}
            <button
              onClick={() => setActiveTab('leaders')}
              className={`flex-1 py-8 text-center transition-all relative ${
                activeTab === 'leaders' ? 'text-black' : 'text-[#A0A0A0]'
              }`}
            >
              <span className="text-[18px] md:text-[20px] font-bold font-sans uppercase tracking-wider">
                Leaders
              </span>
              {activeTab === 'leaders' && (
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-light to-primary shadow-[0px_-4px_10px_rgba(0,0,255,0.3)]" />
              )}
            </button>

            {/* Teams Tab */}
            <button
              onClick={() => setActiveTab('teams')}
              className={`flex-1 py-8 text-center transition-all relative ${
                activeTab === 'teams' ? 'text-black' : 'text-[#A0A0A0]'
              }`}
            >
              <span className="text-[18px] md:text-[20px] font-bold font-sans uppercase tracking-wider">
                Teams
              </span>
              {activeTab === 'teams' && (
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#0000FF] shadow-[0px_-4px_10px_rgba(0,0,255,0.3)]" />
              )}
            </button>

            {/* Talent Tab */}
            <button
              onClick={() => setActiveTab('talent')}
              className={`flex-1 py-8 text-center transition-all relative ${
                activeTab === 'talent' ? 'text-black' : 'text-[#A0A0A0]'
              }`}
            >
              <span className="text-[18px] md:text-[20px] font-bold font-sans uppercase tracking-wider">
                Talent
              </span>
              {activeTab === 'talent' && (
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#0000FF] shadow-[0px_-4px_10px_rgba(0,0,255,0.3)]" />
              )}
            </button>
          </div>

          {/* Content Area */}
          <div className="p-8 md:p-16 min-h-[400px] flex items-center">
            {activeTab === 'leaders' && (
              <div className="w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">
                {/* Hexagon Image */}
                <div className="relative w-[280px] h-[300px] md:w-[320px] md:h-[340px] flex-shrink-0">
                  <div className="relative w-full h-full" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                     <Image
                       src="/assets/figma/who-polygon.png"
                       alt="Leaders"
                       fill
                       className="object-cover"
                     />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-6 max-w-[600px]">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[40px] md:text-[54px] font-notch font-bold text-black leading-tight">
                      Leaders<span className="text-[#00DDE2]">.</span>
                    </h3>
                    <p className="text-[20px] md:text-[24px] font-semibold font-sans text-black leading-relaxed">
                      Hiring roles that actually matter
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-6">
                    {/* Primary Button */}
                    <Link
                      href="/start-hiring"
                      className="flex items-center gap-3 px-8 py-3 bg-linear-to-l from-blue-light to-primary rounded-sm text-white transition-all hover:bg-primary shadow-md"
                    >
                      <span className="text-[18px] font-medium font-sans">
                        Hire Talent
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>



                    {/* Secondary Button */}
                    <Link
                      href="/join-our-network"
                      className="flex items-center gap-3 px-8 py-3 border border-[#0000FF] rounded-sm text-[#0000FF] transition-all hover:bg-[#0000FF]/5"
                    >
                      <span className="text-[18px] font-medium font-sans">
                        Build Your Career
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'teams' && (
              <div className="w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">
                <div className="relative w-[280px] h-[300px] md:w-[320px] md:h-[340px] flex-shrink-0">
                  <div className="relative w-full h-full" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                     <Image
                       src="/assets/figma/who-polygon.png"
                       alt="Teams"
                       fill
                       className="object-cover"
                     />
                  </div>
                </div>

                <div className="flex flex-col gap-6 max-w-[600px]">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[40px] md:text-[54px] font-notch font-bold text-black leading-tight">
                      Teams<span className="text-[#00DDE2]">.</span>
                    </h3>
                    <p className="text-[20px] md:text-[24px] font-semibold font-sans text-black leading-relaxed">
                      Teams that can’t afford mis-hires
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link
                      href="/start-hiring"
                      className="flex items-center gap-3 px-8 py-3 bg-linear-to-l from-blue-light to-primary rounded-sm text-white transition-all hover:bg-primary shadow-md"
                    >
                      <span className="text-[18px] font-medium font-sans">
                        Hire Talent
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>

                    <Link
                      href="/join-our-network"
                      className="flex items-center gap-3 px-8 py-3 border border-[#0000FF] rounded-sm text-[#0000FF] transition-all hover:bg-[#0000FF]/5"
                    >
                      <span className="text-[18px] font-medium font-sans">
                        Build Your Career
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'talent' && (
              <div className="w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">
                <div className="relative w-[280px] h-[300px] md:w-[320px] md:h-[340px] flex-shrink-0">
                  <div className="relative w-full h-full" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                     <Image
                       src="/assets/figma/who-polygon.png"
                       alt="Talent"
                       fill
                       className="object-cover"
                     />
                  </div>
                </div>

                <div className="flex flex-col gap-6 max-w-[600px]">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[40px] md:text-[54px] font-notch font-bold text-black leading-tight">
                      Talent<span className="text-[#00DDE2]">.</span>
                    </h3>
                    <p className="text-[20px] md:text-[24px] font-semibold font-sans text-black leading-relaxed">
                      Talent seeking alignment, not randomness
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link
                      href="/start-hiring"
                      className="flex items-center gap-3 px-8 py-3 bg-linear-to-l from-blue-light to-primary rounded-sm text-white transition-all hover:bg-primary shadow-md"
                    >
                      <span className="text-[18px] font-medium font-sans">
                        Hire Talent
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>

                    <Link
                      href="/join-our-network"
                      className="flex items-center gap-3 px-8 py-3 border border-[#0000FF] rounded-sm text-[#0000FF] transition-all hover:bg-[#0000FF]/5"
                    >
                      <span className="text-[18px] font-medium font-sans">
                        Build Your Career
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

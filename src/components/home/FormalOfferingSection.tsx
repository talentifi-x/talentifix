import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const OfferingCard = ({
  icon,
  title,
  description,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
}) => (
  <div className="flex flex-col h-full">
    <div className="bg-white/30 backdrop-blur-xl border-[3px] border-white rounded-[10px] shadow-[0px_4px_7px_rgba(0,0,0,0.07)] p-8 md:p-12 flex flex-col gap-8 h-full transition-transform hover:-translate-y-2 hover:shadow-lg">
      <div className="flex items-center gap-8">
        <div className="relative flex items-center justify-center">
          <Image
            src={icon}
            alt={title}
            width={60}
            height={60}
            className="object-contain "
          />
        </div>
        <h3 className="text-[24px] font-bold font-stack-text text-dark leading-tight">
          {title}
        </h3>
      </div>
      <p className=" lg:text-[24px] font-bold font-stack-text text-dark leading-relaxed opacity-90">
        {description}
      </p>

      {/* Know More Button */}
      <div className="mt-auto pt-4 flex flex-col items-start gap-1">
        <Link href={href} className="flex items-center gap-2 text-primary text-[22px] font-bold group">
          Know More
          <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
        </Link>
        <div className="w-[140px] h-[4px] text-secondary rounded-full" />
      </div>
    </div>
  </div>
);

export const FormalOfferingSection = () => {
  return (
    <section className="w-full bg-[#F2F4F8] py-24 relative overflow-hidden">
      {/* Background Favicon */}
      <div className="absolute -right-12.5 -top-14.5 w-68 h-83.75 pointer-events-none opacity-20">
        <Image
          src="/assets/figma/formal-favicon.svg"
          alt="Favicon Background"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-4 flex flex-col items-center gap-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 text-center max-w-4xl">
          <h2 className="text-[40px] md:text-[54px] font-notch font-bold text-black leading-tight">
            Formal Offerings
          </h2>
          <p className="text-[20px] md:text-[24px] font-normal text-black">
            Every role deserves intention. Every hire deserves precision.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <OfferingCard
            icon="/assets/figma/formal-icon-1.svg"
            title="Temporary Staffing"
            description="Flexible workforce Solutions for project-based or seasonal needs — designed for speed without sacrificing quality."
            href="/solutions#temporary-staffing"
          />
          <OfferingCard
            icon="/assets/figma/formal-icon-2.svg"
            title="Permanent Placement"
            description="Long-term hiring focused on performance, culture, and retention. Because the right hire compounds over time."
            href="/solutions#permanent-placement"
          />
          <OfferingCard
            icon="/assets/figma/formal-icon-3.svg"
            title="Contract-to-Hire"
            description="Evaluate talent in real working environments before committing long-term."
            href="/solutions#contract-to-hire"
          />
          <OfferingCard
            icon="/assets/figma/formal-icon-4.svg"
            title="Executive Search"
            description="Confidential, insight-driven leadership hiring for roles where judgment matters most."
            href="/solutions#executive-search"
          />
        </div>
      </div>
    </section>
  );
};

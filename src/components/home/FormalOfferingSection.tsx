import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <div className="hover-pop bg-white/30 backdrop-blur-xl border-[3px] border-white rounded-[10px] shadow-[0px_4px_7px_rgba(0,0,0,0.07)] p-8 md:p-12 flex flex-col gap-8 h-full hover:-translate-y-2 hover:shadow-lg">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-6">
        <div className="relative flex shrink-0 items-center justify-center">
          <Image
            src={icon}
            alt=""
            width={60}
            height={60}
            className="object-contain "
          />
        </div>
        <h3 className="text-[24px] font-bold font-stack-text text-dark leading-tight">
          {title}
        </h3>
      </div>
      <p className="text-[17px] lg:text-[20px] font-medium font-stack-text text-dark/80 leading-relaxed">
        {description}
      </p>

      {/* Know More Button */}
      <div className="mt-auto pt-4 flex flex-col items-start gap-1">
        <Link
          href={href}
          className="flex items-center gap-2 min-h-11 text-primary text-[22px] font-bold group"
        >
          Know More
          {/* Visible text stays "Know More"; the link's name says where it goes. */}
          <span className="sr-only"> about {title}</span>
          <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </div>
);

export const FormalOfferingSection = () => {
  return (
    <section aria-labelledby="staffing-recruitment-heading" className="w-full bg-[#F2F4F8] py-24 relative overflow-hidden">
      {/* Background Favicon */}
      <div className="absolute -right-12.5 -top-14.5 w-68 h-83.75 pointer-events-none opacity-20">
        <Image
          src="/assets/figma/formal-favicon.svg"
          alt=""
          fill
          sizes="272px"
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-site flex flex-col items-center gap-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 text-center max-w-4xl">
          <h2 id="staffing-recruitment-heading" className="text-[40px] md:text-[54px] font-notch font-bold text-black leading-tight">
            Staffing and Recruitment Services
          </h2>
          <p className="text-[20px] md:text-[24px] font-normal text-black">
            Choose a hiring model for your team in India or the USA, from
            project-based contract staffing to permanent recruitment and
            executive search.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <OfferingCard
            icon="/assets/figma/formal-icon-1.svg"
            title="Contract and Temporary Staffing"
            description="Hire technology professionals for project delivery, seasonal demand or a specific skills gap. Contract and temporary staffing support teams with a defined scope and duration."
            href="/solutions#temporary-staffing"
          />
          <OfferingCard
            icon="/assets/figma/formal-icon-2.svg"
            title="Permanent Recruitment and Direct Hire"
            description="Build your team with permanent employees. Our recruiters assess technical skills, role expectations and team fit to support long-term hiring decisions."
            href="/solutions#permanent-placement"
          />
          <OfferingCard
            icon="/assets/figma/formal-icon-3.svg"
            title="Contract-to-Hire Staffing"
            description="Start with a contract engagement and assess performance in your team's working environment before deciding whether to offer a permanent role."
            href="/solutions#contract-to-hire"
          />
          <OfferingCard
            icon="/assets/figma/formal-icon-4.svg"
            title="Executive Search"
            description="Find senior leaders for technology and business roles through a confidential executive search process focused on leadership experience, business priorities and organisational fit."
            href="/solutions#executive-search"
          />
        </div>
      </div>
    </section>
  );
};

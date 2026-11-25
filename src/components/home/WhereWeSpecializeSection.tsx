import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const WhereWeSpecializeSection = () => {
  // Technology has its own services on this page; for the rest, the next step is sharing the role.
  const specializations = [
    { label: "IT & New-Age Technology", href: "#technology-staffing-services" },
    { label: "Finance & accounting", href: "/start-hiring" },
    { label: "Healthcare", href: "/start-hiring" },
    { label: "Legal", href: "/start-hiring" },
    { label: "Human Resources", href: "/start-hiring" },
    { label: "Administrative", href: "/start-hiring" },
    { label: "Light Industrial", href: "/start-hiring" },
  ];

  return (
    <section className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/figma/specialize-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          quality={100}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-site flex flex-col items-center gap-14 lg:gap-20">
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
        <div className="flex flex-wrap justify-center gap-8 max-w-site">
          {specializations.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover-pop group relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full border border-transparent bg-white/40 px-12 py-4 backdrop-blur-md hover:shadow-[0_16px_36px_-14px_rgba(0,0,255,0.55)] focus-visible:shadow-[0_16px_36px_-14px_rgba(0,0,255,0.55)] focus-visible:outline-none lg:py-6"
            >
              {/* Brand fill that sweeps in from the left on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-left scale-x-0 rounded-full bg-linear-to-r from-primary to-secondary transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
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
              <span className="lg:text-2xl text-[16px] font-bold font-sans text-black uppercase transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                {item.label}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="-mr-6 size-5 -translate-x-2 text-white opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 lg:size-6"
              />
            </Link>
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

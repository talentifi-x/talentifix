import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

/** The hexagon from the TalentiFi-X mark, used to frame each audience's photo. */
const HEXAGON = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

const AUDIENCES = [
  {
    title: "Leaders",
    line: "Hiring roles that actually matter",
    points: [
      "Senior and business-critical technology roles",
      "A shortlist of 3-5 finalists, not 30 resumes",
      "Confidential executive search when the role needs it",
    ],
    image: "/assets/home/who-leaders.webp",
    alt: "Business leader in a navy suit buttoning a jacket in an office atrium",
    cta: { label: "Hire Talent", href: "/start-hiring" },
  },
  {
    title: "Teams",
    line: "Teams that can’t afford mis-hires",
    points: [
      "Candidates assessed on skills, context and fit",
      "Contract, contract-to-hire or permanent hiring",
      "Support for hiring in India and the USA",
    ],
    image: "/assets/home/who-teams.webp",
    alt: "Technology team gathered around a laptop at a meeting table, one person pointing at the screen",
    cta: { label: "Hire Talent", href: "/start-hiring" },
  },
  {
    title: "Talent",
    line: "Talent seeking alignment, not randomness",
    points: [
      "Opportunities aligned with your skills and ambition",
      "Clear, honest communication at every step",
      "Respect for your time and privacy",
    ],
    image: "/assets/home/who-talent.webp",
    alt: "Software professional typing on a laptop at a desk with a coffee mug and notebook",
    cta: { label: "Build Your Career", href: "/join-our-network" },
  },
];

export const WhoSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F2F4F8] py-14 md:py-20 lg:py-24">
      {/* Background Favicon */}
      <div className="pointer-events-none absolute -left-28 -top-9.75 h-107 w-86.75 opacity-100">
        <Image src="/icons/who.svg" alt="" fill sizes="347px" className="object-contain" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-site md:gap-14">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center md:gap-5">
          <h2 className="font-notch text-[40px] font-bold leading-tight text-black md:text-[54px]">
            Who Is This Built For<span className="text-secondary">.</span>
          </h2>
          <p className="max-w-[640px] text-[18px] font-semibold text-black md:text-[22px]">
            TalentiFi-X is built for companies and professionals who refuse to settle.
          </p>
        </div>

        <ul className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {AUDIENCES.map(({ title, line, points, image, alt, cta }) => (
            <li
              key={title}
              className="hover-pop group flex flex-col gap-6 rounded-[20px] border border-white bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] duration-300 hover:shadow-[0_24px_50px_-24px_rgba(0,0,255,0.3)] md:p-7 lg:p-8"
            >
              <div className="flex items-center gap-5 lg:flex-col lg:items-start">
                <div className="relative aspect-[0.88] w-[96px] shrink-0 md:w-[112px] lg:w-[124px]">
                  {/* A cyan hexagon peeks out behind the photo, like the layered logo. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-[8%] translate-y-[6%] bg-linear-to-br from-secondary to-primary opacity-80"
                    style={{ clipPath: HEXAGON }}
                  />
                  <div className="absolute inset-0" style={{ clipPath: HEXAGON }}>
                    <Image src={image} alt={alt} fill sizes="124px" className="object-cover" />
                  </div>
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="font-notch text-[32px] font-bold leading-none text-black lg:text-[38px]">
                    {title}
                    <span className="text-secondary">.</span>
                  </h3>
                  <p className="text-[15px] font-semibold leading-snug text-dark/80 lg:text-[16px]">{line}</p>
                </div>
              </div>

              <ul className="flex flex-col gap-3 border-t border-grey pt-6">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[15px] leading-snug text-dark/75 lg:text-[16px]">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white"
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                href={cta.href}
                className={`hover-pop mt-auto inline-flex min-h-12 items-center justify-center gap-3 rounded-sm px-6 py-3 text-[16px] font-medium ${
                  cta.href === "/start-hiring"
                    ? "bg-linear-to-l from-blue-light to-primary text-white shadow-md hover:opacity-90"
                    : "border border-primary text-primary hover:bg-primary/5"
                }`}
              >
                {cta.label}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

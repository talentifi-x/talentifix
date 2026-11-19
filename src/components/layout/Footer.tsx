import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { FooterWordmark } from "./FooterWordmark";
import { livePages } from "@data/content";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const XLogoIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  );
};

// A server component: only the zoom-aware wordmark (FooterWordmark) needs the browser.
export const Footer = () => {
  const talentPages = livePages("talent");

  return (
    <footer className="w-full bg-white pt-12 sm:pt-16 xl:pt-20 flex flex-col items-center relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className={`grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:gap-x-8 ${
          talentPages.length > 0
            ? "md:grid-cols-[1fr_1.15fr_1.45fr] xl:grid-cols-[1.25fr_0.85fr_1fr_1.35fr]"
            : "xl:grid-cols-3"
        }`}>
          <div className="flex min-w-0 flex-col items-start gap-5 border-b border-gray-200 pb-8 sm:col-span-full sm:flex-row sm:items-center sm:justify-between xl:col-span-1 xl:flex-col xl:items-start xl:justify-start xl:gap-8 xl:border-0 xl:pb-0">
            {/* Footer text uses <p>, not headings, so it never breaks a page's H1-H6 outline. */}
            <p className="text-[28px] lg:text-[32px] font-bold font-sans text-black leading-tight text-balance">
              Staffing isn’t about filling roles. <br />
              It’s about building what comes next.
            </p>
            <Link
              href="/start-hiring"
              className="w-fit shrink-0 px-6 py-3 border border-[#0000FF] rounded-sm text-[#0000FF] font-bold text-sm tracking-wider flex items-center gap-2 hover:bg-[#0000FF] hover:text-white transition-colors uppercase"
            >
              Start Hiring
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex min-w-0 flex-col gap-3 xl:gap-6 xl:border-l xl:border-gray-300 xl:pl-6">
            <p className="text-2xl md:text-xl lg:text-2xl font-bold font-notch text-black">
              Navigate
            </p>
            <nav aria-label="Footer navigation" className="flex flex-col">
              {[
                { name: "Home", href: "/" },
                { name: "Solutions", href: "/solutions" },
                { name: "Software Testing & QA", href: "/services/software-testing-qa" },
                { name: "Blog", href: "/blog" },
                { name: "Media", href: "/media" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center min-h-11 text-[18px] font-medium hover:text-[#0000FF] transition-colors ${
                    item.name === "Home" ? "text-[#0000FF]" : "text-gray-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {talentPages.length > 0 && (
            <div className="flex min-w-0 flex-col gap-3 xl:gap-6 xl:border-l xl:border-gray-300 xl:pl-6">
              <p className="text-2xl md:text-xl lg:text-2xl font-bold font-notch text-black">
                Technology Talent
              </p>
              <nav aria-label="Technology talent" className="flex flex-col">
                {talentPages.map((page) => (
                  <Link
                    key={page.path}
                    href={page.path}
                    className="flex items-center min-h-11 text-[18px] font-medium text-gray-600 hover:text-[#0000FF] transition-colors"
                  >
                    {page.navLabel}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          <div className="flex min-w-0 flex-col gap-4 sm:col-span-full md:col-span-1 xl:gap-6 xl:border-l xl:border-gray-300 xl:pl-6">
            <p className="text-2xl md:text-xl lg:text-2xl font-bold font-notch text-black">
              Connect With Us
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="https://www.instagram.com/talentifi_x?igsh=Y2pncWRvazgzM2kz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TalentiFi-X on Instagram"
                className="p-2.5 border border-[#E5E7EB] rounded-lg hover:border-[#0000FF] group transition-colors"
              >
                <InstagramIcon className="w-6 h-6 text-[#0000FF]" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/talentifi-x/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TalentiFi-X on LinkedIn"
                className="p-2.5 border border-[#E5E7EB] rounded-lg hover:border-[#0000FF] group transition-colors"
              >
                <LinkedinIcon className="w-6 h-6 text-[#0000FF]" />
              </Link>
              <Link
                href="https://x.com/talentifi_x"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TalentiFi-X on X"
                className="p-2.5 border border-[#E5E7EB] rounded-lg hover:border-[#0000FF] group transition-colors"
              >
                <XLogoIcon className="w-6 h-6 text-[#0000FF]" />
              </Link>
              <Link
                href="https://www.youtube.com/@talentifi-x"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TalentiFi-X on YouTube"
                className="p-2.5 border border-[#E5E7EB] rounded-lg hover:border-[#0000FF] group transition-colors"
              >
                <YoutubeIcon className="w-6 h-6 text-[#0000FF]" />
              </Link>
            </div>
            <div className="grid gap-x-6 gap-y-4 text-gray-600 sm:grid-cols-2 md:grid-cols-1">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0000FF] mt-0.5 shrink-0" />
                <span className="text-[#0000FF] font-bold text-sm mt-0.5 shrink-0">
                  IN
                </span>
                <p className="text-[18px] font-medium leading-snug">
                  26/19 Gandhi Bazar Main Road,
                  <br />
                  Basavanagudi, Bangalore - 560 004
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0000FF] mt-0.5 shrink-0" />
                <span className="text-[#0000FF] font-bold text-sm mt-0.5 shrink-0">
                  US
                </span>
                <p className="text-[18px] font-medium leading-snug">
                  13201 NW Freeway, Suite 800,
                  <br />
                  Houston, TX 77040
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterWordmark />

      {/* Fixed Gradient Overlay - Always at bottom of viewport */}
      <div className="fixed bottom-0 left-0 w-full h-15 z-40 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent backdrop-blur-[1px]" />
        <div
          className="absolute inset-0 bg-linear-to-r from-[#0000FF] to-secondary opacity-10"
          style={{
            maskImage: "linear-gradient(to top, black, transparent)",
            WebkitMaskImage: "linear-gradient(to top, black, transparent)",
          }}
        />
      </div>

      {/* Footer Links - Part of the footer, scrolls with it */}
      <div className="relative z-50 w-full pb-8">
        <div className="max-w-7xl mx-auto w-full px-6 md:pl-8 md:pr-24 2xl:pr-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-gray-500">
          <div className="flex items-center gap-8">
            <Link
              href="/privacy-policy"
              className="inline-flex items-center min-h-11 hover:text-[#0000FF] transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          <p>TalentiFi-X LLC © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Instagram, Linkedin, MapPin } from 'lucide-react';

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

export const Footer = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const checkZoom = () => {
      // Heuristic: compare window.outerWidth (browser window) with innerWidth (viewport)
      // When zooming in, innerWidth decreases, so the ratio increases.
      // Threshold 1.02 accounts for minor rounding differences.
      if (typeof window !== 'undefined') {
        const zoomLevel = window.outerWidth / window.innerWidth;
        setIsZoomed(zoomLevel > 1.02);
      }
    };

    // Check on mount
    checkZoom();

    // Check on resize
    window.addEventListener('resize', checkZoom);
    return () => window.removeEventListener('resize', checkZoom);
  }, []);

  return (
    <footer className="w-full bg-white pt-20 pb-0 flex flex-col items-center relative overflow-hidden">

      <div className="w-full max-w-7xl mx-auto px-6 md:px-4 flex flex-col gap-20">

        {/* Top Section: 3 Columns */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">

          {/* Column 1: Statement & Button */}
          <div className="flex flex-col gap-8 ">
            <h3 className="text-[32px] font-bold font-sans text-black leading-tight">
              Staffing isn’t about filling roles. <br />
              It’s about building what comes next.
            </h3>
            <Link href="/start-hiring" className="w-fit px-6 py-3 border border-[#0000FF] rounded-[4px] text-[#0000FF] font-bold text-sm tracking-wider flex items-center gap-2 hover:bg-[#0000FF] hover:text-white transition-colors uppercase">
              Know More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Divider (Mobile only or spacing) */}
          <div className="hidden md:block w-[1px] min-h-[150px] bg-gray-300" />

          {/* Column 2: Navigate */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[24px] font-bold font-notch text-black">Navigate</h4>
            <nav className="flex flex-col gap-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Solutions', href: '/solutions' },
                { name: 'Contact', href: '/contact' },
                { name: 'Industries', href: '/' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-[18px] font-medium hover:text-[#0000FF] transition-colors ${item.name === 'Home' ? 'text-[#0000FF]' : 'text-gray-600'}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-[1px] min-h-[150px] bg-gray-300" />

          {/* Column 3: Connect With Us */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[24px] font-bold font-notch text-black">Connect With Us</h4>
            <div className="flex items-center gap-4">
              <Link
                href="https://www.instagram.com/talentifi.x?igsh=MXg3ZGhsMHA0eG5mZA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Talentifi-X on Instagram"
                className="p-2 border border-[#E5E7EB] rounded-[8px] hover:border-[#0000FF] group transition-colors"
              >
                <Instagram className="w-6 h-6 text-[#0000FF]" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/talentifi-x/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Talentifi-X on LinkedIn"
                className="p-2 border border-[#E5E7EB] rounded-[8px] hover:border-[#0000FF] group transition-colors"
              >
                <Linkedin className="w-6 h-6 text-[#0000FF]" />
              </Link>
              <Link
                href="https://x.com/TalentifiX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Talentifi-X on X"
                className="p-2 border border-[#E5E7EB] rounded-[8px] hover:border-[#0000FF] group transition-colors"
              >
                <XLogoIcon className="w-6 h-6 text-[#0000FF]" />
              </Link>
            </div>
            <div className="flex items-start gap-3 text-gray-600">
              <MapPin className="w-5 h-5 text-[#0000FF] mt-0.5 shrink-0" />
              <p className="text-[18px] font-medium leading-snug">
                26/19 Gandhibazar Main Road,
                <br />
                Basavanagudi, Bangalore - 560 004
              </p>
            </div>
          </div>

        </div>



      </div>
      {/* Bottom Section: Big Text - Hidden when zoomed > 100% */}
      {!isZoomed && (
        <div className="w-full flex justify-center lg:-mt-16 lg:-mb-20 mb-16 relative z-0">
          <h1 className="text-[20vw] md:text-[300px] font-bold font-notch bg-gradient-to-r from-[#0000FF] to-[#00DDE2] bg-clip-text text-transparent text-center select-none">
            Talentifi-X
          </h1>
        </div>
      )}

      {/* Non-moving Blur for Big Text Bottom - Scrolls with footer */}
      {!isZoomed && (
        <div className="absolute bottom-0 left-0 w-full h-[120px] z-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent backdrop-blur-[1px]" />
        </div>
      )}

      {/* Fixed Gradient Overlay - Always at bottom of viewport */}
      <div className="fixed bottom-0 left-0 w-full h-[60px] z-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent backdrop-blur-[1px]" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0000FF] to-[#00DDE2] opacity-10"
          style={{
            maskImage: 'linear-gradient(to top, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
          }}
        />
      </div>

      {/* Footer Links - Part of the footer, scrolls with it */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col justify-end pb-8 z-50 px-4">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-0 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-gray-500">
          <div className="flex items-center gap-8">
            <Link href="/privacy-policy" className="hover:text-[#0000FF] transition-colors">Privacy Policy</Link>
          </div>
          <p>Talentifi-x Inc © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

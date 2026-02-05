"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Instagram, Linkedin, ArrowRight, X as CloseIcon, Menu } from "lucide-react";
import Image from "next/image";

const XLogoIcon = ({ size = 18, className }: { size?: number; className?: string }) => {
  return (
    <svg
      width={size}
      height={size}
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

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const getLinkClasses = (path: string) => {
    return isActive(path)
      ? "text-primary font-bold border-b-2 border-secondary pb-1"
      : "text-dark hover:text-primary transition-colors font-medium";
  };

  const getMobileLinkClasses = (path: string) => {
    return isActive(path)
      ? "text-primary font-bold text-xl"
      : "text-dark hover:text-primary transition-colors font-medium text-xl";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full flex flex-col font-sans sticky top-0 z-100">
      {/* Top Bar */}
      <div className="w-full bg-linear-to-br from-primary to-[#000099]">
        <div className="w-full max-w-7xl mx-auto py-4 px-6 md:px-4 flex items-center justify-between h-10">
          <span className="text-white text-sm font-medium">contact@talentifi-x.com</span>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/talentifi_x?igsh=Y2pncWRvazgzM2kz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TalentiFi-X on Instagram"
              className="text-white hover:opacity-80"
            >
              <Instagram size={18} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/talentifi-x/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Talentifi-X on LinkedIn"
              className="text-white hover:opacity-80"
            >
              <Linkedin size={18} />
            </Link>
            <Link
              href="https://x.com/TalentifiX"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Talentifi-X on X"
              className="text-white hover:opacity-80"
            >
              <XLogoIcon size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="w-full bg-white h-[80px] shadow-sm relative z-50">
        <div className="w-full max-w-7xl mx-auto h-full px-6 md:px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="w-[200px] h-[200px] flex items-center justify-center">
              <Image src="/logos/logo.svg" alt="Talentifi-X Logo" width={200} height={200} />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={getLinkClasses("/")}>
              Home
            </Link>
            {/* <Link href="/" className={getLinkClasses("/why-us")}>
              Why Us
            </Link> */}
            <Link href="/solutions" className={getLinkClasses("/solutions")}>
              Solutions
            </Link>
           <Link href="/about" className={getLinkClasses("/about")}>
              About
            </Link> 
            <Link href="/contact" className={getLinkClasses("/contact")}>
              Contact
            </Link>
          </div>

          {/* CTA Button (Desktop) */}
          <Link
            href="/start-hiring"
            className="hidden md:flex items-center gap-2 bg-[#0000FF] text-white px-6 py-3 rounded-[5px] font-bold uppercase hover:bg-primary/90 transition-colors"
          >
            HIRE TALENT
            <ArrowRight size={20} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50">
            <div className="flex flex-col p-6 space-y-6">
              <Link
                href="/"
                className={getMobileLinkClasses("/")}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={getMobileLinkClasses("/about")}
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
              <Link
                href="/solutions"
                className={getMobileLinkClasses("/solutions")}
                onClick={closeMobileMenu}
              >
                Solutions
              </Link>
              <Link
                href="/contact"
                className={getMobileLinkClasses("/contact")}
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              <Link
                href="/start-hiring"
                className="flex items-center justify-center gap-2 bg-[#0000FF] text-white px-6 py-3 rounded-[5px] font-bold uppercase hover:bg-primary/90 transition-colors"
                onClick={closeMobileMenu}
              >
                HIRE TALENT
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

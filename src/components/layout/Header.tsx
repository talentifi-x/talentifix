"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Instagram, Linkedin, Facebook, ArrowRight, X, Menu } from "lucide-react";
import Image from "next/image";

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
          <span className="text-white text-sm font-medium">contact@talentifix.com</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-white hover:opacity-80">
              <Instagram size={18} />
            </Link>
            <Link href="#" className="text-white hover:opacity-80">
              <Linkedin size={18} />
            </Link>
            <Link href="#" className="text-white hover:opacity-80">
              <Facebook size={18} />
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
            <Link href="/blog" className={getLinkClasses("/blog")}>
              Blog
            </Link>
            <Link href="/" className={getLinkClasses("/about")}>
              About
            </Link>
            <Link href="/contact" className={getLinkClasses("/contact")}>
              Contact
            </Link>
          </div>

          {/* CTA Button (Desktop) */}
          <Link
            href="/"
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
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                href="/"
                className={getMobileLinkClasses("/why-us")}
                onClick={closeMobileMenu}
              >
                Why Us
              </Link>
              <Link
                href="/solutions"
                className={getMobileLinkClasses("/solutions")}
                onClick={closeMobileMenu}
              >
                Solutions
              </Link>
              <Link
                href="/blog"
                className={getMobileLinkClasses("/blog")}
                onClick={closeMobileMenu}
              >
                Blog
              </Link>
              <Link
                href="/"
                className={getMobileLinkClasses("/about")}
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={getMobileLinkClasses("/contact")}
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              <Link
                href="/"
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
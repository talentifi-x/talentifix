"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Linkedin, Facebook, ArrowRight } from "lucide-react";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const getLinkClasses = (path: string) => {
    return isActive(path)
      ? "text-primary font-bold border-b-2 border-secondary pb-1"
      : "text-dark hover:text-primary transition-colors font-medium";
  };

  return (
    <div className="w-full flex flex-col font-sans sticky top-0 z-100">
      {/* Top Bar */}
      <div className="w-full bg-linear-to-br from-primary to-[#000099]">
        <div className="w-full max-w-7xl mx-auto py-4 px-6 md:px-4 flex items-center justify-between   h-10">
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
             {/* Placeholder Logo Icon */}
             <Link href="/" className="w-[200px] h-[200px]  flex items-center justify-center">
              <Image src="/logos/logo.svg" alt="Talentifi-X Logo" width={200} height={200} />
            </Link>
             
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={getLinkClasses("/")}>
              Home
            </Link>
            <Link href="/" className={getLinkClasses("/why-us")}>
              Why Us
            </Link>
            <Link href="/solutions" className={getLinkClasses("/solutions")}>
              Solutions
            </Link>
            <Link href="/" className={getLinkClasses("/about")}>
              About
            </Link>
            <Link href="/contact" className={getLinkClasses("/contact")}>
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <Link 
            href="/" 
            className="hidden md:flex items-center gap-2 bg-[#0000FF] text-white px-6 py-3 rounded-[5px] font-bold uppercase hover:bg-primary/90 transition-colors"
          >
            HIRE TALENT
            <ArrowRight size={20} />
          </Link>

          {/* Mobile Menu Toggle (Placeholder) */}
          <div className="md:hidden">
             <div className="w-6 h-6 flex flex-col justify-between">
               <span className="w-full h-0.5 bg-dark"></span>
               <span className="w-full h-0.5 bg-dark"></span>
               <span className="w-full h-0.5 bg-dark"></span>
             </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const SolutionsPage = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <header className="w-full flex flex-col items-center py-14 pb-14">
        <div className="w-full h-[60px] bg-[#0000FF] flex items-center justify-center">
          <h1 className="text-white text-[32px] font-notch font-bold">Solutions</h1>
        </div>
        <div className="w-full flex items-center justify-center gap-24 mt-8">
          <nav className="flex gap-8">
            <a href="#" className="text-[#1E1E24] text-[18px] font-medium hover:text-[#0000FF] transition-colors">Home</a>
            <a href="#" className="text-[#1E1E24] text-[18px] font-medium hover:text-[#0000FF] transition-colors">Solutions</a>
            <a href="#" className="text-[#1E1E24] text-[18px] font-medium hover:text-[#0000FF] transition-colors">Contact</a>
            <a href="#" className="text-[#1E1E24] text-[18px] font-medium hover:text-[#0000FF] transition-colors">About</a>
            <a href="#" className="text-[#1E1E24] text-[18px] font-medium hover:text-[#0000FF] transition-colors">Industries</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center py-16 px-14" style={{backgroundImage: "url('/assets/Solutions/hero-visual.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="flex items-center gap-20 max-w-7xl">
          <div className="flex-1">
            <h2 className="text-[50px] font-notch font-bold text-white mb-6 leading-tight">
              We don&apos;t just fill roles.<br />
              We build teams that<br />
              build companies.
            </h2>
            <p className="text-[20px] text-white leading-relaxed mb-8">
              From temporary staffing to executive search, we deliver hiring Solutions
              that scale with your business — fast, precise, and built for results.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/assets/Solutions/hero-visual.png"
              alt="Hero Visual"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* AI for Speed Section */}
      <section className="relative w-full flex items-center justify-center py-22 px-14 bg-white" style={{backgroundImage: "url('/assets/Solutions/ai-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="flex items-center gap-20 max-w-7xl">
          <div className="flex-1 flex justify-center">
            <Image
              src="/assets/Solutions/ai-visual.svg"
              alt="AI Visual"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-[50px] font-notch font-bold text-[#1E1E24] mb-6 leading-tight">
              AI for Speed.<br />
              Humans for Precision.
            </h3>
            <p className="text-[20px] text-[#1E1E24] leading-relaxed mb-8">
              Our hybrid approach combines cutting-edge AI sourcing with expert
              human evaluation — delivering candidates that match your culture,
              not just your job description.
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <p className="text-[18px] text-[#1E1E24] font-medium">
                ✓ 3x faster candidate sourcing<br />
                ✓ 40% better culture-fit matches<br />
                ✓ 90% reduction in time-to-hire
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Temporary Staffing Section */}
      <section className="w-full py-22 px-14 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-[50px] font-notch font-bold text-[#1E1E24] mb-6 leading-tight">
                Temporary Staffing
              </h3>
              <p className="text-[20px] text-[#1E1E24] leading-relaxed mb-8">
                Scale your workforce up or down with pre-vetted professionals
                ready to hit the ground running — from day one.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Image src="/assets/Solutions/temp-icon-1.svg" alt="Icon" width={50} height={50} />
                  <div>
                    <h4 className="text-[24px] font-notch font-bold text-[#1E1E24] mb-2">Rapid Deployment</h4>
                    <p className="text-[18px] text-[#1E1E24]">Qualified candidates within 24-48 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Image src="/assets/Solutions/temp-icon-2.svg" alt="Icon" width={50} height={50} />
                  <div>
                    <h4 className="text-[24px] font-notch font-bold text-[#1E1E24] mb-2">Flexible Terms</h4>
                    <p className="text-[18px] text-[#1E1E24]">Short-term, long-term, or project-based</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Image src="/assets/Solutions/temp-icon-3.svg" alt="Icon" width={50} height={50} />
                  <div>
                    <h4 className="text-[24px] font-notch font-bold text-[#1E1E24] mb-2">Risk-Free Trial</h4>
                    <p className="text-[18px] text-[#1E1E24]">Try before you commit</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/assets/Solutions/temp-staffing-bg.svg"
                alt="Temporary Staffing"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Permanent Placement Section */}
      <section className="relative w-full py-22 px-14" style={{backgroundImage: "url('/assets/Solutions/perm-placement-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-[50px] font-notch font-bold text-white mb-6 leading-tight">
            This isn&apos;t faster hiring.<br />
            It&apos;s smarter hiring.
          </h3>
          <p className="text-[20px] text-white leading-relaxed mb-12 max-w-4xl mx-auto">
            Find permanent team members who don&apos;t just fill positions — they elevate
            your entire organization. Our rigorous screening process ensures every
            candidate is a long-term fit.
          </p>
          <Link
            href="/start-hiring"
            className="bg-[#00DDE2] text-white font-notch font-bold text-[20px] px-8 py-4 rounded-[5px] hover:bg-[#00c4c9] transition-colors duration-300"
          >
            Start Your Search →
          </Link>
        </div>
      </section>

      {/* Contract-to-hire Section */}
      <section className="w-full py-22 px-14 bg-[#F2F4F8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <Image
                src="/assets/Solutions/contract-steps.png"
                alt="Contract to Hire Process"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-[50px] font-notch font-bold text-[#1E1E24] mb-6 leading-tight">
                Contract-to-hire
              </h3>
              <p className="text-[20px] text-[#1E1E24] leading-relaxed mb-8">
                Test drive talent before making a permanent commitment. It&apos;s the
                smart way to ensure perfect fit — for both you and the candidate.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#0000FF] rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <p className="text-[18px] text-[#1E1E24]">Start with a contract role (3-6 months)</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#0000FF] rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <p className="text-[18px] text-[#1E1E24]">Evaluate performance and culture fit</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#0000FF] rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <p className="text-[18px] text-[#1E1E24]">Convert to permanent if it&apos;s a match</p>
                </div>
              </div>
              <Link
                href="/start-hiring"
                className="bg-gradient-to-r from-[#0000FF] to-[#000099] text-white font-notch font-bold text-[20px] px-8 py-4 rounded-[5px] hover:from-[#0000e6] hover:to-[#0000b3] transition-all duration-300 mt-8"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Search Section */}
      <section className="w-full py-22 px-14 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-[50px] font-notch font-bold text-[#1E1E24] mb-6 leading-tight">
                Executive Search
              </h3>
              <p className="text-[20px] text-[#1E1E24] leading-relaxed mb-8">
                Leadership that transforms organizations. We identify and attract
                exceptional C-suite and senior executives who drive strategic growth.
              </p>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[24px] font-notch font-bold text-[#1E1E24] mb-2">Confidential Search</h4>
                  <p className="text-[18px] text-[#1E1E24]">Discreet process protecting your company&apos;s privacy</p>
                </div>
                <div>
                  <h4 className="text-[24px] font-notch font-bold text-[#1E1E24] mb-2">Market Mapping</h4>
                  <p className="text-[18px] text-[#1E1E24]">Comprehensive analysis of top talent in your industry</p>
                </div>
                <div>
                  <h4 className="text-[24px] font-notch font-bold text-[#1E1E24] mb-2">Cultural Alignment</h4>
                  <p className="text-[18px] text-[#1E1E24]">Leaders who fit your vision and values</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/assets/Solutions/exec-search-bg.svg"
                alt="Executive Search"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Includes Section */}
      <section className="relative w-full py-22 px-14" style={{backgroundImage: "url('/assets/Solutions/Solutions-includes-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-[50px] font-notch font-bold text-white mb-12 leading-tight">
            Every Solutions Includes:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00DDE2] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">✓</span>
              </div>
              <h4 className="text-[24px] font-notch font-bold text-white mb-3">AI-Powered Matching</h4>
              <p className="text-[18px] text-white">Advanced algorithms identify the best candidates</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00DDE2] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">✓</span>
              </div>
              <h4 className="text-[24px] font-notch font-bold text-white mb-3">Human Expertise</h4>
              <p className="text-[18px] text-white">Expert recruiters validate every match</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00DDE2] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">✓</span>
              </div>
              <h4 className="text-[24px] font-notch font-bold text-white mb-3">Guaranteed Results</h4>
              <p className="text-[18px] text-white">We stand behind every placement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who These Solutions Are Built For Section */}
      <section className="relative w-full py-22 px-14 bg-[#F2F4F8] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="absolute top-20 left-20">
            <Image
              src="/assets/Solutions/cube-1.png"
              alt="Cube Element"
              width={171}
              height={211}
              className="opacity-80"
            />
          </div>
          <div className="absolute bottom-20 right-20">
            <Image
              src="/assets/Solutions/cube-2.png"
              alt="Cube Element"
              width={238}
              height={298}
              className="opacity-80"
            />
          </div>
          <h3 className="text-[50px] font-notch font-bold text-[#1E1E24] mb-8 leading-tight relative z-10">
            If hiring matters to your business —<br />
            these Solutions were built for you.
          </h3>
          <p className="text-[20px] text-[#1E1E24] leading-relaxed mb-12 max-w-4xl mx-auto relative z-10">
            Whether you&apos;re a startup building your founding team or an enterprise
            scaling globally, we have the expertise and network to deliver the
            talent that drives your success.
          </p>
          <Link
            href="/start-hiring"
            className="bg-[#00DDE2] text-white font-notch font-bold text-[20px] px-8 py-4 rounded-[5px] hover:bg-[#00c4c9] transition-colors duration-300 relative z-10"
          >
            Get Started Today →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#1E1E24] py-16 px-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h4 className="text-white text-[24px] font-notch font-bold mb-4">Navigate</h4>
              <nav className="space-y-2">
                <a href="#" className="block text-white/80 hover:text-white transition-colors">Home</a>
                <a href="#" className="block text-white/80 hover:text-white transition-colors">Solutions</a>
                <a href="#" className="block text-white/80 hover:text-white transition-colors">Contact</a>
                <a href="#" className="block text-white/80 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-white/80 hover:text-white transition-colors">Industries</a>
              </nav>
            </div>
            <div>
              <h4 className="text-white text-[24px] font-notch font-bold mb-4">Solutions</h4>
              <nav className="space-y-2">
                <a href="#" className="block text-white/80 hover:text-white transition-colors">Temporary Staffing</a>
                <a href="#" className="block text-white/80 hover:text-white transition-colors">Permanent Placement</a>
                <a href="#" className="block text-white/80 hover:text-white transition-colors">Contract-to-hire</a>
                <a href="#" className="block text-white/80 hover:text-white transition-colors">Executive Search</a>
              </nav>
            </div>
            <div>
              <h4 className="text-white text-[24px] font-notch font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-white/80">
                <p>Email: contact@talentifi-x.com</p>
                <p>Address: 26/19 Gandhibazar Main Road,<br />Basavanagudi, Bangalore - 560 004</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/60">© 2024 Talentifi-X. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

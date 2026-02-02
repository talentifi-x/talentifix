import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const StorySection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-4 flex flex-col gap-14 bg-white">
      <div className=" max-w-7xl mx-auto">
        {/* Top Part: Story Text & Image */}
        <div className="flex flex-col lg:flex-row items-center lg:gap-16 xl:gap-48 justify-between">
          {/* Left Content */}
          <div className="flex flex-col lg:gap-12 gap-4 flex-1">
            <h2 className="text-[50px] md:text-[80px] lg:leading-[1.3] leading-none font-bold text-dark font-notch">
              The Story <br />
              Begins<span className="text-secondary">.</span> 
            </h2>
            <p className="lg:text-[24px] text-[20px] leading-[1.3] font-sans text-dark font-normal">
              It Always Started the Same Way
            </p>
          </div>

          {/* Right Content - Image */}
          <div className="relative w-full lg:w-1/2 xl:w-[710px] h-[300px] lg:h-[500px] overflow-hidden ">
            <Image
              src="/assets/figma/story-image.png"
              alt="The Story Begins"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Bottom Part: Card */}
        <div className="w-full relative lg:my-10 overflow-hidden border-2 border-grey-accent rounded-2xl">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/figma/story-card-bg.png"
              alt="Background Pattern"
              fill
              className="object-cover opacity-10"
            />
            {/* White overlay if needed, but Figma says white + image. Assuming image is the pattern. */}
            <div className="absolute inset-0 "></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center py-16 px-6 gap-10">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-[24px] md:text-[48px] font-bold font-notch text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-dark to-gray-400">
                Hiring becomes waiting.
              </h3>
              <h3 className="text-[30px] md:text-[56px] font-bold font-notch text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-dark to-gray-400">
                Waiting becomes settling.
              </h3>
            </div>

            <Link href="/start-hiring" className="bg-gradient-to-r from-[#0000FF] to-[#000099] text-white px-12 py-6 rounded-[5px] flex items-center justify-center gap-4 font-normal uppercase hover:opacity-90 transition-opacity shadow-lg">
              <span className="lg:text-[20px] text-[12px] tracking-wide">Discover Intelligent Hiring</span>
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

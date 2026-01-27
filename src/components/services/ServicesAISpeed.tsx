import React from "react";
import Image from "next/image";

export const ServicesAISpeed = () => {
  return (
    <section className="w-full py-16 px-14 bg-[#F2F4F8]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center flex-col justify-center text-center gap-20">
          <div className="flex-1">
            <h3 className="text-[54px] font-notch font-bold text-dark mb-8 leading-tight">
              AI for speed<span className="text-secondary">.</span>  Humans for judgment.<br />Results for you.

            </h3>
            <p className="text-[20px] text-dark leading-relaxed mb-2">
              Trust isn’t claimed. It’s engineered.
            </p>
          </div>
          <div className="bg-gradient-to-r from-primary to-secondary p-[2px] rounded-xl">
            <div className="bg-[#F2F4F8] rounded-xl p-2 w-[1150px] h-[500px]">

            </div>
          </div>



          <div className=" flex justify-center -mt-[40%] z-20">


            <Image
              src="/services/ai-banner.webp"
              alt="AI Visual"
              width={1200}
              height={300}
              className="rounded-lg shadow-lg h-[700px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export const ServicesBanner = () => {
    return (
        <section className="relative w-full flex items-center justify-center lg:py-20 px-14 bg-white"
        // style={{backgroundImage: "url('/assets/services/hero-visual.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}
        >
            <div className="flex items-center gap-20 max-w-7xl">
                <div className="flex-1">
                    <h2 className="text-[60px] font-notch font-bold text-black mb-6 leading-tight">
                        Not Just Roles. Responsibility.
                    </h2>
                    <p className="text-[20px] text-black leading-relaxed mb-8 max-w-sm">
                        Hiring ins’t about filling sets. It’s about trusting someone with your team, your culture, and your momentum.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-3 text-white font-bold rounded-sm 
             bg-linear-to-r from-[#0000FF] to-[#000099]
             hover:from-[#0000CC] hover:to-[#000080]
             transition-colors"
                    >
                        HIRE SMARTER <ArrowBigRight className="inline-block ml-2" />
                    </Link>

                </div>
                <div className="flex-1 flex justify-center">
                    <Image
                        src="/assets/services/hero-visual.png"
                        alt="Hero Visual"
                        width={600}
                        height={400}
                        className="rounded-lg  "
                    />
                </div>
            </div>
        </section>
    );
};

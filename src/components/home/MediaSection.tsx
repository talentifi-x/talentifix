import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pressCoverage } from "@data/mediaData";
import { PressCard } from "@components/media/PressCard";

// pressCoverage is newest first, so the first three are the latest pieces.
const latest = pressCoverage.slice(0, 3);

export const MediaSection = () => {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-8 lg:px-16 flex flex-col items-center">
      <div className="w-full max-w-300 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-[30px] md:text-[42px] lg:text-[54px] font-notch font-bold text-dark leading-tight">
            In the Media<span className="text-secondary">.</span>
          </h2>
          <p className="text-dark/70 text-base md:text-lg leading-relaxed max-w-2xl">
            The latest articles, interviews and stories featuring TalentiFi-X and founder
            Chetan Mangalwedhe.
          </p>
        </div>

        <Link
          href="/media"
          className="w-fit shrink-0 flex items-center gap-2 bg-[#0000FF] text-white px-8 py-4 rounded-[5px] font-bold text-sm uppercase tracking-wider hover:bg-blue transition-colors"
        >
          View All
          <ArrowRight size={18} />
        </Link>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-300">
        {latest.map((item, index) => (
          // Two columns on tablets: show two cards rather than leave one orphaned.
          <li key={item.id} className={index === 2 ? "md:max-lg:hidden" : undefined}>
            <PressCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

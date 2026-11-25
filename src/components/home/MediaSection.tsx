import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pressCoverage } from "@data/mediaData";
import { PressCard } from "@components/media/PressCard";

// pressCoverage is newest first, so the first three are the latest pieces.
const latest = pressCoverage.slice(0, 3);

export const MediaSection = () => {
  return (
    <section className="w-full bg-white py-20 px-site flex flex-col items-center">
      <div className="w-full max-w-site flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
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
          className="hover-pop w-fit shrink-0 flex items-center gap-2 bg-[#0000FF] text-white px-8 py-4 rounded-[5px] font-bold text-sm uppercase tracking-wider hover:bg-blue"
        >
          View All
          <span className="sr-only"> media coverage</span>
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-site">
        {latest.map((item, index) => (
          // Two columns on tablets: show two cards rather than leave one orphaned.
          <li key={item.id} className={`hover-pop ${index === 2 ? "md:max-lg:hidden" : ""}`}>
            <PressCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

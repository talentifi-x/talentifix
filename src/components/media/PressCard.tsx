import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { publicationLogos, type CoverageItem } from "@data/mediaData";

// One press or LinkedIn card, shared by the Media page grid and the home page's
// latest-coverage strip so both stay identical.
export function PressCard({ item }: { item: CoverageItem }) {
  const logo = publicationLogos[item.publication];

  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col bg-white rounded-[10px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
    >
      <div className="relative w-full aspect-16/9 overflow-hidden bg-grey-accent border-b border-gray-100">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover motion-safe:group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3">
          {logo ? (
            <Image
              src={logo.src}
              alt={item.publication}
              width={logo.width}
              height={logo.height}
              unoptimized
              className="h-7 w-auto max-w-37.5 object-contain object-left"
            />
          ) : (
            <span className="font-notch font-bold text-dark text-[17px]">{item.publication}</span>
          )}
          <span className="shrink-0 text-[10px] font-notch font-bold uppercase tracking-[0.18em] text-primary bg-primary/5 border border-primary/20 px-2.5 py-1 rounded-sm">
            {item.type}
          </span>
        </div>
        <h3 className="flex-1 text-[17px] font-notch font-bold text-dark leading-snug group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <span className="flex items-center gap-2 text-primary font-notch font-bold text-[11px] uppercase tracking-[0.18em]">
            {item.cta ?? `Read on ${item.publication}`}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
          <time dateTime={item.dateTime} className="text-[11px] text-dark/70 shrink-0">
            {item.date}
          </time>
        </div>
      </div>
    </Link>
  );
}

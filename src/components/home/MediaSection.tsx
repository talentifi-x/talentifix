import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { pressCoverage, publicationLogos, type CoverageItem } from "@data/mediaData";

// Press only: our own LinkedIn posts are not "media coverage".
const press = pressCoverage.filter((item) => item.publication !== "LinkedIn");

// pressCoverage is newest first: the newest piece leads, the next four sit beside it.
const [lead, ...rest] = press;
const briefs = rest.slice(0, 4);

// Every publication that has covered us, once each, linked to its newest piece.
const outlets = press.filter(
  (item, i) => publicationLogos[item.publication] && press.findIndex((p) => p.publication === item.publication) === i,
);

/** Publication masthead: the logo when we have one, the name set in type otherwise. */
function Masthead({ item }: { item: CoverageItem }) {
  const logo = publicationLogos[item.publication];
  if (!logo) return <span className="font-notch text-[28px] font-bold text-dark">{item.publication}</span>;
  return (
    <Image
      src={logo.src}
      alt={item.publication}
      width={logo.width}
      height={logo.height}
      unoptimized
      className="h-[45px] w-auto max-w-[min(280px,100%)] object-contain object-left"
    />
  );
}

/** Kicker line under the masthead: piece type and date, like a newspaper dateline. */
function Dateline({ item }: { item: CoverageItem }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 text-xs font-bold uppercase tracking-[0.14em] text-dark/60">
      <span className="text-primary">{item.type}</span>
      <span aria-hidden="true" className="size-1 rounded-full bg-dark/25" />
      <time dateTime={item.dateTime}>{item.date}</time>
    </p>
  );
}

export const MediaSection = () => {
  return (
    <section className="w-full bg-white py-20 px-site flex flex-col items-center">
      <div className="w-full max-w-site flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
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

      {/* "As featured in": every outlet's masthead on a slow ticker between two rules.
          Each slot is 1/--per-view of the ticker's width (2 on phones, 4 on tablets,
          5 on desktop): the track is sized to (slots / per-view) x 100% of the ticker,
          so percentages do the maths and no viewport or container units are needed. */}
      <div className="relative w-full max-w-site border-y-2 border-dark py-7 md:py-9">
        {/* Label sits on the top rule, like a section flag in a newspaper */}
        <p className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-4 font-notch text-xs font-bold uppercase tracking-[0.2em] text-dark md:px-6">
          As featured in
        </p>
        <div
          className="group relative overflow-hidden [--per-view:2] md:[--per-view:4] lg:[--per-view:5] [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
          style={{ "--marquee-duration": `${outlets.length * 4}s` } as React.CSSProperties}
        >
          <ul
            className="flex animate-marquee items-center group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
            style={{ width: `calc(100% * ${outlets.length * 2} / var(--per-view))` }}
          >
            {[0, 1].map((copy) =>
              outlets.map((item) => {
                const logo = publicationLogos[item.publication];
                return (
                  <li
                    key={`${copy}-${item.id}`}
                    aria-hidden={copy === 1 || undefined}
                    className="flex shrink-0 justify-center px-2 md:px-3"
                    style={{ width: `calc(100% / ${outlets.length * 2})` }}
                  >
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={copy === 1 ? -1 : undefined}
                      title={item.title}
                      className="flex h-[78px] w-full items-center justify-center rounded-md md:h-[90px]"
                    >
                      <Image
                        src={logo.src}
                        alt={copy === 0 ? `${item.publication}: ${item.title}` : ""}
                        width={logo.width}
                        height={logo.height}
                        unoptimized
                        className="h-[50px] w-auto max-w-full object-contain opacity-60 grayscale transition duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0 md:h-[62px] lg:h-[67px]"
                      />
                    </Link>
                  </li>
                );
              }),
            )}
          </ul>
        </div>
      </div>

      <div className="mt-10 grid w-full max-w-site grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-0">
        {/* Lead story */}
        <article className="lg:border-r lg:border-dark/15 lg:pr-10">
          <Link href={lead.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-4">
            <div className="relative aspect-16/9 w-full overflow-hidden rounded-[6px] bg-grey-accent">
              <Image
                src={lead.image}
                alt={lead.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 780px"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-2 flex flex-col gap-3">
              <Masthead item={lead} />
              <Dateline item={lead} />
            </div>
            <h3 className="font-notch text-[24px] font-bold leading-tight text-dark transition-colors group-hover:text-primary md:text-[32px]">
              {lead.title}
            </h3>
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              {lead.cta ?? `Read on ${lead.publication}`}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </article>

        {/* More coverage, as a column of briefs */}
        <ul className="flex flex-col divide-y divide-dark/15 border-t border-dark/15 lg:border-t-0 lg:pl-10">
          {briefs.map((item) => (
            <li key={item.id} className="py-5 first:pt-5 lg:first:pt-0 last:pb-0">
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[minmax(0,1fr)_96px] items-start gap-5 md:grid-cols-[minmax(0,1fr)_128px] lg:grid-cols-[minmax(0,1fr)_104px]"
              >
                <div className="flex min-w-0 flex-col gap-2.5">
                  <Masthead item={item} />
                  <h3 className="font-notch text-[17px] font-bold leading-snug text-dark transition-colors group-hover:text-primary md:text-[18px]">
                    {item.title}
                  </h3>
                  <Dateline item={item} />
                </div>
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-[4px] bg-grey-accent">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 128px, 104px"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

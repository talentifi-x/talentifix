import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CalendarDays, Clock, Files, UsersRound } from "lucide-react";

/** The lines of the typed note, one step each, read top to bottom. */
const STEPS = [
  { text: "A role opens.", icon: BriefcaseBusiness },
  { text: "The clock starts.", icon: Clock },
  { text: "Days turn into weeks.", icon: CalendarDays },
  { text: "Resumes pile up.", icon: Files },
  { text: "Teams stretch thin.", icon: UsersRound },
];

export const StorySection = () => {
  return (
    <section className="w-full bg-white px-site py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-site flex-col gap-12 lg:gap-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          {/* Heading and the story as a timeline */}
          <div className="flex flex-col gap-8 md:gap-10">
            <div className="flex flex-col gap-3">
              <h2 className="font-notch text-[44px] font-bold leading-[1.05] text-dark md:text-[64px] lg:text-[68px]">
                The Story Begins<span className="text-secondary">.</span>
              </h2>
              <p className="text-[19px] leading-snug text-dark/70 md:text-[22px]">It Always Started the Same Way</p>
            </div>

            <ol className="relative flex flex-col gap-5 md:gap-6">
              {/* The rail behind the step icons, fading out at the last step. */}
              <span
                aria-hidden="true"
                className="absolute bottom-5 left-[21px] top-5 w-px bg-linear-to-b from-primary/40 via-primary/20 to-primary/5"
              />
              {STEPS.map(({ text, icon: Icon }, i) => (
                <li key={text} className="hover-pop relative flex items-center gap-4 md:gap-5">
                  <span
                    aria-hidden="true"
                    className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-[#dbe4fa] bg-white text-primary shadow-[0_8px_18px_-12px_rgba(0,0,255,0.45)]"
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <p
                    className="font-notch text-[20px] font-semibold leading-snug md:text-[24px]"
                    // Each step a little darker than the last, as the wait builds.
                    style={{ color: `rgb(30 30 36 / ${0.55 + i * 0.1})` }}
                  >
                    {text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* The empty desk, with the typed note pinned over its corner */}
          <div className="relative pb-[14%] md:pb-[10%] lg:mt-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_30px_60px_-36px_rgba(15,23,42,0.55)]">
              <Image
                src="/assets/home/story-waiting-desk.webp"
                alt="Empty office desk at dusk with a tall stack of printed resumes, a closed laptop and a cold cup of coffee"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-primary/15 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-[-2%] w-[48%] -rotate-3 md:left-[-4%] md:w-[44%]">
              <Image
                src="/assets/figma/story-image.png"
                alt=""
                width={3149}
                height={2168}
                sizes="(max-width: 1024px) 48vw, 320px"
                className="h-auto w-full drop-shadow-[0_18px_24px_rgba(15,23,42,0.28)]"
              />
            </div>
          </div>
        </div>

        {/* Where the story ends without a better system */}
        <div className="relative overflow-hidden rounded-3xl bg-dark px-6 py-12 md:px-12 md:py-14 lg:px-16">
          <Image
            src="/assets/figma/story-card-bg.png"
            alt=""
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover opacity-[0.07] invert"
          />
          <div
            aria-hidden="true"
            className="absolute -right-[10%] -top-[60%] h-[140%] w-[55%] rounded-full bg-primary/40 blur-[90px]"
          />
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-1 md:gap-2">
              <h3 className="font-notch text-[28px] font-bold leading-tight text-white/55 md:text-[38px]">
                Hiring becomes waiting.
              </h3>
              <h3 className="font-notch text-[32px] font-bold leading-tight text-white md:text-[44px]">
                Waiting becomes <span className="text-secondary">settling.</span>
              </h3>
            </div>

            <Link
              href="/start-hiring"
              className="hover-pop inline-flex min-h-14 shrink-0 items-center gap-3 rounded-[5px] bg-linear-to-r from-[#0000FF] to-[#000099] px-7 py-4 text-[14px] font-semibold uppercase tracking-wider text-white shadow-[0_14px_30px_-12px_rgba(0,0,255,0.8)] ring-1 ring-white/15 hover:opacity-90 md:text-[16px]"
            >
              Discover Intelligent Hiring
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

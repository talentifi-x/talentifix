import Image from "next/image";
import type { Section } from "@data/content/types";
import { RichText } from "./RichText";
import { cardIcon } from "./cardIcon";

type Criteria = Extract<Section, { layout: "criteria" }>;

export function CriteriaSection({ id, section }: { id: string; section: Criteria }) {
  const [introduction, criteria] = section.blocks;

  return (
    <section id={id} aria-labelledby={id + "-title"} className="scroll-mt-32 bg-white px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-primary/15 bg-white shadow-[0_16px_50px_-32px_rgba(0,0,153,0.32)] lg:grid-cols-[5fr_6fr] 2xl:max-w-7xl">
        <div className="relative isolate flex flex-col justify-center overflow-hidden bg-linear-to-br from-blue via-blue to-primary px-6 py-8 text-white sm:px-10 sm:py-10 xl:px-12">
          <Image
            src="/assets/Solutions/cube-2.png"
            alt=""
            width={583}
            height={729}
            sizes="224px"
            className="pointer-events-none absolute -right-20 -top-20 -z-10 w-56 rotate-12 select-none opacity-20 mix-blend-screen"
          />
          <span className="mb-5 h-1 w-12 rounded-full bg-secondary" aria-hidden="true" />
          <h2 id={id + "-title"} className="max-w-[15ch] text-balance font-notch text-[32px] leading-[1.06] font-bold sm:text-[40px] xl:text-[46px]">
            {section.heading}<span className="text-secondary">.</span>
          </h2>
          <div className="mt-5 max-w-[46ch] space-y-3 text-[16px] leading-relaxed text-white/90 sm:mt-6">
            {introduction.items.map((paragraph) => <p key={paragraph}><RichText text={paragraph} /></p>)}
          </div>
        </div>
        <dl className="flex flex-col justify-center divide-y divide-primary/10 px-6 py-2 sm:px-10 sm:py-4 xl:px-12">
          {criteria.items.map(({ title, text }) => {
            const Icon = cardIcon(title);
            return (
              <div key={title} className="relative py-4 pl-13 sm:py-5 sm:pl-16">
                <dt className="font-notch text-[18px] leading-snug font-bold text-dark sm:text-[20px]">
                  <span aria-hidden="true" className="absolute top-4 left-0 grid size-10 place-items-center rounded-xl bg-primary/5 text-primary sm:top-5 sm:size-12">
                    <Icon className="size-5 sm:size-6" strokeWidth={1.8} />
                  </span>
                  {title}
                </dt>
                <dd className="mt-1 text-[16px] leading-snug text-dark/75"><RichText text={text} /></dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

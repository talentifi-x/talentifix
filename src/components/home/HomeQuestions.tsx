import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { PageUpdated } from "@components/content/PageUpdated";

/**
 * The homepage's employer questions: a heading block that stays in view on
 * desktop beside an accordion of numbered answers. The first answer starts open
 * and opening one closes the others (native <details name>, no JavaScript).
 * Closed answers are still in the HTML, so search engines and AI assistants
 * read every one.
 */
export function HomeQuestions({ title, items, updatedPath }: {
  title: string;
  items: { question: string; answer: ReactNode }[];
  updatedPath?: string;
}) {
  return (
    <section className="w-full bg-white px-site py-16 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-site grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-16">
        <div className="flex flex-col items-start gap-5 lg:sticky lg:top-[calc(var(--site-header-height,7.5rem)+2rem)] lg:self-start">
          <span className="rounded-full border border-primary/20 bg-primary/[0.04] px-3 py-1 text-[12px] font-bold uppercase tracking-[0.18em] text-primary">
            FAQ
          </span>
          <h2 className="font-notch text-[34px] font-bold leading-[1.1] text-dark md:text-[44px]">
            {title}
            <span className="text-secondary">.</span>
          </h2>
          <p className="max-w-[420px] text-[16px] leading-relaxed text-dark/70 md:text-[17px]">
            Short answers to what employers ask before a first hiring conversation.
          </p>
          <Link
            href="/start-hiring"
            className="hover-pop mt-2 inline-flex min-h-12 items-center gap-2 rounded-[5px] bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:opacity-90"
          >
            Start hiring
            <ArrowRight className="size-[18px]" aria-hidden="true" />
          </Link>
          {updatedPath && <PageUpdated path={updatedPath} />}
        </div>

        <div className="flex flex-col gap-3">
          {items.map(({ question, answer }, i) => (
            <details
              key={question}
              name="home-faq"
              open={i === 0}
              className="faq-item group rounded-2xl border border-[#dbe4fa] bg-white transition-[border-color,box-shadow] duration-300 open:border-primary/30 open:shadow-[0_18px_40px_-28px_rgba(0,0,255,0.45)] hover:border-primary/30"
            >
              <summary className="grid cursor-pointer list-none grid-cols-[40px_minmax(0,1fr)_32px] items-center gap-4 px-5 py-5 md:grid-cols-[56px_minmax(0,1fr)_36px] md:gap-5 md:px-7 md:py-6 [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="font-notch text-[22px] font-bold leading-none text-primary/40 transition-colors group-open:text-primary md:text-[28px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[17px] font-semibold leading-snug text-dark md:text-[20px]">{question}</h3>
                <span
                  aria-hidden="true"
                  className="flex size-8 items-center justify-center rounded-full bg-primary/[0.06] text-primary transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-primary group-open:text-white md:size-9"
                >
                  <Plus className="size-4" strokeWidth={2.5} />
                </span>
              </summary>
              <div className="px-5 pb-6 pl-[76px] md:px-7 md:pb-7 md:pl-[104px]">
                <p className="text-[15px] leading-relaxed text-dark/70 md:text-[16px] [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-4 [&_a:hover]:decoration-primary">
                  {answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

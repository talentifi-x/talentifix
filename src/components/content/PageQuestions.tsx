import type { ReactNode } from "react";
import { PageUpdated } from "./PageUpdated";

/** Visible, server-rendered answers. No accordion or JavaScript is needed to read them. */
export function PageQuestions({ title, items, updatedPath }: {
  title: string;
  items: { question: string; answer: ReactNode }[];
  updatedPath?: string;
}) {
  return (
    <section className="w-full px-site py-12 md:py-16">
      <div className="mx-auto max-w-site">
        <h2 className="font-notch text-3xl font-bold text-dark md:text-4xl">{title}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {items.map(({ question, answer }) => (
            <div key={question}>
              <h3 className="text-xl font-semibold text-dark">{question}</h3>
              <p className="mt-3 leading-relaxed text-dark/75 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4">
                {answer}
              </p>
            </div>
          ))}
        </div>
        {updatedPath && <PageUpdated path={updatedPath} />}
      </div>
    </section>
  );
}

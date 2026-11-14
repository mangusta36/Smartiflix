"use client";

import { useId, useState } from "react";
import type { allFaqItems } from "@/data/faq";

type Item = (typeof allFaqItems)[number];

export function FaqAccordion({ items, theme = "dark" }: { items: Item[]; theme?: "dark" | "light" }) {
  const [open, setOpen] = useState<string | null>(items[0]?.q ?? null);
  const idPrefix = useId().replace(/:/g, "");
  const light = theme === "light";
  return (
    <div className={`divide-y border-y ${light ? "divide-[#C9C0B2] border-[#C9C0B2]" : "divide-[#314942] border-[#314942]"}`}>
      {items.map((item, index) => {
        const isOpen = open === item.q;
        const questionId = `${idPrefix}-question-${index}`;
        const answerId = `${idPrefix}-answer-${index}`;
        return (
          <section key={item.q}>
            <h3>
              <button id={questionId} type="button" className={`flex w-full items-center justify-between gap-4 py-5 text-left font-semibold ${light ? "text-[#081412]" : "text-[#F6EFE2]"}`} aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpen(isOpen ? null : item.q)}>
                <span>{item.q}</span>
                <span className={light ? "text-[#6E4D16]" : "text-[#D6A756]"} aria-hidden="true">{isOpen ? "-" : "+"}</span>
              </button>
            </h3>
            {isOpen ? <div id={answerId} role="region" aria-labelledby={questionId}><p className={`pb-5 text-sm leading-6 ${light ? "text-[#454B46]" : "text-[#9CAEA6]"}`}>{item.a}</p></div> : null}
          </section>
        );
      })}
    </div>
  );
}

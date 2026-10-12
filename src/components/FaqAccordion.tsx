"use client";

import { useState } from "react";
import type { allFaqItems } from "@/data/faq";

type Item = (typeof allFaqItems)[number];

export function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.q ?? null);
  return (
    <div className="divide-y divide-[#314942] border-y border-[#314942]">
      {items.map((item) => {
        const isOpen = open === item.q;
        return (
          <section key={item.q}>
            <button type="button" className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-[#F6EFE2]" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : item.q)}>
              <span>{item.q}</span>
              <span className="text-[#D6A756]" aria-hidden="true">{isOpen ? "-" : "+"}</span>
            </button>
            {isOpen ? <p className="pb-5 text-sm leading-6 text-[#9CAEA6]">{item.a}</p> : null}
          </section>
        );
      })}
    </div>
  );
}

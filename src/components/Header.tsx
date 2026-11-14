"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/Brand";
import { ButtonLink } from "@/components/ButtonLink";
import { whatsappIntentUrl } from "@/lib/whatsapp";

const nav = [
  ["Home", "/"],
  ["Pricing", "/pricing"],
  ["Devices", "/devices"],
  ["FAQ", "/faq"],
  ["Blog", "/blog"],
  ["Support", "/support"],
  ["Reseller", "/reseller"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isCurrent = (href: string) => href === "/" ? pathname === href : pathname.startsWith(href);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#233B35] bg-[#081412]/95 backdrop-blur">
      <div className="container flex min-h-[83px] items-center justify-between gap-4">
        <Brand />
        <nav className="hidden items-center gap-7 text-[13px] font-medium text-[#9CAEA6] lg:flex" aria-label="Main navigation">
          {nav.map(([label, href]) => <Link key={href} href={href} aria-current={isCurrent(href) ? "page" : undefined} className="hover:text-[#F6EFE2] aria-[current=page]:text-[#D6A756]">{label}</Link>)}
        </nav>
        <div className="hidden lg:block"><ButtonLink href={whatsappIntentUrl("trial")}>Free Trial</ButtonLink></div>
        <button className="rounded-sm border border-[#385149] px-3 py-2 text-sm font-semibold text-[#F6EFE2] lg:hidden" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <div id="mobile-menu" className="border-t border-[#233B35] bg-[#0E1F1C] lg:hidden">
          <nav className="container flex flex-col py-4 text-base font-medium" aria-label="Mobile navigation">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} aria-current={isCurrent(href) ? "page" : undefined} className="rounded-md py-3 aria-[current=page]:text-[#D6A756]" onClick={() => setOpen(false)}>{label}</Link>
            ))}
            <ButtonLink href={whatsappIntentUrl("trial")} className="mt-3" onClick={() => setOpen(false)}>Free Trial</ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

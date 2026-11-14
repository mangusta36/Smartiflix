import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return <section className="section bg-[#F6EFE2] text-[#081412]"><div className="container max-w-2xl"><h1 className="text-4xl font-semibold">Page not found</h1><p className="mt-4 leading-7 text-[#454B46]">The page you requested is not published or may have moved. Use the Smartiflix homepage or browse the current setup and troubleshooting guides.</p><div className="mt-6 flex gap-3"><ButtonLink href="/">Home</ButtonLink><Link className="inline-flex min-h-11 items-center text-[#174C3C] underline" href="/blog">Blog hub</Link></div></div></section>;
}

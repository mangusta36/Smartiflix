import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return <section className="section"><div className="container max-w-2xl"><h1 className="text-4xl font-semibold">Page not found</h1><p className="mt-4 leading-7 text-[#5f6761]">The page you requested is not published. Blog article routes are prepared for future content, but no Smartiflix articles are live yet.</p><div className="mt-6 flex gap-3"><ButtonLink href="/">Home</ButtonLink><Link className="inline-flex min-h-11 items-center text-[#174C3C] underline" href="/blog">Blog hub</Link></div></div></section>;
}

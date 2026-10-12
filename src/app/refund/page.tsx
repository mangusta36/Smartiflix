import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Smartiflix Refund Information", description: "General Smartiflix refund information with no unsupported money-back guarantee claims.", alternates: { canonical: "/refund" } };

export default function RefundPage() {
  return <section className="section"><div className="container max-w-3xl"><p className="text-sm text-[#5f6761]"><Link href="/">Home</Link> / Legal</p><h1 className="mt-6 text-4xl font-semibold">Smartiflix Refund Information</h1><div className="mt-8 space-y-5 leading-7 text-[#454b46]"><p>Smartiflix has not published a universal automatic refund or money-back policy on this website. Customers should ask any plan, setup, compatibility, or billing questions before ordering.</p><p>If you believe there is an issue with an order or service access, contact Smartiflix support through WhatsApp with your plan details, device information, and a clear description of the situation. Requests are reviewed based on the circumstances and any applicable business terms provided directly by Smartiflix.</p></div></div></section>;
}

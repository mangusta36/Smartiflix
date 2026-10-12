import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { allFaqItems, faqGroups } from "@/data/faq";

export const metadata: Metadata = {
  title: "Smartiflix FAQ and Help",
  description: "Answers to common Smartiflix questions about plans, devices, setup, playback, support, and reseller inquiries.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: allFaqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  return (
    <section className="section">
      <JsonLd data={schema} />
      <div className="container">
        <p className="text-sm text-[#5f6761]"><Link href="/">Home</Link> / FAQ</p>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold md:text-5xl">Smartiflix FAQ and customer help</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5f6761]">Use these answers to understand plan choices, device compatibility, setup expectations, troubleshooting basics, and the reseller inquiry path.</p>
        <div className="mt-10 space-y-10">{faqGroups.map((group) => <section key={group.title}><h2 className="mb-4 text-2xl font-semibold">{group.title}</h2><FaqAccordion items={group.items} /></section>)}</div>
      </div>
    </section>
  );
}

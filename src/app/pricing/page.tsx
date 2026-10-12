import type { Metadata } from "next";
import Link from "next/link";
import { PricingSelector } from "@/components/PricingSelector";
import { ButtonLink } from "@/components/ButtonLink";
import { whatsappIntentUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Smartiflix Pricing and Subscription Plans",
  description: "See Smartiflix pricing for 1, 3, 6, and 12 month plans with one to five device options.",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Smartiflix Pricing and Subscription Plans", description: "Exact Smartiflix plan pricing by duration and device count." },
};

export default function PricingPage() {
  return (
    <section className="bg-[#081412] py-20">
      <div className="container">
        <p className="text-sm text-[#9CAEA6]"><Link className="hover:text-[#D6A756]" href="/">Home</Link> / Pricing</p>
        <p className="eyebrow mt-10">Smartiflix subscriptions</p>
        <h1 className="display mt-4 max-w-3xl text-4xl leading-tight text-[#F6EFE2] md:text-6xl">Smartiflix pricing by plan length and device count.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#9CAEA6]">Select the number of devices you want covered, then compare the four available subscription lengths. Listed plan prices remain the authoritative base prices. Eligible payment methods without the applicable added payment charge can qualify for a 10% reduction from the listed plan price.</p>
        <div className="mt-10"><PricingSelector /></div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="border border-[#233B35] bg-[#10231F] p-5"><h2 className="text-xl font-semibold text-[#F6EFE2]">Choosing devices</h2><p className="mt-3 leading-7 text-[#9CAEA6]">A device count should reflect how many viewing devices need access. Confirm your setup if you are unsure whether a television, phone, tablet, or computer should be counted separately.</p></div>
          <div className="border border-[#233B35] bg-[#10231F] p-5"><h2 className="text-xl font-semibold text-[#F6EFE2]">Before ordering</h2><p className="mt-3 leading-7 text-[#9CAEA6]">Review <Link className="text-[#D6A756] underline" href="/devices">device guidance</Link> if your setup depends on a specific smart TV, player app, login format, or operating system.</p></div>
          <div className="border border-[#233B35] bg-[#10231F] p-5"><h2 className="text-xl font-semibold text-[#F6EFE2]">Payment options</h2><p className="mt-3 leading-7 text-[#9CAEA6]">Ask Smartiflix which payment methods are eligible for the 10% payment-method reduction before placing an order.</p><ButtonLink href={whatsappIntentUrl("pricing")} variant="plain" className="mt-3 inline-block">Ask About Payment Options</ButtonLink></div>
        </div>
      </div>
    </section>
  );
}

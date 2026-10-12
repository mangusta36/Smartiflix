import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { whatsappIntentUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Smartiflix Reseller Inquiries",
  description: "Contact Smartiflix about reseller inquiries. Specific reseller terms are discussed directly through WhatsApp.",
  alternates: { canonical: "/reseller" },
};

export default function ResellerPage() {
  return (
    <section className="section">
      <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="text-sm text-[#5f6761]"><Link href="/">Home</Link> / Reseller</p><h1 className="mt-6 text-4xl font-semibold md:text-5xl">Smartiflix reseller inquiries</h1><p className="mt-5 text-lg leading-8 text-[#5f6761]">Use this page to contact Smartiflix about reseller interest. Published reseller pricing, margins, territories, credits, and earnings claims are intentionally not listed because those details have not been supplied for public display.</p><ButtonLink href={whatsappIntentUrl("reseller")} className="mt-8">Become a Reseller</ButtonLink></div>
        <div className="rounded-lg border border-[#ded7cb] bg-[#fffdf8] p-6"><h2 className="text-2xl font-semibold">Helpful details to include</h2><ul className="mt-4 space-y-3 leading-7 text-[#5f6761]"><li>Your reseller inquiry context.</li><li>The market or customer type you expect to serve.</li><li>Any operational questions you need answered before proceeding.</li><li>Your preferred follow-up path through WhatsApp.</li></ul></div>
      </div>
      <div className="container mt-10 max-w-4xl border-t border-[#ded7cb] pt-10"><h2 className="text-2xl font-semibold">What happens next</h2><p className="mt-4 leading-7 text-[#5f6761]">The website provides an inquiry path rather than a published reseller catalog. Smartiflix can discuss the details that apply to your situation directly, while the public site avoids presenting unverified margins, territories, credit terms, earnings, or operational guarantees.</p><p className="mt-4 leading-7 text-[#5f6761]">Keep your questions specific and do not send private customer credentials or unrelated account information in an initial inquiry.</p></div>
    </section>
  );
}

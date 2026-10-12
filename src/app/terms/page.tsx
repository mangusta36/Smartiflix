import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Smartiflix Terms of Use", description: "Terms for using the Smartiflix website and contacting Smartiflix about plans and support.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return <section className="section"><div className="container max-w-3xl"><p className="text-sm text-[#5f6761]"><Link href="/">Home</Link> / Legal</p><h1 className="mt-6 text-4xl font-semibold">Smartiflix Terms of Use</h1><div className="mt-8 space-y-5 leading-7 text-[#454b46]"><p>This website provides information about Smartiflix plans, device guidance, reseller inquiries, and support contact paths. Information may be updated as services, pricing, or setup processes change.</p><p>Customers are responsible for choosing an appropriate plan and confirming that their device environment is suitable before ordering. Setup may depend on hardware, operating system, player availability, app-store access, login format, and network conditions.</p><p>Do not misuse the website, interfere with its operation, or submit false inquiry details. Contact Smartiflix directly for current service questions before relying on any information that may affect a purchase decision.</p></div></div></section>;
}

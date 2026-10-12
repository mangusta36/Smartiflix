import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Smartiflix Disclaimer", description: "Smartiflix disclaimer covering compatibility, setup, content claims, and website information.", alternates: { canonical: "/disclaimer" } };

export default function DisclaimerPage() {
  return <section className="section"><div className="container max-w-3xl"><p className="text-sm text-[#5f6761]"><Link href="/">Home</Link> / Legal</p><h1 className="mt-6 text-4xl font-semibold">Smartiflix Disclaimer</h1><div className="mt-8 space-y-5 leading-7 text-[#454b46]"><p>Smartiflix website content is informational and should not be read as a guarantee that every device, player, network, channel, program, or event will be available or compatible. Device and playback results can vary by hardware, software, app availability, setup format, and local network conditions.</p><p>This website does not claim official partnerships with device manufacturers, smart TV platforms, media apps, sports leagues, networks, or content providers unless such a relationship is expressly stated with verified information.</p><p>For current plan, access, compatibility, or reseller details, contact Smartiflix directly before making a decision.</p></div></div></section>;
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Smartiflix Privacy Policy", description: "Privacy information for Smartiflix customer inquiries and website use.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <Legal title="Smartiflix Privacy Policy"><p>Smartiflix may receive information you choose to provide when contacting the business, such as your name, WhatsApp details, device context, plan questions, and support descriptions. This information is used to respond to inquiries, help with setup, and provide customer support.</p><p>Do not send sensitive payment, identity, or account information unless Smartiflix specifically requests it through an appropriate channel. Website analytics or hosting logs may collect basic technical information such as browser type, pages visited, and device information for security and performance purposes.</p><p>Smartiflix does not publish customer contact details on this website. If you want information corrected or removed from normal inquiry records, contact Smartiflix through the available support path.</p></Legal>;
}

function Legal({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="section"><div className="container max-w-3xl"><p className="text-sm text-[#5f6761]"><Link href="/">Home</Link> / Legal</p><h1 className="mt-6 text-4xl font-semibold">{title}</h1><div className="mt-8 space-y-5 leading-7 text-[#454b46]">{children}</div></div></section>;
}

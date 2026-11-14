import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { createPageMetadata } from "@/lib/metadata";
import { whatsappIntentUrl } from "@/lib/whatsapp";

export const metadata: Metadata = createPageMetadata({
  title: "Smartiflix Support and Setup Help",
  description: "Prepare a useful Smartiflix support request for device setup, login, EPG, network, or playback questions.",
  path: "/support",
});

const details = [
  "Device brand and model, when available.",
  "Operating system or TV platform.",
  "Player app and whether it came from the device's official app store.",
  "Login format: M3U or Xtream-compatible fields, without sharing the credentials publicly.",
  "Exact error message or symptom and when it began.",
  "Wi-Fi or Ethernet, plus whether other streaming apps work on the same device.",
];

export default function SupportPage() {
  return (
    <section className="section bg-[#F6EFE2] text-[#081412]">
      <div className="container">
        <p className="text-sm text-[#5f6761]"><Link href="/">Home</Link> / Support</p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">Smartiflix help</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">Get useful setup and playback support.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5f6761]">Start with the guides for general questions. For an account-specific issue, send a concise WhatsApp message with the device, player, login format, connection, and exact symptom.</p>
            <ButtonLink href={whatsappIntentUrl("support")} className="mt-8">Contact WhatsApp Support</ButtonLink>
            <p className="mt-4 text-sm leading-6 text-[#5f6761]">Do not send passwords, full M3U URLs, QR codes, payment-card details, or identity documents in an initial support message.</p>
          </div>
          <div className="border border-[#ded7cb] bg-[#fffdf8] p-6 md:p-8">
            <h2 className="text-2xl font-semibold">Include these details</h2>
            <ul className="mt-5 space-y-3 leading-7 text-[#515a54]">
              {details.map((detail) => <li key={detail} className="flex gap-3"><span aria-hidden="true" className="font-semibold text-[#916719]">✓</span><span>{detail}</span></li>)}
            </ul>
          </div>
        </div>
        <div className="mt-14 grid gap-5 border-t border-[#ded7cb] pt-10 md:grid-cols-3">
          <Link href="/devices" className="border border-[#ded7cb] bg-[#fffdf8] p-5 hover:border-[#916719]"><h2 className="text-xl font-semibold">Device guidance</h2><p className="mt-3 leading-7 text-[#5f6761]">Check Fire TV, smart TV, Apple TV, Android TV, mobile, and computer considerations.</p></Link>
          <Link href="/blog" className="border border-[#ded7cb] bg-[#fffdf8] p-5 hover:border-[#916719]"><h2 className="text-xl font-semibold">Troubleshooting guides</h2><p className="mt-3 leading-7 text-[#5f6761]">Diagnose login, EPG, buffering, Wi-Fi, Ethernet, and player issues step by step.</p></Link>
          <Link href="/faq" className="border border-[#ded7cb] bg-[#fffdf8] p-5 hover:border-[#916719]"><h2 className="text-xl font-semibold">Common questions</h2><p className="mt-3 leading-7 text-[#5f6761]">Review plan, device, setup, support, and reseller answers before contacting support.</p></Link>
        </div>
        <section className="mt-14 border-t border-[#ded7cb] pt-10" aria-labelledby="support-guides-title">
          <h2 id="support-guides-title" className="text-2xl font-semibold">Choose the guide that matches the symptom</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/blog/iptv-not-working-common-problems" className="border border-[#ded7cb] bg-[#fffdf8] p-5 hover:border-[#916719]"><h3 className="font-semibold">IPTV not working</h3><p className="mt-2 text-sm leading-6 text-[#5f6761]">Start here for login, playlist, app, device, or mixed symptoms.</p></Link>
            <Link href="/blog/iptv-buffering-fix-2026" className="border border-[#ded7cb] bg-[#fffdf8] p-5 hover:border-[#916719]"><h3 className="font-semibold">Buffering and freezing</h3><p className="mt-2 text-sm leading-6 text-[#5f6761]">Separate Wi-Fi, Ethernet, player, device, and source behavior.</p></Link>
            <Link href="/blog/iptv-epg-not-working-guide" className="border border-[#ded7cb] bg-[#fffdf8] p-5 hover:border-[#916719]"><h3 className="font-semibold">EPG or TV guide issues</h3><p className="mt-2 text-sm leading-6 text-[#5f6761]">Check XMLTV, mapping, time zone, cache, and refresh behavior.</p></Link>
            <Link href="/blog/internet-speed-for-iptv" className="border border-[#ded7cb] bg-[#fffdf8] p-5 hover:border-[#916719]"><h3 className="font-semibold">Speed and network stability</h3><p className="mt-2 text-sm leading-6 text-[#5f6761]">Measure at the screen and compare Wi-Fi, Ethernet, household use, and timing.</p></Link>
          </div>
        </section>
      </div>
    </section>
  );
}

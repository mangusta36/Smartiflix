import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Smartiflix Device Compatibility and Setup Guidance",
  description: "Read Smartiflix device guidance for Fire TV, Android TV, Google TV, smart TVs, Apple TV, phones, tablets, and computers.",
  path: "/devices",
});

const devices = ["Amazon Fire TV / Firestick", "Android TV", "Google TV", "Samsung Smart TV", "LG Smart TV", "Apple TV", "Phones and tablets", "Computers"];

export default function DevicesPage() {
  return (
    <section className="section bg-[#F6EFE2] text-[#081412]">
      <div className="container">
        <p className="text-sm text-[#5f6761]"><Link href="/">Home</Link> / Devices</p>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold md:text-5xl">Smartiflix device compatibility and setup guidance</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5f6761]">Smartiflix can be used in common TV and mobile environments, but compatibility depends on the device generation, operating system, available player, login or playlist format, app-store availability, and network conditions.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{devices.map((item) => <div key={item} className="rounded-lg border border-[#ded7cb] bg-[#fffdf8] p-5 font-semibold">{item}</div>)}</div>
        <section className="mt-12 border-y border-[#ded7cb] py-10" aria-labelledby="device-guides-title">
          <h2 id="device-guides-title" className="text-2xl font-semibold">Setup and player guides by device</h2>
          <p className="mt-3 max-w-3xl leading-7 text-[#5f6761]">Start with the screen you intend to configure, then use a player guide only when you need to compare app requirements. This keeps device compatibility separate from player preference.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/blog/how-to-install-iptv-on-firestick-2026" className="border border-[#ded7cb] bg-[#fffdf8] p-5 hover:border-[#916719]"><h3 className="font-semibold">Firestick setup</h3><p className="mt-2 text-sm leading-6 text-[#5f6761]">Installation sources, player login, storage, Wi-Fi, and verification.</p></Link>
            <Link href="/blog/best-iptv-player-for-firestick-2026" className="border border-[#ded7cb] bg-[#fffdf8] p-5 hover:border-[#916719]"><h3 className="font-semibold">Firestick player criteria</h3><p className="mt-2 text-sm leading-6 text-[#5f6761]">Compare format support, EPG, remote behavior, persistence, and app source.</p></Link>
            <Link href="/blog/iptv-on-samsung-lg-smart-tv-2026" className="border border-[#ded7cb] bg-[#fffdf8] p-5 hover:border-[#916719]"><h3 className="font-semibold">Samsung and LG TVs</h3><p className="mt-2 text-sm leading-6 text-[#5f6761]">Tizen and webOS app-store, player, EPG, and platform checks.</p></Link>
            <Link href="/blog/best-iptv-players-smart-tv-2026" className="border border-[#ded7cb] bg-[#fffdf8] p-5 hover:border-[#916719]"><h3 className="font-semibold">Smart TV player criteria</h3><p className="mt-2 text-sm leading-6 text-[#5f6761]">Evaluate Samsung, LG, Google TV, and Android TV player requirements.</p></Link>
            <Link href="/blog/iptv-on-apple-tv-2026" className="border border-[#ded7cb] bg-[#fffdf8] p-5 hover:border-[#916719]"><h3 className="font-semibold">Apple TV setup</h3><p className="mt-2 text-sm leading-6 text-[#5f6761]">tvOS player availability, credential entry, EPG, and network checks.</p></Link>
            <Link href="/blog/xtream-codes-vs-m3u" className="border border-[#ded7cb] bg-[#fffdf8] p-5 hover:border-[#916719]"><h3 className="font-semibold">Login formats explained</h3><p className="mt-2 text-sm leading-6 text-[#5f6761]">Understand M3U, server fields, XMLTV, and player compatibility.</p></Link>
          </div>
        </section>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div><h2 className="text-2xl font-semibold">Practical setup flow</h2><ol className="mt-4 space-y-3 leading-7 text-[#5f6761]"><li>1. Choose a plan and device count.</li><li>2. Contact Smartiflix with your preferred device environment.</li><li>3. Receive the applicable access and setup information.</li><li>4. Configure a compatible player or device.</li><li>5. Contact support if assistance is required.</li></ol></div>
          <div><h2 className="text-2xl font-semibold">What to check first</h2><p className="mt-4 leading-7 text-[#5f6761]">Older devices, restricted app stores, unsupported player formats, and unstable Wi-Fi can all affect setup. If you already know the device model and player app you intend to use, share that information when asking Smartiflix for help.</p><div className="mt-6 flex gap-3"><ButtonLink href="/pricing">See Plans</ButtonLink><ButtonLink href="/faq" variant="secondary">Read FAQ</ButtonLink></div></div>
        </div>
        <div className="mt-12 grid gap-10 border-t border-[#ded7cb] pt-10 lg:grid-cols-2">
          <div><h2 className="text-2xl font-semibold">Why compatibility is conditional</h2><p className="mt-4 leading-7 text-[#5f6761]">The screen, operating system, player app, login format, and network all participate in setup. A service that works on one device is not proof that every model or app will behave the same way. Confirm the exact player path before choosing a plan around an older or less common device.</p></div>
          <div><h2 className="text-2xl font-semibold">Details to have ready</h2><ul className="mt-4 space-y-3 leading-7 text-[#5f6761]"><li>Device brand and model, if available.</li><li>Operating system or TV platform.</li><li>Player app name and login format.</li><li>Whether the device uses Wi-Fi or Ethernet.</li></ul></div>
        </div>
      </div>
    </section>
  );
}

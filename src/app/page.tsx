import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PricingSelector } from "@/components/PricingSelector";
import { FaqAccordion } from "@/components/FaqAccordion";
import { allFaqItems } from "@/data/faq";
import { whatsappIntentUrl } from "@/lib/whatsapp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Smartiflix | IPTV Plans and Device Guidance",
  description: "Smartiflix helps viewers compare IPTV subscription plans, choose device counts, understand compatible players, and contact support through WhatsApp.",
  path: "/",
});

const watchWays = [
  ["01", "Smart TVs", "Use Smartiflix on compatible Samsung, LG, Android TV, or Google TV environments when a suitable player is available."],
  ["02", "Streaming devices", "Firestick, Fire TV, Android boxes, and similar streaming hardware are common choices for living-room viewing."],
  ["03", "Phones & tablets", "Mobile devices can work well for secondary screens when the player and login format are supported."],
  ["04", "Computers", "Desktop or laptop viewing can help when you want a larger browser or player-based setup."],
];

const deviceItems = [
  ["Smartiflix on Firestick and Fire TV", "Prepare the device, confirm player availability, and keep login details ready before setup.", "/devices"],
  ["Smartiflix on Smart TVs", "Samsung and LG setups depend on model, app-store access, and compatible player options.", "/devices"],
  ["Smartiflix on Android TV and Google TV", "Android-based screens are often flexible, but the player and operating system still matter.", "/devices"],
  ["Smartiflix on mobile, tablet and computer", "Secondary-screen viewing is easiest when account details and player requirements are clear.", "/devices"],
];

const steps = [
  ["01", "Choose your Smartiflix subscription plan", "Compare the available plan lengths and decide whether one month or a longer subscription fits your routine."],
  ["02", "Review your order details", "Select the device count, check the displayed price, and use the Smartiflix WhatsApp order path."],
  ["03", "Prepare your device and compatible player", "Confirm the device, player app, network connection, and login format before configuration."],
  ["04", "Complete the applicable setup", "Enter the provided access details carefully and contact support if a setup detail does not match."],
];

const loginNotes = [
  ["Smartiflix service", "The subscription and access path come from Smartiflix. The plan duration and device count determine the order conversation."],
  ["Player applications", "Third-party IPTV players may be used where compatible. Smartiflix does not claim ownership of those apps or official partnerships."],
  ["Login formats", "Xtream Codes, M3U links, and EPG information are common IPTV setup concepts. The exact format depends on the details provided."],
];

const reasons = [
  ["Device flexibility", "The site is organized around the screens people already own instead of assuming one universal device setup."],
  ["Setup guidance", "Customers are encouraged to identify the player, login format, and connection conditions before asking for help."],
  ["Plan clarity", "The pricing selector exposes the device count and plan length without fake sale timers or invented discounts."],
  ["Support direction", "Trial, support, reseller, and order paths use the established Smartiflix WhatsApp contact flow."],
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-[706px] overflow-hidden bg-[#081412]">
        <Image
          src="/images/smartiflix-living-room.webp"
          alt=""
          data-decorative="true"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[58%_50%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,20,18,0.94)_0%,rgba(8,20,18,0.82)_38%,rgba(8,20,18,0.34)_68%,rgba(8,20,18,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#081412_0%,rgba(8,20,18,0)_100%)]" />
        <div className="container relative z-10 flex min-h-[706px] items-center py-16">
          <div className="max-w-[680px]">
            <p className="eyebrow">Smartiflix entertainment subscriptions</p>
            <h1 className="display mt-6 max-w-[640px] text-[3.35rem] leading-[1.04] text-[#F6EFE2] md:text-[3.45rem] lg:text-[4.9rem]">Smartiflix for simple home streaming.</h1>
            <p className="mt-6 max-w-[560px] text-base leading-7 text-[#AFC0B8]">Smartiflix helps you compare entertainment subscription plans, choose the device count that fits your home, and prepare compatible screens with practical setup guidance.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/pricing">Explore plans</ButtonLink>
              <ButtonLink href={whatsappIntentUrl("trial")} variant="secondary">Request a trial</ButtonLink>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-8 hidden justify-between border-t border-[#F6EFE2]/15 pt-4 text-[11px] uppercase tracking-[0.14em] text-[#B8C7C0] md:flex">
            <span>01 / plans and devices</span>
            <span>setup-first viewing</span>
          </div>
        </div>
      </section>

      <section className="border-y border-[#233B35] bg-[#0B1916] py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
            <div>
              <p className="eyebrow">Subscriptions</p>
              <h2 className="display mt-4 max-w-[620px] text-4xl leading-tight text-[#F6EFE2] md:text-6xl">Choose a Smartiflix plan that fits your routine.</h2>
            </div>
            <p className="max-w-xl leading-7 text-[#9CAEA6]">One to five devices. A month or a year. Pick the Smartiflix arrangement that suits the way your household watches, then order through the existing WhatsApp path.</p>
          </div>
          <div className="mt-10">
            <PricingSelector compact />
          </div>
          <div className="mt-5 flex flex-col gap-3 border border-[#233B35] bg-[#10231F] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-[#F6EFE2]">Prefer to try it first?</h3>
              <p className="mt-1 text-sm text-[#9CAEA6]">Request a Smartiflix trial before choosing a longer plan.</p>
            </div>
            <ButtonLink href={whatsappIntentUrl("trial")}>Request a trial</ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-[#081412] py-24">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">The experience</p>
              <h2 className="display mt-4 max-w-[540px] text-4xl leading-tight text-[#F6EFE2] md:text-6xl">Plans, devices and setup in one place.</h2>
            </div>
            <p className="max-w-xl leading-7 text-[#9CAEA6]">Compare subscription lengths and device counts, check compatibility before ordering, and use the appropriate setup or support path when a screen needs attention.</p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
            <Image src="/images/smartiflix-living-room.webp" alt="Sunlit living room with a television on a low media console" width={1200} height={900} sizes="(min-width: 1024px) 840px, calc(100vw - 36px)" className="aspect-[16/7] h-full w-full object-cover brightness-[.68] contrast-110" />
            <Image src="/images/smartiflix-remote.webp" alt="Person holding a black television remote control" width={1100} height={900} sizes="(min-width: 1024px) 400px, calc(100vw - 36px)" className="aspect-[4/3] h-full w-full object-cover brightness-[.72] contrast-110" />
          </div>
        </div>
      </section>

      <section className="border-y border-[#233B35] bg-[#10231F] py-20">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow">What it is</p>
            <h2 className="display mt-4 max-w-[420px] text-4xl leading-tight text-[#F6EFE2] md:text-5xl">What is Smartiflix?</h2>
          </div>
          <div className="space-y-5 leading-8 text-[#AFC0B8]">
            <p>Smartiflix is a subscription-focused entertainment service for viewers who want a clearer way to choose a plan, understand device options, and get started with compatible IPTV player applications. The service is presented around practical choices: plan length, device count, setup format, and support direction.</p>
            <p>Internet-based viewing can vary by device, player, network quality, and login details. That is why Smartiflix does not treat setup as a single universal button. Customers can compare the plan matrix, review compatible device categories, and ask support questions with the right information ready.</p>
            <p>For most homes, the best starting point is the screen used most often. A single living-room TV may only need one device on the plan. A household that expects phones, tablets, a second room device, or a computer to be active should choose the device count before ordering.</p>
            <p>This page explains the service at a broad level. Pricing owns plan and purchase information, Devices covers compatibility, Support handles account-specific help, FAQ answers recurring questions, and the Blog provides educational setup and troubleshooting guides.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#10231F] py-20">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Watch your way</p>
            <h2 className="display mt-4 max-w-[500px] text-4xl leading-tight text-[#F6EFE2] md:text-5xl">Watch Smartiflix on your preferred screen.</h2>
            <p className="mt-5 leading-7 text-[#9CAEA6]">Choose the number of Smartiflix devices you need. Setup guidance is available for compatible players on the screens you already use.</p>
            <ButtonLink href="/faq" variant="plain" className="mt-6 inline-block">See how setup works</ButtonLink>
          </div>
          <div className="divide-y divide-[#314942] border-y border-[#314942]">
            {watchWays.map(([num, title, text]) => (
              <div key={title} className="grid gap-4 py-5 sm:grid-cols-[72px_180px_1fr]">
                <span className="text-sm font-semibold text-[#D6A756]">{num}</span>
                <h3 className="font-semibold text-[#F6EFE2]">{title}</h3>
                <p className="text-sm leading-6 text-[#9CAEA6]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#081412] py-20">
        <div className="container">
          <div className="mb-10 max-w-[720px]">
            <p className="eyebrow">Device compatibility</p>
            <h2 className="display mt-4 text-4xl leading-tight text-[#F6EFE2] md:text-5xl">Set up Smartiflix on the device you use.</h2>
            <p className="mt-5 leading-7 text-[#9CAEA6]">Device support is easiest to understand when you separate the screen, the player app, and the login format. These paths cover the most common ways viewers prepare Smartiflix at home.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {deviceItems.map(([title, text, href]) => (
              <Link key={title} href={href} className="block border border-[#233B35] bg-[#10231F] p-5 hover:border-[#D6A756]">
                <h3 className="font-semibold text-[#F6EFE2]">{title}</h3>
                <p className="mt-4 min-h-24 text-sm leading-6 text-[#9CAEA6]">{text}</p>
                <span className="mt-4 inline-block text-xs font-semibold text-[#D6A756]">Device guide ↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B1916] py-20">
        <div className="container">
          <p className="eyebrow">How it works</p>
          <h2 className="display mt-4 max-w-[660px] text-4xl leading-tight text-[#F6EFE2] md:text-5xl">How Smartiflix setup works.</h2>
          <div className="mt-10 grid border-y border-[#314942] lg:grid-cols-4">
            {steps.map(([num, title, text]) => (
              <div key={title} className="border-b border-[#314942] py-7 lg:border-b-0 lg:border-r lg:px-6 lg:last:border-r-0">
                <p className="text-sm font-semibold text-[#D6A756]">{num}</p>
                <h3 className="mt-4 min-h-14 font-semibold text-[#F6EFE2]">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#9CAEA6]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#10231F] py-20">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Players and logins</p>
            <h2 className="display mt-4 max-w-[520px] text-4xl leading-tight text-[#F6EFE2] md:text-5xl">Smartiflix service, player apps and login details.</h2>
            <p className="mt-5 leading-7 text-[#9CAEA6]">Many first-time IPTV users get stuck because setup involves three separate pieces. Understanding the difference helps you ask better questions and avoid entering details in the wrong place.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {loginNotes.map(([title, text]) => (
              <div key={title} className="border border-[#233B35] bg-[#0B1916] p-5">
                <h3 className="font-semibold text-[#F6EFE2]">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#9CAEA6]">{text}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-start-2">
            <p className="max-w-3xl border-t border-[#314942] pt-5 text-sm leading-7 text-[#9CAEA6]">If your setup information includes an M3U link, Xtream Codes style fields, or EPG data, treat those details as private account information. Enter them only inside the compatible player environment you intend to use, and avoid sharing screenshots that reveal access details when asking general questions.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#081412] py-20">
        <div className="container">
          <div className="mb-10 max-w-[680px]">
            <p className="eyebrow">Why Smartiflix</p>
            <h2 className="display mt-4 text-4xl leading-tight text-[#F6EFE2] md:text-5xl">Smartiflix is built around real setup decisions.</h2>
            <p className="mt-5 leading-7 text-[#9CAEA6]">The strongest setup is not just a plan. It is the right device, the right player, a clear login path, and a support message that includes the details needed to help.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map(([title, text]) => (
              <div key={title} className="border border-[#233B35] bg-[#10231F] p-5">
                <h3 className="font-semibold text-[#F6EFE2]">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#9CAEA6]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#10231F] py-20">
        <div className="container grid gap-10 lg:grid-cols-[.82fr_1.18fr]">
          <div>
            <p className="eyebrow">Setup help</p>
            <h2 className="display mt-4 max-w-[500px] text-4xl leading-tight text-[#F6EFE2] md:text-5xl">Choose the right Smartiflix setup direction.</h2>
            <p className="mt-5 leading-7 text-[#9CAEA6]">Use the Smartiflix setup and troubleshooting guides for detailed device, player, login-format, EPG, network, and playback help. For account-specific assistance, contact support with your device model, compatible player, login format, and connection details.</p>
          </div>
          <div className="divide-y divide-[#314942] border-y border-[#314942]">
            <Link href="/devices" className="flex justify-between gap-4 py-5 font-semibold text-[#F6EFE2] hover:text-[#D6A756]">Smartiflix device guide <span>↗</span></Link>
            <Link href="/blog" className="flex justify-between gap-4 py-5 font-semibold text-[#F6EFE2] hover:text-[#D6A756]">Setup and troubleshooting guides <span>↗</span></Link>
            <Link href="/faq" className="flex justify-between gap-4 py-5 font-semibold text-[#F6EFE2] hover:text-[#D6A756]">Setup and playback FAQ <span>↗</span></Link>
            <Link href={whatsappIntentUrl("support")} className="flex justify-between gap-4 py-5 font-semibold text-[#F6EFE2] hover:text-[#D6A756]">WhatsApp support <span>↗</span></Link>
          </div>
          <div className="lg:col-start-2">
            <p className="text-sm leading-7 text-[#9CAEA6]">Before setup, write down the device model, the player name, whether the device is using Wi-Fi or Ethernet, and the exact message shown if something fails. Smartiflix support can then focus on the practical issue instead of starting from a blank description.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#10231F] py-20">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Good to know</p>
            <h2 className="display mt-4 max-w-[520px] text-4xl leading-tight text-[#F6EFE2] md:text-5xl">Smartiflix questions, answered clearly.</h2>
            <p className="mt-5 leading-7 text-[#9CAEA6]">Answers about Smartiflix plans, devices, player apps, setup help, and getting started.</p>
            <ButtonLink href="/faq" variant="plain" className="mt-6 inline-block">All questions</ButtonLink>
          </div>
          <FaqAccordion items={allFaqItems.slice(0, 6)} />
        </div>
      </section>

      <section className="bg-[#152A25] py-20">
        <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2 className="display mt-4 max-w-[720px] text-4xl leading-tight text-[#F6EFE2] md:text-5xl">Start your Smartiflix subscription when you are ready.</h2>
            <p className="mt-5 max-w-[620px] leading-7 text-[#9CAEA6]">Choose the plan, confirm the device count, and use Smartiflix support whenever setup details need a closer look.</p>
          </div>
          <ButtonLink href="/pricing">Explore subscriptions</ButtonLink>
        </div>
      </section>
    </>
  );
}

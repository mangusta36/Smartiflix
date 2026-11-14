import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogArticles } from "@/data/blog";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Smartiflix IPTV Setup and Troubleshooting Guides",
  description: "Smartiflix guides for IPTV setup, players, Firestick, Smart TV, Xtream Codes, M3U, EPG, buffering, internet speed, and troubleshooting.",
  path: "/blog",
});

const categories = ["IPTV fundamentals & formats", "Device setup & compatibility", "Streaming players", "Performance & troubleshooting"] as const;

const categoryDescriptions: Record<(typeof categories)[number], string> = {
  "IPTV fundamentals & formats": "Understand playlist structures, login fields, XMLTV, and how players interpret access data.",
  "Device setup & compatibility": "Choose a supported app path for Fire TV, Samsung, LG, or Apple TV before entering private details.",
  "Streaming players": "Evaluate players by platform support, login format, guide behavior, remote usability, and persistence.",
  "Performance & troubleshooting": "Separate network, device, player, guide, account, and stream symptoms with controlled checks.",
};

function categoryId(category: string) {
  return category.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function BlogPage() {
  return (
    <section className="bg-[#081412] py-20">
      <div className="container">
        <p className="text-sm text-[#9CAEA6]"><Link className="hover:text-[#D6A756]" href="/">Home</Link> / Blog</p>
        <p className="eyebrow mt-10">Smartiflix guides</p>
        <h1 className="display mt-4 max-w-4xl text-4xl leading-tight text-[#F6EFE2] md:text-6xl">IPTV setup, player, device and troubleshooting guides.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#9CAEA6]">Research-led Smartiflix resources for configuring compatible IPTV players, understanding login formats, improving playback, and solving common setup issues.</p>
        <nav aria-label="Guide categories" className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => <a key={category} href={`#${categoryId(category)}`} className="min-h-11 rounded-sm border border-[#314942] px-4 py-3 text-sm font-semibold text-[#D7E0DB] hover:border-[#D6A756]">{category}</a>)}
          <a href="#smartiflix-product-support" className="min-h-11 rounded-sm border border-[#314942] px-4 py-3 text-sm font-semibold text-[#D7E0DB] hover:border-[#D6A756]">Smartiflix product & support</a>
        </nav>
        <div className="mt-14 space-y-16">
          {categories.map((category) => (
            <section key={category} id={categoryId(category)} className="scroll-mt-28">
              <div className="flex items-end justify-between gap-4 border-b border-[#314942] pb-4">
                <div>
                  <h2 className="display text-3xl text-[#F6EFE2] md:text-4xl">{category}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-[#9CAEA6]">{categoryDescriptions[category]}</p>
                </div>
                <p className="text-sm text-[#9CAEA6]">{blogArticles.filter((article) => article.category === category).length} guides</p>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {blogArticles.filter((article) => article.category === category).map((article) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`} className="group grid gap-5 border border-[#233B35] bg-[#10231F] p-5 md:grid-cols-[180px_1fr]">
                    <Image src={article.image} alt="" data-decorative="true" width={360} height={260} sizes="(min-width: 768px) 180px, calc(100vw - 76px)" className="aspect-[4/3] h-full w-full object-cover brightness-75" />
                    <span>
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#D6A756]">{article.primaryKeyword}</span>
                      <span className="mt-3 block text-xl font-semibold leading-tight text-[#F6EFE2] group-hover:text-[#D6A756]">{article.title}</span>
                      <span className="mt-3 block text-sm leading-6 text-[#9CAEA6]">{article.description}</span>
                      <span className="mt-4 block text-xs text-[#B8C7C0]">{article.readingTime}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
          <section id="smartiflix-product-support" className="scroll-mt-28">
            <div className="border-b border-[#314942] pb-4">
              <h2 className="display text-3xl text-[#F6EFE2] md:text-4xl">Smartiflix product information & support</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#9CAEA6]">Move from educational guidance to verified plan details, device compatibility, common answers, or account-specific support.</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Plans and device counts", "/pricing", "Compare current durations, prices, and the number of screens required."],
                ["Device compatibility", "/devices", "Start from the screen, operating system, player, and login format."],
                ["Common questions", "/faq", "Review plan, setup, playback, and reseller answers."],
                ["Support preparation", "/support", "Collect the device, player, format, network, and exact symptom."],
              ].map(([title, href, description]) => (
                <Link key={href} href={href} className="border border-[#233B35] bg-[#10231F] p-5 hover:border-[#D6A756]">
                  <h3 className="font-semibold text-[#F6EFE2]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#9CAEA6]">{description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogArticles } from "@/data/blog";

export const metadata: Metadata = {
  title: "Smartiflix IPTV Setup and Troubleshooting Guides",
  description: "Smartiflix guides for IPTV setup, players, Firestick, Smart TV, Xtream Codes, M3U, EPG, buffering, internet speed, and troubleshooting.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <section className="bg-[#081412] py-20">
      <div className="container">
        <p className="text-sm text-[#9CAEA6]"><Link className="hover:text-[#D6A756]" href="/">Home</Link> / Blog</p>
        <p className="eyebrow mt-10">Smartiflix guides</p>
        <h1 className="display mt-4 max-w-4xl text-4xl leading-tight text-[#F6EFE2] md:text-6xl">IPTV setup, player, device and troubleshooting guides.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#9CAEA6]">Research-led Smartiflix resources for configuring compatible IPTV players, understanding login formats, improving playback, and solving common setup issues.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {blogArticles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group grid gap-5 border border-[#233B35] bg-[#10231F] p-5 md:grid-cols-[180px_1fr]">
              <Image src={article.image} alt={article.imageAlt} width={360} height={260} className="aspect-[4/3] h-full w-full object-cover brightness-75" />
              <span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#D6A756]">{article.primaryKeyword}</span>
                <span className="mt-3 block text-xl font-semibold leading-tight text-[#F6EFE2] group-hover:text-[#D6A756]">{article.title}</span>
                <span className="mt-3 block text-sm leading-6 text-[#9CAEA6]">{article.description}</span>
                <span className="mt-4 block text-xs text-[#B8C7C0]">{article.readingTime}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

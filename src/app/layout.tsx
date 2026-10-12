import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: { default: "Smartiflix | IPTV Plans and Device Guidance", template: "%s | Smartiflix" },
  description: site.description,
  openGraph: { siteName: "Smartiflix", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const org = { "@context": "https://schema.org", "@type": "Organization", name: "Smartiflix", url: absoluteUrl("/") };
  const website = { "@context": "https://schema.org", "@type": "WebSite", name: "Smartiflix", url: absoluteUrl("/") };
  return (
    <html lang="en">
      <body className={inter.variable}>
        <JsonLd data={org} />
        <JsonLd data={website} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

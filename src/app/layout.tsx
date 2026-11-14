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
  const organizationId = absoluteUrl("/#organization");
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: "Smartiflix",
    url: absoluteUrl("/"),
    description: site.description,
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: "Smartiflix",
    url: absoluteUrl("/"),
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": organizationId },
  };
  return (
    <html lang="en">
      <body className={inter.variable}>
        <JsonLd data={org} />
        <JsonLd data={website} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

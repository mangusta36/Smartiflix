import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  image = "/images/smartiflix-living-room.webp",
  imageAlt = "Sunlit living room with a television on a low media console",
}: PageMetadataOptions): Metadata {
  const imageUrl = absoluteUrl(image);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: "Smartiflix",
      type,
      images: [{ url: imageUrl, alt: imageAlt, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}


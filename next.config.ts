import type { NextConfig } from "next";
import { CANONICAL_ORIGIN } from "./src/lib/site";

const nextConfig: NextConfig = {
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "tvsmartiflix.online" }],
      destination: `${CANONICAL_ORIGIN}/:path*`,
      permanent: true,
    }];
  },
};

export default nextConfig;

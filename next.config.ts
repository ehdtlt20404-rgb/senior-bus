import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/senior-bus",
  assetPrefix: "/senior-bus",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

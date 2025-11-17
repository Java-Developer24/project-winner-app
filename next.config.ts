// next.config.ts  (drop-in replacement)
import type { NextConfig } from "next";
import path from "node:path";
import fs from "node:fs";

const LOADER_PATH = path.resolve(__dirname, "src/visual-edits/component-tagger-loader.js");
const LOADER = fs.existsSync(LOADER_PATH) ? LOADER_PATH : undefined;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "*" },
      { protocol: "http", hostname: "*" }
    ],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // IMPORTANT: do not set outputFileTracingRoot in Vercel builds unless you fully control the root/monorepo layout
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: { optimizePackageImports: ["framer-motion"] },
  turbopack: LOADER
    ? {
        rules: {
          "*.{jsx,tsx}": {
            loaders: [LOADER],
          },
        },
      }
    : undefined,
};

export default nextConfig;

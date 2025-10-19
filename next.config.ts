import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // <-- Commente ou supprime cette ligne
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;

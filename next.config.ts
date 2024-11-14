import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tzwbgsuodjvilrwwripc.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.supabets.co.za",
      },
      {
        protocol: "https",
        hostname: "aggregator-prod.bitville-api.com",
      },
      {
        protocol: "https",
        hostname: "supaskins-frontend.azurewebsites.net",
      },
    ],
  },
};

export default nextConfig;

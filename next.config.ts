import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // @ts-expect-error - allowedDevOrigins is a valid config option but might be missing from the type definition
  allowedDevOrigins: ["localhost:3000", "192.168.0.162:3000"],
};

export default nextConfig;

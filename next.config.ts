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
  allowedDevOrigins: ["localhost:3000", "192.168.0.162:3000"],
  serverExternalPackages: [
    '@prisma/client',
    '.prisma',
    'better-sqlite3',
    '@prisma/adapter-better-sqlite3',
  ],
};

export default nextConfig;

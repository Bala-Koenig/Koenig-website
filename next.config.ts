import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rms.koenig-solutions.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

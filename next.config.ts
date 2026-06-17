import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
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

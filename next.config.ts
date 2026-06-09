import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
};

export default nextConfig;

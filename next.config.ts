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
  eslint: {
    // Project has pre-existing lint debt outside the kiosk scope.
    // Kiosk code is checked via `npm run lint` (eslint src/app/kiosk).
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

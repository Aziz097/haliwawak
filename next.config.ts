import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/kiosk/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  experimental: {
    serverActions: {
      // Vercel rejects serverless request bodies over 4.5 MB, so a 50 MB limit
      // here only moved the failure to a place with a worse error message.
      bodySizeLimit: '4mb',
    },
  },
  images: {
    remotePatterns: [],
  },
  eslint: {
    // Project has pre-existing lint debt outside the kiosk scope.
    // Kiosk code is checked via `npm run lint` (eslint src/app/kiosk).
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't fail production builds on type issues (we still type-check in dev/CI)
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

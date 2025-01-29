/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

/** File next.config dibuat otomatis di root project untuk ngatur konfigurasi tambahan di project nextjs
 * https://nextjs.org/docs/pages/api-reference/config/next-config-js
 */

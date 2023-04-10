/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.ko-fi.com",
        port: "",
        pathname: "/cdn/**",
      },
    ],
  },
};

module.exports = nextConfig;

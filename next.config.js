/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/referral",
        destination: "/",
        permanent: true,
      },
    ];
  },
  experimental: {
    edge: true,
  }
};

module.exports = nextConfig;

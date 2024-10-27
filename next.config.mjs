/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.technodom.kz',
        port: '',
        pathname: '/_next/**',
      },
      {
        protocol: 'https',
        hostname: 'api.technodom.kz',
        port: '',
        pathname: '/f3/api/v1/images/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'https://5l1c57hd-3000.euw.devtunnels.ms/'],
    },
  },
  reactStrictMode: false,
};

export default nextConfig;

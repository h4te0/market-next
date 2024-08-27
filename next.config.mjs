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
    ],
  },
};

export default nextConfig;

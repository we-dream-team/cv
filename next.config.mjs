/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};
export default nextConfig;

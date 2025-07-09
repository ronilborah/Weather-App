/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdn.weatherapi.com'],
    unoptimized: true,
  },
  // Enable static exports if needed
  // output: 'export',
  // trailingSlash: true,
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'clipeiroai-1.onrender.com'],
  },
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
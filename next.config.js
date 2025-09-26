/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'clipeiroai-1.onrender.com', 'clipeiroai.onrender.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
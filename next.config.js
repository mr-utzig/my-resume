/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: true,
  eslint: {
    dirs: ['src']
  },
  devIndicators: {
    buildActivity: true
  },
}

module.exports = nextConfig

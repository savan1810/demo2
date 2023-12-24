/** @type {import('next').NextConfig} */

const nextConfig = {
    formats: ['image/gif', 'image/webp'],
    image: [
      {
        protocol: 'https',
        hostname: 'api.giphy.com',
        port: '',
        pathname: '/image/upload/**',
      },
    ],
}

module.exports = nextConfig

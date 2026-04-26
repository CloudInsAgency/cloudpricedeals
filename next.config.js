/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'm.media-amazon.com',
      'images-na.ssl-images-amazon.com',
      'wsrv.nl',
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.cloudpricedeals.com' }],
        destination: 'https://cloudpricedeals.com/:path*',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      { source: '/favicon.ico', destination: '/icon' },
    ]
  },
}
module.exports = nextConfig

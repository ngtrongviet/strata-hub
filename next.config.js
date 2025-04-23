/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['saogaxmfspexaelizzlk.supabase.co'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // Assuming PHP server runs on port 8000
      },
    ]
  },
}

module.exports = nextConfig
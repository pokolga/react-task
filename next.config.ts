import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  distDir: './dist',
  images: {
    domains: ['rickandmortyapi.com'],
  },
  env: {
    API_URL: 'https://rickandmortyapi.com/api',
  },
};

export default nextConfig;

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  reactStrictMode: true,
  // Force webpack for production builds (required for next-pwa)
  webpack: (config) => {
    return config;
  },
});
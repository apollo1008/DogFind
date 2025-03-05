/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["frontend-take-home-service.fetch.com"], // Allow loading images from the API domain
    unoptimized: true // For static exports if needed
  },
  reactStrictMode: true,
  // Configure to work with our API CORS settings
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "assets.promediateknologi.id",
      "awsimages.detik.net.id",
      "cdn.pixabay.com",
      "ggm-api.gatenzteam.com",
    ],
    unoptimized: true, // Add this line for Netlify compatibility
  },
  output: "standalone", // Add this line for better Netlify compatibility
};

export default nextConfig;

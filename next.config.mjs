/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "assets.promediateknologi.id",
      "awsimages.detik.net.id",
      "cdn.pixabay.com",
    ],
  },
};

export default nextConfig;

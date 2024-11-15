/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "no-referrer-when-downgrade",
  },
  {
    key: "Content-Security-Policy",
    value:
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com https://app.sandbox.midtrans.com/ https://app.midtrans.com/; object-src 'none'; frame-ancestors 'none'; form-action 'self';",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(self 'https://inquiry.withpersona.com')",
  },
  {
    key: "Cache-Control",
    value: "no-store",
  },
];

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
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
  output: "standalone", // Add this line for Netlify compatibility
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_NODE_ENV === "production",
  },
};

export default nextConfig;

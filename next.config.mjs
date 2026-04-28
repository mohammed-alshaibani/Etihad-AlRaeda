import { withPayload } from "@payloadcms/next/withPayload"

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Fix: Next.js 15 generates mismatched preload/stylesheet URLs for routes
    // with encoded special chars like [[...segments]] → %5B%5B...segments%5D%5D.
    // true = loose chunking → flat CSS strategy that avoids the URL mismatch,
    // allowing @payloadcms/ui/styles.css to be applied correctly.
    // Required for Payload 3 + Next 15 to prevent CSS chunk URL mismatches
    cssChunking: true,
    optimizePackageImports: ["@payloadcms/ui"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/quote",
        destination: "https://forms.gle/vx4zh7ed2PCreFds6",
        permanent: true,
      },
      {
        source: "/request-quote",
        destination: "https://forms.gle/vx4zh7ed2PCreFds6",
        permanent: true,
      },
    ]
  },
}

export default withPayload(nextConfig)

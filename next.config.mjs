/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // TODO: tsc алдаануудыг засаад false болгох
  },
  images: {
    remotePatterns: [
      // Admin-аас upload хийсэн зургууд (Azure Blob)
      { protocol: "https", hostname: "bodipropertiesstorage.blob.core.windows.net" },
      // Мэдээнд зураг байхгүй үед YouTube thumbnail
      { protocol: "https", hostname: "img.youtube.com" },
      // Fallback болон careers hero зургууд
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
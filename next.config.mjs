/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // TODO: tsc алдаануудыг засаад false болгох
  },
  images: {
    // Боловсруулсан зургийг 30 хоног хадгална.
    // Аюулгүй: upload-ын файлын нэр бүр timestamp-тай тул зураг солигдоход URL өөрчлөгддөг.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "bodipropertiesstorage.blob.core.windows.net" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
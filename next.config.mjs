/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "of3cnlsryfyioeqq.public.blob.vercel-storage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "shoplineimg.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;

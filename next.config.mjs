/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rnusbgztaqryfvzsewpu.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/all-products/**",
      },
    ],
  },
};

export default nextConfig;

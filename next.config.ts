import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dqazelmiyucotzhxejyg.supabase.co",
        pathname: "/storage/v1/object/public/property-images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    qualities: [25, 50, 75, 90],
  },
};

export default nextConfig;

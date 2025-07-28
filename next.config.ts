import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/users",
        destination: "https://jsonplaceholder.org/users",
      },
    ];
  },
};

export default nextConfig;

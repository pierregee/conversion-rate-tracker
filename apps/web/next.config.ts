import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://puffer-vault-rate-api.netlify.app/.netlify/functions/index",
  },
};

module.exports = nextConfig;

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint:{
    ignoreDuringBuilds:true,
  },
  images:{
    domains: ['whnjdyyguabkkgvpwgzb.supabase.co'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Increase to match Supabase's max file size
    },
  },
  pageExtensions: ['ts', 'tsx']
};

export default nextConfig;

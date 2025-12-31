import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable static export for GitHub Pages
  output: process.env.GITHUB_PAGES === 'true' ? 'export' : undefined,
  images: {
    // Disable image optimization for static export (required for GitHub Pages)
    unoptimized: process.env.GITHUB_PAGES === 'true',
  },
};

export default nextConfig;

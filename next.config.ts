import type { NextConfig } from "next";

// Get repository name from environment or default to 'cmaa-foods'
// For GitHub Pages project sites, the URL is: https://username.github.io/repository-name/
const getBasePath = (): string => {
  if (process.env.GITHUB_PAGES !== 'true') {
    return ''; // No basePath for non-GitHub Pages deployments
  }
  
  // Try to get from GITHUB_REPOSITORY (format: owner/repo-name)
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    return `/${repoName}`;
  }
  
  // Fallback to BASE_PATH env var or default
  return process.env.BASE_PATH || '/cmaa-foods';
};

const basePath = getBasePath();

const nextConfig: NextConfig = {
  /* config options here */
  // Enable static export for GitHub Pages
  output: process.env.GITHUB_PAGES === 'true' ? 'export' : undefined,
  // Set basePath for GitHub Pages (repository name)
  basePath: basePath,
  // Set assetPrefix to match basePath for static assets
  assetPrefix: basePath,
  images: {
    // Disable image optimization for static export (required for GitHub Pages)
    unoptimized: process.env.GITHUB_PAGES === 'true',
  },
};

export default nextConfig;

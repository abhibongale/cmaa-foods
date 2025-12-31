# Deployment Guide

This project includes GitHub Actions workflows for deploying to various platforms.

## Available Workflows

### 1. **Vercel Deployment** (Recommended for Next.js)
- **File**: `.github/workflows/deploy-vercel.yml`
- **Best for**: Next.js applications with server-side features
- **Setup**:
  1. Create a Vercel account at [vercel.com](https://vercel.com)
  2. Create a new project in Vercel
  3. Get your tokens from Vercel dashboard:
     - Go to Settings → Tokens
     - Create a new token
  4. Add GitHub Secrets:
     - `VERCEL_TOKEN`: Your Vercel token
     - `VERCEL_ORG_ID`: Your Vercel organization ID
     - `VERCEL_PROJECT_ID`: Your Vercel project ID
  5. Push to `main` or `master` branch to trigger deployment

### 2. **Netlify Deployment**
- **File**: `.github/workflows/deploy-netlify.yml`
- **Best for**: Static sites and Next.js static exports
- **Setup**:
  1. Create a Netlify account at [netlify.com](https://netlify.com)
  2. Create a new site in Netlify
  3. Get your tokens from Netlify dashboard:
     - Go to User settings → Applications → New access token
  4. Add GitHub Secrets:
     - `NETLIFY_AUTH_TOKEN`: Your Netlify auth token
     - `NETLIFY_SITE_ID`: Your Netlify site ID
  5. Push to `main` or `master` branch to trigger deployment

### 3. **GitHub Pages Deployment**
- **File**: `.github/workflows/deploy-github-pages.yml`
- **Best for**: Static site hosting (requires Next.js static export)
- **Setup**:
  1. Enable GitHub Pages in your repository settings
  2. Go to Settings → Pages
  3. Select "GitHub Actions" as the source
  4. Update `next.config.ts` to enable static export (see below)
  5. Push to `main` or `master` branch to trigger deployment

### 4. **CI Workflow** (Build and Test Only)
- **File**: `.github/workflows/ci.yml`
- **Purpose**: Run tests and build checks on every push/PR
- **No setup required** - works automatically

## Setting Up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each required secret for your chosen deployment platform

## For GitHub Pages (Static Export)

If you want to use GitHub Pages, you need to enable static export in `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
```

**Note**: Static export disables some Next.js features like:
- API routes
- Server-side rendering (SSR)
- Image optimization
- Dynamic routes with `generateStaticParams`

## Recommended Setup

For a Next.js app with full features, use **Vercel**:
- Zero configuration needed
- Automatic deployments
- Built-in CDN
- Serverless functions support
- Preview deployments for PRs

## Workflow Triggers

All deployment workflows trigger on:
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

## Monitoring Deployments

- Check workflow status in the **Actions** tab of your GitHub repository
- View deployment logs for debugging
- Set up notifications in your deployment platform

## Troubleshooting

### Build Failures
- Check the Actions tab for error logs
- Verify all dependencies are in `package.json`
- Ensure Node.js version matches (currently set to 20)

### Deployment Failures
- Verify all required secrets are set correctly
- Check that your deployment platform account is active
- Review platform-specific logs

### Image Issues
- Ensure all images are in `public/assets/` directory
- Verify image paths use absolute paths (`/assets/...`)
- Check that images are committed to the repository


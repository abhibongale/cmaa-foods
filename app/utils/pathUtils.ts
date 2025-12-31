/**
 * Utility functions for handling paths in different deployment environments
 * Especially important for GitHub Pages which uses a basePath
 */

/**
 * Get the base path for the current deployment
 * In GitHub Pages, this will be the repository name (e.g., '/cmaa-foods')
 * In other environments, this will be an empty string
 */
export function getBasePath(): string {
  // First, check environment variable (set during build for GitHub Pages)
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BASE_PATH) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }
  
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // For GitHub Pages, the pathname will start with the repo name
    // e.g., '/cmaa-foods/' or '/cmaa-foods'
    const pathname = window.location.pathname;
    
    // If we're at root or a known route, no basePath
    if (pathname === '/' || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
      return '';
    }
    
    // Extract the first segment
    const match = pathname.match(/^\/([^\/]+)/);
    if (match && match[1] !== '') {
      // Check if it's not a common Next.js route
      const commonRoutes = ['_next', 'api', 'blog', 'product', 'sweet', 'seasonal', 'checkout'];
      if (!commonRoutes.includes(match[1])) {
        // This is likely the basePath (repository name)
        return `/${match[1]}`;
      }
    }
  }
  
  return '';
}

/**
 * Get the correct asset path for images, videos, etc.
 * Automatically prepends basePath if needed
 * 
 * @param path - The asset path (e.g., '/assets/image.png')
 * @returns The path with basePath prepended if needed
 */
export function getAssetPath(path: string): string {
  // If path is already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  const basePath = getBasePath();
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // If basePath exists and path doesn't already include it, prepend it
  if (basePath && !normalizedPath.startsWith(basePath)) {
    return `${basePath}${normalizedPath}`;
  }
  
  return normalizedPath;
}


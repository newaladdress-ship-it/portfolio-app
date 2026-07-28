/**
 * Image Optimization Utilities
 * Provides helpers for optimized image loading with WebP support, lazy loading, and responsive images
 */

export type ImageFormat = 'webp' | 'jpg' | 'png' | 'gif';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  format?: ImageFormat;
  style?: React.CSSProperties;
}

/**
 * Generate responsive image srcset for different screen sizes
 * Supports 1x, 2x, and 3x pixel densities
 */
export function generateSrcSet(
  basePath: string,
  sizes: number[] = [320, 640, 960, 1280, 1920]
): string {
  return sizes.map(size => `${basePath}?w=${size} ${size}w`).join(', ');
}

/**
 * Get appropriate loading strategy based on image priority
 */
export function getLoadingStrategy(priority: boolean = false): 'eager' | 'lazy' {
  return priority ? 'eager' : 'lazy';
}

/**
 * Generate WebP format with fallback
 */
export function generateWebPSrcSet(
  basePath: string
): { webp: string; fallback: string } {
  const baseWithoutExt = basePath.replace(/\.[^/.]+$/, '');
  
  return {
    webp: generateSrcSet(`${baseWithoutExt}.webp`),
    fallback: generateSrcSet(basePath),
  };
}

/**
 * Calculate aspect ratio for responsive image containers
 */
export function calculateAspectRatio(
  width: number,
  height: number
): number {
  return (height / width) * 100;
}

/**
 * Optimize image attributes for Core Web Vitals
 * - Sets proper dimensions to prevent layout shift
 * - Adds lazy loading for below-fold images
 * - Enables progressive image loading
 */
export function getOptimizedImageAttrs(
  props: OptimizedImageProps
): Record<string, any> {
  const {
    src,
    alt,
    width,
    height,
    priority = false,
    sizes,
  } = props;

  return {
    src,
    alt,
    loading: getLoadingStrategy(priority),
    decoding: 'async',
    ...(width && height && {
      width,
      height,
      style: { aspectRatio: `${width}/${height}` },
    }),
    ...(sizes && { sizes }),
  };
}

/**
 * Get CDN URL for optimized images
 * Supports common image optimization services
 */
export function getCDNImageUrl(
  path: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: ImageFormat;
  } = {}
): string {
  const { width, height, quality = 80, format = 'auto' } = options;

  // Basic optimization for local images
  const params = new URLSearchParams();
  
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  if (quality) params.set('q', quality.toString());
  if (format && format !== 'auto') params.set('f', format);

  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
}

/**
 * Preload critical images for above-the-fold content
 */
export function preloadImage(src: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}

/**
 * Check if browser supports WebP format
 */
export function supportsWebP(): boolean {
  if (typeof document === 'undefined') return false;

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  try {
    return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
  } catch {
    return false;
  }
}

/**
 * Generate picture element with WebP support
 */
export function generatePictureHTML(
  imagePath: string,
  alt: string,
  width?: number,
  height?: number
): string {
  const webpPath = imagePath.replace(/\.[^/.]+$/, '.webp');
  const aspectRatio = width && height ? (height / width) * 100 : 'auto';

  return `
    <picture>
      <source srcset="${webpPath}" type="image/webp" />
      <img 
        src="${imagePath}" 
        alt="${alt}" 
        loading="lazy"
        decoding="async"
        ${width ? `width="${width}"` : ''}
        ${height ? `height="${height}"` : ''}
        ${aspectRatio !== 'auto' ? `style="aspect-ratio: ${width}/${height}"` : ''}
      />
    </picture>
  `;
}

/**
 * Lazy load images with IntersectionObserver
 */
export function lazyLoadImages(): void {
  if (typeof IntersectionObserver === 'undefined') return;

  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

/**
 * Add blur-up effect for images
 * Useful for progressive image loading
 */
export interface BlurDataProps {
  blurDataURL: string;
  width: number;
  height: number;
}

export function getBlurDataProps(): BlurDataProps | null {
  // Return null for now - can be generated during build time
  return null;
}

// Export common image sizes for responsive design
export const COMMON_IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 },
  thumbnail_2x: { width: 300, height: 300 },
  small_2x: { width: 600, height: 600 },
  medium_2x: { width: 1200, height: 800 },
  large_2x: { width: 2400, height: 1600 },
};

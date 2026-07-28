import React from "react";
import { getOptimizedImageAttrs, OptimizedImageProps } from "@/lib/image-optimization";

export default function OptimizedImage(props: OptimizedImageProps & { fetchpriority?: "high" | "low" | "auto", loading?: "lazy" | "eager" }) {
  const { className, style, fetchpriority, loading, ...rest } = props;
  const attrs = getOptimizedImageAttrs(rest);
  
  // For production, we would use a real WebP source if available
  // Here we assume the build process or CDN handles format conversion via query params
  const webpSrc = `${props.src}${props.src.includes('?') ? '&' : '?'}f=webp`;

  return (
    <picture className={className}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        {...attrs}
        className={className}
        style={{ ...attrs.style, ...style }}
        fetchpriority={fetchpriority}
        loading={loading || attrs.loading}
      />
    </picture>
  );
}

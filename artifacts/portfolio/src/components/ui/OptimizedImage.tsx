import React from "react";
import { getOptimizedImageAttrs, OptimizedImageProps } from "@/lib/image-optimization";

export interface EnhancedOptimizedImageProps extends OptimizedImageProps {
  fetchPriority?: "high" | "low" | "auto";
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  mobileSrc?: string;
}

export default function OptimizedImage(props: EnhancedOptimizedImageProps) {
  const {
    className,
    style,
    fetchPriority = "auto",
    loading = "lazy",
    decoding = "async",
    mobileSrc,
    ...rest
  } = props;
  
  const attrs = getOptimizedImageAttrs(rest as OptimizedImageProps);
  const src = props.src;

  // Generate responsive AVIF and WebP sources for Unsplash or generic image URLs
  let mobileAvif = "";
  let mobileWebp = "";
  let desktopAvif = "";
  let desktopWebp = "";

  if (src.includes("unsplash.com")) {
    const baseUrl = src.split("?")[0];
    mobileAvif = `${baseUrl}?auto=format&fit=crop&w=480&q=75&fm=avif`;
    mobileWebp = `${baseUrl}?auto=format&fit=crop&w=480&q=75&fm=webp`;
    desktopAvif = `${baseUrl}?auto=format&fit=crop&w=828&q=75&fm=avif`;
    desktopWebp = `${baseUrl}?auto=format&fit=crop&w=828&q=75&fm=webp`;
  } else {
    mobileWebp = mobileSrc || src;
    desktopWebp = src;
  }

  return (
    <picture className={className}>
      {mobileAvif && (
        <source
          media="(max-width: 640px)"
          srcSet={mobileAvif}
          type="image/avif"
        />
      )}
      {mobileWebp && (
        <source
          media="(max-width: 640px)"
          srcSet={mobileWebp}
          type="image/webp"
        />
      )}
      {desktopAvif && (
        <source
          srcSet={desktopAvif}
          type="image/avif"
        />
      )}
      {desktopWebp && (
        <source
          srcSet={desktopWebp}
          type="image/webp"
        />
      )}
      <img
        {...attrs}
        className={className}
        style={{
          ...attrs.style,
          ...(style as any),
        }}
        fetchPriority={fetchPriority}
        loading={loading}
        decoding={decoding}
      />
    </picture>
  );
}

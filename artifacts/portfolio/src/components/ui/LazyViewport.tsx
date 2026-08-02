import React, { useEffect, useRef, useState } from "react";

interface LazyViewportProps {
  children: React.ReactNode;
  fallbackHeight?: string | number;
  rootMargin?: string;
  className?: string;
}

export default function LazyViewport({
  children,
  fallbackHeight = "200px",
  rootMargin = "300px 0px",
  className = "",
}: LazyViewportProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, render immediately
    if (typeof IntersectionObserver === "undefined") {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  const minHeightStyle = typeof fallbackHeight === "number" ? `${fallbackHeight}px` : fallbackHeight;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minHeight: isIntersecting ? undefined : minHeightStyle }}
    >
      {isIntersecting ? children : null}
    </div>
  );
}

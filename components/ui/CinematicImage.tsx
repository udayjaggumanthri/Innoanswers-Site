import React, { useEffect, useRef, useState } from "react";

interface CinematicImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  priority?: boolean;
  overlay?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export function CinematicImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  aspectRatio = "aspect-[16/10]",
  priority = false,
  overlay,
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
}: CinematicImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setReducedMotion(true);
      setIsInView(true);
      return;
    }

    if (priority || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once revealed, unobserve to free resources
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [priority, threshold, rootMargin]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--surface-hover)] border border-[var(--border-subtle)] ${containerClassName}`}
    >
      {/* Cinematic Image with Smooth Scale & Blur Wipe */}
      <div className={`relative w-full overflow-hidden ${aspectRatio}`}>
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            reducedMotion
              ? "opacity-100 scale-100"
              : isInView && isLoaded
              ? "opacity-100 scale-100 filter-none"
              : "opacity-0 scale-108 blur-[6px]"
          } ${className}`}
          loading={priority ? "eager" : "lazy"}
        />

        {/* Cinematic Shutter Curtain Wipe */}
        {!reducedMotion && (
          <div
            className={`pointer-events-none absolute inset-0 bg-[var(--surface-hover)] transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isInView ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
            }`}
            aria-hidden="true"
          />
        )}

        {/* Subtle Vignette Gradient for Depth */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent opacity-80"
          aria-hidden="true"
        />

        {/* Optional Slotted Overlay (Metrics / Badges) with Staggered Fade-in */}
        {overlay && (
          <div
            className={`absolute inset-0 transition-all duration-700 delay-200 ease-out ${
              reducedMotion || isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            {overlay}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  as?: React.ElementType;
  variant?: "slide-up" | "fade" | "scale" | "slide-left" | "slide-right";
}

export function Reveal({
  children,
  delayMs = 0,
  className = "",
  as: Component = "div",
  variant = "slide-up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setHasReducedMotion(true);
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (ref.current) observer.unobserve(ref.current);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  if (hasReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "fade":
        return isVisible ? "opacity-100" : "opacity-0 pointer-events-none";
      case "scale":
        return isVisible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-[0.96] translate-y-4 pointer-events-none";
      case "slide-left":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-6 pointer-events-none";
      case "slide-right":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-6 pointer-events-none";
      case "slide-up":
      default:
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none";
    }
  };

  return (
    <Component
      ref={ref}
      className={`transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${getVariantStyles()} ${className}`}
      style={{
        transitionDelay: isVisible ? `${delayMs}ms` : "0ms",
      }}
    >
      {children}
    </Component>
  );
}

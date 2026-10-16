import React, { useRef, useState, useCallback, useEffect } from "react";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  perspective?: number;
  disabled?: boolean;
}

export function ThreeDCard({
  children,
  className = "",
  maxTilt = 8,
  scale = 1.015,
  glare = true,
  perspective = 1100,
  disabled = false,
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
  });
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transition: "opacity 350ms ease-out",
  });

  const isHoveredRef = useRef(false);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Check reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    }
  }, []);

  // Smooth lerp loop during hover
  const updateTransform = useCallback(() => {
    if (!isHoveredRef.current) return;

    // Smooth spring interpolation
    currentXRef.current += (targetXRef.current - currentXRef.current) * 0.12;
    currentYRef.current += (targetYRef.current - currentYRef.current) * 0.12;

    const rotX = currentYRef.current * -maxTilt;
    const rotY = currentXRef.current * maxTilt;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: "none", // continuous smooth tracking
    });

    rafIdRef.current = requestAnimationFrame(updateTransform);
  }, [maxTilt, perspective, scale]);

  const handleMouseEnter = useCallback(() => {
    if (disabled || prefersReducedMotion) return;
    isHoveredRef.current = true;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(updateTransform);
  }, [disabled, prefersReducedMotion, updateTransform]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || prefersReducedMotion) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width - 0.5) * 2; // -1 to 1
      const normY = (y / rect.height - 0.5) * 2; // -1 to 1

      targetXRef.current = Math.max(-1, Math.min(1, normX));
      targetYRef.current = Math.max(-1, Math.min(1, normY));

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setGlareStyle({
          opacity: 0.15,
          background: `radial-gradient(circle 280px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45), transparent 75%)`,
          transition: "opacity 150ms ease-out",
        });
      }
    },
    [disabled, prefersReducedMotion, glare]
  );

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    targetXRef.current = 0;
    targetYRef.current = 0;
    currentXRef.current = 0;
    currentYRef.current = 0;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 450ms cubic-bezier(0.16, 1, 0.3, 1)",
    });

    setGlareStyle({
      opacity: 0,
      transition: "opacity 300ms ease-out",
    });
  }, [perspective]);

  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  if (disabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transformStyle: "preserve-3d",
      }}
      className={`relative will-change-transform ${className}`}
    >
      <div style={{ transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>

      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity"
          style={glareStyle}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

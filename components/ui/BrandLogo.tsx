import React from "react";

interface BrandLogoProps {
  className?: string;
  heightPx?: number;
  alt?: string;
}

/**
 * Official Innoanswers Brand Logo component.
 * Automatically switches between Dark Theme and Light Theme logos
 * with zero layout shift and instantaneous CSS-driven responsiveness.
 */
export function BrandLogo({
  className = "brand-logo-header",
  heightPx,
  alt = "iNNOAnswers",
}: BrandLogoProps) {
  const inlineStyle: React.CSSProperties = heightPx
    ? { height: `${heightPx}px`, width: "auto" }
    : {};

  return (
    <span
      className={`brand-logo-container relative inline-flex items-center shrink-0 select-none ${className}`}
      style={inlineStyle}
    >
      {/* Dark Theme Logo (luminous white INNO, vivid blue ANSWERS, gradient 3D emblem) */}
      <img
        src="/logos/innoanswers-dark.png"
        alt={alt}
        className="logo-dark-theme h-full w-auto max-h-full max-w-none object-contain transition-opacity duration-200"
        loading="eager"
        decoding="async"
      />
      {/* Light Theme Logo (deep obsidian navy INNO, royal blue ANSWERS, gradient 3D emblem) */}
      <img
        src="/logos/innoanswers-light.png"
        alt={alt}
        className="logo-light-theme h-full w-auto max-h-full max-w-none object-contain transition-opacity duration-200"
        loading="eager"
        decoding="async"
      />
    </span>
  );
}

export default BrandLogo;

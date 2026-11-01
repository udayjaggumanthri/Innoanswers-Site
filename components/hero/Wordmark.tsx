import React from "react";
import { BrandLogo } from "../ui/BrandLogo";

interface WordmarkProps {
  className?: string;
  heightPx?: number;
  useOfficialLogo?: boolean;
}

/**
 * Wordmark component.
 * Renders the official adaptive Innoanswers logo (with dark & light theme variants)
 * or spark mark if requested.
 */
export function Wordmark({
  className = "",
  heightPx = 28,
  useOfficialLogo = true,
}: WordmarkProps) {
  // Always render the official high-fidelity brand logo
  if (useOfficialLogo) {
    return (
      <BrandLogo
        className={className}
        heightPx={heightPx}
        alt="iNNOAnswers"
      />
    );
  }

  const rowStyle: React.CSSProperties = heightPx
    ? { height: `${heightPx}px` }
    : {};

  return (
    <span
      className={`wordmark-wrap inline-flex items-center gap-[0.32em] text-current font-medium select-none ${className}`}
      style={rowStyle}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto text-[var(--accent)] shrink-0"
        aria-hidden="true"
      >
        <path d="M12 2C12.6 7.5 16.5 11.4 22 12C16.5 12.6 12.6 16.5 12 22C11.4 16.5 7.5 12.6 2 12Z" />
      </svg>
      <span
        className="tracking-[-0.03em] font-semibold leading-none text-current"
        style={{
          fontSize: heightPx ? `${heightPx * 0.94}px` : "0.94em",
        }}
      >
        iNNOAnswers
      </span>
    </span>
  );
}

export default Wordmark;

import React from "react";

interface WordmarkProps {
  className?: string;
  heightPx?: number;
  useOfficialLogo?: boolean;
}

/**
 * Wordmark component per §3.3 specification.
 * Renders an inline SVG spark mark and "Innoanswers" text with theme-adaptive styling.
 */
export function Wordmark({
  className = "",
  heightPx,
  useOfficialLogo = false,
}: WordmarkProps) {
  const rowStyle: React.CSSProperties = heightPx
    ? { height: `${heightPx}px` }
    : {};

  if (useOfficialLogo) {
    // Official Innoanswers logo rendition based on uploaded brand asset
    return (
      <span
        className={`inline-flex items-center gap-[0.35em] text-current font-medium select-none ${className}`}
        style={rowStyle}
      >
        <svg
          viewBox="0 0 100 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto"
          aria-hidden="true"
        >
          {/* Sphere dot for 'i' */}
          <circle cx="28" cy="18" r="14" fill="url(#ia-sphere-grad)" />
          {/* Stylized 'iA' curved strokes */}
          <path
            d="M14 84C14 62 26 44 42 34L20 84H14Z"
            fill="url(#ia-left-grad)"
          />
          <path
            d="M42 34L76 84H62L48 54L35 70L24 84H14C24 64 34 46 42 34Z"
            fill="url(#ia-stem-grad)"
          />
          {/* Right leg of 'A' */}
          <path
            d="M50 42L72 84H88L58 30C55 34 52 38 50 42Z"
            fill="url(#ia-right-grad)"
          />
          {/* Turquoise crossbar banner */}
          <path
            d="M32 68L56 50L64 68H32Z"
            fill="url(#ia-cyan-grad)"
          />
          <defs>
            <linearGradient id="ia-sphere-grad" x1="18" y1="8" x2="38" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5be2ff" />
              <stop offset="0.6" stopColor="#0077ff" />
              <stop offset="1" stopColor="#0043c7" />
            </linearGradient>
            <linearGradient id="ia-left-grad" x1="14" y1="34" x2="30" y2="84" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0080ff" />
              <stop offset="1" stopColor="#004bc9" />
            </linearGradient>
            <linearGradient id="ia-stem-grad" x1="20" y1="34" x2="60" y2="84" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00b4d8" />
              <stop offset="1" stopColor="#0052cc" />
            </linearGradient>
            <linearGradient id="ia-right-grad" x1="50" y1="30" x2="88" y2="84" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0055d4" />
              <stop offset="1" stopColor="#003594" />
            </linearGradient>
            <linearGradient id="ia-cyan-grad" x1="32" y1="50" x2="64" y2="68" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00e5ff" />
              <stop offset="1" stopColor="#00a2ff" />
            </linearGradient>
          </defs>
        </svg>
        <span
          className="tracking-[-0.03em] font-semibold text-current"
          style={{ fontSize: heightPx ? `${heightPx * 0.9}px` : "0.9em" }}
        >
          INNOANSWERS
        </span>
      </span>
    );
  }

  // Exact specification spark mark (§3.3)
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
        Innoanswers
      </span>
    </span>
  );
}

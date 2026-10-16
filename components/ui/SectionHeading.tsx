import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  as: HeadingTag = "h2",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`space-y-4 ${
        isCenter ? "text-center mx-auto max-w-[760px]" : "max-w-[780px]"
      } ${className}`}
    >
      {eyebrow && (
        <div>
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <HeadingTag
        className={`section-h2 text-[var(--ink)] ${
          isCenter ? "mx-auto" : ""
        }`}
      >
        {title}
      </HeadingTag>
      {description && (
        <p className="lead-text text-[var(--body-text)]">
          {description}
        </p>
      )}
    </div>
  );
}

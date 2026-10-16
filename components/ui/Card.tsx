import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  hoverEffect?: boolean;
}

export function Card({
  children,
  className = "",
  as: Component = "div",
  hoverEffect = true,
  ...props
}: CardProps) {
  return (
    <Component
      className={`rounded-[16px] border border-[var(--border-subtle)] bg-[var(--surface)] p-7 sm:p-8 ${
        hoverEffect
          ? "transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--surface-hover)] hover:border-[var(--hairline)] shadow-sm hover:shadow-md"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

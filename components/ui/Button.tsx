import React from "react";
import { ArrowRight } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "link";

interface BaseButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
}

type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({
  variant = "primary",
  children,
  className = "",
  arrow = false,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none text-center";

  let variantClasses = "";

  if (variant === "primary") {
    variantClasses =
      "h-[48px] px-6 rounded-[6px] bg-[var(--btn-bg)] text-[var(--btn-ink)] text-[16px] tracking-[-0.02em] font-medium hover:bg-[var(--btn-hover)] hover:ring-4 hover:ring-[var(--accent-ring)] active:translate-y-[0.5px] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px] shadow-sm";
  } else if (variant === "secondary") {
    variantClasses =
      "h-[48px] px-6 rounded-[6px] bg-transparent text-[var(--ink)] border border-[var(--hairline)] text-[16px] tracking-[-0.02em] font-medium hover:bg-[var(--surface-hover)] hover:ring-4 hover:ring-[var(--accent-ring)] active:translate-y-[0.5px] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px]";
  } else if (variant === "link") {
    variantClasses =
      "text-[var(--link)] hover:text-[var(--ink)] group inline-flex items-center gap-1.5 text-[15px] tracking-[-0.01em] p-0 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-4";
  }

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          className="w-4 h-4 ml-1.5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px]"
          aria-hidden="true"
        />
      )}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <a
        className={`${baseClasses} ${variantClasses} ${className}`}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}

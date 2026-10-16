import React, { useEffect, useRef, useState } from "react";
import {
  X,
  ArrowRight,
  ChevronRight,
  Home,
  Info,
  Layers,
  BookOpen,
  Mail,
  Cpu,
  Briefcase,
  Compass,
} from "lucide-react";
import { Wordmark } from "../hero/Wordmark";
import { ThemeToggle } from "../ui/ThemeToggle";
import { siteConfig } from "../../content/site";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export function MobileMenu({ isOpen, onClose, currentPath }: MobileMenuProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle smooth enter and exit animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle body scroll lock & keyboard accessibility
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto-focus the close button for accessibility
    setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = drawerRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle window resize: automatically close menu when resized to desktop (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onClose();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const mainNav = [
    {
      label: "Home",
      href: "/",
      description: "Overview & Case Studies",
      icon: Home,
    },
    {
      label: "About",
      href: "/about",
      description: "Engineering & Foundations",
      icon: Info,
    },
    {
      label: "Services",
      href: "/services",
      description: "Technology, Business, Consulting",
      icon: Layers,
    },
    {
      label: "Blogs",
      href: "/blogs",
      description: "Articles & Practical Insights",
      icon: BookOpen,
    },
    {
      label: "Contact",
      href: "/contact",
      description: "Confidential Scoping Call",
      icon: Mail,
    },
  ];

  const serviceDivisions = [
    { label: "Technology Services", href: "/services/technology", icon: Cpu },
    { label: "Business Services", href: "/services/business", icon: Briefcase },
    { label: "AI Consulting", href: "/services/consulting", icon: Compass },
  ];

  return (
    <div
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-50 overflow-hidden lg:hidden"
    >
      {/* Semi-transparent dark backdrop blur */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ease-out cursor-pointer ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Slide-out Drawer Panel (from Right) */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 bottom-0 z-50 flex flex-col w-[88vw] max-w-[380px] bg-[var(--surface)] text-[var(--ink)] shadow-2xl border-l border-[var(--border-subtle)] transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-18 items-center justify-between px-6 border-b border-[var(--border-subtle)] bg-[var(--surface)] shrink-0">
          <a
            href="/"
            onClick={onClose}
            aria-label="Innoanswers home"
            className="flex items-center gap-2.5 text-[var(--ink)]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-sm">
              <span>IA</span>
            </div>
            <Wordmark heightPx={20} />
          </a>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              ref={firstFocusableRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation drawer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--ink)] hover:bg-[var(--surface-hover)] focus-visible:outline-2 focus-visible:outline-blue-600 cursor-pointer transition-colors"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Main Navigation Items */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-text)] block mb-3 font-mono">
              MAIN NAVIGATION
            </span>

            <nav className="space-y-1.5" aria-label="Mobile Navigation Pages">
              {mainNav.map((item) => {
                const isActive =
                  currentPath === item.href ||
                  (item.href === "/" && (currentPath === "/" || currentPath === ""));
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all group ${
                      isActive
                        ? "bg-blue-600/10 text-blue-600 dark:text-sky-400 font-semibold border border-blue-600/20"
                        : "text-[var(--ink)] hover:bg-[var(--surface-hover)] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white dark:bg-sky-500 dark:text-[#030718]"
                            : "bg-[var(--surface-hover)] text-[var(--muted-text)] group-hover:text-[var(--ink)]"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="truncate">
                        <span className="block text-sm font-semibold tracking-tight leading-tight">
                          {item.label}
                        </span>
                        <span className="block text-[11px] text-[var(--muted-text)] font-normal truncate">
                          {item.description}
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                        isActive
                          ? "text-blue-600 dark:text-sky-400"
                          : "text-[var(--muted-text)] group-hover:text-[var(--ink)]"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Service Practice Areas Strip */}
          <div className="pt-2 border-t border-[var(--border-subtle)]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-text)] block mb-2 font-mono">
              CORE SERVICES
            </span>

            <div className="space-y-1">
              {serviceDivisions.map((division) => {
                const DivIcon = division.icon;
                return (
                  <a
                    key={division.label}
                    href={division.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-[var(--muted-text)] hover:text-[var(--ink)] hover:bg-[var(--surface-hover)] transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <DivIcon className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400" />
                      <span>{division.label}</span>
                    </span>
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600 dark:text-sky-400" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <a
              href="/contact"
              onClick={onClose}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
            >
              <span>Talk to our team</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* Drawer Footer with Direct Contact Details */}
        <div className="border-t border-[var(--border-subtle)] p-6 bg-[var(--surface-hover)] shrink-0 space-y-2 text-xs text-[var(--muted-text)]">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[var(--ink)]">Innoanswers Inc.</span>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Pods Online</span>
            </div>
          </div>
          <p className="text-[11px]">{siteConfig.contact.email}</p>
          <p className="text-[11px]">{siteConfig.contact.phone}</p>
          <p className="text-[10px] text-[var(--muted-text)] pt-1 opacity-70">
            {siteConfig.contact.address} · {siteConfig.contact.hours}
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Wordmark } from "../hero/Wordmark";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "../ui/ThemeToggle";

interface HeaderProps {
  currentPath?: string;
  isHomePage?: boolean;
}

export function Header({ currentPath = "/" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Floating Island Pill Navigation Bar - Perfected for both Light & Dark themes */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[1140px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? "bg-white/95 dark:bg-[#060b24]/95 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.12),0_4px_12px_rgba(15,23,42,0.06)] dark:shadow-black/50 border border-slate-300/90 dark:border-white/15 backdrop-blur-2xl"
            : "bg-white/90 dark:bg-[#060b24]/85 shadow-[0_8px_30px_rgb(0,0,0,0.06),0_1px_3px_rgb(0,0,0,0.04)] dark:shadow-black/30 border border-slate-200/90 dark:border-white/10 backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Brand Logo & Wordmark */}
          <a
            href="/"
            aria-label="Innoanswers home"
            className="flex items-center gap-2.5 text-slate-900 dark:text-white group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-[var(--accent)] dark:to-blue-600 text-white dark:text-[#030718] font-bold text-sm shadow-sm shadow-blue-500/20 dark:shadow-[var(--accent)]/20 transition-transform group-hover:scale-105">
              <span>IA</span>
            </div>
            <Wordmark heightPx={21} />
          </a>

          {/* Desktop Navigation Links with pristine light & dark mode styles */}
          <nav
            className="hidden items-center gap-1 xl:gap-2 lg:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const isActive =
                currentPath === item.href ||
                (item.href === "/" && (currentPath === "/" || currentPath === ""));

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium tracking-tight transition-all duration-150 ${
                    isActive
                      ? "text-slate-950 bg-slate-100 font-semibold shadow-xs dark:text-white dark:bg-white/15"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions & CTA */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <ThemeToggle />

            <a
              href="/contact"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 shadow-sm shadow-slate-900/15 dark:bg-[var(--accent)] dark:text-[#030718] dark:hover:brightness-110 dark:shadow-[var(--accent)]/20 px-4 text-[13px] font-semibold tracking-tight transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-slate-900 dark:focus-visible:outline-[var(--accent)]"
            >
              <span>Talk to our team</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </a>
          </div>

          {/* Mobile & Tablet Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100/80 text-slate-800 hover:bg-slate-200 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-slate-900 dark:focus-visible:outline-[var(--accent)] cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPath={currentPath}
      />
    </>
  );
}

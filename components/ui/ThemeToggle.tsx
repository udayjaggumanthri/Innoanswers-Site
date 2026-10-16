import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  // Synchronously initialize theme from document or localStorage so there is zero flash or missing state
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      if (
        document.documentElement.classList.contains("light") ||
        document.documentElement.dataset.theme === "light"
      ) {
        return "light";
      }
    }
    return "dark";
  });

  useEffect(() => {
    const syncTheme = () => {
      const isLight =
        document.documentElement.classList.contains("light") ||
        document.documentElement.dataset.theme === "light";
      setTheme(isLight ? "light" : "dark");
    };

    syncTheme();

    // Observe documentElement class and attribute changes to keep all toggle instances in sync
    const observer = new MutationObserver(() => {
      syncTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    window.addEventListener("storage", syncTheme);
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);

    if (next === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.dataset.theme = "light";
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement.dataset.theme = "dark";
    }
  };

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark mode (current: light theme)" : "Switch to light mode (current: dark theme)"}
      title={isLight ? "Switch to dark theme (current: light)" : "Switch to light theme (current: dark)"}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-white/10 text-slate-800 dark:text-slate-100 shadow-sm shadow-slate-900/5 hover:bg-slate-100 dark:hover:bg-white/20 hover:border-slate-400 dark:hover:border-white/30 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-slate-900 dark:focus-visible:outline-[#7fd4ff] cursor-pointer shrink-0 ${className}`}
    >
      {isLight ? (
        <Moon className="h-4 w-4 text-slate-800 fill-slate-800/10 stroke-[2.2] transition-transform duration-200 hover:-rotate-12" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4 text-amber-400 fill-amber-400/20 stroke-[2.2] transition-transform duration-200 hover:rotate-45" aria-hidden="true" />
      )}
    </button>
  );
}

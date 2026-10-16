import React, { useEffect, useState } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Global3DBackground } from "../components/3d/Global3DBackground";
import HomePage from "../app/page";
import AboutPage from "../app/about/page";
import ServicesPage from "../app/services/page";
import TechnologyServicesPage from "../app/services/technology/page";
import BusinessServicesPage from "../app/services/business/page";
import ConsultingServicesPage from "../app/services/consulting/page";
import BlogsPage from "../app/blogs/page";
import BlogPostPage from "../app/blogs/[slug]/page";
import ContactPage from "../app/contact/page";
import PrivacyPolicyPage from "../app/privacy/page";
import TermsPage from "../app/terms/page";
import SecurityPage from "../app/security/page";
import NotFound from "../app/not-found";
import { blogPosts } from "../content/blog";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window === "undefined") return "/";
    return window.location.pathname || "/";
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname || "/";
      setCurrentPath(path);

      // Handle hash scrolling if present
      if (window.location.hash) {
        const id = window.location.hash.replace("#", "");
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("popstate", handleLocationChange);

    // Global click listener to intercept internal link clicks for seamless SPA navigation
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, or modifier keys
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey
      ) {
        return;
      }

      // Handle pure hash links on current page
      if (href.startsWith("#")) {
        e.preventDefault();
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
        return;
      }

      // Handle route navigation
      if (href.startsWith("/")) {
        e.preventDefault();
        const [path, hash] = href.split("#");
        window.history.pushState(null, "", href);
        setCurrentPath(path || "/");

        if (hash) {
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        } else {
          window.scrollTo(0, 0);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);

    // Initial hash scroll if loaded with hash
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  // Routing resolution for all application routes
  const renderPage = () => {
    const cleanPath = currentPath.replace(/\/+$/, "") || "/";

    if (cleanPath === "/") {
      return <HomePage />;
    }
    if (cleanPath === "/about") {
      return <AboutPage />;
    }
    if (cleanPath === "/services") {
      return <ServicesPage />;
    }
    if (cleanPath === "/services/technology") {
      return <TechnologyServicesPage />;
    }
    if (cleanPath === "/services/business") {
      return <BusinessServicesPage />;
    }
    if (cleanPath === "/services/consulting") {
      return <ConsultingServicesPage />;
    }
    if (cleanPath === "/blogs") {
      return <BlogsPage />;
    }
    if (cleanPath.startsWith("/blogs/")) {
      const slug = cleanPath.replace("/blogs/", "");
      const post = blogPosts.find((p) => p.slug === slug);
      if (post) {
        return <BlogPostPage params={{ slug }} />;
      }
      return <NotFound />;
    }
    if (cleanPath === "/contact") {
      return <ContactPage />;
    }
    if (cleanPath === "/privacy") {
      return <PrivacyPolicyPage />;
    }
    if (cleanPath === "/terms") {
      return <TermsPage />;
    }
    if (cleanPath === "/security") {
      return <SecurityPage />;
    }

    return <NotFound />;
  };

  const isHome = (currentPath.replace(/\/+$/, "") || "/") === "/";

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col transition-colors duration-200">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg focus:outline-2 focus:outline-[#7fd4ff]"
      >
        Skip to content
      </a>

      {/* Global Interactive 3D WebGL Neural Background */}
      <Global3DBackground />

      {/* Header with sticky and path state */}
      <Header currentPath={currentPath} isHomePage={isHome} />

      <main id="main" className="flex-1">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

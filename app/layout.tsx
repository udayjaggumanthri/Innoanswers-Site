import React from "react";
import "./globals.css";
import "./hero.css";
import { siteConfig } from "../content/site";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Innoanswers — Solving tough problems with AI-driven solutions",
    template: "%s | Innoanswers",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Innoanswers — Solving tough problems with AI-driven solutions",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Innoanswers — Solving tough problems with AI-driven solutions",
    description: siteConfig.description,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#01061a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Pre-hydration hero intro and theme initialization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.dataset.theme = 'light';
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.dataset.theme = 'dark';
                  }

                  var isHome = window.location.pathname === '/' || window.location.pathname === '' || window.location.hash.startsWith('#');
                  var hasWaapi = typeof Element !== 'undefined' && 'animate' in Element.prototype;
                  var hasMatchMedia = typeof window.matchMedia === 'function';
                  var prefersReducedMotion = hasMatchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  
                  if (isHome && hasWaapi && hasMatchMedia && !prefersReducedMotion) {
                    document.documentElement.classList.add('intro');
                    setTimeout(function() {
                      if (document.documentElement.dataset.intro !== 'running' && document.documentElement.dataset.intro !== 'done') {
                        document.documentElement.classList.remove('intro');
                      }
                    }, 3500);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[var(--bg)] text-[var(--ink)] selection:bg-[#7fd4ff]/30 selection:text-white transition-colors duration-200">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg focus:outline-2 focus:outline-[#7fd4ff]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

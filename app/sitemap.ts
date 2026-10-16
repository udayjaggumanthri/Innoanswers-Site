import { siteConfig } from "../content/site";
import { blogPosts } from "../content/blog";

export default function sitemap() {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/services/technology",
    "/services/business",
    "/services/consulting",
    "/blogs",
    "/contact",
    "/privacy",
    "/terms",
    "/security",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}

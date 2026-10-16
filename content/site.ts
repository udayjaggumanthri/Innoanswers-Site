export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  hero: {
    videoUrl: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
  nav: Array<{
    label: string;
    href: string;
  }>;
  footer: {
    company: Array<{ label: string; href: string }>;
    services: Array<{ label: string; href: string }>;
  };
}

export const siteConfig: SiteConfig = {
  name: "Innoanswers",
  tagline: "Solving tough problems with AI-driven solutions.",
  description: "AI expertise meets industry knowledge. Practical, outcome-focused AI solutions with no jargon — just results.",
  url: "https://innoanswers.com",
  hero: {
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261005_182549_18378239-da8f-48a7-9666-d6e0a6a88561.mp4",
  },
  contact: {
    email: "hello@innoanswers.com",
    phone: "+1 (555) 019-2834",
    address: "San Francisco, CA",
    hours: "Monday – Friday, 9am – 6pm PT",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    company: [
      { label: "About", href: "/about" },
      { label: "Blogs", href: "/blogs" },
      { label: "Contact", href: "/contact" },
    ],
    services: [
      { label: "Technology Services", href: "/services#technology" },
      { label: "Business Services", href: "/services#business" },
      { label: "Consulting", href: "/services#consulting" },
    ],
  },
};

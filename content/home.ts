export interface HomeContent {
  hero: {
    line1: string;
    line2: string;
    subhead: string;
    ctaText: string;
    ctaHref: string;
    discoverText: string;
    discoverHref: string;
  };
  closingCta: {
    headline: string;
    body: string;
    buttonText: string;
    buttonHref: string;
  };
}

export const homeContent: HomeContent = {
  hero: {
    line1: "Solving tough problems",
    line2: "with AI-driven solutions.",
    // Non-breaking spaces within clauses, normal space after period per §3.4
    subhead: "AI\u00A0expertise\u00A0meets\u00A0industry\u00A0knowledge. No\u00A0jargon\u00A0—\u00A0just\u00A0results.",
    ctaText: "Talk to our team",
    ctaHref: "/contact",
    discoverText: "Explore our services",
    discoverHref: "#services",
  },
  closingCta: {
    headline: "Have a tough problem? Let's solve it.",
    body: "Tell us what you're trying to fix. We'll tell you honestly whether AI is the right tool.",
    buttonText: "Talk to our team",
    buttonHref: "/contact",
  },
};

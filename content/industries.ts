export interface Industry {
  id: string;
  name: string;
  description: string;
  iconName:
    | "activity"
    | "landmark"
    | "shopping-bag"
    | "factory"
    | "truck"
    | "graduation-cap"
    | "zap"
    | "radio";
}

export interface IndustriesContent {
  eyebrow: string;
  headline: string;
  body: string;
  industries: Industry[];
}

export const industriesContent: IndustriesContent = {
  eyebrow: "Industries we serve",
  headline: "AI that understands your industry.",
  body: "Good AI starts with understanding how your sector actually works. We pair technical depth with domain context so solutions fit from day one.",
  // PLACEHOLDER: editable industry sectors
  industries: [
    {
      id: "healthcare",
      name: "Healthcare & Life Sciences",
      description: "Smarter workflows and decision support across care and operations.",
      iconName: "activity",
    },
    {
      id: "banking",
      name: "Banking & Financial Services",
      description: "Faster, more consistent analysis, onboarding, and risk checks.",
      iconName: "landmark",
    },
    {
      id: "retail",
      name: "Retail & E-commerce",
      description: "Better demand insight, personalization, and customer support.",
      iconName: "shopping-bag",
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      description: "Quality inspection, predictive maintenance, and process optimization.",
      iconName: "factory",
    },
    {
      id: "logistics",
      name: "Logistics & Supply Chain",
      description: "Forecasting, routing, and visibility across moving parts.",
      iconName: "truck",
    },
    {
      id: "education",
      name: "Education & EdTech",
      description: "Personalized learning tools and efficient administration.",
      iconName: "graduation-cap",
    },
    {
      id: "energy",
      name: "Energy & Utilities",
      description: "Demand forecasting, asset monitoring, and operational efficiency.",
      iconName: "zap",
    },
    {
      id: "telecom",
      name: "Telecom & Media",
      description: "Churn insight, support automation, and content intelligence.",
      iconName: "radio",
    },
  ],
};

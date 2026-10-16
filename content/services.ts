export interface Offering {
  title: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  shortDescription: string;
  intro: string;
  iconName: "cpu" | "briefcase" | "compass";
  imageSrc?: string;
  offerings: Offering[];
  learnMoreHref: string;
}

export interface FaqItem {
  question: string;
  answer: string; // PLACEHOLDER: validate with stakeholders
}

export interface ServicesContent {
  eyebrow: string;
  homeH2Line1: string;
  homeH2Line2: string;
  pageH1: string;
  body: string;
  outcomes: string[];
  categories: ServiceCategory[];
  faqs: FaqItem[];
}

export const servicesContent: ServicesContent = {
  eyebrow: "Our services",
  homeH2Line1: "AI that delivers",
  homeH2Line2: "what your business needs.",
  pageH1: "AI that delivers what your business needs.",
  body: "We deliver AI solutions that improve product quality, speed up decision-making, and keep you agile in a fast-moving business world. It's not about doing more — it's about doing what matters, faster and better.",
  outcomes: [
    "Better product quality",
    "Faster decisions",
    "More agility",
  ],
  categories: [
    {
      id: "technology",
      title: "Technology Services",
      shortDescription: "Custom AI and software built to work inside your products and systems.",
      intro: "Engineering-grade AI applications and dependable infrastructure engineered to function cleanly inside your production stack.",
      iconName: "cpu",
      imageSrc: "/images/services/technology.jpg",
      learnMoreHref: "/services/technology",
      offerings: [
        {
          title: "AI & machine-learning solutions",
          description: "Models built around your data and goals, from prediction and classification to anomaly detection.",
        },
        {
          title: "Generative AI & LLM applications",
          description: "Assistants, search, and content tools that work with your own knowledge and workflows.",
        },
        {
          title: "Data engineering & analytics",
          description: "Reliable pipelines and platforms that turn scattered data into something you can act on.",
        },
        {
          title: "Integration & cloud deployment",
          description: "AI that plugs into your existing systems and runs reliably in production.",
        },
      ],
    },
    {
      id: "business",
      title: "Business Services",
      shortDescription: "Practical AI applied to the operations that keep your business running.",
      intro: "Pragmatic automation and intelligent workflows designed to resolve operational friction and elevate service delivery.",
      iconName: "briefcase",
      imageSrc: "/images/services/business.jpg",
      learnMoreHref: "/services/business",
      offerings: [
        {
          title: "Process automation",
          description: "Take repetitive, rules-heavy work off your team's plate and keep people on the decisions.",
        },
        {
          title: "Intelligent document processing",
          description: "Extract, classify, and route information from invoices, forms, and contracts.",
        },
        {
          title: "Customer support & experience",
          description: "Faster, more consistent responses through smart triage and assisted support.",
        },
        {
          title: "Decision-support dashboards",
          description: "Clear, timely insight for the people who run the business.",
        },
      ],
    },
    {
      id: "consulting",
      title: "AI Consulting",
      shortDescription: "Clear-eyed guidance to find the AI opportunities worth pursuing.",
      intro: "Independent technical advisory and strategic assessments to prioritize high-value initiatives and mitigate investment risk.",
      iconName: "compass",
      imageSrc: "/images/services/consulting.jpg",
      learnMoreHref: "/services/consulting",
      offerings: [
        {
          title: "AI strategy & roadmaps",
          description: "A prioritized plan that connects AI to your business goals.",
        },
        {
          title: "Use-case discovery & feasibility",
          description: "Find the problems worth solving and test them before you invest.",
        },
        {
          title: "Data-readiness assessment",
          description: "An honest look at your data, tools, and skills, and what to fix first.",
        },
        {
          title: "Responsible AI & enablement",
          description: "Practical guardrails and training so your team can use AI with confidence.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How do we know if AI is the right solution for our problem?",
      answer: "We start with the problem, not the technology. Early on we evaluate your bottlenecks honestly to determine whether machine learning is genuinely suited or if deterministic software rules achieve better speed and lower maintenance costs.",
    },
    {
      question: "What does working with Innoanswers look like?",
      answer: "We begin with a focused scoping sprint to understand your architecture, data constraints, and success metrics. We build in visible 2-week iterations and perform complete code, model weights, and documentation handover with dedicated production SLA support.",
    },
    {
      question: "Do we need perfect data before we start?",
      answer: "No. The vast majority of enterprise projects begin with imperfect or siloed datasets. A data-readiness audit rapidly identifies what is usable today and defines an automated preparation pipeline to clean data as the models evolve.",
    },
    {
      question: "Can you deploy directly inside our existing cloud VPC?",
      answer: "Yes. All software and model pipelines are packaged as containerized microservices engineered to deploy directly inside your private AWS, Azure, Google Cloud, or air-gapped on-premise infrastructure with zero third-party telemetry.",
    },
  ],
};

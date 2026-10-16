export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level: 2 | 3 }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  category: "AI Strategy" | "Technology" | "Business" | "Consulting" | "Governance";
  excerpt: string;
  date: string;
  readTime: string;
  featured?: boolean;
  gradientTheme: string;
  coverImageSrc?: string;
  body: ContentBlock[];
}

export const blogCategories = [
  "All",
  "AI Strategy",
  "Technology",
  "Business",
  "Consulting",
  "Governance",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "where-ai-actually-pays-off",
    title: "Where AI actually pays off: five questions to ask before you build",
    category: "AI Strategy",
    excerpt: "Before committing engineering headcount and capital, test whether machine learning is genuinely suited to your bottleneck or just a flashy distraction.",
    date: "October 8, 2026",
    readTime: "4 min read",
    featured: true,
    gradientTheme: "from-[#0d2847] via-[#081f38] to-[#030d1a]",
    coverImageSrc: "/images/blog/where-ai-pays-off.jpg",
    body: [
      {
        type: "paragraph",
        text: "Too many organizations embark on artificial intelligence initiatives without first asking whether machine learning is actually the most appropriate tool for the problem at hand. When a business challenge is poorly defined or fundamentally organizational, applying a statistical model simply creates automated ambiguity.",
      },
      {
        type: "heading",
        level: 2,
        text: "1. Is the problem repetitive and predictable, or strategic and fluid?",
      },
      {
        type: "paragraph",
        text: "AI excels at finding subtle patterns within high-volume, structured routines. If your team is spending thousands of hours categorizing incoming requests, verifying standard documents, or cross-referencing ledger anomalies, you have a prime candidate for machine assistance.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. Do you have the operational context to evaluate mistakes?",
      },
      {
        type: "paragraph",
        text: "Every model carries a margin of error. If an error can be safely caught through human-in-the-loop validation or automated safeguards, the deployment is viable. If a single false negative carries existential liability without human oversight, you need simpler, deterministic rules before exploring machine learning.",
      },
      {
        type: "list",
        items: [
          "Validate whether deterministic software can solve 80% of the friction first.",
          "Identify the exact metric of success before writing a single line of training code.",
          "Establish a human review threshold that keeps operational teams in control.",
        ],
      },
      {
        type: "paragraph",
        text: "A successful AI project does not seek to replace human discernment wholesale; it eliminates the cognitive overhead of low-level data manipulation so your specialists can concentrate on nuanced judgments.",
      },
    ],
  },
  {
    slug: "from-pilot-to-production",
    title: "From pilot to production: why promising AI projects stall",
    category: "Technology",
    excerpt: "A prototype running on clean test data is easy to show off. Surviving dirty operational data, compliance audits, and real user workflows is where most tools fail.",
    date: "September 24, 2026",
    readTime: "5 min read",
    featured: false,
    gradientTheme: "from-[#112447] via-[#091b36] to-[#020b17]",
    coverImageSrc: "/images/blog/pilot-to-production.jpg",
    body: [
      {
        type: "paragraph",
        text: "The technology landscape is littered with proof-of-concept AI models that achieved impressive demonstration scores inside isolated sandboxes but never generated a dollar of business value in live production.",
      },
      {
        type: "heading",
        level: 2,
        text: "The sandbox illusion",
      },
      {
        type: "paragraph",
        text: "In a demonstration environment, data is pre-cleaned, schema variations are stripped out, and latency constraints are rarely tested under peak load. Once deployed against real-world inputs, models encounter ambiguous edge cases, malformed payloads, and sudden data drift.",
      },
      {
        type: "heading",
        level: 2,
        text: "Integrating with the core operational engine",
      },
      {
        type: "paragraph",
        text: "True engineering rigor means building dependable fallbacks, continuous health monitoring, and straightforward API contracts that respect your legacy systems. Unless an AI component interfaces smoothly with the software your staff already opens every morning, adoption will stall.",
      },
      {
        type: "list",
        items: [
          "Design for imperfect and drifting inputs from day one.",
          "Embed telemetry that alerts engineers to degradation before users notice.",
          "Prioritize speed and reliability over marginal model complexity.",
        ],
      },
      {
        type: "paragraph",
        text: "Production-readiness is not an afterthought to tack onto a prototype; it is the fundamental architectural constraint that dictates model selection from the first sprint.",
      },
    ],
  },
  {
    slug: "automating-the-boring-parts-of-operations",
    title: "Automating the boring parts of operations",
    category: "Business",
    excerpt: "The highest return on investment rarely comes from speculative customer-facing novelties. It comes from stripping out manual transcription and repetitive triage.",
    date: "September 12, 2026",
    readTime: "4 min read",
    featured: false,
    gradientTheme: "from-[#152e42] via-[#0b1f2e] to-[#030e17]",
    coverImageSrc: "/images/blog/automating-operations.jpg",
    body: [
      {
        type: "paragraph",
        text: "When executives ask where to deploy AI, popular media often directs their attention toward conversational agents or speculative creative tools. In practice, the quietest deployments frequently yield the fastest, most durable payback.",
      },
      {
        type: "heading",
        level: 2,
        text: "The cost of manual friction",
      },
      {
        type: "paragraph",
        text: "Nearly every mid-market enterprise carries hidden operational drag: staff copying figures from PDFs into ERP systems, manually tagging support tickets, or reconciling mismatched inventory spreadsheets across vendor portals.",
      },
      {
        type: "heading",
        level: 2,
        text: "Targeting high-frequency, low-variance bottlenecks",
      },
      {
        type: "paragraph",
        text: "Applying specialized extraction and document intelligence models to these predictable pipelines frees skilled personnel from clerical drudgery while cutting turnaround times from days to seconds.",
      },
      {
        type: "list",
        items: [
          "Invoice and purchase order verification and account code mapping.",
          "Triage and automated dispatch of inbound operational support tickets.",
          "Discrepancy detection between contracts and monthly billing records.",
        ],
      },
      {
        type: "paragraph",
        text: "Focusing on operational hygiene delivers immediate efficiency gains, verifiable cost savings, and an internal workforce that champions your technology investments instead of resisting them.",
      },
    ],
  },
  {
    slug: "what-data-readiness-really-means",
    title: "What \"data readiness\" really means",
    category: "Consulting",
    excerpt: "You do not need petabytes of perfectly labeled data to begin. You need clear ownership, reliable access patterns, and an honest inventory of gaps.",
    date: "August 29, 2026",
    readTime: "3 min read",
    featured: false,
    gradientTheme: "from-[#1c2e4a] via-[#101d30] to-[#040c14]",
    coverImageSrc: "/images/blog/data-readiness.jpg",
    body: [
      {
        type: "paragraph",
        text: "Many organizations delay their AI roadmap under the misconception that they must first build a multi-million-dollar data warehouse. In reality, data readiness is about fitness for purpose: having clean, accessible data specifically tied to the single workflow you intend to improve.",
      },
    ],
  },
  {
    slug: "build-buy-or-blend",
    title: "Build, buy, or blend: choosing your AI approach",
    category: "AI Strategy",
    excerpt: "Commercial APIs, open-source weights, or bespoke fine-tuning? How to balance speed, data privacy, and intellectual property without overspending.",
    date: "August 15, 2026",
    readTime: "4 min read",
    featured: false,
    gradientTheme: "from-[#0e273b] via-[#071622] to-[#020b12]",
    coverImageSrc: "/images/blog/build-buy-blend.jpg",
    body: [
      {
        type: "paragraph",
        text: "Choosing between vendor APIs, self-hosted foundation models, and custom training comes down to two variables: where your proprietary advantage lives, and what compliance constraints govern your data.",
      },
    ],
  },
  {
    slug: "responsible-ai-without-the-paperwork",
    title: "Responsible AI without the paperwork",
    category: "Governance",
    excerpt: "Effective governance is not a 50-page policy document that gathers dust. It is practical tests for bias, fallback controls, and audit trails your team actually runs.",
    date: "July 30, 2026",
    readTime: "3 min read",
    featured: false,
    gradientTheme: "from-[#132d4a] via-[#0c1f33] to-[#030e17]",
    coverImageSrc: "/images/blog/responsible-ai.jpg",
    body: [
      {
        type: "paragraph",
        text: "Governance fails when it becomes an obstacle to delivery. Practical responsible AI relies on transparent model outputs, auditable decision logs, and simple human escalation paths built straight into the software interface.",
      },
    ],
  },
];

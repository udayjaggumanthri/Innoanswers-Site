export interface ServiceDetailOffering {
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  techStack: string[];
}

export interface ServiceDetailMethodology {
  step: string;
  title: string;
  description: string;
}

export interface ServiceDetailCaseStudy {
  clientIndustry: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
}

export interface ServiceDetailFaq {
  question: string;
  answer: string;
}

export interface ServiceDetailPageData {
  id: "technology" | "business" | "consulting";
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  heroImage: string;
  badges: string[];
  metrics: Array<{ label: string; value: string }>;
  offerings: ServiceDetailOffering[];
  methodology: ServiceDetailMethodology[];
  caseStudies: ServiceDetailCaseStudy[];
  faqs: ServiceDetailFaq[];
}

export const serviceDetailsData: Record<string, ServiceDetailPageData> = {
  technology: {
    id: "technology",
    slug: "technology",
    title: "Technology Services",
    eyebrow: "PRACTICE AREA 01 · PRODUCTION AI & ENGINEERING",
    tagline: "Custom Machine Learning & Production Systems Engineered for Scalability",
    description:
      "We design, build, and deploy production-grade machine learning models, custom RAG systems, and resilient data infrastructure. Engineered to run directly inside your cloud VPC with sub-20ms latency and 100% code ownership.",
    heroImage: "/images/services/technology.jpg",
    badges: ["Sub-20ms Inference", "Private VPC 24/7", "99.95% Production SLA"],
    metrics: [
      { value: "99.95%", label: "Production SLA Guarantee" },
      { value: "< 20ms", label: "Average Inference Latency" },
      { value: "100%", label: "Private VPC Data Sovereignty" },
      { value: "0%", label: "Third-Party Training Exposure" },
    ],
    offerings: [
      {
        title: "AI & Machine Learning Engineering",
        subtitle: "Deterministic Predictive Models",
        description:
          "Custom prediction, classification, and anomaly detection models trained on your domain-specific data and deployed directly into your operational stack.",
        deliverables: [
          "Domain-tuned neural architectures",
          "Automated model drift detection",
          "High-throughput inference microservices",
          "Comprehensive validation suites",
        ],
        techStack: ["PyTorch", "TensorFlow", "FastAPI", "ONNX Runtime", "Kubernetes"],
      },
      {
        title: "Generative AI & Enterprise RAG",
        subtitle: "Grounded Knowledge Retrieval",
        description:
          "Private Retrieval-Augmented Generation systems that connect LLMs to your internal knowledge bases, databases, and ERPs with zero hallucination guardrails.",
        deliverables: [
          "Hybrid vector & BM25 search engines",
          "Real-time document ingestion pipelines",
          "Strict RBAC & document permission enforcement",
          "Deterministic factuality verifiers",
        ],
        techStack: ["Pinecone", "pgvector", "LangChain", "LlamaIndex", "Docker"],
      },
      {
        title: "Data Engineering & Pipelines",
        subtitle: "High-Throughput Ingestion",
        description:
          "Fault-tolerant streaming and batch data architectures that aggregate scattered enterprise data into clean, queryable feature stores.",
        deliverables: [
          "Real-time event streaming pipelines",
          "Automated schema validation & cleaning",
          "Centralized enterprise feature stores",
          "Data lineage & compliance auditing",
        ],
        techStack: ["Apache Kafka", "dbt", "Snowflake", "Apache Spark", "Airflow"],
      },
      {
        title: "Cloud VPC Integration & MLOps",
        subtitle: "Hardened Production Deployment",
        description:
          "Containerized deployment scripts and automated CI/CD pipelines for air-gapped or private cloud execution (AWS, Azure, Google Cloud).",
        deliverables: [
          "Infrastructure as Code (Terraform/Helm)",
          "Automated model retraining triggers",
          "24/7 Prometheus/Grafana telemetry",
          "Zero-downtime rolling deployments",
        ],
        techStack: ["AWS Sagemaker", "Azure ML", "GCP Vertex", "Terraform", "Grafana"],
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Architecture & Data Audit",
        description:
          "We analyze your existing cloud stack, schema structures, latency targets, and compliance rules to form a concrete deployment blueprint.",
      },
      {
        step: "02",
        title: "Model & Pipeline Engineering",
        description:
          "Our engineers develop, fine-tune, and benchmark custom models and data pipelines against your production data samples.",
      },
      {
        step: "03",
        title: "Private VPC Deployment",
        description:
          "We package solutions into containerized microservices and deploy them directly inside your isolated cloud network.",
      },
      {
        step: "04",
        title: "SLA Monitoring & Handover",
        description:
          "We establish automated health checks, transfer complete code & weights, and train your team for continuous operational control.",
      },
    ],
    caseStudies: [
      {
        clientIndustry: "Global Financial Clearing",
        title: "Sub-15ms Real-Time Transaction Fraud Detection Engine",
        challenge: "Legacy rules-based engine missed novel fraud patterns and suffered 250ms processing bottlenecks.",
        solution: "Engineered custom gradient-boosted neural classifiers deployed on private AWS EKS clusters with Redis feature caching.",
        result: "Reduced fraudulent transactions by 64% while maintaining sub-15ms processing across 40M daily events.",
      },
      {
        clientIndustry: "Medical Diagnostics & Biotech",
        title: "HIPAA-Compliant Enterprise RAG for Clinical Protocols",
        challenge: "Researchers spent 18+ hours weekly manually searching through unindexed medical trial PDFs.",
        solution: "Built an air-gapped vector search pipeline with factuality verification models and strict role-based access.",
        result: "Cut research retrieval time by 82% while guaranteeing zero data exposure to external model APIs.",
      },
      {
        clientIndustry: "Industrial Manufacturing",
        title: "Predictive Equipment Failure & Anomaly Detection",
        challenge: "Unplanned assembly line downtime cost the manufacturer over $4.2M annually.",
        solution: "Deployed IoT sensor streaming pipelines with anomaly detection models running at the edge.",
        result: "Predicted 91% of mechanical failures 48 hours before downtime occurred, saving $3.6M in year one.",
      },
    ],
    faqs: [
      {
        question: "Does any of our data leave our private cloud environment?",
        answer: "No. All models, vector stores, and processing services are containerized and deployed strictly within your private AWS, Azure, GCP, or on-premise VPC. Zero data is shared with external third parties.",
      },
      {
        question: "Who owns the source code and trained model weights?",
        answer: "Your organization retains 100% intellectual property rights. Upon project completion, all repository access, Docker images, and model checkpoint weights are fully transferred to your team.",
      },
      {
        question: "What latency targets can your models support?",
        answer: "Our inference engines are optimized for high throughput and low latency, regularly achieving sub-20ms execution times for classification and sub-100ms vector retrieval at scale.",
      },
      {
        question: "How do you handle model maintenance and drift?",
        answer: "We build automated telemetry pipelines that track data drift and accuracy decay. We provide automated retraining scripts and offer ongoing production SLA support.",
      },
    ],
  },
  business: {
    id: "business",
    slug: "business",
    title: "Business Services",
    eyebrow: "PRACTICE AREA 02 · WORKFLOW & PROCESS AUTOMATION",
    tagline: "Practical AI Applied Directly to Mission-Critical Enterprise Operations",
    description:
      "We automate manual, paper-heavy, and high-friction operational workflows across back-office, compliance, customer support, and financial reporting. Reclaim 80%+ of operational hours with deterministic automation.",
    heroImage: "/images/services/business.jpg",
    badges: ["Zero Friction", "Continuous Sync", "85% Time Saved"],
    metrics: [
      { value: "85%", label: "Reduction in Manual Processing Time" },
      { value: "99.2%", label: "Document Data Extraction Accuracy" },
      { value: "3.4x", label: "Faster Customer Ticket Resolution" },
      { value: "< 3 mos", label: "Average Time to Full Payback" },
    ],
    offerings: [
      {
        title: "Intelligent Document Processing (IDP)",
        subtitle: "Automated Data Extraction & Routing",
        description:
          "Extract, validate, and convert complex unstructured documents—invoices, bills of lading, medical records, and contracts—into structured ERP database records.",
        deliverables: [
          "Multi-format document parsing pipelines",
          "Automated optical character recognition (OCR)",
          "ERP & CRM auto-reconciliation hooks",
          "Human-in-the-loop exception queues",
        ],
        techStack: ["LayoutLM", "PaddleOCR", "Tesseract", "PostgreSQL", "SAP/Salesforce API"],
      },
      {
        title: "Process & Workflow Automation",
        subtitle: "End-to-End Operational Efficiency",
        description:
          "Eliminate manual data entry and multi-system copy-pasting by orchestrating intelligent software bots that automate complex cross-platform routines.",
        deliverables: [
          "Cross-application API orchestration",
          "Automated audit trail generation",
          "Rule-based decisioning logic engines",
          "Real-time SLA tracking alerts",
        ],
        techStack: ["Node.js", "Python", "Temporal.io", "RabbitMQ", "REST/GraphQL"],
      },
      {
        title: "AI Customer Experience & Support Triage",
        subtitle: "Automated Resolution & Smart Routing",
        description:
          "Deploy intelligent support agents and ticket classifiers that answer complex customer inquiries instantly and route high-value edge cases to human specialists.",
        deliverables: [
          "Intent classification & sentiment engines",
          "Multi-channel support bots (Web, Email, Chat)",
          "Automated ticket summaries & routing",
          "Agent assist real-time answer surfacing",
        ],
        techStack: ["Twilio", "Zendesk API", "Freshdesk API", "OpenAI/Claude API", "Python"],
      },
      {
        title: "Decision-Support Dashboards",
        subtitle: "Real-Time Operational Intelligence",
        description:
          "Synthesize disparate operational metrics into clean, actionable executive consoles that predict bottleneck risks and recommend optimal resource allocation.",
        deliverables: [
          "Executive performance dashboards",
          "Predictive demand forecasting models",
          "Automated weekly status summaries",
          "Custom alert notification rules",
        ],
        techStack: ["React", "Tailwind CSS", "Recharts", "Node.js", "ClickHouse"],
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Workflow Friction Mapping",
        description:
          "We shadow your operational teams to map exact manual touchpoints, document volumes, error frequencies, and turnaround bottlenecks.",
      },
      {
        step: "02",
        title: "Automation Architecture",
        description:
          "We design extraction models, API bridges, and exception-handling workflows tailored specifically to your existing ERP and CRM software.",
      },
      {
        step: "03",
        title: "Pilot & Exception Queue Tuning",
        description:
          "We run a controlled pilot against live operational data, refining human-in-the-loop validation queues to ensure 99%+ accuracy.",
      },
      {
        step: "04",
        title: "Full Rollout & Enterprise Scaling",
        description:
          "We deploy automated bots into live operations, establish continuous error auditing, and train your staff on exception management.",
      },
    ],
    caseStudies: [
      {
        clientIndustry: "Global Freight & Logistics Provider",
        title: "Automated Customs Clearance & Bill of Lading Processing",
        challenge: "250 logistics specialists spent 35,000 hours annually manually typing paper shipping manifests into legacy systems.",
        solution: "Implemented an Intelligent Document Processing engine that automatically parses 18 document formats and pushes structured records directly into CargoWise.",
        result: "Reduced document processing time by 88%, saving 31,000 operational hours per year and accelerating customs clearance by 4x.",
      },
      {
        clientIndustry: "Regional Healthcare Network",
        title: "Automated Patient Insurance Verification & Intake",
        challenge: "Prior authorization backlogs delayed critical patient care and caused a 14% claim rejection rate due to manual input errors.",
        solution: "Built an automated eligibility verification bot that cross-references payer portals and flags missing documentation in real time.",
        result: "Cut intake turnaround time from 3 days to 12 minutes and lowered claim rejection rates to under 1.5%.",
      },
      {
        clientIndustry: "Commercial Insurance Underwriting",
        title: "Underwriting Risk Analysis & Policy Comparison",
        challenge: "Underwriters spent 4+ hours per commercial application manually comparing loss runs and policy endorsements.",
        solution: "Developed an AI underwriting assistant that parses 100-page policy binders and highlights coverage discrepancies in a structured dashboard.",
        result: "Increased underwriting application throughput by 220% while reducing manual analysis time to under 25 minutes per policy.",
      },
    ],
    faqs: [
      {
        question: "How do you handle edge cases and documents that fail automatic extraction?",
        answer: "We design a human-in-the-loop exception queue. When a document confidence score falls below your target threshold (e.g. 95%), it is routed to a specialist with highlighted bounding boxes for rapid 1-click verification.",
      },
      {
        question: "Can these automations integrate with our legacy software?",
        answer: "Yes. We build custom API connectors, database hooks, and automated software drivers that communicate seamlessly with legacy ERPs, CRMs, and custom internal software.",
      },
      {
        question: "How long does a typical business process automation project take?",
        answer: "Most business automation initiatives move from initial process mapping to pilot in 3 to 5 weeks, with full production deployment completed within 8 to 12 weeks.",
      },
      {
        question: "What is the typical return on investment (ROI)?",
        answer: "Our clients routinely achieve full financial payback within 3 to 6 months through reduced labor overhead, eliminated penalty fees, and accelerated cycle times.",
      },
    ],
  },
  consulting: {
    id: "consulting",
    slug: "consulting",
    title: "AI Consulting",
    eyebrow: "PRACTICE AREA 03 · STRATEGIC ADVISORY & GOVERNANCE",
    tagline: "Clear-Eyed Technical Guidance to Find the AI Initiatives Worth Pursuing",
    description:
      "We provide independent technical advisory, data-readiness audits, and AI governance frameworks. We evaluate your operational bottlenecks honestly, eliminate hype, and deliver an actionable execution roadmap with guaranteed ROI.",
    heroImage: "/images/services/consulting.jpg",
    badges: ["Feasibility Audit", "100% IP Retained", "Zero Vendor Lock-in"],
    metrics: [
      { value: "100%", label: "Objective & Independent Advisory" },
      { value: "0%", label: "Proprietary Platform Lock-in" },
      { value: "2 Wks", label: "Rapid Feasibility Audit Sprint" },
      { value: "$140M+", label: "Verified ROI Delivered to Clients" },
    ],
    offerings: [
      {
        title: "AI Strategy & Feasibility Roadmaps",
        subtitle: "Outcome-Driven Opportunity Selection",
        description:
          "We analyze your business goals, identify the operational bottlenecks genuinely suited for AI, and build a prioritized, cost-modeled implementation roadmap.",
        deliverables: [
          "Executive opportunity matrix",
          "Technical feasibility & ROI calculations",
          "Multi-phase implementation timeline",
          "Resource allocation & hiring recommendations",
        ],
        techStack: ["Financial Modeling", "Architecture Mapping", "Vendor Evaluation", "Risk Assessment"],
      },
      {
        title: "Data-Readiness & Infrastructure Audits",
        subtitle: "Data Quality & Pipeline Diagnostics",
        description:
          "An honest, in-depth evaluation of your data assets, schema consistency, security controls, and infrastructure gaps before you invest in expensive model training.",
        deliverables: [
          "Data quality & completeness scorecard",
          "Security & compliance vulnerability assessment",
          "Data pipeline architectural recommendations",
          "Remediation action plan",
        ],
        techStack: ["Data Profiling", "Security Auditing", "Database Optimization", "Cloud Architecture"],
      },
      {
        title: "Vendor Evaluation & Due Diligence",
        subtitle: "Unbiased Technical Verification",
        description:
          "We evaluate third-party AI software vendors, foundation model APIs, and platform claims to protect your organization from overhyped, overpriced solutions.",
        deliverables: [
          "Third-party vendor benchmark reports",
          "Build vs. Buy financial trade-off analysis",
          "Contractual IP & security clause reviews",
          "POC benchmark validation tests",
        ],
        techStack: ["Benchmark Testing", "Cost Modeling", "Contract Review", "API Load Testing"],
      },
      {
        title: "Responsible AI, Governance & Safety",
        subtitle: "Deterministic Guardrails & Policy",
        description:
          "Establish robust corporate policies, data privacy boundaries, and model safety guardrails to ensure compliant, ethical AI adoption across your organization.",
        deliverables: [
          "Corporate AI usage policy guidelines",
          "Regulatory compliance checklists (EU AI Act, HIPAA, SOC2)",
          "Model bias & hallucination audit protocols",
          "Executive & staff AI training programs",
        ],
        techStack: ["Compliance Frameworks", "Safety Guardrails", "Policy Documentation", "Workshop Curriculum"],
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Discovery & Stakeholder Scoping",
        description:
          "We interview your executive, technology, and operations leaders to define business goals, current pain points, and technical constraints.",
      },
      {
        step: "02",
        title: "Data & Stack Diagnostics",
        description:
          "Our senior architects conduct an audit of your data sources, existing infrastructure, security posture, and team capabilities.",
      },
      {
        step: "03",
        title: "Feasibility & ROI Modeling",
        description:
          "We test data samples, build cost-benefit models, and evaluate alternative architectures to separate high-value opportunities from overhyped distractions.",
      },
      {
        step: "04",
        title: "Executive Roadmap Presentation",
        description:
          "We deliver an actionable, prioritized implementation plan with clear technical specifications, resource budgets, and vendor recommendations.",
      },
    ],
    caseStudies: [
      {
        clientIndustry: "Private Equity & Portfolio Operations",
        title: "AI Opportunity Audit Across 12 Portfolio Enterprise Companies",
        challenge: "A mid-market PE firm needed an objective evaluation of AI potential across 12 newly acquired industrial portfolio companies.",
        solution: "Conducted a 4-week structured feasibility audit analyzing data quality, process repetitive tasks, and estimated ROI for each company.",
        result: "Identified 5 high-impact initiatives expected to generate $18.5M in EBITDA expansion while advising against 7 unviable projects.",
      },
      {
        clientIndustry: "Global Financial Services Institution",
        title: "EU AI Act Compliance & Governance Architecture",
        challenge: "A international banking group faced upcoming EU AI Act enforcement across 30+ internal risk models.",
        solution: "Established comprehensive risk categorization, bias auditing protocols, and deterministic logging guardrails for all production models.",
        result: "Achieved 100% regulatory compliance readiness ahead of statutory deadlines with zero disruption to active trading systems.",
      },
      {
        clientIndustry: "Enterprise Software Vendor (SaaS)",
        title: "Build vs. Buy Strategy for Generative Product Features",
        challenge: "An enterprise B2B SaaS platform was considering spending $5M to license proprietary foundation models.",
        solution: "Ran a technical proof-of-concept benchmarking fine-tuned open-source models against proprietary APIs.",
        result: "Proved open-source models deployed on private infrastructure outperformed proprietary APIs by 22% at 1/6th the annual licensing cost.",
      },
    ],
    faqs: [
      {
        question: "Is Innoanswers affiliated with specific AI vendors or cloud providers?",
        answer: "No. We are 100% independent. We do not accept reseller commissions or kickbacks from cloud vendors or software providers. Our advice is governed entirely by what provides the highest ROI for your business.",
      },
      {
        question: "How long does a strategic consulting audit take?",
        answer: "Our standard AI strategy & data-readiness audit is structured as a 2 to 3-week intensive sprint that yields actionable, board-ready deliverables.",
      },
      {
        question: "Can your team also build the solutions recommended in the roadmap?",
        answer: "Yes. As a full-lifecycle engineering firm, our technology and business services teams can seamlessly execute the roadmap, or we can assist your internal team in building it.",
      },
      {
        question: "What if the audit reveals our business is NOT ready for AI?",
        answer: "We tell you honestly. If your problem is better solved with simple database rules, workflow adjustments, or data cleaning, we state that clearly so you avoid wasting capital on unnecessary complexity.",
      },
    ],
  },
};

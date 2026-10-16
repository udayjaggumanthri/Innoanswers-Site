export interface Pillar {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  description: string;
}

export interface ValueCard {
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  avatarSrc: string;
  bio: string;
}

export interface AboutContent {
  eyebrow: string;
  homeH2: string;
  pageH1: string;
  body: string;
  pillars: Pillar[];
  howWeWork: ProcessStep[];
  whatWeBelieve: ValueCard[];
  mission: string;
  showTeam: boolean;
  teamPlaceholders: TeamMember[];
}

export const aboutContent: AboutContent = {
  eyebrow: "About Innoanswers",
  homeH2: "Technology that tackles real-world problems.",
  pageH1: "A team that turns tough problems into working solutions.",
  body: "At Innoanswers, we thrive on using technology to tackle tough real-world problems. Our team blends AI expertise with industry knowledge to deliver solutions that result in tangible business benefits. No jargon — just results.",
  pillars: [
    {
      title: "AI expertise",
      description: "Practical machine learning, generative AI, and data engineering, applied where it counts.",
    },
    {
      title: "Industry knowledge",
      description: "We learn your domain first, so solutions fit how your business actually runs.",
    },
    {
      title: "Tangible results",
      description: "Every engagement is tied to a business outcome you can see.",
    },
  ],
  howWeWork: [
    {
      step: "01",
      number: "1",
      title: "Understand",
      description: "We start with your problem and your industry, not the technology.",
    },
    {
      step: "02",
      number: "2",
      title: "Design",
      description: "We shape a focused solution tied to a measurable outcome.",
    },
    {
      step: "03",
      number: "3",
      title: "Build",
      description: "We deliver working software in short, visible iterations.",
    },
    {
      step: "04",
      number: "4",
      title: "Improve",
      description: "We hand over cleanly and keep refining what matters.",
    },
  ],
  whatWeBelieve: [
    {
      title: "Results over jargon",
      description: "We measure success by working software and measurable business impact, not buzzwords or slides.",
    },
    {
      title: "Industry first",
      description: "Technology must serve the operational realities of your specific field, not generic templates.",
    },
    {
      title: "Practical, not performative",
      description: "Doing what matters, faster and better — solving real bottlenecks rather than showcasing novelties.",
    },
    {
      title: "Straight talk",
      description: "Honest assessments of what AI can and cannot solve for your business, right from day one.",
    },
  ],
  mission: "To make AI useful for the businesses that need it most.",
  showTeam: true,
  teamPlaceholders: [
    {
      name: "Alex Morgan",
      role: "AI Engineering Lead",
      initials: "AM",
      avatarSrc: "/images/team/alex-morgan.jpg",
      bio: "12+ years deploying high-throughput neural models and mission-critical data pipelines in regulated industries.",
    },
    {
      name: "Taylor Chen",
      role: "Principal Solutions Architect",
      initials: "TC",
      avatarSrc: "/images/team/taylor-chen.jpg",
      bio: "Specializes in enterprise RAG systems, private VPC deployments, and deterministic guardrail architectures.",
    },
    {
      name: "Jordan Rivera",
      role: "Industry Practice Lead",
      initials: "JR",
      avatarSrc: "/images/team/jordan-rivera.jpg",
      bio: "Connects operational domain challenges with pragmatic, cost-effective machine learning solutions.",
    },
    {
      name: "Samira Patel",
      role: "Applied ML Specialist",
      initials: "SP",
      avatarSrc: "/images/team/samira-patel.jpg",
      bio: "Leads automated document intelligence, structured classification, and enterprise ERP integration pipelines.",
    },
  ],
};

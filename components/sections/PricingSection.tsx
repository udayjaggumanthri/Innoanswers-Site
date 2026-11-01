import React, { useState } from "react";
import { Check, ArrowRight, Sparkles, Clock, Zap } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { ThreeDCard } from "../3d/ThreeDCard";

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  timeline: string;
  description: string;
  features: string[];
  deliverables: string;
  ctaText: string;
  ctaHref: string;
}

const tiers: PricingTier[] = [
  {
    id: "discovery",
    name: "Discovery & Feasibility",
    timeline: "2 – 4 Weeks",
    description:
      "Rapidly audit your data readiness, test model viability, and deliver a working proof-of-concept before committing capital.",
    features: [
      "Data architecture & quality audit",
      "Model feasibility & benchmark testing",
      "Interactive working prototype / POC",
      "Executive ROI & risk analysis report",
      "Direct consultation with Principal AI Architect",
      "Confidential NDA & zero data retention",
    ],
    deliverables: "Working POC + Strategic Implementation Blueprint",
    ctaText: "Start Discovery",
    ctaHref: "/contact?tier=discovery",
  },
  {
    id: "production",
    name: "Production Deployment",
    badge: "Most Popular",
    isPopular: true,
    timeline: "8 – 12 Weeks",
    description:
      "Full-lifecycle AI engineering: custom machine learning, fine-tuned LLMs, secure API integrations, and hardened production rollouts.",
    features: [
      "Custom model training & fine-tuning",
      "Enterprise RAG & vector database setup",
      "Deterministic guardrails & latency optimization",
      "Private cloud or sovereign on-prem deployment",
      "CI/CD pipeline with model drift alarms",
      "100% intellectual property & code handover",
      "99.98% production uptime SLA backing",
    ],
    deliverables: "Live Production AI System + Comprehensive Documentation",
    ctaText: "Schedule Scoping Call",
    ctaHref: "/contact?tier=production",
  },
  {
    id: "enterprise",
    name: "Enterprise Dedicated Pod",
    badge: "Scale & Retainer",
    timeline: "Ongoing Retainer",
    description:
      "A dedicated pod of senior ML engineers, data architects, and MLOps specialists embedded directly alongside your team.",
    features: [
      "Dedicated senior AI engineering pod",
      "Continuous model iteration & fine-tuning",
      "Multi-agent autonomous workflow orchestration",
      "Enterprise security & code quality audits",
      "24/7 mission-critical production support",
      "Custom high-throughput inference caching",
      "Dedicated Slack/Teams channel with 1hr SLA",
    ],
    deliverables: "Continuous Autonomous AI Evolution & Scaling",
    ctaText: "Talk to Leadership",
    ctaHref: "/contact?tier=enterprise",
  },
];

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"project" | "retainer">("project");

  return (
    <section
      id="pricing"
      className="bg-[var(--bg)] py-16 sm:py-20 lg:py-24 border-b border-[var(--border-subtle)] relative overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto space-y-4">
          <Reveal>
            <div className="eyebrow mx-auto justify-center">
              <span>TRANSPARENT ENGAGEMENT MODELS</span>
            </div>
          </Reveal>

          <Reveal delayMs={80}>
            <h2 className="section-h2 text-[var(--ink)]">
              Clear, outcome-based partnerships.
            </h2>
          </Reveal>

          <Reveal delayMs={160}>
            <p className="lead-text text-[var(--body-text)] max-w-[620px] mx-auto">
              No endless retainer creep or speculative experiments. We structure every engagement around concrete deliverables, clear timelines, and measurable business ROI.
            </p>
          </Reveal>
        </div>

        {/* 3 Tier Cards Grid with Responsive Fluid Scaling */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 items-stretch max-w-lg lg:max-w-none mx-auto">
          {tiers.map((tier, idx) => (
            <Reveal key={tier.id} delayMs={idx * 100} className="flex">
              <ThreeDCard
                className="w-full h-full rounded-2xl"
                maxTilt={tier.isPopular ? 8 : 6}
                scale={tier.isPopular ? 1.025 : 1.015}
              >
                <div
                  className={`relative flex flex-col justify-between w-full h-full rounded-2xl p-7 sm:p-8 transition-all duration-300 ${
                    tier.isPopular
                      ? "bg-[var(--surface-hover)] border-2 border-[var(--accent)] shadow-2xl shadow-[var(--accent)]/15 z-20"
                      : "bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-[var(--accent)]/50 hover:shadow-xl"
                  }`}
                >
                  {/* Popular Pill Badge */}
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          tier.isPopular
                            ? "bg-[var(--accent)] text-[#030718] shadow-md shadow-[var(--accent)]/30"
                            : "bg-[var(--bg-alt)] text-[var(--ink)] border border-[var(--border-subtle)]"
                        }`}
                      >
                        {tier.isPopular && <Zap className="w-3 h-3 fill-current" />}
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                        {tier.name}
                      </h3>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-xs font-medium text-[var(--accent)]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Typical Duration: {tier.timeline}</span>
                    </div>

                    <p className="mt-4 text-[14px] leading-relaxed text-[var(--body-text)] min-h-[42px]">
                      {tier.description}
                    </p>

                    <div className="mt-6 pt-5 border-t border-[var(--border-subtle)]">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--link)] mb-3">
                        Included Capabilities
                      </p>
                      <ul className="space-y-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5 text-[14px] text-[var(--body-text)]">
                            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
                              <Check className="h-3 w-3 stroke-[3]" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
                    <div className="mb-4 rounded-lg bg-[var(--bg)]/70 border border-[var(--border-subtle)] px-3.5 py-2.5 text-xs text-[var(--muted-text)]">
                      <span className="font-semibold text-[var(--ink)] block mb-0.5">Primary Deliverable:</span>
                      {tier.deliverables}
                    </div>

                    <a
                      href={tier.ctaHref}
                      className={`inline-flex w-full items-center justify-center gap-2 h-11 px-5 rounded-full text-sm font-medium tracking-tight transition-all duration-200 ${
                        tier.isPopular
                          ? "bg-[var(--accent)] text-[#030718] font-semibold hover:brightness-110 shadow-lg shadow-[var(--accent)]/20"
                          : "bg-[var(--btn-bg)] text-[var(--btn-ink)] hover:bg-[var(--btn-hover)]"
                      }`}
                    >
                      <span>{tier.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </ThreeDCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}


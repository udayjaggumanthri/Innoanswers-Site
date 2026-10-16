import React, { useState } from "react";
import { ChevronDown, MessageSquare, Clock, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

interface FaqItem {
  question: string;
  answer: string;
}

const enterpriseFaqs: FaqItem[] = [
  {
    question: "How do we know if AI is truly the right solution for our problem?",
    answer:
      "We always begin with the business bottleneck, not the technology. During our initial discovery phase, we conduct an honest feasibility assessment. If a simple heuristic, modern database query, or rule-based pipeline solves your challenge more reliably and cost-effectively than an AI model, we will recommend that directly. No hype, no unnecessary complexity.",
  },
  {
    question: "How do you guarantee data privacy, sovereignty, and zero model training on our data?",
    answer:
      "We build under strict sovereign execution standards. Models and data pipelines are deployed directly inside your private VPC (AWS, GCP, Azure) or air-gapped on-premise infrastructure. Zero customer prompts, logs, or proprietary embeddings are ever shared or used to train third-party foundation models. Full confidentiality is legally protected under strict corporate NDAs.",
  },
  {
    question: "Do we retain 100% ownership of the resulting code and IP?",
    answer:
      "Yes, completely. All custom model weights, orchestration code, data pipelines, integrations, and architectural documentation created during our engagement belong 100% to your organization. We deliver clean, documented codebases with zero proprietary vendor lock-in.",
  },
  {
    question: "What is the typical timeline from discovery to a live production deployment?",
    answer:
      "Our standard delivery progression is divided into structured milestones. We deliver an interactive, validated prototype in 2 to 4 weeks. Full production deployment with hardened API integration, latency optimization, and drift alarms typically takes between 8 and 12 weeks.",
  },
  {
    question: "Can your solutions integrate into our existing legacy systems and modern cloud stack?",
    answer:
      "Yes. Our engineering team specializes in seamless enterprise integration. Whether your infrastructure is hosted on AWS, Microsoft Azure, Google Cloud, Snowflake, Databricks, or hybrid on-premises systems, we design containerized microservices and secure REST/gRPC endpoints that plug directly into your production environment.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[var(--bg-alt)] py-14 sm:py-16 lg:py-20 border-t border-[var(--border-subtle)] relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: SaaSly-style Contact & Advisory Card */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <div className="eyebrow">
                <MessageSquare className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <h2 className="section-h2 text-[var(--ink)]">
                Everything you need to know about partnering with us.
              </h2>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="lead-text text-[var(--body-text)]">
                Clear, transparent answers about our engineering methodology, data governance, intellectual property, and production handovers.
              </p>
            </Reveal>

            {/* Quick Consultation Callout Card */}
            <Reveal delayMs={240}>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-hover)] text-[var(--accent)] border border-[var(--border-subtle)]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                      Have a specific question?
                    </h3>
                    <p className="text-xs text-[var(--muted-text)]">
                      Connect directly with a Principal AI Architect
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-[var(--body-text)] leading-relaxed">
                  We reply within 2 business hours with an honest evaluation of your operational bottleneck.
                </p>

                <div className="pt-2 flex flex-col gap-2.5">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-[var(--accent)] text-[#030718] text-xs font-semibold hover:brightness-110 shadow-md shadow-[var(--accent)]/15 transition-all"
                  >
                    <span>Schedule an Engineering Discovery</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>

                  <a
                    href="mailto:hello@innoanswers.com"
                    className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg)] text-xs font-medium text-[var(--ink)] hover:bg-[var(--surface-hover)] transition-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-[var(--muted-text)]" />
                    <span>hello@innoanswers.com</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Clean Accordion Stack */}
          <div className="lg:col-span-7 space-y-3.5">
            {enterpriseFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <Reveal key={faq.question} delayMs={idx * 60}>
                  <div
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "border-[var(--accent)]/60 bg-[var(--surface-hover)] shadow-md shadow-[var(--accent)]/5"
                        : "border-[var(--border-subtle)] bg-[var(--surface)] hover:border-[var(--accent)]/30"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors cursor-pointer select-none"
                    >
                      <span className="text-[15px] sm:text-[16px] font-semibold text-[var(--ink)] pr-4">
                        {faq.question}
                      </span>
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg)] transition-transform duration-200 ${
                          isOpen ? "rotate-180 bg-[var(--accent)] text-[#030718] border-[var(--accent)]" : "text-[var(--muted-text)]"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4 stroke-[2.5]" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-[14px] sm:text-[15px] leading-relaxed text-[var(--body-text)] border-t border-[var(--border-subtle)]/60">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

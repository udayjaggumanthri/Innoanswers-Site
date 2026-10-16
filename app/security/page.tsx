import React from "react";
import { Lock, ShieldCheck, Server, Cpu, CheckCircle2, ArrowLeft } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { Reveal } from "../../components/ui/Reveal";

export const metadata = {
  title: "Security & Compliance — Innoanswers Inc.",
  description:
    "Enterprise security posture, private cloud VPC isolation, SOC 2 Type II compliance, HIPAA readiness, and EU AI Act governance architectures.",
};

export default function SecurityPage() {
  const securityPillars = [
    {
      title: "Private VPC Isolation",
      description:
        "All model inference, vector indexes, and extraction pipelines execute strictly within your AWS, Azure, GCP, or on-premise cloud perimeter with zero external data egress.",
      badge: "VPC Air-Gapped",
    },
    {
      title: "SOC 2 Type II & ISO 27001 Preparedness",
      description:
        "Our software architecture, deployment pipelines, and operational logging follow strict SOC 2 and ISO security controls to pass enterprise vendor risk audits.",
      badge: "Audit Ready",
    },
    {
      title: "HIPAA & GDPR Compliance",
      description:
        "Engineered for strict PHI and PII protection. Features automated data anonymization, audit trails, and deterministic role-based document access.",
      badge: "PHI / PII Safeguards",
    },
    {
      title: "EU AI Act Governance",
      description:
        "Deterministic model validation suites, bias detection tracking, and clear audit logs ensuring full compliance with international AI regulatory frameworks.",
      badge: "AI Governance",
    },
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-[var(--bg)] min-h-screen">
      <section className="py-12 border-b border-[var(--border-subtle)] bg-[var(--bg-alt)]">
        <Container>
          <div className="max-w-3xl mx-auto space-y-4">
            <Reveal>
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Home</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-[var(--muted-text)] font-mono uppercase tracking-wider">
                <Lock className="w-4 h-4 text-sky-400" />
                <span>Enterprise Security Architecture</span>
              </div>
            </Reveal>

            <Reveal delayMs={60}>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
                Security &amp; Compliance Safeguards
              </h1>
            </Reveal>

            <Reveal delayMs={120}>
              <p className="text-base text-[var(--body-text)]">
                Hardened infrastructure, strict data isolation, and comprehensive governance built for regulated financial, healthcare, and enterprise environments.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityPillars.map((p, idx) => (
                <Reveal key={p.title} delayMs={idx * 80}>
                  <div className="p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] space-y-3 h-full shadow-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 dark:text-sky-400 text-xs font-semibold font-mono">
                        {p.badge}
                      </span>
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    </div>

                    <h2 className="text-lg font-bold text-[var(--ink)] tracking-tight">
                      {p.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[var(--body-text)] leading-relaxed font-normal">
                      {p.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delayMs={200}>
              <div className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-hover)] space-y-4">
                <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-600 dark:text-sky-400" />
                  <span>Request Security Architecture Overview &amp; SOC2 Documents</span>
                </h2>
                <p className="text-sm text-[var(--body-text)] leading-relaxed">
                  Our security team provides technical architecture diagrams, penetration test summaries, and data processing addendums under standard mutual NDA.
                </p>
                <div className="pt-2">
                  <a
                    href="/contact"
                    className="inline-flex h-11 items-center justify-center gap-2 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all"
                  >
                    <span>Request Security Packet</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}

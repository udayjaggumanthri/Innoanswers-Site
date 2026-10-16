import React from "react";
import { ArrowRight, ShieldCheck, CheckCircle2, Lock, Cpu, Server } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { CinematicImage } from "../ui/CinematicImage";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-14 sm:py-18 lg:py-22 bg-[var(--bg-alt)] border-b border-[var(--border-subtle)]"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Enterprise Engineering Story */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <div className="eyebrow">
                <span className="uppercase tracking-wider font-semibold text-xs">
                  ABOUT INNOANSWERS
                </span>
                <span className="opacity-30">·</span>
                <span className="font-medium text-xs text-[var(--muted-text)]">
                  Engineering Rigor
                </span>
              </div>
            </Reveal>

            {/* Authoritative Solid Heading */}
            <Reveal delayMs={70}>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[var(--ink)] leading-[1.14]">
                Engineering deterministic AI systems for mission-critical operations.
              </h2>
            </Reveal>

            {/* Crisp Enterprise Narrative */}
            <Reveal delayMs={130}>
              <div className="space-y-4 text-base sm:text-lg text-[var(--body-text)] leading-relaxed font-normal">
                <p>
                  Innoanswers partners with forward-thinking organizations to design, build, and deploy production-grade software and machine learning systems. We reject speculative hype in favor of measurable business ROI, hardened architectural reliability, and zero jargon.
                </p>
                <p className="text-sm sm:text-base text-[var(--muted-text)]">
                  Every engagement is delivered with 100% intellectual property ownership, dedicated code handover, and private deployment inside your sovereign cloud or on-premise infrastructure.
                </p>
              </div>
            </Reveal>

            {/* 3 Core Commitments */}
            <Reveal delayMs={180}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                    <span className="text-xs font-bold text-[var(--ink)]">Zero Hallucination</span>
                  </div>
                  <p className="text-xs text-[var(--muted-text)]">
                    Mathematical guardrails &amp; deterministic checks.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Lock className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                    <span className="text-xs font-bold text-[var(--ink)]">Private VPC</span>
                  </div>
                  <p className="text-xs text-[var(--muted-text)]">
                    No third-party training on your private data.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Server className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                    <span className="text-xs font-bold text-[var(--ink)]">100% IP Handover</span>
                  </div>
                  <p className="text-xs text-[var(--muted-text)]">
                    Full code, weights, and documentation ownership.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Action Buttons */}
            <Reveal delayMs={220}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 text-sm font-semibold tracking-tight shadow-sm transition-all duration-200"
                >
                  <span>Talk to our team</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </a>

                <a
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-sky-400 hover:underline py-2 px-3"
                >
                  <span>Learn about our engineering team</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Real Team & Architecture Image Asset with Cinematic IntersectionObserver */}
          <div className="lg:col-span-6 w-full">
            <Reveal delayMs={160}>
              <CinematicImage
                src="/images/about/team-collab.jpg"
                alt="Innoanswers engineering team in architectural design session"
                aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
                threshold={0.15}
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

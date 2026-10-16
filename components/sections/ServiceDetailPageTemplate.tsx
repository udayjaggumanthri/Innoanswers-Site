import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Cpu,
  Briefcase,
  Compass,
  ArrowUpRight,
  Clock,
  Layers,
} from "lucide-react";
import { ServiceDetailPageData } from "../../content/service-details";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { CinematicImage } from "../ui/CinematicImage";
import { CtaBand } from "./CtaBand";
import { ThreeDCard } from "../3d/ThreeDCard";

interface ServiceDetailPageTemplateProps {
  data: ServiceDetailPageData;
}

export function ServiceDetailPageTemplate({ data }: ServiceDetailPageTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const IconComponent =
    data.id === "technology" ? Cpu : data.id === "business" ? Briefcase : Compass;

  return (
    <div className="pt-28 sm:pt-36">
      {/* 1. Hero Header */}
      <section className="relative overflow-hidden py-14 sm:py-18 lg:py-22 bg-[var(--bg)] border-b border-[var(--border-subtle)]">
        <Container>
          <div className="max-w-[880px] mx-auto text-center space-y-6">
            {/* Eyebrow Badge */}
            <Reveal>
              <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] text-xs text-[var(--muted-text)] shadow-xs mx-auto">
                <IconComponent className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                <span className="uppercase tracking-wider font-bold text-[11px] text-[var(--ink)]">
                  {data.eyebrow}
                </span>
              </div>
            </Reveal>

            {/* Title */}
            <Reveal delayMs={80}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--ink)] leading-[1.12]">
                {data.title}
              </h1>
            </Reveal>

            {/* Tagline & Lead Description */}
            <Reveal delayMs={140}>
              <p className="text-base sm:text-lg lg:text-xl font-medium text-blue-600 dark:text-sky-400 max-w-[760px] mx-auto">
                {data.tagline}
              </p>
              <p className="mt-3 text-sm sm:text-base lg:text-lg text-[var(--body-text)] leading-relaxed max-w-[740px] mx-auto font-normal">
                {data.description}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delayMs={200}>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
                <a
                  href="/contact"
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base tracking-tight shadow-md transition-all duration-200 hover:scale-[1.02]"
                >
                  <span>Talk to our team</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </a>

                <a
                  href="#case-studies"
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 px-6 rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--ink)] text-sm sm:text-base font-medium tracking-tight shadow-sm transition-all duration-200 hover:bg-[var(--surface-hover)]"
                >
                  <span>Explore Case Studies</span>
                </a>
              </div>
            </Reveal>

            {/* Key Metrics Strip */}
            <Reveal delayMs={260}>
              <div className="pt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                {data.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] shadow-xs"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] font-mono">
                      {m.value}
                    </div>
                    <div className="text-xs text-[var(--muted-text)] mt-1 font-medium">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. Hero Cinematic Visual */}
      <section className="py-12 sm:py-16 bg-[var(--bg-alt)] border-b border-[var(--border-subtle)]">
        <Container>
          <Reveal>
            <ThreeDCard className="rounded-3xl" maxTilt={4} scale={1.01}>
              <CinematicImage
                src={data.heroImage}
                alt={`${data.title} architecture showcase`}
                aspectRatio="aspect-[16/9] sm:aspect-[21/9]"
                threshold={0.15}
                overlay={
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-2xl border border-white/20 bg-slate-950/85 backdrop-blur-md text-white flex flex-wrap items-center justify-between gap-4 shadow-2xl">
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400 block font-mono">
                        {data.eyebrow}
                      </span>
                      <p className="text-sm sm:text-base font-bold text-white">
                        {data.title} · Production Architecture
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {data.badges.map((b) => (
                        <span
                          key={b}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-sm border border-white/20"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                          <span>{b}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                }
              />
            </ThreeDCard>
          </Reveal>
        </Container>
      </section>

      {/* 3. Detailed Offerings Grid */}
      <section id="offerings" className="py-16 lg:py-24 bg-[var(--bg)] border-b border-[var(--border-subtle)]">
        <Container>
          <div className="max-w-[780px] space-y-3 mb-12">
            <Reveal>
              <div className="eyebrow">
                <Layers className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>CORE CAPABILITIES</span>
              </div>
            </Reveal>
            <Reveal delayMs={80}>
              <h2 className="section-h2 text-[var(--ink)]">
                What we build in {data.title}
              </h2>
            </Reveal>
            <Reveal delayMs={140}>
              <p className="lead-text text-[var(--body-text)]">
                Four specialized engineering capabilities designed to solve operational bottlenecks and deliver measurable ROI.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {data.offerings.map((offering, idx) => (
              <Reveal key={offering.title} delayMs={idx * 90} className="flex">
                <ThreeDCard className="w-full h-full rounded-2xl" maxTilt={5} scale={1.015}>
                  <Card className="p-7 sm:p-8 flex flex-col justify-between w-full h-full border border-[var(--border-subtle)] hover:border-blue-500/50 dark:hover:border-sky-400/50 transition-all shadow-sm hover:shadow-xl">
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider font-mono">
                          {offering.subtitle}
                        </span>
                        <h3 className="text-xl font-bold text-[var(--ink)] tracking-tight mt-1">
                          {offering.title}
                        </h3>
                      </div>

                      <p className="text-sm text-[var(--body-text)] leading-relaxed font-normal">
                        {offering.description}
                      </p>

                      {/* Deliverables List */}
                      <div className="pt-2 border-t border-[var(--border-subtle)]">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-text)] block mb-2.5 font-mono">
                          Key Deliverables
                        </span>
                        <ul className="space-y-2">
                          {offering.deliverables.map((del) => (
                            <li key={del} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--ink)]">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-text)] block mb-2 font-mono">
                        Primary Tech &amp; Tools
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {offering.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-xs text-[var(--ink)] font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </ThreeDCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Delivery Methodology / Implementation Pipeline */}
      <section className="py-16 lg:py-24 bg-[var(--bg-alt)] border-b border-[var(--border-subtle)]">
        <Container>
          <div className="max-w-[780px] space-y-3 mb-12">
            <Reveal>
              <div className="eyebrow">
                <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>DELIVERY PROCESS</span>
              </div>
            </Reveal>
            <Reveal delayMs={80}>
              <h2 className="section-h2 text-[var(--ink)]">
                Our 4-step implementation methodology
              </h2>
            </Reveal>
            <Reveal delayMs={140}>
              <p className="lead-text text-[var(--body-text)]">
                A disciplined, milestone-driven process engineered for rapid execution and complete operational confidence.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.methodology.map((m, idx) => (
              <Reveal key={m.step} delayMs={idx * 80}>
                <ThreeDCard className="w-full h-full rounded-2xl" maxTilt={6} scale={1.02}>
                  <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] shadow-xs flex flex-col justify-between h-full space-y-4">
                    <div>
                      <span className="text-2xl font-extrabold text-blue-600 dark:text-sky-400 font-mono block mb-2">
                        {m.step}
                      </span>
                      <h3 className="text-lg font-bold text-[var(--ink)] tracking-tight mb-2">
                        {m.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--body-text)] leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                </ThreeDCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Service-Specific Case Studies */}
      <section id="case-studies" className="py-16 lg:py-24 bg-[var(--bg)] border-b border-[var(--border-subtle)]">
        <Container>
          <div className="max-w-[780px] space-y-3 mb-12">
            <Reveal>
              <div className="eyebrow">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>REAL-WORLD RESULTS</span>
              </div>
            </Reveal>
            <Reveal delayMs={80}>
              <h2 className="section-h2 text-[var(--ink)]">
                {data.title} Case Studies
              </h2>
            </Reveal>
            <Reveal delayMs={140}>
              <p className="lead-text text-[var(--body-text)]">
                Proven enterprise deployments that delivered measurable ROI, accelerated cycle times, and enhanced decision confidence.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {data.caseStudies.map((cs, idx) => (
              <Reveal key={cs.title} delayMs={idx * 100} className="flex">
                <ThreeDCard className="w-full h-full rounded-2xl" maxTilt={5} scale={1.018}>
                  <Card className="p-7 flex flex-col justify-between w-full h-full border border-[var(--border-subtle)] hover:border-blue-500/50 shadow-sm hover:shadow-xl">
                    <div className="space-y-4">
                      <span className="inline-block px-3 py-1 rounded-md bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-xs font-semibold text-blue-600 dark:text-sky-400 uppercase tracking-wider font-mono">
                        {cs.clientIndustry}
                      </span>

                      <h3 className="text-lg font-bold text-[var(--ink)] leading-snug">
                        {cs.title}
                      </h3>

                      <div className="space-y-2 text-xs sm:text-sm text-[var(--body-text)]">
                        <p>
                          <strong className="text-[var(--ink)] font-semibold">Challenge: </strong>
                          {cs.challenge}
                        </p>
                        <p>
                          <strong className="text-[var(--ink)] font-semibold">Solution: </strong>
                          {cs.solution}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500 block mb-1 font-mono">
                        Verified Business Outcome
                      </span>
                      <p className="text-sm font-bold text-[var(--ink)]">
                        {cs.result}
                      </p>
                    </div>
                  </Card>
                </ThreeDCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Service-Specific FAQs */}
      <section className="py-16 lg:py-24 bg-[var(--bg-alt)] border-b border-[var(--border-subtle)]">
        <Container>
          <div className="max-w-[800px] mx-auto space-y-8">
            <div className="text-center space-y-3">
              <Reveal>
                <div className="eyebrow mx-auto justify-center">
                  <span>FREQUENTLY ASKED QUESTIONS</span>
                </div>
              </Reveal>
              <Reveal delayMs={80}>
                <h2 className="section-h2 text-[var(--ink)]">
                  {data.title} Technical FAQ
                </h2>
              </Reveal>
            </div>

            <div className="space-y-4">
              {data.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <Reveal key={faq.question} delayMs={idx * 60}>
                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] overflow-hidden shadow-xs">
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-[var(--ink)] hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer select-none"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[var(--muted-text)] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-blue-600 dark:text-sky-400" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 text-sm sm:text-base text-[var(--body-text)] leading-relaxed border-t border-[var(--border-subtle)] pt-4">
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

      {/* 7. Closing CTA */}
      <CtaBand />
    </div>
  );
}

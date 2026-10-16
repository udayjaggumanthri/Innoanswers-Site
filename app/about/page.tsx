import React, { useState } from "react";
import { aboutContent } from "../../content/about";
import { Container } from "../../components/ui/Container";
import { Card } from "../../components/ui/Card";
import { Reveal } from "../../components/ui/Reveal";
import { ProcessSteps } from "../../components/sections/ProcessSteps";
import { CtaBand } from "../../components/sections/CtaBand";
import { ThreeDCard } from "../../components/3d/ThreeDCard";
import { CinematicImage } from "../../components/ui/CinematicImage";
import {
  Sparkles,
  ShieldCheck,
  Target,
  Eye,
  Heart,
  Award,
  Users,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "About Innoanswers — Enterprise AI Engineering",
  description: "Learn about Innoanswers, our mission, values, and how our team blends AI expertise with domain knowledge to deliver tangible business outcomes.",
};

export default function AboutPage() {
  const [activeStoryTab, setActiveStoryTab] = useState<"mission" | "vision" | "values">("mission");

  return (
    <div className="pt-28 sm:pt-36">
      {/* 1. Centered SaaSly Hero Header */}
      <section className="relative overflow-hidden py-14 lg:py-20 bg-[var(--bg)] border-b border-[var(--border-subtle)]">
        <Container className="relative z-10">
          <div className="max-w-[840px] mx-auto text-center space-y-5">
            <Reveal>
              <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] text-xs text-[var(--muted-text)] max-w-full text-center shadow-xs mx-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 shrink-0" />
                <span className="uppercase tracking-wider font-bold text-[11px] text-[var(--ink)]">ABOUT INNOANSWERS</span>
                <span className="opacity-40">·</span>
                <span className="font-medium text-[11px] sm:text-xs">
                  Enterprise AI Engineering &amp; Applied Research
                </span>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--ink)] tracking-tight leading-[1.12]">
                Turning tough problems into working, scalable solutions.
              </h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="text-sm sm:text-base lg:text-lg text-[var(--body-text)] leading-relaxed max-w-[720px] mx-auto">
                We bridge the gap between theoretical AI models and mission-critical production operations. No hype, no jargon — just reliable, measurable outcomes.
              </p>
            </Reveal>
          </div>

          {/* 2. Visual Bento Grid: Lab Photo + 3 Metric Pillars with 3D Depth */}
          <Reveal delayMs={240} className="mt-14">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch">
              {/* Main Photo (8 cols) with Cinematic IntersectionObserver */}
              <div className="md:col-span-8">
                <ThreeDCard className="w-full h-full rounded-2xl sm:rounded-3xl" maxTilt={5} scale={1.01}>
                  <CinematicImage
                    src="/images/about/team-collab.jpg"
                    alt="Innoanswers AI engineering and strategy team collaborating"
                    aspectRatio="aspect-[16/10] sm:aspect-[16/9]"
                    threshold={0.15}
                    overlay={
                      <div className="absolute bottom-5 left-6 right-6 z-10 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] font-mono">
                            Production Engineering Lab
                          </span>
                          <p className="text-sm sm:text-base font-semibold text-white mt-0.5">
                            San Francisco &amp; Distributed Global Pods
                          </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3.5 py-1 backdrop-blur-md text-xs text-white">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          <span>Active Production Clusters</span>
                        </div>
                      </div>
                    }
                  />
                </ThreeDCard>
              </div>

              {/* Side Metric Cards Stack (4 cols) with 3D Depth */}
              <div className="md:col-span-4 flex flex-col justify-between gap-4">
                <ThreeDCard className="rounded-2xl flex-1" maxTilt={6} scale={1.02}>
                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 flex flex-col justify-between h-full shadow-sm">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
                        ENGINEERING RIGOR
                      </span>
                      <h3 className="text-3xl font-extrabold text-[var(--ink)] mt-2 font-mono">
                        100%
                      </h3>
                      <p className="text-xs text-[var(--muted-text)] mt-1">
                        Code & IP ownership transferred to clients
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2 text-xs text-[var(--muted-text)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Zero proprietary lock-in</span>
                    </div>
                  </div>
                </ThreeDCard>

                <ThreeDCard className="rounded-2xl flex-1" maxTilt={6} scale={1.02}>
                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 flex flex-col justify-between h-full shadow-sm">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
                        ENTERPRISE RECORD
                      </span>
                      <h3 className="text-3xl font-extrabold text-[var(--ink)] mt-2 font-mono">
                        180+
                      </h3>
                      <p className="text-xs text-[var(--muted-text)] mt-1">
                        Production deployments across Fortune 500 & leaders
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2 text-xs text-[var(--muted-text)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>99.98% verified uptime SLA</span>
                    </div>
                  </div>
                </ThreeDCard>

                <ThreeDCard className="rounded-2xl flex-1" maxTilt={6} scale={1.02}>
                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 flex flex-col justify-between h-full shadow-sm">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
                        REALIZED CLIENT VALUE
                      </span>
                      <h3 className="text-3xl font-extrabold text-[var(--ink)] mt-2 font-mono">
                        $140M+
                      </h3>
                      <p className="text-xs text-[var(--muted-text)] mt-1">
                        In verified operational efficiency & cost reduction
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2 text-xs text-[var(--muted-text)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Measurable enterprise ROI</span>
                    </div>
                  </div>
                </ThreeDCard>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 3. "Our Story" with Mission, Vision, and Values Tabs (SaaSly Style) */}
      <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-alt)] py-16 sm:py-24">
        <Container>
          <div className="max-w-[800px] mx-auto text-center space-y-4 mb-12">
            <Reveal>
              <span className="eyebrow mx-auto justify-center">OUR FOUNDATIONS</span>
            </Reveal>
            <Reveal delayMs={80}>
              <h2 className="section-h2 text-[var(--ink)]">
                Built on engineering truth, not artificial promises.
              </h2>
            </Reveal>
          </div>

          {/* Story Tabs Bar */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <button
              type="button"
              onClick={() => setActiveStoryTab("mission")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeStoryTab === "mission"
                  ? "bg-[var(--accent)] text-[#030718] shadow-md shadow-[var(--accent)]/20"
                  : "bg-[var(--surface)] border border-[var(--border-subtle)] text-[var(--muted-text)] hover:text-[var(--ink)]"
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Our Mission</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStoryTab("vision")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeStoryTab === "vision"
                  ? "bg-[var(--accent)] text-[#030718] shadow-md shadow-[var(--accent)]/20"
                  : "bg-[var(--surface)] border border-[var(--border-subtle)] text-[var(--muted-text)] hover:text-[var(--ink)]"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Our Vision</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStoryTab("values")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeStoryTab === "values"
                  ? "bg-[var(--accent)] text-[#030718] shadow-md shadow-[var(--accent)]/20"
                  : "bg-[var(--surface)] border border-[var(--border-subtle)] text-[var(--muted-text)] hover:text-[var(--ink)]"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Core Values</span>
            </button>
          </div>

          {/* Tab Content Box with 3D Depth */}
          <ThreeDCard className="max-w-[900px] mx-auto rounded-3xl" maxTilt={4} scale={1.01}>
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-8 sm:p-12 shadow-xl">
              {activeStoryTab === "mission" && (
                <div className="space-y-6 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-hover)] text-[var(--accent)] border border-[var(--border-subtle)]">
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                      To make AI predictable, deterministic, and indispensable for the enterprises that need it most.
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg leading-relaxed text-[var(--body-text)]">
                    We exist to eliminate the friction between laboratory artificial intelligence and real-world enterprise infrastructure. By combining deep mathematical rigor with industrial domain expertise, we guarantee that every deployed system provides genuine operational leverage.
                  </p>
                </div>
              )}

              {activeStoryTab === "vision" && (
                <div className="space-y-6 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-hover)] text-[var(--accent)] border border-[var(--border-subtle)]">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                      An enterprise world powered by sovereign, private, and transparent AI architectures.
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg leading-relaxed text-[var(--body-text)]">
                    We envision a future where high-consequence industries — from medical therapeutics and aerospace to financial clearing — leverage automated intelligence with absolute certainty, total data privacy, and zero vendor entrapment.
                  </p>
                </div>
              )}

              {activeStoryTab === "values" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {aboutContent.whatWeBelieve.map((v) => (
                    <div key={v.title} className="p-4 rounded-xl bg-[var(--bg-alt)] border border-[var(--border-subtle)] shadow-sm">
                      <h4 className="text-base font-semibold text-[var(--ink)] mb-1">
                        {v.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--body-text)] leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ThreeDCard>
        </Container>
      </section>

      {/* 4. Structured Delivery Lifecycle */}
      <ProcessSteps
        eyebrow="Delivery Lifecycle"
        headline="A disciplined path from discovery to production."
        description="Every project follows a straightforward progression designed to validate assumptions early and deliver software that runs in production."
      />

      {/* 5. Team Section with 3D Depth */}
      {aboutContent.showTeam && (
        <section className="bg-[var(--bg)] py-[clamp(72px,9vw,120px)] border-t border-[var(--border-subtle)]">
          <Container>
            <div className="max-w-[780px] space-y-4">
              <Reveal>
                <span className="eyebrow">Leadership & Architects</span>
              </Reveal>
              <Reveal delayMs={80}>
                <h2 className="section-h2 text-[var(--ink)]">The people behind the engineering.</h2>
              </Reveal>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aboutContent.teamPlaceholders.map((member, idx) => (
                <Reveal key={member.name} delayMs={idx * 80}>
                  <ThreeDCard className="w-full h-full rounded-2xl" maxTilt={6} scale={1.02}>
                    <Card className="text-center p-6 flex flex-col items-center group w-full h-full transition-all duration-300 hover:border-[var(--accent)]/50 hover:shadow-xl border border-[var(--border-subtle)]">
                      <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[var(--border-subtle)] shadow-md group-hover:border-[var(--accent)] transition-colors">
                        {member.avatarSrc ? (
                          <img
                            src={member.avatarSrc}
                            alt={member.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[var(--surface-hover)] text-[var(--accent)] font-semibold text-lg select-none">
                            {member.initials}
                          </div>
                        )}
                      </div>
                      <h3 className="mt-4 text-[17px] font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[var(--link)] font-medium mt-0.5">
                        {member.role}
                      </p>
                      <p className="mt-3 text-[13px] text-[var(--muted-text)] leading-relaxed">
                        {member.bio}
                      </p>
                    </Card>
                  </ThreeDCard>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 6. Closing CTA Banner */}
      <CtaBand />
    </div>
  );
}

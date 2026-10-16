import { Cpu, Briefcase, Compass, CheckCircle2, ArrowRight } from "lucide-react";
import { servicesContent, ServiceCategory } from "../../content/services";
import { Container } from "../../components/ui/Container";
import { Card } from "../../components/ui/Card";
import { Reveal } from "../../components/ui/Reveal";
import { ProcessSteps } from "../../components/sections/ProcessSteps";
import { Faq } from "../../components/sections/Faq";
import { CtaBand } from "../../components/sections/CtaBand";
import { ThreeDCard } from "../../components/3d/ThreeDCard";
import { CinematicImage } from "../../components/ui/CinematicImage";

export const metadata = {
  title: "Services",
  description: "Explore Innoanswers AI technology services, business automation, and strategic advisory offerings designed for measurable business outcomes.",
};

function getSectionIcon(iconName: ServiceCategory["iconName"]) {
  switch (iconName) {
    case "cpu":
      return <Cpu className="w-6 h-6 text-[var(--accent)]" aria-hidden="true" />;
    case "briefcase":
      return <Briefcase className="w-6 h-6 text-[var(--accent)]" aria-hidden="true" />;
    case "compass":
      return <Compass className="w-6 h-6 text-[var(--accent)]" aria-hidden="true" />;
  }
}

export default function ServicesPage() {
  return (
    <div className="pt-28 sm:pt-36">
      {/* Page Header */}
      <section className="relative overflow-hidden py-14 lg:py-20 border-b border-[var(--border-subtle)]">
        <Container className="relative z-10">
          <div className="max-w-[820px] space-y-5">
            <Reveal>
              <span className="eyebrow">{servicesContent.eyebrow}</span>
            </Reveal>

            <Reveal delayMs={80}>
              <h1 className="page-h1 text-[var(--ink)]">{servicesContent.pageH1}</h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="lead-text text-[var(--body-text)]">
                {servicesContent.body}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Outcome Strip */}
      <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-alt)] py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6">
            {servicesContent.outcomes.map((outcome, idx) => (
              <Reveal key={outcome} delayMs={idx * 80} className="flex-1 min-w-[200px] sm:min-w-[240px]">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[var(--accent)] shrink-0" aria-hidden="true" />
                  <span className="text-[17px] font-medium text-[var(--ink)] tracking-tight">
                    {outcome}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Three Anchored Service Sections with 3D Depth */}
      <div className="divide-y divide-[var(--border-subtle)]">
        {servicesContent.categories.map((cat, idx) => {
          const isAltBg = idx % 2 === 0;
          return (
            <section
              key={cat.id}
              id={cat.id}
              className={`py-[clamp(72px,9vw,120px)] scroll-mt-20 ${
                isAltBg ? "bg-[var(--bg)]" : "bg-[var(--bg-alt)]"
              }`}
            >
              <Container>
                {/* Section Header */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <Reveal>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface-hover)] border border-[var(--border-subtle)] shadow-sm">
                          {getSectionIcon(cat.iconName)}
                        </div>
                        <span className="text-sm font-semibold tracking-wider text-[var(--link)] uppercase">
                          Practice Area 0{idx + 1}
                        </span>
                      </div>
                    </Reveal>

                    <Reveal delayMs={80}>
                      <h2 className="section-h2 text-[var(--ink)]">{cat.title}</h2>
                    </Reveal>

                    <Reveal delayMs={160}>
                      <p className="lead-text text-[var(--body-text)]">
                        {cat.intro}
                      </p>
                      <div className="pt-3">
                        <a
                          href={`/services/${cat.id}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold tracking-tight shadow-md transition-all hover:scale-[1.02]"
                        >
                          <span>Explore {cat.title} Specifications</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </Reveal>
                  </div>

                  {/* Practice Area Photo with Cinematic IntersectionObserver */}
                  {cat.imageSrc && (
                    <Reveal delayMs={240} className="lg:col-span-5">
                      <CinematicImage
                        src={cat.imageSrc}
                        alt={`${cat.title} architecture`}
                        aspectRatio="aspect-[16/10]"
                        threshold={0.15}
                      />
                    </Reveal>
                  )}
                </div>

                {/* 2x2 Grid of Offerings with 3D Cards */}
                <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {cat.offerings.map((offering, offIdx) => (
                    <Reveal key={offering.title} delayMs={offIdx * 80} className="flex">
                      <ThreeDCard className="w-full h-full rounded-2xl" maxTilt={5} scale={1.015}>
                        <Card className="p-7 sm:p-8 flex flex-col justify-between w-full h-full border border-[var(--border-subtle)] hover:border-[var(--accent)]/50 transition-all shadow-sm hover:shadow-lg">
                          <div>
                            <div className="flex items-center gap-2.5">
                              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                              <h3 className="card-h3 text-[var(--ink)] text-[19px]">
                                {offering.title}
                              </h3>
                            </div>
                            <p className="mt-4 text-[15px] leading-relaxed text-[var(--body-text)]">
                              {offering.description}
                            </p>
                          </div>
                        </Card>
                      </ThreeDCard>
                    </Reveal>
                  ))}
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      {/* Process Strip (4 steps from about) */}
      <ProcessSteps
        eyebrow="Implementation approach"
        headline="Predictable delivery from day one."
        description="Our engagements are structured in short sprints with working software demonstrated at every milestone."
      />

      {/* FAQ Accordion */}
      <Faq />

      {/* Closing CTA */}
      <CtaBand />
    </div>
  );
}

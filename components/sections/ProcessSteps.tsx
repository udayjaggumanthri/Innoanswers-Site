import { aboutContent } from "../../content/about";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { ThreeDCard } from "../3d/ThreeDCard";

interface ProcessStepsProps {
  eyebrow?: string;
  headline?: string;
  description?: string;
}

export function ProcessSteps({
  eyebrow = "How we work",
  headline = "From discovery to delivery in four disciplined steps.",
  description = "A practical, phased framework that keeps deliverables transparent and outcomes grounded.",
}: ProcessStepsProps) {
  return (
    <section className="bg-[var(--bg)] py-[clamp(72px,9vw,120px)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="max-w-[780px] space-y-4">
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>

          <Reveal delayMs={80}>
            <h2 className="section-h2 text-[var(--ink)]">{headline}</h2>
          </Reveal>

          {description && (
            <Reveal delayMs={160}>
              <p className="lead-text text-[var(--body-text)]">
                {description}
              </p>
            </Reveal>
          )}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.howWeWork.map((step, idx) => (
            <Reveal key={step.step} delayMs={idx * 80} className="flex">
              <ThreeDCard className="w-full h-full rounded-2xl" maxTilt={6} scale={1.02}>
                <Card className="flex flex-col justify-between p-6 sm:p-7 w-full h-full relative border border-[var(--border-subtle)] hover:border-[var(--accent)]/50 transition-all shadow-sm hover:shadow-lg">
                  <div>
                    <div className="text-3xl font-extrabold text-[var(--accent)] tracking-tight font-mono">
                      {step.step}
                    </div>
                    <h3 className="card-h3 mt-6 text-[var(--ink)] text-[19px]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--body-text)]">
                      {step.description}
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
}

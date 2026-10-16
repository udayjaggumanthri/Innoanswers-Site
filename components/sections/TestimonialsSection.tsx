import { Quote } from "lucide-react";
import { testimonialsContent } from "../../content/testimonials";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { ThreeDCard } from "../3d/ThreeDCard";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[var(--bg-alt)] py-12 sm:py-16 lg:py-18 border-t border-[var(--border-subtle)] relative">
      <Container>
        <div className="max-w-[800px] space-y-4">
          <Reveal>
            <span className="eyebrow">{testimonialsContent.eyebrow}</span>
          </Reveal>

          <Reveal delayMs={80}>
            <h2 className="section-h2 text-[var(--ink)]">
              {testimonialsContent.headline}
            </h2>
          </Reveal>
        </div>

        {/* 3 cards: 3-column desktop, scroll-snap on mobile with 3D Depth */}
        <div className="mt-10 sm:mt-12 flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0 scrollbar-none">
          {testimonialsContent.items.map((item, idx) => (
            <Reveal
              key={item.id}
              delayMs={idx * 90}
              className="flex-shrink-0 w-[84vw] max-w-[380px] snap-center md:w-full md:max-w-none flex"
            >
              <ThreeDCard className="w-full h-full rounded-2xl" maxTilt={6} scale={1.018}>
                <Card className="group flex flex-col justify-between w-full h-full border border-[var(--border-subtle)] transition-all duration-300 hover:border-[var(--accent)]/60 hover:shadow-xl relative">
                  <div>
                    <Quote className="h-7 w-7 text-[var(--accent)]/30 mb-3 group-hover:text-[var(--accent)]/60 transition-colors duration-200" aria-hidden="true" />
                    <blockquote className="text-[15px] sm:text-[16px] leading-relaxed text-[var(--body-text)]">
                      "{item.quote}"
                    </blockquote>
                  </div>

                  <div className="mt-8 flex items-center gap-3.5 border-t border-[var(--border-subtle)] pt-5">
                    {/* Real high quality stock avatar */}
                    {item.avatarSrc ? (
                      <img
                        src={item.avatarSrc}
                        alt={item.authorName}
                        className="h-12 w-12 shrink-0 rounded-full object-cover border-2 border-[var(--border-subtle)] shadow-sm group-hover:border-[var(--accent)] transition-colors duration-200"
                      />
                    ) : (
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-[var(--accent)] font-semibold text-sm select-none shadow-sm"
                        aria-hidden="true"
                      >
                        {item.initials}
                      </div>
                    )}

                    <div>
                      <p className="text-[15px] font-semibold text-[var(--ink)] not-italic group-hover:text-[var(--accent)] transition-colors duration-200">
                        {item.authorName}
                      </p>
                      <p className="text-[13px] text-[var(--muted-text)]">
                        {item.role}, {item.company}
                      </p>
                    </div>
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

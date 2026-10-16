import {
  Activity,
  Landmark,
  ShoppingBag,
  Factory,
  Truck,
  GraduationCap,
  Zap,
  Radio,
  ArrowRight,
} from "lucide-react";
import { industriesContent, Industry } from "../../content/industries";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { ThreeDCard } from "../3d/ThreeDCard";

function getIndustryIcon(iconName: Industry["iconName"]) {
  const iconProps = { className: "w-5 h-5 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110", "aria-hidden": true };
  switch (iconName) {
    case "activity":
      return <Activity {...iconProps} />;
    case "landmark":
      return <Landmark {...iconProps} />;
    case "shopping-bag":
      return <ShoppingBag {...iconProps} />;
    case "factory":
      return <Factory {...iconProps} />;
    case "truck":
      return <Truck {...iconProps} />;
    case "graduation-cap":
      return <GraduationCap {...iconProps} />;
    case "zap":
      return <Zap {...iconProps} />;
    case "radio":
      return <Radio {...iconProps} />;
  }
}

export function IndustriesSection() {
  return (
    <section id="industries" className="bg-[var(--bg-alt)] py-14 sm:py-16 lg:py-20 border-t border-[var(--border-subtle)] relative">
      <Container>
        {/* Section Header */}
        <div className="max-w-[800px] space-y-4">
          <Reveal>
            <span className="eyebrow">{industriesContent.eyebrow}</span>
          </Reveal>

          <Reveal delayMs={80}>
            <h2 className="section-h2 text-[var(--ink)]">
              {industriesContent.headline}
            </h2>
          </Reveal>

          <Reveal delayMs={160}>
            <p className="lead-text text-[var(--body-text)]">
              {industriesContent.body}
            </p>
          </Reveal>
        </div>

        {/* 8 tiles with 3D Depth & Glare */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industriesContent.industries.map((ind, idx) => (
            <Reveal key={ind.id} delayMs={(idx % 4) * 80} className="flex">
              <ThreeDCard className="w-full h-full rounded-2xl" maxTilt={7} scale={1.02}>
                <Card className="group flex flex-col justify-between p-6 sm:p-7 w-full h-full border border-[var(--border-subtle)] transition-all duration-300 hover:border-[var(--accent)]/60 hover:shadow-lg cursor-default">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-hover)] border border-[var(--border-subtle)] transition-colors duration-200 group-hover:bg-[rgba(127,212,255,0.15)] shadow-sm">
                      {getIndustryIcon(ind.iconName)}
                    </div>
                    <h3 className="card-h3 mt-5 text-[18px] text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-200">
                      {ind.name}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--body-text)]">
                      {ind.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-medium text-[var(--muted-text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                    <span>Custom ML architecture</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
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

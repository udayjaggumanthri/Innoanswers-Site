"use client";
import React, { useEffect, useId, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export interface FeatureRevealTriggerRange {
  start?: string;
  end?: string;
}

export interface FeatureRevealTriggers {
  no?: FeatureRevealTriggerRange;
  title?: FeatureRevealTriggerRange;
  content?: FeatureRevealTriggerRange;
  img?: FeatureRevealTriggerRange;
}

export interface FeatureRevealProperty {
  image: string;
  imgClass?: string;
  no: string | number;
  number: string;
  eyebrow?: string;
  titleClass?: string;
  title: string;
  contentClass?: string;
  paragraphs: string[];
  triggers?: FeatureRevealTriggers;
}

export const defaultPropertiesData: FeatureRevealProperty[] = [
  {
    number: "01",
    no: "1",
    imgClass: "img-1",
    titleClass: "property-title-1",
    contentClass: "property-content-1",
    eyebrow: "Full-Lifecycle Systems & Machine Learning",
    title: "AI-led Product Engineering",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=80",
    paragraphs: [
      "From architectural design to production-grade intelligence. We build deterministic machine learning backends, low-latency inference pipelines, and scalable microservices with seamless API integration.",
      "Engineered for high concurrency, verifiable precision, and full client IP sovereignty—deploying custom ML models directly into your private cloud infrastructure with zero vendor lock-in.",
    ],
  },
  {
    number: "02",
    no: "2",
    imgClass: "img-2",
    titleClass: "property-title-2",
    contentClass: "property-content-2",
    eyebrow: "Cloud & Operational Modernization",
    title: "Enterprise Digital Transformation",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    paragraphs: [
      "Modernize legacy infrastructure into unified, data-driven ecosystems. We bridge fragmented software silos, automate high-friction operational workflows, and deploy predictive intelligence that drives quantifiable ROI.",
      "Hardened with SOC2-ready governance, automated failover pipelines, and zero-trust security controls tailored for complex regulated enterprise environments.",
    ],
  },
  {
    number: "03",
    no: "3",
    imgClass: "img-3",
    titleClass: "property-title-3",
    contentClass: "property-content-3",
    eyebrow: "Feasibility Benchmarks & ROI Roadmaps",
    title: "AI Strategy & Consulting",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
    paragraphs: [
      "Cut through generative AI market hype with rigorous technical audits. We evaluate proprietary data readiness, benchmark model feasibility, and engineer concrete architectural execution roadmaps before capital commitment.",
      "Comprehensive total cost of ownership (TCO) forecasting, compute latency optimization, and end-to-end risk mitigation strategies built for enterprise leadership.",
    ],
  },
  {
    number: "04",
    no: "4",
    imgClass: "img-4",
    titleClass: "property-title-4",
    contentClass: "property-content-4",
    eyebrow: "Autonomous Multi-Agent Swarms",
    title: "Agentic AI Expertise",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    paragraphs: [
      "Evolve past brittle prompt wrappers into goal-directed, autonomous agent ecosystems. We engineer multi-agent reasoning loops, deterministic tool-calling workflows, and self-correcting execution pipelines that operate 24/7.",
      "Fortified with deterministic guardrails, real-time hallucination filters, and audit traces—allowing enterprises to automate complex multi-step decision chains with full operational oversight.",
    ],
  },
  {
    number: "05",
    no: "5",
    imgClass: "img-5",
    titleClass: "property-title-5",
    contentClass: "property-content-5",
    eyebrow: "Intuitive Operator Interfaces",
    title: "Human-Centric Digital Experience",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=80",
    paragraphs: [
      "World-class AI is only valuable when your teams and customers can wield it effortlessly. We craft ultra-responsive, accessible digital interfaces that transform complex model outputs into clear, delightful operator cockpits.",
      "Engineered with purposeful micro-interactions, sub-second telemetry feedback, and frictionless UX design that accelerates enterprise-wide adoption and decision velocity.",
    ],
  },
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export interface HorizontalScrollCompProps {
  propertiesData?: FeatureRevealProperty[];
  bgColor?: string;
  imageParallaxRange?: number;
  cardGap?: number;
}

export function HorizontalScrollComp({
  propertiesData = defaultPropertiesData,
  bgColor,
  imageParallaxRange = 25,
  cardGap = 12,
}: HorizontalScrollCompProps) {
  const uid = useId().replace(/:/g, "");
  const sectionId = `feature-reveal-${uid}`;
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionEl = sectionRef.current;
    const containerEl = containerRef.current;
    if (!sectionEl || !containerEl) return;

    const mm = gsap.matchMedia();

    // 1. DESKTOP PINNED HORIZONTAL SCROLL (>= 1025px)
    mm.add("(min-width: 1025px)", () => {
      const reducedMotion = prefersReducedMotion();

      // Ensure all elements are visible in context
      const imgs = containerEl.querySelectorAll<HTMLElement>(".industry-img");
      const numbers = containerEl.querySelectorAll<HTMLElement>(".industry-no");
      const titles = containerEl.querySelectorAll<HTMLElement>(".industry-title");
      const contents = containerEl.querySelectorAll<HTMLElement>(".industry-content");

      gsap.set([imgs, numbers, titles, contents], { opacity: 1 });

      const computeScroll = () => {
        return containerEl.scrollWidth - window.innerWidth + 80;
      };

      // Main horizontal scrub tween pinned to the section
      const horizontalTween = gsap.to(containerEl, {
        x: () => -computeScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${computeScroll() * 1.15}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      if (!reducedMotion) {
        // Card-by-card micro parallax animations
        const cards = containerEl.querySelectorAll<HTMLElement>(".industry-card");
        cards.forEach((card) => {
          const cardImg = card.querySelector<HTMLElement>(".industry-img");
          const cardTitle = card.querySelector<HTMLElement>(".industry-title");
          const cardNo = card.querySelector<HTMLElement>(".industry-no");
          const cardContents = card.querySelectorAll<HTMLElement>(".industry-content");

          // Image Parallax within its card frame
          if (cardImg) {
            gsap.fromTo(
              cardImg,
              { xPercent: -imageParallaxRange },
              {
                xPercent: imageParallaxRange,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          }

          // Subtle title split text reveal
          if (cardTitle) {
            try {
              const splitTitle = new SplitText(cardTitle, { type: "lines" });
              gsap.from(splitTitle.lines, {
                yPercent: 80,
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "left 75%",
                  toggleActions: "play none none reverse",
                },
              });
            } catch (e) {
              gsap.from(cardTitle, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "left 75%",
                  toggleActions: "play none none reverse",
                },
              });
            }
          }

          // Number reveal
          if (cardNo) {
            gsap.from(cardNo, {
              y: 40,
              opacity: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 80%",
                toggleActions: "play none none reverse",
              },
            });
          }

          // Content reveal
          if (cardContents.length > 0) {
            gsap.from(cardContents, {
              y: 25,
              opacity: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 70%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      }

      ScrollTrigger.refresh();
    });

    // 2. TABLET & MOBILE RESPONSIVE STACK (<= 1024px)
    mm.add("(max-width: 1024px)", () => {
      // Clear any horizontal scroll transforms or inline styles left from desktop
      gsap.set(containerEl, { clearProps: "all" });
      const allEls = containerEl.querySelectorAll<HTMLElement>(
        ".industry-card, .industry-img, .industry-no, .industry-title, .industry-content"
      );
      gsap.set(allEls, {
        clearProps: "transform,opacity",
        opacity: 1,
      });

      // Simple, graceful scroll reveals on mobile cards
      const mobileCards = containerEl.querySelectorAll<HTMLElement>(".industry-card");
      mobileCards.forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      ScrollTrigger.refresh();
    });

    return () => {
      mm.revert();
    };
  }, [propertiesData, imageParallaxRange]);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={`w-full relative z-10 text-[var(--ink)] font-sans border-t border-[var(--border-subtle)] ${
        bgColor ? "" : "bg-[var(--bg)]"
      }`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
      aria-label="Enterprise AI Core Capabilities"
    >
      {/* Pinned Desktop Frame / Mobile Flow Container */}
      <div className="w-full overflow-hidden min-h-screen flex flex-col justify-center max-[1024px]:overflow-visible max-[1024px]:min-h-0 max-[1024px]:py-16 sm:max-[1024px]:py-20">
        
        {/* Section Lead-in Header */}
        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 pt-8 pb-4 max-[1024px]:pt-0 max-[1024px]:pb-8">
          <div className="flex flex-col items-start gap-2">
            <span className="eyebrow">CORE CAPABILITIES &amp; ENGINEERING RIGOR</span>
            <h2 className="section-h2 text-[var(--ink)]">
              End-to-End Enterprise AI Delivery
            </h2>
          </div>
        </div>

        {/* Horizontal Track (Pinned on Desktop, Vertical Stack on Mobile/Tablet) */}
        <div
          ref={containerRef}
          className="flex flex-nowrap w-fit items-center px-8 lg:px-16 max-[1024px]:w-full max-[1024px]:flex-col max-[1024px]:items-stretch max-[1024px]:px-6 max-[1024px]:gap-16 sm:max-[1024px]:gap-20"
          style={
            {
              "--card-gap": `${cardGap}vw`,
              gap: `${cardGap}vw`,
            } as CSSProperties & Record<`--${string}`, string>
          }
        >
          {propertiesData.map((property, index) => (
            <article
              key={index}
              className="w-[82vw] max-w-[1180px] h-[78vh] max-h-[760px] flex items-center justify-between gap-[4vw] industry-card flex-shrink-0 max-[1024px]:w-full max-[1024px]:h-auto max-[1024px]:max-h-none max-[1024px]:flex-col-reverse max-[1024px]:gap-6"
            >
              {/* Card Image Container - 100% visible across all breakpoints */}
              <div className="w-[46%] h-full rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-2xl relative bg-[var(--surface)] max-[1024px]:w-full max-[1024px]:h-[300px] sm:max-[1024px]:h-[420px]">
                <img
                  src={property.image}
                  alt={`${property.title} - iNNOAnswers Enterprise AI`}
                  className="w-full h-full object-cover block industry-img will-change-transform"
                  loading="lazy"
                  width={900}
                  height={1200}
                />
                {/* Subtle gradient vignette over image */}
                <div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"
                  aria-hidden="true"
                />
              </div>

              {/* Card Content styled with official Innoanswers Typography */}
              <div className="w-[50%] flex flex-col justify-center gap-5 pr-2 max-[1024px]:w-full max-[1024px]:pr-0 max-[1024px]:gap-4">
                {/* Micro Header Badge & Index Number */}
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs uppercase font-semibold tracking-wider text-[var(--link)]">
                    {property.eyebrow}
                  </span>
                  <span
                    className="text-[4rem] sm:text-[5.5rem] lg:text-[6.5rem] font-extrabold text-[var(--accent)]/30 dark:text-[var(--accent)]/40 leading-none tracking-tight industry-no select-none font-sans"
                    aria-hidden="true"
                  >
                    {property.number}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-4">
                  {/* Title */}
                  <h3
                    className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[var(--ink)] leading-[1.18] font-sans industry-title"
                  >
                    {property.title}
                  </h3>

                  {/* Body Paragraphs with SEO rich context */}
                  <div className="space-y-3.5 pt-1">
                    {property.paragraphs.map((para, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-base sm:text-lg leading-relaxed text-[var(--body-text)] font-normal font-sans industry-content"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface HorizontalFeatureRevealProps {
  properties?: FeatureRevealProperty[];
  /** Optional background override. Falls back to the `bg-[var(--bg)]` token. */
  bgColor?: string;
  /** Horizontal parallax travel of each image, in %. */
  imageParallaxRange?: number;
  /** Gap between cards, in vw. */
  cardGap?: number;
}

export default function HorizontalFeatureReveal({
  properties = defaultPropertiesData,
  bgColor,
  imageParallaxRange = 25,
  cardGap = 12,
}: HorizontalFeatureRevealProps) {
  return (
    <HorizontalScrollComp
      propertiesData={properties}
      bgColor={bgColor}
      imageParallaxRange={imageParallaxRange}
      cardGap={cardGap}
    />
  );
}
